# Phase 4 — Forward Plan (docs/planning/), remaining work

> Extension of `excavate`. Read and follow this file when
> the orchestrator reaches the planning phase — the final step. Plans
> the work that is NOT yet built, not the code that already exists.

Requires the PRDs and the engineering reference. Unlike a greenfield
plan (which sequences the whole build), this plan sequences only the
**gap** between the current system and the desired one: everything the
foundation/PRD phases marked ⏳ Planned or recorded as a Known
Discrepancy, plus any cleanup the user wants. Confirm the priority cut
with the user. Do not re-plan already-shipped functionality.

## Inputs — assemble the gap list first

Collect, from the docs you just wrote:

-   **Unbuilt requirements** — every PRD requirement marked ⏳ Planned.
-   **Known Discrepancies** — code-vs-intent mismatches recorded in the
    foundation/PRD/engineering docs (each becomes a fix or an accepted
    decision).
-   **API/schema gaps** — endpoints without requirements and
    requirements without endpoints from doc 22; migration/DB drift from
    doc 21.
-   **User's stated priorities** — the capabilities from 08 (current-
    state + gap) the user wants next.

If the gap list is empty (the system already matches intent), say so
plainly and produce a short "no outstanding work" overview instead of
inventing phases.

## Files to produce

**`00-Development-Plan-Overview.md`** containing:

-   A **current-state summary**: what is already shipped (one line per
    module, from the PRDs) so the plan is read against reality.
-   Phase index table: number, file, one-line scope, priority
    (P1 = must-fix/blocking → P3 = nice-to-have), depends-on, mapping to
    the gap items above.
-   Rationale for the priority cut (fix correctness/discrepancies first,
    then desired capabilities, then polish).
-   Working agreements: docs are authoritative (changes go through docs
    first); checklist discipline; tracking via PROJECT_STATE/CHANGELOG;
    a **Definition of Done** per deliverable (implements its cited
    requirements with server-side guards, covered by tests, matches the
    documented schema/API).
-   **Out of Plan** list — everything the Master PRD defers, stated as
    "do not build".

**One file per phase** (as many as the gap needs — often fewer than a
greenfield build). Each phase file:

-   Header: goal (one paragraph), priority, depends-on, the PRD/eng
    sections and gap items it closes
-   **Deliverables as checkboxes**, grouped (backend / worker /
    frontend), each citing its requirement IDs and, where it changes
    existing code, naming the module/file it touches
-   **Cross-phase seams made explicit**: stubs and the phase that wires
    them; migrations that must run in order
-   **Exit criteria**: numbered, verifiable, mapped to PRD acceptance
    scenarios — including regression checks that existing behavior still
    passes

## Wire it into CLAUDE.md

Add/replace the project CLAUDE.md **Implementation Guide** section:
trigger condition; "the docs describe the system as-built plus the
planned gap — do not invent behavior; if a spec doesn't answer, stop and
update the spec first"; the phase list with the rule that a phase starts
only when the previous exit criteria pass; a "which doc answers what"
map; the non-negotiables (don't regress shipped behavior, server-side
guards, matches the documented schema/API, the do-not-build list).
Generate the CLAUDE.md itself with the `generate-claude-md` skill.

## Validation & bookkeeping

Cross-check every requirement ID cited in planning files against the
PRDs (same comm/grep as the engineering phase). Update PROJECT_STATE
(current milestone = first planned phase, or "documentation complete —
no outstanding work"), CHANGELOG, README (add the planning section),
ROADMAP (documentation ✅, remaining work 🚧 Next).

## Done when

Overview + any phase files exist with clean ID cross-checks, the plan
covers exactly the gap (nothing already-built is re-planned, nothing
⏳ Planned is dropped), CLAUDE.md guides a fresh session, and the state
files agree. Documentation of the existing project is complete.
