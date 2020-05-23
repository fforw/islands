var Demo =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonpDemo"] = window["webpackJsonpDemo"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../organic-quads/lib/index.js":
/*!*************************************!*\
  !*** ../organic-quads/lib/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Vector", {
  enumerable: true,
  get: function get() {
    return _vector.default;
  }
});
exports.default = exports.t_size = exports.t_tile3 = exports.t_tile2 = exports.t_tile1 = exports.t_tile0 = exports.t_isEdge = exports.t_n3 = exports.t_n2 = exports.t_n1 = exports.t_n0 = exports.g_size = exports.g_edge5 = exports.g_edge4 = exports.g_edge3 = exports.g_edge2 = exports.g_edge1 = exports.g_edge0 = exports.g_count = exports.g_isEdge = exports.g_y = exports.g_x = exports.f_size = exports.f_outmostEdge = exports.f_count = exports.f_y3 = exports.f_x3 = exports.f_y2 = exports.f_x2 = exports.f_y1 = exports.f_x1 = exports.f_y0 = exports.f_x0 = void 0;

var _performanceNow = _interopRequireDefault(__webpack_require__(/*! performance-now */ "../organic-quads/node_modules/performance-now/lib/performance-now.js"));

var _vector = _interopRequireDefault(__webpack_require__(/*! ./vector */ "../organic-quads/lib/vector.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var f_x0 = 0;
exports.f_x0 = f_x0;
var f_y0 = 1;
exports.f_y0 = f_y0;
var f_x1 = 2;
exports.f_x1 = f_x1;
var f_y1 = 3;
exports.f_y1 = f_y1;
var f_x2 = 4;
exports.f_x2 = f_x2;
var f_y2 = 5;
exports.f_y2 = f_y2;
var f_x3 = 6;
exports.f_x3 = f_x3;
var f_y3 = 7;
exports.f_y3 = f_y3;
var f_count = 8;
exports.f_count = f_count;
var f_outmostEdge = 9;
exports.f_outmostEdge = f_outmostEdge;
var f_size = 10;
exports.f_size = f_size;
var g_x = 0;
exports.g_x = g_x;
var g_y = 1;
exports.g_y = g_y;
var g_isEdge = 2;
exports.g_isEdge = g_isEdge;
var g_count = 3;
exports.g_count = g_count;
var g_edge0 = 4;
exports.g_edge0 = g_edge0;
var g_edge1 = 5;
exports.g_edge1 = g_edge1;
var g_edge2 = 6;
exports.g_edge2 = g_edge2;
var g_edge3 = 7;
exports.g_edge3 = g_edge3;
var g_edge4 = 8;
exports.g_edge4 = g_edge4;
var g_edge5 = 9;
exports.g_edge5 = g_edge5;
var g_size = 10;
exports.g_size = g_size;
var t_n0 = 0;
exports.t_n0 = t_n0;
var t_n1 = 1;
exports.t_n1 = t_n1;
var t_n2 = 2;
exports.t_n2 = t_n2;
var t_n3 = 3;
exports.t_n3 = t_n3;
var t_isEdge = 4;
exports.t_isEdge = t_isEdge;
var t_tile0 = 5;
exports.t_tile0 = t_tile0;
var t_tile1 = 6;
exports.t_tile1 = t_tile1;
var t_tile2 = 7;
exports.t_tile2 = t_tile2;
var t_tile3 = 8;
exports.t_tile3 = t_tile3;
var t_size = 9;
exports.t_size = t_size;
var TAU = Math.PI * 2;
var SIXTH = TAU / 6;

function calculateNumberOfFaces(limit) {
  return 6 * (limit + 1) * (limit + 1);
}

var DEFAULT_CONFIG = {
  /** coordinate width */
  width: 0,

  /** coordinate height */
  height: 0,

  /** number of rings in the hexagon / number of base intersections of hexaxgon */
  numberOfRings: 5,

  /** how many percent of the edges shall we attempt to remove? */
  removeEdges: 50,

  /** if true, the graph will be layouted a bit with every render. If false, the graph relaxation happens at creation */
  animatedEasing: true,

  /** Set to true to render the original triangles, set to "merged" to render the merged triangles before subdivision */
  renderFirstPassEdges: false,

  /** Set to true to enable some debug logging */
  debug: false,
  weightFunction: function weightFunction(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  },
  /// MOSTLY INTERNAL CONFIG ////
  // calculated internally to match the height
  edgeLength: 80,
  // number of iterations until we give up (we will drop out due to having reached low energy most likely much sooner)
  maxIterations: 100,
  // set to false if the graph is done animated on animatedEasing : true
  animating: true,
  // Minimum energy at which we stop relaxing the graph
  minTension: 2
};

function updateConfig(config) {
  config.numFaces = calculateNumberOfFaces(config.numberOfRings);
  config.firstPassLen = config.numFaces * f_size;
  config.firstPassNumEdges = config.numFaces * 3;
  config.edgeLength = Math.min(config.width, config.height) / (config.numberOfRings * 2 + 2) | 0;
  config.animating = config.animatedEasing;
  config.relaxCount = 0;
}

function createHexagonTriangles(config) {
  var limit = config.numberOfRings; //console.log("createHexagonTriangles", limit);

  var DIRECTIONS = [new _vector.default(Math.cos(0) * config.edgeLength, Math.sin(0) * config.edgeLength), new _vector.default(Math.cos(SIXTH) * config.edgeLength, Math.sin(SIXTH) * config.edgeLength), new _vector.default(Math.cos(SIXTH * 2) * config.edgeLength, Math.sin(SIXTH * 2) * config.edgeLength), new _vector.default(Math.cos(SIXTH * 3) * config.edgeLength, Math.sin(SIXTH * 3) * config.edgeLength), new _vector.default(Math.cos(SIXTH * 4) * config.edgeLength, Math.sin(SIXTH * 4) * config.edgeLength), new _vector.default(Math.cos(SIXTH * 5) * config.edgeLength, Math.sin(SIXTH * 5) * config.edgeLength)];
  var faces = new Float64Array(config.firstPassLen);
  var off = 0;
  var count = 0;
  var numTris = 1;

  do {
    for (var i = 0; i < 6; i++) {
      var v0 = DIRECTIONS[i];
      var v1 = DIRECTIONS[(i + 1) % 6];
      var v2 = DIRECTIONS[(i + 2) % 6];
      var pos = v0.copy().scale(count);

      for (var j = 0; j < numTris; j++) {
        if (j & 1) {
          faces[off + f_x0] = pos.x | 0;
          faces[off + f_y0] = pos.y | 0;
          faces[off + f_x1] = pos.x + v1.x | 0;
          faces[off + f_y1] = pos.y + v1.y | 0;
          faces[off + f_x2] = pos.x + v2.x | 0;
          faces[off + f_y2] = pos.y + v2.y | 0;
          faces[off + f_count] = 3;
          faces[off + f_outmostEdge] = -1;
          off += f_size;
          pos.add(v2);
        } else {
          // All tris in the last row all have their edge #1 on the outer edge of the big hexagon
          var isOutmost = count === limit;
          faces[off + f_x0] = pos.x | 0;
          faces[off + f_y0] = pos.y | 0;
          faces[off + f_x1] = pos.x + v0.x | 0;
          faces[off + f_y1] = pos.y + v0.y | 0;
          faces[off + f_x2] = pos.x + v1.x | 0;
          faces[off + f_y2] = pos.y + v1.y | 0;
          faces[off + f_count] = 3;
          faces[off + f_outmostEdge] = isOutmost ? 1 : -1;
          off += f_size;
        }
      }
    }

    numTris += 2;
  } while (count++ < limit);

  return faces;
}

function findOtherEdge(faces, x0, y0, x1, y1, index, out) {
  for (var i = 0; i < faces.length; i += f_size) {
    if (i === index) {
      continue;
    } // console.log("find", x0, y0, x1, y1, ":",
    //     faces[i + f_x0], faces[i + f_y0],
    //     faces[i + f_x1], faces[i + f_y1],
    //     faces[i + f_x2], faces[i + f_y2],
    //     faces[i + f_x3], faces[i + f_y3],
    // );


    var count = faces[i + f_count];

    if (faces[i + f_x0] === x1 && faces[i + f_y0] === y1 && faces[i + f_x1] === x0 && faces[i + f_y1] === y0) {
      out.index = i;
      out.edge = 0;
      return;
    }

    if (faces[i + f_x1] === x1 && faces[i + f_y1] === y1 && faces[i + f_x2] === x0 && faces[i + f_y2] === y0) {
      out.index = i;
      out.edge = 1;
      return;
    }

    if (count === 3) {
      if (faces[i + f_x2] === x1 && faces[i + f_y2] === y1 && faces[i + f_x0] === x0 && faces[i + f_y0] === y0) {
        out.index = i;
        out.edge = 2;
        return;
      }
    } else {
      if (faces[i + f_x2] === x1 && faces[i + f_y2] === y1 && faces[i + f_x3] === x0 && faces[i + f_y3] === y0) {
        out.index = i;
        out.edge = 2;
        return;
      }

      if (faces[i + f_x3] === x1 && faces[i + f_y3] === y1 && faces[i + f_x0] === x0 && faces[i + f_y0] === y0) {
        out.index = i;
        out.edge = 3;
        return;
      }
    }
  }

  out.index = -1;
}

var out = {
  index: -1,
  edge: 0
};

function getEdgeStack(config, faces) {
  var length = config.numFaces * 3;
  var stack = new Int32Array(length);
  var pos = 0;

  for (var i = 0; i < config.firstPassLen; i += f_size) {
    var outmostEdge = faces[i + f_outmostEdge];
    var targetIsOutmostFace = outmostEdge >= 0; // we can't remove any of the outmost edges around the big hexagon (and we avoid having an edge triange as
    // first merged triangle to simplify edge removal

    if (!targetIsOutmostFace) {
      var scaled = i << 2;
      stack[pos++] = scaled;
      stack[pos++] = scaled + 1;
      stack[pos++] = scaled + 2;
    }
  } // fisher-yates shuffle the stack


  for (var _i = 0; _i < pos - 2; _i++) {
    var j = _i + (Math.random() * pos - _i - 1 | 0);

    var tmp = stack[_i];
    stack[_i] = stack[j];
    stack[j] = tmp;
  }

  return stack.slice(0, pos);
}

function removeRandomEdges(config, faces) {
  var count = config.firstPassNumEdges * config.removeEdges / 100 | 0; //console.log("remove attempts", count);

  var stack = getEdgeStack(config, faces);

  if (config.debug) {
    console.log("Shuffled stack", _toConsumableArray(stack.slice()));
  }

  var stackPos = 0;

  var eraseEdgesOfFaceInStack = function eraseEdgesOfFaceInStack(index) {
    for (var i = stackPos; i < stack.length; i++) {
      if (stack[i] >>> 2 === index) {
        stack[i] = -1;
      }
    }
  };

  var success = 0; // function printEdge(faces, otherIndex, outMostEdge)
  // {
  //     const count = faces[otherIndex + f_count];
  //     const x0 = faces[otherIndex + outMostEdge * 2]
  //     const y0 = faces[otherIndex + outMostEdge * 2 + 1]
  //     const x1 = outMostEdge === count -1 ? faces[otherIndex] : faces[otherIndex + (outMostEdge + 1) * 2]
  //     const y1 = outMostEdge === count -1 ? faces[otherIndex + 1] : faces[otherIndex + (outMostEdge + 1) * 2 + 1]
  //
  //
  //     return x0 + "," + y0 + "," + x1 + "," + y1;
  // }

  for (var i = 0; i < count; i++) {
    var code = void 0;

    do {
      if (stackPos === stack.length) {
        if (config.debug) {
          config.debug && console.log("Ran out of removal candidates after successfully removing", success, "out of", count);
        } // no more valid removals


        return;
      }

      code = stack[stackPos++];
    } while (code === -1);

    var index = code >> 2;
    var edge = code & 3;
    var x0 = faces[index + edge * 2];
    var y0 = faces[index + edge * 2 + 1];
    var x1 = edge === 2 ? faces[index + f_x0] : faces[index + (edge + 1) * 2];
    var y1 = edge === 2 ? faces[index + f_y0] : faces[index + (edge + 1) * 2 + 1];
    findOtherEdge(faces, x0, y0, x1, y1, index, out);

    if (out.index >= 0 && faces[out.index + f_count] === 3) {
      var otherIndex = out.index,
          otherEdge = out.edge;
      var x2 = edge === 0 ? faces[index + f_x2] : faces[index + (edge - 1) * 2];
      var y2 = edge === 0 ? faces[index + f_y2] : faces[index + (edge - 1) * 2 + 1]; // check if we're merging with an outmost face

      var outMostEdge = faces[otherIndex + 9];
      var otherIsOutmostTri = outMostEdge >= 0; //const before = printEdge(faces, otherIndex, outMostEdge)
      // if (otherIsOutmostTri)
      // {
      //     console.log("OUTMOST edge before split", printEdge(faces, otherIndex, outMostEdge),"EDGE CASE", otherEdge, "outMostEdge", outMostEdge)
      //     console.log("face before", faces.slice(otherIndex, otherIndex + f_size))
      // }

      faces[otherIndex + 8] = 4;

      switch (otherEdge) {
        case 2:
          faces[otherIndex + f_x3] = x2;
          faces[otherIndex + f_y3] = y2;
          break;

        case 1:
          faces[otherIndex + f_x3] = faces[otherIndex + f_x2];
          faces[otherIndex + f_y3] = faces[otherIndex + f_y2];
          faces[otherIndex + f_x2] = x2;
          faces[otherIndex + f_y2] = y2;
          break;

        case 0:
          faces[otherIndex + f_x3] = faces[otherIndex + f_x2];
          faces[otherIndex + f_y3] = faces[otherIndex + f_y2];
          faces[otherIndex + f_x2] = faces[otherIndex + f_x1];
          faces[otherIndex + f_y2] = faces[otherIndex + f_y1];
          faces[otherIndex + f_x1] = x2;
          faces[otherIndex + f_y1] = y2;

          if (otherIsOutmostTri) {
            faces[otherIndex + f_outmostEdge] = 2;
          }

          break;
      }

      eraseEdgesOfFaceInStack(otherIndex); // remove our face

      faces[index + f_count] = 0;
      success++;
    }

    eraseEdgesOfFaceInStack(index);
  }

  config.debug && console.log("Successfully removed", success, "out of", count);
  return success;
}

function calculateNumNodes(config, faces) {
  var tris = 0;
  var quads = 0;

  for (var i = 0; i < config.firstPassLen; i += f_size) {
    var count = faces[i + f_count];

    if (count === 3) {
      tris++;
    } else if (count === 4) {
      quads++;
    }
  } //console.log({quads,tris})
  // we divide each quad in 9 nodes and each tri into 7 nodes


  return quads * 9 + tris * 7;
}

function connectTiles(config, tiles) {
  var length = tiles.length;

  for (var i = 0; i < length; i += t_size) {
    var numConnections = 0;

    for (var j = 0; j < 4; j++) {
      var n0 = tiles[i + t_n0 + j];
      var n1 = j === 3 ? tiles[i + t_n0] : tiles[i + t_n0 + j + 1];
      var otherIndex = -1;

      for (var k = 0; k < tiles.length; k += t_size) {
        if (k === i) {
          continue;
        }

        var otherNode0 = tiles[k + t_n0];
        var otherNode1 = tiles[k + t_n1];
        var otherNode2 = tiles[k + t_n2];
        var otherNode3 = tiles[k + t_n3]; // tile edges are all defined in clockwise order, the opposite edge must necessarily walk the two nodes in
        // the opposite direction

        if (otherNode1 === n0 && otherNode0 === n1 || otherNode2 === n0 && otherNode1 === n1 || otherNode3 === n0 && otherNode2 === n1 || otherNode0 === n0 && otherNode3 === n1) {
          otherIndex = k;
          numConnections++;
          break;
        }
      }

      tiles[i + t_tile0 + j] = otherIndex;
    }

    tiles[i + t_isEdge] = numConnections === 4 ? 0 : 1;
  }

  config.debug && console.log("TILE GRAPH", tiles);
}

function subdivide(config, faces) {
  var firstPassLen = config.firstPassLen;
  var numNodes = calculateNumNodes(config, faces);
  var nodes = new Float64Array(numNodes * g_size);
  var tiles = new Int32Array((numNodes / 2 | 0) * t_size);
  var pos = 0;
  var tilePos = 0;

  var insertNode = function insertNode(x0, y0, isEdge) {
    x0 |= 0;
    y0 |= 0;

    for (var i = 0; i < pos; i += g_size) {
      if (Math.abs(nodes[i] - x0) < 4 && Math.abs(nodes[i + 1] - y0) < 4) {
        // if we discover an odd face vertex touching the outmost edge, we will
        // not register that because the odd tris are not marked as having an outmost edge, because they don't, they
        // only have one vertices on the edge at most
        // Later we might however return to that node within an outmost edge and we have to make sure that
        // we take over the isEdge status from such a node
        if (isEdge && !nodes[i + 2]) {
          nodes[i + 2] = 1;
        }

        return i;
      }
    }

    var index = pos;
    nodes[pos + g_x] = x0;
    nodes[pos + g_y] = y0;
    nodes[pos + g_isEdge] = isEdge ? 1 : 0;
    nodes[pos + g_count] = 0;
    pos += g_size;
    return index;
  };

  var addTile = function addTile(n0, n1, n2, n3) {
    //console.log("addTile", n0, n1, n2, n3, tilePos)
    tiles[tilePos + t_n0] = n0;
    tiles[tilePos + t_n1] = n1;
    tiles[tilePos + t_n2] = n2;
    tiles[tilePos + t_n3] = n3;
    tilePos += t_size;
  };

  var insertEdge = function insertEdge(n0, n1) {
    var count = nodes[n0 + g_count];
    var found = false;

    for (var i = 0; i < count; i++) {
      var other = nodes[n0 + g_edge0 + i];

      if (other === n1) {
        found = true;
        break;
      }
    }

    if (!found) {
      if (count >= 6) {
        throw new Error("At most 6 edges per node");
      }

      nodes[n0 + g_edge0 + count++] = n1;
      nodes[n0 + g_count] = count;
    }
  };

  var connect = function connect(n0, n1) {
    insertEdge(n0, n1);
    insertEdge(n1, n0);
  };

  for (var i = 0; i < firstPassLen; i += f_size) {
    var count = faces[i + f_count];
    var x0 = faces[i + f_x0];
    var y0 = faces[i + f_y0];
    var x1 = faces[i + f_x1];
    var y1 = faces[i + f_y1];
    var x2 = faces[i + f_x2];
    var y2 = faces[i + f_y2];
    var outmostEdge = faces[i + f_outmostEdge];
    var firstEdgeIsOutmost = outmostEdge === 1;
    var secondEdgeIsOutmost = outmostEdge === 2;

    if (count === 3) {
      var m0x = (x0 + x1) / 2;
      var m0y = (y0 + y1) / 2;
      var m1x = (x1 + x2) / 2;
      var m1y = (y1 + y2) / 2;
      var m2x = (x2 + x0) / 2;
      var m2y = (y2 + y0) / 2;
      var cx = (x0 + x1 + x2) / 3;
      var cy = (y0 + y1 + y2) / 3;
      var n0 = insertNode(x0, y0);
      var n1 = insertNode(m0x, m0y);
      var n2 = insertNode(x1, y1, firstEdgeIsOutmost);
      var n3 = insertNode(m1x, m1y, firstEdgeIsOutmost);
      var n4 = insertNode(x2, y2, firstEdgeIsOutmost);
      var n5 = insertNode(m2x, m2y);
      var n6 = insertNode(cx, cy);
      connect(n0, n1);
      connect(n1, n6);
      connect(n6, n5);
      connect(n5, n0);
      connect(n1, n2);
      connect(n2, n3);
      connect(n3, n6);
      connect(n6, n1);
      connect(n5, n6);
      connect(n6, n3);
      connect(n3, n4);
      connect(n4, n5);
      addTile(n0, n1, n6, n5);
      addTile(n1, n2, n3, n6);
      addTile(n5, n6, n3, n4);
    } else if (count === 4) {
      var x3 = faces[i + f_x3];
      var y3 = faces[i + f_y3];

      var _m0x = (x0 + x1) / 2;

      var _m0y = (y0 + y1) / 2;

      var _m1x = (x1 + x2) / 2;

      var _m1y = (y1 + y2) / 2;

      var _m2x = (x2 + x3) / 2;

      var _m2y = (y2 + y3) / 2;

      var m3x = (x3 + x0) / 2;
      var m3y = (y3 + y0) / 2;

      var _cx = (x0 + x1 + x2 + x3) / 4;

      var _cy = (y0 + y1 + y2 + y3) / 4;

      var _n = insertNode(x0, y0);

      var _n2 = insertNode(_m0x, _m0y);

      var _n3 = insertNode(x1, y1, firstEdgeIsOutmost);

      var _n4 = insertNode(_m1x, _m1y, firstEdgeIsOutmost);

      var _n5 = insertNode(x2, y2, firstEdgeIsOutmost || secondEdgeIsOutmost);

      var _n6 = insertNode(_m2x, _m2y, secondEdgeIsOutmost);

      var _n7 = insertNode(x3, y3, secondEdgeIsOutmost);

      var n7 = insertNode(m3x, m3y);
      var n8 = insertNode(_cx, _cy);
      connect(_n, _n2);
      connect(_n2, _n3);
      connect(_n3, _n4);
      connect(_n4, _n5);
      connect(_n5, _n6);
      connect(_n6, _n7);
      connect(_n7, n7);
      connect(n7, _n);
      connect(n8, _n4);
      connect(n8, _n6);
      connect(n8, n7);
      connect(n8, _n2);
      addTile(_n, _n2, n8, n7);
      addTile(_n2, _n3, _n4, n8);
      addTile(n8, _n4, _n5, _n6);
      addTile(n7, n8, _n6, _n7);
    }
  } //const fillRate = (pos / g_size) / numNodes;
  //console.log("SUBDIVIDED: limit = ", numNodes, ", fill rate = ", fillRate);


  console.log("TILES: buffer = ", tiles.length, ", used = " + tilePos);
  var newTiles = tiles.slice(0, tilePos);
  connectTiles(config, newTiles);
  return [nodes.slice(0, pos), newTiles];
}

function relaxWeighted(config, graph) {
  var maxIterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var length = graph.length;

  for (var i = 0; i < maxIterations; i++) {
    var tension = 0;

    for (var j = 0; j < length; j += g_size) {
      if (!graph[j + g_isEdge]) {
        var x0 = graph[j + g_x];
        var y0 = graph[j + g_y];
        var edgeCount = graph[j + g_count];
        var centerX = 0;
        var centerY = 0;
        var sumWeight = 0;

        for (var k = 0; k < edgeCount; k++) {
          var other = graph[j + 4 + k];
          var _x = graph[other];
          var _y = graph[other + 1];
          var weight = config.weightFunction(x0, y0, _x, _y);
          centerX += _x * weight;
          centerY += _y * weight;
          sumWeight += weight;
        }

        var x1 = centerX / sumWeight;
        var y1 = centerY / sumWeight;
        var dx = x1 - x0;
        var dy = y1 - y0;
        graph[j + g_x] = x1;
        graph[j + g_y] = y1;
        tension += dx * dx + dy * dy;
      }
    }

    if (tension < config.minTension) {
      config.debug && console.log("Reached minimal tension", config.minTension, "after", config.relaxCount, "iterations");
      return true;
    }

    config.relaxCount++;
  }

  if (!config.animatedEasing) {
    config.debug && console.log("Stopping after max iterations = " + config.maxIterations);
  }

  return false;
}
/**
 * A hexagon filled with quads forming organic shapes.
 */


var OrganicQuads = function OrganicQuads(cfg) {
  var _this = this;

  _classCallCheck(this, OrganicQuads);

  this.render = function (ctx) {
    var config = _this.config,
        graph = _this.graph,
        faces = _this.faces;
    ctx.save();
    var hw = config.width / 2;
    var hh = config.height / 2;
    ctx.translate(hw, hh);
    var length = graph.length;
    ctx.fillStyle = "#000";
    ctx.fillRect(-hw, -hh, config.width, config.height);

    if (config.renderFirstPassEdges) {
      // draw original quads and tris
      ctx.strokeStyle = "#f00";
      ctx.lineWidth = 1;
      var outerCount = 0;

      for (var pos = 0; pos < config.firstPassLen; pos += f_size) {
        var count = faces[pos + f_count];

        if (count >= 3) {
          ctx.beginPath();
          ctx.moveTo(faces[pos + f_x0], faces[pos + f_y0]);

          for (var i = 1; i < count; i++) {
            ctx.lineTo(faces[pos + i * 2], faces[pos + i * 2 + 1]);
          }

          ctx.closePath();
          ctx.stroke();
          var outmostEdge = faces[pos + f_outmostEdge];

          if (outmostEdge >= 0) {
            ctx.strokeStyle = "#fe0";
            ctx.beginPath();
            ctx.moveTo(faces[pos + outmostEdge * 2], faces[pos + outmostEdge * 2 + 1]);

            if (outmostEdge === count - 1) {
              ctx.lineTo(faces[pos + f_x0], faces[pos + f_y0]);
            } else {
              ctx.lineTo(faces[pos + (outmostEdge + 1) * 2], faces[pos + (outmostEdge + 1) * 2 + 1]);
            }

            ctx.stroke();
            ctx.strokeStyle = "#f00";
            outerCount++;
          }
        }
      } //    console.log("Number of outer edges", outerCount)
      //console.log("DRAW EDGES")

    } // ctx.strokeStyle = "#fff";
    // ctx.lineWidth = 1;
    //
    //
    // function drawEdge(x0, y0, node)
    // {
    //     const x1 = graph[node + g_x];
    //     const y1 = graph[node + g_y];
    //
    //     ctx.beginPath();
    //     ctx.moveTo(x0, y0);
    //     ctx.lineTo(x1, y1);
    //     ctx.stroke();
    // }
    //
    //
    // for (let i = 0; i < length; i += g_size)
    // {
    //     const x0 = graph[i + g_x];
    //     const y0 = graph[i + g_y];
    //     const edgeCount = graph[i + g_count];
    //
    //     for (let j = 0; j < edgeCount; j++)
    //     {
    //         drawEdge(x0, y0, graph[i + g_edge0 + j])
    //     }
    // }
    //ctx.fillStyle = "#f0f";
    //
    // for (let i = 0; i < length; i += g_size)
    // {
    //     const x0 = graph[i + g_x];
    //     const y0 = graph[i + g_y];
    //     const isEdge = graph[i + g_isEdge];
    //
    //     if (isEdge)
    //     {
    //         ctx.fillRect(x0 - 4,  y0 - 4, 8, 8)
    //     }
    // }
    // ctx.strokeStyle = "#f00";
    // ctx.lineWidth = 4;
    //
    // for (let pos = 0; pos < config.firstPassLen; pos += f_size)
    // {
    //     const count = faces[pos + f_count];
    //     const outmostEdge = faces[pos + f_outmostEdge];
    //
    //
    //     const last = count - 1;
    //     for (let i=0; i < count; i++)
    //     {
    //         if (i === outmostEdge)
    //         {
    //             ctx.strokeStyle = "rgba(255,0,0,0.5)";
    //         }
    //         else
    //         {
    //             ctx.strokeStyle = "rgba(0,255,0,0.5)";
    //         }
    //
    //         ctx.beginPath();
    //         ctx.moveTo(faces[pos + i * 2], faces[pos + i * 2 + 1]);
    //         ctx.lineTo(
    //             i === last ? faces[pos + f_x0 ] : faces[pos + (i+1) * 2],
    //             i === last ? faces[pos + f_y0 ] : faces[pos + (i+1) * 2 + 1]
    //         );
    //         ctx.stroke();
    //     }
    // }


    ctx.restore();

    if (config.animating) {
      if (relaxWeighted(config, graph)) {
        config.animating = false;
      } //            raf(redrawGraph)

    }
  };

  var _config = _objectSpread(_objectSpread({}, DEFAULT_CONFIG), cfg);

  updateConfig(_config);
  this.config = _config;

  var _faces = createHexagonTriangles(_config);

  if (_config.renderFirstPassEdges) {
    this.faces = _config.renderFirstPassEdges !== "merged" ? _faces.slice() : _faces;
  }

  var start = _config.debug && (0, _performanceNow.default)();
  removeRandomEdges(_config, _faces);
  _config.debug && console.log("Edge removal in ", (0, _performanceNow.default)() - start, "ms");

  var _subdivide = subdivide(_config, _faces),
      _subdivide2 = _slicedToArray(_subdivide, 2),
      _graph = _subdivide2[0],
      tiles = _subdivide2[1];

  this.tiles = tiles;

  if (!_config.animating) {
    relaxWeighted(_config, _graph, _config.maxIterations);
  } //console.log("GRAPH f_size", graph.length / g_size, graph);


  this.graph = _graph;
};

var _default = OrganicQuads;
exports.default = _default;

/***/ }),

/***/ "../organic-quads/lib/vector.js":
/*!**************************************!*\
  !*** ../organic-quads/lib/vector.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var sqrt = Math.sqrt;

var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }
  /**
   * Returns a copy of this vector.
   *
   * @returns {Vector} copy
   */


  _createClass(Vector, [{
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y);
    }
    /**
     * Adds to this vector
     *
     * @param x     {number|Vector} x coordinate or a vector
     * @param y     {number?} y coordinate, ignored if x is a vector
     * @returns {Vector} this vector
     */

  }, {
    key: "add",
    value: function add(x, y) {
      if (typeof x === "number") {
        this.x += x;
        this.y += y;
      } else {
        this.x += x.x;
        this.y += x.y;
      }

      return this;
    }
    /**
     * Subtracts from this vector
     *
     * @param x     {number|Vector} x coordinate or a vector
     * @param y     {number?} y coordinate, ignored if x is a vector
     * @returns {Vector} this vector
     */

  }, {
    key: "subtract",
    value: function subtract(x, y) {
      if (typeof x === "number") {
        this.x -= x;
        this.y -= y;
      } else {
        this.x -= x.x;
        this.y -= x.y;
      }

      return this;
    }
    /**
     * Scales the vector by a planar number.
     *
     * @param n     scale
     * @returns {Vector} this vector, scaled
     */

  }, {
    key: "scale",
    value: function scale(n) {
      this.x *= n;
      this.y *= n;
      return this;
    }
    /**
     * Length of this vector
     *
     * @returns {number}    length
     */

  }, {
    key: "length",
    value: function length() {
      var x = this.x,
          y = this.y;
      return sqrt(x * x + y * y);
    }
    /**
     * Scales the vector to normal length or a specified length
     *
     * @param targetLength      {number?} target length of the vector (default is 1, the normal vector length)
     *
     * @returns {Vector}
     */

  }, {
    key: "norm",
    value: function norm() {
      var targetLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.scale(targetLength / this.length());
    }
    /**
     * Rotate vector 90 degrees clockwise.
     *
     * @returns {Vector}
     */

  }, {
    key: "rotateClockwise",
    value: function rotateClockwise() {
      var x = this.x,
          y = this.y; //noinspection JSSuspiciousNameCombination

      this.x = y;
      this.y = -x;
      return this;
    }
    /**
     * Rotate vector 90 degrees counter clockwise.
     *
     * @returns {Vector}
     */

  }, {
    key: "rotateCounterClockwise",
    value: function rotateCounterClockwise() {
      var x = this.x,
          y = this.y;
      this.x = -y; //noinspection JSSuspiciousNameCombination

      this.y = x;
      return this;
    }
    /**
     * Sets the coordinates of this vector
     *
     * @param x     {number|Vector} x coordinate or a vector
     * @param y     {number?} y coordinate, ignored if x is a vector
     * @returns {Vector} this vector
     */

  }, {
    key: "set",
    value: function set(x, y) {
      if (typeof x === "number") {
        this.x = x;
        this.y = y;
      } else {
        this.x = x.x;
        this.y = x.y;
      }
    }
  }]);

  return Vector;
}();

var _default = Vector;
exports.default = _default;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raf */ "./node_modules/raf/index.js");
/* harmony import */ var raf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(raf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/simplex-noise.js");
/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(simplex_noise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fforw/organic-quads */ "../organic-quads/lib/index.js");
/* harmony import */ var _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _loadScene__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loadScene */ "./src/loadScene.js");
/* harmony import */ var three_examples_jsm_objects_Water_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/objects/Water.js */ "./node_modules/three/examples/jsm/objects/Water.js");
/* harmony import */ var three_examples_jsm_objects_Sky_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/objects/Sky.js */ "./node_modules/three/examples/jsm/objects/Sky.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _loadTexture__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./loadTexture */ "./src/loadTexture.js");
var _GROUND_COLORS;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // noinspection ES6UnusedImports









var EFFECTS = false;
var MAX_HEIGHT = 300;
var QUARTER_HEIGHT = MAX_HEIGHT / 4;
var NOISE_SCALE = 0.003;
var CLIFF_THRESHOLD = 16;
var RANDOM_FACTOR = 0.2; // size of the outer square around our big hexagon

var SIZE = 1000; // distance from the center at which the ground becomes flat

var FLAT_DISTANCE = 300; //////////////////////////////////////////////////////////////////////

var DISTANCE_TO_ANGLE_FACTOR = Math.PI / 2 / FLAT_DISTANCE;
var WATER = 0;
var SAND = 1;
var GRASS = 2;
var DIRT = 3;
var FOREST = 4;
var STONE = 5;
var GROUND_COLORS = (_GROUND_COLORS = {}, _defineProperty(_GROUND_COLORS, WATER, [0, 0.4, 0.8]), _defineProperty(_GROUND_COLORS, SAND, [0.8, 0.8, 0]), _defineProperty(_GROUND_COLORS, GRASS, [0, 0.5, 0]), _defineProperty(_GROUND_COLORS, DIRT, [0.5, 0.3, 0.1]), _defineProperty(_GROUND_COLORS, FOREST, [0.2, 0.4, 0.3]), _defineProperty(_GROUND_COLORS, STONE, [0.5, 0.5, 0.5]), _GROUND_COLORS);
var container, stats;
var camera, scene, renderer, light;
var controls, water, sphere;
var td_cx = 0;
var td_cy = 1;
var td_cut0 = 2;
var td_cut1 = 3;
var td_cut2 = 4;
var td_cut3 = 5;
var td_size = 6;
var tileData;
var heightMap;

function updateCentroids() {
  var _organicQuads = organicQuads,
      graph = _organicQuads.graph,
      tiles = _organicQuads.tiles;
  var length = tiles.length;
  var tileDataPos = 0;

  for (var i = 0; i < length; i += _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]) {
    var n0 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n0"]];
    var n1 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n1"]];
    var n2 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n2"]];
    var n3 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n3"]];
    tileData[tileDataPos + td_cx] = (graph[n0 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]] + graph[n1 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]] + graph[n2 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]] + graph[n3 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]]) / 4;
    tileData[tileDataPos + td_cy] = (graph[n0 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]] + graph[n1 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]] + graph[n2 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]] + graph[n3 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]]) / 4;
    tileData[tileDataPos + td_cut0] = -1;
    tileData[tileDataPos + td_cut1] = -1;
    tileData[tileDataPos + td_cut2] = -1;
    tileData[tileDataPos + td_cut3] = -1;
    tileDataPos += td_size;
  }
}

var organicQuads, envMap;

function heightFn(x0, z0) {
  var distance = Math.sqrt(x0 * x0 + z0 * z0);
  var heightLimit = distance < FLAT_DISTANCE ? Math.cos(distance * DISTANCE_TO_ANGLE_FACTOR) : 0;
  return (QUARTER_HEIGHT + (noise.noise2D(x0 * NOISE_SCALE, z0 * NOISE_SCALE) - Math.random() * RANDOM_FACTOR) * QUARTER_HEIGHT) * heightLimit;
}

var tmpHeight = new Float64Array(5);

function cutCliffs() {
  var _organicQuads2 = organicQuads,
      graph = _organicQuads2.graph,
      tiles = _organicQuads2.tiles;
  var length = tiles.length;
  var map = {};

  var insert = function insert(a, b) {
    if (a > b) {
      var h = a;
      a = b;
      b = h;
    }

    var key = a + ":" + b;
    var v = map[key];
    map[key] = v === undefined ? 1 : v + 1;
  };

  var heightIndexFactor = h_size / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_size"];
  var tileDataFactor = td_size / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"];

  for (var i = 0; i < length; i += _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]) {
    // find indizes for connected centroid (values might be -1 if on the edge
    var tileDataIndex = i * tileDataFactor;
    var tileDataIndex0 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile0"]] * tileDataFactor;
    var tileDataIndex1 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile1"]] * tileDataFactor;
    var tileDataIndex2 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile2"]] * tileDataFactor;
    var tileDataIndex3 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile3"]] * tileDataFactor;
    tmpHeight[0] = heightFn(tileData[tileDataIndex], tileData[tileDataIndex + 1]);
    tmpHeight[1] = tileDataIndex0 >= 0 ? heightFn(tileData[tileDataIndex0 + td_cx], tileData[tileDataIndex0 + td_cy]) : -1;
    tmpHeight[2] = tileDataIndex1 >= 0 ? heightFn(tileData[tileDataIndex1 + td_cx], tileData[tileDataIndex1 + td_cy]) : -1;
    tmpHeight[3] = tileDataIndex2 >= 0 ? heightFn(tileData[tileDataIndex2 + td_cx], tileData[tileDataIndex2 + td_cy]) : -1;
    tmpHeight[4] = tileDataIndex3 >= 0 ? heightFn(tileData[tileDataIndex3 + td_cx], tileData[tileDataIndex3 + td_cy]) : -1; //console.log("HEIGHTS", tmpHeight.slice())
    // 4 bits for the 4 vertices involved in the quad. We always set two consecutive bits to cut all vertices
    // involved in an edge where one of the vertices is cut. last bit wraps around to the first

    var cutMask = 0;

    if (tileDataIndex0 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[1]) > CLIFF_THRESHOLD) {
      cutMask |= 3;
    }

    if (tileDataIndex1 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[2]) > CLIFF_THRESHOLD) {
      cutMask |= 6;
    }

    if (tileDataIndex2 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[3]) > CLIFF_THRESHOLD) {
      cutMask |= 12;
    }

    if (tileDataIndex3 >= 0 && Math.abs(tmpHeight[0] - tmpHeight[4]) > CLIFF_THRESHOLD) {
      cutMask |= 9;
    }

    if (cutMask !== 0) {
      var height = tmpHeight[0]; // if all edges are cut, keep using the centroid heightmap value,
      // otherwise recalculate the height as average of the uncut points

      if (cutMask !== 15) {
        height = 0;
        var count = 0;

        for (var j = 0; j < 4; j++) {
          if ((cutMask & 1 << j) === 0) {
            var heightMapIndex = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n0"] + j] * heightIndexFactor;
            height += heightMap[heightMapIndex + h_height];
            count++;
          }
        }

        height /= count;
      }

      for (var _j = 0; _j < 4; _j++) {
        if (cutMask & 1 << _j) {
          var _heightMapIndex = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n0"] + _j] * heightIndexFactor; //console.log("Cutting connection from", i / t_size , " to #" +tiles[i + t_tile0 + j] / t_size, ", new height = ", height )
          //console.log({tmpHeight, cutMask})


          insert(i / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"], tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile0"] + _j] / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]);
          tileData[tileDataIndex + td_cut0 + _j] = height;
          heightMap[_heightMapIndex + h_ground] = STONE;
          var other = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile0"] + _j]; // cut our connection to the other tile

          tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile0"] + _j] = -1; // // and remove us from the other tile
          // for (let k = 0 ; k < 4; k++)
          // {
          //     if (tiles[other + t_tile0 + k] === i)
          //     {
          //         tiles[other + t_tile0 + k] = -1;
          //     }
          // }
        }
      }
    }
  }

  console.log("CUT STATS", JSON.stringify(map, null, 4));
}

var h_height = 0;
var h_ground = 1;
var h_size = 3;

function findEdgeIndex() {
  var _organicQuads3 = organicQuads,
      tiles = _organicQuads3.tiles;
  var length = tiles.length;

  for (var i = 0; i < length; i += _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]) {
    if (tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_isEdge"]]) {
      return i;
    }
  }

  throw new Error("No edge!?");
}

var heightIndexFactor = h_size / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_size"];

function walkRecursive(tileIndex, visited) {
  if (tileIndex >= 0 && !visited.has(tileIndex)) {
    visited.add(tileIndex);
    var _organicQuads4 = organicQuads,
        tiles = _organicQuads4.tiles;
    var tile0 = tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile0"]];
    var tile1 = tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile1"]];
    var tile2 = tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile2"]];
    var tile3 = tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_tile3"]];

    for (var i = 0; i < 4; i++) {
      var heightMapIndex = tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n0"] + i] * heightIndexFactor;
      var ground = heightMap[heightMapIndex + h_ground];

      if (ground !== STONE && !tiles[tileIndex + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_isEdge"]]) {
        heightMap[heightMapIndex + h_ground] = GRASS;
      }
    }

    walkRecursive(tile0, visited);
    walkRecursive(tile1, visited);
    walkRecursive(tile2, visited);
    walkRecursive(tile3, visited);
  }
}

function testWalkability() {
  var tileIndex = findEdgeIndex();
  console.log("Starting to walk at #", tileIndex / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]);
  var visited = new Set();
  walkRecursive(tileIndex, visited);
}

function createScene() {
  organicQuads = new _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5___default.a({
    numberOfRings: 6,
    width: SIZE,
    height: SIZE,
    graphUserData: 1 // weightFunction: (x0,y0,x1,y1) => {
    //
    //     const dx = x1 - x0;
    //     const dy = y1 - y0;
    //     const dz = heightFn(x0,y0) - heightFn(x1,y1);
    //
    //     return Math.sqrt(dx * dx + dy * dy + dz * dz);
    //
    // }

  });
  var _organicQuads5 = organicQuads,
      graph = _organicQuads5.graph,
      tiles = _organicQuads5.tiles,
      config = _organicQuads5.config;
  var length = graph.length;
  heightMap = new Float64Array(length / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_size"] * h_size);
  var pos = 0;

  for (var i = 0; i < length; i += _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_size"]) {
    heightMap[pos + h_height] = heightFn(graph[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]], graph[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]]);
    heightMap[pos + h_ground] = SAND;
    pos += h_size;
  }

  tileData = new Float64Array(organicQuads.tiles.length / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"] * td_size);
  updateCentroids();
  cutCliffs();
  testWalkability();
}

var noise = new simplex_noise__WEBPACK_IMPORTED_MODULE_2___default.a();

function checkNaN(value, msg) {
  if (isNaN(value)) {
    debugger;
    throw new Error(msg + ": value is NaN");
  }
}

function addHeightMap() {
  var geometry = new three__WEBPACK_IMPORTED_MODULE_4__["BufferGeometry"]();
  geometry.name = "Landscape-Debug";
  var vertices = [];
  var normals = [];
  var colors = [];
  var size = 20;
  var segments = 10;
  var halfSize = size / 2;
  var segmentSize = size / segments; // generate vertices, normals and color data for a simple grid geometry

  var _organicQuads6 = organicQuads,
      graph = _organicQuads6.graph,
      tiles = _organicQuads6.tiles,
      config = _organicQuads6.config;
  var length = tiles.length;
  console.log("Height map for ", length / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"], " tiles");
  var heightIndexFactor = h_size / _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_size"];
  var UNDEFINED_COLOR = [1, 0, 1]; // const map = {};
  //
  // const insert = (a,b) => {
  //     if (a > b)
  //     {
  //         let h = a;
  //         a=b;
  //         b=h;
  //     }
  //
  //     const key = a + ":" + b;
  //
  //     const v = map[key];
  //     map[key] =  v === undefined ? 1 : v + 1;
  // }

  var getColor = function getColor(hIdx) {
    return GROUND_COLORS[heightMap[hIdx + h_ground]] || UNDEFINED_COLOR;
  };

  var tileDataIndex = 0;

  for (var i = 0; i < length; i += _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_size"]) {
    // node indizes for our quad
    var n0 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n0"]];
    var n1 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n1"]];
    var n2 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n2"]];
    var n3 = tiles[i + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["t_n3"]]; // const e0 = tiles[i + t_tile0]
    // const e1 = tiles[i + t_tile1]
    // const e2 = tiles[i + t_tile2]
    // const e3 = tiles[i + t_tile3]
    // e0 >= 0 && insert(i * tileFactor, e0 * tileFactor)
    // e1 >= 0 && insert(i * tileFactor, e1 * tileFactor)
    // e2 >= 0 && insert(i * tileFactor, e2 * tileFactor)
    // e3 >= 0 && insert(i * tileFactor, e3 * tileFactor)
    // equivalent height map indizes

    var heightIndex0 = n0 * heightIndexFactor;
    var heightIndex1 = n1 * heightIndexFactor;
    var heightIndex2 = n2 * heightIndexFactor;
    var heightIndex3 = n3 * heightIndexFactor;
    var x0 = graph[n0 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]];
    var y0 = tileData[tileDataIndex + td_cut0] === -1 ? heightMap[heightIndex0 + h_height] : tileData[tileDataIndex + td_cut0]; //const y0 = heightMap[heightIndex0 + h_height];

    var z0 = graph[n0 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]];
    var x1 = graph[n1 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]];
    var y1 = tileData[tileDataIndex + td_cut1] === -1 ? heightMap[heightIndex1 + h_height] : tileData[tileDataIndex + td_cut1]; //const y1 = heightMap[heightIndex1 + h_height];

    var z1 = graph[n1 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]];
    var x2 = graph[n2 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]];
    var y2 = tileData[tileDataIndex + td_cut2] === -1 ? heightMap[heightIndex2 + h_height] : tileData[tileDataIndex + td_cut2]; //const y2 = heightMap[heightIndex2 + h_height]

    var z2 = graph[n2 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]];
    var x3 = graph[n3 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_x"]];
    var y3 = tileData[tileDataIndex + td_cut3] === -1 ? heightMap[heightIndex3 + h_height] : tileData[tileDataIndex + td_cut3]; //const y3 = heightMap[heightIndex3 + h_height];

    var z3 = graph[n3 + _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5__["g_y"]];
    var ax = x0 - x1;
    var ay = y0 - y1;
    var az = z0 - z1;
    var bx = x2 - x1;
    var by = y2 - y1;
    var bz = z2 - z1;
    var cx = x3 - x1;
    var cy = y3 - y1;
    var cz = z3 - z1; // normal vector based on points 0, 1 and 2

    var n0x = ay * bz - az * by;
    var n0y = az * bx - ax * bz;
    var n0z = ax * by - ay * bx; // normal vector based on points 0, 1 and 3

    var n1x = ay * cz - az * cy;
    var n1y = az * cx - ax * cz;
    var n1z = ax * cy - ay * cx; // average and renormalize

    var nx = (n0x + n1x) / 2;
    var ny = (n0y + n1y) / 2;
    var nz = (n0z + n1z) / 2;
    var f = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
    nx *= f;
    ny *= f;
    nz *= f;
    vertices.push(x0, y0, z0);
    vertices.push(x3, y3, z3);
    vertices.push(x1, y1, z1);
    vertices.push(x1, y1, z1);
    vertices.push(x3, y3, z3);
    vertices.push(x2, y2, z2);
    normals.push(nx, ny, nz);
    normals.push(nx, ny, nz);
    normals.push(nx, ny, nz);
    normals.push(nx, ny, nz);
    normals.push(nx, ny, nz);
    normals.push(nx, ny, nz); // const cf = 4 / MAX_HEIGHT;
    //
    // colors.push( y3 * cf,1 - y3 * cf, 0);
    // colors.push( y1 * cf,1 - y1 * cf, 0);
    // colors.push( y1 * cf,1 - y1 * cf, 0);
    // colors.push( y3 * cf,1 - y3 * cf, 0);
    // colors.push( y2 * cf,1 - y2 * cf, 0);

    var col0 = getColor(heightIndex0);
    var col1 = getColor(heightIndex1);
    var col2 = getColor(heightIndex2);
    var col3 = getColor(heightIndex3);
    colors.push(col0[0], col0[1], col0[2]);
    colors.push(col3[0], col3[1], col3[2]);
    colors.push(col1[0], col1[1], col1[2]);
    colors.push(col1[0], col1[1], col1[2]);
    colors.push(col3[0], col3[1], col3[2]);
    colors.push(col2[0], col2[1], col2[2]);
    tileDataIndex += td_size;
  } //const values = Object.values(map);
  //console.log("SYMMETRY-CHECK", map, values.filter(n => n === 1).length, "of", values.length);
  //console.log("MAX DELTA", max);
  //


  console.log({
    vertices: vertices,
    normals: normals,
    colors: colors
  });
  geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__["Float32BufferAttribute"](vertices, 3));
  geometry.setAttribute('normal', new three__WEBPACK_IMPORTED_MODULE_4__["Float32BufferAttribute"](normals, 3));
  geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_4__["Float32BufferAttribute"](colors, 3));
  var material = new three__WEBPACK_IMPORTED_MODULE_4__["MeshStandardMaterial"]({
    vertexColors: true,
    side: three__WEBPACK_IMPORTED_MODULE_4__["FrontSide"],
    roughness: 0.5
  }); // material.onBeforeCompile = shader => {
  //
  //     const {vertexShader,fragmentShader,uniforms} = shader;
  //
  //     console.log("--- VERT:\n", vertexShader);
  //     console.log("--- FRAG:\n", fragmentShader);
  //     console.log({uniforms})
  // };

  var mesh = new three__WEBPACK_IMPORTED_MODULE_4__["Mesh"](geometry, material);
  mesh.position.set(0, 0.1, 0); // var wireframe = new WireframeGeometry( geometry );
  //
  // var line = new LineSegments( wireframe );
  // line.material.depthTest = false;
  // line.material.opacity = 0.25;
  // line.material.transparent = true;
  //
  //
  // scene.add( line );

  scene.add(mesh);
}

function init() {
  createScene();
  container = document.getElementById("container"); //

  renderer = new three__WEBPACK_IMPORTED_MODULE_4__["WebGLRenderer"]();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement); //

  scene = new three__WEBPACK_IMPORTED_MODULE_4__["Scene"]();
  camera = new three__WEBPACK_IMPORTED_MODULE_4__["PerspectiveCamera"](55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(250, 250, 1000); //

  light = new three__WEBPACK_IMPORTED_MODULE_4__["DirectionalLight"]("#fff8d5", 0.8);
  scene.add(light);
  var cubeCamera = new three__WEBPACK_IMPORTED_MODULE_4__["CubeCamera"](0.2, 1, 512);
  cubeCamera.renderTarget.texture.generateMipmaps = true;
  cubeCamera.renderTarget.texture.minFilter = three__WEBPACK_IMPORTED_MODULE_4__["LinearMipmapLinearFilter"];
  scene.background = cubeCamera.renderTarget; // Water

  var waterGeometry = new three__WEBPACK_IMPORTED_MODULE_4__["PlaneBufferGeometry"](10000, 10000);

  if (EFFECTS) {
    water = new three_examples_jsm_objects_Water_js__WEBPACK_IMPORTED_MODULE_7__["Water"](waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 0.6,
      sunDirection: light.position.clone().normalize(),
      sunColor: "#fff8d5",
      waterColor: "#000e1e",
      distortionScale: 2.5,
      fog: true
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);
  } else {
    var material = new three__WEBPACK_IMPORTED_MODULE_4__["MeshStandardMaterial"]({
      side: three__WEBPACK_IMPORTED_MODULE_4__["FrontSide"],
      color: "#048",
      envMap: cubeCamera.renderTarget.texture,
      roughness: 0.0
    });
    var mesh = new three__WEBPACK_IMPORTED_MODULE_4__["Mesh"](waterGeometry, material);
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
  }

  var parameters = {
    distance: 1000,
    inclination: 0.05,
    azimuth: 0.25
  }; // Skybox

  var sky;

  if (EFFECTS) {
    sky = new three_examples_jsm_objects_Sky_js__WEBPACK_IMPORTED_MODULE_8__["Sky"]();
    var uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = 5;
    uniforms["rayleigh"].value = 1.5;
    uniforms["luminance"].value = 1;
    uniforms["mieCoefficient"].value = 0.05;
    uniforms["mieDirectionalG"].value = 0.9;
    envMap = cubeCamera.renderTarget.texture;
    updateSun();
  } else {
    envMap = null;
  }

  function updateSun() {
    var theta = Math.PI * (parameters.inclination - 0.5);
    var phi = 2 * Math.PI * (parameters.azimuth - 0.5);
    light.position.x = parameters.distance * Math.cos(phi);
    light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
    light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);
    sky.material.uniforms["sunPosition"].value = light.position.copy(light.position);
    water && water.material.uniforms["sunDirection"].value.copy(light.position).normalize();
    cubeCamera.update(renderer, sky);
  }

  controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_9__["OrbitControls"](camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.45;
  controls.target.set(0, 0, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 1000.0;
  controls.enableDamping = true;
  controls.dampingFactor = 0.02;
  controls.update(); // stats = new Stats();
  // container.appendChild( stats.dom );
  // GUI
  //const gui = new GUI();
  // const folder = gui.addFolder( "Sky" );
  // folder.add( parameters, "inclination", 0, 0.5, 0.0001 ).onChange( updateSun );
  // folder.add( parameters, "azimuth", 0, 1, 0.0001 ).onChange( updateSun );
  // folder.open();
  //
  // const uniforms = water.material.uniforms;
  //
  // const folder = gui.addFolder( "Water" );
  // folder.add( uniforms.distortionScale, "value", 0, 8, 0.1 ).name( "distortionScale" );
  // folder.add( uniforms.size, "value", 0.1, 10, 0.1 ).name( "size" );
  // folder.add( uniforms.alpha, "value", 0.9, 1, .001 ).name( "alpha" );
  // folder.open();

  window.addEventListener("resize", onWindowResize, false); ////////////////

  addHeightMap();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function mainLoop() {
  render(); //stats.update();

  controls.update();
  raf__WEBPACK_IMPORTED_MODULE_1___default()(mainLoop);
}

function render() {
  var time = performance.now() * 0.001; // sphere.position.y = Math.sin( time ) * 5 + 1;
  // sphere.rotation.x = time * 0.5;
  // sphere.rotation.z = time * 0.51;

  if (water) {
    water.material.uniforms["time"].value += 1.0 / 60.0;
  }

  renderer.render(scene, camera);
}

var waterNormals;

function extractMarchingSquares(scene) {
  var children = scene.children;
  var map = new Map();

  for (var i = 0; i < children.length; i++) {
    var kid = children[i];

    if (kid.name.indexOf("case-") === 0) {
      map.set(kid.name, kid);
    }
  }

  return map;
}

Promise.all([0, //        loadScene("assets/tiles.glb"),
0, //        loadScene("assets/ground.glb"),
Object(_loadScene__WEBPACK_IMPORTED_MODULE_6__["default"])("assets/ms.glb"), Object(_loadScene__WEBPACK_IMPORTED_MODULE_6__["default"])("assets/ms-raised.glb"), Object(_loadTexture__WEBPACK_IMPORTED_MODULE_10__["default"])("assets/waternormals.jpg")]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 5),
      tiles = _ref2[0],
      ground = _ref2[1],
      marchingSquares = _ref2[2],
      marchingSquaresRaised = _ref2[3],
      tWaterNormals = _ref2[4];

  //scene.add( tiles.scene );
  function dump(obj) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var type = obj.type;

    if (type === "Group") {
      console.log(level + "GROUP", obj.name);
      var nextLevel = level + "    ";
      var children = obj.children;

      for (var i = 0; i < children.length; i++) {
        dump(children[i], nextLevel);
      }
    } else if (type === "Mesh") {
      console.log(level + "MESH", obj.name);
    }
  }

  console.log({
    ground: ground
  }); // const msMap = extractMarchingSquares(marchingSquares.scene);
  // const msMapRaised = extractMarchingSquares(marchingSquaresRaised.scene);
  //
  // console.log({msMap, msMapRaised})
  // dump(marchingSquares.scene, "ms-normal: ");
  // dump(marchingSquaresRaised.scene, "ms-raised: ");

  console.log("GLTF", tiles); // console.log("Scene Objects", tiles.scene.children.map(kid => kid.name).join(", "))
  //
  // const obj  = tiles.scene.children.find(
  //     kid => kid.name === "tree_default"
  // );

  tWaterNormals.wrapS = tWaterNormals.wrapT = three__WEBPACK_IMPORTED_MODULE_4__["RepeatWrapping"];
  waterNormals = tWaterNormals; // tiles.animations; // Array<AnimationClip>
  // tiles.scene; // Group
  // tiles.scenes; // Array<Group>
  // tiles.cameras; // Array<Camera>
  // tiles.asset; // Object
  // ReactDOM.render(
  //     <Game/>,
  //     document.getElementById("root")
  // )

  init();
  mainLoop();
});

/***/ }),

/***/ "./src/loadScene.js":
/*!**************************!*\
  !*** ./src/loadScene.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
// Instantiate a loader

var loader = new three_examples_jsm_loaders_GLTFLoader__WEBPACK_IMPORTED_MODULE_0__["GLTFLoader"]();
/* harmony default export */ __webpack_exports__["default"] = (function (url) {
  var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new Promise(function (resolve, reject) {
    // Load a glTF resource
    loader.load( // resource URL
    url, // called when the resource is loaded
    resolve, // called while loading is progressing
    onProgress, // called when loading has errors
    reject);
  });
});

/***/ }),

/***/ "./src/loadTexture.js":
/*!****************************!*\
  !*** ./src/loadTexture.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
// Instantiate a loader

var loader = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]();
/* harmony default export */ __webpack_exports__["default"] = (function (url) {
  var onProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return new Promise(function (resolve, reject) {
    // Load a glTF resource
    loader.load( // resource URL
    url, // called when the resource is loaded
    resolve, // called while loading is progressing
    onProgress, // called when loading has errors
    reject);
  });
});

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=bundle-main-ff73e4ae4c5487ca0951.js.map