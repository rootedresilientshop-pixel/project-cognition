# Project Cognition - Architectural Decisions

## Decision: Memory Storage Architecture

- **Chosen**: Git-native file-based storage (`.cognition/` folder with Markdown + JSON)
- **Rejected**: Cloud backend (AWS S3, Firebase), plugin SDK (VS Code memento API), local database (SQLite), external API service
- **Rationale**: Developers own their data, works offline completely, versions with code in Git, sharable with teams via Git push/pull, auditable history, simple to understand and migrate away from. Cloud would add cost and complexity; SDK would limit flexibility; database would require management.
- **Date**: 2025-12-15
- **Status**: Final
- **Notes**: This is a core differentiator. Do not reconsider without major pivot.

---

## Decision: Zero External Dependencies

- **Chosen**: Only use TypeScript, Node.js built-ins, and VS Code extension API
- **Rejected**: Popular npm packages (lodash, axios, uuid, etc.)
- **Rationale**: Smaller bundle, faster startup, works completely offline, easier to audit for security, reduces maintenance burden. Single developer can maintain indefinitely. The problem we're solving (memory structure) doesn't require external dependencies.
- **Date**: 2025-12-15
- **Status**: Final
- **Notes**: This is intentional minimalism. If future needs require external packages, that's a signal to reconsider architecture.

---

## Decision: Markdown-First Memory Format

- **Chosen**: Plain Markdown files with YAML frontmatter (intent.md, decisions.md, failures/*.md)
- **Rejected**: JSON-only, custom binary format, database schema
- **Rationale**: Humans read and edit Markdown naturally. Git diffs are readable. Grep/editor search work perfectly. No custom parsers needed. Works with any text editor. YAML frontmatter for structured metadata without breaking readability.
- **Date**: 2025-12-15
- **Status**: Final

---

## Decision: Single VS Code Extension (Not Plugin Ecosystem)

- **Chosen**: Monolithic VS Code extension with all features bundled
- **Rejected**: Plugin SDK, marketplace of memory providers, ecosystem of plugins
- **Rationale**: MVP is focused and simple. Extension can do everything needed. Plugin ecosystem adds complexity without solving the core problem. Single extension is easier to maintain, test, and document. Future if ecosystem makes sense, but not now.
- **Date**: 2025-12-15
- **Status**: Final

---

## Decision: 5 Commands vs Sidebar UI

- **Chosen**: Command palette only for MVP (Initialize, View, Inject, Log Failed Attempt, Quick Setup)
- **Rejected**: Sidebar webview with full UI, status bar menus, keyboard shortcuts, context menus
- **Rationale**: Commands are discoverable, easy to test, minimal code. Sidebar UI adds complexity and debugging surface area. Command palette is how developers expect to interact with extensions. Can add sidebar in Phase 2 if user feedback demands it.
- **Date**: 2025-12-15
- **Status**: Revisitable
- **Notes**: If 50+ users request sidebar UI, reconsider for 0.3.0.

---

## Decision: Free MVP on Marketplace (Not Paid Upfront)

- **Chosen**: Free VS Code Marketplace extension, gather feedback, evaluate monetization later
- **Rejected**: Paid extension ($9.99), freemium with Pro tier upfront, subscription-only
- **Rationale**: Build trust and audience first. Free tier proves product-market fit. Community feedback shapes Phase 2 value prop. Monetization (if any) happens after market validation. Aligns with open-source values.
- **Date**: 2025-12-30
- **Status**: Final (for MVP)
- **Notes**: Revisit after 100+ downloads and 10+ user reviews. Pro tier possible in Phase 2.

---

## Decision: Launch on Reddit First (Not Direct HN, Twitter, Dev.to)

- **Chosen**: Reddit subreddits (r/SideProject, r/AICreatorsUnite, r/gamedev, r/learnprogramming, r/ChatGPT, r/ClaudeAI)
- **Rejected**: Hacker News, Twitter viral campaign, Dev.to crosspost, LinkedIn
- **Rationale**: Reddit audience matches target (indie devs, TTRPG creators, automation builders). Subreddits have engaged communities. Built-in audience on r/AICreatorsUnite. Less pressure than HN. Better for gathering genuine feedback. Easier to engage respectfully in comments.
- **Date**: 2026-01-02
- **Status**: Final (for Phase 1)
- **Notes**: After Reddit validation, expand to HN, Twitter, Dev.to in Phase 2 launch.

---

## Decision: Non-Combative Community Positioning

- **Chosen**: Acknowledge competitor strengths (Claude Projects, Copilot memory), position as complementary not replacement
- **Rejected**: "We're better than Claude Projects," attack competitors, oversell
- **Rationale**: Community respects humility. Saying "Claude Projects is good AND Project Cognition fills a different gap" builds trust. True: Claude Projects memory is fine for single-tool workflows. True: Project Cognition is better for multi-tool and team scenarios. Both statements can be true.
- **Date**: 2026-01-02
- **Status**: Final
- **Notes**: This is the tone for ALL community engagement. No exceptions.

---

## Decision: Focus on Indie Developers + TTRPG Creators (Not Enterprise)

- **Chosen**: Target indie developers, TTRPG creators, automation builders, game devs
- **Rejected**: Enterprise customers, corporate teams, large organizations
- **Rationale**: Your audience (r/AICreatorsUnite, DreamCraft Legacies users). Lower friction (1-person decision). Passionate about problems. Good for word-of-mouth. Enterprise would require sales, support, compliance. MVP doesn't have the features for 500-person teams anyway.
- **Date**: 2026-01-02
- **Status**: Final (for MVP)
- **Notes**: If enterprise interest emerges in Phase 2, revisit. But don't build for them until they ask.

---

## Decision: Validate Problem-Solution Fit Before Phase 2

- **Chosen**: Wait for market feedback (100+ downloads, 5+ reviews, 10+ user testimonials) before building Phase 2 features
- **Rejected**: Pre-plan Phase 2 features, build team collaboration without demand, add sidebar immediately
- **Rationale**: Avoid building features nobody wants. Community will tell you what matters. Reddit comments, GitHub issues, direct feedback. Phase 2 roadmap should be data-driven, not guessed.
- **Date**: 2026-01-02
- **Status**: Final
- **Notes**: Documented in PROJECT_COGNITION_COMPLETE.md. Phase 2 features are "planned but not started."

---

## Decision: Copilot Memory Acknowledgment (Not Dismissal)

- **Chosen**: In responses to "Claude/Copilot already has memory" comments: validate, acknowledge, explain complementary value
- **Rejected**: "Actually, their memory is limited," "You should use us instead," ignore the comment
- **Rationale**: Builds credibility. Shows we understand the landscape. Helps readers understand the real gap (portability, structure, team-sharing). Respectful tone gets upvotes; defensive tone gets downvoted.
- **Date**: 2026-01-02
- **Status**: Final
- **Notes**: Example response documented in REDDIT_POST_DRAFT.md

---

## Decision: Self-Validate on Real Projects (Not Just Tests)

- **Chosen**: Use Project Cognition on PassiveBrain, DreamCraft Legacies, and 1-2 other projects before marketplace submission
- **Rejected**: Only run unit tests, rely on code review alone, ship without self-testing
- **Rationale**: Tests catch bugs; real usage catches pain points, UX friction, missing features. DreamCraft Legacies is the perfect case study (D&D character simulation, complex state). If it doesn't improve Claude responses there, problem isn't solved.
- **Date**: 2026-01-02
- **Status**: Final
- **Status**: Complete ✅ (Tested on PassiveBrain and DreamCraft Legacies; memory injection validated with Claude)

---

## Decision: Documentation-First Approach

- **Chosen**: Write comprehensive docs (README, FAQ, MEMORY_FORMAT) BEFORE marketplace submission
- **Rejected**: Minimal README, "figure it out" approach, docs after launch
- **Rationale**: Users won't get stuck. FAQ answers objections before they appear. MEMORY_FORMAT spec prevents confusion about what goes where. Professional docs signal quality and reduce support burden.
- **Date**: 2026-01-02
- **Status**: Complete ✅ (README, FAQ, MEMORY_FORMAT, MARKETPLACE_README all written)

---

## Decision: MIT License (Not Proprietary)

- **Chosen**: MIT license (permissive open source)
- **Rejected**: Proprietary/closed source, GPL, Commons Clause
- **Rationale**: Aligns with values. Developers trust open source. MIT allows commercial use. Doesn't require changes back to project. Simple and industry standard.
- **Date**: 2025-12-25
- **Status**: Final

---

## Decision: No Telemetry or Tracking

- **Chosen**: Zero telemetry, zero analytics, zero tracking
- **Rejected**: Anonymous usage analytics, opt-in telemetry, crash reporting
- **Rationale**: Privacy-first commitment. Developers don't want to be tracked. Unnecessary for MVP. Feedback comes from Reddit, GitHub issues, direct messages. Adds complexity and trust issues.
- **Date**: 2025-12-15
- **Status**: Final

---

## Future Decisions (Phase 2, Not Decided Yet)

### Decision: Monetization Strategy

- **Options Under Consideration**:
  1. Stay free forever (rely on donations, sponsorships)
  2. Freemium model ($9/month for Pro tier: team features, optional cloud backup)
  3. One-time purchase ($29 lifetime on Gumroad)
  4. Subscription only (abandon free)

- **Status**: Revisitable (will decide based on Phase 1 feedback)
- **Notes**: Don't decide until you know if users value the product. Free MVP proves it first.

---

### Decision: Team Collaboration Features

- **Options Under Consideration**:
  1. No team features (stay single-user focused)
  2. Git-native team features (share `.cognition/` via Git, no backend)
  3. Optional cloud sync (GitHub backend, encrypted storage)
  4. Full SaaS team dashboard

- **Status**: Pending feedback (will decide based on user requests)
- **Notes**: Currently designed for single user. If 50% of users request team features, prioritize Phase 2.

---

### Decision: Native AI Integrations

- **Options Under Consideration**:
  1. Copy-paste only (current MVP approach)
  2. VS Code Copilot Chat integration (inject memory automatically)
  3. Claude browser extension (auto-inject into Claude web UI)
  4. Custom LLM provider support

- **Status**: Pending feedback
- **Notes**: Copy-paste works for MVP. Integrations are convenience, not necessity. Build them if users demand it.

---

## Decision Template (For Future Use)

When adding a new decision, use this format:

```markdown
## Decision: [Clear, specific name]
- **Chosen**: [Specific technology/approach]
- **Rejected**: [Alternatives you considered]
- **Rationale**: [Why. Focus on tradeoffs, not wishes.]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Pending
- **Notes**: (Optional) Additional context, gotchas, or conditions for revisiting
```

### Status Definitions

- **Final**: Locked. Do not revisit unless major architecture change needed.
- **Revisitable**: Open to changing if circumstances change or feedback demands it.
- **Pending**: Decision not yet made; waiting for market feedback or more information.
- **Deprecated**: This approach was replaced by another decision. For historical reference.
