"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X } from "lucide-react";
import { useState } from "react";

type CultivationType = "soil" | "semi-hydroponics" | "hydroponics";

const semiHydroponicOptions = [
  "LECA (Lightweight Expanded Clay Aggregate)",
  "Sphagnum Moss",
  "Perlite",
  "Pumice",
  "Coco Coir (Coconut Husk)",
  "Rockwool",
  "Hydroton",
  "Rice Hulls",
  "Zeolite",
  "Vermiculite",
  "Charcoal",
];

const soilOptions = [
  "All-Purpose Potting Soil",
  "Cactus Mix",
  "Succulent Mix",
  "Peat-Based Potting Mix",
  "Coconut Coir",
  "Perlite",
];

export const CultivationType = () => {
  const [cultivationType, setCultivationType] = useState<CultivationType | "">(
    ""
  );

  const [semiHydroponic, setSemiHydroponic] = useState<string[]>([]);
  const [soil, setSoil] = useState<string[]>([]);

  const toggleTags = (prev: string[], option: string): string[] =>
    prev.includes(option)
      ? prev.filter((tag) => tag !== option)
      : [...prev, option];

  const handleSemiHydroponic = (option: string) => {
    setSemiHydroponic((prev) => toggleTags(prev, option));
  };

  const handleSoil = (option: string) => {
    setSoil((prev) => toggleTags(prev, option));
  };

  return (
    // <div className="space-y-2">
    //   <Label className="text-sm font-medium text-gray-700">
    //     Cultivation Type
    //   </Label>
    <>
      <RadioGroup
        onValueChange={(value) => setCultivationType(value as CultivationType)}
        className="flex flex-col space-y-1 mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="soil" id="soil" />
          <Label htmlFor="soil">Soil</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="semi-hydroponics" id="semi-hydroponics" />
          <Label htmlFor="semi-hydroponics">Semi-hydroponics</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hydroponics" id="hydroponics" />
          <Label htmlFor="hydroponics">Hydroponics</Label>
        </div>
      </RadioGroup>

      {cultivationType === "soil" && (
        <div className="mt-4 space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Soil options
          </Label>
          <div className="flex flex-wrap gap-2">
            {soilOptions.map((option) => (
              <Badge
                key={option}
                variant={soil.includes(option) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSoil(option)}
              >
                {option}
                {soil.includes(option) && (
                  <X
                    className="ml-1 h-3 w-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSoil(option);
                    }}
                  />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {cultivationType === "semi-hydroponics" && (
        <div className="mt-4 space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Semi-hydroponics options
          </Label>
          <div className="flex flex-wrap gap-2">
            {semiHydroponicOptions.map((option) => (
              <Badge
                key={option}
                variant={
                  semiHydroponic.includes(option) ? "default" : "outline"
                }
                className="cursor-pointer"
                onClick={() => handleSemiHydroponic(option)}
              >
                {option}
                {semiHydroponic.includes(option) && (
                  <X
                    className="ml-1 h-3 w-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSemiHydroponic(option);
                    }}
                  />
                )}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {cultivationType === "hydroponics" && (
        <p className="mt-2 text-sm text-gray-600">
          No additional options needed for hydroponics.
        </p>
      )}
    </>
    // </div>
  );
};
