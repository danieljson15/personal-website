"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[239],{239:(a,e,r)=>{r.r(e),r.d(e,{shadowMapFragmentSoftTransparentShadowWGSL:()=>S});var s=r(35614);let t="shadowMapFragmentSoftTransparentShadow",n=`#if SM_SOFTTRANSPARENTSHADOW==1
if ((bayerDither8(floor(((fragmentInputs.position.xy)%(8.0)))))/64.0>=uniforms.softTransparentShadowSM.x*alpha) {discard;}
#endif
`;s.l.IncludesShadersStoreWGSL[t]||(s.l.IncludesShadersStoreWGSL[t]=n);let S={name:t,shader:n}}}]);