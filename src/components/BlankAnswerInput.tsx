import React from "react";

type Props = {
  answer: string;
};

const BlankAnswerInput = ({ answer }: Props) => {
  return (
    <div className="w-full p-2">
      <h2 className="text-xl font-medium">{answer}</h2>
    </div>
  );
};

export default BlankAnswerInput;
