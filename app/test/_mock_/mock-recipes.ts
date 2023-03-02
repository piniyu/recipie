import type { Recipe } from '@prisma/client'
import { mockRecipesInBaskets } from './mock-baskets'

export const mockRecipes: Recipe[] = [
  {
    id: 'testrecipe0',
    authorId: 'testuser0',
    title: 'Korean Noodle',
    difficulty: 'MODERATE3',
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
    title: 'chocolate cake with ice cream',
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
    title: 'seafood pizza',
    difficulty: 'EASY2',
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
