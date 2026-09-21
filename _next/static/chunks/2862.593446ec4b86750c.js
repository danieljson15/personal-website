"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2862],{92862:(e,r,t)=>{t.r(r),t.d(r,{depthBoxBlurPixelShader:()=>F});var l=t(35614);let o="depthBoxBlurPixelShader",S=`varying vec2 vUV;uniform sampler2D textureSampler;uniform vec2 screenSize;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{vec4 colorDepth=vec4(0.0);for (int x=-OFFSET; x<=OFFSET; x++)
for (int y=-OFFSET; y<=OFFSET; y++)
colorDepth+=texture2D(textureSampler,vUV+vec2(x,y)/screenSize);gl_FragColor=(colorDepth/float((OFFSET*2+1)*(OFFSET*2+1)));}`;l.l.ShadersStore[o]||(l.l.ShadersStore[o]=S);let F={name:o,shader:S}}}]);