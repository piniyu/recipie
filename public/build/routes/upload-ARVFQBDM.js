import {
  require_session
} from "/build/_shared/chunk-OOPRYBMH.js";
import {
  v4_default
} from "/build/_shared/chunk-OXVWDGG7.js";
import {
  ContentCard
} from "/build/_shared/chunk-MLCWLZAX.js";
import {
  addStep,
  deleteStep,
  useAppDispatch,
  useAppSelector
} from "/build/_shared/chunk-PDABV4SV.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import {
  Link2 as Link,
  NavLink,
  Outlet,
  require_jsx_dev_runtime,
  require_react,
  useNavigate,
  useParams
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/upload.tsx
var import_react2 = __toESM(require_react());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var defaultSideList = [
  { value: "Details", route: "./details" },
  { value: "Ingredients", route: "./ingredients" }
];
var defaultStepList = [
  {
    value: "Steps"
  },
  { stepId: "1", value: `title`, route: `./1` }
];
var SideList = ({
  route,
  value,
  idx,
  stepId,
  onDelete
}) => {
  if (!route) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "li",
      {
        className: "sider-item px-0 text-sm uppercase tracking-wider text-gray-400",
        children: value
      },
      `${value}_${route}`,
      false,
      {
        fileName: "app/routes/upload.tsx",
        lineNumber: 42,
        columnNumber: 7
      },
      this
    );
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "relative flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      NavLink,
      {
        to: route,
        className: ({ isActive }) => `
        
                        sider-item 
                        sider-item-gray 
                      ${isActive ? "bg-primary/10 " : "text-black"}
                      `,
        children: [
          stepId ? idx + 1 + " . " : null,
          value
        ]
      },
      void 0,
      true,
      {
        fileName: "app/routes/upload.tsx",
        lineNumber: 52,
        columnNumber: 7
      },
      this
    ),
    onDelete && stepId ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        className: "icon-btn-ui absolute right-8 top-2 z-50 flex h-fit rounded-full p-1 text-red-300 hover:bg-red-500 hover:text-white",
        onClick: () => {
          onDelete(stepId);
        },
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "span",
          {
            className: "material-symbols-outlined leading-none ",
            style: { fontVariationSettings: '"GRAD" -25' },
            children: "delete"
          },
          void 0,
          false,
          {
            fileName: "app/routes/upload.tsx",
            lineNumber: 72,
            columnNumber: 11
          },
          this
        )
      },
      void 0,
      false,
      {
        fileName: "app/routes/upload.tsx",
        lineNumber: 65,
        columnNumber: 9
      },
      this
    ) : null
  ] }, `${value}_${idx}`, true, {
    fileName: "app/routes/upload.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
};
function Upload() {
  const { stepIdx } = useParams();
  const [sideList, setSideList] = (0, import_react2.useState)(defaultSideList);
  const stepForms = useAppSelector((state) => state.stepForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "layout-px mx-auto max-w-6xl space-y-6 py-14", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "flex items-center justify-between  text-black ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "", children: "Upload Recipe" }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn-secondary btn-sm", children: "Public" }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 137,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/upload.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ContentCard, { className: "flex max-h-[700px] !py-0 !px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex w-full flex-1 space-x-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-60 border-r border-gray-200 py-6 ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "flex h-full flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex-1  overflow-auto", children: [
          defaultSideList.map(({ value, route }, idx) => {
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              SideList,
              {
                route,
                value,
                idx
              },
              `${value}_${idx}`,
              false,
              {
                fileName: "app/routes/upload.tsx",
                lineNumber: 148,
                columnNumber: 21
              },
              this
            );
          }),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SideList, { value: "Steps", idx: 999 }, void 0, false, {
            fileName: "app/routes/upload.tsx",
            lineNumber: 156,
            columnNumber: 17
          }, this),
          stepForms.length > 0 ? stepForms.map(({ title, id }, idx) => {
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              SideList,
              {
                route: `/upload/${idx + 1}`,
                value: title,
                stepId: id,
                idx,
                onDelete: () => {
                  if (stepIdx && +stepIdx === idx + 1) {
                    navigate(`/upload/${idx}`);
                  } else if (stepIdx && +stepIdx > idx + 1) {
                    navigate(`/upload/${+stepIdx - 1}`);
                  }
                  dispatch(deleteStep({ id }));
                }
              },
              `${title}_${idx}`,
              false,
              {
                fileName: "app/routes/upload.tsx",
                lineNumber: 160,
                columnNumber: 25
              },
              this
            );
          }) : defaultStepList.map(({ value, stepId, route }, idx) => {
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              SideList,
              {
                route,
                value,
                stepId,
                idx,
                onDelete: (stepId2) => {
                  navigate(`/upload/${idx}`);
                  dispatch(deleteStep({ id: stepId2 }));
                }
              },
              `${value}_${idx}`,
              false,
              {
                fileName: "app/routes/upload.tsx",
                lineNumber: 179,
                columnNumber: 25
              },
              this
            );
          })
        ] }, void 0, true, {
          fileName: "app/routes/upload.tsx",
          lineNumber: 145,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex pt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: `/upload/${stepForms.length > 0 ? stepForms.length + 1 : defaultStepList.length + 1}`,
            className: "btn-sm btn-secondary sider-item flex-1  ",
            onClick: () => {
              dispatch(
                addStep({
                  title: "",
                  methods: [{ timeStamp: "", content: "" }],
                  id: v4_default()
                })
              );
            },
            children: "Add a step"
          },
          void 0,
          false,
          {
            fileName: "app/routes/upload.tsx",
            lineNumber: 194,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "app/routes/upload.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 144,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 143,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-1 py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 overflow-auto pr-9", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 218,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 217,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/upload.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/upload.tsx",
      lineNumber: 142,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/upload.tsx",
      lineNumber: 141,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/upload.tsx",
    lineNumber: 132,
    columnNumber: 5
  }, this);
}
var ErrorBoundary = ({ error }) => {
  const navigate = useNavigate();
  console.log("error");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Oops! Something went wrong!" }, void 0, false, {
      fileName: "app/routes/upload.tsx",
      lineNumber: 233,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "button",
      {
        onClick: () => {
          navigate(-1);
        },
        children: "Go back"
      },
      void 0,
      false,
      {
        fileName: "app/routes/upload.tsx",
        lineNumber: 234,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", children: "Home page" }, void 0, false, {
      fileName: "app/routes/upload.tsx",
      lineNumber: 241,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/upload.tsx",
    lineNumber: 232,
    columnNumber: 5
  }, this);
};
export {
  ErrorBoundary,
  Upload as default
};
//# sourceMappingURL=/build/routes/upload-ARVFQBDM.js.map
