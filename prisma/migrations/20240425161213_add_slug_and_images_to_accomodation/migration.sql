/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `accommodations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `accommodations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "accommodation_id" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_slug_key" ON "accommodations"("slug");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
