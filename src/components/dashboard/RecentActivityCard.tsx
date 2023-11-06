"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
      </CardHeader>
      <CardContent>
        <p>You have played a total of 43 quizes</p>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
