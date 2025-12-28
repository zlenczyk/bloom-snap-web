import { auth } from "@/auth";
import db from "@/lib/db";
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
      },
    });
  }

  return (
    <header className="w-full h-header-height fixed top-0 z-50 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-100 shadow-md"></div>
      <div className="relative flex items-center justify-between mx-auto w-full max-w-7xl py-2 h-full">
        <Link
          href="/"
          className="flex items-center justify-center text-xl sm:text-2xl font-extrabold italic text-green-700"
        >
          BloomSnap
        </Link>

        {user?.profileCompleted && (
          <Menu userImage={user.image} userName={user.userName} />
        )}
      </div>
    </header>
  );
};

export default Header;
