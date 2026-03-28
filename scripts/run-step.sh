#!/usr/bin/env bash
#
# Run tester or coder agent for a given step.
#
# Usage:
#   ./scripts/run-step.sh tester 12     # run tester for step 12
#   ./scripts/run-step.sh coder 12      # run coder for step 12
#
set -euo pipefail

ROLE="${1:?Usage: $0 <tester|coder> <step-number>}"
STEP="${2:?Usage: $0 <tester|coder> <step-number>}"

# ── Validate role ──
if [[ "$ROLE" != "tester" && "$ROLE" != "coder" ]]; then
  echo "ERROR: role must be 'tester' or 'coder', got '$ROLE'" >&2
  exit 1
fi

# ── Find prompt ──
PROMPT=$(ls prompts/${ROLE}/step${STEP}-*.md 2>/dev/null | head -1)
[[ -z "$PROMPT" ]] && { echo "ERROR: No prompt found in prompts/${ROLE}/step${STEP}-*.md" >&2; exit 1; }

ROLE_FILE=".claude/roles/${ROLE}.md"
[[ ! -f "$ROLE_FILE" ]] && { echo "ERROR: Role file not found: $ROLE_FILE" >&2; exit 1; }

LOGFILE="/tmp/marshall-${ROLE}-step${STEP}.log"

echo "═══════════════════════════════════════"
echo "  Role:   $ROLE"
echo "  Step:   $STEP"
echo "  Prompt: $PROMPT"
echo "  Log:    $LOGFILE"
echo "═══════════════════════════════════════"
echo ""

claude -p \
  --system-prompt "$(cat "$ROLE_FILE")" \
  --dangerously-skip-permissions \
  --model sonnet \
  --verbose \
  "Read the file $PROMPT — this is your task. Execute ALL instructions in the prompt." \
  2>&1 | tee "$LOGFILE"

echo ""
echo "═══ Done. Log saved to $LOGFILE ═══"
