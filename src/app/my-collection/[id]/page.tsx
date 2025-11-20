import { getTimelineEvents } from "@/lib/db/queries/getTimelineEvents";
import { getPlantDetails } from "./PlantDetails/actions";
import PlantDetails from "./PlantDetails/PlantDetails";
import Timeline from "./Timeline/Timeline";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const events = await getTimelineEvents();

  const { id: plantId } = await params;
  const plant = await getPlantDetails(plantId);

  return (
    <div className="w-full">
      <PlantDetails plant={plant} />
      <Timeline initialEvents={events} />
    </div>
  );
};

export default Page;
