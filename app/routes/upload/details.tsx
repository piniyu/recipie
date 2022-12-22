import { Difficulty } from "@prisma/client";
import { Link } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import type {
  ControlProps,
  GroupBase,
  MenuListProps,
  MenuProps,
  OptionProps,
} from "react-select";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import FileUploadInput from "~/components/image-input-form/img-upload-input";
import { useAppDispatch, useAppSelector } from "~/store/configure-store";
import { updateDetails } from "~/store/upload-temp/details-form-slice";
import DifficultyComponent from "../../components/difficulty";
import Textarea from "../../components/textarea";

type SelectOpeionType = { value: string; label: string }[];

export type ImgFormProp = {
  name: string;
  src: string;
  type: string;
  size: string;
};
export interface DetailsFormProps {
  title: string;
  tags: SelectOpeionType;
  difficulty: Difficulty;
  thumbnail: ImgFormProp;
}

const mockTags = [
  { value: "breakfast", label: "Breakfast" },
  { value: "dinner", label: "Dinner" },
];

const defaultFormValues: DetailsFormProps = {
  title: "",
  tags: mockTags,
  difficulty: "EASY1",
  thumbnail: { name: "", src: "", type: "", size: "" },
};

const ControlComponent = ({
  children,
  ...props
}: ControlProps<
  { value: string; label: string },
  true,
  GroupBase<{ value: string; label: string }>
>) => {
  const { isFocused } = props;
  return (
    <components.Control
      {...props}
      className={` py-0.5 ${
        isFocused
          ? "!border-focus-outline !shadow-[0_0_0_1px_black] !shadow-focus-outline "
          : "border-gray-200"
      }
      rounded-lg
      `}
    >
      {children}
    </components.Control>
  );
};

const OptionComponent = ({
  children,
  ...props
}: OptionProps<{ value: string; label: string }, true>) => {
  return (
    <components.Option
      {...props}
      className={` cursor-pointer rounded-lg ${
        props.isFocused ? "text-primary-600 bg-primary-600/10" : ""
      } `}
    >
      {children}
    </components.Option>
  );
};

const MenuComponent = ({
  children,
  ...props
}: MenuProps<{ value: string; label: string }, true>) => {
  return (
    <components.Menu {...props} className="rounded-lg shadow-lg">
      {children}
    </components.Menu>
  );
};

const MenuListComponent = ({
  children,
  ...props
}: MenuListProps<{ value: string; label: string }, true>) => {
  return (
    <components.MenuList {...props} className="p-2">
      {children}
    </components.MenuList>
  );
};

export default function Details(): JSX.Element {
  // const [formValue, setFormValue] = useState<DetailsFormProps>()
  const localDetails = useAppSelector((state) => state.detailsForm);
  const dispatch = useAppDispatch();
  const methods = useForm<DetailsFormProps>({
    defaultValues: defaultFormValues,
  });
  const { getValues } = methods;
  // useEffect(() => {
  //   const onBeforeunload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault()
  //     setLocalValue(localStorageKey.MOCK_DETAILS_FORM, methods.getValues())
  //   }
  //   if (window) {
  //     window.addEventListener('beforeunload', onBeforeunload)
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeunload)
  //   }
  // }, [methods])

  useEffect(() => {
    if (localDetails) {
      const { title, difficulty, tags, thumbnail } = localDetails;
      methods.reset({
        title,
        difficulty,
        tags: tags.map((v) => ({
          value: v,
          label: v.charAt(0).toLocaleUpperCase() + v.slice(1),
        })),
        thumbnail,
      });
    }
  }, [localDetails, methods]);
  useEffect(() => {
    return () => {
      const value = getValues();
      if (value) {
        dispatch(
          updateDetails({
            title: value.title,
            difficulty: value.difficulty,
            tags: value.tags.map((v) => {
              return v.value;
            }),
            thumbnail: value.thumbnail,
          })
        );
      }
    };
  }, [dispatch, getValues]);

  return (
    <div className="space-y-12 ">
      <h3 className="font-medium text-black">Details</h3>
      <FormProvider {...methods}>
        <form className="flex gap-6">
          <div className="flex flex-1 flex-col space-y-12">
            <label>
              <p className="label-required">Tilte</p>
              <Textarea name="title" maxLength={100} rows={2} />
            </label>
            <label>
              <p className="label-required">Tags</p>
              <Controller
                name="tags"
                control={methods.control}
                render={({ field: { name, value } }) => (
                  <CreatableSelect
                    id={name}
                    isClearable
                    isMulti
                    options={mockTags}
                    className=""
                    components={{
                      ClearIndicator: undefined,
                      Control: ControlComponent,
                      Option: OptionComponent,
                      Menu: MenuComponent,
                      MenuList: MenuListComponent,
                    }}
                  />
                )}
              />
            </label>
            <label>
              <p className="label-required">Difficulty</p>
              <div className="flex items-center">
                <DifficultyComponent isInput difficulty={"EASY1"} />
              </div>
            </label>
          </div>
          <div className="w-2/5 justify-self-stretch">
            <label className="label-required">Thumbnail</label>
            <FileUploadInput name="thumbnail" text="Thumbnail" />
          </div>
        </form>
      </FormProvider>
      <Link to="../ingredients" className="btn-sm btn-primary w-fit">
        Next
      </Link>
    </div>
  );
}
