"use server";

import { signOut } from "@/auth";
import { AuthError } from "next-auth";

export const logOut = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signOut();
  } catch (error) {
    if (error instanceof AuthError) {
      return "Something went wrong during logout. Please, try again.";
    }
    throw error;
  }
};
