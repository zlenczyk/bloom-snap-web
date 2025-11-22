/*
  Warnings:

  - Added the required column `color` to the `timeline_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeline_event" ADD COLUMN     "color" TEXT NOT NULL;
