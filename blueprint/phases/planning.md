# Phase 5 — Development Plan (docs/planning/)

> Extension of `blueprint`. Read and follow this file when the
> orchestrator reaches the planning phase — the final documentation
> step. Requires PRDs and engineering specs.

This plan turns the specs into a **priority-ordered, dependency-
sequenced build order** with verifiable gates. It contains no new
decisions — only sequencing (confirm the priority cut with the user if
the product has any unusual emphasis).

## Files to produce

**`00-Development-Plan-Overview.md`** containing:

-   Phase index table: number, file, one-line scope, priority
    (P1 = irreducible core → P3 = observability/shipping), depends-on,
    mapping to the product roadmap (08)
-   Rationale for the priority cut (P1 = the product's primary
    workflow end-to-end; P2 = what makes it decision-grade; P3 =
    measurable + shippable)
-   Working agreements: specs are authoritative (changes go through
    docs first); checklist discipline; tracking via PROJECT_STATE/
    CHANGELOG; a **Definition of Done** for every deliverable
    (implements its cited requirements with server-side guards, emits
    its events/activities transactionally, covered by its spec's
    verification, runs in the dev environment)
-   **Out of Plan** list — everything the Master PRD defers, stated as
    "do not build"

**One file per phase** (typically 6–9 phases). Derive the sequence
from the roadmap dependency graph; the canonical shape:

1.  Foundation — scaffold, dev environment, database migration, auth,
    RBAC, event/audit plumbing, frontend shell (always P1, always
    first)
2.  Organization/administration — users, org entities, assignments
3.  Core domain module(s) — the "what are we managing" layer
4.  Primary workflow — the product's main loop end-to-end + its jobs
    (always P1; the MVP is meaningless without it)
5.  Delivery channels (email/integrations)
6.  Intelligence/AI (against a stub provider first)
7.  Analytics/reporting
8.  Hardening & deployment — full acceptance-criteria sweep,
    performance budgets, production packaging, bootstrap rehearsal
    (always last)

Each phase file:

-   Header: goal (one paragraph), priority, depends-on, the spec
    sections it implements
-   **Deliverables as checkboxes**, grouped (backend / worker /
    frontend), each citing its requirement IDs
-   **Cross-phase seams made explicit**: if a guard or view needs data
    from a later phase, ship it as a stub now and name the phase that
    wires it (never silently defer)
-   **Exit criteria**: numbered, verifiable, mapped to PRD acceptance
    scenarios — a phase is done when these pass, not when the boxes
    are ticked

## Wire it into CLAUDE.md

Add/replace the project CLAUDE.md **Implementation Guide** section:
trigger condition; "no decisions remain open — do not invent behavior;
if a spec doesn't answer, stop and update the spec first"; the phase
list with the rule that a phase starts only when the previous exit
criteria pass; a "which spec answers what" map; the non-negotiables
(server-side transactional guards, transactional event emission,
immutable tables, AI isolation, no dev bypasses, the do-not-build
list). Generate the CLAUDE.md itself with the `generate-claude-md`
skill (it reuses everything above as interview input).

## Validation & bookkeeping

Cross-check every requirement ID cited in planning files against the
PRDs (same comm/grep as the engineering phase). Update PROJECT_STATE
(current milestone = Dev Phase 1), CHANGELOG, README (add the planning
section), ROADMAP (documentation ✅, implementation 🚧 Next).

## Done when

Overview + all phase files exist with clean ID cross-checks, CLAUDE.md
guides a fresh session from zero to "start Phase 1", and the state
files agree. The documentation pipeline is complete — implementation
begins.
