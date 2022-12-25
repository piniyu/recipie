import {
  require_session
} from "/build/_shared/chunk-OOPRYBMH.js";
import {
  metaTitlePostfix
} from "/build/_shared/chunk-SGR6W5H7.js";
import "/build/_shared/chunk-A76BYB4T.js";
import "/build/_shared/chunk-PC7DKCCK.js";
import "/build/_shared/chunk-PDABV4SV.js";
import "/build/_shared/chunk-7RAIFTL2.js";
import {
  require_search_recipes
} from "/build/_shared/chunk-4UVX32CE.js";
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
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/favorite.tsx
var import_search_recipes = __toESM(require_search_recipes());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = () => ({
  charset: "utf-8",
  title: "Favorite" + metaTitlePostfix
});
function Favorite() {
  const data = useLoaderData();
  const fetcher = useFetcher();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "layout-pt layout-px flex flex-col gap-9", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        SearchBar,
        {
          placeholder: "Favorite Search",
          list: data.searchRes.map((item) => ({
            id: item.id,
            value: item.title
          })),
          fetch: (inputValue) => {
            fetcher.load(`/favorite?search=${inputValue}`);
          }
        },
        void 0,
        false,
        {
          fileName: "app/routes/favorite.tsx",
          lineNumber: 45,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        DropdownMenu,
        {
          summary: "New",
          details: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Popular" }, void 0, false, {
            fileName: "app/routes/favorite.tsx",
            lineNumber: 59,
            columnNumber: 20
          }, this),
          hasDownArrow: true
        },
        void 0,
        false,
        {
          fileName: "app/routes/favorite.tsx",
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
            fileName: "app/routes/favorite.tsx",
            lineNumber: 64,
            columnNumber: 20
          }, this),
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded", children: "tune" }, void 0, false, {
            fileName: "app/routes/favorite.tsx",
            lineNumber: 65,
            columnNumber: 17
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/routes/favorite.tsx",
          lineNumber: 62,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/favorite.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardGrid, { data: data.favRecipes }, void 0, false, {
      fileName: "app/routes/favorite.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/favorite.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}
export {
  Favorite as default,
  meta
};
//# sourceMappingURL=/build/routes/favorite-NP24T7TT.js.map
