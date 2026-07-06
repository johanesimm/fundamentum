# Phase 1 — Product Foundation (docs/foundation/00–08)

> Extension of `blueprint`. Read and follow this file when the
> orchestrator reaches the foundation phase. Interview-driven — never
> invents product facts.

Produce nine documents in dependency order. Each is written only after
its interview round; **every product fact comes from the user**.
Recommended defaults are allowed for structure, never for domain
content.

## Documents & what to grill for each

Work strictly in order — later docs consume earlier ones:

1.  **00-Product-Vision** — vision/mission; the 2–3 questions the
    product answers; product philosophy principles; personas (+ future
    personas); core capability domains; MVP in/out-of-scope lists;
    success criteria; explicit non-goals ("the product is NOT…").
    *Grill:* purpose, who suffers today and how, what stays manual,
    what is explicitly refused.
2.  **01-Product-Principles** — ~10 stable product principles + UX and
    engineering principle lists; note that principles change only via
    explicit product decisions. *Grill:* trade-off stances (e.g.
    standardization vs flexibility, simplicity vs power); at least one
    quantified UX target if possible.
3.  **02-Product-Glossary** — THE authoritative terminology table;
    controlled vocabularies (statuses, categories) enumerated in full;
    naming rules ("use X never Y"); governance line (changes require a
    product decision). *Grill:* every ambiguous noun surfaced in 00;
    exact status lists.
4.  **03-Domain-Model** — entity tree, per-entity rules, relationship
    table with cardinalities, business rules, design rationale, and an
    honest **Open Questions** section (allowed here — foundation docs
    may carry open questions; they get resolved in the PRDs).
    *Grill:* containment chains, what is immutable, lifecycle
    endpoints (can X be reopened?).
5.  **04-Organization-Model** — org hierarchy vs work assignment
    (keep them independent unless the user says otherwise), role
    responsibilities with Can/Cannot lists, coarse permission scopes.
    *Grill:* who approves what; one-or-many leads; matrix org needs.
6.  **05-Information-Architecture** — global navigation tree, module
    definitions, per-role default landing + primary navigation,
    navigation rules (hidden modules not rendered), MVP vs future
    navigation, design principles (three-click rule, action-first).
    *Grill:* what each role sees first thing in the morning.
7.  **06-User-Journeys** — one end-to-end journey per persona (use
    the product's natural cadence, e.g. weekly Monday/Friday), AI
    touchpoints table if AI exists, notifications-per-role list,
    exception flows, success criteria. *Grill:* the unhappy paths
    (rejection, escalation, completion).
8.  **07-AI-Strategy** — only if the product has AI: capabilities
    matrix (MVP vs future), context sources, guardrails (recommends-
    only, no business writes, human approval model), what is
    deliberately deferred to engineering. *Grill:* what AI must never
    do.
9.  **08-MVP-Roadmap** — capability phases (not dates), per-phase
    deliverables + exit criteria, MoSCoW prioritization, dependency
    graph, MVP success criteria, risk table, and a closing "Transition
    to Master PRD" section. *Grill:* the smallest release that would
    actually be used; what can wait.

## Conventions (mandatory)

-   Header blockquote (`Document ID`, `Status: Draft v0.1`,
    `Depends On`), Documentation Roadmap status table, `---`
    separators.
-   Glossary discipline from doc 02 onward: one name per concept,
    everywhere.
-   After EACH document: update PROJECT_STATE.md (milestone),
    CHANGELOG.md, ROADMAP/README status markers.

## Done when

All nine exist, cross-reference cleanly (no term used that 02 doesn't
define; no feature in 08 absent from 00's scope), open questions are
consolidated in 03/04, and PROJECT_STATE points at the architecture
phase (`phases/architecture.md`).
