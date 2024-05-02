/*
  Warnings:

  - You are about to drop the column `activationLink` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActivated` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "activationLink",
DROP COLUMN "isActivated";
