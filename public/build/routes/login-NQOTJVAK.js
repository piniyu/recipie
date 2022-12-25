import {
  require_session
} from "/build/_shared/chunk-OOPRYBMH.js";
import {
  metaTitlePostfix
} from "/build/_shared/chunk-VCITOLEB.js";
import "/build/_shared/chunk-A76BYB4T.js";
import "/build/_shared/chunk-PC7DKCCK.js";
import {
  require_db
} from "/build/_shared/chunk-LFDIS6R5.js";
import "/build/_shared/chunk-PDABV4SV.js";
import {
  useForm
} from "/build/_shared/chunk-7RAIFTL2.js";
import "/build/_shared/chunk-UN6WIT2S.js";
import "/build/_shared/chunk-AZO6JVLN.js";
import "/build/_shared/chunk-2V4E7QDU.js";
import "/build/_shared/chunk-SH4AKRQ3.js";
import {
  require_jsx_dev_runtime,
  require_react,
  useSearchParams,
  useSubmit
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/routes/login.tsx
var import_react2 = __toESM(require_react());
var import_db = __toESM(require_db());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = () => ({
  title: "Login" + metaTitlePostfix
});
function Login() {
  var _a;
  const [formType, setFormType] = (0, import_react2.useState)("login");
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const {
    register: register2,
    watch,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      redirectTo: "",
      formType: "login"
    }
  });
  const [watchEmail, watchPsw] = watch(["email", "password"]);
  const onSubmit = (v, e) => {
    console.log(v, e);
    submit(e.target);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto layout-px layout-pb pt-32 max-w-6xl flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col w-96 bg-white p-8 rounded-xl shadow-2xl shadow-gray-300/50 space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: [
      " ",
      formType === "login" ? "Login" : "Create account"
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this),
    formType === "register" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2 p-4 rounded-lg bg-primary/10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "material-symbols-rounded text-primary", children: "priority_high" }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 131,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Please do not input any sensitive personal informations, since this is a demo website which does not protect your datas and would delete the datas in 7 days." }, void 0, false, {
        fileName: "app/routes/login.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/login.tsx",
      lineNumber: 130,
      columnNumber: 11
    }, this) : null,
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "form",
      {
        method: "post",
        className: "flex flex-col gap-y-6",
        onSubmit: handleSubmit(onSubmit),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { ...register2("formType"), type: "hidden", value: formType }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 146,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              ...register2("redirectTo"),
              type: "hidden",
              value: (_a = searchParams.get("redirectTo")) != null ? _a : void 0
            },
            void 0,
            false,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 147,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "label",
            {
              className: `
            relative 
            before:block 
            before:content-['Email'] 
            before:absolute 
            before:top-2
            before:left-2 
            before:origin-top-left
            before:px-1
            before:bg-white 
            before:text-gray-400
            ${watchEmail.length > 0 ? `before:-top-2 before:text-gray-500 before:scale-75` : ""}
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `,
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  ...register2("email", {
                    required: true
                  }),
                  type: "email",
                  className: "input w-full",
                  autoComplete: "email"
                },
                void 0,
                false,
                {
                  fileName: "app/routes/login.tsx",
                  lineNumber: 176,
                  columnNumber: 13
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 152,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "label",
            {
              className: `
            relative 
            before:block 
            before:content-['Password'] 
            before:absolute 
            before:top-2
            before:left-2 
            before:origin-top-left
            before:px-1
            before:bg-white 
            before:text-gray-400
            ${watchPsw.length > 0 ? `before:-top-2 before:text-gray-500 before:scale-75` : ""}
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `,
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "input",
                  {
                    ...register2("password", {
                      required: true
                    }),
                    type: "password",
                    className: "input w-full",
                    autoComplete: "current-password"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 209,
                    columnNumber: 13
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: `text-xs ${errors.password ? "text-red-500" : "text-gray-500"} `,
                    children: "Should include charactor and number and begin with charactor in 8-32 long"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/login.tsx",
                    lineNumber: 220,
                    columnNumber: 13
                  },
                  this
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 185,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "btn-primary btn-md w-full",
              disabled: !isDirty,
              children: "Submit"
            },
            void 0,
            false,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 230,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "app/routes/login.tsx",
            lineNumber: 229,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 141,
        columnNumber: 9
      },
      this
    ),
    formType === "login" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "link", onClick: () => setFormType("register"), children: "Create new account" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 240,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "link", onClick: () => setFormType("login"), children: "Login" }, void 0, false, {
      fileName: "app/routes/login.tsx",
      lineNumber: 244,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/login.tsx",
    lineNumber: 127,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 126,
    columnNumber: 5
  }, this);
}
export {
  Login as default,
  meta
};
//# sourceMappingURL=/build/routes/login-NQOTJVAK.js.map
