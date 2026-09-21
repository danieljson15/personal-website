"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8841],{3893:(e,f,n)=>{n.d(f,{m:()=>r});var i=n(35614);let t="fogFragment",a=`#ifdef FOG
var fog: f32=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color= vec4f(mix(uniforms.vFogColor,color.rgb,fog),color.a);
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},28841:(e,f,n)=>{n.r(f),n.d(f,{gaussianSplattingPixelShaderWGSL:()=>v});var i=n(35614),t=n(52079),a=n(50064),r=n(30027),o=n(42331),s=n(65016),l=n(3893);let d="gaussianSplattingFragmentDeclaration",c=`fn gaussianColor(inColor: vec4f,inPosition: vec2f)->vec4f
{var A : f32=-dot(inPosition,inPosition);if (A>-4.0)
{var B: f32=exp(A)*inColor.a;
#include<logDepthFragment>
var color: vec3f=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4f(color,B);} else {return vec4f(0.0);}}
`;i.l.IncludesShadersStoreWGSL[d]||(i.l.IncludesShadersStoreWGSL[d]=c);var g=n(39489);let u="gaussianSplattingPixelShader",S=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef GPUPICKER_PACK_DEPTH
#include<packingFunctions>
#endif
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var finalColor: vec4f=gaussianColor(input.vColor,input.vPosition);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef GPUPICKER_DEPTH
fragmentOutputs.fragData0=finalColor;
#ifdef GPUPICKER_PACK_DEPTH
fragmentOutputs.fragData1=pack(fragmentInputs.position.z);
#else
fragmentOutputs.fragData1=vec4f(fragmentInputs.position.z,0.0,0.0,1.0);
#endif
#else
fragmentOutputs.color=finalColor;
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;for(let e of(i.l.ShadersStoreWGSL[u]||(i.l.ShadersStoreWGSL[u]=S),[t.O,a.R,r.s,o.i,s.$,l.m,{name:d,shader:c},g.O]))i.l.IncludesShadersStoreWGSL[e.name]||(i.l.IncludesShadersStoreWGSL[e.name]=e.shader);let v={name:u,shader:S}},30027:(e,f,n)=>{n.d(f,{s:()=>r});var i=n(35614);let t="fogFragmentDeclaration",a=`#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
const E=2.71828;uniform vFogInfos: vec4f;uniform vFogColor: vec3f;varying vFogDistance: vec3f;fn CalcFogFactor()->f32
{var fogCoeff: f32=1.0;var fogStart: f32=uniforms.vFogInfos.y;var fogEnd: f32=uniforms.vFogInfos.z;var fogDensity: f32=uniforms.vFogInfos.w;var fogDistance: f32=length(fragmentInputs.vFogDistance);if (FOGMODE_LINEAR==uniforms.vFogInfos.x)
{fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);}
else if (FOGMODE_EXP==uniforms.vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDensity);}
else if (FOGMODE_EXP2==uniforms.vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);}
return clamp(fogCoeff,0.0,1.0);}
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},39489:(e,f,n)=>{n.d(f,{O:()=>r});var i=n(35614);let t="clipPlaneFragment",a=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fragmentInputs.fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fragmentInputs.fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fragmentInputs.fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fragmentInputs.fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fragmentInputs.fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fragmentInputs.fClipDistance6>0.0)
{discard;}
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},42331:(e,f,n)=>{n.d(f,{i:()=>r});var i=n(35614);let t="packingFunctions",a=`fn pack(depth: f32)->vec4f
{const bit_shift: vec4f= vec4f(255.0*255.0*255.0,255.0*255.0,255.0,1.0);const bit_mask: vec4f= vec4f(0.0,1.0/255.0,1.0/255.0,1.0/255.0);var res: vec4f=fract(depth*bit_shift);res-=res.xxyz*bit_mask;return res;}
fn unpack(color: vec4f)->f32
{const bit_shift: vec4f= vec4f(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},50064:(e,f,n)=>{n.d(f,{R:()=>r});var i=n(35614);let t="logDepthDeclaration",a=`#ifdef LOGARITHMICDEPTH
uniform logarithmicDepthConstant: f32;varying vFragmentDepth: f32;
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},52079:(e,f,n)=>{n.d(f,{O:()=>r});var i=n(35614);let t="clipPlaneFragmentDeclaration",a=`#ifdef CLIPPLANE
varying fClipDistance: f32;
#endif
#ifdef CLIPPLANE2
varying fClipDistance2: f32;
#endif
#ifdef CLIPPLANE3
varying fClipDistance3: f32;
#endif
#ifdef CLIPPLANE4
varying fClipDistance4: f32;
#endif
#ifdef CLIPPLANE5
varying fClipDistance5: f32;
#endif
#ifdef CLIPPLANE6
varying fClipDistance6: f32;
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}},65016:(e,f,n)=>{n.d(f,{$:()=>r});var i=n(35614);let t="logDepthFragment",a=`#ifdef LOGARITHMICDEPTH
fragmentOutputs.fragDepth=log2(fragmentInputs.vFragmentDepth)*uniforms.logarithmicDepthConstant*0.5;
#endif
`;i.l.IncludesShadersStoreWGSL[t]||(i.l.IncludesShadersStoreWGSL[t]=a);let r={name:t,shader:a}}}]);