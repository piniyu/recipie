
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class RecipeInput {
    title: string;
    ingredients: IngredientInput[];
    instructions: JSON;
    updatedAt: string;
}

export class IngredientInput {
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
    title: string;
    userId: string;
    ingredients: Ingredient[];
    instructions: JSON;
}

export class Ingredient {
    name: string;
    unit: string;
    value: string;
}

export type JSON = any;
type Nullable<T> = T | null;
