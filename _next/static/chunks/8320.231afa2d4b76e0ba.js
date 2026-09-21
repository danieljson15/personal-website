"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8320],{22391:(e,i,a)=>{a.d(i,{_:()=>l});var f=a(35614);let n="logDepthDeclaration",o=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},36178:(e,i,a)=>{a.d(i,{f:()=>l});var f=a(35614);let n="packingFunctions",o=`vec4 pack(float depth)
{const vec4 bit_shift=vec4(255.0*255.0*255.0,255.0*255.0,255.0,1.0);const vec4 bit_mask=vec4(0.0,1.0/255.0,1.0/255.0,1.0/255.0);vec4 res=fract(depth*bit_shift);res-=res.xxyz*bit_mask;return res;}
float unpack(vec4 color)
{const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},58320:(e,i,a)=>{a.r(i),a.d(i,{gaussianSplattingPixelShader:()=>E});var f=a(35614),n=a(84010),o=a(22391),l=a(99058),t=a(36178),r=a(60889),d=a(72358);let s="gaussianSplattingFragmentDeclaration",c=`vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;f.l.IncludesShadersStore[s]||(f.l.IncludesShadersStore[s]=c);var g=a(68398);let C="gaussianSplattingPixelShader",P=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
#ifdef GPUPICKER_DEPTH
layout(location=0) out highp vec4 glFragData[2];
#endif
#ifdef GPUPICKER_PACK_DEPTH
#include<packingFunctions>
#endif
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
void main () {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec4 finalColor=gaussianColor(vColor);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
#ifdef GPUPICKER_DEPTH
glFragData[0]=finalColor;
#ifdef GPUPICKER_PACK_DEPTH
glFragData[1]=pack(gl_FragCoord.z);
#else
glFragData[1]=vec4(gl_FragCoord.z,0.0,0.0,1.0);
#endif
#else
gl_FragColor=finalColor;
#endif
#define CUSTOM_FRAGMENT_MAIN_END
}
`;for(let e of(f.l.ShadersStore[C]||(f.l.ShadersStore[C]=P),[n.T,o._,l.V,t.f,r.w,d.f,{name:s,shader:c},g.t]))f.l.IncludesShadersStore[e.name]||(f.l.IncludesShadersStore[e.name]=e.shader);let E={name:C,shader:P}},60889:(e,i,a)=>{a.d(i,{w:()=>l});var f=a(35614);let n="logDepthFragment",o=`#ifdef LOGARITHMICDEPTH
gl_FragDepthEXT=log2(vFragmentDepth)*logarithmicDepthConstant*0.5;
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},68398:(e,i,a)=>{a.d(i,{t:()=>l});var f=a(35614);let n="clipPlaneFragment",o=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fClipDistance6>0.0)
{discard;}
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},72358:(e,i,a)=>{a.d(i,{f:()=>l});var f=a(35614);let n="fogFragment",o=`#ifdef FOG
float fog=CalcFogFactor();
#ifdef PBR
fog=toLinearSpace(fog);
#endif
color.rgb=mix(vFogColor,color.rgb,fog);
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},84010:(e,i,a)=>{a.d(i,{T:()=>l});var f=a(35614);let n="clipPlaneFragmentDeclaration",o=`#ifdef CLIPPLANE
varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
varying float fClipDistance6;
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}},99058:(e,i,a)=>{a.d(i,{V:()=>l});var f=a(35614);let n="fogFragmentDeclaration",o=`#ifdef FOG
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828
uniform vec4 vFogInfos;uniform vec3 vFogColor;varying vec3 vFogDistance;float CalcFogFactor()
{float fogCoeff=1.0;float fogStart=vFogInfos.y;float fogEnd=vFogInfos.z;float fogDensity=vFogInfos.w;float fogDistance=length(vFogDistance);if (FOGMODE_LINEAR==vFogInfos.x)
{fogCoeff=(fogEnd-fogDistance)/(fogEnd-fogStart);}
else if (FOGMODE_EXP==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDensity);}
else if (FOGMODE_EXP2==vFogInfos.x)
{fogCoeff=1.0/pow(E,fogDistance*fogDistance*fogDensity*fogDensity);}
return clamp(fogCoeff,0.0,1.0);}
#endif
`;f.l.IncludesShadersStore[n]||(f.l.IncludesShadersStore[n]=o);let l={name:n,shader:o}}}]);