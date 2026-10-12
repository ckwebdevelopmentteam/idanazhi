# Raffles.com reference audit

## Method and confidence

Audited 12 October 2026 from the live public HTML at `raffles.com`. The local interactive-browser surface was unavailable, so screenshot-level measurements, hover transitions and exact video treatment remain unverified. Copy, IA, ordered content and official `m.ahstatic.com` media endpoints are directly observed.

## Global shell

- Header begins as an overlaid white/transparent shell on image-led pages. The visible controls are a wordmark, **Hotels & Resorts**, menu trigger, language, Contact, account and a dark **Check Rates** control.
- The menu contains destinations grouped by Asia Pacific, Europe, Indian Ocean, Middle East and North America, then Hotels & Resorts, Residences, Experiences, Offers, Occasions, Sustainability, Opening Soon, About, Raffles 1887, Gift Cards, Loyalty and Contact.
- Booking opens a destination, dates, rooms/guests and special-rates interface. This recreation implements a clearly local front-end demo, not a reservation engine.
- Footer carries reservation/manage-reservation utilities, newsletter input, address/contact links and a loyalty callout.

## Homepage sequence

1. Full-bleed cinematic/media hero with navigation and booking entry point (video is indicated in source; exact first frame unverified).
2. `Hotels & Resorts` / `Places of authentic culture` introduction.
3. Featured properties: Boston, Sentosa, The Palm Dubai, Singapore, Paris, London, Udaipur, Bahrain, Doha, Bali and more.
4. Brand-story image/text panel: `A world of elegance and enchanted glamour`.
5. Feature banner: `Before you even think to ask... The Butler Did It.`
6. Experiences introduction and visual categories: Gastronomy, Wellbeing, Art & Culture, Celebration and Family.

## Hotel pages

Singapore and Dubai share an image hero, property context/navigation, rooms/suites feature, dining, experience cards, history/story and selected editorial panels. Their content diverges: Singapore foregrounds its 1887 heritage and 115 suites; Dubai references the pyramid form and rooms with city views. Singapore experiences page has a title hero, lead `The Butler Did It` item, six cards and concierge information.

## Design observations / approximations

- Editorial serif display typography with a compact sans utility face. Exact brand font unavailable; the implementation uses Georgia and Arial as compatible system fallbacks.
- Palette: ink/deep green-black `#17332f`, Raffles green `#1f5148`, parchment `#f3f0ea`, stone `#d8d3c9`, white, and gold-toned image highlights. Values are approximations.
- Page uses wide imagery, generous vertical whitespace, thin rules, square corners, very limited shadows and no card-style rounded treatment.
- Content is largely constrained to roughly 1240px; copy columns are narrow, and editorial imagery alternates between 1:1 / 4:5 modules and wide 16:8 panels.
- Desktop lists lay out in 2–4 columns; tablet collapses incrementally; mobile stacks images and text and replaces primary navigation with a menu trigger.
- Observed interactions: check-rates booking entry, menu/destination exploration, directory interest filters, grid/map toggle, card links, carousel arrow controls, newsletter form. Hover/motion timing is not measurable through source extraction; implementation uses restrained 180–500ms transitions with reduced-motion support.

## Media

Official publicly reachable image endpoints obtained through reference source are used only where direct endpoints were returned (notably Singapore and Dubai room imagery). Other visual scenes use official `m.ahstatic.com` endpoints from the reference when present. Remote media can change upstream; all references are centralized in `src/data/content.ts`.
