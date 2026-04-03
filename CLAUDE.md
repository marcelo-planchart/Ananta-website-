# Elite Drafting & Design — Website Project

## Repository
- **Repo**: marcelo-planchart/Ananta-website-
- **Production branch**: `claude/build-ananta-marketing-site-u5wUh`
- **Dev branch**: `claude/elite-drafting-website-F9F7I`
- **Hosted on**: Vercel at https://ananta-website-seven.vercel.app/
- **Deploy**: Push to both branches — dev first, then force push to production

## Architecture
- Single-page static site (`index.html`) — no frameworks, no build step
- Additional pages: `login.html`, `team.html`
- `vercel.json` for static deployment config
- All CSS/JS inline in each HTML file
- Google Fonts CDN only external dependency

## Design System
- **Aesthetic**: Huge Inc-inspired, bold, immersive, dark mode
- **Primary font**: Space Grotesk (700 headlines, 600 section titles, 500 body)
- **Mono font**: IBM Plex Mono (labels, tags, counters)
- **Body font**: Instrument Sans (body text, nav, forms)
- **Colors**:
  - `--bone: #F7F5F0` (light sections)
  - `--charcoal: #0A0A0A` (dark sections, primary)
  - `--steel: #888` (secondary text)
  - `--glass: #8FA89A` (sage accent)
  - `--amber: #C17F3A` (CTA only)
- **Section rhythm**: Alternating dark/light backgrounds
- **Typography scale**: clamp()-based responsive sizing

## Pages

### index.html (Landing Page)
Sections in order:
1. **Hero** — Casamar background image (desktop), Cosmopolitan (mobile), text left-aligned
2. **Trusted By** — Auto-scrolling client name marquee
3. **01 / Win More** — "Focus on winning jobs. We do the heavy lifting." + 3 benefit cards
4. **02 / How It Works** — 3 steps (upload → takeoff → win), dark section
5. **03 / Our Expertise** — 5 cards: Scope & Takeoff, Shop Drawings, Engineering Stamps, Live Platform, Custom Dev
6. **04 / Our Work** — 4-project carousel (Highmark, Cosmopolitan, SoFi, Casamar) with click-to-detail overlay
7. **05 / Track Record** — Stats (167+ contractors, 2,658 jobs, 10 yrs, 50 states) + testimonials
8. **06 / Start Here** — Google sign-in CTA → 3-step wizard modal (details → project → upload)
9. **Login section** — "Log in to your account" CTA
10. **Footer** — Logo, links (Meet Team, Book Intro, Talk to Human/WhatsApp, Login, Email), copyright

### login.html
- Tabbed Log In / Sign Up
- Google auth + email/password forms
- Dark background, centered white card

### team.html
- Internal page (linked from footer)
- 4 team members: Mr. Chang (Founder), Silvia (Operations), Enrique (Engineering), Marcelo (Technology)
- B&W photos, color on hover

## Key Features
- **Chat widget**: Intercom-style, always visible amber FAB bottom-right, Silvia bot with 5 quick-reply options
- **Project carousel**: 4 projects, full-bleed images, percentage-based sliding, touch/swipe support, counter
- **Wizard modal**: 3-step project submission (details → project info → file upload)
- **Scroll reveals**: IntersectionObserver, translateY(40px)→0, 0.8s cubic-bezier
- **Nav**: mix-blend-mode difference, blur on scroll

## Content Details
- **Company**: Elite Drafting & Design
- **Tagline**: The engineering firm that helps you win more business.
- **Licensed**: All 50 US states (NOT just California)
- **Stats**: 167+ active contractors, 2,658 jobs completed, 10 years experience
- **Founder**: Mr. Chang (Jose Chang)
- **No AI language** on the site — technology references only
- **No "selling software" comparisons** — removed
- **Tone**: Optimistic, partnership-focused ("when you win, we win")

## Projects in Carousel
1. **Highmark Stadium** — Buffalo Bills, Orchard Park NY, 1.35M SF
2. **Cosmopolitan** — Las Vegas NV, 52 stories, 6.4M SF
3. **SoFi Stadium** — Inglewood CA, 3.1M SF
4. **Casamar** — Related Group, Pompano Beach FL, 370K SF

## Image Sources
- Highmark: populous.com (architect official)
- Cosmopolitan: arquitectonica.com (architect official)
- SoFi: discoverlosangeles.com
- Casamar: relatedgroup.com
- Team photos: unsplash.com (placeholder)

## WhatsApp
- "Talk to a Human" links to: https://wa.me/525633153170

## Git Workflow
```bash
# Dev + deploy
git add . && git commit -m "message"
git push -u origin claude/elite-drafting-website-F9F7I
git push --force origin claude/elite-drafting-website-F9F7I:claude/build-ananta-marketing-site-u5wUh
```
