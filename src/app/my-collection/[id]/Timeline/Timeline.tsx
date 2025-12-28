"use client";

import { Button } from "@/components/ui/button";
import { TimelineEvent } from "@/lib/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
import EventCard from "./EventCard";
import { EventForm } from "./EventForm";
import { TimelineIcon } from "./TimelineIcon";

interface TimelineProps {
  events: TimelineEvent[];
  plantId: string;
}

export default function Timeline({ events, plantId }: TimelineProps) {
  const [existingEvent, setExistingEvent] = useState<TimelineEvent | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const now = Date.now();

  const futureEvents = events
    .filter((ev) => ev.date.getTime() > now)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const futureCount = futureEvents.length;

  const pastEvents = events
    .filter((ev) => ev.date.getTime() <= now)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const openAddForm = () => {
    setExistingEvent(null);
    setIsFormOpen(true);
  };

  const openEditForm = (event: TimelineEvent) => {
    setExistingEvent(event);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Plant Care Timeline
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your plant's journey and care events
          </p>
        </div>
        <Button onClick={openAddForm} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Event
        </Button>
      </div>

      <div className="h-[600px] overflow-y-auto p-4 border sm:rounded-lg bg-card relative">
        <div className="relative">
          <div className="absolute top-0 bottom-0 w-[2px] bg-gray-300 pointer-events-none z-0 left-6 sm:left-1/2 sm:-translate-x-1/2" />

          {futureEvents.length > 0 && (
            <div className="relative">
              <div className="invisible sm:visible sticky top-0 ml-auto sm:ml-0 z-20 font-semibold text-sm text-gray-700 bg-sky-100 px-2 py-1 rounded shadow w-fit">
                Future events
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-y-4 sm:gap-y-8 pb-8">
                {futureEvents.map((event, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={event.id}
                      className="sm:contents flex flex-col sm:flex-row"
                    >
                      <div
                        className={`flex sm:justify-end sm:items-start ${
                          isLeft ? "pl-12 sm:pl-0 sm:pr-6" : ""
                        }`}
                      >
                        {isLeft && (
                          <div className="w-full sm:w-auto ml-4 sm:ml-6  sm:mr-6">
                            <EventCard
                              plantId={plantId}
                              event={event}
                              onEdit={openEditForm}
                              isFuture={true}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-start sm:justify-center order-first sm:order-none">
                        <div className="relative flex items-start">
                          <div className="sm:hidden mr-4">
                            <TimelineIcon event={event} />
                          </div>
                          <div className="hidden sm:block">
                            <TimelineIcon event={event} />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex sm:justify-start sm:items-start ${
                          !isLeft ? "pl-12 sm:pl-6" : ""
                        }`}
                      >
                        {!isLeft && (
                          <div className="w-full sm:w-auto ml-4 sm:ml-6 flex justify-start">
                            <EventCard
                              plantId={plantId}
                              event={event}
                              onEdit={openEditForm}
                              isFuture={true}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {futureEvents.length > 0 && pastEvents.length > 0 && (
            <div className="sm:col-span-3 relative z-10 flex flex-col items-center">
              <div className="absolute top-0 bottom-0 w-[2px] bg-gray-300 pointer-events-none z-0 left-6 sm:left-1/2 sm:-translate-x-1/2" />

              <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-gray-300 -translate-y-1/2 pointer-events-none" />

              <div className="sm:hidden absolute top-1/2 left-6 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center bg-gradient-to-br from-sky-700 to-orange-400 text-white rounded-full shadow-xl font-semibold px-4 py-2 text-md">
                <span>NOW</span>
              </div>

              <div className="hidden sm:flex relative z-10 items-center gap-3 bg-gradient-to-br from-sky-700 to-orange-400 text-white px-6 py-2 rounded-full shadow-xl font-semibold cursor-default mt-0">
                <div className="h-6 w-6 rounded-full bg-white border-2 border-white" />
                <span className="text-base">NOW</span>
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="relative">
              <div className="invisible sm:visible sticky top-0 ml-auto sm:ml-0 z-20 font-semibold text-sm text-gray-700 bg-orange-100 px-3 py-1 rounded shadow w-fit mb-2">
                Past events
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-y-4 sm:gap-y-8">
                {pastEvents.map((event, index) => {
                  const isLeft = (index + futureCount) % 2 === 0;

                  return (
                    <div
                      key={event.id}
                      className="sm:contents flex flex-col sm:flex-row"
                    >
                      <div
                        className={`flex sm:justify-end sm:items-start ${
                          isLeft ? "pl-12 sm:pl-0 sm:pr-6" : ""
                        }`}
                      >
                        {isLeft && (
                          <div className="w-full sm:w-auto ml-4 sm:ml-6  sm:mr-6">
                            <EventCard
                              plantId={plantId}
                              event={event}
                              onEdit={openEditForm}
                              isFuture={false}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-start sm:justify-center order-first sm:order-none">
                        <div className="relative flex items-start">
                          <div className="sm:hidden mr-4">
                            <TimelineIcon event={event} />
                          </div>
                          <div className="hidden sm:block">
                            <TimelineIcon event={event} />
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex sm:justify-start sm:items-start ${
                          !isLeft ? "pl-12 sm:pl-6" : ""
                        }`}
                      >
                        {!isLeft && (
                          <div className="w-full sm:w-auto ml-4 sm:ml-6  flex justify-start">
                            <EventCard
                              plantId={plantId}
                              event={event}
                              onEdit={openEditForm}
                              isFuture={false}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
