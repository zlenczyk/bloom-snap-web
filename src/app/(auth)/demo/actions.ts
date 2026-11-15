"use server";

import { auth, signIn } from "@/auth";
import { removeOldDemoAccounts } from "@/lib/demo/account";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { after } from "next/server";

// Signs the visitor into a brand new demo account and sends them to its
// sample collection. Returns an error message if that fails.
export const startDemo = async (): Promise<string | undefined> => {
  const session = await auth();

  if (session?.user) {
    redirect("/my-collection");
  }

  // Housekeeping happens after the response, so nobody waits for it.
  after(async () => {
    try {
      await removeOldDemoAccounts();
    } catch (error) {
      console.error("Failed to remove old demo accounts:", error);
    }
  });

  try {
    await signIn("demo", { redirectTo: "/my-collection" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error("Failed to start the demo:", error);

      return "We couldn't set up the demo. Please try again.";
    }

    throw error;
  }
};
