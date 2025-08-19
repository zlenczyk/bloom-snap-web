"use client";

import {
  eventIcons,
  eventColors,
  EventIcon,
  EventColor,
} from "@/lib/data/timeline-event-types";
import { IconRenderer } from "./IconRenderer";

interface EventStyleSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: EventIcon) => void;
  selectedColor: string;
  onSelectColor: (color: EventColor) => void;
}

export function EventStyleSelector({
  selectedIcon,
  onSelectIcon,
  selectedColor,
  onSelectColor,
}: EventStyleSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium">Select Icon</label>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-2 mt-2 border rounded-md p-2 max-h-40 overflow-y-auto">
          {eventIcons.map((eventIcon) => (
            <button
              key={eventIcon}
              type="button"
              onClick={() => onSelectIcon(eventIcon)}
              className={`w-full aspect-square flex items-center justify-center rounded-full border-2 hover:bg-gray-100 transition-colors
          ${
            selectedIcon === eventIcon
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
            >
              <IconRenderer icon={eventIcon} className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Select Color</label>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(36px,1fr))] gap-2 mt-2 border rounded-md p-2 max-h-40 overflow-y-auto">
          {eventColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onSelectColor(color)}
              title={color.replace("bg-", "")}
              className={`w-full aspect-square flex items-center justify-center rounded-full ring-2 ring-offset-2 transition-colors ${color} hover:brightness-80 transition ${
                selectedColor === color ? "ring-blue-600" : "ring-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
