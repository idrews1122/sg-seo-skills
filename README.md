# SG SEO Skills

Standalone Claude Code skills for Single Grain SEO work. Each folder is one skill (`SKILL.md` plus optional `references/`, `scripts/`, `evals/`).

These were originally merged into the [ai-seo-content-polisher](https://github.com/idrews1122/ai-seo-content-polisher) (Content Editor Agent) repo via PR #1, but they're separate workflows from the content-editing pipeline, so they live here now.

## Skills

| Skill | What it does |
|---|---|
| [`related-keyword-finder`](related-keyword-finder/SKILL.md) | Vets secondary/related keywords for one article: DataForSEO volume + difficulty, intent confirmation via SERP overlap + live AI Overview reads, GSC cannibalization check, and a section-vs-spoke-vs-skip verdict per keyword. |
| [`seo-meeting-agenda-builder`](seo-meeting-agenda-builder/SKILL.md) | Builds the SEO/AEO section of a client meeting agenda: GSC compare windows, recent-content performance, Gong call follow-ups, agenda-doc continuity, source-attributed client-ready draft. |
| [`ai-overview-audit`](ai-overview-audit/SKILL.md) | Audits how Google's AI Overview answers a keyword cluster — who gets cited and why — and produces a content brief (Plan mode) or improvement strategy for an existing URL (Audit mode). Client-agnostic. |
| [`blog-int-linking`](blog-int-linking/SKILL.md) | Audits and optimizes one article's internal links: builds the link universe from the live sitemap, preserves/verifies every existing link, adds contextual links with an explicit blog-sibling + service-page mix and natural, keyword-rich anchors, enforces the 3-link floor + responsive caps, and runs the evidence-based 8-check link audit. Distilled from the Content Editor Agent's link rules. |

## Using them in Claude Code

Symlink (or copy) each skill folder into `~/.claude/skills/` to make it invocable as a slash command:

```bash
ln -s "$(pwd)/related-keyword-finder" ~/.claude/skills/related-keyword-finder
ln -s "$(pwd)/seo-meeting-agenda-builder" ~/.claude/skills/seo-meeting-agenda-builder
ln -s "$(pwd)/ai-overview-audit" ~/.claude/skills/ai-overview-audit
```
