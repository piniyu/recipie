import type Konva from 'konva'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Layer, Rect, Stage, Image, Transformer } from 'react-konva'
import useImage from 'use-image'
import ImgCanvas from './img-canvas'
import Modal from './modal'
import { PageImgRef } from './page-img'
import { useResizeObserver } from './use-resize-observer'

const getFileSize = (
  files: FileList,
): { text: string; isOverSize: boolean } => {
  let numberOfBytes = 0
  for (const file of files) {
    numberOfBytes += file.size
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

export default function ImgUpload({
  name,
  src,
  onClose,
  pageImgRef,
}: {
  name: string
  src: string
  onClose: () => void
  pageImgRef: PageImgRef | null
}): JSX.Element {
  const { register, setValue, setError } = useFormContext()

  const containerRef = useRef<HTMLDivElement>(null)
  const imgCanvasRef = useRef<{ onConfirm: () => void }>(null)

  const [width, height] = useResizeObserver(containerRef)

  const [isNewImg, setIsNewImg] = useState(false)

  const onSubmitFile = async (e: React.ChangeEvent) => {
    // setValue(name,)
    const element = e.target as HTMLInputElement
    const files = element.files
    if (files) {
      const size = getFileSize(files)
      if (size.isOverSize) {
        setError(name, {
          type: 'overSize',
          message:
            'The size of file is over the limit. Your file size should be under 2MB!',
        })
        return
      }
      const file = files[0]
      // const url = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          // console.log('onChange')
          setValue(name, {
            name: file.name,
            type: file.type,
            src: reader.result,
            size: size.text,
          })
        },
        false,
      )
      reader.readAsDataURL(file)
    }
    setIsNewImg(true)
  }
  return (
    <>
      <div
        className="flex justify-center w-full h-fit max-h-[60vh] overflow-hidden bg-gray-600"
        ref={containerRef}
      >
        {src.length > 0 ? (
          <ImgCanvas
            {...{
              src,
              width,
              height,
              container: containerRef.current,
              pageImgRef,
              ref: imgCanvasRef,
              isNewImg,
              setIsNewImg,
            }}
          />
        ) : (
          <div className="flex items-center justify-center">
            <p className=" p-4 text-gray-500 font-medium text-center">
              No file yet!
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between my-4 mx-6">
        <label className="btn-border btn-sm cursor-pointer">
          Choose File
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={onSubmitFile}
          />
          <input {...register(name, { required: true })} type="hidden" />
        </label>
        <div className="flex space-x-4">
          <button
            className="btn-ghost btn-md"
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
          >
            Cancel
          </button>
          <button
            className="btn-primary btn-md"
            onClick={e => {
              e.stopPropagation()
              imgCanvasRef.current?.onConfirm()
              onClose()
            }}
          >
            Comfirm
          </button>
        </div>
      </div>
    </>
  )
}
