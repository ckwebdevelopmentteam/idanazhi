# Architecture

Next.js App Router routes use composition rather than a monolithic page. `src/data/content.ts` centralizes routes, imagery and hotel-specific copy. `layout` contains global shell and tokens; `components/layout` has header/footer; `components/sections` provides booking, hero, editorial grid and directory primitives; `components/hotels` contains a configurable hotel template.

Client components handle menu, booking dialog, directory filters, view switch and newsletter validation. Motion is limited to client components and respects `prefers-reduced-motion`. Remote image domains are constrained in `next.config.ts`. Verification uses TypeScript, ESLint and production build; visual comparison is constrained by the unavailable local browser surface and documented in progress.
