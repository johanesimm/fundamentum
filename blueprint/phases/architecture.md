# Phase 2 — Solution Architecture (docs/architecture/09.x)

> Extension of `blueprint`. Read and follow this file when the
> orchestrator reaches the architecture phase. Requires the foundation
> docs (00–08) to exist; interviews the user on every technology and
> boundary choice.

Translate the foundation (00–08) into locked technical decisions.
**Read the foundation docs first** — architecture serves the domain
model and journeys, not the other way around. Every choice is either
proposed-with-rationale and confirmed by the user, or given by the
user directly.

## Interview (before writing)

Round 1 — shape: monolith vs modular monolith vs services (recommend
modular monolith for a new product); API style (recommend REST,
versioned prefix `/api/v1`); event needs (recommend event-ready
outbox, not a broker, for MVP); background work (recommend a worker
process). Round 2 — stack: frontend (recommend React + Vite +
Tailwind + shadcn/ui + TanStack Query + Zustand + RHF + Zod,
feature-based), backend (recommend Node/Express + PostgreSQL +
JWT/refresh + Argon2id + RBAC), anything the user's org mandates.
Round 3 — boundaries: which modules own which data; AI isolation
requirements; permission philosophy.

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

09 + 09.5 + 09.A–J exist; module list (09.C) and data ownership
(09.F) are mutually consistent; ADRs cover every stack row in 09.J;
PROJECT_STATE points at the Master PRD (`phases/prd.md`).
