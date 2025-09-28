# SEO Affiliate MVP

## 1) Forka
- Klicka "Use this template" → "Create new repo".

## 2) Deploya
- Cloudflare Pages: Create Project → Connect to GitHub → Build command: `npm run build` → Output dir: `out`.
- Set env vars (se nedan). Aktivera "Deploy hooks" (URL kopieras till Make).

## 3) DNS
- Köp .se-domän (≈100 kr). Peka CNAME till Pages.

## 4) Search Console
- Verifiera domänen (DNS-TXT). Skicka in `https://din-domän.se/sitemap.xml`.

## 5) Analytics
- Cloudflare Web Analytics (cookie-fri) eller Plausible (30d trial). Lägg SCRIPT i `app/layout.tsx`.

## Environment
PLAUSIBLE_DOMAIN=din-domän.se
PLAUSIBLE_API=https://plausible.io/api/event
AFFILIATE_SECRET=<slumpat>     # signering av länkar
SITE_URL=https://din-domän.se
BRAND=DinSajt
