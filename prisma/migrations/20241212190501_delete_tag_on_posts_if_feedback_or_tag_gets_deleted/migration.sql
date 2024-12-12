-- DropForeignKey
ALTER TABLE "TagOnPosts" DROP CONSTRAINT "TagOnPosts_feedbackId_fkey";

-- DropForeignKey
ALTER TABLE "TagOnPosts" DROP CONSTRAINT "TagOnPosts_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagOnPosts" ADD CONSTRAINT "TagOnPosts_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnPosts" ADD CONSTRAINT "TagOnPosts_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
