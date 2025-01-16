import{c as te,d as k,o as O,i as z,k as B,p as A,n as ne,v as l,B as V,bg as he,q as R,s as I,bh as ge,z as J,bi as ye,b5 as se,E as q,bj as ve,y as $,I as oe,bk as be,K as we,A as ae,bl as _e,bm as Se,bn as xe,an as Ce,bo as re,bp as Be,r as N,ah as ie,aX as Q,bq as ke,br as Oe,au as U,w as j,bs as le,ap as ze,ag as Ae,aq as L,bt as Me,bu as $e,bv as De,bw as Ee,bx as Te,by as Ne}from "./index-BiHb15Sg.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=te("ChevronRightIcon",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=te("UserPlusIcon",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]),dt=(e,t)=>{const n=e.__vccOpts||e;for(const[s,o]of t)n[s]=o;return n},ft=k({__name:"Avatar",props:{class:{},size:{default:"sm"},shape:{default:"circle"}},setup(e){const t=e;return(n,s)=>(O(),z(l(he),{class:ne(l(V)(l(Pe)({size:n.size,shape:n.shape}),t.class))},{default:B(()=>[A(n.$slots,"default")]),_:3},8,["class"]))}}),pt=k({__name:"AvatarFallback",props:{delayMs:{},asChild:{type:Boolean},as:{}},setup(e){const t=e;return(n,s)=>(O(),z(l(ge),R(I(t)),{default:B(()=>[A(n.$slots,"default")]),_:3},16))}}),mt=k({__name:"AvatarImage",props:{src:{},referrerPolicy:{},asChild:{type:Boolean},as:{}},setup(e){const t=e;return(n,s)=>(O(),z(l(ye),J(t,{class:"h-full w-full object-cover"}),null,16))}}),Pe=se("inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",{variants:{size:{xs:"h-8 w-8 text-xs",sm:"h-10 w-10 text-xs",base:"h-16 w-16 text-2xl",lg:"h-32 w-32 text-5xl",xl:"h-48 w-48 text-5xl"},shape:{circle:"rounded-full",square:"rounded-md"}}}),ht=k({__name:"DropdownMenu",props:{defaultOpen:{type:Boolean},open:{type:Boolean},dir:{},modal:{type:Boolean}},emits:["update:open"],setup(e,{emit:t}){const o=q(e,t);return(i,r)=>(O(),z(l(ve),R(I(l(o))),{default:B(()=>[A(i.$slots,"default")]),_:3},16))}}),gt=k({__name:"DropdownMenuContent",props:{forceMount:{type:Boolean},loop:{type:Boolean},side:{},sideOffset:{default:4},align:{},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},updatePositionStrategy:{},prioritizePosition:{type:Boolean},asChild:{type:Boolean},as:{},class:{}},emits:["escapeKeyDown","pointerDownOutside","focusOutside","interactOutside","closeAutoFocus"],setup(e,{emit:t}){const n=e,s=t,o=$(()=>{const{class:r,...c}=n;return c}),i=q(o,s);return(r,c)=>(O(),z(l(we),null,{default:B(()=>[oe(l(be),J(l(i),{class:l(V)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",n.class)}),{default:B(()=>[A(r.$slots,"default")]),_:3},16,["class"])]),_:3}))}}),yt=k({__name:"DropdownMenuItem",props:{disabled:{type:Boolean},textValue:{},asChild:{type:Boolean},as:{},class:{},inset:{type:Boolean}},setup(e){const t=e,n=$(()=>{const{class:o,...i}=t;return i}),s=ae(n);return(o,i)=>(O(),z(l(_e),J(l(s),{class:l(V)("relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0",o.inset&&"pl-8",t.class)}),{default:B(()=>[A(o.$slots,"default")]),_:3},16,["class"]))}}),vt=k({__name:"DropdownMenuTrigger",props:{disabled:{type:Boolean},asChild:{type:Boolean},as:{}},setup(e){const n=ae(e);return(s,o)=>(O(),z(l(Se),J({class:"outline-none"},l(n)),{default:B(()=>[A(s.$slots,"default")]),_:3},16))}}),bt=k({__name:"Button",props:{variant:{},size:{},class:{},asChild:{type:Boolean},as:{default:"button"}},setup(e){const t=e;return(n,s)=>(O(),z(l(xe),{as:n.as,"as-child":n.asChild,class:ne(l(V)(l(je)({variant:n.variant,size:n.size}),t.class))},{default:B(()=>[A(n.$slots,"default")]),_:3},8,["as","as-child","class"]))}}),je=se("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-8 px-4 py-2",sm:"h-7 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-7 w-7"}},defaultVariants:{variant:"default",size:"default"}});function ue(e){return ke()?(Oe(e),!0):!1}const G=new WeakMap,Le=(...e)=>{var t;const n=e[0],s=(t=U())==null?void 0:t.proxy;if(s==null&&!le())throw new Error("injectLocal must be called in setup");return s&&G.has(s)&&n in G.get(s)?G.get(s)[n]:ze(...e)},Fe=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const We=e=>typeof e<"u",Ve=Object.prototype.toString,Re=e=>Ve.call(e)==="[object Object]",ce=()=>{};function Ie(e,t){function n(...s){return new Promise((o,i)=>{Promise.resolve(e(()=>t.apply(this,s),{fn:t,thisArg:this,args:s})).then(o).catch(i)})}return n}const de=e=>e();function Je(e=de){const t=N(!0);function n(){t.value=!1}function s(){t.value=!0}const o=(...i)=>{t.value&&e(...i)};return{isActive:re(t),pause:n,resume:s,eventFilter:o}}function X(e){return e.endsWith("rem")?Number.parseFloat(e)*16:Number.parseFloat(e)}function He(e){return U()}function Y(e){return Array.isArray(e)?e:[e]}function Ke(...e){if(e.length!==1)return Ce(...e);const t=e[0];return typeof t=="function"?re(Be(()=>({get:t,set:ce}))):N(t)}function qe(e,t,n={}){const{eventFilter:s=de,...o}=n;return j(e,Ie(s,t),o)}function Ue(e,t,n={}){const{eventFilter:s,...o}=n,{eventFilter:i,pause:r,resume:c,isActive:_}=Je(s);return{stop:qe(e,t,{...o,eventFilter:i}),pause:r,resume:c,isActive:_}}function fe(e,t=!0,n){He()?ie(e,n):t?e():Q(e)}const W=Fe?window:void 0;function pe(e){var t;const n=L(e);return(t=n==null?void 0:n.$el)!=null?t:n}function Z(...e){let t,n,s,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,s,o]=e,t=W):[t,n,s,o]=e,!t)return ce;n=Y(n),s=Y(s);const i=[],r=()=>{i.forEach(g=>g()),i.length=0},c=(g,d,w,u)=>(g.addEventListener(d,w,u),()=>g.removeEventListener(d,w,u)),_=j(()=>[pe(t),L(o)],([g,d])=>{if(r(),!g)return;const w=Re(d)?{...d}:d;i.push(...n.flatMap(u=>s.map(y=>c(g,u,y,w))))},{immediate:!0,flush:"post"}),S=()=>{_(),r()};return ue(S),S}function Ge(){const e=N(!1),t=U();return t&&ie(()=>{e.value=!0},t),e}function Qe(e){const t=Ge();return $(()=>(t.value,!!e()))}const Xe=Symbol("vueuse-ssr-width");function Ye(){const e=le()?Le(Xe,null):null;return typeof e=="number"?e:void 0}function Ze(e,t={}){const{window:n=W,ssrWidth:s=Ye()}=t,o=Qe(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function"),i=N(typeof s=="number");let r;const c=N(!1),_=d=>{c.value=d.matches},S=()=>{r&&("removeEventListener"in r?r.removeEventListener("change",_):r.removeListener(_))},g=Me(()=>{if(i.value){i.value=!o.value;const d=L(e).split(",");c.value=d.some(w=>{const u=w.includes("not all"),y=w.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),f=w.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let m=!!(y||f);return y&&m&&(m=s>=X(y[1])),f&&m&&(m=s<=X(f[1])),u?!m:m});return}o.value&&(S(),r=n.matchMedia(L(e)),"addEventListener"in r?r.addEventListener("change",_):r.addListener(_),c.value=r.matches)});return ue(()=>{g(),S(),r=void 0}),$(()=>c.value)}function et(e){return JSON.parse(JSON.stringify(e))}const H=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},K="__vueuse_ssr_handlers__",tt=nt();function nt(){return K in H||(H[K]=H[K]||{}),H[K]}function me(e,t){return tt[e]||t}function st(e){return Ze("(prefers-color-scheme: dark)",e)}function ot(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const at={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},ee="vueuse-storage";function rt(e,t,n,s={}){var o;const{flush:i="pre",deep:r=!0,listenToStorageChanges:c=!0,writeDefaults:_=!0,mergeDefaults:S=!1,shallow:g,window:d=W,eventFilter:w,onError:u=a=>{console.error(a)},initOnMounted:y}=s,f=(g?Ae:N)(typeof t=="function"?t():t),m=$(()=>L(e));if(!n)try{n=me("getDefaultStorage",()=>{var a;return(a=W)==null?void 0:a.localStorage})()}catch(a){u(a)}if(!n)return f;const x=L(t),E=ot(x),h=(o=s.serializer)!=null?o:at[E],{pause:v,resume:C}=Ue(f,()=>P(f.value),{flush:i,deep:r,eventFilter:w});j(m,()=>D(),{flush:i}),d&&c&&fe(()=>{n instanceof Storage?Z(d,"storage",D,{passive:!0}):Z(d,ee,T),y&&D()}),y||D();function M(a,p){if(d){const b={key:m.value,oldValue:a,newValue:p,storageArea:n};d.dispatchEvent(n instanceof Storage?new StorageEvent("storage",b):new CustomEvent(ee,{detail:b}))}}function P(a){try{const p=n.getItem(m.value);if(a==null)M(p,null),n.removeItem(m.value);else{const b=h.write(a);p!==b&&(n.setItem(m.value,b),M(p,b))}}catch(p){u(p)}}function F(a){const p=a?a.newValue:n.getItem(m.value);if(p==null)return _&&x!=null&&n.setItem(m.value,h.write(x)),x;if(!a&&S){const b=h.read(p);return typeof S=="function"?S(b,x):E==="object"&&!Array.isArray(b)?{...x,...b}:b}else return typeof p!="string"?p:h.read(p)}function D(a){if(!(a&&a.storageArea!==n)){if(a&&a.key==null){f.value=x;return}if(!(a&&a.key!==m.value)){v();try{(a==null?void 0:a.newValue)!==h.write(f.value)&&(f.value=F(a))}catch(p){u(p)}finally{a?Q(C):C()}}}}function T(a){D(a.detail)}return f}const it="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";function wt(e={}){const{selector:t="html",attribute:n="class",initialValue:s="auto",window:o=W,storage:i,storageKey:r="vueuse-color-scheme",listenToStorageChanges:c=!0,storageRef:_,emitAuto:S,disableTransition:g=!0}=e,d={auto:"",light:"light",dark:"dark",...e.modes||{}},w=st({window:o}),u=$(()=>w.value?"dark":"light"),y=_||(r==null?Ke(s):rt(r,s,i,{window:o,listenToStorageChanges:c})),f=$(()=>y.value==="auto"?u.value:y.value),m=me("updateHTMLAttrs",(v,C,M)=>{const P=typeof v=="string"?o==null?void 0:o.document.querySelector(v):pe(v);if(!P)return;const F=new Set,D=new Set;let T=null;if(C==="class"){const p=M.split(/\s/g);Object.values(d).flatMap(b=>(b||"").split(/\s/g)).filter(Boolean).forEach(b=>{p.includes(b)?F.add(b):D.add(b)})}else T={key:C,value:M};if(F.size===0&&D.size===0&&T===null)return;let a;g&&(a=o.document.createElement("style"),a.appendChild(document.createTextNode(it)),o.document.head.appendChild(a));for(const p of F)P.classList.add(p);for(const p of D)P.classList.remove(p);T&&P.setAttribute(T.key,T.value),g&&(o.getComputedStyle(a).opacity,document.head.removeChild(a))});function x(v){var C;m(t,n,(C=d[v])!=null?C:v)}function E(v){e.onChanged?e.onChanged(v,x):x(v)}j(f,E,{flush:"post",immediate:!0}),fe(()=>E(f.value));const h=$({get(){return S?y.value:f.value},set(v){y.value=v}});return Object.assign(h,{store:y,system:u,state:f})}function _t(e,t,n,s={}){var o,i,r;const{clone:c=!1,passive:_=!1,eventName:S,deep:g=!1,defaultValue:d,shouldEmit:w}=s,u=U(),y=n||(u==null?void 0:u.emit)||((o=u==null?void 0:u.$emit)==null?void 0:o.bind(u))||((r=(i=u==null?void 0:u.proxy)==null?void 0:i.$emit)==null?void 0:r.bind(u==null?void 0:u.proxy));let f=S;f=f||`update:${t.toString()}`;const m=h=>c?typeof c=="function"?c(h):et(h):h,x=()=>We(e[t])?m(e[t]):d,E=h=>{w?w(h)&&y(f,h):y(f,h)};if(_){const h=x(),v=N(h);let C=!1;return j(()=>e[t],M=>{C||(C=!0,v.value=m(M),Q(()=>C=!1))}),j(v,M=>{!C&&(M!==e[t]||g)&&E(M)},{deep:g}),v}else return $({get(){return x()},set(h){E(h)}})}const St=k({__name:"Tooltip",props:{defaultOpen:{type:Boolean},open:{type:Boolean},delayDuration:{},disableHoverableContent:{type:Boolean},disableClosingTrigger:{type:Boolean},disabled:{type:Boolean},ignoreNonKeyboardFocus:{type:Boolean}},emits:["update:open"],setup(e,{emit:t}){const o=q(e,t);return(i,r)=>(O(),z(l($e),R(I(l(o))),{default:B(()=>[A(i.$slots,"default")]),_:3},16))}}),xt=k({inheritAttrs:!1,__name:"TooltipContent",props:{forceMount:{type:Boolean},ariaLabel:{},asChild:{type:Boolean},as:{},side:{},sideOffset:{default:4},align:{},alignOffset:{},avoidCollisions:{type:Boolean},collisionBoundary:{},collisionPadding:{},arrowPadding:{},sticky:{},hideWhenDetached:{type:Boolean},class:{}},emits:["escapeKeyDown","pointerDownOutside"],setup(e,{emit:t}){const n=e,s=t,o=$(()=>{const{class:r,...c}=n;return c}),i=q(o,s);return(r,c)=>(O(),z(l(Ee),null,{default:B(()=>[oe(l(De),J({...l(i),...r.$attrs},{class:l(V)("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",n.class)}),{default:B(()=>[A(r.$slots,"default")]),_:3},16,["class"])]),_:3}))}}),Ct=k({__name:"TooltipProvider",props:{delayDuration:{},skipDelayDuration:{},disableHoverableContent:{type:Boolean},disableClosingTrigger:{type:Boolean},disabled:{type:Boolean},ignoreNonKeyboardFocus:{type:Boolean}},setup(e){const t=e;return(n,s)=>(O(),z(l(Te),R(I(t)),{default:B(()=>[A(n.$slots,"default")]),_:3},16))}}),Bt=k({__name:"TooltipTrigger",props:{asChild:{type:Boolean},as:{}},setup(e){const t=e;return(n,s)=>(O(),z(l(Ne),R(I(t)),{default:B(()=>[A(n.$slots,"default")]),_:3},16))}});export{ut as C,ct as U,dt as _,ft as a,mt as b,pt as c,vt as d,yt as e,gt as f,ht as g,bt as h,St as i,Bt as j,xt as k,Ct as l,je as m,_t as n,wt as u};