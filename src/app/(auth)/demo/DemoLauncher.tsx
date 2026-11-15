"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, LoaderCircle, Sprout } from "lucide-react";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import ErrorMessage from "../ErrorMessage";
import { startDemo } from "./actions";

const STEPS = [
  "Creating your private collection",
  "Potting the sample plants",
  "Filling in care notes and timelines",
];

const STEP_DURATION_MS = 700;

const DemoLauncher = () => {
  const [errorMessage, launch, isPending] = useActionState(
    startDemo,
    undefined
  );
  const [currentStep, setCurrentStep] = useState(0);
  const hasStarted = useRef(false);

  // The demo starts on its own; the visitor only has to open the link.
  useEffect(() => {
    if (hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    startTransition(() => launch());
  }, [launch]);

  // The steps are just a friendly progress display; the last one stays active
  // until the collection is really there and the redirect happens.
  useEffect(() => {
    if (errorMessage) {
      return;
    }

    const timer = setInterval(
      () => setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1)),
      STEP_DURATION_MS
    );

    return () => clearInterval(timer);
  }, [errorMessage, isPending]);

  const retry = () => {
    setCurrentStep(0);

    startTransition(() => launch());
  };

  return (
    <div
      className="bg-white p-8 sm:p-10 sm:rounded-xl shadow-xl
           bg-gradient-to-br from-green-500/40 to-white
           w-full sm:max-w-md sm:mx-auto mobile-full-h"
    >
      <div className="text-3xl sm:text-4xl font-extrabold text-green-700 italic mb-8">
        BloomSnap
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full bg-emerald-600 text-white">
          <Sprout
            className={cn("h-5 w-5", !errorMessage && "animate-pulse")}
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-900">
          {errorMessage ? "The demo didn't start" : "Setting up your demo"}
        </h1>
      </div>

      {errorMessage ? (
        <div className="mt-4 space-y-4">
          <ErrorMessage messages={[errorMessage]} />

          <Button className="w-full" onClick={retry} disabled={isPending}>
            {isPending ? "Trying again..." : "Try again"}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            <Link
              href="/sign-in"
              className="underline text-emerald-600 hover:text-emerald-500"
            >
              Back to sign in
            </Link>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            A sample plant collection is being prepared just for you. It takes
            a few seconds and needs no account.
          </p>

          <ul className="space-y-3" aria-live="polite">
            {STEPS.map((step, index) => {
              const isDone = index < currentStep;
              const isActive = index === currentStep;

              return (
                <li
                  key={step}
                  className={cn(
                    "flex items-center gap-3 text-sm transition-opacity duration-300",
                    isDone || isActive ? "opacity-100" : "opacity-40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      isDone
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-emerald-700 border border-emerald-200"
                    )}
                  >
                    {isDone ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : isActive ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      isActive ? "font-medium text-gray-900" : "text-gray-600"
                    )}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default DemoLauncher;
