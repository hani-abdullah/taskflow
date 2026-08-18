ALTER TYPE "SubscriptionStatus" ADD VALUE IF NOT EXISTS 'INCOMPLETE_EXPIRED';
ALTER TYPE "SubscriptionStatus" ADD VALUE IF NOT EXISTS 'UNPAID';
ALTER TYPE "SubscriptionStatus" ADD VALUE IF NOT EXISTS 'PAUSED';

DROP INDEX IF EXISTS "Subscription_userId_idx";
DROP INDEX IF EXISTS "Subscription_providerCustomerId_idx";
DROP INDEX IF EXISTS "Subscription_providerSubscriptionId_idx";

ALTER TABLE "Subscription"
  RENAME COLUMN "providerCustomerId" TO "stripeCustomerId";
ALTER TABLE "Subscription"
  RENAME COLUMN "providerSubscriptionId" TO "stripeSubscriptionId";

ALTER TABLE "Subscription"
  ADD COLUMN "priceId" TEXT,
  ADD COLUMN "currentPeriodStart" TIMESTAMP(3),
  ADD COLUMN "currentPeriodEnd" TIMESTAMP(3),
  ADD COLUMN "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Subscription"
  ALTER COLUMN "stripeCustomerId" SET NOT NULL,
  ALTER COLUMN "stripeSubscriptionId" SET NOT NULL,
  DROP COLUMN "provider";

CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
CREATE UNIQUE INDEX "Subscription_stripeCustomerId_key" ON "Subscription"("stripeCustomerId");
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

CREATE TABLE "StripeWebhookEvent" (
  "id" TEXT NOT NULL,
  "stripeEventId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "StripeWebhookEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "StripeWebhookEvent_stripeEventId_key"
  ON "StripeWebhookEvent"("stripeEventId");
CREATE INDEX "StripeWebhookEvent_type_idx" ON "StripeWebhookEvent"("type");
