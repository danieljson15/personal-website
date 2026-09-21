"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8633],{58633:(e,r,t)=>{t.r(r),t.d(r,{passPixelShaderWGSL:()=>l});var a=t(35614);let p="passPixelShader",S=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);}`;a.l.ShadersStoreWGSL[p]||(a.l.ShadersStoreWGSL[p]=S);let l={name:p,shader:S}}}]);