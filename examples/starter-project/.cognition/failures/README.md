# Failed Attempts Log

This directory contains logs of debugging attempts that failed or led to unexpected discoveries. These logs help prevent repeating the same mistakes.

## Why Log Failures?

Every time you spend 15+ minutes debugging an issue, or discover a root cause that was different from your initial hypothesis, log it here. This creates:

1. **Memory for your team**: New teammates can learn from past mistakes
2. **Memory for AI**: Claude/Copilot can avoid suggesting the same failed approaches
3. **Searchable log**: Later, you can grep for similar problems

## Filename Format

Use one of these naming schemes:
- `YYYY-MM-DD-brief-description.md` - Simple and readable
- `YYYY-MM-DDTHH-mm-ss-brief-description.md` - Precise timestamp
- `2025-01-15-auth-memory-leak.md` - Best practice

## File Format

```markdown
---
date: 2025-01-15T14:30:00Z
problem: "Brief problem statement"
duration: "45 minutes"
severity: "high"
---

# Failed Attempt: [Clear title of what you tried]

**Date**: 2025-01-15 14:30 UTC
**Duration**: 45 minutes
**Summary**: One sentence of what happened

## What We Tried
[Code snippet or description of approach]

## Root Cause
[What was actually wrong—often different from initial hypothesis]

## The Real Fix
[How you actually fixed it]

## Lesson for AI
**[One sentence that prevents this mistake again]**

Example prompt guidance:
> When you see X symptom, ask about Y first before suggesting Z.

## Prevention
- [What process change prevents this]
- [What monitoring would catch this earlier]
```

## Examples

### Example: Memory Leak in Event Listeners

**Filename**: `2025-01-15-event-listener-memory-leak.md`

```markdown
---
date: 2025-01-15T14:30:00Z
problem: "Memory leak in character update loop"
duration: "45 minutes"
severity: "high"
---

# Failed Attempt: Fixing Memory Leak with Weak References

## What We Tried
Implemented JavaScript weak references in the character state manager, thinking the leak was caused by holding references to character objects.

## Root Cause
The root cause was NOT data structure related. Event listeners weren't being cleaned up. Each character update created new listeners without removing old ones.

## The Real Fix
```javascript
class Character {
  destroy() {
    this.eventBus.removeAllListeners(this.id);
    this.listeners.forEach(listener => listener.destroy());
  }
}

// Always cleanup before replacing
oldCharacter.destroy();
characters[id] = newCharacter;
```

## Lesson for AI
**When you see memory leaks in JavaScript, ask about event listener cleanup FIRST before suggesting garbage collection or data structure changes.**

> If you suggest weak references or garbage collection, please first verify that event listeners registered during object lifecycle are being properly cleaned up.

## Prevention
- Always implement a `destroy()` method on objects that register listeners
- Use NodeJS heap profiling to identify actual memory holders
- Test with load simulations before deployment
```

### Example: Database Migration Mistake

**Filename**: `2025-01-10-migration-data-loss.md`

```markdown
---
date: 2025-01-10T09:15:00Z
problem: "Production database migration failed silently"
duration: "3 hours"
severity: "critical"
---

# Failed Attempt: Direct Schema Migration Without Validation

## What We Tried
Wrote a migration that directly altered the `users` table to rename `phone` to `mobile_phone`. Assumed all rows would migrate correctly.

## Root Cause
Old rows had NULL values in the `phone` column. The migration didn't account for this, creating duplicate NULL entries in the new column.

## The Real Fix
```sql
-- Check for edge cases first
SELECT COUNT(*) FROM users WHERE phone IS NULL;

-- Use migration with validation
BEGIN TRANSACTION;
  ALTER TABLE users ADD COLUMN mobile_phone VARCHAR(20);
  UPDATE users SET mobile_phone = phone WHERE phone IS NOT NULL;
  -- Validate before committing
  SELECT COUNT(*) FROM users WHERE phone IS NOT NULL AND mobile_phone IS NULL;
  -- Then drop old column
  ALTER TABLE users DROP COLUMN phone;
COMMIT;
```

## Lesson for AI
**Always write migrations with a validation step that checks for edge cases (NULLs, duplicates) BEFORE making schema changes.**

> When writing database migrations, include a validation check step before the final commit. Verify row counts match expectations.

## Prevention
- Test migrations on production-like datasets with historical quirks
- Add validation queries between migration steps
- Have migrations reviewed by another developer
- Never assume data is clean
```

## When to Log a Failure

✅ Log these:
- Spent 15+ minutes on it
- Root cause was different from initial hypothesis
- Mistake that could easily happen again
- Learning that would help teammates
- Edge case that tripped you up

❌ Don't log these:
- Typos fixed in 30 seconds
- "Forgot to save file" issues
- One-off workarounds for external services
- Solved immediately by reading documentation

## Tips for Good Failure Logs

1. **Be honest**: Include your wrong hypothesis. It's valuable learning.
2. **Show the fix**: Code examples are more useful than words.
3. **Think about AI**: Write the "Lesson for AI" as if you're telling Claude what to avoid.
4. **Keep it scannable**: Headers + bullet points, not walls of text.
5. **Add timestamps**: Helps identify patterns ("Do we fail more on Mondays?")

---

**Remember**: Every mistake you log here is a mistake your future self and your team won't make again.
