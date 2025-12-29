import { X as ClearIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TagsProps = {
  selectedItems: string[];
  toggleOption: (item: string) => void;
};

const Tags = ({ selectedItems, toggleOption }: TagsProps) => {
  const empty = selectedItems.length === 0;

  return (
    <div className="flex flex-wrap gap-1">
      {empty ? (
        <span className="text-muted-foreground">Select options...</span>
      ) : (
        selectedItems.map((item, index) => (
          <Badge
            key={`${item}-${index}`}
            variant="secondary"
            className="mr-1 mb-1 [&>svg]:pointer-events-auto whitespace-normal break-words"
          >
            {item}
            <ClearIcon
              className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(item);
              }}
            />
          </Badge>
        ))
      )}
    </div>
  );
};

export default Tags;
