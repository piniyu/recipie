-- DropForeignKey
ALTER TABLE "NumIngredientOnRecipe" DROP CONSTRAINT "NumIngredientOnRecipe_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "NumIngredientOnRecipe" ADD CONSTRAINT "NumIngredientOnRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
