# PROJECT COGNITION: Complete Product + Development Guide

> A lightweight VS Code memory layer for AI-assisted coding that prevents repeated debugging mistakes and keeps your AI pair programmer aligned with your project intent.

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Product Analysis](#product-analysis)
3. [Development Gameplay](#development-gameplay)
4. [Quick Reference](#quick-reference)

---

# EXECUTIVE SUMMARY

**What It Is**: A VS Code plugin that preserves project intent, key decisions, and failed debugging attempts—then injects that memory into Claude/Copilot prompts to prevent circular debugging.

**Why It Matters**: Every developer using AI coding tools experiences the same pain: AI suggests the same rejected approach 5 times, forgets why you chose something, and debugs the same bug repeatedly. Project Cognition fixes this.

**Market Opportunity**: 
- TAM: 5-10M developers using AI coding tools globally
- SAM: 1-3M frustrated with AI amnesia
- SOM (Year 1): 10K-50K early adopters in indie dev, TTRPG, automation

**Your Advantage**:
- You're solving a problem you feel every day (DreamCraft Legacies)
- You know the audience (r/AICreatorsUnite, indie creators, automation builders)
- Git-native architecture (no vendor lock-in, versions with code)
- Works with any AI tool (Claude, Copilot, ChatGPT, local LLMs)

**Timeline**: 8-12 weeks part-time development → Free MVP on VS Code Marketplace → Reddit launch → Gather feedback → Build Phase 2 with team features/integrations

**Revenue Model**: 
- Free: MVP on marketplace (builds audience)
- Pro: $9/month (team collaboration, native integrations, cloud sync)
- Enterprise: $49+/month (governance, advanced integrations)

---

# PRODUCT ANALYSIS

## The Problem

### Why AI Coding Tools Fail Over Time

```
Day 1: "We'll use JWT authentication"
  ↓
Day 3: AI suggests OAuth (somehow forgot intent)
  ↓
Day 5: Same OAuth suggestion again (different conversation)
  ↓
Day 7: Debugging the exact same bug AI "fixed" before
  ↓
😤 Developer gives up on AI pair programming
```

**This isn't a context window issue.** Even with 200K tokens, AI has no structured way to know:
- *Why* this project chose REST over GraphQL
- *What* failed in previous debugging attempts
- *Which* libraries were explicitly rejected
- *When* past solutions became obsolete

### Why Existing Solutions Fall Short

| Solution | Problem |
|----------|---------|
| Git history alone | Unstructured; AI can't tell which commits matter |
| AI conversation history | Lost between sessions; not searchable; scattered |
| Copilot context | Forgets between conversations; can't access past failures |
| Long prompts | Cognitive overload; doesn't scale |
| Project documentation | Rarely updated; contradicts actual code |

**The core issue**: Project memory isn't durable, structured, or accessible to AI.

---

## The Solution

### Architecture: Memory Lives in Git

Instead of a new backend, Project Cognition stores everything in `.cognition/` directory:

```
project-root/
├── .cognition/
│   ├── intent.md          # Project goals & philosophy
│   ├── decisions.md       # Architectural decisions (don't revisit these)
│   ├── failures/          # Failed debugging attempts
│   │   ├── 2025-01-15-auth-bug.md
│   │   ├── 2025-01-12-memory-leak.md
│   │   └── README.md
│   ├── api-contracts.md   # (Optional) API shapes
│   └── config.json        # Plugin settings
├── src/
└── ...
```

**Why This Approach**:
- ✅ Versions with code (Git keeps it in sync)
- ✅ Shareable with team (push/pull with repo)
- ✅ Auditable (Git history of decisions)
- ✅ Searchable (local grep + future AI indexing)
- ✅ No external dependencies (works offline)
- ✅ Developer owns data (no vendor lock-in)

### Core Features (MVP)

#### 1. Intent & Decision Memory

**intent.md**: Describes project goals and philosophy
```markdown
# Project Intent

## Core Vision
Build autonomous 7-year AI simulation where D&D characters live in persistent world.

## Key Goals
- Characters make autonomous decisions based on personality + class
- Survival mechanics drive behavior (hunger 5-10 range)
- Daily story generation
- Blog posts generated at 4pm EST

## Non-Negotiable Constraints
- Hunger range: 5-10 (not 0-500)
- Characters must have personality quirks (no min-maxing)
```

**decisions.md**: Architectural decisions you don't want AI to second-guess
```markdown
## Decision: Hunger Scale Range
- **Chosen**: 5-10 range
- **Rejected**: 0-100, 0-500, floating point
- **Rationale**: Easy for AI, prevents extreme values, matches D&D feel
- **Date**: 2025-01-12
- **Status**: Final
```

#### 2. Failed Attempt Logging

One-click button: "Log This Debugging Attempt as Failed"

```markdown
# Failed Attempt: Memory Leak in Character Update

**Date**: 2025-01-15 14:30 UTC
**Duration**: 45 minutes
**Summary**: Tried to fix memory leak using weak references

## What We Tried
[Code snippet]

## Root Cause
Event listeners weren't cleaned up in character destructor.

## Lesson for AI
When you see memory leaks, ask about listener cleanup FIRST before suggesting data structure changes.
```

**AI Pre-Check Example**:
```
⚠️ Your suggestion matches a previous failed attempt (2025-01-15).
   Root cause was listener cleanup, not data structures.
   Review decision? [Yes] [No] [Review Previous Attempt]
```

#### 3. Memory Injection

Run "Project Cognition: Inject Memory" → Copies to clipboard:

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[intent.md contents]

## Key Decisions (Non-Negotiable)
- **Hunger Scale**: Using 5-10 range (not 0-500) because prevents extreme values
- **Personality-Driven**: Class + traits determine decisions (not pure stats)

## Known Failures (Don't Repeat)
- **memory-leak-attempt**: Listener cleanup is critical
- **oauth-vs-jwt**: JWT was chosen for offline-first; don't revisit

---

Now, here's the actual question:
[Your prompt to Claude/Copilot]
```

#### 4. VS Code Plugin Commands

- `Project Cognition: Initialize Memory` — Create `.cognition/` with templates
- `Project Cognition: View Memory` — Open sidebar showing intent/decisions/failures
- `Project Cognition: Inject Memory` — Copy memory prefix to clipboard
- `Project Cognition: Log Failed Attempt` — Create new failure file (5 questions)
- `Project Cognition: Check Suggestion` — Validate AI suggestion against decisions

---

## Market Positioning

### What It Is
- ✅ A **memory layer** for AI coding workflows
- ✅ **Lightweight** (~500KB plugin)
- ✅ **Opinionated** about what to remember
- ✅ **AI-agnostic** (works with any LLM)
- ✅ **Git-native** (lives in repo)

### What It Isn't
- ❌ Not a new IDE
- ❌ Not a new AI model
- ❌ Not a replacement for VS Code or Copilot
- ❌ Not requiring a server/account

### Positioning Statement

> **Project Cognition** is a lightweight memory system for AI-assisted developers. It stops your AI pair programmer from repeating the same debugging mistakes, forgetting why you made architectural decisions, and derailing your project intent. It's not a new tool to learn—just a structured way to preserve what your AI constantly forgets.

---

## Competitive Advantage

| Factor | Competitor | Project Cognition |
|--------|-----------|-------------------|
| Setup | Minutes + account | 1 command, uses Git |
| Data Ownership | Cloud vendor | Git repo (yours) |
| AI Integration | One tool only | Any AI tool |
| Failure Memory | None | Structured + searchable |
| Cost | Subscription | Free or cheap |
| Privacy | Depends on vendor | Local by default |

---

## Revenue Model

### Freemium SaaS

**Free Tier**:
- Unlimited local memory files
- VS Code plugin
- Auto-injection for single user
- Full marketplace availability

**Pro Tier** ($9/month):
- Team collaboration (shared memory)
- Optional cloud sync (Git backup + search)
- AI pre-flight check service
- Memory analytics

**Enterprise** ($49+/month):
- Advanced integrations (GitHub CI, GitLab)
- Team governance + audit trail
- Custom AI provider integrations

### Alternative: One-Time Purchase

$29 lifetime license (via Gumroad / Digital Forge)
- Indie-dev friendly
- Lower friction than subscription
- Aligns with your audience values

---

## Go-to-Market Strategy

### Phase 1: Market Validation (Pre-Build)
- Survey 50+ developers on Reddit/Discord
- "How many times has AI suggested solutions you already rejected?"
- Blog post: "Why AI Keeps Forgetting Your Project"

### Phase 2: MVP Development (8-12 weeks)
- Build free plugin with core features
- Test on DreamCraft Legacies
- Use on 2+ Digital Forge products
- Fix bugs based on self-testing

### Phase 3: Free Marketplace Launch
- Submit to VS Code Marketplace
- Free tier on day 1
- Full functionality available (no nag screens)

### Phase 4: Reddit Launch & Community
- Post on r/SideProject, r/gamedev, r/learnprogramming
- Mention DreamCraft Legacies use case
- Share on r/AICreatorsUnite
- Collect feedback (top 3 feature requests)

### Phase 5: Pro Tier & Integrations (Phase 2)
- Build Phase 2 based on community feedback
- Native Copilot integration (most requested)
- Team collaboration features
- Optional cloud sync

---

# DEVELOPMENT GAMEPLAY

## Phase 1: Foundations Quest (Weeks 1-2)
### Goals: Set up repo, define memory format, plan plugin architecture

**What You'll Do**: No coding yet. Just structure and design.

### Quest 1.1: Project Setup ✓

**Checklist**:
- [ ] Create GitHub repo: `project-cognition`
- [ ] Initialize Node.js + TypeScript
- [ ] Add `.gitignore`, `README.md`
- [ ] Create folder structure:
```
project-cognition/
├── vscode-plugin/          # The extension
├── memory-engine/          # Parsing + injection logic
├── examples/               # Sample projects
├── docs/                   # User documentation
├── tests/                  # Unit + integration tests
└── README.md
```

**Success Condition**: Repo is ready, `npm install` works

---

### Quest 1.2: Design Memory File Format ✓

**Create** `/docs/MEMORY_FORMAT.md` defining exact structure:

```markdown
# Project Cognition Memory Format v1.0

## Directory Structure
```
project-root/
└── .cognition/
    ├── intent.md
    ├── decisions.md
    ├── failures/
    │   ├── 2025-01-15-auth-bug.md
    │   └── README.md
    ├── api-contracts.md  (optional)
    └── config.json
```

## intent.md Format

```yaml
---
version: 1.0
last_updated: 2025-01-15
---

# Project Intent

## Core Vision
[One sentence about what this project does]

## Key Goals
- Goal 1
- Goal 2

## Technology Stack
- Language: [X]
- Framework: [X]

## Core Architecture Decision
[Design philosophy]

## Non-Negotiable Constraints
- Constraint 1: Why
- Constraint 2: Why
```

## decisions.md Format

```markdown
## Decision: [Name]
- **Chosen**: [What you picked]
- **Rejected**: [Alternatives]
- **Rationale**: [Why]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Deprecated
```

## failures/ Format

```markdown
# Failed Attempt: [Name]

**Date**: 2025-01-15 14:30 UTC
**Duration**: 45 minutes
**Summary**: One-liner

## What We Tried
[Code]

## Root Cause
[What was actually wrong]

## Lesson for AI
[One sentence to prevent this again]
```
```

**Success Condition**: Format is documented, intuitive, and AI-injectable

---

### Quest 1.3: Create Starter Templates ✓

**Create** `/examples/starter-project/.cognition/` with empty templates users can copy.

**Success Condition**: Someone can `cp -r examples/starter-project` to get started immediately.

---

## Phase 2: Memory Engine Quest (Weeks 3-4)
### Goals: Build core logic that reads, parses, and injects memory

### Quest 2.1: File I/O + Markdown Parsing ✓

**Create** `/memory-engine/src/memory-reader.ts`:

```typescript
import * as fs from 'fs';
import * as path from 'path';

interface ProjectMemory {
  intent: string;
  decisions: Decision[];
  failures: FailedAttempt[];
  config: Record<string, any>;
}

interface Decision {
  name: string;
  chosen: string;
  rejected: string[];
  rationale: string;
  date: string;
  status: 'Final' | 'Revisitable' | 'Deprecated';
}

interface FailedAttempt {
  name: string;
  date: string;
  duration: string;
  summary: string;
  lesson: string;
}

export class MemoryReader {
  constructor(private projectRoot: string) {}

  async readMemory(): Promise<ProjectMemory> {
    const cognitionDir = path.join(this.projectRoot, '.cognition');
    
    if (!fs.existsSync(cognitionDir)) {
      throw new Error(
        `No .cognition directory found. Run "Project Cognition: Initialize Memory" first.`
      );
    }

    const intent = this.readFileOrEmpty(
      path.join(cognitionDir, 'intent.md')
    );
    const decisions = this.parseDecisions(
      this.readFileOrEmpty(path.join(cognitionDir, 'decisions.md'))
    );
    const failures = this.parseFailures(cognitionDir);
    const config = this.readConfig(path.join(cognitionDir, 'config.json'));

    return { intent, decisions, failures, config };
  }

  private parseDecisions(content: string): Decision[] {
    const sections = content.split(/^## Decision: /m).filter(s => s.trim());
    
    return sections.map(section => ({
      name: section.split('\n')[0].trim(),
      chosen: this.extractField(section, 'Chosen'),
      rejected: this.extractArray(section, 'Rejected'),
      rationale: this.extractField(section, 'Rationale'),
      date: this.extractField(section, 'Date'),
      status: (this.extractField(section, 'Status') || 'Final') as any,
    }));
  }

  private parseFailures(cognitionDir: string): FailedAttempt[] {
    const failuresDir = path.join(cognitionDir, 'failures');
    if (!fs.existsSync(failuresDir)) return [];

    const files = fs
      .readdirSync(failuresDir)
      .filter(f => f.endsWith('.md') && f !== 'README.md');

    return files.map(file => {
      const content = fs.readFileSync(path.join(failuresDir, file), 'utf-8');
      return {
        name: file.replace('.md', ''),
        date: this.extractField(content, 'Date'),
        duration: this.extractField(content, 'Duration'),
        summary: this.extractField(content, 'Summary'),
        lesson: this.extractField(content, 'Lesson for AI'),
      };
    });
  }

  private extractField(content: string, field: string): string {
    const regex = new RegExp(`^\\*\\*${field}\\*\\*:?\\s*(.+)$`, 'm');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  private extractArray(content: string, field: string): string[] {
    const value = this.extractField(content, field);
    return value.split(',').map(s => s.trim());
  }

  private readFileOrEmpty(filePath: string): string {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
  }

  private readConfig(configPath: string): Record<string, any> {
    if (!fs.existsSync(configPath)) {
      return { auto_inject: true, failure_search_enabled: true };
    }
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
}
```

**Success Condition**: Unit tests pass. `new MemoryReader(projectRoot).readMemory()` returns structured data.

---

### Quest 2.2: Memory Injection Engine ✓

**Create** `/memory-engine/src/injector.ts`:

```typescript
import { ProjectMemory } from './memory-reader';

export class MemoryInjector {
  generatePromptPrefix(memory: ProjectMemory): string {
    const sections: string[] = [];

    if (memory.intent) {
      sections.push(`## Project Context\n${memory.intent}`);
    }

    if (memory.decisions.length > 0) {
      const finalDecisions = memory.decisions.filter(d => d.status === 'Final');
      if (finalDecisions.length > 0) {
        sections.push(
          `## Key Decisions (Non-Negotiable)\n${finalDecisions
            .map(d => `- **${d.name}**: Using ${d.chosen} (not ${d.rejected.join(', ')}) because ${d.rationale}`)
            .join('\n')}`
        );
      }
    }

    if (memory.failures.length > 0) {
      const recentFailures = memory.failures.slice(0, 5);
      sections.push(
        `## Known Failures (Don't Repeat)\n${recentFailures
          .map(f => `- **${f.name}**: ${f.lesson}`)
          .join('\n')}`
      );
    }

    return `[PROJECT COGNITION - MEMORY INJECTION]\n\n${sections.join('\n\n')}\n\n---\n\nNow, here's the actual question:\n\n`;
  }

  checkSuggestionAgainstMemory(suggestion: string, memory: ProjectMemory): Warning[] {
    const warnings: Warning[] = [];

    memory.decisions
      .filter(d => d.status === 'Final')
      .forEach(decision => {
        decision.rejected.forEach(rejected => {
          if (
            suggestion.toLowerCase().includes(rejected.toLowerCase()) &&
            !suggestion.toLowerCase().includes(decision.chosen.toLowerCase())
          ) {
            warnings.push({
              severity: 'high',
              message: `⚠️ Your suggestion uses ${rejected}, but we decided on ${decision.chosen}. Reason: ${decision.rationale}`,
            });
          }
        });
      });

    return warnings;
  }
}

interface Warning {
  severity: 'high' | 'medium' | 'low';
  message: string;
}
```

**Success Condition**: Generate memory prefix, run pre-flight checks on suggestions.

---

### Quest 2.3: Test Memory Engine ✓

Unit tests for memory reading and injection.

**Success Condition**: `npm test` passes with 5+ tests.

---

## Phase 3: VS Code Plugin Quest (Weeks 5-7)
### Goals: Build extension integrating memory with editor

### Quest 3.1: Extension Scaffolding ✓

**Create** `/vscode-plugin/src/extension.ts`:

```typescript
import * as vscode from 'vscode';
import { MemoryReader } from '../../memory-engine/src/memory-reader';
import { MemoryInjector } from '../../memory-engine/src/injector';

let memoryReader: MemoryReader;
let memoryInjector: MemoryInjector;

export async function activate(context: vscode.ExtensionContext) {
  console.log('Project Cognition activated!');

  const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!workspaceRoot) {
    vscode.window.showErrorMessage('Project Cognition: No workspace folder open');
    return;
  }

  memoryReader = new MemoryReader(workspaceRoot);
  memoryInjector = new MemoryInjector();

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('projectCognition.initializeMemory', async () => {
      vscode.window.showInformationMessage('Initializing Project Cognition...');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('projectCognition.viewMemory', async () => {
      try {
        const memory = await memoryReader.readMemory();
        vscode.window.showInformationMessage(`Memory loaded: ${memory.decisions.length} decisions`);
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${(error as Error).message}`);
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('projectCognition.injectMemory', async () => {
      try {
        const memory = await memoryReader.readMemory();
        const prefix = memoryInjector.generatePromptPrefix(memory);
        await vscode.env.clipboard.writeText(prefix);
        vscode.window.showInformationMessage('✓ Memory injected to clipboard!');
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${(error as Error).message}`);
      }
    })
  );

  // Status bar
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.command = 'projectCognition.viewMemory';
  statusBar.text = '$(memory) Cognition';
  statusBar.show();
  context.subscriptions.push(statusBar);
}

export function deactivate() {}
```

**Success Condition**: Commands appear in command palette, status bar shows, no errors.

---

### Quest 3.2: Memory Sidebar UI ✓

Build webview showing intent/decisions/failures in sidebar.

**Success Condition**: Open sidebar, see formatted memory with nice styling.

---

### Quest 3.3: Initialize Memory Command ✓

Create `.cognition/` directory structure with templates.

**Success Condition**: Run command, directory created with all templates, intent.md opens for editing.

---

### Quest 3.4: Log Failed Attempt Command ✓

One-click logging: ask 5 questions → create failure file.

**Success Condition**: Create failure files with correct formatting.

---

## Phase 4: Self-Testing Quest (Weeks 8-9)
### Goals: Use plugin on your own projects, find bugs, iterate

### Quest 4.1: Test on DreamCraft Legacies ✓

1. Initialize Project Cognition
2. Fill in `.cognition/intent.md` (7-year simulation, character behavior, etc.)
3. Fill in `.cognition/decisions.md` (hunger range 5-10, personality-driven, etc.)
4. Log the hunger bug as a past failure
5. Test memory injection in Claude chat
6. **Check**: Did Claude respect the decisions? Did it avoid the past mistake?

**Success Condition**: Memory injection improved Claude's response quality.

---

### Quest 4.2: Test on Digital Forge Product ✓

Initialize on 1-2 of your products, test memory injection.

**Success Condition**: Tested on 2+ real projects, collected feedback.

---

### Quest 4.3: Bug Fixing Sprint ✓

Find and fix bugs during self-testing.

**Success Condition**: Plugin is stable for daily use.

---

## Phase 5: Polish & Marketplace Quest (Weeks 10-11)
### Goals: Clean up, document, submit to marketplace

### Quest 5.1: Documentation Polish ✓

- [ ] Professional README with examples
- [ ] FAQ answering common objections
- [ ] Setup instructions
- [ ] Command reference

### Quest 5.2: Code Polish ✓

- [ ] TypeScript types are correct
- [ ] Error handling is comprehensive
- [ ] No console.logs in production code
- [ ] Unit tests pass

### Quest 5.3: Marketplace Submission ✓

1. Create publisher account on VS Code Marketplace
2. Get Personal Access Token
3. Run `npm run publish`
4. Plugin is live, anyone can install it

**Success Condition**: Plugin searchable on marketplace, installable.

---

## Phase 6: Reddit Launch & Feedback (Week 12)
### Goals: Launch publicly, gather feedback, plan next phase

### Quest 6.1: Craft Launch Post ✓

**Example Reddit Post**:

```markdown
# Project Cognition: Stop Your AI Pair Programmer from Repeating Mistakes

TL;DR: Built a VS Code plugin that preserves project memory so Claude/Copilot stop suggesting the same rejected approaches over and over.

## The Problem

Day 1: "We'll use JWT authentication"
Day 3: AI suggests OAuth (forgot your decision)
Day 5: Same OAuth suggestion again
Day 7: Debugging the same bug AI "fixed" before

I built Project Cognition to solve this.

## How It Works

1. Document intent + key decisions in .cognition/
2. Run "Inject Memory" command
3. Copy-paste into Claude/Copilot
4. AI now remembers your decisions and avoids past failures

## Why It Matters

- Prevents circular debugging
- Works offline (Git-native)
- Works with any AI tool
- Free on VS Code Marketplace

## Try It

Install from: [VS Code Marketplace link]

Feedback welcome!
```

**Post to**: r/SideProject, r/gamedev, r/learnprogramming, r/AICreatorsUnite

**Success Condition**: Post goes live, collect 10+ feedback items.

---

### Quest 6.2: Gather Feedback ✓

Track: feature requests, pain points, unexpected use cases.

Document in `/docs/FEEDBACK.md`.

**Success Condition**: Identify top 3 Phase 2 features based on feedback.

---

## Phase 7: Phase 2 Planning (After MVP Launch)
### Don't Build Yet — Just Plan

**Create** `/docs/PHASE_2_ROADMAP.md`:

```markdown
# Phase 2: Full-Featured Release

## Planned Features

### 1. Native AI Integrations
- GitHub Copilot direct integration
- Claude browser extension
- ChatGPT plugin

### 2. Team Collaboration
- GitHub sync backend
- PR comments with memory
- Team memory governance

### 3. Memory Intelligence
- Full-text search
- AI-powered indexing
- Auto-decision extraction from code

### 4. Analytics
- Which decisions questioned most?
- Which failures repeat?
- Memory health score
```

**Success Condition**: Phase 2 documented but not started.

---

# QUICK REFERENCE

## Core Concept

```
.cognition/ (in your Git repo)
├── intent.md → "What is this project?"
├── decisions.md → "What have we decided?" (don't revisit)
├── failures/ → "What failed?" (don't repeat)
└── config.json → Settings

↓ (VS Code plugin)

Memory Injection
"Here's your project context, decisions, and past failures"

↓ (Copy-paste to Claude/Copilot)

Better AI Suggestions
AI respects your decisions, avoids past mistakes
```

## Memory Injection Example

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
DreamCraft Legacies: 7-year AI-powered persistent world...

## Key Decisions (Non-Negotiable)
- **Hunger Scale**: 5-10 range (not 0-500) because prevents extreme values
- **Personality-Driven**: Class + traits override stats because creates emergent storytelling

## Known Failures (Don't Repeat)
- **hunger-calc-bug**: Hunger went 0-500. Root cause: no bounds checking
- **memory-leak**: Event listeners weren't cleaned up

---

Now, here's the actual question:
[Your prompt]
```

## Commands

| Command | What It Does |
|---------|-------------|
| `Project Cognition: Initialize Memory` | Create `.cognition/` + templates |
| `Project Cognition: View Memory` | Open sidebar showing memory |
| `Project Cognition: Inject Memory` | Copy memory prefix to clipboard |
| `Project Cognition: Log Failed Attempt` | Create new failure file (5 Qs) |
| `Project Cognition: Check Suggestion` | Validate AI suggestion |

## Timeline

- **Weeks 1-2**: Foundations (structure + format design)
- **Weeks 3-4**: Memory engine (parsing + injection logic)
- **Weeks 5-7**: VS Code plugin (UI + commands)
- **Weeks 8-9**: Self-testing (on DreamCraft + Digital Forge)
- **Weeks 10-11**: Polish + marketplace submission
- **Week 12**: Reddit launch + feedback
- **Phase 2**: Plan (don't build yet), gather feedback, iterate

## Success Criteria

✅ Phase 1: Format is documented, intuitive  
✅ Phase 2: Can read/inject memory, pre-flight checks work  
✅ Phase 3: Plugin is usable in VS Code  
✅ Phase 4: Memory injection improves Claude responses  
✅ Phase 5: Plugin is on VS Code Marketplace  
✅ Phase 6: Reddit launch, community feedback  
✅ Phase 7: Phase 2 roadmap documented  

## Key Files to Create

```
project-cognition/
├── vscode-plugin/
│   ├── src/
│   │   ├── extension.ts
│   │   ├── injector.ts (uses memory-engine)
│   │   ├── webview.ts (sidebar UI)
│   │   └── logger.ts (failed attempts)
│   └── package.json
├── memory-engine/
│   ├── src/
│   │   ├── memory-reader.ts
│   │   └── injector.ts
│   └── tests/
├── examples/
│   └── starter-project/.cognition/
├── docs/
│   ├── MEMORY_FORMAT.md
│   ├── README.md
│   └── FAQ.md
└── .gitignore
```

---

## Why This Works

1. **Solves a real problem** (you feel it every day with DreamCraft)
2. **Low friction** (Git-native, no account, works with any AI tool)
3. **Right time** (AI coding tools exploding, pain point growing)
4. **Opinionated** (refuses to be generic note-taking)
5. **Audience exists** (indie devs, TTRPG creators, automation builders)

## Notes

- Start Phase 1 whenever you have free time
- Test on DreamCraft Legacies first
- Launch free to build audience trust
- Gather feedback before Phase 2
- Phase 2 (native integrations, team collaboration) comes after market validation

---

**Build it. Test it on yourself. Share it with Reddit. Listen to feedback. Then build Phase 2.**

You've got a real product here.
