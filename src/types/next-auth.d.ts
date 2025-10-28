import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      userName: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    userName: string;
    image?: string | null;
  }
}
