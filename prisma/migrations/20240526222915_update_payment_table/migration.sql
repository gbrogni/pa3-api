/*
  Warnings:

  - Added the required column `payment_method` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'PAYPAL', 'APPLE');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "card_number" TEXT,
ADD COLUMN     "cvc" TEXT,
ADD COLUMN     "expiry_date" TEXT,
ADD COLUMN     "payment_method" "PaymentMethod" NOT NULL;
