var Demo=function(e){function t(t){for(var r,a,s=t[0],u=t[1],f=t[2],l=0,d=[];l<s.length;l++)a=s[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(c&&c(t);d.length;)d.shift()();return o.push.apply(o,f||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={4:0},o=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window.webpackJsonpDemo=window.webpackJsonpDemo||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var c=u;return o.push([35,0]),n()}({1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Vector",{enumerable:!0,get:function(){return i.default}}),t.default=t.t_size=t.t_tile3=t.t_tile2=t.t_tile1=t.t_tile0=t.t_isEdge=t.t_n3=t.t_n2=t.t_n1=t.t_n0=t.g_size=t.g_edge5=t.g_edge4=t.g_edge3=t.g_edge2=t.g_edge1=t.g_edge0=t.g_count=t.g_isEdge=t.g_y=t.g_x=t.f_size=t.f_outmostEdge=t.f_count=t.f_y3=t.f_x3=t.f_y2=t.f_x2=t.f_y1=t.f_x1=t.f_y0=t.f_x0=void 0;var r=o(n(19)),i=o(n(17));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}(e,t)||l(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||l(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}t.f_x0=0;t.f_y0=1;t.f_x1=2;t.f_y1=3;t.f_x2=4;t.f_y2=5;t.f_x3=6;t.f_y3=7;t.f_count=8;t.f_outmostEdge=9;t.f_size=10;t.g_x=0;t.g_y=1;t.g_isEdge=2;t.g_count=3;t.g_edge0=4;t.g_edge1=5;t.g_edge2=6;t.g_edge3=7;t.g_edge4=8;t.g_edge5=9;t.g_size=10;t.t_n0=0;t.t_n1=1;t.t_n2=2;t.t_n3=3;t.t_isEdge=4;t.t_tile0=5;t.t_tile1=6;t.t_tile2=7;t.t_tile3=8;t.t_size=9;var g=2*Math.PI/6;var h={width:0,height:0,numberOfRings:5,removeEdges:50,animatedEasing:!0,renderFirstPassEdges:!1,debug:!1,weightFunction:function(e,t,n,r){var i=n-e,o=r-t;return Math.sqrt(i*i+o*o)},edgeLength:80,maxIterations:100,animating:!0,minTension:2};function v(e,t,n,r,i,o,a){for(var s=0;s<e.length;s+=10)if(s!==o){var u=e[s+8];if(e[s+0]===r&&e[s+1]===i&&e[s+2]===t&&e[s+3]===n)return a.index=s,void(a.edge=0);if(e[s+2]===r&&e[s+3]===i&&e[s+4]===t&&e[s+5]===n)return a.index=s,void(a.edge=1);if(3===u){if(e[s+4]===r&&e[s+5]===i&&e[s+0]===t&&e[s+1]===n)return a.index=s,void(a.edge=2)}else{if(e[s+4]===r&&e[s+5]===i&&e[s+6]===t&&e[s+7]===n)return a.index=s,void(a.edge=2);if(e[s+6]===r&&e[s+7]===i&&e[s+0]===t&&e[s+1]===n)return a.index=s,void(a.edge=3)}}a.index=-1}var y={index:-1,edge:0};function b(e,t){var n=e.firstPassNumEdges*e.removeEdges/100|0,r=function(e,t){for(var n=3*e.numFaces,r=new Int32Array(n),i=0,o=0;o<e.firstPassLen;o+=10){if(!(t[o+9]>=0)){var a=o<<2;r[i++]=a,r[i++]=a+1,r[i++]=a+2}}for(var s=0;s<i-2;s++){var u=s+(Math.random()*i-s-1|0),f=r[s];r[s]=r[u],r[u]=f}return r.slice(0,i)}(e,t);e.debug&&console.log("Shuffled stack",c(r.slice()));for(var i=0,o=function(e){for(var t=i;t<r.length;t++)r[t]>>>2===e&&(r[t]=-1)},a=0,s=0;s<n;s++){var u=void 0;do{if(i===r.length)return void(e.debug&&e.debug&&console.log("Ran out of removal candidates after successfully removing",a,"out of",n));u=r[i++]}while(-1===u);var f=u>>2,l=3&u;if(v(t,t[f+2*l],t[f+2*l+1],2===l?t[f+0]:t[f+2*(l+1)],2===l?t[f+1]:t[f+2*(l+1)+1],f,y),y.index>=0&&3===t[y.index+8]){var d=y.index,g=y.edge,h=0===l?t[f+4]:t[f+2*(l-1)],b=0===l?t[f+5]:t[f+2*(l-1)+1],m=t[d+9]>=0;switch(t[d+8]=4,g){case 2:t[d+6]=h,t[d+7]=b;break;case 1:t[d+6]=t[d+4],t[d+7]=t[d+5],t[d+4]=h,t[d+5]=b;break;case 0:t[d+6]=t[d+4],t[d+7]=t[d+5],t[d+4]=t[d+2],t[d+5]=t[d+3],t[d+2]=h,t[d+3]=b,m&&(t[d+9]=2)}o(d),t[f+8]=0,a++}o(f)}return e.debug&&console.log("Successfully removed",a,"out of",n),a}function m(e,t){for(var n=e.firstPassLen,r=function(e,t){for(var n=0,r=0,i=0;i<e.firstPassLen;i+=10){var o=t[i+8];3===o?n++:4===o&&r++}return 9*r+7*n}(e,t),i=new Float64Array(10*r),o=new Int32Array(9*(r/2|0)),a=0,s=0,u=function(e,t,n){e|=0,t|=0;for(var r=0;r<a;r+=10)if(Math.abs(i[r]-e)<4&&Math.abs(i[r+1]-t)<4)return n&&!i[r+2]&&(i[r+2]=1),r;var o=a;return i[a+0]=e,i[a+1]=t,i[a+2]=n?1:0,i[a+3]=0,a+=10,o},f=function(e,t,n,r){o[s+0]=e,o[s+1]=t,o[s+2]=n,o[s+3]=r,s+=9},c=function(e,t){for(var n=i[e+3],r=!1,o=0;o<n;o++){if(i[e+4+o]===t){r=!0;break}}if(!r){if(n>=6)throw new Error("At most 6 edges per node");i[e+4+n++]=t,i[e+3]=n}},l=function(e,t){c(e,t),c(t,e)},d=0;d<n;d+=10){var g=t[d+8],h=t[d+0],v=t[d+1],y=t[d+2],b=t[d+3],m=t[d+4],p=t[d+5],_=t[d+9],x=1===_,w=2===_;if(3===g){var P=(h+y)/2,O=(v+b)/2,j=(y+m)/2,k=(b+p)/2,M=(m+h)/2,E=(p+v)/2,S=(h+y+m)/3,T=(v+b+p)/3,L=u(h,v),I=u(P,O),A=u(y,b,x),F=u(j,k,x),C=u(m,p,x),R=u(M,E),D=u(S,T);l(L,I),l(I,D),l(D,R),l(R,L),l(I,A),l(A,F),l(F,D),l(D,I),l(R,D),l(D,F),l(F,C),l(C,R),f(L,I,D,R),f(I,A,F,D),f(R,D,F,C)}else if(4===g){var z=t[d+6],V=t[d+7],q=(h+y)/2,W=(v+b)/2,B=(y+m)/2,G=(b+p)/2,H=(m+z)/2,J=(p+V)/2,N=(z+h)/2,X=(V+v)/2,Y=(h+y+m+z)/4,U=(v+b+p+V)/4,$=u(h,v),K=u(q,W),Q=u(y,b,x),Z=u(B,G,x),ee=u(m,p,x||w),te=u(H,J,w),ne=u(z,V,w),re=u(N,X),ie=u(Y,U);l($,K),l(K,Q),l(Q,Z),l(Z,ee),l(ee,te),l(te,ne),l(ne,re),l(re,$),l(ie,Z),l(ie,te),l(ie,re),l(ie,K),f($,K,ie,re),f(K,Q,Z,ie),f(ie,Z,ee,te),f(re,ie,te,ne)}}console.log("TILES: buffer = ",o.length,", used = "+s);var oe=o.slice(0,s);return function(e,t){for(var n=t.length,r=0;r<n;r+=9){for(var i=0,o=0;o<4;o++){for(var a=t[r+0+o],s=3===o?t[r+0]:t[r+0+o+1],u=-1,f=0;f<t.length;f+=9)if(f!==r){var c=t[f+0],l=t[f+1],d=t[f+2],g=t[f+3];if(l===a&&c===s||d===a&&l===s||g===a&&d===s||c===a&&g===s){u=f,i++;break}}t[r+5+o]=u}t[r+4]=4===i?0:1}e.debug&&console.log("TILE GRAPH",t)}(e,oe),[i.slice(0,a),oe]}function p(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=t.length,i=0;i<n;i++){for(var o=0,a=0;a<r;a+=10)if(!t[a+2]){for(var s=t[a+0],u=t[a+1],f=t[a+3],c=0,l=0,d=0,g=0;g<f;g++){var h=t[a+4+g],v=t[h],y=t[h+1],b=e.weightFunction(s,u,v,y);c+=v*b,l+=y*b,d+=b}var m=c/d,p=l/d,_=m-s,x=p-u;t[a+0]=m,t[a+1]=p,o+=_*_+x*x}if(o<e.minTension)return e.debug&&console.log("Reached minimal tension",e.minTension,"after",e.relaxCount,"iterations"),!0;e.relaxCount++}return e.animatedEasing||e.debug&&console.log("Stopping after max iterations = "+e.maxIterations),!1}var _=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.render=function(e){var t=n.config,r=n.graph,i=n.faces;e.save();var o=t.width/2,a=t.height/2;e.translate(o,a);r.length;if(e.fillStyle="#000",e.fillRect(-o,-a,t.width,t.height),t.renderFirstPassEdges){e.strokeStyle="#f00",e.lineWidth=1;for(var s=0;s<t.firstPassLen;s+=10){var u=i[s+8];if(u>=3){e.beginPath(),e.moveTo(i[s+0],i[s+1]);for(var f=1;f<u;f++)e.lineTo(i[s+2*f],i[s+2*f+1]);e.closePath(),e.stroke();var c=i[s+9];c>=0&&(e.strokeStyle="#fe0",e.beginPath(),e.moveTo(i[s+2*c],i[s+2*c+1]),c===u-1?e.lineTo(i[s+0],i[s+1]):e.lineTo(i[s+2*(c+1)],i[s+2*(c+1)+1]),e.stroke(),e.strokeStyle="#f00")}}}e.restore(),t.animating&&p(t,r)&&(t.animating=!1)};var o,s,f=u(u({},h),t);(o=f).numFaces=6*((s=o.numberOfRings)+1)*(s+1),o.firstPassLen=10*o.numFaces,o.firstPassNumEdges=3*o.numFaces,o.edgeLength=Math.min(o.width,o.height)/(2*o.numberOfRings+2)|0,o.animating=o.animatedEasing,o.relaxCount=0,this.config=f;var c=function(e){var t=e.numberOfRings,n=[new i.default(Math.cos(0)*e.edgeLength,Math.sin(0)*e.edgeLength),new i.default(Math.cos(g)*e.edgeLength,Math.sin(g)*e.edgeLength),new i.default(Math.cos(2*g)*e.edgeLength,Math.sin(2*g)*e.edgeLength),new i.default(Math.cos(3*g)*e.edgeLength,Math.sin(3*g)*e.edgeLength),new i.default(Math.cos(4*g)*e.edgeLength,Math.sin(4*g)*e.edgeLength),new i.default(Math.cos(5*g)*e.edgeLength,Math.sin(5*g)*e.edgeLength)],r=new Float64Array(e.firstPassLen),o=0,a=0,s=1;do{for(var u=0;u<6;u++)for(var f=n[u],c=n[(u+1)%6],l=n[(u+2)%6],d=f.copy().scale(a),h=0;h<s;h++)if(1&h)r[o+0]=0|d.x,r[o+1]=0|d.y,r[o+2]=d.x+c.x|0,r[o+3]=d.y+c.y|0,r[o+4]=d.x+l.x|0,r[o+5]=d.y+l.y|0,r[o+8]=3,r[o+9]=-1,o+=10,d.add(l);else{var v=a===t;r[o+0]=0|d.x,r[o+1]=0|d.y,r[o+2]=d.x+f.x|0,r[o+3]=d.y+f.y|0,r[o+4]=d.x+c.x|0,r[o+5]=d.y+c.y|0,r[o+8]=3,r[o+9]=v?1:-1,o+=10}s+=2}while(a++<t);return r}(f);f.renderFirstPassEdges&&(this.faces="merged"!==f.renderFirstPassEdges?c.slice():c);var l=f.debug&&(0,r.default)();b(f,c),f.debug&&console.log("Edge removal in ",(0,r.default)()-l,"ms");var d=a(m(f,c),2),v=d[0],y=d[1];this.tiles=y,f.animating||p(f,v,f.maxIterations),this.graph=v};t.default=_},17:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=Math.sqrt,o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.x=t,this.y=n}var t,n,o;return t=e,(n=[{key:"copy",value:function(){return new e(this.x,this.y)}},{key:"add",value:function(e,t){return"number"==typeof e?(this.x+=e,this.y+=t):(this.x+=e.x,this.y+=e.y),this}},{key:"subtract",value:function(e,t){return"number"==typeof e?(this.x-=e,this.y-=t):(this.x-=e.x,this.y-=e.y),this}},{key:"scale",value:function(e){return this.x*=e,this.y*=e,this}},{key:"length",value:function(){var e=this.x,t=this.y;return i(e*e+t*t)}},{key:"norm",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.scale(e/this.length())}},{key:"rotateClockwise",value:function(){var e=this.x,t=this.y;return this.x=t,this.y=-e,this}},{key:"rotateCounterClockwise",value:function(){var e=this.x,t=this.y;return this.x=-t,this.y=e,this}},{key:"set",value:function(e,t){"number"==typeof e?(this.x=e,this.y=t):(this.x=e.x,this.y=e.y)}}])&&r(t.prototype,n),o&&r(t,o),e}();t.default=o},2:function(e,t,n){"use strict";var r,i;function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"l",(function(){return a})),n.d(t,"h",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return f})),n.d(t,"i",(function(){return c})),n.d(t,"b",(function(){return l})),n.d(t,"k",(function(){return d})),n.d(t,"f",(function(){return g})),n.d(t,"a",(function(){return h})),n.d(t,"e",(function(){return v})),n.d(t,"j",(function(){return y})),n.d(t,"g",(function(){return b}));var a=0,s=1,u=2,f=3,c=4,l=6,d=8,g=["Water","Sand","Grass","Forest","Stone","Ice","Dirt","Packed_Ice"],h=[null,"case-1","case-2","case-3","case-4","case-5-1","case-6","case-7","case-8","case-9","case-10-1","case-11","case-12","case-13","case-14","case-15","case-m1","case-m2","case-m3","case-m4","case-5-2","case-10-2"],v=(o(r={},a,[0,.4,.8]),o(r,s,[.8,.8,0]),o(r,u,[0,.7,0]),o(r,l,[.5,.3,.1]),o(r,f,[.2,.5,.3]),o(r,c,[.5,.5,.5]),o(r,5,[1,1,1]),o(r,7,[1,1,1]),o(r,d,[1,0,1]),r),y=(o(i={},a,0),o(i,s,1),o(i,u,1),o(i,l,1),o(i,f,1),o(i,c,.4),o(i,5,.9),o(i,7,.8),o(i,d,0),2*Math.PI),b=(1+Math.sqrt(5))/2},35:function(e,t,n){"use strict";n.r(t);var r,i,o,a,s,u,f=n(14),c=n.n(f),l=n(7),d=n.n(l),g=(n(6),n(1)),h=n(2),v={width:0,height:0},y=0,b=0;c()((function(){var e=document.getElementById("container");i=document.createElement("canvas"),e.appendChild(i),r=i.getContext("2d");var t=0|window.innerWidth,n=0|window.innerHeight;v.width=t,v.height=n,i.width=t,i.height=n;var f,c=t/2,l=n/2,m=Math.min(t,n)/2,p=t/4,_=-m/2;r.translate(t/3,l);var x=function(){f=[];for(var e=0;e<h.j;e+=h.j/4){var t=e-h.j/16+Math.random()*h.j/8,n=l/h.g-l/16+Math.random()*l/8,r=-Math.sin(t)*n,i=Math.cos(t)*n;f.push(r,i)}o=new g.Vector(f[0],f[1]),a=new g.Vector(f[6]-f[0],f[7]-f[1]),s=new g.Vector(f[4]-f[2],f[5]-f[3]),u=new g.Vector(f[2]-f[0],f[3]-f[1])};function w(e,t){var n=a.copy().scale(e).add(o);return s.copy().scale(e).add(o).add(u).subtract(n).scale(t).add(n)}x();var P=function(e){var n,r,o=i.getBoundingClientRect();e.touches?(n=e.touches[0].clientX-o.left,r=e.touches[0].clientY-o.top):(n=e.clientX-o.left,r=e.clientY-o.top),y=(n-t/3-p)/m,b=(m/2-(r-l))/m};i.addEventListener("click",x,!0),i.addEventListener("mousemove",P,!0),i.addEventListener("touchmove",P,!0),d()((function e(){r.fillStyle="#000",r.fillRect(-c,-l,t,n),function(){r.strokeStyle="#f00",r.beginPath();var e=f.length;r.moveTo(f[e-2],f[e-1]);for(var t=0;t<e;t+=2)r.lineTo(f[t],f[t+1]);r.stroke(),r.strokeStyle="#46f",r.beginPath(),r.moveTo(p,_),r.lineTo(p+m,_),r.lineTo(p+m,_+m),r.lineTo(p,_+m),r.lineTo(p,_),r.moveTo(p,_),r.lineTo(p+m,_+m),r.moveTo(p,_+m),r.lineTo(p+m,_),r.stroke(),r.strokeStyle="#F00",r.beginPath();var n=w(0,0);r.moveTo(n.x,n.y);for(var i=.1;i<1;i+=.1){var o=w(i,i);r.lineTo(o.x,o.y)}r.stroke(),r.beginPath();var a=w(0,1);r.moveTo(a.x,a.y);for(var s=.1;s<1;s+=.1){var u=w(s,1-s);r.lineTo(u.x,u.y)}r.stroke()}();var i=w(y,b);r.fillStyle="#0f0",r.fillRect(i.x-2,i.y-2,4,4),d()(e)}))}))},6:function(e,t,n){}});
//# sourceMappingURL=bundle-test-411ab6e8468d554a0c35.js.map