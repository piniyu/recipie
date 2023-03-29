import {
  ClearIndicatorProps,
  components,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
} from 'react-select'

type SelectOpeionType = { value: string; label: string }

const ControlComponent = ({ children, ...props }: ControlProps<any>) => {
  const { isFocused } = props
  return (
    <components.Control
      {...props}
      className={` py-0.5 dark:bg-dark-gray ${
        isFocused
          ? '!border-focus-outline !shadow-[0_0_0_1px_black] !shadow-focus-outline'
          : 'border-gray-200 dark:border-gray-500'
      }
      rounded-lg
      `}
    >
      {children}
    </components.Control>
  )
}

const OptionComponent = ({ children, ...props }: OptionProps<any>) => {
  return (
    <components.Option
      {...props}
      className={` cursor-pointer rounded-lg ${
        props.isSelected
          ? 'bg-primary text-inherit dark:bg-primary-dark'
          : props.isFocused
          ? 'bg-gray-100 dark:bg-gray-700'
          : 'bg-transparent'
      }`}
    >
      {children}
    </components.Option>
  )
}

const MenuComponent = ({ children, ...props }: MenuProps<any>) => {
  return (
    <components.Menu
      {...props}
      className={`${props.className} z-10 rounded-lg shadow-lg dark:border dark:border-gray-600 dark:bg-dark-gray`}
    >
      {children}
    </components.Menu>
  )
}
const MenuListComponent = ({ children, ...props }: MenuListProps<any>) => {
  return (
    <components.MenuList {...props} className="p-2">
      {children}
    </components.MenuList>
  )
}

const DropdownIndicatorComponent = ({
  children,
  ...props
}: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator
      {...{
        ...props,
        className: `${props.className} ${
          props.isFocused ? 'dark:text-gray-400' : ''
        }`,
      }}
    >
      {children}
    </components.DropdownIndicator>
  )
}

const ClearIndicatorComponent = ({
  children,
  ...props
}: ClearIndicatorProps<any>) => {
  return (
    <components.ClearIndicator
      {...{
        ...props,
        className: `${props.className} ${
          props.isFocused ? 'dark:text-gray-400' : ''
        }`,
      }}
    >
      {children}
    </components.ClearIndicator>
  )
}

const MultiValueLabel = (props: MultiValueGenericProps<any>) => {
  const { innerProps } = props
  return (
    <components.MultiValueLabel
      {...props}
      innerProps={{
        ...innerProps,
        className: `${innerProps.className} dark:bg-gray-600 text-inherit`,
      }}
    />
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps<any>) => {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        ...props.innerProps,
        className: `${props.innerProps.className} dark:bg-gray-600 dark:hover:bg-red-600/80 dark:hover:text-red-200`,
      }}
    >
      {props.children}
    </components.MultiValueRemove>
  )
}

const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
  return (
    <components.MultiValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        className: `${props.innerProps.className} dark:bg-gray-600`,
      }}
    />
  )
}
const InputComponent = (props: InputProps<any>) => {
  return (
    <components.Input {...props} className={`${props.className} text-inherit`}>
      {props.children}
    </components.Input>
  )
}

export {
  MenuComponent,
  OptionComponent,
  ControlComponent,
  InputComponent,
  MultiValueContainer,
  MultiValueRemove,
  MultiValueLabel,
  ClearIndicatorComponent,
  DropdownIndicatorComponent,
  MenuListComponent,
}
export type { SelectOpeionType }
