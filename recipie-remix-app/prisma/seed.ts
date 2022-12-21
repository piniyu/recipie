import { PrismaClient } from '@prisma/client'
import { testHelper } from '../test/test-helper'

// const db = new PrismaClient()

const prisma = new PrismaClient({ errorFormat: 'pretty' })

async function main() {
  console.log('Truncating databse...')
  await prisma.$queryRaw`TRUNCATE "User", "Recipe", "Basket", "Ingredient", "NumIngredientOnRecipe", "Favorite" CASCADE;`

  await testHelper.createUsers(prisma)
  await testHelper.createIngredients(prisma)
  await testHelper.createRecipes(prisma)
  await testHelper.createNumIngrediens(prisma)
  await testHelper.createBaskets(prisma)
}

main()
  .catch(err => {
    console.error('error', err)
    throw new Error()
  })
  .finally(async () => {
    console.log('Done, closing primsa')
    // scraper.dump()
    prisma.$disconnect()
    process.exit()
  })

// function getRecipes() {
//   return [
//     {
//       id: '1',
//       authorId: '123',
//       title: 'Korean noodles',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       difficulty: 'MODERATE3',
//       instructions: ['test instruct'],
//       likesNum: 1304,
//       serving: 2,
//       viewrs: 3029,
//     },
//   ]
// }

// const seed = async () => {
//   await Promise.all(
//     getRecipes().map(recipe => {
//       return db.recipe.create({ data: recipe })
//     }),
//   )
// }

// seed()
