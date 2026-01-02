# Architectural Decisions

## Decision: [Decision Name]
- **Chosen**: [What approach you selected]
- **Rejected**: [Alternatives you considered and rejected]
- **Rationale**: [Why you chose the selected approach]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Deprecated

---

## Example: Database Technology

- **Chosen**: PostgreSQL with Prisma ORM
- **Rejected**: MongoDB, DynamoDB, Firebase Realtime Database
- **Rationale**: Need ACID guarantees for financial transactions. PostgreSQL proven, mature, cost-effective. Prisma provides type-safe queries.
- **Date**: 2025-01-10
- **Status**: Final

---

## Example: Authentication Method

- **Chosen**: JWTs stored in httpOnly cookies
- **Rejected**: OAuth 2.0, session-based auth, API keys in headers
- **Rationale**: Offline-first architecture requires stateless tokens. httpOnly cookies prevent XSS attacks. Server doesn't need session lookup.
- **Date**: 2025-01-08
- **Status**: Final
- **Notes**: Revisit OAuth if we add social login in Phase 2

---

## Example: Frontend Framework

- **Chosen**: React with TypeScript
- **Rejected**: Vue, Svelte, vanilla JavaScript
- **Rationale**: Largest ecosystem of libraries. Team familiarity. Strong typing reduces bugs in collaborative editor.
- **Date**: 2025-01-05
- **Status**: Revisitable
- **Notes**: SVG rendering library choices have been expensive; consider alternatives if performance issues arise

---

## Decision Template

When making a new decision, use this template:

```markdown
## Decision: [Clear, specific name]
- **Chosen**: [Specific technology/approach/pattern]
- **Rejected**: [Alternatives you considered]
- **Rationale**: [3-4 sentences explaining why. Focus on tradeoffs.]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Deprecated
- **Notes**: (Optional) Additional context, gotchas, or conditions for revisiting
```

### Status Definitions

- **Final**: This decision is locked. AI should not suggest alternatives. Changing it requires major architecture rework.
- **Revisitable**: Open to changing this if circumstances change (performance issues, new team member preferences, etc.)
- **Deprecated**: This approach was replaced by another decision. For historical reference only.

---

## Tips for Good Decisions

1. **Be specific**: "NoSQL" is too vague. "MongoDB with sharded collections" is better.
2. **Explain tradeoffs**: Why did you pick this over the alternatives? What are you sacrificing?
3. **Include dates**: Decisions age. A choice made in 2020 might be revisited in 2025.
4. **Keep it short**: 2-3 sentences max for rationale. If you need paragraphs, the decision is too complex.
