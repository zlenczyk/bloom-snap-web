"use server";

import { auth, signOut } from "@/auth";
import db from "@/lib/db/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { PasswordSchema, UserNameSchema } from "../(auth)/sign-up/schema";
import { AvatarSchema } from "./types";

export type UserFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function updateUsername(
  state: UserFormState,
  userName: string
): Promise<UserFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const validationResult = UserNameSchema.safeParse({
      userName,
    });

    if (!validationResult.success) {
      return {
        errors: z.flattenError(validationResult.error).fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    await db.user.update({
      where: { id: session.user.id },
      data: { userName },
    });

    revalidatePath("/profile");

    return { success: true, message: "Username updated!" };
  } catch (error) {
    console.error("Error updating username:", error);

    return { success: false, message: "Failed to update username" };
  }
}

export async function changePassword(
  state: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const validationResult = PasswordSchema.safeParse({
      password: formData.get("password") || null,
      confirmPassword: formData.get("confirmPassword") || null,
    });

    if (!validationResult.success) {
      return {
        errors: z.flattenError(validationResult.error).fieldErrors,
        message: "Input validation failed. Please check your entries.",
        success: false,
      } as const;
    }

    const hashed = await bcrypt.hash(validationResult.data.password, 10);

    await db.user.update({
      where: { id: session.user.id },
      data: { password: hashed },
    });

    return { success: true, message: "Password updated!" };
  } catch (error) {
    console.error("Error updating password:", error);

    return { success: false, message: "Failed to update password" };
  }
}

export async function deleteAccount(): Promise<UserFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  try {
    const googleAccount = await db.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "google",
      },
    });

    if (googleAccount?.refresh_token) {
      await fetch("https://oauth2.googleapis.com/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: googleAccount.refresh_token,
        }),
      });
    }

    await db.user.delete({
      where: { id: session.user.id },
    });

    await signOut({ redirect: false });

    return { success: true, message: "Account deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete account" };
  }
}

export async function updateAvatar(
  state: UserFormState,
  formData: FormData
): Promise<UserFormState & { avatar?: string | null }> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const avatar = formData.get("avatar") || null;

  const validationResult = AvatarSchema.safeParse({
    avatar,
  });

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
      message: "Input validation failed. Please check your entries.",
      success: false,
    } as const;
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: validationResult.data.avatar },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: validationResult.data.avatar
        ? "Avatar updated!"
        : "Avatar removed!",
      avatar: validationResult.data.avatar ?? null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update avatar",
    };
  }
}
