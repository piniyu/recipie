import {
  SiderContext
} from "/build/_shared/chunk-PC7DKCCK.js";
import {
  img1_default
} from "/build/_shared/chunk-SH4AKRQ3.js";
import {
  Link2 as Link,
  require_jsx_dev_runtime,
  require_react,
  useFetcher,
  useLoaderData,
  useParams
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/recipe.$recipeId.modal.tsx
var import_react2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var ModalContainer = ({
  children,
  onPrevious,
  onNext,
  showNext,
  showPrevious
}) => {
  const { recipeId } = useParams();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "div",
    {
      className: "h-screen bg-gray-100 overflow-auto [scroll-snap-type:y_mandatory]",
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            onClick: onPrevious,
            className: `
        fixed 
        w-24 
        btn-ghost btn-sm 
        top-2 left-[calc(50vw_-_48px)] 
        flex-col 
        bg-gray-200/70 backdrop-blur-md 
        text-gray-500 
        select-none
        hover:animate-bounce-y-down
        ${showPrevious ? "" : "pointer-events-none invisible"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded block", children: "arrow_upward" }, void 0, false, {
                fileName: "app/routes/recipe.$recipeId.modal.tsx",
                lineNumber: 139,
                columnNumber: 9
              }, this),
              "Previous"
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/recipe.$recipeId.modal.tsx",
            lineNumber: 125,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            onClick: onNext,
            id: "next_btn",
            className: `
        fixed 
        w-24 
        btn-ghost btn-md 
        flex-col 
        bottom-2 left-[calc(50vw_-_48px)]
        bg-gray-200/70 backdrop-blur-md 
        text-black
        select-none 
        hover:animate-bounce-y-up
        ${showNext ? "" : "pointer-events-none invisible"}`,
            children: [
              "Next",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded block", children: "arrow_downward" }, void 0, false, {
                fileName: "app/routes/recipe.$recipeId.modal.tsx",
                lineNumber: 158,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/recipe.$recipeId.modal.tsx",
            lineNumber: 142,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: `/recipe/${recipeId}`,
            className: "fixed w-fit top-0 right-[10px] btn-ghost btn-md justify-end text-gray-500 ",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded", children: "close" }, void 0, false, {
              fileName: "app/routes/recipe.$recipeId.modal.tsx",
              lineNumber: 164,
              columnNumber: 9
            }, this)
          },
          void 0,
          false,
          {
            fileName: "app/routes/recipe.$recipeId.modal.tsx",
            lineNumber: 160,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "app/routes/recipe.$recipeId.modal.tsx",
      lineNumber: 120,
      columnNumber: 5
    },
    this
  );
};
function RecipeModal() {
  const { setHidden } = (0, import_react2.useContext)(SiderContext);
  const data = useLoaderData();
  const [stepData, setStepData] = (0, import_react3.useState)(data);
  const [stepInView, setStepInView] = (0, import_react3.useState)(1);
  const [maxStep, setMaxStep] = (0, import_react3.useState)(Infinity);
  const fetcher = useFetcher();
  const [shouldFetch, setShouldFetch] = (0, import_react3.useState)(true);
  const [hasData, setHasData] = (0, import_react3.useState)(true);
  const [targets, setTergets] = (0, import_react3.useState)([]);
  const [nextStep, setNextStep] = (0, import_react3.useState)(3);
  (0, import_react2.useEffect)(() => {
    setHidden(true);
    return () => {
      setHidden(false);
    };
  }, [setHidden]);
  const targetRef = (0, import_react2.useCallback)((node) => {
    if (node !== null) {
      const idx = node.getAttribute("data-key");
      if (idx) {
        setTergets((prev) => {
          const arr = [...prev];
          arr[+idx] = node;
          return arr;
        });
      }
    }
  }, []);
  (0, import_react2.useEffect)(() => {
    const options = {
      threshold: 1
    };
    const onIntersect = (entries, observer2) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const key = entry.target.getAttribute("data-key");
          if (key && +key === targets.length - 2 && +key % 2 === 0 && +key !== maxStep - 1 && maxStep === Infinity) {
            console.log("fetch", nextStep);
            setShouldFetch(true);
            setNextStep(parseInt(key) + 3);
          }
          if (key) {
            setStepInView(parseInt(key) + 1);
          }
        }
      });
    };
    const observer = new IntersectionObserver(onIntersect, options);
    if (targets.length > 0) {
      targets.forEach((target) => {
        observer.observe(target);
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [maxStep, targets, targets.length]);
  (0, import_react2.useEffect)(() => {
    if (!shouldFetch || !hasData) {
      return;
    }
    fetcher.load(`/recipe/modal?step=${nextStep}`);
    setShouldFetch(false);
  }, [fetcher, hasData, nextStep, shouldFetch]);
  (0, import_react2.useEffect)(() => {
    if (fetcher.data && fetcher.data[0] === null) {
      setHasData(false);
      setShouldFetch(false);
      return;
    }
    if (fetcher.data && fetcher.data[1] === null) {
      setStepData((prev) => [...prev, fetcher.data[0]]);
      setHasData(false);
      setShouldFetch(false);
      return;
    }
    if (fetcher.data) {
      setStepData((prev) => [...prev, ...fetcher.data]);
    }
  }, [fetcher.data]);
  (0, import_react2.useEffect)(() => {
    if (!hasData) {
      setMaxStep(targets.length);
    }
  }, [hasData, targets.length]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    ModalContainer,
    {
      showNext: stepInView !== maxStep,
      showPrevious: stepInView !== 1,
      onPrevious: () => {
        targets[stepInView - 2].scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        setStepInView((prev) => prev - 1);
      },
      onNext: () => {
        targets[stepInView].scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        setStepInView((prev) => prev + 1);
      },
      children: stepData == null ? void 0 : stepData.map(({ id, title, steps }, idx) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            "data-key": idx,
            className: "max-w-7xl h-screen flex justify-center mx-auto space-x-6 scroll-m-0 py-20 px-8 [scroll-snap-align:center] ",
            ref: targetRef,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full  flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: `flex-1 w-full h-full max-h-[70vh] p-5 rounded-2xl bg-white shadow-2xl `,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "img",
                    {
                      src: img1_default,
                      alt: "step-img",
                      className: "w-full h-full object-cover object-center rounded-2xl"
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/routes/recipe.$recipeId.modal.tsx",
                      lineNumber: 321,
                      columnNumber: 17
                    },
                    this
                  )
                },
                void 0,
                false,
                {
                  fileName: "app/routes/recipe.$recipeId.modal.tsx",
                  lineNumber: 317,
                  columnNumber: 15
                },
                this
              ) }, void 0, false, {
                fileName: "app/routes/recipe.$recipeId.modal.tsx",
                lineNumber: 316,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " w-2/5 flex-shrink-0 flex flex-col", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-y-auto flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 mb-14 text-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-primary-400 font-medium", children: [
                    "STEP ",
                    id
                  ] }, void 0, true, {
                    fileName: "app/routes/recipe.$recipeId.modal.tsx",
                    lineNumber: 331,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-black", children: title }, void 0, false, {
                    fileName: "app/routes/recipe.$recipeId.modal.tsx",
                    lineNumber: 332,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/recipe.$recipeId.modal.tsx",
                  lineNumber: 330,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: " pl-14 pr-14 list-disc text-black marker:text-gray-300 marker:text-xl marker:leading-none", children: steps.map(({ text, id: id2 }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "relative left-1 ", children: text }, void 0, false, {
                  fileName: "app/routes/recipe.$recipeId.modal.tsx",
                  lineNumber: 337,
                  columnNumber: 23
                }, this) }, id2, false, {
                  fileName: "app/routes/recipe.$recipeId.modal.tsx",
                  lineNumber: 336,
                  columnNumber: 21
                }, this)) }, void 0, false, {
                  fileName: "app/routes/recipe.$recipeId.modal.tsx",
                  lineNumber: 334,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/recipe.$recipeId.modal.tsx",
                lineNumber: 329,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "app/routes/recipe.$recipeId.modal.tsx",
                lineNumber: 328,
                columnNumber: 13
              }, this)
            ]
          },
          id,
          true,
          {
            fileName: "app/routes/recipe.$recipeId.modal.tsx",
            lineNumber: 310,
            columnNumber: 11
          },
          this
        );
      })
    },
    void 0,
    false,
    {
      fileName: "app/routes/recipe.$recipeId.modal.tsx",
      lineNumber: 290,
      columnNumber: 5
    },
    this
  );
}
export {
  RecipeModal as default
};
//# sourceMappingURL=/build/routes/recipe.$recipeId.modal-6J756PTX.js.map
