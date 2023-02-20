/*
  Warnings:

  - The required column `id` was added to the `Instruction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Instruction_recipeId_key";

-- AlterTable
ALTER TABLE "Instruction" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id");
