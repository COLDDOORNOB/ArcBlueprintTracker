(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function Bf(n,e){n.indexOf(e)===-1&&n.push(e)}const yu=(n,e,t)=>Math.min(Math.max(t,n),e),qe={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},Dr=n=>typeof n=="number",Rn=n=>Array.isArray(n)&&!Dr(n[0]),Ff=(n,e,t)=>{const r=e-n;return((t-n)%r+r)%r+n};function Uf(n,e){return Rn(n)?n[Ff(0,n.length,e)]:n}const _u=(n,e,t)=>-t*n+t*e+n,Eu=()=>{},xt=n=>n,Bo=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function Iu(n,e){const t=n[n.length-1];for(let r=1;r<=e;r++){const s=Bo(0,e,r);n.push(_u(t,1,s))}}function $f(n){const e=[0];return Iu(e,n-1),e}function qf(n,e=$f(n.length),t=xt){const r=n.length,s=r-e.length;return s>0&&Iu(e,s),i=>{let a=0;for(;a<r-2&&!(i<e[a+1]);a++);let l=yu(0,1,Bo(e[a],e[a+1],i));return l=Uf(t,a)(l),_u(n[a],n[a+1],l)}}const wu=n=>Array.isArray(n)&&Dr(n[0]),so=n=>typeof n=="object"&&!!n.createAnimation,Ln=n=>typeof n=="function",jf=n=>typeof n=="string",Tr={ms:n=>n*1e3,s:n=>n/1e3},vu=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,zf=1e-7,Wf=12;function Hf(n,e,t,r,s){let i,a,l=0;do a=e+(t-e)/2,i=vu(a,r,s)-n,i>0?t=a:e=a;while(Math.abs(i)>zf&&++l<Wf);return a}function yr(n,e,t,r){if(n===e&&t===r)return xt;const s=i=>Hf(i,0,1,n,t);return i=>i===0||i===1?i:vu(s(i),e,r)}const Gf=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const r=t*n,s=e==="end"?Math.floor(r):Math.ceil(r);return yu(0,1,s/n)},Kf={ease:yr(.25,.1,.25,1),"ease-in":yr(.42,0,1,1),"ease-in-out":yr(.42,0,.58,1),"ease-out":yr(0,0,.58,1)},Qf=/\((.*?)\)/;function io(n){if(Ln(n))return n;if(wu(n))return yr(...n);const e=Kf[n];if(e)return e;if(n.startsWith("steps")){const t=Qf.exec(n);if(t){const r=t[1].split(",");return Gf(parseFloat(r[0]),r[1].trim())}}return xt}class Tu{constructor(e,t=[0,1],{easing:r,duration:s=qe.duration,delay:i=qe.delay,endDelay:a=qe.endDelay,repeat:l=qe.repeat,offset:u,direction:d="normal",autoplay:f=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=xt,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((E,v)=>{this.resolve=E,this.reject=v}),r=r||qe.easing,so(r)){const E=r.createAnimation(t);r=E.easing,t=E.keyframes||t,s=E.duration||s}this.repeat=l,this.easing=Rn(r)?xt:io(r),this.updateDuration(s);const p=qf(t,u,Rn(r)?r.map(io):xt);this.tick=E=>{var v;i=i;let S=0;this.pauseTime!==void 0?S=this.pauseTime:S=(E-this.startTime)*this.rate,this.t=S,S/=1e3,S=Math.max(S-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(S=this.totalDuration);const R=S/this.duration;let P=Math.floor(R),D=R%1;!D&&R>=1&&(D=1),D===1&&P--;const M=P%2;(d==="reverse"||d==="alternate"&&M||d==="alternate-reverse"&&!M)&&(D=1-D);const x=S>=this.totalDuration?1:Math.min(D,1),F=p(this.easing(x));e(F),this.pauseTime===void 0&&(this.playState==="finished"||S>=this.totalDuration+a)?(this.playState="finished",(v=this.resolve)===null||v===void 0||v.call(this,F)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},f&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Xf{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const qi=new WeakMap;function Au(n){return qi.has(n)||qi.set(n,{transforms:[],values:new Map}),qi.get(n)}function Yf(n,e){return n.has(e)||n.set(e,new Xf),n.get(e)}const Jf=["","X","Y","Z"],Zf=["translate","scale","rotate","skew"],Ls={x:"translateX",y:"translateY",z:"translateZ"},Dc={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},em={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:Dc,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:xt},skew:Dc},Lr=new Map,Fo=n=>`--motion-${n}`,Ms=["x","y","z"];Zf.forEach(n=>{Jf.forEach(e=>{Ms.push(n+e),Lr.set(Fo(n+e),em[n])})});const tm=(n,e)=>Ms.indexOf(n)-Ms.indexOf(e),nm=new Set(Ms),bu=n=>nm.has(n),rm=(n,e)=>{Ls[e]&&(e=Ls[e]);const{transforms:t}=Au(n);Bf(t,e),n.style.transform=sm(t)},sm=n=>n.sort(tm).reduce(im,"").trim(),im=(n,e)=>`${n} ${e}(var(${Fo(e)}))`,oo=n=>n.startsWith("--"),Lc=new Set;function om(n){if(!Lc.has(n)){Lc.add(n);try{const{syntax:e,initialValue:t}=Lr.has(n)?Lr.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const ji=(n,e)=>document.createElement("div").animate(n,e),Mc={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{ji({opacity:[1]})}catch{return!1}return!0},finished:()=>!!ji({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{ji({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},zi={},Sn={};for(const n in Mc)Sn[n]=()=>(zi[n]===void 0&&(zi[n]=Mc[n]()),zi[n]);const am=.015,cm=(n,e)=>{let t="";const r=Math.round(e/am);for(let s=0;s<r;s++)t+=n(Bo(0,r-1,s))+", ";return t.substring(0,t.length-2)},xc=(n,e)=>Ln(n)?Sn.linearEasing()?`linear(${cm(n,e)})`:qe.easing:wu(n)?lm(n):n,lm=([n,e,t,r])=>`cubic-bezier(${n}, ${e}, ${t}, ${r})`;function um(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const hm=n=>Array.isArray(n)?n:[n];function ao(n){return Ls[n]&&(n=Ls[n]),bu(n)?Fo(n):n}const ms={get:(n,e)=>{e=ao(e);let t=oo(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const r=Lr.get(e);r&&(t=r.initialValue)}return t},set:(n,e,t)=>{e=ao(e),oo(e)?n.style.setProperty(e,t):n.style[e]=t}};function Cu(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function dm(n,e){var t;let r=(e==null?void 0:e.toDefaultUnit)||xt;const s=n[n.length-1];if(jf(s)){const i=((t=s.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(r=a=>a+i)}return r}function fm(){return window.__MOTION_DEV_TOOLS_RECORD}function mm(n,e,t,r={},s){const i=fm(),a=r.record!==!1&&i;let l,{duration:u=qe.duration,delay:d=qe.delay,endDelay:f=qe.endDelay,repeat:p=qe.repeat,easing:E=qe.easing,persist:v=!1,direction:S,offset:R,allowWebkitAcceleration:P=!1,autoplay:D=!0}=r;const M=Au(n),x=bu(e);let F=Sn.waapi();x&&rm(n,e);const L=ao(e),O=Yf(M.values,L),_=Lr.get(L);return Cu(O.animation,!(so(E)&&O.generator)&&r.record!==!1),()=>{const g=()=>{var w,b;return(b=(w=ms.get(n,L))!==null&&w!==void 0?w:_==null?void 0:_.initialValue)!==null&&b!==void 0?b:0};let y=um(hm(t),g);const T=dm(y,_);if(so(E)){const w=E.createAnimation(y,e!=="opacity",g,L,O);E=w.easing,y=w.keyframes||y,u=w.duration||u}if(oo(L)&&(Sn.cssRegisterProperty()?om(L):F=!1),x&&!Sn.linearEasing()&&(Ln(E)||Rn(E)&&E.some(Ln))&&(F=!1),F){_&&(y=y.map(I=>Dr(I)?_.toDefaultUnit(I):I)),y.length===1&&(!Sn.partialKeyframes()||a)&&y.unshift(g());const w={delay:Tr.ms(d),duration:Tr.ms(u),endDelay:Tr.ms(f),easing:Rn(E)?void 0:xc(E,u),direction:S,iterations:p+1,fill:"both"};l=n.animate({[L]:y,offset:R,easing:Rn(E)?E.map(I=>xc(I,u)):void 0},w),l.finished||(l.finished=new Promise((I,he)=>{l.onfinish=I,l.oncancel=he}));const b=y[y.length-1];l.finished.then(()=>{v||(ms.set(n,L,b),l.cancel())}).catch(Eu),P||(l.playbackRate=1.000001)}else if(s&&x)y=y.map(w=>typeof w=="string"?parseFloat(w):w),y.length===1&&y.unshift(parseFloat(g())),l=new s(w=>{ms.set(n,L,T?T(w):w)},y,Object.assign(Object.assign({},r),{duration:u,easing:E}));else{const w=y[y.length-1];ms.set(n,L,_&&Dr(w)?_.toDefaultUnit(w):w)}return a&&i(n,e,y,{duration:u,delay:d,easing:E,repeat:p,offset:R},"motion-one"),O.setAnimation(l),l&&!D&&l.pause(),l}}const pm=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function gm(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const ym=n=>n(),Su=(n,e,t=qe.duration)=>new Proxy({animations:n.map(ym).filter(Boolean),duration:t,options:e},Em),_m=n=>n.animations[0],Em={get:(n,e)=>{const t=_m(n);switch(e){case"duration":return n.duration;case"currentTime":return Tr.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(Im)).catch(Eu)),n.finished;case"stop":return()=>{n.animations.forEach(r=>Cu(r))};case"forEachNative":return r=>{n.animations.forEach(s=>r(s,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(r=>r[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=Tr.ms(t);case"playbackRate":for(let r=0;r<n.animations.length;r++)n.animations[r][e]=t;return!0}return!1}},Im=n=>n.finished;function wm(n=.1,{start:e=0,from:t=0,easing:r}={}){return(s,i)=>{const a=Dr(t)?t:vm(t,i),l=Math.abs(a-s);let u=n*l;if(r){const d=i*n;u=io(r)(u/d)*d}return e+u}}function vm(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function Tm(n,e,t){return Ln(n)?n(e,t):n}function Am(n){return function(t,r,s={}){t=gm(t);const i=t.length,a=[];for(let l=0;l<i;l++){const u=t[l];for(const d in r){const f=pm(s,d);f.delay=Tm(f.delay,l,i);const p=mm(u,d,r[d],f,n);a.push(p)}}return Su(a,s,s.duration)}}const bm=Am(Tu);function Cm(n,e={}){return Su([()=>{const t=new Tu(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function Wi(n,e,t){return(Ln(n)?Cm:bm)(n,e,t)}const Sm=()=>{};var Oc={};/**
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
 */const Ru=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Rm=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Pu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|l>>4;let E=(l&15)<<2|d>>6,v=d&63;u||(v=64,a||(E=64)),r.push(t[f],t[p],t[E],t[v])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ru(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Rm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||p==null)throw new Pm;const E=i<<2|l>>4;if(r.push(E),d!==64){const v=l<<4&240|d>>2;if(r.push(v),p!==64){const S=d<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Pm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const km=function(n){const e=Ru(n);return Pu.encodeByteArray(e,!0)},xs=function(n){return km(n).replace(/\./g,"")},ku=function(n){try{return Pu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Nm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Vm=()=>Nm().__FIREBASE_DEFAULTS__,Dm=()=>{if(typeof process>"u"||typeof Oc>"u")return;const n=Oc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Lm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ku(n[1]);return e&&JSON.parse(e)},ri=()=>{try{return Sm()||Vm()||Dm()||Lm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nu=n=>{var e,t;return(t=(e=ri())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Mm=n=>{const e=Nu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Vu=()=>{var n;return(n=ri())==null?void 0:n.config},Du=n=>{var e;return(e=ri())==null?void 0:e[`_${n}`]};/**
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
 */class xm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function jn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Lu(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Om(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[xs(JSON.stringify(t)),xs(JSON.stringify(a)),""].join(".")}const Ar={};function Bm(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ar))Ar[e]?n.emulator.push(e):n.prod.push(e);return n}function Fm(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Bc=!1;function Mu(n,e){if(typeof window>"u"||typeof document>"u"||!jn(window.location.host)||Ar[n]===e||Ar[n]||Bc)return;Ar[n]=e;function t(E){return`__firebase__banner__${E}`}const r="__firebase__banner",i=Bm().prod.length>0;function a(){const E=document.getElementById(r);E&&E.remove()}function l(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function u(E,v){E.setAttribute("width","24"),E.setAttribute("id",v),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function d(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Bc=!0,a()},E}function f(E,v){E.setAttribute("id",v),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function p(){const E=Fm(r),v=t("text"),S=document.getElementById(v)||document.createElement("span"),R=t("learnmore"),P=document.getElementById(R)||document.createElement("a"),D=t("preprendIcon"),M=document.getElementById(D)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const x=E.element;l(x),f(P,R);const F=d();u(M,D),x.append(M,S,P,F),document.body.appendChild(x)}i?(S.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function ke(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Um(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ke())}function $m(){var e;const n=(e=ri())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function qm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function jm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function zm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Wm(){const n=ke();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Hm(){return!$m()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gm(){try{return typeof indexedDB=="object"}catch{return!1}}function Km(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const Qm="FirebaseError";class It extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Qm,Object.setPrototypeOf(this,It.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jr.prototype.create)}}class jr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Xm(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new It(s,l,r)}}function Xm(n,e){return n.replace(Ym,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ym=/\{\$([^}]+)}/g;function Jm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ln(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Fc(i)&&Fc(a)){if(!ln(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Fc(n){return n!==null&&typeof n=="object"}/**
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
 */function zr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Zm(n,e){const t=new ep(n,e);return t.subscribe.bind(t)}class ep{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");tp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Hi),s.error===void 0&&(s.error=Hi),s.complete===void 0&&(s.complete=Hi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Hi(){}/**
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
 */function xe(n){return n&&n._delegate?n._delegate:n}class un{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const tn="[DEFAULT]";/**
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
 */class np{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new xm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(sp(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:rp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function rp(n){return n===tn?void 0:n}function sp(n){return n.instantiationMode==="EAGER"}/**
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
 */class ip{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new np(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Q||(Q={}));const op={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},ap=Q.INFO,cp={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},lp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=cp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Uo{constructor(e){this.name=e,this._logLevel=ap,this._logHandler=lp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?op[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}const up=(n,e)=>e.some(t=>n instanceof t);let Uc,$c;function hp(){return Uc||(Uc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function dp(){return $c||($c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const xu=new WeakMap,co=new WeakMap,Ou=new WeakMap,Gi=new WeakMap,$o=new WeakMap;function fp(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Ot(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&xu.set(t,n)}).catch(()=>{}),$o.set(e,n),e}function mp(n){if(co.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});co.set(n,e)}let lo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return co.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ou.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function pp(n){lo=n(lo)}function gp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Ki(this),e,...t);return Ou.set(r,e.sort?e.sort():[e]),Ot(r)}:dp().includes(n)?function(...e){return n.apply(Ki(this),e),Ot(xu.get(this))}:function(...e){return Ot(n.apply(Ki(this),e))}}function yp(n){return typeof n=="function"?gp(n):(n instanceof IDBTransaction&&mp(n),up(n,hp())?new Proxy(n,lo):n)}function Ot(n){if(n instanceof IDBRequest)return fp(n);if(Gi.has(n))return Gi.get(n);const e=yp(n);return e!==n&&(Gi.set(n,e),$o.set(e,n)),e}const Ki=n=>$o.get(n);function _p(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=Ot(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Ot(a.result),u.oldVersion,u.newVersion,Ot(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Ep=["get","getKey","getAll","getAllKeys","count"],Ip=["put","add","delete","clear"],Qi=new Map;function qc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qi.get(e))return Qi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Ip.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ep.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return Qi.set(e,i),i}pp(n=>({...n,get:(e,t,r)=>qc(e,t)||n.get(e,t,r),has:(e,t)=>!!qc(e,t)||n.has(e,t)}));/**
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
 */class wp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(vp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function vp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const uo="@firebase/app",jc="0.14.6";/**
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
 */const gt=new Uo("@firebase/app"),Tp="@firebase/app-compat",Ap="@firebase/analytics-compat",bp="@firebase/analytics",Cp="@firebase/app-check-compat",Sp="@firebase/app-check",Rp="@firebase/auth",Pp="@firebase/auth-compat",kp="@firebase/database",Np="@firebase/data-connect",Vp="@firebase/database-compat",Dp="@firebase/functions",Lp="@firebase/functions-compat",Mp="@firebase/installations",xp="@firebase/installations-compat",Op="@firebase/messaging",Bp="@firebase/messaging-compat",Fp="@firebase/performance",Up="@firebase/performance-compat",$p="@firebase/remote-config",qp="@firebase/remote-config-compat",jp="@firebase/storage",zp="@firebase/storage-compat",Wp="@firebase/firestore",Hp="@firebase/ai",Gp="@firebase/firestore-compat",Kp="firebase",Qp="12.6.0";/**
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
 */const ho="[DEFAULT]",Xp={[uo]:"fire-core",[Tp]:"fire-core-compat",[bp]:"fire-analytics",[Ap]:"fire-analytics-compat",[Sp]:"fire-app-check",[Cp]:"fire-app-check-compat",[Rp]:"fire-auth",[Pp]:"fire-auth-compat",[kp]:"fire-rtdb",[Np]:"fire-data-connect",[Vp]:"fire-rtdb-compat",[Dp]:"fire-fn",[Lp]:"fire-fn-compat",[Mp]:"fire-iid",[xp]:"fire-iid-compat",[Op]:"fire-fcm",[Bp]:"fire-fcm-compat",[Fp]:"fire-perf",[Up]:"fire-perf-compat",[$p]:"fire-rc",[qp]:"fire-rc-compat",[jp]:"fire-gcs",[zp]:"fire-gcs-compat",[Wp]:"fire-fst",[Gp]:"fire-fst-compat",[Hp]:"fire-vertex","fire-js":"fire-js",[Kp]:"fire-js-all"};/**
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
 */const Os=new Map,Yp=new Map,fo=new Map;function zc(n,e){try{n.container.addComponent(e)}catch(t){gt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Mn(n){const e=n.name;if(fo.has(e))return gt.debug(`There were multiple attempts to register component ${e}.`),!1;fo.set(e,n);for(const t of Os.values())zc(t,n);for(const t of Yp.values())zc(t,n);return!0}function qo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function We(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Jp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Bt=new jr("app","Firebase",Jp);/**
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
 */class Zp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new un("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Bt.create("app-deleted",{appName:this._name})}}/**
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
 */const zn=Qp;function Bu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ho,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Bt.create("bad-app-name",{appName:String(s)});if(t||(t=Vu()),!t)throw Bt.create("no-options");const i=Os.get(s);if(i){if(ln(t,i.options)&&ln(r,i.config))return i;throw Bt.create("duplicate-app",{appName:s})}const a=new ip(s);for(const u of fo.values())a.addComponent(u);const l=new Zp(t,r,a);return Os.set(s,l),l}function Fu(n=ho){const e=Os.get(n);if(!e&&n===ho&&Vu())return Bu();if(!e)throw Bt.create("no-app",{appName:n});return e}function Ft(n,e,t){let r=Xp[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),gt.warn(a.join(" "));return}Mn(new un(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const eg="firebase-heartbeat-database",tg=1,Mr="firebase-heartbeat-store";let Xi=null;function Uu(){return Xi||(Xi=_p(eg,tg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Mr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Bt.create("idb-open",{originalErrorMessage:n.message})})),Xi}async function ng(n){try{const t=(await Uu()).transaction(Mr),r=await t.objectStore(Mr).get($u(n));return await t.done,r}catch(e){if(e instanceof It)gt.warn(e.message);else{const t=Bt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});gt.warn(t.message)}}}async function Wc(n,e){try{const r=(await Uu()).transaction(Mr,"readwrite");await r.objectStore(Mr).put(e,$u(n)),await r.done}catch(t){if(t instanceof It)gt.warn(t.message);else{const r=Bt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});gt.warn(r.message)}}}function $u(n){return`${n.name}!${n.options.appId}`}/**
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
 */const rg=1024,sg=30;class ig{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ag(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Hc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>sg){const a=cg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){gt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Hc(),{heartbeatsToSend:r,unsentEntries:s}=og(this._heartbeatsCache.heartbeats),i=xs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return gt.warn(t),""}}}function Hc(){return new Date().toISOString().substring(0,10)}function og(n,e=rg){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Gc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Gc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ag{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Gm()?Km().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ng(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Wc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Wc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Gc(n){return xs(JSON.stringify({version:2,heartbeats:n})).length}function cg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function lg(n){Mn(new un("platform-logger",e=>new wp(e),"PRIVATE")),Mn(new un("heartbeat",e=>new ig(e),"PRIVATE")),Ft(uo,jc,n),Ft(uo,jc,"esm2020"),Ft("fire-js","")}lg("");var ug="firebase",hg="12.7.0";/**
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
 */Ft(ug,hg,"app");function qu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dg=qu,ju=new jr("auth","Firebase",qu());/**
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
 */const Bs=new Uo("@firebase/auth");function fg(n,...e){Bs.logLevel<=Q.WARN&&Bs.warn(`Auth (${zn}): ${n}`,...e)}function vs(n,...e){Bs.logLevel<=Q.ERROR&&Bs.error(`Auth (${zn}): ${n}`,...e)}/**
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
 */function lt(n,...e){throw zo(n,...e)}function Qe(n,...e){return zo(n,...e)}function jo(n,e,t){const r={...dg(),[e]:t};return new jr("auth","Firebase",r).create(e,{appName:n.name})}function an(n){return jo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function mg(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&lt(n,"argument-error"),jo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function zo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ju.create(n,...e)}function W(n,e,...t){if(!n)throw zo(e,...t)}function ft(n){const e="INTERNAL ASSERTION FAILED: "+n;throw vs(e),new Error(e)}function yt(n,e){n||ft(e)}/**
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
 */function mo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function pg(){return Kc()==="http:"||Kc()==="https:"}function Kc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function gg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pg()||jm()||"connection"in navigator)?navigator.onLine:!0}function yg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Wr{constructor(e,t){this.shortDelay=e,this.longDelay=t,yt(t>e,"Short delay should be less than long delay!"),this.isMobile=Um()||zm()}get(){return gg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wo(n,e){yt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class zu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ft("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ft("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ft("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const _g={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Eg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ig=new Wr(3e4,6e4);function Ho(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Wn(n,e,t,r,s={}){return Wu(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=zr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return qm()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&jn(n.emulatorConfig.host)&&(d.credentials="include"),zu.fetch()(await Hu(n,n.config.apiHost,t,l),d)})}async function Wu(n,e,t){n._canInitEmulator=!1;const r={..._g,...e};try{const s=new vg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ps(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ps(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ps(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ps(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw jo(n,f,d);lt(n,f)}}catch(s){if(s instanceof It)throw s;lt(n,"network-request-failed",{message:String(s)})}}async function wg(n,e,t,r,s={}){const i=await Wn(n,e,t,r,s);return"mfaPendingCredential"in i&&lt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Hu(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Wo(n.config,s):`${n.config.apiScheme}://${s}`;return Eg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class vg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Qe(this.auth,"network-request-failed")),Ig.get())})}}function ps(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Qe(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function Tg(n,e){return Wn(n,"POST","/v1/accounts:delete",e)}async function Fs(n,e){return Wn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function br(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ag(n,e=!1){const t=xe(n),r=await t.getIdToken(e),s=Go(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:br(Yi(s.auth_time)),issuedAtTime:br(Yi(s.iat)),expirationTime:br(Yi(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Yi(n){return Number(n)*1e3}function Go(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return vs("JWT malformed, contained fewer than 3 sections"),null;try{const s=ku(t);return s?JSON.parse(s):(vs("Failed to decode base64 JWT payload"),null)}catch(s){return vs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Qc(n){const e=Go(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function xr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof It&&bg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function bg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Cg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class po{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=br(this.lastLoginAt),this.creationTime=br(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Us(n){var p;const e=n.auth,t=await n.getIdToken(),r=await xr(n,Fs(e,{idToken:t}));W(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?Gu(s.providerUserInfo):[],a=Rg(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new po(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function Sg(n){const e=xe(n);await Us(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Rg(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Gu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Pg(n,e){const t=await Wu(n,{},async()=>{const r=zr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Hu(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&jn(n.emulatorConfig.host)&&(u.credentials="include"),zu.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kg(n,e){return Wn(n,"POST","/v2/accounts:revokeToken",Ho(n,e))}/**
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
 */class Pn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=Qc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Pg(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new Pn;return r&&(W(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Pn,this.toJSON())}_performRefresh(){return ft("not implemented")}}/**
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
 */function Pt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class He{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Cg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new po(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await xr(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ag(this,e)}reload(){return Sg(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new He({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Us(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(We(this.auth.app))return Promise.reject(an(this.auth));const e=await this.getIdToken();return await xr(this,Tg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:E,isAnonymous:v,providerData:S,stsTokenManager:R}=t;W(p&&R,e,"internal-error");const P=Pn.fromJSON(this.name,R);W(typeof p=="string",e,"internal-error"),Pt(r,e.name),Pt(s,e.name),W(typeof E=="boolean",e,"internal-error"),W(typeof v=="boolean",e,"internal-error"),Pt(i,e.name),Pt(a,e.name),Pt(l,e.name),Pt(u,e.name),Pt(d,e.name),Pt(f,e.name);const D=new He({uid:p,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:v,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:P,createdAt:d,lastLoginAt:f});return S&&Array.isArray(S)&&(D.providerData=S.map(M=>({...M}))),u&&(D._redirectEventId=u),D}static async _fromIdTokenResponse(e,t,r=!1){const s=new Pn;s.updateFromServerResponse(t);const i=new He({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Us(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Gu(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Pn;l.updateFromIdToken(r);const u=new He({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new po(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
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
 */const Xc=new Map;function mt(n){yt(n instanceof Function,"Expected a class definition");let e=Xc.get(n);return e?(yt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Xc.set(n,e),e)}/**
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
 */class Ku{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ku.type="NONE";const Yc=Ku;/**
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
 */function Ts(n,e,t){return`firebase:${n}:${e}:${t}`}class kn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ts(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ts("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Fs(this.auth,{idToken:e}).catch(()=>{});return t?He._fromGetAccountInfoResponse(this.auth,t,e):null}return He._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new kn(mt(Yc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||mt(Yc);const a=Ts(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const f=await d._get(a);if(f){let p;if(typeof f=="string"){const E=await Fs(e,{idToken:f}).catch(()=>{});if(!E)break;p=await He._fromGetAccountInfoResponse(e,E,f)}else p=He._fromJSON(e,f);d!==i&&(l=p),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new kn(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new kn(i,e,r))}}/**
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
 */function Jc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ju(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Qu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(eh(e))return"Blackberry";if(th(e))return"Webos";if(Xu(e))return"Safari";if((e.includes("chrome/")||Yu(e))&&!e.includes("edge/"))return"Chrome";if(Zu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Qu(n=ke()){return/firefox\//i.test(n)}function Xu(n=ke()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Yu(n=ke()){return/crios\//i.test(n)}function Ju(n=ke()){return/iemobile/i.test(n)}function Zu(n=ke()){return/android/i.test(n)}function eh(n=ke()){return/blackberry/i.test(n)}function th(n=ke()){return/webos/i.test(n)}function Ko(n=ke()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ng(n=ke()){var e;return Ko(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Vg(){return Wm()&&document.documentMode===10}function nh(n=ke()){return Ko(n)||Zu(n)||th(n)||eh(n)||/windows phone/i.test(n)||Ju(n)}/**
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
 */function rh(n,e=[]){let t;switch(n){case"Browser":t=Jc(ke());break;case"Worker":t=`${Jc(ke())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${zn}/${r}`}/**
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
 */class Dg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Lg(n,e={}){return Wn(n,"GET","/v2/passwordPolicy",Ho(n,e))}/**
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
 */const Mg=6;class xg{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Mg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Og{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Zc(this),this.idTokenSubscription=new Zc(this),this.beforeStateQueue=new Dg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ju,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=mt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await kn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Fs(this,{idToken:e}),r=await He._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(We(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Us(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(We(this.app))return Promise.reject(an(this));const t=e?xe(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return We(this.app)?Promise.reject(an(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return We(this.app)?Promise.reject(an(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(mt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Lg(this),t=new xg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await kg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&mt(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await kn.create(this,[mt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(We(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&fg(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function si(n){return xe(n)}class Zc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zm(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Qo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Bg(n){Qo=n}function Fg(n){return Qo.loadJS(n)}function Ug(){return Qo.gapiScript}function $g(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function qg(n,e){const t=qo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ln(i,e??{}))return s;lt(s,"already-initialized")}return t.initialize({options:e})}function jg(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(mt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function zg(n,e,t){const r=si(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=sh(e),{host:a,port:l}=Wg(e),u=l===null?"":`:${l}`,d={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(ln(d,r.config.emulator)&&ln(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,jn(a)?(Lu(`${i}//${a}${u}`),Mu("Auth",!0)):Hg()}function sh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Wg(n){const e=sh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:el(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:el(a)}}}function el(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Hg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class ih{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ft("not implemented")}_getIdTokenResponse(e){return ft("not implemented")}_linkToIdToken(e,t){return ft("not implemented")}_getReauthenticationResolver(e){return ft("not implemented")}}/**
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
 */async function Nn(n,e){return wg(n,"POST","/v1/accounts:signInWithIdp",Ho(n,e))}/**
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
 */const Gg="http://localhost";class hn extends ih{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):lt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new hn(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Nn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Nn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Nn(e,t)}buildRequest(){const e={requestUri:Gg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=zr(t)}return e}}/**
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
 */class Xo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Hr extends Xo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Nt extends Hr{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Nt.PROVIDER_ID="facebook.com";/**
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
 */class dt extends Hr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return dt.credentialFromTaggedObject(e)}static credentialFromError(e){return dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return dt.credential(t,r)}catch{return null}}}dt.GOOGLE_SIGN_IN_METHOD="google.com";dt.PROVIDER_ID="google.com";/**
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
 */class Vt extends Hr{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.GITHUB_SIGN_IN_METHOD="github.com";Vt.PROVIDER_ID="github.com";/**
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
 */class Dt extends Hr{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
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
 */class xn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await He._fromIdTokenResponse(e,r,s),a=tl(r);return new xn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=tl(r);return new xn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function tl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class $s extends It{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,$s.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new $s(e,t,r,s)}}function oh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$s._fromErrorAndOperation(n,i,e,r):i})}async function Kg(n,e,t=!1){const r=await xr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xn._forOperation(n,"link",r)}/**
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
 */async function Qg(n,e,t=!1){const{auth:r}=n;if(We(r.app))return Promise.reject(an(r));const s="reauthenticate";try{const i=await xr(n,oh(r,s,e,n),t);W(i.idToken,r,"internal-error");const a=Go(i.idToken);W(a,r,"internal-error");const{sub:l}=a;return W(n.uid===l,r,"user-mismatch"),xn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&lt(r,"user-mismatch"),i}}/**
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
 */async function Xg(n,e,t=!1){if(We(n.app))return Promise.reject(an(n));const r="signIn",s=await oh(n,r,e),i=await xn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function ah(n,e){return xe(n).setPersistence(e)}function Yg(n,e,t,r){return xe(n).onIdTokenChanged(e,t,r)}function Jg(n,e,t){return xe(n).beforeAuthStateChanged(e,t)}function Zg(n,e,t,r){return xe(n).onAuthStateChanged(e,t,r)}function ey(n){return xe(n).signOut()}const qs="__sak";/**
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
 */class ch{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(qs,"1"),this.storage.removeItem(qs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const ty=1e3,ny=10;class lh extends ch{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Vg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ny):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ty)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}lh.type="LOCAL";const Yo=lh;/**
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
 */class uh extends ch{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}uh.type="SESSION";const hh=uh;/**
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
 */function ry(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ii{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ii(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await ry(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ii.receivers=[];/**
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
 */function Jo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class sy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Jo("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const E=p;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(E.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function rt(){return window}function iy(n){rt().location.href=n}/**
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
 */function dh(){return typeof rt().WorkerGlobalScope<"u"&&typeof rt().importScripts=="function"}async function oy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ay(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function cy(){return dh()?self:null}/**
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
 */const fh="firebaseLocalStorageDb",ly=1,js="firebaseLocalStorage",mh="fbase_key";class Gr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function oi(n,e){return n.transaction([js],e?"readwrite":"readonly").objectStore(js)}function uy(){const n=indexedDB.deleteDatabase(fh);return new Gr(n).toPromise()}function go(){const n=indexedDB.open(fh,ly);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(js,{keyPath:mh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(js)?e(r):(r.close(),await uy(),e(await go()))})})}async function nl(n,e,t){const r=oi(n,!0).put({[mh]:e,value:t});return new Gr(r).toPromise()}async function hy(n,e){const t=oi(n,!1).get(e),r=await new Gr(t).toPromise();return r===void 0?null:r.value}function rl(n,e){const t=oi(n,!0).delete(e);return new Gr(t).toPromise()}const dy=800,fy=3;class ph{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await go(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>fy)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return dh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ii._getInstance(cy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await oy(),!this.activeServiceWorker)return;this.sender=new sy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ay()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await go();return await nl(e,qs,"1"),await rl(e,qs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>nl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>hy(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>rl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=oi(s,!1).getAll();return new Gr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ph.type="LOCAL";const my=ph;new Wr(3e4,6e4);/**
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
 */function gh(n,e){return e?mt(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Zo extends ih{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Nn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Nn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Nn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function py(n){return Xg(n.auth,new Zo(n),n.bypassAuthState)}function gy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Qg(t,new Zo(n),n.bypassAuthState)}async function yy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Kg(t,new Zo(n),n.bypassAuthState)}/**
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
 */class yh{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return py;case"linkViaPopup":case"linkViaRedirect":return yy;case"reauthViaPopup":case"reauthViaRedirect":return gy;default:lt(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const _y=new Wr(2e3,1e4);async function Ey(n,e,t){if(We(n.app))return Promise.reject(Qe(n,"operation-not-supported-in-this-environment"));const r=si(n);mg(n,e,Xo);const s=gh(r,t);return new nn(r,"signInViaPopup",e,s).executeNotNull()}class nn extends yh{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,nn.currentPopupAction&&nn.currentPopupAction.cancel(),nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");const e=Jo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_y.get())};e()}}nn.currentPopupAction=null;/**
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
 */const Iy="pendingRedirect",As=new Map;class wy extends yh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=As.get(this.auth._key());if(!e){try{const r=await vy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}As.set(this.auth._key(),e)}return this.bypassAuthState||As.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vy(n,e){const t=by(e),r=Ay(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Ty(n,e){As.set(n._key(),e)}function Ay(n){return mt(n._redirectPersistence)}function by(n){return Ts(Iy,n.config.apiKey,n.name)}async function Cy(n,e,t=!1){if(We(n.app))return Promise.reject(an(n));const r=si(n),s=gh(r,e),a=await new wy(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const Sy=10*60*1e3;class Ry{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Py(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!_h(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Qe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(sl(e))}saveEventToCache(e){this.cachedEventUids.add(sl(e)),this.lastProcessedEventTime=Date.now()}}function sl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function _h({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Py(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return _h(n);default:return!1}}/**
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
 */async function ky(n,e={}){return Wn(n,"GET","/v1/projects",e)}/**
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
 */const Ny=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Vy=/^https?/;async function Dy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ky(n);for(const t of e)try{if(Ly(t))return}catch{}lt(n,"unauthorized-domain")}function Ly(n){const e=mo(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Vy.test(t))return!1;if(Ny.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const My=new Wr(3e4,6e4);function il(){const n=rt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function xy(n){return new Promise((e,t)=>{var s,i,a;function r(){il(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{il(),t(Qe(n,"network-request-failed"))},timeout:My.get()})}if((i=(s=rt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=rt().gapi)!=null&&a.load)r();else{const l=$g("iframefcb");return rt()[l]=()=>{gapi.load?r():t(Qe(n,"network-request-failed"))},Fg(`${Ug()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw bs=null,e})}let bs=null;function Oy(n){return bs=bs||xy(n),bs}/**
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
 */const By=new Wr(5e3,15e3),Fy="__/auth/iframe",Uy="emulator/auth/iframe",$y={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jy(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Wo(e,Uy):`https://${n.config.authDomain}/${Fy}`,r={apiKey:e.apiKey,appName:n.name,v:zn},s=qy.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${zr(r).slice(1)}`}async function zy(n){const e=await Oy(n),t=rt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:jy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:$y,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Qe(n,"network-request-failed"),l=rt().setTimeout(()=>{i(a)},By.get());function u(){rt().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const Wy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hy=500,Gy=600,Ky="_blank",Qy="http://localhost";class ol{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xy(n,e,t,r=Hy,s=Gy){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...Wy,width:r.toString(),height:s.toString(),top:i,left:a},d=ke().toLowerCase();t&&(l=Yu(d)?Ky:t),Qu(d)&&(e=e||Qy,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[v,S])=>`${E}${v}=${S},`,"");if(Ng(d)&&l!=="_self")return Yy(e||"",l),new ol(null);const p=window.open(e||"",l,f);W(p,n,"popup-blocked");try{p.focus()}catch{}return new ol(p)}function Yy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Jy="__/auth/handler",Zy="emulator/auth/handler",e_=encodeURIComponent("fac");async function al(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:zn,eventId:s};if(e instanceof Xo){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Jm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Hr){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),d=u?`#${e_}=${encodeURIComponent(u)}`:"";return`${t_(n)}?${zr(l).slice(1)}${d}`}function t_({config:n}){return n.emulator?Wo(n,Zy):`https://${n.authDomain}/${Jy}`}/**
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
 */const Ji="webStorageSupport";class n_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hh,this._completeRedirectFn=Cy,this._overrideRedirectResult=Ty}async _openPopup(e,t,r,s){var a;yt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await al(e,t,r,mo(),s);return Xy(e,i,Jo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await al(e,t,r,mo(),s);return iy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(yt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await zy(e),r=new Ry(e);return t.register("authEvent",s=>(W(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ji,{type:Ji},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Ji];i!==void 0&&t(!!i),lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nh()||Xu()||Ko()}}const r_=n_;var cl="@firebase/auth",ll="1.12.0";/**
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
 */class s_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function i_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function o_(n){Mn(new un("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rh(n)},d=new Og(r,s,i,u);return jg(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Mn(new un("auth-internal",e=>{const t=si(e.getProvider("auth").getImmediate());return(r=>new s_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(cl,ll,i_(n)),Ft(cl,ll,"esm2020")}/**
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
 */const a_=5*60,c_=Du("authIdTokenMaxAge")||a_;let ul=null;const l_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>c_)return;const s=t==null?void 0:t.token;ul!==s&&(ul=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function u_(n=Fu()){const e=qo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=qg(n,{popupRedirectResolver:r_,persistence:[my,Yo,hh]}),r=Du("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=l_(i.toString());Jg(t,a,()=>a(t.currentUser)),Yg(t,l=>a(l))}}const s=Nu("auth");return s&&zg(t,`http://${s}`),t}function h_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Bg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Qe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",h_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});o_("Browser");var hl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ut,Eh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,g){function y(){}y.prototype=g.prototype,_.F=g.prototype,_.prototype=new y,_.prototype.constructor=_,_.D=function(T,w,b){for(var I=Array(arguments.length-2),he=2;he<arguments.length;he++)I[he-2]=arguments[he];return g.prototype[w].apply(T,I)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,g,y){y||(y=0);const T=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)T[w]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(w=0;w<16;++w)T[w]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=_.g[0],y=_.g[1],w=_.g[2];let b=_.g[3],I;I=g+(b^y&(w^b))+T[0]+3614090360&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(w^g&(y^w))+T[1]+3905402710&4294967295,b=g+(I<<12&4294967295|I>>>20),I=w+(y^b&(g^y))+T[2]+606105819&4294967295,w=b+(I<<17&4294967295|I>>>15),I=y+(g^w&(b^g))+T[3]+3250441966&4294967295,y=w+(I<<22&4294967295|I>>>10),I=g+(b^y&(w^b))+T[4]+4118548399&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(w^g&(y^w))+T[5]+1200080426&4294967295,b=g+(I<<12&4294967295|I>>>20),I=w+(y^b&(g^y))+T[6]+2821735955&4294967295,w=b+(I<<17&4294967295|I>>>15),I=y+(g^w&(b^g))+T[7]+4249261313&4294967295,y=w+(I<<22&4294967295|I>>>10),I=g+(b^y&(w^b))+T[8]+1770035416&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(w^g&(y^w))+T[9]+2336552879&4294967295,b=g+(I<<12&4294967295|I>>>20),I=w+(y^b&(g^y))+T[10]+4294925233&4294967295,w=b+(I<<17&4294967295|I>>>15),I=y+(g^w&(b^g))+T[11]+2304563134&4294967295,y=w+(I<<22&4294967295|I>>>10),I=g+(b^y&(w^b))+T[12]+1804603682&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(w^g&(y^w))+T[13]+4254626195&4294967295,b=g+(I<<12&4294967295|I>>>20),I=w+(y^b&(g^y))+T[14]+2792965006&4294967295,w=b+(I<<17&4294967295|I>>>15),I=y+(g^w&(b^g))+T[15]+1236535329&4294967295,y=w+(I<<22&4294967295|I>>>10),I=g+(w^b&(y^w))+T[1]+4129170786&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^w&(g^y))+T[6]+3225465664&4294967295,b=g+(I<<9&4294967295|I>>>23),I=w+(g^y&(b^g))+T[11]+643717713&4294967295,w=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(w^b))+T[0]+3921069994&4294967295,y=w+(I<<20&4294967295|I>>>12),I=g+(w^b&(y^w))+T[5]+3593408605&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^w&(g^y))+T[10]+38016083&4294967295,b=g+(I<<9&4294967295|I>>>23),I=w+(g^y&(b^g))+T[15]+3634488961&4294967295,w=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(w^b))+T[4]+3889429448&4294967295,y=w+(I<<20&4294967295|I>>>12),I=g+(w^b&(y^w))+T[9]+568446438&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^w&(g^y))+T[14]+3275163606&4294967295,b=g+(I<<9&4294967295|I>>>23),I=w+(g^y&(b^g))+T[3]+4107603335&4294967295,w=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(w^b))+T[8]+1163531501&4294967295,y=w+(I<<20&4294967295|I>>>12),I=g+(w^b&(y^w))+T[13]+2850285829&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^w&(g^y))+T[2]+4243563512&4294967295,b=g+(I<<9&4294967295|I>>>23),I=w+(g^y&(b^g))+T[7]+1735328473&4294967295,w=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(w^b))+T[12]+2368359562&4294967295,y=w+(I<<20&4294967295|I>>>12),I=g+(y^w^b)+T[5]+4294588738&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^w)+T[8]+2272392833&4294967295,b=g+(I<<11&4294967295|I>>>21),I=w+(b^g^y)+T[11]+1839030562&4294967295,w=b+(I<<16&4294967295|I>>>16),I=y+(w^b^g)+T[14]+4259657740&4294967295,y=w+(I<<23&4294967295|I>>>9),I=g+(y^w^b)+T[1]+2763975236&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^w)+T[4]+1272893353&4294967295,b=g+(I<<11&4294967295|I>>>21),I=w+(b^g^y)+T[7]+4139469664&4294967295,w=b+(I<<16&4294967295|I>>>16),I=y+(w^b^g)+T[10]+3200236656&4294967295,y=w+(I<<23&4294967295|I>>>9),I=g+(y^w^b)+T[13]+681279174&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^w)+T[0]+3936430074&4294967295,b=g+(I<<11&4294967295|I>>>21),I=w+(b^g^y)+T[3]+3572445317&4294967295,w=b+(I<<16&4294967295|I>>>16),I=y+(w^b^g)+T[6]+76029189&4294967295,y=w+(I<<23&4294967295|I>>>9),I=g+(y^w^b)+T[9]+3654602809&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^w)+T[12]+3873151461&4294967295,b=g+(I<<11&4294967295|I>>>21),I=w+(b^g^y)+T[15]+530742520&4294967295,w=b+(I<<16&4294967295|I>>>16),I=y+(w^b^g)+T[2]+3299628645&4294967295,y=w+(I<<23&4294967295|I>>>9),I=g+(w^(y|~b))+T[0]+4096336452&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~w))+T[7]+1126891415&4294967295,b=g+(I<<10&4294967295|I>>>22),I=w+(g^(b|~y))+T[14]+2878612391&4294967295,w=b+(I<<15&4294967295|I>>>17),I=y+(b^(w|~g))+T[5]+4237533241&4294967295,y=w+(I<<21&4294967295|I>>>11),I=g+(w^(y|~b))+T[12]+1700485571&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~w))+T[3]+2399980690&4294967295,b=g+(I<<10&4294967295|I>>>22),I=w+(g^(b|~y))+T[10]+4293915773&4294967295,w=b+(I<<15&4294967295|I>>>17),I=y+(b^(w|~g))+T[1]+2240044497&4294967295,y=w+(I<<21&4294967295|I>>>11),I=g+(w^(y|~b))+T[8]+1873313359&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~w))+T[15]+4264355552&4294967295,b=g+(I<<10&4294967295|I>>>22),I=w+(g^(b|~y))+T[6]+2734768916&4294967295,w=b+(I<<15&4294967295|I>>>17),I=y+(b^(w|~g))+T[13]+1309151649&4294967295,y=w+(I<<21&4294967295|I>>>11),I=g+(w^(y|~b))+T[4]+4149444226&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~w))+T[11]+3174756917&4294967295,b=g+(I<<10&4294967295|I>>>22),I=w+(g^(b|~y))+T[2]+718787259&4294967295,w=b+(I<<15&4294967295|I>>>17),I=y+(b^(w|~g))+T[9]+3951481745&4294967295,_.g[0]=_.g[0]+g&4294967295,_.g[1]=_.g[1]+(w+(I<<21&4294967295|I>>>11))&4294967295,_.g[2]=_.g[2]+w&4294967295,_.g[3]=_.g[3]+b&4294967295}r.prototype.v=function(_,g){g===void 0&&(g=_.length);const y=g-this.blockSize,T=this.C;let w=this.h,b=0;for(;b<g;){if(w==0)for(;b<=y;)s(this,_,b),b+=this.blockSize;if(typeof _=="string"){for(;b<g;)if(T[w++]=_.charCodeAt(b++),w==this.blockSize){s(this,T),w=0;break}}else for(;b<g;)if(T[w++]=_[b++],w==this.blockSize){s(this,T),w=0;break}}this.h=w,this.o+=g},r.prototype.A=function(){var _=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);_[0]=128;for(var g=1;g<_.length-8;++g)_[g]=0;g=this.o*8;for(var y=_.length-8;y<_.length;++y)_[y]=g&255,g/=256;for(this.v(_),_=Array(16),g=0,y=0;y<4;++y)for(let T=0;T<32;T+=8)_[g++]=this.g[y]>>>T&255;return _};function i(_,g){var y=l;return Object.prototype.hasOwnProperty.call(y,_)?y[_]:y[_]=g(_)}function a(_,g){this.h=g;const y=[];let T=!0;for(let w=_.length-1;w>=0;w--){const b=_[w]|0;T&&b==g||(y[w]=b,T=!1)}this.g=y}var l={};function u(_){return-128<=_&&_<128?i(_,function(g){return new a([g|0],g<0?-1:0)}):new a([_|0],_<0?-1:0)}function d(_){if(isNaN(_)||!isFinite(_))return p;if(_<0)return P(d(-_));const g=[];let y=1;for(let T=0;_>=y;T++)g[T]=_/y|0,y*=4294967296;return new a(g,0)}function f(_,g){if(_.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(_.charAt(0)=="-")return P(f(_.substring(1),g));if(_.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(g,8));let T=p;for(let b=0;b<_.length;b+=8){var w=Math.min(8,_.length-b);const I=parseInt(_.substring(b,b+w),g);w<8?(w=d(Math.pow(g,w)),T=T.j(w).add(d(I))):(T=T.j(y),T=T.add(d(I)))}return T}var p=u(0),E=u(1),v=u(16777216);n=a.prototype,n.m=function(){if(R(this))return-P(this).m();let _=0,g=1;for(let y=0;y<this.g.length;y++){const T=this.i(y);_+=(T>=0?T:4294967296+T)*g,g*=4294967296}return _},n.toString=function(_){if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(S(this))return"0";if(R(this))return"-"+P(this).toString(_);const g=d(Math.pow(_,6));var y=this;let T="";for(;;){const w=F(y,g).g;y=D(y,w.j(g));let b=((y.g.length>0?y.g[0]:y.h)>>>0).toString(_);if(y=w,S(y))return b+T;for(;b.length<6;)b="0"+b;T=b+T}},n.i=function(_){return _<0?0:_<this.g.length?this.g[_]:this.h};function S(_){if(_.h!=0)return!1;for(let g=0;g<_.g.length;g++)if(_.g[g]!=0)return!1;return!0}function R(_){return _.h==-1}n.l=function(_){return _=D(this,_),R(_)?-1:S(_)?0:1};function P(_){const g=_.g.length,y=[];for(let T=0;T<g;T++)y[T]=~_.g[T];return new a(y,~_.h).add(E)}n.abs=function(){return R(this)?P(this):this},n.add=function(_){const g=Math.max(this.g.length,_.g.length),y=[];let T=0;for(let w=0;w<=g;w++){let b=T+(this.i(w)&65535)+(_.i(w)&65535),I=(b>>>16)+(this.i(w)>>>16)+(_.i(w)>>>16);T=I>>>16,b&=65535,I&=65535,y[w]=I<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function D(_,g){return _.add(P(g))}n.j=function(_){if(S(this)||S(_))return p;if(R(this))return R(_)?P(this).j(P(_)):P(P(this).j(_));if(R(_))return P(this.j(P(_)));if(this.l(v)<0&&_.l(v)<0)return d(this.m()*_.m());const g=this.g.length+_.g.length,y=[];for(var T=0;T<2*g;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(let w=0;w<_.g.length;w++){const b=this.i(T)>>>16,I=this.i(T)&65535,he=_.i(w)>>>16,Be=_.i(w)&65535;y[2*T+2*w]+=I*Be,M(y,2*T+2*w),y[2*T+2*w+1]+=b*Be,M(y,2*T+2*w+1),y[2*T+2*w+1]+=I*he,M(y,2*T+2*w+1),y[2*T+2*w+2]+=b*he,M(y,2*T+2*w+2)}for(_=0;_<g;_++)y[_]=y[2*_+1]<<16|y[2*_];for(_=g;_<2*g;_++)y[_]=0;return new a(y,0)};function M(_,g){for(;(_[g]&65535)!=_[g];)_[g+1]+=_[g]>>>16,_[g]&=65535,g++}function x(_,g){this.g=_,this.h=g}function F(_,g){if(S(g))throw Error("division by zero");if(S(_))return new x(p,p);if(R(_))return g=F(P(_),g),new x(P(g.g),P(g.h));if(R(g))return g=F(_,P(g)),new x(P(g.g),g.h);if(_.g.length>30){if(R(_)||R(g))throw Error("slowDivide_ only works with positive integers.");for(var y=E,T=g;T.l(_)<=0;)y=L(y),T=L(T);var w=O(y,1),b=O(T,1);for(T=O(T,2),y=O(y,2);!S(T);){var I=b.add(T);I.l(_)<=0&&(w=w.add(y),b=I),T=O(T,1),y=O(y,1)}return g=D(_,w.j(g)),new x(w,g)}for(w=p;_.l(g)>=0;){for(y=Math.max(1,Math.floor(_.m()/g.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),b=d(y),I=b.j(g);R(I)||I.l(_)>0;)y-=T,b=d(y),I=b.j(g);S(b)&&(b=E),w=w.add(b),_=D(_,I)}return new x(w,_)}n.B=function(_){return F(this,_).h},n.and=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let T=0;T<g;T++)y[T]=this.i(T)&_.i(T);return new a(y,this.h&_.h)},n.or=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let T=0;T<g;T++)y[T]=this.i(T)|_.i(T);return new a(y,this.h|_.h)},n.xor=function(_){const g=Math.max(this.g.length,_.g.length),y=[];for(let T=0;T<g;T++)y[T]=this.i(T)^_.i(T);return new a(y,this.h^_.h)};function L(_){const g=_.g.length+1,y=[];for(let T=0;T<g;T++)y[T]=_.i(T)<<1|_.i(T-1)>>>31;return new a(y,_.h)}function O(_,g){const y=g>>5;g%=32;const T=_.g.length-y,w=[];for(let b=0;b<T;b++)w[b]=g>0?_.i(b+y)>>>g|_.i(b+y+1)<<32-g:_.i(b+y);return new a(w,_.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Eh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Ut=a}).apply(typeof hl<"u"?hl:typeof self<"u"?self:typeof window<"u"?window:{});var gs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ih,_r,wh,Cs,yo,vh,Th,Ah;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof gs=="object"&&gs];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var m=0;m<o.length-1;m++){var C=o[m];if(!(C in h))break e;h=h[C]}o=o[o.length-1],m=h[o],c=c(m),c!=m&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],m;for(m in c)Object.prototype.hasOwnProperty.call(c,m)&&h.push([m,c[m]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function u(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=u,d.apply(null,arguments)}function f(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function p(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(m,C,k){for(var B=Array(arguments.length-2),K=2;K<arguments.length;K++)B[K-2]=arguments[K];return c.prototype[C].apply(m,B)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function v(o){const c=o.length;if(c>0){const h=Array(c);for(let m=0;m<c;m++)h[m]=o[m];return h}return[]}function S(o,c){for(let m=1;m<arguments.length;m++){const C=arguments[m];var h=typeof C;if(h=h!="object"?h:C?Array.isArray(C)?"array":h:"null",h=="array"||h=="object"&&typeof C.length=="number"){h=o.length||0;const k=C.length||0;o.length=h+k;for(let B=0;B<k;B++)o[h+B]=C[B]}else o.push(C)}}class R{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function P(o){a.setTimeout(()=>{throw o},0)}function D(){var o=_;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class M{constructor(){this.h=this.g=null}add(c,h){const m=x.get();m.set(c,h),this.h?this.h.next=m:this.g=m,this.h=m}}var x=new R(()=>new F,o=>o.reset());class F{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let L,O=!1,_=new M,g=()=>{const o=Promise.resolve(void 0);L=()=>{o.then(y)}};function y(){for(var o;o=D();){try{o.h.call(o.g)}catch(h){P(h)}var c=x;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}O=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var b=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o}();function I(o){return/^[\s\xa0]*$/.test(o)}function he(o,c){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}p(he,w),he.prototype.init=function(o,c){const h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&he.Z.h.call(this)},he.prototype.h=function(){he.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Be="closure_listenable_"+(Math.random()*1e6|0),j=0;function ae(o,c,h,m,C){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!m,this.ha=C,this.key=++j,this.da=this.fa=!1}function ie(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ne(o,c,h){for(const m in o)c.call(h,o[m],m,o)}function le(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Ye(o){const c={};for(const h in o)c[h]=o[h];return c}const Je="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ae(o,c){let h,m;for(let C=1;C<arguments.length;C++){m=arguments[C];for(h in m)o[h]=m[h];for(let k=0;k<Je.length;k++)h=Je[k],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function _n(o){this.src=o,this.g={},this.h=0}_n.prototype.add=function(o,c,h,m,C){const k=o.toString();o=this.g[k],o||(o=this.g[k]=[],this.h++);const B=$e(o,c,m,C);return B>-1?(c=o[B],h||(c.fa=!1)):(c=new ae(c,this.src,k,!!m,C),c.fa=h,o.push(c)),c};function Qt(o,c){const h=c.type;if(h in o.g){var m=o.g[h],C=Array.prototype.indexOf.call(m,c,void 0),k;(k=C>=0)&&Array.prototype.splice.call(m,C,1),k&&(ie(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function $e(o,c,h,m){for(let C=0;C<o.length;++C){const k=o[C];if(!k.da&&k.listener==c&&k.capture==!!h&&k.ha==m)return C}return-1}var wt="closure_lm_"+(Math.random()*1e6|0),vt={};function Yn(o,c,h,m,C){if(Array.isArray(c)){for(let k=0;k<c.length;k++)Yn(o,c[k],h,m,C);return null}return h=Ba(h),o&&o[Be]?o.J(c,h,l(m)?!!m.capture:!1,C):En(o,c,h,!1,m,C)}function En(o,c,h,m,C,k){if(!c)throw Error("Invalid event type");const B=l(C)?!!C.capture:!!C;let K=Ti(o);if(K||(o[wt]=K=new _n(o)),h=K.add(c,h,m,B,k),h.proxy)return h;if(m=uf(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)b||(C=B),C===void 0&&(C=!1),o.addEventListener(c.toString(),m,C);else if(o.attachEvent)o.attachEvent(Oa(c.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function uf(){function o(h){return c.call(o.src,o.listener,h)}const c=hf;return o}function xa(o,c,h,m,C){if(Array.isArray(c))for(var k=0;k<c.length;k++)xa(o,c[k],h,m,C);else m=l(m)?!!m.capture:!!m,h=Ba(h),o&&o[Be]?(o=o.i,k=String(c).toString(),k in o.g&&(c=o.g[k],h=$e(c,h,m,C),h>-1&&(ie(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[k],o.h--)))):o&&(o=Ti(o))&&(c=o.g[c.toString()],o=-1,c&&(o=$e(c,h,m,C)),(h=o>-1?c[o]:null)&&vi(h))}function vi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Be])Qt(c.i,o);else{var h=o.type,m=o.proxy;c.removeEventListener?c.removeEventListener(h,m,o.capture):c.detachEvent?c.detachEvent(Oa(h),m):c.addListener&&c.removeListener&&c.removeListener(m),(h=Ti(c))?(Qt(h,o),h.h==0&&(h.src=null,c[wt]=null)):ie(o)}}}function Oa(o){return o in vt?vt[o]:vt[o]="on"+o}function hf(o,c){if(o.da)o=!0;else{c=new he(c,this);const h=o.listener,m=o.ha||o.src;o.fa&&vi(o),o=h.call(m,c)}return o}function Ti(o){return o=o[wt],o instanceof _n?o:null}var Ai="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ba(o){return typeof o=="function"?o:(o[Ai]||(o[Ai]=function(c){return o.handleEvent(c)}),o[Ai])}function be(){T.call(this),this.i=new _n(this),this.M=this,this.G=null}p(be,T),be.prototype[Be]=!0,be.prototype.removeEventListener=function(o,c,h,m){xa(this,o,c,h,m)};function Ne(o,c){var h,m=o.G;if(m)for(h=[];m;m=m.G)h.push(m);if(o=o.M,m=c.type||c,typeof c=="string")c=new w(c,o);else if(c instanceof w)c.target=c.target||o;else{var C=c;c=new w(m,o),Ae(c,C)}C=!0;let k,B;if(h)for(B=h.length-1;B>=0;B--)k=c.g=h[B],C=ns(k,m,!0,c)&&C;if(k=c.g=o,C=ns(k,m,!0,c)&&C,C=ns(k,m,!1,c)&&C,h)for(B=0;B<h.length;B++)k=c.g=h[B],C=ns(k,m,!1,c)&&C}be.prototype.N=function(){if(be.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let m=0;m<h.length;m++)ie(h[m]);delete o.g[c],o.h--}}this.G=null},be.prototype.J=function(o,c,h,m){return this.i.add(String(o),c,!1,h,m)},be.prototype.K=function(o,c,h,m){return this.i.add(String(o),c,!0,h,m)};function ns(o,c,h,m){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let C=!0;for(let k=0;k<c.length;++k){const B=c[k];if(B&&!B.da&&B.capture==h){const K=B.listener,ye=B.ha||B.src;B.fa&&Qt(o.i,B),C=K.call(ye,m)!==!1&&C}}return C&&!m.defaultPrevented}function df(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Fa(o){o.g=df(()=>{o.g=null,o.i&&(o.i=!1,Fa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class ff extends T{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Fa(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Jn(o){T.call(this),this.h=o,this.g={}}p(Jn,T);var Ua=[];function $a(o){ne(o.g,function(c,h){this.g.hasOwnProperty(h)&&vi(c)},o),o.g={}}Jn.prototype.N=function(){Jn.Z.N.call(this),$a(this)},Jn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var bi=a.JSON.stringify,mf=a.JSON.parse,pf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function qa(){}function ja(){}var Zn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ci(){w.call(this,"d")}p(Ci,w);function Si(){w.call(this,"c")}p(Si,w);var Xt={},za=null;function rs(){return za=za||new be}Xt.Ia="serverreachability";function Wa(o){w.call(this,Xt.Ia,o)}p(Wa,w);function er(o){const c=rs();Ne(c,new Wa(c))}Xt.STAT_EVENT="statevent";function Ha(o,c){w.call(this,Xt.STAT_EVENT,o),this.stat=c}p(Ha,w);function Ve(o){const c=rs();Ne(c,new Ha(c,o))}Xt.Ja="timingevent";function Ga(o,c){w.call(this,Xt.Ja,o),this.size=c}p(Ga,w);function tr(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function nr(){this.g=!0}nr.prototype.ua=function(){this.g=!1};function gf(o,c,h,m,C,k){o.info(function(){if(o.g)if(k){var B="",K=k.split("&");for(let ee=0;ee<K.length;ee++){var ye=K[ee].split("=");if(ye.length>1){const Ee=ye[0];ye=ye[1];const et=Ee.split("_");B=et.length>=2&&et[1]=="type"?B+(Ee+"="+ye+"&"):B+(Ee+"=redacted&")}}}else B=null;else B=k;return"XMLHTTP REQ ("+m+") [attempt "+C+"]: "+c+`
`+h+`
`+B})}function yf(o,c,h,m,C,k,B){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+C+"]: "+c+`
`+h+`
`+k+" "+B})}function In(o,c,h,m){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Ef(o,h)+(m?" "+m:"")})}function _f(o,c){o.info(function(){return"TIMEOUT: "+c})}nr.prototype.info=function(){};function Ef(o,c){if(!o.g)return c;if(!c)return null;try{const k=JSON.parse(c);if(k){for(o=0;o<k.length;o++)if(Array.isArray(k[o])){var h=k[o];if(!(h.length<2)){var m=h[1];if(Array.isArray(m)&&!(m.length<1)){var C=m[0];if(C!="noop"&&C!="stop"&&C!="close")for(let B=1;B<m.length;B++)m[B]=""}}}}return bi(k)}catch{return c}}var ss={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ka={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Qa;function Ri(){}p(Ri,qa),Ri.prototype.g=function(){return new XMLHttpRequest},Qa=new Ri;function rr(o){return encodeURIComponent(String(o))}function If(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function Tt(o,c,h,m){this.j=o,this.i=c,this.l=h,this.S=m||1,this.V=new Jn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Xa}function Xa(){this.i=null,this.g="",this.h=!1}var Ya={},Pi={};function ki(o,c,h){o.M=1,o.A=os(Ze(c)),o.u=h,o.R=!0,Ja(o,null)}function Ja(o,c){o.F=Date.now(),is(o),o.B=Ze(o.A);var h=o.B,m=o.S;Array.isArray(m)||(m=[String(m)]),hc(h.i,"t",m),o.C=0,h=o.j.L,o.h=new Xa,o.g=Pc(o.j,h?c:null,!o.u),o.P>0&&(o.O=new ff(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,m=o.ba;var C="readystatechange";Array.isArray(C)||(C&&(Ua[0]=C.toString()),C=Ua);for(let k=0;k<C.length;k++){const B=Yn(h,C[k],m||c.handleEvent,!1,c.h||c);if(!B)break;c.g[B.key]=B}c=o.J?Ye(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),er(),gf(o.i,o.v,o.B,o.l,o.S,o.u)}Tt.prototype.ba=function(o){o=o.target;const c=this.O;c&&Ct(o)==3?c.j():this.Y(o)},Tt.prototype.Y=function(o){try{if(o==this.g)e:{const K=Ct(this.g),ye=this.g.ya(),ee=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||_c(this.g)))){this.K||K!=4||ye==7||(ye==8||ee<=0?er(3):er(2)),Ni(this);var c=this.g.ca();this.X=c;var h=wf(this);if(this.o=c==200,yf(this.i,this.v,this.B,this.l,this.S,K,c),this.o){if(this.U&&!this.L){t:{if(this.g){var m,C=this.g;if((m=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(m)){var k=m;break t}}k=null}if(o=k)In(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Vi(this,o);else{this.o=!1,this.m=3,Ve(12),Yt(this),sr(this);break e}}if(this.R){o=!0;let Ee;for(;!this.K&&this.C<h.length;)if(Ee=vf(this,h),Ee==Pi){K==4&&(this.m=4,Ve(14),o=!1),In(this.i,this.l,null,"[Incomplete Response]");break}else if(Ee==Ya){this.m=4,Ve(15),In(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else In(this.i,this.l,Ee,null),Vi(this,Ee);if(Za(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||h.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)In(this.i,this.l,h,"[Invalid Chunked Response]"),Yt(this),sr(this);else if(h.length>0&&!this.W){this.W=!0;var B=this.j;B.g==this&&B.aa&&!B.P&&(B.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Ui(B),B.P=!0,Ve(11))}}else In(this.i,this.l,h,null),Vi(this,h);K==4&&Yt(this),this.o&&!this.K&&(K==4?bc(this.j,this):(this.o=!1,is(this)))}else xf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),Yt(this),sr(this)}}}catch{}finally{}};function wf(o){if(!Za(o))return o.g.la();const c=_c(o.g);if(c==="")return"";let h="";const m=c.length,C=Ct(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Yt(o),sr(o),"";o.h.i=new a.TextDecoder}for(let k=0;k<m;k++)o.h.h=!0,h+=o.h.i.decode(c[k],{stream:!(C&&k==m-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function Za(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function vf(o,c){var h=o.C,m=c.indexOf(`
`,h);return m==-1?Pi:(h=Number(c.substring(h,m)),isNaN(h)?Ya:(m+=1,m+h>c.length?Pi:(c=c.slice(m,m+h),o.C=m+h,c)))}Tt.prototype.cancel=function(){this.K=!0,Yt(this)};function is(o){o.T=Date.now()+o.H,ec(o,o.H)}function ec(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=tr(d(o.aa,o),c)}function Ni(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Tt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(_f(this.i,this.B),this.M!=2&&(er(),Ve(17)),Yt(this),this.m=2,sr(this)):ec(this,this.T-o)};function sr(o){o.j.I==0||o.K||bc(o.j,o)}function Yt(o){Ni(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,$a(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Vi(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||Di(h.h,o))){if(!o.L&&Di(h.h,o)&&h.I==3){try{var m=h.Ba.g.parse(c)}catch{m=null}if(Array.isArray(m)&&m.length==3){var C=m;if(C[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)hs(h),ls(h);else break e;Fi(h),Ve(18)}}else h.xa=C[1],0<h.xa-h.K&&C[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=tr(d(h.Va,h),6e3));rc(h.h)<=1&&h.ta&&(h.ta=void 0)}else Zt(h,11)}else if((o.L||h.g==o)&&hs(h),!I(c))for(C=h.Ba.g.parse(c),c=0;c<C.length;c++){let ee=C[c];const Ee=ee[0];if(!(Ee<=h.K))if(h.K=Ee,ee=ee[1],h.I==2)if(ee[0]=="c"){h.M=ee[1],h.ba=ee[2];const et=ee[3];et!=null&&(h.ka=et,h.j.info("VER="+h.ka));const en=ee[4];en!=null&&(h.za=en,h.j.info("SVER="+h.za));const St=ee[5];St!=null&&typeof St=="number"&&St>0&&(m=1.5*St,h.O=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const Rt=o.g;if(Rt){const fs=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fs){var k=m.h;k.g||fs.indexOf("spdy")==-1&&fs.indexOf("quic")==-1&&fs.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(Li(k,k.h),k.h=null))}if(m.G){const $i=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;$i&&(m.wa=$i,re(m.J,m.G,$i))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),m=h;var B=o;if(m.na=Rc(m,m.L?m.ba:null,m.W),B.L){sc(m.h,B);var K=B,ye=m.O;ye&&(K.H=ye),K.D&&(Ni(K),is(K)),m.g=B}else Tc(m);h.i.length>0&&us(h)}else ee[0]!="stop"&&ee[0]!="close"||Zt(h,7);else h.I==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?Zt(h,7):Bi(h):ee[0]!="noop"&&h.l&&h.l.qa(ee),h.A=0)}}er(4)}catch{}}var Tf=class{constructor(o,c){this.g=o,this.map=c}};function tc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function nc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function rc(o){return o.h?1:o.g?o.g.size:0}function Di(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Li(o,c){o.g?o.g.add(c):o.h=c}function sc(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}tc.prototype.cancel=function(){if(this.i=ic(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ic(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return v(o.i)}var oc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Af(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const m=o[h].indexOf("=");let C,k=null;m>=0?(C=o[h].substring(0,m),k=o[h].substring(m+1)):C=o[h],c(C,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function At(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof At?(this.l=o.l,ir(this,o.j),this.o=o.o,this.g=o.g,or(this,o.u),this.h=o.h,Mi(this,dc(o.i)),this.m=o.m):o&&(c=String(o).match(oc))?(this.l=!1,ir(this,c[1]||"",!0),this.o=ar(c[2]||""),this.g=ar(c[3]||"",!0),or(this,c[4]),this.h=ar(c[5]||"",!0),Mi(this,c[6]||"",!0),this.m=ar(c[7]||"")):(this.l=!1,this.i=new lr(null,this.l))}At.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(cr(c,ac,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(cr(c,ac,!0),"@"),o.push(rr(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(cr(h,h.charAt(0)=="/"?Sf:Cf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",cr(h,Pf)),o.join("")},At.prototype.resolve=function(o){const c=Ze(this);let h=!!o.j;h?ir(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var m=o.h;if(h)or(c,o.u);else if(h=!!o.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var C=c.h.lastIndexOf("/");C!=-1&&(m=c.h.slice(0,C+1)+m)}if(C=m,C==".."||C==".")m="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){m=C.lastIndexOf("/",0)==0,C=C.split("/");const k=[];for(let B=0;B<C.length;){const K=C[B++];K=="."?m&&B==C.length&&k.push(""):K==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),m&&B==C.length&&k.push("")):(k.push(K),m=!0)}m=k.join("/")}else m=C}return h?c.h=m:h=o.i.toString()!=="",h?Mi(c,dc(o.i)):h=!!o.m,h&&(c.m=o.m),c};function Ze(o){return new At(o)}function ir(o,c,h){o.j=h?ar(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function or(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Mi(o,c,h){c instanceof lr?(o.i=c,kf(o.i,o.l)):(h||(c=cr(c,Rf)),o.i=new lr(c,o.l))}function re(o,c,h){o.i.set(c,h)}function os(o){return re(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function ar(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function cr(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,bf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function bf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var ac=/[#\/\?@]/g,Cf=/[#\?:]/g,Sf=/[#\?]/g,Rf=/[#\?@]/g,Pf=/#/g;function lr(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Jt(o){o.g||(o.g=new Map,o.h=0,o.i&&Af(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=lr.prototype,n.add=function(o,c){Jt(this),this.i=null,o=wn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function cc(o,c){Jt(o),c=wn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function lc(o,c){return Jt(o),c=wn(o,c),o.g.has(c)}n.forEach=function(o,c){Jt(this),this.g.forEach(function(h,m){h.forEach(function(C){o.call(c,C,m,this)},this)},this)};function uc(o,c){Jt(o);let h=[];if(typeof c=="string")lc(o,c)&&(h=h.concat(o.g.get(wn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return Jt(this),this.i=null,o=wn(this,o),lc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=uc(this,o),o.length>0?String(o[0]):c):c};function hc(o,c,h){cc(o,c),h.length>0&&(o.i=null,o.g.set(wn(o,c),v(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let m=0;m<c.length;m++){var h=c[m];const C=rr(h);h=uc(this,h);for(let k=0;k<h.length;k++){let B=C;h[k]!==""&&(B+="="+rr(h[k])),o.push(B)}}return this.i=o.join("&")};function dc(o){const c=new lr;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function wn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function kf(o,c){c&&!o.j&&(Jt(o),o.i=null,o.g.forEach(function(h,m){const C=m.toLowerCase();m!=C&&(cc(this,m),hc(this,C,h))},o)),o.j=c}function Nf(o,c){const h=new nr;if(a.Image){const m=new Image;m.onload=f(bt,h,"TestLoadImage: loaded",!0,c,m),m.onerror=f(bt,h,"TestLoadImage: error",!1,c,m),m.onabort=f(bt,h,"TestLoadImage: abort",!1,c,m),m.ontimeout=f(bt,h,"TestLoadImage: timeout",!1,c,m),a.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else c(!1)}function Vf(o,c){const h=new nr,m=new AbortController,C=setTimeout(()=>{m.abort(),bt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:m.signal}).then(k=>{clearTimeout(C),k.ok?bt(h,"TestPingServer: ok",!0,c):bt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(C),bt(h,"TestPingServer: error",!1,c)})}function bt(o,c,h,m,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),m(h)}catch{}}function Df(){this.g=new pf}function xi(o){this.i=o.Sb||null,this.h=o.ab||!1}p(xi,qa),xi.prototype.g=function(){return new as(this.i,this.h)};function as(o,c){be.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(as,be),n=as.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,hr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ur(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,hr(this)),this.g&&(this.readyState=3,hr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;fc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function fc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?ur(this):hr(this),this.readyState==3&&fc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,ur(this))},n.Na=function(o){this.g&&(this.response=o,ur(this))},n.ga=function(){this.g&&ur(this)};function ur(o){o.readyState=4,o.l=null,o.j=null,o.B=null,hr(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function hr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(as.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function mc(o){let c="";return ne(o,function(h,m){c+=m,c+=":",c+=h,c+=`\r
`}),c}function Oi(o,c,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=mc(h),typeof o=="string"?h!=null&&rr(h):re(o,c,h))}function ce(o){be.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ce,be);var Lf=/^https?$/i,Mf=["POST","PUT"];n=ce.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Qa.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(k){pc(this,k);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var C in m)h.set(C,m[C]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const k of m.keys())h.set(k,m.get(k));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(k=>k.toLowerCase()=="content-type"),C=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Mf,c,void 0)>=0)||m||C||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,B]of h)this.g.setRequestHeader(k,B);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(k){pc(this,k)}};function pc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,gc(o),cs(o)}function gc(o){o.A||(o.A=!0,Ne(o,"complete"),Ne(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Ne(this,"complete"),Ne(this,"abort"),cs(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cs(this,!0)),ce.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?yc(this):this.Xa())},n.Xa=function(){yc(this)};function yc(o){if(o.h&&typeof i<"u"){if(o.v&&Ct(o)==4)setTimeout(o.Ca.bind(o),0);else if(Ne(o,"readystatechange"),Ct(o)==4){o.h=!1;try{const k=o.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var m;if(m=k===0){let B=String(o.D).match(oc)[1]||null;!B&&a.self&&a.self.location&&(B=a.self.location.protocol.slice(0,-1)),m=!Lf.test(B?B.toLowerCase():"")}h=m}if(h)Ne(o,"complete"),Ne(o,"success");else{o.o=6;try{var C=Ct(o)>2?o.g.statusText:""}catch{C=""}o.l=C+" ["+o.ca()+"]",gc(o)}}finally{cs(o)}}}}function cs(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||Ne(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Ct(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Ct(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),mf(c)}};function _c(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function xf(o){const c={};o=(o.g&&Ct(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(I(o[m]))continue;var h=If(o[m]);const C=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const k=c[C]||[];c[C]=k,k.push(h)}le(c,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function dr(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function Ec(o){this.za=0,this.i=[],this.j=new nr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=dr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=dr("baseRetryDelayMs",5e3,o),this.Za=dr("retryDelaySeedMs",1e4,o),this.Ta=dr("forwardChannelMaxRetries",2,o),this.va=dr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new tc(o&&o.concurrentRequestLimit),this.Ba=new Df,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ec.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,m){Ve(0),this.W=o,this.H=c||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.J=Rc(this,null,this.W),us(this)};function Bi(o){if(Ic(o),o.I==3){var c=o.V++,h=Ze(o.J);if(re(h,"SID",o.M),re(h,"RID",c),re(h,"TYPE","terminate"),fr(o,h),c=new Tt(o,o.j,c),c.M=2,c.A=os(Ze(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=Pc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),is(c)}Sc(o)}function ls(o){o.g&&(Ui(o),o.g.cancel(),o.g=null)}function Ic(o){ls(o),o.v&&(a.clearTimeout(o.v),o.v=null),hs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function us(o){if(!nc(o.h)&&!o.m){o.m=!0;var c=o.Ea;L||g(),O||(L(),O=!0),_.add(c,o),o.D=0}}function Of(o,c){return rc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=tr(d(o.Ea,o,c),Cc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const C=new Tt(this,this.j,o);let k=this.o;if(this.U&&(k?(k=Ye(k),Ae(k,this.U)):k=this.U),this.u!==null||this.R||(C.J=k,k=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(c+=m,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=vc(this,C,c),h=Ze(this.J),re(h,"RID",o),re(h,"CVER",22),this.G&&re(h,"X-HTTP-Session-Id",this.G),fr(this,h),k&&(this.R?c="headers="+rr(mc(k))+"&"+c:this.u&&Oi(h,this.u,k)),Li(this.h,C),this.Ra&&re(h,"TYPE","init"),this.S?(re(h,"$req",c),re(h,"SID","null"),C.U=!0,ki(C,h,null)):ki(C,h,c),this.I=2}}else this.I==3&&(o?wc(this,o):this.i.length==0||nc(this.h)||wc(this))};function wc(o,c){var h;c?h=c.l:h=o.V++;const m=Ze(o.J);re(m,"SID",o.M),re(m,"RID",h),re(m,"AID",o.K),fr(o,m),o.u&&o.o&&Oi(m,o.u,o.o),h=new Tt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=vc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Li(o.h,h),ki(h,m,c)}function fr(o,c){o.H&&ne(o.H,function(h,m){re(c,m,h)}),o.l&&ne({},function(h,m){re(c,m,h)})}function vc(o,c,h){h=Math.min(o.i.length,h);const m=o.l?d(o.l.Ka,o.l,o):null;e:{var C=o.i;let K=-1;for(;;){const ye=["count="+h];K==-1?h>0?(K=C[0].g,ye.push("ofs="+K)):K=0:ye.push("ofs="+K);let ee=!0;for(let Ee=0;Ee<h;Ee++){var k=C[Ee].g;const et=C[Ee].map;if(k-=K,k<0)K=Math.max(0,C[Ee].g-100),ee=!1;else try{k="req"+k+"_"||"";try{var B=et instanceof Map?et:Object.entries(et);for(const[en,St]of B){let Rt=St;l(St)&&(Rt=bi(St)),ye.push(k+en+"="+encodeURIComponent(Rt))}}catch(en){throw ye.push(k+"type="+encodeURIComponent("_badmap")),en}}catch{m&&m(et)}}if(ee){B=ye.join("&");break e}}B=void 0}return o=o.i.splice(0,h),c.G=o,B}function Tc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;L||g(),O||(L(),O=!0),_.add(c,o),o.A=0}}function Fi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=tr(d(o.Da,o),Cc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Ac(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=tr(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),ls(this),Ac(this))};function Ui(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Ac(o){o.g=new Tt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=Ze(o.na);re(c,"RID","rpc"),re(c,"SID",o.M),re(c,"AID",o.K),re(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&re(c,"TO",o.ia),re(c,"TYPE","xmlhttp"),fr(o,c),o.u&&o.o&&Oi(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=os(Ze(c)),h.u=null,h.R=!0,Ja(h,o)}n.Va=function(){this.C!=null&&(this.C=null,ls(this),Fi(this),Ve(19))};function hs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function bc(o,c){var h=null;if(o.g==c){hs(o),Ui(o),o.g=null;var m=2}else if(Di(o.h,c))h=c.G,sc(o.h,c),m=1;else return;if(o.I!=0){if(c.o)if(m==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var C=o.D;m=rs(),Ne(m,new Ga(m,h)),us(o)}else Tc(o);else if(C=c.m,C==3||C==0&&c.X>0||!(m==1&&Of(o,c)||m==2&&Fi(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),C){case 1:Zt(o,5);break;case 4:Zt(o,10);break;case 3:Zt(o,6);break;default:Zt(o,2)}}}function Cc(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function Zt(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),m=o.Ua;const C=!m;m=new At(m||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ir(m,"https"),os(m),C?Nf(m.toString(),h):Vf(m.toString(),h)}else Ve(2);o.I=0,o.l&&o.l.pa(c),Sc(o),Ic(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function Sc(o){if(o.I=0,o.ja=[],o.l){const c=ic(o.h);(c.length!=0||o.i.length!=0)&&(S(o.ja,c),S(o.ja,o.i),o.h.i.length=0,v(o.i),o.i.length=0),o.l.oa()}}function Rc(o,c,h){var m=h instanceof At?Ze(h):new At(h);if(m.g!="")c&&(m.g=c+"."+m.g),or(m,m.u);else{var C=a.location;m=C.protocol,c=c?c+"."+C.hostname:C.hostname,C=+C.port;const k=new At(null);m&&ir(k,m),c&&(k.g=c),C&&or(k,C),h&&(k.h=h),m=k}return h=o.G,c=o.wa,h&&c&&re(m,h,c),re(m,"VER",o.ka),fr(o,m),m}function Pc(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new ce(new xi({ab:h})):new ce(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function kc(){}n=kc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function ds(){}ds.prototype.g=function(o,c){return new Fe(o,c)};function Fe(o,c){be.call(this),this.g=new Ec(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!I(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!I(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new vn(this)}p(Fe,be),Fe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Fe.prototype.close=function(){Bi(this.g)},Fe.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=bi(o),o=h);c.i.push(new Tf(c.Ya++,o)),c.I==3&&us(c)},Fe.prototype.N=function(){this.g.l=null,delete this.j,Bi(this.g),delete this.g,Fe.Z.N.call(this)};function Nc(o){Ci.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}p(Nc,Ci);function Vc(){Si.call(this),this.status=1}p(Vc,Si);function vn(o){this.g=o}p(vn,kc),vn.prototype.ra=function(){Ne(this.g,"a")},vn.prototype.qa=function(o){Ne(this.g,new Nc(o))},vn.prototype.pa=function(o){Ne(this.g,new Vc)},vn.prototype.oa=function(){Ne(this.g,"b")},ds.prototype.createWebChannel=ds.prototype.g,Fe.prototype.send=Fe.prototype.o,Fe.prototype.open=Fe.prototype.m,Fe.prototype.close=Fe.prototype.close,Ah=function(){return new ds},Th=function(){return rs()},vh=Xt,yo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ss.NO_ERROR=0,ss.TIMEOUT=8,ss.HTTP_ERROR=6,Cs=ss,Ka.COMPLETE="complete",wh=Ka,ja.EventType=Zn,Zn.OPEN="a",Zn.CLOSE="b",Zn.ERROR="c",Zn.MESSAGE="d",be.prototype.listen=be.prototype.J,_r=ja,ce.prototype.listenOnce=ce.prototype.K,ce.prototype.getLastError=ce.prototype.Ha,ce.prototype.getLastErrorCode=ce.prototype.ya,ce.prototype.getStatus=ce.prototype.ca,ce.prototype.getResponseJson=ce.prototype.La,ce.prototype.getResponseText=ce.prototype.la,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Fa,Ih=ce}).apply(typeof gs<"u"?gs:typeof self<"u"?self:typeof window<"u"?window:{});const dl="@firebase/firestore",fl="4.9.3";/**
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
 */class Se{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Se.UNAUTHENTICATED=new Se(null),Se.GOOGLE_CREDENTIALS=new Se("google-credentials-uid"),Se.FIRST_PARTY=new Se("first-party-uid"),Se.MOCK_USER=new Se("mock-user");/**
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
 */let Hn="12.7.0";/**
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
 */const dn=new Uo("@firebase/firestore");function Tn(){return dn.logLevel}function $(n,...e){if(dn.logLevel<=Q.DEBUG){const t=e.map(ea);dn.debug(`Firestore (${Hn}): ${n}`,...t)}}function _t(n,...e){if(dn.logLevel<=Q.ERROR){const t=e.map(ea);dn.error(`Firestore (${Hn}): ${n}`,...t)}}function On(n,...e){if(dn.logLevel<=Q.WARN){const t=e.map(ea);dn.warn(`Firestore (${Hn}): ${n}`,...t)}}function ea(n){if(typeof n=="string")return n;try{/**
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
 */function z(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,bh(n,r,t)}function bh(n,e,t){let r=`FIRESTORE (${Hn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw _t(r),new Error(r)}function Z(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||bh(e,s,r)}function G(n,e){return n}/**
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
 */const N={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends It{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class pt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class d_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Se.UNAUTHENTICATED))}shutdown(){}}class f_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class m_{constructor(e){this.t=e,this.currentUser=Se.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Z(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new pt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new pt,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new pt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Z(typeof r.accessToken=="string",31837,{l:r}),new Ch(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Z(e===null||typeof e=="string",2055,{h:e}),new Se(e)}}class p_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Se.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class g_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new p_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Se.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ml{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class y_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,We(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Z(this.o===void 0,3512);const r=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ml(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Z(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ml(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function __(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class ta{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=__(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function X(n,e){return n<e?-1:n>e?1:0}function _o(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Zi(s)===Zi(i)?X(s,i):Zi(s)?1:-1}return X(n.length,e.length)}const E_=55296,I_=57343;function Zi(n){const e=n.charCodeAt(0);return e>=E_&&e<=I_}function Bn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const pl="__name__";class nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&z(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&z(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof nt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=nt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return X(e.length,t.length)}static compareSegments(e,t){const r=nt.isNumericId(e),s=nt.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?nt.extractNumericId(e).compare(nt.extractNumericId(t)):_o(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ut.fromString(e.substring(4,e.length-2))}}class te extends nt{construct(e,t,r){return new te(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new te(t)}static emptyPath(){return new te([])}}const w_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ve extends nt{construct(e,t,r){return new ve(e,t,r)}static isValidIdentifier(e){return w_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ve.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===pl}static keyField(){return new ve([pl])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new U(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new U(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ve(t)}static emptyPath(){return new ve([])}}/**
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
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(te.fromString(e))}static fromName(e){return new q(te.fromString(e).popFirst(5))}static empty(){return new q(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new te(e.slice()))}}/**
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
 */function Sh(n,e,t){if(!t)throw new U(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function v_(n,e,t,r){if(e===!0&&r===!0)throw new U(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function gl(n){if(!q.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function yl(n){if(q.isDocumentKey(n))throw new U(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Rh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ai(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":z(12329,{type:typeof n})}function qt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ai(n);throw new U(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function pe(n,e){const t={typeString:n};return e&&(t.value=e),t}function Kr(n,e){if(!Rh(n))throw new U(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new U(N.INVALID_ARGUMENT,t);return!0}/**
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
 */const _l=-62135596800,El=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*El);return new se(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<_l)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/El}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Kr(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-_l;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:pe("string",se._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
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
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new se(0,0))}static max(){return new H(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Or=-1;function T_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(r===1e9?new se(t+1,0):new se(t,r));return new jt(s,q.empty(),e)}function A_(n){return new jt(n.readTime,n.key,Or)}class jt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new jt(H.min(),q.empty(),Or)}static max(){return new jt(H.max(),q.empty(),Or)}}function b_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
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
 */const C_="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class S_{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Gn(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==C_)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&z(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):V.reject(t)}static resolve(e){return new V((t,r)=>{t(e)})}static reject(e){return new V((t,r)=>{r(e)})}static waitFor(e){return new V((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=V.resolve(!1);for(const r of e)t=t.next(s=>s?V.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new V((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++l,l===i&&r(a)},f=>s(f))}})}static doWhile(e,t){return new V((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function R_(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Kn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ci{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ci.ce=-1;/**
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
 */const na=-1;function li(n){return n==null}function zs(n){return n===0&&1/n==-1/0}function P_(n){return typeof n=="number"&&Number.isInteger(n)&&!zs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Ph="";function k_(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Il(e)),e=N_(n.get(t),e);return Il(e)}function N_(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Ph:t+="";break;default:t+=i}}return t}function Il(n){return n+Ph+""}/**
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
 */function wl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function mn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function kh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class oe{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new oe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new oe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ys(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ys(this.root,e,this.comparator,!1)}getReverseIterator(){return new ys(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ys(this.root,e,this.comparator,!0)}}class ys{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new we(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw z(43730,{key:this.key,value:this.value});if(this.right.isRed())throw z(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw z(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw z(57766)}get value(){throw z(16141)}get color(){throw z(16727)}get left(){throw z(29726)}get right(){throw z(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class _e{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new vl(this.data.getIterator())}getIteratorFrom(e){return new vl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof _e)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new _e(this.comparator);return t.data=e,t}}class vl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ge{constructor(e){this.fields=e,e.sort(ve.comparator)}static empty(){return new Ge([])}unionWith(e){let t=new _e(ve.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ge(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Bn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Nh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Nh("Invalid base64 string: "+i):i}}(e);return new Te(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const V_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zt(n){if(Z(!!n,39018),typeof n=="string"){let e=0;const t=V_.exec(n);if(Z(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Wt(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
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
 */const Vh="server_timestamp",Dh="__type__",Lh="__previous_value__",Mh="__local_write_time__";function ra(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Dh])==null?void 0:r.stringValue)===Vh}function ui(n){const e=n.mapValue.fields[Lh];return ra(e)?ui(e):e}function Br(n){const e=zt(n.mapValue.fields[Mh].timestampValue);return new se(e.seconds,e.nanos)}/**
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
 */class D_{constructor(e,t,r,s,i,a,l,u,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const Ws="(default)";class Fr{constructor(e,t){this.projectId=e,this.database=t||Ws}static empty(){return new Fr("","")}get isDefaultDatabase(){return this.database===Ws}isEqual(e){return e instanceof Fr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const xh="__type__",L_="__max__",_s={mapValue:{}},Oh="__vector__",Hs="value";function Ht(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ra(n)?4:x_(n)?9007199254740991:M_(n)?10:11:z(28295,{value:n})}function ut(n,e){if(n===e)return!0;const t=Ht(n);if(t!==Ht(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Br(n).isEqual(Br(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=zt(s.timestampValue),l=zt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Wt(s.bytesValue).isEqual(Wt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ue(s.geoPointValue.latitude)===ue(i.geoPointValue.latitude)&&ue(s.geoPointValue.longitude)===ue(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ue(s.integerValue)===ue(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ue(s.doubleValue),l=ue(i.doubleValue);return a===l?zs(a)===zs(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Bn(n.arrayValue.values||[],e.arrayValue.values||[],ut);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(wl(a)!==wl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!ut(a[u],l[u])))return!1;return!0}(n,e);default:return z(52216,{left:n})}}function Ur(n,e){return(n.values||[]).find(t=>ut(t,e))!==void 0}function Fn(n,e){if(n===e)return 0;const t=Ht(n),r=Ht(e);if(t!==r)return X(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ue(i.integerValue||i.doubleValue),u=ue(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return Tl(n.timestampValue,e.timestampValue);case 4:return Tl(Br(n),Br(e));case 5:return _o(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Wt(i),u=Wt(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const f=X(l[d],u[d]);if(f!==0)return f}return X(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=X(ue(i.latitude),ue(a.latitude));return l!==0?l:X(ue(i.longitude),ue(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Al(n.arrayValue,e.arrayValue);case 10:return function(i,a){var E,v,S,R;const l=i.fields||{},u=a.fields||{},d=(E=l[Hs])==null?void 0:E.arrayValue,f=(v=u[Hs])==null?void 0:v.arrayValue,p=X(((S=d==null?void 0:d.values)==null?void 0:S.length)||0,((R=f==null?void 0:f.values)==null?void 0:R.length)||0);return p!==0?p:Al(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===_s.mapValue&&a===_s.mapValue)return 0;if(i===_s.mapValue)return 1;if(a===_s.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const E=_o(u[p],f[p]);if(E!==0)return E;const v=Fn(l[u[p]],d[f[p]]);if(v!==0)return v}return X(u.length,f.length)}(n.mapValue,e.mapValue);default:throw z(23264,{he:t})}}function Tl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=zt(n),r=zt(e),s=X(t.seconds,r.seconds);return s!==0?s:X(t.nanos,r.nanos)}function Al(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Fn(t[s],r[s]);if(i)return i}return X(t.length,r.length)}function Un(n){return Eo(n)}function Eo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=zt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Wt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return q.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=Eo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${Eo(t.fields[a])}`;return s+"}"}(n.mapValue):z(61005,{value:n})}function Ss(n){switch(Ht(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ui(n);return e?16+Ss(e):16;case 5:return 2*n.stringValue.length;case 6:return Wt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+Ss(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return mn(r.fields,(i,a)=>{s+=i.length+Ss(a)}),s}(n.mapValue);default:throw z(13486,{value:n})}}function bl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Io(n){return!!n&&"integerValue"in n}function sa(n){return!!n&&"arrayValue"in n}function Cl(n){return!!n&&"nullValue"in n}function Sl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Rs(n){return!!n&&"mapValue"in n}function M_(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[xh])==null?void 0:r.stringValue)===Oh}function Cr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return mn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Cr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cr(n.arrayValue.values[t]);return e}return{...n}}function x_(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===L_}/**
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
 */class je{constructor(e){this.value=e}static empty(){return new je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Rs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cr(t)}setAll(e){let t=ve.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=Cr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Rs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ut(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Rs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){mn(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new je(Cr(this.value))}}function Bh(n){const e=[];return mn(n.fields,(t,r)=>{const s=new ve([t]);if(Rs(r)){const i=Bh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ge(e)}/**
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
 */class Pe{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Pe(e,0,H.min(),H.min(),H.min(),je.empty(),0)}static newFoundDocument(e,t,r,s){return new Pe(e,1,t,H.min(),r,s,0)}static newNoDocument(e,t){return new Pe(e,2,t,H.min(),H.min(),je.empty(),0)}static newUnknownDocument(e,t){return new Pe(e,3,t,H.min(),H.min(),je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Gs{constructor(e,t){this.position=e,this.inclusive=t}}function Rl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=q.comparator(q.fromName(a.referenceValue),t.key):r=Fn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Pl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ut(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ks{constructor(e,t="asc"){this.field=e,this.dir=t}}function O_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Fh{}class me extends Fh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new F_(e,t,r):t==="array-contains"?new q_(e,r):t==="in"?new j_(e,r):t==="not-in"?new z_(e,r):t==="array-contains-any"?new W_(e,r):new me(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new U_(e,r):new $_(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Fn(t,this.value)):t!==null&&Ht(this.value)===Ht(t)&&this.matchesComparison(Fn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return z(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Xe extends Fh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Xe(e,t)}matches(e){return Uh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Uh(n){return n.op==="and"}function $h(n){return B_(n)&&Uh(n)}function B_(n){for(const e of n.filters)if(e instanceof Xe)return!1;return!0}function wo(n){if(n instanceof me)return n.field.canonicalString()+n.op.toString()+Un(n.value);if($h(n))return n.filters.map(e=>wo(e)).join(",");{const e=n.filters.map(t=>wo(t)).join(",");return`${n.op}(${e})`}}function qh(n,e){return n instanceof me?function(r,s){return s instanceof me&&r.op===s.op&&r.field.isEqual(s.field)&&ut(r.value,s.value)}(n,e):n instanceof Xe?function(r,s){return s instanceof Xe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&qh(a,s.filters[l]),!0):!1}(n,e):void z(19439)}function jh(n){return n instanceof me?function(t){return`${t.field.canonicalString()} ${t.op} ${Un(t.value)}`}(n):n instanceof Xe?function(t){return t.op.toString()+" {"+t.getFilters().map(jh).join(" ,")+"}"}(n):"Filter"}class F_ extends me{constructor(e,t,r){super(e,t,r),this.key=q.fromName(r.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class U_ extends me{constructor(e,t){super(e,"in",t),this.keys=zh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class $_ extends me{constructor(e,t){super(e,"not-in",t),this.keys=zh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function zh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>q.fromName(r.referenceValue))}class q_ extends me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return sa(t)&&Ur(t.arrayValue,this.value)}}class j_ extends me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ur(this.value.arrayValue,t)}}class z_ extends me{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ur(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ur(this.value.arrayValue,t)}}class W_ extends me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!sa(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ur(this.value.arrayValue,r))}}/**
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
 */class H_{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function kl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new H_(n,e,t,r,s,i,a)}function ia(n){const e=G(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>wo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),li(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Un(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Un(r)).join(",")),e.Te=t}return e.Te}function oa(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!O_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!qh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Pl(n.startAt,e.startAt)&&Pl(n.endAt,e.endAt)}function vo(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Qr{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function G_(n,e,t,r,s,i,a,l){return new Qr(n,e,t,r,s,i,a,l)}function aa(n){return new Qr(n)}function Nl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Wh(n){return n.collectionGroup!==null}function Sr(n){const e=G(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new _e(ve.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ks(i,r))}),t.has(ve.keyField().canonicalString())||e.Ie.push(new Ks(ve.keyField(),r))}return e.Ie}function st(n){const e=G(n);return e.Ee||(e.Ee=K_(e,Sr(n))),e.Ee}function K_(n,e){if(n.limitType==="F")return kl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ks(s.field,i)});const t=n.endAt?new Gs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Gs(n.startAt.position,n.startAt.inclusive):null;return kl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function To(n,e){const t=n.filters.concat([e]);return new Qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ao(n,e,t){return new Qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function hi(n,e){return oa(st(n),st(e))&&n.limitType===e.limitType}function Hh(n){return`${ia(st(n))}|lt:${n.limitType}`}function An(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>jh(s)).join(", ")}]`),li(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Un(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Un(s)).join(",")),`Target(${r})`}(st(n))}; limitType=${n.limitType})`}function di(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):q.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of Sr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=Rl(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,Sr(r),s)||r.endAt&&!function(a,l,u){const d=Rl(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,Sr(r),s))}(n,e)}function Q_(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Gh(n){return(e,t)=>{let r=!1;for(const s of Sr(n)){const i=X_(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function X_(n,e,t){const r=n.field.isKeyField()?q.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?Fn(u,d):z(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return z(19790,{direction:n.dir})}}/**
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
 */class pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){mn(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return kh(this.inner)}size(){return this.innerSize}}/**
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
 */const Y_=new oe(q.comparator);function Et(){return Y_}const Kh=new oe(q.comparator);function Er(...n){let e=Kh;for(const t of n)e=e.insert(t.key,t);return e}function Qh(n){let e=Kh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function rn(){return Rr()}function Xh(){return Rr()}function Rr(){return new pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const J_=new oe(q.comparator),Z_=new _e(q.comparator);function Y(...n){let e=Z_;for(const t of n)e=e.add(t);return e}const eE=new _e(X);function tE(){return eE}/**
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
 */function ca(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:zs(e)?"-0":e}}function Yh(n){return{integerValue:""+n}}function nE(n,e){return P_(e)?Yh(e):ca(n,e)}/**
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
 */class fi{constructor(){this._=void 0}}function rE(n,e,t){return n instanceof Qs?function(s,i){const a={fields:{[Dh]:{stringValue:Vh},[Mh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ra(i)&&(i=ui(i)),i&&(a.fields[Lh]=i),{mapValue:a}}(t,e):n instanceof $r?Zh(n,e):n instanceof qr?ed(n,e):function(s,i){const a=Jh(s,i),l=Vl(a)+Vl(s.Ae);return Io(a)&&Io(s.Ae)?Yh(l):ca(s.serializer,l)}(n,e)}function sE(n,e,t){return n instanceof $r?Zh(n,e):n instanceof qr?ed(n,e):t}function Jh(n,e){return n instanceof Xs?function(r){return Io(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Qs extends fi{}class $r extends fi{constructor(e){super(),this.elements=e}}function Zh(n,e){const t=td(e);for(const r of n.elements)t.some(s=>ut(s,r))||t.push(r);return{arrayValue:{values:t}}}class qr extends fi{constructor(e){super(),this.elements=e}}function ed(n,e){let t=td(e);for(const r of n.elements)t=t.filter(s=>!ut(s,r));return{arrayValue:{values:t}}}class Xs extends fi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Vl(n){return ue(n.integerValue||n.doubleValue)}function td(n){return sa(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function iE(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof $r&&s instanceof $r||r instanceof qr&&s instanceof qr?Bn(r.elements,s.elements,ut):r instanceof Xs&&s instanceof Xs?ut(r.Ae,s.Ae):r instanceof Qs&&s instanceof Qs}(n.transform,e.transform)}class oE{constructor(e,t){this.version=e,this.transformResults=t}}class it{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new it}static exists(e){return new it(void 0,e)}static updateTime(e){return new it(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ps(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class mi{}function nd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new sd(n.key,it.none()):new Xr(n.key,n.data,it.none());{const t=n.data,r=je.empty();let s=new _e(ve.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new gn(n.key,r,new Ge(s.toArray()),it.none())}}function aE(n,e,t){n instanceof Xr?function(s,i,a){const l=s.value.clone(),u=Ll(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof gn?function(s,i,a){if(!Ps(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Ll(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(rd(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Pr(n,e,t,r){return n instanceof Xr?function(i,a,l,u){if(!Ps(i.precondition,a))return l;const d=i.value.clone(),f=Ml(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof gn?function(i,a,l,u){if(!Ps(i.precondition,a))return l;const d=Ml(i.fieldTransforms,u,a),f=a.data;return f.setAll(rd(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(i,a,l){return Ps(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function cE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Jh(r.transform,s||null);i!=null&&(t===null&&(t=je.empty()),t.set(r.field,i))}return t||null}function Dl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Bn(r,s,(i,a)=>iE(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Xr extends mi{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class gn extends mi{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function rd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Ll(n,e,t){const r=new Map;Z(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,sE(a,l,t[s]))}return r}function Ml(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,rE(i,a,e))}return r}class sd extends mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class lE extends mi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class uE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&aE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Pr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Pr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Xh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=nd(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&Bn(this.mutations,e.mutations,(t,r)=>Dl(t,r))&&Bn(this.baseMutations,e.baseMutations,(t,r)=>Dl(t,r))}}class la{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Z(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return J_}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new la(e,t,r,s)}}/**
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
 */class hE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class dE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var de,J;function fE(n){switch(n){case N.OK:return z(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return z(15467,{code:n})}}function id(n){if(n===void 0)return _t("GRPC error has no .code"),N.UNKNOWN;switch(n){case de.OK:return N.OK;case de.CANCELLED:return N.CANCELLED;case de.UNKNOWN:return N.UNKNOWN;case de.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case de.INTERNAL:return N.INTERNAL;case de.UNAVAILABLE:return N.UNAVAILABLE;case de.UNAUTHENTICATED:return N.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case de.NOT_FOUND:return N.NOT_FOUND;case de.ALREADY_EXISTS:return N.ALREADY_EXISTS;case de.PERMISSION_DENIED:return N.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case de.ABORTED:return N.ABORTED;case de.OUT_OF_RANGE:return N.OUT_OF_RANGE;case de.UNIMPLEMENTED:return N.UNIMPLEMENTED;case de.DATA_LOSS:return N.DATA_LOSS;default:return z(39323,{code:n})}}(J=de||(de={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function mE(){return new TextEncoder}/**
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
 */const pE=new Ut([4294967295,4294967295],0);function xl(n){const e=mE().encode(n),t=new Eh;return t.update(e),new Uint8Array(t.digest())}function Ol(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ut([t,r],0),new Ut([s,i],0)]}class ua{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ir(`Invalid padding: ${t}`);if(r<0)throw new Ir(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ir(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ir(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ut.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Ut.fromNumber(r)));return s.compare(pE)===1&&(s=new Ut([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=xl(e),[r,s]=Ol(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new ua(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const t=xl(e),[r,s]=Ol(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ir extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class pi{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Yr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new pi(H.min(),s,new oe(X),Et(),Y())}}class Yr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Yr(r,t,Y(),Y(),Y())}}/**
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
 */class ks{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class od{constructor(e,t){this.targetId=e,this.Ce=t}}class ad{constructor(e,t,r=Te.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Bl{constructor(){this.ve=0,this.Fe=Fl(),this.Me=Te.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Y(),t=Y(),r=Y();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:z(38017,{changeType:i})}}),new Yr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Fl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,Z(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class gE{constructor(e){this.Ge=e,this.ze=new Map,this.je=Et(),this.Je=Es(),this.He=Es(),this.Ye=new oe(X)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:z(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(vo(i))if(r===0){const a=new q(i.path);this.et(t,a,Pe.newNoDocument(a,H.min()))}else Z(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Wt(r).toUint8Array()}catch(u){if(u instanceof Nh)return On("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new ua(a,s,i)}catch(u){return On(u instanceof Ir?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const l=this.ot(a);if(l){if(i.current&&vo(l.target)){const u=new q(l.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,Pe.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=Y();this.He.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new pi(e,t,this.Ye,this.je,r);return this.je=Et(),this.Je=Es(),this.He=Es(),this.Ye=new oe(X),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Bl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new _e(X),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new _e(X),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Bl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Es(){return new oe(q.comparator)}function Fl(){return new oe(q.comparator)}const yE={asc:"ASCENDING",desc:"DESCENDING"},_E={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},EE={and:"AND",or:"OR"};class IE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function bo(n,e){return n.useProto3Json||li(e)?e:{value:e}}function Ys(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function wE(n,e){return Ys(n,e.toTimestamp())}function ot(n){return Z(!!n,49232),H.fromTimestamp(function(t){const r=zt(t);return new se(r.seconds,r.nanos)}(n))}function ha(n,e){return Co(n,e).canonicalString()}function Co(n,e){const t=function(s){return new te(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ld(n){const e=te.fromString(n);return Z(md(e),10190,{key:e.toString()}),e}function So(n,e){return ha(n.databaseId,e.path)}function eo(n,e){const t=ld(e);if(t.get(1)!==n.databaseId.projectId)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(hd(t))}function ud(n,e){return ha(n.databaseId,e)}function vE(n){const e=ld(n);return e.length===4?te.emptyPath():hd(e)}function Ro(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function hd(n){return Z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ul(n,e,t){return{name:So(n,e),fields:t.value.mapValue.fields}}function TE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:z(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(Z(f===void 0||typeof f=="string",58123),Te.fromBase64String(f||"")):(Z(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Te.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const f=d.code===void 0?N.UNKNOWN:id(d.code);return new U(f,d.message||"")}(a);t=new ad(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=eo(n,r.document.name),i=ot(r.document.updateTime),a=r.document.createTime?ot(r.document.createTime):H.min(),l=new je({mapValue:{fields:r.document.fields}}),u=Pe.newFoundDocument(s,i,a,l),d=r.targetIds||[],f=r.removedTargetIds||[];t=new ks(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=eo(n,r.document),i=r.readTime?ot(r.readTime):H.min(),a=Pe.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ks([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=eo(n,r.document),i=r.removedTargetIds||[];t=new ks([],i,s,null)}else{if(!("filter"in e))return z(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new dE(s,i),l=r.targetId;t=new od(l,a)}}return t}function AE(n,e){let t;if(e instanceof Xr)t={update:Ul(n,e.key,e.value)};else if(e instanceof sd)t={delete:So(n,e.key)};else if(e instanceof gn)t={update:Ul(n,e.key,e.data),updateMask:DE(e.fieldMask)};else{if(!(e instanceof lE))return z(16599,{Vt:e.type});t={verify:So(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Qs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof $r)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof qr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Xs)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw z(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:wE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:z(27497)}(n,e.precondition)),t}function bE(n,e){return n&&n.length>0?(Z(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?ot(s.updateTime):ot(i);return a.isEqual(H.min())&&(a=ot(i)),new oE(a,s.transformResults||[])}(t,e))):[]}function CE(n,e){return{documents:[ud(n,e.path)]}}function SE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=ud(n,s);const i=function(d){if(d.length!==0)return fd(Xe.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(E){return{field:bn(E.field),direction:kE(E.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=bo(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function RE(n){let e=vE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Z(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const E=dd(p);return E instanceof Xe&&$h(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(E=>function(S){return new Ks(Cn(S.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(E))}(t.orderBy));let l=null;t.limit&&(l=function(p){let E;return E=typeof p=="object"?p.value:p,li(E)?null:E}(t.limit));let u=null;t.startAt&&(u=function(p){const E=!!p.before,v=p.values||[];return new Gs(v,E)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const E=!p.before,v=p.values||[];return new Gs(v,E)}(t.endAt)),G_(e,s,a,i,l,"F",u,d)}function PE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return z(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function dd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Cn(t.unaryFilter.field);return me.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cn(t.unaryFilter.field);return me.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cn(t.unaryFilter.field);return me.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Cn(t.unaryFilter.field);return me.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return z(61313);default:return z(60726)}}(n):n.fieldFilter!==void 0?function(t){return me.create(Cn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return z(58110);default:return z(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Xe.create(t.compositeFilter.filters.map(r=>dd(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return z(1026)}}(t.compositeFilter.op))}(n):z(30097,{filter:n})}function kE(n){return yE[n]}function NE(n){return _E[n]}function VE(n){return EE[n]}function bn(n){return{fieldPath:n.canonicalString()}}function Cn(n){return ve.fromServerFormat(n.fieldPath)}function fd(n){return n instanceof me?function(t){if(t.op==="=="){if(Sl(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NAN"}};if(Cl(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Sl(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NOT_NAN"}};if(Cl(t.value))return{unaryFilter:{field:bn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bn(t.field),op:NE(t.op),value:t.value}}}(n):n instanceof Xe?function(t){const r=t.getFilters().map(s=>fd(s));return r.length===1?r[0]:{compositeFilter:{op:VE(t.op),filters:r}}}(n):z(54877,{filter:n})}function DE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function md(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Lt{constructor(e,t,r,s,i=H.min(),a=H.min(),l=Te.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Lt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Lt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class LE{constructor(e){this.yt=e}}function ME(n){const e=RE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ao(e,e.limit,"L"):e}/**
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
 */class xE{constructor(){this.Cn=new OE}addToCollectionParentIndex(e,t){return this.Cn.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(jt.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(jt.min())}updateCollectionGroup(e,t,r){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class OE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new _e(te.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new _e(te.comparator)).toArray()}}/**
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
 */const $l={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},pd=41943040;class Oe{static withCacheSize(e){return new Oe(e,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Oe.DEFAULT_COLLECTION_PERCENTILE=10,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Oe.DEFAULT=new Oe(pd,Oe.DEFAULT_COLLECTION_PERCENTILE,Oe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Oe.DISABLED=new Oe(-1,0,0);/**
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
 */class $n{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new $n(0)}static cr(){return new $n(-1)}}/**
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
 */const ql="LruGarbageCollector",BE=1048576;function jl([n,e],[t,r]){const s=X(n,t);return s===0?X(e,r):s}class FE{constructor(e){this.Ir=e,this.buffer=new _e(jl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();jl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class UE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){$(ql,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Kn(t)?$(ql,"Ignoring IndexedDB error during garbage collection: ",t):await Gn(t)}await this.Vr(3e5)})}}class $E{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return V.resolve(ci.ce);const r=new FE(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve($l)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),$l):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(d=Date.now(),Tn()<=Q.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function qE(n,e){return new $E(n,e)}/**
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
 */class jE{constructor(){this.changes=new pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?V.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class zE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class WE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Pr(r.mutation,s,Ge.empty(),se.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Y()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Y()){const s=rn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=Er();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=rn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Y()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=Et();const a=Rr(),l=function(){return Rr()}();return t.forEach((u,d)=>{const f=r.get(d.key);s.has(d.key)&&(f===void 0||f.mutation instanceof gn)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),Pr(f.mutation,d,f.mutation.getFieldMask(),se.now())):a.set(d.key,Ge.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>l.set(d,new zE(f,a.get(d)??null))),l))}recalculateAndSaveOverlays(e,t){const r=Rr();let s=new oe((a,l)=>a-l),i=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||Ge.empty();f=l.applyToLocalView(d,f),r.set(u,f);const p=(s.get(l.batchId)||Y()).add(u);s=s.insert(l.batchId,p)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,f=u.value,p=Xh();f.forEach(E=>{if(!i.has(E)){const v=nd(t.get(E),r.get(E));v!==null&&p.set(E,v),i=i.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return V.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return q.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Wh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):V.resolve(rn());let l=Or,u=i;return a.next(d=>V.forEach(d,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(f)?V.resolve():this.remoteDocumentCache.getEntry(e,f).next(E=>{u=u.insert(f,E)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,Y())).next(f=>({batchId:l,changes:Qh(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(r=>{let s=Er();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=Er();return this.indexManager.getCollectionParents(e,i).next(l=>V.forEach(l,u=>{const d=function(p,E){return new Qr(E,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(f=>{f.forEach((p,E)=>{a=a.insert(p,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Pe.newInvalidDocument(f)))});let l=Er();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&Pr(f.mutation,d,Ge.empty(),se.now()),di(t,d)&&(l=l.insert(u,d))}),l})}}/**
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
 */class HE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return V.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:ot(s.createTime)}}(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:ME(s.bundledQuery),readTime:ot(s.readTime)}}(t)),V.resolve()}}/**
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
 */class GE{constructor(){this.overlays=new oe(q.comparator),this.qr=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const r=rn();return V.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),V.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),V.resolve()}getOverlaysForCollection(e,t,r){const s=rn(),i=t.length+1,a=new q(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new oe((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=i.get(d.largestBatchId);f===null&&(f=rn(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const l=rn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>l.set(d,f)),!(l.size()>=s)););return V.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new hE(t,r));let i=this.qr.get(t);i===void 0&&(i=Y(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class KE{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
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
 */class da{constructor(){this.Qr=new _e(Ie.$r),this.Ur=new _e(Ie.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new Ie(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new Ie(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new q(new te([])),r=new Ie(t,e),s=new Ie(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new q(new te([])),r=new Ie(t,e),s=new Ie(t,e+1);let i=Y();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Ie(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ie{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return q.comparator(e.key,t.key)||X(e.Yr,t.Yr)}static Kr(e,t){return X(e.Yr,t.Yr)||q.comparator(e.key,t.key)}}/**
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
 */class QE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new _e(Ie.$r)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new uE(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new Ie(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return V.resolve(a)}lookupMutationBatch(e,t){return V.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?na:this.tr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ie(t,0),s=new Ie(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);i.push(l)}),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new _e(X);return t.forEach(s=>{const i=new Ie(s,0),a=new Ie(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],l=>{r=r.add(l.Yr)})}),V.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;q.isDocumentKey(i)||(i=i.child(""));const a=new Ie(new q(i),0);let l=new _e(X);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.Yr)),!0)},a),V.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Z(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return V.forEach(t.mutations,s=>{const i=new Ie(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new Ie(t,0),s=this.Zr.firstAfterOrEqual(r);return V.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class XE{constructor(e){this.ri=e,this.docs=function(){return new oe(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return V.resolve(r?r.document.mutableCopy():Pe.newInvalidDocument(t))}getEntries(e,t){let r=Et();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Pe.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=Et();const a=t.path,l=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||b_(A_(f),r)<=0||(s.has(f.key)||di(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return V.resolve(i)}getAllFromCollectionGroup(e,t,r,s){z(9500)}ii(e,t){return V.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new YE(this)}getSize(e){return V.resolve(this.size)}}class YE extends jE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),V.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class JE{constructor(e){this.persistence=e,this.si=new pn(t=>ia(t),oa),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new da,this.targetCount=0,this.ai=$n.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),V.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new $n(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.Pr(t),V.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),V.waitFor(i).next(()=>s)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return V.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),V.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),V.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return V.resolve(r)}containsKey(e,t){return V.resolve(this._i.containsKey(t))}}/**
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
 */class gd{constructor(e,t){this.ui={},this.overlays={},this.ci=new ci(0),this.li=!1,this.li=!0,this.hi=new KE,this.referenceDelegate=e(this),this.Pi=new JE(this),this.indexManager=new xE,this.remoteDocumentCache=function(s){return new XE(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new LE(t),this.Ii=new HE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new GE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new QE(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const s=new ZE(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return V.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class ZE extends S_{constructor(e){super(),this.currentSequenceNumber=e}}class fa{constructor(e){this.persistence=e,this.Ri=new da,this.Vi=null}static mi(e){return new fa(e)}get fi(){if(this.Vi)return this.Vi;throw z(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),V.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),V.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.fi,r=>{const s=q.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return V.or([()=>V.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Js{constructor(e,t){this.persistence=e,this.pi=new pn(r=>k_(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=qE(this,t)}static mi(e,t){return new Js(e,t)}Ei(){}di(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return V.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?V.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(l=>{l||(r++,i.removeEntry(a,H.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),V.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),V.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ss(e.data.value)),t}br(e,t,r){return V.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return V.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class ma{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=Y(),s=Y();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ma(e,t.fromCache,r,s)}}/**
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
 */class eI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class tI{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Hm()?8:R_(ke())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new eI;return this.Ss(e,t,a).next(l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(Tn()<=Q.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",An(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),V.resolve()):(Tn()<=Q.DEBUG&&$("QueryEngine","Query:",An(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Tn()<=Q.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",An(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):V.resolve())}ys(e,t){if(Nl(t))return V.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ao(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=Y(...i);return this.ps.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.Ds(t,l);return this.Cs(t,d,a,u.readTime)?this.ys(e,Ao(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,r,s){return Nl(t)||s.isEqual(H.min())?V.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?V.resolve(null):(Tn()<=Q.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),An(t)),this.vs(e,a,t,T_(s,Or)).next(l=>l))})}Ds(e,t){let r=new _e(Gh(e));return t.forEach((s,i)=>{di(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Tn()<=Q.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",An(t)),this.ps.getDocumentsMatchingQuery(e,t,jt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const pa="LocalStore",nI=3e8;class rI{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new oe(X),this.xs=new pn(i=>ia(i),oa),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new WE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function sI(n,e,t,r){return new rI(n,e,t,r)}async function yd(n,e){const t=G(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=Y();for(const d of s){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){l.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:l}))})})}function iI(n,e){const t=G(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,d,f){const p=d.batch,E=p.keys();let v=V.resolve();return E.forEach(S=>{v=v.next(()=>f.getEntry(u,S)).next(R=>{const P=d.docVersions.get(S);Z(P!==null,48541),R.version.compareTo(P)<0&&(p.applyToRemoteDocument(R,d),R.isValidDocument()&&(R.setReadTime(d.commitVersion),f.addEntry(R)))})}),v.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=Y();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function _d(n){const e=G(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function oI(n,e){const t=G(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach((f,p)=>{const E=s.get(p);if(!E)return;l.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p)));let v=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(Te.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,r)),s=s.insert(p,v),function(R,P,D){return R.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=nI?!0:D.addedDocuments.size+D.modifiedDocuments.size+D.removedDocuments.size>0}(E,v,f)&&l.push(t.Pi.updateTargetData(i,v))});let u=Et(),d=Y();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(aI(i,a,e.documentUpdates).next(f=>{u=f.ks,d=f.qs})),!r.isEqual(H.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return V.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=s,i))}function aI(n,e,t){let r=Y(),s=Y();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=Et();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(H.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):$(pa,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:s}})}function cI(n,e){const t=G(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=na),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function lI(n,e){const t=G(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,V.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new Lt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function Po(n,e,t){const r=G(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Kn(a))throw a;$(pa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function zl(n,e,t){const r=G(n);let s=H.min(),i=Y();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=G(u),E=p.xs.get(f);return E!==void 0?V.resolve(p.Ms.get(E)):p.Pi.getTargetData(d,f)}(r,a,st(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:H.min(),t?i:Y())).next(l=>(uI(r,Q_(e),l),{documents:l,Qs:i})))}function uI(n,e,t){let r=n.Os.get(e)||H.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class Wl{constructor(){this.activeTargetIds=tE()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class hI{constructor(){this.Mo=new Wl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Wl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class dI{Oo(e){}shutdown(){}}/**
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
 */const Hl="ConnectivityMonitor";class Gl{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){$(Hl,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){$(Hl,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Is=null;function ko(){return Is===null?Is=function(){return 268435456+Math.round(2147483648*Math.random())}():Is++,"0x"+Is.toString(16)}/**
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
 */const to="RestConnection",fI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class mI{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Ws?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=ko(),l=this.zo(e,t.toUriEncodedString());$(to,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:d}=new URL(l),f=jn(d);return this.Jo(e,l,u,r,f).then(p=>($(to,`Received RPC '${e}' ${a}: `,p),p),p=>{throw On(to,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Hn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=fI[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class pI{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ce="WebChannelConnection";class gI extends mI{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=ko();return new Promise((l,u)=>{const d=new Ih;d.setWithCredentials(!0),d.listenOnce(wh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Cs.NO_ERROR:const p=d.getResponseJson();$(Ce,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case Cs.TIMEOUT:$(Ce,`RPC '${e}' ${a} timed out`),u(new U(N.DEADLINE_EXCEEDED,"Request time out"));break;case Cs.HTTP_ERROR:const E=d.getStatus();if($(Ce,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let v=d.getResponseJson();Array.isArray(v)&&(v=v[0]);const S=v==null?void 0:v.error;if(S&&S.status&&S.message){const R=function(D){const M=D.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(M)>=0?M:N.UNKNOWN}(S.status);u(new U(R,S.message))}else u(new U(N.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new U(N.UNAVAILABLE,"Connection failed."));break;default:z(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{$(Ce,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(s);$(Ce,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",f,r,15)})}T_(e,t,r){const s=ko(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ah(),l=Th(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");$(Ce,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.I_(p);let E=!1,v=!1;const S=new pI({Yo:P=>{v?$(Ce,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(E||($(Ce,`Opening RPC '${e}' stream ${s} transport.`),p.open(),E=!0),$(Ce,`RPC '${e}' stream ${s} sending:`,P),p.send(P))},Zo:()=>p.close()}),R=(P,D,M)=>{P.listen(D,x=>{try{M(x)}catch(F){setTimeout(()=>{throw F},0)}})};return R(p,_r.EventType.OPEN,()=>{v||($(Ce,`RPC '${e}' stream ${s} transport opened.`),S.o_())}),R(p,_r.EventType.CLOSE,()=>{v||(v=!0,$(Ce,`RPC '${e}' stream ${s} transport closed`),S.a_(),this.E_(p))}),R(p,_r.EventType.ERROR,P=>{v||(v=!0,On(Ce,`RPC '${e}' stream ${s} transport errored. Name:`,P.name,"Message:",P.message),S.a_(new U(N.UNAVAILABLE,"The operation could not be completed")))}),R(p,_r.EventType.MESSAGE,P=>{var D;if(!v){const M=P.data[0];Z(!!M,16349);const x=M,F=(x==null?void 0:x.error)||((D=x[0])==null?void 0:D.error);if(F){$(Ce,`RPC '${e}' stream ${s} received error:`,F);const L=F.status;let O=function(y){const T=de[y];if(T!==void 0)return id(T)}(L),_=F.message;O===void 0&&(O=N.INTERNAL,_="Unknown error status: "+L+" with message "+F.message),v=!0,S.a_(new U(O,_)),p.close()}else $(Ce,`RPC '${e}' stream ${s} received:`,M),S.u_(M)}}),R(l,vh.STAT_EVENT,P=>{P.stat===yo.PROXY?$(Ce,`RPC '${e}' stream ${s} detected buffering proxy`):P.stat===yo.NOPROXY&&$(Ce,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.__()},0),S}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function no(){return typeof document<"u"?document:null}/**
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
 */function gi(n){return new IE(n,!0)}/**
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
 */class Ed{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&$("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const Kl="PersistentStream";class Id{constructor(e,t,r,s,i,a,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Ed(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(_t(t.toString()),_t("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new U(N.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return $(Kl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():($(Kl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class yI extends Id{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=TE(this.serializer,e),r=function(i){if(!("targetChange"in i))return H.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?ot(a.readTime):H.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Ro(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=vo(u)?{documents:CE(i,u)}:{query:SE(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=cd(i,a.resumeToken);const d=bo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(H.min())>0){l.readTime=Ys(i,a.snapshotVersion.toTimestamp());const d=bo(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=PE(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Ro(this.serializer),t.removeTarget=e,this.q_(t)}}class _I extends Id{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return Z(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Z(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){Z(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=bE(e.writeResults,e.commitTime),r=ot(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Ro(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>AE(this.serializer,r))};this.q_(t)}}/**
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
 */class EI{}class II extends EI{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,Co(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new U(N.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(e,Co(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(N.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class wI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(_t(t),this.aa=!1):$("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const fn="RemoteStore";class vI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{yn(this)&&($(fn,"Restarting streams for network reachability change."),await async function(u){const d=G(u);d.Ea.add(4),await Jr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await yi(d)}(this))})}),this.Ra=new wI(r,s)}}async function yi(n){if(yn(n))for(const e of n.da)await e(!0)}async function Jr(n){for(const e of n.da)await e(!1)}function wd(n,e){const t=G(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ea(t)?_a(t):Qn(t).O_()&&ya(t,e))}function ga(n,e){const t=G(n),r=Qn(t);t.Ia.delete(e),r.O_()&&vd(t,e),t.Ia.size===0&&(r.O_()?r.L_():yn(t)&&t.Ra.set("Unknown"))}function ya(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Qn(n).Y_(e)}function vd(n,e){n.Va.Ue(e),Qn(n).Z_(e)}function _a(n){n.Va=new gE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Qn(n).start(),n.Ra.ua()}function Ea(n){return yn(n)&&!Qn(n).x_()&&n.Ia.size>0}function yn(n){return G(n).Ea.size===0}function Td(n){n.Va=void 0}async function TI(n){n.Ra.set("Online")}async function AI(n){n.Ia.forEach((e,t)=>{ya(n,e)})}async function bI(n,e){Td(n),Ea(n)?(n.Ra.ha(e),_a(n)):n.Ra.set("Unknown")}async function CI(n,e,t){if(n.Ra.set("Online"),e instanceof ad&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))}(n,e)}catch(r){$(fn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Zs(n,r)}else if(e instanceof ks?n.Va.Ze(e):e instanceof od?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await _d(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(d);f&&i.Ia.set(d,f.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Te.EMPTY_BYTE_STRING,f.snapshotVersion)),vd(i,u);const p=new Lt(f.target,u,d,f.sequenceNumber);ya(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){$(fn,"Failed to raise snapshot:",r),await Zs(n,r)}}async function Zs(n,e,t){if(!Kn(e))throw e;n.Ea.add(1),await Jr(n),n.Ra.set("Offline"),t||(t=()=>_d(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(fn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await yi(n)})}function Ad(n,e){return e().catch(t=>Zs(n,t,e))}async function _i(n){const e=G(n),t=Gt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:na;for(;SI(e);)try{const s=await cI(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,RI(e,s)}catch(s){await Zs(e,s)}bd(e)&&Cd(e)}function SI(n){return yn(n)&&n.Ta.length<10}function RI(n,e){n.Ta.push(e);const t=Gt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function bd(n){return yn(n)&&!Gt(n).x_()&&n.Ta.length>0}function Cd(n){Gt(n).start()}async function PI(n){Gt(n).ra()}async function kI(n){const e=Gt(n);for(const t of n.Ta)e.ea(t.mutations)}async function NI(n,e,t){const r=n.Ta.shift(),s=la.from(r,e,t);await Ad(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await _i(n)}async function VI(n,e){e&&Gt(n).X_&&await async function(r,s){if(function(a){return fE(a)&&a!==N.ABORTED}(s.code)){const i=r.Ta.shift();Gt(r).B_(),await Ad(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await _i(r)}}(n,e),bd(n)&&Cd(n)}async function Ql(n,e){const t=G(n);t.asyncQueue.verifyOperationInProgress(),$(fn,"RemoteStore received new credentials");const r=yn(t);t.Ea.add(3),await Jr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await yi(t)}async function DI(n,e){const t=G(n);e?(t.Ea.delete(2),await yi(t)):e||(t.Ea.add(2),await Jr(t),t.Ra.set("Unknown"))}function Qn(n){return n.ma||(n.ma=function(t,r,s){const i=G(t);return i.sa(),new yI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:TI.bind(null,n),t_:AI.bind(null,n),r_:bI.bind(null,n),H_:CI.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Ea(n)?_a(n):n.Ra.set("Unknown")):(await n.ma.stop(),Td(n))})),n.ma}function Gt(n){return n.fa||(n.fa=function(t,r,s){const i=G(t);return i.sa(),new _I(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:PI.bind(null,n),r_:VI.bind(null,n),ta:kI.bind(null,n),na:NI.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await _i(n)):(await n.fa.stop(),n.Ta.length>0&&($(fn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class Ia{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new Ia(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wa(n,e){if(_t("AsyncQueue",`${e}: ${n}`),Kn(n))return new U(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Vn{static emptySet(e){return new Vn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||q.comparator(t.key,r.key):(t,r)=>q.comparator(t.key,r.key),this.keyedMap=Er(),this.sortedSet=new oe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Vn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Vn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Xl{constructor(){this.ga=new oe(q.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):z(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class qn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new qn(e,t,Vn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&hi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class LI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class MI{constructor(){this.queries=Yl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=G(t),i=s.queries;s.queries=Yl(),i.forEach((a,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new U(N.ABORTED,"Firestore shutting down"))}}function Yl(){return new pn(n=>Hh(n),hi)}async function Sd(n,e){const t=G(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new LI,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=wa(a,`Initialization of query '${An(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&va(t)}async function Rd(n,e){const t=G(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function xI(n,e){const t=G(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&va(t)}function OI(n,e,t){const r=G(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function va(n){n.Ca.forEach(e=>{e.next()})}var No,Jl;(Jl=No||(No={})).Ma="default",Jl.Cache="cache";class Pd{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new qn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=qn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==No.Cache}}/**
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
 */class kd{constructor(e){this.key=e}}class Nd{constructor(e){this.key=e}}class BI{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Y(),this.mutatedKeys=Y(),this.eu=Gh(e),this.tu=new Vn(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Xl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const E=s.get(f),v=di(this.query,p)?p:null,S=!!E&&this.mutatedKeys.has(E.key),R=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let P=!1;E&&v?E.data.isEqual(v.data)?S!==R&&(r.track({type:3,doc:v}),P=!0):this.su(E,v)||(r.track({type:2,doc:v}),P=!0,(u&&this.eu(v,u)>0||d&&this.eu(v,d)<0)&&(l=!0)):!E&&v?(r.track({type:0,doc:v}),P=!0):E&&!v&&(r.track({type:1,doc:E}),P=!0,(u||d)&&(l=!0)),P&&(v?(a=a.add(v),i=R?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(v,S){const R=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return z(20277,{Rt:P})}};return R(v)-R(S)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new qn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Xl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Y(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Nd(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new kd(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=Y();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return qn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ta="SyncEngine";class FI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class UI{constructor(e){this.key=e,this.hu=!1}}class $I{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new pn(l=>Hh(l),hi),this.Iu=new Map,this.Eu=new Set,this.du=new oe(q.comparator),this.Au=new Map,this.Ru=new da,this.Vu={},this.mu=new Map,this.fu=$n.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function qI(n,e,t=!0){const r=Od(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Vd(r,e,t,!0),s}async function jI(n,e){const t=Od(n);await Vd(t,e,!0,!1)}async function Vd(n,e,t,r){const s=await lI(n.localStore,st(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await zI(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&wd(n.remoteStore,s),l}async function zI(n,e,t,r,s){n.pu=(p,E,v)=>async function(R,P,D,M){let x=P.view.ru(D);x.Cs&&(x=await zl(R.localStore,P.query,!1).then(({documents:_})=>P.view.ru(_,x)));const F=M&&M.targetChanges.get(P.targetId),L=M&&M.targetMismatches.get(P.targetId)!=null,O=P.view.applyChanges(x,R.isPrimaryClient,F,L);return eu(R,P.targetId,O.au),O.snapshot}(n,p,E,v);const i=await zl(n.localStore,e,!0),a=new BI(e,i.Qs),l=a.ru(i.documents),u=Yr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);eu(n,t,d.au);const f=new FI(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function WI(n,e,t){const r=G(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!hi(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Po(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ga(r.remoteStore,s.targetId),Vo(r,s.targetId)}).catch(Gn)):(Vo(r,s.targetId),await Po(r.localStore,s.targetId,!0))}async function HI(n,e){const t=G(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ga(t.remoteStore,r.targetId))}async function GI(n,e,t){const r=ew(n);try{const s=await function(a,l){const u=G(a),d=se.now(),f=l.reduce((v,S)=>v.add(S.key),Y());let p,E;return u.persistence.runTransaction("Locally write mutations","readwrite",v=>{let S=Et(),R=Y();return u.Ns.getEntries(v,f).next(P=>{S=P,S.forEach((D,M)=>{M.isValidDocument()||(R=R.add(D))})}).next(()=>u.localDocuments.getOverlayedDocuments(v,S)).next(P=>{p=P;const D=[];for(const M of l){const x=cE(M,p.get(M.key).overlayedDocument);x!=null&&D.push(new gn(M.key,x,Bh(x.value.mapValue),it.exists(!0)))}return u.mutationQueue.addMutationBatch(v,d,D,l)}).next(P=>{E=P;const D=P.applyToLocalDocumentSet(p,R);return u.documentOverlayCache.saveOverlays(v,P.batchId,D)})}).then(()=>({batchId:E.batchId,changes:Qh(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new oe(X)),d=d.insert(l,u),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await Zr(r,s.changes),await _i(r.remoteStore)}catch(s){const i=wa(s,"Failed to persist write");t.reject(i)}}async function Dd(n,e){const t=G(n);try{const r=await oI(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(Z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?Z(a.hu,14607):s.removedDocuments.size>0&&(Z(a.hu,42227),a.hu=!1))}),await Zr(t,r,e)}catch(r){await Gn(r)}}function Zl(n,e,t){const r=G(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=G(a);u.onlineState=l;let d=!1;u.queries.forEach((f,p)=>{for(const E of p.Sa)E.va(l)&&(d=!0)}),d&&va(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function KI(n,e,t){const r=G(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new oe(q.comparator);a=a.insert(i,Pe.newNoDocument(i,H.min()));const l=Y().add(i),u=new pi(H.min(),new Map,new oe(X),a,l);await Dd(r,u),r.du=r.du.remove(i),r.Au.delete(e),Aa(r)}else await Po(r.localStore,e,!1).then(()=>Vo(r,e,t)).catch(Gn)}async function QI(n,e){const t=G(n),r=e.batch.batchId;try{const s=await iI(t.localStore,e);Md(t,r,null),Ld(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Zr(t,s)}catch(s){await Gn(s)}}async function XI(n,e,t){const r=G(n);try{const s=await function(a,l){const u=G(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,l).next(p=>(Z(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(r.localStore,e);Md(r,e,t),Ld(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Zr(r,s)}catch(s){await Gn(s)}}function Ld(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Md(n,e,t){const r=G(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Vo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||xd(n,r)})}function xd(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(ga(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Aa(n))}function eu(n,e,t){for(const r of t)r instanceof kd?(n.Ru.addReference(r.key,e),YI(n,r)):r instanceof Nd?($(Ta,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||xd(n,r.key)):z(19791,{wu:r})}function YI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||($(Ta,"New document in limbo: "+t),n.Eu.add(r),Aa(n))}function Aa(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new q(te.fromString(e)),r=n.fu.next();n.Au.set(r,new UI(t)),n.du=n.du.insert(t,r),wd(n.remoteStore,new Lt(st(aa(t.path)),r,"TargetPurposeLimboResolution",ci.ce))}}async function Zr(n,e,t){const r=G(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{a.push(r.pu(u,e,t).then(d=>{var f;if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){s.push(d);const p=ma.As(u.targetId,d);i.push(p)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(u,d){const f=G(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>V.forEach(d,E=>V.forEach(E.Es,v=>f.persistence.referenceDelegate.addReference(p,E.targetId,v)).next(()=>V.forEach(E.ds,v=>f.persistence.referenceDelegate.removeReference(p,E.targetId,v)))))}catch(p){if(!Kn(p))throw p;$(pa,"Failed to update sequence numbers: "+p)}for(const p of d){const E=p.targetId;if(!p.fromCache){const v=f.Ms.get(E),S=v.snapshotVersion,R=v.withLastLimboFreeSnapshotVersion(S);f.Ms=f.Ms.insert(E,R)}}}(r.localStore,i))}async function JI(n,e){const t=G(n);if(!t.currentUser.isEqual(e)){$(Ta,"User change. New user:",e.toKey());const r=await yd(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new U(N.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Zr(t,r.Ls)}}function ZI(n,e){const t=G(n),r=t.Au.get(e);if(r&&r.hu)return Y().add(r.key);{let s=Y();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function Od(n){const e=G(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=ZI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=KI.bind(null,e),e.Pu.H_=xI.bind(null,e.eventManager),e.Pu.yu=OI.bind(null,e.eventManager),e}function ew(n){const e=G(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=QI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=XI.bind(null,e),e}class ei{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=gi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return sI(this.persistence,new tI,e.initialUser,this.serializer)}Cu(e){return new gd(fa.mi,this.serializer)}Du(e){return new hI}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ei.provider={build:()=>new ei};class tw extends ei{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){Z(this.persistence.referenceDelegate instanceof Js,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new UE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Oe.withCacheSize(this.cacheSizeBytes):Oe.DEFAULT;return new gd(r=>Js.mi(r,t),this.serializer)}}class Do{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Zl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=JI.bind(null,this.syncEngine),await DI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new MI}()}createDatastore(e){const t=gi(e.databaseInfo.databaseId),r=function(i){return new gI(i)}(e.databaseInfo);return function(i,a,l,u){return new II(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new vI(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Zl(this.syncEngine,t,0),function(){return Gl.v()?new Gl:new dI}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,f){const p=new $I(s,i,a,l,u,d);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=G(s);$(fn,"RemoteStore shutting down."),i.Ea.add(5),await Jr(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Do.provider={build:()=>new Do};/**
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
 */class Bd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):_t("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Kt="FirestoreClient";class nw{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Se.UNAUTHENTICATED,this.clientId=ta.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{$(Kt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>($(Kt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=wa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ro(n,e){n.asyncQueue.verifyOperationInProgress(),$(Kt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await yd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function tu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await rw(n);$(Kt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Ql(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Ql(e.remoteStore,s)),n._onlineComponents=e}async function rw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Kt,"Using user provided OfflineComponentProvider");try{await ro(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===N.FAILED_PRECONDITION||s.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;On("Error using user provided cache. Falling back to memory cache: "+t),await ro(n,new ei)}}else $(Kt,"Using default OfflineComponentProvider"),await ro(n,new tw(void 0));return n._offlineComponents}async function Fd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Kt,"Using user provided OnlineComponentProvider"),await tu(n,n._uninitializedComponentsProvider._online)):($(Kt,"Using default OnlineComponentProvider"),await tu(n,new Do))),n._onlineComponents}function sw(n){return Fd(n).then(e=>e.syncEngine)}async function Ud(n){const e=await Fd(n),t=e.eventManager;return t.onListen=qI.bind(null,e.syncEngine),t.onUnlisten=WI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=jI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=HI.bind(null,e.syncEngine),t}function iw(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const f=new Bd({next:E=>{f.Nu(),a.enqueueAndForget(()=>Rd(i,p));const v=E.docs.has(l);!v&&E.fromCache?d.reject(new U(N.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&E.fromCache&&u&&u.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),p=new Pd(aa(l.path),f,{includeMetadataChanges:!0,qa:!0});return Sd(i,p)}(await Ud(n),n.asyncQueue,e,t,r)),r.promise}function ow(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const f=new Bd({next:E=>{f.Nu(),a.enqueueAndForget(()=>Rd(i,p)),E.fromCache&&u.source==="server"?d.reject(new U(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),p=new Pd(l,f,{includeMetadataChanges:!0,qa:!0});return Sd(i,p)}(await Ud(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function $d(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const nu=new Map;/**
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
 */const qd="firestore.googleapis.com",ru=!0;class su{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=qd,this.ssl=ru}else this.host=e.host,this.ssl=e.ssl??ru;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=pd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<BE)throw new U(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}v_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$d(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new U(N.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ei{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new su({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new su(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new d_;switch(r.type){case"firstParty":return new g_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=nu.get(t);r&&($("ComponentProvider","Removing Datastore"),nu.delete(t),r.terminate())}(this),Promise.resolve()}}function aw(n,e,t,r={}){var d;n=qt(n,Ei);const s=jn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(Lu(`https://${l}`),Mu("Firestore",!0)),i.host!==qd&&i.host!==l&&On("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!ln(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Se.MOCK_USER;else{f=Om(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new U(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Se(E)}n._authCredentials=new f_(new Ch(f,p))}}/**
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
 */class Xn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Xn(this.firestore,e,this._query)}}class ge{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new $t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ge(this.firestore,e,this._key)}toJSON(){return{type:ge._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Kr(t,ge._jsonSchema))return new ge(e,r||null,new q(te.fromString(t.referencePath)))}}ge._jsonSchemaVersion="firestore/documentReference/1.0",ge._jsonSchema={type:pe("string",ge._jsonSchemaVersion),referencePath:pe("string")};class $t extends Xn{constructor(e,t,r){super(e,t,aa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ge(this.firestore,null,new q(e))}withConverter(e){return new $t(this.firestore,e,this._path)}}function jd(n,e,...t){if(n=xe(n),Sh("collection","path",e),n instanceof Ei){const r=te.fromString(e,...t);return yl(r),new $t(n,null,r)}{if(!(n instanceof ge||n instanceof $t))throw new U(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return yl(r),new $t(n.firestore,null,r)}}function Ii(n,e,...t){if(n=xe(n),arguments.length===1&&(e=ta.newId()),Sh("doc","path",e),n instanceof Ei){const r=te.fromString(e,...t);return gl(r),new ge(n,null,new q(r))}{if(!(n instanceof ge||n instanceof $t))throw new U(N.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(te.fromString(e,...t));return gl(r),new ge(n.firestore,n instanceof $t?n.converter:null,new q(r))}}/**
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
 */const iu="AsyncQueue";class ou{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Ed(this,"async_queue_retry"),this._c=()=>{const r=no();r&&$(iu,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=no();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=no();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new pt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Kn(e))throw e;$(iu,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,_t("INTERNAL UNHANDLED ERROR: ",au(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Ia.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&z(47125,{Pc:au(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function au(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class es extends Ei{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new ou,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ou(e),this._firestoreClient=void 0,await e}}}function cw(n,e){const t=typeof n=="object"?n:Fu(),r=typeof n=="string"?n:Ws,s=qo(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Mm("firestore");i&&aw(s,...i)}return s}function ba(n){if(n._terminated)throw new U(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||lw(n),n._firestoreClient}function lw(n){var r,s,i;const e=n._freezeSettings(),t=function(l,u,d,f){return new D_(l,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,$d(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new nw(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze(Te.fromBase64String(e))}catch(t){throw new U(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Kr(e,ze._jsonSchema))return ze.fromBase64String(e.bytes)}}ze._jsonSchemaVersion="firestore/bytes/1.0",ze._jsonSchema={type:pe("string",ze._jsonSchemaVersion),bytes:pe("string")};/**
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
 */class Ca{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class zd{constructor(e){this._methodName=e}}/**
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
 */class at{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:at._jsonSchemaVersion}}static fromJSON(e){if(Kr(e,at._jsonSchema))return new at(e.latitude,e.longitude)}}at._jsonSchemaVersion="firestore/geoPoint/1.0",at._jsonSchema={type:pe("string",at._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
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
 */class ct{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ct._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Kr(e,ct._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ct(e.vectorValues);throw new U(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ct._jsonSchemaVersion="firestore/vectorValue/1.0",ct._jsonSchema={type:pe("string",ct._jsonSchemaVersion),vectorValues:pe("object")};/**
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
 */const uw=/^__.*__$/;class hw{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new gn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Xr(e,this.data,t,this.fieldTransforms)}}function Wd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw z(40011,{Ac:n})}}class Sa{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Sa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ti(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Wd(this.Ac)&&uw.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class dw{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||gi(e)}Cc(e,t,r,s=!1){return new Sa({Ac:e,methodName:t,Dc:r,path:ve.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ra(n){const e=n._freezeSettings(),t=gi(n._databaseId);return new dw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Hd(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);Qd("Data must be an object, but it was:",a,r);const l=Gd(r,a);let u,d;if(i.merge)u=new Ge(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const E=mw(e,p,t);if(!a.contains(E))throw new U(N.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);gw(f,E)||f.push(E)}u=new Ge(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new hw(new je(l),u,d)}function fw(n,e,t,r=!1){return Pa(t,n.Cc(r?4:3,e))}function Pa(n,e){if(Kd(n=xe(n)))return Qd("Unsupported field value:",e,n),Gd(n,e);if(n instanceof zd)return function(r,s){if(!Wd(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=Pa(l,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=xe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return nE(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=se.fromDate(r);return{timestampValue:Ys(s.serializer,i)}}if(r instanceof se){const i=new se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ys(s.serializer,i)}}if(r instanceof at)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ze)return{bytesValue:cd(s.serializer,r._byteString)};if(r instanceof ge){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ha(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof ct)return function(a,l){return{mapValue:{fields:{[xh]:{stringValue:Oh},[Hs]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return ca(l.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${ai(r)}`)}(n,e)}function Gd(n,e){const t={};return kh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):mn(n,(r,s)=>{const i=Pa(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function Kd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof at||n instanceof ze||n instanceof ge||n instanceof zd||n instanceof ct)}function Qd(n,e,t){if(!Kd(t)||!Rh(t)){const r=ai(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function mw(n,e,t){if((e=xe(e))instanceof Ca)return e._internalPath;if(typeof e=="string")return Xd(n,e);throw ti("Field path arguments must be of type string or ",n,!1,void 0,t)}const pw=new RegExp("[~\\*/\\[\\]]");function Xd(n,e,t){if(e.search(pw)>=0)throw ti(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ca(...e.split("."))._internalPath}catch{throw ti(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ti(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new U(N.INVALID_ARGUMENT,l+n+u)}function gw(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class Yd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ge(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new yw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ka("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class yw extends Yd{data(){return super.data()}}function ka(n,e){return typeof e=="string"?Xd(n,e):e instanceof Ca?e._internalPath:e._delegate._internalPath}/**
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
 */function _w(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Na{}class Ew extends Na{}function Iw(n,e,...t){let r=[];e instanceof Na&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof Va).length,l=i.filter(u=>u instanceof wi).length;if(a>1||a>0&&l>0)throw new U(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class wi extends Ew{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new wi(e,t,r)}_apply(e){const t=this._parse(e);return Jd(e._query,t),new Xn(e.firestore,e.converter,To(e._query,t))}_parse(e){const t=Ra(e.firestore);return function(i,a,l,u,d,f,p){let E;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new U(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){lu(p,f);const S=[];for(const R of p)S.push(cu(u,i,R));E={arrayValue:{values:S}}}else E=cu(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||lu(p,f),E=fw(l,a,p,f==="in"||f==="not-in");return me.create(d,f,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ww(n,e,t){const r=e,s=ka("where",n);return wi._create(s,r,t)}class Va extends Na{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Va(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)Jd(a,u),a=To(a,u)}(e._query,t),new Xn(e.firestore,e.converter,To(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function cu(n,e,t){if(typeof(t=xe(t))=="string"){if(t==="")throw new U(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Wh(e)&&t.indexOf("/")!==-1)throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(te.fromString(t));if(!q.isDocumentKey(r))throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return bl(n,new q(r))}if(t instanceof ge)return bl(n,t._key);throw new U(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ai(t)}.`)}function lu(n,e){if(!Array.isArray(n)||n.length===0)throw new U(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Jd(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class vw{convertValue(e,t="none"){switch(Ht(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Wt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw z(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return mn(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Hs].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ue(a.doubleValue));return new ct(t)}convertGeoPoint(e){return new at(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ui(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Br(e));default:return null}}convertTimestamp(e){const t=zt(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=te.fromString(e);Z(md(r),9688,{name:e});const s=new Fr(r.get(1),r.get(3)),i=new q(r.popFirst(5));return s.isEqual(t)||_t(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Zd(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class wr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class cn extends Yd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ns(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ka("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=cn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}cn._jsonSchemaVersion="firestore/documentSnapshot/1.0",cn._jsonSchema={type:pe("string",cn._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class Ns extends cn{data(e={}){return super.data(e)}}class Dn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new wr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ns(this._firestore,this._userDataWriter,r.key,r,new wr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new Ns(s._firestore,s._userDataWriter,l.doc.key,l.doc,new wr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Ns(s._firestore,s._userDataWriter,l.doc.key,l.doc,new wr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,f=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:Tw(l.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Dn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ta.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Tw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return z(61501,{type:n})}}/**
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
 */function ef(n){n=qt(n,ge);const e=qt(n.firestore,es);return iw(ba(e),n._key).then(t=>Sw(e,n,t))}Dn._jsonSchemaVersion="firestore/querySnapshot/1.0",Dn._jsonSchema={type:pe("string",Dn._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};class tf extends vw{constructor(e){super(),this.firestore=e}convertBytes(e){return new ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ge(this.firestore,null,t)}}function Aw(n){n=qt(n,Xn);const e=qt(n.firestore,es),t=ba(e),r=new tf(e);return _w(n._query),ow(t,n._query).then(s=>new Dn(e,r,n,s))}function bw(n,e,t){n=qt(n,ge);const r=qt(n.firestore,es),s=Zd(n.converter,e,t);return nf(r,[Hd(Ra(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,it.none())])}function Cw(n,e){const t=qt(n.firestore,es),r=Ii(n),s=Zd(n.converter,e);return nf(t,[Hd(Ra(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,it.exists(!1))]).then(()=>r)}function nf(n,e){return function(r,s){const i=new pt;return r.asyncQueue.enqueueAndForget(async()=>GI(await sw(r),s,i)),i.promise}(ba(n),e)}function Sw(n,e,t){const r=t.docs.get(e._key),s=new tf(n);return new cn(n,s,e._key,r,new wr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Hn=s})(zn),Mn(new un("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new es(new m_(r.getProvider("auth-internal")),new y_(a,r.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fr(d.options.projectId,f)}(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Ft(dl,fl,e),Ft(dl,fl,"esm2020")})();const Rw={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},rf=Bu(Rw),Ke=u_(rf);ah(Ke,Yo).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const ts=cw(rf),Pw=new dt,kw="./data.csv";window.initUI=lf;window.setGridSize=Vs;document.addEventListener("DOMContentLoaded",()=>{const n=(e,t)=>{try{t()}catch(r){console.error(`Initialization failed for ${e}:`,r)}};n("Collection State",Vw),n("Spares",Dw),n("Filters",Lw),n("Tab Navigation",Uw),n("Switch Tab",()=>vr(A.currentTab)),n("Collection Filters",Ma),n("Auth",Fw),n("Event Banner",$w),n("Blueprint Submission",qw),n("Wrapped",zw),n("Announcements",Ww),n("Context Menu",av),n("Data Loading",rv)});const mr="./images/",Nw="./icons/",ht=new Map;function Lo(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['’]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const uu={Light_Stick__Any_Color:"Blue_Light_Stick"},sf="arc_collection_v1";function Vw(){try{const n=localStorage.getItem(sf);if(n){const e=JSON.parse(n);Array.isArray(e)?A.collectedItems=new Set(e):(e.collected&&(A.collectedItems=new Set(e.collected)),e.wishlist&&(A.wishlistedItems=new Set(e.wishlist)))}}catch(n){console.error("Failed to load collection state:",n)}}function kr(){try{const n={collected:Array.from(A.collectedItems),wishlist:Array.from(A.wishlistedItems)};localStorage.setItem(sf,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const of="arc_spares_v1";function Dw(){try{const n=localStorage.getItem(of);n&&(A.spares=JSON.parse(n))}catch(n){console.error("Failed to load spares:",n)}}function hu(){try{localStorage.setItem(of,JSON.stringify(A.spares))}catch(n){console.error("Failed to save spares:",n)}}const af="arc_filters_v1";function Me(){try{const n={rarities:Array.from(A.filters.rarities),types:Array.from(A.filters.types),maps:Array.from(A.filters.maps),conds:Array.from(A.filters.conds),confs:Array.from(A.filters.confs),collected:A.filters.collected,sort:A.filters.sort};localStorage.setItem(af,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function Lw(){try{const n=localStorage.getItem(af);if(n){const e=JSON.parse(n);e.rarities&&(A.filters.rarities=new Set(e.rarities)),e.types&&(A.filters.types=new Set(e.types)),e.maps&&(A.filters.maps=new Set(e.maps)),e.conds&&(A.filters.conds=new Set(e.conds)),e.confs&&(A.filters.confs=new Set(e.confs)),e.collected&&(A.filters.collected=e.collected),e.sort&&(A.filters.sort=e.sort)}}catch(n){console.error("Failed to load filters:",n)}}function Nr(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(s=>s.remove());const t=A.collectedItems.has(e),r=A.wishlistedItems.has(e);if(t){const s=document.createElement("div");s.className="collected-badge",s.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(s);const i=document.createElement("div");i.className="collected-glow",n.appendChild(i)}else if(r){const s=document.createElement("div");s.className="wishlist-badge",s.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(s);const i=document.createElement("div");i.className="wishlist-glow",n.appendChild(i)}if(A.currentTab==="collection"){let s="",i="",a=!1;if(t?(s='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',i="Click to Wishlist",a=!0):r?(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i="Click To Unwishlist",a=!0):(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',i="Click to Collect",a=!0),a){const l=document.createElement("div");l.className="collection-hint",l.innerHTML=`
          <div class="collection-hint-icon">${s}</div>
          <div class="collection-hint-text">${i}</div>
        `,(t||r)&&l.classList.add("hint-hidden"),n.appendChild(l)}}}function Mw(n,e){A.collectedItems.has(n)?(A.collectedItems.delete(n),A.wishlistedItems.add(n),Da()):A.wishlistedItems.has(n)?A.wishlistedItems.delete(n):(A.collectedItems.add(n),A.currentTab==="collection"&&Hw(n)),kr(),Yw(),Nr(e,n),Vr()}function Vr(){if(!document.getElementById("collectionProgressContainer"))return;const e=A.all.length,t=new Set(A.all.map(u=>u.name)),r=[...A.collectedItems].filter(u=>t.has(u)).length,s=e>0?Math.round(r/e*100):0,i=document.getElementById("progressPercent"),a=document.getElementById("progressCount");i&&(i.textContent=`${s}%`),a&&(a.textContent=`${r} / ${e}`);const l=document.getElementById("progressBar");if(l){l.style.width=`${s}%`;const u=Math.floor(s*1.2);l.style.backgroundColor=`hsl(${u}, 80%, 50%)`,l.style.backgroundImage="none"}}function xw(n,e,t,r){if(!n)return;let s=null;const i=a=>{s||(s=a);const l=Math.min((a-s)/r,1),u=Math.floor(l*(t-e)+e);n.textContent=`${u}%`,l<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const r=document.getElementById("progressBar"),s=document.getElementById("progressPercent"),i=A.all.length,a=new Set(A.all.map(d=>d.name)),l=[...A.collectedItems].filter(d=>a.has(d)).length,u=i>0?Math.round(l/i*100):0;r&&(r.style.transition="none",r.style.width="0%",r.style.backgroundColor="hsl(0, 80%, 50%)"),s&&(s.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{r&&(r.style.transition="width 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 2.5s linear",Vr()),s&&xw(s,0,u,2500)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function Mo(){if(Ke.currentUser)try{const n=Ii(ts,"users",Ke.currentUser.uid);await bw(n,{collectedItems:Array.from(A.collectedItems),wishlistedItems:Array.from(A.wishlistedItems),lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function Ow(n){try{console.log("Loading collection from cloud...");const e=Ii(ts,"users",n.uid),t=await ef(e);if(t.exists()){const r=t.data();let s=!1;if(r.collectedItems){const i=new Set(r.collectedItems),a=A.collectedItems.size;i.forEach(l=>A.collectedItems.add(l)),A.collectedItems.size>a&&(s=!0)}if(r.wishlistedItems){const i=new Set(r.wishlistedItems),a=A.wishlistedItems.size;i.forEach(l=>A.wishlistedItems.add(l)),A.wishlistedItems.size>a&&(s=!0)}s&&(console.log("Cloud sync merged new items."),kr(),fe(),Mo())}else console.log("No cloud data found for user. Creating initial sync..."),Mo()}catch(e){console.error("Loading from cloud failed:",e)}}async function Bw(){if(Ke.currentUser){A.wrappedData.loading=!0;try{const n=Iw(jd(ts,"blueprintSubmissions"),ww("userId","==",Ke.currentUser.uid)),e=await Aw(n);A.wrappedData.contributionCount=e.size,console.log(`User has submitted ${e.size} reports.`)}catch(n){console.error("Failed to fetch user contributions:",n)}finally{A.wrappedData.loading=!1}}}function Fw(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),r=document.getElementById("logoutBtnMobile"),s=async()=>{try{console.log("Attempting Google Sign-in..."),await ah(Ke,Yo),await Ey(Ke,Pw),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert("This domain is not authorized for Firebase Auth. Check your Firebase Console settings."):alert("Sign-in failed: "+a.message)}},i=()=>ey(Ke).catch(console.error);n&&(n.onclick=s),e&&(e.onclick=s),t&&(t.onclick=i),r&&(r.onclick=i),Zg(Ke,a=>{document.getElementById("authSection");const l=document.getElementById("userProfile");document.getElementById("authSectionMobile");const u=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),l&&l.classList.remove("hidden"),u&&u.classList.remove("hidden");const d=document.getElementById("userPhoto"),f=document.getElementById("userName"),p=document.getElementById("userPhotoMobile"),E=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),f&&(f.textContent=a.displayName||"Explorer"),p&&(p.src=a.photoURL||""),E&&(E.textContent=a.displayName||"Explorer"),Ow(a)}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),l&&l.classList.add("hidden"),u&&u.classList.add("hidden")})}function vr(n){A.currentTab=n,window.scrollTo(0,0);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabCollection"),r=document.querySelectorAll(".collection-only"),s=document.querySelectorAll(".blueprints-only:not(#eventBanner)"),i=document.getElementById("eventBanner");n==="blueprints"?(e.classList.add("tab-button-active"),t.classList.remove("tab-button-active"),document.body.classList.remove("collection-mode"),r.forEach(a=>a.classList.add("hidden")),s.forEach(a=>a.classList.remove("hidden")),!xo&&i&&i.classList.contains("banner-active")&&i.classList.remove("hidden")):(e.classList.remove("tab-button-active"),t.classList.add("tab-button-active"),document.body.classList.add("collection-mode"),r.forEach(a=>a.classList.remove("hidden")),s.forEach(a=>a.classList.add("hidden")),i&&i.classList.add("hidden")),fe()}function Uw(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabCollection"),t=document.getElementById("logoHome"),r=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>vr("blueprints")),e&&(e.onclick=()=>vr("collection")),t&&(t.onclick=()=>vr("blueprints")),r&&(r.onclick=()=>vr("blueprints"))}let xo=!1;function $w(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;ef(Ii(ts,"siteConfig","banner")).then(r=>{if(r.exists()){const s=r.data();s.active&&s.text&&t&&n&&(t.innerHTML=s.text,n.classList.add("banner-active"),!xo&&A.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(r=>console.debug("Banner fetch skipped",r)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),xo=!0})}let sn=null,ni=null;function qw(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),r=document.getElementById("closeSubmitModal"),s=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>du()),e&&(e.onclick=()=>{Da(),ni&&du(ni)}),r&&(r.onclick=()=>Oo()),t&&(t.onclick=i=>{i.target===t&&Oo()}),s&&(s.onsubmit=async i=>{i.preventDefault(),await Gw()})}function jw(){const n=document.getElementById("submitBlueprintName");if(!(!n||!A.all||A.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of A.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function du(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");jw(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function Oo(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),r=document.getElementById("submitQuestReward");t&&(t.checked=!1),r&&(r.checked=!1)}ni=null}function zw(){const n=document.getElementById("showWrappedBtn"),e=document.getElementById("wrappedModal"),t=document.getElementById("closeWrappedBtn"),r=document.getElementById("downloadWrappedBtn");if(!n||!e)return;const s=d=>{const f=document.getElementById("wrappedOuterContainer"),p=document.getElementById("wrappedInner"),E=document.getElementById("wrappedContent"),v=document.getElementById("wrappedShimmer"),S=document.getElementById("wrappedActions"),R=document.getElementById("captureModeActions"),P=document.getElementById("wrappedModal");if(d){const D=window.innerWidth/896;if(f&&(f.style.setProperty("background","none","important"),f.style.setProperty("box-shadow","none","important"),f.style.setProperty("padding","0","important"),f.style.setProperty("border-radius","0","important")),p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${D})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.setProperty("gap","0","important");const M=896*(1-D);p.style.setProperty("margin-bottom",`-${M}px`,"important")}E&&E.style.setProperty("border-radius","0","important"),v&&v.classList.add("hidden"),S&&S.classList.add("hidden"),R&&R.classList.remove("hidden"),P&&(P.style.setProperty("padding","0","important"),P.style.setProperty("overflow-x","hidden","important"),P.style.setProperty("overflow-y","hidden","important"),P.scrollTo(0,0))}else{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<800){const M=(window.innerWidth-32)/896;if(p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${M})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.removeProperty("gap");const x=896*(1-M);p.style.setProperty("margin-bottom",`-${x}px`,"important")}}else p&&(p.style.removeProperty("width"),p.style.removeProperty("transform"),p.style.removeProperty("transform-origin"),p.style.removeProperty("gap"),p.style.removeProperty("margin-bottom"));f&&(f.style.removeProperty("background"),f.style.removeProperty("box-shadow"),f.style.removeProperty("padding"),f.style.removeProperty("border-radius")),E&&E.style.removeProperty("border-radius"),v&&v.classList.remove("hidden"),S&&S.classList.remove("hidden"),R&&R.classList.add("hidden"),P&&(P.style.removeProperty("padding"),P.style.removeProperty("overflow-x"),P.style.removeProperty("overflow-y"),setTimeout(()=>P.scrollTo(0,0),20))}},i=document.getElementById("exitCaptureBtn");i&&(i.onclick=()=>s(!1));const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;if(a&&r){const d=r.cloneNode(!0);r.parentNode.replaceChild(d,r),d.innerHTML='<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Fullscreen for Screenshot',d.className="flex-[2] md:flex-none px-8 py-3 h-14 md:h-auto text-xl md:text-base rounded-full bg-emerald-600 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform",d.onclick=()=>s(!0)}if(n.onclick=async()=>{const d=document.getElementById("submitLocationFab");d&&d.classList.add("hidden"),Ke.currentUser&&(n.disabled=!0,n.textContent="Loading Data...",await Bw(),n.disabled=!1,n.innerHTML='<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg> View My Blueprint Wrapped 2025',n.className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[10px] sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95");const f=A.all.length,p=new Set(A.all.map(j=>j.name)),E=[...A.collectedItems].filter(j=>p.has(j)).length,v=f>0?Math.round(E/f*100):0;document.getElementById("wrappedPercent").textContent=`${v}%`;const S=document.getElementById("wrappedProgressBar");S&&(S.style.width=`${v}%`);const R=A.all.filter(j=>/weapon/i.test(j.type)).length,P=A.all.filter(j=>/weapon/i.test(j.type)&&A.collectedItems.has(j.name)).length,D=A.all.filter(j=>/augment/i.test(j.type)).length,M=A.all.filter(j=>/augment/i.test(j.type)&&A.collectedItems.has(j.name)).length,x={};A.wrappedData.contributions&&A.wrappedData.contributions.forEach(j=>{j.map&&(x[j.map]=(x[j.map]||0)+1)});const F=Object.entries(x).sort((j,ae)=>ae[1]-j[1])[0];document.getElementById("wrappedPercent").textContent=`${v}%`;const L=document.getElementById("wrappedStatsGrid");L.innerHTML="";const O=[];A.wrappedData.contributionCount>0&&O.push({value:A.wrappedData.contributionCount,label:"Locations<br>Reported",color:"text-emerald-400",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'}),F&&F[0]&&O.push({value:F[0],label:"Best<br>Map",color:"text-purple-400",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>',smallText:!0}),O.push({value:`${E}/${f}`,label:"Blueprints<br>Collected",color:"text-white",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'}),O.push({value:`${P}/${R}`,label:"Weapons<br>Collected",color:"text-amber-400",icon:'<img src="icons/ItemCategory_Weapon.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(67%) sepia(74%) saturate(575%) hue-rotate(360deg) brightness(101%) contrast(101%);" alt="Weapon">'}),O.push({value:`${M}/${D}`,label:"Augments<br>Collected",color:"text-cyan-400",icon:'<img src="icons/ItemCategory_Augment.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(76%) sepia(32%) saturate(1057%) hue-rotate(152deg) brightness(95%) contrast(92%);" alt="Augment">'}),O.forEach((j,ae)=>{const ie=document.createElement("div");ie.className="rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center flex-1 min-w-[90px]";const ne=120+Math.floor(Math.random()*30);ie.style.boxShadow="inset 0 0 15px rgba(255, 255, 255, 0.03)";const le="rgba(16, 185, 129, 0.4)",Ye="rgba(52, 211, 153, 0.4)";ae%2===0?ie.style.background=`linear-gradient(${ne}deg, ${le}, ${le}), #09090b`:ie.style.background=`linear-gradient(${ne}deg, ${le}, ${Ye} 50%, ${le}), #09090b`;const Je=j.icon.replace("w-4 h-4","w-6 h-6").replace("w-5 h-5","w-7 h-7");ie.innerHTML=`
        <div class="${j.color} mb-1 drop-shadow-md">
          ${Je}
        </div>
        <span class="${j.smallText?"text-xl":"text-3xl"} font-black ${j.color} drop-shadow-lg">${j.value}</span>
        <div class="text-xs text-zinc-300 uppercase font-black tracking-wider text-center leading-tight drop-shadow-md opacity-90">${j.label}</div>
      `,L.appendChild(ie)});const _=document.getElementById("wrappedHighlights");_.innerHTML="";const g=["Bobcat","Looting Mk. 3 (Survivor)","Aphelion","Equalizer","Jupiter","Combat Mk. 3 (Aggressive)","Combat Mk. 3 (Flanking)","Vulcano","Snap Hook","Deadline","Wolfpack","Tactical Mk. 3 (Defensive)","Tactical Mk. 3 (Healing)","Venator","Tempest","Torrente","Bettina","Anvil","Osprey"];let y=A.all.filter(j=>A.collectedItems.has(j.name)&&!/mod|material|parts|component|attachment|misc/i.test(j.type));y.sort((j,ae)=>{const ie=g.indexOf(j.name),ne=g.indexOf(ae.name);return ie!==-1&&ne!==-1?ie-ne:ie!==-1?-1:ne!==-1?1:Mt(ae.rarity)-Mt(j.rarity)});const T=y.slice(0,8);T.length===0&&(_.innerHTML='<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>'),T.forEach(j=>{const ae=kt(j.rarity),ie=document.createElement("div");ie.className="card-compact w-full p-2";const ne=document.createElement("div");ne.className="rarity-frame rarity-glow relative overflow-hidden",ne.style.borderColor=ae;const le=document.createElement("div");le.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",le.style.background=`
        linear-gradient(to top right, ${ae}44 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `,le.style.backgroundSize="cover, cover, cover",le.style.backgroundPosition="center, center, center";const Ye=document.createElement("img");Ye.src=j.img||"",Ye.className="w-full h-full object-contain p-2 relative z-10";const Je=document.createElement("div");Je.className="rarity-corner",Je.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${ae}66 60%, ${ae}cc 100%)`;const Ae=document.createElement("div");Ae.className="type-tab";const _n=110+Math.floor(Math.random()*40);Ae.style.background=`linear-gradient(${_n}deg, ${ae}99, ${ae}66), #09090b`,Ae.style.borderColor=ae,Ae.style.maxWidth="90%";const Qt=document.createElement("img");Qt.src=j.typeIcon||La(j.type),Qt.className="w-5 h-5 object-contain shadow-sm drop-shadow-md";const $e=document.createElement("span");$e.textContent=j.name,Ae.style.maxWidth="96%",Ae.style.paddingRight="10px",Ae.style.whiteSpace="normal",Ae.style.overflow="visible";let wt="15px",vt="normal";j.name.length>25?(wt="9px",vt="1"):j.name.length>15?(wt="10px",vt="1.1"):j.name.length>12&&(wt="12px",vt="1.2"),$e.style.fontSize=wt,$e.style.lineHeight=vt,$e.style.whiteSpace="normal",$e.style.textOverflow="clip",$e.style.overflow="visible",$e.className="ml-1.5 font-black uppercase tracking-wide drop-shadow-lg text-white whitespace-normal break-words text-left",Ae.appendChild(Qt),Ae.appendChild($e),le.appendChild(Ye),le.appendChild(Je),le.appendChild(Ae),ne.appendChild(le);const Yn=document.createElement("div");Yn.className="mt-2 px-1 pb-1 text-center";const En=document.createElement("div");En.className="font-semibold leading-tight text-white",En.style.fontSize="14px",En.textContent=j.name,Yn.appendChild(En),ie.appendChild(ne),_.appendChild(ie)});const w=document.getElementById("gamertagModal"),b=document.getElementById("gamertagInput"),I=document.getElementById("skipGamertagBtn"),he=document.getElementById("confirmGamertagBtn");b.value="";const Be=j=>{try{console.log("[ProceedToWrapped] Starting...",j),w.classList.add("hidden"),w.classList.remove("flex");const ae=document.getElementById("wrappedContent"),ie=document.getElementById("wrappedGamertag");if(ie&&ie.remove(),j&&j.trim()){const ne=document.createElement("div");ne.id="wrappedGamertag",ne.className="absolute top-4 right-4 p-[2px] rounded-full z-50",ne.style.background="linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.6) 100%)",ne.style.boxShadow="0 0 20px rgba(16,185,129,0.4)";const le=document.createElement("div");le.className="bg-black/50 backdrop-blur-xl px-6 py-2.5 rounded-full text-white font-bold text-lg",le.textContent="@"+j.trim(),ne.appendChild(le),ae.appendChild(ne)}console.log("[ProceedToWrapped] Calling toggleCaptureMode(false)..."),s(!1),console.log("[ProceedToWrapped] Showing modal..."),e.classList.remove("hidden"),e.classList.add("flex","items-center","justify-center"),document.body.style.overflow="hidden",console.log("[ProceedToWrapped] Done!")}catch(ae){console.error("[ProceedToWrapped] CRITICAL ERROR:",ae),alert("Error loading wrapped view. Check console.")}};I.onclick=()=>Be(""),he.onclick=()=>Be(b.value),b.onkeydown=j=>{j.key==="Enter"&&Be(b.value)},w.classList.remove("hidden"),w.classList.add("flex","items-center","justify-center"),b.focus()},t&&(t.onclick=()=>{s(!1),e.classList.add("hidden"),e.classList.remove("flex","items-center","justify-center"),document.body.style.overflow="";const d=document.getElementById("submitLocationFab");d&&A.currentTab==="collection"&&d.classList.remove("hidden")},document.addEventListener("keydown",d=>{d.key==="Escape"&&!e.classList.contains("hidden")&&t.click()})),r){const d=p=>{try{const E=document.createElement("canvas");return E.width=p.naturalWidth,E.height=p.naturalHeight,E.getContext("2d").drawImage(p,0,0),E.toDataURL("image/png")}catch(E){return console.warn("Canvas base64 failed",E),null}},f=async p=>{try{const v=await(await fetch(p)).blob();return new Promise(S=>{const R=new FileReader;R.onloadend=()=>S(R.result),R.readAsDataURL(v)})}catch(E){return console.error("Fetch base64 failed",E),p}};a||(r.onclick=async()=>{const p=document.getElementById("wrappedContent");if(!p)return;const E=r.textContent;r.disabled=!0,r.textContent="Baking...";const v=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,S=p.cloneNode(!0);S.style.position="fixed",S.style.top="0",S.style.left="0",S.style.width=p.offsetWidth+"px",S.style.height=p.offsetHeight+"px",S.style.zIndex="-9999",S.style.opacity="1",S.style.pointerEvents="none",S.style.transform="none",S.style.margin="0",S.style.backgroundColor="#09090b",document.body.appendChild(S);try{console.group("iOS Robust Baking");const R=S.querySelectorAll("img");for(let _ of R)if(_.src&&!_.src.startsWith("data:")){const g=Array.from(p.querySelectorAll("img")).find(y=>y.src===_.src);if(g&&g.complete){const y=d(g);y&&(_.src=y)}else if(g){await new Promise(T=>{g.onload=T,g.onerror=T});const y=d(g);y&&(_.src=y)}}const P="Arc BP Image Background.webp",D=await f("Background/"+P);[S,...Array.from(S.querySelectorAll("*"))].forEach(_=>{const g=window.getComputedStyle(_).backgroundImage;if(g&&g.toLowerCase().includes(P.toLowerCase())){const y=new RegExp(`url\\((['"]?)([^'"\\)]*?${P.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(\\1)\\)`,"gi");_.style.backgroundImage=g.replace(y,`url("${D}")`),_.style.backgroundSize="cover",_.style.backgroundPosition="center"}}),console.info("Baking complete. Starting capture..."),console.groupEnd(),r.textContent=v?"Processing...":"Generating...";const x=Math.max(p.offsetWidth,p.offsetHeight),F={width:x,height:x,pixelRatio:2,cacheBust:!0,style:{borderRadius:"0",width:`${x}px`,height:`${x}px`,transform:"none"}};if(v)try{await htmlToImage.toCanvas(S,F)}catch{}await htmlToImage.toSvg(S,F),await new Promise(_=>setTimeout(_,v?3e3:1e3));const L=await htmlToImage.toPng(S,F);if(!L||L.length<5e4)throw new Error("Captured image is too small or black.");const O=document.createElement("a");O.download="arc-raiders-wrapped-2025.png",O.href=L,O.click()}catch(R){console.error("Capture error:",R),alert("Download failed on this device. Please take a screenshot instead - sorry!")}finally{S.parentNode&&S.parentNode.removeChild(S),r.disabled=!1,r.textContent=E}})}const l=()=>{const d=e.querySelector(".w-\\[896px\\]");if(!d||e.classList.contains("hidden"))return;d.style.transform="none",d.style.margin="0";const f=40,p=window.innerHeight-f,E=window.innerWidth-f,v=d.scrollHeight,S=d.scrollWidth,R=p/v,P=E/S,D=Math.min(P,R,1);if(D<1){d.style.transformOrigin="center center",d.style.transform=`scale(${D})`;const M=S*(1-D),x=v*(1-D);d.style.marginLeft=`-${M/2}px`,d.style.marginRight=`-${M/2}px`,d.style.marginTop=`-${x/2}px`,d.style.marginBottom=`-${x/2}px`,d.style.willChange="transform"}else d.style.transform="none",d.style.margin="0",d.style.willChange="auto"};window.addEventListener("resize",l),new MutationObserver(d=>{d.forEach(f=>{f.type==="attributes"&&f.attributeName==="class"&&(e.classList.contains("hidden")||requestAnimationFrame(()=>{requestAnimationFrame(l)}))})}).observe(e,{attributes:!0})}const fu="arc_read_posts_v1";function Ww(){const n=document.getElementById("announcementsBtn"),e=document.getElementById("announcementsDrawer"),t=document.getElementById("closeAnnouncementsBtn"),r=e?e.querySelector(":scope > div:first-child"):null,s=e?e.querySelector(":scope > div:last-child"):null,i=document.getElementById("announcementsFeed"),a=document.getElementById("newsBadge");let l=new Set;try{const P=localStorage.getItem(fu);P&&(l=new Set(JSON.parse(P)))}catch(P){console.error("Failed to load read posts",P)}const u=()=>{localStorage.setItem(fu,JSON.stringify(Array.from(l)))},d=()=>{const P=i?i.querySelectorAll(".announcement-card"):[];let D=0;P.forEach(M=>{const x=M.dataset.id,F=M.querySelector(".unread-dot");l.has(x)?(F&&F.classList.add("hidden"),M.classList.add("read")):(F&&F.classList.remove("hidden"),D++)}),a&&(D>0?(a.textContent=D,a.classList.remove("hidden")):a.classList.add("hidden"))},f=document.getElementById("devResetAnnouncements");f&&(f.onclick=P=>{P.stopPropagation(),l.clear(),u(),i&&i.querySelectorAll(".announcement-body").forEach(D=>{D.classList.add("max-h-0","opacity-0"),D.classList.remove("max-h-[1500px]","opacity-100")}),d()});const p=document.getElementById("markAllReadBtn");p&&(p.onclick=P=>{P.stopPropagation(),(i?i.querySelectorAll(".announcement-card"):[]).forEach(M=>{const x=M.dataset.id;x&&l.add(x)}),u(),d()});const E=P=>{P.stopPropagation(),R();const D=document.getElementById("tabCollection");D&&D.click();const M=document.getElementById("showWrappedBtn");M&&M.click()},v=document.getElementById("generateWrappedFromNews");if(v&&(v.onclick=E),i&&d(),!n||!e||!t||!r||!s)return;const S=()=>{e.classList.remove("hidden"),requestAnimationFrame(()=>{r.classList.remove("opacity-0"),s.classList.remove("translate-x-full")}),document.body.style.overflow="hidden"},R=()=>{r.classList.add("opacity-0"),s.classList.add("translate-x-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.style.overflow=""},300)};n.onclick=S,t.onclick=R,r.onclick=R,document.addEventListener("keydown",P=>{P.key==="Escape"&&!e.classList.contains("hidden")&&R()}),i&&(i.onclick=P=>{const D=P.target.closest(".announcement-card");if(!D)return;const M=D.querySelector(".announcement-body"),x=D.dataset.id;if(!M)return;!M.classList.contains("max-h-0")?(M.classList.add("max-h-0","opacity-0"),M.classList.remove("max-h-[1500px]","opacity-100")):(M.classList.remove("max-h-0","opacity-0"),M.classList.add("max-h-[1500px]","opacity-100"),l.has(x)||(l.add(x),u(),d()))})}function Hw(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),r=document.getElementById("collectToastProgress");!e||!t||!r||(sn&&(clearTimeout(sn),sn=null),ni=n,t.textContent=`${n} Blueprint collected? Tell us where!`,r.classList.remove("animate"),r.offsetWidth,r.classList.add("animate"),e.classList.remove("hidden"),sn=setTimeout(()=>{Da()},1e4))}function Da(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress");n&&n.classList.add("hidden"),e&&e.classList.remove("animate"),sn&&(clearTimeout(sn),sn=null)}async function Gw(){var u,d,f,p,E,v,S,R;const n=(u=document.getElementById("submitBlueprintName"))==null?void 0:u.value,e=(d=document.getElementById("submitMap"))==null?void 0:d.value,t=(f=document.getElementById("submitCondition"))==null?void 0:f.value,r=(p=document.getElementById("submitLocation"))==null?void 0:p.value,s=(E=document.getElementById("submitContainer"))==null?void 0:E.value,i=((v=document.getElementById("submitTrialsReward"))==null?void 0:v.checked)||!1,a=((S=document.getElementById("submitQuestReward"))==null?void 0:S.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}if(!(e||t||r||s||i||a)){alert("Please provide at least one detail (Map, Condition, Location, Container, or Reward Type).");return}try{await Cw(jd(ts,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:t||"",location:r||"",container:s||"",trialsReward:i,questReward:a,submittedAt:new Date().toISOString(),userId:((R=Ke.currentUser)==null?void 0:R.uid)||"anonymous"}),Oo(),Kw()}catch(P){console.error("Error submitting blueprint location:",P),alert("Failed to submit. Please try again.")}}function Kw(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function Qw(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=Lo(t);const r=Lo((e||"").trim());if(uu[r]){const i=uu[r];if(ht.has(i))return mr+ht.get(i);for(const[a,l]of ht.entries())if(a.startsWith(i))return mr+l}const s=[t.toLowerCase(),r.toLowerCase()];for(const i of s)if(i&&ht.has(i))return mr+ht.get(i);for(const i of s)if(i){for(const[a,l]of ht.entries())if(a===i||a.startsWith(i))return mr+l}return r?mr+r+".webp":""}const Ue={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function Xw(n,e){let t;return function(...r){const s=this;clearTimeout(t),t=setTimeout(()=>n.apply(s,r),e)}}const Yw=Xw(Mo,2e3),on={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},cf={Confirmed:on.Legendary.color,"Very High":on.Epic.color,Confident:on.Rare.color,Low:on.Uncommon.color,"Not Enough Data":"#E11D48"},Jw=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function tt(n){return Nw+encodeURIComponent(n)}function Vs(n){const e=Math.max(Ue.min,Math.min(Ue.max,Number(n)||Ue.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(Ue.storageKey,String(e))}catch{}const r=document.getElementById("gridSizeLabel"),s=document.getElementById("gridSizeLabelMobile");r&&(r.textContent=`${e}px`),s&&(s.textContent=`${e}px`)}function Zw(){try{const n=localStorage.getItem(Ue.storageKey);return n?Number(n):window.innerWidth<=768?120:Ue.default}catch{return window.innerWidth<=768?120:Ue.default}}function La(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return tt("ItemCategory_Weapon.webp");if(t==="grenade")return tt("ItemCategory_Grenade.webp");if(t==="quickuse")return tt("ItemCategory_QuickUse.webp");if(t==="mod")return tt("ItemCategory_Mod.webp");if(t==="augment")return tt("ItemCategory_Augment.webp");if(t==="material")return tt("ItemCategory_Material.webp");if(t==="misc")return tt("ItemCategory_Misc.webp");for(const r of Jw)if(r.re.test(e))return tt(r.file);return tt("ItemCategory_Misc.webp")}function ev(n){const e=Le(n);return e?/^https?:\/\//i.test(e)?e:tt(e):""}function Le(n){return(n??"").toString().trim()}function Ds(n){return Le(n).toLowerCase()}function De(n,e){const t=n.map(r=>Ds(r));for(const r of e){const s=t.indexOf(Ds(r));if(s!==-1)return n[s]}for(const r of e){const s=Ds(r),i=t.findIndex(a=>a.includes(s));if(i!==-1)return n[i]}return null}function tv(n){const e=Le(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(on[t])return t;const r={Legend:"Legendary",Leg:"Legendary"};return r[t]?r[t]:t}function kt(n){var e;return((e=on[n])==null?void 0:e.color)||"#3f3f46"}function Mt(n){var e;return((e=on[n])==null?void 0:e.rank)||0}const A={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]},wrappedData:{contributionCount:0,loading:!1},spares:{}};function nv(){return new URL(window.location.href).searchParams.get("csv")||kw}function ws(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function lf(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),r=document.getElementById("drawerBackdrop");function s(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const F=!n.classList.contains("hidden");n.classList.toggle("hidden"),F?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=s);const l=document.getElementById("mobileFilterBtn");l&&(l.onclick=a),t&&(t.onclick=i),r&&(r.onclick=i);const u=document.getElementById("searchInput"),d=document.getElementById("searchInputMobile"),f=F=>{A.filters.search=F,fe()};u&&u.addEventListener("input",F=>f(F.target.value)),d&&d.addEventListener("input",F=>{f(F.target.value),u&&(u.value=F.target.value)});const p=document.getElementById("sortSelect"),E=document.getElementById("sortSelectMobile"),v=F=>{A.filters.sort=F,p&&(p.value=F),E&&(E.value=F),fe(),Me()};p&&(p.onchange=F=>v(F.target.value)),E&&(E.onchange=F=>v(F.target.value));const S=()=>{A.filters.rarities.clear(),A.filters.types.clear(),A.filters.maps.clear(),A.filters.conds.clear(),A.filters.confs.clear(),A.filters.search="",A.filters.sort="rarity_desc",u&&(u.value=""),d&&(d.value=""),p&&(p.value="rarity_desc"),E&&(E.value="rarity_desc"),A.filters.collected="all",fe(),Re(),Ma(),Me()};["resetBtn","resetBtn2","resetBtnMobile"].forEach(F=>{const L=document.getElementById(F);L&&(L.onclick=S)});const R=(F,L)=>{const O=document.getElementById(F);O&&(O.onclick=()=>{L.clear(),fe(),Re(),Me()})};R("rarityAllBtn",A.filters.rarities),R("typeAllBtn",A.filters.types),R("mapAllBtn",A.filters.maps),R("condAllBtn",A.filters.conds),R("confAllBtn",A.filters.confs),R("rarityAllBtnMobile",A.filters.rarities),R("typeAllBtnMobile",A.filters.types),R("mapAllBtnMobile",A.filters.maps),R("condAllBtnMobile",A.filters.conds),R("confAllBtnMobile",A.filters.confs);const P=document.getElementById("gridSize"),D=document.getElementById("gridSizeMobile"),M=Zw();Vs(M),P&&(P.min=String(Ue.min),P.max=String(Ue.max),P.step=String(Ue.step),P.value=String(M),P.addEventListener("input",F=>{const L=F.target.value;D&&(D.value=L),Vs(L)})),D&&(D.min=String(Ue.min),D.max=String(Ue.max),D.step=String(Ue.step),D.value=String(M),D.addEventListener("input",F=>{const L=F.target.value;P&&(P.value=L),Vs(L)}));const x=(F,L,O)=>{const _=document.getElementById(F),g=document.getElementById(L),y=document.getElementById(O);_&&g&&y&&(_.onclick=()=>{g.classList.toggle("hidden"),y.classList.toggle("rotate-180")})};x("toggleRarity","rarityFilters","iconRarity"),x("toggleType","typeFilters","iconType"),x("toggleMap","mapFilters","iconMap"),x("toggleCond","condFilters","iconCond"),x("toggleConf","confFilters","iconConf"),x("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),x("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),x("toggleMapMobile","mapFiltersMobile","iconMapMobile"),x("toggleCondMobile","condFiltersMobile","iconCondMobile"),x("toggleConfMobile","confFiltersMobile","iconConfMobile")}async function rv(){ws("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const r=await t.json();ht.clear();for(const s of r){const a=s.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),l=Lo(a).toLowerCase();ht.set(l,s)}console.log(`Loaded ${ht.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}ws("Fetching sheet...");let n=nv();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var L;const t=e.data||[],r=((L=e.meta)==null?void 0:L.fields)||Object.keys(t[0]||{}),s=De(r,["Blueprint Name","Item Name","Name","Item"]),i=De(r,["Item Type","Type"]),a=De(r,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),l=De(r,["Most Likely Map","Map"]),u=De(r,["Most Likely Condition","Condition"]),d=De(r,["Most Likely Location","Location"]),f=De(r,["Most Likely Container","Container"]),p=De(r,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),E=De(r,["Rarity","Item Rarity"]),v=De(r,["Data Confidence","Confidence"]),S=De(r,["Item URL","Wiki URL","URL","Link","Wiki"])||r[7],R=De(r,["Trials Reward","Trial Reward","Trials"])||r[9],P=De(r,["Quest Reward","Quest"])||r[10],D=De(r,["Description","Desc","Flavor Text"])||r[11],M=De(r,["Active","Is Active","Enabled"])||r[12],x=O=>{const _=Le(O).toLowerCase();return _==="true"||_==="yes"||_==="1"||_==="x"||_==="✓"};A.columns={name:s,type:i,typeIcon:a,map:l,cond:u,loc:d,cont:f,img:p,rarity:E,conf:v,wiki:S};const F=[];for(const O of t){const _=Le(O[s]);if(!_)continue;const g=Le(O[i]),y=Le(O[l]),T=Le(O[u]),w=Le(O[d]),b=Le(O[f]),I=Le(O[p]),he=Qw(I,_),Be=tv(O[E]),j=v?Le(O[v]):"",ae=Le(O[S]),ne=(a?ev(O[a]):"")||La(g),le=R?x(O[R]):!1,Ye=P?x(O[P]):!1,Je=D?Le(O[D]):"",Ae=M?x(O[M]):!0;F.push({name:_,type:g,map:y,cond:T,loc:w,cont:b,img:he,rarity:Be,conf:j,wiki:ae,typeIcon:ne,trialsReward:le,questReward:Ye,description:Je,active:Ae})}A.all=F.filter(O=>O.active!==!1),sv(),lf(),fe(),Re(),ws(`${F.length} items • live from Sheets`)},error:e=>{console.error(e),ws("Failed to load CSV. Check your published link.")}})}function pr(n){const e=new Set(n.filter(t=>Le(t)));return Array.from(e).sort((t,r)=>t.localeCompare(r))}const mu=["Confirmed","Very High","Confident","Low","Not Enough Data"],pu=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];function sv(){A.facets.rarities=pr(A.all.map(n=>n.rarity)).sort((n,e)=>Mt(e)-Mt(n)),A.facets.types=pr(A.all.map(n=>n.type)).sort((n,e)=>{let t=pu.indexOf(n),r=pu.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r||n.localeCompare(e)}),A.facets.maps=pr(A.all.map(n=>n.map)),A.facets.conds=pr(A.all.map(n=>n.cond)),A.facets.confs=pr(A.all.map(n=>n.conf)).sort((n,e)=>{let t=mu.indexOf(n),r=mu.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r})}function gr(n,e){n.has(e)?n.delete(e):n.add(e)}function gu(n,e,t){const r=document.createElement("button");return r.className="chip "+(e?"chip-active":""),r.textContent=n,r.onclick=t,r}function Re(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of A.facets.rarities){const r=A.filters.rarities.has(t),s=kt(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=r?s+"66":s+"22";i.style.background=a,i.style.borderColor=s,i.style.color="#f4f4f5",i.onclick=()=>{gr(A.filters.rarities,t),fe(),Re(),Me()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of A.facets.types){const r=A.filters.types.has(t),s=document.createElement("button");s.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",s.style.borderColor=r?"rgb(113 113 122)":"rgb(39 39 42)",s.title=t,s.onclick=()=>{gr(A.filters.types,t),fe(),Re(),Me()};const i=document.createElement("img");i.src=La(t),i.alt=t,i.className="w-6 h-6",s.appendChild(i),e.appendChild(s)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of A.facets.maps){const r=A.filters.maps.has(t);e.appendChild(gu(t,r,()=>{gr(A.filters.maps,t),fe(),Re(),Me()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of A.facets.conds){const r=A.filters.conds.has(t);e.appendChild(gu(t,r,()=>{gr(A.filters.conds,t),fe(),Re(),Me()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of A.facets.confs){if(!t)continue;const r=A.filters.confs.has(t),s=cf[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=r?s:"rgb(39 39 42)",i.style.background=r?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{gr(A.filters.confs,t),fe(),Re(),Me()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=s;const l=document.createElement("span");l.textContent=t,i.appendChild(a),i.appendChild(l),e.appendChild(i)}}iv()}function iv(){const n=document.getElementById("activeChips");if(!n)return;n.innerHTML="";const e=(t,r)=>{const s=document.createElement("button");s.className="chip chip-active",s.textContent=t+" ✕",s.onclick=r,n.appendChild(s)};if(A.filters.rarities.size&&e(`Rarity: ${Array.from(A.filters.rarities).join(", ")}`,()=>{A.filters.rarities.clear(),fe(),Re(),Me()}),A.filters.types.size&&e(`Type: ${Array.from(A.filters.types).join(", ")}`,()=>{A.filters.types.clear(),fe(),Re(),Me()}),A.filters.maps.size&&e(`Map: ${Array.from(A.filters.maps).join(", ")}`,()=>{A.filters.maps.clear(),fe(),Re(),Me()}),A.filters.conds.size&&e(`Condition: ${Array.from(A.filters.conds).join(", ")}`,()=>{A.filters.conds.clear(),fe(),Re(),Me()}),A.filters.confs.size&&e(`Confidence: ${Array.from(A.filters.confs).join(", ")}`,()=>{A.filters.confs.clear(),fe(),Re(),Me()}),A.filters.collected!=="all"){let t="Collected";A.filters.collected==="not-collected"&&(t="Not Collected"),A.filters.collected==="wishlist"&&(t="Wishlist"),A.filters.collected==="spares"&&(t="Has Spares"),e(`Status: ${t}`,()=>{A.filters.collected="all",fe(),Re(),Ma(),Me()})}A.filters.search.trim()&&e(`Search: ${A.filters.search.trim()}`,()=>{A.filters.search="";const t=document.getElementById("searchInput"),r=document.getElementById("searchInputMobile");t&&(t.value=""),r&&(r.value=""),fe(),Re()})}function fe(){const n=Ds(A.filters.search),e=A.filters.rarities.size>0,t=A.filters.types.size>0,r=A.filters.maps.size>0,s=A.filters.conds.size>0,i=A.filters.confs.size>0;let a=A.all.filter(u=>{if(e&&!A.filters.rarities.has(u.rarity)||t&&!A.filters.types.has(u.type)||r&&!A.filters.maps.has(u.map)||s&&!A.filters.conds.has(u.cond)||i&&!A.filters.confs.has(u.conf))return!1;const d=A.collectedItems.has(u.name),f=A.wishlistedItems.has(u.name);return!(A.filters.collected==="collected"&&!d||A.filters.collected==="wishlist"&&!f||A.filters.collected==="not-collected"&&d||A.filters.collected==="spares"&&!(A.spares[u.name]>0)||n&&!(u.name+" "+u.type+" "+u.map+" "+u.cond+" "+u.loc+" "+u.cont).toLowerCase().includes(n))});const l=A.filters.sort;a.sort((u,d)=>l==="name_asc"?u.name.localeCompare(d.name):l==="name_desc"?d.name.localeCompare(u.name):l==="type_asc"?(u.type||"").localeCompare(d.type||""):l==="rarity_desc"?Mt(d.rarity)-Mt(u.rarity)||u.name.localeCompare(d.name):l==="rarity_asc"&&Mt(u.rarity)-Mt(d.rarity)||u.name.localeCompare(d.name)),A.filtered=a,ov()}function ov(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${A.filtered.length} / ${A.all.length}`),A.filtered.length)n.classList.remove("hidden"),e&&e.classList.add("hidden");else{n.classList.add("hidden"),e&&e.classList.remove("hidden");return}const r=[];for(const s of A.filtered){const i=document.createElement("div");i.className="card-compact bg-zinc-950 border border-zinc-800 rounded-2xl p-2 opacity-0",i.style.position="relative",i.style.overflow="visible",i.dataset.name=s.name;const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=kt(s.rarity);const l=document.createElement("div");l.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",l.style.background=`
      linear-gradient(to top right, ${kt(s.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,l.style.backgroundSize="cover, cover, cover",l.style.backgroundPosition="center, center, center",l.style.backgroundBlendMode="normal, normal, normal",l.style.aspectRatio="1 / 1",l.style.width="100%";const u=document.createElement("img");u.src=s.img||"",u.alt=s.name,u.className="w-full h-full object-contain p-2 relative z-10",u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",u.style.padding="8px",u.loading="lazy",i.style.transition="transform 0.2s",i.addEventListener("mouseenter",()=>Wi(u,{scale:1.1})),i.addEventListener("mouseleave",()=>Wi(u,{scale:1}));const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${kt(s.rarity)}66 60%, ${kt(s.rarity)}cc 100%)`;const f=document.createElement("div");f.className="type-tab",f.style.background=kt(s.rarity)+"22",f.style.borderColor=kt(s.rarity);const p=document.createElement("img");p.src=s.typeIcon,p.alt=s.type;const E=document.createElement("span");E.className="",E.textContent=s.type||"—",f.appendChild(p),f.appendChild(E),l.appendChild(u),l.appendChild(d),l.appendChild(f);const v=document.createElement("div");v.className="mt-2 px-1 pb-1";const S=document.createElement("div");S.className="font-semibold leading-tight",S.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",S.textContent=s.name,v.appendChild(S);const R=document.createElement("div");R.className="details-overlay hidden";const P=document.createElement("div");P.className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 mb-3";const D=document.createElement("div");D.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",D.textContent="Most Likely Spawn",P.appendChild(D);let M=!1;const x=(L,O)=>{if(!O||O==="N/A")return null;const _=document.createElement("div");_.className="details-row";const g=document.createElement("div");g.className="details-label",g.textContent=L;const y=document.createElement("div");return y.className="details-value",y.textContent=O,_.appendChild(g),_.appendChild(y),_};if([x("Map",s.map),x("Location",s.loc),x("Container",s.cont),x("Condition",s.cond)].filter(Boolean).forEach(L=>{P.appendChild(L),M=!0}),M&&R.appendChild(P),s.conf){const L=document.createElement("div");L.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Data Confidence";const _=document.createElement("div");_.className="details-value details-confidence";const g=document.createElement("span");g.className="confidence-dot",g.style.background=cf[s.conf]||"#71717a";const y=document.createElement("span");y.textContent=s.conf,_.appendChild(g),_.appendChild(y),L.appendChild(O),L.appendChild(_),R.appendChild(L)}if(s.trialsReward){const L=document.createElement("div");L.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Trials Reward";const _=document.createElement("div");_.className="details-value",_.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',L.appendChild(O),L.appendChild(_),R.appendChild(L)}if(s.questReward){const L=document.createElement("div");L.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Quest Reward";const _=document.createElement("div");_.className="details-value",_.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',L.appendChild(O),L.appendChild(_),R.appendChild(L)}if(s.description){const L=document.createElement("div");L.className="details-row";const O=document.createElement("div");O.className="details-label",O.textContent="Description";const _=document.createElement("div");_.className="details-value",_.textContent=s.description,_.classList.add("italic"),L.appendChild(O),L.appendChild(_),R.appendChild(L)}if(s.wiki){const L=document.createElement("a");L.href=s.wiki,L.target="_blank",L.rel="noreferrer",L.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",L.textContent="Item URL",R.appendChild(L)}a.style.cursor="pointer",a.onclick=L=>{L.stopPropagation();const O=!R.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(_=>{if(_!==R){_.classList.add("hidden"),_.style.transform="";const g=_.closest(".card-compact");g&&(g.classList.remove("card-open"),g.style.zIndex="")}}),O?(R.classList.add("hidden"),R.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(R.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const _=R.getBoundingClientRect(),g=12;let y=0;_.left<g?y=g-_.left:_.right>window.innerWidth-g&&(y=window.innerWidth-g-_.right),y!==0&&(R.style.transform=`translateX(calc(-50% + ${y}px))`)}))},a.appendChild(l),Nr(a,s.name);const F=A.spares[s.name]||0;if(F>0){const L=document.createElement("div");L.className="spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",L.innerHTML=`Spares: <span class="font-bold">${F}</span>`,L.dataset.itemName=s.name,a.appendChild(L)}A.currentTab==="collection"?(a.style.cursor="pointer",a.onclick=L=>{L.stopPropagation(),Mw(s.name,a)}):(a.style.cursor="pointer",a.onclick=L=>{L.stopPropagation();const O=!R.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(_=>{if(_!==R){_.classList.add("hidden"),_.style.transform="";const g=_.closest(".card-compact");g&&(g.classList.remove("card-open"),g.style.zIndex="")}}),O?(R.classList.add("hidden"),R.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(R.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const _=R.getBoundingClientRect(),g=12;let y=0;_.left<g?y=g-_.left:_.right>window.innerWidth-g&&(y=window.innerWidth-g-_.right),y!==0&&(R.style.transform=`translateX(calc(-50% + ${y}px))`)}))}),i.appendChild(a),i.appendChild(v),i.appendChild(R),n.appendChild(i),r.push(i)}r.length>0&&Wi(r,{opacity:[0,1],y:[20,0]},{delay:wm(.015)})}function Ma(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedNo"),r=document.getElementById("collectedAllBlueprints"),s=document.getElementById("collectedYesBlueprints"),i=document.getElementById("collectedWishBlueprints"),a=document.getElementById("collectedNoBlueprints"),l=document.getElementById("collectedSparesBlueprints"),u=document.getElementById("collectedAllMobile"),d=document.getElementById("collectedYesMobile"),f=document.getElementById("collectedWishMobile"),p=document.getElementById("collectedNoMobile"),E=document.getElementById("collectedSparesMobile"),v=S=>{A.filters.collected=S,[[n,e,null,t,null],[r,s,i,a,l],[u,d,f,p,E]].forEach(P=>{const[D,M,x,F,L]=P;D&&(D.classList.remove("chip-active"),S==="all"&&D.classList.add("chip-active")),M&&(M.classList.remove("chip-active"),S==="collected"&&M.classList.add("chip-active")),x&&(x.classList.remove("chip-active"),S==="wishlist"&&x.classList.add("chip-active")),F&&(F.classList.remove("chip-active"),S==="not-collected"&&F.classList.add("chip-active")),L&&(L.classList.remove("chip-active"),S==="spares"&&L.classList.add("chip-active"))}),fe(),Re(),Me()};n&&(n.onclick=()=>v("all")),e&&(e.onclick=()=>v("collected")),t&&(t.onclick=()=>v("not-collected")),r&&(r.onclick=()=>v("all")),s&&(s.onclick=()=>v("collected")),i&&(i.onclick=()=>v("wishlist")),a&&(a.onclick=()=>v("not-collected")),l&&(l.onclick=()=>v("spares")),u&&(u.onclick=()=>v("all")),d&&(d.onclick=()=>v("collected")),f&&(f.onclick=()=>v("wishlist")),p&&(p.onclick=()=>v("not-collected")),E&&(E.onclick=()=>v("spares")),v(A.filters.collected)}function av(){const n=document.getElementById("itemContextMenu"),e=document.getElementById("grid");if(!n||!e)return;let t=null,r=null;const s=500,i=E=>{if(t=E,!E)return;const v=E.getBoundingClientRect(),S=200;let R=v.left+v.width/2-S/2,P=v.bottom+8;const D=12;R<D?R=D:R+S>window.innerWidth-D&&(R=window.innerWidth-S-D);const M=240;P+M>window.innerHeight-D&&(P=v.top-M-8,P<D&&(P=D)),n.style.left=`${R}px`,n.style.top=`${P}px`,n.classList.remove("hidden"),requestAnimationFrame(()=>n.classList.remove("opacity-0"));const x=document.getElementById("contextSparesCount");if(x&&E){const F=E.dataset.name,L=A.spares[F]||0;x.textContent=L}},a=()=>{n.classList.add("opacity-0"),setTimeout(()=>n.classList.add("hidden"),150),t=null};e.addEventListener("contextmenu",E=>{if(A.currentTab!=="collection")return;const v=E.target.closest(".card-compact");v&&(E.preventDefault(),i(v))}),e.addEventListener("touchstart",E=>{if(A.currentTab!=="collection")return;const v=E.target.closest(".card-compact");v&&(r=setTimeout(()=>{i(v),navigator.vibrate&&navigator.vibrate(50)},s))},{passive:!0}),e.addEventListener("touchend",()=>{clearTimeout(r)},{passive:!0}),e.addEventListener("touchmove",()=>{clearTimeout(r)},{passive:!0}),document.addEventListener("click",E=>{n.contains(E.target)||a()}),e.addEventListener("click",E=>{const v=E.target.closest(".spares-pill");if(!v)return;E.stopPropagation();const S=v.closest(".card-compact");S&&i(S)}),window.addEventListener("scroll",a,{passive:!0}),document.addEventListener("keydown",E=>{E.key==="Escape"&&a()});const l=document.getElementById("contextSparesCount"),u=document.getElementById("contextSparesMinus"),d=document.getElementById("contextSparesPlus"),f=()=>{if(t&&l){const E=t.dataset.name,v=A.spares[E]||0;l.textContent=v}},p=(E,v)=>{const S=E==null?void 0:E.querySelector(".rarity-frame");if(!S)return;const R=S.querySelector(".spares-pill");R&&R.remove();const P=A.spares[v]||0;if(P>0){const D=document.createElement("div");D.className="spares-pill absolute top-2 right-2 z-20 px-2 py-1 rounded-full text-[11px] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",D.innerHTML=`Spares: <span class="font-bold">${P}</span>`,D.dataset.itemName=v,S.appendChild(D)}};u&&(u.onclick=E=>{if(E.stopPropagation(),!t)return;const v=t.dataset.name,S=A.spares[v]||0;S>0&&(A.spares[v]=S-1,A.spares[v]===0&&delete A.spares[v],hu(),f(),p(t,v))}),d&&(d.onclick=E=>{if(E.stopPropagation(),!t)return;const v=t.dataset.name,S=A.spares[v]||0;A.spares[v]=S+1,hu(),f(),p(t,v)}),n.addEventListener("click",E=>{const v=E.target.closest("[data-action]");if(!v||!t)return;const S=v.dataset.action,R=t.dataset.name,P=t.querySelector(".rarity-frame");if(!R){a();return}S==="collected"?(A.collectedItems.has(R)?A.collectedItems.delete(R):(A.wishlistedItems.delete(R),A.collectedItems.add(R)),kr(),P&&Nr(P,R),Vr(),a()):S==="wishlisted"?(A.wishlistedItems.has(R)?A.wishlistedItems.delete(R):(A.collectedItems.delete(R),A.wishlistedItems.add(R)),kr(),P&&Nr(P,R),Vr(),a()):S==="uncollected"&&(A.collectedItems.delete(R),A.wishlistedItems.delete(R),kr(),P&&Nr(P,R),Vr(),a())})}
