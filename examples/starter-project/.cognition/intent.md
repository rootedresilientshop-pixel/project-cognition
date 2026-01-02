---
version: 1.0
last_updated: 2025-01-15
author: Your Name (optional)
---

# Project Intent

## Core Vision
[One or two sentences describing what this project does and why it exists]

Example: Build a real-time collaborative document editor with end-to-end encryption and offline support.

## Key Goals
- [Goal 1]: [Why it matters]
- [Goal 2]: [Why it matters]
- [Goal 3]: [Why it matters]

Example:
- Support 100+ concurrent users per document without degradation
- Ensure zero data loss even with network failures
- Keep setup simple enough for individual developers

## Technology Stack
- **Language**: [TypeScript/Python/Go/etc]
- **Framework**: [Next.js/FastAPI/Express/etc]
- **Database**: [PostgreSQL/MongoDB/etc]
- **Infrastructure**: [AWS/GCP/self-hosted/etc]

## Core Architecture Decision
[Explain your fundamental design philosophy. Why did you choose THIS architecture over alternatives?]

Example: We use event sourcing where every user action creates an immutable event. The event log is the source of truth. Derived state (the current document) is computed from events. This enables perfect conflict resolution, audit trails, and offline-first capabilities.

## Non-Negotiable Constraints
[Things you DON'T want AI to second-guess. These are hard boundaries.]

- **Constraint 1**: [Why this is non-negotiable]
- **Constraint 2**: [Why this is non-negotiable]
- **Constraint 3**: [Why this is non-negotiable]

Example:
- **No vendor lock-in**: All core logic must work without proprietary cloud services
- **End-to-end encryption**: Users' data is never readable by us or infrastructure vendors
- **Offline-first design**: App works completely without internet; syncs when connection returns
