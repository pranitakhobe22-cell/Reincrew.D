@echo off
title Reincrew.AI Server
cd /d "%~dp0backend"
echo.
echo   Starting Reincrew.AI...
echo.
start "" http://localhost:5555/index.html
node server.js
pause
