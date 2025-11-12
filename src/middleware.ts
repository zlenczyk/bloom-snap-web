import { NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_ROUTES = ["/contact", "/terms"];
const GUEST_ROUTES = ["/sign-in", "/sign-up"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/).*)"],
};

export default auth((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const user = req.auth?.user;

  // Public pages → always allowed
  if (PUBLIC_ROUTES.includes(path)) return NextResponse.next();

  // Guest pages → allowed if NOT logged in
  if (GUEST_ROUTES.includes(path)) {
    if (user?.profileCompleted) {
      return NextResponse.redirect(new URL("/my-collection", nextUrl));
    }

    return NextResponse.next();
  }

  // Require login
  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  // Temp users → force complete-profile
  if (
    !user.profileCompleted &&
    !GUEST_ROUTES.includes(path) &&
    path !== "/complete-profile"
  ) {
    return NextResponse.redirect(new URL("/complete-profile", nextUrl));
  }

  // Normal users → block access to complete-profile
  if (user.profileCompleted && path === "/complete-profile") {
    return NextResponse.redirect(new URL("/my-collection", nextUrl));
  }

  return NextResponse.next();
});
