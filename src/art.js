import { drawScene } from "./draw-scene.js";
import { initBuffers } from "./init-buffers.js";

main();

function main() {
  const canvas = document.querySelector("#glcanvas");

  /** @type {WebGLRenderingContext} */
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
  }

  const vsSource = `
    attribute vec4 aPosition;

    void main() {
      gl_Position = aPosition;
    }
  `;
  const fsSource = `
    precision lowp float;
    uniform vec2 uResolution;
    uniform float uTime;

    vec3 palette(float t) {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.263, 0.416, 0.557);

      return a + b * cos(6.28318 * (c * t + d));
    }

    float ndot(vec2 a, vec2 b) {
      return a.x * b.x - a.y * b.y;
    }

    float sdRhombus(vec2 p, vec2 b) {
      p = abs(p);
      float h = clamp(ndot(b - 2.0 * p, b) / dot(b,b), -1.0, 1.0);
      float d = length(p - 0.5 * b * vec2(1.0 - h, 1.0 + h));
      return d * sign(p.x * b.y + p.y * b.x - b.x * b.y);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);

      for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = sdRhombus(uv, vec2(1.0, 1.0));

        vec3 col = palette(length(uv0) + i * 0.4 + uTime * 0.4);

        d = sin(d * 8.0 + uTime);
        d = abs(d);

        d = pow(0.12 / d, 2.0);

        finalColor += col * d;
      }
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      position: gl.getAttribLocation(shaderProgram, "aPosition"),
    },
    uniformLocations: {
      resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
      time: gl.getUniformLocation(shaderProgram, "uTime"),
    },
  };

  resizeCanvasToDisplaySize(canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const buffers = initBuffers(gl);

  function render(timeStamp) {
    gl.uniform1f(programInfo.uniformLocations.time, timeStamp / 1000.0);
    drawScene(gl, programInfo, buffers);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }
  return shaderProgram;
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

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
