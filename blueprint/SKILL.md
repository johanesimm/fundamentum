---
name: blueprint
description: Bootstrap AND drive the documented-initialization pipeline for a NEW / greenfield project — creates the docs/ scaffold (README, PROJECT_STATE, ROADMAP, CHANGELOG) and runs all five documentation phases in order (foundation → architecture → prd → engineering → planning), each defined in its own bundled phase file under phases/. Use when the user wants to start a project "documentation-first", asks to "initialize project docs", or asks for any single phase (vision/glossary/domain, architecture/ADRs, Master/Feature PRDs, engineering specs/schema/API, or the dev plan). Self-contained entry point for the whole docs pipeline.
---

# Documented Project Initialization (orchestrator)

You are bootstrapping a project that will be **fully documented before
any code is written**, using this pipeline:

```
foundation (00-08) → architecture (09.x) → PRDs (10-16)
→ engineering (20-25) → planning (dev phases)
```

Each phase is a bundled instruction file in `phases/`; this skill sets
up the scaffold, then you **read the relevant `phases/*.md` file and
follow it** for that phase. **Never write code during this pipeline.**
Never skip a phase: each consumes the previous one. If the user asks
for just one phase, jump straight to that phase file — but first
confirm its prerequisite docs exist (each file states what it needs).

## Step 1 — Interview (always first)

Ask (AskUserQuestion, batched): project name and one-sentence purpose;
what it explicitly is NOT; target users; whether any docs already
exist; and how far they want to go now (full pipeline vs one phase).
Do not proceed on assumptions.

## Step 2 — Scaffold `./docs/`

Create these four state files (small, from the answers):

-   `docs/README.md` — documentation index listing the five phases
    with status markers (✅ / 🚧 Next / ⏳ Planned)
-   `docs/PROJECT_STATE.md` — sections: Project, Current Phase,
    Current Milestone, Completed, Next Tasks, Locked Decisions
    (empty), Conversation Resume Prompt
-   `docs/ROADMAP.md` — phase table + upcoming deliverables +
    "Repository Rule: always update PROJECT_STATE.md and CHANGELOG.md
    after completing a major document"
-   `docs/CHANGELOG.md` — `## v0.1` with the scaffold entry + policy
    line ("Record all significant product, architecture, and
    documentation decisions here")

Create empty dirs: `docs/foundation`, `docs/architecture`, `docs/prd`,
`docs/engineering`, `docs/planning`.

## Step 3 — Drive the phases

Work through these in order, one at a time, finishing each before the
next. For each, **read the phase file and follow it to completion**:

| Order | Phase file | Produces |
|---|---|---|
| 1 | `phases/foundation.md` | foundation/00–08 |
| 2 | `phases/architecture.md` | architecture/09 + 09.5 ADRs + 09.A–J |
| 3 | `phases/prd.md` | prd/10-Master-PRD + Feature PRDs 11+ |
| 4 | `phases/engineering.md` | engineering/20–25 |
| 5 | `phases/planning.md` | planning/ overview + phase files |

Each phase file ends with a "Done when" gate and a pointer to the next
file — do not advance until the gate passes.

## House conventions (every phase skill enforces these; you enforce
them too when reviewing output)

1.  **Grill first**: every phase starts with an interview; nothing is
    invented. Recommended defaults are offered, the user decides.
2.  **Doc format**: header blockquote (`Document ID`, `Status: Draft
    vX.Y`, `Depends On`), a Documentation Roadmap status table,
    `---` separators between sections.
3.  **Numbering**: 00–08 foundation, 09.x architecture, 10 Master PRD,
    11+ Feature PRDs, 20+ engineering. IDs never reused.
4.  **Single source of truth**: reference authoritative docs, never
    duplicate them; the glossary owns terminology; changes to a locked
    decision require a superseding decision recorded in CHANGELOG.
5.  **Fully-decided rule** (PRDs onward): no "Open Questions" /
    "Pending" / "TBD" sections in Feature PRDs or engineering specs —
    every question is resolved with the user before the document is
    finished. The Master PRD's deferred-registry chapter is the ONLY
    place unresolved future questions may live.
6.  **Bookkeeping after every major document**: update
    PROJECT_STATE.md (current milestone), CHANGELOG.md (what + why),
    README.md and ROADMAP.md status markers.
7.  **Validate before declaring done**: grep for unresolved language,
    check ID uniqueness and dangling references, check banned-term
    consistency. Executable artifacts (SQL) get run, not just written.

## Exit

When all five phases are complete, generate the project's CLAUDE.md
with the `generate-claude-md` skill (it will reuse everything above as
interview input), then hand over to implementation.
