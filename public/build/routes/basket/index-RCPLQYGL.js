import {
  CardListItem,
  recipe_servings_form_default
} from "/build/_shared/chunk-A76BYB4T.js";
import {
  require_db
} from "/build/_shared/chunk-LFDIS6R5.js";
import {
  addIngredient,
  addRecipeId,
  addRecipeServings,
  deleteRecipeId,
  deleteRecipeServings,
  useAppDispatch,
  useAppSelector
} from "/build/_shared/chunk-PDABV4SV.js";
import "/build/_shared/chunk-7RAIFTL2.js";
import {
  SearchBar
} from "/build/_shared/chunk-BC24VAOR.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import "/build/_shared/chunk-SH4AKRQ3.js";
import {
  require_jsx_dev_runtime,
  require_react,
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/basket/index.tsx
var import_react2 = __toESM(require_react());
var import_db = __toESM(require_db());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function BasketSidePanel() {
  var _a;
  const data = useLoaderData();
  const fetcher = useFetcher();
  const servings = useAppSelector((state) => state.recipeServings);
  const dispatch = useAppDispatch();
  const [resList, setResList] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    data == null ? void 0 : data.basket.recipes.forEach(({ id, ingredientsNum }) => {
      dispatch(addRecipeServings({ recipeId: id, servings: 1 }));
      ingredientsNum.forEach(({ ingredient }) => {
        dispatch(
          addIngredient({ name: ingredient.name, recipeIds: [id], hadQant: 0 })
        );
        dispatch(addRecipeId({ name: ingredient.name, recipeId: id }));
      });
    });
  }, [data == null ? void 0 : data.basket.recipes, dispatch]);
  const onSearch = (inputValue) => {
    fetcher.load(`/basket?index&search=${inputValue}`);
  };
  (0, import_react2.useEffect)(() => {
    var _a2;
    if ((_a2 = fetcher.data) == null ? void 0 : _a2.list) {
      setResList(fetcher.data.list);
    }
  }, [(_a = fetcher.data) == null ? void 0 : _a.list]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      SearchBar,
      {
        placeholder: "Basket Search",
        border: true,
        fetch: onSearch,
        list: resList == null ? void 0 : resList.map((item) => ({ id: "", value: item }))
      },
      void 0,
      false,
      {
        fileName: "app/routes/basket/index.tsx",
        lineNumber: 124,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "mb-4 font-bold text-black", children: "Recipes in basket" }, void 0, false, {
        fileName: "app/routes/basket/index.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      (data == null ? void 0 : data.basket.recipes) && (data == null ? void 0 : data.basket.recipes.map(({ title, id, ingredientsNum }, idx) => {
        var _a2;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          CardListItem,
          {
            title,
            recipeId: id,
            onDelete: (e) => {
              ingredientsNum.forEach((item) => {
                dispatch(
                  deleteRecipeId({
                    name: item.ingredient.name,
                    recipeId: id
                  })
                );
              });
              dispatch(deleteRecipeServings({ recipeId: id }));
              fetcher.submit(e.currentTarget, {
                action: "/basket?index"
              });
            },
            subTitle: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              recipe_servings_form_default,
              {
                recipeId: id,
                defaultValue: (_a2 = servings.find((item) => item.recipeId === id)) == null ? void 0 : _a2.servings
              },
              void 0,
              false,
              {
                fileName: "app/routes/basket/index.tsx",
                lineNumber: 155,
                columnNumber: 19
              },
              this
            )
          },
          `${title}_${idx}`,
          false,
          {
            fileName: "app/routes/basket/index.tsx",
            lineNumber: 136,
            columnNumber: 15
          },
          this
        );
      }))
    ] }, void 0, true, {
      fileName: "app/routes/basket/index.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/basket/index.tsx",
    lineNumber: 123,
    columnNumber: 5
  }, this);
}
export {
  BasketSidePanel as default
};
//# sourceMappingURL=/build/routes/basket/index-RCPLQYGL.js.map
