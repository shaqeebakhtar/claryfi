/*
  Warnings:

  - You are about to drop the column `feedbackId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_feedbackId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "feedbackId";

-- CreateTable
CREATE TABLE "TagOnPosts" (
    "feedbackId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagOnPosts_pkey" PRIMARY KEY ("feedbackId","tagId")
);

-- AddForeignKey
ALTER TABLE "TagOnPosts" ADD CONSTRAINT "TagOnPosts_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnPosts" ADD CONSTRAINT "TagOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
