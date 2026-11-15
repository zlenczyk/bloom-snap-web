import { predefinedEvents } from "@/app/my-collection/[id]/Timeline/types";
import type { Prisma } from "@prisma/client";

// The sample collection every demo account starts with.
//
// All dates are stored as "days ago" (negative = in the future) and turned
// into real dates when an account is created, so the collection always looks
// freshly tended: the last watering was a few days ago, the next one is due
// soon. Photos are static files in public/assets/demo.

type DemoEvent = {
  daysAgo: number;
  description: string;
  icon: string;
  color: string;
  title: string;
};

export type DemoPlant = Omit<
  Prisma.PlantCreateManyInput,
  "id" | "userId" | "createdAt" | "updatedAt" | "ownedSince" | "lastRepotted"
> & {
  ownedDaysAgo: number;
  repottedDaysAgo: number;
  photos: string[];
  events: DemoEvent[];
};

// Builds an event from one of the app's predefined event types, optionally
// with a custom title.
const event = (
  type: string,
  daysAgo: number,
  description: string,
  title?: string
): DemoEvent => {
  const preset = predefinedEvents[type];

  if (!preset) {
    throw new Error(`Unknown demo event type: ${type}`);
  }

  return {
    daysAgo,
    description,
    icon: preset.icon,
    color: preset.color,
    title: title ?? preset.label,
  };
};

const photo = (fileName: string): string => `demo/${fileName}`;

// Listed in the order they appear in the collection (first = newest).
export const DEMO_PLANTS: DemoPlant[] = [
  {
    commonName: "Monstera Deliciosa",
    genus: "Monstera",
    species: "M. deliciosa",
    nickname: "Monty",
    source: "Green Corner, the plant shop around the corner",
    ownedDaysAgo: 640,
    isSafe: false,
    isAirPurifying: false,
    description:
      "My first “serious” plant and still the star of the living room. It came home as a three-leaf baby in a nursery pot and now needs a corner of its own. In the wild it climbs trees in the rainforests of southern Mexico, which explains why it took off as soon as it got a moss pole.",
    currentHeight: "110 cm",
    currentPotSize: "24 cm",
    repottedDaysAgo: 96,
    humidity: "55–65%",
    temperature: "20–24°C",
    roomLocation: "Living room",
    windowDirection: "east_facing_northern_hemisphere",
    lightExposure: "indirect_sun_light",
    growingMedium: "soil",
    pottingMix: ["Aroid mix", "Orchid bark", "Perlite", "Worm castings"],
    wateringNotes:
      "Every 7–10 days in summer, about every two weeks in winter. I only water when the top 5 cm of soil is dry, then soak it until water runs out of the drainage holes.",
    mistingNotes:
      "I mist the moss pole, not the leaves, every 2–3 days so the aerial roots keep attaching to it.",
    leafCleaningNotes:
      "Each leaf gets wiped with a damp microfibre cloth every two weeks. Big leaves collect a surprising amount of dust.",
    fertilizingNotes:
      "Balanced liquid fertilizer at half strength once a month while it is actively growing. No feeding in the darkest winter months.",
    additionalNotes:
      "A quarter turn at every watering keeps it from leaning toward the window. New leaves without holes usually mean it wants more light. Toxic to cats and dogs, so fallen leaves go straight to the bin.",
    photos: [photo("monstera-1.jpg"), photo("monstera-2.jpg"), photo("monstera-3.jpg")],
    events: [
      event(
        "purchase",
        640,
        "Brought home as a three-leaf baby in a 12 cm nursery pot. Love at first sight."
      ),
      event(
        "quarantineStart",
        639,
        "Two weeks away from the other plants, just in case it brought company."
      ),
      event(
        "quarantineEnd",
        625,
        "No pests spotted. Moved to its permanent spot by the east window."
      ),
      event(
        "newLeaf",
        570,
        "First leaf unfurled at home. Still solid, no holes yet."
      ),
      event(
        "repotting",
        470,
        "Up to a 17 cm pot with a chunky aroid mix. The roots had filled the nursery pot completely."
      ),
      event(
        "growth",
        400,
        "The first leaf with real fenestrations opened today!",
        "First split leaf"
      ),
      event(
        "pest",
        330,
        "Found thrips on two leaves. Showered the whole plant and started weekly neem oil treatments."
      ),
      event(
        "pestResolved",
        295,
        "Three clean inspections in a row. Treatment finished."
      ),
      event(
        "careAdjustment",
        210,
        "Added a 90 cm moss pole and tied the main stem to it. The aerial roots found it within a week.",
        "Moss pole installed"
      ),
      event(
        "measurement",
        150,
        "85 cm from the soil line to the tallest leaf."
      ),
      event(
        "repotting",
        96,
        "Moved into the 24 cm terracotta pot. Roots were circling the bottom, so it was about time."
      ),
      event("fertilize", 61, "Half-strength liquid fertilizer after watering."),
      event(
        "newLeaf",
        34,
        "Leaf number 14, and the biggest so far: 38 cm across with a double row of holes."
      ),
      event("cleaning", 12, "Wiped all leaves and checked the undersides for pests."),
      event("watering", 5, "Deep watering. The top 5 cm of soil was completely dry."),
      event("photo", 2, "New cover photo for the collection."),
      event("watering", -3, "Check the top 5 cm of soil first."),
      event("fertilize", -16, "Monthly feed, half strength."),
      event(
        "measurement",
        -40,
        "Quarterly height check. Will it pass 120 cm?"
      ),
    ],
  },
  {
    commonName: "Moth Orchid",
    genus: "Phalaenopsis",
    species: "Phalaenopsis hybrid",
    nickname: "Odette",
    source: "Birthday gift from grandma",
    ownedDaysAgo: 410,
    isSafe: true,
    isAirPurifying: false,
    description:
      "A supermarket orchid that everyone said would never bloom again. It is now on its third flower spike. Moth orchids are epiphytes: in nature they cling to tree bark and take moisture from the air, so the roots want light and airflow more than soil.",
    currentHeight: "45 cm with the flower spike",
    currentPotSize: "12 cm",
    repottedDaysAgo: 180,
    humidity: "50–70%",
    temperature: "18–25°C",
    roomLocation: "Bedroom",
    windowDirection: "east_facing_northern_hemisphere",
    lightExposure: "morning_sun_light",
    growingMedium: "semi_hydroponics",
    pottingMix: ["Clay pebbles / LECA"],
    wateringNotes:
      "Grown in LECA with a small water reservoir. I refill it once the reservoir has been empty for a day or two and the roots turn from green to silver.",
    mistingNotes:
      "Aerial roots get a light mist in the morning when the heating is on. Never the flowers, they spot easily.",
    leafCleaningNotes:
      "Leaves are wiped with a soft damp cloth once a month. No water left standing in the crown.",
    fertilizingNotes:
      "Orchid fertilizer at quarter strength with every second refill. Plain water in between to flush the pebbles.",
    additionalNotes:
      "A two-week drop in night temperature is what triggers a new flower spike. Safe for cats and dogs.",
    photos: [photo("orchid-1.jpg")],
    events: [
      event("gift", 410, "Arrived in full bloom, wrapped in cellophane."),
      event(
        "prune",
        330,
        "The last flower dropped. Cut the spike just above the second node."
      ),
      event(
        "repotting",
        180,
        "Out of the old, broken-down bark and into LECA. Trimmed the mushy roots.",
        "Moved to semi-hydro"
      ),
      event(
        "temperature",
        120,
        "Moved closer to the window for cooler nights to trigger blooming."
      ),
      event(
        "growth",
        75,
        "A new flower spike is peeking out between the leaves.",
        "New flower spike"
      ),
      event("bloom", 20, "The first bud opened. Seven more are on the way."),
      event("watering", 6, "Refilled the reservoir to one third."),
      event("watering", -2, "Refill once the roots turn silver."),
      event("fertilize", -14, "Quarter-strength orchid fertilizer."),
    ],
  },
  {
    commonName: "Fiddle Leaf Fig",
    genus: "Ficus",
    species: "F. lyrata",
    nickname: "Figaro",
    source: "Online order, arrived in a box taller than the courier",
    ownedDaysAgo: 300,
    isSafe: false,
    isAirPurifying: false,
    description:
      "The diva of the collection. It sulked for a month after arriving and dropped leaves every time it was moved. Once it got a bright, draught-free spot and was left alone, it started growing like a proper tree.",
    currentHeight: "125 cm",
    currentPotSize: "27 cm",
    repottedDaysAgo: 140,
    humidity: "40–55%",
    temperature: "19–24°C",
    roomLocation: "Home office",
    windowDirection: "south_facing_northern_hemisphere",
    lightExposure: "full_day_sun_light",
    growingMedium: "soil",
    pottingMix: ["Houseplant tropical mix", "Pine bark", "Perlite"],
    wateringNotes:
      "Roughly once a week, always the same amount. It hates both soggy soil and drying out completely, so I check with a wooden skewer first.",
    mistingNotes: "No misting. It prefers a humidifier nearby in winter.",
    leafCleaningNotes:
      "Dusting the leaves every two weeks makes a visible difference, they are the plant's solar panels.",
    fertilizingNotes:
      "Fertilizer for foliage plants every second watering from spring to early autumn.",
    additionalNotes:
      "Do not move it. Do not turn it more than a quarter. Do not put it near a radiator or a door. Toxic to pets.",
    photos: [photo("fiddle-leaf-fig-1.jpg"), photo("fiddle-leaf-fig-2.jpg")],
    events: [
      event("purchase", 300, "Unboxed at 95 cm with eleven leaves."),
      event(
        "healthWarning",
        285,
        "Dropped three lower leaves after the move. Brown edges on two more."
      ),
      event(
        "relocate",
        270,
        "Moved away from the radiator to the brightest corner of the office."
      ),
      event("recovery", 220, "No leaf drop for six weeks and a new bud at the top."),
      event(
        "repotting",
        140,
        "Into a 27 cm pot with extra bark for drainage. Sits in a seagrass basket now."
      ),
      event(
        "prune",
        80,
        "Pinched out the growing tip to encourage branching."
      ),
      event(
        "newLeaf",
        25,
        "Two side branches are forming below the cut. It worked!"
      ),
      event("measurement", 6, "125 cm. That is 30 cm in ten months."),
      event("cleaning", -5, "Dust all leaves, top and bottom."),
    ],
  },
  {
    commonName: "Echeveria",
    genus: "Echeveria",
    species: "Echeveria hybrid",
    nickname: "The Rosette",
    source: "Farmers' market stall",
    ownedDaysAgo: 200,
    isSafe: true,
    isAirPurifying: false,
    description:
      "Shares a shallow bowl with a zebra haworthia and two smaller offsets. The blue-green rosette blushes pink at the edges when it gets enough sun, which is the easiest way to tell it is happy.",
    currentHeight: "9 cm",
    currentPotSize: "15 cm bowl",
    repottedDaysAgo: 198,
    humidity: "30–40%",
    temperature: "18–27°C",
    roomLocation: "Kitchen windowsill",
    windowDirection: "south_facing_northern_hemisphere",
    lightExposure: "full_day_sun_light",
    growingMedium: "soil",
    pottingMix: ["Succulent mix", "Pumice", "Coarse sand"],
    wateringNotes:
      "Soak and dry: a thorough watering every two to three weeks, only when the soil is bone dry. Once a month in winter.",
    mistingNotes: "Never. Water sitting in the rosette causes rot.",
    leafCleaningNotes:
      "I leave the powdery coating alone, it is the plant's own sunscreen. Dead leaves at the base are removed with tweezers.",
    fertilizingNotes: "Cactus fertilizer at half strength twice a year.",
    additionalNotes:
      "If the rosette stretches and opens up, it needs more light. Non-toxic to pets.",
    photos: [photo("echeveria-1.jpg"), photo("echeveria-2.jpg")],
    events: [
      event("purchase", 200, "Three small pots for the price of two."),
      event(
        "repotting",
        198,
        "Planted together in a shallow bowl with a gritty mix and a gravel top layer.",
        "Arranged in a bowl"
      ),
      event(
        "sunburnRescue",
        120,
        "Brown patches after the first hot week behind glass. Moved 30 cm back from the window."
      ),
      event(
        "division",
        45,
        "Laid three healthy leaves on dry soil to root.",
        "Leaf propagation started"
      ),
      event("watering", 9, "Soaked from below for ten minutes."),
      event("watering", -12, "Only if the soil is completely dry."),
    ],
  },
  {
    commonName: "Snake Plant",
    genus: "Dracaena",
    species: "D. trifasciata 'Laurentii'",
    nickname: "Sir Hiss",
    source: "A division of my aunt's twenty-year-old plant",
    ownedDaysAgo: 900,
    isSafe: false,
    isAirPurifying: true,
    description:
      "The oldest member of the collection and the one that forgives everything. It lived through two moves, a dark hallway and a month without water. One of the plants from NASA's clean air study.",
    currentHeight: "70 cm",
    currentPotSize: "20 cm",
    repottedDaysAgo: 400,
    humidity: "30–50%",
    temperature: "16–26°C",
    roomLocation: "Hallway",
    windowDirection: "north_facing_northern_hemisphere",
    lightExposure: "low_sun_light",
    growingMedium: "soil",
    pottingMix: ["Cactus mix", "Perlite", "Lava rock"],
    wateringNotes:
      "Every three to four weeks, less in winter. When in doubt, I wait another week. Overwatering is the only thing that hurts it.",
    mistingNotes: "None needed.",
    leafCleaningNotes: "A quick wipe with a damp cloth once a month.",
    fertilizingNotes: "Diluted cactus fertilizer two or three times a year.",
    additionalNotes:
      "Terracotta pot on purpose, it dries the soil faster. Mildly toxic to cats and dogs if chewed.",
    photos: [photo("snake-plant-1.jpg"), photo("snake-plant-2.jpg")],
    events: [
      event(
        "division",
        900,
        "Split from my aunt's plant with a bread knife. Four leaves and a fist of roots."
      ),
      event("repotting", 400, "Into a 20 cm terracotta pot. It had cracked the plastic one."),
      event(
        "growth",
        260,
        "A new shoot is pushing through the soil next to the mother plant.",
        "First pup"
      ),
      event(
        "overwaterRescue",
        150,
        "Soft, yellowing leaf at the base. Unpotted, cut away the rot and let it dry for three days."
      ),
      event(
        "careAdjustment",
        148,
        "New rule: water every three to four weeks at most."
      ),
      event("watering", 18, "A small drink. Soil was dry all the way down."),
      event("watering", -10, "Check with a skewer first."),
    ],
  },
  {
    commonName: "Golden Pothos",
    genus: "Epipremnum",
    species: "E. aureum",
    nickname: "Goldie",
    source: "Cutting swapped at the office",
    ownedDaysAgo: 240,
    isSafe: false,
    isAirPurifying: true,
    description:
      "Started as a single cutting in a glass of water on my desk. Grows fast, tells you clearly when it is thirsty and roots from every node, so half of my friends now own a piece of it.",
    currentHeight: "Vines up to 60 cm",
    currentPotSize: "11 cm coconut shell planter",
    repottedDaysAgo: 60,
    humidity: "45–60%",
    temperature: "18–26°C",
    roomLocation: "Kitchen",
    windowDirection: "west_facing_northern_hemisphere",
    lightExposure: "indirect_sun_light",
    growingMedium: "soil",
    pottingMix: ["Pothos mix", "Coco coir", "Perlite"],
    wateringNotes:
      "When the leaves start to droop slightly, usually once a week. It perks up within hours.",
    mistingNotes: "Occasionally in summer, mostly because the kitchen sink sprayer is right there.",
    leafCleaningNotes: "A lukewarm shower once a month washes the dust off all the vines at once.",
    fertilizingNotes: "All-purpose liquid fertilizer once a month in the growing season.",
    additionalNotes:
      "More light means more yellow variegation. Trimmed vines go straight into water for new plants. Toxic to pets.",
    photos: [photo("pothos-1.jpg"), photo("pothos-2.jpg")],
    events: [
      event(
        "cutting",
        240,
        "One vine with three nodes, placed in a glass of water."
      ),
      event("growth", 215, "Roots are 5 cm long. Ready for soil.", "Roots!"),
      event("repotting", 205, "Potted the rooted cutting in a small nursery pot."),
      event(
        "trade",
        130,
        "Swapped two cuttings for a hoya cutting at a plant swap."
      ),
      event("prune", 90, "Trimmed the two longest vines to make it bushier."),
      event(
        "repotting",
        60,
        "A second young plant now lives in a planter made from half a coconut shell.",
        "Coconut shell planter"
      ),
      event("watering", 4, "Leaves were drooping, so it got a full drink."),
      event("watering", -3, "Probably. It will let me know."),
    ],
  },
  {
    commonName: "Prayer Plant",
    genus: "Maranta",
    species: "M. leuconeura var. erythroneura",
    nickname: "Amen",
    source: "Rescued from a garden centre clearance shelf",
    ownedDaysAgo: 150,
    isSafe: true,
    isAirPurifying: false,
    description:
      "Folds its leaves up every evening like hands in prayer and opens them again in the morning. It was half dead when I found it, with three leaves left. The red veins look hand-painted.",
    currentHeight: "25 cm",
    currentPotSize: "14 cm",
    repottedDaysAgo: 140,
    humidity: "60–70%",
    temperature: "19–24°C",
    roomLocation: "Living room",
    windowDirection: "north_facing_northern_hemisphere",
    lightExposure: "indirect_sun_light",
    growingMedium: "soil",
    pottingMix: ["Calathea mix", "Coco coir", "Vermiculite"],
    wateringNotes:
      "Soil stays evenly moist, never wet. Filtered or rain water only, tap water turns the leaf tips brown.",
    mistingNotes: "Sits on a pebble tray next to the humidifier. A light mist in the morning on dry days.",
    leafCleaningNotes: "Gently, with a soft brush. The leaves are thin and tear easily.",
    fertilizingNotes: "Weak liquid fertilizer every two weeks while it is putting out new leaves.",
    additionalNotes:
      "No direct sun, it bleaches the pattern. Safe for cats and dogs.",
    photos: [photo("prayer-plant-1.jpg"), photo("prayer-plant-2.jpg")],
    events: [
      event(
        "rescue",
        150,
        "Three leaves, dry soil and a clearance sticker. Could not leave it there."
      ),
      event("repotting", 140, "Fresh, moisture-retentive mix and a slightly bigger pot."),
      event(
        "humidity",
        135,
        "Set up a pebble tray and moved it next to the humidifier."
      ),
      event(
        "healthWarning",
        70,
        "Crispy brown tips on the newest leaves. Suspecting hard tap water."
      ),
      event("careAdjustment", 68, "Switched to filtered water.", "Filtered water only"),
      event("recovery", 30, "Four new leaves without a single brown tip."),
      event("bloom", 14, "Tiny pale purple flowers on thin stalks. Did not expect that."),
      event("watering", 2, "Top of the soil was just starting to dry."),
      event("watering", -1, "Keep the soil evenly moist."),
    ],
  },
  {
    commonName: "Spider Plant",
    genus: "Chlorophytum",
    species: "C. comosum 'Variegatum'",
    nickname: "Charlotte",
    source: "Housewarming gift",
    ownedDaysAgo: 520,
    isSafe: true,
    isAirPurifying: true,
    description:
      "Indestructible and generous. Every few months it sends out long runners with baby plants at the ends, ready to be potted and given away. Completely safe for pets, which the cat has tested thoroughly.",
    currentHeight: "35 cm",
    currentPotSize: "18 cm hanging basket",
    repottedDaysAgo: 230,
    humidity: "40–60%",
    temperature: "17–24°C",
    roomLocation: "Bedroom",
    windowDirection: "west_facing_northern_hemisphere",
    lightExposure: "indirect_sun_light",
    growingMedium: "soil",
    pottingMix: ["Houseplant tropical mix", "Perlite", "Coco coir"],
    wateringNotes:
      "Once a week. The thick roots store water, so a missed week is not a problem.",
    mistingNotes: "Now and then in winter when the tips start to brown.",
    leafCleaningNotes: "Brown tips are trimmed with clean scissors, following the shape of the leaf.",
    fertilizingNotes: "Liquid fertilizer every two weeks in spring and summer.",
    additionalNotes:
      "Hangs out of reach because the cat treats it like salad. Babies root in water within two weeks.",
    photos: [photo("spider-plant-1.jpg"), photo("spider-plant-2.jpg")],
    events: [
      event("gift", 520, "From Marta, for the new flat."),
      event(
        "catVisit",
        440,
        "Luna chewed two leaves. Harmless for her, less so for the plant."
      ),
      event("relocate", 439, "Moved into a hanging basket, out of paw reach."),
      event(
        "growth",
        300,
        "First runner with three baby plants at the end.",
        "First babies"
      ),
      event("repotting", 230, "Roots were pushing the plant out of its pot."),
      event(
        "division",
        228,
        "Potted four babies. Three went to friends, one stayed."
      ),
      event("watering", 6, "Regular weekly watering."),
      event("fertilize", -8, "Half-strength liquid fertilizer."),
    ],
  },
  {
    commonName: "Bunny Ear Cactus",
    genus: "Opuntia",
    species: "O. microdasys",
    nickname: "Bugs",
    source: "Cactus and succulent fair",
    ownedDaysAgo: 110,
    isSafe: false,
    isAirPurifying: false,
    description:
      "Looks soft and friendly, is neither. Instead of spines it has tufts of tiny hair-like glochids that get everywhere, so it is handled with kitchen tongs only. Each new pad grows in pairs, like ears.",
    currentHeight: "14 cm",
    currentPotSize: "9 cm",
    repottedDaysAgo: 100,
    humidity: "20–40%",
    temperature: "18–30°C",
    roomLocation: "Home office",
    windowDirection: "south_facing_northern_hemisphere",
    lightExposure: "full_day_sun_light",
    growingMedium: "soil",
    pottingMix: ["Cactus mix", "Pumice", "Coarse sand"],
    wateringNotes:
      "Every three weeks in summer, when the soil is completely dry. Almost nothing in winter.",
    mistingNotes: "Never.",
    leafCleaningNotes: "A soft, dry paintbrush removes the dust between the glochids.",
    fertilizingNotes: "Low-nitrogen cactus fertilizer once in spring and once in summer.",
    additionalNotes:
      "Not toxic, but the glochids make it a bad idea around curious pets and children.",
    photos: [photo("bunny-ear-cactus-1.jpg")],
    events: [
      event("purchase", 110, "Could not resist the ears."),
      event("repotting", 100, "Gritty mix, small pot, gravel on top. Used tongs."),
      event("growth", 40, "A new pad is forming on the left ear.", "New pad"),
      event("watering", 21, "Light watering around the edge of the pot."),
      event("watering", -7, "Only if the soil is bone dry."),
    ],
  },
  {
    commonName: "ZZ Plant",
    genus: "Zamioculcas",
    species: "Z. zamiifolia",
    nickname: "Zed",
    source: "Left behind by the previous tenant",
    ownedDaysAgo: 365,
    isSafe: false,
    isAirPurifying: false,
    description:
      "Came with the flat, dusty and forgotten behind a door. It stores water in potato-like rhizomes, so months of neglect did not bother it at all. Now it lives in the windowless hallway under a grow light.",
    currentHeight: "65 cm",
    currentPotSize: "21 cm",
    repottedDaysAgo: 300,
    humidity: "40–50%",
    temperature: "18–26°C",
    roomLocation: "Hallway",
    windowDirection: "no_window",
    lightExposure: "artificial_light",
    growingMedium: "soil",
    pottingMix: ["Houseplant tropical mix", "Perlite", "Pumice"],
    wateringNotes: "Every three weeks. The rhizomes do the rest.",
    mistingNotes: "None.",
    leafCleaningNotes:
      "The glossy leaves show every speck of dust, so they get wiped once a month.",
    fertilizingNotes: "Half-strength fertilizer every two months.",
    additionalNotes:
      "The grow light runs on a timer, ten hours a day. All parts are toxic if eaten.",
    photos: [photo("zz-plant-1.jpg")],
    events: [
      event(
        "rescue",
        365,
        "Found behind the hallway door on moving day. Adopted on the spot.",
        "Adopted"
      ),
      event("repotting", 300, "The rhizomes had deformed the old plastic pot."),
      event(
        "lighting",
        250,
        "Installed a full-spectrum grow light on a ten-hour timer."
      ),
      event("newLeaf", 120, "Two new stems are unrolling at the same time."),
      event("cleaning", 28, "Wiped every leaflet. It shines again."),
      event("watering", 19, "Three-weekly watering."),
      event("watering", -2, "Next three-weekly watering."),
    ],
  },
  {
    commonName: "Aloe Vera",
    genus: "Aloe",
    species: "A. vera",
    nickname: "Doc",
    source: "A pup from the neighbour's plant",
    ownedDaysAgo: 75,
    isSafe: false,
    isAirPurifying: true,
    description:
      "The newest succulent in the house, still small enough to fit on the windowsill. The white spots on the leaves are typical for young plants and fade with age. Handy after a kitchen burn.",
    currentHeight: "18 cm",
    currentPotSize: "12 cm",
    repottedDaysAgo: 73,
    humidity: "30–40%",
    temperature: "18–27°C",
    roomLocation: "Kitchen windowsill",
    windowDirection: "east_facing_northern_hemisphere",
    lightExposure: "morning_sun_light",
    growingMedium: "soil",
    pottingMix: ["Succulent mix", "Perlite", "Coarse sand"],
    wateringNotes:
      "Deeply, but only every two to three weeks. The leaves feel firm when it has enough water.",
    mistingNotes: "None.",
    leafCleaningNotes: "A damp cloth along the leaves, away from the spines.",
    fertilizingNotes: "Once in spring with succulent fertilizer.",
    additionalNotes:
      "The gel is fine on skin, but the plant itself is toxic to cats and dogs.",
    photos: [photo("aloe-vera-1.jpg"), photo("aloe-vera-2.jpg")],
    events: [
      event(
        "division",
        75,
        "Separated from the mother plant with a few roots attached.",
        "Pup separated"
      ),
      event(
        "repotting",
        73,
        "Left to callus for two days, then potted in a gritty mix."
      ),
      event(
        "coldRescue",
        35,
        "Spent a night next to an open window. Two leaf tips turned glassy."
      ),
      event("recovery", 15, "A new leaf is growing from the centre."),
      event("watering", 10, "Deep watering, drained well."),
      event("watering", -11, "When the soil is dry all the way through."),
    ],
  },
  {
    commonName: "Bird's Nest Fern",
    genus: "Asplenium",
    species: "A. nidus",
    nickname: "Nessie",
    source: "Botanical garden plant sale",
    ownedDaysAgo: 45,
    isSafe: true,
    isAirPurifying: false,
    description:
      "The most recent addition. New fronds unroll from the fuzzy brown “nest” in the centre, and the wavy edges get more pronounced with good light. A fern that actually tolerates a normal flat.",
    currentHeight: "30 cm",
    currentPotSize: "15 cm",
    repottedDaysAgo: -20,
    humidity: "60–80%",
    temperature: "18–24°C",
    roomLocation: "Bathroom",
    windowDirection: "north_facing_northern_hemisphere",
    lightExposure: "low_sun_light",
    growingMedium: "soil",
    pottingMix: ["Fern mix", "Peat moss", "Orchid bark"],
    wateringNotes:
      "Twice a week, around the edge of the pot. Never into the centre of the nest, it rots easily.",
    mistingNotes: "Gets all the humidity it needs from the shower.",
    leafCleaningNotes: "A lukewarm rinse in the shower once a month.",
    fertilizingNotes: "Quarter-strength fertilizer once a month while new fronds are growing.",
    additionalNotes:
      "Still in its nursery pot, the repot is planned. Non-toxic to cats and dogs.",
    photos: [photo("birds-nest-fern-1.jpg"), photo("birds-nest-fern-2.jpg")],
    events: [
      event("purchase", 45, "Picked the one with the most new fronds in the centre."),
      event("quarantineStart", 45, "Two weeks on its own in the bathroom."),
      event("quarantineEnd", 31, "All clear. It likes the bathroom so much that it stays."),
      event("newLeaf", 16, "Two fronds unrolling from the nest at once."),
      event("watering", 3, "Watered around the edge of the pot."),
      event("watering", -1, "Around the edge, not into the nest."),
      event(
        "repotting",
        -20,
        "Planned move into a 17 cm pot with fresh fern mix."
      ),
    ],
  },
];
