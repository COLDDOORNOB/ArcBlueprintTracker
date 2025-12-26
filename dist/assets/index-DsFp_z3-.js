(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function Mf(n,e){n.indexOf(e)===-1&&n.push(e)}const uu=(n,e,t)=>Math.min(Math.max(t,n),e),Le={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},_r=n=>typeof n=="number",gn=n=>Array.isArray(n)&&!_r(n[0]),Of=(n,e,t)=>{const r=e-n;return((t-n)%r+r)%r+n};function xf(n,e){return gn(n)?n[Of(0,n.length,e)]:n}const hu=(n,e,t)=>-t*n+t*e+n,du=()=>{},At=n=>n,ko=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function fu(n,e){const t=n[n.length-1];for(let r=1;r<=e;r++){const s=ko(0,e,r);n.push(hu(t,1,s))}}function Ff(n){const e=[0];return fu(e,n-1),e}function Uf(n,e=Ff(n.length),t=At){const r=n.length,s=r-e.length;return s>0&&fu(e,s),i=>{let a=0;for(;a<r-2&&!(i<e[a+1]);a++);let l=uu(0,1,ko(e[a],e[a+1],i));return l=xf(t,a)(l),hu(n[a],n[a+1],l)}}const mu=n=>Array.isArray(n)&&_r(n[0]),Xi=n=>typeof n=="object"&&!!n.createAnimation,wn=n=>typeof n=="function",Bf=n=>typeof n=="string",ur={ms:n=>n*1e3,s:n=>n/1e3},pu=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,qf=1e-7,$f=12;function jf(n,e,t,r,s){let i,a,l=0;do a=e+(t-e)/2,i=pu(a,r,s)-n,i>0?t=a:e=a;while(Math.abs(i)>qf&&++l<$f);return a}function sr(n,e,t,r){if(n===e&&t===r)return At;const s=i=>jf(i,0,1,n,t);return i=>i===0||i===1?i:pu(s(i),e,r)}const zf=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const r=t*n,s=e==="end"?Math.floor(r):Math.ceil(r);return uu(0,1,s/n)},Hf={ease:sr(.25,.1,.25,1),"ease-in":sr(.42,0,1,1),"ease-in-out":sr(.42,0,.58,1),"ease-out":sr(0,0,.58,1)},Wf=/\((.*?)\)/;function Yi(n){if(wn(n))return n;if(mu(n))return sr(...n);const e=Hf[n];if(e)return e;if(n.startsWith("steps")){const t=Wf.exec(n);if(t){const r=t[1].split(",");return zf(parseFloat(r[0]),r[1].trim())}}return At}class gu{constructor(e,t=[0,1],{easing:r,duration:s=Le.duration,delay:i=Le.delay,endDelay:a=Le.endDelay,repeat:l=Le.repeat,offset:u,direction:d="normal",autoplay:m=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=At,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((I,C)=>{this.resolve=I,this.reject=C}),r=r||Le.easing,Xi(r)){const I=r.createAnimation(t);r=I.easing,t=I.keyframes||t,s=I.duration||s}this.repeat=l,this.easing=gn(r)?At:Yi(r),this.updateDuration(s);const g=Uf(t,u,gn(r)?r.map(Yi):At);this.tick=I=>{var C;i=i;let N=0;this.pauseTime!==void 0?N=this.pauseTime:N=(I-this.startTime)*this.rate,this.t=N,N/=1e3,N=Math.max(N-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(N=this.totalDuration);const S=N/this.duration;let V=Math.floor(S),x=S%1;!x&&S>=1&&(x=1),x===1&&V--;const q=V%2;(d==="reverse"||d==="alternate"&&q||d==="alternate-reverse"&&!q)&&(x=1-x);const B=N>=this.totalDuration?1:Math.min(x,1),D=g(this.easing(B));e(D),this.pauseTime===void 0&&(this.playState==="finished"||N>=this.totalDuration+a)?(this.playState="finished",(C=this.resolve)===null||C===void 0||C.call(this,D)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},m&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Gf{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Li=new WeakMap;function _u(n){return Li.has(n)||Li.set(n,{transforms:[],values:new Map}),Li.get(n)}function Kf(n,e){return n.has(e)||n.set(e,new Gf),n.get(e)}const Qf=["","X","Y","Z"],Xf=["translate","scale","rotate","skew"],Is={x:"translateX",y:"translateY",z:"translateZ"},Sc={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},Yf={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:Sc,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:At},skew:Sc},yr=new Map,Vo=n=>`--motion-${n}`,Ts=["x","y","z"];Xf.forEach(n=>{Qf.forEach(e=>{Ts.push(n+e),yr.set(Vo(n+e),Yf[n])})});const Jf=(n,e)=>Ts.indexOf(n)-Ts.indexOf(e),Zf=new Set(Ts),yu=n=>Zf.has(n),em=(n,e)=>{Is[e]&&(e=Is[e]);const{transforms:t}=_u(n);Mf(t,e),n.style.transform=tm(t)},tm=n=>n.sort(Jf).reduce(nm,"").trim(),nm=(n,e)=>`${n} ${e}(var(${Vo(e)}))`,Ji=n=>n.startsWith("--"),Pc=new Set;function rm(n){if(!Pc.has(n)){Pc.add(n);try{const{syntax:e,initialValue:t}=yr.has(n)?yr.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const Mi=(n,e)=>document.createElement("div").animate(n,e),kc={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Mi({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Mi({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Mi({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Oi={},mn={};for(const n in kc)mn[n]=()=>(Oi[n]===void 0&&(Oi[n]=kc[n]()),Oi[n]);const sm=.015,im=(n,e)=>{let t="";const r=Math.round(e/sm);for(let s=0;s<r;s++)t+=n(ko(0,r-1,s))+", ";return t.substring(0,t.length-2)},Vc=(n,e)=>wn(n)?mn.linearEasing()?`linear(${im(n,e)})`:Le.easing:mu(n)?om(n):n,om=([n,e,t,r])=>`cubic-bezier(${n}, ${e}, ${t}, ${r})`;function am(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const cm=n=>Array.isArray(n)?n:[n];function Zi(n){return Is[n]&&(n=Is[n]),yu(n)?Vo(n):n}const es={get:(n,e)=>{e=Zi(e);let t=Ji(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const r=yr.get(e);r&&(t=r.initialValue)}return t},set:(n,e,t)=>{e=Zi(e),Ji(e)?n.style.setProperty(e,t):n.style[e]=t}};function Eu(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function lm(n,e){var t;let r=(e==null?void 0:e.toDefaultUnit)||At;const s=n[n.length-1];if(Bf(s)){const i=((t=s.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(r=a=>a+i)}return r}function um(){return window.__MOTION_DEV_TOOLS_RECORD}function hm(n,e,t,r={},s){const i=um(),a=r.record!==!1&&i;let l,{duration:u=Le.duration,delay:d=Le.delay,endDelay:m=Le.endDelay,repeat:g=Le.repeat,easing:I=Le.easing,persist:C=!1,direction:N,offset:S,allowWebkitAcceleration:V=!1,autoplay:x=!0}=r;const q=_u(n),B=yu(e);let D=mn.waapi();B&&em(n,e);const L=Zi(e),M=Kf(q.values,L),E=yr.get(L);return Eu(M.animation,!(Xi(I)&&M.generator)&&r.record!==!1),()=>{const p=()=>{var T,v;return(v=(T=es.get(n,L))!==null&&T!==void 0?T:E==null?void 0:E.initialValue)!==null&&v!==void 0?v:0};let _=am(cm(t),p);const w=lm(_,E);if(Xi(I)){const T=I.createAnimation(_,e!=="opacity",p,L,M);I=T.easing,_=T.keyframes||_,u=T.duration||u}if(Ji(L)&&(mn.cssRegisterProperty()?rm(L):D=!1),B&&!mn.linearEasing()&&(wn(I)||gn(I)&&I.some(wn))&&(D=!1),D){E&&(_=_.map(y=>_r(y)?E.toDefaultUnit(y):y)),_.length===1&&(!mn.partialKeyframes()||a)&&_.unshift(p());const T={delay:ur.ms(d),duration:ur.ms(u),endDelay:ur.ms(m),easing:gn(I)?void 0:Vc(I,u),direction:N,iterations:g+1,fill:"both"};l=n.animate({[L]:_,offset:S,easing:gn(I)?I.map(y=>Vc(y,u)):void 0},T),l.finished||(l.finished=new Promise((y,fe)=>{l.onfinish=y,l.oncancel=fe}));const v=_[_.length-1];l.finished.then(()=>{C||(es.set(n,L,v),l.cancel())}).catch(du),V||(l.playbackRate=1.000001)}else if(s&&B)_=_.map(T=>typeof T=="string"?parseFloat(T):T),_.length===1&&_.unshift(parseFloat(p())),l=new s(T=>{es.set(n,L,w?w(T):T)},_,Object.assign(Object.assign({},r),{duration:u,easing:I}));else{const T=_[_.length-1];es.set(n,L,E&&_r(T)?E.toDefaultUnit(T):T)}return a&&i(n,e,_,{duration:u,delay:d,easing:I,repeat:g,offset:S},"motion-one"),M.setAnimation(l),l&&!x&&l.pause(),l}}const dm=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function fm(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const mm=n=>n(),Iu=(n,e,t=Le.duration)=>new Proxy({animations:n.map(mm).filter(Boolean),duration:t,options:e},gm),pm=n=>n.animations[0],gm={get:(n,e)=>{const t=pm(n);switch(e){case"duration":return n.duration;case"currentTime":return ur.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(_m)).catch(du)),n.finished;case"stop":return()=>{n.animations.forEach(r=>Eu(r))};case"forEachNative":return r=>{n.animations.forEach(s=>r(s,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(r=>r[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=ur.ms(t);case"playbackRate":for(let r=0;r<n.animations.length;r++)n.animations[r][e]=t;return!0}return!1}},_m=n=>n.finished;function ym(n=.1,{start:e=0,from:t=0,easing:r}={}){return(s,i)=>{const a=_r(t)?t:Em(t,i),l=Math.abs(a-s);let u=n*l;if(r){const d=i*n;u=Yi(r)(u/d)*d}return e+u}}function Em(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function Im(n,e,t){return wn(n)?n(e,t):n}function Tm(n){return function(t,r,s={}){t=fm(t);const i=t.length,a=[];for(let l=0;l<i;l++){const u=t[l];for(const d in r){const m=dm(s,d);m.delay=Im(m.delay,l,i);const g=hm(u,d,r[d],m,n);a.push(g)}}return Iu(a,s,s.duration)}}const wm=Tm(gu);function vm(n,e={}){return Iu([()=>{const t=new gu(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function xi(n,e,t){return(wn(n)?vm:wm)(n,e,t)}const Am=()=>{};var Nc={};/**
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
 */const Tu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},bm=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},wu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,m=i>>2,g=(i&3)<<4|l>>4;let I=(l&15)<<2|d>>6,C=d&63;u||(C=64,a||(I=64)),r.push(t[m],t[g],t[I],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Tu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):bm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||g==null)throw new Cm;const I=i<<2|l>>4;if(r.push(I),d!==64){const C=l<<4&240|d>>2;if(r.push(C),g!==64){const N=d<<6&192|g;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Cm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Rm=function(n){const e=Tu(n);return wu.encodeByteArray(e,!0)},ws=function(n){return Rm(n).replace(/\./g,"")},vu=function(n){try{return wu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Sm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Pm=()=>Sm().__FIREBASE_DEFAULTS__,km=()=>{if(typeof process>"u"||typeof Nc>"u")return;const n=Nc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Vm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&vu(n[1]);return e&&JSON.parse(e)},js=()=>{try{return Am()||Pm()||km()||Vm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Au=n=>{var e,t;return(t=(e=js())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Nm=n=>{const e=Au(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},bu=()=>{var n;return(n=js())==null?void 0:n.config},Cu=n=>{var e;return(e=js())==null?void 0:e[`_${n}`]};/**
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
 */class Dm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Vn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ru(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Lm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ws(JSON.stringify(t)),ws(JSON.stringify(a)),""].join(".")}const hr={};function Mm(){const n={prod:[],emulator:[]};for(const e of Object.keys(hr))hr[e]?n.emulator.push(e):n.prod.push(e);return n}function Om(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Dc=!1;function Su(n,e){if(typeof window>"u"||typeof document>"u"||!Vn(window.location.host)||hr[n]===e||hr[n]||Dc)return;hr[n]=e;function t(I){return`__firebase__banner__${I}`}const r="__firebase__banner",i=Mm().prod.length>0;function a(){const I=document.getElementById(r);I&&I.remove()}function l(I){I.style.display="flex",I.style.background="#7faaf0",I.style.position="fixed",I.style.bottom="5px",I.style.left="5px",I.style.padding=".5em",I.style.borderRadius="5px",I.style.alignItems="center"}function u(I,C){I.setAttribute("width","24"),I.setAttribute("id",C),I.setAttribute("height","24"),I.setAttribute("viewBox","0 0 24 24"),I.setAttribute("fill","none"),I.style.marginLeft="-6px"}function d(){const I=document.createElement("span");return I.style.cursor="pointer",I.style.marginLeft="16px",I.style.fontSize="24px",I.innerHTML=" &times;",I.onclick=()=>{Dc=!0,a()},I}function m(I,C){I.setAttribute("id",C),I.innerText="Learn more",I.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",I.setAttribute("target","__blank"),I.style.paddingLeft="5px",I.style.textDecoration="underline"}function g(){const I=Om(r),C=t("text"),N=document.getElementById(C)||document.createElement("span"),S=t("learnmore"),V=document.getElementById(S)||document.createElement("a"),x=t("preprendIcon"),q=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(I.created){const B=I.element;l(B),m(V,S);const D=d();u(q,x),B.append(q,N,V,D),document.body.appendChild(B)}i?(N.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,N.innerText="Preview backend running in this workspace."),N.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
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
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function Fm(){var e;const n=(e=js())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Um(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Bm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function qm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $m(){const n=Ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function jm(){return!Fm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function zm(){try{return typeof indexedDB=="object"}catch{return!1}}function Hm(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const Wm="FirebaseError";class ht extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Wm,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rr.prototype.create)}}class Rr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Gm(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ht(s,l,r)}}function Gm(n,e){return n.replace(Km,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Km=/\{\$([^}]+)}/g;function Qm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Lc(i)&&Lc(a)){if(!Qt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Lc(n){return n!==null&&typeof n=="object"}/**
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
 */function Sr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Xm(n,e){const t=new Ym(n,e);return t.subscribe.bind(t)}class Ym{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Jm(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Fi),s.error===void 0&&(s.error=Fi),s.complete===void 0&&(s.complete=Fi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Jm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Fi(){}/**
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
 */function Pe(n){return n&&n._delegate?n._delegate:n}class Xt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const $t="[DEFAULT]";/**
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
 */class Zm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Dm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(tp(e))try{this.getOrInitializeService({instanceIdentifier:$t})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$t){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$t){return this.instances.has(e)}getOptions(e=$t){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ep(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$t){return this.component?this.component.multipleInstances?e:$t:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ep(n){return n===$t?void 0:n}function tp(n){return n.instantiationMode==="EAGER"}/**
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
 */class np{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Zm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var K;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(K||(K={}));const rp={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},sp=K.INFO,ip={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},op=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=ip[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class No{constructor(e){this.name=e,this._logLevel=sp,this._logHandler=op,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?rp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const ap=(n,e)=>e.some(t=>n instanceof t);let Mc,Oc;function cp(){return Mc||(Mc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function lp(){return Oc||(Oc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pu=new WeakMap,eo=new WeakMap,ku=new WeakMap,Ui=new WeakMap,Do=new WeakMap;function up(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(bt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Pu.set(t,n)}).catch(()=>{}),Do.set(e,n),e}function hp(n){if(eo.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});eo.set(n,e)}let to={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return eo.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ku.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return bt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function dp(n){to=n(to)}function fp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Bi(this),e,...t);return ku.set(r,e.sort?e.sort():[e]),bt(r)}:lp().includes(n)?function(...e){return n.apply(Bi(this),e),bt(Pu.get(this))}:function(...e){return bt(n.apply(Bi(this),e))}}function mp(n){return typeof n=="function"?fp(n):(n instanceof IDBTransaction&&hp(n),ap(n,cp())?new Proxy(n,to):n)}function bt(n){if(n instanceof IDBRequest)return up(n);if(Ui.has(n))return Ui.get(n);const e=mp(n);return e!==n&&(Ui.set(n,e),Do.set(e,n)),e}const Bi=n=>Do.get(n);function pp(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=bt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(bt(a.result),u.oldVersion,u.newVersion,bt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const gp=["get","getKey","getAll","getAllKeys","count"],_p=["put","add","delete","clear"],qi=new Map;function xc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(qi.get(e))return qi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=_p.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||gp.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return qi.set(e,i),i}dp(n=>({...n,get:(e,t,r)=>xc(e,t)||n.get(e,t,r),has:(e,t)=>!!xc(e,t)||n.has(e,t)}));/**
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
 */class yp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ep(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Ep(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const no="@firebase/app",Fc="0.14.6";/**
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
 */const at=new No("@firebase/app"),Ip="@firebase/app-compat",Tp="@firebase/analytics-compat",wp="@firebase/analytics",vp="@firebase/app-check-compat",Ap="@firebase/app-check",bp="@firebase/auth",Cp="@firebase/auth-compat",Rp="@firebase/database",Sp="@firebase/data-connect",Pp="@firebase/database-compat",kp="@firebase/functions",Vp="@firebase/functions-compat",Np="@firebase/installations",Dp="@firebase/installations-compat",Lp="@firebase/messaging",Mp="@firebase/messaging-compat",Op="@firebase/performance",xp="@firebase/performance-compat",Fp="@firebase/remote-config",Up="@firebase/remote-config-compat",Bp="@firebase/storage",qp="@firebase/storage-compat",$p="@firebase/firestore",jp="@firebase/ai",zp="@firebase/firestore-compat",Hp="firebase",Wp="12.6.0";/**
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
 */const ro="[DEFAULT]",Gp={[no]:"fire-core",[Ip]:"fire-core-compat",[wp]:"fire-analytics",[Tp]:"fire-analytics-compat",[Ap]:"fire-app-check",[vp]:"fire-app-check-compat",[bp]:"fire-auth",[Cp]:"fire-auth-compat",[Rp]:"fire-rtdb",[Sp]:"fire-data-connect",[Pp]:"fire-rtdb-compat",[kp]:"fire-fn",[Vp]:"fire-fn-compat",[Np]:"fire-iid",[Dp]:"fire-iid-compat",[Lp]:"fire-fcm",[Mp]:"fire-fcm-compat",[Op]:"fire-perf",[xp]:"fire-perf-compat",[Fp]:"fire-rc",[Up]:"fire-rc-compat",[Bp]:"fire-gcs",[qp]:"fire-gcs-compat",[$p]:"fire-fst",[zp]:"fire-fst-compat",[jp]:"fire-vertex","fire-js":"fire-js",[Hp]:"fire-js-all"};/**
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
 */const vs=new Map,Kp=new Map,so=new Map;function Uc(n,e){try{n.container.addComponent(e)}catch(t){at.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function vn(n){const e=n.name;if(so.has(e))return at.debug(`There were multiple attempts to register component ${e}.`),!1;so.set(e,n);for(const t of vs.values())Uc(t,n);for(const t of Kp.values())Uc(t,n);return!0}function Lo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Qp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ct=new Rr("app","Firebase",Qp);/**
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
 */class Xp{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ct.create("app-deleted",{appName:this._name})}}/**
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
 */const Nn=Wp;function Vu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ro,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Ct.create("bad-app-name",{appName:String(s)});if(t||(t=bu()),!t)throw Ct.create("no-options");const i=vs.get(s);if(i){if(Qt(t,i.options)&&Qt(r,i.config))return i;throw Ct.create("duplicate-app",{appName:s})}const a=new np(s);for(const u of so.values())a.addComponent(u);const l=new Xp(t,r,a);return vs.set(s,l),l}function Nu(n=ro){const e=vs.get(n);if(!e&&n===ro&&bu())return Vu();if(!e)throw Ct.create("no-app",{appName:n});return e}function Rt(n,e,t){let r=Gp[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),at.warn(a.join(" "));return}vn(new Xt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Yp="firebase-heartbeat-database",Jp=1,Er="firebase-heartbeat-store";let $i=null;function Du(){return $i||($i=pp(Yp,Jp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Er)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ct.create("idb-open",{originalErrorMessage:n.message})})),$i}async function Zp(n){try{const t=(await Du()).transaction(Er),r=await t.objectStore(Er).get(Lu(n));return await t.done,r}catch(e){if(e instanceof ht)at.warn(e.message);else{const t=Ct.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});at.warn(t.message)}}}async function Bc(n,e){try{const r=(await Du()).transaction(Er,"readwrite");await r.objectStore(Er).put(e,Lu(n)),await r.done}catch(t){if(t instanceof ht)at.warn(t.message);else{const r=Ct.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});at.warn(r.message)}}}function Lu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const eg=1024,tg=30;class ng{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new sg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=qc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>tg){const a=ig(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){at.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=qc(),{heartbeatsToSend:r,unsentEntries:s}=rg(this._heartbeatsCache.heartbeats),i=ws(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return at.warn(t),""}}}function qc(){return new Date().toISOString().substring(0,10)}function rg(n,e=eg){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),$c(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),$c(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class sg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zm()?Hm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Zp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function $c(n){return ws(JSON.stringify({version:2,heartbeats:n})).length}function ig(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function og(n){vn(new Xt("platform-logger",e=>new yp(e),"PRIVATE")),vn(new Xt("heartbeat",e=>new ng(e),"PRIVATE")),Rt(no,Fc,n),Rt(no,Fc,"esm2020"),Rt("fire-js","")}og("");var ag="firebase",cg="12.7.0";/**
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
 */Rt(ag,cg,"app");function Mu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lg=Mu,Ou=new Rr("auth","Firebase",Mu());/**
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
 */const As=new No("@firebase/auth");function ug(n,...e){As.logLevel<=K.WARN&&As.warn(`Auth (${Nn}): ${n}`,...e)}function cs(n,...e){As.logLevel<=K.ERROR&&As.error(`Auth (${Nn}): ${n}`,...e)}/**
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
 */function Ze(n,...e){throw Oo(n,...e)}function qe(n,...e){return Oo(n,...e)}function Mo(n,e,t){const r={...lg(),[e]:t};return new Rr("auth","Firebase",r).create(e,{appName:n.name})}function Gt(n){return Mo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hg(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ze(n,"argument-error"),Mo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Oo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ou.create(n,...e)}function z(n,e,...t){if(!n)throw Oo(e,...t)}function st(n){const e="INTERNAL ASSERTION FAILED: "+n;throw cs(e),new Error(e)}function ct(n,e){n||st(e)}/**
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
 */function io(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function dg(){return jc()==="http:"||jc()==="https:"}function jc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function fg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dg()||Bm()||"connection"in navigator)?navigator.onLine:!0}function mg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Pr{constructor(e,t){this.shortDelay=e,this.longDelay=t,ct(t>e,"Short delay should be less than long delay!"),this.isMobile=xm()||qm()}get(){return fg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function xo(n,e){ct(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class xu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;st("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;st("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;st("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const pg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const gg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],_g=new Pr(3e4,6e4);function Fo(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Dn(n,e,t,r,s={}){return Fu(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Sr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return Um()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Vn(n.emulatorConfig.host)&&(d.credentials="include"),xu.fetch()(await Uu(n,n.config.apiHost,t,l),d)})}async function Fu(n,e,t){n._canInitEmulator=!1;const r={...pg,...e};try{const s=new Eg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ts(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ts(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ts(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw ts(n,"user-disabled",a);const m=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Mo(n,m,d);Ze(n,m)}}catch(s){if(s instanceof ht)throw s;Ze(n,"network-request-failed",{message:String(s)})}}async function yg(n,e,t,r,s={}){const i=await Dn(n,e,t,r,s);return"mfaPendingCredential"in i&&Ze(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Uu(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?xo(n.config,s):`${n.config.apiScheme}://${s}`;return gg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class Eg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qe(this.auth,"network-request-failed")),_g.get())})}}function ts(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=qe(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function Ig(n,e){return Dn(n,"POST","/v1/accounts:delete",e)}async function bs(n,e){return Dn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function dr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Tg(n,e=!1){const t=Pe(n),r=await t.getIdToken(e),s=Uo(r);z(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:dr(ji(s.auth_time)),issuedAtTime:dr(ji(s.iat)),expirationTime:dr(ji(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ji(n){return Number(n)*1e3}function Uo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return cs("JWT malformed, contained fewer than 3 sections"),null;try{const s=vu(t);return s?JSON.parse(s):(cs("Failed to decode base64 JWT payload"),null)}catch(s){return cs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function zc(n){const e=Uo(n);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ir(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ht&&wg(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function wg({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class vg{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class oo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=dr(this.lastLoginAt),this.creationTime=dr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Cs(n){var g;const e=n.auth,t=await n.getIdToken(),r=await Ir(n,bs(e,{idToken:t}));z(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?Bu(s.providerUserInfo):[],a=bg(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new oo(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,m)}async function Ag(n){const e=Pe(n);await Cs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bg(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Cg(n,e){const t=await Fu(n,{},async()=>{const r=Sr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Uu(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&Vn(n.emulatorConfig.host)&&(u.credentials="include"),xu.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Rg(n,e){return Dn(n,"POST","/v2/accounts:revokeToken",Fo(n,e))}/**
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
 */class _n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){z(e.length!==0,"internal-error");const t=zc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Cg(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new _n;return r&&(z(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(z(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(z(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _n,this.toJSON())}_performRefresh(){return st("not implemented")}}/**
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
 */function yt(n,e){z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Fe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new vg(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new oo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ir(this,this.stsTokenManager.getToken(this.auth,e));return z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Tg(this,e)}reload(){return Ag(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Fe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Cs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xe(this.auth.app))return Promise.reject(Gt(this.auth));const e=await this.getIdToken();return await Ir(this,Ig(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,m=t.lastLoginAt??void 0,{uid:g,emailVerified:I,isAnonymous:C,providerData:N,stsTokenManager:S}=t;z(g&&S,e,"internal-error");const V=_n.fromJSON(this.name,S);z(typeof g=="string",e,"internal-error"),yt(r,e.name),yt(s,e.name),z(typeof I=="boolean",e,"internal-error"),z(typeof C=="boolean",e,"internal-error"),yt(i,e.name),yt(a,e.name),yt(l,e.name),yt(u,e.name),yt(d,e.name),yt(m,e.name);const x=new Fe({uid:g,auth:e,email:s,emailVerified:I,displayName:r,isAnonymous:C,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:V,createdAt:d,lastLoginAt:m});return N&&Array.isArray(N)&&(x.providerData=N.map(q=>({...q}))),u&&(x._redirectEventId=u),x}static async _fromIdTokenResponse(e,t,r=!1){const s=new _n;s.updateFromServerResponse(t);const i=new Fe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Cs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];z(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bu(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new _n;l.updateFromIdToken(r);const u=new Fe({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new oo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
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
 */const Hc=new Map;function it(n){ct(n instanceof Function,"Expected a class definition");let e=Hc.get(n);return e?(ct(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Hc.set(n,e),e)}/**
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
 */class qu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}qu.type="NONE";const Wc=qu;/**
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
 */function ls(n,e,t){return`firebase:${n}:${e}:${t}`}class yn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ls(this.userKey,s.apiKey,i),this.fullPersistenceKey=ls("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await bs(this.auth,{idToken:e}).catch(()=>{});return t?Fe._fromGetAccountInfoResponse(this.auth,t,e):null}return Fe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new yn(it(Wc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||it(Wc);const a=ls(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const m=await d._get(a);if(m){let g;if(typeof m=="string"){const I=await bs(e,{idToken:m}).catch(()=>{});if(!I)break;g=await Fe._fromGetAccountInfoResponse(e,I,m)}else g=Fe._fromJSON(e,m);d!==i&&(l=g),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new yn(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new yn(i,e,r))}}/**
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
 */function Gc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Hu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($u(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Gu(e))return"Blackberry";if(Ku(e))return"Webos";if(ju(e))return"Safari";if((e.includes("chrome/")||zu(e))&&!e.includes("edge/"))return"Chrome";if(Wu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function $u(n=Ae()){return/firefox\//i.test(n)}function ju(n=Ae()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function zu(n=Ae()){return/crios\//i.test(n)}function Hu(n=Ae()){return/iemobile/i.test(n)}function Wu(n=Ae()){return/android/i.test(n)}function Gu(n=Ae()){return/blackberry/i.test(n)}function Ku(n=Ae()){return/webos/i.test(n)}function Bo(n=Ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Sg(n=Ae()){var e;return Bo(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Pg(){return $m()&&document.documentMode===10}function Qu(n=Ae()){return Bo(n)||Wu(n)||Ku(n)||Gu(n)||/windows phone/i.test(n)||Hu(n)}/**
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
 */function Xu(n,e=[]){let t;switch(n){case"Browser":t=Gc(Ae());break;case"Worker":t=`${Gc(Ae())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Nn}/${r}`}/**
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
 */class kg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Vg(n,e={}){return Dn(n,"GET","/v2/passwordPolicy",Fo(n,e))}/**
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
 */const Ng=6;class Dg{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ng,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class Lg{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kc(this),this.idTokenSubscription=new Kc(this),this.beforeStateQueue=new kg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ou,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=it(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await yn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await bs(this,{idToken:e}),r=await Fe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(xe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Cs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xe(this.app))return Promise.reject(Gt(this));const t=e?Pe(e):null;return t&&z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xe(this.app)?Promise.reject(Gt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xe(this.app)?Promise.reject(Gt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(it(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Vg(this),t=new Dg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Rr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Rg(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&it(e)||this._popupRedirectResolver;z(t,this,"argument-error"),this.redirectPersistenceManager=await yn.create(this,[it(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(z(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Xu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&ug(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function zs(n){return Pe(n)}class Kc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Xm(t=>this.observer=t)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let qo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Mg(n){qo=n}function Og(n){return qo.loadJS(n)}function xg(){return qo.gapiScript}function Fg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Ug(n,e){const t=Lo(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Qt(i,e??{}))return s;Ze(s,"already-initialized")}return t.initialize({options:e})}function Bg(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(it);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function qg(n,e,t){const r=zs(n);z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Yu(e),{host:a,port:l}=$g(e),u=l===null?"":`:${l}`,d={url:`${i}//${a}${u}/`},m=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){z(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),z(Qt(d,r.config.emulator)&&Qt(m,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=m,r.settings.appVerificationDisabledForTesting=!0,Vn(a)?(Ru(`${i}//${a}${u}`),Su("Auth",!0)):jg()}function Yu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function $g(n){const e=Yu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Qc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Qc(a)}}}function Qc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function jg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ju{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return st("not implemented")}_getIdTokenResponse(e){return st("not implemented")}_linkToIdToken(e,t){return st("not implemented")}_getReauthenticationResolver(e){return st("not implemented")}}/**
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
 */async function En(n,e){return yg(n,"POST","/v1/accounts:signInWithIdp",Fo(n,e))}/**
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
 */const zg="http://localhost";class Yt extends Ju{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Yt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Yt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return En(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,En(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,En(e,t)}buildRequest(){const e={requestUri:zg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Sr(t)}return e}}/**
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
 */class $o{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class kr extends $o{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class It extends kr{constructor(){super("facebook.com")}static credential(e){return Yt._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.FACEBOOK_SIGN_IN_METHOD="facebook.com";It.PROVIDER_ID="facebook.com";/**
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
 */class rt extends kr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Yt._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return rt.credential(t,r)}catch{return null}}}rt.GOOGLE_SIGN_IN_METHOD="google.com";rt.PROVIDER_ID="google.com";/**
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
 */class Tt extends kr{constructor(){super("github.com")}static credential(e){return Yt._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tt.credential(e.oauthAccessToken)}catch{return null}}}Tt.GITHUB_SIGN_IN_METHOD="github.com";Tt.PROVIDER_ID="github.com";/**
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
 */class wt extends kr{constructor(){super("twitter.com")}static credential(e,t){return Yt._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return wt.credential(t,r)}catch{return null}}}wt.TWITTER_SIGN_IN_METHOD="twitter.com";wt.PROVIDER_ID="twitter.com";/**
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
 */class An{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Fe._fromIdTokenResponse(e,r,s),a=Xc(r);return new An({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Xc(r);return new An({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Xc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Rs extends ht{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Rs.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Rs(e,t,r,s)}}function Zu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Rs._fromErrorAndOperation(n,i,e,r):i})}async function Hg(n,e,t=!1){const r=await Ir(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return An._forOperation(n,"link",r)}/**
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
 */async function Wg(n,e,t=!1){const{auth:r}=n;if(xe(r.app))return Promise.reject(Gt(r));const s="reauthenticate";try{const i=await Ir(n,Zu(r,s,e,n),t);z(i.idToken,r,"internal-error");const a=Uo(i.idToken);z(a,r,"internal-error");const{sub:l}=a;return z(n.uid===l,r,"user-mismatch"),An._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ze(r,"user-mismatch"),i}}/**
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
 */async function Gg(n,e,t=!1){if(xe(n.app))return Promise.reject(Gt(n));const r="signIn",s=await Zu(n,r,e),i=await An._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}/**
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
 */function eh(n,e){return Pe(n).setPersistence(e)}function Kg(n,e,t,r){return Pe(n).onIdTokenChanged(e,t,r)}function Qg(n,e,t){return Pe(n).beforeAuthStateChanged(e,t)}function Xg(n,e,t,r){return Pe(n).onAuthStateChanged(e,t,r)}function Yg(n){return Pe(n).signOut()}const Ss="__sak";/**
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
 */class th{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ss,"1"),this.storage.removeItem(Ss),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Jg=1e3,Zg=10;class nh extends th{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Qu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Pg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Zg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Jg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}nh.type="LOCAL";const jo=nh;/**
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
 */class rh extends th{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rh.type="SESSION";const sh=rh;/**
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
 */function e_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Hs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Hs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await e_(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hs.receivers=[];/**
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
 */function zo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class t_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=zo("",20);s.port1.start();const m=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const I=g;if(I.data.eventId===d)switch(I.data.status){case"ack":clearTimeout(m),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(I.data.response);break;default:clearTimeout(m),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function Ge(){return window}function n_(n){Ge().location.href=n}/**
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
 */function ih(){return typeof Ge().WorkerGlobalScope<"u"&&typeof Ge().importScripts=="function"}async function r_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function s_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function i_(){return ih()?self:null}/**
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
 */const oh="firebaseLocalStorageDb",o_=1,Ps="firebaseLocalStorage",ah="fbase_key";class Vr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ws(n,e){return n.transaction([Ps],e?"readwrite":"readonly").objectStore(Ps)}function a_(){const n=indexedDB.deleteDatabase(oh);return new Vr(n).toPromise()}function ao(){const n=indexedDB.open(oh,o_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ps,{keyPath:ah})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ps)?e(r):(r.close(),await a_(),e(await ao()))})})}async function Yc(n,e,t){const r=Ws(n,!0).put({[ah]:e,value:t});return new Vr(r).toPromise()}async function c_(n,e){const t=Ws(n,!1).get(e),r=await new Vr(t).toPromise();return r===void 0?null:r.value}function Jc(n,e){const t=Ws(n,!0).delete(e);return new Vr(t).toPromise()}const l_=800,u_=3;class ch{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ao(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>u_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ih()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hs._getInstance(i_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await r_(),!this.activeServiceWorker)return;this.sender=new t_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||s_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ao();return await Yc(e,Ss,"1"),await Jc(e,Ss),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Yc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>c_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Jc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ws(s,!1).getAll();return new Vr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),l_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ch.type="LOCAL";const h_=ch;new Pr(3e4,6e4);/**
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
 */function lh(n,e){return e?it(e):(z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ho extends Ju{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return En(e,this._buildIdpRequest())}_linkToIdToken(e,t){return En(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return En(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function d_(n){return Gg(n.auth,new Ho(n),n.bypassAuthState)}function f_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),Wg(t,new Ho(n),n.bypassAuthState)}async function m_(n){const{auth:e,user:t}=n;return z(t,e,"internal-error"),Hg(t,new Ho(n),n.bypassAuthState)}/**
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
 */class uh{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return d_;case"linkViaPopup":case"linkViaRedirect":return m_;case"reauthViaPopup":case"reauthViaRedirect":return f_;default:Ze(this.auth,"internal-error")}}resolve(e){ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ct(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const p_=new Pr(2e3,1e4);async function g_(n,e,t){if(xe(n.app))return Promise.reject(qe(n,"operation-not-supported-in-this-environment"));const r=zs(n);hg(n,e,$o);const s=lh(r,t);return new jt(r,"signInViaPopup",e,s).executeNotNull()}class jt extends uh{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,jt.currentPopupAction&&jt.currentPopupAction.cancel(),jt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){ct(this.filter.length===1,"Popup operations only handle one event");const e=zo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,jt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,p_.get())};e()}}jt.currentPopupAction=null;/**
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
 */const __="pendingRedirect",us=new Map;class y_ extends uh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=us.get(this.auth._key());if(!e){try{const r=await E_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}us.set(this.auth._key(),e)}return this.bypassAuthState||us.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function E_(n,e){const t=w_(e),r=T_(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function I_(n,e){us.set(n._key(),e)}function T_(n){return it(n._redirectPersistence)}function w_(n){return ls(__,n.config.apiKey,n.name)}async function v_(n,e,t=!1){if(xe(n.app))return Promise.reject(Gt(n));const r=zs(n),s=lh(r,e),a=await new y_(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const A_=10*60*1e3;class b_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!C_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!hh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(qe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=A_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zc(e))}saveEventToCache(e){this.cachedEventUids.add(Zc(e)),this.lastProcessedEventTime=Date.now()}}function Zc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function hh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function C_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return hh(n);default:return!1}}/**
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
 */async function R_(n,e={}){return Dn(n,"GET","/v1/projects",e)}/**
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
 */const S_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,P_=/^https?/;async function k_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await R_(n);for(const t of e)try{if(V_(t))return}catch{}Ze(n,"unauthorized-domain")}function V_(n){const e=io(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!P_.test(t))return!1;if(S_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const N_=new Pr(3e4,6e4);function el(){const n=Ge().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function D_(n){return new Promise((e,t)=>{var s,i,a;function r(){el(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{el(),t(qe(n,"network-request-failed"))},timeout:N_.get()})}if((i=(s=Ge().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=Ge().gapi)!=null&&a.load)r();else{const l=Fg("iframefcb");return Ge()[l]=()=>{gapi.load?r():t(qe(n,"network-request-failed"))},Og(`${xg()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw hs=null,e})}let hs=null;function L_(n){return hs=hs||D_(n),hs}/**
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
 */const M_=new Pr(5e3,15e3),O_="__/auth/iframe",x_="emulator/auth/iframe",F_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},U_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function B_(n){const e=n.config;z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?xo(e,x_):`https://${n.config.authDomain}/${O_}`,r={apiKey:e.apiKey,appName:n.name,v:Nn},s=U_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Sr(r).slice(1)}`}async function q_(n){const e=await L_(n),t=Ge().gapi;return z(t,n,"internal-error"),e.open({where:document.body,url:B_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:F_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=qe(n,"network-request-failed"),l=Ge().setTimeout(()=>{i(a)},M_.get());function u(){Ge().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const $_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},j_=500,z_=600,H_="_blank",W_="http://localhost";class tl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function G_(n,e,t,r=j_,s=z_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...$_,width:r.toString(),height:s.toString(),top:i,left:a},d=Ae().toLowerCase();t&&(l=zu(d)?H_:t),$u(d)&&(e=e||W_,u.scrollbars="yes");const m=Object.entries(u).reduce((I,[C,N])=>`${I}${C}=${N},`,"");if(Sg(d)&&l!=="_self")return K_(e||"",l),new tl(null);const g=window.open(e||"",l,m);z(g,n,"popup-blocked");try{g.focus()}catch{}return new tl(g)}function K_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Q_="__/auth/handler",X_="emulator/auth/handler",Y_=encodeURIComponent("fac");async function nl(n,e,t,r,s,i){z(n.config.authDomain,n,"auth-domain-config-required"),z(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Nn,eventId:s};if(e instanceof $o){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Qm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[m,g]of Object.entries({}))a[m]=g}if(e instanceof kr){const m=e.getScopes().filter(g=>g!=="");m.length>0&&(a.scopes=m.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const m of Object.keys(l))l[m]===void 0&&delete l[m];const u=await n._getAppCheckToken(),d=u?`#${Y_}=${encodeURIComponent(u)}`:"";return`${J_(n)}?${Sr(l).slice(1)}${d}`}function J_({config:n}){return n.emulator?xo(n,X_):`https://${n.authDomain}/${Q_}`}/**
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
 */const zi="webStorageSupport";class Z_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sh,this._completeRedirectFn=v_,this._overrideRedirectResult=I_}async _openPopup(e,t,r,s){var a;ct((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await nl(e,t,r,io(),s);return G_(e,i,zo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await nl(e,t,r,io(),s);return n_(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ct(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await q_(e),r=new b_(e);return t.register("authEvent",s=>(z(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(zi,{type:zi},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[zi];i!==void 0&&t(!!i),Ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=k_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Qu()||ju()||Bo()}}const ey=Z_;var rl="@firebase/auth",sl="1.12.0";/**
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
 */class ty{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function ny(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ry(n){vn(new Xt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;z(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Xu(n)},d=new Lg(r,s,i,u);return Bg(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),vn(new Xt("auth-internal",e=>{const t=zs(e.getProvider("auth").getImmediate());return(r=>new ty(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Rt(rl,sl,ny(n)),Rt(rl,sl,"esm2020")}/**
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
 */const sy=5*60,iy=Cu("authIdTokenMaxAge")||sy;let il=null;const oy=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>iy)return;const s=t==null?void 0:t.token;il!==s&&(il=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ay(n=Nu()){const e=Lo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ug(n,{popupRedirectResolver:ey,persistence:[h_,jo,sh]}),r=Cu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=oy(i.toString());Qg(t,a,()=>a(t.currentUser)),Kg(t,l=>a(l))}}const s=Au("auth");return s&&qg(t,`http://${s}`),t}function cy(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Mg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=qe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",cy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ry("Browser");var ol=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var St,dh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,p){function _(){}_.prototype=p.prototype,E.F=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(w,T,v){for(var y=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)y[fe-2]=arguments[fe];return p.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,_){_||(_=0);const w=Array(16);if(typeof p=="string")for(var T=0;T<16;++T)w[T]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(T=0;T<16;++T)w[T]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],T=E.g[2];let v=E.g[3],y;y=p+(v^_&(T^v))+w[0]+3614090360&4294967295,p=_+(y<<7&4294967295|y>>>25),y=v+(T^p&(_^T))+w[1]+3905402710&4294967295,v=p+(y<<12&4294967295|y>>>20),y=T+(_^v&(p^_))+w[2]+606105819&4294967295,T=v+(y<<17&4294967295|y>>>15),y=_+(p^T&(v^p))+w[3]+3250441966&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(v^_&(T^v))+w[4]+4118548399&4294967295,p=_+(y<<7&4294967295|y>>>25),y=v+(T^p&(_^T))+w[5]+1200080426&4294967295,v=p+(y<<12&4294967295|y>>>20),y=T+(_^v&(p^_))+w[6]+2821735955&4294967295,T=v+(y<<17&4294967295|y>>>15),y=_+(p^T&(v^p))+w[7]+4249261313&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(v^_&(T^v))+w[8]+1770035416&4294967295,p=_+(y<<7&4294967295|y>>>25),y=v+(T^p&(_^T))+w[9]+2336552879&4294967295,v=p+(y<<12&4294967295|y>>>20),y=T+(_^v&(p^_))+w[10]+4294925233&4294967295,T=v+(y<<17&4294967295|y>>>15),y=_+(p^T&(v^p))+w[11]+2304563134&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(v^_&(T^v))+w[12]+1804603682&4294967295,p=_+(y<<7&4294967295|y>>>25),y=v+(T^p&(_^T))+w[13]+4254626195&4294967295,v=p+(y<<12&4294967295|y>>>20),y=T+(_^v&(p^_))+w[14]+2792965006&4294967295,T=v+(y<<17&4294967295|y>>>15),y=_+(p^T&(v^p))+w[15]+1236535329&4294967295,_=T+(y<<22&4294967295|y>>>10),y=p+(T^v&(_^T))+w[1]+4129170786&4294967295,p=_+(y<<5&4294967295|y>>>27),y=v+(_^T&(p^_))+w[6]+3225465664&4294967295,v=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(v^p))+w[11]+643717713&4294967295,T=v+(y<<14&4294967295|y>>>18),y=_+(v^p&(T^v))+w[0]+3921069994&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^v&(_^T))+w[5]+3593408605&4294967295,p=_+(y<<5&4294967295|y>>>27),y=v+(_^T&(p^_))+w[10]+38016083&4294967295,v=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(v^p))+w[15]+3634488961&4294967295,T=v+(y<<14&4294967295|y>>>18),y=_+(v^p&(T^v))+w[4]+3889429448&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^v&(_^T))+w[9]+568446438&4294967295,p=_+(y<<5&4294967295|y>>>27),y=v+(_^T&(p^_))+w[14]+3275163606&4294967295,v=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(v^p))+w[3]+4107603335&4294967295,T=v+(y<<14&4294967295|y>>>18),y=_+(v^p&(T^v))+w[8]+1163531501&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(T^v&(_^T))+w[13]+2850285829&4294967295,p=_+(y<<5&4294967295|y>>>27),y=v+(_^T&(p^_))+w[2]+4243563512&4294967295,v=p+(y<<9&4294967295|y>>>23),y=T+(p^_&(v^p))+w[7]+1735328473&4294967295,T=v+(y<<14&4294967295|y>>>18),y=_+(v^p&(T^v))+w[12]+2368359562&4294967295,_=T+(y<<20&4294967295|y>>>12),y=p+(_^T^v)+w[5]+4294588738&4294967295,p=_+(y<<4&4294967295|y>>>28),y=v+(p^_^T)+w[8]+2272392833&4294967295,v=p+(y<<11&4294967295|y>>>21),y=T+(v^p^_)+w[11]+1839030562&4294967295,T=v+(y<<16&4294967295|y>>>16),y=_+(T^v^p)+w[14]+4259657740&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^v)+w[1]+2763975236&4294967295,p=_+(y<<4&4294967295|y>>>28),y=v+(p^_^T)+w[4]+1272893353&4294967295,v=p+(y<<11&4294967295|y>>>21),y=T+(v^p^_)+w[7]+4139469664&4294967295,T=v+(y<<16&4294967295|y>>>16),y=_+(T^v^p)+w[10]+3200236656&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^v)+w[13]+681279174&4294967295,p=_+(y<<4&4294967295|y>>>28),y=v+(p^_^T)+w[0]+3936430074&4294967295,v=p+(y<<11&4294967295|y>>>21),y=T+(v^p^_)+w[3]+3572445317&4294967295,T=v+(y<<16&4294967295|y>>>16),y=_+(T^v^p)+w[6]+76029189&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(_^T^v)+w[9]+3654602809&4294967295,p=_+(y<<4&4294967295|y>>>28),y=v+(p^_^T)+w[12]+3873151461&4294967295,v=p+(y<<11&4294967295|y>>>21),y=T+(v^p^_)+w[15]+530742520&4294967295,T=v+(y<<16&4294967295|y>>>16),y=_+(T^v^p)+w[2]+3299628645&4294967295,_=T+(y<<23&4294967295|y>>>9),y=p+(T^(_|~v))+w[0]+4096336452&4294967295,p=_+(y<<6&4294967295|y>>>26),y=v+(_^(p|~T))+w[7]+1126891415&4294967295,v=p+(y<<10&4294967295|y>>>22),y=T+(p^(v|~_))+w[14]+2878612391&4294967295,T=v+(y<<15&4294967295|y>>>17),y=_+(v^(T|~p))+w[5]+4237533241&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~v))+w[12]+1700485571&4294967295,p=_+(y<<6&4294967295|y>>>26),y=v+(_^(p|~T))+w[3]+2399980690&4294967295,v=p+(y<<10&4294967295|y>>>22),y=T+(p^(v|~_))+w[10]+4293915773&4294967295,T=v+(y<<15&4294967295|y>>>17),y=_+(v^(T|~p))+w[1]+2240044497&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~v))+w[8]+1873313359&4294967295,p=_+(y<<6&4294967295|y>>>26),y=v+(_^(p|~T))+w[15]+4264355552&4294967295,v=p+(y<<10&4294967295|y>>>22),y=T+(p^(v|~_))+w[6]+2734768916&4294967295,T=v+(y<<15&4294967295|y>>>17),y=_+(v^(T|~p))+w[13]+1309151649&4294967295,_=T+(y<<21&4294967295|y>>>11),y=p+(T^(_|~v))+w[4]+4149444226&4294967295,p=_+(y<<6&4294967295|y>>>26),y=v+(_^(p|~T))+w[11]+3174756917&4294967295,v=p+(y<<10&4294967295|y>>>22),y=T+(p^(v|~_))+w[2]+718787259&4294967295,T=v+(y<<15&4294967295|y>>>17),y=_+(v^(T|~p))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+v&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const _=p-this.blockSize,w=this.C;let T=this.h,v=0;for(;v<p;){if(T==0)for(;v<=_;)s(this,E,v),v+=this.blockSize;if(typeof E=="string"){for(;v<p;)if(w[T++]=E.charCodeAt(v++),T==this.blockSize){s(this,w),T=0;break}}else for(;v<p;)if(w[T++]=E[v++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,_=0;_<4;++_)for(let w=0;w<32;w+=8)E[p++]=this.g[_]>>>w&255;return E};function i(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;const _=[];let w=!0;for(let T=E.length-1;T>=0;T--){const v=E[T]|0;w&&v==p||(_[T]=v,w=!1)}this.g=_}var l={};function u(E){return-128<=E&&E<128?i(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return g;if(E<0)return V(d(-E));const p=[];let _=1;for(let w=0;E>=_;w++)p[w]=E/_|0,_*=4294967296;return new a(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return V(m(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(p,8));let w=g;for(let v=0;v<E.length;v+=8){var T=Math.min(8,E.length-v);const y=parseInt(E.substring(v,v+T),p);T<8?(T=d(Math.pow(p,T)),w=w.j(T).add(d(y))):(w=w.j(_),w=w.add(d(y)))}return w}var g=u(0),I=u(1),C=u(16777216);n=a.prototype,n.m=function(){if(S(this))return-V(this).m();let E=0,p=1;for(let _=0;_<this.g.length;_++){const w=this.i(_);E+=(w>=0?w:4294967296+w)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(S(this))return"-"+V(this).toString(E);const p=d(Math.pow(E,6));var _=this;let w="";for(;;){const T=D(_,p).g;_=x(_,T.j(p));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=T,N(_))return v+w;for(;v.length<6;)v="0"+v;w=v+w}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function S(E){return E.h==-1}n.l=function(E){return E=x(this,E),S(E)?-1:N(E)?0:1};function V(E){const p=E.g.length,_=[];for(let w=0;w<p;w++)_[w]=~E.g[w];return new a(_,~E.h).add(I)}n.abs=function(){return S(this)?V(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),_=[];let w=0;for(let T=0;T<=p;T++){let v=w+(this.i(T)&65535)+(E.i(T)&65535),y=(v>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,v&=65535,y&=65535,_[T]=y<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function x(E,p){return E.add(V(p))}n.j=function(E){if(N(this)||N(E))return g;if(S(this))return S(E)?V(this).j(V(E)):V(V(this).j(E));if(S(E))return V(this.j(V(E)));if(this.l(C)<0&&E.l(C)<0)return d(this.m()*E.m());const p=this.g.length+E.g.length,_=[];for(var w=0;w<2*p;w++)_[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<E.g.length;T++){const v=this.i(w)>>>16,y=this.i(w)&65535,fe=E.i(T)>>>16,tt=E.i(T)&65535;_[2*w+2*T]+=y*tt,q(_,2*w+2*T),_[2*w+2*T+1]+=v*tt,q(_,2*w+2*T+1),_[2*w+2*T+1]+=y*fe,q(_,2*w+2*T+1),_[2*w+2*T+2]+=v*fe,q(_,2*w+2*T+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new a(_,0)};function q(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function B(E,p){this.g=E,this.h=p}function D(E,p){if(N(p))throw Error("division by zero");if(N(E))return new B(g,g);if(S(E))return p=D(V(E),p),new B(V(p.g),V(p.h));if(S(p))return p=D(E,V(p)),new B(V(p.g),p.h);if(E.g.length>30){if(S(E)||S(p))throw Error("slowDivide_ only works with positive integers.");for(var _=I,w=p;w.l(E)<=0;)_=L(_),w=L(w);var T=M(_,1),v=M(w,1);for(w=M(w,2),_=M(_,2);!N(w);){var y=v.add(w);y.l(E)<=0&&(T=T.add(_),v=y),w=M(w,1),_=M(_,1)}return p=x(E,T.j(p)),new B(T,p)}for(T=g;E.l(p)>=0;){for(_=Math.max(1,Math.floor(E.m()/p.m())),w=Math.ceil(Math.log(_)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),v=d(_),y=v.j(p);S(y)||y.l(E)>0;)_-=w,v=d(_),y=v.j(p);N(v)&&(v=I),T=T.add(v),E=x(E,y)}return new B(T,E)}n.B=function(E){return D(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let w=0;w<p;w++)_[w]=this.i(w)&E.i(w);return new a(_,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let w=0;w<p;w++)_[w]=this.i(w)|E.i(w);return new a(_,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let w=0;w<p;w++)_[w]=this.i(w)^E.i(w);return new a(_,this.h^E.h)};function L(E){const p=E.g.length+1,_=[];for(let w=0;w<p;w++)_[w]=E.i(w)<<1|E.i(w-1)>>>31;return new a(_,E.h)}function M(E,p){const _=p>>5;p%=32;const w=E.g.length-_,T=[];for(let v=0;v<w;v++)T[v]=p>0?E.i(v+_)>>>p|E.i(v+_+1)<<32-p:E.i(v+_);return new a(T,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,dh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,St=a}).apply(typeof ol<"u"?ol:typeof self<"u"?self:typeof window<"u"?window:{});var ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fh,ir,mh,ds,co,ph,gh,_h;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ns=="object"&&ns];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var A=o[f];if(!(A in h))break e;h=h[A]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function u(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=u,d.apply(null,arguments)}function m(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function g(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,A,R){for(var O=Array(arguments.length-2),G=2;G<arguments.length;G++)O[G-2]=arguments[G];return c.prototype[A].apply(f,O)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function C(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function N(o,c){for(let f=1;f<arguments.length;f++){const A=arguments[f];var h=typeof A;if(h=h!="object"?h:A?Array.isArray(A)?"array":h:"null",h=="array"||h=="object"&&typeof A.length=="number"){h=o.length||0;const R=A.length||0;o.length=h+R;for(let O=0;O<R;O++)o[h+O]=A[O]}else o.push(A)}}class S{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function V(o){a.setTimeout(()=>{throw o},0)}function x(){var o=E;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class q{constructor(){this.h=this.g=null}add(c,h){const f=B.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var B=new S(()=>new D,o=>o.reset());class D{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let L,M=!1,E=new q,p=()=>{const o=Promise.resolve(void 0);L=()=>{o.then(_)}};function _(){for(var o;o=x();){try{o.h.call(o.g)}catch(h){V(h)}var c=B;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}M=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var v=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o}();function y(o){return/^[\s\xa0]*$/.test(o)}function fe(o,c){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}g(fe,T),fe.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&fe.Z.h.call(this)},fe.prototype.h=function(){fe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var tt="closure_listenable_"+(Math.random()*1e6|0),ci=0;function Ra(o,c,h,f,A){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=A,this.key=++ci,this.da=this.fa=!1}function sn(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function on(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function li(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Br(o){const c={};for(const h in o)c[h]=o[h];return c}const Sa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Pa(o,c){let h,f;for(let A=1;A<arguments.length;A++){f=arguments[A];for(h in f)o[h]=f[h];for(let R=0;R<Sa.length;R++)h=Sa[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function qr(o){this.src=o,this.g={},this.h=0}qr.prototype.add=function(o,c,h,f,A){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const O=hi(o,c,f,A);return O>-1?(c=o[O],h||(c.fa=!1)):(c=new Ra(c,this.src,R,!!f,A),c.fa=h,o.push(c)),c};function ui(o,c){const h=c.type;if(h in o.g){var f=o.g[h],A=Array.prototype.indexOf.call(f,c,void 0),R;(R=A>=0)&&Array.prototype.splice.call(f,A,1),R&&(sn(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function hi(o,c,h,f){for(let A=0;A<o.length;++A){const R=o[A];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return A}return-1}var di="closure_lm_"+(Math.random()*1e6|0),fi={};function ka(o,c,h,f,A){if(Array.isArray(c)){for(let R=0;R<c.length;R++)ka(o,c[R],h,f,A);return null}return h=Da(h),o&&o[tt]?o.J(c,h,l(f)?!!f.capture:!1,A):of(o,c,h,!1,f,A)}function of(o,c,h,f,A,R){if(!c)throw Error("Invalid event type");const O=l(A)?!!A.capture:!!A;let G=pi(o);if(G||(o[di]=G=new qr(o)),h=G.add(c,h,f,O,R),h.proxy)return h;if(f=af(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)v||(A=O),A===void 0&&(A=!1),o.addEventListener(c.toString(),f,A);else if(o.attachEvent)o.attachEvent(Na(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function af(){function o(h){return c.call(o.src,o.listener,h)}const c=cf;return o}function Va(o,c,h,f,A){if(Array.isArray(c))for(var R=0;R<c.length;R++)Va(o,c[R],h,f,A);else f=l(f)?!!f.capture:!!f,h=Da(h),o&&o[tt]?(o=o.i,R=String(c).toString(),R in o.g&&(c=o.g[R],h=hi(c,h,f,A),h>-1&&(sn(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[R],o.h--)))):o&&(o=pi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=hi(c,h,f,A)),(h=o>-1?c[o]:null)&&mi(h))}function mi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[tt])ui(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Na(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=pi(c))?(ui(h,o),h.h==0&&(h.src=null,c[di]=null)):sn(o)}}}function Na(o){return o in fi?fi[o]:fi[o]="on"+o}function cf(o,c){if(o.da)o=!0;else{c=new fe(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&mi(o),o=h.call(f,c)}return o}function pi(o){return o=o[di],o instanceof qr?o:null}var gi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Da(o){return typeof o=="function"?o:(o[gi]||(o[gi]=function(c){return o.handleEvent(c)}),o[gi])}function Ee(){w.call(this),this.i=new qr(this),this.M=this,this.G=null}g(Ee,w),Ee.prototype[tt]=!0,Ee.prototype.removeEventListener=function(o,c,h,f){Va(this,o,c,h,f)};function be(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new T(c,o);else if(c instanceof T)c.target=c.target||o;else{var A=c;c=new T(f,o),Pa(c,A)}A=!0;let R,O;if(h)for(O=h.length-1;O>=0;O--)R=c.g=h[O],A=$r(R,f,!0,c)&&A;if(R=c.g=o,A=$r(R,f,!0,c)&&A,A=$r(R,f,!1,c)&&A,h)for(O=0;O<h.length;O++)R=c.g=h[O],A=$r(R,f,!1,c)&&A}Ee.prototype.N=function(){if(Ee.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)sn(h[f]);delete o.g[c],o.h--}}this.G=null},Ee.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Ee.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function $r(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let A=!0;for(let R=0;R<c.length;++R){const O=c[R];if(O&&!O.da&&O.capture==h){const G=O.listener,he=O.ha||O.src;O.fa&&ui(o.i,O),A=G.call(he,f)!==!1&&A}}return A&&!f.defaultPrevented}function lf(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function La(o){o.g=lf(()=>{o.g=null,o.i&&(o.i=!1,La(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class uf extends w{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:La(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Un(o){w.call(this),this.h=o,this.g={}}g(Un,w);var Ma=[];function Oa(o){on(o.g,function(c,h){this.g.hasOwnProperty(h)&&mi(c)},o),o.g={}}Un.prototype.N=function(){Un.Z.N.call(this),Oa(this)},Un.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var _i=a.JSON.stringify,hf=a.JSON.parse,df=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function xa(){}function Fa(){}var Bn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function yi(){T.call(this,"d")}g(yi,T);function Ei(){T.call(this,"c")}g(Ei,T);var xt={},Ua=null;function jr(){return Ua=Ua||new Ee}xt.Ia="serverreachability";function Ba(o){T.call(this,xt.Ia,o)}g(Ba,T);function qn(o){const c=jr();be(c,new Ba(c))}xt.STAT_EVENT="statevent";function qa(o,c){T.call(this,xt.STAT_EVENT,o),this.stat=c}g(qa,T);function Ce(o){const c=jr();be(c,new qa(c,o))}xt.Ja="timingevent";function $a(o,c){T.call(this,xt.Ja,o),this.size=c}g($a,T);function $n(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function jn(){this.g=!0}jn.prototype.ua=function(){this.g=!1};function ff(o,c,h,f,A,R){o.info(function(){if(o.g)if(R){var O="",G=R.split("&");for(let Z=0;Z<G.length;Z++){var he=G[Z].split("=");if(he.length>1){const me=he[0];he=he[1];const ze=me.split("_");O=ze.length>=2&&ze[1]=="type"?O+(me+"="+he+"&"):O+(me+"=redacted&")}}}else O=null;else O=R;return"XMLHTTP REQ ("+f+") [attempt "+A+"]: "+c+`
`+h+`
`+O})}function mf(o,c,h,f,A,R,O){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+A+"]: "+c+`
`+h+`
`+R+" "+O})}function an(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+gf(o,h)+(f?" "+f:"")})}function pf(o,c){o.info(function(){return"TIMEOUT: "+c})}jn.prototype.info=function(){};function gf(o,c){if(!o.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var h=R[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var A=f[0];if(A!="noop"&&A!="stop"&&A!="close")for(let O=1;O<f.length;O++)f[O]=""}}}}return _i(R)}catch{return c}}var zr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ja={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},za;function Ii(){}g(Ii,xa),Ii.prototype.g=function(){return new XMLHttpRequest},za=new Ii;function zn(o){return encodeURIComponent(String(o))}function _f(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function dt(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new Un(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ha}function Ha(){this.i=null,this.g="",this.h=!1}var Wa={},Ti={};function wi(o,c,h){o.M=1,o.A=Wr(je(c)),o.u=h,o.R=!0,Ga(o,null)}function Ga(o,c){o.F=Date.now(),Hr(o),o.B=je(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),oc(h.i,"t",f),o.C=0,h=o.j.L,o.h=new Ha,o.g=Ac(o.j,h?c:null,!o.u),o.P>0&&(o.O=new uf(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var A="readystatechange";Array.isArray(A)||(A&&(Ma[0]=A.toString()),A=Ma);for(let R=0;R<A.length;R++){const O=ka(h,A[R],f||c.handleEvent,!1,c.h||c);if(!O)break;c.g[O.key]=O}c=o.J?Br(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),qn(),ff(o.i,o.v,o.B,o.l,o.S,o.u)}dt.prototype.ba=function(o){o=o.target;const c=this.O;c&&pt(o)==3?c.j():this.Y(o)},dt.prototype.Y=function(o){try{if(o==this.g)e:{const G=pt(this.g),he=this.g.ya(),Z=this.g.ca();if(!(G<3)&&(G!=3||this.g&&(this.h.h||this.g.la()||fc(this.g)))){this.K||G!=4||he==7||(he==8||Z<=0?qn(3):qn(2)),vi(this);var c=this.g.ca();this.X=c;var h=yf(this);if(this.o=c==200,mf(this.i,this.v,this.B,this.l,this.S,G,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,A=this.g;if((f=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(f)){var R=f;break t}}R=null}if(o=R)an(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ai(this,o);else{this.o=!1,this.m=3,Ce(12),Ft(this),Hn(this);break e}}if(this.R){o=!0;let me;for(;!this.K&&this.C<h.length;)if(me=Ef(this,h),me==Ti){G==4&&(this.m=4,Ce(14),o=!1),an(this.i,this.l,null,"[Incomplete Response]");break}else if(me==Wa){this.m=4,Ce(15),an(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else an(this.i,this.l,me,null),Ai(this,me);if(Ka(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),G!=4||h.length!=0||this.h.h||(this.m=1,Ce(16),o=!1),this.o=this.o&&o,!o)an(this.i,this.l,h,"[Invalid Chunked Response]"),Ft(this),Hn(this);else if(h.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Ni(O),O.P=!0,Ce(11))}}else an(this.i,this.l,h,null),Ai(this,h);G==4&&Ft(this),this.o&&!this.K&&(G==4?Ic(this.j,this):(this.o=!1,Hr(this)))}else Df(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ce(12)):(this.m=0,Ce(13)),Ft(this),Hn(this)}}}catch{}finally{}};function yf(o){if(!Ka(o))return o.g.la();const c=fc(o.g);if(c==="")return"";let h="";const f=c.length,A=pt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Ft(o),Hn(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<f;R++)o.h.h=!0,h+=o.h.i.decode(c[R],{stream:!(A&&R==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function Ka(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Ef(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Ti:(h=Number(c.substring(h,f)),isNaN(h)?Wa:(f+=1,f+h>c.length?Ti:(c=c.slice(f,f+h),o.C=f+h,c)))}dt.prototype.cancel=function(){this.K=!0,Ft(this)};function Hr(o){o.T=Date.now()+o.H,Qa(o,o.H)}function Qa(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=$n(d(o.aa,o),c)}function vi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}dt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(pf(this.i,this.B),this.M!=2&&(qn(),Ce(17)),Ft(this),this.m=2,Hn(this)):Qa(this,this.T-o)};function Hn(o){o.j.I==0||o.K||Ic(o.j,o)}function Ft(o){vi(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Oa(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Ai(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||bi(h.h,o))){if(!o.L&&bi(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var A=f;if(A[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Yr(h),Qr(h);else break e;Vi(h),Ce(18)}}else h.xa=A[1],0<h.xa-h.K&&A[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=$n(d(h.Va,h),6e3));Ja(h.h)<=1&&h.ta&&(h.ta=void 0)}else Bt(h,11)}else if((o.L||h.g==o)&&Yr(h),!y(c))for(A=h.Ba.g.parse(c),c=0;c<A.length;c++){let Z=A[c];const me=Z[0];if(!(me<=h.K))if(h.K=me,Z=Z[1],h.I==2)if(Z[0]=="c"){h.M=Z[1],h.ba=Z[2];const ze=Z[3];ze!=null&&(h.ka=ze,h.j.info("VER="+h.ka));const qt=Z[4];qt!=null&&(h.za=qt,h.j.info("SVER="+h.za));const gt=Z[5];gt!=null&&typeof gt=="number"&&gt>0&&(f=1.5*gt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const _t=o.g;if(_t){const Zr=_t.g?_t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Zr){var R=f.h;R.g||Zr.indexOf("spdy")==-1&&Zr.indexOf("quic")==-1&&Zr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ci(R,R.h),R.h=null))}if(f.G){const Di=_t.g?_t.g.getResponseHeader("X-HTTP-Session-Id"):null;Di&&(f.wa=Di,te(f.J,f.G,Di))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var O=o;if(f.na=vc(f,f.L?f.ba:null,f.W),O.L){Za(f.h,O);var G=O,he=f.O;he&&(G.H=he),G.D&&(vi(G),Hr(G)),f.g=O}else yc(f);h.i.length>0&&Xr(h)}else Z[0]!="stop"&&Z[0]!="close"||Bt(h,7);else h.I==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Bt(h,7):ki(h):Z[0]!="noop"&&h.l&&h.l.qa(Z),h.A=0)}}qn(4)}catch{}}var If=class{constructor(o,c){this.g=o,this.map=c}};function Xa(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ya(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ja(o){return o.h?1:o.g?o.g.size:0}function bi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Ci(o,c){o.g?o.g.add(c):o.h=c}function Za(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}Xa.prototype.cancel=function(){if(this.i=ec(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ec(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return C(o.i)}var tc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Tf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let A,R=null;f>=0?(A=o[h].substring(0,f),R=o[h].substring(f+1)):A=o[h],c(A,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function ft(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ft?(this.l=o.l,Wn(this,o.j),this.o=o.o,this.g=o.g,Gn(this,o.u),this.h=o.h,Ri(this,ac(o.i)),this.m=o.m):o&&(c=String(o).match(tc))?(this.l=!1,Wn(this,c[1]||"",!0),this.o=Kn(c[2]||""),this.g=Kn(c[3]||"",!0),Gn(this,c[4]),this.h=Kn(c[5]||"",!0),Ri(this,c[6]||"",!0),this.m=Kn(c[7]||"")):(this.l=!1,this.i=new Xn(null,this.l))}ft.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Qn(c,nc,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Qn(c,nc,!0),"@"),o.push(zn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Qn(h,h.charAt(0)=="/"?Af:vf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Qn(h,Cf)),o.join("")},ft.prototype.resolve=function(o){const c=je(this);let h=!!o.j;h?Wn(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)Gn(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var A=c.h.lastIndexOf("/");A!=-1&&(f=c.h.slice(0,A+1)+f)}if(A=f,A==".."||A==".")f="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){f=A.lastIndexOf("/",0)==0,A=A.split("/");const R=[];for(let O=0;O<A.length;){const G=A[O++];G=="."?f&&O==A.length&&R.push(""):G==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&O==A.length&&R.push("")):(R.push(G),f=!0)}f=R.join("/")}else f=A}return h?c.h=f:h=o.i.toString()!=="",h?Ri(c,ac(o.i)):h=!!o.m,h&&(c.m=o.m),c};function je(o){return new ft(o)}function Wn(o,c,h){o.j=h?Kn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Gn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Ri(o,c,h){c instanceof Xn?(o.i=c,Rf(o.i,o.l)):(h||(c=Qn(c,bf)),o.i=new Xn(c,o.l))}function te(o,c,h){o.i.set(c,h)}function Wr(o){return te(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Kn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Qn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,wf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function wf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var nc=/[#\/\?@]/g,vf=/[#\?:]/g,Af=/[#\?]/g,bf=/[#\?@]/g,Cf=/#/g;function Xn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Ut(o){o.g||(o.g=new Map,o.h=0,o.i&&Tf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Xn.prototype,n.add=function(o,c){Ut(this),this.i=null,o=cn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function rc(o,c){Ut(o),c=cn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function sc(o,c){return Ut(o),c=cn(o,c),o.g.has(c)}n.forEach=function(o,c){Ut(this),this.g.forEach(function(h,f){h.forEach(function(A){o.call(c,A,f,this)},this)},this)};function ic(o,c){Ut(o);let h=[];if(typeof c=="string")sc(o,c)&&(h=h.concat(o.g.get(cn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return Ut(this),this.i=null,o=cn(this,o),sc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=ic(this,o),o.length>0?String(o[0]):c):c};function oc(o,c,h){rc(o,c),h.length>0&&(o.i=null,o.g.set(cn(o,c),C(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const A=zn(h);h=ic(this,h);for(let R=0;R<h.length;R++){let O=A;h[R]!==""&&(O+="="+zn(h[R])),o.push(O)}}return this.i=o.join("&")};function ac(o){const c=new Xn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function cn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Rf(o,c){c&&!o.j&&(Ut(o),o.i=null,o.g.forEach(function(h,f){const A=f.toLowerCase();f!=A&&(rc(this,f),oc(this,A,h))},o)),o.j=c}function Sf(o,c){const h=new jn;if(a.Image){const f=new Image;f.onload=m(mt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=m(mt,h,"TestLoadImage: error",!1,c,f),f.onabort=m(mt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=m(mt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Pf(o,c){const h=new jn,f=new AbortController,A=setTimeout(()=>{f.abort(),mt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(A),R.ok?mt(h,"TestPingServer: ok",!0,c):mt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(A),mt(h,"TestPingServer: error",!1,c)})}function mt(o,c,h,f,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),f(h)}catch{}}function kf(){this.g=new df}function Si(o){this.i=o.Sb||null,this.h=o.ab||!1}g(Si,xa),Si.prototype.g=function(){return new Gr(this.i,this.h)};function Gr(o,c){Ee.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(Gr,Ee),n=Gr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,Jn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Yn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Jn(this)),this.g&&(this.readyState=3,Jn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;cc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function cc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Yn(this):Jn(this),this.readyState==3&&cc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Yn(this))},n.Na=function(o){this.g&&(this.response=o,Yn(this))},n.ga=function(){this.g&&Yn(this)};function Yn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Jn(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Jn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Gr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function lc(o){let c="";return on(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Pi(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=lc(h),typeof o=="string"?h!=null&&zn(h):te(o,c,h))}function se(o){Ee.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(se,Ee);var Vf=/^https?$/i,Nf=["POST","PUT"];n=se.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():za.g(),this.g.onreadystatechange=I(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){uc(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var A in f)h.set(A,f[A]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Nf,c,void 0)>=0)||f||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of h)this.g.setRequestHeader(R,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){uc(this,R)}};function uc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,hc(o),Kr(o)}function hc(o){o.A||(o.A=!0,be(o,"complete"),be(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,be(this,"complete"),be(this,"abort"),Kr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Kr(this,!0)),se.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?dc(this):this.Xa())},n.Xa=function(){dc(this)};function dc(o){if(o.h&&typeof i<"u"){if(o.v&&pt(o)==4)setTimeout(o.Ca.bind(o),0);else if(be(o,"readystatechange"),pt(o)==4){o.h=!1;try{const R=o.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=R===0){let O=String(o.D).match(tc)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),f=!Vf.test(O?O.toLowerCase():"")}h=f}if(h)be(o,"complete"),be(o,"success");else{o.o=6;try{var A=pt(o)>2?o.g.statusText:""}catch{A=""}o.l=A+" ["+o.ca()+"]",hc(o)}}finally{Kr(o)}}}}function Kr(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||be(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function pt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return pt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),hf(c)}};function fc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Df(o){const c={};o=(o.g&&pt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(y(o[f]))continue;var h=_f(o[f]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[A]||[];c[A]=R,R.push(h)}li(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Zn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function mc(o){this.za=0,this.i=[],this.j=new jn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Zn("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Zn("baseRetryDelayMs",5e3,o),this.Za=Zn("retryDelaySeedMs",1e4,o),this.Ta=Zn("forwardChannelMaxRetries",2,o),this.va=Zn("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Xa(o&&o.concurrentRequestLimit),this.Ba=new kf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=mc.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,f){Ce(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=vc(this,null,this.W),Xr(this)};function ki(o){if(pc(o),o.I==3){var c=o.V++,h=je(o.J);if(te(h,"SID",o.M),te(h,"RID",c),te(h,"TYPE","terminate"),er(o,h),c=new dt(o,o.j,c),c.M=2,c.A=Wr(je(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=Ac(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Hr(c)}wc(o)}function Qr(o){o.g&&(Ni(o),o.g.cancel(),o.g=null)}function pc(o){Qr(o),o.v&&(a.clearTimeout(o.v),o.v=null),Yr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Xr(o){if(!Ya(o.h)&&!o.m){o.m=!0;var c=o.Ea;L||p(),M||(L(),M=!0),E.add(c,o),o.D=0}}function Lf(o,c){return Ja(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=$n(d(o.Ea,o,c),Tc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const A=new dt(this,this.j,o);let R=this.o;if(this.U&&(R?(R=Br(R),Pa(R,this.U)):R=this.U),this.u!==null||this.R||(A.J=R,R=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=_c(this,A,c),h=je(this.J),te(h,"RID",o),te(h,"CVER",22),this.G&&te(h,"X-HTTP-Session-Id",this.G),er(this,h),R&&(this.R?c="headers="+zn(lc(R))+"&"+c:this.u&&Pi(h,this.u,R)),Ci(this.h,A),this.Ra&&te(h,"TYPE","init"),this.S?(te(h,"$req",c),te(h,"SID","null"),A.U=!0,wi(A,h,null)):wi(A,h,c),this.I=2}}else this.I==3&&(o?gc(this,o):this.i.length==0||Ya(this.h)||gc(this))};function gc(o,c){var h;c?h=c.l:h=o.V++;const f=je(o.J);te(f,"SID",o.M),te(f,"RID",h),te(f,"AID",o.K),er(o,f),o.u&&o.o&&Pi(f,o.u,o.o),h=new dt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=_c(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Ci(o.h,h),wi(h,f,c)}function er(o,c){o.H&&on(o.H,function(h,f){te(c,f,h)}),o.l&&on({},function(h,f){te(c,f,h)})}function _c(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var A=o.i;let G=-1;for(;;){const he=["count="+h];G==-1?h>0?(G=A[0].g,he.push("ofs="+G)):G=0:he.push("ofs="+G);let Z=!0;for(let me=0;me<h;me++){var R=A[me].g;const ze=A[me].map;if(R-=G,R<0)G=Math.max(0,A[me].g-100),Z=!1;else try{R="req"+R+"_"||"";try{var O=ze instanceof Map?ze:Object.entries(ze);for(const[qt,gt]of O){let _t=gt;l(gt)&&(_t=_i(gt)),he.push(R+qt+"="+encodeURIComponent(_t))}}catch(qt){throw he.push(R+"type="+encodeURIComponent("_badmap")),qt}}catch{f&&f(ze)}}if(Z){O=he.join("&");break e}}O=void 0}return o=o.i.splice(0,h),c.G=o,O}function yc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;L||p(),M||(L(),M=!0),E.add(c,o),o.A=0}}function Vi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=$n(d(o.Da,o),Tc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Ec(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=$n(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ce(10),Qr(this),Ec(this))};function Ni(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Ec(o){o.g=new dt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=je(o.na);te(c,"RID","rpc"),te(c,"SID",o.M),te(c,"AID",o.K),te(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&te(c,"TO",o.ia),te(c,"TYPE","xmlhttp"),er(o,c),o.u&&o.o&&Pi(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Wr(je(c)),h.u=null,h.R=!0,Ga(h,o)}n.Va=function(){this.C!=null&&(this.C=null,Qr(this),Vi(this),Ce(19))};function Yr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Ic(o,c){var h=null;if(o.g==c){Yr(o),Ni(o),o.g=null;var f=2}else if(bi(o.h,c))h=c.G,Za(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var A=o.D;f=jr(),be(f,new $a(f,h)),Xr(o)}else yc(o);else if(A=c.m,A==3||A==0&&c.X>0||!(f==1&&Lf(o,c)||f==2&&Vi(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),A){case 1:Bt(o,5);break;case 4:Bt(o,10);break;case 3:Bt(o,6);break;default:Bt(o,2)}}}function Tc(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function Bt(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const A=!f;f=new ft(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Wn(f,"https"),Wr(f),A?Sf(f.toString(),h):Pf(f.toString(),h)}else Ce(2);o.I=0,o.l&&o.l.pa(c),wc(o),pc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ce(2)):(this.j.info("Failed to ping google.com"),Ce(1))};function wc(o){if(o.I=0,o.ja=[],o.l){const c=ec(o.h);(c.length!=0||o.i.length!=0)&&(N(o.ja,c),N(o.ja,o.i),o.h.i.length=0,C(o.i),o.i.length=0),o.l.oa()}}function vc(o,c,h){var f=h instanceof ft?je(h):new ft(h);if(f.g!="")c&&(f.g=c+"."+f.g),Gn(f,f.u);else{var A=a.location;f=A.protocol,c=c?c+"."+A.hostname:A.hostname,A=+A.port;const R=new ft(null);f&&Wn(R,f),c&&(R.g=c),A&&Gn(R,A),h&&(R.h=h),f=R}return h=o.G,c=o.wa,h&&c&&te(f,h,c),te(f,"VER",o.ka),er(o,f),f}function Ac(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new se(new Si({ab:h})):new se(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function bc(){}n=bc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Jr(){}Jr.prototype.g=function(o,c){return new Ne(o,c)};function Ne(o,c){Ee.call(this),this.g=new mc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!y(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!y(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new ln(this)}g(Ne,Ee),Ne.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ne.prototype.close=function(){ki(this.g)},Ne.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=_i(o),o=h);c.i.push(new If(c.Ya++,o)),c.I==3&&Xr(c)},Ne.prototype.N=function(){this.g.l=null,delete this.j,ki(this.g),delete this.g,Ne.Z.N.call(this)};function Cc(o){yi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}g(Cc,yi);function Rc(){Ei.call(this),this.status=1}g(Rc,Ei);function ln(o){this.g=o}g(ln,bc),ln.prototype.ra=function(){be(this.g,"a")},ln.prototype.qa=function(o){be(this.g,new Cc(o))},ln.prototype.pa=function(o){be(this.g,new Rc)},ln.prototype.oa=function(){be(this.g,"b")},Jr.prototype.createWebChannel=Jr.prototype.g,Ne.prototype.send=Ne.prototype.o,Ne.prototype.open=Ne.prototype.m,Ne.prototype.close=Ne.prototype.close,_h=function(){return new Jr},gh=function(){return jr()},ph=xt,co={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},zr.NO_ERROR=0,zr.TIMEOUT=8,zr.HTTP_ERROR=6,ds=zr,ja.COMPLETE="complete",mh=ja,Fa.EventType=Bn,Bn.OPEN="a",Bn.CLOSE="b",Bn.ERROR="c",Bn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.J,ir=Fa,se.prototype.listenOnce=se.prototype.K,se.prototype.getLastError=se.prototype.Ha,se.prototype.getLastErrorCode=se.prototype.ya,se.prototype.getStatus=se.prototype.ca,se.prototype.getResponseJson=se.prototype.La,se.prototype.getResponseText=se.prototype.la,se.prototype.send=se.prototype.ea,se.prototype.setWithCredentials=se.prototype.Fa,fh=se}).apply(typeof ns<"u"?ns:typeof self<"u"?self:typeof window<"u"?window:{});const al="@firebase/firestore",cl="4.9.3";/**
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
 */let Ln="12.7.0";/**
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
 */const Jt=new No("@firebase/firestore");function un(){return Jt.logLevel}function U(n,...e){if(Jt.logLevel<=K.DEBUG){const t=e.map(Wo);Jt.debug(`Firestore (${Ln}): ${n}`,...t)}}function lt(n,...e){if(Jt.logLevel<=K.ERROR){const t=e.map(Wo);Jt.error(`Firestore (${Ln}): ${n}`,...t)}}function bn(n,...e){if(Jt.logLevel<=K.WARN){const t=e.map(Wo);Jt.warn(`Firestore (${Ln}): ${n}`,...t)}}function Wo(n){if(typeof n=="string")return n;try{/**
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
 */function j(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,yh(n,r,t)}function yh(n,e,t){let r=`FIRESTORE (${Ln}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw lt(r),new Error(r)}function J(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||yh(e,s,r)}function W(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ot{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Eh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ly{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Te.UNAUTHENTICATED))}shutdown(){}}class uy{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class hy{constructor(e){this.t=e,this.currentUser=Te.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){J(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new ot;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ot,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ot)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(J(typeof r.accessToken=="string",31837,{l:r}),new Eh(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return J(e===null||typeof e=="string",2055,{h:e}),new Te(e)}}class dy{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Te.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class fy{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new dy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Te.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ll{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class my{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,xe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){J(this.o===void 0,3512);const r=i=>{i.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,U("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ll(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(J(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ll(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function py(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Go{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=py(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function lo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Hi(s)===Hi(i)?Q(s,i):Hi(s)?1:-1}return Q(n.length,e.length)}const gy=55296,_y=57343;function Hi(n){const e=n.charCodeAt(0);return e>=gy&&e<=_y}function Cn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
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
 */const ul="__name__";class We{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&j(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return We.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof We?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=We.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=We.isNumericId(e),s=We.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?We.extractNumericId(e).compare(We.extractNumericId(t)):lo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return St.fromString(e.substring(4,e.length-2))}}class ee extends We{construct(e,t,r){return new ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const yy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends We{construct(e,t,r){return new _e(e,t,r)}static isValidIdentifier(e){return yy.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ul}static keyField(){return new _e([ul])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new F(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new F(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new F(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(t)}static emptyPath(){return new _e([])}}/**
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
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ee.fromString(e))}static fromName(e){return new $(ee.fromString(e).popFirst(5))}static empty(){return new $(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ee(e.slice()))}}/**
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
 */function Ih(n,e,t){if(!t)throw new F(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ey(n,e,t,r){if(e===!0&&r===!0)throw new F(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function hl(n){if(!$.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function dl(n){if($.isDocumentKey(n))throw new F(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Th(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Gs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function kt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Gs(n);throw new F(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function le(n,e){const t={typeString:n};return e&&(t.value=e),t}function Nr(n,e){if(!Th(n))throw new F(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new F(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const fl=-62135596800,ml=1e6;class ne{static now(){return ne.fromMillis(Date.now())}static fromDate(e){return ne.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*ml);return new ne(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<fl)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/ml}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ne._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Nr(e,ne._jsonSchema))return new ne(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-fl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ne._jsonSchemaVersion="firestore/timestamp/1.0",ne._jsonSchema={type:le("string",ne._jsonSchemaVersion),seconds:le("number"),nanoseconds:le("number")};/**
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
 */const Tr=-1;function Iy(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(r===1e9?new ne(t+1,0):new ne(t,r));return new Vt(s,$.empty(),e)}function Ty(n){return new Vt(n.readTime,n.key,Tr)}class Vt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vt(H.min(),$.empty(),Tr)}static max(){return new Vt(H.max(),$.empty(),Tr)}}function wy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
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
 */const vy="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ay{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Mn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==vy)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,r)=>{t(e)})}static reject(e){return new k((t,r)=>{r(e)})}static waitFor(e){return new k((t,r)=>{let s=0,i=0,a=!1;e.forEach(l=>{++s,l.next(()=>{++i,a&&i===s&&t()},u=>r(u))}),a=!0,i===s&&t()})}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next(s=>s?k.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new k((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(m=>{a[d]=m,++l,l===i&&r(a)},m=>s(m))}})}static doWhile(e,t){return new k((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function by(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function On(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Ks{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ks.ce=-1;/**
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
 */const Ko=-1;function Qs(n){return n==null}function ks(n){return n===0&&1/n==-1/0}function Cy(n){return typeof n=="number"&&Number.isInteger(n)&&!ks(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const wh="";function Ry(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=pl(e)),e=Sy(n.get(t),e);return pl(e)}function Sy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case wh:t+="";break;default:t+=i}}return t}function pl(n){return n+wh+""}/**
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
 */function gl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function en(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function vh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class re{constructor(e,t){this.comparator=e,this.root=t||ge.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ge.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ge.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rs(this.root,e,this.comparator,!1)}getReverseIterator(){return new rs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rs(this.root,e,this.comparator,!0)}}class rs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ge{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??ge.RED,this.left=s??ge.EMPTY,this.right=i??ge.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new ge(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ge.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ge.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ge.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ge.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw j(27949);return e+(this.isRed()?0:1)}}ge.EMPTY=null,ge.RED=!0,ge.BLACK=!1;ge.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new ge(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class de{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new _l(this.data.getIterator())}getIteratorFrom(e){return new _l(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class _l{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Ue{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new Ue([])}unionWith(e){let t=new de(_e.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ue(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Cn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Ah extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ye{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ah("Invalid base64 string: "+i):i}}(e);return new ye(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new ye(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ye.EMPTY_BYTE_STRING=new ye("");const Py=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nt(n){if(J(!!n,39018),typeof n=="string"){let e=0;const t=Py.exec(n);if(J(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ie(n.seconds),nanos:ie(n.nanos)}}function ie(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Dt(n){return typeof n=="string"?ye.fromBase64String(n):ye.fromUint8Array(n)}/**
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
 */const bh="server_timestamp",Ch="__type__",Rh="__previous_value__",Sh="__local_write_time__";function Qo(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ch])==null?void 0:r.stringValue)===bh}function Xs(n){const e=n.mapValue.fields[Rh];return Qo(e)?Xs(e):e}function wr(n){const e=Nt(n.mapValue.fields[Sh].timestampValue);return new ne(e.seconds,e.nanos)}/**
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
 */class ky{constructor(e,t,r,s,i,a,l,u,d,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=m}}const Vs="(default)";class vr{constructor(e,t){this.projectId=e,this.database=t||Vs}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database===Vs}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Ph="__type__",Vy="__max__",ss={mapValue:{}},kh="__vector__",Ns="value";function Lt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Qo(n)?4:Dy(n)?9007199254740991:Ny(n)?10:11:j(28295,{value:n})}function et(n,e){if(n===e)return!0;const t=Lt(n);if(t!==Lt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return wr(n).isEqual(wr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Nt(s.timestampValue),l=Nt(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Dt(s.bytesValue).isEqual(Dt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ie(s.geoPointValue.latitude)===ie(i.geoPointValue.latitude)&&ie(s.geoPointValue.longitude)===ie(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ie(s.integerValue)===ie(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ie(s.doubleValue),l=ie(i.doubleValue);return a===l?ks(a)===ks(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return Cn(n.arrayValue.values||[],e.arrayValue.values||[],et);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(gl(a)!==gl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!et(a[u],l[u])))return!1;return!0}(n,e);default:return j(52216,{left:n})}}function Ar(n,e){return(n.values||[]).find(t=>et(t,e))!==void 0}function Rn(n,e){if(n===e)return 0;const t=Lt(n),r=Lt(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return function(i,a){const l=ie(i.integerValue||i.doubleValue),u=ie(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(n,e);case 3:return yl(n.timestampValue,e.timestampValue);case 4:return yl(wr(n),wr(e));case 5:return lo(n.stringValue,e.stringValue);case 6:return function(i,a){const l=Dt(i),u=Dt(a);return l.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const m=Q(l[d],u[d]);if(m!==0)return m}return Q(l.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const l=Q(ie(i.latitude),ie(a.latitude));return l!==0?l:Q(ie(i.longitude),ie(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return El(n.arrayValue,e.arrayValue);case 10:return function(i,a){var I,C,N,S;const l=i.fields||{},u=a.fields||{},d=(I=l[Ns])==null?void 0:I.arrayValue,m=(C=u[Ns])==null?void 0:C.arrayValue,g=Q(((N=d==null?void 0:d.values)==null?void 0:N.length)||0,((S=m==null?void 0:m.values)==null?void 0:S.length)||0);return g!==0?g:El(d,m)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===ss.mapValue&&a===ss.mapValue)return 0;if(i===ss.mapValue)return 1;if(a===ss.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},m=Object.keys(d);u.sort(),m.sort();for(let g=0;g<u.length&&g<m.length;++g){const I=lo(u[g],m[g]);if(I!==0)return I;const C=Rn(l[u[g]],d[m[g]]);if(C!==0)return C}return Q(u.length,m.length)}(n.mapValue,e.mapValue);default:throw j(23264,{he:t})}}function yl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Nt(n),r=Nt(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function El(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=Rn(t[s],r[s]);if(i)return i}return Q(t.length,r.length)}function Sn(n){return uo(n)}function uo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Nt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Dt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=uo(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${uo(t.fields[a])}`;return s+"}"}(n.mapValue):j(61005,{value:n})}function fs(n){switch(Lt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Xs(n);return e?16+fs(e):16;case 5:return 2*n.stringValue.length;case 6:return Dt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+fs(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return en(r.fields,(i,a)=>{s+=i.length+fs(a)}),s}(n.mapValue);default:throw j(13486,{value:n})}}function Il(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ho(n){return!!n&&"integerValue"in n}function Xo(n){return!!n&&"arrayValue"in n}function Tl(n){return!!n&&"nullValue"in n}function wl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ms(n){return!!n&&"mapValue"in n}function Ny(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ph])==null?void 0:r.stringValue)===kh}function fr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return en(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=fr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fr(n.arrayValue.values[t]);return e}return{...n}}function Dy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Vy}/**
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
 */class Me{constructor(e){this.value=e}static empty(){return new Me({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ms(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fr(t)}setAll(e){let t=_e.emptyPath(),r={},s=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=fr(a):s.push(l.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ms(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ms(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){en(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Me(fr(this.value))}}function Vh(n){const e=[];return en(n.fields,(t,r)=>{const s=new _e([t]);if(ms(r)){const i=Vh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Ue(e)}/**
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
 */class ve{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new ve(e,0,H.min(),H.min(),H.min(),Me.empty(),0)}static newFoundDocument(e,t,r,s){return new ve(e,1,t,H.min(),r,s,0)}static newNoDocument(e,t){return new ve(e,2,t,H.min(),H.min(),Me.empty(),0)}static newUnknownDocument(e,t){return new ve(e,3,t,H.min(),H.min(),Me.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Me.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Me.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ds{constructor(e,t){this.position=e,this.inclusive=t}}function vl(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=Rn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Al(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!et(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ls{constructor(e,t="asc"){this.field=e,this.dir=t}}function Ly(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Nh{}class ce extends Nh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Oy(e,t,r):t==="array-contains"?new Uy(e,r):t==="in"?new By(e,r):t==="not-in"?new qy(e,r):t==="array-contains-any"?new $y(e,r):new ce(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new xy(e,r):new Fy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Rn(t,this.value)):t!==null&&Lt(this.value)===Lt(t)&&this.matchesComparison(Rn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $e extends Nh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new $e(e,t)}matches(e){return Dh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Dh(n){return n.op==="and"}function Lh(n){return My(n)&&Dh(n)}function My(n){for(const e of n.filters)if(e instanceof $e)return!1;return!0}function fo(n){if(n instanceof ce)return n.field.canonicalString()+n.op.toString()+Sn(n.value);if(Lh(n))return n.filters.map(e=>fo(e)).join(",");{const e=n.filters.map(t=>fo(t)).join(",");return`${n.op}(${e})`}}function Mh(n,e){return n instanceof ce?function(r,s){return s instanceof ce&&r.op===s.op&&r.field.isEqual(s.field)&&et(r.value,s.value)}(n,e):n instanceof $e?function(r,s){return s instanceof $e&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,l)=>i&&Mh(a,s.filters[l]),!0):!1}(n,e):void j(19439)}function Oh(n){return n instanceof ce?function(t){return`${t.field.canonicalString()} ${t.op} ${Sn(t.value)}`}(n):n instanceof $e?function(t){return t.op.toString()+" {"+t.getFilters().map(Oh).join(" ,")+"}"}(n):"Filter"}class Oy extends ce{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class xy extends ce{constructor(e,t){super(e,"in",t),this.keys=xh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Fy extends ce{constructor(e,t){super(e,"not-in",t),this.keys=xh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function xh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class Uy extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Xo(t)&&Ar(t.arrayValue,this.value)}}class By extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ar(this.value.arrayValue,t)}}class qy extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ar(this.value.arrayValue,t)}}class $y extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Xo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ar(this.value.arrayValue,r))}}/**
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
 */class jy{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function bl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new jy(n,e,t,r,s,i,a)}function Yo(n){const e=W(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>fo(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Qs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Sn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Sn(r)).join(",")),e.Te=t}return e.Te}function Jo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Ly(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Al(n.startAt,e.startAt)&&Al(n.endAt,e.endAt)}function mo(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Dr{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function zy(n,e,t,r,s,i,a,l){return new Dr(n,e,t,r,s,i,a,l)}function Zo(n){return new Dr(n)}function Cl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fh(n){return n.collectionGroup!==null}function mr(n){const e=W(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new de(_e.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(l=l.add(d.field))})}),l})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Ls(i,r))}),t.has(_e.keyField().canonicalString())||e.Ie.push(new Ls(_e.keyField(),r))}return e.Ie}function Ke(n){const e=W(n);return e.Ee||(e.Ee=Hy(e,mr(n))),e.Ee}function Hy(n,e){if(n.limitType==="F")return bl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ls(s.field,i)});const t=n.endAt?new Ds(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ds(n.startAt.position,n.startAt.inclusive):null;return bl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function po(n,e){const t=n.filters.concat([e]);return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function go(n,e,t){return new Dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ys(n,e){return Jo(Ke(n),Ke(e))&&n.limitType===e.limitType}function Uh(n){return`${Yo(Ke(n))}|lt:${n.limitType}`}function hn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Oh(s)).join(", ")}]`),Qs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Sn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Sn(s)).join(",")),`Target(${r})`}(Ke(n))}; limitType=${n.limitType})`}function Js(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):$.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of mr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,l,u){const d=vl(a,l,u);return a.inclusive?d<=0:d<0}(r.startAt,mr(r),s)||r.endAt&&!function(a,l,u){const d=vl(a,l,u);return a.inclusive?d>=0:d>0}(r.endAt,mr(r),s))}(n,e)}function Wy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Bh(n){return(e,t)=>{let r=!1;for(const s of mr(n)){const i=Gy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Gy(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?Rn(u,d):j(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j(19790,{direction:n.dir})}}/**
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
 */class tn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){en(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return vh(this.inner)}size(){return this.innerSize}}/**
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
 */const Ky=new re($.comparator);function ut(){return Ky}const qh=new re($.comparator);function or(...n){let e=qh;for(const t of n)e=e.insert(t.key,t);return e}function $h(n){let e=qh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function zt(){return pr()}function jh(){return pr()}function pr(){return new tn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Qy=new re($.comparator),Xy=new de($.comparator);function X(...n){let e=Xy;for(const t of n)e=e.add(t);return e}const Yy=new de(Q);function Jy(){return Yy}/**
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
 */function ea(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ks(e)?"-0":e}}function zh(n){return{integerValue:""+n}}function Zy(n,e){return Cy(e)?zh(e):ea(n,e)}/**
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
 */class Zs{constructor(){this._=void 0}}function eE(n,e,t){return n instanceof Ms?function(s,i){const a={fields:{[Ch]:{stringValue:bh},[Sh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Qo(i)&&(i=Xs(i)),i&&(a.fields[Rh]=i),{mapValue:a}}(t,e):n instanceof br?Wh(n,e):n instanceof Cr?Gh(n,e):function(s,i){const a=Hh(s,i),l=Rl(a)+Rl(s.Ae);return ho(a)&&ho(s.Ae)?zh(l):ea(s.serializer,l)}(n,e)}function tE(n,e,t){return n instanceof br?Wh(n,e):n instanceof Cr?Gh(n,e):t}function Hh(n,e){return n instanceof Os?function(r){return ho(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ms extends Zs{}class br extends Zs{constructor(e){super(),this.elements=e}}function Wh(n,e){const t=Kh(e);for(const r of n.elements)t.some(s=>et(s,r))||t.push(r);return{arrayValue:{values:t}}}class Cr extends Zs{constructor(e){super(),this.elements=e}}function Gh(n,e){let t=Kh(e);for(const r of n.elements)t=t.filter(s=>!et(s,r));return{arrayValue:{values:t}}}class Os extends Zs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Rl(n){return ie(n.integerValue||n.doubleValue)}function Kh(n){return Xo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function nE(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof br&&s instanceof br||r instanceof Cr&&s instanceof Cr?Cn(r.elements,s.elements,et):r instanceof Os&&s instanceof Os?et(r.Ae,s.Ae):r instanceof Ms&&s instanceof Ms}(n.transform,e.transform)}class rE{constructor(e,t){this.version=e,this.transformResults=t}}class Qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Qe}static exists(e){return new Qe(void 0,e)}static updateTime(e){return new Qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ps(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ei{}function Qh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Yh(n.key,Qe.none()):new Lr(n.key,n.data,Qe.none());{const t=n.data,r=Me.empty();let s=new de(_e.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new nn(n.key,r,new Ue(s.toArray()),Qe.none())}}function sE(n,e,t){n instanceof Lr?function(s,i,a){const l=s.value.clone(),u=Pl(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof nn?function(s,i,a){if(!ps(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=Pl(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Xh(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function gr(n,e,t,r){return n instanceof Lr?function(i,a,l,u){if(!ps(i.precondition,a))return l;const d=i.value.clone(),m=kl(i.fieldTransforms,u,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof nn?function(i,a,l,u){if(!ps(i.precondition,a))return l;const d=kl(i.fieldTransforms,u,a),m=a.data;return m.setAll(Xh(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(i,a,l){return ps(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function iE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Hh(r.transform,s||null);i!=null&&(t===null&&(t=Me.empty()),t.set(r.field,i))}return t||null}function Sl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Cn(r,s,(i,a)=>nE(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Lr extends ei{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class nn extends ei{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Xh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Pl(n,e,t){const r=new Map;J(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,tE(a,l,t[s]))}return r}function kl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,eE(i,a,e))}return r}class Yh extends ei{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oE extends ei{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class aE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&sE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=jh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=Qh(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(H.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),X())}isEqual(e){return this.batchId===e.batchId&&Cn(this.mutations,e.mutations,(t,r)=>Sl(t,r))&&Cn(this.baseMutations,e.baseMutations,(t,r)=>Sl(t,r))}}class ta{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){J(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Qy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new ta(e,t,r,s)}}/**
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
 */class cE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class lE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var oe,Y;function uE(n){switch(n){case P.OK:return j(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function Jh(n){if(n===void 0)return lt("GRPC error has no .code"),P.UNKNOWN;switch(n){case oe.OK:return P.OK;case oe.CANCELLED:return P.CANCELLED;case oe.UNKNOWN:return P.UNKNOWN;case oe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case oe.INTERNAL:return P.INTERNAL;case oe.UNAVAILABLE:return P.UNAVAILABLE;case oe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case oe.NOT_FOUND:return P.NOT_FOUND;case oe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case oe.ABORTED:return P.ABORTED;case oe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case oe.DATA_LOSS:return P.DATA_LOSS;default:return j(39323,{code:n})}}(Y=oe||(oe={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function hE(){return new TextEncoder}/**
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
 */const dE=new St([4294967295,4294967295],0);function Vl(n){const e=hE().encode(n),t=new dh;return t.update(e),new Uint8Array(t.digest())}function Nl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new St([t,r],0),new St([s,i],0)]}class na{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ar(`Invalid padding: ${t}`);if(r<0)throw new ar(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ar(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ar(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=St.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(St.fromNumber(r)));return s.compare(dE)===1&&(s=new St([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Vl(e),[r,s]=Nl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new na(i,s,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.ge===0)return;const t=Vl(e),[r,s]=Nl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ar extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ti{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Mr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ti(H.min(),s,new re(Q),ut(),X())}}class Mr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Mr(r,t,X(),X(),X())}}/**
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
 */class gs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Zh{constructor(e,t){this.targetId=e,this.Ce=t}}class ed{constructor(e,t,r=ye.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Dl{constructor(){this.ve=0,this.Fe=Ll(),this.Me=ye.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:j(38017,{changeType:i})}}),new Mr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Ll()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,J(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class fE{constructor(e){this.Ge=e,this.ze=new Map,this.je=ut(),this.Je=is(),this.He=is(),this.Ye=new re(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:j(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(mo(i))if(r===0){const a=new $(i.path);this.et(t,a,ve.newNoDocument(a,H.min()))}else J(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Dt(r).toUint8Array()}catch(u){if(u instanceof Ah)return bn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new na(a,s,i)}catch(u){return bn(u instanceof ar?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const l=this.ot(a);if(l){if(i.current&&mo(l.target)){const u=new $(l.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,ve.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let r=X();this.He.forEach((i,a)=>{let l=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new ti(e,t,this.Ye,this.je,r);return this.je=ut(),this.Je=is(),this.He=is(),this.Ye=new re(Q),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Dl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new de(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new de(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Dl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function is(){return new re($.comparator)}function Ll(){return new re($.comparator)}const mE={asc:"ASCENDING",desc:"DESCENDING"},pE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},gE={and:"AND",or:"OR"};class _E{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _o(n,e){return n.useProto3Json||Qs(e)?e:{value:e}}function xs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function td(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function yE(n,e){return xs(n,e.toTimestamp())}function Xe(n){return J(!!n,49232),H.fromTimestamp(function(t){const r=Nt(t);return new ne(r.seconds,r.nanos)}(n))}function ra(n,e){return yo(n,e).canonicalString()}function yo(n,e){const t=function(s){return new ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function nd(n){const e=ee.fromString(n);return J(ad(e),10190,{key:e.toString()}),e}function Eo(n,e){return ra(n.databaseId,e.path)}function Wi(n,e){const t=nd(e);if(t.get(1)!==n.databaseId.projectId)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(sd(t))}function rd(n,e){return ra(n.databaseId,e)}function EE(n){const e=nd(n);return e.length===4?ee.emptyPath():sd(e)}function Io(n){return new ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function sd(n){return J(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ml(n,e,t){return{name:Eo(n,e),fields:t.value.mapValue.fields}}function IE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:j(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,m){return d.useProto3Json?(J(m===void 0||typeof m=="string",58123),ye.fromBase64String(m||"")):(J(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ye.fromUint8Array(m||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(d){const m=d.code===void 0?P.UNKNOWN:Jh(d.code);return new F(m,d.message||"")}(a);t=new ed(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Wi(n,r.document.name),i=Xe(r.document.updateTime),a=r.document.createTime?Xe(r.document.createTime):H.min(),l=new Me({mapValue:{fields:r.document.fields}}),u=ve.newFoundDocument(s,i,a,l),d=r.targetIds||[],m=r.removedTargetIds||[];t=new gs(d,m,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Wi(n,r.document),i=r.readTime?Xe(r.readTime):H.min(),a=ve.newNoDocument(s,i),l=r.removedTargetIds||[];t=new gs([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Wi(n,r.document),i=r.removedTargetIds||[];t=new gs([],i,s,null)}else{if(!("filter"in e))return j(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new lE(s,i),l=r.targetId;t=new Zh(l,a)}}return t}function TE(n,e){let t;if(e instanceof Lr)t={update:Ml(n,e.key,e.value)};else if(e instanceof Yh)t={delete:Eo(n,e.key)};else if(e instanceof nn)t={update:Ml(n,e.key,e.data),updateMask:kE(e.fieldMask)};else{if(!(e instanceof oE))return j(16599,{Vt:e.type});t={verify:Eo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const l=a.transform;if(l instanceof Ms)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof br)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Cr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Os)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw j(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:yE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:j(27497)}(n,e.precondition)),t}function wE(n,e){return n&&n.length>0?(J(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?Xe(s.updateTime):Xe(i);return a.isEqual(H.min())&&(a=Xe(i)),new rE(a,s.transformResults||[])}(t,e))):[]}function vE(n,e){return{documents:[rd(n,e.path)]}}function AE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=rd(n,s);const i=function(d){if(d.length!==0)return od($e.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(m=>function(I){return{field:dn(I.field),direction:RE(I.dir)}}(m))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=_o(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function bE(n){let e=EE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){J(r===1,65062);const m=t.from[0];m.allDescendants?s=m.collectionId:e=e.child(m.collectionId)}let i=[];t.where&&(i=function(g){const I=id(g);return I instanceof $e&&Lh(I)?I.getFilters():[I]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(I=>function(N){return new Ls(fn(N.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(I))}(t.orderBy));let l=null;t.limit&&(l=function(g){let I;return I=typeof g=="object"?g.value:g,Qs(I)?null:I}(t.limit));let u=null;t.startAt&&(u=function(g){const I=!!g.before,C=g.values||[];return new Ds(C,I)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const I=!g.before,C=g.values||[];return new Ds(C,I)}(t.endAt)),zy(e,s,a,i,l,"F",u,d)}function CE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function id(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=fn(t.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=fn(t.unaryFilter.field);return ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=fn(t.unaryFilter.field);return ce.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=fn(t.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(t){return ce.create(fn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return $e.create(t.compositeFilter.filters.map(r=>id(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(t.compositeFilter.op))}(n):j(30097,{filter:n})}function RE(n){return mE[n]}function SE(n){return pE[n]}function PE(n){return gE[n]}function dn(n){return{fieldPath:n.canonicalString()}}function fn(n){return _e.fromServerFormat(n.fieldPath)}function od(n){return n instanceof ce?function(t){if(t.op==="=="){if(wl(t.value))return{unaryFilter:{field:dn(t.field),op:"IS_NAN"}};if(Tl(t.value))return{unaryFilter:{field:dn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wl(t.value))return{unaryFilter:{field:dn(t.field),op:"IS_NOT_NAN"}};if(Tl(t.value))return{unaryFilter:{field:dn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:dn(t.field),op:SE(t.op),value:t.value}}}(n):n instanceof $e?function(t){const r=t.getFilters().map(s=>od(s));return r.length===1?r[0]:{compositeFilter:{op:PE(t.op),filters:r}}}(n):j(54877,{filter:n})}function kE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ad(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class vt{constructor(e,t,r,s,i=H.min(),a=H.min(),l=ye.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new vt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class VE{constructor(e){this.yt=e}}function NE(n){const e=bE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?go(e,e.limit,"L"):e}/**
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
 */class DE{constructor(){this.Cn=new LE}addToCollectionParentIndex(e,t){return this.Cn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(Vt.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(Vt.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class LE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new de(ee.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new de(ee.comparator)).toArray()}}/**
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
 */const Ol={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},cd=41943040;class Ve{static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(cd,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);/**
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
 */class Pn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Pn(0)}static cr(){return new Pn(-1)}}/**
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
 */const xl="LruGarbageCollector",ME=1048576;function Fl([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class OE{constructor(e){this.Ir=e,this.buffer=new de(Fl),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Fl(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class xE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){U(xl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){On(t)?U(xl,"Ignoring IndexedDB error during garbage collection: ",t):await Mn(t)}await this.Vr(3e5)})}}class FE{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Ks.ce);const r=new OE(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(Ol)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ol):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,u,d;const m=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(e,s))).next(g=>(r=g,l=Date.now(),this.removeTargets(e,r,t))).next(g=>(i=g,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),un()<=K.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${g} documents in `+(d-u)+`ms
Total Duration: ${d-m}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function UE(n,e){return new FE(n,e)}/**
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
 */class BE{constructor(){this.changes=new tn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class qE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class $E{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gr(r.mutation,s,Ue.empty(),ne.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,X()).next(()=>r))}getLocalViewOfDocuments(e,t,r=X()){const s=zt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=or();return i.forEach((l,u)=>{a=a.insert(l,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=zt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,X()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,s){let i=ut();const a=pr(),l=function(){return pr()}();return t.forEach((u,d)=>{const m=r.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof nn)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),gr(m.mutation,d,m.mutation.getFieldMask(),ne.now())):a.set(d.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,m)=>a.set(d,m)),t.forEach((d,m)=>l.set(d,new qE(m,a.get(d)??null))),l))}recalculateAndSaveOverlays(e,t){const r=pr();let s=new re((a,l)=>a-l),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let m=r.get(u)||Ue.empty();m=l.applyToLocalView(d,m),r.set(u,m);const g=(s.get(l.batchId)||X()).add(u);s=s.insert(l.batchId,g)})}).next(()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,m=u.value,g=jh();m.forEach(I=>{if(!i.has(I)){const C=Qh(t.get(I),r.get(I));C!==null&&g.set(I,C),i=i.add(I)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return k.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):k.resolve(zt());let l=Tr,u=i;return a.next(d=>k.forEach(d,(m,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),i.get(m)?k.resolve():this.remoteDocumentCache.getEntry(e,m).next(I=>{u=u.insert(m,I)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,X())).next(m=>({batchId:l,changes:$h(m)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=or();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=or();return this.indexManager.getCollectionParents(e,i).next(l=>k.forEach(l,u=>{const d=function(g,I){return new Dr(I,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(m=>{m.forEach((g,I)=>{a=a.insert(g,I)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((u,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,ve.newInvalidDocument(m)))});let l=or();return a.forEach((u,d)=>{const m=i.get(u);m!==void 0&&gr(m.mutation,d,Ue.empty(),ne.now()),Js(t,d)&&(l=l.insert(u,d))}),l})}}/**
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
 */class jE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return k.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Xe(s.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:NE(s.bundledQuery),readTime:Xe(s.readTime)}}(t)),k.resolve()}}/**
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
 */class zE{constructor(){this.overlays=new re($.comparator),this.qr=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zt();return k.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.St(e,t,i)}),k.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const s=zt(),i=t.length+1,a=new $(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return k.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new re((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let m=i.get(d.largestBatchId);m===null&&(m=zt(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const l=zt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,m)=>l.set(d,m)),!(l.size()>=s)););return k.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new cE(t,r));let i=this.qr.get(t);i===void 0&&(i=X(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
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
 */class HE{constructor(){this.sessionToken=ye.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
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
 */class sa{constructor(){this.Qr=new de(pe.$r),this.Ur=new de(pe.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new pe(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new $(new ee([])),r=new pe(t,e),s=new pe(t,e+1),i=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new $(new ee([])),r=new pe(t,e),s=new pe(t,e+1);let i=X();return this.Ur.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new pe(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return $.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||$.comparator(e.key,t.key)}}/**
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
 */class WE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new de(pe.$r)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new aE(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new pe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return k.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?Ko:this.tr-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],a=>{const l=this.Xr(a.Yr);i.push(l)}),k.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(Q);return t.forEach(s=>{const i=new pe(s,0),a=new pe(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],l=>{r=r.add(l.Yr)})}),k.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;$.isDocumentKey(i)||(i=i.child(""));const a=new pe(new $(i),0);let l=new de(Q);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.Yr)),!0)},a),k.resolve(this.ti(l))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){J(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return k.forEach(t.mutations,s=>{const i=new pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new pe(t,0),s=this.Zr.firstAfterOrEqual(r);return k.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class GE{constructor(e){this.ri=e,this.docs=function(){return new re($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=ut();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ve.newInvalidDocument(s))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=ut();const a=t.path,l=new $(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:m}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||wy(Ty(m),r)<=0||(s.has(m.key)||Js(t,m))&&(i=i.insert(m.key,m.mutableCopy()))}return k.resolve(i)}getAllFromCollectionGroup(e,t,r,s){j(9500)}ii(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new KE(this)}getSize(e){return k.resolve(this.size)}}class KE extends BE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
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
 */class QE{constructor(e){this.persistence=e,this.si=new tn(t=>Yo(t),Jo),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new sa,this.targetCount=0,this.ai=Pn.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),k.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Pn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.Pr(t),k.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),k.waitFor(i).next(()=>s)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),k.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),k.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this._i.containsKey(t))}}/**
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
 */class ld{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ks(0),this.li=!1,this.li=!0,this.hi=new HE,this.referenceDelegate=e(this),this.Pi=new QE(this),this.indexManager=new DE,this.remoteDocumentCache=function(s){return new GE(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new VE(t),this.Ii=new jE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new zE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new WE(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){U("MemoryPersistence","Starting transaction:",e);const s=new XE(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ai(e,t){return k.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class XE extends Ay{constructor(e){super(),this.currentSequenceNumber=e}}class ia{constructor(e){this.persistence=e,this.Ri=new sa,this.Vi=null}static mi(e){return new ia(e)}get fi(){if(this.Vi)return this.Vi;throw j(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.fi.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.fi,r=>{const s=$.fromPath(r);return this.gi(e,s).next(i=>{i||t.removeEntry(s,H.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return k.or([()=>k.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Fs{constructor(e,t){this.persistence=e,this.pi=new tn(r=>Ry(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=UE(this,t)}static mi(e,t){return new Fs(e,t)}Ei(){}di(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return k.forEach(this.pi,(r,s)=>this.br(e,r,s).next(i=>i?k.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(l=>{l||(r++,i.removeEntry(a,H.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),k.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=fs(e.data.value)),t}br(e,t,r){return k.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return k.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class oa{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new oa(e,t.fromCache,r,s)}}/**
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
 */class YE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class JE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return jm()?8:by(Ae())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new YE;return this.Ss(e,t,a).next(l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)})}).next(()=>i.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(un()<=K.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",hn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),k.resolve()):(un()<=K.DEBUG&&U("QueryEngine","Query:",hn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(un()<=K.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",hn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):k.resolve())}ys(e,t){if(Cl(t))return k.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=go(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=X(...i);return this.ps.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const d=this.Ds(t,l);return this.Cs(t,d,a,u.readTime)?this.ys(e,go(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,r,s){return Cl(t)||s.isEqual(H.min())?k.resolve(null):this.ps.getDocuments(e,r).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?k.resolve(null):(un()<=K.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),hn(t)),this.vs(e,a,t,Iy(s,Tr)).next(l=>l))})}Ds(e,t){let r=new de(Bh(e));return t.forEach((s,i)=>{Js(e,i)&&(r=r.add(i))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return un()<=K.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",hn(t)),this.ps.getDocumentsMatchingQuery(e,t,Vt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const aa="LocalStore",ZE=3e8;class eI{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new re(Q),this.xs=new tn(i=>Yo(i),Jo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new $E(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function tI(n,e,t,r){return new eI(n,e,t,r)}async function ud(n,e){const t=W(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],l=[];let u=X();for(const d of s){a.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}for(const d of i){l.push(d.batchId);for(const m of d.mutations)u=u.add(m.key)}return t.localDocuments.getDocuments(r,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:l}))})})}function nI(n,e){const t=W(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(l,u,d,m){const g=d.batch,I=g.keys();let C=k.resolve();return I.forEach(N=>{C=C.next(()=>m.getEntry(u,N)).next(S=>{const V=d.docVersions.get(N);J(V!==null,48541),S.version.compareTo(V)<0&&(g.applyToRemoteDocument(S,d),S.isValidDocument()&&(S.setReadTime(d.commitVersion),m.addEntry(S)))})}),C.next(()=>l.mutationQueue.removeMutationBatch(u,g))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=X();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function hd(n){const e=W(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function rI(n,e){const t=W(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach((m,g)=>{const I=s.get(g);if(!I)return;l.push(t.Pi.removeMatchingKeys(i,m.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(i,m.addedDocuments,g)));let C=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?C=C.withResumeToken(ye.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,r)),s=s.insert(g,C),function(S,V,x){return S.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-S.snapshotVersion.toMicroseconds()>=ZE?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(I,C,m)&&l.push(t.Pi.updateTargetData(i,C))});let u=ut(),d=X();if(e.documentUpdates.forEach(m=>{e.resolvedLimboDocuments.has(m)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,m))}),l.push(sI(i,a,e.documentUpdates).next(m=>{u=m.ks,d=m.qs})),!r.isEqual(H.min())){const m=t.Pi.getLastRemoteSnapshotVersion(i).next(g=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(m)}return k.waitFor(l).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=s,i))}function sI(n,e,t){let r=X(),s=X();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=ut();return t.forEach((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(H.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):U(aa,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:s}})}function iI(n,e){const t=W(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Ko),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function oI(n,e){const t=W(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(i=>i?(s=i,k.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new vt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function To(n,e,t){const r=W(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!On(a))throw a;U(aa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Ul(n,e,t){const r=W(n);let s=H.min(),i=X();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,m){const g=W(u),I=g.xs.get(m);return I!==void 0?k.resolve(g.Ms.get(I)):g.Pi.getTargetData(d,m)}(r,a,Ke(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next(u=>{i=u})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:H.min(),t?i:X())).next(l=>(aI(r,Wy(e),l),{documents:l,Qs:i})))}function aI(n,e,t){let r=n.Os.get(e)||H.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Os.set(e,r)}class Bl{constructor(){this.activeTargetIds=Jy()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class cI{constructor(){this.Mo=new Bl,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Bl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class lI{Oo(e){}shutdown(){}}/**
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
 */const ql="ConnectivityMonitor";class $l{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){U(ql,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){U(ql,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let os=null;function wo(){return os===null?os=function(){return 268435456+Math.round(2147483648*Math.random())}():os++,"0x"+os.toString(16)}/**
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
 */const Gi="RestConnection",uI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class hI{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Vs?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=wo(),l=this.zo(e,t.toUriEncodedString());U(Gi,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:d}=new URL(l),m=Vn(d);return this.Jo(e,l,u,r,m).then(g=>(U(Gi,`Received RPC '${e}' ${a}: `,g),g),g=>{throw bn(Gi,`RPC '${e}' ${a} failed with error: `,g,"url: ",l,"request:",r),g})}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ln}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}zo(e,t){const r=uI[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
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
 */class dI{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
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
 */const Ie="WebChannelConnection";class fI extends hI{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=wo();return new Promise((l,u)=>{const d=new fh;d.setWithCredentials(!0),d.listenOnce(mh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case ds.NO_ERROR:const g=d.getResponseJson();U(Ie,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),l(g);break;case ds.TIMEOUT:U(Ie,`RPC '${e}' ${a} timed out`),u(new F(P.DEADLINE_EXCEEDED,"Request time out"));break;case ds.HTTP_ERROR:const I=d.getStatus();if(U(Ie,`RPC '${e}' ${a} failed with status:`,I,"response text:",d.getResponseText()),I>0){let C=d.getResponseJson();Array.isArray(C)&&(C=C[0]);const N=C==null?void 0:C.error;if(N&&N.status&&N.message){const S=function(x){const q=x.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN}(N.status);u(new F(S,N.message))}else u(new F(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new F(P.UNAVAILABLE,"Connection failed."));break;default:j(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{U(Ie,`RPC '${e}' ${a} completed.`)}});const m=JSON.stringify(s);U(Ie,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",m,r,15)})}T_(e,t,r){const s=wo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=_h(),l=gh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const m=i.join("");U(Ie,`Creating RPC '${e}' stream ${s}: ${m}`,u);const g=a.createWebChannel(m,u);this.I_(g);let I=!1,C=!1;const N=new dI({Yo:V=>{C?U(Ie,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(I||(U(Ie,`Opening RPC '${e}' stream ${s} transport.`),g.open(),I=!0),U(Ie,`RPC '${e}' stream ${s} sending:`,V),g.send(V))},Zo:()=>g.close()}),S=(V,x,q)=>{V.listen(x,B=>{try{q(B)}catch(D){setTimeout(()=>{throw D},0)}})};return S(g,ir.EventType.OPEN,()=>{C||(U(Ie,`RPC '${e}' stream ${s} transport opened.`),N.o_())}),S(g,ir.EventType.CLOSE,()=>{C||(C=!0,U(Ie,`RPC '${e}' stream ${s} transport closed`),N.a_(),this.E_(g))}),S(g,ir.EventType.ERROR,V=>{C||(C=!0,bn(Ie,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),N.a_(new F(P.UNAVAILABLE,"The operation could not be completed")))}),S(g,ir.EventType.MESSAGE,V=>{var x;if(!C){const q=V.data[0];J(!!q,16349);const B=q,D=(B==null?void 0:B.error)||((x=B[0])==null?void 0:x.error);if(D){U(Ie,`RPC '${e}' stream ${s} received error:`,D);const L=D.status;let M=function(_){const w=oe[_];if(w!==void 0)return Jh(w)}(L),E=D.message;M===void 0&&(M=P.INTERNAL,E="Unknown error status: "+L+" with message "+D.message),C=!0,N.a_(new F(M,E)),g.close()}else U(Ie,`RPC '${e}' stream ${s} received:`,q),N.u_(q)}}),S(l,ph.STAT_EVENT,V=>{V.stat===co.PROXY?U(Ie,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===co.NOPROXY&&U(Ie,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{N.__()},0),N}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function Ki(){return typeof document<"u"?document:null}/**
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
 */function ni(n){return new _E(n,!0)}/**
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
 */class dd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&U("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
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
 */const jl="PersistentStream";class fd{constructor(e,t,r,s,i,a,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new dd(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(lt(t.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new F(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return U(jl,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(U(jl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class mI extends fd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=IE(this.serializer,e),r=function(i){if(!("targetChange"in i))return H.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?H.min():a.readTime?Xe(a.readTime):H.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Io(this.serializer),t.addTarget=function(i,a){let l;const u=a.target;if(l=mo(u)?{documents:vE(i,u)}:{query:AE(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=td(i,a.resumeToken);const d=_o(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(H.min())>0){l.readTime=xs(i,a.snapshotVersion.toTimestamp());const d=_o(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l}(this.serializer,e);const r=CE(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Io(this.serializer),t.removeTarget=e,this.q_(t)}}class pI extends fd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return J(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,J(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){J(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=wE(e.writeResults,e.commitTime),r=Xe(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Io(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>TE(this.serializer,r))};this.q_(t)}}/**
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
 */class gI{}class _I extends gI{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,yo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new F(P.UNKNOWN,i.toString())})}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Ho(e,yo(t,r),s,a,l,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new F(P.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class yI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(lt(t),this.aa=!1):U("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const Zt="RemoteStore";class EI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{rn(this)&&(U(Zt,"Restarting streams for network reachability change."),await async function(u){const d=W(u);d.Ea.add(4),await Or(d),d.Ra.set("Unknown"),d.Ea.delete(4),await ri(d)}(this))})}),this.Ra=new yI(r,s)}}async function ri(n){if(rn(n))for(const e of n.da)await e(!0)}async function Or(n){for(const e of n.da)await e(!1)}function md(n,e){const t=W(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ha(t)?ua(t):xn(t).O_()&&la(t,e))}function ca(n,e){const t=W(n),r=xn(t);t.Ia.delete(e),r.O_()&&pd(t,e),t.Ia.size===0&&(r.O_()?r.L_():rn(t)&&t.Ra.set("Unknown"))}function la(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}xn(n).Y_(e)}function pd(n,e){n.Va.Ue(e),xn(n).Z_(e)}function ua(n){n.Va=new fE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),xn(n).start(),n.Ra.ua()}function ha(n){return rn(n)&&!xn(n).x_()&&n.Ia.size>0}function rn(n){return W(n).Ea.size===0}function gd(n){n.Va=void 0}async function II(n){n.Ra.set("Online")}async function TI(n){n.Ia.forEach((e,t)=>{la(n,e)})}async function wI(n,e){gd(n),ha(n)?(n.Ra.ha(e),ua(n)):n.Ra.set("Unknown")}async function vI(n,e,t){if(n.Ra.set("Online"),e instanceof ed&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))}(n,e)}catch(r){U(Zt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Us(n,r)}else if(e instanceof gs?n.Va.Ze(e):e instanceof Zh?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await hd(n.localStore);t.compareTo(r)>=0&&await function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const m=i.Ia.get(d);m&&i.Ia.set(d,m.withResumeToken(u.resumeToken,a))}}),l.targetMismatches.forEach((u,d)=>{const m=i.Ia.get(u);if(!m)return;i.Ia.set(u,m.withResumeToken(ye.EMPTY_BYTE_STRING,m.snapshotVersion)),pd(i,u);const g=new vt(m.target,u,d,m.sequenceNumber);la(i,g)}),i.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){U(Zt,"Failed to raise snapshot:",r),await Us(n,r)}}async function Us(n,e,t){if(!On(e))throw e;n.Ea.add(1),await Or(n),n.Ra.set("Offline"),t||(t=()=>hd(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U(Zt,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ri(n)})}function _d(n,e){return e().catch(t=>Us(n,t,e))}async function si(n){const e=W(n),t=Mt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Ko;for(;AI(e);)try{const s=await iI(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,bI(e,s)}catch(s){await Us(e,s)}yd(e)&&Ed(e)}function AI(n){return rn(n)&&n.Ta.length<10}function bI(n,e){n.Ta.push(e);const t=Mt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function yd(n){return rn(n)&&!Mt(n).x_()&&n.Ta.length>0}function Ed(n){Mt(n).start()}async function CI(n){Mt(n).ra()}async function RI(n){const e=Mt(n);for(const t of n.Ta)e.ea(t.mutations)}async function SI(n,e,t){const r=n.Ta.shift(),s=ta.from(r,e,t);await _d(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await si(n)}async function PI(n,e){e&&Mt(n).X_&&await async function(r,s){if(function(a){return uE(a)&&a!==P.ABORTED}(s.code)){const i=r.Ta.shift();Mt(r).B_(),await _d(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await si(r)}}(n,e),yd(n)&&Ed(n)}async function zl(n,e){const t=W(n);t.asyncQueue.verifyOperationInProgress(),U(Zt,"RemoteStore received new credentials");const r=rn(t);t.Ea.add(3),await Or(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ri(t)}async function kI(n,e){const t=W(n);e?(t.Ea.delete(2),await ri(t)):e||(t.Ea.add(2),await Or(t),t.Ra.set("Unknown"))}function xn(n){return n.ma||(n.ma=function(t,r,s){const i=W(t);return i.sa(),new mI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:II.bind(null,n),t_:TI.bind(null,n),r_:wI.bind(null,n),H_:vI.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),ha(n)?ua(n):n.Ra.set("Unknown")):(await n.ma.stop(),gd(n))})),n.ma}function Mt(n){return n.fa||(n.fa=function(t,r,s){const i=W(t);return i.sa(),new pI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:CI.bind(null,n),r_:PI.bind(null,n),ta:RI.bind(null,n),na:SI.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await si(n)):(await n.fa.stop(),n.Ta.length>0&&(U(Zt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class da{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new ot,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new da(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fa(n,e){if(lt("AsyncQueue",`${e}: ${n}`),On(n))return new F(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class In{static emptySet(e){return new In(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=or(),this.sortedSet=new re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof In)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new In;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Hl{constructor(){this.ga=new re($.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):j(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class kn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new kn(e,t,In.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ys(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class VI{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class NI{constructor(){this.queries=Wl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=W(t),i=s.queries;s.queries=Wl(),i.forEach((a,l)=>{for(const u of l.Sa)u.onError(r)})})(this,new F(P.ABORTED,"Firestore shutting down"))}}function Wl(){return new tn(n=>Uh(n),Ys)}async function Id(n,e){const t=W(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new VI,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=fa(a,`Initialization of query '${hn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&ma(t)}async function Td(n,e){const t=W(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function DI(n,e){const t=W(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&ma(t)}function LI(n,e,t){const r=W(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function ma(n){n.Ca.forEach(e=>{e.next()})}var vo,Gl;(Gl=vo||(vo={})).Ma="default",Gl.Cache="cache";class wd{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new kn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=kn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==vo.Cache}}/**
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
 */class vd{constructor(e){this.key=e}}class Ad{constructor(e){this.key=e}}class MI{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=X(),this.mutatedKeys=X(),this.eu=Bh(e),this.tu=new In(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Hl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((m,g)=>{const I=s.get(m),C=Js(this.query,g)?g:null,N=!!I&&this.mutatedKeys.has(I.key),S=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let V=!1;I&&C?I.data.isEqual(C.data)?N!==S&&(r.track({type:3,doc:C}),V=!0):this.su(I,C)||(r.track({type:2,doc:C}),V=!0,(u&&this.eu(C,u)>0||d&&this.eu(C,d)<0)&&(l=!0)):!I&&C?(r.track({type:0,doc:C}),V=!0):I&&!C&&(r.track({type:1,doc:I}),V=!0,(u||d)&&(l=!0)),V&&(C?(a=a.add(C),i=S?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((m,g)=>function(C,N){const S=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Rt:V})}};return S(C)-S(N)}(m.type,g.type)||this.eu(m.doc,g.doc)),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new kn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Hl,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=X(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new Ad(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new vd(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=X();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return kn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const pa="SyncEngine";class OI{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class xI{constructor(e){this.key=e,this.hu=!1}}class FI{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new tn(l=>Uh(l),Ys),this.Iu=new Map,this.Eu=new Set,this.du=new re($.comparator),this.Au=new Map,this.Ru=new sa,this.Vu={},this.mu=new Map,this.fu=Pn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function UI(n,e,t=!0){const r=kd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await bd(r,e,t,!0),s}async function BI(n,e){const t=kd(n);await bd(t,e,!0,!1)}async function bd(n,e,t,r){const s=await oI(n.localStore,Ke(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await qI(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&md(n.remoteStore,s),l}async function qI(n,e,t,r,s){n.pu=(g,I,C)=>async function(S,V,x,q){let B=V.view.ru(x);B.Cs&&(B=await Ul(S.localStore,V.query,!1).then(({documents:E})=>V.view.ru(E,B)));const D=q&&q.targetChanges.get(V.targetId),L=q&&q.targetMismatches.get(V.targetId)!=null,M=V.view.applyChanges(B,S.isPrimaryClient,D,L);return Ql(S,V.targetId,M.au),M.snapshot}(n,g,I,C);const i=await Ul(n.localStore,e,!0),a=new MI(e,i.Qs),l=a.ru(i.documents),u=Mr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);Ql(n,t,d.au);const m=new OI(e,t,a);return n.Tu.set(e,m),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function $I(n,e,t){const r=W(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!Ys(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await To(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ca(r.remoteStore,s.targetId),Ao(r,s.targetId)}).catch(Mn)):(Ao(r,s.targetId),await To(r.localStore,s.targetId,!0))}async function jI(n,e){const t=W(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ca(t.remoteStore,r.targetId))}async function zI(n,e,t){const r=YI(n);try{const s=await function(a,l){const u=W(a),d=ne.now(),m=l.reduce((C,N)=>C.add(N.key),X());let g,I;return u.persistence.runTransaction("Locally write mutations","readwrite",C=>{let N=ut(),S=X();return u.Ns.getEntries(C,m).next(V=>{N=V,N.forEach((x,q)=>{q.isValidDocument()||(S=S.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(C,N)).next(V=>{g=V;const x=[];for(const q of l){const B=iE(q,g.get(q.key).overlayedDocument);B!=null&&x.push(new nn(q.key,B,Vh(B.value.mapValue),Qe.exists(!0)))}return u.mutationQueue.addMutationBatch(C,d,x,l)}).next(V=>{I=V;const x=V.applyToLocalDocumentSet(g,S);return u.documentOverlayCache.saveOverlays(C,V.batchId,x)})}).then(()=>({batchId:I.batchId,changes:$h(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,l,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new re(Q)),d=d.insert(l,u),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await xr(r,s.changes),await si(r.remoteStore)}catch(s){const i=fa(s,"Failed to persist write");t.reject(i)}}async function Cd(n,e){const t=W(n);try{const r=await rI(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(J(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?J(a.hu,14607):s.removedDocuments.size>0&&(J(a.hu,42227),a.hu=!1))}),await xr(t,r,e)}catch(r){await Mn(r)}}function Kl(n,e,t){const r=W(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)}),function(a,l){const u=W(a);u.onlineState=l;let d=!1;u.queries.forEach((m,g)=>{for(const I of g.Sa)I.va(l)&&(d=!0)}),d&&ma(u)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function HI(n,e,t){const r=W(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new re($.comparator);a=a.insert(i,ve.newNoDocument(i,H.min()));const l=X().add(i),u=new ti(H.min(),new Map,new re(Q),a,l);await Cd(r,u),r.du=r.du.remove(i),r.Au.delete(e),ga(r)}else await To(r.localStore,e,!1).then(()=>Ao(r,e,t)).catch(Mn)}async function WI(n,e){const t=W(n),r=e.batch.batchId;try{const s=await nI(t.localStore,e);Sd(t,r,null),Rd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await xr(t,s)}catch(s){await Mn(s)}}async function GI(n,e,t){const r=W(n);try{const s=await function(a,l){const u=W(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return u.mutationQueue.lookupMutationBatch(d,l).next(g=>(J(g!==null,37113),m=g.keys(),u.mutationQueue.removeMutationBatch(d,g))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,m,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>u.localDocuments.getDocuments(d,m))})}(r.localStore,e);Sd(r,e,t),Rd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await xr(r,s)}catch(s){await Mn(s)}}function Rd(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Sd(n,e,t){const r=W(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Ao(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||Pd(n,r)})}function Pd(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(ca(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),ga(n))}function Ql(n,e,t){for(const r of t)r instanceof vd?(n.Ru.addReference(r.key,e),KI(n,r)):r instanceof Ad?(U(pa,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Pd(n,r.key)):j(19791,{wu:r})}function KI(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(U(pa,"New document in limbo: "+t),n.Eu.add(r),ga(n))}function ga(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new $(ee.fromString(e)),r=n.fu.next();n.Au.set(r,new xI(t)),n.du=n.du.insert(t,r),md(n.remoteStore,new vt(Ke(Zo(t.path)),r,"TargetPurposeLimboResolution",Ks.ce))}}async function xr(n,e,t){const r=W(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((l,u)=>{a.push(r.pu(u,e,t).then(d=>{var m;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(m=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(u.targetId,g?"current":"not-current")}if(d){s.push(d);const g=oa.As(u.targetId,d);i.push(g)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(u,d){const m=W(u);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>k.forEach(d,I=>k.forEach(I.Es,C=>m.persistence.referenceDelegate.addReference(g,I.targetId,C)).next(()=>k.forEach(I.ds,C=>m.persistence.referenceDelegate.removeReference(g,I.targetId,C)))))}catch(g){if(!On(g))throw g;U(aa,"Failed to update sequence numbers: "+g)}for(const g of d){const I=g.targetId;if(!g.fromCache){const C=m.Ms.get(I),N=C.snapshotVersion,S=C.withLastLimboFreeSnapshotVersion(N);m.Ms=m.Ms.insert(I,S)}}}(r.localStore,i))}async function QI(n,e){const t=W(n);if(!t.currentUser.isEqual(e)){U(pa,"User change. New user:",e.toKey());const r=await ud(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(l=>{l.forEach(u=>{u.reject(new F(P.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await xr(t,r.Ls)}}function XI(n,e){const t=W(n),r=t.Au.get(e);if(r&&r.hu)return X().add(r.key);{let s=X();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function kd(n){const e=W(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Cd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=XI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=HI.bind(null,e),e.Pu.H_=DI.bind(null,e.eventManager),e.Pu.yu=LI.bind(null,e.eventManager),e}function YI(n){const e=W(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=WI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=GI.bind(null,e),e}class Bs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ni(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return tI(this.persistence,new JE,e.initialUser,this.serializer)}Cu(e){return new ld(ia.mi,this.serializer)}Du(e){return new cI}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Bs.provider={build:()=>new Bs};class JI extends Bs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){J(this.persistence.referenceDelegate instanceof Fs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new xE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new ld(r=>Fs.mi(r,t),this.serializer)}}class bo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Kl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=QI.bind(null,this.syncEngine),await kI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new NI}()}createDatastore(e){const t=ni(e.databaseInfo.databaseId),r=function(i){return new fI(i)}(e.databaseInfo);return function(i,a,l,u){return new _I(i,a,l,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,l){return new EI(r,s,i,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Kl(this.syncEngine,t,0),function(){return $l.v()?new $l:new lI}())}createSyncEngine(e,t){return function(s,i,a,l,u,d,m){const g=new FI(s,i,a,l,u,d);return m&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=W(s);U(Zt,"RemoteStore shutting down."),i.Ea.add(5),await Or(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}bo.provider={build:()=>new bo};/**
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
 */class Vd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):lt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Ot="FirestoreClient";class ZI{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Te.UNAUTHENTICATED,this.clientId=Go.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{U(Ot,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(U(Ot,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ot;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=fa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Qi(n,e){n.asyncQueue.verifyOperationInProgress(),U(Ot,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await ud(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Xl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await eT(n);U(Ot,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>zl(e.remoteStore,s)),n._onlineComponents=e}async function eT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U(Ot,"Using user provided OfflineComponentProvider");try{await Qi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;bn("Error using user provided cache. Falling back to memory cache: "+t),await Qi(n,new Bs)}}else U(Ot,"Using default OfflineComponentProvider"),await Qi(n,new JI(void 0));return n._offlineComponents}async function Nd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U(Ot,"Using user provided OnlineComponentProvider"),await Xl(n,n._uninitializedComponentsProvider._online)):(U(Ot,"Using default OnlineComponentProvider"),await Xl(n,new bo))),n._onlineComponents}function tT(n){return Nd(n).then(e=>e.syncEngine)}async function Dd(n){const e=await Nd(n),t=e.eventManager;return t.onListen=UI.bind(null,e.syncEngine),t.onUnlisten=$I.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=BI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=jI.bind(null,e.syncEngine),t}function nT(n,e,t={}){const r=new ot;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const m=new Vd({next:I=>{m.Nu(),a.enqueueAndForget(()=>Td(i,g));const C=I.docs.has(l);!C&&I.fromCache?d.reject(new F(P.UNAVAILABLE,"Failed to get document because the client is offline.")):C&&I.fromCache&&u&&u.source==="server"?d.reject(new F(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(I)},error:I=>d.reject(I)}),g=new wd(Zo(l.path),m,{includeMetadataChanges:!0,qa:!0});return Id(i,g)}(await Dd(n),n.asyncQueue,e,t,r)),r.promise}function rT(n,e,t={}){const r=new ot;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,l,u,d){const m=new Vd({next:I=>{m.Nu(),a.enqueueAndForget(()=>Td(i,g)),I.fromCache&&u.source==="server"?d.reject(new F(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(I)},error:I=>d.reject(I)}),g=new wd(l,m,{includeMetadataChanges:!0,qa:!0});return Id(i,g)}(await Dd(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */function Ld(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const Yl=new Map;/**
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
 */const Md="firestore.googleapis.com",Jl=!0;class Zl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Md,this.ssl=Jl}else this.host=e.host,this.ssl=e.ssl??Jl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=cd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ME)throw new F(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ey("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ld(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new F(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ii{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ly;switch(r.type){case"firstParty":return new fy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Yl.get(t);r&&(U("ComponentProvider","Removing Datastore"),Yl.delete(t),r.terminate())}(this),Promise.resolve()}}function sT(n,e,t,r={}){var d;n=kt(n,ii);const s=Vn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(Ru(`https://${l}`),Su("Firestore",!0)),i.host!==Md&&i.host!==l&&bn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!Qt(u,a)&&(n._setSettings(u),r.mockUserToken)){let m,g;if(typeof r.mockUserToken=="string")m=r.mockUserToken,g=Te.MOCK_USER;else{m=Lm(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const I=r.mockUserToken.sub||r.mockUserToken.user_id;if(!I)throw new F(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new Te(I)}n._authCredentials=new uy(new Eh(m,g))}}/**
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
 */class Fn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Fn(this.firestore,e,this._query)}}class ue{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ue(this.firestore,e,this._key)}toJSON(){return{type:ue._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Nr(t,ue._jsonSchema))return new ue(e,r||null,new $(ee.fromString(t.referencePath)))}}ue._jsonSchemaVersion="firestore/documentReference/1.0",ue._jsonSchema={type:le("string",ue._jsonSchemaVersion),referencePath:le("string")};class Pt extends Fn{constructor(e,t,r){super(e,t,Zo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ue(this.firestore,null,new $(e))}withConverter(e){return new Pt(this.firestore,e,this._path)}}function Od(n,e,...t){if(n=Pe(n),Ih("collection","path",e),n instanceof ii){const r=ee.fromString(e,...t);return dl(r),new Pt(n,null,r)}{if(!(n instanceof ue||n instanceof Pt))throw new F(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return dl(r),new Pt(n.firestore,null,r)}}function oi(n,e,...t){if(n=Pe(n),arguments.length===1&&(e=Go.newId()),Ih("doc","path",e),n instanceof ii){const r=ee.fromString(e,...t);return hl(r),new ue(n,null,new $(r))}{if(!(n instanceof ue||n instanceof Pt))throw new F(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return hl(r),new ue(n.firestore,n instanceof Pt?n.converter:null,new $(r))}}/**
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
 */const eu="AsyncQueue";class tu{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new dd(this,"async_queue_retry"),this._c=()=>{const r=Ki();r&&U(eu,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Ki();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ki();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new ot;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!On(e))throw e;U(eu,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,lt("INTERNAL UNHANDLED ERROR: ",nu(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=da.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&j(47125,{Pc:nu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function nu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Fr extends ii{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new tu,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new tu(e),this._firestoreClient=void 0,await e}}}function iT(n,e){const t=typeof n=="object"?n:Nu(),r=typeof n=="string"?n:Vs,s=Lo(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Nm("firestore");i&&sT(s,...i)}return s}function _a(n){if(n._terminated)throw new F(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||oT(n),n._firestoreClient}function oT(n){var r,s,i;const e=n._freezeSettings(),t=function(l,u,d,m){return new ky(l,u,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Ld(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new ZI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class Oe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Oe(ye.fromBase64String(e))}catch(t){throw new F(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Oe(ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Oe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Nr(e,Oe._jsonSchema))return Oe.fromBase64String(e.bytes)}}Oe._jsonSchemaVersion="firestore/bytes/1.0",Oe._jsonSchema={type:le("string",Oe._jsonSchemaVersion),bytes:le("string")};/**
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
 */class ya{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class xd{constructor(e){this._methodName=e}}/**
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
 */class Ye{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ye._jsonSchemaVersion}}static fromJSON(e){if(Nr(e,Ye._jsonSchema))return new Ye(e.latitude,e.longitude)}}Ye._jsonSchemaVersion="firestore/geoPoint/1.0",Ye._jsonSchema={type:le("string",Ye._jsonSchemaVersion),latitude:le("number"),longitude:le("number")};/**
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
 */class Je{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Nr(e,Je._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Je(e.vectorValues);throw new F(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Je._jsonSchemaVersion="firestore/vectorValue/1.0",Je._jsonSchema={type:le("string",Je._jsonSchemaVersion),vectorValues:le("object")};/**
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
 */const aT=/^__.*__$/;class cT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Lr(e,this.data,t,this.fieldTransforms)}}function Fd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{Ac:n})}}class Ea{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Ea({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return qs(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Fd(this.Ac)&&aT.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class lT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ni(e)}Cc(e,t,r,s=!1){return new Ea({Ac:e,methodName:t,Dc:r,path:_e.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ia(n){const e=n._freezeSettings(),t=ni(n._databaseId);return new lT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ud(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);$d("Data must be an object, but it was:",a,r);const l=Bd(r,a);let u,d;if(i.merge)u=new Ue(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const g of i.mergeFields){const I=hT(e,g,t);if(!a.contains(I))throw new F(P.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);fT(m,I)||m.push(I)}u=new Ue(m),d=a.fieldTransforms.filter(g=>u.covers(g.field))}else u=null,d=a.fieldTransforms;return new cT(new Me(l),u,d)}function uT(n,e,t,r=!1){return Ta(t,n.Cc(r?4:3,e))}function Ta(n,e){if(qd(n=Pe(n)))return $d("Unsupported field value:",e,n),Bd(n,e);if(n instanceof xd)return function(r,s){if(!Fd(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const l of r){let u=Ta(l,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=Pe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Zy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ne.fromDate(r);return{timestampValue:xs(s.serializer,i)}}if(r instanceof ne){const i=new ne(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:xs(s.serializer,i)}}if(r instanceof Ye)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Oe)return{bytesValue:td(s.serializer,r._byteString)};if(r instanceof ue){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ra(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Je)return function(a,l){return{mapValue:{fields:{[Ph]:{stringValue:kh},[Ns]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw l.Sc("VectorValues must only contain numeric values.");return ea(l.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${Gs(r)}`)}(n,e)}function Bd(n,e){const t={};return vh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):en(n,(r,s)=>{const i=Ta(s,e.mc(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function qd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ne||n instanceof Ye||n instanceof Oe||n instanceof ue||n instanceof xd||n instanceof Je)}function $d(n,e,t){if(!qd(t)||!Th(t)){const r=Gs(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function hT(n,e,t){if((e=Pe(e))instanceof ya)return e._internalPath;if(typeof e=="string")return jd(n,e);throw qs("Field path arguments must be of type string or ",n,!1,void 0,t)}const dT=new RegExp("[~\\*/\\[\\]]");function jd(n,e,t){if(e.search(dT)>=0)throw qs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ya(...e.split("."))._internalPath}catch{throw qs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function qs(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new F(P.INVALID_ARGUMENT,l+n+u)}function fT(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class zd{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new mT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(wa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class mT extends zd{data(){return super.data()}}function wa(n,e){return typeof e=="string"?jd(n,e):e instanceof ya?e._internalPath:e._delegate._internalPath}/**
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
 */function pT(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class va{}class gT extends va{}function _T(n,e,...t){let r=[];e instanceof va&&r.push(e),r=r.concat(t),function(i){const a=i.filter(u=>u instanceof Aa).length,l=i.filter(u=>u instanceof ai).length;if(a>1||a>0&&l>0)throw new F(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class ai extends gT{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ai(e,t,r)}_apply(e){const t=this._parse(e);return Hd(e._query,t),new Fn(e.firestore,e.converter,po(e._query,t))}_parse(e){const t=Ia(e.firestore);return function(i,a,l,u,d,m,g){let I;if(d.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new F(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){su(g,m);const N=[];for(const S of g)N.push(ru(u,i,S));I={arrayValue:{values:N}}}else I=ru(u,i,g)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||su(g,m),I=uT(l,a,g,m==="in"||m==="not-in");return ce.create(d,m,I)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function yT(n,e,t){const r=e,s=wa("where",n);return ai._create(s,r,t)}class Aa extends va{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Aa(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:$e.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)Hd(a,u),a=po(a,u)}(e._query,t),new Fn(e.firestore,e.converter,po(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function ru(n,e,t){if(typeof(t=Pe(t))=="string"){if(t==="")throw new F(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fh(e)&&t.indexOf("/")!==-1)throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ee.fromString(t));if(!$.isDocumentKey(r))throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Il(n,new $(r))}if(t instanceof ue)return Il(n,t._key);throw new F(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Gs(t)}.`)}function su(n,e){if(!Array.isArray(n)||n.length===0)throw new F(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Hd(n,e){const t=function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new F(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class ET{convertValue(e,t="none"){switch(Lt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw j(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return en(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Ns].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ie(a.doubleValue));return new Je(t)}convertGeoPoint(e){return new Ye(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Xs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(wr(e));default:return null}}convertTimestamp(e){const t=Nt(e);return new ne(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ee.fromString(e);J(ad(r),9688,{name:e});const s=new vr(r.get(1),r.get(3)),i=new $(r.popFirst(5));return s.isEqual(t)||lt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function Wd(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class cr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Kt extends zd{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new _s(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(wa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Kt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Kt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Kt._jsonSchema={type:le("string",Kt._jsonSchemaVersion),bundleSource:le("string","DocumentSnapshot"),bundleName:le("string"),bundle:le("string")};class _s extends Kt{data(e={}){return super.data(e)}}class Tn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new cr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new _s(this._firestore,this._userDataWriter,r.key,r,new cr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(l=>{const u=new _s(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new _s(s._firestore,s._userDataWriter,l.doc.key,l.doc,new cr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:IT(l.type),doc:u,oldIndex:d,newIndex:m}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Tn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Go.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function IT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}/**
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
 */function Gd(n){n=kt(n,ue);const e=kt(n.firestore,Fr);return nT(_a(e),n._key).then(t=>AT(e,n,t))}Tn._jsonSchemaVersion="firestore/querySnapshot/1.0",Tn._jsonSchema={type:le("string",Tn._jsonSchemaVersion),bundleSource:le("string","QuerySnapshot"),bundleName:le("string"),bundle:le("string")};class Kd extends ET{constructor(e){super(),this.firestore=e}convertBytes(e){return new Oe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ue(this.firestore,null,t)}}function TT(n){n=kt(n,Fn);const e=kt(n.firestore,Fr),t=_a(e),r=new Kd(e);return pT(n._query),rT(t,n._query).then(s=>new Tn(e,r,n,s))}function wT(n,e,t){n=kt(n,ue);const r=kt(n.firestore,Fr),s=Wd(n.converter,e,t);return Qd(r,[Ud(Ia(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Qe.none())])}function vT(n,e){const t=kt(n.firestore,Fr),r=oi(n),s=Wd(n.converter,e);return Qd(t,[Ud(Ia(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Qe.exists(!1))]).then(()=>r)}function Qd(n,e){return function(r,s){const i=new ot;return r.asyncQueue.enqueueAndForget(async()=>zI(await tT(r),s,i)),i.promise}(_a(n),e)}function AT(n,e,t){const r=t.docs.get(e._key),s=new Kd(n);return new Kt(n,s,e._key,r,new cr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){Ln=s})(Nn),vn(new Xt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Fr(new hy(r.getProvider("auth-internal")),new my(a,r.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new F(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(d.options.projectId,m)}(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Rt(al,cl,e),Rt(al,cl,"esm2020")})();const bT={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},Xd=Vu(bT),Be=ay(Xd);eh(Be,jo).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const Ur=iT(Xd),CT=new rt,RT="./data.csv";window.initUI=sf;window.setGridSize=ys;document.addEventListener("DOMContentLoaded",()=>{PT(),kT(),OT(),lr(b.currentTab),Ca(),MT(),xT(),FT(),BT(),JT()});const tr="./images/",ST="./icons/",nt=new Map;function Co(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['’]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const iu={Light_Stick__Any_Color:"Blue_Light_Stick"},Yd="arc_collection_v1";function PT(){try{const n=localStorage.getItem(Yd);if(n){const e=JSON.parse(n);Array.isArray(e)?b.collectedItems=new Set(e):(e.collected&&(b.collectedItems=new Set(e.collected)),e.wishlist&&(b.wishlistedItems=new Set(e.wishlist)))}}catch(n){console.error("Failed to load collection state:",n)}}function Jd(){try{const n={collected:Array.from(b.collectedItems),wishlist:Array.from(b.wishlistedItems)};localStorage.setItem(Yd,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const Zd="arc_filters_v1";function Se(){try{const n={rarities:Array.from(b.filters.rarities),types:Array.from(b.filters.types),maps:Array.from(b.filters.maps),conds:Array.from(b.filters.conds),confs:Array.from(b.filters.confs),collected:b.filters.collected,sort:b.filters.sort};localStorage.setItem(Zd,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function kT(){try{const n=localStorage.getItem(Zd);if(n){const e=JSON.parse(n);e.rarities&&(b.filters.rarities=new Set(e.rarities)),e.types&&(b.filters.types=new Set(e.types)),e.maps&&(b.filters.maps=new Set(e.maps)),e.conds&&(b.filters.conds=new Set(e.conds)),e.confs&&(b.filters.confs=new Set(e.confs)),e.collected&&(b.filters.collected=e.collected),e.sort&&(b.filters.sort=e.sort)}}catch(n){console.error("Failed to load filters:",n)}}function ef(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(s=>s.remove());const t=b.collectedItems.has(e),r=b.wishlistedItems.has(e);if(t){const s=document.createElement("div");s.className="collected-badge",s.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(s);const i=document.createElement("div");i.className="collected-glow",n.appendChild(i)}else if(r){const s=document.createElement("div");s.className="wishlist-badge",s.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(s);const i=document.createElement("div");i.className="wishlist-glow",n.appendChild(i)}if(b.currentTab==="collection"){let s="",i="",a=!1;if(t?(s='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',i="Click to Wishlist",a=!0):r?(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',i="Click To Unwishlist",a=!0):(s='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',i="Click to Collect",a=!0),a){const l=document.createElement("div");l.className="collection-hint",l.innerHTML=`
          <div class="collection-hint-icon">${s}</div>
          <div class="collection-hint-text">${i}</div>
        `,(t||r)&&l.classList.add("hint-hidden"),n.appendChild(l)}}}function VT(n,e){b.collectedItems.has(n)?(b.collectedItems.delete(n),b.wishlistedItems.add(n),ba()):b.wishlistedItems.has(n)?b.wishlistedItems.delete(n):(b.collectedItems.add(n),b.currentTab==="collection"&&qT(n)),Jd(),WT(),ef(e,n),tf()}function tf(){if(!document.getElementById("collectionProgressContainer"))return;const e=b.all.length,t=b.collectedItems.size,r=e>0?Math.round(t/e*100):0,s=document.getElementById("progressPercent"),i=document.getElementById("progressCount");s&&(s.textContent=`${r}%`),i&&(i.textContent=`${t} / ${e}`);const a=document.getElementById("progressBar");if(a){a.style.width=`${r}%`;const l=Math.floor(r*1.2);a.style.backgroundColor=`hsl(${l}, 80%, 50%)`,a.style.backgroundImage="none"}}function NT(n,e,t,r){if(!n)return;let s=null;const i=a=>{s||(s=a);const l=Math.min((a-s)/r,1),u=Math.floor(l*(t-e)+e);n.textContent=`${u}%`,l<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const r=document.getElementById("progressBar"),s=document.getElementById("progressPercent"),i=b.all.length,a=b.collectedItems.size,l=i>0?Math.round(a/i*100):0;r&&(r.style.transition="none",r.style.width="0%",r.style.backgroundColor="hsl(0, 80%, 50%)"),s&&(s.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{r&&(r.style.transition="width 2.5s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 2.5s linear",tf()),s&&NT(s,0,l,2500)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function Ro(){if(Be.currentUser)try{const n=oi(Ur,"users",Be.currentUser.uid);await wT(n,{collectedItems:Array.from(b.collectedItems),wishlistedItems:Array.from(b.wishlistedItems),lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function DT(n){try{console.log("Loading collection from cloud...");const e=oi(Ur,"users",n.uid),t=await Gd(e);if(t.exists()){const r=t.data();let s=!1;if(r.collectedItems){const i=new Set(r.collectedItems),a=b.collectedItems.size;i.forEach(l=>b.collectedItems.add(l)),b.collectedItems.size>a&&(s=!0)}if(r.wishlistedItems){const i=new Set(r.wishlistedItems),a=b.wishlistedItems.size;i.forEach(l=>b.wishlistedItems.add(l)),b.wishlistedItems.size>a&&(s=!0)}s&&(console.log("Cloud sync merged new items."),Jd(),ae(),Ro())}else console.log("No cloud data found for user. Creating initial sync..."),Ro()}catch(e){console.error("Loading from cloud failed:",e)}}async function LT(){if(Be.currentUser){b.wrappedData.loading=!0;try{const n=_T(Od(Ur,"blueprintSubmissions"),yT("userId","==",Be.currentUser.uid)),e=await TT(n);b.wrappedData.contributionCount=e.size,console.log(`User has submitted ${e.size} reports.`)}catch(n){console.error("Failed to fetch user contributions:",n)}finally{b.wrappedData.loading=!1}}}function MT(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),r=document.getElementById("logoutBtnMobile"),s=async()=>{try{console.log("Attempting Google Sign-in..."),await eh(Be,jo),await g_(Be,CT),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert("This domain is not authorized for Firebase Auth. Check your Firebase Console settings."):alert("Sign-in failed: "+a.message)}},i=()=>Yg(Be).catch(console.error);n&&(n.onclick=s),e&&(e.onclick=s),t&&(t.onclick=i),r&&(r.onclick=i),Xg(Be,a=>{document.getElementById("authSection");const l=document.getElementById("userProfile");document.getElementById("authSectionMobile");const u=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),l&&l.classList.remove("hidden"),u&&u.classList.remove("hidden");const d=document.getElementById("userPhoto"),m=document.getElementById("userName"),g=document.getElementById("userPhotoMobile"),I=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),m&&(m.textContent=a.displayName||"Explorer"),g&&(g.src=a.photoURL||""),I&&(I.textContent=a.displayName||"Explorer"),DT(a)}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),l&&l.classList.add("hidden"),u&&u.classList.add("hidden")})}function lr(n){b.currentTab=n,window.scrollTo(0,0);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabCollection"),r=document.querySelectorAll(".collection-only"),s=document.querySelectorAll(".blueprints-only:not(#eventBanner)"),i=document.getElementById("eventBanner");n==="blueprints"?(e.classList.add("tab-button-active"),t.classList.remove("tab-button-active"),document.body.classList.remove("collection-mode"),r.forEach(a=>a.classList.add("hidden")),s.forEach(a=>a.classList.remove("hidden")),!So&&i&&i.classList.contains("banner-active")&&i.classList.remove("hidden")):(e.classList.remove("tab-button-active"),t.classList.add("tab-button-active"),document.body.classList.add("collection-mode"),r.forEach(a=>a.classList.remove("hidden")),s.forEach(a=>a.classList.add("hidden")),i&&i.classList.add("hidden")),ae()}function OT(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabCollection"),t=document.getElementById("logoHome"),r=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>lr("blueprints")),e&&(e.onclick=()=>lr("collection")),t&&(t.onclick=()=>lr("blueprints")),r&&(r.onclick=()=>lr("blueprints"))}let So=!1;function xT(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;Gd(oi(Ur,"siteConfig","banner")).then(r=>{if(r.exists()){const s=r.data();s.active&&s.text&&t&&n&&(t.innerHTML=s.text,n.classList.add("banner-active"),!So&&b.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(r=>console.debug("Banner fetch skipped",r)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),So=!0})}let Ht=null,$s=null;function FT(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),r=document.getElementById("closeSubmitModal"),s=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>ou()),e&&(e.onclick=()=>{ba(),$s&&ou($s)}),r&&(r.onclick=()=>Po()),t&&(t.onclick=i=>{i.target===t&&Po()}),s&&(s.onsubmit=async i=>{i.preventDefault(),await $T()})}function UT(){const n=document.getElementById("submitBlueprintName");if(!(!n||!b.all||b.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of b.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function ou(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");UT(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function Po(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),r=document.getElementById("submitQuestReward");t&&(t.checked=!1),r&&(r.checked=!1)}$s=null}function BT(){const n=document.getElementById("showWrappedBtn"),e=document.getElementById("wrappedModal"),t=document.getElementById("closeWrappedBtn"),r=document.getElementById("downloadWrappedBtn");!n||!e||(n.onclick=async()=>{Be.currentUser&&(n.disabled=!0,n.textContent="Loading Data...",await LT(),n.disabled=!1,n.innerHTML='<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> View 2025 Wrapped');const s=b.all.length,i=b.collectedItems.size,a=s>0?Math.round(i/s*100):0,l=b.all.filter(C=>/weapon/i.test(C.type)).length,u=b.all.filter(C=>/weapon/i.test(C.type)&&b.collectedItems.has(C.name)).length,d=b.all.filter(C=>/augment/i.test(C.type)).length,m=b.all.filter(C=>/augment/i.test(C.type)&&b.collectedItems.has(C.name)).length;document.getElementById("wrappedPercent").textContent=`${a}%`,document.getElementById("wrappedTotalBP").textContent=i,document.getElementById("wrappedReportCount").textContent=b.wrappedData.contributionCount,document.getElementById("wrappedWeaponStat").textContent=`${u}/${l}`,document.getElementById("wrappedAugmentStat").textContent=`${m}/${d}`;const g=document.getElementById("wrappedHighlights");g.innerHTML="";const I=b.all.filter(C=>b.collectedItems.has(C.name)&&(C.rarity==="Legendary"||C.rarity==="Epic")&&!/mod|material|parts|component|attachment/i.test(C.type)).slice(0,6);I.length===0&&(g.innerHTML='<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>'),I.forEach(C=>{const N=Et(C.rarity),S=document.createElement("div");S.className="flex flex-col items-center w-full card-compact";const V=document.createElement("div");V.className="w-[85%] aspect-square rounded-2xl border-2 overflow-hidden relative shadow-2xl mx-auto",V.style.borderColor=N,V.style.background=`
        linear-gradient(to top right, ${N}33 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `,V.style.backgroundSize="cover",V.style.backgroundPosition="center";const x=document.createElement("div");x.className="rarity-corner",x.style.bottom="-25%",x.style.left="-25%",x.style.width="115%",x.style.height="115%",x.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${N}66 60%, ${N}cc 100%)`,V.appendChild(x);const q=document.createElement("img");q.src=C.img||"",q.className="w-full h-full object-contain p-5 relative z-10 drop-shadow-2xl";const B=document.createElement("div");B.className="absolute inset-0 pointer-events-none",B.style.background=`radial-gradient(circle at center, ${N}22 0%, transparent 80%)`,V.appendChild(B),V.appendChild(q);const D=document.createElement("div");D.className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-xl z-30 flex items-center gap-1.5 shadow-2xl whitespace-nowrap min-w-[95%]",D.style.background=`${N}44`,D.style.borderColor=N;const L=document.createElement("div");L.className="text-[12px] font-black text-white uppercase tracking-tight truncate w-full px-1 text-center",L.textContent=C.name,D.appendChild(L),V.appendChild(D),S.appendChild(V),g.appendChild(S)}),e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden"},t&&(t.onclick=()=>{e.classList.add("hidden"),e.classList.remove("flex"),document.body.style.overflow=""}),r&&(r.onclick=async()=>{const s=document.getElementById("wrappedContent");r.disabled=!0,r.textContent="Generating...";try{const i=await htmlToImage.toPng(s,{width:1080,height:1080,style:{transform:"scale(1)",transformOrigin:"top left"}}),a=document.createElement("a");a.download="arc-raiders-wrapped-2025.png",a.href=i,a.click()}catch(i){console.error("oops, something went wrong!",i),alert("Failed to generate image. Try again?")}finally{r.disabled=!1,r.textContent="Download Square"}}))}function qT(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),r=document.getElementById("collectToastProgress");!e||!t||!r||(Ht&&(clearTimeout(Ht),Ht=null),$s=n,t.textContent=`${n} Blueprint collected? Tell us where!`,r.classList.remove("animate"),r.offsetWidth,r.classList.add("animate"),e.classList.remove("hidden"),Ht=setTimeout(()=>{ba()},1e4))}function ba(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress");n&&n.classList.add("hidden"),e&&e.classList.remove("animate"),Ht&&(clearTimeout(Ht),Ht=null)}async function $T(){var u,d,m,g,I,C,N,S;const n=(u=document.getElementById("submitBlueprintName"))==null?void 0:u.value,e=(d=document.getElementById("submitMap"))==null?void 0:d.value,t=(m=document.getElementById("submitCondition"))==null?void 0:m.value,r=(g=document.getElementById("submitLocation"))==null?void 0:g.value,s=(I=document.getElementById("submitContainer"))==null?void 0:I.value,i=((C=document.getElementById("submitTrialsReward"))==null?void 0:C.checked)||!1,a=((N=document.getElementById("submitQuestReward"))==null?void 0:N.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}if(!(e||t||r||s||i||a)){alert("Please provide at least one detail (Map, Condition, Location, Container, or Reward Type).");return}try{await vT(Od(Ur,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:t||"",location:r||"",container:s||"",trialsReward:i,questReward:a,submittedAt:new Date().toISOString(),userId:((S=Be.currentUser)==null?void 0:S.uid)||"anonymous"}),Po(),jT()}catch(V){console.error("Error submitting blueprint location:",V),alert("Failed to submit. Please try again.")}}function jT(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function zT(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=Co(t);const r=Co((e||"").trim());if(iu[r]){const i=iu[r];if(nt.has(i))return tr+nt.get(i);for(const[a,l]of nt.entries())if(a.startsWith(i))return tr+l}const s=[t.toLowerCase(),r.toLowerCase()];for(const i of s)if(i&&nt.has(i))return tr+nt.get(i);for(const i of s)if(i){for(const[a,l]of nt.entries())if(a===i||a.startsWith(i))return tr+l}return r?tr+r+".webp":""}const De={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function HT(n,e){let t;return function(...r){const s=this;clearTimeout(t),t=setTimeout(()=>n.apply(s,r),e)}}const WT=HT(Ro,2e3),Wt={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},nf={Confirmed:Wt.Legendary.color,"Very High":Wt.Epic.color,Confident:Wt.Rare.color,Low:Wt.Uncommon.color,"Not Enough Data":"#E11D48"},GT=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function He(n){return ST+encodeURIComponent(n)}function ys(n){const e=Math.max(De.min,Math.min(De.max,Number(n)||De.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(De.storageKey,String(e))}catch{}const r=document.getElementById("gridSizeLabel"),s=document.getElementById("gridSizeLabelMobile");r&&(r.textContent=`${e}px`),s&&(s.textContent=`${e}px`)}function KT(){try{const n=localStorage.getItem(De.storageKey);return n?Number(n):window.innerWidth<=768?120:De.default}catch{return window.innerWidth<=768?120:De.default}}function rf(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return He("ItemCategory_Weapon.webp");if(t==="grenade")return He("ItemCategory_Grenade.webp");if(t==="quickuse")return He("ItemCategory_QuickUse.webp");if(t==="mod")return He("ItemCategory_Mod.webp");if(t==="augment")return He("ItemCategory_Augment.webp");if(t==="material")return He("ItemCategory_Material.webp");if(t==="misc")return He("ItemCategory_Misc.webp");for(const r of GT)if(r.re.test(e))return He(r.file);return He("ItemCategory_Misc.webp")}function QT(n){const e=Re(n);return e?/^https?:\/\//i.test(e)?e:He(e):""}function Re(n){return(n??"").toString().trim()}function Es(n){return Re(n).toLowerCase()}function ke(n,e){const t=n.map(r=>Es(r));for(const r of e){const s=t.indexOf(Es(r));if(s!==-1)return n[s]}for(const r of e){const s=Es(r),i=t.findIndex(a=>a.includes(s));if(i!==-1)return n[i]}return null}function XT(n){const e=Re(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(Wt[t])return t;const r={Legend:"Legendary",Leg:"Legendary"};return r[t]?r[t]:t}function Et(n){var e;return((e=Wt[n])==null?void 0:e.color)||"#3f3f46"}function pn(n){var e;return((e=Wt[n])==null?void 0:e.rank)||0}const b={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]},wrappedData:{contributionCount:0,loading:!1}};function YT(){return new URL(window.location.href).searchParams.get("csv")||RT}function as(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function sf(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),r=document.getElementById("drawerBackdrop");function s(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const D=!n.classList.contains("hidden");n.classList.toggle("hidden"),D?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=s);const l=document.getElementById("mobileFilterBtn");l&&(l.onclick=a),t&&(t.onclick=i),r&&(r.onclick=i);const u=document.getElementById("searchInput"),d=document.getElementById("searchInputMobile"),m=D=>{b.filters.search=D,ae()};u&&u.addEventListener("input",D=>m(D.target.value)),d&&d.addEventListener("input",D=>{m(D.target.value),u&&(u.value=D.target.value)});const g=document.getElementById("sortSelect"),I=document.getElementById("sortSelectMobile"),C=D=>{b.filters.sort=D,g&&(g.value=D),I&&(I.value=D),ae(),Se()};g&&(g.onchange=D=>C(D.target.value)),I&&(I.onchange=D=>C(D.target.value));const N=()=>{b.filters.rarities.clear(),b.filters.types.clear(),b.filters.maps.clear(),b.filters.conds.clear(),b.filters.confs.clear(),b.filters.search="",b.filters.sort="rarity_desc",u&&(u.value=""),d&&(d.value=""),g&&(g.value="rarity_desc"),I&&(I.value="rarity_desc"),b.filters.collected="all",ae(),we(),Ca(),Se()};["resetBtn","resetBtn2","resetBtnMobile"].forEach(D=>{const L=document.getElementById(D);L&&(L.onclick=N)});const S=(D,L)=>{const M=document.getElementById(D);M&&(M.onclick=()=>{L.clear(),ae(),we(),Se()})};S("rarityAllBtn",b.filters.rarities),S("typeAllBtn",b.filters.types),S("mapAllBtn",b.filters.maps),S("condAllBtn",b.filters.conds),S("confAllBtn",b.filters.confs),S("rarityAllBtnMobile",b.filters.rarities),S("typeAllBtnMobile",b.filters.types),S("mapAllBtnMobile",b.filters.maps),S("condAllBtnMobile",b.filters.conds),S("confAllBtnMobile",b.filters.confs);const V=document.getElementById("gridSize"),x=document.getElementById("gridSizeMobile"),q=KT();ys(q),V&&(V.min=String(De.min),V.max=String(De.max),V.step=String(De.step),V.value=String(q),V.addEventListener("input",D=>{const L=D.target.value;x&&(x.value=L),ys(L)})),x&&(x.min=String(De.min),x.max=String(De.max),x.step=String(De.step),x.value=String(q),x.addEventListener("input",D=>{const L=D.target.value;V&&(V.value=L),ys(L)}));const B=(D,L,M)=>{const E=document.getElementById(D),p=document.getElementById(L),_=document.getElementById(M);E&&p&&_&&(E.onclick=()=>{p.classList.toggle("hidden"),_.classList.toggle("rotate-180")})};B("toggleRarity","rarityFilters","iconRarity"),B("toggleType","typeFilters","iconType"),B("toggleMap","mapFilters","iconMap"),B("toggleCond","condFilters","iconCond"),B("toggleConf","confFilters","iconConf"),B("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),B("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),B("toggleMapMobile","mapFiltersMobile","iconMapMobile"),B("toggleCondMobile","condFiltersMobile","iconCondMobile"),B("toggleConfMobile","confFiltersMobile","iconConfMobile")}async function JT(){as("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const r=await t.json();nt.clear();for(const s of r){const a=s.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),l=Co(a).toLowerCase();nt.set(l,s)}console.log(`Loaded ${nt.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}as("Fetching sheet...");let n=YT();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var D;const t=e.data||[],r=((D=e.meta)==null?void 0:D.fields)||Object.keys(t[0]||{}),s=ke(r,["Blueprint Name","Item Name","Name","Item"]),i=ke(r,["Item Type","Type"]),a=ke(r,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),l=ke(r,["Most Likely Map","Map"]),u=ke(r,["Most Likely Condition","Condition"]),d=ke(r,["Most Likely Location","Location"]),m=ke(r,["Most Likely Container","Container"]),g=ke(r,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),I=ke(r,["Rarity","Item Rarity"]),C=ke(r,["Data Confidence","Confidence"]),N=ke(r,["Item URL","Wiki URL","URL","Link","Wiki"])||r[7],S=ke(r,["Trials Reward","Trial Reward","Trials"])||r[9],V=ke(r,["Quest Reward","Quest"])||r[10],x=ke(r,["Description","Desc","Flavor Text"])||r[11],q=L=>{const M=Re(L).toLowerCase();return M==="true"||M==="yes"||M==="1"||M==="x"||M==="✓"};b.columns={name:s,type:i,typeIcon:a,map:l,cond:u,loc:d,cont:m,img:g,rarity:I,conf:C,wiki:N};const B=[];for(const L of t){const M=Re(L[s]);if(!M)continue;const E=Re(L[i]),p=Re(L[l]),_=Re(L[u]),w=Re(L[d]),T=Re(L[m]),v=Re(L[g]),y=zT(v,M),fe=XT(L[I]),tt=C?Re(L[C]):"",ci=Re(L[N]),sn=(a?QT(L[a]):"")||rf(E),on=S?q(L[S]):!1,li=V?q(L[V]):!1,Br=x?Re(L[x]):"";B.push({name:M,type:E,map:p,cond:_,loc:w,cont:T,img:y,rarity:fe,conf:tt,wiki:ci,typeIcon:sn,trialsReward:on,questReward:li,description:Br})}b.all=B,ZT(),sf(),ae(),we(),as(`${B.length} items • live from Sheets`)},error:e=>{console.error(e),as("Failed to load CSV. Check your published link.")}})}function nr(n){const e=new Set(n.filter(t=>Re(t)));return Array.from(e).sort((t,r)=>t.localeCompare(r))}const au=["Confirmed","Very High","Confident","Low","Not Enough Data"],cu=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];function ZT(){b.facets.rarities=nr(b.all.map(n=>n.rarity)).sort((n,e)=>pn(e)-pn(n)),b.facets.types=nr(b.all.map(n=>n.type)).sort((n,e)=>{let t=cu.indexOf(n),r=cu.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r||n.localeCompare(e)}),b.facets.maps=nr(b.all.map(n=>n.map)),b.facets.conds=nr(b.all.map(n=>n.cond)),b.facets.confs=nr(b.all.map(n=>n.conf)).sort((n,e)=>{let t=au.indexOf(n),r=au.indexOf(e);return t===-1&&(t=999),r===-1&&(r=999),t-r})}function rr(n,e){n.has(e)?n.delete(e):n.add(e)}function lu(n,e,t){const r=document.createElement("button");return r.className="chip "+(e?"chip-active":""),r.textContent=n,r.onclick=t,r}function we(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of b.facets.rarities){const r=b.filters.rarities.has(t),s=Et(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=r?s+"66":s+"22";i.style.background=a,i.style.borderColor=s,i.style.color="#f4f4f5",i.onclick=()=>{rr(b.filters.rarities,t),ae(),we(),Se()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of b.facets.types){const r=b.filters.types.has(t),s=document.createElement("button");s.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",s.style.borderColor=r?"rgb(113 113 122)":"rgb(39 39 42)",s.title=t,s.onclick=()=>{rr(b.filters.types,t),ae(),we(),Se()};const i=document.createElement("img");i.src=rf(t),i.alt=t,i.className="w-6 h-6",s.appendChild(i),e.appendChild(s)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of b.facets.maps){const r=b.filters.maps.has(t);e.appendChild(lu(t,r,()=>{rr(b.filters.maps,t),ae(),we(),Se()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of b.facets.conds){const r=b.filters.conds.has(t);e.appendChild(lu(t,r,()=>{rr(b.filters.conds,t),ae(),we(),Se()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of b.facets.confs){if(!t)continue;const r=b.filters.confs.has(t),s=nf[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=r?s:"rgb(39 39 42)",i.style.background=r?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{rr(b.filters.confs,t),ae(),we(),Se()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=s;const l=document.createElement("span");l.textContent=t,i.appendChild(a),i.appendChild(l),e.appendChild(i)}}ew()}function ew(){const n=document.getElementById("activeChips");if(!n)return;n.innerHTML="";const e=(t,r)=>{const s=document.createElement("button");s.className="chip chip-active",s.textContent=t+" ✕",s.onclick=r,n.appendChild(s)};if(b.filters.rarities.size&&e(`Rarity: ${Array.from(b.filters.rarities).join(", ")}`,()=>{b.filters.rarities.clear(),ae(),we(),Se()}),b.filters.types.size&&e(`Type: ${Array.from(b.filters.types).join(", ")}`,()=>{b.filters.types.clear(),ae(),we(),Se()}),b.filters.maps.size&&e(`Map: ${Array.from(b.filters.maps).join(", ")}`,()=>{b.filters.maps.clear(),ae(),we(),Se()}),b.filters.conds.size&&e(`Condition: ${Array.from(b.filters.conds).join(", ")}`,()=>{b.filters.conds.clear(),ae(),we(),Se()}),b.filters.confs.size&&e(`Confidence: ${Array.from(b.filters.confs).join(", ")}`,()=>{b.filters.confs.clear(),ae(),we(),Se()}),b.filters.collected!=="all"){let t="Collected";b.filters.collected==="not-collected"&&(t="Not Collected"),b.filters.collected==="wishlist"&&(t="Wishlist"),e(`Status: ${t}`,()=>{b.filters.collected="all",ae(),we(),Ca(),Se()})}b.filters.search.trim()&&e(`Search: ${b.filters.search.trim()}`,()=>{b.filters.search="";const t=document.getElementById("searchInput"),r=document.getElementById("searchInputMobile");t&&(t.value=""),r&&(r.value=""),ae(),we()})}function ae(){const n=Es(b.filters.search),e=b.filters.rarities.size>0,t=b.filters.types.size>0,r=b.filters.maps.size>0,s=b.filters.conds.size>0,i=b.filters.confs.size>0;let a=b.all.filter(u=>{if(e&&!b.filters.rarities.has(u.rarity)||t&&!b.filters.types.has(u.type)||r&&!b.filters.maps.has(u.map)||s&&!b.filters.conds.has(u.cond)||i&&!b.filters.confs.has(u.conf))return!1;const d=b.collectedItems.has(u.name),m=b.wishlistedItems.has(u.name);return!(b.filters.collected==="collected"&&!d||b.filters.collected==="wishlist"&&!m||b.filters.collected==="not-collected"&&d||n&&!(u.name+" "+u.type+" "+u.map+" "+u.cond+" "+u.loc+" "+u.cont).toLowerCase().includes(n))});const l=b.filters.sort;a.sort((u,d)=>l==="name_asc"?u.name.localeCompare(d.name):l==="name_desc"?d.name.localeCompare(u.name):l==="type_asc"?(u.type||"").localeCompare(d.type||""):l==="rarity_desc"?pn(d.rarity)-pn(u.rarity)||u.name.localeCompare(d.name):l==="rarity_asc"&&pn(u.rarity)-pn(d.rarity)||u.name.localeCompare(d.name)),b.filtered=a,tw()}function tw(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${b.filtered.length} / ${b.all.length}`),b.filtered.length)n.classList.remove("hidden"),e&&e.classList.add("hidden");else{n.classList.add("hidden"),e&&e.classList.remove("hidden");return}const r=[];for(const s of b.filtered){const i=document.createElement("div");i.className="card-compact bg-zinc-950 border border-zinc-800 rounded-2xl p-2 opacity-0",i.style.position="relative",i.style.overflow="visible";const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=Et(s.rarity);const l=document.createElement("div");l.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",l.style.background=`
      linear-gradient(to top right, ${Et(s.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,l.style.backgroundSize="cover, cover, cover",l.style.backgroundPosition="center, center, center",l.style.backgroundBlendMode="normal, normal, normal",l.style.aspectRatio="1 / 1",l.style.width="100%";const u=document.createElement("img");u.src=s.img||"",u.alt=s.name,u.className="w-full h-full object-contain p-2 relative z-10",u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",u.style.padding="8px",u.loading="lazy",i.style.transition="transform 0.2s",i.addEventListener("mouseenter",()=>xi(u,{scale:1.1})),i.addEventListener("mouseleave",()=>xi(u,{scale:1}));const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${Et(s.rarity)}66 60%, ${Et(s.rarity)}cc 100%)`;const m=document.createElement("div");m.className="type-tab",m.style.background=Et(s.rarity)+"22",m.style.borderColor=Et(s.rarity);const g=document.createElement("img");g.src=s.typeIcon,g.alt=s.type;const I=document.createElement("span");I.className="",I.textContent=s.type||"—",m.appendChild(g),m.appendChild(I),l.appendChild(u),l.appendChild(d),l.appendChild(m);const C=document.createElement("div");C.className="mt-2 px-1 pb-1";const N=document.createElement("div");N.className="font-semibold leading-tight",N.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",N.textContent=s.name,C.appendChild(N);const S=document.createElement("div");S.className="details-overlay hidden";const V=document.createElement("div");V.className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800 mb-3";const x=document.createElement("div");x.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",x.textContent="Most Likely Spawn",V.appendChild(x);let q=!1;const B=(D,L)=>{if(!L||L==="N/A")return null;const M=document.createElement("div");M.className="details-row";const E=document.createElement("div");E.className="details-label",E.textContent=D;const p=document.createElement("div");return p.className="details-value",p.textContent=L,M.appendChild(E),M.appendChild(p),M};if([B("Map",s.map),B("Location",s.loc),B("Container",s.cont),B("Condition",s.cond)].filter(Boolean).forEach(D=>{V.appendChild(D),q=!0}),q&&S.appendChild(V),s.conf){const D=document.createElement("div");D.className="details-row";const L=document.createElement("div");L.className="details-label",L.textContent="Data Confidence";const M=document.createElement("div");M.className="details-value details-confidence";const E=document.createElement("span");E.className="confidence-dot",E.style.background=nf[s.conf]||"#71717a";const p=document.createElement("span");p.textContent=s.conf,M.appendChild(E),M.appendChild(p),D.appendChild(L),D.appendChild(M),S.appendChild(D)}if(s.trialsReward){const D=document.createElement("div");D.className="details-row";const L=document.createElement("div");L.className="details-label",L.textContent="Trials Reward";const M=document.createElement("div");M.className="details-value",M.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',D.appendChild(L),D.appendChild(M),S.appendChild(D)}if(s.questReward){const D=document.createElement("div");D.className="details-row";const L=document.createElement("div");L.className="details-label",L.textContent="Quest Reward";const M=document.createElement("div");M.className="details-value",M.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',D.appendChild(L),D.appendChild(M),S.appendChild(D)}if(s.description){const D=document.createElement("div");D.className="details-row";const L=document.createElement("div");L.className="details-label",L.textContent="Description";const M=document.createElement("div");M.className="details-value",M.textContent=s.description,M.classList.add("italic"),D.appendChild(L),D.appendChild(M),S.appendChild(D)}if(s.wiki){const D=document.createElement("a");D.href=s.wiki,D.target="_blank",D.rel="noreferrer",D.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",D.textContent="Item URL",S.appendChild(D)}a.style.cursor="pointer",a.onclick=D=>{D.stopPropagation();const L=!S.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(M=>{if(M!==S){M.classList.add("hidden"),M.style.transform="";const E=M.closest(".card-compact");E&&(E.classList.remove("card-open"),E.style.zIndex="")}}),L?(S.classList.add("hidden"),S.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(S.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const M=S.getBoundingClientRect(),E=12;let p=0;M.left<E?p=E-M.left:M.right>window.innerWidth-E&&(p=window.innerWidth-E-M.right),p!==0&&(S.style.transform=`translateX(calc(-50% + ${p}px))`)}))},a.appendChild(l),ef(a,s.name),b.currentTab==="collection"?(a.style.cursor="pointer",a.onclick=D=>{D.stopPropagation(),VT(s.name,a)}):(a.style.cursor="pointer",a.onclick=D=>{D.stopPropagation();const L=!S.classList.contains("hidden");document.querySelectorAll(".details-overlay").forEach(M=>{if(M!==S){M.classList.add("hidden"),M.style.transform="";const E=M.closest(".card-compact");E&&(E.classList.remove("card-open"),E.style.zIndex="")}}),L?(S.classList.add("hidden"),S.style.transform="",i.classList.remove("card-open"),i.style.zIndex=""):(S.classList.remove("hidden"),i.classList.add("card-open"),i.style.zIndex="50",requestAnimationFrame(()=>{const M=S.getBoundingClientRect(),E=12;let p=0;M.left<E?p=E-M.left:M.right>window.innerWidth-E&&(p=window.innerWidth-E-M.right),p!==0&&(S.style.transform=`translateX(calc(-50% + ${p}px))`)}))}),i.appendChild(a),i.appendChild(C),i.appendChild(S),n.appendChild(i),r.push(i)}r.length>0&&xi(r,{opacity:[0,1],y:[20,0]},{delay:ym(.015)})}function Ca(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedNo"),r=document.getElementById("collectedAllBlueprints"),s=document.getElementById("collectedYesBlueprints"),i=document.getElementById("collectedWishBlueprints"),a=document.getElementById("collectedNoBlueprints"),l=document.getElementById("collectedAllMobile"),u=document.getElementById("collectedYesMobile"),d=document.getElementById("collectedWishMobile"),m=document.getElementById("collectedNoMobile"),g=I=>{b.filters.collected=I,[[n,e,null,t],[r,s,i,a],[l,u,d,m]].forEach(N=>{const[S,V,x,q]=N;S&&(S.classList.remove("chip-active"),I==="all"&&S.classList.add("chip-active")),V&&(V.classList.remove("chip-active"),I==="collected"&&V.classList.add("chip-active")),x&&(x.classList.remove("chip-active"),I==="wishlist"&&x.classList.add("chip-active")),q&&(q.classList.remove("chip-active"),I==="not-collected"&&q.classList.add("chip-active"))}),ae(),we(),Se()};n&&(n.onclick=()=>g("all")),e&&(e.onclick=()=>g("collected")),t&&(t.onclick=()=>g("not-collected")),r&&(r.onclick=()=>g("all")),s&&(s.onclick=()=>g("collected")),i&&(i.onclick=()=>g("wishlist")),a&&(a.onclick=()=>g("not-collected")),l&&(l.onclick=()=>g("all")),u&&(u.onclick=()=>g("collected")),d&&(d.onclick=()=>g("wishlist")),m&&(m.onclick=()=>g("not-collected")),g(b.filters.collected)}
