(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function fm(n,e){n.indexOf(e)===-1&&n.push(e)}const Mu=(n,e,t)=>Math.min(Math.max(t,n),e),He={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},Ns=n=>typeof n=="number",Dn=n=>Array.isArray(n)&&!Ns(n[0]),mm=(n,e,t)=>{const s=e-n;return((t-n)%s+s)%s+n};function pm(n,e){return Dn(n)?n[mm(0,n.length,e)]:n}const Vu=(n,e,t)=>-t*n+t*e+n,Bu=()=>{},Ut=n=>n,Xo=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function Ou(n,e){const t=n[n.length-1];for(let s=1;s<=e;s++){const r=Xo(0,e,s);n.push(Vu(t,1,r))}}function gm(n){const e=[0];return Ou(e,n-1),e}function ym(n,e=gm(n.length),t=Ut){const s=n.length,r=s-e.length;return r>0&&Ou(e,r),i=>{let a=0;for(;a<s-2&&!(i<e[a+1]);a++);let c=Mu(0,1,Xo(e[a],e[a+1],i));return c=pm(t,a)(c),Vu(n[a],n[a+1],c)}}const Fu=n=>Array.isArray(n)&&Ns(n[0]),uo=n=>typeof n=="object"&&!!n.createAnimation,Un=n=>typeof n=="function",_m=n=>typeof n=="string",Ss={ms:n=>n*1e3,s:n=>n/1e3},Uu=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,wm=1e-7,Em=12;function vm(n,e,t,s,r){let i,a,c=0;do a=e+(t-e)/2,i=Uu(a,s,r)-n,i>0?t=a:e=a;while(Math.abs(i)>wm&&++c<Em);return a}function Is(n,e,t,s){if(n===e&&t===s)return Ut;const r=i=>vm(i,0,1,n,t);return i=>i===0||i===1?i:Uu(r(i),e,s)}const Im=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const s=t*n,r=e==="end"?Math.floor(s):Math.ceil(s);return Mu(0,1,r/n)},bm={ease:Is(.25,.1,.25,1),"ease-in":Is(.42,0,1,1),"ease-in-out":Is(.42,0,.58,1),"ease-out":Is(0,0,.58,1)},Tm=/\((.*?)\)/;function ho(n){if(Un(n))return n;if(Fu(n))return Is(...n);const e=bm[n];if(e)return e;if(n.startsWith("steps")){const t=Tm.exec(n);if(t){const s=t[1].split(",");return Im(parseFloat(s[0]),s[1].trim())}}return Ut}class zu{constructor(e,t=[0,1],{easing:s,duration:r=He.duration,delay:i=He.delay,endDelay:a=He.endDelay,repeat:c=He.repeat,offset:u,direction:d="normal",autoplay:f=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=Ut,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((_,T)=>{this.resolve=_,this.reject=T}),s=s||He.easing,uo(s)){const _=s.createAnimation(t);s=_.easing,t=_.keyframes||t,r=_.duration||r}this.repeat=c,this.easing=Dn(s)?Ut:ho(s),this.updateDuration(r);const p=ym(t,u,Dn(s)?s.map(ho):Ut);this.tick=_=>{var T;i=i;let A=0;this.pauseTime!==void 0?A=this.pauseTime:A=(_-this.startTime)*this.rate,this.t=A,A/=1e3,A=Math.max(A-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(A=this.totalDuration);const R=A/this.duration;let C=Math.floor(R),x=R%1;!x&&R>=1&&(x=1),x===1&&C--;const D=C%2;(d==="reverse"||d==="alternate"&&D||d==="alternate-reverse"&&!D)&&(x=1-x);const V=A>=this.totalDuration?1:Math.min(x,1),U=p(this.easing(V));e(U),this.pauseTime===void 0&&(this.playState==="finished"||A>=this.totalDuration+a)?(this.playState="finished",(T=this.resolve)===null||T===void 0||T.call(this,U)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},f&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Am{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const Gi=new WeakMap;function $u(n){return Gi.has(n)||Gi.set(n,{transforms:[],values:new Map}),Gi.get(n)}function Cm(n,e){return n.has(e)||n.set(e,new Am),n.get(e)}const Sm=["","X","Y","Z"],Rm=["translate","scale","rotate","skew"],Br={x:"translateX",y:"translateY",z:"translateZ"},Wc={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},Pm={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:Wc,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:Ut},skew:Wc},Ms=new Map,Yo=n=>`--motion-${n}`,Or=["x","y","z"];Rm.forEach(n=>{Sm.forEach(e=>{Or.push(n+e),Ms.set(Yo(n+e),Pm[n])})});const km=(n,e)=>Or.indexOf(n)-Or.indexOf(e),xm=new Set(Or),qu=n=>xm.has(n),Lm=(n,e)=>{Br[e]&&(e=Br[e]);const{transforms:t}=$u(n);fm(t,e),n.style.transform=Dm(t)},Dm=n=>n.sort(km).reduce(Nm,"").trim(),Nm=(n,e)=>`${n} ${e}(var(${Yo(e)}))`,fo=n=>n.startsWith("--"),Gc=new Set;function Mm(n){if(!Gc.has(n)){Gc.add(n);try{const{syntax:e,initialValue:t}=Ms.has(n)?Ms.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const Ki=(n,e)=>document.createElement("div").animate(n,e),Kc={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{Ki({opacity:[1]})}catch{return!1}return!0},finished:()=>!!Ki({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{Ki({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Qi={},Ln={};for(const n in Kc)Ln[n]=()=>(Qi[n]===void 0&&(Qi[n]=Kc[n]()),Qi[n]);const Vm=.015,Bm=(n,e)=>{let t="";const s=Math.round(e/Vm);for(let r=0;r<s;r++)t+=n(Xo(0,s-1,r))+", ";return t.substring(0,t.length-2)},Qc=(n,e)=>Un(n)?Ln.linearEasing()?`linear(${Bm(n,e)})`:He.easing:Fu(n)?Om(n):n,Om=([n,e,t,s])=>`cubic-bezier(${n}, ${e}, ${t}, ${s})`;function Fm(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const Um=n=>Array.isArray(n)?n:[n];function mo(n){return Br[n]&&(n=Br[n]),qu(n)?Yo(n):n}const pr={get:(n,e)=>{e=mo(e);let t=fo(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const s=Ms.get(e);s&&(t=s.initialValue)}return t},set:(n,e,t)=>{e=mo(e),fo(e)?n.style.setProperty(e,t):n.style[e]=t}};function ju(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function zm(n,e){var t;let s=(e==null?void 0:e.toDefaultUnit)||Ut;const r=n[n.length-1];if(_m(r)){const i=((t=r.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(s=a=>a+i)}return s}function $m(){return window.__MOTION_DEV_TOOLS_RECORD}function qm(n,e,t,s={},r){const i=$m(),a=s.record!==!1&&i;let c,{duration:u=He.duration,delay:d=He.delay,endDelay:f=He.endDelay,repeat:p=He.repeat,easing:_=He.easing,persist:T=!1,direction:A,offset:R,allowWebkitAcceleration:C=!1,autoplay:x=!0}=s;const D=$u(n),V=qu(e);let U=Ln.waapi();V&&Lm(n,e);const B=mo(e),O=Cm(D.values,B),E=Ms.get(B);return ju(O.animation,!(uo(_)&&O.generator)&&s.record!==!1),()=>{const g=()=>{var v,S;return(S=(v=pr.get(n,B))!==null&&v!==void 0?v:E==null?void 0:E.initialValue)!==null&&S!==void 0?S:0};let w=Fm(Um(t),g);const b=zm(w,E);if(uo(_)){const v=_.createAnimation(w,e!=="opacity",g,B,O);_=v.easing,w=v.keyframes||w,u=v.duration||u}if(fo(B)&&(Ln.cssRegisterProperty()?Mm(B):U=!1),V&&!Ln.linearEasing()&&(Un(_)||Dn(_)&&_.some(Un))&&(U=!1),U){E&&(w=w.map(I=>Ns(I)?E.toDefaultUnit(I):I)),w.length===1&&(!Ln.partialKeyframes()||a)&&w.unshift(g());const v={delay:Ss.ms(d),duration:Ss.ms(u),endDelay:Ss.ms(f),easing:Dn(_)?void 0:Qc(_,u),direction:A,iterations:p+1,fill:"both"};c=n.animate({[B]:w,offset:R,easing:Dn(_)?_.map(I=>Qc(I,u)):void 0},v),c.finished||(c.finished=new Promise((I,fe)=>{c.onfinish=I,c.oncancel=fe}));const S=w[w.length-1];c.finished.then(()=>{T||(pr.set(n,B,S),c.cancel())}).catch(Bu),C||(c.playbackRate=1.000001)}else if(r&&V)w=w.map(v=>typeof v=="string"?parseFloat(v):v),w.length===1&&w.unshift(parseFloat(g())),c=new r(v=>{pr.set(n,B,b?b(v):v)},w,Object.assign(Object.assign({},s),{duration:u,easing:_}));else{const v=w[w.length-1];pr.set(n,B,E&&Ns(v)?E.toDefaultUnit(v):v)}return a&&i(n,e,w,{duration:u,delay:d,easing:_,repeat:p,offset:R},"motion-one"),O.setAnimation(c),c&&!x&&c.pause(),c}}const jm=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function Hm(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const Wm=n=>n(),Hu=(n,e,t=He.duration)=>new Proxy({animations:n.map(Wm).filter(Boolean),duration:t,options:e},Km),Gm=n=>n.animations[0],Km={get:(n,e)=>{const t=Gm(n);switch(e){case"duration":return n.duration;case"currentTime":return Ss.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(Qm)).catch(Bu)),n.finished;case"stop":return()=>{n.animations.forEach(s=>ju(s))};case"forEachNative":return s=>{n.animations.forEach(r=>s(r,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(s=>s[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=Ss.ms(t);case"playbackRate":for(let s=0;s<n.animations.length;s++)n.animations[s][e]=t;return!0}return!1}},Qm=n=>n.finished;function Xm(n=.1,{start:e=0,from:t=0,easing:s}={}){return(r,i)=>{const a=Ns(t)?t:Ym(t,i),c=Math.abs(a-r);let u=n*c;if(s){const d=i*n;u=ho(s)(u/d)*d}return e+u}}function Ym(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function Jm(n,e,t){return Un(n)?n(e,t):n}function Zm(n){return function(t,s,r={}){t=Hm(t);const i=t.length,a=[];for(let c=0;c<i;c++){const u=t[c];for(const d in s){const f=jm(r,d);f.delay=Jm(f.delay,c,i);const p=qm(u,d,s[d],f,n);a.push(p)}}return Hu(a,r,r.duration)}}const ep=Zm(zu);function tp(n,e={}){return Hu([()=>{const t=new zu(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function np(n,e,t){return(Un(n)?tp:ep)(n,e,t)}window.TutorialSlideshow={steps:[{text:"Welcome to the <span class='text-highlight'>Arc Blueprint Tracker</span>!",imageDesktop:"desktop_main.webp",imageMobile:"mobile_main.webp"},{textDesktop:"<span class='text-highlight'>Click</span> a Blueprint to see information on where you can get it.",textMobile:"<span class='text-highlight'>Tap</span> a Blueprint to see information on where you can get it.",imageDesktop:"desktop_main_card_h.webp",imageMobile:"mobile_main_card_h.webp"},{text:"Here you can see the data on its <span class='text-highlight'>spawn patterns</span>, or if it is a Quest or Trial reward.",imageDesktop:"desktop_details_h.webp",imageMobile:"mobile_details_h.webp"},{text:"The <span class='text-highlight'>Confidence</span> — or amount of data pointing to that conclusion — is marked by a colored indicator on the item card.",imageDesktop:"desktop_main_conf_indicator_h.webp",imageMobile:"mobile_main_conf_indicator_h.webp"},{textDesktop:"<span class='text-highlight'>Right click</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",textMobile:"<span class='text-highlight'>Long press</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",imageDesktop:"desktop_context_menu_h.webp",imageMobile:"mobile_main_card_h.webp"},{text:"Here you can mark items as <span class='text-green'>collected</span>, <span class='text-yellow'>wishlisted</span>, or add <span class='text-blue'>spares</span>.",imageDesktop:"desktop_context_menu_h.webp",imageMobile:"mobile_context_menu_h.webp"},{text:"Have a lot of items to collect? Use the <span class='text-highlight'>mark items as collected</span> button to enter collect mode.",imageDesktop:"desktop_collect_mode_h.webp",imageMobile:"mobile_collect_mode_h.webp"},{text:"After you find a Blueprint please submit your findings right here on the blueprints tab!",imageDesktop:"desktop_main_submit_button_h.webp",imageMobile:"mobile_main_submit_button.webp"},{text:"Add in the blueprint, condition, map/location, and importantly container type. Once we have collected enough data we will make a heatmap of all these user submitted locations!",imageDesktop:"desktop_submit_final.webp",imageMobile:"mobile_submission_final.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the sidebar icon to access your account and the filters menu.",textMobile:"<span class='text-highlight'>Tap</span> the sidebar icon to access your account and the filters menu.",imageDesktop:"desktop_main_filters_button_h.webp",imageMobile:"mobile_main_filter_button_h.webp"},{text:"Sync with a google account to keep track of your item collection. Use the filters buttons to customize your view.",imageDesktop:"desktop_main_sign_in_h.webp",imageMobile:"mobile_filters_panel_sign_in_h.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or click the “detailed data” button inside an item’s description to jump to that item’s data.)",textMobile:"<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or tap the “detailed data” button inside an item’s description to jump to that item’s data.)",imageDesktop:"desktop_data_tab_h.webp",imageMobile:"mobile_data_tab_h.webp"},{textDesktop:"This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Click</span> an item to see its detailed stats.",textMobile:"This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Tap</span> an item to see its detailed stats.",imageDesktop:"desktop_data_dropdown_h.webp",imageMobile:"mobile_data_tab_dropdown_h.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",textMobile:"<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",imageDesktop:"desktop_progression_h.webp",imageMobile:"mobile_progression_tab_h.webp"},{text:"The <span class='text-highlight'>Updates and News</span> tab is where you can keep up with new updates and access the Discord and Kofi as well!",imageDesktop:"desktop_news_h.webp",imageMobile:"mobile_news_tab.webp"},{text:"Join the Discord to share findings, trade blueprints, discuss strategies, and generally stay up to date with the site.",imageDesktop:"desktop_news_discord_h.webp",imageMobile:"mobile_news_tab_discord.webp"},{text:"Kofi is how you can support me if you enjoy the site and find it useful. I want to keep this site free and ad free for as long as possible and so far community donations have made that possible!",imageDesktop:"desktop_news_kofi.webp",imageMobile:"mobile_news_tab_kofi.webp"},{text:"Enjoy the tracker and good luck Topside, <span class='text-highlight'>Raider</span>!",imageDesktop:"desktop_main.webp",imageMobile:"mobile_main.webp"}],currentIndex:0,prefix:"images/tutorial/",init(){localStorage.getItem("tutorial_slideshow_seen")||setTimeout(()=>this.open(),500),window.openTutorial=()=>this.open()},open(){this.currentIndex=0,this.renderOverlay(),document.body.style.overflow="hidden",this.preloadImages()},close(){const n=document.getElementById("tutorialSlideshowOverlay");n&&(n.classList.remove("active"),setTimeout(()=>n.remove(),300)),document.body.style.overflow="",localStorage.setItem("tutorial_slideshow_seen","true")},showExitPrompt(){const n=document.getElementById("tutorialSlideshowOverlay");if(!n)return;const e=n.querySelector(".tutorial-modal");e&&(e.style.maxWidth="360px",e.style.width="90%",e.style.height="auto",e.style.minHeight="auto",e.style.background="rgba(24, 24, 27, 0.4)",e.style.backdropFilter="blur(12px)",e.style.webkitBackdropFilter="blur(12px)",e.style.border="1px solid rgba(255, 255, 255, 0.08)",e.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)",e.style.borderRadius="16px",e.style.display="flex",e.style.flexDirection="column",e.style.overflow="hidden",e.innerHTML=`
            <div style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center;">
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <h3 style="font-size: 1rem; font-weight: 600; color: #f4f4f5; margin: 0;">Exit Tutorial</h3>
                    <p style="color: #a1a1aa; font-size: 0.85rem; line-height: 1.4; margin: 0;">
                        You can always open this again from the <span style="color: #34d399; font-weight: 500;">Updates & News</span> tab.
                    </p>
                </div>
                
                <button style="
                    width: 100%;
                    padding: 0.6rem; 
                    background: rgba(255, 255, 255, 0.08); 
                    color: white; 
                    font-size: 0.9rem;
                    font-weight: 500; 
                    border-radius: 8px; 
                    border: 1px solid rgba(255, 255, 255, 0.05); 
                    cursor: pointer; 
                    transition: all 0.2s;
                " 
                onclick="window.TutorialSlideshow.close()"
                onmouseover="this.style.background='rgba(255, 255, 255, 0.12)'"
                onmouseout="this.style.background='rgba(255, 255, 255, 0.08)'">
                    Okay
                </button>
            </div>
        `)},next(){this.currentIndex<this.steps.length-1?(this.currentIndex++,this.updateContent()):this.close()},prev(){this.currentIndex>0&&(this.currentIndex--,this.updateContent())},preloadImages(){for(let n=1;n<=3;n++)if(this.steps[this.currentIndex+n]){const e=new Image;e.src=this.prefix+(window.innerWidth<768?this.steps[this.currentIndex+n].imageMobile:this.steps[this.currentIndex+n].imageDesktop)}},getImageUrl(n){const e=window.innerWidth<768;return this.prefix+(e?n.imageMobile:n.imageDesktop)},renderOverlay(){const n=document.getElementById("tutorialSlideshowOverlay");n&&n.remove();const e=document.createElement("div");e.id="tutorialSlideshowOverlay",e.className="tutorial-overlay",e.innerHTML=`
            <div class="tutorial-modal">
                <button class="tutorial-close-absolute" onclick="window.TutorialSlideshow.showExitPrompt()">&times;</button>
                
                <div class="tutorial-image-container">
                    <img id="tutorialImage" src="" alt="Tutorial Slide" />
                </div>
                
                <div class="tutorial-content">
                    <div id="tutorialText" class="tutorial-text"></div>
                    
                    <div class="tutorial-nav">
                        <div class="tutorial-dots" id="tutorialDots">
                            <!-- Dots generated by JS -->
                        </div>
                        <div class="tutorial-btn-group">
                            <button class="tutorial-btn" id="tutorialBackBtn" onclick="window.TutorialSlideshow.prev()">Back</button>
                            <button class="tutorial-btn primary" id="tutorialNextBtn" onclick="window.TutorialSlideshow.next()">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(e);const t=document.getElementById("tutorialDots");this.steps.forEach((s,r)=>{const i=document.createElement("div");i.className="tutorial-dot",t.appendChild(i)}),requestAnimationFrame(()=>{e.classList.add("active"),this.updateContent()}),window.addEventListener("resize",this.handleResize.bind(this))},getText(n){const e=window.innerWidth<768;return e&&n.textMobile?n.textMobile:!e&&n.textDesktop?n.textDesktop:n.text},handleResize(){if(!document.getElementById("tutorialSlideshowOverlay"))return;const n=this.steps[this.currentIndex];if(!n)return;const e=document.getElementById("tutorialImage");e&&(e.src=this.getImageUrl(n));const t=document.getElementById("tutorialText");t&&(t.innerHTML=this.getText(n))},updateContent(){const n=this.steps[this.currentIndex],e=document.getElementById("tutorialImage"),t=document.getElementById("tutorialText"),s=document.querySelectorAll(".tutorial-dot"),r=document.getElementById("tutorialBackBtn"),i=document.getElementById("tutorialNextBtn");e&&(e.style.opacity="0.5",setTimeout(()=>{e.src=this.getImageUrl(n),e.onload=()=>{e.style.opacity="1"}},100)),t&&(t.innerHTML=this.getText(n)),s.forEach((a,c)=>{c===this.currentIndex?a.classList.add("active"):a.classList.remove("active")}),r&&(r.style.visibility=this.currentIndex===0?"hidden":"visible"),i&&(i.textContent=this.currentIndex===this.steps.length-1?"Finish":"Next")}};const Xc=()=>{console.log("Initializing Tutorial Slideshow..."),window.TutorialSlideshow?window.TutorialSlideshow.init():console.error("TutorialSlideshow not found on window!")};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Xc):Xc();const sp=()=>{};var Yc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},rp=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],a=n[t++],c=n[t++],u=((r&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(u>>10)),e[s++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Gu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],a=r+1<n.length,c=a?n[r+1]:0,u=r+2<n.length,d=u?n[r+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let _=(c&15)<<2|d>>6,T=d&63;u||(T=64,a||(_=64)),s.push(t[f],t[p],t[_],t[T])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Wu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):rp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const p=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||d==null||p==null)throw new ip;const _=i<<2|c>>4;if(s.push(_),d!==64){const T=c<<4&240|d>>2;if(s.push(T),p!==64){const A=d<<6&192|p;s.push(A)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ip extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const op=function(n){const e=Wu(n);return Gu.encodeByteArray(e,!0)},Fr=function(n){return op(n).replace(/\./g,"")},Ku=function(n){try{return Gu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ap(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cp=()=>ap().__FIREBASE_DEFAULTS__,lp=()=>{if(typeof process>"u"||typeof Yc>"u")return;const n=Yc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},up=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ku(n[1]);return e&&JSON.parse(e)},ai=()=>{try{return sp()||cp()||lp()||up()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Qu=n=>{var e,t;return(t=(e=ai())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},dp=n=>{const e=Qu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Xu=()=>{var n;return(n=ai())==null?void 0:n.config},Yu=n=>{var e;return(e=ai())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function Qn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ju(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function fp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Fr(JSON.stringify(t)),Fr(JSON.stringify(a)),""].join(".")}const Rs={};function mp(){const n={prod:[],emulator:[]};for(const e of Object.keys(Rs))Rs[e]?n.emulator.push(e):n.prod.push(e);return n}function pp(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Jc=!1;function Zu(n,e){if(typeof window>"u"||typeof document>"u"||!Qn(window.location.host)||Rs[n]===e||Rs[n]||Jc)return;Rs[n]=e;function t(_){return`__firebase__banner__${_}`}const s="__firebase__banner",i=mp().prod.length>0;function a(){const _=document.getElementById(s);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,T){_.setAttribute("width","24"),_.setAttribute("id",T),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function d(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{Jc=!0,a()},_}function f(_,T){_.setAttribute("id",T),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function p(){const _=pp(s),T=t("text"),A=document.getElementById(T)||document.createElement("span"),R=t("learnmore"),C=document.getElementById(R)||document.createElement("a"),x=t("preprendIcon"),D=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const V=_.element;c(V),f(C,R);const U=d();u(D,x),V.append(D,A,C,U),document.body.appendChild(V)}i?(A.innerText="Preview backend disconnected.",D.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,A.innerText="Preview backend running in this workspace."),A.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function gp(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function yp(){var e;const n=(e=ai())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function _p(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wp(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ep(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vp(){const n=Ne();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ip(){return!yp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function bp(){try{return typeof indexedDB=="object"}catch{return!1}}function Tp(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap="FirebaseError";class At extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Ap,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,js.prototype.create)}}class js{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?Cp(i,s):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new At(r,c,s)}}function Cp(n,e){return n.replace(Sp,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Sp=/\{\$([^}]+)}/g;function Rp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function mn(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],a=e[r];if(Zc(i)&&Zc(a)){if(!mn(i,a))return!1}else if(i!==a)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function Zc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Pp(n,e){const t=new kp(n,e);return t.subscribe.bind(t)}class kp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");xp(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=Xi),r.error===void 0&&(r.error=Xi),r.complete===void 0&&(r.complete=Xi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Xi(){}/**
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
 */function Ue(n){return n&&n._delegate?n._delegate:n}class pn{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rn="[DEFAULT]";/**
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
 */class Lp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new hp;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Np(e))try{this.getOrInitializeService({instanceIdentifier:rn})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rn){return this.instances.has(e)}getOptions(e=rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);s===c&&a.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Dp(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=rn){return this.component?this.component.multipleInstances?e:rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dp(n){return n===rn?void 0:n}function Np(n){return n.instantiationMode==="EAGER"}/**
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
 */class Mp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Lp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Vp={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Bp=Y.INFO,Op={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},Fp=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Op[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jo{constructor(e){this.name=e,this._logLevel=Bp,this._logHandler=Fp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const Up=(n,e)=>e.some(t=>n instanceof t);let el,tl;function zp(){return el||(el=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $p(){return tl||(tl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ed=new WeakMap,po=new WeakMap,td=new WeakMap,Yi=new WeakMap,Zo=new WeakMap;function qp(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(zt(n.result)),r()},a=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&ed.set(t,n)}).catch(()=>{}),Zo.set(e,n),e}function jp(n){if(po.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});po.set(n,e)}let go={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return po.get(n);if(e==="objectStoreNames")return n.objectStoreNames||td.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return zt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Hp(n){go=n(go)}function Wp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Ji(this),e,...t);return td.set(s,e.sort?e.sort():[e]),zt(s)}:$p().includes(n)?function(...e){return n.apply(Ji(this),e),zt(ed.get(this))}:function(...e){return zt(n.apply(Ji(this),e))}}function Gp(n){return typeof n=="function"?Wp(n):(n instanceof IDBTransaction&&jp(n),Up(n,zp())?new Proxy(n,go):n)}function zt(n){if(n instanceof IDBRequest)return qp(n);if(Yi.has(n))return Yi.get(n);const e=Gp(n);return e!==n&&(Yi.set(n,e),Zo.set(e,n)),e}const Ji=n=>Zo.get(n);function Kp(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const a=indexedDB.open(n,e),c=zt(a);return s&&a.addEventListener("upgradeneeded",u=>{s(zt(a.result),u.oldVersion,u.newVersion,zt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),r&&u.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Qp=["get","getKey","getAll","getAllKeys","count"],Xp=["put","add","delete","clear"],Zi=new Map;function nl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Zi.get(e))return Zi.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=Xp.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Qp.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,r?"readwrite":"readonly");let d=u.store;return s&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&u.done]))[0]};return Zi.set(e,i),i}Hp(n=>({...n,get:(e,t,s)=>nl(e,t)||n.get(e,t,s),has:(e,t)=>!!nl(e,t)||n.has(e,t)}));/**
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
 */class Yp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Jp(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Jp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yo="@firebase/app",sl="0.14.6";/**
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
 */const Et=new Jo("@firebase/app"),Zp="@firebase/app-compat",eg="@firebase/analytics-compat",tg="@firebase/analytics",ng="@firebase/app-check-compat",sg="@firebase/app-check",rg="@firebase/auth",ig="@firebase/auth-compat",og="@firebase/database",ag="@firebase/data-connect",cg="@firebase/database-compat",lg="@firebase/functions",ug="@firebase/functions-compat",dg="@firebase/installations",hg="@firebase/installations-compat",fg="@firebase/messaging",mg="@firebase/messaging-compat",pg="@firebase/performance",gg="@firebase/performance-compat",yg="@firebase/remote-config",_g="@firebase/remote-config-compat",wg="@firebase/storage",Eg="@firebase/storage-compat",vg="@firebase/firestore",Ig="@firebase/ai",bg="@firebase/firestore-compat",Tg="firebase",Ag="12.6.0";/**
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
 */const _o="[DEFAULT]",Cg={[yo]:"fire-core",[Zp]:"fire-core-compat",[tg]:"fire-analytics",[eg]:"fire-analytics-compat",[sg]:"fire-app-check",[ng]:"fire-app-check-compat",[rg]:"fire-auth",[ig]:"fire-auth-compat",[og]:"fire-rtdb",[ag]:"fire-data-connect",[cg]:"fire-rtdb-compat",[lg]:"fire-fn",[ug]:"fire-fn-compat",[dg]:"fire-iid",[hg]:"fire-iid-compat",[fg]:"fire-fcm",[mg]:"fire-fcm-compat",[pg]:"fire-perf",[gg]:"fire-perf-compat",[yg]:"fire-rc",[_g]:"fire-rc-compat",[wg]:"fire-gcs",[Eg]:"fire-gcs-compat",[vg]:"fire-fst",[bg]:"fire-fst-compat",[Ig]:"fire-vertex","fire-js":"fire-js",[Tg]:"fire-js-all"};/**
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
 */const Ur=new Map,Sg=new Map,wo=new Map;function rl(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function zn(n){const e=n.name;if(wo.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;wo.set(e,n);for(const t of Ur.values())rl(t,n);for(const t of Sg.values())rl(t,n);return!0}function ea(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Qe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Rg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$t=new js("app","Firebase",Rg);/**
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
 */class Pg{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new pn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $t.create("app-deleted",{appName:this._name})}}/**
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
 */const Xn=Ag;function nd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:_o,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw $t.create("bad-app-name",{appName:String(r)});if(t||(t=Xu()),!t)throw $t.create("no-options");const i=Ur.get(r);if(i){if(mn(t,i.options)&&mn(s,i.config))return i;throw $t.create("duplicate-app",{appName:r})}const a=new Mp(r);for(const u of wo.values())a.addComponent(u);const c=new Pg(t,s,a);return Ur.set(r,c),c}function sd(n=_o){const e=Ur.get(n);if(!e&&n===_o&&Xu())return nd();if(!e)throw $t.create("no-app",{appName:n});return e}function qt(n,e,t){let s=Cg[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(a.join(" "));return}zn(new pn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const kg="firebase-heartbeat-database",xg=1,Vs="firebase-heartbeat-store";let eo=null;function rd(){return eo||(eo=Kp(kg,xg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vs)}catch(t){console.warn(t)}}}}).catch(n=>{throw $t.create("idb-open",{originalErrorMessage:n.message})})),eo}async function Lg(n){try{const t=(await rd()).transaction(Vs),s=await t.objectStore(Vs).get(id(n));return await t.done,s}catch(e){if(e instanceof At)Et.warn(e.message);else{const t=$t.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Et.warn(t.message)}}}async function il(n,e){try{const s=(await rd()).transaction(Vs,"readwrite");await s.objectStore(Vs).put(e,id(n)),await s.done}catch(t){if(t instanceof At)Et.warn(t.message);else{const s=$t.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Et.warn(s.message)}}}function id(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Dg=1024,Ng=30;class Mg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bg(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ol();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Ng){const a=Og(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Et.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ol(),{heartbeatsToSend:s,unsentEntries:r}=Vg(this._heartbeatsCache.heartbeats),i=Fr(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Et.warn(t),""}}}function ol(){return new Date().toISOString().substring(0,10)}function Vg(n,e=Dg){const t=[];let s=n.slice();for(const r of n){const i=t.find(a=>a.agent===r.agent);if(i){if(i.dates.push(r.date),al(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),al(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Bg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bp()?Tp().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Lg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return il(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return il(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function al(n){return Fr(JSON.stringify({version:2,heartbeats:n})).length}function Og(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function Fg(n){zn(new pn("platform-logger",e=>new Yp(e),"PRIVATE")),zn(new pn("heartbeat",e=>new Mg(e),"PRIVATE")),qt(yo,sl,n),qt(yo,sl,"esm2020"),qt("fire-js","")}Fg("");var Ug="firebase",zg="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qt(Ug,zg,"app");function od(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $g=od,ad=new js("auth","Firebase",od());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new Jo("@firebase/auth");function qg(n,...e){zr.logLevel<=Y.WARN&&zr.warn(`Auth (${Xn}): ${n}`,...e)}function Tr(n,...e){zr.logLevel<=Y.ERROR&&zr.error(`Auth (${Xn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n,...e){throw na(n,...e)}function Je(n,...e){return na(n,...e)}function ta(n,e,t){const s={...$g(),[e]:t};return new js("auth","Firebase",s).create(e,{appName:n.name})}function dn(n){return ta(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function jg(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&ht(n,"argument-error"),ta(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function na(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return ad.create(n,...e)}function W(n,e,...t){if(!n)throw na(e,...t)}function yt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Tr(e),new Error(e)}function vt(n,e){n||yt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Hg(){return cl()==="http:"||cl()==="https:"}function cl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hg()||wp()||"connection"in navigator)?navigator.onLine:!0}function Gg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,t){this.shortDelay=e,this.longDelay=t,vt(t>e,"Short delay should be less than long delay!"),this.isMobile=gp()||Ep()}get(){return Wg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(n,e){vt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xg=new Ws(3e4,6e4);function ra(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Yn(n,e,t,s,r={}){return ld(n,r,async()=>{let i={},a={};s&&(e==="GET"?a=s:i={body:JSON.stringify(s)});const c=Hs({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return _p()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(d.credentials="include"),cd.fetch()(await ud(n,n.config.apiHost,t,c),d)})}async function ld(n,e,t){n._canInitEmulator=!1;const s={...Kg,...e};try{const r=new Jg(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw gr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw gr(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw gr(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw gr(n,"user-disabled",a);const f=s[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ta(n,f,d);ht(n,f)}}catch(r){if(r instanceof At)throw r;ht(n,"network-request-failed",{message:String(r)})}}async function Yg(n,e,t,s,r={}){const i=await Yn(n,e,t,s,r);return"mfaPendingCredential"in i&&ht(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function ud(n,e,t,s){const r=`${e}${t}?${s}`,i=n,a=i.config.emulator?sa(n.config,r):`${n.config.apiScheme}://${r}`;return Qg.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class Jg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(Je(this.auth,"network-request-failed")),Xg.get())})}}function gr(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=Je(n,e,s);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zg(n,e){return Yn(n,"POST","/v1/accounts:delete",e)}async function $r(n,e){return Yn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ps(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ey(n,e=!1){const t=Ue(n),s=await t.getIdToken(e),r=ia(s);W(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Ps(to(r.auth_time)),issuedAtTime:Ps(to(r.iat)),expirationTime:Ps(to(r.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function to(n){return Number(n)*1e3}function ia(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Tr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Ku(t);return r?JSON.parse(r):(Tr("Failed to decode base64 JWT payload"),null)}catch(r){return Tr("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function ll(n){const e=ia(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bs(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof At&&ty(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function ty({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ps(this.lastLoginAt),this.creationTime=Ps(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function qr(n){var p;const e=n.auth,t=await n.getIdToken(),s=await Bs(n,$r(e,{idToken:t}));W(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(p=r.providerUserInfo)!=null&&p.length?dd(r.providerUserInfo):[],a=ry(n.providerData,i),c=n.isAnonymous,u=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new vo(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function sy(n){const e=Ue(n);await qr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ry(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function dd(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iy(n,e){const t=await ld(n,{},async()=>{const s=Hs({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,a=await ud(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:s};return n.emulatorConfig&&Qn(n.emulatorConfig.host)&&(u.credentials="include"),cd.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function oy(n,e){return Yn(n,"POST","/v2/accounts:revokeToken",ra(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ll(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=ll(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await iy(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,a=new Nn;return s&&(W(typeof s=="string","internal-error",{appName:e}),a.refreshToken=s),r&&(W(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Nn,this.toJSON())}_performRefresh(){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Xe{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new ny(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new vo(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Bs(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ey(this,e)}reload(){return sy(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await qr(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qe(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Bs(this,Zg(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:_,isAnonymous:T,providerData:A,stsTokenManager:R}=t;W(p&&R,e,"internal-error");const C=Nn.fromJSON(this.name,R);W(typeof p=="string",e,"internal-error"),Mt(s,e.name),Mt(r,e.name),W(typeof _=="boolean",e,"internal-error"),W(typeof T=="boolean",e,"internal-error"),Mt(i,e.name),Mt(a,e.name),Mt(c,e.name),Mt(u,e.name),Mt(d,e.name),Mt(f,e.name);const x=new Xe({uid:p,auth:e,email:r,emailVerified:_,displayName:s,isAnonymous:T,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:C,createdAt:d,lastLoginAt:f});return A&&Array.isArray(A)&&(x.providerData=A.map(D=>({...D}))),u&&(x._redirectEventId=u),x}static async _fromIdTokenResponse(e,t,s=!1){const r=new Nn;r.updateFromServerResponse(t);const i=new Xe({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await qr(i),i}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];W(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?dd(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),c=new Nn;c.updateFromIdToken(s);const u=new Xe({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new vo(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul=new Map;function _t(n){vt(n instanceof Function,"Expected a class definition");let e=ul.get(n);return e?(vt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ul.set(n,e),e)}/**
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
 */class hd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}hd.type="NONE";const dl=hd;/**
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
 */function Ar(n,e,t){return`firebase:${n}:${e}:${t}`}class Mn{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Ar(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ar("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await $r(this.auth,{idToken:e}).catch(()=>{});return t?Xe._fromGetAccountInfoResponse(this.auth,t,e):null}return Xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new Mn(_t(dl),e,s);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=r[0]||_t(dl);const a=Ar(s,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let p;if(typeof f=="string"){const _=await $r(e,{idToken:f}).catch(()=>{});if(!_)break;p=await Xe._fromGetAccountInfoResponse(e,_,f)}else p=Xe._fromJSON(e,f);d!==i&&(c=p),i=d;break}}catch{}const u=r.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Mn(i,e,s):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Mn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(gd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(fd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(_d(e))return"Blackberry";if(wd(e))return"Webos";if(md(e))return"Safari";if((e.includes("chrome/")||pd(e))&&!e.includes("edge/"))return"Chrome";if(yd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function fd(n=Ne()){return/firefox\//i.test(n)}function md(n=Ne()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function pd(n=Ne()){return/crios\//i.test(n)}function gd(n=Ne()){return/iemobile/i.test(n)}function yd(n=Ne()){return/android/i.test(n)}function _d(n=Ne()){return/blackberry/i.test(n)}function wd(n=Ne()){return/webos/i.test(n)}function oa(n=Ne()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ay(n=Ne()){var e;return oa(n)&&!!((e=window.navigator)!=null&&e.standalone)}function cy(){return vp()&&document.documentMode===10}function Ed(n=Ne()){return oa(n)||yd(n)||wd(n)||_d(n)||/windows phone/i.test(n)||gd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vd(n,e=[]){let t;switch(n){case"Browser":t=hl(Ne());break;case"Worker":t=`${hl(Ne())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Xn}/${s}`}/**
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
 */class ly{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function uy(n,e={}){return Yn(n,"GET","/v2/passwordPolicy",ra(n,e))}/**
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
 */const dy=6;class hy{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??dy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new fl(this),this.idTokenSubscription=new fl(this),this.beforeStateQueue=new ly(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ad,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=_t(t)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await Mn.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await $r(this,{idToken:e}),s=await Xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Qe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Gg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qe(this.app))return Promise.reject(dn(this));const t=e?Ue(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qe(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qe(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_t(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await uy(this),t=new hy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new js("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await oy(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&_t(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[_t(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,s,r);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=vd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Qe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&qg(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ci(n){return Ue(n)}class fl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Pp(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let aa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function my(n){aa=n}function py(n){return aa.loadJS(n)}function gy(){return aa.gapiScript}function yy(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(n,e){const t=ea(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(mn(i,e??{}))return r;ht(r,"already-initialized")}return t.initialize({options:e})}function wy(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(_t);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function Ey(n,e,t){const s=ci(n);W(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Id(e),{host:a,port:c}=vy(e),u=c===null?"":`:${c}`,d={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){W(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),W(mn(d,s.config.emulator)&&mn(f,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=d,s.emulatorConfig=f,s.settings.appVerificationDisabledForTesting=!0,Qn(a)?(Ju(`${i}//${a}${u}`),Zu("Auth",!0)):Iy()}function Id(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function vy(n){const e=Id(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:ml(s.substr(i.length+1))}}else{const[i,a]=s.split(":");return{host:i,port:ml(a)}}}function ml(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Iy(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return yt("not implemented")}_getIdTokenResponse(e){return yt("not implemented")}_linkToIdToken(e,t){return yt("not implemented")}_getReauthenticationResolver(e){return yt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vn(n,e){return Yg(n,"POST","/v1/accounts:signInWithIdp",ra(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by="http://localhost";class gn extends bd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=t;if(!s||!r)return null;const a=new gn(s,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,Vn(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){const e={requestUri:by,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Hs(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Gs extends ca{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends Gs{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Vt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends Gs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return gt.credential(t,s)}catch{return null}}}gt.GOOGLE_SIGN_IN_METHOD="google.com";gt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Gs{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.GITHUB_SIGN_IN_METHOD="github.com";Bt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends Gs{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Ot.credential(t,s)}catch{return null}}}Ot.TWITTER_SIGN_IN_METHOD="twitter.com";Ot.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await Xe._fromIdTokenResponse(e,s,r),a=pl(s);return new $n({user:i,providerId:a,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=pl(s);return new $n({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function pl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends At{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,jr.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new jr(e,t,s,r)}}function Td(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?jr._fromErrorAndOperation(n,i,e,s):i})}async function Ty(n,e,t=!1){const s=await Bs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return $n._forOperation(n,"link",s)}/**
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
 */async function Ay(n,e,t=!1){const{auth:s}=n;if(Qe(s.app))return Promise.reject(dn(s));const r="reauthenticate";try{const i=await Bs(n,Td(s,r,e,n),t);W(i.idToken,s,"internal-error");const a=ia(i.idToken);W(a,s,"internal-error");const{sub:c}=a;return W(n.uid===c,s,"user-mismatch"),$n._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ht(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cy(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const s="signIn",r=await Td(n,s,e),i=await $n._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n,e){return Ue(n).setPersistence(e)}function Sy(n,e,t,s){return Ue(n).onIdTokenChanged(e,t,s)}function Ry(n,e,t){return Ue(n).beforeAuthStateChanged(e,t)}function Py(n,e,t,s){return Ue(n).onAuthStateChanged(e,t,s)}function ky(n){return Ue(n).signOut()}const Hr="__sak";/**
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
 */class Cd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Hr,"1"),this.storage.removeItem(Hr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy=1e3,Ly=10;class Sd extends Cd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ed(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(s);!t&&this.localCache[s]===a||this.notifyListeners(s,a)},i=this.storage.getItem(s);cy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Ly):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},xy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Sd.type="LOCAL";const la=Sd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd extends Cd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Rd.type="SESSION";const Pd=Rd;/**
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
 */function Dy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class li{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new li(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,i)),u=await Dy(c);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}li.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Ny{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const d=ua("",20);r.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},s);a={messageChannel:r,onMessage(p){const _=p;if(_.data.eventId===d)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(_.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return window}function My(n){ot().location.href=n}/**
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
 */function kd(){return typeof ot().WorkerGlobalScope<"u"&&typeof ot().importScripts=="function"}async function Vy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function By(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Oy(){return kd()?self:null}/**
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
 */const xd="firebaseLocalStorageDb",Fy=1,Wr="firebaseLocalStorage",Ld="fbase_key";class Ks{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ui(n,e){return n.transaction([Wr],e?"readwrite":"readonly").objectStore(Wr)}function Uy(){const n=indexedDB.deleteDatabase(xd);return new Ks(n).toPromise()}function Io(){const n=indexedDB.open(xd,Fy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(Wr,{keyPath:Ld})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(Wr)?e(s):(s.close(),await Uy(),e(await Io()))})})}async function gl(n,e,t){const s=ui(n,!0).put({[Ld]:e,value:t});return new Ks(s).toPromise()}async function zy(n,e){const t=ui(n,!1).get(e),s=await new Ks(t).toPromise();return s===void 0?null:s.value}function yl(n,e){const t=ui(n,!0).delete(e);return new Ks(t).toPromise()}const $y=800,qy=3;class Dd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Io(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>qy)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return kd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=li._getInstance(Oy()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await Vy(),!this.activeServiceWorker)return;this.sender=new Ny(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||By()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Io();return await gl(e,Hr,"1"),await yl(e,Hr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>gl(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>zy(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>yl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=ui(r,!1).getAll();return new Ks(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$y)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Dd.type="LOCAL";const jy=Dd;new Ws(3e4,6e4);/**
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
 */class da extends bd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Hy(n){return Cy(n.auth,new da(n),n.bypassAuthState)}function Wy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Ay(t,new da(n),n.bypassAuthState)}async function Gy(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Ty(t,new da(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Hy;case"linkViaPopup":case"linkViaRedirect":return Gy;case"reauthViaPopup":case"reauthViaRedirect":return Wy;default:ht(this.auth,"internal-error")}}resolve(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=new Ws(2e3,1e4);async function Qy(n,e,t){if(Qe(n.app))return Promise.reject(Je(n,"operation-not-supported-in-this-environment"));const s=ci(n);jg(n,e,ca);const r=Nd(s,t);return new an(s,"signInViaPopup",e,r).executeNotNull()}class an extends Md{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){vt(this.filter.length===1,"Popup operations only handle one event");const e=ua();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ky.get())};e()}}an.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy="pendingRedirect",Cr=new Map;class Yy extends Md{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=Cr.get(this.auth._key());if(!e){try{const s=await Jy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}Cr.set(this.auth._key(),e)}return this.bypassAuthState||Cr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Jy(n,e){const t=t_(e),s=e_(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function Zy(n,e){Cr.set(n._key(),e)}function e_(n){return _t(n._redirectPersistence)}function t_(n){return Ar(Xy,n.config.apiKey,n.name)}async function n_(n,e,t=!1){if(Qe(n.app))return Promise.reject(dn(n));const s=ci(n),r=Nd(s,e),a=await new Yy(s,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await s._persistUserIfCurrent(a.user),await s._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_=10*60*1e3;class r_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!i_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Vd(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(Je(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=s_&&this.cachedEventUids.clear(),this.cachedEventUids.has(_l(e))}saveEventToCache(e){this.cachedEventUids.add(_l(e)),this.lastProcessedEventTime=Date.now()}}function _l(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Vd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function i_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Vd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function o_(n,e={}){return Yn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,c_=/^https?/;async function l_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await o_(n);for(const t of e)try{if(u_(t))return}catch{}ht(n,"unauthorized-domain")}function u_(n){const e=Eo(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===s}if(!c_.test(t))return!1;if(a_.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const d_=new Ws(3e4,6e4);function wl(){const n=ot().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function h_(n){return new Promise((e,t)=>{var r,i,a;function s(){wl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wl(),t(Je(n,"network-request-failed"))},timeout:d_.get()})}if((i=(r=ot().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=ot().gapi)!=null&&a.load)s();else{const c=yy("iframefcb");return ot()[c]=()=>{gapi.load?s():t(Je(n,"network-request-failed"))},py(`${gy()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Sr=null,e})}let Sr=null;function f_(n){return Sr=Sr||h_(n),Sr}/**
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
 */const m_=new Ws(5e3,15e3),p_="__/auth/iframe",g_="emulator/auth/iframe",y_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},__=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function w_(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?sa(e,g_):`https://${n.config.authDomain}/${p_}`,s={apiKey:e.apiKey,appName:n.name,v:Xn},r=__.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${Hs(s).slice(1)}`}async function E_(n){const e=await f_(n),t=ot().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:w_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:y_,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const a=Je(n,"network-request-failed"),c=ot().setTimeout(()=>{i(a)},m_.get());function u(){ot().clearTimeout(c),r(s)}s.ping(u).then(u,()=>{i(a)})}))}/**
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
 */const v_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},I_=500,b_=600,T_="_blank",A_="http://localhost";class El{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function C_(n,e,t,s=I_,r=b_){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const u={...v_,width:s.toString(),height:r.toString(),top:i,left:a},d=Ne().toLowerCase();t&&(c=pd(d)?T_:t),fd(d)&&(e=e||A_,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[T,A])=>`${_}${T}=${A},`,"");if(ay(d)&&c!=="_self")return S_(e||"",c),new El(null);const p=window.open(e||"",c,f);W(p,n,"popup-blocked");try{p.focus()}catch{}return new El(p)}function S_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const R_="__/auth/handler",P_="emulator/auth/handler",k_=encodeURIComponent("fac");async function vl(n,e,t,s,r,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:Xn,eventId:r};if(e instanceof ca){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Rp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Gs){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${k_}=${encodeURIComponent(u)}`:"";return`${x_(n)}?${Hs(c).slice(1)}${d}`}function x_({config:n}){return n.emulator?sa(n,P_):`https://${n.authDomain}/${R_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const no="webStorageSupport";class L_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Pd,this._completeRedirectFn=n_,this._overrideRedirectResult=Zy}async _openPopup(e,t,s,r){var a;vt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await vl(e,t,s,Eo(),r);return C_(e,i,ua())}async _openRedirect(e,t,s,r){await this._originValidation(e);const i=await vl(e,t,s,Eo(),r);return My(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(vt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await E_(e),s=new r_(e);return t.register("authEvent",r=>(W(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(no,{type:no},r=>{var a;const i=(a=r==null?void 0:r[0])==null?void 0:a[no];i!==void 0&&t(!!i),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=l_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ed()||md()||oa()}}const D_=L_;var Il="@firebase/auth",bl="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function V_(n){zn(new pn("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=s.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:s.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:vd(n)},d=new fy(s,r,i,u);return wy(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),zn(new pn("auth-internal",e=>{const t=ci(e.getProvider("auth").getImmediate());return(s=>new N_(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),qt(Il,bl,M_(n)),qt(Il,bl,"esm2020")}/**
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
 */const B_=5*60,O_=Yu("authIdTokenMaxAge")||B_;let Tl=null;const F_=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>O_)return;const r=t==null?void 0:t.token;Tl!==r&&(Tl=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function U_(n=sd()){const e=ea(n,"auth");if(e.isInitialized())return e.getImmediate();const t=_y(n,{popupRedirectResolver:D_,persistence:[jy,la,Pd]}),s=Yu("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const a=F_(i.toString());Ry(t,a,()=>a(t.currentUser)),Sy(t,c=>a(c))}}const r=Qu("auth");return r&&Ey(t,`http://${r}`),t}function z_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}my({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=Je("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",z_().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});V_("Browser");var Al=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var jt,Bd;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function w(){}w.prototype=g.prototype,E.F=g.prototype,E.prototype=new w,E.prototype.constructor=E,E.D=function(b,v,S){for(var I=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)I[fe-2]=arguments[fe];return g.prototype[v].apply(b,I)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(E,g,w){w||(w=0);const b=Array(16);if(typeof g=="string")for(var v=0;v<16;++v)b[v]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(v=0;v<16;++v)b[v]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=E.g[0],w=E.g[1],v=E.g[2];let S=E.g[3],I;I=g+(S^w&(v^S))+b[0]+3614090360&4294967295,g=w+(I<<7&4294967295|I>>>25),I=S+(v^g&(w^v))+b[1]+3905402710&4294967295,S=g+(I<<12&4294967295|I>>>20),I=v+(w^S&(g^w))+b[2]+606105819&4294967295,v=S+(I<<17&4294967295|I>>>15),I=w+(g^v&(S^g))+b[3]+3250441966&4294967295,w=v+(I<<22&4294967295|I>>>10),I=g+(S^w&(v^S))+b[4]+4118548399&4294967295,g=w+(I<<7&4294967295|I>>>25),I=S+(v^g&(w^v))+b[5]+1200080426&4294967295,S=g+(I<<12&4294967295|I>>>20),I=v+(w^S&(g^w))+b[6]+2821735955&4294967295,v=S+(I<<17&4294967295|I>>>15),I=w+(g^v&(S^g))+b[7]+4249261313&4294967295,w=v+(I<<22&4294967295|I>>>10),I=g+(S^w&(v^S))+b[8]+1770035416&4294967295,g=w+(I<<7&4294967295|I>>>25),I=S+(v^g&(w^v))+b[9]+2336552879&4294967295,S=g+(I<<12&4294967295|I>>>20),I=v+(w^S&(g^w))+b[10]+4294925233&4294967295,v=S+(I<<17&4294967295|I>>>15),I=w+(g^v&(S^g))+b[11]+2304563134&4294967295,w=v+(I<<22&4294967295|I>>>10),I=g+(S^w&(v^S))+b[12]+1804603682&4294967295,g=w+(I<<7&4294967295|I>>>25),I=S+(v^g&(w^v))+b[13]+4254626195&4294967295,S=g+(I<<12&4294967295|I>>>20),I=v+(w^S&(g^w))+b[14]+2792965006&4294967295,v=S+(I<<17&4294967295|I>>>15),I=w+(g^v&(S^g))+b[15]+1236535329&4294967295,w=v+(I<<22&4294967295|I>>>10),I=g+(v^S&(w^v))+b[1]+4129170786&4294967295,g=w+(I<<5&4294967295|I>>>27),I=S+(w^v&(g^w))+b[6]+3225465664&4294967295,S=g+(I<<9&4294967295|I>>>23),I=v+(g^w&(S^g))+b[11]+643717713&4294967295,v=S+(I<<14&4294967295|I>>>18),I=w+(S^g&(v^S))+b[0]+3921069994&4294967295,w=v+(I<<20&4294967295|I>>>12),I=g+(v^S&(w^v))+b[5]+3593408605&4294967295,g=w+(I<<5&4294967295|I>>>27),I=S+(w^v&(g^w))+b[10]+38016083&4294967295,S=g+(I<<9&4294967295|I>>>23),I=v+(g^w&(S^g))+b[15]+3634488961&4294967295,v=S+(I<<14&4294967295|I>>>18),I=w+(S^g&(v^S))+b[4]+3889429448&4294967295,w=v+(I<<20&4294967295|I>>>12),I=g+(v^S&(w^v))+b[9]+568446438&4294967295,g=w+(I<<5&4294967295|I>>>27),I=S+(w^v&(g^w))+b[14]+3275163606&4294967295,S=g+(I<<9&4294967295|I>>>23),I=v+(g^w&(S^g))+b[3]+4107603335&4294967295,v=S+(I<<14&4294967295|I>>>18),I=w+(S^g&(v^S))+b[8]+1163531501&4294967295,w=v+(I<<20&4294967295|I>>>12),I=g+(v^S&(w^v))+b[13]+2850285829&4294967295,g=w+(I<<5&4294967295|I>>>27),I=S+(w^v&(g^w))+b[2]+4243563512&4294967295,S=g+(I<<9&4294967295|I>>>23),I=v+(g^w&(S^g))+b[7]+1735328473&4294967295,v=S+(I<<14&4294967295|I>>>18),I=w+(S^g&(v^S))+b[12]+2368359562&4294967295,w=v+(I<<20&4294967295|I>>>12),I=g+(w^v^S)+b[5]+4294588738&4294967295,g=w+(I<<4&4294967295|I>>>28),I=S+(g^w^v)+b[8]+2272392833&4294967295,S=g+(I<<11&4294967295|I>>>21),I=v+(S^g^w)+b[11]+1839030562&4294967295,v=S+(I<<16&4294967295|I>>>16),I=w+(v^S^g)+b[14]+4259657740&4294967295,w=v+(I<<23&4294967295|I>>>9),I=g+(w^v^S)+b[1]+2763975236&4294967295,g=w+(I<<4&4294967295|I>>>28),I=S+(g^w^v)+b[4]+1272893353&4294967295,S=g+(I<<11&4294967295|I>>>21),I=v+(S^g^w)+b[7]+4139469664&4294967295,v=S+(I<<16&4294967295|I>>>16),I=w+(v^S^g)+b[10]+3200236656&4294967295,w=v+(I<<23&4294967295|I>>>9),I=g+(w^v^S)+b[13]+681279174&4294967295,g=w+(I<<4&4294967295|I>>>28),I=S+(g^w^v)+b[0]+3936430074&4294967295,S=g+(I<<11&4294967295|I>>>21),I=v+(S^g^w)+b[3]+3572445317&4294967295,v=S+(I<<16&4294967295|I>>>16),I=w+(v^S^g)+b[6]+76029189&4294967295,w=v+(I<<23&4294967295|I>>>9),I=g+(w^v^S)+b[9]+3654602809&4294967295,g=w+(I<<4&4294967295|I>>>28),I=S+(g^w^v)+b[12]+3873151461&4294967295,S=g+(I<<11&4294967295|I>>>21),I=v+(S^g^w)+b[15]+530742520&4294967295,v=S+(I<<16&4294967295|I>>>16),I=w+(v^S^g)+b[2]+3299628645&4294967295,w=v+(I<<23&4294967295|I>>>9),I=g+(v^(w|~S))+b[0]+4096336452&4294967295,g=w+(I<<6&4294967295|I>>>26),I=S+(w^(g|~v))+b[7]+1126891415&4294967295,S=g+(I<<10&4294967295|I>>>22),I=v+(g^(S|~w))+b[14]+2878612391&4294967295,v=S+(I<<15&4294967295|I>>>17),I=w+(S^(v|~g))+b[5]+4237533241&4294967295,w=v+(I<<21&4294967295|I>>>11),I=g+(v^(w|~S))+b[12]+1700485571&4294967295,g=w+(I<<6&4294967295|I>>>26),I=S+(w^(g|~v))+b[3]+2399980690&4294967295,S=g+(I<<10&4294967295|I>>>22),I=v+(g^(S|~w))+b[10]+4293915773&4294967295,v=S+(I<<15&4294967295|I>>>17),I=w+(S^(v|~g))+b[1]+2240044497&4294967295,w=v+(I<<21&4294967295|I>>>11),I=g+(v^(w|~S))+b[8]+1873313359&4294967295,g=w+(I<<6&4294967295|I>>>26),I=S+(w^(g|~v))+b[15]+4264355552&4294967295,S=g+(I<<10&4294967295|I>>>22),I=v+(g^(S|~w))+b[6]+2734768916&4294967295,v=S+(I<<15&4294967295|I>>>17),I=w+(S^(v|~g))+b[13]+1309151649&4294967295,w=v+(I<<21&4294967295|I>>>11),I=g+(v^(w|~S))+b[4]+4149444226&4294967295,g=w+(I<<6&4294967295|I>>>26),I=S+(w^(g|~v))+b[11]+3174756917&4294967295,S=g+(I<<10&4294967295|I>>>22),I=v+(g^(S|~w))+b[2]+718787259&4294967295,v=S+(I<<15&4294967295|I>>>17),I=w+(S^(v|~g))+b[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(v+(I<<21&4294967295|I>>>11))&4294967295,E.g[2]=E.g[2]+v&4294967295,E.g[3]=E.g[3]+S&4294967295}s.prototype.v=function(E,g){g===void 0&&(g=E.length);const w=g-this.blockSize,b=this.C;let v=this.h,S=0;for(;S<g;){if(v==0)for(;S<=w;)r(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<g;)if(b[v++]=E.charCodeAt(S++),v==this.blockSize){r(this,b),v=0;break}}else for(;S<g;)if(b[v++]=E[S++],v==this.blockSize){r(this,b),v=0;break}}this.h=v,this.o+=g},s.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var w=E.length-8;w<E.length;++w)E[w]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,w=0;w<4;++w)for(let b=0;b<32;b+=8)E[g++]=this.g[w]>>>b&255;return E};function i(E,g){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=g(E)}function a(E,g){this.h=g;const w=[];let b=!0;for(let v=E.length-1;v>=0;v--){const S=E[v]|0;b&&S==g||(w[v]=S,b=!1)}this.g=w}var c={};function u(E){return-128<=E&&E<128?i(E,function(g){return new a([g|0],g<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return C(d(-E));const g=[];let w=1;for(let b=0;E>=w;b++)g[b]=E/w|0,w*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return C(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=d(Math.pow(g,8));let b=p;for(let S=0;S<E.length;S+=8){var v=Math.min(8,E.length-S);const I=parseInt(E.substring(S,S+v),g);v<8?(v=d(Math.pow(g,v)),b=b.j(v).add(d(I))):(b=b.j(w),b=b.add(d(I)))}return b}var p=u(0),_=u(1),T=u(16777216);n=a.prototype,n.m=function(){if(R(this))return-C(this).m();let E=0,g=1;for(let w=0;w<this.g.length;w++){const b=this.i(w);E+=(b>=0?b:4294967296+b)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(A(this))return"0";if(R(this))return"-"+C(this).toString(E);const g=d(Math.pow(E,6));var w=this;let b="";for(;;){const v=U(w,g).g;w=x(w,v.j(g));let S=((w.g.length>0?w.g[0]:w.h)>>>0).toString(E);if(w=v,A(w))return S+b;for(;S.length<6;)S="0"+S;b=S+b}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function A(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function R(E){return E.h==-1}n.l=function(E){return E=x(this,E),R(E)?-1:A(E)?0:1};function C(E){const g=E.g.length,w=[];for(let b=0;b<g;b++)w[b]=~E.g[b];return new a(w,~E.h).add(_)}n.abs=function(){return R(this)?C(this):this},n.add=function(E){const g=Math.max(this.g.length,E.g.length),w=[];let b=0;for(let v=0;v<=g;v++){let S=b+(this.i(v)&65535)+(E.i(v)&65535),I=(S>>>16)+(this.i(v)>>>16)+(E.i(v)>>>16);b=I>>>16,S&=65535,I&=65535,w[v]=I<<16|S}return new a(w,w[w.length-1]&-2147483648?-1:0)};function x(E,g){return E.add(C(g))}n.j=function(E){if(A(this)||A(E))return p;if(R(this))return R(E)?C(this).j(C(E)):C(C(this).j(E));if(R(E))return C(this.j(C(E)));if(this.l(T)<0&&E.l(T)<0)return d(this.m()*E.m());const g=this.g.length+E.g.length,w=[];for(var b=0;b<2*g;b++)w[b]=0;for(b=0;b<this.g.length;b++)for(let v=0;v<E.g.length;v++){const S=this.i(b)>>>16,I=this.i(b)&65535,fe=E.i(v)>>>16,$e=E.i(v)&65535;w[2*b+2*v]+=I*$e,D(w,2*b+2*v),w[2*b+2*v+1]+=S*$e,D(w,2*b+2*v+1),w[2*b+2*v+1]+=I*fe,D(w,2*b+2*v+1),w[2*b+2*v+2]+=S*fe,D(w,2*b+2*v+2)}for(E=0;E<g;E++)w[E]=w[2*E+1]<<16|w[2*E];for(E=g;E<2*g;E++)w[E]=0;return new a(w,0)};function D(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function V(E,g){this.g=E,this.h=g}function U(E,g){if(A(g))throw Error("division by zero");if(A(E))return new V(p,p);if(R(E))return g=U(C(E),g),new V(C(g.g),C(g.h));if(R(g))return g=U(E,C(g)),new V(C(g.g),g.h);if(E.g.length>30){if(R(E)||R(g))throw Error("slowDivide_ only works with positive integers.");for(var w=_,b=g;b.l(E)<=0;)w=B(w),b=B(b);var v=O(w,1),S=O(b,1);for(b=O(b,2),w=O(w,2);!A(b);){var I=S.add(b);I.l(E)<=0&&(v=v.add(w),S=I),b=O(b,1),w=O(w,1)}return g=x(E,v.j(g)),new V(v,g)}for(v=p;E.l(g)>=0;){for(w=Math.max(1,Math.floor(E.m()/g.m())),b=Math.ceil(Math.log(w)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),S=d(w),I=S.j(g);R(I)||I.l(E)>0;)w-=b,S=d(w),I=S.j(g);A(S)&&(S=_),v=v.add(S),E=x(E,I)}return new V(v,E)}n.B=function(E){return U(this,E).h},n.and=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)&E.i(b);return new a(w,this.h&E.h)},n.or=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)|E.i(b);return new a(w,this.h|E.h)},n.xor=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let b=0;b<g;b++)w[b]=this.i(b)^E.i(b);return new a(w,this.h^E.h)};function B(E){const g=E.g.length+1,w=[];for(let b=0;b<g;b++)w[b]=E.i(b)<<1|E.i(b-1)>>>31;return new a(w,E.h)}function O(E,g){const w=g>>5;g%=32;const b=E.g.length-w,v=[];for(let S=0;S<b;S++)v[S]=g>0?E.i(S+w)>>>g|E.i(S+w+1)<<32-g:E.i(S+w);return new a(v,E.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,Bd=s,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,jt=a}).apply(typeof Al<"u"?Al:typeof self<"u"?self:typeof window<"u"?window:{});var yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Od,bs,Fd,Rr,bo,Ud,zd,$d;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof yr=="object"&&yr];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var s=t(this);function r(o,l){if(l)e:{var h=s;o=o.split(".");for(var y=0;y<o.length-1;y++){var P=o[y];if(!(P in h))break e;h=h[P]}o=o[o.length-1],y=h[o],l=l(y),l!=y&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}r("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(o){return o||function(l){var h=[],y;for(y in l)Object.prototype.hasOwnProperty.call(l,y)&&h.push([y,l[y]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var y=h.slice();return y.push.apply(y,arguments),o.apply(this,y)}}function p(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(y,P,k){for(var F=Array(arguments.length-2),X=2;X<arguments.length;X++)F[X-2]=arguments[X];return l.prototype[P].apply(y,F)}}var _=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function T(o){const l=o.length;if(l>0){const h=Array(l);for(let y=0;y<l;y++)h[y]=o[y];return h}return[]}function A(o,l){for(let y=1;y<arguments.length;y++){const P=arguments[y];var h=typeof P;if(h=h!="object"?h:P?Array.isArray(P)?"array":h:"null",h=="array"||h=="object"&&typeof P.length=="number"){h=o.length||0;const k=P.length||0;o.length=h+k;for(let F=0;F<k;F++)o[h+F]=P[F]}else o.push(P)}}class R{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function C(o){a.setTimeout(()=>{throw o},0)}function x(){var o=E;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class D{constructor(){this.h=this.g=null}add(l,h){const y=V.get();y.set(l,h),this.h?this.h.next=y:this.g=y,this.h=y}}var V=new R(()=>new U,o=>o.reset());class U{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let B,O=!1,E=new D,g=()=>{const o=Promise.resolve(void 0);B=()=>{o.then(w)}};function w(){for(var o;o=x();){try{o.h.call(o.g)}catch(h){C(h)}var l=V;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}O=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function v(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}v.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o}();function I(o){return/^[\s\xa0]*$/.test(o)}function fe(o,l){v.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}p(fe,v),fe.prototype.init=function(o,l){const h=this.type=o.type,y=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&fe.Z.h.call(this)},fe.prototype.h=function(){fe.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var $e="closure_listenable_"+(Math.random()*1e6|0),j=0;function le(o,l,h,y,P){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!y,this.ha=P,this.key=++j,this.da=this.fa=!1}function ae(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function re(o,l,h){for(const y in o)l.call(h,o[y],y,o)}function de(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function et(o){const l={};for(const h in o)l[h]=o[h];return l}const tt="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Se(o,l){let h,y;for(let P=1;P<arguments.length;P++){y=arguments[P];for(h in y)o[h]=y[h];for(let k=0;k<tt.length;k++)h=tt[k],Object.prototype.hasOwnProperty.call(y,h)&&(o[h]=y[h])}}function Ct(o){this.src=o,this.g={},this.h=0}Ct.prototype.add=function(o,l,h,y,P){const k=o.toString();o=this.g[k],o||(o=this.g[k]=[],this.h++);const F=me(o,l,y,P);return F>-1?(l=o[F],h||(l.fa=!1)):(l=new le(l,this.src,k,!!y,P),l.fa=h,o.push(l)),l};function mt(o,l){const h=l.type;if(h in o.g){var y=o.g[h],P=Array.prototype.indexOf.call(y,l,void 0),k;(k=P>=0)&&Array.prototype.splice.call(y,P,1),k&&(ae(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function me(o,l,h,y){for(let P=0;P<o.length;++P){const k=o[P];if(!k.da&&k.listener==l&&k.capture==!!h&&k.ha==y)return P}return-1}var St="closure_lm_"+(Math.random()*1e6|0),Rt={};function ss(o,l,h,y,P){if(Array.isArray(l)){for(let k=0;k<l.length;k++)ss(o,l[k],h,y,P);return null}return h=Ya(h),o&&o[$e]?o.J(l,h,c(y)?!!y.capture:!1,P):Tn(o,l,h,!1,y,P)}function Tn(o,l,h,y,P,k){if(!l)throw Error("Invalid event type");const F=c(P)?!!P.capture:!!P;let X=Ri(o);if(X||(o[St]=X=new Ct(o)),h=X.add(l,h,y,F,k),h.proxy)return h;if(y=Ff(),h.proxy=y,y.src=o,y.listener=h,o.addEventListener)S||(P=F),P===void 0&&(P=!1),o.addEventListener(l.toString(),y,P);else if(o.attachEvent)o.attachEvent(Xa(l.toString()),y);else if(o.addListener&&o.removeListener)o.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Ff(){function o(h){return l.call(o.src,o.listener,h)}const l=Uf;return o}function Qa(o,l,h,y,P){if(Array.isArray(l))for(var k=0;k<l.length;k++)Qa(o,l[k],h,y,P);else y=c(y)?!!y.capture:!!y,h=Ya(h),o&&o[$e]?(o=o.i,k=String(l).toString(),k in o.g&&(l=o.g[k],h=me(l,h,y,P),h>-1&&(ae(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[k],o.h--)))):o&&(o=Ri(o))&&(l=o.g[l.toString()],o=-1,l&&(o=me(l,h,y,P)),(h=o>-1?l[o]:null)&&Si(h))}function Si(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[$e])mt(l.i,o);else{var h=o.type,y=o.proxy;l.removeEventListener?l.removeEventListener(h,y,o.capture):l.detachEvent?l.detachEvent(Xa(h),y):l.addListener&&l.removeListener&&l.removeListener(y),(h=Ri(l))?(mt(h,o),h.h==0&&(h.src=null,l[St]=null)):ae(o)}}}function Xa(o){return o in Rt?Rt[o]:Rt[o]="on"+o}function Uf(o,l){if(o.da)o=!0;else{l=new fe(l,this);const h=o.listener,y=o.ha||o.src;o.fa&&Si(o),o=h.call(y,l)}return o}function Ri(o){return o=o[St],o instanceof Ct?o:null}var Pi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ya(o){return typeof o=="function"?o:(o[Pi]||(o[Pi]=function(l){return o.handleEvent(l)}),o[Pi])}function Re(){b.call(this),this.i=new Ct(this),this.M=this,this.G=null}p(Re,b),Re.prototype[$e]=!0,Re.prototype.removeEventListener=function(o,l,h,y){Qa(this,o,l,h,y)};function Me(o,l){var h,y=o.G;if(y)for(h=[];y;y=y.G)h.push(y);if(o=o.M,y=l.type||l,typeof l=="string")l=new v(l,o);else if(l instanceof v)l.target=l.target||o;else{var P=l;l=new v(y,o),Se(l,P)}P=!0;let k,F;if(h)for(F=h.length-1;F>=0;F--)k=l.g=h[F],P=sr(k,y,!0,l)&&P;if(k=l.g=o,P=sr(k,y,!0,l)&&P,P=sr(k,y,!1,l)&&P,h)for(F=0;F<h.length;F++)k=l.g=h[F],P=sr(k,y,!1,l)&&P}Re.prototype.N=function(){if(Re.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let y=0;y<h.length;y++)ae(h[y]);delete o.g[l],o.h--}}this.G=null},Re.prototype.J=function(o,l,h,y){return this.i.add(String(o),l,!1,h,y)},Re.prototype.K=function(o,l,h,y){return this.i.add(String(o),l,!0,h,y)};function sr(o,l,h,y){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let P=!0;for(let k=0;k<l.length;++k){const F=l[k];if(F&&!F.da&&F.capture==h){const X=F.listener,Ee=F.ha||F.src;F.fa&&mt(o.i,F),P=X.call(Ee,y)!==!1&&P}}return P&&!y.defaultPrevented}function zf(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Ja(o){o.g=zf(()=>{o.g=null,o.i&&(o.i=!1,Ja(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class $f extends b{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Ja(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function rs(o){b.call(this),this.h=o,this.g={}}p(rs,b);var Za=[];function ec(o){re(o.g,function(l,h){this.g.hasOwnProperty(h)&&Si(l)},o),o.g={}}rs.prototype.N=function(){rs.Z.N.call(this),ec(this)},rs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ki=a.JSON.stringify,qf=a.JSON.parse,jf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function tc(){}function nc(){}var is={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function xi(){v.call(this,"d")}p(xi,v);function Li(){v.call(this,"c")}p(Li,v);var Zt={},sc=null;function rr(){return sc=sc||new Re}Zt.Ia="serverreachability";function rc(o){v.call(this,Zt.Ia,o)}p(rc,v);function os(o){const l=rr();Me(l,new rc(l))}Zt.STAT_EVENT="statevent";function ic(o,l){v.call(this,Zt.STAT_EVENT,o),this.stat=l}p(ic,v);function Ve(o){const l=rr();Me(l,new ic(l,o))}Zt.Ja="timingevent";function oc(o,l){v.call(this,Zt.Ja,o),this.size=l}p(oc,v);function as(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function cs(){this.g=!0}cs.prototype.ua=function(){this.g=!1};function Hf(o,l,h,y,P,k){o.info(function(){if(o.g)if(k){var F="",X=k.split("&");for(let ne=0;ne<X.length;ne++){var Ee=X[ne].split("=");if(Ee.length>1){const Ie=Ee[0];Ee=Ee[1];const st=Ie.split("_");F=st.length>=2&&st[1]=="type"?F+(Ie+"="+Ee+"&"):F+(Ie+"=redacted&")}}}else F=null;else F=k;return"XMLHTTP REQ ("+y+") [attempt "+P+"]: "+l+`
`+h+`
`+F})}function Wf(o,l,h,y,P,k,F){o.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+P+"]: "+l+`
`+h+`
`+k+" "+F})}function An(o,l,h,y){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Kf(o,h)+(y?" "+y:"")})}function Gf(o,l){o.info(function(){return"TIMEOUT: "+l})}cs.prototype.info=function(){};function Kf(o,l){if(!o.g)return l;if(!l)return null;try{const k=JSON.parse(l);if(k){for(o=0;o<k.length;o++)if(Array.isArray(k[o])){var h=k[o];if(!(h.length<2)){var y=h[1];if(Array.isArray(y)&&!(y.length<1)){var P=y[0];if(P!="noop"&&P!="stop"&&P!="close")for(let F=1;F<y.length;F++)y[F]=""}}}}return ki(k)}catch{return l}}var ir={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ac={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cc;function Di(){}p(Di,tc),Di.prototype.g=function(){return new XMLHttpRequest},cc=new Di;function ls(o){return encodeURIComponent(String(o))}function Qf(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function Pt(o,l,h,y){this.j=o,this.i=l,this.l=h,this.S=y||1,this.V=new rs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new lc}function lc(){this.i=null,this.g="",this.h=!1}var uc={},Ni={};function Mi(o,l,h){o.M=1,o.A=ar(nt(l)),o.u=h,o.R=!0,dc(o,null)}function dc(o,l){o.F=Date.now(),or(o),o.B=nt(o.A);var h=o.B,y=o.S;Array.isArray(y)||(y=[String(y)]),Tc(h.i,"t",y),o.C=0,h=o.j.L,o.h=new lc,o.g=$c(o.j,h?l:null,!o.u),o.P>0&&(o.O=new $f(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,y=o.ba;var P="readystatechange";Array.isArray(P)||(P&&(Za[0]=P.toString()),P=Za);for(let k=0;k<P.length;k++){const F=ss(h,P[k],y||l.handleEvent,!1,l.h||l);if(!F)break;l.g[F.key]=F}l=o.J?et(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),os(),Hf(o.i,o.v,o.B,o.l,o.S,o.u)}Pt.prototype.ba=function(o){o=o.target;const l=this.O;l&&Lt(o)==3?l.j():this.Y(o)},Pt.prototype.Y=function(o){try{if(o==this.g)e:{const X=Lt(this.g),Ee=this.g.ya(),ne=this.g.ca();if(!(X<3)&&(X!=3||this.g&&(this.h.h||this.g.la()||xc(this.g)))){this.K||X!=4||Ee==7||(Ee==8||ne<=0?os(3):os(2)),Vi(this);var l=this.g.ca();this.X=l;var h=Xf(this);if(this.o=l==200,Wf(this.i,this.v,this.B,this.l,this.S,X,l),this.o){if(this.U&&!this.L){t:{if(this.g){var y,P=this.g;if((y=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(y)){var k=y;break t}}k=null}if(o=k)An(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Bi(this,o);else{this.o=!1,this.m=3,Ve(12),en(this),us(this);break e}}if(this.R){o=!0;let Ie;for(;!this.K&&this.C<h.length;)if(Ie=Yf(this,h),Ie==Ni){X==4&&(this.m=4,Ve(14),o=!1),An(this.i,this.l,null,"[Incomplete Response]");break}else if(Ie==uc){this.m=4,Ve(15),An(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else An(this.i,this.l,Ie,null),Bi(this,Ie);if(hc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),X!=4||h.length!=0||this.h.h||(this.m=1,Ve(16),o=!1),this.o=this.o&&o,!o)An(this.i,this.l,h,"[Invalid Chunked Response]"),en(this),us(this);else if(h.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Hi(F),F.P=!0,Ve(11))}}else An(this.i,this.l,h,null),Bi(this,h);X==4&&en(this),this.o&&!this.K&&(X==4?Oc(this.j,this):(this.o=!1,or(this)))}else dm(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ve(12)):(this.m=0,Ve(13)),en(this),us(this)}}}catch{}finally{}};function Xf(o){if(!hc(o))return o.g.la();const l=xc(o.g);if(l==="")return"";let h="";const y=l.length,P=Lt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return en(o),us(o),"";o.h.i=new a.TextDecoder}for(let k=0;k<y;k++)o.h.h=!0,h+=o.h.i.decode(l[k],{stream:!(P&&k==y-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function hc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Yf(o,l){var h=o.C,y=l.indexOf(`
`,h);return y==-1?Ni:(h=Number(l.substring(h,y)),isNaN(h)?uc:(y+=1,y+h>l.length?Ni:(l=l.slice(y,y+h),o.C=y+h,l)))}Pt.prototype.cancel=function(){this.K=!0,en(this)};function or(o){o.T=Date.now()+o.H,fc(o,o.H)}function fc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=as(d(o.aa,o),l)}function Vi(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Pt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Gf(this.i,this.B),this.M!=2&&(os(),Ve(17)),en(this),this.m=2,us(this)):fc(this,this.T-o)};function us(o){o.j.I==0||o.K||Oc(o.j,o)}function en(o){Vi(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,ec(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function Bi(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||Oi(h.h,o))){if(!o.L&&Oi(h.h,o)&&h.I==3){try{var y=h.Ba.g.parse(l)}catch{y=null}if(Array.isArray(y)&&y.length==3){var P=y;if(P[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)hr(h),ur(h);else break e;ji(h),Ve(18)}}else h.xa=P[1],0<h.xa-h.K&&P[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=as(d(h.Va,h),6e3));gc(h.h)<=1&&h.ta&&(h.ta=void 0)}else nn(h,11)}else if((o.L||h.g==o)&&hr(h),!I(l))for(P=h.Ba.g.parse(l),l=0;l<P.length;l++){let ne=P[l];const Ie=ne[0];if(!(Ie<=h.K))if(h.K=Ie,ne=ne[1],h.I==2)if(ne[0]=="c"){h.M=ne[1],h.ba=ne[2];const st=ne[3];st!=null&&(h.ka=st,h.j.info("VER="+h.ka));const sn=ne[4];sn!=null&&(h.za=sn,h.j.info("SVER="+h.za));const Dt=ne[5];Dt!=null&&typeof Dt=="number"&&Dt>0&&(y=1.5*Dt,h.O=y,h.j.info("backChannelRequestTimeoutMs_="+y)),y=h;const Nt=o.g;if(Nt){const mr=Nt.g?Nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(mr){var k=y.h;k.g||mr.indexOf("spdy")==-1&&mr.indexOf("quic")==-1&&mr.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(Fi(k,k.h),k.h=null))}if(y.G){const Wi=Nt.g?Nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Wi&&(y.wa=Wi,ie(y.J,y.G,Wi))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),y=h;var F=o;if(y.na=zc(y,y.L?y.ba:null,y.W),F.L){yc(y.h,F);var X=F,Ee=y.O;Ee&&(X.H=Ee),X.D&&(Vi(X),or(X)),y.g=F}else Vc(y);h.i.length>0&&dr(h)}else ne[0]!="stop"&&ne[0]!="close"||nn(h,7);else h.I==3&&(ne[0]=="stop"||ne[0]=="close"?ne[0]=="stop"?nn(h,7):qi(h):ne[0]!="noop"&&h.l&&h.l.qa(ne),h.A=0)}}os(4)}catch{}}var Jf=class{constructor(o,l){this.g=o,this.map=l}};function mc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function pc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function gc(o){return o.h?1:o.g?o.g.size:0}function Oi(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Fi(o,l){o.g?o.g.add(l):o.h=l}function yc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}mc.prototype.cancel=function(){if(this.i=_c(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function _c(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return T(o.i)}var wc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zf(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const y=o[h].indexOf("=");let P,k=null;y>=0?(P=o[h].substring(0,y),k=o[h].substring(y+1)):P=o[h],l(P,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function kt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof kt?(this.l=o.l,ds(this,o.j),this.o=o.o,this.g=o.g,hs(this,o.u),this.h=o.h,Ui(this,Ac(o.i)),this.m=o.m):o&&(l=String(o).match(wc))?(this.l=!1,ds(this,l[1]||"",!0),this.o=fs(l[2]||""),this.g=fs(l[3]||"",!0),hs(this,l[4]),this.h=fs(l[5]||"",!0),Ui(this,l[6]||"",!0),this.m=fs(l[7]||"")):(this.l=!1,this.i=new ps(null,this.l))}kt.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(ms(l,Ec,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(ms(l,Ec,!0),"@"),o.push(ls(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(ms(h,h.charAt(0)=="/"?nm:tm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",ms(h,rm)),o.join("")},kt.prototype.resolve=function(o){const l=nt(this);let h=!!o.j;h?ds(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var y=o.h;if(h)hs(l,o.u);else if(h=!!o.h){if(y.charAt(0)!="/")if(this.g&&!this.h)y="/"+y;else{var P=l.h.lastIndexOf("/");P!=-1&&(y=l.h.slice(0,P+1)+y)}if(P=y,P==".."||P==".")y="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){y=P.lastIndexOf("/",0)==0,P=P.split("/");const k=[];for(let F=0;F<P.length;){const X=P[F++];X=="."?y&&F==P.length&&k.push(""):X==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),y&&F==P.length&&k.push("")):(k.push(X),y=!0)}y=k.join("/")}else y=P}return h?l.h=y:h=o.i.toString()!=="",h?Ui(l,Ac(o.i)):h=!!o.m,h&&(l.m=o.m),l};function nt(o){return new kt(o)}function ds(o,l,h){o.j=h?fs(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function hs(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Ui(o,l,h){l instanceof ps?(o.i=l,im(o.i,o.l)):(h||(l=ms(l,sm)),o.i=new ps(l,o.l))}function ie(o,l,h){o.i.set(l,h)}function ar(o){return ie(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function fs(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function ms(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,em),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function em(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ec=/[#\/\?@]/g,tm=/[#\?:]/g,nm=/[#\?]/g,sm=/[#\?@]/g,rm=/#/g;function ps(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function tn(o){o.g||(o.g=new Map,o.h=0,o.i&&Zf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=ps.prototype,n.add=function(o,l){tn(this),this.i=null,o=Cn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function vc(o,l){tn(o),l=Cn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Ic(o,l){return tn(o),l=Cn(o,l),o.g.has(l)}n.forEach=function(o,l){tn(this),this.g.forEach(function(h,y){h.forEach(function(P){o.call(l,P,y,this)},this)},this)};function bc(o,l){tn(o);let h=[];if(typeof l=="string")Ic(o,l)&&(h=h.concat(o.g.get(Cn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return tn(this),this.i=null,o=Cn(this,o),Ic(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=bc(this,o),o.length>0?String(o[0]):l):l};function Tc(o,l,h){vc(o,l),h.length>0&&(o.i=null,o.g.set(Cn(o,l),T(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let y=0;y<l.length;y++){var h=l[y];const P=ls(h);h=bc(this,h);for(let k=0;k<h.length;k++){let F=P;h[k]!==""&&(F+="="+ls(h[k])),o.push(F)}}return this.i=o.join("&")};function Ac(o){const l=new ps;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Cn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function im(o,l){l&&!o.j&&(tn(o),o.i=null,o.g.forEach(function(h,y){const P=y.toLowerCase();y!=P&&(vc(this,y),Tc(this,P,h))},o)),o.j=l}function om(o,l){const h=new cs;if(a.Image){const y=new Image;y.onload=f(xt,h,"TestLoadImage: loaded",!0,l,y),y.onerror=f(xt,h,"TestLoadImage: error",!1,l,y),y.onabort=f(xt,h,"TestLoadImage: abort",!1,l,y),y.ontimeout=f(xt,h,"TestLoadImage: timeout",!1,l,y),a.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=o}else l(!1)}function am(o,l){const h=new cs,y=new AbortController,P=setTimeout(()=>{y.abort(),xt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:y.signal}).then(k=>{clearTimeout(P),k.ok?xt(h,"TestPingServer: ok",!0,l):xt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(P),xt(h,"TestPingServer: error",!1,l)})}function xt(o,l,h,y,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),y(h)}catch{}}function cm(){this.g=new jf}function zi(o){this.i=o.Sb||null,this.h=o.ab||!1}p(zi,tc),zi.prototype.g=function(){return new cr(this.i,this.h)};function cr(o,l){Re.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(cr,Re),n=cr.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,ys(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,gs(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,ys(this)),this.g&&(this.readyState=3,ys(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Cc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Cc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?gs(this):ys(this),this.readyState==3&&Cc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,gs(this))},n.Na=function(o){this.g&&(this.response=o,gs(this))},n.ga=function(){this.g&&gs(this)};function gs(o){o.readyState=4,o.l=null,o.j=null,o.B=null,ys(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function ys(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(cr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Sc(o){let l="";return re(o,function(h,y){l+=y,l+=":",l+=h,l+=`\r
`}),l}function $i(o,l,h){e:{for(y in h){var y=!1;break e}y=!0}y||(h=Sc(h),typeof o=="string"?h!=null&&ls(h):ie(o,l,h))}function ue(o){Re.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ue,Re);var lm=/^https?$/i,um=["POST","PUT"];n=ue.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cc.g(),this.g.onreadystatechange=_(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(k){Rc(this,k);return}if(o=h||"",h=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var P in y)h.set(P,y[P]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const k of y.keys())h.set(k,y.get(k));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(h.keys()).find(k=>k.toLowerCase()=="content-type"),P=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(um,l,void 0)>=0)||y||P||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,F]of h)this.g.setRequestHeader(k,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(k){Rc(this,k)}};function Rc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,Pc(o),lr(o)}function Pc(o){o.A||(o.A=!0,Me(o,"complete"),Me(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Me(this,"complete"),Me(this,"abort"),lr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),lr(this,!0)),ue.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?kc(this):this.Xa())},n.Xa=function(){kc(this)};function kc(o){if(o.h&&typeof i<"u"){if(o.v&&Lt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Me(o,"readystatechange"),Lt(o)==4){o.h=!1;try{const k=o.ca();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var y;if(y=k===0){let F=String(o.D).match(wc)[1]||null;!F&&a.self&&a.self.location&&(F=a.self.location.protocol.slice(0,-1)),y=!lm.test(F?F.toLowerCase():"")}h=y}if(h)Me(o,"complete"),Me(o,"success");else{o.o=6;try{var P=Lt(o)>2?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.ca()+"]",Pc(o)}}finally{lr(o)}}}}function lr(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||Me(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Lt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Lt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),qf(l)}};function xc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function dm(o){const l={};o=(o.g&&Lt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<o.length;y++){if(I(o[y]))continue;var h=Qf(o[y]);const P=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const k=l[P]||[];l[P]=k,k.push(h)}de(l,function(y){return y.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function _s(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Lc(o){this.za=0,this.i=[],this.j=new cs,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=_s("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=_s("baseRetryDelayMs",5e3,o),this.Za=_s("retryDelaySeedMs",1e4,o),this.Ta=_s("forwardChannelMaxRetries",2,o),this.va=_s("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new mc(o&&o.concurrentRequestLimit),this.Ba=new cm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Lc.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,y){Ve(0),this.W=o,this.H=l||{},h&&y!==void 0&&(this.H.OSID=h,this.H.OAID=y),this.F=this.X,this.J=zc(this,null,this.W),dr(this)};function qi(o){if(Dc(o),o.I==3){var l=o.V++,h=nt(o.J);if(ie(h,"SID",o.M),ie(h,"RID",l),ie(h,"TYPE","terminate"),ws(o,h),l=new Pt(o,o.j,l),l.M=2,l.A=ar(nt(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=$c(l.j,null),l.g.ea(l.A)),l.F=Date.now(),or(l)}Uc(o)}function ur(o){o.g&&(Hi(o),o.g.cancel(),o.g=null)}function Dc(o){ur(o),o.v&&(a.clearTimeout(o.v),o.v=null),hr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function dr(o){if(!pc(o.h)&&!o.m){o.m=!0;var l=o.Ea;B||g(),O||(B(),O=!0),E.add(l,o),o.D=0}}function hm(o,l){return gc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=as(d(o.Ea,o,l),Fc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const P=new Pt(this,this.j,o);let k=this.o;if(this.U&&(k?(k=et(k),Se(k,this.U)):k=this.U),this.u!==null||this.R||(P.J=k,k=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var y=this.i[h];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(l+=y,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Mc(this,P,l),h=nt(this.J),ie(h,"RID",o),ie(h,"CVER",22),this.G&&ie(h,"X-HTTP-Session-Id",this.G),ws(this,h),k&&(this.R?l="headers="+ls(Sc(k))+"&"+l:this.u&&$i(h,this.u,k)),Fi(this.h,P),this.Ra&&ie(h,"TYPE","init"),this.S?(ie(h,"$req",l),ie(h,"SID","null"),P.U=!0,Mi(P,h,null)):Mi(P,h,l),this.I=2}}else this.I==3&&(o?Nc(this,o):this.i.length==0||pc(this.h)||Nc(this))};function Nc(o,l){var h;l?h=l.l:h=o.V++;const y=nt(o.J);ie(y,"SID",o.M),ie(y,"RID",h),ie(y,"AID",o.K),ws(o,y),o.u&&o.o&&$i(y,o.u,o.o),h=new Pt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Mc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Fi(o.h,h),Mi(h,y,l)}function ws(o,l){o.H&&re(o.H,function(h,y){ie(l,y,h)}),o.l&&re({},function(h,y){ie(l,y,h)})}function Mc(o,l,h){h=Math.min(o.i.length,h);const y=o.l?d(o.l.Ka,o.l,o):null;e:{var P=o.i;let X=-1;for(;;){const Ee=["count="+h];X==-1?h>0?(X=P[0].g,Ee.push("ofs="+X)):X=0:Ee.push("ofs="+X);let ne=!0;for(let Ie=0;Ie<h;Ie++){var k=P[Ie].g;const st=P[Ie].map;if(k-=X,k<0)X=Math.max(0,P[Ie].g-100),ne=!1;else try{k="req"+k+"_"||"";try{var F=st instanceof Map?st:Object.entries(st);for(const[sn,Dt]of F){let Nt=Dt;c(Dt)&&(Nt=ki(Dt)),Ee.push(k+sn+"="+encodeURIComponent(Nt))}}catch(sn){throw Ee.push(k+"type="+encodeURIComponent("_badmap")),sn}}catch{y&&y(st)}}if(ne){F=Ee.join("&");break e}}F=void 0}return o=o.i.splice(0,h),l.G=o,F}function Vc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;B||g(),O||(B(),O=!0),E.add(l,o),o.A=0}}function ji(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=as(d(o.Da,o),Fc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Bc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=as(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ve(10),ur(this),Bc(this))};function Hi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Bc(o){o.g=new Pt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=nt(o.na);ie(l,"RID","rpc"),ie(l,"SID",o.M),ie(l,"AID",o.K),ie(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ie(l,"TO",o.ia),ie(l,"TYPE","xmlhttp"),ws(o,l),o.u&&o.o&&$i(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=ar(nt(l)),h.u=null,h.R=!0,dc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,ur(this),ji(this),Ve(19))};function hr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Oc(o,l){var h=null;if(o.g==l){hr(o),Hi(o),o.g=null;var y=2}else if(Oi(o.h,l))h=l.G,yc(o.h,l),y=1;else return;if(o.I!=0){if(l.o)if(y==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var P=o.D;y=rr(),Me(y,new oc(y,h)),dr(o)}else Vc(o);else if(P=l.m,P==3||P==0&&l.X>0||!(y==1&&hm(o,l)||y==2&&ji(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),P){case 1:nn(o,5);break;case 4:nn(o,10);break;case 3:nn(o,6);break;default:nn(o,2)}}}function Fc(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function nn(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),y=o.Ua;const P=!y;y=new kt(y||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ds(y,"https"),ar(y),P?om(y.toString(),h):am(y.toString(),h)}else Ve(2);o.I=0,o.l&&o.l.pa(l),Uc(o),Dc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ve(2)):(this.j.info("Failed to ping google.com"),Ve(1))};function Uc(o){if(o.I=0,o.ja=[],o.l){const l=_c(o.h);(l.length!=0||o.i.length!=0)&&(A(o.ja,l),A(o.ja,o.i),o.h.i.length=0,T(o.i),o.i.length=0),o.l.oa()}}function zc(o,l,h){var y=h instanceof kt?nt(h):new kt(h);if(y.g!="")l&&(y.g=l+"."+y.g),hs(y,y.u);else{var P=a.location;y=P.protocol,l=l?l+"."+P.hostname:P.hostname,P=+P.port;const k=new kt(null);y&&ds(k,y),l&&(k.g=l),P&&hs(k,P),h&&(k.h=h),y=k}return h=o.G,l=o.wa,h&&l&&ie(y,h,l),ie(y,"VER",o.ka),ws(o,y),y}function $c(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new ue(new zi({ab:h})):new ue(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function qc(){}n=qc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function fr(){}fr.prototype.g=function(o,l){return new qe(o,l)};function qe(o,l){Re.call(this),this.g=new Lc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!I(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!I(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Sn(this)}p(qe,Re),qe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},qe.prototype.close=function(){qi(this.g)},qe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=ki(o),o=h);l.i.push(new Jf(l.Ya++,o)),l.I==3&&dr(l)},qe.prototype.N=function(){this.g.l=null,delete this.j,qi(this.g),delete this.g,qe.Z.N.call(this)};function jc(o){xi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}p(jc,xi);function Hc(){Li.call(this),this.status=1}p(Hc,Li);function Sn(o){this.g=o}p(Sn,qc),Sn.prototype.ra=function(){Me(this.g,"a")},Sn.prototype.qa=function(o){Me(this.g,new jc(o))},Sn.prototype.pa=function(o){Me(this.g,new Hc)},Sn.prototype.oa=function(){Me(this.g,"b")},fr.prototype.createWebChannel=fr.prototype.g,qe.prototype.send=qe.prototype.o,qe.prototype.open=qe.prototype.m,qe.prototype.close=qe.prototype.close,$d=function(){return new fr},zd=function(){return rr()},Ud=Zt,bo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ir.NO_ERROR=0,ir.TIMEOUT=8,ir.HTTP_ERROR=6,Rr=ir,ac.COMPLETE="complete",Fd=ac,nc.EventType=is,is.OPEN="a",is.CLOSE="b",is.ERROR="c",is.MESSAGE="d",Re.prototype.listen=Re.prototype.J,bs=nc,ue.prototype.listenOnce=ue.prototype.K,ue.prototype.getLastError=ue.prototype.Ha,ue.prototype.getLastErrorCode=ue.prototype.ya,ue.prototype.getStatus=ue.prototype.ca,ue.prototype.getResponseJson=ue.prototype.La,ue.prototype.getResponseText=ue.prototype.la,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Fa,Od=ue}).apply(typeof yr<"u"?yr:typeof self<"u"?self:typeof window<"u"?window:{});const Cl="@firebase/firestore",Sl="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const yn=new Jo("@firebase/firestore");function Rn(){return yn.logLevel}function $(n,...e){if(yn.logLevel<=Y.DEBUG){const t=e.map(ha);yn.debug(`Firestore (${Jn}): ${n}`,...t)}}function It(n,...e){if(yn.logLevel<=Y.ERROR){const t=e.map(ha);yn.error(`Firestore (${Jn}): ${n}`,...t)}}function qn(n,...e){if(yn.logLevel<=Y.WARN){const t=e.map(ha);yn.warn(`Firestore (${Jn}): ${n}`,...t)}}function ha(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function H(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,qd(n,s,t)}function qd(n,e,t){let s=`FIRESTORE (${Jn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw It(s),new Error(s)}function te(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||qd(e,r,s)}function K(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class wt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class $_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ke.UNAUTHENTICATED))}shutdown(){}}class q_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class j_{constructor(e){this.t=e,this.currentUser=ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0,42304);let s=this.i;const r=u=>this.i!==s?(s=this.i,t(u)):Promise.resolve();let i=new wt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new wt,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await r(this.currentUser)})},c=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new wt)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(te(typeof s.accessToken=="string",31837,{l:s}),new jd(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string",2055,{h:e}),new ke(e)}}class H_{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=ke.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class W_{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new H_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Rl{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class G_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){te(this.o===void 0,3512);const s=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Rl(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Rl(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=K_(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<t&&(s+=e.charAt(r[i]%62))}return s}}function J(n,e){return n<e?-1:n>e?1:0}function To(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),i=e.charAt(s);if(r!==i)return so(r)===so(i)?J(r,i):so(r)?1:-1}return J(n.length,e.length)}const Q_=55296,X_=57343;function so(n){const e=n.charCodeAt(0);return e>=Q_&&e<=X_}function jn(n,e,t){return n.length===e.length&&n.every((s,r)=>t(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="__name__";class it{constructor(e,t,s){t===void 0?t=0:t>e.length&&H(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&H(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const i=it.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const s=it.isNumericId(e),r=it.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?it.extractNumericId(e).compare(it.extractNumericId(t)):To(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return jt.fromString(e.substring(4,e.length-2))}}class se extends it{construct(e,t,s){return new se(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new z(N.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(r=>r.length>0))}return new se(t)}static emptyPath(){return new se([])}}const Y_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ae extends it{construct(e,t,s){return new Ae(e,t,s)}static isValidIdentifier(e){return Y_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Pl}static keyField(){return new Ae([Pl])}static fromServerFormat(e){const t=[];let s="",r=0;const i=()=>{if(s.length===0)throw new z(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new z(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[r+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new z(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=u,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(s+=c,r++):(i(),r++)}if(i(),a)throw new z(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ae(t)}static emptyPath(){return new Ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(se.fromString(e))}static fromName(e){return new q(se.fromString(e).popFirst(5))}static empty(){return new q(se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return se.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new se(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n,e,t){if(!t)throw new z(N.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function J_(n,e,t,s){if(e===!0&&s===!0)throw new z(N.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function kl(n){if(!q.isDocumentKey(n))throw new z(N.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function xl(n){if(q.isDocumentKey(n))throw new z(N.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Wd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function di(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H(12329,{type:typeof n})}function Wt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new z(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=di(n);throw new z(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function _e(n,e){const t={typeString:n};return e&&(t.value=e),t}function Qs(n,e){if(!Wd(n))throw new z(N.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const a=n[s];if(r&&typeof a!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${s}' field to equal '${i.value}'`;break}}if(t)throw new z(N.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=-62135596800,Dl=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*Dl);return new oe(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new z(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new z(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ll)throw new z(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Dl}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Qs(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ll;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:_e("string",oe._jsonSchemaVersion),seconds:_e("number"),nanoseconds:_e("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Os=-1;function Z_(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=G.fromTimestamp(s===1e9?new oe(t+1,0):new oe(t,s));return new Gt(r,q.empty(),e)}function ew(n){return new Gt(n.readTime,n.key,Os)}class Gt{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new Gt(G.min(),q.empty(),Os)}static max(){return new Gt(G.max(),q.empty(),Os)}}function tw(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class sw{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zn(n){if(n.code!==N.FAILED_PRECONDITION||n.message!==nw)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new M((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(s,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof M?t:M.resolve(t)}catch(t){return M.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):M.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):M.reject(t)}static resolve(e){return new M((t,s)=>{t(e)})}static reject(e){return new M((t,s)=>{s(e)})}static waitFor(e){return new M((t,s)=>{let r=0,i=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++i,a&&i===r&&t()},u=>s(u))}),a=!0,i===r&&t()})}static or(e){let t=M.resolve(!1);for(const s of e)t=t.next(r=>r?M.resolve(r):s());return t}static forEach(e,t){const s=[];return e.forEach((r,i)=>{s.push(t.call(this,r,i))}),this.waitFor(s)}static mapArray(e,t){return new M((s,r)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next(f=>{a[d]=f,++c,c===i&&s(a)},f=>r(f))}})}static doWhile(e,t){return new M((s,r)=>{const i=()=>{e()===!0?t().next(()=>{i()},r):s()};i()})}}function rw(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function es(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class hi{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}hi.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-1;function fi(n){return n==null}function Gr(n){return n===0&&1/n==-1/0}function iw(n){return typeof n=="number"&&Number.isInteger(n)&&!Gr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd="";function ow(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Nl(e)),e=aw(n.get(t),e);return Nl(e)}function aw(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case Gd:t+="";break;default:t+=i}}return t}function Nl(n){return n+Gd+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ml(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function En(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Kd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||Te.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Te.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Te.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new _r(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new _r(this.root,e,this.comparator,!1)}getReverseIterator(){return new _r(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new _r(this.root,e,this.comparator,!0)}}class _r{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?s(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Te{constructor(e,t,s,r,i){this.key=e,this.value=t,this.color=s??Te.RED,this.left=r??Te.EMPTY,this.right=i??Te.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,i){return new Te(e??this.key,t??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,s),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Te.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Te.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw H(43730,{key:this.key,value:this.value});if(this.right.isRed())throw H(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw H(27949);return e+(this.isRed()?0:1)}}Te.EMPTY=null,Te.RED=!0,Te.BLACK=!1;Te.EMPTY=new class{constructor(){this.size=0}get key(){throw H(57766)}get value(){throw H(16141)}get color(){throw H(16727)}get left(){throw H(29726)}get right(){throw H(36894)}copy(e,t,s,r,i){return this}insert(e,t,s){return new Te(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vl(this.data.getIterator())}getIteratorFrom(e){return new Vl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof ve)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ve(this.comparator);return t.data=e,t}}class Vl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.fields=e,e.sort(Ae.comparator)}static empty(){return new Ye([])}unionWith(e){let t=new ve(Ae.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Ye(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return jn(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
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
 */class Qd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Qd("Invalid base64 string: "+i):i}}(e);return new Ce(t)}static fromUint8Array(e){const t=function(r){let i="";for(let a=0;a<r.length;++a)i+=String.fromCharCode(r[a]);return i}(e);return new Ce(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ce.EMPTY_BYTE_STRING=new Ce("");const cw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Kt(n){if(te(!!n,39018),typeof n=="string"){let e=0;const t=cw.exec(n);if(te(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:he(n.seconds),nanos:he(n.nanos)}}function he(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qt(n){return typeof n=="string"?Ce.fromBase64String(n):Ce.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="server_timestamp",Yd="__type__",Jd="__previous_value__",Zd="__local_write_time__";function pa(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Yd])==null?void 0:s.stringValue)===Xd}function mi(n){const e=n.mapValue.fields[Jd];return pa(e)?mi(e):e}function Fs(n){const e=Kt(n.mapValue.fields[Zd].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lw{constructor(e,t,s,r,i,a,c,u,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f}}const Kr="(default)";class Us{constructor(e,t){this.projectId=e,this.database=t||Kr}static empty(){return new Us("","")}get isDefaultDatabase(){return this.database===Kr}isEqual(e){return e instanceof Us&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="__type__",uw="__max__",wr={mapValue:{}},th="__vector__",Qr="value";function Xt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?pa(n)?4:hw(n)?9007199254740991:dw(n)?10:11:H(28295,{value:n})}function ft(n,e){if(n===e)return!0;const t=Xt(n);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Fs(n).isEqual(Fs(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const a=Kt(r.timestampValue),c=Kt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return Qt(r.bytesValue).isEqual(Qt(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return he(r.geoPointValue.latitude)===he(i.geoPointValue.latitude)&&he(r.geoPointValue.longitude)===he(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return he(r.integerValue)===he(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const a=he(r.doubleValue),c=he(i.doubleValue);return a===c?Gr(a)===Gr(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return jn(n.arrayValue.values||[],e.arrayValue.values||[],ft);case 10:case 11:return function(r,i){const a=r.mapValue.fields||{},c=i.mapValue.fields||{};if(Ml(a)!==Ml(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!ft(a[u],c[u])))return!1;return!0}(n,e);default:return H(52216,{left:n})}}function zs(n,e){return(n.values||[]).find(t=>ft(t,e))!==void 0}function Hn(n,e){if(n===e)return 0;const t=Xt(n),s=Xt(e);if(t!==s)return J(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=he(i.integerValue||i.doubleValue),u=he(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Bl(n.timestampValue,e.timestampValue);case 4:return Bl(Fs(n),Fs(e));case 5:return To(n.stringValue,e.stringValue);case 6:return function(i,a){const c=Qt(i),u=Qt(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=J(c[d],u[d]);if(f!==0)return f}return J(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=J(he(i.latitude),he(a.latitude));return c!==0?c:J(he(i.longitude),he(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ol(n.arrayValue,e.arrayValue);case 10:return function(i,a){var _,T,A,R;const c=i.fields||{},u=a.fields||{},d=(_=c[Qr])==null?void 0:_.arrayValue,f=(T=u[Qr])==null?void 0:T.arrayValue,p=J(((A=d==null?void 0:d.values)==null?void 0:A.length)||0,((R=f==null?void 0:f.values)==null?void 0:R.length)||0);return p!==0?p:Ol(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===wr.mapValue&&a===wr.mapValue)return 0;if(i===wr.mapValue)return 1;if(a===wr.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const _=To(u[p],f[p]);if(_!==0)return _;const T=Hn(c[u[p]],d[f[p]]);if(T!==0)return T}return J(u.length,f.length)}(n.mapValue,e.mapValue);default:throw H(23264,{he:t})}}function Bl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=Kt(n),s=Kt(e),r=J(t.seconds,s.seconds);return r!==0?r:J(t.nanos,s.nanos)}function Ol(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const i=Hn(t[r],s[r]);if(i)return i}return J(t.length,s.length)}function Wn(n){return Ao(n)}function Ao(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=Kt(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return q.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",r=!0;for(const i of t.values||[])r?r=!1:s+=",",s+=Ao(i);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const a of s)i?i=!1:r+=",",r+=`${a}:${Ao(t.fields[a])}`;return r+"}"}(n.mapValue):H(61005,{value:n})}function Pr(n){switch(Xt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=mi(n);return e?16+Pr(e):16;case 5:return 2*n.stringValue.length;case 6:return Qt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((r,i)=>r+Pr(i),0)}(n.arrayValue);case 10:case 11:return function(s){let r=0;return En(s.fields,(i,a)=>{r+=i.length+Pr(a)}),r}(n.mapValue);default:throw H(13486,{value:n})}}function Fl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Co(n){return!!n&&"integerValue"in n}function ga(n){return!!n&&"arrayValue"in n}function Ul(n){return!!n&&"nullValue"in n}function zl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function kr(n){return!!n&&"mapValue"in n}function dw(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[eh])==null?void 0:s.stringValue)===th}function ks(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return En(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=ks(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ks(n.arrayValue.values[t]);return e}return{...n}}function hw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===uw}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.value=e}static empty(){return new We({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!kr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ks(t)}setAll(e){let t=Ae.emptyPath(),s={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,s,r),s={},r=[],t=c.popLast()}a?s[c.lastSegment()]=ks(a):r.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,s,r)}delete(e){const t=this.field(e.popLast());kr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ft(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];kr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){En(t,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new We(ks(this.value))}}function nh(n){const e=[];return En(n.fields,(t,s)=>{const r=new Ae([t]);if(kr(s)){const i=nh(s.mapValue).fields;if(i.length===0)e.push(r);else for(const a of i)e.push(r.child(a))}else e.push(r)}),new Ye(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t,s,r,i,a,c){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new De(e,0,G.min(),G.min(),G.min(),We.empty(),0)}static newFoundDocument(e,t,s,r){return new De(e,1,t,G.min(),s,r,0)}static newNoDocument(e,t){return new De(e,2,t,G.min(),G.min(),We.empty(),0)}static newUnknownDocument(e,t){return new De(e,3,t,G.min(),G.min(),We.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=We.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=We.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof De&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new De(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Xr{constructor(e,t){this.position=e,this.inclusive=t}}function $l(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const i=e[r],a=n.position[r];if(i.field.isKeyField()?s=q.comparator(q.fromName(a.referenceValue),t.key):s=Hn(a,t.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function ql(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ft(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Yr{constructor(e,t="asc"){this.field=e,this.dir=t}}function fw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class sh{}class ye extends sh{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new pw(e,t,s):t==="array-contains"?new _w(e,s):t==="in"?new ww(e,s):t==="not-in"?new Ew(e,s):t==="array-contains-any"?new vw(e,s):new ye(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new gw(e,s):new yw(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Hn(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Hn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends sh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ze(e,t)}matches(e){return rh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function rh(n){return n.op==="and"}function ih(n){return mw(n)&&rh(n)}function mw(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function So(n){if(n instanceof ye)return n.field.canonicalString()+n.op.toString()+Wn(n.value);if(ih(n))return n.filters.map(e=>So(e)).join(",");{const e=n.filters.map(t=>So(t)).join(",");return`${n.op}(${e})`}}function oh(n,e){return n instanceof ye?function(s,r){return r instanceof ye&&s.op===r.op&&s.field.isEqual(r.field)&&ft(s.value,r.value)}(n,e):n instanceof Ze?function(s,r){return r instanceof Ze&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,a,c)=>i&&oh(a,r.filters[c]),!0):!1}(n,e):void H(19439)}function ah(n){return n instanceof ye?function(t){return`${t.field.canonicalString()} ${t.op} ${Wn(t.value)}`}(n):n instanceof Ze?function(t){return t.op.toString()+" {"+t.getFilters().map(ah).join(" ,")+"}"}(n):"Filter"}class pw extends ye{constructor(e,t,s){super(e,t,s),this.key=q.fromName(s.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class gw extends ye{constructor(e,t){super(e,"in",t),this.keys=ch("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class yw extends ye{constructor(e,t){super(e,"not-in",t),this.keys=ch("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ch(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(s=>q.fromName(s.referenceValue))}class _w extends ye{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ga(t)&&zs(t.arrayValue,this.value)}}class ww extends ye{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&zs(this.value.arrayValue,t)}}class Ew extends ye{constructor(e,t){super(e,"not-in",t)}matches(e){if(zs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!zs(this.value.arrayValue,t)}}class vw extends ye{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ga(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>zs(this.value.arrayValue,s))}}/**
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
 */class Iw{constructor(e,t=null,s=[],r=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function jl(n,e=null,t=[],s=[],r=null,i=null,a=null){return new Iw(n,e,t,s,r,i,a)}function ya(n){const e=K(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>So(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),fi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>Wn(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>Wn(s)).join(",")),e.Te=t}return e.Te}function _a(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!fw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!oh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ql(n.startAt,e.startAt)&&ql(n.endAt,e.endAt)}function Ro(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t=null,s=[],r=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function bw(n,e,t,s,r,i,a,c){return new Xs(n,e,t,s,r,i,a,c)}function wa(n){return new Xs(n)}function Hl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function lh(n){return n.collectionGroup!==null}function xs(n){const e=K(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ve(Ae.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Yr(i,s))}),t.has(Ae.keyField().canonicalString())||e.Ie.push(new Yr(Ae.keyField(),s))}return e.Ie}function at(n){const e=K(n);return e.Ee||(e.Ee=Tw(e,xs(n))),e.Ee}function Tw(n,e){if(n.limitType==="F")return jl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new Yr(r.field,i)});const t=n.endAt?new Xr(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Xr(n.startAt.position,n.startAt.inclusive):null;return jl(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Po(n,e){const t=n.filters.concat([e]);return new Xs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ko(n,e,t){return new Xs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function pi(n,e){return _a(at(n),at(e))&&n.limitType===e.limitType}function uh(n){return`${ya(at(n))}|lt:${n.limitType}`}function Pn(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(r=>ah(r)).join(", ")}]`),fi(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(r=>Wn(r)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(r=>Wn(r)).join(",")),`Target(${s})`}(at(n))}; limitType=${n.limitType})`}function gi(n,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):q.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(n,e)&&function(s,r){for(const i of xs(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(s,r){return!(s.startAt&&!function(a,c,u){const d=$l(a,c,u);return a.inclusive?d<=0:d<0}(s.startAt,xs(s),r)||s.endAt&&!function(a,c,u){const d=$l(a,c,u);return a.inclusive?d>=0:d>0}(s.endAt,xs(s),r))}(n,e)}function Aw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function dh(n){return(e,t)=>{let s=!1;for(const r of xs(n)){const i=Cw(r,e,t);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Cw(n,e,t){const s=n.field.isKeyField()?q.comparator(e.key,t.key):function(i,a,c){const u=a.data.field(i),d=c.data.field(i);return u!==null&&d!==null?Hn(u,d):H(42886)}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return H(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){En(this.inner,(t,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return Kd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=new ce(q.comparator);function bt(){return Sw}const hh=new ce(q.comparator);function Ts(...n){let e=hh;for(const t of n)e=e.insert(t.key,t);return e}function fh(n){let e=hh;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function cn(){return Ls()}function mh(){return Ls()}function Ls(){return new vn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Rw=new ce(q.comparator),Pw=new ve(q.comparator);function Z(...n){let e=Pw;for(const t of n)e=e.add(t);return e}const kw=new ve(J);function xw(){return kw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gr(e)?"-0":e}}function ph(n){return{integerValue:""+n}}function Lw(n,e){return iw(e)?ph(e):Ea(n,e)}/**
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
 */class yi{constructor(){this._=void 0}}function Dw(n,e,t){return n instanceof Jr?function(r,i){const a={fields:{[Yd]:{stringValue:Xd},[Zd]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&pa(i)&&(i=mi(i)),i&&(a.fields[Jd]=i),{mapValue:a}}(t,e):n instanceof $s?yh(n,e):n instanceof qs?_h(n,e):function(r,i){const a=gh(r,i),c=Wl(a)+Wl(r.Ae);return Co(a)&&Co(r.Ae)?ph(c):Ea(r.serializer,c)}(n,e)}function Nw(n,e,t){return n instanceof $s?yh(n,e):n instanceof qs?_h(n,e):t}function gh(n,e){return n instanceof Zr?function(s){return Co(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class Jr extends yi{}class $s extends yi{constructor(e){super(),this.elements=e}}function yh(n,e){const t=wh(e);for(const s of n.elements)t.some(r=>ft(r,s))||t.push(s);return{arrayValue:{values:t}}}class qs extends yi{constructor(e){super(),this.elements=e}}function _h(n,e){let t=wh(e);for(const s of n.elements)t=t.filter(r=>!ft(r,s));return{arrayValue:{values:t}}}class Zr extends yi{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Wl(n){return he(n.integerValue||n.doubleValue)}function wh(n){return ga(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Mw(n,e){return n.field.isEqual(e.field)&&function(s,r){return s instanceof $s&&r instanceof $s||s instanceof qs&&r instanceof qs?jn(s.elements,r.elements,ft):s instanceof Zr&&r instanceof Zr?ft(s.Ae,r.Ae):s instanceof Jr&&r instanceof Jr}(n.transform,e.transform)}class Vw{constructor(e,t){this.version=e,this.transformResults=t}}class ct{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ct}static exists(e){return new ct(void 0,e)}static updateTime(e){return new ct(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function xr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class _i{}function Eh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ih(n.key,ct.none()):new Ys(n.key,n.data,ct.none());{const t=n.data,s=We.empty();let r=new ve(Ae.comparator);for(let i of e.fields)if(!r.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?s.delete(i):s.set(i,a),r=r.add(i)}return new In(n.key,s,new Ye(r.toArray()),ct.none())}}function Bw(n,e,t){n instanceof Ys?function(r,i,a){const c=r.value.clone(),u=Kl(r.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof In?function(r,i,a){if(!xr(r.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Kl(r.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(vh(r)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(r,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Ds(n,e,t,s){return n instanceof Ys?function(i,a,c,u){if(!xr(i.precondition,a))return c;const d=i.value.clone(),f=Ql(i.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,s):n instanceof In?function(i,a,c,u){if(!xr(i.precondition,a))return c;const d=Ql(i.fieldTransforms,u,a),f=a.data;return f.setAll(vh(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(n,e,t,s):function(i,a,c){return xr(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Ow(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),i=gh(s.transform,r||null);i!=null&&(t===null&&(t=We.empty()),t.set(s.field,i))}return t||null}function Gl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&jn(s,r,(i,a)=>Mw(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ys extends _i{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class In extends _i{constructor(e,t,s,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function vh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function Kl(n,e,t){const s=new Map;te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const i=n[r],a=i.transform,c=e.data.field(i.field);s.set(i.field,Nw(a,c,t[r]))}return s}function Ql(n,e,t){const s=new Map;for(const r of n){const i=r.transform,a=t.data.field(r.field);s.set(r.field,Dw(i,a,e))}return s}class Ih extends _i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Fw extends _i{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&Bw(i,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Ds(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Ds(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=mh();return this.mutations.forEach(r=>{const i=e.get(r.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(r.key)?null:c;const u=Eh(a,c);u!==null&&s.set(r.key,u),a.isValidDocument()||a.convertToNoDocument(G.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Z())}isEqual(e){return this.batchId===e.batchId&&jn(this.mutations,e.mutations,(t,s)=>Gl(t,s))&&jn(this.baseMutations,e.baseMutations,(t,s)=>Gl(t,s))}}class va{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){te(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let r=function(){return Rw}();const i=e.mutations;for(let a=0;a<i.length;a++)r=r.insert(i[a].key,s[a].version);return new va(e,t,s,r)}}/**
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
 */class zw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class $w{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe,ee;function qw(n){switch(n){case N.OK:return H(64938);case N.CANCELLED:case N.UNKNOWN:case N.DEADLINE_EXCEEDED:case N.RESOURCE_EXHAUSTED:case N.INTERNAL:case N.UNAVAILABLE:case N.UNAUTHENTICATED:return!1;case N.INVALID_ARGUMENT:case N.NOT_FOUND:case N.ALREADY_EXISTS:case N.PERMISSION_DENIED:case N.FAILED_PRECONDITION:case N.ABORTED:case N.OUT_OF_RANGE:case N.UNIMPLEMENTED:case N.DATA_LOSS:return!0;default:return H(15467,{code:n})}}function bh(n){if(n===void 0)return It("GRPC error has no .code"),N.UNKNOWN;switch(n){case pe.OK:return N.OK;case pe.CANCELLED:return N.CANCELLED;case pe.UNKNOWN:return N.UNKNOWN;case pe.DEADLINE_EXCEEDED:return N.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return N.RESOURCE_EXHAUSTED;case pe.INTERNAL:return N.INTERNAL;case pe.UNAVAILABLE:return N.UNAVAILABLE;case pe.UNAUTHENTICATED:return N.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return N.INVALID_ARGUMENT;case pe.NOT_FOUND:return N.NOT_FOUND;case pe.ALREADY_EXISTS:return N.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return N.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return N.FAILED_PRECONDITION;case pe.ABORTED:return N.ABORTED;case pe.OUT_OF_RANGE:return N.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return N.UNIMPLEMENTED;case pe.DATA_LOSS:return N.DATA_LOSS;default:return H(39323,{code:n})}}(ee=pe||(pe={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function jw(){return new TextEncoder}/**
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
 */const Hw=new jt([4294967295,4294967295],0);function Xl(n){const e=jw().encode(n),t=new Bd;return t.update(e),new Uint8Array(t.digest())}function Yl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new jt([t,s],0),new jt([r,i],0)]}class Ia{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new As(`Invalid padding: ${t}`);if(s<0)throw new As(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new As(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new As(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=jt.fromNumber(this.ge)}ye(e,t,s){let r=e.add(t.multiply(jt.fromNumber(s)));return r.compare(Hw)===1&&(r=new jt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Xl(e),[s,r]=Yl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);if(!this.we(a))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Ia(i,r,t);return s.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=Xl(e),[s,r]=Yl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class As extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,t,s,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,Js.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new wi(G.min(),r,new ce(J),bt(),Z())}}class Js{constructor(e,t,s,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Js(s,t,Z(),Z(),Z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e,t,s,r){this.be=e,this.removedTargetIds=t,this.key=s,this.De=r}}class Th{constructor(e,t){this.targetId=e,this.Ce=t}}class Ah{constructor(e,t,s=Ce.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class Jl{constructor(){this.ve=0,this.Fe=Zl(),this.Me=Ce.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Z(),t=Z(),s=Z();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:H(38017,{changeType:i})}}),new Js(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=Zl()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class Ww{constructor(e){this.Ge=e,this.ze=new Map,this.je=bt(),this.Je=Er(),this.He=Er(),this.Ye=new ce(J)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.Ke(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.Ke(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.We(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:H(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((s,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,s=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Ro(i))if(s===0){const a=new q(i.path);this.et(t,a,De.newNoDocument(a,G.min()))}else te(s===1,20013,{expectedCount:s});else{const a=this._t(t);if(a!==s){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=t;let a,c;try{a=Qt(s).toUint8Array()}catch(u){if(u instanceof Qd)return qn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ia(a,r,i)}catch(u){return qn(u instanceof As?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let r=0;return s.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Ro(c.target)){const u=new q(c.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,De.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let s=Z();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(s=s.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const r=new wi(e,t,this.Ye,this.je,s);return this.je=bt(),this.Je=Er(),this.He=Er(),this.Ye=new ce(J),r}Xe(e,t){if(!this.rt(e))return;const s=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Jl,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ve(J),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ve(J),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Jl),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Er(){return new ce(q.comparator)}function Zl(){return new ce(q.comparator)}const Gw={asc:"ASCENDING",desc:"DESCENDING"},Kw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Qw={and:"AND",or:"OR"};class Xw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function xo(n,e){return n.useProto3Json||fi(e)?e:{value:e}}function ei(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ch(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Yw(n,e){return ei(n,e.toTimestamp())}function lt(n){return te(!!n,49232),G.fromTimestamp(function(t){const s=Kt(t);return new oe(s.seconds,s.nanos)}(n))}function ba(n,e){return Lo(n,e).canonicalString()}function Lo(n,e){const t=function(r){return new se(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Sh(n){const e=se.fromString(n);return te(Lh(e),10190,{key:e.toString()}),e}function Do(n,e){return ba(n.databaseId,e.path)}function ro(n,e){const t=Sh(e);if(t.get(1)!==n.databaseId.projectId)throw new z(N.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new z(N.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(Ph(t))}function Rh(n,e){return ba(n.databaseId,e)}function Jw(n){const e=Sh(n);return e.length===4?se.emptyPath():Ph(e)}function No(n){return new se(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ph(n){return te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function eu(n,e,t){return{name:Do(n,e),fields:t.value.mapValue.fields}}function Zw(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:H(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(te(f===void 0||typeof f=="string",58123),Ce.fromBase64String(f||"")):(te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ce.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?N.UNKNOWN:bh(d.code);return new z(f,d.message||"")}(a);t=new Ah(s,r,i,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=ro(n,s.document.name),i=lt(s.document.updateTime),a=s.document.createTime?lt(s.document.createTime):G.min(),c=new We({mapValue:{fields:s.document.fields}}),u=De.newFoundDocument(r,i,a,c),d=s.targetIds||[],f=s.removedTargetIds||[];t=new Lr(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=ro(n,s.document),i=s.readTime?lt(s.readTime):G.min(),a=De.newNoDocument(r,i),c=s.removedTargetIds||[];t=new Lr([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=ro(n,s.document),i=s.removedTargetIds||[];t=new Lr([],i,r,null)}else{if(!("filter"in e))return H(11601,{Rt:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,a=new $w(r,i),c=s.targetId;t=new Th(c,a)}}return t}function eE(n,e){let t;if(e instanceof Ys)t={update:eu(n,e.key,e.value)};else if(e instanceof Ih)t={delete:Do(n,e.key)};else if(e instanceof In)t={update:eu(n,e.key,e.data),updateMask:lE(e.fieldMask)};else{if(!(e instanceof Fw))return H(16599,{Vt:e.type});t={verify:Do(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(i,a){const c=a.transform;if(c instanceof Jr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof $s)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qs)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Zr)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw H(20930,{transform:a.transform})}(0,s))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:Yw(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:H(27497)}(n,e.precondition)),t}function tE(n,e){return n&&n.length>0?(te(e!==void 0,14353),n.map(t=>function(r,i){let a=r.updateTime?lt(r.updateTime):lt(i);return a.isEqual(G.min())&&(a=lt(i)),new Vw(a,r.transformResults||[])}(t,e))):[]}function nE(n,e){return{documents:[Rh(n,e.path)]}}function sE(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=Rh(n,r);const i=function(d){if(d.length!==0)return xh(Ze.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(_){return{field:kn(_.field),direction:oE(_.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=xo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function rE(n){let e=Jw(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){te(s===1,65062);const f=t.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const _=kh(p);return _ instanceof Ze&&ih(_)?_.getFilters():[_]}(t.where));let a=[];t.orderBy&&(a=function(p){return p.map(_=>function(A){return new Yr(xn(A.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(_))}(t.orderBy));let c=null;t.limit&&(c=function(p){let _;return _=typeof p=="object"?p.value:p,fi(_)?null:_}(t.limit));let u=null;t.startAt&&(u=function(p){const _=!!p.before,T=p.values||[];return new Xr(T,_)}(t.startAt));let d=null;return t.endAt&&(d=function(p){const _=!p.before,T=p.values||[];return new Xr(T,_)}(t.endAt)),bw(e,r,a,i,c,"F",u,d)}function iE(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function kh(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=xn(t.unaryFilter.field);return ye.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=xn(t.unaryFilter.field);return ye.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=xn(t.unaryFilter.field);return ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=xn(t.unaryFilter.field);return ye.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return H(61313);default:return H(60726)}}(n):n.fieldFilter!==void 0?function(t){return ye.create(xn(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return H(58110);default:return H(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ze.create(t.compositeFilter.filters.map(s=>kh(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return H(1026)}}(t.compositeFilter.op))}(n):H(30097,{filter:n})}function oE(n){return Gw[n]}function aE(n){return Kw[n]}function cE(n){return Qw[n]}function kn(n){return{fieldPath:n.canonicalString()}}function xn(n){return Ae.fromServerFormat(n.fieldPath)}function xh(n){return n instanceof ye?function(t){if(t.op==="=="){if(zl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NAN"}};if(Ul(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(zl(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NAN"}};if(Ul(t.value))return{unaryFilter:{field:kn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:kn(t.field),op:aE(t.op),value:t.value}}}(n):n instanceof Ze?function(t){const s=t.getFilters().map(r=>xh(r));return s.length===1?s[0]:{compositeFilter:{op:cE(t.op),filters:s}}}(n):H(54877,{filter:n})}function lE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Lh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,t,s,r,i=G.min(),a=G.min(),c=Ce.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uE{constructor(e){this.yt=e}}function dE(n){const e=rE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ko(e,e.limit,"L"):e}/**
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
 */class hE{constructor(){this.Cn=new fE}addToCollectionParentIndex(e,t){return this.Cn.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Gt.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Gt.min())}updateCollectionGroup(e,t,s){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}}class fE{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new ve(se.comparator),i=!r.has(s);return this.index[t]=r.add(s),i}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new ve(se.comparator)).toArray()}}/**
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
 */const tu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Dh=41943040;class ze{static withCacheSize(e){return new ze(e,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ze.DEFAULT_COLLECTION_PERCENTILE=10,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ze.DEFAULT=new ze(Dh,ze.DEFAULT_COLLECTION_PERCENTILE,ze.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ze.DISABLED=new ze(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const nu="LruGarbageCollector",mE=1048576;function su([n,e],[t,s]){const r=J(n,t);return r===0?J(e,s):r}class pE{constructor(e){this.Ir=e,this.buffer=new ve(su),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();su(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gE{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){$(nu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){es(t)?$(nu,"Ignoring IndexedDB error during garbage collection: ",t):await Zn(t)}await this.Vr(3e5)})}}class yE{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(s=>Math.floor(t/100*s))}nthSequenceNumber(e,t){if(t===0)return M.resolve(hi.ce);const s=new pE(t);return this.mr.forEachTarget(e,r=>s.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>s.Ar(r))).next(()=>s.maxValue)}removeTargets(e,t,s){return this.mr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(tu)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),tu):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let s,r,i,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),r=this.params.maximumSequenceNumbersToCollect):r=p,a=Date.now(),this.nthSequenceNumber(e,r))).next(p=>(s=p,c=Date.now(),this.removeTargets(e,s,t))).next(p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,s))).next(p=>(d=Date.now(),Rn()<=Y.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${r} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:p})))}}function _E(n,e){return new yE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(){this.changes=new vn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,De.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?M.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class EE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(s!==null&&Ds(s.mutation,r,Ye.empty(),oe.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,Z()).next(()=>s))}getLocalViewOfDocuments(e,t,s=Z()){const r=cn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,s).next(i=>{let a=Ts();return i.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const s=cn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,Z()))}populateOverlays(e,t,s){const r=[];return s.forEach(i=>{t.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,s,r){let i=bt();const a=Ls(),c=function(){return Ls()}();return t.forEach((u,d)=>{const f=s.get(d.key);r.has(d.key)&&(f===void 0||f.mutation instanceof In)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),Ds(f.mutation,d,f.mutation.getFieldMask(),oe.now())):a.set(d.key,Ye.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>c.set(d,new EE(f,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const s=Ls();let r=new ce((a,c)=>a-c),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const d=t.get(u);if(d===null)return;let f=s.get(u)||Ye.empty();f=c.applyToLocalView(d,f),s.set(u,f);const p=(r.get(c.batchId)||Z()).add(u);r=r.insert(c.batchId,p)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=mh();f.forEach(_=>{if(!i.has(_)){const T=Eh(t.get(_),s.get(_));T!==null&&p.set(_,T),i=i.add(_)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return M.waitFor(a)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,r){return function(a){return q.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):lh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next(i=>{const a=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-i.size):M.resolve(cn());let c=Os,u=i;return a.next(d=>M.forEach(d,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{u=u.insert(f,_)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,u,d,Z())).next(f=>({batchId:c,changes:fh(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(s=>{let r=Ts();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const i=t.collectionGroup;let a=Ts();return this.indexManager.getCollectionParents(e,i).next(c=>M.forEach(c,u=>{const d=function(p,_){return new Xs(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,s,r).next(f=>{f.forEach((p,_)=>{a=a.insert(p,_)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r))).next(a=>{i.forEach((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,De.newInvalidDocument(f)))});let c=Ts();return a.forEach((u,d)=>{const f=i.get(u);f!==void 0&&Ds(f.mutation,d,Ye.empty(),oe.now()),gi(t,d)&&(c=c.insert(u,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return M.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:lt(r.createTime)}}(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:dE(r.bundledQuery),readTime:lt(r.readTime)}}(t)),M.resolve()}}/**
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
 */class bE{constructor(){this.overlays=new ce(q.comparator),this.qr=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){const s=cn();return M.forEach(t,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((r,i)=>{this.St(e,t,i)}),M.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.qr.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(s)),M.resolve()}getOverlaysForCollection(e,t,s){const r=cn(),i=t.length+1,a=new q(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>s&&r.set(u.getKey(),u)}return M.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let i=new ce((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>s){let f=i.get(d.largestBatchId);f===null&&(f=cn(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=cn(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=r)););return M.resolve(c)}St(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const a=this.qr.get(r.largestBatchId).delete(s.key);this.qr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(s.key,new zw(t,s));let i=this.qr.get(t);i===void 0&&(i=Z(),this.qr.set(t,i)),this.qr.set(t,i.add(s.key))}}/**
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
 */class TE{constructor(){this.sessionToken=Ce.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(){this.Qr=new ve(be.$r),this.Ur=new ve(be.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const s=new be(e,t);this.Qr=this.Qr.add(s),this.Ur=this.Ur.add(s)}Wr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Gr(new be(e,t))}zr(e,t){e.forEach(s=>this.removeReference(s,t))}jr(e){const t=new q(new se([])),s=new be(t,e),r=new be(t,e+1),i=[];return this.Ur.forEachInRange([s,r],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new q(new se([])),s=new be(t,e),r=new be(t,e+1);let i=Z();return this.Ur.forEachInRange([s,r],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new be(e,0),s=this.Qr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class be{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return q.comparator(e.key,t.key)||J(e.Yr,t.Yr)}static Kr(e,t){return J(e.Yr,t.Yr)||q.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ve(be.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Uw(i,t,s,r);this.mutationQueue.push(a);for(const c of r)this.Zr=this.Zr.add(new be(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.ei(s),i=r<0?0:r;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?ma:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new be(t,0),r=new be(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([s,r],a=>{const c=this.Xr(a.Yr);i.push(c)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new ve(J);return t.forEach(r=>{const i=new be(r,0),a=new be(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],c=>{s=s.add(c.Yr)})}),M.resolve(this.ti(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let i=s;q.isDocumentKey(i)||(i=i.child(""));const a=new be(new q(i),0);let c=new ve(J);return this.Zr.forEachWhile(u=>{const d=u.key.path;return!!s.isPrefixOf(d)&&(d.length===r&&(c=c.add(u.Yr)),!0)},a),M.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(s=>{const r=this.Xr(s);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Zr;return M.forEach(t.mutations,r=>{const i=new be(r.key,t.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=s})}ir(e){}containsKey(e,t){const s=new be(t,0),r=this.Zr.firstAfterOrEqual(s);return M.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e){this.ri=e,this.docs=function(){return new ce(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),i=r?r.size:0,a=this.ri(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return M.resolve(s?s.document.mutableCopy():De.newInvalidDocument(t))}getEntries(e,t){let s=bt();return t.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():De.newInvalidDocument(r))}),M.resolve(s)}getDocumentsMatchingQuery(e,t,s,r){let i=bt();const a=t.path,c=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||tw(ew(f),s)<=0||(r.has(f.key)||gi(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,t,s,r){H(9500)}ii(e,t){return M.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new SE(this)}getSize(e){return M.resolve(this.size)}}class SE extends wE{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(s)}),M.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e){this.persistence=e,this.si=new vn(t=>ya(t),_a),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.oi=0,this._i=new Ta,this.targetCount=0,this.ai=Gn.ur()}forEachTarget(e,t){return this.si.forEach((s,r)=>t(r)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.oi&&(this.oi=t),M.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Gn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Pr(t),M.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,s){let r=0;const i=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=t&&s.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),M.waitFor(i).next(()=>r)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){const s=this.si.get(t)||null;return M.resolve(s)}addMatchingKeys(e,t,s){return this._i.Wr(t,s),M.resolve()}removeMatchingKeys(e,t,s){this._i.zr(t,s);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(a=>{i.push(r.markPotentiallyOrphaned(e,a))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),M.resolve()}getMatchingKeysForTargetId(e,t){const s=this._i.Hr(t);return M.resolve(s)}containsKey(e,t){return M.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(e,t){this.ui={},this.overlays={},this.ci=new hi(0),this.li=!1,this.li=!0,this.hi=new TE,this.referenceDelegate=e(this),this.Pi=new RE(this),this.indexManager=new hE,this.remoteDocumentCache=function(r){return new CE(r)}(s=>this.referenceDelegate.Ti(s)),this.serializer=new uE(t),this.Ii=new IE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new bE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.ui[e.toKey()];return s||(s=new AE(t,this.referenceDelegate),this.ui[e.toKey()]=s),s}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,s){$("MemoryPersistence","Starting transaction:",e);const r=new PE(this.ci.next());return this.referenceDelegate.Ei(),s(r).next(i=>this.referenceDelegate.di(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ai(e,t){return M.or(Object.values(this.ui).map(s=>()=>s.containsKey(e,t)))}}class PE extends sw{constructor(e){super(),this.currentSequenceNumber=e}}class Aa{constructor(e){this.persistence=e,this.Ri=new Ta,this.Vi=null}static mi(e){return new Aa(e)}get fi(){if(this.Vi)return this.Vi;throw H(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.fi.delete(s.toString()),M.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.fi.add(s.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),M.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(i=>this.fi.add(i.toString()))}).next(()=>s.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,s=>{const r=q.fromPath(s);return this.gi(e,r).next(i=>{i||t.removeEntry(r,G.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(s=>{s?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return M.or([()=>M.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class ti{constructor(e,t){this.persistence=e,this.pi=new vn(s=>ow(s.path),(s,r)=>s.isEqual(r)),this.garbageCollector=_E(this,t)}static mi(e,t){return new ti(e,t)}Ei(){}di(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>t.next(r=>s+r))}wr(e){let t=0;return this.pr(e,s=>{t++}).next(()=>t)}pr(e,t){return M.forEach(this.pi,(s,r)=>this.br(e,s,r).next(i=>i?M.resolve():t(r)))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,a=>this.br(e,a,t).next(c=>{c||(s++,i.removeEntry(a,G.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),M.resolve()}removeReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Pr(e.data.value)),t}br(e,t,s){return M.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return M.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Es=s,this.ds=r}static As(e,t){let s=Z(),r=Z();for(const i of t.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ca(e,t.fromCache,s,r)}}/**
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
 */class kE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class xE{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Ip()?8:rw(Ne())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,r){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,r,s).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new kE;return this.Ss(e,t,a).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,a,c.size)})}).next(()=>i.result)}bs(e,t,s,r){return s.documentReadCount<this.fs?(Rn()<=Y.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Pn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Rn()<=Y.DEBUG&&$("QueryEngine","Query:",Pn(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.gs*r?(Rn()<=Y.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Pn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):M.resolve())}ys(e,t){if(Hl(t))return M.resolve(null);let s=at(t);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=ko(t,null,"F"),s=at(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const a=Z(...i);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,s).next(u=>{const d=this.Ds(t,c);return this.Cs(t,d,a,u.readTime)?this.ys(e,ko(t,null,"F")):this.vs(e,d,t,u)}))})))}ws(e,t,s,r){return Hl(t)||r.isEqual(G.min())?M.resolve(null):this.ps.getDocuments(e,s).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,s,r)?M.resolve(null):(Rn()<=Y.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Pn(t)),this.vs(e,a,t,Z_(r,Os)).next(c=>c))})}Ds(e,t){let s=new ve(dh(e));return t.forEach((r,i)=>{gi(e,i)&&(s=s.add(i))}),s}Cs(e,t,s,r){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,s){return Rn()<=Y.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Pn(t)),this.ps.getDocumentsMatchingQuery(e,t,Gt.min(),s)}vs(e,t,s,r){return this.ps.getDocumentsMatchingQuery(e,s,r).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="LocalStore",LE=3e8;class DE{constructor(e,t,s,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new ce(J),this.xs=new vn(i=>ya(i),_a),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(s)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new vE(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function NE(n,e,t,s){return new DE(n,e,t,s)}async function Mh(n,e){const t=K(n);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(s))).next(i=>{const a=[],c=[];let u=Z();for(const d of r){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(s,u).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:c}))})})}function ME(n,e){const t=K(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){const p=d.batch,_=p.keys();let T=M.resolve();return _.forEach(A=>{T=T.next(()=>f.getEntry(u,A)).next(R=>{const C=d.docVersions.get(A);te(C!==null,48541),R.version.compareTo(C)<0&&(p.applyToRemoteDocument(R,d),R.isValidDocument()&&(R.setReadTime(d.commitVersion),f.addEntry(R)))})}),T.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,s,e,i).next(()=>i.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(c){let u=Z();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(s,r))})}function Vh(n){const e=K(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function VE(n,e){const t=K(n),s=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((f,p)=>{const _=r.get(p);if(!_)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p)));let T=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?T=T.withResumeToken(Ce.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,s)),r=r.insert(p,T),function(R,C,x){return R.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=LE?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(_,T,f)&&c.push(t.Pi.updateTargetData(i,T))});let u=bt(),d=Z();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(BE(i,a,e.documentUpdates).next(f=>{u=f.ks,d=f.qs})),!s.isEqual(G.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,s));c.push(f)}return M.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,u,d)).next(()=>u)}).then(i=>(t.Ms=r,i))}function BE(n,e,t){let s=Z(),r=Z();return t.forEach(i=>s=s.add(i)),e.getEntries(n,s).next(i=>{let a=bt();return t.forEach((c,u)=>{const d=i.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),u.isNoDocument()&&u.version.isEqual(G.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):$(Sa,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{ks:a,qs:r}})}function OE(n,e){const t=K(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=ma),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function FE(n,e){const t=K(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return t.Pi.getTargetData(s,e).next(i=>i?(r=i,M.resolve(r)):t.Pi.allocateTargetId(s).next(a=>(r=new Ft(e,a,"TargetPurposeListen",s.currentSequenceNumber),t.Pi.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=t.Ms.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(s.targetId,s),t.xs.set(e,s.targetId)),s})}async function Mo(n,e,t){const s=K(n),r=s.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",i,a=>s.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!es(a))throw a;$(Sa,`Failed to update sequence numbers for target ${e}: ${a}`)}s.Ms=s.Ms.remove(e),s.xs.delete(r.target)}function ru(n,e,t){const s=K(n);let r=G.min(),i=Z();return s.persistence.runTransaction("Execute query","readwrite",a=>function(u,d,f){const p=K(u),_=p.xs.get(f);return _!==void 0?M.resolve(p.Ms.get(_)):p.Pi.getTargetData(d,f)}(s,a,at(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,s.Pi.getMatchingKeysForTargetId(a,c.targetId).next(u=>{i=u})}).next(()=>s.Fs.getDocumentsMatchingQuery(a,e,t?r:G.min(),t?i:Z())).next(c=>(UE(s,Aw(e),c),{documents:c,Qs:i})))}function UE(n,e,t){let s=n.Os.get(e)||G.min();t.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),n.Os.set(e,s)}class iu{constructor(){this.activeTargetIds=xw()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class zE{constructor(){this.Mo=new iu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,s){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new iu,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class $E{Oo(e){}shutdown(){}}/**
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
 */const ou="ConnectivityMonitor";class au{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){$(ou,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){$(ou,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let vr=null;function Vo(){return vr===null?vr=function(){return 268435456+Math.round(2147483648*Math.random())}():vr++,"0x"+vr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="RestConnection",qE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class jE{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${s}/databases/${r}`,this.Wo=this.databaseId.database===Kr?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Go(e,t,s,r,i){const a=Vo(),c=this.zo(e,t.toUriEncodedString());$(io,`Sending RPC '${e}' ${a}:`,c,s);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,r,i);const{host:d}=new URL(c),f=Qn(d);return this.Jo(e,c,u,s,f).then(p=>($(io,`Received RPC '${e}' ${a}: `,p),p),p=>{throw qn(io,`RPC '${e}' ${a} failed with error: `,p,"url: ",c,"request:",s),p})}Ho(e,t,s,r,i,a){return this.Go(e,t,s,r,i)}jo(e,t,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Jn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}zo(e,t){const s=qE[e];return`${this.Uo}/v1/${t}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe="WebChannelConnection";class WE extends jE{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,s,r,i){const a=Vo();return new Promise((c,u)=>{const d=new Od;d.setWithCredentials(!0),d.listenOnce(Fd.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Rr.NO_ERROR:const p=d.getResponseJson();$(Pe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),c(p);break;case Rr.TIMEOUT:$(Pe,`RPC '${e}' ${a} timed out`),u(new z(N.DEADLINE_EXCEEDED,"Request time out"));break;case Rr.HTTP_ERROR:const _=d.getStatus();if($(Pe,`RPC '${e}' ${a} failed with status:`,_,"response text:",d.getResponseText()),_>0){let T=d.getResponseJson();Array.isArray(T)&&(T=T[0]);const A=T==null?void 0:T.error;if(A&&A.status&&A.message){const R=function(x){const D=x.toLowerCase().replace(/_/g,"-");return Object.values(N).indexOf(D)>=0?D:N.UNKNOWN}(A.status);u(new z(R,A.message))}else u(new z(N.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new z(N.UNAVAILABLE,"Connection failed."));break;default:H(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{$(Pe,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(r);$(Pe,`RPC '${e}' ${a} sending request:`,r),d.send(t,"POST",f,s,15)})}T_(e,t,s){const r=Vo(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=$d(),c=zd(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,s),u.encodeInitMessageHeaders=!0;const f=i.join("");$(Pe,`Creating RPC '${e}' stream ${r}: ${f}`,u);const p=a.createWebChannel(f,u);this.I_(p);let _=!1,T=!1;const A=new HE({Yo:C=>{T?$(Pe,`Not sending because RPC '${e}' stream ${r} is closed:`,C):(_||($(Pe,`Opening RPC '${e}' stream ${r} transport.`),p.open(),_=!0),$(Pe,`RPC '${e}' stream ${r} sending:`,C),p.send(C))},Zo:()=>p.close()}),R=(C,x,D)=>{C.listen(x,V=>{try{D(V)}catch(U){setTimeout(()=>{throw U},0)}})};return R(p,bs.EventType.OPEN,()=>{T||($(Pe,`RPC '${e}' stream ${r} transport opened.`),A.o_())}),R(p,bs.EventType.CLOSE,()=>{T||(T=!0,$(Pe,`RPC '${e}' stream ${r} transport closed`),A.a_(),this.E_(p))}),R(p,bs.EventType.ERROR,C=>{T||(T=!0,qn(Pe,`RPC '${e}' stream ${r} transport errored. Name:`,C.name,"Message:",C.message),A.a_(new z(N.UNAVAILABLE,"The operation could not be completed")))}),R(p,bs.EventType.MESSAGE,C=>{var x;if(!T){const D=C.data[0];te(!!D,16349);const V=D,U=(V==null?void 0:V.error)||((x=V[0])==null?void 0:x.error);if(U){$(Pe,`RPC '${e}' stream ${r} received error:`,U);const B=U.status;let O=function(w){const b=pe[w];if(b!==void 0)return bh(b)}(B),E=U.message;O===void 0&&(O=N.INTERNAL,E="Unknown error status: "+B+" with message "+U.message),T=!0,A.a_(new z(O,E)),p.close()}else $(Pe,`RPC '${e}' stream ${r} received:`,D),A.u_(D)}}),R(c,Ud.STAT_EVENT,C=>{C.stat===bo.PROXY?$(Pe,`RPC '${e}' stream ${r} detected buffering proxy`):C.stat===bo.NOPROXY&&$(Pe,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{A.__()},0),A}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function oo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(n){return new Xw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(e,t,s=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=s,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-s);r>0&&$("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu="PersistentStream";class Oh{constructor(e,t,s,r,i,a,c,u){this.Mi=e,this.S_=s,this.b_=r,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Bh(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===N.RESOURCE_EXHAUSTED?(It(t.toString()),It("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===N.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.D_===t&&this.G_(s,r)},s=>{e(()=>{const r=new z(N.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)})})}G_(e,t){const s=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{s(()=>this.listener.Xo())}),this.stream.t_(()=>{s(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{s(()=>this.z_(r))}),this.stream.onMessage(r=>{s(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return $(cu,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():($(cu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class GE extends Oh{constructor(e,t,s,r,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Zw(this.serializer,e),s=function(i){if(!("targetChange"in i))return G.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?G.min():a.readTime?lt(a.readTime):G.min()}(e);return this.listener.H_(t,s)}Y_(e){const t={};t.database=No(this.serializer),t.addTarget=function(i,a){let c;const u=a.target;if(c=Ro(u)?{documents:nE(i,u)}:{query:sE(i,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Ch(i,a.resumeToken);const d=xo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(G.min())>0){c.readTime=ei(i,a.snapshotVersion.toTimestamp());const d=xo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const s=iE(this.serializer,e);s&&(t.labels=s),this.q_(t)}Z_(e){const t={};t.database=No(this.serializer),t.removeTarget=e,this.q_(t)}}class KE extends Oh{constructor(e,t,s,r,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=tE(e.writeResults,e.commitTime),s=lt(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=No(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>eE(this.serializer,s))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{}class XE extends QE{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new z(N.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,Lo(t,s),r,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new z(N.UNKNOWN,i.toString())})}Ho(e,t,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,Lo(t,s),r,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===N.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(N.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class YE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(It(t),this.aa=!1):$("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n="RemoteStore";class JE{constructor(e,t,s,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{s.enqueueAndForget(async()=>{bn(this)&&($(_n,"Restarting streams for network reachability change."),await async function(u){const d=K(u);d.Ea.add(4),await Zs(d),d.Ra.set("Unknown"),d.Ea.delete(4),await vi(d)}(this))})}),this.Ra=new YE(s,r)}}async function vi(n){if(bn(n))for(const e of n.da)await e(!0)}async function Zs(n){for(const e of n.da)await e(!1)}function Fh(n,e){const t=K(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),xa(t)?ka(t):ts(t).O_()&&Pa(t,e))}function Ra(n,e){const t=K(n),s=ts(t);t.Ia.delete(e),s.O_()&&Uh(t,e),t.Ia.size===0&&(s.O_()?s.L_():bn(t)&&t.Ra.set("Unknown"))}function Pa(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ts(n).Y_(e)}function Uh(n,e){n.Va.Ue(e),ts(n).Z_(e)}function ka(n){n.Va=new Ww({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),ts(n).start(),n.Ra.ua()}function xa(n){return bn(n)&&!ts(n).x_()&&n.Ia.size>0}function bn(n){return K(n).Ea.size===0}function zh(n){n.Va=void 0}async function ZE(n){n.Ra.set("Online")}async function ev(n){n.Ia.forEach((e,t)=>{Pa(n,e)})}async function tv(n,e){zh(n),xa(n)?(n.Ra.ha(e),ka(n)):n.Ra.set("Unknown")}async function nv(n,e,t){if(n.Ra.set("Online"),e instanceof Ah&&e.state===2&&e.cause)try{await async function(r,i){const a=i.cause;for(const c of i.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,a),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(s){$(_n,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await ni(n,s)}else if(e instanceof Lr?n.Va.Ze(e):e instanceof Th?n.Va.st(e):n.Va.tt(e),!t.isEqual(G.min()))try{const s=await Vh(n.localStore);t.compareTo(s)>=0&&await function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(d);f&&i.Ia.set(d,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,d)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Ce.EMPTY_BYTE_STRING,f.snapshotVersion)),Uh(i,u);const p=new Ft(f.target,u,d,f.sequenceNumber);Pa(i,p)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(s){$(_n,"Failed to raise snapshot:",s),await ni(n,s)}}async function ni(n,e,t){if(!es(e))throw e;n.Ea.add(1),await Zs(n),n.Ra.set("Offline"),t||(t=()=>Vh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(_n,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await vi(n)})}function $h(n,e){return e().catch(t=>ni(n,t,e))}async function Ii(n){const e=K(n),t=Yt(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ma;for(;sv(e);)try{const r=await OE(e.localStore,s);if(r===null){e.Ta.length===0&&t.L_();break}s=r.batchId,rv(e,r)}catch(r){await ni(e,r)}qh(e)&&jh(e)}function sv(n){return bn(n)&&n.Ta.length<10}function rv(n,e){n.Ta.push(e);const t=Yt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function qh(n){return bn(n)&&!Yt(n).x_()&&n.Ta.length>0}function jh(n){Yt(n).start()}async function iv(n){Yt(n).ra()}async function ov(n){const e=Yt(n);for(const t of n.Ta)e.ea(t.mutations)}async function av(n,e,t){const s=n.Ta.shift(),r=va.from(s,e,t);await $h(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Ii(n)}async function cv(n,e){e&&Yt(n).X_&&await async function(s,r){if(function(a){return qw(a)&&a!==N.ABORTED}(r.code)){const i=s.Ta.shift();Yt(s).B_(),await $h(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Ii(s)}}(n,e),qh(n)&&jh(n)}async function lu(n,e){const t=K(n);t.asyncQueue.verifyOperationInProgress(),$(_n,"RemoteStore received new credentials");const s=bn(t);t.Ea.add(3),await Zs(t),s&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await vi(t)}async function lv(n,e){const t=K(n);e?(t.Ea.delete(2),await vi(t)):e||(t.Ea.add(2),await Zs(t),t.Ra.set("Unknown"))}function ts(n){return n.ma||(n.ma=function(t,s,r){const i=K(t);return i.sa(),new GE(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:ZE.bind(null,n),t_:ev.bind(null,n),r_:tv.bind(null,n),H_:nv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),xa(n)?ka(n):n.Ra.set("Unknown")):(await n.ma.stop(),zh(n))})),n.ma}function Yt(n){return n.fa||(n.fa=function(t,s,r){const i=K(t);return i.sa(),new KE(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:iv.bind(null,n),r_:cv.bind(null,n),ta:ov.bind(null,n),na:av.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Ii(n)):(await n.fa.stop(),n.Ta.length>0&&($(_n,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,t,s,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,i){const a=Date.now()+s,c=new La(e,t,a,r,i);return c.start(s),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Da(n,e){if(It("AsyncQueue",`${e}: ${n}`),es(n))return new z(N.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{static emptySet(e){return new Bn(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||q.comparator(t.key,s.key):(t,s)=>q.comparator(t.key,s.key),this.keyedMap=Ts(),this.sortedSet=new ce(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Bn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new Bn;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(){this.ga=new ce(q.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):H(63341,{Rt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,s)=>{e.push(s)}),e}}class Kn{constructor(e,t,s,r,i,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,s,r,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new Kn(e,t,Bn.emptySet(t),a,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&pi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class dv{constructor(){this.queries=du(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const r=K(t),i=r.queries;r.queries=du(),i.forEach((a,c)=>{for(const u of c.Sa)u.onError(s)})})(this,new z(N.ABORTED,"Firestore shutting down"))}}function du(){return new vn(n=>uh(n),pi)}async function Hh(n,e){const t=K(n);let s=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(s=2):(i=new uv,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const c=Da(a,`Initialization of query '${Pn(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Na(t)}async function Wh(n,e){const t=K(n),s=e.query;let r=3;const i=t.queries.get(s);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function hv(n,e){const t=K(n);let s=!1;for(const r of e){const i=r.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(r)&&(s=!0);a.wa=r}}s&&Na(t)}function fv(n,e,t){const s=K(n),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);s.queries.delete(e)}function Na(n){n.Ca.forEach(e=>{e.next()})}var Bo,hu;(hu=Bo||(Bo={})).Ma="default",hu.Cache="cache";class Gh{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new Kn(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Kn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Bo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(e){this.key=e}}class Qh{constructor(e){this.key=e}}class mv{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Z(),this.mutatedKeys=Z(),this.eu=dh(e),this.tu=new Bn(this.eu)}get nu(){return this.Ya}ru(e,t){const s=t?t.iu:new uu,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=r,c=!1;const u=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((f,p)=>{const _=r.get(f),T=gi(this.query,p)?p:null,A=!!_&&this.mutatedKeys.has(_.key),R=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let C=!1;_&&T?_.data.isEqual(T.data)?A!==R&&(s.track({type:3,doc:T}),C=!0):this.su(_,T)||(s.track({type:2,doc:T}),C=!0,(u&&this.eu(T,u)>0||d&&this.eu(T,d)<0)&&(c=!0)):!_&&T?(s.track({type:0,doc:T}),C=!0):_&&!T&&(s.track({type:1,doc:_}),C=!0,(u||d)&&(c=!0)),C&&(T?(a=a.add(T),i=R?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),s.track({type:1,doc:f})}return{tu:a,iu:s,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,p)=>function(T,A){const R=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H(20277,{Rt:C})}};return R(T)-R(A)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(s),r=r??!1;const c=t&&!r?this._u():[],u=this.Xa.size===0&&this.current&&!r?1:0,d=u!==this.Za;return this.Za=u,a.length!==0||d?{snapshot:new Kn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new uu,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Z(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Xa=this.Xa.add(s.key))});const t=[];return e.forEach(s=>{this.Xa.has(s)||t.push(new Qh(s))}),this.Xa.forEach(s=>{e.has(s)||t.push(new Kh(s))}),t}cu(e){this.Ya=e.Qs,this.Xa=Z();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Kn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Ma="SyncEngine";class pv{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class gv{constructor(e){this.key=e,this.hu=!1}}class yv{constructor(e,t,s,r,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new vn(c=>uh(c),pi),this.Iu=new Map,this.Eu=new Set,this.du=new ce(q.comparator),this.Au=new Map,this.Ru=new Ta,this.Vu={},this.mu=new Map,this.fu=Gn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function _v(n,e,t=!0){const s=tf(n);let r;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await Xh(s,e,t,!0),r}async function wv(n,e){const t=tf(n);await Xh(t,e,!0,!1)}async function Xh(n,e,t,s){const r=await FE(n.localStore,at(e)),i=r.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return s&&(c=await Ev(n,e,i,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&Fh(n.remoteStore,r),c}async function Ev(n,e,t,s,r){n.pu=(p,_,T)=>async function(R,C,x,D){let V=C.view.ru(x);V.Cs&&(V=await ru(R.localStore,C.query,!1).then(({documents:E})=>C.view.ru(E,V)));const U=D&&D.targetChanges.get(C.targetId),B=D&&D.targetMismatches.get(C.targetId)!=null,O=C.view.applyChanges(V,R.isPrimaryClient,U,B);return mu(R,C.targetId,O.au),O.snapshot}(n,p,_,T);const i=await ru(n.localStore,e,!0),a=new mv(e,i.Qs),c=a.ru(i.documents),u=Js.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),d=a.applyChanges(c,n.isPrimaryClient,u);mu(n,t,d.au);const f=new pv(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function vv(n,e,t){const s=K(n),r=s.Tu.get(e),i=s.Iu.get(r.targetId);if(i.length>1)return s.Iu.set(r.targetId,i.filter(a=>!pi(a,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Mo(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),t&&Ra(s.remoteStore,r.targetId),Oo(s,r.targetId)}).catch(Zn)):(Oo(s,r.targetId),await Mo(s.localStore,r.targetId,!0))}async function Iv(n,e){const t=K(n),s=t.Tu.get(e),r=t.Iu.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Ra(t.remoteStore,s.targetId))}async function bv(n,e,t){const s=kv(n);try{const r=await function(a,c){const u=K(a),d=oe.now(),f=c.reduce((T,A)=>T.add(A.key),Z());let p,_;return u.persistence.runTransaction("Locally write mutations","readwrite",T=>{let A=bt(),R=Z();return u.Ns.getEntries(T,f).next(C=>{A=C,A.forEach((x,D)=>{D.isValidDocument()||(R=R.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(T,A)).next(C=>{p=C;const x=[];for(const D of c){const V=Ow(D,p.get(D.key).overlayedDocument);V!=null&&x.push(new In(D.key,V,nh(V.value.mapValue),ct.exists(!0)))}return u.mutationQueue.addMutationBatch(T,d,x,c)}).next(C=>{_=C;const x=C.applyToLocalDocumentSet(p,R);return u.documentOverlayCache.saveOverlays(T,C.batchId,x)})}).then(()=>({batchId:_.batchId,changes:fh(p)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(a,c,u){let d=a.Vu[a.currentUser.toKey()];d||(d=new ce(J)),d=d.insert(c,u),a.Vu[a.currentUser.toKey()]=d}(s,r.batchId,t),await er(s,r.changes),await Ii(s.remoteStore)}catch(r){const i=Da(r,"Failed to persist write");t.reject(i)}}async function Yh(n,e){const t=K(n);try{const s=await VE(t.localStore,e);e.targetChanges.forEach((r,i)=>{const a=t.Au.get(i);a&&(te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?te(a.hu,14607):r.removedDocuments.size>0&&(te(a.hu,42227),a.hu=!1))}),await er(t,s,e)}catch(s){await Zn(s)}}function fu(n,e,t){const s=K(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const u=K(a);u.onlineState=c;let d=!1;u.queries.forEach((f,p)=>{for(const _ of p.Sa)_.va(c)&&(d=!0)}),d&&Na(u)}(s.eventManager,e),r.length&&s.Pu.H_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function Tv(n,e,t){const s=K(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Au.get(e),i=r&&r.key;if(i){let a=new ce(q.comparator);a=a.insert(i,De.newNoDocument(i,G.min()));const c=Z().add(i),u=new wi(G.min(),new Map,new ce(J),a,c);await Yh(s,u),s.du=s.du.remove(i),s.Au.delete(e),Va(s)}else await Mo(s.localStore,e,!1).then(()=>Oo(s,e,t)).catch(Zn)}async function Av(n,e){const t=K(n),s=e.batch.batchId;try{const r=await ME(t.localStore,e);Zh(t,s,null),Jh(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await er(t,r)}catch(r){await Zn(r)}}async function Cv(n,e,t){const s=K(n);try{const r=await function(a,c){const u=K(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(p=>(te(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(s.localStore,e);Zh(s,e,t),Jh(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await er(s,r)}catch(r){await Zn(r)}}function Jh(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Zh(n,e,t){const s=K(n);let r=s.Vu[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),s.Vu[s.currentUser.toKey()]=r}}function Oo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Iu.get(e))n.Tu.delete(s),t&&n.Pu.yu(s,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(s=>{n.Ru.containsKey(s)||ef(n,s)})}function ef(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ra(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Va(n))}function mu(n,e,t){for(const s of t)s instanceof Kh?(n.Ru.addReference(s.key,e),Sv(n,s)):s instanceof Qh?($(Ma,"Document no longer in limbo: "+s.key),n.Ru.removeReference(s.key,e),n.Ru.containsKey(s.key)||ef(n,s.key)):H(19791,{wu:s})}function Sv(n,e){const t=e.key,s=t.path.canonicalString();n.du.get(t)||n.Eu.has(s)||($(Ma,"New document in limbo: "+t),n.Eu.add(s),Va(n))}function Va(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new q(se.fromString(e)),s=n.fu.next();n.Au.set(s,new gv(t)),n.du=n.du.insert(t,s),Fh(n.remoteStore,new Ft(at(wa(t.path)),s,"TargetPurposeLimboResolution",hi.ce))}}async function er(n,e,t){const s=K(n),r=[],i=[],a=[];s.Tu.isEmpty()||(s.Tu.forEach((c,u)=>{a.push(s.pu(u,e,t).then(d=>{var f;if((d||t)&&s.isPrimaryClient){const p=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;s.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){r.push(d);const p=Ca.As(u.targetId,d);i.push(p)}}))}),await Promise.all(a),s.Pu.H_(r),await async function(u,d){const f=K(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>M.forEach(d,_=>M.forEach(_.Es,T=>f.persistence.referenceDelegate.addReference(p,_.targetId,T)).next(()=>M.forEach(_.ds,T=>f.persistence.referenceDelegate.removeReference(p,_.targetId,T)))))}catch(p){if(!es(p))throw p;$(Sa,"Failed to update sequence numbers: "+p)}for(const p of d){const _=p.targetId;if(!p.fromCache){const T=f.Ms.get(_),A=T.snapshotVersion,R=T.withLastLimboFreeSnapshotVersion(A);f.Ms=f.Ms.insert(_,R)}}}(s.localStore,i))}async function Rv(n,e){const t=K(n);if(!t.currentUser.isEqual(e)){$(Ma,"User change. New user:",e.toKey());const s=await Mh(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(u=>{u.reject(new z(N.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await er(t,s.Ls)}}function Pv(n,e){const t=K(n),s=t.Au.get(e);if(s&&s.hu)return Z().add(s.key);{let r=Z();const i=t.Iu.get(e);if(!i)return r;for(const a of i){const c=t.Tu.get(a);r=r.unionWith(c.view.nu)}return r}}function tf(n){const e=K(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Yh.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Pv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Tv.bind(null,e),e.Pu.H_=hv.bind(null,e.eventManager),e.Pu.yu=fv.bind(null,e.eventManager),e}function kv(n){const e=K(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Av.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Cv.bind(null,e),e}class si{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ei(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return NE(this.persistence,new xE,e.initialUser,this.serializer)}Cu(e){return new Nh(Aa.mi,this.serializer)}Du(e){return new zE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}si.provider={build:()=>new si};class xv extends si{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){te(this.persistence.referenceDelegate instanceof ti,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new gE(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ze.withCacheSize(this.cacheSizeBytes):ze.DEFAULT;return new Nh(s=>ti.mi(s,t),this.serializer)}}class Fo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>fu(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=Rv.bind(null,this.syncEngine),await lv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new dv}()}createDatastore(e){const t=Ei(e.databaseInfo.databaseId),s=function(i){return new WE(i)}(e.databaseInfo);return function(i,a,c,u){return new XE(i,a,c,u)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,r,i,a,c){return new JE(s,r,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>fu(this.syncEngine,t,0),function(){return au.v()?new au:new $E}())}createSyncEngine(e,t){return function(r,i,a,c,u,d,f){const p=new yv(r,i,a,c,u,d);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const i=K(r);$(_n,"RemoteStore shutting down."),i.Ea.add(5),await Zs(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Fo.provider={build:()=>new Fo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class nf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):It("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="FirestoreClient";class Lv{constructor(e,t,s,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=r,this.user=ke.UNAUTHENTICATED,this.clientId=fa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async a=>{$(Jt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(s,a=>($(Jt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Da(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function ao(n,e){n.asyncQueue.verifyOperationInProgress(),$(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Mh(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function pu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Dv(n);$(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(s=>lu(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,r)=>lu(e.remoteStore,r)),n._onlineComponents=e}async function Dv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(Jt,"Using user provided OfflineComponentProvider");try{await ao(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===N.FAILED_PRECONDITION||r.code===N.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;qn("Error using user provided cache. Falling back to memory cache: "+t),await ao(n,new si)}}else $(Jt,"Using default OfflineComponentProvider"),await ao(n,new xv(void 0));return n._offlineComponents}async function sf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(Jt,"Using user provided OnlineComponentProvider"),await pu(n,n._uninitializedComponentsProvider._online)):($(Jt,"Using default OnlineComponentProvider"),await pu(n,new Fo))),n._onlineComponents}function Nv(n){return sf(n).then(e=>e.syncEngine)}async function rf(n){const e=await sf(n),t=e.eventManager;return t.onListen=_v.bind(null,e.syncEngine),t.onUnlisten=vv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=wv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Iv.bind(null,e.syncEngine),t}function Mv(n,e,t={}){const s=new wt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new nf({next:_=>{f.Nu(),a.enqueueAndForget(()=>Wh(i,p));const T=_.docs.has(c);!T&&_.fromCache?d.reject(new z(N.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&_.fromCache&&u&&u.source==="server"?d.reject(new z(N.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(_)},error:_=>d.reject(_)}),p=new Gh(wa(c.path),f,{includeMetadataChanges:!0,qa:!0});return Hh(i,p)}(await rf(n),n.asyncQueue,e,t,s)),s.promise}function Vv(n,e,t={}){const s=new wt;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,u,d){const f=new nf({next:_=>{f.Nu(),a.enqueueAndForget(()=>Wh(i,p)),_.fromCache&&u.source==="server"?d.reject(new z(N.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(_)},error:_=>d.reject(_)}),p=new Gh(c,f,{includeMetadataChanges:!0,qa:!0});return Hh(i,p)}(await rf(n),n.asyncQueue,e,t,s)),s.promise}/**
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
 */function of(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af="firestore.googleapis.com",yu=!0;class _u{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=af,this.ssl=yu}else this.host=e.host,this.ssl=e.ssl??yu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Dh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<mE)throw new z(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}J_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=of(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new z(N.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class bi{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _u({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _u(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new $_;switch(s.type){case"firstParty":return new W_(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new z(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=gu.get(t);s&&($("ComponentProvider","Removing Datastore"),gu.delete(t),s.terminate())}(this),Promise.resolve()}}function Bv(n,e,t,s={}){var d;n=Wt(n,bi);const r=Qn(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(Ju(`https://${c}`),Zu("Firestore",!0)),i.host!==af&&i.host!==c&&qn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:c,ssl:r,emulatorOptions:s};if(!mn(u,a)&&(n._setSettings(u),s.mockUserToken)){let f,p;if(typeof s.mockUserToken=="string")f=s.mockUserToken,p=ke.MOCK_USER;else{f=fp(s.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const _=s.mockUserToken.sub||s.mockUserToken.user_id;if(!_)throw new z(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ke(_)}n._authCredentials=new q_(new jd(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ns(this.firestore,e,this._query)}}class we{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ht(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new we(this.firestore,e,this._key)}toJSON(){return{type:we._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(Qs(t,we._jsonSchema))return new we(e,s||null,new q(se.fromString(t.referencePath)))}}we._jsonSchemaVersion="firestore/documentReference/1.0",we._jsonSchema={type:_e("string",we._jsonSchemaVersion),referencePath:_e("string")};class Ht extends ns{constructor(e,t,s){super(e,t,wa(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new we(this.firestore,null,new q(e))}withConverter(e){return new Ht(this.firestore,e,this._path)}}function ri(n,e,...t){if(n=Ue(n),Hd("collection","path",e),n instanceof bi){const s=se.fromString(e,...t);return xl(s),new Ht(n,null,s)}{if(!(n instanceof we||n instanceof Ht))throw new z(N.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(se.fromString(e,...t));return xl(s),new Ht(n.firestore,null,s)}}function Ti(n,e,...t){if(n=Ue(n),arguments.length===1&&(e=fa.newId()),Hd("doc","path",e),n instanceof bi){const s=se.fromString(e,...t);return kl(s),new we(n,null,new q(s))}{if(!(n instanceof we||n instanceof Ht))throw new z(N.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(se.fromString(e,...t));return kl(s),new we(n.firestore,n instanceof Ht?n.converter:null,new q(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu="AsyncQueue";class Eu{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Bh(this,"async_queue_retry"),this._c=()=>{const s=oo();s&&$(wu,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=oo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=oo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new wt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!es(e))throw e;$(wu,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,It("INTERNAL UNHANDLED ERROR: ",vu(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=La.createAndSchedule(this,e,t,s,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&H(47125,{Pc:vu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function vu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tr extends bi{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new Eu,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Eu(e),this._firestoreClient=void 0,await e}}}function Ov(n,e){const t=typeof n=="object"?n:sd(),s=typeof n=="string"?n:Kr,r=ea(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=dp("firestore");i&&Bv(r,...i)}return r}function Ba(n){if(n._terminated)throw new z(N.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Fv(n),n._firestoreClient}function Fv(n){var s,r,i;const e=n._freezeSettings(),t=function(c,u,d,f){return new lw(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,of(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(r=e.localCache)!=null&&r._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Lv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ge(Ce.fromBase64String(e))}catch(t){throw new z(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ge(Ce.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ge._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Qs(e,Ge._jsonSchema))return Ge.fromBase64String(e.bytes)}}Ge._jsonSchemaVersion="firestore/bytes/1.0",Ge._jsonSchema={type:_e("string",Ge._jsonSchemaVersion),bytes:_e("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new z(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new z(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new z(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ut._jsonSchemaVersion}}static fromJSON(e){if(Qs(e,ut._jsonSchema))return new ut(e.latitude,e.longitude)}}ut._jsonSchemaVersion="firestore/geoPoint/1.0",ut._jsonSchema={type:_e("string",ut._jsonSchemaVersion),latitude:_e("number"),longitude:_e("number")};/**
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
 */class dt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:dt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Qs(e,dt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new dt(e.vectorValues);throw new z(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}dt._jsonSchemaVersion="firestore/vectorValue/1.0",dt._jsonSchema={type:_e("string",dt._jsonSchemaVersion),vectorValues:_e("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uv=/^__.*__$/;class zv{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new In(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ys(e,this.data,t,this.fieldTransforms)}}function lf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H(40011,{Ac:n})}}class Fa{constructor(e,t,s,r,i,a){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Fa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.Vc({path:t,fc:!1});return s.gc(e),s}yc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.Vc({path:t,fc:!1});return s.Rc(),s}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return ii(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(lf(this.Ac)&&Uv.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class $v{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Ei(e)}Cc(e,t,s,r=!1){return new Fa({Ac:e,methodName:t,Dc:s,path:Ae.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ua(n){const e=n._freezeSettings(),t=Ei(n._databaseId);return new $v(n._databaseId,!!e.ignoreUndefinedProperties,t)}function uf(n,e,t,s,r,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,r);ff("Data must be an object, but it was:",a,s);const c=df(s,a);let u,d;if(i.merge)u=new Ye(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const _=jv(e,p,t);if(!a.contains(_))throw new z(N.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Wv(f,_)||f.push(_)}u=new Ye(f),d=a.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,d=a.fieldTransforms;return new zv(new We(c),u,d)}function qv(n,e,t,s=!1){return za(t,n.Cc(s?4:3,e))}function za(n,e){if(hf(n=Ue(n)))return ff("Unsupported field value:",e,n),df(n,e);if(n instanceof cf)return function(s,r){if(!lf(r.Ac))throw r.Sc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(s,r){const i=[];let a=0;for(const c of s){let u=za(c,r.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}}(n,e)}return function(s,r){if((s=Ue(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Lw(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=oe.fromDate(s);return{timestampValue:ei(r.serializer,i)}}if(s instanceof oe){const i=new oe(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:ei(r.serializer,i)}}if(s instanceof ut)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ge)return{bytesValue:Ch(r.serializer,s._byteString)};if(s instanceof we){const i=r.databaseId,a=s.firestore._databaseId;if(!a.isEqual(i))throw r.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ba(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof dt)return function(a,c){return{mapValue:{fields:{[eh]:{stringValue:th},[Qr]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return Ea(c.serializer,d)})}}}}}}(s,r);throw r.Sc(`Unsupported field value: ${di(s)}`)}(n,e)}function df(n,e){const t={};return Kd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):En(n,(s,r)=>{const i=za(r,e.mc(s));i!=null&&(t[s]=i)}),{mapValue:{fields:t}}}function hf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof ut||n instanceof Ge||n instanceof we||n instanceof cf||n instanceof dt)}function ff(n,e,t){if(!hf(t)||!Wd(t)){const s=di(t);throw s==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+s)}}function jv(n,e,t){if((e=Ue(e))instanceof Oa)return e._internalPath;if(typeof e=="string")return mf(n,e);throw ii("Field path arguments must be of type string or ",n,!1,void 0,t)}const Hv=new RegExp("[~\\*/\\[\\]]");function mf(n,e,t){if(e.search(Hv)>=0)throw ii(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Oa(...e.split("."))._internalPath}catch{throw ii(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ii(n,e,t,s,r){const i=s&&!s.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${s}`),a&&(u+=` in document ${r}`),u+=")"),new z(N.INVALID_ARGUMENT,c+n+u)}function Wv(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(e,t,s,r,i){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new we(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Gv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field($a("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Gv extends pf{data(){return super.data()}}function $a(n,e){return typeof e=="string"?mf(n,e):e instanceof Oa?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new z(N.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class qa{}class Qv extends qa{}function gf(n,e,...t){let s=[];e instanceof qa&&s.push(e),s=s.concat(t),function(i){const a=i.filter(u=>u instanceof ja).length,c=i.filter(u=>u instanceof Ai).length;if(a>1||a>0&&c>0)throw new z(N.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const r of s)n=r._apply(n);return n}class Ai extends Qv{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new Ai(e,t,s)}_apply(e){const t=this._parse(e);return _f(e._query,t),new ns(e.firestore,e.converter,Po(e._query,t))}_parse(e){const t=Ua(e.firestore);return function(i,a,c,u,d,f,p){let _;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new z(N.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){bu(p,f);const A=[];for(const R of p)A.push(Iu(u,i,R));_={arrayValue:{values:A}}}else _=Iu(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||bu(p,f),_=qv(c,a,p,f==="in"||f==="not-in");return ye.create(d,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function yf(n,e,t){const s=e,r=$a("where",n);return Ai._create(r,s,t)}class ja extends qa{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ja(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,i){let a=r;const c=i.getFlattenedFilters();for(const u of c)_f(a,u),a=Po(a,u)}(e._query,t),new ns(e.firestore,e.converter,Po(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Iu(n,e,t){if(typeof(t=Ue(t))=="string"){if(t==="")throw new z(N.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!lh(e)&&t.indexOf("/")!==-1)throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(se.fromString(t));if(!q.isDocumentKey(s))throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return Fl(n,new q(s))}if(t instanceof we)return Fl(n,t._key);throw new z(N.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${di(t)}.`)}function bu(n,e){if(!Array.isArray(n)||n.length===0)throw new z(N.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function _f(n,e){const t=function(r,i){for(const a of r)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new z(N.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new z(N.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Xv{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return he(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Qt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return En(e,(r,i)=>{s[r]=this.convertValue(i,t)}),s}convertVectorValue(e){var s,r,i;const t=(i=(r=(s=e.fields)==null?void 0:s[Qr].arrayValue)==null?void 0:r.values)==null?void 0:i.map(a=>he(a.doubleValue));return new dt(t)}convertGeoPoint(e){return new ut(he(e.latitude),he(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=mi(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Fs(e));default:return null}}convertTimestamp(e){const t=Kt(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=se.fromString(e);te(Lh(s),9688,{name:e});const r=new Us(s.get(1),s.get(3)),i=new q(s.popFirst(5));return r.isEqual(t)||It(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wf(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class Cs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hn extends pf{constructor(e,t,s,r,i,a){super(e,t,s,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Dr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field($a("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=hn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",hn._jsonSchema={type:_e("string",hn._jsonSchemaVersion),bundleSource:_e("string","DocumentSnapshot"),bundleName:_e("string"),bundle:_e("string")};class Dr extends hn{data(e={}){return super.data(e)}}class On{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Cs(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new Dr(this._firestore,this._userDataWriter,s.key,s,new Cs(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new z(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const u=new Dr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Cs(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const u=new Dr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Cs(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Yv(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=On._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Yv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ef(n){n=Wt(n,we);const e=Wt(n.firestore,tr);return Mv(Ba(e),n._key).then(t=>Zv(e,n,t))}On._jsonSchemaVersion="firestore/querySnapshot/1.0",On._jsonSchema={type:_e("string",On._jsonSchemaVersion),bundleSource:_e("string","QuerySnapshot"),bundleName:_e("string"),bundle:_e("string")};class vf extends Xv{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ge(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new we(this.firestore,null,t)}}function If(n){n=Wt(n,ns);const e=Wt(n.firestore,tr),t=Ba(e),s=new vf(e);return Kv(n._query),Vv(t,n._query).then(r=>new On(e,s,n,r))}function Jv(n,e,t){n=Wt(n,we);const s=Wt(n.firestore,tr),r=wf(n.converter,e,t);return bf(s,[uf(Ua(s),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,ct.none())])}function Tu(n,e){const t=Wt(n.firestore,tr),s=Ti(n),r=wf(n.converter,e);return bf(t,[uf(Ua(n.firestore),"addDoc",s._key,r,n.converter!==null,{}).toMutation(s._key,ct.exists(!1))]).then(()=>s)}function bf(n,e){return function(s,r){const i=new wt;return s.asyncQueue.enqueueAndForget(async()=>bv(await Nv(s),r,i)),i.promise}(Ba(n),e)}function Zv(n,e,t){const s=t.docs.get(e._key),r=new vf(n);return new hn(n,r,e._key,s,new Cs(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(r){Jn=r})(Xn),zn(new pn("firestore",(s,{instanceIdentifier:r,options:i})=>{const a=s.getProvider("app").getImmediate(),c=new tr(new j_(s.getProvider("auth-internal")),new G_(a,s.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new z(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Us(d.options.projectId,f)}(a,r),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),qt(Cl,Sl,e),qt(Cl,Sl,"esm2020")})();const eI={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},Tf=nd(eI),je=U_(Tf);Ad(je,la).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const wn=Ov(Tf),tI=new gt,nI="./data.csv";let ln=null,oi=null;window.initUI=Vf;window.setGridSize=xI;document.addEventListener("DOMContentLoaded",()=>{const n=(e,t)=>{try{t()}catch(s){console.error(`Initialization failed for ${e}:`,s)}};n("Collection State",rI),n("Spares",iI),n("Filters",oI),n("Tab Navigation",fI),n("Switch Tab",()=>on(m.currentTab)),n("Collection Filters",Ka),n("Auth",uI),n("Event Banner",mI),n("Blueprint Submission",pI),n("Wrapped",TI),n("Announcements",AI),n("Sidebar",zI),n("Context Menu",$I),n("Data Loading",VI)});const Es="./images/",sI="./icons/",pt=new Map;function Uo(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['â€™]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const Au={Light_Stick__Any_Color:"Blue_Light_Stick"},Af="arc_collection_v1";function rI(){try{const n=localStorage.getItem(Af);if(n){const e=JSON.parse(n);Array.isArray(e)?m.collectedItems=new Set(e):(e.collected&&(m.collectedItems=new Set(e.collected)),e.wishlist&&(m.wishlistedItems=new Set(e.wishlist)),m.collectedItems.forEach(t=>{m.wishlistedItems.has(t)&&m.wishlistedItems.delete(t)}))}}catch(n){console.error("Failed to load collection state:",n)}}function Fn(){try{const n={collected:Array.from(m.collectedItems),wishlist:Array.from(m.wishlistedItems)};localStorage.setItem(Af,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const Cf="arc_spares_v1";function iI(){try{const n=localStorage.getItem(Cf);n&&(m.spares=JSON.parse(n))}catch(n){console.error("Failed to load spares:",n)}}function Cu(){try{localStorage.setItem(Cf,JSON.stringify(m.spares))}catch(n){console.error("Failed to save spares:",n)}}const Sf="arc_filters_v1";function Fe(){try{const n={rarities:Array.from(m.filters.rarities),types:Array.from(m.filters.types),maps:Array.from(m.filters.maps),conds:Array.from(m.filters.conds),confs:Array.from(m.filters.confs),collected:m.filters.collected,sort:m.filters.sort,sortBlueprints:m.filters.sortBlueprints,sortData:m.filters.sortData};localStorage.setItem(Sf,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function oI(){try{const n=localStorage.getItem(Sf);if(n){const e=JSON.parse(n);e.rarities&&(m.filters.rarities=new Set(e.rarities)),e.types&&(m.filters.types=new Set(e.types)),e.maps&&(m.filters.maps=new Set(e.maps)),e.conds&&(m.filters.conds=new Set(e.conds)),e.confs&&(m.filters.confs=new Set(e.confs)),e.collected&&(m.filters.collected=e.collected),e.sort&&(m.filters.sortBlueprints=e.sort),e.sortBlueprints&&(m.filters.sortBlueprints=e.sortBlueprints),e.sortData&&(m.filters.sortData=e.sortData)}}catch(n){console.error("Failed to load filters:",n)}}function fn(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(i=>i.remove());const t=m.collectedItems.has(e),s=m.wishlistedItems.has(e);if(t){const i=document.createElement("div");i.className="collected-badge",i.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(i);const a=document.createElement("div");a.className="collected-glow",n.appendChild(a)}else if(s){const i=document.createElement("div");i.className="wishlist-badge",i.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(i);const a=document.createElement("div");a.className="wishlist-glow",n.appendChild(a)}if(m.currentTab==="collection"){let i="",a="",c=!1;if(t?(i='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',a="Click to Wishlist",c=!0):s?(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a="Click To Unwishlist",c=!0):(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',a="Click to Collect",c=!0),c){const u=document.createElement("div");u.className="collection-hint",u.innerHTML=`
          <div class="collection-hint-icon">${i}</div>
          <div class="collection-hint-text">${a}</div>
        `,(t||s)&&u.classList.add("hint-hidden"),n.appendChild(u)}}let r=n.querySelector(".mass-collect-overlay");r&&(t?(r.classList.add("overlay-collected"),r.querySelector(".mass-collect-text").textContent="Collected"):(r.classList.remove("overlay-collected"),r.querySelector(".mass-collect-text").innerHTML="Click to<br>Collect"))}function Nr(){if(!document.getElementById("collectionProgressContainer"))return;const e=m.all.length,t=new Set(m.all.map(u=>u.name)),s=[...m.collectedItems].filter(u=>t.has(u)).length,r=e>0?Math.round(s/e*100):0,i=document.getElementById("progressPercent"),a=document.getElementById("progressCount");i&&(i.textContent=`${r}%`),a&&(a.textContent=`${s} / ${e}`);const c=document.getElementById("progressBar");if(c){c.style.width=`${r}%`;const u=Math.floor(r*1.2);c.style.backgroundColor=`hsl(${u}, 80%, 50%)`,c.style.backgroundImage="none"}}function aI(n,e,t,s){if(!n)return;let r=null;const i=a=>{r||(r=a);const c=Math.min((a-r)/s,1),u=Math.floor(c*(t-e)+e);n.textContent=`${u}%`,c<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const s=document.getElementById("progressBar"),r=document.getElementById("progressPercent"),i=m.all.length,a=new Set(m.all.map(d=>d.name)),c=[...m.collectedItems].filter(d=>a.has(d)).length,u=i>0?Math.round(c/i*100):0;s&&(s.style.transition="none",s.style.width="0%",s.style.backgroundColor="hsl(0, 80%, 50%)"),r&&(r.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{s&&(s.style.transition="width 1.75s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 1.75s linear",Nr()),r&&aI(r,0,u,1750)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function zo(){if(je.currentUser)try{const n=Ti(wn,"users",je.currentUser.uid);await Jv(n,{collectedItems:Array.from(m.collectedItems),wishlistedItems:Array.from(m.wishlistedItems),spares:m.spares,lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function cI(n){try{console.log("Loading collection from cloud...");const e=Ti(wn,"users",n.uid),t=await Ef(e);if(t.exists()){const s=t.data();let r=!1;if(s.collectedItems){const i=new Set(s.collectedItems),a=m.collectedItems.size;i.forEach(c=>{m.collectedItems.add(c),m.wishlistedItems.delete(c)}),m.collectedItems.size>a&&(r=!0)}if(s.wishlistedItems){const i=new Set(s.wishlistedItems),a=m.wishlistedItems.size;i.forEach(c=>{m.collectedItems.has(c)||m.wishlistedItems.add(c)}),m.wishlistedItems.size>a&&(r=!0),m.wishlistedItems.size>a&&(r=!0)}s.spares&&Object.entries(s.spares).forEach(([i,a])=>{const c=m.spares[i]||0;a>c&&(m.spares[i]=a,r=!0)}),r&&(console.log("Cloud sync merged new items."),Fn(),ge(),zo())}else console.log("No cloud data found for user. Creating initial sync..."),zo()}catch(e){console.error("Loading from cloud failed:",e)}}async function lI(){if(je.currentUser){m.wrappedData.loading=!0;try{const n=gf(ri(wn,"blueprintSubmissions"),yf("userId","==",je.currentUser.uid)),e=await If(n);m.wrappedData.contributionCount=e.size,console.log(`User has submitted ${e.size} reports.`)}catch(n){console.error("Failed to fetch user contributions:",n)}finally{m.wrappedData.loading=!1}}}function uI(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),s=document.getElementById("logoutBtnMobile"),r=async()=>{try{console.log("Attempting Google Sign-in..."),await Ad(je,la),await Qy(je,tI),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert(`Domain unauthorized (${window.location.hostname}). To test mobile, use your LIVE site (arc-blueprint-tracker.web.app) or whitelist this IP in Firebase Console.`):alert("Sign-in failed: "+a.message)}},i=()=>ky(je).catch(console.error);n&&(n.onclick=r),e&&(e.onclick=r),t&&(t.onclick=i),s&&(s.onclick=i),Py(je,a=>{document.getElementById("authSection");const c=document.getElementById("userProfile");document.getElementById("authSectionMobile");const u=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),c&&c.classList.remove("hidden"),u&&u.classList.remove("hidden");const d=document.getElementById("userPhoto"),f=document.getElementById("userName"),p=document.getElementById("userPhotoMobile"),_=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),f&&(f.textContent=a.displayName||"Explorer"),p&&(p.src=a.photoURL||""),_&&(_.textContent=a.displayName||"Explorer"),cI(a),m.currentTab==="progression"&&Pf()}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),c&&c.classList.add("hidden"),u&&u.classList.add("hidden")})}function Rf(n,e){const t=document.createElement("div");t.className="card-compact bg-zinc-950 border border-zinc-800/50 rounded-2xl p-2",t.style.position="relative",t.style.overflow="visible",t.style.setProperty("--glow-color",xe(n.rarity)),t.dataset.name=n.name;const s=document.createElement("div");s.className="rarity-frame rarity-glow relative overflow-hidden",s.style.borderColor=xe(n.rarity);const r=document.createElement("div");r.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",r.style.background=`
    linear-gradient(to top right, ${xe(n.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
    linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
    url('Background/Arc BP Image Background.webp')
  `,r.style.backgroundSize="cover, cover, cover",r.style.backgroundPosition="center, center, center",r.style.backgroundBlendMode="normal, normal, normal",r.style.aspectRatio="1 / 1",r.style.width="100%";const i=document.createElement("img");i.src=n.img||"",i.alt=n.name,i.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",i.style.width="100%",i.style.height="100%",i.style.objectFit="contain",i.style.padding="8px",i.loading="lazy",i.draggable=!1,i.style.webkitTouchCallout="none",i.style.userSelect="none";const a=document.createElement("div");a.className="rarity-corner",a.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${xe(n.rarity)}66 60%, ${xe(n.rarity)}cc 100%)`;const c=document.createElement("div");c.className="type-tab",c.style.background=xe(n.rarity)+"22",c.style.borderColor=xe(n.rarity);const u=document.createElement("img");u.src=n.typeIcon,u.alt=n.type;const d=document.createElement("span");d.textContent=n.type||"â€”",c.appendChild(u),c.appendChild(d),r.appendChild(i),r.appendChild(a),r.appendChild(c);const f=document.createElement("div");f.className="mt-2 px-1 pb-1";const p=document.createElement("div");if(p.className="font-semibold leading-tight",p.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",p.textContent=n.name,f.appendChild(p),s.appendChild(r),m.collectedItems.has(n.name)){const _=document.createElement("div");_.className="collected-badge",_.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',s.appendChild(_);const T=document.createElement("div");T.className="collected-glow",s.appendChild(T)}return t.appendChild(s),t.appendChild(f),t}async function Pf(){const n=je.currentUser;if(!n){console.log("[UserStats] No user logged in, skipping fetch"),co(0,"N/A",0,[]);return}try{console.log("[UserStats] Fetching submissions for user:",n.uid);const e=gf(ri(wn,"blueprintSubmissions"),yf("userId","==",n.uid)),t=await If(e),s=[];t.forEach(d=>{s.push({id:d.id,...d.data()})}),console.log("[UserStats] Found",s.length,"submissions");const r=s.length,i={};s.forEach(d=>{d.map&&d.map!=="N/A"&&(i[d.map]=(i[d.map]||0)+1)});let a="N/A",c=0;for(const[d,f]of Object.entries(i))f>c&&(a=d,c=f);const u=s.filter(d=>d.blueprintName).sort((d,f)=>d.submittedAt&&f.submittedAt?new Date(f.submittedAt)-new Date(d.submittedAt):0).slice(0,5);console.log("[UserStats] sortedSubs:",u.map(d=>({name:d.blueprintName,date:d.submittedAt}))),s.forEach(d=>{d.blueprintName&&m.collectedItems.add(d.blueprintName)}),Fn(),co(r,a,c,u)}catch(e){console.error("[UserStats] Error fetching user stats:",e),co(0,"N/A",0,[])}}function co(n,e,t,s){const r=document.getElementById("userStatsSection"),i=document.getElementById("statSubmissionCount"),a=document.getElementById("statBestMap"),c=document.getElementById("statBestMapCount"),u=document.getElementById("recentFindsGrid");if(!(!r||!i||!a||!u)){if(n===0){r.classList.add("hidden");return}i.textContent=n,a.textContent=e,c&&(c.textContent=`(${t})`),r.classList.remove("hidden"),u.innerHTML="",console.log("[UserStats] Rendering recent items:",s.length),console.log("[UserStats] state.all has",m.all.length,"items"),s.forEach((d,f)=>{const p=m.all.find(_=>_.name===d.blueprintName);if(console.log(`[UserStats] Item ${f}: blueprintName="${d.blueprintName}", found=${!!p}`),p){const _=Rf(p);u.appendChild(_)}}),console.log("[UserStats] Grid now has",u.children.length,"children")}}function dI(){const n=document.getElementById("progressionTab");if(document.getElementById("filtersSidebar"),!n||n.classList.contains("hidden"))return;const e=m.all.length,t=new Set(m.all.map(A=>A.name)),s=m.collectedItems?[...m.collectedItems].filter(A=>t.has(A)).length:0;if(e===0)return;const r=Math.round(s/e*100),i=document.getElementById("progressionBarMain"),a=document.getElementById("progressionSign"),c=document.getElementById("progressionCount"),u=document.getElementById("progressionTotal");if(u&&(u.textContent=e),i){i.style.transition="none",i.style.width="0%",i.style.backgroundImage="none",i.style.backgroundColor="hsl(340, 80%, 50%)",i.offsetWidth;const A=r/100*1750;let R=null;const C=x=>{R||(R=x);const D=x-R;let V=Math.min(D/A,1);V=1-Math.pow(1-V,2);const U=V*r,B=Math.floor(V*s);i.style.width=`${U}%`,a&&(a.textContent=`${Math.floor(U)}%`),c&&(c.textContent=B);let E=340+U/100*140;E>=360&&(E-=360),i.style.backgroundColor=`hsl(${E}, 80%, 50%)`,i.style.boxShadow=`0 0 20px hsl(${E}, 80%, 40%)`,V<1?requestAnimationFrame(C):(a&&(a.textContent=`${r}%`),c&&(c.textContent=s))};requestAnimationFrame(C)}const d=document.getElementById("progressionCategories");if(!d)return;d.innerHTML="";const f={Augment:{border:"rgba(251,199,0,0.5)",bg:"rgba(251,199,0,0.1)",barFrom:"#FBC700",barTo:"#f59e0b",icon:"rgba(251,199,0,0.2)",text:"#FBC700"},Weapon:{border:"rgba(216,41,155,0.5)",bg:"rgba(216,41,155,0.1)",barFrom:"#D8299B",barTo:"#ec4899",icon:"rgba(216,41,155,0.2)",text:"#D8299B"},"Quick Use":{border:"rgba(30,203,252,0.5)",bg:"rgba(30,203,252,0.1)",barFrom:"#1ECBFC",barTo:"#06b6d4",icon:"rgba(30,203,252,0.2)",text:"#1ECBFC"},Grenade:{border:"rgba(65,235,106,0.5)",bg:"rgba(65,235,106,0.1)",barFrom:"#41EB6A",barTo:"#34d399",icon:"rgba(65,235,106,0.2)",text:"#41EB6A"},Mod:{border:"rgba(255,255,255,0.5)",bg:"rgba(255,255,255,0.05)",barFrom:"#ffffff",barTo:"#d4d4d8",icon:"rgba(255,255,255,0.15)",text:"#ffffff"},Material:{border:"rgba(113,116,113,0.5)",bg:"rgba(113,116,113,0.1)",barFrom:"#717471",barTo:"#a1a1aa",icon:"rgba(113,116,113,0.2)",text:"#a1a1aa"},default:{border:"rgba(255,255,255,0.3)",bg:"rgba(255,255,255,0.05)",barFrom:"#52525b",barTo:"#a1a1aa",icon:"rgba(255,255,255,0.1)",text:"#d4d4d8"}},p={};m.all.forEach(A=>{const R=A.type||"Unknown";p[R]||(p[R]={total:0,collected:0,icon:A.typeIcon}),p[R].total++,m.collectedItems&&m.collectedItems.has(A.name)&&p[R].collected++});const _=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];Object.keys(p).sort((A,R)=>{const C=_.indexOf(A),x=_.indexOf(R);return C===-1&&x===-1?A.localeCompare(R):C===-1?1:x===-1?-1:C-x}).forEach(A=>{const R=p[A],C=Math.round(R.collected/R.total*100);console.log("Category type:",A,"Has color?",!!f[A]);const x=f[A]||f.default,D=document.createElement("div");D.className="relative overflow-hidden rounded-2xl backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl hover:brightness-110 transition-all duration-300 group",D.style.border=`2px solid ${x.border}`,D.style.backgroundColor=x.bg;const V=document.createElement("div");V.className="flex items-center gap-4 z-10";const U=document.createElement("div");if(U.className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner",U.style.backgroundColor=x.icon,R.icon){const v=document.createElement("img");v.src=R.icon,v.className="w-7 h-7 opacity-90 drop-shadow-md",U.appendChild(v)}const B=document.createElement("div"),O=document.createElement("div");O.className="text-base font-bold tracking-wide",O.style.color=x.text,O.textContent=A;const E=document.createElement("div");E.className="text-sm text-zinc-500 font-mono",E.textContent=`${R.collected} / ${R.total}`,B.appendChild(O),B.appendChild(E),V.appendChild(U),V.appendChild(B);const g=document.createElement("div");g.className="relative h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 z-10";const w=document.createElement("div");w.className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out",w.style.background=`linear-gradient(to right, ${x.barFrom}, ${x.barTo})`,w.style.width="0%",requestAnimationFrame(()=>{w.style.width=`${C}%`}),g.appendChild(w),D.appendChild(V),D.appendChild(g);const b=document.createElement("div");b.className=`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${x.bar} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity pointer-events-none`,D.appendChild(b),d.appendChild(D)})}function hI(n){const e=document.getElementById("sortSelect"),t=document.getElementById("sortSelectMobile");let s="";n==="data"?s=`
      <option value="rarity_desc">Rarity (High → Low)</option>
      <option value="rarity_asc">Rarity (Low → High)</option>
      <option value="conf_desc">Confidence (High → Low)</option>
      <option value="conf_asc">Confidence (Low → High)</option>
      <option value="name_asc">Name (A → Z)</option>
      <option value="name_desc">Name (Z → A)</option>
    `:s=`
      <option value="rarity_desc">Rarity (High → Low)</option>
      <option value="rarity_asc">Rarity (Low → High)</option>
      <option value="name_asc">Name (A → Z)</option>
      <option value="name_desc">Name (Z → A)</option>
      <option value="type_asc">Type (A → Z)</option>
    `,e&&(e.innerHTML=s,n==="data"?e.value=m.filters.sortData||"rarity_desc":e.value=m.filters.sortBlueprints||"rarity_desc"),t&&(t.innerHTML=s,n==="data"?t.value=m.filters.sortData||"rarity_desc":t.value=m.filters.sortBlueprints||"rarity_desc")}function on(n){var V,U;m.currentTab=n,window.scrollTo(0,0),hI(n==="data"?"data":"blueprints"),typeof Qo=="function"&&Qo(n);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabProgression"),s=document.getElementById("tabData");[e,t,s].forEach(B=>{B&&B.classList.remove("tab-button-active")}),n==="blueprints"&&e&&e.classList.add("tab-button-active"),n==="progression"&&t&&t.classList.add("tab-button-active"),n==="data"&&s&&s.classList.add("tab-button-active"),document.getElementById("gridSection");const r=document.getElementById("grid"),i=document.getElementById("emptyState");document.querySelectorAll(".filter-section-desktop");const a=document.getElementById("progressionTab"),c=document.getElementById("dataTab"),u=document.getElementById("submitLocationFab");u&&(n==="blueprints"?u.classList.remove("hidden"):u.classList.add("hidden"));const d=n==="blueprints",f=document.getElementById("gridHeader");f&&(d?(f.classList.remove("hidden"),f.classList.add("flex")):(f.classList.add("hidden"),f.classList.remove("flex")));const p=document.getElementById("blueprintSearchBar");p&&(d?p.classList.remove("hidden"):p.classList.add("hidden")),r&&(d?(ge(),r.classList.remove("hidden")):(r.classList.add("hidden"),i&&i.classList.add("hidden"))),a&&(n==="progression"?(a.classList.remove("hidden"),dI(),Pf()):a.classList.add("hidden")),c&&(n==="data"?(c.classList.remove("hidden"),typeof Wo=="function"&&(!m.detailedData||m.detailedData.length===0)?Wo():typeof Tt=="function"&&Tt()):c.classList.add("hidden"));const _=document.getElementById("desktopFilterBtn"),T=document.getElementById("mobileFilterBtn"),A=document.getElementById("filtersSidebar"),R=document.getElementById("drawer"),C=n==="progression";A&&A.querySelectorAll(".filter-options").forEach(B=>{C?B.classList.add("hidden"):B.classList.remove("hidden")}),R&&R.querySelectorAll(".filter-options").forEach(B=>{C?B.classList.add("hidden"):B.classList.remove("hidden")});const x=(V=document.getElementById("gridSize"))==null?void 0:V.closest(".filter-options");x&&(n==="data"?x.classList.add("hidden"):C||x.classList.remove("hidden"));const D=(U=document.getElementById("gridSizeMobile"))==null?void 0:U.closest(".filter-options");D&&(n==="data"?D.classList.add("hidden"):C||D.classList.remove("hidden")),A&&(_&&(_.classList.remove("opacity-50","pointer-events-none"),_.classList.add("cursor-pointer")),T&&(T.classList.remove("opacity-50","pointer-events-none"),T.classList.add("cursor-pointer")),m.filtersOpen?(A.classList.add("hidden"),A.classList.remove("md:hidden"),A.classList.add("md:block")):(A.classList.add("hidden"),A.classList.remove("md:block")))}function fI(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabProgression"),t=document.getElementById("tabData"),s=document.getElementById("logoHome"),r=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>on("blueprints")),e&&(e.onclick=()=>on("progression")),t&&(t.onclick=()=>on("data")),s&&(s.onclick=()=>on("blueprints")),r&&(r.onclick=()=>on("blueprints"))}let Su=!1;window.menuCloseTimer=null;function Ha(){document.querySelectorAll(".details-overlay:not(.hidden)").forEach(e=>{e.classList.add("hidden"),e.style.transform=""}),document.querySelectorAll(".card-open").forEach(e=>{e.classList.remove("card-open"),e.style.zIndex=""}),document.querySelectorAll(".card-selected").forEach(e=>{e.classList.remove("card-selected")});const n=document.getElementById("itemContextMenu");n&&!n.classList.contains("hidden")&&(n.classList.add("opacity-0"),window.menuCloseTimer&&clearTimeout(window.menuCloseTimer),window.menuCloseTimer=setTimeout(()=>{n.classList.add("hidden"),window.menuCloseTimer=null},150))}function kf(n,e="details"){if(Ha(),!!n&&(n.classList.add("card-selected"),e==="details")){const t=n.querySelector(".details-overlay");t&&(t.classList.remove("hidden"),n.classList.add("card-open"),n.style.zIndex="50")}}function mI(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;Ef(Ti(wn,"siteConfig","banner")).then(s=>{if(s.exists()){const r=s.data();r.active&&r.text&&t&&n&&(t.innerHTML=r.text,n.classList.add("banner-active"),!Su&&m.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(s=>console.debug("Banner fetch skipped",s)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),Su=!0})}function pI(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),s=document.getElementById("closeSubmitModal"),r=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>Ru()),e&&(e.onclick=()=>{Ci(),oi&&Ru(oi)}),s&&(s.onclick=()=>$o()),t&&(t.onclick=i=>{i.target===t&&$o()}),r&&(r.onsubmit=async i=>{i.preventDefault(),await CI()}),EI(),WI()}function gI(){const n=document.getElementById("submitBlueprintName");if(!(!n||!m.all||m.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of m.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function Ru(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");gI(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function $o(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),s=document.getElementById("submitQuestReward");t&&(t.checked=!1),s&&(s.checked=!1)}oi=null,Df(),Wa(),window.clearMapSelection&&window.clearMapSelection()}const yI="https://docs.google.com/spreadsheets/d/e/2PACX-1vQbaBK3sAyL1kD1-NanKQgkyzerRXtQUReQu57W_xn68GxST_A4Ws1z3iwOAOZJ52-ZBztvGiDq16Go/pub?output=csv",xf="./images/Containers/";async function _I(){var n,e,t;if(m.containers||(m.containers=[],m.containersLoaded=!1),!(m.containersLoaded&&m.containers.length>0))try{const i=(await(await fetch(yI)).text()).split(/\r?\n/).filter(a=>a.trim());if(i.length<2)return;m.containers=[];for(let a=1;a<i.length;a++){const c=wI(i[a]);c.length>=4&&c[0]&&m.containers.push({name:c[0].trim(),lootPool:((n=c[1])==null?void 0:n.trim())||"Standard",tags:((e=c[2])==null?void 0:e.trim().toLowerCase())||"",image:((t=c[3])==null?void 0:t.trim())||""})}m.containersLoaded=!0}catch(s){console.error("Failed to fetch containers:",s)}}function wI(n){const e=[];let t="",s=!1;for(let r=0;r<n.length;r++){const i=n[r];i==='"'?s=!s:i===","&&!s?(e.push(t),t=""):t+=i}return e.push(t),e}function EI(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("clearContainerBtn"),s=document.getElementById("containerPickerModal"),r=document.getElementById("closeContainerPickerBtn"),i=document.getElementById("containerPickerSearch");document.getElementById("containerPickerGrid");const a=document.getElementById("containerPickerCustomBtn"),c=document.getElementById("hideCustomContainerBtn");n&&n.addEventListener("click",async()=>{await Pu()}),e&&e.addEventListener("click",async u=>{u.target.closest("#clearContainerBtn")||await Pu()}),r&&r.addEventListener("click",()=>{Mr()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),Df()}),i&&i.addEventListener("input",u=>{Lf(u.target.value)}),a&&a.addEventListener("click",()=>{Mr(),II()}),c&&c.addEventListener("click",()=>{Wa()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&s&&!s.classList.contains("hidden")&&Mr()})}async function Pu(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(await _I(),n.classList.remove("hidden"),n.classList.add("flex"),Lf(""),setTimeout(()=>{e&&e.focus()},200))}function Mr(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(n.classList.add("hidden"),n.classList.remove("flex"),e&&(e.value=""))}function Lf(n){const e=document.getElementById("containerPickerGrid");if(!e||!m.containers)return;const t=n.toLowerCase().trim(),s=m.containers.filter(r=>t?r.name.toLowerCase().includes(t)||r.tags.includes(t):!0);if(e.innerHTML="",s.length===0){e.innerHTML=`
      <div class="col-span-full py-12 text-center text-zinc-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-sm">No containers found for "${n}"</p>
      </div>
    `;return}for(const r of s){const i=document.createElement("div");i.className="container-picker-card",i.innerHTML=`
      <img src="${xf}${r.image}" alt="${r.name}" loading="lazy" class="w-full h-24 object-cover rounded-lg mb-1.5" />
      <div class="card-name text-white leading-tight font-bold">${r.name}</div>
      <div class="card-pool text-zinc-400 mt-0.5">${r.lootPool}</div>
    `,i.addEventListener("click",()=>{vI(r)}),e.appendChild(i)}}function vI(n){const e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay"),s=document.getElementById("selectedContainerImg"),r=document.getElementById("selectedContainerName"),i=document.getElementById("submitContainer");e&&e.classList.add("hidden"),t&&(t.classList.remove("hidden"),t.classList.add("flex")),s&&(s.src=xf+n.image),r&&(r.textContent=n.name),i&&(i.value=n.name),Mr(),Wa()}function Df(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("submitContainer");n&&n.classList.remove("hidden"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),t&&(t.value="")}function II(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay");n&&n.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&(t.classList.add("hidden"),t.classList.remove("flex"))}function Wa(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("customContainerName"),s=document.getElementById("customContainerDescription"),r=document.getElementById("customContainerScreenshot");n&&n.classList.add("hidden"),e&&e.classList.remove("hidden"),t&&(t.value=""),s&&(s.value=""),r&&(r.value="")}function bI(){const n=document.getElementById("customContainerForm"),e=document.getElementById("customContainerName");if(n&&!n.classList.contains("hidden")&&(e!=null&&e.value.trim()))return`CUSTOM: ${e.value.trim()}`;const t=document.getElementById("submitContainer");return(t==null?void 0:t.value)||""}function TI(){const n=document.getElementById("showWrappedBtn"),e=document.getElementById("wrappedModal"),t=document.getElementById("closeWrappedBtn"),s=document.getElementById("downloadWrappedBtn");if(!n||!e)return;const r=d=>{const f=document.getElementById("wrappedOuterContainer"),p=document.getElementById("wrappedInner"),_=document.getElementById("wrappedContent"),T=document.getElementById("wrappedShimmer"),A=document.getElementById("wrappedActions"),R=document.getElementById("captureModeActions"),C=document.getElementById("wrappedModal");if(d){const x=window.innerWidth/896;if(f&&(f.style.setProperty("background","none","important"),f.style.setProperty("box-shadow","none","important"),f.style.setProperty("padding","0","important"),f.style.setProperty("border-radius","0","important")),p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${x})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.setProperty("gap","0","important");const D=896*(1-x);p.style.setProperty("margin-bottom",`- ${D} px`,"important")}_&&_.style.setProperty("border-radius","0","important"),T&&T.classList.add("hidden"),A&&A.classList.add("hidden"),R&&R.classList.remove("hidden"),C&&(C.style.setProperty("padding","0","important"),C.style.setProperty("overflow-x","hidden","important"),C.style.setProperty("overflow-y","hidden","important"),C.scrollTo(0,0))}else{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<800){const D=(window.innerWidth-32)/896;if(p){p.style.setProperty("width","896px","important"),p.style.setProperty("transform",`scale(${D})`,"important"),p.style.setProperty("transform-origin","top center","important"),p.style.removeProperty("gap");const V=896*(1-D);p.style.setProperty("margin-bottom",`- ${V} px`,"important")}}else p&&(p.style.removeProperty("width"),p.style.removeProperty("transform"),p.style.removeProperty("transform-origin"),p.style.removeProperty("gap"),p.style.removeProperty("margin-bottom"));f&&(f.style.removeProperty("background"),f.style.removeProperty("box-shadow"),f.style.removeProperty("padding"),f.style.removeProperty("border-radius")),_&&_.style.removeProperty("border-radius"),T&&T.classList.remove("hidden"),A&&A.classList.remove("hidden"),R&&R.classList.add("hidden"),C&&(C.style.removeProperty("padding"),C.style.removeProperty("overflow-x"),C.style.removeProperty("overflow-y"),setTimeout(()=>C.scrollTo(0,0),20))}},i=document.getElementById("exitCaptureBtn");i&&(i.onclick=()=>r(!1));const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;if(a&&s){const d=s.cloneNode(!0);s.parentNode.replaceChild(d,s),d.innerHTML='< svg class="w-5 h-5" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg > Fullscreen for Screenshot',d.className="flex-[2] md:flex-none px-8 py-3 h-14 md:h-auto text-xl md:text-base rounded-full bg-emerald-600 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform",d.onclick=()=>r(!0)}if(n.onclick=async()=>{const d=document.getElementById("submitLocationFab");d&&d.classList.add("hidden"),je.currentUser&&(n.disabled=!0,n.textContent="Loading Data...",await lI(),n.disabled=!1,n.innerHTML='< svg class= "w-4 h-4" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg > View My Blueprint Wrapped 2025',n.className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[10px] sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95");const f=m.all.length,p=new Set(m.all.map(j=>j.name)),_=[...m.collectedItems].filter(j=>p.has(j)).length,T=f>0?Math.round(_/f*100):0;document.getElementById("wrappedPercent").textContent=`${T}% `;const A=document.getElementById("wrappedProgressBar");A&&(A.style.width=`${T}% `);const R=m.all.filter(j=>/weapon/i.test(j.type)).length,C=m.all.filter(j=>/weapon/i.test(j.type)&&m.collectedItems.has(j.name)).length,x=m.all.filter(j=>/augment/i.test(j.type)).length,D=m.all.filter(j=>/augment/i.test(j.type)&&m.collectedItems.has(j.name)).length,V={};m.wrappedData.contributions&&m.wrappedData.contributions.forEach(j=>{j.map&&(V[j.map]=(V[j.map]||0)+1)});const U=Object.entries(V).sort((j,le)=>le[1]-j[1])[0];document.getElementById("wrappedPercent").textContent=`${T}% `;const B=document.getElementById("wrappedStatsGrid");B.innerHTML="";const O=[];m.wrappedData.contributionCount>0&&O.push({value:m.wrappedData.contributionCount,label:"Locations<br>Reported",color:"text-emerald-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg > '}),U&&U[0]&&O.push({value:U[0],label:"Best<br>Map",color:"text-purple-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg > ',smallText:!0}),O.push({value:`${_}/${f}`,label:"Blueprints<br>Collected",color:"text-white",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'}),O.push({value:`${C}/${R}`,label:"Weapons<br>Collected",color:"text-amber-400",icon:'<img src="icons/ItemCategory_Weapon.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(67%) sepia(74%) saturate(575%) hue-rotate(360deg) brightness(101%) contrast(101%);" alt="Weapon">'}),O.push({value:`${D}/${x}`,label:"Augments<br>Collected",color:"text-cyan-400",icon:'<img src="icons/ItemCategory_Augment.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(76%) sepia(32%) saturate(1057%) hue-rotate(152deg) brightness(95%) contrast(92%);" alt="Augment">'}),O.forEach((j,le)=>{const ae=document.createElement("div");ae.className="rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center flex-1 min-w-[90px]";const re=120+Math.floor(Math.random()*30);ae.style.boxShadow="inset 0 0 15px rgba(255, 255, 255, 0.03)";const de="rgba(16, 185, 129, 0.4)",et="rgba(52, 211, 153, 0.4)";le%2===0?ae.style.background=`linear-gradient(${re}deg, ${de}, ${de}), #09090b`:ae.style.background=`linear-gradient(${re}deg, ${de}, ${et} 50%, ${de}), #09090b`;const tt=j.icon.replace("w-4 h-4","w-6 h-6").replace("w-5 h-5","w-7 h-7");ae.innerHTML=`
        <div class="${j.color} mb-1 drop-shadow-md">
          ${tt}
        </div>
        <span class="${j.smallText?"text-xl":"text-3xl"} font-hud font-bold ${j.color} drop-shadow-lg">${j.value}</span>
        <div class="text-xs text-zinc-300 uppercase font-tabs font-bold tracking-wider text-center leading-tight drop-shadow-md opacity-90">${j.label}</div>
      `,B.appendChild(ae)});const E=document.getElementById("wrappedHighlights");E.innerHTML="";const g=["Bobcat","Looting Mk. 3 (Survivor)","Aphelion","Equalizer","Jupiter","Combat Mk. 3 (Aggressive)","Combat Mk. 3 (Flanking)","Vulcano","Snap Hook","Deadline","Wolfpack","Tactical Mk. 3 (Defensive)","Tactical Mk. 3 (Healing)","Venator","Tempest","Torrente","Bettina","Anvil","Osprey"];let w=m.all.filter(j=>m.collectedItems.has(j.name)&&!/mod|material|parts|component|attachment|misc/i.test(j.type));w.sort((j,le)=>{const ae=g.indexOf(j.name),re=g.indexOf(le.name);return ae!==-1&&re!==-1?ae-re:ae!==-1?-1:re!==-1?1:Ke(le.rarity)-Ke(j.rarity)});const b=w.slice(0,8);b.length===0&&(E.innerHTML='<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>'),b.forEach(j=>{const le=xe(j.rarity),ae=document.createElement("div");ae.className="card-compact w-full p-2";const re=document.createElement("div");re.className="rarity-frame rarity-glow relative overflow-hidden",re.style.borderColor=le;const de=document.createElement("div");de.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",de.style.background=`
        linear-gradient(to top right, ${le}44 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `,de.style.backgroundSize="cover, cover, cover",de.style.backgroundPosition="center, center, center";const et=document.createElement("img");et.src=j.img||"",et.className="w-full h-full object-contain p-2 relative z-10";const tt=document.createElement("div");tt.className="rarity-corner",tt.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${le}66 60%, ${le}cc 100%)`;const Se=document.createElement("div");Se.className="type-tab";const Ct=110+Math.floor(Math.random()*40);Se.style.background=`linear-gradient(${Ct}deg, ${le}99, ${le}66), #09090b`,Se.style.borderColor=le,Se.style.maxWidth="90%";const mt=document.createElement("img");mt.src=j.typeIcon||Ga(j.type),mt.className="w-5 h-5 object-contain shadow-sm drop-shadow-md";const me=document.createElement("span");me.textContent=j.name,Se.style.maxWidth="96%",Se.style.paddingRight="10px",Se.style.whiteSpace="normal",Se.style.overflow="visible";let St="15px",Rt="normal";j.name.length>25?(St="9px",Rt="1"):j.name.length>15?(St="10px",Rt="1.1"):j.name.length>12&&(St="12px",Rt="1.2"),me.style.fontSize=St,me.style.lineHeight=Rt,me.style.whiteSpace="normal",me.style.textOverflow="clip",me.style.overflow="visible",me.className="ml-1.5 font-black uppercase tracking-wide drop-shadow-lg text-white whitespace-normal break-words text-left",Se.appendChild(mt),Se.appendChild(me),de.appendChild(et),de.appendChild(tt),de.appendChild(Se),re.appendChild(de);const ss=document.createElement("div");ss.className="mt-2 px-1 pb-1 text-center";const Tn=document.createElement("div");Tn.className="font-semibold leading-tight text-white",Tn.style.fontSize="14px",Tn.textContent=j.name,ss.appendChild(Tn),ae.appendChild(re),E.appendChild(ae)});const v=document.getElementById("gamertagModal"),S=document.getElementById("gamertagInput"),I=document.getElementById("skipGamertagBtn"),fe=document.getElementById("confirmGamertagBtn");S.value="";const $e=j=>{try{console.log("[ProceedToWrapped] Starting...",j),v.classList.add("hidden"),v.classList.remove("flex");const le=document.getElementById("wrappedContent"),ae=document.getElementById("wrappedGamertag");if(ae&&ae.remove(),j&&j.trim()){const re=document.createElement("div");re.id="wrappedGamertag",re.className="absolute top-4 right-4 p-[2px] rounded-full z-50",re.style.background="linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.6) 100%)",re.style.boxShadow="0 0 20px rgba(16,185,129,0.4)";const de=document.createElement("div");de.className="bg-black/50 backdrop-blur-xl px-6 py-2.5 rounded-full text-white font-bold text-lg",de.textContent="@"+j.trim(),re.appendChild(de),le.appendChild(re)}console.log("[ProceedToWrapped] Calling toggleCaptureMode(false)..."),r(!1),console.log("[ProceedToWrapped] Showing modal..."),e.classList.remove("hidden"),e.classList.add("flex","items-center","justify-center"),document.body.style.overflow="hidden",console.log("[ProceedToWrapped] Done!")}catch(le){console.error("[ProceedToWrapped] CRITICAL ERROR:",le),alert("Error loading wrapped view. Check console.")}};I.onclick=()=>$e(""),fe.onclick=()=>$e(S.value),S.onkeydown=j=>{j.key==="Enter"&&$e(S.value)},v.classList.remove("hidden"),v.classList.add("flex","items-center","justify-center"),S.focus()},t&&(t.onclick=()=>{r(!1),e.classList.add("hidden"),e.classList.remove("flex","items-center","justify-center"),document.body.style.overflow="";const d=document.getElementById("submitLocationFab");d&&m.currentTab==="blueprints"&&d.classList.remove("hidden")},document.addEventListener("keydown",d=>{d.key==="Escape"&&!e.classList.contains("hidden")&&t.click()})),s){const d=p=>{try{const _=document.createElement("canvas");return _.width=p.naturalWidth,_.height=p.naturalHeight,_.getContext("2d").drawImage(p,0,0),_.toDataURL("image/png")}catch(_){return console.warn("Canvas base64 failed",_),null}},f=async p=>{try{const T=await(await fetch(p)).blob();return new Promise(A=>{const R=new FileReader;R.onloadend=()=>A(R.result),R.readAsDataURL(T)})}catch(_){return console.error("Fetch base64 failed",_),p}};a||(s.onclick=async()=>{const p=document.getElementById("wrappedContent");if(!p)return;const _=s.textContent;s.disabled=!0,s.textContent="Baking...";const T=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,A=p.cloneNode(!0);A.style.position="fixed",A.style.top="0",A.style.left="0",A.style.width=p.offsetWidth+"px",A.style.height=p.offsetHeight+"px",A.style.zIndex="-9999",A.style.opacity="1",A.style.pointerEvents="none",A.style.transform="none",A.style.margin="0",A.style.backgroundColor="#09090b",document.body.appendChild(A);try{console.group("iOS Robust Baking");const R=A.querySelectorAll("img");for(let E of R)if(E.src&&!E.src.startsWith("data:")){const g=Array.from(p.querySelectorAll("img")).find(w=>w.src===E.src);if(g&&g.complete){const w=d(g);w&&(E.src=w)}else if(g){await new Promise(b=>{g.onload=b,g.onerror=b});const w=d(g);w&&(E.src=w)}}const C="Arc BP Image Background.webp",x=await f("Background/"+C);[A,...Array.from(A.querySelectorAll("*"))].forEach(E=>{const g=window.getComputedStyle(E).backgroundImage;if(g&&g.toLowerCase().includes(C.toLowerCase())){const w=new RegExp(`url\\((['"]?)([^'"\\)]*?${C.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(\\1)\\)`,"gi");E.style.backgroundImage=g.replace(w,`url("${x}")`),E.style.backgroundSize="cover",E.style.backgroundPosition="center"}}),console.info("Baking complete. Starting capture..."),console.groupEnd(),s.textContent=T?"Processing...":"Generating...";const V=Math.max(p.offsetWidth,p.offsetHeight),U={width:V,height:V,pixelRatio:2,cacheBust:!0,style:{borderRadius:"0",width:`${V}px`,height:`${V}px`,transform:"none"}};if(T)try{await htmlToImage.toCanvas(A,U)}catch{}await htmlToImage.toSvg(A,U),await new Promise(E=>setTimeout(E,T?3e3:1e3));const B=await htmlToImage.toPng(A,U);if(!B||B.length<5e4)throw new Error("Captured image is too small or black.");const O=document.createElement("a");O.download="arc-raiders-wrapped-2025.png",O.href=B,O.click()}catch(R){console.error("Capture error:",R),alert("Download failed on this device. Please take a screenshot instead - sorry!")}finally{A.parentNode&&A.parentNode.removeChild(A),s.disabled=!1,s.textContent=_}})}const c=()=>{const d=e.querySelector(".w-\\[896px\\]");if(!d||e.classList.contains("hidden"))return;d.style.transform="none",d.style.margin="0";const f=40,p=window.innerHeight-f,_=window.innerWidth-f,T=d.scrollHeight,A=d.scrollWidth,R=p/T,C=_/A,x=Math.min(C,R,1);if(x<1){d.style.transformOrigin="center center",d.style.transform=`scale(${x})`;const D=A*(1-x),V=T*(1-x);d.style.marginLeft=`-${D/2}px`,d.style.marginRight=`-${D/2}px`,d.style.marginTop=`-${V/2}px`,d.style.marginBottom=`-${V/2}px`,d.style.willChange="transform"}else d.style.transform="none",d.style.margin="0",d.style.willChange="auto"};window.addEventListener("resize",c),new MutationObserver(d=>{d.forEach(f=>{f.type==="attributes"&&f.attributeName==="class"&&(e.classList.contains("hidden")||requestAnimationFrame(()=>{requestAnimationFrame(c)}))})}).observe(e,{attributes:!0})}const ku="arc_read_posts_v1";function AI(){const n=document.getElementById("announcementsBtn"),e=document.getElementById("announcementsDrawer"),t=document.getElementById("closeAnnouncementsBtn"),s=e?e.querySelector(":scope > div:first-child"):null,r=e?e.querySelector(":scope > div:last-child"):null,i=document.getElementById("announcementsFeed"),a=document.getElementById("newsBadge");let c=new Set;try{const C=localStorage.getItem(ku);C&&(c=new Set(JSON.parse(C)))}catch(C){console.error("Failed to load read posts",C)}const u=()=>{localStorage.setItem(ku,JSON.stringify(Array.from(c)))},d=()=>{const C=i?i.querySelectorAll(".announcement-card"):[];let x=0;C.forEach(D=>{const V=D.dataset.id,U=D.querySelector(".unread-dot");c.has(V)?(U&&U.classList.add("hidden"),D.classList.add("read")):(U&&U.classList.remove("hidden"),x++)}),a&&(x>0?(a.textContent=x,a.classList.remove("hidden")):a.classList.add("hidden"))},f=document.getElementById("devResetAnnouncements");f&&(f.onclick=C=>{C.stopPropagation(),c.clear(),u(),i&&i.querySelectorAll(".announcement-body").forEach(x=>{x.classList.add("max-h-0","opacity-0"),x.classList.remove("max-h-[1500px]","opacity-100")}),d()});const p=document.getElementById("markAllReadBtn");p&&(p.onclick=C=>{C.stopPropagation(),(i?i.querySelectorAll(".announcement-card"):[]).forEach(D=>{const V=D.dataset.id;V&&c.add(V)}),u(),d()});const _=C=>{C.stopPropagation(),R();const x=document.getElementById("tabCollection");x&&x.click();const D=document.getElementById("showWrappedBtn");D&&D.click()},T=document.getElementById("generateWrappedFromNews");if(T&&(T.onclick=_),i&&d(),!n||!e||!t||!s||!r)return;const A=()=>{e.classList.remove("hidden"),requestAnimationFrame(()=>{s.classList.remove("opacity-0"),r.classList.remove("translate-x-full")}),document.body.style.overflow="hidden"},R=()=>{s.classList.add("opacity-0"),r.classList.add("translate-x-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.style.overflow=""},300)};n.onclick=A,t.onclick=R,s.onclick=R,document.addEventListener("keydown",C=>{C.key==="Escape"&&!e.classList.contains("hidden")&&R()}),i&&(i.onclick=C=>{const x=C.target.closest(".announcement-card");if(!x)return;const D=x.querySelector(".announcement-body"),V=x.dataset.id;if(!D)return;!D.classList.contains("max-h-0")?(D.classList.add("max-h-0","opacity-0"),D.classList.remove("max-h-[1500px]","opacity-100")):(D.classList.remove("max-h-0","opacity-0"),D.classList.add("max-h-[1500px]","opacity-100"),c.has(V)||(c.add(V),u(),d()))})}function Nf(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),s=document.getElementById("collectToastProgress"),r=document.getElementById("submitLocationFab");!e||!t||!s||(ln&&(clearTimeout(ln),ln=null),oi=n,t.textContent=`${n} Collected? Tell us where!`,e.classList.remove("hidden"),r&&window.innerWidth<=768&&r.classList.add("hidden"),s.style.transition="none",s.style.width="100%",requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.transition="width 10000ms linear",s.style.width="0%"})}),ln=setTimeout(()=>{Ci()},1e4))}function Ci(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress"),t=document.getElementById("submitLocationFab");n&&n.classList.add("hidden"),e&&(e.style.transition="none",e.style.width="100%"),t&&m.currentTab==="blueprints"&&window.innerWidth<=768&&t.classList.remove("hidden"),ln&&(clearTimeout(ln),ln=null)}async function CI(){var p,_,T,A,R,C,x,D,V,U,B;const n=(p=document.getElementById("submitBlueprintName"))==null?void 0:p.value,e=(_=document.getElementById("submitMapId"))==null?void 0:_.value,t=(T=document.getElementById("submitMapX"))==null?void 0:T.value,s=(A=document.getElementById("submitMapY"))==null?void 0:A.value,r=((R=document.getElementById("submitMapLayer"))==null?void 0:R.value)||"0",i=(C=document.getElementById("submitCondition"))==null?void 0:C.value,a=(x=document.getElementById("submitNotes"))==null?void 0:x.value,c=bI(),u=((D=document.getElementById("submitTrialsReward"))==null?void 0:D.checked)||!1,d=((V=document.getElementById("submitQuestReward"))==null?void 0:V.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}if(!(e||i||a||c||u||d)){alert("Please provide at least one detail (Map, Condition, Notes, Container, or Reward Type).");return}try{const O=document.getElementById("customContainerForm"),E=document.getElementById("customContainerName"),g=document.getElementById("customContainerDescription");if(O&&!O.classList.contains("hidden")&&(E!=null&&E.value.trim()))try{await Tu(ri(wn,"containerSubmissions"),{name:E.value.trim(),description:(g==null?void 0:g.value.trim())||"",submittedAt:new Date().toISOString(),userId:((U=je.currentUser)==null?void 0:U.uid)||"anonymous"}),console.log("Custom container submitted successfully")}catch(w){console.error("Failed to submit custom container:",w)}await Tu(ri(wn,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:i||"",location:a||"",container:c.replace("CUSTOM: ","")||"",trialsReward:u,questReward:d,submittedAt:new Date().toISOString(),userId:((B=je.currentUser)==null?void 0:B.uid)||"anonymous",mapX:t||"",mapY:s||"",mapLayer:parseInt(r)||0}),$o(),SI()}catch(O){console.error("Error submitting blueprint location:",O),alert("Failed to submit. Please try again.")}}function SI(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function RI(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=Uo(t);const s=Uo((e||"").trim());if(Au[s]){const i=Au[s];if(pt.has(i))return Es+pt.get(i);for(const[a,c]of pt.entries())if(a.startsWith(i))return Es+c}const r=[t.toLowerCase(),s.toLowerCase()];for(const i of r)if(i&&pt.has(i))return Es+pt.get(i);for(const i of r)if(i){for(const[a,c]of pt.entries())if(a===i||a.startsWith(i))return Es+c}return s?Es+s+".webp":""}const Ir={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function PI(n,e){let t;return function(...s){const r=this;clearTimeout(t),t=setTimeout(()=>n.apply(r,s),e)}}const Mf=PI(zo,2e3),un={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},qo={Confirmed:un.Legendary.color,"Very High":un.Epic.color,Confident:un.Rare.color,Low:un.Uncommon.color,"Not Enough Data":"#E11D48"},kI=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function rt(n){return sI+encodeURIComponent(n)}function xI(n){const e=Math.max(Ir.min,Math.min(Ir.max,Number(n)||Ir.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(Ir.storageKey,String(e))}catch{}const s=document.getElementById("gridSizeLabel"),r=document.getElementById("gridSizeLabelMobile");s&&(s.textContent=`${e}px`),r&&(r.textContent=`${e}px`)}function Ga(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return rt("ItemCategory_Weapon.webp");if(t==="grenade")return rt("ItemCategory_Grenade.webp");if(t==="quickuse")return rt("ItemCategory_QuickUse.webp");if(t==="mod")return rt("ItemCategory_Mod.webp");if(t==="augment")return rt("ItemCategory_Augment.webp");if(t==="material")return rt("ItemCategory_Material.webp");if(t==="misc")return rt("ItemCategory_Misc.webp");for(const s of kI)if(s.re.test(e))return rt(s.file);return rt("ItemCategory_Misc.webp")}function LI(n){const e=Oe(n);return e?/^https?:\/\//i.test(e)?e:rt(e):""}function Oe(n){return(n??"").toString().trim()}function Vr(n){return Oe(n).toLowerCase()}function Be(n,e){const t=n.map(s=>Vr(s));for(const s of e){const r=t.indexOf(Vr(s));if(r!==-1)return n[r]}for(const s of e){const r=Vr(s),i=t.findIndex(a=>a.includes(r));if(i!==-1)return n[i]}return null}function DI(n){const e=Oe(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(un[t])return t;const s={Legend:"Legendary",Leg:"Legendary"};return s[t]?s[t]:t}function xe(n){var e;return((e=un[n])==null?void 0:e.color)||"#3f3f46"}function Ke(n){var e;return((e=un[n])==null?void 0:e.rank)||0}const m={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]},wrappedData:{contributionCount:0,loading:!1},spares:{},massCollectMode:!1};function NI(){return new URL(window.location.href).searchParams.get("csv")||nI}function br(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function MI(){m.massCollectMode=!m.massCollectMode;const n=document.getElementById("toggleMassCollectBtn"),e=document.getElementById("grid");m.massCollectMode?(n&&(n.innerHTML=`
        <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div class="flex flex-col text-left leading-none text-emerald-400 whitespace-nowrap">
          <span>Done</span>
          <span>Collecting</span>
        </div>
      `,n.classList.add("bg-emerald-500/10","border-emerald-500/50"),n.classList.remove("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.add("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const s=t.parentNode.dataset.name;s&&fn(t,s)})):(n&&(n.innerHTML=`
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <div class="flex flex-col text-left leading-none whitespace-nowrap">
          <span>Mark items</span>
          <span>as Collected</span>
        </div>
      `,n.classList.remove("bg-emerald-500/10","border-emerald-500/50"),n.classList.add("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.remove("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const s=t.parentNode.dataset.name;s&&fn(t,s)}))}function Vf(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),s=document.getElementById("drawerBackdrop");function r(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const B=!n.classList.contains("hidden");n.classList.toggle("hidden"),B?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=r);const c=document.getElementById("mobileFilterBtn");c&&(c.onclick=a);const u=document.getElementById("toggleMassCollectBtn");u&&(u.onclick=MI);const d=document.getElementById("desktopFilterBtn"),f=document.getElementById("filtersSidebar");typeof m.filtersOpen>"u"&&(m.filtersOpen=sessionStorage.getItem("filtersOpen")!=="false");const p=()=>{f&&(f.classList.add("hidden"),m.filtersOpen?f.classList.add("md:block"):f.classList.remove("md:block"))};p(),d&&(d.onclick=()=>{m.filtersOpen=!m.filtersOpen,sessionStorage.setItem("filtersOpen",m.filtersOpen),p(),Qo(m.currentTab)}),t&&(t.onclick=i),s&&(s.onclick=i);const _=document.getElementById("searchInput"),T=document.getElementById("searchInputMobile"),A=B=>{m.filters.search=B,ge()};_&&_.addEventListener("input",B=>A(B.target.value)),T&&T.addEventListener("input",B=>{A(B.target.value),_&&(_.value=B.target.value)});const R=document.getElementById("sortSelect"),C=document.getElementById("sortSelectMobile"),x=B=>{m.currentTab==="data"?(m.filters.sortData=B,B==="entries_asc"&&(m.dataSort={column:"rarity",direction:"asc"}),B==="entries_desc"&&(m.dataSort={column:"rarity",direction:"desc"}),B==="name_asc"&&(m.dataSort={column:"name",direction:"asc"}),B==="name_desc"&&(m.dataSort={column:"name",direction:"desc"}),B==="conf_asc"&&(m.dataSort={column:"confidence",direction:"asc"}),B==="conf_desc"&&(m.dataSort={column:"confidence",direction:"desc"}),B==="rarity_asc"&&(m.dataSort={column:"rarity",direction:"asc"}),B==="rarity_desc"&&(m.dataSort={column:"rarity",direction:"desc"}),Tt()):(m.filters.sortBlueprints=B,ge()),R&&(R.value=B),C&&(C.value=B),Fe()};R&&(R.onchange=B=>x(B.target.value)),C&&(C.onchange=B=>x(B.target.value)),m.filters.search&&(_&&(_.value=m.filters.search),T&&(T.value=m.filters.search)),m.currentTab==="data"?m.filters.sortData&&(R&&(R.value=m.filters.sortData),C&&(C.value=m.filters.sortData)):m.filters.sortBlueprints&&(R&&(R.value=m.filters.sortBlueprints),C&&(C.value=m.filters.sortBlueprints));const D=()=>{m.filters.rarities.clear(),m.filters.types.clear(),m.filters.maps.clear(),m.filters.conds.clear(),m.filters.confs.clear(),m.filters.search="",m.filters.sortBlueprints="rarity_desc",m.filters.sortData="rarity_desc",_&&(_.value=""),T&&(T.value="");const B="rarity_desc";R&&(R.value=B),C&&(C.value=B),m.filters.collected="all",m.dataSort={column:"rarity",direction:"desc"},m.currentTab==="data"?Tt():ge(),Le(),Ka(),Fe()};["resetBtn","resetBtn2"].forEach(B=>{const O=document.getElementById(B);O&&(O.onclick=D)});const V=(B,O)=>{const E=document.getElementById(B);E&&(E.onclick=()=>{O.clear(),ge(),Le(),Fe()})};V("rarityAllBtn",m.filters.rarities),V("typeAllBtn",m.filters.types),V("mapAllBtn",m.filters.maps),V("condAllBtn",m.filters.conds),V("confAllBtn",m.filters.confs),window.addEventListener("resize",()=>{applyGridSize(currentGridSize)});const U=(B,O,E)=>{const g=document.getElementById(B),w=document.getElementById(O),b=document.getElementById(E);g&&w&&b&&(g.onclick=()=>{w.classList.toggle("hidden"),b.classList.toggle("rotate-180")})};U("toggleRarity","rarityFilters","iconRarity"),U("toggleType","typeFilters","iconType"),U("disclaimerHeader","disclaimerContent","disclaimerIcon"),U("toggleMap","mapFilters","iconMap"),U("toggleCond","condFilters","iconCond"),U("toggleConf","confFilters","iconConf"),U("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),U("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),U("toggleMapMobile","mapFiltersMobile","iconMapMobile"),U("toggleCondMobile","condFiltersMobile","iconCondMobile"),U("toggleConfMobile","confFiltersMobile","iconConfMobile"),document.querySelectorAll("[data-sort]").forEach(B=>{B.onclick=()=>{const O=B.dataset.sort;let E=m.filters.sortData;O==="name"?E=m.filters.sortData==="name_asc"?"name_desc":"name_asc":O==="confidence"&&(E=m.filters.sortData==="conf_desc"?"conf_asc":"conf_desc");const g=document.getElementById("sortSelect"),w=document.getElementById("sortSelectMobile");g&&(g.value=E),w&&(w.value=E),g&&g.onchange({target:{value:E}})}})}async function VI(){br("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const s=await t.json();pt.clear();for(const r of s){const a=r.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),c=Uo(a).toLowerCase();pt.set(c,r)}console.log(`Loaded ${pt.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}br("Fetching sheet...");let n=NI();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var B;const t=e.data||[],s=((B=e.meta)==null?void 0:B.fields)||Object.keys(t[0]||{}),r=Be(s,["Blueprint Name","Item Name","Name","Item"]),i=Be(s,["Item Type","Type"]),a=Be(s,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),c=Be(s,["Most Likely Map","Map"]),u=Be(s,["Most Likely Condition","Condition"]),d=Be(s,["Most Likely Location","Location"]),f=Be(s,["Most Likely Container","Container"]),p=Be(s,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),_=Be(s,["Rarity","Item Rarity"]),T=Be(s,["Data Confidence","Confidence"]),A=Be(s,["Item URL","Wiki URL","URL","Link","Wiki"])||s[7],R=Be(s,["Trials Reward","Trial Reward","Trials"])||s[9],C=Be(s,["Quest Reward","Quest"])||s[10],x=Be(s,["Description","Desc","Flavor Text"])||s[11],D=Be(s,["Active","Is Active","Enabled"])||s[12],V=O=>{const E=Oe(O).toLowerCase();return E==="true"||E==="yes"||E==="1"||E==="x"||E==="âœ“"};m.columns={name:r,type:i,typeIcon:a,map:c,cond:u,loc:d,cont:f,img:p,rarity:_,conf:T,wiki:A};const U=[];for(const O of t){const E=Oe(O[r]);if(!E)continue;const g=Oe(O[i]),w=Oe(O[c]),b=Oe(O[u]),v=Oe(O[d]),S=Oe(O[f]),I=Oe(O[p]),fe=RI(I,E),$e=DI(O[_]),j=T?Oe(O[T]):"",le=Oe(O[A]),re=(a?LI(O[a]):"")||Ga(g),de=R?V(O[R]):!1,et=C?V(O[C]):!1,tt=x?Oe(O[x]):"",Se=D?V(O[D]):!0,Ct=w.split(",").map(me=>me.trim()).filter(me=>me),mt=b.split(",").map(me=>me.trim()).filter(me=>me);U.push({name:E,type:g,map:w,cond:b,loc:v,cont:S,img:fe,rarity:$e,conf:j,wiki:le,typeIcon:re,trialsReward:de,questReward:et,description:tt,active:Se,mapList:Ct,condList:mt})}m.all=U.filter(O=>O.active!==!1),FI(),Vf(),ge(),Le(),br("")},error:e=>{console.error(e),br("Failed to load CSV. Check your published link.")}})}function lo(n){const e=new Set(n.filter(t=>Oe(t)));return Array.from(e).sort((t,s)=>t.localeCompare(s))}const jo=["Confirmed","Very High","Confident","Low","Not Enough Data"],xu=["Augment","Weapon","Quick Use","Grenade","Mod","Material"],BI=["Dam Battlegrounds","Blue Gate","Buried City","Spaceport","Stella Montis"],OI=["Day","Night","Storm","Cold Snap","Harvester","Matriarch","Hidden Bunker","Husk Graveyard","Launch Tower Loot","Locked Gate","Prospecting Probes","Lush Blooms","N/A"];function FI(){m.facets.rarities=lo(m.all.map(t=>t.rarity)).sort((t,s)=>Ke(s)-Ke(t)),m.facets.types=lo(m.all.map(t=>t.type)).sort((t,s)=>{let r=xu.indexOf(t),i=xu.indexOf(s);return r===-1&&(r=999),i===-1&&(i=999),r-i||t.localeCompare(s)});const n=new Set;m.all.forEach(t=>{t.mapList.forEach(s=>{BI.includes(s)&&n.add(s)})}),m.facets.maps=Array.from(n).sort((t,s)=>t.localeCompare(s));const e=new Set;m.all.forEach(t=>{t.condList.forEach(s=>{OI.includes(s)&&e.add(s)})}),m.facets.conds=Array.from(e).sort((t,s)=>t.localeCompare(s)),m.facets.confs=lo(m.all.map(t=>t.conf)).sort((t,s)=>{let r=jo.indexOf(t),i=jo.indexOf(s);return r===-1&&(r=999),i===-1&&(i=999),r-i})}function vs(n,e){n.has(e)?n.delete(e):n.add(e)}function Lu(n,e,t){const s=document.createElement("button");return s.className="chip "+(e?"chip-active":""),s.textContent=n,s.onclick=t,s}function Le(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of m.facets.rarities){const s=m.filters.rarities.has(t),r=xe(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=s?r+"66":r+"22";i.style.background=a,i.style.borderColor=r,i.style.color="#f4f4f5",i.onclick=()=>{vs(m.filters.rarities,t),ge(),Le(),Fe()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of m.facets.types){const s=m.filters.types.has(t),r=document.createElement("button");r.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",r.style.borderColor=s?"rgb(113 113 122)":"rgb(39 39 42)",r.title=t,r.onclick=()=>{vs(m.filters.types,t),ge(),Le(),Fe()};const i=document.createElement("img");i.src=Ga(t),i.alt=t,i.className="w-6 h-6",r.appendChild(i),e.appendChild(r)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of m.facets.maps){const s=m.filters.maps.has(t);e.appendChild(Lu(t,s,()=>{vs(m.filters.maps,t),ge(),Le(),Fe()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of m.facets.conds){const s=m.filters.conds.has(t);e.appendChild(Lu(t,s,()=>{vs(m.filters.conds,t),ge(),Le(),Fe()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of m.facets.confs){if(!t)continue;const s=m.filters.confs.has(t),r=qo[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=s?r:"rgb(39 39 42)",i.style.background=s?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{vs(m.filters.confs,t),ge(),Le(),Fe()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=r;const c=document.createElement("span");c.textContent=t,i.appendChild(a),i.appendChild(c),e.appendChild(i)}}UI()}function UI(){const n=[document.getElementById("activeChips"),document.getElementById("dataActiveChips")].filter(t=>!!t);n.forEach(t=>t.innerHTML="");const e=(t,s)=>{n.forEach(r=>{const i=document.createElement("button");i.className="chip chip-active",i.textContent=t+" ✕",i.onclick=s,r.appendChild(i)})};if(m.filters.rarities.size&&e(`Rarity: ${Array.from(m.filters.rarities).join(", ")}`,()=>{m.filters.rarities.clear(),ge(),Le(),Fe()}),m.filters.types.size&&e(`Type: ${Array.from(m.filters.types).join(", ")}`,()=>{m.filters.types.clear(),ge(),Le(),Fe()}),m.filters.maps.size&&e(`Map: ${Array.from(m.filters.maps).join(", ")}`,()=>{m.filters.maps.clear(),ge(),Le(),Fe()}),m.filters.conds.size&&e(`Condition: ${Array.from(m.filters.conds).join(", ")}`,()=>{m.filters.conds.clear(),ge(),Le(),Fe()}),m.filters.confs.size&&e(`Confidence: ${Array.from(m.filters.confs).join(", ")}`,()=>{m.filters.confs.clear(),ge(),Le(),Fe()}),m.filters.collected!=="all"){let t="Collected";m.filters.collected==="not-collected"&&(t="Not Collected"),m.filters.collected==="wishlist"&&(t="Wishlist"),m.filters.collected==="spares"&&(t="Has Spares"),e(`Status: ${t}`,()=>{m.filters.collected="all",ge(),Le(),Ka(),Fe()})}m.filters.search.trim()&&e(`Search: ${m.filters.search.trim()}`,()=>{m.filters.search="";const t=document.getElementById("searchInput"),s=document.getElementById("searchInputMobile");t&&(t.value=""),s&&(s.value=""),ge(),Le()})}function ge(){const n=Vr(m.filters.search),e=m.filters.rarities.size>0,t=m.filters.types.size>0,s=m.filters.maps.size>0,r=m.filters.conds.size>0,i=m.filters.confs.size>0;let a=m.all.filter(u=>{if(e&&!m.filters.rarities.has(u.rarity)||t&&!m.filters.types.has(u.type)||s&&!u.mapList.some(p=>m.filters.maps.has(p))||r&&!u.condList.some(p=>m.filters.conds.has(p))||i&&!m.filters.confs.has(u.conf))return!1;const d=m.collectedItems.has(u.name),f=m.wishlistedItems.has(u.name);return!(m.filters.collected==="collected"&&!d||m.filters.collected==="wishlist"&&!f||m.filters.collected==="not-collected"&&d||m.filters.collected==="spares"&&!(m.spares[u.name]>0)||n&&!(u.name+" "+u.type+" "+u.map+" "+u.cond+" "+u.loc+" "+u.cont).toLowerCase().includes(n))});const c=m.filters.sortBlueprints||"rarity_desc";a.sort((u,d)=>c==="name_asc"?u.name.localeCompare(d.name):c==="name_desc"?d.name.localeCompare(u.name):c==="type_asc"?(u.type||"").localeCompare(d.type||""):c==="rarity_asc"?Ke(u.rarity)-Ke(d.rarity)||u.name.localeCompare(d.name):Ke(d.rarity)-Ke(u.rarity)||u.name.localeCompare(d.name)),m.filtered=a,Ho(),m.currentTab==="data"&&Tt()}function Ho(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${m.filtered.length} / ${m.all.length}`),!m.filtered.length||m.currentTab!=="blueprints"){n.classList.add("hidden"),e&&m.currentTab==="blueprints"&&e.classList.remove("hidden");return}else n.classList.remove("hidden"),e&&e.classList.add("hidden");n.className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5";const s=[];for(const r of m.filtered){const i=document.createElement("div");i.className="card-compact border border-zinc-800/50 rounded-2xl p-2 opacity-0",i.style.backgroundColor="#0C0C0F",i.style.position="relative",i.style.overflow="visible",i.style.setProperty("--glow-color",xe(r.rarity)),i.dataset.name=r.name;const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=xe(r.rarity);const c=document.createElement("div");c.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",c.style.background=`
      linear-gradient(to top right, ${xe(r.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,c.style.backgroundSize="cover, cover, cover",c.style.backgroundPosition="center, center, center",c.style.backgroundBlendMode="normal, normal, normal",c.style.aspectRatio="1 / 1",c.style.width="100%";const u=document.createElement("img");u.src=r.img||"",u.alt=r.name,u.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",u.style.width="100%",u.style.height="100%",u.style.objectFit="contain",u.style.padding="8px",u.loading="lazy",u.draggable=!1,u.style.webkitTouchCallout="none",u.style.userSelect="none",u.classList.add("transition-transform","duration-200","ease-out","group-hover:scale-110"),i.classList.add("group");const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${xe(r.rarity)}66 60%, ${xe(r.rarity)}cc 100%)`;const f=document.createElement("div");f.className="type-tab";const p=qo[r.conf]||"#E11D48";f.style.background=p+"9E",f.style.borderColor=p;const _=document.createElement("span");_.className="text-white font-semibold",_.style.textShadow="0 1px 2px rgba(0,0,0,0.5)",_.textContent=r.conf||"N/A",f.appendChild(_),c.appendChild(u),c.appendChild(d),c.appendChild(f);const T=document.createElement("div");T.className="mt-2 px-1 pb-1";const A=document.createElement("div");A.className="font-semibold leading-tight transition-all duration-200";const R=m.blueprintGridSize||"M";R==="S"?A.classList.add("text-xs"):R==="L"?A.classList.add("text-base"):A.classList.add("text-sm"),A.textContent=r.name,T.appendChild(A);const C=document.createElement("div");C.className="details-overlay hidden backdrop-blur-md bg-zinc-900/40 border border-white/10 shadow-2xl rounded-2xl";const x=document.createElement("div");x.className="bg-black/20 rounded-lg p-3 border border-white/10 mb-3";const D=document.createElement("div");D.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",D.textContent="Most Likely Spawn",x.appendChild(D);let V=!1;const U=(g,w)=>{if(!w||w==="N/A")return null;const b=document.createElement("div");b.className="details-row";const v=document.createElement("div");v.className="details-label",v.textContent=g;const S=document.createElement("div");return S.className="details-value",S.textContent=w,b.appendChild(v),b.appendChild(S),b};if([U("Map",r.map),U("Location",r.loc),U("Container",r.cont),U("Condition",r.cond)].filter(Boolean).forEach(g=>{x.appendChild(g),V=!0}),V&&C.appendChild(x),r.conf){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Data Confidence";const b=document.createElement("div");b.className="details-value details-confidence";const v=document.createElement("span");v.className="confidence-dot",v.style.background=qo[r.conf]||"#71717a";const S=document.createElement("span");S.textContent=r.conf,b.appendChild(v),b.appendChild(S),g.appendChild(w),g.appendChild(b),C.appendChild(g)}if(r.trialsReward){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Trials Reward";const b=document.createElement("div");b.className="details-value",b.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',g.appendChild(w),g.appendChild(b),C.appendChild(g)}if(r.questReward){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Quest Reward";const b=document.createElement("div");b.className="details-value",b.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',g.appendChild(w),g.appendChild(b),C.appendChild(g)}if(r.description){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Description";const b=document.createElement("div");b.className="details-value",b.textContent=r.description,b.classList.add("italic"),g.appendChild(w),g.appendChild(b),C.appendChild(g)}if(r.wiki){const g=document.createElement("a");g.href=r.wiki,g.target="_blank",g.rel="noreferrer",g.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",g.textContent="Item URL",C.appendChild(g)}const B=document.createElement("div");B.className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black/20 border border-white/10 hover:border-emerald-400 hover:bg-black/30 rounded-lg cursor-pointer transition-all group/link shadow-sm",B.onclick=g=>{g.stopPropagation(),window.openDataDetail&&window.openDataDetail(r.name)},B.innerHTML=`
      <span class="text-xs font-bold text-zinc-300 group-hover/link:text-white uppercase tracking-wider">Detailed Data</span>
      <svg class="w-4 h-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `,C.appendChild(B),a.style.cursor="pointer",a.onclick=g=>{if(g.stopPropagation(),m.massCollectMode){m.collectedItems.has(r.name)?(m.collectedItems.delete(r.name),Ci()):(m.collectedItems.add(r.name),m.wishlistedItems.delete(r.name),m.currentTab==="blueprints"&&Nf(r.name)),Fn(),fn(a,r.name),Mf();return}!C.classList.contains("hidden")?Ha():(kf(i,"details"),requestAnimationFrame(()=>{const b=C.getBoundingClientRect(),v=12;let S=0;b.left<v?S=v-b.left:b.right>window.innerWidth-v&&(S=window.innerWidth-v-b.right),S!==0&&(C.style.transform=`translateX(calc(-50% + ${S}px))`)}))},a.appendChild(c),fn(a,r.name);const O=m.spares[r.name]||0;if(O>0){const g=document.createElement("div");g.className="spares-pill absolute top-[5cqi] right-[5cqi] z-20 px-[5cqi] py-[3cqi] rounded-full text-[8cqi] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",g.innerHTML=`Spares: <span class="font-bold">${O}</span>`,g.dataset.itemName=r.name,a.appendChild(g)}const E=document.createElement("div");E.className="mass-collect-overlay",E.innerHTML=`
      <span class="mass-collect-text">Click to<br>Collect</span>
      <div class="mass-collect-icons">
        <svg class="mass-collect-icon icon-plus w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <svg class="mass-collect-icon icon-check w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,a.appendChild(E),i.appendChild(a),i.appendChild(T),i.appendChild(C),n.appendChild(i),s.push(i)}s.length>0&&np(s,{opacity:[0,1],y:[20,0]},{delay:Xm(.015)})}function zI(){const n=document.getElementById("filtersSidebar"),e=document.getElementById("sidebarBackdrop"),t=document.getElementById("desktopFilterBtn"),s=document.getElementById("closeSidebarBtn");n||console.error("Sidebar not found");const r=()=>{n&&(n.style.transform="translateX(0)",n.style.display="block",n.classList.remove("-translate-x-full","hidden"),n.classList.add("translate-x-0"),n.classList.remove("pointer-events-none"),n.classList.add("pointer-events-auto"),n.classList.remove("md:hidden"),n.classList.add("md:block")),window.innerWidth<768&&(e&&e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))},i=()=>{n&&(n.style.transform="",n.style.display="",n.classList.add("-translate-x-full"),n.classList.remove("translate-x-0"),n.classList.remove("pointer-events-auto"),n.classList.add("pointer-events-none"),window.innerWidth>=768&&(n.classList.remove("md:block"),n.classList.add("md:hidden"),n.classList.add("hidden"),n.style.display="none")),e&&e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},a=()=>{if(!n)return;const u=window.getComputedStyle(n).display==="none";window.innerWidth<768?n.classList.contains("-translate-x-full")?r():i():u?r():i()};t&&t.addEventListener("click",c=>{c.stopPropagation(),a()}),s&&(s.onclick=i),e&&(e.onclick=i)}function Ka(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedWish"),s=document.getElementById("collectedNo"),r=document.getElementById("collectedSpares"),i=a=>{m.filters.collected=a;const c={all:n,collected:e,wishlist:t,"not-collected":s,spares:r};Object.values(c).forEach(u=>u==null?void 0:u.classList.remove("chip-active")),c[a]&&c[a].classList.add("chip-active"),ge(),Le(),Fe()};n&&(n.onclick=()=>i("all")),e&&(e.onclick=()=>i("collected")),t&&(t.onclick=()=>i("wishlist")),s&&(s.onclick=()=>i("not-collected")),r&&(r.onclick=()=>i("spares")),i(m.filters.collected)}function $I(){const n=document.getElementById("itemContextMenu"),e=document.getElementById("grid");if(!n||!e)return;let t=null,s=null,r=!1;const i=500,a=T=>{if(kf(T,"menu"),window.menuCloseTimer&&(clearTimeout(window.menuCloseTimer),window.menuCloseTimer=null),t=T,!T)return;const A=T.getBoundingClientRect(),R=200;let C=A.left+A.width/2-R/2,x=A.bottom+8;const D=12;C<D?C=D:C+R>window.innerWidth-D&&(C=window.innerWidth-R-D);const V=150;x+V>window.innerHeight-D&&(x=A.top-V-8,x<D&&(x=D)),n.style.left=`${C}px`,n.style.top=`${x}px`,n.classList.remove("hidden","pointer-events-none"),requestAnimationFrame(()=>n.classList.remove("opacity-0"));const U=document.getElementById("contextSparesCount");if(U&&T){const b=T.dataset.name,v=m.spares[b]||0;U.textContent=v}const B=T.dataset.name,O=document.getElementById("contextCollectedText"),E=document.getElementById("contextWishlistText"),g=document.getElementById("contextCollectedBtn"),w=document.getElementById("contextWishlistBtn");m.collectedItems.has(B)?(O&&(O.textContent="Mark as Uncollected"),g&&g.classList.add("bg-emerald-500/20","text-emerald-400")):(O&&(O.textContent="Mark as Collected"),g&&g.classList.remove("bg-emerald-500/20","text-emerald-400")),m.wishlistedItems.has(B)?(E&&(E.textContent="Remove from Wishlist"),w&&w.classList.add("bg-amber-500/20","text-amber-400")):(E&&(E.textContent="Add to Wishlist"),w&&w.classList.remove("bg-amber-500/20","text-amber-400"))},c=()=>{n.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>n.classList.add("hidden"),150),t&&t.classList.remove("card-selected"),t=null};e.addEventListener("contextmenu",T=>{const A=T.target.closest(".card-compact");A&&(T.preventDefault(),a(A))}),e.addEventListener("touchstart",T=>{const A=T.target.closest(".card-compact");A&&(s=setTimeout(()=>{r=!0,a(A),navigator.vibrate&&navigator.vibrate(50)},i))},{passive:!0}),e.addEventListener("touchend",T=>{clearTimeout(s),r&&(T.cancelable&&T.preventDefault(),r=!1)},{passive:!1}),e.addEventListener("touchmove",()=>{clearTimeout(s)},{passive:!0}),document.addEventListener("click",T=>{n.contains(T.target)||T.target.closest(".details-overlay")||T.target.closest(".card-selected")||Ha()}),e.addEventListener("click",T=>{const A=T.target.closest(".spares-pill");if(!A)return;T.stopPropagation();const R=A.closest(".card-compact");R&&a(R)}),window.addEventListener("scroll",c,{passive:!0}),document.addEventListener("keydown",T=>{T.key==="Escape"&&c()});const u=document.getElementById("contextSparesCount"),d=document.getElementById("contextSparesMinus"),f=document.getElementById("contextSparesPlus"),p=()=>{if(t&&u){const T=t.dataset.name,A=m.spares[T]||0;u.textContent=A}},_=(T,A)=>{const R=T==null?void 0:T.querySelector(".rarity-frame");if(!R)return;const C=R.querySelector(".spares-pill");C&&C.remove();const x=m.spares[A]||0;if(x>0){const D=document.createElement("div");D.className="spares-pill absolute top-[5cqi] right-[5cqi] z-20 px-[5cqi] py-[3cqi] rounded-full text-[8cqi] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",D.innerHTML=`Spares: <span class="font-bold">${x}</span>`,D.dataset.itemName=A,R.appendChild(D)}};d&&(d.onclick=T=>{if(T.stopPropagation(),!t)return;const A=t.dataset.name,R=m.spares[A]||0;R>0&&(m.spares[A]=R-1,m.spares[A]===0&&delete m.spares[A],Cu(),p(),_(t,A))}),f&&(f.onclick=T=>{if(T.stopPropagation(),!t)return;const A=t.dataset.name,R=m.spares[A]||0;m.spares[A]=R+1,Cu(),p(),_(t,A)}),n.addEventListener("click",T=>{const A=T.target.closest("[data-action]");if(!A||!t)return;const R=A.dataset.action,C=t.dataset.name,x=t.querySelector(".rarity-frame");if(!C){c();return}R==="collected"?(m.collectedItems.has(C)?(m.collectedItems.delete(C),Ci()):(m.wishlistedItems.delete(C),m.collectedItems.add(C),m.currentTab==="blueprints"&&Nf(C)),Fn(),Mf(),x&&fn(x,C),Nr(),c()):R==="wishlisted"?(m.wishlistedItems.has(C)?m.wishlistedItems.delete(C):(m.collectedItems.delete(C),m.wishlistedItems.add(C)),Fn(),x&&fn(x,C),Nr(),c()):R==="uncollected"&&(m.collectedItems.delete(C),m.wishlistedItems.delete(C),Fn(),x&&fn(x,C),Nr(),c())})}const qI="./data_registry.csv";m.detailedData=[];m.dataSort={column:"rarity",direction:"desc"};m.dataSearch="";async function Wo(){const n=document.getElementById("dataRows");if(n){m.detailedData.length===0&&(n.innerHTML=`
      <div class="py-20 text-center">
        <div class="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-zinc-500">Fetching live data...</p>
      </div>`);try{const t=await(await fetch(qI)).text();Papa.parse(t,{header:!0,skipEmptyLines:!0,complete:s=>{jI(s.data)},error:s=>{console.error("CSV Parse Error:",s),n.innerHTML='<div class="py-10 text-center text-red-500">Failed to load data.</div>'}})}catch(e){console.error("Fetch Error:",e),n.innerHTML='<div class="py-10 text-center text-red-500">Network error.</div>'}}}function jI(n){m.detailedData=n.map(e=>{const t=[{name:"Spaceport",count:parseInt(e.Spaceport||0)},{name:"Stella Montis",count:parseInt(e["Stella Montis"]||0)},{name:"Blue Gate",count:parseInt(e["Blue Gate"]||0)},{name:"Dam Battlegrounds",count:parseInt(e["Dam Battlegrounds"]||0)},{name:"Buried City",count:parseInt(e["Buried City"]||0)}].sort((i,a)=>a.count-i.count),s=[{name:"Day",count:parseInt(e.Day||0)},{name:"Night",count:parseInt(e.Night||0)},{name:"Storm",count:parseInt(e.Storm||0)},{name:"Cold Snap",count:parseInt(e["Cold Snap"]||0)},{name:"Hidden Bunker",count:parseInt(e["Hidden Bunker"]||0)},{name:"Locked Gate",count:parseInt(e["Locked Gate"]||0)}].sort((i,a)=>a.count-i.count),r=parseInt(e["Total Entries"]||0);return{name:e["Blueprint Name"],confidence:e["Data Confidence"],bestMap:e["Most Likely Map"],bestCondition:e["Most Likely Condition"],entries:r,maps:t,conditions:s}}),Tt()}function Tt(){const n=document.getElementById("dataRows");if(!n)return;n.innerHTML="";let e=m.detailedData.filter(a=>{const c=(m.filters.search||"").toLowerCase();let u=m.all.find(C=>C.name===a.name);if(!u&&a.name.includes("Light Stick")&&(u=m.all.find(C=>C.name.includes("Light Stick"))),!u)return!1;const d=u?u.rarity:"common",f=u?u.type:"Unknown",p=u?u.map:"",_=u?u.cond:"",T=a.confidence||(u?u.conf:"");if(m.filters.rarities.size>0&&!m.filters.rarities.has(d)||m.filters.types.size>0&&!m.filters.types.has(f)||m.filters.maps.size>0&&!m.filters.maps.has(p)||m.filters.conds.size>0&&!m.filters.conds.has(_)||m.filters.confs.size>0&&!m.filters.confs.has(T))return!1;const A=m.collectedItems.has(a.name),R=m.wishlistedItems.has(a.name);return!(m.filters.collected==="collected"&&!A||m.filters.collected==="wishlist"&&!R||m.filters.collected==="not-collected"&&A||m.filters.collected==="spares"&&!(m.spares[a.name]>0)||c&&!(a.name+" "+f+" "+a.bestMap+" "+a.bestCondition).toLowerCase().includes(c))});if(e.sort((a,c)=>{const u=m.dataSort.direction==="asc"?1:-1,d=m.dataSort.column;if(d==="name")return a.name.localeCompare(c.name)*u;if(d==="rarity"){const f=T=>{let A=m.all.find(R=>R.name===T.name);return!A&&T.name.includes("Light Stick")&&(A=m.all.find(R=>R.name.includes("Light Stick"))),A?A.rarity:"common"},p=Ke(f(a)),_=Ke(f(c));return(p-_)*u}if(d==="confidence"){const f=C=>{const x=jo.indexOf(C);return x===-1?999:x},p=f(a.confidence),_=f(c.confidence);if(p!==_)return m.dataSort.direction==="desc"?p-_:_-p;const T=C=>{let x=m.all.find(D=>D.name===C.name);return!x&&C.name.includes("Light Stick")&&(x=m.all.find(D=>D.name.includes("Light Stick"))),x?x.rarity:"common"},A=Ke(T(a)),R=Ke(T(c));return A-R}return String(a[d]).localeCompare(String(c[d]))*u}),e.length===0){n.innerHTML='<div class="py-10 text-center text-zinc-500">No matching records found.</div>';return}const t=m.dataGridSize||"medium";let s="py-3 md:py-4 text-xs md:text-sm";t==="small"?s="py-1.5 md:py-2 text-[10px] md:text-xs":t==="large"&&(s="py-3 md:py-4 text-sm md:text-base");let r="w-10 h-10",i="text-sm";t==="small"?(r="w-8 h-8",i="text-xs"):t==="large"&&(r="w-12 h-12",i="text-sm md:text-base"),e.forEach((a,c)=>{let u=m.all.find(C=>C.name===a.name);!u&&a.name.includes("Light Stick")&&(u=m.all.find(C=>C.name.includes("Light Stick")));const d=u?u.rarity:"common",f=u?u.img:"icons/ItemCategory_Weapon.webp";u&&u.typeIcon;const p=document.createElement("div");p.className="group relative flex flex-col bg-zinc-900/70 border border-zinc-800/50 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-200 backdrop-blur-md";const _=document.createElement("div"),T="md:grid-cols-[2fr,1fr,1fr,1fr,40px]";_.className=`group grid grid-cols-[100px,0.7fr,0.9fr,0.5fr,0.4fr,18px] ${T} gap-x-2 md:gap-4 ${s} px-3 md:px-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center cursor-pointer`;const A=`mini-card-${c}`;if(_.innerHTML=`
      <!-- Item Name & Icon (Col 1) -->
      <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 overflow-hidden md:border-r border-white/5 pr-0 h-full min-w-0">
        <div id="${A}" class="shrink-0 relative flex items-center justify-center ${r}">
            ${u?"":`
            <div class="${r} rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden" 
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
      <div class="border-r border-white/5 h-full flex items-center pl-0 pr-1 md:pl-2 overflow-hidden">${HI(a.confidence)}</div>

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
    `,u){const C=_.querySelector(`#${A}`);if(C){let x=.42;m.dataGridSize==="small"&&(x=.25),m.dataGridSize==="large"&&(x=.5);const D=200;C.style.width=D*x+"px",C.style.height=D*x+"px";const V=Rf(u);V.className="",V.style.background="transparent",V.style.border="none",V.style.padding="0",V.style.containerType="inline-size",V.lastChild&&V.lastChild.remove();const U=V.querySelector(".type-tab");U&&U.remove(),V.querySelectorAll(".collected-badge, .wishlist-badge").forEach(O=>{O.style.transform="scale(1.8) translateY(-10px)",O.style.transformOrigin="top right",O.style.zIndex="50"}),V.style.width=D+"px",V.style.transform=`scale(${x})`,V.style.transformOrigin="top left",V.style.position="absolute",V.style.top="0",V.style.left="0",V.style.pointerEvents="none",C.appendChild(V)}}const R=document.createElement("div");R.className="hidden border-t border-zinc-800/50 bg-black/20",R.innerHTML=`
      <div class="p-4 md:p-6">
        <!-- Analytics Only -->
        <div class="space-y-6 w-full min-w-0">
          <!-- Maps Chart -->
          <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Map Distribution</h4>
            <div class="space-y-2">
              ${Du(a.maps,a.entries)}
            </div>
          </div>
          
          <!-- Conditions Chart -->
           <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Condition Distribution</h4>
            <div class="space-y-2">
              ${Du(a.conditions,a.entries)}
            </div>
          </div>
        </div>
      </div>
    `,_.onclick=()=>{R.classList.contains("hidden")?(R.classList.remove("hidden"),_.querySelectorAll(".expand-arrow").forEach(x=>x.classList.add("rotate-180")),_.classList.add("bg-white/[0.02]")):(R.classList.add("hidden"),_.querySelectorAll(".expand-arrow").forEach(x=>x.classList.remove("rotate-180")),_.classList.remove("bg-white/[0.02]"))},_.dataset.itemName=a.name,p.appendChild(_),p.appendChild(R),n.appendChild(p)}),m.dataTabTarget&&setTimeout(()=>{const a=n.querySelector(`div[data-item-name="${m.dataTabTarget}"]`);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),a.click(),a.classList.add("bg-emerald-500/10"),setTimeout(()=>a.classList.remove("bg-emerald-500/10"),1500)),m.dataTabTarget=null},300)}window.openDataDetail=function(n){m.dataTabTarget=n,m.dataSearch="";const e=document.getElementById("dataSearch");e&&(e.value=""),on("data")};function HI(n){let e="bg-zinc-800 text-zinc-400 border-zinc-700";const t=n.toLowerCase();return t.includes("confirmed")?e="bg-amber-500/10 text-amber-400 border-amber-500/20":t.includes("very high")||t.includes("high")?e="bg-pink-500/10 text-pink-400 border-pink-500/20":t.includes("confident")||t.includes("medium")?e="bg-blue-500/10 text-blue-400 border-blue-500/20":t.includes("low")&&(e="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"),`<span class="flex flex-wrap justify-center text-center leading-none px-1 py-0.5 rounded-md text-[9px] md:text-[10px] font-bold border ${e} uppercase tracking-wide w-full h-auto break-words whitespace-normal">${n}</span>`}function Du(n,e){const t=Math.max(...n.map(r=>r.count))||1,s=["#AA8900","#8E1C66","#15839E","#2E9949","#525452","#911331","#52269A","#A74F0F"];return n.map((r,i)=>{if(r.count===0)return"";const a=Math.round(r.count/e*100),c=Math.max(r.count/t*100,2),u=s[i]||"#3f3f46";return`
      <div class="flex items-center gap-3 text-xs">
        <div class="w-24 shrink-0 text-zinc-300 text-right truncate" title="${r.name}">${r.name}</div>
        <div class="flex-1 h-6 bg-zinc-900 rounded-md overflow-hidden relative group/bar">
          <div class="absolute inset-y-0 left-0 rounded-md transition-all duration-200 opacity-90 group-hover/bar:opacity-100 group-hover/bar:brightness-110" 
               style="width: ${c}%; background-color: ${u};"></div>
          <div class="absolute inset-0 flex items-center px-2">
             <span class="font-mono text-white z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] font-bold">${r.count} <span class="text-white/80 ml-1">(${a}%)</span></span>
          </div>
        </div>
      </div>
    `}).join("")}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("dataSearchInput");n&&n.addEventListener("input",i=>{m.dataSearch=i.target.value,Tt()});const e=document.getElementById("dataRefreshBtn");e&&(e.onclick=()=>{Wo()});const t=document.getElementById("disclaimerToggleBtn"),s=document.getElementById("disclaimerContent"),r=document.getElementById("disclaimerIcon");t&&s&&r&&t.addEventListener("click",()=>{s.classList.toggle("hidden"),r.classList.toggle("rotate-180")})});const nr={dam_battlegrounds:{name:"Dam Battlegrounds",url:"/images/maps/dam_battlegrounds.webp",bounds:[[0,0],[1e3,1095]]},the_spaceport:{name:"The Spaceport",url:"/images/maps/the_spaceport.webp",bounds:[[0,0],[1e3,1e3]]},buried_city:{name:"Buried City",url:"/images/maps/buried_city.webp",bounds:[[0,0],[1e3,1e3]]},the_blue_gate:{name:"The Blue Gate",url:"/images/maps/the_blue_gate.webp",bounds:[[0,0],[1e3,1333]]},stella_montis_upper:{name:"Stella Montis (Upper)",url:"/images/maps/stella_montis_lower.webp",bounds:[[0,0],[1e3,1667]]},stella_montis_lower:{name:"Stella Montis (Lower)",url:"/images/maps/stella_montis_upper.webp",bounds:[[0,0],[1e3,1333]]},the_blue_gate_underground:{name:"The Blue Gate (Underground)",url:"/images/maps/the_blue_gate_underground.webp",bounds:[[0,0],[469,1e3]]}};let Q={map:null,currentPin:null,currentMapId:"dam_battlegrounds",stellaLevel:"upper",selectedLocation:null};function WI(){const n=document.getElementById("mapLocationDisplay"),e=document.getElementById("closeMapPickerBtn"),t=document.getElementById("confirmPinBtn"),s=document.getElementById("mapPickerModal");n&&(n.onclick=Bf,n.style.cursor="pointer"),e&&(e.onclick=Go),t&&(t.onclick=XI),s&&(s.onclick=r=>{r.target===s&&Go(),!r.target.closest("#stellaDropdownMenu")&&!r.target.closest("#map-tab-stella")&&toggleStellaDropdown(!1)})}function Bf(){const n=document.getElementById("mapPickerModal");if(!n)return;n.classList.remove("hidden"),n.classList.add("flex");const e=document.getElementById("submitMapId");let t=e&&e.value?e.value:"dam_battlegrounds";t||(t="dam_battlegrounds");const s=nr[t]?t:"dam_battlegrounds";Q.map?setTimeout(()=>{Q.map.invalidateSize(),Ko(s)},100):setTimeout(()=>{GI(),Ko(s)},50);const r=document.getElementById("confirmBtnText");r&&(Q.selectedLocation?r.textContent="Confirm Location":r.textContent="Submit Map (No Pin)");const i=document.getElementById("confirmPinBtn");i&&(i.disabled=!1);const a=document.getElementById("removePinBtn");a&&(Q.selectedLocation?a.classList.remove("hidden"):a.classList.add("hidden"),a.onclick=Of)}function Of(n){n&&n.stopPropagation(),Q.currentPin&&(Q.map.removeLayer(Q.currentPin),Q.currentPin=null),Q.selectedLocation=null,document.getElementById("coordinatesDisplay").textContent="No location selected";const e=document.getElementById("confirmBtnText");e&&(e.textContent="Submit Map (No Pin)");const t=document.getElementById("removePinBtn");t&&t.classList.add("hidden");const s=document.getElementById("mapInstructions");s&&(s.style.opacity="1",s.textContent="Click or tap anywhere to place a pin")}function Go(){const n=document.getElementById("mapPickerModal");n&&(n.classList.add("hidden"),n.classList.remove("flex")),typeof toggleStellaDropdown=="function"?toggleStellaDropdown(!1):window.toggleStellaDropdown&&window.toggleStellaDropdown(!1),typeof toggleBgDropdown=="function"?toggleBgDropdown(!1):window.toggleBgDropdown&&window.toggleBgDropdown(!1)}function GI(){if(typeof L>"u"){console.error("Leaflet not loaded");return}Q.map=L.map("leafletMap",{crs:L.CRS.Simple,minZoom:-1,maxZoom:2,zoomSnap:0,zoomDelta:.5,wheelPxPerZoomLevel:120,zoomControl:!1,attributionControl:!1}),L.control.zoom({position:"bottomright"}).addTo(Q.map),Q.map.on("click",QI),KI()}function KI(){const n=document.getElementById("mapTabsContainer");if(!n)return;let t=Object.entries(nr).filter(([c])=>!c.includes("stella")&&!c.includes("blue_gate")).map(([c,u])=>`
    <button onclick="loadMap('${c}')" 
      class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"
      id="map-tab-${c}">
      ${u.name}
    </button>
  `).join("");const s=document.getElementById("stellaDropdownMenu");s&&s.remove();const r=document.getElementById("bgDropdownMenu");r&&r.remove();const i=Q.stellaLevel||"upper";t+=`
    <div class="relative inline-block text-left" id="stellaDropdownContainer">
      <button onclick="toggleStellaDropdown()" 
        class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2"
        id="map-tab-stella">
        Stella Montis
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      
      <div id="stellaDropdownMenu" class="hidden absolute left-0 mt-2 w-40 rounded-lg shadow-lg bg-zinc-900 border border-zinc-700 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
        <div class="py-1">
          <button onclick="loadMap('stella_montis_upper'); toggleStellaDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${i==="upper"?"text-emerald-500 font-bold":""}">
            Upper Level
          </button>
          <button onclick="loadMap('stella_montis_lower'); toggleStellaDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${i==="lower"?"text-emerald-500 font-bold":""}">
            Lower Level
          </button>
        </div>
      </div>
    </div>
  `;const a=Q.currentMapId.includes("blue_gate_underground")?"underground":"surface";t+=`
    <div class="relative inline-block text-left" id="bgDropdownContainer">
      <button onclick="toggleBgDropdown()" 
        class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2"
        id="map-tab-blue-gate">
        The Blue Gate
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      
      <div id="bgDropdownMenu" class="hidden absolute left-0 mt-2 w-40 rounded-lg shadow-lg bg-zinc-900 border border-zinc-700 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
        <div class="py-1">
          <button onclick="loadMap('the_blue_gate'); toggleBgDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${a==="surface"?"text-emerald-500 font-bold":""}">
            Surface
          </button>
          <button onclick="loadMap('the_blue_gate_underground'); toggleBgDropdown(false)" 
            class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors ${a==="underground"?"text-emerald-500 font-bold":""}">
            Underground
          </button>
        </div>
      </div>
    </div>
  `,n.innerHTML=t}window.toggleStellaDropdown=n=>{const e=document.getElementById("stellaDropdownMenu"),t=document.getElementById("map-tab-stella");if(!e||!t)return;if(n!==void 0?n:e.classList.contains("hidden")){window.toggleBgDropdown&&window.toggleBgDropdown(!1),e.parentElement!==document.body&&document.body.appendChild(e),e.classList.remove("hidden");const r=t.getBoundingClientRect();e.style.position="fixed",e.style.top=`${r.bottom+8}px`,e.style.left=`${r.left}px`,e.style.minWidth=`${Math.max(r.width,160)}px`,e.style.zIndex="20000",e.style.opacity="1"}else e.classList.add("hidden")};window.toggleBgDropdown=n=>{const e=document.getElementById("bgDropdownMenu"),t=document.getElementById("map-tab-blue-gate");if(!e||!t)return;if(n!==void 0?n:e.classList.contains("hidden")){window.toggleStellaDropdown&&window.toggleStellaDropdown(!1),e.parentElement!==document.body&&document.body.appendChild(e),e.classList.remove("hidden");const r=t.getBoundingClientRect();e.style.position="fixed",e.style.top=`${r.bottom+8}px`,e.style.left=`${r.left}px`,e.style.minWidth=`${Math.max(r.width,160)}px`,e.style.zIndex="20000",e.style.opacity="1"}else e.classList.add("hidden")};function Ko(n){let e=n;const t=n.includes("stella"),s=n.includes("blue_gate");t||toggleStellaDropdown(!1),s||toggleBgDropdown(!1),t&&(n==="stella_montis_upper"&&(Q.stellaLevel="upper"),n==="stella_montis_lower"&&(Q.stellaLevel="lower"),e=`stella_montis_${Q.stellaLevel}`);const r=nr[e];if(!r)return;Q.currentMapId=e,document.querySelectorAll("#mapTabsContainer > button").forEach(_=>{_.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"});const i=document.getElementById("map-tab-stella");if(t&&i)i.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 flex items-center gap-2";else if(!t){const _=document.getElementById(`map-tab-${e}`);_&&(_.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"),i&&(i.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2")}const a=document.getElementById("map-tab-blue-gate");s&&a?a.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 flex items-center gap-2":!s&&a&&(a.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2"),Q.map.eachLayer(_=>{(_ instanceof L.ImageOverlay||_ instanceof L.Marker)&&Q.map.removeLayer(_)});const c=document.getElementById("stellaLevelToggle");c&&c.remove(),Q.currentPin=null,Q.selectedLocation=null,document.getElementById("confirmPinBtn").disabled=!1,document.getElementById("coordinatesDisplay").textContent="No location selected";const u=r.bounds;L.imageOverlay(r.url,u).addTo(Q.map),Q.map.fitBounds(u);const d=document.getElementById("mapInstructions");d&&(d.style.opacity="1"),document.querySelectorAll("#stellaDropdownMenu button").forEach(_=>{_.innerText.includes("Upper")&&Q.stellaLevel==="upper"||_.innerText.includes("Lower")&&Q.stellaLevel==="lower"?_.classList.add("text-emerald-500","font-bold"):(_.classList.remove("text-emerald-500","font-bold"),_.classList.add("text-zinc-300"))}),document.querySelectorAll("#bgDropdownMenu button").forEach(_=>{_.innerText.includes("Surface")&&!e.includes("underground")||_.innerText.includes("Underground")&&e.includes("underground")?_.classList.add("text-emerald-500","font-bold"):(_.classList.remove("text-emerald-500","font-bold"),_.classList.add("text-zinc-300"))}),Of()}function QI(n){const{lat:e,lng:t}=n.latlng,s=nr[Q.currentMapId];if(!s)return;const[r,i]=s.bounds[1];if(e<0||e>r||t<0||t>i)return;Q.currentPin&&Q.map.removeLayer(Q.currentPin);const a=L.divIcon({className:"custom-pin-icon",html:`
      <div class="relative">
        <svg class="w-[45px] h-[45px] text-emerald-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,iconSize:[45,45],iconAnchor:[22.5,45]});Q.currentPin=L.marker([e,t],{icon:a}).addTo(Q.map);const c=Math.round(t),u=Math.round(e);Q.selectedLocation={x:c,y:u,mapId:Q.currentMapId},document.getElementById("coordinatesDisplay").textContent=`X: ${c}, Y: ${u}`,document.getElementById("confirmPinBtn").disabled=!1;const d=document.getElementById("confirmBtnText");d&&(d.textContent="Submit Pinned Location");const f=document.getElementById("removePinBtn");f&&f.classList.remove("hidden");const p=document.getElementById("mapInstructions");p&&(p.style.opacity="0")}function XI(){var A;const n=Q.selectedLocation?Q.selectedLocation.mapId:Q.currentMapId;let e=n,t=0;n.includes("stella_montis")?(e="stella_montis",n.includes("lower")&&(t=1)):n.includes("the_blue_gate")&&(e="the_blue_gate",n.includes("underground")&&(t=1));const s=Q.selectedLocation?Q.selectedLocation.x:null,r=Q.selectedLocation?Q.selectedLocation.y:null,i=document.getElementById("submitMapId"),a=document.getElementById("submitMapX"),c=document.getElementById("submitMapY"),u=document.getElementById("submitMapLayer");i&&(i.value=e||""),a&&(a.value=s!==null?s:""),c&&(c.value=r!==null?r:""),u&&(u.value=t);let d=((A=nr[n])==null?void 0:A.name)||"Map";n==="stella_montis_upper"&&(d="Stella Upper"),n==="stella_montis_lower"&&(d="Stella Lower"),n==="the_blue_gate_underground"&&(d="Blue Gate (Und)"),n==="the_blue_gate"&&(d="Blue Gate (Surf)");const f=s!==null&&r!==null?`${d} (${s}, ${r})`:d,p=document.getElementById("mapDisplayValue");p&&(p.textContent=f,p.classList.remove("text-zinc-500"),p.classList.add("text-white","font-medium"));const _=document.getElementById("clearMapBtn");_&&_.classList.remove("hidden");const T=document.getElementById("mapLocationDisplay");T&&(T.classList.add("border-emerald-500","bg-emerald-500/10"),setTimeout(()=>T.classList.remove("bg-emerald-500/10"),500)),Go()}window.clearMapSelection=n=>{n&&n.stopPropagation();const e=document.getElementById("submitMapId"),t=document.getElementById("submitMapX"),s=document.getElementById("submitMapY");e&&(e.value=""),t&&(t.value=""),s&&(s.value="");const r=document.getElementById("mapDisplayValue");r&&(r.textContent="Select Map Location...",r.classList.add("text-zinc-500"),r.classList.remove("text-white","font-medium"));const i=document.getElementById("clearMapBtn");i&&i.classList.add("hidden");const a=document.getElementById("mapLocationDisplay");a&&a.classList.remove("border-emerald-500")};window.loadMap=Ko;window.openMapPicker=Bf;const Nu="arc_dataGridSize_v1";function Qo(n){document.getElementById("gridSizeLabelKey"),document.querySelectorAll(".filter-options h3").forEach(t=>{(t.textContent.includes("Grid Size")||t.textContent.includes("List Size"))&&(t.textContent=n==="data"?"List Size":"Grid Size")})}function YI(){const n={small:document.getElementById("btnGridSmall"),medium:document.getElementById("btnGridMedium"),large:document.getElementById("btnGridLarge")};try{const c=localStorage.getItem(Nu);c&&(m.dataGridSize=c)}catch(c){console.debug("Failed to load data grid size",c)}const e="gridSizePreference";let t=localStorage.getItem(e)||"M";function s(c){const u=window.innerWidth<=768;let d=150;u?c==="S"?d=90:c==="M"?d=120:c==="L"&&(d=140):c==="S"?d=110:c==="M"?d=150:c==="L"&&(d=220),document.documentElement.style.setProperty("--cardSize",d+"px");try{localStorage.setItem(e,c)}catch{}t=c,m.blueprintGridSize=c,i(),typeof Ho=="function"&&Ho()}function r(c){m.dataGridSize=c;try{localStorage.setItem(Nu,c)}catch{}i(),typeof Tt=="function"&&Tt()}function i(){Object.values(n).forEach(u=>{u&&(u.classList.remove("bg-emerald-600","text-white","font-bold"),u.classList.remove("bg-zinc-600","text-white","border-zinc-500"),u.classList.add("bg-zinc-800","text-zinc-400","border-transparent"))});let c=null;if(m.currentTab==="data"){const u=m.dataGridSize||"medium";c=n[u]}else{const u=m.blueprintGridSize||t||"M";u==="S"?c=n.small:u==="M"?c=n.medium:u==="L"&&(c=n.large)}c&&(c.classList.remove("bg-zinc-800","text-zinc-400","border-transparent"),c.classList.add("bg-zinc-600","text-white","border-zinc-500"))}const a=c=>{m.currentTab==="data"?r(c):s({small:"S",medium:"M",large:"L"}[c])};n.small&&(n.small.onclick=()=>a("small")),n.medium&&(n.medium.onclick=()=>a("medium")),n.large&&(n.large.onclick=()=>a("large")),s(t),window.updateGridVisuals=i,m.dataGridSize||(m.dataGridSize="medium")}document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{YI(),[document.getElementById("tabBlueprints"),document.getElementById("tabData"),document.getElementById("tabProgression")].forEach(e=>{e&&e.addEventListener("click",()=>{setTimeout(()=>{typeof window.updateGridVisuals=="function"&&window.updateGridVisuals()},50)})})},150)});
