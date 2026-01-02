# Project Cognition - First Test Walkthrough

## What You're About to Do

You're going to:
1. Open a test project in VS Code
2. Launch Project Cognition extension in debug mode
3. Initialize memory for that project
4. Fill in project templates
5. Test all 4 commands
6. Try injecting memory into Claude

## Prerequisites ✓

- ✅ Extension built (`npm run compile`)
- ✅ All tests passing (`npm test`)
- ✅ VS Code installed
- ✅ A test project available (or create minimal one)

## Recommended Test Projects

### Option A: Use an Existing Project
- DreamCraft Legacies (your AI simulation project)
- A Digital Forge product
- Any other project you want to document

### Option B: Create a Quick Test Project

Create a minimal test project:

```powershell
# In PowerShell
mkdir C:\temp\test-project
cd C:\temp\test-project
git init

# Create a simple file
"// Test project" | Out-File -Encoding UTF8 src.js

# Open in VS Code
code .
```

## Step-by-Step First Test

### Step 1: Open Project Cognition in VS Code

```powershell
cd C:\Users\gardn\Downloads\project-cognition
code .
```

### Step 2: Start Debug Mode (F5)

1. In VS Code, press **F5**
2. It may ask: "Select Environment" → Choose **Node.js**
3. A new VS Code window opens (this is your "Extension Host")
4. The original window shows debug output

Your new window has Project Cognition extension loaded!

### Step 3: Open Your Test Project

In the **Extension Host window** (the new one):
- File → Open Folder → Select your test project (DreamCraft or other)

### Step 4: Initialize Project Memory

1. Press **Ctrl+Shift+P**
2. Type: **initialize**
3. Select: "Project Cognition: Initialize Project Memory"
4. Watch the console output (in original window)

Expected result:
- `.cognition/` directory created
- `intent.md` opened for editing
- No errors

### Step 5: Fill in intent.md

Replace the template with your project info:

**Example for DreamCraft Legacies:**

```markdown
# Project Intent

## Core Vision
Build a 7-year autonomous AI simulation where D&D characters live in a persistent world with emergent storytelling.

## Key Goals
- Characters make autonomous decisions based on personality + class + survival needs
- Hunger mechanics (5-10 range) drive daily behavior
- Daily story generation with AI
- Blog posts auto-generated at 4pm EST

## Technology Stack
- Language: TypeScript/JavaScript
- Runtime: Node.js
- AI: Claude API for story generation
- Database: [Your DB choice]

## Core Architecture Decision
Event-sourced character state where each action creates an immutable event. Events drive state changes and enable perfect story replay.

## Non-Negotiable Constraints
- Hunger MUST be 5-10 (not 0-100)
- Characters must have personality quirks
- Daily persistence (never reset)
```

Save the file (Ctrl+S)

### Step 6: Create decisions.md

1. Create new file: `.cognition/decisions.md`
2. Add some decisions:

```markdown
## Decision: Hunger Scale Range
- **Chosen**: 5-10 numeric range
- **Rejected**: 0-100, 0-500, floating point
- **Rationale**: Small range prevents extreme values, aligns with D&D feel
- **Date**: 2025-01-15
- **Status**: Final

## Decision: Event-Sourced Architecture
- **Chosen**: Immutable event log as source of truth
- **Rejected**: Mutable object state, relational schema
- **Rationale**: Enables replay for storytelling, audit trail, offline capability
- **Date**: 2025-01-10
- **Status**: Final
```

Save the file

### Step 7: Test Command #1 - View Project Memory

1. Press **Ctrl+Shift+P**
2. Type: **view**
3. Select: "Project Cognition: View Project Memory"

Expected result:
- New editor opens showing combined memory
- Shows your intent
- Shows your decisions
- Shows "Recent Failed Attempts" (empty for now)

### Step 8: Test Command #2 - Log Failed Attempt

1. Press **Ctrl+Shift+P**
2. Type: **log**
3. Select: "Project Cognition: Log Failed Attempt"
4. Answer the 4 questions:

```
Problem: "Hunger value went to 0"
Approach: "Added bounds checking to 0-100 range"
Result: "Fixed but values still wrong"
Next Steps: "Check if hunger constraint is 5-10 not 0-100"
```

Expected result:
- File created in `.cognition/failures/`
- Check the file was created correctly

### Step 9: Test Command #3 - Inject Memory to Clipboard

1. Press **Ctrl+Shift+P**
2. Type: **inject**
3. Select: "Project Cognition: Inject Memory to Clipboard"

Expected result:
- Notification: "✓ Memory injected to clipboard!"
- Text copied to clipboard

### Step 10: Verify the Injected Memory

1. Open Notepad or your text editor
2. Paste (Ctrl+V)

You should see:

```
[PROJECT COGNITION - MEMORY INJECTION]

## Project Context
[Your intent.md content]

## Key Decisions (Non-Negotiable)
- **Decision: Hunger Scale Range**: Using 5-10 numeric range (not 0-100, 0-500, floating point) because Small range prevents extreme values, aligns with D&D feel
- **Decision: Event-Sourced Architecture**: ...

## Known Failures (Don't Repeat)
- **YYYY-MM-DD...**: Check if hunger constraint is 5-10 not 0-100

---

Now, here's the actual question:
```

**This is what you'll paste into Claude!**

### Step 11: Test with Claude

1. Go to Claude.ai
2. Paste the injected memory
3. Ask a question about your project:

```
[PASTE INJECTED MEMORY HERE]

I'm working on the character hunger system. What's the best way to 
implement the 5-10 range to make decisions emergent but realistic?
```

Expected result:
- Claude mentions your 5-10 constraint
- Claude acknowledges your event-sourced architecture
- Claude avoids suggesting 0-100 range
- Response is specifically tailored to your project

## Troubleshooting

**Extension doesn't appear in command palette?**
- Reload window: `Ctrl+Shift+P` → "Reload Window"
- Make sure you're in the Extension Host window (the one opened by F5)

**Memory files not showing up?**
- Check `.cognition/` directory exists in your project
- Verify `intent.md` and `decisions.md` exist
- Check for errors in debug console

**Injection is empty?**
- Make sure `intent.md` has content (not just template placeholders)
- Verify `.cognition/decisions.md` exists and has at least one decision

**Commands work but nothing happens?**
- Check the debug console (original VS Code window) for error messages
- Look for red errors or yellow warnings

## What's Actually Happening?

When you run these commands:

1. **Initialize** → Creates `.cognition/` directory with templates
2. **View** → Reads all memory files and displays in editor
3. **Log** → Creates timestamped markdown file in `failures/`
4. **Inject** → Reads all memory, formats it, copies to clipboard

All of this is handled by `memoryEngine.ts` which:
- Reads files from `.cognition/`
- Parses intent.md and decisions.md
- Extracts decision summaries automatically
- Extracts lessons from failures automatically
- Formats everything for AI consumption

## Next Steps After First Test

1. **Document issues** - Note any bugs or UX improvements
2. **Try on real project** - Test on DreamCraft Legacies
3. **Use with Claude** - Actually ask Claude about your project
4. **Iterate** - Fix any bugs found

## Quick Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Build successful (`npm run compile`)
- [ ] Tests passing (`npm test`)
- [ ] Test project open in VS Code
- [ ] F5 launches debug extension
- [ ] Initialize command works
- [ ] Memory files created
- [ ] View command displays memory
- [ ] Log command creates failure file
- [ ] Inject command copies to clipboard
- [ ] Pasted memory looks correct
- [ ] Claude responds with context awareness

---

**You're ready!** Press F5 and start testing.
