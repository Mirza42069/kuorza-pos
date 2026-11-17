-- 018b_lock_direct_ticket_inserts
--
-- NOT YET APPLIED. Run this only AFTER the frontend that calls
-- create_treatment() is deployed to Vercel — the old build inserts into these
-- tables directly and would stop being able to create tickets.
--
-- Until this runs, create_treatment() exists but nothing stops a signed-in
-- user from bypassing it with direct inserts (and their own prices). After
-- it, the only way to create a ticket or its lines is the RPC, which is
-- SECURITY DEFINER and so doesn't need these policies.
--
-- payments keeps its insert policy: recordPayment() still inserts directly
-- when settling a ticket that was queued unpaid.

drop policy if exists "treatments: active users can insert" on public.treatments;
drop policy if exists "treatment_items: active users can insert" on public.treatment_items;
