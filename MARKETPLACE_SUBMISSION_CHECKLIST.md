# Marketplace Submission Checklist

## Pre-Submission (Before Creating Publisher Account)

- [x] Code is complete and tested
  - [x] All 5 commands implemented and working
  - [x] All 6 unit tests passing (100% pass rate)
  - [x] TypeScript compilation successful with no errors
  - [x] Zero external dependencies

- [x] Documentation is complete
  - [x] MARKETPLACE_README.md created with problem/solution framing
  - [x] CHANGELOG.md documenting all features
  - [x] Comprehensive README.md with guides
  - [x] FAQ covering common questions
  - [x] Memory format specification

- [x] UX is polished
  - [x] Setup wizard for first-time users
  - [x] Better error messages with clear guidance
  - [x] All commands have help text in package.json
  - [x] No TypeScript errors

- [x] Package.json is properly configured
  - [x] Correct version (0.2.0)
  - [x] Compelling description
  - [x] All metadata fields filled (author, repository, homepage, bugs)
  - [x] Keywords optimized for discoverability
  - [x] License specified (MIT)
  - [x] All 5 commands registered

---

## Marketplace Account Setup

### Step 1: Create Publisher Account

1. [ ] Visit https://marketplace.visualstudio.com/
2. [ ] Sign in with Microsoft account (or create one)
3. [ ] Click "Publish Extensions"
4. [ ] Create new publisher:
   - Name: `cognition` (or your choice)
   - Display name: `Project Cognition`
5. [ ] Save publisher ID (you'll need it)

### Step 2: Generate Personal Access Token (PAT)

1. [ ] Go to https://dev.azure.com/
2. [ ] Create new organization if needed
3. [ ] Go to User Settings → Personal access tokens
4. [ ] Create new token:
   - Name: `vscode-extension-publish`
   - Scopes: Select "Marketplace (publish)"
   - Expiration: 1 year (or longer)
5. [ ] Copy token immediately (you won't see it again)
6. [ ] Save securely (in password manager)

### Step 3: Install VSCE Tool

```bash
npm install -g @vscode/vsce
```

Verify installation:
```bash
vsce --version
```

---

## Pre-Release Preparation

### Step 1: Update Repository Links

In `package.json`, replace these placeholders:
- `"url": "https://github.com/your-username/project-cognition"`
- `"url": "https://github.com/your-username/project-cognition/issues"`

In `MARKETPLACE_README.md`, update:
- `https://github.com/your-username/project-cognition/issues`
- `https://github.com/your-username/project-cognition/discussions`

### Step 2: Create .vscodeignore

```
.git
.gitignore
.vscode
out/test
src
*.test.ts
*.test.js
tsconfig.json
vsc-extension-quickstart.md
**/*.map
**/*.ts
package-lock.json
npm-debug.log*
TEST*.md
MARKETPLACE*.md
CHANGELOG.md
```

### Step 3: Prepare Icon (Optional but Recommended)

Create `icon.png` (128x128 pixels):
- Represents the concept of "memory" or "mind"
- Clear, recognizable
- Works at small sizes
- Transparent background

Add to package.json:
```json
"icon": "icon.png"
```

### Step 4: Final Compilation

```bash
npm run compile
npm test
```

Verify all tests pass and no TypeScript errors.

---

## Publishing to VS Code Marketplace

### Step 1: Login to VSCE

```bash
vsce login cognition
```

When prompted, paste your Personal Access Token from Step 2 above.

### Step 2: Package Extension

```bash
vsce package
```

This creates `project-cognition-0.2.0.vsix` file.

### Step 3: Publish Extension

```bash
vsce publish
```

You'll be prompted:
- Are you sure? **yes**
- Enter version (should auto-fill 0.2.0)

### Step 4: Verify Publication

1. [ ] Go to https://marketplace.visualstudio.com/items?itemName=cognition.project-cognition
2. [ ] Verify all details display correctly
3. [ ] Try installing from VS Code (should appear in Extensions)
4. [ ] Test Quick Setup wizard on new folder

---

## Post-Submission (After Publishing)

- [ ] Monitor marketplace reviews and feedback
- [ ] Respond to user issues on GitHub
- [ ] Track download statistics
- [ ] Plan future versions based on usage data

### Next Release Checklist (for 0.3.0+)

- [ ] Update version in package.json
- [ ] Add new features to CHANGELOG.md
- [ ] Compile and test: `npm run compile && npm test`
- [ ] Re-publish: `vsce publish`

---

## Important Notes

### GitHub Repository

If you haven't created a GitHub repository yet:

```bash
cd /path/to/project-cognition
git init
git add .
git commit -m "Initial commit: Project Cognition MVP with setup wizard"
git branch -M main
git remote add origin https://github.com/your-username/project-cognition.git
git push -u origin main
```

Then add a `README.md` (different from MARKETPLACE_README.md) that explains how to develop/contribute to the extension.

### Naming Convention

- Extension name: `project-cognition` (lowercase, hyphens)
- Publisher: `cognition` (lowercase)
- Display name: `Project Cognition` (title case)
- Full ID: `cognition.project-cognition`

### Version Numbering

Currently: **0.2.0**

Semantic Versioning:
- **0.x.y** = Pre-release (not yet feature-complete)
- **1.0.0** = First stable release
- **2.0.0** = Major breaking changes

Current trajectory: Plan for 1.0.0 after reaching:
- 100+ downloads
- User feedback integrated
- 5+ positive reviews

---

## Marketing (Optional)

After publishing, consider:

1. [ ] Post on Reddit (r/vscode, r/webdev, r/learnprogramming)
2. [ ] Share on Twitter/X
3. [ ] Post on Hacker News
4. [ ] Add to VS Code extension lists
5. [ ] Write blog post about the extension

---

## Support & Maintenance

- [ ] Monitor GitHub issues daily for first week
- [ ] Respond to comments within 24 hours
- [ ] Plan minor updates for bugs (0.2.1, 0.2.2, etc.)
- [ ] Plan features for 0.3.0 based on feedback

---

## Troubleshooting

### "vsce login" fails
- Verify Personal Access Token is valid
- Check token hasn't expired
- Ensure token has "Marketplace (publish)" scope

### "vsce publish" fails with auth error
- Run `vsce logout`
- Run `vsce login cognition` again
- Paste token carefully (no extra spaces)

### Extension doesn't appear in marketplace
- Check publisher name matches package.json
- Wait 5-10 minutes (marketplace indexes periodically)
- Go directly to: `https://marketplace.visualstudio.com/items?itemName=cognition.project-cognition`

### Tests fail before publishing
- Run `npm run compile` first
- Delete `out/` directory and recompile
- Ensure Node.js version is 16+

---

**You're ready! Follow the steps above to publish Project Cognition to the VS Code Marketplace. 🚀**
