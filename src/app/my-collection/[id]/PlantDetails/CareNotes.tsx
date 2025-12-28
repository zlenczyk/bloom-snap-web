import {
  CloudRain,
  Droplet,
  Leaf,
  NotebookTabs,
  Pin,
  Sprout,
  StickyNote,
} from "lucide-react";
import ValueDisplay from "./ValueDisplay";

interface CareNotesProps {
  careNotes: {
    wateringNotes: string | null;
    mistingNotes: string | null;
    leafCleaningNotes: string | null;
    fertilizingNotes: string | null;
    additionalNotes: string | null;
  };
}

const CareNotes = ({ careNotes }: CareNotesProps) => {
  return (
    <section
      id="care-notes"
      className="bg-white sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-100">
          <NotebookTabs className="h-5 w-5 text-amber-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Care Notes</h2>
      </div>

      <div className="mb-4 bg-gradient-to-br from-blue-200/40 to-blue-50 rounded-lg shadow-md p-3 relative">
        <div className="flex items-center gap-2 mb-2">
          <Droplet className="h-4 w-4 text-blue-500" />
          <label className="text-sm font-medium text-blue-500">Watering</label>
        </div>
        <ValueDisplay value={careNotes.wateringNotes} variant="notes" />
        <Pin
          className="h-8 w-8 text-blue-200 absolute top-[-12px] right-[12px] rotate-12"
          strokeWidth={1.5}
        />
      </div>

      <div className="mb-4 bg-gradient-to-br from-teal-200/40 to-teal-50 rounded-lg shadow-md p-3 relative">
        <div className="flex items-center gap-2 mb-2">
          <CloudRain className="h-4 w-4 text-teal-500" />
          <label className="text-sm font-medium text-teal-500">
            Misting / Spraying
          </label>
        </div>
        <ValueDisplay value={careNotes.mistingNotes} variant="notes" />
        <Pin
          className="h-8 w-8 text-teal-200 absolute top-[-12px] right-[12px] rotate-12"
          strokeWidth={1.5}
        />
      </div>

      <div className="mb-4 bg-gradient-to-br from-yellow-200/40 to-yellow-50 rounded-lg shadow-md p-3 relative">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-4 w-4 text-yellow-500" />
          <label className="text-sm font-medium text-yellow-500">
            Leaf Cleaning
          </label>
        </div>
        <ValueDisplay value={careNotes.leafCleaningNotes} variant="notes" />
        <Pin
          className="h-8 w-8 text-yellow-400/40 absolute top-[-12px] right-[12px] rotate-12"
          strokeWidth={1.5}
        />
      </div>

      <div className="mb-4 bg-gradient-to-br from-purple-200/40 to-purple-50 rounded-lg shadow-md p-3 relative">
        <div className="flex items-center gap-2 mb-2">
          <Sprout className="h-4 w-4 text-purple-500" />
          <label className="text-sm font-medium text-purple-500">
            Fertilizing
          </label>
        </div>
        <ValueDisplay value={careNotes.fertilizingNotes} variant="notes" />
        <Pin
          className="h-8 w-8 text-purple-200 absolute top-[-12px] right-[12px] rotate-12"
          strokeWidth={1.5}
        />
      </div>

      <div className="bg-gradient-to-br from-gray-200/40 to-gray-50 rounded-lg shadow-md p-3 relative">
        <div className="flex items-center gap-2 mb-2">
          <StickyNote className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">
            Additional Notes
          </label>
        </div>
        <ValueDisplay value={careNotes.additionalNotes} variant="notes" />
        <Pin
          className="h-8 w-8 text-gray-200 absolute top-[-12px] right-[12px] rotate-12"
          strokeWidth={1.5}
        />
      </div>
    </section>
  );
};

export default CareNotes;
