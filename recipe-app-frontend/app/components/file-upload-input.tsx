import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ImgFormProp } from '~/routes/upload/details'

const getFileSize = (files: FileList): string => {
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
  return output
}

export default function FileUploadInput({
  name,
  text,
}: {
  name: string
  text: string
}): JSX.Element {
  const { register, setValue, watch, getValues } = useFormContext()
  // const [img, setImg] = useState({ src: '', name: '' })
  const watchValue = watch(name) as ImgFormProp
  // console.log(watchValue)
  const onSubmitFile = async (e: React.ChangeEvent) => {
    // setValue(name,)
    const element = e.target as HTMLInputElement
    const files = element.files
    if (files) {
      const size = getFileSize(files)
      const file = files[0]
      const url = URL.createObjectURL(file)
      const reader = new FileReader()
      reader.addEventListener('load', () => {}, false)
      console.log(reader.readAsDataURL(file))
      // console.log(URL.createObjectURL(files[0]))
      // const img=document.createElement('img')
      setValue(name, { name: file.name, type: file.type, src: url, size: size })
      // const outputElement = document.getElementById(
      //   'fileSize',
      // ) as HTMLOutputElement
      // outputElement.textContent = size
      // setImg({ src: url, name: file.name })
    }
  }
  // useEffect(() => {
  //   setImg(getValues(name))
  //   console.log(getValues(name))
  // }, [getValues, name])
  return (
    <div className="h-full">
      <label
        className={` 
          flex items-center justify-center 
          overflow-hidden
          border rounded-lg 
          cursor-pointer 
          hover:border-gray-300 hover:bg-gray-50 
          w-full
          aspect-w-4 aspect-h-3
          `}
      >
        {watchValue.src.length > 0 ? (
          <div
            className="w-full aspect-w-4 aspect-h-3 "
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move'
              e.dataTransfer.setDragImage(new Image(), 0, 0)

              console.log('drag')
            }}
            draggable
          >
            <img
              src={watchValue.src}
              alt={watchValue.name}
              className="w-full h-full object-cover object-center pointer-events-none"
              // onDragStart={e => {
              //   e.dataTransfer.setDragImage(new Image(), 0, 0)

              //   console.log('drag')
              // }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <p className=" p-4 text-gray-500 font-medium text-center">
              Click here to upload {text}
            </p>
          </div>
        )}
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={onSubmitFile}
        />
        <input {...register(name, { required: true })} type="hidden" />
      </label>
      <label>Size:</label>
      <output id="fileSize">{watchValue.size}</output>
    </div>
  )
}
