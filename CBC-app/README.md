# CORE Build Consulting

One-page marketing site — React + Vite + TypeScript + Tailwind CSS v4, with EN/ES
i18n and a Resend-powered contact form.

## Contact form (Resend)

The contact form posts to a serverless function at `api/contact.ts` which sends the
enquiry via [Resend](https://resend.com). The API key lives only on the server.

### Environment variables

Copy `.env.example` to `.env` for local dev, and set the same variables in your Vercel
project (Project → Settings → Environment Variables):

| Variable         | Required | Notes |
|------------------|----------|-------|
| `RESEND_API_KEY` | yes      | From resend.com/api-keys |
| `CONTACT_TO`     | no       | Recipient (default `Corebuildconsulting@gmail.com`) |
| `CONTACT_FROM`   | no       | Verified-domain sender; defaults to Resend's test sender |

### Deploying on Vercel

This repo is a small workspace wrapper: the actual app lives in the nested `CBC-app/`
folder. When importing into Vercel, set **Root Directory = `CBC-app`** (Vercel then
auto-detects Vite and picks up the `api/` folder). Add the env vars above and deploy.

For local testing of the `/api` function use `vercel dev` (plain `vite` does not run
serverless functions).

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
