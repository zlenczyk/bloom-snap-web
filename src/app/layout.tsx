import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./_styles";
import Header from "../components/Header/Header";

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
        <main className="h-screen flex flex-col justify-center items-center">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
