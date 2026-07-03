---
name: docs-prd
description: Generate the Master PRD (10, chapter by chapter) and fully-decided Feature PRDs (11+) from completed foundation + architecture docs. Use after docs-architecture in the documentation pipeline, or when the user asks for a Master PRD / feature PRDs. Enforces the fully-decided rule (zero open questions in Feature PRDs) and grills the user on every product decision instead of parking it.
---

# PRDs (docs/prd/): Master PRD 10 + Feature PRDs 11+

Requires foundation (00–08) and architecture (09.x) to exist — read
them first and mine them for **gaps, ambiguities, and inconsistencies**
(undefined metrics, conflicting scope statements, terms used but not
defined, thresholds referenced but never quantified). Those gaps are
your interview agenda: **every one becomes a question to the user,
then a decision in the PRD. Nothing is parked.**

## Part 1 — Master PRD (10)

Recommend the **comprehensive** model (confirm with the user): the
Master PRD owns all cross-cutting requirements; Feature PRDs inherit
and never restate.

Build chapter by chapter in `docs/prd/10-chapters/10.NN-<name>.md`,
then merge (header + concatenation) into `docs/prd/10-Master-PRD.md`:

1.  **Executive Summary** — product, problem, solution, MVP in one
    paragraph, this document's role
2.  **Goals & Success Metrics** — foundation criteria made measurable
3.  **Personas & Roles** — persona → role → landing/workspace binding
4.  **Scope** — MVP in/out per module; a numbered **Scope Decisions**
    table resolving every foundation ambiguity (SD-1, SD-2, …)
5.  **Cross-Cutting Requirements** — the heart. Define the
    requirement-ID convention (recommend module-prefixed:
    `<MOD>-NNN` + a cross-cutting prefix), then themed ID blocks:
    core workflow mechanics, permission matrix (role × capability ×
    scope), notification matrix (event × recipient × channel),
    controlled-vocabulary gaps (add missing ones to the glossary as a
    recorded product decision), metric/threshold definitions with
    formulas, event catalog (extending 09.E), AI guardrails as
    requirements, general terminology/navigation rules
6.  **Feature PRD Index** — one Feature PRD per architecture module
    (09.C), each with scope paragraph, owned ID prefix, dependency
    order, and the **template obligations** list (§ below)
7.  **Non-Functional Requirements** — security, performance,
    reliability, usability, AI quality — numbered in the cross-cutting
    scheme
8.  **Open Questions & Deferred Items** — the ONLY place unresolved
    questions may live in the whole documentation set: inherited
    foundation questions (OQ-n), deliberate deferrals (DF-n), and
    foundational defaults awaiting confirmation (convert to
    "Confirmed" with date once the user ratifies them)
9.  **Traceability** — chapter → sources → consumers; ID block →
    consuming PRDs; amendments this PRD makes to upstream docs

## Part 2 — Feature PRDs (11+)

One per architecture module, in dependency order. **Do not start a
PRD until the previous one is fully decided.** Per PRD, sections in
order:

1. Metadata header + status table
2. Purpose & module boundary (cite 09.C/09.F data ownership)
3. Personas & permissions (reference the master matrix; deltas only)
4. Structural Decisions table (SD-NN.n) — the decisions this PRD's
   interview produced
5. Functional requirements, `<PREFIX>-NNN`, themed blocks, each
   testable
6. Business rules — inherited (cited) + new (BR-NN.n, flagged as
   product decisions)
7. Workflows traceable to the user journeys
8. Events emitted (subset of the master catalog; new events =
   Master-PRD amendment, applied immediately)
9. Notifications consumed (subset of the master matrix)
10. Acceptance criteria — concrete numbered scenarios
11. **Out of Scope (definitive)** — "This PRD is fully decided; it
    contains no open questions." Future items reference the Master
    PRD deferred registry. NEVER an "Open Questions" section; avoid
    the word "Pending" in status tables (use "⏳ Planned").

## Working loop per PRD

1. Read the relevant foundation/architecture/master material; list
   the genuine product decisions the docs don't settle.
2. Grill the user (AskUserQuestion, recommended option first).
3. Write the PRD fully decided.
4. Apply ripple effects immediately: glossary/domain-model amendments
   (marked as product decisions), Master-PRD catalog/matrix
   amendments, merged-file regeneration.
5. Validate: `grep` for duplicate/dangling requirement IDs, unresolved
   language, banned terms.
6. Bookkeeping: PROJECT_STATE (next milestone), CHANGELOG (decisions
   recorded individually), ROADMAP/README markers.

## Done when

Master PRD + all module PRDs exist, validation greps are clean
everywhere, every foundation open question is either decided in a PRD
or explicitly registered in Master PRD chapter 8, and PROJECT_STATE
points at engineering (skill: `docs-engineering`).
