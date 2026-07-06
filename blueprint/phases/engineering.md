# Phase 4 — Engineering Specifications (docs/engineering/20–25)

> Extension of `blueprint`. Read and follow this file when the
> orchestrator reaches the engineering phase. Derives mechanically from
> the PRDs; asks the user only for genuine engineering choices;
> validates executable artifacts.

Requires fully-decided PRDs. These documents **derive** from the PRDs
— if you hit an undecided product question, STOP and send it back
through the PRD process (Master PRD amendment) before continuing.
Interview the user only for genuine engineering-level choices (e.g.
email transport mechanism, deployment target) — present options with a
recommendation.

**Adapt the doc set to the project type (this catalogue is the
web-app-with-relational-DB default).** Produce only the specs that
apply, and translate each to the project's real stack:

-   **20-ERD / 21-Database-Schema** — only if the project has a managed
    datastore. Relational → ERD + DDL as below; a document/KV store →
    document the collections, keys, and invariants in the store's own
    terms; no persistent store (CLI, stateless service, library) → skip
    both.
-   **22-REST-API** — retitle to the actual interface: **22-API** for
    gRPC/GraphQL, **22-CLI-Interface** for a command-line tool,
    **22-Public-API** for a library's exported surface. Keep the intent
    (every operation, its inputs, its errors, its requirement refs).
-   **23-Frontend-Specification** — only if it has a UI; otherwise skip.
-   **24-Backend-Specification** — retitle to **24-Core-Specification**
    for a non-HTTP service, CLI, or library; keep the module/layering,
    guard-placement, and verification content, drop web-only pieces
    (request pipeline, outbox) that don't apply.
-   **25-Deployment-Guide** — match the real delivery model: container
    topology (below), a serverless deploy, a published package
    (registry + versioning + release process), or an app-store build.

Renumber nothing — keep 20–25 for the slots that exist, and note any
skipped doc in 20 (or the umbrella) so the omission is explicit. The
per-doc detail below is the default profile; carry its *intent* into
whatever stack the project chose.

Every requirement ID cited in these specs must exist in the PRDs —
run the cross-check grep after each document:

```
comm -13 <(cat docs/prd/*.md | grep -oE '<ID-REGEX>' | sort -u) \
         <(grep -oE '<ID-REGEX>' <spec>.md | sort -u)
```

## 20-ERD

Relational model: engineering conventions table (PK strategy, naming,
timestamps, enum policy, deletion policy = lifecycle statuses not
soft-deletes, immutability strategy, week/time identification); entity
overview by owning module (mirror 09.F exactly); mermaid `erDiagram`;
entity notes for **non-obvious choices only**, each justified by a
requirement ID; a "referential-integrity rules enforced in schema"
table (PRD rule → mechanism) and an explicit list of what is
service-layer instead (state machines, cross-module guards,
permissions).

## 21-Database-Schema

Complete DDL implementing 20, ordered to run top-to-bottom: enum
types (from the controlled vocabularies — cite requirement IDs in
comments), tables per module with CHECK constraints for every PRD
invariant, partial indexes for hot paths, immutability triggers
(append-only tables + column-level guards for content-immutable
rows), worker-infrastructure tables (outbox, job ledger, email queue)
if 24 needs them.

**MANDATORY when there is a schema: validate it against a real
instance** of the chosen engine (a throwaway Docker container or
equivalent): for SQL, extract the DDL, run with `ON_ERROR_STOP`, count
tables, smoke-test 2–3 key guards (an immutability trigger, a CHECK
constraint), tear down; for a non-SQL store, apply the schema/validators
to a throwaway instance and assert a couple of the invariants. A schema
doc that hasn't been executed against a real engine is not done.
Re-validate after every later amendment.

## 22-REST-API

Conventions first: base path/versioning (09.G), auth, response/error
envelope, HTTP-status table (including 409 = business-guard
violation), pagination. Then per-module endpoint tables (method, path,
roles, behavior with requirement refs). Rules: **state transitions are
POST actions, never PATCH status**; a **guard-code registry** section
mapping every 409 `code` → PRD rule → endpoints; cross-cutting
behavior section (transactional event emission, AI isolation, async
202 pattern, performance budgets).

## 23-Frontend-Specification

Stack (from 09.A); feature-folder structure mirroring 09.C with a
no-cross-feature-internals rule; **route × role matrix** (every route,
R/RW/— per role, role landing redirects); state-management rules
(restate the 09.I locked rule operationally: query keys, invalidation,
optimistic-update policy — never optimistic on guarded actions); API
layer + **guard-code → UI mapping** (409s become actionable dialogs);
screens per feature with requirement anchors; cross-cutting UI rules
(action-first, three-click, read-only rendering, accessibility of
status colors, AI labeling, performance budgets); verification plan
(route-permission tests, guard-dialog tests, glossary lint in CI).

## 24-Backend-Specification

Process model (api + worker from one codebase); module layout with
lint-enforced layering (controllers → services → repositories;
cross-module via exported interfaces only); request pipeline
(authenticate → status gate → authorize from a single policy table
transcribing the master permission matrix); **transactional outbox**
(business write + activity + outbox in one transaction; at-least-once
idempotent consumers); guard placement table (which service owns which
guard, row-locked inside the mutation transaction); notification
matrix engine; **scheduled-jobs table** (job, schedule in org
timezone, behavior, all idempotent via the job ledger); external
integration flows in full (e.g. email: connection, send pipeline,
retry/backoff, failure handling — never leave an integration as a
one-liner); AI pipeline + isolation (restricted DB role) if
applicable; security parameters; verification plan.

## 25-Deployment-Guide

Topology (recommend Docker Compose single host for a modular-monolith
MVP; images orchestrator-agnostic); image table (multi-stage, non-root,
SHA-versioned, never `latest`); environment-variable table (secrets
only — runtime org config belongs in the database); migrations
(one-shot container, forward-only, boot-time version check);
least-privilege DB roles; backup/PITR/restore-drill policy sized to
what the PRDs declare precious; TLS/proxy/runtime policies;
health/monitoring/alerts table; deploy + rollback procedure; first-
install bootstrap (including the seed-admin exception); **Development
Guide section**: docker-compose.dev with hot reload (watcher backend,
HMR frontend, bind mounts), dev provider substitutions through the
same interfaces (mail catcher, AI stub), committed dev env file, seed
command, manual job triggering, and dev/prod parity rules (no guard
bypasses).

## Bookkeeping & done

After each doc: cross-check grep, PROJECT_STATE, CHANGELOG (record
engineering decisions like transport choices individually), ROADMAP/
README markers. Done when every applicable spec in the 20–25 range
exists (skipped ones noted), any schema has passed live validation
against a real engine, all reference greps are clean, and PROJECT_STATE
points at planning (`phases/planning.md`).
