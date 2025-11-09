#!/bin/bash
cd "$(dirname "$0")"
if [ -f "../venv/bin/activate" ]; then
    source ../venv/bin/activate
    python app.py
elif [ -f "venv/bin/activate" ]; then
    source venv/bin/activate
    python app.py
else
    python app.py
fi

