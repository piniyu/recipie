import React, { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useAppDispatch } from '~/store/configure-store'
import { updateDetails } from '~/store/upload-temp/details-form-slice'
import { useResizeObserver } from './use-resize-observer'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { getFileSize } from './img-upload-input'
import { useActionData, useFetcher, useSubmit } from '@remix-run/react'
import { s3 } from '~/utils/s3.server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
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
  const { register, setValue, setError, watch } = useFormContext()
  const dispatch = useAppDispatch()

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<AvatarEditor>(null)
  const imgDraftKey = useRef(cuid())

  const [scale, setScale] = useState(1)

  const watchValue = watch(name)

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
      // editor.getImageScaledToCanvas().toBlob(blob => {
      //   if (!blob) throw new Error('no Blob')
      //   const file = new File([blob], imgDraftKey.current, {
      //     type: 'image/jpeg',
      //   })
      //   const formData = new FormData()
      //   formData.append('img', file)
      //   // fetcher.submit(formData, {
      //     //   method: 'post',
      //     //   action: `/action/upload-img`,
      //     //   encType: 'multipart/form-data',
      //     // })
      //   }, 'image/jpeg')
      const url = editor.getImageScaledToCanvas().toDataURL('image/jpeg')
      // const res = await fetch(url)
      // const file = new File([await res.blob()], imgDraftKey.current, {
      //   type: 'image/jpeg',
      // })
      // console.log(res)
      const obj = {
        name: imgDraftKey.current,
        src: url,
        type: 'image/jpeg',
      }
      setValue(name, obj)
      // dispatch(updateDetails({ thumbnail: obj }))
    }
    onClose()
  }

  // useEffect(() => {
  //   if (fetcher.data) {
  //     const obj = {
  //       name: imgDraftKey.current,
  //       src: fetcher.data,
  //       type: 'image/jpeg',
  //       size: '',
  //     }
  //     setValue(name, obj)
  //     dispatch(updateDetails({ thumbnail: obj }))
  //     onClose()

  //   }
  // }, [fetcher.data])

  return (
    <>
      {/* <div className=" h-full"> */}
      {defaultImgSrc?.length > 0 ? (
        <div
          className="flex max-h-[60vh]  w-full items-center justify-center overflow-hidden rounded-t-xl bg-gray-500"
          ref={containerRef}
        >
          <Dropzone
            onDrop={dropped => {
              // console.log(dropped)
            }}
            noClick
            noKeyboard
          >
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
