# Task: Implement green button with message toggle

## ⚠️ Before starting
1. Read `.claude/roles/coder.md` — this is your role
2. When done: `git add src/<files> && git commit -m "[coder] step1-2: green button message"`

## Context

The App component (spec.md, Step 1 of plan.md) must provide a green button that toggles a message display.

## Tasks

1. **Modify `src/App.tsx`** — implement the App component:
   - Render a single button with green background color (use inline style `backgroundColor: 'green'` AND set the text color to white for contrast)
   - The button text should be descriptive (e.g., "Click me" or similar)
   - Use `useState` to track whether the message is visible
   - When the button is clicked, show:
     - The text "My divine website!" (exact string)
     - A "Close" button (exact text "Close")
   - When "Close" is clicked, hide the message and the Close button
   - The green button must remain visible at all times

2. **Version**: `package.json` version is already `0.1.0` — no change needed

## Acceptance criteria

- `npm run lint` passes
- `npm run build` passes
- `npm test` passes (all tests green, including the new ones from the tester)
- The green button is always visible
- Clicking it toggles message visibility
- "Close" hides the message
