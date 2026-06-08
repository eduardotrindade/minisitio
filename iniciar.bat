@echo off
chcp 65001 > nul
title Minisitio — Inicializador

echo.
echo ╔══════════════════════════════════════════╗
echo ║        MINISITIO — INICIADOR v2          ║
echo ║    Backend: 3032   Frontend: 3000        ║
echo ╚══════════════════════════════════════════╝
echo.

REM ── Verificar se Node existe ──────────────────────────────────────
where node > nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Node.js não encontrado. Instale em https://nodejs.org
    pause
    exit /b 1
)

REM ── Matar processos que estejam usando as portas ──────────────────
echo [1/4] Liberando portas 3032 e 3000...

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3032 " 2^>nul') do (
    if not "%%a"=="" (
        echo     Matando processo %%a na porta 3032...
        taskkill /F /PID %%a > nul 2>&1
    )
)

for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000 " 2^>nul') do (
    if not "%%a"=="" (
        echo     Matando processo %%a na porta 3000...
        taskkill /F /PID %%a > nul 2>&1
    )
)

timeout /t 2 /nobreak > nul

REM ── Verificar se .env existe no back ─────────────────────────────
echo [2/4] Verificando configuração...
if not exist "%~dp0back\.env" (
    echo [AVISO] back\.env não encontrado!
    echo         Copiando de back\.env.example...
    if exist "%~dp0back\.env.example" (
        copy "%~dp0back\.env.example" "%~dp0back\.env" > nul
        echo         .env criado. Configure as variáveis antes de continuar.
        echo         Abrindo arquivo...
        start notepad "%~dp0back\.env"
        pause
    ) else (
        echo [ERRO] back\.env.example também não encontrado!
        pause
        exit /b 1
    )
)

REM ── Iniciar Backend ───────────────────────────────────────────────
echo [3/4] Iniciando Backend na porta 3032...
cd /d "%~dp0back"
start "Minisitio Backend" cmd /k "echo BACKEND INICIADO - porta 3032 && node index.js"
timeout /t 4 /nobreak > nul

REM ── Iniciar Frontend (build estático) ───────────────────────────
echo [4/4] Iniciando Frontend na porta 3000...
cd /d "%~dp0front"

if exist "build\index.html" (
    start "Minisitio Frontend" cmd /k "echo FRONTEND INICIADO - porta 3000 && npx http-server build -p 3000 --cors -c-1"
) else (
    echo [AVISO] Build não encontrado. Iniciando em modo desenvolvimento...
    start "Minisitio Frontend Dev" cmd /k "echo FRONTEND DEV - porta 3000 && npm start"
)

timeout /t 3 /nobreak > nul

REM ── Resumo ───────────────────────────────────────────────────────
echo.
echo ╔══════════════════════════════════════════╗
echo ║           SERVIÇOS INICIADOS ✓           ║
echo ║                                          ║
echo ║  Backend:  http://localhost:3032         ║
echo ║  Frontend: http://localhost:3000         ║
echo ║  API:      http://localhost:3032/api     ║
echo ╚══════════════════════════════════════════╝
echo.

REM ── Abrir navegador ──────────────────────────────────────────────
timeout /t 2 /nobreak > nul
start http://localhost:3000

echo Pressione qualquer tecla para fechar esta janela...
echo (Os serviços continuarão rodando nas janelas abertas)
pause > nul