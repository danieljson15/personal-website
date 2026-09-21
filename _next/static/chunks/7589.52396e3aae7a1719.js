"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7589],{57589:(e,t,r)=>{r.r(t),r.d(t,{glowMapMergeVertexShaderWGSL:()=>i});var n=r(35614);let s="glowMapMergeVertexShader",a=`attribute position: vec2f;varying vUV: vec2f;
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {const madd: vec2f= vec2f(0.5,0.5);
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.vUV=vertexInputs.position*madd+madd;vertexOutputs.position= vec4f(vertexInputs.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;n.l.ShadersStoreWGSL[s]||(n.l.ShadersStoreWGSL[s]=a);let i={name:s,shader:a}}}]);