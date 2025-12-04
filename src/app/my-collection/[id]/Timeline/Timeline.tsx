"use client";

import { Button } from "@/components/ui/button";
import { TimelineEvent } from "@/lib/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
import EventCard from "./EventCard";
import { EventForm } from "./EventForm";
import { TimelineIcon } from "./TimelineIcon";

interface TimelineProps {
  initialEvents: TimelineEvent[];
  plantId: string;
}

export default function Timeline({ initialEvents, plantId }: TimelineProps) {
  const [existingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const sortedEvents = [...initialEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const openAddForm = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (event: TimelineEvent) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Plant Care Timeline
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your plant's journey and care events
          </p>
        </div>
        <Button onClick={openAddForm} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Event
        </Button>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-200 via-green-200 to-purple-200" />
        <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-blue-200 via-green-200 to-purple-200" />

        <div className="space-y-8">
          {sortedEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  isEven ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <EventCard
                  plantId={plantId}
                  event={event}
                  onEdit={openEditForm}
                />

                <TimelineIcon event={event} />
              </div>
            );
          })}
        </div>
      </div>
      <EventForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        existingEvent={existingEvent}
        plantId={plantId}
      />
    </div>
  );
}
