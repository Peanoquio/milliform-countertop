# ESLint & Pre-commit Hooks

## Overview

This project uses ESLint with Husky and lint-staged to automatically check code quality before commits. ESLint issues are automatically fixed when possible, preventing problems from being pushed to the repository.

## How It Works

### Pre-commit Hook Flow

When you run `git commit`:

1. **Husky** intercepts the commit
2. **lint-staged** runs ESLint on only the files you've staged for commit
3. **ESLint** automatically fixes any fixable issues
4. Fixed files are automatically staged again
5. Commit proceeds (or fails if there are unfixable issues)

```
git commit
    ↓
.husky/pre-commit (husky)
    ↓
npx lint-staged
    ↓
ESLint --fix on staged files
    ↓
Commit completes (or shows errors)
```

## Available Commands

### Check for linting issues (without fixing)
```bash
npm run lint
```

### Automatically fix linting issues
```bash
npm run lint:fix
```

### Manual commit (pre-commit hook runs automatically)
```bash
git commit -m "Your message"
```

## Configuration

### ESLint Configuration
- **File**: `.eslintrc.json` (via package.json `eslintConfig`)
- **Extends**: `react-app` (Create React App default rules)
- **Scope**: `src/**/*.{js,jsx}`

### Husky Configuration
- **File**: `.husky/pre-commit`
- **Hook**: Runs on every commit
- **Command**: `npx lint-staged`

### lint-staged Configuration
- **File**: `package.json` → `"lint-staged"`
- **Files**: `src/**/*.{js,jsx}`
- **Actions**: 
  - Run ESLint with `--fix` flag
  - Auto-stage fixed files

## Workflow Examples

### Example 1: Issue is automatically fixed

```bash
$ git add src/MyComponent.js
$ git commit -m "Add new component"

# Husky runs pre-commit hook
# ESLint finds and fixes spacing issues
# Files are auto-staged
# Commit succeeds ✓
```

### Example 2: Issue cannot be auto-fixed

```bash
$ git add src/MyComponent.js
$ git commit -m "Add new component"

# Husky runs pre-commit hook
# ESLint finds a rule violation it can't fix
# Commit is blocked ✗
# Error message shows the issue and line number
# You fix the issue manually
$ git add src/MyComponent.js
$ git commit -m "Add new component"
# Now commit succeeds ✓
```

### Example 3: Preview issues before committing

```bash
$ npm run lint
# Shows all linting issues in your code

$ npm run lint:fix
# Automatically fixes all fixable issues
```

## Bypassing the Hook (Not Recommended)

If you need to bypass the pre-commit hook in an emergency:

```bash
git commit --no-verify -m "Emergency fix"
```

**⚠️ Warning**: This bypasses all safety checks. Only use for genuine emergencies and plan to fix issues afterward.

## Troubleshooting

### "pre-commit hook failed"

1. Run `npm run lint` to see the issues
2. Run `npm run lint:fix` to auto-fix issues
3. Commit again

### "Permission denied" on .husky/pre-commit

```bash
chmod +x .husky/pre-commit
```

### Hook not running

Ensure Husky is properly installed:
```bash
npm install
npx husky install
```

## CI/CD Integration

The same ESLint checks can be run in your CI/CD pipeline:

```bash
npm run lint
# In GitHub Actions, GitLab CI, etc.
```

This ensures code quality is maintained even if developers bypass local hooks.

## Customizing ESLint Rules

To modify ESLint rules, edit `package.json` → `eslintConfig`:

```json
"eslintConfig": {
  "extends": ["react-app"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

Then reinstall hooks:
```bash
npm install
npx husky install
```
