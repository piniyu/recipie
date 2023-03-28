import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import cuid from 'cuid'
import useResizeObserver from 'use-resize-observer'

export default function ImgUpload({
  name,
  defaultImgSrc,
  onClose,
}: {
  name: string
  defaultImgSrc: string
  onClose: () => void
}): JSX.Element {
  const { setValue } = useFormContext()

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<AvatarEditor>(null)
  const imgDraftKey = useRef(cuid())
  const { width, ref } = useResizeObserver<HTMLDivElement>()

  const [scale, setScale] = useState(1)

  const onWheel = (e: WheelEvent) => {
    setScale(prev => Math.max(prev + e.deltaY / 80, 1))
  }

  const throttledOnWheel = useCallback(
    _.throttle(onWheel, 40, { trailing: false }),
    [],
  )

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.addEventListener('wheel', throttledOnWheel)
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', throttledOnWheel)
      }
    }
  }, [])

  const onConfirm = async () => {
    const editor = editorRef.current
    if (editor) {
      const url = editor.getImageScaledToCanvas().toDataURL('image/jpeg')
      const obj = {
        name: imgDraftKey.current,
        src: url,
        type: 'image/jpeg',
      }
      setValue(name, obj)
    }
    onClose()
  }

  return (
    <div ref={ref}>
      {defaultImgSrc?.length > 0 ? (
        <div
          className="flex min-w-0 items-center justify-center overflow-hidden rounded-t-xl bg-gray-500"
          ref={containerRef}
        >
          {/* <Dropzone onDrop={dropped => {}} noClick noKeyboard> */}
          {/** TODO: on scroll to scale and mobile scale gestrue*/}
          {/* {({ getRootProps, getInputProps }) => ( */}
          <AvatarEditor
            image={defaultImgSrc}
            width={width ? (width > 720 ? 720 : width) : 0}
            height={width ? (width > 720 ? (720 / 4) * 3 : (width / 4) * 3) : 0}
            border={0}
            color={[0, 0, 0, 0.6]}
            scale={scale}
            disableCanvasRotation
            ref={editorRef}
          />
          {/* )} */}
          {/* </Dropzone> */}
        </div>
      ) : (
        <div
          className="flex h-full w-full justify-center overflow-hidden rounded-t-xl bg-gray-600"
          ref={containerRef}
        >
          <div className="flex items-center justify-center">
            <p className=" p-4 text-center font-medium text-gray-500">
              No file yet!
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-end gap-4 px-6 py-4">
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
            onConfirm()
          }}
        >
          Comfirm
        </button>
      </div>
    </div>
  )
}
