import { s3 } from '../utils/s3.server'
import * as dotenv from 'dotenv'
import { readFile, readFileSync } from 'fs'
import sharp from 'sharp'
import path from 'path'
import cuid from 'cuid'
import {
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
dotenv.config()
const s3FolderKey = 'testrecipe'
const imgPaths = [
  './public/assets/img1.jpeg',
  './public/assets/img2.jpeg',
  './public/assets/img3.jpeg',
]

/** delete folder */
const deletFolder = async () => {
  try {
    const list = await s3.send(
      new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET_NAME }),
    )
    const objects = list.Contents?.map(object => ({ Key: object.Key }))
    try {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Delete: { Objects: objects },
        }),
      )
    } catch (err) {
      console.log(err)
    }

    console.log('Success. Object deleted', list)
  } catch (err) {
    console.log('Error', err)
  }
}

/** delete photos */
// const deletePhotos=async()=>{
//   try{
//     await s3.send(new DeleteObjectCommand({
//       Bucket:process.env.AWS_BUCKET_NAME,
//       Key:s3FolderKey+'/'
//     }))
//   }
// }

/** create recipes' folders */
const createFolders = async () => {
  try {
    const data = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3FolderKey + '/',
      }),
    )
    console.log('Success. Add folder', data)
  } catch (err) {
    console.log('Error', err, process.env.AWS_BUCHET_NAME)
  }
}

/** add photo to folder */
const uploadFiles = async () => {
  // const filename = path.basename(imgPath)
  /** upload multiple files at the same time */
  try {
    await Promise.all(
      imgPaths.map((img, index) => {
        const file = readFileSync(img)

        const uploadJpg = async () => {
          const buffer = await sharp(file)
            .resize(400, 300, { fit: 'cover' })
            .toFormat('jpeg')
            .toBuffer()
          return await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `${s3FolderKey}${index}/thumbnail-jpg`,
              Body: buffer,
              ContentType: 'image/jpdg',
            }),
          )
        }
        const uploadWebp = async () => {
          const buffer = await sharp(file)
            .resize(720, 540, { fit: 'cover' })
            .toFormat('webp')
            .toBuffer()
          return await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `${s3FolderKey}${index}/thumbnail-webp`,
              Body: buffer,
              ContentType: 'image/webp',
            }),
          )
        }
        return Promise.all([uploadJpg(), uploadWebp()])
      }),
    ).then(() => {
      console.log('Success. Add photos')
    })
  } catch (err) {
    console.log(err)
  }
}

;(async () => {
  await deletFolder()
  await uploadFiles()
})()
