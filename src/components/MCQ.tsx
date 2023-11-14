"use client";

import { Game, Question } from "@prisma/client";
import { CheckCircle2, XCircleIcon, Timer, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { useToast } from "./ui/use-toast";

type Props = {
  game: Game & {
    questions: Pick<Question, "id" | "question" | "options">[];
  };
};
const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [choiceSelected, setChoiceSelected] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const { toast } = useToast();
  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options = useMemo(() => {
    if (!currentQuestion) {
      return [];
    }
    if (!currentQuestion.options) {
      return [];
    }
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);
  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[choiceSelected],
      };
      const response = await axios.post("/api/checkAnswer", payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: "Correct",
            description: "Correct Answer",
            variant: "success",
          });
          setCorrectAnswers((prev) => prev + 1);
        } else {
          toast({
            title: "Incorrect",
            description: "Incorrect Answer",
            variant: "destructive",
          });
          setWrongAnswers((prev) => prev + 1);
        }
      },
    });
  }, [checkAnswer, toast]);
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
          <span>18s</span>
        </div>
        <div className="flex items-center gap-8  px-3 py-2 border border-gray-300 rounded-md">
          <div className="text-green-500 flex text-xl items-center gap-2">
            <CheckCircle2 />
            <span>{correctAnswers}</span>
          </div>
          <div className="text-red-500 flex text-xl items-center gap-2">
            <span>{wrongAnswers}</span>
            <XCircleIcon />
          </div>
        </div>
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
        {options.map((option, index) => (
          <Button
            className="justify-start py-3 w-full h-auto whitespace-normal text-left"
            key={index}
            variant={choiceSelected === index ? "default" : "outline"}
            onClick={() => setChoiceSelected(index)}
          >
            <div className="flex items-center">
              <span
                className={`h-8 w-8 shrink-0 border flex justify-center items-center rounded-md mr-2 ${
                  choiceSelected === index ? "border-white" : "border-black"
                }`}
              >
                {index + 1}
              </span>
              <p>{option}</p>
            </div>
          </Button>
        ))}
      </div>
      <Button
        className=" mt-5 self-center items-center gap-2"
        onClick={() => handleNext()}
      >
        Next <ChevronRight className="h-4 w-4 mt-[2px]" />
      </Button>
    </div>
  );
};

export default MCQ;
