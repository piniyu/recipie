import {
  useFormContext
} from "/build/_shared/chunk-7RAIFTL2.js";
import {
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/textarea.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Textarea({
  methods,
  maxLength,
  name,
  rows,
  placeholder = ""
}) {
  const { register, watch, control } = useFormContext();
  const watchValue = watch(name);
  let textareaMyRef = null;
  const { ref, ...rest } = register(name);
  (0, import_react.useEffect)(() => {
    if (textareaMyRef && window) {
      const computedStyle = window.getComputedStyle(textareaMyRef);
      const borderTop = +computedStyle.getPropertyValue("border-top-width").replace("px", "");
      const borderBottom = +computedStyle.getPropertyValue("border-bottom-width").replace("px", "");
      textareaMyRef.style.height = textareaMyRef.scrollHeight + borderBottom + borderTop + "px";
    }
  }, [watchValue, textareaMyRef]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "textarea",
      {
        ...rest,
        rows,
        className: ` input w-full resize-none align-bottom text-black ${maxLength ? "pb-8" : ""}`,
        maxLength,
        placeholder,
        ref: (e) => {
          ref(e);
          textareaMyRef = e;
        }
      },
      void 0,
      false,
      {
        fileName: "app/components/textarea.tsx",
        lineNumber: 118,
        columnNumber: 7
      },
      this
    ),
    maxLength !== void 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute inline-block right-0 bottom-0 mr-2 mb-2 text-gray-400 text-xs", children: [
      watchValue ? watchValue.length : 0,
      "/",
      maxLength
    ] }, void 0, true, {
      fileName: "app/components/textarea.tsx",
      lineNumber: 143,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/textarea.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
}

export {
  Textarea
};
//# sourceMappingURL=/build/_shared/chunk-4JP7P7OL.js.map
