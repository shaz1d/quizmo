"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
      </CardHeader>
      <CardContent>
        <p>Click on a topic to start a quiz on it!</p>
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
