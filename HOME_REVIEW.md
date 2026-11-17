# Home page redesign — review branch

Branch: `review/home-redesign-2026-11`  
Production branch: `main` (unchanged)

## What changed
- Replaced old Home page markup with a photographic split hero and editorial Contemporary Human design.
- Replaced the repeated legacy navigation overrides **on the Home page** with a self-contained `home-redesign.css` and accessible native disclosure menus controlled by `home-redesign.js`.
- Redesigned Home page sections: brand promise, value, industries, disciplines, four-step process, transparent pricing, people-led storytelling, resources and enquiry.
- Added a structured B2B enquiry form, a Cloudflare Pages Function endpoint and a status/config endpoint.

## Review checklist
- [ ] Desktop (1440px and 1024px): dropdowns closed at load; click About and Resources separately; menu overlays content without shifting header.
- [ ] Tablet and mobile (768px, 390px, 320px): hamburger opens and closes; nested menus expand; no horizontal overflow.
- [ ] Check hero photo cropping, contrast and accurate placement at each viewport.
- [ ] Verify all internal links and section anchors.
- [ ] Verify keyboard Tab, Enter, Space and Escape interactions.
- [ ] Confirm pricing model and legal/commercial wording.
- [ ] Approve/licence photography and replace concept stock photos with consented actual Onepaul people photography before production.
- [ ] Connect and verify the lead delivery service; conduct a real email test and privacy/security review before production.
- [ ] Confirm future rollout of shared header into the inner pages in the next page-by-page phase.

## Lead form configuration — not yet live
The lead form is intentionally **disabled until configured**. The app requires:
- `RESEND_API_KEY` (secret)
- `LEADS_TO_EMAIL` (approved destination)
- `LEADS_FROM_EMAIL` (verified sender domain/address)
- `TURNSTILE_SITE_KEY` (public site key)
- `TURNSTILE_SECRET_KEY` (secret)

Set these in **Cloudflare Pages → project → Settings → Variables and Secrets**. Never commit keys to the repository. Use a verified sender domain with Resend. Make sure Turnstile accepts the exact preview and production hostnames before testing. The server validates Turnstile tokens using the Siteverify endpoint, and the form does not store contact records in a database.

The frontend calls `GET /api/form-config`; if requirements are absent, the submit button remains disabled with an explicit status. In a configured environment, Turnstile is rendered and the form posts to `POST /api/enquiry`. The endpoint validates fields, consent and origin, verifies Turnstile and only then attempts a transactional email.

Before enabling live enquiries, publish a privacy notice, confirm data retention processes with your email provider, and perform a deliverability and abuse-protection review. The current form is a **review implementation**, not a live lead-processing system.

## Deployment
Do not merge until approved. If Cloudflare Pages automatically creates Git branch previews, find the deployment associated with `review/home-redesign-2026-11` in Cloudflare → Workers & Pages → project → Deployments. Otherwise review through the GitHub pull request diff; do **not** switch `onepaul.net` or the production branch.

## Scope
Only the Home page has been visually redesigned. Other internal pages still use the original shared site styles and will be reviewed individually later. The revised top navigation on Home points to those existing pages.
