(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function co(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ht={},mn=[],fe=()=>{},pa=()=>!1,br=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),uo=t=>t.startsWith("onUpdate:"),Pt=Object.assign,fo=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Af=Object.prototype.hasOwnProperty,at=(t,e)=>Af.call(t,e),W=Array.isArray,bn=t=>vr(t)==="[object Map]",ga=t=>vr(t)==="[object Set]",z=t=>typeof t=="function",$t=t=>typeof t=="string",Ve=t=>typeof t=="symbol",yt=t=>t!==null&&typeof t=="object",ya=t=>(yt(t)||z(t))&&z(t.then)&&z(t.catch),ma=Object.prototype.toString,vr=t=>ma.call(t),Ef=t=>vr(t).slice(8,-1),ba=t=>vr(t)==="[object Object]",ho=t=>$t(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Vn=co(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),_r=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Cf=/-\w/g,Be=_r(t=>t.replace(Cf,e=>e.slice(1).toUpperCase())),Mf=/\B([A-Z])/g,an=_r(t=>t.replace(Mf,"-$1").toLowerCase()),va=_r(t=>t.charAt(0).toUpperCase()+t.slice(1)),Or=_r(t=>t?`on${va(t)}`:""),Le=(t,e)=>!Object.is(t,e),Ir=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},_a=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},Pf=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let qo;const xr=()=>qo||(qo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function wr(t){if(W(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=$t(i)?Of(i):wr(i);if(r)for(const s in r)e[s]=r[s]}return e}else if($t(t)||yt(t))return t}const Tf=/;(?![^(]*\))/g,Nf=/:([^]+)/,Rf=/\/\*[^]*?\*\//g;function Of(t){const e={};return t.replace(Rf,"").split(Tf).forEach(n=>{if(n){const i=n.split(Nf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function po(t){let e="";if($t(t))e=t;else if(W(t))for(let n=0;n<t.length;n++){const i=po(t[n]);i&&(e+=i+" ")}else if(yt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const If="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Hf=co(If);function xa(t){return!!t||t===""}const wa=t=>!!(t&&t.__v_isRef===!0),fs=t=>$t(t)?t:t==null?"":W(t)||yt(t)&&(t.toString===ma||!z(t.toString))?wa(t)?fs(t.value):JSON.stringify(t,$a,2):String(t),$a=(t,e)=>wa(e)?$a(t,e.value):bn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[i,r],s)=>(n[Hr(i,s)+" =>"]=r,n),{})}:ga(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Hr(n))}:Ve(e)?Hr(e):yt(e)&&!W(e)&&!ba(e)?String(e):e,Hr=(t,e="")=>{var n;return Ve(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ct;class Lf{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Ct,!e&&Ct&&(this.index=(Ct.scopes||(Ct.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Ct;try{return Ct=this,e()}finally{Ct=n}}}on(){++this._on===1&&(this.prevScope=Ct,Ct=this)}off(){this._on>0&&--this._on===0&&(Ct=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function ka(){return Ct}function Ff(t,e=!1){Ct&&Ct.cleanups.push(t)}let pt;const Lr=new WeakSet;class Sa{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ct&&Ct.active&&Ct.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Lr.has(this)&&(Lr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ea(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Jo(this),Ca(this);const e=pt,n=Xt;pt=this,Xt=!0;try{return this.fn()}finally{Ma(this),pt=e,Xt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)mo(e);this.deps=this.depsTail=void 0,Jo(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Lr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){hs(this)&&this.run()}get dirty(){return hs(this)}}let Aa=0,Un,jn;function Ea(t,e=!1){if(t.flags|=8,e){t.next=jn,jn=t;return}t.next=Un,Un=t}function go(){Aa++}function yo(){if(--Aa>0)return;if(jn){let e=jn;for(jn=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Un;){let e=Un;for(Un=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function Ca(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Ma(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),mo(i),Df(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function hs(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Pa(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Pa(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===ii)||(t.globalVersion=ii,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!hs(t))))return;t.flags|=2;const e=t.dep,n=pt,i=Xt;pt=t,Xt=!0;try{Ca(t);const r=t.fn(t._value);(e.version===0||Le(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{pt=n,Xt=i,Ma(t),t.flags&=-3}}function mo(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)mo(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Df(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Xt=!0;const Ta=[];function $e(){Ta.push(Xt),Xt=!1}function ke(){const t=Ta.pop();Xt=t===void 0?!0:t}function Jo(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=pt;pt=void 0;try{e()}finally{pt=n}}}let ii=0;class Bf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class $r{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!pt||!Xt||pt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==pt)n=this.activeLink=new Bf(pt,this),pt.deps?(n.prevDep=pt.depsTail,pt.depsTail.nextDep=n,pt.depsTail=n):pt.deps=pt.depsTail=n,Na(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=pt.depsTail,n.nextDep=void 0,pt.depsTail.nextDep=n,pt.depsTail=n,pt.deps===n&&(pt.deps=i)}return n}trigger(e){this.version++,ii++,this.notify(e)}notify(e){go();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{yo()}}}function Na(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Na(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Xi=new WeakMap,Ye=Symbol(""),ds=Symbol(""),ri=Symbol("");function Mt(t,e,n){if(Xt&&pt){let i=Xi.get(t);i||Xi.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new $r),r.map=i,r.key=n),r.track()}}function xe(t,e,n,i,r,s){const o=Xi.get(t);if(!o){ii++;return}const l=a=>{a&&a.trigger()};if(go(),e==="clear")o.forEach(l);else{const a=W(t),c=a&&ho(n);if(a&&n==="length"){const u=Number(i);o.forEach((f,d)=>{(d==="length"||d===ri||!Ve(d)&&d>=u)&&l(f)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(ri)),e){case"add":a?c&&l(o.get("length")):(l(o.get(Ye)),bn(t)&&l(o.get(ds)));break;case"delete":a||(l(o.get(Ye)),bn(t)&&l(o.get(ds)));break;case"set":bn(t)&&l(o.get(Ye));break}}yo()}function Vf(t,e){const n=Xi.get(t);return n&&n.get(e)}function cn(t){const e=lt(t);return e===t?e:(Mt(e,"iterate",ri),Yt(t)?e:e.map(Ot))}function bo(t){return Mt(t=lt(t),"iterate",ri),t}const Uf={__proto__:null,[Symbol.iterator](){return Fr(this,Symbol.iterator,Ot)},concat(...t){return cn(this).concat(...t.map(e=>W(e)?cn(e):e))},entries(){return Fr(this,"entries",t=>(t[1]=Ot(t[1]),t))},every(t,e){return me(this,"every",t,e,void 0,arguments)},filter(t,e){return me(this,"filter",t,e,n=>n.map(Ot),arguments)},find(t,e){return me(this,"find",t,e,Ot,arguments)},findIndex(t,e){return me(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return me(this,"findLast",t,e,Ot,arguments)},findLastIndex(t,e){return me(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return me(this,"forEach",t,e,void 0,arguments)},includes(...t){return Dr(this,"includes",t)},indexOf(...t){return Dr(this,"indexOf",t)},join(t){return cn(this).join(t)},lastIndexOf(...t){return Dr(this,"lastIndexOf",t)},map(t,e){return me(this,"map",t,e,void 0,arguments)},pop(){return Tn(this,"pop")},push(...t){return Tn(this,"push",t)},reduce(t,...e){return Xo(this,"reduce",t,e)},reduceRight(t,...e){return Xo(this,"reduceRight",t,e)},shift(){return Tn(this,"shift")},some(t,e){return me(this,"some",t,e,void 0,arguments)},splice(...t){return Tn(this,"splice",t)},toReversed(){return cn(this).toReversed()},toSorted(t){return cn(this).toSorted(t)},toSpliced(...t){return cn(this).toSpliced(...t)},unshift(...t){return Tn(this,"unshift",t)},values(){return Fr(this,"values",Ot)}};function Fr(t,e,n){const i=bo(t),r=i[e]();return i!==t&&!Yt(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=n(s.value)),s}),r}const jf=Array.prototype;function me(t,e,n,i,r,s){const o=bo(t),l=o!==t&&!Yt(t),a=o[e];if(a!==jf[e]){const f=a.apply(t,s);return l?Ot(f):f}let c=n;o!==t&&(l?c=function(f,d){return n.call(this,Ot(f),d,t)}:n.length>2&&(c=function(f,d){return n.call(this,f,d,t)}));const u=a.call(o,c,i);return l&&r?r(u):u}function Xo(t,e,n,i){const r=bo(t);let s=n;return r!==t&&(Yt(t)?n.length>3&&(s=function(o,l,a){return n.call(this,o,l,a,t)}):s=function(o,l,a){return n.call(this,o,Ot(l),a,t)}),r[e](s,...i)}function Dr(t,e,n){const i=lt(t);Mt(i,"iterate",ri);const r=i[e](...n);return(r===-1||r===!1)&&wo(n[0])?(n[0]=lt(n[0]),i[e](...n)):r}function Tn(t,e,n=[]){$e(),go();const i=lt(t)[e].apply(t,n);return yo(),ke(),i}const zf=co("__proto__,__v_isRef,__isVue"),Ra=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Ve));function Wf(t){Ve(t)||(t=String(t));const e=lt(this);return Mt(e,"has",t),e.hasOwnProperty(t)}class Oa{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?eh:Fa:s?La:Ha).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=W(e);if(!r){let a;if(o&&(a=Uf[n]))return a;if(n==="hasOwnProperty")return Wf}const l=Reflect.get(e,n,wt(e)?e:i);if((Ve(n)?Ra.has(n):zf(n))||(r||Mt(e,"get",n),s))return l;if(wt(l)){const a=o&&ho(n)?l:l.value;return r&&yt(a)?si(a):a}return yt(l)?r?si(l):_o(l):l}}class Ia extends Oa{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];if(!this._isShallow){const a=rn(s);if(!Yt(i)&&!rn(i)&&(s=lt(s),i=lt(i)),!W(e)&&wt(s)&&!wt(i))return a||(s.value=i),!0}const o=W(e)&&ho(n)?Number(n)<e.length:at(e,n),l=Reflect.set(e,n,i,wt(e)?e:r);return e===lt(r)&&(o?Le(i,s)&&xe(e,"set",n,i):xe(e,"add",n,i)),l}deleteProperty(e,n){const i=at(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&xe(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!Ve(n)||!Ra.has(n))&&Mt(e,"has",n),i}ownKeys(e){return Mt(e,"iterate",W(e)?"length":Ye),Reflect.ownKeys(e)}}class Gf extends Oa{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Kf=new Ia,qf=new Gf,Jf=new Ia(!0);const ps=t=>t,wi=t=>Reflect.getPrototypeOf(t);function Xf(t,e,n){return function(...i){const r=this.__v_raw,s=lt(r),o=bn(s),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=r[t](...i),u=n?ps:e?gs:Ot;return!e&&Mt(s,"iterate",a?ds:Ye),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:l?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function $i(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Yf(t,e){const n={get(r){const s=this.__v_raw,o=lt(s),l=lt(r);t||(Le(r,l)&&Mt(o,"get",r),Mt(o,"get",l));const{has:a}=wi(o),c=e?ps:t?gs:Ot;if(a.call(o,r))return c(s.get(r));if(a.call(o,l))return c(s.get(l));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!t&&Mt(lt(r),"iterate",Ye),r.size},has(r){const s=this.__v_raw,o=lt(s),l=lt(r);return t||(Le(r,l)&&Mt(o,"has",r),Mt(o,"has",l)),r===l?s.has(r):s.has(r)||s.has(l)},forEach(r,s){const o=this,l=o.__v_raw,a=lt(l),c=e?ps:t?gs:Ot;return!t&&Mt(a,"iterate",Ye),l.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Pt(n,t?{add:$i("add"),set:$i("set"),delete:$i("delete"),clear:$i("clear")}:{add(r){!e&&!Yt(r)&&!rn(r)&&(r=lt(r));const s=lt(this);return wi(s).has.call(s,r)||(s.add(r),xe(s,"add",r,r)),this},set(r,s){!e&&!Yt(s)&&!rn(s)&&(s=lt(s));const o=lt(this),{has:l,get:a}=wi(o);let c=l.call(o,r);c||(r=lt(r),c=l.call(o,r));const u=a.call(o,r);return o.set(r,s),c?Le(s,u)&&xe(o,"set",r,s):xe(o,"add",r,s),this},delete(r){const s=lt(this),{has:o,get:l}=wi(s);let a=o.call(s,r);a||(r=lt(r),a=o.call(s,r)),l&&l.call(s,r);const c=s.delete(r);return a&&xe(s,"delete",r,void 0),c},clear(){const r=lt(this),s=r.size!==0,o=r.clear();return s&&xe(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Xf(r,t,e)}),n}function vo(t,e){const n=Yf(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(at(n,r)&&r in i?n:i,r,s)}const Zf={get:vo(!1,!1)},Qf={get:vo(!1,!0)},th={get:vo(!0,!1)};const Ha=new WeakMap,La=new WeakMap,Fa=new WeakMap,eh=new WeakMap;function nh(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ih(t){return t.__v_skip||!Object.isExtensible(t)?0:nh(Ef(t))}function _o(t){return rn(t)?t:xo(t,!1,Kf,Zf,Ha)}function rh(t){return xo(t,!1,Jf,Qf,La)}function si(t){return xo(t,!0,qf,th,Fa)}function xo(t,e,n,i,r){if(!yt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=ih(t);if(s===0)return t;const o=r.get(t);if(o)return o;const l=new Proxy(t,s===2?i:n);return r.set(t,l),l}function zn(t){return rn(t)?zn(t.__v_raw):!!(t&&t.__v_isReactive)}function rn(t){return!!(t&&t.__v_isReadonly)}function Yt(t){return!!(t&&t.__v_isShallow)}function wo(t){return t?!!t.__v_raw:!1}function lt(t){const e=t&&t.__v_raw;return e?lt(e):t}function sh(t){return!at(t,"__v_skip")&&Object.isExtensible(t)&&_a(t,"__v_skip",!0),t}const Ot=t=>yt(t)?_o(t):t,gs=t=>yt(t)?si(t):t;function wt(t){return t?t.__v_isRef===!0:!1}function oi(t){return Da(t,!1)}function Ze(t){return Da(t,!0)}function Da(t,e){return wt(t)?t:new oh(t,e)}class oh{constructor(e,n){this.dep=new $r,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:lt(e),this._value=n?e:Ot(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||Yt(e)||rn(e);e=i?e:lt(e),Le(e,n)&&(this._rawValue=e,this._value=i?e:Ot(e),this.dep.trigger())}}function Oe(t){return wt(t)?t.value:t}function he(t){return z(t)?t():Oe(t)}const lh={get:(t,e,n)=>e==="__v_raw"?t:Oe(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return wt(r)&&!wt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function Ba(t){return zn(t)?t:new Proxy(t,lh)}class ah{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new $r,{get:i,set:r}=e(n.track.bind(n),n.trigger.bind(n));this._get=i,this._set=r}get value(){return this._value=this._get()}set value(e){this._set(e)}}function ch(t){return new ah(t)}class uh{constructor(e,n,i){this._object=e,this._key=n,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Vf(lt(this._object),this._key)}}class fh{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function hh(t,e,n){return wt(t)?t:z(t)?new fh(t):yt(t)&&arguments.length>1?dh(t,e,n):oi(t)}function dh(t,e,n){const i=t[e];return wt(i)?i:new uh(t,e,n)}class ph{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new $r(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ii-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&pt!==this)return Ea(this,!0),!0}get value(){const e=this.dep.track();return Pa(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function gh(t,e,n=!1){let i,r;return z(t)?i=t:(i=t.get,r=t.set),new ph(i,r,n)}const ki={},Yi=new WeakMap;let Ge;function yh(t,e=!1,n=Ge){if(n){let i=Yi.get(n);i||Yi.set(n,i=[]),i.push(t)}}function mh(t,e,n=ht){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:l,call:a}=n,c=_=>r?_:Yt(_)||r===!1||r===0?Ie(_,1):Ie(_);let u,f,d,g,m=!1,$=!1;if(wt(t)?(f=()=>t.value,m=Yt(t)):zn(t)?(f=()=>c(t),m=!0):W(t)?($=!0,m=t.some(_=>zn(_)||Yt(_)),f=()=>t.map(_=>{if(wt(_))return _.value;if(zn(_))return c(_);if(z(_))return a?a(_,2):_()})):z(t)?e?f=a?()=>a(t,2):t:f=()=>{if(d){$e();try{d()}finally{ke()}}const _=Ge;Ge=u;try{return a?a(t,3,[g]):t(g)}finally{Ge=_}}:f=fe,e&&r){const _=f,R=r===!0?1/0:r;f=()=>Ie(_(),R)}const O=ka(),v=()=>{u.stop(),O&&O.active&&fo(O.effects,u)};if(s&&e){const _=e;e=(...R)=>{_(...R),v()}}let N=$?new Array(t.length).fill(ki):ki;const T=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(e){const R=u.run();if(r||m||($?R.some((G,tt)=>Le(G,N[tt])):Le(R,N))){d&&d();const G=Ge;Ge=u;try{const tt=[R,N===ki?void 0:$&&N[0]===ki?[]:N,g];N=R,a?a(e,3,tt):e(...tt)}finally{Ge=G}}}else u.run()};return l&&l(T),u=new Sa(f),u.scheduler=o?()=>o(T,!1):T,g=_=>yh(_,!1,u),d=u.onStop=()=>{const _=Yi.get(u);if(_){if(a)a(_,4);else for(const R of _)R();Yi.delete(u)}},e?i?T(!0):N=u.run():o?o(T.bind(null,!0),!0):u.run(),v.pause=u.pause.bind(u),v.resume=u.resume.bind(u),v.stop=v,v}function Ie(t,e=1/0,n){if(e<=0||!yt(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,wt(t))Ie(t.value,e,n);else if(W(t))for(let i=0;i<t.length;i++)Ie(t[i],e,n);else if(ga(t)||bn(t))t.forEach(i=>{Ie(i,e,n)});else if(ba(t)){for(const i in t)Ie(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Ie(t[i],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function mi(t,e,n,i){try{return i?t(...i):t()}catch(r){kr(r,e,n)}}function pe(t,e,n,i){if(z(t)){const r=mi(t,e,n,i);return r&&ya(r)&&r.catch(s=>{kr(s,e,n)}),r}if(W(t)){const r=[];for(let s=0;s<t.length;s++)r.push(pe(t[s],e,n,i));return r}}function kr(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ht;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](t,a,c)===!1)return}l=l.parent}if(s){$e(),mi(s,null,10,[t,a,c]),ke();return}}bh(t,n,r,i,o)}function bh(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const It=[];let le=-1;const vn=[];let Pe=null,fn=0;const Va=Promise.resolve();let Zi=null;function $o(t){const e=Zi||Va;return t?e.then(this?t.bind(this):t):e}function vh(t){let e=le+1,n=It.length;for(;e<n;){const i=e+n>>>1,r=It[i],s=li(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function ko(t){if(!(t.flags&1)){const e=li(t),n=It[It.length-1];!n||!(t.flags&2)&&e>=li(n)?It.push(t):It.splice(vh(e),0,t),t.flags|=1,Ua()}}function Ua(){Zi||(Zi=Va.then(za))}function _h(t){W(t)?vn.push(...t):Pe&&t.id===-1?Pe.splice(fn+1,0,t):t.flags&1||(vn.push(t),t.flags|=1),Ua()}function Yo(t,e,n=le+1){for(;n<It.length;n++){const i=It[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;It.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function ja(t){if(vn.length){const e=[...new Set(vn)].sort((n,i)=>li(n)-li(i));if(vn.length=0,Pe){Pe.push(...e);return}for(Pe=e,fn=0;fn<Pe.length;fn++){const n=Pe[fn];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Pe=null,fn=0}}const li=t=>t.id==null?t.flags&2?-1:1/0:t.id;function za(t){try{for(le=0;le<It.length;le++){const e=It[le];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),mi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;le<It.length;le++){const e=It[le];e&&(e.flags&=-2)}le=-1,It.length=0,ja(),Zi=null,(It.length||vn.length)&&za()}}let ue=null,Wa=null;function Qi(t){const e=ue;return ue=t,Wa=t&&t.type.__scopeId||null,e}function xh(t,e=ue,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&ll(-1);const s=Qi(e);let o;try{o=t(...r)}finally{Qi(s),i._d&&ll(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Ue(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];s&&(l.oldValue=s[o].value);let a=l.dir[i];a&&($e(),pe(a,n,8,[t.el,l,t,e]),ke())}}const wh=Symbol("_vte"),$h=t=>t.__isTeleport,kh=Symbol("_leaveCb");function So(t,e){t.shapeFlag&6&&t.component?(t.transition=e,So(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Sh(t,e){return z(t)?Pt({name:t.name},e,{setup:t}):t}function Ga(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Ah(t){const e=Mn(),n=Ze(null);if(e){const r=e.refs===ht?e.refs={}:e.refs;Object.defineProperty(r,t,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}const tr=new WeakMap;function Wn(t,e,n,i,r=!1){if(W(t)){t.forEach((m,$)=>Wn(m,e&&(W(e)?e[$]:e),n,i,r));return}if(Gn(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Wn(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?Po(i.component):i.el,o=r?null:s,{i:l,r:a}=t,c=e&&e.r,u=l.refs===ht?l.refs={}:l.refs,f=l.setupState,d=lt(f),g=f===ht?pa:m=>at(d,m);if(c!=null&&c!==a){if(Zo(e),$t(c))u[c]=null,g(c)&&(f[c]=null);else if(wt(c)){c.value=null;const m=e;m.k&&(u[m.k]=null)}}if(z(a))mi(a,l,12,[o,u]);else{const m=$t(a),$=wt(a);if(m||$){const O=()=>{if(t.f){const v=m?g(a)?f[a]:u[a]:a.value;if(r)W(v)&&fo(v,s);else if(W(v))v.includes(s)||v.push(s);else if(m)u[a]=[s],g(a)&&(f[a]=u[a]);else{const N=[s];a.value=N,t.k&&(u[t.k]=N)}}else m?(u[a]=o,g(a)&&(f[a]=o)):$&&(a.value=o,t.k&&(u[t.k]=o))};if(o){const v=()=>{O(),tr.delete(t)};v.id=-1,tr.set(t,v),Ut(v,n)}else Zo(t),O()}}}function Zo(t){const e=tr.get(t);e&&(e.flags|=8,tr.delete(t))}xr().requestIdleCallback;xr().cancelIdleCallback;const Gn=t=>!!t.type.__asyncLoader,Ka=t=>t.type.__isKeepAlive;function Eh(t,e){qa(t,"a",e)}function Ch(t,e){qa(t,"da",e)}function qa(t,e,n=Ht){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Sr(e,i,n),n){let r=n.parent;for(;r&&r.parent;)Ka(r.parent.vnode)&&Mh(i,e,n,r),r=r.parent}}function Mh(t,e,n,i){const r=Sr(e,t,i,!0);Ja(()=>{fo(i[e],r)},n)}function Sr(t,e,n=Ht,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{$e();const l=bi(n),a=pe(e,n,t,o);return l(),ke(),a});return i?r.unshift(s):r.push(s),s}}const Ee=t=>(e,n=Ht)=>{(!ci||t==="sp")&&Sr(t,(...i)=>e(...i),n)},Ph=Ee("bm"),Ar=Ee("m"),Th=Ee("bu"),Nh=Ee("u"),Rh=Ee("bum"),Ja=Ee("um"),Oh=Ee("sp"),Ih=Ee("rtg"),Hh=Ee("rtc");function Lh(t,e=Ht){Sr("ec",t,e)}const Fh=Symbol.for("v-ndc"),ys=t=>t?gc(t)?Po(t):ys(t.parent):null,Kn=Pt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>ys(t.parent),$root:t=>ys(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Ya(t),$forceUpdate:t=>t.f||(t.f=()=>{ko(t.update)}),$nextTick:t=>t.n||(t.n=$o.bind(t.proxy)),$watch:t=>ld.bind(t)}),Br=(t,e)=>t!==ht&&!t.__isScriptSetup&&at(t,e),Dh={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(Br(i,e))return o[e]=1,i[e];if(r!==ht&&at(r,e))return o[e]=2,r[e];if((c=t.propsOptions[0])&&at(c,e))return o[e]=3,s[e];if(n!==ht&&at(n,e))return o[e]=4,n[e];ms&&(o[e]=0)}}const u=Kn[e];let f,d;if(u)return e==="$attrs"&&Mt(t.attrs,"get",""),u(t);if((f=l.__cssModules)&&(f=f[e]))return f;if(n!==ht&&at(n,e))return o[e]=4,n[e];if(d=a.config.globalProperties,at(d,e))return d[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return Br(r,e)?(r[e]=n,!0):i!==ht&&at(i,e)?(i[e]=n,!0):at(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,propsOptions:s,type:o}},l){let a,c;return!!(n[l]||t!==ht&&l[0]!=="$"&&at(t,l)||Br(e,l)||(a=s[0])&&at(a,l)||at(i,l)||at(Kn,l)||at(r.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:at(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Qo(t){return W(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let ms=!0;function Bh(t){const e=Ya(t),n=t.proxy,i=t.ctx;ms=!1,e.beforeCreate&&tl(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:g,updated:m,activated:$,deactivated:O,beforeDestroy:v,beforeUnmount:N,destroyed:T,unmounted:_,render:R,renderTracked:G,renderTriggered:tt,errorCaptured:ct,serverPrefetch:rt,expose:st,inheritAttrs:D,components:K,directives:H,filters:E}=e;if(c&&Vh(c,i,null),o)for(const X in o){const F=o[X];z(F)&&(i[X]=F.bind(n))}if(r){const X=r.call(n,n);yt(X)&&(t.data=_o(X))}if(ms=!0,s)for(const X in s){const F=s[X],ot=z(F)?F.bind(n,n):z(F.get)?F.get.bind(n,n):fe,vt=!z(F)&&z(F.set)?F.set.bind(n):fe,kt=Zt({get:ot,set:vt});Object.defineProperty(i,X,{enumerable:!0,configurable:!0,get:()=>kt.value,set:gt=>kt.value=gt})}if(l)for(const X in l)Xa(l[X],i,n,X);if(a){const X=z(a)?a.call(n):a;Reflect.ownKeys(X).forEach(F=>{Kh(F,X[F])})}u&&tl(u,t,"c");function q(X,F){W(F)?F.forEach(ot=>X(ot.bind(n))):F&&X(F.bind(n))}if(q(Ph,f),q(Ar,d),q(Th,g),q(Nh,m),q(Eh,$),q(Ch,O),q(Lh,ct),q(Hh,G),q(Ih,tt),q(Rh,N),q(Ja,_),q(Oh,rt),W(st))if(st.length){const X=t.exposed||(t.exposed={});st.forEach(F=>{Object.defineProperty(X,F,{get:()=>n[F],set:ot=>n[F]=ot,enumerable:!0})})}else t.exposed||(t.exposed={});R&&t.render===fe&&(t.render=R),D!=null&&(t.inheritAttrs=D),K&&(t.components=K),H&&(t.directives=H),rt&&Ga(t)}function Vh(t,e,n=fe){W(t)&&(t=bs(t));for(const i in t){const r=t[i];let s;yt(r)?"default"in r?s=qn(r.from||i,r.default,!0):s=qn(r.from||i):s=qn(r),wt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function tl(t,e,n){pe(W(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function Xa(t,e,n,i){let r=i.includes(".")?uc(n,i):()=>n[i];if($t(t)){const s=e[t];z(s)&&tn(r,s)}else if(z(t))tn(r,t.bind(n));else if(yt(t))if(W(t))t.forEach(s=>Xa(s,e,n,i));else{const s=z(t.handler)?t.handler.bind(n):e[t.handler];z(s)&&tn(r,s,t)}}function Ya(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,l=s.get(e);let a;return l?a=l:!r.length&&!n&&!i?a=e:(a={},r.length&&r.forEach(c=>er(a,c,o,!0)),er(a,e,o)),yt(e)&&s.set(e,a),a}function er(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&er(t,s,n,!0),r&&r.forEach(o=>er(t,o,n,!0));for(const o in e)if(!(i&&o==="expose")){const l=Uh[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Uh={data:el,props:nl,emits:nl,methods:Hn,computed:Hn,beforeCreate:Nt,created:Nt,beforeMount:Nt,mounted:Nt,beforeUpdate:Nt,updated:Nt,beforeDestroy:Nt,beforeUnmount:Nt,destroyed:Nt,unmounted:Nt,activated:Nt,deactivated:Nt,errorCaptured:Nt,serverPrefetch:Nt,components:Hn,directives:Hn,watch:zh,provide:el,inject:jh};function el(t,e){return e?t?function(){return Pt(z(t)?t.call(this,this):t,z(e)?e.call(this,this):e)}:e:t}function jh(t,e){return Hn(bs(t),bs(e))}function bs(t){if(W(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Nt(t,e){return t?[...new Set([].concat(t,e))]:e}function Hn(t,e){return t?Pt(Object.create(null),t,e):e}function nl(t,e){return t?W(t)&&W(e)?[...new Set([...t,...e])]:Pt(Object.create(null),Qo(t),Qo(e??{})):e}function zh(t,e){if(!t)return e;if(!e)return t;const n=Pt(Object.create(null),t);for(const i in e)n[i]=Nt(t[i],e[i]);return n}function Za(){return{app:null,config:{isNativeTag:pa,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wh=0;function Gh(t,e){return function(i,r=null){z(i)||(i=Pt({},i)),r!=null&&!yt(r)&&(r=null);const s=Za(),o=new WeakSet,l=[];let a=!1;const c=s.app={_uid:Wh++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:Rd,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&z(u.install)?(o.add(u),u.install(c,...f)):z(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!a){const g=c._ceVNode||Fe(i,r);return g.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),t(g,u,d),a=!0,c._container=u,u.__vue_app__=c,Po(g.component)}},onUnmount(u){l.push(u)},unmount(){a&&(pe(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Qe;Qe=c;try{return u()}finally{Qe=f}}};return c}}let Qe=null;function Kh(t,e){if(Ht){let n=Ht.provides;const i=Ht.parent&&Ht.parent.provides;i===n&&(n=Ht.provides=Object.create(i)),n[t]=e}}function qn(t,e,n=!1){const i=Mn();if(i||Qe){let r=Qe?Qe._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&z(e)?e.call(i&&i.proxy):e}}function Qa(){return!!(Mn()||Qe)}const tc={},ec=()=>Object.create(tc),nc=t=>Object.getPrototypeOf(t)===tc;function qh(t,e,n,i=!1){const r={},s=ec();t.propsDefaults=Object.create(null),ic(t,e,r,s);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=i?r:rh(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function Jh(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=t,l=lt(r),[a]=t.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Er(t.emitsOptions,d))continue;const g=e[d];if(a)if(at(s,d))g!==s[d]&&(s[d]=g,c=!0);else{const m=Be(d);r[m]=vs(a,l,m,g,t,!1)}else g!==s[d]&&(s[d]=g,c=!0)}}}else{ic(t,e,r,s)&&(c=!0);let u;for(const f in l)(!e||!at(e,f)&&((u=an(f))===f||!at(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=vs(a,l,f,void 0,t,!0)):delete r[f]);if(s!==l)for(const f in s)(!e||!at(e,f))&&(delete s[f],c=!0)}c&&xe(t.attrs,"set","")}function ic(t,e,n,i){const[r,s]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(Vn(a))continue;const c=e[a];let u;r&&at(r,u=Be(a))?!s||!s.includes(u)?n[u]=c:(l||(l={}))[u]=c:Er(t.emitsOptions,a)||(!(a in i)||c!==i[a])&&(i[a]=c,o=!0)}if(s){const a=lt(n),c=l||ht;for(let u=0;u<s.length;u++){const f=s[u];n[f]=vs(r,a,f,c[f],t,!at(c,f))}}return o}function vs(t,e,n,i,r,s){const o=t[n];if(o!=null){const l=at(o,"default");if(l&&i===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&z(a)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=bi(r);i=c[n]=a.call(null,e),u()}}else i=a;r.ce&&r.ce._setProp(n,i)}o[0]&&(s&&!l?i=!1:o[1]&&(i===""||i===an(n))&&(i=!0))}return i}const Xh=new WeakMap;function rc(t,e,n=!1){const i=n?Xh:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,o={},l=[];let a=!1;if(!z(t)){const u=f=>{a=!0;const[d,g]=rc(f,e,!0);Pt(o,d),g&&l.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!a)return yt(t)&&i.set(t,mn),mn;if(W(s))for(let u=0;u<s.length;u++){const f=Be(s[u]);il(f)&&(o[f]=ht)}else if(s)for(const u in s){const f=Be(u);if(il(f)){const d=s[u],g=o[f]=W(d)||z(d)?{type:d}:Pt({},d),m=g.type;let $=!1,O=!0;if(W(m))for(let v=0;v<m.length;++v){const N=m[v],T=z(N)&&N.name;if(T==="Boolean"){$=!0;break}else T==="String"&&(O=!1)}else $=z(m)&&m.name==="Boolean";g[0]=$,g[1]=O,($||at(g,"default"))&&l.push(f)}}const c=[o,l];return yt(t)&&i.set(t,c),c}function il(t){return t[0]!=="$"&&!Vn(t)}const Ao=t=>t==="_"||t==="_ctx"||t==="$stable",Eo=t=>W(t)?t.map(ae):[ae(t)],Yh=(t,e,n)=>{if(e._n)return e;const i=xh((...r)=>Eo(e(...r)),n);return i._c=!1,i},sc=(t,e,n)=>{const i=t._ctx;for(const r in t){if(Ao(r))continue;const s=t[r];if(z(s))e[r]=Yh(r,s,i);else if(s!=null){const o=Eo(s);e[r]=()=>o}}},oc=(t,e)=>{const n=Eo(e);t.slots.default=()=>n},lc=(t,e,n)=>{for(const i in e)(n||!Ao(i))&&(t[i]=e[i])},Zh=(t,e,n)=>{const i=t.slots=ec();if(t.vnode.shapeFlag&32){const r=e._;r?(lc(i,e,n),n&&_a(i,"_",r,!0)):sc(e,i)}else e&&oc(t,e)},Qh=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,o=ht;if(i.shapeFlag&32){const l=e._;l?n&&l===1?s=!1:lc(r,e,n):(s=!e.$stable,sc(e,r)),o=e}else e&&(oc(t,e),o={default:1});if(s)for(const l in r)!Ao(l)&&o[l]==null&&delete r[l]},Ut=gd;function td(t){return ed(t)}function ed(t,e){const n=xr();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:g=fe,insertStaticContent:m}=t,$=(h,p,y,k=null,x=null,w=null,I=void 0,C=null,A=!!p.dynamicChildren)=>{if(h===p)return;h&&!Nn(h,p)&&(k=te(h),gt(h,x,w,!0),h=null),p.patchFlag===-2&&(A=!1,p.dynamicChildren=null);const{type:S,ref:V,shapeFlag:L}=p;switch(S){case Cr:O(h,p,y,k);break;case $n:v(h,p,y,k);break;case Ii:h==null&&N(p,y,k,I);break;case _e:K(h,p,y,k,x,w,I,C,A);break;default:L&1?R(h,p,y,k,x,w,I,C,A):L&6?H(h,p,y,k,x,w,I,C,A):(L&64||L&128)&&S.process(h,p,y,k,x,w,I,C,A,Y)}V!=null&&x?Wn(V,h&&h.ref,w,p||h,!p):V==null&&h&&h.ref!=null&&Wn(h.ref,null,w,h,!0)},O=(h,p,y,k)=>{if(h==null)i(p.el=l(p.children),y,k);else{const x=p.el=h.el;p.children!==h.children&&c(x,p.children)}},v=(h,p,y,k)=>{h==null?i(p.el=a(p.children||""),y,k):p.el=h.el},N=(h,p,y,k)=>{[h.el,h.anchor]=m(h.children,p,y,k,h.el,h.anchor)},T=({el:h,anchor:p},y,k)=>{let x;for(;h&&h!==p;)x=d(h),i(h,y,k),h=x;i(p,y,k)},_=({el:h,anchor:p})=>{let y;for(;h&&h!==p;)y=d(h),r(h),h=y;r(p)},R=(h,p,y,k,x,w,I,C,A)=>{p.type==="svg"?I="svg":p.type==="math"&&(I="mathml"),h==null?G(p,y,k,x,w,I,C,A):rt(h,p,x,w,I,C,A)},G=(h,p,y,k,x,w,I,C)=>{let A,S;const{props:V,shapeFlag:L,transition:B,dirs:j}=h;if(A=h.el=o(h.type,w,V&&V.is,V),L&8?u(A,h.children):L&16&&ct(h.children,A,null,k,x,Vr(h,w),I,C),j&&Ue(h,null,k,"created"),tt(A,h,h.scopeId,I,k),V){for(const dt in V)dt!=="value"&&!Vn(dt)&&s(A,dt,null,V[dt],w,k);"value"in V&&s(A,"value",null,V.value,w),(S=V.onVnodeBeforeMount)&&re(S,k,h)}j&&Ue(h,null,k,"beforeMount");const et=nd(x,B);et&&B.beforeEnter(A),i(A,p,y),((S=V&&V.onVnodeMounted)||et||j)&&Ut(()=>{S&&re(S,k,h),et&&B.enter(A),j&&Ue(h,null,k,"mounted")},x)},tt=(h,p,y,k,x)=>{if(y&&g(h,y),k)for(let w=0;w<k.length;w++)g(h,k[w]);if(x){let w=x.subTree;if(p===w||hc(w.type)&&(w.ssContent===p||w.ssFallback===p)){const I=x.vnode;tt(h,I,I.scopeId,I.slotScopeIds,x.parent)}}},ct=(h,p,y,k,x,w,I,C,A=0)=>{for(let S=A;S<h.length;S++){const V=h[S]=C?Te(h[S]):ae(h[S]);$(null,V,p,y,k,x,w,I,C)}},rt=(h,p,y,k,x,w,I)=>{const C=p.el=h.el;let{patchFlag:A,dynamicChildren:S,dirs:V}=p;A|=h.patchFlag&16;const L=h.props||ht,B=p.props||ht;let j;if(y&&je(y,!1),(j=B.onVnodeBeforeUpdate)&&re(j,y,p,h),V&&Ue(p,h,y,"beforeUpdate"),y&&je(y,!0),(L.innerHTML&&B.innerHTML==null||L.textContent&&B.textContent==null)&&u(C,""),S?st(h.dynamicChildren,S,C,y,k,Vr(p,x),w):I||F(h,p,C,null,y,k,Vr(p,x),w,!1),A>0){if(A&16)D(C,L,B,y,x);else if(A&2&&L.class!==B.class&&s(C,"class",null,B.class,x),A&4&&s(C,"style",L.style,B.style,x),A&8){const et=p.dynamicProps;for(let dt=0;dt<et.length;dt++){const ut=et[dt],Lt=L[ut],Ft=B[ut];(Ft!==Lt||ut==="value")&&s(C,ut,Lt,Ft,x,y)}}A&1&&h.children!==p.children&&u(C,p.children)}else!I&&S==null&&D(C,L,B,y,x);((j=B.onVnodeUpdated)||V)&&Ut(()=>{j&&re(j,y,p,h),V&&Ue(p,h,y,"updated")},k)},st=(h,p,y,k,x,w,I)=>{for(let C=0;C<p.length;C++){const A=h[C],S=p[C],V=A.el&&(A.type===_e||!Nn(A,S)||A.shapeFlag&198)?f(A.el):y;$(A,S,V,null,k,x,w,I,!0)}},D=(h,p,y,k,x)=>{if(p!==y){if(p!==ht)for(const w in p)!Vn(w)&&!(w in y)&&s(h,w,p[w],null,x,k);for(const w in y){if(Vn(w))continue;const I=y[w],C=p[w];I!==C&&w!=="value"&&s(h,w,C,I,x,k)}"value"in y&&s(h,"value",p.value,y.value,x)}},K=(h,p,y,k,x,w,I,C,A)=>{const S=p.el=h?h.el:l(""),V=p.anchor=h?h.anchor:l("");let{patchFlag:L,dynamicChildren:B,slotScopeIds:j}=p;j&&(C=C?C.concat(j):j),h==null?(i(S,y,k),i(V,y,k),ct(p.children||[],y,V,x,w,I,C,A)):L>0&&L&64&&B&&h.dynamicChildren?(st(h.dynamicChildren,B,y,x,w,I,C),(p.key!=null||x&&p===x.subTree)&&ac(h,p,!0)):F(h,p,y,V,x,w,I,C,A)},H=(h,p,y,k,x,w,I,C,A)=>{p.slotScopeIds=C,h==null?p.shapeFlag&512?x.ctx.activate(p,y,k,I,A):E(p,y,k,x,w,I,A):nt(h,p,A)},E=(h,p,y,k,x,w,I)=>{const C=h.component=Ed(h,k,x);if(Ka(h)&&(C.ctx.renderer=Y),Cd(C,!1,I),C.asyncDep){if(x&&x.registerDep(C,q,I),!h.el){const A=C.subTree=Fe($n);v(null,A,p,y),h.placeholder=A.el}}else q(C,h,p,y,x,w,I)},nt=(h,p,y)=>{const k=p.component=h.component;if(dd(h,p,y))if(k.asyncDep&&!k.asyncResolved){X(k,p,y);return}else k.next=p,k.update();else p.el=h.el,k.vnode=p},q=(h,p,y,k,x,w,I)=>{const C=()=>{if(h.isMounted){let{next:L,bu:B,u:j,parent:et,vnode:dt}=h;{const ne=cc(h);if(ne){L&&(L.el=dt.el,X(h,L,I)),ne.asyncDep.then(()=>{h.isUnmounted||C()});return}}let ut=L,Lt;je(h,!1),L?(L.el=dt.el,X(h,L,I)):L=dt,B&&Ir(B),(Lt=L.props&&L.props.onVnodeBeforeUpdate)&&re(Lt,et,L,dt),je(h,!0);const Ft=sl(h),ee=h.subTree;h.subTree=Ft,$(ee,Ft,f(ee.el),te(ee),h,x,w),L.el=Ft.el,ut===null&&pd(h,Ft.el),j&&Ut(j,x),(Lt=L.props&&L.props.onVnodeUpdated)&&Ut(()=>re(Lt,et,L,dt),x)}else{let L;const{el:B,props:j}=p,{bm:et,m:dt,parent:ut,root:Lt,type:Ft}=h,ee=Gn(p);je(h,!1),et&&Ir(et),!ee&&(L=j&&j.onVnodeBeforeMount)&&re(L,ut,p),je(h,!0);{Lt.ce&&Lt.ce._def.shadowRoot!==!1&&Lt.ce._injectChildStyle(Ft);const ne=h.subTree=sl(h);$(null,ne,y,k,h,x,w),p.el=ne.el}if(dt&&Ut(dt,x),!ee&&(L=j&&j.onVnodeMounted)){const ne=p;Ut(()=>re(L,ut,ne),x)}(p.shapeFlag&256||ut&&Gn(ut.vnode)&&ut.vnode.shapeFlag&256)&&h.a&&Ut(h.a,x),h.isMounted=!0,p=y=k=null}};h.scope.on();const A=h.effect=new Sa(C);h.scope.off();const S=h.update=A.run.bind(A),V=h.job=A.runIfDirty.bind(A);V.i=h,V.id=h.uid,A.scheduler=()=>ko(V),je(h,!0),S()},X=(h,p,y)=>{p.component=h;const k=h.vnode.props;h.vnode=p,h.next=null,Jh(h,p.props,k,y),Qh(h,p.children,y),$e(),Yo(h),ke()},F=(h,p,y,k,x,w,I,C,A=!1)=>{const S=h&&h.children,V=h?h.shapeFlag:0,L=p.children,{patchFlag:B,shapeFlag:j}=p;if(B>0){if(B&128){vt(S,L,y,k,x,w,I,C,A);return}else if(B&256){ot(S,L,y,k,x,w,I,C,A);return}}j&8?(V&16&&Gt(S,x,w),L!==S&&u(y,L)):V&16?j&16?vt(S,L,y,k,x,w,I,C,A):Gt(S,x,w,!0):(V&8&&u(y,""),j&16&&ct(L,y,k,x,w,I,C,A))},ot=(h,p,y,k,x,w,I,C,A)=>{h=h||mn,p=p||mn;const S=h.length,V=p.length,L=Math.min(S,V);let B;for(B=0;B<L;B++){const j=p[B]=A?Te(p[B]):ae(p[B]);$(h[B],j,y,null,x,w,I,C,A)}S>V?Gt(h,x,w,!0,!1,L):ct(p,y,k,x,w,I,C,A,L)},vt=(h,p,y,k,x,w,I,C,A)=>{let S=0;const V=p.length;let L=h.length-1,B=V-1;for(;S<=L&&S<=B;){const j=h[S],et=p[S]=A?Te(p[S]):ae(p[S]);if(Nn(j,et))$(j,et,y,null,x,w,I,C,A);else break;S++}for(;S<=L&&S<=B;){const j=h[L],et=p[B]=A?Te(p[B]):ae(p[B]);if(Nn(j,et))$(j,et,y,null,x,w,I,C,A);else break;L--,B--}if(S>L){if(S<=B){const j=B+1,et=j<V?p[j].el:k;for(;S<=B;)$(null,p[S]=A?Te(p[S]):ae(p[S]),y,et,x,w,I,C,A),S++}}else if(S>B)for(;S<=L;)gt(h[S],x,w,!0),S++;else{const j=S,et=S,dt=new Map;for(S=et;S<=B;S++){const Vt=p[S]=A?Te(p[S]):ae(p[S]);Vt.key!=null&&dt.set(Vt.key,S)}let ut,Lt=0;const Ft=B-et+1;let ee=!1,ne=0;const Pn=new Array(Ft);for(S=0;S<Ft;S++)Pn[S]=0;for(S=j;S<=L;S++){const Vt=h[S];if(Lt>=Ft){gt(Vt,x,w,!0);continue}let ie;if(Vt.key!=null)ie=dt.get(Vt.key);else for(ut=et;ut<=B;ut++)if(Pn[ut-et]===0&&Nn(Vt,p[ut])){ie=ut;break}ie===void 0?gt(Vt,x,w,!0):(Pn[ie-et]=S+1,ie>=ne?ne=ie:ee=!0,$(Vt,p[ie],y,null,x,w,I,C,A),Lt++)}const Wo=ee?id(Pn):mn;for(ut=Wo.length-1,S=Ft-1;S>=0;S--){const Vt=et+S,ie=p[Vt],Go=p[Vt+1],Ko=Vt+1<V?Go.el||Go.placeholder:k;Pn[S]===0?$(null,ie,y,Ko,x,w,I,C,A):ee&&(ut<0||S!==Wo[ut]?kt(ie,y,Ko,2):ut--)}}},kt=(h,p,y,k,x=null)=>{const{el:w,type:I,transition:C,children:A,shapeFlag:S}=h;if(S&6){kt(h.component.subTree,p,y,k);return}if(S&128){h.suspense.move(p,y,k);return}if(S&64){I.move(h,p,y,Y);return}if(I===_e){i(w,p,y);for(let L=0;L<A.length;L++)kt(A[L],p,y,k);i(h.anchor,p,y);return}if(I===Ii){T(h,p,y);return}if(k!==2&&S&1&&C)if(k===0)C.beforeEnter(w),i(w,p,y),Ut(()=>C.enter(w),x);else{const{leave:L,delayLeave:B,afterLeave:j}=C,et=()=>{h.ctx.isUnmounted?r(w):i(w,p,y)},dt=()=>{w._isLeaving&&w[kh](!0),L(w,()=>{et(),j&&j()})};B?B(w,et,dt):dt()}else i(w,p,y)},gt=(h,p,y,k=!1,x=!1)=>{const{type:w,props:I,ref:C,children:A,dynamicChildren:S,shapeFlag:V,patchFlag:L,dirs:B,cacheIndex:j}=h;if(L===-2&&(x=!1),C!=null&&($e(),Wn(C,null,y,h,!0),ke()),j!=null&&(p.renderCache[j]=void 0),V&256){p.ctx.deactivate(h);return}const et=V&1&&B,dt=!Gn(h);let ut;if(dt&&(ut=I&&I.onVnodeBeforeUnmount)&&re(ut,p,h),V&6)Tt(h.component,y,k);else{if(V&128){h.suspense.unmount(y,k);return}et&&Ue(h,null,p,"beforeUnmount"),V&64?h.type.remove(h,p,y,Y,k):S&&!S.hasOnce&&(w!==_e||L>0&&L&64)?Gt(S,p,y,!1,!0):(w===_e&&L&384||!x&&V&16)&&Gt(A,p,y),k&&Ce(h)}(dt&&(ut=I&&I.onVnodeUnmounted)||et)&&Ut(()=>{ut&&re(ut,p,h),et&&Ue(h,null,p,"unmounted")},y)},Ce=h=>{const{type:p,el:y,anchor:k,transition:x}=h;if(p===_e){Me(y,k);return}if(p===Ii){_(h);return}const w=()=>{r(y),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(h.shapeFlag&1&&x&&!x.persisted){const{leave:I,delayLeave:C}=x,A=()=>I(y,w);C?C(h.el,w,A):A()}else w()},Me=(h,p)=>{let y;for(;h!==p;)y=d(h),r(h),h=y;r(p)},Tt=(h,p,y)=>{const{bum:k,scope:x,job:w,subTree:I,um:C,m:A,a:S}=h;rl(A),rl(S),k&&Ir(k),x.stop(),w&&(w.flags|=8,gt(I,h,p,y)),C&&Ut(C,p),Ut(()=>{h.isUnmounted=!0},p)},Gt=(h,p,y,k=!1,x=!1,w=0)=>{for(let I=w;I<h.length;I++)gt(h[I],p,y,k,x)},te=h=>{if(h.shapeFlag&6)return te(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=d(h.anchor||h.el),y=p&&p[wh];return y?d(y):p};let ye=!1;const J=(h,p,y)=>{h==null?p._vnode&&gt(p._vnode,null,null,!0):$(p._vnode||null,h,p,null,null,null,y),p._vnode=h,ye||(ye=!0,Yo(),ja(),ye=!1)},Y={p:$,um:gt,m:kt,r:Ce,mt:E,mc:ct,pc:F,pbc:st,n:te,o:t};return{render:J,hydrate:void 0,createApp:Gh(J)}}function Vr({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function je({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function nd(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ac(t,e,n=!1){const i=t.children,r=e.children;if(W(i)&&W(r))for(let s=0;s<i.length;s++){const o=i[s];let l=r[s];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[s]=Te(r[s]),l.el=o.el),!n&&l.patchFlag!==-2&&ac(o,l)),l.type===Cr&&l.patchFlag!==-1&&(l.el=o.el),l.type===$n&&!l.el&&(l.el=o.el)}}function id(t){const e=t.slice(),n=[0];let i,r,s,o,l;const a=t.length;for(i=0;i<a;i++){const c=t[i];if(c!==0){if(r=n[n.length-1],t[r]<c){e[i]=r,n.push(i);continue}for(s=0,o=n.length-1;s<o;)l=s+o>>1,t[n[l]]<c?s=l+1:o=l;c<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function cc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:cc(e)}function rl(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const rd=Symbol.for("v-scx"),sd=()=>qn(rd);function od(t,e){return Co(t,null,e)}function tn(t,e,n){return Co(t,e,n)}function Co(t,e,n=ht){const{immediate:i,deep:r,flush:s,once:o}=n,l=Pt({},n),a=e&&i||!e&&s!=="post";let c;if(ci){if(s==="sync"){const g=sd();c=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=fe,g.resume=fe,g.pause=fe,g}}const u=Ht;l.call=(g,m,$)=>pe(g,u,m,$);let f=!1;s==="post"?l.scheduler=g=>{Ut(g,u&&u.suspense)}:s!=="sync"&&(f=!0,l.scheduler=(g,m)=>{m?g():ko(g)}),l.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const d=mh(t,e,l);return ci&&(c?c.push(d):a&&d()),d}function ld(t,e,n){const i=this.proxy,r=$t(t)?t.includes(".")?uc(i,t):()=>i[t]:t.bind(i,i);let s;z(e)?s=e:(s=e.handler,n=e);const o=bi(this),l=Co(r,s.bind(i),n);return o(),l}function uc(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const ad=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Be(e)}Modifiers`]||t[`${an(e)}Modifiers`];function cd(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||ht;let r=n;const s=e.startsWith("update:"),o=s&&ad(i,e.slice(7));o&&(o.trim&&(r=n.map(u=>$t(u)?u.trim():u)),o.number&&(r=n.map(Pf)));let l,a=i[l=Or(e)]||i[l=Or(Be(e))];!a&&s&&(a=i[l=Or(an(e))]),a&&pe(a,t,6,r);const c=i[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,pe(c,t,6,r)}}const ud=new WeakMap;function fc(t,e,n=!1){const i=n?ud:e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let o={},l=!1;if(!z(t)){const a=c=>{const u=fc(c,e,!0);u&&(l=!0,Pt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!s&&!l?(yt(t)&&i.set(t,null),null):(W(s)?s.forEach(a=>o[a]=null):Pt(o,s),yt(t)&&i.set(t,o),o)}function Er(t,e){return!t||!br(e)?!1:(e=e.slice(2).replace(/Once$/,""),at(t,e[0].toLowerCase()+e.slice(1))||at(t,an(e))||at(t,e))}function sl(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:f,data:d,setupState:g,ctx:m,inheritAttrs:$}=t,O=Qi(t);let v,N;try{if(n.shapeFlag&4){const _=r||i,R=_;v=ae(c.call(R,_,u,f,g,d,m)),N=l}else{const _=e;v=ae(_.length>1?_(f,{attrs:l,slots:o,emit:a}):_(f,null)),N=e.props?l:fd(l)}}catch(_){Jn.length=0,kr(_,t,1),v=Fe($n)}let T=v;if(N&&$!==!1){const _=Object.keys(N),{shapeFlag:R}=T;_.length&&R&7&&(s&&_.some(uo)&&(N=hd(N,s)),T=kn(T,N,!1,!0))}return n.dirs&&(T=kn(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&So(T,n.transition),v=T,Qi(O),v}const fd=t=>{let e;for(const n in t)(n==="class"||n==="style"||br(n))&&((e||(e={}))[n]=t[n]);return e},hd=(t,e)=>{const n={};for(const i in t)(!uo(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function dd(t,e,n){const{props:i,children:r,component:s}=t,{props:o,children:l,patchFlag:a}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return i?ol(i,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==i[d]&&!Er(c,d))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:i===o?!1:i?o?ol(i,o,c):!0:!!o;return!1}function ol(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==t[s]&&!Er(n,s))return!0}return!1}function pd({vnode:t,parent:e},n){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===t&&(i.el=t.el),i===t)(t=e.vnode).el=n,e=e.parent;else break}}const hc=t=>t.__isSuspense;function gd(t,e){e&&e.pendingBranch?W(t)?e.effects.push(...t):e.effects.push(t):_h(t)}const _e=Symbol.for("v-fgt"),Cr=Symbol.for("v-txt"),$n=Symbol.for("v-cmt"),Ii=Symbol.for("v-stc"),Jn=[];let jt=null;function yd(t=!1){Jn.push(jt=t?null:[])}function md(){Jn.pop(),jt=Jn[Jn.length-1]||null}let ai=1;function ll(t,e=!1){ai+=t,t<0&&jt&&e&&(jt.hasOnce=!0)}function bd(t){return t.dynamicChildren=ai>0?jt||mn:null,md(),ai>0&&jt&&jt.push(t),t}function vd(t,e,n,i,r,s){return bd(Kt(t,e,n,i,r,s,!0))}function dc(t){return t?t.__v_isVNode===!0:!1}function Nn(t,e){return t.type===e.type&&t.key===e.key}const pc=({key:t})=>t??null,Hi=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?$t(t)||wt(t)||z(t)?{i:ue,r:t,k:e,f:!!n}:t:null);function Kt(t,e=null,n=null,i=0,r=null,s=t===_e?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&pc(e),ref:e&&Hi(e),scopeId:Wa,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:ue};return l?(Mo(a,n),s&128&&t.normalize(a)):n&&(a.shapeFlag|=$t(n)?8:16),ai>0&&!o&&jt&&(a.patchFlag>0||s&6)&&a.patchFlag!==32&&jt.push(a),a}const Fe=_d;function _d(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===Fh)&&(t=$n),dc(t)){const l=kn(t,e,!0);return n&&Mo(l,n),ai>0&&!s&&jt&&(l.shapeFlag&6?jt[jt.indexOf(t)]=l:jt.push(l)),l.patchFlag=-2,l}if(Nd(t)&&(t=t.__vccOpts),e){e=xd(e);let{class:l,style:a}=e;l&&!$t(l)&&(e.class=po(l)),yt(a)&&(wo(a)&&!W(a)&&(a=Pt({},a)),e.style=wr(a))}const o=$t(t)?1:hc(t)?128:$h(t)?64:yt(t)?4:z(t)?2:0;return Kt(t,e,n,i,r,o,s,!0)}function xd(t){return t?wo(t)||nc(t)?Pt({},t):t:null}function kn(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:l,transition:a}=t,c=e?kd(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&pc(c),ref:e&&e.ref?n&&s?W(s)?s.concat(Hi(e)):[s,Hi(e)]:Hi(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==_e?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&kn(t.ssContent),ssFallback:t.ssFallback&&kn(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&i&&So(u,a.clone(u)),u}function wd(t=" ",e=0){return Fe(Cr,null,t,e)}function $d(t,e){const n=Fe(Ii,null,t);return n.staticCount=e,n}function ae(t){return t==null||typeof t=="boolean"?Fe($n):W(t)?Fe(_e,null,t.slice()):dc(t)?Te(t):Fe(Cr,null,String(t))}function Te(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:kn(t)}function Mo(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(W(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Mo(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!nc(e)?e._ctx=ue:r===3&&ue&&(ue.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else z(e)?(e={default:e,_ctx:ue},n=32):(e=String(e),i&64?(n=16,e=[wd(e)]):n=8);t.children=e,t.shapeFlag|=n}function kd(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=po([e.class,i.class]));else if(r==="style")e.style=wr([e.style,i.style]);else if(br(r)){const s=e[r],o=i[r];o&&s!==o&&!(W(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function re(t,e,n,i=null){pe(t,e,7,[n,i])}const Sd=Za();let Ad=0;function Ed(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||Sd,s={uid:Ad++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Lf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rc(i,r),emitsOptions:fc(i,r),emit:null,emitted:null,propsDefaults:ht,inheritAttrs:i.inheritAttrs,ctx:ht,data:ht,props:ht,attrs:ht,slots:ht,refs:ht,setupState:ht,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=cd.bind(null,s),t.ce&&t.ce(s),s}let Ht=null;const Mn=()=>Ht||ue;let nr,_s;{const t=xr(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};nr=e("__VUE_INSTANCE_SETTERS__",n=>Ht=n),_s=e("__VUE_SSR_SETTERS__",n=>ci=n)}const bi=t=>{const e=Ht;return nr(t),t.scope.on(),()=>{t.scope.off(),nr(e)}},al=()=>{Ht&&Ht.scope.off(),nr(null)};function gc(t){return t.vnode.shapeFlag&4}let ci=!1;function Cd(t,e=!1,n=!1){e&&_s(e);const{props:i,children:r}=t.vnode,s=gc(t);qh(t,i,s,e),Zh(t,r,n||e);const o=s?Md(t,e):void 0;return e&&_s(!1),o}function Md(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Dh);const{setup:i}=n;if(i){$e();const r=t.setupContext=i.length>1?Td(t):null,s=bi(t),o=mi(i,t,0,[t.props,r]),l=ya(o);if(ke(),s(),(l||t.sp)&&!Gn(t)&&Ga(t),l){if(o.then(al,al),e)return o.then(a=>{cl(t,a)}).catch(a=>{kr(a,t,0)});t.asyncDep=o}else cl(t,o)}else yc(t)}function cl(t,e,n){z(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:yt(e)&&(t.setupState=Ba(e)),yc(t)}function yc(t,e,n){const i=t.type;t.render||(t.render=i.render||fe);{const r=bi(t);$e();try{Bh(t)}finally{ke(),r()}}}const Pd={get(t,e){return Mt(t,"get",""),t[e]}};function Td(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Pd),slots:t.slots,emit:t.emit,expose:e}}function Po(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Ba(sh(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Kn)return Kn[n](t)},has(e,n){return n in e||n in Kn}})):t.proxy}function Nd(t){return z(t)&&"__vccOpts"in t}const Zt=(t,e)=>gh(t,e,ci),Rd="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let xs;const ul=typeof window<"u"&&window.trustedTypes;if(ul)try{xs=ul.createPolicy("vue",{createHTML:t=>t})}catch{}const mc=xs?t=>xs.createHTML(t):t=>t,Od="http://www.w3.org/2000/svg",Id="http://www.w3.org/1998/Math/MathML",ve=typeof document<"u"?document:null,fl=ve&&ve.createElement("template"),Hd={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?ve.createElementNS(Od,t):e==="mathml"?ve.createElementNS(Id,t):n?ve.createElement(t,{is:n}):ve.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>ve.createTextNode(t),createComment:t=>ve.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>ve.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const o=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{fl.innerHTML=mc(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const l=fl.content;if(i==="svg"||i==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Ld=Symbol("_vtc");function Fd(t,e,n){const i=t[Ld];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const hl=Symbol("_vod"),Dd=Symbol("_vsh"),Bd=Symbol(""),Vd=/(?:^|;)\s*display\s*:/;function Ud(t,e,n){const i=t.style,r=$t(n);let s=!1;if(n&&!r){if(e)if($t(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Li(i,l,"")}else for(const o in e)n[o]==null&&Li(i,o,"");for(const o in n)o==="display"&&(s=!0),Li(i,o,n[o])}else if(r){if(e!==n){const o=i[Bd];o&&(n+=";"+o),i.cssText=n,s=Vd.test(n)}}else e&&t.removeAttribute("style");hl in t&&(t[hl]=s?i.display:"",t[Dd]&&(i.display="none"))}const dl=/\s*!important$/;function Li(t,e,n){if(W(n))n.forEach(i=>Li(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=jd(t,e);dl.test(n)?t.setProperty(an(i),n.replace(dl,""),"important"):t[i]=n}}const pl=["Webkit","Moz","ms"],Ur={};function jd(t,e){const n=Ur[e];if(n)return n;let i=Be(e);if(i!=="filter"&&i in t)return Ur[e]=i;i=va(i);for(let r=0;r<pl.length;r++){const s=pl[r]+i;if(s in t)return Ur[e]=s}return e}const gl="http://www.w3.org/1999/xlink";function yl(t,e,n,i,r,s=Hf(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(gl,e.slice(6,e.length)):t.setAttributeNS(gl,e,n):n==null||s&&!xa(n)?t.removeAttribute(e):t.setAttribute(e,s?"":Ve(n)?String(n):n)}function ml(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?mc(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const l=s==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=xa(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function zd(t,e,n,i){t.addEventListener(e,n,i)}function Wd(t,e,n,i){t.removeEventListener(e,n,i)}const bl=Symbol("_vei");function Gd(t,e,n,i,r=null){const s=t[bl]||(t[bl]={}),o=s[e];if(i&&o)o.value=i;else{const[l,a]=Kd(e);if(i){const c=s[e]=Xd(i,r);zd(t,l,c,a)}else o&&(Wd(t,l,o,a),s[e]=void 0)}}const vl=/(?:Once|Passive|Capture)$/;function Kd(t){let e;if(vl.test(t)){e={};let i;for(;i=t.match(vl);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):an(t.slice(2)),e]}let jr=0;const qd=Promise.resolve(),Jd=()=>jr||(qd.then(()=>jr=0),jr=Date.now());function Xd(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;pe(Yd(i,n.value),e,5,[i])};return n.value=t,n.attached=Jd(),n}function Yd(t,e){if(W(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const _l=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Zd=(t,e,n,i,r,s)=>{const o=r==="svg";e==="class"?Fd(t,i,o):e==="style"?Ud(t,n,i):br(e)?uo(e)||Gd(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Qd(t,e,i,o))?(ml(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&yl(t,e,i,o,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!$t(i))?ml(t,Be(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),yl(t,e,i,o))};function Qd(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&_l(e)&&z(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return _l(e)&&$t(n)?!1:e in t}const tp=Pt({patchProp:Zd},Hd);let xl;function ep(){return xl||(xl=td(tp))}const np=(...t)=>{const e=ep().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=rp(i);if(!r)return;const s=e._component;!z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,ip(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function ip(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function rp(t){return $t(t)?document.querySelector(t):t}function sp(t){return ka()?(Ff(t),!0):!1}const zr=new WeakMap,op=(...t)=>{var e;const n=t[0],i=(e=Mn())==null?void 0:e.proxy;if(i==null&&!Qa())throw new Error("injectLocal must be called in setup");return i&&zr.has(i)&&n in zr.get(i)?zr.get(i)[n]:qn(...t)},lp=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const ap=Object.prototype.toString,cp=t=>ap.call(t)==="[object Object]",up=()=>{};function bc(...t){if(t.length!==1)return hh(...t);const e=t[0];return typeof e=="function"?si(ch(()=>({get:e,set:up}))):oi(e)}function fp(t,e){function n(...i){return new Promise((r,s)=>{Promise.resolve(t(()=>e.apply(this,i),{fn:e,thisArg:this,args:i})).then(r).catch(s)})}return n}const vc=t=>t();function hp(t=vc,e={}){const{initialState:n="active"}=e,i=bc(n==="active");function r(){i.value=!1}function s(){i.value=!0}const o=(...l)=>{i.value&&t(...l)};return{isActive:si(i),pause:r,resume:s,eventFilter:o}}function wl(t){return t.endsWith("rem")?Number.parseFloat(t)*16:Number.parseFloat(t)}function Wr(t){return Array.isArray(t)?t:[t]}function dp(t){return Mn()}function pp(t,e,n={}){const{eventFilter:i=vc,...r}=n;return tn(t,fp(i,e),r)}function gp(t,e,n={}){const{eventFilter:i,initialState:r="active",...s}=n,{eventFilter:o,pause:l,resume:a,isActive:c}=hp(i,{initialState:r});return{stop:pp(t,e,{...s,eventFilter:o}),pause:l,resume:a,isActive:c}}function _c(t,e=!0,n){dp()?Ar(t,n):e?t():$o(t)}function yp(t=!1,e={}){const{truthyValue:n=!0,falsyValue:i=!1}=e,r=wt(t),s=Ze(t);function o(l){if(arguments.length)return s.value=l,s.value;{const a=he(n);return s.value=s.value===a?he(i):a,s.value}}return r?o:[s,o]}function mp(t,e,n){return tn(t,e,{...n,immediate:!0})}const ui=lp?window:void 0;function xc(t){var e;const n=he(t);return(e=n==null?void 0:n.$el)!=null?e:n}function ir(...t){const e=[],n=()=>{e.forEach(l=>l()),e.length=0},i=(l,a,c,u)=>(l.addEventListener(a,c,u),()=>l.removeEventListener(a,c,u)),r=Zt(()=>{const l=Wr(he(t[0])).filter(a=>a!=null);return l.every(a=>typeof a!="string")?l:void 0}),s=mp(()=>{var l,a;return[(a=(l=r.value)==null?void 0:l.map(c=>xc(c)))!=null?a:[ui].filter(c=>c!=null),Wr(he(r.value?t[1]:t[0])),Wr(Oe(r.value?t[2]:t[1])),he(r.value?t[3]:t[2])]},([l,a,c,u])=>{if(n(),!(l!=null&&l.length)||!(a!=null&&a.length)||!(c!=null&&c.length))return;const f=cp(u)?{...u}:u;e.push(...l.flatMap(d=>a.flatMap(g=>c.map(m=>i(d,g,m,f)))))},{flush:"post"}),o=()=>{s(),n()};return sp(n),o}function bp(){const t=Ze(!1),e=Mn();return e&&Ar(()=>{t.value=!0},e),t}function vp(t){const e=bp();return Zt(()=>(e.value,!!t()))}const _p=Symbol("vueuse-ssr-width");function xp(){const t=Qa()?op(_p,null):null;return typeof t=="number"?t:void 0}function wp(t,e={}){const{window:n=ui,ssrWidth:i=xp()}=e,r=vp(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function"),s=Ze(typeof i=="number"),o=Ze(),l=Ze(!1),a=c=>{l.value=c.matches};return od(()=>{if(s.value){s.value=!r.value;const c=he(t).split(",");l.value=c.some(u=>{const f=u.includes("not all"),d=u.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),g=u.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let m=!!(d||g);return d&&m&&(m=i>=wl(d[1])),g&&m&&(m=i<=wl(g[1])),f?!m:m});return}r.value&&(o.value=n.matchMedia(he(t)),l.value=o.value.matches)}),ir(o,"change",a,{passive:!0}),Zt(()=>l.value)}const Si=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ai="__vueuse_ssr_handlers__",$p=kp();function kp(){return Ai in Si||(Si[Ai]=Si[Ai]||{}),Si[Ai]}function wc(t,e){return $p[t]||e}function Sp(t){return wp("(prefers-color-scheme: dark)",t)}function Ap(t){return t==null?"any":t instanceof Set?"set":t instanceof Map?"map":t instanceof Date?"date":typeof t=="boolean"?"boolean":typeof t=="string"?"string":typeof t=="object"?"object":Number.isNaN(t)?"any":"number"}const Ep={boolean:{read:t=>t==="true",write:t=>String(t)},object:{read:t=>JSON.parse(t),write:t=>JSON.stringify(t)},number:{read:t=>Number.parseFloat(t),write:t=>String(t)},any:{read:t=>t,write:t=>String(t)},string:{read:t=>t,write:t=>String(t)},map:{read:t=>new Map(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t.entries()))},set:{read:t=>new Set(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t))},date:{read:t=>new Date(t),write:t=>t.toISOString()}},$l="vueuse-storage";function Cp(t,e,n,i={}){var r;const{flush:s="pre",deep:o=!0,listenToStorageChanges:l=!0,writeDefaults:a=!0,mergeDefaults:c=!1,shallow:u,window:f=ui,eventFilter:d,onError:g=E=>{console.error(E)},initOnMounted:m}=i,$=(u?Ze:oi)(typeof e=="function"?e():e),O=Zt(()=>he(t));if(!n)try{n=wc("getDefaultStorage",()=>{var E;return(E=ui)==null?void 0:E.localStorage})()}catch(E){g(E)}if(!n)return $;const v=he(e),N=Ap(v),T=(r=i.serializer)!=null?r:Ep[N],{pause:_,resume:R}=gp($,E=>st(E),{flush:s,deep:o,eventFilter:d});tn(O,()=>K(),{flush:s});let G=!1;const tt=E=>{m&&!G||K(E)},ct=E=>{m&&!G||H(E)};f&&l&&(n instanceof Storage?ir(f,"storage",tt,{passive:!0}):ir(f,$l,ct)),m?_c(()=>{G=!0,K()}):K();function rt(E,nt){if(f){const q={key:O.value,oldValue:E,newValue:nt,storageArea:n};f.dispatchEvent(n instanceof Storage?new StorageEvent("storage",q):new CustomEvent($l,{detail:q}))}}function st(E){try{const nt=n.getItem(O.value);if(E==null)rt(nt,null),n.removeItem(O.value);else{const q=T.write(E);nt!==q&&(n.setItem(O.value,q),rt(nt,q))}}catch(nt){g(nt)}}function D(E){const nt=E?E.newValue:n.getItem(O.value);if(nt==null)return a&&v!=null&&n.setItem(O.value,T.write(v)),v;if(!E&&c){const q=T.read(nt);return typeof c=="function"?c(q,v):N==="object"&&!Array.isArray(q)?{...v,...q}:q}else return typeof nt!="string"?nt:T.read(nt)}function K(E){if(!(E&&E.storageArea!==n)){if(E&&E.key==null){$.value=v;return}if(!(E&&E.key!==O.value)){_();try{const nt=T.write($.value);(E===void 0||(E==null?void 0:E.newValue)!==nt)&&($.value=D(E))}catch(nt){g(nt)}finally{E?$o(R):R()}}}}function H(E){K(E.detail)}return $}const Mp="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";function Pp(t={}){const{selector:e="html",attribute:n="class",initialValue:i="auto",window:r=ui,storage:s,storageKey:o="vueuse-color-scheme",listenToStorageChanges:l=!0,storageRef:a,emitAuto:c,disableTransition:u=!0}=t,f={auto:"",light:"light",dark:"dark",...t.modes||{}},d=Sp({window:r}),g=Zt(()=>d.value?"dark":"light"),m=a||(o==null?bc(i):Cp(o,i,s,{window:r,listenToStorageChanges:l})),$=Zt(()=>m.value==="auto"?g.value:m.value),O=wc("updateHTMLAttrs",(_,R,G)=>{const tt=typeof _=="string"?r==null?void 0:r.document.querySelector(_):xc(_);if(!tt)return;const ct=new Set,rt=new Set;let st=null;if(R==="class"){const K=G.split(/\s/g);Object.values(f).flatMap(H=>(H||"").split(/\s/g)).filter(Boolean).forEach(H=>{K.includes(H)?ct.add(H):rt.add(H)})}else st={key:R,value:G};if(ct.size===0&&rt.size===0&&st===null)return;let D;u&&(D=r.document.createElement("style"),D.appendChild(document.createTextNode(Mp)),r.document.head.appendChild(D));for(const K of ct)tt.classList.add(K);for(const K of rt)tt.classList.remove(K);st&&tt.setAttribute(st.key,st.value),u&&(r.getComputedStyle(D).opacity,document.head.removeChild(D))});function v(_){var R;O(e,n,(R=f[_])!=null?R:_)}function N(_){t.onChanged?t.onChanged(_,v):v(_)}tn($,N,{flush:"post",immediate:!0}),_c(()=>N($.value));const T=Zt({get(){return c?m.value:$.value},set(_){m.value=_}});return Object.assign(T,{store:m,system:g,state:$})}function Tp(t={}){const{valueDark:e="dark",valueLight:n=""}=t,i=Pp({...t,onChanged:(o,l)=>{var a;t.onChanged?(a=t.onChanged)==null||a.call(t,o==="dark",l,o):l(o)},modes:{dark:e,light:n}}),r=Zt(()=>i.system.value);return Zt({get(){return i.value==="dark"},set(o){const l=o?"dark":"light";r.value===l?i.value="auto":i.value=l}})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fi=globalThis,To=Fi.ShadowRoot&&(Fi.ShadyCSS===void 0||Fi.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,No=Symbol(),kl=new WeakMap;let $c=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==No)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(To&&e===void 0){const i=n!==void 0&&n.length===1;i&&(e=kl.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&kl.set(n,e))}return e}toString(){return this.cssText}};const Np=t=>new $c(typeof t=="string"?t:t+"",void 0,No),At=(t,...e)=>{const n=t.length===1?t[0]:e.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new $c(n,t,No)},Rp=(t,e)=>{if(To)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of e){const i=document.createElement("style"),r=Fi.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,t.appendChild(i)}},Sl=To?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const i of e.cssRules)n+=i.cssText;return Np(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Op,defineProperty:Ip,getOwnPropertyDescriptor:Hp,getOwnPropertyNames:Lp,getOwnPropertySymbols:Fp,getPrototypeOf:Dp}=Object,De=globalThis,Al=De.trustedTypes,Bp=Al?Al.emptyScript:"",Gr=De.reactiveElementPolyfillSupport,Xn=(t,e)=>t,ws={toAttribute(t,e){switch(e){case Boolean:t=t?Bp:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},kc=(t,e)=>!Op(t,e),El={attribute:!0,type:String,converter:ws,reflect:!1,useDefault:!1,hasChanged:kc};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),De.litPropertyMetadata??(De.litPropertyMetadata=new WeakMap);let hn=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=El){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(e,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,n);r!==void 0&&Ip(this.prototype,e,r)}}static getPropertyDescriptor(e,n,i){const{get:r,set:s}=Hp(this.prototype,e)??{get(){return this[n]},set(o){this[n]=o}};return{get:r,set(o){const l=r==null?void 0:r.call(this);s==null||s.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??El}static _$Ei(){if(this.hasOwnProperty(Xn("elementProperties")))return;const e=Dp(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Xn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xn("properties"))){const n=this.properties,i=[...Lp(n),...Fp(n)];for(const r of i)this.createProperty(r,n[r])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)n.unshift(Sl(r))}else e!==void 0&&n.push(Sl(e));return n}static _$Eu(e,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(n=>n(this))}addController(e){var n;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)==null||n.call(e))}removeController(e){var n;(n=this._$EO)==null||n.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Rp(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$ET(e,n){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:ws).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,n){var s,o;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((s=l.converter)==null?void 0:s.fromAttribute)!==void 0?l.converter:ws;this._$Em=r;const c=a.fromAttribute(n,l.type);this[r]=c??((o=this._$Ej)==null?void 0:o.get(r))??c,this._$Em=null}}requestUpdate(e,n,i){var r;if(e!==void 0){const s=this.constructor,o=this[e];if(i??(i=s.getPropertyOptions(e)),!((i.hasChanged??kc)(o,n)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,n,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??n??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(n=void 0),this._$AL.set(e,n)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,o]of r){const{wrapped:l}=o,a=this[s];l!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,o,a)}}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(n)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(n)}willUpdate(e){}_$AE(e){var n;(n=this._$EO)==null||n.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(n=>this._$ET(n,this[n]))),this._$EM()}updated(e){}firstUpdated(e){}};hn.elementStyles=[],hn.shadowRootOptions={mode:"open"},hn[Xn("elementProperties")]=new Map,hn[Xn("finalized")]=new Map,Gr==null||Gr({ReactiveElement:hn}),(De.reactiveElementVersions??(De.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yn=globalThis,rr=Yn.trustedTypes,Cl=rr?rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Sc="$lit$",He=`lit$${Math.random().toFixed(9).slice(2)}$`,Ac="?"+He,Vp=`<${Ac}>`,sn=document,fi=()=>sn.createComment(""),hi=t=>t===null||typeof t!="object"&&typeof t!="function",Ro=Array.isArray,Up=t=>Ro(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Kr=`[ 	
\f\r]`,Rn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ml=/-->/g,Pl=/>/g,ze=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tl=/'/g,Nl=/"/g,Ec=/^(?:script|style|textarea|title)$/i,jp=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),U=jp(1),on=Symbol.for("lit-noChange"),_t=Symbol.for("lit-nothing"),Rl=new WeakMap,Je=sn.createTreeWalker(sn,129);function Cc(t,e){if(!Ro(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Cl!==void 0?Cl.createHTML(e):e}const zp=(t,e)=>{const n=t.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=Rn;for(let l=0;l<n;l++){const a=t[l];let c,u,f=-1,d=0;for(;d<a.length&&(o.lastIndex=d,u=o.exec(a),u!==null);)d=o.lastIndex,o===Rn?u[1]==="!--"?o=Ml:u[1]!==void 0?o=Pl:u[2]!==void 0?(Ec.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=ze):u[3]!==void 0&&(o=ze):o===ze?u[0]===">"?(o=r??Rn,f=-1):u[1]===void 0?f=-2:(f=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?ze:u[3]==='"'?Nl:Tl):o===Nl||o===Tl?o=ze:o===Ml||o===Pl?o=Rn:(o=ze,r=void 0);const g=o===ze&&t[l+1].startsWith("/>")?" ":"";s+=o===Rn?a+Vp:f>=0?(i.push(c),a.slice(0,f)+Sc+a.slice(f)+He+g):a+He+(f===-2?l:g)}return[Cc(t,s+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let $s=class Mc{constructor({strings:e,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const l=e.length-1,a=this.parts,[c,u]=zp(e,n);if(this.el=Mc.createElement(c,i),Je.currentNode=this.el.content,n===2||n===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=Je.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(Sc)){const d=u[o++],g=r.getAttribute(f).split(He),m=/([.?@])?(.*)/.exec(d);a.push({type:1,index:s,name:m[2],strings:g,ctor:m[1]==="."?Gp:m[1]==="?"?Kp:m[1]==="@"?qp:Pr}),r.removeAttribute(f)}else f.startsWith(He)&&(a.push({type:6,index:s}),r.removeAttribute(f));if(Ec.test(r.tagName)){const f=r.textContent.split(He),d=f.length-1;if(d>0){r.textContent=rr?rr.emptyScript:"";for(let g=0;g<d;g++)r.append(f[g],fi()),Je.nextNode(),a.push({type:2,index:++s});r.append(f[d],fi())}}}else if(r.nodeType===8)if(r.data===Ac)a.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(He,f+1))!==-1;)a.push({type:7,index:s}),f+=He.length-1}s++}}static createElement(e,n){const i=sn.createElement("template");return i.innerHTML=e,i}};function Sn(t,e,n=t,i){var o,l;if(e===on)return e;let r=i!==void 0?(o=n._$Co)==null?void 0:o[i]:n._$Cl;const s=hi(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),s===void 0?r=void 0:(r=new s(t),r._$AT(t,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=r:n._$Cl=r),r!==void 0&&(e=Sn(t,r._$AS(t,e.values),r,i)),e}let Wp=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??sn).importNode(n,!0);Je.currentNode=r;let s=Je.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new Mr(s,s.nextSibling,this,e):a.type===1?c=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(c=new Jp(s,this,e)),this._$AV.push(c),a=i[++l]}o!==(a==null?void 0:a.index)&&(s=Je.nextNode(),o++)}return Je.currentNode=sn,r}p(e){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},Mr=class Pc{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,n,i,r){this.type=2,this._$AH=_t,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=Sn(this,e,n),hi(e)?e===_t||e==null||e===""?(this._$AH!==_t&&this._$AR(),this._$AH=_t):e!==this._$AH&&e!==on&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Up(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_t&&hi(this._$AH)?this._$AA.nextSibling.data=e:this.T(sn.createTextNode(e)),this._$AH=e}$(e){var s;const{values:n,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=$s.createElement(Cc(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(n);else{const o=new Wp(r,this),l=o.u(this.options);o.p(n),this.T(l),this._$AH=o}}_$AC(e){let n=Rl.get(e.strings);return n===void 0&&Rl.set(e.strings,n=new $s(e)),n}k(e){Ro(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of e)r===n.length?n.push(i=new Pc(this.O(fi()),this.O(fi()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var n;this._$AM===void 0&&(this._$Cv=e,(n=this._$AP)==null||n.call(this,e))}},Pr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,r,s){this.type=1,this._$AH=_t,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_t}_$AI(e,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)e=Sn(this,e,n,0),o=!hi(e)||e!==this._$AH&&e!==on,o&&(this._$AH=e);else{const l=e;let a,c;for(e=s[0],a=0;a<s.length-1;a++)c=Sn(this,l[i+a],n,a),c===on&&(c=this._$AH[a]),o||(o=!hi(c)||c!==this._$AH[a]),c===_t?e=_t:e!==_t&&(e+=(c??"")+s[a+1]),this._$AH[a]=c}o&&!r&&this.j(e)}j(e){e===_t?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Gp=class extends Pr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_t?void 0:e}},Kp=class extends Pr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_t)}};class qp extends Pr{constructor(e,n,i,r,s){super(e,n,i,r,s),this.type=5}_$AI(e,n=this){if((e=Sn(this,e,n,0)??_t)===on)return;const i=this._$AH,r=e===_t&&i!==_t||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==_t&&(i===_t||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,e):this._$AH.handleEvent(e)}}class Jp{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Sn(this,e)}}const Xp={I:Mr},qr=Yn.litHtmlPolyfillSupport;qr==null||qr($s,Mr),(Yn.litHtmlVersions??(Yn.litHtmlVersions=[])).push("3.3.1");const Tc=(t,e,n)=>{const i=(n==null?void 0:n.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(n==null?void 0:n.renderBefore)??null;i._$litPart$=r=new Mr(e.insertBefore(fi(),s),s,void 0,n??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const en=globalThis;let mt=class extends hn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const e=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=e.firstChild),e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Tc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return on}};var da;mt._$litElement$=!0,mt.finalized=!0,(da=en.litElementHydrateSupport)==null||da.call(en,{LitElement:mt});const Jr=en.litElementPolyfillSupport;Jr==null||Jr({LitElement:mt});(en.litElementVersions??(en.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Yp}=Xp,Ol=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,Zp=t=>{var e;return((e=t==null?void 0:t._$litType$)==null?void 0:e.h)!=null},Qp=t=>t.strings===void 0,Il=()=>document.createComment(""),Hl=(t,e,n)=>{var s;const i=t._$AA.parentNode,r=t._$AB;if(n===void 0){const o=i.insertBefore(Il(),r),l=i.insertBefore(Il(),r);n=new Yp(o,l,t,t.options)}else{const o=n._$AB.nextSibling,l=n._$AM,a=l!==t;if(a){let c;(s=n._$AQ)==null||s.call(n,t),n._$AM=t,n._$AP!==void 0&&(c=t._$AU)!==l._$AU&&n._$AP(c)}if(o!==r||a){let c=n._$AA;for(;c!==o;){const u=c.nextSibling;i.insertBefore(c,r),c=u}}}return n},tg={},Ll=(t,e=tg)=>t._$AH=e,Fl=t=>t._$AH,eg=t=>{t._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nc={ATTRIBUTE:1,CHILD:2},Oo=t=>(...e)=>({_$litDirective$:t,values:e});let Io=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,i){this._$Ct=e,this._$AM=n,this._$Ci=i}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zn=(t,e)=>{var i;const n=t._$AN;if(n===void 0)return!1;for(const r of n)(i=r._$AO)==null||i.call(r,e,!1),Zn(r,e);return!0},sr=t=>{let e,n;do{if((e=t._$AM)===void 0)break;n=e._$AN,n.delete(t),t=e}while((n==null?void 0:n.size)===0)},Rc=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(n===void 0)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),rg(e)}};function ng(t){this._$AN!==void 0?(sr(this),this._$AM=t,Rc(this)):this._$AM=t}function ig(t,e=!1,n=0){const i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(i))for(let s=n;s<i.length;s++)Zn(i[s],!1),sr(i[s]);else i!=null&&(Zn(i,!1),sr(i));else Zn(this,t)}const rg=t=>{t.type==Nc.CHILD&&(t._$AP??(t._$AP=ig),t._$AQ??(t._$AQ=ng))};let sg=class extends Io{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,n,i){super._$AT(e,n,i),Rc(this),this.isConnected=e._$AU}_$AO(e,n=!0){var i,r;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(r=this.disconnected)==null||r.call(this)),n&&(Zn(this,e),sr(this))}setValue(e){if(Qp(this._$Ct))this._$Ct._$AI(e,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=e,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=()=>new og;let og=class{};const Xr=new WeakMap,Q=Oo(class extends sg{render(t){return _t}update(t,[e]){var i;const n=e!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=e,this.ht=(i=t.options)==null?void 0:i.host,this.rt(this.ct=t.element)),_t}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let n=Xr.get(e);n===void 0&&(n=new WeakMap,Xr.set(e,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e;return typeof this.G=="function"?(t=Xr.get(this.ht??globalThis))==null?void 0:t.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function Rt(t){return function(){return t}}const Dl=Math.abs,Et=Math.atan2,We=Math.cos,lg=Math.max,Yr=Math.min,se=Math.sin,pn=Math.sqrt,Dt=1e-12,di=Math.PI,or=di/2,Di=2*di;function ag(t){return t>1?0:t<-1?di:Math.acos(t)}function Bl(t){return t>=1?or:t<=-1?-or:Math.asin(t)}const ks=Math.PI,Ss=2*ks,Ke=1e-6,cg=Ss-Ke;function Oc(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function ug(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return Oc;const n=10**e;return function(i){this._+=i[0];for(let r=1,s=i.length;r<s;++r)this._+=Math.round(arguments[r]*n)/n+i[r]}}class fg{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?Oc:ug(e)}moveTo(e,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,n){this._append`L${this._x1=+e},${this._y1=+n}`}quadraticCurveTo(e,n,i,r){this._append`Q${+e},${+n},${this._x1=+i},${this._y1=+r}`}bezierCurveTo(e,n,i,r,s,o){this._append`C${+e},${+n},${+i},${+r},${this._x1=+s},${this._y1=+o}`}arcTo(e,n,i,r,s){if(e=+e,n=+n,i=+i,r=+r,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,l=this._y1,a=i-e,c=r-n,u=o-e,f=l-n,d=u*u+f*f;if(this._x1===null)this._append`M${this._x1=e},${this._y1=n}`;else if(d>Ke)if(!(Math.abs(f*a-c*u)>Ke)||!s)this._append`L${this._x1=e},${this._y1=n}`;else{let g=i-o,m=r-l,$=a*a+c*c,O=g*g+m*m,v=Math.sqrt($),N=Math.sqrt(d),T=s*Math.tan((ks-Math.acos(($+d-O)/(2*v*N)))/2),_=T/N,R=T/v;Math.abs(_-1)>Ke&&this._append`L${e+_*u},${n+_*f}`,this._append`A${s},${s},0,0,${+(f*g>u*m)},${this._x1=e+R*a},${this._y1=n+R*c}`}}arc(e,n,i,r,s,o){if(e=+e,n=+n,i=+i,o=!!o,i<0)throw new Error(`negative radius: ${i}`);let l=i*Math.cos(r),a=i*Math.sin(r),c=e+l,u=n+a,f=1^o,d=o?r-s:s-r;this._x1===null?this._append`M${c},${u}`:(Math.abs(this._x1-c)>Ke||Math.abs(this._y1-u)>Ke)&&this._append`L${c},${u}`,i&&(d<0&&(d=d%Ss+Ss),d>cg?this._append`A${i},${i},0,1,${f},${e-l},${n-a}A${i},${i},0,1,${f},${this._x1=c},${this._y1=u}`:d>Ke&&this._append`A${i},${i},0,${+(d>=ks)},${f},${this._x1=e+i*Math.cos(s)},${this._y1=n+i*Math.sin(s)}`)}rect(e,n,i,r){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}h${i=+i}v${+r}h${-i}Z`}toString(){return this._}}function hg(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(n==null)e=null;else{const i=Math.floor(n);if(!(i>=0))throw new RangeError(`invalid digits: ${n}`);e=i}return t},()=>new fg(e)}function dg(t){return t.innerRadius}function pg(t){return t.outerRadius}function gg(t){return t.startAngle}function yg(t){return t.endAngle}function mg(t){return t&&t.padAngle}function bg(t,e,n,i,r,s,o,l){var a=n-t,c=i-e,u=o-r,f=l-s,d=f*a-u*c;if(!(d*d<Dt))return d=(u*(e-s)-f*(t-r))/d,[t+d*a,e+d*c]}function Ei(t,e,n,i,r,s,o){var l=t-n,a=e-i,c=(o?s:-s)/pn(l*l+a*a),u=c*a,f=-c*l,d=t+u,g=e+f,m=n+u,$=i+f,O=(d+m)/2,v=(g+$)/2,N=m-d,T=$-g,_=N*N+T*T,R=r-s,G=d*$-m*g,tt=(T<0?-1:1)*pn(lg(0,R*R*_-G*G)),ct=(G*T-N*tt)/_,rt=(-G*N-T*tt)/_,st=(G*T+N*tt)/_,D=(-G*N+T*tt)/_,K=ct-O,H=rt-v,E=st-O,nt=D-v;return K*K+H*H>E*E+nt*nt&&(ct=st,rt=D),{cx:ct,cy:rt,x01:-u,y01:-f,x11:ct*(r/R-1),y11:rt*(r/R-1)}}function Ic(){var t=dg,e=pg,n=Rt(0),i=null,r=gg,s=yg,o=mg,l=null,a=hg(c);function c(){var u,f,d=+t.apply(this,arguments),g=+e.apply(this,arguments),m=r.apply(this,arguments)-or,$=s.apply(this,arguments)-or,O=Dl($-m),v=$>m;if(l||(l=u=a()),g<d&&(f=g,g=d,d=f),!(g>Dt))l.moveTo(0,0);else if(O>Di-Dt)l.moveTo(g*We(m),g*se(m)),l.arc(0,0,g,m,$,!v),d>Dt&&(l.moveTo(d*We($),d*se($)),l.arc(0,0,d,$,m,v));else{var N=m,T=$,_=m,R=$,G=O,tt=O,ct=o.apply(this,arguments)/2,rt=ct>Dt&&(i?+i.apply(this,arguments):pn(d*d+g*g)),st=Yr(Dl(g-d)/2,+n.apply(this,arguments)),D=st,K=st,H,E;if(rt>Dt){var nt=Bl(rt/d*se(ct)),q=Bl(rt/g*se(ct));(G-=nt*2)>Dt?(nt*=v?1:-1,_+=nt,R-=nt):(G=0,_=R=(m+$)/2),(tt-=q*2)>Dt?(q*=v?1:-1,N+=q,T-=q):(tt=0,N=T=(m+$)/2)}var X=g*We(N),F=g*se(N),ot=d*We(R),vt=d*se(R);if(st>Dt){var kt=g*We(T),gt=g*se(T),Ce=d*We(_),Me=d*se(_),Tt;if(O<di)if(Tt=bg(X,F,Ce,Me,kt,gt,ot,vt)){var Gt=X-Tt[0],te=F-Tt[1],ye=kt-Tt[0],J=gt-Tt[1],Y=1/se(ag((Gt*ye+te*J)/(pn(Gt*Gt+te*te)*pn(ye*ye+J*J)))/2),ft=pn(Tt[0]*Tt[0]+Tt[1]*Tt[1]);D=Yr(st,(d-ft)/(Y-1)),K=Yr(st,(g-ft)/(Y+1))}else D=K=0}tt>Dt?K>Dt?(H=Ei(Ce,Me,X,F,g,K,v),E=Ei(kt,gt,ot,vt,g,K,v),l.moveTo(H.cx+H.x01,H.cy+H.y01),K<st?l.arc(H.cx,H.cy,K,Et(H.y01,H.x01),Et(E.y01,E.x01),!v):(l.arc(H.cx,H.cy,K,Et(H.y01,H.x01),Et(H.y11,H.x11),!v),l.arc(0,0,g,Et(H.cy+H.y11,H.cx+H.x11),Et(E.cy+E.y11,E.cx+E.x11),!v),l.arc(E.cx,E.cy,K,Et(E.y11,E.x11),Et(E.y01,E.x01),!v))):(l.moveTo(X,F),l.arc(0,0,g,N,T,!v)):l.moveTo(X,F),!(d>Dt)||!(G>Dt)?l.lineTo(ot,vt):D>Dt?(H=Ei(ot,vt,kt,gt,d,-D,v),E=Ei(X,F,Ce,Me,d,-D,v),l.lineTo(H.cx+H.x01,H.cy+H.y01),D<st?l.arc(H.cx,H.cy,D,Et(H.y01,H.x01),Et(E.y01,E.x01),!v):(l.arc(H.cx,H.cy,D,Et(H.y01,H.x01),Et(H.y11,H.x11),!v),l.arc(0,0,d,Et(H.cy+H.y11,H.cx+H.x11),Et(E.cy+E.y11,E.cx+E.x11),v),l.arc(E.cx,E.cy,D,Et(E.y11,E.x11),Et(E.y01,E.x01),!v))):l.arc(0,0,d,R,_,v)}if(l.closePath(),u)return l=null,u+""||null}return c.centroid=function(){var u=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,f=(+r.apply(this,arguments)+ +s.apply(this,arguments))/2-di/2;return[We(f)*u,se(f)*u]},c.innerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:Rt(+u),c):t},c.outerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:Rt(+u),c):e},c.cornerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:Rt(+u),c):n},c.padRadius=function(u){return arguments.length?(i=u==null?null:typeof u=="function"?u:Rt(+u),c):i},c.startAngle=function(u){return arguments.length?(r=typeof u=="function"?u:Rt(+u),c):r},c.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:Rt(+u),c):s},c.padAngle=function(u){return arguments.length?(o=typeof u=="function"?u:Rt(+u),c):o},c.context=function(u){return arguments.length?(l=u??null,c):l},c}function vg(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function _g(t,e){return e<t?-1:e>t?1:e>=t?0:NaN}function xg(t){return t}function wg(){var t=xg,e=_g,n=null,i=Rt(0),r=Rt(Di),s=Rt(0);function o(l){var a,c=(l=vg(l)).length,u,f,d=0,g=new Array(c),m=new Array(c),$=+i.apply(this,arguments),O=Math.min(Di,Math.max(-Di,r.apply(this,arguments)-$)),v,N=Math.min(Math.abs(O)/c,s.apply(this,arguments)),T=N*(O<0?-1:1),_;for(a=0;a<c;++a)(_=m[g[a]=a]=+t(l[a],a,l))>0&&(d+=_);for(e!=null?g.sort(function(R,G){return e(m[R],m[G])}):n!=null&&g.sort(function(R,G){return n(l[R],l[G])}),a=0,f=d?(O-c*T)/d:0;a<c;++a,$=v)u=g[a],_=m[u],v=$+(_>0?_*f:0)+T,m[u]={data:l[u],index:a,value:_,startAngle:$,endAngle:v,padAngle:N};return m}return o.value=function(l){return arguments.length?(t=typeof l=="function"?l:Rt(+l),o):t},o.sortValues=function(l){return arguments.length?(e=l,n=null,o):e},o.sort=function(l){return arguments.length?(n=l,e=null,o):n},o.startAngle=function(l){return arguments.length?(i=typeof l=="function"?l:Rt(+l),o):i},o.endAngle=function(l){return arguments.length?(r=typeof l=="function"?l:Rt(+l),o):r},o.padAngle=function(l){return arguments.length?(s=typeof l=="function"?l:Rt(+l),o):s},o}function Ho(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function Hc(t,e){var n=Object.create(t.prototype);for(var i in e)n[i]=e[i];return n}function vi(){}var pi=.7,lr=1/pi,_n="\\s*([+-]?\\d+)\\s*",gi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",de="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",$g=/^#([0-9a-f]{3,8})$/,kg=new RegExp(`^rgb\\(${_n},${_n},${_n}\\)$`),Sg=new RegExp(`^rgb\\(${de},${de},${de}\\)$`),Ag=new RegExp(`^rgba\\(${_n},${_n},${_n},${gi}\\)$`),Eg=new RegExp(`^rgba\\(${de},${de},${de},${gi}\\)$`),Cg=new RegExp(`^hsl\\(${gi},${de},${de}\\)$`),Mg=new RegExp(`^hsla\\(${gi},${de},${de},${gi}\\)$`),Vl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ho(vi,Se,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Ul,formatHex:Ul,formatHex8:Pg,formatHsl:Tg,formatRgb:jl,toString:jl});function Ul(){return this.rgb().formatHex()}function Pg(){return this.rgb().formatHex8()}function Tg(){return Lc(this).formatHsl()}function jl(){return this.rgb().formatRgb()}function Se(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=$g.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?zl(e):n===3?new Bt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?Ci(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?Ci(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=kg.exec(t))?new Bt(e[1],e[2],e[3],1):(e=Sg.exec(t))?new Bt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=Ag.exec(t))?Ci(e[1],e[2],e[3],e[4]):(e=Eg.exec(t))?Ci(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Cg.exec(t))?Kl(e[1],e[2]/100,e[3]/100,1):(e=Mg.exec(t))?Kl(e[1],e[2]/100,e[3]/100,e[4]):Vl.hasOwnProperty(t)?zl(Vl[t]):t==="transparent"?new Bt(NaN,NaN,NaN,0):null}function zl(t){return new Bt(t>>16&255,t>>8&255,t&255,1)}function Ci(t,e,n,i){return i<=0&&(t=e=n=NaN),new Bt(t,e,n,i)}function Ng(t){return t instanceof vi||(t=Se(t)),t?(t=t.rgb(),new Bt(t.r,t.g,t.b,t.opacity)):new Bt}function As(t,e,n,i){return arguments.length===1?Ng(t):new Bt(t,e,n,i??1)}function Bt(t,e,n,i){this.r=+t,this.g=+e,this.b=+n,this.opacity=+i}Ho(Bt,As,Hc(vi,{brighter(t){return t=t==null?lr:Math.pow(lr,t),new Bt(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?pi:Math.pow(pi,t),new Bt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new Bt(nn(this.r),nn(this.g),nn(this.b),ar(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Wl,formatHex:Wl,formatHex8:Rg,formatRgb:Gl,toString:Gl}));function Wl(){return`#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}`}function Rg(){return`#${Xe(this.r)}${Xe(this.g)}${Xe(this.b)}${Xe((isNaN(this.opacity)?1:this.opacity)*255)}`}function Gl(){const t=ar(this.opacity);return`${t===1?"rgb(":"rgba("}${nn(this.r)}, ${nn(this.g)}, ${nn(this.b)}${t===1?")":`, ${t})`}`}function ar(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function nn(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Xe(t){return t=nn(t),(t<16?"0":"")+t.toString(16)}function Kl(t,e,n,i){return i<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Jt(t,e,n,i)}function Lc(t){if(t instanceof Jt)return new Jt(t.h,t.s,t.l,t.opacity);if(t instanceof vi||(t=Se(t)),!t)return new Jt;if(t instanceof Jt)return t;t=t.rgb();var e=t.r/255,n=t.g/255,i=t.b/255,r=Math.min(e,n,i),s=Math.max(e,n,i),o=NaN,l=s-r,a=(s+r)/2;return l?(e===s?o=(n-i)/l+(n<i)*6:n===s?o=(i-e)/l+2:o=(e-n)/l+4,l/=a<.5?s+r:2-s-r,o*=60):l=a>0&&a<1?0:o,new Jt(o,l,a,t.opacity)}function Fc(t,e,n,i){return arguments.length===1?Lc(t):new Jt(t,e,n,i??1)}function Jt(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}Ho(Jt,Fc,Hc(vi,{brighter(t){return t=t==null?lr:Math.pow(lr,t),new Jt(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?pi:Math.pow(pi,t),new Jt(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*e,r=2*n-i;return new Bt(Zr(t>=240?t-240:t+120,r,i),Zr(t,r,i),Zr(t<120?t+240:t-120,r,i),this.opacity)},clamp(){return new Jt(ql(this.h),Mi(this.s),Mi(this.l),ar(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=ar(this.opacity);return`${t===1?"hsl(":"hsla("}${ql(this.h)}, ${Mi(this.s)*100}%, ${Mi(this.l)*100}%${t===1?")":`, ${t})`}`}}));function ql(t){return t=(t||0)%360,t<0?t+360:t}function Mi(t){return Math.max(0,Math.min(1,t||0))}function Zr(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}function Qr(t){return--t*t*t+1}function Og(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}const Lo=t=>()=>t;function Ig(t,e){return function(n){return t+n*e}}function Hg(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(i){return Math.pow(t+i*e,n)}}function Lg(t){return(t=+t)==1?Dc:function(e,n){return n-e?Hg(e,n,t):Lo(isNaN(e)?n:e)}}function Dc(t,e){var n=e-t;return n?Ig(t,n):Lo(isNaN(t)?e:t)}const cr=function t(e){var n=Lg(e);function i(r,s){var o=n((r=As(r)).r,(s=As(s)).r),l=n(r.g,s.g),a=n(r.b,s.b),c=Dc(r.opacity,s.opacity);return function(u){return r.r=o(u),r.g=l(u),r.b=a(u),r.opacity=c(u),r+""}}return i.gamma=t,i}(1);function Fg(t,e){e||(e=[]);var n=t?Math.min(e.length,t.length):0,i=e.slice(),r;return function(s){for(r=0;r<n;++r)i[r]=t[r]*(1-s)+e[r]*s;return i}}function Dg(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Bg(t,e){var n=e?e.length:0,i=t?Math.min(n,t.length):0,r=new Array(i),s=new Array(n),o;for(o=0;o<i;++o)r[o]=xn(t[o],e[o]);for(;o<n;++o)s[o]=e[o];return function(l){for(o=0;o<i;++o)s[o]=r[o](l);return s}}function Vg(t,e){var n=new Date;return t=+t,e=+e,function(i){return n.setTime(t*(1-i)+e*i),n}}function qt(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Ug(t,e){var n={},i={},r;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(r in e)r in t?n[r]=xn(t[r],e[r]):i[r]=e[r];return function(s){for(r in n)i[r]=n[r](s);return i}}var Es=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,ts=new RegExp(Es.source,"g");function jg(t){return function(){return t}}function zg(t){return function(e){return t(e)+""}}function Bc(t,e){var n=Es.lastIndex=ts.lastIndex=0,i,r,s,o=-1,l=[],a=[];for(t=t+"",e=e+"";(i=Es.exec(t))&&(r=ts.exec(e));)(s=r.index)>n&&(s=e.slice(n,s),l[o]?l[o]+=s:l[++o]=s),(i=i[0])===(r=r[0])?l[o]?l[o]+=r:l[++o]=r:(l[++o]=null,a.push({i:o,x:qt(i,r)})),n=ts.lastIndex;return n<e.length&&(s=e.slice(n),l[o]?l[o]+=s:l[++o]=s),l.length<2?a[0]?zg(a[0].x):jg(e):(e=a.length,function(c){for(var u=0,f;u<e;++u)l[(f=a[u]).i]=f.x(c);return l.join("")})}function xn(t,e){var n=typeof e,i;return e==null||n==="boolean"?Lo(e):(n==="number"?qt:n==="string"?(i=Se(e))?(e=i,cr):Bc:e instanceof Se?cr:e instanceof Date?Vg:Dg(e)?Fg:Array.isArray(e)?Bg:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Ug:qt)(t,e)}function Wg(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var Jl=180/Math.PI,Cs={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Vc(t,e,n,i,r,s){var o,l,a;return(o=Math.sqrt(t*t+e*e))&&(t/=o,e/=o),(a=t*n+e*i)&&(n-=t*a,i-=e*a),(l=Math.sqrt(n*n+i*i))&&(n/=l,i/=l,a/=l),t*i<e*n&&(t=-t,e=-e,a=-a,o=-o),{translateX:r,translateY:s,rotate:Math.atan2(e,t)*Jl,skewX:Math.atan(a)*Jl,scaleX:o,scaleY:l}}var Pi;function Gg(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?Cs:Vc(e.a,e.b,e.c,e.d,e.e,e.f)}function Kg(t){return t==null||(Pi||(Pi=document.createElementNS("http://www.w3.org/2000/svg","g")),Pi.setAttribute("transform",t),!(t=Pi.transform.baseVal.consolidate()))?Cs:(t=t.matrix,Vc(t.a,t.b,t.c,t.d,t.e,t.f))}function Uc(t,e,n,i){function r(c){return c.length?c.pop()+" ":""}function s(c,u,f,d,g,m){if(c!==f||u!==d){var $=g.push("translate(",null,e,null,n);m.push({i:$-4,x:qt(c,f)},{i:$-2,x:qt(u,d)})}else(f||d)&&g.push("translate("+f+e+d+n)}function o(c,u,f,d){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),d.push({i:f.push(r(f)+"rotate(",null,i)-2,x:qt(c,u)})):u&&f.push(r(f)+"rotate("+u+i)}function l(c,u,f,d){c!==u?d.push({i:f.push(r(f)+"skewX(",null,i)-2,x:qt(c,u)}):u&&f.push(r(f)+"skewX("+u+i)}function a(c,u,f,d,g,m){if(c!==f||u!==d){var $=g.push(r(g)+"scale(",null,",",null,")");m.push({i:$-4,x:qt(c,f)},{i:$-2,x:qt(u,d)})}else(f!==1||d!==1)&&g.push(r(g)+"scale("+f+","+d+")")}return function(c,u){var f=[],d=[];return c=t(c),u=t(u),s(c.translateX,c.translateY,u.translateX,u.translateY,f,d),o(c.rotate,u.rotate,f,d),l(c.skewX,u.skewX,f,d),a(c.scaleX,c.scaleY,u.scaleX,u.scaleY,f,d),c=u=null,function(g){for(var m=-1,$=d.length,O;++m<$;)f[(O=d[m]).i]=O.x(g);return f.join("")}}}var qg=Uc(Gg,"px, ","px)","deg)"),Jg=Uc(Kg,", ",")",")"),Ms="http://www.w3.org/1999/xhtml";const Xl={svg:"http://www.w3.org/2000/svg",xhtml:Ms,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Tr(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),Xl.hasOwnProperty(e)?{space:Xl[e],local:t}:t}function Xg(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===Ms&&e.documentElement.namespaceURI===Ms?e.createElement(t):e.createElementNS(n,t)}}function Yg(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function jc(t){var e=Tr(t);return(e.local?Yg:Xg)(e)}function Zg(){}function Fo(t){return t==null?Zg:function(){return this.querySelector(t)}}function Qg(t){typeof t!="function"&&(t=Fo(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=new Array(o),a,c,u=0;u<o;++u)(a=s[u])&&(c=t.call(a,a.__data__,u,s))&&("__data__"in a&&(c.__data__=a.__data__),l[u]=c);return new zt(i,this._parents)}function t5(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function e5(){return[]}function zc(t){return t==null?e5:function(){return this.querySelectorAll(t)}}function n5(t){return function(){return t5(t.apply(this,arguments))}}function i5(t){typeof t=="function"?t=n5(t):t=zc(t);for(var e=this._groups,n=e.length,i=[],r=[],s=0;s<n;++s)for(var o=e[s],l=o.length,a,c=0;c<l;++c)(a=o[c])&&(i.push(t.call(a,a.__data__,c,o)),r.push(a));return new zt(i,r)}function Wc(t){return function(){return this.matches(t)}}function Gc(t){return function(e){return e.matches(t)}}var r5=Array.prototype.find;function s5(t){return function(){return r5.call(this.children,t)}}function o5(){return this.firstElementChild}function l5(t){return this.select(t==null?o5:s5(typeof t=="function"?t:Gc(t)))}var a5=Array.prototype.filter;function c5(){return Array.from(this.children)}function u5(t){return function(){return a5.call(this.children,t)}}function f5(t){return this.selectAll(t==null?c5:u5(typeof t=="function"?t:Gc(t)))}function h5(t){typeof t!="function"&&(t=Wc(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=[],a,c=0;c<o;++c)(a=s[c])&&t.call(a,a.__data__,c,s)&&l.push(a);return new zt(i,this._parents)}function Kc(t){return new Array(t.length)}function d5(){return new zt(this._enter||this._groups.map(Kc),this._parents)}function ur(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}ur.prototype={constructor:ur,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function p5(t){return function(){return t}}function g5(t,e,n,i,r,s){for(var o=0,l,a=e.length,c=s.length;o<c;++o)(l=e[o])?(l.__data__=s[o],i[o]=l):n[o]=new ur(t,s[o]);for(;o<a;++o)(l=e[o])&&(r[o]=l)}function y5(t,e,n,i,r,s,o){var l,a,c=new Map,u=e.length,f=s.length,d=new Array(u),g;for(l=0;l<u;++l)(a=e[l])&&(d[l]=g=o.call(a,a.__data__,l,e)+"",c.has(g)?r[l]=a:c.set(g,a));for(l=0;l<f;++l)g=o.call(t,s[l],l,s)+"",(a=c.get(g))?(i[l]=a,a.__data__=s[l],c.delete(g)):n[l]=new ur(t,s[l]);for(l=0;l<u;++l)(a=e[l])&&c.get(d[l])===a&&(r[l]=a)}function m5(t){return t.__data__}function b5(t,e){if(!arguments.length)return Array.from(this,m5);var n=e?y5:g5,i=this._parents,r=this._groups;typeof t!="function"&&(t=p5(t));for(var s=r.length,o=new Array(s),l=new Array(s),a=new Array(s),c=0;c<s;++c){var u=i[c],f=r[c],d=f.length,g=v5(t.call(u,u&&u.__data__,c,i)),m=g.length,$=l[c]=new Array(m),O=o[c]=new Array(m),v=a[c]=new Array(d);n(u,f,$,O,v,g,e);for(var N=0,T=0,_,R;N<m;++N)if(_=$[N]){for(N>=T&&(T=N+1);!(R=O[T])&&++T<m;);_._next=R||null}}return o=new zt(o,i),o._enter=l,o._exit=a,o}function v5(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function _5(){return new zt(this._exit||this._groups.map(Kc),this._parents)}function x5(t,e,n){var i=this.enter(),r=this,s=this.exit();return typeof t=="function"?(i=t(i),i&&(i=i.selection())):i=i.append(t+""),e!=null&&(r=e(r),r&&(r=r.selection())),n==null?s.remove():n(s),i&&r?i.merge(r).order():r}function w5(t){for(var e=t.selection?t.selection():t,n=this._groups,i=e._groups,r=n.length,s=i.length,o=Math.min(r,s),l=new Array(r),a=0;a<o;++a)for(var c=n[a],u=i[a],f=c.length,d=l[a]=new Array(f),g,m=0;m<f;++m)(g=c[m]||u[m])&&(d[m]=g);for(;a<r;++a)l[a]=n[a];return new zt(l,this._parents)}function $5(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var i=t[e],r=i.length-1,s=i[r],o;--r>=0;)(o=i[r])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function k5(t){t||(t=S5);function e(f,d){return f&&d?t(f.__data__,d.__data__):!f-!d}for(var n=this._groups,i=n.length,r=new Array(i),s=0;s<i;++s){for(var o=n[s],l=o.length,a=r[s]=new Array(l),c,u=0;u<l;++u)(c=o[u])&&(a[u]=c);a.sort(e)}return new zt(r,this._parents).order()}function S5(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function A5(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function E5(){return Array.from(this)}function C5(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,s=i.length;r<s;++r){var o=i[r];if(o)return o}return null}function M5(){let t=0;for(const e of this)++t;return t}function P5(){return!this.node()}function T5(t){for(var e=this._groups,n=0,i=e.length;n<i;++n)for(var r=e[n],s=0,o=r.length,l;s<o;++s)(l=r[s])&&t.call(l,l.__data__,s,r);return this}function N5(t){return function(){this.removeAttribute(t)}}function R5(t){return function(){this.removeAttributeNS(t.space,t.local)}}function O5(t,e){return function(){this.setAttribute(t,e)}}function I5(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function H5(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function L5(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function F5(t,e){var n=Tr(t);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((e==null?n.local?R5:N5:typeof e=="function"?n.local?L5:H5:n.local?I5:O5)(n,e))}function qc(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function D5(t){return function(){this.style.removeProperty(t)}}function B5(t,e,n){return function(){this.style.setProperty(t,e,n)}}function V5(t,e,n){return function(){var i=e.apply(this,arguments);i==null?this.style.removeProperty(t):this.style.setProperty(t,i,n)}}function U5(t,e,n){return arguments.length>1?this.each((e==null?D5:typeof e=="function"?V5:B5)(t,e,n??"")):An(this.node(),t)}function An(t,e){return t.style.getPropertyValue(e)||qc(t).getComputedStyle(t,null).getPropertyValue(e)}function j5(t){return function(){delete this[t]}}function z5(t,e){return function(){this[t]=e}}function W5(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function G5(t,e){return arguments.length>1?this.each((e==null?j5:typeof e=="function"?W5:z5)(t,e)):this.node()[t]}function Jc(t){return t.trim().split(/^|\s+/)}function Do(t){return t.classList||new Xc(t)}function Xc(t){this._node=t,this._names=Jc(t.getAttribute("class")||"")}Xc.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function Yc(t,e){for(var n=Do(t),i=-1,r=e.length;++i<r;)n.add(e[i])}function Zc(t,e){for(var n=Do(t),i=-1,r=e.length;++i<r;)n.remove(e[i])}function K5(t){return function(){Yc(this,t)}}function q5(t){return function(){Zc(this,t)}}function J5(t,e){return function(){(e.apply(this,arguments)?Yc:Zc)(this,t)}}function X5(t,e){var n=Jc(t+"");if(arguments.length<2){for(var i=Do(this.node()),r=-1,s=n.length;++r<s;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof e=="function"?J5:e?K5:q5)(n,e))}function Y5(){this.textContent=""}function Z5(t){return function(){this.textContent=t}}function Q5(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function t0(t){return arguments.length?this.each(t==null?Y5:(typeof t=="function"?Q5:Z5)(t)):this.node().textContent}function e0(){this.innerHTML=""}function n0(t){return function(){this.innerHTML=t}}function i0(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function r0(t){return arguments.length?this.each(t==null?e0:(typeof t=="function"?i0:n0)(t)):this.node().innerHTML}function s0(){this.nextSibling&&this.parentNode.appendChild(this)}function o0(){return this.each(s0)}function l0(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function a0(){return this.each(l0)}function c0(t){var e=typeof t=="function"?t:jc(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function u0(){return null}function f0(t,e){var n=typeof t=="function"?t:jc(t),i=e==null?u0:typeof e=="function"?e:Fo(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function h0(){var t=this.parentNode;t&&t.removeChild(this)}function d0(){return this.each(h0)}function p0(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function g0(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function y0(t){return this.select(t?g0:p0)}function m0(t){return arguments.length?this.property("__data__",t):this.node().__data__}function b0(t){return function(e){t.call(this,e,this.__data__)}}function v0(t){return t.trim().split(/^|\s+/).map(function(e){var n="",i=e.indexOf(".");return i>=0&&(n=e.slice(i+1),e=e.slice(0,i)),{type:e,name:n}})}function _0(t){return function(){var e=this.__on;if(e){for(var n=0,i=-1,r=e.length,s;n<r;++n)s=e[n],(!t.type||s.type===t.type)&&s.name===t.name?this.removeEventListener(s.type,s.listener,s.options):e[++i]=s;++i?e.length=i:delete this.__on}}}function x0(t,e,n){return function(){var i=this.__on,r,s=b0(e);if(i){for(var o=0,l=i.length;o<l;++o)if((r=i[o]).type===t.type&&r.name===t.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=n),r.value=e;return}}this.addEventListener(t.type,s,n),r={type:t.type,name:t.name,value:e,listener:s,options:n},i?i.push(r):this.__on=[r]}}function w0(t,e,n){var i=v0(t+""),r,s=i.length,o;if(arguments.length<2){var l=this.node().__on;if(l){for(var a=0,c=l.length,u;a<c;++a)for(r=0,u=l[a];r<s;++r)if((o=i[r]).type===u.type&&o.name===u.name)return u.value}return}for(l=e?x0:_0,r=0;r<s;++r)this.each(l(i[r],e,n));return this}function Qc(t,e,n){var i=qc(t),r=i.CustomEvent;typeof r=="function"?r=new r(e,n):(r=i.document.createEvent("Event"),n?(r.initEvent(e,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(e,!1,!1)),t.dispatchEvent(r)}function $0(t,e){return function(){return Qc(this,t,e)}}function k0(t,e){return function(){return Qc(this,t,e.apply(this,arguments))}}function S0(t,e){return this.each((typeof e=="function"?k0:$0)(t,e))}function*A0(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,s=i.length,o;r<s;++r)(o=i[r])&&(yield o)}var tu=[null];function zt(t,e){this._groups=t,this._parents=e}function _i(){return new zt([[document.documentElement]],tu)}function E0(){return this}zt.prototype=_i.prototype={constructor:zt,select:Qg,selectAll:i5,selectChild:l5,selectChildren:f5,filter:h5,data:b5,enter:d5,exit:_5,join:x5,merge:w5,selection:E0,order:$5,sort:k5,call:A5,nodes:E5,node:C5,size:M5,empty:P5,each:T5,attr:F5,style:U5,property:G5,classed:X5,text:t0,html:r0,raise:o0,lower:a0,append:c0,insert:f0,remove:d0,clone:y0,datum:m0,on:w0,dispatch:S0,[Symbol.iterator]:A0};function Bi(t){return typeof t=="string"?new zt([[document.querySelector(t)]],[document.documentElement]):new zt([[t]],tu)}function C0(t){let e;for(;e=t.sourceEvent;)t=e;return t}function M0(t,e){if(t=C0(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,i=i.matrixTransform(e.getScreenCTM().inverse()),[i.x,i.y]}if(e.getBoundingClientRect){var r=e.getBoundingClientRect();return[t.clientX-r.left-e.clientLeft,t.clientY-r.top-e.clientTop]}}return[t.pageX,t.pageY]}function Vi(t,e){return t==null||e==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function P0(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function eu(t){let e,n,i;t.length!==2?(e=Vi,n=(l,a)=>Vi(t(l),a),i=(l,a)=>t(l)-a):(e=t===Vi||t===P0?t:T0,n=t,i=t);function r(l,a,c=0,u=l.length){if(c<u){if(e(a,a)!==0)return u;do{const f=c+u>>>1;n(l[f],a)<0?c=f+1:u=f}while(c<u)}return c}function s(l,a,c=0,u=l.length){if(c<u){if(e(a,a)!==0)return u;do{const f=c+u>>>1;n(l[f],a)<=0?c=f+1:u=f}while(c<u)}return c}function o(l,a,c=0,u=l.length){const f=r(l,a,c,u-1);return f>c&&i(l[f-1],a)>-i(l[f],a)?f-1:f}return{left:r,center:o,right:s}}function T0(){return 0}function N0(t){return t===null?NaN:+t}const R0=eu(Vi),O0=R0.right;eu(N0).center;const I0=Math.sqrt(50),H0=Math.sqrt(10),L0=Math.sqrt(2);function fr(t,e,n){const i=(e-t)/Math.max(0,n),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),o=s>=I0?10:s>=H0?5:s>=L0?2:1;let l,a,c;return r<0?(c=Math.pow(10,-r)/o,l=Math.round(t*c),a=Math.round(e*c),l/c<t&&++l,a/c>e&&--a,c=-c):(c=Math.pow(10,r)*o,l=Math.round(t/c),a=Math.round(e/c),l*c<t&&++l,a*c>e&&--a),a<l&&.5<=n&&n<2?fr(t,e,n*2):[l,a,c]}function F0(t,e,n){if(e=+e,t=+t,n=+n,!(n>0))return[];if(t===e)return[t];const i=e<t,[r,s,o]=i?fr(e,t,n):fr(t,e,n);if(!(s>=r))return[];const l=s-r+1,a=new Array(l);if(i)if(o<0)for(let c=0;c<l;++c)a[c]=(s-c)/-o;else for(let c=0;c<l;++c)a[c]=(s-c)*o;else if(o<0)for(let c=0;c<l;++c)a[c]=(r+c)/-o;else for(let c=0;c<l;++c)a[c]=(r+c)*o;return a}function Ps(t,e,n){return e=+e,t=+t,n=+n,fr(t,e,n)[2]}function D0(t,e,n){e=+e,t=+t,n=+n;const i=e<t,r=i?Ps(e,t,n):Ps(t,e,n);return(i?-1:1)*(r<0?1/-r:r)}function B0(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}function V0(t){return function(){return t}}function U0(t){return+t}var Yl=[0,1];function gn(t){return t}function Ts(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:V0(isNaN(e)?NaN:.5)}function j0(t,e){var n;return t>e&&(n=t,t=e,e=n),function(i){return Math.max(t,Math.min(e,i))}}function z0(t,e,n){var i=t[0],r=t[1],s=e[0],o=e[1];return r<i?(i=Ts(r,i),s=n(o,s)):(i=Ts(i,r),s=n(s,o)),function(l){return s(i(l))}}function W0(t,e,n){var i=Math.min(t.length,e.length)-1,r=new Array(i),s=new Array(i),o=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++o<i;)r[o]=Ts(t[o],t[o+1]),s[o]=n(e[o],e[o+1]);return function(l){var a=O0(t,l,1,i)-1;return s[a](r[a](l))}}function G0(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function K0(){var t=Yl,e=Yl,n=xn,i,r,s,o=gn,l,a,c;function u(){var d=Math.min(t.length,e.length);return o!==gn&&(o=j0(t[0],t[d-1])),l=d>2?W0:z0,a=c=null,f}function f(d){return d==null||isNaN(d=+d)?s:(a||(a=l(t.map(i),e,n)))(i(o(d)))}return f.invert=function(d){return o(r((c||(c=l(e,t.map(i),qt)))(d)))},f.domain=function(d){return arguments.length?(t=Array.from(d,U0),u()):t.slice()},f.range=function(d){return arguments.length?(e=Array.from(d),u()):e.slice()},f.rangeRound=function(d){return e=Array.from(d),n=Wg,u()},f.clamp=function(d){return arguments.length?(o=d?!0:gn,u()):o!==gn},f.interpolate=function(d){return arguments.length?(n=d,u()):n},f.unknown=function(d){return arguments.length?(s=d,f):s},function(d,g){return i=d,r=g,u()}}function q0(){return K0()(gn,gn)}function J0(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function hr(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,i=t.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+t.slice(n+1)]}function En(t){return t=hr(Math.abs(t)),t?t[1]:NaN}function X0(t,e){return function(n,i){for(var r=n.length,s=[],o=0,l=t[0],a=0;r>0&&l>0&&(a+l+1>i&&(l=Math.max(1,i-a)),s.push(n.substring(r-=l,r+l)),!((a+=l+1)>i));)l=t[o=(o+1)%t.length];return s.reverse().join(e)}}function Y0(t){return function(e){return e.replace(/[0-9]/g,function(n){return t[+n]})}}var Z0=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function dr(t){if(!(e=Z0.exec(t)))throw new Error("invalid format: "+t);var e;return new Bo({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}dr.prototype=Bo.prototype;function Bo(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}Bo.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Q0(t){t:for(var e=t.length,n=1,i=-1,r;n<e;++n)switch(t[n]){case".":i=r=n;break;case"0":i===0&&(i=n),r=n;break;default:if(!+t[n])break t;i>0&&(i=0);break}return i>0?t.slice(0,i)+t.slice(r+1):t}var nu;function ty(t,e){var n=hr(t,e);if(!n)return t+"";var i=n[0],r=n[1],s=r-(nu=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,o=i.length;return s===o?i:s>o?i+new Array(s-o+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+hr(t,Math.max(0,e+s-1))[0]}function Zl(t,e){var n=hr(t,e);if(!n)return t+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Ql={"%":(t,e)=>(t*100).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:J0,e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Zl(t*100,e),r:Zl,s:ty,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function ta(t){return t}var ea=Array.prototype.map,na=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function ey(t){var e=t.grouping===void 0||t.thousands===void 0?ta:X0(ea.call(t.grouping,Number),t.thousands+""),n=t.currency===void 0?"":t.currency[0]+"",i=t.currency===void 0?"":t.currency[1]+"",r=t.decimal===void 0?".":t.decimal+"",s=t.numerals===void 0?ta:Y0(ea.call(t.numerals,String)),o=t.percent===void 0?"%":t.percent+"",l=t.minus===void 0?"−":t.minus+"",a=t.nan===void 0?"NaN":t.nan+"";function c(f){f=dr(f);var d=f.fill,g=f.align,m=f.sign,$=f.symbol,O=f.zero,v=f.width,N=f.comma,T=f.precision,_=f.trim,R=f.type;R==="n"?(N=!0,R="g"):Ql[R]||(T===void 0&&(T=12),_=!0,R="g"),(O||d==="0"&&g==="=")&&(O=!0,d="0",g="=");var G=$==="$"?n:$==="#"&&/[boxX]/.test(R)?"0"+R.toLowerCase():"",tt=$==="$"?i:/[%p]/.test(R)?o:"",ct=Ql[R],rt=/[defgprs%]/.test(R);T=T===void 0?6:/[gprs]/.test(R)?Math.max(1,Math.min(21,T)):Math.max(0,Math.min(20,T));function st(D){var K=G,H=tt,E,nt,q;if(R==="c")H=ct(D)+H,D="";else{D=+D;var X=D<0||1/D<0;if(D=isNaN(D)?a:ct(Math.abs(D),T),_&&(D=Q0(D)),X&&+D==0&&m!=="+"&&(X=!1),K=(X?m==="("?m:l:m==="-"||m==="("?"":m)+K,H=(R==="s"?na[8+nu/3]:"")+H+(X&&m==="("?")":""),rt){for(E=-1,nt=D.length;++E<nt;)if(q=D.charCodeAt(E),48>q||q>57){H=(q===46?r+D.slice(E+1):D.slice(E))+H,D=D.slice(0,E);break}}}N&&!O&&(D=e(D,1/0));var F=K.length+D.length+H.length,ot=F<v?new Array(v-F+1).join(d):"";switch(N&&O&&(D=e(ot+D,ot.length?v-H.length:1/0),ot=""),g){case"<":D=K+D+H+ot;break;case"=":D=K+ot+D+H;break;case"^":D=ot.slice(0,F=ot.length>>1)+K+D+H+ot.slice(F);break;default:D=ot+K+D+H;break}return s(D)}return st.toString=function(){return f+""},st}function u(f,d){var g=c((f=dr(f),f.type="f",f)),m=Math.max(-8,Math.min(8,Math.floor(En(d)/3)))*3,$=Math.pow(10,-m),O=na[8+m/3];return function(v){return g($*v)+O}}return{format:c,formatPrefix:u}}var Ti,iu,ru;ny({thousands:",",grouping:[3],currency:["$",""]});function ny(t){return Ti=ey(t),iu=Ti.format,ru=Ti.formatPrefix,Ti}function iy(t){return Math.max(0,-En(Math.abs(t)))}function ry(t,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(En(e)/3)))*3-En(Math.abs(t)))}function sy(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,En(e)-En(t))+1}function oy(t,e,n,i){var r=D0(t,e,n),s;switch(i=dr(i??",f"),i.type){case"s":{var o=Math.max(Math.abs(t),Math.abs(e));return i.precision==null&&!isNaN(s=ry(r,o))&&(i.precision=s),ru(i,o)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=sy(r,Math.max(Math.abs(t),Math.abs(e))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=iy(r))&&(i.precision=s-(i.type==="%")*2);break}}return iu(i)}function ly(t){var e=t.domain;return t.ticks=function(n){var i=e();return F0(i[0],i[i.length-1],n??10)},t.tickFormat=function(n,i){var r=e();return oy(r[0],r[r.length-1],n??10,i)},t.nice=function(n){n==null&&(n=10);var i=e(),r=0,s=i.length-1,o=i[r],l=i[s],a,c,u=10;for(l<o&&(c=o,o=l,l=c,c=r,r=s,s=c);u-- >0;){if(c=Ps(o,l,n),c===a)return i[r]=o,i[s]=l,e(i);if(c>0)o=Math.floor(o/c)*c,l=Math.ceil(l/c)*c;else if(c<0)o=Math.ceil(o*c)/c,l=Math.floor(l*c)/c;else break;a=c}return t},t}function Ui(){var t=q0();return t.copy=function(){return G0(t,Ui())},B0.apply(t,arguments),ly(t)}var ay={value:()=>{}};function su(){for(var t=0,e=arguments.length,n={},i;t<e;++t){if(!(i=arguments[t]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new ji(n)}function ji(t){this._=t}function cy(t,e){return t.trim().split(/^|\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}ji.prototype=su.prototype={constructor:ji,on:function(t,e){var n=this._,i=cy(t+"",n),r,s=-1,o=i.length;if(arguments.length<2){for(;++s<o;)if((r=(t=i[s]).type)&&(r=uy(n[r],t.name)))return r;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(r=(t=i[s]).type)n[r]=ia(n[r],t.name,e);else if(e==null)for(r in n)n[r]=ia(n[r],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new ji(t)},call:function(t,e){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,s;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(s=this._[t],i=0,r=s.length;i<r;++i)s[i].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var i=this._[t],r=0,s=i.length;r<s;++r)i[r].value.apply(e,n)}};function uy(t,e){for(var n=0,i=t.length,r;n<i;++n)if((r=t[n]).name===e)return r.value}function ia(t,e,n){for(var i=0,r=t.length;i<r;++i)if(t[i].name===e){t[i]=ay,t=t.slice(0,i).concat(t.slice(i+1));break}return n!=null&&t.push({name:e,value:n}),t}var Cn=0,Ln=0,On=0,ou=1e3,pr,Fn,gr=0,ln=0,Nr=0,yi=typeof performance=="object"&&performance.now?performance:Date,lu=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Vo(){return ln||(lu(fy),ln=yi.now()+Nr)}function fy(){ln=0}function yr(){this._call=this._time=this._next=null}yr.prototype=au.prototype={constructor:yr,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Vo():+n)+(e==null?0:+e),!this._next&&Fn!==this&&(Fn?Fn._next=this:pr=this,Fn=this),this._call=t,this._time=n,Ns()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ns())}};function au(t,e,n){var i=new yr;return i.restart(t,e,n),i}function hy(){Vo(),++Cn;for(var t=pr,e;t;)(e=ln-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Cn}function ra(){ln=(gr=yi.now())+Nr,Cn=Ln=0;try{hy()}finally{Cn=0,py(),ln=0}}function dy(){var t=yi.now(),e=t-gr;e>ou&&(Nr-=e,gr=t)}function py(){for(var t,e=pr,n,i=1/0;e;)e._call?(i>e._time&&(i=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:pr=n);Fn=t,Ns(i)}function Ns(t){if(!Cn){Ln&&(Ln=clearTimeout(Ln));var e=t-ln;e>24?(t<1/0&&(Ln=setTimeout(ra,t-yi.now()-Nr)),On&&(On=clearInterval(On))):(On||(gr=yi.now(),On=setInterval(dy,ou)),Cn=1,lu(ra))}}function sa(t,e,n){var i=new yr;return e=e==null?0:+e,i.restart(r=>{i.stop(),t(r+e)},e,n),i}var gy=su("start","end","cancel","interrupt"),yy=[],cu=0,oa=1,Rs=2,zi=3,la=4,Os=5,Wi=6;function Rr(t,e,n,i,r,s){var o=t.__transition;if(!o)t.__transition={};else if(n in o)return;my(t,n,{name:e,index:i,group:r,on:gy,tween:yy,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:cu})}function Uo(t,e){var n=Qt(t,e);if(n.state>cu)throw new Error("too late; already scheduled");return n}function ge(t,e){var n=Qt(t,e);if(n.state>zi)throw new Error("too late; already running");return n}function Qt(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function my(t,e,n){var i=t.__transition,r;i[e]=n,n.timer=au(s,0,n.time);function s(c){n.state=oa,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var u,f,d,g;if(n.state!==oa)return a();for(u in i)if(g=i[u],g.name===n.name){if(g.state===zi)return sa(o);g.state===la?(g.state=Wi,g.timer.stop(),g.on.call("interrupt",t,t.__data__,g.index,g.group),delete i[u]):+u<e&&(g.state=Wi,g.timer.stop(),g.on.call("cancel",t,t.__data__,g.index,g.group),delete i[u])}if(sa(function(){n.state===zi&&(n.state=la,n.timer.restart(l,n.delay,n.time),l(c))}),n.state=Rs,n.on.call("start",t,t.__data__,n.index,n.group),n.state===Rs){for(n.state=zi,r=new Array(d=n.tween.length),u=0,f=-1;u<d;++u)(g=n.tween[u].value.call(t,t.__data__,n.index,n.group))&&(r[++f]=g);r.length=f+1}}function l(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(a),n.state=Os,1),f=-1,d=r.length;++f<d;)r[f].call(t,u);n.state===Os&&(n.on.call("end",t,t.__data__,n.index,n.group),a())}function a(){n.state=Wi,n.timer.stop(),delete i[e];for(var c in i)return;delete t.__transition}}function by(t,e){var n=t.__transition,i,r,s=!0,o;if(n){e=e==null?null:e+"";for(o in n){if((i=n[o]).name!==e){s=!1;continue}r=i.state>Rs&&i.state<Os,i.state=Wi,i.timer.stop(),i.on.call(r?"interrupt":"cancel",t,t.__data__,i.index,i.group),delete n[o]}s&&delete t.__transition}}function vy(t){return this.each(function(){by(this,t)})}function _y(t,e){var n,i;return function(){var r=ge(this,t),s=r.tween;if(s!==n){i=n=s;for(var o=0,l=i.length;o<l;++o)if(i[o].name===e){i=i.slice(),i.splice(o,1);break}}r.tween=i}}function xy(t,e,n){var i,r;if(typeof n!="function")throw new Error;return function(){var s=ge(this,t),o=s.tween;if(o!==i){r=(i=o).slice();for(var l={name:e,value:n},a=0,c=r.length;a<c;++a)if(r[a].name===e){r[a]=l;break}a===c&&r.push(l)}s.tween=r}}function wy(t,e){var n=this._id;if(t+="",arguments.length<2){for(var i=Qt(this.node(),n).tween,r=0,s=i.length,o;r<s;++r)if((o=i[r]).name===t)return o.value;return null}return this.each((e==null?_y:xy)(n,t,e))}function jo(t,e,n){var i=t._id;return t.each(function(){var r=ge(this,i);(r.value||(r.value={}))[e]=n.apply(this,arguments)}),function(r){return Qt(r,i).value[e]}}function uu(t,e){var n;return(typeof e=="number"?qt:e instanceof Se?cr:(n=Se(e))?(e=n,cr):Bc)(t,e)}function $y(t){return function(){this.removeAttribute(t)}}function ky(t){return function(){this.removeAttributeNS(t.space,t.local)}}function Sy(t,e,n){var i,r=n+"",s;return function(){var o=this.getAttribute(t);return o===r?null:o===i?s:s=e(i=o,n)}}function Ay(t,e,n){var i,r=n+"",s;return function(){var o=this.getAttributeNS(t.space,t.local);return o===r?null:o===i?s:s=e(i=o,n)}}function Ey(t,e,n){var i,r,s;return function(){var o,l=n(this),a;return l==null?void this.removeAttribute(t):(o=this.getAttribute(t),a=l+"",o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l)))}}function Cy(t,e,n){var i,r,s;return function(){var o,l=n(this),a;return l==null?void this.removeAttributeNS(t.space,t.local):(o=this.getAttributeNS(t.space,t.local),a=l+"",o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l)))}}function My(t,e){var n=Tr(t),i=n==="transform"?Jg:uu;return this.attrTween(t,typeof e=="function"?(n.local?Cy:Ey)(n,i,jo(this,"attr."+t,e)):e==null?(n.local?ky:$y)(n):(n.local?Ay:Sy)(n,i,e))}function Py(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function Ty(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function Ny(t,e){var n,i;function r(){var s=e.apply(this,arguments);return s!==i&&(n=(i=s)&&Ty(t,s)),n}return r._value=e,r}function Ry(t,e){var n,i;function r(){var s=e.apply(this,arguments);return s!==i&&(n=(i=s)&&Py(t,s)),n}return r._value=e,r}function Oy(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var i=Tr(t);return this.tween(n,(i.local?Ny:Ry)(i,e))}function Iy(t,e){return function(){Uo(this,t).delay=+e.apply(this,arguments)}}function Hy(t,e){return e=+e,function(){Uo(this,t).delay=e}}function Ly(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Iy:Hy)(e,t)):Qt(this.node(),e).delay}function Fy(t,e){return function(){ge(this,t).duration=+e.apply(this,arguments)}}function Dy(t,e){return e=+e,function(){ge(this,t).duration=e}}function By(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Fy:Dy)(e,t)):Qt(this.node(),e).duration}function Vy(t,e){if(typeof e!="function")throw new Error;return function(){ge(this,t).ease=e}}function Uy(t){var e=this._id;return arguments.length?this.each(Vy(e,t)):Qt(this.node(),e).ease}function jy(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;ge(this,t).ease=n}}function zy(t){if(typeof t!="function")throw new Error;return this.each(jy(this._id,t))}function Wy(t){typeof t!="function"&&(t=Wc(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=[],a,c=0;c<o;++c)(a=s[c])&&t.call(a,a.__data__,c,s)&&l.push(a);return new Ae(i,this._parents,this._name,this._id)}function Gy(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,i=e.length,r=n.length,s=Math.min(i,r),o=new Array(i),l=0;l<s;++l)for(var a=e[l],c=n[l],u=a.length,f=o[l]=new Array(u),d,g=0;g<u;++g)(d=a[g]||c[g])&&(f[g]=d);for(;l<i;++l)o[l]=e[l];return new Ae(o,this._parents,this._name,this._id)}function Ky(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function qy(t,e,n){var i,r,s=Ky(e)?Uo:ge;return function(){var o=s(this,t),l=o.on;l!==i&&(r=(i=l).copy()).on(e,n),o.on=r}}function Jy(t,e){var n=this._id;return arguments.length<2?Qt(this.node(),n).on.on(t):this.each(qy(n,t,e))}function Xy(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function Yy(){return this.on("end.remove",Xy(this._id))}function Zy(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Fo(t));for(var i=this._groups,r=i.length,s=new Array(r),o=0;o<r;++o)for(var l=i[o],a=l.length,c=s[o]=new Array(a),u,f,d=0;d<a;++d)(u=l[d])&&(f=t.call(u,u.__data__,d,l))&&("__data__"in u&&(f.__data__=u.__data__),c[d]=f,Rr(c[d],e,n,d,c,Qt(u,n)));return new Ae(s,this._parents,e,n)}function Qy(t){var e=this._name,n=this._id;typeof t!="function"&&(t=zc(t));for(var i=this._groups,r=i.length,s=[],o=[],l=0;l<r;++l)for(var a=i[l],c=a.length,u,f=0;f<c;++f)if(u=a[f]){for(var d=t.call(u,u.__data__,f,a),g,m=Qt(u,n),$=0,O=d.length;$<O;++$)(g=d[$])&&Rr(g,e,n,$,d,m);s.push(d),o.push(u)}return new Ae(s,o,e,n)}var tm=_i.prototype.constructor;function em(){return new tm(this._groups,this._parents)}function nm(t,e){var n,i,r;return function(){var s=An(this,t),o=(this.style.removeProperty(t),An(this,t));return s===o?null:s===n&&o===i?r:r=e(n=s,i=o)}}function fu(t){return function(){this.style.removeProperty(t)}}function im(t,e,n){var i,r=n+"",s;return function(){var o=An(this,t);return o===r?null:o===i?s:s=e(i=o,n)}}function rm(t,e,n){var i,r,s;return function(){var o=An(this,t),l=n(this),a=l+"";return l==null&&(a=l=(this.style.removeProperty(t),An(this,t))),o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l))}}function sm(t,e){var n,i,r,s="style."+e,o="end."+s,l;return function(){var a=ge(this,t),c=a.on,u=a.value[s]==null?l||(l=fu(e)):void 0;(c!==n||r!==u)&&(i=(n=c).copy()).on(o,r=u),a.on=i}}function om(t,e,n){var i=(t+="")=="transform"?qg:uu;return e==null?this.styleTween(t,nm(t,i)).on("end.style."+t,fu(t)):typeof e=="function"?this.styleTween(t,rm(t,i,jo(this,"style."+t,e))).each(sm(this._id,t)):this.styleTween(t,im(t,i,e),n).on("end.style."+t,null)}function lm(t,e,n){return function(i){this.style.setProperty(t,e.call(this,i),n)}}function am(t,e,n){var i,r;function s(){var o=e.apply(this,arguments);return o!==r&&(i=(r=o)&&lm(t,o,n)),i}return s._value=e,s}function cm(t,e,n){var i="style."+(t+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(e==null)return this.tween(i,null);if(typeof e!="function")throw new Error;return this.tween(i,am(t,e,n??""))}function um(t){return function(){this.textContent=t}}function fm(t){return function(){var e=t(this);this.textContent=e??""}}function hm(t){return this.tween("text",typeof t=="function"?fm(jo(this,"text",t)):um(t==null?"":t+""))}function dm(t){return function(e){this.textContent=t.call(this,e)}}function pm(t){var e,n;function i(){var r=t.apply(this,arguments);return r!==n&&(e=(n=r)&&dm(r)),e}return i._value=t,i}function gm(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,pm(t))}function ym(){for(var t=this._name,e=this._id,n=hu(),i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],l=o.length,a,c=0;c<l;++c)if(a=o[c]){var u=Qt(a,e);Rr(a,t,n,c,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Ae(i,this._parents,t,n)}function mm(){var t,e,n=this,i=n._id,r=n.size();return new Promise(function(s,o){var l={value:o},a={value:function(){--r===0&&s()}};n.each(function(){var c=ge(this,i),u=c.on;u!==t&&(e=(t=u).copy(),e._.cancel.push(l),e._.interrupt.push(l),e._.end.push(a)),c.on=e}),r===0&&s()})}var bm=0;function Ae(t,e,n,i){this._groups=t,this._parents=e,this._name=n,this._id=i}function hu(){return++bm}var be=_i.prototype;Ae.prototype={constructor:Ae,select:Zy,selectAll:Qy,selectChild:be.selectChild,selectChildren:be.selectChildren,filter:Wy,merge:Gy,selection:em,transition:ym,call:be.call,nodes:be.nodes,node:be.node,size:be.size,empty:be.empty,each:be.each,on:Jy,attr:My,attrTween:Oy,style:om,styleTween:cm,text:hm,textTween:gm,remove:Yy,tween:wy,delay:Ly,duration:By,ease:Uy,easeVarying:zy,end:mm,[Symbol.iterator]:be[Symbol.iterator]};var vm={time:null,delay:0,duration:250,ease:Og};function _m(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function xm(t){var e,n;t instanceof Ae?(e=t._id,t=t._name):(e=hu(),(n=vm).time=Vo(),t=t==null?null:t+"");for(var i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],l=o.length,a,c=0;c<l;++c)(a=o[c])&&Rr(a,t,e,c,o,n||_m(a,e));return new Ae(i,this._parents,t,e)}_i.prototype.interrupt=vy;_i.prototype.transition=xm;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const du="important",wm=" !"+du,Dn=Oo(class extends Io{constructor(t){var e;if(super(t),t.type!==Nc.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,n)=>{const i=t[n];return i==null?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:n}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in e){const r=e[i];if(r!=null){this.ft.add(i);const s=typeof r=="string"&&r.endsWith(wm);i.includes("-")||s?n.setProperty(i,s?r.slice(0,-11):r,s?du:""):n[i]=r}}return on}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const aa=t=>Zp(t)?t._$litType$.h:t.strings,ca=Oo(class extends Io{constructor(t){super(t),this.et=new WeakMap}render(t){return[t]}update(t,[e]){const n=Ol(this.it)?aa(this.it):null,i=Ol(e)?aa(e):null;if(n!==null&&(i===null||n!==i)){const r=Fl(t).pop();let s=this.et.get(n);if(s===void 0){const o=document.createDocumentFragment();s=Tc(_t,o),s.setConnected(!1),this.et.set(n,s)}Ll(s,[r]),Hl(s,void 0,r)}if(i!==null){if(n===null||n!==i){const r=this.et.get(i);if(r!==void 0){const s=Fl(r).pop();eg(t),Hl(t,void 0,s),Ll(t,[s])}}this.it=e}else this.it=void 0;return this.render(e)}}),zo=[[.9921568627450981,.9647058823529412,.9294117647058824],[.8901960784313725,.1411764705882353,.12941176470588237],[.9529411764705882,.9019607843137255,0],[.9411764705882353,.5568627450980392,.10980392156862745],[.08627450980392157,.6,.8549019607843137],[.47058823529411764,.13333333333333333,.6666666666666666],[0,.5568627450980392,.3568627450980392],[.11372549019607843,.10980392156862745,.10980392156862745]],$m=[[253/255,246/255,237/255],[247/255,45/255,41/255],[253/255,203/255,0/255],[250/255,102/255,13/255],[17/255,97/255,170/255],[101/255,57/255,138/255],[70/255,139/255,73/255],[29/255,28/255,28/255]],km=[[1,1,1],[1,0,0],[1,1,0],[1,.5,0],[.163,.373,.6],[.5,0,.5],[0,.66,.2],[.2,.094,0]],Sm=[[245/255,238/255,226/255],[170/255,14/255,1/255],[224/255,178/255,0/255],[217/255,104/255,5/255],[18/255,107/255,145/255],[103/255,15/255,128/255],[88/255,133/255,30/255],[44/255,37/255,30/255]],Am=[[254/255,250/255,226/255],[237/255,55/255,58/255],[255/255,233/255,111/255],[250/255,102/255,13/255],[33/255,112/255,163/255],[238/255,131/255,154/255],[59/255,155/255,83/255],[24/255,10/255,1/255]],Em=[[255/255,255/255,255/255],[218/255,105/255,104/255],[255/255,244/255,122/255],[232/255,154/255,113/255],[73/255,138/255,186/255],[97/255,96/255,178/255],[144/255,191/255,140/255],[8/255,8/255,8/255]],Cm=[[240/255,234/255,214/255],[204/255,50/255,53/255],[253/255,222/255,20/255],[230/255,152/255,92/255],[1/255,88/255,140/255],[107/255,51/255,111/255],[51/255,138/255,92/255],[55/255,39/255,23/255]],Mm=[[249/255,232/255,209/255],[216/255,43/255,59/255],[231/255,175/255,2/255],[224/255,89/255,31/255],[92/255,123/255,145/255],[77/255,58/255,78/255],[107/255,129/255,53/255],[14/255,8/255,7/255]],Pm=[[241/255,236/255,213/255],[235/255,66/255,35/255],[253/255,236/255,1/255],[254/255,130/255,39/255],[3/255,7/255,171/255],[74/255,50/255,86/255],[55/255,131/255,74/255],[2/255,1/255,0/255]],Tm=[[238/255,232/255,206/255],[222/255,62/255,29/255],[247/255,225/255,7/255],[254/255,130/255,39/255],[4/255,6/255,139/255],[74/255,50/255,86/255],[56/255,131/255,75/255],[2/255,1/255,0/255]],Nm=[[239/255,235/255,225/255],[182/255,53/255,55/255],[253/255,203/255,0/255],[222/255,69/255,20/255],[95/255,157/255,191/255],[83/255,70/255,98/255],[58/255,90/255,66/255],[8/255,9/255,13/255]],Rm=[[228/255,218/255,197/255],[181/255,65/255,60/255],[229/255,193/255,81/255],[220/255,137/255,61/255],[59/255,143/255,171/255],[121/255,97/255,134/255],[13/255,170/255,114/255],[46/255,44/255,38/255]],Om=[[206/255,205/255,209/255],[181/255,38/255,54/255],[221/255,187/255,23/255],[208/255,120/255,37/255],[10/255,71/255,129/255],[101/255,36/255,66/255],[75/255,129/255,131/255],[26/255,30/255,47/255]],Im=[[237/255,213/255,177/255],[167/255,33/255,28/255],[245/255,181/255,18/255],[204/255,93/255,46/255],[71/255,122/255,141/255],[99/255,79/255,93/255],[109/255,143/255,118/255],[44/255,44/255,37/255]],Hm=[[240/255,236/255,235/255],[247/255,65/255,51/255],[243/255,187/255,6/255],[251/255,130/255,2/255],[37/255,71/255,169/255],[176/255,121/255,177/255],[2/255,117/255,111/255],[41/255,42/255,45/255]],Lm=[[231/255,235/255,237/255],[229/255,30/255,38/255],[255/255,198/255,12/255],[245/255,119/255,34/255],[17/255,97/255,170/255],[139/255,47/255,146/255],[1/255,167/255,98/255],[0/255,0/255,1/255]],Fm=[[236/255,237/255,241/255],[200/255,75/255,49/255],[235/255,207/255,13/255],[228/255,168/255,21/255],[39/255,108/255,176/255],[188/255,57/255,104/255],[122/255,176/255,62/255],[4/255,4/255,4/255]],Dm=[[241/255,236/255,230/255],[185/255,34/255,17/255],[231/255,200/255,52/255],[232/255,90/255,26/255],[26/255,70/255,79/255],[82/255,15/255,47/255],[67/255,111/255,33/255],[29/255,28/255,28/255]],Bm=[[215/255,208/255,180/255],[202/255,0/255,17/255],[220/255,170/255,0/255],[229/255,76/255,32/255],[0/255,126/255,157/255],[137/255,37/255,79/255],[0/255,110/255,60/255],[31/255,27/255,28/255]],Vm=[[236/255,231/255,213/255],[188/255,32/255,43/255],[233/255,201/255,0/255],[197/255,72/255,30/255],[50/255,42/255,115/255],[116/255,48/255,101/255],[69/255,118/255,61/255],[56/255,44/255,42/255]],Um=[[209/255,194/255,173/255],[159/255,36/255,31/255],[231/255,191/255,6/255],[231/255,155/255,7/255],[75/255,90/255,200/255],[121/255,100/255,188/255],[115/255,179/255,63/255],[52/255,49/255,40/255]],jm=[[250/255,248/255,244/255],[255/255,41/255,37/255],[251/255,223/255,47/255],[253/255,151/255,35/255],[31/255,106/255,184/255],[159/255,68/255,150/255],[80/255,180/255,122/255],[36/255,38/255,39/255]],zm=[[233/255,199/255,173/255],[214/255,76/255,127/255],[238/255,204/255,124/255],[230/255,174/255,115/255],[86/255,141/255,146/255],[118/255,83/255,97/255],[196/255,192/255,118/255],[60/255,52/255,40/255]],Wm=[[255/255,244/255,216/255],[248/255,80/255,46/255],[255/255,213/255,44/255],[254/255,129/255,5/255],[0/255,124/255,197/255],[132/255,77/255,139/255],[120/255,160/255,66/255],[2/255,4/255,6/255]],Gm=[[254/255,249/255,246/255],[248/255,20/255,35/255],[237/255,199/255,8/255],[254/255,128/255,11/255],[48/255,140/255,206/255],[182/255,40/255,94/255],[135/255,187/255,26/255],[29/255,27/255,28/255]],Km=[[226/255,216/255,205/255],[224/255,43/255,39/255],[251/255,204/255,38/255],[255/255,138/255,4/255],[82/255,103/255,202/255],[199/255,112/255,253/255],[104/255,182/255,90/255],[22/255,19/255,11/255]],qm=[[221/255,219/255,211/255],[196/255,82/255,69/255],[196/255,167/255,80/255],[200/255,123/255,70/255],[74/255,104/255,167/255],[94/255,89/255,161/255],[86/255,139/255,70/255],[38/255,38/255,38/255]],Jm=[[237/255,235/255,236/255],[242/255,146/255,109/255],[245/255,234/255,143/255],[247/255,194/255,115/255],[89/255,118/255,212/255],[237/255,191/255,243/255],[153/255,201/255,113/255],[50/255,63/255,66/255]],Xm=[[255/255,251/255,230/255],[238/255,86/255,46/255],[249/255,213/255,50/255],[252/255,132/255,4/255],[43/255,103/255,175/255],[246/255,137/255,163/255],[171/255,205/255,94/255],[5/255,5/255,5/255]],Ym=[[246/255,248/255,244/255],[248/255,20/255,40/255],[255/255,198/255,8/255],[248/255,140/255,18/255],[8/255,41/255,148/255],[152/255,56/255,142/255],[8/255,156/255,49/255],[12/255,17/255,15/255]],it=new Map;it.set("itten",{title:"Chromatic Circle",author:"Johannes Itten",year:1961,reference:"farbkreis_extended.png",cube:zo});it.set("itten-normalized",{title:"Chromatic Circle (Paper-white)",author:"Johannes Itten",year:1961,reference:"Johannes-Itten-The-chromatic-circle-some-exercises-on-the-contrast-of-pure-colors.webp",cube:$m});it.set("itten-neutral",{title:"Nathan Gossett & Baoquan Chen",author:"Johannes Itten",year:1961,reference:"itten-ryb.pdf",cube:km});it.set("bezold",{title:"Farbentafel",author:"Wilhelm von Bezold",year:1874,reference:"Bezold_Farbentafel_1874.jpg",cube:Sm});it.set("boutet",{title:"Twelve-color color circles ",author:"Claude Boutet",year:1708,reference:"Boutet_1708_color_circles.jpg",cube:Am});it.set("hett",{title:"RGV Color Wheel",author:"J. A. H. Hett",year:1908,reference:"RGV_color_wheel_1908",cube:Em});it.set("schiffermueller",{title:"Versuch eines Farbensystems",author:"Ignaz Schiffermüller",year:1772,reference:"020_schiffermueller1.jpg",cube:Cm});it.set("harris",{title:"The Natural System of Colours",author:"Moses Harris",year:1766,reference:"Moses_Harris_The_Natural_System_of_Colours.jpg",cube:Mm});it.set("harrisc82",{title:"The Natural System of Colours",author:"Moses Harris / C82",year:1766,reference:"harrisc82.png",cube:Pm});it.set("harrisc82alt",{title:"The Natural System of Colours",author:"Moses Harris / C82",year:1766,reference:"harrisc82alt.png",cube:Tm});it.set("goethe",{title:"Farbenkreis",author:"Johann Wolfgang von Goethe",year:1809,reference:"Goethe_Farbenkreis_zur_Symbolisierung_des_menschlichen_Geistes-_und_Seelenlebens_1809.jpg",cube:Nm});it.set("munsell",{title:"Munsell Color System",author:"Albert Henry Munsell",year:1905,reference:"munsell-atlas-11.jpg",cube:Rm});it.set("munsell-alt",{title:"A Grammar of Color",author:"Cleland, T. M. & Albert Henry Munsell",year:1921,reference:"munsell-alt.jpg",cube:Om});it.set("hayter",{title:"New Practical Treatise on the Three Primitive Colours",author:"Charles Hayter",year:1826,reference:"Color_diagram_Charles_Hayter.jpg",cube:Im});it.set("bormann",{title:"Gouache tint study for Josef Alber's Preliminary Course",author:"Heinrich-Siegfried Bormann",year:1931,reference:"bormann.png",cube:Hm});it.set("albers",{title:"Interaction of Color",author:"Josef Albers",year:1942,reference:"albers-color-harmony.jpg",cube:Lm});it.set("lohse",{title:"Kunsthalle Bern Poster",author:"Richard Paul Lohse",year:1970,reference:"lohse.png",cube:Fm});it.set("chevreul",{title:"Cercle chromatique",author:"Michel Eugène Chevreul",year:1839,reference:"Cercle_chromatique_Chevreul_2.jpg",cube:Dm});it.set("maycock",{title:"Scale of Normal Colors and their Hues",author:"Mark M. Maycock",year:1895,reference:"maycock.png",cube:Um});it.set("colorprinter",{title:"The Color Printer",author:"John Earhart",year:1892,reference:"colorprinter.png",cube:jm});it.set("japschool",{title:"Japanese Textbook",author:"Japanese School",year:1930,reference:"japschool.png",cube:Bm});it.set("kindergarten1890",{title:"Kindergarten Workbook",author:"Milton Bradley",year:1890,reference:"kindergarten1890.jpg",cube:Vm});it.set("marvel-news",{title:"64 Color Chart on Newsprint",author:"Marvel Comics",year:1982,reference:"marvel-news.png",cube:zm});it.set("apple90s",{title:"Macintosh Reference Manual",author:"Apple",year:1990,reference:"apple90s.png",cube:Wm});it.set("apple80s",{title:"HyperCard User Manual",author:"Apple",year:1989,reference:"apple80s.png",cube:Gm});it.set("clayton",{title:"Intrinsic Value Plate",author:"Greg Clayton",year:2017,reference:"A260P03_IntrinsicValue1.gif",cube:Ym});it.set("pixelart",{title:"Pixel Art",author:"Tofu",year:2024,reference:"pixelart.png",cube:Km});it.set("ippsketch",{title:"Imposter Syndrome",author:"Ippsketch",year:2021,reference:"ippsketch.png",cube:qm});it.set("ryan",{title:"Compositions Palette",author:"Ryan",year:2024,reference:"ryan.png",cube:Jm});it.set("ten",{title:"Ten",author:"Roni Kaufman",year:2022,reference:"ten.png",cube:Xm});it.set("rgb",{title:"Inverted RGB",author:"James Clerk Maxwell",year:1860,reference:"rgb-cube.png",cube:[[1,1,1],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[0,0,0]]});const pu=t=>t*t*(3-2*t),Gi=(t,e,n)=>t+n*(e-t),ua=(t,e,n,i,r,s)=>Gi(Gi(t,e,r),Gi(n,i,r),s),es=(t,e,n,i,r,s,o,l,a,c,u)=>Gi(ua(t,e,n,i,a,c),ua(r,s,o,l,a,c),u);function Zm(t,{cube:e=zo,easingFn:n=pu}={}){const i=n(t[0]),r=n(t[1]),s=n(t[2]),o=e.map(c=>c[0]),l=e.map(c=>c[1]),a=e.map(c=>c[2]);return[es(...o,i,r,s),es(...l,i,r,s),es(...a,i,r,s)]}function Qm(t){return(t%360+360)%360}function t2(t){let[e,n,i]=t;e=Qm(e||0);let r=i+n*(i<.5?i:1-i),s=r-(r-i)*2*Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o=[r,s,2*i-r];break;case 1:o=[s,r,2*i-r];break;case 2:o=[2*i-r,r,s];break;case 3:o=[2*i-r,s,r];break;case 4:o=[s,2*i-r,r];break;case 5:o=[r,2*i-r,s];break;default:o=[2*i-r,2*i-r,2*i-r]}return o}function qe(t,{cube:e=zo,easingFn:n=pu,invertLightness:i=!0}={}){const r=i?1-t[2]:t[2],s=t2([t[0],t[1],r]);return Zm(s,{cube:e,easingFn:n})}var e2=Object.defineProperty,gu=t=>{throw TypeError(t)},n2=(t,e,n)=>e in t?e2(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,P=(t,e,n)=>n2(t,typeof e!="symbol"?e+"":e,n),yu=(t,e,n)=>e.has(t)||gu("Cannot "+n),bt=(t,e,n)=>(yu(t,e,"read from private field"),n?n.call(t):e.get(t)),Wt=(t,e,n)=>e.has(t)?gu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),b=(t,e,n)=>(yu(t,e,"access private method"),n);function St(t,e,n={bubbles:!0,composed:!0,cancelable:!0}){return new CustomEvent(t,{detail:structuredClone(e),...n})}function mr(){return[[1,1,1],[1,0,0],[1,1,0],[1,.5,0],[0,0,1],[.5,0,1],[0,1,0],[0,0,0]]}function i2(t){return new Promise(e=>{const{_dialogs:n}=this,i=n.length,r=()=>{this._dialogs=n.filter((o,l)=>l!==i)},s={type:"alert",text:t,onOk(){r(),e()}};this._dialogs=[...n,s]})}function r2(t){return new Promise((e,n)=>{const{_dialogs:i}=this,r=i.length,s=()=>{this._dialogs=i.filter((l,a)=>a!==r)},o={type:"confirm",text:t,onCancel(){s(),n()},onContinue(){s(),e()}};this._dialogs=[...i,o]})}function s2(t){return new Promise((e,n)=>{const{_dialogs:i}=this,r=i.length,s=()=>{this._dialogs=i.filter((l,a)=>a!==r)},o={type:"prompt",text:t,onCancel(){s(),n()},onContinue(l){s(),e(l.detail.value)}};this._dialogs=[...i,o]})}function o2(t,e){switch(t){case"alert":return i2.call(this,e);case"confirm":return r2.call(this,e);case"prompt":return s2.call(this,e)}}var wn,mu,bu,ns;class vu extends mt{constructor(){super(),Wt(this,wn),this.text="",this._handleKeyUp=b(this,wn,mu).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keyup",this._handleKeyUp)}render(){return U`
      <ryb-color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,wn,bu)}
            >Ok</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}wn=new WeakSet,mu=function(t){switch(t.key){case"Enter":b(this,wn,ns).call(this);break}},bu=function(){b(this,wn,ns).call(this)},ns=function(){const t=St("ok",void 0,{bubbles:!1});this.dispatchEvent(t)},P(vu,"properties",{text:{type:String}});class Is extends mt{constructor(){super(),P(this,"rootEl",Z()),P(this,"feedBackEl",Z()),this.disabled=!1,this.feedback=!1}showFeedBack(e,n=1e3){if(!this.feedback){console.warn("Please enable the feedback attribute.");return}const{value:i}=this.feedBackEl;i.innerHTML=e,i.setAttribute("duration",n),i.setAttribute("show","")}render(){return U`
      <button ${Q(this.rootEl)} class="body" ?disabled=${this.disabled}>
        ${this.feedback?U` <ryb-color-picker-ui-tool-tip
              ${Q(this.feedBackEl)}
            ></ryb-color-picker-ui-tool-tip>`:U``}
        <span><slot></slot></span>
      </button>
    `}}P(Is,"properties",{disabled:{type:Boolean,reflect:!0},feedback:{type:Boolean}}),P(Is,"styles",At`
    :host {
      --height: 24px;
      --color: light-dark(#202020, #f0f0f0);

      display: inline-flex;
    }

    .body {
      align-items: center;
      border-radius: 2px;
      border: none;
      box-shadow: inset 1px 1px 1px 0 hsl(0 100 100 / 0.2),
        inset -1px -1px 1px 0 hsl(0 0 0 / 0.1);
      display: inline-flex;
      height: var(--height);
      justify-content: center;
      margin: 0;
      padding: 0 8px;
      color: var(--color);
      position: relative;

      &:active {
        transform: translate(1px, 1px);
      }

      &[disabled] > span {
        opacity: 0.5;
      }
    }
  `);var we,_u,xu,wu,is,rs;class $u extends mt{constructor(){super(),Wt(this,we),this.text="",this._handleKeyUp=b(this,we,_u).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){window.removeEventListener("keyup",this._handleKeyUp),super.disconnectedCallback()}render(){return U`
      <ryb-color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,we,xu)}
            >Cancel</ryb-color-picker-ui-button
          >
          <ryb-color-picker-ui-button @click=${b(this,we,wu)}
            >Continue</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}we=new WeakSet,_u=function(t){switch(t.key){case"Escape":b(this,we,rs).call(this);break;case"Enter":b(this,we,is).call(this);break}},xu=function(){b(this,we,rs).call(this)},wu=function(){b(this,we,is).call(this)},is=function(){const t=St("continue",void 0,{bubbles:!1});this.dispatchEvent(t)},rs=function(){const t=St("cancel",void 0,{bubbles:!1});this.dispatchEvent(t)},P($u,"properties",{text:{type:String}});class Hs extends mt{constructor(){super()}render(){return U`
      <div class="body">
        <div class="text">
          <slot name="text"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `}}P(Hs,"properties",{}),P(Hs,"styles",At`
    :host {
      --backdrop-color: hsl(0 0 0 / 0.2);
      --background-color: light-dark(#202020, #f0f0f0);
      --color: light-dark(#f0f0f0, #202020);
      --font-family--text: sans-serif;
      --max-width: 320px;
      --min-width: 240px;
      --z-index: 1000;

      align-items: center;
      background-color: var(--backdrop-color);
      border-radius: 8px;
      display: flex;
      inset: 0;
      justify-content: center;
      padding: 32px;
      position: absolute;
      z-index: var(--z-index);
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 8px;
      display: inline-flex;
      flex-direction: column;
      gap: 8px;
      justify-content: stretch;
      max-width: var(--max-width);
      min-width: var(--min-width);
      padding: 16px;
    }

    .text {
      color: var(--color);
      font-family: var(--font-family--text);
      font-size: 14px;
      font-weight: normal;
      line-height: 1.5;
    }

    .actions {
      display: flex;
      gap: 4px;
      justify-content: flex-end;
    }
  `);class Ls extends mt{constructor(){super(),P(this,"rootEl",Z())}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        ${this.label?U` <span class="label" part="label">${this.label}</span>`:U``}
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `}}P(Ls,"properties",{label:{type:String}}),P(Ls,"styles",At`
    :host {
      --background-color: light-dark(
        hsl(0 100 100 / 0.2),
        hsl(0 100 100 / 0.1)
      );
      --color: light-dark(#303030, #b0b0b0);
      --size: 16px;
      --direction: column;
    }

    .body {
      align-items: stretch;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 10px;
      background-color: var(--background-color);
      padding: 4px;
      border-radius: 4px;
      flex: 1 1 auto;
    }

    .label {
      color: var(--color);
      letter-spacing: 0.25pt;
      text-transform: uppercase;
    }

    .content {
      display: flex;
      flex-direction: var(--direction);
      gap: 4px;
      justify-content: stretch;
    }
  `);const xi=Math.PI,Fs=2*xi,l2=xi/180,a2=180/xi;function c2(t,e,n){return Math.min(Math.max(t,e),n)}function u2(t){return t*a2}function un(t){return t*l2}const f2=Object.assign.bind(Object);function Ne(t,e="rgb"){const n=Math.round(t[0]*255),i=Math.round(t[1]*255),r=Math.round(t[2]*255);return e==="hex"?"#"+(r|i<<8|n<<16|1<<24).toString(16).slice(1):`rgb(${n},${i},${r})`}function h2(t){const[e,n,i]=t;return[e/255,n/255,i/255]}function ku(t,{separator:e="-",trim:n=!0}={}){let i=t.normalize("NFKD").replace("ß","ss").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,e).replace(/[^\w-]+/g,"").replace(/[_-]/g,e).replace(new RegExp(`${e}${e}`,"g"),e);return n&&(i=i.replace(new RegExp(`^${e}|${e}$`,"g"),"")),i}async function Su(t){const e={"text/plain":t},n=new ClipboardItem(e);await navigator.clipboard.write([n])}function d2(t,e){return JSON.stringify(t)===JSON.stringify(e)}function p2(t,e){const n={};for(const i of e)n[i]=t[i];return n}var xt,Au,Eu,Cu,Ds,Mu,Pu,In,ss,Ni,Bs;class Vs extends mt{constructor(){super(),Wt(this,xt),P(this,"rootEl",Z()),P(this,"cubeEl",Z()),P(this,"savePresetEl",Z()),P(this,"resetPresetEl",Z()),P(this,"deletePresetEl",Z()),this.preset="",this.presets=[],this.noModify=!1,this.cube=mr()}get presetsOptions(){return(this.noModify?[]:[["","[ New Gamut ]"]]).concat(this.presets.map(e=>[e[0],e[1]]))}get isModified(){const e=this.presets.find(n=>n[0]===this.preset);return e?!d2(this.cube,e[2]):!0}willUpdate(e){e.has("preset")&&b(this,xt,Bs).call(this)}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <ryb-color-picker-ui-selector
          value=${this.preset}
          .options=${this.presetsOptions}
          @update:value=${b(this,xt,Au)}
        ></ryb-color-picker-ui-selector>

        <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>

        <ryb-color-picker-ui-gamut-cube
          ${Q(this.cubeEl)}
          .cube=${this.cube}
          ?nomodify=${this.noModify}
          @update:cube=${b(this,xt,Eu)}
        >
        </ryb-color-picker-ui-gamut-cube>

        ${this.noModify?U``:U`<ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>
              <div class="actions">
                <ryb-color-picker-ui-button
                  ${Q(this.savePresetEl)}
                  feedback
                  ?disabled=${!this.isModified}
                  @click=${this.preset?b(this,xt,Cu):b(this,xt,Ds)}
                  >${this.preset?"Update Preset":"Save Preset"}
                </ryb-color-picker-ui-button>
                <ryb-color-picker-ui-button
                  ${Q(this.resetPresetEl)}
                  feedback
                  ?disabled=${!this.preset||!this.isModified}
                  @click=${b(this,xt,Mu)}
                  >Reset Preset</ryb-color-picker-ui-button
                >
                <ryb-color-picker-ui-button
                  ${Q(this.deletePresetEl)}
                  feedback
                  ?disabled=${!this.preset}
                  @click=${b(this,xt,Pu)}
                  >Delete Preset</ryb-color-picker-ui-button
                >
              </div>`}
      </div>
    `}}xt=new WeakSet,Au=function(t){b(this,xt,In).call(this,t.detail.value)},Eu=function(t){const{value:e}=t.detail;this.cube=e,b(this,xt,ss).call(this,e)},Cu=function(){if(this.noModify)return;const t=window.structuredClone(this.presets),e=window.structuredClone(this.cube),n=this.preset,i=t.find(r=>r[0]===n);i[2]=e,b(this,xt,Ni).call(this,t),b(this,xt,In).call(this,n),this.savePresetEl.value.showFeedBack("Updated")},Ds=async function(){if(this.noModify)return;let t="";try{if(t=await this.dialog("prompt","Please enter a title for the new gamut-preset:"),!t)throw Error("Missing title")}catch{return}const e=ku(t);if(this.presets.find(r=>r[0]===e)){await this.dialog("alert","A gamut-preset with this title does exist. Please choose another name."),b(this,xt,Ds).call(this);return}const n=window.structuredClone(this.presets),i=window.structuredClone(this.cube);n.push([e,t,i]),b(this,xt,Ni).call(this,n),b(this,xt,In).call(this,e),this.savePresetEl.value.showFeedBack("Saved")},Mu=function(){this.noModify||(b(this,xt,Bs).call(this),this.resetPresetEl.value.showFeedBack("Resetted"))},Pu=async function(){if(this.noModify)return;try{await this.dialog("confirm","Are you sure to delete this gamut-preset?")}catch{return}const t=this.preset,e=window.structuredClone(this.presets).filter(n=>n[0]!==t);b(this,xt,Ni).call(this,e),b(this,xt,In).call(this,""),this.deletePresetEl.value.showFeedBack("Deleted")},In=function(t){const e=St("update:preset",{value:t});this.dispatchEvent(e)},ss=function(t){const e=St("update:cube",{value:t});this.dispatchEvent(e)},Ni=function(t){const e=St("update:presets",{value:t});this.dispatchEvent(e)},Bs=function(){const t=this.presets.find(n=>n[0]===this.preset);if(!t)return;const e=window.structuredClone(t[2]);this.cube=e,b(this,xt,ss).call(this,e)},P(Vs,"properties",{dialog:{type:Function},cube:{type:Array},noModify:{type:Boolean},preset:{type:String},presets:{type:Array}}),P(Vs,"styles",At`
    .body {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    ryb-color-picker-ui-separator {
      --margin: 4px;
    }

    .actions {
      display: flex;
      gap: 4px;
      justify-content: center;
      margin-bottom: 8px;
    }
  `);var Us,Tu;class js extends mt{constructor(){super(),Wt(this,Us),P(this,"rootEl",Z()),P(this,"formEl",Z()),this.noModify=!1,this.cube=mr()}getCubeValue(e){const n=this.cube[e];return Ne(n,"hex")}handleColorInput(e){const n=Number(e.target.dataset.index),i=e.target.value,r=Se(i);if(!r)throw new Error("Could not convert to rgb color");const{r:s,g:o,b:l}=r;this.cube[n]=h2([s,o,l]),b(this,Us,Tu).call(this,this.cube)}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <form ${Q(this.formEl)} class="form">
          <div class="front">
            <ryb-color-picker-ui-field label="White">
              <input
                type="color"
                .value=${this.getCubeValue(0)}
                data-index="0"
                data-value=${this.getCubeValue(0)}
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
              />
            </ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Red">
              <input
                type="color"
                .value=${this.getCubeValue(1)}
                data-index="1"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
            /></ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Yellow">
              <input
                type="color"
                .value=${this.getCubeValue(2)}
                data-index="2"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
            /></ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Orange">
              <input
                type="color"
                .value=${this.getCubeValue(3)}
                data-index="3"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
              />
            </ryb-color-picker-ui-field>
          </div>
          <div class="back">
            <ryb-color-picker-ui-field label="Blue">
              <input
                type="color"
                .value=${this.getCubeValue(4)}
                data-index="4"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
              />
            </ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Purple">
              <input
                type="color"
                .value=${this.getCubeValue(5)}
                data-index="5"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
              />
            </ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Green">
              <input
                type="color"
                .value=${this.getCubeValue(6)}
                data-index="6"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
            /></ryb-color-picker-ui-field>
            <ryb-color-picker-ui-field label="Black">
              <input
                type="color"
                .value=${this.getCubeValue(7)}
                data-index="7"
                ?disabled=${this.noModify}
                @input=${this.handleColorInput}
              />
            </ryb-color-picker-ui-field>
          </div>
        </form>
      </div>
    `}}Us=new WeakSet,Tu=function(t){const e=St("update:cube",{value:t});this.dispatchEvent(e)},P(js,"properties",{cube:{type:Array},noModify:{type:Boolean}}),P(js,"styles",At`
    .body {
      flex: 1 1 auto;
    }

    .form {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-direction: column;
    }

    .front {
      display: inline-flex;
      gap: 8px;
    }

    .back {
      display: inline-flex;
      gap: 8px;
    }
  `);class zs extends mt{constructor(){super(),P(this,"rootEl",Z())}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(zs,"properties",{}),P(zs,"styles",At`
    :host {
      --size: 16px;
      --color: light-dark(black, white);

      display: inline-flex;
    }

    .body {
      align-items: stretch;
      display: inline-flex;
      height: var(--size);
      justify-content: stretch;
      width: var(--size);
      color: var(--color);
    }
  `);class Ws extends mt{constructor(){super(),P(this,"rootEl",Z()),P(this,"feedBackEl",Z()),this.disabled=!1,this.feedback=!1}showFeedBack(e,n=1e3){if(!this.feedback){console.warn("Please enable the feedback attribute.");return}const{value:i}=this.feedBackEl;i.innerHTML=e,i.setAttribute("duration",n),i.setAttribute("show","")}render(){return U`
      <button ${Q(this.rootEl)} class="body" ?disabled=${this.disabled}>
        ${this.feedback?U` <ryb-color-picker-ui-tool-tip
              ${Q(this.feedBackEl)}
            ></ryb-color-picker-ui-tool-tip>`:U``}
        <ryb-color-picker-ui-icon>
          <slot></slot>
        </ryb-color-picker-ui-icon>
      </button>
    `}}P(Ws,"properties",{disabled:{type:Boolean},feedback:{type:Boolean}}),P(Ws,"styles",At`
    :host {
      --size: 24px;
      --color: light-dark(#202020, #f0f0f0);

      display: inline-flex;
    }

    .body {
      align-items: center;
      border-radius: 2px;
      border: none;
      box-shadow: inset 1px 1px 1px 0 hsl(0 100 100 / 0.2),
        inset -1px -1px 1px 0 hsl(0 0 0 / 0.1);
      display: inline-flex;
      height: var(--size);
      justify-content: center;
      margin: 0;
      padding: 0;
      position: relative;
      width: var(--size);
      color: var(--color);

      &:active {
        transform: translate(1px, 1px);
      }

      &[disabled] {
        ryb-color-picker-ui-icon {
          opacity: 0.5;
        }
      }
    }
  `);var Ki,Nu,Ru;class Gs extends mt{constructor(){super(),Wt(this,Ki),P(this,"rootEl",Z()),P(this,"inputEl",Z()),this.autofocus=!1,this.disabled=!1,this.readonly=!1}setValue(e){b(this,Ki,Nu).call(this,e)}clear(){this.setValue("")}firstUpdated(e){e.has("autofocus")&&this.autofocus&&this.inputEl.value.focus()}updated(e){e.has("value")&&this.inputEl.value&&(this.inputEl.value.value=this.value)}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <input
          ${Q(this.inputEl)}
          part="input"
          type="text"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${b(this,Ki,Ru)}
        />
      </div>
    `}}Ki=new WeakSet,Nu=function(t){const e=St("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},Ru=function(t){const{value:e}=t.target;this.setValue(e)},P(Gs,"properties",{value:{type:String},autofocus:{type:Boolean},disabled:{type:Boolean},readonly:{type:Boolean}}),P(Gs,"styles",At`
    .body {
      display: flex;
    }

    input {
      height: 16px;
      padding: 4px;
      border: none;
      border-radius: 2px;
      flex: 1 1 auto;
      width: 100%;
    }
  `);var ce,Ou,Iu,Hu,Lu,os,ls;class Ks extends mt{constructor(){super(),Wt(this,ce),this.text="",this.value="",this._handleKeyUp=b(this,ce,Ou).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keyup",this._handleKeyUp)}render(){return U`
      <ryb-color-picker-ui-dialog>
        <div slot="text" class="text">
          <div>${this.text}</div>
          <ryb-color-picker-ui-field>
            <ryb-color-picker-ui-input
              autofocus
              value=${this.value}
              @update:value=${b(this,ce,Lu)}
            ></ryb-color-picker-ui-input>
          </ryb-color-picker-ui-field>
        </div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,ce,Iu)}
            >Cancel</ryb-color-picker-ui-button
          >
          <ryb-color-picker-ui-button @click=${b(this,ce,Hu)}
            >Continue</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}ce=new WeakSet,Ou=function(t){switch(t.key){case"Escape":b(this,ce,ls).call(this);break;case"Enter":b(this,ce,os).call(this);break}},Iu=function(){b(this,ce,ls).call(this)},Hu=function(){b(this,ce,os).call(this)},Lu=function(t){this.value=t.detail.value},os=function(){const{value:t}=this;if(!t)return;const e=St("continue",{value:t},{bubbles:!1});this.dispatchEvent(e)},ls=function(){const t=St("cancel",void 0,{bubbles:!1});this.dispatchEvent(t)},P(Ks,"properties",{text:{type:String},value:{type:String}}),P(Ks,"styles",At`
    .text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `);var oe,qi,Ji,Fu,Du;class qs extends mt{constructor(){super(),Wt(this,oe),P(this,"rootEl",Z()),P(this,"selectEl",Z()),this.noControls=!1}get count(){return this.options.length}get canCycle(){return this.count>1}setValue(e){b(this,oe,Ji).call(this,e)}nextValue(){let e=bt(this,oe,qi)+1;e>this.count-1&&(e=0);const n=this.options[e][0];b(this,oe,Ji).call(this,n)}previousValue(){let e=bt(this,oe,qi)-1;e<0&&(e=this.count-1);const n=this.options[e][0];b(this,oe,Ji).call(this,n)}updated(e){if(e.has("value")){const n=bt(this,oe,qi);if(n===-1)return;this.selectEl.value.selectedIndex=n}}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        ${this.noControls?U``:U` <ryb-color-picker-ui-icon-button
              ?disabled=${!this.canCycle}
              @click=${this.previousValue}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </ryb-color-picker-ui-icon-button>`}
        <select
          ${Q(this.selectEl)}
          class="select"
          @change=${b(this,oe,Fu)}
          @keyup=${b(this,oe,Du)}
        >
          ${this.options.map(([e,n])=>U`<option value="${e}">${n}</option>`)}
        </select>
        ${this.noControls?U``:U` <ryb-color-picker-ui-icon-button
              ?disabled=${!this.canCycle}
              @click=${this.nextValue}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </ryb-color-picker-ui-icon-button>`}
      </div>
    `}}oe=new WeakSet,qi=function(){return this.options.findIndex(([t])=>t===this.value)},Ji=function(t){const e=St("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},Fu=function(t){const e=t.target.value;this.setValue(e)},Du=function(t){switch(t.key){case"ArrowLeft":this.previousValue();break;case"ArrowRight":this.nextValue();break}},P(qs,"properties",{value:{type:String},options:{type:Array},noControls:{type:Boolean,reflect:!0}}),P(qs,"styles",At`
    :host {
      --outline-color: black;
      --border-radius: 4px;
      --focus-color: blue;

      display: inline-flex;
    }

    .body {
      display: inline-flex;
      gap: 4px;
      flex: 1 1 auto;
      justify-content: stretch;
    }

    .select {
      border: none;
      border-radius: 2px;
      height: 24px;
      width: 100%;
    }

    select:focus {
      outline: 2px solid var(--focus-color);
      z-index: 1;
    }
  `);class Js extends mt{constructor(){super(),P(this,"rootEl",Z())}render(){return U` <div ${Q(this.rootEl)} class="body"></div> `}}P(Js,"properties",{}),P(Js,"styles",At`
    :host {
      --padding: 8px;
      --margin: 8px;

      --_border-color--top: light-dark(#909090, #303030);
      --_border-color--bottom: light-dark(#c0c0c0, #505050);
    }

    .body {
      border-bottom-color: var(--_border-color--bottom);
      border-left-color: transparent;
      border-right-color: transparent;
      border-style: solid;
      border-top-color: var(--_border-color--top);
      border-width: 1px 0 1px 0;
      display: block;
      height: 0;
      margin-bottom: var(--margin);
      margin-left: var(--padding);
      margin-right: var(--padding);
      margin-top: var(--margin);
    }
  `);var Qn,Bu,Xs;class Ys extends mt{constructor(){super(),Wt(this,Qn),P(this,"rootEl",Z()),P(this,"inputEl",Z()),this.value=0}get canMinus(){return this.value>this.min}get canPlus(){return this.value<this.max}setValue(e){b(this,Qn,Xs).call(this,e)}plus(){this.setValue(this.value+1)}minus(){this.setValue(this.value-1)}updated(e){e.has("value")&&(this.inputEl.value.value=this.value)}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <ryb-color-picker-ui-icon-button
          ?disabled=${!this.canMinus}
          @click=${this.minus}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12l14 0" />
          </svg>
        </ryb-color-picker-ui-icon-button>
        <input
          ${Q(this.inputEl)}
          value="${this.value}"
          type="number"
          min="${this.min}"
          max="${this.max}"
          @change=${b(this,Qn,Bu)}
        />
        <ryb-color-picker-ui-icon-button
          ?disabled=${!this.canPlus}
          @click=${this.plus}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </ryb-color-picker-ui-icon-button>
      </div>
    `}}Qn=new WeakSet,Bu=function(t){const{value:e}=t.target;b(this,Qn,Xs).call(this,e)},Xs=function(t){const e=c2(t,this.min,this.max),n=St("update:value",{value:e},{bubbles:!1});this.dispatchEvent(n)},P(Ys,"properties",{value:{type:Number,reflect:!0},min:{type:Number,reflect:!0},max:{type:Number,reflect:!0}}),P(Ys,"styles",At`
    :host {
      display: inline-flex;
    }

    .body {
      display: inline-flex;
      gap: 4px;
      width: 100%;
    }

    input {
      width: 100%;
      text-align: center;
      border: none;
      border-radius: 2px;
      height: 16px;
      padding: 4px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  `);class Zs extends mt{constructor(){super(),P(this,"rootEl",Z()),this._intervalTimer,this.duration=1e3}willUpdate(e){e.has("show")&&(clearInterval(this._intervalTimer),this._intervalTimer=setTimeout(()=>{this.show=!1},this.duration))}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(Zs,"properties",{duration:{type:Number,reflect:!0},show:{type:Boolean,reflect:!0}}),P(Zs,"styles",At`
    :host {
      --offset: 8px;

      --_y: calc(-200% - var(--offset));

      display: inline-flex;
      left: 50%;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transform: translate(-50%, var(--_y));
      transition: all 0.2s ease-out;
    }

    :host([show]) {
      --_y: calc(-100% - var(--offset));

      opacity: 1;
    }

    .body {
      align-items: center;
      background-color: black;
      border-radius: 4px;
      color: white;
      display: inline-flex;
      justify-content: stretch;
      padding: 4px 8px;
    }

    .body::after {
      border-color: black transparent transparent transparent;
      border-style: solid;
      border-width: 4px;
      bottom: -8px;
      content: '';
      display: block;
      left: calc(50% - 4px);
      position: absolute;
    }
  `);class Qs extends mt{constructor(){super(),P(this,"rootEl",Z())}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(Qs,"properties",{}),P(Qs,"styles",At`
    :host {
      --width: 352px;
      --background-color: light-dark(#a0a0a0, #303030);

      display: inline-flex;
      color: black;
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      font-family: sans-serif;
      gap: 4px;
      padding: 4px;
      width: var(--width);
    }
  `);var yn,Vu,Uu,ju,fa;class to extends mt{constructor(){super(),Wt(this,yn),P(this,"rootEl",Z()),P(this,"inputEl",Z()),P(this,"copyEl",Z()),this.disabled=!1,this.noSettings=!1}async copyToClipboard(){await Su(this.value),this.copyEl.value.showFeedBack("Copied")}updated(e){e.has("value")&&(this.inputEl.value.value=this.value)}render(){return U`
      <div ${Q(this.rootEl)} class="body">
        <ryb-color-picker-ui-field class="value" label="Value">
          <ryb-color-picker-ui-input
            ${Q(this.inputEl)}
            class="input"
            ?disabled=${this.disabled}
            value=${this.value}
            @update:value=${b(this,yn,ju)}
          ></ryb-color-picker-ui-input>
          <ryb-color-picker-ui-icon-button
            ${Q(this.copyEl)}
            ?disabled=${this.disabled}
            feedback
            @click=${this.copyToClipboard}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
              />
              <path
                d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
              />
            </svg>
          </ryb-color-picker-ui-icon-button>
          <ryb-color-picker-ui-icon-button
            ?disabled=${this.disabled}
            @click=${b(this,yn,Uu)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
              <path d="M3 4.001v5h5" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          </ryb-color-picker-ui-icon-button>
          ${this.noSettings?U``:U` <ryb-color-picker-ui-icon-button
                ?disabled=${this.disabled}
                @click=${b(this,yn,Vu)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 6l8 0" />
                  <path d="M16 6l4 0" />
                  <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 12l2 0" />
                  <path d="M10 12l10 0" />
                  <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M4 18l11 0" />
                  <path d="M19 18l1 0" />
                </svg>
              </ryb-color-picker-ui-icon-button>`}
        </ryb-color-picker-ui-field>
      </div>
    `}}yn=new WeakSet,Vu=function(){const t=St("action:show-settings");this.dispatchEvent(t)},Uu=function(){const t=St("action:reset");this.dispatchEvent(t)},ju=function(t){t.stopPropagation();const{value:e}=t.detail;b(this,yn,fa).call(this,e)},fa=function(t){const e=St("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},P(to,"properties",{disabled:{type:Boolean},noSettings:{type:Boolean},value:{type:String,reflect:!0}}),P(to,"styles",At`
    :host {
      --background-color: light-dark(#a0a0a0, #303030);
    }

    .body {
      align-items: stretch;
      background-color: var(--background-color);
      border-radius: 8px;
      display: inline-flex;
      font-family: sans-serif;
      gap: 4px;
      padding: 4px;
    }

    .value {
      --direction: 'horizontal';
    }

    .input::part(input) {
      font-family: Monaco, monospace;
      width: 128px;
      text-align: center;
    }
  `);var eo,zu;class no extends mt{constructor(){super(),Wt(this,eo),P(this,"rootEl",Z()),this.disabled=!1,this.pill=!1}willUpdate(e){e.has("value")&&b(this,eo,zu).call(this,this.value)}render(){return U`
      <button
        ${Q(this.rootEl)}
        class="body"
        ?disabled=${this.disabled}
        style=${Dn({backgroundColor:this.value})}
      ></button>
    `}}eo=new WeakSet,zu=function(t){const e=St("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},P(no,"properties",{disabled:{type:Boolean,reflect:!0},pill:{type:Boolean,reflect:!0},value:{type:String,reflect:!0}}),P(no,"styles",At`
    :host {
      --size: 48px;

      align-items: stretch;
      display: inline-flex;
      justify-content: stretch;
      min-height: var(--size);
      min-width: var(--size);
    }

    :host([pill]) .body {
      border-radius: 999px;
    }

    .body {
      border-radius: calc(var(--size) / 8);
      border: none;
      display: flex;
      flex: 1 1 auto;
      transition: background-color 0.2s ease-out;
    }
  `);function g2(){let t=0,e=1,n=0,i=null;function r(o){return(n+1)*o/(n*o+1)}function s(o){if(i==null)return(o-t)/(e-t);let l=(i>o?t:e)-i,a=o-i;return r(a/l)*l+i}return s.extent=function(o){return arguments.length?(t=+o[0],e=+o[1],s):[t,e]},s.distortion=function(o){return arguments.length?(n=+o,s):n},s.focus=function(o){return arguments.length?(i=o,s):i},s}function as({angle:t=360,animationDuration:e=200,colorizeFn:n=(g,m)=>({fill:"transparent"}),context:i=null,distortion:r=3,gap:s=0,introDuration:o=600,name:l="radial-range",onClick:a=g=>{},radius:c=100,segments:u=24,startAngle:f=0,thickness:d=20}={}){let g=null;const m=wg().value(F=>F.value).sortValues(null),$=Ic();function O(F){return(F-(f-360))%360}const v=g2();v.distortion(r);function N(){const F=t/u,ot=[];for(let vt=0;vt<u;vt++){const kt=vt,gt=v((vt+1)*F)-v(vt*F);ot.push({index:kt,value:gt})}return ot}function T(){return m(N())}const _=Bi(i);let R=_.select(`g.${l}`);R.empty()&&(R=_.append("g").classed(l,!0));const G=R.append("path").classed("track",!0).attr("fill","transparent"),tt=R.append("g").classed("segments",!0);function ct(F=e){const ot=T(),vt=tt.selectAll(".segment").data(ot,J=>J.index),kt=vt.nodes();function gt(J){return J.__data__}function Ce(J){return kt.filter(Y=>gt(Y).index<J).sort((Y,ft)=>gt(ft).index-gt(Y).index)[0]}function Me(J){return kt.filter(Y=>gt(Y).index>J).sort((Y,ft)=>gt(Y).index-gt(ft).index)[0]}function Tt(J,Y){return function(ft){const h=this._current=f2({},Y,J(ft));Bi(this).select(".shape").attr("d",$(h)).attr("transform-origin",$.centroid(h).join(" "))}}function Gt(J){const Y=Ce(J.index),ft=Me(J.index);let h=un(f),p=h;Y&&(h=Y._current.endAngle+Y._current.padAngle/2,p=h),ft&&(p=ft._current.startAngle-ft._current.padAngle/2);const y=xn({startAngle:h,endAngle:p},{startAngle:J.startAngle,endAngle:J.endAngle});return Tt(y,J)}function te(J){const Y=xn(this._current,J);return Tt(Y,J)}function ye(J){const Y=Me(J.index);let ft=un(f+t);Y&&(ft=Y._current.startAngle-Y._current.padAngle);let h=xn({startAngle:J.startAngle,endAngle:J.endAngle},{startAngle:ft,endAngle:ft});return Tt(h,J)}return vt.join(function(J){const Y=J.append("g").classed("segment",!0).attr("data-index",(ft,h)=>h);return Y.append("path").classed("shape",!0).attr("stroke-width",s?0:1).attr("stroke",(ft,h)=>n(ft,h).stroke).attr("fill",(ft,h)=>n(ft,h).fill).on("click",(ft,h)=>{a(h.index)}),Y.interrupt().transition().duration(F).ease(Qr).tween("enter.arc",Gt),Y},function(J){return J.interrupt().transition().duration(F).ease(Qr).tween("update.arc",te),J.select(".shape").attr("stroke-width",s?0:1).attr("stroke",(Y,ft)=>n(Y,ft).stroke).attr("fill",(Y,ft)=>n(Y,ft).fill),J},function(J){return J.classed("exit",!0).interrupt().transition().duration(F).ease(Qr).tween("exit.arc",ye).on("end",function(){Bi(this).remove()}),J}),G.attr("d",$({startAngle:un(f),endAngle:un(f+t),innerRadius:c-d,outerRadius:c})),this}function rt(F=e){const ot=2*c*xi,vt=Fs/ot*s;return v.distortion(r),m.padAngle(vt).startAngle(un(f)).endAngle(un(f+t)),$.padAngle(vt).innerRadius(c-d).outerRadius(c),v.extent([0,t]).focus(g),ct(F)}function st(F,ot=e){return arguments.length?(g=null,F!=null&&(g=O(F),g>t&&(g=null)),v.focus(g),rt(ot)):g}function D(F=e){return this.focus(null,F)}function K(F){return arguments.length?(r=F,rt(e)):r}function H(F){return arguments.length?(s=F,rt(0)):s}function E(F){return arguments.length?(c=F,rt(0)):c}function nt(F){return arguments.length?(u=F,rt(e)):u}function q(F){return arguments.length?(d=F,rt(0)):d}rt(o);const X=R.node();return{blur:D,distortion:K,focus:st,gap:H,node:X,radius:E,render:ct,segments:nt,thickness:q,update:rt}}var M,ti,ei,ni,Wu,Ri,cs,ha,us,Oi,Gu,Ku,qu,Ju,Xu,Yu,Zu,Qu,tf,ef,nf,rf,sf,of,lf,af,cf,uf,ff,hf,df,pf,gf,io,yf,mf,bf,vf,_f,xf,ro,wf,$f,so,kf,Bn,Sf,dn,oo,Re,lo;class ao extends mt{constructor(){super(),Wt(this,M),P(this,"deletePresetEl",Z()),P(this,"rangesBodyEl",Z()),P(this,"rangesEl",Z()),P(this,"resetStoreEl",Z()),P(this,"clearStoreEl",Z()),P(this,"rootEl",Z()),P(this,"savePresetEl",Z()),P(this,"svgEl",Z()),P(this,"valueEl",Z()),P(this,"_scaleHue"),P(this,"_scaleLightness"),P(this,"_scaleSaturation"),P(this,"_rangeHue"),P(this,"_rangeLightness"),P(this,"_rangeSaturation"),P(this,"_busyTimerId",null),Wt(this,Re,o2.bind(this)),this._hslColor=[0,0,0],this._dialogs=[],this._initialSettings=null,this._ready=!1,this.hasPresets=!1,this.noInit=!1,this.noSettings=!1,this.noStore=!1,this.noValue=!1,this.cube=mr(),this.presets=[],this.gamutPresets=[],this.show=!0,this.showSettings=!1,this.showValue=!0,this.initialValue="hotpink",this.value="",this.animationDuration=150,this.backgroundColor="transparent",this.diameter=320,this.displayFormat="hex",this.distortion=3,this.gap=0,this.padding=30,this.swatchGap=8,this.thicknessLightness=20,this.thicknessHue=24,this.thicknessSaturation=20,this.segmentsLightness=24,this.segmentsHue=48,this.segmentsSaturation=24,this.preset="",this.gamutPreset="",this.storeConfigKey="ryb-color-picker/{id}/config",this.storeGamutPresetsKey="ryb-color-picker/{id}/gamut-presets",this.storePresetsKey="ryb-color-picker/{id}/presets"}get ready(){return this._ready}get radius(){return this.diameter/2}get innerRadius(){const{gap:e}=this;return this.radius-this.thicknessHue-e-this.thicknessSaturation-e-this.thicknessLightness-e}get swatchRadius(){return this.innerRadius-this.swatchGap}get color(){const{cube:e}=this;return qe(this._hslColor,{cube:e})}get colorCss(){return Ne(this.color,this.displayFormat)}get isBusy(){return this._busyTimerId!=null}get displayFormatOptions(){return[["hex","Hex"],["rgb","RGB"]]}get width(){return this.diameter+2*this.padding}get height(){return this.diameter+2*this.padding}get presetsOptions(){return[["","[ New Preset ]"]].concat(this.presets.map(e=>[e[0],e[1]]))}setValue(e){const n=Se(e);if(!n)throw new Error("Could not convert to color");const i=Fc(n),{h:r,s,l:o}=i;this._hslColor=[r,s,o]}resetValue(){const[e]=this._hslColor;this._hslColor=[e,1,.5]}setCube(e){this.cube=structuredClone(e)}init(){setTimeout(()=>{b(this,M,lo).call(this)},0)}async copyToClipboard(){await Su(this.value)}loadGamutPresets(e,n){this.gamutPresets=e,n&&(this.gamutPreset=n)}cycleGamutPreset(e=!1){const{gamutPresets:n}=this,{length:i}=n;if(i<2)return;if(!this.gamutPreset){this.gamutPreset=n[0][0];return}const r=n.findIndex(a=>a[0]===this.gamutPreset),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.gamutPreset=l}loadPresets(e,n){if(!this.hasPresets)throw new Error('Could not load presets. Please add the "haspresets" attribute.');if(this.presets=structuredClone(e),!n)return;const i=this.presets.find(l=>l[0]===n);if(!i){this.preset="";return}const[r,s,o]=i;this.preset=r,this.loadSettings(o)}cyclePreset(e=!1){if(!this.hasPresets)return;const{presets:n}=this,{length:i}=n;if(i<2)return;if(!this.preset){this.preset=n[0][0];return}const r=n.findIndex(a=>a[0]===this.preset),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.preset=l}cycleFormat(e=!1){const n=this.displayFormatOptions,{length:i}=n,r=n.findIndex(a=>a[0]===this.displayFormat),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.displayFormat=l}refresh(e=this.animationDuration){b(this,M,dn).call(this,"update",e)}setFocus(e,n=this.animationDuration){b(this,M,dn).call(this,"focus",e,n)}clearFocus(e=this.animationDuration){b(this,M,dn).call(this,"blur",e)}loadSettings(e){"gamutPreset"in e&&(this.gamutPresets.map(n=>n[0]).includes(e.gamutPreset)||(e.gamutPreset="")),Object.assign(this,e)}getSettings(){const e=p2(this,["backgroundColor","diameter","displayFormat","distortion","gamutPreset","gap","padding","segmentsHue","segmentsLightness","segmentsSaturation","swatchGap","thicknessHue","thicknessLightness","thicknessSaturation"]);return structuredClone(e)}savePreset(e,n){const{presets:i}=this,r=this.getSettings(),s=i.findIndex(o=>o[0]===e);s!==-1?i[s]=[e,n,r]:i.push([e,n,r]),b(this,M,Bn).call(this,i),this.preset=e}loadPreset(e){if(!e)return;const n=this.presets.find(o=>o[0]===e);if(!n){this.preset="";return}const[i,r,s]=n;this.loadSettings(s),this.preset=e}deletePreset(e){const n=this.presets.filter(i=>i[0]!==e);this.presets=n,b(this,M,Bn).call(this,n),this.preset=""}clearStore(){window.localStorage.removeItem(bt(this,M,ti)),window.localStorage.removeItem(bt(this,M,ni)),window.localStorage.removeItem(bt(this,M,ei))}reset(){this.preset="",this.cube=mr();const{_initialSettings:e}=this;e.gamutPreset="",this.loadSettings(e)}connectedCallback(){super.connectedCallback(),this._initialSettings=this.getSettings(),localStorage.getItem(bt(this,M,ti))||b(this,M,ro).call(this);const e=b(this,M,wf).call(this);e&&(this.preset=e.preset,this.gamutPreset=e.gamutPreset),localStorage.getItem(bt(this,M,ei))||b(this,M,Bn).call(this),this.presets=b(this,M,kf).call(this)??[],localStorage.getItem(bt(this,M,ni))||b(this,M,so).call(this),this.gamutPresets=b(this,M,$f).call(this)??[]}willUpdate(e){e.has("initialValue")&&this.setValue(this.initialValue),e.has("preset")&&this.loadPreset(this.preset),e.has("gamutPreset")&&b(this,M,Sf).call(this),e.has("gamutPresets")&&b(this,M,so).call(this),e.has("presets")&&b(this,M,Bn).call(this),(e.has("_hslColor")||e.has("cube"))&&(this.value=this.colorCss),(e.has("gamutPreset")||e.has("preset"))&&b(this,M,ro).call(this),e.has("value")&&b(this,M,Gu).call(this,this.value),e.has("preset")&&b(this,M,Ku).call(this,this.preset),e.has("_ready")&&this.ready&&b(this,M,qu).call(this)}firstUpdated(){this.noInit||b(this,M,lo).call(this)}updated(e){if(!this._ready)return;const{distortion:n,gap:i,radius:r,segmentsHue:s,segmentsLightness:o,segmentsSaturation:l,thicknessHue:a,thicknessLightness:c,thicknessSaturation:u}=this;e.has("segmentsLightness")&&(this._scaleLightness.range([0,o]),this._rangeLightness.segments(o)),e.has("segmentsSaturation")&&(this._scaleSaturation.range([0,l]),this._rangeSaturation.segments(l)),e.has("segmentsHue")&&(this._scaleHue.range([0,s]),this._rangeHue.segments(s));const f=r-a-i,d=f-u-i;e.has("thicknessLightness")&&this._rangeLightness.thickness(c),e.has("thicknessSaturation")&&(this._rangeSaturation.thickness(u),this._rangeLightness.radius(d)),e.has("thicknessHue")&&(this._rangeHue.thickness(a),this._rangeSaturation.radius(f),this._rangeLightness.radius(d)),(e.has("diameter")||e.has("gap")||e.has("thicknessSaturation")||e.has("thicknessHue"))&&(this._rangeHue.radius(r),this._rangeSaturation.radius(f),this._rangeLightness.radius(d)),e.has("gap")&&b(this,M,dn).call(this,"gap",i),e.has("distortion")&&b(this,M,dn).call(this,"distortion",n),(e.has("_ready")||e.has("value")||e.has("cube"))&&this.refresh(),b(this,M,oo).call(this)}render(){return U`
      <div
        ${Q(this.rootEl)}
        class="body"
        style=${Dn({display:this.show?"inline-flex":"none"})}
        tabindex="0"
      >
        <svg
          ${Q(this.svgEl)}
          width=${this.width}
          height=${this.height}
          viewBox=${bt(this,M,Wu)}
        >
          <circle
            r=${this.innerRadius}
            stroke-width="1"
            style=${Dn({fill:this.backgroundColor,stroke:this.backgroundColor})}
          />
          <circle
            class="color"
            r=${this.swatchRadius}
            style=${Dn({fill:this.colorCss})}
          />
          <g
            ${Q(this.rangesEl)}
            class="ranges"
            @pointerenter=${b(this,M,Xu)}
            @pointerleave=${b(this,M,Yu)}
            @pointermove=${b(this,M,Ju)}
          >
            <path
              ${Q(this.rangesBodyEl)}
              class="ranges-body"
              style=${Dn({fill:this.backgroundColor})}
            />
          </g>
        </svg>

        ${ca(!this.noValue&&this.showValue?U`<ryb-color-picker-value
                ${Q(this.valueEl)}
                value=${this.colorCss}
                ?disabled=${!this.ready}
                ?nosettings=${this.noSettings}
                @action:reset=${b(this,M,vf)}
                @action:show-settings=${()=>this.showSettings=!this.showSettings}
                @update:value=${b(this,M,Qu)}
              ></ryb-color-picker-value>`:U``)}
        ${ca(!this.noSettings&&this.showSettings?U`<ryb-color-picker-settings
                >${this.hasPresets?U`
                      <ryb-color-picker-ui-field label="Presets">
                        <ryb-color-picker-ui-selector
                          value=${this.preset}
                          .options=${this.presetsOptions}
                          @update:value=${b(this,M,xf)}
                        ></ryb-color-picker-ui-selector>
                      </ryb-color-picker-ui-field>

                      <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator
                    ></ryb-color-picker-settings>`:U``}

                <ryb-color-picker-ui-field label="Gamut">
                  <ryb-color-picker-ui-gamut
                    .cube=${this.cube}
                    .dialog=${bt(this,Re)}
                    .preset=${this.gamutPreset}
                    .presets=${this.gamutPresets}
                    @update:preset=${b(this,M,ff)}
                    @update:cube=${b(this,M,uf)}
                    @update:presets=${b(this,M,hf)}
                  ></ryb-color-picker-ui-gamut>
                </ryb-color-picker-ui-field>

                <div class="settings-group columns-3">
                  <ryb-color-picker-ui-field label="BG color">
                    <ryb-color-picker-ui-input
                      value=${this.backgroundColor}
                      @update:value=${b(this,M,tf)}
                    ></ryb-color-picker-ui-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Distortion">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.distortion}
                      label="Distortion"
                      min="0"
                      max="8"
                      @update:value=${b(this,M,pf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Format">
                    <ryb-color-picker-ui-selector
                      value=${this.displayFormat}
                      .options=${this.displayFormatOptions}
                      nocontrols
                      @update:value=${b(this,M,Zu)}
                    ></ryb-color-picker-ui-selector>
                  </ryb-color-picker-ui-field>
                </div>

                <div class="settings-group columns-3">
                  <ryb-color-picker-ui-field label="Diameter">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.diameter}
                      label="Diameter"
                      min="128"
                      max="512"
                      @update:value=${b(this,M,df)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Gap">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.gap}
                      label="Gap"
                      min="0"
                      max="4"
                      @update:value=${b(this,M,af)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Swatch gap">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.swatchGap}
                      label="Swatch gap"
                      min="0"
                      max="24"
                      @update:value=${b(this,M,cf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                </div>

                <ryb-color-picker-ui-field class="segments" label="Segments">
                  <ryb-color-picker-ui-field label="Hue">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.segmentsHue}
                      label="Hue"
                      min="8"
                      max="128"
                      @update:value=${b(this,M,ef)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Saturation">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.segmentsSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${b(this,M,rf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Lightness">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.segmentsLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${b(this,M,nf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                </ryb-color-picker-ui-field>

                <ryb-color-picker-ui-field class="thickness" label="Thickness">
                  <ryb-color-picker-ui-field label="Hue">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.thicknessHue}
                      label="Hue"
                      min="8"
                      max="128"
                      @update:value=${b(this,M,sf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Saturation">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.thicknessSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${b(this,M,lf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Lightness">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.thicknessLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${b(this,M,of)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                </ryb-color-picker-ui-field>

                <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>

                <div class="actions">
                  ${this.hasPresets?U`<ryb-color-picker-ui-button
                          ${Q(this.savePresetEl)}
                          feedback
                          @click=${this.preset?b(this,M,gf):b(this,M,io)}
                          >${this.preset?"Update Preset":"Save Preset"}</ryb-color-picker-ui-button
                        >
                        <ryb-color-picker-ui-button
                          ${Q(this.deletePresetEl)}
                          feedback
                          ?disabled=${!this.preset}
                          @click=${b(this,M,yf)}
                          >Delete Preset</ryb-color-picker-ui-button
                        >`:U``}
                  ${this.noStore?U``:U`<ryb-color-picker-ui-icon-button
                        ${Q(this.clearStoreEl)}
                        feedback
                        @click=${b(this,M,mf)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M3 3m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"
                          />
                          <path
                            d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"
                          />
                          <path d="M12 12h.01" />
                        </svg>
                      </ryb-color-picker-ui-icon-button>`}
                  <ryb-color-picker-ui-icon-button
                    ${Q(this.resetStoreEl)}
                    feedback
                    @click=${b(this,M,bf)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
                      <path d="M3 4.001v5h5" />
                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    </svg>
                  </ryb-color-picker-ui-icon-button>
                  <ryb-color-picker-ui-button
                    class="close-button"
                    @click=${b(this,M,_f)}
                    >Close</ryb-color-picker-ui-button
                  >
                </div>
              </ryb-color-picker-settings>`:U``)}
        ${this._dialogs.length>0?U` <div class="dialogs">
              ${this._dialogs.map(e=>e.type==="prompt"?U`<ryb-color-picker-ui-prompt
                      text=${e.text}
                      @continue=${e.onContinue}
                      @cancel=${e.onCancel}
                    ></ryb-color-picker-ui-prompt>`:e.type==="confirm"?U`<ryb-color-picker-ui-confirm
                      text=${e.text}
                      @continue=${e.onContinue}
                      @cancel=${e.onCancel}
                    ></ryb-color-picker-ui-confirm>`:e.type==="alert"?U`<ryb-color-picker-ui-alert
                      text=${e.text}
                      @ok=${e.onOk}
                    ></ryb-color-picker-ui-alert>`:U``)}
            </div>`:U``}
      </div>
    `}}M=new WeakSet,ti=function(){return b(this,M,Ri).call(this,this.storeConfigKey)},ei=function(){return b(this,M,Ri).call(this,this.storePresetsKey)},ni=function(){return b(this,M,Ri).call(this,this.storeGamutPresetsKey)},Wu=function(){return`${this.width/-2} ${this.height/-2} ${this.width} ${this.height}`},Ri=function(t){const{id:e}=this;return t.replaceAll("{id}",e??"default")},cs=function(t){clearTimeout(this._busyTimerId),this._busyTimerId=setTimeout(()=>{this._busyTimerId=null},t)},ha=function(t,e){let n=Math.atan2(e,t)+xi/2;return n<0&&(n+=Fs),u2(n)},us=function(t){const[e,n]=M0(t,this.rangesBodyEl.value);return b(this,M,ha).call(this,e,n)},Oi=function(t,e){const n=St(t,{value:e});this.dispatchEvent(n)},Gu=function(t){b(this,M,Oi).call(this,"update:value",t)},Ku=function(t){b(this,M,Oi).call(this,"update:preset",t)},qu=function(){b(this,M,Oi).call(this,"ready",!0)},Ju=function(t){if(!this.ready||this.isBusy)return;const e=b(this,M,us).call(this,t);this.setFocus(e,0)},Xu=function(t){if(!this.ready)return;const{animationDuration:e}=this,n=b(this,M,us).call(this,t);this.setFocus(n,e),b(this,M,cs).call(this,e)},Yu=function(){if(!this.ready)return;const{animationDuration:t}=this;this.clearFocus(t),b(this,M,cs).call(this,t)},Zu=function(t){this.displayFormat=t.detail.value},Qu=function(t){t.stopPropagation(),this.setValue(t.detail.value)},tf=function(t){this.backgroundColor=t.detail.value},ef=function(t){this.segmentsHue=t.detail.value},nf=function(t){this.segmentsLightness=t.detail.value},rf=function(t){this.segmentsSaturation=t.detail.value},sf=function(t){this.thicknessHue=t.detail.value},of=function(t){this.thicknessLightness=t.detail.value},lf=function(t){this.thicknessSaturation=t.detail.value},af=function(t){this.gap=t.detail.value},cf=function(t){this.swatchGap=t.detail.value},uf=function(t){this.setCube(t.detail.value)},ff=function(t){this.gamutPreset=t.detail.value},hf=function(t){this.gamutPresets=t.detail.value},df=function(t){this.diameter=t.detail.value},pf=function(t){this.distortion=t.detail.value},gf=function(){if(!this.hasPresets)return;const t=this.preset,e=this.presets.find(n=>n[0]===t)[1];this.savePreset(t,e),this.savePresetEl.value.showFeedBack("Updated")},io=async function(){if(!this.hasPresets)return;let t="";try{t=await bt(this,Re).call(this,"prompt","Please enter a title for the new preset:")}catch{return}const e=ku(t);if(this.presets.find(n=>n[0]===e)){await bt(this,Re).call(this,"alert","A preset with this title does exist. Please choose another name."),b(this,M,io).call(this);return}this.savePreset(e,t),this.savePresetEl.value.showFeedBack("Saved")},yf=async function(){if(this.hasPresets){try{await bt(this,Re).call(this,"confirm","Are you sure to delete this preset?")}catch{return}this.deletePreset(this.preset),this.deletePresetEl.value.showFeedBack("Deleted")}},mf=async function(){try{await bt(this,Re).call(this,"confirm","Are you sure to clear the local store?")}catch{return}this.clearStore(),this.clearStoreEl.value.showFeedBack("Cleared")},bf=async function(){try{await bt(this,Re).call(this,"confirm","Are you sure to reset all settings?")}catch{return}this.reset(),this.resetStoreEl.value.showFeedBack("Resetted")},vf=function(){this.resetValue()},_f=function(){this.showSettings=!1},xf=function(t){if(!this.hasPresets)return;const e=t.detail.value;this.preset=e,this.loadPreset(e)},ro=function(){if(this.noStore)return;const{gamutPreset:t}=this,e=this.hasPresets?this.preset:"",n={gamutPreset:t,preset:e};window.localStorage.setItem(bt(this,M,ti),JSON.stringify(n))},wf=function(){if(this.noStore)return;const t=JSON.parse(window.localStorage.getItem(bt(this,M,ti)));return this.hasPresets||(t.preset=""),t},$f=function(){if(!this.noStore)return JSON.parse(window.localStorage.getItem(bt(this,M,ni)))},so=function(){this.noStore||window.localStorage.setItem(bt(this,M,ni),JSON.stringify(this.gamutPresets))},kf=function(){if(!this.noStore&&this.hasPresets)return JSON.parse(window.localStorage.getItem(bt(this,M,ei)))},Bn=function(){this.noStore||this.hasPresets&&window.localStorage.setItem(bt(this,M,ei),JSON.stringify(this.presets))},Sf=function(){const{gamutPreset:t,gamutPresets:e}=this,n=e.findIndex(r=>r[0]===t);let{cube:i}=this;n!==-1&&(i=e[n][2]),this.setCube(i)},dn=function(t,...e){this._rangeLightness[t](...e),this._rangeHue[t](...e),this._rangeSaturation[t](...e)},oo=function(){const{radius:t,thicknessSaturation:e,thicknessLightness:n,thicknessHue:i,gap:r}=this,s=t-r-i-r-e-r,o=Ic()({startAngle:0,endAngle:Fs,innerRadius:s-n,outerRadius:t+r});Bi(this.rangesBodyEl.value).attr("d",o)},Re=new WeakMap,lo=function(){const{animationDuration:t,gap:e,radius:n,segmentsLightness:i,segmentsHue:r,segmentsSaturation:s,thicknessLightness:o,thicknessHue:l,thicknessSaturation:a}=this,c=this.rangesEl.value,u=n,f=u-l-e,d=f-a-e;this._scaleLightness=Ui([0,i]).interpolate(()=>O=>{const{cube:v}=this,N=1/this.segmentsLightness*O,[T,_]=this._hslColor,R=Ne(qe([T,_,N],{cube:v})),G=Ne(qe([T,_,Math.max(0,N-.11)],{cube:v}));return{fill:R,stroke:G}}),this._scaleSaturation=Ui([0,s]).interpolate(()=>O=>{const{cube:v}=this,N=1/this.segmentsSaturation*O,[T,_,R]=this._hslColor,G=Ne(qe([T,N,R],{cube:v})),tt=Ne(qe([T,N,Math.max(0,R-.1)],{cube:v}));return{fill:G,stroke:tt}}),this._scaleHue=Ui([0,r]).interpolate(()=>O=>{const{cube:v}=this,N=360/this.segmentsHue*O,[T,_,R]=this._hslColor,G=Ne(qe([N,_,R],{cube:v})),tt=Ne(qe([N,_,Math.max(0,R-.1)],{cube:v}));return{fill:G,stroke:tt}});const g=O=>{const[v,N,T]=this._hslColor,_=1/this.segmentsLightness*O;this._hslColor=[v,N,_],this._rangeSaturation.update(),this._rangeHue.update()},m=O=>{const[v,N,T]=this._hslColor,_=1/this.segmentsSaturation*O;this._hslColor=[v,_,T],this._rangeLightness.update(),this._rangeHue.update()},$=O=>{const[v,N,T]=this._hslColor,_=360/this.segmentsHue*O;this._hslColor=[_,N,T],this._rangeLightness.update(),this._rangeSaturation.update()};this._rangeLightness=as({animationDuration:t,colorizeFn:(O,v)=>this._scaleLightness(v),context:c,gap:e,name:"lightness",onClick:g,radius:d,segments:i,thickness:o}),this._rangeSaturation=as({animationDuration:t,colorizeFn:(O,v)=>this._scaleSaturation(v),context:c,gap:e,name:"saturation",onClick:m,radius:f,segments:s,thickness:a}),this._rangeHue=as({animationDuration:t,colorizeFn:(O,v)=>this._scaleHue(v),context:c,gap:e,name:"hue",onClick:$,radius:u,segments:r,thickness:l}),this.rootEl.value.addEventListener("keyup",async O=>{var v;if(O.target===this.rootEl.value)switch(O.key){case"c":this.valueEl.value?await((v=this.valueEl.value)==null?void 0:v.copyToClipboard()):await this.copyToClipboard();break;case"f":this.cycleFormat();break;case"g":this.cycleGamutPreset();break;case"G":this.cycleGamutPreset(!0);break;case"p":this.cyclePreset();break;case"P":this.cyclePreset(!0);break;case"r":this.resetValue();break;case"s":this.noSettings||(this.showSettings=!this.showSettings);break;case"v":this.noValue||(this.showValue=!this.showValue);break}}),b(this,M,oo).call(this),setTimeout(()=>{this._ready=!0},t)},P(ao,"properties",{_hslColor:{state:!0},_dialogs:{state:!0},_initialSettings:{state:!0},_ready:{type:Boolean,attribute:!1},cube:{type:Array,attribute:!1},gamutPresets:{type:Array,attribute:!1},presets:{type:Array,attribute:!1},animationDuration:{type:Number,reflect:!0},backgroundColor:{type:String,reflect:!0},diameter:{type:Number,reflect:!0},displayFormat:{type:String,reflect:!0},distortion:{type:Number,reflect:!0},gamutPreset:{type:String,reflect:!0},gap:{type:Number,reflect:!0},hasPresets:{type:Boolean},id:{type:String},initialValue:{type:String,reflect:!0},noInit:{type:Boolean},noSettings:{type:Boolean},noStore:{type:Boolean},noValue:{type:Boolean},padding:{type:Number,reflect:!0},preset:{type:String,reflect:!0},segmentsHue:{type:Number,reflect:!0},segmentsLightness:{type:Number,reflect:!0},segmentsSaturation:{type:Number,reflect:!0},show:{type:Boolean,reflect:!0},showSettings:{type:Boolean,reflect:!0},showValue:{type:Boolean,reflect:!0},swatchGap:{type:Number,reflect:!0},thicknessHue:{type:Number,reflect:!0},thicknessLightness:{type:Number,reflect:!0},thicknessSaturation:{type:Number,reflect:!0},value:{type:String,reflect:!0},storeConfigKey:{type:String},storeGamutPresetsKey:{type:String},storePresetsKey:{type:String}}),P(ao,"styles",At`
    :host {
      display: inline-flex;
      box-sizing: border-box;

      *,
      *::after,
      *::before {
        box-sizing: inherit;
      }
    }

    .body {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      outline: none;
      padding: 16px;
      position: relative;
    }

    .color {
      transition: fill 0.2s ease-out;
    }

    .shape {
      transition-duration: 0.2s;
      transition-property: fill, stroke;
      transition-timing-function: ease-out;
    }

    .ranges {
      cursor: crosshair;
    }

    .ranges-body {
      fill: black;
    }

    .settings-group {
      align-items: center;
      display: flex;
      gap: 4px;
      justify-content: stretch;

      &.columns-3 {
        > * {
          flex: 1 1 calc(100% / 3);
        }
      }
    }

    .segments {
      --direction: row;

      > * {
        flex: 1 1 calc(100% / 3);
      }
    }

    .thickness {
      --direction: row;

      > * {
        flex: 1 1 calc(100% / 3);
      }
    }

    ryb-color-picker-settings {
      margin-top: 16px;
    }

    .actions {
      display: flex;
      gap: 4px;
      width: 100%;
    }

    .close-button {
      margin-left: auto;
    }

    .dialogs {
      position: absolute;
      inset: 0;
      z-index: 1000;
    }
  `);window.customElements.define("ryb-color-picker-ui-alert",vu);window.customElements.define("ryb-color-picker-ui-button",Is);window.customElements.define("ryb-color-picker-ui-confirm",$u);window.customElements.define("ryb-color-picker-ui-dialog",Hs);window.customElements.define("ryb-color-picker-ui-field",Ls);window.customElements.define("ryb-color-picker-ui-gamut",Vs);window.customElements.define("ryb-color-picker-ui-gamut-cube",js);window.customElements.define("ryb-color-picker-ui-icon",zs);window.customElements.define("ryb-color-picker-ui-icon-button",Ws);window.customElements.define("ryb-color-picker-ui-input",Gs);window.customElements.define("ryb-color-picker-ui-prompt",Ks);window.customElements.define("ryb-color-picker-ui-selector",qs);window.customElements.define("ryb-color-picker-ui-separator",Js);window.customElements.define("ryb-color-picker-ui-stepper-input",Ys);window.customElements.define("ryb-color-picker-ui-tool-tip",Zs);window.customElements.define("ryb-color-picker-settings",Qs);window.customElements.define("ryb-color-picker-value",to);window.customElements.define("ryb-color-swatch",no);window.customElements.define("ryb-color-picker",ao);const y2={VITE_API_DOCUMENTATION_URL:"https://github.com/bennyschudel/ryb-color-picker/blob/main/docs/API.md",VITE_APP_VERSION:"0.5.1",VITE_GITHUB_URL:"https://github.com/bennyschudel/ryb-color-picker"},{VITE_APP_VERSION:m2,VITE_API_DOCUMENTATION_URL:b2,VITE_GITHUB_URL:v2}=y2,_2=m2,x2=b2,w2=v2,$2={class:"body"},k2={class:"head"},S2={class:"ml-2"},A2=["href"],E2=["href"],C2={class:"badge"},M2=["initialValue"],P2=Sh({__name:"App",setup(t){const e=oi("hotpink"),n=oi("black"),i=Tp(),r=yp(i),s=Zt(()=>({"--background-color":n.value}));function o(c){n.value=c.detail.value}const l=Ah("picker"),a=[["my-preset","My Preset",{backgroundColor:"white",diameter:320,displayFormat:"hex",distortion:3,gamutPreset:"itten-normalized",gap:0,padding:30,segmentsHue:48,segmentsLightness:24,segmentsSaturation:24,swatchGap:8,thicknessHue:24,thicknessLightness:20,thicknessSaturation:20}],["my-preset-2","My Preset 2",{backgroundColor:"transparent",diameter:420,displayFormat:"rgb",distortion:3,gamutPreset:"munsell",gap:1,padding:30,segmentsHue:48,segmentsLightness:12,segmentsSaturation:12,swatchGap:8,thicknessHue:40,thicknessLightness:28,thicknessSaturation:28}]];return Ar(()=>{if(l.value){const c=Array.from(it,([u,f])=>[u,f.title,f.cube]);l.value.loadGamutPresets(c,"itten-normalized"),l.value.loadPresets(a,"my-preset"),ir(l.value,"update:value",o)}}),(c,u)=>(yd(),vd("div",{class:"app",style:wr(s.value)},[Kt("div",$2,[Kt("div",k2,[Kt("button",{onClick:u[0]||(u[0]=f=>Oe(r)())},[Kt("span",S2,fs(Oe(i)?"Dark":"Light"),1)]),Kt("a",{href:Oe(x2)},"API Documentation",8,A2),Kt("a",{href:Oe(w2)},"Github",8,E2)]),u[1]||(u[1]=Kt("h1",null,"<ryb-color-picker>",-1)),Kt("div",C2,fs(Oe(_2)),1),Kt("ryb-color-picker",{ref:"picker",initialValue:e.value,hasPresets:""},null,8,M2),u[2]||(u[2]=$d('<div class="shortcuts" data-v-27cd5f3d><h3 data-v-27cd5f3d>Shortcuts</h3><table data-v-27cd5f3d><tbody data-v-27cd5f3d><tr data-v-27cd5f3d><td data-v-27cd5f3d>c</td><td data-v-27cd5f3d>copy value to clipboard</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>f</td><td data-v-27cd5f3d>cycle format</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>g</td><td data-v-27cd5f3d>cygle gamut-preset</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>shift + g</td><td data-v-27cd5f3d>cycle gamut-preset backwards</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>p</td><td data-v-27cd5f3d>cycle preset</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>shift + p</td><td data-v-27cd5f3d>cycle preset backwards</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>r</td><td data-v-27cd5f3d> reset value (good if the color is to dark, to bright or to desaturated) </td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>s</td><td data-v-27cd5f3d>toggle settings</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>v</td><td data-v-27cd5f3d>toggle value-bar</td></tr></tbody></table></div><p class="note" data-v-27cd5f3d> 2025, by <a href="https://twitter.com/bennyschudel" target="_blank" data-v-27cd5f3d>@bennyschudel</a>, MIT License </p>',2))])],4))}}),T2=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n},N2=T2(P2,[["__scopeId","data-v-27cd5f3d"]]);np(N2).mount("#app");
