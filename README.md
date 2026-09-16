# Chef Manny — Private Chef Website

A single-page, static site. No build tools, no framework, no backend —
just `index.html`, `styles.css`, and `script.js`. Opens directly in a
browser and deploys anywhere that serves static files.

## Design

Navy & Gold direction, approved: Bodoni Moda (display) + Inter (body),
deep navy `#1B2A4A`, gold accent `#B8924B`, sharp corners on cards and
photo frames, rounded corners on buttons, testimonials in a carousel.
All theme colors and fonts live in one config block at the top of
`styles.css` — change them there and the whole site updates. Chef
Manny's logo (`images/logo.png`) is already in place in the nav and
footer.

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
- Contact email, phone, Instagram handle, service area
- Photos (see below)

## 2. Add photos

Drop image files into the `images/` folder using these exact names, or
update the `src` in `index.html` to match whatever you name them:

- `hero.jpg` — wide hero shot (aim for at least 1600px wide)
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
DevTools → Toggle device toolbar).

## 4. Deploy (Netlify — free, no account needed to start)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `chef-site` folder onto the page
3. Netlify gives you a live URL immediately (something like
   `random-name-123.netlify.app`)
4. Create a free Netlify account to keep the site permanently and
   enable custom domains (Site settings → Domain management → Add a
   domain)

If you'd rather use git-based deploys (so pushing to GitHub
auto-updates the live site), connect the folder as a GitHub repo and
link it from Netlify's "Import from Git" flow instead — not necessary
for a mostly-static site with infrequent updates, but nice if you'll
be the one making the edits going forward.

## 5. Custom domain

Buy a domain (Namecheap, Google Domains successor Squarespace
Domains, or directly through Netlify) — expect $12–20/year. Point it
at Netlify by following their domain instructions; it's a DNS change
that usually takes under an hour to propagate.

## 6. Making future edits

For a text or photo swap: open `index.html` in any text editor
(TextEdit, VS Code, even Notes), find the line, change it, save. If
the site is deployed via Netlify's drag-and-drop, re-drag the updated
folder to redeploy. If deployed via git, commit and push.
