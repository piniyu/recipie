/*
  Warnings:

  - The required column `id` was added to the `RecipeTags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "RecipeTags_recipeId_key";

-- AlterTable
ALTER TABLE "RecipeTags" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RecipeTags_pkey" PRIMARY KEY ("id");
