"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// ...

export const authenticateCredentials = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong. Please, try again.";
      }
    }
    throw error;
  }
};

export const authenticateGoogle = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("google");
  } catch (error) {
    if (error instanceof AuthError) {
      return "An error occurred during Google authentication. Please try again.";
    }
    throw error;
  }
};
