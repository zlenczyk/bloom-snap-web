"use client";

import CarouselArrows from "@/components/CarouselArrows";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Info, MapPin, PawPrint, ShoppingCart, Wind } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlantWithPhotos } from "./types";

interface PlantCardProps {
  plant: PlantWithPhotos;
}

const formatDate = (date: string | Date) => {
  return format(new Date(date), "MMM d, yyyy");
};

const PlantCard = ({ plant }: PlantCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formattedOwnedSince = plant.ownedSince
    ? formatDate(plant.ownedSince)
    : null;

  const photos = plant.photos?.map((photo) => ({ url: photo.url })) ?? [];

  return (
    <Card className="group relative h-[450px] overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-full w-full overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {photos.length > 0
              ? photos.map((photo, index) => (
                  <div
                    key={index}
                    className="h-full w-full flex-shrink-0 relative"
                  >
                    <Image
                      src={photo.url}
                      alt={`${plant.commonName} - image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      priority={index === 0}
                    />
                  </div>
                ))
              : null}

            {photos.length === 0 && <div className="h-full w-full bg-black" />}
          </div>
        </div>

        {photos.length > 1 && (
          <CarouselArrows
            length={photos.length}
            onIndexChange={(index) => setCurrentImageIndex(index)}
            currentIndex={currentImageIndex}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute right-3 top-3 flex gap-2">
          {plant.isSafe && (
            <div
              className="
        group/badge relative flex items-center justify-center
        h-8 w-8 rounded-full bg-emerald-500/70 backdrop-blur-xl overflow-hidden
        transition-all duration-300 ease-in-out
        hover:w-[6.5rem]
      "
              title="Pet friendly"
            >
              <PawPrint
                className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-300 ease-in-out group-hover/badge:scale-110"
                strokeWidth={2.5}
              />
              <span
                className="
          text-xs font-medium text-white whitespace-nowrap
          opacity-0 max-w-0 overflow-hidden
          transition-all duration-300 ease-in-out
          group-hover/badge:opacity-100 group-hover/badge:max-w-[4rem] group-hover/badge:ml-1.5
        "
              >
                Pet Safe
              </span>
            </div>
          )}

          {plant.isAirPurifying && (
            <div
              className="
        group/badge relative flex items-center justify-center
        h-8 w-8 rounded-full bg-sky-500/70 backdrop-blur-xl overflow-hidden
        transition-all duration-300 ease-in-out
        hover:w-[6.5rem]
      "
              title="Air purifying"
            >
              <Wind
                className="h-4 w-4 text-white flex-shrink-0 transition-transform duration-300 ease-in-out group-hover/badge:scale-110"
                strokeWidth={2.5}
              />
              <span
                className="
          text-xs font-medium text-white whitespace-nowrap
          opacity-0 max-w-0 overflow-hidden
          transition-all duration-300 ease-in-out
          group-hover/badge:opacity-100 group-hover/badge:max-w-[4rem] group-hover/badge:ml-1.5
        "
              >
                Air Pure
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {plant.commonName}
          </h3>
          <div
            className={cn(
              "overflow-hidden transition-[max-height,transform] duration-400 ease-in-out",
              currentImageIndex === 0 ? "max-h-40" : "max-h-0"
            )}
          >
            <div
              className={cn(
                "transition-opacity duration-400 ease-in-out",
                currentImageIndex === 0 ? "opacity-100" : "opacity-0"
              )}
            >
              {plant.nickname && (
                <p className="text-sm text-white/80">"{plant.nickname}"</p>
              )}
              {(plant.genus || plant.species) && (
                <p className="mt-1 text-sm italic text-white/70 whitespace-normal break-words">
                  {plant.genus}
                  {plant.genus && plant.species && ", "}
                  {plant.species}
                </p>
              )}
            </div>

            {plant.roomLocation && (
              <Badge
                className={cn(
                  "flex-inline items-center gap-1 text-white backdrop-blur-xl transition-colors duration-400 my-2 mr-2",
                  currentImageIndex === 0 ? "bg-white/20" : "bg-white/0"
                )}
              >
                <MapPin className="h-3 w-3" />
                {plant.roomLocation}
              </Badge>
            )}

            {formattedOwnedSince && (
              <Badge
                className={cn(
                  "flex-inline items-center gap-1 text-white backdrop-blur-xl transition-colors duration-400",
                  currentImageIndex === 0 ? "bg-white/20" : "bg-white/0"
                )}
              >
                <ShoppingCart className="h-3 w-3" />
                {formattedOwnedSince}
              </Badge>
            )}
          </div>

          <div className="flex justify-center gap-1">
            {photos.length > 1 &&
              photos.map((_, index) => (
                <div
                  key={`image-indicator-${index}`}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all mt-1",
                    index === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                  )}
                />
              ))}
          </div>
          <Link
            href={`my-collection/${plant.id}`}
            className="flex items-center gap-1 mt-2 cursor-pointer justify-center rounded-full bg-white/20 hover:bg-white/30 px-4 py-1.5 text-sm text-white backdrop-blur-sm"
          >
            See full details
            <Info className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PlantCard;
