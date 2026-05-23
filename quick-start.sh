#!/bin/bash
# Argus PV Quick Start Script for macOS/Linux

echo ""
echo "=========================================="
echo " Argus PV Safety Training - Quick Start"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
cd ..

echo "[2/4] Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo "=========================================="
echo " Dependencies installed successfully!"
echo "=========================================="
echo ""
echo "To start the application:"
echo ""
echo "1. Start MongoDB (if not already running)"
echo "   - Download from: https://www.mongodb.com/try/download/community"
echo "   - Run: mongod"
echo ""
echo "2. In one terminal, start the Backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. In another terminal, start the Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Access the application at: http://localhost:3000"
echo ""
echo "Sample Credentials:"
echo "   Email: admin@argus.com"
echo "   Password: demo123"
echo ""
echo "=========================================="
echo ""
