# AI_CONTEXT.md — groupachat-proto
> First reflex every session: read this first. Doctrine: Parrit AI Playbook (REGLES-DOR §33).

## 1. Architecture state
Static client-side **prototype** (no backend). Next.js **16.2.2** App Router + React **19.2.4** + Tailwind v4, TypeScript `strict:true`, `lucide-react` icons. UI for a food-buying group ("GRAL / Deroche"): 5 routes under `src/app/` — Dashboard (`page.tsx`), `fournisseurs/` + dynamic `fournisseurs/[id]/`, `comparateur/`, `factures/`, `membres/` — wrapped by `src/components/Sidebar.tsx` (nav, mobile drawer). **All data is hardcoded module-scope arrays** (e.g. `kpis`, `categoryData`, `comparisons`) inside each page; the only state is local `useState` for filters/tabs/dropdowns. Single git commit (`cc5deb7`). Audit grade: 3 docs/config findings, 0 secrets, 0 real bugs.

## 2. Risk zones — DO NOT TOUCH without care
This repo is a demo, so its "risk" is the inverse of the others: **it looks like an app but persists nothing.** Traps when extending it:
- **No persistence layer at all.** Zero API routes (no `route.ts`), zero `fetch`/`axios`/Supabase, zero `<form>`/`onSubmit`. Every "supplier", "facture", "comparison" lives in literal arrays in the `.tsx` files. Any data the user appears to enter is discarded on reload — do not treat this as real data, and do not wire a UI to a save button without first adding a backend.
- **Filters operate over fake data.** `comparateur/page.tsx`, `factures/page.tsx`, `fournisseurs/page.tsx` filter hardcoded records (`comparisons`, the products/suppliers lists). The "best supplier" flag (`best: true` in `comparisons`) is editorial, not computed.
- **Hardcoded business-looking numbers.** Dashboard KPIs ("12,4M €", "47 fournisseurs", "+8%") in `src/app/page.tsx` are invented placeholders — never cite them as facts.
- **No secrets, no env, no auth** — and that's correct *for a prototype*. The moment a real backend/DB is added, this becomes a missing-auth surface; do not bolt on a data source without RLS + server-only secrets first (AI Playbook).

## 3. Established rules (already true / enforced)
- **TypeScript `strict: true`** in `tsconfig.json`, path alias `@/* → src/*`. No `any`, no `eslint-disable`, no `@ts-ignore` anywhere in `src/`.
- **ESLint** via `eslint.config.mjs` (`eslint-config-next` core-web-vitals + typescript). `npm run lint` works locally.
- **Secrets:** none present, `.env*` is git-ignored (`.gitignore`). Verified clean by the global audit (no rotation needed).
- **Agent rule:** `AGENTS.md` (mirrored by `CLAUDE.md` via `@AGENTS.md`) warns this is Next.js **16** with breaking changes — read `node_modules/next/dist/docs/` before writing Next code; do not rely on training-data conventions.
- **Intentional exception:** all-static, no-backend is a deliberate prototype choice, not debt to "fix" blindly — promote to a real stack only on an explicit decision.

## 4. Open debt (playbook findings still pending)
Per `/Users/paullarmaraud/parrit-os/docs/ai-playbook/audits/GLOBAL-AUDIT-2026-06-21.md` (groupachat-proto = 3 findings, all docs/config; "propres, gaps docs/config uniquement"):
- **E11 — AI_CONTEXT.md missing** → this file closes it (safe-auto docs).
- **E12 — No CI barrier.** No `.github/` dir at all; add a blocking 4-gate workflow (lint + typecheck/`tsc --noEmit` + build, `npm ci` not `npm install`).
- **E13 — Dependabot missing.** Add `.github/dependabot.yml` (npm + github-actions ecosystems).
- **Micro-swallows to log** (audit theme 7) — none material here today; keep any future `catch` log-and-continue.
- **Forward-looking:** if this proto graduates to production, the data-layer gaps in §2 become real security/data-loss work (backend + auth + RLS + server-only secrets) — scope that as a fresh AI Playbook project, don't retrofit ad hoc.