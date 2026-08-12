# Data Sources — exact calls, date math, and validated caveats

Validated against real client data. GSC reproduced the search console's headline numbers exactly;
DataForSEO matched on referring domains but diverged on keywords/traffic; ClickFlow is not
client-provisioned.

## Table of contents
1. Resolving the GSC property
2. GSC — compare windows and how to pull totals correctly
3. GSC — top queries, branded split, top pages
4. Recent page/blog performance (sitemap recency + GSC page/query)
5. DataForSEO — links and competitors (and what NOT to use it for)
6. Ahrefs Site Explorer & Brand Radar — pasted by the user
7. ClickFlow — why it's not used for clients
8. Reading the agenda doc
9. Appending the approved section to the doc
10. Gong — finding the client's calls and extracting outstanding items

---

## 1. Resolving the GSC property

Call `google_searchconsole_sites` and match the client domain. Properties come in two forms:
`sc-domain:example.com` (domain property, covers all subdomains/protocols — prefer this) and
`https://www.example.com/` (URL-prefix). If both exist, prefer the `sc-domain:` one for complete
totals. Example: `example.com` → `sc-domain:example.com`.

## 2. GSC — compare windows and how to pull totals correctly

Tool: `google_searchconsole_analytics({ siteUrl, startDate, endDate, dimensions, rowLimit })`.
Dates are `YYYY-MM-DD`. GSC data lags ~2–3 days, so the latest reliable `endDate` is today − 3.

Run `scripts/date_windows.js [YYYY-MM-DD]` (defaults to today) to get all window date pairs:

- **Last 2 weeks vs. prior 2 weeks** — "since our last meeting."
- **Last 3 months vs. previous 3 months** — the trend (the manager's "3 months compared to previous period").
- **Year-over-year** — trailing 30 days vs. the same 30 days last year (seasonality-adjusted).

**Getting accurate totals — important.** Do NOT read totals off the `query` dimension: GSC caps and
anonymizes long-tail queries, so summing query rows undercounts impressions dramatically (validated:
the query-sum came out a small fraction of the true total). Instead pull with `dimensions: ["date"]` and **sum the
daily rows** — this reproduces the console's headline totals exactly. Compute:
- clicks = Σ daily clicks; impressions = Σ daily impressions
- CTR = clicks / impressions
- avg position = Σ(position × impressions) / Σ impressions  (impression-weighted)

Do this for both the current and prior window, then report the deltas (absolute and %).

## 3. GSC — top queries, branded split, top pages

- **Top queries:** `dimensions: ["query"]`, `rowLimit: 1000`, sort by clicks. Good for "what's driving
  clicks" and for spotting movers between windows.
- **Branded vs. non-branded:** pull the query dimension, then client-side classify each query as
  branded if it contains the brand name or its common misspellings/variants (e.g., for a brand
  "Acme Pay" → "acme", "acme pay", "acmepay", plus likely typos and the "my<brand>" login variant).
  Report branded vs. non-branded click share and movement — non-branded growth is the real SEO
  signal; branded growth is often demand/PR.
- **Top pages:** `dimensions: ["page"]`, `rowLimit: 1000`, sort by clicks/impressions.

## 4. Recent page/blog performance (sitemap recency + GSC page/query)

Only run this if the user says yes when asked (SKILL.md step 5). Two parts: find the 10 most recently
published URLs, then pull each one's GSC performance.

**Finding the 10 most recently published URLs.** Prefer the sitemap — it's the only source that
actually knows publish/update dates:
- Fetch `https://<domain>/sitemap.xml` with WebFetch. It's often a sitemap *index* pointing to child
  sitemaps; WordPress/Yoast sites expose `post-sitemap.xml` (blogs) and `page-sitemap.xml` (web pages)
  separately, which is handy if the user wants blogs vs. pages split out.
- Collect `<loc>` + `<lastmod>` pairs, sort by `<lastmod>` descending, take the top 10.
- Reliability check: if `<lastmod>` is missing or identical across all URLs (some CMSs stamp every URL
  with the last site rebuild), it's not a real publish signal — **fall back to GSC detection** below.
- GSC fallback: the "recently published" pages are the ones newly surfacing — pull the `page`
  dimension for the last ~4 weeks and the prior ~4 weeks and take pages with impressions now but ~0
  before. (Approximate, but no sitemap dependency.)

If the user handed over a specific URL list instead, use that as the target set and skip detection.

**Pulling performance per URL.** The GSC tool has no server-side URL filter, so pull
`dimensions: ["page", "query"]` with a high `rowLimit` (e.g., 5000) over the last ~4 weeks, then
aggregate client-side:
1. Group rows by page. For each of the (up to) 10 target URLs: total clicks, total impressions, and
   the **top 3 queries by impressions**.
2. Report per page: URL, impressions, clicks, top-3 queries. Flag the tell-tale pattern **"impressions
   present but ~0 clicks"** → indexed and surfacing but likely ranking page 2–3 → a positioning/authority
   problem, not an indexing problem. That framing is exactly what the manager wants surfaced.

## 5. DataForSEO — links and competitors (and what NOT to use it for)

- `dataforseo_backlinks_summary({ domain })` → use `referring_domains` (validated: matched Ahrefs
  closely in testing). Report referring domains and their direction. Treat `backlinks` as
  **directional only** (ran meaningfully lower than Ahrefs — different link counting). `rank` here is
  a 0–1000 DataForSEO backlink rank, **not** Ahrefs DR — don't present it as DR.
- `dataforseo_domain_competitors({ domain })` → competitor discovery when you need a set.
- **Do NOT report from DataForSEO:** organic traffic (its ETV ran ~2.7× Ahrefs), organic keyword
  counts (~2× Ahrefs), or Domain Rating (not provided). These come from the pasted Ahrefs figures.
- The `dataforseo_domain_overview` response is very large; if you call it, expect it to be saved to a
  file and parse only the US/English item (`location_code: 2840, language_code: "en"`).

## 6. Ahrefs Site Explorer & Brand Radar — pasted by the user

There is no Ahrefs API on the gateway, so these are pasted by the user (screenshot or export). Read
pasted screenshots directly with vision. Expect and use these labels:

- **Site Explorer:** DR, Ref. domains, Backlinks, Organic keywords, Organic traffic (+ value), Top 3,
  Paid columns (ignore paid for SEO), and the **Organic positions** buckets (1–3, 4–10, 11–20).
- **Brand Radar / AI responses (AEO):** per engine — **AI Overviews (AIO)**, **ChatGPT**, **AI Mode**,
  **Gemini**, **Perplexity**, **Copilot**, **Grok** — each with a *responses* count and a *pages* count,
  plus deltas. Treat **citations** (we're linked as a source) and **brand mentions** (named without a
  link) as two distinct things — the manager tracks them separately.

If the user has no Ahrefs data this meeting, proceed with GSC + DataForSEO and write a line in the
draft that Ahrefs/AEO figures are pending, so the gap is explicit rather than silently missing.

## 7. ClickFlow — why it's not used for clients

`clickflow_list_organizations` returns only the **Single Grain** org (and one personal org) on this
gateway — individual client workspaces are not provisioned. So ClickFlow's
AI-visibility/AEO numbers reflect Single Grain, not the client, and must not be presented as the
client's. Use pasted Brand Radar for client AEO instead.

## 8. Reading the agenda doc

Use `read_file_content({ fileId, includeComments: false })` from the Drive MCP server
(`mcp__bda15a12-...__read_file_content`). The gateway's `google_docs_get` has returned `invalid_grant`
here, and the Drive reader also returns a clean natural-language rendering including tables. These
agendas are large (~220K chars); the result is saved to a file. Have a subagent extract just the
SEO/AEO sections of the last 4 meetings so the raw doc stays out of context — instruct it to ignore
paid media and quote goals, Status tags, strategy, competitors, and prior "What's Next" verbatim.

The `fileId` is the long ID in the Doc URL: `docs.google.com/document/d/<FILE_ID>/edit`.

## 9. Appending the approved section to the doc

Only after the user replies with the approval phrase.

**Verified reality (July 2026):** the gateway Google write tools (`google_docs_create`,
`google_docs_append`, `google_drive_upload_markdown_as_doc`) all return `invalid_grant` right now.
The path that WORKS is the Drive MCP `mcp__bda15a12-...__create_file` with
`contentMimeType: "text/markdown"` and the section in `textContent` — Drive auto-converts it to a
native Google Doc with real tables, H1/H2/H3, bold, and clickable links, owned by the user. Build the
markdown per `references/voice-and-format.md` (no emojis, blog table, screenshot placeholders).

So, in order:
1. **New standalone doc** (e.g., user asks for a separate doc): `create_file` with a title matching the
   agenda entry, e.g. `<Mon DD, YYYY> <Client> Biweekly SEO / Paid Media`. Return the `viewUrl`.
2. **Append to the existing running agenda doc:** there is no reliable append tool while the gateway
   Google write is down (and `create_file` makes new files, it doesn't edit existing ones). Until that
   auth is fixed, create a dated doc as above OR hand back clean paste-ready markdown for the user to
   paste under a new dated heading — and say which you did.
3. After any create, quickly read it back with `read_file_content` to confirm it landed. Markdown→Doc
   conversion can leave minor cosmetic artifacts (a stray `**` on a table header, a blank header row);
   flag that to the user and offer to clean it, rather than claiming it's pixel-perfect.
Never leave the user thinking it was written when it wasn't — report exactly what happened.

## 10. Gong — finding the client's calls and extracting outstanding items

Used in SKILL.md step 3 (on by default; skip if the user opts out).

**Find the right calls.** `gong_list_calls({ titleFilter: "<client name>", fromDateTime, limit: 10 })`.
The workspace has 8000+ calls so a filter is required. Results include internal syncs and working
sessions — keep only the **client-facing** ones (`scope: "External"`), and prefer the recurring meeting
whose title matches the client's biweekly (typically some combination of the client name, "Single Grain",
and "Biweekly / SEO / Paid Media"). Take the **2 most recent** such calls. If titleFilter is
thin, try `domainFilter` with the client's email domain.

**Extract efficiently — analysis first, transcript only if needed.**
- `gong_get_call_analysis({ callIds: [id1, id2] })` returns brief summary, key points, highlights, and
  **next-steps** without the transcript — usually enough to surface outstanding items. Start here.
- `gong_get_transcript({ callId, page })` only when you need the exact wording of a commitment or a
  client concern. Transcripts paginate — honor `hasMore`/`totalPages`. Speaker labels are "Speaker 1/2/3";
  **never invent names.**

**What to pull (SEO/AEO only — ignore paid-only threads):**
- Outstanding action items / commitments (agency-side and client-side) not yet resolved.
- Client concerns, questions, and stated priorities (what they want to see, what worried them).
- Decisions/approvals (content calendar, pSEO, page changes).

Tag each item with its call date so the draft can say "from our last sync on <date>," and cross-check
against the agenda's prior "What's Next" to show done vs. still-open.
