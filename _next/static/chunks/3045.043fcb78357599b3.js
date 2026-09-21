"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3045],{53045:(e,r,t)=>{t.r(r),t.d(r,{kernelBlurVertexShaderWGSL:()=>S});var n=t(35614),l=t(81459);let a="kernelBlurVertex",s="vertexOutputs.sampleCoord{X}=vertexOutputs.sampleCenter+uniforms.delta*KERNEL_OFFSET{X};";n.l.IncludesShadersStoreWGSL[a]||(n.l.IncludesShadersStoreWGSL[a]=s);let u="kernelBlurVertexShader",d=`attribute position: vec2f;uniform delta: vec2f;varying sampleCenter: vec2f;
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {const madd: vec2f= vec2f(0.5,0.5);
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.sampleCenter=(vertexInputs.position*madd+madd);
#include<kernelBlurVertex>[0..varyingCount]
vertexOutputs.position= vec4f(vertexInputs.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;for(let e of(n.l.ShadersStoreWGSL[u]||(n.l.ShadersStoreWGSL[u]=d),[l.s,{name:a,shader:s}]))n.l.IncludesShadersStoreWGSL[e.name]||(n.l.IncludesShadersStoreWGSL[e.name]=e.shader);let S={name:u,shader:d}},81459:(e,r,t)=>{t.d(r,{s:()=>s});var n=t(35614);let l="kernelBlurVaryingDeclaration",a="varying sampleCoord{X}: vec2f;";n.l.IncludesShadersStoreWGSL[l]||(n.l.IncludesShadersStoreWGSL[l]=a);let s={name:l,shader:a}}}]);