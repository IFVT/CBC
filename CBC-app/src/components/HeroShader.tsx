import { useEffect, useRef } from "react"

/**
 * Fondo generativo del Hero — shader WebGL crudo (sin Three.js).
 * Ruido FBM (3 octavas) con domain-warping que fluye en la paleta de marca
 * (verde profundo -> salvia) con destellos oro que crecen con el scroll.
 * Reacciona al scroll (u_scroll) y al mouse (u_mouse).
 *
 * Optimizaciones:
 *  - Render a baja resolución (el fondo es difuso -> se escala y no se nota),
 *    limitado a 960px de lado -> mucho menos trabajo de GPU y responsive.
 *  - El fondo se limita a ~30fps para dejar libre la GPU y que la página
 *    corra fluida; el rAF se pausa cuando el Hero sale de la vista.
 *  - Init diferido (requestIdleCallback) para no competir con la carga, y
 *    fade-in del canvas sobre el aurora CSS de fallback.
 *  - prefers-reduced-motion -> un solo frame estático. Sin WebGL -> canvas
 *    transparente y se ve el aurora CSS.
 */
const RES_SCALE = 0.6
const MAX_DIM = 960
const FPS = 30

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_mouse;

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<3;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }
  return v;
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
  p *= 2.2;
  float t = u_time*0.05;
  vec2 q = vec2(fbm(p + vec2(0.0,t) + u_mouse*0.2), fbm(p + vec2(4.3,-t)));
  float n = fbm(p + 1.8*q + u_scroll*0.5);
  n = clamp((n-0.24)/0.44, 0.0, 1.0);
  vec3 deep  = vec3(0.043,0.063,0.043);
  vec3 green = vec3(0.122,0.176,0.122);
  vec3 sage  = vec3(0.36,0.47,0.33);
  vec3 gold  = vec3(0.847,0.627,0.118);
  vec3 col = mix(deep, green, smoothstep(0.05,0.42,n));
  col = mix(col, sage, smoothstep(0.40,0.72,n));
  float g = smoothstep(0.66,0.94,n) * (0.5 + 0.7*u_scroll);
  col = mix(col, gold, clamp(g,0.0,1.0)*0.72);
  gl_FragColor = vec4(col, 1.0);
}
`

export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    let disposed = false
    let teardown: (() => void) | null = null

    const init = () => {
      if (disposed) return
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" })
      if (!gl) return // sin WebGL -> se ve el aurora CSS de fallback

      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)
        if (!s) return null
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.error("HeroShader compile error:", gl.getShaderInfoLog(s))
          return null
        }
        return s
      }
      const vs = compile(gl.VERTEX_SHADER, VERT)
      const fs = compile(gl.FRAGMENT_SHADER, FRAG)
      if (!vs || !fs) return
      const prog = gl.createProgram()
      if (!prog) return
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("HeroShader link error:", gl.getProgramInfoLog(prog))
        return
      }
      gl.useProgram(prog)

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, "p")
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      const uRes = gl.getUniformLocation(prog, "u_res")
      const uTime = gl.getUniformLocation(prog, "u_time")
      const uScroll = gl.getUniformLocation(prog, "u_scroll")
      const uMouse = gl.getUniformLocation(prog, "u_mouse")

      const resize = () => {
        let cw = canvas.clientWidth * RES_SCALE
        let ch = canvas.clientHeight * RES_SCALE
        const m = Math.max(cw, ch)
        if (m > MAX_DIM) {
          const k = MAX_DIM / m
          cw *= k
          ch *= k
        }
        const nw = Math.max(1, Math.round(cw))
        const nh = Math.max(1, Math.round(ch))
        if (canvas.width !== nw || canvas.height !== nh) {
          canvas.width = nw
          canvas.height = nh
          gl.viewport(0, 0, nw, nh)
        }
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)

      const hero = canvas.closest("section") as HTMLElement | null
      const mouse = { x: 0, y: 0 }
      const target = { x: 0, y: 0 }
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect()
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 2
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      }
      const finePointer = window.matchMedia("(pointer: fine)").matches
      if (finePointer && hero) hero.addEventListener("pointermove", onMove)

      let faded = false
      const render = (seconds: number) => {
        resize()
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, seconds)
        const heroH = hero ? hero.offsetHeight : window.innerHeight
        gl.uniform1f(uScroll, Math.min(Math.max(window.scrollY / heroH, 0), 1))
        mouse.x += (target.x - mouse.x) * 0.08
        mouse.y += (target.y - mouse.y) * 0.08
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        if (!faded) {
          faded = true
          canvas.style.opacity = "1"
        }
      }

      const minDelta = 1000 / FPS
      let last = -1
      let raf = 0
      let visible = true

      const frame = (now: number) => {
        if (disposed || !visible) return
        raf = requestAnimationFrame(frame)
        if (last >= 0 && now - last < minDelta) return
        last = now
        render(now * 0.001)
      }
      const play = () => {
        last = -1
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (visible && !reduce) play()
          else cancelAnimationFrame(raf)
        },
        { threshold: 0 },
      )
      io.observe(canvas)

      if (reduce) render(0)
      else play()

      teardown = () => {
        cancelAnimationFrame(raf)
        ro.disconnect()
        io.disconnect()
        if (finePointer && hero) hero.removeEventListener("pointermove", onMove)
      }
    }

    const idleId = w.requestIdleCallback
      ? w.requestIdleCallback(init, { timeout: 1000 })
      : window.setTimeout(init, 250)

    return () => {
      disposed = true
      if (w.cancelIdleCallback && w.requestIdleCallback) {
        try {
          w.cancelIdleCallback(idleId)
        } catch {
          /* noop */
        }
      }
      clearTimeout(idleId)
      if (teardown) teardown()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="hero-shader-canvas absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-700"
    />
  )
}
