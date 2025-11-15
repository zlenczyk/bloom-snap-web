"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plant } from "@prisma/client";
import { Edit } from "lucide-react";
import Background from "./Background";
import CareNotes from "./CareNotes";
import Characteristics from "./Characteristics";
import Environment from "./Environment";
import Gallery from "./Gallery";
import Growth from "./Growth";

interface PlantProps {
  plant: Plant;
}

const PlantDetails = ({ plant }: PlantProps) => {
  const characteristics = {
    commonName: plant.commonName,
    nickname: plant.nickname,
    genus: plant.genus,
    species: plant.species,
    isSafe: plant.isSafe,
    isAirPurifying: plant.isAirPurifying,
  };

  const background = {
    source: plant.source,
    ownedSince: plant.ownedSince,
    description: plant.description,
  };

  const growth = {
    currentHeight: plant.currentHeight,
    currentPotSize: plant.currentPotSize,
    lastRepotted: plant.lastRepotted,
  };

  const environment = {
    humidity: plant.humidity,
    temperature: plant.temperature,
    lightExposure: plant.lightExposure,
    windowDirection: plant.windowDirection,
    roomLocation: plant.roomLocation,
    growingMedium: plant.growingMedium,
    pottingMix: plant.pottingMix,
  };

  const careNotes = {
    wateringNotes: plant.wateringNotes,
    mistingNotes: plant.mistingNotes,
    leafCleaningNotes: plant.leafCleaningNotes,
    fertilizingNotes: plant.fertilizingNotes,
    additionalNotes: plant.additionalNotes,
  };

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <div className="mx-auto px-6 py-8 max-w-7xl w-full">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/my-collection">
                My Collection
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {plant.commonName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {plant.commonName}
            </h1>
          </div>
          <Button className="gap-2" size="sm">
            <Edit className="h-4 w-4" />
            Edit Plant Info
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-6">
              <Gallery />
            </div>

            <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
              <Characteristics characteristics={characteristics} />
              <Background background={background} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-6">
              <CareNotes careNotes={careNotes} />
            </div>

            <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
              <Growth growth={growth} />
              <Environment environment={environment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
