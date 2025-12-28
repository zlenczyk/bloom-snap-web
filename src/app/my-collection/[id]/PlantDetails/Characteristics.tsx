import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  PawPrint,
  Smile,
  TreeDeciduous,
  Trees,
  User,
  Wind,
} from "lucide-react";
import ValueDisplay from "./ValueDisplay";

interface CharacteristicProps {
  characteristics: {
    commonName: string;
    nickname: string | null;
    genus: string | null;
    species: string | null;
    isSafe: boolean | null;
    isAirPurifying: boolean | null;
  };
}

const Status = ({ value }: { value: boolean | null }) => {
  if (value === null) {
    return <p className="text-lg text-gray-400 italic">-</p>;
  }

  return value ? (
    <div className="flex items-center justify-center w-16 py-1 rounded-full bg-gradient-to-br from-green-200 to-green-50 shadow-sm">
      <p className="text-sm font-medium text-green-700">Yes</p>
    </div>
  ) : (
    <div className="flex items-center justify-center w-16 py-1 rounded-full bg-gradient-to-br from-red-200 to-red-50 shadow-sm">
      <p className="text-sm font-medium text-red-700">No</p>
    </div>
  );
};

const Characteristics = ({ characteristics }: CharacteristicProps) => {
  return (
    <section
      id="plant-characteristics"
      className="bg-white sm:rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-100">
          <Leaf className="h-5 w-5 text-green-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Characteristics</h2>
      </div>
      <div
        className="
          grid
          grid-cols-[max-content,1fr]
          gap-x-6
          gap-y-3
          items-start
        "
      >
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">
            Common Name
          </label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay value={characteristics.commonName} variant="info" />
        </div>

        <div className="flex items-center gap-2">
          <Trees className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">Genus</label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay value={characteristics.genus} variant="info" />
        </div>

        <div className="flex items-center gap-2">
          <TreeDeciduous className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">Species</label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay value={characteristics.species} variant="info" />
        </div>

        <div className="flex items-center gap-2">
          <Smile className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">Nickname</label>
        </div>
        <div className="min-w-0 break-words">
          <ValueDisplay value={characteristics.nickname} variant="info" />
        </div>

        <div className="col-span-2 my-2">
          <Separator />
        </div>

        <div className="flex items-center gap-2">
          <PawPrint className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">
            Safe for Pets
          </label>
        </div>
        <div className="justify-self-end">
          <Status value={characteristics.isSafe} />
        </div>

        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-gray-400" />
          <label className="text-sm font-medium text-gray-500">
            Air-purifying
          </label>
        </div>
        <div className="justify-self-end">
          <Status value={characteristics.isAirPurifying} />
        </div>
      </div>
    </section>
  );
};

export default Characteristics;
