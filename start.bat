@echo off
cd /d "%~dp0"
echo Open http://localhost:8001 in your browser. Press Ctrl+C to stop.
start "" http://localhost:8001
python -m http.server 8001
