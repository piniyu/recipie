import{a as p,t as d}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as i}from"/build/_shared/chunk-ADMCF34Z.js";var t=i(p()),e=i(d());function g({hasDownArrow:c,icon:f,summary:a,details:u,direction:m="left"}){let[l,r]=(0,t.useState)(!1),s=(0,t.useRef)(null);return(0,t.useEffect)(()=>{let n=o=>{s.current&&o.target&&!s.current.contains(o.target)&&r(!1)};return window.addEventListener("click",n),()=>{window.addEventListener("click",n)}},[]),(0,e.jsxs)("div",{className:"relative select-none text-gray-500",ref:s,children:[typeof a=="string"?(0,e.jsxs)("button",{className:"h-full btn-sm bg-white border-none shadow-sm flex items-center gap-2  cursor-pointer",onClick:n=>{r(o=>!o)},children:[f,a,c&&(0,e.jsx)("span",{className:`material-symbols-rounded transition-transform ${l?"-rotate-180":""}`,children:"expand_more"})]}):(0,e.jsx)("div",{onClick:()=>r(n=>!n),children:a}),l&&(0,e.jsx)("div",{className:`
          absolute z-10 
          flex flex-col 
           border-gray-200 rounded-lg 
          mt-1 px-2 py-2 
          bg-white shadow-xl
          ${m==="left"?"":"right-0"}
				`,children:u})]})}export{g as a};
