# Groundwork — Documentation-First Project Initialization Skills

> A Claude Code skill suite that builds a complete, fully-decided
> documentation set for a new software project **before any code is
> written** — then plans the implementation and generates the
> project's CLAUDE.md.
>
> **Note:** this suite is project-agnostic and destined for its own
> repository (personal project, working name **Groundwork**). It
> currently lives inside *Platform — Team Monitoring* only because it
> was extracted from that project's documentation programme. Nothing
> in these skills depends on this repository.

------------------------------------------------------------------------

## What it does

You start with an idea. The skills interview you — they never invent
product facts — and produce, in order:

```
docs/
├── foundation/    00–08  vision, principles, glossary, domain model,
│                         org model, IA, user journeys, AI strategy,
│                         MVP roadmap
├── architecture/  09.x   solution architecture, ADRs, module/data/
│                         permission/state boundaries, stack decision
├── prd/           10–16  Master PRD (cross-cutting requirements,
│                         permission & notification matrices, metric
│                         formulas, event catalog) + one fully-decided
│                         Feature PRD per module — zero open questions
├── engineering/   20–25  ERD, database schema (validated against a
│                         real database), REST API with guard-code
│                         registry, frontend & backend specs,
│                         deployment + dev-environment guide
└── planning/             priority-ordered dev phases with checkbox
                          deliverables and verifiable exit criteria
```

…plus the four state files (README, PROJECT_STATE, ROADMAP, CHANGELOG)
and, at the end, a CLAUDE.md so any future session can implement the
project without re-deriving anything.

## The method (what makes it different)

1. **Grill first** — every phase starts by interviewing the user;
   gaps found in earlier docs become questions, never assumptions.
2. **Fully-decided rule** — Feature PRDs and engineering specs ship
   with no "Open Questions"/"TBD"; the Master PRD's deferred registry
   is the single sanctioned backlog for future questions.
3. **Validate, don't just write** — schemas run against a throwaway
   database container; requirement references are machine-checked
   across every document.
4. **Bookkeeping discipline** — PROJECT_STATE/CHANGELOG/ROADMAP are
   updated after every major document, so any session can resume.

## Skill inventory

| Skill | Role | Invoke when |
|---|---|---|
| `docs-init-project` | **Entry point** — scaffold + house conventions + drives the pipeline | Starting a new documentation-first project |
| `docs-foundation` | Foundation docs 00–08 | After init |
| `docs-architecture` | Architecture 09.x + ADRs | After foundation |
| `docs-prd` | Master PRD + fully-decided Feature PRDs | After architecture |
| `docs-engineering` | Engineering specs 20–25 (with live validation) | After PRDs |
| `docs-planning` | Priority-ordered dev phases + CLAUDE.md wiring | After engineering |
| `generate-claude-md` | Standalone: generate a house-style CLAUDE.md for any project (interview-driven) | Anytime; also the pipeline's final step |

Each skill is self-contained; the pipeline order above is enforced by
each skill's prerequisites, not by hidden state.

## Installation (in a new repository)

- **Per project**: copy the skill folders into `<repo>/.claude/skills/`.
- **Everywhere**: copy them into `~/.claude/skills/` to have the suite
  available in every project.

Then, in Claude Code:

```
"Initialize this project documentation-first"   → docs-init-project
"Generate a CLAUDE.md for this project"         → generate-claude-md
```

## Recommended repository name

**`groundwork`** — lay the groundwork before you build. Alternatives
considered: `spec-forge`, `blueprint-first`, `inception-docs`,
`docs-first-kit`. Suggested description: *"Interview-driven,
documentation-first project initialization skills for Claude Code —
from idea to fully-decided specs to phased implementation plan."*

## Provenance

Extracted from the **Platform — Team Monitoring** documentation
programme (2026), where this exact pipeline produced: 9 foundation
docs, 12 architecture docs, a 59-requirement Master PRD, 6 Feature
PRDs with 90 requirements and zero open questions, 6 engineering specs
with a PostgreSQL-validated 34-table schema, and an 8-phase
development plan.
