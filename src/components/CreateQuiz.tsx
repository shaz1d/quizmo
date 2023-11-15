"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { createQuizSchema } from "@/schemas/form/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { BookOpen, CopyCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Input = z.infer<typeof createQuizSchema>;

const CreateQuiz = () => {
  const router = useRouter();
  const { mutate: getQuestions, isPending } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post("/api/game", {
        amount,
        topic,
        type,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      amount: 3,
      topic: "",
      type: "open_ended",
    },
  });
  form.watch();

  const onSubmit = (input: Input) => {
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId, error }: { gameId: string; error: any }) => {
          if (gameId !== undefined) {
            if (form.getValues("type") == "open_ended") {
              router.push(`/play/open-ended/${gameId}`);
            } else {
              router.push(`/play/mcq/${gameId}`);
            }
          } else {
            console.log(error);
          }
        },
        onError(error, variables) {
          alert({
            error,
            variables,
          });
        },
      }
    );
  };
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a Quiz</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>Please provide a topic</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount"
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={
                    form.getValues("type") === "mcq" ? "default" : "secondary"
                  }
                  onClick={() => {
                    form.setValue("type", "mcq");
                  }}
                >
                  <CopyCheck className="mr-2 h-5 w-5" />
                  Multiple Choice
                </Button>
                <Button
                  type="button"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    form.setValue("type", "open_ended");
                  }}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Open Ended
                </Button>
              </div>
              <Button disabled={isPending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuiz;
