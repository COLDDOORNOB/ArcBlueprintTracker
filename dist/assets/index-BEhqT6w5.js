(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function hm(n,e){n.indexOf(e)===-1&&n.push(e)}const Du=(n,e,t)=>Math.min(Math.max(t,n),e),He={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},Dr=n=>typeof n=="number",Nn=n=>Array.isArray(n)&&!Dr(n[0]),fm=(n,e,t)=>{const r=e-n;return((t-n)%r+r)%r+n};function mm(n,e){return Nn(n)?n[fm(0,n.length,e)]:n}const Mu=(n,e,t)=>-t*n+t*e+n,Vu=()=>{},Ut=n=>n,Xo=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function Ou(n,e){const t=n[n.length-1];for(let r=1;r<=e;r++){const s=Xo(0,e,r);n.push(Mu(t,1,s))}}function pm(n){const e=[0];return Ou(e,n-1),e}function gm(n,e=pm(n.length),t=Ut){const r=n.length,s=r-e.length;return s>0&&Ou(e,s),i=>{let a=0;for(;a<r-2&&!(i<e[a+1]);a++);let c=Du(0,1,Xo(e[a],e[a+1],i));return c=mm(t,a)(c),Mu(n[a],n[a+1],c)}}const Bu=n=>Array.isArray(n)&&Dr(n[0]),uo=n=>typeof n=="object"&&!!n.createAnimation,Un=n=>typeof n=="function",ym=n=>typeof n=="string",Sr={ms:n=>n*1e3,s:n=>n/1e3},Fu=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,_m=1e-7,Em=12;function vm(n,e,t,r,s){let i,a,c=0;do a=e+(t-e)/2,i=Fu(a,r,s)-n,i>0?t=a:e=a;while(Math.abs(i)>_m&&++c<Em);return a}function wr(n,e,t,r){if(n===e&&t===r)return Ut;const s=i=>vm(i,0,1,n,t);return i=>i===0||i===1?i:Fu(s(i),e,r)}const Im=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const r=t*n,s=e==="end"?Math.floor(r):Math.ceil(r);return Du(0,1,s/n)},wm={ease:wr(.25,.1,.25,1),"ease-in":wr(.42,0,1,1),"ease-in-out":wr(.42,0,.58,1),"ease-out":wr(0,0,.58,1)},Tm=/\((.*?)\)/;function ho(n){if(Un(n))return n;if(Bu(n))return wr(...n);const e=wm[n];if(e)return e;if(n.startsWith("steps")){const t=Tm.exec(n);if(t){const r=t[1].split(",");return Im(parseFloat(r[0]),r[1].trim())}}return Ut}class Uu{constructor(e,t=[0,1],{easing:r,duration:s=He.duration,delay:i=He.delay,endDelay:a=He.endDelay,repeat:c=He.repeat,offset:u,direction:d="normal",autoplay:f=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=Ut,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((E,b)=>{this.resolve=E,this.reject=b}),r=r||He.easing,uo(r)){const E=r.createAnimation(t);r=E.easing,t=E.keyframes||t,s=E.duration||s}this.repeat=c,this.easing=Nn(r)?Ut:ho(r),this.updateDuration(s);const p=gm(t,u,Nn(r)?r.map(ho):Ut);this.tick=E=>{var b;i=i;let C=0;this.pauseTime!==void 0?C=this.pauseTime:C=(E-this.startTime)*this.rate,this.t=C,C/=1e3,C=Math.max(C-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(C=this.totalDuration);const R=C/this.duration;let A=Math.floor(R),x=R%1;!x&&R>=1&&(x=1),x===1&&A--;const D=A%2;(d==="reverse"||d==="alternate"&&D||d==="alternate-reverse"&&!D)&&(x=1-x);const V=C>=this.totalDuration?1:Math.min(x,1),B=p(this.easing(V));e(B),this.pauseTime===void 0&&(this.playState==="finished"||C>=this.totalDuration+a)?(this.playState="finished",(b=this.resolve)===null||b===void 0||b.call(this,B)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},f&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class bm{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Gi=new WeakMap;function zu(n){return Gi.has(n)||Gi.set(n,{transforms:[],values:new Map}),Gi.get(n)}function Am(n,e){return n.has(e)||n.set(e,new bm),n.get(e)}const Cm=["","X","Y","Z"],Sm=["translate","scale","rotate","skew"],Os={x:"translateX",y:"translateY",z:"translateZ"},Wc={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},Rm={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:Wc,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:Ut},skew:Wc},Mr=new Map,Yo=n=>`--motion-${n}`,Bs=["x","y","z"];Sm.forEach(n=>{Cm.forEach(e=>{Bs.push(n+e),Mr.set(Yo(n+e),Rm[n])})});const Pm=(n,e)=>Bs.indexOf(n)-Bs.indexOf(e),km=new Set(Bs),$u=n=>km.has(n),xm=(n,e)=>{Os[e]&&(e=Os[e]);const{transforms:t}=zu(n);hm(t,e),n.style.transform=Lm(t)},Lm=n=>n.sort(Pm).reduce(Nm,"").trim(),Nm=(n,e)=>`${n} ${e}(var(${Yo(e)}))`,fo=n=>n.startsWith("--"),Gc=new Set;function Dm(n){if(!Gc.has(n)){Gc.add(n);try{const{syntax:e,initialValue:t}=Mr.has(n)?Mr.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const Ki=(n,e)=>document.createElement("div").animate(n,e),Kc={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Ki({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Ki({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Ki({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Qi={},Ln={};for(const n in Kc)Ln[n]=()=>(Qi[n]===void 0&&(Qi[n]=Kc[n]()),Qi[n]);const Mm=.015,Vm=(n,e)=>{let t="";const r=Math.round(e/Mm);for(let s=0;s<r;s++)t+=n(Xo(0,r-1,s))+", ";return t.substring(0,t.length-2)},Qc=(n,e)=>Un(n)?Ln.linearEasing()?`linear(${Vm(n,e)})`:He.easing:Bu(n)?Om(n):n,Om=([n,e,t,r])=>`cubic-bezier(${n}, ${e}, ${t}, ${r})`;function Bm(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const Fm=n=>Array.isArray(n)?n:[n];function mo(n){return Os[n]&&(n=Os[n]),$u(n)?Yo(n):n}const ps={get:(n,e)=>{e=mo(e);let t=fo(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const r=Mr.get(e);r&&(t=r.initialValue)}return t},set:(n,e,t)=>{e=mo(e),fo(e)?n.style.setProperty(e,t):n.style[e]=t}};function qu(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function Um(n,e){var t;let r=(e==null?void 0:e.toDefaultUnit)||Ut;const s=n[n.length-1];if(ym(s)){const i=((t=s.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(r=a=>a+i)}return r}function zm(){return window.__MOTION_DEV_TOOLS_RECORD}function $m(n,e,t,r={},s){const i=zm(),a=r.record!==!1&&i;let c,{duration:u=He.duration,delay:d=He.delay,endDelay:f=He.endDelay,repeat:p=He.repeat,easing:E=He.easing,persist:b=!1,direction:C,offset:R,allowWebkitAcceleration:A=!1,autoplay:x=!0}=r;const D=zu(n),V=$u(e);let B=Ln.waapi();V&&xm(n,e);const O=mo(e),F=Am(D.values,O),v=Mr.get(O);return qu(F.animation,!(uo(E)&&F.generator)&&r.record!==!1),()=>{const y=()=>{var I,S;return(S=(I=ps.get(n,O))!==null&&I!==void 0?I:v==null?void 0:v.initialValue)!==null&&S!==void 0?S:0};let _=Bm(Fm(t),y);const T=Um(_,v);if(uo(E)){const I=E.createAnimation(_,e!=="opacity",y,O,F);E=I.easing,_=I.keyframes||_,u=I.duration||u}if(fo(O)&&(Ln.cssRegisterProperty()?Dm(O):B=!1),V&&!Ln.linearEasing()&&(Un(E)||Nn(E)&&E.some(Un))&&(B=!1),B){v&&(_=_.map(w=>Dr(w)?v.toDefaultUnit(w):w)),_.length===1&&(!Ln.partialKeyframes()||a)&&_.unshift(y());const I={delay:Sr.ms(d),duration:Sr.ms(u),endDelay:Sr.ms(f),easing:Nn(E)?void 0:Qc(E,u),direction:C,iterations:p+1,fill:"both"};c=n.animate({[O]:_,offset:R,easing:Nn(E)?E.map(w=>Qc(w,u)):void 0},I),c.finished||(c.finished=new Promise((w,fe)=>{c.onfinish=w,c.oncancel=fe}));const S=_[_.length-1];c.finished.then(()=>{b||(ps.set(n,O,S),c.cancel())}).catch(Vu),A||(c.playbackRate=1.000001)}else if(s&&V)_=_.map(I=>typeof I=="string"?parseFloat(I):I),_.length===1&&_.unshift(parseFloat(y())),c=new s(I=>{ps.set(n,O,T?T(I):I)},_,Object.assign(Object.assign({},r),{duration:u,easing:E}));else{const I=_[_.length-1];ps.set(n,O,v&&Dr(I)?v.toDefaultUnit(I):I)}return a&&i(n,e,_,{duration:u,delay:d,easing:E,repeat:p,offset:R},"motion-one"),F.setAnimation(c),c&&!x&&c.pause(),c}}const qm=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function jm(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const Hm=n=>n(),ju=(n,e,t=He.duration)=>new Proxy({animations:n.map(Hm).filter(Boolean),duration:t,options:e},Gm),Wm=n=>n.animations[0],Gm={get:(n,e)=>{const t=Wm(n);switch(e){case"duration":return n.duration;case"currentTime":return Sr.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(Km)).catch(Vu)),n.finished;case"stop":return()=>{n.animations.forEach(r=>qu(r))};case"forEachNative":return r=>{n.animations.forEach(s=>r(s,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(r=>r[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=Sr.ms(t);case"playbackRate":for(let r=0;r<n.animations.length;r++)n.animations[r][e]=t;return!0}return!1}},Km=n=>n.finished;function Qm(n=.1,{start:e=0,from:t=0,easing:r}={}){return(s,i)=>{const a=Dr(t)?t:Xm(t,i),c=Math.abs(a-s);let u=n*c;if(r){const d=i*n;u=ho(r)(u/d)*d}return e+u}}function Xm(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function Ym(n,e,t){return Un(n)?n(e,t):n}function Jm(n){return function(t,r,s={}){t=jm(t);const i=t.length,a=[];for(let c=0;c<i;c++){const u=t[c];for(const d in r){const f=qm(s,d);f.delay=Ym(f.delay,c,i);const p=$m(u,d,r[d],f,n);a.push(p)}}return ju(a,s,s.duration)}}const Zm=Jm(Uu);function ep(n,e={}){return ju([()=>{const t=new Uu(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function tp(n,e,t){return(Un(n)?ep:Zm)(n,e,t)}const np=()=>{};var Xc={};/**
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
 */const Hu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},rp=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Wu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let E=(c&15)<<2|d>>6,b=d&63;u||(b=64,a||(E=64)),r.push(t[f],t[p],t[E],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Hu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):rp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||d==null||p==null)throw new sp;const E=i<<2|c>>4;if(r.push(E),d!==64){const b=c<<4&240|d>>2;if(r.push(b),p!==64){const C=d<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ip=function(n){const e=Hu(n);return Wu.encodeByteArray(e,!0)},Fs=function(n){return ip(n).replace(/\./g,"")},Gu=function(n){try{return Wu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function op(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ap=()=>op().__FIREBASE_DEFAULTS__,cp=()=>{if(typeof process>"u"||typeof Xc>"u")return;const n=Xc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},lp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Gu(n[1]);return e&&JSON.parse(e)},ai=()=>{try{return np()||ap()||cp()||lp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ku=n=>{var e,t;return(t=(e=ai())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},up=n=>{const e=Ku(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Qu=()=>{var n;return(n=ai())==null?void 0:n.config},Xu=n=>{var e;return(e=ai())==null?void 0:e[`_${n}`]};/**
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
 */class dp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Yu(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function hp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Fs(JSON.stringify(t)),Fs(JSON.stringify(a)),""].join(".")}const Rr={};function fp(){const n={prod:[],emulator:[]};for(const e of Object.keys(Rr))Rr[e]?n.emulator.push(e):n.prod.push(e);return n}function mp(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Yc=!1;function Ju(n,e){if(typeof window>"u"||typeof document>"u"||!Qn(window.location.host)||Rr[n]===e||Rr[n]||Yc)return;Rr[n]=e;function t(E){return`__firebase__banner__${E}`}const r="__firebase__banner",i=fp().prod.length>0;function a(){const E=document.getElementById(r);E&&E.remove()}function c(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function u(E,b){E.setAttribute("width","24"),E.setAttribute("id",b),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function d(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Yc=!0,a()},E}function f(E,b){E.setAttribute("id",b),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function p(){const E=mp(r),b=t("text"),C=document.getElementById(b)||document.createElement("span"),R=t("learnmore"),A=document.getElementById(R)||document.createElement("a"),x=t("preprendIcon"),D=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const V=E.element;c(V),f(A,R);const B=d();u(D,x),V.append(D,C,A,B),document.body.appendChild(V)}i?(C.innerText="Preview backend disconnected.",D.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(D.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",b)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function De(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(De())}function gp(){var e;const n=(e=ai())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function yp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function _p(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ep(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vp(){const n=De();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ip(){return!gp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wp(){try{return typeof indexedDB=="object"}catch{return!1}}function Tp(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const bp="FirebaseError";class At extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=bp,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jr.prototype.create)}}class jr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Ap(i,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new At(s,c,r)}}function Ap(n,e){return n.replace(Cp,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Cp=/\{\$([^}]+)}/g;function Sp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function mn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Jc(i)&&Jc(a)){if(!mn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Jc(n){return n!==null&&typeof n=="object"}/**
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
 */function Hr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Rp(n,e){const t=new Pp(n,e);return t.subscribe.bind(t)}class Pp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");kp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Xi),s.error===void 0&&(s.error=Xi),s.complete===void 0&&(s.complete=Xi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function kp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Xi(){}/**
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
 */function Ue(n){return n&&n._delegate?n._delegate:n}class pn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const sn="[DEFAULT]";/**
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
 */class xp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new dp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Np(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lp(n){return n===sn?void 0:n}function Np(n){return n.instantiationMode==="EAGER"}/**
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
 */class Dp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new xp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Mp={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Vp=Y.INFO,Op={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},Bp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Op[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jo{constructor(e){this.name=e,this._logLevel=Vp,this._logHandler=Bp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const Fp=(n,e)=>e.some(t=>n instanceof t);let Zc,el;function Up(){return Zc||(Zc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zp(){return el||(el=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zu=new WeakMap,po=new WeakMap,ed=new WeakMap,Yi=new WeakMap,Zo=new WeakMap;function $p(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(zt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Zu.set(t,n)}).catch(()=>{}),Zo.set(e,n),e}function qp(n){if(po.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});po.set(n,e)}let go={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return po.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ed.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jp(n){go=n(go)}function Hp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ji(this),e,...t);return ed.set(r,e.sort?e.sort():[e]),zt(r)}:zp().includes(n)?function(...e){return n.apply(Ji(this),e),zt(Zu.get(this))}:function(...e){return zt(n.apply(Ji(this),e))}}function Wp(n){return typeof n=="function"?Hp(n):(n instanceof IDBTransaction&&qp(n),Fp(n,Up())?new Proxy(n,go):n)}function zt(n){if(n instanceof IDBRequest)return $p(n);if(Yi.has(n))return Yi.get(n);const e=Wp(n);return e!==n&&(Yi.set(n,e),Zo.set(e,n)),e}const Ji=n=>Zo.get(n);function Gp(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),c=zt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(zt(a.result),u.oldVersion,u.newVersion,zt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Kp=["get","getKey","getAll","getAllKeys","count"],Qp=["put","add","delete","clear"],Zi=new Map;function tl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Zi.get(e))return Zi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Qp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Kp.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),s&&u.done]))[0]};return Zi.set(e,i),i}jp(n=>({...n,get:(e,t,r)=>tl(e,t)||n.get(e,t,r),has:(e,t)=>!!tl(e,t)||n.has(e,t)}));/**
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
 */class Xp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Yp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Yp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yo="@firebase/app",nl="0.14.6";/**
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
 */const vt=new Jo("@firebase/app"),Jp="@firebase/app-compat",Zp="@firebase/analytics-compat",eg="@firebase/analytics",tg="@firebase/app-check-compat",ng="@firebase/app-check",rg="@firebase/auth",sg="@firebase/auth-compat",ig="@firebase/database",og="@firebase/data-connect",ag="@firebase/database-compat",cg="@firebase/functions",lg="@firebase/functions-compat",ug="@firebase/installations",dg="@firebase/installations-compat",hg="@firebase/messaging",fg="@firebase/messaging-compat",mg="@firebase/performance",pg="@firebase/performance-compat",gg="@firebase/remote-config",yg="@firebase/remote-config-compat",_g="@firebase/storage",Eg="@firebase/storage-compat",vg="@firebase/firestore",Ig="@firebase/ai",wg="@firebase/firestore-compat",Tg="firebase",bg="12.6.0";/**
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
 */const _o="[DEFAULT]",Ag={[yo]:"fire-core",[Jp]:"fire-core-compat",[eg]:"fire-analytics",[Zp]:"fire-analytics-compat",[ng]:"fire-app-check",[tg]:"fire-app-check-compat",[rg]:"fire-auth",[sg]:"fire-auth-compat",[ig]:"fire-rtdb",[og]:"fire-data-connect",[ag]:"fire-rtdb-compat",[cg]:"fire-fn",[lg]:"fire-fn-compat",[ug]:"fire-iid",[dg]:"fire-iid-compat",[hg]:"fire-fcm",[fg]:"fire-fcm-compat",[mg]:"fire-perf",[pg]:"fire-perf-compat",[gg]:"fire-rc",[yg]:"fire-rc-compat",[_g]:"fire-gcs",[Eg]:"fire-gcs-compat",[vg]:"fire-fst",[wg]:"fire-fst-compat",[Ig]:"fire-vertex","fire-js":"fire-js",[Tg]:"fire-js-all"};/**
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
 */const Us=new Map,Cg=new Map,Eo=new Map;function rl(n,e){try{n.container.addComponent(e)}catch(t){vt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function zn(n){const e=n.name;if(Eo.has(e))return vt.debug(`There were multiple attempts to register component ${e}.`),!1;Eo.set(e,n);for(const t of Us.values())rl(t,n);for(const t of Cg.values())rl(t,n);return!0}function ea(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Sg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new jr("app","Firebase",Sg);/**
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
 */class Rg{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
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
 */const Xn=bg;function td(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:_o,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw $t.create("bad-app-name",{appName:String(s)});if(t||(t=Qu()),!t)throw $t.create("no-options");const i=Us.get(s);if(i){if(mn(t,i.options)&&mn(r,i.config))return i;throw $t.create("duplicate-app",{appName:s})}const a=new Dp(s);for(const u of Eo.values())a.addComponent(u);const c=new Rg(t,r,a);return Us.set(s,c),c}function nd(n=_o){const e=Us.get(n);if(!e&&n===_o&&Qu())return td();if(!e)throw $t.create("no-app",{appName:n});return e}function qt(n,e,t){let r=Ag[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),vt.warn(a.join(" "));return}zn(new pn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Pg="firebase-heartbeat-database",kg=1,Vr="firebase-heartbeat-store";let eo=null;function rd(){return eo||(eo=Gp(Pg,kg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vr)}catch(t){console.warn(t)}}}}).catch(n=>{throw $t.create("idb-open",{originalErrorMessage:n.message})})),eo}async function xg(n){try{const t=(await rd()).transaction(Vr),r=await t.objectStore(Vr).get(sd(n));return await t.done,r}catch(e){if(e instanceof At)vt.warn(e.message);else{const t=$t.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});vt.warn(t.message)}}}async function sl(n,e){try{const r=(await rd()).transaction(Vr,"readwrite");await r.objectStore(Vr).put(e,sd(n)),await r.done}catch(t){if(t instanceof At)vt.warn(t.message);else{const r=$t.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});vt.warn(r.message)}}}function sd(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Lg=1024,Ng=30;class Dg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Vg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=il();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Ng){const a=Og(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){vt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=il(),{heartbeatsToSend:r,unsentEntries:s}=Mg(this._heartbeatsCache.heartbeats),i=Fs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return vt.warn(t),""}}}function il(){return new Date().toISOString().substring(0,10)}function Mg(n,e=Lg){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),ol(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ol(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Vg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wp()?Tp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await xg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function ol(n){return Fs(JSON.stringify({version:2,heartbeats:n})).length}function Og(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function Bg(n){zn(new pn("platform-logger",e=>new Xp(e),"PRIVATE")),zn(new pn("heartbeat",e=>new Dg(e),"PRIVATE")),qt(yo,nl,n),qt(yo,nl,"esm2020"),qt("fire-js","")}Bg("");var Fg="firebase",Ug="12.7.0";/**
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
 */qt(Fg,Ug,"app");function id(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zg=id,od=new jr("auth","Firebase",id());/**
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
 */const zs=new Jo("@firebase/auth");function $g(n,...e){zs.logLevel<=Y.WARN&&zs.warn(`Auth (${Xn}): ${n}`,...e)}function bs(n,...e){zs.logLevel<=Y.ERROR&&zs.error(`Auth (${Xn}): ${n}`,...e)}/**
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
 */function ht(n,...e){throw na(n,...e)}function Je(n,...e){return na(n,...e)}function ta(n,e,t){const r={...zg(),[e]:t};return new jr("auth","Firebase",r).create(e,{appName:n.name})}function dn(n){return ta(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function qg(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&ht(n,"argument-error"),ta(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function na(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return od.create(n,...e)}function W(n,e,...t){if(!n)throw na(e,...t)}function yt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw bs(e),new Error(e)}function It(n,e){n||yt(e)}/**
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
 */function vo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function jg(){return al()==="http:"||al()==="https:"}function al(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function Hg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jg()||_p()||"connection"in navigator)?navigator.onLine:!0}function Wg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Wr{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=pp()||Ep()}get(){return Hg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ra(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ad{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Gg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Kg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Qg=new Wr(3e4,6e4);function sa(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Yn(n,e,t,r,s={}){return cd(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const c=Hr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return yp()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(d.credentials="include"),ad.fetch()(await ld(n,n.config.apiHost,t,c),d)})}async function cd(n,e,t){n._canInitEmulator=!1;const r={...Gg,...e};try{const s=new Yg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw gs(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw gs(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw gs(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw gs(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ta(n,f,d);ht(n,f)}}catch(s){if(s instanceof At)throw s;ht(n,"network-request-failed",{message:String(s)})}}async function Xg(n,e,t,r,s={}){const i=await Yn(n,e,t,r,s);return"mfaPendingCredential"in i&&ht(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function ld(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?ra(n.config,s):`${n.config.apiScheme}://${s}`;return Kg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class Yg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Je(this.auth,"network-request-failed")),Qg.get())})}}function gs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Je(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function Jg(n,e){return Yn(n,"POST","/v1/accounts:delete",e)}async function $s(n,e){return Yn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Pr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Zg(n,e=!1){const t=Ue(n),r=await t.getIdToken(e),s=ia(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Pr(to(s.auth_time)),issuedAtTime:Pr(to(s.iat)),expirationTime:Pr(to(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function to(n){return Number(n)*1e3}function ia(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return bs("JWT malformed, contained fewer than 3 sections"),null;try{const s=Gu(t);return s?JSON.parse(s):(bs("Failed to decode base64 JWT payload"),null)}catch(s){return bs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function cl(n){const e=ia(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Or(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof At&&ey(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ey({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class ty{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Io{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pr(this.lastLoginAt),this.creationTime=Pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function qs(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Or(n,$s(e,{idToken:t}));W(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?ud(s.providerUserInfo):[],a=ry(n.providerData,i),c=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Io(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function ny(n){const e=Ue(n);await qs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ry(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ud(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function sy(n,e){const t=await cd(n,{},async()=>{const r=Hr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await ld(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(u.credentials="include"),ad.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function iy(n,e){return Yn(n,"POST","/v2/accounts:revokeToken",sa(n,e))}/**
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
 */class Dn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):cl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=cl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await sy(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Dn;return r&&(W(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Dn,this.toJSON())}_performRefresh(){return yt("not implemented")}}/**
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
 */function Mt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new ty(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Io(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Or(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Zg(this,e)}reload(){return ny(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await qs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Or(this,Jg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:E,isAnonymous:b,providerData:C,stsTokenManager:R}=t;W(p&&R,e,"internal-error");const A=Dn.fromJSON(this.name,R);W(typeof p=="string",e,"internal-error"),Mt(r,e.name),Mt(s,e.name),W(typeof E=="boolean",e,"internal-error"),W(typeof b=="boolean",e,"internal-error"),Mt(i,e.name),Mt(a,e.name),Mt(c,e.name),Mt(u,e.name),Mt(d,e.name),Mt(f,e.name);const x=new Xe({uid:p,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:A,createdAt:d,lastLoginAt:f});return C&&Array.isArray(C)&&(x.providerData=C.map(D=>({...D}))),u&&(x._redirectEventId=u),x}static async _fromIdTokenResponse(e,t,r=!1){const s=new Dn;s.updateFromServerResponse(t);const i=new Xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await qs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?ud(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),c=new Dn;c.updateFromIdToken(r);const u=new Xe({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Io(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
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
 */const ll=new Map;function _t(n){It(n instanceof Function,"Expected a class definition");let e=ll.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ll.set(n,e),e)}/**
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
 */class dd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}dd.type="NONE";const ul=dd;/**
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
 */function As(n,e,t){return`firebase:${n}:${e}:${t}`}class Mn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=As(this.userKey,s.apiKey,i),this.fullPersistenceKey=As("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await $s(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mn(_t(ul),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||_t(ul);const a=As(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let p;if(typeof f=="string"){const E=await $s(e,{idToken:f}).catch(()=>{});if(!E)break;p=await Xe._fromGetAccountInfoResponse(e,E,f)}else p=Xe._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Mn(i,e,r):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Mn(i,e,r))}}/**
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
 */function dl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(pd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(hd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(yd(e))return"Blackberry";if(_d(e))return"Webos";if(fd(e))return"Safari";if((e.includes("chrome/")||md(e))&&!e.includes("edge/"))return"Chrome";if(gd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function hd(n=De()){return/firefox\//i.test(n)}function fd(n=De()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function md(n=De()){return/crios\//i.test(n)}function pd(n=De()){return/iemobile/i.test(n)}function gd(n=De()){return/android/i.test(n)}function yd(n=De()){return/blackberry/i.test(n)}function _d(n=De()){return/webos/i.test(n)}function oa(n=De()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function oy(n=De()){var e;return oa(n)&&!!((e=window.navigator)!=null&&e.standalone)}function ay(){return vp()&&document.documentMode===10}function Ed(n=De()){return oa(n)||gd(n)||_d(n)||yd(n)||/windows phone/i.test(n)||pd(n)}/**
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
 */function vd(n,e=[]){let t;switch(n){case"Browser":t=dl(De());break;case"Worker":t=`${dl(De())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Xn}/${r}`}/**
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
 */class cy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function ly(n,e={}){return Yn(n,"GET","/v2/passwordPolicy",sa(n,e))}/**
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
 */const uy=6;class dy{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??uy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class hy{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new hl(this),this.idTokenSubscription=new hl(this),this.beforeStateQueue=new cy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=od,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=_t(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await Mn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await $s(this,{idToken:e}),r=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Qe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Wg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(dn(this));const t=e?Ue(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_t(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ly(this),t=new dy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await iy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&_t(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[_t(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&$g(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ci(n){return Ue(n)}class hl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rp(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let aa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function fy(n){aa=n}function my(n){return aa.loadJS(n)}function py(){return aa.gapiScript}function gy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function yy(n,e){const t=ea(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(mn(i,e??{}))return s;ht(s,"already-initialized")}return t.initialize({options:e})}function _y(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(_t);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ey(n,e,t){const r=ci(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Id(e),{host:a,port:c}=vy(e),u=c===null?"":`:${c}`,d={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(mn(d,r.config.emulator)&&mn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Qn(a)?(Yu(`${i}//${a}${u}`),Ju("Auth",!0)):Iy()}function Id(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function vy(n){const e=Id(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:fl(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:fl(a)}}}function fl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Iy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class wd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,t){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}/**
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
 */async function Vn(n,e){return Xg(n,"POST","/v1/accounts:signInWithIdp",sa(n,e))}/**
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
 */const wy="http://localhost";class gn extends wd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new gn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:wy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hr(t)}return e}}/**
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
 */class ca{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Gr extends ca{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Vt extends Gr{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
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
 */class gt extends Gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return gt.credential(t,r)}catch{return null}}}gt.GOOGLE_SIGN_IN_METHOD="google.com";gt.PROVIDER_ID="google.com";/**
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
 */class Ot extends Gr{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ot.credential(e.oauthAccessToken)}catch{return null}}}Ot.GITHUB_SIGN_IN_METHOD="github.com";Ot.PROVIDER_ID="github.com";/**
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
 */class Bt extends Gr{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Bt.credential(t,r)}catch{return null}}}Bt.TWITTER_SIGN_IN_METHOD="twitter.com";Bt.PROVIDER_ID="twitter.com";/**
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
 */class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Xe._fromIdTokenResponse(e,r,s),a=ml(r);return new $n({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=ml(r);return new $n({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function ml(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class js extends At{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,js.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new js(e,t,r,s)}}function Td(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?js._fromErrorAndOperation(n,i,e,r):i})}async function Ty(n,e,t=!1){const r=await Or(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return $n._forOperation(n,"link",r)}/**
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
 */async function by(n,e,t=!1){const{auth:r}=n;if(Qe(r.app))return Promise.reject(dn(r));const s="reauthenticate";try{const i=await Or(n,Td(r,s,e,n),t);W(i.idToken,r,"internal-error");const a=ia(i.idToken);W(a,r,"internal-error");const{sub:c}=a;return W(n.uid===c,r,"user-mismatch"),$n._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ht(r,"user-mismatch"),i}}/**
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
 */async function Ay(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const r="signIn",s=await Td(n,r,e),i=await $n._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function bd(n,e){return Ue(n).setPersistence(e)}function Cy(n,e,t,r){return Ue(n).onIdTokenChanged(e,t,r)}function Sy(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function Ry(n,e,t,r){return Ue(n).onAuthStateChanged(e,t,r)}function Py(n){return Ue(n).signOut()}const Hs="__sak";/**
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
 */class Ad{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Hs,"1"),this.storage.removeItem(Hs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const ky=1e3,xy=10;class Cd extends Ad{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ed(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);ay()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,xy):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ky)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Cd.type="LOCAL";const la=Cd;/**
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
 */class Sd extends Ad{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Sd.type="SESSION";const Rd=Sd;/**
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
 */function Ly(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class li{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new li(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await Ly(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}li.receivers=[];/**
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
 */function ua(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Ny{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=ua("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const E=p;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function ot(){return window}function Dy(n){ot().location.href=n}/**
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
 */function Pd(){return typeof ot().WorkerGlobalScope<"u"&&typeof ot().importScripts=="function"}async function My(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Vy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Oy(){return Pd()?self:null}/**
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
 */const kd="firebaseLocalStorageDb",By=1,Ws="firebaseLocalStorage",xd="fbase_key";class Kr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ui(n,e){return n.transaction([Ws],e?"readwrite":"readonly").objectStore(Ws)}function Fy(){const n=indexedDB.deleteDatabase(kd);return new Kr(n).toPromise()}function wo(){const n=indexedDB.open(kd,By);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ws,{keyPath:xd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ws)?e(r):(r.close(),await Fy(),e(await wo()))})})}async function pl(n,e,t){const r=ui(n,!0).put({[xd]:e,value:t});return new Kr(r).toPromise()}async function Uy(n,e){const t=ui(n,!1).get(e),r=await new Kr(t).toPromise();return r===void 0?null:r.value}function gl(n,e){const t=ui(n,!0).delete(e);return new Kr(t).toPromise()}const zy=800,$y=3;class Ld{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await wo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>$y)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Pd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=li._getInstance(Oy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await My(),!this.activeServiceWorker)return;this.sender=new Ny(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Vy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await wo();return await pl(e,Hs,"1"),await gl(e,Hs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>pl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Uy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>gl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ui(s,!1).getAll();return new Kr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),zy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ld.type="LOCAL";const qy=Ld;new Wr(3e4,6e4);/**
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
 */function Nd(n,e){return e?_t(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class da extends wd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function jy(n){return Ay(n.auth,new da(n),n.bypassAuthState)}function Hy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),by(t,new da(n),n.bypassAuthState)}async function Wy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Ty(t,new da(n),n.bypassAuthState)}/**
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
 */class Dd{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return jy;case"linkViaPopup":case"linkViaRedirect":return Wy;case"reauthViaPopup":case"reauthViaRedirect":return Hy;default:ht(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Gy=new Wr(2e3,1e4);async function Ky(n,e,t){if(Qe(n.app))return Promise.reject(Je(n,"operation-not-supported-in-this-environment"));const r=ci(n);qg(n,e,ca);const s=Nd(r,t);return new an(r,"signInViaPopup",e,s).executeNotNull()}class an extends Dd{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=ua();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Gy.get())};e()}}an.currentPopupAction=null;/**
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
 */const Qy="pendingRedirect",Cs=new Map;class Xy extends Dd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Cs.get(this.auth._key());if(!e){try{const r=await Yy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Cs.set(this.auth._key(),e)}return this.bypassAuthState||Cs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yy(n,e){const t=e_(e),r=Zy(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Jy(n,e){Cs.set(n._key(),e)}function Zy(n){return _t(n._redirectPersistence)}function e_(n){return As(Qy,n.config.apiKey,n.name)}async function t_(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const r=ci(n),s=Nd(r,e),a=await new Xy(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const n_=10*60*1e3;class r_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!s_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Md(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Je(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=n_&&this.cachedEventUids.clear(),this.cachedEventUids.has(yl(e))}saveEventToCache(e){this.cachedEventUids.add(yl(e)),this.lastProcessedEventTime=Date.now()}}function yl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Md({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function s_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Md(n);default:return!1}}/**
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
 */async function i_(n,e={}){return Yn(n,"GET","/v1/projects",e)}/**
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
 */const o_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,a_=/^https?/;async function c_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await i_(n);for(const t of e)try{if(l_(t))return}catch{}ht(n,"unauthorized-domain")}function l_(n){const e=vo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!a_.test(t))return!1;if(o_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const u_=new Wr(3e4,6e4);function _l(){const n=ot().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function d_(n){return new Promise((e,t)=>{var s,i,a;function r(){_l(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{_l(),t(Je(n,"network-request-failed"))},timeout:u_.get()})}if((i=(s=ot().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=ot().gapi)!=null&&a.load)r();else{const c=gy("iframefcb");return ot()[c]=()=>{gapi.load?r():t(Je(n,"network-request-failed"))},my(`${py()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ss=null,e})}let Ss=null;function h_(n){return Ss=Ss||d_(n),Ss}/**
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
 */const f_=new Wr(5e3,15e3),m_="__/auth/iframe",p_="emulator/auth/iframe",g_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},y_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function __(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ra(e,p_):`https://${n.config.authDomain}/${m_}`,r={apiKey:e.apiKey,appName:n.name,v:Xn},s=y_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Hr(r).slice(1)}`}async function E_(n){const e=await h_(n),t=ot().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:__(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:g_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Je(n,"network-request-failed"),c=ot().setTimeout(()=>{i(a)},f_.get());function u(){ot().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const v_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},I_=500,w_=600,T_="_blank",b_="http://localhost";class El{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function A_(n,e,t,r=I_,s=w_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...v_,width:r.toString(),height:s.toString(),top:i,left:a},d=De().toLowerCase();t&&(c=md(d)?T_:t),hd(d)&&(e=e||b_,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[b,C])=>`${E}${b}=${C},`,"");if(oy(d)&&c!=="_self")return C_(e||"",c),new El(null);const p=window.open(e||"",c,f);W(p,n,"popup-blocked");try{p.focus()}catch{}return new El(p)}function C_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const S_="__/auth/handler",R_="emulator/auth/handler",P_=encodeURIComponent("fac");async function vl(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Xn,eventId:s};if(e instanceof ca){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Gr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${P_}=${encodeURIComponent(u)}`:"";return`${k_(n)}?${Hr(c).slice(1)}${d}`}function k_({config:n}){return n.emulator?ra(n,R_):`https://${n.authDomain}/${S_}`}/**
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
 */const no="webStorageSupport";class x_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Rd,this._completeRedirectFn=t_,this._overrideRedirectResult=Jy}async _openPopup(e,t,r,s){var a;It((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await vl(e,t,r,vo(),s);return A_(e,i,ua())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await vl(e,t,r,vo(),s);return Dy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(It(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await E_(e),r=new r_(e);return t.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(no,{type:no},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[no];i!==void 0&&t(!!i),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=c_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ed()||fd()||oa()}}const L_=x_;var Il="@firebase/auth",wl="1.12.0";/**
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
 */class N_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function D_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function M_(n){zn(new pn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vd(n)},d=new hy(r,s,i,u);return _y(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),zn(new pn("auth-internal",e=>{const t=ci(e.getProvider("auth").getImmediate());return(r=>new N_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),qt(Il,wl,D_(n)),qt(Il,wl,"esm2020")}/**
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
 */const V_=5*60,O_=Xu("authIdTokenMaxAge")||V_;let Tl=null;const B_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>O_)return;const s=t==null?void 0:t.token;Tl!==s&&(Tl=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function F_(n=nd()){const e=ea(n,"auth");if(e.isInitialized())return e.getImmediate();const t=yy(n,{popupRedirectResolver:L_,persistence:[qy,la,Rd]}),r=Xu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=B_(i.toString());Sy(t,a,()=>a(t.currentUser)),Cy(t,c=>a(c))}}const s=Ku("auth");return s&&Ey(t,`http://${s}`),t}function U_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}fy({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Je("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",U_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});M_("Browser");var bl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jt,Vd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,y){function _(){}_.prototype=y.prototype,v.F=y.prototype,v.prototype=new _,v.prototype.constructor=v,v.D=function(T,I,S){for(var w=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)w[fe-2]=arguments[fe];return y.prototype[I].apply(T,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,y,_){_||(_=0);const T=Array(16);if(typeof y=="string")for(var I=0;I<16;++I)T[I]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(I=0;I<16;++I)T[I]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=v.g[0],_=v.g[1],I=v.g[2];let S=v.g[3],w;w=y+(S^_&(I^S))+T[0]+3614090360&4294967295,y=_+(w<<7&4294967295|w>>>25),w=S+(I^y&(_^I))+T[1]+3905402710&4294967295,S=y+(w<<12&4294967295|w>>>20),w=I+(_^S&(y^_))+T[2]+606105819&4294967295,I=S+(w<<17&4294967295|w>>>15),w=_+(y^I&(S^y))+T[3]+3250441966&4294967295,_=I+(w<<22&4294967295|w>>>10),w=y+(S^_&(I^S))+T[4]+4118548399&4294967295,y=_+(w<<7&4294967295|w>>>25),w=S+(I^y&(_^I))+T[5]+1200080426&4294967295,S=y+(w<<12&4294967295|w>>>20),w=I+(_^S&(y^_))+T[6]+2821735955&4294967295,I=S+(w<<17&4294967295|w>>>15),w=_+(y^I&(S^y))+T[7]+4249261313&4294967295,_=I+(w<<22&4294967295|w>>>10),w=y+(S^_&(I^S))+T[8]+1770035416&4294967295,y=_+(w<<7&4294967295|w>>>25),w=S+(I^y&(_^I))+T[9]+2336552879&4294967295,S=y+(w<<12&4294967295|w>>>20),w=I+(_^S&(y^_))+T[10]+4294925233&4294967295,I=S+(w<<17&4294967295|w>>>15),w=_+(y^I&(S^y))+T[11]+2304563134&4294967295,_=I+(w<<22&4294967295|w>>>10),w=y+(S^_&(I^S))+T[12]+1804603682&4294967295,y=_+(w<<7&4294967295|w>>>25),w=S+(I^y&(_^I))+T[13]+4254626195&4294967295,S=y+(w<<12&4294967295|w>>>20),w=I+(_^S&(y^_))+T[14]+2792965006&4294967295,I=S+(w<<17&4294967295|w>>>15),w=_+(y^I&(S^y))+T[15]+1236535329&4294967295,_=I+(w<<22&4294967295|w>>>10),w=y+(I^S&(_^I))+T[1]+4129170786&4294967295,y=_+(w<<5&4294967295|w>>>27),w=S+(_^I&(y^_))+T[6]+3225465664&4294967295,S=y+(w<<9&4294967295|w>>>23),w=I+(y^_&(S^y))+T[11]+643717713&4294967295,I=S+(w<<14&4294967295|w>>>18),w=_+(S^y&(I^S))+T[0]+3921069994&4294967295,_=I+(w<<20&4294967295|w>>>12),w=y+(I^S&(_^I))+T[5]+3593408605&4294967295,y=_+(w<<5&4294967295|w>>>27),w=S+(_^I&(y^_))+T[10]+38016083&4294967295,S=y+(w<<9&4294967295|w>>>23),w=I+(y^_&(S^y))+T[15]+3634488961&4294967295,I=S+(w<<14&4294967295|w>>>18),w=_+(S^y&(I^S))+T[4]+3889429448&4294967295,_=I+(w<<20&4294967295|w>>>12),w=y+(I^S&(_^I))+T[9]+568446438&4294967295,y=_+(w<<5&4294967295|w>>>27),w=S+(_^I&(y^_))+T[14]+3275163606&4294967295,S=y+(w<<9&4294967295|w>>>23),w=I+(y^_&(S^y))+T[3]+4107603335&4294967295,I=S+(w<<14&4294967295|w>>>18),w=_+(S^y&(I^S))+T[8]+1163531501&4294967295,_=I+(w<<20&4294967295|w>>>12),w=y+(I^S&(_^I))+T[13]+2850285829&4294967295,y=_+(w<<5&4294967295|w>>>27),w=S+(_^I&(y^_))+T[2]+4243563512&4294967295,S=y+(w<<9&4294967295|w>>>23),w=I+(y^_&(S^y))+T[7]+1735328473&4294967295,I=S+(w<<14&4294967295|w>>>18),w=_+(S^y&(I^S))+T[12]+2368359562&4294967295,_=I+(w<<20&4294967295|w>>>12),w=y+(_^I^S)+T[5]+4294588738&4294967295,y=_+(w<<4&4294967295|w>>>28),w=S+(y^_^I)+T[8]+2272392833&4294967295,S=y+(w<<11&4294967295|w>>>21),w=I+(S^y^_)+T[11]+1839030562&4294967295,I=S+(w<<16&4294967295|w>>>16),w=_+(I^S^y)+T[14]+4259657740&4294967295,_=I+(w<<23&4294967295|w>>>9),w=y+(_^I^S)+T[1]+2763975236&4294967295,y=_+(w<<4&4294967295|w>>>28),w=S+(y^_^I)+T[4]+1272893353&4294967295,S=y+(w<<11&4294967295|w>>>21),w=I+(S^y^_)+T[7]+4139469664&4294967295,I=S+(w<<16&4294967295|w>>>16),w=_+(I^S^y)+T[10]+3200236656&4294967295,_=I+(w<<23&4294967295|w>>>9),w=y+(_^I^S)+T[13]+681279174&4294967295,y=_+(w<<4&4294967295|w>>>28),w=S+(y^_^I)+T[0]+3936430074&4294967295,S=y+(w<<11&4294967295|w>>>21),w=I+(S^y^_)+T[3]+3572445317&4294967295,I=S+(w<<16&4294967295|w>>>16),w=_+(I^S^y)+T[6]+76029189&4294967295,_=I+(w<<23&4294967295|w>>>9),w=y+(_^I^S)+T[9]+3654602809&4294967295,y=_+(w<<4&4294967295|w>>>28),w=S+(y^_^I)+T[12]+3873151461&4294967295,S=y+(w<<11&4294967295|w>>>21),w=I+(S^y^_)+T[15]+530742520&4294967295,I=S+(w<<16&4294967295|w>>>16),w=_+(I^S^y)+T[2]+3299628645&4294967295,_=I+(w<<23&4294967295|w>>>9),w=y+(I^(_|~S))+T[0]+4096336452&4294967295,y=_+(w<<6&4294967295|w>>>26),w=S+(_^(y|~I))+T[7]+1126891415&4294967295,S=y+(w<<10&4294967295|w>>>22),w=I+(y^(S|~_))+T[14]+2878612391&4294967295,I=S+(w<<15&4294967295|w>>>17),w=_+(S^(I|~y))+T[5]+4237533241&4294967295,_=I+(w<<21&4294967295|w>>>11),w=y+(I^(_|~S))+T[12]+1700485571&4294967295,y=_+(w<<6&4294967295|w>>>26),w=S+(_^(y|~I))+T[3]+2399980690&4294967295,S=y+(w<<10&4294967295|w>>>22),w=I+(y^(S|~_))+T[10]+4293915773&4294967295,I=S+(w<<15&4294967295|w>>>17),w=_+(S^(I|~y))+T[1]+2240044497&4294967295,_=I+(w<<21&4294967295|w>>>11),w=y+(I^(_|~S))+T[8]+1873313359&4294967295,y=_+(w<<6&4294967295|w>>>26),w=S+(_^(y|~I))+T[15]+4264355552&4294967295,S=y+(w<<10&4294967295|w>>>22),w=I+(y^(S|~_))+T[6]+2734768916&4294967295,I=S+(w<<15&4294967295|w>>>17),w=_+(S^(I|~y))+T[13]+1309151649&4294967295,_=I+(w<<21&4294967295|w>>>11),w=y+(I^(_|~S))+T[4]+4149444226&4294967295,y=_+(w<<6&4294967295|w>>>26),w=S+(_^(y|~I))+T[11]+3174756917&4294967295,S=y+(w<<10&4294967295|w>>>22),w=I+(y^(S|~_))+T[2]+718787259&4294967295,I=S+(w<<15&4294967295|w>>>17),w=_+(S^(I|~y))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(I+(w<<21&4294967295|w>>>11))&4294967295,v.g[2]=v.g[2]+I&4294967295,v.g[3]=v.g[3]+S&4294967295}r.prototype.v=function(v,y){y===void 0&&(y=v.length);const _=y-this.blockSize,T=this.C;let I=this.h,S=0;for(;S<y;){if(I==0)for(;S<=_;)s(this,v,S),S+=this.blockSize;if(typeof v=="string"){for(;S<y;)if(T[I++]=v.charCodeAt(S++),I==this.blockSize){s(this,T),I=0;break}}else for(;S<y;)if(T[I++]=v[S++],I==this.blockSize){s(this,T),I=0;break}}this.h=I,this.o+=y},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;y=this.o*8;for(var _=v.length-8;_<v.length;++_)v[_]=y&255,y/=256;for(this.v(v),v=Array(16),y=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)v[y++]=this.g[_]>>>T&255;return v};function i(v,y){var _=c;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=y(v)}function a(v,y){this.h=y;const _=[];let T=!0;for(let I=v.length-1;I>=0;I--){const S=v[I]|0;T&&S==y||(_[I]=S,T=!1)}this.g=_}var c={};function u(v){return-128<=v&&v<128?i(v,function(y){return new a([y|0],y<0?-1:0)}):new a([v|0],v<0?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return A(d(-v));const y=[];let _=1;for(let T=0;v>=_;T++)y[T]=v/_|0,_*=4294967296;return new a(y,0)}function f(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return A(f(v.substring(1),y));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(y,8));let T=p;for(let S=0;S<v.length;S+=8){var I=Math.min(8,v.length-S);const w=parseInt(v.substring(S,S+I),y);I<8?(I=d(Math.pow(y,I)),T=T.j(I).add(d(w))):(T=T.j(_),T=T.add(d(w)))}return T}var p=u(0),E=u(1),b=u(16777216);n=a.prototype,n.m=function(){if(R(this))return-A(this).m();let v=0,y=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);v+=(T>=0?T:4294967296+T)*y,y*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(C(this))return"0";if(R(this))return"-"+A(this).toString(v);const y=d(Math.pow(v,6));var _=this;let T="";for(;;){const I=B(_,y).g;_=x(_,I.j(y));let S=((_.g.length>0?_.g[0]:_.h)>>>0).toString(v);if(_=I,C(_))return S+T;for(;S.length<6;)S="0"+S;T=S+T}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function C(v){if(v.h!=0)return!1;for(let y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function R(v){return v.h==-1}n.l=function(v){return v=x(this,v),R(v)?-1:C(v)?0:1};function A(v){const y=v.g.length,_=[];for(let T=0;T<y;T++)_[T]=~v.g[T];return new a(_,~v.h).add(E)}n.abs=function(){return R(this)?A(this):this},n.add=function(v){const y=Math.max(this.g.length,v.g.length),_=[];let T=0;for(let I=0;I<=y;I++){let S=T+(this.i(I)&65535)+(v.i(I)&65535),w=(S>>>16)+(this.i(I)>>>16)+(v.i(I)>>>16);T=w>>>16,S&=65535,w&=65535,_[I]=w<<16|S}return new a(_,_[_.length-1]&-2147483648?-1:0)};function x(v,y){return v.add(A(y))}n.j=function(v){if(C(this)||C(v))return p;if(R(this))return R(v)?A(this).j(A(v)):A(A(this).j(v));if(R(v))return A(this.j(A(v)));if(this.l(b)<0&&v.l(b)<0)return d(this.m()*v.m());const y=this.g.length+v.g.length,_=[];for(var T=0;T<2*y;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let I=0;I<v.g.length;I++){const S=this.i(T)>>>16,w=this.i(T)&65535,fe=v.i(I)>>>16,$e=v.i(I)&65535;_[2*T+2*I]+=w*$e,D(_,2*T+2*I),_[2*T+2*I+1]+=S*$e,D(_,2*T+2*I+1),_[2*T+2*I+1]+=w*fe,D(_,2*T+2*I+1),_[2*T+2*I+2]+=S*fe,D(_,2*T+2*I+2)}for(v=0;v<y;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=y;v<2*y;v++)_[v]=0;return new a(_,0)};function D(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function V(v,y){this.g=v,this.h=y}function B(v,y){if(C(y))throw Error("division by zero");if(C(v))return new V(p,p);if(R(v))return y=B(A(v),y),new V(A(y.g),A(y.h));if(R(y))return y=B(v,A(y)),new V(A(y.g),y.h);if(v.g.length>30){if(R(v)||R(y))throw Error("slowDivide_ only works with positive integers.");for(var _=E,T=y;T.l(v)<=0;)_=O(_),T=O(T);var I=F(_,1),S=F(T,1);for(T=F(T,2),_=F(_,2);!C(T);){var w=S.add(T);w.l(v)<=0&&(I=I.add(_),S=w),T=F(T,1),_=F(_,1)}return y=x(v,I.j(y)),new V(I,y)}for(I=p;v.l(y)>=0;){for(_=Math.max(1,Math.floor(v.m()/y.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),S=d(_),w=S.j(y);R(w)||w.l(v)>0;)_-=T,S=d(_),w=S.j(y);C(S)&&(S=E),I=I.add(S),v=x(v,w)}return new V(I,v)}n.B=function(v){return B(this,v).h},n.and=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<y;T++)_[T]=this.i(T)&v.i(T);return new a(_,this.h&v.h)},n.or=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<y;T++)_[T]=this.i(T)|v.i(T);return new a(_,this.h|v.h)},n.xor=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let T=0;T<y;T++)_[T]=this.i(T)^v.i(T);return new a(_,this.h^v.h)};function O(v){const y=v.g.length+1,_=[];for(let T=0;T<y;T++)_[T]=v.i(T)<<1|v.i(T-1)>>>31;return new a(_,v.h)}function F(v,y){const _=y>>5;y%=32;const T=v.g.length-_,I=[];for(let S=0;S<T;S++)I[S]=y>0?v.i(S+_)>>>y|v.i(S+_+1)<<32-y:v.i(S+_);return new a(I,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Vd=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,jt=a}).apply(typeof bl<"u"?bl:typeof self<"u"?self:typeof window<"u"?window:{});var ys=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Od,Tr,Bd,Rs,To,Fd,Ud,zd;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ys=="object"&&ys];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,l){if(l)e:{var h=r;o=o.split(".");for(var g=0;g<o.length-1;g++){var P=o[g];if(!(P in h))break e;h=h[P]}o=o[o.length-1],g=h[o],l=l(g),l!=g&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var h=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&h.push([g,l[g]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var g=h.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function p(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(g,P,k){for(var U=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)U[Q-2]=arguments[Q];return l.prototype[P].apply(g,U)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const l=o.length;if(l>0){const h=Array(l);for(let g=0;g<l;g++)h[g]=o[g];return h}return[]}function C(o,l){for(let g=1;g<arguments.length;g++){const P=arguments[g];var h=typeof P;if(h=h!="object"?h:P?Array.isArray(P)?"array":h:"null",h=="array"||h=="object"&&typeof P.length=="number"){h=o.length||0;const k=P.length||0;o.length=h+k;for(let U=0;U<k;U++)o[h+U]=P[U]}else o.push(P)}}class R{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function A(o){a.setTimeout(()=>{throw o},0)}function x(){var o=v;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class D{constructor(){this.h=this.g=null}add(l,h){const g=V.get();g.set(l,h),this.h?this.h.next=g:this.g=g,this.h=g}}var V=new R(()=>new B,o=>o.reset());class B{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let O,F=!1,v=new D,y=()=>{const o=Promise.resolve(void 0);O=()=>{o.then(_)}};function _(){for(var o;o=x();){try{o.h.call(o.g)}catch(h){A(h)}var l=V;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}F=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o}();function w(o){return/^[\s\xa0]*$/.test(o)}function fe(o,l){I.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(fe,I),fe.prototype.init=function(o,l){const h=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&fe.Z.h.call(this)},fe.prototype.h=function(){fe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var $e="closure_listenable_"+(Math.random()*1e6|0),j=0;function le(o,l,h,g,P){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!g,this.ha=P,this.key=++j,this.da=this.fa=!1}function ae(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function se(o,l,h){for(const g in o)l.call(h,o[g],g,o)}function de(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function et(o){const l={};for(const h in o)l[h]=o[h];return l}const tt="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Se(o,l){let h,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(h in g)o[h]=g[h];for(let k=0;k<tt.length;k++)h=tt[k],Object.prototype.hasOwnProperty.call(g,h)&&(o[h]=g[h])}}function Ct(o){this.src=o,this.g={},this.h=0}Ct.prototype.add=function(o,l,h,g,P){const k=o.toString();o=this.g[k],o||(o=this.g[k]=[],this.h++);const U=me(o,l,g,P);return U>-1?(l=o[U],h||(l.fa=!1)):(l=new le(l,this.src,k,!!g,P),l.fa=h,o.push(l)),l};function mt(o,l){const h=l.type;if(h in o.g){var g=o.g[h],P=Array.prototype.indexOf.call(g,l,void 0),k;(k=P>=0)&&Array.prototype.splice.call(g,P,1),k&&(ae(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function me(o,l,h,g){for(let P=0;P<o.length;++P){const k=o[P];if(!k.da&&k.listener==l&&k.capture==!!h&&k.ha==g)return P}return-1}var St="closure_lm_"+(Math.random()*1e6|0),Rt={};function rr(o,l,h,g,P){if(Array.isArray(l)){for(let k=0;k<l.length;k++)rr(o,l[k],h,g,P);return null}return h=Ya(h),o&&o[$e]?o.J(l,h,c(g)?!!g.capture:!1,P):bn(o,l,h,!1,g,P)}function bn(o,l,h,g,P,k){if(!l)throw Error("Invalid event type");const U=c(P)?!!P.capture:!!P;let Q=Ri(o);if(Q||(o[St]=Q=new Ct(o)),h=Q.add(l,h,g,U,k),h.proxy)return h;if(g=Bf(),h.proxy=g,g.src=o,g.listener=h,o.addEventListener)S||(P=U),P===void 0&&(P=!1),o.addEventListener(l.toString(),g,P);else if(o.attachEvent)o.attachEvent(Xa(l.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Bf(){function o(h){return l.call(o.src,o.listener,h)}const l=Ff;return o}function Qa(o,l,h,g,P){if(Array.isArray(l))for(var k=0;k<l.length;k++)Qa(o,l[k],h,g,P);else g=c(g)?!!g.capture:!!g,h=Ya(h),o&&o[$e]?(o=o.i,k=String(l).toString(),k in o.g&&(l=o.g[k],h=me(l,h,g,P),h>-1&&(ae(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[k],o.h--)))):o&&(o=Ri(o))&&(l=o.g[l.toString()],o=-1,l&&(o=me(l,h,g,P)),(h=o>-1?l[o]:null)&&Si(h))}function Si(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[$e])mt(l.i,o);else{var h=o.type,g=o.proxy;l.removeEventListener?l.removeEventListener(h,g,o.capture):l.detachEvent?l.detachEvent(Xa(h),g):l.addListener&&l.removeListener&&l.removeListener(g),(h=Ri(l))?(mt(h,o),h.h==0&&(h.src=null,l[St]=null)):ae(o)}}}function Xa(o){return o in Rt?Rt[o]:Rt[o]="on"+o}function Ff(o,l){if(o.da)o=!0;else{l=new fe(l,this);const h=o.listener,g=o.ha||o.src;o.fa&&Si(o),o=h.call(g,l)}return o}function Ri(o){return o=o[St],o instanceof Ct?o:null}var Pi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ya(o){return typeof o=="function"?o:(o[Pi]||(o[Pi]=function(l){return o.handleEvent(l)}),o[Pi])}function Re(){T.call(this),this.i=new Ct(this),this.M=this,this.G=null}p(Re,T),Re.prototype[$e]=!0,Re.prototype.removeEventListener=function(o,l,h,g){Qa(this,o,l,h,g)};function Me(o,l){var h,g=o.G;if(g)for(h=[];g;g=g.G)h.push(g);if(o=o.M,g=l.type||l,typeof l=="string")l=new I(l,o);else if(l instanceof I)l.target=l.target||o;else{var P=l;l=new I(g,o),Se(l,P)}P=!0;let k,U;if(h)for(U=h.length-1;U>=0;U--)k=l.g=h[U],P=rs(k,g,!0,l)&&P;if(k=l.g=o,P=rs(k,g,!0,l)&&P,P=rs(k,g,!1,l)&&P,h)for(U=0;U<h.length;U++)k=l.g=h[U],P=rs(k,g,!1,l)&&P}Re.prototype.N=function(){if(Re.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let g=0;g<h.length;g++)ae(h[g]);delete o.g[l],o.h--}}this.G=null},Re.prototype.J=function(o,l,h,g){return this.i.add(String(o),l,!1,h,g)},Re.prototype.K=function(o,l,h,g){return this.i.add(String(o),l,!0,h,g)};function rs(o,l,h,g){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let P=!0;for(let k=0;k<l.length;++k){const U=l[k];if(U&&!U.da&&U.capture==h){const Q=U.listener,ve=U.ha||U.src;U.fa&&mt(o.i,U),P=Q.call(ve,g)!==!1&&P}}return P&&!g.defaultPrevented}function Uf(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Ja(o){o.g=Uf(()=>{o.g=null,o.i&&(o.i=!1,Ja(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class zf extends T{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ja(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function sr(o){T.call(this),this.h=o,this.g={}}p(sr,T);var Za=[];function ec(o){se(o.g,function(l,h){this.g.hasOwnProperty(h)&&Si(l)},o),o.g={}}sr.prototype.N=function(){sr.Z.N.call(this),ec(this)},sr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ki=a.JSON.stringify,$f=a.JSON.parse,qf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function tc(){}function nc(){}var ir={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function xi(){I.call(this,"d")}p(xi,I);function Li(){I.call(this,"c")}p(Li,I);var Zt={},rc=null;function ss(){return rc=rc||new Re}Zt.Ia="serverreachability";function sc(o){I.call(this,Zt.Ia,o)}p(sc,I);function or(o){const l=ss();Me(l,new sc(l))}Zt.STAT_EVENT="statevent";function ic(o,l){I.call(this,Zt.STAT_EVENT,o),this.stat=l}p(ic,I);function Ve(o){const l=ss();Me(l,new ic(l,o))}Zt.Ja="timingevent";function oc(o,l){I.call(this,Zt.Ja,o),this.size=l}p(oc,I);function ar(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function cr(){this.g=!0}cr.prototype.ua=function(){this.g=!1};function jf(o,l,h,g,P,k){o.info(function(){if(o.g)if(k){var U="",Q=k.split("&");for(let ne=0;ne<Q.length;ne++){var ve=Q[ne].split("=");if(ve.length>1){const we=ve[0];ve=ve[1];const rt=we.split("_");U=rt.length>=2&&rt[1]=="type"?U+(we+"="+ve+"&"):U+(we+"=redacted&")}}}else U=null;else U=k;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+l+`
`+h+`
`+U})}function Hf(o,l,h,g,P,k,U){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+l+`
`+h+`
`+k+" "+U})}function An(o,l,h,g){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Gf(o,h)+(g?" "+g:"")})}function Wf(o,l){o.info(function(){return"TIMEOUT: "+l})}cr.prototype.info=function(){};function Gf(o,l){if(!o.g)return l;if(!l)return null;try{const k=JSON.parse(l);if(k){for(o=0;o<k.length;o++)if(Array.isArray(k[o])){var h=k[o];if(!(h.length<2)){var g=h[1];if(Array.isArray(g)&&!(g.length<1)){var P=g[0];if(P!="noop"&&P!="stop"&&P!="close")for(let U=1;U<g.length;U++)g[U]=""}}}}return ki(k)}catch{return l}}var is={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ac={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cc;function Ni(){}p(Ni,tc),Ni.prototype.g=function(){return new XMLHttpRequest},cc=new Ni;function lr(o){return encodeURIComponent(String(o))}function Kf(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function Pt(o,l,h,g){this.j=o,this.i=l,this.l=h,this.S=g||1,this.V=new sr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new lc}function lc(){this.i=null,this.g="",this.h=!1}var uc={},Di={};function Mi(o,l,h){o.M=1,o.A=as(nt(l)),o.u=h,o.R=!0,dc(o,null)}function dc(o,l){o.F=Date.now(),os(o),o.B=nt(o.A);var h=o.B,g=o.S;Array.isArray(g)||(g=[String(g)]),bc(h.i,"t",g),o.C=0,h=o.j.L,o.h=new lc,o.g=$c(o.j,h?l:null,!o.u),o.P>0&&(o.O=new zf(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,g=o.ba;var P="readystatechange";Array.isArray(P)||(P&&(Za[0]=P.toString()),P=Za);for(let k=0;k<P.length;k++){const U=rr(h,P[k],g||l.handleEvent,!1,l.h||l);if(!U)break;l.g[U.key]=U}l=o.J?et(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),or(),jf(o.i,o.v,o.B,o.l,o.S,o.u)}Pt.prototype.ba=function(o){o=o.target;const l=this.O;l&&Lt(o)==3?l.j():this.Y(o)},Pt.prototype.Y=function(o){try{if(o==this.g)e:{const Q=Lt(this.g),ve=this.g.ya(),ne=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||xc(this.g)))){this.K||Q!=4||ve==7||(ve==8||ne<=0?or(3):or(2)),Vi(this);var l=this.g.ca();this.X=l;var h=Qf(this);if(this.o=l==200,Hf(this.i,this.v,this.B,this.l,this.S,Q,l),this.o){if(this.U&&!this.L){t:{if(this.g){var g,P=this.g;if((g=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(g)){var k=g;break t}}k=null}if(o=k)An(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Oi(this,o);else{this.o=!1,this.m=3,Ve(12),en(this),ur(this);break e}}if(this.R){o=!0;let we;for(;!this.K&&this.C<h.length;)if(we=Xf(this,h),we==Di){Q==4&&(this.m=4,Ve(14),o=!1),An(this.i,this.l,null,"[Incomplete Response]");break}else if(we==uc){this.m=4,Ve(15),An(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else An(this.i,this.l,we,null),Oi(this,we);if(hc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||h.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)An(this.i,this.l,h,"[Invalid Chunked Response]"),en(this),ur(this);else if(h.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Hi(U),U.P=!0,Ve(11))}}else An(this.i,this.l,h,null),Oi(this,h);Q==4&&en(this),this.o&&!this.K&&(Q==4?Bc(this.j,this):(this.o=!1,os(this)))}else um(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),en(this),ur(this)}}}catch{}finally{}};function Qf(o){if(!hc(o))return o.g.la();const l=xc(o.g);if(l==="")return"";let h="";const g=l.length,P=Lt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return en(o),ur(o),"";o.h.i=new a.TextDecoder}for(let k=0;k<g;k++)o.h.h=!0,h+=o.h.i.decode(l[k],{stream:!(P&&k==g-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function hc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Xf(o,l){var h=o.C,g=l.indexOf(`
`,h);return g==-1?Di:(h=Number(l.substring(h,g)),isNaN(h)?uc:(g+=1,g+h>l.length?Di:(l=l.slice(g,g+h),o.C=g+h,l)))}Pt.prototype.cancel=function(){this.K=!0,en(this)};function os(o){o.T=Date.now()+o.H,fc(o,o.H)}function fc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=ar(d(o.aa,o),l)}function Vi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Pt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Wf(this.i,this.B),this.M!=2&&(or(),Ve(17)),en(this),this.m=2,ur(this)):fc(this,this.T-o)};function ur(o){o.j.I==0||o.K||Bc(o.j,o)}function en(o){Vi(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,ec(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function Oi(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||Bi(h.h,o))){if(!o.L&&Bi(h.h,o)&&h.I==3){try{var g=h.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)hs(h),us(h);else break e;ji(h),Ve(18)}}else h.xa=P[1],0<h.xa-h.K&&P[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=ar(d(h.Va,h),6e3));gc(h.h)<=1&&h.ta&&(h.ta=void 0)}else nn(h,11)}else if((o.L||h.g==o)&&hs(h),!w(l))for(P=h.Ba.g.parse(l),l=0;l<P.length;l++){let ne=P[l];const we=ne[0];if(!(we<=h.K))if(h.K=we,ne=ne[1],h.I==2)if(ne[0]=="c"){h.M=ne[1],h.ba=ne[2];const rt=ne[3];rt!=null&&(h.ka=rt,h.j.info("VER="+h.ka));const rn=ne[4];rn!=null&&(h.za=rn,h.j.info("SVER="+h.za));const Nt=ne[5];Nt!=null&&typeof Nt=="number"&&Nt>0&&(g=1.5*Nt,h.O=g,h.j.info("backChannelRequestTimeoutMs_="+g)),g=h;const Dt=o.g;if(Dt){const ms=Dt.g?Dt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ms){var k=g.h;k.g||ms.indexOf("spdy")==-1&&ms.indexOf("quic")==-1&&ms.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(Fi(k,k.h),k.h=null))}if(g.G){const Wi=Dt.g?Dt.g.getResponseHeader("X-HTTP-Session-Id"):null;Wi&&(g.wa=Wi,ie(g.J,g.G,Wi))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),g=h;var U=o;if(g.na=zc(g,g.L?g.ba:null,g.W),U.L){yc(g.h,U);var Q=U,ve=g.O;ve&&(Q.H=ve),Q.D&&(Vi(Q),os(Q)),g.g=U}else Vc(g);h.i.length>0&&ds(h)}else ne[0]!="stop"&&ne[0]!="close"||nn(h,7);else h.I==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?nn(h,7):qi(h):ne[0]!="noop"&&h.l&&h.l.qa(ne),h.A=0)}}or(4)}catch{}}var Yf=class{constructor(o,l){this.g=o,this.map=l}};function mc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function pc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function gc(o){return o.h?1:o.g?o.g.size:0}function Bi(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Fi(o,l){o.g?o.g.add(l):o.h=l}function yc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}mc.prototype.cancel=function(){if(this.i=_c(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function _c(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return b(o.i)}var Ec=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jf(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const g=o[h].indexOf("=");let P,k=null;g>=0?(P=o[h].substring(0,g),k=o[h].substring(g+1)):P=o[h],l(P,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function kt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof kt?(this.l=o.l,dr(this,o.j),this.o=o.o,this.g=o.g,hr(this,o.u),this.h=o.h,Ui(this,Ac(o.i)),this.m=o.m):o&&(l=String(o).match(Ec))?(this.l=!1,dr(this,l[1]||"",!0),this.o=fr(l[2]||""),this.g=fr(l[3]||"",!0),hr(this,l[4]),this.h=fr(l[5]||"",!0),Ui(this,l[6]||"",!0),this.m=fr(l[7]||"")):(this.l=!1,this.i=new pr(null,this.l))}kt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(mr(l,vc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(mr(l,vc,!0),"@"),o.push(lr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(mr(h,h.charAt(0)=="/"?tm:em,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",mr(h,rm)),o.join("")},kt.prototype.resolve=function(o){const l=nt(this);let h=!!o.j;h?dr(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var g=o.h;if(h)hr(l,o.u);else if(h=!!o.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var P=l.h.lastIndexOf("/");P!=-1&&(g=l.h.slice(0,P+1)+g)}if(P=g,P==".."||P==".")g="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){g=P.lastIndexOf("/",0)==0,P=P.split("/");const k=[];for(let U=0;U<P.length;){const Q=P[U++];Q=="."?g&&U==P.length&&k.push(""):Q==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),g&&U==P.length&&k.push("")):(k.push(Q),g=!0)}g=k.join("/")}else g=P}return h?l.h=g:h=o.i.toString()!=="",h?Ui(l,Ac(o.i)):h=!!o.m,h&&(l.m=o.m),l};function nt(o){return new kt(o)}function dr(o,l,h){o.j=h?fr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function hr(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Ui(o,l,h){l instanceof pr?(o.i=l,sm(o.i,o.l)):(h||(l=mr(l,nm)),o.i=new pr(l,o.l))}function ie(o,l,h){o.i.set(l,h)}function as(o){return ie(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function fr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function mr(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Zf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Zf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var vc=/[#\/\?@]/g,em=/[#\?:]/g,tm=/[#\?]/g,nm=/[#\?@]/g,rm=/#/g;function pr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function tn(o){o.g||(o.g=new Map,o.h=0,o.i&&Jf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=pr.prototype,n.add=function(o,l){tn(this),this.i=null,o=Cn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function Ic(o,l){tn(o),l=Cn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function wc(o,l){return tn(o),l=Cn(o,l),o.g.has(l)}n.forEach=function(o,l){tn(this),this.g.forEach(function(h,g){h.forEach(function(P){o.call(l,P,g,this)},this)},this)};function Tc(o,l){tn(o);let h=[];if(typeof l=="string")wc(o,l)&&(h=h.concat(o.g.get(Cn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return tn(this),this.i=null,o=Cn(this,o),wc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=Tc(this,o),o.length>0?String(o[0]):l):l};function bc(o,l,h){Ic(o,l),h.length>0&&(o.i=null,o.g.set(Cn(o,l),b(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var h=l[g];const P=lr(h);h=Tc(this,h);for(let k=0;k<h.length;k++){let U=P;h[k]!==""&&(U+="="+lr(h[k])),o.push(U)}}return this.i=o.join("&")};function Ac(o){const l=new pr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Cn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function sm(o,l){l&&!o.j&&(tn(o),o.i=null,o.g.forEach(function(h,g){const P=g.toLowerCase();g!=P&&(Ic(this,g),bc(this,P,h))},o)),o.j=l}function im(o,l){const h=new cr;if(a.Image){const g=new Image;g.onload=f(xt,h,"TestLoadImage: loaded",!0,l,g),g.onerror=f(xt,h,"TestLoadImage: error",!1,l,g),g.onabort=f(xt,h,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(xt,h,"TestLoadImage: timeout",!1,l,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else l(!1)}function om(o,l){const h=new cr,g=new AbortController,P=setTimeout(()=>{g.abort(),xt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:g.signal}).then(k=>{clearTimeout(P),k.ok?xt(h,"TestPingServer: ok",!0,l):xt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(P),xt(h,"TestPingServer: error",!1,l)})}function xt(o,l,h,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(h)}catch{}}function am(){this.g=new qf}function zi(o){this.i=o.Sb||null,this.h=o.ab||!1}p(zi,tc),zi.prototype.g=function(){return new cs(this.i,this.h)};function cs(o,l){Re.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(cs,Re),n=cs.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,yr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,gr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,yr(this)),this.g&&(this.readyState=3,yr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Cc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Cc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?gr(this):yr(this),this.readyState==3&&Cc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,gr(this))},n.Na=function(o){this.g&&(this.response=o,gr(this))},n.ga=function(){this.g&&gr(this)};function gr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,yr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function yr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(cs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Sc(o){let l="";return se(o,function(h,g){l+=g,l+=":",l+=h,l+=`\r
`}),l}function $i(o,l,h){e:{for(g in h){var g=!1;break e}g=!0}g||(h=Sc(h),typeof o=="string"?h!=null&&lr(h):ie(o,l,h))}function ue(o){Re.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ue,Re);var cm=/^https?$/i,lm=["POST","PUT"];n=ue.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cc.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(k){Rc(this,k);return}if(o=h||"",h=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)h.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const k of g.keys())h.set(k,g.get(k));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(h.keys()).find(k=>k.toLowerCase()=="content-type"),P=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(lm,l,void 0)>=0)||g||P||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,U]of h)this.g.setRequestHeader(k,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(k){Rc(this,k)}};function Rc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,Pc(o),ls(o)}function Pc(o){o.A||(o.A=!0,Me(o,"complete"),Me(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Me(this,"complete"),Me(this,"abort"),ls(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ls(this,!0)),ue.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?kc(this):this.Xa())},n.Xa=function(){kc(this)};function kc(o){if(o.h&&typeof i<"u"){if(o.v&&Lt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Me(o,"readystatechange"),Lt(o)==4){o.h=!1;try{const k=o.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var g;if(g=k===0){let U=String(o.D).match(Ec)[1]||null;!U&&a.self&&a.self.location&&(U=a.self.location.protocol.slice(0,-1)),g=!cm.test(U?U.toLowerCase():"")}h=g}if(h)Me(o,"complete"),Me(o,"success");else{o.o=6;try{var P=Lt(o)>2?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.ca()+"]",Pc(o)}}finally{ls(o)}}}}function ls(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||Me(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Lt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Lt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),$f(l)}};function xc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function um(o){const l={};o=(o.g&&Lt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(w(o[g]))continue;var h=Kf(o[g]);const P=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const k=l[P]||[];l[P]=k,k.push(h)}de(l,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function _r(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Lc(o){this.za=0,this.i=[],this.j=new cr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=_r("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=_r("baseRetryDelayMs",5e3,o),this.Za=_r("retryDelaySeedMs",1e4,o),this.Ta=_r("forwardChannelMaxRetries",2,o),this.va=_r("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new mc(o&&o.concurrentRequestLimit),this.Ba=new am,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Lc.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,g){Ve(0),this.W=o,this.H=l||{},h&&g!==void 0&&(this.H.OSID=h,this.H.OAID=g),this.F=this.X,this.J=zc(this,null,this.W),ds(this)};function qi(o){if(Nc(o),o.I==3){var l=o.V++,h=nt(o.J);if(ie(h,"SID",o.M),ie(h,"RID",l),ie(h,"TYPE","terminate"),Er(o,h),l=new Pt(o,o.j,l),l.M=2,l.A=as(nt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=$c(l.j,null),l.g.ea(l.A)),l.F=Date.now(),os(l)}Uc(o)}function us(o){o.g&&(Hi(o),o.g.cancel(),o.g=null)}function Nc(o){us(o),o.v&&(a.clearTimeout(o.v),o.v=null),hs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function ds(o){if(!pc(o.h)&&!o.m){o.m=!0;var l=o.Ea;O||y(),F||(O(),F=!0),v.add(l,o),o.D=0}}function dm(o,l){return gc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=ar(d(o.Ea,o,l),Fc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const P=new Pt(this,this.j,o);let k=this.o;if(this.U&&(k?(k=et(k),Se(k,this.U)):k=this.U),this.u!==null||this.R||(P.J=k,k=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var g=this.i[h];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Mc(this,P,l),h=nt(this.J),ie(h,"RID",o),ie(h,"CVER",22),this.G&&ie(h,"X-HTTP-Session-Id",this.G),Er(this,h),k&&(this.R?l="headers="+lr(Sc(k))+"&"+l:this.u&&$i(h,this.u,k)),Fi(this.h,P),this.Ra&&ie(h,"TYPE","init"),this.S?(ie(h,"$req",l),ie(h,"SID","null"),P.U=!0,Mi(P,h,null)):Mi(P,h,l),this.I=2}}else this.I==3&&(o?Dc(this,o):this.i.length==0||pc(this.h)||Dc(this))};function Dc(o,l){var h;l?h=l.l:h=o.V++;const g=nt(o.J);ie(g,"SID",o.M),ie(g,"RID",h),ie(g,"AID",o.K),Er(o,g),o.u&&o.o&&$i(g,o.u,o.o),h=new Pt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Mc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Fi(o.h,h),Mi(h,g,l)}function Er(o,l){o.H&&se(o.H,function(h,g){ie(l,g,h)}),o.l&&se({},function(h,g){ie(l,g,h)})}function Mc(o,l,h){h=Math.min(o.i.length,h);const g=o.l?d(o.l.Ka,o.l,o):null;e:{var P=o.i;let Q=-1;for(;;){const ve=["count="+h];Q==-1?h>0?(Q=P[0].g,ve.push("ofs="+Q)):Q=0:ve.push("ofs="+Q);let ne=!0;for(let we=0;we<h;we++){var k=P[we].g;const rt=P[we].map;if(k-=Q,k<0)Q=Math.max(0,P[we].g-100),ne=!1;else try{k="req"+k+"_"||"";try{var U=rt instanceof Map?rt:Object.entries(rt);for(const[rn,Nt]of U){let Dt=Nt;c(Nt)&&(Dt=ki(Nt)),ve.push(k+rn+"="+encodeURIComponent(Dt))}}catch(rn){throw ve.push(k+"type="+encodeURIComponent("_badmap")),rn}}catch{g&&g(rt)}}if(ne){U=ve.join("&");break e}}U=void 0}return o=o.i.splice(0,h),l.G=o,U}function Vc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;O||y(),F||(O(),F=!0),v.add(l,o),o.A=0}}function ji(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=ar(d(o.Da,o),Fc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Oc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=ar(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),us(this),Oc(this))};function Hi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Oc(o){o.g=new Pt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=nt(o.na);ie(l,"RID","rpc"),ie(l,"SID",o.M),ie(l,"AID",o.K),ie(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ie(l,"TO",o.ia),ie(l,"TYPE","xmlhttp"),Er(o,l),o.u&&o.o&&$i(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=as(nt(l)),h.u=null,h.R=!0,dc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,us(this),ji(this),Ve(19))};function hs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Bc(o,l){var h=null;if(o.g==l){hs(o),Hi(o),o.g=null;var g=2}else if(Bi(o.h,l))h=l.G,yc(o.h,l),g=1;else return;if(o.I!=0){if(l.o)if(g==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var P=o.D;g=ss(),Me(g,new oc(g,h)),ds(o)}else Vc(o);else if(P=l.m,P==3||P==0&&l.X>0||!(g==1&&dm(o,l)||g==2&&ji(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),P){case 1:nn(o,5);break;case 4:nn(o,10);break;case 3:nn(o,6);break;default:nn(o,2)}}}function Fc(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function nn(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),g=o.Ua;const P=!g;g=new kt(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||dr(g,"https"),as(g),P?im(g.toString(),h):om(g.toString(),h)}else Ve(2);o.I=0,o.l&&o.l.pa(l),Uc(o),Nc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function Uc(o){if(o.I=0,o.ja=[],o.l){const l=_c(o.h);(l.length!=0||o.i.length!=0)&&(C(o.ja,l),C(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function zc(o,l,h){var g=h instanceof kt?nt(h):new kt(h);if(g.g!="")l&&(g.g=l+"."+g.g),hr(g,g.u);else{var P=a.location;g=P.protocol,l=l?l+"."+P.hostname:P.hostname,P=+P.port;const k=new kt(null);g&&dr(k,g),l&&(k.g=l),P&&hr(k,P),h&&(k.h=h),g=k}return h=o.G,l=o.wa,h&&l&&ie(g,h,l),ie(g,"VER",o.ka),Er(o,g),g}function $c(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new ue(new zi({ab:h})):new ue(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function qc(){}n=qc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function fs(){}fs.prototype.g=function(o,l){return new qe(o,l)};function qe(o,l){Re.call(this),this.g=new Lc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!w(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!w(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Sn(this)}p(qe,Re),qe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},qe.prototype.close=function(){qi(this.g)},qe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=ki(o),o=h);l.i.push(new Yf(l.Ya++,o)),l.I==3&&ds(l)},qe.prototype.N=function(){this.g.l=null,delete this.j,qi(this.g),delete this.g,qe.Z.N.call(this)};function jc(o){xi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(jc,xi);function Hc(){Li.call(this),this.status=1}p(Hc,Li);function Sn(o){this.g=o}p(Sn,qc),Sn.prototype.ra=function(){Me(this.g,"a")},Sn.prototype.qa=function(o){Me(this.g,new jc(o))},Sn.prototype.pa=function(o){Me(this.g,new Hc)},Sn.prototype.oa=function(){Me(this.g,"b")},fs.prototype.createWebChannel=fs.prototype.g,qe.prototype.send=qe.prototype.o,qe.prototype.open=qe.prototype.m,qe.prototype.close=qe.prototype.close,zd=function(){return new fs},Ud=function(){return ss()},Fd=Zt,To={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},is.NO_ERROR=0,is.TIMEOUT=8,is.HTTP_ERROR=6,Rs=is,ac.COMPLETE="complete",Bd=ac,nc.EventType=ir,ir.OPEN="a",ir.CLOSE="b",ir.ERROR="c",ir.MESSAGE="d",Re.prototype.listen=Re.prototype.J,Tr=nc,ue.prototype.listenOnce=ue.prototype.K,ue.prototype.getLastError=ue.prototype.Ha,ue.prototype.getLastErrorCode=ue.prototype.ya,ue.prototype.getStatus=ue.prototype.ca,ue.prototype.getResponseJson=ue.prototype.La,ue.prototype.getResponseText=ue.prototype.la,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Fa,Od=ue}).apply(typeof ys<"u"?ys:typeof self<"u"?self:typeof window<"u"?window:{});const Al="@firebase/firestore",Cl="4.9.3";/**
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
 */class ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ke.UNAUTHENTICATED=new ke(null),ke.GOOGLE_CREDENTIALS=new ke("google-credentials-uid"),ke.FIRST_PARTY=new ke("first-party-uid"),ke.MOCK_USER=new ke("mock-user");/**
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
 */let Jn="12.7.0";/**
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
 */const yn=new Jo("@firebase/firestore");function Rn(){return yn.logLevel}function $(n,...e){if(yn.logLevel<=Y.DEBUG){const t=e.map(ha);yn.debug(`Firestore (${Jn}): ${n}`,...t)}}function wt(n,...e){if(yn.logLevel<=Y.ERROR){const t=e.map(ha);yn.error(`Firestore (${Jn}): ${n}`,...t)}}function qn(n,...e){if(yn.logLevel<=Y.WARN){const t=e.map(ha);yn.warn(`Firestore (${Jn}): ${n}`,...t)}}function ha(n){if(typeof n=="string")return n;try{/**
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
 */function H(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,$d(n,r,t)}function $d(n,e,t){let r=`FIRESTORE (${Jn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw wt(r),new Error(r)}function te(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||$d(e,s,r)}function K(n,e){return n}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends At{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Et{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class qd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class z_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ke.UNAUTHENTICATED))}shutdown(){}}class $_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class q_{constructor(e){this.t=e,this.currentUser=ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Et;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Et,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Et)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(te(typeof r.accessToken=="string",31837,{l:r}),new qd(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string",2055,{h:e}),new ke(e)}}class j_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class H_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new j_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Sl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class W_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){te(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Sl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Sl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function G_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class fa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=G_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function bo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return ro(s)===ro(i)?J(s,i):ro(s)?1:-1}return J(n.length,e.length)}const K_=55296,Q_=57343;function ro(n){const e=n.charCodeAt(0);return e>=K_&&e<=Q_}function jn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const Rl="__name__";class it{constructor(e,t,r){t===void 0?t=0:t>e.length&&H(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&H(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=it.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const r=it.isNumericId(e),s=it.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?it.extractNumericId(e).compare(it.extractNumericId(t)):bo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return jt.fromString(e.substring(4,e.length-2))}}class re extends it{construct(e,t,r){return new re(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new z(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new re(t)}static emptyPath(){return new re([])}}const X_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ae extends it{construct(e,t,r){return new Ae(e,t,r)}static isValidIdentifier(e){return X_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Rl}static keyField(){return new Ae([Rl])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new z(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new z(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new z(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(i(),s++)}if(i(),a)throw new z(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ae(t)}static emptyPath(){return new Ae([])}}/**
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
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(re.fromString(e))}static fromName(e){return new q(re.fromString(e).popFirst(5))}static empty(){return new q(re.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&re.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return re.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new re(e.slice()))}}/**
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
 */function jd(n,e,t){if(!t)throw new z(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Y_(n,e,t,r){if(e===!0&&r===!0)throw new z(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Pl(n){if(!q.isDocumentKey(n))throw new z(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kl(n){if(q.isDocumentKey(n))throw new z(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Hd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function di(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H(12329,{type:typeof n})}function Wt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new z(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=di(n);throw new z(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function _e(n,e){const t={typeString:n};return e&&(t.value=e),t}function Qr(n,e){if(!Hd(n))throw new z(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new z(N.INVALID_ARGUMENT,t);return!0}/**
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
 */const xl=-62135596800,Ll=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ll);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new z(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new z(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<xl)throw new z(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ll}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Qr(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-xl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:_e("string",oe._jsonSchemaVersion),seconds:_e("number"),nanoseconds:_e("number")};/**
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
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new oe(0,0))}static max(){return new G(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Br=-1;function J_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=G.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new Gt(s,q.empty(),e)}function Z_(n){return new Gt(n.readTime,n.key,Br)}class Gt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Gt(G.min(),q.empty(),Br)}static max(){return new Gt(G.max(),q.empty(),Br)}}function eE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
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
 */const tE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Zn(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==tE)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new M((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof M?t:M.resolve(t)}catch(t){return M.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):M.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):M.reject(t)}static resolve(e){return new M((t,r)=>{t(e)})}static reject(e){return new M((t,r)=>{r(e)})}static waitFor(e){return new M((t,r)=>{let s=0,i=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=M.resolve(!1);for(const r of e)t=t.next(s=>s?M.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new M((r,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++c,c===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new M((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function rE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function er(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class hi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}hi.ce=-1;/**
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
 */const ma=-1;function fi(n){return n==null}function Gs(n){return n===0&&1/n==-1/0}function sE(n){return typeof n=="number"&&Number.isInteger(n)&&!Gs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Wd="";function iE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Nl(e)),e=oE(n.get(t),e);return Nl(e)}function oE(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Wd:t+="";break;default:t+=i}}return t}function Nl(n){return n+Wd+""}/**
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
 */function Dl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function vn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ce{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _s(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _s(this.root,e,this.comparator,!1)}getReverseIterator(){return new _s(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _s(this.root,e,this.comparator,!0)}}class _s{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??be.RED,this.left=s??be.EMPTY,this.right=i??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new be(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw H(43730,{key:this.key,value:this.value});if(this.right.isRed())throw H(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw H(27949);return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw H(57766)}get value(){throw H(16141)}get color(){throw H(16727)}get left(){throw H(29726)}get right(){throw H(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ie{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ml(this.data.getIterator())}getIteratorFrom(e){return new Ml(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ie)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ie(this.comparator);return t.data=e,t}}class Ml{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ye{constructor(e){this.fields=e,e.sort(Ae.comparator)}static empty(){return new Ye([])}unionWith(e){let t=new Ie(Ae.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ye(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return jn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Kd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ce{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Kd("Invalid base64 string: "+i):i}}(e);return new Ce(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Ce(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ce.EMPTY_BYTE_STRING=new Ce("");const aE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Kt(n){if(te(!!n,39018),typeof n=="string"){let e=0;const t=aE.exec(n);if(te(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qt(n){return typeof n=="string"?Ce.fromBase64String(n):Ce.fromUint8Array(n)}/**
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
 */const Qd="server_timestamp",Xd="__type__",Yd="__previous_value__",Jd="__local_write_time__";function pa(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Xd])==null?void 0:r.stringValue)===Qd}function mi(n){const e=n.mapValue.fields[Yd];return pa(e)?mi(e):e}function Fr(n){const e=Kt(n.mapValue.fields[Jd].timestampValue);return new oe(e.seconds,e.nanos)}/**
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
 */class cE{constructor(e,t,r,s,i,a,c,u,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const Ks="(default)";class Ur{constructor(e,t){this.projectId=e,this.database=t||Ks}static empty(){return new Ur("","")}get isDefaultDatabase(){return this.database===Ks}isEqual(e){return e instanceof Ur&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Zd="__type__",lE="__max__",Es={mapValue:{}},eh="__vector__",Qs="value";function Xt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?pa(n)?4:dE(n)?9007199254740991:uE(n)?10:11:H(28295,{value:n})}function ft(n,e){if(n===e)return!0;const t=Xt(n);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Fr(n).isEqual(Fr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Kt(s.timestampValue),c=Kt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Qt(s.bytesValue).isEqual(Qt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return he(s.geoPointValue.latitude)===he(i.geoPointValue.latitude)&&he(s.geoPointValue.longitude)===he(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return he(s.integerValue)===he(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=he(s.doubleValue),c=he(i.doubleValue);return a===c?Gs(a)===Gs(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return jn(n.arrayValue.values||[],e.arrayValue.values||[],ft);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Dl(a)!==Dl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!ft(a[u],c[u])))return!1;return!0}(n,e);default:return H(52216,{left:n})}}function zr(n,e){return(n.values||[]).find(t=>ft(t,e))!==void 0}function Hn(n,e){if(n===e)return 0;const t=Xt(n),r=Xt(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=he(i.integerValue||i.doubleValue),u=he(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Vl(n.timestampValue,e.timestampValue);case 4:return Vl(Fr(n),Fr(e));case 5:return bo(n.stringValue,e.stringValue);case 6:return function(i,a){const c=Qt(i),u=Qt(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=J(c[d],u[d]);if(f!==0)return f}return J(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=J(he(i.latitude),he(a.latitude));return c!==0?c:J(he(i.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ol(n.arrayValue,e.arrayValue);case 10:return function(i,a){var E,b,C,R;const c=i.fields||{},u=a.fields||{},d=(E=c[Qs])==null?void 0:E.arrayValue,f=(b=u[Qs])==null?void 0:b.arrayValue,p=J(((C=d==null?void 0:d.values)==null?void 0:C.length)||0,((R=f==null?void 0:f.values)==null?void 0:R.length)||0);return p!==0?p:Ol(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Es.mapValue&&a===Es.mapValue)return 0;if(i===Es.mapValue)return 1;if(a===Es.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const E=bo(u[p],f[p]);if(E!==0)return E;const b=Hn(c[u[p]],d[f[p]]);if(b!==0)return b}return J(u.length,f.length)}(n.mapValue,e.mapValue);default:throw H(23264,{he:t})}}function Vl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Kt(n),r=Kt(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function Ol(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Hn(t[s],r[s]);if(i)return i}return J(t.length,r.length)}function Wn(n){return Ao(n)}function Ao(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Kt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return q.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Ao(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Ao(t.fields[a])}`;return s+"}"}(n.mapValue):H(61005,{value:n})}function Ps(n){switch(Xt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mi(n);return e?16+Ps(e):16;case 5:return 2*n.stringValue.length;case 6:return Qt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Ps(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return vn(r.fields,(i,a)=>{s+=i.length+Ps(a)}),s}(n.mapValue);default:throw H(13486,{value:n})}}function Bl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Co(n){return!!n&&"integerValue"in n}function ga(n){return!!n&&"arrayValue"in n}function Fl(n){return!!n&&"nullValue"in n}function Ul(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ks(n){return!!n&&"mapValue"in n}function uE(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Zd])==null?void 0:r.stringValue)===eh}function kr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return vn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=kr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=kr(n.arrayValue.values[t]);return e}return{...n}}function dE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===lE}/**
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
 */class We{constructor(e){this.value=e}static empty(){return new We({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ks(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=kr(t)}setAll(e){let t=Ae.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=kr(a):s.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ks(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ft(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ks(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){vn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new We(kr(this.value))}}function th(n){const e=[];return vn(n.fields,(t,r)=>{const s=new Ae([t]);if(ks(r)){const i=th(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ye(e)}/**
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
 */class Ne{constructor(e,t,r,s,i,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ne(e,0,G.min(),G.min(),G.min(),We.empty(),0)}static newFoundDocument(e,t,r,s){return new Ne(e,1,t,G.min(),r,s,0)}static newNoDocument(e,t){return new Ne(e,2,t,G.min(),G.min(),We.empty(),0)}static newUnknownDocument(e,t){return new Ne(e,3,t,G.min(),G.min(),We.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=We.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=We.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ne&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ne(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Xs{constructor(e,t){this.position=e,this.inclusive=t}}function zl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=q.comparator(q.fromName(a.referenceValue),t.key):r=Hn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function $l(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ft(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ys{constructor(e,t="asc"){this.field=e,this.dir=t}}function hE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class nh{}class ye extends nh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new mE(e,t,r):t==="array-contains"?new yE(e,r):t==="in"?new _E(e,r):t==="not-in"?new EE(e,r):t==="array-contains-any"?new vE(e,r):new ye(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new pE(e,r):new gE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Hn(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Hn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends nh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ze(e,t)}matches(e){return rh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function rh(n){return n.op==="and"}function sh(n){return fE(n)&&rh(n)}function fE(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function So(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+Wn(n.value);if(sh(n))return n.filters.map(e=>So(e)).join(",");{const e=n.filters.map(t=>So(t)).join(",");return`${n.op}(${e})`}}function ih(n,e){return n instanceof ye?function(r,s){return s instanceof ye&&r.op===s.op&&r.field.isEqual(s.field)&&ft(r.value,s.value)}(n,e):n instanceof Ze?function(r,s){return s instanceof Ze&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,c)=>i&&ih(a,s.filters[c]),!0):!1}(n,e):void H(19439)}function oh(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${Wn(t.value)}`}(n):n instanceof Ze?function(t){return t.op.toString()+" {"+t.getFilters().map(oh).join(" ,")+"}"}(n):"Filter"}class mE extends ye{constructor(e,t,r){super(e,t,r),this.key=q.fromName(r.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class pE extends ye{constructor(e,t){super(e,"in",t),this.keys=ah("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class gE extends ye{constructor(e,t){super(e,"not-in",t),this.keys=ah("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ah(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>q.fromName(r.referenceValue))}class yE extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ga(t)&&zr(t.arrayValue,this.value)}}class _E extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&zr(this.value.arrayValue,t)}}class EE extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(zr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!zr(this.value.arrayValue,t)}}class vE extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ga(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>zr(this.value.arrayValue,r))}}/**
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
 */class IE{constructor(e,t=null,r=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function ql(n,e=null,t=[],r=[],s=null,i=null,a=null){return new IE(n,e,t,r,s,i,a)}function ya(n){const e=K(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>So(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),fi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Wn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Wn(r)).join(",")),e.Te=t}return e.Te}function _a(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!hE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ih(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!$l(n.startAt,e.startAt)&&$l(n.endAt,e.endAt)}function Ro(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Xr{constructor(e,t=null,r=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function wE(n,e,t,r,s,i,a,c){return new Xr(n,e,t,r,s,i,a,c)}function Ea(n){return new Xr(n)}function jl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ch(n){return n.collectionGroup!==null}function xr(n){const e=K(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ie(Ae.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ys(i,r))}),t.has(Ae.keyField().canonicalString())||e.Ie.push(new Ys(Ae.keyField(),r))}return e.Ie}function at(n){const e=K(n);return e.Ee||(e.Ee=TE(e,xr(n))),e.Ee}function TE(n,e){if(n.limitType==="F")return ql(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ys(s.field,i)});const t=n.endAt?new Xs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Xs(n.startAt.position,n.startAt.inclusive):null;return ql(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Po(n,e){const t=n.filters.concat([e]);return new Xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ko(n,e,t){return new Xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function pi(n,e){return _a(at(n),at(e))&&n.limitType===e.limitType}function lh(n){return`${ya(at(n))}|lt:${n.limitType}`}function Pn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>oh(s)).join(", ")}]`),fi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Wn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Wn(s)).join(",")),`Target(${r})`}(at(n))}; limitType=${n.limitType})`}function gi(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):q.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of xr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const d=zl(a,c,u);return a.inclusive?d<=0:d<0}(r.startAt,xr(r),s)||r.endAt&&!function(a,c,u){const d=zl(a,c,u);return a.inclusive?d>=0:d>0}(r.endAt,xr(r),s))}(n,e)}function bE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function uh(n){return(e,t)=>{let r=!1;for(const s of xr(n)){const i=AE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function AE(n,e,t){const r=n.field.isKeyField()?q.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Hn(u,d):H(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return H(19790,{direction:n.dir})}}/**
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
 */class In{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){vn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Gd(this.inner)}size(){return this.innerSize}}/**
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
 */const CE=new ce(q.comparator);function Tt(){return CE}const dh=new ce(q.comparator);function br(...n){let e=dh;for(const t of n)e=e.insert(t.key,t);return e}function hh(n){let e=dh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function cn(){return Lr()}function fh(){return Lr()}function Lr(){return new In(n=>n.toString(),(n,e)=>n.isEqual(e))}const SE=new ce(q.comparator),RE=new Ie(q.comparator);function Z(...n){let e=RE;for(const t of n)e=e.add(t);return e}const PE=new Ie(J);function kE(){return PE}/**
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
 */function va(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gs(e)?"-0":e}}function mh(n){return{integerValue:""+n}}function xE(n,e){return sE(e)?mh(e):va(n,e)}/**
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
 */class yi{constructor(){this._=void 0}}function LE(n,e,t){return n instanceof Js?function(s,i){const a={fields:{[Xd]:{stringValue:Qd},[Jd]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&pa(i)&&(i=mi(i)),i&&(a.fields[Yd]=i),{mapValue:a}}(t,e):n instanceof $r?gh(n,e):n instanceof qr?yh(n,e):function(s,i){const a=ph(s,i),c=Hl(a)+Hl(s.Ae);return Co(a)&&Co(s.Ae)?mh(c):va(s.serializer,c)}(n,e)}function NE(n,e,t){return n instanceof $r?gh(n,e):n instanceof qr?yh(n,e):t}function ph(n,e){return n instanceof Zs?function(r){return Co(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Js extends yi{}class $r extends yi{constructor(e){super(),this.elements=e}}function gh(n,e){const t=_h(e);for(const r of n.elements)t.some(s=>ft(s,r))||t.push(r);return{arrayValue:{values:t}}}class qr extends yi{constructor(e){super(),this.elements=e}}function yh(n,e){let t=_h(e);for(const r of n.elements)t=t.filter(s=>!ft(s,r));return{arrayValue:{values:t}}}class Zs extends yi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Hl(n){return he(n.integerValue||n.doubleValue)}function _h(n){return ga(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function DE(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof $r&&s instanceof $r||r instanceof qr&&s instanceof qr?jn(r.elements,s.elements,ft):r instanceof Zs&&s instanceof Zs?ft(r.Ae,s.Ae):r instanceof Js&&s instanceof Js}(n.transform,e.transform)}class ME{constructor(e,t){this.version=e,this.transformResults=t}}class ct{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ct}static exists(e){return new ct(void 0,e)}static updateTime(e){return new ct(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function xs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class _i{}function Eh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ih(n.key,ct.none()):new Yr(n.key,n.data,ct.none());{const t=n.data,r=We.empty();let s=new Ie(Ae.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new wn(n.key,r,new Ye(s.toArray()),ct.none())}}function VE(n,e,t){n instanceof Yr?function(s,i,a){const c=s.value.clone(),u=Gl(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof wn?function(s,i,a){if(!xs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Gl(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(vh(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Nr(n,e,t,r){return n instanceof Yr?function(i,a,c,u){if(!xs(i.precondition,a))return c;const d=i.value.clone(),f=Kl(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof wn?function(i,a,c,u){if(!xs(i.precondition,a))return c;const d=Kl(i.fieldTransforms,u,a),f=a.data;return f.setAll(vh(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,c){return xs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function OE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=ph(r.transform,s||null);i!=null&&(t===null&&(t=We.empty()),t.set(r.field,i))}return t||null}function Wl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&jn(r,s,(i,a)=>DE(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Yr extends _i{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class wn extends _i{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function vh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Gl(n,e,t){const r=new Map;te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,c=e.data.field(i.field);r.set(i.field,NE(a,c,t[s]))}return r}function Kl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,LE(i,a,e))}return r}class Ih extends _i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class BE extends _i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class FE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&VE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Nr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Nr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=fh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=Eh(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(G.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Z())}isEqual(e){return this.batchId===e.batchId&&jn(this.mutations,e.mutations,(t,r)=>Wl(t,r))&&jn(this.baseMutations,e.baseMutations,(t,r)=>Wl(t,r))}}class Ia{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){te(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return SE}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Ia(e,t,r,s)}}/**
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
 */class UE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class zE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var pe,ee;function $E(n){switch(n){case N.OK:return H(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return H(15467,{code:n})}}function wh(n){if(n===void 0)return wt("GRPC error has no .code"),N.UNKNOWN;switch(n){case pe.OK:return N.OK;case pe.CANCELLED:return N.CANCELLED;case pe.UNKNOWN:return N.UNKNOWN;case pe.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case pe.INTERNAL:return N.INTERNAL;case pe.UNAVAILABLE:return N.UNAVAILABLE;case pe.UNAUTHENTICATED:return N.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case pe.NOT_FOUND:return N.NOT_FOUND;case pe.ALREADY_EXISTS:return N.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return N.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case pe.ABORTED:return N.ABORTED;case pe.OUT_OF_RANGE:return N.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return N.UNIMPLEMENTED;case pe.DATA_LOSS:return N.DATA_LOSS;default:return H(39323,{code:n})}}(ee=pe||(pe={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function qE(){return new TextEncoder}/**
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
 */const jE=new jt([4294967295,4294967295],0);function Ql(n){const e=qE().encode(n),t=new Vd;return t.update(e),new Uint8Array(t.digest())}function Xl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new jt([t,r],0),new jt([s,i],0)]}class wa{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ar(`Invalid padding: ${t}`);if(r<0)throw new Ar(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ar(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ar(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=jt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(jt.fromNumber(r)));return s.compare(jE)===1&&(s=new jt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Ql(e),[r,s]=Xl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new wa(i,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=Ql(e),[r,s]=Xl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ar extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ei{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Jr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ei(G.min(),s,new ce(J),Tt(),Z())}}class Jr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Jr(r,t,Z(),Z(),Z())}}/**
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
 */class Ls{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Th{constructor(e,t){this.targetId=e,this.Ce=t}}class bh{constructor(e,t,r=Ce.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Yl{constructor(){this.ve=0,this.Fe=Jl(),this.Me=Ce.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Z(),t=Z(),r=Z();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:H(38017,{changeType:i})}}),new Jr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Jl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class HE{constructor(e){this.Ge=e,this.ze=new Map,this.je=Tt(),this.Je=vs(),this.He=vs(),this.Ye=new ce(J)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:H(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Ro(i))if(r===0){const a=new q(i.path);this.et(t,a,Ne.newNoDocument(a,G.min()))}else te(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=Qt(r).toUint8Array()}catch(u){if(u instanceof Kd)return qn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new wa(a,s,i)}catch(u){return qn(u instanceof Ar?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Ro(c.target)){const u=new q(c.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,Ne.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=Z();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new Ei(e,t,this.Ye,this.je,r);return this.je=Tt(),this.Je=vs(),this.He=vs(),this.Ye=new ce(J),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Yl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Ie(J),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ie(J),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Yl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function vs(){return new ce(q.comparator)}function Jl(){return new ce(q.comparator)}const WE={asc:"ASCENDING",desc:"DESCENDING"},GE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},KE={and:"AND",or:"OR"};class QE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function xo(n,e){return n.useProto3Json||fi(e)?e:{value:e}}function ei(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ah(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function XE(n,e){return ei(n,e.toTimestamp())}function lt(n){return te(!!n,49232),G.fromTimestamp(function(t){const r=Kt(t);return new oe(r.seconds,r.nanos)}(n))}function Ta(n,e){return Lo(n,e).canonicalString()}function Lo(n,e){const t=function(s){return new re(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ch(n){const e=re.fromString(n);return te(xh(e),10190,{key:e.toString()}),e}function No(n,e){return Ta(n.databaseId,e.path)}function so(n,e){const t=Ch(e);if(t.get(1)!==n.databaseId.projectId)throw new z(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new z(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(Rh(t))}function Sh(n,e){return Ta(n.databaseId,e)}function YE(n){const e=Ch(n);return e.length===4?re.emptyPath():Rh(e)}function Do(n){return new re(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Rh(n){return te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Zl(n,e,t){return{name:No(n,e),fields:t.value.mapValue.fields}}function JE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:H(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(te(f===void 0||typeof f=="string",58123),Ce.fromBase64String(f||"")):(te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ce.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?N.UNKNOWN:wh(d.code);return new z(f,d.message||"")}(a);t=new bh(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=so(n,r.document.name),i=lt(r.document.updateTime),a=r.document.createTime?lt(r.document.createTime):G.min(),c=new We({mapValue:{fields:r.document.fields}}),u=Ne.newFoundDocument(s,i,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new Ls(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=so(n,r.document),i=r.readTime?lt(r.readTime):G.min(),a=Ne.newNoDocument(s,i),c=r.removedTargetIds||[];t=new Ls([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=so(n,r.document),i=r.removedTargetIds||[];t=new Ls([],i,s,null)}else{if(!("filter"in e))return H(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new zE(s,i),c=r.targetId;t=new Th(c,a)}}return t}function ZE(n,e){let t;if(e instanceof Yr)t={update:Zl(n,e.key,e.value)};else if(e instanceof Ih)t={delete:No(n,e.key)};else if(e instanceof wn)t={update:Zl(n,e.key,e.data),updateMask:cv(e.fieldMask)};else{if(!(e instanceof BE))return H(16599,{Vt:e.type});t={verify:No(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const c=a.transform;if(c instanceof Js)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof $r)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Zs)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw H(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:XE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:H(27497)}(n,e.precondition)),t}function ev(n,e){return n&&n.length>0?(te(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?lt(s.updateTime):lt(i);return a.isEqual(G.min())&&(a=lt(i)),new ME(a,s.transformResults||[])}(t,e))):[]}function tv(n,e){return{documents:[Sh(n,e.path)]}}function nv(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Sh(n,s);const i=function(d){if(d.length!==0)return kh(Ze.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(E){return{field:kn(E.field),direction:iv(E.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=xo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function rv(n){let e=YE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){te(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const E=Ph(p);return E instanceof Ze&&sh(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(E=>function(C){return new Ys(xn(C.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(E))}(t.orderBy));let c=null;t.limit&&(c=function(p){let E;return E=typeof p=="object"?p.value:p,fi(E)?null:E}(t.limit));let u=null;t.startAt&&(u=function(p){const E=!!p.before,b=p.values||[];return new Xs(b,E)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const E=!p.before,b=p.values||[];return new Xs(b,E)}(t.endAt)),wE(e,s,a,i,c,"F",u,d)}function sv(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ph(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=xn(t.unaryFilter.field);return ye.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=xn(t.unaryFilter.field);return ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=xn(t.unaryFilter.field);return ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xn(t.unaryFilter.field);return ye.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return H(61313);default:return H(60726)}}(n):n.fieldFilter!==void 0?function(t){return ye.create(xn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return H(58110);default:return H(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ze.create(t.compositeFilter.filters.map(r=>Ph(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return H(1026)}}(t.compositeFilter.op))}(n):H(30097,{filter:n})}function iv(n){return WE[n]}function ov(n){return GE[n]}function av(n){return KE[n]}function kn(n){return{fieldPath:n.canonicalString()}}function xn(n){return Ae.fromServerFormat(n.fieldPath)}function kh(n){return n instanceof ye?function(t){if(t.op==="=="){if(Ul(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(Fl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ul(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(Fl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:ov(t.op),value:t.value}}}(n):n instanceof Ze?function(t){const r=t.getFilters().map(s=>kh(s));return r.length===1?r[0]:{compositeFilter:{op:av(t.op),filters:r}}}(n):H(54877,{filter:n})}function cv(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function xh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Ft{constructor(e,t,r,s,i=G.min(),a=G.min(),c=Ce.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class lv{constructor(e){this.yt=e}}function uv(n){const e=rv({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ko(e,e.limit,"L"):e}/**
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
 */class dv{constructor(){this.Cn=new hv}addToCollectionParentIndex(e,t){return this.Cn.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Gt.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Gt.min())}updateCollectionGroup(e,t,r){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}}class hv{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new Ie(re.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ie(re.comparator)).toArray()}}/**
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
 */const eu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Lh=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(Lh,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
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
 */class Gn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Gn(0)}static cr(){return new Gn(-1)}}/**
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
 */const tu="LruGarbageCollector",fv=1048576;function nu([n,e],[t,r]){const s=J(n,t);return s===0?J(e,r):s}class mv{constructor(e){this.Ir=e,this.buffer=new Ie(nu),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();nu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class pv{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){$(tu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){er(t)?$(tu,"Ignoring IndexedDB error during garbage collection: ",t):await Zn(t)}await this.Vr(3e5)})}}class gv{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return M.resolve(hi.ce);const r=new mv(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(eu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),eu):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Rn()<=Y.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function yv(n,e){return new gv(n,e)}/**
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
 */class _v{constructor(){this.changes=new In(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ne.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?M.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Ev{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class vv{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Nr(r.mutation,s,Ye.empty(),oe.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Z()){const s=cn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=br();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=cn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Z()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let i=Tt();const a=Lr(),c=function(){return Lr()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof wn)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),Nr(f.mutation,d,f.mutation.getFieldMask(),oe.now())):a.set(d.key,Ye.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>c.set(d,new Ev(f,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const r=Lr();let s=new ce((a,c)=>a-c),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||Ye.empty();f=c.applyToLocalView(d,f),r.set(u,f);const p=(s.get(c.batchId)||Z()).add(u);s=s.insert(c.batchId,p)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=fh();f.forEach(E=>{if(!i.has(E)){const b=Eh(t.get(E),r.get(E));b!==null&&p.set(E,b),i=i.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return M.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return q.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ch(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):M.resolve(cn());let c=Br,u=i;return a.next(d=>M.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next(E=>{u=u.insert(f,E)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,Z())).next(f=>({batchId:c,changes:hh(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(r=>{let s=br();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=br();return this.indexManager.getCollectionParents(e,i).next(c=>M.forEach(c,u=>{const d=function(p,E){return new Xr(E,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,E)=>{a=a.insert(p,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Ne.newInvalidDocument(f)))});let c=br();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&Nr(f.mutation,d,Ye.empty(),oe.now()),gi(t,d)&&(c=c.insert(u,d))}),c})}}/**
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
 */class Iv{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return M.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:lt(s.createTime)}}(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:uv(s.bundledQuery),readTime:lt(s.readTime)}}(t)),M.resolve()}}/**
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
 */class wv{constructor(){this.overlays=new ce(q.comparator),this.qr=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){const r=cn();return M.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),M.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,t,r){const s=cn(),i=t.length+1,a=new q(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ce((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=cn(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=cn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=s)););return M.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new UE(t,r));let i=this.qr.get(t);i===void 0&&(i=Z(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class Tv{constructor(){this.sessionToken=Ce.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}}/**
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
 */class ba{constructor(){this.Qr=new Ie(Te.$r),this.Ur=new Ie(Te.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new Te(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new Te(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new q(new re([])),r=new Te(t,e),s=new Te(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new q(new re([])),r=new Te(t,e),s=new Te(t,e+1);let i=Z();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Te(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Te{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return q.comparator(e.key,t.key)||J(e.Yr,t.Yr)}static Kr(e,t){return J(e.Yr,t.Yr)||q.comparator(e.key,t.key)}}/**
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
 */class bv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Ie(Te.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new FE(i,t,r,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new Te(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?ma:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Te(t,0),s=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const c=this.Xr(a.Yr);i.push(c)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ie(J);return t.forEach(s=>{const i=new Te(s,0),a=new Te(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],c=>{r=r.add(c.Yr)})}),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;q.isDocumentKey(i)||(i=i.child(""));const a=new Te(new q(i),0);let c=new Ie(J);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(c=c.add(u.Yr)),!0)},a),M.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(t.mutations,s=>{const i=new Te(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new Te(t,0),s=this.Zr.firstAfterOrEqual(r);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Av{constructor(e){this.ri=e,this.docs=function(){return new ce(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return M.resolve(r?r.document.mutableCopy():Ne.newInvalidDocument(t))}getEntries(e,t){let r=Tt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ne.newInvalidDocument(s))}),M.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Tt();const a=t.path,c=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||eE(Z_(f),r)<=0||(s.has(f.key)||gi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,t,r,s){H(9500)}ii(e,t){return M.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Cv(this)}getSize(e){return M.resolve(this.size)}}class Cv extends _v{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),M.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class Sv{constructor(e){this.persistence=e,this.si=new In(t=>ya(t),_a),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.oi=0,this._i=new ba,this.targetCount=0,this.ai=Gn.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),M.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Gn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Pr(t),M.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return M.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),M.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),M.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return M.resolve(r)}containsKey(e,t){return M.resolve(this._i.containsKey(t))}}/**
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
 */class Nh{constructor(e,t){this.ui={},this.overlays={},this.ci=new hi(0),this.li=!1,this.li=!0,this.hi=new Tv,this.referenceDelegate=e(this),this.Pi=new Sv(this),this.indexManager=new dv,this.remoteDocumentCache=function(s){return new Av(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new lv(t),this.Ii=new Iv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new wv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new bv(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new Rv(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return M.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class Rv extends nE{constructor(e){super(),this.currentSequenceNumber=e}}class Aa{constructor(e){this.persistence=e,this.Ri=new ba,this.Vi=null}static mi(e){return new Aa(e)}get fi(){if(this.Vi)return this.Vi;throw H(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),M.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),M.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,r=>{const s=q.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,G.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return M.or([()=>M.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class ti{constructor(e,t){this.persistence=e,this.pi=new In(r=>iE(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=yv(this,t)}static mi(e,t){return new ti(e,t)}Ei(){}di(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return M.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?M.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(c=>{c||(r++,i.removeEntry(a,G.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ps(e.data.value)),t}br(e,t,r){return M.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Ca{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=Z(),s=Z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ca(e,t.fromCache,r,s)}}/**
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
 */class Pv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class kv{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Ip()?8:rE(De())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Pv;return this.Ss(e,t,a).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,a,c.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(Rn()<=Y.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Pn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Rn()<=Y.DEBUG&&$("QueryEngine","Query:",Pn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Rn()<=Y.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Pn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):M.resolve())}ys(e,t){if(jl(t))return M.resolve(null);let r=at(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=ko(t,null,"F"),r=at(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Z(...i);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.Ds(t,c);return this.Cs(t,d,a,u.readTime)?this.ys(e,ko(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,r,s){return jl(t)||s.isEqual(G.min())?M.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?M.resolve(null):(Rn()<=Y.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Pn(t)),this.vs(e,a,t,J_(s,Br)).next(c=>c))})}Ds(e,t){let r=new Ie(uh(e));return t.forEach((s,i)=>{gi(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Rn()<=Y.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Pn(t)),this.ps.getDocumentsMatchingQuery(e,t,Gt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Sa="LocalStore",xv=3e8;class Lv{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new ce(J),this.xs=new In(i=>ya(i),_a),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new vv(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Nv(n,e,t,r){return new Lv(n,e,t,r)}async function Dh(n,e){const t=K(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],c=[];let u=Z();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:c}))})})}function Dv(n,e){const t=K(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,E=p.keys();let b=M.resolve();return E.forEach(C=>{b=b.next(()=>f.getEntry(u,C)).next(R=>{const A=d.docVersions.get(C);te(A!==null,48541),R.version.compareTo(A)<0&&(p.applyToRemoteDocument(R,d),R.isValidDocument()&&(R.setReadTime(d.commitVersion),f.addEntry(R)))})}),b.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=Z();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Mh(n){const e=K(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Mv(n,e){const t=K(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const E=s.get(p);if(!E)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p)));let b=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(Ce.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,r)),s=s.insert(p,b),function(R,A,x){return R.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=xv?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(E,b,f)&&c.push(t.Pi.updateTargetData(i,b))});let u=Tt(),d=Z();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(Vv(i,a,e.documentUpdates).next(f=>{u=f.ks,d=f.qs})),!r.isEqual(G.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));c.push(f)}return M.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=s,i))}function Vv(n,e,t){let r=Z(),s=Z();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Tt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(G.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):$(Sa,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:s}})}function Ov(n,e){const t=K(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ma),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Bv(n,e){const t=K(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,M.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new Ft(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function Mo(n,e,t){const r=K(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!er(a))throw a;$(Sa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function ru(n,e,t){const r=K(n);let s=G.min(),i=Z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=K(u),E=p.xs.get(f);return E!==void 0?M.resolve(p.Ms.get(E)):p.Pi.getTargetData(d,f)}(r,a,at(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:G.min(),t?i:Z())).next(c=>(Fv(r,bE(e),c),{documents:c,Qs:i})))}function Fv(n,e,t){let r=n.Os.get(e)||G.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class su{constructor(){this.activeTargetIds=kE()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Uv{constructor(){this.Mo=new su,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new su,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class zv{Oo(e){}shutdown(){}}/**
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
 */const iu="ConnectivityMonitor";class ou{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){$(iu,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){$(iu,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Is=null;function Vo(){return Is===null?Is=function(){return 268435456+Math.round(2147483648*Math.random())}():Is++,"0x"+Is.toString(16)}/**
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
 */const io="RestConnection",$v={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class qv{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Ks?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=Vo(),c=this.zo(e,t.toUriEncodedString());$(io,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:d}=new URL(c),f=Qn(d);return this.Jo(e,c,u,r,f).then(p=>($(io,`Received RPC '${e}' ${a}: `,p),p),p=>{throw qn(io,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",r),p})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Jn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=$v[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class jv{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Pe="WebChannelConnection";class Hv extends qv{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=Vo();return new Promise((c,u)=>{const d=new Od;d.setWithCredentials(!0),d.listenOnce(Bd.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Rs.NO_ERROR:const p=d.getResponseJson();$(Pe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case Rs.TIMEOUT:$(Pe,`RPC '${e}' ${a} timed out`),u(new z(N.DEADLINE_EXCEEDED,"Request time out"));break;case Rs.HTTP_ERROR:const E=d.getStatus();if($(Pe,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let b=d.getResponseJson();Array.isArray(b)&&(b=b[0]);const C=b==null?void 0:b.error;if(C&&C.status&&C.message){const R=function(x){const D=x.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(D)>=0?D:N.UNKNOWN}(C.status);u(new z(R,C.message))}else u(new z(N.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new z(N.UNAVAILABLE,"Connection failed."));break;default:H(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{$(Pe,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);$(Pe,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",f,r,15)})}T_(e,t,r){const s=Vo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=zd(),c=Ud(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");$(Pe,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.I_(p);let E=!1,b=!1;const C=new jv({Yo:A=>{b?$(Pe,`Not sending because RPC '${e}' stream ${s} is closed:`,A):(E||($(Pe,`Opening RPC '${e}' stream ${s} transport.`),p.open(),E=!0),$(Pe,`RPC '${e}' stream ${s} sending:`,A),p.send(A))},Zo:()=>p.close()}),R=(A,x,D)=>{A.listen(x,V=>{try{D(V)}catch(B){setTimeout(()=>{throw B},0)}})};return R(p,Tr.EventType.OPEN,()=>{b||($(Pe,`RPC '${e}' stream ${s} transport opened.`),C.o_())}),R(p,Tr.EventType.CLOSE,()=>{b||(b=!0,$(Pe,`RPC '${e}' stream ${s} transport closed`),C.a_(),this.E_(p))}),R(p,Tr.EventType.ERROR,A=>{b||(b=!0,qn(Pe,`RPC '${e}' stream ${s} transport errored. Name:`,A.name,"Message:",A.message),C.a_(new z(N.UNAVAILABLE,"The operation could not be completed")))}),R(p,Tr.EventType.MESSAGE,A=>{var x;if(!b){const D=A.data[0];te(!!D,16349);const V=D,B=(V==null?void 0:V.error)||((x=V[0])==null?void 0:x.error);if(B){$(Pe,`RPC '${e}' stream ${s} received error:`,B);const O=B.status;let F=function(_){const T=pe[_];if(T!==void 0)return wh(T)}(O),v=B.message;F===void 0&&(F=N.INTERNAL,v="Unknown error status: "+O+" with message "+B.message),b=!0,C.a_(new z(F,v)),p.close()}else $(Pe,`RPC '${e}' stream ${s} received:`,D),C.u_(D)}}),R(c,Fd.STAT_EVENT,A=>{A.stat===To.PROXY?$(Pe,`RPC '${e}' stream ${s} detected buffering proxy`):A.stat===To.NOPROXY&&$(Pe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.__()},0),C}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function oo(){return typeof document<"u"?document:null}/**
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
 */function vi(n){return new QE(n,!0)}/**
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
 */class Vh{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const au="PersistentStream";class Oh{constructor(e,t,r,s,i,a,c,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Vh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(wt(t.toString()),wt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new z(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return $(au,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():($(au,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wv extends Oh{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=JE(this.serializer,e),r=function(i){if(!("targetChange"in i))return G.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?G.min():a.readTime?lt(a.readTime):G.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Do(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=Ro(u)?{documents:tv(i,u)}:{query:nv(i,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Ah(i,a.resumeToken);const d=xo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(G.min())>0){c.readTime=ei(i,a.snapshotVersion.toTimestamp());const d=xo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const r=sv(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Do(this.serializer),t.removeTarget=e,this.q_(t)}}class Gv extends Oh{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=ev(e.writeResults,e.commitTime),r=lt(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Do(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ZE(this.serializer,r))};this.q_(t)}}/**
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
 */class Kv{}class Qv extends Kv{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new z(N.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,Lo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new z(N.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,Lo(t,r),s,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(N.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Xv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(wt(t),this.aa=!1):$("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const _n="RemoteStore";class Yv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{Tn(this)&&($(_n,"Restarting streams for network reachability change."),await async function(u){const d=K(u);d.Ea.add(4),await Zr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Ii(d)}(this))})}),this.Ra=new Xv(r,s)}}async function Ii(n){if(Tn(n))for(const e of n.da)await e(!0)}async function Zr(n){for(const e of n.da)await e(!1)}function Bh(n,e){const t=K(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),xa(t)?ka(t):tr(t).O_()&&Pa(t,e))}function Ra(n,e){const t=K(n),r=tr(t);t.Ia.delete(e),r.O_()&&Fh(t,e),t.Ia.size===0&&(r.O_()?r.L_():Tn(t)&&t.Ra.set("Unknown"))}function Pa(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}tr(n).Y_(e)}function Fh(n,e){n.Va.Ue(e),tr(n).Z_(e)}function ka(n){n.Va=new HE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),tr(n).start(),n.Ra.ua()}function xa(n){return Tn(n)&&!tr(n).x_()&&n.Ia.size>0}function Tn(n){return K(n).Ea.size===0}function Uh(n){n.Va=void 0}async function Jv(n){n.Ra.set("Online")}async function Zv(n){n.Ia.forEach((e,t)=>{Pa(n,e)})}async function eI(n,e){Uh(n),xa(n)?(n.Ra.ha(e),ka(n)):n.Ra.set("Unknown")}async function tI(n,e,t){if(n.Ra.set("Online"),e instanceof bh&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))}(n,e)}catch(r){$(_n,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ni(n,r)}else if(e instanceof Ls?n.Va.Ze(e):e instanceof Th?n.Va.st(e):n.Va.tt(e),!t.isEqual(G.min()))try{const r=await Mh(n.localStore);t.compareTo(r)>=0&&await function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(d);f&&i.Ia.set(d,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Ce.EMPTY_BYTE_STRING,f.snapshotVersion)),Fh(i,u);const p=new Ft(f.target,u,d,f.sequenceNumber);Pa(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){$(_n,"Failed to raise snapshot:",r),await ni(n,r)}}async function ni(n,e,t){if(!er(e))throw e;n.Ea.add(1),await Zr(n),n.Ra.set("Offline"),t||(t=()=>Mh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(_n,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Ii(n)})}function zh(n,e){return e().catch(t=>ni(n,t,e))}async function wi(n){const e=K(n),t=Yt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ma;for(;nI(e);)try{const s=await Ov(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,rI(e,s)}catch(s){await ni(e,s)}$h(e)&&qh(e)}function nI(n){return Tn(n)&&n.Ta.length<10}function rI(n,e){n.Ta.push(e);const t=Yt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function $h(n){return Tn(n)&&!Yt(n).x_()&&n.Ta.length>0}function qh(n){Yt(n).start()}async function sI(n){Yt(n).ra()}async function iI(n){const e=Yt(n);for(const t of n.Ta)e.ea(t.mutations)}async function oI(n,e,t){const r=n.Ta.shift(),s=Ia.from(r,e,t);await zh(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await wi(n)}async function aI(n,e){e&&Yt(n).X_&&await async function(r,s){if(function(a){return $E(a)&&a!==N.ABORTED}(s.code)){const i=r.Ta.shift();Yt(r).B_(),await zh(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await wi(r)}}(n,e),$h(n)&&qh(n)}async function cu(n,e){const t=K(n);t.asyncQueue.verifyOperationInProgress(),$(_n,"RemoteStore received new credentials");const r=Tn(t);t.Ea.add(3),await Zr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Ii(t)}async function cI(n,e){const t=K(n);e?(t.Ea.delete(2),await Ii(t)):e||(t.Ea.add(2),await Zr(t),t.Ra.set("Unknown"))}function tr(n){return n.ma||(n.ma=function(t,r,s){const i=K(t);return i.sa(),new Wv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:Jv.bind(null,n),t_:Zv.bind(null,n),r_:eI.bind(null,n),H_:tI.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),xa(n)?ka(n):n.Ra.set("Unknown")):(await n.ma.stop(),Uh(n))})),n.ma}function Yt(n){return n.fa||(n.fa=function(t,r,s){const i=K(t);return i.sa(),new Gv(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:sI.bind(null,n),r_:aI.bind(null,n),ta:iI.bind(null,n),na:oI.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await wi(n)):(await n.fa.stop(),n.Ta.length>0&&($(_n,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class La{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Et,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,c=new La(e,t,a,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Na(n,e){if(wt("AsyncQueue",`${e}: ${n}`),er(n))return new z(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class On{static emptySet(e){return new On(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||q.comparator(t.key,r.key):(t,r)=>q.comparator(t.key,r.key),this.keyedMap=br(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof On)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new On;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class lu{constructor(){this.ga=new ce(q.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):H(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Kn{constructor(e,t,r,s,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Kn(e,t,On.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&pi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class lI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class uI{constructor(){this.queries=uu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=K(t),i=s.queries;s.queries=uu(),i.forEach((a,c)=>{for(const u of c.Sa)u.onError(r)})})(this,new z(N.ABORTED,"Firestore shutting down"))}}function uu(){return new In(n=>lh(n),pi)}async function jh(n,e){const t=K(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new lI,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Na(a,`Initialization of query '${Pn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Da(t)}async function Hh(n,e){const t=K(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function dI(n,e){const t=K(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(r=!0);a.wa=s}}r&&Da(t)}function hI(n,e,t){const r=K(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Da(n){n.Ca.forEach(e=>{e.next()})}var Oo,du;(du=Oo||(Oo={})).Ma="default",du.Cache="cache";class Wh{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Kn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Kn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Oo.Cache}}/**
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
 */class Gh{constructor(e){this.key=e}}class Kh{constructor(e){this.key=e}}class fI{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Z(),this.mutatedKeys=Z(),this.eu=uh(e),this.tu=new On(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new lu,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const E=s.get(f),b=gi(this.query,p)?p:null,C=!!E&&this.mutatedKeys.has(E.key),R=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let A=!1;E&&b?E.data.isEqual(b.data)?C!==R&&(r.track({type:3,doc:b}),A=!0):this.su(E,b)||(r.track({type:2,doc:b}),A=!0,(u&&this.eu(b,u)>0||d&&this.eu(b,d)<0)&&(c=!0)):!E&&b?(r.track({type:0,doc:b}),A=!0):E&&!b&&(r.track({type:1,doc:E}),A=!0,(u||d)&&(c=!0)),A&&(b?(a=a.add(b),i=R?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(b,C){const R=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H(20277,{Rt:A})}};return R(b)-R(C)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new Kn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new lu,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Z(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Kh(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new Gh(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=Z();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Kn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ma="SyncEngine";class mI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class pI{constructor(e){this.key=e,this.hu=!1}}class gI{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new In(c=>lh(c),pi),this.Iu=new Map,this.Eu=new Set,this.du=new ce(q.comparator),this.Au=new Map,this.Ru=new ba,this.Vu={},this.mu=new Map,this.fu=Gn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function yI(n,e,t=!0){const r=ef(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Qh(r,e,t,!0),s}async function _I(n,e){const t=ef(n);await Qh(t,e,!0,!1)}async function Qh(n,e,t,r){const s=await Bv(n.localStore,at(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await EI(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Bh(n.remoteStore,s),c}async function EI(n,e,t,r,s){n.pu=(p,E,b)=>async function(R,A,x,D){let V=A.view.ru(x);V.Cs&&(V=await ru(R.localStore,A.query,!1).then(({documents:v})=>A.view.ru(v,V)));const B=D&&D.targetChanges.get(A.targetId),O=D&&D.targetMismatches.get(A.targetId)!=null,F=A.view.applyChanges(V,R.isPrimaryClient,B,O);return fu(R,A.targetId,F.au),F.snapshot}(n,p,E,b);const i=await ru(n.localStore,e,!0),a=new fI(e,i.Qs),c=a.ru(i.documents),u=Jr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(c,n.isPrimaryClient,u);fu(n,t,d.au);const f=new mI(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function vI(n,e,t){const r=K(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!pi(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Mo(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&Ra(r.remoteStore,s.targetId),Bo(r,s.targetId)}).catch(Zn)):(Bo(r,s.targetId),await Mo(r.localStore,s.targetId,!0))}async function II(n,e){const t=K(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ra(t.remoteStore,r.targetId))}async function wI(n,e,t){const r=PI(n);try{const s=await function(a,c){const u=K(a),d=oe.now(),f=c.reduce((b,C)=>b.add(C.key),Z());let p,E;return u.persistence.runTransaction("Locally write mutations","readwrite",b=>{let C=Tt(),R=Z();return u.Ns.getEntries(b,f).next(A=>{C=A,C.forEach((x,D)=>{D.isValidDocument()||(R=R.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(b,C)).next(A=>{p=A;const x=[];for(const D of c){const V=OE(D,p.get(D.key).overlayedDocument);V!=null&&x.push(new wn(D.key,V,th(V.value.mapValue),ct.exists(!0)))}return u.mutationQueue.addMutationBatch(b,d,x,c)}).next(A=>{E=A;const x=A.applyToLocalDocumentSet(p,R);return u.documentOverlayCache.saveOverlays(b,A.batchId,x)})}).then(()=>({batchId:E.batchId,changes:hh(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,u),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await es(r,s.changes),await wi(r.remoteStore)}catch(s){const i=Na(s,"Failed to persist write");t.reject(i)}}async function Xh(n,e){const t=K(n);try{const r=await Mv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?te(a.hu,14607):s.removedDocuments.size>0&&(te(a.hu,42227),a.hu=!1))}),await es(t,r,e)}catch(r){await Zn(r)}}function hu(n,e,t){const r=K(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=K(a);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const E of p.Sa)E.va(c)&&(d=!0)}),d&&Da(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function TI(n,e,t){const r=K(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new ce(q.comparator);a=a.insert(i,Ne.newNoDocument(i,G.min()));const c=Z().add(i),u=new Ei(G.min(),new Map,new ce(J),a,c);await Xh(r,u),r.du=r.du.remove(i),r.Au.delete(e),Va(r)}else await Mo(r.localStore,e,!1).then(()=>Bo(r,e,t)).catch(Zn)}async function bI(n,e){const t=K(n),r=e.batch.batchId;try{const s=await Dv(t.localStore,e);Jh(t,r,null),Yh(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await es(t,s)}catch(s){await Zn(s)}}async function AI(n,e,t){const r=K(n);try{const s=await function(a,c){const u=K(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(te(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);Jh(r,e,t),Yh(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await es(r,s)}catch(s){await Zn(s)}}function Yh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Jh(n,e,t){const r=K(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Bo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||Zh(n,r)})}function Zh(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ra(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Va(n))}function fu(n,e,t){for(const r of t)r instanceof Gh?(n.Ru.addReference(r.key,e),CI(n,r)):r instanceof Kh?($(Ma,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Zh(n,r.key)):H(19791,{wu:r})}function CI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||($(Ma,"New document in limbo: "+t),n.Eu.add(r),Va(n))}function Va(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new q(re.fromString(e)),r=n.fu.next();n.Au.set(r,new pI(t)),n.du=n.du.insert(t,r),Bh(n.remoteStore,new Ft(at(Ea(t.path)),r,"TargetPurposeLimboResolution",hi.ce))}}async function es(n,e,t){const r=K(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((c,u)=>{a.push(r.pu(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=Ca.As(u.targetId,d);i.push(p)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(u,d){const f=K(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>M.forEach(d,E=>M.forEach(E.Es,b=>f.persistence.referenceDelegate.addReference(p,E.targetId,b)).next(()=>M.forEach(E.ds,b=>f.persistence.referenceDelegate.removeReference(p,E.targetId,b)))))}catch(p){if(!er(p))throw p;$(Sa,"Failed to update sequence numbers: "+p)}for(const p of d){const E=p.targetId;if(!p.fromCache){const b=f.Ms.get(E),C=b.snapshotVersion,R=b.withLastLimboFreeSnapshotVersion(C);f.Ms=f.Ms.insert(E,R)}}}(r.localStore,i))}async function SI(n,e){const t=K(n);if(!t.currentUser.isEqual(e)){$(Ma,"User change. New user:",e.toKey());const r=await Dh(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new z(N.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await es(t,r.Ls)}}function RI(n,e){const t=K(n),r=t.Au.get(e);if(r&&r.hu)return Z().add(r.key);{let s=Z();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const c=t.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}function ef(n){const e=K(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Xh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=RI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=TI.bind(null,e),e.Pu.H_=dI.bind(null,e.eventManager),e.Pu.yu=hI.bind(null,e.eventManager),e}function PI(n){const e=K(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=bI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=AI.bind(null,e),e}class ri{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=vi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Nv(this.persistence,new kv,e.initialUser,this.serializer)}Cu(e){return new Nh(Aa.mi,this.serializer)}Du(e){return new Uv}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ri.provider={build:()=>new ri};class kI extends ri{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){te(this.persistence.referenceDelegate instanceof ti,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new pv(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new Nh(r=>ti.mi(r,t),this.serializer)}}class Fo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>hu(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=SI.bind(null,this.syncEngine),await cI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new uI}()}createDatastore(e){const t=vi(e.databaseInfo.databaseId),r=function(i){return new Hv(i)}(e.databaseInfo);return function(i,a,c,u){return new Qv(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,c){return new Yv(r,s,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>hu(this.syncEngine,t,0),function(){return ou.v()?new ou:new zv}())}createSyncEngine(e,t){return function(s,i,a,c,u,d,f){const p=new gI(s,i,a,c,u,d);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=K(s);$(_n,"RemoteStore shutting down."),i.Ea.add(5),await Zr(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Fo.provider={build:()=>new Fo};/**
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
 */class tf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):wt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Jt="FirestoreClient";class xI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=ke.UNAUTHENTICATED,this.clientId=fa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Jt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Jt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Et;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Na(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ao(n,e){n.asyncQueue.verifyOperationInProgress(),$(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Dh(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function mu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await LI(n);$(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>cu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>cu(e.remoteStore,s)),n._onlineComponents=e}async function LI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Jt,"Using user provided OfflineComponentProvider");try{await ao(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===N.FAILED_PRECONDITION||s.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;qn("Error using user provided cache. Falling back to memory cache: "+t),await ao(n,new ri)}}else $(Jt,"Using default OfflineComponentProvider"),await ao(n,new kI(void 0));return n._offlineComponents}async function nf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Jt,"Using user provided OnlineComponentProvider"),await mu(n,n._uninitializedComponentsProvider._online)):($(Jt,"Using default OnlineComponentProvider"),await mu(n,new Fo))),n._onlineComponents}function NI(n){return nf(n).then(e=>e.syncEngine)}async function rf(n){const e=await nf(n),t=e.eventManager;return t.onListen=yI.bind(null,e.syncEngine),t.onUnlisten=vI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=_I.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=II.bind(null,e.syncEngine),t}function DI(n,e,t={}){const r=new Et;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new tf({next:E=>{f.Nu(),a.enqueueAndForget(()=>Hh(i,p));const b=E.docs.has(c);!b&&E.fromCache?d.reject(new z(N.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&E.fromCache&&u&&u.source==="server"?d.reject(new z(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),p=new Wh(Ea(c.path),f,{includeMetadataChanges:!0,qa:!0});return jh(i,p)}(await rf(n),n.asyncQueue,e,t,r)),r.promise}function MI(n,e,t={}){const r=new Et;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new tf({next:E=>{f.Nu(),a.enqueueAndForget(()=>Hh(i,p)),E.fromCache&&u.source==="server"?d.reject(new z(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),p=new Wh(c,f,{includeMetadataChanges:!0,qa:!0});return jh(i,p)}(await rf(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function sf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const pu=new Map;/**
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
 */const of="firestore.googleapis.com",gu=!0;class yu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=of,this.ssl=gu}else this.host=e.host,this.ssl=e.ssl??gu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Lh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<fv)throw new z(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Y_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=sf(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ti{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new z_;switch(r.type){case"firstParty":return new H_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new z(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=pu.get(t);r&&($("ComponentProvider","Removing Datastore"),pu.delete(t),r.terminate())}(this),Promise.resolve()}}function VI(n,e,t,r={}){var d;n=Wt(n,Ti);const s=Qn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;s&&(Yu(`https://${c}`),Ju("Firestore",!0)),i.host!==of&&i.host!==c&&qn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:s,emulatorOptions:r};if(!mn(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=ke.MOCK_USER;else{f=hp(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new z(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ke(E)}n._authCredentials=new $_(new qd(f,p))}}/**
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
 */class nr{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new nr(this.firestore,e,this._query)}}class Ee{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Qr(t,Ee._jsonSchema))return new Ee(e,r||null,new q(re.fromString(t.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:_e("string",Ee._jsonSchemaVersion),referencePath:_e("string")};class Ht extends nr{constructor(e,t,r){super(e,t,Ea(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new q(e))}withConverter(e){return new Ht(this.firestore,e,this._path)}}function si(n,e,...t){if(n=Ue(n),jd("collection","path",e),n instanceof Ti){const r=re.fromString(e,...t);return kl(r),new Ht(n,null,r)}{if(!(n instanceof Ee||n instanceof Ht))throw new z(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(re.fromString(e,...t));return kl(r),new Ht(n.firestore,null,r)}}function bi(n,e,...t){if(n=Ue(n),arguments.length===1&&(e=fa.newId()),jd("doc","path",e),n instanceof Ti){const r=re.fromString(e,...t);return Pl(r),new Ee(n,null,new q(r))}{if(!(n instanceof Ee||n instanceof Ht))throw new z(N.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(re.fromString(e,...t));return Pl(r),new Ee(n.firestore,n instanceof Ht?n.converter:null,new q(r))}}/**
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
 */const _u="AsyncQueue";class Eu{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Vh(this,"async_queue_retry"),this._c=()=>{const r=oo();r&&$(_u,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=oo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=oo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Et;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!er(e))throw e;$(_u,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,wt("INTERNAL UNHANDLED ERROR: ",vu(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=La.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&H(47125,{Pc:vu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function vu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class ts extends Ti{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Eu,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Eu(e),this._firestoreClient=void 0,await e}}}function OI(n,e){const t=typeof n=="object"?n:nd(),r=typeof n=="string"?n:Ks,s=ea(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=up("firestore");i&&VI(s,...i)}return s}function Oa(n){if(n._terminated)throw new z(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||BI(n),n._firestoreClient}function BI(n){var r,s,i;const e=n._freezeSettings(),t=function(c,u,d,f){return new cE(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,sf(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new xI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(Ce.fromBase64String(e))}catch(t){throw new z(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(Ce.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Qr(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:_e("string",Ge._jsonSchemaVersion),bytes:_e("string")};/**
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
 */class Ba{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new z(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class af{constructor(e){this._methodName=e}}/**
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
 */class ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new z(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new z(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(e){if(Qr(e,ut._jsonSchema))return new ut(e.latitude,e.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:_e("string",ut._jsonSchemaVersion),latitude:_e("number"),longitude:_e("number")};/**
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
 */class dt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:dt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Qr(e,dt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new dt(e.vectorValues);throw new z(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}dt._jsonSchemaVersion="firestore/vectorValue/1.0",dt._jsonSchema={type:_e("string",dt._jsonSchemaVersion),vectorValues:_e("object")};/**
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
 */const FI=/^__.*__$/;class UI{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new wn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Yr(e,this.data,t,this.fieldTransforms)}}function cf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H(40011,{Ac:n})}}class Fa{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Fa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ii(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(cf(this.Ac)&&FI.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class zI{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||vi(e)}Cc(e,t,r,s=!1){return new Fa({Ac:e,methodName:t,Dc:r,path:Ae.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ua(n){const e=n._freezeSettings(),t=vi(n._databaseId);return new zI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function lf(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);hf("Data must be an object, but it was:",a,r);const c=uf(r,a);let u,d;if(i.merge)u=new Ye(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const E=qI(e,p,t);if(!a.contains(E))throw new z(N.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);HI(f,E)||f.push(E)}u=new Ye(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new UI(new We(c),u,d)}function $I(n,e,t,r=!1){return za(t,n.Cc(r?4:3,e))}function za(n,e){if(df(n=Ue(n)))return hf("Unsupported field value:",e,n),uf(n,e);if(n instanceof af)return function(r,s){if(!cf(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const c of r){let u=za(c,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return xE(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=oe.fromDate(r);return{timestampValue:ei(s.serializer,i)}}if(r instanceof oe){const i=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ei(s.serializer,i)}}if(r instanceof ut)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ge)return{bytesValue:Ah(s.serializer,r._byteString)};if(r instanceof Ee){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ta(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof dt)return function(a,c){return{mapValue:{fields:{[Zd]:{stringValue:eh},[Qs]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return va(c.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${di(r)}`)}(n,e)}function uf(n,e){const t={};return Gd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vn(n,(r,s)=>{const i=za(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function df(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof ut||n instanceof Ge||n instanceof Ee||n instanceof af||n instanceof dt)}function hf(n,e,t){if(!df(t)||!Hd(t)){const r=di(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function qI(n,e,t){if((e=Ue(e))instanceof Ba)return e._internalPath;if(typeof e=="string")return ff(n,e);throw ii("Field path arguments must be of type string or ",n,!1,void 0,t)}const jI=new RegExp("[~\\*/\\[\\]]");function ff(n,e,t){if(e.search(jI)>=0)throw ii(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ba(...e.split("."))._internalPath}catch{throw ii(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ii(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new z(N.INVALID_ARGUMENT,c+n+u)}function HI(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class mf{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new WI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field($a("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class WI extends mf{data(){return super.data()}}function $a(n,e){return typeof e=="string"?ff(n,e):e instanceof Ba?e._internalPath:e._delegate._internalPath}/**
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
 */function GI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new z(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qa{}class KI extends qa{}function pf(n,e,...t){let r=[];e instanceof qa&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof ja).length,c=i.filter(u=>u instanceof Ai).length;if(a>1||a>0&&c>0)throw new z(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ai extends KI{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ai(e,t,r)}_apply(e){const t=this._parse(e);return yf(e._query,t),new nr(e.firestore,e.converter,Po(e._query,t))}_parse(e){const t=Ua(e.firestore);return function(i,a,c,u,d,f,p){let E;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new z(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){wu(p,f);const C=[];for(const R of p)C.push(Iu(u,i,R));E={arrayValue:{values:C}}}else E=Iu(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||wu(p,f),E=$I(c,a,p,f==="in"||f==="not-in");return ye.create(d,f,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function gf(n,e,t){const r=e,s=$a("where",n);return Ai._create(s,r,t)}class ja extends qa{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ja(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)yf(a,u),a=Po(a,u)}(e._query,t),new nr(e.firestore,e.converter,Po(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Iu(n,e,t){if(typeof(t=Ue(t))=="string"){if(t==="")throw new z(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ch(e)&&t.indexOf("/")!==-1)throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(re.fromString(t));if(!q.isDocumentKey(r))throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Bl(n,new q(r))}if(t instanceof Ee)return Bl(n,t._key);throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${di(t)}.`)}function wu(n,e){if(!Array.isArray(n)||n.length===0)throw new z(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function yf(n,e){const t=function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new z(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new z(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class QI{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Qt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return vn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Qs].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>he(a.doubleValue));return new dt(t)}convertGeoPoint(e){return new ut(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=mi(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Fr(e));default:return null}}convertTimestamp(e){const t=Kt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=re.fromString(e);te(xh(r),9688,{name:e});const s=new Ur(r.get(1),r.get(3)),i=new q(r.popFirst(5));return s.isEqual(t)||wt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function _f(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Cr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hn extends mf{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ns(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field($a("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",hn._jsonSchema={type:_e("string",hn._jsonSchemaVersion),bundleSource:_e("string","DocumentSnapshot"),bundleName:_e("string"),bundle:_e("string")};class Ns extends hn{data(e={}){return super.data(e)}}class Bn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Cr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ns(this._firestore,this._userDataWriter,r.key,r,new Cr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new z(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new Ns(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Ns(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:XI(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Bn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function XI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H(61501,{type:n})}}/**
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
 */function Ef(n){n=Wt(n,Ee);const e=Wt(n.firestore,ts);return DI(Oa(e),n._key).then(t=>JI(e,n,t))}Bn._jsonSchemaVersion="firestore/querySnapshot/1.0",Bn._jsonSchema={type:_e("string",Bn._jsonSchemaVersion),bundleSource:_e("string","QuerySnapshot"),bundleName:_e("string"),bundle:_e("string")};class vf extends QI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,t)}}function If(n){n=Wt(n,nr);const e=Wt(n.firestore,ts),t=Oa(e),r=new vf(e);return GI(n._query),MI(t,n._query).then(s=>new Bn(e,r,n,s))}function YI(n,e,t){n=Wt(n,Ee);const r=Wt(n.firestore,ts),s=_f(n.converter,e,t);return wf(r,[lf(Ua(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,ct.none())])}function Tu(n,e){const t=Wt(n.firestore,ts),r=bi(n),s=_f(n.converter,e);return wf(t,[lf(Ua(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,ct.exists(!1))]).then(()=>r)}function wf(n,e){return function(r,s){const i=new Et;return r.asyncQueue.enqueueAndForget(async()=>wI(await NI(r),s,i)),i.promise}(Oa(n),e)}function JI(n,e,t){const r=t.docs.get(e._key),s=new vf(n);return new hn(n,s,e._key,r,new Cr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Jn=s})(Xn),zn(new pn("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),c=new ts(new q_(r.getProvider("auth-internal")),new W_(a,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new z(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ur(d.options.projectId,f)}(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),qt(Al,Cl,e),qt(Al,Cl,"esm2020")})();const ZI={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},Tf=td(ZI),je=F_(Tf);bd(je,la).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const En=OI(Tf),ew=new gt,tw="./data.csv";let ln=null,oi=null;window.initUI=Mf;window.setGridSize=kw;document.addEventListener("DOMContentLoaded",()=>{const n=(e,t)=>{try{t()}catch(r){console.error(`Initialization failed for ${e}:`,r)}};n("Collection State",rw),n("Spares",sw),n("Filters",iw),n("Tab Navigation",hw),n("Switch Tab",()=>on(m.currentTab)),n("Collection Filters",Ka),n("Auth",lw),n("Event Banner",fw),n("Blueprint Submission",mw),n("Wrapped",Tw),n("Announcements",bw),n("Sidebar",Uw),n("Context Menu",zw),n("Data Loading",Mw)});const vr="./images/",nw="./icons/",pt=new Map;function Uo(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['â€™]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const bu={Light_Stick__Any_Color:"Blue_Light_Stick"},bf="arc_collection_v1";function rw(){try{const n=localStorage.getItem(bf);if(n){const e=JSON.parse(n);Array.isArray(e)?m.collectedItems=new Set(e):(e.collected&&(m.collectedItems=new Set(e.collected)),e.wishlist&&(m.wishlistedItems=new Set(e.wishlist)),m.collectedItems.forEach(t=>{m.wishlistedItems.has(t)&&m.wishlistedItems.delete(t)}))}}catch(n){console.error("Failed to load collection state:",n)}}function Fn(){try{const n={collected:Array.from(m.collectedItems),wishlist:Array.from(m.wishlistedItems)};localStorage.setItem(bf,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const Af="arc_spares_v1";function sw(){try{const n=localStorage.getItem(Af);n&&(m.spares=JSON.parse(n))}catch(n){console.error("Failed to load spares:",n)}}function Au(){try{localStorage.setItem(Af,JSON.stringify(m.spares))}catch(n){console.error("Failed to save spares:",n)}}const Cf="arc_filters_v1";function Fe(){try{const n={rarities:Array.from(m.filters.rarities),types:Array.from(m.filters.types),maps:Array.from(m.filters.maps),conds:Array.from(m.filters.conds),confs:Array.from(m.filters.confs),collected:m.filters.collected,sort:m.filters.sort,sortBlueprints:m.filters.sortBlueprints,sortData:m.filters.sortData};localStorage.setItem(Cf,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function iw(){try{const n=localStorage.getItem(Cf);if(n){const e=JSON.parse(n);e.rarities&&(m.filters.rarities=new Set(e.rarities)),e.types&&(m.filters.types=new Set(e.types)),e.maps&&(m.filters.maps=new Set(e.maps)),e.conds&&(m.filters.conds=new Set(e.conds)),e.confs&&(m.filters.confs=new Set(e.confs)),e.collected&&(m.filters.collected=e.collected),e.sort&&(m.filters.sortBlueprints=e.sort),e.sortBlueprints&&(m.filters.sortBlueprints=e.sortBlueprints),e.sortData&&(m.filters.sortData=e.sortData)}}catch(n){console.error("Failed to load filters:",n)}}function fn(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(i=>i.remove());const t=m.collectedItems.has(e),r=m.wishlistedItems.has(e);if(t){const i=document.createElement("div");i.className="collected-badge",i.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(i);const a=document.createElement("div");a.className="collected-glow",n.appendChild(a)}else if(r){const i=document.createElement("div");i.className="wishlist-badge",i.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(i);const a=document.createElement("div");a.className="wishlist-glow",n.appendChild(a)}if(m.currentTab==="collection"){let i="",a="",c=!1;if(t?(i='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',a="Click to Wishlist",c=!0):r?(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a="Click To Unwishlist",c=!0):(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',a="Click to Collect",c=!0),c){const u=document.createElement("div");u.className="collection-hint",u.innerHTML=`
          <div class="collection-hint-icon">${i}</div>
          <div class="collection-hint-text">${a}</div>
        `,(t||r)&&u.classList.add("hint-hidden"),n.appendChild(u)}}let s=n.querySelector(".mass-collect-overlay");s&&(t?(s.classList.add("overlay-collected"),s.querySelector(".mass-collect-text").textContent="Collected"):(s.classList.remove("overlay-collected"),s.querySelector(".mass-collect-text").innerHTML="Click to<br>Collect"))}function Ds(){if(!document.getElementById("collectionProgressContainer"))return;const e=m.all.length,t=new Set(m.all.map(u=>u.name)),r=[...m.collectedItems].filter(u=>t.has(u)).length,s=e>0?Math.round(r/e*100):0,i=document.getElementById("progressPercent"),a=document.getElementById("progressCount");i&&(i.textContent=`${s}%`),a&&(a.textContent=`${r} / ${e}`);const c=document.getElementById("progressBar");if(c){c.style.width=`${s}%`;const u=Math.floor(s*1.2);c.style.backgroundColor=`hsl(${u}, 80%, 50%)`,c.style.backgroundImage="none"}}function ow(n,e,t,r){if(!n)return;let s=null;const i=a=>{s||(s=a);const c=Math.min((a-s)/r,1),u=Math.floor(c*(t-e)+e);n.textContent=`${u}%`,c<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const r=document.getElementById("progressBar"),s=document.getElementById("progressPercent"),i=m.all.length,a=new Set(m.all.map(d=>d.name)),c=[...m.collectedItems].filter(d=>a.has(d)).length,u=i>0?Math.round(c/i*100):0;r&&(r.style.transition="none",r.style.width="0%",r.style.backgroundColor="hsl(0, 80%, 50%)"),s&&(s.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{r&&(r.style.transition="width 1.75s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 1.75s linear",Ds()),s&&ow(s,0,u,1750)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function zo(){if(je.currentUser)try{const n=bi(En,"users",je.currentUser.uid);await YI(n,{collectedItems:Array.from(m.collectedItems),wishlistedItems:Array.from(m.wishlistedItems),spares:m.spares,lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function aw(n){try{console.log("Loading collection from cloud...");const e=bi(En,"users",n.uid),t=await Ef(e);if(t.exists()){const r=t.data();let s=!1;if(r.collectedItems){const i=new Set(r.collectedItems),a=m.collectedItems.size;i.forEach(c=>{m.collectedItems.add(c),m.wishlistedItems.delete(c)}),m.collectedItems.size>a&&(s=!0)}if(r.wishlistedItems){const i=new Set(r.wishlistedItems),a=m.wishlistedItems.size;i.forEach(c=>{m.collectedItems.has(c)||m.wishlistedItems.add(c)}),m.wishlistedItems.size>a&&(s=!0),m.wishlistedItems.size>a&&(s=!0)}r.spares&&Object.entries(r.spares).forEach(([i,a])=>{const c=m.spares[i]||0;a>c&&(m.spares[i]=a,s=!0)}),s&&(console.log("Cloud sync merged new items."),Fn(),ge(),zo())}else console.log("No cloud data found for user. Creating initial sync..."),zo()}catch(e){console.error("Loading from cloud failed:",e)}}async function cw(){if(je.currentUser){m.wrappedData.loading=!0;try{const n=pf(si(En,"blueprintSubmissions"),gf("userId","==",je.currentUser.uid)),e=await If(n);m.wrappedData.contributionCount=e.size,console.log(`User has submitted ${e.size} reports.`)}catch(n){console.error("Failed to fetch user contributions:",n)}finally{m.wrappedData.loading=!1}}}function lw(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),r=document.getElementById("logoutBtnMobile"),s=async()=>{try{console.log("Attempting Google Sign-in..."),await bd(je,la),await Ky(je,ew),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert(`Domain unauthorized (${window.location.hostname}). To test mobile, use your LIVE site (arc-blueprint-tracker.web.app) or whitelist this IP in Firebase Console.`):alert("Sign-in failed: "+a.message)}},i=()=>Py(je).catch(console.error);n&&(n.onclick=s),e&&(e.onclick=s),t&&(t.onclick=i),r&&(r.onclick=i),Ry(je,a=>{document.getElementById("authSection");const c=document.getElementById("userProfile");document.getElementById("authSectionMobile");const u=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),c&&c.classList.remove("hidden"),u&&u.classList.remove("hidden");const d=document.getElementById("userPhoto"),f=document.getElementById("userName"),p=document.getElementById("userPhotoMobile"),E=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),f&&(f.textContent=a.displayName||"Explorer"),p&&(p.src=a.photoURL||""),E&&(E.textContent=a.displayName||"Explorer"),aw(a),m.currentTab==="progression"&&Rf()}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),c&&c.classList.add("hidden"),u&&u.classList.add("hidden")})}function Sf(n,e){const t=document.createElement("div");t.className="card-compact bg-zinc-950 border border-zinc-800/50 rounded-2xl p-2",t.style.position="relative",t.style.overflow="visible",t.style.setProperty("--glow-color",xe(n.rarity)),t.dataset.name=n.name;const r=document.createElement("div");r.className="rarity-frame rarity-glow relative overflow-hidden",r.style.borderColor=xe(n.rarity);const s=document.createElement("div");s.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",s.style.background=`
    linear-gradient(to top right, ${xe(n.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
    linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
    url('Background/Arc BP Image Background.webp')
  `,s.style.backgroundSize="cover, cover, cover",s.style.backgroundPosition="center, center, center",s.style.backgroundBlendMode="normal, normal, normal",s.style.aspectRatio="1 / 1",s.style.width="100%";const i=document.createElement("img");i.src=n.img||"",i.alt=n.name,i.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",i.style.width="100%",i.style.height="100%",i.style.objectFit="contain",i.style.padding="8px",i.loading="lazy",i.draggable=!1,i.style.webkitTouchCallout="none",i.style.userSelect="none";const a=document.createElement("div");a.className="rarity-corner",a.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${xe(n.rarity)}66 60%, ${xe(n.rarity)}cc 100%)`;const c=document.createElement("div");c.className="type-tab",c.style.background=xe(n.rarity)+"22",c.style.borderColor=xe(n.rarity);const u=document.createElement("img");u.src=n.typeIcon,u.alt=n.type;const d=document.createElement("span");d.textContent=n.type||"â€”",c.appendChild(u),c.appendChild(d),s.appendChild(i),s.appendChild(a),s.appendChild(c);const f=document.createElement("div");f.className="mt-2 px-1 pb-1";const p=document.createElement("div");if(p.className="font-semibold leading-tight",p.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",p.textContent=n.name,f.appendChild(p),r.appendChild(s),m.collectedItems.has(n.name)){const E=document.createElement("div");E.className="collected-badge",E.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',r.appendChild(E);const b=document.createElement("div");b.className="collected-glow",r.appendChild(b)}return t.appendChild(r),t.appendChild(f),t}async function Rf(){const n=je.currentUser;if(!n){console.log("[UserStats] No user logged in, skipping fetch"),co(0,"N/A",0,[]);return}try{console.log("[UserStats] Fetching submissions for user:",n.uid);const e=pf(si(En,"blueprintSubmissions"),gf("userId","==",n.uid)),t=await If(e),r=[];t.forEach(d=>{r.push({id:d.id,...d.data()})}),console.log("[UserStats] Found",r.length,"submissions");const s=r.length,i={};r.forEach(d=>{d.map&&d.map!=="N/A"&&(i[d.map]=(i[d.map]||0)+1)});let a="N/A",c=0;for(const[d,f]of Object.entries(i))f>c&&(a=d,c=f);const u=r.filter(d=>d.blueprintName).sort((d,f)=>d.submittedAt&&f.submittedAt?new Date(f.submittedAt)-new Date(d.submittedAt):0).slice(0,5);console.log("[UserStats] sortedSubs:",u.map(d=>({name:d.blueprintName,date:d.submittedAt}))),r.forEach(d=>{d.blueprintName&&m.collectedItems.add(d.blueprintName)}),Fn(),co(s,a,c,u)}catch(e){console.error("[UserStats] Error fetching user stats:",e),co(0,"N/A",0,[])}}function co(n,e,t,r){const s=document.getElementById("userStatsSection"),i=document.getElementById("statSubmissionCount"),a=document.getElementById("statBestMap"),c=document.getElementById("statBestMapCount"),u=document.getElementById("recentFindsGrid");if(!(!s||!i||!a||!u)){if(n===0){s.classList.add("hidden");return}i.textContent=n,a.textContent=e,c&&(c.textContent=`(${t})`),s.classList.remove("hidden"),u.innerHTML="",console.log("[UserStats] Rendering recent items:",r.length),console.log("[UserStats] state.all has",m.all.length,"items"),r.forEach((d,f)=>{const p=m.all.find(E=>E.name===d.blueprintName);if(console.log(`[UserStats] Item ${f}: blueprintName="${d.blueprintName}", found=${!!p}`),p){const E=Sf(p);u.appendChild(E)}}),console.log("[UserStats] Grid now has",u.children.length,"children")}}function uw(){const n=document.getElementById("progressionTab");if(document.getElementById("filtersSidebar"),!n||n.classList.contains("hidden"))return;const e=m.all.length,t=new Set(m.all.map(C=>C.name)),r=m.collectedItems?[...m.collectedItems].filter(C=>t.has(C)).length:0;if(e===0)return;const s=Math.round(r/e*100),i=document.getElementById("progressionBarMain"),a=document.getElementById("progressionSign"),c=document.getElementById("progressionCount"),u=document.getElementById("progressionTotal");if(u&&(u.textContent=e),i){i.style.transition="none",i.style.width="0%",i.style.backgroundImage="none",i.style.backgroundColor="hsl(340, 80%, 50%)",i.offsetWidth;const C=s/100*1750;let R=null;const A=x=>{R||(R=x);const D=x-R;let V=Math.min(D/C,1);V=1-Math.pow(1-V,2);const B=V*s,O=Math.floor(V*r);i.style.width=`${B}%`,a&&(a.textContent=`${Math.floor(B)}%`),c&&(c.textContent=O);let v=340+B/100*140;v>=360&&(v-=360),i.style.backgroundColor=`hsl(${v}, 80%, 50%)`,i.style.boxShadow=`0 0 20px hsl(${v}, 80%, 40%)`,V<1?requestAnimationFrame(A):(a&&(a.textContent=`${s}%`),c&&(c.textContent=r))};requestAnimationFrame(A)}const d=document.getElementById("progressionCategories");if(!d)return;d.innerHTML="";const f={Augment:{border:"rgba(251,199,0,0.5)",bg:"rgba(251,199,0,0.1)",barFrom:"#FBC700",barTo:"#f59e0b",icon:"rgba(251,199,0,0.2)",text:"#FBC700"},Weapon:{border:"rgba(216,41,155,0.5)",bg:"rgba(216,41,155,0.1)",barFrom:"#D8299B",barTo:"#ec4899",icon:"rgba(216,41,155,0.2)",text:"#D8299B"},"Quick Use":{border:"rgba(30,203,252,0.5)",bg:"rgba(30,203,252,0.1)",barFrom:"#1ECBFC",barTo:"#06b6d4",icon:"rgba(30,203,252,0.2)",text:"#1ECBFC"},Grenade:{border:"rgba(65,235,106,0.5)",bg:"rgba(65,235,106,0.1)",barFrom:"#41EB6A",barTo:"#34d399",icon:"rgba(65,235,106,0.2)",text:"#41EB6A"},Mod:{border:"rgba(255,255,255,0.5)",bg:"rgba(255,255,255,0.05)",barFrom:"#ffffff",barTo:"#d4d4d8",icon:"rgba(255,255,255,0.15)",text:"#ffffff"},Material:{border:"rgba(113,116,113,0.5)",bg:"rgba(113,116,113,0.1)",barFrom:"#717471",barTo:"#a1a1aa",icon:"rgba(113,116,113,0.2)",text:"#a1a1aa"},default:{border:"rgba(255,255,255,0.3)",bg:"rgba(255,255,255,0.05)",barFrom:"#52525b",barTo:"#a1a1aa",icon:"rgba(255,255,255,0.1)",text:"#d4d4d8"}},p={};m.all.forEach(C=>{const R=C.type||"Unknown";p[R]||(p[R]={total:0,collected:0,icon:C.typeIcon}),p[R].total++,m.collectedItems&&m.collectedItems.has(C.name)&&p[R].collected++});const E=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];Object.keys(p).sort((C,R)=>{const A=E.indexOf(C),x=E.indexOf(R);return A===-1&&x===-1?C.localeCompare(R):A===-1?1:x===-1?-1:A-x}).forEach(C=>{const R=p[C],A=Math.round(R.collected/R.total*100);console.log("Category type:",C,"Has color?",!!f[C]);const x=f[C]||f.default,D=document.createElement("div");D.className="relative overflow-hidden rounded-2xl backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl hover:brightness-110 transition-all duration-300 group",D.style.border=`2px solid ${x.border}`,D.style.backgroundColor=x.bg;const V=document.createElement("div");V.className="flex items-center gap-4 z-10";const B=document.createElement("div");if(B.className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner",B.style.backgroundColor=x.icon,R.icon){const I=document.createElement("img");I.src=R.icon,I.className="w-7 h-7 opacity-90 drop-shadow-md",B.appendChild(I)}const O=document.createElement("div"),F=document.createElement("div");F.className="text-base font-bold tracking-wide",F.style.color=x.text,F.textContent=C;const v=document.createElement("div");v.className="text-sm text-zinc-500 font-mono",v.textContent=`${R.collected} / ${R.total}`,O.appendChild(F),O.appendChild(v),V.appendChild(B),V.appendChild(O);const y=document.createElement("div");y.className="relative h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 z-10";const _=document.createElement("div");_.className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out",_.style.background=`linear-gradient(to right, ${x.barFrom}, ${x.barTo})`,_.style.width="0%",requestAnimationFrame(()=>{_.style.width=`${A}%`}),y.appendChild(_),D.appendChild(V),D.appendChild(y);const T=document.createElement("div");T.className=`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${x.bar} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity pointer-events-none`,D.appendChild(T),d.appendChild(D)})}function dw(n){const e=document.getElementById("sortSelect"),t=document.getElementById("sortSelectMobile");let r="";n==="data"?r=`
      <option value="rarity_desc">Rarity (High → Low)</option>
      <option value="rarity_asc">Rarity (Low → High)</option>
      <option value="conf_desc">Confidence (High → Low)</option>
      <option value="conf_asc">Confidence (Low → High)</option>
      <option value="name_asc">Name (A → Z)</option>
      <option value="name_desc">Name (Z → A)</option>
    `:r=`
      <option value="rarity_desc">Rarity (High → Low)</option>
      <option value="rarity_asc">Rarity (Low → High)</option>
      <option value="name_asc">Name (A → Z)</option>
      <option value="name_desc">Name (Z → A)</option>
      <option value="type_asc">Type (A → Z)</option>
    `,e&&(e.innerHTML=r,n==="data"?e.value=m.filters.sortData||"rarity_desc":e.value=m.filters.sortBlueprints||"rarity_desc"),t&&(t.innerHTML=r,n==="data"?t.value=m.filters.sortData||"rarity_desc":t.value=m.filters.sortBlueprints||"rarity_desc")}function on(n){var D,V;m.currentTab=n,window.scrollTo(0,0),dw(n==="data"?"data":"blueprints"),typeof Qo=="function"&&Qo(n);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabProgression"),r=document.getElementById("tabData");[e,t,r].forEach(B=>{B&&B.classList.remove("tab-button-active")}),n==="blueprints"&&e&&e.classList.add("tab-button-active"),n==="progression"&&t&&t.classList.add("tab-button-active"),n==="data"&&r&&r.classList.add("tab-button-active"),document.getElementById("gridSection");const s=document.getElementById("grid"),i=document.getElementById("emptyState");document.querySelectorAll(".filter-section-desktop");const a=document.getElementById("progressionTab"),c=document.getElementById("dataTab"),u=document.getElementById("submitLocationFab");u&&(n==="blueprints"?u.classList.remove("hidden"):u.classList.add("hidden"));const d=n==="blueprints",f=document.getElementById("gridHeader");f&&(d?(f.classList.remove("hidden"),f.classList.add("flex")):(f.classList.add("hidden"),f.classList.remove("flex"))),s&&(d?(ge(),s.classList.remove("hidden")):(s.classList.add("hidden"),i&&i.classList.add("hidden"))),a&&(n==="progression"?(a.classList.remove("hidden"),uw(),Rf()):a.classList.add("hidden")),c&&(n==="data"?(c.classList.remove("hidden"),typeof Wo=="function"&&(!m.detailedData||m.detailedData.length===0)?Wo():typeof bt=="function"&&bt()):c.classList.add("hidden"));const p=document.getElementById("desktopFilterBtn"),E=document.getElementById("mobileFilterBtn"),b=document.getElementById("filtersSidebar"),C=document.getElementById("drawer"),R=n==="progression";b&&b.querySelectorAll(".filter-options").forEach(B=>{R?B.classList.add("hidden"):B.classList.remove("hidden")}),C&&C.querySelectorAll(".filter-options").forEach(B=>{R?B.classList.add("hidden"):B.classList.remove("hidden")});const A=(D=document.getElementById("gridSize"))==null?void 0:D.closest(".filter-options");A&&(n==="data"?A.classList.add("hidden"):R||A.classList.remove("hidden"));const x=(V=document.getElementById("gridSizeMobile"))==null?void 0:V.closest(".filter-options");x&&(n==="data"?x.classList.add("hidden"):R||x.classList.remove("hidden")),b&&(p&&(p.classList.remove("opacity-50","pointer-events-none"),p.classList.add("cursor-pointer")),E&&(E.classList.remove("opacity-50","pointer-events-none"),E.classList.add("cursor-pointer")),m.filtersOpen?(b.classList.add("hidden"),b.classList.remove("md:hidden"),b.classList.add("md:block"),p&&(p.classList.add("opacity-100"),p.classList.remove("opacity-50"))):(b.classList.add("hidden"),b.classList.remove("md:block"),p&&(p.classList.remove("opacity-100"),p.classList.add("opacity-50"))))}function hw(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabProgression"),t=document.getElementById("tabData"),r=document.getElementById("logoHome"),s=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>on("blueprints")),e&&(e.onclick=()=>on("progression")),t&&(t.onclick=()=>on("data")),r&&(r.onclick=()=>on("blueprints")),s&&(s.onclick=()=>on("blueprints"))}let Cu=!1;window.menuCloseTimer=null;function Ha(){document.querySelectorAll(".details-overlay:not(.hidden)").forEach(e=>{e.classList.add("hidden"),e.style.transform=""}),document.querySelectorAll(".card-open").forEach(e=>{e.classList.remove("card-open"),e.style.zIndex=""}),document.querySelectorAll(".card-selected").forEach(e=>{e.classList.remove("card-selected")});const n=document.getElementById("itemContextMenu");n&&!n.classList.contains("hidden")&&(n.classList.add("opacity-0"),window.menuCloseTimer&&clearTimeout(window.menuCloseTimer),window.menuCloseTimer=setTimeout(()=>{n.classList.add("hidden"),window.menuCloseTimer=null},150))}function Pf(n,e="details"){if(Ha(),!!n&&(n.classList.add("card-selected"),e==="details")){const t=n.querySelector(".details-overlay");t&&(t.classList.remove("hidden"),n.classList.add("card-open"),n.style.zIndex="50")}}function fw(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;Ef(bi(En,"siteConfig","banner")).then(r=>{if(r.exists()){const s=r.data();s.active&&s.text&&t&&n&&(t.innerHTML=s.text,n.classList.add("banner-active"),!Cu&&m.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(r=>console.debug("Banner fetch skipped",r)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),Cu=!0})}function mw(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),r=document.getElementById("closeSubmitModal"),s=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>Su()),e&&(e.onclick=()=>{Ci(),oi&&Su(oi)}),r&&(r.onclick=()=>$o()),t&&(t.onclick=i=>{i.target===t&&$o()}),s&&(s.onsubmit=async i=>{i.preventDefault(),await Aw()}),Ew(),Hw()}function pw(){const n=document.getElementById("submitBlueprintName");if(!(!n||!m.all||m.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of m.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function Su(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");pw(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function $o(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),r=document.getElementById("submitQuestReward");t&&(t.checked=!1),r&&(r.checked=!1)}oi=null,Lf(),Wa(),window.clearMapSelection&&window.clearMapSelection()}const gw="https://docs.google.com/spreadsheets/d/e/2PACX-1vQbaBK3sAyL1kD1-NanKQgkyzerRXtQUReQu57W_xn68GxST_A4Ws1z3iwOAOZJ52-ZBztvGiDq16Go/pub?output=csv",kf="./images/Containers/";async function yw(){var n,e,t;if(m.containers||(m.containers=[],m.containersLoaded=!1),!(m.containersLoaded&&m.containers.length>0))try{const i=(await(await fetch(gw)).text()).split(/\r?\n/).filter(a=>a.trim());if(i.length<2)return;m.containers=[];for(let a=1;a<i.length;a++){const c=_w(i[a]);c.length>=4&&c[0]&&m.containers.push({name:c[0].trim(),lootPool:((n=c[1])==null?void 0:n.trim())||"Standard",tags:((e=c[2])==null?void 0:e.trim().toLowerCase())||"",image:((t=c[3])==null?void 0:t.trim())||""})}m.containersLoaded=!0}catch(r){console.error("Failed to fetch containers:",r)}}function _w(n){const e=[];let t="",r=!1;for(let s=0;s<n.length;s++){const i=n[s];i==='"'?r=!r:i===","&&!r?(e.push(t),t=""):t+=i}return e.push(t),e}function Ew(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("clearContainerBtn"),r=document.getElementById("containerPickerModal"),s=document.getElementById("closeContainerPickerBtn"),i=document.getElementById("containerPickerSearch");document.getElementById("containerPickerGrid");const a=document.getElementById("containerPickerCustomBtn"),c=document.getElementById("hideCustomContainerBtn");n&&n.addEventListener("click",async()=>{await Ru()}),e&&e.addEventListener("click",async u=>{u.target.closest("#clearContainerBtn")||await Ru()}),s&&s.addEventListener("click",()=>{Ms()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),Lf()}),i&&i.addEventListener("input",u=>{xf(u.target.value)}),a&&a.addEventListener("click",()=>{Ms(),Iw()}),c&&c.addEventListener("click",()=>{Wa()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&r&&!r.classList.contains("hidden")&&Ms()})}async function Ru(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(await yw(),n.classList.remove("hidden"),n.classList.add("flex"),xf(""),setTimeout(()=>{e&&e.focus()},200))}function Ms(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(n.classList.add("hidden"),n.classList.remove("flex"),e&&(e.value=""))}function xf(n){const e=document.getElementById("containerPickerGrid");if(!e||!m.containers)return;const t=n.toLowerCase().trim(),r=m.containers.filter(s=>t?s.name.toLowerCase().includes(t)||s.tags.includes(t):!0);if(e.innerHTML="",r.length===0){e.innerHTML=`
      <div class="col-span-full py-12 text-center text-zinc-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-sm">No containers found for "${n}"</p>
      </div>
    `;return}for(const s of r){const i=document.createElement("div");i.className="container-picker-card",i.innerHTML=`
      <img src="${kf}${s.image}" alt="${s.name}" loading="lazy" class="w-full h-24 object-cover rounded-lg mb-1.5" />
      <div class="card-name text-white leading-tight font-bold">${s.name}</div>
      <div class="card-pool text-zinc-400 mt-0.5">${s.lootPool}</div>
    `,i.addEventListener("click",()=>{vw(s)}),e.appendChild(i)}}function vw(n){const e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay"),r=document.getElementById("selectedContainerImg"),s=document.getElementById("selectedContainerName"),i=document.getElementById("submitContainer");e&&e.classList.add("hidden"),t&&(t.classList.remove("hidden"),t.classList.add("flex")),r&&(r.src=kf+n.image),s&&(s.textContent=n.name),i&&(i.value=n.name),Ms(),Wa()}function Lf(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("submitContainer");n&&n.classList.remove("hidden"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),t&&(t.value="")}function Iw(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay");n&&n.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&(t.classList.add("hidden"),t.classList.remove("flex"))}function Wa(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("customContainerName"),r=document.getElementById("customContainerDescription"),s=document.getElementById("customContainerScreenshot");n&&n.classList.add("hidden"),e&&e.classList.remove("hidden"),t&&(t.value=""),r&&(r.value=""),s&&(s.value="")}function ww(){const n=document.getElementById("customContainerForm"),e=document.getElementById("customContainerName");if(n&&!n.classList.contains("hidden")&&(e!=null&&e.value.trim()))return`CUSTOM: ${e.value.trim()}`;const t=document.getElementById("submitContainer");return(t==null?void 0:t.value)||""}function Tw(){const n=document.getElementById("showWrappedBtn"),e=document.getElementById("wrappedModal"),t=document.getElementById("closeWrappedBtn"),r=document.getElementById("downloadWrappedBtn");if(!n||!e)return;const s=d=>{const f=document.getElementById("wrappedOuterContainer"),p=document.getElementById("wrappedInner"),E=document.getElementById("wrappedContent"),b=document.getElementById("wrappedShimmer"),C=document.getElementById("wrappedActions"),R=document.getElementById("captureModeActions"),A=document.getElementById("wrappedModal");if(d){const x=window.innerWidth/896;if(f&&(f.style.setProperty("background","none","important"),f.style.setProperty("box-shadow","none","important"),f.style.setProperty("padding","0","important"),f.style.setProperty("border-radius","0","important")),p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${x})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.setProperty("gap","0","important");const D=896*(1-x);p.style.setProperty("margin-bottom",`- ${D} px`,"important")}E&&E.style.setProperty("border-radius","0","important"),b&&b.classList.add("hidden"),C&&C.classList.add("hidden"),R&&R.classList.remove("hidden"),A&&(A.style.setProperty("padding","0","important"),A.style.setProperty("overflow-x","hidden","important"),A.style.setProperty("overflow-y","hidden","important"),A.scrollTo(0,0))}else{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<800){const D=(window.innerWidth-32)/896;if(p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${D})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.removeProperty("gap");const V=896*(1-D);p.style.setProperty("margin-bottom",`- ${V} px`,"important")}}else p&&(p.style.removeProperty("width"),p.style.removeProperty("transform"),p.style.removeProperty("transform-origin"),p.style.removeProperty("gap"),p.style.removeProperty("margin-bottom"));f&&(f.style.removeProperty("background"),f.style.removeProperty("box-shadow"),f.style.removeProperty("padding"),f.style.removeProperty("border-radius")),E&&E.style.removeProperty("border-radius"),b&&b.classList.remove("hidden"),C&&C.classList.remove("hidden"),R&&R.classList.add("hidden"),A&&(A.style.removeProperty("padding"),A.style.removeProperty("overflow-x"),A.style.removeProperty("overflow-y"),setTimeout(()=>A.scrollTo(0,0),20))}},i=document.getElementById("exitCaptureBtn");i&&(i.onclick=()=>s(!1));const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;if(a&&r){const d=r.cloneNode(!0);r.parentNode.replaceChild(d,r),d.innerHTML='< svg class="w-5 h-5" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg > Fullscreen for Screenshot',d.className="flex-[2] md:flex-none px-8 py-3 h-14 md:h-auto text-xl md:text-base rounded-full bg-emerald-600 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform",d.onclick=()=>s(!0)}if(n.onclick=async()=>{const d=document.getElementById("submitLocationFab");d&&d.classList.add("hidden"),je.currentUser&&(n.disabled=!0,n.textContent="Loading Data...",await cw(),n.disabled=!1,n.innerHTML='< svg class= "w-4 h-4" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg > View My Blueprint Wrapped 2025',n.className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[10px] sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95");const f=m.all.length,p=new Set(m.all.map(j=>j.name)),E=[...m.collectedItems].filter(j=>p.has(j)).length,b=f>0?Math.round(E/f*100):0;document.getElementById("wrappedPercent").textContent=`${b}% `;const C=document.getElementById("wrappedProgressBar");C&&(C.style.width=`${b}% `);const R=m.all.filter(j=>/weapon/i.test(j.type)).length,A=m.all.filter(j=>/weapon/i.test(j.type)&&m.collectedItems.has(j.name)).length,x=m.all.filter(j=>/augment/i.test(j.type)).length,D=m.all.filter(j=>/augment/i.test(j.type)&&m.collectedItems.has(j.name)).length,V={};m.wrappedData.contributions&&m.wrappedData.contributions.forEach(j=>{j.map&&(V[j.map]=(V[j.map]||0)+1)});const B=Object.entries(V).sort((j,le)=>le[1]-j[1])[0];document.getElementById("wrappedPercent").textContent=`${b}% `;const O=document.getElementById("wrappedStatsGrid");O.innerHTML="";const F=[];m.wrappedData.contributionCount>0&&F.push({value:m.wrappedData.contributionCount,label:"Locations<br>Reported",color:"text-emerald-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg > '}),B&&B[0]&&F.push({value:B[0],label:"Best<br>Map",color:"text-purple-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg > ',smallText:!0}),F.push({value:`${E}/${f}`,label:"Blueprints<br>Collected",color:"text-white",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'}),F.push({value:`${A}/${R}`,label:"Weapons<br>Collected",color:"text-amber-400",icon:'<img src="icons/ItemCategory_Weapon.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(67%) sepia(74%) saturate(575%) hue-rotate(360deg) brightness(101%) contrast(101%);" alt="Weapon">'}),F.push({value:`${D}/${x}`,label:"Augments<br>Collected",color:"text-cyan-400",icon:'<img src="icons/ItemCategory_Augment.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(76%) sepia(32%) saturate(1057%) hue-rotate(152deg) brightness(95%) contrast(92%);" alt="Augment">'}),F.forEach((j,le)=>{const ae=document.createElement("div");ae.className="rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center flex-1 min-w-[90px]";const se=120+Math.floor(Math.random()*30);ae.style.boxShadow="inset 0 0 15px rgba(255, 255, 255, 0.03)";const de="rgba(16, 185, 129, 0.4)",et="rgba(52, 211, 153, 0.4)";le%2===0?ae.style.background=`linear-gradient(${se}deg, ${de}, ${de}), #09090b`:ae.style.background=`linear-gradient(${se}deg, ${de}, ${et} 50%, ${de}), #09090b`;const tt=j.icon.replace("w-4 h-4","w-6 h-6").replace("w-5 h-5","w-7 h-7");ae.innerHTML=`
        <div class="${j.color} mb-1 drop-shadow-md">
          ${tt}
        </div>
        <span class="${j.smallText?"text-xl":"text-3xl"} font-hud font-bold ${j.color} drop-shadow-lg">${j.value}</span>
        <div class="text-xs text-zinc-300 uppercase font-tabs font-bold tracking-wider text-center leading-tight drop-shadow-md opacity-90">${j.label}</div>
      `,O.appendChild(ae)});const v=document.getElementById("wrappedHighlights");v.innerHTML="";const y=["Bobcat","Looting Mk. 3 (Survivor)","Aphelion","Equalizer","Jupiter","Combat Mk. 3 (Aggressive)","Combat Mk. 3 (Flanking)","Vulcano","Snap Hook","Deadline","Wolfpack","Tactical Mk. 3 (Defensive)","Tactical Mk. 3 (Healing)","Venator","Tempest","Torrente","Bettina","Anvil","Osprey"];let _=m.all.filter(j=>m.collectedItems.has(j.name)&&!/mod|material|parts|component|attachment|misc/i.test(j.type));_.sort((j,le)=>{const ae=y.indexOf(j.name),se=y.indexOf(le.name);return ae!==-1&&se!==-1?ae-se:ae!==-1?-1:se!==-1?1:Ke(le.rarity)-Ke(j.rarity)});const T=_.slice(0,8);T.length===0&&(v.innerHTML='<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>'),T.forEach(j=>{const le=xe(j.rarity),ae=document.createElement("div");ae.className="card-compact w-full p-2";const se=document.createElement("div");se.className="rarity-frame rarity-glow relative overflow-hidden",se.style.borderColor=le;const de=document.createElement("div");de.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",de.style.background=`
        linear-gradient(to top right, ${le}44 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `,de.style.backgroundSize="cover, cover, cover",de.style.backgroundPosition="center, center, center";const et=document.createElement("img");et.src=j.img||"",et.className="w-full h-full object-contain p-2 relative z-10";const tt=document.createElement("div");tt.className="rarity-corner",tt.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${le}66 60%, ${le}cc 100%)`;const Se=document.createElement("div");Se.className="type-tab";const Ct=110+Math.floor(Math.random()*40);Se.style.background=`linear-gradient(${Ct}deg, ${le}99, ${le}66), #09090b`,Se.style.borderColor=le,Se.style.maxWidth="90%";const mt=document.createElement("img");mt.src=j.typeIcon||Ga(j.type),mt.className="w-5 h-5 object-contain shadow-sm drop-shadow-md";const me=document.createElement("span");me.textContent=j.name,Se.style.maxWidth="96%",Se.style.paddingRight="10px",Se.style.whiteSpace="normal",Se.style.overflow="visible";let St="15px",Rt="normal";j.name.length>25?(St="9px",Rt="1"):j.name.length>15?(St="10px",Rt="1.1"):j.name.length>12&&(St="12px",Rt="1.2"),me.style.fontSize=St,me.style.lineHeight=Rt,me.style.whiteSpace="normal",me.style.textOverflow="clip",me.style.overflow="visible",me.className="ml-1.5 font-black uppercase tracking-wide drop-shadow-lg text-white whitespace-normal break-words text-left",Se.appendChild(mt),Se.appendChild(me),de.appendChild(et),de.appendChild(tt),de.appendChild(Se),se.appendChild(de);const rr=document.createElement("div");rr.className="mt-2 px-1 pb-1 text-center";const bn=document.createElement("div");bn.className="font-semibold leading-tight text-white",bn.style.fontSize="14px",bn.textContent=j.name,rr.appendChild(bn),ae.appendChild(se),v.appendChild(ae)});const I=document.getElementById("gamertagModal"),S=document.getElementById("gamertagInput"),w=document.getElementById("skipGamertagBtn"),fe=document.getElementById("confirmGamertagBtn");S.value="";const $e=j=>{try{console.log("[ProceedToWrapped] Starting...",j),I.classList.add("hidden"),I.classList.remove("flex");const le=document.getElementById("wrappedContent"),ae=document.getElementById("wrappedGamertag");if(ae&&ae.remove(),j&&j.trim()){const se=document.createElement("div");se.id="wrappedGamertag",se.className="absolute top-4 right-4 p-[2px] rounded-full z-50",se.style.background="linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.6) 100%)",se.style.boxShadow="0 0 20px rgba(16,185,129,0.4)";const de=document.createElement("div");de.className="bg-black/50 backdrop-blur-xl px-6 py-2.5 rounded-full text-white font-bold text-lg",de.textContent="@"+j.trim(),se.appendChild(de),le.appendChild(se)}console.log("[ProceedToWrapped] Calling toggleCaptureMode(false)..."),s(!1),console.log("[ProceedToWrapped] Showing modal..."),e.classList.remove("hidden"),e.classList.add("flex","items-center","justify-center"),document.body.style.overflow="hidden",console.log("[ProceedToWrapped] Done!")}catch(le){console.error("[ProceedToWrapped] CRITICAL ERROR:",le),alert("Error loading wrapped view. Check console.")}};w.onclick=()=>$e(""),fe.onclick=()=>$e(S.value),S.onkeydown=j=>{j.key==="Enter"&&$e(S.value)},I.classList.remove("hidden"),I.classList.add("flex","items-center","justify-center"),S.focus()},t&&(t.onclick=()=>{s(!1),e.classList.add("hidden"),e.classList.remove("flex","items-center","justify-center"),document.body.style.overflow="";const d=document.getElementById("submitLocationFab");d&&m.currentTab==="blueprints"&&d.classList.remove("hidden")},document.addEventListener("keydown",d=>{d.key==="Escape"&&!e.classList.contains("hidden")&&t.click()})),r){const d=p=>{try{const E=document.createElement("canvas");return E.width=p.naturalWidth,E.height=p.naturalHeight,E.getContext("2d").drawImage(p,0,0),E.toDataURL("image/png")}catch(E){return console.warn("Canvas base64 failed",E),null}},f=async p=>{try{const b=await(await fetch(p)).blob();return new Promise(C=>{const R=new FileReader;R.onloadend=()=>C(R.result),R.readAsDataURL(b)})}catch(E){return console.error("Fetch base64 failed",E),p}};a||(r.onclick=async()=>{const p=document.getElementById("wrappedContent");if(!p)return;const E=r.textContent;r.disabled=!0,r.textContent="Baking...";const b=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,C=p.cloneNode(!0);C.style.position="fixed",C.style.top="0",C.style.left="0",C.style.width=p.offsetWidth+"px",C.style.height=p.offsetHeight+"px",C.style.zIndex="-9999",C.style.opacity="1",C.style.pointerEvents="none",C.style.transform="none",C.style.margin="0",C.style.backgroundColor="#09090b",document.body.appendChild(C);try{console.group("iOS Robust Baking");const R=C.querySelectorAll("img");for(let v of R)if(v.src&&!v.src.startsWith("data:")){const y=Array.from(p.querySelectorAll("img")).find(_=>_.src===v.src);if(y&&y.complete){const _=d(y);_&&(v.src=_)}else if(y){await new Promise(T=>{y.onload=T,y.onerror=T});const _=d(y);_&&(v.src=_)}}const A="Arc BP Image Background.webp",x=await f("Background/"+A);[C,...Array.from(C.querySelectorAll("*"))].forEach(v=>{const y=window.getComputedStyle(v).backgroundImage;if(y&&y.toLowerCase().includes(A.toLowerCase())){const _=new RegExp(`url\\((['"]?)([^'"\\)]*?${A.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(\\1)\\)`,"gi");v.style.backgroundImage=y.replace(_,`url("${x}")`),v.style.backgroundSize="cover",v.style.backgroundPosition="center"}}),console.info("Baking complete. Starting capture..."),console.groupEnd(),r.textContent=b?"Processing...":"Generating...";const V=Math.max(p.offsetWidth,p.offsetHeight),B={width:V,height:V,pixelRatio:2,cacheBust:!0,style:{borderRadius:"0",width:`${V}px`,height:`${V}px`,transform:"none"}};if(b)try{await htmlToImage.toCanvas(C,B)}catch{}await htmlToImage.toSvg(C,B),await new Promise(v=>setTimeout(v,b?3e3:1e3));const O=await htmlToImage.toPng(C,B);if(!O||O.length<5e4)throw new Error("Captured image is too small or black.");const F=document.createElement("a");F.download="arc-raiders-wrapped-2025.png",F.href=O,F.click()}catch(R){console.error("Capture error:",R),alert("Download failed on this device. Please take a screenshot instead - sorry!")}finally{C.parentNode&&C.parentNode.removeChild(C),r.disabled=!1,r.textContent=E}})}const c=()=>{const d=e.querySelector(".w-\\[896px\\]");if(!d||e.classList.contains("hidden"))return;d.style.transform="none",d.style.margin="0";const f=40,p=window.innerHeight-f,E=window.innerWidth-f,b=d.scrollHeight,C=d.scrollWidth,R=p/b,A=E/C,x=Math.min(A,R,1);if(x<1){d.style.transformOrigin="center center",d.style.transform=`scale(${x})`;const D=C*(1-x),V=b*(1-x);d.style.marginLeft=`-${D/2}px`,d.style.marginRight=`-${D/2}px`,d.style.marginTop=`-${V/2}px`,d.style.marginBottom=`-${V/2}px`,d.style.willChange="transform"}else d.style.transform="none",d.style.margin="0",d.style.willChange="auto"};window.addEventListener("resize",c),new MutationObserver(d=>{d.forEach(f=>{f.type==="attributes"&&f.attributeName==="class"&&(e.classList.contains("hidden")||requestAnimationFrame(()=>{requestAnimationFrame(c)}))})}).observe(e,{attributes:!0})}const Pu="arc_read_posts_v1";function bw(){const n=document.getElementById("announcementsBtn"),e=document.getElementById("announcementsDrawer"),t=document.getElementById("closeAnnouncementsBtn"),r=e?e.querySelector(":scope > div:first-child"):null,s=e?e.querySelector(":scope > div:last-child"):null,i=document.getElementById("announcementsFeed"),a=document.getElementById("newsBadge");let c=new Set;try{const A=localStorage.getItem(Pu);A&&(c=new Set(JSON.parse(A)))}catch(A){console.error("Failed to load read posts",A)}const u=()=>{localStorage.setItem(Pu,JSON.stringify(Array.from(c)))},d=()=>{const A=i?i.querySelectorAll(".announcement-card"):[];let x=0;A.forEach(D=>{const V=D.dataset.id,B=D.querySelector(".unread-dot");c.has(V)?(B&&B.classList.add("hidden"),D.classList.add("read")):(B&&B.classList.remove("hidden"),x++)}),a&&(x>0?(a.textContent=x,a.classList.remove("hidden")):a.classList.add("hidden"))},f=document.getElementById("devResetAnnouncements");f&&(f.onclick=A=>{A.stopPropagation(),c.clear(),u(),i&&i.querySelectorAll(".announcement-body").forEach(x=>{x.classList.add("max-h-0","opacity-0"),x.classList.remove("max-h-[1500px]","opacity-100")}),d()});const p=document.getElementById("markAllReadBtn");p&&(p.onclick=A=>{A.stopPropagation(),(i?i.querySelectorAll(".announcement-card"):[]).forEach(D=>{const V=D.dataset.id;V&&c.add(V)}),u(),d()});const E=A=>{A.stopPropagation(),R();const x=document.getElementById("tabCollection");x&&x.click();const D=document.getElementById("showWrappedBtn");D&&D.click()},b=document.getElementById("generateWrappedFromNews");if(b&&(b.onclick=E),i&&d(),!n||!e||!t||!r||!s)return;const C=()=>{e.classList.remove("hidden"),requestAnimationFrame(()=>{r.classList.remove("opacity-0"),s.classList.remove("translate-x-full")}),document.body.style.overflow="hidden"},R=()=>{r.classList.add("opacity-0"),s.classList.add("translate-x-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.style.overflow=""},300)};n.onclick=C,t.onclick=R,r.onclick=R,document.addEventListener("keydown",A=>{A.key==="Escape"&&!e.classList.contains("hidden")&&R()}),i&&(i.onclick=A=>{const x=A.target.closest(".announcement-card");if(!x)return;const D=x.querySelector(".announcement-body"),V=x.dataset.id;if(!D)return;!D.classList.contains("max-h-0")?(D.classList.add("max-h-0","opacity-0"),D.classList.remove("max-h-[1500px]","opacity-100")):(D.classList.remove("max-h-0","opacity-0"),D.classList.add("max-h-[1500px]","opacity-100"),c.has(V)||(c.add(V),u(),d()))})}function Nf(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),r=document.getElementById("collectToastProgress"),s=document.getElementById("submitLocationFab");!e||!t||!r||(ln&&(clearTimeout(ln),ln=null),oi=n,t.textContent=`${n} Blueprint collected? Tell us where!`,r.classList.remove("animate"),r.offsetWidth,r.classList.add("animate"),e.classList.remove("hidden"),s&&window.innerWidth<=768&&s.classList.add("hidden"),ln=setTimeout(()=>{Ci()},1e4))}function Ci(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress"),t=document.getElementById("submitLocationFab");n&&n.classList.add("hidden"),e&&e.classList.remove("animate"),t&&m.currentTab==="blueprints"&&window.innerWidth<=768&&t.classList.remove("hidden"),ln&&(clearTimeout(ln),ln=null)}async function Aw(){var f,p,E,b,C,R,A,x,D,V;const n=(f=document.getElementById("submitBlueprintName"))==null?void 0:f.value,e=(p=document.getElementById("submitMapId"))==null?void 0:p.value,t=(E=document.getElementById("submitMapX"))==null?void 0:E.value,r=(b=document.getElementById("submitMapY"))==null?void 0:b.value,s=(C=document.getElementById("submitCondition"))==null?void 0:C.value,i=(R=document.getElementById("submitNotes"))==null?void 0:R.value,a=ww(),c=((A=document.getElementById("submitTrialsReward"))==null?void 0:A.checked)||!1,u=((x=document.getElementById("submitQuestReward"))==null?void 0:x.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}if(!(e||s||i||a||c||u)){alert("Please provide at least one detail (Map, Condition, Notes, Container, or Reward Type).");return}try{const B=document.getElementById("customContainerForm"),O=document.getElementById("customContainerName"),F=document.getElementById("customContainerDescription");if(B&&!B.classList.contains("hidden")&&(O!=null&&O.value.trim()))try{await Tu(si(En,"containerSubmissions"),{name:O.value.trim(),description:(F==null?void 0:F.value.trim())||"",submittedAt:new Date().toISOString(),userId:((D=je.currentUser)==null?void 0:D.uid)||"anonymous"}),console.log("Custom container submitted successfully")}catch(v){console.error("Failed to submit custom container:",v)}await Tu(si(En,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:s||"",location:i||"",container:a.replace("CUSTOM: ","")||"",trialsReward:c,questReward:u,submittedAt:new Date().toISOString(),userId:((V=je.currentUser)==null?void 0:V.uid)||"anonymous",mapX:t||"",mapY:r||""}),$o(),Cw()}catch(B){console.error("Error submitting blueprint location:",B),alert("Failed to submit. Please try again.")}}function Cw(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function Sw(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=Uo(t);const r=Uo((e||"").trim());if(bu[r]){const i=bu[r];if(pt.has(i))return vr+pt.get(i);for(const[a,c]of pt.entries())if(a.startsWith(i))return vr+c}const s=[t.toLowerCase(),r.toLowerCase()];for(const i of s)if(i&&pt.has(i))return vr+pt.get(i);for(const i of s)if(i){for(const[a,c]of pt.entries())if(a===i||a.startsWith(i))return vr+c}return r?vr+r+".webp":""}const ws={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function Rw(n,e){let t;return function(...r){const s=this;clearTimeout(t),t=setTimeout(()=>n.apply(s,r),e)}}const Df=Rw(zo,2e3),un={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},qo={Confirmed:un.Legendary.color,"Very High":un.Epic.color,Confident:un.Rare.color,Low:un.Uncommon.color,"Not Enough Data":"#E11D48"},Pw=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function st(n){return nw+encodeURIComponent(n)}function kw(n){const e=Math.max(ws.min,Math.min(ws.max,Number(n)||ws.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(ws.storageKey,String(e))}catch{}const r=document.getElementById("gridSizeLabel"),s=document.getElementById("gridSizeLabelMobile");r&&(r.textContent=`${e}px`),s&&(s.textContent=`${e}px`)}function Ga(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return st("ItemCategory_Weapon.webp");if(t==="grenade")return st("ItemCategory_Grenade.webp");if(t==="quickuse")return st("ItemCategory_QuickUse.webp");if(t==="mod")return st("ItemCategory_Mod.webp");if(t==="augment")return st("ItemCategory_Augment.webp");if(t==="material")return st("ItemCategory_Material.webp");if(t==="misc")return st("ItemCategory_Misc.webp");for(const r of Pw)if(r.re.test(e))return st(r.file);return st("ItemCategory_Misc.webp")}function xw(n){const e=Be(n);return e?/^https?:\/\//i.test(e)?e:st(e):""}function Be(n){return(n??"").toString().trim()}function Vs(n){return Be(n).toLowerCase()}function Oe(n,e){const t=n.map(r=>Vs(r));for(const r of e){const s=t.indexOf(Vs(r));if(s!==-1)return n[s]}for(const r of e){const s=Vs(r),i=t.findIndex(a=>a.includes(s));if(i!==-1)return n[i]}return null}function Lw(n){const e=Be(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(un[t])return t;const r={Legend:"Legendary",Leg:"Legendary"};return r[t]?r[t]:t}function xe(n){var e;return((e=un[n])==null?void 0:e.color)||"#3f3f46"}function Ke(n){var e;return((e=un[n])==null?void 0:e.rank)||0}const m={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]},wrappedData:{contributionCount:0,loading:!1},spares:{},massCollectMode:!1};function Nw(){return new URL(window.location.href).searchParams.get("csv")||tw}function Ts(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function Dw(){m.massCollectMode=!m.massCollectMode;const n=document.getElementById("toggleMassCollectBtn"),e=document.getElementById("grid");m.massCollectMode?(n&&(n.innerHTML=`
        <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div class="flex flex-col text-left leading-none text-emerald-400 whitespace-nowrap">
          <span>Done</span>
          <span>Collecting</span>
        </div>
      `,n.classList.add("bg-emerald-500/10","border-emerald-500/50"),n.classList.remove("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.add("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const r=t.parentNode.dataset.name;r&&fn(t,r)})):(n&&(n.innerHTML=`
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <div class="flex flex-col text-left leading-none whitespace-nowrap">
          <span>Mark items</span>
          <span>as Collected</span>
        </div>
      `,n.classList.remove("bg-emerald-500/10","border-emerald-500/50"),n.classList.add("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.remove("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const r=t.parentNode.dataset.name;r&&fn(t,r)}))}function Mf(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),r=document.getElementById("drawerBackdrop");function s(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const O=!n.classList.contains("hidden");n.classList.toggle("hidden"),O?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=s);const c=document.getElementById("mobileFilterBtn");c&&(c.onclick=a);const u=document.getElementById("toggleMassCollectBtn");u&&(u.onclick=Dw);const d=document.getElementById("desktopFilterBtn"),f=document.getElementById("filtersSidebar");typeof m.filtersOpen>"u"&&(m.filtersOpen=sessionStorage.getItem("filtersOpen")!=="false");const p=()=>{f&&(f.classList.add("hidden"),m.filtersOpen?(f.classList.add("md:block"),d&&(d.classList.add("opacity-100"),d.classList.remove("opacity-50"))):(f.classList.remove("md:block"),d&&(d.classList.remove("opacity-100"),d.classList.add("opacity-50"))))};p(),d&&(d.onclick=()=>{m.filtersOpen=!m.filtersOpen,sessionStorage.setItem("filtersOpen",m.filtersOpen),p(),Qo(m.currentTab)}),t&&(t.onclick=i),r&&(r.onclick=i);const E=document.getElementById("searchInput"),b=document.getElementById("searchInputMobile"),C=O=>{m.filters.search=O,ge()};E&&E.addEventListener("input",O=>C(O.target.value)),b&&b.addEventListener("input",O=>{C(O.target.value),E&&(E.value=O.target.value)});const R=document.getElementById("sortSelect"),A=document.getElementById("sortSelectMobile"),x=O=>{m.currentTab==="data"?(m.filters.sortData=O,O==="entries_asc"&&(m.dataSort={column:"rarity",direction:"asc"}),O==="entries_desc"&&(m.dataSort={column:"rarity",direction:"desc"}),O==="name_asc"&&(m.dataSort={column:"name",direction:"asc"}),O==="name_desc"&&(m.dataSort={column:"name",direction:"desc"}),O==="conf_asc"&&(m.dataSort={column:"confidence",direction:"asc"}),O==="conf_desc"&&(m.dataSort={column:"confidence",direction:"desc"}),O==="rarity_asc"&&(m.dataSort={column:"rarity",direction:"asc"}),O==="rarity_desc"&&(m.dataSort={column:"rarity",direction:"desc"}),bt()):(m.filters.sortBlueprints=O,ge()),R&&(R.value=O),A&&(A.value=O),Fe()};R&&(R.onchange=O=>x(O.target.value)),A&&(A.onchange=O=>x(O.target.value)),m.filters.search&&(E&&(E.value=m.filters.search),b&&(b.value=m.filters.search)),m.currentTab==="data"?m.filters.sortData&&(R&&(R.value=m.filters.sortData),A&&(A.value=m.filters.sortData)):m.filters.sortBlueprints&&(R&&(R.value=m.filters.sortBlueprints),A&&(A.value=m.filters.sortBlueprints));const D=()=>{m.filters.rarities.clear(),m.filters.types.clear(),m.filters.maps.clear(),m.filters.conds.clear(),m.filters.confs.clear(),m.filters.search="",m.filters.sortBlueprints="rarity_desc",m.filters.sortData="rarity_desc",E&&(E.value=""),b&&(b.value="");const O="rarity_desc";R&&(R.value=O),A&&(A.value=O),m.filters.collected="all",m.dataSort={column:"rarity",direction:"desc"},m.currentTab==="data"?bt():ge(),Le(),Ka(),Fe()};["resetBtn","resetBtn2"].forEach(O=>{const F=document.getElementById(O);F&&(F.onclick=D)});const V=(O,F)=>{const v=document.getElementById(O);v&&(v.onclick=()=>{F.clear(),ge(),Le(),Fe()})};V("rarityAllBtn",m.filters.rarities),V("typeAllBtn",m.filters.types),V("mapAllBtn",m.filters.maps),V("condAllBtn",m.filters.conds),V("confAllBtn",m.filters.confs),window.addEventListener("resize",()=>{applyGridSize(currentGridSize)});const B=(O,F,v)=>{const y=document.getElementById(O),_=document.getElementById(F),T=document.getElementById(v);y&&_&&T&&(y.onclick=()=>{_.classList.toggle("hidden"),T.classList.toggle("rotate-180")})};B("toggleRarity","rarityFilters","iconRarity"),B("toggleType","typeFilters","iconType"),B("disclaimerHeader","disclaimerContent","disclaimerIcon"),B("toggleMap","mapFilters","iconMap"),B("toggleCond","condFilters","iconCond"),B("toggleConf","confFilters","iconConf"),B("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),B("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),B("toggleMapMobile","mapFiltersMobile","iconMapMobile"),B("toggleCondMobile","condFiltersMobile","iconCondMobile"),B("toggleConfMobile","confFiltersMobile","iconConfMobile"),document.querySelectorAll("[data-sort]").forEach(O=>{O.onclick=()=>{const F=O.dataset.sort;let v=m.filters.sortData;F==="name"?v=m.filters.sortData==="name_asc"?"name_desc":"name_asc":F==="confidence"&&(v=m.filters.sortData==="conf_desc"?"conf_asc":"conf_desc");const y=document.getElementById("sortSelect"),_=document.getElementById("sortSelectMobile");y&&(y.value=v),_&&(_.value=v),y&&y.onchange({target:{value:v}})}})}async function Mw(){Ts("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const r=await t.json();pt.clear();for(const s of r){const a=s.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),c=Uo(a).toLowerCase();pt.set(c,s)}console.log(`Loaded ${pt.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}Ts("Fetching sheet...");let n=Nw();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var O;const t=e.data||[],r=((O=e.meta)==null?void 0:O.fields)||Object.keys(t[0]||{}),s=Oe(r,["Blueprint Name","Item Name","Name","Item"]),i=Oe(r,["Item Type","Type"]),a=Oe(r,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),c=Oe(r,["Most Likely Map","Map"]),u=Oe(r,["Most Likely Condition","Condition"]),d=Oe(r,["Most Likely Location","Location"]),f=Oe(r,["Most Likely Container","Container"]),p=Oe(r,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),E=Oe(r,["Rarity","Item Rarity"]),b=Oe(r,["Data Confidence","Confidence"]),C=Oe(r,["Item URL","Wiki URL","URL","Link","Wiki"])||r[7],R=Oe(r,["Trials Reward","Trial Reward","Trials"])||r[9],A=Oe(r,["Quest Reward","Quest"])||r[10],x=Oe(r,["Description","Desc","Flavor Text"])||r[11],D=Oe(r,["Active","Is Active","Enabled"])||r[12],V=F=>{const v=Be(F).toLowerCase();return v==="true"||v==="yes"||v==="1"||v==="x"||v==="âœ“"};m.columns={name:s,type:i,typeIcon:a,map:c,cond:u,loc:d,cont:f,img:p,rarity:E,conf:b,wiki:C};const B=[];for(const F of t){const v=Be(F[s]);if(!v)continue;const y=Be(F[i]),_=Be(F[c]),T=Be(F[u]),I=Be(F[d]),S=Be(F[f]),w=Be(F[p]),fe=Sw(w,v),$e=Lw(F[E]),j=b?Be(F[b]):"",le=Be(F[C]),se=(a?xw(F[a]):"")||Ga(y),de=R?V(F[R]):!1,et=A?V(F[A]):!1,tt=x?Be(F[x]):"",Se=D?V(F[D]):!0,Ct=_.split(",").map(me=>me.trim()).filter(me=>me),mt=T.split(",").map(me=>me.trim()).filter(me=>me);B.push({name:v,type:y,map:_,cond:T,loc:I,cont:S,img:fe,rarity:$e,conf:j,wiki:le,typeIcon:se,trialsReward:de,questReward:et,description:tt,active:Se,mapList:Ct,condList:mt})}m.all=B.filter(F=>F.active!==!1),Bw(),Mf(),ge(),Le(),Ts("")},error:e=>{console.error(e),Ts("Failed to load CSV. Check your published link.")}})}function lo(n){const e=new Set(n.filter(t=>Be(t)));return Array.from(e).sort((t,r)=>t.localeCompare(r))}const jo=["Confirmed","Very High","Confident","Low","Not Enough Data"],ku=["Augment","Weapon","Quick Use","Grenade","Mod","Material"],Vw=["Dam Battlegrounds","Blue Gate","Buried City","Spaceport","Stella Montis"],Ow=["Day","Night","Storm","Cold Snap","Harvester","Matriarch","Hidden Bunker","Husk Graveyard","Launch Tower Loot","Locked Gate","Prospecting Probes","Lush Blooms","N/A"];function Bw(){m.facets.rarities=lo(m.all.map(t=>t.rarity)).sort((t,r)=>Ke(r)-Ke(t)),m.facets.types=lo(m.all.map(t=>t.type)).sort((t,r)=>{let s=ku.indexOf(t),i=ku.indexOf(r);return s===-1&&(s=999),i===-1&&(i=999),s-i||t.localeCompare(r)});const n=new Set;m.all.forEach(t=>{t.mapList.forEach(r=>{Vw.includes(r)&&n.add(r)})}),m.facets.maps=Array.from(n).sort((t,r)=>t.localeCompare(r));const e=new Set;m.all.forEach(t=>{t.condList.forEach(r=>{Ow.includes(r)&&e.add(r)})}),m.facets.conds=Array.from(e).sort((t,r)=>t.localeCompare(r)),m.facets.confs=lo(m.all.map(t=>t.conf)).sort((t,r)=>{let s=jo.indexOf(t),i=jo.indexOf(r);return s===-1&&(s=999),i===-1&&(i=999),s-i})}function Ir(n,e){n.has(e)?n.delete(e):n.add(e)}function xu(n,e,t){const r=document.createElement("button");return r.className="chip "+(e?"chip-active":""),r.textContent=n,r.onclick=t,r}function Le(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of m.facets.rarities){const r=m.filters.rarities.has(t),s=xe(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=r?s+"66":s+"22";i.style.background=a,i.style.borderColor=s,i.style.color="#f4f4f5",i.onclick=()=>{Ir(m.filters.rarities,t),ge(),Le(),Fe()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of m.facets.types){const r=m.filters.types.has(t),s=document.createElement("button");s.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",s.style.borderColor=r?"rgb(113 113 122)":"rgb(39 39 42)",s.title=t,s.onclick=()=>{Ir(m.filters.types,t),ge(),Le(),Fe()};const i=document.createElement("img");i.src=Ga(t),i.alt=t,i.className="w-6 h-6",s.appendChild(i),e.appendChild(s)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of m.facets.maps){const r=m.filters.maps.has(t);e.appendChild(xu(t,r,()=>{Ir(m.filters.maps,t),ge(),Le(),Fe()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of m.facets.conds){const r=m.filters.conds.has(t);e.appendChild(xu(t,r,()=>{Ir(m.filters.conds,t),ge(),Le(),Fe()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of m.facets.confs){if(!t)continue;const r=m.filters.confs.has(t),s=qo[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=r?s:"rgb(39 39 42)",i.style.background=r?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{Ir(m.filters.confs,t),ge(),Le(),Fe()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=s;const c=document.createElement("span");c.textContent=t,i.appendChild(a),i.appendChild(c),e.appendChild(i)}}Fw()}function Fw(){const n=[document.getElementById("activeChips"),document.getElementById("dataActiveChips")].filter(t=>!!t);n.forEach(t=>t.innerHTML="");const e=(t,r)=>{n.forEach(s=>{const i=document.createElement("button");i.className="chip chip-active",i.textContent=t+" ✕",i.onclick=r,s.appendChild(i)})};if(m.filters.rarities.size&&e(`Rarity: ${Array.from(m.filters.rarities).join(", ")}`,()=>{m.filters.rarities.clear(),ge(),Le(),Fe()}),m.filters.types.size&&e(`Type: ${Array.from(m.filters.types).join(", ")}`,()=>{m.filters.types.clear(),ge(),Le(),Fe()}),m.filters.maps.size&&e(`Map: ${Array.from(m.filters.maps).join(", ")}`,()=>{m.filters.maps.clear(),ge(),Le(),Fe()}),m.filters.conds.size&&e(`Condition: ${Array.from(m.filters.conds).join(", ")}`,()=>{m.filters.conds.clear(),ge(),Le(),Fe()}),m.filters.confs.size&&e(`Confidence: ${Array.from(m.filters.confs).join(", ")}`,()=>{m.filters.confs.clear(),ge(),Le(),Fe()}),m.filters.collected!=="all"){let t="Collected";m.filters.collected==="not-collected"&&(t="Not Collected"),m.filters.collected==="wishlist"&&(t="Wishlist"),m.filters.collected==="spares"&&(t="Has Spares"),e(`Status: ${t}`,()=>{m.filters.collected="all",ge(),Le(),Ka(),Fe()})}m.filters.search.trim()&&e(`Search: ${m.filters.search.trim()}`,()=>{m.filters.search="";const t=document.getElementById("searchInput"),r=document.getElementById("searchInputMobile");t&&(t.value=""),r&&(r.value=""),ge(),Le()})}function ge(){const n=Vs(m.filters.search),e=m.filters.rarities.size>0,t=m.filters.types.size>0,r=m.filters.maps.size>0,s=m.filters.conds.size>0,i=m.filters.confs.size>0;let a=m.all.filter(u=>{if(e&&!m.filters.rarities.has(u.rarity)||t&&!m.filters.types.has(u.type)||r&&!u.mapList.some(p=>m.filters.maps.has(p))||s&&!u.condList.some(p=>m.filters.conds.has(p))||i&&!m.filters.confs.has(u.conf))return!1;const d=m.collectedItems.has(u.name),f=m.wishlistedItems.has(u.name);return!(m.filters.collected==="collected"&&!d||m.filters.collected==="wishlist"&&!f||m.filters.collected==="not-collected"&&d||m.filters.collected==="spares"&&!(m.spares[u.name]>0)||n&&!(u.name+" "+u.type+" "+u.map+" "+u.cond+" "+u.loc+" "+u.cont).toLowerCase().includes(n))});const c=m.filters.sortBlueprints||"rarity_desc";a.sort((u,d)=>c==="name_asc"?u.name.localeCompare(d.name):c==="name_desc"?d.name.localeCompare(u.name):c==="type_asc"?(u.type||"").localeCompare(d.type||""):c==="rarity_asc"?Ke(u.rarity)-Ke(d.rarity)||u.name.localeCompare(d.name):Ke(d.rarity)-Ke(u.rarity)||u.name.localeCompare(d.name)),m.filtered=a,Ho(),m.currentTab==="data"&&bt()}function Ho(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${m.filtered.length} / ${m.all.length}`),!m.filtered.length||m.currentTab!=="blueprints"){n.classList.add("hidden"),e&&m.currentTab==="blueprints"&&e.classList.remove("hidden");return}else n.classList.remove("hidden"),e&&e.classList.add("hidden");n.className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5";const r=[];for(const s of m.filtered){const i=document.createElement("div");i.className="card-compact border border-zinc-800/50 rounded-2xl p-2 opacity-0",i.style.backgroundColor="#0C0C0F",i.style.position="relative",i.style.overflow="visible",i.style.setProperty("--glow-color",xe(s.rarity)),i.dataset.name=s.name;const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=xe(s.rarity);const c=document.createElement("div");c.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",c.style.background=`
      linear-gradient(to top right, ${xe(s.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,c.style.backgroundSize="cover, cover, cover",c.style.backgroundPosition="center, center, center",c.style.backgroundBlendMode="normal, normal, normal",c.style.aspectRatio="1 / 1",c.style.width="100%";const u=document.createElement("img");u.src=s.img||"",u.alt=s.name,u.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",u.style.padding="8px",u.loading="lazy",u.draggable=!1,u.style.webkitTouchCallout="none",u.style.userSelect="none",u.classList.add("transition-transform","duration-200","ease-out","group-hover:scale-110"),i.classList.add("group");const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${xe(s.rarity)}66 60%, ${xe(s.rarity)}cc 100%)`;const f=document.createElement("div");f.className="type-tab";const p=qo[s.conf]||"#E11D48";f.style.background=p+"9E",f.style.borderColor=p;const E=document.createElement("span");E.className="text-white font-semibold",E.style.textShadow="0 1px 2px rgba(0,0,0,0.5)",E.textContent=s.conf||"N/A",f.appendChild(E),c.appendChild(u),c.appendChild(d),c.appendChild(f);const b=document.createElement("div");b.className="mt-2 px-1 pb-1";const C=document.createElement("div");C.className="font-semibold leading-tight transition-all duration-200";const R=m.blueprintGridSize||"M";R==="S"?C.classList.add("text-xs"):R==="L"?C.classList.add("text-base"):C.classList.add("text-sm"),C.textContent=s.name,b.appendChild(C);const A=document.createElement("div");A.className="details-overlay hidden backdrop-blur-md bg-zinc-900/40 border border-white/10 shadow-2xl rounded-2xl";const x=document.createElement("div");x.className="bg-black/20 rounded-lg p-3 border border-white/10 mb-3";const D=document.createElement("div");D.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",D.textContent="Most Likely Spawn",x.appendChild(D);let V=!1;const B=(y,_)=>{if(!_||_==="N/A")return null;const T=document.createElement("div");T.className="details-row";const I=document.createElement("div");I.className="details-label",I.textContent=y;const S=document.createElement("div");return S.className="details-value",S.textContent=_,T.appendChild(I),T.appendChild(S),T};if([B("Map",s.map),B("Location",s.loc),B("Container",s.cont),B("Condition",s.cond)].filter(Boolean).forEach(y=>{x.appendChild(y),V=!0}),V&&A.appendChild(x),s.conf){const y=document.createElement("div");y.className="details-row";const _=document.createElement("div");_.className="details-label",_.textContent="Data Confidence";const T=document.createElement("div");T.className="details-value details-confidence";const I=document.createElement("span");I.className="confidence-dot",I.style.background=qo[s.conf]||"#71717a";const S=document.createElement("span");S.textContent=s.conf,T.appendChild(I),T.appendChild(S),y.appendChild(_),y.appendChild(T),A.appendChild(y)}if(s.trialsReward){const y=document.createElement("div");y.className="details-row";const _=document.createElement("div");_.className="details-label",_.textContent="Trials Reward";const T=document.createElement("div");T.className="details-value",T.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',y.appendChild(_),y.appendChild(T),A.appendChild(y)}if(s.questReward){const y=document.createElement("div");y.className="details-row";const _=document.createElement("div");_.className="details-label",_.textContent="Quest Reward";const T=document.createElement("div");T.className="details-value",T.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',y.appendChild(_),y.appendChild(T),A.appendChild(y)}if(s.description){const y=document.createElement("div");y.className="details-row";const _=document.createElement("div");_.className="details-label",_.textContent="Description";const T=document.createElement("div");T.className="details-value",T.textContent=s.description,T.classList.add("italic"),y.appendChild(_),y.appendChild(T),A.appendChild(y)}if(s.wiki){const y=document.createElement("a");y.href=s.wiki,y.target="_blank",y.rel="noreferrer",y.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",y.textContent="Item URL",A.appendChild(y)}const O=document.createElement("div");O.className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black/20 border border-white/10 hover:border-emerald-400 hover:bg-black/30 rounded-lg cursor-pointer transition-all group/link shadow-sm",O.onclick=y=>{y.stopPropagation(),window.openDataDetail&&window.openDataDetail(s.name)},O.innerHTML=`
      <span class="text-xs font-bold text-zinc-300 group-hover/link:text-white uppercase tracking-wider">Detailed Data</span>
      <svg class="w-4 h-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `,A.appendChild(O),a.style.cursor="pointer",a.onclick=y=>{if(y.stopPropagation(),m.massCollectMode){m.collectedItems.has(s.name)?(m.collectedItems.delete(s.name),Ci()):(m.collectedItems.add(s.name),m.wishlistedItems.delete(s.name),m.currentTab==="blueprints"&&Nf(s.name)),Fn(),fn(a,s.name),Df();return}!A.classList.contains("hidden")?Ha():(Pf(i,"details"),requestAnimationFrame(()=>{const T=A.getBoundingClientRect(),I=12;let S=0;T.left<I?S=I-T.left:T.right>window.innerWidth-I&&(S=window.innerWidth-I-T.right),S!==0&&(A.style.transform=`translateX(calc(-50% + ${S}px))`)}))},a.appendChild(c),fn(a,s.name);const F=m.spares[s.name]||0;if(F>0){const y=document.createElement("div");y.className="spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",y.innerHTML=`Spares: <span class="font-bold">${F}</span>`,y.dataset.itemName=s.name,a.appendChild(y)}const v=document.createElement("div");v.className="mass-collect-overlay",v.innerHTML=`
      <span class="mass-collect-text">Click to<br>Collect</span>
      <div class="mass-collect-icons">
        <svg class="mass-collect-icon icon-plus w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <svg class="mass-collect-icon icon-check w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,a.appendChild(v),i.appendChild(a),i.appendChild(b),i.appendChild(A),n.appendChild(i),r.push(i)}r.length>0&&tp(r,{opacity:[0,1],y:[20,0]},{delay:Qm(.015)})}function Uw(){const n=document.getElementById("filtersSidebar"),e=document.getElementById("sidebarBackdrop"),t=document.getElementById("desktopFilterBtn"),r=document.getElementById("closeSidebarBtn");n||console.error("Sidebar not found");const s=()=>{n&&(n.style.transform="translateX(0)",n.style.display="block",n.classList.remove("-translate-x-full","hidden"),n.classList.add("translate-x-0"),n.classList.remove("pointer-events-none"),n.classList.add("pointer-events-auto"),n.classList.remove("md:hidden"),n.classList.add("md:block")),window.innerWidth<768&&(e&&e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))},i=()=>{n&&(n.style.transform="",n.style.display="",n.classList.add("-translate-x-full"),n.classList.remove("translate-x-0"),n.classList.remove("pointer-events-auto"),n.classList.add("pointer-events-none"),window.innerWidth>=768&&(n.classList.remove("md:block"),n.classList.add("md:hidden"),n.classList.add("hidden"),n.style.display="none")),e&&e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},a=()=>{if(!n)return;const u=window.getComputedStyle(n).display==="none";window.innerWidth<768?n.classList.contains("-translate-x-full")?s():i():u?s():i()};t&&t.addEventListener("click",c=>{c.stopPropagation(),a()}),r&&(r.onclick=i),e&&(e.onclick=i)}function Ka(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedWish"),r=document.getElementById("collectedNo"),s=document.getElementById("collectedSpares"),i=a=>{m.filters.collected=a;const c={all:n,collected:e,wishlist:t,"not-collected":r,spares:s};Object.values(c).forEach(u=>u==null?void 0:u.classList.remove("chip-active")),c[a]&&c[a].classList.add("chip-active"),ge(),Le(),Fe()};n&&(n.onclick=()=>i("all")),e&&(e.onclick=()=>i("collected")),t&&(t.onclick=()=>i("wishlist")),r&&(r.onclick=()=>i("not-collected")),s&&(s.onclick=()=>i("spares")),i(m.filters.collected)}function zw(){const n=document.getElementById("itemContextMenu"),e=document.getElementById("grid");if(!n||!e)return;let t=null,r=null,s=!1;const i=500,a=b=>{if(Pf(b,"menu"),window.menuCloseTimer&&(clearTimeout(window.menuCloseTimer),window.menuCloseTimer=null),t=b,!b)return;const C=b.getBoundingClientRect(),R=200;let A=C.left+C.width/2-R/2,x=C.bottom+8;const D=12;A<D?A=D:A+R>window.innerWidth-D&&(A=window.innerWidth-R-D);const V=150;x+V>window.innerHeight-D&&(x=C.top-V-8,x<D&&(x=D)),n.style.left=`${A}px`,n.style.top=`${x}px`,n.classList.remove("hidden","pointer-events-none"),requestAnimationFrame(()=>n.classList.remove("opacity-0"));const B=document.getElementById("contextSparesCount");if(B&&b){const T=b.dataset.name,I=m.spares[T]||0;B.textContent=I}const O=b.dataset.name,F=document.getElementById("contextCollectedText"),v=document.getElementById("contextWishlistText"),y=document.getElementById("contextCollectedBtn"),_=document.getElementById("contextWishlistBtn");m.collectedItems.has(O)?(F&&(F.textContent="Mark as Uncollected"),y&&y.classList.add("bg-emerald-500/20","text-emerald-400")):(F&&(F.textContent="Mark as Collected"),y&&y.classList.remove("bg-emerald-500/20","text-emerald-400")),m.wishlistedItems.has(O)?(v&&(v.textContent="Remove from Wishlist"),_&&_.classList.add("bg-amber-500/20","text-amber-400")):(v&&(v.textContent="Add to Wishlist"),_&&_.classList.remove("bg-amber-500/20","text-amber-400"))},c=()=>{n.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>n.classList.add("hidden"),150),t&&t.classList.remove("card-selected"),t=null};e.addEventListener("contextmenu",b=>{const C=b.target.closest(".card-compact");C&&(b.preventDefault(),a(C))}),e.addEventListener("touchstart",b=>{const C=b.target.closest(".card-compact");C&&(r=setTimeout(()=>{s=!0,a(C),navigator.vibrate&&navigator.vibrate(50)},i))},{passive:!0}),e.addEventListener("touchend",b=>{clearTimeout(r),s&&(b.cancelable&&b.preventDefault(),s=!1)},{passive:!1}),e.addEventListener("touchmove",()=>{clearTimeout(r)},{passive:!0}),document.addEventListener("click",b=>{n.contains(b.target)||b.target.closest(".details-overlay")||b.target.closest(".card-selected")||Ha()}),e.addEventListener("click",b=>{const C=b.target.closest(".spares-pill");if(!C)return;b.stopPropagation();const R=C.closest(".card-compact");R&&a(R)}),window.addEventListener("scroll",c,{passive:!0}),document.addEventListener("keydown",b=>{b.key==="Escape"&&c()});const u=document.getElementById("contextSparesCount"),d=document.getElementById("contextSparesMinus"),f=document.getElementById("contextSparesPlus"),p=()=>{if(t&&u){const b=t.dataset.name,C=m.spares[b]||0;u.textContent=C}},E=(b,C)=>{const R=b==null?void 0:b.querySelector(".rarity-frame");if(!R)return;const A=R.querySelector(".spares-pill");A&&A.remove();const x=m.spares[C]||0;if(x>0){const D=document.createElement("div");D.className="spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",D.innerHTML=`Spares: <span class="font-bold">${x}</span>`,D.dataset.itemName=C,R.appendChild(D)}};d&&(d.onclick=b=>{if(b.stopPropagation(),!t)return;const C=t.dataset.name,R=m.spares[C]||0;R>0&&(m.spares[C]=R-1,m.spares[C]===0&&delete m.spares[C],Au(),p(),E(t,C))}),f&&(f.onclick=b=>{if(b.stopPropagation(),!t)return;const C=t.dataset.name,R=m.spares[C]||0;m.spares[C]=R+1,Au(),p(),E(t,C)}),n.addEventListener("click",b=>{const C=b.target.closest("[data-action]");if(!C||!t)return;const R=C.dataset.action,A=t.dataset.name,x=t.querySelector(".rarity-frame");if(!A){c();return}R==="collected"?(m.collectedItems.has(A)?(m.collectedItems.delete(A),Ci()):(m.wishlistedItems.delete(A),m.collectedItems.add(A),m.currentTab==="blueprints"&&Nf(A)),Fn(),Df(),x&&fn(x,A),Ds(),c()):R==="wishlisted"?(m.wishlistedItems.has(A)?m.wishlistedItems.delete(A):(m.collectedItems.delete(A),m.wishlistedItems.add(A)),Fn(),x&&fn(x,A),Ds(),c()):R==="uncollected"&&(m.collectedItems.delete(A),m.wishlistedItems.delete(A),Fn(),x&&fn(x,A),Ds(),c())})}const $w="./data_registry.csv";m.detailedData=[];m.dataSort={column:"rarity",direction:"desc"};m.dataSearch="";async function Wo(){const n=document.getElementById("dataRows");if(n){m.detailedData.length===0&&(n.innerHTML=`
      <div class="py-20 text-center">
        <div class="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-zinc-500">Fetching live data...</p>
      </div>`);try{const t=await(await fetch($w)).text();Papa.parse(t,{header:!0,skipEmptyLines:!0,complete:r=>{qw(r.data)},error:r=>{console.error("CSV Parse Error:",r),n.innerHTML='<div class="py-10 text-center text-red-500">Failed to load data.</div>'}})}catch(e){console.error("Fetch Error:",e),n.innerHTML='<div class="py-10 text-center text-red-500">Network error.</div>'}}}function qw(n){m.detailedData=n.map(e=>{const t=[{name:"Spaceport",count:parseInt(e.Spaceport||0)},{name:"Stella Montis",count:parseInt(e["Stella Montis"]||0)},{name:"Blue Gate",count:parseInt(e["Blue Gate"]||0)},{name:"Dam Battlegrounds",count:parseInt(e["Dam Battlegrounds"]||0)},{name:"Buried City",count:parseInt(e["Buried City"]||0)}].sort((i,a)=>a.count-i.count),r=[{name:"Day",count:parseInt(e.Day||0)},{name:"Night",count:parseInt(e.Night||0)},{name:"Storm",count:parseInt(e.Storm||0)},{name:"Cold Snap",count:parseInt(e["Cold Snap"]||0)},{name:"Hidden Bunker",count:parseInt(e["Hidden Bunker"]||0)},{name:"Locked Gate",count:parseInt(e["Locked Gate"]||0)}].sort((i,a)=>a.count-i.count),s=parseInt(e["Total Entries"]||0);return{name:e["Blueprint Name"],confidence:e["Data Confidence"],bestMap:e["Most Likely Map"],bestCondition:e["Most Likely Condition"],entries:s,maps:t,conditions:r}}),bt()}function bt(){const n=document.getElementById("dataRows");if(!n)return;n.innerHTML="";let e=m.detailedData.filter(a=>{const c=(m.filters.search||"").toLowerCase();let u=m.all.find(A=>A.name===a.name);if(!u&&a.name.includes("Light Stick")&&(u=m.all.find(A=>A.name.includes("Light Stick"))),!u)return!1;const d=u?u.rarity:"common",f=u?u.type:"Unknown",p=u?u.map:"",E=u?u.cond:"",b=a.confidence||(u?u.conf:"");if(m.filters.rarities.size>0&&!m.filters.rarities.has(d)||m.filters.types.size>0&&!m.filters.types.has(f)||m.filters.maps.size>0&&!m.filters.maps.has(p)||m.filters.conds.size>0&&!m.filters.conds.has(E)||m.filters.confs.size>0&&!m.filters.confs.has(b))return!1;const C=m.collectedItems.has(a.name),R=m.wishlistedItems.has(a.name);return!(m.filters.collected==="collected"&&!C||m.filters.collected==="wishlist"&&!R||m.filters.collected==="not-collected"&&C||m.filters.collected==="spares"&&!(m.spares[a.name]>0)||c&&!(a.name+" "+f+" "+a.bestMap+" "+a.bestCondition).toLowerCase().includes(c))});if(e.sort((a,c)=>{const u=m.dataSort.direction==="asc"?1:-1,d=m.dataSort.column;if(d==="name")return a.name.localeCompare(c.name)*u;if(d==="rarity"){const f=b=>{let C=m.all.find(R=>R.name===b.name);return!C&&b.name.includes("Light Stick")&&(C=m.all.find(R=>R.name.includes("Light Stick"))),C?C.rarity:"common"},p=Ke(f(a)),E=Ke(f(c));return(p-E)*u}if(d==="confidence"){const f=A=>{const x=jo.indexOf(A);return x===-1?999:x},p=f(a.confidence),E=f(c.confidence);if(p!==E)return m.dataSort.direction==="desc"?p-E:E-p;const b=A=>{let x=m.all.find(D=>D.name===A.name);return!x&&A.name.includes("Light Stick")&&(x=m.all.find(D=>D.name.includes("Light Stick"))),x?x.rarity:"common"},C=Ke(b(a)),R=Ke(b(c));return C-R}return String(a[d]).localeCompare(String(c[d]))*u}),e.length===0){n.innerHTML='<div class="py-10 text-center text-zinc-500">No matching records found.</div>';return}const t=m.dataGridSize||"medium";let r="py-3 md:py-4 text-xs md:text-sm";t==="small"?r="py-1.5 md:py-2 text-[10px] md:text-xs":t==="large"&&(r="py-3 md:py-4 text-sm md:text-base");let s="w-10 h-10",i="text-sm";t==="small"?(s="w-8 h-8",i="text-xs"):t==="large"&&(s="w-12 h-12",i="text-sm md:text-base"),e.forEach((a,c)=>{let u=m.all.find(A=>A.name===a.name);!u&&a.name.includes("Light Stick")&&(u=m.all.find(A=>A.name.includes("Light Stick")));const d=u?u.rarity:"common",f=u?u.img:"icons/ItemCategory_Weapon.webp";u&&u.typeIcon;const p=document.createElement("div");p.className="group relative flex flex-col bg-zinc-900/70 border border-zinc-800/50 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-200 backdrop-blur-md";const E=document.createElement("div");let b="md:grid-cols-[2fr,1fr,1fr,1fr,40px]";t==="large"&&(b="md:grid-cols-[3fr,0.8fr,1fr,0.8fr,40px]"),E.className=`group grid grid-cols-[90px,0.8fr,1fr,0.8fr,0.5fr,20px] ${b} gap-x-1 md:gap-4 ${r} px-3 md:px-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center cursor-pointer`;const C=`mini-card-${c}`;if(E.innerHTML=`
      <!-- Item Name & Icon (Col 1) -->
      <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 overflow-hidden md:border-r border-white/5 pr-0 h-full min-w-0">
        <div id="${C}" class="shrink-0 relative flex items-center justify-center ${s}">
            ${u?"":`
            <div class="${s} rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden" 
                 style="border-color: ${xe(d)}66">
              <img src="${f}" class="w-full h-full object-contain p-1" loading="lazy">
              <div class="absolute inset-0 bg-${xe(d)}/10"></div>
            </div>`}
        </div>
        <div class="flex flex-col min-w-0 w-full">
          <!-- Text wrap enabled, sized down on mobile, type removed -->
          <span class="font-bold ${i} text-zinc-200 break-words leading-tight group-hover:text-emerald-400 transition-colors">${a.name}</span>
        </div>
      </div>

      <!-- Confidence -->
      <div class="border-r border-white/5 h-full flex items-center pl-0 pr-1 md:pl-2 overflow-hidden">${jw(a.confidence)}</div>

      <!-- Best Map -->
      <div class="text-[10px] md:text-xs text-zinc-200 break-words leading-tight font-medium border-r border-white/5 h-full flex items-center pl-1 md:pl-2">${a.bestMap}</div>

      <!-- Best Condition -->
      <div class="text-[10px] md:text-xs text-zinc-200 break-words leading-tight font-medium md:border-r border-white/5 h-full flex items-center pl-1 md:pl-2">${a.bestCondition}</div>

      <!-- Arrow (Grid Column) -->
      <div class="flex justify-end items-center h-full text-zinc-600 group-hover:text-zinc-300">
        <svg class="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 transform expand-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    `,u){const A=E.querySelector(`#${C}`);if(A){let x=.42;m.dataGridSize==="small"&&(x=.25),m.dataGridSize==="large"&&(x=.65);const D=200;A.style.width=D*x+"px",A.style.height=D*x+"px";const V=Sf(u);V.className="",V.style.background="transparent",V.style.border="none",V.style.padding="0",V.style.containerType="inline-size",V.lastChild&&V.lastChild.remove();const B=V.querySelector(".type-tab");B&&B.remove(),V.querySelectorAll(".collected-badge, .wishlist-badge").forEach(F=>{F.style.transform="scale(2.5) translateY(-12px)",F.style.transformOrigin="top right",F.style.zIndex="50"}),V.style.width=D+"px",V.style.transform=`scale(${x})`,V.style.transformOrigin="top left",V.style.position="absolute",V.style.top="0",V.style.left="0",V.style.pointerEvents="none",A.appendChild(V)}}const R=document.createElement("div");R.className="hidden border-t border-zinc-800/50 bg-black/20",R.innerHTML=`
      <div class="p-4 md:p-6">
        <!-- Analytics Only -->
        <div class="space-y-6 w-full min-w-0">
          <!-- Maps Chart -->
          <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Map Distribution</h4>
            <div class="space-y-2">
              ${Lu(a.maps,a.entries)}
            </div>
          </div>
          
          <!-- Conditions Chart -->
           <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Condition Distribution</h4>
            <div class="space-y-2">
              ${Lu(a.conditions,a.entries)}
            </div>
          </div>
        </div>
      </div>
    `,E.onclick=()=>{R.classList.contains("hidden")?(R.classList.remove("hidden"),E.querySelectorAll(".expand-arrow").forEach(x=>x.classList.add("rotate-180")),E.classList.add("bg-white/[0.02]")):(R.classList.add("hidden"),E.querySelectorAll(".expand-arrow").forEach(x=>x.classList.remove("rotate-180")),E.classList.remove("bg-white/[0.02]"))},E.dataset.itemName=a.name,p.appendChild(E),p.appendChild(R),n.appendChild(p)}),m.dataTabTarget&&setTimeout(()=>{const a=n.querySelector(`div[data-item-name="${m.dataTabTarget}"]`);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),a.click(),a.classList.add("bg-emerald-500/10"),setTimeout(()=>a.classList.remove("bg-emerald-500/10"),1500)),m.dataTabTarget=null},300)}window.openDataDetail=function(n){m.dataTabTarget=n,m.dataSearch="";const e=document.getElementById("dataSearch");e&&(e.value=""),on("data")};function jw(n){let e="bg-zinc-800 text-zinc-400 border-zinc-700";const t=n.toLowerCase();return t.includes("confirmed")?e="bg-amber-500/10 text-amber-400 border-amber-500/20":t.includes("very high")||t.includes("high")?e="bg-pink-500/10 text-pink-400 border-pink-500/20":t.includes("confident")||t.includes("medium")?e="bg-blue-500/10 text-blue-400 border-blue-500/20":t.includes("low")&&(e="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"),`<span class="flex flex-wrap justify-center text-center leading-none px-1 py-0.5 rounded-md text-[9px] md:text-[10px] font-bold border ${e} uppercase tracking-wide w-full h-auto break-words whitespace-normal">${n}</span>`}function Lu(n,e){const t=Math.max(...n.map(s=>s.count))||1,r=["#DC2626","#D97706","#16A34A","#0891B2","#7E22CE","#BE185D","#1D4ED8"];return n.map((s,i)=>{if(s.count===0)return"";const a=Math.round(s.count/e*100),c=Math.max(s.count/t*100,2),u=r[i]||"#3f3f46";return`
      <div class="flex items-center gap-3 text-xs">
        <div class="w-24 shrink-0 text-zinc-300 text-right truncate" title="${s.name}">${s.name}</div>
        <div class="flex-1 h-6 bg-zinc-900 rounded-md overflow-hidden relative group/bar">
          <div class="absolute inset-y-0 left-0 rounded-md transition-all duration-200 opacity-90 group-hover/bar:opacity-100 group-hover/bar:brightness-110" 
               style="width: ${c}%; background-color: ${u};"></div>
          <div class="absolute inset-0 flex items-center px-2">
             <span class="font-mono text-white z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] font-bold">${s.count} <span class="text-white/80 ml-1">(${a}%)</span></span>
          </div>
        </div>
      </div>
    `}).join("")}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("dataSearchInput");n&&n.addEventListener("input",i=>{m.dataSearch=i.target.value,bt()});const e=document.getElementById("dataRefreshBtn");e&&(e.onclick=()=>{Wo()});const t=document.getElementById("disclaimerToggleBtn"),r=document.getElementById("disclaimerContent"),s=document.getElementById("disclaimerIcon");t&&r&&s&&t.addEventListener("click",()=>{r.classList.toggle("hidden"),s.classList.toggle("rotate-180")})});const ns={dam_battlegrounds:{name:"Dam Battlegrounds",url:"/images/maps/dam_battlegrounds.webp",bounds:[[0,0],[1e3,1095]]},the_spaceport:{name:"The Spaceport",url:"/images/maps/the_spaceport.webp",bounds:[[0,0],[1e3,1e3]]},buried_city:{name:"Buried City",url:"/images/maps/buried_city.webp",bounds:[[0,0],[1e3,1e3]]},the_blue_gate:{name:"The Blue Gate",url:"/images/maps/the_blue_gate.webp",bounds:[[0,0],[1e3,1333]]},stella_montis_upper:{name:"Stella Montis (Upper)",url:"/images/maps/stella_montis_lower.webp",bounds:[[0,0],[1e3,1667]]},stella_montis_lower:{name:"Stella Montis (Lower)",url:"/images/maps/stella_montis_upper.webp",bounds:[[0,0],[1e3,1333]]}};let X={map:null,currentPin:null,currentMapId:"dam_battlegrounds",stellaLevel:"upper",selectedLocation:null};function Hw(){const n=document.getElementById("mapLocationDisplay"),e=document.getElementById("closeMapPickerBtn"),t=document.getElementById("confirmPinBtn"),r=document.getElementById("mapPickerModal");n&&(n.onclick=Vf,n.style.cursor="pointer"),e&&(e.onclick=Go),t&&(t.onclick=Qw),r&&(r.onclick=s=>{s.target===r&&Go(),!s.target.closest("#stellaDropdownMenu")&&!s.target.closest("#map-tab-stella")&&toggleStellaDropdown(!1)})}function Vf(){const n=document.getElementById("mapPickerModal");if(!n)return;n.classList.remove("hidden"),n.classList.add("flex");const e=document.getElementById("submitMapId");let t=e&&e.value?e.value:"dam_battlegrounds";t||(t="dam_battlegrounds");const r=ns[t]?t:"dam_battlegrounds";X.map?setTimeout(()=>{X.map.invalidateSize(),Ko(r)},100):setTimeout(()=>{Ww(),Ko(r)},50);const s=document.getElementById("confirmBtnText");s&&(X.selectedLocation?s.textContent="Confirm Location":s.textContent="Submit Map (No Pin)");const i=document.getElementById("confirmPinBtn");i&&(i.disabled=!1);const a=document.getElementById("removePinBtn");a&&(X.selectedLocation?a.classList.remove("hidden"):a.classList.add("hidden"),a.onclick=Of)}function Of(n){n&&n.stopPropagation(),X.currentPin&&(X.map.removeLayer(X.currentPin),X.currentPin=null),X.selectedLocation=null,document.getElementById("coordinatesDisplay").textContent="No location selected";const e=document.getElementById("confirmBtnText");e&&(e.textContent="Submit Map (No Pin)");const t=document.getElementById("removePinBtn");t&&t.classList.add("hidden");const r=document.getElementById("mapInstructions");r&&(r.style.opacity="1",r.textContent="Click or tap anywhere to place a pin")}function Go(){const n=document.getElementById("mapPickerModal");n&&(n.classList.add("hidden"),n.classList.remove("flex"))}function Ww(){if(typeof L>"u"){console.error("Leaflet not loaded");return}X.map=L.map("leafletMap",{crs:L.CRS.Simple,minZoom:-1,maxZoom:2,zoomSnap:0,zoomDelta:.1,wheelPxPerZoomLevel:120,zoomControl:!1,attributionControl:!1}),L.control.zoom({position:"bottomright"}).addTo(X.map),X.map.on("click",Kw),Gw()}function Gw(){const n=document.getElementById("mapTabsContainer");if(!n)return;let t=Object.entries(ns).filter(([s])=>!s.includes("stella")).map(([s,i])=>`
    <button onclick="loadMap('${s}')" 
      class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"
      id="map-tab-${s}">
      ${i.name}
    </button>
  `).join("");const r=X.stellaLevel||"upper";t+=`
    <div class="relative inline-block text-left" id="stellaDropdownContainer">
      <button onclick="toggleStellaDropdown()" 
        class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2"
        id="map-tab-stella">
        Stella Montis
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      
      <div id="stellaDropdownMenu" class="hidden absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-zinc-900 border border-zinc-700 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
        <div class="py-1">
          <button onclick="loadMap('stella_montis_upper'); toggleStellaDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${r==="upper"?"text-emerald-500 font-bold":""}">
            Upper Level
          </button>
          <button onclick="loadMap('stella_montis_lower'); toggleStellaDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${r==="lower"?"text-emerald-500 font-bold":""}">
            Lower Level
          </button>
        </div>
      </div>
    </div>
  `,n.innerHTML=t}window.toggleStellaDropdown=n=>{const e=document.getElementById("stellaDropdownMenu"),t=document.getElementById("map-tab-stella");if(!e||!t)return;if(n!==void 0?n:e.classList.contains("hidden")){const s=t.getBoundingClientRect();e.style.position="fixed",e.style.top=`${s.bottom+8}px`,e.style.left=`${s.left}px`,e.style.width=`${Math.max(s.width,160)}px`,e.style.zIndex="9999",e.classList.remove("hidden")}else e.classList.add("hidden")};function Ko(n){let e=n;const t=n.includes("stella");t||toggleStellaDropdown(!1),t&&(n==="stella_montis_upper"&&(X.stellaLevel="upper"),n==="stella_montis_lower"&&(X.stellaLevel="lower"),e=`stella_montis_${X.stellaLevel}`);const r=ns[e];if(!r)return;X.currentMapId=e,document.querySelectorAll("#mapTabsContainer > button").forEach(d=>{d.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"});const s=document.getElementById("map-tab-stella");if(t&&s)s.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 flex items-center gap-2";else if(!t){const d=document.getElementById(`map-tab-${e}`);d&&(d.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"),s&&(s.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2")}X.map.eachLayer(d=>{(d instanceof L.ImageOverlay||d instanceof L.Marker)&&X.map.removeLayer(d)});const i=document.getElementById("stellaLevelToggle");i&&i.remove(),X.currentPin=null,X.selectedLocation=null,document.getElementById("confirmPinBtn").disabled=!0,document.getElementById("coordinatesDisplay").textContent="No location selected";const a=r.bounds;L.imageOverlay(r.url,a,{className:"crt-map-image"}).addTo(X.map),X.map.fitBounds(a);const c=document.getElementById("mapInstructions");c&&(c.style.opacity="1"),document.querySelectorAll("#stellaDropdownMenu button").forEach(d=>{d.innerText.includes("Upper")&&X.stellaLevel==="upper"||d.innerText.includes("Lower")&&X.stellaLevel==="lower"?d.classList.add("text-emerald-500","font-bold"):(d.classList.remove("text-emerald-500","font-bold"),d.classList.add("text-zinc-300"))}),Of()}function Kw(n){const{lat:e,lng:t}=n.latlng,r=ns[X.currentMapId];if(!r)return;const[s,i]=r.bounds[1];if(e<0||e>s||t<0||t>i)return;X.currentPin&&X.map.removeLayer(X.currentPin);const a=L.divIcon({className:"custom-pin-icon",html:`
      <div class="relative">
        <svg class="w-[45px] h-[45px] text-emerald-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,iconSize:[45,45],iconAnchor:[22.5,45]});X.currentPin=L.marker([e,t],{icon:a}).addTo(X.map);const c=Math.round(t),u=Math.round(e);X.selectedLocation={x:c,y:u,mapId:X.currentMapId},document.getElementById("coordinatesDisplay").textContent=`X: ${c}, Y: ${u}`,document.getElementById("confirmPinBtn").disabled=!1;const d=document.getElementById("confirmBtnText");d&&(d.textContent="Submit Pinned Location");const f=document.getElementById("removePinBtn");f&&f.classList.remove("hidden");const p=document.getElementById("mapInstructions");p&&(p.style.opacity="0")}function Qw(){var p;const n=X.selectedLocation?X.selectedLocation.mapId:X.currentMapId,e=X.selectedLocation?X.selectedLocation.x:null,t=X.selectedLocation?X.selectedLocation.y:null,r=document.getElementById("submitMapId"),s=document.getElementById("submitMapX"),i=document.getElementById("submitMapY");r&&(r.value=n||""),s&&(s.value=e!==null?e:""),i&&(i.value=t!==null?t:"");let a=((p=ns[n])==null?void 0:p.name)||"Map";n==="stella_montis_upper"&&(a="Stella Upper"),n==="stella_montis_lower"&&(a="Stella Lower");const c=e!==null&&t!==null?`${a} (${e}, ${t})`:a,u=document.getElementById("mapDisplayValue");u&&(u.textContent=c,u.classList.remove("text-zinc-500"),u.classList.add("text-white","font-medium"));const d=document.getElementById("clearMapBtn");d&&d.classList.remove("hidden");const f=document.getElementById("mapLocationDisplay");f&&(f.classList.add("border-emerald-500","bg-emerald-500/10"),setTimeout(()=>f.classList.remove("bg-emerald-500/10"),500)),Go()}window.clearMapSelection=n=>{n&&n.stopPropagation();const e=document.getElementById("submitMapId"),t=document.getElementById("submitMapX"),r=document.getElementById("submitMapY");e&&(e.value=""),t&&(t.value=""),r&&(r.value="");const s=document.getElementById("mapDisplayValue");s&&(s.textContent="Select Map Location...",s.classList.add("text-zinc-500"),s.classList.remove("text-white","font-medium"));const i=document.getElementById("clearMapBtn");i&&i.classList.add("hidden");const a=document.getElementById("mapLocationDisplay");a&&a.classList.remove("border-emerald-500")};window.loadMap=Ko;window.openMapPicker=Vf;const Nu="arc_dataGridSize_v1";function Qo(n){document.getElementById("gridSizeLabelKey"),document.querySelectorAll(".filter-options h3").forEach(t=>{(t.textContent.includes("Grid Size")||t.textContent.includes("List Size"))&&(t.textContent=n==="data"?"List Size":"Grid Size")})}function Xw(){const n={small:document.getElementById("btnGridSmall"),medium:document.getElementById("btnGridMedium"),large:document.getElementById("btnGridLarge")};try{const c=localStorage.getItem(Nu);c&&(m.dataGridSize=c)}catch(c){console.debug("Failed to load data grid size",c)}const e="gridSizePreference";let t=localStorage.getItem(e)||"M";function r(c){const u=window.innerWidth<=768;let d=150;u?c==="S"?d=90:c==="M"?d=120:c==="L"&&(d=140):c==="S"?d=110:c==="M"?d=150:c==="L"&&(d=220),document.documentElement.style.setProperty("--cardSize",d+"px");try{localStorage.setItem(e,c)}catch{}t=c,m.blueprintGridSize=c,i(),typeof Ho=="function"&&Ho()}function s(c){m.dataGridSize=c;try{localStorage.setItem(Nu,c)}catch{}i(),typeof bt=="function"&&bt()}function i(){Object.values(n).forEach(u=>{u&&(u.classList.remove("bg-emerald-600","text-white","font-bold"),u.classList.remove("bg-zinc-600","text-white","border-zinc-500"),u.classList.add("bg-zinc-800","text-zinc-400","border-transparent"))});let c=null;if(m.currentTab==="data"){const u=m.dataGridSize||"medium";c=n[u]}else{const u=m.blueprintGridSize||t||"M";u==="S"?c=n.small:u==="M"?c=n.medium:u==="L"&&(c=n.large)}c&&(c.classList.remove("bg-zinc-800","text-zinc-400","border-transparent"),c.classList.add("bg-zinc-600","text-white","border-zinc-500"))}const a=c=>{m.currentTab==="data"?s(c):r({small:"S",medium:"M",large:"L"}[c])};n.small&&(n.small.onclick=()=>a("small")),n.medium&&(n.medium.onclick=()=>a("medium")),n.large&&(n.large.onclick=()=>a("large")),r(t),window.updateGridVisuals=i,m.dataGridSize||(m.dataGridSize="medium")}document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{Xw(),[document.getElementById("tabBlueprints"),document.getElementById("tabData"),document.getElementById("tabProgression")].forEach(e=>{e&&e.addEventListener("click",()=>{setTimeout(()=>{typeof window.updateGridVisuals=="function"&&window.updateGridVisuals()},50)})})},150)});
