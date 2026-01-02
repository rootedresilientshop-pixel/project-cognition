# Project Cognition - Test Quick Start

## 60-Second Setup

```powershell
# 1. Navigate to project
cd C:\Users\gardn\Downloads\project-cognition

# 2. Open in VS Code
code .

# 3. Press F5 in VS Code
# → Extension launches in debug mode
# → New window opens (Extension Host)
```

## The 11-Step Test Flow

### In Extension Host Window (F5 window):

1. **Open a project**
   - File → Open Folder
   - Select DreamCraft Legacies or another project

2. **Initialize Memory**
   - `Ctrl+Shift+P` → type `initialize` → Select command
   - `.cognition/` directory created
   - `intent.md` opens

3. **Fill in intent.md**
   ```markdown
   # Project Intent

   ## Core Vision
   Build a 7-year AI simulation where D&D characters live in a persistent world.

   ## Key Goals
   - Characters make autonomous decisions
   - Hunger mechanics (5-10 range) drive behavior
   - Daily story generation with AI

   ## Non-Negotiable Constraints
   - Hunger MUST be 5-10 (not 0-100)
   - Daily persistence
   ```
   Save: `Ctrl+S`

4. **Create decisions.md**
   ```markdown
   ## Decision: Hunger Scale Range
   - **Chosen**: 5-10 numeric range
   - **Rejected**: 0-100, 0-500
   - **Rationale**: Prevents extreme values, aligns with D&D feel
   - **Date**: 2025-01-15
   - **Status**: Final
   ```
   Save: `Ctrl+S`

5. **View Memory**
   - `Ctrl+Shift+P` → type `view`
   - See combined memory display

6. **Log a Failure**
   - `Ctrl+Shift+P` → type `log`
   - Answer 4 questions:
     - Problem: `"Hunger went to 0"`
     - Approach: `"Added bounds checking"`
     - Result: `"Values still wrong"`
     - Next: `"Check constraint is 5-10"`

7. **Inject Memory**
   - `Ctrl+Shift+P` → type `inject`
   - See: `"✓ Memory injected to clipboard!"`
   - Memory copied ✓

8. **Verify Clipboard**
   - Open Notepad
   - `Ctrl+V` (paste)
   - See formatted memory:
     ```
     [PROJECT COGNITION - MEMORY INJECTION]

     ## Project Context
     [Your intent.md]

     ## Key Decisions
     - **Decision: Hunger Scale Range**: ...

     ## Known Failures
     - **YYYY-MM-DD**: Check constraint is 5-10
     ```

9. **Test with Claude**
   - Open claude.ai
   - Paste memory
   - Ask: "What's the best way to implement hunger mechanics?"
   - Claude should mention your 5-10 constraint ✓

10. **Check Claude Response**
    - Does it mention 5-10 range? ✓
    - Does it acknowledge event-sourcing? ✓
    - Does it avoid 0-100? ✓

11. **Document Results**
    - Note what worked ✓
    - Note any issues ⚠️
    - Note improvements 💡

## Expected Results ✓

| Step | Expected |
|------|----------|
| Initialize | .cognition/ created, intent.md opens |
| View | Combined memory displayed |
| Log | Failure file created in failures/ |
| Inject | Clipboard notification appears |
| Paste | Formatted memory appears |
| Claude | Mentions your constraints |

## Troubleshooting 🐛

**F5 doesn't work?**
```
Try: Reload VS Code
Make sure you have extension dev tools:
npm install -g @vscode/vsce
```

**Commands don't appear?**
```
Ctrl+Shift+P → "Reload Window"
Make sure you're in Extension Host window (the new one opened by F5)
```

**Memory not showing?**
```
Check .cognition/ directory exists
Check intent.md has content (not template)
Check decisions.md exists with a decision
Run inject again
```

**Clipboard empty?**
```
Fill in intent.md with real content
Add at least one decision to decisions.md
Run inject again
Check clipboard with Notepad
```

## Key Files

```
.cognition/
├── intent.md           ← Your project vision
├── decisions.md        ← Your non-negotiable choices
├── failures/           ← Debugging attempts
│   └── YYYY-MM-DD.md
└── config.json        ← Settings
```

## The 4 Commands

| Command | Keyboard | Does |
|---------|----------|------|
| Initialize | `Ctrl+Shift+P` init | Create .cognition/ with templates |
| View | `Ctrl+Shift+P` view | Display memory in editor |
| Log | `Ctrl+Shift+P` log | Create failure file |
| Inject | `Ctrl+Shift+P` inject | Copy memory to clipboard |

## What You're Testing

✓ Extension loads without errors
✓ Commands appear in palette
✓ Memory files create correctly
✓ Memory formatting is clean
✓ Injection to clipboard works
✓ Claude understands context

## Success Criteria

- [ ] Extension launches (F5)
- [ ] Commands appear in palette
- [ ] .cognition/ directory created
- [ ] intent.md has content
- [ ] decisions.md has content
- [ ] View command shows memory
- [ ] Log command creates file
- [ ] Inject copies to clipboard
- [ ] Pasted memory is formatted
- [ ] Claude mentions constraints

## Next Actions

1. **Document issues** - Any bugs or improvements?
2. **Test on real project** - Does it help with actual development?
3. **Try with Claude** - Does Claude actually respect decisions?
4. **Iterate** - Fix issues and test again

## Time Estimate

- Setup: 5 minutes
- First test: 15 minutes
- Claude test: 10 minutes
- **Total: ~30 minutes**

## Need Help?

- Full guide: See `FIRST_TEST_GUIDE.md`
- Setup guide: See `START_HERE.md`
- Reference: See `QUICK_REFERENCE.md`
- Details: See `COMPLETION_REPORT.md`

---

**Ready?**

```powershell
cd C:\Users\gardn\Downloads\project-cognition
code .
```

Then press **F5** and follow the 11-step flow above.
