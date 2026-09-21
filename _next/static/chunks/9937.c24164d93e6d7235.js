"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9937],{59937:(e,t,s)=>{s.r(t),s.d(t,{postprocessVertexShaderWGSL:()=>p});var r=s(35614);let n="postprocessVertexShader",i=`attribute position: vec2<f32>;uniform scale: vec2<f32>;varying vUV: vec2<f32>;const madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.vUV=(vertexInputs.position*madd+madd)*uniforms.scale;vertexOutputs.position=vec4(vertexInputs.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}
`;r.l.ShadersStoreWGSL[n]||(r.l.ShadersStoreWGSL[n]=i);let p={name:n,shader:i}}}]);