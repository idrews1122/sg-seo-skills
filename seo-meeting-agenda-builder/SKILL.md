---
name: seo-meeting-agenda-builder
description: >-
  Builds the SEO and AEO portion of a client's marketing meeting agenda — or a standalone SEO
  recap — for an agency SEO manager. Pulls live Google Search Console data (clicks, impressions,
  CTR, average position) across the standard compare windows (last 2 weeks vs. prior, last 3
  months vs. previous period, and year-over-year), analyzes recently published blog and page
  performance, folds in Ahrefs Site Explorer / Brand Radar figures the user pastes, and reads the
  last few SEO sections of the running agenda plus the last client call transcripts to carry the
  strategy forward and surface outstanding items. It then drafts a client-ready, source-attributed
  section that explains WHY metrics moved and recommends next steps, and can write it into a Google
  Doc. Use this whenever the user wants to prep, draft, or update an SEO/AEO client meeting agenda;
  do an SEO analysis, recap, performance review, or monthly / biweekly / QBR update for a client or
  domain; write up GSC or Ahrefs numbers for a client meeting; check how a client's recently
  published blogs or pages are performing; or asks "what should I present this week for [client]" —
  even if they don't say the word "agenda." Strong signal: a client name or domain paired with SEO
  performance, GSC/Ahrefs data, or a client meeting. Do NOT use for standalone keyword research,
  one-off content briefs or AI-Overview content audits (use the AI-overview audit skill), technical
  site crawls, pure paid-media / Google Ads reporting, GA4 or analytics dashboards, or simply
  summarizing a call.
---

# Client SEO Analysis → Meeting Agenda Section

Your job is to do the data pulling, reconciling, and diagnostic thinking an SEO manager
does before a client meeting, and hand back a **client-ready SEO/AEO section** written in
their voice. The manager should be left editing judgment and strategy — not assembling data.

The output is a recap that is **honest but constructive**: real numbers, declines shown
plainly and always attributed to a named source, but framed with the genuine "why" and a
credible path forward. Never fabricate a win, and never hide a drop.

## The one thing to get right

**Every number must name where it came from.** "In GSC (Queries report), branded clicks are
up 14.7%…" / "Per Ahrefs Site Explorer, 1–3 position keywords +146…" / "From your Brand Radar
screenshot, ChatGPT citations −4." This is non-negotiable for two reasons: the client trusts
attributed data, and when a metric is *down*, naming the source (and its known reliability
quirks) is how you keep the conversation about strategy instead of panic. See
`references/voice-and-format.md` for the exact attribution style.

## Data sources — what to trust, what to paste

This has been validated against real client data. Read `references/data-sources.md` for the
exact tool calls, date-window math, and caveats. The short version:

| Source | Use it for | Status |
|---|---|---|
| **GSC** (`google_searchconsole_analytics`) | Clicks, impressions, CTR, avg. position, top queries, top pages, per-page query breakdown — at every compare window | ✅ Exact match to the console. This is the backbone. |
| **DataForSEO** (`dataforseo_backlinks_summary`, `dataforseo_domain_competitors`) | Referring domains, directional link movement, competitor discovery | ⚠️ Ref. domains are reliable; backlink counts run low; **no Domain Rating**. |
| **Ahrefs Site Explorer / Brand Radar** (user pastes screenshots/exports) | Organic traffic, organic keywords, DR, keyword position buckets, and **all AEO/LLM data** (AI Overviews, ChatGPT, Perplexity, Copilot, AI Mode, Gemini, Grok) | 📋 Pasted by the user. Ahrefs has no API here and ClickFlow is not provisioned for client orgs — so these come from the user. |

**Do not** report organic traffic, organic keyword counts, or DR from DataForSEO — they diverge
~2–3× from Ahrefs and won't match what the client has seen before. Use the pasted Ahrefs
figures for those, or GSC clicks as the traffic proxy. **Do not** use ClickFlow for client AEO
data — only the Single Grain org is provisioned in it, so its numbers are not the client's.

## Workflow

### 1. Gather inputs

Confirm these before pulling. Ask for whatever is missing, but keep it to one round:

- **Client domain** (e.g., `example.com`) → resolve the GSC property with
  `google_searchconsole_sites` (match the domain; prefer the `sc-domain:` property if present).
- **Meeting date** (defaults to today) and **cadence** (defaults to biweekly).
- **Running agenda Google Doc** (optional but recommended) — the doc ID or URL. Enables strategy
  continuity and the "approve and append" step.
- **Recent content analysis** — the skill will *ask* whether to analyze recent blogs & web pages
  (see step 5). On yes, it auto-pulls the **10 most recently published** URLs and analyzes each; the
  user can also hand over a specific URL list instead of auto-detection.
- **Gong call review** (optional, recommended, on by default) — pull the client's last 2 call
  transcripts to surface outstanding items and client priorities. Skip only if the user opts out.
- **Ahrefs Site Explorer / Brand Radar** (optional) — ask the user to paste screenshots or exports
  for organic traffic/keywords/DR and the AEO/LLM numbers. If they don't have them handy, proceed
  with GSC + DataForSEO and clearly note in the draft that Ahrefs/AEO figures are pending.

### 2. Read the last 4 SEO sections of the agenda (if a doc was given)

Use the Drive reader `read_file_content` (see `references/data-sources.md` for why, not the
gateway `google_docs_get`). Extract **only** the SEO/AEO portions of the most recent 4 meetings
(ignore paid media). Pull out:

- Active goals and their **Status** tags (e.g., "On Track", "Lagging") — you'll carry these forward.
- The **strategy narrative** — what's the current play? (e.g., a repositioning to niche keywords,
  a pillar/cluster build, an AEO push). This is what lets you reason instead of just report.
- Named **competitors** being tracked.
- What was flagged under "What's Next" / recommendations last time — so this meeting closes loops.

Embedded chart images in the Doc generally don't extract as readable data. If a past number lives
only in a screenshot, ask the user to paste that screenshot into the chat, where you can read it
directly.

### 3. Read the last 2 client call transcripts (Gong)

Calls are where outstanding action items, client concerns, and strategy shifts actually get spoken —
they're the source for a Housekeeping section that closes loops and a recap that reflects what the
client cares about right now. See `references/data-sources.md` for the exact call-finding and
extraction method. The short version:

- Find the client's recurring meeting with `gong_list_calls` (titleFilter = client name, `scope`
  = External), take the **2 most recent** client-facing calls.
- Start with `gong_get_call_analysis` (cheap — gives key points, highlights, and **next-steps**).
  Only pull `gong_get_transcript` pages when you need exact wording of a commitment or concern.
- These calls combine SEO and paid; **extract only the SEO/AEO threads** and ignore paid-only items.

Capture, tagged by which call/date they came from:
- **Outstanding items / commitments** (yours and the client's) that aren't yet resolved → feed
  Housekeeping and What's Next. Cross-check against the agenda's prior "What's Next" so you show
  what's done vs. still open.
- **Client concerns, questions, and stated priorities** → shape which data to lead with and how to
  frame it (e.g., if they worried about a traffic dip last call, address it head-on with the data).
- **Decisions / approvals** (content calendar, pSEO, page changes) → Housekeeping status.

Attribute call-sourced items naturally ("from our last sync on <date>") — don't quote speakers by
name (Gong labels are "Speaker 1/2/3"; never invent names).

### 4. Pull GSC across the standard compare windows

Run `scripts/date_windows.js` to get the exact start/end dates for each window (it accounts for
GSC's ~3-day data lag). The standard windows:

- **Last 2 weeks vs. prior 2 weeks** — the "since our last meeting" movement.
- **Last 3 months vs. previous 3 months** — the trend.
- **Year-over-year** (trailing month vs. same month last year) — seasonality-adjusted health.

For each window pull clicks, impressions, CTR, and average position. **Get totals by querying with
the `date` dimension and summing** — summing the `query` dimension undercounts impressions badly.
Then pull the `query` dimension for top queries and a **branded vs. non-branded** split (branded =
queries containing the brand's name/variants), and the `page` dimension for top pages. See
`references/data-sources.md` for the exact calls and the branded-split method.

### 5. Analyze recent blog/page performance (ask first)

Recently published content is where the strategy is actively being tested — but it's not always
wanted, so **ask before doing it**. Use `AskUserQuestion` with a simple yes/no: *"Want me to analyze
the most recently published blogs & web pages?"* If the user declines, skip this section entirely.

On yes, identify the **10 most recently published** URLs and analyze each:

1. **Find the most recent publishes.** Prefer the site's **sitemap** (`<domain>/sitemap.xml`; many
   sites — WordPress/Yoast — split into `post-sitemap.xml` / `page-sitemap.xml`). Fetch it with
   WebFetch, sort URLs by `<lastmod>` descending, take the top 10 (blogs and/or web pages). If the
   user wants blogs vs. pages called out separately, split by URL path (e.g., `/blog/`) or by which
   child sitemap they came from. If there's no usable sitemap, or `lastmod` looks unreliable (e.g.,
   every URL shares the same date), **fall back to GSC**: recently published pages are those newly
   surfacing — impressions in the last ~4 weeks but ~0 in the prior ~4 weeks.
2. **Pull performance per URL.** For each of the 10, use GSC `page` + `query` and report
   **impressions, clicks, and top 3 queries (by impressions)**. See `references/data-sources.md`.
   Present this as a table with columns `#` | `Blog post` | `Impr.` | `Clicks` | `Top 3 keywords (by
   impressions)` — the manager's standard format (see `references/voice-and-format.md`).

Flag the tell-tale pattern **"impressions present but ~0 clicks"** → indexed and surfacing but likely
ranking page 2–3 → a positioning/authority problem, not indexing. That framing is exactly what the
manager wants surfaced, and it feeds the diagnostic reasoning in step 7.

### 6. Pull DataForSEO (links + competitors only)

`dataforseo_backlinks_summary` for referring domains and directional link movement;
`dataforseo_domain_competitors` if you need a competitor set. Report referring domains; treat
backlink counts as directional only; never report DR from here.

### 7. Reason about the data — the part that matters most

Do not stop at reporting. Correlate the numbers with the strategy from step 2 and explain **why**
things moved, then recommend. Read `references/diagnostic-playbook.md` for the common patterns and
how to reason through them — e.g., clicks down because the client is repositioning to niche keywords
while the core site pages still target the old terms (confusing the algorithm), content aged out
seasonally, a core update, or impressions steady + position steady = not penalized. The playbook
also covers what to do when Ahrefs and GSC disagree, and when to suggest broader-topic content to
lift a too-niche blog.

Ground every causal claim in the data you actually pulled and the strategy you actually read. If you
can't support a "why" from the data, say what you'd need to confirm it (this mirrors how the manager
double-checks whether a dip is "really seasonal").

### 8. Assemble the section

Write it in the manager's structure and voice — see `references/voice-and-format.md` for the section
skeleton, headings, tone, bold run-in labels, and verbatim examples to match. The recurring skeleton:

1. **Quarterly Goals / KPIs** — carried forward with updated Status tags
2. **Housekeeping** — content-calendar / pSEO / publishing status, plus **outstanding items from the
   last 2 calls** (step 3) with done-vs-open status
3. **SEO Performance & Trends** — the GSC windows, with the "why"; lead with anything the client
   raised as a concern on the calls
4. **AEO / LLM Visibility** — citations vs. brand mentions from the pasted Brand Radar data
5. **Recent Page & Blog Performance** — step 5's per-page breakdown
6. **Site & Content Opportunities / Recommendations** — concrete, tied to the data and strategy
7. **Wins / Shoutouts** — real wins, amplified honestly
8. **What's Next** — open commitments from the calls + the agenda's prior "What's Next," forward look

### 9. Output to chat, then offer to append

**Always present the drafted section in the chat first** as formatted markdown, so the manager can
review before anything is written anywhere. End with a clear prompt:

> Reply **"approve and add as a new section with today's date"** and I'll append this to the agenda
> doc. Or tell me what to change.

On approval: write the section (see `references/data-sources.md` §9 for the exact, verified write
path). Note the operational reality — the gateway Google write (`google_docs_*`,
`google_drive_upload_markdown_as_doc`) currently fails with `invalid_grant`; the reliable path is the
Drive MCP `create_file` with `contentMimeType: "text/markdown"`, which converts to a native Doc with
real tables/headings. Use the format from `references/voice-and-format.md`: **no emojis**, the blog
table, and `[ Insert screenshot: … ]` placeholders where the agendas embed visuals. If asked to create
a standalone doc, create a new one titled like the agenda entry; otherwise append to the provided doc.
If every write path fails, hand back clean markdown for manual paste and say so plainly.

## Guardrails

- Show declines; never bury them. Attribute every metric to its source. Attribute every *cause* to
  either the data or the stated strategy — not to wishful thinking.
- Prefer GSC for anything GSC covers; it's authoritative here.
- When you lack a data source (no Ahrefs paste, no doc), proceed with what you have and flag the gap
  in the draft rather than guessing.
