(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[581],{1314:(e,t,r)=>{"use strict";r.d(t,{EnhancedBackground:()=>l});var n=r(5155),a=r(2115),o=r(1362);function l(){let e=(0,a.useRef)(null),{resolvedTheme:t}=(0,o.D)(),[r,l]=(0,a.useState)({width:0,height:0}),c=(0,a.useRef)(),i=(0,a.useRef)(0),s=(0,a.useRef)(null),u=(0,a.useRef)({x:0,y:0}),d=(0,a.useRef)({x:0,y:0}),m=(0,a.useRef)({x:0,y:0}),h=(0,a.useRef)({top:0,left:0}),f=()=>{if(e.current){let t=e.current.getBoundingClientRect();h.current={top:t.top,left:t.left}}},g=t=>{if(!e.current)return;let r=t.clientX,n=t.clientY;s.current={x:r,y:n},m.current={x:r,y:n}},y=e=>{if(e.touches.length>0){let t=e.touches[0].clientX,r=e.touches[0].clientY;s.current={x:t,y:r},m.current={x:t,y:r}}},p=()=>{f()},b=()=>{if(e.current){let{width:t,height:r}=e.current.getBoundingClientRect();l({width:t,height:r}),f(),u.current={x:t/2,y:r/2},0===d.current.x&&0===d.current.y&&(d.current={...u.current},m.current={...u.current},s.current={...u.current}),e.current.width=t,e.current.height=r}},v=t=>{let r=e.current;if(!r)return;let n=r.getContext("2d");if(!n)return;i.current=.001*t,n.clearRect(0,0,r.width,r.height);let a=m.current.x-h.current.left,o=m.current.y-h.current.top;d.current.x+=(a-d.current.x)*.1,d.current.y+=(o-d.current.y)*.1,(d.current.x<-50||d.current.x>r.width+50||d.current.y<-50||d.current.y>r.height+50)&&(d.current.x=u.current.x,d.current.y=u.current.y),S(n,r.width,r.height,i.current),C(n,r.width,r.height,i.current),w(n,r.width,r.height,i.current),c.current=requestAnimationFrame(v)},S=(e,r,n,a)=>{let o="dark"===t,l=n/15;for(let t=0;t<15;t++){let n=t*l;e.beginPath(),e.moveTo(0,n);for(let t=0;t<r;t+=5){let r=n+25*Math.sin(.002*t+.5*a);e.lineTo(t,r)}o?e.strokeStyle="rgba(255, 255, 255, ".concat(.08+t/15*.08,")"):e.strokeStyle="rgba(100, 110, 120, ".concat(.08+t/15*.08,")"),e.lineWidth=1.5,e.stroke()}},C=(e,r,n,a)=>{let o="dark"===t;for(let t=0;t<40;t++){let l=(.5*Math.sin(.08*t*a+50*t)+.5)*r,c=(.5*Math.cos(.06*t*a+50*t)+.5)*n,i=1.5+1.5*Math.sin(.5*a*t);e.beginPath(),e.arc(l,c,i,0,2*Math.PI),o?e.fillStyle="rgba(255, 255, 255, ".concat(.3+.15*Math.sin(a+t),")"):e.fillStyle="rgba(100, 110, 120, ".concat(.3+.15*Math.sin(a+t),")"),e.fill()}},w=(e,r,n,a)=>{let o="dark"===t,l=1+.1*Math.sin(1.5*a),c=.9+.1*Math.sin(2*a),i=e.createRadialGradient(d.current.x,d.current.y,0,d.current.x,d.current.y,o?300*l:280*l);o?(i.addColorStop(0,"rgba(255, 255, 255, ".concat(c,")")),i.addColorStop(.2,"rgba(230, 230, 230, 0.7)"),i.addColorStop(.4,"rgba(200, 200, 200, 0.4)"),i.addColorStop(.7,"rgba(150, 150, 150, 0.2)"),i.addColorStop(1,"rgba(0, 0, 0, 0)")):(i.addColorStop(0,"rgba(180, 185, 190, ".concat(.9*c,")")),i.addColorStop(.2,"rgba(150, 160, 170, 0.7)"),i.addColorStop(.4,"rgba(120, 130, 140, 0.5)"),i.addColorStop(.6,"rgba(90, 100, 110, 0.3)"),i.addColorStop(.8,"rgba(70, 75, 80, 0.1)"),i.addColorStop(1,"rgba(255, 255, 255, 0)")),e.fillStyle=i,e.fillRect(0,0,r,n);let s=30*(1+.15*Math.sin(3*a)),u=e.createRadialGradient(d.current.x,d.current.y,0,d.current.x,d.current.y,s);if(o?(u.addColorStop(0,"rgba(255, 255, 255, ".concat(c,")")),u.addColorStop(1,"rgba(255, 255, 255, 0)")):(u.addColorStop(0,"rgba(160, 170, 180, ".concat(.95*c,")")),u.addColorStop(.5,"rgba(130, 140, 150, ".concat(.7*c,")")),u.addColorStop(1,"rgba(100, 110, 120, 0)")),e.fillStyle=u,e.fillRect(0,0,r,n),!o){let t=15*(1+.1*Math.sin(2.5*a)),o=e.createRadialGradient(d.current.x,d.current.y,.2*t,d.current.x,d.current.y,t);o.addColorStop(0,"rgba(70, 75, 80, 0.1)"),o.addColorStop(.5,"rgba(60, 65, 70, 0.15)"),o.addColorStop(1,"rgba(50, 55, 60, 0)"),e.fillStyle=o,e.fillRect(0,0,r,n)}},x=()=>{document.hidden?u.current&&(d.current={...u.current}):f()};return(0,a.useEffect)(()=>(document.addEventListener("mousemove",g,{passive:!0}),document.addEventListener("touchmove",y,{passive:!0}),window.addEventListener("resize",b),window.addEventListener("scroll",p,{passive:!0}),document.addEventListener("visibilitychange",x),b(),f(),c.current=requestAnimationFrame(v),()=>{document.removeEventListener("mousemove",g),document.removeEventListener("touchmove",y),window.removeEventListener("resize",b),window.removeEventListener("scroll",p),document.removeEventListener("visibilitychange",x),c.current&&cancelAnimationFrame(c.current)}),[t]),(0,n.jsx)("canvas",{ref:e,className:"fixed inset-0 h-full w-full z-0",style:{touchAction:"none"}})}},1362:(e,t,r)=>{"use strict";r.d(t,{D:()=>s,N:()=>u});var n=r(2115),a=(e,t,r,n,a,o,l,c)=>{let i=document.documentElement,s=["light","dark"];function u(t){var r;(Array.isArray(e)?e:[e]).forEach(e=>{let r="class"===e,n=r&&o?a.map(e=>o[e]||e):a;r?(i.classList.remove(...n),i.classList.add(o&&o[t]?o[t]:t)):i.setAttribute(e,t)}),r=t,c&&s.includes(r)&&(i.style.colorScheme=r)}if(n)u(n);else try{let e=localStorage.getItem(t)||r,n=l&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;u(n)}catch(e){}},o=["light","dark"],l="(prefers-color-scheme: dark)",c=n.createContext(void 0),i={setTheme:e=>{},themes:[]},s=()=>{var e;return null!=(e=n.useContext(c))?e:i},u=e=>n.useContext(c)?n.createElement(n.Fragment,null,e.children):n.createElement(m,{...e}),d=["light","dark"],m=e=>{let{forcedTheme:t,disableTransitionOnChange:r=!1,enableSystem:a=!0,enableColorScheme:i=!0,storageKey:s="theme",themes:u=d,defaultTheme:m=a?"system":"light",attribute:p="data-theme",value:b,children:v,nonce:S,scriptProps:C}=e,[w,x]=n.useState(()=>f(s,m)),[E,k]=n.useState(()=>"system"===w?y():w),T=b?Object.values(b):u,L=n.useCallback(e=>{let t=e;if(!t)return;"system"===e&&a&&(t=y());let n=b?b[t]:t,l=r?g(S):null,c=document.documentElement,s=e=>{"class"===e?(c.classList.remove(...T),n&&c.classList.add(n)):e.startsWith("data-")&&(n?c.setAttribute(e,n):c.removeAttribute(e))};if(Array.isArray(p)?p.forEach(s):s(p),i){let e=o.includes(m)?m:null,r=o.includes(t)?t:e;c.style.colorScheme=r}null==l||l()},[S]),R=n.useCallback(e=>{let t="function"==typeof e?e(w):e;x(t);try{localStorage.setItem(s,t)}catch(e){}},[w]),M=n.useCallback(e=>{k(y(e)),"system"===w&&a&&!t&&L("system")},[w,t]);n.useEffect(()=>{let e=window.matchMedia(l);return e.addListener(M),M(e),()=>e.removeListener(M)},[M]),n.useEffect(()=>{let e=e=>{e.key===s&&(e.newValue?x(e.newValue):R(m))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[R]),n.useEffect(()=>{L(null!=t?t:w)},[t,w]);let A=n.useMemo(()=>({theme:w,setTheme:R,forcedTheme:t,resolvedTheme:"system"===w?E:w,themes:a?[...u,"system"]:u,systemTheme:a?E:void 0}),[w,R,t,E,a,u]);return n.createElement(c.Provider,{value:A},n.createElement(h,{forcedTheme:t,storageKey:s,attribute:p,enableSystem:a,enableColorScheme:i,defaultTheme:m,value:b,themes:u,nonce:S,scriptProps:C}),v)},h=n.memo(e=>{let{forcedTheme:t,storageKey:r,attribute:o,enableSystem:l,enableColorScheme:c,defaultTheme:i,value:s,themes:u,nonce:d,scriptProps:m}=e,h=JSON.stringify([o,r,i,t,u,s,l,c]).slice(1,-1);return n.createElement("script",{...m,suppressHydrationWarning:!0,nonce:"",dangerouslySetInnerHTML:{__html:"(".concat(a.toString(),")(").concat(h,")")}})}),f=(e,t)=>{let r;try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t},g=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},y=e=>(e||(e=window.matchMedia(l)),e.matches?"dark":"light")},2524:(e,t,r)=>{"use strict";r.d(t,{TypingEffect:()=>o});var n=r(5155),a=r(2115);function o(e){let{text:t,speed:r=70,delay:o=0,className:l="",cursor:c=!0,hideCursorAfter:i=1e3}=e,[s,u]=(0,a.useState)(""),[d,m]=(0,a.useState)(0),[h,f]=(0,a.useState)(!1),[g,y]=(0,a.useState)(c);return(0,a.useEffect)(()=>{let e=setTimeout(()=>{f(!0)},o);return()=>clearTimeout(e)},[o]),(0,a.useEffect)(()=>{if(h){if(d<t.length){let e=setTimeout(()=>{u(e=>e+t[d]),m(e=>e+1)},r);return()=>clearTimeout(e)}if(c&&i>0){let e=setTimeout(()=>{y(!1)},i);return()=>clearTimeout(e)}}},[d,h,r,t,c,i]),(0,n.jsxs)("span",{className:l,children:[s,g&&d<t.length&&(0,n.jsx)("span",{className:"inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink"}),g&&d>=t.length&&(0,n.jsx)("span",{className:"inline-block w-[2px] h-[1em] bg-primary ml-[1px] animate-blink"})]})}},4581:(e,t,r)=>{Promise.resolve().then(r.bind(r,1314)),Promise.resolve().then(r.bind(r,2524))}}]);