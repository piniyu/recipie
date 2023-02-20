import type { Recipe } from '@prisma/client'
import { mockRecipesInBaskets } from './mock-baskets'

export const mockRecipes: Recipe[] = [
  {
    id: 'testrecipe0',
    authorId: 'testuser0',
    title: 'testrecipe 0',
    difficulty: 'MODERATE3',
    // tags:['tag1'],
    // instructions: ['test instruct'],
    createdAt: new Date(),
    updatedAt: new Date(),
    likesNum: 0,
    basketsNum: mockRecipesInBaskets.filter(e =>
      e.recipes.find(el => el.id === 'testrecipe0'),
    ).length,
    serving: 1,
    viewrs: 0,
  },
  {
    id: 'testrecipe1',
    authorId: 'testuser1',
    title: 'testrecipe 1',
    difficulty: 'MODERATE3',
    // tags:['teg2'],
    createdAt: new Date(),
    updatedAt: new Date(),
    likesNum: 0,
    basketsNum: mockRecipesInBaskets.filter(e =>
      e.recipes.find(el => el.id === 'testrecipe1'),
    ).length,
    serving: 1,
    viewrs: 0,
  },
  {
    id: 'testrecipe2',
    authorId: 'testuser2',
    title: 'testrecipe 2',
    difficulty: 'MODERATE3',
    // tags:['teg3'],
    createdAt: new Date(),
    updatedAt: new Date(),
    likesNum: 0,
    basketsNum: mockRecipesInBaskets.filter(e =>
      e.recipes.find(el => el.id === 'testrecipe2'),
    ).length,
    serving: 1,
    viewrs: 0,
  },
]
