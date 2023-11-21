import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
type Props = {
  timeTaken: string;
};

const TimeTakenCard = ({ timeTaken }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex justify-between gap-5">
          <span>Time Taken</span> <span>⌛</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h2 className="text-3xl font-bold text-green-500">{timeTaken}</h2>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
