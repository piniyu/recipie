import {
  require_jsx_dev_runtime,
  require_react,
  useLocation
} from "/build/_shared/chunk-UAIS7CJ2.js";
import {
  __toESM
} from "/build/_shared/chunk-CUPSZOF3.js";

// app/components/sider/sider-context.tsx
var import_react2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var SiderContext = (0, import_react3.createContext)({
  hidden: false,
  setHidden: () => {
  },
  close: false,
  setClose: () => {
  }
});
var { Provider } = SiderContext;
function SiderProvider({
  children
}) {
  const location = useLocation();
  const [hidden, setHidden] = (0, import_react2.useState)(false);
  const [close, setClose] = (0, import_react2.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Provider, { value: { hidden, setHidden, close, setClose }, children }, void 0, false, {
    fileName: "app/components/sider/sider-context.tsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
}

export {
  SiderContext,
  SiderProvider
};
//# sourceMappingURL=/build/_shared/chunk-PC7DKCCK.js.map
