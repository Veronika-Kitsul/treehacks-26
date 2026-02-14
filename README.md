Hackathon project by maks and nika for treehacks 2026

## Deploy to Vercel

1. **Root Directory must be the repo root.** In Vercel: Project Settings → General → Root Directory → set to **`.`** (or leave empty). If it’s set to `frontend`, you’ll get 404 (that folder was removed; the app is at the root).
2. Deploy from **latest `main`**. If the dashboard shows an old commit (e.g. “Initial commit”), use “Redeploy” and pick the latest commit, or push your latest code and redeploy.
3. After redeploying, the site should load at `/`.