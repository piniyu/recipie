import {
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/drop-down-menu.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function DropdownMenu({
  hasDownArrow,
  icon,
  summary,
  details,
  direction = "left"
}) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const detailsRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const clickOutside = (e) => {
      if (detailsRef.current && e.target && !detailsRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", clickOutside);
    return () => {
      window.addEventListener("click", clickOutside);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: "relative select-none text-gray-500",
      ref: detailsRef,
      children: [
        typeof summary === "string" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            className: "h-full btn-sm bg-white border-none shadow-sm flex items-center gap-2  cursor-pointer",
            onClick: (e) => {
              setOpen((o) => !o);
            },
            children: [
              icon,
              summary,
              hasDownArrow && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "span",
                {
                  className: `material-symbols-rounded transition-transform ${open ? "-rotate-180" : ""}`,
                  children: "expand_more"
                },
                void 0,
                false,
                {
                  fileName: "app/components/drop-down-menu.tsx",
                  lineNumber: 51,
                  columnNumber: 13
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "app/components/drop-down-menu.tsx",
            lineNumber: 42,
            columnNumber: 9
          },
          this
        ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onClick: () => setOpen((prev) => !prev), children: summary }, void 0, false, {
          fileName: "app/components/drop-down-menu.tsx",
          lineNumber: 61,
          columnNumber: 9
        }, this),
        open && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: `
          absolute z-10 
          flex flex-col 
           border-gray-200 rounded-lg 
          mt-1 px-2 py-2 
          bg-white shadow-xl
          ${direction === "left" ? "" : "right-0"}
				`,
            children: details
          },
          void 0,
          false,
          {
            fileName: "app/components/drop-down-menu.tsx",
            lineNumber: 64,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/drop-down-menu.tsx",
      lineNumber: 36,
      columnNumber: 5
    },
    this
  );
}

export {
  DropdownMenu
};
//# sourceMappingURL=/build/_shared/chunk-UN6WIT2S.js.map
