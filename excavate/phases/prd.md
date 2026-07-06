# Phase 2 — PRDs (docs/prd/): Master PRD 10 + Feature PRDs 11+, as-built

> Extension of `excavate`. Read and follow this file when
> the orchestrator reaches the PRD phase. Reverse-engineer current
> behavior into fully-decided PRDs; interview only to capture intent.

Requires the foundation docs (00–08). These PRDs document **what the
system already does** — every functional requirement must correspond to
real, existing behavior in the code (or be explicitly flagged as
*desired, not yet built* and handed to the planning phase). Since there
is no architecture phase, the PRDs cite **code modules and data
ownership read directly from the repo** instead of 09.x docs.

Read the code for each module and mine it for: what it does, its rules
(guards, validations, state machines), its endpoints, and its enums.
Then interview the user for **intent** — which behaviors are intended,
which are legacy, and the business rationale. Nothing is invented.

## Part 1 — Master PRD (10)

Recommend the **comprehensive** model (confirm with the user): the
Master PRD owns cross-cutting requirements; Feature PRDs inherit and
never restate.

Build chapter by chapter in `docs/prd/10-chapters/10.NN-<name>.md`,
then merge into `docs/prd/10-Master-PRD.md`:

1.  **Executive Summary** — product, problem, solution, current MVP in
    one paragraph, this document's role
2.  **Goals & Success Metrics** — foundation criteria made measurable;
    where metrics exist in code/analytics, cite the real definitions
3.  **Personas & Roles** — persona → role → landing/workspace binding,
    matching the roles actually enforced in code
4.  **Scope** — what is built vs not, per module; a numbered **Scope
    Decisions** table resolving each foundation ambiguity (SD-1, …),
    flagging desired-but-unbuilt items
5.  **Cross-Cutting Requirements** — the heart. Define the
    requirement-ID convention (recommend module-prefixed `<MOD>-NNN` +
    a cross-cutting prefix), then themed ID blocks describing the
    **actual** cross-cutting behavior: workflow mechanics, permission
    matrix (role × capability × scope — transcribed from the code's
    authorization), notification behavior, controlled vocabularies
    (from the real enums), metric/threshold definitions, events (if the
    code emits any), AI guardrails (if applicable), terminology rules
6.  **Feature PRD Index** — one Feature PRD per code module, each with a
    scope paragraph, owned ID prefix, dependency order, and template
    obligations
7.  **Non-Functional Requirements** — security, performance,
    reliability, usability as currently implemented; note intended
    targets separately from observed reality
8.  **Open Questions & Deferred Items** — the ONLY place unresolved
    future questions may live: deliberate deferrals (DF-n), desired
    behaviors not yet built (routed to planning), and any **Known
    Discrepancies** (code vs intent) awaiting a decision
9.  **Traceability** — chapter → code sources → consumers

## Part 2 — Feature PRDs (11+)

One per code module, in dependency order. **Do not start a PRD until
the previous is fully decided.** Per PRD, sections in order:

1. Metadata header + status table
2. Purpose & module boundary (cite the actual code folder/package and
   the entities it owns)
3. Personas & permissions (reference the master matrix; deltas only)
4. Structural Decisions table (SD-NN.n) — decisions this PRD records,
   distinguishing as-built from newly-decided intent
5. Functional requirements, `<PREFIX>-NNN`, themed blocks, each
   testable and each traceable to real code (name the handler/service);
   mark any not-yet-built requirement as ⏳ Planned
6. Business rules — inherited (cited) + module-specific (BR-NN.n),
   each tied to the guard/validation in code that enforces it (or
   flagged as intended-but-unenforced)
7. Workflows traceable to the user journeys and the real routes
8. Events emitted (only if the code actually emits them)
9. Notifications consumed (only what the code sends)
10. Acceptance criteria — concrete numbered scenarios describing
    current behavior (usable as regression tests)
11. **Out of Scope (definitive)** — "This PRD is fully decided; it
    contains no open questions." Future/desired items reference the
    Master PRD deferred registry. NEVER an "Open Questions" section;
    avoid "Pending" in status tables (use "⏳ Planned").

## Working loop per PRD

1. Read the module's code; list its real behavior, rules, endpoints,
   and enums. Note anything intended-but-unenforced or accidental.
2. Grill the user only on intent/rationale and the discrepancies.
3. Write the PRD fully decided, every requirement tied to code (or
   marked ⏳ Planned and pushed to the planning phase).
4. Apply ripple effects: glossary/domain amendments, Master-PRD
   matrix/vocabulary amendments, merged-file regeneration.
5. Validate: `grep` for duplicate/dangling requirement IDs, unresolved
   language, banned terms; spot-check that cited handlers exist.
6. Bookkeeping: PROJECT_STATE, CHANGELOG (decisions individually),
   ROADMAP/README markers.

## Done when

Master PRD + all module PRDs exist, every functional requirement maps
to real code or is explicitly marked ⏳ Planned, validation greps are
clean, discrepancies are registered in Master PRD chapter 8, and
PROJECT_STATE points at engineering (`phases/engineering.md`).
