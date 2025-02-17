/*
  Warnings:

  - You are about to drop the column `user_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `votes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_userId_fkey";

-- DropForeignKey
ALTER TABLE "votingSections" DROP CONSTRAINT "votingSections_userToken_fkey";

-- DropIndex
DROP INDEX "users_user_token_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_token",
ADD COLUMN     "userToken" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "userId",
ADD COLUMN     "userToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_userToken_key" ON "users"("userToken");

-- AddForeignKey
ALTER TABLE "votingSections" ADD CONSTRAINT "votingSections_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "users"("userToken") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "users"("userToken") ON DELETE SET NULL ON UPDATE CASCADE;
