<p align="center">
  <img src="public/logo.png" alt="TendIA" width="96">
</p>

<h1 align="center">TendIA · Landing page</h1>

<p align="center">
  <b>Crédito basado en tu negocio, no en tu pasado bancario.</b><br>
  Página pública de <a href="https://github.com/TendIA-IETI-Team/tendia">TendIA</a>: explica el Puntaje TendIA y lleva al tendero a la app y a la entidad al portal.
</p>

## Estado

Todavía no hay código. Este repositorio trae el sistema de diseño y la especificación para implementar la página:

| Qué | Dónde |
| --- | --- |
| Especificación de la landing (stack, secciones, criterios de aceptación, plan de trabajo) | [`docs/design-system/landing-spec.md`](docs/design-system/landing-spec.md) |
| Manual de marca (voz, color, tipografía, logo) | [`docs/design-system/README.md`](docs/design-system/README.md) |
| Tokens (colores, tipografía, espaciados, radios) | [`docs/design-system/tokens.json`](docs/design-system/tokens.json) |
| Componentes: guía + vista previa HTML de cada sección | [`docs/design-system/components/`](docs/design-system/components/) |
| Logo y capturas reales del producto | [`public/`](public/) |
| Instrucciones para Claude Code | [`CLAUDE.md`](CLAUDE.md) |

Para ver un componente, abre su `preview.html` en el navegador (por ejemplo `docs/design-system/components/Hero/preview.html`).

Los tokens vienen de [`packages/tokens`](https://github.com/TendIA-IETI-Team/tendia/tree/main/packages/tokens) del repositorio principal. Si cambian allá, actualiza `docs/design-system/tokens.json`.

## Stack previsto

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Nunito · Vercel (despliegue conectado a Git: `main` va a producción y cada PR genera una vista previa).

## Enlaces del producto

- App del tendero: https://tendia-app.vercel.app/app
- Portal del aliado: https://tendia-app.vercel.app
- API pública: https://tendia-app.vercel.app/api/docs

<p align="center"><sub>Proyecto de IETI · Escuela Colombiana de Ingeniería Julio Garavito · 2026</sub></p>
