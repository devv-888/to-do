# Backend delivery API

Copy `.env.example` to `.env`, install dependencies, then run `npm run dev`. Without Supabase credentials, `DEMO_MODE=true` serves seeded in-memory accounts: `customer@demo.local / DemoPass123!`, `driver@demo.local / DemoPass123!`, and `admin@demo.local / AdminPass123!`.

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor before connecting a production database. Use a server-side service key only; never expose it to the frontend. Add a scheduled job to delete `delivery_locations` older than `LOCATION_RETENTION_DAYS`.
