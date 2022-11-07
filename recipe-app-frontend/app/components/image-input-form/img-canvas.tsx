import type Konva from 'konva'
import type { Box } from 'konva/lib/shapes/Transformer'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Layer, Image, Rect, Transformer, Stage } from 'react-konva'
import useImage from 'use-image'
import type { PageImgRef } from './page-img'

type LocalRectAttrsType = {
  x: number
  y: number
  scale: { x: number; y: number }
  width: number
  height: number
  diffPct: number
  rectDefaultScale: number
}

const LOCAL_RECT_KEY = 'rectAttrs'

const setRectSizePos = (
  rect: Konva.Rect,
  sizePosObj: {
    x: number
    y: number
    scale: { x: number; y: number }
    width: number
    height: number
  },
) => {
  const { x, y, scale, width, height } = sizePosObj
  rect.setPosition({ x, y })
  rect.scale({ x: scale.x, y: scale.y })
  rect.setSize({ width, height })
}

const checkImgSize = (
  image: HTMLImageElement,
  container: HTMLElement,
  pageStage: Konva.Stage,
) => {
  let info: {
    direction: 'wider' | 'higher'
    diffPct: number
    rectDefaultScale: number
  } = { direction: 'wider', diffPct: 1, rectDefaultScale: 1 }
  let minDiff = 1

  if (image.width > container.clientWidth) {
    minDiff = Math.min(minDiff, container.clientWidth / image.width)
  } else if (image.width < pageStage.width()) {
    info.rectDefaultScale = image.width / pageStage.width()
  }

  if (image.height > window.innerHeight * 0.6) {
    minDiff = Math.min(minDiff, (window.innerHeight * 0.6) / image.height)
  } else if (image.height < pageStage.height()) {
    info.rectDefaultScale = image.height / pageStage.height()
  }

  info.diffPct = minDiff

  return info
}

const setImgSize = (
  image: HTMLImageElement,
  konvaImg: Konva.Image,

  container: HTMLElement,
) => {
  const ratio = image.width / image.height
  let minWidth = Infinity

  minWidth = Math.min(
    minWidth,
    container.clientWidth,
    image.width,
    window.innerHeight * 0.6 * ratio,
  )

  konvaImg.setSize({ width: minWidth, height: minWidth / ratio })
}

const ImgCanvas = forwardRef<
  { onConfirm: () => void },
  {
    src: string
    width: number
    height: number
    container: HTMLElement | null
    pageImgRef: PageImgRef | null
    isNewImg: boolean
    setIsNewImg: React.Dispatch<React.SetStateAction<boolean>>
  }
>(
  (
    { src, width, height, container, pageImgRef, isNewImg, setIsNewImg },
    ref,
  ): JSX.Element => {
    const stageRef = useRef<Konva.Stage>(null)
    const rectRef = useRef<Konva.Rect>(null)
    const trRef = useRef<Konva.Transformer>(null)
    const [image] = useImage(src)
    const imageRef = useRef<Konva.Image>(null)

    const [localValue, setLocalValue] = useState<LocalRectAttrsType | null>(
      null,
    )

    const setTrAttr = (
      image: HTMLImageElement,
      rect: Konva.Rect,
      container: HTMLElement,
      pageStage: Konva.Stage,
    ) => {
      if (rect && image && container && pageStage) {
        const rectPos = rect.getPosition()
        const rectScale = rect.getAbsoluteScale()
        const imgInfo = checkImgSize(image, container, pageStage)

        const localObj: LocalRectAttrsType = {
          x: rectPos.x,
          y: rectPos.y,
          scale: rectScale,

          width: rect.width(),
          height: rect.height(),
          diffPct: imgInfo.diffPct,
          rectDefaultScale: imgInfo.rectDefaultScale,
        }

        setLocalValue(localObj)
      }
    }

    const getTotalBox = (
      boxes: { x: number; y: number; width: number; height: number }[],
    ) => {
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
    }

    const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
      const rect = rectRef.current
      if (image && rect && container && pageImgRef?.stage) {
        setTrAttr(image, rect, container, pageImgRef.stage)
      }
    }

    const boundBoxFunc = (oldBox: Box, newBox: Box) => {
      if (!stageRef.current) {
        return oldBox
      }
      const isOut =
        newBox.x < 0 ||
        newBox.y < 0 ||
        newBox.x + newBox.width > stageRef.current.width() ||
        newBox.y + newBox.height > stageRef.current.height()

      // when out of stage return old Box
      if (isOut) {
        return oldBox
      }
      return newBox
    }

    const onDragMove = () => {
      const tr = trRef.current
      const stage = stageRef.current
      if (!tr || !stage) {
        return
      }
      const boxes = tr.nodes().map(node => node.getClientRect())
      const box = getTotalBox(boxes)
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
        if (box.x + box.width > stage.width()) {
          newPos.x = stage.width() - box.width - offsetX
        }
        if (box.y + box.height > stage.height()) {
          newPos.y = stage.height() - box.height - offsetY
        }

        shape.setAbsolutePosition(newPos)
      })
    }

    const onDragEnd = () => {
      if (image && rectRef.current && container && pageImgRef?.stage) {
        setTrAttr(image, rectRef.current, container, pageImgRef.stage)
      }
    }

    //when Modal close, set new attr of img in page
    const onConfirm = () => {
      if (pageImgRef?.img && localValue) {
        pageImgRef.img.setPosition({
          x:
            localValue.x === 0
              ? 0
              : -(localValue.x / localValue.diffPct / localValue.scale.x),
          y:
            localValue.y === 0
              ? 0
              : -(localValue.y / localValue.diffPct / localValue.scale.y),
        })
        pageImgRef.img.scale({
          x: 1 / Math.abs(localValue.scale.x),
          y: 1 / Math.abs(localValue.scale.y),
        })
        console.log('change page img and save to localStorage', pageImgRef.img)

        localStorage.setItem(LOCAL_RECT_KEY, JSON.stringify(localValue))
      }
    }

    useImperativeHandle(ref, () => ({
      onConfirm: onConfirm,
    }))

    useEffect(() => {
      if (image && imageRef.current && container) {
        setImgSize(image, imageRef.current, container)
        console.log('set img size')
      }
    }, [container, image, width, height])

    //set Stage size
    useEffect(() => {
      const img = imageRef.current
      const stage = stageRef.current
      if (img && stage) {
        stage.setSize(img.getSize())
      }
      console.log('set image size and stage size')
    }, [width, height, image])

    useEffect(() => {
      const rect = rectRef.current
      const local = localStorage.getItem(LOCAL_RECT_KEY)

      //when is not new img && has local
      if (!isNewImg && local && rect) {
        const parsed: LocalRectAttrsType = JSON.parse(local)
        setLocalValue(parsed)
        // console.log('get local value')
        // console.log('found localvalue set rect', parsed)

        setRectSizePos(rect, {
          x: parsed.x,
          y: parsed.y,
          scale: {
            x: parsed.scale.x,
            y: parsed.scale.y,
          },
          width: parsed.width,
          height: parsed.height,
        })
      }

      //when is new img || !local, set to default rect
      if (
        (isNewImg || !local) &&
        rect &&
        pageImgRef?.stage &&
        container &&
        image
      ) {
        const imgInfo = checkImgSize(image, container, pageImgRef.stage)

        const sizePosObj: LocalRectAttrsType = {
          x: 0,
          y: 0,
          scale: {
            x: imgInfo.rectDefaultScale,
            y: imgInfo.rectDefaultScale,
          },
          width: pageImgRef.stage.width() * imgInfo.diffPct,
          height: pageImgRef.stage.height() * imgInfo.diffPct,
          diffPct: imgInfo.diffPct,
          rectDefaultScale: imgInfo.rectDefaultScale,
        }
        console.log('not found lovalvalue set rect:', sizePosObj)
        setRectSizePos(rect, sizePosObj)
        setLocalValue(sizePosObj)

        // reset to false
        if (isNewImg) {
          setIsNewImg(false)
        }

        //remove old local value
        if (local) {
          localStorage.removeItem(LOCAL_RECT_KEY)
        }
      }

      //should set Transformer's node manually
      const tr = trRef.current
      if (tr && rect) {
        tr.nodes([rect])
        tr.getLayer()?.batchDraw()
      }
    }, [container, image, pageImgRef?.stage, isNewImg, setIsNewImg])
    // useEffect(() => {
    //   const rect = rectRef.current
    //   if (localValue && pageImgRef?.stage && image && rect && container) {
    //     const info = checkImgSize(image, container, pageImgRef.stage)
    //     setRectSizePos(rect, {
    //       x: rect.x(),
    //       y: rect.y(),
    //       scale: { x: info.rectDefaultScale, y: info.rectDefaultScale },
    //       width: pageImgRef.stage.width() * info.diffPct,
    //       height: pageImgRef.stage.height() * info.diffPct,
    //     })
    //   }
    // }, [width, height, localValue, pageImgRef?.stage, image, container])
    if (!container) {
      return <div>NO 'container' found!</div>
    }

    return (
      <Stage width={width} height={height} ref={stageRef}>
        <Layer>
          <Image image={image} ref={imageRef} />
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="rgba(0,0,0,0.5)"
            globalCompositeOperation="multiply"
          />
          <Rect
            x={0}
            y={0}
            fill="white"
            globalCompositeOperation="overlay"
            draggable
            ref={rectRef}
            onDragMove={onDragMove}
            onDragEnd={onDragEnd}
          />
          <Transformer
            onTransformEnd={onTransformEnd}
            boundBoxFunc={boundBoxFunc}
            ref={trRef}
            rotateEnabled={false}
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
          />
        </Layer>
      </Stage>
    )
  },
)

ImgCanvas.displayName = 'ImgCanvas'

export default ImgCanvas
