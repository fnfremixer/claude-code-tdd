#!/usr/bin/env bash
#
# Run tester or coder agent for a given prompt.
#
# Usage:
#   ./scripts/run-step.sh tester prompts/tester/fix-orphan-pr-1-tests.md
#   ./scripts/run-step.sh coder  prompts/coder/fix-orphan-pr-1-code.md
#
set -euo pipefail

ROLE="${1:?Usage: $0 <tester|coder> <prompt-path>}"
PROMPT="${2:?Usage: $0 <tester|coder> <prompt-path>}"

# ── Validate role ──
if [[ "$ROLE" != "tester" && "$ROLE" != "coder" ]]; then
  echo "ERROR: role must be 'tester' or 'coder', got '$ROLE'" >&2
  exit 1
fi

# ── Validate prompt ──
[[ ! -f "$PROMPT" ]] && { echo "ERROR: Prompt file not found: $PROMPT" >&2; exit 1; }

ROLE_FILE="./roles/${ROLE}.md"
[[ ! -f "$ROLE_FILE" ]] && { echo "ERROR: Role file not found: $ROLE_FILE" >&2; exit 1; }

LOGNAME=$(basename "$PROMPT" .md)
PROJECT=$(basename "$(pwd)")
LOGFILE="/tmp/${PROJECT}-${ROLE}-${LOGNAME}.log"

echo "═══════════════════════════════════════"
echo "  Role:   $ROLE"
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
