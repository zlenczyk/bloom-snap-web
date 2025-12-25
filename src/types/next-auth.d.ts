import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      userName: string | null;
      profileCompleted: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    userName: string | null;
    profileCompleted: boolean;
  }
}
