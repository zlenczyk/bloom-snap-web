/*
  Warnings:

  - The values [semi_hydroponics] on the enum `GrowingMedium` will be removed. If these variants are still used in the database, this will fail.
  - The values [morning_sun_light,afternoon_sun_light,full_day_sun_light,low_sun_light,indirect_sun_light,artificial_light] on the enum `LightExposure` will be removed. If these variants are still used in the database, this will fail.
  - The values [north_facing_northern_hemisphere,south_facing_northern_hemisphere,east_facing_northern_hemisphere,west_facing_northern_hemisphere,north_facing_southern_hemisphere,south_facing_southern_hemisphere,east_facing_southern_hemisphere,west_facing_southern_hemisphere,no_window] on the enum `WindowDirection` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GrowingMedium_new" AS ENUM ('soil', 'semi-hydroponics', 'hydroponics');
ALTER TABLE "Plant" ALTER COLUMN "growingMedium" TYPE "GrowingMedium_new" USING ("growingMedium"::text::"GrowingMedium_new");
ALTER TYPE "GrowingMedium" RENAME TO "GrowingMedium_old";
ALTER TYPE "GrowingMedium_new" RENAME TO "GrowingMedium";
DROP TYPE "GrowingMedium_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LightExposure_new" AS ENUM ('morning-sun-light', 'afternoon-sun-light', 'full-day-sun-light', 'low-sun-light', 'indirect-sun-light', 'artificial-light');
ALTER TABLE "Plant" ALTER COLUMN "lightExposure" TYPE "LightExposure_new" USING ("lightExposure"::text::"LightExposure_new");
ALTER TYPE "LightExposure" RENAME TO "LightExposure_old";
ALTER TYPE "LightExposure_new" RENAME TO "LightExposure";
DROP TYPE "LightExposure_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WindowDirection_new" AS ENUM ('north-facing-northern-hemisphere', 'south-facing-northern-hemisphere', 'east-facing-northern-hemisphere', 'west-facing-northern-hemisphere', 'north-facing-southern-hemisphere', 'south-facing-southern-hemisphere', 'east-facing-southern-hemisphere', 'west-facing-southern-hemisphere', 'no-window');
ALTER TABLE "Plant" ALTER COLUMN "windowDirection" TYPE "WindowDirection_new" USING ("windowDirection"::text::"WindowDirection_new");
ALTER TYPE "WindowDirection" RENAME TO "WindowDirection_old";
ALTER TYPE "WindowDirection_new" RENAME TO "WindowDirection";
DROP TYPE "WindowDirection_old";
COMMIT;
