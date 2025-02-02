"use client";

import { Button } from "@/components/ui/button";
import { Annoyed, Clock, Droplet, Sprout, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const options = [
  {
    buttonContent: (
      <>
        <Droplet className="mr-2 h-4 w-4" /> Water the seedling
      </>
    ),
    message: "",
  },
  {
    buttonContent: (
      <>
        <Sun className="mr-2 h-4 w-4" /> Add some sunlight
      </>
    ),
    message: "Water added! But pages need more than just water...",
  },
  {
    buttonContent: (
      <>
        <Clock className="mr-2 h-4 w-4" />
        Give it time
      </>
    ),
    message: "Sunlight helps! Now, if only we had more time...",
  },
  {
    buttonContent: (
      <>
        <Annoyed className="mr-2 h-4 w-4" /> Is it playing with us?
      </>
    ),
    message:
      "We’ve waited and nurtured, but this seedling just isn’t meant to grow here.",
  },
];

const PageGrowthButton = () => {
  const [stage, setStage] = useState(0);

  const handleGrowth = () => {
    if (stage >= options.length - 1) {
      return;
    }

    setStage(stage + 1);
  };

  return (
    <div className="mt-6 space-y-4">
      <Button
        onClick={handleGrowth}
        className={`${
          stage === options.length - 1
            ? "bg-gray-400 hover:bg-gray-400"
            : "bg-green-500 hover:bg-green-600"
        } text-white`}
        disabled={stage > options.length}
      >
        {options[stage].buttonContent}
      </Button>
      <p className="text-sm text-gray-600">{options[stage].message}</p>
    </div>
  );
};

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full space-y-8 text-center">
        <div className="flex justify-center">
          <Sprout className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
          404 - Page Not Grown Yet
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! This page is still a seedling in our digital garden.
        </p>
        <p className="mt-2 text-md text-gray-500">
          Maybe it needs some water, sunlight, and a little bit of patience?
        </p>
        <PageGrowthButton />
        <div className="mt-6">
          <Link
            href="/"
            className="text-green-600 hover:text-green-500 font-medium"
          >
            Let's Leaf This Page →
          </Link>
        </div>
      </div>
    </div>
  );
}
