import React, { useEffect, useRef } from 'react';
import GlslCanvas from 'glslCanvas';

const ShaderCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const frag = `
#ifdef GL_ES
precision mediump float;
#endif

#define NUM_OCTAVES 5

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


float fbm(vec3 x) {
	float v = 0.0;
	float a = 0.5;
	vec3 shift = vec3(100);
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.y *= u_resolution.y / u_resolution.x;
    vec4 color1 = vec4(0.251, 0.863, 0.8, 1.0);
    vec4 color2 = vec4(2.0, 0.3, 0.1, 1.0);
    float pattern = fbm(vec3(uv.xy * 0.9, u_time * 0.1 + 0.5));
    pattern = smoothstep(0.49, 0.51, pattern);
    vec4 color = mix(color1, color2, pattern);
    gl_FragColor = color;
}
    `;

    const canvas = canvasRef.current;
    const sandbox = new GlslCanvas(canvas);
    sandbox.load(frag);

    return () => {
      sandbox.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default ShaderCanvas;