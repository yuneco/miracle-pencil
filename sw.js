if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),c={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e4da89b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.6d5d0616.js",revision:null},{url:"assets/index.e4b66cc2.css",revision:null},{url:"assets/vendor.97e9436f.js",revision:null},{url:"index.html",revision:"3d5113396652586aeeb56db7d7e25d1a"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"118f9177109cfd7ce9e95c5bcabbc530"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
