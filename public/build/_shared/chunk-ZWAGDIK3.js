import {
  require_react_dom
} from "/build/_shared/chunk-2V4E7QDU.js";
import {
  Link,
  require_jsx_dev_runtime,
  require_react,
  useLocation
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/lib/domain/auth/user-context.tsx
var import_react = __toESM(require_react());
var import_react2 = __toESM(require_react());
var userContext = import_react.default.createContext(null);
function useUser() {
  return (0, import_react2.useContext)(userContext);
}

// app/components/layout/modal.tsx
var import_react3 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Modal({
  onClose,
  open,
  children,
  className,
  dialogClassName
}) {
  const dialogRef = (0, import_react3.useRef)(null);
  const modalContainer = document.getElementById("modal-container");
  (0, import_react3.useEffect)(() => {
    const onClick = (e) => {
      if (!e.target.contains(dialogRef.current)) {
        return;
      }
      if (dialogRef.current) {
        onClose();
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [onClose]);
  (0, import_react3.useEffect)(() => {
    if (!dialogRef.current) {
      return;
    }
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);
  if (!modalContainer) {
    throw new Error("modal-container not found!");
  }
  return import_react_dom.default.createPortal(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "dialog",
      {
        className: ` p-0 bg-transparent ${dialogClassName != null ? dialogClassName : ""}`,
        ref: dialogRef,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: ` bg-white ${className != null ? className : ""}`, children }, void 0, false, {
          fileName: "app/components/layout/modal.tsx",
          lineNumber: 54,
          columnNumber: 7
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/components/layout/modal.tsx",
        lineNumber: 50,
        columnNumber: 5
      },
      this
    ),
    modalContainer
  );
}

// app/components/auth/auth-check.tsx
var import_react5 = __toESM(require_react());
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
function AuthCheck({
  children,
  loginConfirmModal = true
}) {
  const user = useUser();
  const location = useLocation();
  const [open, setOpen] = (0, import_react5.useState)(false);
  (0, import_react5.useEffect)(() => {
    setOpen(false);
  }, [location.pathname]);
  if (!user || !user.id) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "div",
      {
        onClick: (e) => {
          if (loginConfirmModal) {
            setOpen(true);
          }
        },
        children: [
          children(user),
          loginConfirmModal ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            Modal,
            {
              onClose: () => setOpen(false),
              open,
              className: "w-96 rounded-xl layout-px layout-py",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "mb-10 text-center", children: "Login to continue" }, void 0, false, {
                  fileName: "app/components/auth/auth-check.tsx",
                  lineNumber: 39,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-center gap-6", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                    Link,
                    {
                      to: `/login?redirectTo=${window.location.href}`,
                      className: "btn-sm btn-secondary",
                      onClick: (e) => e.stopPropagation(),
                      children: "Login"
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/components/auth/auth-check.tsx",
                      lineNumber: 41,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                    "button",
                    {
                      className: "btn-sm btn-gray",
                      onClick: (e) => {
                        e.stopPropagation();
                        setOpen(false);
                      },
                      children: "Cancel"
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/components/auth/auth-check.tsx",
                      lineNumber: 48,
                      columnNumber: 15
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/components/auth/auth-check.tsx",
                  lineNumber: 40,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/components/auth/auth-check.tsx",
              lineNumber: 34,
              columnNumber: 11
            },
            this
          ) : null
        ]
      },
      void 0,
      true,
      {
        fileName: "app/components/auth/auth-check.tsx",
        lineNumber: 25,
        columnNumber: 7
      },
      this
    );
  }
  return children(user);
}

export {
  userContext,
  Modal,
  AuthCheck
};
//# sourceMappingURL=/build/_shared/chunk-ZWAGDIK3.js.map
