# Launch Runbook — bitcoiners.africa DNS Cutover

Use this runbook for STEP 26: switching production DNS from WordPress to the new Next.js site.

## Pre-cutover (day before)

```bash
# 1. Verify deployment is healthy on staging
QA_BASE_URL=https://<your-render-url>.onrender.com pnpm qa

# 2. Import any new WP posts since last migration
pnpm launch:precheck -- --since=2026-06-01

# 3. Regenerate redirects if URLs changed
pnpm redirects:generate

# 4. Sync French locale content (if not done)
PAYLOAD_PUSH=true pnpm seed:locale

# 5. Run launch checklist
pnpm launch:precheck
```

**Manual:**
- [ ] Full WordPress backup via hosting provider
- [ ] Inform team of content freeze window (recommend 2–4 hours)
- [ ] Confirm all Render environment variables match `.env.example`
- [ ] Set `NEXT_PUBLIC_SERVER_URL=https://bitcoiners.africa` on Render
- [ ] Set `STORAGE_ADAPTER=r2` and R2 credentials on Render

## DNS cutover (low-traffic window)

1. **Render:** Add custom domain `bitcoiners.africa` and `www.bitcoiners.africa` in service settings.
2. **Cloudflare DNS** (or your DNS provider):
   - `bitcoiners.africa` → CNAME to Render target (e.g. `african-bitcoiners.onrender.com`)
   - `www` → CNAME to same target (or redirect www → apex)
3. Wait for SSL certificate to provision (Render auto-provisions Let's Encrypt).
4. Verify: `curl -I https://bitcoiners.africa` returns 200.

## Post-cutover (first 24 hours)

- [ ] Homepage and 20 key pages load (see `pnpm qa` smoke paths)
- [ ] `/admin` login works for team
- [ ] Submit test contact form and newsletter signup
- [ ] Test course signup flow on `/learn-bitcoin/free-bitcoin-course/`
- [ ] Verify donation flow (Blink/BTCPay invoice creation)
- [ ] Update **Blink webhook** URL to `https://bitcoiners.africa/api/webhooks/blink`
- [ ] Submit sitemap in Google Search Console: `https://bitcoiners.africa/sitemap.xml`
- [ ] Confirm GTM/GA4 firing in browser Network tab
- [ ] Monitor Render logs for errors

## Post-launch (first 2 weeks)

- Daily: Google Search Console crawl errors, GA4 traffic trends
- Triage bugs from team via normal channels
- Performance tuning via Render metrics (response times, memory)
- Document issues for retrospective

## Rollback plan

If critical issues occur within the first hour:

1. Revert DNS A/CNAME records to WordPress hosting IP/target.
2. DNS TTL may take 5–60 minutes to propagate.
3. WordPress backup remains available from pre-cutover step.

## Key URLs after launch

| Resource | URL |
|----------|-----|
| Public site | https://bitcoiners.africa |
| CMS admin | https://bitcoiners.africa/admin |
| Sitemap | https://bitcoiners.africa/sitemap.xml |
| Import tool | https://bitcoiners.africa/admin/import-data |
| Database panel | https://bitcoiners.africa/admin/database |
