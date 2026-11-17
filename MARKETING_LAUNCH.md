# Onepaul marketing launch plan — 17 November 2026

**Status:** preparation on `review/home-redesign-2026-11`; `main` must not be merged or production domain changed without final approval.

## Launch gates (mandatory)

1. **Enquiry capture:** configure Cloudflare Pages Functions with verified sender/destination email (Resend) and Cloudflare Turnstile; confirm POST success, inbox delivery, failure feedback, spam controls, consent and safe retention practices. Never put API credentials in GitHub. The form is currently deliberately disabled without configuration.
2. **Privacy:** have an approved privacy notice covering enquiries, email provider, analytics, cookies if used, retention and Australian/Philippine personal-data obligations as appropriate. Add a direct link next to the enquiry checkbox before live collection. This is subject to legal review, not automatically generated policy text.
3. **Analytics:** provision Google Analytics 4 with a company-owned property and appropriate data governance, or use Cloudflare Web Analytics for a simpler privacy-sensitive alternative. Record qualified enquiry successes and discovery meeting bookings; track calculator usage, CTA clicks and industry pages as secondary events. Avoid tracking names, emails, entered salaries or message bodies.
4. **SEO:** choose a single canonical domain (currently prepared as `https://onepaul.net/` pending DNS confirmation). Verify canonical tags, site titles/descriptions, social share preview, organisation structured data and sitemap; review all inner-page copy before broad indexing.
5. **Search Console:** verify the production domain property and submit `https://onepaul.net/sitemap.xml` only after domain migration and review. Use appropriate redirects from previous canonical versions. Monitor indexing and crawl errors.
6. **Performance/accessibility:** test desktop/mobile rendering, Core Web Vitals, image licences/sizes, navigation and keyboard access, form flow, contrast and usability. Replace conceptual photography with consented licensed photography where possible.
7. **Content:** team, careers and case studies currently contain placeholders; approve real photos/profiles, verify job listings and client permission before promoting or indexing those pages.
8. **Pricing/legal:** verify US$500/employee/month service fee, what fully loaded costs include, and the required conditions/exclusions.
9. **Domain and rollback:** maintain `main` and existing `onepaul.net` until the complete site is signed off; confirm both apex and www addresses, SSL, redirects, and recovery plan.

## Phase 1 changes made on this review branch

- Homepage canonical URL, OG URL/site/locale, simple Twitter card and honest Organization JSON-LD.
- `robots.txt` and `sitemap.xml` for substantive pages. Placeholder Team, Case Studies and Careers are intentionally absent from the sitemap, but **absence from a sitemap is NOT an indexing block**. Before launch, consider applying noindex on unfinished pages or completing them.
- No fake reviews, testimonials, credentials, analytics IDs, API keys or conversion events were added.

## Measurement blueprint

| Objective | Event / signal | Recommended channel | Notes |
|---|---|---|---|
| Qualified B2B leads | `generate_lead` on verified successful server submission | GA4 / CRM | **Never fire on CTA click or unverified form submit** |
| Discovery meetings | `book_appointment` after confirmed booking | GA4 / CRM | Requires booking integration |
| Team-cost consideration | `calculator_view`, `calculator_use` | GA4 | No salary or identifying information |
| Commercial interest | `cta_click` with a fixed CTA identifier | GA4 | Secondary event, not a lead |
| Organic visibility | Impressions/clicks, pages indexed, search queries | Search Console | Verify property after live cutover |
| Campaign attribution | Source/medium/campaign from UTM parameters | GA4 / CRM | Capture with consent and avoid personal identifiers |

## Marketing launch milestones

**Before any paid campaign:** working contact form + approved privacy notice + analytics conversions + complete destinations + live website QA.

**Next:** Australian-specific landing page copy and role/industry pages, downloadable resources, relevant original case studies, recruitment talent content, Google Search Console and an editorial publishing schedule.

**Later:** HubSpot connection, campaign attribution into CRM, and automated reporting for MQLs, SQLs and won clients.

## Accounts/details required from business owner

- Confirm official lead inbox and the sender domain/address Onepaul will use.
- Confirm legal business name, contact address, privacy contact and privacy-notice approver.
- Choose GA4 or Cloudflare Web Analytics; if GA4, provide the public GA4 Measurement ID (never passwords).
- Confirm production canonical domain should be `onepaul.net`, and who controls the DNS.
- Confirm whether current published US$500 fee is still approved.

Do **not** paste Resend keys or Turnstile secrets into chat. Configure them as encrypted Cloudflare variables.
