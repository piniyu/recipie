import Konva from 'konva'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Image, Layer, Stage } from 'react-konva'
import useImage from 'use-image'

export type PageImgRef = { stage: Konva.Stage | null; img: Konva.Image | null }

const PageImg = forwardRef<
  PageImgRef,
  { src: string; container: HTMLElement | null }
>(({ src, container }, ref): JSX.Element | null => {
  const [image] = useImage(src)
  const stageRef = useRef<Konva.Stage>(null)
  const imgRef = useRef<Konva.Image>(null)

  useEffect(() => {
    const img = imgRef.current

    return () => {
      if (img) {
        const imgPos = img.getPosition()
        const imgScale = img.scale()
        const newImgScale = imgScale ? imgScale : { x: 1, y: 1 }
        const imgSize = img.getSize()
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    stage: stageRef.current,
    img: imgRef.current,
  }))

  if (!container) {
    return null
  }

  return (
    <>
      <Stage
        width={container.clientWidth}
        height={container.clientHeight}
        ref={stageRef}
      >
        <Layer>
          <Image image={image} ref={imgRef} />
        </Layer>
      </Stage>
    </>
  )
})

PageImg.displayName = 'PageImg'

export default PageImg
