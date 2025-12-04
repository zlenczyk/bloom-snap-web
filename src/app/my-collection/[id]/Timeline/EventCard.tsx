import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineEvent } from "@/lib/db/schema";
import { format } from "date-fns";
import { Edit2 as EditIcon } from "lucide-react";
import { DeleteEventButton } from "./DeleteEventButton";

type EventCardProps = {
  plantId: string;
  event: TimelineEvent;
  onEdit: (event: TimelineEvent) => void;
};

const EventCard = ({ plantId, event, onEdit }: EventCardProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm max-w-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-base font-semibold">{event.title}</span>
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(event)}
              className="h-8 w-8 p-0 hover:bg-blue-50"
            >
              <EditIcon className="w-3 h-3" />
            </Button>
            <DeleteEventButton plantId={plantId} eventId={event.id} />
          </div>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {format(new Date(event.date), "MMM dd, yyyy")}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default EventCard;
