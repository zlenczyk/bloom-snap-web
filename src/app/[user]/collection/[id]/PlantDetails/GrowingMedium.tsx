// // import { Grip } from "lucide-react";

// // type MediumType = "soil" | "hydroponics" | "semiHydro" | "air";

// // interface GrowingMediumProps {
// //   mediumType: MediumType;
// //   items?: string[];
// // }

// // const mediumStyles: Record<
// //   MediumType,
// //   {
// //     card: string;
// //     tagBg: string;
// //     tagText: string;
// //     tagBorder: string;
// //     icon: string;
// //   }
// // > = {
// //   soil: {
// //     card: "bg-gradient-to-br from-yellow-700/30 to-yellow-50/30",
// //     tagBg: "bg-yellow-700/10",
// //     tagText: "text-yellow-800",
// //     tagBorder: "border-yellow-800/30",
// //     icon: "text-yellow-800",
// //   },
// //   hydroponics: {
// //     card: "bg-gradient-to-br from-sky-400/30 to-sky-50/30",
// //     tagBg: "bg-sky-400/10",
// //     tagText: "text-sky-800",
// //     tagBorder: "border-sky-800/30",
// //     icon: "text-sky-800",
// //   },
// //   semiHydro: {
// //     card: "bg-gradient-to-br from-sky-400/30 to-yellow-50/20",
// //     tagBg: "bg-yellow-800/10",
// //     tagText: "text-yellow-800/80",
// //     tagBorder: "border-yellow-800/30",
// //     icon: "text-sky-800",
// //   },
// //   air: {
// //     // card: "bg-gradient-to-br from-cyan-400/40 to-cyan-50/40",
// //     card: "bg-gradient-to-br from-cyan-600/20 to-cyan-50/20",
// //     tagBg: "bg-cyan-500/10",
// //     tagText: "text-cyan-700",
// //     tagBorder: "border-cyan-800/30",
// //     icon: "text-cyan-800",
// //   },
// // };

// // const GrowingMedium = ({ mediumType, items = [] }: GrowingMediumProps) => {
// //   const style = mediumStyles[mediumType];

// //   return (
// //     <div
// //       className={`flex flex-col p-4 rounded-lg ${style.card} justify-center shadow-md h-full`}
// //     >
// //       <div className="flex flex-col items-center text-center mb-3">
// //         <Grip className={`h-5 w-5 mb-1 ${style.icon}`} />
// //         <p className="text-sm text-gray-600">Growing Medium</p>
// //         <p className="text-lg font-semibold text-gray-900">{mediumType}</p>
// //       </div>

// //       <div className="flex flex-wrap gap-2">
// //         {items.map((item, idx) => (
// //           <span
// //             key={idx}
// //             className={`px-3 py-1 text-xs font-medium rounded-full ${style.tagBg} ${style.tagText} border ${style.tagBorder} shadow-sm`}
// //           >
// //             {item}
// //           </span>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default GrowingMedium;

// import { Grip } from "lucide-react";

// type MediumType = "soil" | "hydroponics" | "semiHydro" | "air";

// interface GrowingMediumProps {
//   mediumType: MediumType;
//   items?: string[];
// }

// const mediumStyles: Record<
//   MediumType,
//   {
//     card: string;
//     tagBg: string;
//     tagText: string;
//     tagBorder: string;
//     icon: string;
//   }
// > = {
//   soil: {
//     card: "bg-gradient-to-br from-yellow-700/30 to-yellow-50/30",
//     tagBg: "bg-yellow-700/10",
//     tagText: "text-yellow-800",
//     tagBorder: "border-yellow-800/30",
//     icon: "text-yellow-800",
//   },
//   hydroponics: {
//     card: "bg-gradient-to-br from-sky-400/30 to-sky-50/30",
//     tagBg: "bg-sky-400/10",
//     tagText: "text-sky-800",
//     tagBorder: "border-sky-800/30",
//     icon: "text-sky-800",
//   },
//   semiHydro: {
//     // card: "bg-gradient-to-br from-sky-400/30 to-yellow-50/20",
//     // tagBg: "bg-yellow-800/10",
//     // tagText: "text-yellow-800/80",
//     // tagBorder: "border-yellow-800/30",
//     // icon: "text-sky-800",
//     // card: "bg-gradient-to-br from-amber-500/50 via-green-400/40 to-blue-400/40",
//     // tagBg: "bg-green-800/10",
//     // tagText: "text-green-800/80",
//     // tagBorder: "border-green-800/30",
//     // icon: "text-green-800",
//     // card: "bg-gradient-to-br from-green-400/50 to-green-50",
//     // tagBg: "bg-green-800/10",
//     // tagText: "text-green-800/80",
//     // tagBorder: "border-green-800/30",
//     // icon: "text-green-800",
//     // card: "bg-gradient-to-br from-green-400/50 to-green-50",
//     // tagBg: "bg-amber-800/10",
//     // tagText: "text-amber-800/80",
//     // tagBorder: "border-amber-800/30",
//     // icon: "text-green-800",
//     // card: "bg-gradient-to-br from-green-400/50 to-green-50",
//     // tagBg: "bg-blue-800/10",
//     // tagText: "text-blue-800/80",
//     // tagBorder: "border-blue-800/30",
//     // icon: "text-green-800",
//     // card: "bg-gradient-to-br from-amber-400/50 to-amber-50",
//     // tagBg: "bg-green-800/10",
//     // tagText: "text-green-800/80",
//     // tagBorder: "border-green-800/30",
//     // icon: "text-amber-800",
//     card: "bg-gradient-to-br from-green-400/50 to-green-50",
//     tagBg: "bg-amber-800/10",
//     tagText: "text-amber-800/80",
//     tagBorder: "border-amber-800/30",
//     icon: "text-green-800",
//   },
//   air: {
//     card: "bg-gradient-to-br from-cyan-600/20 to-cyan-50/20",
//     tagBg: "bg-cyan-500/10",
//     tagText: "text-cyan-700",
//     tagBorder: "border-cyan-800/30",
//     icon: "text-cyan-800",
//   },
// };

// const GrowingMedium = ({ mediumType, items = [] }: GrowingMediumProps) => {
//   const style = mediumStyles[mediumType];

//   return (
//     <div
//       className={`flex flex-col p-4 rounded-lg ${style.card} justify-center shadow-md h-full`}
//     >
//       <div className="flex flex-col items-center text-center mb-3">
//         <Grip className={`h-5 w-5 mb-1 ${style.icon}`} />
//         <p className="text-sm text-gray-600">Growing Medium</p>
//         <p className="text-lg font-semibold text-gray-900">{mediumType}</p>
//       </div>

//       <div className="flex flex-wrap gap-2">
//         {items.map((item, idx) => (
//           <span
//             key={idx}
//             className={`px-3 py-1 text-xs font-medium rounded-full ${style.tagBg} ${style.tagText} border ${style.tagBorder} shadow-sm`}
//           >
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GrowingMedium;

// import { Grip } from "lucide-react";

// const GrowingMedium = () => {
//   return (
//     <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-400/50 to-green-50 justify-center shadow-md h-full">
//       <div className="flex flex-col items-center text-center mb-3">
//         <Grip className="h-5 w-5 mb-1 text-green-800" />
//         <p className="text-sm text-gray-600">Growing Medium</p>
//         <p className="text-lg font-semibold text-gray-900">Semi-hydro</p>
//       </div>

//       <div className="flex flex-wrap gap-2">
//         <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-800/10 text-amber-800/80 border border-amber-800/30 shadow-sm">
//           LECA
//         </span>
//         <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-800/10 text-amber-800/80 border border-amber-800/30 shadow-sm">
//           Pon
//         </span>
//       </div>
//     </div>
//   );
// };

// export default GrowingMedium;

import { Grip } from "lucide-react";

interface GrowingMediumProps {
  mediumType: string;
  items?: string[];
}

const GrowingMedium = ({ mediumType, items = [] }: GrowingMediumProps) => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-green-400/50 to-green-50 justify-center shadow-md h-full">
      <div className="flex flex-col items-center text-center mb-3">
        <Grip className="h-5 w-5 mb-1 text-green-800" />
        <p className="text-sm text-gray-600">Growing Medium</p>
        <p className="text-lg font-semibold text-gray-900">{mediumType}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-medium rounded-full bg-amber-800/10 text-amber-800/80 border border-amber-800/30 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GrowingMedium;
