# Task: Tests for green button with message toggle

## ⚠️ Before starting
1. Read `.claude/roles/tester.md` — this is your role
2. When done: `git add test/<files> && git commit -m "[tester] step1-1: green button message tests"`

## Context

The App component (spec.md) must:
- Show a single green button on the page
- Clicking the button displays the message "My divine website!" and a "Close" button
- Clicking "Close" hides the message (and the Close button)

## Test file

Create `test/App.test.tsx`

## Scenario matrix

### Unit tests — App component rendering

| # | Scenario | Input | Expected |
|---|----------|-------|----------|
| 1 | Initial render | Mount `<App />` | Green button is visible in the document |
| 2 | No message initially | Mount `<App />` | Text "My divine website!" is NOT in the document |
| 3 | No close button initially | Mount `<App />` | "Close" button is NOT in the document |
| 4 | Button is green | Mount `<App />` | The button has green background color (rgb or hex — assert on `style.backgroundColor` or a CSS class) |

### Integration tests — user interaction flow

| # | Scenario | Action | Expected |
|---|----------|--------|----------|
| 5 | Click shows message | Click the green button | "My divine website!" text appears in the document |
| 6 | Click shows close button | Click the green button | A "Close" button appears in the document |
| 7 | Close hides message | Click green button → Click "Close" | "My divine website!" is removed from the document |
| 8 | Close hides close button | Click green button → Click "Close" | "Close" button is removed from the document |
| 9 | Green button remains after close | Click green button → Click "Close" | The green button is still visible |

### Lifecycle tests — repeated interactions

| # | Scenario | Action | Expected |
|---|----------|--------|----------|
| 10 | Re-open after close | Click → Close → Click again | "My divine website!" appears again |
| 11 | Multiple cycles | Click → Close → Click → Close → Click | Message is visible after the last click |

## Technical notes

- Use `@testing-library/react` (`render`, `screen`) and `@testing-library/user-event` for interactions
- Import `{ describe, it, expect }` from `vitest`
- Use `userEvent.click()` for button clicks (not `fireEvent`)
- For green color: assert on inline style (`style.backgroundColor`) or check for a CSS class — the coder will decide the approach, so test both options (check that EITHER inline green OR a class like `.green-button` exists)
- Do NOT create any files in `src/`
