import {
  EventIcon,
  eventIconsMap,
  predefinedEvents,
} from "@/lib/data/timeline-event-types";
import { CSSProperties } from "react";

interface IconRendererProps {
  className?: string;
  icon: EventIcon;
  style?: CSSProperties;
}

export function IconRenderer({
  className = "",
  icon,
  style,
}: IconRendererProps) {
  const IconComponent =
    eventIconsMap[icon] || eventIconsMap[predefinedEvents.purchase.icon];

  return <IconComponent className={className} style={style} />;
}
