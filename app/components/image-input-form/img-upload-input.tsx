import React, { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import type { ImgFormProp } from '../../routes/__toolbar/upload/details'
import Modal from '../layout/modal'
import ImgUpload from './img-upload'

export const getFileSize = (
  input: FileList | number,
): { text: string; isOverSize: boolean } => {
  let numberOfBytes = 0
  if (input instanceof FileList) {
    for (const file of input) {
      numberOfBytes += file.size
    }
  } else {
    numberOfBytes = input
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const exponent = Math.min(
    Math.floor(Math.log(numberOfBytes) / Math.log(1024)),
    units.length - 1,
  )
  const approx = numberOfBytes / 1024 ** exponent
  const output =
    exponent === 0
      ? numberOfBytes + ' bytes'
      : `${approx.toFixed(3)} ${units[exponent]} (${numberOfBytes} bytes)`
  return { text: output, isOverSize: false }
}

export default function ImgUploadInput({
  name,
  text,
  src,
}: {
  name: string
  text: string
  src: string | undefined
}): JSX.Element {
  const { watch, register } = useFormContext<any>()
  const watchValue = watch(name) as ImgFormProp

  const [open, setOpen] = useState(false)
  const [defaultImgSrc, setDefaultImgSrc] = useState('')

  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const onSubmitFile = async (e: React.ChangeEvent) => {
    const element = e.target as HTMLInputElement
    const files = element.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          setDefaultImgSrc(
            typeof reader.result === 'string' ? reader.result : '',
          )
        },
        false,
      )
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-full">
      <div
        className={` 
        aspect-w-4 aspect-h-3 
        items-center justify-center 
        overflow-hidden rounded-lg 
        border hover:border-gray-300 hover:bg-gray-50 dark:border-gray-500
        dark:hover:bg-gray-700
        `}
        ref={canvasContainerRef}
      >
        {src && src.length > 0 ? (
          <img src={src} />
        ) : (
          <div className="flex items-center justify-center">
            <p className=" p-4 text-center font-medium text-gray-500">
              Click here to upload {text}
            </p>
          </div>
        )}

        <label className="h-full w-full">
          <input
            {...register(name, {
              onChange: e => {
                if (e.target.files.length > 0) {
                  setOpen(true)
                  onSubmitFile(e)
                } else {
                  setOpen(false)
                }
              },
              required: 'require a thumbnail',
            })}
            className="h-full w-full opacity-0"
            type="file"
            accept="image/*"
            multiple={false}
          />
        </label>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          className={` h-fit max-h-[70vh] w-[50vw] flex-col rounded-xl bg-white dark:bg-dark-gray`}
          disableClickOutsideClose
        >
          <ImgUpload
            name={name}
            defaultImgSrc={defaultImgSrc}
            onClose={() => setOpen(false)}
          />
        </Modal>
      </div>
    </div>
  )
}
