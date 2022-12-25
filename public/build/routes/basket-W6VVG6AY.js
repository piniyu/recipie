import {
  require_session
} from "/build/_shared/chunk-OOPRYBMH.js";
import {
  metaTitlePostfix
} from "/build/_shared/chunk-SGR6W5H7.js";
import {
  number_input_default
} from "/build/_shared/chunk-A76BYB4T.js";
import "/build/_shared/chunk-PC7DKCCK.js";
import {
  require_db
} from "/build/_shared/chunk-LFDIS6R5.js";
import {
  ContentCard
} from "/build/_shared/chunk-MLCWLZAX.js";
import {
  createSelector,
  updateHadQuan,
  useAppDispatch,
  useAppSelector
} from "/build/_shared/chunk-PDABV4SV.js";
import {
  FormProvider,
  useForm
} from "/build/_shared/chunk-7RAIFTL2.js";
import "/build/_shared/chunk-UN6WIT2S.js";
import "/build/_shared/chunk-ZWAGDIK3.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import "/build/_shared/chunk-SH4AKRQ3.js";
import {
  Outlet,
  require_jsx_dev_runtime,
  require_react,
  useLoaderData
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/basket/basket-table/index.tsx
var import_react3 = __toESM(require_react());

// app/components/basket/basket-table/table-row.tsx
var import_react2 = __toESM(require_react());

// app/components/basket/basket-table/table-row-form.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function TableRowForm({
  value,
  unit,
  setInputValue,
  isDeleted,
  hasSetBtn,
  defaultValue
}) {
  const methods = useForm({
    mode: "onChange"
  });
  const { reset, watch } = methods;
  (0, import_react.useEffect)(() => {
    if (defaultValue) {
      reset({ input: defaultValue });
      console.log(defaultValue);
    }
  }, [defaultValue, reset]);
  (0, import_react.useEffect)(() => {
    const subscription = watch((v) => {
      if (v.input) {
        setInputValue(v.input);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [setInputValue, watch]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FormProvider, { ...methods, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { className: "relative flex items-stretch ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    number_input_default,
    {
      registerName: "input",
      maxValue: value,
      showErrors: true,
      unit
    },
    void 0,
    false,
    {
      fileName: "app/components/basket/basket-table/table-row-form.tsx",
      lineNumber: 48,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "app/components/basket/basket-table/table-row-form.tsx",
    lineNumber: 47,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/basket/basket-table/table-row-form.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}

// app/components/basket/basket-table/table-row.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function TableRow({
  name,
  value,
  unit,
  localBasket
}) {
  var _a;
  const [isDeleted, setIsDeleted] = (0, import_react2.useState)(false);
  const dispatch = useAppDispatch();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: `relative table-row-group text-secondary `, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "table-row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "table-cell px-4 first:pl-8 last:pr-8 py-3 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: name }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 34,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "div",
        {
          className: `
          relative 
          table-cell px-4 first:pl-8 last:pr-8 
          py-3 
          text-secondary font-bold 
          text-lg
          `,
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "[background:linear-gradient(to_bottom,transparent_50%,#fbbf2490_50%)]", children: value * localBasket.servings - (isNaN(localBasket.hadQant) ? 0 : localBasket.hadQant) + unit }, void 0, false, {
            fileName: "app/components/basket/basket-table/table-row.tsx",
            lineNumber: 46,
            columnNumber: 11
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/components/basket/basket-table/table-row.tsx",
          lineNumber: 37,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "table-cell px-4 first:pl-8 last:pr-8 py-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "", children: value * localBasket.servings + unit }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 56,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "table-cell px-4 first:pl-8 last:pr-8 py-3 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        TableRowForm,
        {
          ...{
            setInputValue: (value2) => void dispatch(updateHadQuan({ name, hadQant: value2 })),
            defaultValue: (_a = localBasket == null ? void 0 : localBasket.hadQant) != null ? _a : 0,
            isDeleted,
            value,
            unit
          }
        },
        void 0,
        false,
        {
          fileName: "app/components/basket/basket-table/table-row.tsx",
          lineNumber: 62,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "table-cell px-4 first:pl-8 last:pr-8 align-middle py-3 text-gray-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "button",
        {
          className: "flex p-1",
          onClick: () => {
            setIsDeleted((prev) => !prev);
          },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "span",
            {
              className: `material-symbols-outlined leading-none ${isDeleted ? "text-green-500" : "text-red-600"}`,
              children: isDeleted ? "undo" : "delete"
            },
            void 0,
            false,
            {
              fileName: "app/components/basket/basket-table/table-row.tsx",
              lineNumber: 92,
              columnNumber: 13
            },
            this
          )
        },
        void 0,
        false,
        {
          fileName: "app/components/basket/basket-table/table-row.tsx",
          lineNumber: 86,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/basket/basket-table/table-row.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    isDeleted && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "div",
      {
        className: "absolute top-0 left-0  h-full bg-white/50 mix-blend-screen",
        style: { width: "calc(100% - 56px)" }
      },
      void 0,
      false,
      {
        fileName: "app/components/basket/basket-table/table-row.tsx",
        lineNumber: 103,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/components/basket/basket-table/table-row.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

// app/store/selectBasket.ts
var ingredientsSelector = (state) => state.ingredients;
var recipeServingsSelector = (state) => state.recipeServings;
var selectBasket = () => createSelector(
  ingredientsSelector,
  recipeServingsSelector,
  (ingredients, recipes) => {
    const basket = ingredients.map((ingredient) => {
      const newServings = ingredient.recipeIds.map(
        (id) => {
          var _a, _b;
          return (_b = (_a = recipes.find((item) => item.recipeId === id)) == null ? void 0 : _a.servings) != null ? _b : 0;
        }
      );
      return {
        name: ingredient.name,
        hadQant: ingredient.hadQant,
        servings: newServings.length > 0 ? newServings.reduce((a, b) => a + b, 0) : 0
      };
    });
    return basket;
  }
);

// app/components/basket/basket-table/index.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
function BasketTable({
  data
}) {
  const selectBasketMemo = (0, import_react3.useMemo)(selectBasket, []);
  const basket = useAppSelector(selectBasketMemo);
  const ingredients = useAppSelector((state) => state.ingredients);
  const recipeServings = useAppSelector((state) => state.recipeServings);
  const dispatch = useAppDispatch();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table table-auto w-full text-black ", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-header-group font-medium ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-row ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-cell  text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200", children: "INGREDIENTS" }, void 0, false, {
        fileName: "app/components/basket/basket-table/index.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-cell w-28 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200", children: "NEED" }, void 0, false, {
        fileName: "app/components/basket/basket-table/index.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200", children: "REQUIRE" }, void 0, false, {
        fileName: "app/components/basket/basket-table/index.tsx",
        lineNumber: 122,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200", children: "HAVE" }, void 0, false, {
        fileName: "app/components/basket/basket-table/index.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "table-cell w-8 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200" }, void 0, false, {
        fileName: "app/components/basket/basket-table/index.tsx",
        lineNumber: 132,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/basket/basket-table/index.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/basket/basket-table/index.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    data == null ? void 0 : data.map(({ ingredient: { name }, value, unit }, idx) => {
      var _a;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        TableRow,
        {
          ...{
            name,
            value: parseInt(value),
            unit,
            localBasket: (_a = basket.find(
              (ingredient) => ingredient.name === name
            )) != null ? _a : { name, hadQant: 0, servings: 1 }
          }
        },
        `${name}_${idx}`,
        false,
        {
          fileName: "app/components/basket/basket-table/index.tsx",
          lineNumber: 136,
          columnNumber: 9
        },
        this
      );
    })
  ] }, void 0, true, {
    fileName: "app/components/basket/basket-table/index.tsx",
    lineNumber: 112,
    columnNumber: 5
  }, this);
}

// app/routes/basket.tsx
var import_db = __toESM(require_db());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
var meta = () => ({
  charset: "utf-8",
  title: "Basket" + metaTitlePostfix
});
function BasketIndex() {
  const data = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "layout-py layout-px", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "max-w-6xl mx-auto grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[3fr,2fr] gap-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { children: "Basket" }, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "[grid-area:ingredients] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ContentCard, { className: "!p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(BasketTable, { data: data == null ? void 0 : data.ingredients }, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 89,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 88,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ContentCard, { className: "[grid-area:sideList] flex flex-col gap-8 h-full ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 94,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/basket.tsx",
      lineNumber: 93,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/basket.tsx",
    lineNumber: 84,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/basket.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}
export {
  BasketIndex as default,
  meta
};
//# sourceMappingURL=/build/routes/basket-W6VVG6AY.js.map
