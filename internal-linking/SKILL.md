---
name: internal-linking
description: >-
  Audits and optimizes the internal links of a single article on a client's site — building the
  real internal-link universe from the live sitemap first, preserving every existing link,
  verifying each destination is live and actually supports the claim it's anchored to, adding
  contextual links to topic-cluster sibling articles (prioritized over service pages), and
  enforcing hard floors (3+ non-CTA internal links), responsive caps by word count, and
  entity-name anchor placement. Includes the 8-check evidence-based link audit and the rule that
  AI-drafted content (ClickFlow etc.) arrives with fabricated internal URLs that must all be
  re-derived. Use whenever the user asks to check, fix, audit, add, or optimize internal links
  on an article or draft; asks "are these links right," "add internal links," "check the links,"
  or "does this link go anywhere"; is finalizing an article and needs the link QA pass; or has
  an AI-generated draft whose links need verification. Do NOT use for external-source citation
  strategy on its own (this skill checks external links only via the shared audit checklist),
  keyword mapping (use related-keyword-finder), or site-wide architecture planning — this skill
  works one article at a time.
---

# Internal Linking — Audit, Verify, and Add

Your job is the internal-link work an editor does before an article ships: confirm every existing
link survives and resolves, verify every link actually supports what it's anchored to, and weave in
the missing links to the client's real, already-published sibling content. The output is an article
whose links are live, contextual, evidence-verified, and counted — not "felt about."

Two failure modes this skill exists to prevent, both observed repeatedly in real batches:

1. **Guessed URLs shipping.** AI drafting tools invent plausible-looking internal paths (flat
   `/topic-name` when the real pattern is `/blog/<slug>/`). Treat every internal link in an
   AI-generated draft as fabricated until verified.
2. **Real sibling content going unlinked.** Articles get finished with one CTA/homepage link doing
   double duty while live, on-topic sibling posts sit unlinked because nobody checked the sitemap.

## Step 1 — Build the real internal-link universe (mandatory, before anything else)

Never add or verify links from memory or from drafts sitting in the same folder. Fetch the client's
**live** published inventory:

- **Fastest: the post sitemap** — `<domain>/post-sitemap.xml` (WordPress/Yoast convention) or
  `<domain>/sitemap.xml` and its child sitemaps. This lists every published post directly.
- Fallback: the rendered blog index page(s) via WebFetch.

Scan the inventory for **topic-cluster siblings** of the article you're working on — for a gutters
article, every `gutter-*` slug (installation cost, maintenance, materials, lifespan), not just the
obvious one. Record each candidate as URL + title. Note the client's real slug pattern (e.g.
`/genius-blog/<slug>/`, no `www`) — this is what exposes fabricated links later.

**Multi-domain rule:** if the client has staging + production domains, links to either count as
internal. Audit against all known domains.

## Step 2 — Audit the existing links

For every internal link already in the article:

1. **Verify the destination resolves.** Caveat: a `curl` 403/405 is usually WAF/bot-blocking, not a
   dead link — confirm with a browser-UA GET or WebFetch before treating it as broken. Never replace
   a good link just because curl was blocked.
2. **NEVER remove an existing internal link.** Fix broken/redirected hrefs in place to the canonical
   URL. If the destination is gone with no equivalent, flag for human review — do not silently
   delete or stealth-substitute a different destination.
3. **AI-draft exception:** when the draft came from ClickFlow or another generator, every internal
   link is presumed fabricated. Re-derive each one from the Step 1 universe and the real slug
   pattern; keep none unverified.

## Step 3 — Add links: the discovery algorithm

After the body is in near-final shape, scan for candidate sentences mentioning:

- Related procedures/products/services the client offers
- Prerequisite or follow-up concepts the client has covered
- Comparisons the client has a dedicated page for ("X vs Y")
- Service areas or locations
- Sub-topics with their own dedicated pages

For each candidate: match it to the Step 1 universe → **confirm the destination actually covers the
referenced sub-topic** (titles lie — open the page) → when two destinations both fit, prefer the
**underlinked** one (fewer existing inbound internal links) → stop at the cap unless the quality
override applies.

**Prioritize topic-cluster blog articles over service pages.** A service page is fine when it
genuinely fits (CTA-adjacent mention, no better blog match), but it must not be the default or the
majority of the article's internal links. Service pages get overused because there's one obvious URL
per trade; the more specific sibling article is almost always the better link.

## Counts: responsive cap + hard floor

Length is the **final** body's word count:

| Word count | Target internal links |
|---|---|
| Under 800 | 2–3 |
| 800–2,000 | 3–5 |
| Over 2,000 | 4–6 |

- **Hard floor regardless of length: at least 3 internal links, not counting the CTA action link.**
- **Quality override:** a link that clearly improves the article (deep topical fit, useful
  destination) goes in even past the cap. The cap exists to prevent padding, not to block great links.
- Padding that does NOT count as an override: duplicating a destination URL, linking the homepage or
  a services index to hit a number, glossary/about links the topic doesn't warrant, intro links.
- Existing links above the cap are KEPT — the cap never justifies removal.

## Placement and anchor rules

1. **No internal links in the introduction paragraph.** First link in the second section or later.
2. **One link per concept**, not per mention — link the first natural occurrence, leave the rest plain.
3. **Every link is contextual — no call-outs, ever.** No "See also:", "Read our article about X,"
   "Check out our guide," "For more information, visit…". If you removed the hyperlink, the sentence
   must still read perfectly. Extend or rework the sentence so the link is a natural phrase inside it.
4. **Descriptive anchors only.** No "click here," bare URLs, "this article," "learn more."
5. **Anchor the entity name, not the claim.** When a sentence names a thing and states a fact about
   it, the anchor goes on the name ("[Seamless aluminum gutters] install with far fewer joints…"),
   not on the fact or figure — numbers and comparative claims are volatile; the entity name is stable
   and matches the destination. Test: does the destination page's own title match the anchor text?
6. **Category label beats example list.** For a "types of X" destination, anchor the category phrase
   ("other siding types"), not the examples drawn from inside it ("vinyl, wood, brick, and stone").
7. Never link the article to its own URL (self-loop); never duplicate the same destination for two
   different claims; never change an anchor without keeping its href intact.

## The 8-check audit (run on every link, every time)

Run this systematic sweep whenever asked to "check the links," fix any single link, or do a final QA
pass — finding one issue doesn't end the sweep. For each internal AND external link:

1. **Is the URL actually live?** (Not a guessed path — verify, don't pattern-match.)
2. **Does the destination's topic match the specific claim, AND does any number in the claim
   literally match the number on that page?** Two separate checks — right page, right topic, wrong
   number is a real and common defect. Fetch the page and diff the figures.
3. **Is the anchor a clean, short descriptive phrase** (not over-extended into a clause)?
4. **Is the surrounding sentence free of gerund-subject AI framing** ("Understanding X helps you Y")?
5. **Is the citation embedded in the anchor, not a separate attribution clause?** Catch both
   parenthetical citations and "According to [Source], …" — state the claim directly and link the
   phrase containing the fact.
6. **Does the same URL appear twice for two different factual claims?** (Company-name mention + CTA
   reuse is the one allowed exception.)
7. **Does every specific qualifier (state, percentage, date, named policy) have a traceable basis?**
   A true claim with an unsupported qualifier bolted on is still a fabrication — generalize or source it.
8. **Final literal count, after all other fixes:** ≥3 non-CTA internal links and ≥2 external links.
   Count what actually landed — "within range while editing" has shipped under-floor articles twice.

**Evidence requirement:** "checked, looks good" is not a report. For checks #1–2 show the fetched
page content next to the claim; for #8 show the literal count. Never fabricate a plausible-looking
check result — if a fetch wasn't run, say "not yet verified." Ambiguous results get flagged
("couldn't confirm"), never smoothed into a clean pass.

## Output shape

Report the link work in this structure (in chat, and in the change summary if one is being produced):

```
internal_links:
  preserved:   [{url, anchor, section}]
  added:       [{url, anchor, section, rationale}]
  fixed:       [{old_url, new_url, reason}]
  broken_needs_review: [{url, status_code, suggested_replacement}]
  total: <literal count, non-CTA>
  cap_range: [min, max]
  past_cap: <bool + quality-override reason if true>
  evidence: <per-link verification notes for checks 1-2, or "not yet verified" flags>
```

## Guardrails

- The sitemap fetch (Step 1) is a hard gate, not optional polish — no article is "finished" until
  the live blog has been checked for topic-cluster siblings.
- Preserve beats optimize: existing links are never casualties of cleanup.
- If the floor can't be met with genuinely relevant live pages, say so and flag it — don't force an
  unrelated link in to hit the number.
- When editing links inside Google Docs, beware `replaceAllText` styling bleed: it applies the first
  character's styling to the whole replacement and can silently extend or delete a link. After any
  replace near a link, re-fetch and re-apply the link explicitly.
