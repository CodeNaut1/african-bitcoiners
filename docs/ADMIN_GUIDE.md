# African Bitcoiners CMS — Admin Guide

Quick reference for the content team using Payload at `/admin`.

## Logging in

1. Go to `https://bitcoiners.africa/admin` (or staging URL).
2. Sign in with your `@bitcoiners.africa` or `@freerouting.africa` email.
3. Roles:
   - **Admin** — full access, import tools, database panel, site settings
   - **Editor** — create/edit pages, posts, jobs, media, form submissions
   - **Viewer** — read-only access to all content

## Pages

**Create or edit a page:** Admin → Collections → Pages

1. Set **Title** and **Slug** (slug must match the live URL path, e.g. `learn-bitcoin/free-bitcoin-course`).
2. Add blocks in the **Content** field (Hero, Card Grid, Rich Content, CTA, etc.).
3. Fill **SEO** meta title and description.
4. Set **Parent** for breadcrumb hierarchy on sub-pages.
5. Choose **Template** for special layouts (course, bounty, mining, etc.).
6. Click **Publish** (or save as draft).

**French content:** Use the locale switcher (EN / FR) in the admin bar. English is the default; French fields fall back to English when empty.

## Newsletter posts

**Publish a newsletter:** Admin → Collections → Posts

1. Set title, slug, category (Weekly Newsletter / Saturday Stacker), and published date.
2. Add content in the rich text editor (or raw HTML for migrated posts).
3. Set excerpt for archive listings.
4. Add featured image and SEO meta.
5. Publish.

Posts appear at `/bitcoin-newsletter/[slug]`. The archive paginates at `/bitcoin-newsletter`.

## Feedback bounties

**Review submissions:** Admin → Collections → Feedback Bounties

1. Open a submission to change **Status** (Pending, Under review, Accepted, etc.).
2. Changing status triggers automated emails and voucher assignment when accepted.
3. **Public matrix:** `/feedback-bounty-matrix/` shows all entries (read-only).

**Vouchers:** Admin → Collections → Vouchers — add LNURL codes; they are auto-assigned on acceptance.

## Jobs

**Add a job:** Admin → Collections → Jobs — fill company, title, location, description, set **Is Active**.

**Public submissions:** Visitors submit via the job form; entries appear as pending for editor review.

## Import legacy data

**Admin → Import Data** (`/admin/import-data`) — admin only

1. Select collection (course signups, completions, bounties, vouchers, form submissions).
2. Upload CSV or JSON export from WordPress.
3. Map columns → preview → import.

CLI for large imports: `pnpm import:legacy -- --collection course-signups --file path/to/file.csv`

## Database tools

**Admin → Database** (`/admin/database`) — admin only

- Browse collection counts and recent records
- Search within a collection
- Export CSV
- Bulk delete (with confirmation)

## Site settings

**Admin → Globals**

- **Header** / **Footer** — navigation and footer links (admin only)
- **Site Settings** — logo, favicon, GTM ID, chatbot toggle (admin only)
- **ActiveCampaign Settings** — map forms to AC lists
- **Google Sheets Settings** — map forms to spreadsheet IDs

## Support

Technical issues: EM (Head of Technology) — em@bitcoiners.africa
