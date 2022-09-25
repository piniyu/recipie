
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RecipeInput {
    title: string;
    ingredients: IngredientNumInput[];
    instructions: string[];
}

export class IngredientNumInput {
    ingredientId?: Nullable<string>;
    recipeId?: Nullable<string>;
    name: string;
    unit: string;
    value: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract test(): string | Promise<string>;

    abstract latestRecipe(): Nullable<Recipe>[] | Promise<Nullable<Recipe>[]>;

    abstract recipeById(recipeId: string): Recipe | Promise<Recipe>;
}

export abstract class IMutation {
    abstract createRecipe(content: RecipeInput): Recipe | Promise<Recipe>;

    abstract updateRecipe(content: RecipeInput): Recipe | Promise<Recipe>;

    abstract deleteRecipe(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Recipe {
    id: string;
    authorId: string;
    title: string;
    ingredients: IngredientNum[];
    instructions: string[];
    updatedAt?: Nullable<Date>;
}

export class IngredientNum {
    ingredientId: string;
    recipeId: string;
    name: string;
    unit: string;
    value: string;
}

export type JSON = any;
type Nullable<T> = T | null;
