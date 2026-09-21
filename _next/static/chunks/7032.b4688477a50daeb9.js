"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7032],{67032:(e,i,d)=>{d.r(i),d.d(i,{glowMapMergeVertexShader:()=>r});var t=d(35614);let a="glowMapMergeVertexShader",o=`attribute vec2 position;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=position*madd+madd;gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;t.l.ShadersStore[a]||(t.l.ShadersStore[a]=o);let r={name:a,shader:o}}}]);