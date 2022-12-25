import {
  updateRecipeServings,
  useAppDispatch
} from "/build/_shared/chunk-PDABV4SV.js";
import {
  FormProvider,
  get,
  useForm,
  useFormContext
} from "/build/_shared/chunk-7RAIFTL2.js";
import {
  img1_default
} from "/build/_shared/chunk-SH4AKRQ3.js";
import {
  Form,
  require_jsx_dev_runtime,
  require_react,
  useLocation
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/basket/recipe-servings-form.tsx
var import_react3 = __toESM(require_react());

// app/components/inputs/number-input.tsx
var import_react = __toESM(require_react());

// node_modules/@hookform/error-message/dist/index.esm.js
var e = __toESM(require_react());
var s = function(s2) {
  var t = s2.as, a = s2.errors, m = s2.name, o = s2.message, i = s2.render, l = function(e2, r) {
    if (null == e2)
      return {};
    var n, s3, t2 = {}, a2 = Object.keys(e2);
    for (s3 = 0; s3 < a2.length; s3++)
      r.indexOf(n = a2[s3]) >= 0 || (t2[n] = e2[n]);
    return t2;
  }(s2, ["as", "errors", "name", "message", "render"]), f = useFormContext(), c = get(a || f.formState.errors, m);
  if (!c)
    return null;
  var g = c.message, u = c.types, d = Object.assign({}, l, { children: g || o });
  return e.isValidElement(t) ? e.cloneElement(t, d) : i ? i({ message: g || o, messages: u }) : e.createElement(t || e.Fragment, d);
};

// app/components/inputs/number-input.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var NumberInput = ({
  hasSetBtn,
  unit,
  registerName,
  maxValue,
  showErrors,
  onChange,
  onSubmit
}) => {
  var _a;
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useFormContext();
  const input = watch(registerName);
  const inputRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const subscription = watch(() => {
      if (onSubmit) {
        handleSubmit(onSubmit)();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [handleSubmit, onSubmit, watch]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: [
    hasSetBtn ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        className: " flex items-center rounded-l-lg border border-r-0 border-gray-200 disabled:text-gray-400",
        type: "button",
        onClick: () => {
          if (inputRef.current && parseInt(inputRef.current.value) > 1) {
            inputRef.current.value = parseInt(inputRef.current.value) - 1 + "";
            setValue("input", parseInt(inputRef.current.value));
          }
        },
        disabled: input <= 1,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-outlined", children: "remove" }, void 0, false, {
          fileName: "app/components/inputs/number-input.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/components/inputs/number-input.tsx",
        lineNumber: 46,
        columnNumber: 9
      },
      this
    ) : null,
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "input",
      {
        ...register(registerName, {
          valueAsNumber: true,
          max: maxValue ? { value: maxValue, message: "Out of original quantity" } : void 0,
          min: 0
        }),
        type: "number",
        className: `input max-w-[60px] text-right ${((_a = errors.input) == null ? void 0 : _a.message) ? "outline-red-500 bg-red-50 border-red-500 text-red-500" : ""}
        ${hasSetBtn ? "rounded-none" : ""}
        `,
        placeholder: "0",
        onKeyDown: (e2) => {
          if ((!input || input && input.toString().length === 0) && e2.key === "0") {
            e2.preventDefault();
          }
          if (maxValue !== void 0 && !isNaN(input) && (input + "").replace(".", "").length === (maxValue + "").replace(".", "").length && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e2.key))) {
            e2.preventDefault();
          }
          if (e2.key === "-") {
            e2.preventDefault();
          }
        },
        ref: (el) => {
          inputRef.current = el;
          register("input").ref(el);
        }
      },
      void 0,
      false,
      {
        fileName: "app/components/inputs/number-input.tsx",
        lineNumber: 61,
        columnNumber: 7
      },
      this
    ),
    hasSetBtn ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        type: "button",
        className: "flex items-center border border-l-0 border-gray-200 rounded-r-lg",
        onClick: () => {
          if (inputRef.current) {
            inputRef.current.value = parseInt(inputRef.current.value) + 1 + "";
            setValue("input", parseInt(inputRef.current.value));
          }
        },
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-outlined", children: "add" }, void 0, false, {
          fileName: "app/components/inputs/number-input.tsx",
          lineNumber: 114,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/components/inputs/number-input.tsx",
        lineNumber: 104,
        columnNumber: 9
      },
      this
    ) : null,
    unit ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 flex items-center", children: unit }, void 0, false, {
      fileName: "app/components/inputs/number-input.tsx",
      lineNumber: 117,
      columnNumber: 15
    }, this) : null,
    showErrors && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      s,
      {
        name: registerName,
        errors,
        render: ({ message }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute left-0 top-full text-red-500 text-xs", children: message }, void 0, false, {
          fileName: "app/components/inputs/number-input.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/components/inputs/number-input.tsx",
        lineNumber: 119,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/components/inputs/number-input.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
};
var number_input_default = NumberInput;

// app/components/basket/recipe-servings-form.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
var ServingsForm = ({
  recipeId,
  defaultValue = 1
}) => {
  const methods = useForm({
    defaultValues: { input: defaultValue },
    mode: "onChange"
  });
  const dispatch = useAppDispatch();
  const onChangeSubmit = (0, import_react3.useCallback)(
    (value) => {
      dispatch(
        updateRecipeServings({
          servings: value.input,
          recipeId
        })
      );
    },
    [dispatch, recipeId]
  );
  (0, import_react3.useEffect)(() => {
    methods.reset({ input: defaultValue });
  }, [defaultValue, methods]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FormProvider, { ...methods, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Form, { onSubmit: (e2) => void e2.preventDefault(), children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    number_input_default,
    {
      registerName: "input",
      hasSetBtn: true,
      onSubmit: (v) => {
        onChangeSubmit(v);
      }
    },
    void 0,
    false,
    {
      fileName: "app/components/basket/recipe-servings-form.tsx",
      lineNumber: 41,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "app/components/basket/recipe-servings-form.tsx",
    lineNumber: 39,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/basket/recipe-servings-form.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
};
var recipe_servings_form_default = ServingsForm;

// app/components/card/card-list-item.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
function CardListItem({
  title,
  onDelete,
  recipeId,
  subTitle
}) {
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex gap-4 ", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "img",
      {
        className: "w-full h-full object-cover object-center ",
        src: img1_default
      },
      void 0,
      false,
      {
        fileName: "app/components/card/card-list-item.tsx",
        lineNumber: 23,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "app/components/card/card-list-item.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/card/card-list-item.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex-1 flex flex-col justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h4", { className: "flex-1 text-black font-medium", children: title }, void 0, false, {
        fileName: "app/components/card/card-list-item.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      subTitle
    ] }, void 0, true, {
      fileName: "app/components/card/card-list-item.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    onDelete ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Form, { className: "flex ", onSubmit: onDelete, method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "input",
        {
          type: "hidden",
          name: "redirectTo",
          value: `${location.pathname}${location.search}`
        },
        void 0,
        false,
        {
          fileName: "app/components/card/card-list-item.tsx",
          lineNumber: 37,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { type: "hidden", name: "deleteId", value: recipeId }, void 0, false, {
        fileName: "app/components/card/card-list-item.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          className: "flex p-1 rounded-full",
          type: "submit",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "material-symbols-rounded text-lg leading-none text-gray-500", children: "close" }, void 0, false, {
            fileName: "app/components/card/card-list-item.tsx",
            lineNumber: 48,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/components/card/card-list-item.tsx",
          lineNumber: 43,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/components/card/card-list-item.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/components/card/card-list-item.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}

export {
  number_input_default,
  recipe_servings_form_default,
  CardListItem
};
//# sourceMappingURL=/build/_shared/chunk-A76BYB4T.js.map
