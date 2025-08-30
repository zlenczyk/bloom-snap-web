import { PawPrint, Shield, Wind } from "lucide-react";

const Attributes = () => {
  return (
    <section
      id="safety"
      className="rounded-xl p-6 shadow-md col-span-1 md:col-span-3 bg-gradient-to-br from-green-500/20 to-slate-50"
    >
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-6 w-6 text-green-800" />
        <h2 className="text-xl font-semibold text-gray-900">Attributes</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-purple-400/40 to-purple-50 text-center shadow-md">
          <PawPrint className="h-5 w-5 text-purple-800 mb-1" />
          <p className="text-sm text-gray-600">Toxic</p>
          <p className="text-lg font-semibold text-green-600">Yes</p>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-blue-400/40 to-blue-50 text-center shadow-md">
          <Wind className="h-5 w-5 text-blue-800 mb-1" />
          <p className="text-sm text-gray-600">Air cleaning</p>
          <p className="text-lg font-semibold text-red-800">No</p>
        </div>
      </div>
    </section>
  );
};

export default Attributes;
