/*
  Warnings:

  - You are about to drop the column `status` on the `payments` table. All the data in the column will be lost.
  - Added the required column `status` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "status" "ReservationStatus" NOT NULL;

-- DropEnum
DROP TYPE "PaymentStatus";
