import { Thumbnail } from '@prisma/client'

const s3FolderKey = 'testrecipe'

const mockThumbnails: Thumbnail[] = [
  {
    id: 'testthumbnail0',
    recipeId: 'testrecipe0',
    s3Key: 'testrecipe0/thumbnail-jpg',
  },
  {
    id: 'testthumbnail1',
    recipeId: 'testrecipe1',
    s3Key: 'testrecipe1/thumbnail-jpg',
  },
  {
    id: 'testthumbnail2',
    recipeId: 'testrecipe2',
    s3Key: 'testrecipe2/thumbnail-jpg',
  },
]

// const mockImagesInRecipe = [
//   {
//     id: 'testimg1',
//     recipeId: 'testrecipe0',
//   },
//   {
//     id: 'testimg1',
//     recipeId: 'testrecipe1',
//   },
//   {
//     id: 'testimg1',
//     recipeId: 'testrecipe2',
//   },
// ]

export { mockThumbnails }
