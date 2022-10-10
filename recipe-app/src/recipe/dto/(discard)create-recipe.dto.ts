import { RecipeInput, IngredientNumInput } from '../../graphql.schema';

export class RecipeInputDto extends RecipeInput {
  ingredients: [IngredientNumDto];
}

export class IngredientNumDto extends IngredientNumInput {
}