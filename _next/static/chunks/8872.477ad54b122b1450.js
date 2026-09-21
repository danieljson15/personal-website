"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8872],{1463:(e,t,a)=>{a.d(t,{e:()=>s});var o=a(35614);let i="logDepthVertex",r=`#ifdef LOGARITHMICDEPTH
vFragmentDepth=1.0+gl_Position.w;gl_Position.z=log2(max(0.000001,vFragmentDepth))*logarithmicDepthConstant;
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},7839:(e,t,a)=>{a.d(t,{k:()=>s});var o=a(35614);let i="gaussianSplatting",r=`#if !defined(WEBGL2) && !defined(WEBGPU) && !defined(NATIVE)
mat3 transpose(mat3 matrix) {return mat3(matrix[0][0],matrix[1][0],matrix[2][0],
matrix[0][1],matrix[1][1],matrix[2][1],
matrix[0][2],matrix[1][2],matrix[2][2]);}
#endif
vec2 getDataUV(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return vec2((x+0.5)/textureSize.x,(y+0.5)/textureSize.y);}
#if SH_DEGREE>0 || IS_COMPOUND
ivec2 getDataUVint(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return ivec2(uint(x+0.5),uint(y+0.5));}
#endif
struct Splat {vec4 center;vec4 color;vec4 covA;vec4 covB;
#if SH_DEGREE>0
uvec4 sh0; 
#endif
#if SH_DEGREE>1
uvec4 sh1;
#endif
#if SH_DEGREE>2
uvec4 sh2;
#endif
#if SH_DEGREE>3
uvec4 sh3;uvec4 sh4;
#endif
#if IS_COMPOUND
uint partIndex;
#endif
#if defined(IS_FOR_VOXELIZATION)
vec4 rotationA;vec4 rotationB;vec4 rotationScale;
#endif
#ifdef USE_SOG
float splatIndex;
#endif
};float getSplatIndex(int localIndex)
{float splatIndex;switch (localIndex)
{case 0: splatIndex=splatIndex0.x; break;case 1: splatIndex=splatIndex0.y; break;case 2: splatIndex=splatIndex0.z; break;case 3: splatIndex=splatIndex0.w; break;case 4: splatIndex=splatIndex1.x; break;case 5: splatIndex=splatIndex1.y; break;case 6: splatIndex=splatIndex1.z; break;case 7: splatIndex=splatIndex1.w; break;case 8: splatIndex=splatIndex2.x; break;case 9: splatIndex=splatIndex2.y; break;case 10: splatIndex=splatIndex2.z; break;case 11: splatIndex=splatIndex2.w; break;case 12: splatIndex=splatIndex3.x; break;case 13: splatIndex=splatIndex3.y; break;case 14: splatIndex=splatIndex3.z; break;case 15: splatIndex=splatIndex3.w; break;}
return splatIndex;}
Splat readSplat(float splatIndex)
{Splat splat;vec2 splatUV=getDataUV(splatIndex,dataTextureSize);
#ifdef USE_SOG
ivec2 sogUVi=ivec2(int(splatUV.x*dataTextureSize.x),int(splatUV.y*dataTextureSize.y));vec4 mL=texelFetch(centersTexture,sogUVi,0); 
vec4 mU=texelFetch(covariancesATexture,sogUVi,0); 
vec4 sRaw=texelFetch(covariancesBTexture,sogUVi,0); 
vec4 qRaw=texelFetch(sogQuatsTexture,sogUVi,0); 
vec4 c0=texelFetch(colorsTexture,sogUVi,0); 
vec3 q16=(mU.xyz*256.0+mL.xyz)*(255.0/65535.0);vec3 nPos=mix(sogMeansMin,sogMeansMax,q16);vec3 center=sign(nPos)*(exp(abs(nPos))-vec3(1.0));splat.center=vec4(center,1.0);
#ifdef USE_SOG_V2
vec3 sIdx=floor(sRaw.xyz*255.0+0.5);vec3 splatScale;splatScale.x=exp(texelFetch(sogCodebookTexture,ivec2(int(sIdx.x),0),0).r);splatScale.y=exp(texelFetch(sogCodebookTexture,ivec2(int(sIdx.y),0),0).r);splatScale.z=exp(texelFetch(sogCodebookTexture,ivec2(int(sIdx.z),0),0).r);
#else
vec3 splatScale=exp(mix(sogScalesMin,sogScalesMax,sRaw.xyz));
#endif
const float invSqrt2=0.70710678118;vec3 qabc=(qRaw.xyz-vec3(0.5))*2.0*invSqrt2;int qMode=int(qRaw.w*255.0+0.5)-252;float qd=sqrt(max(0.0,1.0-dot(qabc,qabc)));vec4 quat;if (qMode==0) quat=vec4(qd,qabc.x,qabc.y,qabc.z);else if (qMode==1) quat=vec4(qabc.x,qd,qabc.y,qabc.z);else if (qMode==2) quat=vec4(qabc.x,qabc.y,qd,qabc.z);else quat=vec4(qabc.x,qabc.y,qabc.z,qd);float qw=quat.x,qx=quat.y,qy=quat.z,qz=quat.w;mat3 R=mat3(
1.0-2.0*(qy*qy+qz*qz),2.0*(qx*qy+qw*qz), 2.0*(qx*qz-qw*qy),
2.0*(qx*qy-qw*qz), 1.0-2.0*(qx*qx+qz*qz),2.0*(qy*qz+qw*qx),
2.0*(qx*qz+qw*qy), 2.0*(qy*qz-qw*qx), 1.0-2.0*(qx*qx+qy*qy)
);mat3 S2=mat3(4.0*splatScale.x*splatScale.x,0.0,0.0,
0.0,4.0*splatScale.y*splatScale.y,0.0,
0.0,0.0,4.0*splatScale.z*splatScale.z);mat3 Sigma=R*S2*transpose(R);splat.covA=vec4(Sigma[0][0],Sigma[0][1],Sigma[0][2],Sigma[1][1]);splat.covB=vec4(Sigma[1][2],Sigma[2][2],0.0,0.0);const float SH_C0=0.28209479177387814;
#ifdef USE_SOG_V2
vec3 c3;c3.x=texelFetch(sogCodebookTexture,ivec2(256+int(c0.x*255.0+0.5),0),0).r;c3.y=texelFetch(sogCodebookTexture,ivec2(256+int(c0.y*255.0+0.5),0),0).r;c3.z=texelFetch(sogCodebookTexture,ivec2(256+int(c0.z*255.0+0.5),0),0).r;vec3 colRgb=vec3(0.5)+c3*SH_C0;float colA=c0.w; 
#else
vec4 cLerp=mix(sogSh0Min,sogSh0Max,c0);vec3 colRgb=vec3(0.5)+cLerp.xyz*SH_C0;float colA=1.0/(1.0+exp(-cLerp.w));
#endif
splat.color=vec4(colRgb,colA);splat.splatIndex=splatIndex;
#else
splat.center=texture2D(centersTexture,splatUV);splat.color=texture2D(colorsTexture,splatUV);
#if !defined(IS_FOR_VOXELIZATION)
splat.covA=texture2D(covariancesATexture,splatUV)*splat.center.w;splat.covB=texture2D(covariancesBTexture,splatUV)*splat.center.w;
#endif
#endif
#if SH_DEGREE>0 || IS_COMPOUND
ivec2 splatUVint=getDataUVint(splatIndex,dataTextureSize);
#endif
#if SH_DEGREE>0 && !defined(USE_SOG)
splat.sh0=texelFetch(shTexture0,splatUVint,0);
#endif
#if SH_DEGREE>1 && !defined(USE_SOG)
splat.sh1=texelFetch(shTexture1,splatUVint,0);
#endif
#if SH_DEGREE>2 && !defined(USE_SOG)
splat.sh2=texelFetch(shTexture2,splatUVint,0);
#endif
#if SH_DEGREE>3 && !defined(USE_SOG)
splat.sh3=texelFetch(shTexture3,splatUVint,0);splat.sh4=texelFetch(shTexture4,splatUVint,0);
#endif
#if IS_COMPOUND
splat.partIndex=uint(texture2D(partIndicesTexture,splatUV).r*255.0+0.5);
#endif
#if defined(IS_FOR_VOXELIZATION)
splat.rotationA=texture2D(rotationsATexture,splatUV);splat.rotationB=texture2D(rotationsBTexture,splatUV);splat.rotationScale=texture2D(rotationScaleTexture,splatUV);
#endif
return splat;}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
vec3 computeColorFromSHDegree(vec3 dir,const vec3 sh[25],float _so1,float _so2,float _so3,float _so4)
{const float SH_C0=0.28209479;const float SH_C1=0.48860251;float SH_C2[5];SH_C2[0]=1.092548430;SH_C2[1]=-1.09254843;SH_C2[2]=0.315391565;SH_C2[3]=-1.09254843;SH_C2[4]=0.546274215;float SH_C3[7];SH_C3[0]=-0.59004358;SH_C3[1]=2.890611442;SH_C3[2]=-0.45704579;SH_C3[3]=0.373176332;SH_C3[4]=-0.45704579;SH_C3[5]=1.445305721;SH_C3[6]=-0.59004358;float SH_C4[9];SH_C4[0]= 2.5033429418;SH_C4[1]=-1.7701307698;SH_C4[2]= 0.9461746958;SH_C4[3]=-0.6690465436;SH_C4[4]= 0.1057855469;SH_C4[5]=-0.6690465436;SH_C4[6]= 0.4730873479;SH_C4[7]=-1.7701307698;SH_C4[8]= 0.6258357354;vec3 result=/*SH_C0**/sh[0];
#if SH_DEGREE>0
float x=dir.x;float y=dir.y;float z=dir.z;result+=_so1*(- SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3]);
#if SH_DEGREE>1
float xx=x*x,yy=y*y,zz=z*z;float xy=x*y,yz=y*z,xz=x*z;result+=_so2*(
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8]);
#if SH_DEGREE>2
result+=_so3*(
SH_C3[0]*y*(3.0*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0*zz-3.0*xx-3.0*yy)*sh[12] +
SH_C3[4]*x*(4.0*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0*yy)*sh[15]);
#if SH_DEGREE>3
result+=_so4*(
SH_C4[0]*x*y*(xx-yy)*sh[16] +
SH_C4[1]*y*z*(3.0*xx-yy)*sh[17] +
SH_C4[2]*x*y*(7.0*zz-1.0)*sh[18] +
SH_C4[3]*y*z*(7.0*zz-3.0)*sh[19] +
SH_C4[4]*(zz*(35.0*zz-30.0)+3.0)*sh[20] +
SH_C4[5]*x*z*(7.0*zz-3.0)*sh[21] +
SH_C4[6]*(xx-yy)*(7.0*zz-1.0)*sh[22] +
SH_C4[7]*x*z*(xx-3.0*yy)*sh[23] +
SH_C4[8]*(xx*(xx-3.0*yy)-yy*(3.0*xx-yy))*sh[24]);
#endif
#endif
#endif
#endif
return result;}
vec4 decompose(uint value)
{vec4 components=vec4(
float((value ) & 255u),
float((value>>uint( 8)) & 255u),
float((value>>uint(16)) & 255u),
float((value>>uint(24)) & 255u));return components*vec4(2./255.)-vec4(1.);}
#ifdef USE_SOG
vec3 computeSH(Splat splat,vec3 dir)
{
#if SH_DEGREE>0
vec3 sh[25];sh[0]=vec3(0.,0.,0.);ivec2 labelSize=textureSize(sogShNLabelsTexture,0);int idx=int(splat.splatIndex+0.5);int lx=idx-(idx/labelSize.x)*labelSize.x;int ly=idx/labelSize.x;vec4 labelRaw=texelFetch(sogShNLabelsTexture,ivec2(lx,ly),0);int n=int(labelRaw.r*255.0+0.5)+int(labelRaw.g*255.0+0.5)*256;int coeffs=int(sogShCoeffCount+0.5);int u=(n-(n/64)*64)*coeffs;int v=n/64;for (int k=0; k<24; k++) {if (k>=coeffs) break;vec4 centroidRaw=texelFetch(sogShNCentroidsTexture,ivec2(u+k,v),0);vec3 shCoeff;
#ifdef USE_SOG_V2
int rIdx=int(centroidRaw.r*255.0+0.5);int gIdx=int(centroidRaw.g*255.0+0.5);int bIdx=int(centroidRaw.b*255.0+0.5);shCoeff.r=texelFetch(sogCodebookTexture,ivec2(512+rIdx,0),0).r;shCoeff.g=texelFetch(sogCodebookTexture,ivec2(512+gIdx,0),0).r;shCoeff.b=texelFetch(sogCodebookTexture,ivec2(512+bIdx,0),0).r;
#else
shCoeff=mix(vec3(sogShnMin),vec3(sogShnMax),centroidRaw.rgb);
#endif
sh[k+1]=shCoeff;}
return computeColorFromSHDegree(dir,sh,1.,1.,1.,1.);
#else
return vec3(0.,0.,0.);
#endif
}
#else
vec3 computeSHWeighted(Splat splat,vec3 dir,float _so1,float _so2,float _so3,float _so4)
{vec3 sh[25];sh[0]=vec3(0.,0.,0.);
#if SH_DEGREE>0
vec4 sh00=decompose(splat.sh0.x);vec4 sh01=decompose(splat.sh0.y);vec4 sh02=decompose(splat.sh0.z);sh[1]=vec3(sh00.x,sh00.y,sh00.z);sh[2]=vec3(sh00.w,sh01.x,sh01.y);sh[3]=vec3(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
vec4 sh03=decompose(splat.sh0.w);vec4 sh04=decompose(splat.sh1.x);vec4 sh05=decompose(splat.sh1.y);sh[4]=vec3(sh02.y,sh02.z,sh02.w);sh[5]=vec3(sh03.x,sh03.y,sh03.z);sh[6]=vec3(sh03.w,sh04.x,sh04.y);sh[7]=vec3(sh04.z,sh04.w,sh05.x);sh[8]=vec3(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
vec4 sh06=decompose(splat.sh1.z);vec4 sh07=decompose(splat.sh1.w);vec4 sh08=decompose(splat.sh2.x);vec4 sh09=decompose(splat.sh2.y);vec4 sh10=decompose(splat.sh2.z);vec4 sh11=decompose(splat.sh2.w);sh[9]=vec3(sh06.x,sh06.y,sh06.z);sh[10]=vec3(sh06.w,sh07.x,sh07.y);sh[11]=vec3(sh07.z,sh07.w,sh08.x);sh[12]=vec3(sh08.y,sh08.z,sh08.w);sh[13]=vec3(sh09.x,sh09.y,sh09.z);sh[14]=vec3(sh09.w,sh10.x,sh10.y);sh[15]=vec3(sh10.z,sh10.w,sh11.x);
#endif
#if SH_DEGREE>3
vec4 sh12=decompose(splat.sh3.x);vec4 sh13=decompose(splat.sh3.y);vec4 sh14=decompose(splat.sh3.z);vec4 sh15=decompose(splat.sh3.w);vec4 sh16=decompose(splat.sh4.x);vec4 sh17=decompose(splat.sh4.y);sh[16]=vec3(sh11.y,sh11.z,sh11.w);sh[17]=vec3(sh12.x,sh12.y,sh12.z);sh[18]=vec3(sh12.w,sh13.x,sh13.y);sh[19]=vec3(sh13.z,sh13.w,sh14.x);sh[20]=vec3(sh14.y,sh14.z,sh14.w);sh[21]=vec3(sh15.x,sh15.y,sh15.z);sh[22]=vec3(sh15.w,sh16.x,sh16.y);sh[23]=vec3(sh16.z,sh16.w,sh17.x);sh[24]=vec3(sh17.y,sh17.z,sh17.w);
#endif
return computeColorFromSHDegree(dir,sh,_so1,_so2,_so3,_so4);}
vec3 computeSH(Splat splat,vec3 dir)
{
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER1==1
float _w1=1.0;
#else
float _w1=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER2==1
float _w2=1.0;
#else
float _w2=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER3==1
float _w3=1.0;
#else
float _w3=0.0;
#endif
#if !defined(GS_DBG_ENABLED) || GS_DBG_SH_ORDER4==1
float _w4=1.0;
#else
float _w4=0.0;
#endif
return computeSHWeighted(splat,dir,_w1,_w2,_w3,_w4);}
#endif
#else
vec3 computeSH(Splat splat,vec3 dir)
{return vec3(0.,0.,0.);}
#endif
#if !defined(IS_FOR_VOXELIZATION)
vec4 gaussianSplatting(vec2 meshPos,vec3 worldPos,vec2 scale,vec3 covA,vec3 covB,mat4 worldMatrix,mat4 viewMatrix,mat4 projectionMatrix)
{mat4 modelView=viewMatrix*worldMatrix;vec4 camspace=viewMatrix*vec4(worldPos,1.);vec4 pos2d=projectionMatrix*camspace;float bounds=1.2*pos2d.w;if (pos2d.z<-pos2d.w || pos2d.x<-bounds || pos2d.x>bounds
|| pos2d.y<-bounds || pos2d.y>bounds) {return vec4(0.0,0.0,2.0,1.0);}
mat3 Vrk=mat3(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);bool isOrtho=abs(projectionMatrix[3][3]-1.0)<0.001;mat3 J;if (isOrtho) {J=mat3(
focal.x,0.,0.,
0.,focal.y,0.,
0.,0.,0.
);} else {J=mat3(
focal.x/camspace.z,0.,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.,0.,0.
);}
mat3 T=transpose(mat3(modelView))*J;mat3 cov2d=transpose(T)*Vrk*T;
#if COMPENSATION
float c00=cov2d[0][0];float c11=cov2d[1][1];float c01=cov2d[0][1];float detOrig=c00*c11-c01*c01;
#endif
cov2d[0][0]+=kernelSize;cov2d[1][1]+=kernelSize;
#if COMPENSATION
vec3 c2d=vec3(cov2d[0][0],c01,cov2d[1][1]);float detBlur=c2d.x*c2d.z-c2d.y*c2d.y;float compensation=sqrt(max(0.,detOrig/detBlur));vColor.w*=compensation;
#endif
float mid=(cov2d[0][0]+cov2d[1][1])/2.0;float radius=length(vec2((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));float epsilon=0.0001;float lambda1=mid+radius+epsilon,lambda2=mid-radius+epsilon;if (lambda2<0.0)
{return vec4(0.0,0.0,2.0,1.0);}
if (minPixelSize>0.0) {float l1=2.0*min(sqrt(2.0*lambda1),1024.0);float l2=2.0*min(sqrt(2.0*lambda2),1024.0);if (max(l1,l2)<minPixelSize) {return vec4(0.0,0.0,2.0,1.0);}}
vec2 diagonalVector=normalize(vec2(cov2d[0][1],lambda1-cov2d[0][0]));vec2 majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;vec2 minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2(diagonalVector.y,-diagonalVector.x);vec2 vCenter=vec2(pos2d);float scaleFactor=isOrtho ? 1.0 : pos2d.w;return vec4(
vCenter 
+ ((meshPos.x*majorAxis
+ meshPos.y*minorAxis)*invViewport*scaleFactor)*scale,pos2d.zw);}
#endif
#if IS_COMPOUND
mat4 getPartWorld(uint partIndex) {return partWorld[partIndex];}
#endif
#if defined(IS_FOR_VOXELIZATION)
vec4 computeVoxelSplatWorldPos(vec4 rotationA,vec4 rotationB,vec4 rotationScale,vec3 center,mat4 splatWorld,mat4 viewMatrix,mat4 invWorldScale,vec2 quadPos) {mat3 splatRotation=mat3(
vec3(rotationA.x,rotationA.y,rotationA.z),
vec3(rotationA.w,rotationB.x,rotationB.y),
vec3(rotationB.z,rotationB.w,rotationScale.x)
);vec3 splatScale=vec3(rotationScale.y,rotationScale.z,rotationScale.w);mat3 rotToView=mat3(viewMatrix)*mat3(invWorldScale)*mat3(splatWorld)*splatRotation;vec3 axisLengthInViewZ=abs(vec3(rotToView[0][2],rotToView[1][2],rotToView[2][2]));float gaussianSplatCutoffStddev=1.4142135624/2.0; 
vec3 offsetSplatSpace;if (axisLengthInViewZ.x>axisLengthInViewZ.y && axisLengthInViewZ.x>axisLengthInViewZ.z) {offsetSplatSpace=vec3(0.0,quadPos.x,quadPos.y)*splatScale*gaussianSplatCutoffStddev;} else if (axisLengthInViewZ.y>axisLengthInViewZ.z) {offsetSplatSpace=vec3(quadPos.x,0.0,quadPos.y)*splatScale*gaussianSplatCutoffStddev;} else {offsetSplatSpace=vec3(quadPos.x,quadPos.y,0.0)*splatScale*gaussianSplatCutoffStddev;}
vec3 vertexObjectSpace=center+splatRotation*offsetSplatSpace;return splatWorld*vec4(vertexObjectSpace,1.0);}
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},9843:(e,t,a)=>{a.d(t,{Q:()=>s});var o=a(35614);let i="gaussianSplattingVertexDeclaration",r="attribute vec3 position;attribute vec4 splatIndex0;attribute vec4 splatIndex1;attribute vec4 splatIndex2;attribute vec4 splatIndex3;uniform mat4 view;uniform mat4 projection;uniform mat4 world;uniform vec4 vEyePosition;";o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},16088:(e,t,a)=>{a.d(t,{F:()=>s});var o=a(35614);let i="clipPlaneVertex",r=`#ifdef CLIPPLANE
fClipDistance=dot(worldPos,vClipPlane);
#endif
#ifdef CLIPPLANE2
fClipDistance2=dot(worldPos,vClipPlane2);
#endif
#ifdef CLIPPLANE3
fClipDistance3=dot(worldPos,vClipPlane3);
#endif
#ifdef CLIPPLANE4
fClipDistance4=dot(worldPos,vClipPlane4);
#endif
#ifdef CLIPPLANE5
fClipDistance5=dot(worldPos,vClipPlane5);
#endif
#ifdef CLIPPLANE6
fClipDistance6=dot(worldPos,vClipPlane6);
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},22391:(e,t,a)=>{a.d(t,{_:()=>s});var o=a(35614);let i="logDepthDeclaration",r=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},24755:(e,t,a)=>{a.d(t,{q:()=>s});var o=a(35614);let i="helperFunctions",r=`const float PI=3.1415926535897932384626433832795;const float TWO_PI=6.283185307179586;const float HALF_PI=1.5707963267948966;const float RECIPROCAL_PI=0.3183098861837907;const float RECIPROCAL_PI2=0.15915494309189535;const float RECIPROCAL_PI4=0.07957747154594767;const float HALF_MIN=5.96046448e-08; 
const float LinearEncodePowerApprox=2.2;const float GammaEncodePowerApprox=1.0/LinearEncodePowerApprox;const vec3 LuminanceEncodeApprox=vec3(0.2126,0.7152,0.0722);const float Epsilon=0.0000001;
#define saturate(x) clamp(x,0.0,1.0)
#define absEps(x) abs(x)+Epsilon
#define maxEps(x) max(x,Epsilon)
#define saturateEps(x) clamp(x,Epsilon,1.0)
mat3 transposeMat3(mat3 inMatrix) {vec3 i0=inMatrix[0];vec3 i1=inMatrix[1];vec3 i2=inMatrix[2];mat3 outMatrix=mat3(
vec3(i0.x,i1.x,i2.x),
vec3(i0.y,i1.y,i2.y),
vec3(i0.z,i1.z,i2.z)
);return outMatrix;}
mat3 inverseMat3(mat3 inMatrix) {float a00=inMatrix[0][0],a01=inMatrix[0][1],a02=inMatrix[0][2];float a10=inMatrix[1][0],a11=inMatrix[1][1],a12=inMatrix[1][2];float a20=inMatrix[2][0],a21=inMatrix[2][1],a22=inMatrix[2][2];float b01=a22*a11-a12*a21;float b11=-a22*a10+a12*a20;float b21=a21*a10-a11*a20;float det=a00*b01+a01*b11+a02*b21;return mat3(b01,(-a22*a01+a02*a21),(a12*a01-a02*a11),
b11,(a22*a00-a02*a20),(-a12*a00+a02*a10),
b21,(-a21*a00+a01*a20),(a11*a00-a01*a10))/det;}
#if USE_EXACT_SRGB_CONVERSIONS
vec3 toLinearSpaceExact(vec3 color)
{vec3 nearZeroSection=0.0773993808*color;vec3 remainingSection=pow(0.947867299*(color+vec3(0.055)),vec3(2.4));
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.04045)));
#else
return
vec3(
color.r<=0.04045 ? nearZeroSection.r : remainingSection.r,
color.g<=0.04045 ? nearZeroSection.g : remainingSection.g,
color.b<=0.04045 ? nearZeroSection.b : remainingSection.b);
#endif
}
vec3 toGammaSpaceExact(vec3 color)
{vec3 nearZeroSection=12.92*color;vec3 remainingSection=1.055*pow(color,vec3(0.41666))-vec3(0.055);
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
return mix(remainingSection,nearZeroSection,lessThanEqual(color,vec3(0.0031308)));
#else
return
vec3(
color.r<=0.0031308 ? nearZeroSection.r : remainingSection.r,
color.g<=0.0031308 ? nearZeroSection.g : remainingSection.g,
color.b<=0.0031308 ? nearZeroSection.b : remainingSection.b);
#endif
}
#endif
float toLinearSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=0.0773993808*color;float remainingSection=pow(0.947867299*(color+0.055),2.4);return color<=0.04045 ? nearZeroSection : remainingSection;
#else
return pow(color,LinearEncodePowerApprox);
#endif
}
vec3 toLinearSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toLinearSpaceExact(color);
#else
return pow(color,vec3(LinearEncodePowerApprox));
#endif
}
vec4 toLinearSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toLinearSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(LinearEncodePowerApprox)),color.a);
#endif
}
float toGammaSpace(float color)
{
#if USE_EXACT_SRGB_CONVERSIONS
float nearZeroSection=12.92*color;float remainingSection=1.055*pow(color,0.41666)-0.055;return color<=0.0031308 ? nearZeroSection : remainingSection;
#else
return pow(color,GammaEncodePowerApprox);
#endif
}
vec3 toGammaSpace(vec3 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return toGammaSpaceExact(color);
#else
return pow(color,vec3(GammaEncodePowerApprox));
#endif
}
vec4 toGammaSpace(vec4 color)
{
#if USE_EXACT_SRGB_CONVERSIONS
return vec4(toGammaSpaceExact(color.rgb),color.a);
#else
return vec4(pow(color.rgb,vec3(GammaEncodePowerApprox)),color.a);
#endif
}
float square(float value)
{return value*value;}
vec3 square(vec3 value)
{return value*value;}
float pow5(float value) {float sq=value*value;return sq*sq*value;}
vec3 double_refract(vec3 I,vec3 N,float eta) {vec3 Tfront=refract(I,N,1.0/eta);vec3 Nback=normalize(reflect(N,Tfront));return refract(Tfront,-Nback,eta);}
float getLuminanceUnclamped(vec3 color)
{return dot(color,LuminanceEncodeApprox);}
float getLuminance(vec3 color)
{return saturate(getLuminanceUnclamped(color));}
float getRand(vec2 seed) {return fract(sin(dot(seed.xy ,vec2(12.9898,78.233)))*43758.5453);}
float dither(vec2 seed,float varianceAmount) {float rand=getRand(seed);float normVariance=varianceAmount/255.0;float dither=mix(-normVariance,normVariance,rand);return dither;}
const float rgbdMaxRange=255.;vec4 toRGBD(vec3 color) {float maxRGB=maxEps(max(color.r,max(color.g,color.b)));float D =max(rgbdMaxRange/maxRGB,1.);D =saturate(floor(D)/255.);vec3 rgb=color.rgb*D;rgb=toGammaSpace(rgb);return vec4(saturate(rgb),D);}
vec3 fromRGBD(vec4 rgbd) {rgbd.rgb=toLinearSpace(rgbd.rgb);return rgbd.rgb/rgbd.a;}
vec3 parallaxCorrectNormal( vec3 vertexPos,vec3 origVec,vec3 cubeSize,vec3 cubePos ) {vec3 invOrigVec=vec3(1.)/origVec;vec3 halfSize=cubeSize*0.5;vec3 intersecAtMaxPlane=(cubePos+halfSize-vertexPos)*invOrigVec;vec3 intersecAtMinPlane=(cubePos-halfSize-vertexPos)*invOrigVec;vec3 largestIntersec=max(intersecAtMaxPlane,intersecAtMinPlane);float distance=min(min(largestIntersec.x,largestIntersec.y),largestIntersec.z);vec3 intersectPositionWS=vertexPos+origVec*distance;return intersectPositionWS-cubePos;}
vec3 equirectangularToCubemapDirection(vec2 uv) {float longitude=uv.x*TWO_PI-PI;float latitude=HALF_PI-uv.y*PI;vec3 direction;direction.x=cos(latitude)*sin(longitude);direction.y=sin(latitude);direction.z=cos(latitude)*cos(longitude);return direction;}
float sqrtClamped(float value) {return sqrt(max(value,0.));}
float avg(vec3 value) {return dot(value,vec3(0.333333333));}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
precision highp int;uint extractBits(uint value,int offset,int width) {return (value>>offset) & ((1u<<width)-1u);}
int onlyBitPosition(uint value) {return (floatBitsToInt(float(value))>>23)-0x7f;}
vec3 singleScatterToMultiScatterAlbedo(vec3 rho_ss) {vec3 s=sqrt(max(vec3(1.0)-rho_ss,vec3(0.0)));return (vec3(1.0)-s)*(vec3(1.0)-vec3(0.139)*s)/(vec3(1.0)+vec3(1.17)*s);}
vec3 multiScatterToSingleScatterAlbedo(vec3 rho_ms) {vec3 s=4.09712+4.20863*rho_ms-sqrt(9.59217+41.6808*rho_ms+17.7126*rho_ms*rho_ms);return 1.0-s*s;}
vec3 multiScatterToSingleScatterAlbedo(vec3 rho_ms,float aniso) {vec3 s=4.09712+4.20863*rho_ms-sqrt(9.59217+41.6808*rho_ms+17.7126*rho_ms*rho_ms);return (1.0-s*s)/maxEps(1.0-aniso*s*s);}
float min3(vec3 v) {return min(v.x,min(v.y,v.z));}
float max3(vec3 v) {return max(v.x,max(v.y,v.z));}
float uint2float(uint i) {return uintBitsToFloat(0x3F800000u | (i>>9u))-1.0;}
vec2 plasticSequence(const uint rstate) {return vec2(uint2float(rstate*3242174889u),
uint2float(rstate*2447445414u));}
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},28674:(e,t,a)=>{a.d(t,{f:()=>s});var o=a(35614);let i="sceneUboDeclaration",r=`layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;mat4 inverseProjection;};
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},28872:(e,t,a)=>{a.r(t),a.d(t,{gaussianSplattingVertexShader:()=>m});var o=a(35614),i=a(9843),r=a(28674),s=a(56503),c=a(82535),n=a(87456),l=a(52120),d=a(22391),f=a(24755),v=a(7839),x=a(16088),S=a(35616),p=a(1463);let u="gaussianSplattingVertexShader",h=`#include<__decl__gaussianSplattingVertex>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
uniform vec2 invViewport;uniform vec2 dataTextureSize;uniform vec2 focal;uniform float kernelSize;uniform float minPixelSize;uniform vec3 eyePosition;uniform float alpha;
#if IS_COMPOUND
uniform mat4 partWorld[MAX_PART_COUNT];uniform float partVisibility[MAX_PART_COUNT];
#endif
uniform sampler2D covariancesATexture;uniform sampler2D covariancesBTexture;uniform sampler2D centersTexture;uniform sampler2D colorsTexture;
#ifdef USE_SOG
uniform sampler2D sogQuatsTexture;uniform vec3 sogMeansMin;uniform vec3 sogMeansMax;
#ifdef USE_SOG_V2
uniform sampler2D sogCodebookTexture; 
#else
uniform vec3 sogScalesMin;uniform vec3 sogScalesMax;uniform vec4 sogSh0Min;uniform vec4 sogSh0Max;uniform float sogShnMin;uniform float sogShnMax;
#endif
#if SH_DEGREE>0
uniform sampler2D sogShNCentroidsTexture;uniform sampler2D sogShNLabelsTexture;uniform float sogShCoeffCount;
#endif
#endif
#if SH_DEGREE>0 && !defined(USE_SOG)
uniform highp usampler2D shTexture0;
#endif
#if SH_DEGREE>1 && !defined(USE_SOG)
uniform highp usampler2D shTexture1;
#endif
#if SH_DEGREE>2 && !defined(USE_SOG)
uniform highp usampler2D shTexture2;
#endif
#if SH_DEGREE>3 && !defined(USE_SOG)
uniform highp usampler2D shTexture3;uniform highp usampler2D shTexture4;
#endif
#if IS_COMPOUND
uniform sampler2D partIndicesTexture;
#endif
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_VERTEX_DEFINITIONS
#include<gaussianSplatting>
void main () {
#define CUSTOM_VERTEX_MAIN_BEGIN
float splatIndex=getSplatIndex(int(position.z+0.5));Splat splat=readSplat(splatIndex);vec3 covA=splat.covA.xyz;vec3 covB=vec3(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
mat4 splatWorld=getPartWorld(splat.partIndex);
#else
mat4 splatWorld=world;
#endif
vec4 worldPos=splatWorld*vec4(splat.center.xyz,1.0);vColor=splat.color;vPosition=position.xy;
#if SH_DEGREE>0
mat3 worldRot=mat3(splatWorld);mat3 normWorldRot=inverseMat3(worldRot);vec3 eyeToSplatLocalSpace=normalize(normWorldRot*(worldPos.xyz-eyePosition));
#if defined(GS_DBG_ENABLED) && IS_COMPOUND
{vec4 _row3=texelFetch(dbgPartData,ivec2(int(splat.partIndex),3),0);
#if SH_DEGREE>3
float _so4=texelFetch(dbgPartData,ivec2(int(splat.partIndex),4),0).x;
#else
float _so4=1.0;
#endif
vColor.xyz=_row3.x*splat.color.xyz+computeSHWeighted(splat,eyeToSplatLocalSpace,_row3.y,_row3.z,_row3.w,_so4);}
#elif defined(GS_DBG_ENABLED) && GS_DBG_SH_DC==0
vColor.xyz=computeSH(splat,eyeToSplatLocalSpace);
#else
vColor.xyz=splat.color.xyz+computeSH(splat,eyeToSplatLocalSpace);
#endif
#else
#if defined(GS_DBG_ENABLED) && IS_COMPOUND
{float _shDc=texelFetch(dbgPartData,ivec2(int(splat.partIndex),3),0).x;vColor.xyz=_shDc*splat.color.xyz;}
#elif defined(GS_DBG_ENABLED) && GS_DBG_SH_DC==0
vColor.xyz=vec3(0.0);
#endif
#endif
vColor.w*=alpha;
#if IS_COMPOUND
vColor.w*=partVisibility[splat.partIndex];
#endif
vec2 scale=vec2(1.,1.);
#define CUSTOM_VERTEX_UPDATE
gl_Position=gaussianSplatting(position.xy,worldPos.xyz,scale,covA,covB,splatWorld,view,projection);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;for(let e of(o.l.ShadersStore[u]||(o.l.ShadersStore[u]=h),[i.Q,r.f,s.q,c.c,n.T,l.d,d._,f.q,v.k,x.F,S.$,p.e]))o.l.IncludesShadersStore[e.name]||(o.l.IncludesShadersStore[e.name]=e.shader);let m={name:u,shader:h}},35616:(e,t,a)=>{a.d(t,{$:()=>s});var o=a(35614);let i="fogVertex",r=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},52120:(e,t,a)=>{a.d(t,{d:()=>s});var o=a(35614);let i="fogVertexDeclaration",r=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},56503:(e,t,a)=>{a.d(t,{q:()=>s});var o=a(35614);let i="meshUboDeclaration",r=`#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},82535:(e,t,a)=>{a.d(t,{c:()=>s});var o=a(35614);a(28674),a(56503);let i="gaussianSplattingUboDeclaration",r=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute vec3 position;attribute vec4 splatIndex0;attribute vec4 splatIndex1;attribute vec4 splatIndex2;attribute vec4 splatIndex3;
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}},87456:(e,t,a)=>{a.d(t,{T:()=>s});var o=a(35614);let i="clipPlaneVertexDeclaration",r=`#ifdef CLIPPLANE
uniform vec4 vClipPlane;varying float fClipDistance;
#endif
#ifdef CLIPPLANE2
uniform vec4 vClipPlane2;varying float fClipDistance2;
#endif
#ifdef CLIPPLANE3
uniform vec4 vClipPlane3;varying float fClipDistance3;
#endif
#ifdef CLIPPLANE4
uniform vec4 vClipPlane4;varying float fClipDistance4;
#endif
#ifdef CLIPPLANE5
uniform vec4 vClipPlane5;varying float fClipDistance5;
#endif
#ifdef CLIPPLANE6
uniform vec4 vClipPlane6;varying float fClipDistance6;
#endif
`;o.l.IncludesShadersStore[i]||(o.l.IncludesShadersStore[i]=r);let s={name:i,shader:r}}}]);