# Fundamentum — Documentation-First Project Initialization Skills

> A Claude Code skill suite that builds a complete, fully-decided
> documentation set for a software project — **before any code is
> written** for a greenfield build, or **retro-fitted onto an existing
> codebase** — then plans the implementation.

------------------------------------------------------------------------

## Quick start

```bash
npx @johanesimm/fundamentum
```

That's it — the installer asks whether to install **globally** (every
project) or into the **current project**, copies the skills into the
right `.claude/skills/` folder, and you're done. Restart Claude Code,
then say *"Initialize this project documentation-first"* to kick off
`blueprint`. Full walkthrough in [Installation](#installation) below.

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

### The `npx` installer (recommended)

**Prerequisites:** [Node.js](https://nodejs.org) 18+ (gives you `npx`)
and [Claude Code](https://claude.com/claude-code).

**Step 1 — run the installer.** No global install needed; `npx` fetches
and runs it on the fly:

```bash
npx @johanesimm/fundamentum
```

**Step 2 — choose where the skills go.** You'll be asked:

```
Fundamentum — installing: blueprint, excavate, primer

Where should these skills go?
  1) Global   ~/.claude/skills      (available in every project)
  2) Project  ./.claude/skills      (this repo only)
Choose [1/2]:
```

- **Global** → the skills work in *every* project on your machine.
- **Project** → installed only into the repo you're currently in
  (`./.claude/skills/`); commit them to share with your team.

**Step 3 — done.** It copies the folders and confirms:

```
  ✓ blueprint → ~/.claude/skills/blueprint
  ✓ excavate  → ~/.claude/skills/excavate
  ✓ primer    → ~/.claude/skills/primer

Done. Installed 3 skill(s) into the global directory.
Restart Claude Code (or start a new session) to pick them up.
```

**Step 4 — use them.** Restart Claude Code, then just ask:

| Say this | Runs |
|---|---|
| "Initialize this new project documentation-first" | `blueprint` |
| "Document this existing codebase" | `excavate` |
| "Generate the agent-context file for this project" | `primer` |

### More installer options

```bash
npx @johanesimm/fundamentum add primer   # install just one skill (space-separate for several)
npx @johanesimm/fundamentum --global     # skip the prompt: install for every project
npx @johanesimm/fundamentum --project    # skip the prompt: install into ./.claude/skills
npx @johanesimm/fundamentum --force      # overwrite existing skills without asking
npx @johanesimm/fundamentum list         # show which skills are bundled
npx @johanesimm/fundamentum --help       # full usage
```

### Run without npm (from source)

```bash
npx github:<owner>/fundamentum           # straight from GitHub, no publish needed
node bin/cli.mjs --project               # from a local checkout of this repo
```

### Manual copy (no Node at all)

Copy the skill folders (`blueprint/`, `excavate/`, `primer/`) into
`~/.claude/skills/` (global) or `<repo>/.claude/skills/` (project).

### Fork & publish your own

It's a plain npm package. Set a unique `name` in `package.json` (a
scoped `@you/fundamentum` is always free), then `npm publish` (scoped
packages need `--access public`, already set here via `publishConfig`).
Whatever you name it becomes the `npx <name>` command; `files` in
`package.json` ships only the CLI + skill folders + README.
