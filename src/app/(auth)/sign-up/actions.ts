"use server";

import SignUpFormSchema from "./schema";
import db from "@/lib/db";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

type InputErrors = {
  username?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

type SignUpFormErrorState = {
  isError: true;
  message: string;
  inputErrors?: InputErrors;
};

export type SignUpFormInitialState = {
  isError: false;
};

export type SignUpFormState = SignUpFormInitialState | SignUpFormErrorState;

const signUp = async (state: SignUpFormState, formData: FormData) => {
  const validationResult = SignUpFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationResult.success) {
    return {
      isError: true,
      message: "Input validation failed. Please check your entries.",
      inputErrors: validationResult.error.flatten().fieldErrors,
    } as const;
  }

  const { username, email, password } = validationResult.data;

  const existingUsername = await db.user.findUnique({
    where: { username: username },
  });

  if (existingUsername) {
    return {
      isError: true,
      message: "User with this username already exist",
      inputErrors: { username: ["User with this username already exist!"] },
    } as SignUpFormErrorState;
  }

  const existingEmail = await db.user.findUnique({ where: { email: email } });

  if (existingEmail) {
    return {
      isError: true,
      message: "User with this email already exist",
      inputErrors: { email: ["User with this email already exist!"] },
    } as SignUpFormErrorState;
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  } catch {
    return {
      isError: true,
      message: "An error occurred and user creation failed. Please try again.",
    } as const;
  }

  redirect("/sign-in");
};

export default signUp;
