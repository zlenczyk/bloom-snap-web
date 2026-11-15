import db from "@/lib/db";
import { isDemoPhotoPath } from "@/lib/photos";
import { deletePhotos } from "@/lib/storage";
import { Prisma } from "@prisma/client";
import { DEMO_PLANTS } from "./collection";
import { DEMO_LIFETIME_MS } from "./constants";

// Every visitor who starts the demo gets their own throwaway account with a
// copy of the sample collection. Nothing they do is visible to anyone else,
// and the account is deleted once it expires.

// Upper bound on live demo accounts; the oldest ones make room for new ones.
const MAX_DEMO_ACCOUNTS = 200;

const DAY_MS = 24 * 60 * 60 * 1000;

const DEMO_AVATARS = [
  "/assets/girl-1.webp",
  "/assets/girl-4.webp",
  "/assets/boy-2.webp",
  "/assets/boy-5.webp",
  "/assets/pet-1.webp",
  "/assets/pet-2.webp",
];

const NAME_ADJECTIVES = [
  "Curious",
  "Sunny",
  "Leafy",
  "Happy",
  "Gentle",
  "Wild",
  "Lucky",
  "Mossy",
  "Dewy",
  "Cheerful",
];

const NAME_PLANTS = [
  "Fern",
  "Monstera",
  "Pothos",
  "Cactus",
  "Orchid",
  "Ficus",
  "Aloe",
  "Ivy",
  "Calathea",
  "Hoya",
];

const pick = <T>(items: T[]): T =>
  items[Math.floor(Math.random() * items.length)];

const randomUserName = (): string =>
  `${pick(NAME_ADJECTIVES)} ${pick(NAME_PLANTS)} ${
    100 + Math.floor(Math.random() * 900)
  }`;

const createDemoUser = async () => {
  // Usernames are unique, so a (rare) clash just means picking another one.
  for (let attempt = 0; ; attempt++) {
    try {
      return await db.user.create({
        data: {
          // ".invalid" is a reserved domain: these addresses can never exist.
          email: `demo-${crypto.randomUUID()}@bloomsnap.invalid`,
          userName: randomUserName(),
          image: pick(DEMO_AVATARS),
          isDemo: true,
          profileCompleted: true,
        },
      });
    } catch (error) {
      const isNameTaken =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002";

      if (!isNameTaken || attempt >= 4) {
        throw error;
      }
    }
  }
};

const seedDemoCollection = async (userId: string) => {
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const dateFromDaysAgo = (daysAgo: number) =>
    new Date(today - daysAgo * DAY_MS);

  const plants = await db.plant.createManyAndReturn({
    data: DEMO_PLANTS.map(
      ({ ownedDaysAgo, repottedDaysAgo, photos, events, ...plant }, index) => ({
        ...plant,
        userId,
        ownedSince: dateFromDaysAgo(ownedDaysAgo),
        lastRepotted: dateFromDaysAgo(repottedDaysAgo),
        // The collection is sorted by newest first by default; this keeps the
        // sample plants in the order they are listed.
        createdAt: new Date(now.getTime() - index * 1000),
      })
    ),
    select: { id: true, commonName: true },
  });

  const plantIds = new Map(plants.map((plant) => [plant.commonName, plant.id]));

  const withPlantId = <T>(
    getRows: (plant: (typeof DEMO_PLANTS)[number], plantId: string) => T[]
  ): T[] =>
    DEMO_PLANTS.flatMap((plant) => {
      const plantId = plantIds.get(plant.commonName);

      return plantId ? getRows(plant, plantId) : [];
    });

  await Promise.all([
    db.plantPhoto.createMany({
      data: withPlantId((plant, plantId) =>
        plant.photos.map((url, index) => ({
          plantId,
          url,
          createdAt: new Date(now.getTime() + index * 1000),
        }))
      ),
    }),
    db.timelineEvent.createMany({
      data: withPlantId((plant, plantId) =>
        plant.events.map(({ daysAgo, ...event }) => ({
          ...event,
          plantId,
          date: dateFromDaysAgo(daysAgo),
        }))
      ),
    }),
  ]);
};

export const createDemoAccount = async () => {
  const user = await createDemoUser();

  try {
    await seedDemoCollection(user.id);
  } catch (error) {
    // Do not leave an empty demo account behind.
    await db.user.delete({ where: { id: user.id } }).catch(() => {});

    throw error;
  }

  return user;
};

// Deletes demo accounts together with any photos their visitors uploaded.
// The sample photos are shared static files and stay where they are.
export const deleteDemoAccounts = async (userIds: string[]): Promise<void> => {
  if (userIds.length === 0) {
    return;
  }

  const photos = await db.plantPhoto.findMany({
    where: { plant: { userId: { in: userIds }, user: { isDemo: true } } },
    select: { url: true },
  });

  const uploadedPaths = photos
    .map((photo) => photo.url)
    .filter((path) => !isDemoPhotoPath(path));

  try {
    await deletePhotos(uploadedPaths);
  } catch (error) {
    console.error("Failed to delete demo uploads:", error);
  }

  // Plants, photos and timeline events go with the user (cascade).
  await db.user.deleteMany({ where: { id: { in: userIds }, isDemo: true } });
};

// Removes expired demo accounts and, if there are too many live ones, the
// oldest of those. Runs in the background whenever a new demo is started.
export const removeOldDemoAccounts = async (): Promise<void> => {
  // Sessions end after DEMO_LIFETIME_MS; the extra hour makes sure an account
  // is never deleted while its visitor is still signed in.
  const expiredBefore = new Date(
    Date.now() - DEMO_LIFETIME_MS - 60 * 60 * 1000
  );

  const expired = await db.user.findMany({
    where: { isDemo: true, createdAt: { lt: expiredBefore } },
    select: { id: true },
    take: 100,
  });

  const liveCount = await db.user.count({
    where: { isDemo: true, createdAt: { gte: expiredBefore } },
  });

  const surplus =
    liveCount > MAX_DEMO_ACCOUNTS
      ? await db.user.findMany({
          where: { isDemo: true, createdAt: { gte: expiredBefore } },
          orderBy: { createdAt: "asc" },
          select: { id: true },
          take: liveCount - MAX_DEMO_ACCOUNTS,
        })
      : [];

  await deleteDemoAccounts([...expired, ...surplus].map((user) => user.id));
};
