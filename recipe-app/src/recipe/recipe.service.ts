import { Injectable } from '@nestjs/common';
import { Ingredient, NumIngredientOnRecipe, Recipe } from '@prisma/client';
import { truncate } from 'fs';
// import { Recipe } from '../graphql.schema';
import { PrismaService } from '../prisma/prisma.service';
import { RecipeInputDto } from './dto/create-recipe.dto';

export type GQLRecipe = {
  id: string,
  title: string,
  authorId: string,
  ingredients: GQLIngredient[],
  instructions: string[],
  updatedAt: Date,
}

export type GQLIngredient = {
  ingredientId: string,
  recipeId: string,
  name: string,
  unit: string,
  value: string,
}

export type RecipeDetailsPrisma = (Recipe & {
  ingredientsNum: (NumIngredientOnRecipe & {
      ingredient: Ingredient;
  })[];
})


@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<GQLRecipe> {
    const recipe = ( await this.prisma.recipe.findUnique({
      where: { id },
      include: { 
      ingredientsNum: {
          include: {
            ingredient: true} } },
    }));
    if (recipe === null) {
      throw new Error('Recipe not found');
    }
    return this._parse(recipe)
  }
  
  async getLatest(): Promise<GQLRecipe[] | null> {
    const recipesfromDB = await this.prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        ingredientsNum: {
        include: {
          ingredient: true} } },
      take: 20,
    });

    const recipes = recipesfromDB.map(e => {return this._parse(e)})
    return recipes
  }

  async create(recipe: RecipeInputDto): Promise<GQLRecipe> { 
    const createdRecipe = await this.prisma.recipe.create({
      data: {
        ...recipe,
        author: {
          connect: { email: '' }}
        },
      }
    )

    for ( let i of recipe.ingredients) {
      
      await this.prisma.ingredient.upsert({
        where: { name: i.name},
        create: {
          name: i.name,
          onRecipes: {
            create: { 
              recipe: {
                connect: { id: createdRecipe.id }
              },
              unit: i.unit,
              value: i.value }
          },
        },
        update: {
          onRecipes: {
            create: { 
              recipe: {
                connect: { id: createdRecipe.id }
              },
              unit: i.unit,
              value: i.value }
          },
        }
      })
    }
    const ingredientOnRecipe = await this.prisma.recipe.findUniqueOrThrow({
      where: { id: createdRecipe.id },
      include: { 
        ingredientsNum: {
            include: {
              ingredient: true} } },
    })
    return this._parse(ingredientOnRecipe)
  }

  async update(id: string, recipe: RecipeInputDto): Promise<GQLRecipe> {
    /* 
    case1: update the content of recipe, like title, instructions
    case2: update existing ingredients info
    case3: add new ingredients that are created in the ingredient list
    case4: add new ingredients that are in the ingredient list
    */
    for ( let n of recipe.ingredients) {
      if ( n.recipeId && n.ingredientId ) {
        await this.prisma.numIngredientOnRecipe.update({
          where: { 
            recipeId_ingredientId: { 
              recipeId: n.recipeId, ingredientId: n.ingredientId},
          },
          data: {
                unit: n.unit,
                value: n.value },
        })
      }
      
      else {
        await this.prisma.ingredient.upsert({
          where: { name: n.name},
          create: {
            name: n.name,
            onRecipes: {
              create: { 
                recipe: {
                  connect: { id }
                },
                unit: n.unit,
                value: n.value }
            },
          },
          update: {
            onRecipes: {
              create: { 
                recipe: {
                  connect: { id }
                },
                unit: n.unit,
                value: n.value }
            },
          }
        })
      }  
      
    }
    const updatedRecipe = await this.prisma.recipe.update({
      where: { id },
      data: {
        ...recipe,
      },
      include: {
        ingredientsNum: {
          include: {
            ingredient: true} }
     },
    })
    return this._parse(updatedRecipe)
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
      ingredients: recipeFromPrisma.ingredientsNum.map(e => ({
        ingredientId: e.ingredientId, 
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
