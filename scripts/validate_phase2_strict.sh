#!/usr/bin/env bash

set -euo pipefail

echo "======================================"
echo " PHASE 2 STRICT VALIDATION"
echo "======================================"

cd runtime

echo "[1] Clean build..."
go clean -cache
go build ./...

echo "[2] Deterministic double-run check..."

RUN1=$(go run ./cmd/runtime)
RUN2=$(go run ./cmd/runtime)

echo ""
echo "RUN 1 OUTPUT:"
echo "$RUN1"
echo ""
echo "RUN 2 OUTPUT:"
echo "$RUN2"
echo ""

if [ "$RUN1" = "$RUN2" ]; then
  echo "✔ DETERMINISM CONFIRMED (bootstrap level)"
else
  echo "✘ NON-DETERMINISTIC BOOTSTRAP DETECTED"
  exit 1
fi

echo ""
echo "PHASE 2 STRICT VALIDATION PASSED"
