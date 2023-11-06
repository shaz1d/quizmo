"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";

type Props = {};

const QuizmoHistory = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/history");
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl">History 🕤</CardTitle>
      </CardHeader>
      <CardContent>
        <p>View past quiz attempts</p>
      </CardContent>
    </Card>
  );
};

export default QuizmoHistory;
