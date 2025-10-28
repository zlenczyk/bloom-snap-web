import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import Menu from "./Menu";

const Header = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <header className="w-full h-header-height fixed top-0 z-50">
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-green-100 shadow-md"></div>
      <div className="relative flex items-center justify-between mx-auto w-full max-w-7xl px-6 py-2 h-full">
        <Link
          href="/"
          className="flex items-center justify-center text-xl font-extrabold italic text-green-700"
        >
          BloomSnap
        </Link>

        {user ? (
          <Menu
            userImage="/assets/placeholder-profile.png"
            userName="Jane Doe"
          />
        ) : (
          <Button asChild className="bg-zinc-800 hover:bg-zinc-700">
            <Link href="/sign-in">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
