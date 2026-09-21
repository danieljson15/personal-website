"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9073],{89073:(e,t,r)=>{r.r(t),r.d(t,{proceduralVertexShaderWGSL:()=>v});var n=r(35614);let i="proceduralVertexShader",s=`attribute position: vec2f;varying vPosition: vec2f;varying vUV: vec2f;const madd: vec2f= vec2f(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.vPosition=vertexInputs.position;vertexOutputs.vUV=vertexInputs.position*madd+madd;vertexOutputs.position= vec4f(vertexInputs.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;n.l.ShadersStoreWGSL[i]||(n.l.ShadersStoreWGSL[i]=s);let v={name:i,shader:s}}}]);