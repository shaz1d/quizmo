import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserNav from "./UserNav";
import ThemeToggle from "./ThemeToggle";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex justify-between items-center h-full px-8 mx-auto max-w-7xl gap-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center justify-center">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
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
