-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "usersOnProjects" (
    "id" SERIAL NOT NULL,
    "userToken" TEXT,
    "projectId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersOnProjects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usersOnProjects" ADD CONSTRAINT "usersOnProjects_userToken_fkey" FOREIGN KEY ("userToken") REFERENCES "users"("userToken") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersOnProjects" ADD CONSTRAINT "usersOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
