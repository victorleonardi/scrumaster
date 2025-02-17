/*
  Warnings:

  - You are about to drop the column `userId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "userId",
ADD COLUMN     "userToken" TEXT;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "users"("userToken") ON DELETE SET NULL ON UPDATE CASCADE;
