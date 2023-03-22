import { GetObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { writeAsyncIterableToWritable } from '@remix-run/node'
import {
  ActionFunction,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  UploadHandler,
} from '@remix-run/server-runtime'
import { PassThrough } from 'stream'
import { s3 } from './s3/s3.server'

const uploadStream = ({ Key }: Pick<PutObjectCommandInput, 'Key'>) => {
  const pass = new PassThrough()
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Body: pass,
      ContentType: 'image/jpeg',
    },
  })
  return {
    writeStream: pass,
    promise: upload,
  }
}

async function uploadStreamToS3(data: any, filename: string) {
  const stream = uploadStream({
    Key: filename,
  })
  await writeAsyncIterableToWritable(data, stream.writeStream)
  await stream.promise.done()
  /**TODO:save file name to db */
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  })

  return await getSignedUrl(s3, command)
}

const s3UploadHandler: UploadHandler = async ({ filename, data }) => {
  const uploadedFileLocation = await uploadStreamToS3(data, filename!)
  return uploadedFileLocation
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const fileUploadHandler: UploadHandler = unstable_composeUploadHandlers(
      s3UploadHandler,
      unstable_createMemoryUploadHandler(),
    )
    const form = await unstable_parseMultipartFormData(
      request,
      fileUploadHandler,
    )

    return form.get('img')
  } catch (err) {
    console.log(err)
    return null
  }
}
