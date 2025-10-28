import { Separator } from "@/components/ui/separator";
import { BookOpenText, Calendar, MapPin, ShoppingBag } from "lucide-react";

const Background = () => {
  return (
    <section
      id="plant-identity"
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-100">
          <ShoppingBag className="h-5 w-5 text-blue-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Background</h2>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">Source</label>
        </div>
        <p className="text-lg text-gray-900">Local nursery</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-500">
            Owned Since
          </label>
        </div>
        <p className="text-lg text-gray-600">22/02/2020</p>
      </div>

      <Separator className="my-3" />

      <div className="flex items-center gap-2 mb-2">
        <BookOpenText className="h-4 w-4 text-gray-500" />
        <label className="text-sm font-medium text-gray-500">Description</label>
      </div>

      <p className="text-base text-gray-700">
        Wiped with a damp cloth every couple of weeks; occasional neem oil for
        shine. This plant was sourced from a local nursery and has been cared
        for since 2020. It thrives in bright, indirect light and requires
        moderate watering.
      </p>
    </section>
  );
};

export default Background;
