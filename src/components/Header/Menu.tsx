"use client";

import { logOut } from "@/app/(auth)/sign-out/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  userImage: string | null;
  userName: string | null;
};

const Menu = ({ userImage, userName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const editProfile = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu open={isOpen} modal={false} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto hover:bg-inherit">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-transparent">
              {userImage ? (
                <Image
                  src={userImage}
                  alt="avatar"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-500">
                  <span className="text-white font-semibold text-lg sm:text-xl">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <span className="hidden sm:inline-block text-sm font-medium">
              {userName}
            </span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 z-100">
        <DropdownMenuItem onClick={editProfile}>
          <Settings className="h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logOut}>
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
