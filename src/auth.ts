import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { compare } from "bcryptjs";
import * as z from "zod";

const credentialsSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      console.log("is logged in: ", isLoggedIn);

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }

        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //TODO: consider augmenting the User Interface
      // https://authjs.dev/getting-started/typescript#module-augmentation
      authorize: async (credentials) => {
        //TODO: check parseAsync?
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const existingUser = await db.user.findUnique({
          where: { email: email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(password, existingUser.password);

        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          password: existingUser.password,
        };
      },
    }),
  ],
});
