---
name: Portfolio contact form email setup
description: How the contact form sends emails — Gmail SMTP via Nodemailer, what secrets are needed and why.
---

The contact form POSTs to `POST /api/contact` (Express route at `artifacts/api-server/src/routes/contact.ts`).
It uses Nodemailer with Gmail SMTP service.

Required env/secrets:
- `GMAIL_USER` (env var, shared) — set to mohdhanan197@gmail.com
- `GMAIL_APP_PASSWORD` (secret) — must be a 16-character Gmail App Password, NOT the regular Gmail password

**Why:** Gmail blocks regular passwords for SMTP. App passwords are generated at Google Account > Security > 2-Step Verification > App passwords.

**How to apply:** If the contact form returns 503, `GMAIL_APP_PASSWORD` secret is not set. Direct the user to create a Gmail App Password and add it as a Replit secret.

The frontend uses a plain `fetch()` call (no generated API hook) since it's a single one-off endpoint — no OpenAPI spec entry was added for it.
