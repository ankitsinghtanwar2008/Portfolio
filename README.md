# Ankit Singh — Creative Developer Portfolio

Cinematic/editorial portfolio starter using Next.js 16, TypeScript, GSAP + ScrollTrigger and Lenis.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `src/app`: app router, metadata and global styling
- `src/components/layout`: preloader, navigation, smooth scroll, footer
- `src/components/animations`: cursor and reusable animation components
- `src/components/sections`: hero, manifesto, about, expertise, projects, experience, contact
- `src/data`: editable project, experience and personal content
- `src/lib`: GSAP registration
- `public/images`: add real profile and project images here

## Before publishing

1. Update email and social links in `src/data/site.ts`.
2. Verify all experience, achievement and project statements.
3. Replace generated CSS artwork in About/projects with your own genuine images/screenshots if available.
4. Add your CV and a real profile photo if you want them displayed.
5. Update project links and technology lists in `src/data/projects.ts`.

The desktop project gallery uses a pinned horizontal GSAP sequence; on smaller screens it becomes a touch-friendly horizontal rail. Reduced-motion preferences are respected.
