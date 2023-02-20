/*
  Warnings:

  - You are about to drop the column `instructions` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "instructions";

-- CreateTable
CREATE TABLE "Instruction" (
    "recipeId" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "photos" TEXT NOT NULL,
    "methods" TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "Instruction_recipeId_key" ON "Instruction"("recipeId");

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
