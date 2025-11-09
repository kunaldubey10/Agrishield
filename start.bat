@echo off
echo ========================================
echo    AgriShield - Starting Servers
echo ========================================
echo.

echo Starting Frontend Server (Next.js)...
start "AgriShield Frontend" cmd /k "npm run dev"

echo Waiting 3 seconds before starting backend...
timeout /t 3 /nobreak >nul

echo Starting Backend Server (Flask)...
start "AgriShield Backend" cmd /k "npm run backend:venv"

echo.
echo ========================================
echo    Servers Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press any key to exit this window...
echo (Servers will continue running in separate windows)
pause >nul

