# APX International — Website

React + Vite + Tailwind + Framer Motion, in `frontend/`. Frontend only — no backend yet.

## Run locally

```bash
cd frontend
npm run dev
```

## Deploy (Netlify)

`netlify.toml` at the repo root sets the base folder (`frontend`), build command and the SPA redirect.
Connect the repo in Netlify and deploy — no extra settings needed.

## Notes

- **Contact form** uses Netlify Forms (hidden form in `frontend/index.html`). Submissions appear under
  *Forms* in the Netlify dashboard; set up email notifications there.
- **Tracking** shows sample data (`frontend/src/lib/mockTracking.ts`) until the ERP is live — then point
  `trackShipment` in `frontend/src/lib/api.ts` at the ERP API.
- **Login / Customer Portal** is UI only for now.
- Photos (Unsplash) and videos (Pexels) are loaded from their CDNs.
