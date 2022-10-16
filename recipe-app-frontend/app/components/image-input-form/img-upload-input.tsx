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
import { useResizeObserver } from './useResizeObserver'

// const modalPosition = { left: 0, top: 0 }
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

const Modal = ({ children }: { children: ReactNode }): JSX.Element => {
  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null && node.parentElement) {
      // modalPosition.left = node.offsetLeft
      // modalPosition.top = node.offsetTop
      // console.log(node.getBoundingClientRect().top)
    }
  }, [])
  return (
    <div className="fixed flex items-center justify-center left-0 top-0 right-0 bottom-0 bg-gray-600/50">
      <div
        className="overflow-hidden w-1/2 max-h-[75vh] rounded-lg bg-white"
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
}

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

  const stageContainerRef = useRef<HTMLDivElement>(null)
  const { current: stage } = stageContainerRef
  const labelRef = useRef<HTMLLabelElement>(null)
  const { current: label } = labelRef
  const imageRef = useRef<Konva.Image>(null)
  const { current: img } = imageRef
  const selectRectRef = useRef<Konva.Rect>(null)
  const { current: rect } = selectRectRef
  const trRef = useRef<Konva.Transformer>(null)
  const { current: tr } = trRef

  const [open, setOpen] = useState(true)
  const [image, imageStatus] = useImage(watchValue.src)
  const [width, height] = useResizeObserver(labelRef)

  const centeredImg = useCallback(
    (img: Konva.Image) => {
      const imgWidth = img.getWidth()
      const imgPositon = img.getPosition()
      img.setPosition({ x: width / 2 - imgWidth / 2, y: imgPositon.y })
    },
    [width],
  )

  const onDragMove = () => {
    if (!tr) {
      return
    }
    const boxes = tr.nodes().map(node => node.getClientRect())
    const box = (() => {
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      boxes.forEach(box => {
        minX = Math.min(minX, box.x)
        minY = Math.min(minY, box.y)
        maxX = Math.max(maxX, box.x + box.width)
        maxY = Math.max(maxY, box.y + box.height)
      })
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    })()
    tr.nodes().forEach(shape => {
      const absPos = shape.getAbsolutePosition()

      //where are shapes inside bounding box of all shapes?
      const offsetX = box.x - absPos.x
      const offsetY = box.y - absPos.y
      const newPos = { ...absPos }
      if (box.x < 0) {
        newPos.x = -offsetX
      }
      if (box.y < 0) {
        newPos.y = -offsetY
      }
      if (stage && box.x + box.width > stage.clientWidth) {
        newPos.x = stage.clientWidth - box.width - offsetX
      }
      if (stage && box.y + box.height > stage.clientHeight) {
        newPos.y = stage.clientHeight - box.height - offsetY
      }

      shape.setAbsolutePosition(newPos)
    })
  }

  //set Img size
  useEffect(() => {
    if (img) {
      const imgWidth = img.getWidth()
      const imgHeight = img.getHeight()
      const ratio = imgWidth / imgHeight
      img.setSize({ width: height * ratio, height: height })
      centeredImg(img)
    }
  }, [width, height, centeredImg, img])

  //set Rect size
  useEffect(() => {
    if (rect && img) {
      const rectPosition = rect.getPosition()
      const imgW = img.getWidth()
      const imgPositon = img.getPosition()
      // console.log(imgPositon)
      // console.log(rect.getAttrs())
      rect.setSize({ width: imgW, height: (imgW * 3) / 4 })
      rect.setPosition({ x: imgPositon.x, y: rectPosition.y })
    }
  }, [img, rect, width])

  //should set Transformer's node manually
  useEffect(() => {
    if (tr && rect) {
      tr.nodes([rect])
      tr.getLayer()?.batchDraw()
    }
  })

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
          console.log('onChange')
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
  }

  // useEffect(() => {
  //   const img = imageRef.current
  //   if (image) {
  //     image.addEventListener('load', () => {
  //       console.log(image.clientHeight)
  //     })
  //   }
  // }, [])
  return (
    <div className="h-full">
      <div
        className={` 
          flex items-center justify-center 
          overflow-hidden
          border rounded-lg 
          hover:border-gray-300 hover:bg-gray-50 
          w-full
          aspect-w-4 aspect-h-3
          `}
        onClick={e => {
          // e.preventDefault()
          setOpen(true)
        }}
      >
        {watchValue.src.length > 0 ? (
          <div
            className="w-full aspect-w-4 aspect-h-3 "
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move'
              // e.dataTransfer.setDragImage(new Image(), 0, 0)

              // console.log('drag')
            }}
            draggable
          >
            <img
              src={watchValue.src}
              alt={watchValue.name}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className=" p-4 text-gray-500 font-medium text-center">
              Click here to upload {text}
            </p>
          </div>
        )}
        {open && (
          <Modal>
            <label
              className="block w-full h-[60vh] max-h-[60vh] overflow-hidden"
              ref={labelRef}
            >
              {watchValue.src.length > 0 ? (
                <div
                  className="relative flex justify-center w-full h-full bg-gray-600"
                  ref={stageContainerRef}
                >
                  <Stage width={width} height={height}>
                    <Layer>
                      <Image
                        // fill="rgba(0,0,0,0.5)"
                        image={image}
                        ref={imageRef}
                        // globalCompositeOperation="multiply"
                      />
                      <Rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="rgba(0,0,0,0.5)"
                        globalCompositeOperation="multiply"
                      />
                      <Rect
                        // fill="trasparent"
                        fill="white"
                        strokeWidth={8}
                        globalCompositeOperation="overlay"
                        draggable
                        ref={selectRectRef}
                      />
                      <Transformer
                        ref={trRef}
                        rotationSnaps={[0, 45, 90, 135, 180, -45, -90, -135]}
                        rotationSnapTolerance={4}
                        onDragMove={onDragMove}
                      />
                    </Layer>
                  </Stage>
                  {/* <canvas ref={canvasRef} className=" object-contain"></canvas> */}

                  {/* <img
                    id="source"
                    src={watchValue.src}
                    alt={watchValue.name}
                    className=" object-scale-down  pointer-events-none "
                    onLoad={onImgLoad}
                  /> */}
                  {/* <div className="absolute top-0 w-full h-full bg-gray-500 mix-blend-multiply"></div>
                  <div
                    id="selection-container"
                    className={` absolute 
                      overflow-hidden aspect-w-4 aspect-h-3 w-full 
                   

                    `}
                  >
                    <div
                      className=" border-[6px] border-red-500 cursor-n-resize"
                      onMouseDown={e => {
                        console.log(e)
                      }}
                    >
                      <div
                        className="w-full h-full bg-white mix-blend-overlay cursor-grab"
                        // style={{ width: imgWidth + 'px' }}
                        onMouseMove={onMouseMove}
                        onMouseDown={e => {
                          const element = e.target as HTMLDivElement
                          const elementRect = element.getBoundingClientRect()
                          setIsDrag(true)
                          setMousePosition({
                            x: e.clientX - elementRect.x,
                            y: e.clientY - elementRect.y,
                          })
                        }}
                        onMouseUp={e => {
                          setIsDrag(false)
                        }}
                      >
                      </div>
                    </div>
                    
                  </div> */}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p className=" p-4 text-gray-500 font-medium text-center">
                    Click here to upload {text}
                  </p>
                </div>
              )}
              {/* <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={onSubmitFile}
              /> */}
              <input {...register(name, { required: true })} type="hidden" />
            </label>
            <div className="flex justify-end my-4 mx-4 space-x-4">
              <button className="btn-border btn-md">Cancel</button>
              <button className="btn-primary btn-md">Comfirm</button>
            </div>
          </Modal>
        )}
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
