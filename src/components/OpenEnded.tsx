"use client";

import { formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  BarChart,
  Timer,
  Loader2,
  ChevronRight,
  TargetIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import BlankAnswerInput from "./BlankAnswerInput";

type Props = {
  game: Game & {
    questions: Pick<Question, "id" | "question" | "answer">[];
  };
};

const OpenEnded = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [blankAnswer, setBlankAnswer] = useState("");
  const [hasEnded, setHasEnded] = useState(false);
  const [now, setNow] = useState(new Date());
  const { toast } = useToast();

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll(".blank_input").forEach((input) => {
        filledAnswer = filledAnswer.replace("_____", input.value);
        input.value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hasEnded]);

  const handleNext = useCallback(() => {
    if (isChecking) return;

    checkAnswer(undefined, {
      onSuccess: ({ percentSimilar }) => {
        toast({
          title: `Your answer is ${percentSimilar}% similar to the correct answer`,
          description: "Answers are based on similarity comparison",
        });
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, toast, questionIndex, game.questions.length, isChecking]);

  if (hasEnded) {
    return (
      <div className="w-full h-auto max-w-md  shadow-lg rounded-lg p-8 flex flex-col items-center">
        <p className="bg-green-500 text-white px-3 py-2 w-full rounded-md mb-3">
          You Completed in{" "}
          {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </p>
        <Link href={`/statistics/${game.id}`} className={buttonVariants()}>
          {" "}
          View Statistics <BarChart className="w-4 h-4 ml-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg flex flex-col">
      <p>
        Topic:{" "}
        <span className="bg-black rounded-sm px-2 py-1 text-white">
          {game.topic}
        </span>
      </p>
      <div className="flex justify-between items-center gap-5 mt-2">
        <div className="flex items-center gap-1">
          <Timer />
          <span>
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </span>
        </div>
        {/* <div className="flex items-center gap-8  px-3 py-2 border border-gray-300 rounded-md">
          <div className="text-green-500 flex text-xl items-center gap-2">
            <TargetIcon />
            <span>94%</span>
          </div>
        </div> */}
      </div>
      <Card className="w-full mt-4">
        <CardHeader>
          <p className="text-3xl">
            {questionIndex + 1}
            <span className="text-base text-gray-400">
              /{game.questions.length}
            </span>
          </p>
          <CardTitle className="text-lg text-gray-800">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="flex flex-col w-full mt-4 gap-3">
        <BlankAnswerInput
          answer={currentQuestion.answer}
          setBlankAnswer={setBlankAnswer}
        />
      </div>
      <Button
        className=" mt-5 self-center items-center gap-2"
        disabled={isChecking}
        onClick={() => handleNext()}
      >
        Next{" "}
        {isChecking ? (
          <Loader2 />
        ) : (
          <ChevronRight className="h-4 w-4 mt-[2px]" />
        )}
      </Button>
    </div>
  );
};

export default OpenEnded;
