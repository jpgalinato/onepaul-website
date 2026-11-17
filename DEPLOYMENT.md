# Cloudflare Pages setup

1. Open Cloudflare dashboard, Workers & Pages → Create application → Pages → Connect to Git.
2. Authorise GitHub and select `jpgalinato/onepaul-website`.
3. Select production branch `main`.
4. Framework preset: None. Build command: leave empty. Build output directory: `/` (repository root).
5. Deploy and open the resulting `*.pages.dev` URL for review.
6. Keep `onepaul.net` on the existing Cloudflare project until the preview is approved, forms and calculator are rebuilt, and a rollback is planned.
7. After acceptance, associate the custom domain with the new Pages project and follow Cloudflare's presented DNS instructions. Check both www and apex routing, SSL, forms, mobile layout and SEO.

## Important limitations
The preview does not include functional enquiry submissions or the former pricing calculator and legal/resource pages. It is not ready to replace the live site.