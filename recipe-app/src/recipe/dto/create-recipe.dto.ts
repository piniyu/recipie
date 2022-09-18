import { RecipeInput, IngredientInput } from '../../graphql.schema';

export class RecipeInputDto extends RecipeInput {
  ingredients: [IngredientNumDto];
}

export class IngredientNumDto extends IngredientInput {
}