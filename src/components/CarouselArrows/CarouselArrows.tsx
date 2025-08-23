import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselArrowsProps {
  currentIndex: number;
  length: number;
  loop?: boolean;
  onIndexChange?: (index: number) => void;
}

const CarouselArrows = ({
  currentIndex,
  length,
  loop = true,
  onIndexChange,
}: CarouselArrowsProps) => {
  const next = () => {
    const nextIndex =
      currentIndex + 1 < length ? currentIndex + 1 : loop ? 0 : currentIndex;
    onIndexChange?.(nextIndex);
  };

  const prev = () => {
    const prevIndex =
      currentIndex - 1 >= 0
        ? currentIndex - 1
        : loop
        ? length - 1
        : currentIndex;
    onIndexChange?.(prevIndex);
  };

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/20 backdrop-blur-xl text-white opacity-0 transition-opacity group-hover:opacity-100"
        onClick={prev}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-2 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full bg-black/40 hover:bg-black/20 backdrop-blur-xl text-white opacity-0 transition-opacity group-hover:opacity-100"
        onClick={next}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </>
  );
};

export default CarouselArrows;
