#!/usr/bin/env bash
# Startet einen Sol-6.1-Lauf per codex exec im Arbeitsordner tools/quiz/arbeit/.
# Aufruf aus dem Projektordner: bash tools/quiz/sol.sh <name> "<Auftrag>"
# Beispiel: bash tools/quiz/sol.sh review-hunde "Lies tools/quiz/REVIEW.md ... Paket: hunde ..."
# Wichtig: < /dev/null, sonst wartet codex endlos auf stdin.
set -u
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
W="$ROOT/tools/quiz/arbeit"; mkdir -p "$W"
NAME="$1"; TASK="$2"
codex exec -m gpt-6.1-sol -s workspace-write -C "$ROOT" --skip-git-repo-check \
  -o "$W/result-$NAME.md" "$TASK Schreibe ausschließlich in tools/quiz/arbeit/, keine Git-Operation." \
  < /dev/null > "$W/log-$NAME.txt" 2>&1
echo "$NAME exit $?"
