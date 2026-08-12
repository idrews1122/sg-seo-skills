---
name: related-keyword-finder
description: >-
  Finds and vets the secondary / related keywords for a single article (or a bare primary
  keyword before the article is written), for an agency SEO manager. Given a primary keyword —
  and, if it exists, the article draft — it pulls related keywords and their volume/difficulty
  from DataForSEO, confirms which ones share the SAME search intent as the primary (via SERP
  overlap plus a live Google AI Overview read), checks the client's own site and Google Search
  Console for cannibalization — and when an existing page overlaps, delivers the intent analysis
  plus the differentiate / interlink / hub-hierarchy fix, not just a flag. It then reasons — per
  this specific article — whether each keyword should be folded in as one on-page section, spun
  into its own spoke article and internally linked (hub-and-spoke), or skipped. It writes the full
  analysis into the chat and a Google Doc copy. Use this whenever the user asks whether to
  add a keyword/keyphrase to an article, whether a keyphrase "matches the same intent," wants
  secondary/related/supporting keywords for an article or topic, is deciding between one section
  vs. a separate blog, mentions hub-and-spoke or pillar/cluster, or worries a keyword will
  cannibalize or already has a page — even if they don't say "keyword research." Strong signal:
  a primary keyword or article paired with "should I add," "same intent," "secondary keywords,"
  "separate blog," "hub and spoke," or "cannibalize." Do NOT use for building a client meeting
  agenda or performance recap (use seo-meeting-agenda-builder), or for a full AI-Overview content
  brief / brand-citation audit of a cluster (use ai-overview-audit) — this skill is narrower: it
  maps and vets the keyword set around ONE article.
---

# Related Keyword Finder — Secondary Keywords, Intent, Cannibalization & Hub-and-Spoke

Your job is to do the keyword-mapping judgment an SEO manager makes when deciding what a single
article should target: find the related keywords worth caring about, prove they share intent with
the primary, make sure the client's own site isn't already ranking for them, and then decide — for
*this* article — what becomes a section, what becomes its own spoke article, and what to leave
alone. Hand back a defensible plan, not a raw keyword dump.

The manager should be left approving strategy, not assembling data or second-guessing whether a
recommendation would cannibalize an existing page.

## The four things this skill must deliver

Everything below serves these four outcomes. If one can't be completed (e.g., no GSC access for the
client), say so plainly in the output rather than guessing.

1. **A short list of viable secondary keywords** — related to the primary, with volume and difficulty.
2. **Intent confirmation** — for each, whether it shares the *same* search intent as the primary
   (this is what makes it safe to target on the same page or as a linked spoke).
3. **A hub-and-spoke read** — which keywords are a section on this article vs. their own spoke article
   internally linked back, and which are neither.
4. **A cannibalization check against the client's GSC** — does an existing page already own this
   keyword? If yes, don't recommend a new page for it; link to what exists.

## Two input modes — detect which you're in

- **Mode A — article exists.** The user gives the article (pasted text, a Google Doc ID/URL, or a
  live URL) *and* its primary keyword. Read the article so recommendations are grounded in what it
  already covers, and add on-page placement notes (where a new section goes, definition-first fixes,
  primary-keyword usage). To read a Google Doc, use the Drive reader `read_file_content` (the gateway
  `google_docs_get` path is unreliable — see `references/tools-and-data.md`). To read a live URL, use
  WebFetch.
- **Mode B — keyword only.** The user gives just the primary keyword; the article isn't written yet.
  Skip the on-page notes and instead frame the output as a pre-writing plan: what the hub article
  should cover and which spokes to plan around it.

Always confirm two things before pulling data, in one round of questions (don't interrogate):

- **Primary keyword** (exact phrasing).
- **Client** → resolve the GSC property with `google_searchconsole_sites` (match the client's domain;
  prefer the `sc-domain:` property if present). This is required for the cannibalization check; if
  the user can't give a client/property, do the rest and mark the cannibalization check as "not run."

Market defaults to US / English unless the user says otherwise.

## Workflow

### 1. Discover candidate keywords

Start from the primary and gather a candidate pool with DataForSEO:

- `dataforseo_related_keywords` and `dataforseo_keyword_suggestions` on the primary keyword.
- Pull **search volume** (`dataforseo_keyword_volume`) and **difficulty** (`dataforseo_keyword_difficulty`)
  for the pool.
- Add any variants the user already raised or that show up in the SERP/AI Overview for the primary.

**If the exact primary returns null volume or no related keywords** (common for emerging/long-tail
topics like new AI terms), don't stop there — broaden the seed to the head terms the article actually
competes on and work back down. E.g. "AI marketing agent ROI" → seed "AI marketing ROI", "AI agent
ROI", "AI ROI", "AI marketing agents", then keep the sub-terms that are genuinely on-topic. Report the
primary's own volume honestly even when it's ~0, and say plainly when a topic is nascent — that
reframes the article as a thought-leadership / AEO play rather than a traffic play, which is itself a
finding the manager needs.

Keyword-level volume/difficulty from DataForSEO is fine to report here — the divergence caveat from
the agenda skill is about *domain* organic metrics, not keyword metrics. See
`references/tools-and-data.md` for exact calls and params.

Don't pre-filter by volume alone. In niches like AI/agent marketing, real intent-matched keywords
often sit at SV 10–100; a low number is not a reason to discard a keyword that's genuinely on-topic.
Relevance to the article's actual subject is the primary filter, volume is secondary context.

### 2. Confirm search intent (the gate that makes a keyword usable)

A keyword only belongs on this page — or as a linked spoke — if it shares the primary's intent.
Confirm it two ways and reconcile them:

- **SERP overlap (DataForSEO).** Run `dataforseo_google_search` for the primary and for each serious
  candidate. Compare the top ~10 organic URLs. Heavy overlap in ranking pages ⇒ Google treats them as
  the same intent ⇒ same page can rank for both. Little/no overlap ⇒ different intent ⇒ separate page
  at most, or skip.
- **Live AI Overview read (browser).** For the primary and the finalist candidates, load
  `https://www.google.com/search?q=<keyword>` in the browser and read the AI Overview with
  `read_page` / `get_page_text`. Compare *framing*: is the AIO answering the same underlying question,
  or a different one? (Example from real use: "marketing agent governance framework" returns a
  strategic *blueprint/pillars* AIO, while "marketing agent compliance" returns a tactical *rules*
  AIO — same topic, adjacent intent, which tells you it's a spoke, not just a section.) If the browser
  is blocked or shows a CAPTCHA, don't fight it — ask the user to paste the AI Overview screenshot for
  that keyword; they routinely do this. See `references/tools-and-data.md` for the exact browser steps
  and fallback.

Classify each candidate as **same / adjacent / different** intent, and keep the evidence (which URLs
overlapped, what the AIO framing was) — the manager needs it to trust the call.

### 3. Cannibalization check against the client's GSC

Before recommending that a keyword become a section or a new article, verify the client's own site
doesn't already own it — and, crucially, whether the *new* article would fight an existing page.

**Method.** The fastest, most reliable read is an on-site SERP check: `dataforseo_google_search` with
`site:<client-domain> <keyword>` for each serious candidate (and for the article's own primary). The
top results are the pages Google considers most relevant on the client's site for that term. Confirm
with GSC where you want real impressions/clicks: `google_searchconsole_analytics` on the resolved
property, dimensions `["query","page"]`, last ~3–6 months, filtered to the keyword client-side (GSC
has no server-side query filter). See `references/tools-and-data.md`.

**When an existing page already owns the term, don't just flag it — analyze it and give the fix**, the
way a senior SEO would (this is a core deliverable, not an afterthought). For each real overlap, work
through:

- **Do the intents actually collide?** Name the existing page's angle vs. the new article's angle in
  one line each (e.g., "maximize/increase ROI" vs. "measure/prove ROI with a scorecard"). Related-but-
  distinct intents can coexist on separate pages; identical intent cannot.
- **Where they collide** — the specific exact-match queries both pages legitimately answer.
- **The real cost** — usually not lost clicks (the contested terms are often near-zero volume) but
  Google/LLMs being unsure which page is canonical, which dilutes the topical signal and can suppress
  *both* pages in AI Overviews.
- **The solution** — a concrete playbook: (1) **differentiate** at H1/intro so each page owns one
  intent and doesn't drift into the other's; (2) **interlink both ways** with descriptive, keyword-
  bearing anchors; (3) **set the hub/spoke hierarchy** (which page is canonical/parent); (4) if the
  existing page is stale or weaker, decide whether the new piece should *become* the canonical asset,
  or whether to **consolidate/refresh** rather than publish a near-duplicate.

In Mode A, if the *current* article's own URL already ranks for a candidate, it's already covered —
don't add a redundant section. If nothing on the client's site ranks for a term, it's open — a
section or spoke is safe on cannibalization grounds. If neither the `site:` check nor GSC can be run,
mark this "not run" and caveat every section/spoke recommendation — never imply you checked when you
didn't.

### 4. Decide: section vs. spoke vs. skip — reason per article, no rigid cutoffs

There is no universal SV threshold. Decide each keyword on its merits *for this specific article*,
using the intent class, the cannibalization result, and how the article is actually scoped:

- **Fold in as a section** when the keyword shares (or is a close subset of) the primary's intent AND
  is genuinely a topic *this* article should cover anyway. One section is enough — don't over-stuff
  the keyword or bend the article around it. Give it a natural H2 and one honest use in the body.
- **Spin into a spoke article** when the keyword is same/adjacent intent, distinct and deep enough to
  stand as its own primary, has enough demand to justify a page, AND no existing client page owns it.
  Then plan hub-and-spoke: a short summary section on this (hub) article that links out to the spoke,
  and a link back up from the spoke. This is the pattern to *infer and propose* — it's the core value
  of the skill.
- **Skip** when intent differs, the keyword is only tangential to the article, or an existing page
  already covers it (link to that page instead of building anything new).

Explain the "why" for each call in plain language. A recommendation the manager can't defend to a
client or their boss is worthless.

### 5. Output — full write-out in chat, then a Google Doc copy

Follow `references/output-format.md` for the exact structure. In short:

1. **Write the COMPLETE analysis directly in the chat** as formatted markdown — the headline verdict,
   the full keyword table (candidate | SV | difficulty | intent vs. primary + evidence | existing
   page? | recommendation | why), the cannibalization findings, the hub-and-spoke plan, and (Mode A)
   the on-page placement notes. Do **not** post an abridged teaser that makes the reader open the Doc
   to get the substance — the chat must stand on its own, because teammates read the analysis inline
   and may never open the Doc. The Doc is a saved copy, not the primary artifact.
2. **Then write the Google Doc** with the same content, source-attributed. Use the Drive MCP
   `create_file` with `contentMimeType: "text/markdown"` (the gateway `google_docs_*` / markdown-upload
   paths currently fail with `invalid_grant`). **Put every hyperlink and any bold/linked keyword inside
   lists or paragraphs, not inside table cells** — `create_file` flattens rich formatting inside table
   cells, so links die there. Keep tables to plain text (keyword, SV, difficulty, verdict) and hang the
   clickable URLs (existing pages, SERP examples, spoke targets) off a list below the table.

Present, don't auto-create side effects: don't create the spoke article, edit the client's doc, or
publish anything. Deliver the plan and let the manager act.

## Guardrails

- **Attribute every number to its source** ("SV/difficulty per DataForSEO", "GSC shows /blog/x ranking
  for this", "AI Overview framing"). This mirrors the agenda skill and is how the manager keeps a data
  conversation about strategy.
- **Intent is the gate.** Never recommend targeting a keyword on the page or as a spoke without an
  intent verdict backed by SERP overlap and/or the AIO read.
- **Cannibalization beats opportunity.** If an existing page owns the keyword, linking to it wins over
  building a new page — say so even when a fresh article would be more fun to write.
- **Don't over-optimize.** One section per folded-in keyword, one honest usage. Keyword stuffing and
  near-duplicate spokes hurt the client; flag them rather than recommend them.
- When a data source is missing (no GSC, blocked AIO, no article), proceed with what you have and flag
  the gap in the output rather than papering over it.
