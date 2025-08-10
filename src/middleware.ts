// // export { auth as middleware } from "@/auth";
// // import { NextRequest } from "next/server";
// // import { authConfig } from "./auth.config";
// // import NextAuth, { Session } from "next-auth";

// import NextAuth, { type Session } from "next-auth"; //  { type Session }
// import { authConfig } from "@/auth.config";
// import { NextRequest } from "next/server";
// import { PUBLIC_ROUTES } from "./lib/routes";
// // import { NextRequest } from "next/server";

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

// const { auth } = NextAuth(authConfig);

// type NextAuthRequest = NextRequest & { auth: Session | null };

// export default auth((request: NextAuthRequest): Response | void => {
//   const { auth, nextUrl } = request;

//   const isLoggedIn = !!auth?.user;

//   const path = nextUrl.pathname;
//   console.log("pahname: ", path);

//   if (!isLoggedIn && !PUBLIC_ROUTES.includes(path)) {
//     console.log("test");
//     return Response.redirect(new URL("/sign-in", nextUrl));
//   }

//   console.log("pahname: ", path);

//   console.log("public routes: ", PUBLIC_ROUTES);
//     // Allow only access to sign-in and sign-up pages for unauthenticated users
//     // if (!isLoggedIn && !PUBLIC_ROUTES.some(route => path.startsWith(route))) {
//     //   console.log("test");
//     //   return Response.redirect(new URL("/sign-in", nextUrl));
//     // }

//   // if (isLoggedIn && ["/sign-in", "/sign-up"].includes(nextUrl.pathname)) {
//   //   return Response.redirect(new URL("/dashboard", nextUrl));
//   // }

//   // Prevent logged-in users from accessing sign-in or sign-up pages
//   if (isLoggedIn && PUBLIC_ROUTES.some(route => path.startsWith(route))) {
//     return Response.redirect(new URL("/dashboard", nextUrl));
//   }

//   return; // Allow access
// });

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

// export { auth as middleware } from "@/auth";

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);
