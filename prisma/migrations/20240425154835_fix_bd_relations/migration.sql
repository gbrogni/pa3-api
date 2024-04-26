/*
  Warnings:

  - You are about to drop the column `reservationId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reservation_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reservation_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccommodationStatus" AS ENUM ('AVAILABLE', 'PENDING', 'RESERVED');

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_reservationId_fkey";

-- DropIndex
DROP INDEX "payments_reservationId_key";

-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "status" "AccommodationStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "reservationId",
ADD COLUMN     "reservation_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "phone",
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_reservation_id_key" ON "payments"("reservation_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
