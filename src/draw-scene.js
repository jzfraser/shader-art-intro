/**
 * @param {WebGLRenderingContext} gl
 */
function drawScene(gl, programInfo, buffers) {
  // gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  // gl.clearDepth(1.0); // Clear everything
  // gl.enable(gl.DEPTH_TEST); // Enable depth testing
  // gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  //
  // // Clear the canvas before we start drawing on it.
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //
  setPositionAttribute(gl, buffers, programInfo);

  gl.useProgram(programInfo.program);

  gl.uniform2f(
    programInfo.uniformLocations.resolution,
    gl.canvas.width,
    gl.canvas.height
  );

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 2; // pull out 2 values per iteration
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.position,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.position);
}

function resizeCanvasToDisplaySize(canvas) {
  // Get the size the browser is displaying the canvas in device pixels.
  const [displayWidth, displayHeight] = canvasToDisplaySizeMap.get(canvas);

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

export { drawScene };
