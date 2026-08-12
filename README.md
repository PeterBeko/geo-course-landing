# GEO Decision Course Landing Page

Static live sales landing page for `course.audituniversepro.com`.

## Files

- `index.html` - one-page English landing page
- `style.css` - responsive, dependency-free styling
- `script.js` - minimal reveal and smooth-scroll behavior
- `robots.txt` - crawler access and sitemap reference
- `sitemap.xml` - canonical sitemap entry
- `llms.txt` - concise AI-readable page context
- `CNAME` - GitHub Pages custom domain

## Live offer

- Product: GEO Decision Course
- Price: `$299 USD`
- Payment: one-time payment
- Access: lifetime access
- Purchase destination: `https://payhip.com/b/qLWwc`
- Free resource: AI Visibility Triage via MailerLite embed

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
- Confirm purchase CTAs open the Payhip product page.
- Confirm the free AI Visibility Triage MailerLite embed renders.
- Check title, meta description, canonical, Open Graph and JSON-LD.
- Confirm these URLs load after deployment:
  - `https://course.audituniversepro.com/robots.txt`
  - `https://course.audituniversepro.com/sitemap.xml`
  - `https://course.audituniversepro.com/llms.txt`
