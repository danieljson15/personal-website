"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9388],{1834:(e,t,r)=>{r.d(t,{L:()=>d});var l=r(35614);let a="kernelBlurVaryingDeclaration",n="varying vec2 sampleCoord{X};";l.l.IncludesShadersStore[a]||(l.l.IncludesShadersStore[a]=n);let d={name:a,shader:n}},36178:(e,t,r)=>{r.d(t,{f:()=>d});var l=r(35614);let a="packingFunctions",n=`vec4 pack(float depth)
{const vec4 bit_shift=vec4(255.0*255.0*255.0,255.0*255.0,255.0,1.0);const vec4 bit_mask=vec4(0.0,1.0/255.0,1.0/255.0,1.0/255.0);vec4 res=fract(depth*bit_shift);res-=res.xxyz*bit_mask;return res;}
float unpack(vec4 color)
{const vec4 bit_shift=vec4(1.0/(255.0*255.0*255.0),1.0/(255.0*255.0),1.0/255.0,1.0);return dot(color,bit_shift);}`;l.l.IncludesShadersStore[a]||(l.l.IncludesShadersStore[a]=n);let d={name:a,shader:n}},49388:(e,t,r)=>{r.r(t),r.d(t,{kernelBlurPixelShader:()=>u});var l=r(35614),a=r(1834),n=r(36178);let d="kernelBlurFragment",o=`#ifdef DOF
factor=sampleCoC(sampleCoord{X}); 
computedWeight=KERNEL_WEIGHT{X}*factor;sumOfWeights+=computedWeight;
#else
computedWeight=KERNEL_WEIGHT{X};
#endif
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCoord{X}))*computedWeight;
#else
blend+=texture2D(textureSampler,sampleCoord{X})*computedWeight;
#endif
`;l.l.IncludesShadersStore[d]||(l.l.IncludesShadersStore[d]=o);let s="kernelBlurFragment2",i=`#ifdef DOF
factor=sampleCoC(sampleCenter+delta*KERNEL_DEP_OFFSET{X});computedWeight=KERNEL_DEP_WEIGHT{X}*factor;sumOfWeights+=computedWeight;
#else
computedWeight=KERNEL_DEP_WEIGHT{X};
#endif
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X}))*computedWeight;
#else
blend+=texture2D(textureSampler,sampleCenter+delta*KERNEL_DEP_OFFSET{X})*computedWeight;
#endif
`;l.l.IncludesShadersStore[s]||(l.l.IncludesShadersStore[s]=i);let c="kernelBlurPixelShader",f=`uniform sampler2D textureSampler;uniform vec2 delta;varying vec2 sampleCenter;
#ifdef DOF
uniform sampler2D circleOfConfusionSampler;float sampleCoC(in vec2 offset) {float coc=texture2D(circleOfConfusionSampler,offset).r;return coc; }
#endif
#include<kernelBlurVaryingDeclaration>[0..varyingCount]
#ifdef PACKEDFLOAT
#include<packingFunctions>
#endif
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{float computedWeight=0.0;
#ifdef PACKEDFLOAT
float blend=0.;
#else
vec4 blend=vec4(0.);
#endif
#ifdef DOF
float sumOfWeights=CENTER_WEIGHT; 
float factor=0.0;
#ifdef PACKEDFLOAT
blend+=unpack(texture2D(textureSampler,sampleCenter))*CENTER_WEIGHT;
#else
blend+=texture2D(textureSampler,sampleCenter)*CENTER_WEIGHT;
#endif
#endif
#include<kernelBlurFragment>[0..varyingCount]
#include<kernelBlurFragment2>[0..depCount]
#ifdef PACKEDFLOAT
gl_FragColor=pack(blend);
#else
gl_FragColor=blend;
#endif
#ifdef DOF
gl_FragColor/=sumOfWeights;
#endif
}`;for(let e of(l.l.ShadersStore[c]||(l.l.ShadersStore[c]=f),[a.L,n.f,{name:d,shader:o},{name:s,shader:i}]))l.l.IncludesShadersStore[e.name]||(l.l.IncludesShadersStore[e.name]=e.shader);let u={name:c,shader:f}}}]);