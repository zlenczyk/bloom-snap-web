"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import z from "zod";
import { UserNameSchema } from "../sign-up/schema";

type Errors = {
  userName?: string[];
};

export type CompleteProfileActionFormState = {
  message: string;
  success?: boolean;
  errors?: Errors;
};

export async function completeProfile(
  state: CompleteProfileActionFormState,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  try {
    const validationResult = UserNameSchema.safeParse({
      userName: formData.get("userName"),
    });

    if (!validationResult.success) {
      return {
        errors: z.flattenError(validationResult.error).fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    const validData = validationResult.data;

    const exists = await db.user.findUnique({
      where: { userName: validData.userName },
    });

    if (exists) {
      return { message: "Username already taken :(", success: false };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        userName: validData.userName,
        profileCompleted: true,
      },
    });

    return { success: true, message: "Profile completed successfully" };
  } catch (error) {
    console.error("Complete profile error:", error);

    return { success: false, message: "Failed to complete profile" };
  }
}
