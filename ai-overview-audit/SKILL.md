---
name: ai-overview-audit
description: >-
  Audits how Google's AI Overview answers a keyword cluster (1 primary + up to 5 related) for ANY
  client or brand — whether an AI Overview appears, which brands get cited and why, what intent
  prompts Google surfaces, and what content changes will improve the client's visibility and citation
  frequency in AI-generated answers. Client-agnostic: it collects the brand's own positioning at
  runtime (from the user or a brand brief) and grounds every recommendation in that — it carries NO
  hardcoded client data. Two modes: Plan (a topic/keyword with no content yet → content brief) and
  Audit (an existing live URL that isn't ranking or getting cited → improvement or pivot strategy).
  Output is always a structured Google Doc. Use whenever a user wants to understand how Google's AI
  Overview is answering questions in their topic area, see which competitors are cited and why, find
  the intent prompts Google serves, get content-section recommendations from AI Overview signals,
  audit content that isn't ranking or being cited in LLMs, or plan new content using AI Overview data.
  Trigger on: /ai-overview-audit, "AI overview audit", "scrape AI overview for [keyword]", "why is
  [competitor] showing up in the AI overview", "what intent prompts does Google show for [topic]",
  "content brief from AI overview", "LLM citation audit", "AEO content audit".
---

# AI Overview Intent Auditor

You help users understand how Google's AI Overview is answering questions in their topic area, who is
getting cited and why, and what content changes will improve a brand's visibility in AI-generated
answers.

**This skill is client-agnostic. It carries no hardcoded brand, persona, account, or messaging data.**
You collect the client's brand positioning as a runtime input (Step 1) and ground every
recommendation in that. Never invent positioning, and never import one client's strategy into another
client's audit.

---

## Two Modes

- **Plan mode**: User has a topic/keyword idea but no written content yet. Produce a content brief
  with recommended sections, angles, and intent prompts to answer — grounded in the brand positioning
  you collected in Step 1.
- **Audit mode**: User has existing live content that isn't ranking well or isn't being cited in LLMs.
  Compare their content against AI Overview signals and recommend specific improvements or a pivot
  strategy — flagging any messaging that has drifted from the brand positioning you collected.

The output is always a structured Google Doc the user can share with clients or use in a content tool.

---

## Step 1: Determine Mode, Collect Inputs, and Load Brand Context

Greet the user and ask:

> "Are we working in **Plan mode** (no existing content yet) or **Audit mode** (you have live content
> that isn't ranking or getting cited well)?"

Then collect the run inputs:

1. **Client brand name** — the brand to check for mentions.
2. **Primary keyword** — the pillar topic (required).
3. **Related keywords** — up to 5 secondary/cluster keywords (encourage at least 3).
4. **If Audit mode** — the URL of the existing content to evaluate.

Then **load the brand context for THIS client** — this is what makes recommendations specific instead
of generic, and it must come from the client, not from memory. Pull it from a brand brief if one is
available (e.g., the gateway `brand_infer` / `brand_brief_md` tools, or a positioning doc the user
provides), otherwise ask the user for as much of the following as they have:

- **What the brand IS and is NOT** — one line each; comparisons/categories to avoid.
- **Category positioning** — how it wants to be understood.
- **Target personas** — who the content serves and their core fear/urgency.
- **Key problems / failure patterns** the brand addresses.
- **Proof points** — named customers, results, or evidence the brand may cite. **Only if the user
  provides them — never invent or reuse another client's.**
- **Messaging do's / don'ts and voice** — language to use and avoid.

If the user has no formal positioning, proceed with the brand name plus a short positioning statement
they give you. Everywhere downstream that says "map to the relevant persona / failure pattern / proof
point," it refers to whatever you collected here for THIS client — nothing preset.

Confirm the inputs and the brand context before proceeding.

---

## Step 2: Scrape Google AI Overviews

For each keyword (primary first, then related), use the Claude in Chrome browser tools to:

1. Navigate to `https://www.google.com`
2. Search the keyword
3. Use JavaScript (`javascript_tool`) to extract the AI Overview content — `get_page_text` will miss
   dynamically rendered AI Overviews. After navigating, click "Show more" if present, then extract the
   full AI Overview div text via JS. Take screenshots to verify and capture anything JS misses.

Extract the following — be thorough and precise on all categories:

**a) AI Overview presence**
Does an AI Overview appear? If not, note it — a missing AI Overview means Google hasn't settled on a
canonical answer yet, which is a content opportunity.

**b) Client brand mentions — three distinct tiers:**
- **Named in body text**: Is the client brand mentioned by name anywhere in the visible AI Overview
  text? (Highest value — this is what users actually read.)
- **Cited as a linked source**: Does the client brand appear as a hyperlinked citation within the AI
  Overview? Note the anchor text, what section it supports, and its position (1st, 2nd, etc.).
- **Background source only**: Does the client brand appear in the expandable sources panel but NOT in
  the visible body text or as a named citation? (Lowest visibility — Google is reading their content
  but not surfacing them.)

**c) Competitor brand mentions — two lists:**
- **Linked brands**: Brands appearing as hyperlinked citations inside the AI Overview. Record: brand
  name, what claim/section they're cited for, mention order.
- **Unlinked brands**: Brands mentioned by name in the AI Overview text but NOT as source links.
  Record: brand name, the sentence they appear in, mention type (Tool / Competitor / Example /
  Reference), mention order.

**d) Intent prompts — two types, labeled separately:**
- **Clickable prompt chips** 💬: Question buttons below the AI Overview that open AI Mode with a
  pre-filled follow-up query. List verbatim in order.
- **Embedded follow-up questions** 📝: Questions or suggestions Google writes into the AI Overview body
  text itself to prompt further engagement. List verbatim in order.
- If neither type is found, explicitly note: "No intent prompts found for this keyword."

**Limit**: Maximum 6 Chrome searches per run (1 primary + up to 5 related).
**If Chrome is unavailable or returns a CAPTCHA**: Note it and work with data already collected. Never
fabricate AI Overview content.
**Important**: AI Overviews vary by session. If you are uncertain whether a citation is present,
re-verify before reporting it. Only report what you can confirm.

---

## Step 3: If Audit Mode — Read the Existing Content

Navigate to the user's content URL and extract:
- Main topics and subtopics covered
- Content format (listicle, how-to, definition piece, comparison, case study, etc.)
- How often the client's brand name appears explicitly
- Depth of coverage on each topic
- Any sections that directly answer questions similar to the intent prompts found
- Any messaging that has drifted from the brand positioning you collected in Step 1 (flag it against
  that client's own do's/don'ts — not a generic standard)

---

## Step 4: Generate the Google Doc

Use the `google_docs_create` tool (via singlegrain-gateway) to create the report.

Title: `AI Overview Audit — [Primary Keyword] — [Date]`

Use bullet points throughout. Avoid dense paragraphs. Every section should be scannable in under 60
seconds.

### DOC STRUCTURE

**One full block per keyword. Repeat for each keyword.**

---

**[KEYWORD NAME]**

*AI Overview*
• Present: YES / NO
• [If NO]: Note this as a content opportunity — Google hasn't settled on a canonical answer yet.

*[Client Brand] Status*
• Mentioned by brand name in AI Overview body text: YES / NO
• Cited as a linked source: YES (position: Xth, cited for: [what]) / NO
• Background source only (in sources panel, not visible to user): YES / NO
• NOTE: [1–2 sentences on what this combination means strategically]

*Linked Brands* (Google citing as sources)
• [Brand] — cited for: [topic/claim], position: Xth

*Unlinked Brands* (mentioned in AI Overview text, not as sources)
• [Brand] — "[exact sentence they appear in]" — mention type: Tool / Competitor / Example

*Competitor Citation Analysis*
• [Brand]: [Why they're winning — specific content signals, format, topic depth, angle]
• PATTERN: [What this keyword's citation pattern reveals about what Google is rewarding. Connect to
  the client's positioning where relevant.]

*Intent Prompts Found*
• 💬 "[verbatim prompt]" *(clickable chip — opens AI Mode)*
• 📝 "[verbatim prompt]" *(embedded in AI Overview text)*
• [If none]: No intent prompts found for this keyword.
• NOTE: [What these prompts reveal about user intent. Map to the relevant persona and problem/failure
  pattern from the brand context you collected.]
• How to target these prompts: [3–4 sentences. State clearly whether these prompts should be targeted
  in the hub piece, a spoke article, or a standalone piece — and why. Recommend a specific section
  title or structure (numbered list, diagnostic framework, comparison table) that makes each answer
  individually citable by Google. Give the angle that connects to the right persona and frames the
  problem structurally — burden on the complexity of the problem, not the buyer.]

*Positioning Recommendations for This Keyword*
• To get mentioned by brand name in AI Overview body text: [specific recommendation grounded in the
  client's messaging]
• To move from background source to linked citation: [specific content gap to close]
• To answer the intent prompts: [how to work the prompt questions into content, framed for the
  relevant persona]
• Content angle to beat [top competitor]: [specific — must reflect the client's actual positioning,
  not generic software marketing]

---

*(Repeat the above block for each keyword)*

---

**CROSS-CLUSTER SYNTHESIS**

*Competitors Across the Cluster*
• [Brand]: appears in [X] keywords — [citation pattern and whether the client's positioning can
  displace them]
• OVERALL PATTERN: [What's being rewarded across the cluster and how it maps to the client's existing
  authority vs. content gaps]

*Intent Prompt Themes Across the Cluster*
• Theme: [name] — prompts: [list] — content opportunity: [what to write, which persona it serves,
  which problem/failure pattern it addresses]

---

**CONTENT RECOMMENDATIONS**

Before writing this section, reason through the audit data to determine the right content
architecture. Do not default to hub-and-spoke. Ask yourself:

- **Where is the client already winning?** Strong citation presence across most keywords may mean they
  need deepening (better spoke content) rather than a new hub.
- **Where are the gaps?** Absent from high-funnel generic queries but strong on specific ones → a hub
  piece may bridge the gap. Absent everywhere → a standalone foundational piece may be the start.
- **What does the competitive landscape look like?** If competitors win with generic content, the
  client's differentiator is specificity — go deep where competitors don't. If competitors win with
  specific content, the gap may be at the broader category level.
- **What does the keyword mix suggest?** Definitional + how-to + vertical-specific often calls for
  hub-and-spoke. A tight set of related how-to queries may call for one comprehensive piece. Mostly
  brand-adjacent queries may call for a comparison or category-defining piece.

Choose the architecture that fits the data, then explain the reasoning in 2–3 sentences. Options
include (but are not limited to): **hub and spoke**, **standalone foundational piece**, **spoke
deepening**, **cluster series**, or a **pivot/repositioning piece** (Audit mode, when existing content
is cited for the wrong reasons).

*Recommended Architecture*
• [State the recommended structure and why — 2–3 sentences grounded in the audit data. If
  hub-and-spoke, name which keywords the hub targets vs. the spokes. If standalone, explain what gap
  it closes.]

*Content Angle Principle (applies to all architectures)*
Lead with the structural problem and the buyer's pain — not the product, not the brand. The audience
is defined by the problem they have, not the category they work in. The hub or entry-level piece
should describe the structural failure in terms that resonate with the target persona you collected in
Step 1. Narrower, industry- or segment-specific language belongs in spoke content where the buyer has
already self-identified. This applies to titles, opening paragraphs, and section headers: lead with
what breaks, not who you serve.

*Recommended Piece(s)*
For each recommended piece:
• **Title options**: [2–3 options — lead with the problem or the buyer's structural challenge, not the
  product or the industry, in the hub/entry piece]
• **Target keywords**: [which cluster keywords this piece is designed to rank for]
• **Primary persona**: [one persona from the brand context you collected]
• **Primary problem / failure pattern**: [one, from the brand context you collected]
• **Format + word count**: [format type and rationale]
• **Recommended sections**:
  - Section: "[Title]" — Rationale: [why this section earns citations based on what was scraped,
    connected to the client's messaging]
• **Entities to reference**: [terms that build topical authority and/or the client's category
  positioning]
• **Brand visibility tips**:
  - [One-sentence brand statement to include verbatim — what Google pulls for a named body-text
    mention]
  - [Structural tip for earning linked citations — e.g., bold lead sentences per section, citable
    claim openers]

---

**TOP FINDING**
• [2–3 sentences: the single most important strategic takeaway — what's working, what's missing, and
  the highest-leverage action to take first. Connected to the client's actual positioning and the
  buyer it serves.]

---

## Step 5: Return to the User

Share the Google Doc link and give a 2-sentence summary of the single most important finding.

---

## Important Notes

- **Client-agnostic, always.** All brand positioning, personas, problems, and proof points come from
  the brand context collected in Step 1. Never hardcode a client's data into this skill, and never let
  one client's positioning leak into another client's audit.
- Never fabricate AI Overview content. Only report what you actually see. AI Overviews vary by session
  — if uncertain about a citation, re-verify.
- A missing AI Overview is a valid finding — note it as an opportunity.
- The three-tier client brand distinction (named / cited / background) is the most strategically
  important output — be precise.
- Keep every section scannable. Use bullets, not paragraphs.
- The NOTE and PATTERN labels give the user the "so what" without requiring them to interpret raw data.
- When recommending content, check every recommendation against the client's own messaging do's/don'ts
  from Step 1. Flag and redirect anything that drifts from how THIS client wants to be positioned.
- When mapping intent prompts to content opportunities, identify the relevant persona and problem from
  the collected brand context so recommendations are specific, not broad.
- The "How to target these prompts" guidance should always specify: (1) hub vs. spoke vs. standalone,
  (2) a concrete section structure or title, and (3) the angle that makes the answer individually
  citable — a bold lead sentence, a named framework, or a standalone claim Google can pull.
- Content architecture is a reasoning exercise, not a template. Read the full audit data before
  recommending a structure. Hub-and-spoke is one option among several.
- The hub or entry-level piece should lead with the structural problem, not the product or the
  industry. Segment-specific language belongs in spoke or deep-dive content.
