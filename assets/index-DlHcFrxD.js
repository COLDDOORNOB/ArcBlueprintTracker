(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function Ef(n,e){n.indexOf(e)===-1&&n.push(e)}const Zl=(n,e,t)=>Math.min(Math.max(t,n),e),Le={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},gr=n=>typeof n=="number",pn=n=>Array.isArray(n)&&!gr(n[0]),If=(n,e,t)=>{const r=e-n;return((t-n)%r+r)%r+n};function Tf(n,e){return pn(n)?n[If(0,n.length,e)]:n}const eu=(n,e,t)=>-t*n+t*e+n,tu=()=>{},vt=n=>n,So=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function nu(n,e){const t=n[n.length-1];for(let r=1;r<=e;r++){const s=So(0,e,r);n.push(eu(t,1,s))}}function vf(n){const e=[0];return nu(e,n-1),e}function wf(n,e=vf(n.length),t=vt){const r=n.length,s=r-e.length;return s>0&&nu(e,s),i=>{let a=0;for(;a<r-2&&!(i<e[a+1]);a++);let l=Zl(0,1,So(e[a],e[a+1],i));return l=Tf(t,a)(l),eu(n[a],n[a+1],l)}}const ru=n=>Array.isArray(n)&&gr(n[0]),Gi=n=>typeof n=="object"&&!!n.createAnimation,In=n=>typeof n=="function",Af=n=>typeof n=="string",cr={ms:n=>n*1e3,s:n=>n/1e3},su=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,bf=1e-7,Sf=12;function Cf(n,e,t,r,s){let i,a,l=0;do a=e+(t-e)/2,i=su(a,r,s)-n,i>0?t=a:e=a;while(Math.abs(i)>bf&&++l<Sf);return a}function nr(n,e,t,r){if(n===e&&t===r)return vt;const s=i=>Cf(i,0,1,n,t);return i=>i===0||i===1?i:su(s(i),e,r)}const Rf=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const r=t*n,s=e==="end"?Math.floor(r):Math.ceil(r);return Zl(0,1,s/n)},Pf={ease:nr(.25,.1,.25,1),"ease-in":nr(.42,0,1,1),"ease-in-out":nr(.42,0,.58,1),"ease-out":nr(0,0,.58,1)},kf=/\((.*?)\)/;function Ki(n){if(In(n))return n;if(ru(n))return nr(...n);const e=Pf[n];if(e)return e;if(n.startsWith("steps")){const t=kf.exec(n);if(t){const r=t[1].split(",");return Rf(parseFloat(r[0]),r[1].trim())}}return vt}class iu{constructor(e,t=[0,1],{easing:r,duration:s=Le.duration,delay:i=Le.delay,endDelay:a=Le.endDelay,repeat:l=Le.repeat,offset:u,direction:d="normal",autoplay:m=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=vt,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((T,C)=>{this.resolve=T,this.reject=C}),r=r||Le.easing,Gi(r)){const T=r.createAnimation(t);r=T.easing,t=T.keyframes||t,s=T.duration||s}this.repeat=l,this.easing=pn(r)?vt:Ki(r),this.updateDuration(s);const _=wf(t,u,pn(r)?r.map(Ki):vt);this.tick=T=>{var C;i=i;let D=0;this.pauseTime!==void 0?D=this.pauseTime:D=(T-this.startTime)*this.rate,this.t=D,D/=1e3,D=Math.max(D-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(D=this.totalDuration);const P=D/this.duration;let V=Math.floor(P),F=P%1;!F&&P>=1&&(F=1),F===1&&V--;const j=V%2;(d==="reverse"||d==="alternate"&&j||d==="alternate-reverse"&&!j)&&(F=1-F);const B=D>=this.totalDuration?1:Math.min(F,1),N=_(this.easing(B));e(N),this.pauseTime===void 0&&(this.playState==="finished"||D>=this.totalDuration+a)?(this.playState="finished",(C=this.resolve)===null||C===void 0||C.call(this,N)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},m&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Vf{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Vi=new WeakMap;function ou(n){return Vi.has(n)||Vi.set(n,{transforms:[],values:new Map}),Vi.get(n)}function Nf(n,e){return n.has(e)||n.set(e,new Vf),n.get(e)}const Df=["","X","Y","Z"],Lf=["translate","scale","rotate","skew"],gs={x:"translateX",y:"translateY",z:"translateZ"},Ic={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},Mf={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:Ic,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:vt},skew:Ic},_r=new Map,Co=n=>`--motion-${n}`,_s=["x","y","z"];Lf.forEach(n=>{Df.forEach(e=>{_s.push(n+e),_r.set(Co(n+e),Mf[n])})});const Of=(n,e)=>_s.indexOf(n)-_s.indexOf(e),xf=new Set(_s),au=n=>xf.has(n),Ff=(n,e)=>{gs[e]&&(e=gs[e]);const{transforms:t}=ou(n);Ef(t,e),n.style.transform=Uf(t)},Uf=n=>n.sort(Of).reduce(Bf,"").trim(),Bf=(n,e)=>`${n} ${e}(var(${Co(e)}))`,Qi=n=>n.startsWith("--"),Tc=new Set;function jf(n){if(!Tc.has(n)){Tc.add(n);try{const{syntax:e,initialValue:t}=_r.has(n)?_r.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const Ni=(n,e)=>document.createElement("div").animate(n,e),vc={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Ni({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Ni({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Ni({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Di={},fn={};for(const n in vc)fn[n]=()=>(Di[n]===void 0&&(Di[n]=vc[n]()),Di[n]);const $f=.015,zf=(n,e)=>{let t="";const r=Math.round(e/$f);for(let s=0;s<r;s++)t+=n(So(0,r-1,s))+", ";return t.substring(0,t.length-2)},wc=(n,e)=>In(n)?fn.linearEasing()?`linear(${zf(n,e)})`:Le.easing:ru(n)?qf(n):n,qf=([n,e,t,r])=>`cubic-bezier(${n}, ${e}, ${t}, ${r})`;function Hf(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const Wf=n=>Array.isArray(n)?n:[n];function Xi(n){return gs[n]&&(n=gs[n]),au(n)?Co(n):n}const Xr={get:(n,e)=>{e=Xi(e);let t=Qi(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const r=_r.get(e);r&&(t=r.initialValue)}return t},set:(n,e,t)=>{e=Xi(e),Qi(e)?n.style.setProperty(e,t):n.style[e]=t}};function cu(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function Gf(n,e){var t;let r=(e==null?void 0:e.toDefaultUnit)||vt;const s=n[n.length-1];if(Af(s)){const i=((t=s.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(r=a=>a+i)}return r}function Kf(){return window.__MOTION_DEV_TOOLS_RECORD}function Qf(n,e,t,r={},s){const i=Kf(),a=r.record!==!1&&i;let l,{duration:u=Le.duration,delay:d=Le.delay,endDelay:m=Le.endDelay,repeat:_=Le.repeat,easing:T=Le.easing,persist:C=!1,direction:D,offset:P,allowWebkitAcceleration:V=!1,autoplay:F=!0}=r;const j=ou(n),B=au(e);let N=fn.waapi();B&&Ff(n,e);const O=Xi(e),L=Nf(j.values,O),E=_r.get(O);return cu(L.animation,!(Gi(T)&&L.generator)&&r.record!==!1),()=>{const p=()=>{var I,w;return(w=(I=Xr.get(n,O))!==null&&I!==void 0?I:E==null?void 0:E.initialValue)!==null&&w!==void 0?w:0};let g=Hf(Wf(t),p);const v=Gf(g,E);if(Gi(T)){const I=T.createAnimation(g,e!=="opacity",p,O,L);T=I.easing,g=I.keyframes||g,u=I.duration||u}if(Qi(O)&&(fn.cssRegisterProperty()?jf(O):N=!1),B&&!fn.linearEasing()&&(In(T)||pn(T)&&T.some(In))&&(N=!1),N){E&&(g=g.map(y=>gr(y)?E.toDefaultUnit(y):y)),g.length===1&&(!fn.partialKeyframes()||a)&&g.unshift(p());const I={delay:cr.ms(d),duration:cr.ms(u),endDelay:cr.ms(m),easing:pn(T)?void 0:wc(T,u),direction:D,iterations:_+1,fill:"both"};l=n.animate({[O]:g,offset:P,easing:pn(T)?T.map(y=>wc(y,u)):void 0},I),l.finished||(l.finished=new Promise((y,fe)=>{l.onfinish=y,l.oncancel=fe}));const w=g[g.length-1];l.finished.then(()=>{C||(Xr.set(n,O,w),l.cancel())}).catch(tu),V||(l.playbackRate=1.000001)}else if(s&&B)g=g.map(I=>typeof I=="string"?parseFloat(I):I),g.length===1&&g.unshift(parseFloat(p())),l=new s(I=>{Xr.set(n,O,v?v(I):I)},g,Object.assign(Object.assign({},r),{duration:u,easing:T}));else{const I=g[g.length-1];Xr.set(n,O,E&&gr(I)?E.toDefaultUnit(I):I)}return a&&i(n,e,g,{duration:u,delay:d,easing:T,repeat:_,offset:P},"motion-one"),L.setAnimation(l),l&&!F&&l.pause(),l}}const Xf=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function Jf(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const Yf=n=>n(),lu=(n,e,t=Le.duration)=>new Proxy({animations:n.map(Yf).filter(Boolean),duration:t,options:e},em),Zf=n=>n.animations[0],em={get:(n,e)=>{const t=Zf(n);switch(e){case"duration":return n.duration;case"currentTime":return cr.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(tm)).catch(tu)),n.finished;case"stop":return()=>{n.animations.forEach(r=>cu(r))};case"forEachNative":return r=>{n.animations.forEach(s=>r(s,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(r=>r[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=cr.ms(t);case"playbackRate":for(let r=0;r<n.animations.length;r++)n.animations[r][e]=t;return!0}return!1}},tm=n=>n.finished;function nm(n=.1,{start:e=0,from:t=0,easing:r}={}){return(s,i)=>{const a=gr(t)?t:rm(t,i),l=Math.abs(a-s);let u=n*l;if(r){const d=i*n;u=Ki(r)(u/d)*d}return e+u}}function rm(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function sm(n,e,t){return In(n)?n(e,t):n}function im(n){return function(t,r,s={}){t=Jf(t);const i=t.length,a=[];for(let l=0;l<i;l++){const u=t[l];for(const d in r){const m=Xf(s,d);m.delay=sm(m.delay,l,i);const _=Qf(u,d,r[d],m,n);a.push(_)}}return lu(a,s,s.duration)}}const om=im(iu);function am(n,e={}){return lu([()=>{const t=new iu(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function Li(n,e,t){return(In(n)?am:om)(n,e,t)}const cm=()=>{};var Ac={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},lm=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},hu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,m=i>>2,_=(i&3)<<4|l>>4;let T=(l&15)<<2|d>>6,C=d&63;u||(C=64,a||(T=64)),r.push(t[m],t[_],t[T],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(uu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):lm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const _=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||_==null)throw new um;const T=i<<2|l>>4;if(r.push(T),d!==64){const C=l<<4&240|d>>2;if(r.push(C),_!==64){const D=d<<6&192|_;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class um extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hm=function(n){const e=uu(n);return hu.encodeByteArray(e,!0)},ys=function(n){return hm(n).replace(/\./g,"")},du=function(n){try{return hu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm=()=>dm().__FIREBASE_DEFAULTS__,mm=()=>{if(typeof process>"u"||typeof Ac>"u")return;const n=Ac.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},pm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&du(n[1]);return e&&JSON.parse(e)},Us=()=>{try{return cm()||fm()||mm()||pm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},fu=n=>{var e,t;return(t=(e=Us())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},gm=n=>{const e=fu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},mu=()=>{var n;return(n=Us())==null?void 0:n.config},pu=n=>{var e;return(e=Us())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ym(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ys(JSON.stringify(t)),ys(JSON.stringify(a)),""].join(".")}const lr={};function Em(){const n={prod:[],emulator:[]};for(const e of Object.keys(lr))lr[e]?n.emulator.push(e):n.prod.push(e);return n}function Im(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let bc=!1;function _u(n,e){if(typeof window>"u"||typeof document>"u"||!kn(window.location.host)||lr[n]===e||lr[n]||bc)return;lr[n]=e;function t(T){return`__firebase__banner__${T}`}const r="__firebase__banner",i=Em().prod.length>0;function a(){const T=document.getElementById(r);T&&T.remove()}function l(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function u(T,C){T.setAttribute("width","24"),T.setAttribute("id",C),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function d(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{bc=!0,a()},T}function m(T,C){T.setAttribute("id",C),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function _(){const T=Im(r),C=t("text"),D=document.getElementById(C)||document.createElement("span"),P=t("learnmore"),V=document.getElementById(P)||document.createElement("a"),F=t("preprendIcon"),j=document.getElementById(F)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const B=T.element;l(B),m(V,P);const N=d();u(j,F),B.append(j,D,V,N),document.body.appendChild(B)}i?(D.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",_):_()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function vm(){var e;const n=(e=Us())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Am(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function bm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Sm(){const n=Ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Cm(){return!vm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Rm(){try{return typeof indexedDB=="object"}catch{return!1}}function Pm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km="FirebaseError";class lt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=km,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Sr.prototype.create)}}class Sr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Vm(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new lt(s,l,r)}}function Vm(n,e){return n.replace(Nm,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Nm=/\{\$([^}]+)}/g;function Dm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Kt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Sc(i)&&Sc(a)){if(!Kt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Sc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Lm(n,e){const t=new Mm(n,e);return t.subscribe.bind(t)}class Mm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Om(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Mi),s.error===void 0&&(s.error=Mi),s.complete===void 0&&(s.complete=Mi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Om(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Mi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(n){return n&&n._delegate?n._delegate:n}class Qt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new _m;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Um(e))try{this.getOrInitializeService({instanceIdentifier:Bt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Bt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Bt){return this.instances.has(e)}getOptions(e=Bt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Fm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Bt){return this.component?this.component.multipleInstances?e:Bt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Fm(n){return n===Bt?void 0:n}function Um(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const jm={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},$m=K.INFO,zm={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},qm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=zm[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ro{constructor(e){this.name=e,this._logLevel=$m,this._logHandler=qm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?jm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const Hm=(n,e)=>e.some(t=>n instanceof t);let Cc,Rc;function Wm(){return Cc||(Cc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gm(){return Rc||(Rc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yu=new WeakMap,Ji=new WeakMap,Eu=new WeakMap,Oi=new WeakMap,Po=new WeakMap;function Km(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(wt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&yu.set(t,n)}).catch(()=>{}),Po.set(e,n),e}function Qm(n){if(Ji.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Ji.set(n,e)}let Yi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Eu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return wt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Xm(n){Yi=n(Yi)}function Jm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(xi(this),e,...t);return Eu.set(r,e.sort?e.sort():[e]),wt(r)}:Gm().includes(n)?function(...e){return n.apply(xi(this),e),wt(yu.get(this))}:function(...e){return wt(n.apply(xi(this),e))}}function Ym(n){return typeof n=="function"?Jm(n):(n instanceof IDBTransaction&&Qm(n),Hm(n,Wm())?new Proxy(n,Yi):n)}function wt(n){if(n instanceof IDBRequest)return Km(n);if(Oi.has(n))return Oi.get(n);const e=Ym(n);return e!==n&&(Oi.set(n,e),Po.set(e,n)),e}const xi=n=>Po.get(n);function Zm(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=wt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(wt(a.result),u.oldVersion,u.newVersion,wt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const ep=["get","getKey","getAll","getAllKeys","count"],tp=["put","add","delete","clear"],Fi=new Map;function Pc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Fi.get(e))return Fi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=tp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ep.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return Fi.set(e,i),i}Xm(n=>({...n,get:(e,t,r)=>Pc(e,t)||n.get(e,t,r),has:(e,t)=>!!Pc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(rp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function rp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zi="@firebase/app",kc="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it=new Ro("@firebase/app"),sp="@firebase/app-compat",ip="@firebase/analytics-compat",op="@firebase/analytics",ap="@firebase/app-check-compat",cp="@firebase/app-check",lp="@firebase/auth",up="@firebase/auth-compat",hp="@firebase/database",dp="@firebase/data-connect",fp="@firebase/database-compat",mp="@firebase/functions",pp="@firebase/functions-compat",gp="@firebase/installations",_p="@firebase/installations-compat",yp="@firebase/messaging",Ep="@firebase/messaging-compat",Ip="@firebase/performance",Tp="@firebase/performance-compat",vp="@firebase/remote-config",wp="@firebase/remote-config-compat",Ap="@firebase/storage",bp="@firebase/storage-compat",Sp="@firebase/firestore",Cp="@firebase/ai",Rp="@firebase/firestore-compat",Pp="firebase",kp="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo="[DEFAULT]",Vp={[Zi]:"fire-core",[sp]:"fire-core-compat",[op]:"fire-analytics",[ip]:"fire-analytics-compat",[cp]:"fire-app-check",[ap]:"fire-app-check-compat",[lp]:"fire-auth",[up]:"fire-auth-compat",[hp]:"fire-rtdb",[dp]:"fire-data-connect",[fp]:"fire-rtdb-compat",[mp]:"fire-fn",[pp]:"fire-fn-compat",[gp]:"fire-iid",[_p]:"fire-iid-compat",[yp]:"fire-fcm",[Ep]:"fire-fcm-compat",[Ip]:"fire-perf",[Tp]:"fire-perf-compat",[vp]:"fire-rc",[wp]:"fire-rc-compat",[Ap]:"fire-gcs",[bp]:"fire-gcs-compat",[Sp]:"fire-fst",[Rp]:"fire-fst-compat",[Cp]:"fire-vertex","fire-js":"fire-js",[Pp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=new Map,Np=new Map,to=new Map;function Vc(n,e){try{n.container.addComponent(e)}catch(t){it.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Tn(n){const e=n.name;if(to.has(e))return it.debug(`There were multiple attempts to register component ${e}.`),!1;to.set(e,n);for(const t of Es.values())Vc(t,n);for(const t of Np.values())Vc(t,n);return!0}function ko(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},At=new Sr("app","Firebase",Dp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw At.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn=kp;function Iu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:eo,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw At.create("bad-app-name",{appName:String(s)});if(t||(t=mu()),!t)throw At.create("no-options");const i=Es.get(s);if(i){if(Kt(t,i.options)&&Kt(r,i.config))return i;throw At.create("duplicate-app",{appName:s})}const a=new Bm(s);for(const u of to.values())a.addComponent(u);const l=new Lp(t,r,a);return Es.set(s,l),l}function Tu(n=eo){const e=Es.get(n);if(!e&&n===eo&&mu())return Iu();if(!e)throw At.create("no-app",{appName:n});return e}function bt(n,e,t){let r=Vp[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),it.warn(a.join(" "));return}Tn(new Qt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="firebase-heartbeat-database",Op=1,yr="firebase-heartbeat-store";let Ui=null;function vu(){return Ui||(Ui=Zm(Mp,Op,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(yr)}catch(t){console.warn(t)}}}}).catch(n=>{throw At.create("idb-open",{originalErrorMessage:n.message})})),Ui}async function xp(n){try{const t=(await vu()).transaction(yr),r=await t.objectStore(yr).get(wu(n));return await t.done,r}catch(e){if(e instanceof lt)it.warn(e.message);else{const t=At.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});it.warn(t.message)}}}async function Nc(n,e){try{const r=(await vu()).transaction(yr,"readwrite");await r.objectStore(yr).put(e,wu(n)),await r.done}catch(t){if(t instanceof lt)it.warn(t.message);else{const r=At.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});it.warn(r.message)}}}function wu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=1024,Up=30;class Bp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new $p(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Dc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Up){const a=zp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){it.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Dc(),{heartbeatsToSend:r,unsentEntries:s}=jp(this._heartbeatsCache.heartbeats),i=ys(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return it.warn(t),""}}}function Dc(){return new Date().toISOString().substring(0,10)}function jp(n,e=Fp){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Lc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Lc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class $p{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rm()?Pm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await xp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Nc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Nc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Lc(n){return ys(JSON.stringify({version:2,heartbeats:n})).length}function zp(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qp(n){Tn(new Qt("platform-logger",e=>new np(e),"PRIVATE")),Tn(new Qt("heartbeat",e=>new Bp(e),"PRIVATE")),bt(Zi,kc,n),bt(Zi,kc,"esm2020"),bt("fire-js","")}qp("");var Hp="firebase",Wp="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bt(Hp,Wp,"app");function Au(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Gp=Au,bu=new Sr("auth","Firebase",Au());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new Ro("@firebase/auth");function Kp(n,...e){Is.logLevel<=K.WARN&&Is.warn(`Auth (${Vn}): ${n}`,...e)}function ss(n,...e){Is.logLevel<=K.ERROR&&Is.error(`Auth (${Vn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw No(n,...e)}function Be(n,...e){return No(n,...e)}function Vo(n,e,t){const r={...Gp(),[e]:t};return new Sr("auth","Firebase",r).create(e,{appName:n.name})}function Wt(n){return Vo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Qp(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Je(n,"argument-error"),Vo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function No(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return bu.create(n,...e)}function q(n,e,...t){if(!n)throw No(e,...t)}function rt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ss(e),new Error(e)}function ot(n,e){n||rt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Xp(){return Mc()==="http:"||Mc()==="https:"}function Mc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xp()||Am()||"connection"in navigator)?navigator.onLine:!0}function Yp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ot(t>e,"Short delay should be less than long delay!"),this.isMobile=Tm()||bm()}get(){return Jp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(n,e){ot(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],tg=new Rr(3e4,6e4);function Lo(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Nn(n,e,t,r,s={}){return Cu(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Cr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return wm()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&kn(n.emulatorConfig.host)&&(d.credentials="include"),Su.fetch()(await Ru(n,n.config.apiHost,t,l),d)})}async function Cu(n,e,t){n._canInitEmulator=!1;const r={...Zp,...e};try{const s=new rg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Jr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Jr(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Jr(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Jr(n,"user-disabled",a);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Vo(n,m,d);Je(n,m)}}catch(s){if(s instanceof lt)throw s;Je(n,"network-request-failed",{message:String(s)})}}async function ng(n,e,t,r,s={}){const i=await Nn(n,e,t,r,s);return"mfaPendingCredential"in i&&Je(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Ru(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Do(n.config,s):`${n.config.apiScheme}://${s}`;return eg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class rg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Be(this.auth,"network-request-failed")),tg.get())})}}function Jr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Be(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sg(n,e){return Nn(n,"POST","/v1/accounts:delete",e)}async function Ts(n,e){return Nn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ig(n,e=!1){const t=Ve(n),r=await t.getIdToken(e),s=Mo(r);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ur(Bi(s.auth_time)),issuedAtTime:ur(Bi(s.iat)),expirationTime:ur(Bi(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Bi(n){return Number(n)*1e3}function Mo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ss("JWT malformed, contained fewer than 3 sections"),null;try{const s=du(t);return s?JSON.parse(s):(ss("Failed to decode base64 JWT payload"),null)}catch(s){return ss("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Oc(n){const e=Mo(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Er(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof lt&&og(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function og({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ur(this.lastLoginAt),this.creationTime=ur(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vs(n){var _;const e=n.auth,t=await n.getIdToken(),r=await Er(n,Ts(e,{idToken:t}));q(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(_=s.providerUserInfo)!=null&&_.length?Pu(s.providerUserInfo):[],a=lg(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ro(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,m)}async function cg(n){const e=Ve(n);await vs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function lg(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Pu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ug(n,e){const t=await Cu(n,{},async()=>{const r=Cr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Ru(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&kn(n.emulatorConfig.host)&&(u.credentials="include"),Su.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function hg(n,e){return Nn(n,"POST","/v2/accounts:revokeToken",Lo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Oc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Oc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await ug(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new gn;return r&&(q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(q(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new gn,this.toJSON())}_performRefresh(){return rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Fe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ag(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ro(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Er(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ig(this,e)}reload(){return cg(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Fe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await vs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xe(this.auth.app))return Promise.reject(Wt(this.auth));const e=await this.getIdToken();return await Er(this,sg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,m=t.lastLoginAt??void 0,{uid:_,emailVerified:T,isAnonymous:C,providerData:D,stsTokenManager:P}=t;q(_&&P,e,"internal-error");const V=gn.fromJSON(this.name,P);q(typeof _=="string",e,"internal-error"),gt(r,e.name),gt(s,e.name),q(typeof T=="boolean",e,"internal-error"),q(typeof C=="boolean",e,"internal-error"),gt(i,e.name),gt(a,e.name),gt(l,e.name),gt(u,e.name),gt(d,e.name),gt(m,e.name);const F=new Fe({uid:_,auth:e,email:s,emailVerified:T,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:V,createdAt:d,lastLoginAt:m});return D&&Array.isArray(D)&&(F.providerData=D.map(j=>({...j}))),u&&(F._redirectEventId=u),F}static async _fromIdTokenResponse(e,t,r=!1){const s=new gn;s.updateFromServerResponse(t);const i=new Fe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await vs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Pu(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new gn;l.updateFromIdToken(r);const u=new Fe({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ro(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc=new Map;function st(n){ot(n instanceof Function,"Expected a class definition");let e=xc.get(n);return e?(ot(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,xc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ku.type="NONE";const Fc=ku;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(n,e,t){return`firebase:${n}:${e}:${t}`}class _n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=is(this.userKey,s.apiKey,i),this.fullPersistenceKey=is("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ts(this.auth,{idToken:e}).catch(()=>{});return t?Fe._fromGetAccountInfoResponse(this.auth,t,e):null}return Fe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new _n(st(Fc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||st(Fc);const a=is(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const m=await d._get(a);if(m){let _;if(typeof m=="string"){const T=await Ts(e,{idToken:m}).catch(()=>{});if(!T)break;_=await Fe._fromGetAccountInfoResponse(e,T,m)}else _=Fe._fromJSON(e,m);d!==i&&(l=_),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new _n(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new _n(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Lu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ou(e))return"Blackberry";if(xu(e))return"Webos";if(Nu(e))return"Safari";if((e.includes("chrome/")||Du(e))&&!e.includes("edge/"))return"Chrome";if(Mu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Vu(n=Ae()){return/firefox\//i.test(n)}function Nu(n=Ae()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Du(n=Ae()){return/crios\//i.test(n)}function Lu(n=Ae()){return/iemobile/i.test(n)}function Mu(n=Ae()){return/android/i.test(n)}function Ou(n=Ae()){return/blackberry/i.test(n)}function xu(n=Ae()){return/webos/i.test(n)}function Oo(n=Ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function dg(n=Ae()){var e;return Oo(n)&&!!((e=window.navigator)!=null&&e.standalone)}function fg(){return Sm()&&document.documentMode===10}function Fu(n=Ae()){return Oo(n)||Mu(n)||xu(n)||Ou(n)||/windows phone/i.test(n)||Lu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(n,e=[]){let t;switch(n){case"Browser":t=Uc(Ae());break;case"Worker":t=`${Uc(Ae())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg(n,e={}){return Nn(n,"GET","/v2/passwordPolicy",Lo(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg=6;class _g{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??gg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yg{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bc(this),this.idTokenSubscription=new Bc(this),this.beforeStateQueue=new mg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=st(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await _n.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ts(this,{idToken:e}),r=await Fe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(xe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await vs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Yp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xe(this.app))return Promise.reject(Wt(this));const t=e?Ve(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xe(this.app)?Promise.reject(Wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xe(this.app)?Promise.reject(Wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(st(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pg(this),t=new _g(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Sr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await hg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&st(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await _n.create(this,[st(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Uu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Kp(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Bs(n){return Ve(n)}class Bc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Lm(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Eg(n){xo=n}function Ig(n){return xo.loadJS(n)}function Tg(){return xo.gapiScript}function vg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wg(n,e){const t=ko(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Kt(i,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function Ag(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(st);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function bg(n,e,t){const r=Bs(n);q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Bu(e),{host:a,port:l}=Sg(e),u=l===null?"":`:${l}`,d={url:`${i}//${a}${u}/`},m=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),q(Kt(d,r.config.emulator)&&Kt(m,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=m,r.settings.appVerificationDisabledForTesting=!0,kn(a)?(gu(`${i}//${a}${u}`),_u("Auth",!0)):Cg()}function Bu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Sg(n){const e=Bu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:jc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:jc(a)}}}function jc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Cg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return rt("not implemented")}_getIdTokenResponse(e){return rt("not implemented")}_linkToIdToken(e,t){return rt("not implemented")}_getReauthenticationResolver(e){return rt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn(n,e){return ng(n,"POST","/v1/accounts:signInWithIdp",Lo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg="http://localhost";class Xt extends ju{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Xt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Xt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return yn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,yn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,yn(e,t)}buildRequest(){const e={requestUri:Rg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Cr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr extends Fo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Pr{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.FACEBOOK_SIGN_IN_METHOD="facebook.com";_t.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt extends Pr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xt._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return nt.credential(t,r)}catch{return null}}}nt.GOOGLE_SIGN_IN_METHOD="google.com";nt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends Pr{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.GITHUB_SIGN_IN_METHOD="github.com";yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends Pr{constructor(){super("twitter.com")}static credential(e,t){return Xt._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Et.credential(t,r)}catch{return null}}}Et.TWITTER_SIGN_IN_METHOD="twitter.com";Et.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Fe._fromIdTokenResponse(e,r,s),a=$c(r);return new vn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=$c(r);return new vn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function $c(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws extends lt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ws.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ws(e,t,r,s)}}function $u(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ws._fromErrorAndOperation(n,i,e,r):i})}async function Pg(n,e,t=!1){const r=await Er(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return vn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kg(n,e,t=!1){const{auth:r}=n;if(xe(r.app))return Promise.reject(Wt(r));const s="reauthenticate";try{const i=await Er(n,$u(r,s,e,n),t);q(i.idToken,r,"internal-error");const a=Mo(i.idToken);q(a,r,"internal-error");const{sub:l}=a;return q(n.uid===l,r,"user-mismatch"),vn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Je(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vg(n,e,t=!1){if(xe(n.app))return Promise.reject(Wt(n));const r="signIn",s=await $u(n,r,e),i=await vn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zu(n,e){return Ve(n).setPersistence(e)}function Ng(n,e,t,r){return Ve(n).onIdTokenChanged(e,t,r)}function Dg(n,e,t){return Ve(n).beforeAuthStateChanged(e,t)}function Lg(n,e,t,r){return Ve(n).onAuthStateChanged(e,t,r)}function Mg(n){return Ve(n).signOut()}const As="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(As,"1"),this.storage.removeItem(As),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og=1e3,xg=10;class Hu extends qu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);fg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,xg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Og)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hu.type="LOCAL";const Uo=Hu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu extends qu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wu.type="SESSION";const Gu=Wu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new js(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await Fg(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}js.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Bo("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(_){const T=_;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(T.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return window}function Bg(n){He().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(){return typeof He().WorkerGlobalScope<"u"&&typeof He().importScripts=="function"}async function jg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $g(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function zg(){return Ku()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu="firebaseLocalStorageDb",qg=1,bs="firebaseLocalStorage",Xu="fbase_key";class kr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $s(n,e){return n.transaction([bs],e?"readwrite":"readonly").objectStore(bs)}function Hg(){const n=indexedDB.deleteDatabase(Qu);return new kr(n).toPromise()}function so(){const n=indexedDB.open(Qu,qg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(bs,{keyPath:Xu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(bs)?e(r):(r.close(),await Hg(),e(await so()))})})}async function zc(n,e,t){const r=$s(n,!0).put({[Xu]:e,value:t});return new kr(r).toPromise()}async function Wg(n,e){const t=$s(n,!1).get(e),r=await new kr(t).toPromise();return r===void 0?null:r.value}function qc(n,e){const t=$s(n,!0).delete(e);return new kr(t).toPromise()}const Gg=800,Kg=3;class Ju{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await so(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Kg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ku()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=js._getInstance(zg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await jg(),!this.activeServiceWorker)return;this.sender=new Ug(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$g()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await so();return await zc(e,As,"1"),await qc(e,As),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>zc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Wg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>qc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=$s(s,!1).getAll();return new kr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Gg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ju.type="LOCAL";const Qg=Ju;new Rr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(n,e){return e?st(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo extends ju{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return yn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return yn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return yn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Xg(n){return Vg(n.auth,new jo(n),n.bypassAuthState)}function Jg(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),kg(t,new jo(n),n.bypassAuthState)}async function Yg(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Pg(t,new jo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Xg;case"linkViaPopup":case"linkViaRedirect":return Yg;case"reauthViaPopup":case"reauthViaRedirect":return Jg;default:Je(this.auth,"internal-error")}}resolve(e){ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ot(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg=new Rr(2e3,1e4);async function e_(n,e,t){if(xe(n.app))return Promise.reject(Be(n,"operation-not-supported-in-this-environment"));const r=Bs(n);Qp(n,e,Fo);const s=Yu(r,t);return new $t(r,"signInViaPopup",e,s).executeNotNull()}class $t extends Zu{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,$t.currentPopupAction&&$t.currentPopupAction.cancel(),$t.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){ot(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$t.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zg.get())};e()}}$t.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_="pendingRedirect",os=new Map;class n_ extends Zu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=os.get(this.auth._key());if(!e){try{const r=await r_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}os.set(this.auth._key(),e)}return this.bypassAuthState||os.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function r_(n,e){const t=o_(e),r=i_(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function s_(n,e){os.set(n._key(),e)}function i_(n){return st(n._redirectPersistence)}function o_(n){return is(t_,n.config.apiKey,n.name)}async function a_(n,e,t=!1){if(xe(n.app))return Promise.reject(Wt(n));const r=Bs(n),s=Yu(r,e),a=await new n_(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c_=10*60*1e3;class l_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!u_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!eh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Be(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=c_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hc(e))}saveEventToCache(e){this.cachedEventUids.add(Hc(e)),this.lastProcessedEventTime=Date.now()}}function Hc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function eh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function u_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return eh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h_(n,e={}){return Nn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,f_=/^https?/;async function m_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await h_(n);for(const t of e)try{if(p_(t))return}catch{}Je(n,"unauthorized-domain")}function p_(n){const e=no(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!f_.test(t))return!1;if(d_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_=new Rr(3e4,6e4);function Wc(){const n=He().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function __(n){return new Promise((e,t)=>{var s,i,a;function r(){Wc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wc(),t(Be(n,"network-request-failed"))},timeout:g_.get()})}if((i=(s=He().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=He().gapi)!=null&&a.load)r();else{const l=vg("iframefcb");return He()[l]=()=>{gapi.load?r():t(Be(n,"network-request-failed"))},Ig(`${Tg()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw as=null,e})}let as=null;function y_(n){return as=as||__(n),as}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=new Rr(5e3,15e3),I_="__/auth/iframe",T_="emulator/auth/iframe",v_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},w_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function A_(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Do(e,T_):`https://${n.config.authDomain}/${I_}`,r={apiKey:e.apiKey,appName:n.name,v:Vn},s=w_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Cr(r).slice(1)}`}async function b_(n){const e=await y_(n),t=He().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:A_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:v_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Be(n,"network-request-failed"),l=He().setTimeout(()=>{i(a)},E_.get());function u(){He().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},C_=500,R_=600,P_="_blank",k_="http://localhost";class Gc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function V_(n,e,t,r=C_,s=R_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...S_,width:r.toString(),height:s.toString(),top:i,left:a},d=Ae().toLowerCase();t&&(l=Du(d)?P_:t),Vu(d)&&(e=e||k_,u.scrollbars="yes");const m=Object.entries(u).reduce((T,[C,D])=>`${T}${C}=${D},`,"");if(dg(d)&&l!=="_self")return N_(e||"",l),new Gc(null);const _=window.open(e||"",l,m);q(_,n,"popup-blocked");try{_.focus()}catch{}return new Gc(_)}function N_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_="__/auth/handler",L_="emulator/auth/handler",M_=encodeURIComponent("fac");async function Kc(n,e,t,r,s,i){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Vn,eventId:s};if(e instanceof Fo){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Dm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,_]of Object.entries({}))a[m]=_}if(e instanceof Pr){const m=e.getScopes().filter(_=>_!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await n._getAppCheckToken(),d=u?`#${M_}=${encodeURIComponent(u)}`:"";return`${O_(n)}?${Cr(l).slice(1)}${d}`}function O_({config:n}){return n.emulator?Do(n,L_):`https://${n.authDomain}/${D_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ji="webStorageSupport";class x_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gu,this._completeRedirectFn=a_,this._overrideRedirectResult=s_}async _openPopup(e,t,r,s){var a;ot((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Kc(e,t,r,no(),s);return V_(e,i,Bo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await Kc(e,t,r,no(),s);return Bg(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ot(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await b_(e),r=new l_(e);return t.register("authEvent",s=>(q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ji,{type:ji},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[ji];i!==void 0&&t(!!i),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=m_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fu()||Nu()||Oo()}}const F_=x_;var Qc="@firebase/auth",Xc="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function j_(n){Tn(new Qt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Uu(n)},d=new yg(r,s,i,u);return Ag(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Tn(new Qt("auth-internal",e=>{const t=Bs(e.getProvider("auth").getImmediate());return(r=>new U_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),bt(Qc,Xc,B_(n)),bt(Qc,Xc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_=5*60,z_=pu("authIdTokenMaxAge")||$_;let Jc=null;const q_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>z_)return;const s=t==null?void 0:t.token;Jc!==s&&(Jc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function H_(n=Tu()){const e=ko(n,"auth");if(e.isInitialized())return e.getImmediate();const t=wg(n,{popupRedirectResolver:F_,persistence:[Qg,Uo,Gu]}),r=pu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=q_(i.toString());Dg(t,a,()=>a(t.currentUser)),Ng(t,l=>a(l))}}const s=fu("auth");return s&&bg(t,`http://${s}`),t}function W_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Eg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Be("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",W_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});j_("Browser");var Yc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var St,th;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function g(){}g.prototype=p.prototype,E.F=p.prototype,E.prototype=new g,E.prototype.constructor=E,E.D=function(v,I,w){for(var y=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)y[fe-2]=arguments[fe];return p.prototype[I].apply(v,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,g){g||(g=0);const v=Array(16);if(typeof p=="string")for(var I=0;I<16;++I)v[I]=p.charCodeAt(g++)|p.charCodeAt(g++)<<8|p.charCodeAt(g++)<<16|p.charCodeAt(g++)<<24;else for(I=0;I<16;++I)v[I]=p[g++]|p[g++]<<8|p[g++]<<16|p[g++]<<24;p=E.g[0],g=E.g[1],I=E.g[2];let w=E.g[3],y;y=p+(w^g&(I^w))+v[0]+3614090360&4294967295,p=g+(y<<7&4294967295|y>>>25),y=w+(I^p&(g^I))+v[1]+3905402710&4294967295,w=p+(y<<12&4294967295|y>>>20),y=I+(g^w&(p^g))+v[2]+606105819&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(p^I&(w^p))+v[3]+3250441966&4294967295,g=I+(y<<22&4294967295|y>>>10),y=p+(w^g&(I^w))+v[4]+4118548399&4294967295,p=g+(y<<7&4294967295|y>>>25),y=w+(I^p&(g^I))+v[5]+1200080426&4294967295,w=p+(y<<12&4294967295|y>>>20),y=I+(g^w&(p^g))+v[6]+2821735955&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(p^I&(w^p))+v[7]+4249261313&4294967295,g=I+(y<<22&4294967295|y>>>10),y=p+(w^g&(I^w))+v[8]+1770035416&4294967295,p=g+(y<<7&4294967295|y>>>25),y=w+(I^p&(g^I))+v[9]+2336552879&4294967295,w=p+(y<<12&4294967295|y>>>20),y=I+(g^w&(p^g))+v[10]+4294925233&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(p^I&(w^p))+v[11]+2304563134&4294967295,g=I+(y<<22&4294967295|y>>>10),y=p+(w^g&(I^w))+v[12]+1804603682&4294967295,p=g+(y<<7&4294967295|y>>>25),y=w+(I^p&(g^I))+v[13]+4254626195&4294967295,w=p+(y<<12&4294967295|y>>>20),y=I+(g^w&(p^g))+v[14]+2792965006&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(p^I&(w^p))+v[15]+1236535329&4294967295,g=I+(y<<22&4294967295|y>>>10),y=p+(I^w&(g^I))+v[1]+4129170786&4294967295,p=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(p^g))+v[6]+3225465664&4294967295,w=p+(y<<9&4294967295|y>>>23),y=I+(p^g&(w^p))+v[11]+643717713&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^p&(I^w))+v[0]+3921069994&4294967295,g=I+(y<<20&4294967295|y>>>12),y=p+(I^w&(g^I))+v[5]+3593408605&4294967295,p=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(p^g))+v[10]+38016083&4294967295,w=p+(y<<9&4294967295|y>>>23),y=I+(p^g&(w^p))+v[15]+3634488961&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^p&(I^w))+v[4]+3889429448&4294967295,g=I+(y<<20&4294967295|y>>>12),y=p+(I^w&(g^I))+v[9]+568446438&4294967295,p=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(p^g))+v[14]+3275163606&4294967295,w=p+(y<<9&4294967295|y>>>23),y=I+(p^g&(w^p))+v[3]+4107603335&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^p&(I^w))+v[8]+1163531501&4294967295,g=I+(y<<20&4294967295|y>>>12),y=p+(I^w&(g^I))+v[13]+2850285829&4294967295,p=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(p^g))+v[2]+4243563512&4294967295,w=p+(y<<9&4294967295|y>>>23),y=I+(p^g&(w^p))+v[7]+1735328473&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^p&(I^w))+v[12]+2368359562&4294967295,g=I+(y<<20&4294967295|y>>>12),y=p+(g^I^w)+v[5]+4294588738&4294967295,p=g+(y<<4&4294967295|y>>>28),y=w+(p^g^I)+v[8]+2272392833&4294967295,w=p+(y<<11&4294967295|y>>>21),y=I+(w^p^g)+v[11]+1839030562&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^p)+v[14]+4259657740&4294967295,g=I+(y<<23&4294967295|y>>>9),y=p+(g^I^w)+v[1]+2763975236&4294967295,p=g+(y<<4&4294967295|y>>>28),y=w+(p^g^I)+v[4]+1272893353&4294967295,w=p+(y<<11&4294967295|y>>>21),y=I+(w^p^g)+v[7]+4139469664&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^p)+v[10]+3200236656&4294967295,g=I+(y<<23&4294967295|y>>>9),y=p+(g^I^w)+v[13]+681279174&4294967295,p=g+(y<<4&4294967295|y>>>28),y=w+(p^g^I)+v[0]+3936430074&4294967295,w=p+(y<<11&4294967295|y>>>21),y=I+(w^p^g)+v[3]+3572445317&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^p)+v[6]+76029189&4294967295,g=I+(y<<23&4294967295|y>>>9),y=p+(g^I^w)+v[9]+3654602809&4294967295,p=g+(y<<4&4294967295|y>>>28),y=w+(p^g^I)+v[12]+3873151461&4294967295,w=p+(y<<11&4294967295|y>>>21),y=I+(w^p^g)+v[15]+530742520&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^p)+v[2]+3299628645&4294967295,g=I+(y<<23&4294967295|y>>>9),y=p+(I^(g|~w))+v[0]+4096336452&4294967295,p=g+(y<<6&4294967295|y>>>26),y=w+(g^(p|~I))+v[7]+1126891415&4294967295,w=p+(y<<10&4294967295|y>>>22),y=I+(p^(w|~g))+v[14]+2878612391&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~p))+v[5]+4237533241&4294967295,g=I+(y<<21&4294967295|y>>>11),y=p+(I^(g|~w))+v[12]+1700485571&4294967295,p=g+(y<<6&4294967295|y>>>26),y=w+(g^(p|~I))+v[3]+2399980690&4294967295,w=p+(y<<10&4294967295|y>>>22),y=I+(p^(w|~g))+v[10]+4293915773&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~p))+v[1]+2240044497&4294967295,g=I+(y<<21&4294967295|y>>>11),y=p+(I^(g|~w))+v[8]+1873313359&4294967295,p=g+(y<<6&4294967295|y>>>26),y=w+(g^(p|~I))+v[15]+4264355552&4294967295,w=p+(y<<10&4294967295|y>>>22),y=I+(p^(w|~g))+v[6]+2734768916&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~p))+v[13]+1309151649&4294967295,g=I+(y<<21&4294967295|y>>>11),y=p+(I^(g|~w))+v[4]+4149444226&4294967295,p=g+(y<<6&4294967295|y>>>26),y=w+(g^(p|~I))+v[11]+3174756917&4294967295,w=p+(y<<10&4294967295|y>>>22),y=I+(p^(w|~g))+v[2]+718787259&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~p))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(I+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+w&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const g=p-this.blockSize,v=this.C;let I=this.h,w=0;for(;w<p;){if(I==0)for(;w<=g;)s(this,E,w),w+=this.blockSize;if(typeof E=="string"){for(;w<p;)if(v[I++]=E.charCodeAt(w++),I==this.blockSize){s(this,v),I=0;break}}else for(;w<p;)if(v[I++]=E[w++],I==this.blockSize){s(this,v),I=0;break}}this.h=I,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var g=E.length-8;g<E.length;++g)E[g]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,g=0;g<4;++g)for(let v=0;v<32;v+=8)E[p++]=this.g[g]>>>v&255;return E};function i(E,p){var g=l;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=p(E)}function a(E,p){this.h=p;const g=[];let v=!0;for(let I=E.length-1;I>=0;I--){const w=E[I]|0;v&&w==p||(g[I]=w,v=!1)}this.g=g}var l={};function u(E){return-128<=E&&E<128?i(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return _;if(E<0)return V(d(-E));const p=[];let g=1;for(let v=0;E>=g;v++)p[v]=E/g|0,g*=4294967296;return new a(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return V(m(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const g=d(Math.pow(p,8));let v=_;for(let w=0;w<E.length;w+=8){var I=Math.min(8,E.length-w);const y=parseInt(E.substring(w,w+I),p);I<8?(I=d(Math.pow(p,I)),v=v.j(I).add(d(y))):(v=v.j(g),v=v.add(d(y)))}return v}var _=u(0),T=u(1),C=u(16777216);n=a.prototype,n.m=function(){if(P(this))return-V(this).m();let E=0,p=1;for(let g=0;g<this.g.length;g++){const v=this.i(g);E+=(v>=0?v:4294967296+v)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(D(this))return"0";if(P(this))return"-"+V(this).toString(E);const p=d(Math.pow(E,6));var g=this;let v="";for(;;){const I=N(g,p).g;g=F(g,I.j(p));let w=((g.g.length>0?g.g[0]:g.h)>>>0).toString(E);if(g=I,D(g))return w+v;for(;w.length<6;)w="0"+w;v=w+v}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function D(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function P(E){return E.h==-1}n.l=function(E){return E=F(this,E),P(E)?-1:D(E)?0:1};function V(E){const p=E.g.length,g=[];for(let v=0;v<p;v++)g[v]=~E.g[v];return new a(g,~E.h).add(T)}n.abs=function(){return P(this)?V(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),g=[];let v=0;for(let I=0;I<=p;I++){let w=v+(this.i(I)&65535)+(E.i(I)&65535),y=(w>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);v=y>>>16,w&=65535,y&=65535,g[I]=y<<16|w}return new a(g,g[g.length-1]&-2147483648?-1:0)};function F(E,p){return E.add(V(p))}n.j=function(E){if(D(this)||D(E))return _;if(P(this))return P(E)?V(this).j(V(E)):V(V(this).j(E));if(P(E))return V(this.j(V(E)));if(this.l(C)<0&&E.l(C)<0)return d(this.m()*E.m());const p=this.g.length+E.g.length,g=[];for(var v=0;v<2*p;v++)g[v]=0;for(v=0;v<this.g.length;v++)for(let I=0;I<E.g.length;I++){const w=this.i(v)>>>16,y=this.i(v)&65535,fe=E.i(I)>>>16,et=E.i(I)&65535;g[2*v+2*I]+=y*et,j(g,2*v+2*I),g[2*v+2*I+1]+=w*et,j(g,2*v+2*I+1),g[2*v+2*I+1]+=y*fe,j(g,2*v+2*I+1),g[2*v+2*I+2]+=w*fe,j(g,2*v+2*I+2)}for(E=0;E<p;E++)g[E]=g[2*E+1]<<16|g[2*E];for(E=p;E<2*p;E++)g[E]=0;return new a(g,0)};function j(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function B(E,p){this.g=E,this.h=p}function N(E,p){if(D(p))throw Error("division by zero");if(D(E))return new B(_,_);if(P(E))return p=N(V(E),p),new B(V(p.g),V(p.h));if(P(p))return p=N(E,V(p)),new B(V(p.g),p.h);if(E.g.length>30){if(P(E)||P(p))throw Error("slowDivide_ only works with positive integers.");for(var g=T,v=p;v.l(E)<=0;)g=O(g),v=O(v);var I=L(g,1),w=L(v,1);for(v=L(v,2),g=L(g,2);!D(v);){var y=w.add(v);y.l(E)<=0&&(I=I.add(g),w=y),v=L(v,1),g=L(g,1)}return p=F(E,I.j(p)),new B(I,p)}for(I=_;E.l(p)>=0;){for(g=Math.max(1,Math.floor(E.m()/p.m())),v=Math.ceil(Math.log(g)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),w=d(g),y=w.j(p);P(y)||y.l(E)>0;)g-=v,w=d(g),y=w.j(p);D(w)&&(w=T),I=I.add(w),E=F(E,y)}return new B(I,E)}n.B=function(E){return N(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),g=[];for(let v=0;v<p;v++)g[v]=this.i(v)&E.i(v);return new a(g,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),g=[];for(let v=0;v<p;v++)g[v]=this.i(v)|E.i(v);return new a(g,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),g=[];for(let v=0;v<p;v++)g[v]=this.i(v)^E.i(v);return new a(g,this.h^E.h)};function O(E){const p=E.g.length+1,g=[];for(let v=0;v<p;v++)g[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(g,E.h)}function L(E,p){const g=p>>5;p%=32;const v=E.g.length-g,I=[];for(let w=0;w<v;w++)I[w]=p>0?E.i(w+g)>>>p|E.i(w+g+1)<<32-p:E.i(w+g);return new a(I,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,th=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,St=a}).apply(typeof Yc<"u"?Yc:typeof self<"u"?self:typeof window<"u"?window:{});var Yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var nh,rr,rh,cs,io,sh,ih,oh;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yr=="object"&&Yr];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in h))break e;h=h[A]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function u(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=u,d.apply(null,arguments)}function m(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function _(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,A,S){for(var M=Array(arguments.length-2),G=2;G<arguments.length;G++)M[G-2]=arguments[G];return c.prototype[A].apply(f,M)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function D(o,c){for(let f=1;f<arguments.length;f++){const A=arguments[f];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const S=A.length||0;o.length=h+S;for(let M=0;M<S;M++)o[h+M]=A[M]}else o.push(A)}}class P{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function V(o){a.setTimeout(()=>{throw o},0)}function F(){var o=E;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class j{constructor(){this.h=this.g=null}add(c,h){const f=B.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var B=new P(()=>new N,o=>o.reset());class N{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let O,L=!1,E=new j,p=()=>{const o=Promise.resolve(void 0);O=()=>{o.then(g)}};function g(){for(var o;o=F();){try{o.h.call(o.g)}catch(h){V(h)}var c=B;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}L=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var w=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o}();function y(o){return/^[\s\xa0]*$/.test(o)}function fe(o,c){I.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}_(fe,I),fe.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&fe.Z.h.call(this)},fe.prototype.h=function(){fe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var et="closure_listenable_"+(Math.random()*1e6|0),ii=0;function Ea(o,c,h,f,A){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=A,this.key=++ii,this.da=this.fa=!1}function rn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function sn(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function oi(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Or(o){const c={};for(const h in o)c[h]=o[h];return c}const Ia="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ta(o,c){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)o[h]=f[h];for(let S=0;S<Ia.length;S++)h=Ia[S],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function xr(o){this.src=o,this.g={},this.h=0}xr.prototype.add=function(o,c,h,f,A){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const M=ci(o,c,f,A);return M>-1?(c=o[M],h||(c.fa=!1)):(c=new Ea(c,this.src,S,!!f,A),c.fa=h,o.push(c)),c};function ai(o,c){const h=c.type;if(h in o.g){var f=o.g[h],A=Array.prototype.indexOf.call(f,c,void 0),S;(S=A>=0)&&Array.prototype.splice.call(f,A,1),S&&(rn(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function ci(o,c,h,f){for(let A=0;A<o.length;++A){const S=o[A];if(!S.da&&S.listener==c&&S.capture==!!h&&S.ha==f)return A}return-1}var li="closure_lm_"+(Math.random()*1e6|0),ui={};function va(o,c,h,f,A){if(Array.isArray(c)){for(let S=0;S<c.length;S++)va(o,c[S],h,f,A);return null}return h=ba(h),o&&o[et]?o.J(c,h,l(f)?!!f.capture:!1,A):zd(o,c,h,!1,f,A)}function zd(o,c,h,f,A,S){if(!c)throw Error("Invalid event type");const M=l(A)?!!A.capture:!!A;let G=di(o);if(G||(o[li]=G=new xr(o)),h=G.add(c,h,f,M,S),h.proxy)return h;if(f=qd(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)w||(A=M),A===void 0&&(A=!1),o.addEventListener(c.toString(),f,A);else if(o.attachEvent)o.attachEvent(Aa(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function qd(){function o(h){return c.call(o.src,o.listener,h)}const c=Hd;return o}function wa(o,c,h,f,A){if(Array.isArray(c))for(var S=0;S<c.length;S++)wa(o,c[S],h,f,A);else f=l(f)?!!f.capture:!!f,h=ba(h),o&&o[et]?(o=o.i,S=String(c).toString(),S in o.g&&(c=o.g[S],h=ci(c,h,f,A),h>-1&&(rn(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[S],o.h--)))):o&&(o=di(o))&&(c=o.g[c.toString()],o=-1,c&&(o=ci(c,h,f,A)),(h=o>-1?c[o]:null)&&hi(h))}function hi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[et])ai(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Aa(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=di(c))?(ai(h,o),h.h==0&&(h.src=null,c[li]=null)):rn(o)}}}function Aa(o){return o in ui?ui[o]:ui[o]="on"+o}function Hd(o,c){if(o.da)o=!0;else{c=new fe(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&hi(o),o=h.call(f,c)}return o}function di(o){return o=o[li],o instanceof xr?o:null}var fi="__closure_events_fn_"+(Math.random()*1e9>>>0);function ba(o){return typeof o=="function"?o:(o[fi]||(o[fi]=function(c){return o.handleEvent(c)}),o[fi])}function Ee(){v.call(this),this.i=new xr(this),this.M=this,this.G=null}_(Ee,v),Ee.prototype[et]=!0,Ee.prototype.removeEventListener=function(o,c,h,f){wa(this,o,c,h,f)};function be(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new I(c,o);else if(c instanceof I)c.target=c.target||o;else{var A=c;c=new I(f,o),Ta(c,A)}A=!0;let S,M;if(h)for(M=h.length-1;M>=0;M--)S=c.g=h[M],A=Fr(S,f,!0,c)&&A;if(S=c.g=o,A=Fr(S,f,!0,c)&&A,A=Fr(S,f,!1,c)&&A,h)for(M=0;M<h.length;M++)S=c.g=h[M],A=Fr(S,f,!1,c)&&A}Ee.prototype.N=function(){if(Ee.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)rn(h[f]);delete o.g[c],o.h--}}this.G=null},Ee.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Ee.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Fr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let S=0;S<c.length;++S){const M=c[S];if(M&&!M.da&&M.capture==h){const G=M.listener,le=M.ha||M.src;M.fa&&ai(o.i,M),A=G.call(le,f)!==!1&&A}}return A&&!f.defaultPrevented}function Wd(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Sa(o){o.g=Wd(()=>{o.g=null,o.i&&(o.i=!1,Sa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Gd extends v{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Sa(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xn(o){v.call(this),this.h=o,this.g={}}_(xn,v);var Ca=[];function Ra(o){sn(o.g,function(c,h){this.g.hasOwnProperty(h)&&hi(c)},o),o.g={}}xn.prototype.N=function(){xn.Z.N.call(this),Ra(this)},xn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mi=a.JSON.stringify,Kd=a.JSON.parse,Qd=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Pa(){}function ka(){}var Fn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function pi(){I.call(this,"d")}_(pi,I);function gi(){I.call(this,"c")}_(gi,I);var Mt={},Va=null;function Ur(){return Va=Va||new Ee}Mt.Ia="serverreachability";function Na(o){I.call(this,Mt.Ia,o)}_(Na,I);function Un(o){const c=Ur();be(c,new Na(c))}Mt.STAT_EVENT="statevent";function Da(o,c){I.call(this,Mt.STAT_EVENT,o),this.stat=c}_(Da,I);function Se(o){const c=Ur();be(c,new Da(c,o))}Mt.Ja="timingevent";function La(o,c){I.call(this,Mt.Ja,o),this.size=c}_(La,I);function Bn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function jn(){this.g=!0}jn.prototype.ua=function(){this.g=!1};function Xd(o,c,h,f,A,S){o.info(function(){if(o.g)if(S){var M="",G=S.split("&");for(let Z=0;Z<G.length;Z++){var le=G[Z].split("=");if(le.length>1){const me=le[0];le=le[1];const $e=me.split("_");M=$e.length>=2&&$e[1]=="type"?M+(me+"="+le+"&"):M+(me+"=redacted&")}}}else M=null;else M=S;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+c+`
`+h+`
`+M})}function Jd(o,c,h,f,A,S,M){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+c+`
`+h+`
`+S+" "+M})}function on(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Zd(o,h)+(f?" "+f:"")})}function Yd(o,c){o.info(function(){return"TIMEOUT: "+c})}jn.prototype.info=function(){};function Zd(o,c){if(!o.g)return c;if(!c)return null;try{const S=JSON.parse(c);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var h=S[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var A=f[0];if(A!="noop"&&A!="stop"&&A!="close")for(let M=1;M<f.length;M++)f[M]=""}}}}return mi(S)}catch{return c}}var Br={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ma={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Oa;function _i(){}_(_i,Pa),_i.prototype.g=function(){return new XMLHttpRequest},Oa=new _i;function $n(o){return encodeURIComponent(String(o))}function ef(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function ut(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new xn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new xa}function xa(){this.i=null,this.g="",this.h=!1}var Fa={},yi={};function Ei(o,c,h){o.M=1,o.A=$r(je(c)),o.u=h,o.R=!0,Ua(o,null)}function Ua(o,c){o.F=Date.now(),jr(o),o.B=je(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),Ya(h.i,"t",f),o.C=0,h=o.j.L,o.h=new xa,o.g=gc(o.j,h?c:null,!o.u),o.P>0&&(o.O=new Gd(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(Ca[0]=A.toString()),A=Ca);for(let S=0;S<A.length;S++){const M=va(h,A[S],f||c.handleEvent,!1,c.h||c);if(!M)break;c.g[M.key]=M}c=o.J?Or(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),Un(),Xd(o.i,o.v,o.B,o.l,o.S,o.u)}ut.prototype.ba=function(o){o=o.target;const c=this.O;c&&ft(o)==3?c.j():this.Y(o)},ut.prototype.Y=function(o){try{if(o==this.g)e:{const G=ft(this.g),le=this.g.ya(),Z=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||ic(this.g)))){this.K||G!=4||le==7||(le==8||Z<=0?Un(3):Un(2)),Ii(this);var c=this.g.ca();this.X=c;var h=tf(this);if(this.o=c==200,Jd(this.i,this.v,this.B,this.l,this.S,G,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,A=this.g;if((f=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(f)){var S=f;break t}}S=null}if(o=S)on(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ti(this,o);else{this.o=!1,this.m=3,Se(12),Ot(this),zn(this);break e}}if(this.R){o=!0;let me;for(;!this.K&&this.C<h.length;)if(me=nf(this,h),me==yi){G==4&&(this.m=4,Se(14),o=!1),on(this.i,this.l,null,"[Incomplete Response]");break}else if(me==Fa){this.m=4,Se(15),on(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else on(this.i,this.l,me,null),Ti(this,me);if(Ba(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||h.length!=0||this.h.h||(this.m=1,Se(16),o=!1),this.o=this.o&&o,!o)on(this.i,this.l,h,"[Invalid Chunked Response]"),Ot(this),zn(this);else if(h.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Pi(M),M.P=!0,Se(11))}}else on(this.i,this.l,h,null),Ti(this,h);G==4&&Ot(this),this.o&&!this.K&&(G==4?dc(this.j,this):(this.o=!1,jr(this)))}else _f(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Se(12)):(this.m=0,Se(13)),Ot(this),zn(this)}}}catch{}finally{}};function tf(o){if(!Ba(o))return o.g.la();const c=ic(o.g);if(c==="")return"";let h="";const f=c.length,A=ft(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Ot(o),zn(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<f;S++)o.h.h=!0,h+=o.h.i.decode(c[S],{stream:!(A&&S==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function Ba(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function nf(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?yi:(h=Number(c.substring(h,f)),isNaN(h)?Fa:(f+=1,f+h>c.length?yi:(c=c.slice(f,f+h),o.C=f+h,c)))}ut.prototype.cancel=function(){this.K=!0,Ot(this)};function jr(o){o.T=Date.now()+o.H,ja(o,o.H)}function ja(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=Bn(d(o.aa,o),c)}function Ii(o){o.D&&(a.clearTimeout(o.D),o.D=null)}ut.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Yd(this.i,this.B),this.M!=2&&(Un(),Se(17)),Ot(this),this.m=2,zn(this)):ja(this,this.T-o)};function zn(o){o.j.I==0||o.K||dc(o.j,o)}function Ot(o){Ii(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Ra(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Ti(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||vi(h.h,o))){if(!o.L&&vi(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Gr(h),Hr(h);else break e;Ri(h),Se(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=Bn(d(h.Va,h),6e3));qa(h.h)<=1&&h.ta&&(h.ta=void 0)}else Ft(h,11)}else if((o.L||h.g==o)&&Gr(h),!y(c))for(A=h.Ba.g.parse(c),c=0;c<A.length;c++){let Z=A[c];const me=Z[0];if(!(me<=h.K))if(h.K=me,Z=Z[1],h.I==2)if(Z[0]=="c"){h.M=Z[1],h.ba=Z[2];const $e=Z[3];$e!=null&&(h.ka=$e,h.j.info("VER="+h.ka));const Ut=Z[4];Ut!=null&&(h.za=Ut,h.j.info("SVER="+h.za));const mt=Z[5];mt!=null&&typeof mt=="number"&&mt>0&&(f=1.5*mt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const pt=o.g;if(pt){const Qr=pt.g?pt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qr){var S=f.h;S.g||Qr.indexOf("spdy")==-1&&Qr.indexOf("quic")==-1&&Qr.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(wi(S,S.h),S.h=null))}if(f.G){const ki=pt.g?pt.g.getResponseHeader("X-HTTP-Session-Id"):null;ki&&(f.wa=ki,ee(f.J,f.G,ki))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var M=o;if(f.na=pc(f,f.L?f.ba:null,f.W),M.L){Ha(f.h,M);var G=M,le=f.O;le&&(G.H=le),G.D&&(Ii(G),jr(G)),f.g=M}else uc(f);h.i.length>0&&Wr(h)}else Z[0]!="stop"&&Z[0]!="close"||Ft(h,7);else h.I==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Ft(h,7):Ci(h):Z[0]!="noop"&&h.l&&h.l.qa(Z),h.A=0)}}Un(4)}catch{}}var rf=class{constructor(o,c){this.g=o,this.map=c}};function $a(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function za(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function qa(o){return o.h?1:o.g?o.g.size:0}function vi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function wi(o,c){o.g?o.g.add(c):o.h=c}function Ha(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}$a.prototype.cancel=function(){if(this.i=Wa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Wa(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return C(o.i)}var Ga=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function sf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let A,S=null;f>=0?(A=o[h].substring(0,f),S=o[h].substring(f+1)):A=o[h],c(A,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function ht(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ht?(this.l=o.l,qn(this,o.j),this.o=o.o,this.g=o.g,Hn(this,o.u),this.h=o.h,Ai(this,Za(o.i)),this.m=o.m):o&&(c=String(o).match(Ga))?(this.l=!1,qn(this,c[1]||"",!0),this.o=Wn(c[2]||""),this.g=Wn(c[3]||"",!0),Hn(this,c[4]),this.h=Wn(c[5]||"",!0),Ai(this,c[6]||"",!0),this.m=Wn(c[7]||"")):(this.l=!1,this.i=new Kn(null,this.l))}ht.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Gn(c,Ka,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Gn(c,Ka,!0),"@"),o.push($n(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Gn(h,h.charAt(0)=="/"?cf:af,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Gn(h,uf)),o.join("")},ht.prototype.resolve=function(o){const c=je(this);let h=!!o.j;h?qn(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)Hn(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var A=c.h.lastIndexOf("/");A!=-1&&(f=c.h.slice(0,A+1)+f)}if(A=f,A==".."||A==".")f="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){f=A.lastIndexOf("/",0)==0,A=A.split("/");const S=[];for(let M=0;M<A.length;){const G=A[M++];G=="."?f&&M==A.length&&S.push(""):G==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),f&&M==A.length&&S.push("")):(S.push(G),f=!0)}f=S.join("/")}else f=A}return h?c.h=f:h=o.i.toString()!=="",h?Ai(c,Za(o.i)):h=!!o.m,h&&(c.m=o.m),c};function je(o){return new ht(o)}function qn(o,c,h){o.j=h?Wn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Hn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Ai(o,c,h){c instanceof Kn?(o.i=c,hf(o.i,o.l)):(h||(c=Gn(c,lf)),o.i=new Kn(c,o.l))}function ee(o,c,h){o.i.set(c,h)}function $r(o){return ee(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Wn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,of),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function of(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ka=/[#\/\?@]/g,af=/[#\?:]/g,cf=/[#\?]/g,lf=/[#\?@]/g,uf=/#/g;function Kn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function xt(o){o.g||(o.g=new Map,o.h=0,o.i&&sf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Kn.prototype,n.add=function(o,c){xt(this),this.i=null,o=an(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Qa(o,c){xt(o),c=an(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Xa(o,c){return xt(o),c=an(o,c),o.g.has(c)}n.forEach=function(o,c){xt(this),this.g.forEach(function(h,f){h.forEach(function(A){o.call(c,A,f,this)},this)},this)};function Ja(o,c){xt(o);let h=[];if(typeof c=="string")Xa(o,c)&&(h=h.concat(o.g.get(an(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return xt(this),this.i=null,o=an(this,o),Xa(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=Ja(this,o),o.length>0?String(o[0]):c):c};function Ya(o,c,h){Qa(o,c),h.length>0&&(o.i=null,o.g.set(an(o,c),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const A=$n(h);h=Ja(this,h);for(let S=0;S<h.length;S++){let M=A;h[S]!==""&&(M+="="+$n(h[S])),o.push(M)}}return this.i=o.join("&")};function Za(o){const c=new Kn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function an(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function hf(o,c){c&&!o.j&&(xt(o),o.i=null,o.g.forEach(function(h,f){const A=f.toLowerCase();f!=A&&(Qa(this,f),Ya(this,A,h))},o)),o.j=c}function df(o,c){const h=new jn;if(a.Image){const f=new Image;f.onload=m(dt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=m(dt,h,"TestLoadImage: error",!1,c,f),f.onabort=m(dt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=m(dt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function ff(o,c){const h=new jn,f=new AbortController,A=setTimeout(()=>{f.abort(),dt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(S=>{clearTimeout(A),S.ok?dt(h,"TestPingServer: ok",!0,c):dt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),dt(h,"TestPingServer: error",!1,c)})}function dt(o,c,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function mf(){this.g=new Qd}function bi(o){this.i=o.Sb||null,this.h=o.ab||!1}_(bi,Pa),bi.prototype.g=function(){return new zr(this.i,this.h)};function zr(o,c){Ee.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}_(zr,Ee),n=zr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,Xn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Qn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Xn(this)),this.g&&(this.readyState=3,Xn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ec(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ec(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Qn(this):Xn(this),this.readyState==3&&ec(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Qn(this))},n.Na=function(o){this.g&&(this.response=o,Qn(this))},n.ga=function(){this.g&&Qn(this)};function Qn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Xn(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Xn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(zr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function tc(o){let c="";return sn(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Si(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=tc(h),typeof o=="string"?h!=null&&$n(h):ee(o,c,h))}function se(o){Ee.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}_(se,Ee);var pf=/^https?$/i,gf=["POST","PUT"];n=se.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Oa.g(),this.g.onreadystatechange=T(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(S){nc(this,S);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(gf,c,void 0)>=0)||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,M]of h)this.g.setRequestHeader(S,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){nc(this,S)}};function nc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,rc(o),qr(o)}function rc(o){o.A||(o.A=!0,be(o,"complete"),be(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,be(this,"complete"),be(this,"abort"),qr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qr(this,!0)),se.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?sc(this):this.Xa())},n.Xa=function(){sc(this)};function sc(o){if(o.h&&typeof i<"u"){if(o.v&&ft(o)==4)setTimeout(o.Ca.bind(o),0);else if(be(o,"readystatechange"),ft(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=S===0){let M=String(o.D).match(Ga)[1]||null;!M&&a.self&&a.self.location&&(M=a.self.location.protocol.slice(0,-1)),f=!pf.test(M?M.toLowerCase():"")}h=f}if(h)be(o,"complete"),be(o,"success");else{o.o=6;try{var A=ft(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",rc(o)}}finally{qr(o)}}}}function qr(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||be(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ft(o){return o.g?o.g.readyState:0}n.ca=function(){try{return ft(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Kd(c)}};function ic(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function _f(o){const c={};o=(o.g&&ft(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(y(o[f]))continue;var h=ef(o[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=c[A]||[];c[A]=S,S.push(h)}oi(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Jn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function oc(o){this.za=0,this.i=[],this.j=new jn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Jn("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Jn("baseRetryDelayMs",5e3,o),this.Za=Jn("retryDelaySeedMs",1e4,o),this.Ta=Jn("forwardChannelMaxRetries",2,o),this.va=Jn("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new $a(o&&o.concurrentRequestLimit),this.Ba=new mf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=oc.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,f){Se(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=pc(this,null,this.W),Wr(this)};function Ci(o){if(ac(o),o.I==3){var c=o.V++,h=je(o.J);if(ee(h,"SID",o.M),ee(h,"RID",c),ee(h,"TYPE","terminate"),Yn(o,h),c=new ut(o,o.j,c),c.M=2,c.A=$r(je(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=gc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),jr(c)}mc(o)}function Hr(o){o.g&&(Pi(o),o.g.cancel(),o.g=null)}function ac(o){Hr(o),o.v&&(a.clearTimeout(o.v),o.v=null),Gr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Wr(o){if(!za(o.h)&&!o.m){o.m=!0;var c=o.Ea;O||p(),L||(O(),L=!0),E.add(c,o),o.D=0}}function yf(o,c){return qa(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=Bn(d(o.Ea,o,c),fc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new ut(this,this.j,o);let S=this.o;if(this.U&&(S?(S=Or(S),Ta(S,this.U)):S=this.U),this.u!==null||this.R||(A.J=S,S=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=lc(this,A,c),h=je(this.J),ee(h,"RID",o),ee(h,"CVER",22),this.G&&ee(h,"X-HTTP-Session-Id",this.G),Yn(this,h),S&&(this.R?c="headers="+$n(tc(S))+"&"+c:this.u&&Si(h,this.u,S)),wi(this.h,A),this.Ra&&ee(h,"TYPE","init"),this.S?(ee(h,"$req",c),ee(h,"SID","null"),A.U=!0,Ei(A,h,null)):Ei(A,h,c),this.I=2}}else this.I==3&&(o?cc(this,o):this.i.length==0||za(this.h)||cc(this))};function cc(o,c){var h;c?h=c.l:h=o.V++;const f=je(o.J);ee(f,"SID",o.M),ee(f,"RID",h),ee(f,"AID",o.K),Yn(o,f),o.u&&o.o&&Si(f,o.u,o.o),h=new ut(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=lc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),wi(o.h,h),Ei(h,f,c)}function Yn(o,c){o.H&&sn(o.H,function(h,f){ee(c,f,h)}),o.l&&sn({},function(h,f){ee(c,f,h)})}function lc(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var A=o.i;let G=-1;for(;;){const le=["count="+h];G==-1?h>0?(G=A[0].g,le.push("ofs="+G)):G=0:le.push("ofs="+G);let Z=!0;for(let me=0;me<h;me++){var S=A[me].g;const $e=A[me].map;if(S-=G,S<0)G=Math.max(0,A[me].g-100),Z=!1;else try{S="req"+S+"_"||"";try{var M=$e instanceof Map?$e:Object.entries($e);for(const[Ut,mt]of M){let pt=mt;l(mt)&&(pt=mi(mt)),le.push(S+Ut+"="+encodeURIComponent(pt))}}catch(Ut){throw le.push(S+"type="+encodeURIComponent("_badmap")),Ut}}catch{f&&f($e)}}if(Z){M=le.join("&");break e}}M=void 0}return o=o.i.splice(0,h),c.G=o,M}function uc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;O||p(),L||(O(),L=!0),E.add(c,o),o.A=0}}function Ri(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=Bn(d(o.Da,o),fc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,hc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=Bn(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Se(10),Hr(this),hc(this))};function Pi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function hc(o){o.g=new ut(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=je(o.na);ee(c,"RID","rpc"),ee(c,"SID",o.M),ee(c,"AID",o.K),ee(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&ee(c,"TO",o.ia),ee(c,"TYPE","xmlhttp"),Yn(o,c),o.u&&o.o&&Si(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=$r(je(c)),h.u=null,h.R=!0,Ua(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Hr(this),Ri(this),Se(19))};function Gr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function dc(o,c){var h=null;if(o.g==c){Gr(o),Pi(o),o.g=null;var f=2}else if(vi(o.h,c))h=c.G,Ha(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var A=o.D;f=Ur(),be(f,new La(f,h)),Wr(o)}else uc(o);else if(A=c.m,A==3||A==0&&c.X>0||!(f==1&&yf(o,c)||f==2&&Ri(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),A){case 1:Ft(o,5);break;case 4:Ft(o,10);break;case 3:Ft(o,6);break;default:Ft(o,2)}}}function fc(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function Ft(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const A=!f;f=new ht(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||qn(f,"https"),$r(f),A?df(f.toString(),h):ff(f.toString(),h)}else Se(2);o.I=0,o.l&&o.l.pa(c),mc(o),ac(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))};function mc(o){if(o.I=0,o.ja=[],o.l){const c=Wa(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ja,c),D(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function pc(o,c,h){var f=h instanceof ht?je(h):new ht(h);if(f.g!="")c&&(f.g=c+"."+f.g),Hn(f,f.u);else{var A=a.location;f=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const S=new ht(null);f&&qn(S,f),c&&(S.g=c),A&&Hn(S,A),h&&(S.h=h),f=S}return h=o.G,c=o.wa,h&&c&&ee(f,h,c),ee(f,"VER",o.ka),Yn(o,f),f}function gc(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new se(new bi({ab:h})):new se(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function _c(){}n=_c.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Kr(){}Kr.prototype.g=function(o,c){return new Ne(o,c)};function Ne(o,c){Ee.call(this),this.g=new oc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!y(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!y(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new cn(this)}_(Ne,Ee),Ne.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ne.prototype.close=function(){Ci(this.g)},Ne.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=mi(o),o=h);c.i.push(new rf(c.Ya++,o)),c.I==3&&Wr(c)},Ne.prototype.N=function(){this.g.l=null,delete this.j,Ci(this.g),delete this.g,Ne.Z.N.call(this)};function yc(o){pi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}_(yc,pi);function Ec(){gi.call(this),this.status=1}_(Ec,gi);function cn(o){this.g=o}_(cn,_c),cn.prototype.ra=function(){be(this.g,"a")},cn.prototype.qa=function(o){be(this.g,new yc(o))},cn.prototype.pa=function(o){be(this.g,new Ec)},cn.prototype.oa=function(){be(this.g,"b")},Kr.prototype.createWebChannel=Kr.prototype.g,Ne.prototype.send=Ne.prototype.o,Ne.prototype.open=Ne.prototype.m,Ne.prototype.close=Ne.prototype.close,oh=function(){return new Kr},ih=function(){return Ur()},sh=Mt,io={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Br.NO_ERROR=0,Br.TIMEOUT=8,Br.HTTP_ERROR=6,cs=Br,Ma.COMPLETE="complete",rh=Ma,ka.EventType=Fn,Fn.OPEN="a",Fn.CLOSE="b",Fn.ERROR="c",Fn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.J,rr=ka,se.prototype.listenOnce=se.prototype.K,se.prototype.getLastError=se.prototype.Ha,se.prototype.getLastErrorCode=se.prototype.ya,se.prototype.getStatus=se.prototype.ca,se.prototype.getResponseJson=se.prototype.La,se.prototype.getResponseText=se.prototype.la,se.prototype.send=se.prototype.ea,se.prototype.setWithCredentials=se.prototype.Fa,nh=se}).apply(typeof Yr<"u"?Yr:typeof self<"u"?self:typeof window<"u"?window:{});const Zc="@firebase/firestore",el="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Te.UNAUTHENTICATED=new Te(null),Te.GOOGLE_CREDENTIALS=new Te("google-credentials-uid"),Te.FIRST_PARTY=new Te("first-party-uid"),Te.MOCK_USER=new Te("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Ro("@firebase/firestore");function ln(){return Jt.logLevel}function x(n,...e){if(Jt.logLevel<=K.DEBUG){const t=e.map($o);Jt.debug(`Firestore (${Dn}): ${n}`,...t)}}function at(n,...e){if(Jt.logLevel<=K.ERROR){const t=e.map($o);Jt.error(`Firestore (${Dn}): ${n}`,...t)}}function wn(n,...e){if(Jt.logLevel<=K.WARN){const t=e.map($o);Jt.warn(`Firestore (${Dn}): ${n}`,...t)}}function $o(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ah(n,r,t)}function ah(n,e,t){let r=`FIRESTORE (${Dn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw at(r),new Error(r)}function Y(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||ah(e,s,r)}function W(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends lt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class G_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Te.UNAUTHENTICATED))}shutdown(){}}class K_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Q_{constructor(e){this.t=e,this.currentUser=Te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ct,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ct)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string",31837,{l:r}),new ch(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string",2055,{h:e}),new Te(e)}}class X_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Te.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class J_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new X_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Te.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class tl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Y_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,xe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Y(this.o===void 0,3512);const r=i=>{i.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,x("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new tl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new tl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Z_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function oo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return $i(s)===$i(i)?Q(s,i):$i(s)?1:-1}return Q(n.length,e.length)}const ey=55296,ty=57343;function $i(n){const e=n.charCodeAt(0);return e>=ey&&e<=ty}function An(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl="__name__";class qe{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return qe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof qe?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=qe.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=qe.isNumericId(e),s=qe.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?qe.extractNumericId(e).compare(qe.extractNumericId(t)):oo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return St.fromString(e.substring(4,e.length-2))}}class te extends qe{construct(e,t,r){return new te(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(k.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new te(t)}static emptyPath(){return new te([])}}const ny=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends qe{construct(e,t,r){return new _e(e,t,r)}static isValidIdentifier(e){return ny.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===nl}static keyField(){return new _e([nl])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(k.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new U(k.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(k.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new U(k.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(t)}static emptyPath(){return new _e([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(te.fromString(e))}static fromName(e){return new $(te.fromString(e).popFirst(5))}static empty(){return new $(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new te(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(n,e,t){if(!t)throw new U(k.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function ry(n,e,t,r){if(e===!0&&r===!0)throw new U(k.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function rl(n){if(!$.isDocumentKey(n))throw new U(k.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function sl(n){if($.isDocumentKey(n))throw new U(k.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function uh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function qo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function bn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(k.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=qo(n);throw new U(k.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(n,e){const t={typeString:n};return e&&(t.value=e),t}function Vr(n,e){if(!uh(n))throw new U(k.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(k.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il=-62135596800,ol=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ol);return new ne(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(k.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<il)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(k.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ol}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Vr(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-il;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:ce("string",ne._jsonSchemaVersion),seconds:ce("number"),nanoseconds:ce("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new ne(0,0))}static max(){return new H(new ne(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=-1;function sy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(r===1e9?new ne(t+1,0):new ne(t,r));return new Pt(s,$.empty(),e)}function iy(n){return new Pt(n.readTime,n.key,Ir)}class Pt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Pt(H.min(),$.empty(),Ir)}static max(){return new Pt(H.max(),$.empty(),Ir)}}function oy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class cy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ln(n){if(n.code!==k.FAILED_PRECONDITION||n.message!==ay)throw n;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new R((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof R?t:R.resolve(t)}catch(t){return R.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):R.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):R.reject(t)}static resolve(e){return new R((t,r)=>{t(e)})}static reject(e){return new R((t,r)=>{r(e)})}static waitFor(e){return new R((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=R.resolve(!1);for(const r of e)t=t.next(s=>s?R.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new R((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(m=>{a[d]=m,++l,l===i&&r(a)},m=>s(m))}})}static doWhile(e,t){return new R((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function ly(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Mn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}zs.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho=-1;function qs(n){return n==null}function Ss(n){return n===0&&1/n==-1/0}function uy(n){return typeof n=="number"&&Number.isInteger(n)&&!Ss(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="";function hy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=al(e)),e=dy(n.get(t),e);return al(e)}function dy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case hh:t+="";break;default:t+=i}}return t}function al(n){return n+hh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Zt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function dh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){this.comparator=e,this.root=t||ge.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ge.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zr(this.root,e,this.comparator,!0)}}class Zr{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ge{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??ge.RED,this.left=s??ge.EMPTY,this.right=i??ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new ge(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}ge.EMPTY=null,ge.RED=!0,ge.BLACK=!1;ge.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ll(this.data.getIterator())}getIteratorFrom(e){return new ll(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class ll{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new Ue([])}unionWith(e){let t=new de(_e.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ue(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return An(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new fh("Invalid base64 string: "+i):i}}(e);return new ye(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ye(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ye.EMPTY_BYTE_STRING=new ye("");const fy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kt(n){if(Y(!!n,39018),typeof n=="string"){let e=0;const t=fy.exec(n);if(Y(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vt(n){return typeof n=="string"?ye.fromBase64String(n):ye.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh="server_timestamp",ph="__type__",gh="__previous_value__",_h="__local_write_time__";function Wo(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ph])==null?void 0:r.stringValue)===mh}function Hs(n){const e=n.mapValue.fields[gh];return Wo(e)?Hs(e):e}function Tr(n){const e=kt(n.mapValue.fields[_h].timestampValue);return new ne(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e,t,r,s,i,a,l,u,d,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=m}}const Cs="(default)";class vr{constructor(e,t){this.projectId=e,this.database=t||Cs}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database===Cs}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh="__type__",py="__max__",es={mapValue:{}},Eh="__vector__",Rs="value";function Nt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Wo(n)?4:_y(n)?9007199254740991:gy(n)?10:11:z(28295,{value:n})}function Ye(n,e){if(n===e)return!0;const t=Nt(n);if(t!==Nt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Tr(n).isEqual(Tr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=kt(s.timestampValue),l=kt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Vt(s.bytesValue).isEqual(Vt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ie(s.geoPointValue.latitude)===ie(i.geoPointValue.latitude)&&ie(s.geoPointValue.longitude)===ie(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ie(s.integerValue)===ie(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ie(s.doubleValue),l=ie(i.doubleValue);return a===l?Ss(a)===Ss(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return An(n.arrayValue.values||[],e.arrayValue.values||[],Ye);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(cl(a)!==cl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Ye(a[u],l[u])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function wr(n,e){return(n.values||[]).find(t=>Ye(t,e))!==void 0}function Sn(n,e){if(n===e)return 0;const t=Nt(n),r=Nt(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ie(i.integerValue||i.doubleValue),u=ie(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return ul(n.timestampValue,e.timestampValue);case 4:return ul(Tr(n),Tr(e));case 5:return oo(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Vt(i),u=Vt(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const m=Q(l[d],u[d]);if(m!==0)return m}return Q(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=Q(ie(i.latitude),ie(a.latitude));return l!==0?l:Q(ie(i.longitude),ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return hl(n.arrayValue,e.arrayValue);case 10:return function(i,a){var T,C,D,P;const l=i.fields||{},u=a.fields||{},d=(T=l[Rs])==null?void 0:T.arrayValue,m=(C=u[Rs])==null?void 0:C.arrayValue,_=Q(((D=d==null?void 0:d.values)==null?void 0:D.length)||0,((P=m==null?void 0:m.values)==null?void 0:P.length)||0);return _!==0?_:hl(d,m)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===es.mapValue&&a===es.mapValue)return 0;if(i===es.mapValue)return 1;if(a===es.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},m=Object.keys(d);u.sort(),m.sort();for(let _=0;_<u.length&&_<m.length;++_){const T=oo(u[_],m[_]);if(T!==0)return T;const C=Sn(l[u[_]],d[m[_]]);if(C!==0)return C}return Q(u.length,m.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function ul(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=kt(n),r=kt(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function hl(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Sn(t[s],r[s]);if(i)return i}return Q(t.length,r.length)}function Cn(n){return ao(n)}function ao(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=kt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Vt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ao(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ao(t.fields[a])}`;return s+"}"}(n.mapValue):z(61005,{value:n})}function ls(n){switch(Nt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Hs(n);return e?16+ls(e):16;case 5:return 2*n.stringValue.length;case 6:return Vt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+ls(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Zt(r.fields,(i,a)=>{s+=i.length+ls(a)}),s}(n.mapValue);default:throw z(13486,{value:n})}}function co(n){return!!n&&"integerValue"in n}function Go(n){return!!n&&"arrayValue"in n}function dl(n){return!!n&&"nullValue"in n}function fl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function us(n){return!!n&&"mapValue"in n}function gy(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[yh])==null?void 0:r.stringValue)===Eh}function hr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Zt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=hr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=hr(n.arrayValue.values[t]);return e}return{...n}}function _y(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===py}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this.value=e}static empty(){return new Me({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!us(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=hr(t)}setAll(e){let t=_e.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=hr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());us(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ye(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];us(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Zt(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Me(hr(this.value))}}function Ih(n){const e=[];return Zt(n.fields,(t,r)=>{const s=new _e([t]);if(us(r)){const i=Ih(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ue(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new we(e,0,H.min(),H.min(),H.min(),Me.empty(),0)}static newFoundDocument(e,t,r,s){return new we(e,1,t,H.min(),r,s,0)}static newNoDocument(e,t){return new we(e,2,t,H.min(),H.min(),Me.empty(),0)}static newUnknownDocument(e,t){return new we(e,3,t,H.min(),H.min(),Me.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Me.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Me.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof we&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new we(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,t){this.position=e,this.inclusive=t}}function ml(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=Sn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function pl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ye(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function yy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{}class ue extends Th{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Iy(e,t,r):t==="array-contains"?new wy(e,r):t==="in"?new Ay(e,r):t==="not-in"?new by(e,r):t==="array-contains-any"?new Sy(e,r):new ue(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ty(e,r):new vy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Sn(t,this.value)):t!==null&&Nt(this.value)===Nt(t)&&this.matchesComparison(Sn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends Th{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ze(e,t)}matches(e){return vh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function vh(n){return n.op==="and"}function wh(n){return Ey(n)&&vh(n)}function Ey(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function lo(n){if(n instanceof ue)return n.field.canonicalString()+n.op.toString()+Cn(n.value);if(wh(n))return n.filters.map(e=>lo(e)).join(",");{const e=n.filters.map(t=>lo(t)).join(",");return`${n.op}(${e})`}}function Ah(n,e){return n instanceof ue?function(r,s){return s instanceof ue&&r.op===s.op&&r.field.isEqual(s.field)&&Ye(r.value,s.value)}(n,e):n instanceof Ze?function(r,s){return s instanceof Ze&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Ah(a,s.filters[l]),!0):!1}(n,e):void z(19439)}function bh(n){return n instanceof ue?function(t){return`${t.field.canonicalString()} ${t.op} ${Cn(t.value)}`}(n):n instanceof Ze?function(t){return t.op.toString()+" {"+t.getFilters().map(bh).join(" ,")+"}"}(n):"Filter"}class Iy extends ue{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class Ty extends ue{constructor(e,t){super(e,"in",t),this.keys=Sh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class vy extends ue{constructor(e,t){super(e,"not-in",t),this.keys=Sh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Sh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class wy extends ue{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Go(t)&&wr(t.arrayValue,this.value)}}class Ay extends ue{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&wr(this.value.arrayValue,t)}}class by extends ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(wr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!wr(this.value.arrayValue,t)}}class Sy extends ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Go(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>wr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cy{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function gl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Cy(n,e,t,r,s,i,a)}function Ko(n){const e=W(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>lo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),qs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Cn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Cn(r)).join(",")),e.Te=t}return e.Te}function Qo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!yy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ah(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!pl(n.startAt,e.startAt)&&pl(n.endAt,e.endAt)}function uo(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Ry(n,e,t,r,s,i,a,l){return new Ws(n,e,t,r,s,i,a,l)}function Xo(n){return new Ws(n)}function _l(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Py(n){return n.collectionGroup!==null}function dr(n){const e=W(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new de(_e.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new ks(i,r))}),t.has(_e.keyField().canonicalString())||e.Ie.push(new ks(_e.keyField(),r))}return e.Ie}function We(n){const e=W(n);return e.Ee||(e.Ee=ky(e,dr(n))),e.Ee}function ky(n,e){if(n.limitType==="F")return gl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ks(s.field,i)});const t=n.endAt?new Ps(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ps(n.startAt.position,n.startAt.inclusive):null;return gl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ho(n,e,t){return new Ws(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Gs(n,e){return Qo(We(n),We(e))&&n.limitType===e.limitType}function Ch(n){return`${Ko(We(n))}|lt:${n.limitType}`}function un(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>bh(s)).join(", ")}]`),qs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Cn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Cn(s)).join(",")),`Target(${r})`}(We(n))}; limitType=${n.limitType})`}function Ks(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):$.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of dr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=ml(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,dr(r),s)||r.endAt&&!function(a,l,u){const d=ml(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,dr(r),s))}(n,e)}function Vy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Rh(n){return(e,t)=>{let r=!1;for(const s of dr(n)){const i=Ny(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Ny(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?Sn(u,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Zt(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return dh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dy=new re($.comparator);function ct(){return Dy}const Ph=new re($.comparator);function sr(...n){let e=Ph;for(const t of n)e=e.insert(t.key,t);return e}function kh(n){let e=Ph;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function zt(){return fr()}function Vh(){return fr()}function fr(){return new en(n=>n.toString(),(n,e)=>n.isEqual(e))}const Ly=new re($.comparator),My=new de($.comparator);function X(...n){let e=My;for(const t of n)e=e.add(t);return e}const Oy=new de(Q);function xy(){return Oy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ss(e)?"-0":e}}function Nh(n){return{integerValue:""+n}}function Fy(n,e){return uy(e)?Nh(e):Jo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this._=void 0}}function Uy(n,e,t){return n instanceof Vs?function(s,i){const a={fields:{[ph]:{stringValue:mh},[_h]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Wo(i)&&(i=Hs(i)),i&&(a.fields[gh]=i),{mapValue:a}}(t,e):n instanceof Ar?Lh(n,e):n instanceof br?Mh(n,e):function(s,i){const a=Dh(s,i),l=yl(a)+yl(s.Ae);return co(a)&&co(s.Ae)?Nh(l):Jo(s.serializer,l)}(n,e)}function By(n,e,t){return n instanceof Ar?Lh(n,e):n instanceof br?Mh(n,e):t}function Dh(n,e){return n instanceof Ns?function(r){return co(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Vs extends Qs{}class Ar extends Qs{constructor(e){super(),this.elements=e}}function Lh(n,e){const t=Oh(e);for(const r of n.elements)t.some(s=>Ye(s,r))||t.push(r);return{arrayValue:{values:t}}}class br extends Qs{constructor(e){super(),this.elements=e}}function Mh(n,e){let t=Oh(e);for(const r of n.elements)t=t.filter(s=>!Ye(s,r));return{arrayValue:{values:t}}}class Ns extends Qs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function yl(n){return ie(n.integerValue||n.doubleValue)}function Oh(n){return Go(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function jy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Ar&&s instanceof Ar||r instanceof br&&s instanceof br?An(r.elements,s.elements,Ye):r instanceof Ns&&s instanceof Ns?Ye(r.Ae,s.Ae):r instanceof Vs&&s instanceof Vs}(n.transform,e.transform)}class $y{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Xs{}function xh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Uh(n.key,Ge.none()):new Nr(n.key,n.data,Ge.none());{const t=n.data,r=Me.empty();let s=new de(_e.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new tn(n.key,r,new Ue(s.toArray()),Ge.none())}}function zy(n,e,t){n instanceof Nr?function(s,i,a){const l=s.value.clone(),u=Il(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof tn?function(s,i,a){if(!hs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Il(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Fh(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function mr(n,e,t,r){return n instanceof Nr?function(i,a,l,u){if(!hs(i.precondition,a))return l;const d=i.value.clone(),m=Tl(i.fieldTransforms,u,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof tn?function(i,a,l,u){if(!hs(i.precondition,a))return l;const d=Tl(i.fieldTransforms,u,a),m=a.data;return m.setAll(Fh(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(_=>_.field))}(n,e,t,r):function(i,a,l){return hs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function qy(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Dh(r.transform,s||null);i!=null&&(t===null&&(t=Me.empty()),t.set(r.field,i))}return t||null}function El(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&An(r,s,(i,a)=>jy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Nr extends Xs{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class tn extends Xs{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Fh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Il(n,e,t){const r=new Map;Y(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,By(a,l,t[s]))}return r}function Tl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Uy(i,a,e))}return r}class Uh extends Xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Hy extends Xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&zy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=mr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=mr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Vh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=xh(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&An(this.mutations,e.mutations,(t,r)=>El(t,r))&&An(this.baseMutations,e.baseMutations,(t,r)=>El(t,r))}}class Yo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Y(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Ly}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Yo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe,J;function Qy(n){switch(n){case k.OK:return z(64938);case k.CANCELLED:case k.UNKNOWN:case k.DEADLINE_EXCEEDED:case k.RESOURCE_EXHAUSTED:case k.INTERNAL:case k.UNAVAILABLE:case k.UNAUTHENTICATED:return!1;case k.INVALID_ARGUMENT:case k.NOT_FOUND:case k.ALREADY_EXISTS:case k.PERMISSION_DENIED:case k.FAILED_PRECONDITION:case k.ABORTED:case k.OUT_OF_RANGE:case k.UNIMPLEMENTED:case k.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function Bh(n){if(n===void 0)return at("GRPC error has no .code"),k.UNKNOWN;switch(n){case oe.OK:return k.OK;case oe.CANCELLED:return k.CANCELLED;case oe.UNKNOWN:return k.UNKNOWN;case oe.DEADLINE_EXCEEDED:return k.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return k.RESOURCE_EXHAUSTED;case oe.INTERNAL:return k.INTERNAL;case oe.UNAVAILABLE:return k.UNAVAILABLE;case oe.UNAUTHENTICATED:return k.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return k.INVALID_ARGUMENT;case oe.NOT_FOUND:return k.NOT_FOUND;case oe.ALREADY_EXISTS:return k.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return k.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return k.FAILED_PRECONDITION;case oe.ABORTED:return k.ABORTED;case oe.OUT_OF_RANGE:return k.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return k.UNIMPLEMENTED;case oe.DATA_LOSS:return k.DATA_LOSS;default:return z(39323,{code:n})}}(J=oe||(oe={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=new St([4294967295,4294967295],0);function vl(n){const e=Xy().encode(n),t=new th;return t.update(e),new Uint8Array(t.digest())}function wl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new St([t,r],0),new St([s,i],0)]}class Zo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ir(`Invalid padding: ${t}`);if(r<0)throw new ir(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ir(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ir(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=St.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(St.fromNumber(r)));return s.compare(Jy)===1&&(s=new St([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=vl(e),[r,s]=wl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Zo(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const t=vl(e),[r,s]=wl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ir extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Dr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Js(H.min(),s,new re(Q),ct(),X())}}class Dr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Dr(r,t,X(),X(),X())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class jh{constructor(e,t){this.targetId=e,this.Ce=t}}class $h{constructor(e,t,r=ye.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Al{constructor(){this.ve=0,this.Fe=bl(),this.Me=ye.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}}),new Dr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=bl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Y(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Yy{constructor(e){this.Ge=e,this.ze=new Map,this.je=ct(),this.Je=ts(),this.He=ts(),this.Ye=new re(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(uo(i))if(r===0){const a=new $(i.path);this.et(t,a,we.newNoDocument(a,H.min()))}else Y(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Vt(r).toUint8Array()}catch(u){if(u instanceof fh)return wn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Zo(a,s,i)}catch(u){return wn(u instanceof ir?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const l=this.ot(a);if(l){if(i.current&&uo(l.target)){const u=new $(l.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,we.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=X();this.He.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new Js(e,t,this.Ye,this.je,r);return this.je=ct(),this.Je=ts(),this.He=ts(),this.Ye=new re(Q),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Al,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new de(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new de(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Al),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ts(){return new re($.comparator)}function bl(){return new re($.comparator)}const Zy={asc:"ASCENDING",desc:"DESCENDING"},eE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tE={and:"AND",or:"OR"};class nE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fo(n,e){return n.useProto3Json||qs(e)?e:{value:e}}function Ds(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function rE(n,e){return Ds(n,e.toTimestamp())}function Ke(n){return Y(!!n,49232),H.fromTimestamp(function(t){const r=kt(t);return new ne(r.seconds,r.nanos)}(n))}function ea(n,e){return mo(n,e).canonicalString()}function mo(n,e){const t=function(s){return new te(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function qh(n){const e=te.fromString(n);return Y(Qh(e),10190,{key:e.toString()}),e}function po(n,e){return ea(n.databaseId,e.path)}function zi(n,e){const t=qh(e);if(t.get(1)!==n.databaseId.projectId)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(k.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(Wh(t))}function Hh(n,e){return ea(n.databaseId,e)}function sE(n){const e=qh(n);return e.length===4?te.emptyPath():Wh(e)}function go(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Wh(n){return Y(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Sl(n,e,t){return{name:po(n,e),fields:t.value.mapValue.fields}}function iE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,m){return d.useProto3Json?(Y(m===void 0||typeof m=="string",58123),ye.fromBase64String(m||"")):(Y(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ye.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const m=d.code===void 0?k.UNKNOWN:Bh(d.code);return new U(m,d.message||"")}(a);t=new $h(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=zi(n,r.document.name),i=Ke(r.document.updateTime),a=r.document.createTime?Ke(r.document.createTime):H.min(),l=new Me({mapValue:{fields:r.document.fields}}),u=we.newFoundDocument(s,i,a,l),d=r.targetIds||[],m=r.removedTargetIds||[];t=new ds(d,m,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=zi(n,r.document),i=r.readTime?Ke(r.readTime):H.min(),a=we.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ds([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=zi(n,r.document),i=r.removedTargetIds||[];t=new ds([],i,s,null)}else{if(!("filter"in e))return z(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Ky(s,i),l=r.targetId;t=new jh(l,a)}}return t}function oE(n,e){let t;if(e instanceof Nr)t={update:Sl(n,e.key,e.value)};else if(e instanceof Uh)t={delete:po(n,e.key)};else if(e instanceof tn)t={update:Sl(n,e.key,e.data),updateMask:pE(e.fieldMask)};else{if(!(e instanceof Hy))return z(16599,{Vt:e.type});t={verify:po(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Vs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ar)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof br)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ns)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw z(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:rE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)}(n,e.precondition)),t}function aE(n,e){return n&&n.length>0?(Y(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Ke(s.updateTime):Ke(i);return a.isEqual(H.min())&&(a=Ke(i)),new $y(a,s.transformResults||[])}(t,e))):[]}function cE(n,e){return{documents:[Hh(n,e.path)]}}function lE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Hh(n,s);const i=function(d){if(d.length!==0)return Kh(Ze.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(m=>function(T){return{field:hn(T.field),direction:dE(T.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=fo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function uE(n){let e=sE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Y(r===1,65062);const m=t.from[0];m.allDescendants?s=m.collectionId:e=e.child(m.collectionId)}let i=[];t.where&&(i=function(_){const T=Gh(_);return T instanceof Ze&&wh(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(_){return _.map(T=>function(D){return new ks(dn(D.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(T))}(t.orderBy));let l=null;t.limit&&(l=function(_){let T;return T=typeof _=="object"?_.value:_,qs(T)?null:T}(t.limit));let u=null;t.startAt&&(u=function(_){const T=!!_.before,C=_.values||[];return new Ps(C,T)}(t.startAt));let d=null;return t.endAt&&(d=function(_){const T=!_.before,C=_.values||[];return new Ps(C,T)}(t.endAt)),Ry(e,s,a,i,l,"F",u,d)}function hE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Gh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=dn(t.unaryFilter.field);return ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=dn(t.unaryFilter.field);return ue.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=dn(t.unaryFilter.field);return ue.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=dn(t.unaryFilter.field);return ue.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return ue.create(dn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ze.create(t.compositeFilter.filters.map(r=>Gh(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function dE(n){return Zy[n]}function fE(n){return eE[n]}function mE(n){return tE[n]}function hn(n){return{fieldPath:n.canonicalString()}}function dn(n){return _e.fromServerFormat(n.fieldPath)}function Kh(n){return n instanceof ue?function(t){if(t.op==="=="){if(fl(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NAN"}};if(dl(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(fl(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NOT_NAN"}};if(dl(t.value))return{unaryFilter:{field:hn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:hn(t.field),op:fE(t.op),value:t.value}}}(n):n instanceof Ze?function(t){const r=t.getFilters().map(s=>Kh(s));return r.length===1?r[0]:{compositeFilter:{op:mE(t.op),filters:r}}}(n):z(54877,{filter:n})}function pE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Qh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t,r,s,i=H.min(),a=H.min(),l=ye.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new It(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e){this.yt=e}}function _E(n){const e=uE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ho(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yE{constructor(){this.Cn=new EE}addToCollectionParentIndex(e,t){return this.Cn.add(t),R.resolve()}getCollectionParents(e,t){return R.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return R.resolve()}deleteFieldIndex(e,t){return R.resolve()}deleteAllFieldIndexes(e){return R.resolve()}createTargetIndexes(e,t){return R.resolve()}getDocumentsMatchingTarget(e,t){return R.resolve(null)}getIndexType(e,t){return R.resolve(0)}getFieldIndexes(e,t){return R.resolve([])}getNextCollectionGroupToUpdate(e){return R.resolve(null)}getMinOffset(e,t){return R.resolve(Pt.min())}getMinOffsetFromCollectionGroup(e,t){return R.resolve(Pt.min())}updateCollectionGroup(e,t,r){return R.resolve()}updateIndexEntries(e,t){return R.resolve()}}class EE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new de(te.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new de(te.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Xh=41943040;class ke{static withCacheSize(e){return new ke(e,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke.DEFAULT_COLLECTION_PERCENTILE=10,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ke.DEFAULT=new ke(Xh,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ke.DISABLED=new ke(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Rn(0)}static cr(){return new Rn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="LruGarbageCollector",IE=1048576;function Pl([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class TE{constructor(e){this.Ir=e,this.buffer=new de(Pl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Pl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class vE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){x(Rl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Mn(t)?x(Rl,"Ignoring IndexedDB error during garbage collection: ",t):await Ln(t)}await this.Vr(3e5)})}}class wE{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return R.resolve(zs.ce);const r=new TE(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),R.resolve(Cl)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Cl):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,u,d;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),s=this.params.maximumSequenceNumbersToCollect):s=_,a=Date.now(),this.nthSequenceNumber(e,s))).next(_=>(r=_,l=Date.now(),this.removeTargets(e,r,t))).next(_=>(i=_,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(_=>(d=Date.now(),ln()<=K.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${_} documents in `+(d-u)+`ms
Total Duration: ${d-m}ms`),R.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:_})))}}function AE(n,e){return new wE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.changes=new en(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,we.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?R.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&mr(r.mutation,s,Ue.empty(),ne.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,X()).next(()=>r))}getLocalViewOfDocuments(e,t,r=X()){const s=zt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=sr();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=zt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,X()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=ct();const a=fr(),l=function(){return fr()}();return t.forEach((u,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof tn)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),mr(m.mutation,d,m.mutation.getFieldMask(),ne.now())):a.set(d.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>l.set(d,new SE(m,a.get(d)??null))),l))}recalculateAndSaveOverlays(e,t){const r=fr();let s=new re((a,l)=>a-l),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let m=r.get(u)||Ue.empty();m=l.applyToLocalView(d,m),r.set(u,m);const _=(s.get(l.batchId)||X()).add(u);s=s.insert(l.batchId,_)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,m=u.value,_=Vh();m.forEach(T=>{if(!i.has(T)){const C=xh(t.get(T),r.get(T));C!==null&&_.set(T,C),i=i.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,_))}return R.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Py(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):R.resolve(zt());let l=Ir,u=i;return a.next(d=>R.forEach(d,(m,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),i.get(m)?R.resolve():this.remoteDocumentCache.getEntry(e,m).next(T=>{u=u.insert(m,T)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,X())).next(m=>({batchId:l,changes:kh(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=sr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=sr();return this.indexManager.getCollectionParents(e,i).next(l=>R.forEach(l,u=>{const d=function(_,T){return new Ws(T,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(m=>{m.forEach((_,T)=>{a=a.insert(_,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,we.newInvalidDocument(m)))});let l=sr();return a.forEach((u,d)=>{const m=i.get(u);m!==void 0&&mr(m.mutation,d,Ue.empty(),ne.now()),Ks(t,d)&&(l=l.insert(u,d))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return R.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ke(s.createTime)}}(t)),R.resolve()}getNamedQuery(e,t){return R.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:_E(s.bundledQuery),readTime:Ke(s.readTime)}}(t)),R.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(){this.overlays=new re($.comparator),this.qr=new Map}getOverlay(e,t){return R.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zt();return R.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),R.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),R.resolve()}getOverlaysForCollection(e,t,r){const s=zt(),i=t.length+1,a=new $(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return R.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new re((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=i.get(d.largestBatchId);m===null&&(m=zt(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=zt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,m)=>l.set(d,m)),!(l.size()>=s)););return R.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Gy(t,r));let i=this.qr.get(t);i===void 0&&(i=X(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this.sessionToken=ye.EMPTY_BYTE_STRING}getSessionToken(e){return R.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,R.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(){this.Qr=new de(pe.$r),this.Ur=new de(pe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new pe(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new $(new te([])),r=new pe(t,e),s=new pe(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new $(new te([])),r=new pe(t,e),s=new pe(t,e+1);let i=X();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new pe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return $.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new de(pe.$r)}checkEmpty(e){return R.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Wy(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new pe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return R.resolve(a)}lookupMutationBatch(e,t){return R.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return R.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return R.resolve(this.mutationQueue.length===0?Ho:this.tr-1)}getAllMutationBatches(e){return R.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);i.push(l)}),R.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(Q);return t.forEach(s=>{const i=new pe(s,0),a=new pe(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],l=>{r=r.add(l.Yr)})}),R.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;$.isDocumentKey(i)||(i=i.child(""));const a=new pe(new $(i),0);let l=new de(Q);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.Yr)),!0)},a),R.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Y(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return R.forEach(t.mutations,s=>{const i=new pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new pe(t,0),s=this.Zr.firstAfterOrEqual(r);return R.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,R.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e){this.ri=e,this.docs=function(){return new re($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return R.resolve(r?r.document.mutableCopy():we.newInvalidDocument(t))}getEntries(e,t){let r=ct();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():we.newInvalidDocument(s))}),R.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ct();const a=t.path,l=new $(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:m}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||oy(iy(m),r)<=0||(s.has(m.key)||Ks(t,m))&&(i=i.insert(m.key,m.mutableCopy()))}return R.resolve(i)}getAllFromCollectionGroup(e,t,r,s){z(9500)}ii(e,t){return R.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new DE(this)}getSize(e){return R.resolve(this.size)}}class DE extends bE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),R.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e){this.persistence=e,this.si=new en(t=>Ko(t),Qo),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new ta,this.targetCount=0,this.ai=Rn.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),R.resolve()}getLastRemoteSnapshotVersion(e){return R.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return R.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),R.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),R.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Rn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,R.resolve()}updateTargetData(e,t){return this.Pr(t),R.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,R.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),R.waitFor(i).next(()=>s)}getTargetCount(e){return R.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return R.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),R.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),R.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),R.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return R.resolve(r)}containsKey(e,t){return R.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jh{constructor(e,t){this.ui={},this.overlays={},this.ci=new zs(0),this.li=!1,this.li=!0,this.hi=new kE,this.referenceDelegate=e(this),this.Pi=new LE(this),this.indexManager=new yE,this.remoteDocumentCache=function(s){return new NE(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new gE(t),this.Ii=new RE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new PE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new VE(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);const s=new ME(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return R.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class ME extends cy{constructor(e){super(),this.currentSequenceNumber=e}}class na{constructor(e){this.persistence=e,this.Ri=new ta,this.Vi=null}static mi(e){return new na(e)}get fi(){if(this.Vi)return this.Vi;throw z(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),R.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),R.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),R.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return R.forEach(this.fi,r=>{const s=$.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return R.or([()=>R.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ls{constructor(e,t){this.persistence=e,this.pi=new en(r=>hy(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=AE(this,t)}static mi(e,t){return new Ls(e,t)}Ei(){}di(e){return R.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return R.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?R.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(l=>{l||(r++,i.removeEntry(a,H.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),R.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),R.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ls(e.data.value)),t}br(e,t,r){return R.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return R.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ra(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Cm()?8:ly(Ae())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new OE;return this.Ss(e,t,a).next(l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(ln()<=K.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",un(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),R.resolve()):(ln()<=K.DEBUG&&x("QueryEngine","Query:",un(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(ln()<=K.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",un(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,We(t))):R.resolve())}ys(e,t){if(_l(t))return R.resolve(null);let r=We(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ho(t,null,"F"),r=We(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=X(...i);return this.ps.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.Ds(t,l);return this.Cs(t,d,a,u.readTime)?this.ys(e,ho(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,r,s){return _l(t)||s.isEqual(H.min())?R.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?R.resolve(null):(ln()<=K.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),un(t)),this.vs(e,a,t,sy(s,Ir)).next(l=>l))})}Ds(e,t){let r=new de(Rh(e));return t.forEach((s,i)=>{Ks(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return ln()<=K.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",un(t)),this.ps.getDocumentsMatchingQuery(e,t,Pt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="LocalStore",FE=3e8;class UE{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new re(Q),this.xs=new en(i=>Ko(i),Qo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new CE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function BE(n,e,t,r){return new UE(n,e,t,r)}async function Yh(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=X();for(const d of s){a.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}for(const d of i){l.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:l}))})})}function jE(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,d,m){const _=d.batch,T=_.keys();let C=R.resolve();return T.forEach(D=>{C=C.next(()=>m.getEntry(u,D)).next(P=>{const V=d.docVersions.get(D);Y(V!==null,48541),P.version.compareTo(V)<0&&(_.applyToRemoteDocument(P,d),P.isValidDocument()&&(P.setReadTime(d.commitVersion),m.addEntry(P)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(u,_))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=X();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Zh(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function $E(n,e){const t=W(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach((m,_)=>{const T=s.get(_);if(!T)return;l.push(t.Pi.removeMatchingKeys(i,m.removedDocuments,_).next(()=>t.Pi.addMatchingKeys(i,m.addedDocuments,_)));let C=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(_)!==null?C=C.withResumeToken(ye.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,r)),s=s.insert(_,C),function(P,V,F){return P.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=FE?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0}(T,C,m)&&l.push(t.Pi.updateTargetData(i,C))});let u=ct(),d=X();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,m))}),l.push(zE(i,a,e.documentUpdates).next(m=>{u=m.ks,d=m.qs})),!r.isEqual(H.min())){const m=t.Pi.getLastRemoteSnapshotVersion(i).next(_=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(m)}return R.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=s,i))}function zE(n,e,t){let r=X(),s=X();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ct();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(H.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):x(sa,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:s}})}function qE(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ho),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function HE(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,R.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new It(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function _o(n,e,t){const r=W(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Mn(a))throw a;x(sa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function kl(n,e,t){const r=W(n);let s=H.min(),i=X();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,m){const _=W(u),T=_.xs.get(m);return T!==void 0?R.resolve(_.Ms.get(T)):_.Pi.getTargetData(d,m)}(r,a,We(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:H.min(),t?i:X())).next(l=>(WE(r,Vy(e),l),{documents:l,Qs:i})))}function WE(n,e,t){let r=n.Os.get(e)||H.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class Vl{constructor(){this.activeTargetIds=xy()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class GE{constructor(){this.Mo=new Vl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Vl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl="ConnectivityMonitor";class Dl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){x(Nl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){x(Nl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns=null;function yo(){return ns===null?ns=function(){return 268435456+Math.round(2147483648*Math.random())}():ns++,"0x"+ns.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi="RestConnection",QE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class XE{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Cs?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=yo(),l=this.zo(e,t.toUriEncodedString());x(qi,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:d}=new URL(l),m=kn(d);return this.Jo(e,l,u,r,m).then(_=>(x(qi,`Received RPC '${e}' ${a}: `,_),_),_=>{throw wn(qi,`RPC '${e}' ${a} failed with error: `,_,"url: ",l,"request:",r),_})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Dn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=QE[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie="WebChannelConnection";class YE extends XE{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=yo();return new Promise((l,u)=>{const d=new nh;d.setWithCredentials(!0),d.listenOnce(rh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case cs.NO_ERROR:const _=d.getResponseJson();x(Ie,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(_)),l(_);break;case cs.TIMEOUT:x(Ie,`RPC '${e}' ${a} timed out`),u(new U(k.DEADLINE_EXCEEDED,"Request time out"));break;case cs.HTTP_ERROR:const T=d.getStatus();if(x(Ie,`RPC '${e}' ${a} failed with status:`,T,"response text:",d.getResponseText()),T>0){let C=d.getResponseJson();Array.isArray(C)&&(C=C[0]);const D=C==null?void 0:C.error;if(D&&D.status&&D.message){const P=function(F){const j=F.toLowerCase().replace(/_/g,"-");return Object.values(k).indexOf(j)>=0?j:k.UNKNOWN}(D.status);u(new U(P,D.message))}else u(new U(k.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new U(k.UNAVAILABLE,"Connection failed."));break;default:z(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{x(Ie,`RPC '${e}' ${a} completed.`)}});const m=JSON.stringify(s);x(Ie,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",m,r,15)})}T_(e,t,r){const s=yo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=oh(),l=ih(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const m=i.join("");x(Ie,`Creating RPC '${e}' stream ${s}: ${m}`,u);const _=a.createWebChannel(m,u);this.I_(_);let T=!1,C=!1;const D=new JE({Yo:V=>{C?x(Ie,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(T||(x(Ie,`Opening RPC '${e}' stream ${s} transport.`),_.open(),T=!0),x(Ie,`RPC '${e}' stream ${s} sending:`,V),_.send(V))},Zo:()=>_.close()}),P=(V,F,j)=>{V.listen(F,B=>{try{j(B)}catch(N){setTimeout(()=>{throw N},0)}})};return P(_,rr.EventType.OPEN,()=>{C||(x(Ie,`RPC '${e}' stream ${s} transport opened.`),D.o_())}),P(_,rr.EventType.CLOSE,()=>{C||(C=!0,x(Ie,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(_))}),P(_,rr.EventType.ERROR,V=>{C||(C=!0,wn(Ie,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),D.a_(new U(k.UNAVAILABLE,"The operation could not be completed")))}),P(_,rr.EventType.MESSAGE,V=>{var F;if(!C){const j=V.data[0];Y(!!j,16349);const B=j,N=(B==null?void 0:B.error)||((F=B[0])==null?void 0:F.error);if(N){x(Ie,`RPC '${e}' stream ${s} received error:`,N);const O=N.status;let L=function(g){const v=oe[g];if(v!==void 0)return Bh(v)}(O),E=N.message;L===void 0&&(L=k.INTERNAL,E="Unknown error status: "+O+" with message "+N.message),C=!0,D.a_(new U(L,E)),_.close()}else x(Ie,`RPC '${e}' stream ${s} received:`,j),D.u_(j)}}),P(l,sh.STAT_EVENT,V=>{V.stat===io.PROXY?x(Ie,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===io.NOPROXY&&x(Ie,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.__()},0),D}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Hi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(n){return new nE(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&x("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll="PersistentStream";class td{constructor(e,t,r,s,i,a,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ed(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===k.RESOURCE_EXHAUSTED?(at(t.toString()),at("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===k.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new U(k.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return x(Ll,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(x(Ll,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ZE extends td{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=iE(this.serializer,e),r=function(i){if(!("targetChange"in i))return H.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?Ke(a.readTime):H.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=go(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=uo(u)?{documents:cE(i,u)}:{query:lE(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=zh(i,a.resumeToken);const d=fo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(H.min())>0){l.readTime=Ds(i,a.snapshotVersion.toTimestamp());const d=fo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=hE(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=go(this.serializer),t.removeTarget=e,this.q_(t)}}class eI extends td{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Y(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Y(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=aE(e.writeResults,e.commitTime),r=Ke(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=go(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>oE(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{}class nI extends tI{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,mo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(k.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(e,mo(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===k.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(k.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class rI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(at(t),this.aa=!1):x("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="RemoteStore";class sI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{nn(this)&&(x(Yt,"Restarting streams for network reachability change."),await async function(u){const d=W(u);d.Ea.add(4),await Lr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Zs(d)}(this))})}),this.Ra=new rI(r,s)}}async function Zs(n){if(nn(n))for(const e of n.da)await e(!0)}async function Lr(n){for(const e of n.da)await e(!1)}function nd(n,e){const t=W(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ca(t)?aa(t):On(t).O_()&&oa(t,e))}function ia(n,e){const t=W(n),r=On(t);t.Ia.delete(e),r.O_()&&rd(t,e),t.Ia.size===0&&(r.O_()?r.L_():nn(t)&&t.Ra.set("Unknown"))}function oa(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}On(n).Y_(e)}function rd(n,e){n.Va.Ue(e),On(n).Z_(e)}function aa(n){n.Va=new Yy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),On(n).start(),n.Ra.ua()}function ca(n){return nn(n)&&!On(n).x_()&&n.Ia.size>0}function nn(n){return W(n).Ea.size===0}function sd(n){n.Va=void 0}async function iI(n){n.Ra.set("Online")}async function oI(n){n.Ia.forEach((e,t)=>{oa(n,e)})}async function aI(n,e){sd(n),ca(n)?(n.Ra.ha(e),aa(n)):n.Ra.set("Unknown")}async function cI(n,e,t){if(n.Ra.set("Online"),e instanceof $h&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))}(n,e)}catch(r){x(Yt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ms(n,r)}else if(e instanceof ds?n.Va.Ze(e):e instanceof jh?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await Zh(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const m=i.Ia.get(d);m&&i.Ia.set(d,m.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const m=i.Ia.get(u);if(!m)return;i.Ia.set(u,m.withResumeToken(ye.EMPTY_BYTE_STRING,m.snapshotVersion)),rd(i,u);const _=new It(m.target,u,d,m.sequenceNumber);oa(i,_)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){x(Yt,"Failed to raise snapshot:",r),await Ms(n,r)}}async function Ms(n,e,t){if(!Mn(e))throw e;n.Ea.add(1),await Lr(n),n.Ra.set("Offline"),t||(t=()=>Zh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x(Yt,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Zs(n)})}function id(n,e){return e().catch(t=>Ms(n,t,e))}async function ei(n){const e=W(n),t=Dt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ho;for(;lI(e);)try{const s=await qE(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,uI(e,s)}catch(s){await Ms(e,s)}od(e)&&ad(e)}function lI(n){return nn(n)&&n.Ta.length<10}function uI(n,e){n.Ta.push(e);const t=Dt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function od(n){return nn(n)&&!Dt(n).x_()&&n.Ta.length>0}function ad(n){Dt(n).start()}async function hI(n){Dt(n).ra()}async function dI(n){const e=Dt(n);for(const t of n.Ta)e.ea(t.mutations)}async function fI(n,e,t){const r=n.Ta.shift(),s=Yo.from(r,e,t);await id(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ei(n)}async function mI(n,e){e&&Dt(n).X_&&await async function(r,s){if(function(a){return Qy(a)&&a!==k.ABORTED}(s.code)){const i=r.Ta.shift();Dt(r).B_(),await id(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ei(r)}}(n,e),od(n)&&ad(n)}async function Ml(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),x(Yt,"RemoteStore received new credentials");const r=nn(t);t.Ea.add(3),await Lr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Zs(t)}async function pI(n,e){const t=W(n);e?(t.Ea.delete(2),await Zs(t)):e||(t.Ea.add(2),await Lr(t),t.Ra.set("Unknown"))}function On(n){return n.ma||(n.ma=function(t,r,s){const i=W(t);return i.sa(),new ZE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:iI.bind(null,n),t_:oI.bind(null,n),r_:aI.bind(null,n),H_:cI.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),ca(n)?aa(n):n.Ra.set("Unknown")):(await n.ma.stop(),sd(n))})),n.ma}function Dt(n){return n.fa||(n.fa=function(t,r,s){const i=W(t);return i.sa(),new eI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:hI.bind(null,n),r_:mI.bind(null,n),ta:dI.bind(null,n),na:fI.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await ei(n)):(await n.fa.stop(),n.Ta.length>0&&(x(Yt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new la(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(k.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ua(n,e){if(at("AsyncQueue",`${e}: ${n}`),Mn(n))return new U(k.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{static emptySet(e){return new En(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=sr(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof En)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new En;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.ga=new re($.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):z(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Pn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new Pn(e,t,En.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Gs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class _I{constructor(){this.queries=xl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=W(t),i=s.queries;s.queries=xl(),i.forEach((a,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new U(k.ABORTED,"Firestore shutting down"))}}function xl(){return new en(n=>Ch(n),Gs)}async function yI(n,e){const t=W(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new gI,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=ua(a,`Initialization of query '${un(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&ha(t)}async function EI(n,e){const t=W(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function II(n,e){const t=W(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&ha(t)}function TI(n,e,t){const r=W(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function ha(n){n.Ca.forEach(e=>{e.next()})}var Eo,Fl;(Fl=Eo||(Eo={})).Ma="default",Fl.Cache="cache";class vI{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Pn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Pn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Eo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(e){this.key=e}}class ld{constructor(e){this.key=e}}class wI{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=X(),this.mutatedKeys=X(),this.eu=Rh(e),this.tu=new En(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Ol,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((m,_)=>{const T=s.get(m),C=Ks(this.query,_)?_:null,D=!!T&&this.mutatedKeys.has(T.key),P=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let V=!1;T&&C?T.data.isEqual(C.data)?D!==P&&(r.track({type:3,doc:C}),V=!0):this.su(T,C)||(r.track({type:2,doc:C}),V=!0,(u&&this.eu(C,u)>0||d&&this.eu(C,d)<0)&&(l=!0)):!T&&C?(r.track({type:0,doc:C}),V=!0):T&&!C&&(r.track({type:1,doc:T}),V=!0,(u||d)&&(l=!0)),V&&(C?(a=a.add(C),i=P?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((m,_)=>function(C,D){const P=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{Rt:V})}};return P(C)-P(D)}(m.type,_.type)||this.eu(m.doc,_.doc)),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new Pn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ol,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=X(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new ld(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new cd(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=X();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Pn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const da="SyncEngine";class AI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class bI{constructor(e){this.key=e,this.hu=!1}}class SI{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new en(l=>Ch(l),Gs),this.Iu=new Map,this.Eu=new Set,this.du=new re($.comparator),this.Au=new Map,this.Ru=new ta,this.Vu={},this.mu=new Map,this.fu=Rn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function CI(n,e,t=!0){const r=pd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await ud(r,e,t,!0),s}async function RI(n,e){const t=pd(n);await ud(t,e,!0,!1)}async function ud(n,e,t,r){const s=await HE(n.localStore,We(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await PI(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&nd(n.remoteStore,s),l}async function PI(n,e,t,r,s){n.pu=(_,T,C)=>async function(P,V,F,j){let B=V.view.ru(F);B.Cs&&(B=await kl(P.localStore,V.query,!1).then(({documents:E})=>V.view.ru(E,B)));const N=j&&j.targetChanges.get(V.targetId),O=j&&j.targetMismatches.get(V.targetId)!=null,L=V.view.applyChanges(B,P.isPrimaryClient,N,O);return Bl(P,V.targetId,L.au),L.snapshot}(n,_,T,C);const i=await kl(n.localStore,e,!0),a=new wI(e,i.Qs),l=a.ru(i.documents),u=Dr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Bl(n,t,d.au);const m=new AI(e,t,a);return n.Tu.set(e,m),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function kI(n,e,t){const r=W(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!Gs(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await _o(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ia(r.remoteStore,s.targetId),Io(r,s.targetId)}).catch(Ln)):(Io(r,s.targetId),await _o(r.localStore,s.targetId,!0))}async function VI(n,e){const t=W(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ia(t.remoteStore,r.targetId))}async function NI(n,e,t){const r=UI(n);try{const s=await function(a,l){const u=W(a),d=ne.now(),m=l.reduce((C,D)=>C.add(D.key),X());let _,T;return u.persistence.runTransaction("Locally write mutations","readwrite",C=>{let D=ct(),P=X();return u.Ns.getEntries(C,m).next(V=>{D=V,D.forEach((F,j)=>{j.isValidDocument()||(P=P.add(F))})}).next(()=>u.localDocuments.getOverlayedDocuments(C,D)).next(V=>{_=V;const F=[];for(const j of l){const B=qy(j,_.get(j.key).overlayedDocument);B!=null&&F.push(new tn(j.key,B,Ih(B.value.mapValue),Ge.exists(!0)))}return u.mutationQueue.addMutationBatch(C,d,F,l)}).next(V=>{T=V;const F=V.applyToLocalDocumentSet(_,P);return u.documentOverlayCache.saveOverlays(C,V.batchId,F)})}).then(()=>({batchId:T.batchId,changes:kh(_)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new re(Q)),d=d.insert(l,u),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await Mr(r,s.changes),await ei(r.remoteStore)}catch(s){const i=ua(s,"Failed to persist write");t.reject(i)}}async function hd(n,e){const t=W(n);try{const r=await $E(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(Y(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Y(a.hu,14607):s.removedDocuments.size>0&&(Y(a.hu,42227),a.hu=!1))}),await Mr(t,r,e)}catch(r){await Ln(r)}}function Ul(n,e,t){const r=W(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=W(a);u.onlineState=l;let d=!1;u.queries.forEach((m,_)=>{for(const T of _.Sa)T.va(l)&&(d=!0)}),d&&ha(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function DI(n,e,t){const r=W(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new re($.comparator);a=a.insert(i,we.newNoDocument(i,H.min()));const l=X().add(i),u=new Js(H.min(),new Map,new re(Q),a,l);await hd(r,u),r.du=r.du.remove(i),r.Au.delete(e),fa(r)}else await _o(r.localStore,e,!1).then(()=>Io(r,e,t)).catch(Ln)}async function LI(n,e){const t=W(n),r=e.batch.batchId;try{const s=await jE(t.localStore,e);fd(t,r,null),dd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Mr(t,s)}catch(s){await Ln(s)}}async function MI(n,e,t){const r=W(n);try{const s=await function(a,l){const u=W(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return u.mutationQueue.lookupMutationBatch(d,l).next(_=>(Y(_!==null,37113),m=_.keys(),u.mutationQueue.removeMutationBatch(d,_))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,m,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>u.localDocuments.getDocuments(d,m))})}(r.localStore,e);fd(r,e,t),dd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Mr(r,s)}catch(s){await Ln(s)}}function dd(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function fd(n,e,t){const r=W(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Io(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||md(n,r)})}function md(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(ia(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),fa(n))}function Bl(n,e,t){for(const r of t)r instanceof cd?(n.Ru.addReference(r.key,e),OI(n,r)):r instanceof ld?(x(da,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||md(n,r.key)):z(19791,{wu:r})}function OI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(x(da,"New document in limbo: "+t),n.Eu.add(r),fa(n))}function fa(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new $(te.fromString(e)),r=n.fu.next();n.Au.set(r,new bI(t)),n.du=n.du.insert(t,r),nd(n.remoteStore,new It(We(Xo(t.path)),r,"TargetPurposeLimboResolution",zs.ce))}}async function Mr(n,e,t){const r=W(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{a.push(r.pu(u,e,t).then(d=>{var m;if((d||t)&&r.isPrimaryClient){const _=d?!d.fromCache:(m=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(d){s.push(d);const _=ra.As(u.targetId,d);i.push(_)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(u,d){const m=W(u);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>R.forEach(d,T=>R.forEach(T.Es,C=>m.persistence.referenceDelegate.addReference(_,T.targetId,C)).next(()=>R.forEach(T.ds,C=>m.persistence.referenceDelegate.removeReference(_,T.targetId,C)))))}catch(_){if(!Mn(_))throw _;x(sa,"Failed to update sequence numbers: "+_)}for(const _ of d){const T=_.targetId;if(!_.fromCache){const C=m.Ms.get(T),D=C.snapshotVersion,P=C.withLastLimboFreeSnapshotVersion(D);m.Ms=m.Ms.insert(T,P)}}}(r.localStore,i))}async function xI(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){x(da,"User change. New user:",e.toKey());const r=await Yh(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new U(k.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Mr(t,r.Ls)}}function FI(n,e){const t=W(n),r=t.Au.get(e);if(r&&r.hu)return X().add(r.key);{let s=X();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function pd(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=hd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=FI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=DI.bind(null,e),e.Pu.H_=II.bind(null,e.eventManager),e.Pu.yu=TI.bind(null,e.eventManager),e}function UI(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=LI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=MI.bind(null,e),e}class Os{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ys(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return BE(this.persistence,new xE,e.initialUser,this.serializer)}Cu(e){return new Jh(na.mi,this.serializer)}Du(e){return new GE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Os.provider={build:()=>new Os};class BI extends Os{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Y(this.persistence.referenceDelegate instanceof Ls,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new vE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ke.withCacheSize(this.cacheSizeBytes):ke.DEFAULT;return new Jh(r=>Ls.mi(r,t),this.serializer)}}class To{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ul(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=xI.bind(null,this.syncEngine),await pI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new _I}()}createDatastore(e){const t=Ys(e.databaseInfo.databaseId),r=function(i){return new YE(i)}(e.databaseInfo);return function(i,a,l,u){return new nI(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new sI(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Ul(this.syncEngine,t,0),function(){return Dl.v()?new Dl:new KE}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,m){const _=new SI(s,i,a,l,u,d);return m&&(_.gu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=W(s);x(Yt,"RemoteStore shutting down."),i.Ea.add(5),await Lr(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}To.provider={build:()=>new To};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):at("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="FirestoreClient";class $I{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Te.UNAUTHENTICATED,this.clientId=zo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{x(Lt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(x(Lt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ua(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Wi(n,e){n.asyncQueue.verifyOperationInProgress(),x(Lt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Yh(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function jl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await zI(n);x(Lt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ml(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ml(e.remoteStore,s)),n._onlineComponents=e}async function zI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x(Lt,"Using user provided OfflineComponentProvider");try{await Wi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===k.FAILED_PRECONDITION||s.code===k.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;wn("Error using user provided cache. Falling back to memory cache: "+t),await Wi(n,new Os)}}else x(Lt,"Using default OfflineComponentProvider"),await Wi(n,new BI(void 0));return n._offlineComponents}async function gd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x(Lt,"Using user provided OnlineComponentProvider"),await jl(n,n._uninitializedComponentsProvider._online)):(x(Lt,"Using default OnlineComponentProvider"),await jl(n,new To))),n._onlineComponents}function qI(n){return gd(n).then(e=>e.syncEngine)}async function HI(n){const e=await gd(n),t=e.eventManager;return t.onListen=CI.bind(null,e.syncEngine),t.onUnlisten=kI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=RI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=VI.bind(null,e.syncEngine),t}function WI(n,e,t={}){const r=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const m=new jI({next:T=>{m.Nu(),a.enqueueAndForget(()=>EI(i,_));const C=T.docs.has(l);!C&&T.fromCache?d.reject(new U(k.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&T.fromCache&&u&&u.source==="server"?d.reject(new U(k.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),_=new vI(Xo(l.path),m,{includeMetadataChanges:!0,qa:!0});return yI(i,_)}(await HI(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd="firestore.googleapis.com",zl=!0;class ql{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(k.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=yd,this.ssl=zl}else this.host=e.host,this.ssl=e.ssl??zl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Xh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<IE)throw new U(k.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ry("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_d(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new U(k.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ti{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ql({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(k.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(k.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ql(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new G_;switch(r.type){case"firstParty":return new J_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(k.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=$l.get(t);r&&(x("ComponentProvider","Removing Datastore"),$l.delete(t),r.terminate())}(this),Promise.resolve()}}function GI(n,e,t,r={}){var d;n=bn(n,ti);const s=kn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(gu(`https://${l}`),_u("Firestore",!0)),i.host!==yd&&i.host!==l&&wn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!Kt(u,a)&&(n._setSettings(u),r.mockUserToken)){let m,_;if(typeof r.mockUserToken=="string")m=r.mockUserToken,_=Te.MOCK_USER;else{m=ym(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new U(k.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new Te(T)}n._authCredentials=new K_(new ch(m,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ma(this.firestore,e,this._query)}}class he{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Vr(t,he._jsonSchema))return new he(e,r||null,new $(te.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:ce("string",he._jsonSchemaVersion),referencePath:ce("string")};class Rt extends ma{constructor(e,t,r){super(e,t,Xo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new $(e))}withConverter(e){return new Rt(this.firestore,e,this._path)}}function KI(n,e,...t){if(n=Ve(n),lh("collection","path",e),n instanceof ti){const r=te.fromString(e,...t);return sl(r),new Rt(n,null,r)}{if(!(n instanceof he||n instanceof Rt))throw new U(k.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return sl(r),new Rt(n.firestore,null,r)}}function ni(n,e,...t){if(n=Ve(n),arguments.length===1&&(e=zo.newId()),lh("doc","path",e),n instanceof ti){const r=te.fromString(e,...t);return rl(r),new he(n,null,new $(r))}{if(!(n instanceof he||n instanceof Rt))throw new U(k.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return rl(r),new he(n.firestore,n instanceof Rt?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl="AsyncQueue";class Wl{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ed(this,"async_queue_retry"),this._c=()=>{const r=Hi();r&&x(Hl,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Hi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Hi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ct;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Mn(e))throw e;x(Hl,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,at("INTERNAL UNHANDLED ERROR: ",Gl(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=la.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&z(47125,{Pc:Gl(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Gl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class ri extends ti{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Wl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Wl(e),this._firestoreClient=void 0,await e}}}function QI(n,e){const t=typeof n=="object"?n:Tu(),r=typeof n=="string"?n:Cs,s=ko(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=gm("firestore");i&&GI(s,...i)}return s}function Ed(n){if(n._terminated)throw new U(k.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||XI(n),n._firestoreClient}function XI(n){var r,s,i;const e=n._freezeSettings(),t=function(l,u,d,m){return new my(l,u,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,_d(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new $I(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Oe(ye.fromBase64String(e))}catch(t){throw new U(k.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Oe(ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Oe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Vr(e,Oe._jsonSchema))return Oe.fromBase64String(e.bytes)}}Oe._jsonSchemaVersion="firestore/bytes/1.0",Oe._jsonSchema={type:ce("string",Oe._jsonSchemaVersion),bytes:ce("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(k.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(k.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(k.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Qe._jsonSchemaVersion}}static fromJSON(e){if(Vr(e,Qe._jsonSchema))return new Qe(e.latitude,e.longitude)}}Qe._jsonSchemaVersion="firestore/geoPoint/1.0",Qe._jsonSchema={type:ce("string",Qe._jsonSchemaVersion),latitude:ce("number"),longitude:ce("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Xe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Vr(e,Xe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Xe(e.vectorValues);throw new U(k.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Xe._jsonSchemaVersion="firestore/vectorValue/1.0",Xe._jsonSchema={type:ce("string",Xe._jsonSchemaVersion),vectorValues:ce("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI=/^__.*__$/;class YI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new tn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Nr(e,this.data,t,this.fieldTransforms)}}function Td(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{Ac:n})}}class ga{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ga({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return xs(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Td(this.Ac)&&JI.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class ZI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ys(e)}Cc(e,t,r,s=!1){return new ga({Ac:e,methodName:t,Dc:r,path:_e.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function vd(n){const e=n._freezeSettings(),t=Ys(n._databaseId);return new ZI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function wd(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);Cd("Data must be an object, but it was:",a,r);const l=bd(r,a);let u,d;if(i.merge)u=new Ue(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const _ of i.mergeFields){const T=eT(e,_,t);if(!a.contains(T))throw new U(k.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);nT(m,T)||m.push(T)}u=new Ue(m),d=a.fieldTransforms.filter(_=>u.covers(_.field))}else u=null,d=a.fieldTransforms;return new YI(new Me(l),u,d)}function Ad(n,e){if(Sd(n=Ve(n)))return Cd("Unsupported field value:",e,n),bd(n,e);if(n instanceof Id)return function(r,s){if(!Td(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=Ad(l,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ve(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Fy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ne.fromDate(r);return{timestampValue:Ds(s.serializer,i)}}if(r instanceof ne){const i=new ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ds(s.serializer,i)}}if(r instanceof Qe)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Oe)return{bytesValue:zh(s.serializer,r._byteString)};if(r instanceof he){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ea(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Xe)return function(a,l){return{mapValue:{fields:{[yh]:{stringValue:Eh},[Rs]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return Jo(l.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${qo(r)}`)}(n,e)}function bd(n,e){const t={};return dh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Zt(n,(r,s)=>{const i=Ad(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Sd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof Qe||n instanceof Oe||n instanceof he||n instanceof Id||n instanceof Xe)}function Cd(n,e,t){if(!Sd(t)||!uh(t)){const r=qo(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function eT(n,e,t){if((e=Ve(e))instanceof pa)return e._internalPath;if(typeof e=="string")return Rd(n,e);throw xs("Field path arguments must be of type string or ",n,!1,void 0,t)}const tT=new RegExp("[~\\*/\\[\\]]");function Rd(n,e,t){if(e.search(tT)>=0)throw xs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new pa(...e.split("."))._internalPath}catch{throw xs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function xs(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(k.INVALID_ARGUMENT,l+n+u)}function nT(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new rT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(kd("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class rT extends Pd{data(){return super.data()}}function kd(n,e){return typeof e=="string"?Rd(n,e):e instanceof pa?e._internalPath:e._delegate._internalPath}class sT{convertValue(e,t="none"){switch(Nt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Zt(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Rs].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ie(a.doubleValue));return new Xe(t)}convertGeoPoint(e){return new Qe(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Hs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Tr(e));default:return null}}convertTimestamp(e){const t=kt(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=te.fromString(e);Y(Qh(r),9688,{name:e});const s=new vr(r.get(1),r.get(3)),i=new $(r.popFirst(5));return s.isEqual(t)||at(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vd(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class or{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Gt extends Pd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new fs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(kd("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(k.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Gt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Gt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Gt._jsonSchema={type:ce("string",Gt._jsonSchemaVersion),bundleSource:ce("string","DocumentSnapshot"),bundleName:ce("string"),bundle:ce("string")};class fs extends Gt{data(e={}){return super.data(e)}}class pr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new or(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new fs(this._firestore,this._userDataWriter,r.key,r,new or(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(k.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new fs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new or(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new fs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new or(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:iT(l.type),doc:u,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(k.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=pr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function iT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(n){n=bn(n,he);const e=bn(n.firestore,ri);return WI(Ed(e),n._key).then(t=>lT(e,n,t))}pr._jsonSchemaVersion="firestore/querySnapshot/1.0",pr._jsonSchema={type:ce("string",pr._jsonSchemaVersion),bundleSource:ce("string","QuerySnapshot"),bundleName:ce("string"),bundle:ce("string")};class oT extends sT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Oe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}function aT(n,e,t){n=bn(n,he);const r=bn(n.firestore,ri),s=Vd(n.converter,e,t);return Dd(r,[wd(vd(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ge.none())])}function cT(n,e){const t=bn(n.firestore,ri),r=ni(n),s=Vd(n.converter,e);return Dd(t,[wd(vd(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ge.exists(!1))]).then(()=>r)}function Dd(n,e){return function(r,s){const i=new Ct;return r.asyncQueue.enqueueAndForget(async()=>NI(await qI(r),s,i)),i.promise}(Ed(n),e)}function lT(n,e,t){const r=t.docs.get(e._key),s=new oT(n);return new Gt(n,s,e._key,r,new or(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Dn=s})(Vn),Tn(new Qt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new ri(new Q_(r.getProvider("auth-internal")),new Y_(a,r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(k.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(d.options.projectId,m)}(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),bt(Zc,el,e),bt(Zc,el,"esm2020")})();const uT={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},Ld=Iu(uT),Tt=H_(Ld);zu(Tt,Uo).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const si=QI(Ld),hT=new nt,dT="./data.csv";window.initUI=$d;window.setGridSize=ms;document.addEventListener("DOMContentLoaded",()=>{mT(),pT(),IT(),ar(b.currentTab),ya(),ET(),TT(),vT(),MT()});const Zn="./images/",fT="./icons/",tt=new Map;function vo(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['’]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const Kl={Light_Stick__Any_Color:"Blue_Light_Stick"},Md="arc_collection_v1";function mT(){try{const n=localStorage.getItem(Md);if(n){const e=JSON.parse(n);Array.isArray(e)?b.collectedItems=new Set(e):(e.collected&&(b.collectedItems=new Set(e.collected)),e.wishlist&&(b.wishlistedItems=new Set(e.wishlist)))}}catch(n){console.error("Failed to load collection state:",n)}}function Od(){try{const n={collected:Array.from(b.collectedItems),wishlist:Array.from(b.wishlistedItems)};localStorage.setItem(Md,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const xd="arc_filters_v1";function Re(){try{const n={rarities:Array.from(b.filters.rarities),types:Array.from(b.filters.types),maps:Array.from(b.filters.maps),conds:Array.from(b.filters.conds),confs:Array.from(b.filters.confs),collected:b.filters.collected,sort:b.filters.sort};localStorage.setItem(xd,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function pT(){try{const n=localStorage.getItem(xd);if(n){const e=JSON.parse(n);e.rarities&&(b.filters.rarities=new Set(e.rarities)),e.types&&(b.filters.types=new Set(e.types)),e.maps&&(b.filters.maps=new Set(e.maps)),e.conds&&(b.filters.conds=new Set(e.conds)),e.confs&&(b.filters.confs=new Set(e.confs)),e.collected&&(b.filters.collected=e.collected),e.sort&&(b.filters.sort=e.sort)}}catch(n){console.error("Failed to load filters:",n)}}function Fd(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(s=>s.remove());const t=b.collectedItems.has(e),r=b.wishlistedItems.has(e);if(t){const s=document.createElement("div");s.className="collected-badge",s.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(s);const i=document.createElement("div");i.className="collected-glow",n.appendChild(i)}else if(r){const s=document.createElement("div");s.className="wishlist-badge",s.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(s);const i=document.createElement("div");i.className="wishlist-glow",n.appendChild(i)}if(b.currentTab==="collection"){let s="",i="",a=!1;if(t?(s='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',i="Click to Wishlist",a=!0):r?(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i="Click To Unwishlist",a=!0):(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',i="Click to Collect",a=!0),a){const l=document.createElement("div");l.className="collection-hint",l.innerHTML=`
          <div class="collection-hint-icon">${s}</div>
          <div class="collection-hint-text">${i}</div>
        `,(t||r)&&l.classList.add("hint-hidden"),n.appendChild(l)}}}function gT(n,e){b.collectedItems.has(n)?(b.collectedItems.delete(n),b.wishlistedItems.add(n),_a()):b.wishlistedItems.has(n)?b.wishlistedItems.delete(n):(b.collectedItems.add(n),b.currentTab==="collection"&&AT(n)),Od(),PT(),Fd(e,n),Ud()}function Ud(){if(!document.getElementById("collectionProgressContainer"))return;const e=b.all.length,t=b.collectedItems.size,r=e>0?Math.round(t/e*100):0,s=document.getElementById("progressPercent"),i=document.getElementById("progressCount");s&&(s.textContent=`${r}%`),i&&(i.textContent=`${t} / ${e}`);const a=document.getElementById("progressBar");if(a){a.style.width=`${r}%`;const l=Math.floor(r*1.2);a.style.backgroundColor=`hsl(${l}, 80%, 50%)`,a.style.backgroundImage="none"}}function _T(n,e,t,r){if(!n)return;let s=null;const i=a=>{s||(s=a);const l=Math.min((a-s)/r,1),u=Math.floor(l*(t-e)+e);n.textContent=`${u}%`,l<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const r=document.getElementById("progressBar"),s=document.getElementById("progressPercent"),i=b.all.length,a=b.collectedItems.size,l=i>0?Math.round(a/i*100):0;r&&(r.style.transition="none",r.style.width="0%",r.style.backgroundColor="hsl(0, 80%, 50%)"),s&&(s.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{r&&(r.style.transition="width 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 2.5s linear",Ud()),s&&_T(s,0,l,2500)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function wo(){if(Tt.currentUser)try{const n=ni(si,"users",Tt.currentUser.uid);await aT(n,{collectedItems:Array.from(b.collectedItems),wishlistedItems:Array.from(b.wishlistedItems),lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function yT(n){try{console.log("Loading collection from cloud...");const e=ni(si,"users",n.uid),t=await Nd(e);if(t.exists()){const r=t.data();let s=!1;if(r.collectedItems){const i=new Set(r.collectedItems),a=b.collectedItems.size;i.forEach(l=>b.collectedItems.add(l)),b.collectedItems.size>a&&(s=!0)}if(r.wishlistedItems){const i=new Set(r.wishlistedItems),a=b.wishlistedItems.size;i.forEach(l=>b.wishlistedItems.add(l)),b.wishlistedItems.size>a&&(s=!0)}s&&(console.log("Cloud sync merged new items."),Od(),ae(),wo())}else console.log("No cloud data found for user. Creating initial sync..."),wo()}catch(e){console.error("Loading from cloud failed:",e)}}function ET(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),r=document.getElementById("logoutBtnMobile"),s=async()=>{try{console.log("Attempting Google Sign-in..."),await zu(Tt,Uo),await e_(Tt,hT),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert("This domain is not authorized for Firebase Auth. Check your Firebase Console settings."):alert("Sign-in failed: "+a.message)}},i=()=>Mg(Tt).catch(console.error);n&&(n.onclick=s),e&&(e.onclick=s),t&&(t.onclick=i),r&&(r.onclick=i),Lg(Tt,a=>{document.getElementById("authSection");const l=document.getElementById("userProfile");document.getElementById("authSectionMobile");const u=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),l&&l.classList.remove("hidden"),u&&u.classList.remove("hidden");const d=document.getElementById("userPhoto"),m=document.getElementById("userName"),_=document.getElementById("userPhotoMobile"),T=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),m&&(m.textContent=a.displayName||"Explorer"),_&&(_.src=a.photoURL||""),T&&(T.textContent=a.displayName||"Explorer"),yT(a)}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),l&&l.classList.add("hidden"),u&&u.classList.add("hidden")})}function ar(n){b.currentTab=n,window.scrollTo(0,0);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabCollection"),r=document.querySelectorAll(".collection-only"),s=document.querySelectorAll(".blueprints-only:not(#eventBanner)"),i=document.getElementById("eventBanner");n==="blueprints"?(e.classList.add("tab-button-active"),t.classList.remove("tab-button-active"),document.body.classList.remove("collection-mode"),r.forEach(a=>a.classList.add("hidden")),s.forEach(a=>a.classList.remove("hidden")),!Ao&&i&&i.classList.contains("banner-active")&&i.classList.remove("hidden")):(e.classList.remove("tab-button-active"),t.classList.add("tab-button-active"),document.body.classList.add("collection-mode"),r.forEach(a=>a.classList.remove("hidden")),s.forEach(a=>a.classList.add("hidden")),i&&i.classList.add("hidden")),ae()}function IT(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabCollection"),t=document.getElementById("logoHome"),r=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>ar("blueprints")),e&&(e.onclick=()=>ar("collection")),t&&(t.onclick=()=>ar("blueprints")),r&&(r.onclick=()=>ar("blueprints"))}let Ao=!1;function TT(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;Nd(ni(si,"siteConfig","banner")).then(r=>{if(r.exists()){const s=r.data();s.active&&s.text&&t&&n&&(t.innerHTML=s.text,n.classList.add("banner-active"),!Ao&&b.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(r=>console.debug("Banner fetch skipped",r)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),Ao=!0})}let qt=null,Fs=null;function vT(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),r=document.getElementById("closeSubmitModal"),s=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>Ql()),e&&(e.onclick=()=>{_a(),Fs&&Ql(Fs)}),r&&(r.onclick=()=>bo()),t&&(t.onclick=i=>{i.target===t&&bo()}),s&&(s.onsubmit=async i=>{i.preventDefault(),await bT()})}function wT(){const n=document.getElementById("submitBlueprintName");if(!(!n||!b.all||b.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of b.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function Ql(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");wT(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function bo(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),r=document.getElementById("submitQuestReward");t&&(t.checked=!1),r&&(r.checked=!1)}Fs=null}function AT(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),r=document.getElementById("collectToastProgress");!e||!t||!r||(qt&&(clearTimeout(qt),qt=null),Fs=n,t.textContent=`${n} Blueprint collected? Tell us where!`,r.classList.remove("animate"),r.offsetWidth,r.classList.add("animate"),e.classList.remove("hidden"),qt=setTimeout(()=>{_a()},1e4))}function _a(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress");n&&n.classList.add("hidden"),e&&e.classList.remove("animate"),qt&&(clearTimeout(qt),qt=null)}async function bT(){var u,d,m,_,T,C,D,P;const n=(u=document.getElementById("submitBlueprintName"))==null?void 0:u.value,e=(d=document.getElementById("submitMap"))==null?void 0:d.value,t=(m=document.getElementById("submitCondition"))==null?void 0:m.value,r=(_=document.getElementById("submitLocation"))==null?void 0:_.value,s=(T=document.getElementById("submitContainer"))==null?void 0:T.value,i=((C=document.getElementById("submitTrialsReward"))==null?void 0:C.checked)||!1,a=((D=document.getElementById("submitQuestReward"))==null?void 0:D.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}if(!(e||t||r||s||i||a)){alert("Please provide at least one detail (Map, Condition, Location, Container, or Reward Type).");return}try{await cT(KI(si,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:t||"",location:r||"",container:s||"",trialsReward:i,questReward:a,submittedAt:new Date().toISOString(),userId:((P=Tt.currentUser)==null?void 0:P.uid)||"anonymous"}),bo(),ST()}catch(V){console.error("Error submitting blueprint location:",V),alert("Failed to submit. Please try again.")}}function ST(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function CT(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=vo(t);const r=vo((e||"").trim());if(Kl[r]){const i=Kl[r];if(tt.has(i))return Zn+tt.get(i);for(const[a,l]of tt.entries())if(a.startsWith(i))return Zn+l}const s=[t.toLowerCase(),r.toLowerCase()];for(const i of s)if(i&&tt.has(i))return Zn+tt.get(i);for(const i of s)if(i){for(const[a,l]of tt.entries())if(a===i||a.startsWith(i))return Zn+l}return r?Zn+r+".webp":""}const De={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function RT(n,e){let t;return function(...r){const s=this;clearTimeout(t),t=setTimeout(()=>n.apply(s,r),e)}}const PT=RT(wo,2e3),Ht={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},Bd={Confirmed:Ht.Legendary.color,"Very High":Ht.Epic.color,Confident:Ht.Rare.color,Low:Ht.Uncommon.color,"Not Enough Data":"#E11D48"},kT=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function ze(n){return fT+encodeURIComponent(n)}function ms(n){const e=Math.max(De.min,Math.min(De.max,Number(n)||De.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(De.storageKey,String(e))}catch{}const r=document.getElementById("gridSizeLabel"),s=document.getElementById("gridSizeLabelMobile");r&&(r.textContent=`${e}px`),s&&(s.textContent=`${e}px`)}function VT(){try{const n=localStorage.getItem(De.storageKey);return n?Number(n):window.innerWidth<=768?120:De.default}catch{return window.innerWidth<=768?120:De.default}}function jd(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return ze("ItemCategory_Weapon.webp");if(t==="grenade")return ze("ItemCategory_Grenade.webp");if(t==="quickuse")return ze("ItemCategory_QuickUse.webp");if(t==="mod")return ze("ItemCategory_Mod.webp");if(t==="augment")return ze("ItemCategory_Augment.webp");if(t==="material")return ze("ItemCategory_Material.webp");if(t==="misc")return ze("ItemCategory_Misc.webp");for(const r of kT)if(r.re.test(e))return ze(r.file);return ze("ItemCategory_Misc.webp")}function NT(n){const e=Ce(n);return e?/^https?:\/\//i.test(e)?e:ze(e):""}function Ce(n){return(n??"").toString().trim()}function ps(n){return Ce(n).toLowerCase()}function Pe(n,e){const t=n.map(r=>ps(r));for(const r of e){const s=t.indexOf(ps(r));if(s!==-1)return n[s]}for(const r of e){const s=ps(r),i=t.findIndex(a=>a.includes(s));if(i!==-1)return n[i]}return null}function DT(n){const e=Ce(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(Ht[t])return t;const r={Legend:"Legendary",Leg:"Legendary"};return r[t]?r[t]:t}function jt(n){var e;return((e=Ht[n])==null?void 0:e.color)||"#3f3f46"}function mn(n){var e;return((e=Ht[n])==null?void 0:e.rank)||0}const b={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]}};function LT(){return new URL(window.location.href).searchParams.get("csv")||dT}function rs(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function $d(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),r=document.getElementById("drawerBackdrop");function s(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const N=!n.classList.contains("hidden");n.classList.toggle("hidden"),N?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=s);const l=document.getElementById("mobileFilterBtn");l&&(l.onclick=a),t&&(t.onclick=i),r&&(r.onclick=i);const u=document.getElementById("searchInput"),d=document.getElementById("searchInputMobile"),m=N=>{b.filters.search=N,ae()};u&&u.addEventListener("input",N=>m(N.target.value)),d&&d.addEventListener("input",N=>{m(N.target.value),u&&(u.value=N.target.value)});const _=document.getElementById("sortSelect"),T=document.getElementById("sortSelectMobile"),C=N=>{b.filters.sort=N,_&&(_.value=N),T&&(T.value=N),ae(),Re()};_&&(_.onchange=N=>C(N.target.value)),T&&(T.onchange=N=>C(N.target.value));const D=()=>{b.filters.rarities.clear(),b.filters.types.clear(),b.filters.maps.clear(),b.filters.conds.clear(),b.filters.confs.clear(),b.filters.search="",b.filters.sort="rarity_desc",u&&(u.value=""),d&&(d.value=""),_&&(_.value="rarity_desc"),T&&(T.value="rarity_desc"),b.filters.collected="all",ae(),ve(),ya(),Re()};["resetBtn","resetBtn2","resetBtnMobile"].forEach(N=>{const O=document.getElementById(N);O&&(O.onclick=D)});const P=(N,O)=>{const L=document.getElementById(N);L&&(L.onclick=()=>{O.clear(),ae(),ve(),Re()})};P("rarityAllBtn",b.filters.rarities),P("typeAllBtn",b.filters.types),P("mapAllBtn",b.filters.maps),P("condAllBtn",b.filters.conds),P("confAllBtn",b.filters.confs),P("rarityAllBtnMobile",b.filters.rarities),P("typeAllBtnMobile",b.filters.types),P("mapAllBtnMobile",b.filters.maps),P("condAllBtnMobile",b.filters.conds),P("confAllBtnMobile",b.filters.confs);const V=document.getElementById("gridSize"),F=document.getElementById("gridSizeMobile"),j=VT();ms(j),V&&(V.min=String(De.min),V.max=String(De.max),V.step=String(De.step),V.value=String(j),V.addEventListener("input",N=>{const O=N.target.value;F&&(F.value=O),ms(O)})),F&&(F.min=String(De.min),F.max=String(De.max),F.step=String(De.step),F.value=String(j),F.addEventListener("input",N=>{const O=N.target.value;V&&(V.value=O),ms(O)}));const B=(N,O,L)=>{const E=document.getElementById(N),p=document.getElementById(O),g=document.getElementById(L);E&&p&&g&&(E.onclick=()=>{p.classList.toggle("hidden"),g.classList.toggle("rotate-180")})};B("toggleRarity","rarityFilters","iconRarity"),B("toggleType","typeFilters","iconType"),B("toggleMap","mapFilters","iconMap"),B("toggleCond","condFilters","iconCond"),B("toggleConf","confFilters","iconConf"),B("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),B("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),B("toggleMapMobile","mapFiltersMobile","iconMapMobile"),B("toggleCondMobile","condFiltersMobile","iconCondMobile"),B("toggleConfMobile","confFiltersMobile","iconConfMobile")}async function MT(){rs("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const r=await t.json();tt.clear();for(const s of r){const a=s.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),l=vo(a).toLowerCase();tt.set(l,s)}console.log(`Loaded ${tt.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}rs("Fetching sheet...");let n=LT();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var N;const t=e.data||[],r=((N=e.meta)==null?void 0:N.fields)||Object.keys(t[0]||{}),s=Pe(r,["Blueprint Name","Item Name","Name","Item"]),i=Pe(r,["Item Type","Type"]),a=Pe(r,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),l=Pe(r,["Most Likely Map","Map"]),u=Pe(r,["Most Likely Condition","Condition"]),d=Pe(r,["Most Likely Location","Location"]),m=Pe(r,["Most Likely Container","Container"]),_=Pe(r,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),T=Pe(r,["Rarity","Item Rarity"]),C=Pe(r,["Data Confidence","Confidence"]),D=Pe(r,["Item URL","Wiki URL","URL","Link","Wiki"])||r[7],P=Pe(r,["Trials Reward","Trial Reward","Trials"])||r[9],V=Pe(r,["Quest Reward","Quest"])||r[10],F=Pe(r,["Description","Desc","Flavor Text"])||r[11],j=O=>{const L=Ce(O).toLowerCase();return L==="true"||L==="yes"||L==="1"||L==="x"||L==="✓"};b.columns={name:s,type:i,typeIcon:a,map:l,cond:u,loc:d,cont:m,img:_,rarity:T,conf:C,wiki:D};const B=[];for(const O of t){const L=Ce(O[s]);if(!L)continue;const E=Ce(O[i]),p=Ce(O[l]),g=Ce(O[u]),v=Ce(O[d]),I=Ce(O[m]),w=Ce(O[_]),y=CT(w,L),fe=DT(O[T]),et=C?Ce(O[C]):"",ii=Ce(O[D]),rn=(a?NT(O[a]):"")||jd(E),sn=P?j(O[P]):!1,oi=V?j(O[V]):!1,Or=F?Ce(O[F]):"";B.push({name:L,type:E,map:p,cond:g,loc:v,cont:I,img:y,rarity:fe,conf:et,wiki:ii,typeIcon:rn,trialsReward:sn,questReward:oi,description:Or})}b.all=B,OT(),$d(),ae(),ve(),rs(`${B.length} items • live from Sheets`)},error:e=>{console.error(e),rs("Failed to load CSV. Check your published link.")}})}function er(n){const e=new Set(n.filter(t=>Ce(t)));return Array.from(e).sort((t,r)=>t.localeCompare(r))}const Xl=["Confirmed","Very High","Confident","Low","Not Enough Data"],Jl=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];function OT(){b.facets.rarities=er(b.all.map(n=>n.rarity)).sort((n,e)=>mn(e)-mn(n)),b.facets.types=er(b.all.map(n=>n.type)).sort((n,e)=>{let t=Jl.indexOf(n),r=Jl.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r||n.localeCompare(e)}),b.facets.maps=er(b.all.map(n=>n.map)),b.facets.conds=er(b.all.map(n=>n.cond)),b.facets.confs=er(b.all.map(n=>n.conf)).sort((n,e)=>{let t=Xl.indexOf(n),r=Xl.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r})}function tr(n,e){n.has(e)?n.delete(e):n.add(e)}function Yl(n,e,t){const r=document.createElement("button");return r.className="chip "+(e?"chip-active":""),r.textContent=n,r.onclick=t,r}function ve(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of b.facets.rarities){const r=b.filters.rarities.has(t),s=jt(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=r?s+"66":s+"22";i.style.background=a,i.style.borderColor=s,i.style.color="#f4f4f5",i.onclick=()=>{tr(b.filters.rarities,t),ae(),ve(),Re()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of b.facets.types){const r=b.filters.types.has(t),s=document.createElement("button");s.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",s.style.borderColor=r?"rgb(113 113 122)":"rgb(39 39 42)",s.title=t,s.onclick=()=>{tr(b.filters.types,t),ae(),ve(),Re()};const i=document.createElement("img");i.src=jd(t),i.alt=t,i.className="w-6 h-6",s.appendChild(i),e.appendChild(s)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of b.facets.maps){const r=b.filters.maps.has(t);e.appendChild(Yl(t,r,()=>{tr(b.filters.maps,t),ae(),ve(),Re()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of b.facets.conds){const r=b.filters.conds.has(t);e.appendChild(Yl(t,r,()=>{tr(b.filters.conds,t),ae(),ve(),Re()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of b.facets.confs){if(!t)continue;const r=b.filters.confs.has(t),s=Bd[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=r?s:"rgb(39 39 42)",i.style.background=r?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{tr(b.filters.confs,t),ae(),ve(),Re()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=s;const l=document.createElement("span");l.textContent=t,i.appendChild(a),i.appendChild(l),e.appendChild(i)}}xT()}function xT(){const n=document.getElementById("activeChips");if(!n)return;n.innerHTML="";const e=(t,r)=>{const s=document.createElement("button");s.className="chip chip-active",s.textContent=t+" ✕",s.onclick=r,n.appendChild(s)};if(b.filters.rarities.size&&e(`Rarity: ${Array.from(b.filters.rarities).join(", ")}`,()=>{b.filters.rarities.clear(),ae(),ve(),Re()}),b.filters.types.size&&e(`Type: ${Array.from(b.filters.types).join(", ")}`,()=>{b.filters.types.clear(),ae(),ve(),Re()}),b.filters.maps.size&&e(`Map: ${Array.from(b.filters.maps).join(", ")}`,()=>{b.filters.maps.clear(),ae(),ve(),Re()}),b.filters.conds.size&&e(`Condition: ${Array.from(b.filters.conds).join(", ")}`,()=>{b.filters.conds.clear(),ae(),ve(),Re()}),b.filters.confs.size&&e(`Confidence: ${Array.from(b.filters.confs).join(", ")}`,()=>{b.filters.confs.clear(),ae(),ve(),Re()}),b.filters.collected!=="all"){let t="Collected";b.filters.collected==="not-collected"&&(t="Not Collected"),b.filters.collected==="wishlist"&&(t="Wishlist"),e(`Status: ${t}`,()=>{b.filters.collected="all",ae(),ve(),ya(),Re()})}b.filters.search.trim()&&e(`Search: ${b.filters.search.trim()}`,()=>{b.filters.search="";const t=document.getElementById("searchInput"),r=document.getElementById("searchInputMobile");t&&(t.value=""),r&&(r.value=""),ae(),ve()})}function ae(){const n=ps(b.filters.search),e=b.filters.rarities.size>0,t=b.filters.types.size>0,r=b.filters.maps.size>0,s=b.filters.conds.size>0,i=b.filters.confs.size>0;let a=b.all.filter(u=>{if(e&&!b.filters.rarities.has(u.rarity)||t&&!b.filters.types.has(u.type)||r&&!b.filters.maps.has(u.map)||s&&!b.filters.conds.has(u.cond)||i&&!b.filters.confs.has(u.conf))return!1;const d=b.collectedItems.has(u.name),m=b.wishlistedItems.has(u.name);return!(b.filters.collected==="collected"&&!d||b.filters.collected==="wishlist"&&!m||b.filters.collected==="not-collected"&&d||n&&!(u.name+" "+u.type+" "+u.map+" "+u.cond+" "+u.loc+" "+u.cont).toLowerCase().includes(n))});const l=b.filters.sort;a.sort((u,d)=>l==="name_asc"?u.name.localeCompare(d.name):l==="name_desc"?d.name.localeCompare(u.name):l==="type_asc"?(u.type||"").localeCompare(d.type||""):l==="rarity_desc"?mn(d.rarity)-mn(u.rarity)||u.name.localeCompare(d.name):l==="rarity_asc"&&mn(u.rarity)-mn(d.rarity)||u.name.localeCompare(d.name)),b.filtered=a,FT()}function FT(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${b.filtered.length} / ${b.all.length}`),b.filtered.length)n.classList.remove("hidden"),e&&e.classList.add("hidden");else{n.classList.add("hidden"),e&&e.classList.remove("hidden");return}const r=[];for(const s of b.filtered){const i=document.createElement("div");i.className="card-compact bg-zinc-950 border border-zinc-800 rounded-2xl p-2 opacity-0",i.style.position="relative",i.style.overflow="visible";const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=jt(s.rarity);const l=document.createElement("div");l.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",l.style.background=`
      linear-gradient(to top right, ${jt(s.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,l.style.backgroundSize="cover, cover, cover",l.style.backgroundPosition="center, center, center",l.style.backgroundBlendMode="normal, normal, normal",l.style.aspectRatio="1 / 1",l.style.width="100%";const u=document.createElement("img");u.src=s.img||"",u.alt=s.name,u.className="w-full h-full object-contain p-2 relative z-10",u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",u.style.padding="8px",u.loading="lazy",i.style.transition="transform 0.2s",i.addEventListener("mouseenter",()=>Li(u,{scale:1.1})),i.addEventListener("mouseleave",()=>Li(u,{scale:1}));const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${jt(s.rarity)}66 60%, ${jt(s.rarity)}cc 100%)`;const m=document.createElement("div");m.className="type-tab",m.style.background=jt(s.rarity)+"22",m.style.borderColor=jt(s.rarity);const _=document.createElement("img");_.src=s.typeIcon,_.alt=s.type;const T=document.createElement("span");T.className="",T.textContent=s.type||"—",m.appendChild(_),m.appendChild(T),l.appendChild(u),l.appendChild(d),l.appendChild(m);const C=document.createElement("div");C.className="mt-2 px-1 pb-1";const D=document.createElement("div");D.className="font-semibold leading-tight",D.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",D.textContent=s.name,C.appendChild(D);const P=document.createElement("div");P.className="details-overlay hidden";const V=document.createElement("div");V.className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 mb-3";const F=document.createElement("div");F.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",F.textContent="Most Likely Spawn",V.appendChild(F);let j=!1;const B=(N,O)=>{if(!O||O==="N/A")return null;const L=document.createElement("div");L.className="details-row";const E=document.createElement("div");E.className="details-label",E.textContent=N;const p=document.createElement("div");return p.className="details-value",p.textContent=O,L.appendChild(E),L.appendChild(p),L};if([B("Map",s.map),B("Location",s.loc),B("Container",s.cont),B("Condition",s.cond)].filter(Boolean).forEach(N=>{V.appendChild(N),j=!0}),j&&P.appendChild(V),s.conf){const N=document.createElement("div");N.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Data Confidence";const L=document.createElement("div");L.className="details-value details-confidence";const E=document.createElement("span");E.className="confidence-dot",E.style.background=Bd[s.conf]||"#71717a";const p=document.createElement("span");p.textContent=s.conf,L.appendChild(E),L.appendChild(p),N.appendChild(O),N.appendChild(L),P.appendChild(N)}if(s.trialsReward){const N=document.createElement("div");N.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Trials Reward";const L=document.createElement("div");L.className="details-value",L.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',N.appendChild(O),N.appendChild(L),P.appendChild(N)}if(s.questReward){const N=document.createElement("div");N.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Quest Reward";const L=document.createElement("div");L.className="details-value",L.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',N.appendChild(O),N.appendChild(L),P.appendChild(N)}if(s.description){const N=document.createElement("div");N.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Description";const L=document.createElement("div");L.className="details-value",L.textContent=s.description,L.classList.add("italic"),N.appendChild(O),N.appendChild(L),P.appendChild(N)}if(s.wiki){const N=document.createElement("a");N.href=s.wiki,N.target="_blank",N.rel="noreferrer",N.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",N.textContent="Item URL",P.appendChild(N)}a.style.cursor="pointer",a.onclick=N=>{N.stopPropagation();const O=!P.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(L=>{if(L!==P){L.classList.add("hidden"),L.style.transform="";const E=L.closest(".card-compact");E&&(E.classList.remove("card-open"),E.style.zIndex="")}}),O?(P.classList.add("hidden"),P.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(P.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const L=P.getBoundingClientRect(),E=12;let p=0;L.left<E?p=E-L.left:L.right>window.innerWidth-E&&(p=window.innerWidth-E-L.right),p!==0&&(P.style.transform=`translateX(calc(-50% + ${p}px))`)}))},a.appendChild(l),Fd(a,s.name),b.currentTab==="collection"?(a.style.cursor="pointer",a.onclick=N=>{N.stopPropagation(),gT(s.name,a)}):(a.style.cursor="pointer",a.onclick=N=>{N.stopPropagation();const O=!P.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(L=>{if(L!==P){L.classList.add("hidden"),L.style.transform="";const E=L.closest(".card-compact");E&&(E.classList.remove("card-open"),E.style.zIndex="")}}),O?(P.classList.add("hidden"),P.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(P.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const L=P.getBoundingClientRect(),E=12;let p=0;L.left<E?p=E-L.left:L.right>window.innerWidth-E&&(p=window.innerWidth-E-L.right),p!==0&&(P.style.transform=`translateX(calc(-50% + ${p}px))`)}))}),i.appendChild(a),i.appendChild(C),i.appendChild(P),n.appendChild(i),r.push(i)}r.length>0&&Li(r,{opacity:[0,1],y:[20,0]},{delay:nm(.015)})}function ya(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedNo"),r=document.getElementById("collectedAllBlueprints"),s=document.getElementById("collectedYesBlueprints"),i=document.getElementById("collectedWishBlueprints"),a=document.getElementById("collectedNoBlueprints"),l=document.getElementById("collectedAllMobile"),u=document.getElementById("collectedYesMobile"),d=document.getElementById("collectedWishMobile"),m=document.getElementById("collectedNoMobile"),_=T=>{b.filters.collected=T,[[n,e,null,t],[r,s,i,a],[l,u,d,m]].forEach(D=>{const[P,V,F,j]=D;P&&(P.classList.remove("chip-active"),T==="all"&&P.classList.add("chip-active")),V&&(V.classList.remove("chip-active"),T==="collected"&&V.classList.add("chip-active")),F&&(F.classList.remove("chip-active"),T==="wishlist"&&F.classList.add("chip-active")),j&&(j.classList.remove("chip-active"),T==="not-collected"&&j.classList.add("chip-active"))}),ae(),ve(),Re()};n&&(n.onclick=()=>_("all")),e&&(e.onclick=()=>_("collected")),t&&(t.onclick=()=>_("not-collected")),r&&(r.onclick=()=>_("all")),s&&(s.onclick=()=>_("collected")),i&&(i.onclick=()=>_("wishlist")),a&&(a.onclick=()=>_("not-collected")),l&&(l.onclick=()=>_("all")),u&&(u.onclick=()=>_("collected")),d&&(d.onclick=()=>_("wishlist")),m&&(m.onclick=()=>_("not-collected")),_(b.filters.collected)}
