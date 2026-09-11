#!/usr/bin/env bash
set -euo pipefail
cd /workspace
if curl -sf -m 2 http://127.0.0.1:8080/ >/dev/null; then
  exit 0
fi
npm run dev
