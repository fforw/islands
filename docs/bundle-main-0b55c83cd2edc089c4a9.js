var Demo=function(e){function t(t){for(var r,o,s=t[0],u=t[1],l=t[2],c=0,g=[];c<s.length;c++)o=s[c],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&g.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(f&&f(t);g.length;)g.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={2:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var s=window.webpackJsonpDemo=window.webpackJsonpDemo||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=u;return a.push([18,0]),n()}({1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Vector",{enumerable:!0,get:function(){return i.default}}),t.default=t.t_size=t.t_tile3=t.t_tile2=t.t_tile1=t.t_tile0=t.t_isEdge=t.t_n3=t.t_n2=t.t_n1=t.t_n0=t.g_size=t.g_edge5=t.g_edge4=t.g_edge3=t.g_edge2=t.g_edge1=t.g_edge0=t.g_count=t.g_isEdge=t.g_y=t.g_x=t.f_size=t.f_outmostEdge=t.f_count=t.f_y3=t.f_x3=t.f_y2=t.f_x2=t.f_y1=t.f_x1=t.f_y0=t.f_x0=void 0;var r=a(n(9)),i=a(n(6));function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}return n}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){return function(e){if(Array.isArray(e))return g(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||c(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"==typeof e)return g(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(e,t):void 0}}function g(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}t.f_x0=0;t.f_y0=1;t.f_x1=2;t.f_y1=3;t.f_x2=4;t.f_y2=5;t.f_x3=6;t.f_y3=7;t.f_count=8;t.f_outmostEdge=9;t.f_size=10;t.g_x=0;t.g_y=1;t.g_isEdge=2;t.g_count=3;t.g_edge0=4;t.g_edge1=5;t.g_edge2=6;t.g_edge3=7;t.g_edge4=8;t.g_edge5=9;t.g_size=10;t.t_n0=0;t.t_n1=1;t.t_n2=2;t.t_n3=3;t.t_isEdge=4;t.t_tile0=5;t.t_tile1=6;t.t_tile2=7;t.t_tile3=8;t.t_size=9;var d=2*Math.PI/6;var h={width:0,height:0,numberOfRings:5,removeEdges:50,animatedEasing:!0,renderFirstPassEdges:!1,debug:!1,weightFunction:function(e,t,n,r){var i=n-e,a=r-t;return Math.sqrt(i*i+a*a)},edgeLength:80,maxIterations:100,animating:!0,minTension:2};function v(e,t,n,r,i,a,o){for(var s=0;s<e.length;s+=10)if(s!==a){var u=e[s+8];if(e[s+0]===r&&e[s+1]===i&&e[s+2]===t&&e[s+3]===n)return o.index=s,void(o.edge=0);if(e[s+2]===r&&e[s+3]===i&&e[s+4]===t&&e[s+5]===n)return o.index=s,void(o.edge=1);if(3===u){if(e[s+4]===r&&e[s+5]===i&&e[s+0]===t&&e[s+1]===n)return o.index=s,void(o.edge=2)}else{if(e[s+4]===r&&e[s+5]===i&&e[s+6]===t&&e[s+7]===n)return o.index=s,void(o.edge=2);if(e[s+6]===r&&e[s+7]===i&&e[s+0]===t&&e[s+1]===n)return o.index=s,void(o.edge=3)}}o.index=-1}var y={index:-1,edge:0};function p(e,t){var n=e.firstPassNumEdges*e.removeEdges/100|0,r=function(e,t){for(var n=3*e.numFaces,r=new Int32Array(n),i=0,a=0;a<e.firstPassLen;a+=10){if(!(t[a+9]>=0)){var o=a<<2;r[i++]=o,r[i++]=o+1,r[i++]=o+2}}for(var s=0;s<i-2;s++){var u=s+(Math.random()*i-s-1|0),l=r[s];r[s]=r[u],r[u]=l}return r.slice(0,i)}(e,t);e.debug&&console.log("Shuffled stack",f(r.slice()));for(var i=0,a=function(e){for(var t=i;t<r.length;t++)r[t]>>>2===e&&(r[t]=-1)},o=0,s=0;s<n;s++){var u=void 0;do{if(i===r.length)return void(e.debug&&e.debug&&console.log("Ran out of removal candidates after successfully removing",o,"out of",n));u=r[i++]}while(-1===u);var l=u>>2,c=3&u;if(v(t,t[l+2*c],t[l+2*c+1],2===c?t[l+0]:t[l+2*(c+1)],2===c?t[l+1]:t[l+2*(c+1)+1],l,y),y.index>=0&&3===t[y.index+8]){var g=y.index,d=y.edge,h=0===c?t[l+4]:t[l+2*(c-1)],p=0===c?t[l+5]:t[l+2*(c-1)+1],m=t[g+9]>=0;switch(t[g+8]=4,d){case 2:t[g+6]=h,t[g+7]=p;break;case 1:t[g+6]=t[g+4],t[g+7]=t[g+5],t[g+4]=h,t[g+5]=p;break;case 0:t[g+6]=t[g+4],t[g+7]=t[g+5],t[g+4]=t[g+2],t[g+5]=t[g+3],t[g+2]=h,t[g+3]=p,m&&(t[g+9]=2)}a(g),t[l+8]=0,o++}a(l)}return e.debug&&console.log("Successfully removed",o,"out of",n),o}function m(e,t){for(var n=e.firstPassLen,r=function(e,t){for(var n=0,r=0,i=0;i<e.firstPassLen;i+=10){var a=t[i+8];3===a?n++:4===a&&r++}return 9*r+7*n}(e,t),i=new Float64Array(10*r),a=new Int32Array(9*(r/2|0)),o=0,s=0,u=function(e,t,n){e|=0,t|=0;for(var r=0;r<o;r+=10)if(Math.abs(i[r]-e)<4&&Math.abs(i[r+1]-t)<4)return n&&!i[r+2]&&(i[r+2]=1),r;var a=o;return i[o+0]=e,i[o+1]=t,i[o+2]=n?1:0,i[o+3]=0,o+=10,a},l=function(e,t,n,r){a[s+0]=e,a[s+1]=t,a[s+2]=n,a[s+3]=r,s+=9},f=function(e,t){for(var n=i[e+3],r=!1,a=0;a<n;a++){if(i[e+4+a]===t){r=!0;break}}if(!r){if(n>=6)throw new Error("At most 6 edges per node");i[e+4+n++]=t,i[e+3]=n}},c=function(e,t){f(e,t),f(t,e)},g=0;g<n;g+=10){var d=t[g+8],h=t[g+0],v=t[g+1],y=t[g+2],p=t[g+3],m=t[g+4],_=t[g+5],b=t[g+9],w=1===b,x=2===b;if(3===d){var P=(h+y)/2,M=(v+p)/2,O=(y+m)/2,j=(p+_)/2,S=(m+h)/2,E=(_+v)/2,A=(h+y+m)/3,k=(v+p+_)/3,z=u(h,v),L=u(P,M),T=u(y,p,w),I=u(O,j,w),D=u(m,_,w),F=u(S,E),C=u(A,k);c(z,L),c(L,C),c(C,F),c(F,z),c(L,T),c(T,I),c(I,C),c(C,L),c(F,C),c(C,I),c(I,D),c(D,F),l(z,L,C,F),l(L,T,I,C),l(F,C,I,D)}else if(4===d){var R=t[g+6],H=t[g+7],W=(h+y)/2,q=(v+p)/2,N=(y+m)/2,G=(p+_)/2,U=(m+R)/2,B=(_+H)/2,J=(R+h)/2,V=(H+v)/2,$=(h+y+m+R)/4,K=(v+p+_+H)/4,X=u(h,v),Q=u(W,q),Y=u(y,p,w),Z=u(N,G,w),ee=u(m,_,w||x),te=u(U,B,x),ne=u(R,H,x),re=u(J,V),ie=u($,K);c(X,Q),c(Q,Y),c(Y,Z),c(Z,ee),c(ee,te),c(te,ne),c(ne,re),c(re,X),c(ie,Z),c(ie,te),c(ie,re),c(ie,Q),l(X,Q,ie,re),l(Q,Y,Z,ie),l(ie,Z,ee,te),l(re,ie,te,ne)}}console.log("TILES: buffer = ",a.length,", used = "+s);var ae=a.slice(0,s);return function(e,t){for(var n=t.length,r=0;r<n;r+=9){for(var i=0,a=0;a<4;a++){for(var o=t[r+0+a],s=3===a?t[r+0]:t[r+0+a+1],u=-1,l=0;l<t.length;l+=9)if(l!==r){var f=t[l+0],c=t[l+1],g=t[l+2],d=t[l+3];if(c===o&&f===s||g===o&&c===s||d===o&&g===s||f===o&&d===s){u=l,i++;break}}t[r+5+a]=u}t[r+4]=4===i?0:1}e.debug&&console.log("TILE GRAPH",t)}(e,ae),[i.slice(0,o),ae]}function _(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=t.length,i=0;i<n;i++){for(var a=0,o=0;o<r;o+=10)if(!t[o+2]){for(var s=t[o+0],u=t[o+1],l=t[o+3],f=0,c=0,g=0,d=0;d<l;d++){var h=t[o+4+d],v=t[h],y=t[h+1],p=e.weightFunction(s,u,v,y);f+=v*p,c+=y*p,g+=p}var m=f/g,_=c/g,b=m-s,w=_-u;t[o+0]=m,t[o+1]=_,a+=b*b+w*w}if(a<e.minTension)return e.debug&&console.log("Reached minimal tension",e.minTension,"after",e.relaxCount,"iterations"),!0;e.relaxCount++}return e.animatedEasing||e.debug&&console.log("Stopping after max iterations = "+e.maxIterations),!1}var b=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.render=function(e){var t=n.config,r=n.graph,i=n.faces;e.save();var a=t.width/2,o=t.height/2;e.translate(a,o);r.length;if(e.fillStyle="#000",e.fillRect(-a,-o,t.width,t.height),t.renderFirstPassEdges){e.strokeStyle="#f00",e.lineWidth=1;for(var s=0;s<t.firstPassLen;s+=10){var u=i[s+8];if(u>=3){e.beginPath(),e.moveTo(i[s+0],i[s+1]);for(var l=1;l<u;l++)e.lineTo(i[s+2*l],i[s+2*l+1]);e.closePath(),e.stroke();var f=i[s+9];f>=0&&(e.strokeStyle="#fe0",e.beginPath(),e.moveTo(i[s+2*f],i[s+2*f+1]),f===u-1?e.lineTo(i[s+0],i[s+1]):e.lineTo(i[s+2*(f+1)],i[s+2*(f+1)+1]),e.stroke(),e.strokeStyle="#f00")}}}e.restore(),t.animating&&_(t,r)&&(t.animating=!1)};var a,s,l=u(u({},h),t);(a=l).numFaces=6*((s=a.numberOfRings)+1)*(s+1),a.firstPassLen=10*a.numFaces,a.firstPassNumEdges=3*a.numFaces,a.edgeLength=Math.min(a.width,a.height)/(2*a.numberOfRings+2)|0,a.animating=a.animatedEasing,a.relaxCount=0,this.config=l;var f=function(e){var t=e.numberOfRings,n=[new i.default(Math.cos(0)*e.edgeLength,Math.sin(0)*e.edgeLength),new i.default(Math.cos(d)*e.edgeLength,Math.sin(d)*e.edgeLength),new i.default(Math.cos(2*d)*e.edgeLength,Math.sin(2*d)*e.edgeLength),new i.default(Math.cos(3*d)*e.edgeLength,Math.sin(3*d)*e.edgeLength),new i.default(Math.cos(4*d)*e.edgeLength,Math.sin(4*d)*e.edgeLength),new i.default(Math.cos(5*d)*e.edgeLength,Math.sin(5*d)*e.edgeLength)],r=new Float64Array(e.firstPassLen),a=0,o=0,s=1;do{for(var u=0;u<6;u++)for(var l=n[u],f=n[(u+1)%6],c=n[(u+2)%6],g=l.copy().scale(o),h=0;h<s;h++)if(1&h)r[a+0]=0|g.x,r[a+1]=0|g.y,r[a+2]=g.x+f.x|0,r[a+3]=g.y+f.y|0,r[a+4]=g.x+c.x|0,r[a+5]=g.y+c.y|0,r[a+8]=3,r[a+9]=-1,a+=10,g.add(c);else{var v=o===t;r[a+0]=0|g.x,r[a+1]=0|g.y,r[a+2]=g.x+l.x|0,r[a+3]=g.y+l.y|0,r[a+4]=g.x+f.x|0,r[a+5]=g.y+f.y|0,r[a+8]=3,r[a+9]=v?1:-1,a+=10}s+=2}while(o++<t);return r}(l);l.renderFirstPassEdges&&(this.faces="merged"!==l.renderFirstPassEdges?f.slice():f);var c=l.debug&&(0,r.default)();p(l,f),l.debug&&console.log("Edge removal in ",(0,r.default)()-c,"ms");var g=o(m(l,f),2),v=g[0],y=g[1];this.tiles=y,l.animating||_(l,v,l.maxIterations),this.graph=v};t.default=b},18:function(e,t,n){"use strict";n.r(t);var r,i=n(4),a=n.n(i),o=n(10),s=n.n(o),u=(n(2),n(0)),l=n(1),f=n.n(l),c=new(n(11).a),g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise((function(n,r){c.load(e,n,t,r)}))},d=n(12),h=n(13),v=n(14),y=new u.qb,p=n(3);function m(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==s.return||s.return()}finally{if(i)throw a}}return n}(e,t)||_(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function w(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var x,P,M,O,j,S,E,A,k,z,L,T=["Water","Sand","Grass","Dirt","Forest","Stone"],I=[null,"case-1","case-2","case-3","case-4","case-5","case-6","case-7","case-8","case-9","case-10","case-11","case-12","case-13","case-14","case-15","case-m1","case-m2","case-m3","case-m4"],D=(w(r={},0,[0,.4,.8]),w(r,1,[.8,.8,0]),w(r,2,[0,.7,0]),w(r,3,[.5,.3,.1]),w(r,4,[.2,.5,.3]),w(r,5,[.5,.5,.5]),w(r,6,[1,0,1]),r);function F(e,t){var n=Math.sqrt(e*e+t*t),r=Object(p.a)(1-n/750);return Math.max(0,(125+125*(.99*q.noise2D(.003*e,.003*t)+q.noise2D(.07*t,.07*e)*(1-.99)))*r)}var C=new Float64Array(5);var R=1;function H(){var e=L=new f.a({numberOfRings:2,width:1500,height:1500,graphUserData:1}),t=e.graph,n=(e.tiles,e.config,t.length),r=3/l.g_size;k=new Float64Array(n*r);for(var i=0,a=0;a<n;a+=l.g_size)k[i+0]=F(t[a+l.g_x],t[a+l.g_y]),k[i+R]=6,i+=3;A=new Float64Array(L.tiles.length/l.t_size*7),function(){for(var e=L,t=e.graph,n=e.tiles,r=n.length,i=0,a=0;a<r;a+=l.t_size){var o=n[a+l.t_n0],s=n[a+l.t_n1],u=n[a+l.t_n2],f=n[a+l.t_n3];A[i+0]=(t[o+l.g_x]+t[s+l.g_x]+t[u+l.g_x]+t[f+l.g_x])/4,A[i+1]=(t[o+l.g_y]+t[s+l.g_y]+t[u+l.g_y]+t[f+l.g_y])/4,A[i+2]=0,A[i+3]=-1,A[i+4]=-1,A[i+5]=-1,A[i+6]=-1,i+=7}}(),function(){for(var e=L,t=(e.graph,e.tiles),n=t.length,r=7/l.t_size,i=0;i<n;i+=l.t_size){var a=i*r,o=t[i+l.t_tile0]*r,s=t[i+l.t_tile1]*r,u=t[i+l.t_tile2]*r,f=t[i+l.t_tile3]*r;C[0]=F(A[a],A[a+1]),C[1]=o>=0?F(A[o+0],A[o+1]):-1,C[2]=s>=0?F(A[s+0],A[s+1]):-1,C[3]=u>=0?F(A[u+0],A[u+1]):-1,C[4]=f>=0?F(A[f+0],A[f+1]):-1;var c=0;if(o>=0&&Math.abs(C[0]-C[1])>10&&(c|=1),s>=0&&Math.abs(C[0]-C[2])>10&&(c|=2),u>=0&&Math.abs(C[0]-C[3])>10&&(c|=4),f>=0&&Math.abs(C[0]-C[4])>10&&(c|=8),0!==c)for(var g=0;g<4;g++)if(c&1<<g){var d=t[i+l.t_n0+g]*V,h=(3===g?t[i+l.t_n0]:t[i+l.t_n0+g+1])*V,v=3+g,y=3===g?3:3+g+1,p=3===g?0:g+1,m=C[1+(0===g?3:g-1)],_=C[1+p],b=m>=0?(m+C[0])/2:C[0],w=_>=0?(C[0]+_)/2:C[0];A[a+v]=b,A[a+y]=w,k[d+R]=5,k[h+R]=5,t[i+l.t_tile0+g]=-1}}}(),function(){var e=function(){for(var e=L.tiles,t=e.length,n=0;n<t;n+=l.t_size)if(e[n+l.t_isEdge])return n;throw new Error("No edge!?")}();console.log("Starting to walk at #",e/l.t_size);var t=new Set;!function e(t,n){if(t>=0&&!n.has(t)){n.add(t);var r=L.tiles;A[t*W+2]=1,e(r[t+l.t_tile0],n),e(r[t+l.t_tile1],n),e(r[t+l.t_tile2],n),e(r[t+l.t_tile3],n)}}(e,t)}(),function(){for(var e=L.graph,t=e.length,n=0,r=0,i=0;i<t;i+=l.g_size){var a=e[r+l.g_x],o=k[n+0],s=e[r+l.g_y];if(5!==k[n+R])if(o<2)k[n+R]=0;else if(o<5.5)k[n+R]=1;else{var u=q.noise2D(.005*a,.005*s);k[n+R]=o<60?u<.2?2:4:u<.2?4:2}n+=3,r+=l.g_size}}()}var W=7/l.t_size;var q=new s.a;var N,G,U={distance:1e3,inclination:.05,azimuth:.25};function B(){if(G){var e=Math.PI*(U.inclination-.5),t=2*Math.PI*(U.azimuth-.5);j.position.x=U.distance*Math.cos(t),j.position.y=U.distance*Math.sin(t)*Math.sin(e),j.position.z=U.distance*Math.sin(t)*Math.cos(e),G.material.uniforms.sunPosition.value=j.position.copy(j.position),E&&E.material.uniforms.sunDirection.value.copy(j.position).normalize(),N.update(O,G)}}function J(){H(),x=document.getElementById("container"),(O=new u.Ab).setPixelRatio(window.devicePixelRatio),O.setSize(window.innerWidth,window.innerHeight),x.appendChild(O.domElement),M=new u.hb,(P=new u.V(55,window.innerWidth/window.innerHeight,1,2e4)).position.set(250,250,1e3),j=new u.k("#fff8d5",.8),M.add(j),(N=new u.j(.2,1,512)).renderTarget.texture.generateMipmaps=!0,N.renderTarget.texture.minFilter=u.C,M.background=N.renderTarget;var e=new u.X(3e4,3e4);(E=new d.a(e,{textureWidth:512,textureHeight:512,waterNormals:Q,alpha:.6,sunDirection:j.position.clone().normalize(),sunColor:"#fff8d5",waterColor:"#000e1e",distortionScale:2.5,clipBias:1e-4,fog:!0})).rotation.x=-Math.PI/2,M.add(E);var t=(G=new h.a).material.uniforms;t.turbidity.value=5,t.rayleigh.value=1.5,t.luminance.value=1,t.mieCoefficient.value=.05,t.mieDirectionalG.value=.9,N.renderTarget.texture,B(),(S=new v.a(P,O.domElement)).maxPolarAngle=.45*Math.PI,S.target.set(0,0,0),S.minDistance=0,S.maxDistance=1500,S.enableDamping=!0,S.dampingFactor=.02,S.update(),window.addEventListener("resize",$,!1),function(){var e=new u.g;e.name="Landscape-Debug";var t=[],n=[],r=[],i=L,a=i.graph,o=i.tiles,s=(i.config,o.length);console.log("Height map for ",s/l.t_size," tiles");for(var f=[1,0,1],c=function(e){var t=k[e+R];return D[t]||f},g=0,d=0;d<s;d+=l.t_size){var h=o[d+l.t_n0],v=o[d+l.t_n1],y=o[d+l.t_n2],p=o[d+l.t_n3],m=h*V,_=v*V,b=y*V,w=p*V,x=(A[g+2],a[h+l.g_x]),P=-1===A[g+3]?k[m+0]:A[g+3],O=a[h+l.g_y],j=a[v+l.g_x],S=-1===A[g+4]?k[_+0]:A[g+4],E=a[v+l.g_y],z=a[y+l.g_x],T=-1===A[g+5]?k[b+0]:A[g+5],I=a[y+l.g_y],F=a[p+l.g_x],C=-1===A[g+6]?k[w+0]:A[g+6],H=a[p+l.g_y],W=x-j,q=P-S,N=O-E,G=z-j,U=T-S,B=I-E,J=F-j,$=C-S,K=H-E,X=(q*B-N*U+(q*K-N*$))/2,Q=(N*G-W*B+(N*J-W*K))/2,Y=(W*U-q*G+(W*$-q*J))/2,Z=1/Math.sqrt(X*X+Q*Q+Y*Y);X*=Z,Q*=Z,Y*=Z;var ee=c(m),te=c(_),ne=c(b),re=c(w);ee===D[0]&&te===D[0]&&ne===D[0]&&re===D[0]||(t.push(x,P,O),t.push(F,C,H),t.push(j,S,E),t.push(j,S,E),t.push(F,C,H),t.push(z,T,I),n.push(X,Q,Y),n.push(X,Q,Y),n.push(X,Q,Y),n.push(X,Q,Y),n.push(X,Q,Y),n.push(X,Q,Y),r.push(ee[0],ee[1],ee[2]),r.push(re[0],re[1],re[2]),r.push(te[0],te[1],te[2]),r.push(te[0],te[1],te[2]),r.push(re[0],re[1],re[2]),r.push(ne[0],ne[1],ne[2])),g+=7}console.log({vertices:t,normals:n,colors:r}),e.setAttribute("position",new u.o(t,3)),e.setAttribute("normal",new u.o(n,3)),e.setAttribute("color",new u.o(r,3));var ie=new u.N({vertexColors:!0,side:u.l,roughness:.5}),ae=new u.K(e,ie);ae.position.set(0,-2,0),M.add(ae)}()}var V=3/l.g_size;function $(){P.aspect=window.innerWidth/window.innerHeight,P.updateProjectionMatrix(),O.setSize(window.innerWidth,window.innerHeight)}var K=0;function X(){!function(){var e=1e-4*performance.now();E&&(E.position.y=1.9+.4*Math.sin(e),E.material.uniforms.time.value+=1/60);O.render(M,P);!1}(),U.inclination=.1+.3*Math.sin(K+=.001),B(),S.update(),a()(X)}var Q,Y;Promise.all([0,g("assets/ground.glb"),g("assets/ms.glb"),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise((function(n,r){y.load(e,n,t,r)}))}("assets/waternormals.jpg")]).then((function(e){var t=m(e,4),n=t[0],r=t[1],i=t[2],a=t[3];z=T.map((function(e){return r.scene.children.find((function(t){return t.name===e})).material})),console.log({materials:z}),Y=function(e){for(var t=e.children,n=new Array(I.length),r=0;r<t.length;r++){var i=t[r],a=I.indexOf(i.name);a>=0&&(n[a]=i.geometry)}return n}(i.scene),console.log(Y),console.log("GLTF",n),a.wrapS=a.wrapT=u.gb,Q=a,J(),X()}))},2:function(e,t,n){},3:function(e,t,n){"use strict";function r(e){if(e<.05)return.05*.05-(e=.05-e)*e;if(e<.6){return.05*.05+(e-=.05)*e*.4975/.30249999999999994}return 1-(e=1-e)*e*e*.5/(.4*.4*.4)}n.d(t,"a",(function(){return r}))},6:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=Math.sqrt,a=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.x=t,this.y=n}var t,n,a;return t=e,(n=[{key:"copy",value:function(){return new e(this.x,this.y)}},{key:"add",value:function(e,t){return"number"==typeof e?(this.x+=e,this.y+=t):(this.x+=e.x,this.y+=e.y),this}},{key:"subtract",value:function(e,t){return"number"==typeof e?(this.x-=e,this.y-=t):(this.x-=e.x,this.y-=e.y),this}},{key:"scale",value:function(e){return this.x*=e,this.y*=e,this}},{key:"length",value:function(){var e=this.x,t=this.y;return i(e*e+t*t)}},{key:"norm",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return this.scale(e/this.length())}},{key:"rotateClockwise",value:function(){var e=this.x,t=this.y;return this.x=t,this.y=-e,this}},{key:"rotateCounterClockwise",value:function(){var e=this.x,t=this.y;return this.x=-t,this.y=e,this}},{key:"set",value:function(e,t){"number"==typeof e?(this.x=e,this.y=t):(this.x=e.x,this.y=e.y)}}])&&r(t.prototype,n),a&&r(t,a),e}();t.default=a}});
//# sourceMappingURL=bundle-main-0b55c83cd2edc089c4a9.js.map