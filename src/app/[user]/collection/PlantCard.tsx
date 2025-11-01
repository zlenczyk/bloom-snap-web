"use client";

import CarouselArrows from "@/components/CarouselArrows";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Compass,
  HeartCrack,
  Info,
  MapPin,
  PawPrint,
  ShoppingCart,
  Wind,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import { Plant } from "./Collection";
import { WINDOW_DIRECTION_OPTIONS } from "@/lib/data/plantDetailsTypes";
import { Plant } from "@prisma/client";

interface PlantCardProps {
  plant: Plant;
}

const formatDate = (date: string | Date) => {
  return format(new Date(date), "MMM d, yyyy");
};

const PlantCard = ({ plant }: PlantCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formattedOwnedSince = plant.ownedSince
    ? formatDate(plant.ownedSince)
    : null;

  // const images = plant.pictures?.map((pic) => pic.url) ?? [];

  const images = [
    "/assets/monstera-1.webp",
    "/assets/snake-plant-3.jpg",
    "/assets/pothos-1.webp",
    "/assets/spider-plant-1.jpg",
    "/assets/fiddle-leaf-fig-2.jpg",
  ];

  const isSingleImageView = Boolean(
    plant.roomLocation ||
      formattedOwnedSince ||
      plant.windowDirection ||
      plant.isSafe ||
      plant.isAirPurifying
  );

  const isFirstPageMultiImageView = Boolean(
    plant.roomLocation || formattedOwnedSince
  );

  const isSecondPageMultiImageView = Boolean(
    plant.windowDirection || plant.isSafe || plant.isAirPurifying
  );

  return (
    <Card className="group relative h-[450px] overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-full w-full overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.length > 0
              ? images.map((image, index) => (
                  <div
                    key={index}
                    className="h-full w-full flex-shrink-0 relative"
                  >
                    <Image
                      src={image}
                      alt={`${plant.commonName} - image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      priority={index === 0}
                    />
                  </div>
                ))
              : null}

            {images.length === 0 && <div className="h-full w-full bg-black" />}
          </div>
        </div>

        {images.length > 1 && (
          <CarouselArrows
            length={images.length}
            onIndexChange={(index) => setCurrentImageIndex(index)}
            currentIndex={currentImageIndex}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* <div className="absolute left-0 right-0 top-0 z-10 flex justify-end p-3 ">
          {!plant.isHealthy ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-white bg-red-700/70 backdrop-blur-xl mb-6"
            >
              <HeartCrack className="h-4 w-4" />
              Needs attention
            </Badge>
          ) : null}
        </div> */}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {plant.commonName}
          </h3>
          {images.length < 2 && (
            <>
              {plant.nickname && (
                <p className="text-sm text-white/80">"{plant.nickname}"</p>
              )}
              {(plant.genus || plant.species) && (
                <p className="mt-1 text-sm italic text-white/70">
                  {plant.genus}, {plant.species}
                </p>
              )}

              {isSingleImageView && (
                <div className="mt-2 mb-2 flex flex-wrap gap-2">
                  {plant.roomLocation && (
                    <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                      <MapPin className="h-3 w-3" />
                      {plant.roomLocation}
                    </Badge>
                  )}
                  {formattedOwnedSince && (
                    <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                      <ShoppingCart className="h-3 w-3" />
                      {formattedOwnedSince}
                    </Badge>
                  )}
                  {plant.windowDirection && (
                    <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                      <Compass className="h-3 w-3" />
                      {WINDOW_DIRECTION_OPTIONS[plant.windowDirection].short}
                    </Badge>
                  )}
                  {plant.isSafe && (
                    <Badge className="flex items-center gap-1 bg-green-600/50 backdrop-blur-xl text-white">
                      <PawPrint className="h-4 w-4" />
                      Pet friendly
                    </Badge>
                  )}
                  {plant.isAirPurifying && (
                    <Badge className="flex items-center gap-1 bg-blue-400/50 backdrop-blur-xl text-white">
                      <Wind className="h-3 w-3" />
                      Air purifying
                    </Badge>
                  )}
                </div>
              )}
            </>
          )}

          {images.length >= 2 && (
            <>
              {currentImageIndex === 0 && (
                <>
                  {plant.nickname && (
                    <p className="text-sm text-white/80">"{plant.nickname}"</p>
                  )}
                  {(plant.genus || plant.species) && (
                    <p className="mt-1 text-sm italic text-white/70">
                      {plant.genus}, {plant.species}
                    </p>
                  )}
                  {isFirstPageMultiImageView && (
                    <div className="mt-2 mb-2 flex flex-wrap gap-2">
                      {plant.roomLocation && (
                        <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                          <MapPin className="h-3 w-3" />
                          {plant.roomLocation}
                        </Badge>
                      )}
                      {formattedOwnedSince && (
                        <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                          <ShoppingCart className="h-3 w-3" />
                          {formattedOwnedSince}
                        </Badge>
                      )}
                    </div>
                  )}
                </>
              )}

              {currentImageIndex === 1 && isSecondPageMultiImageView && (
                <div className="mt-2 mb-2 flex flex-wrap gap-2">
                  {plant.windowDirection && (
                    <Badge className="flex items-center gap-1 bg-white/20 backdrop-blur-xl text-white">
                      <Compass className="h-3 w-3" />
                      {WINDOW_DIRECTION_OPTIONS[plant.windowDirection].short}
                    </Badge>
                  )}
                  {plant.isSafe && (
                    <Badge className="flex items-center gap-1 bg-green-600/50 backdrop-blur-xl text-white">
                      <PawPrint className="h-4 w-4" />
                      Pet friendly
                    </Badge>
                  )}
                  {plant.isAirPurifying && (
                    <Badge className="flex items-center gap-1 bg-blue-400/50 backdrop-blur-xl text-white">
                      <Wind className="h-3 w-3" />
                      Air purifying
                    </Badge>
                  )}
                </div>
              )}
            </>
          )}

          <div className="flex justify-center gap-1">
            {images.length > 1 &&
              images.map((_, index) => (
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
            href={`collection/${plant.id}`}
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
