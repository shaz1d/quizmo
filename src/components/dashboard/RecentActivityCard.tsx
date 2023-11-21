import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import HistoryList from "../HistoryList";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {};

const RecentActivityCard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const gamesCount = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Recent Activity</CardTitle>
        <CardDescription>
          <p>You have played a total of {gamesCount} quizes</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HistoryList limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
