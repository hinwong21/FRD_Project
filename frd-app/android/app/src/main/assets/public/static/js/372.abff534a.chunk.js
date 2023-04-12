/*! For license information please see 372.abff534a.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkionic_app_base=self.webpackChunkionic_app_base||[]).push([[372],{6492:(e,t,o)=>{o.r(t),o.d(t,{iosTransitionAnimation:()=>f,shadow:()=>l});var n=o(5883),r=o(6313);const a=e=>document.querySelector(`${e}.ion-cloned-element`),l=e=>e.shadowRoot||e,s=e=>{const t="ION-TABS"===e.tagName?e:e.querySelector("ion-tabs"),o="ion-content ion-header:not(.header-collapse-condense-inactive) ion-title.title-large";if(null!=t){const e=t.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");return null!=e?e.querySelector(o):null}return e.querySelector(o)},i=(e,t)=>{const o="ION-TABS"===e.tagName?e:e.querySelector("ion-tabs");let n=[];if(null!=o){const e=o.querySelector("ion-tab:not(.tab-hidden), .ion-page:not(.ion-page-hidden)");null!=e&&(n=e.querySelectorAll("ion-buttons"))}else n=e.querySelectorAll("ion-buttons");for(const r of n){const e=r.closest("ion-header"),o=e&&!e.classList.contains("header-collapse-condense-inactive"),n=r.querySelector("ion-back-button"),a=r.classList.contains("buttons-collapse"),l="start"===r.slot||""===r.slot;if(null!==n&&l&&(a&&o&&t||!a))return n}return null},c=(e,t,o,r,s,i)=>{const c=t?`calc(100% - ${i.right+4}px)`:i.left-4+"px",d=t?"7px":"-7px",f=t?"-4px":"4px",m=t?"-4px":"4px",p=t?"right":"left",y=t?"left":"right",u=[{offset:0,opacity:0,transform:`translate3d(${d}, ${s.top-40}px, 0) scale(2.1)`},{offset:1,opacity:1,transform:`translate3d(${f}, ${i.top-46}px, 0) scale(1)`}],b=[{offset:0,opacity:1,transform:`translate3d(${f}, ${i.top-46}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${d}, ${s.top-40}px, 0) scale(2.1)`}],S=o?b:u,$=[{offset:0,opacity:0,transform:`translate3d(${m}, ${i.top-41}px, 0) scale(0.6)`},{offset:1,opacity:1,transform:`translate3d(${m}, ${i.top-46}px, 0) scale(1)`}],g=[{offset:0,opacity:1,transform:`translate3d(${m}, ${i.top-46}px, 0) scale(1)`},{offset:.2,opacity:0,transform:`translate3d(${m}, ${i.top-41}px, 0) scale(0.6)`},{offset:1,opacity:0,transform:`translate3d(${m}, ${i.top-41}px, 0) scale(0.6)`}],T=o?g:$,h=(0,n.c)(),x=(0,n.c)(),q=a("ion-back-button"),X=l(q).querySelector(".button-text"),A=l(q).querySelector("ion-icon");q.text=r.text,q.mode=r.mode,q.icon=r.icon,q.color=r.color,q.disabled=r.disabled,q.style.setProperty("display","block"),q.style.setProperty("position","fixed"),x.addElement(A),h.addElement(X),h.beforeStyles({"transform-origin":`${p} center`}).beforeAddWrite((()=>{r.style.setProperty("display","none"),q.style.setProperty(p,c)})).afterAddWrite((()=>{r.style.setProperty("display",""),q.style.setProperty("display","none"),q.style.removeProperty(p)})).keyframes(S),x.beforeStyles({"transform-origin":`${y} center`}).keyframes(T),e.addAnimation([h,x])},d=(e,t,o,r,l,s)=>{const i=t?`calc(100% - ${l.right}px)`:`${l.left}px`,c=t?"-18px":"18px",d=t?"right":"left",f=[{offset:0,opacity:0,transform:`translate3d(${c}, ${s.top-4}px, 0) scale(0.49)`},{offset:.1,opacity:0},{offset:1,opacity:1,transform:`translate3d(0, ${l.top-2}px, 0) scale(1)`}],m=[{offset:0,opacity:.99,transform:`translate3d(0, ${l.top-2}px, 0) scale(1)`},{offset:.6,opacity:0},{offset:1,opacity:0,transform:`translate3d(${c}, ${s.top-4}px, 0) scale(0.5)`}],p=o?f:m,y=a("ion-title"),u=(0,n.c)();y.innerText=r.innerText,y.size=r.size,y.color=r.color,u.addElement(y),u.beforeStyles({"transform-origin":`${d} center`,height:"46px",display:"",position:"relative",[d]:i}).beforeAddWrite((()=>{r.style.setProperty("display","none")})).afterAddWrite((()=>{r.style.setProperty("display",""),y.style.setProperty("display","none")})).keyframes(p),e.addAnimation(u)},f=(e,t)=>{var o;try{const a="cubic-bezier(0.32,0.72,0,1)",f="opacity",m="transform",p="0%",y=.8,u="rtl"===e.ownerDocument.dir,b=u?"-99.5%":"99.5%",S=u?"33%":"-33%",$=t.enteringEl,g=t.leavingEl,T="back"===t.direction,h=$.querySelector(":scope > ion-content"),x=$.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),q=$.querySelectorAll(":scope > ion-header > ion-toolbar"),X=(0,n.c)(),A=(0,n.c)();if(X.addElement($).duration((null!==(o=t.duration)&&void 0!==o?o:0)||540).easing(t.easing||a).fill("both").beforeRemoveClass("ion-page-invisible"),g&&null!==e&&void 0!==e){const t=(0,n.c)();t.addElement(e),X.addAnimation(t)}if(h||0!==q.length||0!==x.length?(A.addElement(h),A.addElement(x)):A.addElement($.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),X.addAnimation(A),T?A.beforeClearStyles([f]).fromTo("transform",`translateX(${S})`,`translateX(${p})`).fromTo(f,y,1):A.beforeClearStyles([f]).fromTo("transform",`translateX(${b})`,`translateX(${p})`),h){const e=l(h).querySelector(".transition-effect");if(e){const t=e.querySelector(".transition-cover"),o=e.querySelector(".transition-shadow"),r=(0,n.c)(),a=(0,n.c)(),l=(0,n.c)();r.addElement(e).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),a.addElement(t).beforeClearStyles([f]).fromTo(f,0,.1),l.addElement(o).beforeClearStyles([f]).fromTo(f,.03,.7),r.addAnimation([a,l]),A.addAnimation([r])}}const E=$.querySelector("ion-header.header-collapse-condense"),{forward:v,backward:C}=((e,t,o,n,r)=>{const a=i(n,o),l=s(r),f=s(n),m=i(r,o),p=null!==a&&null!==l&&!o,y=null!==f&&null!==m&&o;if(p){const n=l.getBoundingClientRect(),r=a.getBoundingClientRect();d(e,t,o,l,n,r),c(e,t,o,a,n,r)}else if(y){const n=f.getBoundingClientRect(),r=m.getBoundingClientRect();d(e,t,o,f,n,r),c(e,t,o,m,n,r)}return{forward:p,backward:y}})(X,u,T,$,g);if(q.forEach((e=>{const t=(0,n.c)();t.addElement(e),X.addAnimation(t);const o=(0,n.c)();o.addElement(e.querySelector("ion-title"));const r=(0,n.c)(),a=Array.from(e.querySelectorAll("ion-buttons,[menuToggle]")),s=e.closest("ion-header"),i=null===s||void 0===s?void 0:s.classList.contains("header-collapse-condense-inactive");let c;c=T?a.filter((e=>{const t=e.classList.contains("buttons-collapse");return t&&!i||!t})):a.filter((e=>!e.classList.contains("buttons-collapse"))),r.addElement(c);const d=(0,n.c)();d.addElement(e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));const m=(0,n.c)();m.addElement(l(e).querySelector(".toolbar-background"));const y=(0,n.c)(),$=e.querySelector("ion-back-button");if($&&y.addElement($),t.addAnimation([o,r,d,m,y]),r.fromTo(f,.01,1),d.fromTo(f,.01,1),T)i||o.fromTo("transform",`translateX(${S})`,`translateX(${p})`).fromTo(f,.01,1),d.fromTo("transform",`translateX(${S})`,`translateX(${p})`),y.fromTo(f,.01,1);else{E||o.fromTo("transform",`translateX(${b})`,`translateX(${p})`).fromTo(f,.01,1),d.fromTo("transform",`translateX(${b})`,`translateX(${p})`),m.beforeClearStyles([f,"transform"]);if((null===s||void 0===s?void 0:s.translucent)?m.fromTo("transform",u?"translateX(-100%)":"translateX(100%)","translateX(0px)"):m.fromTo(f,.01,"var(--opacity)"),v||y.fromTo(f,.01,1),$&&!v){const e=(0,n.c)();e.addElement(l($).querySelector(".button-text")).fromTo("transform",u?"translateX(-100px)":"translateX(100px)","translateX(0px)"),t.addAnimation(e)}}})),g){const e=(0,n.c)(),t=g.querySelector(":scope > ion-content"),o=g.querySelectorAll(":scope > ion-header > ion-toolbar"),a=g.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *");if(t||0!==o.length||0!==a.length?(e.addElement(t),e.addElement(a)):e.addElement(g.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),X.addAnimation(e),T){e.beforeClearStyles([f]).fromTo("transform",`translateX(${p})`,u?"translateX(-100%)":"translateX(100%)");const t=(0,r.g)(g);X.afterAddWrite((()=>{"normal"===X.getDirection()&&t.style.setProperty("display","none")}))}else e.fromTo("transform",`translateX(${p})`,`translateX(${S})`).fromTo(f,1,y);if(t){const o=l(t).querySelector(".transition-effect");if(o){const t=o.querySelector(".transition-cover"),r=o.querySelector(".transition-shadow"),a=(0,n.c)(),l=(0,n.c)(),s=(0,n.c)();a.addElement(o).beforeStyles({opacity:"1",display:"block"}).afterStyles({opacity:"",display:""}),l.addElement(t).beforeClearStyles([f]).fromTo(f,.1,0),s.addElement(r).beforeClearStyles([f]).fromTo(f,.7,.03),a.addAnimation([l,s]),e.addAnimation([a])}}o.forEach((e=>{const t=(0,n.c)();t.addElement(e);const o=(0,n.c)();o.addElement(e.querySelector("ion-title"));const r=(0,n.c)(),a=e.querySelectorAll("ion-buttons,[menuToggle]"),s=e.closest("ion-header"),i=null===s||void 0===s?void 0:s.classList.contains("header-collapse-condense-inactive"),c=Array.from(a).filter((e=>{const t=e.classList.contains("buttons-collapse");return t&&!i||!t}));r.addElement(c);const d=(0,n.c)(),y=e.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");y.length>0&&d.addElement(y);const b=(0,n.c)();b.addElement(l(e).querySelector(".toolbar-background"));const $=(0,n.c)(),g=e.querySelector("ion-back-button");if(g&&$.addElement(g),t.addAnimation([o,r,d,$,b]),X.addAnimation(t),$.fromTo(f,.99,0),r.fromTo(f,.99,0),d.fromTo(f,.99,0),T){i||o.fromTo("transform",`translateX(${p})`,u?"translateX(-100%)":"translateX(100%)").fromTo(f,.99,0),d.fromTo("transform",`translateX(${p})`,u?"translateX(-100%)":"translateX(100%)"),b.beforeClearStyles([f,"transform"]);if((null===s||void 0===s?void 0:s.translucent)?b.fromTo("transform","translateX(0px)",u?"translateX(-100%)":"translateX(100%)"):b.fromTo(f,"var(--opacity)",0),g&&!C){const e=(0,n.c)();e.addElement(l(g).querySelector(".button-text")).fromTo("transform",`translateX(${p})`,`translateX(${(u?-124:124)+"px"})`),t.addAnimation(e)}}else i||o.fromTo("transform",`translateX(${p})`,`translateX(${S})`).fromTo(f,.99,0).afterClearStyles([m,f]),d.fromTo("transform",`translateX(${p})`,`translateX(${S})`).afterClearStyles([m,f]),$.afterClearStyles([f]),o.afterClearStyles([f]),r.afterClearStyles([f])}))}return X}catch(a){throw a}}}}]);
//# sourceMappingURL=372.abff534a.chunk.js.map