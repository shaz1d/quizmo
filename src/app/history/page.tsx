import HistoryList from "@/components/HistoryList";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-8">
      <Card>
        <CardHeader className="flex flex-row items-center g-5 justify-between mb-5">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <Link href={"/dashboard"} className={buttonVariants()}>
            <LucideLayoutDashboard className="mr-2" />
            Back to Dashboard
          </Link>
        </CardHeader>
        <CardContent>
          <HistoryList limit={20} userId={session.user.id}></HistoryList>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
