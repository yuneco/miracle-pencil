var Ce=Object.defineProperty;var ne=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,xe=Object.prototype.propertyIsEnumerable;var se=(t,e,o)=>e in t?Ce(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,ie=(t,e)=>{for(var o in e||(e={}))we.call(e,o)&&se(t,o,e[o]);if(ne)for(var o of ne(e))xe.call(e,o)&&se(t,o,e[o]);return t};import{d as q,r as M,a as G,w as I,b as y,o as Ie,c as d,e as _,f as v,g as m,h as Ve,u as T,i as $,j as f,k as P,t as D,n as z,l as B,m as r,p as S,q as A,s as U,v as ce,F as re,x as ke,y as Se,z as Ae,A as E,B as j,C as J,D as Q,E as Me,T as de,G as ue,H as Te,I as Le,J as Ee,K as Pe}from"./vendor.ed510f13.js";const De=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}};De();const O=q("canvas",{state:()=>({penColor:"#3399aa",penCount:[6,0],isKaleido:[!0,!0],penWidth:20,isStraight:!1,isEraser:!1,penOpacity:100,tool:"draw"})}),Z={min:1,max:16},H={min:2,max:16},R=(t,e,o)=>Math.max(e,Math.min(o,t)),Y=(t,e,o=0)=>o+Math.round((t-o)/e)*e,Be=()=>{const t=O(),e=n=>{const[a,s]=t.$state.penCount;if(s){const u=R(s+(n?1:-1),H.min,H.min);t.$state.penCount=[a,u]}else{const u=R(a+(n?1:-1),Z.min,Z.max);t.$state.penCount=[u,s]}};return{penCountUp:()=>e(!0),penCountDown:()=>e(!1)}},W=M(),ee=M(),me=t=>{var e,o,l;t.key==="ArrowUp"&&((e=ee.value)==null||e.penCountUp()),t.key==="ArrowDown"&&((o=ee.value)==null||o.penCountDown()),t.key==="z"&&t.metaKey&&((l=W.value)==null||l.undo())};window.removeEventListener("keydown",me);window.addEventListener("keydown",me);const Re=t=>{const e=O();ee.value=Be(),!!W.value&&console.warn("SymPaint init called multiple times.");const l=new G.exports.PaintCanvas(t,t.offsetWidth,t.offsetHeight);l.penCount=e.penCount,l.penColor=e.penColor,l.penWidth=e.penWidth,l.tool=e.isStraight?"draw:line":"draw",l.isKaleido=e.isKaleido,l.penKind=e.isEraser?"eraser":"normal",l.listenRequestZoom(a=>{l.coord=l.coord.clone({scale:a})}),l.listenRequestScrollTo(({point:a,target:s})=>{s==="canvas"&&(l.coord=l.coord.clone({scroll:a})),s==="anchor"&&(l.activeAnchor=l.activeAnchor.clone({scroll:a}))}),l.listenRequestRotateTo(({angle:a,target:s})=>{s==="canvas"&&(l.coord=l.coord.clone({angle:a})),s==="anchor"&&(l.activeAnchor=l.activeAnchor.clone({angle:a}))}),l.listenRequestUndo(()=>{l.undo()}),l.listenRequestAnchorTransform(a=>{l.activeAnchor=a}),l.listenRequestAnchorReset(()=>{l.anchor=new G.exports.Coordinate}),new G.exports.utils.ToolKeyWatcher().listenChange(a=>e.tool=a),I(()=>[e.$state.penColor],()=>{l.penColor=e.$state.penColor}),I(()=>[e.$state.penCount],()=>{l.penCount=e.$state.penCount,e.$state.penCount[0]===1&&(l.isKaleido=[!1,e.$state.isKaleido[1]])}),I(()=>[e.$state.penWidth],()=>{l.penWidth=e.$state.penWidth}),I(()=>[e.$state.isStraight],()=>{l.tool=e.isStraight?"draw:line":"draw"}),I(()=>[e.$state.isKaleido],()=>{l.isKaleido=e.isKaleido,e.$state.penCount[0]===1&&(l.isKaleido=[!1,e.$state.isKaleido[1]])}),I(()=>[e.$state.isEraser],()=>{l.penKind=e.isEraser?"eraser":"normal"}),I(()=>[e.$state.penOpacity],()=>{l.penAlpha=e.$state.penOpacity/100}),I(()=>[e.$state.tool],()=>{l.tool=e.$state.tool}),W.value=l},pe=()=>({state:O().$state,init:e=>Re(e),toImgBlob:()=>{var e;return(e=W.value)==null?void 0:e.toImgBlob()}});var x=(t,e)=>{const o=t.__vccOpts||t;for(const[l,n]of e)o[l]=n;return o};const Ke=y({setup(t){const e=M(),{init:o}=pe();return Ie(()=>{const l=e.value;!l||(l.addEventListener("touchmove",n=>{n.preventDefault()}),o(l))}),(l,n)=>(d(),_("div",{ref_key:"el",ref:e,class:"PaintCanvas"},null,512))}});var ze=x(Ke,[["__scopeId","data-v-0ebaceef"]]);const te=async t=>new Promise(e=>{setTimeout(e,t)}),Ue={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 128 128"},Oe=m("rect",{width:"128",height:"128",fill:"none"},null,-1),Ze=["fill"],He=["fill"],We=["fill"],Ne=["fill"],Fe=["fill"],Xe=["fill"],qe=["fill"],Ge=["fill"],je=Ve(`<path d="M86.9,56.7c-7,0-12.7,5.7-12.7,12.7c0,7,5.7,12.7,12.7,12.7c0,0,0,0,0,0c7,0,12.7-5.7,12.7-12.7
		C99.6,62.4,94,56.7,86.9,56.7z"></path><path d="M56.2,56.7c-7,0-12.7,5.7-12.7,12.7c0,7,5.7,12.7,12.7,12.7c0,0,0,0,0,0c7,0,12.7-5.7,12.7-12.7
		C68.9,62.4,63.3,56.7,56.2,56.7z"></path><path d="M48.3,48.3c4.8,0,8.7-3.9,8.7-8.7c0-4.8-3.9-8.7-8.7-8.7c-4.8,0-8.7,3.9-8.7,8.7C39.6,44.4,43.5,48.3,48.3,48.3
		C48.3,48.3,48.3,48.3,48.3,48.3z"></path><path d="M98.5,30.8c-4.8,0-8.7,3.9-8.7,8.7c0,4.8,3.9,8.7,8.7,8.7c0,0,0,0,0,0c4.8,0,8.7-3.9,8.7-8.7
		C107.2,34.7,103.3,30.8,98.5,30.8z"></path><path d="M82.2,39.5c0-4.8-3.9-8.7-8.7-8.7c-4.8,0-8.7,3.9-8.7,8.7c0,4.8,3.9,8.7,8.7,8.7c0,0,0,0,0,0
		C78.3,48.3,82.2,44.4,82.2,39.5z"></path><path d="M115.2,6.1H12.8c-3.7,0-6.6,3-6.6,6.6v102.5c0,3.7,3,6.6,6.6,6.6h102.5c3.7,0,6.6-3,6.6-6.6V12.8
		C121.9,9.1,118.9,6.1,115.2,6.1z M108.6,60.6c-2.2,2.3-3.6,5.4-3.6,8.8s1.4,6.6,3.6,8.8v6.8c-9,1-16.4,7.3-19.1,15.7
		c-2.9-9.2-11.6-15.8-21.7-15.8c-10.1,0-18.7,6.6-21.7,15.8c-3-9.2-11.6-15.8-21.7-15.8c-1.7,0-3.4,0.2-5,0.6v-4.9
		c1.8,1,3.9,1.6,6.1,1.6c0,0,0,0,0,0c7,0,12.7-5.7,12.7-12.7c0-7-5.7-12.7-12.7-12.7c-2.2,0-4.3,0.6-6.1,1.6v-11
		c1.2,0.6,2.4,0.9,3.8,0.9c0,0,0,0,0,0c4.8,0,8.7-3.9,8.7-8.7c0-4.8-3.9-8.7-8.7-8.7c-1.4,0-2.7,0.3-3.8,0.9v-8.1
		c2.1-0.4,3.6-2.1,4-4.2h8.4c0.4,2.4,2.5,4.3,5,4.3s4.6-1.9,5-4.3h8.4c0.4,2.4,2.5,4.3,5,4.3s4.6-1.9,5-4.3h8.4
		c0.4,2.4,2.5,4.3,5,4.3s4.6-1.9,5-4.3h8.4c0.4,2.4,2.4,4.2,4.9,4.3c0,0,0.1,0,0.1,0c2.5,0,4.6-1.9,5-4.3h8.3
		c0.3,1.8,1.5,3.3,3.1,3.9V60.6z"></path>`,6),Je=[je],Qe=["fill"],Ye=["fill"],et=m("rect",{x:"11.13",y:"16.45",width:"104.97",height:"14.33",rx:"3.2"},null,-1),tt=m("rect",{x:"10.47",y:"42",width:"105.63",height:"21.62",rx:"3.2"},null,-1),ot=m("rect",{x:"10.47",y:"80.06",width:"105.63",height:"31.46",rx:"3.2"},null,-1),lt=[et,tt,ot],at=["fill"],nt=m("path",{d:"M69,33.7H59a6.6,6.6,0,0,0,0,13.2H69a1.44,1.44,0,0,1,1.55,1.26v52.28A1.45,1.45,0,0,1,69,101.7H14.75a1.45,1.45,0,0,1-1.55-1.26V48.16a1.44,1.44,0,0,1,1.55-1.26h10a6.6,6.6,0,1,0,0-13.2h-10A14.62,14.62,0,0,0,0,48.16v52.28A14.63,14.63,0,0,0,14.75,114.9H69a14.63,14.63,0,0,0,14.75-14.46V48.16A14.62,14.62,0,0,0,69,33.7Z"},null,-1),st=m("path",{d:"M27.11,28.19a6.58,6.58,0,0,0,4.67-1.93l3.49-3.49V69.83a6.6,6.6,0,0,0,13.2,0V22.29L52,25.78a6.6,6.6,0,0,0,9.33-9.33L46.77,1.93a6.61,6.61,0,0,0-9.33,0l-15,15a6.6,6.6,0,0,0,4.66,11.27Z"},null,-1),it=[nt,st],ct=["fill"],rt=m("path",{d:"M30.16,65.34a8.73,8.73,0,1,1,8.73,8.72A8.73,8.73,0,0,1,30.16,65.34Z"},null,-1),dt=m("path",{d:"M56.27,65.34A8.73,8.73,0,1,1,65,74.06,8.72,8.72,0,0,1,56.27,65.34Z"},null,-1),ut=m("path",{d:"M82.37,65.34a8.73,8.73,0,1,1,8.72,8.72A8.72,8.72,0,0,1,82.37,65.34Z"},null,-1),mt=[rt,dt,ut],_e=y({props:{symbol:null,color:{default:"#444"}},setup(t){return(e,o)=>(d(),_("svg",Ue,[Oe,t.symbol==="2nd"?(d(),_("path",{key:0,fill:t.color,d:"M119.81,64a6.5,6.5,0,0,0-6.5-6.5h-1l.52-.91a6.5,6.5,0,1,0-11.26-6.5L101,51l-.52-.91a6.52,6.52,0,0,0-7.5-3,6.49,6.49,0,0,0,1.18-8l-.53-.91h1a6.5,6.5,0,0,0,0-13h-1l.53-.9a6.5,6.5,0,1,0-11.26-6.5l-.52.9-.53-.9a6.5,6.5,0,1,0-11.26,6.5l.53.9h-1a6.51,6.51,0,0,0-6.32,5,6.51,6.51,0,0,0-6.32-5h-1l.52-.9a6.5,6.5,0,1,0-11.26-6.5l-.52.9-.53-.9a6.5,6.5,0,1,0-11.26,6.5l.53.9H32.83a6.5,6.5,0,1,0,0,13h1.05l-.53.91a6.49,6.49,0,0,0,1.18,8,6.51,6.51,0,0,0-7.5,3l-.52.91L26,50.09a6.5,6.5,0,1,0-11.26,6.5l.52.91h-1a6.5,6.5,0,0,0,0,13h1l-.52.91a6.49,6.49,0,0,0,2.38,8.87,6.37,6.37,0,0,0,3.24.88A6.52,6.52,0,0,0,26,77.91l.52-.91.52.91a6.52,6.52,0,0,0,5.64,3.25,6.28,6.28,0,0,0,1.86-.29,6.51,6.51,0,0,0-1.18,8l.53.91H32.83a6.5,6.5,0,0,0,0,13h1.05l-.53.9a6.51,6.51,0,0,0,2.38,8.88,6.48,6.48,0,0,0,8.88-2.38l.53-.9.52.9a6.5,6.5,0,0,0,11.26-6.5l-.52-.9h1a6.51,6.51,0,0,0,6.32-5,6.51,6.51,0,0,0,6.32,5h1l-.53.9A6.5,6.5,0,0,0,73,112.54a6.41,6.41,0,0,0,3.25.88,6.49,6.49,0,0,0,5.63-3.26l.53-.9.52.9a6.5,6.5,0,0,0,11.26-6.5l-.53-.9h1a6.5,6.5,0,0,0,0-13h-1l.53-.91a6.5,6.5,0,0,0-1.18-8,6.28,6.28,0,0,0,1.86.29,6.52,6.52,0,0,0,5.64-3.25L101,77l.52.91a6.52,6.52,0,0,0,5.64,3.25,6.37,6.37,0,0,0,3.24-.88,6.48,6.48,0,0,0,2.38-8.87l-.52-.91h1A6.5,6.5,0,0,0,119.81,64Zm-56,30.76a6.5,6.5,0,0,0-6.32-5h-1l.52-.91a6.5,6.5,0,0,0-11.26-6.5l-.52.91-.53-.91a6.49,6.49,0,0,0-7.49-3,6.49,6.49,0,0,0,1.17-8l-.52-.91h1a6.5,6.5,0,0,0,0-13h-1l.52-.91a6.51,6.51,0,0,0-1.17-8A6.23,6.23,0,0,0,39,48.9a6.5,6.5,0,0,0,5.63-3.25l.53-.91.52.91a6.5,6.5,0,0,0,11.26-6.5l-.52-.91h1a6.5,6.5,0,0,0,6.32-5,6.5,6.5,0,0,0,6.32,5h1l-.53.91a6.5,6.5,0,0,0,11.26,6.5l.53-.91.52.91a6.5,6.5,0,0,0,5.63,3.25,6.34,6.34,0,0,0,1.87-.29,6.5,6.5,0,0,0-1.18,8l.52.91h-1a6.5,6.5,0,1,0,0,13h1l-.52.91a6.49,6.49,0,0,0,1.17,8,6.49,6.49,0,0,0-7.49,3l-.52.91-.53-.91a6.5,6.5,0,0,0-11.26,6.5l.53.91h-1A6.5,6.5,0,0,0,63.76,94.76Z"},null,8,Ze)):v("",!0),t.symbol==="count"?(d(),_("path",{key:1,fill:t.color,d:"M113,56.36H74.79L93.9,23.27a6.81,6.81,0,0,0-11.8-6.8L63,49.55,43.9,16.47a6.81,6.81,0,0,0-11.8,6.8L51.21,56.36H13A6.81,6.81,0,0,0,13,70H51.21L32.1,103.07a6.81,6.81,0,0,0,11.8,6.81L63,76.79l19.1,33.09a6.81,6.81,0,0,0,5.91,3.4,6.81,6.81,0,0,0,5.89-10.21L74.79,70H113a6.81,6.81,0,0,0,0-13.62Z"},null,8,He)):v("",!0),t.symbol==="eraser"?(d(),_("path",{key:2,fill:t.color,d:"M118.24,48.91,81,11.43a6.46,6.46,0,0,0-9.15,0L9.69,73.13a6.43,6.43,0,0,0-1.91,4.56,6.5,6.5,0,0,0,1.87,4.59l37.21,37.48a6.48,6.48,0,0,0,4.6,1.91A6.41,6.41,0,0,0,56,119.79L118.2,58.06a6.43,6.43,0,0,0,1.91-4.56A6.5,6.5,0,0,0,118.24,48.91ZM76.4,25.14l8.3,8.36L48.57,69.36,40.27,61ZM51.49,106.05,23.4,77.75l7.69-7.63,28.09,28.3ZM68.36,89.31,60.06,81,96.2,45.08l8.29,8.36Z"},null,8,We)):v("",!0),t.symbol==="freehand"?(d(),_("path",{key:3,fill:t.color,d:"M18.55,118.29a6.63,6.63,0,0,1-6.63-6.43c-1-31,24.9-42.16,47.73-52C82.65,50,102.51,41.4,102,16.48a6.64,6.64,0,0,1,6.5-6.77h.14a6.64,6.64,0,0,1,6.63,6.5C116,50.06,88.83,61.74,64.9,72.05c-25.14,10.83-40.36,18.89-39.72,39.4a6.64,6.64,0,0,1-6.42,6.84Z"},null,8,Ne)):v("",!0),t.symbol==="line"?(d(),_("path",{key:4,fill:t.color,d:"M16.36,119.08a6.63,6.63,0,0,1-4.82-11.19l90.08-95.32a6.64,6.64,0,1,1,9.64,9.12L21.18,117A6.61,6.61,0,0,1,16.36,119.08Z"},null,8,Fe)):v("",!0),t.symbol==="mode_kaleido"?(d(),_("path",{key:5,fill:t.color,d:"M115.67,47a34.49,34.49,0,0,0-27.81-7.24,51.67,51.67,0,0,0-17,6A43.92,43.92,0,0,0,67,27.46C62.64,17.65,54.54,10,45.38,7.07,39,5,32.68,5.44,27.7,8.31c-5.34,3.08-9.15,9-10.45,16.3a34.47,34.47,0,0,0,7.64,27.7,51.54,51.54,0,0,0,14.34,12A44.11,44.11,0,0,0,25.38,76.8c-6.29,8.72-8.84,19.54-6.83,29,1.41,6.59,4.94,11.81,9.92,14.69A20.21,20.21,0,0,0,38.63,123a27.09,27.09,0,0,0,9.18-1.67A34.49,34.49,0,0,0,68,100.88a51.84,51.84,0,0,0,3.23-17.65,43.82,43.82,0,0,0,17.1,5.41,40.94,40.94,0,0,0,4.13.21c9.25,0,18.13-3.15,24.35-8.77,5-4.52,7.77-10.18,7.77-15.94C124.56,58,121.32,51.71,115.67,47ZM35.09,43.83A21.06,21.06,0,0,1,30.31,27c.59-3.32,2.13-6.06,4-7.15a6.43,6.43,0,0,1,3.21-.75,12.34,12.34,0,0,1,3.76.65c4.36,1.41,10.23,5.61,13.63,13.19a33.18,33.18,0,0,1,.93,23.94A38.88,38.88,0,0,1,35.09,43.83ZM55.53,96.28A21.06,21.06,0,0,1,43.3,108.87c-3.17,1.14-6.31,1.18-8.2.09-1.66-1-3-3.14-3.57-6-1-4.48-.25-11.67,4.61-18.41A33.14,33.14,0,0,1,56.41,71.8,38.93,38.93,0,0,1,55.53,96.28Zm52.37-26c-3.4,3.07-10,6-18.25,5.21A33.14,33.14,0,0,1,68.46,64.27,38.88,38.88,0,0,1,90.1,52.79a21.09,21.09,0,0,1,17,4.3c2.57,2.17,4.17,4.87,4.17,7C111.29,66.07,110.05,68.28,107.9,70.23Z"},null,8,Xe)):v("",!0),t.symbol==="mode_mirror"?(d(),_("path",{key:6,fill:t.color,d:"M118.53,62.47a6.64,6.64,0,0,0-11.76,6.16,8.26,8.26,0,0,1-.26,8.74c-2.1,3.19-6.06,4.89-10.56,4.53-9.43-.74-22.73-11.19-27.28-15.35,1.26-6.29,4.43-25.76-1.54-38.36-4-8.39-11.77-13.93-20.35-14.47A21.66,21.66,0,0,0,27.05,24a6.63,6.63,0,1,0,11.19,7.13A8.25,8.25,0,0,1,46,27c3.82.23,7.25,2.82,9.19,6.9,3.92,8.28,1.75,24.24.39,30.7-5.9,2-24.6,9.05-32.57,20.65-5.26,7.66-6.14,17.18-2.29,24.87A21.6,21.6,0,0,0,39.41,122h.28A6.63,6.63,0,0,0,40,108.75a8.27,8.27,0,0,1-7.43-4.6c-1.7-3.42-1.2-7.68,1.37-11.41,5.22-7.6,20.28-13.77,26.48-15.8C64.56,80.67,80.49,94,94.91,95.13c.72.05,1.43.08,2.14.08a24.38,24.38,0,0,0,20.54-10.54A21.61,21.61,0,0,0,118.53,62.47Z"},null,8,qe)):v("",!0),t.symbol==="opacity"?(d(),_("g",{key:7,fill:t.color},Je,8,Ge)):v("",!0),t.symbol==="pen"?(d(),_("path",{key:8,fill:t.color,d:"M117.8,35.64,91.86,9.89A6.65,6.65,0,0,0,87.28,8a6.47,6.47,0,0,0-4.56,1.91l-65.5,66a6.4,6.4,0,0,0-1.73,3.21l-7.06,33A6.46,6.46,0,0,0,14.75,120a6.66,6.66,0,0,0,1.4-.15l33-7.3a6.47,6.47,0,0,0,3.19-1.76l65.5-66A6.46,6.46,0,0,0,117.8,35.64ZM44.5,100.33l-10.86,2.4-8.21-8.29,2.29-10.76L87.34,23.61l16.77,16.65Z"},null,8,Qe)):v("",!0),t.symbol==="width"?(d(),_("g",{key:9,fill:t.color},lt,8,Ye)):v("",!0),t.symbol==="export"?(d(),_("g",{key:10,fill:t.color,transform:"translate(22 6)"},it,8,at)):v("",!0),t.symbol==="other"?(d(),_("g",{key:11,fill:t.color},mt,8,ct)):v("",!0)]))}}),L={textColor:"#3a3a3a",themeColor:"rgb(147, 204, 214)",themeDark:"rgb(68, 139, 156)"};const pt={key:0,class:"icon"},_t={class:"content"},ht={key:1,class:"label"},ft=y({props:{icon:null,label:null,checked:{type:Boolean,default:!1},edge:{default:"both"},disabled:{type:Boolean,default:!1},enableFlash:{type:Boolean,default:!0}},emits:["check"],setup(t,{emit:e}){const o=t;T(s=>({"17132b28":r(L).textColor}));const l=M(!1),n=async()=>{const s=!o.checked;e("check",s),s&&o.enableFlash&&(l.value=!0,await te(100),l.value=!1)},a=$(()=>({borderRadius:{left:[!0,!1,!1,!0],right:[!1,!0,!0,!1],both:[!0,!0,!0,!0],none:[!1,!1,!1,!1]}[o.edge].map(u=>u?"4px":"0").join(" "),borderRightWidth:o.edge==="right"||o.edge==="both"?"1px":"0"}));return(s,u)=>(d(),_("button",{class:z(["PaletteItem",{PaletteItem__disabled:t.disabled,PaletteItem__checked:t.checked,PaletteItem__flash:l.value}]),style:B(ie({},r(a))),onPointerdown:n},[t.icon?(d(),_("span",pt,[f(_e,{symbol:t.icon},null,8,["symbol"])])):v("",!0),m("div",_t,[P(s.$slots,"default",{},void 0,!0)]),t.label?(d(),_("span",ht,D(t.label),1)):v("",!0)],38))}});var N=x(ft,[["__scopeId","data-v-605fbebc"]]);const vt={class:"CheckItem"},oe=y({props:{modelValue:{type:Boolean},label:{default:""},icon:null,edge:null},emits:["update:modelValue"],setup(t,{emit:e}){const o=l=>{e("update:modelValue",l)};return(l,n)=>(d(),_("div",vt,[f(N,{label:t.label,icon:t.icon,checked:t.modelValue,edge:t.edge,onCheck:o},{default:S(()=>[P(l.$slots,"default")]),_:3},8,["label","icon","checked","edge"])]))}});const gt=["value"],yt=y({props:{modelValue:null},emits:["update:modelValue"],setup(t,{emit:e}){const o=M(),l=()=>{var a;(a=o.value)==null||a.click()},n=a=>{e("update:modelValue",a.target.value)};return(a,s)=>(d(),_("div",{class:"ColorSelector",onPointerdown:l},[m("div",{class:"view",style:B({backgroundColor:t.modelValue})},null,4),m("input",{type:"color",ref_key:"inp",ref:o,value:t.modelValue,onInput:s[0]||(s[0]=u=>n(u))},null,40,gt)],32))}});var bt=x(yt,[["__scopeId","data-v-0478e197"]]);const $t={class:"ColorSelectItem"},Ct=y({props:{modelValue:null,checked:{type:Boolean,default:!1},icon:null,edge:null},emits:["update:modelValue","update:checked"],setup(t,{emit:e}){const o=t,l=$({get:()=>o.modelValue,set:a=>{e("update:modelValue",a)}}),n=$({get:()=>o.checked,set:a=>{e("update:checked",a)}});return(a,s)=>(d(),_("div",$t,[f(oe,{icon:t.icon,edge:t.edge,modelValue:r(n),"onUpdate:modelValue":s[1]||(s[1]=u=>A(n)?n.value=u:null)},{default:S(()=>[f(bt,{modelValue:r(l),"onUpdate:modelValue":s[0]||(s[0]=u=>A(l)?l.value=u:null)},null,8,["modelValue"])]),_:1},8,["icon","edge","modelValue"])]))}});const wt={class:"Slider"},xt={class:"label"},It={class:"value"},Vt=y({props:{min:{default:0},max:{default:100},step:{default:1},modelValue:null,label:{default:""}},emits:["update:modelValue","close"],setup(t,{emit:e}){const o=t;T(h=>({"69b84626":r(L).themeColor}));const l=120,n=U({isDragging:!1}),a=$(()=>(o.modelValue-o.min)/(o.max-o.min)),s=h=>{const b=R(h.offsetX/l,0,1),g=Y(o.min+b*(o.max-o.min),o.step,o.min);e("update:modelValue",g)},u=h=>{s(h),n.isDragging=!0},C=h=>{!n.isDragging||s(h)},w=async h=>{!n.isDragging||(s(h),n.isDragging=!1,await te(200),V())},V=()=>{e("close")};return(h,b)=>(d(),_("div",wt,[m("span",xt,D(t.label),1),m("div",{class:"bar",onPointerdown:u,onPointermove:C,onPointercancel:w,onPointerup:w},[m("div",{class:"fill",style:B({transform:`scaleX(${r(a)})`})},null,4),m("div",It,D(t.modelValue),1)],32)]))}});var kt=x(Vt,[["__scopeId","data-v-6f608bda"]]);const St=5,he=(t,e,o)=>{document.body.style.cursor="ew-resize";const l=t.screenX;let n=!1;const a=u=>{u.preventDefault();const C=u.screenX-l;!n&&Math.abs(C)<St||(e(C),n=!0)},s=()=>{document.body.removeEventListener("pointermove",a),document.body.removeEventListener("pointerup",s),document.body.removeEventListener("pointercancel",s),document.body.style.cursor="",o(n)};document.body.addEventListener("pointermove",a),document.body.addEventListener("pointerup",s),document.body.addEventListener("pointercancel",s)},fe=q("toolbar",{state:()=>({activeItemId:""})});const At={class:"SliderItem"},Mt={key:0,class:"slider"},Tt=y({props:{min:{default:0},max:{default:100},modelValue:null,step:{default:1},label:{default:""},unit:{default:""},icon:null,edge:null,disabled:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(t,{emit:e}){const o=t,l=fe(),n=`slider-${Math.random()}`,a=U({startValue:0,isSliderVisible:!1}),s=120;I(()=>l.$state.activeItemId,()=>{l.$state.activeItemId!==n&&(a.isSliderVisible=!1)});const u=()=>{l.$state.activeItemId===n&&(l.$state.activeItemId="")};I(()=>o.disabled,()=>{o.disabled&&u()});const C=h=>{a.startValue=o.modelValue,a.isSliderVisible=!0,l.$state.activeItemId=n,he(h,b=>{const g=s/(o.max-o.min),k=R(Y(a.startValue+b/g,o.step,o.min),o.min,o.max);e("update:modelValue",k)},b=>{b&&u()})},w=h=>{o.disabled||(a.isSliderVisible?u():C(h))},V=h=>{e("update:modelValue",h)};return(h,b)=>(d(),_("div",At,[f(N,{onPointerdown:ce(w,["prevent"]),label:`${t.modelValue}${t.unit}`,icon:t.icon,edge:t.edge,disabled:t.disabled},null,8,["onPointerdown","label","icon","edge","disabled"]),r(a).isSliderVisible?(d(),_("div",Mt,[f(kt,{modelValue:t.modelValue,"onUpdate:modelValue":V,label:t.label,min:t.min,max:t.max,onClose:u},null,8,["modelValue","label","min","max"])])):v("",!0)]))}});var F=x(Tt,[["__scopeId","data-v-2eb33757"]]);const Lt={class:"SwitchList"},Et={class:"label"},Pt={class:"list"},Dt=["onPointerdown"],Bt={key:0,class:"icon"},Rt=y({props:{options:{default:()=>[]},modelValue:null,label:null},emits:["update:modelValue","close"],setup(t,{emit:e}){T(l=>({bd837018:r(L).themeColor}));const o=async l=>{e("update:modelValue",l),await te(200),e("close")};return(l,n)=>(d(),_("div",Lt,[m("div",Et,D(t.label),1),m("ul",Pt,[(d(!0),_(re,null,ke(t.options,a=>(d(),_("li",{key:a.key,class:z(["opt",{selected:a.key===t.modelValue}]),onPointerdown:s=>o(a.key)},[a.icon?(d(),_("div",Bt,[f(_e,{symbol:a.icon},null,8,["symbol"])])):v("",!0)],42,Dt))),128))])]))}});var Kt=x(Rt,[["__scopeId","data-v-cd527ff8"]]);const zt={class:"SwitchItem"},Ut={class:"list"},Ot=y({props:{modelValue:null,options:{default:()=>[]},label:{default:""},edge:null,disabled:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(t,{emit:e}){const o=t,l=$(()=>o.options.find(g=>g.key===o.modelValue)),n=$(()=>o.options.findIndex(g=>g.key===o.modelValue)),a=fe(),s=`switch-${Math.random()}`,u=U({startIndex:0,isListVisible:!1}),C=120;I(()=>a.$state.activeItemId,()=>{a.$state.activeItemId!==s&&(u.isListVisible=!1)});const w=()=>{a.$state.activeItemId===s&&(a.$state.activeItemId="")};I(()=>o.disabled,()=>{o.disabled&&w()});const V=g=>{u.startIndex=n.value,u.isListVisible=!0,a.$state.activeItemId=s,he(g,k=>{const i=C,c=R(Y(u.startIndex+k/i,1,0),0,o.options.length-1);e("update:modelValue",o.options[c].key)},k=>{k&&w()})},h=g=>{o.disabled||(u.isListVisible?w():V(g))},b=g=>{e("update:modelValue",g)};return(g,k)=>{var i;return d(),_("div",zt,[f(N,{onPointerdown:ce(h,["prevent"]),icon:(i=r(l))==null?void 0:i.icon,edge:t.edge,disabled:t.disabled},null,8,["onPointerdown","icon","edge","disabled"]),Se(m("div",Ut,[f(Kt,{label:t.label,options:t.options,modelValue:t.modelValue,"onUpdate:modelValue":b,onClose:w},null,8,["label","options","modelValue"])],512),[[Ae,r(u).isListVisible]])])}}});var le=x(Ot,[["__scopeId","data-v-836d7fd8"]]);const K=q("app",{state:()=>({modal:"start",toast:""})});const Zt={class:"radioGroup"},Ht={class:"radioGroup"},Wt={class:"radioGroup"},Nt={class:"radioGroup"},Ft=y({setup(t){const e=O(),o=K(),l=$({set:i=>{e.penCount=[i,e.penCount[1]]},get:()=>e.penCount[0]}),n=$({set:i=>{e.penCount=[e.penCount[0],i]},get:()=>e.penCount[1]}),a=$({set:i=>{n.value=i?l.value:0},get:()=>n.value>=1}),s=[{key:"line",label:"line",icon:"line"},{key:"free",label:"free",icon:"freehand"}],u=$({set:i=>{e.isStraight=i==="line"},get:()=>e.isStraight?"line":"free"}),C=()=>{e.isEraser=!1},w=()=>{e.isEraser=!0},V=[{key:"mirror",label:"mirror",icon:"mode_mirror"},{key:"kaleido",label:"kaleido",icon:"mode_kaleido"}],h=$({set:i=>{e.isKaleido=[i==="kaleido",e.isKaleido[1]]},get:()=>e.isKaleido[0]?"kaleido":"mirror"}),b=$({set:i=>{e.isKaleido=[e.isKaleido[0],i==="kaleido"]},get:()=>e.isKaleido[1]?"kaleido":"mirror"}),g=()=>{o.$state.modal||(o.$state.modal="export")},k=i=>{const c=i.target;if(c&&c instanceof HTMLInputElement&&c.type==="color")return!0;i.preventDefault()};return(i,c)=>(d(),_("div",{class:"Toolbar",onTouchstart:k},[m("div",Zt,[f(Ct,{modelValue:r(e).$state.penColor,"onUpdate:modelValue":c[0]||(c[0]=p=>r(e).$state.penColor=p),checked:!r(e).isEraser,"onUpdate:checked":c[1]||(c[1]=p=>p&&C()),edge:"left",icon:"pen"},null,8,["modelValue","checked"]),f(oe,{modelValue:r(e).isEraser,"onUpdate:modelValue":c[2]||(c[2]=p=>p&&w()),edge:"right",icon:"eraser"},null,8,["modelValue"])]),m("div",Ht,[f(F,{modelValue:r(e).penOpacity,"onUpdate:modelValue":c[3]||(c[3]=p=>r(e).penOpacity=p),label:"Opacity",icon:"opacity",min:1,max:100,edge:"left"},null,8,["modelValue"]),f(F,{modelValue:r(e).penWidth,"onUpdate:modelValue":c[4]||(c[4]=p=>r(e).penWidth=p),label:"Width",icon:"width",min:1,max:50,edge:"none"},null,8,["modelValue"]),f(le,{label:"LineType",modelValue:r(u),"onUpdate:modelValue":c[5]||(c[5]=p=>A(u)?u.value=p:null),options:s,edge:"right"},null,8,["modelValue"])]),m("div",Wt,[f(F,{modelValue:r(l),"onUpdate:modelValue":c[6]||(c[6]=p=>A(l)?l.value=p:null),label:"PenCount",icon:"count",min:r(Z).min,max:r(Z).max,edge:"left"},null,8,["modelValue","min","max"]),f(le,{label:"MirrorType",modelValue:r(h),"onUpdate:modelValue":c[7]||(c[7]=p=>A(h)?h.value=p:null),options:V,edge:"right"},null,8,["modelValue"])]),m("div",Nt,[f(oe,{modelValue:r(a),"onUpdate:modelValue":c[8]||(c[8]=p=>A(a)?a.value=p:null),edge:"left",icon:"2nd"},null,8,["modelValue"]),f(F,{modelValue:r(n),"onUpdate:modelValue":c[9]||(c[9]=p=>A(n)?n.value=p:null),label:"PenCount",icon:"count",min:r(H).min,max:r(H).max,edge:"none",disabled:!r(a)},null,8,["modelValue","min","max","disabled"]),f(le,{label:"MirrorType",modelValue:r(b),"onUpdate:modelValue":c[10]||(c[10]=p=>A(b)?b.value=p:null),options:V,edge:"right",disabled:!r(a)},null,8,["modelValue","disabled"])]),f(N,{icon:"export",onCheck:g})],32))}});var Xt=x(Ft,[["__scopeId","data-v-23976b92"]]);const qt={class:"CloseButton"},Gt=y({props:{foreColor:{default:"#999"},bgColor:{default:"#fff"}},emits:["click"],setup(t,{emit:e}){const o=t;return T(l=>({b5bc6cee:o.foreColor,"01b79020":o.bgColor})),(l,n)=>(d(),_("div",qt,[m("button",{onClick:n[0]||(n[0]=a=>e("click"))},"CLOSE")]))}});var ve=x(Gt,[["__scopeId","data-v-25106b84"]]);const jt={class:"PlaneBox"},Jt=y({props:{backgroundColor:{default:"#fff"}},setup(t){const e=t;return T(o=>({"00d2536c":e.backgroundColor})),(o,l)=>(d(),_("div",jt,[P(o.$slots,"default",{},void 0,!0)]))}});var ge=x(Jt,[["__scopeId","data-v-e19ebaec"]]);const ye=async t=>{if(!t.naturalWidth||!t.naturalHeight)return;const e=document.createElement("canvas");e.width=t.naturalWidth,e.height=t.naturalHeight;const o=e.getContext("2d");if(!!o)return o.drawImage(t,0,0),new Promise(l=>{e.toBlob(n=>{l(n!=null?n:void 0)})})},Qt=async t=>{let e;try{e=new ClipboardItem({"image/png":t})}catch{e=new ClipboardItem({"image/png":await t})}return await navigator.clipboard.write([e]),!0},Yt=async t=>{const e=ye(t);return e?await Qt(e.then(l=>{if(!l)throw new Error("failed to copy img");return l})).catch(l=>(console.warn(l),!1)):!1},be=async t=>{const e=new Image;return e.src=URL.createObjectURL(t),new Promise(o=>{e.onload=e.onabort=e.onerror=()=>{o(e)}})},eo=t=>{const{data:e,width:o,height:l}=t,n=(i,c)=>e[(c*o+i)*4+3]===0,a=i=>{for(let c=0;c<o;c++)if(!n(c,i))return!1;return!0},s=()=>{for(let i=0;i<l;i++)if(!a(i))return i;return l},u=()=>{for(let i=l-1;i>=0;i--)if(!a(i))return i;return-1},C=(i,c,p)=>{for(let X=c;X<=p;X++)if(!n(i,X))return!1;return!0},w=(i,c)=>{for(let p=0;p<o;p++)if(!C(p,i,c))return p;return o},V=(i,c)=>{for(let p=o-1;p>=0;p--)if(!C(p,i,c))return p;return-1},h=s();if(h===l)return;const b=u(),g=w(h,b),k=V(h,b);return new DOMRect(g,h,k-g+1,b-h+1)},to=async t=>{const e=document.createElement("canvas");e.width=t.naturalWidth,e.height=t.naturalHeight;const o=e.getContext("2d");if(!o)return;o.drawImage(t,0,0);const l=o.getImageData(0,0,e.width,e.height),n=eo(l);if(!n)return;const a=o.getImageData(n.x,n.y,n.width,n.height);return e.width=n.width,e.height=n.height,o.putImageData(a,0,0),new Promise(s=>{e.toBlob(u=>{!u||s(be(u))})})},oo=async t=>{const o={files:[new File([t],"image.png",{type:t.type,lastModified:Date.now()})],title:"miracle-pencil",text:"Made with https://yuneco.github.io/miracle-pencil/  #\u30DF\u30E9\u30AF\u30EB\u30DA\u30F3\u30B7\u30EB"};return navigator.share(o)};const lo={class:"PureButton"},ao=y({setup(t){return T(e=>({f5ba771c:r(L).themeDark})),(e,o)=>(d(),_("button",lo,[P(e.$slots,"default",{},void 0,!0)]))}});var ae=x(ao,[["__scopeId","data-v-4d090f58"]]);const no=t=>(j("data-v-65aceaf5"),t=t(),J(),t),so={class:"ExportDialog"},io={class:"close"},co=no(()=>m("div",{class:"title"}," Export Image ",-1)),ro={class:"images"},uo={class:"image"},mo=["src"],po={class:"image"},_o=["src"],ho={class:"buttons"},fo=Q("Copy"),vo=Q("Share"),go=y({emits:["close"],setup(t,{emit:e}){T(i=>({"3239c9be":r(L).themeColor}));const o=240,l=K(),{toImgBlob:n}=pe(),a=U({imgSrc:"",imgSize:{w:0,h:0},croppedImgSrc:"",croppedImgSize:{w:0,h:0},selected:void 0}),s=M(),u=M(),C=!!navigator.share,w=$(()=>{const i=o/Math.max(a.imgSize.w,a.imgSize.h,o);return{width:`${a.imgSize.w*i}px`,height:`${a.imgSize.h*i}px`}}),V=$(()=>{const i=o/Math.max(a.croppedImgSize.w,a.croppedImgSize.h,o);return{width:`${a.croppedImgSize.w*i}px`,height:`${a.croppedImgSize.h*i}px`}}),h=$(()=>{if(!!a.selected)return a.selected==="img"?s.value:u.value}),b=async()=>{if(!h.value)return;const i=await Yt(h.value);l.$state.toast=i?"copied!":"failed to copy img"},g=async()=>{if(!h.value)return;const i=await ye(h.value);!i||await oo(i)};return(async()=>{const i=await n();if(!i)return;const c=await be(i);a.imgSize.w=c.naturalWidth,a.imgSize.h=c.naturalHeight,a.imgSrc=c.src,a.selected="img";const p=await to(c);!p||(a.croppedImgSize.w=p.naturalWidth,a.croppedImgSize.h=p.naturalHeight,a.croppedImgSrc=p.src)})(),(i,c)=>(d(),_("div",so,[f(ge,null,{default:S(()=>[m("div",io,[f(ve,{onClick:c[0]||(c[0]=p=>e("close"))})]),co,m("div",ro,[m("div",uo,[r(a).imgSrc?(d(),_("img",{key:0,src:r(a).imgSrc,style:B(r(w)),class:z({selected:r(a).selected==="img"}),ref_key:"imgRef",ref:s,onClick:c[1]||(c[1]=p=>r(a).selected="img")},null,14,mo)):v("",!0)]),m("div",po,[r(a).croppedImgSrc?(d(),_("img",{key:0,src:r(a).croppedImgSrc,style:B(r(V)),class:z({selected:r(a).selected==="croppedImg"}),ref_key:"croppedImgRef",ref:u,onClick:c[2]||(c[2]=p=>r(a).selected="croppedImg")},null,14,_o)):v("",!0)])]),m("div",ho,[f(ae,{onClick:b,disabled:!r(a).selected},{default:S(()=>[fo]),_:1},8,["disabled"]),C?(d(),E(ae,{key:0,onClick:g},{default:S(()=>[vo]),_:1})):v("",!0)])]),_:1})]))}});var yo=x(go,[["__scopeId","data-v-65aceaf5"]]);const $e=t=>(j("data-v-7ce7b704"),t=t(),J(),t),bo={class:"StartDialog"},$o={class:"close"},Co={class:"content"},wo=$e(()=>m("div",{class:"title"},"Miracle Pencil",-1)),xo=$e(()=>m("div",{class:"body"}," \u7C21\u5358\u306A\u4F7F\u3044\u65B9\u306E\u8AAC\u660E\u306A\u3069 ",-1)),Io={class:"buttons"},Vo=Q("START"),ko=y({emits:["close"],setup(t,{emit:e}){return K(),(o,l)=>(d(),_("div",bo,[f(ge,{backgroundColor:r(L).themeDark},{default:S(()=>[m("div",$o,[f(ve,{onClick:l[0]||(l[0]=n=>e("close")),bgColor:r(L).themeDark,foreColor:"#fff"},null,8,["bgColor"])]),m("div",Co,[wo,xo,m("div",Io,[f(ae,{onClick:l[1]||(l[1]=n=>e("close"))},{default:S(()=>[Vo]),_:1})])])]),_:1},8,["backgroundColor"])]))}});var So=x(ko,[["__scopeId","data-v-7ce7b704"]]);const Ao=t=>(j("data-v-8ec31332"),t=t(),J(),t),Mo={key:0,class:"Modal"},To=Ao(()=>m("div",{class:"bg"},null,-1)),Lo={class:"content"},Eo=y({setup(t){const e=Me(),o=$(()=>{var n,a;return((a=(n=e.default)==null?void 0:n.call(e))!=null?a:[]).some(s=>s.el||typeof s.type=="object")});return(l,n)=>(d(),E(ue,{to:"body"},[f(de,{name:"fade",appear:""},{default:S(()=>[r(o)?(d(),_("div",Mo,[To,m("div",Lo,[P(l.$slots,"default",{},void 0,!0)])])):v("",!0)]),_:3})]))}});var Po=x(Eo,[["__scopeId","data-v-8ec31332"]]);const Do=y({setup(t){const e=K(),o=$(()=>e.$state.modal),l=()=>{e.modal=void 0};return(n,a)=>(d(),E(Po,null,{default:S(()=>[r(o)==="start"?(d(),E(So,{key:0,onClose:l})):v("",!0),r(o)==="export"?(d(),E(yo,{key:1,onClose:l})):v("",!0)]),_:1}))}}),Bo=(t,e)=>{const o=Te(t.value);let l=[];return I(t,()=>{const n=t.value,a=setTimeout(()=>{o.value=n,l=l.filter(s=>s!==a)},e);l.push(a)}),Le(()=>{l.forEach(n=>clearTimeout(n))}),o};const Ro={key:0,class:"Toast"},Ko={class:"content"},zo=y({setup(t){const e=1500,o=1e3,l=K(),n=$(()=>l.$state.toast),a=Bo(n,o),s=$(()=>n.value||a.value);let u=0;return I(n,()=>{window.clearTimeout(u),!!n.value&&(u=window.setTimeout(()=>{l.$state.toast=""},e))}),(C,w)=>(d(),E(ue,{to:"body"},[f(de,{name:"fade",appear:""},{default:S(()=>[r(n)?(d(),_("div",Ro,[m("div",Ko,D(r(s)),1)])):v("",!0)]),_:1})]))}});var Uo=x(zo,[["__scopeId","data-v-ab017958"]]);const Oo={class:"toolbar"},Zo={class:"canvas"},Ho={class:"moldals"},Wo={class:"toast"},No=y({setup(t){return(e,o)=>(d(),_(re,null,[m("div",Oo,[f(Xt)]),m("div",Zo,[f(ze)]),m("div",Ho,[f(Do)]),m("div",Wo,[f(Uo)])],64))}});Ee(No).use(Pe()).mount("#app");
