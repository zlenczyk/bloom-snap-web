import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import db from "./lib/db/db";
import { compare } from "bcryptjs";

const credentialsSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email",
  }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

const getUser = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};

export const authConfig = {
  pages: {
    signIn: "/sign-in",
    newUser: "/complete-profile",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userName = user.userName;
        token.profileCompleted = user.profileCompleted ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.userName = token.userName as string;
        session.user.profileCompleted =
          (token.profileCompleted as boolean) ?? false;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET ?? "",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          userName: null,
          profileCompleted: false,
        };
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        //TODO: check parseAsync?
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          userName: user.userName,
          profileCompleted: user.profileCompleted,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
