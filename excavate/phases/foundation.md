# Phase 1 — Product Foundation (docs/foundation/00–08), as-built

> Extension of `excavate`. Read and follow this file when
> the orchestrator reaches the foundation phase. Derive structure from
> the code; interview only for product intent.

Produce nine foundation documents in dependency order. For an existing
codebase, **the domain-shaped docs are read out of the code and merely
confirmed with the user; the intent-shaped docs come from the user.**
Never invent product facts.

## Where each document's content comes from

Split every doc into what the **code already tells you** (write it,
then confirm) vs what only the **user knows** (grill for it):

1.  **00-Product-Vision** — *user:* vision/mission, the questions the
    product answers, philosophy, personas, explicit non-goals ("is
    NOT…"). *Code:* the capability domains actually implemented (list
    them from the modules). *Grill:* purpose, who it's for, what it
    deliberately refuses — none of which is in the code.
2.  **01-Product-Principles** — *user:* the stable product/UX/eng
    principles and trade-off stances. *Code:* infer candidate
    principles from recurring patterns and propose them for
    confirmation; never assert intent from a pattern that may be
    incidental.
3.  **02-Product-Glossary** — THE authoritative terminology table.
    *Code:* enumerate the real nouns, statuses, enum values, and
    role names as they appear in code — the glossary MUST match them.
    *Grill:* where the code is inconsistent (two names for one
    concept), ask the canonical choice and record the alias as a
    known discrepancy.
4.  **03-Domain-Model** — *Code:* entity tree, per-entity fields,
    relationships with cardinalities read from models/migrations;
    render the real structure. *User:* which rules are intended vs
    accidental, what is immutable by design, lifecycle intent. Keep an
    honest **Open Questions / Known Discrepancies** section.
5.  **04-Organization-Model** — *Code:* the roles/permissions actually
    enforced. *User:* the intended org hierarchy vs work assignment,
    role responsibilities (Can/Cannot), who approves what.
6.  **05-Information-Architecture** — *Code:* the real navigation tree,
    modules, and per-role routes/landing pages from the frontend.
    *User:* the design intent (three-click/action-first) and any
    gap between current and desired navigation.
7.  **06-User-Journeys** — *Code:* the flows that actually exist
    (routes + handlers). *User:* the intended end-to-end journey per
    persona, the unhappy paths, and which existing flows are intended.
8.  **07-AI-Strategy** — only if the codebase has AI: *Code:* what the
    AI integration actually does, its inputs, and existing guardrails.
    *User:* what it must never do; intended vs current guardrails.
9.  **08-MVP-Roadmap** — reframed as **current-state + gap**: what is
    already shipped (from the code), what is partial, and what the user
    still wants — a capability map of built vs remaining (this feeds the
    planning phase). *Grill:* which unbuilt capabilities matter next.

## Conventions (mandatory)

-   Header blockquote (`Document ID`, `Status: Draft v0.1`,
    `Depends On`), Documentation Roadmap status table, `---`
    separators.
-   Glossary discipline from doc 02 onward: one name per concept, and
    that name must be the one the code uses (or the recorded canonical
    choice).
-   Any code-vs-intent mismatch goes in a **Known Discrepancies** note,
    never silently resolved.
-   After EACH document: update PROJECT_STATE.md, CHANGELOG.md,
    ROADMAP/README status markers.

## Done when

All nine exist, the domain-shaped docs (02/03/04/05) faithfully match
the code, intent-shaped docs (00/01/06/07) are user-confirmed,
discrepancies are recorded, and PROJECT_STATE points at the PRD phase
(`phases/prd.md`). Architecture (09.x) is intentionally skipped — the
PRDs cite the code and data-ownership directly.
