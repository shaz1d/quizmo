import AccuracyCard from "@/components/statistics/AccuracyCard";
import ResultCard from "@/components/statistics/ResultCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const Statistics = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: {
      questions: true,
    },
  });

  if (!game) {
    return redirect("/");
  }

  // Accuracy calculation for questions
  let accuracy: number = 0;
  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);

    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPersentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect || 0);
    }, 0);

    accuracy = totalPersentage / game.questions.length;
  }

  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <div className="p-8 mx-auto max-w-7xl min-h-screen">
      <div className="flex justify-between gap-8 items-center">
        <h1 className="font-bold text-3xl">Statistics</h1>
        <Link href={"/dashboard"} className={buttonVariants()}>
          <LucideLayoutDashboard className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-5 mt-8">
        <AccuracyCard accuracy={accuracy} />
        <ResultCard accuracy={accuracy} />
        <TimeTakenCard />
      </div>
      <div className="mt-8">
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Statistics;
