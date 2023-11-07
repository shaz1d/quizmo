"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";

type Props = {};

const RecentActivityCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/recent-activity");
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl">Recent Activity</CardTitle>
        <CardDescription>
          <p>You have played a total of 43 quizes</p>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default RecentActivityCard;
