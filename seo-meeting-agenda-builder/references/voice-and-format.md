# Voice & Format — write it like the manager does

This is distilled from real Single Grain SEO agendas. The section is written
first-person by the SEO lead, addressed directly to the client (often by name). It teaches the "why,"
celebrates real wins, and handles declines with candor + a credible path forward. Match this.

## Formatting rules (learned from real use)

- **No emojis anywhere.** Not in headings, status tags, or bullets. Keep it clean and professional.
- **Status tags are plain words** — "Lagging", "Slightly Lagging", "On Track", "Waiting for
  Confirmation" — never colored dots or emoji.
- **Recent blog/page performance is always a table**, matching the manager's existing agenda format,
  with exactly these columns: `#` | `Blog post` | `Impr.` | `Clicks` | `Top 3 keywords (by impressions)`.
  List the top 3 queries in one cell as `query (impressions); query (impressions); query (impressions)`.
- **REQUIRED — every blog/page title in the table MUST be a live hyperlink to its actual URL.** Never
  ship plain-text titles. In the `Blog post` cell write markdown `[Title Case Page Name](https://live-url)`,
  using the exact live URL for that page (from the content calendar's "Live Link" column, or the page's
  real published URL). This applies BOTH in the chat draft AND in the created Google Doc — when building the
  `create_file` markdown, keep the `[Title](url)` link in the table cell; do not flatten it to plain text
  (Drive converts markdown links in table cells to real clickable Doc hyperlinks). Any other page/URL
  referenced in prose (opportunities, housekeeping) should also be linked to its live URL.
- **Screenshot placeholders.** The real agendas embed visuals; the drafted section should mark where
  they go with a bracketed line on its own, e.g. `[ Insert screenshot: Ahrefs Organic Positions — 1-3 /
  4-10 / 11-20 buckets ]`. Add these at the spots the agendas use them:
  - SEO Performance: `GSC Performance — clicks & impressions, 3 months vs. previous period`, and
    `GSC Performance YoY`
  - `Ahrefs Site Explorer overview — DR, referring domains, organic keywords & traffic`
  - `Ahrefs Organic Positions — 1-3 / 4-10 / 11-20 buckets`
  - AEO: `Ahrefs Brand Radar — AI responses by platform`, and a `live Google SERP for "<primary
    keyword>"` showing the AIO citation
  - Recent blogs: `GSC page performance for recent blogs`

## Section skeleton

The SEO block opens with a plain `SEO Updates` line, then H3 (`###`) subsections. Not every meeting
uses every subsection — pick what the data and strategy warrant — but this is the recurring order:

```
SEO Updates
### SEO Quarterly Goals 2026        (KPI scorecard, each line tagged with a Status)
### Housekeeping                    (content calendar, pSEO, publishing status, OOO)
### SEO Performance & Trends        (the GSC windows + the "why")
### AEO / LLM Visibility            (citations vs. brand mentions, per engine)
### Recent Page & Blog Performance  (per-page impressions/clicks/top-3 queries)
### Site & Content Opportunities    (concrete recommendations)
### Wins / Shoutouts                (real wins, amplified)
### What's Next                     (loops to close, forward look)
```

**Quarterly Goals** carry forward from prior meetings with only the numbers + Status changing.
Status values seen in real agendas: **On Track**, **Slightly Lagging**, **Lagging**,
**Waiting for Confirmation**. Keep the exact goal wording from the doc; just update current values
and Status.

## Tone

Warm, candid, first-person, a little pushy on recommendations. Comfortable with ALL-CAPS emphasis on
key phrases ("HUGE", "SOONER THAN LATER", "MY CONCERN:", "MY SUGGESTION"), exclamation points on wins,
and teaching the client the mechanics rather than just dumping numbers. Not stiff or corporate.

**Bold run-in labels are the signature micro-structure** — lead a point with a bolded label, then the
sentence: `**Good news:**`, `**The Cause:**`, `**The Result:**`, `**Analysis:**`, `**My recommendation:**`,
`**IMPORTANT CAVEAT:**`, `**JUST TO CONFIRM:**`. Use them liberally.

## The two rules that never bend

### 1. Attribute every number to its source
Name the tool and, where useful, the specific report or view:
- "In GSC (Queries report), branded '[brand]' clicks rose 500 → 575 (**+15%**)."
- "Per Ahrefs Site Explorer, **+146 keywords in positions 1–3** over the past 2 weeks."
- "From your Brand Radar data, ChatGPT citations are down slightly (**−4**), while AI Overviews grew."

### 2. Show declines honestly, then explain and reassure — without spin
The real agendas never hide a drop; they name where it's from, give the genuine cause, and add a
truthful counterweight. Follow this shape:
> **What:** name the metric and the drop, with the source.
> **Where it's coming from:** the specific data view (e.g., "GSC → this is in the Queries section, non-branded").
> **The cause:** the honest reason — seasonality, a Google core update, content aging out, or the current
> strategy (e.g., a niche repositioning while site pages still target old terms). Only claim a cause you can
> support from the data or the known strategy; if you can't, say what you'd check to confirm it.
> **The counterweight:** a real positive that still stands (e.g., "GSC clicks are still healthy, so these
> pages haven't dropped off — Ahrefs rank estimates lag reality here").

When tools disagree, say so plainly and lean on GSC: "Ahrefs shows rank dips, but GSC still shows strong
clicks for these URLs — Ahrefs' live view isn't always accurate, so I trust GSC here."

## Verbatim examples (match this voice)

1. *"**Avg. position dipped from 8.8 to 9.2. No need to worry — it's seasonal.** Seasonal content that
   ranked well earlier in the year has aged out, which mechanically pulls the blended average down. This
   is not a ranking loss (GSC clicks on evergreen pages held steady)."*

2. *"**+146 keywords in positions 1–3 in the past 2 weeks (per Ahrefs)!** Positive movement in LLMs too,
   particularly AI Overviews and Copilot. ChatGPT saw a very slight dip in citations and page references
   (both −4 per Brand Radar) — nothing structural."*

3. *"**MY CONCERN:** We're just not getting clicks on our most recent blogs yet. **Good news:** impressions
   are present and steady in GSC, so the pages are indexed and surfacing — we've held visibility but lost
   position. They're likely sitting on page 2–3. That's a positioning/authority problem, and it's expected
   while the core site pages still target the old keywords and 'confuse' the algorithm about our focus."*

4. *"**My recommendation:** lightly sprinkle '[new target keyword]' and close variants onto already
   high-authority pages (Home, core service pages) — so we signal the new focus without picking a fight
   with [the category's dominant incumbent] on their turf or risking existing rankings."*

5. *"Number 1 on Google for our primary keyword — and we beat [top competitor], the main competitor for it.
   Named and linked in the AI Overview, listed BEFORE them. **HUGE.**"*

## What good "opportunities" and "wins" look like

- **Opportunities** are specific and tied to what you just showed: a named page to optimize, a slightly
  broader blog topic to lift a too-niche one, an internal-link or keyword-placement move — with the reason.
- **Wins** are real and attributed ("all April-optimized blogs are on page 1 and cited in AI Overviews —
  checked the 16-month view, no traction until we reindexed 4/21"). Amplify true wins; don't invent them.
