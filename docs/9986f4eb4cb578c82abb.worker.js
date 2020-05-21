/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js!./src/worker/_services.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./src/worker/_services.worker.js":
/*!************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./src/worker/_services.worker.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services-constants */ "./src/worker/services-constants.js");


function reply(ticket, message) {
  postMessage({
    ticket: ticket,
    message: message
  });
}

function error(ticket, error) {
  reply(ticket, {
    type: _services_constants__WEBPACK_IMPORTED_MODULE_0__["RESPONSE_ERROR"],
    error: error,
    ticket: ticket
  });
}

function handleIncomingMessage(ev) {
  var _ev$data = ev.data,
      message = _ev$data.message,
      ticket = _ev$data.ticket;
  var type = message.type; //console.log("handleIncomingMessage", ticket, message);

  switch (type) {
    // case QUERY_GENERATE:
    // {
    //     const {seed, size, reportProgress} = message;
    //
    //     console.log("Generating world '" + seed + "'");
    //
    //     const map = WorldMap.generate(
    //         size,
    //         seed,
    //         reportProgress &&
    //         (percent => reply(
    //             ticket,
    //             {
    //                 type: RESPONSE_PROGRESS,
    //                 percent,
    //             }
    //         ))
    //     );
    //
    //     const id = uuid.v4();
    //     map.worldId = id;
    //
    //     maps[id] = map;
    //
    //     reply(
    //         ticket,
    //         {
    //             type: RESPONSE_MAP,
    //             payload: map.serialize()
    //         });
    //     break;
    //
    // }
    //
    // case QUERY_PATH:
    // {
    //     const {worldId, sx, sy, ex, ey, reportSegments} = message;
    //
    //     //console.log("QUERY_PATH", {worldId, sx, sy, ex, ey, reportSegments})
    //
    //     const map = maps[worldId];
    //
    //     if (!map)
    //     {
    //         error(
    //             ticket,
    //             "Could not find map '" + worldId + "'"
    //         );
    //         return;
    //     }
    //
    //     const worldPath = macroPath(
    //         map,
    //         sx, sy,
    //         ex, ey
    //     );
    //     //console.log("World path for ticket #" + ticket, worldPath);
    //
    //     if (worldPath == null)
    //     {
    //         reply(
    //             ticket,
    //             {
    //                 type: RESPONSE_PATH,
    //                 path: null
    //             }
    //         );
    //     }
    //     else
    //     {
    //         paths.set(
    //             ticket,
    //             {
    //                 map,
    //                 worldPath,
    //                 pos: 0,
    //                 path: [],
    //                 reportSegments
    //             }
    //         );
    //
    //         setTimeout(doSubPathRoundRobin, 1);
    //     }
    //
    //     break;
    // }
    //
    // case MESSAGE_CANCEL_PATH:
    //     paths.delete(message.ticket);
    //     break;
    default:
      error(ticket, "Unhandled action: " + type);
      break;
  }
}

onmessage = function onmessage(ev) {
  // try
  // {
  return handleIncomingMessage(ev); // }
  // catch(e)
  // {
  //     console.error("Error handling incoming message", e);
  // }
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
//# sourceMappingURL=9986f4eb4cb578c82abb.worker.js.map