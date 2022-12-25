import {
  CardListItem,
  recipe_servings_form_default
} from "/build/_shared/chunk-A76BYB4T.js";
import {
  SiderContext,
  SiderProvider
} from "/build/_shared/chunk-PC7DKCCK.js";
import {
  Provider_default,
  persistor,
  store,
  useAppSelector
} from "/build/_shared/chunk-PDABV4SV.js";
import {
  DropdownMenu
} from "/build/_shared/chunk-UN6WIT2S.js";
import {
  AuthCheck,
  Modal,
  userContext
} from "/build/_shared/chunk-ZWAGDIK3.js";
import {
  Link2 as Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  require_jsx_dev_runtime,
  require_react,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
  useSubmit
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// empty-module:./utils/db.server
var require_db = __commonJS({
  "empty-module:./utils/db.server"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/session.server
var require_session = __commonJS({
  "empty-module:./utils/session.server"(exports, module) {
    module.exports = {};
  }
});

// app/styles/app.css
var app_default = "/build/_assets/app-V5MAPIXH.css";

// app/components/layout/index.tsx
var import_react3 = __toESM(require_react());

// app/components/sider/sider.tsx
var import_react2 = __toESM(require_react());

// app/icons/basket.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var SvgIonBasketOutline = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
  "svg",
  {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "path",
        {
          d: "M3.206 9a.955.955 0 0 0-.956.947.838.838 0 0 0 .038.258L4.71 18.75a1.897 1.897 0 0 0 1.833 1.383h10.912a1.916 1.916 0 0 0 1.842-1.383l2.424-8.545.028-.258A.955.955 0 0 0 20.794 9H3.206Zm9.062 7.503a1.973 1.973 0 1 1 1.982-1.972 1.981 1.981 0 0 1-1.982 1.972Z",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        void 0,
        false,
        {
          fileName: "app/icons/basket.tsx",
          lineNumber: 13,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "path",
        {
          d: "M7.5 9 12 3l4.5 6",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinejoin: "round"
        },
        void 0,
        false,
        {
          fileName: "app/icons/basket.tsx",
          lineNumber: 19,
          columnNumber: 5
        },
        this
      )
    ]
  },
  void 0,
  true,
  {
    fileName: "app/icons/basket.tsx",
    lineNumber: 5,
    columnNumber: 3
  },
  this
);
var basket_default = SvgIonBasketOutline;

// app/icons/favorite.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
var SvgAntDesignHeartOutlined = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
  "svg",
  {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "path",
      {
        d: "M21.633 6.647a6.093 6.093 0 0 0-1.334-1.94A6.219 6.219 0 0 0 15.93 2.93 6.26 6.26 0 0 0 12 4.315 6.26 6.26 0 0 0 8.07 2.93 6.219 6.219 0 0 0 3.7 4.706a6.057 6.057 0 0 0-1.825 4.33c0 .78.16 1.593.476 2.42.265.692.644 1.409 1.13 2.133.768 1.146 1.825 2.341 3.138 3.553a35.071 35.071 0 0 0 4.42 3.453l.556.356a.753.753 0 0 0 .808 0l.556-.357a35.517 35.517 0 0 0 4.42-3.452c1.312-1.211 2.37-2.407 3.138-3.553.485-.724.867-1.441 1.13-2.133.316-.827.476-1.64.476-2.42a5.968 5.968 0 0 0-.49-2.39ZM12 19.097S3.656 13.75 3.656 9.035c0-2.388 1.976-4.324 4.414-4.324 1.713 0 3.199.956 3.93 2.353a4.426 4.426 0 0 1 3.93-2.353c2.438 0 4.414 1.936 4.414 4.324 0 4.716-8.344 10.062-8.344 10.062Z",
        fill: "currentColor"
      },
      void 0,
      false,
      {
        fileName: "app/icons/favorite.tsx",
        lineNumber: 13,
        columnNumber: 5
      },
      this
    )
  },
  void 0,
  false,
  {
    fileName: "app/icons/favorite.tsx",
    lineNumber: 5,
    columnNumber: 3
  },
  this
);
var favorite_default = SvgAntDesignHeartOutlined;

// app/icons/recipe.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
var SvgFluentFood24Filled = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
  "svg",
  {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "path",
      {
        d: "M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5Zm-6 0a1 1 0 0 1 .993.883L13 4v5a4.002 4.002 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4.002 4.002 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1Z",
        fill: "currentColor"
      },
      void 0,
      false,
      {
        fileName: "app/icons/recipe.tsx",
        lineNumber: 13,
        columnNumber: 5
      },
      this
    )
  },
  void 0,
  false,
  {
    fileName: "app/icons/recipe.tsx",
    lineNumber: 5,
    columnNumber: 3
  },
  this
);
var recipe_default = SvgFluentFood24Filled;

// app/icons/logo.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
var SvgLogo = (props) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
  "svg",
  {
    viewBox: "0 0 92 31",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        "path",
        {
          d: "M16.28 25.28a4.721 4.721 0 0 1-2.8-.896c-.84-.616-1.717-1.67-2.632-3.164l-2.8-4.676h-1.12V25H3.26V10.16c0-.952-.13-1.652-.392-2.1-.261-.467-.784-.7-1.568-.7h-.28v-.84h7.728c1.941 0 3.687.355 5.236 1.064 1.55.71 2.324 2.072 2.324 4.088 0 2.333-1.512 3.883-4.536 4.648l2.94 4.9c1.101 1.848 2.259 2.875 3.472 3.08v.7c-.15.075-.42.14-.812.196a7.754 7.754 0 0 1-1.092.084Zm-7.672-9.856c1.045 0 1.932-.308 2.66-.924.747-.635 1.12-1.624 1.12-2.968 0-1.325-.364-2.305-1.092-2.94a3.757 3.757 0 0 0-2.548-.952c-.541 0-.961.037-1.26.112l-.56.084v7.588h1.68Zm16.503 9.856c-1.288 0-2.417-.299-3.388-.896a6.198 6.198 0 0 1-2.268-2.436c-.522-1.045-.784-2.221-.784-3.528 0-1.456.262-2.697.784-3.724.542-1.027 1.279-1.801 2.212-2.324.934-.541 1.988-.812 3.164-.812 1.158 0 2.203.233 3.136.7a5.43 5.43 0 0 1 2.212 1.988c.542.84.812 1.81.812 2.912 0 .355-.018.756-.056 1.204l-.056.56h-8.428c0 1.773.27 3.07.812 3.892.542.803 1.298 1.204 2.268 1.204.896 0 1.643-.196 2.24-.588.616-.41 1.204-.99 1.764-1.736l.868.644a7.305 7.305 0 0 1-2.044 2.1c-.802.56-1.885.84-3.248.84Zm2.1-7.616c0-1.755-.205-2.996-.616-3.724-.41-.747-.998-1.12-1.764-1.12-.71 0-1.288.383-1.736 1.148-.43.747-.644 1.979-.644 3.696h4.76ZM39.61 25.28c-1.437 0-2.66-.308-3.668-.924a6.073 6.073 0 0 1-2.296-2.464c-.504-1.045-.756-2.203-.756-3.472 0-1.27.252-2.417.756-3.444a6.03 6.03 0 0 1 2.296-2.492c1.008-.616 2.231-.924 3.668-.924 2.24 0 3.687.327 4.34.98.318.317.514.737.588 1.26.075.523.112 1.41.112 2.66h-.84c-.074-1.176-.438-2.072-1.092-2.688-.653-.635-1.549-.952-2.688-.952-1.026 0-1.848.476-2.464 1.428-.597.933-.896 2.324-.896 4.172 0 3.733 1.167 5.6 3.5 5.6.896 0 1.643-.196 2.24-.588.616-.41 1.204-.99 1.764-1.736l.868.644a7.303 7.303 0 0 1-2.044 2.1c-.821.56-1.95.84-3.388.84Zm10.195-14.952c-.672 0-1.195-.205-1.568-.616-.355-.41-.532-.915-.532-1.512 0-.485.14-.868.42-1.148.299-.28.672-.42 1.12-.42.672 0 1.185.205 1.54.616.373.41.56.915.56 1.512 0 .485-.15.868-.448 1.148-.28.28-.644.42-1.092.42Zm-1.82 5.152c0-.952-.13-1.652-.392-2.1-.261-.467-.784-.7-1.568-.7h-.28v-.84h3.36c.672 0 1.185.112 1.54.336.355.224.607.597.756 1.12.15.504.224 1.232.224 2.184V25h-3.64v-9.52Z",
          className: "fill-black"
        },
        void 0,
        false,
        {
          fileName: "app/icons/logo.tsx",
          lineNumber: 11,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        "path",
        {
          d: "M55.84 15.48c0-.952-.13-1.652-.392-2.1-.243-.467-.756-.7-1.54-.7h-.28v-.84H56.4c.653 0 1.157.093 1.512.28.355.168.635.467.84.896 1.101-.97 2.37-1.456 3.808-1.456 1.885 0 3.332.644 4.34 1.932 1.027 1.27 1.54 2.912 1.54 4.928s-.523 3.668-1.568 4.956c-1.027 1.27-2.51 1.904-4.452 1.904-.765 0-1.484-.14-2.156-.42a3.128 3.128 0 0 1-.784-.42v5.88h-3.64V15.48Zm6.02 8.54c1.867 0 2.8-1.867 2.8-5.6 0-1.717-.215-3.08-.644-4.088-.43-1.008-1.101-1.512-2.016-1.512-1.045 0-1.95.383-2.716 1.148l.084.392c.075.224.112.541.112.952v7.868c.205.168.43.308.672.42a3.56 3.56 0 0 0 1.708.42ZM73.52 10.328c-.672 0-1.195-.205-1.568-.616-.355-.41-.532-.915-.532-1.512 0-.485.14-.868.42-1.148.299-.28.672-.42 1.12-.42.672 0 1.185.205 1.54.616.373.41.56.915.56 1.512 0 .485-.15.868-.448 1.148-.28.28-.644.42-1.092.42Zm-1.82 5.152c0-.952-.13-1.652-.392-2.1-.261-.467-.784-.7-1.568-.7h-.28v-.84h3.36c.672 0 1.185.112 1.54.336.355.224.607.597.756 1.12.15.504.224 1.232.224 2.184V25h-3.64v-9.52Zm12.729 9.8c-1.288 0-2.418-.299-3.388-.896a6.198 6.198 0 0 1-2.268-2.436c-.523-1.045-.784-2.221-.784-3.528 0-1.456.261-2.697.784-3.724.541-1.027 1.278-1.801 2.212-2.324.933-.541 1.988-.812 3.164-.812 1.157 0 2.202.233 3.136.7a5.43 5.43 0 0 1 2.212 1.988c.541.84.812 1.81.812 2.912 0 .355-.019.756-.056 1.204l-.056.56h-8.428c0 1.773.27 3.07.812 3.892.541.803 1.297 1.204 2.268 1.204.896 0 1.642-.196 2.24-.588.616-.41 1.204-.99 1.764-1.736l.868.644a7.305 7.305 0 0 1-2.044 2.1c-.803.56-1.886.84-3.248.84Zm2.1-7.616c0-1.755-.206-2.996-.616-3.724-.411-.747-.999-1.12-1.764-1.12-.71 0-1.288.383-1.736 1.148-.43.747-.644 1.979-.644 3.696h4.76Z",
          className: "fill-primary"
        },
        void 0,
        false,
        {
          fileName: "app/icons/logo.tsx",
          lineNumber: 16,
          columnNumber: 5
        },
        this
      )
    ]
  },
  void 0,
  true,
  {
    fileName: "app/icons/logo.tsx",
    lineNumber: 5,
    columnNumber: 3
  },
  this
);
var logo_default = SvgLogo;

// app/components/logout-form.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime());
function LogoutForm({
  btnClassName,
  formProps
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("form", { action: "/logout", method: "post", ...formProps, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    "button",
    {
      type: "submit",
      className: `w-full h-full ${btnClassName ? btnClassName : ""}`,
      children: "Logout"
    },
    void 0,
    false,
    {
      fileName: "app/components/logout-form.tsx",
      lineNumber: 12,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "app/components/logout-form.tsx",
    lineNumber: 11,
    columnNumber: 5
  }, this);
}

// app/components/sider/sider.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime());
function SiderItem({
  icon,
  value,
  hasChild = false,
  route
}) {
  if (route) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      NavLink,
      {
        to: route,
        onClick: () => {
        },
        className: ({ isActive }) => `
          sider-item sider-item-svg relative 
          flex
          items-center gap-4 
         
          transition-colors
          hover:bg-primary
          
          ${hasChild ? `
            after:absolute
            after:bottom-0
            after:-ml-9
            after:block
            after:h-[1px]
            after:w-full
            after:bg-white
            after:content-['']
            ` : ""}
          ${isActive ? "  bg-primary" : " text-black "}
          `,
        children: [
          icon,
          value
        ]
      },
      void 0,
      true,
      {
        fileName: "app/components/sider/sider.tsx",
        lineNumber: 30,
        columnNumber: 7
      },
      this
    );
  } else if (typeof value !== "string" && import_react2.default.isValidElement(value)) {
    return value;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    "span",
    {
      className: `
          ml-5 !mt-8 flex 
          select-none items-center
          gap-4 text-sm
          uppercase
          tracking-wider
          text-gray-400
  `,
      children: value
    },
    void 0,
    false,
    {
      fileName: "app/components/sider/sider.tsx",
      lineNumber: 82,
      columnNumber: 5
    },
    this
  );
}
function Sider() {
  const defaultSiderValue = [
    { value: "Pages" },
    { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(recipe_default, {}, void 0, false, {
      fileName: "app/components/sider/sider.tsx",
      lineNumber: 104,
      columnNumber: 13
    }, this), value: "My Recipes", route: "my-recipes" },
    { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(favorite_default, {}, void 0, false, {
      fileName: "app/components/sider/sider.tsx",
      lineNumber: 105,
      columnNumber: 13
    }, this), value: "Favorite", route: "favorite" },
    { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(basket_default, {}, void 0, false, {
      fileName: "app/components/sider/sider.tsx",
      lineNumber: 106,
      columnNumber: 13
    }, this), value: "Basket", route: "basket" },
    { value: "Authentication" }
  ];
  const { hidden, close } = (0, import_react2.useContext)(SiderContext);
  if (hidden) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
    "nav",
    {
      className: `
      fixed top-0 
      z-20 
      flex h-screen 
      w-[255px] 
      flex-shrink-0 flex-col 
      space-y-4 
      overflow-auto 
      bg-white 
      pt-4 
      shadow-xl
      transition-transform
     ${close ? "-translate-x-full" : ""}
     `,
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(NavLink, { to: "/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "sider-item flex h-7 p-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(logo_default, {}, void 0, false, {
          fileName: "app/components/sider/sider.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/components/sider/sider.tsx",
          lineNumber: 132,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "app/components/sider/sider.tsx",
          lineNumber: 131,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex-1 space-y-4", children: [
          defaultSiderValue.map(
            ({ icon, value, children, route, isBtn }, idx) => {
              if (isBtn) {
                return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "sider-item px-0 pb-8", children: route ? /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Link, { to: route, className: "btn-md btn-primary", children: value }, void 0, false, {
                  fileName: "app/components/sider/sider.tsx",
                  lineNumber: 161,
                  columnNumber: 21
                }, this) : value }, idx, false, {
                  fileName: "app/components/sider/sider.tsx",
                  lineNumber: 159,
                  columnNumber: 17
                }, this);
              }
              return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react2.default.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  SiderItem,
                  {
                    ...{
                      value,
                      icon,
                      hasChild: typeof children !== "undefined",
                      route,
                      idx
                    }
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/components/sider/sider.tsx",
                    lineNumber: 172,
                    columnNumber: 17
                  },
                  this
                ),
                children && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-4", children: children.map((child, idx2) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  SiderItem,
                  {
                    icon: child.icon,
                    value: child.value,
                    route: child.route
                  },
                  `${child.value}_${idx2}`,
                  false,
                  {
                    fileName: "app/components/sider/sider.tsx",
                    lineNumber: 184,
                    columnNumber: 23
                  },
                  this
                )) }, void 0, false, {
                  fileName: "app/components/sider/sider.tsx",
                  lineNumber: 182,
                  columnNumber: 19
                }, this)
              ] }, idx, true, {
                fileName: "app/components/sider/sider.tsx",
                lineNumber: 171,
                columnNumber: 15
              }, this);
            }
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(AuthCheck, { loginConfirmModal: false, children: (user) => {
            if (user && user.id !== null) {
              return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                LogoutForm,
                {
                  formProps: { className: "flex items-center" },
                  btnClassName: " gap-4 relative\n          sider-item sider-item-svg \n          text-left\n          transition-colors hover:bg-primary"
                },
                void 0,
                false,
                {
                  fileName: "app/components/sider/sider.tsx",
                  lineNumber: 201,
                  columnNumber: 17
                },
                this
              );
            }
            return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
              SiderItem,
              {
                value: "Login",
                route: `/login?redirectTo=${window ? window.location.href : ""}`
              },
              void 0,
              false,
              {
                fileName: "app/components/sider/sider.tsx",
                lineNumber: 211,
                columnNumber: 15
              },
              this
            );
          } }, void 0, false, {
            fileName: "app/components/sider/sider.tsx",
            lineNumber: 197,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/sider/sider.tsx",
          lineNumber: 154,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/sider/sider.tsx",
      lineNumber: 115,
      columnNumber: 5
    },
    this
  );
}

// app/components/layout/index.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime());
var LayoutChildren = ({ children }) => {
  const { close } = (0, import_react3.useContext)(SiderContext);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: `min-h-screen flex-1 pt-16 ${close ? "" : "pl-[255px]"}`, children }, void 0, false, {
    fileName: "app/components/layout/index.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
};
function Layout({
  children,
  toolbar
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(SiderProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex bg-gray-100", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Sider, {}, void 0, false, {
      fileName: "app/components/layout/index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    toolbar,
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(LayoutChildren, { children }, void 0, false, {
      fileName: "app/components/layout/index.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/layout/index.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/layout/index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/root.tsx
var import_db = __toESM(require_db());

// node_modules/redux-persist/es/integration/react.js
var import_react4 = __toESM(require_react());
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var PersistGate = /* @__PURE__ */ function(_PureComponent) {
  _inherits(PersistGate2, _PureComponent);
  function PersistGate2() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, PersistGate2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PersistGate2)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty(_assertThisInitialized(_this), "state", {
      bootstrapped: false
    });
    _defineProperty(_assertThisInitialized(_this), "_unsubscribe", void 0);
    _defineProperty(_assertThisInitialized(_this), "handlePersistorState", function() {
      var persistor2 = _this.props.persistor;
      var _persistor$getState = persistor2.getState(), bootstrapped = _persistor$getState.bootstrapped;
      if (bootstrapped) {
        if (_this.props.onBeforeLift) {
          Promise.resolve(_this.props.onBeforeLift()).finally(function() {
            return _this.setState({
              bootstrapped: true
            });
          });
        } else {
          _this.setState({
            bootstrapped: true
          });
        }
        _this._unsubscribe && _this._unsubscribe();
      }
    });
    return _this;
  }
  _createClass(PersistGate2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._unsubscribe = this.props.persistor.subscribe(this.handlePersistorState);
      this.handlePersistorState();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unsubscribe && this._unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      if (true) {
        if (typeof this.props.children === "function" && this.props.loading)
          console.error("redux-persist: PersistGate expects either a function child or loading prop, but not both. The loading prop will be ignored.");
      }
      if (typeof this.props.children === "function") {
        return this.props.children(this.state.bootstrapped);
      }
      return this.state.bootstrapped ? this.props.children : this.props.loading;
    }
  }]);
  return PersistGate2;
}(import_react4.PureComponent);
_defineProperty(PersistGate, "defaultProps", {
  children: null,
  loading: null
});

// app/components/layout/basket-modal.tsx
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime());
function BasketModal({
  open,
  onClose,
  basketData
}) {
  const recipes = useAppSelector((state) => state.recipeServings);
  const submit = useSubmit();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
    Modal,
    {
      dialogClassName: "mt-20 backdrop:bg-gray-900/30 ",
      className: "max-w-3xl w-[60vw] max-h-[70vh] p-8 rounded-2xl space-y-6 overflow-auto overscroll-contain",
      open,
      onClose: () => onClose(),
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h2", { children: "Basket" }, void 0, false, {
          fileName: "app/components/layout/basket-modal.tsx",
          lineNumber: 26,
          columnNumber: 7
        }, this),
        (basketData == null ? void 0 : basketData.length) === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "text-gray-400", children: "Basket is empty" }, void 0, false, {
          fileName: "app/components/layout/basket-modal.tsx",
          lineNumber: 28,
          columnNumber: 9
        }, this) : basketData == null ? void 0 : basketData.map(({ id, title }) => {
          var _a;
          return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            CardListItem,
            {
              title,
              recipeId: id,
              onDelete: (e) => submit(e.currentTarget, {
                replace: true
              }),
              subTitle: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
                recipe_servings_form_default,
                {
                  recipeId: id,
                  defaultValue: (_a = recipes.find((item) => id === item.recipeId)) == null ? void 0 : _a.servings
                },
                void 0,
                false,
                {
                  fileName: "app/components/layout/basket-modal.tsx",
                  lineNumber: 42,
                  columnNumber: 15
                },
                this
              )
            },
            id,
            false,
            {
              fileName: "app/components/layout/basket-modal.tsx",
              lineNumber: 31,
              columnNumber: 11
            },
            this
          );
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/layout/basket-modal.tsx",
      lineNumber: 20,
      columnNumber: 5
    },
    this
  );
}

// app/root.tsx
var import_session = __toESM(require_session());

// app/components/layout/toolbar.tsx
var import_react7 = __toESM(require_react());
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime());
var Toolbar = () => {
  const { setClose, close, hidden } = (0, import_react7.useContext)(SiderContext);
  const navigate = useNavigate();
  if (hidden)
    return null;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
    "header",
    {
      className: `fixed z-10 w-screen min-h-[64px] flex items-center bg-inherit ${close ? "" : "pl-[255px]"}`,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center layout-px w-full", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "button",
          {
            className: "icon-btn-sm icon-btn-ui -ml-2",
            onClick: () => {
              setClose((prev) => !prev);
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "span",
              {
                className: "material-symbols-rounded leading-none ",
                style: { fontVariationSettings: '"wght" 300 ' },
                children: "menu"
              },
              void 0,
              false,
              {
                fileName: "app/components/layout/toolbar.tsx",
                lineNumber: 27,
                columnNumber: 11
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "app/components/layout/toolbar.tsx",
            lineNumber: 21,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex-1" }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 34,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Link, { to: "/upload/details", className: "btn-sm btn-secondary mr-4", children: "Uplode Recipe" }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 35,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(AuthCheck, { children: (user) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "button",
          {
            className: "icon-btn-sm icon-btn-ui",
            onClick: () => {
              user && navigate("?basket-panel=true");
            },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "span",
              {
                className: "material-symbols-rounded leading-none ",
                style: { fontVariationSettings: "'wght' 300" },
                children: "shopping_basket"
              },
              void 0,
              false,
              {
                fileName: "app/components/layout/toolbar.tsx",
                lineNumber: 46,
                columnNumber: 15
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "app/components/layout/toolbar.tsx",
            lineNumber: 40,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 38,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "w-[1px] h-[25px] mx-2 bg-gray-300" }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 55,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(AuthCheck, { loginConfirmModal: false, children: (user) => user !== null && user.id !== null && user.email ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          DropdownMenu,
          {
            summary: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", { className: "icon-btn-sm icon-btn-ui", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                "span",
                {
                  className: "material-symbols-rounded leading-none ",
                  style: { fontVariationSettings: "'wght' 300" },
                  children: "account_circle"
                },
                void 0,
                false,
                {
                  fileName: "app/components/layout/toolbar.tsx",
                  lineNumber: 63,
                  columnNumber: 23
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: user.email.split("@")[0] }, void 0, false, {
                fileName: "app/components/layout/toolbar.tsx",
                lineNumber: 69,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/layout/toolbar.tsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            details: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(LogoutForm, { btnClassName: "drop-down-item" }, void 0, false, {
              fileName: "app/components/layout/toolbar.tsx",
              lineNumber: 72,
              columnNumber: 28
            }, this)
          },
          void 0,
          false,
          {
            fileName: "app/components/layout/toolbar.tsx",
            lineNumber: 60,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 59,
          columnNumber: 15
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          Link,
          {
            to: `/login?redirectTo=${window.location.href}`,
            className: "icon-btn-sm icon-btn-ui",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                "span",
                {
                  className: "material-symbols-rounded leading-none ",
                  style: { fontVariationSettings: "'wght' 300" },
                  children: "account_circle"
                },
                void 0,
                false,
                {
                  fileName: "app/components/layout/toolbar.tsx",
                  lineNumber: 80,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: "Login" }, void 0, false, {
                fileName: "app/components/layout/toolbar.tsx",
                lineNumber: 86,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/components/layout/toolbar.tsx",
            lineNumber: 76,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "app/components/layout/toolbar.tsx",
          lineNumber: 56,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/layout/toolbar.tsx",
        lineNumber: 20,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "app/components/layout/toolbar.tsx",
      lineNumber: 15,
      columnNumber: 5
    },
    this
  );
};
var toolbar_default = Toolbar;

// app/components/user/user-provider.tsx
var import_jsx_dev_runtime10 = __toESM(require_jsx_dev_runtime());
var UserProvider = ({
  user,
  children
}) => {
  const { Provider } = userContext;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Provider, { value: user, children }, void 0, false, {
    fileName: "app/components/user/user-provider.tsx",
    lineNumber: 18,
    columnNumber: 10
  }, this);
};
var user_provider_default = UserProvider;

// app/root.tsx
var import_jsx_dev_runtime11 = __toESM(require_jsx_dev_runtime());
var metaTitlePostfix = " - Recipie";
var meta = () => ({
  charset: "utf-8",
  title: "Recipie",
  viewport: "width=device-width,initial-scale=1"
});
var links = () => {
  return [
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
    },
    {
      as: "style",
      rel: "stylesheet preload",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    },
    { as: "style", rel: "stylesheet preload", href: app_default }
  ];
};
function App() {
  var _a;
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 126,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("body", { id: "app", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Provider_default, { store, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(PersistGate, { loading: null, persistor, children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(user_provider_default, { user: { id: data.userId, email: data.email }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Layout, { toolbar: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(toolbar_default, {}, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 135,
          columnNumber: 32
        }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Outlet, {}, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 136,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 135,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 134,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        searchParams.get("basket-panel") ? /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          BasketModal,
          {
            open: searchParams.get("basket-panel") ? true : false,
            onClose: () => {
              navigate(`${location.pathname}`);
            },
            basketData: (_a = data.basket) == null ? void 0 : _a.recipes
          },
          void 0,
          false,
          {
            fileName: "app/root.tsx",
            lineNumber: 141,
            columnNumber: 13
          },
          this
        ) : null,
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { id: "modal-container" }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}
var ErrorBoundary = ({ error }) => {
  const navigate = useNavigate();
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
      "Oops! Something went wrong!",
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
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
          fileName: "app/root.tsx",
          lineNumber: 166,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(Link, { to: "/", children: "Home page" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 164,
      columnNumber: 7
    }, this);
  }
  return null;
};

export {
  metaTitlePostfix,
  meta,
  links,
  App,
  ErrorBoundary
};
//# sourceMappingURL=/build/_shared/chunk-SGR6W5H7.js.map
