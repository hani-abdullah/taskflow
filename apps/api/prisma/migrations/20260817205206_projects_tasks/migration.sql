/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropIndex
DROP INDEX "Project_ownerId_idx";

-- DropIndex
DROP INDEX "Task_status_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM';

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "Project"("userId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
