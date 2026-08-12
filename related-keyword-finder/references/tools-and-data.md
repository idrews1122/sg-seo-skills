# Tools & Data Reality

Exact calls, params, and caveats for this skill. Defaults: `location: "United States"`,
`language: "English"` unless the user specifies another market.

## 1. Candidate discovery + metrics (DataForSEO)

Keyword-level metrics from DataForSEO are reliable enough to report (the "DataForSEO diverges"
caveat from the agenda skill applies to *domain* organic traffic/keywords/DR — not to keyword
volume/difficulty).

- **Related keywords:** `dataforseo_related_keywords` — `{ keyword, location, language, limit }`.
  Start with `limit: 50` and trim to the genuinely on-topic ones.
- **Suggestions (long-tail / variants):** `dataforseo_keyword_suggestions` — same shape. Good for
  catching the exact phrasings people type (e.g., "AI marketing agent compliance").
- **Volume + CPC:** `dataforseo_keyword_volume` — `{ keywords: [...], location, language }` (batch up
  to 1000). Report monthly search volume; ignore CPC unless asked.
- **Difficulty (0–100):** `dataforseo_keyword_difficulty` — `{ keywords: [...], location, language }`.

Batch the volume/difficulty calls (they take arrays) rather than one keyword at a time.

## 2. Intent confirmation

### SERP overlap — `dataforseo_google_search`
`{ keyword, location, language, depth: 10, device: "desktop" }`. Run it for the primary and each
serious candidate. Extract the organic result URLs (and note featured snippets / SERP features).
Compare the top ~10:

- **≥ ~4–5 shared domains/URLs** between primary and candidate → same intent, one page can serve both.
- **1–3 shared** → adjacent intent → spoke candidate, not a same-page section.
- **~0 shared** → different intent → skip (or, at most, a loosely related link).

### Live AI Overview read — browser
For the primary and finalist candidates:

1. `mcp__Claude_Browser__navigate` to `https://www.google.com/search?q=<url-encoded keyword>`.
2. `mcp__Claude_Browser__read_page` (or `get_page_text`) and locate the **AI Overview** block.
3. Capture how it *frames* the answer — the definition sentence and the section headers it uses.
   Compare framing across keywords: same underlying question = same intent; a different angle
   (e.g., strategic "blueprint/pillars" vs. tactical "rules/steps") = adjacent intent = spoke signal.

**Fallback:** if Google shows a CAPTCHA, a consent wall, or no AIO renders, don't fight it — ask the
user to paste the AI Overview screenshot for that keyword (they do this routinely). Read the pasted
image directly. Never bypass a CAPTCHA.

## 3. Cannibalization check — Google Search Console

Resolve the property first: `google_searchconsole_sites` → pick the client's domain (prefer the
`sc-domain:` form). GSC here is served from the shared SG analytics account, so only clients
connected to it will resolve; if the client isn't there, mark the check "not run."

`google_searchconsole_analytics` has **no server-side query filter** (params are `siteUrl`,
`startDate`, `endDate`, `dimensions`, `rowLimit`). So check cannibalization client-side:

1. Call with `dimensions: ["query","page"]`, a ~3–6 month window, `rowLimit: 25000`.
2. Filter the returned rows to those whose `query` equals or contains the candidate keyword (and
   obvious close variants).
3. Interpret the matching rows:
   - Rows exist and point to a **page** (especially with clicks or steady impressions) → that page
     already owns the keyword. **Don't recommend a new page** — link to / improve that URL. Record it.
   - In Mode A, if the matching page **is the current article's own URL**, the keyword is already
     covered — don't add a redundant section.
   - No matching rows → keyword is open; a section or spoke is safe on cannibalization grounds.

For a broader "do we have anything on this topic" sweep, `dataforseo_google_search` with a
`site:<client-domain> <keyword>` query, or `google_drive_search` over the content library, can
supplement GSC — but GSC is the authority for what actually ranks.

## 4. Reading the article (Mode A)

- **Google Doc:** use the Drive reader `read_file_content` with the doc ID. The gateway
  `google_docs_get` path is unreliable for full extraction (matches the agenda skill's finding).
- **Live URL:** `WebFetch`.
- **Pasted text:** use as-is.

Pull the H1, the on-page usage count of the primary keyword and close variants, the existing H2/H3
outline, and any existing internal/external links — this feeds the on-page placement notes.

## 5. Writing the Google Doc output

The gateway Google write paths (`google_docs_create`/`append`, `google_drive_upload_markdown_as_doc`)
currently fail with `invalid_grant`. The reliable path is the **Drive MCP `create_file`** with
`contentMimeType: "text/markdown"`, which converts markdown to a native Doc with real headings and
tables.

**Critical formatting caveat (verified):** `create_file` **flattens bold and hyperlinks inside table
cells**. So:

- Keep tables to **plain text only** — keyword, SV, difficulty, intent verdict, recommendation.
- Put every **clickable link** (existing ranking pages found in GSC, example SERP URLs, spoke-article
  targets, internal-link anchors) in a **bulleted list or paragraph below the table**, where links
  survive.

Title the doc like `Keyword Strategy — <primary keyword> — <client> — <YYYY-MM-DD>`. If the user
wants it in a specific Drive folder, place it there; otherwise create it at the Drive root and return
the link. If every write path fails, hand back clean markdown for manual paste and say so.
