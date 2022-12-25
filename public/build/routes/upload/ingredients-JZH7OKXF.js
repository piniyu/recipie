import {
  useFieldArray,
  useForm
} from "/build/_shared/chunk-7RAIFTL2.js";
import {
  Link2 as Link,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/upload/ingredients.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var ingredients_default = () => {
  const { register, control } = useForm({
    defaultValues: { serving: 1, ingredients: [{ name: "", qty: "" }] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "font-medium text-black", children: "Ingredients" }, void 0, false, {
      fileName: "app/routes/upload/ingredients.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { className: "flex flex-col space-y-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "label-required", children: "Default serving" }, void 0, false, {
          fileName: "app/routes/upload/ingredients.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            ...register("serving"),
            type: "number",
            placeholder: "1",
            className: "input w-12 text-right",
            min: 1
          },
          void 0,
          false,
          {
            fileName: "app/routes/upload/ingredients.tsx",
            lineNumber: 25,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2", children: "serving" }, void 0, false, {
          fileName: "app/routes/upload/ingredients.tsx",
          lineNumber: 32,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/upload/ingredients.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "label-required", children: "Ingredients list" }, void 0, false, {
          fileName: "app/routes/upload/ingredients.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-4", children: [
          fields.map((field, idx) => {
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  ...field,
                  name: `ingredients.${idx}.name`,
                  className: "input flex-1",
                  placeholder: "Name"
                },
                void 0,
                false,
                {
                  fileName: "app/routes/upload/ingredients.tsx",
                  lineNumber: 40,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  ...field,
                  name: `ingredients.${idx}.qty`,
                  className: "input w-20",
                  placeholder: "QTY"
                },
                void 0,
                false,
                {
                  fileName: "app/routes/upload/ingredients.tsx",
                  lineNumber: 46,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "button",
                {
                  className: "btn-sm btn-ghost",
                  type: "button",
                  onClick: () => {
                    remove(idx);
                  },
                  disabled: fields.length === 1,
                  children: "Delet"
                },
                void 0,
                false,
                {
                  fileName: "app/routes/upload/ingredients.tsx",
                  lineNumber: 52,
                  columnNumber: 19
                },
                this
              )
            ] }, field.id, true, {
              fileName: "app/routes/upload/ingredients.tsx",
              lineNumber: 39,
              columnNumber: 17
            }, this);
          }),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "button",
            {
              className: "btn-sm btn-border",
              type: "button",
              onClick: () => {
                append({ name: "", qty: "" });
              },
              children: "Add a ingredient"
            },
            void 0,
            false,
            {
              fileName: "app/routes/upload/ingredients.tsx",
              lineNumber: 65,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/upload/ingredients.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/upload/ingredients.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/upload/ingredients.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "./details", className: "btn-sm btn-gray", children: "Previous" }, void 0, false, {
        fileName: "app/routes/upload/ingredients.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "../1", className: "btn-sm btn-primary", children: "Next" }, void 0, false, {
        fileName: "app/routes/upload/ingredients.tsx",
        lineNumber: 81,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/upload/ingredients.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/upload/ingredients.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
};
export {
  ingredients_default as default
};
//# sourceMappingURL=/build/routes/upload/ingredients-JZH7OKXF.js.map
