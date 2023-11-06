"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";

type Props = {};

const QuizmoCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/quiz");
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Me! 🚀</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Challange yourself with a quiz!</p>
      </CardContent>
    </Card>
  );
};

export default QuizmoCard;
