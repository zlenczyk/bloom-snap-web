import { auth } from "@/auth";
import PlantDetailsForm from "@/components/PlantForm/PlantDetailsForm";
import { redirect } from "next/navigation";

export default async function AddPlantPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return <PlantDetailsForm userId={session.user.id} />;
}
