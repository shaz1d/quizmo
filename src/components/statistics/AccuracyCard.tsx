import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {};

const AccuracyCard = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Accuracy 🚀</CardTitle>
        <CardDescription>Challange yourself with a quiz!</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default AccuracyCard;
