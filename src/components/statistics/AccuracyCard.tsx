import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  accuracy: number;
};

const AccuracyCard = ({ accuracy }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between gap-5">
          <span>Accuracy</span> <span>🎯</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription>
          <h2 className="text-3xl font-bold text-green-500">{accuracy}%</h2>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default AccuracyCard;
