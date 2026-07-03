---
name: generate-claude-md
description: Generate a CLAUDE.md for a NEW project following our house conventions (section skeleton, Tech Rules, root-compose folder structure, TDD-first backend, shared-components-first frontend). Use when the user asks to generate/create/bootstrap a CLAUDE.md or "AI context file" for a project. MUST interview the user about the project before writing anything — never generate from assumptions.
---

# Generate CLAUDE.md (house style)

You are generating the AI-context file for a **new project the user is
starting**. You know nothing about that project yet; the user does.
Therefore this skill has two hard phases in strict order:

1. **Grill the user** (interview) — collect the project facts.
2. **Generate** the CLAUDE.md from the house template below, filled
   with those facts.

Never skip Phase 1. Never invent domain facts, business rules, user
roles, or stack choices the user did not state — if something is
unknown after the interview, write it as an explicit `TBD` line in the
generated file, do not guess.

------------------------------------------------------------------------

## Phase 1 — Grill the user

Use the AskUserQuestion tool (max 4 questions per call, multiple
rounds). Provide concrete options with a recommended default where
sensible; always let the user type their own answer. Cover ALL of the
following areas — batch them into 2–3 rounds:

**Round 1 — Identity & domain**
1. What is the project? (one-sentence purpose; what it is NOT, if that
   matters — e.g. "an execution platform, not a PM tool")
2. Who are the users/personas and their roles? (names + one-line
   responsibility each)
3. What are the core domain entities and their hierarchy? (e.g.
   Organization → Team → Member; the 5–10 nouns the product lives on)
4. What business rules are already locked/non-negotiable?

**Round 2 — Stack & architecture**
1. Frontend stack? (recommend: React + Vite + Tailwind + shadcn/ui +
   TanStack Query + Zustand + RHF + Zod, feature-based — our default)
2. Backend stack? (recommend: Node/Express modular monolith +
   PostgreSQL + JWT/refresh + Argon2id + RBAC + background worker —
   our default)
3. Architecture style / deviations? (monolith vs services, API style,
   event needs, AI involvement and its guardrails)
4. What documentation already exists or is planned? (PRDs, specs,
   or greenfield — determines the Documentation Status and Rules
   sections)

**Round 3 — only if gaps remain** (e.g. AI guardrails, integrations,
naming rules, glossary terms, out-of-scope list). Skip if Rounds 1–2
answered everything.

Confirm your understanding in one short summary paragraph before
generating. If the user corrects it, incorporate and proceed — do not
re-interview settled points.

------------------------------------------------------------------------

## Phase 2 — Generate CLAUDE.md

Write `CLAUDE.md` at the target project root with EXACTLY this section
skeleton, in this order (omit a section only if genuinely inapplicable
and say so in a comment; `---` separators between sections):

1.  **Header blockquote** — project name + current status + where the
    live status lives (e.g. `./docs/PROJECT_STATE.md`)
2.  **Purpose** — what the project is and explicitly is not
3.  **Rules** — ordered "read this first" file list (state files with
    paths)
4.  **Product Vision** — capabilities + primary users
5.  **Core Philosophy** — the 3–5 principles the user gave
6.  **Core Domain** — entity hierarchy from the interview
7.  **Locked Business Rules** — verbatim from the interview
8.  **AI Strategy** — only if the project has AI; must include the
    guardrail pattern: AI recommends/humans decide, AI never writes
    business data, AI isolation
9.  **Architecture Decisions** — stack lists (frontend / backend /
    architecture) from the interview
10. **Module Boundaries** — if known
11. **Repository Layout** — actual planned tree with paths
12. **Documentation Status** — completed vs next
13. **Working Rules for Claude** — adapt from the house list: read
    state files first; don't redefine terminology; reference decisions
    before changing them; docs are authoritative — update the spec
    before the code; record decisions in a CHANGELOG
14. **Tech Rules** — the house rules below, MANDATORY
15. **Implementation Guide** — trigger condition + where the plan
    lives + "which doc answers what" map (or a note that planning
    docs come later, for greenfield)
16. **Folder Structure** — the house structure below, adapted to the
    stack

## Tech Rules (mandatory content — adapt names, never weaken)

Embed all five groups, renumbered cleanly:

-   **Containerization**: everything runs in Docker (no host
    runtimes); infrastructure in its own root `docker-infra.yml`
    (databases, mail catcher, queues — stock images); TWO container
    levels per service, both always present — `Dockerfile.dev`
    (source bind-mounts + hot reload: watcher for backend, HMR dev
    server for frontend, node_modules in container volumes) and
    `Dockerfile` (multi-stage production build, slim, non-root, no
    dev deps); dev and prod compose may diverge only in transports/
    seed/TLS/reload — never in guards, migrations, or schema; images
    versioned by git SHA, `latest` never deployed; migrations as a
    one-shot container before app start.
-   **Secrets & configuration**: no hard-coded secrets anywhere (code,
    Dockerfiles, compose); all secrets from gitignored `.env`,
    mirrored in committed `.env.example` with placeholders + one-line
    comments; env is for secrets/deployment concerns only — runtime
    org settings belong in the database behind an admin UI; secrets
    never in logs, errors, or API responses.
-   **Code quality**: TypeScript strict both sides; shared validation
    schemas (Zod) between API and forms; layering linted (controllers
    → services → repositories; cross-module access only via exported
    module interfaces; frontend features never import each other's
    internals); **backend TDD is mandatory** — failing test first,
    red → green → refactor, no service/guard/state machine/job lands
    without tests written before it, and existing acceptance
    criteria/spec test plans are transcribed into tests before coding;
    **frontend: shared components before new ones** — check the
    shared component library and feature exports first, extend or
    compose, create new only when nothing fits, promote generic
    components to the shared library, never duplicate for styling
    or copy.
-   **Frontend design**: design frontend implementation using the
    design-taste skill (`/design-taste-frontend`) before building or
    restyling any screen.
-   **Database**: the schema doc/migration is code you run, not a
    suggestion; numbered forward-only migrations reflected back into
    the schema doc; destructive changes require a spec revision
    first; DB constraints/triggers and least-privilege roles applied
    in every environment including dev.

## Folder Structure (mandatory shape — adapt service names)

```
- CLAUDE.md
- docs/                      # all documentation
- frontend/                  # .env/.env.example, Dockerfile, Dockerfile.dev
- backend/                   # .env/.env.example, Dockerfile, Dockerfile.dev
- infra/                     # infra config only (init SQL, proxy conf) — stock images, no Dockerfiles
- docker-infra.yml           # infrastructure services (dev extras under a `dev` profile)
- docker-compose.yml         # production app stack → Dockerfile targets
- docker-compose.dev.yml     # dev app stack, hot reload → Dockerfile.dev; includes docker-infra.yml
- README.md
```

Compose files live at the **repository root** — the single
orchestration point. Per-service folders hold Dockerfiles and env
files, never compose files.

## Final checks before writing

-   Every fact in the generated file came from the interview or is
    marked `TBD` — zero invented domain content.
-   Tech Rules and Folder Structure present, complete, not weakened.
-   Terminology consistent throughout (one name per concept — define
    naming rules if the user gave them).
-   File paths in Rules / Repository Layout point at files that will
    actually exist.
-   Show the user a 5-line summary of what was generated and where.
