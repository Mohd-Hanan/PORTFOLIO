# Muhammed Hanan PP — Portfolio

A professional dark-themed portfolio website for Muhammed Hanan PP, a 2nd-year BTech CS (AI) student at TKM College of Engineering.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at `/api`)
- `pnpm --filter @workspace/portfolio run dev` — run the portfolio frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Required env: `GMAIL_USER` — Gmail address used to send contact form emails (set to mohdhanan197@gmail.com)
- Required secret: `GMAIL_APP_PASSWORD` — Gmail App Password for sending emails via Nodemailer

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS v4 + framer-motion + wouter
- API: Express 5 + Nodemailer (contact form)
- No database needed — portfolio is frontend-only except for the contact email endpoint
- Build: esbuild (API), Vite (frontend)

## Where things live

- `artifacts/portfolio/src/pages/Home.tsx` — entire single-page portfolio (all sections)
- `artifacts/portfolio/src/App.tsx` — router + providers + Sonner toaster
- `artifacts/portfolio/src/index.css` — theme tokens (dark space-black + purple/violet accent)
- `artifacts/api-server/src/routes/contact.ts` — POST /api/contact endpoint (sends email via Nodemailer)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (only health check; contact form uses direct fetch)

## Architecture decisions

- Portfolio is a single-page app — all sections use anchor scroll, no routing.
- Contact form POSTs directly to `/api/contact` (no generated hooks — not needed for a single form endpoint).
- Email is sent via Gmail SMTP with a Gmail App Password (16-char app-specific password, not regular Gmail password).
- No database — portfolio content is static in the component file.
- Sonner toast library used for success/error feedback on form submit.

## Product

A professional portfolio website showcasing:
- Hero with name, role, bio, and skill badges
- About section with stats (3 projects, 3 certs, 4th semester, 2 team lead roles)
- Education (BTech CS AI at TKM College of Engineering 2024-2028)
- Skills (Programming, Technologies, Concepts)
- Three projects (PowerGuard, Customer Segmentation, Water Level Monitor)
- Three NPTEL certifications
- Contact section with email, GitHub, and a working contact form

## User preferences

- Email: mohdhanan197@gmail.com (no phone number shown)
- Dark theme default, space-black background with purple/violet accent (#7c5cfc range)
- Professional tone — no emojis in UI
- Contact form sends email to mohdhanan197@gmail.com via Gmail SMTP

## Gotchas

- The Gmail App Password must be a 16-character app-specific password from Google Account > Security > App passwords. Regular Gmail password will NOT work.
- `GMAIL_USER` is a non-secret env var (set to mohdhanan197@gmail.com). `GMAIL_APP_PASSWORD` is a secret.
- The contact route is at `POST /api/contact` — frontend uses a direct `fetch()` call, not a generated hook.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
