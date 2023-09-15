/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/art.js":
/*!********************!*\
  !*** ./src/art.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _draw_scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./draw-scene.js */ \"./src/draw-scene.js\");\n/* harmony import */ var _init_buffers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init-buffers.js */ \"./src/init-buffers.js\");\n\n\n\nmain();\n\nfunction main() {\n  const canvas = document.querySelector(\"#glcanvas\");\n\n  /** @type {WebGLRenderingContext} */\n  const gl = canvas.getContext(\"webgl\");\n\n  if (gl === null) {\n    alert(\n      \"Unable to initialize WebGL. Your browser or machine may not support it.\"\n    );\n  }\n\n  const vsSource = `\n    attribute vec4 aPosition;\n\n    void main() {\n      gl_Position = aPosition;\n    }\n  `;\n  const fsSource = `\n    precision lowp float;\n    uniform vec2 uResolution;\n    uniform float uTime;\n\n    vec3 palette(float t) {\n      vec3 a = vec3(0.5, 0.5, 0.5);\n      vec3 b = vec3(0.5, 0.5, 0.5);\n      vec3 c = vec3(1.0, 1.0, 1.0);\n      vec3 d = vec3(0.263, 0.416, 0.557);\n\n      return a + b * cos(6.28318 * (c * t + d));\n    }\n\n    float ndot(vec2 a, vec2 b) {\n      return a.x * b.x - a.y * b.y;\n    }\n\n    float sdRhombus(vec2 p, vec2 b) {\n      p = abs(p);\n      float h = clamp(ndot(b - 2.0 * p, b) / dot(b,b), -1.0, 1.0);\n      float d = length(p - 0.5 * b * vec2(1.0 - h, 1.0 + h));\n      return d * sign(p.x * b.y + p.y * b.x - b.x * b.y);\n    }\n\n    void main() {\n      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;\n      vec2 uv0 = uv;\n      vec3 finalColor = vec3(0.0);\n\n      for (float i = 0.0; i < 4.0; i++) {\n        uv = fract(uv * 1.5) - 0.5;\n\n        float d = sdRhombus(uv, vec2(1.0, 1.0));\n\n        vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.4);\n\n        d = sin(d * 8.0 + uTime);\n        d = abs(d);\n\n        d = pow(0.12 / d, 2.0);\n\n        finalColor += col * d;\n      }\n      \n      gl_FragColor = vec4(finalColor, 1.0);\n    }\n  `;\n\n  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);\n  const programInfo = {\n    program: shaderProgram,\n    attribLocations: {\n      position: gl.getAttribLocation(shaderProgram, \"aPosition\"),\n    },\n    uniformLocations: {\n      resolution: gl.getUniformLocation(shaderProgram, \"uResolution\"),\n      time: gl.getUniformLocation(shaderProgram, \"uTime\"),\n    },\n  };\n\n  resizeCanvasToDisplaySize(canvas);\n  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n\n  const buffers = (0,_init_buffers_js__WEBPACK_IMPORTED_MODULE_1__.initBuffers)(gl);\n\n  function render(timeStamp) {\n    gl.uniform1f(programInfo.uniformLocations.time, timeStamp / 1000.0);\n    (0,_draw_scene_js__WEBPACK_IMPORTED_MODULE_0__.drawScene)(gl, programInfo, buffers);\n    requestAnimationFrame(render);\n  }\n\n  requestAnimationFrame(render);\n}\n\nfunction initShaderProgram(gl, vsSource, fsSource) {\n  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);\n  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);\n\n  const shaderProgram = gl.createProgram();\n  gl.attachShader(shaderProgram, vertexShader);\n  gl.attachShader(shaderProgram, fragmentShader);\n  gl.linkProgram(shaderProgram);\n\n  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {\n    alert(\n      `Unable to initialize the shader program: ${gl.getProgramInfoLog(\n        shaderProgram\n      )}`\n    );\n    return null;\n  }\n  return shaderProgram;\n}\n\nfunction loadShader(gl, type, source) {\n  const shader = gl.createShader(type);\n\n  // Send the source to the shader object\n  gl.shaderSource(shader, source);\n\n  // Compile the shader program\n  gl.compileShader(shader);\n\n  // See if it compiled successfully\n  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n    alert(\n      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`\n    );\n    gl.deleteShader(shader);\n    return null;\n  }\n\n  return shader;\n}\n\nfunction resizeCanvasToDisplaySize(canvas) {\n  // Lookup the size the browser is displaying the canvas in CSS pixels.\n  const displayWidth = canvas.clientWidth;\n  const displayHeight = canvas.clientHeight;\n\n  // Check if the canvas is not the same size.\n  const needResize =\n    canvas.width !== displayWidth || canvas.height !== displayHeight;\n\n  if (needResize) {\n    // Make the canvas the same size\n    canvas.width = displayWidth;\n    canvas.height = displayHeight;\n  }\n\n  return needResize;\n}\n\n\n//# sourceURL=webpack://art/./src/art.js?");

/***/ }),

/***/ "./src/draw-scene.js":
/*!***************************!*\
  !*** ./src/draw-scene.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawScene: () => (/* binding */ drawScene)\n/* harmony export */ });\n/**\n * @param {WebGLRenderingContext} gl\n */\nfunction drawScene(gl, programInfo, buffers) {\n  // gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque\n  // gl.clearDepth(1.0); // Clear everything\n  // gl.enable(gl.DEPTH_TEST); // Enable depth testing\n  // gl.depthFunc(gl.LEQUAL); // Near things obscure far things\n  //\n  // // Clear the canvas before we start drawing on it.\n  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n  //\n  setPositionAttribute(gl, buffers, programInfo);\n\n  gl.useProgram(programInfo.program);\n\n  gl.uniform2f(\n    programInfo.uniformLocations.resolution,\n    gl.canvas.width,\n    gl.canvas.height\n  );\n\n  gl.drawArrays(gl.TRIANGLES, 0, 6);\n}\n\n// Tell WebGL how to pull out the positions from the position\n// buffer into the vertexPosition attribute.\nfunction setPositionAttribute(gl, buffers, programInfo) {\n  const numComponents = 2; // pull out 2 values per iteration\n  const type = gl.FLOAT; // the data in the buffer is 32bit floats\n  const normalize = false; // don't normalize\n  const stride = 0; // how many bytes to get from one set of values to the next\n  // 0 = use type and numComponents above\n  const offset = 0; // how many bytes inside the buffer to start from\n  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);\n  gl.vertexAttribPointer(\n    programInfo.attribLocations.position,\n    numComponents,\n    type,\n    normalize,\n    stride,\n    offset\n  );\n  gl.enableVertexAttribArray(programInfo.attribLocations.position);\n}\n\nfunction resizeCanvasToDisplaySize(canvas) {\n  // Get the size the browser is displaying the canvas in device pixels.\n  const [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas);\n\n  // Check if the canvas is not the same size.\n  const needResize =\n    canvas.width !== displayWidth || canvas.height !== displayHeight;\n\n  if (needResize) {\n    // Make the canvas the same size\n    canvas.width = displayWidth;\n    canvas.height = displayHeight;\n  }\n\n  return needResize;\n}\n\n\n\n\n//# sourceURL=webpack://art/./src/draw-scene.js?");

/***/ }),

/***/ "./src/init-buffers.js":
/*!*****************************!*\
  !*** ./src/init-buffers.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initBuffers: () => (/* binding */ initBuffers)\n/* harmony export */ });\n/**\n * @param {WebGLRenderingContext} gl\n */\nfunction initBuffers(gl) {\n  const positionBuffer = initPositionBuffer(gl);\n\n  return {\n    position: positionBuffer,\n  };\n}\n\n/**\n * @param {WebGLRenderingContext} gl\n */\nfunction initPositionBuffer(gl) {\n  // Create a buffer for the square's positions.\n  const positionBuffer = gl.createBuffer();\n\n  // Select the positionBuffer as the one to apply buffer\n  // operations to from here out.\n  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);\n\n  // Now create an array of positions for the square.\n  const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];\n\n  // Now pass the list of positions into WebGL to build the\n  // shape. We do this by creating a Float32Array from the\n  // JavaScript array, then use it to fill the current buffer.\n  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);\n\n  return positionBuffer;\n}\n\n\n\n\n//# sourceURL=webpack://art/./src/init-buffers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/art.js");
/******/ 	
/******/ })()
;