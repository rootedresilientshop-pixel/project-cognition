# Project Cognition Memory Format v1.0

This document defines the exact structure and format for Project Cognition memory files.

## Overview

Project Cognition stores project memory in a `.cognition/` directory at your project root. This directory is version-controlled with Git, ensuring memory stays synchronized with your codebase and can be shared with team members.

## Directory Structure

```
project-root/
└── .cognition/
    ├── intent.md              # Project goals and philosophy
    ├── decisions.md           # Architectural decisions (don't revisit)
    ├── failures/              # Failed debugging attempts (searchable log)
    │   ├── 2025-01-15-auth-bug.md
    │   ├── 2025-01-12-memory-leak.md
    │   └── README.md          # (Optional) Guidance for failures
    ├── api-contracts.md       # (Optional) API shapes and contracts
    └── config.json            # Plugin configuration
```

## File Formats

### 1. intent.md - Project Intent & Philosophy

Describes the core vision, goals, and philosophy of your project. This is what you copy-paste to Claude/Copilot to establish context.

**Format**:
```markdown
---
version: 1.0
last_updated: 2025-01-15
author: Your Name (optional)
---

# Project Intent

## Core Vision
One or two sentences describing what this project does and why it exists.

Example:
Build an autonomous 7-year AI simulation where D&D characters live in a persistent world, make daily decisions based on personality and survival mechanics, and generate story posts at 4pm EST.

## Key Goals
- Goal 1: Clear, measurable objective
- Goal 2: Another key objective
- Goal 3: Optional additional goals

Example:
- Characters make autonomous decisions based on personality + class traits
- Survival mechanics (hunger, health) drive behavior and create emergent gameplay
- Daily story generation creates ongoing narrative
- Blog posts at 4pm EST drive audience engagement

## Technology Stack
- **Language**: TypeScript/JavaScript (or your language)
- **Framework**: Node.js (or your framework)
- **Database**: PostgreSQL / Supabase (or your persistence layer)
- **Deployment**: Vercel / Docker / (your platform)

## Core Architecture Decision
Explain your fundamental design philosophy. Why did you choose this architecture?

Example:
Character state is immutable and event-sourced. Each action creates an event, events drive state changes, and the event log enables perfect replayability for story generation.

## Non-Negotiable Constraints
These are the hard boundaries—things you DON'T want AI to second-guess:

- **Constraint Name**: Brief explanation of why this is non-negotiable
- **Hunger Range**: Must be 5-10, not 0-500. Prevents extreme values that break narrative.
- **Personality-Driven Decisions**: Characters must have quirks. No pure stat-based decisions.
- **Daily Persistence**: Every character's state persists. No daily resets.
```

### 2. decisions.md - Architectural Decisions

Document decisions you don't want AI to second-guess. Each decision includes the chosen approach, rejected alternatives, and the rationale.

**Format**:
```markdown
# Architectural Decisions

## Decision: Authentication Method
- **Chosen**: JWT tokens stored in httpOnly cookies
- **Rejected**: OAuth 2.0, session-based auth, API keys
- **Rationale**: Offline-first architecture requires tokens that work without server validation. httpOnly cookies prevent XSS attacks.
- **Date**: 2025-01-10
- **Status**: Final
- **Notes**: (Optional) Additional context or related discussions

---

## Decision: Hunger Scale Range
- **Chosen**: 5-10 numeric range
- **Rejected**: 0-100, 0-500, floating point
- **Rationale**: Small range prevents extreme values, aligns with D&D feel, easier for AI to reason about
- **Date**: 2025-01-12
- **Status**: Final

---

## Decision: Database Schema - Characters
- **Chosen**: Normalized schema with separate tables for characters, traits, inventory
- **Rejected**: Single denormalized document, graph database
- **Rationale**: Easier to query historical state and audit changes. Graph DB overkill for our query patterns.
- **Date**: 2025-01-08
- **Status**: Revisitable
- **Notes**: Revisit if query performance becomes an issue

---

## Decision: Story Generation Model
- **Chosen**: Claude API with structured prompts
- **Rejected**: Fine-tuned GPT-3.5, Llama, in-house template system
- **Rationale**: Claude's reasoning abilities produce coherent multi-day narratives. Fine-tuning too expensive. Templates too rigid.
- **Date**: 2025-01-05
- **Status**: Final
```

**Status Values**:
- **Final**: Don't revisit this decision without major project pivot
- **Revisitable**: Open to revisiting if circumstances change
- **Deprecated**: Old decision that's been replaced

### 3. failures/ - Failed Attempt Logs

Each file documents one failed debugging attempt or architectural exploration. These logs help AI avoid suggesting the same failed solutions.

**Filename Format**: `YYYY-MM-DD-HH-mm-ss-brief-description.md`

Example: `2025-01-15-14-30-45-auth-memory-leak.md` or simplified `2025-01-15-auth-bug.md`

**File Format**:
```markdown
---
date: 2025-01-15T14:30:00Z
problem: "Memory leak in character state updates"
duration: "45 minutes"
severity: "high"
---

# Failed Attempt: Memory Leak in Character Update Loop

**Date**: 2025-01-15 14:30 UTC
**Duration**: 45 minutes
**Summary**: Tried to fix memory leak using weak references; root cause was uncleaned event listeners

## What We Tried
Implemented JavaScript weak references in the character state manager:

```javascript
// Attempted fix (didn't work)
const weakCharacters = new WeakMap();
characters.forEach(char => {
  weakCharacters.set(char, {
    state: char.state,
    listeners: new Set()
  });
});
```

## Root Cause
The root cause was NOT data structure related. Event listeners from the old character instance weren't being cleaned up when characters updated. Each update created new listeners without destroying old ones, causing memory to grow unbounded.

## The Real Fix
```javascript
// Correct fix
class Character {
  destroy() {
    this.eventBus.removeAllListeners(this.id);
    this.listeners.forEach(listener => listener.destroy());
  }
}

// In update logic
oldCharacter.destroy();  // Clean up before replacing
characters[id] = newCharacter;
```

## Lesson for AI
**When you see memory leaks in JavaScript, ask about event listener cleanup FIRST before suggesting data structure changes. Most "memory leaks" are actually event handlers keeping references alive.**

Example prompt guidance:
> If you suggest garbage collection or weak references to fix memory issues, please first check if event listeners are being properly cleaned up.

## Prevention
- Always implement a `destroy()` method on objects that register event listeners
- Test with NodeJS heap snapshots to identify actual memory holders
- Don't trust intuition—use profiling tools
```

**Key Field Explanations**:
- **problem**: What were you trying to fix?
- **approach**: What code/strategy did you try?
- **result**: What happened? Did it work or fail?
- **root_cause**: Why did it fail (or succeed)?
- **lesson**: One sentence that prevents this mistake again
- **severity**: Optional - "critical", "high", "medium", "low"

### 4. config.json - Plugin Configuration

Controls how Project Cognition behaves.

**Default Format**:
```json
{
  "version": "1.0",
  "createdAt": "2025-01-15T10:30:00Z",
  "memoryFormat": "markdown",
  "failureTracking": true,
  "autoInject": true,
  "maxRecentFailures": 10,
  "enablePreflightChecks": true,
  "customInstructions": ""
}
```

**Configuration Options**:
- `version`: Memory format version (for future migrations)
- `createdAt`: ISO timestamp of when memory was initialized
- `memoryFormat`: Always "markdown" (future formats possible)
- `failureTracking`: Enable/disable failure logging
- `autoInject`: Automatically include failures in memory injection
- `maxRecentFailures`: How many recent failures to include in injection (default: 10)
- `enablePreflightChecks`: Enable warnings when AI suggestion matches rejected approach
- `customInstructions`: Optional custom instructions added to every memory injection

### 5. api-contracts.md (Optional) - API Specifications

For projects with APIs, document the contract/schema.

**Format**:
```markdown
# API Contracts

## Character State Endpoint

### GET /api/characters/:id
Returns the current state of a character.

**Response**:
```json
{
  "id": "char-123",
  "name": "Aldric",
  "health": 8,
  "hunger": 7,
  "traits": ["brave", "impulsive"],
  "inventory": ["longsword", "potion"],
  "lastAction": "2025-01-15T14:30:00Z",
  "nextActionTime": "2025-01-15T16:00:00Z"
}
```

**Important**: Hunger is ALWAYS 5-10. Health is 0-20. Never send extreme values.

---
```

## Memory Injection Format

When you run "Project Cognition: Inject Memory", the plugin generates this format for copy-pasting into Claude/Copilot:

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[Full contents of intent.md]

## Key Decisions (Non-Negotiable)
- **Decision Name**: Using X (not Y) because [rationale]
- **Decision Name 2**: Using A (not B, C) because [rationale]

## Known Failures (Don't Repeat)
- **failure-name**: Lesson learned from this failure
- **another-failure**: What NOT to do

---

Now, here's the actual question:
[Your prompt to Claude/Copilot]
```

## Usage Guidelines

### When to Create Memory Files

1. **intent.md**: Create at project initialization (required)
2. **decisions.md**: Add a decision whenever you make an architectural choice that you don't want revisited
3. **failures/**: Log a failure every time you:
   - Spend >15 minutes debugging the same issue
   - Discover a root cause different from your initial hypothesis
   - Hit a mistake that could easily happen again
4. **api-contracts.md**: Create if your project has public/internal APIs

### Keep Memory Useful

**Good memory is:**
- ✅ Specific (not vague philosophy)
- ✅ Actionable (could guide a fresh teammate)
- ✅ Up-to-date (refreshed when decisions change)
- ✅ Honest (includes failures, not just successes)

**Bad memory is:**
- ❌ Outdated decisions
- ❌ Vague notes ("stuff we tried")
- ❌ Over-documented (50 page decision docs)
- ❌ No failures (pretending mistakes didn't happen)

### Maintenance

1. **Review quarterly**: Decide which decisions are still final, which are deprecated
2. **Keep it in Git**: Memory lives with code, so it versions together
3. **Share with team**: Push to remote so teammates see decisions and failures
4. **Link in PRs**: Reference decisions in pull request descriptions

## Examples

### Example 1: Game Project (Like DreamCraft Legacies)

See the `examples/game-project/.cognition/` folder for a complete example game project setup.

### Example 2: API Project

See the `examples/api-project/.cognition/` folder for an API project with contract specifications.

## Version History

- **v1.0** (2025-01-15): Initial format. Markdown-based, Git-native, AI-injectable.

## Questions?

See [README.md](../README.md) for general usage and commands.
See [FAQ.md](./FAQ.md) for common questions about memory format and best practices.
