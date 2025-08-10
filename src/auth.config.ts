import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import db from "./lib/db/db";
import { compare } from "bcryptjs";

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
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user?.id) token.id = user.id;

      return token;
    },
    // return !!auth;

    // const isLoggedIn = !!auth?.user;
    // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    // const isOnAuth = nextUrl.pathname.startsWith("/sign-in");

    // if (isOnDashboard) {
    //   if (isLoggedIn) return true;
    //   return Response.redirect(new URL("/sign-in", nextUrl));
    // }

    // if (isOnAuth) {
    //   if (!isLoggedIn) return true;
    //   return Response.redirect(new URL("/dashboard", nextUrl));
    // }

    // return true;
    // }
  },
  secret: process.env.AUTH_SECRET ?? "",
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
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
          password: user.password,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
