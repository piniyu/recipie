import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useAppDispatch } from '~/store/configure-store'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import cuid from 'cuid'

export default function ImgUpload({
  name,
  defaultImgSrc,
  onClose,
}: {
  name: string
  defaultImgSrc: string
  onClose: () => void
}): JSX.Element {
  const { setValue, watch } = useFormContext()

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<AvatarEditor>(null)
  const imgDraftKey = useRef(cuid())

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
    <>
      {defaultImgSrc?.length > 0 ? (
        <div
          className="flex max-h-[60vh]  w-full items-center justify-center overflow-hidden rounded-t-xl bg-gray-500"
          ref={containerRef}
        >
          <Dropzone onDrop={dropped => {}} noClick noKeyboard>
            {/** TODO: on scroll to scale and mobile scale gestrue*/}
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <AvatarEditor
                  image={defaultImgSrc}
                  width={720}
                  height={540}
                  border={50}
                  color={[0, 0, 0, 0.6]}
                  scale={scale}
                  disableCanvasRotation
                  ref={editorRef}
                />
              </div>
            )}
          </Dropzone>
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
      <div className="mx-6 flex justify-between py-4">
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
              onConfirm()
            }}
          >
            Comfirm
          </button>
        </div>
      </div>
    </>
  )
}
