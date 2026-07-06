---
name: primer
description: Generate the agent-context / instructions file that briefs an AI coding assistant on a project. Works for ANY project type and stack (web app, service, CLI, library, mobile, data pipeline, …) — it interviews for the project's real conventions and offers an opinionated house profile (containerized full-stack web app: section skeleton, root-compose layout, Clean-Architecture backend, test discipline, no-hard-coded-secrets with .env.example) as a recommended DEFAULT the user confirms, adapts, or replaces — never forced. Tool-agnostic: asks which agentic coding tool the user uses and writes the right file — CLAUDE.md (Claude Code), AGENTS.md (Codex/Cursor/generic), GEMINI.md (Gemini CLI), .github/copilot-instructions.md (Copilot), or a custom name. Use when the user asks to generate/create/bootstrap an agent context file, CLAUDE.md, AGENTS.md, or "AI instructions" for a project. MUST interview the user before writing anything — never generate from assumptions.
---

# Primer — brief an AI coding assistant (any project, house-style default)

You are generating the **agent-context file** that gets an AI coding
assistant up to speed on a project. You know nothing about that project
yet; the user does. This skill has three hard phases in strict order:

0. **Pick the target** — find out which agentic coding tool(s) the user
   uses, so you write the correctly-named file (`CLAUDE.md`,
   `AGENTS.md`, …). If they use none, there may be nothing to generate.
1. **Grill the user** (interview) — collect the project facts.
2. **Generate** the file(s) from the house template below, filled with
   those facts.

Never skip Phases 0 or 1. Never invent domain facts, business rules,
user roles, or stack choices the user did not state — if something is
unknown after the interview, write it as an explicit `TBD` line in the
generated file, do not guess.

------------------------------------------------------------------------

## Phase 0 — Pick the target file(s)

Ask (AskUserQuestion) before anything else: **"Do you use an agentic
coding assistant, and which one(s)?"** Map the answer to filename(s):

| Tool | File written (at project root unless noted) |
|---|---|
| Claude Code | `CLAUDE.md` |
| Codex | `AGENTS.md` |
| Cursor | `AGENTS.md` |
| Gemini CLI | `GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Other / unsure | `AGENTS.md` (the emerging cross-tool standard), or a custom name the user gives |

Rules for this phase:

-   **No agentic tool** → do not generate a file. Tell the user the
    `docs/` set already documents the project and this skill can be
    re-run anytime they adopt a tool. Stop here unless they still want a
    generic `AGENTS.md` (then proceed treating the target as `AGENTS.md`).
-   **One tool** → that single file is the target.
-   **Multiple tools** → write ONE canonical file with the full content
    (prefer `AGENTS.md` if any non-Claude tool is in the set, else
    `CLAUDE.md`), and for each other tool a **thin pointer file** whose
    entire body is e.g. `> See [AGENTS.md](./AGENTS.md) — single source
    of truth for agent instructions.` This prevents the files from
    drifting apart. (`.github/copilot-instructions.md` may hold either
    the full content or the pointer.)

Throughout the rest of this skill, **"the primer file" means whichever
target(s) Phase 0 resolved** — everywhere the template says `CLAUDE.md`,
substitute the actual filename.

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

**Round 2 — Project type, stack & architecture**
1. What KIND of project is it? (web app, backend service/API, CLI tool,
   library/SDK, mobile app, desktop app, data/ML pipeline, infra/IaC,
   monorepo of several — this decides which sections and conventions
   even apply; do not assume a full-stack web app)
2. Language(s) & stack per relevant tier? Offer the house default only
   when it fits the project type, and always let the user replace it:
   *frontend* (default React + Vite + Tailwind + shadcn/ui + TanStack
   Query + Zustand + RHF + Zod — only if it has a UI); *backend*
   (default Node/Express + PostgreSQL + JWT/refresh + Argon2id + RBAC +
   worker — only if it has a server); or whatever the project actually
   uses (Python, Go, Rust, Java, …).
3. Architecture style / deviations? (monolith vs services, API style,
   event needs, AI involvement and its guardrails — as applicable)
4. Tooling & conventions the project already follows or wants:
   containerized or run on host? test discipline (TDD / tests-after /
   none)? datastore kind (relational / document / none)? secrets
   handling? — used to fill the Engineering Conventions section with
   the project's REAL rules, not an assumed house profile.
5. What documentation already exists or is planned? (PRDs, specs,
   or greenfield — determines the Documentation Status and Rules
   sections)

**Round 3 — only if gaps remain** (e.g. AI guardrails, integrations,
naming rules, glossary terms, out-of-scope list). Skip if Rounds 1–2
answered everything.

Confirm your understanding in one short summary paragraph before
generating. If the user corrects it, incorporate and proceed — do not
re-interview settled points.

------------------------------------------------------------------------

## Phase 2 — Generate the primer file

Write **the primer file resolved in Phase 0** (`CLAUDE.md` / `AGENTS.md`
/ `GEMINI.md` / …) at the target project root with EXACTLY this section
skeleton, in this order (omit a section only if genuinely inapplicable
and say so in a comment; `---` separators between sections). If Phase 0
resolved multiple tools, write the full skeleton once into the canonical
file and a one-line pointer into each other tool's file:

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
13. **Working Rules for the AI agent** — adapt from the house list: read
    state files first; don't redefine terminology; reference decisions
    before changing them; docs are authoritative — update the spec
    before the code; record decisions in a CHANGELOG. (Title this
    section for the actual tool if you like, e.g. "Working Rules for
    Claude" in a `CLAUDE.md`.)
14. **Engineering Conventions** — the project's real build/test/deploy
    rules. Start from the recommended default profile below, but keep
    only the rules that fit this project type and swap in whatever the
    interview surfaced (see that section for how to adapt)
15. **Implementation Guide** — trigger condition + where the plan
    lives + "which doc answers what" map (or a note that planning
    docs come later, for greenfield)
16. **Folder Structure** — the actual project layout; use the
    recommended shape below only if it fits, otherwise document the
    project's real tree

## Engineering Conventions (recommended default profile — confirm, adapt, or replace)

The profile below is a strong, opinionated default for a **containerized
full-stack web application**. It is NOT mandatory and NOT universal.
Apply it like this:

1.  **Keep only what fits the project type from Round 2.** A CLI, a
    library, a mobile app, a pure data pipeline, or a serverless
    function will drop or rewrite most of these (no Docker service
    topology, no frontend rules, maybe no database).
2.  **Prefer the project's real conventions.** Whatever the interview
    surfaced (language, test discipline, run model, datastore) wins over
    the default — transcribe the user's actual rules; offer a default
    only where they had no opinion, and let them replace it.
3.  **Generalize the principle, not the tooling.** Each rule below has a
    stack-neutral intent (reproducible builds, no hard-coded secrets,
    separation of concerns, tests as a gate, managed schema changes) —
    carry the intent into whatever stack the project uses; don't force
    the specific tool names.
4.  Whatever the project settles on, write it down as concrete,
    enforceable rules — a vague convention is worse than none.

Only the group **"Secrets & configuration"** is close to universal;
treat the rest as opt-in per project type.

-   **Build & run (default: containerization)**: everything runs in
    Docker (no host runtimes) — build, test, lint, migrations, and app
    processes execute **inside containers** (e.g. `docker compose …
    run/exec`), never as raw host commands; infrastructure in its own
    root `docker-infra.yml` (databases, queues — stock images); two
    container levels per service (`Dockerfile.dev` with bind-mounts +
    hot reload, and a multi-stage slim non-root `Dockerfile`); dev/prod
    compose diverge only in transports/seed/TLS/reload, never in guards/
    migrations/schema; images versioned by git SHA, `latest` never
    deployed. *Adapt:* for non-containerized projects, replace with the
    project's real build/run model (e.g. `uv`/`cargo`/`go build`, a
    lockfile + pinned toolchain) — keep the intent: **reproducible,
    pinned, one documented way to build and run.**
-   **Secrets & configuration** (near-universal): no hard-coded secrets
    anywhere; all secrets from a gitignored `.env` (or the platform's
    secret store), mirrored in a committed `.env.example` with
    placeholders + one-line comments; env is for secrets/deployment
    concerns only — runtime app/org settings belong in the datastore or
    config service; secrets never in logs, errors, or API responses.
-   **Code architecture (default: Clean / domain-oriented)** — only if
    the project has meaningful business logic: dependencies point
    **inward** (adapters → services/use-cases → domain; the domain
    imports nothing outward); business logic is independent of the
    framework and the DB driver/ORM; boundaries are lint-enforced.
    *Adapt:* small tools/libraries may use a flatter structure — capture
    whatever separation-of-concerns rule the project actually holds.
-   **Code quality**: the language's strict/type settings on (e.g.
    TypeScript strict, `mypy --strict`, `-Wall -Werror`, clippy);
    shared validation schemas between boundaries where applicable;
    modules/features don't import each other's internals. **Test
    discipline per the interview** — if the project chose TDD, state it
    as mandatory (failing test first, red→green→refactor, spec test
    plans transcribed before coding); otherwise state the actual policy
    (tests-after with a coverage bar, etc.). *If it has a frontend:*
    shared components before new ones — check the shared library first,
    extend/compose, promote generic components up, never duplicate.
-   **Frontend design** — only if the project has a UI and the user uses
    the design skill: run the design skill (`/design-taste-frontend`)
    before building or restyling a screen.
-   **Data & schema** — only if the project has a managed datastore: the
    schema/migration is code you run, not a suggestion; numbered
    forward-only migrations reflected back into the schema doc;
    destructive changes require a spec revision first; constraints and
    least-privilege roles applied in every environment including dev.

## Folder Structure (recommended shape — use only if it fits, else document the real tree)

The tree below suits a containerized web-app monorepo. For any other
project type, **document the project's actual layout instead** — a
Python package (`src/`, `pyproject.toml`), a Go module (`cmd/`,
`internal/`), a library, or a mobile app all have their own conventional
shapes; use those.

```
- CLAUDE.md / AGENTS.md      # the primer file (name per the tool from Phase 0)
- docs/                      # all documentation
- frontend/                  # .env/.env.example, Dockerfile, Dockerfile.dev  (if it has a UI)
- backend/                   # .env/.env.example, Dockerfile, Dockerfile.dev  (if it has a server)
- infra/                     # infra config only (init SQL, proxy conf) — stock images, no Dockerfiles
- docker-infra.yml           # infrastructure services (dev extras under a `dev` profile)
- docker-compose.yml         # production app stack → Dockerfile targets
- docker-compose.dev.yml     # dev app stack, hot reload → Dockerfile.dev; includes docker-infra.yml
- README.md
```

When this shape applies, compose files live at the **repository root** —
the single orchestration point; per-service folders hold Dockerfiles and
env files, never compose files.

## Final checks before writing

-   Every fact in the generated file came from the interview or is
    marked `TBD` — zero invented domain content.
-   Tech Rules and Folder Structure present, complete, not weakened.
-   Terminology consistent throughout (one name per concept — define
    naming rules if the user gave them).
-   File paths in Rules / Repository Layout point at files that will
    actually exist.
-   The primer file is named for the tool chosen in Phase 0; any
    additional tools got a pointer file, not a duplicated copy.
-   Show the user a 5-line summary of what was generated and where.
