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

const ResultCard = ({ accuracy = 0 }: Props) => {
  let motivText = "";
  if (accuracy >= 75) {
    motivText = "Impressive";
  } else if (accuracy >= 25) {
    motivText = "Good Job";
  } else {
    motivText = "Nice Try";
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between gap-5">
          <span>Result</span> <span>🏆</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-3xl font-bold text-green-500">{motivText}</h2>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
