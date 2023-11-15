import { Game, Question } from "@prisma/client";
import React from "react";

type Props = {
  game: Game & {
    questions: Pick<Question, "id" | "question" | "answer">[];
  };
};

const OpenEnded = ({ game }: Props) => {
  return (
    <div>
      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  );
};

export default OpenEnded;
