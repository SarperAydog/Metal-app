# Gigdar

Project rules: `CLAUDE.md`. Stages: `docs/roadmap.md`.

## First-time setup

Install the project's packages:

```bash
npm install
```

Fill in `.env` (never committed). Supabase values are under Project Settings > API Keys (Project URL and the publishable key). Never use the secret key here:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `TICKETMASTER_API_KEY`

In the Supabase dashboard:

1. Authentication > Sign In / Providers: turn on anonymous sign-ins.
2. SQL Editor: run each file in `supabase/migrations/` in order.

## Test on the computer

In the browser (fastest; no push notifications):

```bash
npm run web
```

Then open the address it prints, usually http://localhost:8081. To see a phone-sized screen, press F12 and turn on the device toolbar.

On a virtual Android phone (needs Android Studio with a running emulator):

```bash
npm run android
```

## Test on a phone

Start the project, then scan the QR code with Expo Go:

```bash
npm start
```

## Checks

```bash
npx tsc --noEmit
```

```bash
npx expo-doctor
```
