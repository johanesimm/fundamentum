# Phase 3 — Engineering Reference (docs/engineering/20–22), introspected

> Extension of `excavate`. Read and follow this file when
> the orchestrator reaches the engineering phase. Generate the data +
> API reference FROM the real code and database — do not design.

Requires fully-decided PRDs. This phase produces only the three
**reference** documents that describe the system's data and contract as
it actually is: **20-ERD, 21-Database-Schema, 22-REST-API**. The
backend/frontend build-specs (23/24) and deployment guide (25) are
intentionally skipped — for an existing project the code and its
deploy config are the authority, and re-specifying them adds no value.

Everything here is **introspected, then verified against reality** —
not invented. Every requirement ID cited must already exist in the
PRDs; run the cross-check grep after each document:

```
comm -13 <(cat docs/prd/*.md | grep -oE '<ID-REGEX>' | sort -u) \
         <(grep -oE '<ID-REGEX>' <spec>.md | sort -u)
```

## 20-ERD

Reconstruct the relational model **from the actual migrations / ORM
models / live schema**, not from a redesign. Include: a conventions
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

**MANDATORY: verify the doc against the real database.** Point at the
existing dev/live DB (or spin the migrations up in a throwaway
container), diff the documented schema against the introspected schema,
and reconcile until they match — table/column/constraint for table/
column/constraint. A schema doc that doesn't match the running database
is not done. Record any migration-vs-database drift you find as a Known
Discrepancy (do not silently "fix" it in the doc).

## 22-REST-API

The **actual API contract**, read from the route definitions. Start
with conventions the code already uses (base path/versioning, auth,
response/error envelope, status codes — including how business-rule
violations are signalled today, e.g. 409 vs 400). Then per-module
endpoint tables (method, path, roles, behavior) generated from the real
routes, each row referencing the PRD requirement it satisfies. Include
a guard-code / error-code registry **if the code has one** (map each
code → PRD rule → endpoints); if error signalling is inconsistent,
document it as-is and flag it. Note the cross-cutting behaviors that
actually exist (event emission, async patterns, pagination).

Endpoints with no corresponding PRD requirement, and PRD requirements
with no endpoint, both get listed explicitly — that gap list feeds the
planning phase.

## Bookkeeping & done

After each doc: cross-check grep, PROJECT_STATE, CHANGELOG (record
notable discrepancies found), ROADMAP/README markers. Done when 20–22
exist, the schema doc has been verified against the real database, the
API doc matches the real routes, all reference greps are clean, every
code-vs-doc discrepancy is recorded, and PROJECT_STATE points at
planning (`phases/planning.md`).
