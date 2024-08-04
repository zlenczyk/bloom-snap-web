import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0 h-header-height flex items-center">
      <div className="container flex item-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          BloomSnap
        </Link>
        <Button asChild>
          <Link href="/sign-in">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
