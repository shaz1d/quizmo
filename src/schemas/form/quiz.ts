import { z } from "zod";

export const createQuizSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must beat least 4 characters long" }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
  timeEnded: z.coerce.date().nullable(),
});
