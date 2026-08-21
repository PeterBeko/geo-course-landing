# Consent and Tracking Implementation

## Cookiebot role

Cookiebot is the consent authority for `course.audituniversepro.com`. The site uses the direct Cookiebot CMP script with automatic blocking enabled:

- CBID: `b3fb07c6-2cf8-43d1-b99d-636c72f38f64`
- Blocking mode: `auto`

Cookiebot controls marketing-tag execution through `type="text/plain"` and `data-cookieconsent="marketing"` for scripts that must not run before marketing consent.

## GA4 Measurement ID

Google Analytics 4 uses:

- `G-MK1WCW3K7T`

The Google tag loads with Google Consent Mode v2 defaults set before `gtag.js`.

## Meta Pixel ID

Meta Pixel uses:

- `1024464877094858`

The Pixel is gated behind Cookiebot marketing consent. No noscript tracking pixel is included because it cannot be reliably consent-gated on this static page.

## MailerLite consent behavior

The MailerLite Universal loader remains configured with:

- Account ID: `2505582`
- Form embed: `<div class="ml-embedded" data-form="h9bPYz"></div>`

The loader is disabled by default with `type="text/plain"` and only enabled by Cookiebot after marketing consent. This prevents MailerLite marketing storage such as `ml_guid` from being created before marketing consent.

When marketing consent is absent, the form card shows a non-tracking fallback message and a button that opens Cookiebot preferences. The fallback does not submit data, does not imply consent, and disappears when marketing consent is present and the embedded MailerLite form can load.

## Consent category matrix

| Category | GA4 | MailerLite | Meta Pixel |
| --- | --- | --- | --- |
| Necessary only | Consent Mode denied storage; cookieless Google behavior may occur if supported | Not loaded | Not loaded |
| Statistics | Analytics consent may be granted by Cookiebot/Google Consent Mode | Not loaded | Not loaded |
| Marketing | Ad-related consent may be granted by Cookiebot/Google Consent Mode | Loaded once | Loaded once and sends one PageView |

## Script loading order

1. Google Consent Mode bootstrap with denied defaults and `data-cookieconsent="ignore"`.
2. Cookiebot CMP with automatic blocking.
3. Google tag `gtag.js` for `G-MK1WCW3K7T`, also ignored by Cookiebot so Consent Mode can govern it.
4. GA4 config call.
5. Local consent-state helper for Meta consent synchronization and form fallback UI.
6. Cookiebot-gated Meta Pixel script, requiring marketing consent.
7. JSON-LD structured data.
8. Cookiebot-gated MailerLite Universal loader, requiring marketing consent.
9. Site `script.js`.

This order reconciles the two first-party requirements: Consent Mode defaults execute before `gtag.js`, while the Cookiebot CMP loads before cookie-setting resources and controls consent-gated marketing scripts.

## Cookiebot event/callback mechanism used

The implementation relies on Cookiebot's documented prior-consent script execution via:

- `type="text/plain"`
- `data-cookieconsent="marketing"`

No custom Google consent update listener is used. Cookiebot's direct CMP integration sends the appropriate Google Consent Mode signals after consent submission. Cookiebot executes marked scripts when the required consent category is present.

The local helper listens to `CookiebotOnConsentReady`, `CookiebotOnAccept` and `CookiebotOnDecline` only for non-Google behaviors:

- it calls Meta Pixel consent `grant` or `revoke` after `fbq` exists;
- it toggles the MailerLite fallback UI based on marketing consent.

It does not send custom Google Consent Mode updates.

## Idempotence safeguards

The gated loaders include guards:

- `window.__aupMetaPixelInitialized`
- `window.__aupMailerLiteLoaded`

These prevent duplicate Meta bootstrap/init/PageView calls and duplicate MailerLite loader/account initialization if Cookiebot executes consent-gated tags more than once during a session.

The Meta Pixel lifecycle is:

- before initial marketing consent, `fbevents.js` is not loaded and no Meta PageView can be sent;
- when marketing consent is granted and Cookiebot executes the gated script, the Pixel is initialized once, Meta consent is granted, and one PageView is sent;
- if marketing consent is later withdrawn in the same session, the helper calls `fbq('consent', 'revoke')` when `fbq` exists;
- if marketing consent is re-granted, the helper calls `fbq('consent', 'grant')` without reinitializing the Pixel or sending a second automatic PageView.

Google and Cookiebot documentation supports region-specific consent defaults plus a general fallback. This PR deliberately uses global denied defaults as a conservative privacy baseline during the measurement-validation phase, not because region-specific defaults are inherently invalid.

## Testing procedure

Use a clean Incognito window or clear cookies, localStorage and sessionStorage for `course.audituniversepro.com`.

Test:

1. Fresh visit with no consent decision.
2. Reject optional cookies / necessary only.
3. Statistics-only consent, if the Cookiebot UI supports category-level selection.
4. Accept all / marketing granted.
5. Withdraw marketing consent through Cookiebot preferences.
6. Reload after denied consent.
7. Reload after granted marketing consent.
8. Payhip CTA link behavior without completing checkout.
9. MailerLite form rendering and non-production-safe verification.

## Limitations

Local static tests can verify script markup, ordering and duplicate guards. They cannot prove Cookiebot scanner results, GA4 Realtime data, Meta Events Manager delivery, or MailerLite production form behavior after deployment.

If a user grants marketing consent and later withdraws it without a page reload, third-party libraries already loaded by consent may not physically delete their existing storage immediately. The implementation prevents first-load and reload execution without marketing consent; post-withdrawal deletion must be verified live with Cookiebot and vendor behavior.

## How to repeat a consent test in Incognito

1. Open a fresh Incognito window.
2. Visit `https://course.audituniversepro.com/`.
3. Open DevTools > Application.
4. Inspect Cookies, Local Storage and Session Storage for the domain.
5. Confirm only necessary consent storage exists before consent.
6. Apply each consent choice and re-check storage and network requests.

## How to verify Meta Pixel in browser devtools

Before marketing consent:

- No request to `https://connect.facebook.net/en_US/fbevents.js`.
- No `facebook.com/tr` PageView request.
- No `_fbp` or `_fbc` cookie caused by the page.

After marketing consent:

- One request to `connect.facebook.net/en_US/fbevents.js`.
- Pixel ID `1024464877094858`.
- One PageView event.

## How to verify GA4

Use Google Tag Assistant and GA4 Realtime after deployment.

Verify:

- Default consent is denied before user action.
- Consent updates reflect Cookiebot selections.
- GA4 uses `G-MK1WCW3K7T`.
- Payhip links retain Google linker behavior where relevant.

## Expected Cookiebot re-scan result

The next Cookiebot scan should not report MailerLite `ml_guid` as a marketing storage item with `Blocked until accepted by user: No`.

## Official documentation references used

- Cookiebot Support: Implementing Google consent mode - https://support.cookiebot.com/hc/en-us/articles/360016047000-Implementing-Google-consent-mode
- Cookiebot Support: Manual cookie blocking - https://support.cookiebot.com/hc/en-us/articles/4405978132242-Manual-cookie-blocking
- Cookiebot Support: Blocking cookies - https://support.cookiebot.com/hc/en-us/articles/360021304979-Blocking-cookies
- Cookiebot Developer Resources - https://www.cookiebot.com/en/developer/
- Google for Developers: Set up consent mode on websites - https://developers.google.com/tag-platform/security/guides/consent
- Google Analytics Help: Set up Cookiebot to obtain user consent - https://support.google.com/analytics/answer/14546767
- MailerLite Help: Which cookies are used by MailerLite forms - https://www.mailerlite.com/help/which-cookies-are-used-by-mailerlite-forms
- MailerLite Legal: Cookie Policy - https://www.mailerlite.com/legal/cookie-policy
- Meta for Developers: Meta Pixel get started - https://developers.facebook.com/docs/meta-pixel/get-started/
- Meta Help Center: Cookies on Meta Products - https://www.facebook.com/help/336858938174917/
