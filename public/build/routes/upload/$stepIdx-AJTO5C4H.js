import{a as A}from"/build/_shared/chunk-HITQAIKO.js";import{a as S}from"/build/_shared/chunk-YST6763P.js";import{q as N,r as b,w as P,x as C}from"/build/_shared/chunk-B2ZVSJXD.js";import{b as V,c as k,e as w,f as $}from"/build/_shared/chunk-K546PQX6.js";import"/build/_shared/chunk-WG3DIZPU.js";import{a as J,c as y,d as x,t as c}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as d}from"/build/_shared/chunk-ADMCF34Z.js";var v=d(J());var m=d(c()),M=new RegExp("^[0-9]$"),R=new RegExp("^[a-zA-Z]$"),T=({name:t,...r})=>{let{register:f,control:h,watch:e,setValue:l}=r,u=e(t);return(0,m.jsx)("input",{...f(t),type:"text",className:"input w-20 text-right",placeholder:"0:00",onKeyDown:o=>{u.length===4&&M.test(o.key)&&o.preventDefault(),R.test(o.key)&&o.preventDefault()},onFocus:o=>{l(t,o.target.value.replace(":",""))},onBlur:o=>{let s=o.target.value.split("");for(;s.length<4;)s.unshift("0");let p=s.length;s.splice(p-2,0,":"),l(t,s.join(""))}})};function g({name:t}){let r=V(),{register:f,control:h,setValue:e}=r,{fields:l,append:u,remove:o}=w({control:h,name:t});return(0,m.jsxs)("ul",{className:"space-y-4",children:[l.map((s,p)=>(0,m.jsx)("div",{children:(0,m.jsxs)("div",{className:"flex gap-4",children:[(0,m.jsx)(T,{...r,name:`${t}.${p}.timeStemp`}),(0,m.jsx)(S,{...r,name:`${t}.${p}.content`,rows:1,placeholder:"Method"}),(0,m.jsx)("button",{type:"button",className:"btn-ghost",onClick:()=>{o(p)},disabled:l.length===1,children:"Delet"})]})},s.id)),(0,m.jsx)("button",{className:"btn-sm btn-border",type:"button",onClick:()=>{u({content:"",timeStemp:""})},children:"Add a method"})]})}var i=d(c());function F(){return(0,i.jsxs)("form",{className:"flex flex-col space-y-12",children:[(0,i.jsxs)("label",{children:[(0,i.jsx)("p",{className:"label-required",children:"Step Title"}),(0,i.jsx)(S,{name:"title",maxLength:100,rows:2})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("p",{className:"label-required",children:"Methods"}),(0,i.jsx)(g,{name:"methods"})]})]})}var a=d(c()),X={title:"",methods:[{content:"",timeStamp:""}]};function E(){let{stepIdx:t}=x(),r=P(),f=y(),h=C(n=>n.stepForm),e=t?h[+t-1]:void 0,l=$({defaultValues:e||X,shouldUnregister:!0}),{handleSubmit:u,reset:o,getValues:s}=l;(0,v.useEffect)(()=>{e&&o(e)},[r,e,o,t]),(0,v.useEffect)(()=>()=>{let n=s();n&&e&&r(b({title:n.title,methods:n.methods,id:e.id}))},[r,s,e,t]);let p=n=>{e&&r(b({title:n.title,methods:n.methods,id:e.id}))},D=n=>{t&&!h[+t]&&r(N({title:"",methods:[{timeStamp:"",content:""}],id:A()}))};return(0,a.jsxs)("div",{className:"space-y-12",children:[(0,a.jsxs)("h3",{className:"font-medium text-primary-600",children:["Step ",t]}),(0,a.jsx)(k,{...l,children:(0,a.jsx)(F,{})}),(0,a.jsxs)("div",{className:"flex gap-4",children:[t&&t!=="1"?(0,a.jsx)("button",{className:"btn-sm btn-gray",onClick:()=>{u(p)(),f(`../${+t-1}`)},type:"submit",children:"Previous"}):null,t?(0,a.jsx)("button",{className:"btn-sm btn-primary",onClick:()=>{u(D)(),f(`../${+t+1}`)},type:"submit",children:"Next step"}):null]})]})}export{E as default};
