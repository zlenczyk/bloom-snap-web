import { auth } from "@/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import EditProfileForm from "./EditProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      userName: true,
      image: true,
      createdAt: true,
      plants: { select: { id: true } },
    },
  });

  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-7xl mx-auto w-full layout-padding">
      <EditProfileForm
        userName={user.userName}
        image={user.image}
        createdAt={user.createdAt.toISOString()}
        plantsCount={user.plants.length}
      />
    </div>
  );
}
