import { Image } from '@prisma/client'

const s3FolderKey = 'testrecipe'

const mockImages: Image[] = [
  {
    id: 'testimg1',
    // publicId: `${s3FolderKey}0/0`,
    format: 'image/jpeg',
    stepIndex: 0,
    recipeId: 'testrecipe0',
  },
  {
    id: 'testimg2',
    // publicId: `${s3FolderKey}1/0`,
    format: 'image/jpeg',
    stepIndex: 0,
    recipeId: 'testrecipe1',
  },
  {
    id: 'testimg3',
    // publicId: `${s3FolderKey}2/0`,
    format: 'image/jpeg',
    stepIndex: 0,
    recipeId: 'testrecipe2',
  },
]

const mockImagesInRecipe = [
  {
    id: 'testimg1',
    recipeId: 'testrecipe0',
  },
  {
    id: 'testimg1',
    recipeId: 'testrecipe1',
  },
  {
    id: 'testimg1',
    recipeId: 'testrecipe2',
  },
]

export { mockImages, mockImagesInRecipe }
