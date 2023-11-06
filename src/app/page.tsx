import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Quizmo</CardTitle>
          <CardDescription>
            Quizmo is a quiz app that allows you to create and share quizz with
            your friends.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SignInButton text="Sign in with GitHub!" />
        </CardFooter>
      </Card>
    </div>
  );
}
