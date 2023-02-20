/*
  Warnings:

  - You are about to drop the column `recipeId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- DropIndex
DROP INDEX "Image_recipeId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "recipeId";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_fkey" FOREIGN KEY ("id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
