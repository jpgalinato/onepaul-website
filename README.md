# Onepaul | Multi-page Website Preview

A 14-page static Onepaul site using the **Contemporary Human** brand identity: forest green, lime, ivory, Sora, Inter and tagline-free vector branding.

## Sitemap

- `/` — Home
- `/about/` — About
  - `/about/team/` — Our Team
  - `/about/solutions/` — Our Solutions
  - `/about/industries/` — Industries We Support
    - `/about/industries/technology-startups/`
    - `/about/industries/finance-accounting/`
    - `/about/industries/health-insurance/`
  - `/about/disciplines/` — Our Disciplines
- `/resources/` — Resources
  - `/resources/articles/` — Articles & Insights
  - `/resources/case-studies/` — Case Studies
  - `/resources/team-builder/` — Team Builder & Calculator
- `/careers/` — Careers

## Hosting

Cloudflare Pages from branch `main`. Framework: **None**, build command: **blank**, output directory: **/**. Each page is an `index.html` file under its own folder.

The new site should be reviewed at its Cloudflare `pages.dev` address before switching the production domain.

## Functional scope

- Shared responsive navigation with expandable About and Resources menus.
- Indicative team calculator in `script.js` with inputs for headcount, gross monthly salary, additional employer cost percentage, allowances and editable assumed PHP/USD rate. Uses **US$500 per person/month** as the Onepaul fee; this must be reverified before launch.
- The site does **not** process leads or applications. Existing-site contact button is used pending verified enquiry integration.
- Case studies and team profiles explicitly await verified, approved content.
- Careers currently does not advertise vacancies or collect candidate details.
- Some photography is illustrative external stock photography, not actual Onepaul professionals.

## Before production cutover

1. Approve real people portraits and licences.
2. Verify commercial and employment terms, including the fee model.
3. Rebuild or recover the existing pricing calculator if all original features are required.
4. Connect a secure contact form, privacy terms, and recruitment listings.
5. Approve team biographies and verified case studies.
6. Test all pages, calculations, navigation, SEO, accessibility and mobile responsiveness on the Cloudflare preview.
7. Preserve the existing deployment and prepare rollback before changing `onepaul.net`.

See `DEPLOYMENT.md` for Cloudflare configuration.
