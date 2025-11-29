"use server";

import { signOut } from "@/auth";
import { AuthError } from "next-auth";

export const logOut = async () => {
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
