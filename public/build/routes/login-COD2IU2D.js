import{a as S}from"/build/_shared/chunk-DLQ5GVGL.js";import{a as u}from"/build/_shared/chunk-UV3P77KP.js";import"/build/_shared/chunk-URPQL65M.js";import"/build/_shared/chunk-CZN2BL33.js";import{a as P}from"/build/_shared/chunk-FXULA5YR.js";import"/build/_shared/chunk-B2ZVSJXD.js";import{f as m}from"/build/_shared/chunk-K546PQX6.js";import"/build/_shared/chunk-LUHZZQRW.js";import"/build/_shared/chunk-UTXIL4KP.js";import"/build/_shared/chunk-WG3DIZPU.js";import"/build/_shared/chunk-TW2OTEET.js";import{a as N,g as l,n as c,t as f}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as t}from"/build/_shared/chunk-ADMCF34Z.js";var p=t(N());var E=t(P()),i=t(S()),e=t(f()),k=()=>({title:"Login"+u});function d(){var a;let[o,s]=(0,p.useState)("login"),[b]=l(),g=c(),{register:r,watch:y,handleSubmit:w,formState:{errors:h,isDirty:x}}=m({defaultValues:{email:"",password:"",redirectTo:"",formType:"login"}}),[T,v]=y(["email","password"]);return(0,e.jsx)("div",{className:"mx-auto layout-px layout-pb pt-32 max-w-6xl flex justify-center",children:(0,e.jsxs)("div",{className:"flex flex-col w-96 bg-white p-8 rounded-xl shadow-2xl shadow-gray-300/50 space-y-6",children:[(0,e.jsxs)("h1",{children:[" ",o==="login"?"Login":"Create account"]}),o==="register"?(0,e.jsxs)("div",{className:"flex space-x-2 p-4 rounded-lg bg-primary/10",children:[(0,e.jsx)("span",{className:"material-symbols-rounded text-primary",children:"priority_high"}),(0,e.jsx)("p",{children:"Please do not input any sensitive personal informations, since this is a demo website which does not protect your datas and would delete the datas in 7 days."})]}):null,(0,e.jsxs)("form",{method:"post",className:"flex flex-col gap-y-6",onSubmit:w((F,n)=>{console.log(F,n),g(n.target)}),children:[(0,e.jsx)("input",{...r("formType"),type:"hidden",value:o}),(0,e.jsx)("input",{...r("redirectTo"),type:"hidden",value:(a=b.get("redirectTo"))!=null?a:void 0}),(0,e.jsx)("label",{className:`
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
            ${T.length>0?"before:-top-2 before:text-gray-500 before:scale-75":""}
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `,children:(0,e.jsx)("input",{...r("email",{required:!0}),type:"email",className:"input w-full",autoComplete:"email"})}),(0,e.jsxs)("label",{className:`
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
            ${v.length>0?"before:-top-2 before:text-gray-500 before:scale-75":""}
            focus-within:before:-top-2
            focus-within:before:text-black
            focus-within:before:scale-75
            before:transition-all
            before:cursor-text
            `,children:[(0,e.jsx)("input",{...r("password",{required:!0}),type:"password",className:"input w-full",autoComplete:"current-password"}),(0,e.jsx)("span",{className:`text-xs ${h.password?"text-red-500":"text-gray-500"} `,children:"Should include charactor and number and begin with charactor in 8-32 long"})]}),(0,e.jsx)("div",{children:(0,e.jsx)("button",{type:"submit",className:"btn-primary btn-md w-full",disabled:!x,children:"Submit"})})]}),o==="login"?(0,e.jsx)("button",{className:"link",onClick:()=>s("register"),children:"Create new account"}):(0,e.jsx)("button",{className:"link",onClick:()=>s("login"),children:"Login"})]})})}export{d as default,k as meta};
