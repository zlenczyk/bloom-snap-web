import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { auth } from "@/auth";
import Menu from "./Menu";

const Header = async () => {
  const session = await auth();

  const user = session?.user;

  return (
    <header className="bg-gradient-to-br from-green-200 to-emerald-100 shadow-md py-2 border-b border-s-zinc-200 fixed w-full top-0 h-header-height z-50 flex items-center">
      <div className="flex item-center justify-between mx-auto w-full max-w-7xl px-6">
        <Link
          href="/"
          className="flex items-center justify-center font-medium text-xl text-zinc-950"
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
