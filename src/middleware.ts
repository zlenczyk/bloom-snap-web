import { NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_ROUTES = ["/contact", "/terms"];
const GUEST_ROUTES = ["/sign-in", "/sign-up", "/complete-profile"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/).*)"],
};

export default auth((req) => {
  const { nextUrl } = req;
  const user = req.auth?.user;
  const path = nextUrl.pathname;

  // Public pages → accessible for everyone
  if (PUBLIC_ROUTES.includes(path)) return NextResponse.next();

  // Guest pages → accessible only if NOT logged in
  if (GUEST_ROUTES.includes(path)) {
    if (user) {
      return NextResponse.redirect(new URL("/my-collection", nextUrl));
    }
    return NextResponse.next();
  }

  // Protected pages → require login
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  // Logged-in users can access protected pages
  return NextResponse.next();
});
