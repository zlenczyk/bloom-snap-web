"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Background from "./Background";
import CareNotes from "./CareNotes";
import Characteristics from "./Characteristics";
import Environment from "./Environment";
import Gallery from "./Gallery";
import Growth from "./Growth";

const PlantDetails = () => {
  return (
    <div className="flex min-h-screen bg-zinc-100">
      <div className="mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Fiddle Leaf Fig
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
              <Characteristics />
              <Background />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="col-span-1 lg:col-span-6">
              <CareNotes />
            </div>

            <div className="col-span-1 lg:col-span-6 flex flex-col gap-8">
              <Environment />
              <Growth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
