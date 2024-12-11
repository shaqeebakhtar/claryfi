-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "feedbackId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;
