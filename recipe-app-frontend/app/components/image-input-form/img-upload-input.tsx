import Konva from 'konva'
import { ImageConfig } from 'konva/lib/shapes/Image'
import React, {
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useFormContext } from 'react-hook-form'
// import { Layer, Rect, Stage } from 'react-konva'

import { KonvaNodeComponent, Transformer } from 'react-konva'
import { Image, Layer, Rect, Stage } from 'react-konva'
import useImage from 'use-image'
import type { DetailsFormProps, ImgFormProp } from '../../routes/upload/details'
import ImgUpload from './img-upload'
import Modal from './modal'
import PageImg, { PageImgRef } from './page-img'
import { useResizeObserver } from './use-resize-observer'

export default function ImgUploadInput({
  name,
  text,
}: {
  name: string
  text: string
}): JSX.Element {
  const {
    register,
    setValue,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<any>()
  const watchValue = watch(name) as ImgFormProp

  const [open, setOpen] = useState(false)

  const pageImgRef = useRef<PageImgRef>(null)
  const pageStageRef = useRef<Konva.Stage>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const [width, height] = useResizeObserver(canvasContainerRef)

  return (
    <div className="h-full">
      <div
        className={` 
          items-center justify-center 
          border rounded-lg 
          hover:border-gray-300 hover:bg-gray-50 
          aspect-w-4 aspect-h-3
          overflow-hidden
          `}
        onClick={e => {
          // e.preventDefault()
          setOpen(true)
        }}
        ref={canvasContainerRef}
      >
        {watchValue.src.length > 0 ? (
          // <div className="w-full h-full">
          <PageImg
            src={watchValue.src}
            container={canvasContainerRef.current}
            ref={pageImgRef}
          />
        ) : (
          <div className="flex items-center justify-center">
            <p className=" p-4 text-gray-500 font-medium text-center">
              Click here to upload {text}
            </p>
          </div>
        )}

        <Modal open={open}>
          <ImgUpload
            name={name}
            src={watchValue.src}
            onClose={() => setOpen(false)}
            pageImgRef={pageImgRef.current}
          />
        </Modal>
      </div>
      <label>Size:</label>
      <output id="fileSize">{watchValue.size}</output>
      {/* <p>{errors}</p> */}
      {errors && (
        <p className="text-red-500 font-medium">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}
