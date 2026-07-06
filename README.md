# Fundamentum — Documentation-First Project Initialization Skills

> A Claude Code skill suite that builds a complete, fully-decided
> documentation set for a software project — **before any code is
> written** for a greenfield build, or **retro-fitted onto an existing
> codebase** — then plans the implementation.

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

…plus the four state files (README, PROJECT_STATE, ROADMAP, CHANGELOG) and, at the end, a CLAUDE.md 
so any future session can implement the project without re-deriving anything.

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

Three skills — two orchestrators (new vs existing project) plus the
standalone CLAUDE.md generator:

| Skill | Role | Invoke when |
|---|---|---|
| `blueprint` | **Greenfield orchestrator** — scaffolds `docs/` and drives all five phases (foundation → architecture → prd → engineering → planning), deciding everything by interview | Starting a brand-new project documentation-first, or asking for any single phase |
| `excavate` | **Brownfield orchestrator** — surveys the real code + DB, then drives a reduced pipeline (foundation → prd → data/API → planning) that documents what's already built and plans the gap | Documenting / reverse-engineering an existing codebase |
| `generate-claude-md` | Standalone: generate a house-style CLAUDE.md for any project (interview-driven) | Anytime; also each pipeline's final step |

The phases are **not** separate skills — each orchestrator bundles them
as instruction files under its own `phases/`, read one at a time:

```
blueprint/  (greenfield)              excavate/  (existing codebase)
├── SKILL.md   scaffold + drive       ├── SKILL.md   survey code, then drive
└── phases/                           └── phases/
    ├── foundation.md   00–08             ├── foundation.md   00–08  (derived + intent)
    ├── architecture.md 09.x              ├── prd.md          10–16  (as-built PRDs)
    ├── prd.md          10–16             ├── engineering.md  20–22  (introspected
    ├── engineering.md  20–25             │                          ERD/schema/API)
    └── planning.md     dev phases        └── planning.md     remaining-work plan
```

The existing-project pipeline deliberately **skips architecture (09.x)
and the backend/frontend build-specs + deploy guide (23–25)** — for a
codebase that already exists, the code is the authority for those. Its
method flips too: **code is the source of truth**, and the user is
interviewed only for product intent the code can't reveal (vision,
non-goals, rationale, canonical names).

In both, the pipeline order is enforced by each phase file's stated
prerequisites and "Done when" gate, not by hidden state — so you can
jump straight to one phase, provided its inputs already exist.

## Installation (in a new repository)

- **Per project**: copy the skill folders into `<repo>/.claude/skills/`.
- **Everywhere**: copy them into `~/.claude/skills/` to have the suite
  available in every project.

Then, in Claude Code:

```
"Initialize this new project documentation-first"  → blueprint
"Document this existing codebase"                   → excavate
"Generate a CLAUDE.md for this project"             → generate-claude-md
```
