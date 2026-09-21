"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7427],{15640:(e,t,a)=>{a.d(t,{f:()=>f});var r=a(35614);let s="helperFunctions",o=`const PI: f32=3.1415926535897932384626433832795;const TWO_PI: f32=6.283185307179586;const HALF_PI: f32=1.5707963267948966;const RECIPROCAL_PI: f32=0.3183098861837907;const RECIPROCAL_PI2: f32=0.15915494309189535;const RECIPROCAL_PI4: f32=0.07957747154594767;const HALF_MIN: f32=5.96046448e-08; 
const LinearEncodePowerApprox: f32=2.2;const GammaEncodePowerApprox: f32=1.0/LinearEncodePowerApprox;const LuminanceEncodeApprox: vec3f=vec3f(0.2126,0.7152,0.0722);const Epsilon:f32=0.0000001;fn square(x: f32)->f32 {return x*x;}
fn saturate(x: f32)->f32 {return clamp(x,0.0,1.0);}
fn saturateVec3(x: vec3f)->vec3f {return clamp(x,vec3f(),vec3f(1.0));}
fn saturateEps(x: f32)->f32 {return clamp(x,Epsilon,1.0);}
fn maxEps(x: f32)->f32 {return max(x,Epsilon);}
fn maxEpsVec3(x: vec3f)->vec3f {return max(x,vec3f(Epsilon));}
fn absEps(x: f32)->f32 {return abs(x)+Epsilon;}
fn transposeMat3(inMatrix: mat3x3f)->mat3x3f {let i0: vec3f=inMatrix[0];let i1: vec3f=inMatrix[1];let i2: vec3f=inMatrix[2];let outMatrix:mat3x3f=mat3x3f(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);return outMatrix;}
fn inverseMat3(inMatrix: mat3x3f)->mat3x3f {let a00: f32=inMatrix[0][0];let a01: f32=inMatrix[0][1];let a02: f32=inMatrix[0][2];let a10: f32=inMatrix[1][0];let a11: f32=inMatrix[1][1];let a12: f32=inMatrix[1][2];let a20: f32=inMatrix[2][0];let a21: f32=inMatrix[2][1];let a22: f32=inMatrix[2][2];let b01: f32=a22*a11-a12*a21;let b11: f32=-a22*a10+a12*a20;let b21: f32=a21*a10-a11*a20;let det: f32=a00*b01+a01*b11+a02*b21;return mat3x3f(b01/det,(-a22*a01+a02*a21)/det,(a12*a01-a02*a11)/det,
b11/det,(a22*a00-a02*a20)/det,(-a12*a00+a02*a10)/det,
b21/det,(-a21*a00+a01*a20)/det,(a11*a00-a01*a10)/det);}
#if USE_EXACT_SRGB_CONVERSIONS
fn toLinearSpaceExact(color: vec3f)->vec3f
{let nearZeroSection: vec3f=0.0773993808*color;let remainingSection: vec3f=pow(0.947867299*(color+vec3f(0.055)),vec3f(2.4));return select(remainingSection,nearZeroSection,color<=vec3f(0.04045));}
fn toGammaSpaceExact(color: vec3f)->vec3f
{let nearZeroSection: vec3f=12.92*color;let remainingSection: vec3f=1.055*pow(color,vec3f(0.41666))-vec3f(0.055);return select(remainingSection,nearZeroSection,color<=vec3f(0.0031308));}
#endif
fn toLinearSpace(color: f32)->f32
{
#if USE_EXACT_SRGB_CONVERSIONS
var nearZeroSection=0.0773993808*color;var remainingSection=pow(0.947867299*(color+0.055),2.4);return select(remainingSection,nearZeroSection,color<=0.04045);
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
fn toLinearSpaceVec3(color: vec3f)->vec3f
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3f(LinearEncodePowerApprox));
#endif
}
fn toLinearSpaceVec4(color: vec4<f32>)->vec4<f32>
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4f(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4f(pow(color.rgb,vec3f(LinearEncodePowerApprox)),color.a);
#endif
}
fn toGammaSpace(color: vec4<f32>)->vec4<f32>
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4<f32>(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4<f32>(pow(color.rgb,vec3f(GammaEncodePowerApprox)),color.a);
#endif
}
fn toGammaSpaceVec3(color: vec3f)->vec3f
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3f(GammaEncodePowerApprox));
#endif
}
fn squareVec3(value: vec3f)->vec3f
{return value*value;}
fn pow5(value: f32)->f32 {let sq: f32=value*value;return sq*sq*value;}
fn double_refract(I: vec3f,N: vec3f,eta: f32)->vec3f {let Tfront: vec3f=refract(I,N,1.0/eta);let Nback: vec3f=normalize(reflect(N,Tfront));return refract(Tfront,-Nback,eta);}
fn getLuminanceUnclamped(color: vec3f)->f32
{return dot(color,LuminanceEncodeApprox);}
fn getLuminance(color: vec3f)->f32
{return saturate(getLuminanceUnclamped(color));}
fn getRand(seed: vec2<f32>)->f32 {return fract(sin(dot(seed.xy ,vec2<f32>(12.9898,78.233)))*43758.5453);}
fn dither(seed: vec2<f32>,varianceAmount: f32)->f32 {let rand: f32=getRand(seed);let normVariance: f32=varianceAmount/255.0;let dither: f32=mix(-normVariance,normVariance,rand);return dither;}
const rgbdMaxRange: f32=255.0;fn toRGBD(color: vec3f)->vec4<f32> {let maxRGB: f32=max(max(color.r,max(color.g,color.b)),Epsilon);var D: f32 =max(rgbdMaxRange/maxRGB,1.);D =clamp(floor(D)/255.0,0.,1.);var rgb: vec3f =color.rgb*D;rgb=toGammaSpaceVec3(rgb);return vec4<f32>(saturateVec3(rgb),D);}
fn fromRGBD(rgbd: vec4<f32>)->vec3f {let rgb=toLinearSpaceVec3(rgbd.rgb);return rgb/rgbd.a;}
fn parallaxCorrectNormal(vertexPos: vec3f,origVec: vec3f,cubeSize: vec3f,cubePos: vec3f)->vec3f {let invOrigVec: vec3f=vec3f(1.)/origVec;let halfSize: vec3f=cubeSize*0.5;let intersecAtMaxPlane: vec3f=(cubePos+halfSize-vertexPos)*invOrigVec;let intersecAtMinPlane: vec3f=(cubePos-halfSize-vertexPos)*invOrigVec;let largestIntersec: vec3f=max(intersecAtMaxPlane,intersecAtMinPlane);let distance: f32=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);let intersectPositionWS: vec3f=vertexPos+origVec*distance;return intersectPositionWS-cubePos;}
fn equirectangularToCubemapDirection(uv : vec2f)->vec3f {var longitude : f32=uv.x*TWO_PI-PI;var latitude : f32=HALF_PI-uv.y*PI;var direction : vec3f;direction.x=cos(latitude)*sin(longitude);direction.y=sin(latitude);direction.z=cos(latitude)*cos(longitude);return direction;}
fn sqrtClamped(value: f32)->f32 {return sqrt(max(value,0.));}
fn avg(value: vec3f)->f32 {return dot(value,vec3f(0.333333333));}
fn singleScatterToMultiScatterAlbedo(rho_ss: vec3f)->vec3f {let s: vec3f=sqrt(max(vec3f(1.0)-rho_ss,vec3f(0.0)));return (vec3f(1.0)-s)*(vec3f(1.0)-vec3f(0.139)*s)/(vec3f(1.0)+vec3f(1.17)*s);}
fn multiScatterToSingleScatterAlbedo(rho_ms: vec3f)->vec3f {let s: vec3f=4.09712f+4.20863f*rho_ms-sqrt(9.59217f+41.6808f*rho_ms+17.7126f*rho_ms*rho_ms);return 1.0f-s*s;}
fn multiScatterToSingleScatterAlbedoWithAniso(rho_ms: vec3f,aniso: f32)->vec3f {let s: vec3f=4.09712+4.20863f*rho_ms-sqrt(9.59217f+41.6808f*rho_ms+17.7126f*rho_ms*rho_ms);return (vec3f(1.0f)-s*s)/maxEpsVec3(vec3f(1.0f)-vec3f(aniso)*s*s);}
fn min3(v: vec3f)->f32 {return min(v.x,min(v.y,v.z));}
fn max3(v: vec3f)->f32 {return max(v.x,max(v.y,v.z));}
fn uint2float(i: u32)->f32 {return bitcast<f32>(0x3F800000u | (i>>9u))-1.0;}
fn plasticSequence(rstate: u32)->vec2f {return vec2f(uint2float(rstate*3242174889u),
uint2float(rstate*2447445414u));}
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},20196:(e,t,a)=>{a.d(t,{t:()=>f});var r=a(35614);let s="gaussianSplatting",o=`fn getDataUV(index: f32,dataTextureSize: vec2f)->vec2<f32> {let y: f32=floor(index/dataTextureSize.x);let x: f32=index-y*dataTextureSize.x;return vec2f((x+0.5),(y+0.5));}
struct Splat {center: vec4f,
color: vec4f,
covA: vec4f,
covB: vec4f,
#if SH_DEGREE>0
sh0: vec4<u32>,
#endif
#if SH_DEGREE>1
sh1: vec4<u32>,
#endif
#if SH_DEGREE>2
sh2: vec4<u32>,
#endif
#if SH_DEGREE>3
sh3: vec4<u32>,
sh4: vec4<u32>,
#endif
#if IS_COMPOUND
partIndex: u32,
#endif
#if defined(IS_FOR_VOXELIZATION)
rotationA: vec4f,
rotationB: vec4f,
rotationScale: vec4f,
#endif
#ifdef USE_SOG
splatIndex: f32,
#endif
};fn getSplatIndex(localIndex: i32,splatIndex0: vec4f,splatIndex1: vec4f,splatIndex2: vec4f,splatIndex3: vec4f)->f32 {var splatIndex: f32;switch (localIndex)
{case 0:
{splatIndex=splatIndex0.x;break;}
case 1:
{splatIndex=splatIndex0.y;break;}
case 2:
{splatIndex=splatIndex0.z;break;}
case 3:
{splatIndex=splatIndex0.w;break;}
case 4:
{splatIndex=splatIndex1.x;break;}
case 5:
{splatIndex=splatIndex1.y;break;}
case 6:
{splatIndex=splatIndex1.z;break;}
case 7:
{splatIndex=splatIndex1.w;break;}
case 8:
{splatIndex=splatIndex2.x;break;}
case 9:
{splatIndex=splatIndex2.y;break;}
case 10:
{splatIndex=splatIndex2.z;break;}
case 11:
{splatIndex=splatIndex2.w;break;}
case 12:
{splatIndex=splatIndex3.x;break;}
case 13:
{splatIndex=splatIndex3.y;break;}
case 14:
{splatIndex=splatIndex3.z;break;}
default:
{splatIndex=splatIndex3.w;break;}}
return splatIndex;}
fn readSplat(splatIndex: f32,dataTextureSize: vec2f)->Splat {var splat: Splat;let splatUV=getDataUV(splatIndex,dataTextureSize);let splatUVi32=vec2<i32>(i32(splatUV.x),i32(splatUV.y));
#ifdef USE_SOG
let mL=textureLoad(centersTexture,splatUVi32,0);let mU=textureLoad(covariancesATexture,splatUVi32,0);let sRaw=textureLoad(covariancesBTexture,splatUVi32,0);let qRaw=textureLoad(sogQuatsTexture,splatUVi32,0);let c0=textureLoad(colorsTexture,splatUVi32,0);let q16=(mU.xyz*256.0+mL.xyz)*(255.0/65535.0);let nPos=mix(uniforms.sogMeansMin,uniforms.sogMeansMax,q16);let center3=sign(nPos)*(exp(abs(nPos))-vec3f(1.0));splat.center=vec4f(center3,1.0);
#ifdef USE_SOG_V2
let sIdx=floor(sRaw.xyz*255.0+0.5);var splatScale: vec3f;splatScale.x=exp(textureLoad(sogCodebookTexture,vec2<i32>(i32(sIdx.x),0),0).r);splatScale.y=exp(textureLoad(sogCodebookTexture,vec2<i32>(i32(sIdx.y),0),0).r);splatScale.z=exp(textureLoad(sogCodebookTexture,vec2<i32>(i32(sIdx.z),0),0).r);
#else
let splatScale=exp(mix(uniforms.sogScalesMin,uniforms.sogScalesMax,sRaw.xyz));
#endif
let invSqrt2: f32=0.70710678118;let qabc=(qRaw.xyz-vec3f(0.5))*2.0*invSqrt2;let qMode=i32(qRaw.w*255.0+0.5)-252;let qd=sqrt(max(0.0,1.0-dot(qabc,qabc)));var quat: vec4f;if (qMode==0) { quat=vec4f(qd,qabc.x,qabc.y,qabc.z); }
else if (qMode==1) { quat=vec4f(qabc.x,qd,qabc.y,qabc.z); }
else if (qMode==2) { quat=vec4f(qabc.x,qabc.y,qd,qabc.z); }
else { quat=vec4f(qabc.x,qabc.y,qabc.z,qd); }
let qw=quat.x; let qx=quat.y; let qy=quat.z; let qz=quat.w;let R=mat3x3<f32>(
1.0-2.0*(qy*qy+qz*qz),2.0*(qx*qy+qw*qz), 2.0*(qx*qz-qw*qy),
2.0*(qx*qy-qw*qz), 1.0-2.0*(qx*qx+qz*qz),2.0*(qy*qz+qw*qx),
2.0*(qx*qz+qw*qy), 2.0*(qy*qz-qw*qx), 1.0-2.0*(qx*qx+qy*qy)
);let S2=mat3x3<f32>(
4.0*splatScale.x*splatScale.x,0.0,0.0,
0.0,4.0*splatScale.y*splatScale.y,0.0,
0.0,0.0,4.0*splatScale.z*splatScale.z
);let Sigma=R*S2*transpose(R);splat.covA=vec4f(Sigma[0][0],Sigma[0][1],Sigma[0][2],Sigma[1][1]);splat.covB=vec4f(Sigma[1][2],Sigma[2][2],0.0,0.0);let SH_C0_SOG: f32=0.28209479177387814;
#ifdef USE_SOG_V2
var c3: vec3f;c3.x=textureLoad(sogCodebookTexture,vec2<i32>(256+i32(c0.x*255.0+0.5),0),0).r;c3.y=textureLoad(sogCodebookTexture,vec2<i32>(256+i32(c0.y*255.0+0.5),0),0).r;c3.z=textureLoad(sogCodebookTexture,vec2<i32>(256+i32(c0.z*255.0+0.5),0),0).r;let colRgb=vec3f(0.5)+c3*SH_C0_SOG;let colA=c0.w;
#else
let cLerp=mix(uniforms.sogSh0Min,uniforms.sogSh0Max,c0);let colRgb=vec3f(0.5)+cLerp.xyz*SH_C0_SOG;let colA=1.0/(1.0+exp(-cLerp.w));
#endif
splat.color=vec4f(colRgb,colA);splat.splatIndex=splatIndex;
#else
splat.center=textureLoad(centersTexture,splatUVi32,0);splat.color=textureLoad(colorsTexture,splatUVi32,0);
#if !defined(IS_FOR_VOXELIZATION)
splat.covA=textureLoad(covariancesATexture,splatUVi32,0)*splat.center.w;splat.covB=textureLoad(covariancesBTexture,splatUVi32,0)*splat.center.w;
#endif
#endif
#if SH_DEGREE>0 && !defined(USE_SOG)
splat.sh0=textureLoad(shTexture0,splatUVi32,0);
#endif
#if SH_DEGREE>1 && !defined(USE_SOG)
splat.sh1=textureLoad(shTexture1,splatUVi32,0);
#endif
#if SH_DEGREE>2 && !defined(USE_SOG)
splat.sh2=textureLoad(shTexture2,splatUVi32,0);
#endif
#if SH_DEGREE>3 && !defined(USE_SOG)
splat.sh3=textureLoad(shTexture3,splatUVi32,0);splat.sh4=textureLoad(shTexture4,splatUVi32,0);
#endif
#if IS_COMPOUND
splat.partIndex=u32(textureLoad(partIndicesTexture,splatUVi32,0).r*255.0+0.5);
#endif
#if defined(IS_FOR_VOXELIZATION)
splat.rotationA=textureLoad(rotationsATexture,splatUVi32,0);splat.rotationB=textureLoad(rotationsBTexture,splatUVi32,0);splat.rotationScale=textureLoad(rotationScaleTexture,splatUVi32,0);
#endif
return splat;}
fn computeColorFromSHDegree(dir: vec3f,sh: array<vec3<f32>,25>,_so1: f32,_so2: f32,_so3: f32,_so4: f32)->vec3f
{let SH_C0: f32=0.28209479;let SH_C1: f32=0.48860251;var SH_C2: array<f32,5>=array<f32,5>(
1.092548430,
-1.09254843,
0.315391565,
-1.09254843,
0.546274215
);var SH_C3: array<f32,7>=array<f32,7>(
-0.59004358,
2.890611442,
-0.45704579,
0.373176332,
-0.45704579,
1.445305721,
-0.59004358
);var SH_C4: array<f32,9>=array<f32,9>(
2.5033429418,
-1.7701307698,
0.9461746958,
-0.6690465436,
0.1057855469,
-0.6690465436,
0.4730873479,
-1.7701307698,
0.6258357354
);var result: vec3f=/*SH_C0**/sh[0];
#if SH_DEGREE>0
let x: f32=dir.x;let y: f32=dir.y;let z: f32=dir.z;result+=_so1*(-SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3]);
#if SH_DEGREE>1
let xx: f32=x*x;let yy: f32=y*y;let zz: f32=z*z;let xy: f32=x*y;let yz: f32=y*z;let xz: f32=x*z;result+=_so2*(
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0f*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8]);
#if SH_DEGREE>2
result+=_so3*(
SH_C3[0]*y*(3.0f*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0f*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0f*zz-3.0f*xx-3.0f*yy)*sh[12] +
SH_C3[4]*x*(4.0f*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0f*yy)*sh[15]);
#if SH_DEGREE>3
result+=_so4*(
SH_C4[0]*x*y*(xx-yy)*sh[16] +
SH_C4[1]*y*z*(3.0f*xx-yy)*sh[17] +
SH_C4[2]*x*y*(7.0f*zz-1.0f)*sh[18] +
SH_C4[3]*y*z*(7.0f*zz-3.0f)*sh[19] +
SH_C4[4]*(zz*(35.0f*zz-30.0f)+3.0f)*sh[20] +
SH_C4[5]*x*z*(7.0f*zz-3.0f)*sh[21] +
SH_C4[6]*(xx-yy)*(7.0f*zz-1.0f)*sh[22] +
SH_C4[7]*x*z*(xx-3.0f*yy)*sh[23] +
SH_C4[8]*(xx*(xx-3.0f*yy)-yy*(3.0f*xx-yy))*sh[24]);
#endif
#endif
#endif
#endif
return result;}
fn decompose(value: u32)->vec4f
{let components : vec4f=vec4f(
f32((value ) & 255u),
f32((value>>u32( 8)) & 255u),
f32((value>>u32(16)) & 255u),
f32((value>>u32(24)) & 255u));return components*vec4f(2./255.)-vec4f(1.);}
#ifdef USE_SOG
fn computeSH(splat: Splat,dir: vec3f)->vec3f
{
#if SH_DEGREE>0
var sh: array<vec3<f32>,25>;sh[0]=vec3f(0.,0.,0.);let labelSize=textureDimensions(sogShNLabelsTexture,0);let idx=i32(splat.splatIndex+0.5);let lw=i32(labelSize.x);let lx=idx-(idx/lw)*lw;let ly=idx/lw;let labelRaw=textureLoad(sogShNLabelsTexture,vec2<i32>(lx,ly),0);let n=i32(labelRaw.r*255.0+0.5)+i32(labelRaw.g*255.0+0.5)*256;let coeffs=i32(uniforms.sogShCoeffCount+0.5);let u=(n-(n/64)*64)*coeffs;let v=n/64;for (var k: i32=0; k<24; k=k+1) {if (k>=coeffs) { break; }
let centroidRaw=textureLoad(sogShNCentroidsTexture,vec2<i32>(u+k,v),0);var shCoeff: vec3f;
#ifdef USE_SOG_V2
let rIdx=i32(centroidRaw.r*255.0+0.5);let gIdx=i32(centroidRaw.g*255.0+0.5);let bIdx=i32(centroidRaw.b*255.0+0.5);shCoeff.r=textureLoad(sogCodebookTexture,vec2<i32>(512+rIdx,0),0).r;shCoeff.g=textureLoad(sogCodebookTexture,vec2<i32>(512+gIdx,0),0).r;shCoeff.b=textureLoad(sogCodebookTexture,vec2<i32>(512+bIdx,0),0).r;
#else
shCoeff=mix(vec3f(uniforms.sogShnMin),vec3f(uniforms.sogShnMax),centroidRaw.rgb);
#endif
sh[k+1]=shCoeff;}
return computeColorFromSHDegree(dir,sh,1.,1.,1.,1.);
#else
return vec3f(0.,0.,0.);
#endif
}
#else
fn computeSHWeighted(splat: Splat,dir: vec3f,_so1: f32,_so2: f32,_so3: f32,_so4: f32)->vec3f
{var sh: array<vec3<f32>,25>;sh[0]=vec3f(0.,0.,0.);
#if SH_DEGREE>0
let sh00: vec4f=decompose(splat.sh0.x);let sh01: vec4f=decompose(splat.sh0.y);let sh02: vec4f=decompose(splat.sh0.z);sh[1]=vec3f(sh00.x,sh00.y,sh00.z);sh[2]=vec3f(sh00.w,sh01.x,sh01.y);sh[3]=vec3f(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
let sh03: vec4f=decompose(splat.sh0.w);let sh04: vec4f=decompose(splat.sh1.x);let sh05: vec4f=decompose(splat.sh1.y);sh[4]=vec3f(sh02.y,sh02.z,sh02.w);sh[5]=vec3f(sh03.x,sh03.y,sh03.z);sh[6]=vec3f(sh03.w,sh04.x,sh04.y);sh[7]=vec3f(sh04.z,sh04.w,sh05.x);sh[8]=vec3f(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
let sh06: vec4f=decompose(splat.sh1.z);let sh07: vec4f=decompose(splat.sh1.w);let sh08: vec4f=decompose(splat.sh2.x);let sh09: vec4f=decompose(splat.sh2.y);let sh10: vec4f=decompose(splat.sh2.z);let sh11: vec4f=decompose(splat.sh2.w);sh[9]=vec3f(sh06.x,sh06.y,sh06.z);sh[10]=vec3f(sh06.w,sh07.x,sh07.y);sh[11]=vec3f(sh07.z,sh07.w,sh08.x);sh[12]=vec3f(sh08.y,sh08.z,sh08.w);sh[13]=vec3f(sh09.x,sh09.y,sh09.z);sh[14]=vec3f(sh09.w,sh10.x,sh10.y);sh[15]=vec3f(sh10.z,sh10.w,sh11.x);
#endif
#if SH_DEGREE>3
let sh12: vec4f=decompose(splat.sh3.x);let sh13: vec4f=decompose(splat.sh3.y);let sh14: vec4f=decompose(splat.sh3.z);let sh15: vec4f=decompose(splat.sh3.w);let sh16: vec4f=decompose(splat.sh4.x);let sh17: vec4f=decompose(splat.sh4.y);sh[16]=vec3f(sh11.y,sh11.z,sh11.w);sh[17]=vec3f(sh12.x,sh12.y,sh12.z);sh[18]=vec3f(sh12.w,sh13.x,sh13.y);sh[19]=vec3f(sh13.z,sh13.w,sh14.x);sh[20]=vec3f(sh14.y,sh14.z,sh14.w);sh[21]=vec3f(sh15.x,sh15.y,sh15.z);sh[22]=vec3f(sh15.w,sh16.x,sh16.y);sh[23]=vec3f(sh16.z,sh16.w,sh17.x);sh[24]=vec3f(sh17.y,sh17.z,sh17.w);
#endif
return computeColorFromSHDegree(dir,sh,_so1,_so2,_so3,_so4);}
fn computeSH(splat: Splat,dir: vec3f)->vec3f
{
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER1==1
let _w1: f32=1.0;
#else
let _w1: f32=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER2==1
let _w2: f32=1.0;
#else
let _w2: f32=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER3==1
let _w3: f32=1.0;
#else
let _w3: f32=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER4==1
let _w4: f32=1.0;
#else
let _w4: f32=0.0;
#endif
return computeSHWeighted(splat,dir,_w1,_w2,_w3,_w4);}
#endif
fn gaussianSplatting(
meshPos: vec2<f32>,
worldPos: vec3<f32>,
scale: vec2<f32>,
covA: vec3<f32>,
covB: vec3<f32>,
worldMatrix: mat4x4<f32>,
viewMatrix: mat4x4<f32>,
projectionMatrix: mat4x4<f32>,
focal: vec2f,
invViewport: vec2f,
kernelSize: f32,
minPixelSize: f32
)->vec4f {let modelView=viewMatrix*worldMatrix;let camspace=viewMatrix*vec4f(worldPos,1.0);let pos2d=projectionMatrix*camspace;let bounds=1.2*pos2d.w;if (pos2d.z<0. || pos2d.x<-bounds || pos2d.x>bounds || pos2d.y<-bounds || pos2d.y>bounds) {return vec4f(0.0,0.0,2.0,1.0);}
let Vrk=mat3x3<f32>(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);let isOrtho=abs(projectionMatrix[3][3]-1.0)<0.001;var J: mat3x3<f32>;if (isOrtho) {J=mat3x3<f32>(
focal.x,0.0,0.0,
0.0,focal.y,0.0,
0.0,0.0,0.0
);} else {J=mat3x3<f32>(
focal.x/camspace.z,0.0,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.0,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.0,0.0,0.0
);}
let T=transpose(mat3x3<f32>(
modelView[0].xyz,
modelView[1].xyz,
modelView[2].xyz))*J;var cov2d=transpose(T)*Vrk*T;
#if COMPENSATION
let c00: f32=cov2d[0][0];let c11: f32=cov2d[1][1];let c01: f32=cov2d[0][1];let detOrig: f32=c00*c11-c01*c01;
#endif
cov2d[0][0]+=kernelSize;cov2d[1][1]+=kernelSize;
#if COMPENSATION
let c2d: vec3f=vec3f(cov2d[0][0],c01,cov2d[1][1]);let detBlur: f32=c2d.x*c2d.z-c2d.y*c2d.y;let compensation: f32=sqrt(max(0.,detOrig/detBlur));vertexOutputs.vColor.w*=compensation;
#endif
let mid=(cov2d[0][0]+cov2d[1][1])/2.0;let radius=length(vec2<f32>((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));let lambda1=mid+radius;let lambda2=mid-radius;if (lambda2<0.0) {return vec4f(0.0,0.0,2.0,1.0);}
if (minPixelSize>0.0) {let l1=2.0*min(sqrt(2.0*lambda1),1024.0);let l2=2.0*min(sqrt(2.0*lambda2),1024.0);if (max(l1,l2)<minPixelSize) {return vec4f(0.0,0.0,2.0,1.0);}}
let diagonalVector=normalize(vec2<f32>(cov2d[0][1],lambda1-cov2d[0][0]));let majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;let minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2<f32>(diagonalVector.y,-diagonalVector.x);let vCenter=vec2<f32>(pos2d.x,pos2d.y);let scaleFactor=select(pos2d.w,1.0,isOrtho);return vec4f(
vCenter+((meshPos.x*majorAxis+meshPos.y*minorAxis)*invViewport*scaleFactor)*scale,
pos2d.z,
pos2d.w
);}
#if IS_COMPOUND
fn getPartWorld(partIndex: u32)->mat4x4<f32> {return uniforms.partWorld[partIndex];}
#endif
#if defined(IS_FOR_VOXELIZATION)
fn computeVoxelSplatWorldPos(rotationA: vec4f,rotationB: vec4f,rotationScale: vec4f,center: vec3f,splatWorld: mat4x4f,viewMatrix: mat4x4f,invWorldScale: mat4x4f,quadPos: vec2f)->vec4f {let splatRotation=mat3x3f(
rotationA.xyz,
vec3f(rotationA.w,rotationB.x,rotationB.y),
vec3f(rotationB.z,rotationB.w,rotationScale.x)
);let splatScale=rotationScale.yzw;let view3x3=mat3x3f(viewMatrix[0].xyz,viewMatrix[1].xyz,viewMatrix[2].xyz);let invWorldScale3x3=mat3x3f(invWorldScale[0].xyz,invWorldScale[1].xyz,invWorldScale[2].xyz);let splatWorld3x3=mat3x3f(splatWorld[0].xyz,splatWorld[1].xyz,splatWorld[2].xyz);let rotToView=view3x3*invWorldScale3x3*splatWorld3x3*splatRotation;let axisLengthInViewZ=abs(vec3f(rotToView[0][2],rotToView[1][2],rotToView[2][2]));let gaussianSplatCutoffStddev: f32=0.7071067812; 
var offsetSplatSpace: vec3f;if (axisLengthInViewZ.x>axisLengthInViewZ.y && axisLengthInViewZ.x>axisLengthInViewZ.z) {offsetSplatSpace=vec3f(0.0,quadPos.x,quadPos.y)*splatScale*gaussianSplatCutoffStddev;} else if (axisLengthInViewZ.y>axisLengthInViewZ.z) {offsetSplatSpace=vec3f(quadPos.x,0.0,quadPos.y)*splatScale*gaussianSplatCutoffStddev;} else {offsetSplatSpace=vec3f(quadPos.x,quadPos.y,0.0)*splatScale*gaussianSplatCutoffStddev;}
let vertexObjectSpace=center+splatRotation*offsetSplatSpace;return splatWorld*vec4f(vertexObjectSpace,1.0);}
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},45682:(e,t,a)=>{a.d(t,{$:()=>f});var r=a(35614);let s="logDepthVertex",o=`#ifdef LOGARITHMICDEPTH
vertexOutputs.vFragmentDepth=1.0+vertexOutputs.position.w;vertexOutputs.position.z=log2(max(0.000001,vertexOutputs.vFragmentDepth))*uniforms.logarithmicDepthConstant;
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},48318:(e,t,a)=>{a.d(t,{Z:()=>f});var r=a(35614);let s="meshUboDeclaration",o=`struct Mesh {world : mat4x4<f32>,
visibility : f32,};var<uniform> mesh : Mesh;
#define WORLD_UBO
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},48815:(e,t,a)=>{a.d(t,{y:()=>f});var r=a(35614);let s="clipPlaneVertex",o=`#ifdef CLIPPLANE
vertexOutputs.fClipDistance=dot(worldPos,uniforms.vClipPlane);
#endif
#ifdef CLIPPLANE2
vertexOutputs.fClipDistance2=dot(worldPos,uniforms.vClipPlane2);
#endif
#ifdef CLIPPLANE3
vertexOutputs.fClipDistance3=dot(worldPos,uniforms.vClipPlane3);
#endif
#ifdef CLIPPLANE4
vertexOutputs.fClipDistance4=dot(worldPos,uniforms.vClipPlane4);
#endif
#ifdef CLIPPLANE5
vertexOutputs.fClipDistance5=dot(worldPos,uniforms.vClipPlane5);
#endif
#ifdef CLIPPLANE6
vertexOutputs.fClipDistance6=dot(worldPos,uniforms.vClipPlane6);
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},50064:(e,t,a)=>{a.d(t,{R:()=>f});var r=a(35614);let s="logDepthDeclaration",o=`#ifdef LOGARITHMICDEPTH
uniform logarithmicDepthConstant: f32;varying vFragmentDepth: f32;
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},51457:(e,t,a)=>{a.d(t,{c:()=>f});var r=a(35614);let s="clipPlaneVertexDeclaration",o=`#ifdef CLIPPLANE
uniform vClipPlane: vec4<f32>;varying fClipDistance: f32;
#endif
#ifdef CLIPPLANE2
uniform vClipPlane2: vec4<f32>;varying fClipDistance2: f32;
#endif
#ifdef CLIPPLANE3
uniform vClipPlane3: vec4<f32>;varying fClipDistance3: f32;
#endif
#ifdef CLIPPLANE4
uniform vClipPlane4: vec4<f32>;varying fClipDistance4: f32;
#endif
#ifdef CLIPPLANE5
uniform vClipPlane5: vec4<f32>;varying fClipDistance5: f32;
#endif
#ifdef CLIPPLANE6
uniform vClipPlane6: vec4<f32>;varying fClipDistance6: f32;
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},62275:(e,t,a)=>{a.d(t,{s:()=>f});var r=a(35614);let s="fogVertex",o=`#ifdef FOG
#ifdef SCENE_UBO
vertexOutputs.vFogDistance=(scene.view*worldPos).xyz;
#else
vertexOutputs.vFogDistance=(uniforms.view*worldPos).xyz;
#endif
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},77405:(e,t,a)=>{a.d(t,{S:()=>f});var r=a(35614);let s="fogVertexDeclaration",o=`#ifdef FOG
varying vFogDistance: vec3f;
#endif
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}},87427:(e,t,a)=>{a.r(t),a.d(t,{gaussianSplattingVertexShaderWGSL:()=>S});var r=a(35614),s=a(95433),o=a(48318),f=a(15640),l=a(51457),c=a(77405),i=a(50064),n=a(20196),d=a(48815),x=a(62275),v=a(45682);let p="gaussianSplattingVertexShader",u=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
#include<helperFunctions>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
attribute splatIndex0: vec4f;attribute splatIndex1: vec4f;attribute splatIndex2: vec4f;attribute splatIndex3: vec4f;attribute position: vec3f;uniform invViewport: vec2f;uniform dataTextureSize: vec2f;uniform focal: vec2f;uniform kernelSize: f32;uniform minPixelSize: f32;uniform eyePosition: vec3f;uniform alpha: f32;
#if IS_COMPOUND
uniform partWorld: array<mat4x4<f32>,MAX_PART_COUNT>;uniform partVisibility: array<f32,MAX_PART_COUNT>;
#endif
var covariancesATexture: texture_2d<f32>;var covariancesBTexture: texture_2d<f32>;var centersTexture: texture_2d<f32>;var colorsTexture: texture_2d<f32>;
#ifdef USE_SOG
var sogQuatsTexture: texture_2d<f32>;uniform sogMeansMin: vec3f;uniform sogMeansMax: vec3f;
#ifdef USE_SOG_V2
var sogCodebookTexture: texture_2d<f32>;
#else
uniform sogScalesMin: vec3f;uniform sogScalesMax: vec3f;uniform sogSh0Min: vec4f;uniform sogSh0Max: vec4f;uniform sogShnMin: f32;uniform sogShnMax: f32;
#endif
#if SH_DEGREE>0
var sogShNCentroidsTexture: texture_2d<f32>;var sogShNLabelsTexture: texture_2d<f32>;uniform sogShCoeffCount: f32;
#endif
#endif
#if SH_DEGREE>0 && !defined(USE_SOG)
var shTexture0: texture_2d<u32>;
#endif
#if SH_DEGREE>1 && !defined(USE_SOG)
var shTexture1: texture_2d<u32>;
#endif
#if SH_DEGREE>2 && !defined(USE_SOG)
var shTexture2: texture_2d<u32>;
#endif
#if SH_DEGREE>3 && !defined(USE_SOG)
var shTexture3: texture_2d<u32>;var shTexture4: texture_2d<u32>;
#endif
#if IS_COMPOUND
var partIndicesTexture: texture_2d<f32>;
#endif
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_VERTEX_DEFINITIONS
#include<gaussianSplatting>
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
let splatIndex: f32=getSplatIndex(i32(vertexInputs.position.z+0.5),vertexInputs.splatIndex0,vertexInputs.splatIndex1,vertexInputs.splatIndex2,vertexInputs.splatIndex3);var splat: Splat=readSplat(splatIndex,uniforms.dataTextureSize);var covA: vec3f=splat.covA.xyz;var covB: vec3f=vec3f(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
let splatWorld: mat4x4f=getPartWorld(splat.partIndex);
#else
let splatWorld: mat4x4f=mesh.world;
#endif
let worldPos: vec4f=splatWorld*vec4f(splat.center.xyz,1.0);vertexOutputs.vPosition=vertexInputs.position.xy;
#if SH_DEGREE>0
let worldRot: mat3x3f= mat3x3f(splatWorld[0].xyz,splatWorld[1].xyz,splatWorld[2].xyz);let normWorldRot: mat3x3f=inverseMat3(worldRot);var eyeToSplatLocalSpace: vec3f=normalize(normWorldRot*(worldPos.xyz-uniforms.eyePosition.xyz));
#if defined(GS_DBG_ENABLED) && IS_COMPOUND
{let _row3=textureLoad(dbgPartData,vec2i(i32(splat.partIndex),3),0);
#if SH_DEGREE>3
let _so4=textureLoad(dbgPartData,vec2i(i32(splat.partIndex),4),0).x;
#else
let _so4: f32=1.0;
#endif
vertexOutputs.vColor=vec4f(_row3.x*splat.color.xyz+computeSHWeighted(splat,eyeToSplatLocalSpace,_row3.y,_row3.z,_row3.w,_so4),splat.color.w*uniforms.alpha);}
#elif defined(GS_DBG_ENABLED) && GS_DBG_SH_DC==0
vertexOutputs.vColor=vec4f(computeSH(splat,eyeToSplatLocalSpace),splat.color.w*uniforms.alpha);
#else
vertexOutputs.vColor=vec4f(splat.color.xyz+computeSH(splat,eyeToSplatLocalSpace),splat.color.w*uniforms.alpha);
#endif
#else
#if defined(GS_DBG_ENABLED) && IS_COMPOUND
{let _shDc=textureLoad(dbgPartData,vec2i(i32(splat.partIndex),3),0).x;vertexOutputs.vColor=vec4f(_shDc*splat.color.xyz,splat.color.w*uniforms.alpha);}
#elif defined(GS_DBG_ENABLED) && GS_DBG_SH_DC==0
vertexOutputs.vColor=vec4f(0.0,0.0,0.0,splat.color.w*uniforms.alpha);
#else
vertexOutputs.vColor=vec4f(splat.color.xyz,splat.color.w*uniforms.alpha);
#endif
#endif
#if IS_COMPOUND
vertexOutputs.vColor.w*=uniforms.partVisibility[splat.partIndex];
#endif
var scale: vec2f=vec2f(1.,1.);
#define CUSTOM_VERTEX_UPDATE
vertexOutputs.position=gaussianSplatting(vertexInputs.position.xy,worldPos.xyz,scale,covA,covB,splatWorld,scene.view,scene.projection,uniforms.focal,uniforms.invViewport,uniforms.kernelSize,uniforms.minPixelSize);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;for(let e of(r.l.ShadersStoreWGSL[p]||(r.l.ShadersStoreWGSL[p]=u),[s.e,o.Z,f.f,l.c,c.S,i.R,n.t,d.y,x.s,v.$]))r.l.IncludesShadersStoreWGSL[e.name]||(r.l.IncludesShadersStoreWGSL[e.name]=e.shader);let S={name:p,shader:u}},95433:(e,t,a)=>{a.d(t,{e:()=>f});var r=a(35614);let s="sceneUboDeclaration",o=`struct Scene {viewProjection : mat4x4<f32>,
#ifdef MULTIVIEW
viewProjectionR : mat4x4<f32>,
#endif 
view : mat4x4<f32>,
projection : mat4x4<f32>,
vEyePosition : vec4<f32>,
inverseProjection : mat4x4<f32>,};
#define SCENE_UBO
var<uniform> scene : Scene;
`;r.l.IncludesShadersStoreWGSL[s]||(r.l.IncludesShadersStoreWGSL[s]=o);let f={name:s,shader:o}}}]);