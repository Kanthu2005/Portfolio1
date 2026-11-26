# THE PORTFOLIO DEPOT — KANTHU NAIK

An interactive, one-page 3D shipping-container developer portfolio built with semantic HTML5, CSS3 3D transforms (`@property` length animations), and modular Vanilla JavaScript.

## Features

- **Robotic Cargo Crane & Rail**: Full-width rail, rolling carriage, telescoping chrome rod, grip head, and animated L-shaped fingers that stay mechanically synced with the selected container.
- **Seven Real 3D CSS Cuboids**: Each container includes 6 faces, industrial corrugated ribs, double front doors with hinges and seams, identification tags, and a dark navy interactive interior.
- **7-Step Crane Interaction Sequence**:
  1. Close active doors, lower & shrink current container back into the pile, open fingers.
  2. Travel horizontally along the rail.
  3. Lower claw over the selected container.
  4. Grip with mechanical bounce.
  5. Lift to center stage, straighten (`rotateX(-7deg) rotateY(-11deg)`), and enlarge real dimensions via registered CSS `@property` lengths.
  6. Swing double doors open (`-122deg` / `+122deg`).
  7. Reveal section content and move focus to the heading.
- **Queue & Accessibility**: Latest-click animation queue, `Escape` returns to Home, keyboard-accessible container buttons, `inert` closed interiors, `aria-live` announcements, and full `prefers-reduced-motion` support.

## Project Structure

```text
Portfolio/
├── index.html
├── css/
│   ├── style.css
│   ├── containers.css
│   ├── crane.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── data.js
│   ├── containers.js
│   ├── crane.js
│   ├── animations.js
│   ├── navigation.js
│   └── main.js
├── assets/
│   ├── profile.svg
│   └── projects/
└── README.md
```

## Updating Personal Placeholders

All personal links and placeholders are centralized in `js/data.js`:

1. **Email**: Update `profile.email` and set `profile.emailIsPlaceholder: false`.
2. **Resume**: Place your PDF in `assets/` (e.g., `assets/Kanthu_Naik_Resume.pdf`) and set `profile.resumeUrl`.
3. **Portrait**: Replace `assets/profile.svg` (or update the `<img src>` in `js/containers.js`) with your portrait photo (`assets/profile.jpg`).
4. **Pending Project Repo Links**: Fill in `github` (and optional `live`) URLs for ProctorAI, StockFlow, AI Command Line Agent, AI Browser Search Agent, and DayMate AI in `js/data.js`.

## Local Preview & Deployment

Serve locally with any static file server:

```bash
npx serve .
```

Or deploy directly as a static site on **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages** — no build step required.
