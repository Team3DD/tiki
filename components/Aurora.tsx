"use client"

import { Renderer, Program, Mesh, Color, Triangle } from "ogl"
import { useEffect, useRef } from "react"

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  int idx = uv.x < 0.5 ? 0 : 1;
  vec3 c1 = uColorStops[idx];
  vec3 c2 = uColorStops[idx + 1];
  float t = uv.x < 0.5 ? uv.x * 2.0 : (uv.x - 0.5) * 2.0;
  vec3 rampColor = mix(c1, c2, t);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float auroraAlpha = smoothstep(0.20 - uBlend * 0.5, 0.20 + uBlend * 0.5, intensity);
  
  fragColor = vec4(intensity * rampColor * auroraAlpha, auroraAlpha);
}
`

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

export default function Aurora({ 
  colorStops = ["#5227FF", "#7cff67", "#5227FF"], 
  amplitude = 1.0, 
  blend = 0.5, 
  speed = 1.0 
}: AuroraProps) {
  const ctnDom = useRef<HTMLDivElement>(null)
  const programRef = useRef<Program | null>(null)

  useEffect(() => {
    const ctn = ctnDom.current
    if (!ctn) return

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = [window.innerWidth, window.innerHeight]
      }
    }
    window.addEventListener("resize", resize)

    const geometry = new Triangle(gl)
    delete geometry.attributes.uv

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStops.map(hex => { const c = new Color(hex); return [c.r, c.g, c.b] }) },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uBlend: { value: blend },
      },
    })

    programRef.current = program
    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)
    resize()

    let animateId = 0, startTime: number | null = null
    const update = (timestamp: number) => {
      animateId = requestAnimationFrame(update)
      if (!startTime) startTime = timestamp
      program.uniforms.uTime.value = (timestamp - startTime) * 0.001 * speed
      renderer.render({ scene: mesh })
    }
    animateId = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animateId)
      window.removeEventListener("resize", resize)
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      programRef.current = null
    }
  }, [])

  useEffect(() => {
    if (programRef.current) {
      programRef.current.uniforms.uColorStops.value = colorStops.map(hex => {
        const c = new Color(hex)
        return [c.r, c.g, c.b]
      })
    }
  }, [colorStops])

  useEffect(() => {
    if (programRef.current) programRef.current.uniforms.uAmplitude.value = amplitude
  }, [amplitude])

  useEffect(() => {
    if (programRef.current) programRef.current.uniforms.uBlend.value = blend
  }, [blend])

  return <div ref={ctnDom} className="w-full h-full" />
}