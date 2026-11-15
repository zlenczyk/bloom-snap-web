import { auth } from "@/auth";
import PlantDetailsForm from "@/components/PlantForm/PlantDetailsForm";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import createPlantPhotoAbsoluteUrls from "../actions/createPlantPhotoAbsoluteUrls";

interface EditPlantPageProps {
  params: Promise<{ id: string }>;
}

const EditPlantPage = async ({ params }: EditPlantPageProps) => {
  const { id: plantId } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Only the owner may open the edit form.
  const plant = await db.plant.findFirst({
    where: { id: plantId, userId: session.user.id },
    include: {
      photos: true,
    },
  });

  if (!plant) {
    notFound();
  }

  const plantWithUrls = await createPlantPhotoAbsoluteUrls(plant);

  return (
    <PlantDetailsForm existingPlant={plantWithUrls} userId={session.user.id} />
  );
};

export default EditPlantPage;
