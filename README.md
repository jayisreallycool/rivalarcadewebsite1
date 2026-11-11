# RivalArcade marketing site

Standalone Next.js 15 marketing site for RivalArcade (https://rivalarcade.vercel.app). Separate from the game repo.
Every Play button links to the app with UTM tags. Nothing on the site invents stats, balances or partners.

## Run locally
    npm install
    cp .env.example .env.local     # fill in DATABASE_URL etc. (site also runs without a DB using bundled content)
    npm run db:setup               # create tables + import the 11 launch articles
    npm run dev

## Deploy (Vercel)
1. Create a Postgres database (Neon/Supabase/Vercel Postgres) and run `DATABASE_URL=... npm run db:setup` once.
2. Import this repo in Vercel; add the env vars from `.env.example`.
3. Add your domain; set `NEXT_PUBLIC_SITE_URL` to it. `robots.txt` blocks indexing on non-production deployments.
4. Visit `/admin`, sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then add users and change the password.
5. Submit `/sitemap.xml` in Search Console.

## Scripts
`npm run build` · `npm run typecheck` · `npm run press-kit` (rebuild the zip) · `npm test` (smoke test against a running server)
