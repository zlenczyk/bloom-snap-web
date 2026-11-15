"use server";

import { auth, signOut } from "@/auth";
import { deleteDemoAccounts } from "@/lib/demo/account";
import { AuthError } from "next-auth";

export const logOut = async () => {
  const session = await auth();

  // A demo account cannot be signed into again, so it goes away right here
  // instead of waiting to expire.
  if (session?.user?.isDemo) {
    try {
      await deleteDemoAccounts([session.user.id]);
    } catch (error) {
      console.error("Failed to delete the demo account:", error);
    }
  }

  try {
    await signOut({ redirectTo: "/sign-in" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "SignOutError":
          return "Could not sign you out. Please try again.";
        default:
          return "Something went wrong. Please try again.";
      }
    }
    throw error;
  }
};
