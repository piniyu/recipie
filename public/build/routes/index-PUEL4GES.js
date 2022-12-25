import {
  require_session
} from "/build/_shared/chunk-OOPRYBMH.js";
import {
  CardGrid
} from "/build/_shared/chunk-F56HSVEH.js";
import {
  SearchBar
} from "/build/_shared/chunk-BC24VAOR.js";
import {
  DropdownMenu
} from "/build/_shared/chunk-UN6WIT2S.js";
import "/build/_shared/chunk-ZWAGDIK3.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import "/build/_shared/chunk-SH4AKRQ3.js";
import {
  require_jsx_dev_runtime,
  require_react,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// empty-module:../lib/loaders/search-recipes.server
var require_search_recipes = __commonJS({
  "empty-module:../lib/loaders/search-recipes.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/index.tsx
var import_react2 = __toESM(require_react());
var import_session = __toESM(require_session());
var import_search_recipes = __toESM(require_search_recipes());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  var _a;
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [resList, setResList] = (0, import_react2.useState)([]);
  (0, import_react2.useEffect)(() => {
    var _a2;
    if ((_a2 = fetcher.data) == null ? void 0 : _a2.searcheRes) {
      setResList(fetcher.data.searcheRes);
    }
  }, [(_a = fetcher.data) == null ? void 0 : _a.searcheRes]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "layout-pt layout-px flex flex-col gap-9", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        SearchBar,
        {
          list: resList == null ? void 0 : resList.map((item) => ({ value: item.title, id: item.id })),
          fetch: (inputValue) => {
            fetcher.load(`/?index&search=${inputValue}`);
          }
        },
        void 0,
        false,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 47,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        DropdownMenu,
        {
          summary: "New",
          details: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Popular" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 55,
            columnNumber: 20
          }, this),
          hasDownArrow: true
        },
        void 0,
        false,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 53,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        DropdownMenu,
        {
          summary: "Filter",
          details: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "filter checkbox" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 60,
            columnNumber: 20
          }, this),
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded", children: "tune" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 61,
            columnNumber: 17
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 58,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardGrid, { data: data.allRecipe }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-PUEL4GES.js.map
