# Milliform

Marketing site for **Milliform** — bespoke stainless steel countertops. Config-driven,
responsive React. Re-skin the entire site by editing one file, then deploy free to
GitHub Pages and/or Cloudflare Pages.

## Quick start

```bash
npm install
npm start          # dev server at http://localhost:3000
npm run build      # production build → ./build
```

## Editing content (no code required)

Everything lives in **[`src/config/siteConfig.js`](src/config/siteConfig.js)** — copy, images,
contact details, navigation, themes and animation toggles. Components read from it; they never
hardcode content.

| Goal | Where in `siteConfig.js` |
|------|--------------------------|
| Brand name / SEO | `siteInfo` |
| Switch theme (light ⇄ dark) | `ACTIVE_THEME` |
| Tune colours | `lightTheme.colors` / `darkTheme.colors` |
| Turn all motion off | `animationConfig.enabled = false` |
| Fonts | `typography.fonts` + the `<link>` in `public/index.html` |
| Contact / map / social | `contactInfo` |
| Hero / homepage | `homepage` |
| Finishes (filter grid) | `collections.items` — each `category` must be in `collections.filters` |
| Selected work (modal cards) | `projects.items` |
| About / timeline | `about` |
| Nav & footer | `navigation` — each `path` must match a `<Route>` in `src/App.js` |

### Themes

Two themes ship in `siteConfig.js`. Switch with one line:

```js
export const ACTIVE_THEME = 'light'; // 'light' (warm sand) | 'dark' (charcoal & brass)
```

The active theme's colour tokens are pushed onto CSS custom properties (`--accent`, …) at runtime
by `src/context/ThemeContext.js`, so components style themselves with `var(--accent)` and never
import the config directly.

### Images

Drop assets into `public/images/` using the paths referenced in `siteConfig.js`
(e.g. `/images/finish-praline.webp`). **Until real photos exist, every image gracefully falls back
to a brushed-steel gradient** (see `src/components/SteelImage.js`), so the layout never breaks.
Prefer WebP; images are lazy-loaded automatically.

#### Generate imagery with Nano Banana (Gemini 2.5 Flash Image)

A script generates all 15 site images (kitchen scenes + macro finish textures), crops them to the
exact layout dimensions, and writes WebP files into `public/images/`.

```bash
# 1. get a key at https://aistudio.google.com/apikey, then:
echo "GEMINI_API_KEY=your_key_here" > .env       # .env is gitignored

# 2. generate
npm run gen:images                 # only images that don't exist yet
npm run gen:images -- --force      # regenerate everything
npm run gen:images -- hero finish-praline   # just specific files
```

Edit the prompts in [`scripts/image-manifest.mjs`](scripts/image-manifest.mjs) to change the look.
Generation is a billed Google API call (~15 images per full run).

## Deployment

A single `npm run build` artifact deploys to either host.

### Cloudflare Pages (root domain / `*.pages.dev`)
1. Dashboard → Pages → Connect to Git → select this repo.
2. Framework preset **Create React App**, build command `npm run build`, output dir `build`.
3. SPA fallback is handled by `public/_redirects`; security headers by `public/_headers`.
4. Router `basename` resolves from `PUBLIC_URL` (empty at root) → `/`. No change needed.

CLI alternative:
```bash
npm i -g wrangler && wrangler login
npm run deploy:cf
```

### GitHub Pages (`https://<user>.github.io/milliform-countertop`)
1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Push to `main` — [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with
   `npm run build:ghpages`, which sets `PUBLIC_URL=/milliform-countertop` so the router `basename`
   and asset URLs match the subpath.
3. Deep-link refreshes are handled by `public/404.html` + the restore snippet in
   `public/index.html`.

> **Shipping both?** A custom domain on both hosts (root path) lets a single `basename="/"` work
> everywhere. The GH Pages subpath only needs the `build:ghpages` script — Cloudflare uses the
> plain `build`.

## Project structure

```
src/
├── config/siteConfig.js      🎯 all content, themes, toggles
├── context/ThemeContext.js   applies theme + motion tokens to CSS vars
├── hooks/useReveal.js        scroll-reveal (IntersectionObserver)
├── components/               Header, Footer, SteelImage, ScrollToTop
├── pages/                    Home, Collections, Projects, About, Contact
├── App.js                    router + routes (basename from PUBLIC_URL)
└── index.css                 CSS-var defaults + global resets
```

## Accessibility & motion

- All animations are gated behind `animationConfig.enabled` **and** honour the OS
  `prefers-reduced-motion: reduce` setting.
- Colour tokens are tuned for AA-or-better contrast in both themes.
