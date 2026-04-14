# Appwrite deployment guide (husseinalalialismael.me)

This project is a **full-stack Node + React app** (Express + tRPC + Vite), so deploy it as an **SSR Site** (not static-only).

## 1) Create Site in Appwrite Cloud

1. Open `https://cloud.appwrite.io/`.
2. Create/select your project.
3. Go to **Sites** → **Create site**.
4. Choose **Connect repository** (GitHub).

> If your code is not on GitHub yet, push it first (Appwrite Git deploy needs a repo).

## 2) Build settings (use these exact values)

- **Framework:** `Other JavaScript`
- **Rendering:** `SSR` (Server-side rendering)
- **Root directory:** `/`
- **Install command:** `npm install --legacy-peer-deps`
- **Build command:** `npm run build`
- **Output directory:** `./dist`
- **Production branch:** `main` (or your real production branch)

If your Appwrite UI shows a **Start command** field for SSR, set:
- **Start command:** `npm run start`

## 3) Environment variables (Site → Settings → Environment variables)

Add these from your `.env` values:

- `VITE_APP_ID`
- `JWT_SECRET` (mark as Secret)
- `OAUTH_SERVER_URL`
- `OWNER_OPEN_ID`
- `DATABASE_URL` (mark as Secret)
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY` (mark as Secret)
- `NODE_ENV=production`
- `PORT=3000`

Optional analytics vars (if used):
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

## 4) Deploy

- Click **Deploy**.
- Confirm deployment status is **Ready**.
- Open the generated Appwrite domain and verify:
  - Home page loads
  - Projects/skills data loads
  - Auth callback works (`/api/oauth/callback`)

## 5) Connect your domain `husseinalalialismael.me`

In **Site → Domains → Add domain**:

### Apex domain (`husseinalalialismael.me`)
Use one of these:

- **Recommended by Appwrite:** NS delegation
  - Set registrar nameservers to:
    - `ns1.appwrite.zone`
    - `ns2.appwrite.zone`
- **Alternative:** keep your current DNS provider and use Appwrite-provided apex records
  - Add the provided ALIAS/ANAME/CNAME-flattening target + required CAA

Set rule type to **Active deployment**.

### `www` subdomain (optional but recommended)
- Add `www.husseinalalialismael.me`
- Create the CNAME record Appwrite gives you
- Rule type: **Active deployment**

## 6) Final checks

- HTTPS certificate status becomes active (can take time while DNS propagates)
- DNS propagation can take up to 48h
- Re-deploy after changing env vars or build settings

---

## Known notes for this repo

- Local production build passes with:
  - client build output at `dist/public`
  - server bundle at `dist/index.js`
- App depends on backend routes (`/api/trpc`), so **static-only deployment will break runtime data/auth**.
