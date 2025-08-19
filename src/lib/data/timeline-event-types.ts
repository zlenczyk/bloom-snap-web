import {
  AlertTriangle,
  Apple,
  ArrowLeftRight,
  Bandage,
  Bug,
  BugOff,
  Calendar,
  Camera,
  Cat,
  Check,
  Cherry,
  Cloud,
  Clover,
  Dog,
  Droplets,
  Flower,
  Flower2,
  Gift,
  Heart,
  HeartCrack,
  HousePlus,
  LampDesk,
  Leaf,
  LeafyGreen,
  Lightbulb,
  LocationEdit,
  Lock,
  Package,
  PackageOpen,
  PawPrint,
  Repeat,
  Ruler,
  Scaling,
  Scissors,
  ScissorsLineDashed,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  ShoppingCart,
  Shrub,
  Snowflake,
  Sparkles,
  SprayCan,
  Sprout,
  Sun,
  Thermometer,
  TreePalm,
  Truck,
  UnfoldHorizontal,
  Unlock,
  Waves,
  Wind,
  Wrench,
  X,
  Zap,
  ZapOffIcon,
} from "lucide-react";

export type EventIcon = keyof typeof eventIconsMap;
export type EventColor = (typeof eventColors)[number];

export enum EventColorsEnum {
  BgRed400 = "bg-red-400",
  BgRed600 = "bg-red-600",
  BgRose800 = "bg-rose-800",
  BgPink400 = "bg-pink-400",
  BgPink600 = "bg-pink-600",
  BgOrange400 = "bg-orange-400",
  BgOrange600 = "bg-orange-600",
  BgAmber700 = "bg-amber-700",
  BgAmber900 = "bg-amber-900",
  BgYellow400 = "bg-yellow-400",
  BgYellow600 = "bg-yellow-600",
  BgLime500 = "bg-lime-500",
  BgLime700 = "bg-lime-700",
  BgGreen500 = "bg-green-500",
  BgGreen800 = "bg-green-800",
  BgEmerald300 = "bg-emerald-300",
  BgEmerald600 = "bg-emerald-600",
  BgTeal500 = "bg-teal-500",
  BgTeal700 = "bg-teal-700",
  BgCyan400 = "bg-cyan-400",
  BgCyan600 = "bg-cyan-600",
  BgBlue400 = "bg-blue-400",
  BgBlue600 = "bg-blue-600",
  BgSky500 = "bg-sky-500",
  BgSky700 = "bg-sky-700",
  BgIndigo400 = "bg-indigo-400",
  BgIndigo600 = "bg-indigo-600",
  BgPurple500 = "bg-purple-500",
  BgPurple800 = "bg-purple-800",
  BgViolet400 = "bg-violet-400",
  BgViolet600 = "bg-violet-600",
  BgFuchsia400 = "bg-fuchsia-400",
  BgFuchsia600 = "bg-fuchsia-600",
  BgStone400 = "bg-stone-400",
  BgStone600 = "bg-stone-600",
  BgZinc500 = "bg-zinc-500",
  BgZinc700 = "bg-zinc-700",
  BgGray400 = "bg-gray-400",
  BgGray600 = "bg-gray-600",
  BgBlack = "bg-black",
}

export interface Event {
  icon: EventIcon;
  label: string;
  color: EventColor;
}

export const eventColors = Object.values(EventColorsEnum);

export const eventIconsMap = {
  // 1. Buying & acquiring
  ShoppingCart: ShoppingCart,
  Package: Package,
  PackageOpen: PackageOpen,
  Gift: Gift,
  Truck: Truck,
  HousePlus: HousePlus,

  // 2. Setup & environment
  LampDesk: LampDesk,
  Lightbulb: Lightbulb,
  Sun: Sun,
  Thermometer: Thermometer,
  Droplets: Droplets,
  Waves: Waves,
  Cloud: Cloud,
  Snowflake: Snowflake,
  Wind: Wind,

  // 3. Plant types & identification
  Sprout: Sprout,
  Leaf: Leaf,
  LeafyGreen: LeafyGreen,
  Flower: Flower,
  Flower2: Flower2,
  Clover: Clover,
  Shrub: Shrub,
  TreePalm: TreePalm,
  Apple: Apple,
  Cherry: Cherry,

  // 4. Routine care
  Wrench: Wrench,
  Ruler: Ruler,
  Scaling: Scaling,
  Scissors: Scissors,
  ScissorsLineDashed: ScissorsLineDashed,
  UnfoldHorizontal: UnfoldHorizontal,
  SprayCan: SprayCan,
  Sparkles: Sparkles,
  Bandage: Bandage,

  // 5. Advanced plant work
  ArrowLeftRight: ArrowLeftRight,
  LocationEdit: LocationEdit,
  Repeat: Repeat,
  Calendar: Calendar,

  // 6. Nutrients & growth support (paired with problems)
  Zap: Zap,
  ZapOffIcon: ZapOffIcon,
  ShieldPlus: ShieldPlus,
  ShieldCheck: ShieldCheck,
  ShieldAlert: ShieldAlert,
  AlertTriangle: AlertTriangle,

  // 7. Health & emotions (positive/negative pairs)
  Heart: Heart,
  HeartCrack: HeartCrack,
  Check: Check,
  X: X,

  // 8. Pests & problems
  Bug: Bug,
  BugOff: BugOff,

  // 9. Security & restricted access (paired)
  Lock: Lock,
  Unlock: Unlock,

  // 10. Other life around plants
  Cat: Cat,
  Dog: Dog,
  PawPrint: PawPrint,
  Camera: Camera,
};

export const predefinedEvents: Record<string, Event> = {
  // 1. Acquisition & gifting
  purchase: {
    icon: "ShoppingCart",
    label: "Purchase Plant",
    color: EventColorsEnum.BgSky700,
  },
  gift: {
    icon: "Gift",
    label: "Received as Gift",
    color: EventColorsEnum.BgRose800,
  },
  plantHotel: {
    icon: "HousePlus",
    label: "Sent to Plant Hotel",
    color: EventColorsEnum.BgViolet600,
  },
  trade: {
    icon: "ArrowLeftRight",
    label: "Plant Trade",
    color: EventColorsEnum.BgIndigo600,
  },

  // 2. Propagation & planting start
  seed: {
    icon: "Sprout",
    label: "Start from Seed",
    color: EventColorsEnum.BgGreen800,
  },
  cutting: {
    icon: "Scissors",
    label: "Start from Cutting",
    color: EventColorsEnum.BgLime700,
  },
  division: {
    icon: "UnfoldHorizontal",
    label: "Plant Division",
    color: EventColorsEnum.BgViolet400,
  },

  // 3. Setup & environment adjustment
  lighting: {
    icon: "Lightbulb",
    label: "Lighting Change",
    color: EventColorsEnum.BgYellow600,
  },
  humidity: {
    icon: "Cloud",
    label: "Humidity Adjustment",
    color: EventColorsEnum.BgBlue600,
  },
  temperature: {
    icon: "Thermometer",
    label: "Temperature Adjustment",
    color: EventColorsEnum.BgRed600,
  },
  watering: {
    icon: "Droplets",
    label: "Watering",
    color: EventColorsEnum.BgCyan600,
  },

  // 4. Routine care & maintenance
  fertilize: {
    icon: "Zap",
    label: "Fertilizing",
    color: EventColorsEnum.BgYellow400,
  },
  stopFertilize: {
    icon: "ZapOffIcon",
    label: "Stop Fertilizing",
    color: EventColorsEnum.BgYellow600,
  },
  prune: {
    icon: "ScissorsLineDashed",
    label: "Pruning",
    color: EventColorsEnum.BgAmber700,
  },
  repotting: {
    icon: "PackageOpen",
    label: "Repotting",
    color: EventColorsEnum.BgStone600,
  },
  relocate: {
    icon: "LocationEdit",
    label: "Relocate Plant",
    color: EventColorsEnum.BgYellow600,
  },
  measurement: {
    icon: "Ruler",
    label: "Growth Measurement",
    color: EventColorsEnum.BgTeal700,
  },
  cleaning: {
    icon: "Sparkles",
    label: "Cleaning Leaves",
    color: EventColorsEnum.BgBlack,
  },
  careAdjustment: {
    icon: "Wrench",
    label: "Care Adjustment",
    color: EventColorsEnum.BgCyan400,
  },

  // 5. Growth & milestones
  newLeaf: {
    icon: "Leaf",
    label: "New Leaf",
    color: EventColorsEnum.BgGreen500,
  },
  growth: {
    icon: "Shrub",
    label: "Growth Milestone",
    color: EventColorsEnum.BgEmerald600,
  },
  bloom: {
    icon: "Flower",
    label: "Bloom",
    color: EventColorsEnum.BgPink600,
  },
  fruit: {
    icon: "Apple",
    label: "Fruit",
    color: EventColorsEnum.BgOrange600,
  },

  // 6. Health & recovery
  recovery: {
    icon: "Heart",
    label: "Recovery",
    color: EventColorsEnum.BgGreen500,
  },
  disease: {
    icon: "AlertTriangle",
    label: "Disease Treatment",
    color: EventColorsEnum.BgRed600,
  },
  pest: {
    icon: "Bug",
    label: "Pest Treatment",
    color: EventColorsEnum.BgRose800,
  },
  pestResolved: {
    icon: "BugOff",
    label: "Pests Removed",
    color: EventColorsEnum.BgGreen800,
  },
  quarantineStart: {
    icon: "Lock",
    label: "Start Quarantine",
    color: EventColorsEnum.BgRed400,
  },
  quarantineEnd: {
    icon: "Unlock",
    label: "End Quarantine",
    color: EventColorsEnum.BgEmerald300,
  },
  emergencyRescue: {
    icon: "ShieldPlus",
    label: "Emergency Rescue",
    color: EventColorsEnum.BgRed400,
  },
  rescue: {
    icon: "ShieldCheck",
    label: "Plant Rescue",
    color: EventColorsEnum.BgOrange400,
  },
  healthWarning: {
    icon: "ShieldAlert",
    label: "Health Warning",
    color: EventColorsEnum.BgYellow600,
  },
  physicalDamage: {
    icon: "Bandage",
    label: "Physical Damage",
    color: EventColorsEnum.BgZinc500,
  },

  // 7. Environmental damage rescue
  overwaterRescue: {
    icon: "Waves",
    label: "Rescue from Overwatering",
    color: EventColorsEnum.BgBlue600,
  },
  coldRescue: {
    icon: "Snowflake",
    label: "Rescue from Cold Damage",
    color: EventColorsEnum.BgCyan400,
  },
  sunburnRescue: {
    icon: "Sun",
    label: "Rescue from Sunburn",
    color: EventColorsEnum.BgOrange400,
  },

  // 8. Misc / status / fun
  checkMark: {
    icon: "Check",
    label: "Task Completed",
    color: EventColorsEnum.BgGreen800,
  },
  failure: {
    icon: "X",
    label: "Task Failed",
    color: EventColorsEnum.BgRed600,
  },
  petVisit: {
    icon: "PawPrint",
    label: "Pet Nearby",
    color: EventColorsEnum.BgYellow400,
  },
  catVisit: {
    icon: "Cat",
    label: "Cat Visit",
    color: EventColorsEnum.BgOrange400,
  },
  dogVisit: {
    icon: "Dog",
    label: "Dog Visit",
    color: EventColorsEnum.BgAmber700,
  },
  photo: {
    icon: "Camera",
    label: "Photo Taken",
    color: EventColorsEnum.BgGray600,
  },
};

export const eventIcons = Object.keys(eventIconsMap) as EventIcon[];
export const eventIconsTuple = Object.keys(eventIconsMap) as [EventIcon, ...EventIcon[]];
