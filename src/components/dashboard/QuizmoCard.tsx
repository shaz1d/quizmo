"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";

const QuizmoCard = () => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/quiz");
      }}
      className=" cursor-pointer"
    >
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Me! 🚀</CardTitle>
        <CardDescription>Challange yourself with a quiz!</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default QuizmoCard;
