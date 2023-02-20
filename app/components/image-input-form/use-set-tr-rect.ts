import Konva from 'konva'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import {
  ImgCanvasRectsState,
  updateImgCanvasRect,
} from '~/store/upload-temp/img-canvas-rects-slice'
import { computeImgSize, setRectSizePos } from './img-canvas'
import { v4 as uuidv4 } from 'uuid'

export default function UseSetTrRect({
  rect,
  computeImgSizeProps,
  stage,
  tr,
  img,
  isNewImg,
  setIsNewImg,
}: {
  rect: Konva.Rect | null
  computeImgSizeProps: ReturnType<typeof computeImgSize>
  stage: Konva.Stage | null | undefined
  tr: Konva.Transformer | null
  img: HTMLImageElement | undefined
  isNewImg: boolean
  setIsNewImg: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const local = useAppSelector(state => state.imgCanvasRects)
  const dispatch = useAppDispatch()
  // const local =rects.find($rect=>$rect.id===rectId)
  const [defaultScale, setDefaultScale] = useState(1)
  const [diffPct, setDiffPct] = useState(1)

  useEffect(() => {
    if (!isNewImg || !stage || !local || !rect) return
    //when is not new img && has local
    // if (local && rect) {
    //   setRectSizePos(rect, {
    //     x: local.x,
    //     y: local.y,
    //     scale: {
    //       x: local.scale.x,
    //       y: local.scale.y,
    //     },
    //     width: local.width,
    //     height: local.height,
    //   })
    // }

    //when is new img || !local, set to default rect
    // else if (!local && stage && rect) {
    // const imgInfo = computeImgSize(image, container, pageImgRef.stage)

    // dispatch(updateImgCanvasRect({
    //   x:0,
    //   y:0,
    //   scale:{
    //     x.
    //   }
    // }))
    if (!computeImgSizeProps) return
    const { rectDefaultScale, diffPct } = computeImgSizeProps

    console.log(stage?.width())
    setDefaultScale(rectDefaultScale)
    setDiffPct(diffPct)
    const sizePosObj: ImgCanvasRectsState = {
      x: 0,
      y: 0,
      scale: {
        x: rectDefaultScale,
        y: rectDefaultScale,
      },
      width: stage.width() * diffPct,
      height: stage.height() * diffPct,
      diffPct: diffPct,
      rectDefaultScale: rectDefaultScale,
    }
    console.log('img change set rect:', sizePosObj, stage.width())
    // setRectSizePos(rect, sizePosObj)
    dispatch(updateImgCanvasRect(sizePosObj))
    setIsNewImg(false)
    // setLocalValue(sizePosObj)

    // reset to false
    // if (isNewImg) {
    //   setIsNewImg(false)
    // }

    //remove old local value
    // }

    //should set Transformer's node manually
  }, [isNewImg])

  return { defaultScale, diffPct }
}
