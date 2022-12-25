import {
  v4_default
} from "/build/_shared/chunk-OXVWDGG7.js";
import {
  Textarea
} from "/build/_shared/chunk-4JP7P7OL.js";
import {
  addStep,
  updateStep,
  useAppDispatch,
  useAppSelector
} from "/build/_shared/chunk-PDABV4SV.js";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext
} from "/build/_shared/chunk-7RAIFTL2.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import {
  require_jsx_dev_runtime,
  require_react,
  useNavigate,
  useParams
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/upload/$stepIdx.tsx
var import_react2 = __toESM(require_react());

// app/components/methods-field-array.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var regexNum = new RegExp("^[0-9]$");
var regexChar = new RegExp("^[a-zA-Z]$");
var TimeInput = ({
  name,
  ...methods
}) => {
  const { register, control, watch, setValue } = methods;
  const watchValue = watch(name);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "input",
    {
      ...register(name),
      type: "text",
      className: "input w-20 text-right",
      placeholder: "0:00",
      onKeyDown: (e) => {
        if (watchValue.length === 4 && regexNum.test(e.key)) {
          e.preventDefault();
        }
        if (regexChar.test(e.key)) {
          e.preventDefault();
        }
      },
      onFocus: (e) => {
        setValue(name, e.target.value.replace(":", ""));
      },
      onBlur: (e) => {
        const arr = e.target.value.split("");
        while (arr.length < 4) {
          arr.unshift("0");
        }
        const length = arr.length;
        arr.splice(length - 2, 0, ":");
        setValue(name, arr.join(""));
      }
    },
    void 0,
    false,
    {
      fileName: "app/components/methods-field-array.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
};
function MethodsFieldArray({
  name
}) {
  const methods = useFormContext();
  const { register, control, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-4", children: [
    fields.map((field, idx) => {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TimeInput, { ...methods, name: `${name}.${idx}.timeStemp` }, void 0, false, {
          fileName: "app/components/methods-field-array.tsx",
          lineNumber: 76,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Textarea,
          {
            ...methods,
            name: `${name}.${idx}.content`,
            rows: 1,
            placeholder: "Method"
          },
          void 0,
          false,
          {
            fileName: "app/components/methods-field-array.tsx",
            lineNumber: 77,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            type: "button",
            className: "btn-ghost",
            onClick: () => {
              remove(idx);
            },
            disabled: fields.length === 1,
            children: "Delet"
          },
          void 0,
          false,
          {
            fileName: "app/components/methods-field-array.tsx",
            lineNumber: 83,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/components/methods-field-array.tsx",
        lineNumber: 75,
        columnNumber: 13
      }, this) }, field.id, false, {
        fileName: "app/components/methods-field-array.tsx",
        lineNumber: 74,
        columnNumber: 11
      }, this);
    }),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        className: "btn-sm btn-border",
        type: "button",
        onClick: () => {
          append({ content: "", timeStemp: "" });
        },
        children: "Add a method"
      },
      void 0,
      false,
      {
        fileName: "app/components/methods-field-array.tsx",
        lineNumber: 97,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/components/methods-field-array.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}

// app/components/step-form.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function StepForm() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    "form",
    {
      className: "flex flex-col space-y-12",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "label-required", children: "Step Title" }, void 0, false, {
            fileName: "app/components/step-form.tsx",
            lineNumber: 40,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Textarea, { name: "title", maxLength: 100, rows: 2 }, void 0, false, {
            fileName: "app/components/step-form.tsx",
            lineNumber: 41,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/step-form.tsx",
          lineNumber: 39,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "label-required", children: "Methods" }, void 0, false, {
            fileName: "app/components/step-form.tsx",
            lineNumber: 44,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MethodsFieldArray, { name: "methods" }, void 0, false, {
            fileName: "app/components/step-form.tsx",
            lineNumber: 45,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/step-form.tsx",
          lineNumber: 43,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/step-form.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
}

// app/routes/upload/$stepIdx.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
var defaultValues = {
  title: "",
  methods: [{ content: "", timeStamp: "" }]
};
function StepsPage() {
  const { stepIdx } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const localStepForms = useAppSelector((state) => state.stepForm);
  const localStepForm = stepIdx ? localStepForms[+stepIdx - 1] : void 0;
  const methods = useForm({
    defaultValues: localStepForm ? localStepForm : defaultValues,
    shouldUnregister: true
  });
  const { handleSubmit, reset, getValues } = methods;
  (0, import_react2.useEffect)(() => {
    if (localStepForm) {
      reset(localStepForm);
    }
  }, [dispatch, localStepForm, reset, stepIdx]);
  (0, import_react2.useEffect)(() => {
    return () => {
      const formValue = getValues();
      if (formValue && localStepForm) {
        dispatch(
          updateStep({
            title: formValue.title,
            methods: formValue.methods,
            id: localStepForm.id
          })
        );
      }
    };
  }, [dispatch, getValues, localStepForm, stepIdx]);
  const onSubmit = (v) => {
    if (localStepForm) {
      dispatch(
        updateStep({
          title: v.title,
          methods: v.methods,
          id: localStepForm.id
        })
      );
    }
  };
  const onSubmitAdd = (v) => {
    if (stepIdx && !localStepForms[+stepIdx]) {
      dispatch(
        addStep({
          title: "",
          methods: [{ timeStamp: "", content: "" }],
          id: v4_default()
        })
      );
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "space-y-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "font-medium text-primary-600", children: [
      "Step ",
      stepIdx
    ] }, void 0, true, {
      fileName: "app/routes/upload/$stepIdx.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(FormProvider, { ...methods, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(StepForm, {}, void 0, false, {
      fileName: "app/routes/upload/$stepIdx.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/upload/$stepIdx.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex gap-4", children: [
      stepIdx && stepIdx !== "1" ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          className: "btn-sm btn-gray",
          onClick: () => {
            handleSubmit(onSubmit)();
            navigate(`../${+stepIdx - 1}`);
          },
          type: "submit",
          children: "Previous"
        },
        void 0,
        false,
        {
          fileName: "app/routes/upload/$stepIdx.tsx",
          lineNumber: 89,
          columnNumber: 11
        },
        this
      ) : null,
      stepIdx ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          className: "btn-sm btn-primary",
          onClick: () => {
            handleSubmit(onSubmitAdd)();
            navigate(`../${+stepIdx + 1}`);
          },
          type: "submit",
          children: "Next step"
        },
        void 0,
        false,
        {
          fileName: "app/routes/upload/$stepIdx.tsx",
          lineNumber: 102,
          columnNumber: 11
        },
        this
      ) : null
    ] }, void 0, true, {
      fileName: "app/routes/upload/$stepIdx.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/upload/$stepIdx.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
export {
  StepsPage as default
};
//# sourceMappingURL=/build/routes/upload/$stepIdx-C334SANH.js.map
