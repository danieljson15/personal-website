"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1088],{91088:(e,i,o)=>{o.r(i),o.d(i,{proceduralVertexShader:()=>a});var t=o(35614);let d="proceduralVertexShader",r=`attribute vec2 position;varying vec2 vPosition;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vPosition=position;vUV=position*madd+madd;gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;t.l.ShadersStore[d]||(t.l.ShadersStore[d]=r);let a={name:d,shader:r}}}]);