<#
.SYNOPSIS
  Bootstrap a fresh git worktree for rose-ai-homepage.

.DESCRIPTION
  Two idempotent steps. Safe to re-run.

    1. Sync .env.local from the main worktree
       (.env.local is .gitignore'd, so `git worktree add` never copies it,
        and lib/env.ts throws at module-load if required keys are missing.)

    2. npm install
       (Each worktree needs its own node_modules. next/font/local resolves
        the pretendard woff2 path at compile time relative to lib/fonts.ts,
        so a parent project's node_modules won't satisfy the bundler.)

.EXAMPLE
  pwsh -File .claude/scripts/setup-worktree.ps1
#>

$ErrorActionPreference = "Stop"

$worktreeRoot = (git -C $PSScriptRoot rev-parse --show-toplevel).Replace('/', '\')

# --git-common-dir returns an absolute path from a linked worktree,
# and the literal '.git' (relative) when run inside the main worktree.
$commonDirRaw = git -C $worktreeRoot rev-parse --git-common-dir
$commonDir = if ([System.IO.Path]::IsPathRooted($commonDirRaw)) {
    $commonDirRaw.Replace('/', '\')
} else {
    (Join-Path $worktreeRoot $commonDirRaw)
}
# Split-Path is a pure string op; avoids Get-Item failing on hidden .git
$mainRepo = (Split-Path -Parent $commonDir)
$isWorktree = $worktreeRoot -ne $mainRepo

Write-Host "Worktree : $worktreeRoot"
Write-Host "Main repo: $mainRepo"
Write-Host ""

# 1. .env.local --------------------------------------------------------------
$worktreeEnv = Join-Path $worktreeRoot ".env.local"
$mainEnv = Join-Path $mainRepo ".env.local"

if (Test-Path $worktreeEnv) {
    Write-Host "[env]  .env.local present - skip"
} elseif ($isWorktree -and (Test-Path $mainEnv)) {
    Copy-Item $mainEnv $worktreeEnv
    Write-Host "[env]  copied from main repo"
} else {
    Write-Host "[env]  WARNING: no .env.local found. Create one from .env.local.example."
}

# 2. node_modules ------------------------------------------------------------
$nodeModules = Join-Path $worktreeRoot "node_modules"
if (Test-Path $nodeModules) {
    Write-Host "[deps] node_modules present - skip"
} else {
    Write-Host "[deps] npm install (~30s)..."
    Push-Location $worktreeRoot
    try { & npm install } finally { Pop-Location }
    Write-Host "[deps] installed"
}

Write-Host ""
Write-Host "Ready. Run: npm run dev"
