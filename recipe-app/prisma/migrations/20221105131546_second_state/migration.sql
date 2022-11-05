/*
  Warnings:

  - Made the column `serving` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "serving" SET NOT NULL,
ALTER COLUMN "serving" SET DEFAULT 0;
