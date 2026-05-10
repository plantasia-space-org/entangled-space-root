# Entangled Space Root

Landing page and interactive prototype for Entangled Space.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

## Local Development

```bash
npm install
npm run dev
```

The local development server is configured for:

`https://local.plantasia.space:5175`

## Current Scope

- Editorial landing page for Entangled Space
- Snail Factor visualization and keyboard prototype
- Waitlist form wired for function-based submission
- Contact dialog with query-param access
- Local HTTPS dev setup aligned with the Plantasia Space environment

## Forms

Form submission is prepared for DigitalOcean function endpoints via:

- `VITE_FORMS_API_BASE_URL`

Frontend requests append:

- `/submit-waiting-list`
- `/submit-contact-form`

Set `VITE_FORMS_API_BASE_URL` in local/deployment environment configuration.

Use the public web function URL from the browser. Do not use the legacy authenticated action endpoint from the frontend, and do not commit secrets or private function credentials to the repo.
