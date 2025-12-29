import { getTimelineEvents } from "@/app/my-collection/[id]/actions/getTimelineEvents";
import { getPlantDetails } from "./actions/getPlantDetails";
import PlantDetails from "./PlantDetails/PlantDetails";
import Timeline from "./Timeline/Timeline";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id: plantId } = await params;

  const plant = await getPlantDetails(plantId);
  const events = await getTimelineEvents(plantId);

  return (
    <>
      <div className="bg-zinc-100 sm:px-6 py-6 sm:py-8">
        <PlantDetails plant={plant} />
      </div>

      <div className="sm:px-6 py-6 sm:py-8">
        <Timeline events={events} plantId={plantId} />
      </div>
    </>
  );
};

export default Page;
