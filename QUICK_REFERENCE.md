# Project Cognition - Quick Reference Card

## What Problem Does This Solve?

**Problem**: AI tools (Claude, Copilot, ChatGPT) forget context between conversations
- "I told you to use JWT!" → AI suggests OAuth anyway
- "We already tried that!" → AI debugs same bug again
- 😤 Result: Developers stop using AI pair programming

**Solution**: Store memory in Git, inject into every prompt

## The 3-Second Workflow

```
1. Before asking AI:
   Ctrl+Shift+P → "Inject Memory to Clipboard"

2. In Claude/Copilot:
   Paste memory at top of message

3. Ask your question
   AI now has full context
```

## 4 Commands You Get

| Command | Keyboard | What It Does |
|---------|----------|-------------|
| Initialize Project Memory | `Ctrl+Shift+P` init | Create `.cognition/` with templates |
| View Project Memory | `Ctrl+Shift+P` view | Display memory in editor |
| Inject Memory | `Ctrl+Shift+P` inject | Copy to clipboard (paste into AI) |
| Log Failed Attempt | `Ctrl+Shift+P` log | Quick form to log debugging failures |

## Memory Files Created

```
.cognition/
├── intent.md          # "What is this project?"
├── decisions.md       # "What won't we change?"
├── failures/          # "What bugs do we know about?"
│   └── YYYY-MM-DD-*.md
└── config.json        # Settings
```

## How to Use It

### First Time (2 minutes)

1. `Ctrl+Shift+P` → "Project Cognition: Initialize Project Memory"
2. Fill in the templates:
   - **intent.md**: What is this project? What are your constraints?
   - **decisions.md**: What architectural choices are final?
3. `git add .cognition/` && `git commit`

### Daily Usage (3 seconds)

1. Before asking AI: `Ctrl+Shift+P` → "Inject Memory to Clipboard"
2. Paste into Claude/Copilot/ChatGPT
3. Ask your question

### When You Hit a Bug

1. `Ctrl+Shift+P` → "Log Failed Attempt"
2. Answer 4 questions:
   - What problem were you debugging?
   - What approach did you try?
   - What was the result?
   - What's the lesson for AI?

## Example: intent.md

```markdown
# Project Intent

## Core Vision
Build a 7-year AI simulation where D&D characters live in a persistent world.

## Key Goals
- Autonomous character decisions based on personality
- Survival mechanics drive behavior (hunger 5-10)
- Daily story generation

## Non-Negotiable Constraints
- Hunger range is 5-10 (NOT 0-100 or 0-500)
- No player manipulation of random events
```

## Example: decisions.md

```markdown
## Decision: Hunger Scale Range
- **Chosen**: 5-10 numeric range
- **Rejected**: 0-100, 0-500, floating point
- **Rationale**: Small range prevents extreme values, aligns with D&D feel
- **Date**: 2025-01-12
- **Status**: Final
```

## Example: Injected Memory

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
Build a 7-year AI simulation...

## Key Decisions (Non-Negotiable)
- **Hunger Scale**: Using 5-10 (not 0-500) because prevents extreme values
- **Personality-Driven**: Characters have quirks, not pure stats

## Known Failures (Don't Repeat)
- **memory-leak**: Event listeners weren't cleaned up. Always call destroy()
- **hunger-bug**: Went to 0-500. Root cause: no bounds checking

---

Now, here's the actual question:
[Your prompt to Claude/Copilot]
```

## File Structure

```
project-cognition/
├── src/                              # Extension code
│   ├── extension.ts                 # 127 lines
│   ├── memoryEngine.ts              # 291 lines
│   └── memoryEngine.test.ts         # 174 lines
├── docs/                            # Documentation
│   ├── MEMORY_FORMAT.md            # Detailed spec
│   └── FAQ.md                      # 30+ questions
├── examples/starter-project/        # Template project
├── README.md                        # User guide
├── START_HERE.md                    # Quick start
└── QUICK_REFERENCE.md             # This file
```

## Key Statistics

- **Lines of TypeScript**: 592
- **Lines of Documentation**: 1,500+
- **Unit Tests**: 6 (100% passing)
- **Commands**: 4
- **Build Time**: <5 seconds
- **Test Time**: <2 seconds
- **Compile Errors**: 0
- **Warnings**: 0

## Works With Any AI Tool

✅ Claude (web or desktop)
✅ GitHub Copilot
✅ ChatGPT
✅ Ollama (local LLMs)
✅ Any AI tool that accepts text input

Just copy-paste the injected memory at the top of your prompt!

## Can I Share This With My Team?

Yes! Push `.cognition/` to Git:

```bash
git add .cognition/
git commit -m "Add Project Cognition memory"
git push
```

Team members clone the repo and have instant access to shared project memory.

## How to Test It

1. Open project in VS Code
2. `Ctrl+Shift+P` → "Initialize Project Memory"
3. Fill in intent.md and decisions.md
4. `Ctrl+Shift+P` → "Log Failed Attempt" (try it!)
5. `Ctrl+Shift+P` → "Inject Memory" (copy & paste into Claude)
6. Ask Claude a question about your project

## Common Issues

**"No .cognition directory found"**
→ Run "Initialize Project Memory" first

**"Memory is empty"**
→ Fill in intent.md and decisions.md

**"Commands don't appear"**
→ Reload VS Code: `Ctrl+Shift+P` → "Reload Window"

See [docs/FAQ.md](./docs/FAQ.md) for more troubleshooting.

## Development Commands

```bash
npm install    # Install dependencies (done)
npm run compile # Build
npm test       # Run tests (6 passing)
npm run watch  # Auto-compile on changes
npm run lint   # Check code style
```

## What's Next?

1. **Test** on DreamCraft Legacies
2. **Feedback** - document issues or improvements
3. **Polish** - fix and iterate
4. **Launch** - submit to VS Code Marketplace

## Learn More

- **Quick Start**: [START_HERE.md](./START_HERE.md)
- **User Guide**: [README.md](./README.md)
- **Format Guide**: [docs/MEMORY_FORMAT.md](./docs/MEMORY_FORMAT.md)
- **Q&A**: [docs/FAQ.md](./docs/FAQ.md)
- **Details**: [COMPLETION_REPORT.md](./COMPLETION_REPORT.md)

---

**Project Cognition MVP - Ready to Use!**

Press `Ctrl+Shift+P` and type "initialize" to get started.
