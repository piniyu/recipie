import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Difficulty } from '../enum/difficulty.enum';
// import { IngredientNum } from 'src/graphql.schema';

// export type Difficulty = 'ACTIVE' | 'ARCHIVE' | 'DELETE' | 'DRAFT' | 'LOCK' | 'REPORTED';


@ObjectType({ description: 'recipe ' })
export class Recipe {
    @Field(type => ID)
    id: string

    @Field(type => ID)
    authorId: string

    @Field()
    title: string

    @Field(type => Difficulty, { nullable: true })
    difficulty?: Difficulty[keyof Difficulty]
    // difficulty?: 'DIFFICULT5' | 'DIFFICULT4' | 'MODERATE3' | 'EASY2' | 'EASY1' 

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