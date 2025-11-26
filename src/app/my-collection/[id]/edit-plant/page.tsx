import PlantDetailsForm from "@/components/PlantForm/PlantDetailsForm";
import db from "@/lib/db/db";
import { notFound } from "next/navigation";
import createPlantPhotoAbsoluteUrls from "../createPlantPhotoAbsoluteUrls";

interface EditPlantPageProps {
  params: { id: string };
}

export default async function EditPlantPage({ params }: EditPlantPageProps) {
  const plant = await db.plant.findUnique({
    where: { id: params.id },
    include: {
      photos: true,
    },
  });

  if (!plant) {
    notFound();
  }

  const plantWithUrls = await createPlantPhotoAbsoluteUrls(plant);

  return <PlantDetailsForm existingPlant={plantWithUrls} />;
}
