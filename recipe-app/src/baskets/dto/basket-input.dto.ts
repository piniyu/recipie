import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class RecipeInput {
  @Field()
  recipeId: string

  @Field()
  userId: string
}
