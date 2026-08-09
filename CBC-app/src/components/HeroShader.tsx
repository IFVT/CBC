import { useEffect, useRef } from "react"

/**
 * Fondo generativo del Hero — shader WebGL crudo (sin Three.js).
 * Ruido FBM con domain-warping que fluye en la paleta de marca (verdes +
 * acento oro), reacciona al scroll (u_scroll) y al mouse (u_mouse).
 *
 * Rendimiento: DPR limitado a 1.5, se pausa cuando el Hero sale de vista,
 * y con prefers-reduced-motion pinta un solo frame estático. Si no hay
 * WebGL, el canvas queda transparente y se ve el aurora CSS de fallback.
 */
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
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv; p.x *= u_res.x/u_res.y;
  p *= 1.6;
  float t = u_time*0.045;
  vec2 q = vec2(fbm(p + vec2(0.0,t)), fbm(p + vec2(5.2,-t)));
  vec2 r = vec2(fbm(p + 2.0*q + vec2(1.7,t*0.8) + u_mouse*0.25),
                fbm(p + 2.0*q + vec2(8.3,-t*0.6)));
  float n = fbm(p + 2.4*r + u_scroll*0.5);
  n = clamp((n-0.28)/0.46, 0.0, 1.0);
  vec3 deep  = vec3(0.043,0.063,0.043);
  vec3 green = vec3(0.122,0.176,0.122);
  vec3 sage  = vec3(0.36,0.47,0.33);
  vec3 gold  = vec3(0.847,0.627,0.118);
  vec3 col = mix(deep, green, smoothstep(0.08,0.45,n));
  col = mix(col, sage, smoothstep(0.42,0.75,n));
  float g = smoothstep(0.72,0.96,n)*(0.5+0.7*u_scroll);
  col = mix(col, gold, clamp(g,0.0,1.0)*0.7);
  gl_FragColor = vec4(col,1.0);
}
`

export default function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
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

    let raf = 0
    let visible = true
    const start = performance.now()

    const render = (seconds: number) => {
      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, seconds)
      const heroH = hero ? hero.offsetHeight : window.innerHeight
      gl.uniform1f(uScroll, Math.min(Math.max(window.scrollY / heroH, 0), 1))
      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const frame = () => {
      render((performance.now() - start) / 1000)
      if (visible) raf = requestAnimationFrame(frame)
    }
    const play = () => {
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

    return () => {
      // No perdemos el contexto: en StrictMode (dev) el efecto se re-monta
      // y getContext devolvería el mismo contexto ya perdido, rompiendo el
      // compile. Solo paramos el loop y soltamos listeners/observers.
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      if (finePointer && hero) hero.removeEventListener("pointermove", onMove)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="hero-shader-canvas absolute inset-0 -z-10 h-full w-full" />
}
