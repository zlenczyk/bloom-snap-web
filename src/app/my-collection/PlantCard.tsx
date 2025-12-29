"use client";

import CarouselArrows from "@/components/CarouselArrows";
import LocalDate from "@/components/LocalDate";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Info,
  MapPin,
  PawPrint,
  ShoppingCart,
  Shovel,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlantWithAbsolutePhotoUrls } from "./types";

interface PlantCardProps {
  plant: PlantWithAbsolutePhotoUrls;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const photos =
    plant.photos?.map((photo) => ({ url: photo.absoluteUrl })) ?? [];

  return (
    <Card className="group relative h-88 sm:h-112 overflow-hidden transition-all hover:shadow-lg">
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

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-1 whitespace-normal break-words line-clamp-2 sm:line-clamp-3">
            {plant.commonName}
          </h3>
          <div className="overflow-hidden">
            <div
              className={cn(
                "transition-[max-height, opacity]  duration-400 ease-in-out flex flex-col",
                currentImageIndex === 0
                  ? "max-h-88 sm:max-h-112 opacity-100"
                  : " max-h-0 opacity-0"
              )}
            >
              {plant.nickname && (
                <p className="text-sm text-white/80 whitespace-normal break-words line-clamp-1 sm:line-clamp-2">
                  "{plant.nickname}"
                </p>
              )}
              {(plant.genus || plant.species) && (
                <p className="mt-1 text-sm italic text-white/70 whitespace-normal break-words">
                  {plant.genus && (
                    <span className="line-clamp-1 sm:line-clamp-2">
                      {plant.genus}
                      {plant.species && ", "}
                    </span>
                  )}

                  {plant.species && (
                    <span className="line-clamp-1 sm:line-clamp-2">
                      {plant.species}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div
              className={cn(
                "transition-[max-height, opacity] duration-400 ease-in-out flex flex-wrap gap-2 mt-2 mb-3",
                currentImageIndex === 0
                  ? "max-h-88 sm:max-h-112 opacity-100"
                  : " max-h-0 opacity-0"
              )}
            >
              {plant.roomLocation && (
                <Badge
                  className={
                    "flex-inline items-center gap-1 text-white backdrop-blur-xl transition-colors duration-400 max-w-full bg-white/20"
                  }
                >
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {plant.roomLocation}
                  </span>
                </Badge>
              )}

              {plant.ownedSince && (
                <Badge
                  className={
                    "flex-inline items-center gap-1 text-white backdrop-blur-xl transition-colors duration-400 bg-white/20"
                  }
                >
                  <ShoppingCart className="h-3 w-3" />
                  <LocalDate date={plant.ownedSince} />
                </Badge>
              )}

              {plant.lastRepotted && (
                <Badge
                  className={
                    "flex-inline items-center gap-1 text-white backdrop-blur-xl transition-colors duration-400 bg-white/20"
                  }
                >
                  <Shovel className="h-3 w-3" />
                  <LocalDate date={plant.lastRepotted} />
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
                      index === currentImageIndex
                        ? "bg-white w-3"
                        : "bg-white/50"
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
      </div>
    </Card>
  );
};

export default PlantCard;
