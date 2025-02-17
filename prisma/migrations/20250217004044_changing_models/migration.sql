/*
  Warnings:

  - You are about to drop the column `sectionId` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_projectId_fkey";

-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_userToken_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_sectionId_fkey";

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "sectionId",
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "votingSectionId" INTEGER;

-- DropTable
DROP TABLE "sections";

-- CreateTable
CREATE TABLE "votingSections" (
    "id" SERIAL NOT NULL,
    "userToken" TEXT,
    "projectId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votingSections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "votingSections" ADD CONSTRAINT "votingSections_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "users"("user_token") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votingSections" ADD CONSTRAINT "votingSections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_votingSectionId_fkey" FOREIGN KEY ("votingSectionId") REFERENCES "votingSections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
