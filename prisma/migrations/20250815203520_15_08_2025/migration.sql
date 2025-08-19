/*
  Warnings:

  - You are about to drop the `timeline_activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."timeline_activity";

-- CreateTable
CREATE TABLE "public"."timeline_event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_event_pkey" PRIMARY KEY ("id")
);
