# Portfolio page-view counter

This is intentionally limited to one metric: total page views. It does not store IP addresses, user agents, referrers, visitor profiles, or individual visit events.

## Storage format

Cloudflare KV stores one JSON document at `portfolio:page-views`:

```json
{"pageViews":123,"updatedAt":"2026-10-23T12:00:00.000Z"}
```

`POST /` increments the total and returns the updated JSON. `GET /` reads the current total without incrementing it. The portfolio UI makes one POST when the page loads and displays only the count.

## Deploy

1. Install/authenticate Wrangler in your Cloudflare account.
2. From `workers/page-views`, run `npx wrangler kv namespace create PAGE_VIEWS`.
3. Copy the returned namespace ID into `wrangler.toml`, replacing `REPLACE_WITH_KV_NAMESPACE_ID`.
4. Replace `https://YOUR-PORTFOLIO-DOMAIN` with the exact deployed portfolio origin in `ALLOWED_ORIGINS`.
5. Run `npx wrangler deploy` from `workers/page-views`.
6. Set `VITE_PAGEVIEWS_API_URL` in the portfolio's build environment to the deployed Worker URL (for example `https://mtcx-portfolio-page-views.<your-subdomain>.workers.dev/`) and redeploy the portfolio.
7. Verify `GET <worker-url>` returns `{ "pageViews": 0, "updatedAt": null }`, then load the portfolio and verify the total increments.

## Notes

- KV is a small JSON key-value store and is suitable for a lightweight public counter. Concurrent visits can occasionally overwrite each other's increments because KV is not an atomic counter. For strict exact counts under high traffic, use a Durable Object or transactional database instead.
- Keep `ALLOWED_ORIGINS` restricted to the real portfolio origin(s). Requests without an Origin header are accepted for simple health checks; browser requests from unlisted origins are rejected.
- The counter is a public metric, not an authentication mechanism. The worker stores aggregate state only and exposes no arbitrary key/value write endpoint.
