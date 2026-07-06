# Phase 3 — Engineering Reference (docs/engineering/20–22), introspected

> Extension of `excavate`. Read and follow this file when
> the orchestrator reaches the engineering phase. Generate the data +
> API reference FROM the real code and database — do not design.

Requires fully-decided PRDs. This phase produces up to three
**reference** documents that describe the system's data and contract as
it actually is: **20-ERD, 21-Database-Schema, 22-REST-API**. The
backend/frontend build-specs (23/24) and deployment guide (25) are
intentionally skipped — for an existing project the code and its
deploy config are the authority, and re-specifying them adds no value.

**Produce only the docs the project actually has.** The trio below
assumes a service with a relational database and an HTTP API — the
common case, not a universal one. Adapt:

-   **No datastore** (CLI, stateless service, library) → skip 20 and 21.
-   **Non-relational store** → keep 20/21 but document the real model
    (collections/keys/documents, or the KV/graph shape) in that store's
    terms instead of an ER diagram + DDL.
-   **Non-HTTP interface** → retitle 22 to the real surface
    (**22-CLI-Interface**, **22-Public-API** for a library, **22-API**
    for gRPC/GraphQL) and document that contract as-built.

Note any skipped/retitled doc in 20 (or the umbrella) so the omission is
explicit. Everything here is **introspected, then verified against
reality** — not invented. Every requirement ID cited must already exist
in the PRDs; run the cross-check grep after each document:

```
comm -13 <(cat docs/prd/*.md | grep -oE '<ID-REGEX>' | sort -u) \
         <(grep -oE '<ID-REGEX>' <spec>.md | sort -u)
```

## 20-ERD (or data-model reference)

Reconstruct the data model **from the actual migrations / ORM models /
live schema**, not from a redesign. For a non-relational store, describe
the real collections/documents/keys and their relationships instead of
an ER diagram. Include: a conventions
table describing the patterns the code already follows (PK strategy,
naming, timestamps, enum policy, deletion policy, immutability as
implemented); entity overview by owning module (mirror the code's
module boundaries); a mermaid `erDiagram` matching the real tables and
foreign keys; entity notes for **non-obvious existing choices only**,
each tied to a requirement ID or flagged as an unexplained artifact; a
table of referential-integrity rules the schema actually enforces vs
those enforced in the service layer. Where the model diverges from
what the PRDs describe, record it in **Known Discrepancies**.

## 21-Database-Schema

The **authoritative current schema**, captured from the real database
— not a fresh design. Prefer introspecting the live/dev database
(`pg_dump --schema-only` or the equivalent) and/or consolidating the
migrations, then present the DDL grouped by module with the existing
constraints, indexes, triggers, and enum types, citing requirement IDs
in comments where a constraint enforces a PRD rule.

**MANDATORY when there is a database: verify the doc against the real
store.** Point at the existing dev/live database (or spin the migrations
up in a throwaway instance), diff the documented schema against the
introspected one, and reconcile until they match — field for field. A
schema doc that doesn't match the running store is not done. Record any
migration-vs-store drift you find as a Known Discrepancy (do not
silently "fix" it in the doc).

## 22-REST-API (or the project's real interface)

The **actual contract**, read from the code — route definitions for an
HTTP API, command/flag definitions for a CLI, exported signatures for a
library. Start with conventions the code already uses (for HTTP: base
path/versioning, auth, response/error envelope, status codes — including
how business-rule violations are signalled today, e.g. 409 vs 400).
Then per-module operation tables (method/path/roles/behavior for HTTP,
or command/args/output, or function/params/returns) generated from the
real code, each row referencing the PRD requirement it satisfies. Include
a guard-code / error-code registry **if the code has one** (map each
code → PRD rule → endpoints); if error signalling is inconsistent,
document it as-is and flag it. Note the cross-cutting behaviors that
actually exist (event emission, async patterns, pagination).

Endpoints with no corresponding PRD requirement, and PRD requirements
with no endpoint, both get listed explicitly — that gap list feeds the
planning phase.

## Bookkeeping & done

After each doc: cross-check grep, PROJECT_STATE, CHANGELOG (record
notable discrepancies found), ROADMAP/README markers. Done when every
applicable doc in 20–22 exists (skipped/retitled ones noted), any schema
doc has been verified against the real store, the interface doc matches
the real code, all reference greps are clean, every code-vs-doc
discrepancy is recorded, and PROJECT_STATE points at planning
(`phases/planning.md`).
