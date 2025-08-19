import { TimelineEvent } from "@/lib/db/schema";
import { IconRenderer } from "./IconRenderer";

interface TimelineIconProps {
  event: TimelineEvent;
}

export function TimelineIcon({ event }: TimelineIconProps) {
  return (
    <div
      className={`absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full ${event.color} flex items-center justify-center shadow-lg z-10`}
    >
      <IconRenderer icon={event.icon} className="w-5 h-5 text-white" />
    </div>
  );
}
