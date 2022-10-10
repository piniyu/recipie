import { Field, ID, ObjectType } from '@nestjs/graphql';
// import { IngredientNum } from 'src/graphql.schema';

@ObjectType({ description: 'recipe ' })
export class Recipe {
    @Field(type => ID)
    id: string

    @Field(type => ID)
    authorId: string

    @Field()
    title: string

    @Field(type => [IngredientNum])
    ingredients: IngredientNum[]

    @Field(type => [String])
    instructions: string[]

    @Field({ nullable: true })
    updatedAt: Date
}

@ObjectType({ description: 'The combination of ingredient and its number for the recipe' })
export class IngredientNum {
    @Field(type => ID)
    ingredientId: string;

    @Field(type => ID)
    recipeId: string;

    @Field()
    name: string;

    @Field()
    unit: string;

    @Field()
    value: string;
}