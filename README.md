# MedInfra website

Astro 7 + Tailwind CSS 4. Static output, so it works on any host.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run frames` | Re-generate the scroll-film frame sequences from `src/assets/video/*.mp4` |
| `npm run icons` | Re-generate favicons, app icons and social (Open Graph) images |

`frames` and `icons` only need running again if the videos or logo change; their output in `public/` is committed.

## Where things live

```
src/
  data/site.ts         Company details: address, phone, email, hours, navigation
  data/solutions.ts    The nine solutions: copy, scope lists and SEO titles/descriptions
  data/company.ts      Delivery stages, disciplines, sectors, reasons, film captions, form options
  content/insights/    Insight articles (Markdown). Add a .md file to publish a new article
  pages/               One file per URL (solutions/[slug] and insights/[id] generate many pages)
  components/          Header, Footer, ScrollFilm, PageHero, CtaBand, Seo, sections/*
  scripts/motion.ts    Smooth scrolling (Lenis), reveal-on-scroll, parallax
  scripts/film.ts      Scroll-scrubbed canvas film engine
  styles/global.css    Design tokens (colours, fonts, shadows) and shared component styles
public/frames/         WebP frame sequences + posters for the two films
```

## Scroll films

The two videos are converted to WebP frame sequences (141 frames each, a desktop set and a mobile set) and painted on a
`<canvas>` as you scroll. This plays smoothly forwards and backwards in every browser, including iOS Safari, which
scrubbing a `<video>` element cannot do. Frames load lazily, coarse frames first, only when the section is near.

The OT/ICU video is cropped to remove the burned-in titles at the bottom (the original contains the typo
"Precffion Where OT Matters Most"). If a corrected video is supplied, drop it into `src/assets/video/` and run
`npm run frames`.

Visitors with "reduce motion" enabled get a still poster and the captions laid out statically.

## Contact form

The form needs a form service to deliver enquiries. Copy `.env.example` to `.env` and set:

- `PUBLIC_FORM_ENDPOINT`: the POST URL, e.g. Formspree (`https://formspree.io/f/xxxx`) or Web3Forms
  (`https://api.web3forms.com/submit`)
- `PUBLIC_FORM_ACCESS_KEY`: only needed for Web3Forms

Until an endpoint is set, submitting opens the visitor's email app with the enquiry pre-filled to `info@medinfra.org`.

## SEO

- Unique title, description, canonical URL, Open Graph and Twitter tags on every page (`components/Seo.astro`)
- JSON-LD structured data: Organization / ProfessionalService (address, hours, phone), WebSite, WebPage and
  BreadcrumbList on every page, plus Service (solution pages), Article / Blog (insights), HowTo (delivery model),
  ContactPage and AboutPage
- `sitemap-index.xml` (auto-generated), `robots.txt`, one `<h1>` per page, semantic headings
- Self-hosted fonts, no render-blocking third-party requests, about 7 KB of JS (gzipped)

The production domain is set in `astro.config.mjs` (`site`) and `src/data/site.ts` (`url`).

## Deploying

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, or cPanel/Apache). URLs use
trailing slashes (`/about/`), which every static host serves out of the box.
