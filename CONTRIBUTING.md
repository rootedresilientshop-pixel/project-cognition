# Contributing to Project Cognition

Thank you for considering contributing to Project Cognition! This is an open source project built by developers, for developers. Whether you're fixing a bug, adding a feature, improving documentation, or just sharing feedback, we'd love your help.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Style Guide](#style-guide)
- [Project Architecture](#project-architecture)

---

## Code of Conduct

This project is dedicated to providing a welcoming and inspiring community for all. We respect all contributors regardless of:
- Experience level
- Gender, gender identity, or gender expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race or ethnicity
- Religion
- National origin
- Political beliefs

**Be kind. Be respectful. Help each other grow.**

---

## Getting Started

### Familiarize Yourself with the Project

1. **Read the [README.md](README.md)** - Understand what Project Cognition does
2. **Try the extension** - Install it and use it to understand the user experience
3. **Check the [issues](https://github.com/rootedresilientshop-pixel/project-cognition/issues)** - See what people are asking for
4. **Review [CHANGELOG.md](CHANGELOG.md)** - Understand what's been built

### Fork and Clone

```bash
# Fork the repository on GitHub (click the Fork button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/project-cognition.git
cd project-cognition

# Add upstream remote for syncing
git remote add upstream https://github.com/rootedresilientshop-pixel/project-cognition.git
```

---

## Development Setup

### Prerequisites

- Node.js 16+
- npm 8+
- VS Code (for testing the extension)
- Git

### Install and Build

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run compile

# Watch mode (automatically recompiles on file changes)
npm run watch
```

### Running the Extension

1. Open the project in VS Code
2. Press `F5` to launch the extension in debug mode
3. A new VS Code window will open with the extension loaded
4. Test the commands by pressing `Ctrl+Shift+P` and searching for "Project Cognition"

### Running Tests

```bash
# Run all tests
npm test

# Tests are located in src/__tests__/
# Use Node's built-in test runner (no external test framework)
```

### Linting

```bash
# Check for style issues
npm run lint

# ESLint is configured in .eslintrc.json
```

---

## How to Contribute

### Types of Contributions

**Bug Fixes**
- Fix errors in the code
- Improve error handling
- Resolve failing tests

**Features**
- Add new commands
- Enhance existing commands
- Improve the memory format
- Add support for new AI tools

**Documentation**
- Improve README
- Add API documentation
- Create guides and tutorials
- Fix typos and grammar

**Testing**
- Add unit tests
- Improve test coverage
- Test edge cases

**Refactoring**
- Clean up code
- Improve performance
- Simplify logic
- Remove technical debt

### Finding Something to Work On

1. **Look at [Issues](https://github.com/rootedresilientshop-pixel/project-cognition/issues)**
   - Issues labeled `good first issue` are perfect for newcomers
   - Issues labeled `help wanted` are specifically looking for contributors

2. **Check the [Roadmap](DEVELOPMENT_ROADMAP.md)**
   - See what's planned and pick something that interests you

3. **Found a bug?**
   - [Report it](https://github.com/rootedresilientshop-pixel/project-cognition/issues/new?labels=bug)
   - Then fix it and submit a PR!

---

## Commit Guidelines

Write clear, descriptive commit messages. This helps others understand your changes.

### Format

```
<type>: <subject>

<body>

<footer>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, or tools

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize the first letter
- No period (.) at the end
- Limit to 50 characters

### Body

- Explain WHAT and WHY, not HOW
- Wrap at 72 characters
- Separate from subject by a blank line
- Use bullet points for multiple points

### Footer

- Reference issue numbers: `Closes #123` or `Fixes #456`

### Examples

```
feat: add memory visualization sidebar

Users can now see their project memory in a sidebar view instead of
just through the clipboard injection. This makes it easier to browse
and edit memory files.

Closes #42
```

```
fix: prevent duplicate failures when logging attempt

The log failure command was creating duplicate entries when the same
problem was logged twice in the same day.

Fixes #89
```

```
docs: add contributing guide

Add comprehensive CONTRIBUTING.md with setup instructions, code style
guidelines, and PR process.
```

---

## Pull Request Process

### Before You Start

1. **Create an issue first** (unless it's a small fix)
   - Discuss the problem or feature
   - Get feedback before investing time

2. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Keep it focused**
   - One feature or bug fix per PR
   - Don't bundle multiple changes

### Making Changes

1. **Write code**
   - Follow the [Style Guide](#style-guide)
   - Add comments for complex logic
   - Update related documentation

2. **Test your changes**
   ```bash
   npm run compile
   npm test
   npm run lint
   ```

3. **Test manually**
   - Press `F5` in VS Code to run the extension
   - Test all affected commands
   - Try edge cases

4. **Commit with clear messages**
   - Follow [Commit Guidelines](#commit-guidelines)

### Submitting Your PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Compare your branch with `main`

3. **Fill in the PR template**
   - Describe what you changed
   - Explain WHY you changed it
   - Reference any related issues: `Closes #123`
   - Include before/after examples if applicable

### PR Description Template

```markdown
## Description
Brief explanation of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Test improvements

## Related Issue
Closes #123

## How to Test
Steps to verify the change works:
1. Open the extension
2. Run command X
3. Verify Y happens

## Checklist
- [ ] Code compiles without errors
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Changes follow the style guide
```

### Review Process

1. **Maintainers will review your PR**
   - We might ask for changes
   - Feedback is about the code, not you
   - We're here to help!

2. **Address feedback**
   - Make requested changes
   - Push to the same branch (no need for new PR)
   - Comment when done: "Addressed feedback, ready for re-review"

3. **PR is approved and merged**
   - Celebrate! 🎉
   - Your contribution is now part of the project

---

## Reporting Bugs

### Before Reporting

1. Check if the bug is already reported in [Issues](https://github.com/rootedresilientshop-pixel/project-cognition/issues)
2. Try reproducing with the latest version
3. Check if it happens in a clean VS Code window (F5 debug mode)

### How to Report

Click [New Issue](https://github.com/rootedresilientshop-pixel/project-cognition/issues/new?labels=bug) and include:

1. **Title**: Clear, concise description of the bug
2. **Environment**:
   - VS Code version (Help → About)
   - Extension version (see in About)
   - OS and version
   - Node version (if relevant)

3. **Reproduction Steps**:
   ```
   1. Open a project in VS Code
   2. Run command X
   3. Do Y
   4. See Z (unexpected behavior)
   ```

4. **Expected Behavior**: What should have happened

5. **Actual Behavior**: What actually happened

6. **Screenshots/Logs**: If applicable

7. **Workaround**: If you found a workaround, share it

---

## Suggesting Features

### Before Suggesting

1. Check if it's already suggested in [Issues](https://github.com/rootedresilientshop-pixel/project-cognition/issues)
2. Check if it's in the [Roadmap](DEVELOPMENT_ROADMAP.md)

### How to Suggest

Click [New Issue](https://github.com/rootedresilientshop-pixel/project-cognition/issues/new?labels=enhancement) and include:

1. **Title**: Clear, concise description of the feature

2. **Problem It Solves**: What problem does this address?
   ```
   Currently, I can't [do X], which makes [doing Y] difficult.
   ```

3. **Proposed Solution**: How should it work?
   ```
   I suggest adding a [new command/UI element] that allows users to [do X].
   ```

4. **Example Workflow**:
   ```
   1. User does X
   2. They see Y
   3. They can now Z
   ```

5. **Alternatives Considered**: Any other approaches?

6. **Additional Context**: Screenshots, examples, related issues

---

## Style Guide

### TypeScript

- **File naming**: `camelCase.ts` for files, `PascalCase` for classes
- **Variable naming**: `camelCase` for variables and functions, `UPPER_CASE` for constants
- **Formatting**: 2-space indentation (configured in `.prettierrc`)
- **Semicolons**: Required
- **Type annotations**: Always use types, avoid `any`

```typescript
// Good
const maxRetries: number = 3;
function getUserName(userId: string): string {
  // ...
}

// Avoid
const maxRetries = 3;
function getUserName(userId) {
  // ...
}
```

### Comments

- Write comments for WHAT and WHY, not HOW
- Use `//` for single-line, `/* */` for multi-line
- Keep comments up-to-date with code

```typescript
// Good - explains WHY
// We retry up to 3 times because the API is occasionally unstable
const maxRetries = 3;

// Avoid - explains HOW (obvious from code)
// Set maxRetries to 3
const maxRetries = 3;
```

### Error Handling

- Use custom error types when possible
- Provide helpful error messages
- Always handle async errors

```typescript
// Good
if (!workspace) {
  throw new Error('No VS Code workspace open. Please open a folder first.');
}

// Avoid
if (!workspace) {
  throw new Error('Error');
}
```

### Testing

- Write tests for new features
- Aim for meaningful coverage, not 100%
- Test edge cases

```typescript
// Good - tests the actual behavior
test('injects memory with all sections', () => {
  const memory = injectMemory({ intent: 'Test', decisions: [] });
  expect(memory).toContain('[PROJECT COGNITION');
  expect(memory).toContain('Test');
});

// Avoid - tests too basic
test('injectMemory returns a string', () => {
  expect(typeof injectMemory({}) === 'string').toBe(true);
});
```

---

## Project Architecture

### Directory Structure

```
src/
├── extension.ts              # Entry point, command registration
├── commands/
│   ├── quickSetup.ts        # Quick setup wizard
│   ├── initProject.ts       # Initialize memory
│   ├── viewMemory.ts        # View memory
│   ├── injectMemory.ts      # Inject to clipboard
│   └── logFailure.ts        # Log failed attempt
├── memoryEngine.ts           # Core memory read/write/format logic
├── uiDialogs.ts              # Input/output dialogs
└── __tests__/
    ├── memoryEngine.test.ts
    ├── injectMemory.test.ts
    └── commands.test.ts
```

### Key Files

- **extension.ts**: Registers commands and manages lifecycle
- **memoryEngine.ts**: Reads/writes `.cognition/` folder, formats memory
- **uiDialogs.ts**: Shows input boxes, quick picks, messages
- **commands/**: Each command is isolated for testability

### Adding a New Command

1. Create file in `src/commands/myCommand.ts`
2. Export function: `export async function myCommandHandler()`
3. Register in `extension.ts`:
   ```typescript
   vscode.commands.registerCommand(
     'projectCognition.myCommand',
     myCommandHandler
   );
   ```
4. Add to VS Code manifest in `package.json`:
   ```json
   {
     "command": "projectCognition.myCommand",
     "title": "Project Cognition: My Command"
   }
   ```
5. Add tests in `src/__tests__/`

---

## Questions?

- **GitHub Issues**: [Ask in discussions](https://github.com/rootedresilientshop-pixel/project-cognition/discussions)
- **Need help getting started?**: Comment on an issue and ask!
- **Want to chat?**: Open a new discussion

---

## Thank You!

Every contribution, no matter how small, makes this project better. We truly appreciate your help!

**Happy coding!** 🚀
