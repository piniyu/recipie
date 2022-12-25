import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/search-bar.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function SearchBar({
  placeholder = "Search",
  border = false,
  list,
  fetch
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " relative w-full max-w-md text-black", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        className: `
            peer
						flex w-full items-center
						gap-2
						rounded-lg 
						bg-white
						
						outline-[3px] outline-offset-1 
						outline-focus-outline
            transition-all 
            ease-in focus-within:outline
            ${border ? "rounded border border-gray-200 focus-within:border-transparent hover:border-gray-400" : "shadow-sm shadow-gray-300 focus-within:shadow-lg hover:shadow-lg"}
            
            `,
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded pl-4 text-xl leading-none text-gray-400", children: "search" }, void 0, false, {
            fileName: "app/components/search-bar.tsx",
            lineNumber: 34,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              type: "text",
              placeholder,
              className: `
              min-w-0
							flex-1
							bg-transparent py-3
							pr-4
              focus:outline-none
          `,
              onChange: (e) => fetch(e.target.value)
            },
            void 0,
            false,
            {
              fileName: "app/components/search-bar.tsx",
              lineNumber: 37,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 14,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        className: `
            absolute
            z-10
            mt-2
            hidden
            w-full rounded-lg 
            border 
            border-gray-100 bg-white px-4 
            py-3 
            shadow-lg hover:block 
            focus:block 
            peer-focus-within:block
            `,
        children: list === void 0 || (list == null ? void 0 : list.length) === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "No results" }, void 0, false, {
          fileName: "app/components/search-bar.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, this) : list == null ? void 0 : list.map((v, idx) => {
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: v.value }, v.value + idx, false, {
            fileName: "app/components/search-bar.tsx",
            lineNumber: 72,
            columnNumber: 20
          }, this);
        })
      },
      void 0,
      false,
      {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 51,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/components/search-bar.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

export {
  SearchBar
};
//# sourceMappingURL=/build/_shared/chunk-BC24VAOR.js.map
