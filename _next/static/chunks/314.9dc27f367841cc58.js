"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[314],{6851:(e,r,i)=>{i.d(r,{C:()=>o});var a=i(35614);let f="bumpFragmentMainFunctions",n=`#ifndef TEXRD_DEFINED
fn TEXRD(t: texture_2d<f32>,ts: sampler,uv: vec2f)->vec4f {return textureSample(t,ts,uv);}
#define TEXRD_DEFINED
#endif
#if defined(BUMP) || defined(CLEARCOAT_BUMP) || defined(ANISOTROPIC) || defined(DETAIL)
#if defined(TANGENT) && defined(NORMAL) 
varying vTBN0: vec3f;varying vTBN1: vec3f;varying vTBN2: vec3f;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform normalMatrix: mat4x4f;fn toNormalMatrix(m: mat4x4f)->mat4x4f
{var a00=m[0][0];var a01=m[0][1];var a02=m[0][2];var a03=m[0][3];var a10=m[1][0];var a11=m[1][1];var a12=m[1][2];var a13=m[1][3];var a20=m[2][0]; 
var a21=m[2][1];var a22=m[2][2];var a23=m[2][3];var a30=m[3][0]; 
var a31=m[3][1];var a32=m[3][2];var a33=m[3][3];var b00=a00*a11-a01*a10;var b01=a00*a12-a02*a10;var b02=a00*a13-a03*a10;var b03=a01*a12-a02*a11;var b04=a01*a13-a03*a11;var b05=a02*a13-a03*a12;var b06=a20*a31-a21*a30;var b07=a20*a32-a22*a30;var b08=a20*a33-a23*a30;var b09=a21*a32-a22*a31;var b10=a21*a33-a23*a31;var b11=a22*a33-a23*a32;var det=b00*b11-b01*b10+b02*b09+b03*b08-b04*b07+b05*b06;var mi=mat4x4<f32>(
(a11*b11-a12*b10+a13*b09)/det,
(a02*b10-a01*b11-a03*b09)/det,
(a31*b05-a32*b04+a33*b03)/det,
(a22*b04-a21*b05-a23*b03)/det,
(a12*b08-a10*b11-a13*b07)/det,
(a00*b11-a02*b08+a03*b07)/det,
(a32*b02-a30*b05-a33*b01)/det,
(a20*b05-a22*b02+a23*b01)/det,
(a10*b10-a11*b08+a13*b06)/det,
(a01*b08-a00*b10-a03*b06)/det,
(a30*b04-a31*b02+a33*b00)/det,
(a21*b02-a20*b04-a23*b00)/det,
(a11*b07-a10*b09-a12*b06)/det,
(a00*b09-a01*b07+a02*b06)/det,
(a31*b01-a30*b03-a32*b00)/det,
(a20*b03-a21*b01+a22*b00)/det);return mat4x4<f32>(mi[0][0],mi[1][0],mi[2][0],mi[3][0],
mi[0][1],mi[1][1],mi[2][1],mi[3][1],
mi[0][2],mi[1][2],mi[2][2],mi[3][2],
mi[0][3],mi[1][3],mi[2][3],mi[3][3]);}
#endif
fn perturbNormalBase(cotangentFrame: mat3x3f,normal: vec3f,scale: f32)->vec3f
{var output=normal;
#ifdef NORMALXYSCALE
output=normalize(output* vec3f(scale,scale,1.0));
#endif
return normalize(cotangentFrame*output);}
fn perturbNormal(cotangentFrame: mat3x3f,textureSample: vec3f,scale: f32)->vec3f
{return perturbNormalBase(cotangentFrame,textureSample*2.0-1.0,scale);}
fn cotangent_frame(normal: vec3f,p: vec3f,uv: vec2f,tangentSpaceParams: vec2f)->mat3x3f
{var dp1: vec3f=dpdx(p);var dp2: vec3f=dpdy(p);var duv1: vec2f=dpdx(uv);var duv2: vec2f=dpdy(uv);var dp2perp: vec3f=cross(dp2,normal);var dp1perp: vec3f=cross(normal,dp1);var tangent: vec3f=dp2perp*duv1.x+dp1perp*duv2.x;var bitangent: vec3f=dp2perp*duv1.y+dp1perp*duv2.y;tangent*=tangentSpaceParams.x;bitangent*=tangentSpaceParams.y;var det: f32=max(dot(tangent,tangent),dot(bitangent,bitangent));var invmax: f32=select(inverseSqrt(det),0.0,det==0.0);return mat3x3f(tangent*invmax,bitangent*invmax,normal);}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},7482:(e,r,i)=>{i.d(r,{x:()=>o});var a=i(35614);let f="reflectionFunction",n=`fn computeFixedEquirectangularCoords(worldPos: vec4f,worldNormal: vec3f,direction: vec3f)->vec3f
{var lon: f32=atan2(direction.z,direction.x);var lat: f32=acos(direction.y);var sphereCoords: vec2f= vec2f(lon,lat)*RECIPROCAL_PI2*2.0;var s: f32=sphereCoords.x*0.5+0.5;var t: f32=sphereCoords.y;return vec3f(s,t,0); }
fn computeMirroredFixedEquirectangularCoords(worldPos: vec4f,worldNormal: vec3f,direction: vec3f)->vec3f
{var lon: f32=atan2(direction.z,direction.x);var lat: f32=acos(direction.y);var sphereCoords: vec2f= vec2f(lon,lat)*RECIPROCAL_PI2*2.0;var s: f32=sphereCoords.x*0.5+0.5;var t: f32=sphereCoords.y;return vec3f(1.0-s,t,0); }
fn computeEquirectangularCoords(worldPos: vec4f,worldNormal: vec3f,eyePosition: vec3f,reflectionMatrix: mat4x4f)->vec3f
{var cameraToVertex: vec3f=normalize(worldPos.xyz-eyePosition);var r: vec3f=normalize(reflect(cameraToVertex,worldNormal));r= (reflectionMatrix* vec4f(r,0)).xyz;var lon: f32=atan2(r.z,r.x);var lat: f32=acos(r.y);var sphereCoords: vec2f= vec2f(lon,lat)*RECIPROCAL_PI2*2.0;var s: f32=sphereCoords.x*0.5+0.5;var t: f32=sphereCoords.y;return vec3f(s,t,0);}
fn computeSphericalCoords(worldPos: vec4f,worldNormal: vec3f,view: mat4x4f,reflectionMatrix: mat4x4f)->vec3f
{var viewDir: vec3f=normalize((view*worldPos).xyz);var viewNormal: vec3f=normalize((view* vec4f(worldNormal,0.0)).xyz);var r: vec3f=reflect(viewDir,viewNormal);r= (reflectionMatrix* vec4f(r,0)).xyz;r.z=r.z-1.0;var m: f32=2.0*length(r);return vec3f(r.x/m+0.5,1.0-r.y/m-0.5,0);}
fn computePlanarCoords(worldPos: vec4f,worldNormal: vec3f,eyePosition: vec3f,reflectionMatrix: mat4x4f)->vec3f
{var viewDir: vec3f=worldPos.xyz-eyePosition;var coords: vec3f=normalize(reflect(viewDir,worldNormal));return (reflectionMatrix* vec4f(coords,1)).xyz;}
fn computeCubicCoords(worldPos: vec4f,worldNormal: vec3f,eyePosition: vec3f,reflectionMatrix: mat4x4f)->vec3f
{var viewDir: vec3f=normalize(worldPos.xyz-eyePosition);var coords: vec3f=reflect(viewDir,worldNormal);coords= (reflectionMatrix* vec4f(coords,0)).xyz;
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;}
fn computeCubicLocalCoords(worldPos: vec4f,worldNormal: vec3f,eyePosition: vec3f,reflectionMatrix: mat4x4f,reflectionSize: vec3f,reflectionPosition: vec3f)->vec3f
{var viewDir: vec3f=normalize(worldPos.xyz-eyePosition);var coords: vec3f=reflect(viewDir,worldNormal);coords=parallaxCorrectNormal(worldPos.xyz,coords,reflectionSize,reflectionPosition);coords=(reflectionMatrix* vec4f(coords,0)).xyz;
#ifdef INVERTCUBICMAP
coords.y*=-1.0;
#endif
return coords;}
fn computeProjectionCoords(worldPos: vec4f,view: mat4x4f,reflectionMatrix: mat4x4f)->vec3f
{return (reflectionMatrix*(view*worldPos)).xyz;}
fn computeSkyBoxCoords(positionW: vec3f,reflectionMatrix: mat4x4f)->vec3f
{return (reflectionMatrix* vec4f(positionW,1.)).xyz;}
#ifdef REFLECTION
fn computeReflectionCoords(worldPos: vec4f,worldNormal: vec3f)->vec3f
{
#ifdef REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED
var direction: vec3f=normalize(fragmentInputs.vDirectionW);return computeMirroredFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR_FIXED
var direction: vec3f=normalize(fragmentInputs.vDirectionW);return computeFixedEquirectangularCoords(worldPos,worldNormal,direction);
#endif
#ifdef REFLECTIONMAP_EQUIRECTANGULAR
return computeEquirectangularCoords(worldPos,worldNormal,scene.vEyePosition.xyz,uniforms.reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_SPHERICAL
return computeSphericalCoords(worldPos,worldNormal,scene.view,uniforms.reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_PLANAR
return computePlanarCoords(worldPos,worldNormal,scene.vEyePosition.xyz,uniforms.reflectionMatrix);
#endif
#ifdef REFLECTIONMAP_CUBIC
#ifdef USE_LOCAL_REFLECTIONMAP_CUBIC
return computeCubicLocalCoords(worldPos,worldNormal,scene.vEyePosition.xyz,uniforms.reflectionMatrix,uniforms.vReflectionSize,uniforms.vReflectionPosition);
#else
return computeCubicCoords(worldPos,worldNormal,scene.vEyePosition.xyz,uniforms.reflectionMatrix);
#endif
#endif
#ifdef REFLECTIONMAP_PROJECTION
return computeProjectionCoords(worldPos,scene.view,uniforms.reflectionMatrix);
#endif
#ifndef REFLECTIONMAP_CUBIC
#ifdef REFLECTIONMAP_SKYBOX
return computeSkyBoxCoords(fragmentInputs.vPositionUVW,uniforms.reflectionMatrix);
#endif
#endif
#ifdef REFLECTIONMAP_EXPLICIT
return vec3f(0,0,0);
#endif
}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},10123:(e,r,i)=>{i.d(r,{w:()=>o});var a=i(35614);let f="samplerFragmentDeclaration",n=`#ifdef _DEFINENAME_
#if _DEFINENAME_DIRECTUV==1
#define v_VARYINGNAME_UV vMainUV1
#elif _DEFINENAME_DIRECTUV==2
#define v_VARYINGNAME_UV vMainUV2
#elif _DEFINENAME_DIRECTUV==3
#define v_VARYINGNAME_UV vMainUV3
#elif _DEFINENAME_DIRECTUV==4
#define v_VARYINGNAME_UV vMainUV4
#elif _DEFINENAME_DIRECTUV==5
#define v_VARYINGNAME_UV vMainUV5
#elif _DEFINENAME_DIRECTUV==6
#define v_VARYINGNAME_UV vMainUV6
#else
varying v_VARYINGNAME_UV: vec2f;
#endif
var _SAMPLERNAME_SamplerSampler: sampler;var _SAMPLERNAME_Sampler: texture_2d<f32>;
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},22269:(e,r,i)=>{i.d(r,{I:()=>o});var a=i(35614);let f="openpbrGeometryInfo",n=`struct geometryInfoOutParams
{NdotV: f32,
NdotVUnclamped: f32,
environmentBrdf: vec3f,
horizonOcclusion: f32};struct geometryInfoAnisoOutParams
{NdotV: f32,
NdotVUnclamped: f32,
environmentBrdf: vec3f,
horizonOcclusion: f32,
anisotropy: f32,
anisotropicTangent: vec3f,
anisotropicBitangent: vec3f,
TBN: mat3x3<f32>};fn geometryInfo(
normalW: vec3f,viewDirectionW: vec3f,roughness: f32,geometricNormalW: vec3f
)->geometryInfoOutParams
{var outParams: geometryInfoOutParams;outParams.NdotVUnclamped=dot(normalW,viewDirectionW);outParams.NdotV=absEps(outParams.NdotVUnclamped);
#if defined(ENVIRONMENTBRDF)
outParams.environmentBrdf=getBRDFLookup(outParams.NdotV,roughness);
#else
outParams.environmentBrdf=vec3f(0.0);
#endif
outParams.horizonOcclusion=1.0f;
#if defined(ENVIRONMENTBRDF) && !defined(REFLECTIONMAP_SKYBOX)
#ifdef HORIZONOCCLUSION
#if defined(GEOMETRY_NORMAL) || defined(GEOMETRY_COAT_NORMAL)
#ifdef REFLECTIONMAP_3D
outParams.horizonOcclusion=environmentHorizonOcclusion(-viewDirectionW,normalW,geometricNormalW);
#endif
#endif
#endif
#endif
return outParams;}
fn geometryInfoAniso(
normalW: vec3f,viewDirectionW: vec3f,roughness: f32,geometricNormalW: vec3f
,vAnisotropy: vec3f,TBN: mat3x3<f32>
)->geometryInfoAnisoOutParams
{let geoInfo: geometryInfoOutParams=geometryInfo(normalW,viewDirectionW,roughness,geometricNormalW);var outParams: geometryInfoAnisoOutParams;outParams.NdotV=geoInfo.NdotV;outParams.NdotVUnclamped=geoInfo.NdotVUnclamped;outParams.environmentBrdf=geoInfo.environmentBrdf;outParams.horizonOcclusion=geoInfo.horizonOcclusion;outParams.anisotropy=vAnisotropy.b;let anisotropyDirection: vec3f=vec3f(vAnisotropy.xy,0.);let anisoTBN: mat3x3<f32>=mat3x3<f32>(normalize(TBN[0]),normalize(TBN[1]),normalize(TBN[2]));outParams.anisotropicTangent=normalize(anisoTBN*anisotropyDirection);outParams.anisotropicBitangent=normalize(cross(anisoTBN[2],outParams.anisotropicTangent));outParams.TBN=TBN;return outParams;}
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},34376:(e,r,i)=>{i.d(r,{d:()=>o});var a=i(35614);i(10123);let f="bumpFragmentFunctions",n=`#if defined(BUMP)
#include<samplerFragmentDeclaration>(_DEFINENAME_,BUMP,_VARYINGNAME_,Bump,_SAMPLERNAME_,bump)
#endif
#if defined(DETAIL)
#include<samplerFragmentDeclaration>(_DEFINENAME_,DETAIL,_VARYINGNAME_,Detail,_SAMPLERNAME_,detail)
#endif
#if defined(BUMP) && defined(PARALLAX)
const minSamples: f32=4.;const maxSamples: f32=15.;const iMaxSamples: i32=15;fn parallaxOcclusion(vViewDirCoT: vec3f,vNormalCoT: vec3f,texCoord: vec2f,parallaxScale: f32)->vec2f {var parallaxLimit: f32=length(vViewDirCoT.xy)/vViewDirCoT.z;parallaxLimit*=parallaxScale;var vOffsetDir: vec2f=normalize(vViewDirCoT.xy);var vMaxOffset: vec2f=vOffsetDir*parallaxLimit;var numSamples: f32=maxSamples+(dot(vViewDirCoT,vNormalCoT)*(minSamples-maxSamples));var stepSize: f32=1.0/numSamples;var currRayHeight: f32=1.0;var vCurrOffset: vec2f= vec2f(0,0);var vLastOffset: vec2f= vec2f(0,0);var lastSampledHeight: f32=1.0;var currSampledHeight: f32=1.0;var keepWorking: bool=true;for (var i: i32=0; i<iMaxSamples; i++)
{currSampledHeight=textureSample(bumpSampler,bumpSamplerSampler,texCoord+vCurrOffset).w;if (!keepWorking)
{}
else if (currSampledHeight>currRayHeight)
{var delta1: f32=currSampledHeight-currRayHeight;var delta2: f32=(currRayHeight+stepSize)-lastSampledHeight;var ratio: f32=delta1/(delta1+delta2);vCurrOffset=(ratio)* vLastOffset+(1.0-ratio)*vCurrOffset;keepWorking=false;}
else
{currRayHeight-=stepSize;vLastOffset=vCurrOffset;
#ifdef PARALLAX_RHS
vCurrOffset-=stepSize*vMaxOffset;
#else
vCurrOffset+=stepSize*vMaxOffset;
#endif
lastSampledHeight=currSampledHeight;}}
return vCurrOffset;}
fn parallaxOffset(viewDir: vec3f,heightScale: f32)->vec2f
{var height: f32=textureSample(bumpSampler,bumpSamplerSampler,fragmentInputs.vBumpUV).w;var texCoordOffset: vec2f=heightScale*viewDir.xy*height;
#ifdef PARALLAX_RHS
return texCoordOffset;
#else
return -texCoordOffset;
#endif
}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},39489:(e,r,i)=>{i.d(r,{O:()=>o});var a=i(35614);let f="clipPlaneFragment",n=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fragmentInputs.fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fragmentInputs.fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fragmentInputs.fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fragmentInputs.fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fragmentInputs.fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fragmentInputs.fClipDistance6>0.0)
{discard;}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},47607:(e,r,i)=>{i.d(r,{S:()=>o});var a=i(35614);let f="pbrIBLFunctions",n=`#if defined(REFLECTION) || defined(SS_REFRACTION)
fn getLodFromAlphaG(cubeMapDimensionPixels: f32,microsurfaceAverageSlope: f32)->f32 {var microsurfaceAverageSlopeTexels: f32=cubeMapDimensionPixels*microsurfaceAverageSlope;var lod: f32=log2(microsurfaceAverageSlopeTexels);return lod;}
fn getLinearLodFromRoughness(cubeMapDimensionPixels: f32,roughness: f32)->f32 {var lod: f32=log2(cubeMapDimensionPixels)*roughness;return lod;}
#endif
#if defined(ENVIRONMENTBRDF) && defined(RADIANCEOCCLUSION)
fn environmentRadianceOcclusion(ambientOcclusion: f32,NdotVUnclamped: f32)->f32 {var temp: f32=NdotVUnclamped+ambientOcclusion;return saturate(temp*temp-1.0+ambientOcclusion);}
#endif
#if defined(ENVIRONMENTBRDF) && defined(HORIZONOCCLUSION)
fn environmentHorizonOcclusion(view: vec3f,normal: vec3f,geometricNormal: vec3f)->f32 {var reflection: vec3f=reflect(view,normal);var temp: f32=saturate(1.0+1.1*dot(reflection,geometricNormal));return temp*temp;}
#endif
#if defined(LODINREFLECTIONALPHA) || defined(SS_LODINREFRACTIONALPHA)
fn UNPACK_LOD(x: f32)->f32 {return (1.0-x)*255.0;}
fn getLodFromAlphaGNdotV(cubeMapDimensionPixels: f32,alphaG: f32,NdotV: f32)->f32 {var microsurfaceAverageSlope: f32=alphaG;microsurfaceAverageSlope*=sqrt(abs(NdotV));return getLodFromAlphaG(cubeMapDimensionPixels,microsurfaceAverageSlope);}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},52079:(e,r,i)=>{i.d(r,{O:()=>o});var a=i(35614);let f="clipPlaneFragmentDeclaration",n=`#ifdef CLIPPLANE
varying fClipDistance: f32;
#endif
#ifdef CLIPPLANE2
varying fClipDistance2: f32;
#endif
#ifdef CLIPPLANE3
varying fClipDistance3: f32;
#endif
#ifdef CLIPPLANE4
varying fClipDistance4: f32;
#endif
#ifdef CLIPPLANE5
varying fClipDistance5: f32;
#endif
#ifdef CLIPPLANE6
varying fClipDistance6: f32;
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},71866:(e,r,i)=>{i.d(r,{n:()=>o});var a=i(35614);let f="objectIdFunctions",n=`fn encodeObjectId(objectId: f32)->vec4f {
#ifdef PREPASS_OBJECT_ID_R8
return vec4f(objectId/255.0,0.0,0.0,1.0);
#else
let id=i32(objectId);let encodedId=vec3f(
f32((id>>16) & 0xFF),
f32((id>>8) & 0xFF),
f32(id & 0xFF)
)/255.0;return vec4f(encodedId,select(0.0,1.0,id>0));
#endif
}
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},76437:(e,r,i)=>{i.d(r,{K:()=>o});var a=i(35614);let f="openpbrSubsurfaceLayerData",n=`var subsurface_weight: f32=uniforms.vSubsurfaceWeight;var subsurface_color: vec3f=uniforms.vSubsurfaceColor.rgb;var subsurface_radius: f32=uniforms.vSubsurfaceRadius;var subsurface_radius_scale: vec3f=uniforms.vSubsurfaceRadiusScale;var subsurface_scatter_anisotropy: f32=clamp(uniforms.vSubsurfaceScatterAnisotropy,-0.9999f,0.9999f);
#ifdef SUBSURFACE_WEIGHT
let subsurfaceWeightFromTexture: vec4f=TEXRD(subsurfaceWeightSampler,subsurfaceWeightSamplerSampler,fragmentInputs.vSubsurfaceWeightUV+uvOffset);
#endif
#ifdef SUBSURFACE_COLOR
let subsurfaceColorFromTexture: vec4f=TEXRD(subsurfaceColorSampler,subsurfaceColorSamplerSampler,fragmentInputs.vSubsurfaceColorUV+uvOffset);
#endif
#ifdef SUBSURFACE_RADIUS_SCALE
let subsurfaceRadiusScaleFromTexture: vec4f=TEXRD(subsurfaceRadiusScaleSampler,subsurfaceRadiusScaleSamplerSampler,fragmentInputs.vSubsurfaceRadiusScaleUV+uvOffset);
#endif
#ifdef SUBSURFACE_WEIGHT
#ifdef SUBSURFACE_WEIGHT_FROM_TEXTURE_ALPHA
subsurface_weight*=subsurfaceWeightFromTexture.a;
#else
subsurface_weight*=subsurfaceWeightFromTexture.r;
#endif
#endif
#ifdef SUBSURFACE_COLOR
#ifdef SUBSURFACE_COLOR_GAMMA
subsurface_color*=toLinearSpaceVec3(subsurfaceColorFromTexture.rgb);
#else
subsurface_color*=subsurfaceColorFromTexture.rgb;
#endif
subsurface_color*=uniforms.vSubsurfaceColorInfos.y;
#endif
#ifdef SUBSURFACE_RADIUS_SCALE
subsurface_radius_scale*=subsurfaceRadiusScaleFromTexture.rgb;
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},78199:(e,r,i)=>{i.d(r,{o:()=>o});var a=i(35614);let f="bumpFragment",n=`var uvOffset: vec2f= vec2f(0.0,0.0);
#if defined(BUMP) || defined(PARALLAX) || defined(DETAIL)
#ifdef NORMALXYSCALE
var normalScale: f32=1.0;
#elif defined(BUMP)
var normalScale: f32=uniforms.vBumpInfos.y;
#else
var normalScale: f32=1.0;
#endif
#if defined(TANGENT) && defined(NORMAL)
var TBN: mat3x3f=mat3x3<f32>(input.vTBN0,input.vTBN1,input.vTBN2); 
#elif defined(BUMP)
var TBNUV: vec2f=select(-fragmentInputs.vBumpUV,fragmentInputs.vBumpUV,fragmentInputs.frontFacing);var TBN: mat3x3f=cotangent_frame(normalW*normalScale,input.vPositionW,TBNUV,uniforms.vTangentSpaceParams);
#else
var TBNUV: vec2f=select(-fragmentInputs.vDetailUV,fragmentInputs.vDetailUV,fragmentInputs.frontFacing);var TBN: mat3x3f=cotangent_frame(normalW*normalScale,input.vPositionW,TBNUV, vec2f(1.,1.));
#endif
#elif defined(ANISOTROPIC)
#if defined(TANGENT) && defined(NORMAL)
var TBN: mat3x3f=mat3x3<f32>(input.vTBN0,input.vTBN1,input.vTBN2); 
#else
var TBNUV: vec2f=select( -fragmentInputs.vMainUV1,fragmentInputs.vMainUV1,fragmentInputs.frontFacing);var TBN: mat3x3f=cotangent_frame(normalW,input.vPositionW,TBNUV, vec2f(1.,1.));
#endif
#endif
#ifdef PARALLAX
var invTBN: mat3x3f=transposeMat3(TBN);
#ifdef PARALLAXOCCLUSION
uvOffset=parallaxOcclusion(invTBN*-viewDirectionW,invTBN*normalW,fragmentInputs.vBumpUV,uniforms.vBumpInfos.z);
#else
uvOffset=parallaxOffset(invTBN*viewDirectionW,uniforms.vBumpInfos.z);
#endif
#endif
#ifdef DETAIL
var detailColor: vec4f=textureSample(detailSampler,detailSamplerSampler,fragmentInputs.vDetailUV+uvOffset);var detailNormalRG: vec2f=detailColor.wy*2.0-1.0;var detailNormalB: f32=sqrt(1.-saturate(dot(detailNormalRG,detailNormalRG)));var detailNormal: vec3f= vec3f(detailNormalRG,detailNormalB);
#endif
#ifdef BUMP
#ifdef OBJECTSPACE_NORMALMAP
#define CUSTOM_FRAGMENT_BUMP_FRAGMENT
normalW=normalize(TEXRD(bumpSampler,bumpSamplerSampler,fragmentInputs.vBumpUV).xyz *2.0-1.0);normalW=normalize(mat3x3f(uniforms.normalMatrix[0].xyz,uniforms.normalMatrix[1].xyz,uniforms.normalMatrix[2].xyz)*normalW);
#elif !defined(DETAIL)
normalW=perturbNormal(TBN,TEXRD(bumpSampler,bumpSamplerSampler,fragmentInputs.vBumpUV+uvOffset).xyz,uniforms.vBumpInfos.y);
#else
var bumpNormal: vec3f=TEXRD(bumpSampler,bumpSamplerSampler,fragmentInputs.vBumpUV+uvOffset).xyz*2.0-1.0;
#if DETAIL_NORMALBLENDMETHOD==0 
detailNormal=vec3f(detailNormal.xy*uniforms.vDetailInfos.z,detailNormal.z);var blendedNormal: vec3f=normalize( vec3f(bumpNormal.xy+detailNormal.xy,bumpNormal.z*detailNormal.z));
#elif DETAIL_NORMALBLENDMETHOD==1 
detailNormal=vec3f(detailNormal.xy*uniforms.vDetailInfos.z,detailNormal.z);bumpNormal+= vec3f(0.0,0.0,1.0);detailNormal*= vec3f(-1.0,-1.0,1.0);var blendedNormal: vec3f=bumpNormal*dot(bumpNormal,detailNormal)/bumpNormal.z-detailNormal;
#endif
normalW=perturbNormalBase(TBN,blendedNormal,uniforms.vBumpInfos.y);
#endif
#elif defined(DETAIL)
detailNormal=vec3f(detailNormal.xy*uniforms.vDetailInfos.z,detailNormal.z);normalW=perturbNormalBase(TBN,detailNormal,uniforms.vDetailInfos.z);
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},80314:(e,r,i)=>{i.r(r),i.d(r,{geometryPixelShaderWGSL:()=>L});var a=i(35614),f=i(71866),n=i(52079),o=i(6851),t=i(10123),l=i(34376),c=i(15640),s=i(88404),d=i(95433),m=i(27584),v=i(83737),u=i(47607),p=i(7482),E=i(22269),S=i(85059),I=i(39489),N=i(78199),R=i(76437),T=i(81606);let A="geometryPixelShader",C=`#ifdef BUMP
varying vWorldView0: vec4f;varying vWorldView1: vec4f;varying vWorldView2: vec4f;varying vWorldView3: vec4f;varying vNormalW: vec3f;
#else
varying vNormalV: vec3f;
#endif
varying vViewPos: vec4f;
#if defined(POSITION) || defined(BUMP) || defined(IRRADIANCE)
varying vPositionW: vec3f;
#endif
#if defined(VELOCITY) || defined(VELOCITY_LINEAR)
varying vCurrentPosition: vec4f;varying vPreviousPosition: vec4f;
#endif
#ifdef NEED_UV
varying vUV: vec2f;
#endif
#ifdef BUMP
uniform vBumpInfos: vec3f;uniform vTangentSpaceParams: vec2f;
#endif
#if defined(REFLECTIVITY)
#if defined(ORMTEXTURE) || defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
var reflectivitySamplerSampler: sampler;var reflectivitySampler: texture_2d<f32>;varying vReflectivityUV: vec2f;
#else
#ifdef METALLIC_TEXTURE
var metallicSamplerSampler: sampler;var metallicSampler: texture_2d<f32>;varying vMetallicUV: vec2f;
#endif
#ifdef ROUGHNESS_TEXTURE
var roughnessSamplerSampler: sampler;var roughnessSampler: texture_2d<f32>;varying vRoughnessUV: vec2f;
#endif
#endif
#ifdef ALBEDOTEXTURE
varying vAlbedoUV: vec2f;var albedoSamplerSampler: sampler;var albedoSampler: texture_2d<f32>;
#endif
#ifdef REFLECTIVITYCOLOR
uniform reflectivityColor: vec3f;
#endif
#ifdef ALBEDOCOLOR
uniform albedoColor: vec3f;
#endif
#ifdef METALLIC
uniform metallic: f32;
#endif
#if defined(ROUGHNESS) || defined(GLOSSINESS)
uniform glossiness: f32;
#endif
#endif
#if defined(ALPHATEST) && defined(NEED_UV)
var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;uniform alphaCutOff: f32;
#endif
#ifdef OBJECT_ID
uniform objectId: f32;
#include<objectIdFunctions>
#endif
#ifdef MESH_BLEND_TAG
uniform meshBlendTag: i32;
#endif
#include<clipPlaneFragmentDeclaration>
#include<bumpFragmentMainFunctions>
#include<bumpFragmentFunctions>
#include<helperFunctions>
#ifdef IRRADIANCE
#include<pbrFragmentReflectionDeclaration>
#ifdef REFLECTION
#ifdef USEIRRADIANCEMAP
#include<sceneUboDeclaration>
uniform reflectionMatrix: mat4x4f;uniform vReflectionInfos: vec2f;uniform vReflectionDominantDirection: vec3f;
#include<pbrBRDFFunctions>
#include<openpbrDielectricReflectance>
#include<pbrIBLFunctions>
#include<reflectionFunction>
#include<openpbrGeometryInfo>
#include<openpbrIblFunctions>
#elif defined(USESPHERICALFROMREFLECTIONMAP)
varying vEnvironmentIrradiance: vec3f;
#endif
#ifdef IBL_SHADOW_TEXTURE
var iblShadowSampler: texture_2d<f32>;var iblShadowSamplerSampler: sampler;uniform shadowTextureSize: vec2f;
#endif
#ifdef IRRADIANCE_SCATTER_MASK
uniform vSubsurfaceWeight: f32;
#include<samplerFragmentDeclaration>(_DEFINENAME_,SUBSURFACE_WEIGHT,_VARYINGNAME_,SubsurfaceWeight,_SAMPLERNAME_,subsurfaceWeight)
uniform vSubsurfaceScatterAnisotropy: f32;uniform vTransmissionWeight: f32;
#include<samplerFragmentDeclaration>(_DEFINENAME_,TRANSMISSION_WEIGHT,_VARYINGNAME_,TransmissionWeight,_SAMPLERNAME_,transmissionWeight)
uniform vTransmissionScatterAnisotropy: f32;
#endif
#endif
#endif
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#include<clipPlaneFragment>
#ifdef ALPHATEST
if (textureSample(diffuseSampler,diffuseSamplerSampler,input.vUV).a<uniforms.alphaCutOff) {discard;}
#endif
var normalOutput: vec3f;
#ifdef BUMP
var normalW: vec3f=normalize(input.vNormalW);
#include<bumpFragment>
#ifdef NORMAL_WORLDSPACE
normalOutput=normalW;
#else
normalOutput=normalize( (mat4x4f(input.vWorldView0,input.vWorldView1,input.vWorldView2,input.vWorldView3)* vec4f(normalW,0.0)).xyz);
#endif
#elif defined(HAS_NORMAL_ATTRIBUTE)
normalOutput=normalize(input.vNormalV);
#elif defined(POSITION)
normalOutput=normalize(-cross(dpdx(input.vPositionW),dpdy(input.vPositionW)));
#endif
#ifdef ENCODE_NORMAL
normalOutput=normalOutput*0.5+0.5;
#endif
var fragData: array<vec4<f32>,SCENE_MRT_COUNT>;
#ifdef DEPTH
fragData[DEPTH_INDEX]=vec4f(input.vViewPos.z/input.vViewPos.w,0.0,0.0,1.0);
#endif
#ifdef NORMAL
fragData[NORMAL_INDEX]=vec4f(normalOutput,1.0);
#endif
#ifdef SCREENSPACE_DEPTH
fragData[SCREENSPACE_DEPTH_INDEX]=vec4f(fragmentInputs.position.z,0.0,0.0,1.0);
#endif
#ifdef POSITION
fragData[POSITION_INDEX]= vec4f(input.vPositionW,1.0);
#endif
#ifdef OBJECT_ID
fragData[OBJECT_ID_INDEX]=encodeObjectId(uniforms.objectId);
#endif
#ifdef VELOCITY
var a: vec2f=(input.vCurrentPosition.xy/input.vCurrentPosition.w)*0.5+0.5;var b: vec2f=(input.vPreviousPosition.xy/input.vPreviousPosition.w)*0.5+0.5;var velocity: vec2f=abs(a-b);velocity= vec2f(pow(velocity.x,1.0/3.0),pow(velocity.y,1.0/3.0))*sign(a-b)*0.5+0.5;fragData[VELOCITY_INDEX]= vec4f(velocity,0.0,1.0);
#endif
#ifdef VELOCITY_LINEAR
var velocity : vec2f=vec2f(0.5)*((input.vPreviousPosition.xy /
input.vPreviousPosition.w) -
(input.vCurrentPosition.xy /
input.vCurrentPosition.w));fragData[VELOCITY_LINEAR_INDEX]=vec4f(velocity,0.0,1.0);
#endif
#ifdef REFLECTIVITY
var reflectivity: vec4f= vec4f(0.0,0.0,0.0,1.0);
#ifdef METALLICWORKFLOW
var metal: f32=1.0;var roughness: f32=1.0;
#ifdef ORMTEXTURE
metal*=textureSample(reflectivitySampler,reflectivitySamplerSampler,input.vReflectivityUV).b;roughness*=textureSample(reflectivitySampler,reflectivitySamplerSampler,input.vReflectivityUV).g;
#else
#ifdef METALLIC_TEXTURE
metal*=textureSample(metallicSampler,metallicSamplerSampler,input.vMetallicUV).r;
#endif
#ifdef ROUGHNESS_TEXTURE
roughness*=textureSample(roughnessSampler,roughnessSamplerSampler,input.vRoughnessUV).r;
#endif
#endif
#ifdef METALLIC
metal*=uniforms.metallic;
#endif
#ifdef ROUGHNESS
roughness*=(1.0-uniforms.glossiness); 
#endif
reflectivity=vec4f(reflectivity.rgb,reflectivity.a-roughness);var color: vec3f= vec3f(1.0);
#ifdef ALBEDOTEXTURE
color=textureSample(albedoSampler,albedoSamplerSampler,input.vAlbedoUV).rgb;
#ifdef GAMMAALBEDO
color=toLinearSpaceVec4(color);
#endif
#endif
#ifdef ALBEDOCOLOR
color*=uniforms.albedoColor.xyz;
#endif
reflectivity=vec4f(mix( vec3f(0.04),color,metal),reflectivity.a);
#else
#if defined(SPECULARGLOSSINESSTEXTURE) || defined(REFLECTIVITYTEXTURE)
reflectivity=textureSample(reflectivitySampler,reflectivitySamplerSampler,input.vReflectivityUV);
#ifdef GAMMAREFLECTIVITYTEXTURE
reflectivity=vec4f(toLinearSpaceVec3(reflectivity.rgb),reflectivity.a);
#endif
#else 
#ifdef REFLECTIVITYCOLOR
reflectivity=vec4f(toLinearSpaceVec3(uniforms.reflectivityColor.xyz),1.0);
#endif
#endif
#ifdef GLOSSINESSS
reflectivity=vec4f(reflectivity.rgb,reflectivity.a*glossiness); 
#endif
#endif
fragData[REFLECTIVITY_INDEX]=reflectivity;
#endif
#ifdef IRRADIANCE
var irradiance: vec3f=vec3f(0.0);var irradiance_alpha: f32=1.0;
#ifdef REFLECTION
#ifdef IRRADIANCE_SCATTER_MASK
#ifndef BUMP
let uvOffset: vec2f=vec2f(0.0);
#endif
var vSubsurfaceColor: vec3f=vec3f(1.0);var vSubsurfaceRadius: f32=0.0;var vSubsurfaceRadiusScale: vec3f=vec3f(1.0);
#include<openpbrSubsurfaceLayerData>(uniforms.vSubsurfaceColor,vSubsurfaceColor,uniforms.vSubsurfaceRadius,vSubsurfaceRadius,uniforms.vSubsurfaceRadiusScale,vSubsurfaceRadiusScale)
var vTransmissionDepth: f32=1.0;var vTransmissionColor: vec3f=vec3f(1.0);var vTransmissionScatter: vec3f=vec3f(0.0);var vTransmissionDispersionScale: f32=0.0;var vTransmissionDispersionAbbeNumber: f32=0.0;
#include<openpbrTransmissionLayerData>(uniforms.vTransmissionDispersionScale,vTransmissionDispersionScale,uniforms.vTransmissionDispersionAbbeNumber,vTransmissionDispersionAbbeNumber,uniforms.vTransmissionColor,vTransmissionColor,uniforms.vTransmissionDepth,vTransmissionDepth,uniforms.vTransmissionScatter\\.,vTransmissionScatter.)
#endif
#ifdef IBL_SHADOW_TEXTURE
#ifdef COLORED_IBL_SHADOWS
let iblShadowValue: vec3f=textureSample(iblShadowSampler,iblShadowSamplerSampler,fragmentInputs.position.xy/uniforms.shadowTextureSize).rgb;
#else
let iblShadowValue: vec3f=vec3f(textureSample(iblShadowSampler,iblShadowSamplerSampler,fragmentInputs.position.xy/uniforms.shadowTextureSize).r);
#endif
#endif
#if defined(USEIRRADIANCEMAP)
#ifdef IRRADIANCE_SCATTER_MASK
let bendAmount: f32=subsurface_weight*-min(subsurface_scatter_anisotropy,0.0);let mixedBendAmount: f32=mix(bendAmount,-min(transmission_scatter_anisotropy,0.0),transmission_weight);let viewVector: vec3f=normalize(scene.vEyePosition.xyz-input.vPositionW);let bentNormal: vec3f=mix(normalOutput,viewVector,mixedBendAmount*dot(normalOutput,viewVector));
#else
let bentNormal: vec3f=normalOutput;
#endif
irradiance=sampleIrradiance(
bentNormal
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,input.vEnvironmentIrradiance
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,uniforms.reflectionMatrix
#endif
#ifdef USEIRRADIANCEMAP
,irradianceSampler
,irradianceSamplerSampler
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,uniforms.vReflectionDominantDirection
#endif
#endif
#ifdef REALTIME_FILTERING
,uniforms.vReflectionFilteringInfo
#ifdef IBL_CDF_FILTERING
,icdfSampler
,icdfSamplerSampler
#endif
#endif
,uniforms.vReflectionInfos
,input.vViewPos.xyz
,1.0
,vec3f(1.0)
);
#elif defined(USESPHERICALFROMREFLECTIONMAP)
irradiance=input.vEnvironmentIrradiance;
#endif
#ifdef IBL_SHADOW_TEXTURE
irradiance*=iblShadowValue;
#endif
#ifdef IRRADIANCE_SCATTER_MASK
irradiance_alpha=min(subsurface_weight+transmission_weight,1.0);
#endif
#endif
fragData[IRRADIANCE_INDEX]=vec4f(irradiance,irradiance_alpha);
#endif
#if SCENE_MRT_COUNT>0
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==0
fragmentOutputs.fragData0=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData0=fragData[0];
#endif
#endif
#if SCENE_MRT_COUNT>1
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==1
fragmentOutputs.fragData1=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData1=fragData[1];
#endif
#endif
#if SCENE_MRT_COUNT>2
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==2
fragmentOutputs.fragData2=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData2=fragData[2];
#endif
#endif
#if SCENE_MRT_COUNT>3
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==3
fragmentOutputs.fragData3=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData3=fragData[3];
#endif
#endif
#if SCENE_MRT_COUNT>4
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==4
fragmentOutputs.fragData4=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData4=fragData[4];
#endif
#endif
#if SCENE_MRT_COUNT>5
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==5
fragmentOutputs.fragData5=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData5=fragData[5];
#endif
#endif
#if SCENE_MRT_COUNT>6
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==6
fragmentOutputs.fragData6=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData6=fragData[6];
#endif
#endif
#if SCENE_MRT_COUNT>7
#if defined(MESH_BLEND_TAG) && MESH_BLEND_TAG_INDEX==7
fragmentOutputs.fragData7=vec4u(u32(uniforms.meshBlendTag),0u,0u,0u);
#else
fragmentOutputs.fragData7=fragData[7];
#endif
#endif
}
`;for(let e of(a.l.ShadersStoreWGSL[A]||(a.l.ShadersStoreWGSL[A]=C),[f.n,n.O,o.C,t.w,l.d,c.f,s.B,d.e,m.$,v.E,u.S,p.x,E.I,S.O,I.O,N.o,R.K,T.P]))a.l.IncludesShadersStoreWGSL[e.name]||(a.l.IncludesShadersStoreWGSL[e.name]=e.shader);let L={name:A,shader:C}},81606:(e,r,i)=>{i.d(r,{P:()=>o});var a=i(35614);let f="openpbrTransmissionLayerData",n=`var transmission_weight: f32=uniforms.vTransmissionWeight;var transmission_color: vec3f=uniforms.vTransmissionColor.rgb;var transmission_depth: f32=uniforms.vTransmissionDepth;var transmission_scatter: vec3f=uniforms.vTransmissionScatter.rgb;var transmission_scatter_anisotropy: f32=clamp(uniforms.vTransmissionScatterAnisotropy,-0.9999f,0.9999f);var transmission_dispersion_scale: f32=uniforms.vTransmissionDispersionScale;var transmission_dispersion_abbe_number: f32=uniforms.vTransmissionDispersionAbbeNumber;
#ifdef TRANSMISSION_WEIGHT
let transmissionWeightFromTexture: vec4f=TEXRD(transmissionWeightSampler,transmissionWeightSamplerSampler,fragmentInputs.vTransmissionWeightUV+uvOffset);
#endif
#ifdef TRANSMISSION_COLOR
let transmissionColorFromTexture: vec4f=TEXRD(transmissionColorSampler,transmissionColorSamplerSampler,fragmentInputs.vTransmissionColorUV+uvOffset);
#endif
#ifdef TRANSMISSION_DEPTH
let transmissionDepthFromTexture: vec4f=TEXRD(transmissionDepthSampler,transmissionDepthSamplerSampler,fragmentInputs.vTransmissionDepthUV+uvOffset);
#endif
#ifdef TRANSMISSION_SCATTER
let transmissionScatterFromTexture: vec4f=TEXRD(transmissionScatterSampler,transmissionScatterSamplerSampler,fragmentInputs.vTransmissionScatterUV+uvOffset);
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
let transmissionDispersionScaleFromTexture: vec4f=TEXRD(transmissionDispersionScaleSampler,transmissionDispersionScaleSamplerSampler,fragmentInputs.vTransmissionDispersionScaleUV+uvOffset);
#endif
#ifdef TRANSMISSION_WEIGHT
transmission_weight*=transmissionWeightFromTexture.r;
#endif
#ifdef TRANSMISSION_COLOR
#ifdef TRANSMISSION_COLOR_GAMMA
transmission_color*=toLinearSpaceVec3(transmissionColorFromTexture.rgb);
#else
transmission_color*=transmissionColorFromTexture.rgb;
#endif
transmission_color*=uniforms.vTransmissionColorInfos.y;
#endif
#ifdef TRANSMISSION_DEPTH
transmission_depth*=transmissionDepthFromTexture.r;
#endif
#ifdef TRANSMISSION_SCATTER
transmission_scatter*=transmissionScatterFromTexture.rgb;
#endif
#ifdef TRANSMISSION_DISPERSION_SCALE
transmission_dispersion_scale*=transmissionDispersionScaleFromTexture.r;
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},83737:(e,r,i)=>{i.d(r,{E:()=>o});var a=i(35614);let f="openpbrDielectricReflectance",n=`struct ReflectanceParams
{F0: f32,
F90: f32,
coloredF0: vec3f,
coloredF90: vec3f,};
#define pbr_inline
fn dielectricReflectance(
insideIOR: f32,outsideIOR: f32,specularColor: vec3f,specularWeight: f32
)->ReflectanceParams
{var outParams: ReflectanceParams;let dielectricF0=pow((insideIOR-outsideIOR)/(insideIOR+outsideIOR),2.0);let f90Scale=clamp(2.0f*abs(insideIOR-outsideIOR),0.0f,1.0f);
#if (DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_OPENPBR)
let dielectricColorF90: vec3f=specularColor.rgb*vec3f(f90Scale);
#else
let dielectricColorF90: vec3f=vec3f(f90Scale);
#endif
#if DIELECTRIC_SPECULAR_MODEL==DIELECTRIC_SPECULAR_MODEL_GLTF
let maxF0=max(specularColor.r,max(specularColor.g,specularColor.b));outParams.F0=dielectricF0*maxF0*specularWeight;
#else
outParams.F0=dielectricF0*specularWeight;
#endif
outParams.F90=f90Scale*specularWeight;outParams.coloredF0=vec3f(dielectricF0*specularWeight)*specularColor.rgb;outParams.coloredF90=dielectricColorF90*vec3f(specularWeight);return outParams;}
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},85059:(e,r,i)=>{i.d(r,{O:()=>o});var a=i(35614);let f="openpbrIblFunctions",n=`#ifdef REFLECTION
fn sampleIrradiance(
surfaceNormal: vec3f
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
,vEnvironmentIrradianceSH: vec3f
#endif
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
,iblMatrix: mat4x4f
#endif
#ifdef USEIRRADIANCEMAP
#ifdef REFLECTIONMAP_3D
,irradianceSampler: texture_cube<f32>
,irradianceSamplerSampler: sampler
#else
,irradianceSampler: texture_2d<f32>
,irradianceSamplerSampler: sampler
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
,reflectionDominantDirection: vec3f
#endif
#endif
#ifdef REALTIME_FILTERING
,reflectionFilteringInfo: vec2f
#ifdef IBL_CDF_FILTERING
,icdfSampler: texture_2d<f32>
,icdfSamplerSampler: sampler
#endif
#endif
,reflectionInfos: vec2f
,viewDirectionW: vec3f
,diffuseRoughness: f32
,surfaceAlbedo: vec3f
)->vec3f {var environmentIrradiance=vec3f(0.,0.,0.);
#if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
var irradianceVector=(iblMatrix*vec4f(surfaceNormal,0.0f)).xyz;var irradianceView=(iblMatrix*vec4f(viewDirectionW,0.0f)).xyz;
#if !defined(USE_IRRADIANCE_DOMINANT_DIRECTION) && !defined(REALTIME_FILTERING)
#if BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LAMBERT && BASE_DIFFUSE_MODEL != BRDF_DIFFUSE_MODEL_LEGACY
{let NdotV=max(dot(surfaceNormal,viewDirectionW),0.0f);irradianceVector=mix(irradianceVector,irradianceView,(0.5f*(1.0f-NdotV))*diffuseRoughness);}
#endif
#endif
#ifdef REFLECTIONMAP_OPPOSITEZ
irradianceVector.z*=-1.0;irradianceView.z*=-1.0;
#endif
#ifdef INVERTCUBICMAP
irradianceVector.y*=-1.0;irradianceView.y*=-1.0;
#endif
#endif
#ifdef USESPHERICALFROMREFLECTIONMAP
#if defined(NORMAL) && defined(USESPHERICALINVERTEX)
environmentIrradiance=vEnvironmentIrradianceSH;
#else
#if defined(REALTIME_FILTERING)
environmentIrradiance=irradiance(reflectionSampler,reflectionSamplerSampler,irradianceVector,reflectionFilteringInfo,diffuseRoughness,surfaceAlbedo,irradianceView
#ifdef IBL_CDF_FILTERING
,icdfSampler
,icdfSamplerSampler
#endif
);
#else
environmentIrradiance=computeEnvironmentIrradiance(irradianceVector);
#endif
#endif
#elif defined(USEIRRADIANCEMAP)
#ifdef REFLECTIONMAP_3D
let environmentIrradianceFromTexture: vec4f=textureSample(irradianceSampler,irradianceSamplerSampler,irradianceVector);
#else
let environmentIrradianceFromTexture: vec4f=textureSample(irradianceSampler,irradianceSamplerSampler,reflectionCoords);
#endif
environmentIrradiance=environmentIrradianceFromTexture.rgb;
#ifdef RGBDREFLECTION
environmentIrradiance.rgb=fromRGBD(environmentIrradianceFromTexture);
#endif
#ifdef GAMMAREFLECTION
environmentIrradiance.rgb=toLinearSpaceVec3(environmentIrradiance.rgb);
#endif
#ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
let Ls: vec3f=normalize(reflectionDominantDirection);let NoL: f32=dot(irradianceVector,Ls);let NoV: f32=dot(irradianceVector,irradianceView);var diffuseRoughnessTerm=vec3f(1.0f);
#if BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_EON
let LoV: f32=dot (Ls,irradianceView);let mag: f32=length(reflectionDominantDirection)*2.0f;let clampedAlbedo: vec3f=clamp(surfaceAlbedo,vec3f(0.1f),vec3f(1.0f));diffuseRoughnessTerm=diffuseBRDF_EON(clampedAlbedo,diffuseRoughness,NoL,NoV,LoV)*PI;diffuseRoughnessTerm=diffuseRoughnessTerm/clampedAlbedo;diffuseRoughnessTerm=mix(vec3f(1.0f),diffuseRoughnessTerm,sqrt(clamp(mag*NoV,0.0f,1.0f)));
#elif BASE_DIFFUSE_MODEL==BRDF_DIFFUSE_MODEL_BURLEY
let H: vec3f=(irradianceView+Ls)*0.5f;let VoH: f32=dot(irradianceView,H);diffuseRoughnessTerm=vec3f(diffuseBRDF_Burley(NoL,NoV,VoH,diffuseRoughness)*PI);
#endif
environmentIrradiance=environmentIrradiance.rgb*diffuseRoughnessTerm;
#endif
#endif
environmentIrradiance*=reflectionInfos.x;return environmentIrradiance;}
#ifdef REFLECTIONMAP_3D
fn createReflectionCoords(vPositionW: vec3f,normalW: vec3f)->vec3f
#else
fn createReflectionCoords(vPositionW: vec3f,normalW: vec3f)->vec2f
#endif
{var reflectionVector: vec3f=computeReflectionCoords(vec4f(vPositionW,1.0f),normalW);
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionVector.z*=-1.0;
#endif
#ifdef REFLECTIONMAP_3D
var reflectionCoords: vec3f=reflectionVector;
#else
var reflectionCoords: vec2f=reflectionVector.xy;
#ifdef REFLECTIONMAP_PROJECTION
reflectionCoords/=reflectionVector.z;
#endif
reflectionCoords.y=1.0f-reflectionCoords.y;
#endif
return reflectionCoords;}
fn sampleRadiance(
alphaG: f32
,reflectionMicrosurfaceInfos: vec3f
,reflectionInfos: vec2f
,geoInfo: geometryInfoOutParams
#ifdef REFLECTIONMAP_3D
,reflectionSampler: texture_cube<f32>
,reflectionSamplerSampler: sampler
,reflectionCoords: vec3f
#else
,reflectionSampler: texture_2d<f32>
,reflectionSamplerSampler: sampler
,reflectionCoords: vec2f
#endif
#ifdef REALTIME_FILTERING
,reflectionFilteringInfo: vec2f
#endif
)->vec3f {var environmentRadiance: vec4f=vec4f(0.f,0.f,0.f,0.f);
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
var reflectionLOD: f32=getLodFromAlphaG(reflectionMicrosurfaceInfos.x,alphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
var reflectionLOD: f32=getLinearLodFromRoughness(reflectionMicrosurfaceInfos.x,roughness);
#else
var reflectionLOD: f32=getLodFromAlphaG(reflectionMicrosurfaceInfos.x,alphaG);
#endif
reflectionLOD=reflectionLOD*reflectionMicrosurfaceInfos.y+reflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
environmentRadiance=vec4f(radiance(alphaG,reflectionSampler,reflectionSamplerSampler,reflectionCoords,reflectionFilteringInfo),1.0f);
#else
environmentRadiance=textureSampleLevel(reflectionSampler,reflectionSamplerSampler,reflectionCoords,reflectionLOD);
#endif
var envRadiance: vec3f=environmentRadiance.rgb;
#ifdef RGBDREFLECTION
envRadiance=fromRGBD(environmentRadiance);
#endif
#ifdef GAMMAREFLECTION
envRadiance=toLinearSpaceVec3(environmentRadiance.rgb);
#endif
envRadiance*=reflectionInfos.x;return envRadiance;}
#if defined(ANISOTROPIC)
fn sampleRadianceAnisotropic(
alphaG: f32
,reflectionMicrosurfaceInfos: vec3f
,reflectionInfos: vec2f
,geoInfo: geometryInfoAnisoOutParams
,normalW: vec3f
,viewDirectionW: vec3f
,positionW: vec3f
,noise: vec3f
,isRefraction: bool
,ior: f32
#ifdef REFLECTIONMAP_3D
,reflectionSampler: texture_cube<f32>
,reflectionSamplerSampler: sampler
#else
,reflectionSampler: texture_2d<f32>
,reflectionSamplerSampler: sampler
#endif
#ifdef REALTIME_FILTERING
,reflectionFilteringInfo: vec2f
#endif
)->vec3f {var environmentRadiance: vec4f=vec4f(0.f,0.f,0.f,0.f);let alphaT=alphaG*sqrt(2.0f/(1.0f+(1.0f-geoInfo.anisotropy)*(1.0f-geoInfo.anisotropy)));let alphaB=(1.0f-geoInfo.anisotropy)*alphaT;let modifiedAlphaG=alphaB;
#if defined(LODINREFLECTIONALPHA) && !defined(REFLECTIONMAP_SKYBOX)
var reflectionLOD: f32=getLodFromAlphaG(reflectionMicrosurfaceInfos.x,modifiedAlphaG,geoInfo.NdotVUnclamped);
#elif defined(LINEARSPECULARREFLECTION)
var reflectionLOD: f32=getLinearLodFromRoughness(reflectionMicrosurfaceInfos.x,roughness);
#else
var reflectionLOD: f32=getLodFromAlphaG(reflectionMicrosurfaceInfos.x,modifiedAlphaG);
#endif
reflectionLOD=reflectionLOD*reflectionMicrosurfaceInfos.y+reflectionMicrosurfaceInfos.z;
#ifdef REALTIME_FILTERING
var view=(uniforms.reflectionMatrix*vec4f(viewDirectionW,0.0f)).xyz;var tangent=(uniforms.reflectionMatrix*vec4f(geoInfo.anisotropicTangent,0.0f)).xyz;var bitangent=(uniforms.reflectionMatrix*vec4f(geoInfo.anisotropicBitangent,0.0f)).xyz;var normal=(uniforms.reflectionMatrix*vec4f(normalW,0.0f)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
view.z*=-1.0f;tangent.z*=-1.0f;bitangent.z*=-1.0f;normal.z*=-1.0f;
#endif
environmentRadiance =
vec4f(radianceAnisotropic(alphaT,alphaB,reflectionSampler,reflectionSamplerSampler,
view,tangent,
bitangent,normal,
reflectionFilteringInfo,noise.xy,isRefraction,ior),
1.0f);
#else
const samples: i32=16;var radianceSample=vec4f(0.0);var accumulatedRadiance=vec3f(0.0);var sample_weight=0.0f;var total_weight=0.0f;let step=1.0f/f32(max(samples-1,1));for (var i: i32=0; i<samples; i++) {var t: f32=mix(-1.0,1.0,f32(i)*step);t+=step*2.0*noise.x;sample_weight=max(1.0-abs(t),0.001);sample_weight*=sample_weight;t*=min(4.0*alphaT*geoInfo.anisotropy,1.0);var bentNormal: vec3f;if (t<0.0) {let blend: f32=t+1.0;bentNormal=normalize(mix(-geoInfo.anisotropicTangent,normalW,blend));} else if (t>0.0) {let blend: f32=t;bentNormal=normalize(mix(normalW,geoInfo.anisotropicTangent,blend));} else {bentNormal=normalW;}
#ifdef REFLECTIONMAP_3D
var reflectionCoords: vec3f;if (isRefraction) {reflectionCoords=double_refract(-viewDirectionW,bentNormal,ior);} else {reflectionCoords=reflect(-viewDirectionW,bentNormal);}
reflectionCoords=(uniforms.reflectionMatrix*vec4f(reflectionCoords,0.f)).xyz;
#ifdef REFLECTIONMAP_OPPOSITEZ
reflectionCoords.z*=-1.0f;
#endif
#else
var sampleDirection: vec3f;if (isRefraction) {sampleDirection=double_refract(-viewDirectionW,bentNormal,ior);} else {sampleDirection=reflect(-viewDirectionW,bentNormal);}
let originalViewDirectionW: vec3f=normalize(scene.vEyePosition.xyz-positionW);let mappingNormalCandidate: vec3f=originalViewDirectionW+sampleDirection;var mappingNormal: vec3f;if (dot(mappingNormalCandidate,mappingNormalCandidate)>Epsilon) {mappingNormal=normalize(mappingNormalCandidate);} else {let perpendicularAxis: vec3f=select(vec3f(0.0f,1.0f,0.0f),vec3f(1.0f,0.0f,0.0f),abs(originalViewDirectionW.x)<0.9f);mappingNormal=normalize(cross(originalViewDirectionW,perpendicularAxis));}
let reflectionCoords: vec2f=createReflectionCoords(positionW,mappingNormal);
#endif
radianceSample=textureSampleLevel(reflectionSampler,reflectionSamplerSampler,reflectionCoords,reflectionLOD);
#ifdef RGBDREFLECTION
accumulatedRadiance+=vec3f(sample_weight)*fromRGBD(radianceSample);
#elif defined(GAMMAREFLECTION)
accumulatedRadiance+=vec3f(sample_weight)*toLinearSpaceVec3(radianceSample.rgb);
#else
accumulatedRadiance+=vec3f(sample_weight)*radianceSample.rgb;
#endif
total_weight+=sample_weight;}
environmentRadiance=vec4f(accumulatedRadiance/vec3f(total_weight),1.0f);
#endif
environmentRadiance=vec4f(environmentRadiance.rgb*reflectionInfos.xxx,environmentRadiance.a);return environmentRadiance.rgb;}
#endif
#endif
#ifdef ENVIRONMENTBRDF
fn computeDielectricIblFresnel(reflectance: ReflectanceParams,environmentBrdf: vec3f)->f32
{let dielectricIblFresnel: f32=getReflectanceFromBRDFWithEnvLookup(vec3f(reflectance.F0),vec3f(reflectance.F90),environmentBrdf).r;let dielectricECF: f32=1.0+reflectance.F0*(1.0/environmentBrdf.y-1.0);return clamp(dielectricIblFresnel*dielectricECF,0.0,1.0);}
fn computeConductorIblFresnel(reflectance: ReflectanceParams,environmentBrdf: vec3f)->vec3f
{
#if (CONDUCTOR_SPECULAR_MODEL==CONDUCTOR_SPECULAR_MODEL_OPENPBR)
let openPBRBrdf: vec3f=vec3f(environmentBrdf.xy,environmentBrdf.z/BRDF_Z_SCALE);let b: vec3f =getF82B(reflectance.coloredF0,reflectance.coloredF90);let E_F82: vec3f=getF82DirectionalAlbedo(reflectance.coloredF0,vec3f(1.0),b,openPBRBrdf);let F_avg: vec3f=getF82AverageFresnel(reflectance.coloredF0,b);let ECF: vec3f =vec3f(1.0)+F_avg*(vec3f(1.0)/openPBRBrdf.y-vec3f(1.0));return clamp(E_F82*ECF,vec3f(0.0),vec3f(1.0));
#else
return getReflectanceFromBRDFLookup(reflectance.coloredF0,reflectance.coloredF90,environmentBrdf);
#endif
}
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}},88404:(e,r,i)=>{i.d(r,{B:()=>o});var a=i(35614);let f="pbrFragmentReflectionDeclaration",n=`#ifdef REFLECTION
#ifdef REFLECTIONMAP_3D
var reflectionSamplerSampler: sampler;var reflectionSampler: texture_cube<f32>;
#ifdef LODBASEDMICROSFURACE
#else
var reflectionLowSamplerSampler: sampler;var reflectionLowSampler: texture_cube<f32>;var reflectionHighSamplerSampler: sampler;var reflectionHighSampler: texture_cube<f32>;
#endif
#ifdef USEIRRADIANCEMAP
var irradianceSamplerSampler: sampler;var irradianceSampler: texture_cube<f32>;
#endif
#else
var reflectionSamplerSampler: sampler;var reflectionSampler: texture_2d<f32>;
#ifdef LODBASEDMICROSFURACE
#else
var reflectionLowSamplerSampler: sampler;var reflectionLowSampler: texture_2d<f32>;var reflectionHighSamplerSampler: sampler;var reflectionHighSampler: texture_2d<f32>;
#endif
#ifdef USEIRRADIANCEMAP
var irradianceSamplerSampler: sampler;var irradianceSampler: texture_2d<f32>;
#endif
#endif
#ifdef REFLECTIONMAP_SKYBOX
varying vPositionUVW: vec3f;
#else
#if defined(REFLECTIONMAP_EQUIRECTANGULAR_FIXED) || defined(REFLECTIONMAP_MIRROREDEQUIRECTANGULAR_FIXED)
varying vDirectionW: vec3f;
#endif
#endif
#endif
`;a.l.IncludesShadersStoreWGSL[f]||(a.l.IncludesShadersStoreWGSL[f]=n);let o={name:f,shader:n}}}]);