import { prisma } from "@/lib/db";
import { CopyCheck, Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const HistoryList = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className="flex flex-wrap gap-5 ">
      {games.map((game) => {
        return (
          <div
            className="flex gap-4 items-center py-3 px-4 border border-gray-300 rounded-xl"
            key={game.id}
          >
            {game.gameType === "mcq" ? <CopyCheck></CopyCheck> : <Edit></Edit>}
            <div>
              <div className="w-full flex gap-4 justify-between">
                <Link
                  href={`/statistics/${game.id}`}
                  className="font-semibold text-lg"
                >
                  {game.topic}
                </Link>

                <span className="px-4 py-1 text-sm bg-black dark:bg-white text-white dark:text-black rounded-full">
                  {new Date(game.timeStarted).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                {game.gameType === "mcq" ? "MCQ" : "Open-ended"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryList;
