import PlantDetailsForm from "@/components/PlantForm/PlantDetailsForm";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import createPlantPhotoAbsoluteUrls from "../actions/createPlantPhotoAbsoluteUrls";

interface EditPlantPageProps {
  params: Promise<{ id: string }>;
}

const EditPlantPage = async ({ params }: EditPlantPageProps) => {
  const { id: plantId } = await params;

  const plant = await db.plant.findUnique({
    where: { id: plantId },
    include: {
      photos: true,
    },
  });

  if (!plant) {
    notFound();
  }

  const plantWithUrls = await createPlantPhotoAbsoluteUrls(plant);

  return <PlantDetailsForm existingPlant={plantWithUrls} />;
};

export default EditPlantPage;
