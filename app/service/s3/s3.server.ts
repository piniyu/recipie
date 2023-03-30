import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({ region: process.env.AWS_REGION })

const getImageKeysByUser = async (recipeId: string) => {
  const command = new ListObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: recipeId,
  })
  const { Contents = [] } = await s3.send(command)
  return Contents.map(image => image.Key)
}

const getRecipePresignedUrls = async (recipeId: string) => {
  try {
    const imageKeys = await getImageKeysByUser(recipeId)

    const preSignedUrls = await Promise.all(
      imageKeys.map(key => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        })
        return getSignedUrl(s3, command, { expiresIn: 604800 })
      }),
    )

    return { preSignedUrls }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

const getThumbnailPresignedUrl = async (
  s3Key: string,
  recipeId: string,
  type: 'webp' | 'jpg',
): Promise<{
  preSignedUrl?: string
  recipeId?: string
  error?: undefined | unknown
  type?: 'webp' | 'jpg'
  etag: string | null
}> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: s3Key,
      ResponseCacheControl: 'public, max-age=604800, immutable',
    })
    const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 604800 })
    const response = await fetch(preSignedUrl)
    const etag = response.headers.get('etag')

    return {
      preSignedUrl,
      recipeId,
      type,
      etag,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

export { s3, getRecipePresignedUrls, getThumbnailPresignedUrl }
