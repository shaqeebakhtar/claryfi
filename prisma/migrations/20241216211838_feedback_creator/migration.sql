/*
  Warnings:

  - You are about to drop the column `submitterEmail` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `submitterName` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "submitterEmail",
DROP COLUMN "submitterName",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
