# ROADMAP.md — bitcoiners.africa Rebuild Guide

> **What is this?** A self-contained build guide for rebuilding bitcoiners.africa from WordPress to Next.js + Payload CMS. Any developer or AI coding agent (Claude Code, Cursor, Codex, etc.) can open this file, find the first unchecked step (`[ ]`), read the prompt, run it, verify the success check passes, mark it `[x]`, and move on.
>
> **How to use it:** Find the first unchecked step. Read the prompt. Paste it into your agent. Verify the success check passes. Mark it `[x]`. Move to the next step.
>
> **Project lead:** EM (Head of Technology, African Bitcoiners).

---

## Project Overview

**bitcoiners.africa** is the main organizational website for African Bitcoiners — a Bitcoin education and adoption platform operating across Africa. The site currently runs on WordPress + Elementor with 75+ pages, 250+ newsletter posts, 116 Gravity Forms, 7 custom plugins, and multiple external integrations (ActiveCampaign, BTCPay Server, Google Sheets, ChatGPT chatbot).

**This rebuild** ports the entire site to a modern stack while preserving every URL, every design, every process, and every piece of content. This is NOT a redesign — it's a faithful port with architectural improvements.

**What stays untouched (separate codebases):**
- bitcoinnews.africa (Africa Bitcoin News)
- bitcoinertest.com (Bitcoiner Test)
- course.bitcoiners.africa (Gamified Bitcoin Course)
- devs.freerouting.africa (Lightning Developer Marketplace)
- directory.bitcoiners.africa (African Bitcoin Directory)

---

## Architecture

**Single Next.js + Payload application** (Payload 3.x runs inside Next.js).

```
bitcoiners-africa/
├── src/
│   ├── app/                    # Next.js 15 App Router (public site)
│   │   ├── (site)/             # Site routes grouped
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── learn-bitcoin/
│   │   │   ├── earn-bitcoin/
│   │   │   ├── save-bitcoin/
│   │   │   ├── spend-bitcoin/
│   │   │   ├── community/
│   │   │   ├── about-us/
│   │   │   ├── bitcoin-newsletter/
│   │   │   └── [...slug]/      # Dynamic catch-all for CMS pages
│   │   ├── (payload)/          # Payload admin at /admin
│   │   ├── api/                # API routes (webhooks, form handlers, BTCPay, etc.)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── blocks/                 # Payload block components (page builder)
│   │   ├── Hero/
│   │   ├── CardGrid/
│   │   ├── RichContent/
│   │   ├── CTA/
│   │   ├── StatsBar/
│   │   ├── PartnersCarousel/
│   │   ├── TestimonialsCarousel/
│   │   ├── ProductsGrid/
│   │   ├── PricingTiers/
│   │   ├── ProcessSteps/
│   │   ├── PeopleShowcase/
│   │   ├── ReceiptWidget/
│   │   ├── FlagsCarousel/
│   │   ├── FormEmbed/
│   │   ├── NewsletterSignup/
│   │   ├── SupportSection/
│   │   ├── FeedbackMatrix/
│   │   ├── MiningDirectory/
│   │   ├── CourseModal/
│   │   └── InflationSimulator/
│   ├── collections/            # Payload CMS collections
│   │   ├── Pages.ts
│   │   ├── Posts.ts            # Newsletter posts
│   │   ├── Forms.ts
│   │   ├── FormSubmissions.ts
│   │   ├── Media.ts
│   │   ├── Users.ts
│   │   ├── Jobs.ts
│   │   ├── MiningOrgs.ts
│   │   ├── MeetupSubmissions.ts
│   │   ├── MapLocations.ts
│   │   ├── MIABNominees.ts
│   │   ├── CourseSignups.ts
│   │   ├── CourseCompletions.ts
│   │   ├── FeedbackBounties.ts
│   │   ├── Vouchers.ts
│   │   ├── Testimonials.ts
│   │   └── Partners.ts
│   ├── globals/                # Payload globals (site-wide settings)
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   └── SiteSettings.ts
│   ├── components/             # Shared React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Breadcrumbs/
│   │   ├── ChatbotWidget/
│   │   ├── SocialShare/
│   │   ├── SearchModal/
│   │   └── ui/                 # Base UI components
│   ├── lib/                    # Utilities and service clients
│   │   ├── activecampaign.ts
│   │   ├── btcpay.ts
│   │   ├── google-sheets.ts
│   │   ├── email.ts
│   │   ├── r2.ts
│   │   ├── certificate.ts
│   │   └── utils.ts
│   └── payload.config.ts       # Main Payload configuration
├── public/
│   ├── images/                 # Static images (migrated from WP)
│   └── fonts/
├── scripts/                    # Migration and utility scripts
│   ├── export-wp-content.ts
│   ├── migrate-media.ts
│   ├── import-pages.ts
│   ├── import-newsletters.ts
│   ├── import-legacy-data.ts
│   └── generate-redirects.ts
├── tailwind.config.ts
├── next.config.mjs
├── package.json
├── tsconfig.json
├── .env.example
└── docker-compose.yml          # Local Postgres for dev
```

## Commands

```bash
pnpm install                    # Install dependencies
pnpm dev                        # Run dev server (Next.js + Payload at localhost:3000)
pnpm build                      # Production build
pnpm start                      # Start production server
pnpm generate:types             # Generate Payload TypeScript types
pnpm migrate:create             # Create a new Payload migration
pnpm migrate                    # Run pending migrations
pnpm seed                       # Seed initial data (navigation, settings, etc.)
pnpm export:wp                  # Run WP content export script
pnpm import:pages               # Import pages from WP export
pnpm import:newsletters         # Import newsletter posts
pnpm import:media               # Download + upload media to R2
pnpm import:legacy              # Import legacy DB data (course, bounty, forms)
pnpm redirects:generate         # Generate 301 redirect map from WP slugs
```

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **CMS:** Payload CMS 3.x (runs inside Next.js, admin at /admin)
- **Database:** PostgreSQL on Neon (connection pooling via Neon serverless driver)
- **ORM:** Drizzle (used by Payload under the hood with `@payloadcms/db-postgres`)
- **Styling:** Tailwind CSS 4
- **Hosting:** Render (Pro workspace, same as other AB projects)
- **Media Storage:** Cloudflare R2 via `@payloadcms/storage-s3`
- **Email:** Resend (transactional) or Gmail API with domain-wide delegation
- **Forms:** Payload Form Builder plugin + custom React forms (React Hook Form + Zod)
- **Analytics:** GA4 (preserve GTM-P3M4DLWQ) + Google Tag Manager
- **PDF Generation:** `@react-pdf/renderer` or `pdf-lib` (replaces TCPDF)
- **Rich Text:** Payload Lexical editor
- **i18n:** Payload Localization (English + French)
- **SEO:** Next.js Metadata API (replaces Yoast)
- **Image Processing:** Next.js `<Image>` with R2 loader
- **Chatbot:** External API (chatbot-q6k0.onrender.com) + custom widget component

## Conventions

- All collections defined in `src/collections/` with TypeScript
- All blocks defined in `src/blocks/` — each block has its own directory with `config.ts` (Payload field schema) and `Component.tsx` (React render)
- Tailwind for all styling — no CSS modules, no styled-components
- Server components by default; client components only for interactive elements (forms, modals, carousels, chatbot)
- All API routes in `src/app/api/`
- All images served from R2 via Next.js Image optimization, with local fallback placeholders during development
- Slugs preserved exactly from WordPress (e.g., `/learn-bitcoin/free-bitcoin-course/`)
- Mobile-responsive throughout — Tailwind responsive classes
- Brand colors: Primary Orange `#FD5A47`, Dark Blue `#253343`, Accent Orange `#FF8C00`, Background Cream `#FFF9F5`, Text Dark `#2F2614`
- Fonts: body = system sans-serif stack or Satoshi Variable; headings = system serif or matching
- User roles: Admin (full access), Editor (content CRUD, no settings), Viewer (read-only dashboard)
- All environment variables documented in `.env.example`

## External Services & Credentials Needed

```
# Database
DATABASE_URI=postgresql://...@neon.tech/bitcoiners_africa

# Payload
PAYLOAD_SECRET=<random-32-char-string>

# Cloudflare R2
R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=bitcoiners-africa-media
R2_PUBLIC_URL=https://media.bitcoiners.africa

# BTCPay Server
BTCPAY_URL=https://btcpay0.voltageapp.io
BTCPAY_API_TOKEN=
BTCPAY_STORE_ID=
BTCPAY_WEBHOOK_SECRET=

# ActiveCampaign
ACTIVECAMPAIGN_API_URL=https://africanbitcoiners.api-us1.com
ACTIVECAMPAIGN_API_KEY=

# Google Sheets
GOOGLE_APPLICATION_CREDENTIALS=<path-to-service-account-json>

# Email (Resend or Gmail)
RESEND_API_KEY=
EMAIL_FROM=hello@bitcoiners.africa

# GA4 / GTM
NEXT_PUBLIC_GTM_ID=GTM-P3M4DLWQ
NEXT_PUBLIC_GA4_ID=<GA4-measurement-id>

# Chatbot
NEXT_PUBLIC_CHATBOT_API_URL=https://chatbot-q6k0.onrender.com/api/chat
NEXT_PUBLIC_CHATBOT_LOG_URL=https://chatbot-db-tetm.onrender.com/chat

# WordPress (for migration only)
WP_API_URL=https://bitcoiners.africa/wp-json/wp/v2
```

---

## STEP 0: Project Initialization [x] ✅

**Status:** Complete — 2026-06-22

**What:** Create the Next.js 15 + Payload 3 project with PostgreSQL, Tailwind CSS, and base configuration.

**What was done:**
- Extracted Payload `website` template (v3.85.1) from GitHub into the repo root
- Replaced `workspace:*` monorepo refs with real npm versions (`3.85.1`)
- Swapped `@payloadcms/db-mongodb` → `@payloadcms/db-postgres` in `package.json` and `src/payload.config.ts`
- Added `@payloadcms/storage-s3`, `@hookform/resolvers`, `zod` dependencies
- Configured `docker-compose.yml` for local PostgreSQL (port 5432, db: `bitcoiners_africa_dev`)
- Added AB brand tokens to `tailwind.config.mjs` (colors, border-radius, box-shadow) and CSS variables in `globals.css`
- Created `.env.example` with all environment variables from the Architecture section
- Created full directory skeleton: `scripts/`, `src/lib/`, `src/globals/`, all `src/blocks/` subdirs, `src/components/Header|Footer|Breadcrumbs|ChatbotWidget|SocialShare|SearchModal`
- Created stub files for `scripts/*.ts` (migration scripts) and `src/lib/*.ts` (service clients)
- Excluded `playwright.config.ts` and test files from TypeScript compilation
- Local PostgreSQL started via Homebrew (`postgresql@16`); database `bitcoiners_africa_dev` confirmed

**Verification:** `pnpm dev` runs. localhost:3000 → 200. localhost:3000/admin → 200. `pnpm build` passes.

**Prompt:**
```
Create a new Next.js 15 + Payload CMS 3.x project for bitcoiners.africa rebuild.

1. Initialize with `npx create-payload-app@latest` using the `website` template, selecting:
   - Next.js App Router
   - PostgreSQL (with `@payloadcms/db-postgres`)
   - Lexical rich text editor
   - S3/R2 storage adapter
2. Install additional dependencies: `tailwindcss @tailwindcss/typography react-hook-form zod @hookform/resolvers lucide-react`
3. Configure Tailwind with the AB brand tokens:
   - Primary: #FD5A47 (orange-red)
   - Secondary: #253343 (dark blue)
   - Accent: #FF8C00 (orange)
   - Background: #FFF9F5 (cream), #FFFFFF (white)
   - Text: #2F2614 (dark brown), #333333, #667085
   - Surface borders: #E5E7EB, #D9D9D9
4. Create `.env.example` with all environment variables listed in the Architecture section above.
5. Set up `docker-compose.yml` for local Postgres (port 5432, db: `bitcoiners_africa_dev`).
6. Create the directory structure as specified in the Architecture section.
7. Verify `pnpm dev` starts the app at localhost:3000 with Payload admin at localhost:3000/admin.

After setup, update ROADMAP.md: mark this step [x] and add a Status line.
```

**Verification:** `pnpm dev` runs. localhost:3000 shows Next.js page. localhost:3000/admin shows Payload admin login. `pnpm build` passes. Tailwind classes render with correct brand colors.

---

## STEP 1: Payload Collections — Content Types [x] ✅

**What:** Define all Payload CMS collections for the site's content model. This is the data layer — every content type the site needs.

**Prompt:**
```
Read ROADMAP.md for full project context. Create all Payload CMS collections:

1. **Pages** (`src/collections/Pages.ts`): title, slug (unique, indexed), content (Blocks field — this is the page builder), meta (group: title, description, image for SEO), status (draft/published), parent (self-referencing relationship for breadcrumbs), template (select: default, section-landing, course, partnership, bounty, mining, miab, proof-of-work). Enable drafts and versions.

2. **Posts** (`src/collections/Posts.ts`): For newsletter archive. title, slug, publishedDate, category (select: weekly-newsletter, saturday-stacker, announcement), content (Lexical rich text), excerpt, featuredImage (upload), author, meta (SEO group). Enable drafts.

3. **Media** (`src/collections/Media.ts`): Configure with R2 storage adapter. Alt text, caption fields. Image sizes: thumbnail (400x300), card (600x400), hero (1200x600), og (1200x630).

4. **Users** (`src/collections/Users.ts`): email, role (select: admin, editor, viewer). Admin: full access. Editor: CRUD on Pages, Posts, Jobs, Forms, Media. Viewer: read-only.

5. **Jobs** (`src/collections/Jobs.ts`): title, slug, company, companyDescription, websiteURL, location, type (select: full-time, part-time, contract, volunteer), description (rich text), contactEmail, contactName, isActive, postedDate, shareButtonId (text, for social share script linking).

6. **Testimonials** (`src/collections/Testimonials.ts`): text, name, initial (single char), avatarColor (text — hex code). Used by the testimonial carousel block.

7. **Partners** (`src/collections/Partners.ts`): name, logoImage (upload), websiteURL, logoWidth (number). Used by partner carousel block.

8. **MIABNominees** (`src/collections/MIABNominees.ts`): year (number), rank (number), name, country, countryFlagEmoji, photo (upload), bio (rich text), socialLinks (array: platform + url), isPublished.

9. **MiningOrgs** (`src/collections/MiningOrgs.ts`): name, country, countryFlagCode, city, description, founderName, contactPerson, contactEmail, websiteURL, twitterURL, logoImage (upload), isActive.

10. **MapLocations** (`src/collections/MapLocations.ts`): merchantName, description, websiteURL, address, email, phone, acceptsLightning (boolean), category (select: merchant, service, atm), coordinates (point field or lat/lng numbers).

11. **MeetupSubmissions** (`src/collections/MeetupSubmissions.ts`): meetupName, description, location, startDate, endDate, time, contactName, contactEmail, flyerImage (upload), status (select: pending, approved, rejected).

12. **CourseSignups** (`src/collections/CourseSignups.ts`): name, email, country, uniqueCode, utmCampaign, tierLevel (select: ba, ad, pr), courseLang (select: English, French), deliveryMethod (select: email, telegram), ipAddress, signupDate.

13. **CourseCompletions** (`src/collections/CourseCompletions.ts`): name, email, score, scorePercent, certNumber (auto-generated: BC000001+), certHash, uniqueCode, courseLang, tierLevel, utmCampaign, certDownloaded (boolean), downloadCount, tbtDiscountSent, completionDate, ipAddress.

14. **FeedbackBounties** (`src/collections/FeedbackBounties.ts`): entryId (auto-increment or relation), name, email, feedbackTitle, category (select: Course Content, Course Delivery, Website, Network/Community, Suggestion), description (textarea), feedbackBefore (yes/no), status (select: Pending, Under review, Accepted, Not accepted, Idea, Implemented), rewardStatus (select: Pending, Processing, Paid, Not paid), implementationDate, lastActivity.

15. **Vouchers** (`src/collections/Vouchers.ts`): voucherCode (text), sentTo (email), sentDate.

16. **FormSubmissions** (`src/collections/FormSubmissions.ts`): Generic collection for storing form data. formName (text), formSlug (text), data (JSON field), submittedAt, ipAddress, status (select: active, spam, trash). This replaces Gravity Forms entries storage.

Register all collections in `payload.config.ts`.

After everything builds and passes typecheck, update ROADMAP.md.
```

**Verification:** `pnpm dev` runs. All collections appear in Payload admin sidebar. Can create a test entry in each collection. `pnpm build` passes.

---

## STEP 2: Payload Globals — Site Settings, Header, Footer [x] ✅

**What:** Define global configuration objects that appear once in the admin (not collections of items).

**Prompt:**
```
Read ROADMAP.md for full project context. Create Payload globals:

1. **SiteSettings** (`src/globals/SiteSettings.ts`): siteName, tagline, siteDescription, logo (upload), favicon (upload), socialLinks (array: platform select [whatsapp, twitter, instagram, facebook, linkedin, telegram, discord, nostr] + url), donationQRImage (upload), donationBTCPayLink, chatbotEnabled (boolean), chatbotApiUrl, chatbotLogUrl, analyticsEnabled (boolean), gtmId, ga4Id.

2. **Header** (`src/globals/Header.ts`): navigation items as an array of: label, type (select: link, dropdown), url (text, for link type), children (array of {label, url} for dropdown type). This allows the content team to manage the navigation from the admin. Pre-seed with the current nav structure:
   - HOME → /
   - LEARN (dropdown) → 11 sub-items from current site
   - EARN (dropdown) → 3 sub-items
   - SAVE (dropdown) → 7 sub-items
   - SPEND (dropdown) → 2 sub-items
   - COMMUNITY (dropdown) → 6 sub-items
   - ABOUT (dropdown) → 9 sub-items

3. **Footer** (`src/globals/Footer.ts`): description (text), quickLinks (array: label + url), utilityLinks (array: label + url), copyrightText. Pre-seed with current footer content.

Register all globals in `payload.config.ts`. Create a seed script (`scripts/seed.ts`) that populates these globals with the current site's data when run via `pnpm seed`.

After everything builds, update ROADMAP.md.
```

**Verification:** Globals appear in admin under "Globals" section. Can edit Header nav items and save. Seed script populates all defaults. `pnpm build` passes.

---

## STEP 3: Media Storage — Cloudflare R2 [x] ✅

**Status:** Complete — 2026-06-22

**What was done:**
- Imported `s3Storage` from `@payloadcms/storage-s3` (already in package.json at 3.85.1)
- Added S3 plugin to `src/plugins/index.ts` — enabled only when `STORAGE_ADAPTER=r2`
- Configured R2: endpoint, credentials, `region: 'auto'`, `forcePathStyle: true`
- `generateFileURL` uses `R2_PUBLIC_URL` env var for all served media URLs
- `disableLocalStorage: true` when R2 is active (files go to bucket, not disk)
- When `STORAGE_ADAPTER=local` (default in `.env`), plugin is disabled and Payload uses the existing `staticDir: public/media/` from the Media collection
- Image sizes (thumbnail 400×300, card 600×400, hero 1200×600, og 1200×630) already defined in Media.ts — all variants are uploaded to R2 by the plugin automatically
- `pnpm build` passes, `tsc --noEmit` clean

**What:** Configure Payload's S3-compatible storage adapter to use Cloudflare R2 for all media uploads.

**Prompt:**
```
Read ROADMAP.md for full project context. Set up Cloudflare R2 media storage:

1. Install `@payloadcms/storage-s3`.
2. Configure the S3 adapter in `payload.config.ts` for R2:
   - Use env vars: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
   - Set the public base URL from R2_PUBLIC_URL
   - Apply to the Media collection
3. Update the Media collection to generate responsive image sizes:
   - thumbnail: 400x300 crop
   - card: 600x400 crop
   - hero: 1200x600 crop
   - og: 1200x630 crop
4. For local development without R2, fall back to local disk storage (`/public/media/`). Use an env var `STORAGE_ADAPTER=r2|local` to toggle.
5. Verify: upload an image in admin → it appears in R2 bucket (or local /public/media/ in dev). Image sizes are generated.

After setup, update ROADMAP.md.
```

**Verification:** Upload an image in Payload admin. Image appears in R2 (or local storage). All size variants generated. Image URL resolves in browser.

---

## STEP 4: Design System — Brand Components [x] ✅

**Status:** Complete — 2026-06-22

**What was done:**
- `ab-button.tsx` — ABButton with primary (orange)/secondary (outline)/white/orange variants, sm/md/lg sizes, optional icon left/right. Uses CVA + brand tokens.
- `ab-card.tsx` — ABCard with image, title, description, "Visit page →" link. Hover shadow, rounded-card styling.
- `section-heading.tsx` — SectionHeading with eyebrow (orange uppercase), heading, optional subheading; left/center alignment.
- `container.tsx` — Container with max-w-7xl (default) or max-w-4xl (narrow), responsive px.
- `badge.tsx` — Badge with variants: default, pending, accepted, rejected, review, implemented, idea, paid, processing.
- `ab-form-fields.tsx` — ABInput, ABTextarea, ABSelect with border-[#d4d4d4] styling, focus:border-brand-primary, label + error message support.
- `modal.tsx` — Modal with centered/dropdown variants, Escape key close, body scroll lock, `useModal()` hook.
- `breadcrumbs.tsx` — Breadcrumbs with Home root, orange active last item, chevron separators.
- `scroll-to-top.tsx` — ScrollToTop: fixed bottom-left orange circle, appears after 400px scroll.
- `page-hero.tsx` — PageHero with default/orange/dark variants, image-right or image-as-background placement, button array.
- All components use Tailwind brand-* tokens (rounded-btn, rounded-card, rounded-section, shadow-card, shadow-elevated).
- `pnpm build` and `tsc --noEmit` both pass clean.

**What:** Create shared UI components matching the AB brand exactly. These are the building blocks every page template uses.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the AB design system as shared components.

Reference the brand from the live site (bitcoiners.africa). Key design tokens:
- Colors: Primary #FD5A47, Secondary #253343, Accent #FF8C00, BG cream #FFF9F5, borders #E5E7EB/#D9D9D9
- Corner radius: buttons 5px, cards 8px, large sections 12px
- Shadows: cards `0 2px 8px rgba(0,0,0,0.08)`, elevated `0 8px 32px rgba(0,0,0,0.12)`
- Orange buttons: bg #FD5A47, hover #253343, white text, rounded-[5px], px-8 py-5

Create these in `src/components/ui/`:
1. **Button** — variants: primary (orange), secondary (outline), white. Sizes: sm, md, lg. With optional icon.
2. **Card** — bordered card with image, title, description, and "Visit page →" link. Used in section landing pages.
3. **SectionHeading** — eyebrow text (small caps, orange) + heading + optional subheading. Matches the "YOUR BITCOIN JOURNEY STARTS HERE" / "OUR PRODUCTS" pattern.
4. **Container** — max-w-7xl mx-auto px-4 responsive wrapper.
5. **Badge** — small label (used for status indicators in bounty matrix).
6. **Input/Select/Textarea** — form field components matching the site's form styling (border #d4d4d4, rounded-lg, focus:border-orange).
7. **Modal** — animated dropdown modal (used for course signup selector).
8. **Breadcrumbs** — "Home > Section > Page" pattern with orange active links, matching the site's breadcrumb style.
9. **ScrollToTop** — the orange floating button at bottom-left of every page.
10. **PageHero** — full-width hero section with optional orange background variant, image placement options (right, background), text overlay.

All components should be TypeScript with proper prop types. Use Tailwind exclusively.

After everything builds, update ROADMAP.md.
```

**Verification:** Create a test page that renders every component. Visual check against the live site. All components responsive down to 375px. `pnpm build` passes.

---

## STEP 5: Header Component [x] ✅

**Status:** Complete — 2026-06-22

**What was done:**
- `Logo/Logo.tsx` — Replaced Payload placeholder with AB brand logo: orange 60×60 circle "AB" mark + "African / Bitcoiners" stacked wordmark. Path for `public/images/ab-logo.png` noted in comment for when the real image arrives.
- `Header/Component.client.tsx` — Full rewrite: sticky top-0 z-50, white bg, shadow on scroll (>8px), border-b at rest. Removed dark-theme dependency — AB header is always white.
- `Header/Nav/index.tsx` — Full rewrite:
  - Desktop: horizontal flex, `hidden lg:flex`. Single links are `<Link>`, dropdowns use CSS `group-hover` to reveal a `rounded-card shadow-elevated` panel. Active pathname highlights in `brand-primary` orange. Chevron rotates 180° on open.
  - Mobile: hamburger (`Menu`/`X` icon) + search button visible below lg. Clicking hamburger opens a full-screen slide-down panel (`fixed inset-0 z-40 bg-white pt-[72px]`). Dropdowns in mobile menu are accordion-style (click to expand).
  - Search: `Search` lucide icon button wired to SearchModal (both desktop + mobile).
  - Language selector: 🇬🇧 English visual placeholder (`disabled`, i18n wired in STEP 24).
  - Route change closes mobile menu and resets open dropdown.
- `components/SearchModal/index.tsx` — Created search overlay: full-width slide-from-top panel, brand-primary underline search input, ESC closes, body scroll locked while open. Search backend wired in a later step.
- `pnpm build` and `tsc --noEmit` both pass clean.

**What:** Build the site header — exact match of the current design. Logo, search, 7-item mega nav with dropdowns, language selector.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the Header component (`src/components/Header/`).

Match the live site header exactly:
- Left: AB logo (60x60 circular image, links to /)
- Center/Right: Search icon (magnifying glass, opens search modal), navigation items
- Nav items: HOME, LEARN ↓, EARN ↓, SAVE ↓, SPEND ↓, COMMUNITY ↓, ABOUT ↓
- Active nav item text color: #FD5A47 (orange)
- Dropdown menus: white background, shadow, list of sub-page links
- Right end: Language selector (flag + "English" dropdown) — for now just a visual placeholder, i18n comes later
- Mobile: hamburger menu that slides open with full nav
- Sticky on scroll
- Fetch navigation data from the Header global (Payload) via server component

Create a SearchModal component that overlays the page with a search input. For now it can be a UI shell — search functionality comes later.

After everything builds, update ROADMAP.md.
```

**Verification:** Header renders on all pages. Dropdown menus open on hover (desktop) and click (mobile). Mobile hamburger works. Active nav item highlights. Search modal opens/closes. Matches the live site visually.

---

## STEP 6: Footer Component [x] ✅

**Status:** Complete — 2026-06-22

**What was done:**
- `Footer/Component.tsx` — Full rewrite. Now a server component that fetches both `footer` and `site-settings` globals in parallel. 3-column grid on desktop (Logo+description / Quick Links / Utility Links), collapsing to single-column on mobile. Links rendered uppercase + underlined per brand spec. Bottom copyright bar. Falls back to hardcoded defaults for description and copyright.
- Social icons row (from `site-settings.socialLinks`): lucide-react for Facebook, Instagram, LinkedIn, Twitter; inline SVG components for WhatsApp, Telegram, Discord; `Zap` icon for Nostr. Each renders as a 40×40 rounded-full pill, hover turns brand-primary orange.
- `components/ChatbotWidget/index.tsx` — Client component shell. Fixed bottom-right 56×56 circular button (brand-secondary dark blue, hover orange). Click opens a chat panel shell with 3 suggested prompts, a disabled input, and a styled header. Chat logic wired in STEP 20.
- `ScrollToTop` (from STEP 4) imported and rendered alongside ChatbotWidget — fixed bottom-left orange circle, shows after 400px scroll.
- `pnpm build` and `tsc --noEmit` both pass clean.

**What:** Build the site footer — exact match of current design.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the Footer component (`src/components/Footer/`).

Match the live site footer exactly:
- Dark background section
- 3 columns: (1) Logo + description text, (2) Quick links (INFLATION SIMULATOR, AFRICA BITCOIN NEWS, BITCOIN STARTER BOOK, BITCOIN MINING), (3) Utility links (FAQs, SITEMAP, SUPPORT US, BITCOIN TEST)
- All caps link text, underlined
- Social icons row: WhatsApp, Twitter, Instagram, Facebook, LinkedIn, Telegram, Discord, Nostr — use lucide-react icons or simple SVGs
- Copyright: "© 2026 African Bitcoiners"
- Fetch footer data from the Footer global (Payload)
- Include the ScrollToTop button (orange circle with ^ arrow, fixed bottom-left)
- Include the ChatbotWidget trigger (circular icon, fixed bottom-right) — build as a shell for now, the chatbot logic comes in Step 35

After everything builds, update ROADMAP.md.
```

**Verification:** Footer renders on all pages. Links work. Social icons render. ScrollToTop scrolls to top on click. Chatbot icon shows. Layout matches live site.

---

## STEP 7: Base Layout + Page Routing [x] ✅

**Status:** Complete — 2026-06-22

**What was done:**
- `utilities/mergeOpenGraph.ts` — Updated site name/title/description to "African Bitcoiners".
- `utilities/generateMeta.ts` — Updated title template: `"<page title> | African Bitcoiners"`, default: `"African Bitcoiners - Bringing Freedom to Africa through Bitcoin"`.
- `app/(frontend)/layout.tsx` — Added GTM script (`next/script`, `strategy="afterInteractive"`) + noscript iframe fallback, both gated on `NEXT_PUBLIC_GTM_ID`. Updated `metadata` export with title template, description, `twitter.site: '@afribitcoiners'`. Removed Geist Mono (unused).
- `app/(frontend)/[slug]/page.tsx` — Updated query to `depth: 2` (populates `parent.parent` for breadcrumbs). Added `<Breadcrumbs>` above blocks when page has a parent. Filtered `generateStaticParams` to single-segment slugs only.
- `app/(frontend)/[section]/[subpage]/page.tsx` — New 2-level dynamic route. Joins `section/subpage` segments into a full slug and queries Payload. Handles URLs like `/learn-bitcoin/free-bitcoin-course/`. Named routes (e.g., `bitcoin-newsletter`) take Next.js priority over this catch-all. Breadcrumbs built from `page.parent` chain.
- `app/(frontend)/bitcoin-newsletter/page.tsx` — Newsletter archive at `/bitcoin-newsletter/`. Lists Posts (12/page) with date, category badge, title, excerpt, "Read More »" link. AB card styling.
- `app/(frontend)/bitcoin-newsletter/page/[pageNumber]/page.tsx` — Paginated newsletter archive.
- `app/(frontend)/bitcoin-newsletter/[slug]/page.tsx` — Single newsletter post. Header banner: orange for `weekly-newsletter` category, dark-blue for `saturday-stacker`. Breadcrumbs: Home > Bitcoin Newsletter > Post. Rich text body with excerpt pull-quote. Full template styling deferred to STEP 13.
- `blocks/RenderBlocks.tsx` — Already existed; block registry populated in STEP 8.
- `pnpm build` and `tsc --noEmit` both pass clean.

**What:** Set up the root layout with Header + Footer wrapping all pages, and create the dynamic page routing from Payload CMS.

**Prompt:**
```
Read ROADMAP.md for full project context. Set up the base layout and dynamic page routing.

1. **Root Layout** (`src/app/layout.tsx`):
   - Import and render Header + Footer
   - Load Google Fonts if used (or system font stack)
   - Add GTM script tag in <head> (use NEXT_PUBLIC_GTM_ID)
   - Set default metadata (title template: "%s | African Bitcoiners", default: "African Bitcoiners - Bringing Freedom to Africa through Bitcoin")
   - Add viewport meta, OG defaults, Twitter card defaults

2. **Dynamic Page Route** (`src/app/(site)/[...slug]/page.tsx`):
   - Catch-all route that looks up the slug in Payload's Pages collection
   - Renders the page's blocks using a BlockRenderer component
   - Generates metadata from the page's meta fields (title, description, OG image)
   - Returns 404 if no page found
   - `generateStaticParams` for ISR — fetch all published page slugs

3. **Homepage Route** (`src/app/(site)/page.tsx`):
   - Fetch the page with slug "" or "/" from Pages collection
   - Render via BlockRenderer (same as dynamic route but for root)

4. **Newsletter Routes**:
   - Archive: `src/app/(site)/bitcoin-newsletter/page.tsx` — list all Posts with pagination
   - Single: `src/app/(site)/bitcoin-newsletter/[slug]/page.tsx` — render single post

5. **BlockRenderer** (`src/components/BlockRenderer.tsx`):
   - Takes an array of blocks from Payload and renders the corresponding React component for each
   - Map block types to components: hero → Hero, cardGrid → CardGrid, richContent → RichContent, etc.
   - Each block component receives its fields as props

6. **Breadcrumbs** — render automatically based on URL segments + page parent relationships

After everything builds, update ROADMAP.md.
```

**Verification:** Visit `/` → homepage loads (even if empty). Visit `/test-page` after creating a test page in admin → renders. Visit `/bitcoin-newsletter` → shows post list. 404 page works for non-existent slugs. Breadcrumbs show. `pnpm build` passes.

---

## STEP 8: Core Page Builder Blocks [x] ✅

**What:** Build the Payload blocks that make up the page builder. Each block has a Payload field config and a React rendering component. These blocks are what the content team uses to compose pages.

**Prompt:**
```
Read ROADMAP.md for full project context. Create all core page builder blocks. Each block lives in `src/blocks/<BlockName>/` with `config.ts` (Payload field schema) and `Component.tsx` (React render).

Build these blocks to EXACTLY match the live site sections they correspond to:

1. **Hero** — Full-width hero. Fields: heading (text), subheading (rich text), primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, backgroundType (select: image, color, gradient), backgroundImage (upload), images (array of uploads for the collage-style hero on homepage), layout (select: text-left-image-right, centered, text-overlay).

2. **CardGrid** — Grid of linked cards. Fields: eyebrow (text), heading (text), cards (array: image upload, title, description, linkText, linkURL), columns (select: 2, 3, 4), variant (select: default, orange-accent — the orange-tinted cards on homepage journey section).

3. **RichContent** — Flexible rich text section. Fields: content (Lexical rich text), layout (select: full-width, narrow, two-column-with-image), sideImage (upload, optional), sideImagePosition (left/right).

4. **CTA** — Call-to-action banner. Fields: heading, description, buttonText, buttonLink, variant (select: orange-bg, white-bg, dark-bg), backgroundImage (upload, optional). Matches the "Get 1,000 sats for your brilliant ideas!" and "Ready to Begin?" sections.

5. **StatsBar** — Row of stat numbers. Fields: stats (array: value text, label text). Matches the "10k+ COMMUNITY | 170+ PROJECTS | 12 BOOTCAMPS" section.

6. **PartnersCarousel** — Auto-scrolling partner logos. Fields: heading (text), useGlobalPartners (boolean — if true, pull from Partners collection; if false, use inline partners array). Infinite CSS scroll animation, pause on hover. Matches the "Trusted by builders..." section.

7. **TestimonialsCarousel** — Auto-scrolling testimonial cards. Fields: heading, useGlobalTestimonials (boolean). Quote mark, text, author name, initial avatar. Matches the homepage testimonial section.

8. **ProductsGrid** — 2-column grid of product cards. Fields: eyebrow, heading, products (array: name, description, buttonText, buttonLink, mockupImage upload). Matches the "Built for Real Impact" section.

9. **NewsletterSignup** — Email signup form. Fields: heading, description, showCountrySelect (boolean), showNameField (boolean). Connects to ActiveCampaign on submission (integration comes later; for now just save to FormSubmissions). Matches the "Get Involved" footer section and sidebar widget.

10. **SupportSection** — Donation CTA. Fields: heading, description, bulletPoints (array of text), primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, qrCodeImage (upload). Matches the "Support Our Mission" section.

11. **FormEmbed** — Embeds a custom form. Fields: formType (select: contact, feedback-bounty-submit, mining-submit, meetup-submit, map-submit, places-earn, places-spend, job-submit, volunteer, bitcoin-for-her, education-partnership, savings-challenge, miab-nomination), heading (text). Renders the appropriate form component.

Register all blocks in payload.config.ts under the Pages collection's content Blocks field.

After everything builds, update ROADMAP.md.
```

**Verification:** Create a test page in Payload admin. Add each block type. Verify they render on the frontend. Cards display in grid. Carousel animations work. Forms render (even if not yet functional). `pnpm build` passes.

---

## STEP 9: Advanced Page Builder Blocks [x] ✅

**What:** Build the remaining specialized blocks that appear on specific pages.

**Prompt:**
```
Read ROADMAP.md for full project context. Create advanced page builder blocks:

1. **PricingTiers** — Monthly/yearly toggle with tier cards. Fields: heading, tiers (array: name, monthlyPrice, yearlyPrice, currency — "sats", features array, buttonText, buttonLink, isHighlighted boolean). The monthly/yearly toggle is a client component. Matches the Education Partnership pricing section.

2. **ProcessSteps** — Numbered step cards in a flowing layout. Fields: heading, steps (array: number, title, description rich text, linkText, linkURL). Matches the Feedback Bounty "How to Participate" section with the zigzag/cascade layout.

3. **PeopleShowcase** — Numbered profiles for MIAB. Fields: year (number), heading, people (array: rank, name, country, countryFlagEmoji, photo upload, bio rich text, socialLinks array). Two layout variants: `grid-2col` (2025 style with alternating card colors) and `list-alternating` (2024 style). Fields: layout (select: grid-2col, list-alternating). Include "View Other Years" navigation at bottom.

4. **ReceiptWidget** — The Proof of Work receipt. Fields: metrics (array: label + value), totalLabel, totalValue. Renders the receipt-paper styled widget with barcode SVG, exactly matching the PoW page design.

5. **MissionStatements** — Large typography mission text blocks. Fields: statements (array: eyebrow text, heading rich text — to allow orange highlighted words, backgroundImage upload optional). Matches the PoW page "We are building toward a future where one billion Africans..." section.

6. **FlagsCarousel** — Horizontal scrolling country flags with links. Fields: countries (array: name, slug, countryCode for flag icon). Links to `/top-african-bitcoin-countries-{slug}/`. Matches the carousel on the Top Bitcoin Countries page.

7. **MiningDirectory** — Country-grouped list of mining organizations. Fields: pull from MiningOrgs collection, grouped by country. Each entry shows logo, name, description, social links. Matches the Mining page layout.

8. **FeedbackMatrix** — Public-facing bounty leaderboard table. Fields: pull from FeedbackBounties collection. Columns: Bounty ID, Date Added, Category, Description (with read-more truncation), Status (color-coded badge), Reward Status, Implementation Date. Client-side search and sort. Matches the Feedback Bounty page table.

9. **CourseModal** — The BFB course signup modal. Fields: variant (select: primary-orange, white-outline). Client component with English/French tabs, Email/Telegram/Website options. When an option is clicked, it reveals the corresponding hidden signup form section below (or navigates to course.bitcoiners.africa for Website option). Matches the "Start learning for free ↓" button behavior.

10. **InflationSimulator** — Full interactive calculator. React port of the jQuery/PHP plugin. Client component with amount input, years-ago select (1-15), African currency select (40+ currencies with flag icons), calculate button. Shows comparison cards: fiat value loss vs Bitcoin gain. Includes share-as-image functionality (html-to-canvas). All inflation data and Bitcoin price data hardcoded in a data file. Matches the simulator exactly.

After everything builds, update ROADMAP.md.
```

**Verification:** Each block renders correctly when added to a test page. PricingTiers toggle switches. CourseModal opens/closes with tabs. InflationSimulator calculates correctly. FeedbackMatrix sorts and searches. `pnpm build` passes.

---

## STEP 10: Homepage — Exact Match [x] ✅

**What:** Build the homepage using the block system. Create the page in Payload with all blocks matching the live site exactly.

**Prompt:**
```
Read ROADMAP.md for full project context. Create the homepage as a Page in Payload with the exact block sequence matching the live site (reference: Home_page.png screenshot).

Block sequence:
1. Hero — "Bringing Freedom to Africa through Bitcoin" heading, description text, two buttons (Start your Bitcoin Journey → /learn-bitcoin/free-bitcoin-course/, Support Our Mission → /about-us/support-us/), right-side image collage (use placeholder images, well-named: hero-woman-laptop.png, hero-woman-orange.png, hero-man.png, hero-child.png)
2. PartnersCarousel — "Trusted by builders, educators, and Bitcoin leaders across Africa", logos: HRF, iPayBTC, Citrusrate, Trezor Academy, BTrust
3. CardGrid — eyebrow "Your Bitcoin Journey Starts here", 4 cards in 2x2 grid: Learn Bitcoin, Earn Bitcoin, Save Bitcoin, Spend Bitcoin. Orange-accent variant with icons.
4. StatsBar — 10k+ COMMUNITY, 170+ AFRICAN BITCOIN PROJECTS TRACKED, 12 BOOTCAMPS ACROSS AFRICA
5. ProductsGrid — eyebrow "OUR PRODUCTS", heading "Built for Real Impact", 6 products: Africa Bitcoin News, Africa Free Routing, African Bitcoin Live Directory, The Bitcoiner Test, Sats2Data, Zapads. Each with description, VISIT WEBSITE button, mockup image placeholder.
6. TestimonialsCarousel — "Community Feedback & Testimonials", 5 testimonials from Bitcoin Zambia, Tando, Aliyu, Trezor Academy, @Scarlette_Melon
7. SupportSection — "Support Our Mission" with bullet points, two buttons, QR code image placeholder
8. NewsletterSignup — "Get Involved" with name, email, country fields, "Sign me up!" button

Also populate the Partners and Testimonials collections with the actual data from the live site.

Create this page via the seed script so it can be recreated consistently.

After the homepage renders exactly like the screenshot, update ROADMAP.md.
```

**Verification:** Visit `/` — homepage renders with all sections in correct order. Carousels animate. Cards link correctly. Layout matches the screenshot pixel-for-pixel at desktop and mobile widths. `pnpm build` passes.

---

## STEP 11: Section Landing Pages [x] ✅

**What:** Create the 6 parent section pages (Learn, Earn, Save, Spend, Community, About) using the card grid template.

**Prompt:**
```
Read ROADMAP.md for full project context. Create the section landing pages. These all follow the same template (reference: Parent_pages.png — the Learn page screenshot):

Template: breadcrumb → page title (h1, uppercase) → subtitle → 3-column card grid (each card: image, title, description, "Visit page →" link) → CTA banner at bottom.

Create these pages in Payload with appropriate blocks:

1. **Learn Bitcoin** (`/learn-bitcoin/`) — 8 cards: Free Bitcoin for Beginners Course, Top 10 Bitcoin Misconceptions, Bitcoin for Kids, Bitcoin Learning Resources, Keeping Bitcoin in your head, African Language Resources, Why Bitcoin Only, Bitcoin White Paper. CTA: "Get 1,000 sats for your brilliant ideas!"

2. **Earn Bitcoin** (`/earn-bitcoin/`) — 3 cards: 1000 Sats Feedback Bounty, African Bitcoiner Jobs, Places to Earn Sats.

3. **Save Bitcoin** (`/save-bitcoin/`) — 7 cards: Bitcoin Inflation Simulator, Million Sat Challenge, Recommended Wallets, Where to Buy Bitcoin Privately, 5-Year Savings Calculator, Bitcoin Cold Storage Guide, Bitcoin to Fiat Converter.

4. **Spend Bitcoin** (`/spend-bitcoin/`) — 2 cards: Bitcoiners Map, Places to Spend Sats Online.

5. **Community** (`/community/`) — 6 cards: Most Impactful African Bitcoiners 2025, African Bitcoin Ecosystem, Treasury Manifesto, Bitcoin Mining, Hall of Fame, Bitcoin Meetups.

6. **About Us** (`/about-us/`) — 9 cards: Support Us, Proof of Work, About Us, Turns 3, Our Team, Connect with Us, Why We Are Private, Newsletter Archive, FAQs.

Each card's image should be a well-named placeholder (e.g., `learn-bitcoin-course-card.png`). The slug structure MUST match the current WordPress URLs exactly.

Add all these to the seed script.

After everything renders, update ROADMAP.md.
```

**Verification:** All 6 section pages render at their correct URLs. Card grids display in 3 columns (desktop), 1 column (mobile). CTA banners render at bottom. Breadcrumbs show correctly. Slugs match WP exactly.

---

## STEP 12: Content Sub-Pages (Batch Create) [x] ✅

**What:** Create all remaining content pages as Payload Page entries. These are the ~50+ sub-pages under each section. Most use the RichContent block — they're long-form text + images pages.

**Prompt:**
```
Read ROADMAP.md for full project context. Batch-create all content sub-pages as Page entries in Payload. For now, create them with:
- Correct slug (matching WP URL exactly)
- Correct title
- A placeholder RichContent block with "Content to be migrated from WordPress" text
- Correct parent page relationship (for breadcrumbs)
- Basic SEO meta (title, description — can be placeholder)

Create these pages (organized by section):

**Learn:**
- /learn-bitcoin/free-bitcoin-course/ (template: course — will have custom blocks added in Step 15)
- /academie-bitcoin-afrique/
- /learn-bitcoin/bitcoin-for-kids/ (template: resource listing — will be customized)
- /bitcoin-africas-guide-to-freedom-money/
- /learn-bitcoin/bitcoin-learning-resources/
- /learn-bitcoin/african-language-resources/
- /bitcoin-education-partnership/ (template: partnership)
- /learn-bitcoin/how-to-keep-bitcoin-in-your-head/
- /learn-bitcoin/top-10-bitcoin-misconceptions/
- /learn-bitcoin/why-bitcoin-only/
- /learn-bitcoin/bitcoin-whitepaper/

**Earn:**
- /earn-bitcoin/1000-sats-feedback-bounty/ (template: bounty)
- /earn-bitcoin/bitcoiner-jobs/
- /earn-bitcoin/places-to-earn-sats/

**Save:**
- /save-bitcoin/bitcoin-inflation-simulator/
- /save-bitcoin/million-sat-challenge/
- /save-bitcoin/recommended-bitcoin-and-lightning-wallets/
- /where-to-buy-bitcoin-privately-in-africa/
- /save-bitcoin/5-year-bitcoin-savings-calculator/
- /save-bitcoin/how-to-setup-your-bitcoin-cold-storage-for-free/
- /save-bitcoin/bitcoin-to-fiat-converter/

**Spend:**
- /spend-bitcoin/bitcoiners-map/
- /spend-bitcoin/places-to-spend-bitcoin/

**Community:**
- /the-most-impactful-african-bitcoiners-of-2025/ (template: miab)
- /african-bitcoin-ecosystem/
- /african-bitcoin-treasury-manifesto/
- /bitcoin-mining-in-africa/ (template: mining)
- /hall-of-fame/
- /bitcoin-meetups/

**About:**
- /about-us/support-us/
- /about-us/african-bitcoiners-proof-of-work/ (template: proof-of-work)
- /african-bitcoiners-turns-3/
- /about-us/our-team/
- /about-us/connect-with-us/ (template: form — Contact)
- /about-us/why-we-are-private/
- /faqs/

**Standalone:**
- /graduate-program/ (or /earn-bitcoin/bitcoiner-jobs/ sub-page)
- /donation-confirmation/
- /error/
- /get-certificate/
- /get-certificate-tg/
- /final-quiz-passed/ (English email)
- /final-quiz-passed-tg/ (English telegram)
- /final-quiz-failed/
- /step-by-step-guide-for-nostr/
- /her/ (Bitcoin for Her)
- /community-outreach/
- /feedback-bounty-matrix/

Add all these to the seed script. Use a loop/array pattern to keep the seed code maintainable.

After all pages are created, update ROADMAP.md.
```

**Verification:** All pages accessible at their correct slugs. Each shows placeholder content with correct title and breadcrumbs. No 404s on any of the URLs listed. Count matches: 40+ pages created.

---

## STEP 13: Newsletter Archive + Post Templates [x] ✅

**What:** Build the newsletter archive listing page and individual post template. Import sample posts to verify.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the newsletter system.

1. **Archive Page** (`/bitcoin-newsletter/`):
   Layout matches Newsletter_archive.png:
   - No hero, just breadcrumb at top
   - Two-column layout: main (posts list) + sidebar
   - Main: list of posts with title (linked), date prefix in title (e.g., "MSC |20th June 2026 |"), excerpt text, "Read More »" link
   - Sidebar widgets (sticky): (a) "Get our Weekly African Bitcoin Update" newsletter signup form (Name, Email, Country), (b) promotional cards with images (Africa Free Routing, BFB Course, Sats2Data) — these can be hardcoded or managed via a SidebarWidgets global
   - Pagination: numbered pages (1, 2, ... 45, Next →), 5 posts per page

2. **Post Template** (`/bitcoin-newsletter/[slug]/`):
   Two visual variants based on category:
   - **Weekly Newsletter (MSC)**: Orange banner header with edition number and date, then rich text body with sections (Update Highlights, Africa Bitcoin News embedded, Jobs section, Meetups section), "Reply to this Post" button, social share icons (Twitter, Instagram, Facebook, LinkedIn, WhatsApp). Reference: Newsletter_1.png
   - **Saturday Stacker**: Similar but different header styling, rich text body with "Your Saturday Action Step" section, "Quote of the Week", social share. Reference: Newsletter_2.png
   - Both have breadcrumbs at top

3. **Sidebar Components** — Create reusable sidebar components:
   - NewsletterSignupSidebar (compact form)
   - PromoCard (image + title + description, linked)

4. Create 3 sample newsletter posts in the seed script to verify both template variants work.

After everything renders, update ROADMAP.md.
```

**Verification:** `/bitcoin-newsletter/` shows paginated list with sidebar. Individual posts render with correct template variant. Breadcrumbs work. Pagination navigates correctly. Social share buttons render.

---

## STEP 14: Special Page Templates [x] ✅

**What:** Build the unique page templates that don't follow the standard content pattern.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the special page templates. Each references its screenshot.

1. **BFB Course Page** (reference: BFB_Course_page.png):
   Route: `/learn-bitcoin/free-bitcoin-course/`
   Sections: Hero (title with orange "Free" highlight, description, CourseModal button, social proof stats "Join 652 Graduates" + "4.8 ★ Average Course Rating"), decorative orange half-circles, "What You'll Get" section (image + 4 feature cards in 2x2 grid), "Our Partners" mini-section, "Ready to Begin?" CTA with second CourseModal instance (white variant), "Finished the course?" text with link.
   The CourseModal triggers hidden form sections (English Email, English Telegram, French Email, French Telegram). Build these as 4 form components that appear/hide below the modal. Forms connect to CourseSignups collection. Include unique code generation (7-char alphanumeric) stored in a hidden field.

2. **Feedback Bounty Page** (reference: Feedback_bounty.png):
   Route: `/earn-bitcoin/1000-sats-feedback-bounty/`
   Sections: Hero with bounty matrix table preview, "Get Started" button, "What is the deal?" section with image, "Why You Should Join the Party?" with 3 benefits, "How to Participate" 4-step process (zigzag layout), "Ready to Make a Difference?" CTA, "Want to stack even more sats?" link. The bounty matrix table and submission form are separate linked pages.

3. **Proof of Work Page** (reference: Proof_of_work_page.png):
   Route: `/about-us/african-bitcoiners-proof-of-work/`
   Sections: Hero with ReceiptWidget overlay on hand image, "OUR MISSION" statement with large text + Bitcoin image, "WHY THIS PAGE EXISTS" statement, "OUR INITIATIVES" product cards (3x3 grid with mockup images), TestimonialsCarousel, SupportSection.

4. **MIAB 2025 Page** (reference: MIAB_new.png, MIAB_new2.png):
   Route: `/the-most-impactful-african-bitcoiners-of-2025/`
   Pull from MIABNominees collection (year=2025). 2-column grid layout with numbered entries, alternating cream/orange/green card backgrounds, photo + name + flag + bio + social links. "View Other Years" carousel at bottom linking to older MIAB pages.

5. **Mining Page** (reference: Mining_page.png):
   Route: `/bitcoin-mining-in-africa/`
   Hero with mining image background. "Key Bitcoin Mining Operations" grouped by country with flag headers. Each org card shows logo, name, description, social links. "Why Africa?" feature section. "Submit A Mining Organization" form at bottom (uses MiningOrgs submission form).

6. **Education Partnership Page** (reference: Education_partnership.png):
   Route: `/bitcoin-education-partnership/`
   Partners section, CTA banner, "Why Partner With Us" 6-feature grid with icons, PricingTiers block (Basic free / Advanced 500k sats / Premium 1M sats, monthly/yearly toggle with 17% yearly discount), image + "Get In Touch" CTA, partnership application form.

7. **Bitcoin for Kids Page** (reference: Kids_page.png):
   Route: `/learn-bitcoin/bitcoin-for-kids/`
   Hero, "Free Resources" card grid (3-column, 4 items with book covers), featured section (Veintiuno), "Paid Resources" card grid (3-column, 9 items with book covers), BFB Course signup form at bottom, "Get 1,000 sats" CTA.

8. **Contact Page** (reference: Contact_page.png):
   Route: `/about-us/connect-with-us/`
   Orange hero banner "Connect With Us", social media icon circles, contact form (Name, Email, Country select, Message textarea, Submit).

Build each as either: (a) a custom page template component triggered by the `template` field on the Page collection, or (b) a composition of blocks in the seed script. Option (b) is preferred for team editability.

After all templates render, update ROADMAP.md.
```

**Verification:** Each special page renders at its correct URL matching its reference screenshot. CourseModal works with tab switching. PricingTiers toggle works. MiningDirectory renders grouped by country. All responsive.

---

## STEP 15: Forms System — Core Site Forms [x] ✅

**What:** Build the custom form components that replace Gravity Forms. These are React components with React Hook Form + Zod validation that submit to the FormSubmissions collection and trigger server-side actions.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the forms system.

1. **Form infrastructure:**
   - Create a generic `useFormSubmit` hook that handles: validation, submission to `/api/forms/submit` endpoint, loading/success/error states, reCAPTCHA or honeypot spam protection
   - Create `/api/forms/submit` route that: saves to FormSubmissions collection, optionally sends notification email, optionally syncs to Google Sheets, optionally syncs to ActiveCampaign
   - Form notification emails use the Group system from the old plugin: Group1-4 team distribution lists (map these as config)

2. **Contact Form** (GF ID 91): Name, Email, Country (Africa select), Message. On submit: save + email Group2.

3. **Newsletter Signup** (GF ID 7): Name, Email, Country. On submit: save + sync to ActiveCampaign newsletter list.

4. **Savings Challenge Signup** (GF ID 93): Name, Email, Weekly sats amount (number), Country, Newsletter consent checkbox. On submit: save + sync to AC "A Billion African Millionaires" list.

5. **Donation Form** (GF ID 128): Currency select, Amount input, Name (optional), Email (optional), Message (optional). On submit: create BTCPay invoice via `/api/btcpay/create-invoice` → redirect to checkout. (BTCPay integration is a later step — for now, save submission and show a "BTCPay integration pending" message.)

6. **Job Submission Form** (GF ID 41): Company name, description, website, contact name/email, job title, type, location, description, Bitcoin verification consent. On submit: save to Jobs collection (status: pending review) + email Group2.

7. **Map Location Submission** (GF ID 75): Merchant name, description, website, address, email, phone, services list, accepts Lightning (yes/no). On submit: save to MapLocations + email Group1.

8. **Bitcoin Meetup Submission** (GF ID 84): Name, description, location, dates, time, flyer upload, contact info, consent. On submit: save to MeetupSubmissions + email Group3.

9. **Volunteer Form** (GF ID 90): Name, Email, Country, skills, availability, consent. On submit: save + Google Sheets sync + email Group4.

10. **1000 Sats Feedback Bounty Form** (GF ID 136): Name, Email, Social link, Country, Feedback title, Category (select), Description (textarea), Screenshot upload, Has given feedback before (yes/no), consent. On submit: save to FeedbackBounties collection (status: Pending) + Google Sheets sync + email Group2.

Each form component should be a client component using React Hook Form with Zod schema validation. Match the existing form styling (rounded inputs, orange submit button, field labels above inputs).

After all forms work, update ROADMAP.md.
```

**Verification:** Each form renders on its respective page. Validation works (try submitting empty). Successful submission saves to correct Payload collection. Console confirms API call. `pnpm build` passes.

---

## STEP 16: BFB Course System [x] ✅

**What:** Build the Bitcoin for Beginners course signup, quiz, feedback, and certificate system. This is the most complex feature on the site.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the BFB Course system.

**A. Course Signup (4 form variants):**
1. English Email (GF 4): Name, Email, Country, "How did you hear?", consent. On submit: save to CourseSignups (courseLang: English, deliveryMethod: email), generate unique 7-char code, sync to ActiveCampaign BFB list.
2. English Telegram (GF 129): Same but no email field, deliveryMethod: telegram. Generates unique code. After submit, redirect to Telegram bot deep link with base64-encoded params: `https://t.me/bitcoin_for_beginners_course_bot/?start=${btoa(name:uniqueCode:English)}`
3. French Email (GF 165): French labels, courseLang: French.
4. French Telegram (GF 166): French labels, no email, courseLang: French.

The CourseModal component (built in Step 9) toggles visibility of these 4 form sections on the page.

**B. Daily Quiz Engine:**
Create a parameterized quiz component (`src/components/CourseQuiz/`). Fields: day number, language, questions array. Instead of 40 separate forms (20 days × 2 languages), build ONE quiz component that receives its questions as props from a data file.

Create `src/data/course-quizzes.ts` with all quiz questions (10 per day × 20 days × 2 languages). Structure: `{ day: number, lang: 'en'|'fr', questions: [{question, options: string[], correctIndex}] }`.

Quiz component: multi-page form (10 questions), radio inputs, email field, auto-score on submit, save to FormSubmissions with score.

Route: `/learn-bitcoin/day-[n]-quiz/` and `/learn-bitcoin/quiz-du-jour-[n]/`

**C. Daily Feedback Engine:**
Parameterized feedback form. Fields: day number, 3 rating questions (radio 1-5), improvement textarea, email. Save to FormSubmissions + Google Sheets sync.

Route: `/learn-bitcoin/day-[n]-feedback/`

**D. Final Quiz System (4 variants):**
50-question multi-page quiz (10 questions per page, 5 pages). Name, Email/UniqueCode, Phone (optional). Auto-generate unique completion code. Score on submit. If score >= 70%: generate cert number (BC000001+), save to CourseCompletions, send completion email with certificate download link and TBT discount code. If score < 70%: redirect to fail page.

Routes: `/final-quiz/`, `/final-quiz-tg/`, `/final-quiz-fr/`, `/final-quiz-tg-fr/`
Pass/Fail pages: `/final-quiz-passed/`, `/final-quiz-failed/` etc.

**E. Certificate System:**
- Certificate retrieval form: user enters email (or unique code for TG), system looks up CourseCompletions, checks 19-day wait from signup date, if valid → show certificate + download button
- Certificate image generation: use canvas or SVG template with dynamic name, date, cert number overlaid on template image. Two templates: English and French. Tier variants: basic, advanced, premium.
- PDF download: generate PDF from certificate image using pdf-lib
- Route: `/get-certificate/`, `/get-certificate-tg/`

**F. NPS Feedback Forms:**
One parameterized NPS component for all 7 variants (Course Final, Donation, Map, Posts, General, Applications, Partnership). Fields: "How likely to recommend?" (1-10 radio), reason text, context-specific rating question, reason text, improvement textarea. Save + Google Sheets sync.

After the full course flow works end-to-end, update ROADMAP.md.
```

**Verification:** Complete course signup flow: fill modal form → unique code generated → saved to CourseSignups. Quiz flow: answer 10 questions → score calculated → saved. Final quiz: 50 questions → score ≥ 70% → cert number generated → saved to CourseCompletions. Certificate download: enter email → certificate displayed → PDF downloads. `pnpm build` passes.

---

## STEP 17: Feedback Bounty Admin System [x] ✅

**What:** Build the admin-side bounty management system — status updates, voucher assignment, automated emails.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the Feedback Bounty admin management system.

1. **Admin Dashboard View:**
   In Payload admin, the FeedbackBounties collection list view should show: Bounty ID, Date, Name, Email, Category, Description (truncated), Status (color-coded), Reward Status, Implementation Date.

2. **Status Workflow:**
   When an admin changes a bounty's status, trigger automated actions via a Payload `afterChange` hook:
   - **Accepted**: set rewardStatus to "Paid", fetch next unused voucher from Vouchers collection, mark it as sent (sentTo = email, sentDate = now), send acceptance email with voucher code
   - **Not accepted**: set rewardStatus to "Not paid", send rejection email
   - **Idea**: set rewardStatus to "Pending", send "under consideration" email
   - **Under review**: set rewardStatus to "Processing", send "under review" email
   - **Implemented**: set rewardStatus to "Paid", set implementationDate to now
   - **Pending**: set rewardStatus to "Pending" (no email)

3. **Email Templates:**
   Create HTML email templates in `src/lib/email-templates/` for each status. Match the existing email content from the feedback-bounty-matrix.php plugin (congratulations with voucher redemption instructions, rejection, idea consideration, under review).

4. **Public Matrix Page:**
   The `/feedback-bounty-matrix/` page renders the FeedbackMatrix block pulling from FeedbackBounties collection. Read-only public view with search and sort. No admin controls visible on public side.

5. **Vouchers Collection:**
   Pre-populate with LNURL voucher codes (these will be imported from the old system). Admin can add new vouchers via the Vouchers collection.

After the full workflow works, update ROADMAP.md.
```

**Verification:** Create a test bounty submission. Change status to "Accepted" in admin → voucher assigned, email sent (check logs). Change to "Not accepted" → rejection email. Public matrix page shows all bounties with correct status badges.

---

## STEP 18: Integrations — ActiveCampaign + BTCPay + Google Sheets [x] ✅

**What:** Connect all external services.

**Prompt:**
```
Read ROADMAP.md for full project context. Build all external integrations.

1. **ActiveCampaign** (`src/lib/activecampaign.ts`):
   - `addContact(email, name, listName)` — adds/updates contact and subscribes to specified list
   - `getListCount(listName)` — returns subscriber count (used for dynamic counters: "Join X Savers")
   - Wire up: Newsletter signup → AC newsletter list, BFB signup → AC BFB list, Savings Challenge → AC MSC list
   - Create API route `/api/activecampaign/count?list=<name>` for dynamic count display

2. **BTCPay Server** (`src/lib/btcpay.ts`):
   - `createInvoice(amount, currency, metadata)` — creates invoice via BTCPay Greenfield API, returns checkout URL
   - Webhook handler at `/api/webhooks/btcpay` — verifies HMAC signature, on InvoiceSettled: fetches invoice metadata, sends admin notification email (to Group4 emails), sends donor thank-you email
   - Wire up: Donation form submission → createInvoice → redirect to checkout

3. **Google Sheets** (`src/lib/google-sheets.ts`):
   - `appendRow(spreadsheetId, range, values)` — appends row to specified sheet
   - Wire up all form submissions that currently sync to sheets (use the same spreadsheet IDs from the old plugin):
     - BFB daily feedback (Days 1-20) → BFB Feedback Sheets
     - NPS feedback (all variants) → respective NPS sheets
     - 1000 Sats Feedback Bounty → bounty sheet
     - Volunteers → Volunteers sheet
     - Graduate Programme → GRAD APP LIVE SHEET
     - MIAB Nominations → Nominations sheet

4. **Email Service** (`src/lib/email.ts`):
   - Use Resend (or Gmail API). `sendEmail(to, subject, htmlBody, cc?)` function
   - Create reusable HTML email template wrapper with AB branding (logo header, social icons footer)
   - Wire up all email triggers: form notification groups, donation confirmations, bounty status emails, course completion emails, certificate emails

After all integrations work, update ROADMAP.md.
```

**Verification:** Submit newsletter form → contact appears in ActiveCampaign. Submit donation → BTCPay invoice created, redirect works. BTCPay webhook test → admin email sent. Form submission → row appears in Google Sheet. All emails send correctly.

---

## STEP 19: Interactive Tools (Remaining) [x] ✅

**What:** Build the savings calculator and BTC-fiat converter (inflation simulator was built in Step 9).

**Prompt:**
```
Read ROADMAP.md for full project context. Build the remaining interactive tools.

1. **5-Year Bitcoin Savings Calculator** (`/save-bitcoin/5-year-bitcoin-savings-calculator/`):
   Client component. Inputs: monthly savings amount, currency select (African currencies), savings period (1-5 years). Calculates: total saved in fiat, equivalent in sats at current rate, projected value. Results display with comparison cards similar to inflation simulator. Uses a simple Bitcoin price fetch or hardcoded recent price.

2. **Bitcoin to Fiat Converter** (`/save-bitcoin/bitcoin-to-fiat-converter/`):
   Client component. Inputs: amount, from (BTC/sats/fiat), to (fiat/BTC/sats), currency select (African currencies). Real-time conversion display. Can use CoinGecko free API or a hardcoded rate with "last updated" timestamp.

3. **Start Here Quiz** (homepage popup or `/start-here/`):
   The 5-question Bitcoin knowledge assessment from the homepage. Radio questions, calculates total score, shows result category (beginner/intermediate/advanced) with recommended next steps. This was GF form 143.

Create pages for each and add the appropriate block to them.

After all tools work, update ROADMAP.md.
```

**Verification:** Each tool calculates correctly with valid inputs. Edge cases handled (zero, negative, very large numbers). Responsive layout. Calculator results display properly.

---

## STEP 20: AI Chatbot Widget [x] ✅

**What:** Port the AI chatbot widget to a React component.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the AI Chatbot widget.

Port the existing chatbot (from WPCode snippet) to `src/components/ChatbotWidget/`:

1. **Trigger**: Circular icon (bottom-right, fixed position) with the chatbot avatar image. Click opens the chat window.
2. **Chat Window**: 380px wide, 90vh tall. Header with title "Hey, I'm your African Bitcoin Sidekick" + description + close button. Messages area with user (orange, right-aligned) and bot (gray, left-aligned) bubbles. Suggested searches (3 buttons: "What is Bitcoin?", "Why does Bitcoin matter for Africa?", "Who are African Bitcoiners?"). Text input + send button.
3. **Chat Logic**:
   - Generate userId (localStorage) and sessionId (sessionStorage) — same pattern as existing
   - On send: POST to CHATBOT_API_URL with {message, user_id}
   - Display response
   - Log conversation: POST to CHATBOT_LOG_URL with {user_id, session_id, user_input, ai_response}
   - Handle loading state ("Thinking..." message)
   - Handle errors gracefully
4. **Behavior**: Starts closed. Suggested searches fill input and auto-send. Enter key sends. Hide suggestions after first message. Scroll to bottom on new message.

Match the styling exactly from the existing widget (reference the CSS in the chatbot WPCode snippet).

After the chatbot works, update ROADMAP.md.
```

**Verification:** Chatbot icon appears bottom-right on all pages. Click opens window. Type message → response from API. Suggestions work. Close button works. Mobile responsive.

---

## STEP 21: SEO + Sitemaps + Analytics [x] ✅

**Status:** Complete — 2026-06-24

**What was done:**
- `generateMeta()` updated to accept optional `url` param; now includes `alternates.canonical` (full URL) on every Page and Post
- OG `url` field now uses the canonical absolute URL instead of a bare slug
- `generateMetadata()` in all page routes (`[slug]`, `[slug]/[subpage]`, `bitcoin-newsletter/[slug]`) now pass the correct path to `generateMeta`
- Google site verification: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var wired into layout metadata via `verification.google`; added to `.env.example`
- Posts sitemap (`posts-sitemap.xml`) URL fixed from `/posts/` → `/bitcoin-newsletter/` to match the actual post routes
- Pages sitemap (`pages-sitemap.xml`) now includes `/bitcoin-newsletter` as a static entry; removed stale `/posts` entry; deduplicates entries; excludes the `home` slug (root `/` already included)
- GTM script verified present in layout with noscript fallback; no client-side analytics libs added
- `JsonLd` component created (`src/components/JsonLd.tsx`) — renders `<script type="application/ld+json">`
- Organization schema added to homepage (`/` slug = 'home')
- Article schema + BreadcrumbList schema added to newsletter post pages (`/bitcoin-newsletter/[slug]`)
- BreadcrumbList schema added to `[slug]/page.tsx` and `[slug]/[subpage]/page.tsx` for pages with parent relationships
- FAQPage schema added to `/faqs/` page (5 hardcoded Q&A pairs from the live site)
- `pnpm build` and `tsc --noEmit` both pass clean

**What:** Replace Yoast SEO with Next.js metadata, generate sitemaps, set up analytics.

**Prompt:**
```
Read ROADMAP.md for full project context. Implement SEO, sitemaps, and analytics.

1. **SEO Metadata:**
   - Every Page and Post has a `meta` group field with: metaTitle, metaDescription, ogImage
   - In page routes, use Next.js `generateMetadata()` to set: title, description, Open Graph (title, description, image, url, siteName: "African Bitcoiners", type), Twitter card (card: summary_large_image, site: @afribitcoiners)
   - Default OG image: the AB logo
   - Canonical URL for every page
   - Google site verification meta tag

2. **Sitemaps:**
   - Use `next-sitemap` or custom generation
   - `/sitemap.xml` — index pointing to page-sitemap.xml and post-sitemap.xml
   - `/page-sitemap.xml` — all published pages
   - `/post-sitemap.xml` — all published newsletter posts
   - Include lastmod dates, image references
   - `/robots.txt` — allow all, point to sitemap

3. **Analytics:**
   - GTM script in root layout (already added in Step 7, verify it fires)
   - GA4 via GTM — preserve the existing GTM-P3M4DLWQ container
   - No client-side analytics libraries — all via GTM

4. **Structured Data:**
   - Organization schema on homepage
   - Article schema on newsletter posts
   - BreadcrumbList schema on all pages with breadcrumbs
   - FAQPage schema on /faqs/

After everything is configured, update ROADMAP.md.
```

**Verification:** View page source → meta tags present. `/sitemap.xml` returns valid XML with all pages. `/robots.txt` accessible. Google Rich Results Test shows valid structured data. GTM fires (check browser Network tab for gtm.js).

---

## STEP 22: Content Migration — WP Export + Import [x] ✅

**Status:** Complete — 2026-06-24

**What was done:**
- `RichContent` block: added `rawHtml` (textarea) field; Component renders it with `dangerouslySetInnerHTML` + `prose` styles when present, otherwise falls back to Lexical rich text
- Posts collection: added `rawHtml` textarea field; newsletter post template renders it when present
- `scripts/export-wp-content.ts`: custom WXR parser (no external deps) splits 55MB XML by `<item>` boundaries, extracts fields from CDATA, exports `pages.json` (85 published pages), `posts.json` (269 newsletter posts), `media.json` (2887 attachments) to `scripts/exports/`
- `scripts/migrate-media.ts`: downloads WP media files concurrently (5 workers) to `public/images/wp-content/`, generates `url-mapping.json`; supports `--limit`, `--skip-existing` flags
- `scripts/import-pages.ts`: upserts pages into Payload via local API; skips pages with real block content (non-placeholder), replaces placeholder pages with `rawHtml` RichContent block; supports `--force`, `--dry-run`; dry-run verified: 63 create / 13 update / 9 skip
- `scripts/import-newsletters.ts`: upserts Posts collection; maps WP category "Bitcoin Newsletter" → `weekly-newsletter`, "Saturday Stacker" → `saturday-stacker`; stores HTML in `rawHtml` field; supports `--force`, `--dry-run`, `--since=<date>`; dry-run verified: 269 posts to create
- `scripts/generate-redirects.ts`: generates 299 redirects from WP URLs to new route structure; updates `redirects.ts` to load from `scripts/exports/redirects.json`
- `pnpm import:pages` and `pnpm import:newsletters` scripts updated to use `--env-file=.env`
- `tsc --noEmit` and `pnpm build` both pass clean

**What:** Export all content from the WordPress site via REST API and import into Payload.

**Prompt:**
```
Read ROADMAP.md for full project context. Build the content migration pipeline.

1. **WP Export Script** (`scripts/export-wp-content.ts`):
   - Fetch all pages from WP REST API: `GET /wp-json/wp/v2/pages?per_page=100&_fields=id,slug,title,content,excerpt,featured_media,parent,meta`
   - Paginate through all pages
   - Fetch all posts (newsletter): `GET /wp-json/wp/v2/posts?per_page=100&categories=<newsletter-cat>&_fields=id,slug,title,content,excerpt,date,featured_media`
   - Paginate through all posts (250+)
   - For each featured_media ID, fetch the image URL
   - Save all data as JSON files in `scripts/exports/`

2. **Media Migration Script** (`scripts/migrate-media.ts`):
   - Read all image URLs from the export JSON
   - Download each image from `bitcoiners.africa/wp-content/uploads/...`
   - Upload to R2 bucket (or save to `public/images/` with matching path structure for dev)
   - Generate a URL mapping file: `{oldUrl: string, newUrl: string}`
   - Name images descriptively: derive from the file path

3. **Page Import Script** (`scripts/import-pages.ts`):
   - Read exported pages JSON
   - For each page, create/update a Payload Page entry:
     - Map WP slug to Payload slug
     - Convert WP HTML content to Payload Lexical rich text (use a converter or create a RichContent block with raw HTML rendered via `dangerouslySetInnerHTML` as a temporary measure)
     - Map featured_media to uploaded Media entry
     - Set SEO meta from WP Yoast meta if available
   - Handle parent-child relationships

4. **Newsletter Import Script** (`scripts/import-newsletters.ts`):
   - Same pattern for posts → Payload Posts collection
   - Map categories to Post category field
   - Preserve published dates
   - Replace image URLs in content with new R2 URLs using the mapping file

5. **URL Redirect Map** (`scripts/generate-redirects.ts`):
   - Compare WP slugs to new route structure
   - Generate a redirects array for `next.config.mjs`
   - Any URL that changed structure gets a 301 redirect
   - Most URLs should remain identical (this is by design)
   - Output as `redirects.json` for import into next.config.mjs

After migration scripts work, update ROADMAP.md.
```

**Verification:** Run `pnpm export:wp` → JSON files generated with all pages and posts. Run `pnpm import:media` → images downloaded. Run `pnpm import:pages` → pages appear in Payload admin with content. Run `pnpm import:newsletters` → all 250+ posts imported. Run `pnpm redirects:generate` → redirects.json generated. Spot-check 10 random pages and posts for content accuracy.

---

## STEP 23: Legacy Data Import + Admin Tools [x] ✅

**Status:** Complete — 2026-06-24

**What was done:**
- **Import Data UI** (`/admin/import-data`): upload CSV/JSON, select target collection, map columns to Payload fields (auto-detect + manual override), preview first 5 rows, batched import with progress bar, results summary (imported/skipped/errors). Admin-only access.
- **CLI import script** (`scripts/import-legacy-data.ts`): refactored to use shared `src/lib/legacy-import.ts` mappers. Supports `course-signups`, `course-completions`, `feedback-bounties`, `vouchers`, `form-submissions` with `--dry-run` and `--force` flags. Preserves cert numbers and hashes on course completions.
- **Database Management** (`/admin/database`): collection browser with record counts, per-collection record search, 5 most recent entries, CSV export, bulk delete with confirmation, recent admin operations log. Admin-only access.
- **Admin APIs**: `/api/admin/import`, `/api/admin/stats`, `/api/admin/export`, `/api/admin/bulk-delete` — all admin-gated via Payload session auth.
- **Operations log**: hidden `admin-ops-log` global stores last 100 import/export/bulk-delete operations.
- **Role access verified**: viewers can read all authenticated collections including form submissions (read-only); editors have CRUD on content collections but cannot access Site Settings, Header, Footer globals (admin-only update); import/database tools blocked for non-admins in UI and API.
- Dashboard welcome panel links to Import Data and Database Management tools.
- `pnpm build` and `tsc --noEmit` both pass clean.

**What:** Build admin dashboard tools for importing legacy database data (course signups, completions, bounty entries, form submissions) and managing database records.

**Prompt:**
```
Read ROADMAP.md for full project context. Build admin data management tools.

1. **Legacy Data Import UI:**
   Create a custom Payload admin view at `/admin/import-data` (using Payload's custom admin views feature):
   - Upload CSV/JSON files
   - Select target collection (CourseSignups, CourseCompletions, FeedbackBounties, Vouchers, FormSubmissions)
   - Map columns to fields
   - Preview import (first 5 rows)
   - Execute import with progress bar
   - Show results: imported count, errors, skipped

2. **Import Scripts** (`scripts/import-legacy-data.ts`):
   For command-line import of large datasets:
   - Import `wp_bitcoin_course_signup` → CourseSignups collection
   - Import `wp_bitcoin_course_completion` → CourseCompletions (preserve cert numbers and hashes!)
   - Import `wp_feedback_bounty` → FeedbackBounties
   - Import `wp_feedback_bounty_vouchers` → Vouchers
   - Import Gravity Forms entries (exported as JSON from WP) → FormSubmissions
   Accept CSV or JSON input. Log all imports.

3. **Database Management Panel:**
   Create a custom admin view at `/admin/database`:
   - Collection browser: select any collection → see record count, recent entries
   - Quick search across any collection
   - Bulk export: select collection → download as CSV
   - Bulk delete with confirmation (admin only)
   - Raw query viewer (admin only): shows recent Payload operations log

4. **User Roles Verification:**
   Payload already handles roles. Verify:
   - Admin: full access to all collections, globals, settings, import tools, database panel
   - Editor: CRUD on Pages, Posts, Jobs, Media, FormSubmissions. No access to settings, import tools, or database panel
   - Viewer: read-only access to all content, can view form submissions but not edit

After everything works, update ROADMAP.md.
```

**Verification:** Admin can access `/admin/import-data`, upload a CSV, map fields, and import records. Records appear in the correct collection. Database panel shows collection stats. Editor cannot access import or database tools. CSV export downloads correctly. Legacy cert numbers preserved after import.

---

## STEP 24: Multilingual Setup (French) [SKIPPED]

**Status:** Skipped — 2026-06-24

**Reason:** Payload localization requires destructive column migrations that would delete existing page and post content (titles, excerpts, meta descriptions for 96 pages and 272 posts). French support will be added later with proper data migration planning.

**What was reverted:**
- Removed `localization` config from `payload.config.ts`
- Removed `localized: true` from Pages and Posts collection fields
- `LanguageSwitcher` replaced with non-functional placeholder (shows "English" only)
- `locale.ts` / `locale-shared.ts` hardcode `'en'` — no cookie-based locale switching
- Removed locale query parameters from all Payload `find()` calls
- Set `push: false` in database adapter (no automatic schema push)
- Removed `/api/locale` route and `seed:locale` script

**What:** Configure Payload's localization for French content.

**Prompt:**
```
Read ROADMAP.md for full project context. Set up multilingual support.

1. Configure Payload localization in `payload.config.ts`:
   - Locales: `en` (default), `fr`
   - Localized fields: title, content/blocks, meta (title, description) on Pages and Posts
   - Localized fields on other collections as needed

2. Create a language switcher component for the header (replacing the GTranslate placeholder):
   - Dropdown with flag icons (🇬🇧 English, 🇫🇷 Français)
   - Stores preference in cookie
   - On switch: re-renders page with French locale content (if available), falls back to English

3. Create French versions of key pages (as localized variants in Payload):
   - Académie Bitcoin Afrique page
   - French course signup forms (already built, just need French labels)
   - French final quiz (already parameterized by language)

4. For pages without French translations, show English content (Payload's fallback locale behavior).

After i18n works, update ROADMAP.md.
```

**Verification:** Switch to French → Académie page shows French content. Switch back → English. Pages without French translation show English. Language preference persists across pages.

---

## STEP 25: Pre-Launch — Deployment + QA [ ]

**What:** Deploy to Render staging, run full QA.

**Prompt:**
```
Read ROADMAP.md for full project context. Prepare for deployment.

1. **Render Setup:**
   - Create a Web Service on Render for the Next.js + Payload app
   - Set all environment variables from .env.example
   - Configure build command: `pnpm build`, start command: `pnpm start`
   - Set up Neon database connection (pooled connection string)
   - Configure R2 storage with production credentials
   - Set up custom domain: staging.bitcoiners.africa (or similar)

2. **QA Checklist:**
   - [ ] Every page from the WP sitemap loads at its correct URL (no 404s)
   - [ ] Homepage matches screenshot exactly
   - [ ] All navigation dropdowns work
   - [ ] All forms submit successfully
   - [ ] Course signup → quiz → certificate flow works end-to-end
   - [ ] Feedback bounty submission + admin status change works
   - [ ] Donation flow creates BTCPay invoice
   - [ ] Newsletter archive paginated correctly (all 250+ posts)
   - [ ] Mobile responsive on all pages (test at 375px, 768px, 1024px)
   - [ ] Lighthouse scores: Performance > 80, Accessibility > 90, SEO > 90
   - [ ] Sitemap.xml valid and complete
   - [ ] OG/Twitter meta tags present on all pages
   - [ ] 301 redirects working for any changed URLs
   - [ ] Admin dashboard accessible at /admin
   - [ ] All user roles work (admin, editor, viewer)
   - [ ] GA4/GTM fires on page loads
   - [ ] Chatbot widget works
   - [ ] Certificate PDF generation works
   - [ ] Social share buttons work

3. **Team Training Doc:**
   Create a brief admin guide covering: how to create/edit pages, how to publish newsletters, how to manage bounties, how to add jobs, how to import data.

After staging is live and QA passes, update ROADMAP.md.
```

**Verification:** Staging site accessible. All QA checklist items pass. Team members can log in and perform basic content operations. Lighthouse audit passes thresholds.

---

## STEP 26: DNS Cutover + Launch [ ]

**What:** Switch production DNS from WordPress to the new site.

**Prompt:**
```
Read ROADMAP.md for full project context. Execute the launch.

1. **Pre-cutover (day before):**
   - Final content sync from WP (any new posts/pages since migration)
   - Run `pnpm import:newsletters` with date filter for only new posts
   - Verify 301 redirects file is complete
   - Backup old WP site (full backup via hosting provider)
   - Inform team of content freeze window

2. **DNS Cutover (low-traffic window — early morning UTC):**
   - Point bitcoiners.africa A/CNAME records to Render
   - Update Cloudflare DNS if using Cloudflare
   - Verify SSL certificate provisions correctly
   - Test: bitcoiners.africa loads the new site

3. **Post-cutover (first 24 hours):**
   - Monitor error logs on Render
   - Monitor Google Search Console for crawl errors
   - Submit new sitemap to Google Search Console
   - Verify Google Analytics data flowing
   - Check all forms submit correctly in production
   - Check BTCPay webhooks pointing to new endpoint
   - Check ActiveCampaign integrations working
   - Team does manual smoke test of 20 key pages

4. **Post-launch (first 2 weeks):**
   - Daily GSC + GA4 check for traffic drop patterns
   - Bug triage from team reports
   - Performance tuning based on Render metrics
   - Address any SEO ranking drops with targeted fixes
   - Document any issues for retrospective

After launch is confirmed stable, update ROADMAP.md.
```

**Verification:** bitcoiners.africa resolves to new site. SSL valid. All forms work in production. Analytics tracking. No critical errors in logs for 24 hours.

---

## FUTURE ENHANCEMENTS (No Steps Defined Yet)

These are improvements for after launch stabilization:

- Full-text search (Payload + Algolia or Meilisearch)
- Bitcoin Ecosystem interactive infographic (currently an SVG map — may link to directory.bitcoiners.africa instead)
- Bitcoiners Map (interactive map with MapBox/Google Maps for merchant locations)
- Advanced chatbot analytics dashboard (replace the incomplete AI Chatbot plugin)
- A/B testing on course signup flows
- Automated newsletter post creation from ActiveCampaign emails
- Performance optimization (edge caching, ISR fine-tuning)
- PWA support for mobile users
- Nostr integration (NIP-05 verification, Nostr login)
- Email drip automation migration from ActiveCampaign to self-hosted
- Advanced admin dashboard with traffic stats, form analytics, funnel metrics
