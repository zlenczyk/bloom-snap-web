import { getTimelineEvents } from "@/lib/db/queries/getTimelineEvents";
import Timeline from "./Timeline/Timeline";

const Page = async () => {
  const events = await getTimelineEvents();

  return (
    <div className="w-full">
      {/* <PlantDetails /> */}
      <Timeline initialEvents={events} />
    </div>
  );
};

export default Page;
