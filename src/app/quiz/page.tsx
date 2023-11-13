import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import { redirect } from "next/navigation";
import CreateQuiz from "@/components/CreateQuiz";

type Props = {};
export const metadata = {
  title: "Quiz | Quizmo",
};

const Quiz = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl min-h-screen">
      <CreateQuiz session={session.user.id}></CreateQuiz>
    </main>
  );
};

export default Quiz;
