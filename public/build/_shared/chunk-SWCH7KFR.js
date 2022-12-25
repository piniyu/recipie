import{t as n}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as o}from"/build/_shared/chunk-ADMCF34Z.js";var e=o(n());function u({placeholder:d="Search",border:l=!1,list:a,fetch:t}){return(0,e.jsxs)("div",{className:" relative w-full max-w-md text-black",children:[(0,e.jsxs)("div",{className:`
            peer
						flex w-full items-center
						gap-2
						rounded-lg 
						bg-white
						
						outline-[3px] outline-offset-1 
						outline-focus-outline
            transition-all 
            ease-in focus-within:outline
            ${l?"rounded border border-gray-200 focus-within:border-transparent hover:border-gray-400":"shadow-sm shadow-gray-300 focus-within:shadow-lg hover:shadow-lg"}
            
            `,children:[(0,e.jsx)("span",{className:"material-symbols-rounded pl-4 text-xl leading-none text-gray-400",children:"search"}),(0,e.jsx)("input",{type:"text",placeholder:d,className:`
              min-w-0
							flex-1
							bg-transparent py-3
							pr-4
              focus:outline-none
          `,onChange:r=>t(r.target.value)})]}),(0,e.jsx)("div",{className:`
            absolute
            z-10
            mt-2
            hidden
            w-full rounded-lg 
            border 
            border-gray-100 bg-white px-4 
            py-3 
            shadow-lg hover:block 
            focus:block 
            peer-focus-within:block
            `,children:a===void 0||(a==null?void 0:a.length)===0?(0,e.jsx)("div",{children:"No results"}):a==null?void 0:a.map((r,i)=>(0,e.jsx)("div",{children:r.value},r.value+i))})]})}export{u as a};
