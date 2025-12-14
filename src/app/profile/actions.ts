"use server";

import { auth } from "@/auth";
import db from "@/lib/db/db";
import bcrypt from "bcryptjs";

export async function updateProfile(userName: string) {
  const session = await auth();

  if (!session?.user?.id) return;

  await db.user.update({
    where: { id: session.user.id },
    data: { userName: userName },
  });
}

export async function updatePassword(password: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  const hashed = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });
}

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) return;

  await db.user.delete({
    where: { id: session.user.id },
  });
}
