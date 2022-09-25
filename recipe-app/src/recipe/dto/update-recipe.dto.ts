import { RecipeInput } from '../../graphql.schema';

export class RecipeInputDto extends RecipeInput {
  ingredients: [IngredientNumDto];
}
