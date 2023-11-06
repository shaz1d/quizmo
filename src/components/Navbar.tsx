import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import { Button } from "./ui/button";
import SignInButton from "./SignInButton";
import Image from "next/image";
import UserNav from "./UserNav";
import ThemeToggle from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <nav className="fixed inset-x-0 top-0 z-10 h-fit bg-white dark:bg-gray-900 border-b border-gray-200 py-2">
      <div className="flex justify-between items-center h-full px-8 mx-auto max-w-7xl gap-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center justify-center">
          <p className="px-2 py-1 border-2 rounded-lg border-b-4 border-r-4 border-black text-xl font-bold dark:border-white">
            Quizmo
          </p>
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
