import { prisma } from "@/lib/db";
import { checkAnswerSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { compareTwoStrings } from "string-similarity";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { questionId, userAnswer, timeEnded } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
    });
    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.question.update({
      where: { id: questionId },
      data: {
        userAnswer,
      },
    });
    if (timeEnded) {
      await prisma.game.update({
        where: {
          id: question.gameId,
        },
        data: {
          timeEnded: timeEnded,
        },
      });
    }

    if (question.questionType === "mcq") {
      const isCorrect =
        question.answer.toLowerCase().trim() ===
        userAnswer.toLowerCase().trim();
      await prisma.question.update({
        where: { id: questionId },
        data: {
          isCorrect,
        },
      });
      return NextResponse.json(
        {
          isCorrect,
          correctAnswer: question.answer,
        },
        { status: 200 }
      );
    } else if (question.questionType === "open_ended") {
      let percentSimilar = compareTwoStrings(
        userAnswer.toLowerCase().trim(),
        question.answer.toLowerCase().trim()
      );

      percentSimilar = Math.round(percentSimilar * 100);

      await prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          percentageCorrect: percentSimilar,
        },
      });

      return NextResponse.json(
        {
          percentSimilar,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      );
    }
  }
}
