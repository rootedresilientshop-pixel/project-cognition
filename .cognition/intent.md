---
version: 1.0
last_updated: 2026-01-02
author: Project Cognition Team
phase: MVP Complete + Market Validation (Reddit Launch)
---

# Project Cognition - Core Intent

## Core Vision

**Stop AI pair programmers from repeating the same debugging mistakes.** Preserve project intent, architectural decisions, and failed debugging attempts in Git—then inject that memory into Claude, Copilot, ChatGPT, or any AI tool to eliminate circular debugging and keep AI aligned with project goals.

## The Problem We're Solving

Every developer using AI coding assistants experiences this pattern:
- **Day 1**: Explain project context ("We use JWT authentication")
- **Day 3**: AI suggests OAuth (forgot your decision)
- **Day 5**: Same OAuth suggestion in different conversation
- **Day 7**: Debugging the exact same bug AI "fixed" before
- **Outcome**: Frustrated developer stops using AI pair programming

This isn't a context window problem. It's a **memory architecture problem**. AI has no structured way to know:
- *Why* you chose this approach
- *What* failed in previous attempts
- *Which* libraries were explicitly rejected
- *When* past decisions became obsolete

## Key Goals

1. **Solve AI amnesia** - Create durable, structured memory that AI can reference and respect across conversations
2. **Enable portable memory** - Memory works with ANY AI tool (not locked to one platform or vendor)
3. **Make it frictionless** - One-time setup, one command before asking AI (3 seconds total overhead)
4. **Preserve developer autonomy** - Developers control what matters; no AI-generated memory; no black-box decisions
5. **Build for teams** - Push memory to Git and teams instantly share project context
6. **Validate product-market fit** - Test with real developers (indie devs, TTRPG creators, automation builders) and gather feedback for Phase 2

## Technology Stack

- **Language**: TypeScript (strict mode)
- **Platform**: VS Code Extension (native extension API)
- **Storage**: Git-native (`.cognition/` folder, Markdown + JSON)
- **Runtime Dependencies**: Zero external packages (works completely offline)
- **Target**: VS Code 1.80.0+
- **Deployment**: VS Code Marketplace (free, open source)

## Core Architecture Decision

**Git-native, file-based memory system** instead of cloud backend or plugin SDK.

**Why this architecture**:
1. **Versions with code** - Memory stays in sync with Git history
2. **Developer ownership** - No external vendor, no data lock-in
3. **Zero infrastructure** - No server, no database, no vendor account
4. **Shareable** - Push `.cognition/` to Git; team members clone it
5. **Auditable** - Full Git history of decisions and changes
6. **Searchable** - Plain Markdown, works with grep/editor search
7. **Offline-capable** - Works completely without internet
8. **Simple to reason about** - Developers understand files and Git better than APIs

This isn't about being minimalist for minimalism's sake. It's about **eliminating complexity** that doesn't solve the core problem. The problem is memory structure, not distribution.

## Non-Negotiable Constraints

- **No vendor lock-in**: All memory lives in Git repo, can be migrated/abandoned anytime
- **No AI-generated memory**: Developers explicitly choose what to remember; no automated suggestions
- **Zero external dependencies**: Works offline, no API calls, no tracking
- **Markdown-first format**: Human-readable, version-controllable, searchable
- **Privacy-first**: 100% local by design; no cloud telemetry
- **Single-user focused in MVP**: Team features in Phase 2 (based on feedback)
- **Focused scope**: 5 commands, no bloat, no "nice-to-haves" that muddy the value prop

## Success Metrics (MVP Phase)

- ✅ All 5 commands working reliably
- ✅ 6 unit tests passing (100%)
- ✅ Tested on real projects (PassiveBrain, DreamCraft Legacies)
- ✅ Memory injection improves AI response quality (validated with Claude)
- ✅ Zero external dependencies in compiled extension
- ✅ Professional documentation (README, FAQ, MEMORY_FORMAT spec)
- ✅ Marketplace submission ready
- ⏳ Community validation (Reddit launch, gather feedback)

## What Success Looks Like (Phase 2+)

- 100+ downloads on VS Code Marketplace (month 1)
- 5+ positive reviews confirming problem/solution fit
- Community feedback identifies top 3 feature requests
- 10+ developers using on real projects
- Team features planned based on user feedback
- Optional Phase 2: Native AI integrations, team collaboration, optional cloud backup
