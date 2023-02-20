import { Prisma, prisma, PrismaClient } from '@prisma/client'
import { mockBaskets, mockRecipesInBaskets } from './_mock_/mock-baskets'
import { mockThumbnails } from './_mock_/mock-thumbnails'
import { mockIngreds } from './_mock_/mock-ingredients'
import { mockNumIngreds } from './_mock_/mock-numIngredients'
import { mockRecipes } from './_mock_/mock-recipes'
import { mockBotUser, mockUsers } from './_mock_/mock-user'
import { mockTags } from './_mock_/mock-tags'
import { mockRecipeTags } from './_mock_/mock-recipe-tags'
import { mockInstructions } from './_mock_/mock-instrctions'
class TestHelper {
  async createUsers(prisma: PrismaClient) {
    await prisma.user.create({ data: mockBotUser })
    return await prisma.$transaction(
      mockUsers.map(e => prisma.user.create({ data: e })),
    )
  }

  async createIngredients(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockIngreds.map(e => prisma.ingredient.create({ data: e })),
    )
  }

  async createTags(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockTags.map(e => prisma.tag.create({ data: e })),
    )
  }

  async createRecipes(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockRecipes.map(e => prisma.recipe.create({ data: e })),
    )
  }

  async createThumbnail(prisma: PrismaClient) {
    await prisma.$transaction(
      mockThumbnails.map(e => prisma.thumbnail.create({ data: e })),
    )

    return await prisma.$transaction(
      mockThumbnails.map(e =>
        prisma.thumbnail.update({
          where: { id: e.id },
          data: {
            recipe: { connect: { id: e.recipeId } },
          },
        }),
      ),
    )
  }

  async createInstruction(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockInstructions.map(e => prisma.instruction.create({ data: e })),
    )
  }

  async createNumIngrediens(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockNumIngreds.map(e => prisma.numIngredientOnRecipe.create({ data: e })),
    )
  }

  async createRecipeTags(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockRecipeTags.map(e => prisma.recipeTags.create({ data: e })),
    )
  }

  async createBaskets(prisma: PrismaClient) {
    await prisma.$transaction(
      mockBaskets.map(e => prisma.basket.create({ data: e })),
    )
    return await prisma.$transaction(
      mockRecipesInBaskets.map(e =>
        prisma.basket.update({
          where: { id: e.id },
          data: {
            recipes: { connect: e.recipes },
          },
        }),
      ),
    )
  }
}
export const testHelper = new TestHelper()
