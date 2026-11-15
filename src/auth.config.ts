import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import db from "./lib/db";
import { DEMO_LIFETIME_MS } from "./lib/demo/constants";
import { compare } from "bcryptjs";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not set");
}

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
        token.isDemo = user.isDemo ?? false;

        if (token.isDemo) {
          token.demoExpiresAt = Date.now() + DEMO_LIFETIME_MS;
        }
      }

      // Demo accounts are deleted after a day; their sessions end with them.
      if (token.isDemo && Date.now() > Number(token.demoExpiresAt)) {
        return null;
      }

      // A demo account can also be removed early (sign-out elsewhere, or the
      // oldest ones making room for new visitors). Check it still exists, at
      // most once a minute, and end the session if it does not.
      if (
        token.isDemo &&
        !user &&
        Date.now() - Number(token.demoCheckedAt ?? 0) > 60 * 1000
      ) {
        const exists = await db.user.count({ where: { id: token.id as string } });

        if (!exists) {
          return null;
        }

        token.demoCheckedAt = Date.now();
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
        session.user.isDemo = (token.isDemo as boolean) ?? false;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
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
    // "Try the demo": no credentials, every sign-in creates a fresh temporary
    // account with its own copy of the sample collection.
    Credentials({
      id: "demo",
      name: "Demo",
      credentials: {},
      authorize: async () => {
        // Loaded on demand so the sample data stays out of the middleware.
        const { createDemoAccount } = await import("./lib/demo/account");

        const user = await createDemoAccount();

        return {
          id: user.id,
          email: user.email,
          userName: user.userName,
          profileCompleted: true,
          isDemo: true,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
