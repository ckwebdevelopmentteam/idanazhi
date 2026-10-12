# Design system

## Tokens (measured where source makes them observable; remaining values are approximations)

- Color: `--ink #17332f`, `--forest #1f5148`, `--paper #f5f2ed`, `--linen #e6e0d5`, `--white #fff`, `--muted #63706b`.
- Font: display `Georgia, 'Times New Roman', serif`; body `Arial, Helvetica, sans-serif` (substitutes; proprietary reference fonts unavailable).
- Type: 11px utility uppercase / 14px labels / 16px body / 24px eyebrow title / clamp(40px, 5vw, 78px) display / clamp(32px, 3.5vw, 54px) section headings.
- Spacing: 8, 12, 16, 24, 32, 48, 72, 112, 160px.
- Container: 1240px max, 24px small-screen gutter, 48px desktop gutter.
- Grid: 2-column editorial at 1:1; card grid 4-up > 1100px, 2-up >= 640px, 1-up below.
- Imagery: hero 16:9 desktop / tall 4:5 mobile; card 4:5; broad panels 16:8.
- Motion: 180ms ease-out interactions, 500ms cubic-bezier(.2,.7,.2,1) reveals; disabled with reduced-motion.
- Breakpoints: 1200, 980, 820, 720, 480, 360px.
- Buttons: square, 1px border, uppercase 11px tracking, 14px 22px padding; no rounded pills.
