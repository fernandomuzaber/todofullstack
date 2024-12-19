#!/bin/bash

# Backend and Frontend Startup Script
# This script will start both the backend (NestJS) and the frontend (Angular) servers.

echo "Starting Backend (NestJS)..."

# Navigate to the backend folder and start the NestJS server
cd backend || exit
npm run start:dev &

# Store the backend process ID
BACKEND_PID=$!

echo "Backend started successfully. Backend PID: $BACKEND_PID"

echo "Starting Frontend (Angular)..."

# Navigate to the frontend folder and start the Angular development server
cd ../frontend || exit
ng serve --open &

# Store the frontend process ID
FRONTEND_PID=$!

echo "Frontend started successfully. Frontend PID: $FRONTEND_PID"

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID


