import { Field, InputType } from '@nestjs/graphql';
import { Difficulty } from '../enum/difficulty.enum';
// import { IsOptional, Length, MaxLength } from 'class-validator';
// import { RecipeInput, IngredientNumInput } from '../../graphql.schema';

@InputType()
export class RecipeInput {
  @Field()
  title: string;

  @Field(type => Difficulty, { nullable: false })
  difficulty?: Difficulty

  @Field(type => [IngredientNumInput])
  ingredients: IngredientNumInput[];

  @Field(type => [String])
  instructions: string[];
}

@InputType()
export class IngredientNumInput {
  @Field({ nullable: true })
  ingredientId?: string;

  @Field({ nullable: true })
  recipeId?: string;

  @Field()
  name: string;

  @Field()
  unit: string;

  @Field()
  value: string;
}