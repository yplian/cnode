"use strict";var precacheConfig=[["/cnode/index.html","cf2bbe2b63f9de7dc30d3c1f84e45f12"],["/cnode/static/css/main.4d1d5ee8.css","ed7ea608c3e93cea30136f01508eb5a8"],["/cnode/static/js/0.03d01c89.chunk.js","048bedd3c7ede687570cc9a12a1d0827"],["/cnode/static/js/1.00a2a798.chunk.js","d466e9c9b55354b121666d6ef60329bf"],["/cnode/static/js/2.6dfd6018.chunk.js","e75f943325bdd41c9b7cc59c53f5e7f5"],["/cnode/static/js/3.dbf16e60.chunk.js","b3a9781e64f015f3ff11cf478491affc"],["/cnode/static/js/4.bb363278.chunk.js","c83db805057e54a1871f1671a8b12784"],["/cnode/static/js/5.997f272f.chunk.js","8280cde308177bca9758ecca708fc6ea"],["/cnode/static/js/6.cacc28c1.chunk.js","7610d808cd60a0005625a882e9536160"],["/cnode/static/js/7.749d15a1.chunk.js","a5dc7dba6d377e0078817224464a844e"],["/cnode/static/js/8.acfd39ac.chunk.js","cdb3282df62789fb7622df7a33ea58fe"],["/cnode/static/js/main.c81d1527.js","e1546b7f80c8fdeed2525fb00ba7a87b"],["/cnode/static/media/iconfont.49a1c9af.ttf","49a1c9af5227ea20ba961786c2c5d26c"],["/cnode/static/media/iconfont.740adbec.eot","740adbeca16539275c1a9b04eda45840"],["/cnode/static/media/iconfont.8dd41f64.svg","8dd41f64e65430dda35b770a9d6f07ee"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,c){var a=new URL(e);return c&&a.pathname.match(c)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],c=new URL(t,self.location),a=createCacheKey(c,hashParamName,n,/\.\w{8}\./);return[c.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,c),e=urlsToCacheKeys.has(n));var a="/cnode/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});