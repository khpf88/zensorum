#!/usr/bin/env bash

set -euo pipefail

echo "Checking Zensorum Phase 2 structure..."

cd runtime

echo "Listing internal modules:"
find internal -type f -name "*.go" | sort

echo ""
echo "Checking package declarations..."
grep -R "package " internal/

echo ""
echo "Checking for orphan files..."
go list ./internal/... | wc -l

echo ""
echo "Structure audit complete."
