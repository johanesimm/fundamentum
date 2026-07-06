# Phase 2 — Solution Architecture (docs/architecture/09.x)

> Extension of `blueprint`. Read and follow this file when the
> orchestrator reaches the architecture phase. Requires the foundation
> docs (00–08) to exist; interviews the user on every technology and
> boundary choice.

Translate the foundation (00–08) into locked technical decisions.
**Read the foundation docs first** — architecture serves the domain
model and journeys, not the other way around. Every choice is either
proposed-with-rationale and confirmed by the user, or given by the
user directly. The recommendations below are a common default for a
**web application**; first establish what KIND of system this is (web
app, service/API, CLI, library, mobile, data pipeline, …) and only
offer the recommendations that fit — never assume a web stack.

## Interview (before writing)

Round 1 — shape: overall structure (for a web/service product recommend
a modular monolith; but a CLI, library, or pipeline has its own shape —
match the project type); interface style (REST with a versioned prefix
is a good web default; others use gRPC, GraphQL, a CLI surface, a public
library API, message consumers — pick what fits); event needs; async/
background work if any. Round 2 — stack, offered per tier only when it
applies and always replaceable: *frontend* (default React + Vite +
Tailwind + shadcn/ui + TanStack Query + Zustand + RHF + Zod — only if it
has a UI); *backend/core* (default Node/Express + PostgreSQL + JWT/
refresh + Argon2id + RBAC — or whatever language/runtime/datastore the
project actually uses: Python, Go, Rust, Java, …); anything the user's
org mandates. Round 3 — boundaries: which modules own which data; AI
isolation requirements; permission/trust philosophy.

## Documents to produce

| Doc | Content |
|---|---|
| **09-Solution-Architecture** | The umbrella: context, chosen shape, module list, data-flow overview, security boundaries, integration points, and a closing "Transition" section authorizing the Master PRD |
| **09.5-Architecture-Decision-Records** | ADR-001…N — one per significant choice: context, decision, consequences, alternatives rejected. Governance rule: future changes must reference/supersede an ADR |
| **09.A-Frontend-Architecture** | Stack, feature-based structure, rendering/build decisions |
| **09.B-Backend-Architecture** | Stack, process model (api + worker), auth mechanics |
| **09.C-Module-Boundaries** | The definitive module list — this becomes the Feature-PRD structure AND the code layout; choose carefully |
| **09.D-Service-Boundaries** | What runs where (processes, jobs) |
| **09.E-Event-Architecture** | Core business events + consumers (Timeline/Analytics/AI/Notifications pattern) |
| **09.F-Data-Ownership** | Entity → owning module table; no entity has two owners |
| **09.G-API-Boundaries** | API prefix, versioning, external surface |
| **09.H-Permission-Boundaries** | Role → capability summary (coarse; the PRD refines to resource level) |
| **09.I-State-Management** | Frontend state rules (e.g. "server state in query cache only, never in the client store" — make one locked rule like this) |
| **09.J-Technology-Stack-Decision** | Final stack table, one line of rationale each |

Produce only the docs that fit the project type — several are
web-specific. A headless service or CLI omits **09.A** (frontend) and
**09.I** (frontend state); a single-process tool may fold **09.D** into
09.B; a project with no eventing skips **09.E**; a library exposing a
public API documents its surface in **09.G** rather than an HTTP prefix.
Keep the umbrella (09), ADRs (09.5), module boundaries (09.C), data
ownership (09.F), and the stack decision (09.J) in every case; note any
intentionally-omitted doc in 09 so the omission is explicit.

Short docs are fine — several of these are half a page. Precision
beats length.

## Rules

-   Every decision traces to a foundation need (cite the doc); if the
    user requests something the foundation doesn't justify, ask.
-   Locked decisions go into PROJECT_STATE.md's "Locked Decisions"
    list.
-   House format (metadata header, status table, separators);
    bookkeeping after each doc (PROJECT_STATE, CHANGELOG, ROADMAP,
    README).

## Done when

09 + 09.5 + 09.C + 09.F + 09.J exist plus every other boundary doc that
applies to this project type (any omitted one is noted in 09); module
list (09.C) and data ownership (09.F) are mutually consistent; ADRs
cover every stack row in 09.J; PROJECT_STATE points at the Master PRD
(`phases/prd.md`).
