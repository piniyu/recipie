import{a as L}from"/build/_shared/chunk-CZN2BL33.js";import{a as R}from"/build/_shared/chunk-TW2OTEET.js";import{a as P,d as C,i as I,o as F,p as D,t as M}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as v}from"/build/_shared/chunk-ADMCF34Z.js";var s=v(P()),n=v(P());var e=v(M());var T=({children:m,onPrevious:k,onNext:u,showNext:f,showPrevious:i})=>{let{recipeId:p}=C();return(0,e.jsxs)("div",{className:"h-screen bg-gray-100 overflow-auto [scroll-snap-type:y_mandatory]",children:[m,(0,e.jsxs)("button",{onClick:k,className:`
        fixed 
        w-24 
        btn-ghost btn-sm 
        top-2 left-[calc(50vw_-_48px)] 
        flex-col 
        bg-gray-200/70 backdrop-blur-md 
        text-gray-500 
        select-none
        hover:animate-bounce-y-down
        ${i?"":"pointer-events-none invisible"}`,children:[(0,e.jsx)("span",{className:"material-symbols-rounded block",children:"arrow_upward"}),"Previous"]}),(0,e.jsxs)("button",{onClick:u,id:"next_btn",className:`
        fixed 
        w-24 
        btn-ghost btn-md 
        flex-col 
        bottom-2 left-[calc(50vw_-_48px)]
        bg-gray-200/70 backdrop-blur-md 
        text-black
        select-none 
        hover:animate-bounce-y-up
        ${f?"":"pointer-events-none invisible"}`,children:["Next",(0,e.jsx)("span",{className:"material-symbols-rounded block",children:"arrow_downward"})]}),(0,e.jsx)(I,{to:`/recipe/${p}`,className:"fixed w-fit top-0 right-[10px] btn-ghost btn-md justify-end text-gray-500 ",children:(0,e.jsx)("span",{className:"material-symbols-rounded",children:"close"})})]})};function _(){let{setHidden:m}=(0,s.useContext)(L),k=F(),[u,f]=(0,n.useState)(k),[i,p]=(0,n.useState)(1),[x,E]=(0,n.useState)(1/0),r=D(),[y,g]=(0,n.useState)(!0),[h,N]=(0,n.useState)(!0),[o,$]=(0,n.useState)([]),[w,j]=(0,n.useState)(3);(0,s.useEffect)(()=>(m(!0),()=>{m(!1)}),[m]);let H=(0,s.useCallback)(t=>{if(t!==null){let c=t.getAttribute("data-key");c&&$(d=>{let a=[...d];return a[+c]=t,a})}},[]);return(0,s.useEffect)(()=>{let t={threshold:1},c=(a,S)=>{a.forEach(b=>{if(b.isIntersecting){let l=b.target.getAttribute("data-key");l&&+l===o.length-2&&+l%2===0&&+l!==x-1&&x===1/0&&(console.log("fetch",w),g(!0),j(parseInt(l)+3)),l&&p(parseInt(l)+1)}})},d=new IntersectionObserver(c,t);return o.length>0&&o.forEach(a=>{d.observe(a)}),()=>{d.disconnect()}},[x,o,o.length]),(0,s.useEffect)(()=>{!y||!h||(r.load(`/recipe/modal?step=${w}`),g(!1))},[r,h,w,y]),(0,s.useEffect)(()=>{if(r.data&&r.data[0]===null){N(!1),g(!1);return}if(r.data&&r.data[1]===null){f(t=>[...t,r.data[0]]),N(!1),g(!1);return}r.data&&f(t=>[...t,...r.data])},[r.data]),(0,s.useEffect)(()=>{h||E(o.length)},[h,o.length]),(0,e.jsx)(T,{showNext:i!==x,showPrevious:i!==1,onPrevious:()=>{o[i-2].scrollIntoView({block:"center",behavior:"smooth"}),p(t=>t-1)},onNext:()=>{o[i].scrollIntoView({block:"center",behavior:"smooth"}),p(t=>t+1)},children:u==null?void 0:u.map(({id:t,title:c,steps:d},a)=>(0,e.jsxs)("div",{"data-key":a,className:"max-w-7xl h-screen flex justify-center mx-auto space-x-6 scroll-m-0 py-20 px-8 [scroll-snap-align:center] ",ref:H,children:[(0,e.jsx)("div",{className:"w-full  flex items-center",children:(0,e.jsx)("div",{className:"flex-1 w-full h-full max-h-[70vh] p-5 rounded-2xl bg-white shadow-2xl ",children:(0,e.jsx)("img",{src:R,alt:"step-img",className:"w-full h-full object-cover object-center rounded-2xl"})})}),(0,e.jsx)("div",{className:" w-2/5 flex-shrink-0 flex flex-col",children:(0,e.jsxs)("div",{className:"overflow-y-auto flex-1",children:[(0,e.jsxs)("div",{className:"mt-2 mb-14 text-center",children:[(0,e.jsxs)("h4",{className:"text-primary-400 font-medium",children:["STEP ",t]}),(0,e.jsx)("h2",{className:"text-black",children:c})]}),(0,e.jsx)("ul",{className:" pl-14 pr-14 list-disc text-black marker:text-gray-300 marker:text-xl marker:leading-none",children:d.map(({text:S,id:b})=>(0,e.jsx)("li",{className:"mb-8",children:(0,e.jsx)("span",{className:"relative left-1 ",children:S})},b))})]})})]},t))})}export{_ as default};
