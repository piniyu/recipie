/*
  Warnings:

  - A unique constraint covering the columns `[authorId,title]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_authorId_title_key" ON "Recipe"("authorId", "title");
