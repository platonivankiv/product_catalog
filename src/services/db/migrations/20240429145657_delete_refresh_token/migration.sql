/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "refreshToken";

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");
