/*
  Warnings:

  - Added the required column `thumbnail` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "thumbnail" TEXT NOT NULL;

UPDATE "Recipe"
SET "thumbnail" = CONCAT(id , '/0'::text);
