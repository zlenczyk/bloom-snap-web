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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PlantWithAbsolutePhotoUrls } from "../../types";
import deletePlant from "../actions/deletePlant";
import Background from "./Background";
import CareNotes from "./CareNotes";
import Characteristics from "./Characteristics";
import Environment from "./Environment";
import Gallery from "./Gallery";
import Growth from "./Growth";

interface PlantProps {
  plant: PlantWithAbsolutePhotoUrls;
}

const PlantDetails = ({ plant }: PlantProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const router = useRouter();

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

  const handleEditPlant = () => {
    router.push(`/my-collection/${plant.id}/edit-plant`);
  };

  const handleDeletePlant = async () => {
    const { success } = await deletePlant(plant.id);

    if (success) {
      router.replace("/my-collection");

      toast.success(`${plant.commonName} deleted successfully`);

      return;
    }

    toast.error(`Failed to delete ${plant.commonName}`);
  };

  return (
    <div className="mx-auto max-w-7xl w-full">
      <Breadcrumb className="mb-4 px-4 sm:px-0">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/my-collection">My Collection</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize whitespace-normal break-words">
              {plant.commonName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between mb-8 px-4 sm:px-0 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 capitalize whitespace-normal break-words">
          {plant.commonName}
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-md shadow-sm"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={handleEditPlant}>
              <Edit className="h-4 w-4 text-zinc-600" />
              <span>Edit Plant Info</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setOpenDeleteDialog(true)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash className="h-4 w-4 text-red-600" />
              <span>Delete Plant</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className="rounded-lg">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              🗑️ You're about to remove{" "}
              <span className="font-medium text-zinc-800">
                {plant.commonName}
              </span>{" "}
              from your collection. Once it's gone, there's no way to bring it
              back. Are you ready to say goodbye? 💔
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDeleteDialog(false)}
            >
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDeletePlant}>
              Yes, delete it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-1 lg:col-span-6">
            <Gallery photos={plant.photos} />
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
  );
};

export default PlantDetails;
