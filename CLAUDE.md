# CORE Build Consulting — sitio web

Landing de una sola página para una consultora de management (estrategia, crecimiento,
gobernanza de proyectos, asesoría inmobiliaria). Bilingüe EN/ES. En producción en
https://corebuildconsult.com

## Estructura

El repositorio tiene la app anidada un nivel:

```
CBC-app/            <- raíz del repo (git, .gitattributes, este archivo)
└── CBC-app/        <- la app; aquí van npm y todos los comandos
    ├── api/contact.ts    función serverless de Vercel (Resend)
    ├── src/components/   una sección por componente
    ├── src/data/content.ts   TODO el texto del sitio, EN y ES
    ├── src/i18n/         LanguageContext + useContent()
    └── src/hooks/useScrollReveal.ts
```

## Comandos

Desde `CBC-app/CBC-app`:

- `npm run dev` — servidor de desarrollo
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — eslint
- `npm run preview` — sirve el build

No hay tests todavía. Es una carencia conocida; ver ROADMAP.md.

## Stack

- Vite 8 + React 19 + TypeScript estricto
- Tailwind v4 vía `@tailwindcss/vite`. **No hay `tailwind.config.js`**: los tokens se
  declaran en el bloque `@theme` de `src/index.css`. Ahí viven la paleta y las fuentes.
- Formulario de contacto: `api/contact.ts` sobre Vercel, envía con Resend. Variables en
  `.env.example`. `RESEND_API_KEY` es solo de servidor, nunca la expongas al navegador.
- Sin router: una sola página con anclas (`#top`, `#methodology`, `#contact`, …).

## Reglas del proyecto

**Contenido.** Ningún texto va hardcodeado en los componentes. Todo entra en
`src/data/content.ts` y se consume con `useContent()`. Cada entrada existe en EN y ES:
si agregas una, agrégala en los dos idiomas o TypeScript falla.

**Accesibilidad.** Estas reglas se establecieron arreglando fallos reales; no las
revocar sin una razón concreta:

- Nunca `outline: none` global ni `outline-none` en elementos interactivos. El anillo de
  foco vive en la regla `:focus-visible` de `index.css` y usa `currentColor` para
  contrastar sobre fondo oscuro y sobre crema.
- Nunca `user-select: none` global. El visitante debe poder copiar el email y el
  teléfono. Puntual y justificado (etiquetas de pestaña, números decorativos) está bien.
- Todo lo que responde a un click es `<button>` o `<a>`, nunca un `<div onClick>`.
- Toda animación nueva respeta `prefers-reduced-motion: reduce` en el bloque que ya
  existe al final de `index.css`.

**Animaciones de entrada.** El estado oculto de `.reveal` está detrás de la clase `.js`
que un script inline del `<head>` aplica antes del primer paint. Si agregas más
animaciones de entrada, mantén ese patrón: sin JS, el contenido debe verse igual.

**Git.** `dist/` no se commitea. `.gitattributes` normaliza los finales de línea a LF
(el proyecto se edita desde Windows).

## Estilo de código

Dos espacios de indentación en la mayoría de los archivos, cuatro en algunos componentes
antiguos — respeta el del archivo que estés tocando. Sin punto y coma al final de línea.
Comillas dobles.
