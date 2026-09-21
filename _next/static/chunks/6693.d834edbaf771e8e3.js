"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6693],{86693:(e,t,i)=>{i.r(t),i.d(t,{gaussianSplattingVoxelPixelShaderWGSL:()=>d});var o=i(35614);let a="iblVoxelOpacityAtomicMax",r=`fn voxelOpacityAtomicMax(vidx: u32,value: u32) {let wordIdx: u32=vidx>>2u;let shift: u32=(vidx & 3u)*8u;let mask: u32=0xFFu<<shift;let shifted: u32=(value & 0xFFu)<<shift;loop {let oldWord: u32=atomicLoad(&voxelOpacityBuffer[wordIdx]);if (value<=((oldWord>>shift) & 0xFFu)) {break;}
let newWord: u32=(oldWord & ~mask) | shifted;if (atomicCompareExchangeWeak(&voxelOpacityBuffer[wordIdx],oldWord,newWord).exchanged) {break;}}}
`;o.l.IncludesShadersStoreWGSL[a]||(o.l.IncludesShadersStoreWGSL[a]=r);let s="gaussianSplattingVoxelPixelShader",l=`var voxel_storage: texture_storage_3d<r8unorm,write>;var<storage,read_write> voxelOpacityBuffer: array<atomic<u32>>;
#include<iblVoxelOpacityAtomicMax>
varying vNormalizedPosition: vec3f;varying vNormalizedCenterPosition: vec3f;varying vAlpha: f32;varying vPatchPosition: vec2f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {let normPos: vec3f=input.vNormalizedPosition;let size: vec3<u32>=textureDimensions(voxel_storage);let stepSize: f32=1.0/f32(size.x);let diff: vec3f=abs(input.vNormalizedCenterPosition-normPos);let distToCenter: f32=max(max(diff.x,diff.y),diff.z);let gaussian: f32=exp(-dot(input.vPatchPosition,input.vPatchPosition));let shadowingOpacity: f32=clamp(
select(gaussian,1.0,distToCenter<stepSize)*input.vAlpha,
0.0,1.0
);if (shadowingOpacity<=0.0) {discard;}
let coord: vec3<u32>=min(
vec3<u32>(u32(normPos.x*f32(size.x)),u32(normPos.y*f32(size.y)),u32(normPos.z*f32(size.z))),
size-vec3<u32>(1u));let vidx: u32=coord.x+coord.y*size.x+coord.z*size.x*size.y;voxelOpacityAtomicMax(vidx,u32(shadowingOpacity*255.0+0.5));fragmentOutputs.color=vec4f(0.0,0.0,0.0,0.0);}
`;for(let e of(o.l.ShadersStoreWGSL[s]||(o.l.ShadersStoreWGSL[s]=l),[{name:a,shader:r}]))o.l.IncludesShadersStoreWGSL[e.name]||(o.l.IncludesShadersStoreWGSL[e.name]=e.shader);let d={name:s,shader:l}}}]);