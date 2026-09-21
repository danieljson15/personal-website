"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1138],{41138:(a,e,r)=>{r.r(e),r.d(e,{shadowMapFragmentSoftTransparentShadow:()=>t});var s=r(35614);let d="shadowMapFragmentSoftTransparentShadow",o=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(mod(gl_FragCoord.xy,8.0))))/64.0>=softTransparentShadowSM.x*alpha) discard;
#endif
`;s.l.IncludesShadersStore[d]||(s.l.IncludesShadersStore[d]=o);let t={name:d,shader:o}}}]);