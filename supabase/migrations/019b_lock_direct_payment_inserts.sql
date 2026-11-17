-- 019b_lock_direct_payment_inserts
--
-- NOT YET APPLIED. Run only AFTER the frontend that calls record_payment()
-- is deployed — the old build inserts into payments directly and would stop
-- being able to record payments.
--
-- After this, record_payment() (SECURITY DEFINER) is the only way to create
-- a payment row, so the amount always comes from the ticket's stored total.
-- Proof photos are unaffected: upload-wash-proof writes proof_url with the
-- service role.

drop policy if exists "payments: active users can insert" on public.payments;
