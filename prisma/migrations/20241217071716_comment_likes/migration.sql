/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_userId_fkey";

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "hideBranding" SET DEFAULT false;

-- DropTable
DROP TABLE "Reply";

-- CreateTable
CREATE TABLE "CommentLike" (
    "id" TEXT NOT NULL,
    "likedCommentId" TEXT NOT NULL,
    "likedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CommentLike_likedBy_idx" ON "CommentLike"("likedBy");

-- CreateIndex
CREATE INDEX "CommentLike_likedCommentId_idx" ON "CommentLike"("likedCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_likedBy_likedCommentId_key" ON "CommentLike"("likedBy", "likedCommentId");

-- AddForeignKey
ALTER TABLE "CommentLike" ADD CONSTRAINT "CommentLike_likedCommentId_fkey" FOREIGN KEY ("likedCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
