# Cloudflare Turnstile Integration

This document describes the Turnstile captcha integration on the Contact page.

## Overview

Turnstile is Cloudflare's intelligent bot management solution integrated into the contact form to prevent spam submissions. It:

- **Detects bots** — Uses machine learning and behavioral analysis to identify spam
- **Challenges when needed** — Only shows interactive challenges to suspicious traffic
- **Theme-aware** — Automatically uses dark or light theme based on active site theme
- **User-friendly** — Typically requires just a single click for legitimate users

## Setup

### 1. Get a Turnstile Site Key

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** section
3. Click **Create Site**
4. Enter site name: `"Milliform Contact Form"`
5. Select domain: Your production domain (e.g., `milliform.co.uk`)
6. Copy the **Site Key** (not Secret Key)

### 2. Configure Environment Variable

Create a `.env` file in the project root (copy from `.env.example`):

```bash
REACT_APP_TURNSTILE_SITE_KEY=your_site_key_here
```

**For local development:** Add to `.env`
**For production:** Set as environment variable in your hosting platform:
- **Cloudflare Pages:** Environment Variables in project settings
- **Vercel:** Environment Variables in project settings
- **GitHub Pages:** GitHub Secrets (if using Actions)

### 3. Test the Integration

1. Start the development server: `npm start`
2. Navigate to `/contact`
3. You should see a Turnstile checkbox widget
4. Try submitting the form without clicking it — should show an alert
5. Click the Turnstile widget, then submit — should work

## How It Works

### Component Structure

```
Contact.js
  ├─ TurnstileWidget.js (renders the captcha)
  │   └─ TurnstileWidget.css (styling)
  └─ Form submission validates Turnstile token
```

### Form Submission Flow

```
User fills form
    ↓
User clicks "Send enquiry"
    ↓
Form validation checks:
  • All required fields present?
  • Turnstile token present? ← NEW
    ↓
If validation passes:
  • Pre-fill mailto with form data
  • Open user's email client
  • Show success message
  • Reset form and Turnstile widget
    ↓
If Turnstile fails:
  • Show alert: "Please complete the captcha verification"
  • Keep form as-is for retry
```

## Customization

### Theme Awareness

Turnstile automatically adapts to the site's active theme:

| Theme | Turnstile Appearance |
|---|---|
| `darkNight` | Dark theme (dark background, light text) |
| `darkDesert` | Dark theme (dark background, light text) |
| `light` | Light theme (light background, dark text) |

The theme detection is automatic based on `ACTIVE_THEME` in `src/config/siteConfig.js`. No manual configuration needed.

### Styling

The Turnstile widget container is styled in `src/components/TurnstileWidget.css`:

```css
.turnstile-container {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
```

To adjust:
- **Spacing:** Modify `margin` value
- **Alignment:** Change `justify-content` (center, flex-start, flex-end)
- **Width:** Add `max-width` constraint

### Widget Customization via Props

The TurnstileWidget component accepts props to customize behavior:

```jsx
<TurnstileWidget
  onTokenChange={setTurnstileToken}
  size="compact"              // 'normal' | 'compact'
  appearance="always"         // 'always' | 'execute' | 'interaction-only'
  language="en"               // 'en' | 'de' | 'fr' | 'es' | etc.
/>
```

**Available Props:**

| Prop | Type | Default | Description |
|---|---|---|---|
| `onTokenChange` | function | `() => {}` | Callback when token changes |
| `size` | string | `'normal'` | Widget size (`'normal'` or `'compact'`) |
| `appearance` | string | `'always'` | When to show (`'always'`, `'execute'`, `'interaction-only'`) |
| `language` | string | `'en'` | Language code (ISO 639-1) |

**Examples:**

```jsx
// Compact widget for mobile
<TurnstileWidget
  onTokenChange={setToken}
  size="compact"
  appearance="interaction-only"
/>

// Invisible challenge (auto-runs)
<TurnstileWidget
  onTokenChange={setToken}
  appearance="execute"
/>

// German language
<TurnstileWidget
  onTokenChange={setToken}
  language="de"
/>

// Multiple languages
<TurnstileWidget
  onTokenChange={setToken}
  language={navigator.language || 'en'}  // Auto-detect from browser
/>
```

### Advanced Widget Options

Edit `src/components/TurnstileWidget.js` for more control:

```javascript
window.turnstile.render(container, {
  sitekey: siteKey,
  theme: isDarkTheme ? 'dark' : 'light',
  size,
  appearance,
  language,
  tabindex: 0,                    // Tab order
  retry: 'auto',                  // Auto-retry on failure
  'auto-reset-on-expire': true,   // Reset expired tokens
  'aria-label': 'Captcha verification',  // Accessibility label
  callback: (token) => { /* success */ },
  'error-callback': () => { /* error */ },
  'expired-callback': () => { /* token expired */ },
  'timeout-callback': () => { /* challenge timeout */ },
});
```

## Security Notes

### Token Handling

- **Frontend validation:** User must complete Turnstile (browser-side)
- **No backend validation:** Since this is a static site with mailto, the token isn't verified server-side
- **For real form submission:** If you add a backend in future, verify token with Cloudflare API:

```bash
curl -X POST https://challenges.cloudflare.com/turnstile/v0/siteverify \
  -d "secret=YOUR_SECRET_KEY&response=TOKEN"
```

### Secret Key Security

- **Never expose** the Secret Key in frontend code or environment variables
- **Secret Key only** goes on backend servers
- Store it securely in your hosting platform's secret manager

### Privacy

Turnstile respects user privacy:
- No tracking cookies
- No analytics collection
- GDPR compliant
- See [Cloudflare Turnstile Privacy](https://developers.cloudflare.com/turnstile/faq/#does-turnstile-use-cookies)

## Troubleshooting

### "Turnstile script not loaded" error

**Issue:** Console shows "Turnstile script not loaded"
**Solution:** Verify script tag is in `public/index.html`:
```html
<script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
  async
  defer
></script>
```

### "Site key not configured" error

**Issue:** Console shows "Turnstile site key not configured"
**Solution:**
1. Check `.env` file has `REACT_APP_TURNSTILE_SITE_KEY=...`
2. Restart dev server after changing `.env`
3. Verify no typos in environment variable name

### Widget not appearing

**Issue:** Form loads but Turnstile widget doesn't show
**Possible causes:**
- Invalid site key — Check Cloudflare dashboard
- Script not loaded — Check browser Network tab
- JavaScript error — Check browser Console

**Debug steps:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for `api.js` load status
4. Try hard refresh (Ctrl+Shift+R)

### Dark theme not applying

**Issue:** Widget shows light theme even though site is dark
**Solution:**
1. Verify `ACTIVE_THEME` is set to `darkNight` or `darkDesert` in `src/config/siteConfig.js`
2. Hard refresh browser
3. Check DevTools: should see `isDarkTheme = true` in component logic

### Form submission doesn't work

**Issue:** Clicking "Send enquiry" doesn't open email client
**Possible causes:**
- Turnstile token is null — Click widget first
- Form validation failed — Check required fields

**Debug:**
1. Fill all form fields completely
2. Click Turnstile widget (should show checkmark)
3. Try submitting again
4. If alert appears, token wasn't captured

## Usage in Contact Form

Currently, the Contact form uses the default configuration:

```jsx
<TurnstileWidget
  ref={turnstileRef}
  onTokenChange={setTurnstileToken}
/>
```

To customize for your use case, update `src/pages/Contact.js`:

```jsx
// Compact mode (better for mobile)
<TurnstileWidget
  ref={turnstileRef}
  onTokenChange={setTurnstileToken}
  size="compact"
  appearance="interaction-only"
/>

// With language auto-detection
<TurnstileWidget
  ref={turnstileRef}
  onTokenChange={setTurnstileToken}
  language={navigator.language || 'en'}
/>

// Invisible challenge (auto-validates, no user interaction needed)
<TurnstileWidget
  ref={turnstileRef}
  onTokenChange={setTurnstileToken}
  appearance="execute"
/>
```

## Files

- **src/components/TurnstileWidget.js** — Component rendering Turnstile with customizable props
- **src/components/TurnstileWidget.css** — Widget styling
- **src/pages/Contact.js** — Form with Turnstile integration
- **public/index.html** — Turnstile script tag
- **.env.example** — Environment variable template
- **TURNSTILE.md** — This documentation

## Related Documentation

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Turnstile Client-Side Rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
- [Turnstile FAQ](https://developers.cloudflare.com/turnstile/faq/)
