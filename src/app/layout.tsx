import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header/Header";
import "./_styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BloomSnap",
  description: "Capture and share your houseplant haven",
};

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-header-height">{children}</main>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
