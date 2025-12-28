"use server";

import db from "@/lib/db";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import z from "zod";
import { SignUpFormSchema } from "./schema";

type Errors = {
  userName?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type SignUpFormState = {
  message?: string;
  success?: boolean;
  errors?: Errors;
};

const signUp = async (state: SignUpFormState, formData: FormData) => {
  const validationResult = SignUpFormSchema.safeParse({
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
      message: "Input validation failed. Please check your entries.",
      success: false,
    } as const;
  }

  const { userName, email, password } = validationResult.data;

  const existingUsername = await db.user.findUnique({
    where: { userName: userName },
  });

  if (existingUsername) {
    return {
      errors: { userName: ["User with this userName already exist!"] },
      message: "User with this userName already exist!",
      success: false,
    };
  }

  const existingEmail = await db.user.findUnique({ where: { email: email } });

  if (existingEmail) {
    return {
      errors: { userName: ["User with this email already exist!"] },
      message: "User with this email already exist!",
      success: false,
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        profileCompleted: true,
      },
    });
  } catch {
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }

  redirect("/sign-in");
};

export default signUp;
