var App=function(e){function t(t){for(var r,o,l=t[0],s=t[1],c=t[2],f=0,d=[];f<l.length;f++)o=l[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);d.length;)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==i[s]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={1:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var l=window.webpackJsonpApp=window.webpackJsonpApp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=s;return a.push([40,0]),n()}({11:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(0);function i(e,t,n,i){return new Promise((function(a){var o=document.createElement("div");document.body.appendChild(o),o.style.position="absolute",o.style.top="0px",o.style.left="-10000px";var l=new r.Ab({alpha:!0});l.setPixelRatio(window.devicePixelRatio),l.setSize(t,n),o.appendChild(l.domElement);var s=new r.hb,c=new r.U(55,t/n,.1,100),u=new r.k("#fff8d5",1.4);u.position.set(0,3,-1.5),s.add(u);for(var f,d=[],m=0;m<e.length;m++){f&&s.remove(f),f=e[m].clone();var v=new r.d;v.expandByObject(f);var p=Math.max(v.max.x-v.min.x,v.max.y-v.min.y),h=p<1.5,b=h?1.2*Math.pow(p,.9):1.5*p;c.up.set(0,1,0),c.position.set(0,v.max.y*(h?1.1:.9),-b),c.lookAt(new r.wb(0,(v.max.y+v.min.y)/(h?2:4),0)),c.updateProjectionMatrix(),f.position.set(0,0,0),s.add(f),l.render(s,c);var y=document.createElement("canvas");y.width=t,y.height=n;var w=y.getContext("2d");w.drawImage(l.domElement,0,0),w.strokeStyle="rgba(255,255,255,0.4)",w.fillStyle="#fff",w.lineWidth=2,w.beginPath(),w.rect(0,0,t,n),w.stroke();var g=i?i[m]:f.name;w.fillText(g,4,n-4),d.push(y)}a(d),s.dispose(),l.dispose(),document.body.removeChild(o)}))}},16:function(e){e.exports=JSON.parse('{"version":1,"timestamp":"2020-06-12T17:14:19.267Z","instances":[{"name":"house","position":[-11,0,-11],"rotation":0,"material":0,"indexes":[0,1,12,13],"x":0,"y":0},{"name":"house","position":[-9,0,-11],"rotation":3,"material":0,"indexes":[14,2,15,3],"x":2,"y":0},{"name":"house","position":[-9,0,-9],"rotation":2,"material":0,"indexes":[39,38,27,26],"x":2,"y":2},{"name":"house","position":[-11,0,-9],"rotation":1,"material":0,"indexes":[25,37,24,36],"x":0,"y":2}]}')},2:function(e,t,n){"use strict";var r,i;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"l",(function(){return o})),n.d(t,"h",(function(){return l})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return c})),n.d(t,"i",(function(){return u})),n.d(t,"b",(function(){return f})),n.d(t,"k",(function(){return d})),n.d(t,"f",(function(){return m})),n.d(t,"a",(function(){return v})),n.d(t,"e",(function(){return p})),n.d(t,"j",(function(){return h})),n.d(t,"g",(function(){return b}));var o=0,l=1,s=2,c=3,u=4,f=6,d=8,m=["Water","Sand","Grass","Forest","Stone","Ice","Dirt","Packed_Ice"],v=[null,"case-1","case-2","case-3","case-4","case-5-1","case-6","case-7","case-8","case-9","case-10-1","case-11","case-12","case-13","case-14","case-15","case-m1","case-m2","case-m3","case-m4","case-5-2","case-10-2"],p=(a(r={},o,[0,.4,.8]),a(r,l,[.8,.8,0]),a(r,s,[0,.7,0]),a(r,f,[.5,.3,.1]),a(r,c,[.2,.5,.3]),a(r,u,[.5,.5,.5]),a(r,5,[1,1,1]),a(r,7,[1,1,1]),a(r,d,[1,0,1]),r),h=(a(i={},o,0),a(i,l,1),a(i,s,1),a(i,f,1),a(i,c,1),a(i,u,.4),a(i,5,.9),a(i,7,.8),a(i,d,0),2*Math.PI),b=(1+Math.sqrt(5))/2},33:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(7),i=n.n(r),a=n(3),o=n.n(a),l=n(19),s=n.n(l),c=(n(6),n(0)),u=n(5),f=n(2);function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var m,v,p,h,b,y=function(){function e(t,n,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=t,this.size=n,this.tiles=i;var a=f.b;this.data=new Float64Array(n*n*a);var o=new Float64Array(2*a);this.offsets=o;var l=1*-n/2,s=1*-n/2,u=0,d=1*n,m=0,v=1,p=v,h=!1,b=new c.q;b.name="MaterialGrid";for(var y=0;y<a;y++){o[m++]=l,o[m++]=s,console.log("MATERIAL #",y,"at",l,s);var w=new c.W(1*n,1*n,1,1),g=r[y].clone();g.side=c.l;var j=new c.J(w,g);if(j.name="M"+y,j.position.set(l,s,0),b.add(j),l+=u,s+=d,0==--p){var x=u;u=-d,d=x,h&&v++,h=!h,p=v}}b.rotation.x=f.j/4,this.group=b,t.add(b)}var t,n,r;return t=e,(n=[{key:"setTile",value:function(e,t,n,r,i){for(var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,o=this.size,l=r.size,s=2*i,c=t+w[s]*(l-1),u=n+w[s+1]*(l-1),f=g[s],d=g[s+1],m=e*o*o,v=!a,p=!v&&new Array(l*l),h=-f*l-d,b=-d*l+f,y=0,j=r.id,x=0;x<l;x++){for(var O=0;O<l;O++){var E=m+c+u*o;v?this.data[E]===j&&(this.data[E]=0):(0!==this.data[E]&&"function"==typeof a&&a(E),p[y++]=E,this.data[E]=j),j++,c+=f,u+=d}c+=h,u+=b}return p}},{key:"clearTile",value:function(e){this.setTile(e.material,e.x,e.y,e.tile,e.rotation,null)}}])&&d(t.prototype,n),r&&d(t,r),e}(),w=[0,0,1,0,1,1,0,1],g=[1,0,0,1,-1,0,0,-1],j=n(14),x=n(10),O=n(12),E=n.n(O),T=(n(33),n(25)),P=function(e){var t=e.elem,n=e.index,r=e.active,i=e.onClick,l=Object(a.useRef)(null);return Object(a.useEffect)((function(){l.current.appendChild(t)}),[]),o.a.createElement("button",{ref:l,type:"button",className:E()("btn btn-sm m-1",r===n?"btn-light":"btn-default"),onClick:i})},S=Object(a.memo)((function(e){var t=e.size;return o.a.createElement("span",{className:"badge badge-secondary ml-1",style:{visibility:1===t&&"hidden"}},t+"x"+t)})),k=Object(T.a)((function(e){var t=e.editorState,n=e.download,r=e.clearAll,i=t.tiles,a=t.visible,l=t.activeTileIndex,s=t.activeTile,c=t.dirty;return o.a.createElement(o.a.Fragment,null,o.a.createElement("button",{type:"button",accessKey:"u",className:E()("btn btn-default toggle",a&&"visible"),onClick:function(){return t.toggleVisible()}},o.a.createElement("i",{className:"fas fa-arrows-alt-h"})),o.a.createElement("div",{className:E()("sidebar",a&&"visible"),onFocusCapture:function(){return t.toggleVisible(!0)}},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col"},o.a.createElement("p",{className:"form-control-plaintext border-bottom"},o.a.createElement("strong",null,"Island Rules Builder")))),o.a.createElement("div",{className:"row small"},o.a.createElement("div",{className:"col"},o.a.createElement("strong",null,"Selected:")," ",s.name,o.a.createElement(S,{size:s.size}))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"tile-selector flex"},i.map((function(e,n){return o.a.createElement(P,{key:n,index:n,active:l,onClick:function(){return t.selectTile(n)},elem:e.thumbnail})})))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col"},o.a.createElement("i",{className:E()("fas mr-1",c?"fa-spinner rotating":"fa-check",c?"text-muted":"text-success"),title:c?"Write pending":"Synched to localStorage"}),o.a.createElement("button",{type:"button",className:"btn btn-sm btn-secondary mr-1",onClick:n},"Download JSON"),o.a.createElement("button",{type:"button",className:"btn btn-sm btn-danger mr-1",onClick:function(){confirm("Do you really want to delete all tiles?")&&r()}},"Clear"))))))})),z=n(4);function _(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function A(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t,n,r,i){var a={};return Object.keys(r).forEach((function(e){a[e]=r[e]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=n.slice().reverse().reduce((function(n,r){return r(e,t,n)||n}),a),i&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(i):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}var I=(m=z.action.bound,p=C((v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,"visible",p,this),_(this,"dirty",h,this),_(this,"activeTileIndex",b,this),this.tiles=t}var t,n,r;return t=e,(n=[{key:"toggleVisible",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!this.visible;this.visible=e}},{key:"selectTile",value:function(e){this.activeTileIndex=e}},{key:"setDirty",value:function(e){this.dirty=e}},{key:"activeTile",get:function(){var e=this.activeTileIndex;return this.tiles[e]}}])&&A(t.prototype,n),r&&A(t,r),e}()).prototype,"visible",[z.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),h=C(v.prototype,"dirty",[z.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),b=C(v.prototype,"activeTileIndex",[z.observable],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),C(v.prototype,"toggleVisible",[z.action],Object.getOwnPropertyDescriptor(v.prototype,"toggleVisible"),v.prototype),C(v.prototype,"selectTile",[m],Object.getOwnPropertyDescriptor(v.prototype,"selectTile"),v.prototype),C(v.prototype,"setDirty",[z.action],Object.getOwnPropertyDescriptor(v.prototype,"setDirty"),v.prototype),v),M=(n(34),n(11)),D={cactus:{variants:["cactus_short","cactus_tall"]},flower:{variants:["flower_purpleA","flower_purpleB","flower_purpleC","flower_redA","flower_redB","flower_redC","flower_yellowA","flower_yellowB","flower_yellowC"]},stone_large:{variants:["stone_largeD","stone_largeE","stone_largeF"]},stone_small:{variants:["stone_smallD"]},palm_tree:{variants:["tree_palmDetailedTall","tree_palmShort","tree_palmTall"]},pine:{variants:["tree_pineRoundD","tree_pineTallC_detailed","tree_pineTallD"]},tree_plateau:{variants:["tree_plateau"]},tree_tall_dark:{variants:["tree_tall_dark"]},tree_thin:{variants:["tree_thin"]},house:{variants:["House"],size:2}},N=n(26);function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var F=new c.i("#fff"),L=new c.i("#ff3c78");var J=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.grid=n,this.editorState=r,this.raycaster=new c.fb,this.material=0,this.current=null,this.object=function(){var e=new c.x({color:0,linewidth:1.5,depthTest:!1,opacity:.5,transparent:!0}),t=[];t.push(new c.wb(-.5,0,-.5)),t.push(new c.wb(.5,0,-.5)),t.push(new c.wb(.5,0,.5)),t.push(new c.wb(-.5,0,.5)),t.push(new c.wb(-.5,0,-.5));var n=new c.w((new N.a).setFromPoints(t),e),r=new c.J(new c.W(1,1),new c.K({color:16777215,depthTest:!1,opacity:.2,transparent:!0}));r.rotation.x=-f.j/4;var i=new c.q;return i.add(r),i.add(n),i}(),this.valid=!1,t.add(this.object)}var t,n,r;return t=e,(n=[{key:"setValid",value:function(e){this.valid=!!e,this.object.children[0].material.color=e?F:L,this.object.children[0].material.opacity=e?.2:.8}},{key:"update",value:function(e,t){var n=this.grid,r=this.raycaster,i=this.object,a=this.editorState;r.setFromCamera(e,t);var o=r.intersectObjects(n.group.children);if(o.length>0){this.current!==o[0].object&&(this.current=o[0].object,this.material=+this.current.name.substr(1));var l=o[0].point,s=a.activeTile.size,c=2*this.material,u=n.offsets[c],f=n.offsets[c+1],d=Math.floor((l.x-u)/1)+n.size/2,m=Math.floor((l.z-f)/1)+n.size/2,v=d+s<=n.size&&m+s<=n.size;this.setValid(v);var p=u+1*(d-n.size/2)+s/2,h=f+1*(m-n.size/2)+s/2;i.position.x===p&&i.position.z===h||(this.x=d,this.y=m,i.position.set(p,0,h)),this.object.visible=!0}else this.object.visible=!1,this.valid=!1,this.current=null}}])&&R(t.prototype,n),r&&R(t,r),e}();function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=0,H=function(){function e(t,n,r,i,a,o,l){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=void 0,this.tile=void 0,this.position=void 0,this.object=null,this.indexes=null,this.id=++V,this.scene=t,this.tile=n,this.position=r.clone(),this.rotation=i,this.material=a,this.x=o,this.y=l,this.createObject()}var t,n,r;return t=e,(n=[{key:"createObject",value:function(){var e=this.tile,t=this.scene,n=this.position,r=this.rotation,i=e.variants;this.variant=Math.random()*i.length|0;var a=i[this.variant].clone();a.scale.set(1,1,1),a.position.copy(n),a.rotation.y=f.j*r/4,this.object=a,t.add(a)}},{key:"removeObject",value:function(){var e=this.scene,t=this.object;t&&(e.remove(t),this.object=null)}}])&&B(t.prototype,n),r&&B(t,r),e}(),W=n(16);function K(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,a=void 0;try{for(var o,l=e[Symbol.iterator]();!(r=(o=l.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,a=e}finally{try{r||null==l.return||l.return()}finally{if(i)throw a}}return n}(e,t)||q(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=q(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,a=!0,o=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){o=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(o)throw i}}}}function U(e){return function(e){if(Array.isArray(e))return Y(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||q(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function q(e,t){if(e){if("string"==typeof e)return Y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){$(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function $(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Q,ee,te,ne,re,ie,ae,oe,le,se,ce,ue,fe=2*Math.PI,de=new Set,me=1e3,ve=.1,pe=.1;function he(){return window.innerWidth-(Re.visible?220:0)}function be(e){e.preventDefault(),ye.x=e.clientX/he()*2-1,ye.y=-e.clientY/window.innerHeight*2+1}var ye=new c.vb(100,0);function we(){te.aspect=he()/window.innerHeight,te.updateProjectionMatrix(),re.setSize(he(),window.innerHeight)}function ge(){le.update(ye,te),Ne&&(Ne.rotation.y=fe*Fe/4,Ne.position.copy(le.object.position)),function(){performance.now();re.render(ne,te)}(),ae&&ae.update(),i()(ge)}var je=[];function xe(){var e=document.createElement("canvas");e.width=40,e.height=40/.75;var t=e.getContext("2d");t.lineWidth=4,t.strokeStyle="rgba(255,64,64,0.5)",t.fillStyle="#fff";var n=40/.75*.5,r=.3*Math.min(n,20);return t.beginPath(),t.moveTo(20-r,-r+n),t.lineTo(r+20,r+n),t.moveTo(r+20,-r+n),t.lineTo(20-r,r+n),t.rect(0,0,40,40/.75),t.stroke(),t.fillText("None",4,40/.75-4),e}function Oe(e){var t=e.timestamp;"string"==typeof t&&(e.timestamp=new Date(t))}function Ee(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.name===t)return r}return null}function Te(){var e=function(){var e=localStorage.getItem("@fforw/islands:data");if(!e)return null;var t=JSON.parse(e);return Oe(t),t}();!e||e.timestamp.getTime()<W.timestamp.getTime()?(console.info("Loading input JSON"),e=W):console.info("Loading from localStorage");for(var t=e.instances,n=new Set,r=0;r<t.length;r++){var i=t[r],a=Ee(je,i.name);if(a){var o=new H(ne,a,new c.wb(i.position[0],i.position[1],i.position[2]),i.rotation,i.material,i.x,i.y);o.variant=Math.random()*a.variants.length|0,o.indexes=i.indexes,ee.setTile(o.material,o.x,o.y,o.tile,o.rotation,!0),de.add(o)}else n.add(i.name)}n.size>0&&console.log("Could not find some tiles: ",n)}function Pe(){return JSON.stringify({version:1,timestamp:(new Date).toISOString(),instances:U(de).map((function(e){return{name:e.tile.name,position:[e.position.x,e.position.y,e.position.z],rotation:e.rotation,material:e.material,indexes:e.indexes,x:e.x,y:e.y}}))},null,4)}Oe(W);var Se,ke=[],ze=0,_e=0;function Ae(){Re.setDirty(!0),Se&&(clearTimeout(Se),Se=null),Se=setTimeout(Ce,1e3)}function Ce(){Se=null,Re.setDirty(!1),localStorage.setItem("@fforw/islands:data",Pe())}function Ie(e){var t=Re.activeTile;if(le.valid){var n=0!==t.id?new H(ne,t,Ne.position,Fe,le.material,le.x,le.y):null,r=[],i=ee.setTile(le.material,le.x,le.y,t,Fe,(function(e){var t,n=G(de);try{for(n.s();!(t=n.n()).done;){var i=t.value;if(i.indexes.indexOf(e)>=0){ee.clearTile(i),i.removeObject(),r.push(i),de.delete(i);break}}}catch(e){n.e(e)}finally{n.f()}}));n&&(n.indexes=i,de.add(n)),Me(n,r),Ae()}}function Me(e,t){var n={added:e,removed:t};if(ze<32)ke[ze++]=n,_e=ze;else{for(var r=0;r<ze;r++)ke[r]=ke[r+1];ke[ze]=n}}function De(e){var t=e.keyCode;82===t?Fe=Fe+(e.shiftKey?1:-1)&3:90===t&&e.ctrlKey&&(e.shiftKey?function(){if(ze<_e){var e=ke[ze++],t=e.added,n=e.removed;if(t&&(ee.setTile(t.material,t.x,t.y,t.tile,t.rotation,!0),t.createObject(),de.add(t)),n)for(var r=0;r<n.length;r++){var i=n[r];ee.clearTile(i),i.removeObject(),de.delete(i)}Ae()}}():function(){if(ze>0){var e=ke[--ze],t=e.added,n=e.removed;if(t&&(ee.clearTile(t),t.removeObject(),de.delete(t)),n)for(var r=0;r<n.length;r++){var i=n[r];ee.setTile(i.material,i.x,i.y,i.tile,i.rotation,!0),i.createObject(),de.add(i)}Ae()}}())}Promise.all([Object(u.a)("assets/ground.glb"),Object(u.a)("assets/tiles.glb").then((function(e){var t=[],n=0;for(var r in D)D.hasOwnProperty(r)&&function(){var i=D[r],a=i.variants,o=i.size,l=void 0===o?1:o;t[n]=Z(Z({id:-1,name:r},i),{},{size:l,variants:e.scene.children.filter((function(e){return a.indexOf(e.name)>=0}))}),n++}();t.sort((function(e,t){return e.name===t.name?0:e.name<t.name?-1:1}));var i=1;t.forEach((function(e){e.id=i,i+=e.size*e.size}));var a=[],o=[];return t.forEach((function(e,t){a[t]=e.name,o[t]=e.variants[0]})),Object(M.a)(o,40,40/.75,a).then((function(e){return e.forEach((function(e,n){return t[n].thumbnail=e})),t.unshift({id:0,name:"empty",variants:[],size:1,thumbnail:xe()}),t}))}))]).then((function(e){var t=K(e,2),n=t[0],r=t[1];je.push.apply(je,U(r)),console.log({tiles:je}),oe=f.f.map((function(e){var t=n.scene.children.find((function(t){return t.name===e}));if(!t)throw new Error("Could not find "+e);return t.material}));!function(e){for(var t=0,n=0;n<e.length;n++){var r=e[n].size;r>t&&(t=r)}}(je);document.title+=" Rule Editor",Q=document.getElementById("container"),(re=new c.Ab).setPixelRatio(window.devicePixelRatio),re.setSize(he(),window.innerHeight),re.outputEncoding=c.Bb,Q.appendChild(re.domElement),(se=document.createElement("div")).setAttribute("id","root"),Q.appendChild(se),ne=new c.hb,(te=new c.U(55,he()/window.innerHeight,1,2e4)).up.set(0,1,0);te.position.set(-35,35,0),te.lookAt(new c.wb(0,0,0)),te.updateProjectionMatrix(),ie=new c.k("#fff8d5",1.4),ne.add(ie),ce=new c.j(.2,1,512),ne.background=ce.renderTarget;(ue=new x.a).material.uniforms;ce.renderTarget.texture,function(){if(ue){var e=Math.PI*(ve-.5),t=2*Math.PI*(pe-.5);ie.position.x=me*Math.cos(t),ie.position.y=me*Math.sin(t)*Math.sin(e),ie.position.z=me*Math.sin(t)*Math.cos(e),ue.material.uniforms.sunPosition.value=ie.position.copy(ie.position),ce.update(re,ue)}}(),(ae=new j.a(te,re.domElement)).maxPolarAngle=Math.PI,ae.target.set(0,0,0),ae.minDistance=0,ae.maxDistance=1500,ae.enableDamping=!0,ae.dampingFactor=.02,ae.mouseButtons={MIDDLE:c.F.ROTATE,RIGHT:c.F.PAN},ae.update(),ee=new y(ne,12,oe,je),(le=new J(ne,ee,Re)).update(ye,te),document.addEventListener("mousemove",be,!1),document.addEventListener("keydown",De,!1),window.addEventListener("resize",we,!1),Q.addEventListener("click",Ie,!1),Te(),Re.selectTile(1),new Promise((function(e,t){try{s.a.render(o.a.createElement(k,{editorState:Re,clearAll:Le,download:function(){!function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"text/plain",r=document.createElement("a");r.setAttribute("href","data:"+n+";charset=utf-8,"+encodeURIComponent(t)),r.setAttribute("download",e),r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)}("input.json",Pe(),"text/json")}}),se,e)}catch(e){t(e)}})).then(ge)}));var Ne,Re=new I(je);Object(z.reaction)((function(){return Re.visible}),we);var Fe=0;function Le(){var e,t=G(de);try{for(t.s();!(e=t.n()).done;){var n=e.value;n.removeObject(),ee.clearTile(n)}}catch(e){t.e(e)}finally{t.f()}Me(null,U(de)),de.clear(),Ae()}Object(z.reaction)((function(){return Re.activeTileIndex}),(function(){var e=Re.activeTile,t=Re.activeTileIndex;le.object.scale.set(e.size,e.size,e.size),Ne&&(!function e(t){t.material&&t.material.dispose();var n=t.children;if(n)for(var r=0;r<n.length;r++)e(n[r])}(Ne),ne.remove(Ne)),0===t?Ne=null:((Ne=je[t].variants[0].clone()).scale.set(1,1,1),function e(t,n){t.material&&(t.material=t.material.clone(),t.material.transparent=n<1,t.material.opacity=n);var r=t.children;if(r)for(var i=0;i<r.length;i++)e(r[i],n)}(Ne,.2),Ne.rotation.y=fe*Fe/4,console.log({ghost:Ne}),ne.add(Ne)),console.log("ACTIVE",e)}));t.default={LOCAL_STORAGE_KEY:"@fforw/islands:data"}},5:function(e,t,n){"use strict";var r=new(n(8).a);t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise((function(n,i){r.load(e,n,t,i)}))}},6:function(e,t,n){}}).default;
//# sourceMappingURL=bundle-editor-859b3a98b987f8b5d7d2.js.map