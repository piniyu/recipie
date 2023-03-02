/*
  Warnings:

  - The primary key for the `RecipeTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecipeTags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RecipeTags" DROP CONSTRAINT "RecipeTags_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RecipeTags_pkey" PRIMARY KEY ("recipeId", "tagId");
