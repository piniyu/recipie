import { Thumbnail } from '@prisma/client'

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

export { mockThumbnails }
