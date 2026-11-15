import { auth } from "@/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DemoLauncher from "./DemoLauncher";

export const metadata: Metadata = {
  title: "BloomSnap live demo",
  description:
    "Explore BloomSnap with a private sample plant collection. No account needed.",
};

// A shareable link that drops the visitor straight into the demo.
const DemoPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/my-collection");
  }

  return <DemoLauncher />;
};

export default DemoPage;
