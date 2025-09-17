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

const Characteristics = () => {
  return (
    <section
      id="plant-characteristics"
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-100">
          <Leaf className="h-5 w-5 text-green-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Characteristics</h2>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">
              Common Name
            </label>
          </div>
          <p className="text-lg font-semibold text-gray-900">Fiddle Leaf Fig</p>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Trees className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">Genus</label>
          </div>
          <p className="text-lg text-gray-900">Ficus</p>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <TreeDeciduous className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">Species</label>
          </div>
          <p className="text-lg text-gray-700">Ficus lyrata</p>
        </div>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Smile className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">
              Nickname
            </label>
          </div>
          <p className="text-lg text-gray-900">"Figgy"</p>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">
              Safe for Pets
            </label>
          </div>
          <div className="flex items-center justify-center w-16 py-1 rounded-full bg-gradient-to-br from-green-200 to-green-50 shadow-sm">
            <p className="text-sm font-medium text-green-700">Yes</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">
              Air-cleaning
            </label>
          </div>
          <div className="flex items-center justify-center w-16 py-1 rounded-full bg-gradient-to-br from-red-200 to-red-50 shadow-sm">
            <p className="text-sm font-medium text-red-700">No</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Characteristics;
