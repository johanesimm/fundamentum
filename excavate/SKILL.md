---
name: excavate
description: Retro-document an EXISTING codebase — survey the real code and database, then drive a reduced documentation pipeline (foundation → prd → data/API engineering → planning) that captures what the system already does and why. Use when the user wants to document, backfill docs for, or "reverse-engineer" an existing/brownfield project, or asks for vision/domain/glossary, PRDs, an ERD/schema/API reference, or a forward dev plan for a codebase that already exists. Reads the code as the source of truth; interviews the user only to fill product-intent gaps. Skips architecture and backend/frontend build-specs (the code already embodies those).
---

# Documented Project (existing codebase) — orchestrator

You are documenting a project that **already has code**. Unlike a
greenfield init, most technical facts already exist — your job is to
**read them out of the code and database**, then interview the user
**only for product intent the code cannot reveal** (vision, non-goals,
business rationale, intended rules, canonical terminology). This is the
brownfield sibling of `blueprint`.

Reduced pipeline (architecture and backend/frontend build-specs are
deliberately skipped — the code is the authority for those):

```
foundation (00-08) → PRDs (10-16) → data/API engineering (20-22)
→ planning (remaining work)
```

Each phase is a bundled instruction file in `phases/`; read the
relevant `phases/*.md` file and follow it. **Never invent behavior the
code doesn't have** — when code and stated intent disagree, surface the
discrepancy, don't paper over it. If the user asks for just one phase,
jump to that file (each states its prerequisites).

## Golden rule: code is the source of truth

For anything observable in the repo — entities, modules, routes, DB
tables, enums, current behavior — **derive it from the code, do not ask
the user to recite it.** Interview only for what the code cannot tell
you: *why* it exists, what it deliberately does NOT do, which behaviors
are intended vs accidental, canonical names, and locked business rules.
Every documented fact is either (a) read from the code, or (b) a
product-intent answer from the user — never a guess.

## Step 1 — Survey the codebase (always first)

Before any interview, spend real effort mapping the repo. Produce a
short internal survey (you'll reuse it in every phase):

-   **Stack & shape**: languages, frameworks, package manifests, how it
    runs (compose files, entrypoints, workers, jobs).
-   **Modules / features**: top-level code boundaries (folders,
    packages) — these become the Feature-PRD and data-ownership units.
-   **Domain entities**: models/schemas/ORM classes/migrations → the
    noun list and their relationships.
-   **Database**: locate migrations/schema; identify the live/dev DB so
    the engineering phase can introspect it.
-   **API surface**: route definitions → endpoints, methods, auth.
-   **Terminology & enums**: status/enum values and names actually used
    in code (the glossary must match these).
-   **Existing docs**: any README/docs already present — reconcile, do
    not duplicate.

Present a 5–8 line summary of what you found and the **gaps only the
user can fill** (intent, non-goals, rules, canonical names). That gap
list is your interview agenda.

## Step 2 — Interview (product intent only)

Ask (AskUserQuestion, batched) about what the code can't show: product
name + one-sentence purpose; what it explicitly is NOT; target users /
roles and who they map to in the code; which observed behaviors are
intended vs legacy/accidental; locked business rules; canonical
terminology where the code is inconsistent; and how far they want to go
now (full reduced pipeline vs one phase). Do not re-ask anything the
survey already answered.

## Step 3 — Scaffold `./docs/`

Create the four state files (small, from the survey + answers). Mark
them clearly as documenting an **existing** system:

-   `docs/README.md` — documentation index listing the phases below
    with status markers (✅ / 🚧 Next / ⏳ Planned)
-   `docs/PROJECT_STATE.md` — Project, Current Phase, Current Milestone,
    Completed, Next Tasks, Locked Decisions (seed with decisions
    already evident in code), Conversation Resume Prompt
-   `docs/ROADMAP.md` — phase table + "Repository Rule: update
    PROJECT_STATE.md and CHANGELOG.md after completing a major document"
-   `docs/CHANGELOG.md` — `## v0.1` scaffold entry noting this documents
    a pre-existing codebase as of today, + the record-all-decisions
    policy line

Create empty dirs: `docs/foundation`, `docs/prd`, `docs/engineering`,
`docs/planning`. (No `docs/architecture` — that phase is skipped.)

## Step 4 — Drive the phases

Work through these in order, one at a time, finishing each before the
next. For each, **read the phase file and follow it to completion**:

| Order | Phase file | Produces |
|---|---|---|
| 1 | `phases/foundation.md` | foundation/00–08 (derived + intent-confirmed) |
| 2 | `phases/prd.md` | prd/10-Master-PRD + Feature PRDs 11+ (as-built, fully decided) |
| 3 | `phases/engineering.md` | engineering/20-ERD, 21-Database-Schema, 22-REST-API (introspected from the real code + DB) |
| 4 | `phases/planning.md` | planning/ forward plan for remaining/desired work |

Each phase file ends with a "Done when" gate and a pointer to the next
file — do not advance until the gate passes.

## House conventions (enforced by every phase file; you enforce them
too when reviewing output)

1.  **Code first, intent second**: observable facts come from the code;
    the user is interviewed only for intent, rationale, and non-goals.
2.  **Surface discrepancies**: when the code contradicts stated intent
    or is internally inconsistent, record it explicitly (a "Known
    Discrepancies" note) rather than choosing silently.
3.  **Doc format**: header blockquote (`Document ID`, `Status: Draft
    vX.Y`, `Depends On`), a Documentation Roadmap status table, `---`
    separators between sections.
4.  **Numbering**: 00–08 foundation, 10 Master PRD, 11+ Feature PRDs,
    20–22 engineering. IDs never reused. (09.x architecture and 23–25
    build/deploy specs are intentionally absent.)
5.  **Single source of truth**: reference authoritative docs, never
    duplicate them; the glossary owns terminology (and must match the
    code's actual names).
6.  **Fully-decided rule** (PRDs onward): no "Open Questions" / "TBD" in
    Feature PRDs or engineering specs — resolve every question with the
    user (or by reading the code) before finishing. The Master PRD's
    deferred-registry chapter is the ONLY place unresolved future
    questions may live.
7.  **Bookkeeping after every major document**: update PROJECT_STATE.md,
    CHANGELOG.md, README.md and ROADMAP.md status markers.
8.  **Validate against reality**: the engineering phase introspects and
    checks docs against the actual running database and route table —
    a schema/API doc that doesn't match the code is not done.

## Exit

When the four phases are complete, generate the project's CLAUDE.md
with the `generate-claude-md` skill (it reuses the survey + docs above
as interview input), then hand over to implementation of the planned
remaining work.
