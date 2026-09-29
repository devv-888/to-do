# ParcelPulse delivery tracking platform

`frontend-delivery` is a Vite/React client and `backend-delivery` is an Express API. The client communicates only with the API; server credentials never enter the browser bundle.

## Quick start

1. Copy each `.env.example` to `.env` and set `JWT_SECRET` to a long random value.
2. In one terminal, run `cd backend-delivery`, `npm install`, and `npm run dev`.
3. In another, run `cd frontend-delivery`, `npm install`, and `npm run dev`.

For development without cloud credentials, leave `DEMO_MODE=true`. The dashboard offers seeded customer, driver, and admin accounts described in the backend README. For Supabase, apply [the initial schema](backend-delivery/supabase/migrations/001_initial_schema.sql), configure server-only credentials, and complete the corresponding authentication/JWT-claim integration before production use.

## Included flow

Customers see only their delivery and its latest authorized driver location. Drivers see assigned deliveries, start state transitions, opt in to browser GPS sharing only while out for delivery, and can use basic voice commands. API endpoints enforce JWT identity and role/ownership checks; location reads and writes are protected. The client refreshes tracking state periodically as a development fallback; replace that polling with a Supabase Realtime subscription when the project is connected to a Supabase instance.
