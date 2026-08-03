# Antaragni '26

Monorepo for the web properties of **Antaragni**, the annual cultural festival of
IIT Kanpur — North India's largest, running since 1965.

## What's inside

A [Turborepo](https://turborepo.com/) with npm workspaces.

### Apps

- **`ca`** — the Campus Ambassador site: landing page, Google-auth registration,
  and the ambassador dashboard (profile, leaderboard, missions).
- `antaragni_main`, `events-registration`, `web`, `docs` — reserved workspaces.

### Packages

- `@repo/ui` — shared React components and the Lenis smooth-scroll provider
- `@repo/firebase` — Firebase auth, Firestore and storage helpers
- `@repo/store` — global Zustand store
- `@repo/model` — shared TypeScript types
- `@repo/math` — small shared utilities
- `@repo/eslint-config`, `@repo/typescript-config`, `@repo/tailwind-config` — shared configs

Everything is TypeScript.

## Getting started

```sh
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required: `@gsap/react`'s peer range trips
> strict resolution. React is pinned to **18.3.1** across the monorepo via root
> `overrides` — mixing in React 19 breaks rendering, so keep the pin in place.

Run the Campus Ambassador app:

```sh
npm run dev --workspace=ca
```

Each app needs its own `.env.local` with Firebase credentials (never commit these).

## Common tasks

```sh
npm run build          # build all workspaces
npm run lint           # lint all workspaces
npm run check-types    # typecheck all workspaces
npm run format         # prettier
```

## The `ca` app

Next.js App Router, Tailwind CSS, Framer Motion, Lenis.

- `src/app` — routes, layout, metadata and icon/OG image generation
- `src/components/acts` — the landing page, told in five sections (hero → legacy →
  the role → journey → rewards → partners → final CTA)
- `src/components/motion` — reusable motion primitives (mask-reveal text, count-up,
  ambient background, magnetic buttons, cinematic atmosphere)
- `src/components/dashboard` — the ambassador dashboard tabs
- `src/lib/assets.ts` — single registry for every static asset path

Note: avoid `runtime = "edge"` in this app — it corrupts the Turbopack dev build.
