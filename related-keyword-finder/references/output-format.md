# Output Format

Two deliverables every run: (1) the **complete** analysis written directly in the chat as markdown,
then (2) a Google Doc that is a copy of the same content. Same structure for both; the Doc obeys the
table/link caveat in `tools-and-data.md`.

The chat write-out must be the full thing — headline verdict, keyword table, cannibalization
findings, hub-and-spoke plan, and (Mode A) on-page notes. Never abridge the chat and defer the
substance to the Doc; teammates read inline and may never open it. The Doc is a saved copy.

Lead with the recommendation, not the raw data. The manager wants to see the verdict first and the
evidence underneath it.

## Structure

### 1. Headline verdict (2–4 sentences)
State the call up front: how many viable secondary keywords, how many become sections vs. spokes vs.
skips, and the single most important move (e.g., "one section + one spoke article"). Name the
primary keyword and client.

### 2. Keyword table (plain text — no links inside cells)

| Keyword | SV | Difficulty | Intent vs. primary | Existing page? | Recommendation |
|---|---|---|---|---|---|
| marketing agent compliance | 90 | 24 | Adjacent (tactical rules vs. strategic framework) | None (GSC) | Spoke article |
| marketing agent guardrails | 20 | 18 | Same | None (GSC) | Section (H2) |
| ai marketing governance | 30 | 31 | Same | /blog/ai-governance ranks | Skip — link to existing |

Columns:
- **SV / Difficulty** — from DataForSEO; if a keyword had no data, write "n/a", don't invent it.
- **Intent vs. primary** — Same / Adjacent / Different, with a 3–6 word reason from the SERP-overlap
  and AIO evidence.
- **Existing page?** — the cannibalization result from GSC ("None", a URL, or "not run" if no GSC).
- **Recommendation** — Section / Spoke / Skip.

### 3. Evidence & links (bulleted list — links live here, not in the table)
For each keyword that matters, one line with the clickable proof:
- The existing ranking URL (if cannibalization found one).
- 1–2 example SERP URLs shared with the primary (why you called the intent).
- The AIO framing note (or "AIO pasted by user").

### 4. Cannibalization findings and fixes

For every candidate where the client's site already ranks for the term — or where the new article
would compete with an existing page — don't just flag it; give the senior-SEO analysis and the fix:

- **The twin page(s)** — title + URL of the existing page(s) at risk.
- **Do the intents collide?** — existing angle vs. new angle, one line each (e.g., "maximize ROI" vs.
  "measure ROI with a scorecard"). Distinct intents can coexist; identical cannot.
- **Where they collide** — the exact-match queries both legitimately answer.
- **The real cost** — usually canonical ambiguity / diluted topical signal / suppressed AI-Overview
  eligibility, not lost clicks (often near-zero volume).
- **The fix** — differentiate at H1/intro; interlink both ways with descriptive anchors; set the
  hub/spoke hierarchy; and if the existing page is stale/weaker, say whether the new piece should
  become canonical or whether to consolidate instead of publishing a near-duplicate.

If there's genuinely no overlap, say so in one line and move on.

### 5. Hub-and-spoke plan
Spell out the cluster explicitly so the manager can act:
- **Hub:** this article (primary keyword).
- **Spoke(s):** each spoke keyword → proposed spoke-article primary keyword + working title.
- **Wiring:** the summary section + outbound link to add on the hub, and the link back up from each
  spoke. Give the suggested anchor text (descriptive, keyword-bearing, not "click here").

### 6. On-page placement notes — Mode A only
Concrete edits to the existing article:
- **Where the new section(s) go** — which existing H2 to place it near, and the proposed H2 wording.
- **Definition-first fixes** — any section that names a concept but jumps straight to "how" without
  defining it; supply a one-sentence definition (these double as internal/external link anchors).
- **Primary keyword usage** — current count of the primary and close variants, and whether to work it
  in a bit more (without stuffing).
- **Linking gaps** — missing internal links to the client's related pages, and any thin external
  authority citations.

### 7. What was and wasn't checked
One honest line: which data sources ran (DataForSEO, GSC, live AIO vs. pasted) and any that didn't
(e.g., "cannibalization not run — no GSC property for this client"). Never imply a check happened
when it didn't.

## Voice
Plain, direct, decisive — the agency-manager register from `seo-meeting-agenda-builder`'s
voice-and-format. No emojis. Every number attributed to its source. Recommend, don't hedge; where you
genuinely can't call it, say what data would settle it.
