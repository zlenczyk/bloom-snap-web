import { auth } from "@/auth";
import db from "@/lib/db";
import { DEMO_LIFETIME_HOURS } from "@/lib/demo/constants";
import Link from "next/link";
import Menu from "./Menu";

const Header = async () => {
  const session = await auth();

  let user;

  if (session?.user?.id) {
    user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        image: true,
        userName: true,
        profileCompleted: true,
        isDemo: true,
      },
    });
  }

  return (
    <header className="w-full h-header-height fixed top-0 z-50 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-100 shadow-md"></div>
      <div className="relative flex items-center justify-between mx-auto w-full max-w-7xl py-2 h-full">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center text-xl sm:text-2xl font-extrabold italic text-green-700"
          >
            BloomSnap
          </Link>

          {user?.isDemo && (
            <span
              className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm"
              title={`Sample data that only you can see. It is deleted after ${DEMO_LIFETIME_HOURS} hours.`}
            >
              Live demo
            </span>
          )}
        </div>

        {user?.profileCompleted && (
          <Menu userImage={user.image} userName={user.userName} />
        )}
      </div>
    </header>
  );
};

export default Header;
