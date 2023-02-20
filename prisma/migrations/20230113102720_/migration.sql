/*
  Warnings:

  - A unique constraint covering the columns `[recipeId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_id_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "recipeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_recipeId_key" ON "Image"("recipeId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
