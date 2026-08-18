/*
  Warnings:

  - The values [TASK,PAYMENT] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('TASK_ASSIGNED', 'TASK_COMPLETED', 'PROJECT_INVITATION', 'SYSTEM');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropIndex
DROP INDEX "Notification_userId_idx";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");
