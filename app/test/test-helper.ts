import type { PrismaClient } from '@prisma/client'
import { mockBaskets, mockRecipesInBaskets } from './_mock_/mock-baskets'
import { mockIngreds } from './_mock_/mock-ingredients'
import { mockNumIngreds } from './_mock_/mock-numIngredients'
import { mockRecipes } from './_mock_/mock-recipes'
import { mockBotUser, mockUsers } from './_mock_/mock-user'
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

  async createRecipes(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockRecipes.map(e => prisma.recipe.create({ data: e })),
    )
  }

  async createNumIngrediens(prisma: PrismaClient) {
    return await prisma.$transaction(
      mockNumIngreds.map(e => prisma.numIngredientOnRecipe.create({ data: e })),
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
