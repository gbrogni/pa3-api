/*
  Warnings:

  - You are about to drop the column `amount` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `card_name` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `card_number` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `cvc` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_date` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `payments` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "amount",
DROP COLUMN "card_name",
DROP COLUMN "card_number",
DROP COLUMN "cvc",
DROP COLUMN "expiry_date",
DROP COLUMN "payment_date",
DROP COLUMN "payment_method",
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
