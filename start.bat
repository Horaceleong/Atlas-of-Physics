@echo off
cd /d %~dp0
echo Atlas of Physics  ->  http://127.0.0.1:8137
start "" http://127.0.0.1:8137
python -m http.server 8137
