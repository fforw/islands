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
exports.default = void 0;

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
var f_y0 = 1;
var f_x1 = 2;
var f_y1 = 3;
var f_x2 = 4;
var f_y2 = 5;
var f_x3 = 6;
var f_y3 = 7;
var f_count = 8;
var f_outmostEdge = 9;
var f_size = 10;
var g_x = 0;
var g_y = 1;
var g_isEdge = 2;
var g_count = 3;
var g_edge0 = 4;
var g_edge1 = 5;
var g_edge2 = 6;
var g_edge3 = 7;
var g_edge4 = 8;
var g_edge5 = 9;
var g_size = 10;
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
  addQuads: false,
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

var QUAD_SIZE = 4;

function subdivide(config, faces) {
  var firstPassLen = config.firstPassLen,
      addQuads = config.addQuads;
  var numNodes = calculateNumNodes(config, faces);
  var nodes = new Float64Array(numNodes * g_size);
  var quads = addQuads && new Int32Array(numNodes * QUAD_SIZE);
  var pos = 0;
  var qPos = 0;

  var insertNode = function insertNode(x0, y0, isEdge) {
    x0 |= 0;
    y0 |= 0;

    for (var i = 0; i < pos; i += g_size) {
      if (Math.abs(nodes[i] - x0) < 2 && Math.abs(nodes[i + 1] - y0) < 2) {
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

  var addQuad = addQuads && function (n0, n1, n2, n3) {
    quads[qPos++] = n0;
    quads[qPos++] = n1;
    quads[qPos++] = n2;
    quads[qPos++] = n3;
  };

  var insertEdge = function insertEdge(n0, n1) {
    var count = nodes[n0 + 3];
    var found = false;

    for (var i = 0; i < count; i++) {
      var other = nodes[n0 + 4 + i];

      if (other === n1) {
        found = true;
        break;
      }
    }

    if (!found) {
      if (count >= 10) {
        throw new Error("At most 10 edges per node");
      }

      nodes[n0 + 4 + count++] = n1;
      nodes[n0 + 3] = count;
    }
  };

  var connect = function connect(n0, n1) {
    insertEdge(n0, n1);
    insertEdge(n1, n0);
  };

  for (var i = 0; i < firstPassLen; i += f_size) {
    var count = faces[i + f_count];

    if (count === 0) {
      continue;
    }

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

      if (addQuads) {
        addQuad(n0, n1, n6, n5);
        addQuad(n1, n2, n3, n6);
        addQuad(n5, n6, n3, n4);
      }
    } else {
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

      if (addQuads) {
        addQuad(_n, _n2, n8, n7);
        addQuad(_n2, _n3, _n4, n8);
        addQuad(n8, _n4, _n5, _n6);
        addQuad(n7, n8, _n6, _n7);
      }
    }
  } //const fillRate = (pos / g_size) / numNodes;
  //console.log("SUBDIVIDED: limit = ", numNodes, ", fill rate = ", fillRate);


  return [nodes.slice(0, pos), quads && quads.slice(0, qPos)];
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


var OrganicQuads = /*#__PURE__*/function () {
  function OrganicQuads(cfg) {
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

      }

      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;

      function drawEdge(x0, y0, node) {
        var x1 = graph[node + g_x];
        var y1 = graph[node + g_y];
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      for (var _i2 = 0; _i2 < length; _i2 += g_size) {
        var x0 = graph[_i2 + g_x];
        var y0 = graph[_i2 + g_y];
        var edgeCount = graph[_i2 + g_count];

        for (var j = 0; j < edgeCount; j++) {
          drawEdge(x0, y0, graph[_i2 + g_edge0 + j]);
        }
      } //ctx.fillStyle = "#f0f";
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
        quads = _subdivide2[1];

    this.quads = quads;

    if (!_config.animating) {
      relaxWeighted(_config, _graph, _config.maxIterations);
    } //console.log("GRAPH f_size", graph.length / g_size, graph);


    this.graph = _graph;
  }

  _createClass(OrganicQuads, [{
    key: "nodeSize",
    get: function get() {
      return f_size;
    }
  }]);

  return OrganicQuads;
}();

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
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
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
/* harmony import */ var _worker_Services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./worker/Services */ "./src/worker/Services.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



 // noinspection ES6UnusedImports










var organicQuads = new _fforw_organic_quads__WEBPACK_IMPORTED_MODULE_5___default.a({
  numberOfRings: 4,
  width: 100,
  height: 100,
  addQuads: true
});
var container, stats;
var camera, scene, renderer, light;
var controls, water, sphere;

function init() {
  container = document.getElementById("container"); //

  renderer = new three__WEBPACK_IMPORTED_MODULE_4__["WebGLRenderer"]();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement); //

  scene = new three__WEBPACK_IMPORTED_MODULE_4__["Scene"](); //

  camera = new three__WEBPACK_IMPORTED_MODULE_4__["PerspectiveCamera"](55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(30, 30, 100); //

  light = new three__WEBPACK_IMPORTED_MODULE_4__["DirectionalLight"](0xffffff, 0.8);
  scene.add(light); // Water

  var waterGeometry = new three__WEBPACK_IMPORTED_MODULE_4__["PlaneBufferGeometry"](10000, 10000);
  water = new three_examples_jsm_objects_Water_js__WEBPACK_IMPORTED_MODULE_7__["Water"](waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormals,
    alpha: 0.9,
    sunDirection: light.position.clone().normalize(),
    sunColor: "#fff8d5",
    waterColor: "#000e1e",
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  });
  water.rotation.x = -Math.PI / 2;
  scene.add(water); // Skybox

  var sky = new three_examples_jsm_objects_Sky_js__WEBPACK_IMPORTED_MODULE_8__["Sky"]();
  var uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = 5;
  uniforms["rayleigh"].value = 1.5;
  uniforms["luminance"].value = 1;
  uniforms["mieCoefficient"].value = 0.05;
  uniforms["mieDirectionalG"].value = 0.8;
  var parameters = {
    distance: 1000,
    inclination: 0.05,
    azimuth: 0.25
  };
  var cubeCamera = new three__WEBPACK_IMPORTED_MODULE_4__["CubeCamera"](0.1, 1, 512);
  cubeCamera.renderTarget.texture.generateMipmaps = true;
  cubeCamera.renderTarget.texture.minFilter = three__WEBPACK_IMPORTED_MODULE_4__["LinearMipmapLinearFilter"];
  scene.background = cubeCamera.renderTarget;

  function updateSun() {
    var theta = Math.PI * (parameters.inclination - 0.5);
    var phi = 2 * Math.PI * (parameters.azimuth - 0.5);
    light.position.x = parameters.distance * Math.cos(phi);
    light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
    light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);
    sky.material.uniforms["sunPosition"].value = light.position.copy(light.position);
    water.material.uniforms["sunDirection"].value.copy(light.position).normalize();
    cubeCamera.update(renderer, sky);
  }

  updateSun(); //

  var geometry = new three__WEBPACK_IMPORTED_MODULE_4__["BoxBufferGeometry"](20, 20, 20);
  var count = geometry.attributes.position.count;
  var colors = [];
  var color = new three__WEBPACK_IMPORTED_MODULE_4__["Color"]();

  for (var i = 0; i < count; i += 3) {
    color.setHex(Math.random() * 0xffffff);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute("color", new three__WEBPACK_IMPORTED_MODULE_4__["Float32BufferAttribute"](colors, 3));
  var material = new three__WEBPACK_IMPORTED_MODULE_4__["MeshStandardMaterial"]({
    vertexColors: true,
    roughness: 0.0,
    flatShading: true,
    envMap: cubeCamera.renderTarget.texture,
    side: three__WEBPACK_IMPORTED_MODULE_4__["FrontSide"]
  });
  sphere = new three__WEBPACK_IMPORTED_MODULE_4__["Mesh"](geometry, material);
  scene.add(sphere); //

  controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_9__["OrbitControls"](camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.45;
  controls.target.set(0, 0, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 300.0;
  controls.enableDamping = true;
  controls.dampingFactor = 0.02;
  controls.update(); //
  // stats = new Stats();
  // container.appendChild( stats.dom );
  // GUI
  //var gui = new GUI();
  // var folder = gui.addFolder( "Sky" );
  // folder.add( parameters, "inclination", 0, 0.5, 0.0001 ).onChange( updateSun );
  // folder.add( parameters, "azimuth", 0, 1, 0.0001 ).onChange( updateSun );
  // folder.open();
  //
  // var uniforms = water.material.uniforms;
  //
  // var folder = gui.addFolder( "Water" );
  // folder.add( uniforms.distortionScale, "value", 0, 8, 0.1 ).name( "distortionScale" );
  // folder.add( uniforms.size, "value", 0.1, 10, 0.1 ).name( "size" );
  // folder.add( uniforms.alpha, "value", 0.9, 1, .001 ).name( "alpha" );
  // folder.open();
  //

  window.addEventListener("resize", onWindowResize, false);
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
  var time = performance.now() * 0.001;
  sphere.position.y = Math.sin(time) * 5 + 1;
  sphere.rotation.x = time * 0.5;
  sphere.rotation.z = time * 0.51;
  water.material.uniforms["time"].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}

var waterNormals;
Promise.all([Object(_loadScene__WEBPACK_IMPORTED_MODULE_6__["default"])("assets/tiles.glb"), Object(_loadTexture__WEBPACK_IMPORTED_MODULE_10__["default"])("assets/waternormals.jpg")]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      gltf = _ref2[0],
      oceanNormals = _ref2[1];

  //scene.add( gltf.scene );
  // console.log("Scene Objects", gltf.scene.children.map(kid => kid.name).join(", "))
  //
  // const obj  = gltf.scene.children.find(
  //     kid => kid.name === "tree_default"
  // );
  oceanNormals.wrapS = oceanNormals.wrapT = three__WEBPACK_IMPORTED_MODULE_4__["RepeatWrapping"];
  waterNormals = oceanNormals; // gltf.animations; // Array<AnimationClip>
  // gltf.scene; // Group
  // gltf.scenes; // Array<Group>
  // gltf.cameras; // Array<Camera>
  // gltf.asset; // Object
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

/***/ }),

/***/ "./src/worker/Services.js":
/*!********************************!*\
  !*** ./src/worker/Services.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_services.worker */ "./src/worker/_services.worker.js");
/* harmony import */ var _services_worker__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_services_worker__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services-constants */ "./src/worker/services-constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var counter = 0;
var storage = new Map();
var webWorker = _services_worker__WEBPACK_IMPORTED_MODULE_0___default()();
var secret = Symbol("Services Secret");

function processWorkerMessage(data) {
  //console.log("RESPONSE", data);
  var ticket = data.ticket,
      message = data.message;
  var entry = storage.get(ticket);

  if (!entry) {
    console.error("INVALID TICKET: " + JSON.stringify(message));
    return;
  }

  var _entry$secret = entry[secret],
      resolve = _entry$secret.resolve,
      reject = _entry$secret.reject;
  var type = message.type;

  switch (type) {
    // case RESPONSE_MAP:
    //     resolve(
    //         WorldMap.deserialize(message.payload)
    //     );
    //     break;
    case _services_constants__WEBPACK_IMPORTED_MODULE_1__["RESPONSE_PROGRESS"]:
      {
        var onProgress = entry.onProgress;

        if (onProgress) {
          onProgress(message.percent);
        } else {
          console.log(Math.round(message.percent * 100) + "%");
        }

        break;
      }
    // case RESPONSE_SEGMENT:
    // {
    //     if (entry.onSegment(message.path) === false)
    //     {
    //         resolve({
    //             path: false
    //         });
    //
    //         webWorker.postMessage({
    //             type: MESSAGE_CANCEL_PATH,
    //             ticket: message.ticket
    //         })
    //     }
    //     break;
    // }
    // case RESPONSE_PATH:
    // {
    //     resolve(
    //         message
    //     );
    // }

    case _services_constants__WEBPACK_IMPORTED_MODULE_1__["RESPONSE_ERROR"]: // intentional fall-through

    default:
      reject(message);
  }
}

var onWorkerMessage = function onWorkerMessage(ev) {
  try {
    processWorkerMessage(ev.data);
  } catch (e) {
    console.error("ERROR processing worker message", e);
  }
};

webWorker.addEventListener("message", onWorkerMessage, true);
/**
 *
 * @param {Object} message      message object
 * @param {Object} [ctx]    context for handler
 * @return {Promise<any>}
 */

function postWithReply(message, ctx) {
  var ticket = ++counter;
  return new Promise(function (promiseResolve, promiseReject) {
    //console.log("POST-W-REPLY", ticket, message);
    webWorker.postMessage({
      ticket: ticket,
      message: message
    }); // make sure to delete our stored ticket both when resolving and rejecting

    var internal = {
      resolve: function resolve(result) {
        storage.delete(ticket);
        promiseResolve(result);
      },
      reject: function reject(err) {
        storage.delete(ticket);
        promiseReject(err);
      }
    };

    if (ctx) {
      ctx[secret] = internal;
    } else {
      ctx = _defineProperty({}, secret, internal);
    }

    storage.set(ticket, ctx);
  });
}

var Services = {
  // /**
  //  * Generates the world map with the given seed. Returns a promise that resolves
  //  * with the new map object
  //  *
  //  * @param {String|Number}   seed    seed value
  //  * @param size
  //  * @param {Function} [onProgress]   optional progress handler
  //  * @return {Promise<any>}
  //  */
  // generateMap: (seed, size = 2048, onProgress) => {
  //     return postWithReply({
  //             type: QUERY_GENERATE,
  //             seed,
  //             size,
  //             reportProgress: !!onProgress
  //         }, {
  //             onProgress
  //         })
  //         .catch(
  //             e => {
  //                 console.error("ERROR in generateMap", e);
  //                 return Promise.reject(e);
  //             }
  //         );
  // },
  //
  // /**
  //  * Plans a path starting at sx,sy and ending at ex,ey. The planning works on two levels. It uses a prepared
  //  * navigation mesh to vastly cut down on computational complexity for very long paths connecting e.g. the next village.
  //  *
  //  * One the second level, a grid-based planning controls the path in between nodes of the navigation mesh. For short
  //  * paths, only the second level might be needed.
  //  *
  //  * The promise returned resolves to the complete path
  //  *
  //  * @param {Number} worldId          world map id
  //  * @param {Number} sx               starting point x-coordinate
  //  * @param {Number} sy               starting point y-coordinate
  //  * @param {Number} ex               end point x-coordinate
  //  * @param {Number} ey               end point y-coordinate
  //  * @param {Function} [onSegment]    optional callback to receive each second level sub path
  //  * @return {Promise<any>}
  //  */
  // planPath: (worldId, sx, sy, ex, ey, onSegment) => {
  //     return postWithReply({
  //             type: QUERY_PATH,
  //             worldId,
  //             sx,
  //             sy,
  //             ex,
  //             ey,
  //             reportSegments: !!onSegment
  //         }, {
  //             onSegment
  //         })
  //         .catch(
  //             e => {
  //                 console.error("ERROR in planPath", e)
  //                 return Promise.reject(e);
  //             }
  //         );
  // },
  close: function close() {
    webWorker.removeEventListener("message", onWorkerMessage, true);
    webWorker.close();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Services);

/***/ }),

/***/ "./src/worker/_services.worker.js":
/*!****************************************!*\
  !*** ./src/worker/_services.worker.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
  return new Worker(__webpack_require__.p + "9986f4eb4cb578c82abb.worker.js");
};

/***/ }),

/***/ "./src/worker/services-constants.js":
/*!******************************************!*\
  !*** ./src/worker/services-constants.js ***!
  \******************************************/
/*! exports provided: RESPONSE_PROGRESS, RESPONSE_ERROR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESPONSE_PROGRESS", function() { return RESPONSE_PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESPONSE_ERROR", function() { return RESPONSE_ERROR; });
// export const MESSAGE_CANCEL_PATH = "MESSAGE_CANCEL_PATH";
// export const QUERY_GENERATE = "QUERY_GENERATE";
// export const QUERY_PATH = "QUERY_PATH";
var RESPONSE_PROGRESS = "RESPONSE_PROGRESS";
var RESPONSE_ERROR = "RESPONSE_ERROR";

/***/ })

/******/ });
//# sourceMappingURL=bundle-main-35ef772d4b331c3421e5.js.map