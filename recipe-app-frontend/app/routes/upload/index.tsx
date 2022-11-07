import { LoaderFunction, redirect } from '@remix-run/node'
import { Link, useNavigate } from '@remix-run/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import type { ControlProps, GroupBase } from 'react-select'
import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Difficulty from '~/components/difficulty'
import Textarea from '~/components/textarea'

const mockTags = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'dinner', label: 'Dinner' },
]

const ControlComponent = ({
  children,
  ...props
}: ControlProps<
  { value: string; label: string },
  true,
  GroupBase<{ value: string; label: string }>
>) => {
  const { isFocused } = props
  return (
    <components.Control
      {...props}
      className={`${
        isFocused
          ? '!shadow-[0_0_0_1px_black] !shadow-focus-outline !border-focus-outline '
          : 'border-gray-200'
      }
      rounded-lg
      `}
    >
      {children}
    </components.Control>
  )
}

export const loader: LoaderFunction = () => {
  return redirect('/upload/details')
}

export default function UploadIndex(): null {
  // const methods = useForm({
  //   defaultValues: {
  //     title: '',
  //     tags: mockTags,
  //     difficulty: 1,
  //   },
  // })

  return null
  // <div className="space-y-12 ">
  //   <h3 className="font-medium text-black">Recipe details</h3>
  //   <FormProvider {...methods}>
  //     <form className="flex flex-col space-y-12">
  //       <label>
  //         <p className="label-required">Tilte</p>
  //         <Textarea name="title" maxLength={100} rows={2} />
  //       </label>
  //       <label>
  //         <p className="label-required">Tags</p>
  //         <Controller
  //           name="tags"
  //           control={methods.control}
  //           render={({ field: { name, value } }) => (
  //             <CreatableSelect
  //               id={name}
  //               isClearable
  //               isMulti
  //               options={mockTags}
  //               className=""
  //               components={{
  //                 ClearIndicator: undefined,
  //                 Control: ControlComponent,
  //               }}
  //             />
  //           )}
  //         />
  //       </label>
  //       <label>
  //         <p className="label-required">Difficulty</p>
  //         <div className="flex items-center">
  //           <Difficulty stars={1} isInput />
  //         </div>
  //       </label>
  //     </form>
  //   </FormProvider>
  //   <Link to="./ingredients" className="btn-sm btn-primary w-fit">
  //     Next
  //   </Link>
  // </div>
}
