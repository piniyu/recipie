import { Injectable } from '@nestjs/common';
import { NumIngredientOnRecipe, Recipe } from '@prisma/client';
import { truncate } from 'fs';
// import { Recipe } from '../graphql.schema';
import { PrismaService } from '../prisma/prisma.service';
import { RecipeInputDto } from './dto/create-recipe.dto';

export type GQLRecipe = {
  id: string,
  title: string,
  authorId: string,
  ingredients: Ingredient[],
  instructions: string[],
  updatedAt: Date,
}

export type Ingredient = {
  id: string,
  recipeId: string,
  name: string,
  unit: string,
  value: string,
}

export type RecipeDetailsPrisma = (Recipe & {
  ingredients: (NumIngredientOnRecipe & {
      ingredient: Ingredient;
  })[];
})


@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async findRecipe(id: string): Promise<GQLRecipe> {
    const recipe= ( await this.prisma.recipe.findUnique({
      where: { id },
      include: { 
      ingredients: {
          include: {
            ingredient: true} } },
    }) as RecipeDetailsPrisma);
    if (recipe === null) {
      throw new Error('Recipe not found');
    }
    return this._parse(recipe)
    // return { 
    //   id: recipe.id, 
    //   title: recipe.title,
    //   authorId: recipe.authorId,
    //   ingredients: recipe.ingredients.map(e => ({
    //     id: e.ingredientId, 
    //     recipeId: e.recipeId, 
    //     name: e.ingredient.name, 
    //     unit: e.unit, 
    //     value: e.value})),
    //   instructions: recipe.instructions,
    //   updatedAt: recipe.updatedAt? recipe.updatedAt: recipe.createdAt,
    // }
  }
  
  async getLatestRecipes(): Promise<GQLRecipe[] | null> {
    const recipesfromDB = await this.prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        ingredients: {
        include: {
          ingredient: true} } },
      take: 20,
    });
    
    const recipes = recipesfromDB.map(e => ({
      id: e.id, 
      title: e.title,
      authorId: e.authorId,
      ingredients: e.ingredients.map(e => ({
        id: e.ingredientId, 
        recipeId: e.recipeId, 
        name: e.ingredient.name, 
        unit: e.unit, 
        value: e.value})),
      instructions: e.instructions,
      updatedAt: e.updatedAt? e.updatedAt: e.createdAt,
    })
    )
    return recipes
  }

  async create(recipe: RecipeInputDto): Promise<GQLRecipe> {
    
  }

  async update(params: UpdatePost): Promise<Post> {
    
  }

  async delete(id: string): Promise<Pick <GQLRecipe ,'id'&'title'>> {
    const deletedRecipe = await this.prisma.recipe.delete({
      where: { id },
      select: {
        id: true,
        title: true,
      }
    })
    return deletedRecipe
  }

  _parse(recipeFromPrisma: RecipeDetailsPrisma): GQLRecipe {
    return {
      id: recipeFromPrisma.id, 
      title: recipeFromPrisma.title,
      authorId: recipeFromPrisma.authorId,
      ingredients: recipeFromPrisma.ingredients.map(e => ({
        id: e.ingredientId, 
        recipeId: e.recipeId, 
        name: e.ingredient.name, 
        unit: e.unit, 
        value: e.value})),
      instructions: recipeFromPrisma.instructions,
      updatedAt: recipeFromPrisma.updatedAt? 
                recipeFromPrisma.updatedAt: recipeFromPrisma.createdAt,
    }
  }
}
