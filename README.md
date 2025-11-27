# AMACA_supabase_social

This is a ready-to-deploy React + Vite + Tailwind project connected to Supabase for Auth, CRUD, and Storage (images/videos).

## What is included

- React + Vite app
- Tailwind CSS
- Supabase integration (@supabase/supabase-js)
- `supabase/init.sql` with table and RLS policies
- `.env.example` and `netlify.toml` for Netlify deploy

## Setup (local)

1. Copy `.env.example` to `.env` and set your Supabase URL and ANON KEY.

```
cp .env.example .env
# edit .env
```

2. Install and run

```
npm install
npm run dev
```

3. Supabase setup

- Create a Supabase project at https://app.supabase.com
- In the SQL editor, run the contents of `supabase/init.sql`
- Create a Storage bucket named `uploads`. For this assignment use **public** access so uploaded media are easy to serve with `getPublicUrl`. If you want more security, use private and signed URLs.
- In Supabase > Authentication > Settings, enable email sign-ups.

4. Netlify deploy

- Push this repo to GitHub.
- In Netlify, create new site from Git and connect the repo.
- Set two environment variables in Netlify Site Settings:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Add build command `npm run build` and publish directory `dist` (already set in `netlify.toml`).

## Submission
- Deploy to Netlify and submit the Netlify link before **October 24, 2025, midnight**.
- Use submission name: `AMACA_supabase_social`.

---

If you want, I can also:
- Split the project into more components or add unit tests
- Provide a ready-made GitHub repo with a commit history
- Change storage to private + signed URLs

Tell me which and I'll update the ZIP.
