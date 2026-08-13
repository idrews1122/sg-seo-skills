---
name: new-post-int-linking
description: >-
  Plans and weaves internal links into a NEW blog post as it's being written — before a word is
  drafted, it builds the client's real internal-link universe from the live sitemap, identifies the
  topic-cluster siblings and relevant service/product pages the post should link to, and then places
  those links contextually during drafting with natural but keyword-rich anchor text, an explicit
  blog-sibling + service-page mix, hard floors (3+ non-CTA internal links, per word-count caps), and
  entity-name anchor placement — finishing with the same evidence-based link audit used on edits.
  Use whenever the user is writing, drafting, or generating a brand-new article and wants internal
  links planned or added as part of the draft; is briefing an AI writing tool (ClickFlow etc.) and
  needs real link targets to feed it; asks "what should this new post link to," "add internal links
  to my draft," or "plan the links for this article"; or is outlining a new piece for an existing
  site. Do NOT use for auditing or fixing links in an already-published or already-linked article
  (use blog-int-linking), keyword mapping (use related-keyword-finder), or site-wide architecture
  planning — this skill works one new article at a time.
---

# New-Post Internal Linking — Plan Links Before You Write

Your job is to make internal links a designed part of a new article, not an afterthought bolted on
during QA. A new post has no existing links to preserve — which means every link is a choice, and the
failure mode is different from editing: not broken links, but a finished draft with zero real links,
one homepage/CTA link doing all the work, or fabricated URLs from an AI writing tool.

The deliverable is a drafted (or drafting-ready) article whose links are planned from the client's
real published inventory, woven in contextually, and verified before the post is called done.

## Step 1 — Build the internal-link universe BEFORE drafting (mandatory)

Same hard gate as the editing skill, but it runs before the outline, not after the draft:

- Fetch the client's **live** published inventory — `<domain>/post-sitemap.xml` (WordPress/Yoast) or
  `<domain>/sitemap.xml` and children; fallback is the rendered blog index via WebFetch; when the
  SG-Gateway MCP is available, a further fallback is a DataForSEO indexed-page pull —
  `dataforseo_google_search` with `site:<domain>` (add the topic term to narrow, e.g.
  `site:example.com gutters`). Indexed-only, so brand-new posts may be missing — flag that gap when
  this fallback is the source.
- Identify every **topic-cluster sibling** of the new post's topic (for a gutters post: every
  `gutter-*` slug — installation cost, maintenance, materials, lifespan).
- Identify every **service/product page** relevant to what the post will discuss.
- Note the client's real slug pattern (e.g. `/genius-blog/<slug>/`, no `www`).
- **Self-cannibalization check:** confirm no existing post already targets the new post's primary
  keyword. If one does, stop and flag it — the fix is differentiation or a refresh of the existing
  page, not a competing new post (see related-keyword-finder for the full analysis).

Record candidates as URL + title. This list is the ONLY source of link targets for the draft.

## Step 2 — Plan the links into the outline

Before or while outlining, assign link opportunities to sections:

- For each planned H2, note which universe URL (if any) naturally belongs there.
- **The mix:** blog topic-cluster siblings carry the bulk of the count; **every service/product page
  relevant to a topic the post genuinely discusses gets linked once**, at its most natural in-body
  mention — sprinkled through the body, not saved for the CTA alone. If the post touches multiple
  relevant services (a storm-damage post discussing roof repair AND gutter replacement), each
  relevant service page gets its own link with anchor text relevant to that service.
- Plan to the target: the responsive cap for the expected word count, with the hard floor underneath
  (see Counts below). Leave room to add opportunistically while writing — the plan is a floor plan,
  not a straitjacket.
- No link planned for the introduction — first link lands in the second section or later.

**If an AI writing tool (ClickFlow etc.) will produce the first draft:** pass the planned links into
the prompt as full, verified URLs — never topic labels (generators fabricate plausible-looking paths
when left to guess). Then still treat every internal link in the returned draft as suspect: verify
each against the universe and replace anything the tool invented or mangled.

## Step 3 — Weave links in while drafting

- **Every link is contextual — no call-outs, ever.** No "See also:", "Read our article about X,"
  "Check out our guide." Write the sentence so the link is a natural phrase inside it; if the
  hyperlink were removed, the sentence must still read perfectly.
- **Natural but keyword-rich anchors.** The anchor carries the destination page's target keyword or
  a close variant — "professional [gutter installation]" linking the gutter-installation service
  page. Natural is the constraint, keyword-rich is the goal: if the exact term won't sit in the
  sentence without contorting it, use the closest phrasing that flows. Never repeat the same anchor
  keyword across multiple links in one article.
- **Anchor the entity name, not the claim.** When a sentence names a thing and states a fact about
  it, the link goes on the name ("[Seamless aluminum gutters] install with far fewer joints…"), not
  on the fact or figure. Test: does the destination page's own title match the anchor text?
- **Category label beats example list.** For a "types of X" destination, anchor the category phrase
  ("other siding types"), not the examples inside it ("vinyl, wood, brick, and stone").
- **One link per concept**, first natural occurrence only; later mentions stay plain text.
- Never link to the URL the post will be published at (self-loop); never use the same destination for
  two different factual claims (company-name mention + CTA reuse is the allowed exception).

## Counts: responsive cap + hard floor

Target by the draft's final word count:

| Word count | Target internal links |
|---|---|
| Under 800 | 2–3 |
| 800–2,000 | 3–5 |
| Over 2,000 | 4–6 |

- **Hard floor regardless of length: at least 3 internal links, not counting the CTA action link.**
- **Quality override:** a link that clearly improves the article goes in even past the cap. The cap
  prevents padding; it never blocks a great link.
- Padding that does NOT count: duplicating a destination, linking the homepage or a generic services
  index to hit a number, glossary/about links the topic doesn't warrant, intro links.
- If the floor can't be met with genuinely relevant live pages, say so and flag it — a thin cluster
  is a finding (and a content-gap signal for the client), not a license to force irrelevant links.

## Step 4 — Verify before calling the draft done

Run the full 8-check audit from `blog-int-linking` on the finished draft — a new post gets no pass
on verification just because the links were planned. The checks that matter most for new posts:

1. **Every URL is live** — fetched and confirmed, not pattern-matched. This is non-negotiable for
   AI-generated drafts.
2. **Destination topic matches the claim, and any number in the claim matches the number on the
   destination page** — fetch and diff, don't assume.
3. **Final literal count** after the draft settles: ≥3 non-CTA internal links (and ≥2 external).
   Count what actually landed, not what was planned.

Plus the shared sentence-level checks: clean short anchors, no gerund-subject AI framing around
links, citations embedded in anchors (no "According to X," clauses), no unsupported qualifiers.

**Evidence requirement:** show the fetched page next to each verified link and the literal final
count. "Checked, looks good" is not a report; an unrun check is reported as "not yet verified."

## Output shape

```
internal_links:
  planned:     [{url, target_section, anchor_plan, type: blog|service}]
  placed:      [{url, anchor, section, rationale}]
  dropped_from_plan: [{url, reason}]        # planned but no natural home in the final draft
  total: <literal count, non-CTA>
  cap_range: [min, max]
  past_cap: <bool + quality-override reason if true>
  cluster_gaps: <topics with no linkable sibling — content-gap signal for the client>
  evidence: <per-link verification notes, or "not yet verified" flags>
```

## Guardrails

- The sitemap fetch is a hard gate BEFORE outlining — planning links from memory or from unpublished
  drafts in a shared folder produces guessed URLs and missed siblings.
- Only URLs from the verified universe go in the draft — no exceptions, including AI-generated ones.
- Relevance gates every link: a planned link with no natural home in the final draft gets dropped
  (and recorded), not forced in.
- Links are woven at drafting time, not sprinkled on at the end — retrofitting produces call-outs
  and awkward anchors.
