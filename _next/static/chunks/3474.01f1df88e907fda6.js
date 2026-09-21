"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3474],{1834:(e,r,l)=>{l.d(r,{L:()=>t});var n=l(35614);let a="kernelBlurVaryingDeclaration",d="varying vec2 sampleCoord{X};";n.l.IncludesShadersStore[a]||(n.l.IncludesShadersStore[a]=d);let t={name:a,shader:d}},73474:(e,r,l)=>{l.r(r),l.d(r,{kernelBlurVertexShader:()=>i});var n=l(35614),a=l(1834);let d="kernelBlurVertex",t="sampleCoord{X}=sampleCenter+delta*KERNEL_OFFSET{X};";n.l.IncludesShadersStore[d]||(n.l.IncludesShadersStore[d]=t);let s="kernelBlurVertexShader",o=`attribute vec2 position;uniform vec2 delta;varying vec2 sampleCenter;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
sampleCenter=(position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;for(let e of(n.l.ShadersStore[s]||(n.l.ShadersStore[s]=o),[a.L,{name:d,shader:t}]))n.l.IncludesShadersStore[e.name]||(n.l.IncludesShadersStore[e.name]=e.shader);let i={name:s,shader:o}}}]);