# Project Cognition - VS Code Extension

Stop your AI pair programmer from repeating the same debugging mistakes.

## The Problem

AI coding assistants have amnesia. They forget:
- Your project's architectural decisions
- The bugs you've already debugged
- Why you rejected certain solutions
- The constraints that matter for your project

**Result:** Circular debugging, repeated suggestions, and wasted time.

```
Day 1: "We'll use SQLite, not PostgreSQL"
  ↓
Day 3: AI suggests PostgreSQL (somehow forgot your decision)
  ↓
Day 5: Same PostgreSQL suggestion again (different conversation)
  ↓
😤 You give up on AI pair programming
```

## The Solution

**Project Cognition** creates a lightweight memory layer stored in your Git repo.

One command injects that memory into Claude, ChatGPT, Copilot, or any AI tool, giving it full context about:
- ✅ Your project's vision and goals
- ✅ Key architectural decisions and their rationale
- ✅ Failed attempts and lessons learned

**Result:** AI understands your project. No more circular debugging.

## Features

- **Git-Native Storage** - Memory lives in `.cognition/` folder, versions with your code
- **One-Click Injection** - Copy project memory to clipboard, paste into any AI tool
- **Decision Preservation** - Document architectural decisions with rationale
- **Failure Tracking** - Log debugging attempts with root cause analysis and lessons learned
- **AI-Friendly Format** - Structured markdown that Claude, ChatGPT, and Copilot understand
- **Zero Dependencies** - Runs completely offline, no cloud service, no vendor lock-in
- **Setup Wizard** - 3-step guided setup for first-time users, or manual initialization
- **Better Error Messages** - Clear feedback when something goes wrong

## Quick Start

### 1. Install the Extension

Open VS Code, go to Extensions (Ctrl+Shift+X), search for "Project Cognition", and click Install.

### 2. Open Your Project

File → Open Folder → Select your project

### 3. Initialize Memory

**Option A (Recommended for new users):**
- Press `Ctrl+Shift+P`
- Type: `Project Cognition: Quick Setup`
- Follow the 3-step wizard
- Edit `.cognition/intent.md` and `.cognition/decisions.md` with details

**Option B (For experienced developers):**
- Press `Ctrl+Shift+P`
- Type: `Project Cognition: Initialize Project Memory`
- Edit `.cognition/intent.md` and `.cognition/decisions.md` manually

### 4. Inject Memory Before Asking AI

Before prompting Claude/ChatGPT/Copilot:
1. Press `Ctrl+Shift+P`
2. Type: `Project Cognition: Inject Memory to Clipboard`
3. Paste into your AI tool's prompt
4. Ask your question

The AI now has full context about your project.

### 5. Log Failures As You Discover Them

When you spend >15 minutes debugging something surprising:
1. Press `Ctrl+Shift+P`
2. Type: `Project Cognition: Log Failed Attempt`
3. Answer 4 questions:
   - What problem were you debugging?
   - What approach did you try?
   - What was the result?
   - What are the next steps?
4. Memory automatically saved to `.cognition/failures/`

## Commands

| Command | Shortcut | Purpose |
|---------|----------|---------|
| Quick Setup | Ctrl+Shift+P, `quicksetup` | 3-step wizard for first-time setup |
| Initialize Project Memory | Ctrl+Shift+P, `init` | Create `.cognition/` folder structure |
| View Project Memory | Ctrl+Shift+P, `view` | See all stored intent, decisions, failures |
| Inject Memory to Clipboard | Ctrl+Shift+P, `inject` | Copy formatted memory for AI tools |
| Log Failed Attempt | Ctrl+Shift+P, `log` | Record debugging attempt with lesson learned |

## Example Memory Format

Your `.cognition/` folder contains:

```
.cognition/
├── intent.md          # Project vision, goals, tech stack
├── decisions.md       # Architectural decisions with rationale
├── failures/          # Failed attempts and lessons learned
│   ├── 2025-01-02T00-31-22-679Z.md
│   └── README.md
└── config.json        # Extension configuration
```

### intent.md Example
```markdown
# Project Intent

## Core Vision
Automate high-quality D&D session prep kit generation using Claude AI.

## Key Goals
- Generate 40+ encounter variations per scenario
- Curate everything through 70+ point quality gate
- Launch first kit by January 15, 2025

## Technology Stack
- Python 3.10+
- Claude 3.5 Sonnet API
- SQLite database
- Jinja2 templates
```

### decisions.md Example
```markdown
## Decision: Claude API Over Local LLMs

- **Chosen**: Use Claude 3.5 Sonnet API for all generation
- **Rejected**: Local Ollama (quality insufficient), Open-source models (inconsistent)
- **Rationale**: D&D content requires cultural knowledge and creativity only frontier models deliver
- **Date**: 2024-12-31
- **Status**: Final
```

### failures/ Example
When you log a failed attempt, it's stored as:
```markdown
---
date: 2026-01-02T00:31:22.679Z
problem: "Database migration failing on Year 3 data"
---

# Failed Attempt

## Problem
Database migration failing on Year 3 data - column type mismatch

## What We Tried
Added ALTER TABLE statements to convert personality columns to REAL

## Result
Migration succeeds but personalities show as NULL values

## Lesson for AI
Need to populate defaults from character class mapping before migration
```

## How to Use Memory in AI Prompts

When you inject memory and paste it into Claude, your prompt looks like:

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[Your intent.md content]

## Key Decisions (Non-Negotiable)
[Your decisions.md content]

---

Now, given this project context, here's my question:
[Your actual question]
```

Claude will respect your decisions and avoid suggesting rejected approaches.

## Real-World Example

### Before Project Cognition
```
You: "How should I structure my database?"
AI: "Use PostgreSQL for scalability"
You: "We already decided on SQLite"
AI: "Right, SQLite. Now for API design..."
[Later]
You: "Any suggestions for payments?"
AI: "Consider Stripe API integration"
You: "We don't have internet access. We said this upfront"
AI: "Oh, you need offline payments..."
```

### With Project Cognition
```
[Paste memory containing decision: "SQLite for zero external dependencies, offline-only"]

You: "How should I structure my database?"
AI: "SQLite is the right choice given your offline-only constraint"
You: "How about payments?"
AI: "For offline-only, consider built-in payment tracking or local ledger system"
[AI respects your constraints from the start]
```

## Privacy & Security

- ✅ **100% Local** - All memory stored in your Git repo, nothing sent to cloud
- ✅ **Git-Native** - Version control is built-in, all changes tracked
- ✅ **No Tracking** - Extension doesn't collect telemetry
- ✅ **No Accounts** - No signup required, no vendor lock-in
- ✅ **Open Source** - Source code available on GitHub

## FAQ

**Q: Does this work with Claude, ChatGPT, and Copilot?**
A: Yes! The memory injection format works with any AI tool that accepts text input.

**Q: What if I have a different project vision in six months?**
A: Just edit `.cognition/intent.md` and commit to Git. History is preserved.

**Q: Can I share memory with my team?**
A: Yes! Commit `.cognition/` to Git. Teammates pull it and have full context.

**Q: What happens if I delete `.cognition/`?**
A: It's in your Git history. You can recover it anytime with `git checkout`.

**Q: Do I have to use all 5 commands?**
A: No. Start with intent + decisions. Log failures only when valuable. Skip what doesn't help.

**Q: How often should I update memory?**
A: Update intent.md once at project start. Update decisions.md when you make major choices. Log failures as they happen.

## Getting Help

- **Read our guides**: Check the `.cognition/` folder template for examples
- **Report bugs**: https://github.com/your-username/project-cognition/issues
- **Have questions?**: Create a GitHub discussion

## Changelog

### 0.2.0
- ✨ Added Quick Setup wizard for first-time users
- ✨ Improved error messages with workspace validation
- ✨ Added setup confirmation flow
- 🐛 Fixed placeholder text in input dialogs
- 📝 Updated marketplace metadata

### 0.1.0
- Initial release
- 4 core commands: Initialize, View, Inject, Log Failure
- Git-native storage with templates
- AI-friendly memory format

## License

MIT

## Support Project Cognition

This extension is free and open source. If you find it valuable:

- ⭐ Star us on GitHub
- 🐛 Report bugs and suggest features
- 💬 Share feedback in discussions
- 📢 Tell your developer friends

---

**Stop AI amnesia. Preserve your project's memory. Get better results with every prompt.**
