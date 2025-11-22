/*
  Warnings:

  - The `pottingMix` column on the `Plant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "pottingMix",
ADD COLUMN     "pottingMix" TEXT[];
