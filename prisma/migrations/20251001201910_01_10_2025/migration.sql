/*
  Warnings:

  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the column `color` on the `timeline_event` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `timeline_event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `description` on the `timeline_event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - Added the required column `plantId` to the `timeline_event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GrowingMedium" AS ENUM ('soil', 'semi_hydroponics', 'hydroponics');

-- CreateEnum
CREATE TYPE "LightExposure" AS ENUM ('morning_sun_light', 'afternoon_sun_light', 'full_day_sun_light', 'low_sun_light', 'indirect_sun_light', 'artificial_light');

-- CreateEnum
CREATE TYPE "WindowDirection" AS ENUM ('north_facing_northern_hemisphere', 'south_facing_northern_hemisphere', 'east_facing_northern_hemisphere', 'west_facing_northern_hemisphere', 'north_facing_southern_hemisphere', 'south_facing_southern_hemisphere', 'east_facing_southern_hemisphere', 'west_facing_southern_hemisphere', 'no_window');

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "timeline_event" DROP COLUMN "color",
ADD COLUMN     "plantId" TEXT NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(500);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commonName" VARCHAR(200) NOT NULL,
    "species" VARCHAR(200),
    "genus" VARCHAR(200),
    "nickname" VARCHAR(200),
    "source" VARCHAR(200),
    "ownedSince" TIMESTAMP(3),
    "isSafe" BOOLEAN,
    "isAirPurifying" BOOLEAN,
    "description" VARCHAR(300),
    "currentHeight" VARCHAR(50),
    "currentPotSize" VARCHAR(50),
    "lastRepotted" TIMESTAMP(3),
    "humidity" VARCHAR(50),
    "temperature" VARCHAR(50),
    "roomLocation" VARCHAR(100),
    "windowDirection" "WindowDirection",
    "lightExposure" "LightExposure",
    "growingMedium" "GrowingMedium",
    "pottingMix" JSONB,
    "wateringNotes" VARCHAR(300),
    "mistingNotes" VARCHAR(300),
    "leafCleaningNotes" VARCHAR(300),
    "fertilizingNotes" VARCHAR(300),
    "additionalNotes" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantPhoto" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "caption" VARCHAR(300),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlantPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Plant_userId_idx" ON "Plant"("userId");

-- CreateIndex
CREATE INDEX "timeline_event_plantId_idx" ON "timeline_event"("plantId");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantPhoto" ADD CONSTRAINT "PlantPhoto_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_event" ADD CONSTRAINT "timeline_event_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
