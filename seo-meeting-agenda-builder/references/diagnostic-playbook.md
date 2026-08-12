# Diagnostic Playbook — reasoning about *why* the numbers moved

Reporting numbers is the easy part. The value the manager adds — and what this skill must reproduce —
is correlating the data with the client's strategy and explaining the cause, then recommending a move.
These are the recurring patterns. Use them as reasoning scaffolds, not scripts: always ground the
specific claim in the data you pulled and the strategy you read from past agendas.

## How to reason (the loop)

1. **What changed?** State the metric, direction, magnitude, window, and source.
2. **What's the strategy context?** From the last 4 agendas: what play is in motion? (repositioning,
   pillar build, AEO push, seasonal content, migration). A number only means something against intent.
3. **What are the candidate causes?** Run through the patterns below.
4. **Which does the data support?** Cross-check GSC vs. Ahrefs, branded vs. non-branded, impressions vs.
   position, recent pages vs. evergreen. Prefer the explanation the data actually backs.
5. **What's the recommendation?** Concrete, low-risk, tied to the cause.
6. **What would confirm it?** If a cause is a hypothesis, say what you'd check (the manager literally
   "double-checks whether a dip is really seasonal" before claiming it).

## Pattern library

### Clicks down while impressions hold (or grow)
Visibility is intact; CTR or position slipped. Usually **not** a health problem. Check: did average
position drift up (worse) with impressions flat? Then ranking softened on some terms. Did a SERP feature
(AI Overview) absorb the click? Common during the current AI-search shift. Counterweight: impressions +
indexing are fine. Recommendation: title/meta CTR work, or content depth to reclaim position.

### Clicks down because of a niche repositioning
When the client is deliberately moving to a **more niche, targeted brand position**, clicks often dip
first — this is expected and should be framed as *by design*, not failure. The mechanism to explain:
- New-positioning **blogs** are live, but the **core site pages (home, service pages) still target the
  old, broader keywords**. Google sees mixed signals and can't tell what the site is authoritative for,
  so the new niche blogs don't rank well *yet*.
- The blogs are also **very niche**, so their ceiling is low until authority builds.
Recommendations that fit: (a) prioritize optimizing the **core site pages** for the new target keywords
"sooner than later" so the whole domain reinforces one focus; (b) add a few **slightly broader** blog
topics that can rank and funnel authority toward the niche pages; (c) lightly place target keywords on
existing high-authority pages to signal the shift without risking current rankings.
Counterweight to show: **AEO/LLM citations and 1–3 position keyword counts are up** even while clicks lag —
that's the leading indicator that the new positioning is landing where it matters first.

### Impressions down but average position steady
Strong signal you **did not get penalized** by an algorithm update — Google often just trims old, broad,
low-relevance queries you were technically appearing for. Frame as a cleanup, not a loss. Confirm with:
non-branded clicks stable, top pages unchanged.

### A drop that lines up with a Google core update
If the dip starts on/near a known core-update date, name it ("the drop begins ~May 22, aligning with the
May Core Update"). Then check whether position held (see above) to distinguish volatility from a real hit.

### Seasonal decline
Content tied to a season (school year, holidays, tax season) ages out and drags blended metrics down
mechanically. Confirm before claiming it: compare **year-over-year** (is this the same dip as last year?)
and check whether the declining URLs are seasonal. If YoY is flat-or-up, "it's seasonal" is credible.

### Recent blog getting impressions but ~0 clicks
Indexed and surfacing, but ranking page 2–3 → positioning/authority problem, not indexing. Recommendation:
strengthen internal links to it, deepen the content to match intent, or broaden the angle if the query is
too niche to earn a page-1 slot yet.

### Ahrefs shows rank loss but GSC shows healthy clicks
Ahrefs' live rank index lags and samples; GSC is ground truth for clicks. State the disagreement, lean on
GSC, and add the caveat that "Ahrefs data needs to be taken with a grain of salt — it doesn't always have
the best live view." Don't alarm the client over an Ahrefs-only dip.

### Branded up but non-branded flat
Growth is demand/PR-driven, not SEO reach. Call it out honestly so a branded spike isn't mistaken for SEO
progress — the real SEO signal is non-branded.

### AEO: cited vs. merely mentioned
Being **cited** (linked as a source in an AI answer) is stronger than being **mentioned** (named, no link).
If a competitor is cited where you're only mentioned, diagnose why — often they explicitly answer the exact
sub-question or give the concrete example the model wants (e.g., a competitor explicitly names the specific
use-case the user asked about, and we don't). Recommendation: add that specific answer/example to the target page.

## Turning a diagnosis into a recommendation

Good recommendations are **specific, tied to the cause, and low-risk to existing rankings**. Examples:
- "Optimize the Home and [core service] pages for '[new target keyword]' this sprint — that's the blocker
  keeping the new blogs from ranking."
- "Add one broader pillar blog on '[broader topic]' to earn a page-1 slot and pass authority to the niche
  posts."
- "Add a concrete '[use-case]' example to [page] — that's what's getting the competitor cited in AIO
  instead of us."
Avoid vague advice ("write more content," "build backlinks") with no target or rationale.
