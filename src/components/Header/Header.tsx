import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { EnterIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0">
      <div className="container flex item-center justify-between">
        <Link href="/" className="flex items-center justify-center">
          BloomSnap
        </Link>
        <Button asChild>
          <Link href="/sign-in">
            <EnterIcon className="mr-2 h-4 w-4" />
            Sign in
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
