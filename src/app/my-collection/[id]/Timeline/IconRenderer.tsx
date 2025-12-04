import {
  EventIcon,
  eventIconsMap,
  predefinedEvents,
} from "@/lib/data/timelineEventTypes";

interface IconRendererProps {
  className?: string;
  icon: EventIcon;
}

export function IconRenderer({ className = "", icon }: IconRendererProps) {
  const IconComponent =
    eventIconsMap[icon] || eventIconsMap[predefinedEvents.purchase.icon];

  return <IconComponent className={className} />;
}
