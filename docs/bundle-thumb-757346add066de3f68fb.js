var Demo=function(e){function t(t){for(var r,i,u=t[0],l=t[1],c=t[2],s=0,d=[];s<u.length;s++)i=u[s],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);for(f&&f(t);d.length;)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var l=n[u];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={5:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var u=window.webpackJsonpDemo=window.webpackJsonpDemo||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var f=l;return a.push([37,0]),n()}({11:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0);function o(e,t,n,o){return new Promise((function(a){var i=document.createElement("div");document.body.appendChild(i),i.style.position="absolute",i.style.top="0px",i.style.left="-10000px";var u=new r.Ab({alpha:!0});u.setPixelRatio(window.devicePixelRatio),u.setSize(t,n),i.appendChild(u.domElement);var l=new r.hb,c=new r.U(55,t/n,.1,100),f=new r.k("#fff8d5",1.4);f.position.set(0,3,-1.5),l.add(f);for(var s,d=[],p=0;p<e.length;p++){s&&l.remove(s),s=e[p].clone();var m=new r.d;m.expandByObject(s);var y=Math.max(m.max.x-m.min.x,m.max.y-m.min.y),h=y<1.5,v=h?1.2*Math.pow(y,.9):1.5*y;c.up.set(0,1,0),c.position.set(0,m.max.y*(h?1.1:.9),-v),c.lookAt(new r.wb(0,(m.max.y+m.min.y)/(h?2:4),0)),c.updateProjectionMatrix(),s.position.set(0,0,0),l.add(s),u.render(l,c);var b=document.createElement("canvas");b.width=t,b.height=n;var w=b.getContext("2d");w.drawImage(u.domElement,0,0),w.strokeStyle="rgba(255,255,255,0.4)",w.fillStyle="#fff",w.lineWidth=2,w.beginPath(),w.rect(0,0,t,n),w.stroke();var g=o?o[p]:s.name;w.fillText(g,4,n-4),d.push(b)}a(d),l.dispose(),u.dispose(),document.body.removeChild(i)}))}},37:function(e,t,n){"use strict";n.r(t);n(6),n(0);var r=n(5),o=(n(10),n(11));function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}Math.PI;Object(r.a)("assets/tiles.glb").then((function(e){return e=e.scene.children.filter((function(e){return"Mesh"===e.type||"Group"===e.type})),Promise.all([e,Object(o.a)(e,60,80)])})).then((function(e){var t=a(e,2),n=(t[0],t[1]);document.title+=" Tumbnail test";var r=document.createElement("canvas");r.width=60,r.height=80;var o=document.createElement("div");o.className="flex",o.style.width="200px";for(var i=0;i<n.length;i++){var u=n[i];o.appendChild(u)}document.body.appendChild(o)}))},5:function(e,t,n){"use strict";var r=new(n(8).a);t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise((function(n,o){r.load(e,n,t,o)}))}},6:function(e,t,n){}});
//# sourceMappingURL=bundle-thumb-757346add066de3f68fb.js.map