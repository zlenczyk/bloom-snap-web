"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const options = [
  {
    buttonContent: (
      <span className="flex items-center gap-4">
        <span className="text-3xl">💧</span>
        <span>Water the seedling</span>
      </span>
    ),
    message: "",
    tone: "neutral",
  },
  {
    buttonContent: (
      <span className="flex items-center gap-4">
        <span className="text-3xl">☀️</span>
        <span>Add some sunlight</span>
      </span>
    ),
    message: "Water added! But pages need more than just water...",
    tone: "blue",
  },
  {
    buttonContent: (
      <span className="flex items-center gap-4">
        <span className="text-3xl">⏳</span>
        <span>Give it time</span>
      </span>
    ),
    message: "Sunlight helps! Now, if only we had more time...",
    tone: "amber",
  },
  {
    buttonContent: (
      <span className="flex items-center gap-4">
        <span className="text-3xl">🤨</span>
        <span>Is it playing with us?</span>
      </span>
    ),
    message:
      "We’ve waited and nurtured, but this seedling just isn’t meant to grow here...",
    tone: "rose",
  },
];

const PageGrowthButton = () => {
  const [stage, setStage] = useState(0);

  const handleGrowth = () => {
    if (stage >= options.length - 1) return;
    setStage(stage + 1);
  };

  return (
    <div className="mt-8 space-y-6">
      <Button
        onClick={handleGrowth}
        disabled={stage === options.length - 1}
        className={`w-full max-w-md mx-auto text-xl font-semibold px-10 py-8 shadow-lg`}
      >
        {options[stage].buttonContent}
      </Button>

      {options[stage].message && (
        <div
          key={stage}
          className={`
      max-w-md mx-auto px-4 py-3 rounded-md text-sm sm:text-base
      shadow-sm transition-all duration-300
      animate-in fade-in slide-in-from-bottom-2
      ${
        options[stage].tone === "blue" &&
        "bg-blue-50 text-blue-800 border border-blue-200"
      }
      ${
        options[stage].tone === "amber" &&
        "bg-amber-50 text-amber-800 border border-amber-200"
      }
      ${
        options[stage].tone === "rose" &&
        "bg-rose-50 text-rose-800 border border-rose-200"
      }
    `}
        >
          {options[stage].message}
        </div>
      )}
    </div>
  );
};

export default function NotFound() {
  return (
    <div
      className="w-full bg-green-50 flex items-center justify-center layout-padding"
      style={{
        minHeight: "calc(100dvh - var(--header-height))",
      }}
    >
      <div className="w-full max-w-xl space-y-8 text-center">
        <div className="text-5xl sm:text-7xl">🌱</div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          404 — Page Not Grown Yet
        </h1>

        <p className="text-lg text-gray-600">
          Oops! This page is still a seedling in our digital garden.
        </p>

        <p className="text-md text-gray-500">
          Maybe it needs some water, sunlight, and a little patience?
        </p>

        <PageGrowthButton />

        <div className="pt-4">
          <Link
            href="/"
            className="text-green-700 hover:text-green-600 font-medium"
          >
            Let’s leaf this page →
          </Link>
        </div>
      </div>
    </div>
  );
}
