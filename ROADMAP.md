# Estado y plan de trabajo

Documento de traspaso. Describe lo que se acaba de hacer y hacia dónde va el proyecto.
A diferencia de `CLAUDE.md` (reglas permanentes), esto caduca: actualízalo o bórralo
cuando el plan se complete.

---

## Objetivo del proyecto

El sitio ya funciona y está en producción. La meta ahora es subirlo de nivel visualmente
—animaciones ligadas al scroll— para que sirva como pieza de venta: la referencia de
calidad con la que ofrecer trabajo de mayor precio, no una landing más.

Criterio para cualquier cambio: **no sacrificar rendimiento ni accesibilidad por
apariencia**. Un sitio que se ve caro pero baja de 60fps en un móvil de gama media es
peor que uno sobrio que va fluido.

---

## Hecho: rama `fix/accesibilidad-y-limpieza` (commit 24f156c)

Auditoría del código existente y corrección de lo que estaba roto antes de animar nada.

### Accesibilidad

- `*:focus { outline: none }` global eliminado. Sustituido por un anillo
  `:focus-visible` de 2px con `currentColor`, que contrasta tanto sobre el verde oscuro
  como sobre los bloques crema. La regla `:focus:not(:focus-visible) { outline: none }`
  evita que el anillo aparezca al hacer click con el ratón, que era la intención
  original del `outline: none`.
- `user-select: none` global eliminado: bloqueaba copiar el email y el teléfono, es
  decir, la acción que el sitio quiere provocar. Se conservan los `select-none`
  puntuales de Methodology (etiquetas de pestaña y número decorativo).
- Los cuatro pasos de Methodology eran `<div onClick>`: no se podían activar con teclado
  y ningún lector de pantalla los anunciaba como interactivos. Ahora son
  `<button type="button">` con `aria-current="step"` en el activo.
- Quitado `outline-none` de los campos del formulario de contacto.

Nav y Contact ya estaban bien resueltos (`aria-pressed`, `aria-label`, `aria-expanded`)
y no se tocaron.

### Robustez de las animaciones

- `.reveal { opacity: 0 }` dependía de que el JS ejecutara: si fallaba, el contenido
  quedaba invisible de forma permanente. Ahora ese estado está bajo una clase `.js` que
  un script inline del `<head>` aplica antes del primer paint.
- `useScrollReveal` revela de inmediato si no existe `IntersectionObserver` o si el
  usuario pidió menos movimiento.
- `prefers-reduced-motion` ahora cubre `.reveal` y el marquee de logos, no solo el pulse
  del botón de WhatsApp.

### Limpieza

- Eliminados `src/App.css` (184 líneas del template de Vite, sin importar en ningún
  lado) y los assets `react.svg`, `vite.svg`, `hero.png`.
- `RealState` → `RealEstate` ("real state" no significa nada en inglés),
  `Expirience` → `Experience`, y la clave `REALSTATE_TOPICS` en `content.ts`.
  El archivo `public/logos/soficu-realstate.svg` se dejó como está: es el logo de un
  cliente y el nombre visible en `content.ts` ya dice "SOFICU Real Estate".
- `.gitattributes` para normalizar finales de línea (había un diff fantasma de 12
  archivos que eran solo CRLF).

### Estado de verificación

`npm run build` compila limpio. `npm run lint` deja un único warning, preexistente y no
relacionado: `Methodology.tsx:43`, dependencia faltante en un `useEffect`.

**Pendiente de comprobar a ojo:** el aspecto del anillo de foco al tabular, sobre todo
en la transición del hero oscuro a los bloques crema y en los pasos de Methodology, que
ahora son botones. Puede que convenga ajustar el `outline-offset`.

---

## Siguiente: rendimiento

Antes de añadir peso conviene bajar el que ya hay.

- El hero se carga como `background-image` en un `style` inline. El navegador no puede
  descubrir esa imagen temprano, lo que retrasa el LCP. Pasarlo a `<img>` con
  `fetchpriority="high"`, o al menos añadir un `<link rel="preload">`.
- Las dos fotos son JPEG (~45 KB cada una). Convertir a WebP/AVIF con `<picture>` y
  fallback: entre un 30% y un 40% menos.
- Medir con Lighthouse **en throttling móvil**, no en el escritorio. Anotar la marca
  base antes de tocar las animaciones para poder comparar después.

## Después: animaciones ligadas al scroll

Lo que hay hoy (`useScrollReveal`) es un disparador on/off: aparece al entrar en pantalla
y ya. Lo que falta es animación cuyo progreso dependa de la posición del scroll.

Dependencias previstas: **GSAP + ScrollTrigger** (gratis para uso comercial desde abril
de 2025, plugins premium incluidos) y **Lenis** para el smooth scroll.

Ideas por sección, a validar una por una:

- **Hero** — parallax: la imagen se desplaza más lento que el texto. Split text en el h1,
  revelando palabra por palabra.
- **Methodology** — pin: la sección queda fija mientras los pasos avanzan con el scroll.
  Ojo: ya tiene autoplay con `setInterval` y pausa al hacer click; hay que decidir cómo
  conviven ambos o sustituir uno por otro.
- **Experience** — contadores animados al entrar en pantalla.
- **Capabilities y Values** — stagger, que los elementos entren escalonados en vez de
  todos a la vez.

### Reglas para esta fase

- Animar solo `transform` y `opacity`. Nunca `width`, `height`, `top` ni `left`.
- Elegir tres o cuatro momentos de impacto y dejar el resto quieto. El contraste es lo
  que hace que el efecto se note; animarlo todo lo anula.
- Easings `ease-out` de 300–500 ms para entradas. Nada de `linear`, nada de 1.5 s.
- Simplificar en móvil, no replicar el desktop.
- Cada animación nueva entra también en el bloque `prefers-reduced-motion` de
  `index.css`.
- Una sección por rama, comprobando el rendimiento antes de pasar a la siguiente.

## Deuda pendiente

- No hay tests ni CI. Al menos Vitest sobre la validación del formulario de contacto y
  el hook `useScrollReveal`, más un workflow que corra `lint` y `build`.
- El warning de `useEffect` en `Methodology.tsx:43`.
- Todo el sitio se sirve en un único bundle de ~245 KB (75 KB gzip). Aceptable para una
  landing, pero a vigilar cuando entre GSAP.
