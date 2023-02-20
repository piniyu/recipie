/*
  Warnings:

  - You are about to drop the column `jpgSrc` on the `Thumbnail` table. All the data in the column will be lost.
  - You are about to drop the column `webpSrc` on the `Thumbnail` table. All the data in the column will be lost.
  - Added the required column `s3Key` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thumbnail" DROP COLUMN "jpgSrc",
DROP COLUMN "webpSrc",
ADD COLUMN     "s3Key" TEXT NOT NULL;
