# Gigdar

A mobile app for metal fans (metal first; the plan is to scale to all music genres later, so keep genres data-driven and never hardcode "metal"): follow bands and subgenres, pick the regions you care about, and get notified when a relevant concert is announced. Tapping an event sends the user to the ticket seller.

Owner: Sarper. He is a game/level designer, not a software engineer, and writes no JavaScript/TypeScript yet. Explain technical choices in plain language, keep setup steps explicit, and do not assume prior web/mobile dev knowledge. Discussion language is Turkish; code, comments and commit messages are English.

Full product context: `docs/product.md`. **Screen-by-screen MVP spec (source of truth for what to build): `docs/mvp-spec.md`.** Items tagged [Öneri] or [Açık soru] there need Sarper's answer before implementing. Visual idea board: `docs/board/index.html` (Sarper opens it in a browser). Its content lives in `docs/board/board-data.js`; the header of that file explains the format and colour meanings. Approved stages and reminders to raise with Sarper when due: `docs/roadmap.md`. Check it when a stage starts.

## How we work
- Claude owns backend and architecture decisions and picks the healthiest default. When a decision affects the product (what the user sees, cost, data sources, legal/ToS questions), stop and ask Sarper first.
- Record every non-trivial decision in `docs/decisions.md` (date, decision, why, alternatives).
- Keep the docs as the single source of truth: whenever Sarper and Claude settle something in conversation, update `docs/mvp-spec.md` (change the tag from [Öneri]/[Açık soru] to [Karar] where he confirmed it) and add a row to `docs/decisions.md`. Show him the diff in plain language.
- Keep the board in sync too: when a decision changes, update the matching notes in `docs/board/board-data.js` and bump that frame's `ver` by 1. If docs and board disagree, `docs/mvp-spec.md` wins; tell Sarper.
- Sarper may paste board edits he made in the browser (the board's "Değişikliklerimi kopyala" button). Apply them to `board-data.js`, then summarize anything that affects decisions before touching the spec.
- Build MVP features only unless Sarper says otherwise. v2/v3 and backlog items are listed in `docs/product.md`.

## Stack (decided)
- App: Expo (React Native) + TypeScript. Targets iOS and Android first; web build later for the manager panel.
- Backend: Supabase (Postgres + PostGIS, Auth, Storage, Edge Functions, scheduled jobs).
- Push: Expo push notifications.
- Early test: Android APK shared from an EAS build link, zero cost. iPhone testers wait for the paid Apple account.
- Beta distribution: TestFlight (iOS) and Google Play internal testing (Android).

## Open decisions (do not implement without asking)
- Travel time between cities: MVP shows straight-line km only (see region map in `docs/mvp-spec.md` section 2). Data note for later: Google Routes API results have restrictive caching terms; prefer an OSM-based routing engine for a stored city-to-city table, and Google only for live "show route" links.
- Metal Archives: no official API; do not scrape it. May return later through permission/partnership. Current source is in `docs/decisions.md` (MusicBrainz names, Wikidata genres, hand-checked). Do not use MusicBrainz tags or genre links: they are non-commercial.
- Event data sources beyond those in `docs/decisions.md`. Never scrape any site.
- News automation and band social media tracking: not in MVP. Ask before adding (cost, legal, platform terms).

## Conventions
- Keep the region model flexible: layer 1 = user's home city plus added cities (including cross-border), layer 2 = whole country.
- Genre model is a tree (main genre > subgenre); bands can have multiple subgenres.
- The app name "Gigdar" is read from `config/app.json`; never hardcode it in screens.
- Keep the UI as readable and simple as possible (Sarper's request).
- Interface language is English; keep all user-facing text in `constants/strings.ts` for later translation.
- Region map is a city "puzzle" drawn from our own shapes: no street base map, no tile service, no Google Maps, no GADM data.
- Accounts are anonymous (Supabase anonymous sign-in) in the MVP; no email/password signup.
- Never store secrets in the repo; use `.env` (gitignored) and Supabase secrets.
- Never call JamBase except through `scripts/lib/jambase-client.mjs` or an equivalent guard: its plan bills extra calls instead of stopping. Hard limit is 900 calls per period.
