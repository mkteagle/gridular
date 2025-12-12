# Branch Protection Setup for Gridular

This document explains how to set up branch protection rules to ensure that all code pushed to the `main` branch passes CI tests.

## Why Branch Protection?

Branch protection prevents:
- Pushing broken code directly to main
- Merging pull requests with failing tests
- Bypassing code quality checks

## Setup Instructions

### Step 1: Navigate to Branch Protection Settings

1. Go to your GitHub repository: https://github.com/mkteagle/gridular
2. Click on **Settings** (top right)
3. In the left sidebar, click **Branches**
4. Under "Branch protection rules", click **Add rule** (or **Add branch protection rule**)

### Step 2: Configure Protection Rules

1. **Branch name pattern**: Enter `main`

2. **Enable the following settings**:

   ☑️ **Require a pull request before merging**
   - This prevents direct pushes to main
   - Optional: Check "Require approvals" if you want code reviews

   ☑️ **Require status checks to pass before merging**
   - Check "Require branches to be up to date before merging"
   - Under "Status checks that are required", search for and select:
     - `Test & Build` (this is the job name from our CI workflow)

   ☑️ **Require conversation resolution before merging** (optional)
   - Ensures all PR comments are resolved

   ☑️ **Include administrators** (recommended)
   - Applies these rules to repo admins too
   - Prevents accidental bypassing of rules

3. **Click "Create"** to save the rule

### Step 3: Verify the Setup

1. Try to push directly to main (it should be blocked)
2. Create a pull request instead
3. The CI workflow should automatically run
4. The PR can only be merged after CI passes

## CI Workflow

The CI workflow (`.github/workflows/ci.yml`) automatically runs:
- ✅ Linting and type checking
- ✅ All unit tests (including context menu tests)
- ✅ Production build verification

## Troubleshooting

### "Required status check not found"
If you don't see "Test & Build" in the status checks dropdown:
1. Create and merge one PR first (this registers the workflow)
2. Go back to branch protection settings
3. The status check should now appear in the dropdown

### "Push declined due to restrictions"
This is expected! Create a pull request instead of pushing directly to main.

### Workflow not running
- Ensure `.github/workflows/ci.yml` is committed to the main branch
- Check the "Actions" tab in GitHub to see workflow runs

## Current Test Coverage

Our test suite includes comprehensive tests for:
- Context menu functionality (show/hide, positioning, interactions)
- Cell and row interactions
- Sorting, filtering, and pagination
- Grouping and expandable rows
- Virtualization
- Column management

56+ tests must pass before code can be merged to main.

## For Contributors

When contributing:
1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes and add tests
3. Run tests locally: `pnpm test run`
4. Ensure build works: `pnpm build`
5. Push your branch: `git push origin feature/your-feature`
6. Create a pull request on GitHub
7. Wait for CI to pass (green checkmark)
8. Request review if needed
9. Merge after approval and passing CI

## Bypassing Protection (Emergency Only)

If you absolutely must bypass protection:
1. Go to Settings > Branches
2. Edit the branch protection rule
3. Temporarily disable checks
4. Make your change
5. **Immediately re-enable protection**

⚠️ Only do this in emergencies (e.g., critical production bug, broken CI)
