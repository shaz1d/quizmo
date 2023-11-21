import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  questions: Question[];
};

const QuestionList = ({ questions }: Props) => {
  const gameType = questions[0].questionType;
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-3">No.</TableHead>
          <TableHead>Question & Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
          {gameType === "open_ended" && <TableHead>Accuracy</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {question.question} <br />
                  <br /> <span>{question.answer}</span>
                </TableCell>
                <TableCell>{question.userAnswer}</TableCell>
                {gameType === "open_ended" && (
                  <TableCell>{question.percentageCorrect || 0}%</TableCell>
                )}
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionList;
