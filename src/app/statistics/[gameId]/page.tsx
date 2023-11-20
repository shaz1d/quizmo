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
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
          userAnswer: true,
          percentageCorrect: true,
        },
      },
    },
  });

  if (!game) {
    return redirect("/");
  }
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
        <AccuracyCard />
        <ResultCard />
        <TimeTakenCard />
      </div>
      <div className="mt-8">
        <pre>{JSON.stringify(game, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Statistics;
