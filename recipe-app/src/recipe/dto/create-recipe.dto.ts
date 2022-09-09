import { IngredientNumDto } from 'src/ingredient/dto/create-ingredient.dto';

export class CreateRecipeDto {
  title: string;
  author: string;
  content: string;
  ingredients: [IngredientNumDto];
}
