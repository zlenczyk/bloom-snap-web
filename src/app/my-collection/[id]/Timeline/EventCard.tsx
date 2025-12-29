import { TimelineEvent } from "@/app/my-collection/[id]/Timeline/types";
import LocalDate from "@/components/LocalDate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit2 as EditIcon } from "lucide-react";
import { DeleteEventButton } from "./DeleteEventButton";

type EventCardProps = {
  plantId: string;
  event: TimelineEvent;
  onEdit: (event: TimelineEvent) => void;
  isFuture: boolean;
};

const EventCard = ({ plantId, event, onEdit, isFuture }: EventCardProps) => {
  return (
    <Card
      className={`shadow-md hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br to-white backdrop-blur-sm w-full sm:w-auto sm:max-w-sm ${
        isFuture ? "from-sky-100/40" : "from-orange-100/40"
      }`}
    >
      <CardHeader className="p-3 sm:p-4 pb-3 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className={`gap-1.5 px-2.5 py-1 border-2 ${
                isFuture ? "bg-sky-200/40" : "bg-orange-200/40"
              } text-sm font-medium whitespace-normal break-words`}
            >
              <div
                className={`w-3 h-3 shrink-0 rounded-full ${event.color}`}
              ></div>
              <span className="text-base font-semibold whitespace-normal break-words">
                {event.title}
              </span>
            </Badge>
          </div>
          <div className="flex shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(event)}
              className="h-8 w-8 p-0 hover:bg-blue-50 ml-1"
            >
              <EditIcon className="w-3 h-3" />
            </Button>
            <DeleteEventButton plantId={plantId} eventId={event.id} />
          </div>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          <LocalDate date={event.date} />
        </div>
      </CardHeader>
      <CardContent className="pt-0 p-3 sm:p-4">
        <p className="text-sm text-muted-foreground leading-relaxed wrap-whitespace break-words">
          {event.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
