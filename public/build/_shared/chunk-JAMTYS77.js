import {
  AuthCheck
} from "/build/_shared/chunk-AZO6JVLN.js";
import {
  img1_default
} from "/build/_shared/chunk-SH4AKRQ3.js";
import {
  Link2 as Link,
  require_jsx_dev_runtime,
  require_react,
  useFetcher
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/card/card-grid.tsx
var import_react2 = __toESM(require_react());

// app/components/card/card.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function IconForm({
  recipeId,
  action,
  icon
}) {
  const fetcher = useFetcher();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthCheck, { loginConfirmModal: true, children: (user) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(fetcher.Form, { method: "post", action, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "button",
    {
      type: "submit",
      className: "icon-btn-sm icon-btn-square flex ",
      onClick: (e) => {
        if (!(user == null ? void 0 : user.id)) {
          e.preventDefault();
        } else {
          e.stopPropagation();
        }
      },
      children: icon
    },
    void 0,
    false,
    {
      fileName: "app/components/card/card.tsx",
      lineNumber: 34,
      columnNumber: 11
    },
    this
  ) }, void 0, false, {
    fileName: "app/components/card/card.tsx",
    lineNumber: 33,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/card/card.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
function Overlay({
  author,
  id,
  isLiked,
  isInBasket
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: `
      opacity-0
      invisible
      group-hover:opacity-100 group-hover:visible
      transition-all

      absolute 
      flex items-end 
      w-full h-full 
      p-3 
      bg-gradient-to-t from-gray-800/80 via-transparent 
       text-white
      `,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex p-0.5 rounded-full bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-icons-round  leading-none text-black", children: "person" }, void 0, false, {
            fileName: "app/components/card/card.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "app/components/card/card.tsx",
            lineNumber: 77,
            columnNumber: 11
          }, this),
          author
        ] }, void 0, true, {
          fileName: "app/components/card/card.tsx",
          lineNumber: 76,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            IconForm,
            {
              recipeId: id,
              action: `/recipe/like/${id}`,
              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "span",
                {
                  className: `material-symbols-rounded  leading-none ${isLiked ? "text-red-500" : ""}`,
                  style: isLiked ? { fontVariationSettings: '"FILL" 1' } : void 0,
                  children: "favorite"
                },
                void 0,
                false,
                {
                  fileName: "app/components/card/card.tsx",
                  lineNumber: 89,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "app/components/card/card.tsx",
              lineNumber: 85,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            IconForm,
            {
              recipeId: id,
              action: `/add-basket/${id}`,
              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "span",
                {
                  className: ` material-symbols-rounded  leading-none ${isInBasket ? "text-blue-500" : ""}`,
                  style: isInBasket ? { fontVariationSettings: '"FILL" 1' } : void 0,
                  children: "shopping_basket"
                },
                void 0,
                false,
                {
                  fileName: "app/components/card/card.tsx",
                  lineNumber: 105,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "app/components/card/card.tsx",
              lineNumber: 101,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/components/card/card.tsx",
          lineNumber: 84,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/card/card.tsx",
        lineNumber: 75,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "app/components/card/card.tsx",
      lineNumber: 60,
      columnNumber: 5
    },
    this
  );
}
function Card({
  id,
  title,
  favCounts,
  basketCounts,
  author,
  isLiked,
  isInBasket
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Link,
    {
      to: `/recipe/${id}`,
      className: "group flex flex-col gap-2 bg-white p-2 rounded-lg shadow-gray-200/50 shadow-xl hover:shadow-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all ease-in",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative aspect-w-4 aspect-h-3 flex items-center justify-center overflow-hidden rounded-lg", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { className: "w-full h-full object-cover object-center ", src: img1_default }, void 0, false, {
            fileName: "app/components/card/card.tsx",
            lineNumber: 138,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Overlay,
            {
              author,
              id,
              isLiked,
              isInBasket
            },
            void 0,
            false,
            {
              fileName: "app/components/card/card.tsx",
              lineNumber: 139,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/components/card/card.tsx",
          lineNumber: 137,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "line-clamp-1 text-center text-black font-medium", children: title }, void 0, false, {
          fileName: "app/components/card/card.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex items-center gap-1 text-gray-400 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "span",
              {
                className: "material-symbols-outlined text-xl leading-none ",
                style: { fontVariationSettings: '"wght" 300, "FILL" 0' },
                children: "favorite"
              },
              void 0,
              false,
              {
                fileName: "app/components/card/card.tsx",
                lineNumber: 151,
                columnNumber: 11
              },
              this
            ),
            favCounts
          ] }, void 0, true, {
            fileName: "app/components/card/card.tsx",
            lineNumber: 150,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex items-center gap-1 text-gray-400 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "span",
              {
                className: "material-symbols-outlined text-xl leading-none ",
                style: { fontVariationSettings: '"wght" 300,"FILL" 0' },
                children: "shopping_basket"
              },
              void 0,
              false,
              {
                fileName: "app/components/card/card.tsx",
                lineNumber: 160,
                columnNumber: 11
              },
              this
            ),
            basketCounts
          ] }, void 0, true, {
            fileName: "app/components/card/card.tsx",
            lineNumber: 159,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/card/card.tsx",
          lineNumber: 149,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/card/card.tsx",
      lineNumber: 133,
      columnNumber: 5
    },
    this
  );
}

// app/components/card/card-grid.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function CardGrid({
  data
}) {
  const [modifiedData, setModifiedData] = (0, import_react2.useState)([]);
  (0, import_react2.useEffect)(() => {
    if (data) {
      const newData = data.map((recipe) => {
        var _a;
        return {
          ...recipe,
          favCounts: Math.floor(Math.random() * 1e3),
          basketCounts: Math.floor(Math.random() * 1e3),
          title: recipe.title,
          author: (_a = recipe.author.name) != null ? _a : recipe.author.id,
          id: recipe.id
        };
      });
      setModifiedData(newData);
    }
  }, [data]);
  if (!data)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-9", children: modifiedData.map(
    ({ id, title, favCounts, basketCounts, author, isLiked, isInBasket }, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      Card,
      {
        ...{
          id,
          title,
          favCounts,
          basketCounts,
          author,
          isLiked,
          isInBasket
        }
      },
      `${title}_${idx}`,
      false,
      {
        fileName: "app/components/card/card-grid.tsx",
        lineNumber: 43,
        columnNumber: 11
      },
      this
    )
  ) }, void 0, false, {
    fileName: "app/components/card/card-grid.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

export {
  CardGrid
};
//# sourceMappingURL=/build/_shared/chunk-JAMTYS77.js.map
