@echo off
echo ==========================================
echo   Arc Blueprint Tracker - Update Script
echo ==========================================
echo Starting update from GitHub...

:: Change to the repository directory
cd /d "%~dp0"

echo [1/4] Fetching latest changes...
git fetch origin

echo [2/4] Resetting local files to match remote (main)...
echo WARNING: This will override any unsaved local changes!
git reset --hard origin/main

echo [3/4] Cleaning untracked files...
git clean -fd

echo [4/4] Updating dependencies...
call npm install

echo ==========================================
echo   Update complete!
echo ==========================================
pause
