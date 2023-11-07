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
import CustomWordCloud from "../CustomWordCloud";

type Props = {};

const HotTopicsCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/hot-topic");
      }}
    >
      <CardHeader>
        <CardTitle className="text-2xl">Hot Topics 🔥</CardTitle>
        <CardDescription>
          <p>Click on a topic to start a quiz on it!</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomWordCloud />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
