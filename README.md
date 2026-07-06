# Fundamentum — Documentation-First Project Initialization Skills

> A Claude Code skill suite that builds a complete, fully-decided
> documentation set for a software project — **before any code is
> written** for a greenfield build, or **retro-fitted onto an existing
> codebase** — then plans the implementation.

------------------------------------------------------------------------

## What it does

You start with an idea. The skills interview you — they never invent
product facts — and produce, in order:

```
docs/
├── foundation/    00–08  vision, principles, glossary, domain model,
│                         org model, IA, user journeys, AI strategy,
│                         MVP roadmap
├── architecture/  09.x   solution architecture, ADRs, module/data/
│                         permission/state boundaries, stack decision
├── prd/           10–16  Master PRD (cross-cutting requirements,
│                         permission & notification matrices, metric
│                         formulas, event catalog) + one fully-decided
│                         Feature PRD per module — zero open questions
├── engineering/   20–25  ERD, database schema (validated against a
│                         real database), REST API with guard-code
│                         registry, frontend & backend specs,
│                         deployment + dev-environment guide
└── planning/             priority-ordered dev phases with checkbox
                          deliverables and verifiable exit criteria
```

…plus the four state files (README, PROJECT_STATE, ROADMAP, CHANGELOG) and, at the end, an
agent-context file (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, … — whichever your coding tool reads)
so any future session can implement the project without re-deriving anything.

## The method (what makes it different)

1. **Grill first** — every phase starts by interviewing the user;
   gaps found in earlier docs become questions, never assumptions.
2. **Fully-decided rule** — Feature PRDs and engineering specs ship
   with no "Open Questions"/"TBD"; the Master PRD's deferred registry
   is the single sanctioned backlog for future questions.
3. **Validate, don't just write** — any schema runs against a throwaway
   database instance; requirement references are machine-checked across
   every document.
4. **Bookkeeping discipline** — PROJECT_STATE/CHANGELOG/ROADMAP are
   updated after every major document, so any session can resume.
5. **Stack-agnostic** — the method fits any project type (web app,
   service, CLI, library, mobile, data pipeline). The suite's
   containerized-web-app conventions (Docker, Node/Express + Postgres,
   React) are offered as a **recommended default profile** each skill
   lets you confirm, adapt, or replace — never a hard requirement.
   Stack-specific docs (frontend spec, DDL, deployment) are produced
   only when they apply.

## Skill inventory

Three skills — two orchestrators (new vs existing project) plus the
standalone agent-context (primer) generator:

| Skill | Role | Invoke when |
|---|---|---|
| `blueprint` | **Greenfield orchestrator** — scaffolds `docs/` and drives all five phases (foundation → architecture → prd → engineering → planning), deciding everything by interview | Starting a brand-new project documentation-first, or asking for any single phase |
| `excavate` | **Brownfield orchestrator** — surveys the real code + DB, then drives a reduced pipeline (foundation → prd → data/API → planning) that documents what's already built and plans the gap | Documenting / reverse-engineering an existing codebase |
| `primer` | Standalone: generate the house-style agent-context file for any project — asks which agentic tool the user uses and writes the right file (`CLAUDE.md` / `AGENTS.md` / `GEMINI.md` / …) | Anytime; also each pipeline's final step |

The phases are **not** separate skills — each orchestrator bundles them
as instruction files under its own `phases/`, read one at a time:

```
blueprint/  (greenfield)              excavate/  (existing codebase)
├── SKILL.md   scaffold + drive       ├── SKILL.md   survey code, then drive
└── phases/                           └── phases/
    ├── foundation.md   00–08             ├── foundation.md   00–08  (derived + intent)
    ├── architecture.md 09.x              ├── prd.md          10–16  (as-built PRDs)
    ├── prd.md          10–16             ├── engineering.md  20–22  (introspected
    ├── engineering.md  20–25             │                          ERD/schema/API)
    └── planning.md     dev phases        └── planning.md     remaining-work plan
```

The existing-project pipeline deliberately **skips architecture (09.x)
and the backend/frontend build-specs + deploy guide (23–25)** — for a
codebase that already exists, the code is the authority for those. Its
method flips too: **code is the source of truth**, and the user is
interviewed only for product intent the code can't reveal (vision,
non-goals, rationale, canonical names).

In both, the pipeline order is enforced by each phase file's stated
prerequisites and "Done when" gate, not by hidden state — so you can
jump straight to one phase, provided its inputs already exist.

## Installation

### One command (recommended)

Run the installer with `npx` — it asks whether to install **globally**
(every project) or into the **current project**, then copies the skills
into the right `.claude/skills/` directory:

```
npx fundamentum            # install all skills, prompts global vs project
npx fundamentum add primer # install just one skill
npx fundamentum --global   # skip the prompt: install for every project
npx fundamentum --project  # skip the prompt: install into ./.claude/skills
npx fundamentum list       # show bundled skills
```

Not yet on npm? Run it straight from the repo:

```
npx github:<owner>/fundamentum        # from GitHub
node bin/cli.mjs --project            # from a local checkout
```

Restart Claude Code (or start a new session) after installing so it
picks the skills up.

### Manual (no Node)

Copy the skill folders (`blueprint/`, `excavate/`, `primer/`) into
`~/.claude/skills/` (global) or `<repo>/.claude/skills/` (project).

### Publishing your own copy

The package is a plain npm package: set a unique `name` in
`package.json` (e.g. a scoped `@you/fundamentum`), then `npm publish`.
Whatever you name it becomes the `npx <name>` command. `files` in
`package.json` already ships only the CLI + skill folders + README.

Then, in Claude Code:

```
"Initialize this new project documentation-first"  → blueprint
"Document this existing codebase"                   → excavate
"Generate the agent-context file for this project"  → primer
```
