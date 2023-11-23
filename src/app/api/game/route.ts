import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { createQuizSchema } from "@/schemas/form/quiz";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";

export const runtime = "nodejs";
export const maxDuration = 100;

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be loged in",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { amount, topic, type } = createQuizSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          option1: "option1 with max length of 15 words",
          option2: "option2 with max length of 15 words",
          option3: "option3 with max length of 15 words",
        }
      );
    }
    const game = await prisma.game.create({
      data: {
        userId: session.user.id,
        timeStarted: new Date(),
        topic,
        gameType: type,
      },
    });

    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      let manyData = questions.map((question: mcqQuestion) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      type openEndedQuestion = {
        question: string;
        answer: string;
      };
      let manyData = questions.map((question: openEndedQuestion) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game.id,
          questionType: "open_ended",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json({
      gameId: game.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json({ error });
    }
  }
}
