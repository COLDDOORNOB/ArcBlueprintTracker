(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();function rp(n,e){n.indexOf(e)===-1&&n.push(e)}const md=(n,e,t)=>Math.min(Math.max(t,n),e),Xe={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},Hs=n=>typeof n=="number",Hn=n=>Array.isArray(n)&&!Hs(n[0]),ip=(n,e,t)=>{const s=e-n;return((t-n)%s+s)%s+n};function op(n,e){return Hn(n)?n[ip(0,n.length,e)]:n}const pd=(n,e,t)=>-t*n+t*e+n,gd=()=>{},Kt=n=>n,ma=(n,e,t)=>e-n===0?1:(t-n)/(e-n);function yd(n,e){const t=n[n.length-1];for(let s=1;s<=e;s++){const r=ma(0,e,s);n.push(pd(t,1,r))}}function ap(n){const e=[0];return yd(e,n-1),e}function cp(n,e=ap(n.length),t=Kt){const s=n.length,r=s-e.length;return r>0&&yd(e,r),i=>{let a=0;for(;a<s-2&&!(i<e[a+1]);a++);let c=md(0,1,ma(e[a],e[a+1],i));return c=op(t,a)(c),pd(n[a],n[a+1],c)}}const _d=n=>Array.isArray(n)&&Hs(n[0]),ko=n=>typeof n=="object"&&!!n.createAnimation,Jn=n=>typeof n=="function",lp=n=>typeof n=="string",Os={ms:n=>n*1e3,s:n=>n/1e3},wd=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,up=1e-7,dp=12;function hp(n,e,t,s,r){let i,a,c=0;do a=e+(t-e)/2,i=wd(a,s,r)-n,i>0?t=a:e=a;while(Math.abs(i)>up&&++c<dp);return a}function Ls(n,e,t,s){if(n===e&&t===s)return Kt;const r=i=>hp(i,0,1,n,t);return i=>i===0||i===1?i:wd(r(i),e,s)}const fp=(n,e="end")=>t=>{t=e==="end"?Math.min(t,.999):Math.max(t,.001);const s=t*n,r=e==="end"?Math.floor(s):Math.ceil(s);return md(0,1,r/n)},mp={ease:Ls(.25,.1,.25,1),"ease-in":Ls(.42,0,1,1),"ease-in-out":Ls(.42,0,.58,1),"ease-out":Ls(0,0,.58,1)},pp=/\((.*?)\)/;function Po(n){if(Jn(n))return n;if(_d(n))return Ls(...n);const e=mp[n];if(e)return e;if(n.startsWith("steps")){const t=pp.exec(n);if(t){const s=t[1].split(",");return fp(parseFloat(s[0]),s[1].trim())}}return Kt}class Ed{constructor(e,t=[0,1],{easing:s,duration:r=Xe.duration,delay:i=Xe.delay,endDelay:a=Xe.endDelay,repeat:c=Xe.repeat,offset:l,direction:d="normal",autoplay:f=!0}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=Kt,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((y,v)=>{this.resolve=y,this.reject=v}),s=s||Xe.easing,ko(s)){const y=s.createAnimation(t);s=y.easing,t=y.keyframes||t,r=y.duration||r}this.repeat=c,this.easing=Hn(s)?Kt:Po(s),this.updateDuration(r);const m=cp(t,l,Hn(s)?s.map(Po):Kt);this.tick=y=>{var v;i=i;let b=0;this.pauseTime!==void 0?b=this.pauseTime:b=(y-this.startTime)*this.rate,this.t=b,b/=1e3,b=Math.max(b-i,0),this.playState==="finished"&&this.pauseTime===void 0&&(b=this.totalDuration);const R=b/this.duration;let C=Math.floor(R),P=R%1;!P&&R>=1&&(P=1),P===1&&C--;const N=C%2;(d==="reverse"||d==="alternate"&&N||d==="alternate-reverse"&&!N)&&(P=1-P);const V=b>=this.totalDuration?1:Math.min(P,1),M=m(this.easing(V));e(M),this.pauseTime===void 0&&(this.playState==="finished"||b>=this.totalDuration+a)?(this.playState="finished",(v=this.resolve)===null||v===void 0||v.call(this,M)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},f&&this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class gp{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const lo=new WeakMap;function vd(n){return lo.has(n)||lo.set(n,{transforms:[],values:new Map}),lo.get(n)}function yp(n,e){return n.has(e)||n.set(e,new gp),n.get(e)}const _p=["","X","Y","Z"],wp=["translate","scale","rotate","skew"],Jr={x:"translateX",y:"translateY",z:"translateZ"},El={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:n=>n+"deg"},Ep={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:n=>n+"px"},rotate:El,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:Kt},skew:El},Ws=new Map,pa=n=>`--motion-${n}`,Zr=["x","y","z"];wp.forEach(n=>{_p.forEach(e=>{Zr.push(n+e),Ws.set(pa(n+e),Ep[n])})});const vp=(n,e)=>Zr.indexOf(n)-Zr.indexOf(e),Ip=new Set(Zr),Id=n=>Ip.has(n),bp=(n,e)=>{Jr[e]&&(e=Jr[e]);const{transforms:t}=vd(n);rp(t,e),n.style.transform=Tp(t)},Tp=n=>n.sort(vp).reduce(Ap,"").trim(),Ap=(n,e)=>`${n} ${e}(var(${pa(e)}))`,xo=n=>n.startsWith("--"),vl=new Set;function Cp(n){if(!vl.has(n)){vl.add(n);try{const{syntax:e,initialValue:t}=Ws.has(n)?Ws.get(n):{};CSS.registerProperty({name:n,inherits:!1,syntax:e,initialValue:t})}catch{}}}const uo=(n,e)=>document.createElement("div").animate(n,e),Il={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{uo({opacity:[1]})}catch{return!1}return!0},finished:()=>!!uo({opacity:[0,1]},{duration:.001}).finished,linearEasing:()=>{try{uo({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},ho={},jn={};for(const n in Il)jn[n]=()=>(ho[n]===void 0&&(ho[n]=Il[n]()),ho[n]);const Sp=.015,Rp=(n,e)=>{let t="";const s=Math.round(e/Sp);for(let r=0;r<s;r++)t+=n(ma(0,s-1,r))+", ";return t.substring(0,t.length-2)},bl=(n,e)=>Jn(n)?jn.linearEasing()?`linear(${Rp(n,e)})`:Xe.easing:_d(n)?kp(n):n,kp=([n,e,t,s])=>`cubic-bezier(${n}, ${e}, ${t}, ${s})`;function Pp(n,e){for(let t=0;t<n.length;t++)n[t]===null&&(n[t]=t?n[t-1]:e());return n}const xp=n=>Array.isArray(n)?n:[n];function Lo(n){return Jr[n]&&(n=Jr[n]),Id(n)?pa(n):n}const Rr={get:(n,e)=>{e=Lo(e);let t=xo(e)?n.style.getPropertyValue(e):getComputedStyle(n)[e];if(!t&&t!==0){const s=Ws.get(e);s&&(t=s.initialValue)}return t},set:(n,e,t)=>{e=Lo(e),xo(e)?n.style.setProperty(e,t):n.style[e]=t}};function bd(n,e=!0){if(!(!n||n.playState==="finished"))try{n.stop?n.stop():(e&&n.commitStyles(),n.cancel())}catch{}}function Lp(n,e){var t;let s=(e==null?void 0:e.toDefaultUnit)||Kt;const r=n[n.length-1];if(lp(r)){const i=((t=r.match(/(-?[\d.]+)([a-z%]*)/))===null||t===void 0?void 0:t[2])||"";i&&(s=a=>a+i)}return s}function Np(){return window.__MOTION_DEV_TOOLS_RECORD}function Dp(n,e,t,s={},r){const i=Np(),a=s.record!==!1&&i;let c,{duration:l=Xe.duration,delay:d=Xe.delay,endDelay:f=Xe.endDelay,repeat:m=Xe.repeat,easing:y=Xe.easing,persist:v=!1,direction:b,offset:R,allowWebkitAcceleration:C=!1,autoplay:P=!0}=s;const N=vd(n),V=Id(e);let M=jn.waapi();V&&bp(n,e);const O=Lo(e),F=yp(N.values,O),E=Ws.get(O);return bd(F.animation,!(ko(y)&&F.generator)&&s.record!==!1),()=>{const g=()=>{var I,S;return(S=(I=Rr.get(n,O))!==null&&I!==void 0?I:E==null?void 0:E.initialValue)!==null&&S!==void 0?S:0};let w=Pp(xp(t),g);const A=Lp(w,E);if(ko(y)){const I=y.createAnimation(w,e!=="opacity",g,O,F);y=I.easing,w=I.keyframes||w,l=I.duration||l}if(xo(O)&&(jn.cssRegisterProperty()?Cp(O):M=!1),V&&!jn.linearEasing()&&(Jn(y)||Hn(y)&&y.some(Jn))&&(M=!1),M){E&&(w=w.map(T=>Hs(T)?E.toDefaultUnit(T):T)),w.length===1&&(!jn.partialKeyframes()||a)&&w.unshift(g());const I={delay:Os.ms(d),duration:Os.ms(l),endDelay:Os.ms(f),easing:Hn(y)?void 0:bl(y,l),direction:b,iterations:m+1,fill:"both"};c=n.animate({[O]:w,offset:R,easing:Hn(y)?y.map(T=>bl(T,l)):void 0},I),c.finished||(c.finished=new Promise((T,ne)=>{c.onfinish=T,c.oncancel=ne}));const S=w[w.length-1];c.finished.then(()=>{v||(Rr.set(n,O,S),c.cancel())}).catch(gd),C||(c.playbackRate=1.000001)}else if(r&&V)w=w.map(I=>typeof I=="string"?parseFloat(I):I),w.length===1&&w.unshift(parseFloat(g())),c=new r(I=>{Rr.set(n,O,A?A(I):I)},w,Object.assign(Object.assign({},s),{duration:l,easing:y}));else{const I=w[w.length-1];Rr.set(n,O,E&&Hs(I)?E.toDefaultUnit(I):I)}return a&&i(n,e,w,{duration:l,delay:d,easing:y,repeat:m,offset:R},"motion-one"),F.setAnimation(c),c&&!P&&c.pause(),c}}const Mp=(n,e)=>n[e]?Object.assign(Object.assign({},n),n[e]):Object.assign({},n);function Vp(n,e){return typeof n=="string"?n=document.querySelectorAll(n):n instanceof Element&&(n=[n]),Array.from(n||[])}const Op=n=>n(),Td=(n,e,t=Xe.duration)=>new Proxy({animations:n.map(Op).filter(Boolean),duration:t,options:e},Fp),Bp=n=>n.animations[0],Fp={get:(n,e)=>{const t=Bp(n);switch(e){case"duration":return n.duration;case"currentTime":return Os.s((t==null?void 0:t[e])||0);case"playbackRate":case"playState":return t==null?void 0:t[e];case"finished":return n.finished||(n.finished=Promise.all(n.animations.map(Up)).catch(gd)),n.finished;case"stop":return()=>{n.animations.forEach(s=>bd(s))};case"forEachNative":return s=>{n.animations.forEach(r=>s(r,n))};default:return typeof(t==null?void 0:t[e])>"u"?void 0:()=>n.animations.forEach(s=>s[e]())}},set:(n,e,t)=>{switch(e){case"currentTime":t=Os.ms(t);case"playbackRate":for(let s=0;s<n.animations.length;s++)n.animations[s][e]=t;return!0}return!1}},Up=n=>n.finished;function zp(n=.1,{start:e=0,from:t=0,easing:s}={}){return(r,i)=>{const a=Hs(t)?t:$p(t,i),c=Math.abs(a-r);let l=n*c;if(s){const d=i*n;l=Po(s)(l/d)*d}return e+l}}function $p(n,e){if(n==="first")return 0;{const t=e-1;return n==="last"?t:t/2}}function qp(n,e,t){return Jn(n)?n(e,t):n}function jp(n){return function(t,s,r={}){t=Vp(t);const i=t.length,a=[];for(let c=0;c<i;c++){const l=t[c];for(const d in s){const f=Mp(r,d);f.delay=qp(f.delay,c,i);const m=Dp(l,d,s[d],f,n);a.push(m)}}return Td(a,r,r.duration)}}const Hp=jp(Ed);function Wp(n,e={}){return Td([()=>{const t=new Ed(n,[0,1],e);return t.finished.catch(()=>{}),t}],e,e.duration)}function Gp(n,e,t){return(Jn(n)?Wp:Hp)(n,e,t)}window.TutorialSlideshow={steps:[{text:"Welcome to the <span class='text-highlight'>Arc Blueprint Tracker</span>!",imageDesktop:"desktop_main.webp",imageMobile:"mobile_main.webp"},{textDesktop:"<span class='text-highlight'>Click</span> a Blueprint to see information on where you can get it.",textMobile:"<span class='text-highlight'>Tap</span> a Blueprint to see information on where you can get it.",imageDesktop:"desktop_main_card_h.webp",imageMobile:"mobile_main_card_h.webp"},{text:"Here you can see the data on its <span class='text-highlight'>spawn patterns</span>, or if it is a Quest or Trial reward.",imageDesktop:"desktop_details_h.webp",imageMobile:"mobile_details_h.webp"},{text:"The <span class='text-highlight'>Confidence</span> — or amount of data pointing to that conclusion — is marked by a colored indicator on the item card.",imageDesktop:"desktop_main_conf_indicator_h.webp",imageMobile:"mobile_main_conf_indicator_h.webp"},{textDesktop:"<span class='text-highlight'>Right click</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",textMobile:"<span class='text-highlight'>Long press</span> a Blueprint to open the <span class='text-highlight'>Quick Actions Menu</span>.",imageDesktop:"desktop_context_menu_h.webp",imageMobile:"mobile_main_card_h.webp"},{text:"Here you can mark items as <span class='text-green'>collected</span>, <span class='text-yellow'>wishlisted</span>, or add <span class='text-blue'>spares</span>.",imageDesktop:"desktop_context_menu_h.webp",imageMobile:"mobile_context_menu_h.webp"},{text:"Have a lot of items to collect? Use the <span class='text-highlight'>mark items as collected</span> button to enter collect mode.",imageDesktop:"desktop_collect_mode_h.webp",imageMobile:"mobile_collect_mode_h.webp"},{text:"After you find a Blueprint please submit your findings right here on the blueprints tab!",imageDesktop:"desktop_main_submit_button_h.webp",imageMobile:"mobile_main_submit_button.webp"},{text:"Add in the blueprint, condition, map/location, and importantly container type. Once we have collected enough data we will make a heatmap of all these user submitted locations!",imageDesktop:"desktop_submit_final.webp",imageMobile:"mobile_submission_final.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the sidebar icon to access your account and the filters menu.",textMobile:"<span class='text-highlight'>Tap</span> the sidebar icon to access your account and the filters menu.",imageDesktop:"desktop_main_filters_button_h.webp",imageMobile:"mobile_main_filter_button_h.webp"},{text:"Sync with a google account to keep track of your item collection. Use the filters buttons to customize your view.",imageDesktop:"desktop_main_sign_in_h.webp",imageMobile:"mobile_filters_panel_sign_in_h.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or click the “detailed data” button inside an item’s description to jump to that item’s data.)",textMobile:"<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Data Tab</span> to see even more detailed breakdowns. (Or tap the “detailed data” button inside an item’s description to jump to that item’s data.)",imageDesktop:"desktop_data_tab_h.webp",imageMobile:"mobile_data_tab_h.webp"},{textDesktop:"This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Click</span> an item to see its detailed stats.",textMobile:"This is the drop registry, where you can find detailed, raw data on blueprint spawns. <span class='text-highlight'>Tap</span> an item to see its detailed stats.",imageDesktop:"desktop_data_dropdown_h.webp",imageMobile:"mobile_data_tab_dropdown_h.webp"},{textDesktop:"<span class='text-highlight'>Click</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",textMobile:"<span class='text-highlight'>Tap</span> the <span class='text-highlight'>Progression Tab</span> to view your collection progress.",imageDesktop:"desktop_progression_h.webp",imageMobile:"mobile_progression_tab_h.webp"},{text:"The <span class='text-highlight'>Updates and News</span> tab is where you can keep up with new updates and access the Discord and Kofi as well!",imageDesktop:"desktop_news_h.webp",imageMobile:"mobile_news_tab.webp"},{text:"Join the Discord to share findings, trade blueprints, discuss strategies, and generally stay up to date with the site.",imageDesktop:"desktop_news_discord_h.webp",imageMobile:"mobile_news_tab_discord.webp"},{text:"Kofi is how you can support me if you enjoy the site and find it useful. I want to keep this site free and ad free for as long as possible and so far community donations have made that possible!",imageDesktop:"desktop_news_kofi.webp",imageMobile:"mobile_news_tab_kofi.webp"},{text:"Enjoy the tracker and good luck Topside, <span class='text-highlight'>Raider</span>!",imageDesktop:"desktop_main.webp",imageMobile:"mobile_main.webp"}],currentIndex:0,prefix:"images/tutorial/",init(){localStorage.getItem("tutorial_slideshow_seen")||setTimeout(()=>this.open(),500),window.openTutorial=()=>this.open()},open(){this.currentIndex=0,this.renderOverlay(),document.body.style.overflow="hidden",this.preloadImages()},close(){const n=document.getElementById("tutorialSlideshowOverlay");n&&(n.classList.remove("active"),setTimeout(()=>n.remove(),300)),document.body.style.overflow="",localStorage.setItem("tutorial_slideshow_seen","true")},showExitPrompt(){const n=document.getElementById("tutorialSlideshowOverlay");if(!n)return;const e=n.querySelector(".tutorial-modal");e&&(e.style.maxWidth="360px",e.style.width="90%",e.style.height="auto",e.style.minHeight="auto",e.style.background="rgba(24, 24, 27, 0.4)",e.style.backdropFilter="blur(12px)",e.style.webkitBackdropFilter="blur(12px)",e.style.border="1px solid rgba(255, 255, 255, 0.08)",e.style.boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)",e.style.borderRadius="16px",e.style.display="flex",e.style.flexDirection="column",e.style.overflow="hidden",e.innerHTML=`
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
        `,document.body.appendChild(e);const t=document.getElementById("tutorialDots");this.steps.forEach((s,r)=>{const i=document.createElement("div");i.className="tutorial-dot",t.appendChild(i)}),requestAnimationFrame(()=>{e.classList.add("active"),this.updateContent()}),window.addEventListener("resize",this.handleResize.bind(this))},getText(n){const e=window.innerWidth<768;return e&&n.textMobile?n.textMobile:!e&&n.textDesktop?n.textDesktop:n.text},handleResize(){if(!document.getElementById("tutorialSlideshowOverlay"))return;const n=this.steps[this.currentIndex];if(!n)return;const e=document.getElementById("tutorialImage");e&&(e.src=this.getImageUrl(n));const t=document.getElementById("tutorialText");t&&(t.innerHTML=this.getText(n))},updateContent(){const n=this.steps[this.currentIndex],e=document.getElementById("tutorialImage"),t=document.getElementById("tutorialText"),s=document.querySelectorAll(".tutorial-dot"),r=document.getElementById("tutorialBackBtn"),i=document.getElementById("tutorialNextBtn");e&&(e.style.opacity="0.5",setTimeout(()=>{e.src=this.getImageUrl(n),e.onload=()=>{e.style.opacity="1"}},100)),t&&(t.innerHTML=this.getText(n)),s.forEach((a,c)=>{c===this.currentIndex?a.classList.add("active"):a.classList.remove("active")}),r&&(r.style.visibility=this.currentIndex===0?"hidden":"visible"),i&&(i.textContent=this.currentIndex===this.steps.length-1?"Finish":"Next")}};const Tl=()=>{console.log("Initializing Tutorial Slideshow..."),window.TutorialSlideshow?window.TutorialSlideshow.init():console.error("TutorialSlideshow not found on window!")};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Tl):Tl();const Kp=()=>{};var Al={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ad=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},Qp=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],a=n[t++],c=n[t++],l=((r&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Cd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],a=r+1<n.length,c=a?n[r+1]:0,l=r+2<n.length,d=l?n[r+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let y=(c&15)<<2|d>>6,v=d&63;l||(v=64,a||(y=64)),s.push(t[f],t[m],t[y],t[v])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ad(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qp(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],c=r<n.length?t[n.charAt(r)]:0;++r;const d=r<n.length?t[n.charAt(r)]:64;++r;const m=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||c==null||d==null||m==null)throw new Xp;const y=i<<2|c>>4;if(s.push(y),d!==64){const v=c<<4&240|d>>2;if(s.push(v),m!==64){const b=d<<6&192|m;s.push(b)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Xp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yp=function(n){const e=Ad(n);return Cd.encodeByteArray(e,!0)},ei=function(n){return Yp(n).replace(/\./g,"")},Sd=function(n){try{return Cd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Jp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Zp=()=>Jp().__FIREBASE_DEFAULTS__,eg=()=>{if(typeof process>"u"||typeof Al>"u")return;const n=Al.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},tg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Sd(n[1]);return e&&JSON.parse(e)},Ii=()=>{try{return Kp()||Zp()||eg()||tg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Rd=n=>{var e,t;return(t=(e=Ii())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},kd=n=>{const e=Rd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Pd=()=>{var n;return(n=Ii())==null?void 0:n.config},xd=n=>{var e;return(e=Ii())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function ln(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ga(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Ld(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ei(JSON.stringify(t)),ei(JSON.stringify(a)),""].join(".")}const Bs={};function sg(){const n={prod:[],emulator:[]};for(const e of Object.keys(Bs))Bs[e]?n.emulator.push(e):n.prod.push(e);return n}function rg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Cl=!1;function ya(n,e){if(typeof window>"u"||typeof document>"u"||!ln(window.location.host)||Bs[n]===e||Bs[n]||Cl)return;Bs[n]=e;function t(y){return`__firebase__banner__${y}`}const s="__firebase__banner",i=sg().prod.length>0;function a(){const y=document.getElementById(s);y&&y.remove()}function c(y){y.style.display="flex",y.style.background="#7faaf0",y.style.position="fixed",y.style.bottom="5px",y.style.left="5px",y.style.padding=".5em",y.style.borderRadius="5px",y.style.alignItems="center"}function l(y,v){y.setAttribute("width","24"),y.setAttribute("id",v),y.setAttribute("height","24"),y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.style.marginLeft="-6px"}function d(){const y=document.createElement("span");return y.style.cursor="pointer",y.style.marginLeft="16px",y.style.fontSize="24px",y.innerHTML=" &times;",y.onclick=()=>{Cl=!0,a()},y}function f(y,v){y.setAttribute("id",v),y.innerText="Learn more",y.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",y.setAttribute("target","__blank"),y.style.paddingLeft="5px",y.style.textDecoration="underline"}function m(){const y=rg(s),v=t("text"),b=document.getElementById(v)||document.createElement("span"),R=t("learnmore"),C=document.getElementById(R)||document.createElement("a"),P=t("preprendIcon"),N=document.getElementById(P)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(y.created){const V=y.element;c(V),f(C,R);const M=d();l(N,P),V.append(N,b,C,M),document.body.appendChild(V)}i?(b.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(N.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,b.innerText="Preview backend running in this workspace."),b.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ig(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Fe())}function og(){var e;const n=(e=Ii())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ag(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function lg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ug(){const n=Fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function dg(){return!og()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function hg(){try{return typeof indexedDB=="object"}catch{return!1}}function fg(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg="FirebaseError";class vt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=mg,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,sr.prototype.create)}}class sr{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],a=i?pg(i,s):"Error",c=`${this.serviceName}: ${a} (${r}).`;return new vt(r,c,s)}}function pg(n,e){return n.replace(gg,(t,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const gg=/\{\$([^}]+)}/g;function yg(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function An(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],a=e[r];if(Sl(i)&&Sl(a)){if(!An(i,a))return!1}else if(i!==a)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function Sl(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rr(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function _g(n,e){const t=new wg(n,e);return t.subscribe.bind(t)}class wg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Eg(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=fo),r.error===void 0&&(r.error=fo),r.complete===void 0&&(r.complete=fo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Eg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function fo(){}/**
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
 */function Ce(n){return n&&n._delegate?n._delegate:n}class Zt{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const pn="[DEFAULT]";/**
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
 */class vg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new ng;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(bg(e))try{this.getOrInitializeService({instanceIdentifier:pn})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=pn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=pn){return this.instances.has(e)}getOptions(e=pn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);s===c&&a.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ig(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=pn){return this.component?this.component.multipleInstances?e:pn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ig(n){return n===pn?void 0:n}function bg(n){return n.instantiationMode==="EAGER"}/**
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
 */class Tg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Y||(Y={}));const Ag={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},Cg=Y.INFO,Sg={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},Rg=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=Sg[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class _a{constructor(e){this.name=e,this._logLevel=Cg,this._logHandler=Rg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ag[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const kg=(n,e)=>e.some(t=>n instanceof t);let Rl,kl;function Pg(){return Rl||(Rl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xg(){return kl||(kl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Nd=new WeakMap,No=new WeakMap,Dd=new WeakMap,mo=new WeakMap,wa=new WeakMap;function Lg(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(Qt(n.result)),r()},a=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Nd.set(t,n)}).catch(()=>{}),wa.set(e,n),e}function Ng(n){if(No.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),r()},a=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});No.set(n,e)}let Do={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return No.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Dd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Dg(n){Do=n(Do)}function Mg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(po(this),e,...t);return Dd.set(s,e.sort?e.sort():[e]),Qt(s)}:xg().includes(n)?function(...e){return n.apply(po(this),e),Qt(Nd.get(this))}:function(...e){return Qt(n.apply(po(this),e))}}function Vg(n){return typeof n=="function"?Mg(n):(n instanceof IDBTransaction&&Ng(n),kg(n,Pg())?new Proxy(n,Do):n)}function Qt(n){if(n instanceof IDBRequest)return Lg(n);if(mo.has(n))return mo.get(n);const e=Vg(n);return e!==n&&(mo.set(n,e),wa.set(e,n)),e}const po=n=>wa.get(n);function Og(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const a=indexedDB.open(n,e),c=Qt(a);return s&&a.addEventListener("upgradeneeded",l=>{s(Qt(a.result),l.oldVersion,l.newVersion,Qt(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",d=>r(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Bg=["get","getKey","getAll","getAllKeys","count"],Fg=["put","add","delete","clear"],go=new Map;function Pl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(go.get(e))return go.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=Fg.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Bg.includes(t)))return;const i=async function(a,...c){const l=this.transaction(a,r?"readwrite":"readonly");let d=l.store;return s&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),r&&l.done]))[0]};return go.set(e,i),i}Dg(n=>({...n,get:(e,t,s)=>Pl(e,t)||n.get(e,t,s),has:(e,t)=>!!Pl(e,t)||n.has(e,t)}));/**
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
 */class Ug{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(zg(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function zg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Mo="@firebase/app",xl="0.14.6";/**
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
 */const Rt=new _a("@firebase/app"),$g="@firebase/app-compat",qg="@firebase/analytics-compat",jg="@firebase/analytics",Hg="@firebase/app-check-compat",Wg="@firebase/app-check",Gg="@firebase/auth",Kg="@firebase/auth-compat",Qg="@firebase/database",Xg="@firebase/data-connect",Yg="@firebase/database-compat",Jg="@firebase/functions",Zg="@firebase/functions-compat",ey="@firebase/installations",ty="@firebase/installations-compat",ny="@firebase/messaging",sy="@firebase/messaging-compat",ry="@firebase/performance",iy="@firebase/performance-compat",oy="@firebase/remote-config",ay="@firebase/remote-config-compat",cy="@firebase/storage",ly="@firebase/storage-compat",uy="@firebase/firestore",dy="@firebase/ai",hy="@firebase/firestore-compat",fy="firebase",my="12.6.0";/**
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
 */const Vo="[DEFAULT]",py={[Mo]:"fire-core",[$g]:"fire-core-compat",[jg]:"fire-analytics",[qg]:"fire-analytics-compat",[Wg]:"fire-app-check",[Hg]:"fire-app-check-compat",[Gg]:"fire-auth",[Kg]:"fire-auth-compat",[Qg]:"fire-rtdb",[Xg]:"fire-data-connect",[Yg]:"fire-rtdb-compat",[Jg]:"fire-fn",[Zg]:"fire-fn-compat",[ey]:"fire-iid",[ty]:"fire-iid-compat",[ny]:"fire-fcm",[sy]:"fire-fcm-compat",[ry]:"fire-perf",[iy]:"fire-perf-compat",[oy]:"fire-rc",[ay]:"fire-rc-compat",[cy]:"fire-gcs",[ly]:"fire-gcs-compat",[uy]:"fire-fst",[hy]:"fire-fst-compat",[dy]:"fire-vertex","fire-js":"fire-js",[fy]:"fire-js-all"};/**
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
 */const ti=new Map,gy=new Map,Oo=new Map;function Ll(n,e){try{n.container.addComponent(e)}catch(t){Rt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Cn(n){const e=n.name;if(Oo.has(e))return Rt.debug(`There were multiple attempts to register component ${e}.`),!1;Oo.set(e,n);for(const t of ti.values())Ll(t,n);for(const t of gy.values())Ll(t,n);return!0}function bi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ye(n){return n==null?!1:n.settings!==void 0}/**
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
 */const yy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xt=new sr("app","Firebase",yy);/**
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
 */class _y{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xt.create("app-deleted",{appName:this._name})}}/**
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
 */const xn=my;function Md(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Vo,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Xt.create("bad-app-name",{appName:String(r)});if(t||(t=Pd()),!t)throw Xt.create("no-options");const i=ti.get(r);if(i){if(An(t,i.options)&&An(s,i.config))return i;throw Xt.create("duplicate-app",{appName:r})}const a=new Tg(r);for(const l of Oo.values())a.addComponent(l);const c=new _y(t,s,a);return ti.set(r,c),c}function Ea(n=Vo){const e=ti.get(n);if(!e&&n===Vo&&Pd())return Md();if(!e)throw Xt.create("no-app",{appName:n});return e}function ht(n,e,t){let s=py[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rt.warn(a.join(" "));return}Cn(new Zt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const wy="firebase-heartbeat-database",Ey=1,Gs="firebase-heartbeat-store";let yo=null;function Vd(){return yo||(yo=Og(wy,Ey,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Gs)}catch(t){console.warn(t)}}}}).catch(n=>{throw Xt.create("idb-open",{originalErrorMessage:n.message})})),yo}async function vy(n){try{const t=(await Vd()).transaction(Gs),s=await t.objectStore(Gs).get(Od(n));return await t.done,s}catch(e){if(e instanceof vt)Rt.warn(e.message);else{const t=Xt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rt.warn(t.message)}}}async function Nl(n,e){try{const s=(await Vd()).transaction(Gs,"readwrite");await s.objectStore(Gs).put(e,Od(n)),await s.done}catch(t){if(t instanceof vt)Rt.warn(t.message);else{const s=Xt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Rt.warn(s.message)}}}function Od(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Iy=1024,by=30;class Ty{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Cy(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Dl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>by){const a=Sy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){Rt.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Dl(),{heartbeatsToSend:s,unsentEntries:r}=Ay(this._heartbeatsCache.heartbeats),i=ei(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return Rt.warn(t),""}}}function Dl(){return new Date().toISOString().substring(0,10)}function Ay(n,e=Iy){const t=[];let s=n.slice();for(const r of n){const i=t.find(a=>a.agent===r.agent);if(i){if(i.dates.push(r.date),Ml(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Ml(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Cy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return hg()?fg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await vy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Nl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Nl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ml(n){return ei(JSON.stringify({version:2,heartbeats:n})).length}function Sy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function Ry(n){Cn(new Zt("platform-logger",e=>new Ug(e),"PRIVATE")),Cn(new Zt("heartbeat",e=>new Ty(e),"PRIVATE")),ht(Mo,xl,n),ht(Mo,xl,"esm2020"),ht("fire-js","")}Ry("");var ky="firebase",Py="12.7.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ht(ky,Py,"app");function Bd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xy=Bd,Fd=new sr("auth","Firebase",Bd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ni=new _a("@firebase/auth");function Ly(n,...e){ni.logLevel<=Y.WARN&&ni.warn(`Auth (${xn}): ${n}`,...e)}function Fr(n,...e){ni.logLevel<=Y.ERROR&&ni.error(`Auth (${xn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(n,...e){throw Ia(n,...e)}function st(n,...e){return Ia(n,...e)}function va(n,e,t){const s={...xy(),[e]:t};return new sr("auth","Firebase",s).create(e,{appName:n.name})}function vn(n){return va(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ny(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&wt(n,"argument-error"),va(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ia(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return Fd.create(n,...e)}function W(n,e,...t){if(!n)throw Ia(e,...t)}function At(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Fr(e),new Error(e)}function kt(n,e){n||At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Dy(){return Vl()==="http:"||Vl()==="https:"}function Vl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Dy()||cg()||"connection"in navigator)?navigator.onLine:!0}function Vy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t){this.shortDelay=e,this.longDelay=t,kt(t>e,"Short delay should be less than long delay!"),this.isMobile=ig()||lg()}get(){return My()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(n,e){kt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Fy=new ir(3e4,6e4);function Ta(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function os(n,e,t,s,r={}){return zd(n,r,async()=>{let i={},a={};s&&(e==="GET"?a=s:i={body:JSON.stringify(s)});const c=rr({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...i};return ag()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&ln(n.emulatorConfig.host)&&(d.credentials="include"),Ud.fetch()(await $d(n,n.config.apiHost,t,c),d)})}async function zd(n,e,t){n._canInitEmulator=!1;const s={...Oy,...e};try{const r=new zy(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw kr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw kr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw kr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw kr(n,"user-disabled",a);const f=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw va(n,f,d);wt(n,f)}}catch(r){if(r instanceof vt)throw r;wt(n,"network-request-failed",{message:String(r)})}}async function Uy(n,e,t,s,r={}){const i=await os(n,e,t,s,r);return"mfaPendingCredential"in i&&wt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function $d(n,e,t,s){const r=`${e}${t}?${s}`,i=n,a=i.config.emulator?ba(n.config,r):`${n.config.apiScheme}://${r}`;return By.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class zy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(st(this.auth,"network-request-failed")),Fy.get())})}}function kr(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=st(n,e,s);return r.customData._tokenResponse=t,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $y(n,e){return os(n,"POST","/v1/accounts:delete",e)}async function si(n,e){return os(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function qy(n,e=!1){const t=Ce(n),s=await t.getIdToken(e),r=Aa(s);W(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Fs(_o(r.auth_time)),issuedAtTime:Fs(_o(r.iat)),expirationTime:Fs(_o(r.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function _o(n){return Number(n)*1e3}function Aa(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Fr("JWT malformed, contained fewer than 3 sections"),null;try{const r=Sd(t);return r?JSON.parse(r):(Fr("Failed to decode base64 JWT payload"),null)}catch(r){return Fr("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function Ol(n){const e=Aa(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ks(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof vt&&jy(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function jy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Fs(this.lastLoginAt),this.creationTime=Fs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ri(n){var m;const e=n.auth,t=await n.getIdToken(),s=await Ks(n,si(e,{idToken:t}));W(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(m=r.providerUserInfo)!=null&&m.length?qd(r.providerUserInfo):[],a=Gy(n.providerData,i),c=n.isAnonymous,l=!(n.email&&r.passwordHash)&&!(a!=null&&a.length),d=c?l:!1,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Fo(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function Wy(n){const e=Ce(n);await ri(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Gy(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function qd(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ky(n,e){const t=await zd(n,{},async()=>{const s=rr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,a=await $d(n,r,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:s};return n.emulatorConfig&&ln(n.emulatorConfig.host)&&(l.credentials="include"),Ud.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qy(n,e){return os(n,"POST","/v2/accounts:revokeToken",Ta(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ol(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=Ol(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await Ky(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,a=new Wn;return s&&(W(typeof s=="string","internal-error",{appName:e}),a.refreshToken=s),r&&(W(typeof r=="string","internal-error",{appName:e}),a.accessToken=r),i&&(W(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wn,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class tt{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Hy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Fo(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ks(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return qy(this,e)}reload(){return Wy(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new tt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await ri(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(vn(this.auth));const e=await this.getIdToken();return await Ks(this,$y(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:y,isAnonymous:v,providerData:b,stsTokenManager:R}=t;W(m&&R,e,"internal-error");const C=Wn.fromJSON(this.name,R);W(typeof m=="string",e,"internal-error"),$t(s,e.name),$t(r,e.name),W(typeof y=="boolean",e,"internal-error"),W(typeof v=="boolean",e,"internal-error"),$t(i,e.name),$t(a,e.name),$t(c,e.name),$t(l,e.name),$t(d,e.name),$t(f,e.name);const P=new tt({uid:m,auth:e,email:r,emailVerified:y,displayName:s,isAnonymous:v,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:C,createdAt:d,lastLoginAt:f});return b&&Array.isArray(b)&&(P.providerData=b.map(N=>({...N}))),l&&(P._redirectEventId=l),P}static async _fromIdTokenResponse(e,t,s=!1){const r=new Wn;r.updateFromServerResponse(t);const i=new tt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await ri(i),i}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];W(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?qd(r.providerUserInfo):[],a=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),c=new Wn;c.updateFromIdToken(s);const l=new tt({uid:r.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Fo(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=new Map;function Ct(n){kt(n instanceof Function,"Expected a class definition");let e=Bl.get(n);return e?(kt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Bl.set(n,e),e)}/**
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
 */class jd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}jd.type="NONE";const Fl=jd;/**
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
 */function Ur(n,e,t){return`firebase:${n}:${e}:${t}`}class Gn{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Ur(this.userKey,r.apiKey,i),this.fullPersistenceKey=Ur("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await si(this.auth,{idToken:e}).catch(()=>{});return t?tt._fromGetAccountInfoResponse(this.auth,t,e):null}return tt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new Gn(Ct(Fl),e,s);const r=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=r[0]||Ct(Fl);const a=Ur(s,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let m;if(typeof f=="string"){const y=await si(e,{idToken:f}).catch(()=>{});if(!y)break;m=await tt._fromGetAccountInfoResponse(e,y,f)}else m=tt._fromJSON(e,f);d!==i&&(c=m),i=d;break}}catch{}const l=r.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Gn(i,e,s):(i=l[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new Gn(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ul(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Kd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xd(e))return"Blackberry";if(Yd(e))return"Webos";if(Wd(e))return"Safari";if((e.includes("chrome/")||Gd(e))&&!e.includes("edge/"))return"Chrome";if(Qd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Hd(n=Fe()){return/firefox\//i.test(n)}function Wd(n=Fe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gd(n=Fe()){return/crios\//i.test(n)}function Kd(n=Fe()){return/iemobile/i.test(n)}function Qd(n=Fe()){return/android/i.test(n)}function Xd(n=Fe()){return/blackberry/i.test(n)}function Yd(n=Fe()){return/webos/i.test(n)}function Ca(n=Fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Xy(n=Fe()){var e;return Ca(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Yy(){return ug()&&document.documentMode===10}function Jd(n=Fe()){return Ca(n)||Qd(n)||Yd(n)||Xd(n)||/windows phone/i.test(n)||Kd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(n,e=[]){let t;switch(n){case"Browser":t=Ul(Fe());break;case"Worker":t=`${Ul(Fe())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${xn}/${s}`}/**
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
 */class Jy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((a,c)=>{try{const l=e(i);a(l)}catch(l){c(l)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function Zy(n,e={}){return os(n,"GET","/v2/passwordPolicy",Ta(n,e))}/**
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
 */const e_=6;class t_{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??e_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zl(this),this.idTokenSubscription=new zl(this),this.beforeStateQueue=new Jy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ct(t)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted&&(this.persistenceManager=await Gn.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await si(this,{idToken:e}),s=await tt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Ye(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,c=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(s=l.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ri(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(vn(this));const t=e?Ce(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(vn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(vn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zy(this),t=new t_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new sr("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await Qy(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ct(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Gn.create(this,[Ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,s,r);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Ly(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ti(n){return Ce(n)}class zl{constructor(e){this.auth=e,this.observer=null,this.addObserver=_g(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function s_(n){Sa=n}function r_(n){return Sa.loadJS(n)}function i_(){return Sa.gapiScript}function o_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a_(n,e){const t=bi(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(An(i,e??{}))return r;wt(r,"already-initialized")}return t.initialize({options:e})}function c_(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Ct);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function l_(n,e,t){const s=Ti(n);W(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=eh(e),{host:a,port:c}=u_(e),l=c===null?"":`:${c}`,d={url:`${i}//${a}${l}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){W(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),W(An(d,s.config.emulator)&&An(f,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=d,s.emulatorConfig=f,s.settings.appVerificationDisabledForTesting=!0,ln(a)?(ga(`${i}//${a}${l}`),ya("Auth",!0)):d_()}function eh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function u_(n){const e=eh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:$l(s.substr(i.length+1))}}else{const[i,a]=s.split(":");return{host:i,port:$l(a)}}}function $l(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function d_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,t){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kn(n,e){return Uy(n,"POST","/v1/accounts:signInWithIdp",Ta(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h_="http://localhost";class Sn extends th{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):wt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=t;if(!s||!r)return null;const a=new Sn(s,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Kn(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,Kn(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kn(e,t)}buildRequest(){const e={requestUri:h_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=rr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class or extends Ra{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends or{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends or{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sn._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return Tt.credential(t,s)}catch{return null}}}Tt.GOOGLE_SIGN_IN_METHOD="google.com";Tt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends or{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:jt.PROVIDER_ID,signInMethod:jt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jt.credentialFromTaggedObject(e)}static credentialFromError(e){return jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return jt.credential(e.oauthAccessToken)}catch{return null}}}jt.GITHUB_SIGN_IN_METHOD="github.com";jt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht extends or{constructor(){super("twitter.com")}static credential(e,t){return Sn._fromParams({providerId:Ht.PROVIDER_ID,signInMethod:Ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ht.credentialFromTaggedObject(e)}static credentialFromError(e){return Ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return Ht.credential(t,s)}catch{return null}}}Ht.TWITTER_SIGN_IN_METHOD="twitter.com";Ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await tt._fromIdTokenResponse(e,s,r),a=ql(s);return new Zn({user:i,providerId:a,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=ql(s);return new Zn({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function ql(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii extends vt{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,ii.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new ii(e,t,s,r)}}function nh(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ii._fromErrorAndOperation(n,i,e,s):i})}async function f_(n,e,t=!1){const s=await Ks(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Zn._forOperation(n,"link",s)}/**
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
 */async function m_(n,e,t=!1){const{auth:s}=n;if(Ye(s.app))return Promise.reject(vn(s));const r="reauthenticate";try{const i=await Ks(n,nh(s,r,e,n),t);W(i.idToken,s,"internal-error");const a=Aa(i.idToken);W(a,s,"internal-error");const{sub:c}=a;return W(n.uid===c,s,"user-mismatch"),Zn._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&wt(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function p_(n,e,t=!1){if(Ye(n.app))return Promise.reject(vn(n));const s="signIn",r=await nh(n,s,e),i=await Zn._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(n,e){return Ce(n).setPersistence(e)}function g_(n,e,t,s){return Ce(n).onIdTokenChanged(e,t,s)}function y_(n,e,t){return Ce(n).beforeAuthStateChanged(e,t)}function __(n,e,t,s){return Ce(n).onAuthStateChanged(e,t,s)}function w_(n){return Ce(n).signOut()}const oi="__sak";/**
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
 */class rh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(oi,"1"),this.storage.removeItem(oi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=1e3,v_=10;class ih extends rh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const a=this.storage.getItem(s);!t&&this.localCache[s]===a||this.notifyListeners(s,a)},i=this.storage.getItem(s);Yy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,v_):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},E_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ih.type="LOCAL";const ka=ih;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh extends rh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}oh.type="SESSION";const ah=oh;/**
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
 */function I_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ai{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new Ai(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const c=Array.from(a).map(async d=>d(t.origin,i)),l=await I_(c);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ai.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class b_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,a;return new Promise((c,l)=>{const d=Pa("",20);r.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},s);a={messageChannel:r,onMessage(m){const y=m;if(y.data.eventId===d)switch(y.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(y.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),r.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(){return window}function T_(n){ft().location.href=n}/**
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
 */function ch(){return typeof ft().WorkerGlobalScope<"u"&&typeof ft().importScripts=="function"}async function A_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function C_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function S_(){return ch()?self:null}/**
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
 */const lh="firebaseLocalStorageDb",R_=1,ai="firebaseLocalStorage",uh="fbase_key";class ar{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ci(n,e){return n.transaction([ai],e?"readwrite":"readonly").objectStore(ai)}function k_(){const n=indexedDB.deleteDatabase(lh);return new ar(n).toPromise()}function Uo(){const n=indexedDB.open(lh,R_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(ai,{keyPath:uh})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(ai)?e(s):(s.close(),await k_(),e(await Uo()))})})}async function jl(n,e,t){const s=Ci(n,!0).put({[uh]:e,value:t});return new ar(s).toPromise()}async function P_(n,e){const t=Ci(n,!1).get(e),s=await new ar(t).toPromise();return s===void 0?null:s.value}function Hl(n,e){const t=Ci(n,!0).delete(e);return new ar(t).toPromise()}const x_=800,L_=3;class dh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Uo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>L_)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ch()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ai._getInstance(S_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await A_(),!this.activeServiceWorker)return;this.sender=new b_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||C_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Uo();return await jl(e,oi,"1"),await Hl(e,oi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>jl(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>P_(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Hl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=Ci(r,!1).getAll();return new ar(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),x_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dh.type="LOCAL";const N_=dh;new ir(3e4,6e4);/**
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
 */function hh(n,e){return e?Ct(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class xa extends th{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function D_(n){return p_(n.auth,new xa(n),n.bypassAuthState)}function M_(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),m_(t,new xa(n),n.bypassAuthState)}async function V_(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),f_(t,new xa(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return D_;case"linkViaPopup":case"linkViaRedirect":return V_;case"reauthViaPopup":case"reauthViaRedirect":return M_;default:wt(this.auth,"internal-error")}}resolve(e){kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){kt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=new ir(2e3,1e4);async function B_(n,e,t){if(Ye(n.app))return Promise.reject(st(n,"operation-not-supported-in-this-environment"));const s=Ti(n);Ny(n,e,Ra);const r=hh(s,t);return new yn(s,"signInViaPopup",e,r).executeNotNull()}class yn extends fh{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,yn.currentPopupAction&&yn.currentPopupAction.cancel(),yn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){kt(this.filter.length===1,"Popup operations only handle one event");const e=Pa();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(st(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(st(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,yn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(st(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,O_.get())};e()}}yn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F_="pendingRedirect",zr=new Map;class U_ extends fh{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=zr.get(this.auth._key());if(!e){try{const s=await z_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}zr.set(this.auth._key(),e)}return this.bypassAuthState||zr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function z_(n,e){const t=j_(e),s=q_(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function $_(n,e){zr.set(n._key(),e)}function q_(n){return Ct(n._redirectPersistence)}function j_(n){return Ur(F_,n.config.apiKey,n.name)}async function H_(n,e,t=!1){if(Ye(n.app))return Promise.reject(vn(n));const s=Ti(n),r=hh(s,e),a=await new U_(s,r,t).execute();return a&&!t&&(delete a.user._redirectEventId,await s._persistUserIfCurrent(a.user),await s._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_=10*60*1e3;class G_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!K_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!mh(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(st(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=W_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wl(e))}saveEventToCache(e){this.cachedEventUids.add(Wl(e)),this.lastProcessedEventTime=Date.now()}}function Wl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function mh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function K_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q_(n,e={}){return os(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Y_=/^https?/;async function J_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Q_(n);for(const t of e)try{if(Z_(t))return}catch{}wt(n,"unauthorized-domain")}function Z_(n){const e=Bo(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===s}if(!Y_.test(t))return!1;if(X_.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const ew=new ir(3e4,6e4);function Gl(){const n=ft().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function tw(n){return new Promise((e,t)=>{var r,i,a;function s(){Gl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gl(),t(st(n,"network-request-failed"))},timeout:ew.get()})}if((i=(r=ft().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=ft().gapi)!=null&&a.load)s();else{const c=o_("iframefcb");return ft()[c]=()=>{gapi.load?s():t(st(n,"network-request-failed"))},r_(`${i_()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw $r=null,e})}let $r=null;function nw(n){return $r=$r||tw(n),$r}/**
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
 */const sw=new ir(5e3,15e3),rw="__/auth/iframe",iw="emulator/auth/iframe",ow={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},aw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function cw(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ba(e,iw):`https://${n.config.authDomain}/${rw}`,s={apiKey:e.apiKey,appName:n.name,v:xn},r=aw.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${rr(s).slice(1)}`}async function lw(n){const e=await nw(n),t=ft().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:cw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ow,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const a=st(n,"network-request-failed"),c=ft().setTimeout(()=>{i(a)},sw.get());function l(){ft().clearTimeout(c),r(s)}s.ping(l).then(l,()=>{i(a)})}))}/**
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
 */const uw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},dw=500,hw=600,fw="_blank",mw="http://localhost";class Kl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function pw(n,e,t,s=dw,r=hw){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),a=Math.max((window.screen.availWidth-s)/2,0).toString();let c="";const l={...uw,width:s.toString(),height:r.toString(),top:i,left:a},d=Fe().toLowerCase();t&&(c=Gd(d)?fw:t),Hd(d)&&(e=e||mw,l.scrollbars="yes");const f=Object.entries(l).reduce((y,[v,b])=>`${y}${v}=${b},`,"");if(Xy(d)&&c!=="_self")return gw(e||"",c),new Kl(null);const m=window.open(e||"",c,f);W(m,n,"popup-blocked");try{m.focus()}catch{}return new Kl(m)}function gw(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const yw="__/auth/handler",_w="emulator/auth/handler",ww=encodeURIComponent("fac");async function Ql(n,e,t,s,r,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:xn,eventId:r};if(e instanceof Ra){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",yg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof or){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),d=l?`#${ww}=${encodeURIComponent(l)}`:"";return`${Ew(n)}?${rr(c).slice(1)}${d}`}function Ew({config:n}){return n.emulator?ba(n,_w):`https://${n.authDomain}/${yw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo="webStorageSupport";class vw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ah,this._completeRedirectFn=H_,this._overrideRedirectResult=$_}async _openPopup(e,t,s,r){var a;kt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await Ql(e,t,s,Bo(),r);return pw(e,i,Pa())}async _openRedirect(e,t,s,r){await this._originValidation(e);const i=await Ql(e,t,s,Bo(),r);return T_(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(kt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await lw(e),s=new G_(e);return t.register("authEvent",r=>(W(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(wo,{type:wo},r=>{var a;const i=(a=r==null?void 0:r[0])==null?void 0:a[wo];i!==void 0&&t(!!i),wt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=J_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jd()||Wd()||Ca()}}const Iw=vw;var Xl="@firebase/auth",Yl="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bw{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Aw(n){Cn(new Zt("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=s.options;W(a&&!a.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zd(n)},d=new n_(s,r,i,l);return c_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),Cn(new Zt("auth-internal",e=>{const t=Ti(e.getProvider("auth").getImmediate());return(s=>new bw(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ht(Xl,Yl,Tw(n)),ht(Xl,Yl,"esm2020")}/**
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
 */const Cw=5*60,Sw=xd("authIdTokenMaxAge")||Cw;let Jl=null;const Rw=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>Sw)return;const r=t==null?void 0:t.token;Jl!==r&&(Jl=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function kw(n=Ea()){const e=bi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=a_(n,{popupRedirectResolver:Iw,persistence:[N_,ka,ah]}),s=xd("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const a=Rw(i.toString());y_(t,a,()=>a(t.currentUser)),g_(t,c=>a(c))}}const r=Rd("auth");return r&&l_(t,`http://${r}`),t}function Pw(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}s_({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=st("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",Pw().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Aw("Browser");var Zl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yt,ph;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function w(){}w.prototype=g.prototype,E.F=g.prototype,E.prototype=new w,E.prototype.constructor=E,E.D=function(A,I,S){for(var T=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)T[ne-2]=arguments[ne];return g.prototype[I].apply(A,T)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(E,g,w){w||(w=0);const A=Array(16);if(typeof g=="string")for(var I=0;I<16;++I)A[I]=g.charCodeAt(w++)|g.charCodeAt(w++)<<8|g.charCodeAt(w++)<<16|g.charCodeAt(w++)<<24;else for(I=0;I<16;++I)A[I]=g[w++]|g[w++]<<8|g[w++]<<16|g[w++]<<24;g=E.g[0],w=E.g[1],I=E.g[2];let S=E.g[3],T;T=g+(S^w&(I^S))+A[0]+3614090360&4294967295,g=w+(T<<7&4294967295|T>>>25),T=S+(I^g&(w^I))+A[1]+3905402710&4294967295,S=g+(T<<12&4294967295|T>>>20),T=I+(w^S&(g^w))+A[2]+606105819&4294967295,I=S+(T<<17&4294967295|T>>>15),T=w+(g^I&(S^g))+A[3]+3250441966&4294967295,w=I+(T<<22&4294967295|T>>>10),T=g+(S^w&(I^S))+A[4]+4118548399&4294967295,g=w+(T<<7&4294967295|T>>>25),T=S+(I^g&(w^I))+A[5]+1200080426&4294967295,S=g+(T<<12&4294967295|T>>>20),T=I+(w^S&(g^w))+A[6]+2821735955&4294967295,I=S+(T<<17&4294967295|T>>>15),T=w+(g^I&(S^g))+A[7]+4249261313&4294967295,w=I+(T<<22&4294967295|T>>>10),T=g+(S^w&(I^S))+A[8]+1770035416&4294967295,g=w+(T<<7&4294967295|T>>>25),T=S+(I^g&(w^I))+A[9]+2336552879&4294967295,S=g+(T<<12&4294967295|T>>>20),T=I+(w^S&(g^w))+A[10]+4294925233&4294967295,I=S+(T<<17&4294967295|T>>>15),T=w+(g^I&(S^g))+A[11]+2304563134&4294967295,w=I+(T<<22&4294967295|T>>>10),T=g+(S^w&(I^S))+A[12]+1804603682&4294967295,g=w+(T<<7&4294967295|T>>>25),T=S+(I^g&(w^I))+A[13]+4254626195&4294967295,S=g+(T<<12&4294967295|T>>>20),T=I+(w^S&(g^w))+A[14]+2792965006&4294967295,I=S+(T<<17&4294967295|T>>>15),T=w+(g^I&(S^g))+A[15]+1236535329&4294967295,w=I+(T<<22&4294967295|T>>>10),T=g+(I^S&(w^I))+A[1]+4129170786&4294967295,g=w+(T<<5&4294967295|T>>>27),T=S+(w^I&(g^w))+A[6]+3225465664&4294967295,S=g+(T<<9&4294967295|T>>>23),T=I+(g^w&(S^g))+A[11]+643717713&4294967295,I=S+(T<<14&4294967295|T>>>18),T=w+(S^g&(I^S))+A[0]+3921069994&4294967295,w=I+(T<<20&4294967295|T>>>12),T=g+(I^S&(w^I))+A[5]+3593408605&4294967295,g=w+(T<<5&4294967295|T>>>27),T=S+(w^I&(g^w))+A[10]+38016083&4294967295,S=g+(T<<9&4294967295|T>>>23),T=I+(g^w&(S^g))+A[15]+3634488961&4294967295,I=S+(T<<14&4294967295|T>>>18),T=w+(S^g&(I^S))+A[4]+3889429448&4294967295,w=I+(T<<20&4294967295|T>>>12),T=g+(I^S&(w^I))+A[9]+568446438&4294967295,g=w+(T<<5&4294967295|T>>>27),T=S+(w^I&(g^w))+A[14]+3275163606&4294967295,S=g+(T<<9&4294967295|T>>>23),T=I+(g^w&(S^g))+A[3]+4107603335&4294967295,I=S+(T<<14&4294967295|T>>>18),T=w+(S^g&(I^S))+A[8]+1163531501&4294967295,w=I+(T<<20&4294967295|T>>>12),T=g+(I^S&(w^I))+A[13]+2850285829&4294967295,g=w+(T<<5&4294967295|T>>>27),T=S+(w^I&(g^w))+A[2]+4243563512&4294967295,S=g+(T<<9&4294967295|T>>>23),T=I+(g^w&(S^g))+A[7]+1735328473&4294967295,I=S+(T<<14&4294967295|T>>>18),T=w+(S^g&(I^S))+A[12]+2368359562&4294967295,w=I+(T<<20&4294967295|T>>>12),T=g+(w^I^S)+A[5]+4294588738&4294967295,g=w+(T<<4&4294967295|T>>>28),T=S+(g^w^I)+A[8]+2272392833&4294967295,S=g+(T<<11&4294967295|T>>>21),T=I+(S^g^w)+A[11]+1839030562&4294967295,I=S+(T<<16&4294967295|T>>>16),T=w+(I^S^g)+A[14]+4259657740&4294967295,w=I+(T<<23&4294967295|T>>>9),T=g+(w^I^S)+A[1]+2763975236&4294967295,g=w+(T<<4&4294967295|T>>>28),T=S+(g^w^I)+A[4]+1272893353&4294967295,S=g+(T<<11&4294967295|T>>>21),T=I+(S^g^w)+A[7]+4139469664&4294967295,I=S+(T<<16&4294967295|T>>>16),T=w+(I^S^g)+A[10]+3200236656&4294967295,w=I+(T<<23&4294967295|T>>>9),T=g+(w^I^S)+A[13]+681279174&4294967295,g=w+(T<<4&4294967295|T>>>28),T=S+(g^w^I)+A[0]+3936430074&4294967295,S=g+(T<<11&4294967295|T>>>21),T=I+(S^g^w)+A[3]+3572445317&4294967295,I=S+(T<<16&4294967295|T>>>16),T=w+(I^S^g)+A[6]+76029189&4294967295,w=I+(T<<23&4294967295|T>>>9),T=g+(w^I^S)+A[9]+3654602809&4294967295,g=w+(T<<4&4294967295|T>>>28),T=S+(g^w^I)+A[12]+3873151461&4294967295,S=g+(T<<11&4294967295|T>>>21),T=I+(S^g^w)+A[15]+530742520&4294967295,I=S+(T<<16&4294967295|T>>>16),T=w+(I^S^g)+A[2]+3299628645&4294967295,w=I+(T<<23&4294967295|T>>>9),T=g+(I^(w|~S))+A[0]+4096336452&4294967295,g=w+(T<<6&4294967295|T>>>26),T=S+(w^(g|~I))+A[7]+1126891415&4294967295,S=g+(T<<10&4294967295|T>>>22),T=I+(g^(S|~w))+A[14]+2878612391&4294967295,I=S+(T<<15&4294967295|T>>>17),T=w+(S^(I|~g))+A[5]+4237533241&4294967295,w=I+(T<<21&4294967295|T>>>11),T=g+(I^(w|~S))+A[12]+1700485571&4294967295,g=w+(T<<6&4294967295|T>>>26),T=S+(w^(g|~I))+A[3]+2399980690&4294967295,S=g+(T<<10&4294967295|T>>>22),T=I+(g^(S|~w))+A[10]+4293915773&4294967295,I=S+(T<<15&4294967295|T>>>17),T=w+(S^(I|~g))+A[1]+2240044497&4294967295,w=I+(T<<21&4294967295|T>>>11),T=g+(I^(w|~S))+A[8]+1873313359&4294967295,g=w+(T<<6&4294967295|T>>>26),T=S+(w^(g|~I))+A[15]+4264355552&4294967295,S=g+(T<<10&4294967295|T>>>22),T=I+(g^(S|~w))+A[6]+2734768916&4294967295,I=S+(T<<15&4294967295|T>>>17),T=w+(S^(I|~g))+A[13]+1309151649&4294967295,w=I+(T<<21&4294967295|T>>>11),T=g+(I^(w|~S))+A[4]+4149444226&4294967295,g=w+(T<<6&4294967295|T>>>26),T=S+(w^(g|~I))+A[11]+3174756917&4294967295,S=g+(T<<10&4294967295|T>>>22),T=I+(g^(S|~w))+A[2]+718787259&4294967295,I=S+(T<<15&4294967295|T>>>17),T=w+(S^(I|~g))+A[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(I+(T<<21&4294967295|T>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+S&4294967295}s.prototype.v=function(E,g){g===void 0&&(g=E.length);const w=g-this.blockSize,A=this.C;let I=this.h,S=0;for(;S<g;){if(I==0)for(;S<=w;)r(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<g;)if(A[I++]=E.charCodeAt(S++),I==this.blockSize){r(this,A),I=0;break}}else for(;S<g;)if(A[I++]=E[S++],I==this.blockSize){r(this,A),I=0;break}}this.h=I,this.o+=g},s.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;g=this.o*8;for(var w=E.length-8;w<E.length;++w)E[w]=g&255,g/=256;for(this.v(E),E=Array(16),g=0,w=0;w<4;++w)for(let A=0;A<32;A+=8)E[g++]=this.g[w]>>>A&255;return E};function i(E,g){var w=c;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=g(E)}function a(E,g){this.h=g;const w=[];let A=!0;for(let I=E.length-1;I>=0;I--){const S=E[I]|0;A&&S==g||(w[I]=S,A=!1)}this.g=w}var c={};function l(E){return-128<=E&&E<128?i(E,function(g){return new a([g|0],g<0?-1:0)}):new a([E|0],E<0?-1:0)}function d(E){if(isNaN(E)||!isFinite(E))return m;if(E<0)return C(d(-E));const g=[];let w=1;for(let A=0;E>=w;A++)g[A]=E/w|0,w*=4294967296;return new a(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return C(f(E.substring(1),g));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=d(Math.pow(g,8));let A=m;for(let S=0;S<E.length;S+=8){var I=Math.min(8,E.length-S);const T=parseInt(E.substring(S,S+I),g);I<8?(I=d(Math.pow(g,I)),A=A.j(I).add(d(T))):(A=A.j(w),A=A.add(d(T)))}return A}var m=l(0),y=l(1),v=l(16777216);n=a.prototype,n.m=function(){if(R(this))return-C(this).m();let E=0,g=1;for(let w=0;w<this.g.length;w++){const A=this.i(w);E+=(A>=0?A:4294967296+A)*g,g*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(R(this))return"-"+C(this).toString(E);const g=d(Math.pow(E,6));var w=this;let A="";for(;;){const I=M(w,g).g;w=P(w,I.j(g));let S=((w.g.length>0?w.g[0]:w.h)>>>0).toString(E);if(w=I,b(w))return S+A;for(;S.length<6;)S="0"+S;A=S+A}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(let g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function R(E){return E.h==-1}n.l=function(E){return E=P(this,E),R(E)?-1:b(E)?0:1};function C(E){const g=E.g.length,w=[];for(let A=0;A<g;A++)w[A]=~E.g[A];return new a(w,~E.h).add(y)}n.abs=function(){return R(this)?C(this):this},n.add=function(E){const g=Math.max(this.g.length,E.g.length),w=[];let A=0;for(let I=0;I<=g;I++){let S=A+(this.i(I)&65535)+(E.i(I)&65535),T=(S>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);A=T>>>16,S&=65535,T&=65535,w[I]=T<<16|S}return new a(w,w[w.length-1]&-2147483648?-1:0)};function P(E,g){return E.add(C(g))}n.j=function(E){if(b(this)||b(E))return m;if(R(this))return R(E)?C(this).j(C(E)):C(C(this).j(E));if(R(E))return C(this.j(C(E)));if(this.l(v)<0&&E.l(v)<0)return d(this.m()*E.m());const g=this.g.length+E.g.length,w=[];for(var A=0;A<2*g;A++)w[A]=0;for(A=0;A<this.g.length;A++)for(let I=0;I<E.g.length;I++){const S=this.i(A)>>>16,T=this.i(A)&65535,ne=E.i(I)>>>16,ye=E.i(I)&65535;w[2*A+2*I]+=T*ye,N(w,2*A+2*I),w[2*A+2*I+1]+=S*ye,N(w,2*A+2*I+1),w[2*A+2*I+1]+=T*ne,N(w,2*A+2*I+1),w[2*A+2*I+2]+=S*ne,N(w,2*A+2*I+2)}for(E=0;E<g;E++)w[E]=w[2*E+1]<<16|w[2*E];for(E=g;E<2*g;E++)w[E]=0;return new a(w,0)};function N(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function V(E,g){this.g=E,this.h=g}function M(E,g){if(b(g))throw Error("division by zero");if(b(E))return new V(m,m);if(R(E))return g=M(C(E),g),new V(C(g.g),C(g.h));if(R(g))return g=M(E,C(g)),new V(C(g.g),g.h);if(E.g.length>30){if(R(E)||R(g))throw Error("slowDivide_ only works with positive integers.");for(var w=y,A=g;A.l(E)<=0;)w=O(w),A=O(A);var I=F(w,1),S=F(A,1);for(A=F(A,2),w=F(w,2);!b(A);){var T=S.add(A);T.l(E)<=0&&(I=I.add(w),S=T),A=F(A,1),w=F(w,1)}return g=P(E,I.j(g)),new V(I,g)}for(I=m;E.l(g)>=0;){for(w=Math.max(1,Math.floor(E.m()/g.m())),A=Math.ceil(Math.log(w)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),S=d(w),T=S.j(g);R(T)||T.l(E)>0;)w-=A,S=d(w),T=S.j(g);b(S)&&(S=y),I=I.add(S),E=P(E,T)}return new V(I,E)}n.B=function(E){return M(this,E).h},n.and=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<g;A++)w[A]=this.i(A)&E.i(A);return new a(w,this.h&E.h)},n.or=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<g;A++)w[A]=this.i(A)|E.i(A);return new a(w,this.h|E.h)},n.xor=function(E){const g=Math.max(this.g.length,E.g.length),w=[];for(let A=0;A<g;A++)w[A]=this.i(A)^E.i(A);return new a(w,this.h^E.h)};function O(E){const g=E.g.length+1,w=[];for(let A=0;A<g;A++)w[A]=E.i(A)<<1|E.i(A-1)>>>31;return new a(w,E.h)}function F(E,g){const w=g>>5;g%=32;const A=E.g.length-w,I=[];for(let S=0;S<A;S++)I[S]=g>0?E.i(S+w)>>>g|E.i(S+w+1)<<32-g:E.i(S+w);return new a(I,E.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,ph=s,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Yt=a}).apply(typeof Zl<"u"?Zl:typeof self<"u"?self:typeof window<"u"?window:{});var Pr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gh,Ns,yh,qr,zo,_h,wh,Eh;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pr=="object"&&Pr];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var s=t(this);function r(o,u){if(u)e:{var h=s;o=o.split(".");for(var _=0;_<o.length-1;_++){var k=o[_];if(!(k in h))break e;h=h[k]}o=o[o.length-1],_=h[o],u=u(_),u!=_&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}r("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(o){return o||function(u){var h=[],_;for(_ in u)Object.prototype.hasOwnProperty.call(u,_)&&h.push([_,u[_]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function c(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function l(o,u,h){return o.call.apply(o.bind,arguments)}function d(o,u,h){return d=l,d.apply(null,arguments)}function f(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var _=h.slice();return _.push.apply(_,arguments),o.apply(this,_)}}function m(o,u){function h(){}h.prototype=u.prototype,o.Z=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(_,k,x){for(var U=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)U[Q-2]=arguments[Q];return u.prototype[k].apply(_,U)}}var y=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function v(o){const u=o.length;if(u>0){const h=Array(u);for(let _=0;_<u;_++)h[_]=o[_];return h}return[]}function b(o,u){for(let _=1;_<arguments.length;_++){const k=arguments[_];var h=typeof k;if(h=h!="object"?h:k?Array.isArray(k)?"array":h:"null",h=="array"||h=="object"&&typeof k.length=="number"){h=o.length||0;const x=k.length||0;o.length=h+x;for(let U=0;U<x;U++)o[h+U]=k[U]}else o.push(k)}}class R{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function C(o){a.setTimeout(()=>{throw o},0)}function P(){var o=E;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class N{constructor(){this.h=this.g=null}add(u,h){const _=V.get();_.set(u,h),this.h?this.h.next=_:this.g=_,this.h=_}}var V=new R(()=>new M,o=>o.reset());class M{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let O,F=!1,E=new N,g=()=>{const o=Promise.resolve(void 0);O=()=>{o.then(w)}};function w(){for(var o;o=P();){try{o.h.call(o.g)}catch(h){C(h)}var u=V;u.j(o),u.h<100&&(u.h++,o.next=u.g,u.g=o)}F=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,u),a.removeEventListener("test",h,u)}catch{}return o}();function T(o){return/^[\s\xa0]*$/.test(o)}function ne(o,u){I.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,u)}m(ne,I),ne.prototype.init=function(o,u){const h=this.type=o.type,_=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget,u||(h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement)),this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ne.Z.h.call(this)},ne.prototype.h=function(){ne.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var ye="closure_listenable_"+(Math.random()*1e6|0),q=0;function re(o,u,h,_,k){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!_,this.ha=k,this.key=++q,this.da=this.fa=!1}function ie(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function se(o,u,h){for(const _ in o)u.call(h,o[_],_,o)}function ue(o,u){for(const h in o)u.call(void 0,o[h],h,o)}function it(o){const u={};for(const h in o)u[h]=o[h];return u}const ot="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ne(o,u){let h,_;for(let k=1;k<arguments.length;k++){_=arguments[k];for(h in _)o[h]=_[h];for(let x=0;x<ot.length;x++)h=ot[x],Object.prototype.hasOwnProperty.call(_,h)&&(o[h]=_[h])}}function Nt(o){this.src=o,this.g={},this.h=0}Nt.prototype.add=function(o,u,h,_,k){const x=o.toString();o=this.g[x],o||(o=this.g[x]=[],this.h++);const U=_e(o,u,_,k);return U>-1?(u=o[U],h||(u.fa=!1)):(u=new re(u,this.src,x,!!_,k),u.fa=h,o.push(u)),u};function It(o,u){const h=u.type;if(h in o.g){var _=o.g[h],k=Array.prototype.indexOf.call(_,u,void 0),x;(x=k>=0)&&Array.prototype.splice.call(_,k,1),x&&(ie(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function _e(o,u,h,_){for(let k=0;k<o.length;++k){const x=o[k];if(!x.da&&x.listener==u&&x.capture==!!h&&x.ha==_)return k}return-1}var Dt="closure_lm_"+(Math.random()*1e6|0),Mt={};function hs(o,u,h,_,k){if(Array.isArray(u)){for(let x=0;x<u.length;x++)hs(o,u[x],h,_,k);return null}return h=Ac(h),o&&o[ye]?o.J(u,h,c(_)?!!_.capture:!1,k):Vn(o,u,h,!1,_,k)}function Vn(o,u,h,_,k,x){if(!u)throw Error("Invalid event type");const U=c(k)?!!k.capture:!!k;let Q=ji(o);if(Q||(o[Dt]=Q=new Nt(o)),h=Q.add(u,h,_,U,x),h.proxy)return h;if(_=Pm(),h.proxy=_,_.src=o,_.listener=h,o.addEventListener)S||(k=U),k===void 0&&(k=!1),o.addEventListener(u.toString(),_,k);else if(o.attachEvent)o.attachEvent(Tc(u.toString()),_);else if(o.addListener&&o.removeListener)o.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Pm(){function o(h){return u.call(o.src,o.listener,h)}const u=xm;return o}function bc(o,u,h,_,k){if(Array.isArray(u))for(var x=0;x<u.length;x++)bc(o,u[x],h,_,k);else _=c(_)?!!_.capture:!!_,h=Ac(h),o&&o[ye]?(o=o.i,x=String(u).toString(),x in o.g&&(u=o.g[x],h=_e(u,h,_,k),h>-1&&(ie(u[h]),Array.prototype.splice.call(u,h,1),u.length==0&&(delete o.g[x],o.h--)))):o&&(o=ji(o))&&(u=o.g[u.toString()],o=-1,u&&(o=_e(u,h,_,k)),(h=o>-1?u[o]:null)&&qi(h))}function qi(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[ye])It(u.i,o);else{var h=o.type,_=o.proxy;u.removeEventListener?u.removeEventListener(h,_,o.capture):u.detachEvent?u.detachEvent(Tc(h),_):u.addListener&&u.removeListener&&u.removeListener(_),(h=ji(u))?(It(h,o),h.h==0&&(h.src=null,u[Dt]=null)):ie(o)}}}function Tc(o){return o in Mt?Mt[o]:Mt[o]="on"+o}function xm(o,u){if(o.da)o=!0;else{u=new ne(u,this);const h=o.listener,_=o.ha||o.src;o.fa&&qi(o),o=h.call(_,u)}return o}function ji(o){return o=o[Dt],o instanceof Nt?o:null}var Hi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Ac(o){return typeof o=="function"?o:(o[Hi]||(o[Hi]=function(u){return o.handleEvent(u)}),o[Hi])}function De(){A.call(this),this.i=new Nt(this),this.M=this,this.G=null}m(De,A),De.prototype[ye]=!0,De.prototype.removeEventListener=function(o,u,h,_){bc(this,o,u,h,_)};function Ue(o,u){var h,_=o.G;if(_)for(h=[];_;_=_.G)h.push(_);if(o=o.M,_=u.type||u,typeof u=="string")u=new I(u,o);else if(u instanceof I)u.target=u.target||o;else{var k=u;u=new I(_,o),Ne(u,k)}k=!0;let x,U;if(h)for(U=h.length-1;U>=0;U--)x=u.g=h[U],k=gr(x,_,!0,u)&&k;if(x=u.g=o,k=gr(x,_,!0,u)&&k,k=gr(x,_,!1,u)&&k,h)for(U=0;U<h.length;U++)x=u.g=h[U],k=gr(x,_,!1,u)&&k}De.prototype.N=function(){if(De.Z.N.call(this),this.i){var o=this.i;for(const u in o.g){const h=o.g[u];for(let _=0;_<h.length;_++)ie(h[_]);delete o.g[u],o.h--}}this.G=null},De.prototype.J=function(o,u,h,_){return this.i.add(String(o),u,!1,h,_)},De.prototype.K=function(o,u,h,_){return this.i.add(String(o),u,!0,h,_)};function gr(o,u,h,_){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();let k=!0;for(let x=0;x<u.length;++x){const U=u[x];if(U&&!U.da&&U.capture==h){const Q=U.listener,Te=U.ha||U.src;U.fa&&It(o.i,U),k=Q.call(Te,_)!==!1&&k}}return k&&!_.defaultPrevented}function Lm(o,u){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(o,u||0)}function Cc(o){o.g=Lm(()=>{o.g=null,o.i&&(o.i=!1,Cc(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Nm extends A{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Cc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function fs(o){A.call(this),this.h=o,this.g={}}m(fs,A);var Sc=[];function Rc(o){se(o.g,function(u,h){this.g.hasOwnProperty(h)&&qi(u)},o),o.g={}}fs.prototype.N=function(){fs.Z.N.call(this),Rc(this)},fs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Wi=a.JSON.stringify,Dm=a.JSON.parse,Mm=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function kc(){}function Pc(){}var ms={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Gi(){I.call(this,"d")}m(Gi,I);function Ki(){I.call(this,"c")}m(Ki,I);var un={},xc=null;function yr(){return xc=xc||new De}un.Ia="serverreachability";function Lc(o){I.call(this,un.Ia,o)}m(Lc,I);function ps(o){const u=yr();Ue(u,new Lc(u))}un.STAT_EVENT="statevent";function Nc(o,u){I.call(this,un.STAT_EVENT,o),this.stat=u}m(Nc,I);function ze(o){const u=yr();Ue(u,new Nc(u,o))}un.Ja="timingevent";function Dc(o,u){I.call(this,un.Ja,o),this.size=u}m(Dc,I);function gs(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},u)}function ys(){this.g=!0}ys.prototype.ua=function(){this.g=!1};function Vm(o,u,h,_,k,x){o.info(function(){if(o.g)if(x){var U="",Q=x.split("&");for(let oe=0;oe<Q.length;oe++){var Te=Q[oe].split("=");if(Te.length>1){const Se=Te[0];Te=Te[1];const ct=Se.split("_");U=ct.length>=2&&ct[1]=="type"?U+(Se+"="+Te+"&"):U+(Se+"=redacted&")}}}else U=null;else U=x;return"XMLHTTP REQ ("+_+") [attempt "+k+"]: "+u+`
`+h+`
`+U})}function Om(o,u,h,_,k,x,U){o.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+k+"]: "+u+`
`+h+`
`+x+" "+U})}function On(o,u,h,_){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Fm(o,h)+(_?" "+_:"")})}function Bm(o,u){o.info(function(){return"TIMEOUT: "+u})}ys.prototype.info=function(){};function Fm(o,u){if(!o.g)return u;if(!u)return null;try{const x=JSON.parse(u);if(x){for(o=0;o<x.length;o++)if(Array.isArray(x[o])){var h=x[o];if(!(h.length<2)){var _=h[1];if(Array.isArray(_)&&!(_.length<1)){var k=_[0];if(k!="noop"&&k!="stop"&&k!="close")for(let U=1;U<_.length;U++)_[U]=""}}}}return Wi(x)}catch{return u}}var _r={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Mc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Vc;function Qi(){}m(Qi,kc),Qi.prototype.g=function(){return new XMLHttpRequest},Vc=new Qi;function _s(o){return encodeURIComponent(String(o))}function Um(o){var u=1;o=o.split(":");const h=[];for(;u>0&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function Vt(o,u,h,_){this.j=o,this.i=u,this.l=h,this.S=_||1,this.V=new fs(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Oc}function Oc(){this.i=null,this.g="",this.h=!1}var Bc={},Xi={};function Yi(o,u,h){o.M=1,o.A=Er(at(u)),o.u=h,o.R=!0,Fc(o,null)}function Fc(o,u){o.F=Date.now(),wr(o),o.B=at(o.A);var h=o.B,_=o.S;Array.isArray(_)||(_=[String(_)]),Jc(h.i,"t",_),o.C=0,h=o.j.L,o.h=new Oc,o.g=gl(o.j,h?u:null,!o.u),o.P>0&&(o.O=new Nm(d(o.Y,o,o.g),o.P)),u=o.V,h=o.g,_=o.ba;var k="readystatechange";Array.isArray(k)||(k&&(Sc[0]=k.toString()),k=Sc);for(let x=0;x<k.length;x++){const U=hs(h,k[x],_||u.handleEvent,!1,u.h||u);if(!U)break;u.g[U.key]=U}u=o.J?it(o.J):{},o.u?(o.v||(o.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,u)):(o.v="GET",o.g.ea(o.B,o.v,null,u)),ps(),Vm(o.i,o.v,o.B,o.l,o.S,o.u)}Vt.prototype.ba=function(o){o=o.target;const u=this.O;u&&Ft(o)==3?u.j():this.Y(o)},Vt.prototype.Y=function(o){try{if(o==this.g)e:{const Q=Ft(this.g),Te=this.g.ya(),oe=this.g.ca();if(!(Q<3)&&(Q!=3||this.g&&(this.h.h||this.g.la()||il(this.g)))){this.K||Q!=4||Te==7||(Te==8||oe<=0?ps(3):ps(2)),Ji(this);var u=this.g.ca();this.X=u;var h=zm(this);if(this.o=u==200,Om(this.i,this.v,this.B,this.l,this.S,Q,u),this.o){if(this.U&&!this.L){t:{if(this.g){var _,k=this.g;if((_=k.g?k.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(_)){var x=_;break t}}x=null}if(o=x)On(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Zi(this,o);else{this.o=!1,this.m=3,ze(12),dn(this),ws(this);break e}}if(this.R){o=!0;let Se;for(;!this.K&&this.C<h.length;)if(Se=$m(this,h),Se==Xi){Q==4&&(this.m=4,ze(14),o=!1),On(this.i,this.l,null,"[Incomplete Response]");break}else if(Se==Bc){this.m=4,ze(15),On(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else On(this.i,this.l,Se,null),Zi(this,Se);if(Uc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||h.length!=0||this.h.h||(this.m=1,ze(16),o=!1),this.o=this.o&&o,!o)On(this.i,this.l,h,"[Invalid Chunked Response]"),dn(this),ws(this);else if(h.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),ao(U),U.P=!0,ze(11))}}else On(this.i,this.l,h,null),Zi(this,h);Q==4&&dn(this),this.o&&!this.K&&(Q==4?hl(this.j,this):(this.o=!1,wr(this)))}else np(this.g),u==400&&h.indexOf("Unknown SID")>0?(this.m=3,ze(12)):(this.m=0,ze(13)),dn(this),ws(this)}}}catch{}finally{}};function zm(o){if(!Uc(o))return o.g.la();const u=il(o.g);if(u==="")return"";let h="";const _=u.length,k=Ft(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return dn(o),ws(o),"";o.h.i=new a.TextDecoder}for(let x=0;x<_;x++)o.h.h=!0,h+=o.h.i.decode(u[x],{stream:!(k&&x==_-1)});return u.length=0,o.h.g+=h,o.C=0,o.h.g}function Uc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function $m(o,u){var h=o.C,_=u.indexOf(`
`,h);return _==-1?Xi:(h=Number(u.substring(h,_)),isNaN(h)?Bc:(_+=1,_+h>u.length?Xi:(u=u.slice(_,_+h),o.C=_+h,u)))}Vt.prototype.cancel=function(){this.K=!0,dn(this)};function wr(o){o.T=Date.now()+o.H,zc(o,o.H)}function zc(o,u){if(o.D!=null)throw Error("WatchDog timer not null");o.D=gs(d(o.aa,o),u)}function Ji(o){o.D&&(a.clearTimeout(o.D),o.D=null)}Vt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Bm(this.i,this.B),this.M!=2&&(ps(),ze(17)),dn(this),this.m=2,ws(this)):zc(this,this.T-o)};function ws(o){o.j.I==0||o.K||hl(o.j,o)}function dn(o){Ji(o);var u=o.O;u&&typeof u.dispose=="function"&&u.dispose(),o.O=null,Rc(o.V),o.g&&(u=o.g,o.g=null,u.abort(),u.dispose())}function Zi(o,u){try{var h=o.j;if(h.I!=0&&(h.g==o||eo(h.h,o))){if(!o.L&&eo(h.h,o)&&h.I==3){try{var _=h.Ba.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var k=_;if(k[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Ar(h),br(h);else break e;oo(h),ze(18)}}else h.xa=k[1],0<h.xa-h.K&&k[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=gs(d(h.Va,h),6e3));jc(h.h)<=1&&h.ta&&(h.ta=void 0)}else fn(h,11)}else if((o.L||h.g==o)&&Ar(h),!T(u))for(k=h.Ba.g.parse(u),u=0;u<k.length;u++){let oe=k[u];const Se=oe[0];if(!(Se<=h.K))if(h.K=Se,oe=oe[1],h.I==2)if(oe[0]=="c"){h.M=oe[1],h.ba=oe[2];const ct=oe[3];ct!=null&&(h.ka=ct,h.j.info("VER="+h.ka));const mn=oe[4];mn!=null&&(h.za=mn,h.j.info("SVER="+h.za));const Ut=oe[5];Ut!=null&&typeof Ut=="number"&&Ut>0&&(_=1.5*Ut,h.O=_,h.j.info("backChannelRequestTimeoutMs_="+_)),_=h;const zt=o.g;if(zt){const Sr=zt.g?zt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Sr){var x=_.h;x.g||Sr.indexOf("spdy")==-1&&Sr.indexOf("quic")==-1&&Sr.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(to(x,x.h),x.h=null))}if(_.G){const co=zt.g?zt.g.getResponseHeader("X-HTTP-Session-Id"):null;co&&(_.wa=co,ce(_.J,_.G,co))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),_=h;var U=o;if(_.na=pl(_,_.L?_.ba:null,_.W),U.L){Hc(_.h,U);var Q=U,Te=_.O;Te&&(Q.H=Te),Q.D&&(Ji(Q),wr(Q)),_.g=U}else ul(_);h.i.length>0&&Tr(h)}else oe[0]!="stop"&&oe[0]!="close"||fn(h,7);else h.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?fn(h,7):io(h):oe[0]!="noop"&&h.l&&h.l.qa(oe),h.A=0)}}ps(4)}catch{}}var qm=class{constructor(o,u){this.g=o,this.map=u}};function $c(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function qc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function jc(o){return o.h?1:o.g?o.g.size:0}function eo(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function to(o,u){o.g?o.g.add(u):o.h=u}function Hc(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}$c.prototype.cancel=function(){if(this.i=Wc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Wc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const h of o.g.values())u=u.concat(h.G);return u}return v(o.i)}var Gc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jm(o,u){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const _=o[h].indexOf("=");let k,x=null;_>=0?(k=o[h].substring(0,_),x=o[h].substring(_+1)):k=o[h],u(k,x?decodeURIComponent(x.replace(/\+/g," ")):"")}}}function Ot(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;o instanceof Ot?(this.l=o.l,Es(this,o.j),this.o=o.o,this.g=o.g,vs(this,o.u),this.h=o.h,no(this,Zc(o.i)),this.m=o.m):o&&(u=String(o).match(Gc))?(this.l=!1,Es(this,u[1]||"",!0),this.o=Is(u[2]||""),this.g=Is(u[3]||"",!0),vs(this,u[4]),this.h=Is(u[5]||"",!0),no(this,u[6]||"",!0),this.m=Is(u[7]||"")):(this.l=!1,this.i=new Ts(null,this.l))}Ot.prototype.toString=function(){const o=[];var u=this.j;u&&o.push(bs(u,Kc,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(bs(u,Kc,!0),"@"),o.push(_s(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(bs(h,h.charAt(0)=="/"?Gm:Wm,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",bs(h,Qm)),o.join("")},Ot.prototype.resolve=function(o){const u=at(this);let h=!!o.j;h?Es(u,o.j):h=!!o.o,h?u.o=o.o:h=!!o.g,h?u.g=o.g:h=o.u!=null;var _=o.h;if(h)vs(u,o.u);else if(h=!!o.h){if(_.charAt(0)!="/")if(this.g&&!this.h)_="/"+_;else{var k=u.h.lastIndexOf("/");k!=-1&&(_=u.h.slice(0,k+1)+_)}if(k=_,k==".."||k==".")_="";else if(k.indexOf("./")!=-1||k.indexOf("/.")!=-1){_=k.lastIndexOf("/",0)==0,k=k.split("/");const x=[];for(let U=0;U<k.length;){const Q=k[U++];Q=="."?_&&U==k.length&&x.push(""):Q==".."?((x.length>1||x.length==1&&x[0]!="")&&x.pop(),_&&U==k.length&&x.push("")):(x.push(Q),_=!0)}_=x.join("/")}else _=k}return h?u.h=_:h=o.i.toString()!=="",h?no(u,Zc(o.i)):h=!!o.m,h&&(u.m=o.m),u};function at(o){return new Ot(o)}function Es(o,u,h){o.j=h?Is(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function vs(o,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);o.u=u}else o.u=null}function no(o,u,h){u instanceof Ts?(o.i=u,Xm(o.i,o.l)):(h||(u=bs(u,Km)),o.i=new Ts(u,o.l))}function ce(o,u,h){o.i.set(u,h)}function Er(o){return ce(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Is(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function bs(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,Hm),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Hm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Kc=/[#\/\?@]/g,Wm=/[#\?:]/g,Gm=/[#\?]/g,Km=/[#\?@]/g,Qm=/#/g;function Ts(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function hn(o){o.g||(o.g=new Map,o.h=0,o.i&&jm(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=Ts.prototype,n.add=function(o,u){hn(this),this.i=null,o=Bn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Qc(o,u){hn(o),u=Bn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Xc(o,u){return hn(o),u=Bn(o,u),o.g.has(u)}n.forEach=function(o,u){hn(this),this.g.forEach(function(h,_){h.forEach(function(k){o.call(u,k,_,this)},this)},this)};function Yc(o,u){hn(o);let h=[];if(typeof u=="string")Xc(o,u)&&(h=h.concat(o.g.get(Bn(o,u))));else for(o=Array.from(o.g.values()),u=0;u<o.length;u++)h=h.concat(o[u]);return h}n.set=function(o,u){return hn(this),this.i=null,o=Bn(this,o),Xc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=Yc(this,o),o.length>0?String(o[0]):u):u};function Jc(o,u,h){Qc(o,u),h.length>0&&(o.i=null,o.g.set(Bn(o,u),v(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(let _=0;_<u.length;_++){var h=u[_];const k=_s(h);h=Yc(this,h);for(let x=0;x<h.length;x++){let U=k;h[x]!==""&&(U+="="+_s(h[x])),o.push(U)}}return this.i=o.join("&")};function Zc(o){const u=new Ts;return u.i=o.i,o.g&&(u.g=new Map(o.g),u.h=o.h),u}function Bn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function Xm(o,u){u&&!o.j&&(hn(o),o.i=null,o.g.forEach(function(h,_){const k=_.toLowerCase();_!=k&&(Qc(this,_),Jc(this,k,h))},o)),o.j=u}function Ym(o,u){const h=new ys;if(a.Image){const _=new Image;_.onload=f(Bt,h,"TestLoadImage: loaded",!0,u,_),_.onerror=f(Bt,h,"TestLoadImage: error",!1,u,_),_.onabort=f(Bt,h,"TestLoadImage: abort",!1,u,_),_.ontimeout=f(Bt,h,"TestLoadImage: timeout",!1,u,_),a.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=o}else u(!1)}function Jm(o,u){const h=new ys,_=new AbortController,k=setTimeout(()=>{_.abort(),Bt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:_.signal}).then(x=>{clearTimeout(k),x.ok?Bt(h,"TestPingServer: ok",!0,u):Bt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(k),Bt(h,"TestPingServer: error",!1,u)})}function Bt(o,u,h,_,k){try{k&&(k.onload=null,k.onerror=null,k.onabort=null,k.ontimeout=null),_(h)}catch{}}function Zm(){this.g=new Mm}function so(o){this.i=o.Sb||null,this.h=o.ab||!1}m(so,kc),so.prototype.g=function(){return new vr(this.i,this.h)};function vr(o,u){De.call(this),this.H=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(vr,De),n=vr.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=u,this.readyState=1,Cs(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(u.body=o),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,As(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Cs(this)),this.g&&(this.readyState=3,Cs(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;el(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function el(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?As(this):Cs(this),this.readyState==3&&el(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,As(this))},n.Na=function(o){this.g&&(this.response=o,As(this))},n.ga=function(){this.g&&As(this)};function As(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Cs(o)}n.setRequestHeader=function(o,u){this.A.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join(`\r
`)};function Cs(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(vr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function tl(o){let u="";return se(o,function(h,_){u+=_,u+=":",u+=h,u+=`\r
`}),u}function ro(o,u,h){e:{for(_ in h){var _=!1;break e}_=!0}_||(h=tl(h),typeof o=="string"?h!=null&&_s(h):ce(o,u,h))}function he(o){De.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(he,De);var ep=/^https?$/i,tp=["POST","PUT"];n=he.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,u,h,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Vc.g(),this.g.onreadystatechange=y(d(this.Ca,this));try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(x){nl(this,x);return}if(o=h||"",h=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var k in _)h.set(k,_[k]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const x of _.keys())h.set(x,_.get(x));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(h.keys()).find(x=>x.toLowerCase()=="content-type"),k=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(tp,u,void 0)>=0)||_||k||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,U]of h)this.g.setRequestHeader(x,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(x){nl(this,x)}};function nl(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.o=5,sl(o),Ir(o)}function sl(o){o.A||(o.A=!0,Ue(o,"complete"),Ue(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Ue(this,"complete"),Ue(this,"abort"),Ir(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ir(this,!0)),he.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?rl(this):this.Xa())},n.Xa=function(){rl(this)};function rl(o){if(o.h&&typeof i<"u"){if(o.v&&Ft(o)==4)setTimeout(o.Ca.bind(o),0);else if(Ue(o,"readystatechange"),Ft(o)==4){o.h=!1;try{const x=o.ca();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var _;if(_=x===0){let U=String(o.D).match(Gc)[1]||null;!U&&a.self&&a.self.location&&(U=a.self.location.protocol.slice(0,-1)),_=!ep.test(U?U.toLowerCase():"")}h=_}if(h)Ue(o,"complete"),Ue(o,"success");else{o.o=6;try{var k=Ft(o)>2?o.g.statusText:""}catch{k=""}o.l=k+" ["+o.ca()+"]",sl(o)}}finally{Ir(o)}}}}function Ir(o,u){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,u||Ue(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Ft(o){return o.g?o.g.readyState:0}n.ca=function(){try{return Ft(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Dm(u)}};function il(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function np(o){const u={};o=(o.g&&Ft(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<o.length;_++){if(T(o[_]))continue;var h=Um(o[_]);const k=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const x=u[k]||[];u[k]=x,x.push(h)}ue(u,function(_){return _.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ss(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function ol(o){this.za=0,this.i=[],this.j=new ys,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ss("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ss("baseRetryDelayMs",5e3,o),this.Za=Ss("retryDelaySeedMs",1e4,o),this.Ta=Ss("forwardChannelMaxRetries",2,o),this.va=Ss("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new $c(o&&o.concurrentRequestLimit),this.Ba=new Zm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ol.prototype,n.ka=8,n.I=1,n.connect=function(o,u,h,_){ze(0),this.W=o,this.H=u||{},h&&_!==void 0&&(this.H.OSID=h,this.H.OAID=_),this.F=this.X,this.J=pl(this,null,this.W),Tr(this)};function io(o){if(al(o),o.I==3){var u=o.V++,h=at(o.J);if(ce(h,"SID",o.M),ce(h,"RID",u),ce(h,"TYPE","terminate"),Rs(o,h),u=new Vt(o,o.j,u),u.M=2,u.A=Er(at(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=u.A,h=!0),h||(u.g=gl(u.j,null),u.g.ea(u.A)),u.F=Date.now(),wr(u)}ml(o)}function br(o){o.g&&(ao(o),o.g.cancel(),o.g=null)}function al(o){br(o),o.v&&(a.clearTimeout(o.v),o.v=null),Ar(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Tr(o){if(!qc(o.h)&&!o.m){o.m=!0;var u=o.Ea;O||g(),F||(O(),F=!0),E.add(u,o),o.D=0}}function sp(o,u){return jc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=u.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=gs(d(o.Ea,o,u),fl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const k=new Vt(this,this.j,o);let x=this.o;if(this.U&&(x?(x=it(x),Ne(x,this.U)):x=this.U),this.u!==null||this.R||(k.J=x,x=null),this.S)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var _=this.i[h];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,u>4096){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=ll(this,k,u),h=at(this.J),ce(h,"RID",o),ce(h,"CVER",22),this.G&&ce(h,"X-HTTP-Session-Id",this.G),Rs(this,h),x&&(this.R?u="headers="+_s(tl(x))+"&"+u:this.u&&ro(h,this.u,x)),to(this.h,k),this.Ra&&ce(h,"TYPE","init"),this.S?(ce(h,"$req",u),ce(h,"SID","null"),k.U=!0,Yi(k,h,null)):Yi(k,h,u),this.I=2}}else this.I==3&&(o?cl(this,o):this.i.length==0||qc(this.h)||cl(this))};function cl(o,u){var h;u?h=u.l:h=o.V++;const _=at(o.J);ce(_,"SID",o.M),ce(_,"RID",h),ce(_,"AID",o.K),Rs(o,_),o.u&&o.o&&ro(_,o.u,o.o),h=new Vt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),u&&(o.i=u.G.concat(o.i)),u=ll(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),to(o.h,h),Yi(h,_,u)}function Rs(o,u){o.H&&se(o.H,function(h,_){ce(u,_,h)}),o.l&&se({},function(h,_){ce(u,_,h)})}function ll(o,u,h){h=Math.min(o.i.length,h);const _=o.l?d(o.l.Ka,o.l,o):null;e:{var k=o.i;let Q=-1;for(;;){const Te=["count="+h];Q==-1?h>0?(Q=k[0].g,Te.push("ofs="+Q)):Q=0:Te.push("ofs="+Q);let oe=!0;for(let Se=0;Se<h;Se++){var x=k[Se].g;const ct=k[Se].map;if(x-=Q,x<0)Q=Math.max(0,k[Se].g-100),oe=!1;else try{x="req"+x+"_"||"";try{var U=ct instanceof Map?ct:Object.entries(ct);for(const[mn,Ut]of U){let zt=Ut;c(Ut)&&(zt=Wi(Ut)),Te.push(x+mn+"="+encodeURIComponent(zt))}}catch(mn){throw Te.push(x+"type="+encodeURIComponent("_badmap")),mn}}catch{_&&_(ct)}}if(oe){U=Te.join("&");break e}}U=void 0}return o=o.i.splice(0,h),u.G=o,U}function ul(o){if(!o.g&&!o.v){o.Y=1;var u=o.Da;O||g(),F||(O(),F=!0),E.add(u,o),o.A=0}}function oo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=gs(d(o.Da,o),fl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,dl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=gs(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ze(10),br(this),dl(this))};function ao(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function dl(o){o.g=new Vt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var u=at(o.na);ce(u,"RID","rpc"),ce(u,"SID",o.M),ce(u,"AID",o.K),ce(u,"CI",o.F?"0":"1"),!o.F&&o.ia&&ce(u,"TO",o.ia),ce(u,"TYPE","xmlhttp"),Rs(o,u),o.u&&o.o&&ro(u,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Er(at(u)),h.u=null,h.R=!0,Fc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,br(this),oo(this),ze(19))};function Ar(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function hl(o,u){var h=null;if(o.g==u){Ar(o),ao(o),o.g=null;var _=2}else if(eo(o.h,u))h=u.G,Hc(o.h,u),_=1;else return;if(o.I!=0){if(u.o)if(_==1){h=u.u?u.u.length:0,u=Date.now()-u.F;var k=o.D;_=yr(),Ue(_,new Dc(_,h)),Tr(o)}else ul(o);else if(k=u.m,k==3||k==0&&u.X>0||!(_==1&&sp(o,u)||_==2&&oo(o)))switch(h&&h.length>0&&(u=o.h,u.i=u.i.concat(h)),k){case 1:fn(o,5);break;case 4:fn(o,10);break;case 3:fn(o,6);break;default:fn(o,2)}}}function fl(o,u){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*u}function fn(o,u){if(o.j.info("Error code "+u),u==2){var h=d(o.bb,o),_=o.Ua;const k=!_;_=new Ot(_||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Es(_,"https"),Er(_),k?Ym(_.toString(),h):Jm(_.toString(),h)}else ze(2);o.I=0,o.l&&o.l.pa(u),ml(o),al(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),ze(2)):(this.j.info("Failed to ping google.com"),ze(1))};function ml(o){if(o.I=0,o.ja=[],o.l){const u=Wc(o.h);(u.length!=0||o.i.length!=0)&&(b(o.ja,u),b(o.ja,o.i),o.h.i.length=0,v(o.i),o.i.length=0),o.l.oa()}}function pl(o,u,h){var _=h instanceof Ot?at(h):new Ot(h);if(_.g!="")u&&(_.g=u+"."+_.g),vs(_,_.u);else{var k=a.location;_=k.protocol,u=u?u+"."+k.hostname:k.hostname,k=+k.port;const x=new Ot(null);_&&Es(x,_),u&&(x.g=u),k&&vs(x,k),h&&(x.h=h),_=x}return h=o.G,u=o.wa,h&&u&&ce(_,h,u),ce(_,"VER",o.ka),Rs(o,_),_}function gl(o,u,h){if(u&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Aa&&!o.ma?new he(new so({ab:h})):new he(o.ma),u.Fa(o.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function yl(){}n=yl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Cr(){}Cr.prototype.g=function(o,u){return new Ge(o,u)};function Ge(o,u){De.call(this),this.g=new ol(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(o?o["X-WebChannel-Client-Profile"]=u.sa:o={"X-WebChannel-Client-Profile":u.sa}),this.g.U=o,(o=u&&u.Qb)&&!T(o)&&(this.g.u=o),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!T(u)&&(this.g.G=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Fn(this)}m(Ge,De),Ge.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ge.prototype.close=function(){io(this.g)},Ge.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Wi(o),o=h);u.i.push(new qm(u.Ya++,o)),u.I==3&&Tr(u)},Ge.prototype.N=function(){this.g.l=null,delete this.j,io(this.g),delete this.g,Ge.Z.N.call(this)};function _l(o){Gi.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}m(_l,Gi);function wl(){Ki.call(this),this.status=1}m(wl,Ki);function Fn(o){this.g=o}m(Fn,yl),Fn.prototype.ra=function(){Ue(this.g,"a")},Fn.prototype.qa=function(o){Ue(this.g,new _l(o))},Fn.prototype.pa=function(o){Ue(this.g,new wl)},Fn.prototype.oa=function(){Ue(this.g,"b")},Cr.prototype.createWebChannel=Cr.prototype.g,Ge.prototype.send=Ge.prototype.o,Ge.prototype.open=Ge.prototype.m,Ge.prototype.close=Ge.prototype.close,Eh=function(){return new Cr},wh=function(){return yr()},_h=un,zo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},_r.NO_ERROR=0,_r.TIMEOUT=8,_r.HTTP_ERROR=6,qr=_r,Mc.COMPLETE="complete",yh=Mc,Pc.EventType=ms,ms.OPEN="a",ms.CLOSE="b",ms.ERROR="c",ms.MESSAGE="d",De.prototype.listen=De.prototype.J,Ns=Pc,he.prototype.listenOnce=he.prototype.K,he.prototype.getLastError=he.prototype.Ha,he.prototype.getLastErrorCode=he.prototype.ya,he.prototype.getStatus=he.prototype.ca,he.prototype.getResponseJson=he.prototype.La,he.prototype.getResponseText=he.prototype.la,he.prototype.send=he.prototype.ea,he.prototype.setWithCredentials=he.prototype.Fa,gh=he}).apply(typeof Pr<"u"?Pr:typeof self<"u"?self:typeof window<"u"?window:{});const eu="@firebase/firestore",tu="4.9.3";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ve.UNAUTHENTICATED=new Ve(null),Ve.GOOGLE_CREDENTIALS=new Ve("google-credentials-uid"),Ve.FIRST_PARTY=new Ve("first-party-uid"),Ve.MOCK_USER=new Ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let as="12.7.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new _a("@firebase/firestore");function Un(){return Rn.logLevel}function $(n,...e){if(Rn.logLevel<=Y.DEBUG){const t=e.map(La);Rn.debug(`Firestore (${as}): ${n}`,...t)}}function Pt(n,...e){if(Rn.logLevel<=Y.ERROR){const t=e.map(La);Rn.error(`Firestore (${as}): ${n}`,...t)}}function es(n,...e){if(Rn.logLevel<=Y.WARN){const t=e.map(La);Rn.warn(`Firestore (${as}): ${n}`,...t)}}function La(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function H(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,vh(n,s,t)}function vh(n,e,t){let s=`FIRESTORE (${as}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw Pt(s),new Error(s)}function te(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||vh(e,r,s)}function K(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends vt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class xw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ve.UNAUTHENTICATED))}shutdown(){}}class Lw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Nw{constructor(e){this.t=e,this.currentUser=Ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){te(this.o===void 0,42304);let s=this.i;const r=l=>this.i!==s?(s=this.i,t(l)):Promise.resolve();let i=new St;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new St,e.enqueueRetryable(()=>r(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},c=l=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new St)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(te(typeof s.accessToken=="string",31837,{l:s}),new Ih(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return te(e===null||typeof e=="string",2055,{h:e}),new Ve(e)}}class Dw{constructor(e,t,s){this.P=e,this.T=t,this.I=s,this.type="FirstParty",this.user=Ve.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Mw{constructor(e,t,s){this.P=e,this.T=t,this.I=s}getToken(){return Promise.resolve(new Dw(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Vw{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ye(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){te(this.o===void 0,3512);const s=i=>{i.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,$("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?r(i):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new nu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new nu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=Ow(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<t&&(s+=e.charAt(r[i]%62))}return s}}function J(n,e){return n<e?-1:n>e?1:0}function $o(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),i=e.charAt(s);if(r!==i)return Eo(r)===Eo(i)?J(r,i):Eo(r)?1:-1}return J(n.length,e.length)}const Bw=55296,Fw=57343;function Eo(n){const e=n.charCodeAt(0);return e>=Bw&&e<=Fw}function ts(n,e,t){return n.length===e.length&&n.every((s,r)=>t(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su="__name__";class ut{constructor(e,t,s){t===void 0?t=0:t>e.length&&H(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&H(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return ut.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ut?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const i=ut.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return J(e.length,t.length)}static compareSegments(e,t){const s=ut.isNumericId(e),r=ut.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?ut.extractNumericId(e).compare(ut.extractNumericId(t)):$o(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Yt.fromString(e.substring(4,e.length-2))}}class ae extends ut{construct(e,t,s){return new ae(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new z(D.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(r=>r.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const Uw=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class xe extends ut{construct(e,t,s){return new xe(e,t,s)}static isValidIdentifier(e){return Uw.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),xe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===su}static keyField(){return new xe([su])}static fromServerFormat(e){const t=[];let s="",r=0;const i=()=>{if(s.length===0)throw new z(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let a=!1;for(;r<e.length;){const c=e[r];if(c==="\\"){if(r+1===e.length)throw new z(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new z(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=l,r+=2}else c==="`"?(a=!a,r++):c!=="."||a?(s+=c,r++):(i(),r++)}if(i(),a)throw new z(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new xe(t)}static emptyPath(){return new xe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(ae.fromString(e))}static fromName(e){return new j(ae.fromString(e).popFirst(5))}static empty(){return new j(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new ae(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(n,e,t){if(!t)throw new z(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function zw(n,e,t,s){if(e===!0&&s===!0)throw new z(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ru(n){if(!j.isDocumentKey(n))throw new z(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function iu(n){if(j.isDocumentKey(n))throw new z(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Th(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Si(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H(12329,{type:typeof n})}function en(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new z(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Si(n);throw new z(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Ie(n,e){const t={typeString:n};return e&&(t.value=e),t}function cr(n,e){if(!Th(n))throw new z(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const a=n[s];if(r&&typeof a!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${s}' field to equal '${i.value}'`;break}}if(t)throw new z(D.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou=-62135596800,au=1e6;class le{static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*au);return new le(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new z(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new z(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ou)throw new z(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/au}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:le._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(cr(e,le._jsonSchema))return new le(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ou;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}le._jsonSchemaVersion="firestore/timestamp/1.0",le._jsonSchema={type:Ie("string",le._jsonSchemaVersion),seconds:Ie("number"),nanoseconds:Ie("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{static fromTimestamp(e){return new G(e)}static min(){return new G(new le(0,0))}static max(){return new G(new le(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Qs=-1;function $w(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=G.fromTimestamp(s===1e9?new le(t+1,0):new le(t,s));return new tn(r,j.empty(),e)}function qw(n){return new tn(n.readTime,n.key,Qs)}class tn{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new tn(G.min(),j.empty(),Qs)}static max(){return new tn(G.max(),j.empty(),Qs)}}function jw(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ww{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==Hw)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new B((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(s,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof B?t:B.resolve(t)}catch(t){return B.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):B.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):B.reject(t)}static resolve(e){return new B((t,s)=>{t(e)})}static reject(e){return new B((t,s)=>{s(e)})}static waitFor(e){return new B((t,s)=>{let r=0,i=0,a=!1;e.forEach(c=>{++r,c.next(()=>{++i,a&&i===r&&t()},l=>s(l))}),a=!0,i===r&&t()})}static or(e){let t=B.resolve(!1);for(const s of e)t=t.next(r=>r?B.resolve(r):s());return t}static forEach(e,t){const s=[];return e.forEach((r,i)=>{s.push(t.call(this,r,i))}),this.waitFor(s)}static mapArray(e,t){return new B((s,r)=>{const i=e.length,a=new Array(i);let c=0;for(let l=0;l<i;l++){const d=l;t(e[d]).next(f=>{a[d]=f,++c,c===i&&s(a)},f=>r(f))}})}static doWhile(e,t){return new B((s,r)=>{const i=()=>{e()===!0?t().next(()=>{i()},r):s()};i()})}}function Gw(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ls(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Ri{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.ae(s),this.ue=s=>t.writeSequenceNumber(s))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ri.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da=-1;function ki(n){return n==null}function ci(n){return n===0&&1/n==-1/0}function Kw(n){return typeof n=="number"&&Number.isInteger(n)&&!ci(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah="";function Qw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=cu(e)),e=Xw(n.get(t),e);return cu(e)}function Xw(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case Ah:t+="";break;default:t+=i}}return t}function cu(n){return n+Ah+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ln(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Ch(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){this.comparator=e,this.root=t||ke.EMPTY}insert(e,t){return new de(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ke.BLACK,null,null))}remove(e){return new de(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xr(this.root,e,this.comparator,!1)}getReverseIterator(){return new xr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xr(this.root,e,this.comparator,!0)}}class xr{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?s(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ke{constructor(e,t,s,r,i){this.key=e,this.value=t,this.color=s??ke.RED,this.left=r??ke.EMPTY,this.right=i??ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,i){return new ke(e??this.key,t??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,s),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return ke.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw H(43730,{key:this.key,value:this.value});if(this.right.isRed())throw H(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw H(27949);return e+(this.isRed()?0:1)}}ke.EMPTY=null,ke.RED=!0,ke.BLACK=!1;ke.EMPTY=new class{constructor(){this.size=0}get key(){throw H(57766)}get value(){throw H(16141)}get color(){throw H(16727)}get left(){throw H(29726)}get right(){throw H(36894)}copy(e,t,s,r,i){return this}insert(e,t,s){return new ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.comparator=e,this.data=new de(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new uu(this.data.getIterator())}getIteratorFrom(e){return new uu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof Ae)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ae(this.comparator);return t.data=e,t}}class uu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.fields=e,e.sort(xe.comparator)}static empty(){return new nt([])}unionWith(e){let t=new Ae(xe.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new nt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ts(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
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
 */class Sh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Sh("Invalid base64 string: "+i):i}}(e);return new Le(t)}static fromUint8Array(e){const t=function(r){let i="";for(let a=0;a<r.length;++a)i+=String.fromCharCode(r[a]);return i}(e);return new Le(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Le.EMPTY_BYTE_STRING=new Le("");const Yw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function nn(n){if(te(!!n,39018),typeof n=="string"){let e=0;const t=Yw.exec(n);if(te(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:ge(n.seconds),nanos:ge(n.nanos)}}function ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function sn(n){return typeof n=="string"?Le.fromBase64String(n):Le.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="server_timestamp",kh="__type__",Ph="__previous_value__",xh="__local_write_time__";function Ma(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[kh])==null?void 0:s.stringValue)===Rh}function Pi(n){const e=n.mapValue.fields[Ph];return Ma(e)?Pi(e):e}function Xs(n){const e=nn(n.mapValue.fields[xh].timestampValue);return new le(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(e,t,s,r,i,a,c,l,d,f){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=f}}const li="(default)";class Ys{constructor(e,t){this.projectId=e,this.database=t||li}static empty(){return new Ys("","")}get isDefaultDatabase(){return this.database===li}isEqual(e){return e instanceof Ys&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="__type__",Zw="__max__",Lr={mapValue:{}},Nh="__vector__",ui="value";function rn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ma(n)?4:tE(n)?9007199254740991:eE(n)?10:11:H(28295,{value:n})}function Et(n,e){if(n===e)return!0;const t=rn(n);if(t!==rn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Xs(n).isEqual(Xs(e));case 3:return function(r,i){if(typeof r.timestampValue=="string"&&typeof i.timestampValue=="string"&&r.timestampValue.length===i.timestampValue.length)return r.timestampValue===i.timestampValue;const a=nn(r.timestampValue),c=nn(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(r,i){return sn(r.bytesValue).isEqual(sn(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(r,i){return ge(r.geoPointValue.latitude)===ge(i.geoPointValue.latitude)&&ge(r.geoPointValue.longitude)===ge(i.geoPointValue.longitude)}(n,e);case 2:return function(r,i){if("integerValue"in r&&"integerValue"in i)return ge(r.integerValue)===ge(i.integerValue);if("doubleValue"in r&&"doubleValue"in i){const a=ge(r.doubleValue),c=ge(i.doubleValue);return a===c?ci(a)===ci(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return ts(n.arrayValue.values||[],e.arrayValue.values||[],Et);case 10:case 11:return function(r,i){const a=r.mapValue.fields||{},c=i.mapValue.fields||{};if(lu(a)!==lu(c))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!Et(a[l],c[l])))return!1;return!0}(n,e);default:return H(52216,{left:n})}}function Js(n,e){return(n.values||[]).find(t=>Et(t,e))!==void 0}function ns(n,e){if(n===e)return 0;const t=rn(n),s=rn(e);if(t!==s)return J(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(i,a){const c=ge(i.integerValue||i.doubleValue),l=ge(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return du(n.timestampValue,e.timestampValue);case 4:return du(Xs(n),Xs(e));case 5:return $o(n.stringValue,e.stringValue);case 6:return function(i,a){const c=sn(i),l=sn(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const c=i.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){const f=J(c[d],l[d]);if(f!==0)return f}return J(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const c=J(ge(i.latitude),ge(a.latitude));return c!==0?c:J(ge(i.longitude),ge(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return hu(n.arrayValue,e.arrayValue);case 10:return function(i,a){var y,v,b,R;const c=i.fields||{},l=a.fields||{},d=(y=c[ui])==null?void 0:y.arrayValue,f=(v=l[ui])==null?void 0:v.arrayValue,m=J(((b=d==null?void 0:d.values)==null?void 0:b.length)||0,((R=f==null?void 0:f.values)==null?void 0:R.length)||0);return m!==0?m:hu(d,f)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===Lr.mapValue&&a===Lr.mapValue)return 0;if(i===Lr.mapValue)return 1;if(a===Lr.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),d=a.fields||{},f=Object.keys(d);l.sort(),f.sort();for(let m=0;m<l.length&&m<f.length;++m){const y=$o(l[m],f[m]);if(y!==0)return y;const v=ns(c[l[m]],d[f[m]]);if(v!==0)return v}return J(l.length,f.length)}(n.mapValue,e.mapValue);default:throw H(23264,{he:t})}}function du(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=nn(n),s=nn(e),r=J(t.seconds,s.seconds);return r!==0?r:J(t.nanos,s.nanos)}function hu(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const i=ns(t[r],s[r]);if(i)return i}return J(t.length,s.length)}function ss(n){return qo(n)}function qo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=nn(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return sn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return j.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",r=!0;for(const i of t.values||[])r?r=!1:s+=",",s+=qo(i);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const a of s)i?i=!1:r+=",",r+=`${a}:${qo(t.fields[a])}`;return r+"}"}(n.mapValue):H(61005,{value:n})}function jr(n){switch(rn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Pi(n);return e?16+jr(e):16;case 5:return 2*n.stringValue.length;case 6:return sn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(s){return(s.values||[]).reduce((r,i)=>r+jr(i),0)}(n.arrayValue);case 10:case 11:return function(s){let r=0;return Ln(s.fields,(i,a)=>{r+=i.length+jr(a)}),r}(n.mapValue);default:throw H(13486,{value:n})}}function fu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function jo(n){return!!n&&"integerValue"in n}function Va(n){return!!n&&"arrayValue"in n}function mu(n){return!!n&&"nullValue"in n}function pu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Hr(n){return!!n&&"mapValue"in n}function eE(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Lh])==null?void 0:s.stringValue)===Nh}function Us(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Ln(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=Us(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Us(n.arrayValue.values[t]);return e}return{...n}}function tE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Zw}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.value=e}static empty(){return new Je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!Hr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Us(t)}setAll(e){let t=xe.emptyPath(),s={},r=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,s,r),s={},r=[],t=c.popLast()}a?s[c.lastSegment()]=Us(a):r.push(c.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,s,r)}delete(e){const t=this.field(e.popLast());Hr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];Hr(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){Ln(t,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new Je(Us(this.value))}}function Dh(n){const e=[];return Ln(n.fields,(t,s)=>{const r=new xe([t]);if(Hr(s)){const i=Dh(s.mapValue).fields;if(i.length===0)e.push(r);else for(const a of i)e.push(r.child(a))}else e.push(r)}),new nt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t,s,r,i,a,c){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Be(e,0,G.min(),G.min(),G.min(),Je.empty(),0)}static newFoundDocument(e,t,s,r){return new Be(e,1,t,G.min(),s,r,0)}static newNoDocument(e,t){return new Be(e,2,t,G.min(),G.min(),Je.empty(),0)}static newUnknownDocument(e,t){return new Be(e,3,t,G.min(),G.min(),Je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class di{constructor(e,t){this.position=e,this.inclusive=t}}function gu(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const i=e[r],a=n.position[r];if(i.field.isKeyField()?s=j.comparator(j.fromName(a.referenceValue),t.key):s=ns(a,t.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function yu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Et(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class hi{constructor(e,t="asc"){this.field=e,this.dir=t}}function nE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Mh{}class ve extends Mh{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new rE(e,t,s):t==="array-contains"?new aE(e,s):t==="in"?new cE(e,s):t==="not-in"?new lE(e,s):t==="array-contains-any"?new uE(e,s):new ve(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new iE(e,s):new oE(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(ns(t,this.value)):t!==null&&rn(this.value)===rn(t)&&this.matchesComparison(ns(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rt extends Mh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new rt(e,t)}matches(e){return Vh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Vh(n){return n.op==="and"}function Oh(n){return sE(n)&&Vh(n)}function sE(n){for(const e of n.filters)if(e instanceof rt)return!1;return!0}function Ho(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+ss(n.value);if(Oh(n))return n.filters.map(e=>Ho(e)).join(",");{const e=n.filters.map(t=>Ho(t)).join(",");return`${n.op}(${e})`}}function Bh(n,e){return n instanceof ve?function(s,r){return r instanceof ve&&s.op===r.op&&s.field.isEqual(r.field)&&Et(s.value,r.value)}(n,e):n instanceof rt?function(s,r){return r instanceof rt&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce((i,a,c)=>i&&Bh(a,r.filters[c]),!0):!1}(n,e):void H(19439)}function Fh(n){return n instanceof ve?function(t){return`${t.field.canonicalString()} ${t.op} ${ss(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(Fh).join(" ,")+"}"}(n):"Filter"}class rE extends ve{constructor(e,t,s){super(e,t,s),this.key=j.fromName(s.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class iE extends ve{constructor(e,t){super(e,"in",t),this.keys=Uh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class oE extends ve{constructor(e,t){super(e,"not-in",t),this.keys=Uh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(s=>j.fromName(s.referenceValue))}class aE extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Va(t)&&Js(t.arrayValue,this.value)}}class cE extends ve{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Js(this.value.arrayValue,t)}}class lE extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(Js(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Js(this.value.arrayValue,t)}}class uE extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Va(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>Js(this.value.arrayValue,s))}}/**
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
 */class dE{constructor(e,t=null,s=[],r=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function _u(n,e=null,t=[],s=[],r=null,i=null,a=null){return new dE(n,e,t,s,r,i,a)}function Oa(n){const e=K(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>Ho(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(i){return i.field.canonicalString()+i.dir}(s)).join(","),ki(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>ss(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>ss(s)).join(",")),e.Te=t}return e.Te}function Ba(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!nE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Bh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!yu(n.startAt,e.startAt)&&yu(n.endAt,e.endAt)}function Wo(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e,t=null,s=[],r=[],i=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function hE(n,e,t,s,r,i,a,c){return new lr(n,e,t,s,r,i,a,c)}function Fa(n){return new lr(n)}function wu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function zh(n){return n.collectionGroup!==null}function zs(n){const e=K(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new Ae(xe.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new hi(i,s))}),t.has(xe.keyField().canonicalString())||e.Ie.push(new hi(xe.keyField(),s))}return e.Ie}function mt(n){const e=K(n);return e.Ee||(e.Ee=fE(e,zs(n))),e.Ee}function fE(n,e){if(n.limitType==="F")return _u(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(r=>{const i=r.dir==="desc"?"asc":"desc";return new hi(r.field,i)});const t=n.endAt?new di(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new di(n.startAt.position,n.startAt.inclusive):null;return _u(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function Go(n,e){const t=n.filters.concat([e]);return new lr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ko(n,e,t){return new lr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function xi(n,e){return Ba(mt(n),mt(e))&&n.limitType===e.limitType}function $h(n){return`${Oa(mt(n))}|lt:${n.limitType}`}function zn(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(r=>Fh(r)).join(", ")}]`),ki(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(r=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(r)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(r=>ss(r)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(r=>ss(r)).join(",")),`Target(${s})`}(mt(n))}; limitType=${n.limitType})`}function Li(n,e){return e.isFoundDocument()&&function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):j.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)}(n,e)&&function(s,r){for(const i of zs(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0}(n,e)&&function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0}(n,e)&&function(s,r){return!(s.startAt&&!function(a,c,l){const d=gu(a,c,l);return a.inclusive?d<=0:d<0}(s.startAt,zs(s),r)||s.endAt&&!function(a,c,l){const d=gu(a,c,l);return a.inclusive?d>=0:d>0}(s.endAt,zs(s),r))}(n,e)}function mE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function qh(n){return(e,t)=>{let s=!1;for(const r of zs(n)){const i=pE(r,e,t);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function pE(n,e,t){const s=n.field.isKeyField()?j.comparator(e.key,t.key):function(i,a,c){const l=a.data.field(i),d=c.data.field(i);return l!==null&&d!==null?ns(l,d):H(42886)}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return H(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Ln(this.inner,(t,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return Ch(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE=new de(j.comparator);function xt(){return gE}const jh=new de(j.comparator);function Ds(...n){let e=jh;for(const t of n)e=e.insert(t.key,t);return e}function Hh(n){let e=jh;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function _n(){return $s()}function Wh(){return $s()}function $s(){return new Nn(n=>n.toString(),(n,e)=>n.isEqual(e))}const yE=new de(j.comparator),_E=new Ae(j.comparator);function Z(...n){let e=_E;for(const t of n)e=e.add(t);return e}const wE=new Ae(J);function EE(){return wE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ci(e)?"-0":e}}function Gh(n){return{integerValue:""+n}}function vE(n,e){return Kw(e)?Gh(e):Ua(n,e)}/**
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
 */class Ni{constructor(){this._=void 0}}function IE(n,e,t){return n instanceof fi?function(r,i){const a={fields:{[kh]:{stringValue:Rh},[xh]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Ma(i)&&(i=Pi(i)),i&&(a.fields[Ph]=i),{mapValue:a}}(t,e):n instanceof Zs?Qh(n,e):n instanceof er?Xh(n,e):function(r,i){const a=Kh(r,i),c=Eu(a)+Eu(r.Ae);return jo(a)&&jo(r.Ae)?Gh(c):Ua(r.serializer,c)}(n,e)}function bE(n,e,t){return n instanceof Zs?Qh(n,e):n instanceof er?Xh(n,e):t}function Kh(n,e){return n instanceof mi?function(s){return jo(s)||function(i){return!!i&&"doubleValue"in i}(s)}(e)?e:{integerValue:0}:null}class fi extends Ni{}class Zs extends Ni{constructor(e){super(),this.elements=e}}function Qh(n,e){const t=Yh(e);for(const s of n.elements)t.some(r=>Et(r,s))||t.push(s);return{arrayValue:{values:t}}}class er extends Ni{constructor(e){super(),this.elements=e}}function Xh(n,e){let t=Yh(e);for(const s of n.elements)t=t.filter(r=>!Et(r,s));return{arrayValue:{values:t}}}class mi extends Ni{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Eu(n){return ge(n.integerValue||n.doubleValue)}function Yh(n){return Va(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function TE(n,e){return n.field.isEqual(e.field)&&function(s,r){return s instanceof Zs&&r instanceof Zs||s instanceof er&&r instanceof er?ts(s.elements,r.elements,Et):s instanceof mi&&r instanceof mi?Et(s.Ae,r.Ae):s instanceof fi&&r instanceof fi}(n.transform,e.transform)}class AE{constructor(e,t){this.version=e,this.transformResults=t}}class pt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new pt}static exists(e){return new pt(void 0,e)}static updateTime(e){return new pt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Wr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Di{}function Jh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ef(n.key,pt.none()):new ur(n.key,n.data,pt.none());{const t=n.data,s=Je.empty();let r=new Ae(xe.comparator);for(let i of e.fields)if(!r.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?s.delete(i):s.set(i,a),r=r.add(i)}return new Dn(n.key,s,new nt(r.toArray()),pt.none())}}function CE(n,e,t){n instanceof ur?function(r,i,a){const c=r.value.clone(),l=Iu(r.fieldTransforms,i,a.transformResults);c.setAll(l),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Dn?function(r,i,a){if(!Wr(r.precondition,i))return void i.convertToUnknownDocument(a.version);const c=Iu(r.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Zh(r)),l.setAll(c),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(r,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function qs(n,e,t,s){return n instanceof ur?function(i,a,c,l){if(!Wr(i.precondition,a))return c;const d=i.value.clone(),f=bu(i.fieldTransforms,l,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,s):n instanceof Dn?function(i,a,c,l){if(!Wr(i.precondition,a))return c;const d=bu(i.fieldTransforms,l,a),f=a.data;return f.setAll(Zh(i)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(n,e,t,s):function(i,a,c){return Wr(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function SE(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),i=Kh(s.transform,r||null);i!=null&&(t===null&&(t=Je.empty()),t.set(s.field,i))}return t||null}function vu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&ts(s,r,(i,a)=>TE(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ur extends Di{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class Dn extends Di{constructor(e,t,s,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Zh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function Iu(n,e,t){const s=new Map;te(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let r=0;r<t.length;r++){const i=n[r],a=i.transform,c=e.data.field(i.field);s.set(i.field,bE(a,c,t[r]))}return s}function bu(n,e,t){const s=new Map;for(const r of n){const i=r.transform,a=t.data.field(r.field);s.set(r.field,IE(i,a,e))}return s}class ef extends Di{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class RE extends Di{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&CE(i,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=qs(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=qs(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=Wh();return this.mutations.forEach(r=>{const i=e.get(r.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(r.key)?null:c;const l=Jh(a,c);l!==null&&s.set(r.key,l),a.isValidDocument()||a.convertToNoDocument(G.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Z())}isEqual(e){return this.batchId===e.batchId&&ts(this.mutations,e.mutations,(t,s)=>vu(t,s))&&ts(this.baseMutations,e.baseMutations,(t,s)=>vu(t,s))}}class za{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){te(e.mutations.length===s.length,58842,{me:e.mutations.length,fe:s.length});let r=function(){return yE}();const i=e.mutations;for(let a=0;a<i.length;a++)r=r.insert(i[a].key,s[a].version);return new za(e,t,s,r)}}/**
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
 */class PE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class xE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we,ee;function LE(n){switch(n){case D.OK:return H(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return H(15467,{code:n})}}function tf(n){if(n===void 0)return Pt("GRPC error has no .code"),D.UNKNOWN;switch(n){case we.OK:return D.OK;case we.CANCELLED:return D.CANCELLED;case we.UNKNOWN:return D.UNKNOWN;case we.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case we.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case we.INTERNAL:return D.INTERNAL;case we.UNAVAILABLE:return D.UNAVAILABLE;case we.UNAUTHENTICATED:return D.UNAUTHENTICATED;case we.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case we.NOT_FOUND:return D.NOT_FOUND;case we.ALREADY_EXISTS:return D.ALREADY_EXISTS;case we.PERMISSION_DENIED:return D.PERMISSION_DENIED;case we.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case we.ABORTED:return D.ABORTED;case we.OUT_OF_RANGE:return D.OUT_OF_RANGE;case we.UNIMPLEMENTED:return D.UNIMPLEMENTED;case we.DATA_LOSS:return D.DATA_LOSS;default:return H(39323,{code:n})}}(ee=we||(we={}))[ee.OK=0]="OK",ee[ee.CANCELLED=1]="CANCELLED",ee[ee.UNKNOWN=2]="UNKNOWN",ee[ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ee[ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ee[ee.NOT_FOUND=5]="NOT_FOUND",ee[ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",ee[ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",ee[ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",ee[ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ee[ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ee[ee.ABORTED=10]="ABORTED",ee[ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",ee[ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",ee[ee.INTERNAL=13]="INTERNAL",ee[ee.UNAVAILABLE=14]="UNAVAILABLE",ee[ee.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function NE(){return new TextEncoder}/**
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
 */const DE=new Yt([4294967295,4294967295],0);function Tu(n){const e=NE().encode(n),t=new ph;return t.update(e),new Uint8Array(t.digest())}function Au(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Yt([t,s],0),new Yt([r,i],0)]}class $a{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Ms(`Invalid padding: ${t}`);if(s<0)throw new Ms(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Ms(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Ms(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Yt.fromNumber(this.ge)}ye(e,t,s){let r=e.add(t.multiply(Yt.fromNumber(s)));return r.compare(DE)===1&&(r=new Yt([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Tu(e),[s,r]=Au(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);if(!this.we(a))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new $a(i,r,t);return s.forEach(c=>a.insert(c)),a}insert(e){if(this.ge===0)return;const t=Tu(e),[s,r]=Au(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(s,r,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Ms extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t,s,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,dr.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new Mi(G.min(),r,new de(J),xt(),Z())}}class dr{constructor(e,t,s,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new dr(s,t,Z(),Z(),Z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,s,r){this.be=e,this.removedTargetIds=t,this.key=s,this.De=r}}class nf{constructor(e,t){this.targetId=e,this.Ce=t}}class sf{constructor(e,t,s=Le.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class Cu{constructor(){this.ve=0,this.Fe=Su(),this.Me=Le.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Z(),t=Z(),s=Z();return this.Fe.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:H(38017,{changeType:i})}}),new dr(this.Me,this.xe,e,t,s)}qe(){this.Oe=!1,this.Fe=Su()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,te(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class ME{constructor(e){this.Ge=e,this.ze=new Map,this.je=xt(),this.Je=Nr(),this.He=Nr(),this.Ye=new de(J)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const s=this.nt(t);switch(e.state){case 0:this.rt(t)&&s.Le(e.resumeToken);break;case 1:s.Ke(),s.Ne||s.qe(),s.Le(e.resumeToken);break;case 2:s.Ke(),s.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(s.We(),s.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),s.Le(e.resumeToken));break;default:H(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((s,r)=>{this.rt(r)&&t(r)})}st(e){const t=e.targetId,s=e.Ce.count,r=this.ot(t);if(r){const i=r.target;if(Wo(i))if(s===0){const a=new j(i.path);this.et(t,a,Be.newNoDocument(a,G.min()))}else te(s===1,20013,{expectedCount:s});else{const a=this._t(t);if(a!==s){const c=this.ut(e),l=c?this.ct(c,e,a):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=t;let a,c;try{a=sn(s).toUint8Array()}catch(l){if(l instanceof Sh)return es("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new $a(a,r,i)}catch(l){return es(l instanceof Ms?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,s){return t.Ce.count===s-this.Pt(e,t.targetId)?0:2}Pt(e,t){const s=this.Ge.getRemoteKeysForTarget(t);let r=0;return s.forEach(i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Wo(c.target)){const l=new j(c.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,Be.newNoDocument(l,e))}i.Be&&(t.set(a,i.ke()),i.qe())}});let s=Z();this.He.forEach((i,a)=>{let c=!0;a.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(s=s.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const r=new Mi(e,t,this.Ye,this.je,s);return this.je=xt(),this.Je=Nr(),this.He=Nr(),this.Ye=new de(J),r}Xe(e,t){if(!this.rt(e))return;const s=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,s),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,s){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),s&&(this.je=this.je.insert(t,s))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Cu,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Ae(J),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Ae(J),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Cu),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Nr(){return new de(j.comparator)}function Su(){return new de(j.comparator)}const VE={asc:"ASCENDING",desc:"DESCENDING"},OE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},BE={and:"AND",or:"OR"};class FE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Qo(n,e){return n.useProto3Json||ki(e)?e:{value:e}}function pi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function rf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function UE(n,e){return pi(n,e.toTimestamp())}function gt(n){return te(!!n,49232),G.fromTimestamp(function(t){const s=nn(t);return new le(s.seconds,s.nanos)}(n))}function qa(n,e){return Xo(n,e).canonicalString()}function Xo(n,e){const t=function(r){return new ae(["projects",r.projectId,"databases",r.database])}(n).child("documents");return e===void 0?t:t.child(e)}function of(n){const e=ae.fromString(n);return te(df(e),10190,{key:e.toString()}),e}function Yo(n,e){return qa(n.databaseId,e.path)}function vo(n,e){const t=of(e);if(t.get(1)!==n.databaseId.projectId)throw new z(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new z(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new j(cf(t))}function af(n,e){return qa(n.databaseId,e)}function zE(n){const e=of(n);return e.length===4?ae.emptyPath():cf(e)}function Jo(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function cf(n){return te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Ru(n,e,t){return{name:Yo(n,e),fields:t.value.mapValue.fields}}function $E(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:H(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(d,f){return d.useProto3Json?(te(f===void 0||typeof f=="string",58123),Le.fromBase64String(f||"")):(te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Le.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){const f=d.code===void 0?D.UNKNOWN:tf(d.code);return new z(f,d.message||"")}(a);t=new sf(s,r,i,c||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=vo(n,s.document.name),i=gt(s.document.updateTime),a=s.document.createTime?gt(s.document.createTime):G.min(),c=new Je({mapValue:{fields:s.document.fields}}),l=Be.newFoundDocument(r,i,a,c),d=s.targetIds||[],f=s.removedTargetIds||[];t=new Gr(d,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=vo(n,s.document),i=s.readTime?gt(s.readTime):G.min(),a=Be.newNoDocument(r,i),c=s.removedTargetIds||[];t=new Gr([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=vo(n,s.document),i=s.removedTargetIds||[];t=new Gr([],i,r,null)}else{if(!("filter"in e))return H(11601,{Rt:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,a=new xE(r,i),c=s.targetId;t=new nf(c,a)}}return t}function qE(n,e){let t;if(e instanceof ur)t={update:Ru(n,e.key,e.value)};else if(e instanceof ef)t={delete:Yo(n,e.key)};else if(e instanceof Dn)t={update:Ru(n,e.key,e.data),updateMask:JE(e.fieldMask)};else{if(!(e instanceof RE))return H(16599,{Vt:e.type});t={verify:Yo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(i,a){const c=a.transform;if(c instanceof fi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Zs)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof er)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof mi)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw H(20930,{transform:a.transform})}(0,s))),e.precondition.isNone||(t.currentDocument=function(r,i){return i.updateTime!==void 0?{updateTime:UE(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:H(27497)}(n,e.precondition)),t}function jE(n,e){return n&&n.length>0?(te(e!==void 0,14353),n.map(t=>function(r,i){let a=r.updateTime?gt(r.updateTime):gt(i);return a.isEqual(G.min())&&(a=gt(i)),new AE(a,r.transformResults||[])}(t,e))):[]}function HE(n,e){return{documents:[af(n,e.path)]}}function WE(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=af(n,r);const i=function(d){if(d.length!==0)return uf(rt.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(f=>function(y){return{field:$n(y.field),direction:QE(y.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Qo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:r}}function GE(n){let e=zE(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){te(s===1,65062);const f=t.from[0];f.allDescendants?r=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(m){const y=lf(m);return y instanceof rt&&Oh(y)?y.getFilters():[y]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(y=>function(b){return new hi(qn(b.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(b.direction))}(y))}(t.orderBy));let c=null;t.limit&&(c=function(m){let y;return y=typeof m=="object"?m.value:m,ki(y)?null:y}(t.limit));let l=null;t.startAt&&(l=function(m){const y=!!m.before,v=m.values||[];return new di(v,y)}(t.startAt));let d=null;return t.endAt&&(d=function(m){const y=!m.before,v=m.values||[];return new di(v,y)}(t.endAt)),hE(e,r,a,i,c,"F",l,d)}function KE(n,e){const t=function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H(28987,{purpose:r})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function lf(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=qn(t.unaryFilter.field);return ve.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=qn(t.unaryFilter.field);return ve.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=qn(t.unaryFilter.field);return ve.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=qn(t.unaryFilter.field);return ve.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return H(61313);default:return H(60726)}}(n):n.fieldFilter!==void 0?function(t){return ve.create(qn(t.fieldFilter.field),function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return H(58110);default:return H(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(s=>lf(s)),function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return H(1026)}}(t.compositeFilter.op))}(n):H(30097,{filter:n})}function QE(n){return VE[n]}function XE(n){return OE[n]}function YE(n){return BE[n]}function $n(n){return{fieldPath:n.canonicalString()}}function qn(n){return xe.fromServerFormat(n.fieldPath)}function uf(n){return n instanceof ve?function(t){if(t.op==="=="){if(pu(t.value))return{unaryFilter:{field:$n(t.field),op:"IS_NAN"}};if(mu(t.value))return{unaryFilter:{field:$n(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(pu(t.value))return{unaryFilter:{field:$n(t.field),op:"IS_NOT_NAN"}};if(mu(t.value))return{unaryFilter:{field:$n(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:$n(t.field),op:XE(t.op),value:t.value}}}(n):n instanceof rt?function(t){const s=t.getFilters().map(r=>uf(r));return s.length===1?s[0]:{compositeFilter:{op:YE(t.op),filters:s}}}(n):H(54877,{filter:n})}function JE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function df(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t,s,r,i=G.min(),a=G.min(),c=Le.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new Gt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Gt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(e){this.yt=e}}function ev(n){const e=GE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ko(e,e.limit,"L"):e}/**
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
 */class tv{constructor(){this.Cn=new nv}addToCollectionParentIndex(e,t){return this.Cn.add(t),B.resolve()}getCollectionParents(e,t){return B.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return B.resolve()}deleteFieldIndex(e,t){return B.resolve()}deleteAllFieldIndexes(e){return B.resolve()}createTargetIndexes(e,t){return B.resolve()}getDocumentsMatchingTarget(e,t){return B.resolve(null)}getIndexType(e,t){return B.resolve(0)}getFieldIndexes(e,t){return B.resolve([])}getNextCollectionGroupToUpdate(e){return B.resolve(null)}getMinOffset(e,t){return B.resolve(tn.min())}getMinOffsetFromCollectionGroup(e,t){return B.resolve(tn.min())}updateCollectionGroup(e,t,s){return B.resolve()}updateIndexEntries(e,t){return B.resolve()}}class nv{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new Ae(ae.comparator),i=!r.has(s);return this.index[t]=r.add(s),i}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new Ae(ae.comparator)).toArray()}}/**
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
 */const ku={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},hf=41943040;class We{static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(hf,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new rs(0)}static cr(){return new rs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pu="LruGarbageCollector",sv=1048576;function xu([n,e],[t,s]){const r=J(n,t);return r===0?J(e,s):r}class rv{constructor(e){this.Ir=e,this.buffer=new Ae(xu),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();xu(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class iv{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){$(Pu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ls(t)?$(Pu,"Ignoring IndexedDB error during garbage collection: ",t):await cs(t)}await this.Vr(3e5)})}}class ov{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(s=>Math.floor(t/100*s))}nthSequenceNumber(e,t){if(t===0)return B.resolve(Ri.ce);const s=new rv(t);return this.mr.forEachTarget(e,r=>s.Ar(r.sequenceNumber)).next(()=>this.mr.pr(e,r=>s.Ar(r))).next(()=>s.maxValue)}removeTargets(e,t,s){return this.mr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),B.resolve(ku)):this.getCacheSize(e).next(s=>s<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ku):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let s,r,i,a,c,l,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),r=this.params.maximumSequenceNumbersToCollect):r=m,a=Date.now(),this.nthSequenceNumber(e,r))).next(m=>(s=m,c=Date.now(),this.removeTargets(e,s,t))).next(m=>(i=m,l=Date.now(),this.removeOrphanedDocuments(e,s))).next(m=>(d=Date.now(),Un()<=Y.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${r} in `+(c-a)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(d-l)+`ms
Total Duration: ${d-f}ms`),B.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:m})))}}function av(n,e){return new ov(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(){this.changes=new Nn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?B.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class lv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,t))).next(r=>(s!==null&&qs(s.mutation,r,nt.empty(),le.now()),r))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,Z()).next(()=>s))}getLocalViewOfDocuments(e,t,s=Z()){const r=_n();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,s).next(i=>{let a=Ds();return i.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const s=_n();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,Z()))}populateOverlays(e,t,s){const r=[];return s.forEach(i=>{t.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,s,r){let i=xt();const a=$s(),c=function(){return $s()}();return t.forEach((l,d)=>{const f=s.get(d.key);r.has(d.key)&&(f===void 0||f.mutation instanceof Dn)?i=i.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),qs(f.mutation,d,f.mutation.getFieldMask(),le.now())):a.set(d.key,nt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((d,f)=>a.set(d,f)),t.forEach((d,f)=>c.set(d,new lv(f,a.get(d)??null))),c))}recalculateAndSaveOverlays(e,t){const s=$s();let r=new de((a,c)=>a-c),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let f=s.get(l)||nt.empty();f=c.applyToLocalView(d,f),s.set(l,f);const m=(r.get(c.batchId)||Z()).add(l);r=r.insert(c.batchId,m)})}).next(()=>{const a=[],c=r.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),d=l.key,f=l.value,m=Wh();f.forEach(y=>{if(!i.has(y)){const v=Jh(t.get(y),s.get(y));v!==null&&m.set(y,v),i=i.add(y)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return B.waitFor(a)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,r){return function(a){return j.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next(i=>{const a=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-i.size):B.resolve(_n());let c=Qs,l=i;return a.next(d=>B.forEach(d,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?B.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{l=l.insert(f,y)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,l,d,Z())).next(f=>({batchId:c,changes:Hh(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(s=>{let r=Ds();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const i=t.collectionGroup;let a=Ds();return this.indexManager.getCollectionParents(e,i).next(c=>B.forEach(c,l=>{const d=function(m,y){return new lr(y,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,s,r).next(f=>{f.forEach((m,y)=>{a=a.insert(m,y)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r))).next(a=>{i.forEach((l,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Be.newInvalidDocument(f)))});let c=Ds();return a.forEach((l,d)=>{const f=i.get(l);f!==void 0&&qs(f.mutation,d,nt.empty(),le.now()),Li(t,d)&&(c=c.insert(l,d))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return B.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(r){return{id:r.id,version:r.version,createTime:gt(r.createTime)}}(t)),B.resolve()}getNamedQuery(e,t){return B.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(r){return{name:r.name,query:ev(r.bundledQuery),readTime:gt(r.readTime)}}(t)),B.resolve()}}/**
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
 */class hv{constructor(){this.overlays=new de(j.comparator),this.qr=new Map}getOverlay(e,t){return B.resolve(this.overlays.get(t))}getOverlays(e,t){const s=_n();return B.forEach(t,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((r,i)=>{this.St(e,t,i)}),B.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.qr.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.qr.delete(s)),B.resolve()}getOverlaysForCollection(e,t,s){const r=_n(),i=t.length+1,a=new j(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>s&&r.set(l.getKey(),l)}return B.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let i=new de((d,f)=>d-f);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>s){let f=i.get(d.largestBatchId);f===null&&(f=_n(),i=i.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=_n(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=r)););return B.resolve(c)}St(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const a=this.qr.get(r.largestBatchId).delete(s.key);this.qr.set(r.largestBatchId,a)}this.overlays=this.overlays.insert(s.key,new PE(t,s));let i=this.qr.get(t);i===void 0&&(i=Z(),this.qr.set(t,i)),this.qr.set(t,i.add(s.key))}}/**
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
 */class fv{constructor(){this.sessionToken=Le.EMPTY_BYTE_STRING}getSessionToken(e){return B.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,B.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(){this.Qr=new Ae(Re.$r),this.Ur=new Ae(Re.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const s=new Re(e,t);this.Qr=this.Qr.add(s),this.Ur=this.Ur.add(s)}Wr(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.Gr(new Re(e,t))}zr(e,t){e.forEach(s=>this.removeReference(s,t))}jr(e){const t=new j(new ae([])),s=new Re(t,e),r=new Re(t,e+1),i=[];return this.Ur.forEachInRange([s,r],a=>{this.Gr(a),i.push(a.key)}),i}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new j(new ae([])),s=new Re(t,e),r=new Re(t,e+1);let i=Z();return this.Ur.forEachInRange([s,r],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new Re(e,0),s=this.Qr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Re{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return j.comparator(e.key,t.key)||J(e.Yr,t.Yr)}static Kr(e,t){return J(e.Yr,t.Yr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Ae(Re.$r)}checkEmpty(e){return B.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new kE(i,t,s,r);this.mutationQueue.push(a);for(const c of r)this.Zr=this.Zr.add(new Re(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return B.resolve(a)}lookupMutationBatch(e,t){return B.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.ei(s),i=r<0?0:r;return B.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return B.resolve(this.mutationQueue.length===0?Da:this.tr-1)}getAllMutationBatches(e){return B.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Re(t,0),r=new Re(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([s,r],a=>{const c=this.Xr(a.Yr);i.push(c)}),B.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Ae(J);return t.forEach(r=>{const i=new Re(r,0),a=new Re(r,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],c=>{s=s.add(c.Yr)})}),B.resolve(this.ti(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let i=s;j.isDocumentKey(i)||(i=i.child(""));const a=new Re(new j(i),0);let c=new Ae(J);return this.Zr.forEachWhile(l=>{const d=l.key.path;return!!s.isPrefixOf(d)&&(d.length===r&&(c=c.add(l.Yr)),!0)},a),B.resolve(this.ti(c))}ti(e){const t=[];return e.forEach(s=>{const r=this.Xr(s);r!==null&&t.push(r)}),t}removeMutationBatch(e,t){te(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.Zr;return B.forEach(t.mutations,r=>{const i=new Re(r.key,t.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=s})}ir(e){}containsKey(e,t){const s=new Re(t,0),r=this.Zr.firstAfterOrEqual(s);return B.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,B.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(e){this.ri=e,this.docs=function(){return new de(j.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),i=r?r.size:0,a=this.ri(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return B.resolve(s?s.document.mutableCopy():Be.newInvalidDocument(t))}getEntries(e,t){let s=xt();return t.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Be.newInvalidDocument(r))}),B.resolve(s)}getDocumentsMatchingQuery(e,t,s,r){let i=xt();const a=t.path,c=new j(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:d,value:{document:f}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||jw(qw(f),s)<=0||(r.has(f.key)||Li(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return B.resolve(i)}getAllFromCollectionGroup(e,t,s,r){H(9500)}ii(e,t){return B.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new gv(this)}getSize(e){return B.resolve(this.size)}}class gv extends cv{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(s)}),B.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e){this.persistence=e,this.si=new Nn(t=>Oa(t),Ba),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.oi=0,this._i=new ja,this.targetCount=0,this.ai=rs.ur()}forEachTarget(e,t){return this.si.forEach((s,r)=>t(r)),B.resolve()}getLastRemoteSnapshotVersion(e){return B.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return B.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),B.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.oi&&(this.oi=t),B.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new rs(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,B.resolve()}updateTargetData(e,t){return this.Pr(t),B.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,B.resolve()}removeTargets(e,t,s){let r=0;const i=[];return this.si.forEach((a,c)=>{c.sequenceNumber<=t&&s.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),r++)}),B.waitFor(i).next(()=>r)}getTargetCount(e){return B.resolve(this.targetCount)}getTargetData(e,t){const s=this.si.get(t)||null;return B.resolve(s)}addMatchingKeys(e,t,s){return this._i.Wr(t,s),B.resolve()}removeMatchingKeys(e,t,s){this._i.zr(t,s);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach(a=>{i.push(r.markPotentiallyOrphaned(e,a))}),B.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),B.resolve()}getMatchingKeysForTargetId(e,t){const s=this._i.Hr(t);return B.resolve(s)}containsKey(e,t){return B.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ri(0),this.li=!1,this.li=!0,this.hi=new fv,this.referenceDelegate=e(this),this.Pi=new yv(this),this.indexManager=new tv,this.remoteDocumentCache=function(r){return new pv(r)}(s=>this.referenceDelegate.Ti(s)),this.serializer=new ZE(t),this.Ii=new dv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new hv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.ui[e.toKey()];return s||(s=new mv(t,this.referenceDelegate),this.ui[e.toKey()]=s),s}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,s){$("MemoryPersistence","Starting transaction:",e);const r=new _v(this.ci.next());return this.referenceDelegate.Ei(),s(r).next(i=>this.referenceDelegate.di(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Ai(e,t){return B.or(Object.values(this.ui).map(s=>()=>s.containsKey(e,t)))}}class _v extends Ww{constructor(e){super(),this.currentSequenceNumber=e}}class Ha{constructor(e){this.persistence=e,this.Ri=new ja,this.Vi=null}static mi(e){return new Ha(e)}get fi(){if(this.Vi)return this.Vi;throw H(60996)}addReference(e,t,s){return this.Ri.addReference(s,t),this.fi.delete(s.toString()),B.resolve()}removeReference(e,t,s){return this.Ri.removeReference(s,t),this.fi.add(s.toString()),B.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),B.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(r=>this.fi.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(r=>{r.forEach(i=>this.fi.add(i.toString()))}).next(()=>s.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return B.forEach(this.fi,s=>{const r=j.fromPath(s);return this.gi(e,r).next(i=>{i||t.removeEntry(r,G.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(s=>{s?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return B.or([()=>B.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class gi{constructor(e,t){this.persistence=e,this.pi=new Nn(s=>Qw(s.path),(s,r)=>s.isEqual(r)),this.garbageCollector=av(this,t)}static mi(e,t){return new gi(e,t)}Ei(){}di(e){return B.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(s=>t.next(r=>s+r))}wr(e){let t=0;return this.pr(e,s=>{t++}).next(()=>t)}pr(e,t){return B.forEach(this.pi,(s,r)=>this.br(e,s,r).next(i=>i?B.resolve():t(r)))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.ii(e,a=>this.br(e,a,t).next(c=>{c||(s++,i.removeEntry(a,G.min()))})).next(()=>i.apply(e)).next(()=>s)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),B.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),B.resolve()}removeReference(e,t,s){return this.pi.set(s,e.currentSequenceNumber),B.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),B.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=jr(e.data.value)),t}br(e,t,s){return B.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.pi.get(t);return B.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Es=s,this.ds=r}static As(e,t){let s=Z(),r=Z();for(const i of t.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Wa(e,t.fromCache,s,r)}}/**
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
 */class wv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Ev{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return dg()?8:Gw(Fe())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,s,r){const i={result:null};return this.ys(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ws(e,t,r,s).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new wv;return this.Ss(e,t,a).next(c=>{if(i.result=c,this.Vs)return this.bs(e,t,a,c.size)})}).next(()=>i.result)}bs(e,t,s,r){return s.documentReadCount<this.fs?(Un()<=Y.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",zn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),B.resolve()):(Un()<=Y.DEBUG&&$("QueryEngine","Query:",zn(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.gs*r?(Un()<=Y.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",zn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,mt(t))):B.resolve())}ys(e,t){if(wu(t))return B.resolve(null);let s=mt(t);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(t.limit!==null&&r===1&&(t=Ko(t,null,"F"),s=mt(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const a=Z(...i);return this.ps.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,s).next(l=>{const d=this.Ds(t,c);return this.Cs(t,d,a,l.readTime)?this.ys(e,Ko(t,null,"F")):this.vs(e,d,t,l)}))})))}ws(e,t,s,r){return wu(t)||r.isEqual(G.min())?B.resolve(null):this.ps.getDocuments(e,s).next(i=>{const a=this.Ds(t,i);return this.Cs(t,a,s,r)?B.resolve(null):(Un()<=Y.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),zn(t)),this.vs(e,a,t,$w(r,Qs)).next(c=>c))})}Ds(e,t){let s=new Ae(qh(e));return t.forEach((r,i)=>{Li(e,i)&&(s=s.add(i))}),s}Cs(e,t,s,r){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Ss(e,t,s){return Un()<=Y.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",zn(t)),this.ps.getDocumentsMatchingQuery(e,t,tn.min(),s)}vs(e,t,s,r){return this.ps.getDocumentsMatchingQuery(e,s,r).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="LocalStore",vv=3e8;class Iv{constructor(e,t,s,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new de(J),this.xs=new Nn(i=>Oa(i),Ba),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(s)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new uv(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function bv(n,e,t,s){return new Iv(n,e,t,s)}async function mf(n,e){const t=K(n);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(s))).next(i=>{const a=[],c=[];let l=Z();for(const d of r){a.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}for(const d of i){c.push(d.batchId);for(const f of d.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(s,l).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:c}))})})}function Tv(n,e){const t=K(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return function(c,l,d,f){const m=d.batch,y=m.keys();let v=B.resolve();return y.forEach(b=>{v=v.next(()=>f.getEntry(l,b)).next(R=>{const C=d.docVersions.get(b);te(C!==null,48541),R.version.compareTo(C)<0&&(m.applyToRemoteDocument(R,d),R.isValidDocument()&&(R.setReadTime(d.commitVersion),f.addEntry(R)))})}),v.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,s,e,i).next(()=>i.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(c){let l=Z();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(s,r))})}function pf(n){const e=K(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Av(n,e){const t=K(n),s=e.snapshotVersion;let r=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});r=t.Ms;const c=[];e.targetChanges.forEach((f,m)=>{const y=r.get(m);if(!y)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,m).next(()=>t.Pi.addMatchingKeys(i,f.addedDocuments,m)));let v=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?v=v.withResumeToken(Le.EMPTY_BYTE_STRING,G.min()).withLastLimboFreeSnapshotVersion(G.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,s)),r=r.insert(m,v),function(R,C,P){return R.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=vv?!0:P.addedDocuments.size+P.modifiedDocuments.size+P.removedDocuments.size>0}(y,v,f)&&c.push(t.Pi.updateTargetData(i,v))});let l=xt(),d=Z();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),c.push(Cv(i,a,e.documentUpdates).next(f=>{l=f.ks,d=f.qs})),!s.isEqual(G.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next(m=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,s));c.push(f)}return B.waitFor(c).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(t.Ms=r,i))}function Cv(n,e,t){let s=Z(),r=Z();return t.forEach(i=>s=s.add(i)),e.getEntries(n,s).next(i=>{let a=xt();return t.forEach((c,l)=>{const d=i.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(r=r.add(c)),l.isNoDocument()&&l.version.isEqual(G.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):$(Ga,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{ks:a,qs:r}})}function Sv(n,e){const t=K(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=Da),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function Rv(n,e){const t=K(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return t.Pi.getTargetData(s,e).next(i=>i?(r=i,B.resolve(r)):t.Pi.allocateTargetId(s).next(a=>(r=new Gt(e,a,"TargetPurposeListen",s.currentSequenceNumber),t.Pi.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=t.Ms.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(s.targetId,s),t.xs.set(e,s.targetId)),s})}async function Zo(n,e,t){const s=K(n),r=s.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",i,a=>s.persistence.referenceDelegate.removeTarget(a,r))}catch(a){if(!ls(a))throw a;$(Ga,`Failed to update sequence numbers for target ${e}: ${a}`)}s.Ms=s.Ms.remove(e),s.xs.delete(r.target)}function Lu(n,e,t){const s=K(n);let r=G.min(),i=Z();return s.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,f){const m=K(l),y=m.xs.get(f);return y!==void 0?B.resolve(m.Ms.get(y)):m.Pi.getTargetData(d,f)}(s,a,mt(e)).next(c=>{if(c)return r=c.lastLimboFreeSnapshotVersion,s.Pi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{i=l})}).next(()=>s.Fs.getDocumentsMatchingQuery(a,e,t?r:G.min(),t?i:Z())).next(c=>(kv(s,mE(e),c),{documents:c,Qs:i})))}function kv(n,e,t){let s=n.Os.get(e)||G.min();t.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),n.Os.set(e,s)}class Nu{constructor(){this.activeTargetIds=EE()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Pv{constructor(){this.Mo=new Nu,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,s){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Nu,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class xv{Oo(e){}shutdown(){}}/**
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
 */const Du="ConnectivityMonitor";class Mu{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){$(Du,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){$(Du,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Dr=null;function ea(){return Dr===null?Dr=function(){return 268435456+Math.round(2147483648*Math.random())}():Dr++,"0x"+Dr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Io="RestConnection",Lv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Nv{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${s}/databases/${r}`,this.Wo=this.databaseId.database===li?`project_id=${s}`:`project_id=${s}&database_id=${r}`}Go(e,t,s,r,i){const a=ea(),c=this.zo(e,t.toUriEncodedString());$(Io,`Sending RPC '${e}' ${a}:`,c,s);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,r,i);const{host:d}=new URL(c),f=ln(d);return this.Jo(e,c,l,s,f).then(m=>($(Io,`Received RPC '${e}' ${a}: `,m),m),m=>{throw es(Io,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",s),m})}Ho(e,t,s,r,i,a){return this.Go(e,t,s,r,i)}jo(e,t,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+as}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}zo(e,t){const s=Lv[e];return`${this.Uo}/v1/${t}:${s}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me="WebChannelConnection";class Mv extends Nv{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,s,r,i){const a=ea();return new Promise((c,l)=>{const d=new gh;d.setWithCredentials(!0),d.listenOnce(yh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case qr.NO_ERROR:const m=d.getResponseJson();$(Me,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case qr.TIMEOUT:$(Me,`RPC '${e}' ${a} timed out`),l(new z(D.DEADLINE_EXCEEDED,"Request time out"));break;case qr.HTTP_ERROR:const y=d.getStatus();if($(Me,`RPC '${e}' ${a} failed with status:`,y,"response text:",d.getResponseText()),y>0){let v=d.getResponseJson();Array.isArray(v)&&(v=v[0]);const b=v==null?void 0:v.error;if(b&&b.status&&b.message){const R=function(P){const N=P.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(N)>=0?N:D.UNKNOWN}(b.status);l(new z(R,b.message))}else l(new z(D.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new z(D.UNAVAILABLE,"Connection failed."));break;default:H(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{$(Me,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(r);$(Me,`RPC '${e}' ${a} sending request:`,r),d.send(t,"POST",f,s,15)})}T_(e,t,s){const r=ea(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Eh(),c=wh(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,s),l.encodeInitMessageHeaders=!0;const f=i.join("");$(Me,`Creating RPC '${e}' stream ${r}: ${f}`,l);const m=a.createWebChannel(f,l);this.I_(m);let y=!1,v=!1;const b=new Dv({Yo:C=>{v?$(Me,`Not sending because RPC '${e}' stream ${r} is closed:`,C):(y||($(Me,`Opening RPC '${e}' stream ${r} transport.`),m.open(),y=!0),$(Me,`RPC '${e}' stream ${r} sending:`,C),m.send(C))},Zo:()=>m.close()}),R=(C,P,N)=>{C.listen(P,V=>{try{N(V)}catch(M){setTimeout(()=>{throw M},0)}})};return R(m,Ns.EventType.OPEN,()=>{v||($(Me,`RPC '${e}' stream ${r} transport opened.`),b.o_())}),R(m,Ns.EventType.CLOSE,()=>{v||(v=!0,$(Me,`RPC '${e}' stream ${r} transport closed`),b.a_(),this.E_(m))}),R(m,Ns.EventType.ERROR,C=>{v||(v=!0,es(Me,`RPC '${e}' stream ${r} transport errored. Name:`,C.name,"Message:",C.message),b.a_(new z(D.UNAVAILABLE,"The operation could not be completed")))}),R(m,Ns.EventType.MESSAGE,C=>{var P;if(!v){const N=C.data[0];te(!!N,16349);const V=N,M=(V==null?void 0:V.error)||((P=V[0])==null?void 0:P.error);if(M){$(Me,`RPC '${e}' stream ${r} received error:`,M);const O=M.status;let F=function(w){const A=we[w];if(A!==void 0)return tf(A)}(O),E=M.message;F===void 0&&(F=D.INTERNAL,E="Unknown error status: "+O+" with message "+M.message),v=!0,b.a_(new z(F,E)),m.close()}else $(Me,`RPC '${e}' stream ${r} received:`,N),b.u_(N)}}),R(c,_h.STAT_EVENT,C=>{C.stat===zo.PROXY?$(Me,`RPC '${e}' stream ${r} detected buffering proxy`):C.stat===zo.NOPROXY&&$(Me,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{b.__()},0),b}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function bo(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(n){return new FE(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gf{constructor(e,t,s=1e3,r=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=s,this.A_=r,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),s=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-s);r>0&&$("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu="PersistentStream";class yf{constructor(e,t,s,r,i,a,c,l){this.Mi=e,this.S_=s,this.b_=r,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new gf(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(Pt(t.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.D_===t&&this.G_(s,r)},s=>{e(()=>{const r=new z(D.UNKNOWN,"Fetching auth token failed: "+s.message);return this.z_(r)})})}G_(e,t){const s=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{s(()=>this.listener.Xo())}),this.stream.t_(()=>{s(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(r=>{s(()=>this.z_(r))}),this.stream.onMessage(r=>{s(()=>++this.F_==1?this.J_(r):this.onNext(r))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return $(Vu,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():($(Vu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Vv extends yf{constructor(e,t,s,r,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=$E(this.serializer,e),s=function(i){if(!("targetChange"in i))return G.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?G.min():a.readTime?gt(a.readTime):G.min()}(e);return this.listener.H_(t,s)}Y_(e){const t={};t.database=Jo(this.serializer),t.addTarget=function(i,a){let c;const l=a.target;if(c=Wo(l)?{documents:HE(i,l)}:{query:WE(i,l).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=rf(i,a.resumeToken);const d=Qo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(G.min())>0){c.readTime=pi(i,a.snapshotVersion.toTimestamp());const d=Qo(i,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);const s=KE(this.serializer,e);s&&(t.labels=s),this.q_(t)}Z_(e){const t={};t.database=Jo(this.serializer),t.removeTarget=e,this.q_(t)}}class Ov extends yf{constructor(e,t,s,r,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=jE(e.writeResults,e.commitTime),s=gt(e.commitTime);return this.listener.na(s,t)}ra(){const e={};e.database=Jo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>qE(this.serializer,s))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{}class Fv extends Bv{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new z(D.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Go(e,Xo(t,s),r,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new z(D.UNKNOWN,i.toString())})}Ho(e,t,s,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Ho(e,Xo(t,s),r,a,c,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(D.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class Uv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Pt(t),this.aa=!1):$("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn="RemoteStore";class zv{constructor(e,t,s,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo(a=>{s.enqueueAndForget(async()=>{Mn(this)&&($(kn,"Restarting streams for network reachability change."),await async function(l){const d=K(l);d.Ea.add(4),await hr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await Oi(d)}(this))})}),this.Ra=new Uv(s,r)}}async function Oi(n){if(Mn(n))for(const e of n.da)await e(!0)}async function hr(n){for(const e of n.da)await e(!1)}function _f(n,e){const t=K(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Ya(t)?Xa(t):us(t).O_()&&Qa(t,e))}function Ka(n,e){const t=K(n),s=us(t);t.Ia.delete(e),s.O_()&&wf(t,e),t.Ia.size===0&&(s.O_()?s.L_():Mn(t)&&t.Ra.set("Unknown"))}function Qa(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(G.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}us(n).Y_(e)}function wf(n,e){n.Va.Ue(e),us(n).Z_(e)}function Xa(n){n.Va=new ME({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),us(n).start(),n.Ra.ua()}function Ya(n){return Mn(n)&&!us(n).x_()&&n.Ia.size>0}function Mn(n){return K(n).Ea.size===0}function Ef(n){n.Va=void 0}async function $v(n){n.Ra.set("Online")}async function qv(n){n.Ia.forEach((e,t)=>{Qa(n,e)})}async function jv(n,e){Ef(n),Ya(n)?(n.Ra.ha(e),Xa(n)):n.Ra.set("Unknown")}async function Hv(n,e,t){if(n.Ra.set("Online"),e instanceof sf&&e.state===2&&e.cause)try{await async function(r,i){const a=i.cause;for(const c of i.targetIds)r.Ia.has(c)&&(await r.remoteSyncer.rejectListen(c,a),r.Ia.delete(c),r.Va.removeTarget(c))}(n,e)}catch(s){$(kn,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await yi(n,s)}else if(e instanceof Gr?n.Va.Ze(e):e instanceof nf?n.Va.st(e):n.Va.tt(e),!t.isEqual(G.min()))try{const s=await pf(n.localStore);t.compareTo(s)>=0&&await function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(d);f&&i.Ia.set(d,f.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(Le.EMPTY_BYTE_STRING,f.snapshotVersion)),wf(i,l);const m=new Gt(f.target,l,d,f.sequenceNumber);Qa(i,m)}),i.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(s){$(kn,"Failed to raise snapshot:",s),await yi(n,s)}}async function yi(n,e,t){if(!ls(e))throw e;n.Ea.add(1),await hr(n),n.Ra.set("Offline"),t||(t=()=>pf(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(kn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Oi(n)})}function vf(n,e){return e().catch(t=>yi(n,t,e))}async function Bi(n){const e=K(n),t=on(e);let s=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Da;for(;Wv(e);)try{const r=await Sv(e.localStore,s);if(r===null){e.Ta.length===0&&t.L_();break}s=r.batchId,Gv(e,r)}catch(r){await yi(e,r)}If(e)&&bf(e)}function Wv(n){return Mn(n)&&n.Ta.length<10}function Gv(n,e){n.Ta.push(e);const t=on(n);t.O_()&&t.X_&&t.ea(e.mutations)}function If(n){return Mn(n)&&!on(n).x_()&&n.Ta.length>0}function bf(n){on(n).start()}async function Kv(n){on(n).ra()}async function Qv(n){const e=on(n);for(const t of n.Ta)e.ea(t.mutations)}async function Xv(n,e,t){const s=n.Ta.shift(),r=za.from(s,e,t);await vf(n,()=>n.remoteSyncer.applySuccessfulWrite(r)),await Bi(n)}async function Yv(n,e){e&&on(n).X_&&await async function(s,r){if(function(a){return LE(a)&&a!==D.ABORTED}(r.code)){const i=s.Ta.shift();on(s).B_(),await vf(s,()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Bi(s)}}(n,e),If(n)&&bf(n)}async function Ou(n,e){const t=K(n);t.asyncQueue.verifyOperationInProgress(),$(kn,"RemoteStore received new credentials");const s=Mn(t);t.Ea.add(3),await hr(t),s&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Oi(t)}async function Jv(n,e){const t=K(n);e?(t.Ea.delete(2),await Oi(t)):e||(t.Ea.add(2),await hr(t),t.Ra.set("Unknown"))}function us(n){return n.ma||(n.ma=function(t,s,r){const i=K(t);return i.sa(),new Vv(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:$v.bind(null,n),t_:qv.bind(null,n),r_:jv.bind(null,n),H_:Hv.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),Ya(n)?Xa(n):n.Ra.set("Unknown")):(await n.ma.stop(),Ef(n))})),n.ma}function on(n){return n.fa||(n.fa=function(t,s,r){const i=K(t);return i.sa(),new Ov(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:Kv.bind(null,n),r_:Yv.bind(null,n),ta:Qv.bind(null,n),na:Xv.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await Bi(n)):(await n.fa.stop(),n.Ta.length>0&&($(kn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja{constructor(e,t,s,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new St,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,i){const a=Date.now()+s,c=new Ja(e,t,a,r,i);return c.start(s),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Za(n,e){if(Pt("AsyncQueue",`${e}: ${n}`),ls(n))return new z(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{static emptySet(e){return new Qn(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||j.comparator(t.key,s.key):(t,s)=>j.comparator(t.key,s.key),this.keyedMap=Ds(),this.sortedSet=new de(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new Qn;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(){this.ga=new de(j.comparator)}track(e){const t=e.doc.key,s=this.ga.get(t);s?e.type!==0&&s.type===3?this.ga=this.ga.insert(t,e):e.type===3&&s.type!==1?this.ga=this.ga.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.ga=this.ga.remove(t):e.type===1&&s.type===2?this.ga=this.ga.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):H(63341,{Rt:e,pa:s}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,s)=>{e.push(s)}),e}}class is{constructor(e,t,s,r,i,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,s,r,i){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new is(e,t,Qn.emptySet(t),a,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&xi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class eI{constructor(){this.queries=Fu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,s){const r=K(t),i=r.queries;r.queries=Fu(),i.forEach((a,c)=>{for(const l of c.Sa)l.onError(s)})})(this,new z(D.ABORTED,"Firestore shutting down"))}}function Fu(){return new Nn(n=>$h(n),xi)}async function Tf(n,e){const t=K(n);let s=3;const r=e.query;let i=t.queries.get(r);i?!i.ba()&&e.Da()&&(s=2):(i=new Zv,s=e.Da()?0:1);try{switch(s){case 0:i.wa=await t.onListen(r,!0);break;case 1:i.wa=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(a){const c=Za(a,`Initialization of query '${zn(e.query)}' failed`);return void e.onError(c)}t.queries.set(r,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&ec(t)}async function Af(n,e){const t=K(n),s=e.query;let r=3;const i=t.queries.get(s);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?r=e.Da()?0:1:!i.ba()&&e.Da()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function tI(n,e){const t=K(n);let s=!1;for(const r of e){const i=r.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(r)&&(s=!0);a.wa=r}}s&&ec(t)}function nI(n,e,t){const s=K(n),r=s.queries.get(e);if(r)for(const i of r.Sa)i.onError(t);s.queries.delete(e)}function ec(n){n.Ca.forEach(e=>{e.next()})}var ta,Uu;(Uu=ta||(ta={})).Ma="default",Uu.Cache="cache";class Cf{constructor(e,t,s){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=s||{}}Fa(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new is(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const s=t!=="Offline";return(!this.options.qa||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=is.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ta.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e){this.key=e}}class Rf{constructor(e){this.key=e}}class sI{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Z(),this.mutatedKeys=Z(),this.eu=qh(e),this.tu=new Qn(this.eu)}get nu(){return this.Ya}ru(e,t){const s=t?t.iu:new Bu,r=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=r,c=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,d=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((f,m)=>{const y=r.get(f),v=Li(this.query,m)?m:null,b=!!y&&this.mutatedKeys.has(y.key),R=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let C=!1;y&&v?y.data.isEqual(v.data)?b!==R&&(s.track({type:3,doc:v}),C=!0):this.su(y,v)||(s.track({type:2,doc:v}),C=!0,(l&&this.eu(v,l)>0||d&&this.eu(v,d)<0)&&(c=!0)):!y&&v?(s.track({type:0,doc:v}),C=!0):y&&!v&&(s.track({type:1,doc:y}),C=!0,(l||d)&&(c=!0)),C&&(v?(a=a.add(v),i=R?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),s.track({type:1,doc:f})}return{tu:a,iu:s,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((f,m)=>function(v,b){const R=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H(20277,{Rt:C})}};return R(v)-R(b)}(f.type,m.type)||this.eu(f.doc,m.doc)),this.ou(s),r=r??!1;const c=t&&!r?this._u():[],l=this.Xa.size===0&&this.current&&!r?1:0,d=l!==this.Za;return this.Za=l,a.length!==0||d?{snapshot:new is(this.query,e.tu,i,a,e.mutatedKeys,l===0,d,!1,!!s&&s.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Bu,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Z(),this.tu.forEach(s=>{this.uu(s.key)&&(this.Xa=this.Xa.add(s.key))});const t=[];return e.forEach(s=>{this.Xa.has(s)||t.push(new Rf(s))}),this.Xa.forEach(s=>{e.has(s)||t.push(new Sf(s))}),t}cu(e){this.Ya=e.Qs,this.Xa=Z();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return is.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const tc="SyncEngine";class rI{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class iI{constructor(e){this.key=e,this.hu=!1}}class oI{constructor(e,t,s,r,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Nn(c=>$h(c),xi),this.Iu=new Map,this.Eu=new Set,this.du=new de(j.comparator),this.Au=new Map,this.Ru=new ja,this.Vu={},this.mu=new Map,this.fu=rs.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function aI(n,e,t=!0){const s=Df(n);let r;const i=s.Tu.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lu()):r=await kf(s,e,t,!0),r}async function cI(n,e){const t=Df(n);await kf(t,e,!0,!1)}async function kf(n,e,t,s){const r=await Rv(n.localStore,mt(e)),i=r.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let c;return s&&(c=await lI(n,e,i,a==="current",r.resumeToken)),n.isPrimaryClient&&t&&_f(n.remoteStore,r),c}async function lI(n,e,t,s,r){n.pu=(m,y,v)=>async function(R,C,P,N){let V=C.view.ru(P);V.Cs&&(V=await Lu(R.localStore,C.query,!1).then(({documents:E})=>C.view.ru(E,V)));const M=N&&N.targetChanges.get(C.targetId),O=N&&N.targetMismatches.get(C.targetId)!=null,F=C.view.applyChanges(V,R.isPrimaryClient,M,O);return $u(R,C.targetId,F.au),F.snapshot}(n,m,y,v);const i=await Lu(n.localStore,e,!0),a=new sI(e,i.Qs),c=a.ru(i.documents),l=dr.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),d=a.applyChanges(c,n.isPrimaryClient,l);$u(n,t,d.au);const f=new rI(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function uI(n,e,t){const s=K(n),r=s.Tu.get(e),i=s.Iu.get(r.targetId);if(i.length>1)return s.Iu.set(r.targetId,i.filter(a=>!xi(a,e))),void s.Tu.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Zo(s.localStore,r.targetId,!1).then(()=>{s.sharedClientState.clearQueryState(r.targetId),t&&Ka(s.remoteStore,r.targetId),na(s,r.targetId)}).catch(cs)):(na(s,r.targetId),await Zo(s.localStore,r.targetId,!0))}async function dI(n,e){const t=K(n),s=t.Tu.get(e),r=t.Iu.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Ka(t.remoteStore,s.targetId))}async function hI(n,e,t){const s=wI(n);try{const r=await function(a,c){const l=K(a),d=le.now(),f=c.reduce((v,b)=>v.add(b.key),Z());let m,y;return l.persistence.runTransaction("Locally write mutations","readwrite",v=>{let b=xt(),R=Z();return l.Ns.getEntries(v,f).next(C=>{b=C,b.forEach((P,N)=>{N.isValidDocument()||(R=R.add(P))})}).next(()=>l.localDocuments.getOverlayedDocuments(v,b)).next(C=>{m=C;const P=[];for(const N of c){const V=SE(N,m.get(N.key).overlayedDocument);V!=null&&P.push(new Dn(N.key,V,Dh(V.value.mapValue),pt.exists(!0)))}return l.mutationQueue.addMutationBatch(v,d,P,c)}).next(C=>{y=C;const P=C.applyToLocalDocumentSet(m,R);return l.documentOverlayCache.saveOverlays(v,C.batchId,P)})}).then(()=>({batchId:y.batchId,changes:Hh(m)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(a,c,l){let d=a.Vu[a.currentUser.toKey()];d||(d=new de(J)),d=d.insert(c,l),a.Vu[a.currentUser.toKey()]=d}(s,r.batchId,t),await fr(s,r.changes),await Bi(s.remoteStore)}catch(r){const i=Za(r,"Failed to persist write");t.reject(i)}}async function Pf(n,e){const t=K(n);try{const s=await Av(t.localStore,e);e.targetChanges.forEach((r,i)=>{const a=t.Au.get(i);a&&(te(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?a.hu=!0:r.modifiedDocuments.size>0?te(a.hu,14607):r.removedDocuments.size>0&&(te(a.hu,42227),a.hu=!1))}),await fr(t,s,e)}catch(s){await cs(s)}}function zu(n,e,t){const s=K(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Tu.forEach((i,a)=>{const c=a.view.va(e);c.snapshot&&r.push(c.snapshot)}),function(a,c){const l=K(a);l.onlineState=c;let d=!1;l.queries.forEach((f,m)=>{for(const y of m.Sa)y.va(c)&&(d=!0)}),d&&ec(l)}(s.eventManager,e),r.length&&s.Pu.H_(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function fI(n,e,t){const s=K(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Au.get(e),i=r&&r.key;if(i){let a=new de(j.comparator);a=a.insert(i,Be.newNoDocument(i,G.min()));const c=Z().add(i),l=new Mi(G.min(),new Map,new de(J),a,c);await Pf(s,l),s.du=s.du.remove(i),s.Au.delete(e),nc(s)}else await Zo(s.localStore,e,!1).then(()=>na(s,e,t)).catch(cs)}async function mI(n,e){const t=K(n),s=e.batch.batchId;try{const r=await Tv(t.localStore,e);Lf(t,s,null),xf(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await fr(t,r)}catch(r){await cs(r)}}async function pI(n,e,t){const s=K(n);try{const r=await function(a,c){const l=K(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return l.mutationQueue.lookupMutationBatch(d,c).next(m=>(te(m!==null,37113),f=m.keys(),l.mutationQueue.removeMutationBatch(d,m))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>l.localDocuments.getDocuments(d,f))})}(s.localStore,e);Lf(s,e,t),xf(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await fr(s,r)}catch(r){await cs(r)}}function xf(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Lf(n,e,t){const s=K(n);let r=s.Vu[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),s.Vu[s.currentUser.toKey()]=r}}function na(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Iu.get(e))n.Tu.delete(s),t&&n.Pu.yu(s,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(s=>{n.Ru.containsKey(s)||Nf(n,s)})}function Nf(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Ka(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),nc(n))}function $u(n,e,t){for(const s of t)s instanceof Sf?(n.Ru.addReference(s.key,e),gI(n,s)):s instanceof Rf?($(tc,"Document no longer in limbo: "+s.key),n.Ru.removeReference(s.key,e),n.Ru.containsKey(s.key)||Nf(n,s.key)):H(19791,{wu:s})}function gI(n,e){const t=e.key,s=t.path.canonicalString();n.du.get(t)||n.Eu.has(s)||($(tc,"New document in limbo: "+t),n.Eu.add(s),nc(n))}function nc(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new j(ae.fromString(e)),s=n.fu.next();n.Au.set(s,new iI(t)),n.du=n.du.insert(t,s),_f(n.remoteStore,new Gt(mt(Fa(t.path)),s,"TargetPurposeLimboResolution",Ri.ce))}}async function fr(n,e,t){const s=K(n),r=[],i=[],a=[];s.Tu.isEmpty()||(s.Tu.forEach((c,l)=>{a.push(s.pu(l,e,t).then(d=>{var f;if((d||t)&&s.isPrimaryClient){const m=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:f.current;s.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){r.push(d);const m=Wa.As(l.targetId,d);i.push(m)}}))}),await Promise.all(a),s.Pu.H_(r),await async function(l,d){const f=K(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>B.forEach(d,y=>B.forEach(y.Es,v=>f.persistence.referenceDelegate.addReference(m,y.targetId,v)).next(()=>B.forEach(y.ds,v=>f.persistence.referenceDelegate.removeReference(m,y.targetId,v)))))}catch(m){if(!ls(m))throw m;$(Ga,"Failed to update sequence numbers: "+m)}for(const m of d){const y=m.targetId;if(!m.fromCache){const v=f.Ms.get(y),b=v.snapshotVersion,R=v.withLastLimboFreeSnapshotVersion(b);f.Ms=f.Ms.insert(y,R)}}}(s.localStore,i))}async function yI(n,e){const t=K(n);if(!t.currentUser.isEqual(e)){$(tc,"User change. New user:",e.toKey());const s=await mf(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(c=>{c.forEach(l=>{l.reject(new z(D.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await fr(t,s.Ls)}}function _I(n,e){const t=K(n),s=t.Au.get(e);if(s&&s.hu)return Z().add(s.key);{let r=Z();const i=t.Iu.get(e);if(!i)return r;for(const a of i){const c=t.Tu.get(a);r=r.unionWith(c.view.nu)}return r}}function Df(n){const e=K(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Pf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=_I.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=fI.bind(null,e),e.Pu.H_=tI.bind(null,e.eventManager),e.Pu.yu=nI.bind(null,e.eventManager),e}function wI(n){const e=K(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pI.bind(null,e),e}class _i{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Vi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return bv(this.persistence,new Ev,e.initialUser,this.serializer)}Cu(e){return new ff(Ha.mi,this.serializer)}Du(e){return new Pv}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}_i.provider={build:()=>new _i};class EI extends _i{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){te(this.persistence.referenceDelegate instanceof gi,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new iv(s,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new ff(s=>gi.mi(s,t),this.serializer)}}class sa{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>zu(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=yI.bind(null,this.syncEngine),await Jv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new eI}()}createDatastore(e){const t=Vi(e.databaseInfo.databaseId),s=function(i){return new Mv(i)}(e.databaseInfo);return function(i,a,c,l){return new Fv(i,a,c,l)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,r,i,a,c){return new zv(s,r,i,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>zu(this.syncEngine,t,0),function(){return Mu.v()?new Mu:new xv}())}createSyncEngine(e,t){return function(r,i,a,c,l,d,f){const m=new oI(r,i,a,c,l,d);return f&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(r){const i=K(r);$(kn,"RemoteStore shutting down."),i.Ea.add(5),await hr(i),i.Aa.shutdown(),i.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}sa.provider={build:()=>new sa};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Mf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Pt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const an="FirestoreClient";class vI{constructor(e,t,s,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=r,this.user=Ve.UNAUTHENTICATED,this.clientId=Na.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,async a=>{$(an,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(s,a=>($(an,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new St;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Za(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function To(n,e){n.asyncQueue.verifyOperationInProgress(),$(an,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(async r=>{s.isEqual(r)||(await mf(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function qu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await II(n);$(an,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(s=>Ou(e.remoteStore,s)),n.setAppCheckTokenChangeListener((s,r)=>Ou(e.remoteStore,r)),n._onlineComponents=e}async function II(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(an,"Using user provided OfflineComponentProvider");try{await To(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(r){return r.name==="FirebaseError"?r.code===D.FAILED_PRECONDITION||r.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11}(t))throw t;es("Error using user provided cache. Falling back to memory cache: "+t),await To(n,new _i)}}else $(an,"Using default OfflineComponentProvider"),await To(n,new EI(void 0));return n._offlineComponents}async function Vf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(an,"Using user provided OnlineComponentProvider"),await qu(n,n._uninitializedComponentsProvider._online)):($(an,"Using default OnlineComponentProvider"),await qu(n,new sa))),n._onlineComponents}function bI(n){return Vf(n).then(e=>e.syncEngine)}async function Of(n){const e=await Vf(n),t=e.eventManager;return t.onListen=aI.bind(null,e.syncEngine),t.onUnlisten=uI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=cI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=dI.bind(null,e.syncEngine),t}function TI(n,e,t={}){const s=new St;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,d){const f=new Mf({next:y=>{f.Nu(),a.enqueueAndForget(()=>Af(i,m));const v=y.docs.has(c);!v&&y.fromCache?d.reject(new z(D.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&y.fromCache&&l&&l.source==="server"?d.reject(new z(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(y)},error:y=>d.reject(y)}),m=new Cf(Fa(c.path),f,{includeMetadataChanges:!0,qa:!0});return Tf(i,m)}(await Of(n),n.asyncQueue,e,t,s)),s.promise}function AI(n,e,t={}){const s=new St;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,c,l,d){const f=new Mf({next:y=>{f.Nu(),a.enqueueAndForget(()=>Af(i,m)),y.fromCache&&l.source==="server"?d.reject(new z(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(y)},error:y=>d.reject(y)}),m=new Cf(c,f,{includeMetadataChanges:!0,qa:!0});return Tf(i,m)}(await Of(n),n.asyncQueue,e,t,s)),s.promise}/**
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
 */function Bf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="firestore.googleapis.com",Hu=!0;class Wu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new z(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ff,this.ssl=Hu}else this.host=e.host,this.ssl=e.ssl??Hu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=hf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<sv)throw new z(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Bf(e.experimentalLongPollingOptions??{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new z(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new z(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new z(D.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,r){return s.timeoutSeconds===r.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Fi{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new xw;switch(s.type){case"firstParty":return new Mw(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new z(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=ju.get(t);s&&($("ComponentProvider","Removing Datastore"),ju.delete(t),s.terminate())}(this),Promise.resolve()}}function CI(n,e,t,s={}){var d;n=en(n,Fi);const r=ln(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;r&&(ga(`https://${c}`),ya("Firestore",!0)),i.host!==Ff&&i.host!==c&&es("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:c,ssl:r,emulatorOptions:s};if(!An(l,a)&&(n._setSettings(l),s.mockUserToken)){let f,m;if(typeof s.mockUserToken=="string")f=s.mockUserToken,m=Ve.MOCK_USER;else{f=Ld(s.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const y=s.mockUserToken.sub||s.mockUserToken.user_id;if(!y)throw new z(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new Ve(y)}n._authCredentials=new Lw(new Ih(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new ds(this.firestore,e,this._query)}}class be{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}toJSON(){return{type:be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(cr(t,be._jsonSchema))return new be(e,s||null,new j(ae.fromString(t.referencePath)))}}be._jsonSchemaVersion="firestore/documentReference/1.0",be._jsonSchema={type:Ie("string",be._jsonSchemaVersion),referencePath:Ie("string")};class Jt extends ds{constructor(e,t,s){super(e,t,Fa(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new j(e))}withConverter(e){return new Jt(this.firestore,e,this._path)}}function tr(n,e,...t){if(n=Ce(n),bh("collection","path",e),n instanceof Fi){const s=ae.fromString(e,...t);return iu(s),new Jt(n,null,s)}{if(!(n instanceof be||n instanceof Jt))throw new z(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ae.fromString(e,...t));return iu(s),new Jt(n.firestore,null,s)}}function Ui(n,e,...t){if(n=Ce(n),arguments.length===1&&(e=Na.newId()),bh("doc","path",e),n instanceof Fi){const s=ae.fromString(e,...t);return ru(s),new be(n,null,new j(s))}{if(!(n instanceof be||n instanceof Jt))throw new z(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(ae.fromString(e,...t));return ru(s),new be(n.firestore,n instanceof Jt?n.converter:null,new j(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gu="AsyncQueue";class Ku{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new gf(this,"async_queue_retry"),this._c=()=>{const s=bo();s&&$(Gu,"Visibility state changed to "+s.visibilityState),this.M_.w_()},this.ac=e;const t=bo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=bo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new St;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ls(e))throw e;$(Gu,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(s=>{throw this.nc=s,this.rc=!1,Pt("INTERNAL UNHANDLED ERROR: ",Qu(s)),s}).then(s=>(this.rc=!1,s))));return this.ac=t,t}enqueueAfterDelay(e,t,s){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=Ja.createAndSchedule(this,e,t,s,i=>this.hc(i));return this.tc.push(r),r}uc(){this.nc&&H(47125,{Pc:Qu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Qu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class mr extends Fi{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new Ku,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ku(e),this._firestoreClient=void 0,await e}}}function SI(n,e){const t=typeof n=="object"?n:Ea(),s=typeof n=="string"?n:li,r=bi(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=kd("firestore");i&&CI(r,...i)}return r}function sc(n){if(n._terminated)throw new z(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||RI(n),n._firestoreClient}function RI(n){var s,r,i;const e=n._freezeSettings(),t=function(c,l,d,f){return new Jw(c,l,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Bf(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(r=e.localCache)!=null&&r._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new vI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(c){const l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ze(Le.fromBase64String(e))}catch(t){throw new z(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ze(Le.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(cr(e,Ze._jsonSchema))return Ze.fromBase64String(e.bytes)}}Ze._jsonSchemaVersion="firestore/bytes/1.0",Ze._jsonSchema={type:Ie("string",Ze._jsonSchemaVersion),bytes:Ie("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new z(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new z(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new z(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:yt._jsonSchemaVersion}}static fromJSON(e){if(cr(e,yt._jsonSchema))return new yt(e.latitude,e.longitude)}}yt._jsonSchemaVersion="firestore/geoPoint/1.0",yt._jsonSchema={type:Ie("string",yt._jsonSchemaVersion),latitude:Ie("number"),longitude:Ie("number")};/**
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
 */class _t{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:_t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(cr(e,_t._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new _t(e.vectorValues);throw new z(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}_t._jsonSchemaVersion="firestore/vectorValue/1.0",_t._jsonSchema={type:Ie("string",_t._jsonSchemaVersion),vectorValues:Ie("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI=/^__.*__$/;class PI{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Dn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ur(e,this.data,t,this.fieldTransforms)}}function zf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H(40011,{Ac:n})}}class ic{constructor(e,t,s,r,i,a){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ic({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.Vc({path:t,fc:!1});return s.gc(e),s}yc(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.Vc({path:t,fc:!1});return s.Rc(),s}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return wi(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(zf(this.Ac)&&kI.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class xI{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||Vi(e)}Cc(e,t,s,r=!1){return new ic({Ac:e,methodName:t,Dc:s,path:xe.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function oc(n){const e=n._freezeSettings(),t=Vi(n._databaseId);return new xI(n._databaseId,!!e.ignoreUndefinedProperties,t)}function $f(n,e,t,s,r,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,r);Hf("Data must be an object, but it was:",a,s);const c=qf(s,a);let l,d;if(i.merge)l=new nt(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const y=NI(e,m,t);if(!a.contains(y))throw new z(D.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);MI(f,y)||f.push(y)}l=new nt(f),d=a.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,d=a.fieldTransforms;return new PI(new Je(c),l,d)}function LI(n,e,t,s=!1){return ac(t,n.Cc(s?4:3,e))}function ac(n,e){if(jf(n=Ce(n)))return Hf("Unsupported field value:",e,n),qf(n,e);if(n instanceof Uf)return function(s,r){if(!zf(r.Ac))throw r.Sc(`${s._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Sc(`${s._methodName}() is not currently supported inside arrays`);const i=s._toFieldTransform(r);i&&r.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(s,r){const i=[];let a=0;for(const c of s){let l=ac(c,r.wc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(n,e)}return function(s,r){if((s=Ce(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return vE(r.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const i=le.fromDate(s);return{timestampValue:pi(r.serializer,i)}}if(s instanceof le){const i=new le(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:pi(r.serializer,i)}}if(s instanceof yt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Ze)return{bytesValue:rf(r.serializer,s._byteString)};if(s instanceof be){const i=r.databaseId,a=s.firestore._databaseId;if(!a.isEqual(i))throw r.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:qa(s.firestore._databaseId||r.databaseId,s._key.path)}}if(s instanceof _t)return function(a,c){return{mapValue:{fields:{[Lh]:{stringValue:Nh},[ui]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.Sc("VectorValues must only contain numeric values.");return Ua(c.serializer,d)})}}}}}}(s,r);throw r.Sc(`Unsupported field value: ${Si(s)}`)}(n,e)}function qf(n,e){const t={};return Ch(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ln(n,(s,r)=>{const i=ac(r,e.mc(s));i!=null&&(t[s]=i)}),{mapValue:{fields:t}}}function jf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof le||n instanceof yt||n instanceof Ze||n instanceof be||n instanceof Uf||n instanceof _t)}function Hf(n,e,t){if(!jf(t)||!Th(t)){const s=Si(t);throw s==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+s)}}function NI(n,e,t){if((e=Ce(e))instanceof rc)return e._internalPath;if(typeof e=="string")return Wf(n,e);throw wi("Field path arguments must be of type string or ",n,!1,void 0,t)}const DI=new RegExp("[~\\*/\\[\\]]");function Wf(n,e,t){if(e.search(DI)>=0)throw wi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new rc(...e.split("."))._internalPath}catch{throw wi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function wi(n,e,t,s,r){const i=s&&!s.isEmpty(),a=r!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${s}`),a&&(l+=` in document ${r}`),l+=")"),new z(D.INVALID_ARGUMENT,c+n+l)}function MI(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e,t,s,r,i){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new VI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(cc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class VI extends Gf{data(){return super.data()}}function cc(n,e){return typeof e=="string"?Wf(n,e):e instanceof rc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new z(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lc{}class BI extends lc{}function uc(n,e,...t){let s=[];e instanceof lc&&s.push(e),s=s.concat(t),function(i){const a=i.filter(l=>l instanceof dc).length,c=i.filter(l=>l instanceof zi).length;if(a>1||a>0&&c>0)throw new z(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(s);for(const r of s)n=r._apply(n);return n}class zi extends BI{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new zi(e,t,s)}_apply(e){const t=this._parse(e);return Kf(e._query,t),new ds(e.firestore,e.converter,Go(e._query,t))}_parse(e){const t=oc(e.firestore);return function(i,a,c,l,d,f,m){let y;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new z(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Yu(m,f);const b=[];for(const R of m)b.push(Xu(l,i,R));y={arrayValue:{values:b}}}else y=Xu(l,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Yu(m,f),y=LI(c,a,m,f==="in"||f==="not-in");return ve.create(d,f,y)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ei(n,e,t){const s=e,r=cc("where",n);return zi._create(r,s,t)}class dc extends lc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new dc(e,t)}_parse(e){const t=this._queryConstraints.map(s=>s._parse(e)).filter(s=>s.getFilters().length>0);return t.length===1?t[0]:rt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(r,i){let a=r;const c=i.getFlattenedFilters();for(const l of c)Kf(a,l),a=Go(a,l)}(e._query,t),new ds(e.firestore,e.converter,Go(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Xu(n,e,t){if(typeof(t=Ce(t))=="string"){if(t==="")throw new z(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!zh(e)&&t.indexOf("/")!==-1)throw new z(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(ae.fromString(t));if(!j.isDocumentKey(s))throw new z(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return fu(n,new j(s))}if(t instanceof be)return fu(n,t._key);throw new z(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Si(t)}.`)}function Yu(n,e){if(!Array.isArray(n)||n.length===0)throw new z(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Kf(n,e){const t=function(r,i){for(const a of r)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new z(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new z(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class FI{convertValue(e,t="none"){switch(rn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(sn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return Ln(e,(r,i)=>{s[r]=this.convertValue(i,t)}),s}convertVectorValue(e){var s,r,i;const t=(i=(r=(s=e.fields)==null?void 0:s[ui].arrayValue)==null?void 0:r.values)==null?void 0:i.map(a=>ge(a.doubleValue));return new _t(t)}convertGeoPoint(e){return new yt(ge(e.latitude),ge(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=Pi(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(Xs(e));default:return null}}convertTimestamp(e){const t=nn(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=ae.fromString(e);te(df(s),9688,{name:e});const r=new Ys(s.get(1),s.get(3)),i=new j(s.popFirst(5));return r.isEqual(t)||Pt(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class Vs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class In extends Gf{constructor(e,t,s,r,i,a){super(e,t,s,r,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Kr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(cc("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=In._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}In._jsonSchemaVersion="firestore/documentSnapshot/1.0",In._jsonSchema={type:Ie("string",In._jsonSchemaVersion),bundleSource:Ie("string","DocumentSnapshot"),bundleName:Ie("string"),bundle:Ie("string")};class Kr extends In{data(e={}){return super.data(e)}}class Xn{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Vs(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new Kr(this._firestore,this._userDataWriter,s.key,s,new Vs(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new z(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(r,i){if(r._snapshot.oldDocs.isEmpty()){let a=0;return r._snapshot.docChanges.map(c=>{const l=new Kr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Vs(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(c=>i||c.type!==3).map(c=>{const l=new Kr(r._firestore,r._userDataWriter,c.doc.key,c.doc,new Vs(r._snapshot.mutatedKeys.has(c.doc.key),r._snapshot.fromCache),r.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:UI(c.type),doc:l,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Xn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Na.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function UI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xf(n){n=en(n,be);const e=en(n.firestore,mr);return TI(sc(e),n._key).then(t=>$I(e,n,t))}Xn._jsonSchemaVersion="firestore/querySnapshot/1.0",Xn._jsonSchema={type:Ie("string",Xn._jsonSchemaVersion),bundleSource:Ie("string","QuerySnapshot"),bundleName:Ie("string"),bundle:Ie("string")};class Yf extends FI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new be(this.firestore,null,t)}}function hc(n){n=en(n,ds);const e=en(n.firestore,mr),t=sc(e),s=new Yf(e);return OI(n._query),AI(t,n._query).then(r=>new Xn(e,s,n,r))}function zI(n,e,t){n=en(n,be);const s=en(n.firestore,mr),r=Qf(n.converter,e,t);return Jf(s,[$f(oc(s),"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,pt.none())])}function Ju(n,e){const t=en(n.firestore,mr),s=Ui(n),r=Qf(n.converter,e);return Jf(t,[$f(oc(n.firestore),"addDoc",s._key,r,n.converter!==null,{}).toMutation(s._key,pt.exists(!1))]).then(()=>s)}function Jf(n,e){return function(s,r){const i=new St;return s.asyncQueue.enqueueAndForget(async()=>hI(await bI(s),r,i)),i.promise}(sc(n),e)}function $I(n,e,t){const s=t.docs.get(e._key),r=new Yf(n);return new In(n,r,e._key,s,new Vs(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(r){as=r})(xn),Cn(new Zt("firestore",(s,{instanceIdentifier:r,options:i})=>{const a=s.getProvider("app").getImmediate(),c=new mr(new Nw(s.getProvider("auth-internal")),new Vw(a,s.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new z(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ys(d.options.projectId,f)}(a,r),a);return i={useFetchStreams:t,...i},c._setSettings(i),c},"PUBLIC").setMultipleInstances(!0)),ht(eu,tu,e),ht(eu,tu,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf="firebasestorage.googleapis.com",em="storageBucket",qI=2*60*1e3,jI=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me extends vt{constructor(e,t,s=0){super(Ao(e),`Firebase Storage: ${t} (${Ao(e)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,me.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ao(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var fe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(fe||(fe={}));function Ao(n){return"storage/"+n}function fc(){const n="An unknown error occurred, please check the error payload for server response.";return new me(fe.UNKNOWN,n)}function HI(n){return new me(fe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function WI(n){return new me(fe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function GI(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new me(fe.UNAUTHENTICATED,n)}function KI(){return new me(fe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function QI(n){return new me(fe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function XI(){return new me(fe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function YI(){return new me(fe.CANCELED,"User canceled the upload/download.")}function JI(n){return new me(fe.INVALID_URL,"Invalid URL '"+n+"'.")}function ZI(n){return new me(fe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function eb(){return new me(fe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+em+"' property when initializing the app?")}function tb(){return new me(fe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function nb(){return new me(fe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function sb(n){return new me(fe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function ra(n){return new me(fe.INVALID_ARGUMENT,n)}function tm(){return new me(fe.APP_DELETED,"The Firebase app was deleted.")}function rb(n){return new me(fe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function js(n,e){return new me(fe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function ks(n){throw new me(fe.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let s;try{s=Ke.makeFromUrl(e,t)}catch{return new Ke(e,"")}if(s.path==="")return s;throw ZI(e)}static makeFromUrl(e,t){let s=null;const r="([A-Za-z0-9.\\-_]+)";function i(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+r+a,"i"),l={bucket:1,path:3};function d(M){M.path_=decodeURIComponent(M.path)}const f="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),y="(/([^?#]*).*)?$",v=new RegExp(`^https?://${m}/${f}/b/${r}/o${y}`,"i"),b={bucket:1,path:3},R=t===Zf?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",P=new RegExp(`^https?://${R}/${r}/${C}`,"i"),V=[{regex:c,indices:l,postModify:i},{regex:v,indices:b,postModify:d},{regex:P,indices:{bucket:1,path:2},postModify:d}];for(let M=0;M<V.length;M++){const O=V[M],F=O.regex.exec(e);if(F){const E=F[O.indices.bucket];let g=F[O.indices.path];g||(g=""),s=new Ke(E,g),O.postModify(s);break}}if(s==null)throw JI(e);return s}}class ib{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ob(n,e,t){let s=1,r=null,i=null,a=!1,c=0;function l(){return c===2}let d=!1;function f(...C){d||(d=!0,e.apply(null,C))}function m(C){r=setTimeout(()=>{r=null,n(v,l())},C)}function y(){i&&clearTimeout(i)}function v(C,...P){if(d){y();return}if(C){y(),f.call(null,C,...P);return}if(l()||a){y(),f.call(null,C,...P);return}s<64&&(s*=2);let V;c===1?(c=2,V=0):V=(s+Math.random())*1e3,m(V)}let b=!1;function R(C){b||(b=!0,y(),!d&&(r!==null?(C||(c=2),clearTimeout(r),m(0)):C||(c=1)))}return m(0),i=setTimeout(()=>{a=!0,R(!0)},t),R}function ab(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cb(n){return n!==void 0}function lb(n){return typeof n=="object"&&!Array.isArray(n)}function mc(n){return typeof n=="string"||n instanceof String}function Zu(n){return pc()&&n instanceof Blob}function pc(){return typeof Blob<"u"}function ed(n,e,t,s){if(s<e)throw ra(`Invalid value for '${n}'. Expected ${e} or greater.`);if(s>t)throw ra(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gc(n,e,t){let s=e;return t==null&&(s=`https://${e}`),`${t}://${s}/v0${n}`}function nm(n){const e=encodeURIComponent;let t="?";for(const s in n)if(n.hasOwnProperty(s)){const r=e(s)+"="+e(n[s]);t=t+r+"&"}return t=t.slice(0,-1),t}var bn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(bn||(bn={}));/**
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
 */function ub(n,e){const t=n>=500&&n<600,r=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||r||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e,t,s,r,i,a,c,l,d,f,m,y=!0,v=!1){this.url_=e,this.method_=t,this.headers_=s,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=m,this.retry=y,this.isUsingEmulator=v,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((b,R)=>{this.resolve_=b,this.reject_=R,this.start_()})}start_(){const e=(s,r)=>{if(r){s(!1,new Mr(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=c=>{const l=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const c=i.getErrorCode()===bn.NO_ERROR,l=i.getStatus();if(!c||ub(l,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===bn.ABORT;s(!1,new Mr(!1,null,f));return}const d=this.successCodes_.indexOf(l)!==-1;s(!0,new Mr(d,i))})},t=(s,r)=>{const i=this.resolve_,a=this.reject_,c=r.connection;if(r.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());cb(l)?i(l):i()}catch(l){a(l)}else if(c!==null){const l=fc();l.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,l)):a(l)}else if(r.canceled){const l=this.appDelete_?tm():YI();a(l)}else{const l=XI();a(l)}};this.canceled_?t(!1,new Mr(!1,null,!0)):this.backoffId_=ob(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&ab(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Mr{constructor(e,t,s){this.wasSuccessCode=e,this.connection=t,this.canceled=!!s}}function hb(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function fb(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function mb(n,e){e&&(n["X-Firebase-GMPID"]=e)}function pb(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function gb(n,e,t,s,r,i,a=!0,c=!1){const l=nm(n.urlParams),d=n.url+l,f=Object.assign({},n.headers);return mb(f,e),hb(f,t),fb(f,i),pb(f,s),new db(d,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,r,a,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function _b(...n){const e=yb();if(e!==void 0){const t=new e;for(let s=0;s<n.length;s++)t.append(n[s]);return t.getBlob()}else{if(pc())return new Blob(n);throw new me(fe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function wb(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function Eb(n){if(typeof atob>"u")throw sb("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Co{constructor(e,t){this.data=e,this.contentType=t||null}}function vb(n,e){switch(n){case dt.RAW:return new Co(sm(e));case dt.BASE64:case dt.BASE64URL:return new Co(rm(n,e));case dt.DATA_URL:return new Co(bb(e),Tb(e))}throw fc()}function sm(n){const e=[];for(let t=0;t<n.length;t++){let s=n.charCodeAt(t);if(s<=127)e.push(s);else if(s<=2047)e.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=s,a=n.charCodeAt(++t);s=65536|(i&1023)<<10|a&1023,e.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?e.push(239,191,189):e.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(e)}function Ib(n){let e;try{e=decodeURIComponent(n)}catch{throw js(dt.DATA_URL,"Malformed data URL.")}return sm(e)}function rm(n,e){switch(n){case dt.BASE64:{const r=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(r||i)throw js(n,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case dt.BASE64URL:{const r=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(r||i)throw js(n,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Eb(e)}catch(r){throw r.message.includes("polyfill")?r:js(n,"Invalid character found")}const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s}class im{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw js(dt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=t[1]||null;s!=null&&(this.base64=Ab(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=e.substring(e.indexOf(",")+1)}}function bb(n){const e=new im(n);return e.base64?rm(dt.BASE64,e.rest):Ib(e.rest)}function Tb(n){return new im(n).contentType}function Ab(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){let s=0,r="";Zu(e)?(this.data_=e,s=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),s=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),s=e.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(Zu(this.data_)){const s=this.data_,r=wb(s,e,t);return r===null?null:new Wt(r)}else{const s=new Uint8Array(this.data_.buffer,e,t-e);return new Wt(s,!0)}}static getBlob(...e){if(pc()){const t=e.map(s=>s instanceof Wt?s.data_:s);return new Wt(_b.apply(null,t))}else{const t=e.map(a=>mc(a)?vb(dt.RAW,a).data:a.data_);let s=0;t.forEach(a=>{s+=a.byteLength});const r=new Uint8Array(s);let i=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)r[i++]=a[c]}),new Wt(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function om(n){let e;try{e=JSON.parse(n)}catch{return null}return lb(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cb(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Sb(n,e){const t=e.split("/").filter(s=>s.length>0).join("/");return n.length===0?t:n+"/"+t}function am(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(n,e){return e}class $e{constructor(e,t,s,r){this.server=e,this.local=t||e,this.writable=!!s,this.xform=r||Rb}}let Vr=null;function kb(n){return!mc(n)||n.length<2?n:am(n)}function cm(){if(Vr)return Vr;const n=[];n.push(new $e("bucket")),n.push(new $e("generation")),n.push(new $e("metageneration")),n.push(new $e("name","fullPath",!0));function e(i,a){return kb(a)}const t=new $e("name");t.xform=e,n.push(t);function s(i,a){return a!==void 0?Number(a):a}const r=new $e("size");return r.xform=s,n.push(r),n.push(new $e("timeCreated")),n.push(new $e("updated")),n.push(new $e("md5Hash",null,!0)),n.push(new $e("cacheControl",null,!0)),n.push(new $e("contentDisposition",null,!0)),n.push(new $e("contentEncoding",null,!0)),n.push(new $e("contentLanguage",null,!0)),n.push(new $e("contentType",null,!0)),n.push(new $e("metadata","customMetadata",!0)),Vr=n,Vr}function Pb(n,e){function t(){const s=n.bucket,r=n.fullPath,i=new Ke(s,r);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function xb(n,e,t){const s={};s.type="file";const r=t.length;for(let i=0;i<r;i++){const a=t[i];s[a.local]=a.xform(s,e[a.server])}return Pb(s,n),s}function lm(n,e,t){const s=om(e);return s===null?null:xb(n,s,t)}function Lb(n,e,t,s){const r=om(e);if(r===null||!mc(r.downloadTokens))return null;const i=r.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const f=n.bucket,m=n.fullPath,y="/b/"+a(f)+"/o/"+a(m),v=gc(y,t,s),b=nm({alt:"media",token:d});return v+b})[0]}function Nb(n,e){const t={},s=e.length;for(let r=0;r<s;r++){const i=e[r];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class um{constructor(e,t,s,r){this.url=e,this.method=t,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dm(n){if(!n)throw fc()}function Db(n,e){function t(s,r){const i=lm(n,r,e);return dm(i!==null),i}return t}function Mb(n,e){function t(s,r){const i=lm(n,r,e);return dm(i!==null),Lb(i,r,n.host,n._protocol)}return t}function hm(n){function e(t,s){let r;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?r=KI():r=GI():t.getStatus()===402?r=WI(n.bucket):t.getStatus()===403?r=QI(n.path):r=s,r.status=t.getStatus(),r.serverResponse=s.serverResponse,r}return e}function Vb(n){const e=hm(n);function t(s,r){let i=e(s,r);return s.getStatus()===404&&(i=HI(n.path)),i.serverResponse=r.serverResponse,i}return t}function Ob(n,e,t){const s=e.fullServerUrl(),r=gc(s,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,c=new um(r,i,Mb(n,t),a);return c.errorHandler=Vb(e),c}function Bb(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Fb(n,e,t){const s=Object.assign({},t);return s.fullPath=n.path,s.size=e.size(),s.contentType||(s.contentType=Bb(null,e)),s}function Ub(n,e,t,s,r){const i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let V="";for(let M=0;M<2;M++)V=V+Math.random().toString().slice(2);return V}const l=c();a["Content-Type"]="multipart/related; boundary="+l;const d=Fb(e,s,r),f=Nb(d,t),m="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+l+`\r
Content-Type: `+d.contentType+`\r
\r
`,y=`\r
--`+l+"--",v=Wt.getBlob(m,s,y);if(v===null)throw tb();const b={name:d.fullPath},R=gc(i,n.host,n._protocol),C="POST",P=n.maxUploadRetryTime,N=new um(R,C,Db(n,t),P);return N.urlParams=b,N.headers=a,N.body=v.uploadData(),N.errorHandler=hm(e),N}class zb{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=bn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=bn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=bn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,s,r,i){if(this.sent_)throw ks("cannot .send() more than once");if(ln(e)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const a in i)i.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,i[a].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ks("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ks("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ks("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ks("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class $b extends zb{initXhr(){this.xhr_.responseType="text"}}function fm(){return new $b}/**
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
 */class Pn{constructor(e,t){this._service=e,t instanceof Ke?this._location=t:this._location=Ke.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Pn(e,t)}get root(){const e=new Ke(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return am(this._location.path)}get storage(){return this._service}get parent(){const e=Cb(this._location.path);if(e===null)return null;const t=new Ke(this._location.bucket,e);return new Pn(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw rb(e)}}function qb(n,e,t){n._throwIfRoot("uploadBytes");const s=Ub(n.storage,n._location,cm(),new Wt(e,!0),t);return n.storage.makeRequestWithTokens(s,fm).then(r=>({metadata:r,ref:n}))}function jb(n){n._throwIfRoot("getDownloadURL");const e=Ob(n.storage,n._location,cm());return n.storage.makeRequestWithTokens(e,fm).then(t=>{if(t===null)throw nb();return t})}function Hb(n,e){const t=Sb(n._location.path,e),s=new Ke(n._location.bucket,t);return new Pn(n.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wb(n){return/^[A-Za-z]+:\/\//.test(n)}function Gb(n,e){return new Pn(n,e)}function mm(n,e){if(n instanceof yc){const t=n;if(t._bucket==null)throw eb();const s=new Pn(t,t._bucket);return e!=null?mm(s,e):s}else return e!==void 0?Hb(n,e):n}function Kb(n,e){if(e&&Wb(e)){if(n instanceof yc)return Gb(n,e);throw ra("To use ref(service, url), the first argument must be a Storage instance.")}else return mm(n,e)}function td(n,e){const t=e==null?void 0:e[em];return t==null?null:Ke.makeFromBucketSpec(t,n)}function Qb(n,e,t,s={}){n.host=`${e}:${t}`;const r=ln(e);r&&(ga(`https://${n.host}/b`),ya("Storage",!0)),n._isUsingEmulator=!0,n._protocol=r?"https":"http";const{mockUserToken:i}=s;i&&(n._overrideAuthToken=typeof i=="string"?i:Ld(i,n.app.options.projectId))}class yc{constructor(e,t,s,r,i,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=s,this._url=r,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=Zf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=qI,this._maxUploadRetryTime=jI,this._requests=new Set,r!=null?this._bucket=Ke.makeFromBucketSpec(r,this._host):this._bucket=td(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ke.makeFromBucketSpec(this._url,e):this._bucket=td(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){ed("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){ed("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Pn(this,e)}_makeRequest(e,t,s,r,i=!0){if(this._deleted)return new ib(tm());{const a=gb(e,this._appId,s,r,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,s,r).getPromise()}}const nd="@firebase/storage",sd="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="storage";function Xb(n,e,t){return n=Ce(n),qb(n,e,t)}function Yb(n){return n=Ce(n),jb(n)}function Jb(n,e){return n=Ce(n),Kb(n,e)}function Zb(n=Ea(),e){n=Ce(n);const s=bi(n,pm).getImmediate({identifier:e}),r=kd("storage");return r&&e0(s,...r),s}function e0(n,e,t,s={}){Qb(n,e,t,s)}function t0(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),r=n.getProvider("app-check-internal");return new yc(t,s,r,e,xn)}function n0(){Cn(new Zt(pm,t0,"PUBLIC").setMultipleInstances(!0)),ht(nd,sd,""),ht(nd,sd,"esm2020")}n0();const s0={apiKey:"AIzaSyBoy9o27yXnXhxRHBT-mApta9ZENo2oeZU",authDomain:"arcblueprinttracker.firebaseapp.com",projectId:"arcblueprinttracker",storageBucket:"arcblueprinttracker.firebasestorage.app",messagingSenderId:"578043594072",appId:"1:578043594072:web:e6ff4b0d7cb5ffb0be112d",measurementId:"G-EHCHELVTW7"},_c=Md(s0),Qe=kw(_c);sh(Qe,ka).catch(n=>{console.error("Firebase Auth Persistence Error:",n)});const cn=SI(_c),r0=Zb(_c),i0=new Tt;(function(){function n(e){return this instanceof n?(this._canvas=e=typeof e=="string"?document.getElementById(e):e,this._ctx=e.getContext("2d"),this._width=e.width,this._height=e.height,this._max=1,void this.clear()):new n(e)}n.prototype={defaultRadius:25,defaultGradient:{.4:"blue",.6:"cyan",.7:"lime",.8:"yellow",1:"red"},data:function(e,t){return this._data=e,this},max:function(e){return this._max=e,this},add:function(e){return this._data.push(e),this},clear:function(){return this._data=[],this},radius:function(e,t){t=t||15;var s=this._circle=document.createElement("canvas"),r=s.getContext("2d"),i=this._r=e+t;return s.width=s.height=2*i,r.shadowOffsetX=r.shadowOffsetY=200,r.shadowBlur=t,r.shadowColor="black",r.beginPath(),r.arc(i-200,i-200,e,0,2*Math.PI,!0),r.closePath(),r.fill(),this},gradient:function(e){var t=document.createElement("canvas"),s=t.getContext("2d"),r=s.createLinearGradient(0,0,0,256);t.width=1,t.height=256;for(var i in e)r.addColorStop(i,e[i]);return s.fillStyle=r,s.fillRect(0,0,1,256),this._grad=s.getImageData(0,0,1,256).data,this},draw:function(e){this._circle||this.radius(this.defaultRadius),this._grad||this.gradient(this.defaultGradient);var t=this._ctx;t.clearRect(0,0,this._width,this._height);for(var s,r=0,i=this._data.length;i>r;r++)s=this._data[r],t.globalAlpha=Math.max(s[2]/this._max,e||.05),t.drawImage(this._circle,s[0]-this._r,s[1]-this._r);var a=t.getImageData(0,0,this._width,this._height);return this._colorize(a.data,this._grad),t.putImageData(a,0,0),this},_colorize:function(e,t){for(var s,r=3,i=e.length;i>r;r+=4)s=4*e[r],s&&(e[r-3]=t[s],e[r-2]=t[s+1],e[r-1]=t[s+2])}},window.simpleheat=n})();function o0(n,e,t={}){const s=e[0],r=e[1],i=Math.abs(r[1]-s[1]),a=Math.abs(r[0]-s[0]),c=document.createElement("canvas");c.width=i,c.height=a;const l=window.simpleheat(c);l.radius(t.radius||25,t.blur||15),t.gradient&&l.gradient(t.gradient),l.max(t.max||1);const d=s[0],f=s[1],m=n.map(y=>{const v=y.x-f,b=a-(y.y-d);return[v,b,y.value||1]});return l.data(m),l.draw(t.minOpacity||.05),L.imageOverlay(c.toDataURL(),e,{opacity:.8,interactive:!1})}const a0="./data.csv";let wn=null,vi=null;window.initUI=Sm;window.setGridSize=O0;document.addEventListener("DOMContentLoaded",()=>{const n=(e,t)=>{try{t()}catch(s){console.error(`Initialization failed for ${e}:`,s)}};n("Collection State",l0),n("Spares",u0),n("Filters",d0),n("Tab Navigation",_0),n("Switch Tab",()=>gn(p.currentTab)),n("Collection Filters",Ic),n("Auth",p0),n("Event Banner",w0),n("Blueprint Submission",E0),n("Wrapped",k0),n("Announcements",P0),n("Sidebar",G0),n("Context Menu",K0),n("Data Loading",$0),n("Data Tabs",Y0)});const Ps="./images/",c0="./icons/",bt=new Map;function ia(n){if(!n)return"";try{n=decodeURIComponent(n)}catch{}return n=n.replace(/\.webp$/i,"").replace(/\.png$/i,""),n=n.replace(/Magazine/g,"Mag"),n=n.replace(/\s*\(/g,"_").replace(/\)/g,"_"),n=n.replace(/['â€™]/g,""),n=n.replace(/\s/g,"_"),n=n.replace(/_+/g,"_"),n=n.replace(/^_+|_+$/g,""),n}const rd={Light_Stick__Any_Color:"Blue_Light_Stick"},gm="arc_collection_v1";function l0(){try{const n=localStorage.getItem(gm);if(n){const e=JSON.parse(n);Array.isArray(e)?p.collectedItems=new Set(e):(e.collected&&(p.collectedItems=new Set(e.collected)),e.wishlist&&(p.wishlistedItems=new Set(e.wishlist)),p.collectedItems.forEach(t=>{p.wishlistedItems.has(t)&&p.wishlistedItems.delete(t)}))}}catch(n){console.error("Failed to load collection state:",n)}}function Yn(){try{const n={collected:Array.from(p.collectedItems),wishlist:Array.from(p.wishlistedItems)};localStorage.setItem(gm,JSON.stringify(n))}catch(n){console.error("Failed to save collection state:",n)}}const ym="arc_spares_v1";function u0(){try{const n=localStorage.getItem(ym);n&&(p.spares=JSON.parse(n))}catch(n){console.error("Failed to load spares:",n)}}function id(){try{localStorage.setItem(ym,JSON.stringify(p.spares))}catch(n){console.error("Failed to save spares:",n)}}const _m="arc_filters_v1";function He(){try{const n={rarities:Array.from(p.filters.rarities),types:Array.from(p.filters.types),maps:Array.from(p.filters.maps),conds:Array.from(p.filters.conds),confs:Array.from(p.filters.confs),collected:p.filters.collected,sort:p.filters.sort,sortBlueprints:p.filters.sortBlueprints,sortData:p.filters.sortData};localStorage.setItem(_m,JSON.stringify(n))}catch(n){console.error("Failed to save filters:",n)}}function d0(){try{const n=localStorage.getItem(_m);if(n){const e=JSON.parse(n);e.rarities&&(p.filters.rarities=new Set(e.rarities)),e.types&&(p.filters.types=new Set(e.types)),e.maps&&(p.filters.maps=new Set(e.maps)),e.conds&&(p.filters.conds=new Set(e.conds)),e.confs&&(p.filters.confs=new Set(e.confs)),e.collected&&(p.filters.collected=e.collected),e.sort&&(p.filters.sortBlueprints=e.sort),e.sortBlueprints&&(p.filters.sortBlueprints=e.sortBlueprints),e.sortData&&(p.filters.sortData=e.sortData)}}catch(n){console.error("Failed to load filters:",n)}}function Tn(n,e){if(!n)return;n.querySelectorAll(".collected-badge, .collected-glow, .wishlist-badge, .wishlist-glow, .collection-hint").forEach(i=>i.remove());const t=p.collectedItems.has(e),s=p.wishlistedItems.has(e);if(t){const i=document.createElement("div");i.className="collected-badge",i.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',n.appendChild(i);const a=document.createElement("div");a.className="collected-glow",n.appendChild(a)}else if(s){const i=document.createElement("div");i.className="wishlist-badge",i.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',n.appendChild(i);const a=document.createElement("div");a.className="wishlist-glow",n.appendChild(a)}if(p.currentTab==="collection"){let i="",a="",c=!1;if(t?(i='<svg viewBox="0 0 24 24" width="20" height="20" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>',a="Click to Wishlist",c=!0):s?(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a="Click To Unwishlist",c=!0):(i='<svg viewBox="0 0 24 24" width="20" height="20" stroke="white" stroke-width="2" fill="none"><path d="M12 5v14M5 12h14"></path></svg>',a="Click to Collect",c=!0),c){const l=document.createElement("div");l.className="collection-hint",l.innerHTML=`
          <div class="collection-hint-icon">${i}</div>
          <div class="collection-hint-text">${a}</div>
        `,(t||s)&&l.classList.add("hint-hidden"),n.appendChild(l)}}let r=n.querySelector(".mass-collect-overlay");r&&(t?(r.classList.add("overlay-collected"),r.querySelector(".mass-collect-text").textContent="Collected"):(r.classList.remove("overlay-collected"),r.querySelector(".mass-collect-text").innerHTML="Click to<br>Collect"))}function Qr(){if(!document.getElementById("collectionProgressContainer"))return;const e=p.all.length,t=new Set(p.all.map(l=>l.name)),s=[...p.collectedItems].filter(l=>t.has(l)).length,r=e>0?Math.round(s/e*100):0,i=document.getElementById("progressPercent"),a=document.getElementById("progressCount");i&&(i.textContent=`${r}%`),a&&(a.textContent=`${s} / ${e}`);const c=document.getElementById("progressBar");if(c){c.style.width=`${r}%`;const l=Math.floor(r*1.2);c.style.backgroundColor=`hsl(${l}, 80%, 50%)`,c.style.backgroundImage="none"}}function h0(n,e,t,s){if(!n)return;let r=null;const i=a=>{r||(r=a);const c=Math.min((a-r)/s,1),l=Math.floor(c*(t-e)+e);n.textContent=`${l}%`,c<1?window.requestAnimationFrame(i):n.textContent=`${t}%`};window.requestAnimationFrame(i)}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("tabCollection"),e=document.getElementById("tabBlueprints"),t=document.getElementById("collectionProgressContainer");n&&n.addEventListener("click",()=>{const s=document.getElementById("progressBar"),r=document.getElementById("progressPercent"),i=p.all.length,a=new Set(p.all.map(d=>d.name)),c=[...p.collectedItems].filter(d=>a.has(d)).length,l=i>0?Math.round(c/i*100):0;s&&(s.style.transition="none",s.style.width="0%",s.style.backgroundColor="hsl(0, 80%, 50%)"),r&&(r.textContent="0%"),t&&t.classList.remove("hidden"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{s&&(s.style.transition="width 1.75s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 1.75s linear",Qr()),r&&h0(r,0,l,1750)})})}),e&&e.addEventListener("click",()=>{t&&t.classList.add("hidden")})});async function oa(){if(Qe.currentUser)try{const n=Ui(cn,"users",Qe.currentUser.uid);await zI(n,{collectedItems:Array.from(p.collectedItems),wishlistedItems:Array.from(p.wishlistedItems),spares:p.spares,lastSync:new Date().toISOString(),updatedAt:new Date},{merge:!0}),console.log("Cloud sync successful.")}catch(n){console.error("Cloud sync failed:",n)}}async function f0(n){try{console.log("Loading collection from cloud...");const e=Ui(cn,"users",n.uid),t=await Xf(e);if(t.exists()){const s=t.data();let r=!1;if(s.collectedItems){const i=new Set(s.collectedItems),a=p.collectedItems.size;i.forEach(c=>{p.collectedItems.add(c),p.wishlistedItems.delete(c)}),p.collectedItems.size>a&&(r=!0)}if(s.wishlistedItems){const i=new Set(s.wishlistedItems),a=p.wishlistedItems.size;i.forEach(c=>{p.collectedItems.has(c)||p.wishlistedItems.add(c)}),p.wishlistedItems.size>a&&(r=!0),p.wishlistedItems.size>a&&(r=!0)}s.spares&&Object.entries(s.spares).forEach(([i,a])=>{const c=p.spares[i]||0;a>c&&(p.spares[i]=a,r=!0)}),r&&(console.log("Cloud sync merged new items."),Yn(),Ee(),oa())}else console.log("No cloud data found for user. Creating initial sync..."),oa()}catch(e){console.error("Loading from cloud failed:",e)}}async function m0(){if(Qe.currentUser){p.wrappedData.loading=!0;try{const n=uc(tr(cn,"blueprintSubmissions"),Ei("userId","==",Qe.currentUser.uid)),e=await hc(n);p.wrappedData.contributionCount=e.size,console.log(`User has submitted ${e.size} reports.`)}catch(n){console.error("Failed to fetch user contributions:",n)}finally{p.wrappedData.loading=!1}}}function p0(){const n=document.getElementById("loginBtn"),e=document.getElementById("loginBtnMobile"),t=document.getElementById("logoutBtn"),s=document.getElementById("logoutBtnMobile"),r=async()=>{try{console.log("Attempting Google Sign-in..."),await sh(Qe,ka),await B_(Qe,i0),console.log("Sign-in successful!")}catch(a){console.error("Firebase Auth Error:",a.code,a.message),a.code==="auth/popup-closed-by-user"?console.warn("Popup was closed before finishing."):a.code==="auth/operation-not-allowed"?alert("Google Sign-in is not enabled in the Firebase Console."):a.code==="auth/unauthorized-domain"?alert(`Domain unauthorized (${window.location.hostname}). To test mobile, use your LIVE site (arc-blueprint-tracker.web.app) or whitelist this IP in Firebase Console.`):alert("Sign-in failed: "+a.message)}},i=()=>w_(Qe).catch(console.error);n&&(n.onclick=r),e&&(e.onclick=r),t&&(t.onclick=i),s&&(s.onclick=i),__(Qe,a=>{document.getElementById("authSection");const c=document.getElementById("userProfile");document.getElementById("authSectionMobile");const l=document.getElementById("userProfileMobile");if(a){n&&n.classList.add("hidden"),e&&e.classList.add("hidden"),c&&c.classList.remove("hidden"),l&&l.classList.remove("hidden");const d=document.getElementById("userPhoto"),f=document.getElementById("userName"),m=document.getElementById("userPhotoMobile"),y=document.getElementById("userNameMobile");d&&(d.src=a.photoURL||""),f&&(f.textContent=a.displayName||"Explorer"),m&&(m.src=a.photoURL||""),y&&(y.textContent=a.displayName||"Explorer"),f0(a),p.currentTab==="progression"&&Em()}else n&&n.classList.remove("hidden"),e&&e.classList.remove("hidden"),c&&c.classList.add("hidden"),l&&l.classList.add("hidden")})}function wm(n,e){const t=document.createElement("div");t.className="card-compact bg-zinc-950 border border-zinc-800/50 rounded-2xl p-2",t.style.position="relative",t.style.overflow="visible",t.style.setProperty("--glow-color",Pe(n.rarity)),t.dataset.name=n.name;const s=document.createElement("div");s.className="rarity-frame rarity-glow relative overflow-hidden",s.style.borderColor=Pe(n.rarity);const r=document.createElement("div");r.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",r.style.background=`
    linear-gradient(to top right, ${Pe(n.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
    linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
    url('Background/Arc BP Image Background.webp')
  `,r.style.backgroundSize="cover, cover, cover",r.style.backgroundPosition="center, center, center",r.style.backgroundBlendMode="normal, normal, normal",r.style.aspectRatio="1 / 1",r.style.width="100%";const i=document.createElement("img");i.src=n.img||"",i.alt=n.name,i.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",i.style.width="100%",i.style.height="100%",i.style.objectFit="contain",i.style.padding="8px",i.loading="lazy",i.draggable=!1,i.style.webkitTouchCallout="none",i.style.userSelect="none";const a=document.createElement("div");a.className="rarity-corner",a.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${Pe(n.rarity)}66 60%, ${Pe(n.rarity)}cc 100%)`;const c=document.createElement("div");c.className="type-tab",c.style.background=Pe(n.rarity)+"22",c.style.borderColor=Pe(n.rarity);const l=document.createElement("img");l.src=n.typeIcon,l.alt=n.type;const d=document.createElement("span");d.textContent=n.type||"â€”",c.appendChild(l),c.appendChild(d),r.appendChild(i),r.appendChild(a),r.appendChild(c);const f=document.createElement("div");f.className="mt-2 px-1 pb-1";const m=document.createElement("div");if(m.className="font-semibold leading-tight",m.style.fontSize="clamp(13px, calc(var(--cardSize)/18), 16px)",m.textContent=n.name,f.appendChild(m),s.appendChild(r),p.collectedItems.has(n.name)){const y=document.createElement("div");y.className="collected-badge",y.innerHTML='<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>',s.appendChild(y);const v=document.createElement("div");v.className="collected-glow",s.appendChild(v)}return t.appendChild(s),t.appendChild(f),t}async function Em(){const n=Qe.currentUser;if(!n){console.log("[UserStats] No user logged in, skipping fetch"),So(0,"N/A",0,[]);return}try{console.log("[UserStats] Fetching submissions for user:",n.uid);const e=uc(tr(cn,"blueprintSubmissions"),Ei("userId","==",n.uid)),t=await hc(e),s=[];t.forEach(d=>{s.push({id:d.id,...d.data()})}),console.log("[UserStats] Found",s.length,"submissions");const r=s.length,i={};s.forEach(d=>{d.map&&d.map!=="N/A"&&(i[d.map]=(i[d.map]||0)+1)});let a="N/A",c=0;for(const[d,f]of Object.entries(i))f>c&&(a=d,c=f);const l=s.filter(d=>d.blueprintName).sort((d,f)=>d.submittedAt&&f.submittedAt?new Date(f.submittedAt)-new Date(d.submittedAt):0).slice(0,5);console.log("[UserStats] sortedSubs:",l.map(d=>({name:d.blueprintName,date:d.submittedAt}))),s.forEach(d=>{d.blueprintName&&p.collectedItems.add(d.blueprintName)}),Yn(),So(r,a,c,l)}catch(e){console.error("[UserStats] Error fetching user stats:",e),So(0,"N/A",0,[])}}function So(n,e,t,s){const r=document.getElementById("userStatsSection"),i=document.getElementById("statSubmissionCount"),a=document.getElementById("statBestMap"),c=document.getElementById("statBestMapCount"),l=document.getElementById("recentFindsGrid");if(!(!r||!i||!a||!l)){if(n===0){r.classList.add("hidden");return}i.textContent=n,a.textContent=e,c&&(c.textContent=`(${t})`),r.classList.remove("hidden"),l.innerHTML="",console.log("[UserStats] Rendering recent items:",s.length),console.log("[UserStats] state.all has",p.all.length,"items"),s.forEach((d,f)=>{const m=p.all.find(y=>y.name===d.blueprintName);if(console.log(`[UserStats] Item ${f}: blueprintName="${d.blueprintName}", found=${!!m}`),m){const y=wm(m);l.appendChild(y)}}),console.log("[UserStats] Grid now has",l.children.length,"children")}}function g0(){const n=document.getElementById("progressionTab");if(document.getElementById("filtersSidebar"),!n||n.classList.contains("hidden"))return;const e=p.all.length,t=new Set(p.all.map(b=>b.name)),s=p.collectedItems?[...p.collectedItems].filter(b=>t.has(b)).length:0;if(e===0)return;const r=Math.round(s/e*100),i=document.getElementById("progressionBarMain"),a=document.getElementById("progressionSign"),c=document.getElementById("progressionCount"),l=document.getElementById("progressionTotal");if(l&&(l.textContent=e),i){i.style.transition="none",i.style.width="0%",i.style.backgroundImage="none",i.style.backgroundColor="hsl(340, 80%, 50%)",i.offsetWidth;const b=r/100*1750;let R=null;const C=P=>{R||(R=P);const N=P-R;let V=Math.min(N/b,1);V=1-Math.pow(1-V,2);const M=V*r,O=Math.floor(V*s);i.style.width=`${M}%`,a&&(a.textContent=`${Math.floor(M)}%`),c&&(c.textContent=O);let E=340+M/100*140;E>=360&&(E-=360),i.style.backgroundColor=`hsl(${E}, 80%, 50%)`,i.style.boxShadow=`0 0 20px hsl(${E}, 80%, 40%)`,V<1?requestAnimationFrame(C):(a&&(a.textContent=`${r}%`),c&&(c.textContent=s))};requestAnimationFrame(C)}const d=document.getElementById("progressionCategories");if(!d)return;d.innerHTML="";const f={Augment:{border:"rgba(251,199,0,0.5)",bg:"rgba(251,199,0,0.1)",barFrom:"#FBC700",barTo:"#f59e0b",icon:"rgba(251,199,0,0.2)",text:"#FBC700"},Weapon:{border:"rgba(216,41,155,0.5)",bg:"rgba(216,41,155,0.1)",barFrom:"#D8299B",barTo:"#ec4899",icon:"rgba(216,41,155,0.2)",text:"#D8299B"},"Quick Use":{border:"rgba(30,203,252,0.5)",bg:"rgba(30,203,252,0.1)",barFrom:"#1ECBFC",barTo:"#06b6d4",icon:"rgba(30,203,252,0.2)",text:"#1ECBFC"},Grenade:{border:"rgba(65,235,106,0.5)",bg:"rgba(65,235,106,0.1)",barFrom:"#41EB6A",barTo:"#34d399",icon:"rgba(65,235,106,0.2)",text:"#41EB6A"},Mod:{border:"rgba(255,255,255,0.5)",bg:"rgba(255,255,255,0.05)",barFrom:"#ffffff",barTo:"#d4d4d8",icon:"rgba(255,255,255,0.15)",text:"#ffffff"},Material:{border:"rgba(113,116,113,0.5)",bg:"rgba(113,116,113,0.1)",barFrom:"#717471",barTo:"#a1a1aa",icon:"rgba(113,116,113,0.2)",text:"#a1a1aa"},default:{border:"rgba(255,255,255,0.3)",bg:"rgba(255,255,255,0.05)",barFrom:"#52525b",barTo:"#a1a1aa",icon:"rgba(255,255,255,0.1)",text:"#d4d4d8"}},m={};p.all.forEach(b=>{const R=b.type||"Unknown";m[R]||(m[R]={total:0,collected:0,icon:b.typeIcon}),m[R].total++,p.collectedItems&&p.collectedItems.has(b.name)&&m[R].collected++});const y=["Augment","Weapon","Quick Use","Grenade","Mod","Material"];Object.keys(m).sort((b,R)=>{const C=y.indexOf(b),P=y.indexOf(R);return C===-1&&P===-1?b.localeCompare(R):C===-1?1:P===-1?-1:C-P}).forEach(b=>{const R=m[b],C=Math.round(R.collected/R.total*100);console.log("Category type:",b,"Has color?",!!f[b]);const P=f[b]||f.default,N=document.createElement("div");N.className="relative overflow-hidden rounded-2xl backdrop-blur-xl p-4 flex flex-col gap-3 shadow-xl hover:brightness-110 transition-all duration-300 group",N.style.border=`2px solid ${P.border}`,N.style.backgroundColor=P.bg;const V=document.createElement("div");V.className="flex items-center gap-4 z-10";const M=document.createElement("div");if(M.className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner",M.style.backgroundColor=P.icon,R.icon){const I=document.createElement("img");I.src=R.icon,I.className="w-7 h-7 opacity-90 drop-shadow-md",M.appendChild(I)}const O=document.createElement("div"),F=document.createElement("div");F.className="text-base font-bold tracking-wide",F.style.color=P.text,F.textContent=b;const E=document.createElement("div");E.className="text-sm text-zinc-500 font-mono",E.textContent=`${R.collected} / ${R.total}`,O.appendChild(F),O.appendChild(E),V.appendChild(M),V.appendChild(O);const g=document.createElement("div");g.className="relative h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 z-10";const w=document.createElement("div");w.className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-out",w.style.background=`linear-gradient(to right, ${P.barFrom}, ${P.barTo})`,w.style.width="0%",requestAnimationFrame(()=>{w.style.width=`${C}%`}),g.appendChild(w),N.appendChild(V),N.appendChild(g);const A=document.createElement("div");A.className=`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${P.bar} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity pointer-events-none`,N.appendChild(A),d.appendChild(N)})}function y0(n){const e=document.getElementById("sortSelect"),t=document.getElementById("sortSelectMobile");let s="";n==="data"?s=`
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
    `,e&&(e.innerHTML=s,n==="data"?e.value=p.filters.sortData||"rarity_desc":e.value=p.filters.sortBlueprints||"rarity_desc"),t&&(t.innerHTML=s,n==="data"?t.value=p.filters.sortData||"rarity_desc":t.value=p.filters.sortBlueprints||"rarity_desc")}function gn(n){var V,M;p.currentTab=n,window.scrollTo(0,0),y0(n==="data"?"data":"blueprints"),typeof fa=="function"&&fa(n);const e=document.getElementById("tabBlueprints"),t=document.getElementById("tabProgression"),s=document.getElementById("tabData");[e,t,s].forEach(O=>{O&&O.classList.remove("tab-button-active")}),n==="blueprints"&&e&&e.classList.add("tab-button-active"),n==="progression"&&t&&t.classList.add("tab-button-active"),n==="data"&&s&&s.classList.add("tab-button-active"),document.getElementById("gridSection");const r=document.getElementById("grid"),i=document.getElementById("emptyState");document.querySelectorAll(".filter-section-desktop");const a=document.getElementById("progressionTab"),c=document.getElementById("dataTab"),l=document.getElementById("submitLocationFab");l&&(n==="blueprints"?l.classList.remove("hidden"):l.classList.add("hidden"));const d=n==="blueprints",f=document.getElementById("gridHeader");f&&(d?(f.classList.remove("hidden"),f.classList.add("flex")):(f.classList.add("hidden"),f.classList.remove("flex")));const m=document.getElementById("blueprintSearchBar");m&&(d?m.classList.remove("hidden"):m.classList.add("hidden")),r&&(d?(Ee(),r.classList.remove("hidden")):(r.classList.add("hidden"),i&&i.classList.add("hidden"))),a&&(n==="progression"?(a.classList.remove("hidden"),g0(),Em()):a.classList.add("hidden")),c&&(n==="data"?(c.classList.remove("hidden"),typeof da=="function"&&(!p.detailedData||p.detailedData.length===0)?da():typeof Lt=="function"&&Lt()):c.classList.add("hidden"));const y=document.getElementById("desktopFilterBtn"),v=document.getElementById("mobileFilterBtn"),b=document.getElementById("filtersSidebar"),R=document.getElementById("drawer"),C=n==="progression";b&&b.querySelectorAll(".filter-options").forEach(O=>{C?O.classList.add("hidden"):O.classList.remove("hidden")}),R&&R.querySelectorAll(".filter-options").forEach(O=>{C?O.classList.add("hidden"):O.classList.remove("hidden")});const P=(V=document.getElementById("gridSize"))==null?void 0:V.closest(".filter-options");P&&(n==="data"?P.classList.add("hidden"):C||P.classList.remove("hidden"));const N=(M=document.getElementById("gridSizeMobile"))==null?void 0:M.closest(".filter-options");N&&(n==="data"?N.classList.add("hidden"):C||N.classList.remove("hidden")),b&&(y&&(y.classList.remove("opacity-50","pointer-events-none"),y.classList.add("cursor-pointer")),v&&(v.classList.remove("opacity-50","pointer-events-none"),v.classList.add("cursor-pointer")),p.filtersOpen?(b.classList.add("hidden"),b.classList.remove("md:hidden"),b.classList.add("md:block")):(b.classList.add("hidden"),b.classList.remove("md:block")))}function _0(){const n=document.getElementById("tabBlueprints"),e=document.getElementById("tabProgression"),t=document.getElementById("tabData"),s=document.getElementById("logoHome"),r=document.getElementById("logoHomeMobile");n&&(n.onclick=()=>gn("blueprints")),e&&(e.onclick=()=>gn("progression")),t&&(t.onclick=()=>gn("data")),s&&(s.onclick=()=>gn("blueprints")),r&&(r.onclick=()=>gn("blueprints"))}let od=!1;window.menuCloseTimer=null;function wc(){document.querySelectorAll(".details-overlay:not(.hidden)").forEach(e=>{e.classList.add("hidden"),e.style.transform=""}),document.querySelectorAll(".card-open").forEach(e=>{e.classList.remove("card-open"),e.style.zIndex=""}),document.querySelectorAll(".card-selected").forEach(e=>{e.classList.remove("card-selected")});const n=document.getElementById("itemContextMenu");n&&!n.classList.contains("hidden")&&(n.classList.add("opacity-0"),window.menuCloseTimer&&clearTimeout(window.menuCloseTimer),window.menuCloseTimer=setTimeout(()=>{n.classList.add("hidden"),window.menuCloseTimer=null},150))}function vm(n,e="details"){if(wc(),!!n&&(n.classList.add("card-selected"),e==="details")){const t=n.querySelector(".details-overlay");t&&(t.classList.remove("hidden"),n.classList.add("card-open"),n.style.zIndex="50")}}function w0(){const n=document.getElementById("eventBanner"),e=document.getElementById("closeEventBanner"),t=n?n.querySelector("p"):null;Xf(Ui(cn,"siteConfig","banner")).then(s=>{if(s.exists()){const r=s.data();r.active&&r.text&&t&&n&&(t.innerHTML=r.text,n.classList.add("banner-active"),!od&&p.currentTab==="blueprints"&&n.classList.remove("hidden"))}}).catch(s=>console.debug("Banner fetch skipped",s)),e&&(e.onclick=()=>{n&&n.classList.add("hidden"),od=!0})}function E0(){const n=document.getElementById("submitLocationFab"),e=document.getElementById("collectToast");document.getElementById("collectToastText"),document.getElementById("collectToastProgress");const t=document.getElementById("submitModal"),s=document.getElementById("closeSubmitModal"),r=document.getElementById("submitLocationForm");document.getElementById("submitBlueprintName"),n&&(n.onclick=()=>ad()),e&&(e.onclick=()=>{$i(),vi&&ad(vi)}),s&&(s.onclick=()=>aa()),t&&(t.onclick=i=>{i.target===t&&aa()}),r&&(r.onsubmit=async i=>{i.preventDefault(),await x0()}),A0(),Z0()}function v0(){const n=document.getElementById("submitBlueprintName");if(!(!n||!p.all||p.all.length===0)){n.innerHTML='<option value="">Select a Blueprint...</option>';for(const e of p.all){const t=document.createElement("option");t.value=e.name,t.textContent=e.name,n.appendChild(t)}}}function ad(n=null){const e=document.getElementById("submitModal"),t=document.getElementById("submitBlueprintName");v0(),n&&t&&(t.value=n),e&&(e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden")}function aa(){const n=document.getElementById("submitModal"),e=document.getElementById("submitLocationForm");if(n&&(n.classList.add("hidden"),n.classList.remove("flex"),document.body.style.overflow=""),e){e.reset();const t=document.getElementById("submitTrialsReward"),s=document.getElementById("submitQuestReward");t&&(t.checked=!1),s&&(s.checked=!1)}vi=null,Tm(),Ec(),window.clearMapSelection&&window.clearMapSelection()}const I0="https://docs.google.com/spreadsheets/d/e/2PACX-1vQbaBK3sAyL1kD1-NanKQgkyzerRXtQUReQu57W_xn68GxST_A4Ws1z3iwOAOZJ52-ZBztvGiDq16Go/pub?output=csv",Im="./images/Containers/";async function b0(){var n,e,t;if(p.containers||(p.containers=[],p.containersLoaded=!1),!(p.containersLoaded&&p.containers.length>0))try{const i=(await(await fetch(I0)).text()).split(/\r?\n/).filter(a=>a.trim());if(i.length<2)return;p.containers=[];for(let a=1;a<i.length;a++){const c=T0(i[a]);c.length>=4&&c[0]&&p.containers.push({name:c[0].trim(),lootPool:((n=c[1])==null?void 0:n.trim())||"Standard",tags:((e=c[2])==null?void 0:e.trim().toLowerCase())||"",image:((t=c[3])==null?void 0:t.trim())||""})}p.containersLoaded=!0}catch(s){console.error("Failed to fetch containers:",s)}}function T0(n){const e=[];let t="",s=!1;for(let r=0;r<n.length;r++){const i=n[r];i==='"'?s=!s:i===","&&!s?(e.push(t),t=""):t+=i}return e.push(t),e}function A0(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("clearContainerBtn"),s=document.getElementById("containerPickerModal"),r=document.getElementById("closeContainerPickerBtn"),i=document.getElementById("containerPickerSearch");document.getElementById("containerPickerGrid");const a=document.getElementById("containerPickerCustomBtn"),c=document.getElementById("hideCustomContainerBtn");n&&n.addEventListener("click",async()=>{await cd()}),e&&e.addEventListener("click",async l=>{l.target.closest("#clearContainerBtn")||await cd()}),r&&r.addEventListener("click",()=>{Xr()}),t&&t.addEventListener("click",l=>{l.stopPropagation(),Tm()}),i&&i.addEventListener("input",l=>{bm(l.target.value)}),a&&a.addEventListener("click",()=>{Xr(),S0()}),c&&c.addEventListener("click",()=>{Ec()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&s&&!s.classList.contains("hidden")&&Xr()})}async function cd(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(await b0(),n.classList.remove("hidden"),n.classList.add("flex"),bm(""),setTimeout(()=>{e&&e.focus()},200))}function Xr(){const n=document.getElementById("containerPickerModal"),e=document.getElementById("containerPickerSearch");n&&(n.classList.add("hidden"),n.classList.remove("flex"),e&&(e.value=""))}function bm(n){const e=document.getElementById("containerPickerGrid");if(!e||!p.containers)return;const t=n.toLowerCase().trim(),s=p.containers.filter(r=>t?r.name.toLowerCase().includes(t)||r.tags.includes(t):!0);if(e.innerHTML="",s.length===0){e.innerHTML=`
      <div class="col-span-full py-12 text-center text-zinc-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p class="text-sm">No containers found for "${n}"</p>
      </div>
    `;return}for(const r of s){const i=document.createElement("div");i.className="container-picker-card",i.innerHTML=`
      <img src="${Im}${r.image}" alt="${r.name}" loading="lazy" class="w-full h-24 object-cover rounded-lg mb-1.5" />
      <div class="card-name text-white leading-tight font-bold">${r.name}</div>
      <div class="card-pool text-zinc-400 mt-0.5">${r.lootPool}</div>
    `,i.addEventListener("click",()=>{C0(r)}),e.appendChild(i)}}function C0(n){const e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay"),s=document.getElementById("selectedContainerImg"),r=document.getElementById("selectedContainerName"),i=document.getElementById("submitContainer");e&&e.classList.add("hidden"),t&&(t.classList.remove("hidden"),t.classList.add("flex")),s&&(s.src=Im+n.image),r&&(r.textContent=n.name),i&&(i.value=n.name),Xr(),Ec()}function Tm(){const n=document.getElementById("openContainerPickerBtn"),e=document.getElementById("selectedContainerDisplay"),t=document.getElementById("submitContainer");n&&n.classList.remove("hidden"),e&&(e.classList.add("hidden"),e.classList.remove("flex")),t&&(t.value="")}function S0(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("selectedContainerDisplay");n&&n.classList.remove("hidden"),e&&e.classList.add("hidden"),t&&(t.classList.add("hidden"),t.classList.remove("flex"))}function Ec(){const n=document.getElementById("customContainerForm"),e=document.getElementById("openContainerPickerBtn"),t=document.getElementById("customContainerName"),s=document.getElementById("customContainerDescription"),r=document.getElementById("customContainerScreenshot");n&&n.classList.add("hidden"),e&&e.classList.remove("hidden"),t&&(t.value=""),s&&(s.value=""),r&&(r.value="")}function R0(){const n=document.getElementById("customContainerForm"),e=document.getElementById("customContainerName");if(n&&!n.classList.contains("hidden")&&(e!=null&&e.value.trim()))return`CUSTOM: ${e.value.trim()}`;const t=document.getElementById("submitContainer");return(t==null?void 0:t.value)||""}function k0(){const n=document.getElementById("showWrappedBtn"),e=document.getElementById("wrappedModal"),t=document.getElementById("closeWrappedBtn"),s=document.getElementById("downloadWrappedBtn");if(!n||!e)return;const r=d=>{const f=document.getElementById("wrappedOuterContainer"),m=document.getElementById("wrappedInner"),y=document.getElementById("wrappedContent"),v=document.getElementById("wrappedShimmer"),b=document.getElementById("wrappedActions"),R=document.getElementById("captureModeActions"),C=document.getElementById("wrappedModal");if(d){const P=window.innerWidth/896;if(f&&(f.style.setProperty("background","none","important"),f.style.setProperty("box-shadow","none","important"),f.style.setProperty("padding","0","important"),f.style.setProperty("border-radius","0","important")),m){m.style.setProperty("width","896px","important"),m.style.setProperty("transform",`scale(${P})`,"important"),m.style.setProperty("transform-origin","top center","important"),m.style.setProperty("gap","0","important");const N=896*(1-P);m.style.setProperty("margin-bottom",`- ${N} px`,"important")}y&&y.style.setProperty("border-radius","0","important"),v&&v.classList.add("hidden"),b&&b.classList.add("hidden"),R&&R.classList.remove("hidden"),C&&(C.style.setProperty("padding","0","important"),C.style.setProperty("overflow-x","hidden","important"),C.style.setProperty("overflow-y","hidden","important"),C.scrollTo(0,0))}else{if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<800){const N=(window.innerWidth-32)/896;if(m){m.style.setProperty("width","896px","important"),m.style.setProperty("transform",`scale(${N})`,"important"),m.style.setProperty("transform-origin","top center","important"),m.style.removeProperty("gap");const V=896*(1-N);m.style.setProperty("margin-bottom",`- ${V} px`,"important")}}else m&&(m.style.removeProperty("width"),m.style.removeProperty("transform"),m.style.removeProperty("transform-origin"),m.style.removeProperty("gap"),m.style.removeProperty("margin-bottom"));f&&(f.style.removeProperty("background"),f.style.removeProperty("box-shadow"),f.style.removeProperty("padding"),f.style.removeProperty("border-radius")),y&&y.style.removeProperty("border-radius"),v&&v.classList.remove("hidden"),b&&b.classList.remove("hidden"),R&&R.classList.add("hidden"),C&&(C.style.removeProperty("padding"),C.style.removeProperty("overflow-x"),C.style.removeProperty("overflow-y"),setTimeout(()=>C.scrollTo(0,0),20))}},i=document.getElementById("exitCaptureBtn");i&&(i.onclick=()=>r(!1));const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;if(a&&s){const d=s.cloneNode(!0);s.parentNode.replaceChild(d,s),d.innerHTML='< svg class="w-5 h-5" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg > Fullscreen for Screenshot',d.className="flex-[2] md:flex-none px-8 py-3 h-14 md:h-auto text-xl md:text-base rounded-full bg-emerald-600 text-white font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 flex items-center justify-center gap-2 active:scale-95 transition-transform",d.onclick=()=>r(!0)}if(n.onclick=async()=>{const d=document.getElementById("submitLocationFab");d&&d.classList.add("hidden"),Qe.currentUser&&(n.disabled=!0,n.textContent="Loading Data...",await m0(),n.disabled=!1,n.innerHTML='< svg class= "w-4 h-4" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg > View My Blueprint Wrapped 2025',n.className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-[10px] sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95");const f=p.all.length,m=new Set(p.all.map(q=>q.name)),y=[...p.collectedItems].filter(q=>m.has(q)).length,v=f>0?Math.round(y/f*100):0;document.getElementById("wrappedPercent").textContent=`${v}% `;const b=document.getElementById("wrappedProgressBar");b&&(b.style.width=`${v}% `);const R=p.all.filter(q=>/weapon/i.test(q.type)).length,C=p.all.filter(q=>/weapon/i.test(q.type)&&p.collectedItems.has(q.name)).length,P=p.all.filter(q=>/augment/i.test(q.type)).length,N=p.all.filter(q=>/augment/i.test(q.type)&&p.collectedItems.has(q.name)).length,V={};p.wrappedData.contributions&&p.wrappedData.contributions.forEach(q=>{q.map&&(V[q.map]=(V[q.map]||0)+1)});const M=Object.entries(V).sort((q,re)=>re[1]-q[1])[0];document.getElementById("wrappedPercent").textContent=`${v}% `;const O=document.getElementById("wrappedStatsGrid");O.innerHTML="";const F=[];p.wrappedData.contributionCount>0&&F.push({value:p.wrappedData.contributionCount,label:"Locations<br>Reported",color:"text-emerald-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg > '}),M&&M[0]&&F.push({value:M[0],label:"Best<br>Map",color:"text-purple-400",icon:'< svg class="w-4 h-4" fill = "currentColor" viewBox = "0 0 24 24" > <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" /></svg > ',smallText:!0}),F.push({value:`${y}/${f}`,label:"Blueprints<br>Collected",color:"text-white",icon:'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'}),F.push({value:`${C}/${R}`,label:"Weapons<br>Collected",color:"text-amber-400",icon:'<img src="icons/ItemCategory_Weapon.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(67%) sepia(74%) saturate(575%) hue-rotate(360deg) brightness(101%) contrast(101%);" alt="Weapon">'}),F.push({value:`${N}/${P}`,label:"Augments<br>Collected",color:"text-cyan-400",icon:'<img src="icons/ItemCategory_Augment.webp" class="w-5 h-5 object-contain" style="filter: brightness(0) saturate(100%) invert(76%) sepia(32%) saturate(1057%) hue-rotate(152deg) brightness(95%) contrast(92%);" alt="Augment">'}),F.forEach((q,re)=>{const ie=document.createElement("div");ie.className="rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center flex-1 min-w-[90px]";const se=120+Math.floor(Math.random()*30);ie.style.boxShadow="inset 0 0 15px rgba(255, 255, 255, 0.03)";const ue="rgba(16, 185, 129, 0.4)",it="rgba(52, 211, 153, 0.4)";re%2===0?ie.style.background=`linear-gradient(${se}deg, ${ue}, ${ue}), #09090b`:ie.style.background=`linear-gradient(${se}deg, ${ue}, ${it} 50%, ${ue}), #09090b`;const ot=q.icon.replace("w-4 h-4","w-6 h-6").replace("w-5 h-5","w-7 h-7");ie.innerHTML=`
        <div class="${q.color} mb-1 drop-shadow-md">
          ${ot}
        </div>
        <span class="${q.smallText?"text-xl":"text-3xl"} font-hud font-bold ${q.color} drop-shadow-lg">${q.value}</span>
        <div class="text-xs text-zinc-300 uppercase font-tabs font-bold tracking-wider text-center leading-tight drop-shadow-md opacity-90">${q.label}</div>
      `,O.appendChild(ie)});const E=document.getElementById("wrappedHighlights");E.innerHTML="";const g=["Bobcat","Looting Mk. 3 (Survivor)","Aphelion","Equalizer","Jupiter","Combat Mk. 3 (Aggressive)","Combat Mk. 3 (Flanking)","Vulcano","Snap Hook","Deadline","Wolfpack","Tactical Mk. 3 (Defensive)","Tactical Mk. 3 (Healing)","Venator","Tempest","Torrente","Bettina","Anvil","Osprey"];let w=p.all.filter(q=>p.collectedItems.has(q.name)&&!/mod|material|parts|component|attachment|misc/i.test(q.type));w.sort((q,re)=>{const ie=g.indexOf(q.name),se=g.indexOf(re.name);return ie!==-1&&se!==-1?ie-se:ie!==-1?-1:se!==-1?1:et(re.rarity)-et(q.rarity)});const A=w.slice(0,8);A.length===0&&(E.innerHTML='<div class="text-zinc-500 text-xs w-full text-center py-4 italic">No rare blueprints collected yet... keep hunting!</div>'),A.forEach(q=>{const re=Pe(q.rarity),ie=document.createElement("div");ie.className="card-compact w-full p-2";const se=document.createElement("div");se.className="rarity-frame rarity-glow relative overflow-hidden",se.style.borderColor=re;const ue=document.createElement("div");ue.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",ue.style.background=`
        linear-gradient(to top right, ${re}44 0%, rgba(24,24,27,0.5) 75%),
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
        url('Background/Arc BP Image Background.webp')
      `,ue.style.backgroundSize="cover, cover, cover",ue.style.backgroundPosition="center, center, center";const it=document.createElement("img");it.src=q.img||"",it.className="w-full h-full object-contain p-2 relative z-10";const ot=document.createElement("div");ot.className="rarity-corner",ot.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${re}66 60%, ${re}cc 100%)`;const Ne=document.createElement("div");Ne.className="type-tab";const Nt=110+Math.floor(Math.random()*40);Ne.style.background=`linear-gradient(${Nt}deg, ${re}99, ${re}66), #09090b`,Ne.style.borderColor=re,Ne.style.maxWidth="90%";const It=document.createElement("img");It.src=q.typeIcon||vc(q.type),It.className="w-5 h-5 object-contain shadow-sm drop-shadow-md";const _e=document.createElement("span");_e.textContent=q.name,Ne.style.maxWidth="96%",Ne.style.paddingRight="10px",Ne.style.whiteSpace="normal",Ne.style.overflow="visible";let Dt="15px",Mt="normal";q.name.length>25?(Dt="9px",Mt="1"):q.name.length>15?(Dt="10px",Mt="1.1"):q.name.length>12&&(Dt="12px",Mt="1.2"),_e.style.fontSize=Dt,_e.style.lineHeight=Mt,_e.style.whiteSpace="normal",_e.style.textOverflow="clip",_e.style.overflow="visible",_e.className="ml-1.5 font-black uppercase tracking-wide drop-shadow-lg text-white whitespace-normal break-words text-left",Ne.appendChild(It),Ne.appendChild(_e),ue.appendChild(it),ue.appendChild(ot),ue.appendChild(Ne),se.appendChild(ue);const hs=document.createElement("div");hs.className="mt-2 px-1 pb-1 text-center";const Vn=document.createElement("div");Vn.className="font-semibold leading-tight text-white",Vn.style.fontSize="14px",Vn.textContent=q.name,hs.appendChild(Vn),ie.appendChild(se),E.appendChild(ie)});const I=document.getElementById("gamertagModal"),S=document.getElementById("gamertagInput"),T=document.getElementById("skipGamertagBtn"),ne=document.getElementById("confirmGamertagBtn");S.value="";const ye=q=>{try{console.log("[ProceedToWrapped] Starting...",q),I.classList.add("hidden"),I.classList.remove("flex");const re=document.getElementById("wrappedContent"),ie=document.getElementById("wrappedGamertag");if(ie&&ie.remove(),q&&q.trim()){const se=document.createElement("div");se.id="wrappedGamertag",se.className="absolute top-4 right-4 p-[2px] rounded-full z-50",se.style.background="linear-gradient(135deg, rgba(16,185,129,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(16,185,129,0.6) 100%)",se.style.boxShadow="0 0 20px rgba(16,185,129,0.4)";const ue=document.createElement("div");ue.className="bg-black/50 backdrop-blur-xl px-6 py-2.5 rounded-full text-white font-bold text-lg",ue.textContent="@"+q.trim(),se.appendChild(ue),re.appendChild(se)}console.log("[ProceedToWrapped] Calling toggleCaptureMode(false)..."),r(!1),console.log("[ProceedToWrapped] Showing modal..."),e.classList.remove("hidden"),e.classList.add("flex","items-center","justify-center"),document.body.style.overflow="hidden",console.log("[ProceedToWrapped] Done!")}catch(re){console.error("[ProceedToWrapped] CRITICAL ERROR:",re),alert("Error loading wrapped view. Check console.")}};T.onclick=()=>ye(""),ne.onclick=()=>ye(S.value),S.onkeydown=q=>{q.key==="Enter"&&ye(S.value)},I.classList.remove("hidden"),I.classList.add("flex","items-center","justify-center"),S.focus()},t&&(t.onclick=()=>{r(!1),e.classList.add("hidden"),e.classList.remove("flex","items-center","justify-center"),document.body.style.overflow="";const d=document.getElementById("submitLocationFab");d&&p.currentTab==="blueprints"&&d.classList.remove("hidden")},document.addEventListener("keydown",d=>{d.key==="Escape"&&!e.classList.contains("hidden")&&t.click()})),s){const d=m=>{try{const y=document.createElement("canvas");return y.width=m.naturalWidth,y.height=m.naturalHeight,y.getContext("2d").drawImage(m,0,0),y.toDataURL("image/png")}catch(y){return console.warn("Canvas base64 failed",y),null}},f=async m=>{try{const v=await(await fetch(m)).blob();return new Promise(b=>{const R=new FileReader;R.onloadend=()=>b(R.result),R.readAsDataURL(v)})}catch(y){return console.error("Fetch base64 failed",y),m}};a||(s.onclick=async()=>{const m=document.getElementById("wrappedContent");if(!m)return;const y=s.textContent;s.disabled=!0,s.textContent="Baking...";const v=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,b=m.cloneNode(!0);b.style.position="fixed",b.style.top="0",b.style.left="0",b.style.width=m.offsetWidth+"px",b.style.height=m.offsetHeight+"px",b.style.zIndex="-9999",b.style.opacity="1",b.style.pointerEvents="none",b.style.transform="none",b.style.margin="0",b.style.backgroundColor="#09090b",document.body.appendChild(b);try{console.group("iOS Robust Baking");const R=b.querySelectorAll("img");for(let E of R)if(E.src&&!E.src.startsWith("data:")){const g=Array.from(m.querySelectorAll("img")).find(w=>w.src===E.src);if(g&&g.complete){const w=d(g);w&&(E.src=w)}else if(g){await new Promise(A=>{g.onload=A,g.onerror=A});const w=d(g);w&&(E.src=w)}}const C="Arc BP Image Background.webp",P=await f("Background/"+C);[b,...Array.from(b.querySelectorAll("*"))].forEach(E=>{const g=window.getComputedStyle(E).backgroundImage;if(g&&g.toLowerCase().includes(C.toLowerCase())){const w=new RegExp(`url\\((['"]?)([^'"\\)]*?${C.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})(\\1)\\)`,"gi");E.style.backgroundImage=g.replace(w,`url("${P}")`),E.style.backgroundSize="cover",E.style.backgroundPosition="center"}}),console.info("Baking complete. Starting capture..."),console.groupEnd(),s.textContent=v?"Processing...":"Generating...";const V=Math.max(m.offsetWidth,m.offsetHeight),M={width:V,height:V,pixelRatio:2,cacheBust:!0,style:{borderRadius:"0",width:`${V}px`,height:`${V}px`,transform:"none"}};if(v)try{await htmlToImage.toCanvas(b,M)}catch{}await htmlToImage.toSvg(b,M),await new Promise(E=>setTimeout(E,v?3e3:1e3));const O=await htmlToImage.toPng(b,M);if(!O||O.length<5e4)throw new Error("Captured image is too small or black.");const F=document.createElement("a");F.download="arc-raiders-wrapped-2025.png",F.href=O,F.click()}catch(R){console.error("Capture error:",R),alert("Download failed on this device. Please take a screenshot instead - sorry!")}finally{b.parentNode&&b.parentNode.removeChild(b),s.disabled=!1,s.textContent=y}})}const c=()=>{const d=e.querySelector(".w-\\[896px\\]");if(!d||e.classList.contains("hidden"))return;d.style.transform="none",d.style.margin="0";const f=40,m=window.innerHeight-f,y=window.innerWidth-f,v=d.scrollHeight,b=d.scrollWidth,R=m/v,C=y/b,P=Math.min(C,R,1);if(P<1){d.style.transformOrigin="center center",d.style.transform=`scale(${P})`;const N=b*(1-P),V=v*(1-P);d.style.marginLeft=`-${N/2}px`,d.style.marginRight=`-${N/2}px`,d.style.marginTop=`-${V/2}px`,d.style.marginBottom=`-${V/2}px`,d.style.willChange="transform"}else d.style.transform="none",d.style.margin="0",d.style.willChange="auto"};window.addEventListener("resize",c),new MutationObserver(d=>{d.forEach(f=>{f.type==="attributes"&&f.attributeName==="class"&&(e.classList.contains("hidden")||requestAnimationFrame(()=>{requestAnimationFrame(c)}))})}).observe(e,{attributes:!0})}const ld="arc_read_posts_v1";function P0(){const n=document.getElementById("announcementsBtn"),e=document.getElementById("announcementsDrawer"),t=document.getElementById("closeAnnouncementsBtn"),s=e?e.querySelector(":scope > div:first-child"):null,r=e?e.querySelector(":scope > div:last-child"):null,i=document.getElementById("announcementsFeed"),a=document.getElementById("newsBadge");let c=new Set;try{const C=localStorage.getItem(ld);C&&(c=new Set(JSON.parse(C)))}catch(C){console.error("Failed to load read posts",C)}const l=()=>{localStorage.setItem(ld,JSON.stringify(Array.from(c)))},d=()=>{const C=i?i.querySelectorAll(".announcement-card"):[];let P=0;C.forEach(N=>{const V=N.dataset.id,M=N.querySelector(".unread-dot");c.has(V)?(M&&M.classList.add("hidden"),N.classList.add("read")):(M&&M.classList.remove("hidden"),P++)}),a&&(P>0?(a.textContent=P,a.classList.remove("hidden")):a.classList.add("hidden"))},f=document.getElementById("devResetAnnouncements");f&&(f.onclick=C=>{C.stopPropagation(),c.clear(),l(),i&&i.querySelectorAll(".announcement-body").forEach(P=>{P.classList.add("max-h-0","opacity-0"),P.classList.remove("max-h-[1500px]","opacity-100")}),d()});const m=document.getElementById("markAllReadBtn");m&&(m.onclick=C=>{C.stopPropagation(),(i?i.querySelectorAll(".announcement-card"):[]).forEach(N=>{const V=N.dataset.id;V&&c.add(V)}),l(),d()});const y=C=>{C.stopPropagation(),R();const P=document.getElementById("tabCollection");P&&P.click();const N=document.getElementById("showWrappedBtn");N&&N.click()},v=document.getElementById("generateWrappedFromNews");if(v&&(v.onclick=y),i&&d(),!n||!e||!t||!s||!r)return;const b=()=>{e.classList.remove("hidden"),requestAnimationFrame(()=>{s.classList.remove("opacity-0"),r.classList.remove("translate-x-full")}),document.body.style.overflow="hidden"},R=()=>{s.classList.add("opacity-0"),r.classList.add("translate-x-full"),setTimeout(()=>{e.classList.add("hidden"),document.body.style.overflow=""},300)};n.onclick=b,t.onclick=R,s.onclick=R,document.addEventListener("keydown",C=>{C.key==="Escape"&&!e.classList.contains("hidden")&&R()}),i&&(i.onclick=C=>{const P=C.target.closest(".announcement-card");if(!P)return;const N=P.querySelector(".announcement-body"),V=P.dataset.id;if(!N)return;!N.classList.contains("max-h-0")?(N.classList.add("max-h-0","opacity-0"),N.classList.remove("max-h-[1500px]","opacity-100")):(N.classList.remove("max-h-0","opacity-0"),N.classList.add("max-h-[1500px]","opacity-100"),c.has(V)||(c.add(V),l(),d()))})}function Am(n){const e=document.getElementById("collectToast"),t=document.getElementById("collectToastText"),s=document.getElementById("collectToastProgress"),r=document.getElementById("submitLocationFab");!e||!t||!s||(wn&&(clearTimeout(wn),wn=null),vi=n,t.textContent=`${n} Collected? Tell us where!`,e.classList.remove("hidden"),r&&window.innerWidth<=768&&r.classList.add("hidden"),s.style.transition="none",s.style.width="100%",requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.style.transition="width 10000ms linear",s.style.width="0%"})}),wn=setTimeout(()=>{$i()},1e4))}function $i(){const n=document.getElementById("collectToast"),e=document.getElementById("collectToastProgress"),t=document.getElementById("submitLocationFab");n&&n.classList.add("hidden"),e&&(e.style.transition="none",e.style.width="100%"),t&&p.currentTab==="blueprints"&&window.innerWidth<=768&&t.classList.remove("hidden"),wn&&(clearTimeout(wn),wn=null)}async function x0(){var y,v,b,R,C,P,N,V,M,O,F,E;const n=(y=document.getElementById("submitBlueprintName"))==null?void 0:y.value,e=(v=document.getElementById("submitMapId"))==null?void 0:v.value,t=(b=document.getElementById("submitMapX"))==null?void 0:b.value,s=(R=document.getElementById("submitMapY"))==null?void 0:R.value,r=((C=document.getElementById("submitMapLayer"))==null?void 0:C.value)||"0",i=(P=document.getElementById("submitCondition"))==null?void 0:P.value,a=(N=document.getElementById("submitNotes"))==null?void 0:N.value,c=R0(),l=((V=document.getElementById("submitTrialsReward"))==null?void 0:V.checked)||!1,d=((M=document.getElementById("submitQuestReward"))==null?void 0:M.checked)||!1;if(!n){alert("Please select a Blueprint Name.");return}async function f(g){return new Promise((w,A)=>{const I=new FileReader;I.readAsDataURL(g),I.onload=S=>{const T=new Image;T.src=S.target.result,T.onload=()=>{const ne=document.createElement("canvas"),ye=1920;let q=T.width,re=T.height;q>ye&&(re*=ye/q,q=ye),ne.width=q,ne.height=re,ne.getContext("2d").drawImage(T,0,0,q,re),ne.toBlob(se=>{w(se)},"image/webp",.8)},T.onerror=ne=>A(ne)},I.onerror=S=>A(S)})}if(!(e||i||a||c||l||d)){alert("Please provide at least one detail (Map, Condition, Notes, Container, or Reward Type).");return}try{const g=document.getElementById("customContainerForm"),w=document.getElementById("customContainerName"),A=document.getElementById("customContainerDescription");if(g&&!g.classList.contains("hidden")&&(w!=null&&w.value.trim()))try{let I="";const S=document.getElementById("customContainerScreenshot");if(((O=S==null?void 0:S.files)==null?void 0:O.length)>0){const T=S.files[0];console.log("Compressing screenshot...");const ne=await f(T),ye=w.value.trim(),re=`${ye.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}_${Date.now()}.webp`,ie=Jb(r0,`custom_containers/${re}`);console.log("Uploading screenshot...");const se=(A==null?void 0:A.value.trim())||"",ue={contentType:"image/webp",customMetadata:{containerName:ye,description:se,submittedAt:new Date().toISOString()}};await Xb(ie,ne,ue),I=await Yb(ie),console.log("Upload complete:",I)}await Ju(tr(cn,"containerSubmissions"),{name:w.value.trim(),description:(A==null?void 0:A.value.trim())||"",screenshotUrl:I,submittedAt:new Date().toISOString(),userId:((F=Qe.currentUser)==null?void 0:F.uid)||"anonymous"}),console.log("Custom container submitted successfully")}catch(I){console.error("Failed to submit custom container:",I)}await Ju(tr(cn,"blueprintSubmissions"),{blueprintName:n||"",map:e||"",condition:i||"",location:a||"",container:c.replace("CUSTOM: ","")||"",trialsReward:l,questReward:d,submittedAt:new Date().toISOString(),userId:((E=Qe.currentUser)==null?void 0:E.uid)||"anonymous",mapX:t||"",mapY:s||"",mapLayer:parseInt(r)||0}),aa(),N0()}catch(g){console.error("Error submitting blueprint location:",g),alert("Failed to submit. Please try again.")}}async function L0(n,e){console.log(`[Heatmap] Fetching for ${n} on ${e}`);try{const t=uc(tr(cn,"blueprintSubmissions"),Ei("blueprintName","==",n),Ei("map","==",e)),s=await hc(t);console.log(`[Heatmap] Snapshot size: ${s.size}`);const r=[];return s.forEach(i=>{const a=i.data();a.mapX&&a.mapY&&a.mapX!==""&&a.mapY!==""&&r.push({x:Number(a.mapX),y:Number(a.mapY),value:1})}),console.log(`[Heatmap] Processed data length: ${r.length}`,r),r}catch(t){return console.error("Error fetching heatmap data:",t),[]}}function N0(){const n=document.getElementById("successToast"),e=document.getElementById("successToastProgress");!n||!e||(e.classList.remove("animate"),e.offsetWidth,e.classList.add("animate"),n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},5e3))}function D0(n,e){if(n&&(n.startsWith("./images/")||n.includes("/arcblueprinttracker/images/")))return n;let t="";n&&(t=n.split("?")[0].split("/").pop()||""),t=ia(t);const s=ia((e||"").trim());if(rd[s]){const i=rd[s];if(bt.has(i))return Ps+bt.get(i);for(const[a,c]of bt.entries())if(a.startsWith(i))return Ps+c}const r=[t.toLowerCase(),s.toLowerCase()];for(const i of r)if(i&&bt.has(i))return Ps+bt.get(i);for(const i of r)if(i){for(const[a,c]of bt.entries())if(a===i||a.startsWith(i))return Ps+c}return s?Ps+s+".webp":""}const Or={min:70,max:220,step:10,default:160,storageKey:"arc_gridSize_v2"};function M0(n,e){let t;return function(...s){const r=this;clearTimeout(t),t=setTimeout(()=>n.apply(r,s),e)}}const Cm=M0(oa,2e3),En={Common:{color:"#717471",rank:1},Uncommon:{color:"#41EB6A",rank:2},Rare:{color:"#1ECBFC",rank:3},Epic:{color:"#D8299B",rank:4},Legendary:{color:"#FBC700",rank:5}},ca={Confirmed:En.Legendary.color,"Very High":En.Epic.color,Confident:En.Rare.color,Low:En.Uncommon.color,"Not Enough Data":"#E11D48"},V0=[{re:/weapon/i,file:"ItemCategory_Weapon.webp"},{re:/grenade/i,file:"ItemCategory_Grenade.webp"},{re:/quick\s*use|quickuse|consumable|med|healing|vita|tool|utility/i,file:"ItemCategory_QuickUse.webp"},{re:/augment/i,file:"ItemCategory_Augment.webp"},{re:/mod|attachment|barrel|muzzle|brake|choke|silencer|stock|grip|mag/i,file:"ItemCategory_Mod.webp"},{re:/material|parts|craft|component/i,file:"ItemCategory_Material.webp"},{re:/misc|key|trinket|other/i,file:"ItemCategory_Misc.webp"}];function lt(n){return c0+encodeURIComponent(n)}function O0(n){const e=Math.max(Or.min,Math.min(Or.max,Number(n)||Or.default));document.documentElement.style.setProperty("--cardSize",`${e}px`);const t=document.getElementById("grid");t&&(t.style.gridTemplateColumns=`repeat(auto-fill, minmax(${e}px, 1fr))`);try{localStorage.setItem(Or.storageKey,String(e))}catch{}const s=document.getElementById("gridSizeLabel"),r=document.getElementById("gridSizeLabelMobile");s&&(s.textContent=`${e}px`),r&&(r.textContent=`${e}px`)}function vc(n){const e=(n||"").toString().trim(),t=e.toLowerCase().replace(/\s+/g,"");if(t==="weapon")return lt("ItemCategory_Weapon.webp");if(t==="grenade")return lt("ItemCategory_Grenade.webp");if(t==="quickuse")return lt("ItemCategory_QuickUse.webp");if(t==="mod")return lt("ItemCategory_Mod.webp");if(t==="augment")return lt("ItemCategory_Augment.webp");if(t==="material")return lt("ItemCategory_Material.webp");if(t==="misc")return lt("ItemCategory_Misc.webp");for(const s of V0)if(s.re.test(e))return lt(s.file);return lt("ItemCategory_Misc.webp")}function B0(n){const e=je(n);return e?/^https?:\/\//i.test(e)?e:lt(e):""}function je(n){return(n??"").toString().trim()}function Yr(n){return je(n).toLowerCase()}function qe(n,e){const t=n.map(s=>Yr(s));for(const s of e){const r=t.indexOf(Yr(s));if(r!==-1)return n[r]}for(const s of e){const r=Yr(s),i=t.findIndex(a=>a.includes(r));if(i!==-1)return n[i]}return null}function F0(n){const e=je(n);if(!e)return"";const t=e[0].toUpperCase()+e.slice(1).toLowerCase();if(En[t])return t;const s={Legend:"Legendary",Leg:"Legendary"};return s[t]?s[t]:t}function Pe(n){var e;return((e=En[n])==null?void 0:e.color)||"#3f3f46"}function et(n){var e;return((e=En[n])==null?void 0:e.rank)||0}const p={all:[],filtered:[],columns:{},currentTab:"blueprints",collectedItems:new Set,wishlistedItems:new Set,filters:{rarities:new Set,types:new Set,maps:new Set,conds:new Set,confs:new Set,search:"",sort:"rarity_desc",collected:"all"},facets:{rarities:[],types:[],maps:[],types:[],conds:[],confs:[]},wrappedData:{contributionCount:0,loading:!1},spares:{},massCollectMode:!1};function U0(){return new URL(window.location.href).searchParams.get("csv")||a0}function Br(n){const e=document.getElementById("metaLine"),t=document.getElementById("metaLineMobile");e&&(e.textContent=n),t&&(t.textContent=n)}function z0(){p.massCollectMode=!p.massCollectMode;const n=document.getElementById("toggleMassCollectBtn"),e=document.getElementById("grid");p.massCollectMode?(n&&(n.innerHTML=`
        <svg class="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <div class="flex flex-col text-left leading-none text-emerald-400 whitespace-nowrap">
          <span>Done</span>
          <span>Collecting</span>
        </div>
      `,n.classList.add("bg-emerald-500/10","border-emerald-500/50"),n.classList.remove("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.add("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const s=t.parentNode.dataset.name;s&&Tn(t,s)})):(n&&(n.innerHTML=`
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <div class="flex flex-col text-left leading-none whitespace-nowrap">
          <span>Mark items</span>
          <span>as Collected</span>
        </div>
      `,n.classList.remove("bg-emerald-500/10","border-emerald-500/50"),n.classList.add("bg-zinc-900/80","border-zinc-800","hover:bg-zinc-800")),e&&e.classList.remove("mass-collect-mode"),document.querySelectorAll(".card-compact .rarity-frame").forEach(t=>{const s=t.parentNode.dataset.name;s&&Tn(t,s)}))}function Sm(){const n=document.getElementById("drawer"),e=document.getElementById("openFiltersBtn"),t=document.getElementById("closeFiltersBtn"),s=document.getElementById("drawerBackdrop");function r(){n.classList.remove("hidden"),document.body.classList.add("no-scroll")}function i(){n.classList.add("hidden"),document.body.classList.remove("no-scroll")}function a(){const O=!n.classList.contains("hidden");n.classList.toggle("hidden"),O?document.body.classList.remove("no-scroll"):document.body.classList.add("no-scroll")}e&&(e.onclick=r);const c=document.getElementById("mobileFilterBtn");c&&(c.onclick=a);const l=document.getElementById("toggleMassCollectBtn");l&&(l.onclick=z0);const d=document.getElementById("desktopFilterBtn"),f=document.getElementById("filtersSidebar");typeof p.filtersOpen>"u"&&(p.filtersOpen=sessionStorage.getItem("filtersOpen")!=="false");const m=()=>{f&&(f.classList.add("hidden"),p.filtersOpen?f.classList.add("md:block"):f.classList.remove("md:block"))};m(),d&&(d.onclick=()=>{p.filtersOpen=!p.filtersOpen,sessionStorage.setItem("filtersOpen",p.filtersOpen),m(),fa(p.currentTab)}),t&&(t.onclick=i),s&&(s.onclick=i);const y=document.getElementById("searchInput"),v=document.getElementById("searchInputMobile"),b=O=>{p.filters.search=O,Ee()};y&&y.addEventListener("input",O=>b(O.target.value)),v&&v.addEventListener("input",O=>{b(O.target.value),y&&(y.value=O.target.value)});const R=document.getElementById("sortSelect"),C=document.getElementById("sortSelectMobile"),P=O=>{p.currentTab==="data"?(p.filters.sortData=O,O==="entries_asc"&&(p.dataSort={column:"rarity",direction:"asc"}),O==="entries_desc"&&(p.dataSort={column:"rarity",direction:"desc"}),O==="name_asc"&&(p.dataSort={column:"name",direction:"asc"}),O==="name_desc"&&(p.dataSort={column:"name",direction:"desc"}),O==="conf_asc"&&(p.dataSort={column:"confidence",direction:"asc"}),O==="conf_desc"&&(p.dataSort={column:"confidence",direction:"desc"}),O==="rarity_asc"&&(p.dataSort={column:"rarity",direction:"asc"}),O==="rarity_desc"&&(p.dataSort={column:"rarity",direction:"desc"}),Lt()):(p.filters.sortBlueprints=O,Ee()),R&&(R.value=O),C&&(C.value=O),He()};R&&(R.onchange=O=>P(O.target.value)),C&&(C.onchange=O=>P(O.target.value)),p.filters.search&&(y&&(y.value=p.filters.search),v&&(v.value=p.filters.search)),p.currentTab==="data"?p.filters.sortData&&(R&&(R.value=p.filters.sortData),C&&(C.value=p.filters.sortData)):p.filters.sortBlueprints&&(R&&(R.value=p.filters.sortBlueprints),C&&(C.value=p.filters.sortBlueprints));const N=()=>{p.filters.rarities.clear(),p.filters.types.clear(),p.filters.maps.clear(),p.filters.conds.clear(),p.filters.confs.clear(),p.filters.search="",p.filters.sortBlueprints="rarity_desc",p.filters.sortData="rarity_desc",y&&(y.value=""),v&&(v.value="");const O="rarity_desc";R&&(R.value=O),C&&(C.value=O),p.filters.collected="all",p.dataSort={column:"rarity",direction:"desc"},p.currentTab==="data"?Lt():Ee(),Oe(),Ic(),He()};["resetBtn","resetBtn2"].forEach(O=>{const F=document.getElementById(O);F&&(F.onclick=N)});const V=(O,F)=>{const E=document.getElementById(O);E&&(E.onclick=()=>{F.clear(),Ee(),Oe(),He()})};V("rarityAllBtn",p.filters.rarities),V("typeAllBtn",p.filters.types),V("mapAllBtn",p.filters.maps),V("condAllBtn",p.filters.conds),V("confAllBtn",p.filters.confs),window.addEventListener("resize",()=>{applyGridSize(currentGridSize)});const M=(O,F,E)=>{const g=document.getElementById(O),w=document.getElementById(F),A=document.getElementById(E);g&&w&&A&&(g.onclick=()=>{w.classList.toggle("hidden"),A.classList.toggle("rotate-180")})};M("toggleRarity","rarityFilters","iconRarity"),M("toggleType","typeFilters","iconType"),M("disclaimerHeader","disclaimerContent","disclaimerIcon"),M("toggleMap","mapFilters","iconMap"),M("toggleCond","condFilters","iconCond"),M("toggleConf","confFilters","iconConf"),M("toggleRarityMobile","rarityFiltersMobile","iconRarityMobile"),M("toggleTypeMobile","typeFiltersMobile","iconTypeMobile"),M("toggleMapMobile","mapFiltersMobile","iconMapMobile"),M("toggleCondMobile","condFiltersMobile","iconCondMobile"),M("toggleConfMobile","confFiltersMobile","iconConfMobile"),document.querySelectorAll("[data-sort]").forEach(O=>{O.onclick=()=>{const F=O.dataset.sort;let E=p.filters.sortData;F==="name"?E=p.filters.sortData==="name_asc"?"name_desc":"name_asc":F==="confidence"&&(E=p.filters.sortData==="conf_desc"?"conf_asc":"conf_desc");const g=document.getElementById("sortSelect"),w=document.getElementById("sortSelectMobile");g&&(g.value=E),w&&(w.value=E),g&&g.onchange({target:{value:E}})}})}async function $0(){Br("Fetching assets...");try{const e="./image-manifest.json?t="+Date.now(),t=await fetch(e);if(t.ok){const s=await t.json();bt.clear();for(const r of s){const a=r.replace(/\.png$|\.webp$|\.jpg$|\.jpeg$/i,"").replace(/_[0-9a-f]{10}$/i,""),c=ia(a).toLowerCase();bt.set(c,r)}console.log(`Loaded ${bt.size} images from manifest.`)}}catch(e){console.warn("Static image manifest not found or failed to load. Falling back to naming convention.",e)}Br("Fetching sheet...");let n=U0();n+=(n.includes("?")?"&":"?")+"t="+Date.now(),Papa.parse(n,{download:!0,header:!0,skipEmptyLines:!0,complete:e=>{var O;const t=e.data||[],s=((O=e.meta)==null?void 0:O.fields)||Object.keys(t[0]||{}),r=qe(s,["Blueprint Name","Item Name","Name","Item"]),i=qe(s,["Item Type","Type"]),a=qe(s,["Item Type Icon","Type Icon","Item Type Icon URL","Type Icon URL","Item Type Icon File","Type Icon File"]),c=qe(s,["Most Likely Map","Map"]),l=qe(s,["Most Likely Condition","Condition"]),d=qe(s,["Most Likely Location","Location"]),f=qe(s,["Most Likely Container","Container"]),m=qe(s,["Image URL","ImageURL","Icon URL","Thumbnail","Image"]),y=qe(s,["Rarity","Item Rarity"]),v=qe(s,["Data Confidence","Confidence"]),b=qe(s,["Item URL","Wiki URL","URL","Link","Wiki"])||s[7],R=qe(s,["Trials Reward","Trial Reward","Trials"])||s[9],C=qe(s,["Quest Reward","Quest"])||s[10],P=qe(s,["Description","Desc","Flavor Text"])||s[11],N=qe(s,["Active","Is Active","Enabled"])||s[12],V=F=>{const E=je(F).toLowerCase();return E==="true"||E==="yes"||E==="1"||E==="x"||E==="âœ“"};p.columns={name:r,type:i,typeIcon:a,map:c,cond:l,loc:d,cont:f,img:m,rarity:y,conf:v,wiki:b};const M=[];for(const F of t){const E=je(F[r]);if(!E)continue;const g=je(F[i]),w=je(F[c]),A=je(F[l]),I=je(F[d]),S=je(F[f]),T=je(F[m]),ne=D0(T,E),ye=F0(F[y]),q=v?je(F[v]):"",re=je(F[b]),se=(a?B0(F[a]):"")||vc(g),ue=R?V(F[R]):!1,it=C?V(F[C]):!1,ot=P?je(F[P]):"",Ne=N?V(F[N]):!0,Nt=w.split(",").map(_e=>_e.trim()).filter(_e=>_e),It=A.split(",").map(_e=>_e.trim()).filter(_e=>_e);M.push({name:E,type:g,map:w,cond:A,loc:I,cont:S,img:ne,rarity:ye,conf:q,wiki:re,typeIcon:se,trialsReward:ue,questReward:it,description:ot,active:Ne,mapList:Nt,condList:It})}p.all=M.filter(F=>F.active!==!1),H0(),Sm(),Ee(),Oe(),Br("")},error:e=>{console.error(e),Br("Failed to load CSV. Check your published link.")}})}function Ro(n){const e=new Set(n.filter(t=>je(t)));return Array.from(e).sort((t,s)=>t.localeCompare(s))}const la=["Confirmed","Very High","Confident","Low","Not Enough Data"],ud=["Augment","Weapon","Quick Use","Grenade","Mod","Material"],q0=["Dam Battlegrounds","Blue Gate","Buried City","Spaceport","Stella Montis"],j0=["Day","Night","Storm","Cold Snap","Harvester","Matriarch","Hidden Bunker","Husk Graveyard","Launch Tower Loot","Locked Gate","Prospecting Probes","Lush Blooms","N/A"];function H0(){p.facets.rarities=Ro(p.all.map(t=>t.rarity)).sort((t,s)=>et(s)-et(t)),p.facets.types=Ro(p.all.map(t=>t.type)).sort((t,s)=>{let r=ud.indexOf(t),i=ud.indexOf(s);return r===-1&&(r=999),i===-1&&(i=999),r-i||t.localeCompare(s)});const n=new Set;p.all.forEach(t=>{t.mapList.forEach(s=>{q0.includes(s)&&n.add(s)})}),p.facets.maps=Array.from(n).sort((t,s)=>t.localeCompare(s));const e=new Set;p.all.forEach(t=>{t.condList.forEach(s=>{j0.includes(s)&&e.add(s)})}),p.facets.conds=Array.from(e).sort((t,s)=>t.localeCompare(s)),p.facets.confs=Ro(p.all.map(t=>t.conf)).sort((t,s)=>{let r=la.indexOf(t),i=la.indexOf(s);return r===-1&&(r=999),i===-1&&(i=999),r-i})}function xs(n,e){n.has(e)?n.delete(e):n.add(e)}function dd(n,e,t){const s=document.createElement("button");return s.className="chip "+(e?"chip-active":""),s.textContent=n,s.onclick=t,s}function Oe(){const n={rarity:[document.getElementById("rarityFilters"),document.getElementById("rarityFiltersMobile")],type:[document.getElementById("typeFilters"),document.getElementById("typeFiltersMobile")],map:[document.getElementById("mapFilters"),document.getElementById("mapFiltersMobile")],cond:[document.getElementById("condFilters"),document.getElementById("condFiltersMobile")],conf:[document.getElementById("confFilters"),document.getElementById("confFiltersMobile")]};for(const e of n.rarity)if(e){e.innerHTML="";for(const t of p.facets.rarities){const s=p.filters.rarities.has(t),r=Pe(t),i=document.createElement("button");i.className="px-3 py-2 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all hover:brightness-125";const a=s?r+"66":r+"22";i.style.background=a,i.style.borderColor=r,i.style.color="#f4f4f5",i.onclick=()=>{xs(p.filters.rarities,t),Ee(),Oe(),He()},i.textContent=t,e.appendChild(i)}}for(const e of n.type)if(e){e.innerHTML="";for(const t of p.facets.types){const s=p.filters.types.has(t),r=document.createElement("button");r.className="relative px-2 py-2 rounded-xl border hover:bg-zinc-800 flex items-center justify-center",r.style.borderColor=s?"rgb(113 113 122)":"rgb(39 39 42)",r.title=t,r.onclick=()=>{xs(p.filters.types,t),Ee(),Oe(),He()};const i=document.createElement("img");i.src=vc(t),i.alt=t,i.className="w-6 h-6",r.appendChild(i),e.appendChild(r)}}for(const e of n.map)if(e){e.innerHTML="";for(const t of p.facets.maps){const s=p.filters.maps.has(t);e.appendChild(dd(t,s,()=>{xs(p.filters.maps,t),Ee(),Oe(),He()}))}}for(const e of n.cond)if(e){e.innerHTML="";for(const t of p.facets.conds){const s=p.filters.conds.has(t);e.appendChild(dd(t,s,()=>{xs(p.filters.conds,t),Ee(),Oe(),He()}))}}for(const e of n.conf)if(e){e.innerHTML="";for(const t of p.facets.confs){if(!t)continue;const s=p.filters.confs.has(t),r=ca[t]||"#71717a",i=document.createElement("button");i.className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs hover:bg-zinc-800",i.style.borderColor=s?r:"rgb(39 39 42)",i.style.background=s?"rgba(255,255,255,0.04)":"rgb(24 24 27)",i.onclick=()=>{xs(p.filters.confs,t),Ee(),Oe(),He()};const a=document.createElement("span");a.className="confidence-dot",a.style.background=r;const c=document.createElement("span");c.textContent=t,i.appendChild(a),i.appendChild(c),e.appendChild(i)}}W0()}function W0(){const n=[document.getElementById("activeChips"),document.getElementById("dataActiveChips")].filter(t=>!!t);n.forEach(t=>t.innerHTML="");const e=(t,s)=>{n.forEach(r=>{const i=document.createElement("button");i.className="chip chip-active",i.textContent=t+" ✕",i.onclick=s,r.appendChild(i)})};if(p.filters.rarities.size&&e(`Rarity: ${Array.from(p.filters.rarities).join(", ")}`,()=>{p.filters.rarities.clear(),Ee(),Oe(),He()}),p.filters.types.size&&e(`Type: ${Array.from(p.filters.types).join(", ")}`,()=>{p.filters.types.clear(),Ee(),Oe(),He()}),p.filters.maps.size&&e(`Map: ${Array.from(p.filters.maps).join(", ")}`,()=>{p.filters.maps.clear(),Ee(),Oe(),He()}),p.filters.conds.size&&e(`Condition: ${Array.from(p.filters.conds).join(", ")}`,()=>{p.filters.conds.clear(),Ee(),Oe(),He()}),p.filters.confs.size&&e(`Confidence: ${Array.from(p.filters.confs).join(", ")}`,()=>{p.filters.confs.clear(),Ee(),Oe(),He()}),p.filters.collected!=="all"){let t="Collected";p.filters.collected==="not-collected"&&(t="Not Collected"),p.filters.collected==="wishlist"&&(t="Wishlist"),p.filters.collected==="spares"&&(t="Has Spares"),e(`Status: ${t}`,()=>{p.filters.collected="all",Ee(),Oe(),Ic(),He()})}p.filters.search.trim()&&e(`Search: ${p.filters.search.trim()}`,()=>{p.filters.search="";const t=document.getElementById("searchInput"),s=document.getElementById("searchInputMobile");t&&(t.value=""),s&&(s.value=""),Ee(),Oe()})}function Ee(){const n=Yr(p.filters.search),e=p.filters.rarities.size>0,t=p.filters.types.size>0,s=p.filters.maps.size>0,r=p.filters.conds.size>0,i=p.filters.confs.size>0;let a=p.all.filter(l=>{if(e&&!p.filters.rarities.has(l.rarity)||t&&!p.filters.types.has(l.type)||s&&!l.mapList.some(m=>p.filters.maps.has(m))||r&&!l.condList.some(m=>p.filters.conds.has(m))||i&&!p.filters.confs.has(l.conf))return!1;const d=p.collectedItems.has(l.name),f=p.wishlistedItems.has(l.name);return!(p.filters.collected==="collected"&&!d||p.filters.collected==="wishlist"&&!f||p.filters.collected==="not-collected"&&d||p.filters.collected==="spares"&&!(p.spares[l.name]>0)||n&&!(l.name+" "+l.type+" "+l.map+" "+l.cond+" "+l.loc+" "+l.cont).toLowerCase().includes(n))});const c=p.filters.sortBlueprints||"rarity_desc";a.sort((l,d)=>c==="name_asc"?l.name.localeCompare(d.name):c==="name_desc"?d.name.localeCompare(l.name):c==="type_asc"?(l.type||"").localeCompare(d.type||""):c==="rarity_asc"?et(l.rarity)-et(d.rarity)||l.name.localeCompare(d.name):et(d.rarity)-et(l.rarity)||l.name.localeCompare(d.name)),p.filtered=a,ua(),p.currentTab==="data"&&Lt()}function ua(){const n=document.getElementById("grid"),e=document.getElementById("emptyState"),t=document.getElementById("resultCount");if(!n)return;if(n.innerHTML="",t&&(t.textContent=`${p.filtered.length} / ${p.all.length}`),!p.filtered.length||p.currentTab!=="blueprints"){n.classList.add("hidden"),e&&p.currentTab==="blueprints"&&e.classList.remove("hidden");return}else n.classList.remove("hidden"),e&&e.classList.add("hidden");n.className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5";const s=[];for(const r of p.filtered){const i=document.createElement("div");i.className="card-compact border border-zinc-800/50 rounded-2xl p-2 opacity-0",i.style.backgroundColor="#0C0C0F",i.style.position="relative",i.style.overflow="visible",i.style.setProperty("--glow-color",Pe(r.rarity)),i.dataset.name=r.name;const a=document.createElement("div");a.className="rarity-frame rarity-glow relative overflow-hidden",a.style.borderColor=Pe(r.rarity);const c=document.createElement("div");c.className="relative aspect-square rounded-[16px] flex items-center justify-center overflow-hidden",c.style.background=`
      linear-gradient(to top right, ${Pe(r.rarity)}44 0%, rgba(24,24,27,0.5) 75%),
      linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
      url('Background/Arc BP Image Background.webp')
    `,c.style.backgroundSize="cover, cover, cover",c.style.backgroundPosition="center, center, center",c.style.backgroundBlendMode="normal, normal, normal",c.style.aspectRatio="1 / 1",c.style.width="100%";const l=document.createElement("img");l.src=r.img||"",l.alt=r.name,l.className="w-full h-full object-contain p-2 relative z-10 pointer-events-none select-none",l.style.width="100%",l.style.height="100%",l.style.objectFit="contain",l.style.padding="8px",l.loading="lazy",l.draggable=!1,l.style.webkitTouchCallout="none",l.style.userSelect="none",l.classList.add("transition-transform","duration-200","ease-out","group-hover:scale-110"),i.classList.add("group");const d=document.createElement("div");d.className="rarity-corner",d.style.background=`radial-gradient(circle at 120% -20%, transparent 0%, transparent 60%, ${Pe(r.rarity)}66 60%, ${Pe(r.rarity)}cc 100%)`;const f=document.createElement("div");f.className="type-tab";const m=ca[r.conf]||"#E11D48";f.style.background=m+"9E",f.style.borderColor=m;const y=document.createElement("span");y.className="text-white font-semibold",y.style.textShadow="0 1px 2px rgba(0,0,0,0.5)",y.textContent=r.conf||"N/A",f.appendChild(y),c.appendChild(l),c.appendChild(d),c.appendChild(f);const v=document.createElement("div");v.className="mt-2 px-1 pb-1";const b=document.createElement("div");b.className="font-semibold leading-tight transition-all duration-200";const R=p.blueprintGridSize||"M";R==="S"?b.classList.add("text-xs"):R==="L"?b.classList.add("text-base"):b.classList.add("text-sm"),b.textContent=r.name,v.appendChild(b);const C=document.createElement("div");C.className="details-overlay hidden backdrop-blur-md bg-zinc-900/40 border border-white/10 shadow-2xl rounded-2xl";const P=document.createElement("div");P.className="bg-black/20 rounded-lg p-3 border border-white/10 mb-3";const N=document.createElement("div");N.className="text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-wider",N.textContent="Most Likely Spawn",P.appendChild(N);let V=!1;const M=(g,w)=>{if(!w||w==="N/A")return null;const A=document.createElement("div");A.className="details-row";const I=document.createElement("div");I.className="details-label",I.textContent=g;const S=document.createElement("div");return S.className="details-value",S.textContent=w,A.appendChild(I),A.appendChild(S),A};if([M("Map",r.map),M("Location",r.loc),M("Container",r.cont),M("Condition",r.cond)].filter(Boolean).forEach(g=>{P.appendChild(g),V=!0}),V&&C.appendChild(P),r.conf){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Data Confidence";const A=document.createElement("div");A.className="details-value details-confidence";const I=document.createElement("span");I.className="confidence-dot",I.style.background=ca[r.conf]||"#71717a";const S=document.createElement("span");S.textContent=r.conf,A.appendChild(I),A.appendChild(S),g.appendChild(w),g.appendChild(A),C.appendChild(g)}if(r.trialsReward){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Trials Reward";const A=document.createElement("div");A.className="details-value",A.innerHTML='<span class="inline-flex items-center gap-1.5 text-emerald-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',g.appendChild(w),g.appendChild(A),C.appendChild(g)}if(r.questReward){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Quest Reward";const A=document.createElement("div");A.className="details-value",A.innerHTML='<span class="inline-flex items-center gap-1.5 text-amber-400"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>Yes</span>',g.appendChild(w),g.appendChild(A),C.appendChild(g)}if(r.description){const g=document.createElement("div");g.className="details-row";const w=document.createElement("div");w.className="details-label",w.textContent="Description";const A=document.createElement("div");A.className="details-value",A.textContent=r.description,A.classList.add("italic"),g.appendChild(w),g.appendChild(A),C.appendChild(g)}if(r.wiki){const g=document.createElement("a");g.href=r.wiki,g.target="_blank",g.rel="noreferrer",g.className="mt-2 inline-block text-xs text-zinc-300 hover:text-white underline decoration-zinc-700",g.textContent="Item URL",C.appendChild(g)}const O=document.createElement("div");O.className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black/20 border border-white/10 hover:border-emerald-400 hover:bg-black/30 rounded-lg cursor-pointer transition-all group/link shadow-sm",O.onclick=g=>{g.stopPropagation(),window.openDataDetail&&window.openDataDetail(r.name)},O.innerHTML=`
      <span class="text-xs font-bold text-zinc-300 group-hover/link:text-white uppercase tracking-wider">Detailed Data</span>
      <svg class="w-4 h-4 text-zinc-500 group-hover/link:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `,C.appendChild(O),a.style.cursor="pointer",a.onclick=g=>{if(g.stopPropagation(),p.massCollectMode){p.collectedItems.has(r.name)?(p.collectedItems.delete(r.name),$i()):(p.collectedItems.add(r.name),p.wishlistedItems.delete(r.name),p.currentTab==="blueprints"&&Am(r.name)),Yn(),Tn(a,r.name),Cm();return}!C.classList.contains("hidden")?wc():(vm(i,"details"),requestAnimationFrame(()=>{const A=C.getBoundingClientRect(),I=12;let S=0;A.left<I?S=I-A.left:A.right>window.innerWidth-I&&(S=window.innerWidth-I-A.right),S!==0&&(C.style.transform=`translateX(calc(-50% + ${S}px))`)}))},a.appendChild(c),Tn(a,r.name);const F=p.spares[r.name]||0;if(F>0){const g=document.createElement("div");g.className="spares-pill absolute top-[5cqi] right-[5cqi] z-20 px-[5cqi] py-[3cqi] rounded-full text-[8cqi] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",g.innerHTML=`Spares: <span class="font-bold">${F}</span>`,g.dataset.itemName=r.name,a.appendChild(g)}const E=document.createElement("div");E.className="mass-collect-overlay",E.innerHTML=`
      <span class="mass-collect-text">Click to<br>Collect</span>
      <div class="mass-collect-icons">
        <svg class="mass-collect-icon icon-plus w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <svg class="mass-collect-icon icon-check w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    `,a.appendChild(E),i.appendChild(a),i.appendChild(v),i.appendChild(C),n.appendChild(i),s.push(i)}s.length>0&&Gp(s,{opacity:[0,1],y:[20,0]},{delay:zp(.015)})}function G0(){const n=document.getElementById("filtersSidebar"),e=document.getElementById("sidebarBackdrop"),t=document.getElementById("desktopFilterBtn"),s=document.getElementById("closeSidebarBtn");n||console.error("Sidebar not found");const r=()=>{n&&(n.style.transform="translateX(0)",n.style.display="block",n.classList.remove("-translate-x-full","hidden"),n.classList.add("translate-x-0"),n.classList.remove("pointer-events-none"),n.classList.add("pointer-events-auto"),n.classList.remove("md:hidden"),n.classList.add("md:block")),window.innerWidth<768&&(e&&e.classList.remove("hidden"),document.body.classList.add("overflow-hidden"))},i=()=>{n&&(n.style.transform="",n.style.display="",n.classList.add("-translate-x-full"),n.classList.remove("translate-x-0"),n.classList.remove("pointer-events-auto"),n.classList.add("pointer-events-none"),window.innerWidth>=768&&(n.classList.remove("md:block"),n.classList.add("md:hidden"),n.classList.add("hidden"),n.style.display="none")),e&&e.classList.add("hidden"),document.body.classList.remove("overflow-hidden")},a=()=>{if(!n)return;const l=window.getComputedStyle(n).display==="none";window.innerWidth<768?n.classList.contains("-translate-x-full")?r():i():l?r():i()};t&&t.addEventListener("click",c=>{c.stopPropagation(),a()}),s&&(s.onclick=i),e&&(e.onclick=i)}function Ic(){const n=document.getElementById("collectedAll"),e=document.getElementById("collectedYes"),t=document.getElementById("collectedWish"),s=document.getElementById("collectedNo"),r=document.getElementById("collectedSpares"),i=a=>{p.filters.collected=a;const c={all:n,collected:e,wishlist:t,"not-collected":s,spares:r};Object.values(c).forEach(l=>l==null?void 0:l.classList.remove("chip-active")),c[a]&&c[a].classList.add("chip-active"),Ee(),Oe(),He()};n&&(n.onclick=()=>i("all")),e&&(e.onclick=()=>i("collected")),t&&(t.onclick=()=>i("wishlist")),s&&(s.onclick=()=>i("not-collected")),r&&(r.onclick=()=>i("spares")),i(p.filters.collected)}function K0(){const n=document.getElementById("itemContextMenu"),e=document.getElementById("grid");if(!n||!e)return;let t=null,s=null,r=!1;const i=500,a=v=>{if(vm(v,"menu"),window.menuCloseTimer&&(clearTimeout(window.menuCloseTimer),window.menuCloseTimer=null),t=v,!v)return;const b=v.getBoundingClientRect(),R=200;let C=b.left+b.width/2-R/2,P=b.bottom+8;const N=12;C<N?C=N:C+R>window.innerWidth-N&&(C=window.innerWidth-R-N);const V=150;P+V>window.innerHeight-N&&(P=b.top-V-8,P<N&&(P=N)),n.style.left=`${C}px`,n.style.top=`${P}px`,n.classList.remove("hidden","pointer-events-none"),requestAnimationFrame(()=>n.classList.remove("opacity-0"));const M=document.getElementById("contextSparesCount");if(M&&v){const A=v.dataset.name,I=p.spares[A]||0;M.textContent=I}const O=v.dataset.name,F=document.getElementById("contextCollectedText"),E=document.getElementById("contextWishlistText"),g=document.getElementById("contextCollectedBtn"),w=document.getElementById("contextWishlistBtn");p.collectedItems.has(O)?(F&&(F.textContent="Mark as Uncollected"),g&&g.classList.add("bg-emerald-500/20","text-emerald-400")):(F&&(F.textContent="Mark as Collected"),g&&g.classList.remove("bg-emerald-500/20","text-emerald-400")),p.wishlistedItems.has(O)?(E&&(E.textContent="Remove from Wishlist"),w&&w.classList.add("bg-amber-500/20","text-amber-400")):(E&&(E.textContent="Add to Wishlist"),w&&w.classList.remove("bg-amber-500/20","text-amber-400"))},c=()=>{n.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>n.classList.add("hidden"),150),t&&t.classList.remove("card-selected"),t=null};e.addEventListener("contextmenu",v=>{const b=v.target.closest(".card-compact");b&&(v.preventDefault(),a(b))}),e.addEventListener("touchstart",v=>{const b=v.target.closest(".card-compact");b&&(s=setTimeout(()=>{r=!0,a(b),navigator.vibrate&&navigator.vibrate(50)},i))},{passive:!0}),e.addEventListener("touchend",v=>{clearTimeout(s),r&&(v.cancelable&&v.preventDefault(),r=!1)},{passive:!1}),e.addEventListener("touchmove",()=>{clearTimeout(s)},{passive:!0}),document.addEventListener("click",v=>{n.contains(v.target)||v.target.closest(".details-overlay")||v.target.closest(".card-selected")||wc()}),e.addEventListener("click",v=>{const b=v.target.closest(".spares-pill");if(!b)return;v.stopPropagation();const R=b.closest(".card-compact");R&&a(R)}),window.addEventListener("scroll",c,{passive:!0}),document.addEventListener("keydown",v=>{v.key==="Escape"&&c()});const l=document.getElementById("contextSparesCount"),d=document.getElementById("contextSparesMinus"),f=document.getElementById("contextSparesPlus"),m=()=>{if(t&&l){const v=t.dataset.name,b=p.spares[v]||0;l.textContent=b}},y=(v,b)=>{const R=v==null?void 0:v.querySelector(".rarity-frame");if(!R)return;const C=R.querySelector(".spares-pill");C&&C.remove();const P=p.spares[b]||0;if(P>0){const N=document.createElement("div");N.className="spares-pill absolute top-[5cqi] right-[5cqi] z-20 px-[5cqi] py-[3cqi] rounded-full text-[8cqi] bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-sm cursor-pointer",N.innerHTML=`Spares: <span class="font-bold">${P}</span>`,N.dataset.itemName=b,R.appendChild(N)}};d&&(d.onclick=v=>{if(v.stopPropagation(),!t)return;const b=t.dataset.name,R=p.spares[b]||0;R>0&&(p.spares[b]=R-1,p.spares[b]===0&&delete p.spares[b],id(),m(),y(t,b))}),f&&(f.onclick=v=>{if(v.stopPropagation(),!t)return;const b=t.dataset.name,R=p.spares[b]||0;p.spares[b]=R+1,id(),m(),y(t,b)}),n.addEventListener("click",v=>{const b=v.target.closest("[data-action]");if(!b||!t)return;const R=b.dataset.action,C=t.dataset.name,P=t.querySelector(".rarity-frame");if(!C){c();return}R==="collected"?(p.collectedItems.has(C)?(p.collectedItems.delete(C),$i()):(p.wishlistedItems.delete(C),p.collectedItems.add(C),p.currentTab==="blueprints"&&Am(C)),Yn(),Cm(),P&&Tn(P,C),Qr(),c()):R==="wishlisted"?(p.wishlistedItems.has(C)?p.wishlistedItems.delete(C):(p.collectedItems.delete(C),p.wishlistedItems.add(C)),Yn(),P&&Tn(P,C),Qr(),c()):R==="uncollected"&&(p.collectedItems.delete(C),p.wishlistedItems.delete(C),Yn(),P&&Tn(P,C),Qr(),c())})}const Q0="./data_registry.csv";p.detailedData=[];p.dataSort={column:"rarity",direction:"desc"};p.dataSearch="";async function da(){const n=document.getElementById("dataRows");if(n){p.detailedData.length===0&&(n.innerHTML=`
      <div class="py-20 text-center">
        <div class="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-zinc-500">Fetching live data...</p>
      </div>`);try{const t=await(await fetch(Q0)).text();Papa.parse(t,{header:!0,skipEmptyLines:!0,complete:s=>{X0(s.data)},error:s=>{console.error("CSV Parse Error:",s),n.innerHTML='<div class="py-10 text-center text-red-500">Failed to load data.</div>'}})}catch(e){console.error("Fetch Error:",e),n.innerHTML='<div class="py-10 text-center text-red-500">Network error.</div>'}}}function X0(n){p.detailedData=n.map(e=>{const t=[{name:"Spaceport",count:parseInt(e.Spaceport||0)},{name:"Stella Montis",count:parseInt(e["Stella Montis"]||0)},{name:"Blue Gate",count:parseInt(e["Blue Gate"]||0)},{name:"Dam Battlegrounds",count:parseInt(e["Dam Battlegrounds"]||0)},{name:"Buried City",count:parseInt(e["Buried City"]||0)}].sort((i,a)=>a.count-i.count),s=[{name:"Day",count:parseInt(e.Day||0)},{name:"Night",count:parseInt(e.Night||0)},{name:"Storm",count:parseInt(e.Storm||0)},{name:"Cold Snap",count:parseInt(e["Cold Snap"]||0)},{name:"Hidden Bunker",count:parseInt(e["Hidden Bunker"]||0)},{name:"Locked Gate",count:parseInt(e["Locked Gate"]||0)}].sort((i,a)=>a.count-i.count),r=parseInt(e["Total Entries"]||0);return{name:e["Blueprint Name"],confidence:e["Data Confidence"],bestMap:e["Most Likely Map"],bestCondition:e["Most Likely Condition"],entries:r,maps:t,conditions:s}}),Lt()}function Y0(){const n=document.getElementById("tabDropRegistry"),e=document.getElementById("tabHeatmap"),t=document.getElementById("dataTitle"),s=document.getElementById("dataSubtitle"),r=document.getElementsByClassName("registry-view"),i=document.getElementById("heatmapMainContainer");p.dataViewMode||(p.dataViewMode="registry");const a=()=>{const l=document.getElementById("heatmapBlueprintInput"),d=document.getElementById("heatmapDropdown");if(!l||!d)return;const f=m=>{if(d.innerHTML="",m.length===0){const y=document.createElement("div");y.className="px-4 py-3 text-sm text-zinc-500 italic",y.textContent="No blueprints found",d.appendChild(y);return}m.forEach(y=>{const v=document.createElement("button");v.className="w-full text-left px-4 py-3 hover:bg-zinc-800 text-sm text-zinc-300 hover:text-white transition-colors flex items-center justify-between group";const b=document.createElement("span");b.textContent=y.name,v.appendChild(b);const R=document.createElement("span");R.className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",R.style.backgroundColor=Pe(y.rarity),v.appendChild(R),v.onclick=()=>{l.value=y.name,d.classList.add("hidden");const C=document.getElementById("hm-global-overlay");C&&C.classList.add("hidden"),iT(y.name,"hm-global-container","hm-global-tabs"),s&&(s.textContent=`Visualized spawn density for ${y.name}`)},d.appendChild(v)})};document.addEventListener("click",m=>{!l.contains(m.target)&&!d.contains(m.target)&&d.classList.add("hidden")}),l.oninput=m=>{const y=m.target.value.toLowerCase();if(!y){d.classList.add("hidden");return}const v=R=>R.replace(/['’]/g,""),b=p.all.filter(R=>v(R.name.toLowerCase()).includes(v(y))).sort((R,C)=>R.name.localeCompare(C.name));f(b),d.classList.remove("hidden")},l.onfocus=()=>{const m=l.value.toLowerCase();let y=p.all;if(m){const v=b=>b.replace(/['’]/g,"");y=p.all.filter(b=>v(b.name.toLowerCase()).includes(v(m)))}y=[...y].sort((v,b)=>v.name.localeCompare(b.name)),f(y),d.classList.remove("hidden")}},c=()=>{const l=p.dataViewMode==="heatmap";l?(e==null||e.classList.add("data-tab-active"),n==null||n.classList.remove("data-tab-active"),t&&(t.textContent="SPAWN HEATMAPS"),s&&(s.textContent="Search for a blueprint to view spawn locations."),a()):(n==null||n.classList.add("data-tab-active"),e==null||e.classList.remove("data-tab-active"),t&&(t.textContent="DROP REGISTRY"),s&&(s.textContent="Community-sourced spawn data analysis")),Array.from(r).forEach(d=>d.classList.toggle("hidden",l)),i==null||i.classList.toggle("hidden",!l)};n&&(n.onclick=()=>{p.dataViewMode="registry",c()}),e&&(e.onclick=()=>{p.dataViewMode="heatmap",c()})}function Lt(){const n=document.getElementById("dataRows");if(!n)return;n.innerHTML="";let e=p.detailedData.filter(a=>{const c=(p.filters.search||"").toLowerCase();let l=p.all.find(C=>C.name===a.name);if(!l&&a.name.includes("Light Stick")&&(l=p.all.find(C=>C.name.includes("Light Stick"))),!l)return!1;const d=l?l.rarity:"common",f=l?l.type:"Unknown",m=l?l.map:"",y=l?l.cond:"",v=a.confidence||(l?l.conf:"");if(p.filters.rarities.size>0&&!p.filters.rarities.has(d)||p.filters.types.size>0&&!p.filters.types.has(f)||p.filters.maps.size>0&&!p.filters.maps.has(m)||p.filters.conds.size>0&&!p.filters.conds.has(y)||p.filters.confs.size>0&&!p.filters.confs.has(v))return!1;const b=p.collectedItems.has(a.name),R=p.wishlistedItems.has(a.name);return!(p.filters.collected==="collected"&&!b||p.filters.collected==="wishlist"&&!R||p.filters.collected==="not-collected"&&b||p.filters.collected==="spares"&&!(p.spares[a.name]>0)||c&&!(a.name+" "+f+" "+a.bestMap+" "+a.bestCondition).toLowerCase().includes(c))});if(e.sort((a,c)=>{const l=p.dataSort.direction==="asc"?1:-1,d=p.dataSort.column;if(d==="name")return a.name.localeCompare(c.name)*l;if(d==="rarity"){const f=v=>{let b=p.all.find(R=>R.name===v.name);return!b&&v.name.includes("Light Stick")&&(b=p.all.find(R=>R.name.includes("Light Stick"))),b?b.rarity:"common"},m=et(f(a)),y=et(f(c));return(m-y)*l}if(d==="confidence"){const f=C=>{const P=la.indexOf(C);return P===-1?999:P},m=f(a.confidence),y=f(c.confidence);if(m!==y)return p.dataSort.direction==="desc"?m-y:y-m;const v=C=>{let P=p.all.find(N=>N.name===C.name);return!P&&C.name.includes("Light Stick")&&(P=p.all.find(N=>N.name.includes("Light Stick"))),P?P.rarity:"common"},b=et(v(a)),R=et(v(c));return b-R}return String(a[d]).localeCompare(String(c[d]))*l}),e.length===0){n.innerHTML='<div class="py-10 text-center text-zinc-500">No matching records found.</div>';return}const t=p.dataGridSize||"medium";let s="py-3 md:py-4 text-xs md:text-sm";t==="small"?s="py-1.5 md:py-2 text-[10px] md:text-xs":t==="large"&&(s="py-3 md:py-4 text-sm md:text-base");let r="w-10 h-10",i="text-sm";t==="small"?(r="w-8 h-8",i="text-xs"):t==="large"&&(r="w-12 h-12",i="text-sm md:text-base"),e.forEach((a,c)=>{let l=p.all.find(P=>P.name===a.name);!l&&a.name.includes("Light Stick")&&(l=p.all.find(P=>P.name.includes("Light Stick")));const d=l?l.rarity:"common",f=l?l.img:"icons/ItemCategory_Weapon.webp";l&&l.typeIcon;const m=document.createElement("div");m.className="group relative flex flex-col bg-zinc-900/70 border border-zinc-800/50 hover:border-zinc-700 rounded-xl overflow-hidden transition-all duration-200 backdrop-blur-md";const y=document.createElement("div"),v="md:grid-cols-[2fr,1fr,1fr,1fr,40px]";y.className=`group grid grid-cols-[100px,0.7fr,0.9fr,0.5fr,0.4fr,18px] ${v} gap-x-2 md:gap-4 ${s} px-3 md:px-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center cursor-pointer`;const b=`mini-card-${c}`;if(y.innerHTML=`
      <!-- Item Name & Icon (Col 1) -->
      <div class="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 overflow-hidden md:border-r border-white/5 pr-0 h-full min-w-0">
        <div id="${b}" class="shrink-0 relative flex items-center justify-center ${r}">
            ${l?"":`
            <div class="${r} rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden" 
                 style="border-color: ${Pe(d)}66">
              <img src="${f}" class="w-full h-full object-contain p-1" loading="lazy">
              <div class="absolute inset-0 bg-${Pe(d)}/10"></div>
            </div>`}
        </div>
        <div class="flex flex-col min-w-0 w-full">
          <!-- Text wrap enabled, sized down on mobile, type removed -->
          <span class="font-bold ${i} text-zinc-200 break-words leading-tight group-hover:text-emerald-400 transition-colors">${a.name}</span>
        </div>
      </div>

      <!-- Confidence -->
      <div class="border-r border-white/5 h-full flex items-center pl-0 pr-1 md:pl-2 overflow-hidden">${J0(a.confidence)}</div>

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
    `,l){const P=y.querySelector(`#${b}`);if(P){let N=.42;p.dataGridSize==="small"&&(N=.25),p.dataGridSize==="large"&&(N=.5);const V=200;P.style.width=V*N+"px",P.style.height=V*N+"px";const M=wm(l);M.className="",M.style.background="transparent",M.style.border="none",M.style.padding="0",M.style.containerType="inline-size",M.lastChild&&M.lastChild.remove();const O=M.querySelector(".type-tab");O&&O.remove(),M.querySelectorAll(".collected-badge, .wishlist-badge").forEach(E=>{E.style.transform="scale(1.8) translateY(-10px)",E.style.transformOrigin="top right",E.style.zIndex="50"}),M.style.width=V+"px",M.style.transform=`scale(${N})`,M.style.transformOrigin="top left",M.style.position="absolute",M.style.top="0",M.style.left="0",M.style.pointerEvents="none",P.appendChild(M)}}const R=document.createElement("div");R.className="hidden border-t border-zinc-800/50 bg-black/20";const C=a.name.replace(/[^a-zA-Z0-9]/g,"_");R.innerHTML=`
      <div class="p-4 md:p-6" id="detail-${C}">
         <div class="space-y-6 w-full min-w-0">
          <!-- Maps Chart -->
          <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Map Distribution</h4>
            <div class="space-y-2">
              ${hd(a.maps,a.entries)}
            </div>
          </div>
          
          <!-- Conditions Chart -->
           <div>
            <h4 class="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-3">Condition Distribution</h4>
            <div class="space-y-2">
               ${hd(a.conditions,a.entries)}
            </div>
          </div>
        </div>
      </div>
    `,y.onclick=()=>{R.classList.contains("hidden")?(R.classList.remove("hidden"),y.querySelectorAll(".expand-arrow").forEach(N=>N.classList.add("rotate-180")),y.classList.add("bg-white/[0.02]")):(R.classList.add("hidden"),y.querySelectorAll(".expand-arrow").forEach(N=>N.classList.remove("rotate-180")),y.classList.remove("bg-white/[0.02]"))},y.dataset.itemName=a.name,m.appendChild(y),m.appendChild(R),n.appendChild(m)}),p.dataTabTarget&&setTimeout(()=>{const a=n.querySelector(`div[data-item-name="${p.dataTabTarget}"]`);a&&(a.scrollIntoView({behavior:"smooth",block:"center"}),a.click(),a.classList.add("bg-emerald-500/10"),setTimeout(()=>a.classList.remove("bg-emerald-500/10"),1500)),p.dataTabTarget=null},300)}window.openDataDetail=function(n){p.dataTabTarget=n,p.dataSearch="";const e=document.getElementById("dataSearch");e&&(e.value=""),gn("data")};function J0(n){let e="bg-zinc-800 text-zinc-400 border-zinc-700";const t=n.toLowerCase();return t.includes("confirmed")?e="bg-amber-500/10 text-amber-400 border-amber-500/20":t.includes("very high")||t.includes("high")?e="bg-pink-500/10 text-pink-400 border-pink-500/20":t.includes("confident")||t.includes("medium")?e="bg-blue-500/10 text-blue-400 border-blue-500/20":t.includes("low")&&(e="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"),`<span class="flex flex-wrap justify-center text-center leading-none px-1 py-0.5 rounded-md text-[9px] md:text-[10px] font-bold border ${e} uppercase tracking-wide w-full h-auto break-words whitespace-normal">${n}</span>`}function hd(n,e){const t=Math.max(...n.map(r=>r.count))||1,s=["#AA8900","#8E1C66","#15839E","#2E9949","#525452","#911331","#52269A","#A74F0F"];return n.map((r,i)=>{if(r.count===0)return"";const a=Math.round(r.count/e*100),c=Math.max(r.count/t*100,2),l=s[i]||"#3f3f46";return`
      <div class="flex items-center gap-3 text-xs">
        <div class="w-24 shrink-0 text-zinc-300 text-right truncate" title="${r.name}">${r.name}</div>
        <div class="flex-1 h-6 bg-zinc-900 rounded-md overflow-hidden relative group/bar">
          <div class="absolute inset-y-0 left-0 rounded-md transition-all duration-200 opacity-90 group-hover/bar:opacity-100 group-hover/bar:brightness-110" 
               style="width: ${c}%; background-color: ${l};"></div>
          <div class="absolute inset-0 flex items-center px-2">
             <span class="font-mono text-white z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] font-bold">${r.count} <span class="text-white/80 ml-1">(${a}%)</span></span>
          </div>
        </div>
      </div>
    `}).join("")}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("dataSearchInput");n&&n.addEventListener("input",i=>{p.dataSearch=i.target.value,Lt()});const e=document.getElementById("dataRefreshBtn");e&&(e.onclick=()=>{da()});const t=document.getElementById("disclaimerToggleBtn"),s=document.getElementById("disclaimerContent"),r=document.getElementById("disclaimerIcon");t&&s&&r&&t.addEventListener("click",()=>{s.classList.toggle("hidden"),r.classList.toggle("rotate-180")})});const pr={dam_battlegrounds:{name:"Dam Battlegrounds",url:"/images/maps/dam_battlegrounds.webp",bounds:[[0,0],[1e3,1095]]},the_spaceport:{name:"The Spaceport",url:"/images/maps/the_spaceport.webp",bounds:[[0,0],[1e3,1e3]]},buried_city:{name:"Buried City",url:"/images/maps/buried_city.webp",bounds:[[0,0],[1e3,1e3]]},the_blue_gate:{name:"The Blue Gate",url:"/images/maps/the_blue_gate.webp",bounds:[[0,0],[1e3,1333]]},stella_montis_upper:{name:"Stella Montis (Upper)",url:"/images/maps/stella_montis_lower.webp",bounds:[[0,0],[1e3,1667]]},stella_montis_lower:{name:"Stella Montis (Lower)",url:"/images/maps/stella_montis_upper.webp",bounds:[[0,0],[1e3,1333]]},the_blue_gate_underground:{name:"The Blue Gate (Underground)",url:"/images/maps/the_blue_gate_underground.webp",bounds:[[0,0],[469,1e3]]}};let X={map:null,currentPin:null,currentMapId:"dam_battlegrounds",stellaLevel:"upper",selectedLocation:null};function Z0(){const n=document.getElementById("mapLocationDisplay"),e=document.getElementById("closeMapPickerBtn"),t=document.getElementById("confirmPinBtn"),s=document.getElementById("mapPickerModal");n&&(n.onclick=Rm,n.style.cursor="pointer"),e&&(e.onclick=ha),t&&(t.onclick=sT),s&&(s.onclick=r=>{r.target===s&&ha(),!r.target.closest("#stellaDropdownMenu")&&!r.target.closest("#map-tab-stella")&&toggleStellaDropdown(!1)})}function Rm(){const n=document.getElementById("mapPickerModal");if(!n)return;n.classList.remove("hidden"),n.classList.add("flex");const e=document.getElementById("submitMapId");let t=e&&e.value?e.value:"dam_battlegrounds";t||(t="dam_battlegrounds");const s=pr[t]?t:"dam_battlegrounds";X.map?setTimeout(()=>{X.map.invalidateSize(),nr(s)},100):setTimeout(()=>{eT(),nr(s)},50);const r=document.getElementById("confirmBtnText");r&&(X.selectedLocation?r.textContent="Confirm Location":r.textContent="Submit Map (No Pin)");const i=document.getElementById("confirmPinBtn");i&&(i.disabled=!1);const a=document.getElementById("removePinBtn");a&&(X.selectedLocation?a.classList.remove("hidden"):a.classList.add("hidden"),a.onclick=km)}function km(n){n&&n.stopPropagation(),X.currentPin&&(X.map.removeLayer(X.currentPin),X.currentPin=null),X.selectedLocation=null,document.getElementById("coordinatesDisplay").textContent="No location selected";const e=document.getElementById("confirmBtnText");e&&(e.textContent="Submit Map (No Pin)");const t=document.getElementById("removePinBtn");t&&t.classList.add("hidden");const s=document.getElementById("mapInstructions");s&&(s.style.opacity="1",s.textContent="Click or tap anywhere to place a pin")}function ha(){const n=document.getElementById("mapPickerModal");n&&(n.classList.add("hidden"),n.classList.remove("flex"))}function eT(){if(typeof L>"u"){console.error("Leaflet not loaded");return}X.map=L.map("leafletMap",{crs:L.CRS.Simple,minZoom:-1,maxZoom:2,zoomSnap:0,zoomDelta:.5,wheelPxPerZoomLevel:120,zoomControl:!1,attributionControl:!1}),L.control.zoom({position:"bottomright"}).addTo(X.map),X.map.on("click",nT),tT()}function tT(){const n=document.getElementById("mapTabsContainer");if(!n)return;const e=[{id:"dam_battlegrounds",name:"Dam Battlegrounds"},{id:"the_spaceport",name:"The Spaceport"},{id:"buried_city",name:"Buried City"},{id:"the_blue_gate",name:"The Blue Gate"},{id:"stella_montis_upper",name:"Stella Montis",genericId:"stella_montis"}];n.innerHTML=e.map(r=>`
    <button onclick="loadMap('${r.id}')" 
      class="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white"
      id="map-tab-${r.genericId||r.id}"
      data-generic-id="${r.genericId||r.id}">
      ${r.name}
    </button>
  `).join("");const t=document.getElementById("stellaDropdownMenu");t&&t.remove();const s=document.getElementById("bgDropdownMenu");s&&s.remove()}function nr(n){let e=n;const t=n.includes("stella"),s=n.includes("blue_gate");t&&(n==="stella_montis_upper"&&(X.stellaLevel="upper"),n==="stella_montis_lower"&&(X.stellaLevel="lower"),X.stellaLevel||(X.stellaLevel="upper"),e=`stella_montis_${X.stellaLevel}`);const r=pr[e];if(!r)return;X.currentMapId=e,document.querySelectorAll("#mapTabsContainer > button").forEach(d=>{d.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white";const f=d.dataset.genericId||d.id.replace("map-tab-","");let m=!1;(t&&f==="stella_montis"||s&&f==="the_blue_gate"||f===e)&&(m=!0),m&&(d.className="px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap border border-emerald-500 bg-emerald-600 text-white shadow-lg shadow-emerald-900/20")}),X.map.eachLayer(d=>{(d instanceof L.ImageOverlay||d instanceof L.Marker)&&X.map.removeLayer(d)});const i=document.getElementById("mapPickerLevelSwitcher");i&&i.remove();const a=document.getElementById("leafletMap");if(t||s){const d=document.createElement("div");d.id="mapPickerLevelSwitcher",d.className="absolute top-4 right-4 flex bg-black/80 backdrop-blur rounded-lg border border-zinc-700 overflow-hidden z-[1000]",t?["Upper","Lower"].forEach(f=>{const m=f.toLowerCase(),y=X.stellaLevel===m,v=document.createElement("button");v.textContent=f,v.className=`px-3 py-1.5 text-xs font-bold transition-colors ${y?"bg-emerald-600 text-white":"text-zinc-400 hover:bg-zinc-800 hover:text-white"}`,v.onclick=b=>{b.stopPropagation(),nr(`stella_montis_${m}`)},d.appendChild(v)}):s&&[{label:"Surface",id:"the_blue_gate"},{label:"Underground",id:"the_blue_gate_underground"}].forEach(m=>{const y=e===m.id,v=document.createElement("button");v.textContent=m.label,v.className=`px-3 py-1.5 text-xs font-bold transition-colors ${y?"bg-emerald-600 text-white":"text-zinc-400 hover:bg-zinc-800 hover:text-white"}`,v.onclick=b=>{b.stopPropagation(),nr(m.id)},d.appendChild(v)}),a&&a.appendChild(d)}X.currentPin=null,X.selectedLocation=null,document.getElementById("confirmPinBtn").disabled=!1,document.getElementById("coordinatesDisplay").textContent="No location selected";const c=r.bounds;L.imageOverlay(r.url,c).addTo(X.map),X.map.fitBounds(c);const l=document.getElementById("mapInstructions");l&&(l.style.opacity="1"),km()}function nT(n){const{lat:e,lng:t}=n.latlng,s=pr[X.currentMapId];if(!s)return;const[r,i]=s.bounds[1];if(e<0||e>r||t<0||t>i)return;X.currentPin&&X.map.removeLayer(X.currentPin);const a=L.divIcon({className:"custom-pin-icon",html:`
      <div class="relative">
        <svg class="w-[45px] h-[45px] text-emerald-500 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,iconSize:[45,45],iconAnchor:[22.5,45]});X.currentPin=L.marker([e,t],{icon:a}).addTo(X.map);const c=Math.round(t),l=Math.round(e);X.selectedLocation={x:c,y:l,mapId:X.currentMapId},document.getElementById("coordinatesDisplay").textContent=`X: ${c}, Y: ${l}`,document.getElementById("confirmPinBtn").disabled=!1;const d=document.getElementById("confirmBtnText");d&&(d.textContent="Submit Pinned Location");const f=document.getElementById("removePinBtn");f&&f.classList.remove("hidden");const m=document.getElementById("mapInstructions");m&&(m.style.opacity="0")}function sT(){var b;const n=X.selectedLocation?X.selectedLocation.mapId:X.currentMapId;let e=n,t=0;n.includes("stella_montis")?(e="stella_montis",n.includes("lower")&&(t=1)):n.includes("the_blue_gate")&&(e="the_blue_gate",n.includes("underground")&&(t=1));const s=X.selectedLocation?X.selectedLocation.x:null,r=X.selectedLocation?X.selectedLocation.y:null,i=document.getElementById("submitMapId"),a=document.getElementById("submitMapX"),c=document.getElementById("submitMapY"),l=document.getElementById("submitMapLayer");i&&(i.value=e||""),a&&(a.value=s!==null?s:""),c&&(c.value=r!==null?r:""),l&&(l.value=t);let d=((b=pr[n])==null?void 0:b.name)||"Map";n==="stella_montis_upper"&&(d="Stella Upper"),n==="stella_montis_lower"&&(d="Stella Lower"),n==="the_blue_gate_underground"&&(d="Blue Gate (Und)"),n==="the_blue_gate"&&(d="Blue Gate (Surf)");const f=s!==null&&r!==null?`${d} (${s}, ${r})`:d,m=document.getElementById("mapDisplayValue");m&&(m.textContent=f,m.classList.remove("text-zinc-500"),m.classList.add("text-white","font-medium"));const y=document.getElementById("clearMapBtn");y&&y.classList.remove("hidden");const v=document.getElementById("mapLocationDisplay");v&&(v.classList.add("border-emerald-500","bg-emerald-500/10"),setTimeout(()=>v.classList.remove("bg-emerald-500/10"),500)),ha()}window.clearMapSelection=n=>{n&&n.stopPropagation();const e=document.getElementById("submitMapId"),t=document.getElementById("submitMapX"),s=document.getElementById("submitMapY");e&&(e.value=""),t&&(t.value=""),s&&(s.value="");const r=document.getElementById("mapDisplayValue");r&&(r.textContent="Select Map Location...",r.classList.add("text-zinc-500"),r.classList.remove("text-white","font-medium"));const i=document.getElementById("clearMapBtn");i&&i.classList.add("hidden");const a=document.getElementById("mapLocationDisplay");a&&a.classList.remove("border-emerald-500")};window.loadMap=nr;window.openMapPicker=Rm;const fd="arc_dataGridSize_v1";function fa(n){document.getElementById("gridSizeLabelKey"),document.querySelectorAll(".filter-options h3").forEach(t=>{(t.textContent.includes("Grid Size")||t.textContent.includes("List Size"))&&(t.textContent=n==="data"?"List Size":"Grid Size")})}function rT(){const n={small:document.getElementById("btnGridSmall"),medium:document.getElementById("btnGridMedium"),large:document.getElementById("btnGridLarge")};try{const c=localStorage.getItem(fd);c&&(p.dataGridSize=c)}catch(c){console.debug("Failed to load data grid size",c)}const e="gridSizePreference";let t=localStorage.getItem(e)||"M";function s(c){const l=window.innerWidth<=768;let d=150;l?c==="S"?d=90:c==="M"?d=120:c==="L"&&(d=140):c==="S"?d=110:c==="M"?d=150:c==="L"&&(d=220),document.documentElement.style.setProperty("--cardSize",d+"px");try{localStorage.setItem(e,c)}catch{}t=c,p.blueprintGridSize=c,i(),typeof ua=="function"&&ua()}function r(c){p.dataGridSize=c;try{localStorage.setItem(fd,c)}catch{}i(),typeof Lt=="function"&&Lt()}function i(){Object.values(n).forEach(l=>{l&&(l.classList.remove("bg-emerald-600","text-white","font-bold"),l.classList.remove("bg-zinc-600","text-white","border-zinc-500"),l.classList.add("bg-zinc-800","text-zinc-400","border-transparent"))});let c=null;if(p.currentTab==="data"){const l=p.dataGridSize||"medium";c=n[l]}else{const l=p.blueprintGridSize||t||"M";l==="S"?c=n.small:l==="M"?c=n.medium:l==="L"&&(c=n.large)}c&&(c.classList.remove("bg-zinc-800","text-zinc-400","border-transparent"),c.classList.add("bg-zinc-600","text-white","border-zinc-500"))}const a=c=>{p.currentTab==="data"?r(c):s({small:"S",medium:"M",large:"L"}[c])};n.small&&(n.small.onclick=()=>a("small")),n.medium&&(n.medium.onclick=()=>a("medium")),n.large&&(n.large.onclick=()=>a("large")),s(t),window.updateGridVisuals=i,p.dataGridSize||(p.dataGridSize="medium")}document.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{rT(),[document.getElementById("tabBlueprints"),document.getElementById("tabData"),document.getElementById("tabProgression")].forEach(e=>{e&&e.addEventListener("click",()=>{setTimeout(()=>{typeof window.updateGridVisuals=="function"&&window.updateGridVisuals()},50)})})},150)});let pe=null;async function iT(n,e,t){const s=document.getElementById(e),r=document.getElementById(t);if(!s||!r)return;s.dataset.bp!==n&&(pe&&(pe.remove(),pe=null),s.dataset.bp=n,s.innerHTML="");let i=Object.entries(pr);[{baseId:"stella_montis",name:"Stella Montis",variants:[{suffix:"upper",label:"Upper"},{suffix:"lower",label:"Lower"}]},{baseId:"the_blue_gate",name:"The Blue Gate",variants:[{suffix:"",label:"Surface",key:"the_blue_gate"},{suffix:"underground",label:"Underground",key:"the_blue_gate_underground"}]}].forEach(l=>{const d=[];l.variants.forEach(f=>{const m=f.key||(f.suffix?`${l.baseId}_${f.suffix}`:l.baseId),y=i.findIndex(([v])=>v===m);y!==-1&&d.push({...f,key:m,config:i[y][1]})}),d.length>1&&(i=i.filter(([f])=>!d.some(m=>m.key===f)),i.push([l.baseId,{name:l.name,isMerged:!0,layers:d.reduce((f,m)=>(f[m.label]={id:m.key,config:m.config,label:m.label},f),{}),layerKeys:d.map(f=>f.label)}]))}),r.innerHTML="",r.classList.remove("relative");const c=async(l,d,f=null)=>{const m=d.isMerged;let y,v,b;if(m?(b=f||d.layerKeys[0],y=d.layers[b].id,v=d.layers[b].config):(y=l,v=d),Array.from(r.children).forEach(F=>{F.dataset.mapId===l?(F.classList.remove("bg-zinc-800","text-zinc-500","border-zinc-700/50"),F.classList.add("bg-emerald-500","text-white","border-emerald-400/50","shadow-[0_0_10px_rgba(16,185,129,0.3)]")):(F.classList.remove("bg-emerald-500","text-white","border-emerald-400/50","shadow-[0_0_10px_rgba(16,185,129,0.3)]"),F.classList.add("bg-zinc-800","text-zinc-500","border-zinc-700/50"))}),pe&&(pe.remove(),pe=null),s.innerHTML="",m){const F=document.createElement("div");F.className="absolute top-4 right-4 flex bg-black/80 backdrop-blur rounded-lg border border-zinc-700 overflow-hidden z-[1000]",d.layerKeys.forEach(E=>{const g=E===b,w=document.createElement("button");w.textContent=E,w.className=`px-3 py-1.5 text-xs font-bold transition-colors ${g?"bg-emerald-600 text-white":"text-zinc-400 hover:bg-zinc-800 hover:text-white"}`,w.onclick=A=>{A.stopPropagation(),c(l,d,E)},F.appendChild(w)}),s.appendChild(F)}s.id||(s.id="heatmap-leaflet-"+Math.random().toString(36).substr(2,9)),pe=L.map(s,{crs:L.CRS.Simple,minZoom:-2,maxZoom:2,zoomSnap:.1,center:[0,0],zoom:0,zoomControl:!1,attributionControl:!1}),L.control.zoom({position:"bottomright"}).addTo(pe);const R=v.bounds;L.imageOverlay(v.url,R).addTo(pe),pe.fitBounds(R);const C={radius:12,blur:8,max:5,minOpacity:.1,gradient:{.2:"blue",.5:"lime",.8:"yellow",1:"red"}};let P=await L0(n,y);const N=o0(P,v.bounds,C),V=L.featureGroup();P.forEach(F=>{L.circleMarker([F.y,F.x],{radius:4,color:null,fillColor:"#ff0000",fillOpacity:1,className:"heatmap-dot"}).addTo(V)}),N.addTo(pe);const M=-.5,O=()=>{pe.getZoom()>=M?(pe.hasLayer(V)||pe.addLayer(V),pe.hasLayer(N)&&pe.removeLayer(N)):(pe.hasLayer(N)||pe.addLayer(N),pe.hasLayer(V)&&pe.removeLayer(V))};pe.on("zoomend",O),O()};if(i.forEach(([l,d])=>{const f=document.createElement("button");f.dataset.mapId=l,f.className="tab-main-btn whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-all border",f.textContent=d.name,f.onclick=()=>c(l,d),r.appendChild(f)}),i.length>0){const l=i[0];l[1].isMerged?c(l[0],l[1],l[1].layerKeys[0]):c(l[0],l[1])}}
