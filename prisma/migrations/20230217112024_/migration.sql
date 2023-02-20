-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
