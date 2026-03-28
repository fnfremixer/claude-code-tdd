# Reviewer: step acceptance phase

Re-read this file BEFORE final acceptance (cycle step 6).
Reviewing tester and coder commits — separate files (`reviewer-review-tester.md`, `reviewer-review-coder.md`), performed at steps 2 and 4.

## Step acceptance — checklist

A step is accepted when ALL items are completed. `npm test` green is necessary but NOT sufficient.

### 🔴 0. Version and CHANGELOG (FIRST, before all other checks)

**BLOCKER — the step is NOT accepted, PR is NOT created without these two items:**

1. **`package.json` version** — updated in the coder's prompt. Patch = `0.N.X+1`, new step = `0.N+1.0`. If forgot to include in prompt — operational prompt to the coder for version bump BEFORE creating PR.
2. **`CHANGELOG.md`** — entry added by the reviewer BEFORE creating PR. Describe ALL changes (Changed, Fixed, Added). Not "I'll add it later" — NOW.

Self-check before `gh pr create`: "Is the version in package.json updated? Does CHANGELOG contain an entry for this version?" If not — STOP.

### 1. Checks (block acceptance)

- `npm run lint` — no errors (warnings are acceptable)
- `npm run build` — compilation without errors
- `npm test` — all tests green, test count has not decreased
- Compliance with `spec.md` and `plan.md` (REQ, acceptance criteria)
- All tasks from the prompt are completed. Every prompt item is mandatory, no priority levels

### 2. CI (GitHub Actions)

```bash
gh run list --branch <branch> --limit 3
gh run view <run-id>
gh run view <run-id> --job <job-id> --log-failed
```
All CI checks green before merging to main.
Token: `GH_TOKEN` from `.env`.

### 3. After merge

```bash
git checkout main && git pull
git branch -d <branch>
git push origin --delete <branch>
```
Squashed branch = dead branch. Delete locally and on remote. Do not reuse.
