"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { logOut } from "@/app/(auth)/sign-out/actions";

type Props = {
  userImage: string;
  userName: string;
};

const Menu = ({ userImage, userName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [errorMessage, formAction, isPending] = useActionState(
    logOut,
    undefined
  );

  const editProfile = () => {
    console.log("Edit profile clicked");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto hover:bg-inherit">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={userImage}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{userName}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={editProfile}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={formAction} className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
