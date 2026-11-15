"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEMO_LIFETIME_HOURS } from "@/lib/demo/constants";
import { History, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DemoWelcomeProps {
  // The plant with the richest history, suggested as the first stop.
  featuredPlant: { id: string; commonName: string } | null;
  userId: string;
}

// Shown once per demo account: says what the demo is and where to look first.
const DemoWelcome = ({ featuredPlant, userId }: DemoWelcomeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const storageKey = `bloomsnap-demo-welcome-${userId}`;

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) {
        setIsOpen(true);
      }
    } catch {
      // Storage is unavailable (private mode): just skip the welcome.
    }
  }, [storageKey]);

  const close = () => {
    setIsOpen(false);

    try {
      localStorage.setItem(storageKey, "seen");
    } catch {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="rounded-lg sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to the BloomSnap demo 🌿</DialogTitle>
          <DialogDescription>
            This collection is yours alone. Add, edit or delete anything:
            nobody else sees it, and it is wiped after {DEMO_LIFETIME_HOURS}{" "}
            hours.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <History className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>
              Open{" "}
              <span className="font-medium text-gray-900">
                {featuredPlant?.commonName ?? "a plant"}
              </span>{" "}
              to see its care timeline, with past and upcoming events.
            </span>
          </li>
          <li className="flex gap-3">
            <Search className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>
              Search by name or room (try{" "}
              <span className="font-medium text-gray-900">kitchen</span>), sort
              the collection, or filter it down to pet friendly plants.
            </span>
          </li>
          <li className="flex gap-3">
            <Plus className="h-5 w-5 shrink-0 text-emerald-600" />
            <span>Add a plant of your own, with photos.</span>
          </li>
        </ul>

        <DialogFooter className="mt-2 gap-2">
          {featuredPlant && (
            <Button asChild variant="outline" onClick={close}>
              <Link href={`/my-collection/${featuredPlant.id}`}>
                Show me {featuredPlant.commonName}
              </Link>
            </Button>
          )}

          <Button onClick={close}>Start exploring</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DemoWelcome;
