"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1767],{61767:(e,r,t)=>{t.r(r),t.d(r,{depthBoxBlurPixelShaderWGSL:()=>p});var a=t(35614);let S="depthBoxBlurPixelShader",l=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;uniform screenSize: vec2f;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var colorDepth: vec4f=vec4f(0.0);for (var x: i32=-OFFSET; x<=OFFSET; x++) {for (var y: i32=-OFFSET; y<=OFFSET; y++) {colorDepth+=textureSample(textureSampler,textureSamplerSampler,input.vUV+ vec2f(f32(x),f32(y))/uniforms.screenSize);}}
fragmentOutputs.color=(colorDepth/ f32((OFFSET*2+1)*(OFFSET*2+1)));}`;a.l.ShadersStoreWGSL[S]||(a.l.ShadersStoreWGSL[S]=l);let p={name:S,shader:l}}}]);