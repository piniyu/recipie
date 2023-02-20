/*
  Warnings:

  - You are about to drop the column `publicId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Image_publicId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "publicId";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "thumbnail";


-- CreateTable
CREATE TABLE "Thumbnail" (
    "recipeId" TEXT NOT NULL,
    "jpgSrc" TEXT NOT NULL,
    "webSrc" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Thumbnail_recipeId_key" ON "Thumbnail"("recipeId");

-- AddForeignKey
ALTER TABLE "Thumbnail" ADD CONSTRAINT "Thumbnail_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

UPDATE "Thumbnail"
SET "jpgSrc" = CONCAT("recipeId",'/0')
 ,"webSrc" = CONCAT("recipeId",'/00');