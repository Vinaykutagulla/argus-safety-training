@echo off
REM Argus PV Quick Start Script for Windows

echo.
echo ==========================================
echo  Argus PV Safety Training - Quick Start
echo ==========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo [2/4] Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo ==========================================
echo  Dependencies installed successfully!
echo ==========================================
echo.
echo To start the application:
echo.
echo 1. Start MongoDB (if not already running)
echo    - Download from: https://www.mongodb.com/try/download/community
echo    - Run: mongod
echo.
echo 2. In one terminal, start the Backend:
echo    cd backend
echo    npm run dev
echo.
echo 3. In another terminal, start the Frontend:
echo    cd frontend
echo    npm start
echo.
echo 4. Access the application at: http://localhost:3000
echo.
echo Sample Credentials:
echo   Email: admin@argus.com
echo   Password: demo123
echo.
echo ==========================================
echo.
pause
