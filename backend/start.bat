@echo off
cd /d "%~dp0"
if exist "..\venv\Scripts\python.exe" (
    echo Using root venv...
    ..\venv\Scripts\python.exe app.py
) else if exist "venv\Scripts\python.exe" (
    echo Using backend venv...
    venv\Scripts\python.exe app.py
) else (
    echo Using system Python...
    python app.py
)
pause

