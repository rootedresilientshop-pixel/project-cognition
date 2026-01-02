# Project Cognition FAQ

## General Questions

### What is Project Cognition?

Project Cognition is a lightweight VS Code extension that preserves your project's memory—intent, decisions, and failed debugging attempts—in Git. It then injects that memory into AI tool prompts (Claude, Copilot, ChatGPT, etc.) so the AI understands your project context and avoids repeating past mistakes.

### Why do I need this?

AI coding assistants forget context between conversations. They suggest solutions you've already rejected, debug bugs you've already fixed, and ignore architectural decisions you've made. Project Cognition solves this by creating a structured, searchable, version-controlled memory that travels with your code.

### Is this another note-taking app?

No. Project Cognition is specifically designed for AI-assisted development. It has three core purposes:

1. **Document intent** - What is this project? What are the non-negotiable constraints?
2. **Lock decisions** - Architectural choices you don't want revisited
3. **Log failures** - Debugging attempts so AI learns what NOT to suggest

It's opinionated about what to remember.

### How is this different from just asking AI to remember?

AI models don't have persistent memory across conversations. Even if you explain your project in one conversation, the AI forgets it in the next. Project Cognition creates a durable, searchable, version-controlled memory that you carry with you to every AI tool.

### Does this work offline?

Yes. Everything runs locally in VS Code. No cloud service required. No internet needed.

## Setup & Installation

### How do I install it?

1. Open VS Code Extensions Marketplace
2. Search for "Project Cognition"
3. Click Install
4. Or build from source: `git clone` → `npm install` → `npm run compile`

### What does "Initialize Project Memory" do?

It creates a `.cognition/` directory at your project root with starter templates:

- `intent.md` - Fill in your project's vision and goals
- `decisions.md` - Document architectural decisions
- `failures/` - Directory for logging failed debugging attempts
- `config.json` - Configuration file
- `failures/README.md` - Guidance on logging failures

All files are Markdown (human-readable and searchable).

### Do I need to commit `.cognition/` to Git?

Yes! That's the whole point. Your memory versions with your code.

```bash
git add .cognition/
git commit -m "Initialize Project Cognition memory"
git push
```

### Can I share memory with my team?

Yes. Push `.cognition/` to Git. Team members who clone the repo automatically have access to shared project memory.

## Daily Usage

### How often should I update memory?

- **intent.md & decisions.md**: Update when your project vision or architectural approach changes
- **failures/**: Log a failure every time you spend >15 minutes debugging or discover a surprising root cause

### How do I inject memory into Claude/Copilot/ChatGPT?

1. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Run: "Project Cognition: Inject Memory to Clipboard"
3. Paste the memory at the top of your AI prompt
4. Ask your question

The AI now has full context.

### What format is the injected memory?

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[Your intent.md content]

## Key Decisions (Non-Negotiable)
[Your architectural decisions]

## Known Failures (Don't Repeat)
[Recent failure logs]

---

Now, here's the actual question:
[Your prompt]
```

### How do I log a failed debugging attempt?

1. Open Command Palette: `Ctrl+Shift+P` / `Cmd+Shift+P`
2. Run: "Project Cognition: Log Failed Attempt"
3. Answer these questions:
   - What problem were you debugging?
   - What approach did you try?
   - What was the result?
   - What are next steps?
4. Memory saved automatically to `failures/` directory

### What counts as a "failed attempt"?

Log it if:
- ✅ Took >15 minutes to debug
- ✅ Root cause was different from what you initially thought
- ✅ Mistake that could easily happen again
- ✅ Learning that teammates should know about

Don't log:
- ❌ Typos fixed in 30 seconds
- ❌ "Forgot to save file" issues
- ❌ Obvious documentation misreads
- ❌ One-off vendor service outages

## Memory Format

### What goes in intent.md?

```markdown
# Project Intent

## Core Vision
[One sentence: what is this project and why?]

## Key Goals
[2-5 bullet points of what you're trying to achieve]

## Technology Stack
[Languages, frameworks, databases, deployment platform]

## Core Architecture Decision
[Why did you choose THIS architecture?]

## Non-Negotiable Constraints
[Hard boundaries you don't want AI to second-guess]
```

Examples:
- "Hunger range is 5-10, not 0-100" (prevent extreme values)
- "No vendor lock-in" (data portability)
- "Offline-first design" (works without internet)

### What goes in decisions.md?

```markdown
## Decision: [Clear name]
- **Chosen**: [Specific approach you selected]
- **Rejected**: [Alternatives you considered]
- **Rationale**: [Why you chose this]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Deprecated
```

Examples:
- JWT vs OAuth for authentication
- PostgreSQL vs MongoDB
- React vs Vue
- Microservices vs monolith

### What goes in failures/?

```markdown
---
date: 2025-01-15T14:30:00Z
problem: "Memory leak in character updates"
---

# Failed Attempt: [Clear title]

## What We Tried
[Code or description]

## Root Cause
[What was actually wrong]

## Lesson for AI
[One sentence preventing this mistake]
```

### Can I have other files like api-contracts.md?

Yes! The `.cognition/` directory is flexible:

- **intent.md** (required)
- **decisions.md** (recommended)
- **failures/** (recommended)
- **api-contracts.md** (optional) - API schemas and responses
- **architecture.md** (optional) - System design diagrams
- **dependencies.md** (optional) - Third-party service contracts

Just remember: Keep it searchable and AI-injectable.

## AI Integration

### Does this work with Claude?

Yes. In Claude.ai or Claude desktop:
1. Copy injected memory with Project Cognition command
2. Paste at top of your message
3. Ask your question

Claude can now reference your project intent, decisions, and past failures.

### Does this work with GitHub Copilot?

Yes. In Copilot Chat:
1. Copy injected memory
2. Paste in the chat window
3. Ask your question

Copilot Chat now has context about your decisions and past failures.

### Does this work with ChatGPT?

Yes. In ChatGPT:
1. Copy injected memory
2. Paste in your message
3. Ask your question

ChatGPT now has your project context.

### Does this work with local LLMs?

Yes. Any AI tool that accepts text input:
- Ollama running locally
- LM Studio
- Private LLM deployments
- Any API-based LLM

### Will AI automatically avoid past mistakes?

Not automatically. But when you include your failure logs, AI can reference them and make better decisions.

The AI can't detect pattern matches automatically, so it helps to prompt it explicitly:

> Based on the known failures above, make sure you:
> 1. Check for event listener cleanup (memory leak risk)
> 2. Validate edge cases (NULL values in data)
> 3. Don't suggest [rejected approach] again

## Data & Privacy

### Where is my memory stored?

In your `.cognition/` directory at the project root. On your machine. In your Git repo.

### Is my memory uploaded anywhere?

No. Nothing leaves your machine except what you explicitly push to Git.

### What if I use public GitHub?

You control what goes into `.cognition/`. Don't commit sensitive data (API keys, credentials, passwords). Memory is for architecture, intent, and lessons learned—not secrets.

### Can I delete memory?

Yes. Just delete the files. Everything is version-controlled in Git, so you can revert if needed.

```bash
rm -rf .cognition/
git add .cognition/
git commit -m "Remove Project Cognition memory"
```

## Collaboration

### Can my team see my project memory?

Yes, if you push `.cognition/` to your Git repo. Everyone who clones the repo has access.

### What if team members disagree on decisions?

That's what decision logs are for! Document the decision, the alternatives, and the rationale. When someone disagrees, they can see the reasoning.

### Can we have multiple decision sets for different teams?

No, but you can create branches:

```bash
git checkout -b team-a-architecture
# Edit decisions.md for Team A
git commit -m "Document Team A architecture decisions"

git checkout main
# Different decisions for main team
```

## Troubleshooting

### "No .cognition directory found"

Run "Project Cognition: Initialize Project Memory" first. This creates the directory with templates.

### Memory injection is empty

Make sure `.cognition/intent.md` and `.cognition/decisions.md` exist and have content. Empty files are skipped.

### VS Code can't find the extension

Make sure you installed it from the Marketplace or built it locally:

```bash
npm install
npm run compile
```

### Commands don't appear in Command Palette

1. Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
2. Make sure the extension is enabled
3. Check that `package.json` has correct command definitions

### My failures aren't showing up

Failures go in `.cognition/failures/` directory as `.md` files. Make sure:
1. Directory exists: `.cognition/failures/`
2. Files end in `.md`
3. Files aren't named exactly `README.md` (that's reserved)

## Performance

### Does this slow down VS Code?

No. The extension is lightweight and only reads files when you run a command.

### How much disk space does memory take?

Very little. A year of failure logs is typically <10MB. Memory is plain text Markdown.

### What if I have hundreds of failures?

The memory injection includes the last 10 failures by default. You can change this in `.cognition/config.json`:

```json
{
  "maxRecentFailures": 20
}
```

## Advanced Usage

### Can I use this for non-code projects?

Yes! Project Cognition works for any project that benefits from structured memory:

- Technical writing
- Game design documents
- Research projects
- Architecture planning

### Can I customize the templates?

Yes. Edit the templates in `examples/starter-project/.cognition/` and copy them to your projects.

### Can I hook this into CI/CD?

Not yet. This is an MVP. Phase 2 will include integrations with:

- GitHub Actions
- GitLab CI
- Pull request checkers
- Code review integrations

### Can I export memory to other formats?

Yes, it's all Markdown. You can:
- Convert to PDF with any Markdown tool
- Export to Notion/Obsidian
- Version in wiki tools
- Print for documentation

## Feature Requests

### Can you add feature X?

Yes! This is an early-stage project. Submit requests as GitHub issues.

Planned Phase 2 features:
- Native Copilot integration
- Sidebar UI for better visualization
- Advanced analytics
- Team collaboration
- Cloud sync

### Can I contribute?

Absolutely. Open an issue or PR. This project is built for the developer community.

## Still Have Questions?

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/project-cognition/issues)
- **Discussions**: [Ask questions or discuss ideas](https://github.com/yourusername/project-cognition/discussions)
- **Reddit**: [/r/VSCode](https://reddit.com/r/VSCode) - Tag @projectcognition
- **Documentation**: See [README.md](../README.md) and [docs/MEMORY_FORMAT.md](./MEMORY_FORMAT.md)

---

**Last updated**: 2025-01-15
