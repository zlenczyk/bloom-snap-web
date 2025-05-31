import { X as ClearIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClearButtonProps {
  onClear: () => void;
  className?: string;
}

export function InputClearButton({
  onClear,
  className = "absolute right-8 top-0 h-full",
}: ClearButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${className}`}
      onClick={onClear}
      aria-label="Clear selection"
    >
      <ClearIcon className="h-4 w-4" />
    </Button>
  );
}
