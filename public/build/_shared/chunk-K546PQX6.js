import{a as Or}from"/build/_shared/chunk-ZFWZJZG4.js";import{e as Cr}from"/build/_shared/chunk-ADMCF34Z.js";var F=Cr(Or(),1),de=e=>e.type==="checkbox",se=e=>e instanceof Date,I=e=>e==null,nr=e=>typeof e=="object",U=e=>!I(e)&&!Array.isArray(e)&&nr(e)&&!se(e),ar=e=>U(e)&&e.target?de(e.target)?e.target.checked:e.target.value:e,Rr=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,ur=(e,t)=>e.has(Rr(t)),ae=e=>Array.isArray(e)?e.filter(Boolean):[],C=e=>e===void 0,c=(e,t,r)=>{if(!t||!U(e))return r;let n=ae(t.split(/[,[\].]+?/)).reduce((s,l)=>I(s)?s:s[l],e);return C(n)||n===e?C(e[t])?r:e[t]:n},he={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},K={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},Q={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},lr=F.default.createContext(null),ve=()=>F.default.useContext(lr),zr=e=>{let{children:t,...r}=e;return F.default.createElement(lr.Provider,{value:r},t)},or=(e,t,r,n=!0)=>{let s={defaultValues:t._defaultValues};for(let l in e)Object.defineProperty(s,l,{get:()=>{let f=l;return t._proxyFormState[f]!==K.all&&(t._proxyFormState[f]=!n||K.all),r&&(r[f]=!0),e[f]}});return s},W=e=>U(e)&&!Object.keys(e).length,cr=(e,t,r)=>{let{name:n,...s}=e;return W(s)||Object.keys(s).length>=Object.keys(t).length||Object.keys(s).find(l=>t[l]===(!r||K.all))},H=e=>Array.isArray(e)?e:[e],fr=(e,t,r)=>r&&t?e===t:!e||!t||e===t||H(e).some(n=>n&&(n.startsWith(t)||t.startsWith(n)));function Fe(e){let t=F.default.useRef(e);t.current=e,F.default.useEffect(()=>{let r=!e.disabled&&t.current.subject.subscribe({next:t.current.next});return()=>{r&&r.unsubscribe()}},[e.disabled])}function Lr(e){let t=ve(),{control:r=t.control,disabled:n,name:s,exact:l}=e||{},[f,y]=F.default.useState(r._formState),_=F.default.useRef(!0),m=F.default.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),p=F.default.useRef(s);return p.current=s,Fe({disabled:n,next:S=>_.current&&fr(p.current,S.name,l)&&cr(S,m.current)&&y({...r._formState,...S}),subject:r._subjects.state}),F.default.useEffect(()=>{_.current=!0;let S=r._proxyFormState.isDirty&&r._getDirty();return S!==r._formState.isDirty&&r._subjects.state.next({isDirty:S}),r._updateValid(),()=>{_.current=!1}},[r]),or(f,r,m.current,!1)}var J=e=>typeof e=="string",dr=(e,t,r,n)=>J(e)?(n&&t.watch.add(e),c(r,e)):Array.isArray(e)?e.map(s=>(n&&t.watch.add(s),c(r,s))):(n&&(t.watchAll=!0),r),Tr=e=>{let t=e.constructor&&e.constructor.prototype;return U(t)&&t.hasOwnProperty("isPrototypeOf")},Pe=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function $(e){let t,r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(Pe&&(e instanceof Blob||e instanceof FileList))&&(r||U(e)))if(t=r?[]:{},!Array.isArray(e)&&!Tr(e))t=e;else for(let n in e)t[n]=$(e[n]);else return e;return t}function Ur(e){let t=ve(),{control:r=t.control,name:n,defaultValue:s,disabled:l,exact:f}=e||{},y=F.default.useRef(n);y.current=n,Fe({disabled:l,subject:r._subjects.watch,next:p=>{if(fr(y.current,p.name,f)){let S=dr(y.current,r._names,p.values||r._formValues);m(C(S)?s:$(S))}}});let[_,m]=F.default.useState(r._getWatch(n,s));return F.default.useEffect(()=>r._removeUnmounted()),_}function Mr(e){let t=ve(),{name:r,control:n=t.control,shouldUnregister:s}=e,l=ur(n._names.array,r),f=Ur({control:n,name:r,defaultValue:c(n._formValues,r,c(n._defaultValues,r,e.defaultValue)),exact:!0}),y=Lr({control:n,name:r}),_=F.default.useRef(n.register(r,{...e.rules,value:f}));return F.default.useEffect(()=>{let m=(p,S)=>{let b=c(n._fields,p);b&&(b._f.mount=S)};return m(r,!0),()=>{let p=n._options.shouldUnregister||s;(l?p&&!n._stateFlags.action:p)?n.unregister(r):m(r,!1)}},[r,n,l,s]),{field:{name:r,value:f,onChange:F.default.useCallback(m=>_.current.onChange({target:{value:ar(m),name:r},type:he.CHANGE}),[r]),onBlur:F.default.useCallback(()=>_.current.onBlur({target:{value:c(n._formValues,r),name:r},type:he.BLUR}),[r,n]),ref:m=>{let p=c(n._fields,r);p&&m&&(p._f.ref={focus:()=>m.focus(),select:()=>m.select(),setCustomValidity:S=>m.setCustomValidity(S),reportValidity:()=>m.reportValidity()})}},formState:y,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!c(y.errors,r)},isDirty:{enumerable:!0,get:()=>!!c(y.dirtyFields,r)},isTouched:{enumerable:!0,get:()=>!!c(y.touchedFields,r)},error:{enumerable:!0,get:()=>c(y.errors,r)}})}}var Jr=e=>e.render(Mr(e)),Br=(e,t,r,n,s)=>t?{...r[e],types:{...r[e]&&r[e].types?r[e].types:{},[n]:s||!0}}:{},We=e=>/^\w*$/.test(e),yr=e=>ae(e.replace(/["|']|\]/g,"").split(/\.|\[/));function E(e,t,r){let n=-1,s=We(t)?[t]:yr(t),l=s.length,f=l-1;for(;++n<l;){let y=s[n],_=r;if(n!==f){let m=e[y];_=U(m)||Array.isArray(m)?m:isNaN(+s[n+1])?{}:[]}e[y]=_,e=e[y]}return e}var _e=(e,t,r)=>{for(let n of r||Object.keys(e)){let s=c(e,n);if(s){let{_f:l,...f}=s;if(l&&t(l.name)){if(l.ref.focus){l.ref.focus();break}else if(l.refs&&l.refs[0].focus){l.refs[0].focus();break}}else U(f)&&_e(f,t)}}},X=()=>{let e=typeof performance>"u"?Date.now():performance.now()*1e3;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,t=>{let r=(Math.random()*16+e)%16|0;return(t=="x"?r:r&3|8).toString(16)})},Se=(e,t,r={})=>r.shouldFocus||C(r.shouldFocus)?r.focusName||`${e}.${C(r.focusIndex)?t:r.focusIndex}.`:"",Ne=e=>({isOnSubmit:!e||e===K.onSubmit,isOnBlur:e===K.onBlur,isOnChange:e===K.onChange,isOnAll:e===K.all,isOnTouch:e===K.onTouched}),Ie=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some(n=>e.startsWith(n)&&/^\.\w+/.test(e.slice(n.length)))),gr=(e,t,r)=>{let n=ae(c(e,r));return E(n,"root",t[r]),E(e,r,n),e},ie=e=>typeof e=="boolean",$e=e=>e.type==="file",ne=e=>typeof e=="function",ge=e=>J(e)||F.default.isValidElement(e),He=e=>e.type==="radio",me=e=>e instanceof RegExp,Ze={value:!1,isValid:!1},er={value:!0,isValid:!0},hr=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(r=>r&&r.checked&&!r.disabled).map(r=>r.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!C(e[0].attributes.value)?C(e[0].value)||e[0].value===""?er:{value:e[0].value,isValid:!0}:er:Ze}return Ze},rr={isValid:!1,value:null},_r=e=>Array.isArray(e)?e.reduce((t,r)=>r&&r.checked&&!r.disabled?{isValid:!0,value:r.value}:t,rr):rr;function tr(e,t,r="validate"){if(ge(e)||Array.isArray(e)&&e.every(ge)||ie(e)&&!e)return{type:r,message:ge(e)?e:"",ref:t}}var te=e=>U(e)&&!me(e)?e:{value:e,message:""},je=async(e,t,r,n,s)=>{let{ref:l,refs:f,required:y,maxLength:_,minLength:m,min:p,max:S,pattern:b,validate:x,name:q,valueAsNumber:ue,mount:re,disabled:le}=e._f;if(!re||le)return{};let B=f?f[0]:l,j=V=>{n&&B.reportValidity&&(B.setCustomValidity(ie(V)?"":V||""),B.reportValidity())},T={},A=He(l),v=de(l),w=A||v,O=(ue||$e(l))&&C(l.value)&&C(t)||t===""||Array.isArray(t)&&!t.length,M=Br.bind(null,q,r,T),Y=(V,D,k,P=Q.maxLength,z=Q.minLength)=>{let G=V?D:k;T[q]={type:V?P:z,message:G,ref:l,...M(V?P:z,G)}};if(s?!Array.isArray(t)||!t.length:y&&(!w&&(O||I(t))||ie(t)&&!t||v&&!hr(f).isValid||A&&!_r(f).isValid)){let{value:V,message:D}=ge(y)?{value:!!y,message:y}:te(y);if(V&&(T[q]={type:Q.required,message:D,ref:B,...M(Q.required,D)},!r))return j(D),T}if(!O&&(!I(p)||!I(S))){let V,D,k=te(S),P=te(p);if(!I(t)&&!isNaN(t)){let z=l.valueAsNumber||t&&+t;I(k.value)||(V=z>k.value),I(P.value)||(D=z<P.value)}else{let z=l.valueAsDate||new Date(t),G=ye=>new Date(new Date().toDateString()+" "+ye),oe=l.type=="time",Z=l.type=="week";J(k.value)&&t&&(V=oe?G(t)>G(k.value):Z?t>k.value:z>new Date(k.value)),J(P.value)&&t&&(D=oe?G(t)<G(P.value):Z?t<P.value:z<new Date(P.value))}if((V||D)&&(Y(!!V,k.message,P.message,Q.max,Q.min),!r))return j(T[q].message),T}if((_||m)&&!O&&(J(t)||s&&Array.isArray(t))){let V=te(_),D=te(m),k=!I(V.value)&&t.length>V.value,P=!I(D.value)&&t.length<D.value;if((k||P)&&(Y(k,V.message,D.message),!r))return j(T[q].message),T}if(b&&!O&&J(t)){let{value:V,message:D}=te(b);if(me(V)&&!t.match(V)&&(T[q]={type:Q.pattern,message:D,ref:l,...M(Q.pattern,D)},!r))return j(D),T}if(x){if(ne(x)){let V=await x(t),D=tr(V,B);if(D&&(T[q]={...D,...M(Q.validate,D.message)},!r))return j(D.message),T}else if(U(x)){let V={};for(let D in x){if(!W(V)&&!r)break;let k=tr(await x[D](t),B,D);k&&(V={...k,...M(D,k.message)},j(k.message),r&&(T[q]=V))}if(!W(V)&&(T[q]={ref:B,...V},!r))return T}}return j(!0),T};function De(e,t){return[...e,...H(t)]}var ke=e=>Array.isArray(e)?e.map(()=>{}):void 0;function Ee(e,t,r){return[...e.slice(0,t),...H(r),...e.slice(t)]}var Ce=(e,t,r)=>Array.isArray(e)?(C(e[r])&&(e[r]=void 0),e.splice(r,0,e.splice(t,1)[0]),e):[];function Oe(e,t){return[...H(t),...H(e)]}function Pr(e,t){let r=0,n=[...e];for(let s of t)n.splice(s-r,1),r++;return ae(n).length?n:[]}var Re=(e,t)=>C(t)?[]:Pr(e,H(t).sort((r,n)=>r-n)),Le=(e,t,r)=>{e[t]=[e[r],e[r]=e[t]][0]};function Nr(e,t){let r=t.slice(0,-1).length,n=0;for(;n<r;)e=C(e)?n++:e[t[n++]];return e}function Ir(e){for(let t in e)if(!C(e[t]))return!1;return!0}function N(e,t){let r=We(t)?[t]:yr(t),n=r.length==1?e:Nr(e,r),s=r[r.length-1],l;n&&delete n[s];for(let f=0;f<r.slice(0,-1).length;f++){let y=-1,_,m=r.slice(0,-(f+1)),p=m.length-1;for(f>0&&(l=e);++y<m.length;){let S=m[y];_=_?_[S]:e[S],p===y&&(U(_)&&W(_)||Array.isArray(_)&&Ir(_))&&(l?delete l[S]:delete e[S]),l=_}}return e}var sr=(e,t,r)=>(e[t]=r,e);function Qr(e){let t=ve(),{control:r=t.control,name:n,keyName:s="id",shouldUnregister:l}=e,[f,y]=F.default.useState(r._getFieldArray(n)),_=F.default.useRef(r._getFieldArray(n).map(X)),m=F.default.useRef(f),p=F.default.useRef(n),S=F.default.useRef(!1);p.current=n,m.current=f,r._names.array.add(n),e.rules&&r.register(n,e.rules),Fe({next:({values:A,name:v})=>{if(v===p.current||!v){let w=c(A,p.current);Array.isArray(w)&&(y(w),_.current=w.map(X))}},subject:r._subjects.array});let b=F.default.useCallback(A=>{S.current=!0,r._updateFieldArray(n,A)},[r,n]),x=(A,v)=>{let w=H($(A)),O=De(r._getFieldArray(n),w);r._names.focus=Se(n,O.length-1,v),_.current=De(_.current,w.map(X)),b(O),y(O),r._updateFieldArray(n,O,De,{argA:ke(A)})},q=(A,v)=>{let w=H($(A)),O=Oe(r._getFieldArray(n),w);r._names.focus=Se(n,0,v),_.current=Oe(_.current,w.map(X)),b(O),y(O),r._updateFieldArray(n,O,Oe,{argA:ke(A)})},ue=A=>{let v=Re(r._getFieldArray(n),A);_.current=Re(_.current,A),b(v),y(v),r._updateFieldArray(n,v,Re,{argA:A})},re=(A,v,w)=>{let O=H($(v)),M=Ee(r._getFieldArray(n),A,O);r._names.focus=Se(n,A,w),_.current=Ee(_.current,A,O.map(X)),b(M),y(M),r._updateFieldArray(n,M,Ee,{argA:A,argB:ke(v)})},le=(A,v)=>{let w=r._getFieldArray(n);Le(w,A,v),Le(_.current,A,v),b(w),y(w),r._updateFieldArray(n,w,Le,{argA:A,argB:v},!1)},B=(A,v)=>{let w=r._getFieldArray(n);Ce(w,A,v),Ce(_.current,A,v),b(w),y(w),r._updateFieldArray(n,w,Ce,{argA:A,argB:v},!1)},j=(A,v)=>{let w=$(v),O=sr(r._getFieldArray(n),A,w);_.current=[...O].map((M,Y)=>!M||Y===A?X():_.current[Y]),b(O),y([...O]),r._updateFieldArray(n,O,sr,{argA:A,argB:w},!0,!1)},T=A=>{let v=H($(A));_.current=v.map(X),b([...v]),y([...v]),r._updateFieldArray(n,[...v],w=>w,{},!0,!1)};return F.default.useEffect(()=>{if(r._stateFlags.action=!1,Ie(n,r._names)&&r._subjects.state.next({}),S.current&&(!Ne(r._options.mode).isOnSubmit||r._formState.isSubmitted))if(r._options.resolver)r._executeSchema([n]).then(A=>{let v=c(A.errors,n),w=c(r._formState.errors,n);(w?!v&&w.type:v&&v.type)&&(v?E(r._formState.errors,n,v):N(r._formState.errors,n),r._subjects.state.next({errors:r._formState.errors}))});else{let A=c(r._fields,n);A&&A._f&&je(A,c(r._formValues,n),r._options.criteriaMode===K.all,r._options.shouldUseNativeValidation,!0).then(v=>!W(v)&&r._subjects.state.next({errors:gr(r._formState.errors,v,n)}))}r._subjects.watch.next({name:n,values:r._formValues}),r._names.focus&&_e(r._fields,A=>!!A&&A.startsWith(r._names.focus||"")),r._names.focus="",r._proxyFormState.isValid&&r._updateValid()},[f,n,r]),F.default.useEffect(()=>(!c(r._formValues,n)&&r._updateFieldArray(n),()=>{(r._options.shouldUnregister||l)&&r.unregister(n)}),[n,r,s,l]),{swap:F.default.useCallback(le,[b,n,r]),move:F.default.useCallback(B,[b,n,r]),prepend:F.default.useCallback(q,[b,n,r]),append:F.default.useCallback(x,[b,n,r]),remove:F.default.useCallback(ue,[b,n,r]),insert:F.default.useCallback(re,[b,n,r]),update:F.default.useCallback(j,[b,n,r]),replace:F.default.useCallback(T,[b,n,r]),fields:F.default.useMemo(()=>f.map((A,v)=>({...A,[s]:_.current[v]||X()})),[f,s])}}function Te(){let e=[];return{get observers(){return e},next:s=>{for(let l of e)l.next(s)},subscribe:s=>(e.push(s),{unsubscribe:()=>{e=e.filter(l=>l!==s)}}),unsubscribe:()=>{e=[]}}}var fe=e=>I(e)||!nr(e);function ee(e,t){if(fe(e)||fe(t))return e===t;if(se(e)&&se(t))return e.getTime()===t.getTime();let r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(let s of r){let l=e[s];if(!n.includes(s))return!1;if(s!=="ref"){let f=t[s];if(se(l)&&se(f)||U(l)&&U(f)||Array.isArray(l)&&Array.isArray(f)?!ee(l,f):l!==f)return!1}}return!0}var qe=e=>{let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},mr=e=>e.type==="select-multiple",jr=e=>He(e)||de(e),Ue=e=>qe(e)&&e.isConnected,Ar=e=>{for(let t in e)if(ne(e[t]))return!0;return!1};function Ae(e,t={}){let r=Array.isArray(e);if(U(e)||r)for(let n in e)Array.isArray(e[n])||U(e[n])&&!Ar(e[n])?(t[n]=Array.isArray(e[n])?[]:{},Ae(e[n],t[n])):I(e[n])||(t[n]=!0);return t}function vr(e,t,r){let n=Array.isArray(e);if(U(e)||n)for(let s in e)Array.isArray(e[s])||U(e[s])&&!Ar(e[s])?C(t)||fe(r[s])?r[s]=Array.isArray(e[s])?Ae(e[s],[]):{...Ae(e[s])}:vr(e[s],I(t)?{}:t[s],r[s]):ee(e[s],t[s])?delete r[s]:r[s]=!0;return r}var Me=(e,t)=>vr(e,t,Ae(t)),Fr=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:n})=>C(e)?e:t?e===""?NaN:e&&+e:r&&J(e)?new Date(e):n?n(e):e;function Be(e){let t=e.ref;if(!(e.refs?e.refs.every(r=>r.disabled):t.disabled))return $e(t)?t.files:He(t)?_r(e.refs).value:mr(t)?[...t.selectedOptions].map(({value:r})=>r):de(t)?hr(e.refs).value:Fr(C(t.value)?e.ref.value:t.value,e)}var qr=(e,t,r,n)=>{let s={};for(let l of e){let f=c(t,l);f&&E(s,l,f._f)}return{criteriaMode:r,names:[...e],fields:s,shouldUseNativeValidation:n}},ce=e=>C(e)?e:me(e)?e.source:U(e)?me(e.value)?e.value.source:e.value:e,Wr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ir(e,t,r){let n=c(e,r);if(n||We(r))return{error:n,name:r};let s=r.split(".");for(;s.length;){let l=s.join("."),f=c(t,l),y=c(e,l);if(f&&!Array.isArray(f)&&r!==l)return{name:r};if(y&&y.type)return{name:l,error:y};s.pop()}return{name:r}}var $r=(e,t,r,n,s)=>s.isOnAll?!1:!r&&s.isOnTouch?!(t||e):(r?n.isOnBlur:s.isOnBlur)?!e:(r?n.isOnChange:s.isOnChange)?e:!0,Hr=(e,t)=>!ae(c(e,t)).length&&N(e,t),Kr={mode:K.onSubmit,reValidateMode:K.onChange,shouldFocusError:!0};function Gr(e={},t){let r={...Kr,...e},n=e.resetOptions&&e.resetOptions.keepDirtyValues,s={submitCount:0,isDirty:!1,isLoading:!0,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},l={},f=U(r.defaultValues)?$(r.defaultValues)||{}:{},y=r.shouldUnregister?{}:$(f),_={action:!1,mount:!1,watch:!1},m={mount:new Set,unMount:new Set,array:new Set,watch:new Set},p,S=0,b={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},x={watch:Te(),array:Te(),state:Te()},q=Ne(r.mode),ue=Ne(r.reValidateMode),re=r.criteriaMode===K.all,le=i=>a=>{clearTimeout(S),S=window.setTimeout(i,a)},B=async()=>{if(b.isValid){let i=r.resolver?W((await M()).errors):await V(l,!0);i!==s.isValid&&(s.isValid=i,x.state.next({isValid:i}))}},j=i=>b.isValidating&&x.state.next({isValidating:i}),T=(i,a=[],u,d,g=!0,o=!0)=>{if(d&&u){if(_.action=!0,o&&Array.isArray(c(l,i))){let h=u(c(l,i),d.argA,d.argB);g&&E(l,i,h)}if(o&&Array.isArray(c(s.errors,i))){let h=u(c(s.errors,i),d.argA,d.argB);g&&E(s.errors,i,h),Hr(s.errors,i)}if(b.touchedFields&&o&&Array.isArray(c(s.touchedFields,i))){let h=u(c(s.touchedFields,i),d.argA,d.argB);g&&E(s.touchedFields,i,h)}b.dirtyFields&&(s.dirtyFields=Me(f,y)),x.state.next({name:i,isDirty:k(i,a),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})}else E(y,i,a)},A=(i,a)=>{E(s.errors,i,a),x.state.next({errors:s.errors})},v=(i,a,u,d)=>{let g=c(l,i);if(g){let o=c(y,i,C(u)?c(f,i):u);C(o)||d&&d.defaultChecked||a?E(y,i,a?o:Be(g._f)):G(i,o),_.mount&&B()}},w=(i,a,u,d,g)=>{let o=!1,h=!1,R={name:i};if(!u||d){b.isDirty&&(h=s.isDirty,s.isDirty=R.isDirty=k(),o=h!==R.isDirty);let L=ee(c(f,i),a);h=c(s.dirtyFields,i),L?N(s.dirtyFields,i):E(s.dirtyFields,i,!0),R.dirtyFields=s.dirtyFields,o=o||b.dirtyFields&&h!==!L}if(u){let L=c(s.touchedFields,i);L||(E(s.touchedFields,i,u),R.touchedFields=s.touchedFields,o=o||b.touchedFields&&L!==u)}return o&&g&&x.state.next(R),o?R:{}},O=(i,a,u,d)=>{let g=c(s.errors,i),o=b.isValid&&ie(a)&&s.isValid!==a;if(e.delayError&&u?(p=le(()=>A(i,u)),p(e.delayError)):(clearTimeout(S),p=null,u?E(s.errors,i,u):N(s.errors,i)),(u?!ee(g,u):g)||!W(d)||o){let h={...d,...o&&ie(a)?{isValid:a}:{},errors:s.errors,name:i};s={...s,...h},x.state.next(h)}j(!1)},M=async i=>await r.resolver(y,r.context,qr(i||m.mount,l,r.criteriaMode,r.shouldUseNativeValidation)),Y=async i=>{let{errors:a}=await M();if(i)for(let u of i){let d=c(a,u);d?E(s.errors,u,d):N(s.errors,u)}else s.errors=a;return a},V=async(i,a,u={valid:!0})=>{for(let d in i){let g=i[d];if(g){let{_f:o,...h}=g;if(o){let R=m.array.has(o.name),L=await je(g,c(y,o.name),re,r.shouldUseNativeValidation,R);if(L[o.name]&&(u.valid=!1,a))break;!a&&(c(L,o.name)?R?gr(s.errors,L,o.name):E(s.errors,o.name,L[o.name]):N(s.errors,o.name))}h&&await V(h,a,u)}}return u.valid},D=()=>{for(let i of m.unMount){let a=c(l,i);a&&(a._f.refs?a._f.refs.every(u=>!Ue(u)):!Ue(a._f.ref))&&xe(i)}m.unMount=new Set},k=(i,a)=>(i&&a&&E(y,i,a),!ee(Ke(),f)),P=(i,a,u)=>dr(i,m,{..._.mount?y:C(a)?f:J(i)?{[i]:a}:a},u),z=i=>ae(c(_.mount?y:f,i,e.shouldUnregister?c(f,i,[]):[])),G=(i,a,u={})=>{let d=c(l,i),g=a;if(d){let o=d._f;o&&(!o.disabled&&E(y,i,Fr(a,o)),g=Pe&&qe(o.ref)&&I(a)?"":a,mr(o.ref)?[...o.ref.options].forEach(h=>h.selected=g.includes(h.value)):o.refs?de(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(g)?!!g.find(R=>R===h.value):g===h.value)):o.refs[0]&&(o.refs[0].checked=!!g):o.refs.forEach(h=>h.checked=h.value===g):$e(o.ref)?o.ref.value="":(o.ref.value=g,o.ref.type||x.watch.next({name:i})))}(u.shouldDirty||u.shouldTouch)&&w(i,g,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&be(i)},oe=(i,a,u)=>{for(let d in a){let g=a[d],o=`${i}.${d}`,h=c(l,o);(m.array.has(i)||!fe(g)||h&&!h._f)&&!se(g)?oe(o,g,u):G(o,g,u)}},Z=(i,a,u={})=>{let d=c(l,i),g=m.array.has(i),o=$(a);E(y,i,o),g?(x.array.next({name:i,values:y}),(b.isDirty||b.dirtyFields)&&u.shouldDirty&&(s.dirtyFields=Me(f,y),x.state.next({name:i,dirtyFields:s.dirtyFields,isDirty:k(i,o)}))):d&&!d._f&&!I(o)?oe(i,o,u):G(i,o,u),Ie(i,m)&&x.state.next({}),x.watch.next({name:i}),!_.mount&&t()},ye=async i=>{let a=i.target,u=a.name,d=c(l,u),g=()=>a.type?Be(d._f):ar(i);if(d){let o,h,R=g(),L=i.type===he.BLUR||i.type===he.FOCUS_OUT,Dr=!Wr(d._f)&&!r.resolver&&!c(s.errors,u)&&!d._f.deps||$r(L,c(s.touchedFields,u),s.isSubmitted,ue,q),we=Ie(u,m,L);E(y,u,R),L?(d._f.onBlur&&d._f.onBlur(i),p&&p(0)):d._f.onChange&&d._f.onChange(i);let pe=w(u,R,L,!1),kr=!W(pe)||we;if(!L&&x.watch.next({name:u,type:i.type}),Dr)return b.isValid&&B(),kr&&x.state.next({name:u,...we?{}:pe});if(!L&&we&&x.state.next({}),j(!0),r.resolver){let{errors:Xe}=await M([u]),Er=ir(s.errors,l,u),Ye=ir(Xe,l,Er.name||u);o=Ye.error,u=Ye.name,h=W(Xe)}else o=(await je(d,c(y,u),re,r.shouldUseNativeValidation))[u],o?h=!1:b.isValid&&(h=await V(l,!0));!fe(R)||g()===R?(d._f.deps&&be(d._f.deps),O(u,h,o,pe)):j(!1)}},be=async(i,a={})=>{let u,d,g=H(i);if(j(!0),r.resolver){let o=await Y(C(i)?i:g);u=W(o),d=i?!g.some(h=>c(o,h)):u}else i?(d=(await Promise.all(g.map(async o=>{let h=c(l,o);return await V(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!d&&!s.isValid)&&B()):d=u=await V(l);return x.state.next({...!J(i)||b.isValid&&u!==s.isValid?{}:{name:i},...r.resolver||!i?{isValid:u}:{},errors:s.errors,isValidating:!1}),a.shouldFocus&&!d&&_e(l,o=>o&&c(s.errors,o),i?g:m.mount),d},Ke=i=>{let a={...f,..._.mount?y:{}};return C(i)?a:J(i)?c(a,i):i.map(u=>c(a,u))},Ge=(i,a)=>({invalid:!!c((a||s).errors,i),isDirty:!!c((a||s).dirtyFields,i),isTouched:!!c((a||s).touchedFields,i),error:c((a||s).errors,i)}),br=i=>{i?H(i).forEach(a=>N(s.errors,a)):s.errors={},x.state.next({errors:s.errors})},xr=(i,a,u)=>{let d=(c(l,i,{_f:{}})._f||{}).ref;E(s.errors,i,{...a,ref:d}),x.state.next({name:i,errors:s.errors,isValid:!1}),u&&u.shouldFocus&&d&&d.focus&&d.focus()},Vr=(i,a)=>ne(i)?x.watch.subscribe({next:u=>i(P(void 0,a),u)}):P(i,a,!0),xe=(i,a={})=>{for(let u of i?H(i):m.mount)m.mount.delete(u),m.array.delete(u),c(l,u)&&(a.keepValue||(N(l,u),N(y,u)),!a.keepError&&N(s.errors,u),!a.keepDirty&&N(s.dirtyFields,u),!a.keepTouched&&N(s.touchedFields,u),!r.shouldUnregister&&!a.keepDefaultValue&&N(f,u));x.watch.next({}),x.state.next({...s,...a.keepDirty?{isDirty:k()}:{}}),!a.keepIsValid&&B()},Ve=(i,a={})=>{let u=c(l,i),d=ie(a.disabled);return E(l,i,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:i}},name:i,mount:!0,...a}}),m.mount.add(i),u?d&&E(y,i,a.disabled?void 0:c(y,i,Be(u._f))):v(i,!0,a.value),{...d?{disabled:a.disabled}:{},...r.shouldUseNativeValidation?{required:!!a.required,min:ce(a.min),max:ce(a.max),minLength:ce(a.minLength),maxLength:ce(a.maxLength),pattern:ce(a.pattern)}:{},name:i,onChange:ye,onBlur:ye,ref:g=>{if(g){Ve(i,a),u=c(l,i);let o=C(g.value)&&g.querySelectorAll&&g.querySelectorAll("input,select,textarea")[0]||g,h=jr(o),R=u._f.refs||[];if(h?R.find(L=>L===o):o===u._f.ref)return;E(l,i,{_f:{...u._f,...h?{refs:[...R.filter(Ue),o,...Array.isArray(c(f,i))?[{}]:[]],ref:{type:o.type,name:i}}:{ref:o}}}),v(i,!1,void 0,o)}else u=c(l,i,{}),u._f&&(u._f.mount=!1),(r.shouldUnregister||a.shouldUnregister)&&!(ur(m.array,i)&&_.action)&&m.unMount.add(i)}}},ze=()=>r.shouldFocusError&&_e(l,i=>i&&c(s.errors,i),m.mount),wr=(i,a)=>async u=>{u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let d=!0,g=$(y);x.state.next({isSubmitting:!0});try{if(r.resolver){let{errors:o,values:h}=await M();s.errors=o,g=h}else await V(l);W(s.errors)?(x.state.next({errors:{},isSubmitting:!0}),await i(g,u)):(a&&await a({...s.errors},u),ze())}catch(o){throw d=!1,o}finally{s.isSubmitted=!0,x.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:W(s.errors)&&d,submitCount:s.submitCount+1,errors:s.errors})}},pr=(i,a={})=>{c(l,i)&&(C(a.defaultValue)?Z(i,c(f,i)):(Z(i,a.defaultValue),E(f,i,a.defaultValue)),a.keepTouched||N(s.touchedFields,i),a.keepDirty||(N(s.dirtyFields,i),s.isDirty=a.defaultValue?k(i,c(f,i)):k()),a.keepError||(N(s.errors,i),b.isValid&&B()),x.state.next({...s}))},Je=(i,a={})=>{let u=i||f,d=$(u),g=i&&!W(i)?d:f;if(a.keepDefaultValues||(f=u),!a.keepValues){if(a.keepDirtyValues||n)for(let o of m.mount)c(s.dirtyFields,o)?E(g,o,c(y,o)):Z(o,c(g,o));else{if(Pe&&C(i))for(let o of m.mount){let h=c(l,o);if(h&&h._f){let R=Array.isArray(h._f.refs)?h._f.refs[0]:h._f.ref;if(qe(R)){let L=R.closest("form");if(L){L.reset();break}}}}l={}}y=e.shouldUnregister?a.keepDefaultValues?$(f):{}:d,x.array.next({values:g}),x.watch.next({values:g})}m={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!_.mount&&t(),_.mount=!b.isValid||!!a.keepIsValid,_.watch=!!e.shouldUnregister,x.state.next({submitCount:a.keepSubmitCount?s.submitCount:0,isDirty:a.keepDirty||a.keepDirtyValues?s.isDirty:!!(a.keepDefaultValues&&!ee(i,f)),isSubmitted:a.keepIsSubmitted?s.isSubmitted:!1,dirtyFields:a.keepDirty||a.keepDirtyValues?s.dirtyFields:a.keepDefaultValues&&i?Me(f,i):{},touchedFields:a.keepTouched?s.touchedFields:{},errors:a.keepErrors?s.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},Qe=(i,a)=>Je(ne(i)?i(y):i,a),Sr=(i,a={})=>{let u=c(l,i),d=u&&u._f;if(d){let g=d.refs?d.refs[0]:d.ref;g.focus&&(g.focus(),a.shouldSelect&&g.select())}};return ne(r.defaultValues)&&r.defaultValues().then(i=>{Qe(i,r.resetOptions),x.state.next({isLoading:!1})}),{control:{register:Ve,unregister:xe,getFieldState:Ge,_executeSchema:M,_focusError:ze,_getWatch:P,_getDirty:k,_updateValid:B,_removeUnmounted:D,_updateFieldArray:T,_getFieldArray:z,_reset:Je,_subjects:x,_proxyFormState:b,get _fields(){return l},get _formValues(){return y},get _stateFlags(){return _},set _stateFlags(i){_=i},get _defaultValues(){return f},get _names(){return m},set _names(i){m=i},get _formState(){return s},set _formState(i){s=i},get _options(){return r},set _options(i){r={...r,...i}}},trigger:be,register:Ve,handleSubmit:wr,watch:Vr,setValue:Z,getValues:Ke,reset:Qe,resetField:pr,clearErrors:br,unregister:xe,setError:xr,setFocus:Sr,getFieldState:Ge}}function Xr(e={}){let t=F.default.useRef(),[r,n]=F.default.useState({isDirty:!1,isValidating:!1,isLoading:!0,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:ne(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...Gr(e,()=>n(l=>({...l}))),formState:r});let s=t.current.control;return s._options=e,Fe({subject:s._subjects.state,next:l=>{cr(l,s._proxyFormState,!0)&&(s._formState={...s._formState,...l},n({...s._formState}))}}),F.default.useEffect(()=>{s._stateFlags.mount||(s._proxyFormState.isValid&&s._updateValid(),s._stateFlags.mount=!0),s._stateFlags.watch&&(s._stateFlags.watch=!1,s._subjects.state.next({})),s._removeUnmounted()}),F.default.useEffect(()=>{e.values&&!ee(e.values,s._defaultValues)&&s._reset(e.values,s._options.resetOptions)},[e.values,s]),F.default.useEffect(()=>{r.submitCount&&s._focusError()},[s,r.submitCount]),t.current.formState=or(r,s),t.current}export{c as a,ve as b,zr as c,Jr as d,Qr as e,Xr as f};