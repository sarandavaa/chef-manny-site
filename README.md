# Chef Manny — Private Chef Website

A single-page, static site. No build tools, no framework, no backend
of its own — just `index.html`, `styles.css`, and `script.js`. The
contact form submits to [Formspree](https://formspree.io) (see below);
everything else runs entirely in the browser.

**Live repo:** https://github.com/sarandavaa/chef-manny-site — deployed on
Vercel, auto-redeploying on every push to `master`.

## Design

Apple-inspired direction: black / off-white / grey with a single orange
accent, [Sora](https://fonts.google.com/specimen/Sora) (Google Fonts)
for all type, soft rounded corners throughout, generous whitespace, no
logo mark (wordmark only). All theme colors, fonts, and corner radii
live in one config block at the top of `styles.css` — change them
there and the whole site updates:

```css
--color-accent: #F35903;   /* orange — buttons, links, emphasis */
--font-display: "Sora", ...;
--font-body:    "Sora", ...;
```

`images/logo.png` is no longer used anywhere in the site (the current
design uses a text wordmark instead) — safe to delete, or keep around
if you want a mark for a favicon or social share image later.

## 1. Swap in real content

Open `index.html` and search for square brackets — every `[LIKE THIS]`
marks placeholder text to replace. Search for "REPLACE PHOTO" to find
every image that needs a real file.

Content to gather:
- Chef's name and one-line tagline (hero section)
- Bio, 2 short paragraphs (about section)
- 3 services with a short description each (services section — add or
  remove `.service-card` blocks in the HTML if you have more or fewer
  than 3)
- Testimonial quotes with names/initials (shown as a carousel — add or
  remove `.testimonial-slide` blocks inside `#testimonial-track`; the
  dots and arrows update automatically, no JS changes needed)
- Contact phone and Instagram handle (shown in the left column of the
  contact section)
- Photos (see below)

**Contact form setup:** the form posts to a
[Formspree](https://formspree.io) endpoint already wired into the
`action` attribute. If you ever need to point it at a different
Formspree form (new account, new project), create a form there and
swap in the new endpoint (`https://formspree.io/f/xxxxxxxx`). Without
a valid endpoint, submitting the form shows a friendly inline error
instead of sending anything. Formspree's free tier covers 50
submissions/month; emails arrive with the visitor's address set as
reply-to, so you can respond directly.

The form collects: first/last name, email, phone, service interested
in, event date/time, number of guests, occasion, dietary restrictions,
how they heard about Chef Manny, and additional details. The two
dropdowns (Service, Occasion) reveal a "please specify" box when
"Other" is selected — that's handled in `script.js`, no extra setup
needed.

## 2. Add photos

Drop image files into the `images/` folder using these exact names, or
update the `src` in `index.html` to match whatever you name them:

- `hero.png` — wide hero shot (the hero section sizes itself to this
  image's aspect ratio so it's never cropped — if you swap in a photo
  with a very different aspect ratio, check the hero still looks right
  on both a wide desktop window and a phone)
- `chef-portrait.jpg` — portrait for the About section
- `gallery-1.jpg` through `gallery-9.jpg` — food/event photos for the
  gallery grid (square-ish crops work best; add or remove
  `.gallery-item-wrap` blocks in the HTML to change the count)

Keep photos under ~500KB each if possible (export at "web quality" in
Preview/Photoshop, or run them through squoosh.app) so the site loads
fast on mobile.

## 3. Preview locally

Just double-click `index.html` to open it in a browser. To see it the
way a phone would, resize your browser window narrower, or use your
browser's device-toolbar/responsive mode (usually under
DevTools → Toggle device toolbar). The contact form's fetch/JSON
submission works fine when opened directly from disk, so no local
server is required to test it.

## 4. Deploy

The site is already deployed on [Vercel](https://vercel.com), imported
from the `chef-manny-site` GitHub repo. To ship a change:

```
git add -A
git commit -m "describe the change"
git push
```

Vercel picks up the push and redeploys automatically — no build step
to configure, since this is plain static HTML/CSS/JS.

## 5. Custom domain

Buy a domain (Namecheap, Cloudflare, or directly through Vercel) —
expect $12–20/year. In the Vercel project, go to Settings → Domains,
add it, and follow the DNS instructions there; it's a DNS change that
usually takes under an hour to propagate.

## 6. SEO

The technical/on-page SEO foundation is already built in:
- Structured data (JSON-LD `LocalBusiness` + founder `Person`) in
  `index.html`'s `<head>`, so Google can understand this as a local
  personal-chef business
- Open Graph + Twitter Card meta tags, so links look right when shared
  on social/messaging apps
- `robots.txt` and `sitemap.xml` at the project root
- A canonical URL tag
- A simple on-brand favicon (`images/favicon.svg`)

**Once you have a real domain**, search `index.html`, `robots.txt`, and
`sitemap.xml` for `[YOUR SITE URL` and replace every instance with the
actual domain (e.g. `https://chefmannybayarea.com`) — everything above
is wired up but inert until that placeholder is swapped in.

**What's intentionally not automated** — these are ongoing, manual,
off-site tasks that no amount of code replaces:
- **Google Business Profile**: create/verify one at
  [business.google.com](https://business.google.com) — this is the
  single highest-leverage thing for a local service business to show
  up in Google Maps and local search results. Needs Manny's own Google
  account and phone/mail verification.
- **Google Search Console + Analytics**: connect the domain once it
  exists, to track what's actually showing up in search and getting
  clicked.
- **Reviews**: monitoring and responding to Google/Yelp reviews is a
  recurring human task, not a website feature.

## 7. Making future edits

For a text or photo swap: open `index.html` (or `styles.css`) in any
text editor, find the line, change it, save, then commit and push as
above. For anything more involved, come back here with Claude Code —
it already has the full history of how this site was built.
