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
    <header className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0 h-header-height z-50 flex items-center">
      <div className="container flex item-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          BloomSnap
        </Link>
        {user ? (
          <Menu
            userImage="/assets/placeholder-profile.png"
            userName="Jane Doe"
          />
        ) : (
          <Button asChild>
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
