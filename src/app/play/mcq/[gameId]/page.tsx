import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

const MCQpage = ({ params: { gameId } }: Props) => {
  return <div>{gameId}</div>;
};

export default MCQpage;
