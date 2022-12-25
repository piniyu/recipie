import {
  require_search_recipes
} from "/build/_shared/chunk-4UVX32CE.js";
import {
  CardGrid
} from "/build/_shared/chunk-JAMTYS77.js";
import {
  SearchBar
} from "/build/_shared/chunk-BC24VAOR.js";
import {
  DropdownMenu
} from "/build/_shared/chunk-UN6WIT2S.js";
import "/build/_shared/chunk-AZO6JVLN.js";
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

// empty-module:../utils/db.server
var require_db = __commonJS({
  "empty-module:../utils/db.server"(exports, module) {
    module.exports = {};
  }
});

// empty-module:../utils/session.server
var require_session = __commonJS({
  "empty-module:../utils/session.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/my-recipes.tsx
var import_react = __toESM(require_react());
var import_db = __toESM(require_db());
var import_session = __toESM(require_session());
var import_search_recipes = __toESM(require_search_recipes());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function MyRecipes() {
  var _a;
  const data = useLoaderData();
  const fetcher = useFetcher();
  const [searchList, setSearchList] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    var _a2;
    if ((_a2 = fetcher.data) == null ? void 0 : _a2.searchRes) {
      console.log(fetcher.data.searchRes);
      setSearchList(fetcher.data.searchRes);
    }
  }, [(_a = fetcher.data) == null ? void 0 : _a.searchRes]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "layout-pt layout-px flex flex-col gap-9", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        SearchBar,
        {
          placeholder: "My Recipes Search",
          list: searchList.map((item) => ({ value: item.title, id: item.id })),
          fetch: (inputValue) => {
            fetcher.load(`/my-recipes?search=${inputValue}`);
          }
        },
        void 0,
        false,
        {
          fileName: "app/routes/my-recipes.tsx",
          lineNumber: 48,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        DropdownMenu,
        {
          summary: "New",
          details: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Popular" }, void 0, false, {
            fileName: "app/routes/my-recipes.tsx",
            lineNumber: 59,
            columnNumber: 20
          }, this),
          hasDownArrow: true
        },
        void 0,
        false,
        {
          fileName: "app/routes/my-recipes.tsx",
          lineNumber: 57,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        DropdownMenu,
        {
          summary: "Filter",
          details: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "filter checkbox" }, void 0, false, {
            fileName: "app/routes/my-recipes.tsx",
            lineNumber: 64,
            columnNumber: 20
          }, this),
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded", children: "tune" }, void 0, false, {
            fileName: "app/routes/my-recipes.tsx",
            lineNumber: 65,
            columnNumber: 17
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/routes/my-recipes.tsx",
          lineNumber: 62,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/my-recipes.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardGrid, { data: data.myRecipes }, void 0, false, {
      fileName: "app/routes/my-recipes.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/my-recipes.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}
export {
  MyRecipes as default
};
//# sourceMappingURL=/build/routes/my-recipes-3BDAV7RB.js.map
