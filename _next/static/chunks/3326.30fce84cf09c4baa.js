"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3326],{3326:(e,s,i)=>{i.r(s),i.d(s,{postprocessVertexShader:()=>r});var o=i(35614);let t="postprocessVertexShader",d=`attribute vec2 position;uniform vec2 scale;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vUV=(position*madd+madd)*scale;gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;o.l.ShadersStore[t]||(o.l.ShadersStore[t]=d);let r={name:t,shader:d}}}]);