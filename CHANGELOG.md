# Changelog

All notable changes to the Project Cognition extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-02

### Added
- ✨ **Quick Setup Wizard** - 3-step guided setup for first-time users
  - Prompts for project vision
  - Collects 2-3 key architectural decisions
  - Auto-generates intent.md and decisions.md
  - Opens intent.md for immediate editing
- ✨ **First-Run Detection** - Automatically prompts setup on first activation if `.cognition/` doesn't exist
- ✨ **Improved Error Messages**
  - Clear workspace validation errors
  - Specific guidance for common issues
  - Better error context in failure messages
- ✨ **Better User Feedback**
  - Success messages with checkmark emoji (✓)
  - Input dialog titles showing progress (Step 1/3, etc.)
  - `ignoreFocusOut` on input dialogs prevents lost input
- ✨ **Enhanced Marketplace Metadata**
  - More descriptive extension description
  - Better keywords for discoverability
  - Repository and author information
  - Links to GitHub for issues and feedback

### Changed
- 📝 Updated version to 0.2.0
- 📝 Improved package.json description with problem/solution framing
- 📝 Reorganized commands in package.json (Quick Setup first)
- 📝 Updated category tags to ["AI", "Programming Languages", "Debuggers"]
- 🔧 Added proper error handling in all commands with `getDetailedErrorMessage()` helper

### Fixed
- 🐛 Fixed input placeholder property (placeHolder vs placeholder)
- 🐛 Improved workspace root validation in logFailure command
- 🐛 Better handling of cancelled operations in Quick Setup

### Documentation
- 📚 Created comprehensive MARKETPLACE_README.md
- 📚 Added detailed FAQ section
- 📚 Included real-world before/after examples
- 📚 Added command reference table

## [0.1.0] - 2024-12-31

### Added
- ✨ **4 Core Commands**
  - Initialize Project Memory - Creates .cognition/ folder with templates
  - View Project Memory - Displays all stored intent, decisions, and failures
  - Inject Memory to Clipboard - Formats memory for AI tool prompts
  - Log Failed Attempt - Records debugging sessions with lessons learned
- ✨ **Git-Native Storage**
  - All memory stored in `.cognition/` directory
  - Versions with your code in Git
  - No external dependencies or cloud services
- ✨ **Memory Structure**
  - `intent.md` - Project vision, goals, technology stack
  - `decisions.md` - Architectural decisions with rationale
  - `failures/` - Failed attempts with timestamped entries
  - `config.json` - Extension configuration
- ✨ **AI-Friendly Format**
  - Structured markdown with YAML frontmatter
  - Auto-extracts key decisions
  - Formats ready for Claude, ChatGPT, Copilot
  - Single `[PROJECT COGNITION - MEMORY INJECTION]` header
- ✨ **Failure Logging**
  - Timestamped failure files (ISO format)
  - Structured YAML frontmatter
  - Sections: Problem, What We Tried, Result, Lesson for AI
  - Auto-extraction of lessons for memory injection
- ✨ **Templates & Guidance**
  - Starter templates for intent.md and decisions.md
  - README in failures/ directory explaining format
  - Helpful comments in generated files
  - Config file with sensible defaults
- ✨ **Unit Tests**
  - 6 comprehensive tests covering:
    - Directory structure creation
    - Failure file format
    - Memory retrieval
    - Memory injection formatting
    - Multiple failure handling
    - Config file reading
  - 100% test pass rate
- ✨ **Documentation**
  - Comprehensive README.md
  - Memory format specification (MEMORY_FORMAT.md)
  - FAQ with 30+ questions answered
  - Quick start guide
  - Testing walkthroughs

### Technical Details
- **Language**: TypeScript
- **Platform**: VS Code 1.80.0+
- **Dependencies**: Zero (no external packages)
- **File I/O**: Node.js fs module
- **Compliance**: MIT License

---

## Roadmap

### Planned for 0.3.0
- [ ] Memory search/filter in View Memory command
- [ ] Template customization UI
- [ ] Automatic memory updates from Git commits
- [ ] Memory diff viewer (compare versions over time)

### Planned for 0.4.0
- [ ] Team collaboration features (merge decisions across team)
- [ ] Integration with popular AI tools (direct Claude API export)
- [ ] Memory analytics (most referenced decisions, failure patterns)
- [ ] Custom memory categories beyond intent/decisions

### Considering for Future
- [ ] Web dashboard for memory visualization
- [ ] Mobile companion app
- [ ] Community memory templates library
- [ ] AI-powered decision suggestions based on project context

---

## How to Contribute

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/your-username/project-cognition/issues)
- **Discussions**: Ask questions on [GitHub Discussions](https://github.com/your-username/project-cognition/discussions)
- **Email**: contact@example.com

---

**Project Cognition** - Stop AI amnesia. Preserve your project's memory.
