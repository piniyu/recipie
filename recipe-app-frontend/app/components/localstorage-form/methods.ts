// import type {Stemp} from '../step-form '
import { DetailsFormProps } from '~/routes/upload/details'
import type { StepFormProps } from '../step-form'

export enum localStorageKey {
  MOCK_STEP_FORM = 'MOCK_STEP_FORM',
  MOCK_DETAILS_FORM = 'MOCK_DETAILS_FORM',
}

type TypeName =
  | localStorageKey.MOCK_DETAILS_FORM
  | localStorageKey.MOCK_STEP_FORM
type LocalstorageDataType<T> = T extends localStorageKey.MOCK_DETAILS_FORM
  ? DetailsFormProps
  : T extends localStorageKey.MOCK_STEP_FORM
  ? StepFormProps[]
  : never
type DataType<T> = T extends localStorageKey.MOCK_DETAILS_FORM
  ? DetailsFormProps
  : T extends localStorageKey.MOCK_STEP_FORM
  ? StepFormProps
  : never

// type DataType = DetailsFormProps | StepFormProps

export const getLocalValue = <T extends TypeName>(
  key: T,
): LocalstorageDataType<T> => {
  const local = localStorage.getItem(key)
  if (local) {
    const parsed = JSON.parse(local)
    return parsed
  }
  const initial = () => {
    if (key === localStorageKey.MOCK_STEP_FORM) {
      return [
        { title: '', methods: [{ timeStemp: '', content: '' }] },
      ] as LocalstorageDataType<T>
    }
    if (key === localStorageKey.MOCK_DETAILS_FORM) {
      return {
        title: '',
        tags: [{ label: '', value: '' }],
        difficulty: 1,
        thumbnail: { name: '', src: '', type: '' },
      } as LocalstorageDataType<T>
    }
    throw new Error()
  }
  try {
    localStorage.setItem(key, JSON.stringify(initial()))
    return initial()
  } catch (err) {
    throw err
  }
}

export const setLocalValue = <T extends TypeName>(
  key: T,
  data: DataType<T>,
  idx?: number,
): void => {
  const local = getLocalValue(key)
  if (
    // _isStepForm(local) &&
    idx &&
    key === localStorageKey.MOCK_STEP_FORM &&
    data
  ) {
    const value = local as StepFormProps[]
    value[idx] = data as StepFormProps
    localStorage.setItem(key, JSON.stringify(value))
    return
  } else if (
    // !_isStepForm(local) &&
    key === localStorageKey.MOCK_DETAILS_FORM &&
    data
  ) {
    let value = local as DetailsFormProps
    value = data as DetailsFormProps
    localStorage.setItem(key, JSON.stringify(value))
  }
}
