(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function lo(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const ft={},gn=[],fe=()=>{},bf=()=>!1,gr=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),ao=t=>t.startsWith("onUpdate:"),Mt=Object.assign,co=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},vf=Object.prototype.hasOwnProperty,st=(t,e)=>vf.call(t,e),K=Array.isArray,yn=t=>yr(t)==="[object Map]",ca=t=>yr(t)==="[object Set]",z=t=>typeof t=="function",wt=t=>typeof t=="string",De=t=>typeof t=="symbol",yt=t=>t!==null&&typeof t=="object",ua=t=>(yt(t)||z(t))&&z(t.then)&&z(t.catch),fa=Object.prototype.toString,yr=t=>fa.call(t),_f=t=>yr(t).slice(8,-1),ha=t=>yr(t)==="[object Object]",uo=t=>wt(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Fn=lo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),mr=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},xf=/-(\w)/g,Le=mr(t=>t.replace(xf,(e,n)=>n?n.toUpperCase():"")),wf=/\B([A-Z])/g,ln=mr(t=>t.replace(wf,"-$1").toLowerCase()),da=mr(t=>t.charAt(0).toUpperCase()+t.slice(1)),Rr=mr(t=>t?`on${da(t)}`:""),Ie=(t,e)=>!Object.is(t,e),Or=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},pa=(t,e,n,i=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:i,value:n})},$f=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let zo;const br=()=>zo||(zo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function vr(t){if(K(t)){const e={};for(let n=0;n<t.length;n++){const i=t[n],r=wt(i)?Ef(i):vr(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(wt(t)||yt(t))return t}const kf=/;(?![^(]*\))/g,Sf=/:([^]+)/,Af=/\/\*[^]*?\*\//g;function Ef(t){const e={};return t.replace(Af,"").split(kf).forEach(n=>{if(n){const i=n.split(Sf);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function fo(t){let e="";if(wt(t))e=t;else if(K(t))for(let n=0;n<t.length;n++){const i=fo(t[n]);i&&(e+=i+" ")}else if(yt(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Cf="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Mf=lo(Cf);function ga(t){return!!t||t===""}const ya=t=>!!(t&&t.__v_isRef===!0),us=t=>wt(t)?t:t==null?"":K(t)||yt(t)&&(t.toString===fa||!z(t.toString))?ya(t)?us(t.value):JSON.stringify(t,ma,2):String(t),ma=(t,e)=>ya(e)?ma(t,e.value):yn(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[i,r],s)=>(n[Ir(i,s)+" =>"]=r,n),{})}:ca(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ir(n))}:De(e)?Ir(e):yt(e)&&!K(e)&&!ha(e)?String(e):e,Ir=(t,e="")=>{var n;return De(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Rt;class Pf{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Rt,!e&&Rt&&(this.index=(Rt.scopes||(Rt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Rt;try{return Rt=this,e()}finally{Rt=n}}}on(){Rt=this}off(){Rt=this.parent}stop(e){if(this._active){this._active=!1;let n,i;for(n=0,i=this.effects.length;n<i;n++)this.effects[n].stop();for(this.effects.length=0,n=0,i=this.cleanups.length;n<i;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,i=this.scopes.length;n<i;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function ba(){return Rt}function Tf(t,e=!1){Rt&&Rt.cleanups.push(t)}let dt;const Hr=new WeakSet;class va{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Rt&&Rt.active&&Rt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Hr.has(this)&&(Hr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||xa(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Wo(this),wa(this);const e=dt,n=Xt;dt=this,Xt=!0;try{return this.fn()}finally{$a(this),dt=e,Xt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)go(e);this.deps=this.depsTail=void 0,Wo(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Hr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){fs(this)&&this.run()}get dirty(){return fs(this)}}let _a=0,Ln,Dn;function xa(t,e=!1){if(t.flags|=8,e){t.next=Dn,Dn=t;return}t.next=Ln,Ln=t}function ho(){_a++}function po(){if(--_a>0)return;if(Dn){let e=Dn;for(Dn=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Ln;){let e=Ln;for(Ln=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){t||(t=i)}e=n}}if(t)throw t}function wa(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function $a(t){let e,n=t.depsTail,i=n;for(;i;){const r=i.prevDep;i.version===-1?(i===n&&(n=r),go(i),Nf(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}t.deps=e,t.depsTail=n}function fs(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(ka(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function ka(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Qn))return;t.globalVersion=Qn;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!fs(t)){t.flags&=-3;return}const n=dt,i=Xt;dt=t,Xt=!0;try{wa(t);const r=t.fn(t._value);(e.version===0||Ie(r,t._value))&&(t._value=r,e.version++)}catch(r){throw e.version++,r}finally{dt=n,Xt=i,$a(t),t.flags&=-3}}function go(t,e=!1){const{dep:n,prevSub:i,nextSub:r}=t;if(i&&(i.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=i,t.nextSub=void 0),n.subs===t&&(n.subs=i,!i&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)go(s,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Nf(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Xt=!0;const Sa=[];function Be(){Sa.push(Xt),Xt=!1}function Ve(){const t=Sa.pop();Xt=t===void 0?!0:t}function Wo(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=dt;dt=void 0;try{e()}finally{dt=n}}}let Qn=0;class Rf{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class _r{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!dt||!Xt||dt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==dt)n=this.activeLink=new Rf(dt,this),dt.deps?(n.prevDep=dt.depsTail,dt.depsTail.nextDep=n,dt.depsTail=n):dt.deps=dt.depsTail=n,Aa(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const i=n.nextDep;i.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=i),n.prevDep=dt.depsTail,n.nextDep=void 0,dt.depsTail.nextDep=n,dt.depsTail=n,dt.deps===n&&(dt.deps=i)}return n}trigger(e){this.version++,Qn++,this.notify(e)}notify(e){ho();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{po()}}}function Aa(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Aa(i)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Gi=new WeakMap,Xe=Symbol(""),hs=Symbol(""),ti=Symbol("");function Et(t,e,n){if(Xt&&dt){let i=Gi.get(t);i||Gi.set(t,i=new Map);let r=i.get(n);r||(i.set(n,r=new _r),r.map=i,r.key=n),r.track()}}function xe(t,e,n,i,r,s){const o=Gi.get(t);if(!o){Qn++;return}const l=a=>{a&&a.trigger()};if(ho(),e==="clear")o.forEach(l);else{const a=K(t),c=a&&uo(n);if(a&&n==="length"){const u=Number(i);o.forEach((f,d)=>{(d==="length"||d===ti||!De(d)&&d>=u)&&l(f)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),c&&l(o.get(ti)),e){case"add":a?c&&l(o.get("length")):(l(o.get(Xe)),yn(t)&&l(o.get(hs)));break;case"delete":a||(l(o.get(Xe)),yn(t)&&l(o.get(hs)));break;case"set":yn(t)&&l(o.get(Xe));break}}po()}function Of(t,e){const n=Gi.get(t);return n&&n.get(e)}function an(t){const e=rt(t);return e===t?e:(Et(e,"iterate",ti),Zt(t)?e:e.map(It))}function yo(t){return Et(t=rt(t),"iterate",ti),t}const If={__proto__:null,[Symbol.iterator](){return Fr(this,Symbol.iterator,It)},concat(...t){return an(this).concat(...t.map(e=>K(e)?an(e):e))},entries(){return Fr(this,"entries",t=>(t[1]=It(t[1]),t))},every(t,e){return me(this,"every",t,e,void 0,arguments)},filter(t,e){return me(this,"filter",t,e,n=>n.map(It),arguments)},find(t,e){return me(this,"find",t,e,It,arguments)},findIndex(t,e){return me(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return me(this,"findLast",t,e,It,arguments)},findLastIndex(t,e){return me(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return me(this,"forEach",t,e,void 0,arguments)},includes(...t){return Lr(this,"includes",t)},indexOf(...t){return Lr(this,"indexOf",t)},join(t){return an(this).join(t)},lastIndexOf(...t){return Lr(this,"lastIndexOf",t)},map(t,e){return me(this,"map",t,e,void 0,arguments)},pop(){return En(this,"pop")},push(...t){return En(this,"push",t)},reduce(t,...e){return Ko(this,"reduce",t,e)},reduceRight(t,...e){return Ko(this,"reduceRight",t,e)},shift(){return En(this,"shift")},some(t,e){return me(this,"some",t,e,void 0,arguments)},splice(...t){return En(this,"splice",t)},toReversed(){return an(this).toReversed()},toSorted(t){return an(this).toSorted(t)},toSpliced(...t){return an(this).toSpliced(...t)},unshift(...t){return En(this,"unshift",t)},values(){return Fr(this,"values",It)}};function Fr(t,e,n){const i=yo(t),r=i[e]();return i!==t&&!Zt(t)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.value&&(s.value=n(s.value)),s}),r}const Hf=Array.prototype;function me(t,e,n,i,r,s){const o=yo(t),l=o!==t&&!Zt(t),a=o[e];if(a!==Hf[e]){const f=a.apply(t,s);return l?It(f):f}let c=n;o!==t&&(l?c=function(f,d){return n.call(this,It(f),d,t)}:n.length>2&&(c=function(f,d){return n.call(this,f,d,t)}));const u=a.call(o,c,i);return l&&r?r(u):u}function Ko(t,e,n,i){const r=yo(t);let s=n;return r!==t&&(Zt(t)?n.length>3&&(s=function(o,l,a){return n.call(this,o,l,a,t)}):s=function(o,l,a){return n.call(this,o,It(l),a,t)}),r[e](s,...i)}function Lr(t,e,n){const i=rt(t);Et(i,"iterate",ti);const r=i[e](...n);return(r===-1||r===!1)&&_o(n[0])?(n[0]=rt(n[0]),i[e](...n)):r}function En(t,e,n=[]){Be(),ho();const i=rt(t)[e].apply(t,n);return po(),Ve(),i}const Ff=lo("__proto__,__v_isRef,__isVue"),Ea=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(De));function Lf(t){De(t)||(t=String(t));const e=rt(this);return Et(e,"has",t),e.hasOwnProperty(t)}class Ca{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,i){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return s;if(n==="__v_raw")return i===(r?s?qf:Na:s?Ta:Pa).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=K(e);if(!r){let a;if(o&&(a=If[n]))return a;if(n==="hasOwnProperty")return Lf}const l=Reflect.get(e,n,xt(e)?e:i);return(De(n)?Ea.has(n):Ff(n))||(r||Et(e,"get",n),s)?l:xt(l)?o&&uo(n)?l:l.value:yt(l)?r?xr(l):bo(l):l}}class Ma extends Ca{constructor(e=!1){super(!1,e)}set(e,n,i,r){let s=e[n];if(!this._isShallow){const a=nn(s);if(!Zt(i)&&!nn(i)&&(s=rt(s),i=rt(i)),!K(e)&&xt(s)&&!xt(i))return a?!1:(s.value=i,!0)}const o=K(e)&&uo(n)?Number(n)<e.length:st(e,n),l=Reflect.set(e,n,i,xt(e)?e:r);return e===rt(r)&&(o?Ie(i,s)&&xe(e,"set",n,i):xe(e,"add",n,i)),l}deleteProperty(e,n){const i=st(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&i&&xe(e,"delete",n,void 0),r}has(e,n){const i=Reflect.has(e,n);return(!De(n)||!Ea.has(n))&&Et(e,"has",n),i}ownKeys(e){return Et(e,"iterate",K(e)?"length":Xe),Reflect.ownKeys(e)}}class Df extends Ca{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Bf=new Ma,Vf=new Df,Uf=new Ma(!0);const ds=t=>t,vi=t=>Reflect.getPrototypeOf(t);function jf(t,e,n){return function(...i){const r=this.__v_raw,s=rt(r),o=yn(s),l=t==="entries"||t===Symbol.iterator&&o,a=t==="keys"&&o,c=r[t](...i),u=n?ds:e?ps:It;return!e&&Et(s,"iterate",a?hs:Xe),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:l?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function _i(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function zf(t,e){const n={get(r){const s=this.__v_raw,o=rt(s),l=rt(r);t||(Ie(r,l)&&Et(o,"get",r),Et(o,"get",l));const{has:a}=vi(o),c=e?ds:t?ps:It;if(a.call(o,r))return c(s.get(r));if(a.call(o,l))return c(s.get(l));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!t&&Et(rt(r),"iterate",Xe),Reflect.get(r,"size",r)},has(r){const s=this.__v_raw,o=rt(s),l=rt(r);return t||(Ie(r,l)&&Et(o,"has",r),Et(o,"has",l)),r===l?s.has(r):s.has(r)||s.has(l)},forEach(r,s){const o=this,l=o.__v_raw,a=rt(l),c=e?ds:t?ps:It;return!t&&Et(a,"iterate",Xe),l.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Mt(n,t?{add:_i("add"),set:_i("set"),delete:_i("delete"),clear:_i("clear")}:{add(r){!e&&!Zt(r)&&!nn(r)&&(r=rt(r));const s=rt(this);return vi(s).has.call(s,r)||(s.add(r),xe(s,"add",r,r)),this},set(r,s){!e&&!Zt(s)&&!nn(s)&&(s=rt(s));const o=rt(this),{has:l,get:a}=vi(o);let c=l.call(o,r);c||(r=rt(r),c=l.call(o,r));const u=a.call(o,r);return o.set(r,s),c?Ie(s,u)&&xe(o,"set",r,s):xe(o,"add",r,s),this},delete(r){const s=rt(this),{has:o,get:l}=vi(s);let a=o.call(s,r);a||(r=rt(r),a=o.call(s,r)),l&&l.call(s,r);const c=s.delete(r);return a&&xe(s,"delete",r,void 0),c},clear(){const r=rt(this),s=r.size!==0,o=r.clear();return s&&xe(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=jf(r,t,e)}),n}function mo(t,e){const n=zf(t,e);return(i,r,s)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?i:Reflect.get(st(n,r)&&r in i?n:i,r,s)}const Wf={get:mo(!1,!1)},Kf={get:mo(!1,!0)},Gf={get:mo(!0,!1)};const Pa=new WeakMap,Ta=new WeakMap,Na=new WeakMap,qf=new WeakMap;function Jf(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Yf(t){return t.__v_skip||!Object.isExtensible(t)?0:Jf(_f(t))}function bo(t){return nn(t)?t:vo(t,!1,Bf,Wf,Pa)}function Xf(t){return vo(t,!1,Uf,Kf,Ta)}function xr(t){return vo(t,!0,Vf,Gf,Na)}function vo(t,e,n,i,r){if(!yt(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const s=r.get(t);if(s)return s;const o=Yf(t);if(o===0)return t;const l=new Proxy(t,o===2?i:n);return r.set(t,l),l}function Bn(t){return nn(t)?Bn(t.__v_raw):!!(t&&t.__v_isReactive)}function nn(t){return!!(t&&t.__v_isReadonly)}function Zt(t){return!!(t&&t.__v_isShallow)}function _o(t){return t?!!t.__v_raw:!1}function rt(t){const e=t&&t.__v_raw;return e?rt(e):t}function Zf(t){return!st(t,"__v_skip")&&Object.isExtensible(t)&&pa(t,"__v_skip",!0),t}const It=t=>yt(t)?bo(t):t,ps=t=>yt(t)?xr(t):t;function xt(t){return t?t.__v_isRef===!0:!1}function ei(t){return Ra(t,!1)}function Ze(t){return Ra(t,!0)}function Ra(t,e){return xt(t)?t:new Qf(t,e)}class Qf{constructor(e,n){this.dep=new _r,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:rt(e),this._value=n?e:It(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,i=this.__v_isShallow||Zt(e)||nn(e);e=i?e:rt(e),Ie(e,n)&&(this._rawValue=e,this._value=i?e:It(e),this.dep.trigger())}}function Ne(t){return xt(t)?t.value:t}function he(t){return z(t)?t():Ne(t)}const th={get:(t,e,n)=>e==="__v_raw"?t:Ne(Reflect.get(t,e,n)),set:(t,e,n,i)=>{const r=t[e];return xt(r)&&!xt(n)?(r.value=n,!0):Reflect.set(t,e,n,i)}};function Oa(t){return Bn(t)?t:new Proxy(t,th)}class eh{constructor(e){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new _r,{get:i,set:r}=e(n.track.bind(n),n.trigger.bind(n));this._get=i,this._set=r}get value(){return this._value=this._get()}set value(e){this._set(e)}}function nh(t){return new eh(t)}class ih{constructor(e,n,i){this._object=e,this._key=n,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return Of(rt(this._object),this._key)}}class rh{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function sh(t,e,n){return xt(t)?t:z(t)?new rh(t):yt(t)&&arguments.length>1?oh(t,e,n):ei(t)}function oh(t,e,n){const i=t[e];return xt(i)?i:new ih(t,e,n)}class lh{constructor(e,n,i){this.fn=e,this.setter=n,this._value=void 0,this.dep=new _r(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Qn-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&dt!==this)return xa(this,!0),!0}get value(){const e=this.dep.track();return ka(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ah(t,e,n=!1){let i,r;return z(t)?i=t:(i=t.get,r=t.set),new lh(i,r,n)}const xi={},qi=new WeakMap;let Ke;function ch(t,e=!1,n=Ke){if(n){let i=qi.get(n);i||qi.set(n,i=[]),i.push(t)}}function uh(t,e,n=ft){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:l,call:a}=n,c=_=>r?_:Zt(_)||r===!1||r===0?Re(_,1):Re(_);let u,f,d,g,m=!1,w=!1;if(xt(t)?(f=()=>t.value,m=Zt(t)):Bn(t)?(f=()=>c(t),m=!0):K(t)?(w=!0,m=t.some(_=>Bn(_)||Zt(_)),f=()=>t.map(_=>{if(xt(_))return _.value;if(Bn(_))return c(_);if(z(_))return a?a(_,2):_()})):z(t)?e?f=a?()=>a(t,2):t:f=()=>{if(d){Be();try{d()}finally{Ve()}}const _=Ke;Ke=u;try{return a?a(t,3,[g]):t(g)}finally{Ke=_}}:f=fe,e&&r){const _=f,O=r===!0?1/0:r;f=()=>Re(_(),O)}const R=ba(),v=()=>{u.stop(),R&&R.active&&co(R.effects,u)};if(s&&e){const _=e;e=(...O)=>{_(...O),v()}}let I=w?new Array(t.length).fill(xi):xi;const T=_=>{if(!(!(u.flags&1)||!u.dirty&&!_))if(e){const O=u.run();if(r||m||(w?O.some((G,Q)=>Ie(G,I[Q])):Ie(O,I))){d&&d();const G=Ke;Ke=u;try{const Q=[O,I===xi?void 0:w&&I[0]===xi?[]:I,g];a?a(e,3,Q):e(...Q),I=O}finally{Ke=G}}}else u.run()};return l&&l(T),u=new va(f),u.scheduler=o?()=>o(T,!1):T,g=_=>ch(_,!1,u),d=u.onStop=()=>{const _=qi.get(u);if(_){if(a)a(_,4);else for(const O of _)O();qi.delete(u)}},e?i?T(!0):I=u.run():o?o(T.bind(null,!0),!0):u.run(),v.pause=u.pause.bind(u),v.resume=u.resume.bind(u),v.stop=v,v}function Re(t,e=1/0,n){if(e<=0||!yt(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,xt(t))Re(t.value,e,n);else if(K(t))for(let i=0;i<t.length;i++)Re(t[i],e,n);else if(ca(t)||yn(t))t.forEach(i=>{Re(i,e,n)});else if(ha(t)){for(const i in t)Re(t[i],e,n);for(const i of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,i)&&Re(t[i],e,n)}return t}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function pi(t,e,n,i){try{return i?t(...i):t()}catch(r){wr(r,e,n)}}function pe(t,e,n,i){if(z(t)){const r=pi(t,e,n,i);return r&&ua(r)&&r.catch(s=>{wr(s,e,n)}),r}if(K(t)){const r=[];for(let s=0;s<t.length;s++)r.push(pe(t[s],e,n,i));return r}}function wr(t,e,n,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ft;if(e){let l=e.parent;const a=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const u=l.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](t,a,c)===!1)return}l=l.parent}if(s){Be(),pi(s,null,10,[t,a,c]),Ve();return}}fh(t,n,r,i,o)}function fh(t,e,n,i=!0,r=!1){if(r)throw t;console.error(t)}const Ht=[];let ae=-1;const mn=[];let Ce=null,un=0;const Ia=Promise.resolve();let Ji=null;function xo(t){const e=Ji||Ia;return t?e.then(this?t.bind(this):t):e}function hh(t){let e=ae+1,n=Ht.length;for(;e<n;){const i=e+n>>>1,r=Ht[i],s=ni(r);s<t||s===t&&r.flags&2?e=i+1:n=i}return e}function wo(t){if(!(t.flags&1)){const e=ni(t),n=Ht[Ht.length-1];!n||!(t.flags&2)&&e>=ni(n)?Ht.push(t):Ht.splice(hh(e),0,t),t.flags|=1,Ha()}}function Ha(){Ji||(Ji=Ia.then(La))}function dh(t){K(t)?mn.push(...t):Ce&&t.id===-1?Ce.splice(un+1,0,t):t.flags&1||(mn.push(t),t.flags|=1),Ha()}function Go(t,e,n=ae+1){for(;n<Ht.length;n++){const i=Ht[n];if(i&&i.flags&2){if(t&&i.id!==t.uid)continue;Ht.splice(n,1),n--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Fa(t){if(mn.length){const e=[...new Set(mn)].sort((n,i)=>ni(n)-ni(i));if(mn.length=0,Ce){Ce.push(...e);return}for(Ce=e,un=0;un<Ce.length;un++){const n=Ce[un];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Ce=null,un=0}}const ni=t=>t.id==null?t.flags&2?-1:1/0:t.id;function La(t){try{for(ae=0;ae<Ht.length;ae++){const e=Ht[ae];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),pi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ae<Ht.length;ae++){const e=Ht[ae];e&&(e.flags&=-2)}ae=-1,Ht.length=0,Fa(),Ji=null,(Ht.length||mn.length)&&La()}}let Wt=null,Da=null;function Yi(t){const e=Wt;return Wt=t,Da=t&&t.type.__scopeId||null,e}function ph(t,e=Wt,n){if(!e||t._n)return t;const i=(...r)=>{i._d&&nl(-1);const s=Yi(e);let o;try{o=t(...r)}finally{Yi(s),i._d&&nl(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Ue(t,e,n,i){const r=t.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];s&&(l.oldValue=s[o].value);let a=l.dir[i];a&&(Be(),pe(a,n,8,[t.el,l,t,e]),Ve())}}const gh=Symbol("_vte"),yh=t=>t.__isTeleport;function $o(t,e){t.shapeFlag&6&&t.component?(t.transition=e,$o(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function mh(t,e){return z(t)?Mt({name:t.name},e,{setup:t}):t}function Ba(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function bh(t){const e=Er(),n=Ze(null);if(e){const r=e.refs===ft?e.refs={}:e.refs;Object.defineProperty(r,t,{enumerable:!0,get:()=>n.value,set:s=>n.value=s})}return n}function Xi(t,e,n,i,r=!1){if(K(t)){t.forEach((m,w)=>Xi(m,e&&(K(e)?e[w]:e),n,i,r));return}if(Vn(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Xi(t,e,n,i.component.subTree);return}const s=i.shapeFlag&4?Eo(i.component):i.el,o=r?null:s,{i:l,r:a}=t,c=e&&e.r,u=l.refs===ft?l.refs={}:l.refs,f=l.setupState,d=rt(f),g=f===ft?()=>!1:m=>st(d,m);if(c!=null&&c!==a&&(wt(c)?(u[c]=null,g(c)&&(f[c]=null)):xt(c)&&(c.value=null)),z(a))pi(a,l,12,[o,u]);else{const m=wt(a),w=xt(a);if(m||w){const R=()=>{if(t.f){const v=m?g(a)?f[a]:u[a]:a.value;r?K(v)&&co(v,s):K(v)?v.includes(s)||v.push(s):m?(u[a]=[s],g(a)&&(f[a]=u[a])):(a.value=[s],t.k&&(u[t.k]=a.value))}else m?(u[a]=o,g(a)&&(f[a]=o)):w&&(a.value=o,t.k&&(u[t.k]=o))};o?(R.id=-1,Ut(R,n)):R()}}}br().requestIdleCallback;br().cancelIdleCallback;const Vn=t=>!!t.type.__asyncLoader,Va=t=>t.type.__isKeepAlive;function vh(t,e){Ua(t,"a",e)}function _h(t,e){Ua(t,"da",e)}function Ua(t,e,n=kt){const i=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if($r(e,i,n),n){let r=n.parent;for(;r&&r.parent;)Va(r.parent.vnode)&&xh(i,e,n,r),r=r.parent}}function xh(t,e,n,i){const r=$r(e,t,i,!0);ja(()=>{co(i[e],r)},n)}function $r(t,e,n=kt,i=!1){if(n){const r=n[t]||(n[t]=[]),s=e.__weh||(e.__weh=(...o)=>{Be();const l=gi(n),a=pe(e,n,t,o);return l(),Ve(),a});return i?r.unshift(s):r.push(s),s}}const Se=t=>(e,n=kt)=>{(!si||t==="sp")&&$r(t,(...i)=>e(...i),n)},wh=Se("bm"),kr=Se("m"),$h=Se("bu"),kh=Se("u"),Sh=Se("bum"),ja=Se("um"),Ah=Se("sp"),Eh=Se("rtg"),Ch=Se("rtc");function Mh(t,e=kt){$r("ec",t,e)}const Ph=Symbol.for("v-ndc"),gs=t=>t?uc(t)?Eo(t):gs(t.parent):null,Un=Mt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>gs(t.parent),$root:t=>gs(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Wa(t),$forceUpdate:t=>t.f||(t.f=()=>{wo(t.update)}),$nextTick:t=>t.n||(t.n=xo.bind(t.proxy)),$watch:t=>Qh.bind(t)}),Dr=(t,e)=>t!==ft&&!t.__isScriptSetup&&st(t,e),Th={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:i,data:r,props:s,accessCache:o,type:l,appContext:a}=t;let c;if(e[0]!=="$"){const g=o[e];if(g!==void 0)switch(g){case 1:return i[e];case 2:return r[e];case 4:return n[e];case 3:return s[e]}else{if(Dr(i,e))return o[e]=1,i[e];if(r!==ft&&st(r,e))return o[e]=2,r[e];if((c=t.propsOptions[0])&&st(c,e))return o[e]=3,s[e];if(n!==ft&&st(n,e))return o[e]=4,n[e];ys&&(o[e]=0)}}const u=Un[e];let f,d;if(u)return e==="$attrs"&&Et(t.attrs,"get",""),u(t);if((f=l.__cssModules)&&(f=f[e]))return f;if(n!==ft&&st(n,e))return o[e]=4,n[e];if(d=a.config.globalProperties,st(d,e))return d[e]},set({_:t},e,n){const{data:i,setupState:r,ctx:s}=t;return Dr(r,e)?(r[e]=n,!0):i!==ft&&st(i,e)?(i[e]=n,!0):st(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(s[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:i,appContext:r,propsOptions:s}},o){let l;return!!n[o]||t!==ft&&st(t,o)||Dr(e,o)||(l=s[0])&&st(l,o)||st(i,o)||st(Un,o)||st(r.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:st(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function qo(t){return K(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let ys=!0;function Nh(t){const e=Wa(t),n=t.proxy,i=t.ctx;ys=!1,e.beforeCreate&&Jo(e.beforeCreate,t,"bc");const{data:r,computed:s,methods:o,watch:l,provide:a,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:g,updated:m,activated:w,deactivated:R,beforeDestroy:v,beforeUnmount:I,destroyed:T,unmounted:_,render:O,renderTracked:G,renderTriggered:Q,errorCaptured:ot,serverPrefetch:tt,expose:nt,inheritAttrs:A,components:V,directives:C,filters:W}=e;if(c&&Rh(c,i,null),o)for(const J in o){const L=o[J];z(L)&&(i[J]=L.bind(n))}if(r){const J=r.call(n,n);yt(J)&&(t.data=bo(J))}if(ys=!0,s)for(const J in s){const L=s[J],it=z(L)?L.bind(n,n):z(L.get)?L.get.bind(n,n):fe,bt=!z(L)&&z(L.set)?L.set.bind(n):fe,$t=Qt({get:it,set:bt});Object.defineProperty(i,J,{enumerable:!0,configurable:!0,get:()=>$t.value,set:pt=>$t.value=pt})}if(l)for(const J in l)za(l[J],i,n,J);if(a){const J=z(a)?a.call(n):a;Reflect.ownKeys(J).forEach(L=>{Dh(L,J[L])})}u&&Jo(u,t,"c");function ct(J,L){K(L)?L.forEach(it=>J(it.bind(n))):L&&J(L.bind(n))}if(ct(wh,f),ct(kr,d),ct($h,g),ct(kh,m),ct(vh,w),ct(_h,R),ct(Mh,ot),ct(Ch,G),ct(Eh,Q),ct(Sh,I),ct(ja,_),ct(Ah,tt),K(nt))if(nt.length){const J=t.exposed||(t.exposed={});nt.forEach(L=>{Object.defineProperty(J,L,{get:()=>n[L],set:it=>n[L]=it})})}else t.exposed||(t.exposed={});O&&t.render===fe&&(t.render=O),A!=null&&(t.inheritAttrs=A),V&&(t.components=V),C&&(t.directives=C),tt&&Ba(t)}function Rh(t,e,n=fe){K(t)&&(t=ms(t));for(const i in t){const r=t[i];let s;yt(r)?"default"in r?s=jn(r.from||i,r.default,!0):s=jn(r.from||i):s=jn(r),xt(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function Jo(t,e,n){pe(K(t)?t.map(i=>i.bind(e.proxy)):t.bind(e.proxy),e,n)}function za(t,e,n,i){let r=i.includes(".")?sc(n,i):()=>n[i];if(wt(t)){const s=e[t];z(s)&&tn(r,s)}else if(z(t))tn(r,t.bind(n));else if(yt(t))if(K(t))t.forEach(s=>za(s,e,n,i));else{const s=z(t.handler)?t.handler.bind(n):e[t.handler];z(s)&&tn(r,s,t)}}function Wa(t){const e=t.type,{mixins:n,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=t.appContext,l=s.get(e);let a;return l?a=l:!r.length&&!n&&!i?a=e:(a={},r.length&&r.forEach(c=>Zi(a,c,o,!0)),Zi(a,e,o)),yt(e)&&s.set(e,a),a}function Zi(t,e,n,i=!1){const{mixins:r,extends:s}=e;s&&Zi(t,s,n,!0),r&&r.forEach(o=>Zi(t,o,n,!0));for(const o in e)if(!(i&&o==="expose")){const l=Oh[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const Oh={data:Yo,props:Xo,emits:Xo,methods:Nn,computed:Nn,beforeCreate:Nt,created:Nt,beforeMount:Nt,mounted:Nt,beforeUpdate:Nt,updated:Nt,beforeDestroy:Nt,beforeUnmount:Nt,destroyed:Nt,unmounted:Nt,activated:Nt,deactivated:Nt,errorCaptured:Nt,serverPrefetch:Nt,components:Nn,directives:Nn,watch:Hh,provide:Yo,inject:Ih};function Yo(t,e){return e?t?function(){return Mt(z(t)?t.call(this,this):t,z(e)?e.call(this,this):e)}:e:t}function Ih(t,e){return Nn(ms(t),ms(e))}function ms(t){if(K(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function Nt(t,e){return t?[...new Set([].concat(t,e))]:e}function Nn(t,e){return t?Mt(Object.create(null),t,e):e}function Xo(t,e){return t?K(t)&&K(e)?[...new Set([...t,...e])]:Mt(Object.create(null),qo(t),qo(e??{})):e}function Hh(t,e){if(!t)return e;if(!e)return t;const n=Mt(Object.create(null),t);for(const i in e)n[i]=Nt(t[i],e[i]);return n}function Ka(){return{app:null,config:{isNativeTag:bf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Fh=0;function Lh(t,e){return function(i,r=null){z(i)||(i=Mt({},i)),r!=null&&!yt(r)&&(r=null);const s=Ka(),o=new WeakSet,l=[];let a=!1;const c=s.app={_uid:Fh++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:kd,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&z(u.install)?(o.add(u),u.install(c,...f)):z(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!a){const g=c._ceVNode||He(i,r);return g.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),t(g,u,d),a=!0,c._container=u,u.__vue_app__=c,Eo(g.component)}},onUnmount(u){l.push(u)},unmount(){a&&(pe(l,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Qe;Qe=c;try{return u()}finally{Qe=f}}};return c}}let Qe=null;function Dh(t,e){if(kt){let n=kt.provides;const i=kt.parent&&kt.parent.provides;i===n&&(n=kt.provides=Object.create(i)),n[t]=e}}function jn(t,e,n=!1){const i=kt||Wt;if(i||Qe){const r=Qe?Qe._context.provides:i?i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&z(e)?e.call(i&&i.proxy):e}}function Ga(){return!!(kt||Wt||Qe)}const qa={},Ja=()=>Object.create(qa),Ya=t=>Object.getPrototypeOf(t)===qa;function Bh(t,e,n,i=!1){const r={},s=Ja();t.propsDefaults=Object.create(null),Xa(t,e,r,s);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=i?r:Xf(r):t.type.props?t.props=r:t.props=s,t.attrs=s}function Vh(t,e,n,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=t,l=rt(r),[a]=t.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Sr(t.emitsOptions,d))continue;const g=e[d];if(a)if(st(s,d))g!==s[d]&&(s[d]=g,c=!0);else{const m=Le(d);r[m]=bs(a,l,m,g,t,!1)}else g!==s[d]&&(s[d]=g,c=!0)}}}else{Xa(t,e,r,s)&&(c=!0);let u;for(const f in l)(!e||!st(e,f)&&((u=ln(f))===f||!st(e,u)))&&(a?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=bs(a,l,f,void 0,t,!0)):delete r[f]);if(s!==l)for(const f in s)(!e||!st(e,f))&&(delete s[f],c=!0)}c&&xe(t.attrs,"set","")}function Xa(t,e,n,i){const[r,s]=t.propsOptions;let o=!1,l;if(e)for(let a in e){if(Fn(a))continue;const c=e[a];let u;r&&st(r,u=Le(a))?!s||!s.includes(u)?n[u]=c:(l||(l={}))[u]=c:Sr(t.emitsOptions,a)||(!(a in i)||c!==i[a])&&(i[a]=c,o=!0)}if(s){const a=rt(n),c=l||ft;for(let u=0;u<s.length;u++){const f=s[u];n[f]=bs(r,a,f,c[f],t,!st(c,f))}}return o}function bs(t,e,n,i,r,s){const o=t[n];if(o!=null){const l=st(o,"default");if(l&&i===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&z(a)){const{propsDefaults:c}=r;if(n in c)i=c[n];else{const u=gi(r);i=c[n]=a.call(null,e),u()}}else i=a;r.ce&&r.ce._setProp(n,i)}o[0]&&(s&&!l?i=!1:o[1]&&(i===""||i===ln(n))&&(i=!0))}return i}const Uh=new WeakMap;function Za(t,e,n=!1){const i=n?Uh:e.propsCache,r=i.get(t);if(r)return r;const s=t.props,o={},l=[];let a=!1;if(!z(t)){const u=f=>{a=!0;const[d,g]=Za(f,e,!0);Mt(o,d),g&&l.push(...g)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!s&&!a)return yt(t)&&i.set(t,gn),gn;if(K(s))for(let u=0;u<s.length;u++){const f=Le(s[u]);Zo(f)&&(o[f]=ft)}else if(s)for(const u in s){const f=Le(u);if(Zo(f)){const d=s[u],g=o[f]=K(d)||z(d)?{type:d}:Mt({},d),m=g.type;let w=!1,R=!0;if(K(m))for(let v=0;v<m.length;++v){const I=m[v],T=z(I)&&I.name;if(T==="Boolean"){w=!0;break}else T==="String"&&(R=!1)}else w=z(m)&&m.name==="Boolean";g[0]=w,g[1]=R,(w||st(g,"default"))&&l.push(f)}}const c=[o,l];return yt(t)&&i.set(t,c),c}function Zo(t){return t[0]!=="$"&&!Fn(t)}const Qa=t=>t[0]==="_"||t==="$stable",ko=t=>K(t)?t.map(ce):[ce(t)],jh=(t,e,n)=>{if(e._n)return e;const i=ph((...r)=>ko(e(...r)),n);return i._c=!1,i},tc=(t,e,n)=>{const i=t._ctx;for(const r in t){if(Qa(r))continue;const s=t[r];if(z(s))e[r]=jh(r,s,i);else if(s!=null){const o=ko(s);e[r]=()=>o}}},ec=(t,e)=>{const n=ko(e);t.slots.default=()=>n},nc=(t,e,n)=>{for(const i in e)(n||i!=="_")&&(t[i]=e[i])},zh=(t,e,n)=>{const i=t.slots=Ja();if(t.vnode.shapeFlag&32){const r=e._;r?(nc(i,e,n),n&&pa(i,"_",r,!0)):tc(e,i)}else e&&ec(t,e)},Wh=(t,e,n)=>{const{vnode:i,slots:r}=t;let s=!0,o=ft;if(i.shapeFlag&32){const l=e._;l?n&&l===1?s=!1:nc(r,e,n):(s=!e.$stable,tc(e,r)),o=e}else e&&(ec(t,e),o={default:1});if(s)for(const l in r)!Qa(l)&&o[l]==null&&delete r[l]},Ut=od;function Kh(t){return Gh(t)}function Gh(t,e){const n=br();n.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:l,createComment:a,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:g=fe,insertStaticContent:m}=t,w=(h,p,y,k=null,x=null,$=null,H=void 0,M=null,E=!!p.dynamicChildren)=>{if(h===p)return;h&&!Cn(h,p)&&(k=ee(h),pt(h,x,$,!0),h=null),p.patchFlag===-2&&(E=!1,p.dynamicChildren=null);const{type:S,ref:U,shapeFlag:F}=p;switch(S){case Ar:R(h,p,y,k);break;case ii:v(h,p,y,k);break;case Ni:h==null&&I(p,y,k,H);break;case _e:V(h,p,y,k,x,$,H,M,E);break;default:F&1?O(h,p,y,k,x,$,H,M,E):F&6?C(h,p,y,k,x,$,H,M,E):(F&64||F&128)&&S.process(h,p,y,k,x,$,H,M,E,Y)}U!=null&&x&&Xi(U,h&&h.ref,$,p||h,!p)},R=(h,p,y,k)=>{if(h==null)i(p.el=l(p.children),y,k);else{const x=p.el=h.el;p.children!==h.children&&c(x,p.children)}},v=(h,p,y,k)=>{h==null?i(p.el=a(p.children||""),y,k):p.el=h.el},I=(h,p,y,k)=>{[h.el,h.anchor]=m(h.children,p,y,k,h.el,h.anchor)},T=({el:h,anchor:p},y,k)=>{let x;for(;h&&h!==p;)x=d(h),i(h,y,k),h=x;i(p,y,k)},_=({el:h,anchor:p})=>{let y;for(;h&&h!==p;)y=d(h),r(h),h=y;r(p)},O=(h,p,y,k,x,$,H,M,E)=>{p.type==="svg"?H="svg":p.type==="math"&&(H="mathml"),h==null?G(p,y,k,x,$,H,M,E):tt(h,p,x,$,H,M,E)},G=(h,p,y,k,x,$,H,M)=>{let E,S;const{props:U,shapeFlag:F,transition:D,dirs:j}=h;if(E=h.el=o(h.type,$,U&&U.is,U),F&8?u(E,h.children):F&16&&ot(h.children,E,null,k,x,Br(h,$),H,M),j&&Ue(h,null,k,"created"),Q(E,h,h.scopeId,H,k),U){for(const ht in U)ht!=="value"&&!Fn(ht)&&s(E,ht,null,U[ht],$,k);"value"in U&&s(E,"value",null,U.value,$),(S=U.onVnodeBeforeMount)&&se(S,k,h)}j&&Ue(h,null,k,"beforeMount");const et=qh(x,D);et&&D.beforeEnter(E),i(E,p,y),((S=U&&U.onVnodeMounted)||et||j)&&Ut(()=>{S&&se(S,k,h),et&&D.enter(E),j&&Ue(h,null,k,"mounted")},x)},Q=(h,p,y,k,x)=>{if(y&&g(h,y),k)for(let $=0;$<k.length;$++)g(h,k[$]);if(x){let $=x.subTree;if(p===$||lc($.type)&&($.ssContent===p||$.ssFallback===p)){const H=x.vnode;Q(h,H,H.scopeId,H.slotScopeIds,x.parent)}}},ot=(h,p,y,k,x,$,H,M,E=0)=>{for(let S=E;S<h.length;S++){const U=h[S]=M?Me(h[S]):ce(h[S]);w(null,U,p,y,k,x,$,H,M)}},tt=(h,p,y,k,x,$,H)=>{const M=p.el=h.el;let{patchFlag:E,dynamicChildren:S,dirs:U}=p;E|=h.patchFlag&16;const F=h.props||ft,D=p.props||ft;let j;if(y&&je(y,!1),(j=D.onVnodeBeforeUpdate)&&se(j,y,p,h),U&&Ue(p,h,y,"beforeUpdate"),y&&je(y,!0),(F.innerHTML&&D.innerHTML==null||F.textContent&&D.textContent==null)&&u(M,""),S?nt(h.dynamicChildren,S,M,y,k,Br(p,x),$):H||L(h,p,M,null,y,k,Br(p,x),$,!1),E>0){if(E&16)A(M,F,D,y,x);else if(E&2&&F.class!==D.class&&s(M,"class",null,D.class,x),E&4&&s(M,"style",F.style,D.style,x),E&8){const et=p.dynamicProps;for(let ht=0;ht<et.length;ht++){const lt=et[ht],Bt=F[lt],Ft=D[lt];(Ft!==Bt||lt==="value")&&s(M,lt,Bt,Ft,x,y)}}E&1&&h.children!==p.children&&u(M,p.children)}else!H&&S==null&&A(M,F,D,y,x);((j=D.onVnodeUpdated)||U)&&Ut(()=>{j&&se(j,y,p,h),U&&Ue(p,h,y,"updated")},k)},nt=(h,p,y,k,x,$,H)=>{for(let M=0;M<p.length;M++){const E=h[M],S=p[M],U=E.el&&(E.type===_e||!Cn(E,S)||E.shapeFlag&70)?f(E.el):y;w(E,S,U,null,k,x,$,H,!0)}},A=(h,p,y,k,x)=>{if(p!==y){if(p!==ft)for(const $ in p)!Fn($)&&!($ in y)&&s(h,$,p[$],null,x,k);for(const $ in y){if(Fn($))continue;const H=y[$],M=p[$];H!==M&&$!=="value"&&s(h,$,M,H,x,k)}"value"in y&&s(h,"value",p.value,y.value,x)}},V=(h,p,y,k,x,$,H,M,E)=>{const S=p.el=h?h.el:l(""),U=p.anchor=h?h.anchor:l("");let{patchFlag:F,dynamicChildren:D,slotScopeIds:j}=p;j&&(M=M?M.concat(j):j),h==null?(i(S,y,k),i(U,y,k),ot(p.children||[],y,U,x,$,H,M,E)):F>0&&F&64&&D&&h.dynamicChildren?(nt(h.dynamicChildren,D,y,x,$,H,M),(p.key!=null||x&&p===x.subTree)&&ic(h,p,!0)):L(h,p,y,U,x,$,H,M,E)},C=(h,p,y,k,x,$,H,M,E)=>{p.slotScopeIds=M,h==null?p.shapeFlag&512?x.ctx.activate(p,y,k,H,E):W(p,y,k,x,$,H,E):Pt(h,p,E)},W=(h,p,y,k,x,$,H)=>{const M=h.component=bd(h,k,x);if(Va(h)&&(M.ctx.renderer=Y),vd(M,!1,H),M.asyncDep){if(x&&x.registerDep(M,ct,H),!h.el){const E=M.subTree=He(ii);v(null,E,p,y)}}else ct(M,h,p,y,x,$,H)},Pt=(h,p,y)=>{const k=p.component=h.component;if(rd(h,p,y))if(k.asyncDep&&!k.asyncResolved){J(k,p,y);return}else k.next=p,k.update();else p.el=h.el,k.vnode=p},ct=(h,p,y,k,x,$,H)=>{const M=()=>{if(h.isMounted){let{next:F,bu:D,u:j,parent:et,vnode:ht}=h;{const ie=rc(h);if(ie){F&&(F.el=ht.el,J(h,F,H)),ie.asyncDep.then(()=>{h.isUnmounted||M()});return}}let lt=F,Bt;je(h,!1),F?(F.el=ht.el,J(h,F,H)):F=ht,D&&Or(D),(Bt=F.props&&F.props.onVnodeBeforeUpdate)&&se(Bt,et,F,ht),je(h,!0);const Ft=tl(h),ne=h.subTree;h.subTree=Ft,w(ne,Ft,f(ne.el),ee(ne),h,x,$),F.el=Ft.el,lt===null&&sd(h,Ft.el),j&&Ut(j,x),(Bt=F.props&&F.props.onVnodeUpdated)&&Ut(()=>se(Bt,et,F,ht),x)}else{let F;const{el:D,props:j}=p,{bm:et,m:ht,parent:lt,root:Bt,type:Ft}=h,ne=Vn(p);je(h,!1),et&&Or(et),!ne&&(F=j&&j.onVnodeBeforeMount)&&se(F,lt,p),je(h,!0);{Bt.ce&&Bt.ce._injectChildStyle(Ft);const ie=h.subTree=tl(h);w(null,ie,y,k,h,x,$),p.el=ie.el}if(ht&&Ut(ht,x),!ne&&(F=j&&j.onVnodeMounted)){const ie=p;Ut(()=>se(F,lt,ie),x)}(p.shapeFlag&256||lt&&Vn(lt.vnode)&&lt.vnode.shapeFlag&256)&&h.a&&Ut(h.a,x),h.isMounted=!0,p=y=k=null}};h.scope.on();const E=h.effect=new va(M);h.scope.off();const S=h.update=E.run.bind(E),U=h.job=E.runIfDirty.bind(E);U.i=h,U.id=h.uid,E.scheduler=()=>wo(U),je(h,!0),S()},J=(h,p,y)=>{p.component=h;const k=h.vnode.props;h.vnode=p,h.next=null,Vh(h,p.props,k,y),Wh(h,p.children,y),Be(),Go(h),Ve()},L=(h,p,y,k,x,$,H,M,E=!1)=>{const S=h&&h.children,U=h?h.shapeFlag:0,F=p.children,{patchFlag:D,shapeFlag:j}=p;if(D>0){if(D&128){bt(S,F,y,k,x,$,H,M,E);return}else if(D&256){it(S,F,y,k,x,$,H,M,E);return}}j&8?(U&16&&Gt(S,x,$),F!==S&&u(y,F)):U&16?j&16?bt(S,F,y,k,x,$,H,M,E):Gt(S,x,$,!0):(U&8&&u(y,""),j&16&&ot(F,y,k,x,$,H,M,E))},it=(h,p,y,k,x,$,H,M,E)=>{h=h||gn,p=p||gn;const S=h.length,U=p.length,F=Math.min(S,U);let D;for(D=0;D<F;D++){const j=p[D]=E?Me(p[D]):ce(p[D]);w(h[D],j,y,null,x,$,H,M,E)}S>U?Gt(h,x,$,!0,!1,F):ot(p,y,k,x,$,H,M,E,F)},bt=(h,p,y,k,x,$,H,M,E)=>{let S=0;const U=p.length;let F=h.length-1,D=U-1;for(;S<=F&&S<=D;){const j=h[S],et=p[S]=E?Me(p[S]):ce(p[S]);if(Cn(j,et))w(j,et,y,null,x,$,H,M,E);else break;S++}for(;S<=F&&S<=D;){const j=h[F],et=p[D]=E?Me(p[D]):ce(p[D]);if(Cn(j,et))w(j,et,y,null,x,$,H,M,E);else break;F--,D--}if(S>F){if(S<=D){const j=D+1,et=j<U?p[j].el:k;for(;S<=D;)w(null,p[S]=E?Me(p[S]):ce(p[S]),y,et,x,$,H,M,E),S++}}else if(S>D)for(;S<=F;)pt(h[S],x,$,!0),S++;else{const j=S,et=S,ht=new Map;for(S=et;S<=D;S++){const Vt=p[S]=E?Me(p[S]):ce(p[S]);Vt.key!=null&&ht.set(Vt.key,S)}let lt,Bt=0;const Ft=D-et+1;let ne=!1,ie=0;const An=new Array(Ft);for(S=0;S<Ft;S++)An[S]=0;for(S=j;S<=F;S++){const Vt=h[S];if(Bt>=Ft){pt(Vt,x,$,!0);continue}let re;if(Vt.key!=null)re=ht.get(Vt.key);else for(lt=et;lt<=D;lt++)if(An[lt-et]===0&&Cn(Vt,p[lt])){re=lt;break}re===void 0?pt(Vt,x,$,!0):(An[re-et]=S+1,re>=ie?ie=re:ne=!0,w(Vt,p[re],y,null,x,$,H,M,E),Bt++)}const Uo=ne?Jh(An):gn;for(lt=Uo.length-1,S=Ft-1;S>=0;S--){const Vt=et+S,re=p[Vt],jo=Vt+1<U?p[Vt+1].el:k;An[S]===0?w(null,re,y,jo,x,$,H,M,E):ne&&(lt<0||S!==Uo[lt]?$t(re,y,jo,2):lt--)}}},$t=(h,p,y,k,x=null)=>{const{el:$,type:H,transition:M,children:E,shapeFlag:S}=h;if(S&6){$t(h.component.subTree,p,y,k);return}if(S&128){h.suspense.move(p,y,k);return}if(S&64){H.move(h,p,y,Y);return}if(H===_e){i($,p,y);for(let F=0;F<E.length;F++)$t(E[F],p,y,k);i(h.anchor,p,y);return}if(H===Ni){T(h,p,y);return}if(k!==2&&S&1&&M)if(k===0)M.beforeEnter($),i($,p,y),Ut(()=>M.enter($),x);else{const{leave:F,delayLeave:D,afterLeave:j}=M,et=()=>i($,p,y),ht=()=>{F($,()=>{et(),j&&j()})};D?D($,et,ht):ht()}else i($,p,y)},pt=(h,p,y,k=!1,x=!1)=>{const{type:$,props:H,ref:M,children:E,dynamicChildren:S,shapeFlag:U,patchFlag:F,dirs:D,cacheIndex:j}=h;if(F===-2&&(x=!1),M!=null&&Xi(M,null,y,h,!0),j!=null&&(p.renderCache[j]=void 0),U&256){p.ctx.deactivate(h);return}const et=U&1&&D,ht=!Vn(h);let lt;if(ht&&(lt=H&&H.onVnodeBeforeUnmount)&&se(lt,p,h),U&6)Tt(h.component,y,k);else{if(U&128){h.suspense.unmount(y,k);return}et&&Ue(h,null,p,"beforeUnmount"),U&64?h.type.remove(h,p,y,Y,k):S&&!S.hasOnce&&($!==_e||F>0&&F&64)?Gt(S,p,y,!1,!0):($===_e&&F&384||!x&&U&16)&&Gt(E,p,y),k&&Ae(h)}(ht&&(lt=H&&H.onVnodeUnmounted)||et)&&Ut(()=>{lt&&se(lt,p,h),et&&Ue(h,null,p,"unmounted")},y)},Ae=h=>{const{type:p,el:y,anchor:k,transition:x}=h;if(p===_e){Ee(y,k);return}if(p===Ni){_(h);return}const $=()=>{r(y),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(h.shapeFlag&1&&x&&!x.persisted){const{leave:H,delayLeave:M}=x,E=()=>H(y,$);M?M(h.el,$,E):E()}else $()},Ee=(h,p)=>{let y;for(;h!==p;)y=d(h),r(h),h=y;r(p)},Tt=(h,p,y)=>{const{bum:k,scope:x,job:$,subTree:H,um:M,m:E,a:S}=h;Qo(E),Qo(S),k&&Or(k),x.stop(),$&&($.flags|=8,pt(H,h,p,y)),M&&Ut(M,p),Ut(()=>{h.isUnmounted=!0},p),p&&p.pendingBranch&&!p.isUnmounted&&h.asyncDep&&!h.asyncResolved&&h.suspenseId===p.pendingId&&(p.deps--,p.deps===0&&p.resolve())},Gt=(h,p,y,k=!1,x=!1,$=0)=>{for(let H=$;H<h.length;H++)pt(h[H],p,y,k,x)},ee=h=>{if(h.shapeFlag&6)return ee(h.component.subTree);if(h.shapeFlag&128)return h.suspense.next();const p=d(h.anchor||h.el),y=p&&p[gh];return y?d(y):p};let ye=!1;const q=(h,p,y)=>{h==null?p._vnode&&pt(p._vnode,null,null,!0):w(p._vnode||null,h,p,null,null,null,y),p._vnode=h,ye||(ye=!0,Go(),Fa(),ye=!1)},Y={p:w,um:pt,m:$t,r:Ae,mt:W,mc:ot,pc:L,pbc:nt,n:ee,o:t};return{render:q,hydrate:void 0,createApp:Lh(q)}}function Br({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function je({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function qh(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function ic(t,e,n=!1){const i=t.children,r=e.children;if(K(i)&&K(r))for(let s=0;s<i.length;s++){const o=i[s];let l=r[s];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[s]=Me(r[s]),l.el=o.el),!n&&l.patchFlag!==-2&&ic(o,l)),l.type===Ar&&(l.el=o.el)}}function Jh(t){const e=t.slice(),n=[0];let i,r,s,o,l;const a=t.length;for(i=0;i<a;i++){const c=t[i];if(c!==0){if(r=n[n.length-1],t[r]<c){e[i]=r,n.push(i);continue}for(s=0,o=n.length-1;s<o;)l=s+o>>1,t[n[l]]<c?s=l+1:o=l;c<t[n[s]]&&(s>0&&(e[i]=n[s-1]),n[s]=i)}}for(s=n.length,o=n[s-1];s-- >0;)n[s]=o,o=e[o];return n}function rc(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:rc(e)}function Qo(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Yh=Symbol.for("v-scx"),Xh=()=>jn(Yh);function Zh(t,e){return So(t,null,e)}function tn(t,e,n){return So(t,e,n)}function So(t,e,n=ft){const{immediate:i,deep:r,flush:s,once:o}=n,l=Mt({},n),a=e&&i||!e&&s!=="post";let c;if(si){if(s==="sync"){const g=Xh();c=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=fe,g.resume=fe,g.pause=fe,g}}const u=kt;l.call=(g,m,w)=>pe(g,u,m,w);let f=!1;s==="post"?l.scheduler=g=>{Ut(g,u&&u.suspense)}:s!=="sync"&&(f=!0,l.scheduler=(g,m)=>{m?g():wo(g)}),l.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,u&&(g.id=u.uid,g.i=u))};const d=uh(t,e,l);return si&&(c?c.push(d):a&&d()),d}function Qh(t,e,n){const i=this.proxy,r=wt(t)?t.includes(".")?sc(i,t):()=>i[t]:t.bind(i,i);let s;z(e)?s=e:(s=e.handler,n=e);const o=gi(this),l=So(r,s.bind(i),n);return o(),l}function sc(t,e){const n=e.split(".");return()=>{let i=t;for(let r=0;r<n.length&&i;r++)i=i[n[r]];return i}}const td=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Le(e)}Modifiers`]||t[`${ln(e)}Modifiers`];function ed(t,e,...n){if(t.isUnmounted)return;const i=t.vnode.props||ft;let r=n;const s=e.startsWith("update:"),o=s&&td(i,e.slice(7));o&&(o.trim&&(r=n.map(u=>wt(u)?u.trim():u)),o.number&&(r=n.map($f)));let l,a=i[l=Rr(e)]||i[l=Rr(Le(e))];!a&&s&&(a=i[l=Rr(ln(e))]),a&&pe(a,t,6,r);const c=i[l+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,pe(c,t,6,r)}}function oc(t,e,n=!1){const i=e.emitsCache,r=i.get(t);if(r!==void 0)return r;const s=t.emits;let o={},l=!1;if(!z(t)){const a=c=>{const u=oc(c,e,!0);u&&(l=!0,Mt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(a),t.extends&&a(t.extends),t.mixins&&t.mixins.forEach(a)}return!s&&!l?(yt(t)&&i.set(t,null),null):(K(s)?s.forEach(a=>o[a]=null):Mt(o,s),yt(t)&&i.set(t,o),o)}function Sr(t,e){return!t||!gr(e)?!1:(e=e.slice(2).replace(/Once$/,""),st(t,e[0].toLowerCase()+e.slice(1))||st(t,ln(e))||st(t,e))}function tl(t){const{type:e,vnode:n,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:l,emit:a,render:c,renderCache:u,props:f,data:d,setupState:g,ctx:m,inheritAttrs:w}=t,R=Yi(t);let v,I;try{if(n.shapeFlag&4){const _=r||i,O=_;v=ce(c.call(O,_,u,f,g,d,m)),I=l}else{const _=e;v=ce(_.length>1?_(f,{attrs:l,slots:o,emit:a}):_(f,null)),I=e.props?l:nd(l)}}catch(_){zn.length=0,wr(_,t,1),v=He(ii)}let T=v;if(I&&w!==!1){const _=Object.keys(I),{shapeFlag:O}=T;_.length&&O&7&&(s&&_.some(ao)&&(I=id(I,s)),T=xn(T,I,!1,!0))}return n.dirs&&(T=xn(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(n.dirs):n.dirs),n.transition&&$o(T,n.transition),v=T,Yi(R),v}const nd=t=>{let e;for(const n in t)(n==="class"||n==="style"||gr(n))&&((e||(e={}))[n]=t[n]);return e},id=(t,e)=>{const n={};for(const i in t)(!ao(i)||!(i.slice(9)in e))&&(n[i]=t[i]);return n};function rd(t,e,n){const{props:i,children:r,component:s}=t,{props:o,children:l,patchFlag:a}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return i?el(i,o,c):!!o;if(a&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==i[d]&&!Sr(c,d))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:i===o?!1:i?o?el(i,o,c):!0:!!o;return!1}function el(t,e,n){const i=Object.keys(e);if(i.length!==Object.keys(t).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==t[s]&&!Sr(n,s))return!0}return!1}function sd({vnode:t,parent:e},n){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===t&&(i.el=t.el),i===t)(t=e.vnode).el=n,e=e.parent;else break}}const lc=t=>t.__isSuspense;function od(t,e){e&&e.pendingBranch?K(t)?e.effects.push(...t):e.effects.push(t):dh(t)}const _e=Symbol.for("v-fgt"),Ar=Symbol.for("v-txt"),ii=Symbol.for("v-cmt"),Ni=Symbol.for("v-stc"),zn=[];let jt=null;function ld(t=!1){zn.push(jt=t?null:[])}function ad(){zn.pop(),jt=zn[zn.length-1]||null}let ri=1;function nl(t,e=!1){ri+=t,t<0&&jt&&e&&(jt.hasOnce=!0)}function cd(t){return t.dynamicChildren=ri>0?jt||gn:null,ad(),ri>0&&jt&&jt.push(t),t}function ud(t,e,n,i,r,s){return cd(qt(t,e,n,i,r,s,!0))}function ac(t){return t?t.__v_isVNode===!0:!1}function Cn(t,e){return t.type===e.type&&t.key===e.key}const cc=({key:t})=>t??null,Ri=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?wt(t)||xt(t)||z(t)?{i:Wt,r:t,k:e,f:!!n}:t:null);function qt(t,e=null,n=null,i=0,r=null,s=t===_e?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&cc(e),ref:e&&Ri(e),scopeId:Da,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Wt};return l?(Ao(a,n),s&128&&t.normalize(a)):n&&(a.shapeFlag|=wt(n)?8:16),ri>0&&!o&&jt&&(a.patchFlag>0||s&6)&&a.patchFlag!==32&&jt.push(a),a}const He=fd;function fd(t,e=null,n=null,i=0,r=null,s=!1){if((!t||t===Ph)&&(t=ii),ac(t)){const l=xn(t,e,!0);return n&&Ao(l,n),ri>0&&!s&&jt&&(l.shapeFlag&6?jt[jt.indexOf(t)]=l:jt.push(l)),l.patchFlag=-2,l}if($d(t)&&(t=t.__vccOpts),e){e=hd(e);let{class:l,style:a}=e;l&&!wt(l)&&(e.class=fo(l)),yt(a)&&(_o(a)&&!K(a)&&(a=Mt({},a)),e.style=vr(a))}const o=wt(t)?1:lc(t)?128:yh(t)?64:yt(t)?4:z(t)?2:0;return qt(t,e,n,i,r,o,s,!0)}function hd(t){return t?_o(t)||Ya(t)?Mt({},t):t:null}function xn(t,e,n=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:l,transition:a}=t,c=e?gd(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&cc(c),ref:e&&e.ref?n&&s?K(s)?s.concat(Ri(e)):[s,Ri(e)]:Ri(e):s,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==_e?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:a,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&xn(t.ssContent),ssFallback:t.ssFallback&&xn(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return a&&i&&$o(u,a.clone(u)),u}function dd(t=" ",e=0){return He(Ar,null,t,e)}function pd(t,e){const n=He(Ni,null,t);return n.staticCount=e,n}function ce(t){return t==null||typeof t=="boolean"?He(ii):K(t)?He(_e,null,t.slice()):ac(t)?Me(t):He(Ar,null,String(t))}function Me(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:xn(t)}function Ao(t,e){let n=0;const{shapeFlag:i}=t;if(e==null)e=null;else if(K(e))n=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Ao(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Ya(e)?e._ctx=Wt:r===3&&Wt&&(Wt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else z(e)?(e={default:e,_ctx:Wt},n=32):(e=String(e),i&64?(n=16,e=[dd(e)]):n=8);t.children=e,t.shapeFlag|=n}function gd(...t){const e={};for(let n=0;n<t.length;n++){const i=t[n];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=fo([e.class,i.class]));else if(r==="style")e.style=vr([e.style,i.style]);else if(gr(r)){const s=e[r],o=i[r];o&&s!==o&&!(K(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function se(t,e,n,i=null){pe(t,e,7,[n,i])}const yd=Ka();let md=0;function bd(t,e,n){const i=t.type,r=(e?e.appContext:t.appContext)||yd,s={uid:md++,vnode:t,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Pf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Za(i,r),emitsOptions:oc(i,r),emit:null,emitted:null,propsDefaults:ft,inheritAttrs:i.inheritAttrs,ctx:ft,data:ft,props:ft,attrs:ft,slots:ft,refs:ft,setupState:ft,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=ed.bind(null,s),t.ce&&t.ce(s),s}let kt=null;const Er=()=>kt||Wt;let Qi,vs;{const t=br(),e=(n,i)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Qi=e("__VUE_INSTANCE_SETTERS__",n=>kt=n),vs=e("__VUE_SSR_SETTERS__",n=>si=n)}const gi=t=>{const e=kt;return Qi(t),t.scope.on(),()=>{t.scope.off(),Qi(e)}},il=()=>{kt&&kt.scope.off(),Qi(null)};function uc(t){return t.vnode.shapeFlag&4}let si=!1;function vd(t,e=!1,n=!1){e&&vs(e);const{props:i,children:r}=t.vnode,s=uc(t);Bh(t,i,s,e),zh(t,r,n);const o=s?_d(t,e):void 0;return e&&vs(!1),o}function _d(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Th);const{setup:i}=n;if(i){Be();const r=t.setupContext=i.length>1?wd(t):null,s=gi(t),o=pi(i,t,0,[t.props,r]),l=ua(o);if(Ve(),s(),(l||t.sp)&&!Vn(t)&&Ba(t),l){if(o.then(il,il),e)return o.then(a=>{rl(t,a)}).catch(a=>{wr(a,t,0)});t.asyncDep=o}else rl(t,o)}else fc(t)}function rl(t,e,n){z(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:yt(e)&&(t.setupState=Oa(e)),fc(t)}function fc(t,e,n){const i=t.type;t.render||(t.render=i.render||fe);{const r=gi(t);Be();try{Nh(t)}finally{Ve(),r()}}}const xd={get(t,e){return Et(t,"get",""),t[e]}};function wd(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,xd),slots:t.slots,emit:t.emit,expose:e}}function Eo(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Oa(Zf(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Un)return Un[n](t)},has(e,n){return n in e||n in Un}})):t.proxy}function $d(t){return z(t)&&"__vccOpts"in t}const Qt=(t,e)=>ah(t,e,si),kd="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _s;const sl=typeof window<"u"&&window.trustedTypes;if(sl)try{_s=sl.createPolicy("vue",{createHTML:t=>t})}catch{}const hc=_s?t=>_s.createHTML(t):t=>t,Sd="http://www.w3.org/2000/svg",Ad="http://www.w3.org/1998/Math/MathML",ve=typeof document<"u"?document:null,ol=ve&&ve.createElement("template"),Ed={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,i)=>{const r=e==="svg"?ve.createElementNS(Sd,t):e==="mathml"?ve.createElementNS(Ad,t):n?ve.createElement(t,{is:n}):ve.createElement(t);return t==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:t=>ve.createTextNode(t),createComment:t=>ve.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>ve.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,i,r,s){const o=n?n.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{ol.innerHTML=hc(i==="svg"?`<svg>${t}</svg>`:i==="mathml"?`<math>${t}</math>`:t);const l=ol.content;if(i==="svg"||i==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Cd=Symbol("_vtc");function Md(t,e,n){const i=t[Cd];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const ll=Symbol("_vod"),Pd=Symbol("_vsh"),Td=Symbol(""),Nd=/(^|;)\s*display\s*:/;function Rd(t,e,n){const i=t.style,r=wt(n);let s=!1;if(n&&!r){if(e)if(wt(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Oi(i,l,"")}else for(const o in e)n[o]==null&&Oi(i,o,"");for(const o in n)o==="display"&&(s=!0),Oi(i,o,n[o])}else if(r){if(e!==n){const o=i[Td];o&&(n+=";"+o),i.cssText=n,s=Nd.test(n)}}else e&&t.removeAttribute("style");ll in t&&(t[ll]=s?i.display:"",t[Pd]&&(i.display="none"))}const al=/\s*!important$/;function Oi(t,e,n){if(K(n))n.forEach(i=>Oi(t,e,i));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const i=Od(t,e);al.test(n)?t.setProperty(ln(i),n.replace(al,""),"important"):t[i]=n}}const cl=["Webkit","Moz","ms"],Vr={};function Od(t,e){const n=Vr[e];if(n)return n;let i=Le(e);if(i!=="filter"&&i in t)return Vr[e]=i;i=da(i);for(let r=0;r<cl.length;r++){const s=cl[r]+i;if(s in t)return Vr[e]=s}return e}const ul="http://www.w3.org/1999/xlink";function fl(t,e,n,i,r,s=Mf(e)){i&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(ul,e.slice(6,e.length)):t.setAttributeNS(ul,e,n):n==null||s&&!ga(n)?t.removeAttribute(e):t.setAttribute(e,s?"":De(n)?String(n):n)}function hl(t,e,n,i,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?hc(n):n);return}const s=t.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const l=s==="OPTION"?t.getAttribute("value")||"":t.value,a=n==null?t.type==="checkbox"?"on":"":String(n);(l!==a||!("_value"in t))&&(t.value=a),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=ga(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function Id(t,e,n,i){t.addEventListener(e,n,i)}function Hd(t,e,n,i){t.removeEventListener(e,n,i)}const dl=Symbol("_vei");function Fd(t,e,n,i,r=null){const s=t[dl]||(t[dl]={}),o=s[e];if(i&&o)o.value=i;else{const[l,a]=Ld(e);if(i){const c=s[e]=Vd(i,r);Id(t,l,c,a)}else o&&(Hd(t,l,o,a),s[e]=void 0)}}const pl=/(?:Once|Passive|Capture)$/;function Ld(t){let e;if(pl.test(t)){e={};let i;for(;i=t.match(pl);)t=t.slice(0,t.length-i[0].length),e[i[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):ln(t.slice(2)),e]}let Ur=0;const Dd=Promise.resolve(),Bd=()=>Ur||(Dd.then(()=>Ur=0),Ur=Date.now());function Vd(t,e){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;pe(Ud(i,n.value),e,5,[i])};return n.value=t,n.attached=Bd(),n}function Ud(t,e){if(K(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const gl=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,jd=(t,e,n,i,r,s)=>{const o=r==="svg";e==="class"?Md(t,i,o):e==="style"?Rd(t,n,i):gr(e)?ao(e)||Fd(t,e,n,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):zd(t,e,i,o))?(hl(t,e,i),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&fl(t,e,i,o,s,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!wt(i))?hl(t,Le(e),i,s,e):(e==="true-value"?t._trueValue=i:e==="false-value"&&(t._falseValue=i),fl(t,e,i,o))};function zd(t,e,n,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in t&&gl(e)&&z(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return gl(e)&&wt(n)?!1:e in t}const Wd=Mt({patchProp:jd},Ed);let yl;function Kd(){return yl||(yl=Kh(Wd))}const Gd=(...t)=>{const e=Kd().createApp(...t),{mount:n}=e;return e.mount=i=>{const r=Jd(i);if(!r)return;const s=e._component;!z(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,qd(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function qd(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Jd(t){return wt(t)?document.querySelector(t):t}function Yd(t){return ba()?(Tf(t),!0):!1}const jr=new WeakMap,Xd=(...t)=>{var e;const n=t[0],i=(e=Er())==null?void 0:e.proxy;if(i==null&&!Ga())throw new Error("injectLocal must be called in setup");return i&&jr.has(i)&&n in jr.get(i)?jr.get(i)[n]:jn(...t)},Zd=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Qd=Object.prototype.toString,tp=t=>Qd.call(t)==="[object Object]",ep=()=>{};function dc(...t){if(t.length!==1)return sh(...t);const e=t[0];return typeof e=="function"?xr(nh(()=>({get:e,set:ep}))):ei(e)}function np(t,e){function n(...i){return new Promise((r,s)=>{Promise.resolve(t(()=>e.apply(this,i),{fn:e,thisArg:this,args:i})).then(r).catch(s)})}return n}const pc=t=>t();function ip(t=pc,e={}){const{initialState:n="active"}=e,i=dc(n==="active");function r(){i.value=!1}function s(){i.value=!0}const o=(...l)=>{i.value&&t(...l)};return{isActive:xr(i),pause:r,resume:s,eventFilter:o}}function ml(t){return t.endsWith("rem")?Number.parseFloat(t)*16:Number.parseFloat(t)}function zr(t){return Array.isArray(t)?t:[t]}function rp(t){return Er()}function sp(t,e,n={}){const{eventFilter:i=pc,...r}=n;return tn(t,np(i,e),r)}function op(t,e,n={}){const{eventFilter:i,initialState:r="active",...s}=n,{eventFilter:o,pause:l,resume:a,isActive:c}=ip(i,{initialState:r});return{stop:sp(t,e,{...s,eventFilter:o}),pause:l,resume:a,isActive:c}}function gc(t,e=!0,n){rp()?kr(t,n):e?t():xo(t)}function lp(t=!1,e={}){const{truthyValue:n=!0,falsyValue:i=!1}=e,r=xt(t),s=Ze(t);function o(l){if(arguments.length)return s.value=l,s.value;{const a=he(n);return s.value=s.value===a?he(i):a,s.value}}return r?o:[s,o]}function ap(t,e,n){return tn(t,e,{...n,immediate:!0})}const oi=Zd?window:void 0;function yc(t){var e;const n=he(t);return(e=n==null?void 0:n.$el)!=null?e:n}function tr(...t){const e=[],n=()=>{e.forEach(l=>l()),e.length=0},i=(l,a,c,u)=>(l.addEventListener(a,c,u),()=>l.removeEventListener(a,c,u)),r=Qt(()=>{const l=zr(he(t[0])).filter(a=>a!=null);return l.every(a=>typeof a!="string")?l:void 0}),s=ap(()=>{var l,a;return[(a=(l=r.value)==null?void 0:l.map(c=>yc(c)))!=null?a:[oi].filter(c=>c!=null),zr(he(r.value?t[1]:t[0])),zr(Ne(r.value?t[2]:t[1])),he(r.value?t[3]:t[2])]},([l,a,c,u])=>{if(n(),!(l!=null&&l.length)||!(a!=null&&a.length)||!(c!=null&&c.length))return;const f=tp(u)?{...u}:u;e.push(...l.flatMap(d=>a.flatMap(g=>c.map(m=>i(d,g,m,f)))))},{flush:"post"}),o=()=>{s(),n()};return Yd(n),o}function cp(){const t=Ze(!1),e=Er();return e&&kr(()=>{t.value=!0},e),t}function up(t){const e=cp();return Qt(()=>(e.value,!!t()))}const fp=Symbol("vueuse-ssr-width");function hp(){const t=Ga()?Xd(fp,null):null;return typeof t=="number"?t:void 0}function dp(t,e={}){const{window:n=oi,ssrWidth:i=hp()}=e,r=up(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function"),s=Ze(typeof i=="number"),o=Ze(),l=Ze(!1),a=c=>{l.value=c.matches};return Zh(()=>{if(s.value){s.value=!r.value;const c=he(t).split(",");l.value=c.some(u=>{const f=u.includes("not all"),d=u.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/),g=u.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);let m=!!(d||g);return d&&m&&(m=i>=ml(d[1])),g&&m&&(m=i<=ml(g[1])),f?!m:m});return}r.value&&(o.value=n.matchMedia(he(t)),l.value=o.value.matches)}),tr(o,"change",a,{passive:!0}),Qt(()=>l.value)}const wi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},$i="__vueuse_ssr_handlers__",pp=gp();function gp(){return $i in wi||(wi[$i]=wi[$i]||{}),wi[$i]}function mc(t,e){return pp[t]||e}function yp(t){return dp("(prefers-color-scheme: dark)",t)}function mp(t){return t==null?"any":t instanceof Set?"set":t instanceof Map?"map":t instanceof Date?"date":typeof t=="boolean"?"boolean":typeof t=="string"?"string":typeof t=="object"?"object":Number.isNaN(t)?"any":"number"}const bp={boolean:{read:t=>t==="true",write:t=>String(t)},object:{read:t=>JSON.parse(t),write:t=>JSON.stringify(t)},number:{read:t=>Number.parseFloat(t),write:t=>String(t)},any:{read:t=>t,write:t=>String(t)},string:{read:t=>t,write:t=>String(t)},map:{read:t=>new Map(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t.entries()))},set:{read:t=>new Set(JSON.parse(t)),write:t=>JSON.stringify(Array.from(t))},date:{read:t=>new Date(t),write:t=>t.toISOString()}},bl="vueuse-storage";function vp(t,e,n,i={}){var r;const{flush:s="pre",deep:o=!0,listenToStorageChanges:l=!0,writeDefaults:a=!0,mergeDefaults:c=!1,shallow:u,window:f=oi,eventFilter:d,onError:g=A=>{console.error(A)},initOnMounted:m}=i,w=(u?Ze:ei)(typeof e=="function"?e():e),R=Qt(()=>he(t));if(!n)try{n=mc("getDefaultStorage",()=>{var A;return(A=oi)==null?void 0:A.localStorage})()}catch(A){g(A)}if(!n)return w;const v=he(e),I=mp(v),T=(r=i.serializer)!=null?r:bp[I],{pause:_,resume:O}=op(w,()=>Q(w.value),{flush:s,deep:o,eventFilter:d});tn(R,()=>tt(),{flush:s}),f&&l&&gc(()=>{n instanceof Storage?tr(f,"storage",tt,{passive:!0}):tr(f,bl,nt),m&&tt()}),m||tt();function G(A,V){if(f){const C={key:R.value,oldValue:A,newValue:V,storageArea:n};f.dispatchEvent(n instanceof Storage?new StorageEvent("storage",C):new CustomEvent(bl,{detail:C}))}}function Q(A){try{const V=n.getItem(R.value);if(A==null)G(V,null),n.removeItem(R.value);else{const C=T.write(A);V!==C&&(n.setItem(R.value,C),G(V,C))}}catch(V){g(V)}}function ot(A){const V=A?A.newValue:n.getItem(R.value);if(V==null)return a&&v!=null&&n.setItem(R.value,T.write(v)),v;if(!A&&c){const C=T.read(V);return typeof c=="function"?c(C,v):I==="object"&&!Array.isArray(C)?{...v,...C}:C}else return typeof V!="string"?V:T.read(V)}function tt(A){if(!(A&&A.storageArea!==n)){if(A&&A.key==null){w.value=v;return}if(!(A&&A.key!==R.value)){_();try{(A==null?void 0:A.newValue)!==T.write(w.value)&&(w.value=ot(A))}catch(V){g(V)}finally{A?xo(O):O()}}}}function nt(A){tt(A.detail)}return w}const _p="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";function xp(t={}){const{selector:e="html",attribute:n="class",initialValue:i="auto",window:r=oi,storage:s,storageKey:o="vueuse-color-scheme",listenToStorageChanges:l=!0,storageRef:a,emitAuto:c,disableTransition:u=!0}=t,f={auto:"",light:"light",dark:"dark",...t.modes||{}},d=yp({window:r}),g=Qt(()=>d.value?"dark":"light"),m=a||(o==null?dc(i):vp(o,i,s,{window:r,listenToStorageChanges:l})),w=Qt(()=>m.value==="auto"?g.value:m.value),R=mc("updateHTMLAttrs",(_,O,G)=>{const Q=typeof _=="string"?r==null?void 0:r.document.querySelector(_):yc(_);if(!Q)return;const ot=new Set,tt=new Set;let nt=null;if(O==="class"){const V=G.split(/\s/g);Object.values(f).flatMap(C=>(C||"").split(/\s/g)).filter(Boolean).forEach(C=>{V.includes(C)?ot.add(C):tt.add(C)})}else nt={key:O,value:G};if(ot.size===0&&tt.size===0&&nt===null)return;let A;u&&(A=r.document.createElement("style"),A.appendChild(document.createTextNode(_p)),r.document.head.appendChild(A));for(const V of ot)Q.classList.add(V);for(const V of tt)Q.classList.remove(V);nt&&Q.setAttribute(nt.key,nt.value),u&&(r.getComputedStyle(A).opacity,document.head.removeChild(A))});function v(_){var O;R(e,n,(O=f[_])!=null?O:_)}function I(_){t.onChanged?t.onChanged(_,v):v(_)}tn(w,I,{flush:"post",immediate:!0}),gc(()=>I(w.value));const T=Qt({get(){return c?m.value:w.value},set(_){m.value=_}});return Object.assign(T,{store:m,system:g,state:w})}function wp(t={}){const{valueDark:e="dark",valueLight:n=""}=t,i=xp({...t,onChanged:(o,l)=>{var a;t.onChanged?(a=t.onChanged)==null||a.call(t,o==="dark",l,o):l(o)},modes:{dark:e,light:n}}),r=Qt(()=>i.system.value);return Qt({get(){return i.value==="dark"},set(o){const l=o?"dark":"light";r.value===l?i.value="auto":i.value=l}})}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ii=globalThis,Co=Ii.ShadowRoot&&(Ii.ShadyCSS===void 0||Ii.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mo=Symbol(),vl=new WeakMap;let bc=class{constructor(e,n,i){if(this._$cssResult$=!0,i!==Mo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=n}get styleSheet(){let e=this.o;const n=this.t;if(Co&&e===void 0){const i=n!==void 0&&n.length===1;i&&(e=vl.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&vl.set(n,e))}return e}toString(){return this.cssText}};const $p=t=>new bc(typeof t=="string"?t:t+"",void 0,Mo),St=(t,...e)=>{const n=t.length===1?t[0]:e.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[s+1],t[0]);return new bc(n,t,Mo)},kp=(t,e)=>{if(Co)t.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of e){const i=document.createElement("style"),r=Ii.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=n.cssText,t.appendChild(i)}},_l=Co?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let n="";for(const i of e.cssRules)n+=i.cssText;return $p(n)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Sp,defineProperty:Ap,getOwnPropertyDescriptor:Ep,getOwnPropertyNames:Cp,getOwnPropertySymbols:Mp,getPrototypeOf:Pp}=Object,Fe=globalThis,xl=Fe.trustedTypes,Tp=xl?xl.emptyScript:"",Wr=Fe.reactiveElementPolyfillSupport,Wn=(t,e)=>t,xs={toAttribute(t,e){switch(e){case Boolean:t=t?Tp:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=t!==null;break;case Number:n=t===null?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch{n=null}}return n}},vc=(t,e)=>!Sp(t,e),wl={attribute:!0,type:String,converter:xs,reflect:!1,hasChanged:vc};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Fe.litPropertyMetadata??(Fe.litPropertyMetadata=new WeakMap);let fn=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,n=wl){if(n.state&&(n.attribute=!1),this._$Ei(),this.elementProperties.set(e,n),!n.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,n);r!==void 0&&Ap(this.prototype,e,r)}}static getPropertyDescriptor(e,n,i){const{get:r,set:s}=Ep(this.prototype,e)??{get(){return this[n]},set(o){this[n]=o}};return{get(){return r==null?void 0:r.call(this)},set(o){const l=r==null?void 0:r.call(this);s.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??wl}static _$Ei(){if(this.hasOwnProperty(Wn("elementProperties")))return;const e=Pp(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Wn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Wn("properties"))){const n=this.properties,i=[...Cp(n),...Mp(n)];for(const r of i)this.createProperty(r,n[r])}const e=this[Symbol.metadata];if(e!==null){const n=litPropertyMetadata.get(e);if(n!==void 0)for(const[i,r]of n)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[n,i]of this.elementProperties){const r=this._$Eu(n,i);r!==void 0&&this._$Eh.set(r,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const n=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)n.unshift(_l(r))}else e!==void 0&&n.push(_l(e));return n}static _$Eu(e,n){const i=n.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(n=>this.enableUpdating=n),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(n=>n(this))}addController(e){var n;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)==null||n.call(e))}removeController(e){var n;(n=this._$EO)==null||n.delete(e)}_$E_(){const e=new Map,n=this.constructor.elementProperties;for(const i of n.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kp(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(n=>{var i;return(i=n.hostConnected)==null?void 0:i.call(n)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(n=>{var i;return(i=n.hostDisconnected)==null?void 0:i.call(n)})}attributeChangedCallback(e,n,i){this._$AK(e,i)}_$EC(e,n){var s;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:xs).toAttribute(n,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,n){var s;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:xs;this._$Em=r,this[r]=l.fromAttribute(n,o.type),this._$Em=null}}requestUpdate(e,n,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??vc)(this[e],n))return;this.P(e,n,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,n,i){this._$AL.has(e)||this._$AL.set(e,n),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,o]of r)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let e=!1;const n=this._$AL;try{e=this.shouldUpdate(n),e?(this.willUpdate(n),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(n)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(n)}willUpdate(e){}_$AE(e){var n;(n=this._$EO)==null||n.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(n=>this._$EC(n,this[n]))),this._$EU()}updated(e){}firstUpdated(e){}};fn.elementStyles=[],fn.shadowRootOptions={mode:"open"},fn[Wn("elementProperties")]=new Map,fn[Wn("finalized")]=new Map,Wr==null||Wr({ReactiveElement:fn}),(Fe.reactiveElementVersions??(Fe.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kn=globalThis,er=Kn.trustedTypes,$l=er?er.createPolicy("lit-html",{createHTML:t=>t}):void 0,_c="$lit$",Oe=`lit$${Math.random().toFixed(9).slice(2)}$`,xc="?"+Oe,Np=`<${xc}>`,rn=document,li=()=>rn.createComment(""),ai=t=>t===null||typeof t!="object"&&typeof t!="function",Po=Array.isArray,Rp=t=>Po(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Kr=`[ 	
\f\r]`,Mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,kl=/-->/g,Sl=/>/g,ze=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Al=/'/g,El=/"/g,wc=/^(?:script|style|textarea|title)$/i,Op=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),B=Op(1),sn=Symbol.for("lit-noChange"),vt=Symbol.for("lit-nothing"),Cl=new WeakMap,Je=rn.createTreeWalker(rn,129);function $c(t,e){if(!Po(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return $l!==void 0?$l.createHTML(e):e}const Ip=(t,e)=>{const n=t.length-1,i=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=Mn;for(let l=0;l<n;l++){const a=t[l];let c,u,f=-1,d=0;for(;d<a.length&&(o.lastIndex=d,u=o.exec(a),u!==null);)d=o.lastIndex,o===Mn?u[1]==="!--"?o=kl:u[1]!==void 0?o=Sl:u[2]!==void 0?(wc.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=ze):u[3]!==void 0&&(o=ze):o===ze?u[0]===">"?(o=r??Mn,f=-1):u[1]===void 0?f=-2:(f=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?ze:u[3]==='"'?El:Al):o===El||o===Al?o=ze:o===kl||o===Sl?o=Mn:(o=ze,r=void 0);const g=o===ze&&t[l+1].startsWith("/>")?" ":"";s+=o===Mn?a+Np:f>=0?(i.push(c),a.slice(0,f)+_c+a.slice(f)+Oe+g):a+Oe+(f===-2?l:g)}return[$c(t,s+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class ci{constructor({strings:e,_$litType$:n},i){let r;this.parts=[];let s=0,o=0;const l=e.length-1,a=this.parts,[c,u]=Ip(e,n);if(this.el=ci.createElement(c,i),Je.currentNode=this.el.content,n===2||n===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=Je.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(_c)){const d=u[o++],g=r.getAttribute(f).split(Oe),m=/([.?@])?(.*)/.exec(d);a.push({type:1,index:s,name:m[2],strings:g,ctor:m[1]==="."?Fp:m[1]==="?"?Lp:m[1]==="@"?Dp:Mr}),r.removeAttribute(f)}else f.startsWith(Oe)&&(a.push({type:6,index:s}),r.removeAttribute(f));if(wc.test(r.tagName)){const f=r.textContent.split(Oe),d=f.length-1;if(d>0){r.textContent=er?er.emptyScript:"";for(let g=0;g<d;g++)r.append(f[g],li()),Je.nextNode(),a.push({type:2,index:++s});r.append(f[d],li())}}}else if(r.nodeType===8)if(r.data===xc)a.push({type:2,index:s});else{let f=-1;for(;(f=r.data.indexOf(Oe,f+1))!==-1;)a.push({type:7,index:s}),f+=Oe.length-1}s++}}static createElement(e,n){const i=rn.createElement("template");return i.innerHTML=e,i}}function wn(t,e,n=t,i){var o,l;if(e===sn)return e;let r=i!==void 0?(o=n._$Co)==null?void 0:o[i]:n._$Cl;const s=ai(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),s===void 0?r=void 0:(r=new s(t),r._$AT(t,n,i)),i!==void 0?(n._$Co??(n._$Co=[]))[i]=r:n._$Cl=r),r!==void 0&&(e=wn(t,r._$AS(t,e.values),r,i)),e}let Hp=class{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??rn).importNode(n,!0);Je.currentNode=r;let s=Je.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new Cr(s,s.nextSibling,this,e):a.type===1?c=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(c=new Bp(s,this,e)),this._$AV.push(c),a=i[++l]}o!==(a==null?void 0:a.index)&&(s=Je.nextNode(),o++)}return Je.currentNode=rn,r}p(e){let n=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,n),n+=i.strings.length-2):i._$AI(e[n])),n++}},Cr=class kc{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,n,i,r){this.type=2,this._$AH=vt,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=wn(this,e,n),ai(e)?e===vt||e==null||e===""?(this._$AH!==vt&&this._$AR(),this._$AH=vt):e!==this._$AH&&e!==sn&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Rp(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==vt&&ai(this._$AH)?this._$AA.nextSibling.data=e:this.T(rn.createTextNode(e)),this._$AH=e}$(e){var s;const{values:n,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ci.createElement($c(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(n);else{const o=new Hp(r,this),l=o.u(this.options);o.p(n),this.T(l),this._$AH=o}}_$AC(e){let n=Cl.get(e.strings);return n===void 0&&Cl.set(e.strings,n=new ci(e)),n}k(e){Po(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let i,r=0;for(const s of e)r===n.length?n.push(i=new kc(this.O(li()),this.O(li()),this,this.options)):i=n[r],i._$AI(s),r++;r<n.length&&(this._$AR(i&&i._$AB.nextSibling,r),n.length=r)}_$AR(e=this._$AA.nextSibling,n){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,n);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var n;this._$AM===void 0&&(this._$Cv=e,(n=this._$AP)==null||n.call(this,e))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,i,r,s){this.type=1,this._$AH=vt,this._$AN=void 0,this.element=e,this.name=n,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=vt}_$AI(e,n=this,i,r){const s=this.strings;let o=!1;if(s===void 0)e=wn(this,e,n,0),o=!ai(e)||e!==this._$AH&&e!==sn,o&&(this._$AH=e);else{const l=e;let a,c;for(e=s[0],a=0;a<s.length-1;a++)c=wn(this,l[i+a],n,a),c===sn&&(c=this._$AH[a]),o||(o=!ai(c)||c!==this._$AH[a]),c===vt?e=vt:e!==vt&&(e+=(c??"")+s[a+1]),this._$AH[a]=c}o&&!r&&this.j(e)}j(e){e===vt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Fp=class extends Mr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===vt?void 0:e}},Lp=class extends Mr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==vt)}},Dp=class extends Mr{constructor(e,n,i,r,s){super(e,n,i,r,s),this.type=5}_$AI(e,n=this){if((e=wn(this,e,n,0)??vt)===sn)return;const i=this._$AH,r=e===vt&&i!==vt||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==vt&&(i===vt||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,e):this._$AH.handleEvent(e)}};class Bp{constructor(e,n,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){wn(this,e)}}const Vp={I:Cr},Gr=Kn.litHtmlPolyfillSupport;Gr==null||Gr(ci,Cr),(Kn.litHtmlVersions??(Kn.litHtmlVersions=[])).push("3.2.1");const Sc=(t,e,n)=>{const i=(n==null?void 0:n.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const s=(n==null?void 0:n.renderBefore)??null;i._$litPart$=r=new Cr(e.insertBefore(li(),s),s,void 0,n??{})}return r._$AI(t),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let gt=class extends fn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var n;const e=super.createRenderRoot();return(n=this.renderOptions).renderBefore??(n.renderBefore=e.firstChild),e}update(e){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Sc(n,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return sn}};var aa;gt._$litElement$=!0,gt.finalized=!0,(aa=globalThis.litElementHydrateSupport)==null||aa.call(globalThis,{LitElement:gt});const qr=globalThis.litElementPolyfillSupport;qr==null||qr({LitElement:gt});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Up}=Vp,Ml=(t,e)=>(t==null?void 0:t._$litType$)!==void 0,jp=t=>{var e;return((e=t==null?void 0:t._$litType$)==null?void 0:e.h)!=null},zp=t=>t.strings===void 0,Pl=()=>document.createComment(""),Tl=(t,e,n)=>{var s;const i=t._$AA.parentNode,r=t._$AB;if(n===void 0){const o=i.insertBefore(Pl(),r),l=i.insertBefore(Pl(),r);n=new Up(o,l,t,t.options)}else{const o=n._$AB.nextSibling,l=n._$AM,a=l!==t;if(a){let c;(s=n._$AQ)==null||s.call(n,t),n._$AM=t,n._$AP!==void 0&&(c=t._$AU)!==l._$AU&&n._$AP(c)}if(o!==r||a){let c=n._$AA;for(;c!==o;){const u=c.nextSibling;i.insertBefore(c,r),c=u}}}return n},Wp={},Nl=(t,e=Wp)=>t._$AH=e,Rl=t=>t._$AH,Kp=t=>{t._$AR()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ac={ATTRIBUTE:1,CHILD:2},To=t=>(...e)=>({_$litDirective$:t,values:e});let No=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,n,i){this._$Ct=e,this._$AM=n,this._$Ci=i}_$AS(e,n){return this.update(e,n)}update(e,n){return this.render(...n)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gn=(t,e)=>{var i;const n=t._$AN;if(n===void 0)return!1;for(const r of n)(i=r._$AO)==null||i.call(r,e,!1),Gn(r,e);return!0},nr=t=>{let e,n;do{if((e=t._$AM)===void 0)break;n=e._$AN,n.delete(t),t=e}while((n==null?void 0:n.size)===0)},Ec=t=>{for(let e;e=t._$AM;t=e){let n=e._$AN;if(n===void 0)e._$AN=n=new Set;else if(n.has(t))break;n.add(t),Jp(e)}};function Gp(t){this._$AN!==void 0?(nr(this),this._$AM=t,Ec(this)):this._$AM=t}function qp(t,e=!1,n=0){const i=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(i))for(let s=n;s<i.length;s++)Gn(i[s],!1),nr(i[s]);else i!=null&&(Gn(i,!1),nr(i));else Gn(this,t)}const Jp=t=>{t.type==Ac.CHILD&&(t._$AP??(t._$AP=qp),t._$AQ??(t._$AQ=Gp))};let Yp=class extends No{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,n,i){super._$AT(e,n,i),Ec(this),this.isConnected=e._$AU}_$AO(e,n=!0){var i,r;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(r=this.disconnected)==null||r.call(this)),n&&(Gn(this,e),nr(this))}setValue(e){if(zp(this._$Ct))this._$Ct._$AI(e,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=e,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=()=>new Xp;let Xp=class{};const Jr=new WeakMap,Z=To(class extends Yp{render(t){return vt}update(t,[e]){var i;const n=e!==this.Y;return n&&this.Y!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.Y=e,this.ht=(i=t.options)==null?void 0:i.host,this.rt(this.ct=t.element)),vt}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const e=this.ht??globalThis;let n=Jr.get(e);n===void 0&&(n=new WeakMap,Jr.set(e,n)),n.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),n.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=Jr.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function Ot(t){return function(){return t}}const Ol=Math.abs,At=Math.atan2,We=Math.cos,Zp=Math.max,Yr=Math.min,oe=Math.sin,dn=Math.sqrt,Lt=1e-12,ui=Math.PI,ir=ui/2,Hi=2*ui;function Qp(t){return t>1?0:t<-1?ui:Math.acos(t)}function Il(t){return t>=1?ir:t<=-1?-ir:Math.asin(t)}const ws=Math.PI,$s=2*ws,Ge=1e-6,tg=$s-Ge;function Cc(t){this._+=t[0];for(let e=1,n=t.length;e<n;++e)this._+=arguments[e]+t[e]}function eg(t){let e=Math.floor(t);if(!(e>=0))throw new Error(`invalid digits: ${t}`);if(e>15)return Cc;const n=10**e;return function(i){this._+=i[0];for(let r=1,s=i.length;r<s;++r)this._+=Math.round(arguments[r]*n)/n+i[r]}}class ng{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?Cc:eg(e)}moveTo(e,n){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,n){this._append`L${this._x1=+e},${this._y1=+n}`}quadraticCurveTo(e,n,i,r){this._append`Q${+e},${+n},${this._x1=+i},${this._y1=+r}`}bezierCurveTo(e,n,i,r,s,o){this._append`C${+e},${+n},${+i},${+r},${this._x1=+s},${this._y1=+o}`}arcTo(e,n,i,r,s){if(e=+e,n=+n,i=+i,r=+r,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,l=this._y1,a=i-e,c=r-n,u=o-e,f=l-n,d=u*u+f*f;if(this._x1===null)this._append`M${this._x1=e},${this._y1=n}`;else if(d>Ge)if(!(Math.abs(f*a-c*u)>Ge)||!s)this._append`L${this._x1=e},${this._y1=n}`;else{let g=i-o,m=r-l,w=a*a+c*c,R=g*g+m*m,v=Math.sqrt(w),I=Math.sqrt(d),T=s*Math.tan((ws-Math.acos((w+d-R)/(2*v*I)))/2),_=T/I,O=T/v;Math.abs(_-1)>Ge&&this._append`L${e+_*u},${n+_*f}`,this._append`A${s},${s},0,0,${+(f*g>u*m)},${this._x1=e+O*a},${this._y1=n+O*c}`}}arc(e,n,i,r,s,o){if(e=+e,n=+n,i=+i,o=!!o,i<0)throw new Error(`negative radius: ${i}`);let l=i*Math.cos(r),a=i*Math.sin(r),c=e+l,u=n+a,f=1^o,d=o?r-s:s-r;this._x1===null?this._append`M${c},${u}`:(Math.abs(this._x1-c)>Ge||Math.abs(this._y1-u)>Ge)&&this._append`L${c},${u}`,i&&(d<0&&(d=d%$s+$s),d>tg?this._append`A${i},${i},0,1,${f},${e-l},${n-a}A${i},${i},0,1,${f},${this._x1=c},${this._y1=u}`:d>Ge&&this._append`A${i},${i},0,${+(d>=ws)},${f},${this._x1=e+i*Math.cos(s)},${this._y1=n+i*Math.sin(s)}`)}rect(e,n,i,r){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+n}h${i=+i}v${+r}h${-i}Z`}toString(){return this._}}function ig(t){let e=3;return t.digits=function(n){if(!arguments.length)return e;if(n==null)e=null;else{const i=Math.floor(n);if(!(i>=0))throw new RangeError(`invalid digits: ${n}`);e=i}return t},()=>new ng(e)}function rg(t){return t.innerRadius}function sg(t){return t.outerRadius}function og(t){return t.startAngle}function lg(t){return t.endAngle}function ag(t){return t&&t.padAngle}function cg(t,e,n,i,r,s,o,l){var a=n-t,c=i-e,u=o-r,f=l-s,d=f*a-u*c;if(!(d*d<Lt))return d=(u*(e-s)-f*(t-r))/d,[t+d*a,e+d*c]}function ki(t,e,n,i,r,s,o){var l=t-n,a=e-i,c=(o?s:-s)/dn(l*l+a*a),u=c*a,f=-c*l,d=t+u,g=e+f,m=n+u,w=i+f,R=(d+m)/2,v=(g+w)/2,I=m-d,T=w-g,_=I*I+T*T,O=r-s,G=d*w-m*g,Q=(T<0?-1:1)*dn(Zp(0,O*O*_-G*G)),ot=(G*T-I*Q)/_,tt=(-G*I-T*Q)/_,nt=(G*T+I*Q)/_,A=(-G*I+T*Q)/_,V=ot-R,C=tt-v,W=nt-R,Pt=A-v;return V*V+C*C>W*W+Pt*Pt&&(ot=nt,tt=A),{cx:ot,cy:tt,x01:-u,y01:-f,x11:ot*(r/O-1),y11:tt*(r/O-1)}}function Mc(){var t=rg,e=sg,n=Ot(0),i=null,r=og,s=lg,o=ag,l=null,a=ig(c);function c(){var u,f,d=+t.apply(this,arguments),g=+e.apply(this,arguments),m=r.apply(this,arguments)-ir,w=s.apply(this,arguments)-ir,R=Ol(w-m),v=w>m;if(l||(l=u=a()),g<d&&(f=g,g=d,d=f),!(g>Lt))l.moveTo(0,0);else if(R>Hi-Lt)l.moveTo(g*We(m),g*oe(m)),l.arc(0,0,g,m,w,!v),d>Lt&&(l.moveTo(d*We(w),d*oe(w)),l.arc(0,0,d,w,m,v));else{var I=m,T=w,_=m,O=w,G=R,Q=R,ot=o.apply(this,arguments)/2,tt=ot>Lt&&(i?+i.apply(this,arguments):dn(d*d+g*g)),nt=Yr(Ol(g-d)/2,+n.apply(this,arguments)),A=nt,V=nt,C,W;if(tt>Lt){var Pt=Il(tt/d*oe(ot)),ct=Il(tt/g*oe(ot));(G-=Pt*2)>Lt?(Pt*=v?1:-1,_+=Pt,O-=Pt):(G=0,_=O=(m+w)/2),(Q-=ct*2)>Lt?(ct*=v?1:-1,I+=ct,T-=ct):(Q=0,I=T=(m+w)/2)}var J=g*We(I),L=g*oe(I),it=d*We(O),bt=d*oe(O);if(nt>Lt){var $t=g*We(T),pt=g*oe(T),Ae=d*We(_),Ee=d*oe(_),Tt;if(R<ui)if(Tt=cg(J,L,Ae,Ee,$t,pt,it,bt)){var Gt=J-Tt[0],ee=L-Tt[1],ye=$t-Tt[0],q=pt-Tt[1],Y=1/oe(Qp((Gt*ye+ee*q)/(dn(Gt*Gt+ee*ee)*dn(ye*ye+q*q)))/2),ut=dn(Tt[0]*Tt[0]+Tt[1]*Tt[1]);A=Yr(nt,(d-ut)/(Y-1)),V=Yr(nt,(g-ut)/(Y+1))}else A=V=0}Q>Lt?V>Lt?(C=ki(Ae,Ee,J,L,g,V,v),W=ki($t,pt,it,bt,g,V,v),l.moveTo(C.cx+C.x01,C.cy+C.y01),V<nt?l.arc(C.cx,C.cy,V,At(C.y01,C.x01),At(W.y01,W.x01),!v):(l.arc(C.cx,C.cy,V,At(C.y01,C.x01),At(C.y11,C.x11),!v),l.arc(0,0,g,At(C.cy+C.y11,C.cx+C.x11),At(W.cy+W.y11,W.cx+W.x11),!v),l.arc(W.cx,W.cy,V,At(W.y11,W.x11),At(W.y01,W.x01),!v))):(l.moveTo(J,L),l.arc(0,0,g,I,T,!v)):l.moveTo(J,L),!(d>Lt)||!(G>Lt)?l.lineTo(it,bt):A>Lt?(C=ki(it,bt,$t,pt,d,-A,v),W=ki(J,L,Ae,Ee,d,-A,v),l.lineTo(C.cx+C.x01,C.cy+C.y01),A<nt?l.arc(C.cx,C.cy,A,At(C.y01,C.x01),At(W.y01,W.x01),!v):(l.arc(C.cx,C.cy,A,At(C.y01,C.x01),At(C.y11,C.x11),!v),l.arc(0,0,d,At(C.cy+C.y11,C.cx+C.x11),At(W.cy+W.y11,W.cx+W.x11),v),l.arc(W.cx,W.cy,A,At(W.y11,W.x11),At(W.y01,W.x01),!v))):l.arc(0,0,d,O,_,v)}if(l.closePath(),u)return l=null,u+""||null}return c.centroid=function(){var u=(+t.apply(this,arguments)+ +e.apply(this,arguments))/2,f=(+r.apply(this,arguments)+ +s.apply(this,arguments))/2-ui/2;return[We(f)*u,oe(f)*u]},c.innerRadius=function(u){return arguments.length?(t=typeof u=="function"?u:Ot(+u),c):t},c.outerRadius=function(u){return arguments.length?(e=typeof u=="function"?u:Ot(+u),c):e},c.cornerRadius=function(u){return arguments.length?(n=typeof u=="function"?u:Ot(+u),c):n},c.padRadius=function(u){return arguments.length?(i=u==null?null:typeof u=="function"?u:Ot(+u),c):i},c.startAngle=function(u){return arguments.length?(r=typeof u=="function"?u:Ot(+u),c):r},c.endAngle=function(u){return arguments.length?(s=typeof u=="function"?u:Ot(+u),c):s},c.padAngle=function(u){return arguments.length?(o=typeof u=="function"?u:Ot(+u),c):o},c.context=function(u){return arguments.length?(l=u??null,c):l},c}function ug(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function fg(t,e){return e<t?-1:e>t?1:e>=t?0:NaN}function hg(t){return t}function dg(){var t=hg,e=fg,n=null,i=Ot(0),r=Ot(Hi),s=Ot(0);function o(l){var a,c=(l=ug(l)).length,u,f,d=0,g=new Array(c),m=new Array(c),w=+i.apply(this,arguments),R=Math.min(Hi,Math.max(-Hi,r.apply(this,arguments)-w)),v,I=Math.min(Math.abs(R)/c,s.apply(this,arguments)),T=I*(R<0?-1:1),_;for(a=0;a<c;++a)(_=m[g[a]=a]=+t(l[a],a,l))>0&&(d+=_);for(e!=null?g.sort(function(O,G){return e(m[O],m[G])}):n!=null&&g.sort(function(O,G){return n(l[O],l[G])}),a=0,f=d?(R-c*T)/d:0;a<c;++a,w=v)u=g[a],_=m[u],v=w+(_>0?_*f:0)+T,m[u]={data:l[u],index:a,value:_,startAngle:w,endAngle:v,padAngle:I};return m}return o.value=function(l){return arguments.length?(t=typeof l=="function"?l:Ot(+l),o):t},o.sortValues=function(l){return arguments.length?(e=l,n=null,o):e},o.sort=function(l){return arguments.length?(n=l,e=null,o):n},o.startAngle=function(l){return arguments.length?(i=typeof l=="function"?l:Ot(+l),o):i},o.endAngle=function(l){return arguments.length?(r=typeof l=="function"?l:Ot(+l),o):r},o.padAngle=function(l){return arguments.length?(s=typeof l=="function"?l:Ot(+l),o):s},o}function Ro(t,e,n){t.prototype=e.prototype=n,n.constructor=t}function Pc(t,e){var n=Object.create(t.prototype);for(var i in e)n[i]=e[i];return n}function yi(){}var fi=.7,rr=1/fi,bn="\\s*([+-]?\\d+)\\s*",hi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",de="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",pg=/^#([0-9a-f]{3,8})$/,gg=new RegExp(`^rgb\\(${bn},${bn},${bn}\\)$`),yg=new RegExp(`^rgb\\(${de},${de},${de}\\)$`),mg=new RegExp(`^rgba\\(${bn},${bn},${bn},${hi}\\)$`),bg=new RegExp(`^rgba\\(${de},${de},${de},${hi}\\)$`),vg=new RegExp(`^hsl\\(${hi},${de},${de}\\)$`),_g=new RegExp(`^hsla\\(${hi},${de},${de},${hi}\\)$`),Hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Ro(yi,$e,{copy(t){return Object.assign(new this.constructor,this,t)},displayable(){return this.rgb().displayable()},hex:Fl,formatHex:Fl,formatHex8:xg,formatHsl:wg,formatRgb:Ll,toString:Ll});function Fl(){return this.rgb().formatHex()}function xg(){return this.rgb().formatHex8()}function wg(){return Tc(this).formatHsl()}function Ll(){return this.rgb().formatRgb()}function $e(t){var e,n;return t=(t+"").trim().toLowerCase(),(e=pg.exec(t))?(n=e[1].length,e=parseInt(e[1],16),n===6?Dl(e):n===3?new Dt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):n===8?Si(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):n===4?Si(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=gg.exec(t))?new Dt(e[1],e[2],e[3],1):(e=yg.exec(t))?new Dt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=mg.exec(t))?Si(e[1],e[2],e[3],e[4]):(e=bg.exec(t))?Si(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=vg.exec(t))?Ul(e[1],e[2]/100,e[3]/100,1):(e=_g.exec(t))?Ul(e[1],e[2]/100,e[3]/100,e[4]):Hl.hasOwnProperty(t)?Dl(Hl[t]):t==="transparent"?new Dt(NaN,NaN,NaN,0):null}function Dl(t){return new Dt(t>>16&255,t>>8&255,t&255,1)}function Si(t,e,n,i){return i<=0&&(t=e=n=NaN),new Dt(t,e,n,i)}function $g(t){return t instanceof yi||(t=$e(t)),t?(t=t.rgb(),new Dt(t.r,t.g,t.b,t.opacity)):new Dt}function ks(t,e,n,i){return arguments.length===1?$g(t):new Dt(t,e,n,i??1)}function Dt(t,e,n,i){this.r=+t,this.g=+e,this.b=+n,this.opacity=+i}Ro(Dt,ks,Pc(yi,{brighter(t){return t=t==null?rr:Math.pow(rr,t),new Dt(this.r*t,this.g*t,this.b*t,this.opacity)},darker(t){return t=t==null?fi:Math.pow(fi,t),new Dt(this.r*t,this.g*t,this.b*t,this.opacity)},rgb(){return this},clamp(){return new Dt(en(this.r),en(this.g),en(this.b),sr(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Bl,formatHex:Bl,formatHex8:kg,formatRgb:Vl,toString:Vl}));function Bl(){return`#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}`}function kg(){return`#${Ye(this.r)}${Ye(this.g)}${Ye(this.b)}${Ye((isNaN(this.opacity)?1:this.opacity)*255)}`}function Vl(){const t=sr(this.opacity);return`${t===1?"rgb(":"rgba("}${en(this.r)}, ${en(this.g)}, ${en(this.b)}${t===1?")":`, ${t})`}`}function sr(t){return isNaN(t)?1:Math.max(0,Math.min(1,t))}function en(t){return Math.max(0,Math.min(255,Math.round(t)||0))}function Ye(t){return t=en(t),(t<16?"0":"")+t.toString(16)}function Ul(t,e,n,i){return i<=0?t=e=n=NaN:n<=0||n>=1?t=e=NaN:e<=0&&(t=NaN),new Yt(t,e,n,i)}function Tc(t){if(t instanceof Yt)return new Yt(t.h,t.s,t.l,t.opacity);if(t instanceof yi||(t=$e(t)),!t)return new Yt;if(t instanceof Yt)return t;t=t.rgb();var e=t.r/255,n=t.g/255,i=t.b/255,r=Math.min(e,n,i),s=Math.max(e,n,i),o=NaN,l=s-r,a=(s+r)/2;return l?(e===s?o=(n-i)/l+(n<i)*6:n===s?o=(i-e)/l+2:o=(e-n)/l+4,l/=a<.5?s+r:2-s-r,o*=60):l=a>0&&a<1?0:o,new Yt(o,l,a,t.opacity)}function Nc(t,e,n,i){return arguments.length===1?Tc(t):new Yt(t,e,n,i??1)}function Yt(t,e,n,i){this.h=+t,this.s=+e,this.l=+n,this.opacity=+i}Ro(Yt,Nc,Pc(yi,{brighter(t){return t=t==null?rr:Math.pow(rr,t),new Yt(this.h,this.s,this.l*t,this.opacity)},darker(t){return t=t==null?fi:Math.pow(fi,t),new Yt(this.h,this.s,this.l*t,this.opacity)},rgb(){var t=this.h%360+(this.h<0)*360,e=isNaN(t)||isNaN(this.s)?0:this.s,n=this.l,i=n+(n<.5?n:1-n)*e,r=2*n-i;return new Dt(Xr(t>=240?t-240:t+120,r,i),Xr(t,r,i),Xr(t<120?t+240:t-120,r,i),this.opacity)},clamp(){return new Yt(jl(this.h),Ai(this.s),Ai(this.l),sr(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const t=sr(this.opacity);return`${t===1?"hsl(":"hsla("}${jl(this.h)}, ${Ai(this.s)*100}%, ${Ai(this.l)*100}%${t===1?")":`, ${t})`}`}}));function jl(t){return t=(t||0)%360,t<0?t+360:t}function Ai(t){return Math.max(0,Math.min(1,t||0))}function Xr(t,e,n){return(t<60?e+(n-e)*t/60:t<180?n:t<240?e+(n-e)*(240-t)/60:e)*255}function Zr(t){return--t*t*t+1}function Sg(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}const Oo=t=>()=>t;function Ag(t,e){return function(n){return t+n*e}}function Eg(t,e,n){return t=Math.pow(t,n),e=Math.pow(e,n)-t,n=1/n,function(i){return Math.pow(t+i*e,n)}}function Cg(t){return(t=+t)==1?Rc:function(e,n){return n-e?Eg(e,n,t):Oo(isNaN(e)?n:e)}}function Rc(t,e){var n=e-t;return n?Ag(t,n):Oo(isNaN(t)?e:t)}const or=function t(e){var n=Cg(e);function i(r,s){var o=n((r=ks(r)).r,(s=ks(s)).r),l=n(r.g,s.g),a=n(r.b,s.b),c=Rc(r.opacity,s.opacity);return function(u){return r.r=o(u),r.g=l(u),r.b=a(u),r.opacity=c(u),r+""}}return i.gamma=t,i}(1);function Mg(t,e){e||(e=[]);var n=t?Math.min(e.length,t.length):0,i=e.slice(),r;return function(s){for(r=0;r<n;++r)i[r]=t[r]*(1-s)+e[r]*s;return i}}function Pg(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Tg(t,e){var n=e?e.length:0,i=t?Math.min(n,t.length):0,r=new Array(i),s=new Array(n),o;for(o=0;o<i;++o)r[o]=vn(t[o],e[o]);for(;o<n;++o)s[o]=e[o];return function(l){for(o=0;o<i;++o)s[o]=r[o](l);return s}}function Ng(t,e){var n=new Date;return t=+t,e=+e,function(i){return n.setTime(t*(1-i)+e*i),n}}function Jt(t,e){return t=+t,e=+e,function(n){return t*(1-n)+e*n}}function Rg(t,e){var n={},i={},r;(t===null||typeof t!="object")&&(t={}),(e===null||typeof e!="object")&&(e={});for(r in e)r in t?n[r]=vn(t[r],e[r]):i[r]=e[r];return function(s){for(r in n)i[r]=n[r](s);return i}}var Ss=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Qr=new RegExp(Ss.source,"g");function Og(t){return function(){return t}}function Ig(t){return function(e){return t(e)+""}}function Oc(t,e){var n=Ss.lastIndex=Qr.lastIndex=0,i,r,s,o=-1,l=[],a=[];for(t=t+"",e=e+"";(i=Ss.exec(t))&&(r=Qr.exec(e));)(s=r.index)>n&&(s=e.slice(n,s),l[o]?l[o]+=s:l[++o]=s),(i=i[0])===(r=r[0])?l[o]?l[o]+=r:l[++o]=r:(l[++o]=null,a.push({i:o,x:Jt(i,r)})),n=Qr.lastIndex;return n<e.length&&(s=e.slice(n),l[o]?l[o]+=s:l[++o]=s),l.length<2?a[0]?Ig(a[0].x):Og(e):(e=a.length,function(c){for(var u=0,f;u<e;++u)l[(f=a[u]).i]=f.x(c);return l.join("")})}function vn(t,e){var n=typeof e,i;return e==null||n==="boolean"?Oo(e):(n==="number"?Jt:n==="string"?(i=$e(e))?(e=i,or):Oc:e instanceof $e?or:e instanceof Date?Ng:Pg(e)?Mg:Array.isArray(e)?Tg:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Rg:Jt)(t,e)}function Hg(t,e){return t=+t,e=+e,function(n){return Math.round(t*(1-n)+e*n)}}var zl=180/Math.PI,As={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Ic(t,e,n,i,r,s){var o,l,a;return(o=Math.sqrt(t*t+e*e))&&(t/=o,e/=o),(a=t*n+e*i)&&(n-=t*a,i-=e*a),(l=Math.sqrt(n*n+i*i))&&(n/=l,i/=l,a/=l),t*i<e*n&&(t=-t,e=-e,a=-a,o=-o),{translateX:r,translateY:s,rotate:Math.atan2(e,t)*zl,skewX:Math.atan(a)*zl,scaleX:o,scaleY:l}}var Ei;function Fg(t){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(t+"");return e.isIdentity?As:Ic(e.a,e.b,e.c,e.d,e.e,e.f)}function Lg(t){return t==null||(Ei||(Ei=document.createElementNS("http://www.w3.org/2000/svg","g")),Ei.setAttribute("transform",t),!(t=Ei.transform.baseVal.consolidate()))?As:(t=t.matrix,Ic(t.a,t.b,t.c,t.d,t.e,t.f))}function Hc(t,e,n,i){function r(c){return c.length?c.pop()+" ":""}function s(c,u,f,d,g,m){if(c!==f||u!==d){var w=g.push("translate(",null,e,null,n);m.push({i:w-4,x:Jt(c,f)},{i:w-2,x:Jt(u,d)})}else(f||d)&&g.push("translate("+f+e+d+n)}function o(c,u,f,d){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),d.push({i:f.push(r(f)+"rotate(",null,i)-2,x:Jt(c,u)})):u&&f.push(r(f)+"rotate("+u+i)}function l(c,u,f,d){c!==u?d.push({i:f.push(r(f)+"skewX(",null,i)-2,x:Jt(c,u)}):u&&f.push(r(f)+"skewX("+u+i)}function a(c,u,f,d,g,m){if(c!==f||u!==d){var w=g.push(r(g)+"scale(",null,",",null,")");m.push({i:w-4,x:Jt(c,f)},{i:w-2,x:Jt(u,d)})}else(f!==1||d!==1)&&g.push(r(g)+"scale("+f+","+d+")")}return function(c,u){var f=[],d=[];return c=t(c),u=t(u),s(c.translateX,c.translateY,u.translateX,u.translateY,f,d),o(c.rotate,u.rotate,f,d),l(c.skewX,u.skewX,f,d),a(c.scaleX,c.scaleY,u.scaleX,u.scaleY,f,d),c=u=null,function(g){for(var m=-1,w=d.length,R;++m<w;)f[(R=d[m]).i]=R.x(g);return f.join("")}}}var Dg=Hc(Fg,"px, ","px)","deg)"),Bg=Hc(Lg,", ",")",")"),Es="http://www.w3.org/1999/xhtml";const Wl={svg:"http://www.w3.org/2000/svg",xhtml:Es,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Pr(t){var e=t+="",n=e.indexOf(":");return n>=0&&(e=t.slice(0,n))!=="xmlns"&&(t=t.slice(n+1)),Wl.hasOwnProperty(e)?{space:Wl[e],local:t}:t}function Vg(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===Es&&e.documentElement.namespaceURI===Es?e.createElement(t):e.createElementNS(n,t)}}function Ug(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Fc(t){var e=Pr(t);return(e.local?Ug:Vg)(e)}function jg(){}function Io(t){return t==null?jg:function(){return this.querySelector(t)}}function zg(t){typeof t!="function"&&(t=Io(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=new Array(o),a,c,u=0;u<o;++u)(a=s[u])&&(c=t.call(a,a.__data__,u,s))&&("__data__"in a&&(c.__data__=a.__data__),l[u]=c);return new zt(i,this._parents)}function Wg(t){return t==null?[]:Array.isArray(t)?t:Array.from(t)}function Kg(){return[]}function Lc(t){return t==null?Kg:function(){return this.querySelectorAll(t)}}function Gg(t){return function(){return Wg(t.apply(this,arguments))}}function qg(t){typeof t=="function"?t=Gg(t):t=Lc(t);for(var e=this._groups,n=e.length,i=[],r=[],s=0;s<n;++s)for(var o=e[s],l=o.length,a,c=0;c<l;++c)(a=o[c])&&(i.push(t.call(a,a.__data__,c,o)),r.push(a));return new zt(i,r)}function Dc(t){return function(){return this.matches(t)}}function Bc(t){return function(e){return e.matches(t)}}var Jg=Array.prototype.find;function Yg(t){return function(){return Jg.call(this.children,t)}}function Xg(){return this.firstElementChild}function Zg(t){return this.select(t==null?Xg:Yg(typeof t=="function"?t:Bc(t)))}var Qg=Array.prototype.filter;function t0(){return Array.from(this.children)}function e0(t){return function(){return Qg.call(this.children,t)}}function n0(t){return this.selectAll(t==null?t0:e0(typeof t=="function"?t:Bc(t)))}function i0(t){typeof t!="function"&&(t=Dc(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=[],a,c=0;c<o;++c)(a=s[c])&&t.call(a,a.__data__,c,s)&&l.push(a);return new zt(i,this._parents)}function Vc(t){return new Array(t.length)}function r0(){return new zt(this._enter||this._groups.map(Vc),this._parents)}function lr(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}lr.prototype={constructor:lr,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};function s0(t){return function(){return t}}function o0(t,e,n,i,r,s){for(var o=0,l,a=e.length,c=s.length;o<c;++o)(l=e[o])?(l.__data__=s[o],i[o]=l):n[o]=new lr(t,s[o]);for(;o<a;++o)(l=e[o])&&(r[o]=l)}function l0(t,e,n,i,r,s,o){var l,a,c=new Map,u=e.length,f=s.length,d=new Array(u),g;for(l=0;l<u;++l)(a=e[l])&&(d[l]=g=o.call(a,a.__data__,l,e)+"",c.has(g)?r[l]=a:c.set(g,a));for(l=0;l<f;++l)g=o.call(t,s[l],l,s)+"",(a=c.get(g))?(i[l]=a,a.__data__=s[l],c.delete(g)):n[l]=new lr(t,s[l]);for(l=0;l<u;++l)(a=e[l])&&c.get(d[l])===a&&(r[l]=a)}function a0(t){return t.__data__}function c0(t,e){if(!arguments.length)return Array.from(this,a0);var n=e?l0:o0,i=this._parents,r=this._groups;typeof t!="function"&&(t=s0(t));for(var s=r.length,o=new Array(s),l=new Array(s),a=new Array(s),c=0;c<s;++c){var u=i[c],f=r[c],d=f.length,g=u0(t.call(u,u&&u.__data__,c,i)),m=g.length,w=l[c]=new Array(m),R=o[c]=new Array(m),v=a[c]=new Array(d);n(u,f,w,R,v,g,e);for(var I=0,T=0,_,O;I<m;++I)if(_=w[I]){for(I>=T&&(T=I+1);!(O=R[T])&&++T<m;);_._next=O||null}}return o=new zt(o,i),o._enter=l,o._exit=a,o}function u0(t){return typeof t=="object"&&"length"in t?t:Array.from(t)}function f0(){return new zt(this._exit||this._groups.map(Vc),this._parents)}function h0(t,e,n){var i=this.enter(),r=this,s=this.exit();return typeof t=="function"?(i=t(i),i&&(i=i.selection())):i=i.append(t+""),e!=null&&(r=e(r),r&&(r=r.selection())),n==null?s.remove():n(s),i&&r?i.merge(r).order():r}function d0(t){for(var e=t.selection?t.selection():t,n=this._groups,i=e._groups,r=n.length,s=i.length,o=Math.min(r,s),l=new Array(r),a=0;a<o;++a)for(var c=n[a],u=i[a],f=c.length,d=l[a]=new Array(f),g,m=0;m<f;++m)(g=c[m]||u[m])&&(d[m]=g);for(;a<r;++a)l[a]=n[a];return new zt(l,this._parents)}function p0(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var i=t[e],r=i.length-1,s=i[r],o;--r>=0;)(o=i[r])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function g0(t){t||(t=y0);function e(f,d){return f&&d?t(f.__data__,d.__data__):!f-!d}for(var n=this._groups,i=n.length,r=new Array(i),s=0;s<i;++s){for(var o=n[s],l=o.length,a=r[s]=new Array(l),c,u=0;u<l;++u)(c=o[u])&&(a[u]=c);a.sort(e)}return new zt(r,this._parents).order()}function y0(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}function m0(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function b0(){return Array.from(this)}function v0(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,s=i.length;r<s;++r){var o=i[r];if(o)return o}return null}function _0(){let t=0;for(const e of this)++t;return t}function x0(){return!this.node()}function w0(t){for(var e=this._groups,n=0,i=e.length;n<i;++n)for(var r=e[n],s=0,o=r.length,l;s<o;++s)(l=r[s])&&t.call(l,l.__data__,s,r);return this}function $0(t){return function(){this.removeAttribute(t)}}function k0(t){return function(){this.removeAttributeNS(t.space,t.local)}}function S0(t,e){return function(){this.setAttribute(t,e)}}function A0(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function E0(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttribute(t):this.setAttribute(t,n)}}function C0(t,e){return function(){var n=e.apply(this,arguments);n==null?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function M0(t,e){var n=Pr(t);if(arguments.length<2){var i=this.node();return n.local?i.getAttributeNS(n.space,n.local):i.getAttribute(n)}return this.each((e==null?n.local?k0:$0:typeof e=="function"?n.local?C0:E0:n.local?A0:S0)(n,e))}function Uc(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function P0(t){return function(){this.style.removeProperty(t)}}function T0(t,e,n){return function(){this.style.setProperty(t,e,n)}}function N0(t,e,n){return function(){var i=e.apply(this,arguments);i==null?this.style.removeProperty(t):this.style.setProperty(t,i,n)}}function R0(t,e,n){return arguments.length>1?this.each((e==null?P0:typeof e=="function"?N0:T0)(t,e,n??"")):$n(this.node(),t)}function $n(t,e){return t.style.getPropertyValue(e)||Uc(t).getComputedStyle(t,null).getPropertyValue(e)}function O0(t){return function(){delete this[t]}}function I0(t,e){return function(){this[t]=e}}function H0(t,e){return function(){var n=e.apply(this,arguments);n==null?delete this[t]:this[t]=n}}function F0(t,e){return arguments.length>1?this.each((e==null?O0:typeof e=="function"?H0:I0)(t,e)):this.node()[t]}function jc(t){return t.trim().split(/^|\s+/)}function Ho(t){return t.classList||new zc(t)}function zc(t){this._node=t,this._names=jc(t.getAttribute("class")||"")}zc.prototype={add:function(t){var e=this._names.indexOf(t);e<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};function Wc(t,e){for(var n=Ho(t),i=-1,r=e.length;++i<r;)n.add(e[i])}function Kc(t,e){for(var n=Ho(t),i=-1,r=e.length;++i<r;)n.remove(e[i])}function L0(t){return function(){Wc(this,t)}}function D0(t){return function(){Kc(this,t)}}function B0(t,e){return function(){(e.apply(this,arguments)?Wc:Kc)(this,t)}}function V0(t,e){var n=jc(t+"");if(arguments.length<2){for(var i=Ho(this.node()),r=-1,s=n.length;++r<s;)if(!i.contains(n[r]))return!1;return!0}return this.each((typeof e=="function"?B0:e?L0:D0)(n,e))}function U0(){this.textContent=""}function j0(t){return function(){this.textContent=t}}function z0(t){return function(){var e=t.apply(this,arguments);this.textContent=e??""}}function W0(t){return arguments.length?this.each(t==null?U0:(typeof t=="function"?z0:j0)(t)):this.node().textContent}function K0(){this.innerHTML=""}function G0(t){return function(){this.innerHTML=t}}function q0(t){return function(){var e=t.apply(this,arguments);this.innerHTML=e??""}}function J0(t){return arguments.length?this.each(t==null?K0:(typeof t=="function"?q0:G0)(t)):this.node().innerHTML}function Y0(){this.nextSibling&&this.parentNode.appendChild(this)}function X0(){return this.each(Y0)}function Z0(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Q0(){return this.each(Z0)}function t5(t){var e=typeof t=="function"?t:Fc(t);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function e5(){return null}function n5(t,e){var n=typeof t=="function"?t:Fc(t),i=e==null?e5:typeof e=="function"?e:Io(e);return this.select(function(){return this.insertBefore(n.apply(this,arguments),i.apply(this,arguments)||null)})}function i5(){var t=this.parentNode;t&&t.removeChild(this)}function r5(){return this.each(i5)}function s5(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function o5(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function l5(t){return this.select(t?o5:s5)}function a5(t){return arguments.length?this.property("__data__",t):this.node().__data__}function c5(t){return function(e){t.call(this,e,this.__data__)}}function u5(t){return t.trim().split(/^|\s+/).map(function(e){var n="",i=e.indexOf(".");return i>=0&&(n=e.slice(i+1),e=e.slice(0,i)),{type:e,name:n}})}function f5(t){return function(){var e=this.__on;if(e){for(var n=0,i=-1,r=e.length,s;n<r;++n)s=e[n],(!t.type||s.type===t.type)&&s.name===t.name?this.removeEventListener(s.type,s.listener,s.options):e[++i]=s;++i?e.length=i:delete this.__on}}}function h5(t,e,n){return function(){var i=this.__on,r,s=c5(e);if(i){for(var o=0,l=i.length;o<l;++o)if((r=i[o]).type===t.type&&r.name===t.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=s,r.options=n),r.value=e;return}}this.addEventListener(t.type,s,n),r={type:t.type,name:t.name,value:e,listener:s,options:n},i?i.push(r):this.__on=[r]}}function d5(t,e,n){var i=u5(t+""),r,s=i.length,o;if(arguments.length<2){var l=this.node().__on;if(l){for(var a=0,c=l.length,u;a<c;++a)for(r=0,u=l[a];r<s;++r)if((o=i[r]).type===u.type&&o.name===u.name)return u.value}return}for(l=e?h5:f5,r=0;r<s;++r)this.each(l(i[r],e,n));return this}function Gc(t,e,n){var i=Uc(t),r=i.CustomEvent;typeof r=="function"?r=new r(e,n):(r=i.document.createEvent("Event"),n?(r.initEvent(e,n.bubbles,n.cancelable),r.detail=n.detail):r.initEvent(e,!1,!1)),t.dispatchEvent(r)}function p5(t,e){return function(){return Gc(this,t,e)}}function g5(t,e){return function(){return Gc(this,t,e.apply(this,arguments))}}function y5(t,e){return this.each((typeof e=="function"?g5:p5)(t,e))}function*m5(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var i=t[e],r=0,s=i.length,o;r<s;++r)(o=i[r])&&(yield o)}var qc=[null];function zt(t,e){this._groups=t,this._parents=e}function mi(){return new zt([[document.documentElement]],qc)}function b5(){return this}zt.prototype=mi.prototype={constructor:zt,select:zg,selectAll:qg,selectChild:Zg,selectChildren:n0,filter:i0,data:c0,enter:r0,exit:f0,join:h0,merge:d0,selection:b5,order:p0,sort:g0,call:m0,nodes:b0,node:v0,size:_0,empty:x0,each:w0,attr:M0,style:R0,property:F0,classed:V0,text:W0,html:J0,raise:X0,lower:Q0,append:t5,insert:n5,remove:r5,clone:l5,datum:a5,on:d5,dispatch:y5,[Symbol.iterator]:m5};function Fi(t){return typeof t=="string"?new zt([[document.querySelector(t)]],[document.documentElement]):new zt([[t]],qc)}function v5(t){let e;for(;e=t.sourceEvent;)t=e;return t}function _5(t,e){if(t=v5(t),e===void 0&&(e=t.currentTarget),e){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var i=n.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,i=i.matrixTransform(e.getScreenCTM().inverse()),[i.x,i.y]}if(e.getBoundingClientRect){var r=e.getBoundingClientRect();return[t.clientX-r.left-e.clientLeft,t.clientY-r.top-e.clientTop]}}return[t.pageX,t.pageY]}function Li(t,e){return t==null||e==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function x5(t,e){return t==null||e==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function Jc(t){let e,n,i;t.length!==2?(e=Li,n=(l,a)=>Li(t(l),a),i=(l,a)=>t(l)-a):(e=t===Li||t===x5?t:w5,n=t,i=t);function r(l,a,c=0,u=l.length){if(c<u){if(e(a,a)!==0)return u;do{const f=c+u>>>1;n(l[f],a)<0?c=f+1:u=f}while(c<u)}return c}function s(l,a,c=0,u=l.length){if(c<u){if(e(a,a)!==0)return u;do{const f=c+u>>>1;n(l[f],a)<=0?c=f+1:u=f}while(c<u)}return c}function o(l,a,c=0,u=l.length){const f=r(l,a,c,u-1);return f>c&&i(l[f-1],a)>-i(l[f],a)?f-1:f}return{left:r,center:o,right:s}}function w5(){return 0}function $5(t){return t===null?NaN:+t}const k5=Jc(Li),S5=k5.right;Jc($5).center;const A5=Math.sqrt(50),E5=Math.sqrt(10),C5=Math.sqrt(2);function ar(t,e,n){const i=(e-t)/Math.max(0,n),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),o=s>=A5?10:s>=E5?5:s>=C5?2:1;let l,a,c;return r<0?(c=Math.pow(10,-r)/o,l=Math.round(t*c),a=Math.round(e*c),l/c<t&&++l,a/c>e&&--a,c=-c):(c=Math.pow(10,r)*o,l=Math.round(t/c),a=Math.round(e/c),l*c<t&&++l,a*c>e&&--a),a<l&&.5<=n&&n<2?ar(t,e,n*2):[l,a,c]}function M5(t,e,n){if(e=+e,t=+t,n=+n,!(n>0))return[];if(t===e)return[t];const i=e<t,[r,s,o]=i?ar(e,t,n):ar(t,e,n);if(!(s>=r))return[];const l=s-r+1,a=new Array(l);if(i)if(o<0)for(let c=0;c<l;++c)a[c]=(s-c)/-o;else for(let c=0;c<l;++c)a[c]=(s-c)*o;else if(o<0)for(let c=0;c<l;++c)a[c]=(r+c)/-o;else for(let c=0;c<l;++c)a[c]=(r+c)*o;return a}function Cs(t,e,n){return e=+e,t=+t,n=+n,ar(t,e,n)[2]}function P5(t,e,n){e=+e,t=+t,n=+n;const i=e<t,r=i?Cs(e,t,n):Cs(t,e,n);return(i?-1:1)*(r<0?1/-r:r)}function T5(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);break}return this}function N5(t){return function(){return t}}function R5(t){return+t}var Kl=[0,1];function pn(t){return t}function Ms(t,e){return(e-=t=+t)?function(n){return(n-t)/e}:N5(isNaN(e)?NaN:.5)}function O5(t,e){var n;return t>e&&(n=t,t=e,e=n),function(i){return Math.max(t,Math.min(e,i))}}function I5(t,e,n){var i=t[0],r=t[1],s=e[0],o=e[1];return r<i?(i=Ms(r,i),s=n(o,s)):(i=Ms(i,r),s=n(s,o)),function(l){return s(i(l))}}function H5(t,e,n){var i=Math.min(t.length,e.length)-1,r=new Array(i),s=new Array(i),o=-1;for(t[i]<t[0]&&(t=t.slice().reverse(),e=e.slice().reverse());++o<i;)r[o]=Ms(t[o],t[o+1]),s[o]=n(e[o],e[o+1]);return function(l){var a=S5(t,l,1,i)-1;return s[a](r[a](l))}}function F5(t,e){return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function L5(){var t=Kl,e=Kl,n=vn,i,r,s,o=pn,l,a,c;function u(){var d=Math.min(t.length,e.length);return o!==pn&&(o=O5(t[0],t[d-1])),l=d>2?H5:I5,a=c=null,f}function f(d){return d==null||isNaN(d=+d)?s:(a||(a=l(t.map(i),e,n)))(i(o(d)))}return f.invert=function(d){return o(r((c||(c=l(e,t.map(i),Jt)))(d)))},f.domain=function(d){return arguments.length?(t=Array.from(d,R5),u()):t.slice()},f.range=function(d){return arguments.length?(e=Array.from(d),u()):e.slice()},f.rangeRound=function(d){return e=Array.from(d),n=Hg,u()},f.clamp=function(d){return arguments.length?(o=d?!0:pn,u()):o!==pn},f.interpolate=function(d){return arguments.length?(n=d,u()):n},f.unknown=function(d){return arguments.length?(s=d,f):s},function(d,g){return i=d,r=g,u()}}function D5(){return L5()(pn,pn)}function B5(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function cr(t,e){if((n=(t=e?t.toExponential(e-1):t.toExponential()).indexOf("e"))<0)return null;var n,i=t.slice(0,n);return[i.length>1?i[0]+i.slice(2):i,+t.slice(n+1)]}function kn(t){return t=cr(Math.abs(t)),t?t[1]:NaN}function V5(t,e){return function(n,i){for(var r=n.length,s=[],o=0,l=t[0],a=0;r>0&&l>0&&(a+l+1>i&&(l=Math.max(1,i-a)),s.push(n.substring(r-=l,r+l)),!((a+=l+1)>i));)l=t[o=(o+1)%t.length];return s.reverse().join(e)}}function U5(t){return function(e){return e.replace(/[0-9]/g,function(n){return t[+n]})}}var j5=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function ur(t){if(!(e=j5.exec(t)))throw new Error("invalid format: "+t);var e;return new Fo({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}ur.prototype=Fo.prototype;function Fo(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}Fo.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function z5(t){t:for(var e=t.length,n=1,i=-1,r;n<e;++n)switch(t[n]){case".":i=r=n;break;case"0":i===0&&(i=n),r=n;break;default:if(!+t[n])break t;i>0&&(i=0);break}return i>0?t.slice(0,i)+t.slice(r+1):t}var Yc;function W5(t,e){var n=cr(t,e);if(!n)return t+"";var i=n[0],r=n[1],s=r-(Yc=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,o=i.length;return s===o?i:s>o?i+new Array(s-o+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+cr(t,Math.max(0,e+s-1))[0]}function Gl(t,e){var n=cr(t,e);if(!n)return t+"";var i=n[0],r=n[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const ql={"%":(t,e)=>(t*100).toFixed(e),b:t=>Math.round(t).toString(2),c:t=>t+"",d:B5,e:(t,e)=>t.toExponential(e),f:(t,e)=>t.toFixed(e),g:(t,e)=>t.toPrecision(e),o:t=>Math.round(t).toString(8),p:(t,e)=>Gl(t*100,e),r:Gl,s:W5,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function Jl(t){return t}var Yl=Array.prototype.map,Xl=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function K5(t){var e=t.grouping===void 0||t.thousands===void 0?Jl:V5(Yl.call(t.grouping,Number),t.thousands+""),n=t.currency===void 0?"":t.currency[0]+"",i=t.currency===void 0?"":t.currency[1]+"",r=t.decimal===void 0?".":t.decimal+"",s=t.numerals===void 0?Jl:U5(Yl.call(t.numerals,String)),o=t.percent===void 0?"%":t.percent+"",l=t.minus===void 0?"−":t.minus+"",a=t.nan===void 0?"NaN":t.nan+"";function c(f){f=ur(f);var d=f.fill,g=f.align,m=f.sign,w=f.symbol,R=f.zero,v=f.width,I=f.comma,T=f.precision,_=f.trim,O=f.type;O==="n"?(I=!0,O="g"):ql[O]||(T===void 0&&(T=12),_=!0,O="g"),(R||d==="0"&&g==="=")&&(R=!0,d="0",g="=");var G=w==="$"?n:w==="#"&&/[boxX]/.test(O)?"0"+O.toLowerCase():"",Q=w==="$"?i:/[%p]/.test(O)?o:"",ot=ql[O],tt=/[defgprs%]/.test(O);T=T===void 0?6:/[gprs]/.test(O)?Math.max(1,Math.min(21,T)):Math.max(0,Math.min(20,T));function nt(A){var V=G,C=Q,W,Pt,ct;if(O==="c")C=ot(A)+C,A="";else{A=+A;var J=A<0||1/A<0;if(A=isNaN(A)?a:ot(Math.abs(A),T),_&&(A=z5(A)),J&&+A==0&&m!=="+"&&(J=!1),V=(J?m==="("?m:l:m==="-"||m==="("?"":m)+V,C=(O==="s"?Xl[8+Yc/3]:"")+C+(J&&m==="("?")":""),tt){for(W=-1,Pt=A.length;++W<Pt;)if(ct=A.charCodeAt(W),48>ct||ct>57){C=(ct===46?r+A.slice(W+1):A.slice(W))+C,A=A.slice(0,W);break}}}I&&!R&&(A=e(A,1/0));var L=V.length+A.length+C.length,it=L<v?new Array(v-L+1).join(d):"";switch(I&&R&&(A=e(it+A,it.length?v-C.length:1/0),it=""),g){case"<":A=V+A+C+it;break;case"=":A=V+it+A+C;break;case"^":A=it.slice(0,L=it.length>>1)+V+A+C+it.slice(L);break;default:A=it+V+A+C;break}return s(A)}return nt.toString=function(){return f+""},nt}function u(f,d){var g=c((f=ur(f),f.type="f",f)),m=Math.max(-8,Math.min(8,Math.floor(kn(d)/3)))*3,w=Math.pow(10,-m),R=Xl[8+m/3];return function(v){return g(w*v)+R}}return{format:c,formatPrefix:u}}var Ci,Xc,Zc;G5({thousands:",",grouping:[3],currency:["$",""]});function G5(t){return Ci=K5(t),Xc=Ci.format,Zc=Ci.formatPrefix,Ci}function q5(t){return Math.max(0,-kn(Math.abs(t)))}function J5(t,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(kn(e)/3)))*3-kn(Math.abs(t)))}function Y5(t,e){return t=Math.abs(t),e=Math.abs(e)-t,Math.max(0,kn(e)-kn(t))+1}function X5(t,e,n,i){var r=P5(t,e,n),s;switch(i=ur(i??",f"),i.type){case"s":{var o=Math.max(Math.abs(t),Math.abs(e));return i.precision==null&&!isNaN(s=J5(r,o))&&(i.precision=s),Zc(i,o)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=Y5(r,Math.max(Math.abs(t),Math.abs(e))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=q5(r))&&(i.precision=s-(i.type==="%")*2);break}}return Xc(i)}function Z5(t){var e=t.domain;return t.ticks=function(n){var i=e();return M5(i[0],i[i.length-1],n??10)},t.tickFormat=function(n,i){var r=e();return X5(r[0],r[r.length-1],n??10,i)},t.nice=function(n){n==null&&(n=10);var i=e(),r=0,s=i.length-1,o=i[r],l=i[s],a,c,u=10;for(l<o&&(c=o,o=l,l=c,c=r,r=s,s=c);u-- >0;){if(c=Cs(o,l,n),c===a)return i[r]=o,i[s]=l,e(i);if(c>0)o=Math.floor(o/c)*c,l=Math.ceil(l/c)*c;else if(c<0)o=Math.ceil(o*c)/c,l=Math.floor(l*c)/c;else break;a=c}return t},t}function Di(){var t=D5();return t.copy=function(){return F5(t,Di())},T5.apply(t,arguments),Z5(t)}var Q5={value:()=>{}};function Qc(){for(var t=0,e=arguments.length,n={},i;t<e;++t){if(!(i=arguments[t]+"")||i in n||/[\s.]/.test(i))throw new Error("illegal type: "+i);n[i]=[]}return new Bi(n)}function Bi(t){this._=t}function ty(t,e){return t.trim().split(/^|\s+/).map(function(n){var i="",r=n.indexOf(".");if(r>=0&&(i=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:i}})}Bi.prototype=Qc.prototype={constructor:Bi,on:function(t,e){var n=this._,i=ty(t+"",n),r,s=-1,o=i.length;if(arguments.length<2){for(;++s<o;)if((r=(t=i[s]).type)&&(r=ey(n[r],t.name)))return r;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(r=(t=i[s]).type)n[r]=Zl(n[r],t.name,e);else if(e==null)for(r in n)n[r]=Zl(n[r],t.name,null);return this},copy:function(){var t={},e=this._;for(var n in e)t[n]=e[n].slice();return new Bi(t)},call:function(t,e){if((r=arguments.length-2)>0)for(var n=new Array(r),i=0,r,s;i<r;++i)n[i]=arguments[i+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(s=this._[t],i=0,r=s.length;i<r;++i)s[i].value.apply(e,n)},apply:function(t,e,n){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var i=this._[t],r=0,s=i.length;r<s;++r)i[r].value.apply(e,n)}};function ey(t,e){for(var n=0,i=t.length,r;n<i;++n)if((r=t[n]).name===e)return r.value}function Zl(t,e,n){for(var i=0,r=t.length;i<r;++i)if(t[i].name===e){t[i]=Q5,t=t.slice(0,i).concat(t.slice(i+1));break}return n!=null&&t.push({name:e,value:n}),t}var Sn=0,Rn=0,Pn=0,tu=1e3,fr,On,hr=0,on=0,Tr=0,di=typeof performance=="object"&&performance.now?performance:Date,eu=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function Lo(){return on||(eu(ny),on=di.now()+Tr)}function ny(){on=0}function dr(){this._call=this._time=this._next=null}dr.prototype=nu.prototype={constructor:dr,restart:function(t,e,n){if(typeof t!="function")throw new TypeError("callback is not a function");n=(n==null?Lo():+n)+(e==null?0:+e),!this._next&&On!==this&&(On?On._next=this:fr=this,On=this),this._call=t,this._time=n,Ps()},stop:function(){this._call&&(this._call=null,this._time=1/0,Ps())}};function nu(t,e,n){var i=new dr;return i.restart(t,e,n),i}function iy(){Lo(),++Sn;for(var t=fr,e;t;)(e=on-t._time)>=0&&t._call.call(void 0,e),t=t._next;--Sn}function Ql(){on=(hr=di.now())+Tr,Sn=Rn=0;try{iy()}finally{Sn=0,sy(),on=0}}function ry(){var t=di.now(),e=t-hr;e>tu&&(Tr-=e,hr=t)}function sy(){for(var t,e=fr,n,i=1/0;e;)e._call?(i>e._time&&(i=e._time),t=e,e=e._next):(n=e._next,e._next=null,e=t?t._next=n:fr=n);On=t,Ps(i)}function Ps(t){if(!Sn){Rn&&(Rn=clearTimeout(Rn));var e=t-on;e>24?(t<1/0&&(Rn=setTimeout(Ql,t-di.now()-Tr)),Pn&&(Pn=clearInterval(Pn))):(Pn||(hr=di.now(),Pn=setInterval(ry,tu)),Sn=1,eu(Ql))}}function ta(t,e,n){var i=new dr;return e=e==null?0:+e,i.restart(r=>{i.stop(),t(r+e)},e,n),i}var oy=Qc("start","end","cancel","interrupt"),ly=[],iu=0,ea=1,Ts=2,Vi=3,na=4,Ns=5,Ui=6;function Nr(t,e,n,i,r,s){var o=t.__transition;if(!o)t.__transition={};else if(n in o)return;ay(t,n,{name:e,index:i,group:r,on:oy,tween:ly,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:iu})}function Do(t,e){var n=te(t,e);if(n.state>iu)throw new Error("too late; already scheduled");return n}function ge(t,e){var n=te(t,e);if(n.state>Vi)throw new Error("too late; already running");return n}function te(t,e){var n=t.__transition;if(!n||!(n=n[e]))throw new Error("transition not found");return n}function ay(t,e,n){var i=t.__transition,r;i[e]=n,n.timer=nu(s,0,n.time);function s(c){n.state=ea,n.timer.restart(o,n.delay,n.time),n.delay<=c&&o(c-n.delay)}function o(c){var u,f,d,g;if(n.state!==ea)return a();for(u in i)if(g=i[u],g.name===n.name){if(g.state===Vi)return ta(o);g.state===na?(g.state=Ui,g.timer.stop(),g.on.call("interrupt",t,t.__data__,g.index,g.group),delete i[u]):+u<e&&(g.state=Ui,g.timer.stop(),g.on.call("cancel",t,t.__data__,g.index,g.group),delete i[u])}if(ta(function(){n.state===Vi&&(n.state=na,n.timer.restart(l,n.delay,n.time),l(c))}),n.state=Ts,n.on.call("start",t,t.__data__,n.index,n.group),n.state===Ts){for(n.state=Vi,r=new Array(d=n.tween.length),u=0,f=-1;u<d;++u)(g=n.tween[u].value.call(t,t.__data__,n.index,n.group))&&(r[++f]=g);r.length=f+1}}function l(c){for(var u=c<n.duration?n.ease.call(null,c/n.duration):(n.timer.restart(a),n.state=Ns,1),f=-1,d=r.length;++f<d;)r[f].call(t,u);n.state===Ns&&(n.on.call("end",t,t.__data__,n.index,n.group),a())}function a(){n.state=Ui,n.timer.stop(),delete i[e];for(var c in i)return;delete t.__transition}}function cy(t,e){var n=t.__transition,i,r,s=!0,o;if(n){e=e==null?null:e+"";for(o in n){if((i=n[o]).name!==e){s=!1;continue}r=i.state>Ts&&i.state<Ns,i.state=Ui,i.timer.stop(),i.on.call(r?"interrupt":"cancel",t,t.__data__,i.index,i.group),delete n[o]}s&&delete t.__transition}}function uy(t){return this.each(function(){cy(this,t)})}function fy(t,e){var n,i;return function(){var r=ge(this,t),s=r.tween;if(s!==n){i=n=s;for(var o=0,l=i.length;o<l;++o)if(i[o].name===e){i=i.slice(),i.splice(o,1);break}}r.tween=i}}function hy(t,e,n){var i,r;if(typeof n!="function")throw new Error;return function(){var s=ge(this,t),o=s.tween;if(o!==i){r=(i=o).slice();for(var l={name:e,value:n},a=0,c=r.length;a<c;++a)if(r[a].name===e){r[a]=l;break}a===c&&r.push(l)}s.tween=r}}function dy(t,e){var n=this._id;if(t+="",arguments.length<2){for(var i=te(this.node(),n).tween,r=0,s=i.length,o;r<s;++r)if((o=i[r]).name===t)return o.value;return null}return this.each((e==null?fy:hy)(n,t,e))}function Bo(t,e,n){var i=t._id;return t.each(function(){var r=ge(this,i);(r.value||(r.value={}))[e]=n.apply(this,arguments)}),function(r){return te(r,i).value[e]}}function ru(t,e){var n;return(typeof e=="number"?Jt:e instanceof $e?or:(n=$e(e))?(e=n,or):Oc)(t,e)}function py(t){return function(){this.removeAttribute(t)}}function gy(t){return function(){this.removeAttributeNS(t.space,t.local)}}function yy(t,e,n){var i,r=n+"",s;return function(){var o=this.getAttribute(t);return o===r?null:o===i?s:s=e(i=o,n)}}function my(t,e,n){var i,r=n+"",s;return function(){var o=this.getAttributeNS(t.space,t.local);return o===r?null:o===i?s:s=e(i=o,n)}}function by(t,e,n){var i,r,s;return function(){var o,l=n(this),a;return l==null?void this.removeAttribute(t):(o=this.getAttribute(t),a=l+"",o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l)))}}function vy(t,e,n){var i,r,s;return function(){var o,l=n(this),a;return l==null?void this.removeAttributeNS(t.space,t.local):(o=this.getAttributeNS(t.space,t.local),a=l+"",o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l)))}}function _y(t,e){var n=Pr(t),i=n==="transform"?Bg:ru;return this.attrTween(t,typeof e=="function"?(n.local?vy:by)(n,i,Bo(this,"attr."+t,e)):e==null?(n.local?gy:py)(n):(n.local?my:yy)(n,i,e))}function xy(t,e){return function(n){this.setAttribute(t,e.call(this,n))}}function wy(t,e){return function(n){this.setAttributeNS(t.space,t.local,e.call(this,n))}}function $y(t,e){var n,i;function r(){var s=e.apply(this,arguments);return s!==i&&(n=(i=s)&&wy(t,s)),n}return r._value=e,r}function ky(t,e){var n,i;function r(){var s=e.apply(this,arguments);return s!==i&&(n=(i=s)&&xy(t,s)),n}return r._value=e,r}function Sy(t,e){var n="attr."+t;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;var i=Pr(t);return this.tween(n,(i.local?$y:ky)(i,e))}function Ay(t,e){return function(){Do(this,t).delay=+e.apply(this,arguments)}}function Ey(t,e){return e=+e,function(){Do(this,t).delay=e}}function Cy(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?Ay:Ey)(e,t)):te(this.node(),e).delay}function My(t,e){return function(){ge(this,t).duration=+e.apply(this,arguments)}}function Py(t,e){return e=+e,function(){ge(this,t).duration=e}}function Ty(t){var e=this._id;return arguments.length?this.each((typeof t=="function"?My:Py)(e,t)):te(this.node(),e).duration}function Ny(t,e){if(typeof e!="function")throw new Error;return function(){ge(this,t).ease=e}}function Ry(t){var e=this._id;return arguments.length?this.each(Ny(e,t)):te(this.node(),e).ease}function Oy(t,e){return function(){var n=e.apply(this,arguments);if(typeof n!="function")throw new Error;ge(this,t).ease=n}}function Iy(t){if(typeof t!="function")throw new Error;return this.each(Oy(this._id,t))}function Hy(t){typeof t!="function"&&(t=Dc(t));for(var e=this._groups,n=e.length,i=new Array(n),r=0;r<n;++r)for(var s=e[r],o=s.length,l=i[r]=[],a,c=0;c<o;++c)(a=s[c])&&t.call(a,a.__data__,c,s)&&l.push(a);return new ke(i,this._parents,this._name,this._id)}function Fy(t){if(t._id!==this._id)throw new Error;for(var e=this._groups,n=t._groups,i=e.length,r=n.length,s=Math.min(i,r),o=new Array(i),l=0;l<s;++l)for(var a=e[l],c=n[l],u=a.length,f=o[l]=new Array(u),d,g=0;g<u;++g)(d=a[g]||c[g])&&(f[g]=d);for(;l<i;++l)o[l]=e[l];return new ke(o,this._parents,this._name,this._id)}function Ly(t){return(t+"").trim().split(/^|\s+/).every(function(e){var n=e.indexOf(".");return n>=0&&(e=e.slice(0,n)),!e||e==="start"})}function Dy(t,e,n){var i,r,s=Ly(e)?Do:ge;return function(){var o=s(this,t),l=o.on;l!==i&&(r=(i=l).copy()).on(e,n),o.on=r}}function By(t,e){var n=this._id;return arguments.length<2?te(this.node(),n).on.on(t):this.each(Dy(n,t,e))}function Vy(t){return function(){var e=this.parentNode;for(var n in this.__transition)if(+n!==t)return;e&&e.removeChild(this)}}function Uy(){return this.on("end.remove",Vy(this._id))}function jy(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Io(t));for(var i=this._groups,r=i.length,s=new Array(r),o=0;o<r;++o)for(var l=i[o],a=l.length,c=s[o]=new Array(a),u,f,d=0;d<a;++d)(u=l[d])&&(f=t.call(u,u.__data__,d,l))&&("__data__"in u&&(f.__data__=u.__data__),c[d]=f,Nr(c[d],e,n,d,c,te(u,n)));return new ke(s,this._parents,e,n)}function zy(t){var e=this._name,n=this._id;typeof t!="function"&&(t=Lc(t));for(var i=this._groups,r=i.length,s=[],o=[],l=0;l<r;++l)for(var a=i[l],c=a.length,u,f=0;f<c;++f)if(u=a[f]){for(var d=t.call(u,u.__data__,f,a),g,m=te(u,n),w=0,R=d.length;w<R;++w)(g=d[w])&&Nr(g,e,n,w,d,m);s.push(d),o.push(u)}return new ke(s,o,e,n)}var Wy=mi.prototype.constructor;function Ky(){return new Wy(this._groups,this._parents)}function Gy(t,e){var n,i,r;return function(){var s=$n(this,t),o=(this.style.removeProperty(t),$n(this,t));return s===o?null:s===n&&o===i?r:r=e(n=s,i=o)}}function su(t){return function(){this.style.removeProperty(t)}}function qy(t,e,n){var i,r=n+"",s;return function(){var o=$n(this,t);return o===r?null:o===i?s:s=e(i=o,n)}}function Jy(t,e,n){var i,r,s;return function(){var o=$n(this,t),l=n(this),a=l+"";return l==null&&(a=l=(this.style.removeProperty(t),$n(this,t))),o===a?null:o===i&&a===r?s:(r=a,s=e(i=o,l))}}function Yy(t,e){var n,i,r,s="style."+e,o="end."+s,l;return function(){var a=ge(this,t),c=a.on,u=a.value[s]==null?l||(l=su(e)):void 0;(c!==n||r!==u)&&(i=(n=c).copy()).on(o,r=u),a.on=i}}function Xy(t,e,n){var i=(t+="")=="transform"?Dg:ru;return e==null?this.styleTween(t,Gy(t,i)).on("end.style."+t,su(t)):typeof e=="function"?this.styleTween(t,Jy(t,i,Bo(this,"style."+t,e))).each(Yy(this._id,t)):this.styleTween(t,qy(t,i,e),n).on("end.style."+t,null)}function Zy(t,e,n){return function(i){this.style.setProperty(t,e.call(this,i),n)}}function Qy(t,e,n){var i,r;function s(){var o=e.apply(this,arguments);return o!==r&&(i=(r=o)&&Zy(t,o,n)),i}return s._value=e,s}function tm(t,e,n){var i="style."+(t+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(e==null)return this.tween(i,null);if(typeof e!="function")throw new Error;return this.tween(i,Qy(t,e,n??""))}function em(t){return function(){this.textContent=t}}function nm(t){return function(){var e=t(this);this.textContent=e??""}}function im(t){return this.tween("text",typeof t=="function"?nm(Bo(this,"text",t)):em(t==null?"":t+""))}function rm(t){return function(e){this.textContent=t.call(this,e)}}function sm(t){var e,n;function i(){var r=t.apply(this,arguments);return r!==n&&(e=(n=r)&&rm(r)),e}return i._value=t,i}function om(t){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(t==null)return this.tween(e,null);if(typeof t!="function")throw new Error;return this.tween(e,sm(t))}function lm(){for(var t=this._name,e=this._id,n=ou(),i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],l=o.length,a,c=0;c<l;++c)if(a=o[c]){var u=te(a,e);Nr(a,t,n,c,o,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new ke(i,this._parents,t,n)}function am(){var t,e,n=this,i=n._id,r=n.size();return new Promise(function(s,o){var l={value:o},a={value:function(){--r===0&&s()}};n.each(function(){var c=ge(this,i),u=c.on;u!==t&&(e=(t=u).copy(),e._.cancel.push(l),e._.interrupt.push(l),e._.end.push(a)),c.on=e}),r===0&&s()})}var cm=0;function ke(t,e,n,i){this._groups=t,this._parents=e,this._name=n,this._id=i}function ou(){return++cm}var be=mi.prototype;ke.prototype={constructor:ke,select:jy,selectAll:zy,selectChild:be.selectChild,selectChildren:be.selectChildren,filter:Hy,merge:Fy,selection:Ky,transition:lm,call:be.call,nodes:be.nodes,node:be.node,size:be.size,empty:be.empty,each:be.each,on:By,attr:_y,attrTween:Sy,style:Xy,styleTween:tm,text:im,textTween:om,remove:Uy,tween:dy,delay:Cy,duration:Ty,ease:Ry,easeVarying:Iy,end:am,[Symbol.iterator]:be[Symbol.iterator]};var um={time:null,delay:0,duration:250,ease:Sg};function fm(t,e){for(var n;!(n=t.__transition)||!(n=n[e]);)if(!(t=t.parentNode))throw new Error(`transition ${e} not found`);return n}function hm(t){var e,n;t instanceof ke?(e=t._id,t=t._name):(e=ou(),(n=um).time=Lo(),t=t==null?null:t+"");for(var i=this._groups,r=i.length,s=0;s<r;++s)for(var o=i[s],l=o.length,a,c=0;c<l;++c)(a=o[c])&&Nr(a,t,e,c,o,n||fm(a,e));return new ke(i,this._parents,t,e)}mi.prototype.interrupt=uy;mi.prototype.transition=hm;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lu="important",dm=" !"+lu,In=To(class extends No{constructor(t){var e;if(super(t),t.type!==Ac.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,n)=>{const i=t[n];return i==null?e:e+`${n=n.includes("-")?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:n}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?n.removeProperty(i):n[i]=null);for(const i in e){const r=e[i];if(r!=null){this.ft.add(i);const s=typeof r=="string"&&r.endsWith(dm);i.includes("-")||s?n.setProperty(i,s?r.slice(0,-11):r,s?lu:""):n[i]=r}}return sn}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ia=t=>jp(t)?t._$litType$.h:t.strings,ra=To(class extends No{constructor(t){super(t),this.et=new WeakMap}render(t){return[t]}update(t,[e]){const n=Ml(this.it)?ia(this.it):null,i=Ml(e)?ia(e):null;if(n!==null&&(i===null||n!==i)){const r=Rl(t).pop();let s=this.et.get(n);if(s===void 0){const o=document.createDocumentFragment();s=Sc(vt,o),s.setConnected(!1),this.et.set(n,s)}Nl(s,[r]),Tl(s,void 0,r)}if(i!==null){if(n===null||n!==i){const r=this.et.get(i);if(r!==void 0){const s=Rl(r).pop();Kp(t),Tl(t,void 0,s),Nl(t,[s])}}this.it=e}else this.it=void 0;return this.render(e)}}),Vo=[[.9921568627450981,.9647058823529412,.9294117647058824],[.8901960784313725,.1411764705882353,.12941176470588237],[.9529411764705882,.9019607843137255,0],[.9411764705882353,.5568627450980392,.10980392156862745],[.08627450980392157,.6,.8549019607843137],[.47058823529411764,.13333333333333333,.6666666666666666],[0,.5568627450980392,.3568627450980392],[.11372549019607843,.10980392156862745,.10980392156862745]],pm=[[253/255,246/255,237/255],[247/255,45/255,41/255],[253/255,203/255,0/255],[250/255,102/255,13/255],[17/255,97/255,170/255],[101/255,57/255,138/255],[70/255,139/255,73/255],[29/255,28/255,28/255]],gm=[[1,1,1],[1,0,0],[1,1,0],[1,.5,0],[.163,.373,.6],[.5,0,.5],[0,.66,.2],[.2,.094,0]],ym=[[245/255,238/255,226/255],[170/255,14/255,1/255],[224/255,178/255,0/255],[217/255,104/255,5/255],[18/255,107/255,145/255],[103/255,15/255,128/255],[88/255,133/255,30/255],[44/255,37/255,30/255]],mm=[[254/255,250/255,226/255],[237/255,55/255,58/255],[255/255,233/255,111/255],[250/255,102/255,13/255],[33/255,112/255,163/255],[238/255,131/255,154/255],[59/255,155/255,83/255],[24/255,10/255,1/255]],bm=[[255/255,255/255,255/255],[218/255,105/255,104/255],[255/255,244/255,122/255],[232/255,154/255,113/255],[73/255,138/255,186/255],[97/255,96/255,178/255],[144/255,191/255,140/255],[8/255,8/255,8/255]],vm=[[240/255,234/255,214/255],[204/255,50/255,53/255],[253/255,222/255,20/255],[230/255,152/255,92/255],[1/255,88/255,140/255],[107/255,51/255,111/255],[51/255,138/255,92/255],[55/255,39/255,23/255]],_m=[[249/255,232/255,209/255],[216/255,43/255,59/255],[231/255,175/255,2/255],[224/255,89/255,31/255],[92/255,123/255,145/255],[77/255,58/255,78/255],[107/255,129/255,53/255],[14/255,8/255,7/255]],xm=[[239/255,235/255,225/255],[182/255,53/255,55/255],[253/255,203/255,0/255],[222/255,69/255,20/255],[95/255,157/255,191/255],[83/255,70/255,98/255],[58/255,90/255,66/255],[8/255,9/255,13/255]],wm=[[228/255,218/255,197/255],[181/255,65/255,60/255],[229/255,193/255,81/255],[220/255,137/255,61/255],[59/255,143/255,171/255],[121/255,97/255,134/255],[13/255,170/255,114/255],[46/255,44/255,38/255]],$m=[[206/255,205/255,209/255],[181/255,38/255,54/255],[221/255,187/255,23/255],[208/255,120/255,37/255],[10/255,71/255,129/255],[101/255,36/255,66/255],[75/255,129/255,131/255],[26/255,30/255,47/255]],km=[[237/255,213/255,177/255],[167/255,33/255,28/255],[245/255,181/255,18/255],[204/255,93/255,46/255],[71/255,122/255,141/255],[99/255,79/255,93/255],[109/255,143/255,118/255],[44/255,44/255,37/255]],Sm=[[240/255,236/255,235/255],[247/255,65/255,51/255],[243/255,187/255,6/255],[251/255,130/255,2/255],[37/255,71/255,169/255],[176/255,121/255,177/255],[2/255,117/255,111/255],[41/255,42/255,45/255]],Am=[[231/255,235/255,237/255],[229/255,30/255,38/255],[255/255,198/255,12/255],[245/255,119/255,34/255],[17/255,97/255,170/255],[139/255,47/255,146/255],[1/255,167/255,98/255],[0/255,0/255,1/255]],Em=[[236/255,237/255,241/255],[200/255,75/255,49/255],[235/255,207/255,13/255],[228/255,168/255,21/255],[39/255,108/255,176/255],[188/255,57/255,104/255],[122/255,176/255,62/255],[4/255,4/255,4/255]],Cm=[[241/255,236/255,230/255],[185/255,34/255,17/255],[231/255,200/255,52/255],[232/255,90/255,26/255],[26/255,70/255,79/255],[82/255,15/255,47/255],[67/255,111/255,33/255],[29/255,28/255,28/255]],Mm=[[215/255,208/255,180/255],[202/255,0/255,17/255],[220/255,170/255,0/255],[229/255,76/255,32/255],[0/255,126/255,157/255],[137/255,37/255,79/255],[0/255,110/255,60/255],[31/255,27/255,28/255]],Pm=[[236/255,231/255,213/255],[188/255,32/255,43/255],[233/255,201/255,0/255],[197/255,72/255,30/255],[50/255,42/255,115/255],[116/255,48/255,101/255],[69/255,118/255,61/255],[56/255,44/255,42/255]],Tm=[[209/255,194/255,173/255],[159/255,36/255,31/255],[231/255,191/255,6/255],[231/255,155/255,7/255],[75/255,90/255,200/255],[121/255,100/255,188/255],[115/255,179/255,63/255],[52/255,49/255,40/255]],Nm=[[250/255,248/255,244/255],[255/255,41/255,37/255],[251/255,223/255,47/255],[253/255,151/255,35/255],[31/255,106/255,184/255],[159/255,68/255,150/255],[80/255,180/255,122/255],[36/255,38/255,39/255]],Rm=[[233/255,199/255,173/255],[214/255,76/255,127/255],[238/255,204/255,124/255],[230/255,174/255,115/255],[86/255,141/255,146/255],[118/255,83/255,97/255],[196/255,192/255,118/255],[60/255,52/255,40/255]],Om=[[255/255,244/255,216/255],[248/255,80/255,46/255],[255/255,213/255,44/255],[254/255,129/255,5/255],[0/255,124/255,197/255],[132/255,77/255,139/255],[120/255,160/255,66/255],[2/255,4/255,6/255]],Im=[[254/255,249/255,246/255],[248/255,20/255,35/255],[237/255,199/255,8/255],[254/255,128/255,11/255],[48/255,140/255,206/255],[182/255,40/255,94/255],[135/255,187/255,26/255],[29/255,27/255,28/255]],Hm=[[226/255,216/255,205/255],[224/255,43/255,39/255],[251/255,204/255,38/255],[255/255,138/255,4/255],[82/255,103/255,202/255],[199/255,112/255,253/255],[104/255,182/255,90/255],[22/255,19/255,11/255]],Fm=[[221/255,219/255,211/255],[196/255,82/255,69/255],[196/255,167/255,80/255],[200/255,123/255,70/255],[74/255,104/255,167/255],[94/255,89/255,161/255],[86/255,139/255,70/255],[38/255,38/255,38/255]],Lm=[[237/255,235/255,236/255],[242/255,146/255,109/255],[245/255,234/255,143/255],[247/255,194/255,115/255],[89/255,118/255,212/255],[237/255,191/255,243/255],[153/255,201/255,113/255],[50/255,63/255,66/255]],Dm=[[255/255,251/255,230/255],[238/255,86/255,46/255],[249/255,213/255,50/255],[252/255,132/255,4/255],[43/255,103/255,175/255],[246/255,137/255,163/255],[171/255,205/255,94/255],[5/255,5/255,5/255]],at=new Map;at.set("itten",{title:"Chromatic Circle",author:"Johannes Itten",year:1961,reference:"farbkreis_extended.png",cube:Vo});at.set("itten-normalized",{title:"Chromatic Circle (Paper-white)",author:"Johannes Itten",year:1961,reference:"Johannes-Itten-The-chromatic-circle-some-exercises-on-the-contrast-of-pure-colors.webp",cube:pm});at.set("itten-neutral",{title:"Nathan Gossett & Baoquan Chen",author:"Johannes Itten",year:1961,reference:"itten-ryb.pdf",cube:gm});at.set("bezold",{title:"Farbentafel",author:"Wilhelm von Bezold",year:1874,reference:"Bezold_Farbentafel_1874.jpg",cube:ym});at.set("boutet",{title:"Twelve-color color circles ",author:"Claude Boutet",year:1708,reference:"Boutet_1708_color_circles.jpg",cube:mm});at.set("hett",{title:"RGV Color Wheel",author:"J. A. H. Hett",year:1908,reference:"RGV_color_wheel_1908",cube:bm});at.set("schiffermueller",{title:"Versuch eines Farbensystems",author:"Ignaz Schiffermüller",year:1772,reference:"020_schiffermueller1.jpg",cube:vm});at.set("harris",{title:"The Natural System of Colours",author:"Moses Harris",year:1766,reference:"Moses_Harris_The_Natural_System_of_Colours.jpg",cube:_m});at.set("goethe",{title:"Farbenkreis",author:"Johann Wolfgang von Goethe",year:1809,reference:"Goethe_Farbenkreis_zur_Symbolisierung_des_menschlichen_Geistes-_und_Seelenlebens_1809.jpg",cube:xm});at.set("munsell",{title:"Munsell Color System",author:"Albert Henry Munsell",year:1905,reference:"munsell-atlas-11.jpg",cube:wm});at.set("munsell-alt",{title:"A Grammar of Color",author:"Cleland, T. M. & Albert Henry Munsell",year:1921,reference:"munsell-alt.jpg",cube:$m});at.set("hayter",{title:"New Practical Treatise on the Three Primitive Colours",author:"Charles Hayter",year:1826,reference:"Color_diagram_Charles_Hayter.jpg",cube:km});at.set("bormann",{title:"Gouache tint study for Josef Alber's Preliminary Course",author:"Heinrich-Siegfried Bormann",year:1931,reference:"bormann.png",cube:Sm});at.set("albers",{title:"Interaction of Color",author:"Josef Albers",year:1942,reference:"albers-color-harmony.jpg",cube:Am});at.set("lohse",{title:"Kunsthalle Bern Poster",author:"Richard Paul Lohse",year:1970,reference:"lohse.png",cube:Em});at.set("chevreul",{title:"Cercle chromatique",author:"Michel Eugène Chevreul",year:1839,reference:"Cercle_chromatique_Chevreul_2.jpg",cube:Cm});at.set("maycock",{title:"Scale of Normal Colors and their Hues",author:"Mark M. Maycock",year:1895,reference:"maycock.png",cube:Tm});at.set("colorprinter",{title:"The Color Printer",author:"John Earhart",year:1892,reference:"colorprinter.png",cube:Nm});at.set("japschool",{title:"Japanese Textbook",author:"Japanese School",year:1930,reference:"japschool.png",cube:Mm});at.set("kindergarten1890",{title:"Kindergarten Workbook",author:"Milton Bradley",year:1890,reference:"kindergarten1890.jpg",cube:Pm});at.set("marvel-news",{title:"64 Color Chart on Newsprint",author:"Marvel Comics",year:1982,reference:"marvel-news.png",cube:Rm});at.set("apple90s",{title:"Macintosh Reference Manual",author:"Apple",year:1990,reference:"apple90s.png",cube:Om});at.set("apple80s",{title:"HyperCard User Manual",author:"Apple",year:1989,reference:"apple80s.png",cube:Im});at.set("pixelart",{title:"Pixel Art",author:"Tofu",year:2024,reference:"pixelart.png",cube:Hm});at.set("ippsketch",{title:"Imposter Syndrome",author:"Ippsketch",year:2021,reference:"ippsketch.png",cube:Fm});at.set("ryan",{title:"Compositions Palette",author:"Ryan",year:2024,reference:"ryan.png",cube:Lm});at.set("ten",{title:"Ten",author:"Roni Kaufman",year:2022,reference:"ten.png",cube:Dm});at.set("rgb",{title:"Inverted RGB",author:"James Clerk Maxwell",year:1860,reference:"rgb-cube.png",cube:[[1,1,1],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[0,0,0]]});const au=t=>t*t*(3-2*t),ji=(t,e,n)=>t+n*(e-t),sa=(t,e,n,i,r,s)=>ji(ji(t,e,r),ji(n,i,r),s),ts=(t,e,n,i,r,s,o,l,a,c,u)=>ji(sa(t,e,n,i,a,c),sa(r,s,o,l,a,c),u);function Bm(t,{cube:e=Vo,easingFn:n=au}={}){const i=n(t[0]),r=n(t[1]),s=n(t[2]),o=e.map(c=>c[0]),l=e.map(c=>c[1]),a=e.map(c=>c[2]);return[ts(...o,i,r,s),ts(...l,i,r,s),ts(...a,i,r,s)]}function Vm(t){return(t%360+360)%360}function Um(t){let[e,n,i]=t;e=Vm(e||0);let r=i+n*(i<.5?i:1-i),s=r-(r-i)*2*Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o=[r,s,2*i-r];break;case 1:o=[s,r,2*i-r];break;case 2:o=[2*i-r,r,s];break;case 3:o=[2*i-r,s,r];break;case 4:o=[s,2*i-r,r];break;case 5:o=[r,2*i-r,s];break;default:o=[2*i-r,2*i-r,2*i-r]}return o}function qe(t,{cube:e=Vo,easingFn:n=au,invertLightness:i=!0}={}){const r=i?1-t[2]:t[2],s=Um([t[0],t[1],r]);return Bm(s,{cube:e,easingFn:n})}var jm=Object.defineProperty,cu=t=>{throw TypeError(t)},zm=(t,e,n)=>e in t?jm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,P=(t,e,n)=>zm(t,typeof e!="symbol"?e+"":e,n),uu=(t,e,n)=>e.has(t)||cu("Cannot "+n),mt=(t,e,n)=>(uu(t,e,"read from private field"),n?n.call(t):e.get(t)),Kt=(t,e,n)=>e.has(t)?cu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),b=(t,e,n)=>(uu(t,e,"access private method"),n);function Ct(t,e,n={bubbles:!0,composed:!0,cancelable:!0}){return new CustomEvent(t,{detail:structuredClone(e),...n})}function pr(){return[[1,1,1],[1,0,0],[1,1,0],[1,.5,0],[0,0,1],[.5,0,1],[0,1,0],[0,0,0]]}function Wm(t){return new Promise(e=>{const{_dialogs:n}=this,i=n.length,r=()=>{this._dialogs=n.filter((o,l)=>l!==i)},s={type:"alert",text:t,onOk(){r(),e()}};this._dialogs=[...n,s]})}function Km(t){return new Promise((e,n)=>{const{_dialogs:i}=this,r=i.length,s=()=>{this._dialogs=i.filter((l,a)=>a!==r)},o={type:"confirm",text:t,onCancel(){s(),n()},onContinue(){s(),e()}};this._dialogs=[...i,o]})}function Gm(t){return new Promise((e,n)=>{const{_dialogs:i}=this,r=i.length,s=()=>{this._dialogs=i.filter((l,a)=>a!==r)},o={type:"prompt",text:t,onCancel(){s(),n()},onContinue(l){s(),e(l.detail.value)}};this._dialogs=[...i,o]})}function qm(t,e){switch(t){case"alert":return Wm.call(this,e);case"confirm":return Km.call(this,e);case"prompt":return Gm.call(this,e)}}var _n,fu,hu,es;class du extends gt{constructor(){super(),Kt(this,_n),this.text="",this._handleKeyUp=b(this,_n,fu).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keyup",this._handleKeyUp)}render(){return B`
      <ryb-color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,_n,hu)}
            >Ok</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}_n=new WeakSet,fu=function(t){switch(t.key){case"Enter":b(this,_n,es).call(this);break}},hu=function(){b(this,_n,es).call(this)},es=function(){const t=Ct("ok",void 0,{bubbles:!1});this.dispatchEvent(t)},P(du,"properties",{text:{type:String}});class Rs extends gt{constructor(){super(),P(this,"rootEl",X()),P(this,"feedBackEl",X()),this.disabled=!1,this.feedback=!1}showFeedBack(e,n=1e3){if(!this.feedback){console.warn("Please enable the feedback attribute.");return}const{value:i}=this.feedBackEl;i.innerHTML=e,i.setAttribute("duration",n),i.setAttribute("show","")}render(){return B`
      <button ${Z(this.rootEl)} class="body" ?disabled=${this.disabled}>
        ${this.feedback?B` <ryb-color-picker-ui-tool-tip
              ${Z(this.feedBackEl)}
            ></ryb-color-picker-ui-tool-tip>`:B``}
        <span><slot></slot></span>
      </button>
    `}}P(Rs,"properties",{disabled:{type:Boolean,reflect:!0},feedback:{type:Boolean}}),P(Rs,"styles",St`
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
  `);var we,pu,gu,yu,ns,is;class mu extends gt{constructor(){super(),Kt(this,we),this.text="",this._handleKeyUp=b(this,we,pu).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){window.removeEventListener("keyup",this._handleKeyUp),super.disconnectedCallback()}render(){return B`
      <ryb-color-picker-ui-dialog>
        <div slot="text">${this.text}</div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,we,gu)}
            >Cancel</ryb-color-picker-ui-button
          >
          <ryb-color-picker-ui-button @click=${b(this,we,yu)}
            >Continue</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}we=new WeakSet,pu=function(t){switch(t.key){case"Escape":b(this,we,is).call(this);break;case"Enter":b(this,we,ns).call(this);break}},gu=function(){b(this,we,is).call(this)},yu=function(){b(this,we,ns).call(this)},ns=function(){const t=Ct("continue",void 0,{bubbles:!1});this.dispatchEvent(t)},is=function(){const t=Ct("cancel",void 0,{bubbles:!1});this.dispatchEvent(t)},P(mu,"properties",{text:{type:String}});class Os extends gt{constructor(){super()}render(){return B`
      <div class="body">
        <div class="text">
          <slot name="text"></slot>
        </div>
        <div class="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `}}P(Os,"properties",{}),P(Os,"styles",St`
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
  `);class Is extends gt{constructor(){super(),P(this,"rootEl",X())}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        ${this.label?B` <span class="label" part="label">${this.label}</span>`:B``}
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `}}P(Is,"properties",{label:{type:String}}),P(Is,"styles",St`
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
  `);const bi=Math.PI,Hs=2*bi,Jm=bi/180,Ym=180/bi;function Xm(t,e,n){return Math.min(Math.max(t,e),n)}function Zm(t){return t*Ym}function cn(t){return t*Jm}const Qm=Object.assign.bind(Object);function Pe(t,e="rgb"){const n=Math.round(t[0]*255),i=Math.round(t[1]*255),r=Math.round(t[2]*255);return e==="hex"?"#"+(r|i<<8|n<<16|1<<24).toString(16).slice(1):`rgb(${n},${i},${r})`}function t2(t){const[e,n,i]=t;return[e/255,n/255,i/255]}function bu(t,{separator:e="-",trim:n=!0}={}){let i=t.normalize("NFKD").replace("ß","ss").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/\s+/g,e).replace(/[^\w-]+/g,"").replace(/[_-]/g,e).replace(new RegExp(`${e}${e}`,"g"),e);return n&&(i=i.replace(new RegExp(`^${e}|${e}$`,"g"),"")),i}async function vu(t){const e={"text/plain":t},n=new ClipboardItem(e);await navigator.clipboard.write([n])}function e2(t,e){return JSON.stringify(t)===JSON.stringify(e)}function n2(t,e){const n={};for(const i of e)n[i]=t[i];return n}var _t,_u,xu,wu,Fs,$u,ku,Tn,rs,Mi,Ls;class Ds extends gt{constructor(){super(),Kt(this,_t),P(this,"rootEl",X()),P(this,"cubeEl",X()),P(this,"savePresetEl",X()),P(this,"resetPresetEl",X()),P(this,"deletePresetEl",X()),this.preset="",this.presets=[],this.noModify=!1,this.cube=pr()}get presetsOptions(){return(this.noModify?[]:[["","[ New Gamut ]"]]).concat(this.presets.map(e=>[e[0],e[1]]))}get isModified(){const e=this.presets.find(n=>n[0]===this.preset);return e?!e2(this.cube,e[2]):!0}willUpdate(e){e.has("preset")&&b(this,_t,Ls).call(this)}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <ryb-color-picker-ui-selector
          value=${this.preset}
          .options=${this.presetsOptions}
          @update:value=${b(this,_t,_u)}
        ></ryb-color-picker-ui-selector>

        <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>

        <ryb-color-picker-ui-gamut-cube
          ${Z(this.cubeEl)}
          .cube=${this.cube}
          ?nomodify=${this.noModify}
          @update:cube=${b(this,_t,xu)}
        >
        </ryb-color-picker-ui-gamut-cube>

        ${this.noModify?B``:B`<ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>
              <div class="actions">
                <ryb-color-picker-ui-button
                  ${Z(this.savePresetEl)}
                  feedback
                  ?disabled=${!this.isModified}
                  @click=${this.preset?b(this,_t,wu):b(this,_t,Fs)}
                  >${this.preset?"Update Preset":"Save Preset"}
                </ryb-color-picker-ui-button>
                <ryb-color-picker-ui-button
                  ${Z(this.resetPresetEl)}
                  feedback
                  ?disabled=${!this.preset||!this.isModified}
                  @click=${b(this,_t,$u)}
                  >Reset Preset</ryb-color-picker-ui-button
                >
                <ryb-color-picker-ui-button
                  ${Z(this.deletePresetEl)}
                  feedback
                  ?disabled=${!this.preset}
                  @click=${b(this,_t,ku)}
                  >Delete Preset</ryb-color-picker-ui-button
                >
              </div>`}
      </div>
    `}}_t=new WeakSet,_u=function(t){b(this,_t,Tn).call(this,t.detail.value)},xu=function(t){const{value:e}=t.detail;this.cube=e,b(this,_t,rs).call(this,e)},wu=function(){if(this.noModify)return;const t=window.structuredClone(this.presets),e=window.structuredClone(this.cube),n=this.preset,i=t.find(r=>r[0]===n);i[2]=e,b(this,_t,Mi).call(this,t),b(this,_t,Tn).call(this,n),this.savePresetEl.value.showFeedBack("Updated")},Fs=async function(){if(this.noModify)return;let t="";try{if(t=await this.dialog("prompt","Please enter a title for the new gamut-preset:"),!t)throw Error("Missing title")}catch{return}const e=bu(t);if(this.presets.find(r=>r[0]===e)){await this.dialog("alert","A gamut-preset with this title does exist. Please choose another name."),b(this,_t,Fs).call(this);return}const n=window.structuredClone(this.presets),i=window.structuredClone(this.cube);n.push([e,t,i]),b(this,_t,Mi).call(this,n),b(this,_t,Tn).call(this,e),this.savePresetEl.value.showFeedBack("Saved")},$u=function(){this.noModify||(b(this,_t,Ls).call(this),this.resetPresetEl.value.showFeedBack("Resetted"))},ku=async function(){if(this.noModify)return;try{await this.dialog("confirm","Are you sure to delete this gamut-preset?")}catch{return}const t=this.preset,e=window.structuredClone(this.presets).filter(n=>n[0]!==t);b(this,_t,Mi).call(this,e),b(this,_t,Tn).call(this,""),this.deletePresetEl.value.showFeedBack("Deleted")},Tn=function(t){const e=Ct("update:preset",{value:t});this.dispatchEvent(e)},rs=function(t){const e=Ct("update:cube",{value:t});this.dispatchEvent(e)},Mi=function(t){const e=Ct("update:presets",{value:t});this.dispatchEvent(e)},Ls=function(){const t=this.presets.find(n=>n[0]===this.preset);if(!t)return;const e=window.structuredClone(t[2]);this.cube=e,b(this,_t,rs).call(this,e)},P(Ds,"properties",{dialog:{type:Function},cube:{type:Array},noModify:{type:Boolean},preset:{type:String},presets:{type:Array}}),P(Ds,"styles",St`
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
  `);var Bs,Su;class Vs extends gt{constructor(){super(),Kt(this,Bs),P(this,"rootEl",X()),P(this,"formEl",X()),this.noModify=!1,this.cube=pr()}getCubeValue(e){const n=this.cube[e];return Pe(n,"hex")}handleColorInput(e){const n=Number(e.target.dataset.index),i=e.target.value,r=$e(i);if(!r)throw new Error("Could not convert to rgb color");const{r:s,g:o,b:l}=r;this.cube[n]=t2([s,o,l]),b(this,Bs,Su).call(this,this.cube)}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <form ${Z(this.formEl)} class="form">
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
    `}}Bs=new WeakSet,Su=function(t){const e=Ct("update:cube",{value:t});this.dispatchEvent(e)},P(Vs,"properties",{cube:{type:Array},noModify:{type:Boolean}}),P(Vs,"styles",St`
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
  `);class Us extends gt{constructor(){super(),P(this,"rootEl",X())}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(Us,"properties",{}),P(Us,"styles",St`
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
  `);class js extends gt{constructor(){super(),P(this,"rootEl",X()),P(this,"feedBackEl",X()),this.disabled=!1,this.feedback=!1}showFeedBack(e,n=1e3){if(!this.feedback){console.warn("Please enable the feedback attribute.");return}const{value:i}=this.feedBackEl;i.innerHTML=e,i.setAttribute("duration",n),i.setAttribute("show","")}render(){return B`
      <button ${Z(this.rootEl)} class="body" ?disabled=${this.disabled}>
        ${this.feedback?B` <ryb-color-picker-ui-tool-tip
              ${Z(this.feedBackEl)}
            ></ryb-color-picker-ui-tool-tip>`:B``}
        <ryb-color-picker-ui-icon>
          <slot></slot>
        </ryb-color-picker-ui-icon>
      </button>
    `}}P(js,"properties",{disabled:{type:Boolean},feedback:{type:Boolean}}),P(js,"styles",St`
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
  `);var zi,Au,Eu;class zs extends gt{constructor(){super(),Kt(this,zi),P(this,"rootEl",X()),P(this,"inputEl",X()),this.autofocus=!1,this.disabled=!1,this.readonly=!1}setValue(e){b(this,zi,Au).call(this,e)}clear(){this.setValue("")}firstUpdated(e){e.has("autofocus")&&this.autofocus&&this.inputEl.value.focus()}updated(e){e.has("value")&&this.inputEl.value&&(this.inputEl.value.value=this.value)}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <input
          ${Z(this.inputEl)}
          part="input"
          type="text"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @change=${b(this,zi,Eu)}
        />
      </div>
    `}}zi=new WeakSet,Au=function(t){const e=Ct("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},Eu=function(t){const{value:e}=t.target;this.setValue(e)},P(zs,"properties",{value:{type:String},autofocus:{type:Boolean},disabled:{type:Boolean},readonly:{type:Boolean}}),P(zs,"styles",St`
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
  `);var ue,Cu,Mu,Pu,Tu,ss,os;class Ws extends gt{constructor(){super(),Kt(this,ue),this.text="",this.value="",this._handleKeyUp=b(this,ue,Cu).bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("keyup",this._handleKeyUp)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keyup",this._handleKeyUp)}render(){return B`
      <ryb-color-picker-ui-dialog>
        <div slot="text" class="text">
          <div>${this.text}</div>
          <ryb-color-picker-ui-field>
            <ryb-color-picker-ui-input
              autofocus
              value=${this.value}
              @update:value=${b(this,ue,Tu)}
            ></ryb-color-picker-ui-input>
          </ryb-color-picker-ui-field>
        </div>
        <div slot="actions">
          <ryb-color-picker-ui-button @click=${b(this,ue,Mu)}
            >Cancel</ryb-color-picker-ui-button
          >
          <ryb-color-picker-ui-button @click=${b(this,ue,Pu)}
            >Continue</ryb-color-picker-ui-button
          >
        </div>
      </ryb-color-picker-ui-dialog>
    `}}ue=new WeakSet,Cu=function(t){switch(t.key){case"Escape":b(this,ue,os).call(this);break;case"Enter":b(this,ue,ss).call(this);break}},Mu=function(){b(this,ue,os).call(this)},Pu=function(){b(this,ue,ss).call(this)},Tu=function(t){this.value=t.detail.value},ss=function(){const{value:t}=this;if(!t)return;const e=Ct("continue",{value:t},{bubbles:!1});this.dispatchEvent(e)},os=function(){const t=Ct("cancel",void 0,{bubbles:!1});this.dispatchEvent(t)},P(Ws,"properties",{text:{type:String},value:{type:String}}),P(Ws,"styles",St`
    .text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `);var le,Wi,Ki,Nu,Ru;class Ks extends gt{constructor(){super(),Kt(this,le),P(this,"rootEl",X()),P(this,"selectEl",X()),this.noControls=!1}get count(){return this.options.length}get canCycle(){return this.count>1}setValue(e){b(this,le,Ki).call(this,e)}nextValue(){let e=mt(this,le,Wi)+1;e>this.count-1&&(e=0);const n=this.options[e][0];b(this,le,Ki).call(this,n)}previousValue(){let e=mt(this,le,Wi)-1;e<0&&(e=this.count-1);const n=this.options[e][0];b(this,le,Ki).call(this,n)}updated(e){if(e.has("value")){const n=mt(this,le,Wi);if(n===-1)return;this.selectEl.value.selectedIndex=n}}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        ${this.noControls?B``:B` <ryb-color-picker-ui-icon-button
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
          ${Z(this.selectEl)}
          class="select"
          @change=${b(this,le,Nu)}
          @keyup=${b(this,le,Ru)}
        >
          ${this.options.map(([e,n])=>B`<option value="${e}">${n}</option>`)}
        </select>
        ${this.noControls?B``:B` <ryb-color-picker-ui-icon-button
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
    `}}le=new WeakSet,Wi=function(){return this.options.findIndex(([t])=>t===this.value)},Ki=function(t){const e=Ct("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},Nu=function(t){const e=t.target.value;this.setValue(e)},Ru=function(t){switch(t.key){case"ArrowLeft":this.previousValue();break;case"ArrowRight":this.nextValue();break}},P(Ks,"properties",{value:{type:String},options:{type:Array},noControls:{type:Boolean,reflect:!0}}),P(Ks,"styles",St`
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
  `);class Gs extends gt{constructor(){super(),P(this,"rootEl",X())}render(){return B` <div ${Z(this.rootEl)} class="body"></div> `}}P(Gs,"properties",{}),P(Gs,"styles",St`
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
  `);var qn,Ou,qs;class Js extends gt{constructor(){super(),Kt(this,qn),P(this,"rootEl",X()),P(this,"inputEl",X()),this.value=0}get canMinus(){return this.value>this.min}get canPlus(){return this.value<this.max}setValue(e){b(this,qn,qs).call(this,e)}plus(){this.setValue(this.value+1)}minus(){this.setValue(this.value-1)}updated(e){e.has("value")&&(this.inputEl.value.value=this.value)}render(){return B`
      <div ${Z(this.rootEl)} class="body">
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
          ${Z(this.inputEl)}
          value="${this.value}"
          type="number"
          min="${this.min}"
          max="${this.max}"
          @change=${b(this,qn,Ou)}
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
    `}}qn=new WeakSet,Ou=function(t){const{value:e}=t.target;b(this,qn,qs).call(this,e)},qs=function(t){const e=Xm(t,this.min,this.max),n=Ct("update:value",{value:e},{bubbles:!1});this.dispatchEvent(n)},P(Js,"properties",{value:{type:Number,reflect:!0},min:{type:Number,reflect:!0},max:{type:Number,reflect:!0}}),P(Js,"styles",St`
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
  `);class Ys extends gt{constructor(){super(),P(this,"rootEl",X()),this._intervalTimer,this.duration=1e3}willUpdate(e){e.has("show")&&(clearInterval(this._intervalTimer),this._intervalTimer=setTimeout(()=>{this.show=!1},this.duration))}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(Ys,"properties",{duration:{type:Number,reflect:!0},show:{type:Boolean,reflect:!0}}),P(Ys,"styles",St`
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
  `);class Xs extends gt{constructor(){super(),P(this,"rootEl",X())}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <slot></slot>
      </div>
    `}}P(Xs,"properties",{}),P(Xs,"styles",St`
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
  `);var Jn,Iu,Hu,oa;class Zs extends gt{constructor(){super(),Kt(this,Jn),P(this,"rootEl",X()),P(this,"inputEl",X()),P(this,"copyEl",X()),this.disabled=!1,this.noSettings=!1}async copyToClipboard(){await vu(this.value),this.copyEl.value.showFeedBack("Copied")}updated(e){e.has("value")&&(this.inputEl.value.value=this.value)}render(){return B`
      <div ${Z(this.rootEl)} class="body">
        <ryb-color-picker-ui-field class="value" label="Value">
          <ryb-color-picker-ui-input
            ${Z(this.inputEl)}
            class="input"
            ?disabled=${this.disabled}
            value=${this.value}
            @update:value=${b(this,Jn,Hu)}
          ></ryb-color-picker-ui-input>
          <ryb-color-picker-ui-icon-button
            ${Z(this.copyEl)}
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
          ${this.noSettings?B``:B` <ryb-color-picker-ui-icon-button
                ?disabled=${this.disabled}
                @click=${b(this,Jn,Iu)}
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
    `}}Jn=new WeakSet,Iu=function(){const t=Ct("action:show-settings");this.dispatchEvent(t)},Hu=function(t){t.stopPropagation();const{value:e}=t.detail;b(this,Jn,oa).call(this,e)},oa=function(t){const e=Ct("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},P(Zs,"properties",{disabled:{type:Boolean},noSettings:{type:Boolean},value:{type:String,reflect:!0}}),P(Zs,"styles",St`
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
  `);var Qs,Fu;class to extends gt{constructor(){super(),Kt(this,Qs),P(this,"rootEl",X()),this.disabled=!1,this.pill=!1}willUpdate(e){e.has("value")&&b(this,Qs,Fu).call(this,this.value)}render(){return B`
      <button
        ${Z(this.rootEl)}
        class="body"
        ?disabled=${this.disabled}
        style=${In({backgroundColor:this.value})}
      ></button>
    `}}Qs=new WeakSet,Fu=function(t){const e=Ct("update:value",{value:t},{bubbles:!1});this.dispatchEvent(e)},P(to,"properties",{disabled:{type:Boolean,reflect:!0},pill:{type:Boolean,reflect:!0},value:{type:String,reflect:!0}}),P(to,"styles",St`
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
  `);function i2(){let t=0,e=1,n=0,i=null;function r(o){return(n+1)*o/(n*o+1)}function s(o){if(i==null)return(o-t)/(e-t);let l=(i>o?t:e)-i,a=o-i;return r(a/l)*l+i}return s.extent=function(o){return arguments.length?(t=+o[0],e=+o[1],s):[t,e]},s.distortion=function(o){return arguments.length?(n=+o,s):n},s.focus=function(o){return arguments.length?(i=o,s):i},s}function ls({angle:t=360,animationDuration:e=200,colorizeFn:n=(g,m)=>({fill:"transparent"}),context:i=null,distortion:r=3,gap:s=0,introDuration:o=600,name:l="radial-range",onClick:a=g=>{},radius:c=100,segments:u=24,startAngle:f=0,thickness:d=20}={}){let g=null;const m=dg().value(L=>L.value).sortValues(null),w=Mc();function R(L){return(L-(f-360))%360}const v=i2();v.distortion(r);function I(){const L=t/u,it=[];for(let bt=0;bt<u;bt++){const $t=bt,pt=v((bt+1)*L)-v(bt*L);it.push({index:$t,value:pt})}return it}function T(){return m(I())}const _=Fi(i);let O=_.select(`g.${l}`);O.empty()&&(O=_.append("g").classed(l,!0));const G=O.append("path").classed("track",!0).attr("fill","transparent"),Q=O.append("g").classed("segments",!0);function ot(L=e){const it=T(),bt=Q.selectAll(".segment").data(it,q=>q.index),$t=bt.nodes();function pt(q){return q.__data__}function Ae(q){return $t.filter(Y=>pt(Y).index<q).sort((Y,ut)=>pt(ut).index-pt(Y).index)[0]}function Ee(q){return $t.filter(Y=>pt(Y).index>q).sort((Y,ut)=>pt(Y).index-pt(ut).index)[0]}function Tt(q,Y){return function(ut){const h=this._current=Qm({},Y,q(ut));Fi(this).select(".shape").attr("d",w(h)).attr("transform-origin",w.centroid(h).join(" "))}}function Gt(q){const Y=Ae(q.index),ut=Ee(q.index);let h=cn(f),p=h;Y&&(h=Y._current.endAngle+Y._current.padAngle/2,p=h),ut&&(p=ut._current.startAngle-ut._current.padAngle/2);const y=vn({startAngle:h,endAngle:p},{startAngle:q.startAngle,endAngle:q.endAngle});return Tt(y,q)}function ee(q){const Y=vn(this._current,q);return Tt(Y,q)}function ye(q){const Y=Ee(q.index);let ut=cn(f+t);Y&&(ut=Y._current.startAngle-Y._current.padAngle);let h=vn({startAngle:q.startAngle,endAngle:q.endAngle},{startAngle:ut,endAngle:ut});return Tt(h,q)}return bt.join(function(q){const Y=q.append("g").classed("segment",!0).attr("data-index",(ut,h)=>h);return Y.append("path").classed("shape",!0).attr("stroke-width",s?0:1).attr("stroke",(ut,h)=>n(ut,h).stroke).attr("fill",(ut,h)=>n(ut,h).fill).on("click",(ut,h)=>{a(h.index)}),Y.interrupt().transition().duration(L).ease(Zr).tween("enter.arc",Gt),Y},function(q){return q.interrupt().transition().duration(L).ease(Zr).tween("update.arc",ee),q.select(".shape").attr("stroke-width",s?0:1).attr("stroke",(Y,ut)=>n(Y,ut).stroke).attr("fill",(Y,ut)=>n(Y,ut).fill),q},function(q){return q.classed("exit",!0).interrupt().transition().duration(L).ease(Zr).tween("exit.arc",ye).on("end",function(){Fi(this).remove()}),q}),G.attr("d",w({startAngle:cn(f),endAngle:cn(f+t),innerRadius:c-d,outerRadius:c})),this}function tt(L=e){const it=2*c*bi,bt=Hs/it*s;return v.distortion(r),m.padAngle(bt).startAngle(cn(f)).endAngle(cn(f+t)),w.padAngle(bt).innerRadius(c-d).outerRadius(c),v.extent([0,t]).focus(g),ot(L)}function nt(L,it=e){return arguments.length?(g=null,L!=null&&(g=R(L),g>t&&(g=null)),v.focus(g),tt(it)):g}function A(L=e){return this.focus(null,L)}function V(L){return arguments.length?(r=L,tt(e)):r}function C(L){return arguments.length?(s=L,tt(0)):s}function W(L){return arguments.length?(c=L,tt(0)):c}function Pt(L){return arguments.length?(u=L,tt(e)):u}function ct(L){return arguments.length?(d=L,tt(0)):d}tt(o);const J=O.node();return{blur:A,distortion:V,focus:nt,gap:C,node:J,radius:W,render:ot,segments:Pt,thickness:ct,update:tt}}var N,Yn,Xn,Zn,Lu,Pi,as,la,cs,Ti,Du,Bu,Vu,Uu,ju,zu,Wu,Ku,Gu,qu,Ju,Yu,Xu,Zu,Qu,tf,ef,nf,rf,sf,of,lf,af,eo,cf,uf,ff,hf,df,no,pf,gf,io,yf,Hn,mf,hn,ro,Te,so;class oo extends gt{constructor(){super(),Kt(this,N),P(this,"deletePresetEl",X()),P(this,"rangesBodyEl",X()),P(this,"rangesEl",X()),P(this,"resetStoreEl",X()),P(this,"clearStoreEl",X()),P(this,"rootEl",X()),P(this,"savePresetEl",X()),P(this,"svgEl",X()),P(this,"valueEl",X()),P(this,"_scaleHue"),P(this,"_scaleLightness"),P(this,"_scaleSaturation"),P(this,"_rangeHue"),P(this,"_rangeLightness"),P(this,"_rangeSaturation"),P(this,"_busyTimerId",null),Kt(this,Te,qm.bind(this)),this._hslColor=[0,0,0],this._dialogs=[],this._initialSettings=null,this._ready=!1,this.hasPresets=!1,this.noInit=!1,this.noSettings=!1,this.noStore=!1,this.noValue=!1,this.cube=pr(),this.presets=[],this.gamutPresets=[],this.show=!0,this.showSettings=!1,this.showValue=!0,this.initialValue="hotpink",this.value="",this.animationDuration=150,this.backgroundColor="transparent",this.diameter=320,this.displayFormat="hex",this.distortion=3,this.gap=0,this.padding=30,this.swatchGap=8,this.thicknessLightness=20,this.thicknessHue=24,this.thicknessSaturation=20,this.segmentsLightness=24,this.segmentsHue=48,this.segmentsSaturation=24,this.preset="",this.gamutPreset="",this.storeConfigKey="ryb-color-picker/{id}/config",this.storeGamutPresetsKey="ryb-color-picker/{id}/gamut-presets",this.storePresetsKey="ryb-color-picker/{id}/presets"}get ready(){return this._ready}get radius(){return this.diameter/2}get innerRadius(){const{gap:e}=this;return this.radius-this.thicknessHue-e-this.thicknessSaturation-e-this.thicknessLightness-e}get swatchRadius(){return this.innerRadius-this.swatchGap}get color(){const{cube:e}=this;return qe(this._hslColor,{cube:e})}get colorCss(){return Pe(this.color,this.displayFormat)}get isBusy(){return this._busyTimerId!=null}get displayFormatOptions(){return[["hex","Hex"],["rgb","RGB"]]}get width(){return this.diameter+2*this.padding}get height(){return this.diameter+2*this.padding}get presetsOptions(){return[["","[ New Preset ]"]].concat(this.presets.map(e=>[e[0],e[1]]))}setValue(e){const n=$e(e);if(!n)throw new Error("Could not convert to color");const i=Nc(n),{h:r,s,l:o}=i;this._hslColor=[r,s,o]}resetValue(){const[e]=this._hslColor;this._hslColor=[e,1,.5]}setCube(e){this.cube=structuredClone(e)}init(){setTimeout(()=>{b(this,N,so).call(this)},0)}async copyToClipboard(){await vu(this.value)}loadGamutPresets(e,n){this.gamutPresets=e,n&&(this.gamutPreset=n)}cycleGamutPreset(e=!1){const{gamutPresets:n}=this,{length:i}=n;if(i<2)return;if(!this.gamutPreset){this.gamutPreset=n[0][0];return}const r=n.findIndex(a=>a[0]===this.gamutPreset),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.gamutPreset=l}loadPresets(e,n){if(!this.hasPresets)throw new Error('Could not load presets. Please add the "haspresets" attribute.');if(this.presets=structuredClone(e),!n)return;const i=this.presets.find(l=>l[0]===n);if(!i){this.preset="";return}const[r,s,o]=i;this.preset=r,this.loadSettings(o)}cyclePreset(e=!1){if(!this.hasPresets)return;const{presets:n}=this,{length:i}=n;if(i<2)return;if(!this.preset){this.preset=n[0][0];return}const r=n.findIndex(a=>a[0]===this.preset),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.preset=l}cycleFormat(e=!1){const n=this.displayFormatOptions,{length:i}=n,r=n.findIndex(a=>a[0]===this.displayFormat),s=e?-1:1,o=(i+r+s)%i,[l]=n[o];this.displayFormat=l}refresh(e=this.animationDuration){b(this,N,hn).call(this,"update",e)}setFocus(e,n=this.animationDuration){b(this,N,hn).call(this,"focus",e,n)}clearFocus(e=this.animationDuration){b(this,N,hn).call(this,"blur",e)}loadSettings(e){"gamutPreset"in e&&(this.gamutPresets.map(n=>n[0]).includes(e.gamutPreset)||(e.gamutPreset="")),Object.assign(this,e)}getSettings(){const e=n2(this,["backgroundColor","diameter","displayFormat","distortion","gamutPreset","gap","padding","segmentsHue","segmentsLightness","segmentsSaturation","swatchGap","thicknessHue","thicknessLightness","thicknessSaturation"]);return structuredClone(e)}savePreset(e,n){const{presets:i}=this,r=this.getSettings(),s=i.findIndex(o=>o[0]===e);s!==-1?i[s]=[e,n,r]:i.push([e,n,r]),b(this,N,Hn).call(this,i),this.preset=e}loadPreset(e){if(!e)return;const n=this.presets.find(o=>o[0]===e);if(!n){this.preset="";return}const[i,r,s]=n;this.loadSettings(s),this.preset=e}deletePreset(e){const n=this.presets.filter(i=>i[0]!==e);this.presets=n,b(this,N,Hn).call(this,n),this.preset=""}clearStore(){window.localStorage.removeItem(mt(this,N,Yn)),window.localStorage.removeItem(mt(this,N,Zn)),window.localStorage.removeItem(mt(this,N,Xn))}reset(){this.preset="",this.cube=pr();const{_initialSettings:e}=this;e.gamutPreset="",this.loadSettings(e)}connectedCallback(){super.connectedCallback(),this._initialSettings=this.getSettings(),localStorage.getItem(mt(this,N,Yn))||b(this,N,no).call(this);const e=b(this,N,pf).call(this);e&&(this.preset=e.preset,this.gamutPreset=e.gamutPreset),localStorage.getItem(mt(this,N,Xn))||b(this,N,Hn).call(this),this.presets=b(this,N,yf).call(this)??[],localStorage.getItem(mt(this,N,Zn))||b(this,N,io).call(this),this.gamutPresets=b(this,N,gf).call(this)??[]}willUpdate(e){e.has("initialValue")&&this.setValue(this.initialValue),e.has("preset")&&this.loadPreset(this.preset),e.has("gamutPreset")&&b(this,N,mf).call(this),e.has("gamutPresets")&&b(this,N,io).call(this),e.has("presets")&&b(this,N,Hn).call(this),(e.has("_hslColor")||e.has("cube"))&&(this.value=this.colorCss),(e.has("gamutPreset")||e.has("preset"))&&b(this,N,no).call(this),e.has("value")&&b(this,N,Du).call(this,this.value),e.has("preset")&&b(this,N,Bu).call(this,this.preset),e.has("_ready")&&this.ready&&b(this,N,Vu).call(this)}firstUpdated(){this.noInit||b(this,N,so).call(this)}updated(e){if(!this._ready)return;const{distortion:n,gap:i,radius:r,segmentsHue:s,segmentsLightness:o,segmentsSaturation:l,thicknessHue:a,thicknessLightness:c,thicknessSaturation:u}=this;e.has("segmentsLightness")&&(this._scaleLightness.range([0,o]),this._rangeLightness.segments(o)),e.has("segmentsSaturation")&&(this._scaleSaturation.range([0,l]),this._rangeSaturation.segments(l)),e.has("segmentsHue")&&(this._scaleHue.range([0,s]),this._rangeHue.segments(s));const f=r-a-i,d=f-u-i;e.has("thicknessLightness")&&this._rangeLightness.thickness(c),e.has("thicknessSaturation")&&(this._rangeSaturation.thickness(u),this._rangeLightness.radius(d)),e.has("thicknessHue")&&(this._rangeHue.thickness(a),this._rangeSaturation.radius(f),this._rangeLightness.radius(d)),(e.has("diameter")||e.has("gap")||e.has("thicknessSaturation")||e.has("thicknessHue"))&&(this._rangeHue.radius(r),this._rangeSaturation.radius(f),this._rangeLightness.radius(d)),e.has("gap")&&b(this,N,hn).call(this,"gap",i),e.has("distortion")&&b(this,N,hn).call(this,"distortion",n),(e.has("_ready")||e.has("value")||e.has("cube"))&&this.refresh(),b(this,N,ro).call(this)}render(){return B`
      <div
        ${Z(this.rootEl)}
        class="body"
        style=${In({display:this.show?"inline-flex":"none"})}
        tabindex="0"
      >
        <svg
          ${Z(this.svgEl)}
          width=${this.width}
          height=${this.height}
          viewBox=${mt(this,N,Lu)}
        >
          <circle
            r=${this.innerRadius}
            stroke-width="1"
            style=${In({fill:this.backgroundColor,stroke:this.backgroundColor})}
          />
          <circle
            class="color"
            r=${this.swatchRadius}
            style=${In({fill:this.colorCss})}
          />
          <g
            ${Z(this.rangesEl)}
            class="ranges"
            @pointerenter=${b(this,N,ju)}
            @pointerleave=${b(this,N,zu)}
            @pointermove=${b(this,N,Uu)}
          >
            <path
              ${Z(this.rangesBodyEl)}
              class="ranges-body"
              style=${In({fill:this.backgroundColor})}
            />
          </g>
        </svg>

        ${ra(!this.noValue&&this.showValue?B`<ryb-color-picker-value
                ${Z(this.valueEl)}
                value=${this.colorCss}
                ?disabled=${!this.ready}
                ?nosettings=${this.noSettings}
                @action:show-settings=${()=>this.showSettings=!this.showSettings}
                @update:value=${b(this,N,Ku)}
              ></ryb-color-picker-value>`:B``)}
        ${ra(!this.noSettings&&this.showSettings?B`<ryb-color-picker-settings
                >${this.hasPresets?B`
                      <ryb-color-picker-ui-field label="Presets">
                        <ryb-color-picker-ui-selector
                          value=${this.preset}
                          .options=${this.presetsOptions}
                          @update:value=${b(this,N,df)}
                        ></ryb-color-picker-ui-selector>
                      </ryb-color-picker-ui-field>

                      <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator
                    ></ryb-color-picker-settings>`:B``}

                <ryb-color-picker-ui-field label="Gamut">
                  <ryb-color-picker-ui-gamut
                    .cube=${this.cube}
                    .dialog=${mt(this,Te)}
                    .preset=${this.gamutPreset}
                    .presets=${this.gamutPresets}
                    @update:preset=${b(this,N,rf)}
                    @update:cube=${b(this,N,nf)}
                    @update:presets=${b(this,N,sf)}
                  ></ryb-color-picker-ui-gamut>
                </ryb-color-picker-ui-field>

                <div class="settings-group columns-3">
                  <ryb-color-picker-ui-field label="BG color">
                    <ryb-color-picker-ui-input
                      value=${this.backgroundColor}
                      @update:value=${b(this,N,Gu)}
                    ></ryb-color-picker-ui-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Distortion">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.distortion}
                      label="Distortion"
                      min="0"
                      max="8"
                      @update:value=${b(this,N,lf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Format">
                    <ryb-color-picker-ui-selector
                      value=${this.displayFormat}
                      .options=${this.displayFormatOptions}
                      nocontrols
                      @update:value=${b(this,N,Wu)}
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
                      @update:value=${b(this,N,of)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Gap">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.gap}
                      label="Gap"
                      min="0"
                      max="4"
                      @update:value=${b(this,N,tf)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>

                  <ryb-color-picker-ui-field label="Swatch gap">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.swatchGap}
                      label="Swatch gap"
                      min="0"
                      max="24"
                      @update:value=${b(this,N,ef)}
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
                      @update:value=${b(this,N,qu)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Saturation">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.segmentsSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${b(this,N,Yu)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Lightness">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.segmentsLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${b(this,N,Ju)}
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
                      @update:value=${b(this,N,Xu)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Saturation">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.thicknessSaturation}
                      label="Saturation"
                      min="1"
                      max="64"
                      @update:value=${b(this,N,Qu)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                  <ryb-color-picker-ui-field label="Lightness">
                    <ryb-color-picker-ui-stepper-input
                      value=${this.thicknessLightness}
                      label="Lightness"
                      min="1"
                      max="64"
                      @update:value=${b(this,N,Zu)}
                    ></ryb-color-picker-ui-stepper-input>
                  </ryb-color-picker-ui-field>
                </ryb-color-picker-ui-field>

                <ryb-color-picker-ui-separator></ryb-color-picker-ui-separator>

                <div class="actions">
                  ${this.hasPresets?B`<ryb-color-picker-ui-button
                          ${Z(this.savePresetEl)}
                          feedback
                          @click=${this.preset?b(this,N,af):b(this,N,eo)}
                          >${this.preset?"Update Preset":"Save Preset"}</ryb-color-picker-ui-button
                        >
                        <ryb-color-picker-ui-button
                          ${Z(this.deletePresetEl)}
                          feedback
                          ?disabled=${!this.preset}
                          @click=${b(this,N,cf)}
                          >Delete Preset</ryb-color-picker-ui-button
                        >`:B``}
                  ${this.noStore?B``:B`<ryb-color-picker-ui-icon-button
                        ${Z(this.clearStoreEl)}
                        feedback
                        @click=${b(this,N,uf)}
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
                    ${Z(this.resetStoreEl)}
                    feedback
                    @click=${b(this,N,ff)}
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
                    @click=${b(this,N,hf)}
                    >Close</ryb-color-picker-ui-button
                  >
                </div>
              </ryb-color-picker-settings>`:B``)}
        ${this._dialogs.length>0?B` <div class="dialogs">
              ${this._dialogs.map(e=>e.type==="prompt"?B`<ryb-color-picker-ui-prompt
                      text=${e.text}
                      @continue=${e.onContinue}
                      @cancel=${e.onCancel}
                    ></ryb-color-picker-ui-prompt>`:e.type==="confirm"?B`<ryb-color-picker-ui-confirm
                      text=${e.text}
                      @continue=${e.onContinue}
                      @cancel=${e.onCancel}
                    ></ryb-color-picker-ui-confirm>`:e.type==="alert"?B`<ryb-color-picker-ui-alert
                      text=${e.text}
                      @ok=${e.onOk}
                    ></ryb-color-picker-ui-alert>`:B``)}
            </div>`:B``}
      </div>
    `}}N=new WeakSet,Yn=function(){return b(this,N,Pi).call(this,this.storeConfigKey)},Xn=function(){return b(this,N,Pi).call(this,this.storePresetsKey)},Zn=function(){return b(this,N,Pi).call(this,this.storeGamutPresetsKey)},Lu=function(){return`${this.width/-2} ${this.height/-2} ${this.width} ${this.height}`},Pi=function(t){const{id:e}=this;return t.replaceAll("{id}",e??"default")},as=function(t){clearTimeout(this._busyTimerId),this._busyTimerId=setTimeout(()=>{this._busyTimerId=null},t)},la=function(t,e){let n=Math.atan2(e,t)+bi/2;return n<0&&(n+=Hs),Zm(n)},cs=function(t){const[e,n]=_5(t,this.rangesBodyEl.value);return b(this,N,la).call(this,e,n)},Ti=function(t,e){const n=Ct(t,{value:e});this.dispatchEvent(n)},Du=function(t){b(this,N,Ti).call(this,"update:value",t)},Bu=function(t){b(this,N,Ti).call(this,"update:preset",t)},Vu=function(){b(this,N,Ti).call(this,"ready",!0)},Uu=function(t){if(!this.ready||this.isBusy)return;const e=b(this,N,cs).call(this,t);this.setFocus(e,0)},ju=function(t){if(!this.ready)return;const{animationDuration:e}=this,n=b(this,N,cs).call(this,t);this.setFocus(n,e),b(this,N,as).call(this,e)},zu=function(){if(!this.ready)return;const{animationDuration:t}=this;this.clearFocus(t),b(this,N,as).call(this,t)},Wu=function(t){this.displayFormat=t.detail.value},Ku=function(t){t.stopPropagation(),this.setValue(t.detail.value)},Gu=function(t){this.backgroundColor=t.detail.value},qu=function(t){this.segmentsHue=t.detail.value},Ju=function(t){this.segmentsLightness=t.detail.value},Yu=function(t){this.segmentsSaturation=t.detail.value},Xu=function(t){this.thicknessHue=t.detail.value},Zu=function(t){this.thicknessLightness=t.detail.value},Qu=function(t){this.thicknessSaturation=t.detail.value},tf=function(t){this.gap=t.detail.value},ef=function(t){this.swatchGap=t.detail.value},nf=function(t){this.setCube(t.detail.value)},rf=function(t){this.gamutPreset=t.detail.value},sf=function(t){this.gamutPresets=t.detail.value},of=function(t){this.diameter=t.detail.value},lf=function(t){this.distortion=t.detail.value},af=function(){if(!this.hasPresets)return;const t=this.preset,e=this.presets.find(n=>n[0]===t)[1];this.savePreset(t,e),this.savePresetEl.value.showFeedBack("Updated")},eo=async function(){if(!this.hasPresets)return;let t="";try{t=await mt(this,Te).call(this,"prompt","Please enter a title for the new preset:")}catch{return}const e=bu(t);if(this.presets.find(n=>n[0]===e)){await mt(this,Te).call(this,"alert","A preset with this title does exist. Please choose another name."),b(this,N,eo).call(this);return}this.savePreset(e,t),this.savePresetEl.value.showFeedBack("Saved")},cf=async function(){if(this.hasPresets){try{await mt(this,Te).call(this,"confirm","Are you sure to delete this preset?")}catch{return}this.deletePreset(this.preset),this.deletePresetEl.value.showFeedBack("Deleted")}},uf=async function(){try{await mt(this,Te).call(this,"confirm","Are you sure to clear the local store?")}catch{return}this.clearStore(),this.clearStoreEl.value.showFeedBack("Cleared")},ff=async function(){try{await mt(this,Te).call(this,"confirm","Are you sure to reset all settings?")}catch{return}this.reset(),this.resetStoreEl.value.showFeedBack("Resetted")},hf=function(){this.showSettings=!1},df=function(t){if(!this.hasPresets)return;const e=t.detail.value;this.preset=e,this.loadPreset(e)},no=function(){if(this.noStore)return;const{gamutPreset:t}=this,e=this.hasPresets?this.preset:"",n={gamutPreset:t,preset:e};window.localStorage.setItem(mt(this,N,Yn),JSON.stringify(n))},pf=function(){if(this.noStore)return;const t=JSON.parse(window.localStorage.getItem(mt(this,N,Yn)));return this.hasPresets||(t.preset=""),t},gf=function(){if(!this.noStore)return JSON.parse(window.localStorage.getItem(mt(this,N,Zn)))},io=function(){this.noStore||window.localStorage.setItem(mt(this,N,Zn),JSON.stringify(this.gamutPresets))},yf=function(){if(!this.noStore&&this.hasPresets)return JSON.parse(window.localStorage.getItem(mt(this,N,Xn)))},Hn=function(){this.noStore||this.hasPresets&&window.localStorage.setItem(mt(this,N,Xn),JSON.stringify(this.presets))},mf=function(){const{gamutPreset:t,gamutPresets:e}=this,n=e.findIndex(r=>r[0]===t);let{cube:i}=this;n!==-1&&(i=e[n][2]),this.setCube(i)},hn=function(t,...e){this._rangeLightness[t](...e),this._rangeHue[t](...e),this._rangeSaturation[t](...e)},ro=function(){const{radius:t,thicknessSaturation:e,thicknessLightness:n,thicknessHue:i,gap:r}=this,s=t-r-i-r-e-r,o=Mc()({startAngle:0,endAngle:Hs,innerRadius:s-n,outerRadius:t+r});Fi(this.rangesBodyEl.value).attr("d",o)},Te=new WeakMap,so=function(){const{animationDuration:t,gap:e,radius:n,segmentsLightness:i,segmentsHue:r,segmentsSaturation:s,thicknessLightness:o,thicknessHue:l,thicknessSaturation:a}=this,c=this.rangesEl.value,u=n,f=u-l-e,d=f-a-e;this._scaleLightness=Di([0,i]).interpolate(()=>R=>{const{cube:v}=this,I=1/this.segmentsLightness*R,[T,_]=this._hslColor,O=Pe(qe([T,_,I],{cube:v})),G=Pe(qe([T,_,Math.max(0,I-.11)],{cube:v}));return{fill:O,stroke:G}}),this._scaleSaturation=Di([0,s]).interpolate(()=>R=>{const{cube:v}=this,I=1/this.segmentsSaturation*R,[T,_,O]=this._hslColor,G=Pe(qe([T,I,O],{cube:v})),Q=Pe(qe([T,I,Math.max(0,O-.1)],{cube:v}));return{fill:G,stroke:Q}}),this._scaleHue=Di([0,r]).interpolate(()=>R=>{const{cube:v}=this,I=360/this.segmentsHue*R,[T,_,O]=this._hslColor,G=Pe(qe([I,_,O],{cube:v})),Q=Pe(qe([I,_,Math.max(0,O-.1)],{cube:v}));return{fill:G,stroke:Q}});const g=R=>{const[v,I,T]=this._hslColor,_=1/this.segmentsLightness*R;this._hslColor=[v,I,_],this._rangeSaturation.update(),this._rangeHue.update()},m=R=>{const[v,I,T]=this._hslColor,_=1/this.segmentsSaturation*R;this._hslColor=[v,_,T],this._rangeLightness.update(),this._rangeHue.update()},w=R=>{const[v,I,T]=this._hslColor,_=360/this.segmentsHue*R;this._hslColor=[_,I,T],this._rangeLightness.update(),this._rangeSaturation.update()};this._rangeLightness=ls({animationDuration:t,colorizeFn:(R,v)=>this._scaleLightness(v),context:c,gap:e,name:"lightness",onClick:g,radius:d,segments:i,thickness:o}),this._rangeSaturation=ls({animationDuration:t,colorizeFn:(R,v)=>this._scaleSaturation(v),context:c,gap:e,name:"saturation",onClick:m,radius:f,segments:s,thickness:a}),this._rangeHue=ls({animationDuration:t,colorizeFn:(R,v)=>this._scaleHue(v),context:c,gap:e,name:"hue",onClick:w,radius:u,segments:r,thickness:l}),this.rootEl.value.addEventListener("keyup",async R=>{var v;if(R.target===this.rootEl.value)switch(R.key){case"c":this.valueEl.value?await((v=this.valueEl.value)==null?void 0:v.copyToClipboard()):await this.copyToClipboard();break;case"f":this.cycleFormat();break;case"g":this.cycleGamutPreset();break;case"G":this.cycleGamutPreset(!0);break;case"p":this.cyclePreset();break;case"P":this.cyclePreset(!0);break;case"r":this.resetValue();break;case"s":this.noSettings||(this.showSettings=!this.showSettings);break;case"v":this.noValue||(this.showValue=!this.showValue);break}}),b(this,N,ro).call(this),setTimeout(()=>{this._ready=!0},t)},P(oo,"properties",{_hslColor:{state:!0},_dialogs:{state:!0},_initialSettings:{state:!0},_ready:{type:Boolean,attribute:!1},cube:{type:Array,attribute:!1},gamutPresets:{type:Array,attribute:!1},presets:{type:Array,attribute:!1},animationDuration:{type:Number,reflect:!0},backgroundColor:{type:String,reflect:!0},diameter:{type:Number,reflect:!0},displayFormat:{type:String,reflect:!0},distortion:{type:Number,reflect:!0},gamutPreset:{type:String,reflect:!0},gap:{type:Number,reflect:!0},hasPresets:{type:Boolean},id:{type:String},initialValue:{type:String,reflect:!0},noInit:{type:Boolean},noSettings:{type:Boolean},noStore:{type:Boolean},noValue:{type:Boolean},padding:{type:Number,reflect:!0},preset:{type:String,reflect:!0},segmentsHue:{type:Number,reflect:!0},segmentsLightness:{type:Number,reflect:!0},segmentsSaturation:{type:Number,reflect:!0},show:{type:Boolean,reflect:!0},showSettings:{type:Boolean,reflect:!0},showValue:{type:Boolean,reflect:!0},swatchGap:{type:Number,reflect:!0},thicknessHue:{type:Number,reflect:!0},thicknessLightness:{type:Number,reflect:!0},thicknessSaturation:{type:Number,reflect:!0},value:{type:String,reflect:!0},storeConfigKey:{type:String},storeGamutPresetsKey:{type:String},storePresetsKey:{type:String}}),P(oo,"styles",St`
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
  `);window.customElements.define("ryb-color-picker-ui-alert",du);window.customElements.define("ryb-color-picker-ui-button",Rs);window.customElements.define("ryb-color-picker-ui-confirm",mu);window.customElements.define("ryb-color-picker-ui-dialog",Os);window.customElements.define("ryb-color-picker-ui-field",Is);window.customElements.define("ryb-color-picker-ui-gamut",Ds);window.customElements.define("ryb-color-picker-ui-gamut-cube",Vs);window.customElements.define("ryb-color-picker-ui-icon",Us);window.customElements.define("ryb-color-picker-ui-icon-button",js);window.customElements.define("ryb-color-picker-ui-input",zs);window.customElements.define("ryb-color-picker-ui-prompt",Ws);window.customElements.define("ryb-color-picker-ui-selector",Ks);window.customElements.define("ryb-color-picker-ui-separator",Gs);window.customElements.define("ryb-color-picker-ui-stepper-input",Js);window.customElements.define("ryb-color-picker-ui-tool-tip",Ys);window.customElements.define("ryb-color-picker-settings",Xs);window.customElements.define("ryb-color-picker-value",Zs);window.customElements.define("ryb-color-swatch",to);window.customElements.define("ryb-color-picker",oo);const r2={VITE_API_DOCUMENTATION_URL:"https://github.com/bennyschudel/ryb-color-picker/blob/main/API.md",VITE_APP_VERSION:"0.5.0-alpha20",VITE_GITHUB_URL:"https://github.com/bennyschudel/ryb-color-picker"},{VITE_APP_VERSION:s2,VITE_API_DOCUMENTATION_URL:o2,VITE_GITHUB_URL:l2}=r2,a2=s2,c2=o2,u2=l2,f2={class:"body"},h2={class:"head"},d2={class:"ml-2"},p2=["href"],g2=["href"],y2={class:"badge"},m2=["initialValue"],b2=mh({__name:"App",setup(t){const e=ei("hotpink"),n=ei("black"),i=wp(),r=lp(i),s=Qt(()=>({"--background-color":n.value}));function o(c){n.value=c.detail.value}const l=bh("picker"),a=[["my-preset","My Preset",{backgroundColor:"white",diameter:320,displayFormat:"hex",distortion:3,gamutPreset:"itten-normalized",gap:0,padding:30,segmentsHue:48,segmentsLightness:24,segmentsSaturation:24,swatchGap:8,thicknessHue:24,thicknessLightness:20,thicknessSaturation:20}],["my-preset-2","My Preset 2",{backgroundColor:"transparent",diameter:420,displayFormat:"rgb",distortion:3,gamutPreset:"munsell",gap:1,padding:30,segmentsHue:48,segmentsLightness:12,segmentsSaturation:12,swatchGap:8,thicknessHue:40,thicknessLightness:28,thicknessSaturation:28}]];return kr(()=>{if(l.value){const c=Array.from(at,([u,f])=>[u,f.title,f.cube]);l.value.loadGamutPresets(c,"itten-normalized"),l.value.loadPresets(a,"my-preset"),tr(l.value,"update:value",o)}}),(c,u)=>(ld(),ud("div",{class:"app",style:vr(s.value)},[qt("div",f2,[qt("div",h2,[qt("button",{onClick:u[0]||(u[0]=f=>Ne(r)())},[qt("span",d2,us(Ne(i)?"Dark":"Light"),1)]),qt("a",{href:Ne(c2)},"API Documentation",8,p2),qt("a",{href:Ne(u2)},"Github",8,g2)]),u[1]||(u[1]=qt("h1",null,"<ryb-color-picker>",-1)),qt("div",y2,us(Ne(a2)),1),qt("ryb-color-picker",{ref:"picker",initialValue:e.value,hasPresets:""},null,8,m2),u[2]||(u[2]=pd('<div class="shortcuts" data-v-27cd5f3d><h3 data-v-27cd5f3d>Shortcuts</h3><table data-v-27cd5f3d><tbody data-v-27cd5f3d><tr data-v-27cd5f3d><td data-v-27cd5f3d>c</td><td data-v-27cd5f3d>copy value to clipboard</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>f</td><td data-v-27cd5f3d>cycle format</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>g</td><td data-v-27cd5f3d>cygle gamut-preset</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>shift + g</td><td data-v-27cd5f3d>cycle gamut-preset backwards</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>p</td><td data-v-27cd5f3d>cycle preset</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>shift + p</td><td data-v-27cd5f3d>cycle preset backwards</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>r</td><td data-v-27cd5f3d> reset value (good if the color is to dark, to bright or to desaturated) </td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>s</td><td data-v-27cd5f3d>toggle settings</td></tr><tr data-v-27cd5f3d><td data-v-27cd5f3d>v</td><td data-v-27cd5f3d>toggle value-bar</td></tr></tbody></table></div><p class="note" data-v-27cd5f3d> 2025, by <a href="https://twitter.com/bennyschudel" target="_blank" data-v-27cd5f3d>@bennyschudel</a>, MIT License </p>',2))])],4))}}),v2=(t,e)=>{const n=t.__vccOpts||t;for(const[i,r]of e)n[i]=r;return n},_2=v2(b2,[["__scopeId","data-v-27cd5f3d"]]);Gd(_2).mount("#app");
