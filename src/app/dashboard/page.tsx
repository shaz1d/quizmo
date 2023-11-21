import QuizmoCard from "@/components/dashboard/QuizmoCard";
import QuizmoHistory from "@/components/dashboard/QuizmoHistory";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export const metadata = {
  title: "Dashboard | Quizmo",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <main className="p-8 mx-auto max-w-7xl min-h-screen">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizmoCard />
        <QuizmoHistory />
      </div>
      <div className="mt-4">
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default Dashboard;
