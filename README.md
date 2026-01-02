# Project Cognition

> Stop your AI pair programmer from repeating the same debugging mistakes. Preserve your project's intent, decisions, and failed attempts in Git—then inject that memory into Claude, Copilot, ChatGPT, or any AI tool.

**Problem**: AI coding assistants forget context between conversations. They suggest solutions you already rejected, debug bugs you've already fixed, and ignore architectural decisions you've made.

**Solution**: Project Cognition creates a lightweight memory layer stored in your Git repo. One command injects that memory into any AI tool, giving it full context about your project intent, decisions, and failed attempts.

## Features

- ✅ **Git-Native Storage** - Memory lives in `.cognition/` directory, versions with your code
- ✅ **Memory Injection** - One-click copy-to-clipboard for any AI tool (Claude, Copilot, ChatGPT, local LLMs)
- ✅ **Failure Tracking** - Log failed debugging attempts with root cause analysis
- ✅ **Decision Preservation** - Document architectural decisions to prevent revisiting them
- ✅ **Searchable Log** - All memory is in Markdown, easily grepable and human-readable
- ✅ **Zero Setup** - No account, no cloud service, no vendor lock-in
- ✅ **Works Offline** - Entire plugin runs locally with zero dependencies

## The Problem This Solves

```
Day 1: "We'll use JWT authentication"
  ↓
Day 3: AI suggests OAuth (somehow forgot your decision)
  ↓
Day 5: Same OAuth suggestion again (different conversation)
  ↓
Day 7: Debugging the exact same bug AI "fixed" before
  ↓
😤 Developer gives up on AI pair programming
```

With Project Cognition:

```
Initialize: Document your project intent, decisions, and past failures
  ↓
Before asking AI: Run "Inject Memory" command
  ↓
Paste memory into Claude/Copilot prompt
  ↓
AI now knows your project context and avoids past mistakes
  ↓
✅ Productive AI pair programming
```

## Quick Start

### Installation

Install from VS Code Marketplace: [Project Cognition](https://marketplace.visualstudio.com/items?itemName=cognition.project-cognition)

Or clone and build locally:
```bash
git clone https://github.com/yourusername/project-cognition
cd project-cognition
npm install
npm run compile
```

### First Time Setup

1. Open your project in VS Code
2. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. Run: **`Project Cognition: Initialize Project Memory`**
   - Creates `.cognition/` directory with templates
   - Opens `intent.md` for you to fill in

4. Fill in your project's memory:
   - **intent.md** - What is this project? What are the goals?
   - **decisions.md** - What architectural decisions have you made?
   - **failures/** - Log debugging attempts that took >15 minutes or had surprising root causes

5. Commit to Git:
   ```bash
   git add .cognition/
   git commit -m "Initialize Project Cognition memory"
   ```

### Daily Usage

**Before asking an AI tool for help:**

1. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Run: **`Project Cognition: Inject Memory to Clipboard`**
3. Paste into Claude/Copilot prompt
4. Ask your question

The AI now has full context about your project's intent, decisions, and past failures.

**When you discover something:**

1. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Run: **`Project Cognition: Log Failed Attempt`**
3. Answer 4 questions:
   - What problem were you debugging?
   - What approach did you try?
   - What was the result?
   - What are the next steps?
4. Memory automatically saved to `failures/` directory

## Commands

| Command | Shortcut | What It Does |
|---------|----------|-------------|
| **Initialize Project Memory** | None | Create `.cognition/` directory with starter templates |
| **View Project Memory** | None | Open sidebar showing all your project memory |
| **Inject Memory to Clipboard** | None | Copy memory context in AI-injectable format to clipboard |
| **Log Failed Attempt** | None | Quick form to log a debugging failure or discovery |

## Memory Format

Your memory is stored in `.cognition/` directory:

```
.cognition/
├── intent.md              # Project goals, vision, constraints
├── decisions.md           # Architectural decisions (don't revisit these)
├── failures/              # Log of failed debugging attempts
│   ├── 2025-01-15-auth-bug.md
│   └── 2025-01-12-memory-leak.md
├── api-contracts.md       # (Optional) API specifications
└── config.json           # Configuration
```

See [docs/MEMORY_FORMAT.md](./docs/MEMORY_FORMAT.md) for detailed documentation and examples.

### Example: intent.md

```markdown
# Project Intent

## Core Vision
Build an autonomous 7-year AI simulation where D&D characters live in a persistent world.

## Key Goals
- Characters make decisions based on personality and class
- Survival mechanics drive behavior (hunger 5-10 range)
- Daily story generation creates ongoing narrative

## Non-Negotiable Constraints
- Hunger range is 5-10 (not 0-100 or 0-500)
- Characters must have personality quirks (no min-maxing)
```

### Example: decisions.md

```markdown
## Decision: Hunger Scale Range
- **Chosen**: 5-10 numeric range
- **Rejected**: 0-100, 0-500, floating point
- **Rationale**: Small range prevents extreme values, aligns with D&D feel
- **Date**: 2025-01-12
- **Status**: Final
```

### Example: failures/ log entry

```markdown
---
date: 2025-01-15T14:30:00Z
problem: "Memory leak in character updates"
---

# Failed Attempt: Memory Leak via Weak References

## What We Tried
[Code snippet]

## Root Cause
Event listeners weren't being cleaned up in destructor.

## Lesson for AI
When you see memory leaks, ask about listener cleanup FIRST.
```

## Memory Injection Format

When you run "Inject Memory," you get this in your clipboard:

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[Your intent.md content]

## Key Decisions (Non-Negotiable)
- Hunger Scale: Using 5-10 range (not 0-500) because prevents extreme values
- Personality-Driven: Class + traits override stats because creates emergent gameplay

## Known Failures (Don't Repeat)
- hunger-calc-bug: Hunger went 0-500. Root cause: no bounds checking
- memory-leak: Event listeners weren't cleaned up. Always call destroy()

---

Now, here's the actual question:
[Your prompt to Claude/Copilot]
```

## FAQ

**Q: Will this slow down my workflow?**
A: No. Initialize once, then just one extra command before asking AI. Takes 3 seconds.

**Q: What if my project changes?**
A: Update `.cognition/intent.md` and `.cognition/decisions.md`. It's just Markdown, super easy to edit.

**Q: Can I share this with my team?**
A: Yes! Push `.cognition/` to Git. Team members clone it and have instant access to project memory.

**Q: Does this work with GitHub Copilot?**
A: Yes. Copy-paste the injected memory into your Copilot Chat prompt.

**Q: Does this work with ChatGPT?**
A: Yes. Any AI tool that accepts text input. Paste the memory at the top of your prompt.

**Q: Does this work offline?**
A: Yes. Everything runs locally. No cloud required.

**Q: What about privacy?**
A: Your memory lives in your Git repo. You control it completely. No data ever leaves your machine.

See [docs/FAQ.md](./docs/FAQ.md) for more questions and answers.

## How It Works

```
┌─────────────────────────────────────────────────────┐
│  Your Project Root (.cognition/ in Git)            │
├─────────────────────────────────────────────────────┤
│  intent.md      - Project goals & philosophy        │
│  decisions.md   - Architectural decisions           │
│  failures/*.md  - Logged debugging attempts         │
│  config.json    - Settings                          │
└─────────────────────────────────────────────────────┘
              ↓ (VS Code Plugin)
┌─────────────────────────────────────────────────────┐
│  Memory Reader & Aggregator                         │
│  - Reads all memory files                           │
│  - Formats for AI injection                         │
│  - Pre-flight checks against decisions              │
└─────────────────────────────────────────────────────┘
              ↓ (Copy to Clipboard)
┌─────────────────────────────────────────────────────┐
│  Your AI Tool Prompt                                │
│  (Claude / Copilot / ChatGPT / Local LLM)          │
│  - Paste memory at top of conversation             │
│  - Ask your question                                │
│  - AI responds with full context                    │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

- **Built with**: TypeScript, Node.js, VS Code Extension API
- **No external dependencies** - Uses only Node.js built-ins and VS Code APIs
- **Size**: ~100KB compiled extension
- **Compatibility**: VS Code 1.80.0+

## Development

### Setup

```bash
git clone https://github.com/yourusername/project-cognition
cd project-cognition
npm install
```

### Build

```bash
npm run compile       # Compile TypeScript
npm run watch        # Watch mode for development
npm run lint         # Run ESLint
```

### Test

```bash
npm test             # Run tests
```

### Debug

Open the project in VS Code and press `F5` to launch in debug mode.

## Project Status

**Current Phase**: MVP (Memory Engine + Basic Commands)

**Completed**:
- ✅ Core memory engine (file I/O, parsing, injection)
- ✅ VS Code extension with 4 commands
- ✅ Memory file format specification
- ✅ Starter templates

**In Progress**:
- 🔄 Unit tests
- 🔄 Sidebar UI for memory visualization
- 🔄 Polish and bug fixes

**Planned (Phase 2)**:
- Native AI integrations (Copilot, Claude)
- Team collaboration features
- Cloud sync (optional)
- Advanced analytics

See [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for detailed timeline.

## Contributing

This is an early-stage project built with love for indie developers and AI-assisted coding enthusiasts.

Feedback and contributions are welcome! Please open an issue or pull request.

## License

MIT - Use freely in personal and commercial projects.

## Author

Built for developers frustrated with AI amnesia. Used daily on [DreamCraft Legacies](https://github.com/yourusername/dreamcraft-legacies).

---

**Ready to build with better AI pair programming?**

1. Install from VS Code Marketplace
2. Run "Initialize Project Memory"
3. Document your project's intent and decisions
4. Never explain the same context to AI twice again

Happy coding! 🚀
