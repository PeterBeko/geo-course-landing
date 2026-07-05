# GEO Decision Course Landing Page

Static waitlist landing page for `course.audituniversepro.com`.

## Files

- `index.html` - one-page English landing page
- `style.css` - responsive, dependency-free styling
- `script.js` - minimal reveal and fallback form behavior
- `robots.txt` - crawler access and sitemap reference
- `sitemap.xml` - canonical sitemap entry
- `llms.txt` - concise AI-readable page context
- `CNAME` - GitHub Pages custom domain

## Human TODOs for Peter

- Add the MailerLite embed code where `<!-- MAILERLITE EMBED CODE HERE -->` appears in `index.html`.
- Replace the fallback form action with the final MailerLite endpoint or remove the fallback form after embedding MailerLite.
- Confirm the six course module titles.
- Confirm the launch date.
- Confirm when public pricing should be shown. No price is currently displayed.
- Add the final `decision-triage-logo.png` if a dedicated logo asset is created.
- Optional: add a GoatCounter analytics snippet after the account ID is available.

## DNS and GitHub Pages setup

1. In the DNS provider, create a CNAME record:
   - Host: `course`
   - Target: `PeterBeko.github.io`
2. In GitHub Pages, set the source to:
   - Deploy from branch
   - Branch: `main`
   - Folder: `/root`
3. After DNS propagation, enable `Enforce HTTPS` in GitHub Pages settings.

## QA checklist

- Open the page on mobile and desktop.
- Confirm the CTA scrolls to the waitlist form.
- Confirm the fallback form does not submit until MailerLite is connected.
- Check title, meta description, canonical, Open Graph and JSON-LD.
- Confirm these URLs load after deployment:
  - `https://course.audituniversepro.com/robots.txt`
  - `https://course.audituniversepro.com/sitemap.xml`
  - `https://course.audituniversepro.com/llms.txt`
