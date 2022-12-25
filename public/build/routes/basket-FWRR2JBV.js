import{a as P}from"/build/_shared/chunk-DLQ5GVGL.js";import{a as T}from"/build/_shared/chunk-UV3P77KP.js";import{a as Q}from"/build/_shared/chunk-URPQL65M.js";import"/build/_shared/chunk-CZN2BL33.js";import{a as M}from"/build/_shared/chunk-FXULA5YR.js";import{a as h}from"/build/_shared/chunk-2Y5A6UEU.js";import{i as E,k as B,w as g,x as b}from"/build/_shared/chunk-B2ZVSJXD.js";import{c as D,f as F}from"/build/_shared/chunk-K546PQX6.js";import"/build/_shared/chunk-LUHZZQRW.js";import"/build/_shared/chunk-UTXIL4KP.js";import"/build/_shared/chunk-WG3DIZPU.js";import"/build/_shared/chunk-TW2OTEET.js";import{a as N,e as R,o as k,t as u}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as a}from"/build/_shared/chunk-ADMCF34Z.js";var O=a(N());var C=a(N());var I=a(N());var v=a(u());function S({value:e,unit:p,setInputValue:m,isDeleted:i,hasSetBtn:c,defaultValue:n}){let t=F({mode:"onChange"}),{reset:o,watch:d}=t;return(0,I.useEffect)(()=>{n&&(o({input:n}),console.log(n))},[n,o]),(0,I.useEffect)(()=>{let x=d(f=>{f.input&&m(f.input)});return()=>{x.unsubscribe()}},[m,d]),(0,v.jsx)(D,{...t,children:(0,v.jsx)("form",{className:"relative flex items-stretch ",children:(0,v.jsx)(Q,{registerName:"input",maxValue:e,showErrors:!0,unit:p})})})}var r=a(u());function y({name:e,value:p,unit:m,localBasket:i}){var o;let[c,n]=(0,C.useState)(!1),t=g();return(0,r.jsxs)("div",{className:"relative table-row-group text-secondary ",children:[(0,r.jsxs)("div",{className:"table-row",children:[(0,r.jsx)("div",{className:"table-cell px-4 first:pl-8 last:pr-8 py-3 ",children:(0,r.jsx)("div",{className:"flex items-center",children:(0,r.jsx)("span",{children:e})})}),(0,r.jsx)("div",{className:`
          relative 
          table-cell px-4 first:pl-8 last:pr-8 
          py-3 
          text-secondary font-bold 
          text-lg
          `,children:(0,r.jsx)("span",{className:"[background:linear-gradient(to_bottom,transparent_50%,#fbbf2490_50%)]",children:p*i.servings-(isNaN(i.hadQant)?0:i.hadQant)+m})}),(0,r.jsx)("div",{className:"table-cell px-4 first:pl-8 last:pr-8 py-3",children:(0,r.jsx)("div",{className:"",children:p*i.servings+m})}),(0,r.jsx)("div",{className:"table-cell px-4 first:pl-8 last:pr-8 py-3 ",children:(0,r.jsx)(S,{setInputValue:d=>void t(B({name:e,hadQant:d})),defaultValue:(o=i==null?void 0:i.hadQant)!=null?o:0,isDeleted:c,value:p,unit:m})}),(0,r.jsx)("div",{className:"table-cell px-4 first:pl-8 last:pr-8 align-middle py-3 text-gray-500",children:(0,r.jsx)("button",{className:"flex p-1",onClick:()=>{n(d=>!d)},children:(0,r.jsx)("span",{className:`material-symbols-outlined leading-none ${c?"text-green-500":"text-red-600"}`,children:c?"undo":"delete"})})})]}),c&&(0,r.jsx)("div",{className:"absolute top-0 left-0  h-full bg-white/50 mix-blend-screen",style:{width:"calc(100% - 56px)"}})]})}var q=e=>e.ingredients,J=e=>e.recipeServings,L=()=>E(q,J,(e,p)=>e.map(i=>{let c=i.recipeIds.map(n=>{var t,o;return(o=(t=p.find(d=>d.recipeId===n))==null?void 0:t.servings)!=null?o:0});return{name:i.name,hadQant:i.hadQant,servings:c.length>0?c.reduce((n,t)=>n+t,0):0}}));var s=a(u());function w({data:e}){let p=(0,O.useMemo)(L,[]),m=b(p),i=b(t=>t.ingredients),c=b(t=>t.recipeServings),n=g();return(0,s.jsxs)("div",{className:"table table-auto w-full text-black ",children:[(0,s.jsx)("div",{className:"table-header-group font-medium ",children:(0,s.jsxs)("div",{className:"table-row ",children:[(0,s.jsx)("div",{className:"table-cell  text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200",children:"INGREDIENTS"}),(0,s.jsx)("div",{className:"table-cell w-28 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200",children:"NEED"}),(0,s.jsx)("div",{className:"table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200",children:"REQUIRE"}),(0,s.jsx)("div",{className:"table-cell text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200",children:"HAVE"}),(0,s.jsx)("div",{className:"table-cell w-8 text-left px-4 pt-8 pb-3 first:pl-8 last:pr-8 border-b border-gray-200"})]})}),e==null?void 0:e.map(({ingredient:{name:t},value:o,unit:d},x)=>{var f;return(0,s.jsx)(y,{name:t,value:parseInt(o),unit:d,localBasket:(f=m.find(A=>A.name===t))!=null?f:{name:t,hadQant:0,servings:1}},`${t}_${x}`)})]})}var U=a(M()),X=a(P()),l=a(u()),$=()=>({charset:"utf-8",title:"Basket"+T});function _(){let e=k();return(0,l.jsx)("div",{className:"layout-py layout-px",children:(0,l.jsxs)("div",{className:"max-w-6xl mx-auto grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[3fr,2fr] gap-6",children:[(0,l.jsx)("h2",{children:"Basket"}),(0,l.jsx)("div",{className:"[grid-area:ingredients] ",children:(0,l.jsx)(h,{className:"!p-0",children:(0,l.jsx)(w,{data:e==null?void 0:e.ingredients})})}),(0,l.jsx)(h,{className:"[grid-area:sideList] flex flex-col gap-8 h-full ",children:(0,l.jsx)(R,{})})]})})}export{_ as default,$ as meta};
