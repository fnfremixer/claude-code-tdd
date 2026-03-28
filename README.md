# claude-code-tdd

Fully automated TDD pipeline for Claude Code. Approve the plan once — come back to a ready-to-merge PR with green CI.

Three agents, seven reviewer phases, file system boundaries that make cheating structurally impossible.

```
you
 └─ reviewer (orchestrates everything)
      ├─ tester (writes tests BEFORE code exists)
      └─ coder (writes code to pass tests it can't modify)
```

## Why

Claude Code writes tests that validate its own bugs. It rewrites existing tests to match broken code. It hallucinates API responses. It skips its own review step when you let it orchestrate. And halfway through a cycle, it forgets the rules you gave it at the start.

All tests green. Code broken. Agent insisting it's your fault.

These roles make cheating structurally impossible through file system boundaries, phase-loaded context, and forced evidence — not instructions the model can ignore.

## Quick start

```bash
# Copy into your project
cp -r roles/ yourproject/.claude/roles/

# Launch the reviewer — it runs everything else
claude --dangerously-skip-permissions --system-prompt "$(cat .claude/roles/reviewer.md)"

# Describe your feature. Approve the plan. Walk away.
# Come back to a ready-to-merge PR with green CI.
```

## How it works

1. You describe a feature or bug to the **reviewer**
2. Reviewer shows you the plan, **waits for your OK** (functional prompts only)
3. Reviewer reads `reviewer-prompts-tester.md`, writes tester prompt → launches **tester**
4. Reviewer reads `reviewer-review-tester.md`, reviews tester's commit (tests will fail — no code yet, that's the point)
5. Reviewer reads `reviewer-prompts-coder.md`, writes coder prompt → launches **coder**
6. Reviewer reads `reviewer-review-coder.md`, reviews coder's commit → runs lint, build, test
7. Tests red → prompt to coder. No exceptions
8. All green → reviewer reads `reviewer-acceptance.md`, runs final checklist
9. Problems at acceptance → repeat from step 3 or 5
10. You come back to a ready-to-merge PR

The reviewer splits work into **functional prompts** (`func-` prefix, need your approval) and **operational prompts** (`op-` prefix, handles autonomously during a cycle). You approve once, agent does the rest.

## Phase-loaded context

The reviewer role is split into seven files. Each one is loaded at exactly the moment it's needed — fresh context at the end of the window, not rules from 200 lines ago that the model has already forgotten.

| Cycle step | File loaded | Lines |
|---|---|---|
| Write tester prompt | `reviewer-prompts-tester.md` | ~140 |
| Review tester commit | `reviewer-review-tester.md` | ~55 |
| Write coder prompt | `reviewer-prompts-coder.md` | ~70 |
| Review coder commit | `reviewer-review-coder.md` | ~61 |
| Final acceptance | `reviewer-acceptance.md` | ~35 |

The core `reviewer.md` (~90 lines) is always present as the system prompt with short anchors for critical rules — so even if a phase file is skipped, the basics are visible.

## Key rules

| Rule | Why |
|---|---|
| Tester writes only in `test/` | Can't adjust code to make bad tests pass |
| Coder writes everywhere except `test/` and roles | Can't "fix" tests instead of fixing code |
| Existing tests are read-only | Prevents silent regression rewrites |
| Mocks only at HTTP boundary | Internal logic runs for real in tests |
| API types pasted in prompt | "Verify" means nothing — "show proof" works |
| `git show --name-only` on every commit | Boundary violations = auto-reject |
| Tests red → prompt to coder, no exceptions | Coder can't reframe failure as "tests are wrong" |
| `func-`/`op-` prompt prefixes | Forces classification before writing, not after |

## Files

```
roles/
  reviewer.md                  # core identity, cycle, boundaries (~90 lines)
  reviewer-prompts-tester.md   # scenario matrix, test levels, mock rules
  reviewer-prompts-coder.md    # code prompt format, regression rules
  reviewer-review-tester.md    # how to review tester's commit
  reviewer-review-coder.md     # how to review coder's commit
  reviewer-acceptance.md       # final acceptance checklist
  tester.md                    # test agent role
  coder.md                     # code agent role
```

## Full story

**[Claude Code as a full dev team: autonomous TDD cycle from feature request to merged PR](https://dev.to/elasticlove1/claude-code-as-a-full-dev-team-autonomous-tdd-cycle-from-feature-request-to-merged-pr-463m)**

## License

MIT