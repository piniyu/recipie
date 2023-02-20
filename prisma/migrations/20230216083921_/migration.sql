/*
  Warnings:

  - You are about to drop the column `tags` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "RecipeTags" (
    "recipeId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeTags_recipeId_key" ON "RecipeTags"("recipeId");

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeTags" ADD CONSTRAINT "RecipeTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
