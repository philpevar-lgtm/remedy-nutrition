# Remedy Nutrition

Website for Remedy Nutrition, the private practice of Elena Pevar, RD. Plain HTML, CSS, and JavaScript — no build step or dependencies.

```
index.html            All page content (single page with section anchors)
css/styles.css        Styles, palette, and responsive layout
js/main.js            Mobile menu, scroll animations, contact form submission
images/               Favicon and portrait placeholder
```

## Preview locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Before launch

Search `index.html` for `EDIT:` to find each placeholder.

- [ ] **Photo** — replace `images/elena-placeholder.svg` with a portrait of Elena (portrait orientation, about 800×1000) and update the `src`.
- [ ] **Bio** — education, credentials, certifications, years in practice, a personal note.
- [ ] **Services** — session lengths, package details, and pricing if desired.
- [ ] **Specialties** — match to Elena's actual focus areas.
- [ ] **Hours** — confirm or remove the hours in the contact section.
- [ ] **Booking link** — if using a scheduler (Healthie, Practice Better, SimplePractice, Calendly, etc.), replace `href="#contact"` on the "Book" buttons with the booking URL.
- [ ] **Contact form** — create a free form at [formspree.io](https://formspree.io) and replace `YOUR_FORM_ID` in the form's `action`. Until then, submitting shows a "not connected" message.
## Hosting

**Static host (easiest, free):** drag the project folder onto [Netlify Drop](https://app.netlify.com/drop), or use Cloudflare Pages or GitHub Pages, then connect a custom domain.

**Squarespace:** Squarespace can't host these files directly. Either rebuild the pages in Squarespace's editor using this copy and the palette below, or — on plans that allow custom code — paste sections into Code Blocks and `css/styles.css` into Custom CSS. Squarespace's built-in form block can replace the Formspree form.

## Brand

| | |
| --- | --- |
| Headings | Fraunces (Google Fonts) |
| Body | DM Sans (Google Fonts) |
| Cream | `#F7F2EA` |
| Sage | `#7E906F` / light `#DCE3D2` / dark `#4F5F45` |
| Forest | `#2F3B2B` |
| Terracotta | `#A3552F` |
