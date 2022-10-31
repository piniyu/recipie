import { Field, InputType, Int } from '@nestjs/graphql'
import { Difficulty } from '../enum/difficulty.enum'
// import { IsOptional, Length, MaxLength } from 'class-validator';
// import { RecipeInput, IngredientNumInput } from '../../graphql.schema';

@InputType()
export class RecipeInput {
  @Field()
  title: string

  @Field()
  authorId: string

  @Field(type => Difficulty, { nullable: false })
  difficulty?: Difficulty

  @Field(type => [IngredientNumInput])
  ingredientsNum: IngredientNumInput[]

  @Field(type => [String])
  instructions: string[]

  @Field(type => Int, { nullable: false })
  serving?: number
}

@InputType()
export class IngredientNumInput {
  @Field({ nullable: true })
  ingredientId?: string

  @Field({ nullable: true })
  recipeId?: string

  @Field()
  name: string

  @Field()
  unit: string

  @Field()
  value: string
}
