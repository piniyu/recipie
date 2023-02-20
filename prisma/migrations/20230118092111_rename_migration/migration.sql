/*
  Warnings:

  - You are about to drop the column `webSrc` on the `Thumbnail` table. All the data in the column will be lost.
  - Added the required column `webpSrc` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Thumbnail" 
RENAME COLUMN "webSrc" TO "webpSrc"

