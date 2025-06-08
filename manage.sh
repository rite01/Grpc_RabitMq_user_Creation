#!/bin/bash
# manage.sh - Install dependencies and manage all microservices

set -e

COMMAND=$1

case $COMMAND in
  install)
    echo "Installing dependencies for all services..."
    npm install --prefix api-gateway
    npm install --prefix user-service
    npm install --prefix notification-service
    ;;
  build)
    echo "Building all services..."
    npm run build --prefix api-gateway
    npm run build --prefix user-service
    npm run build --prefix notification-service
    ;;
  start)
    echo "Starting all services (development mode)..."
    (cd user-service && npm run start &) 
    (cd notification-service && npm run start &)
    (cd api-gateway && npm run start &)
    wait
    ;;
  docker)
    echo "Starting all services with Docker Compose..."
    docker-compose up --build
    ;;
  stop)
    echo "Stopping all Docker containers..."
    docker-compose down
    ;;
  *)
    echo "Usage: $0 {install|build|start|docker|stop}"
    exit 1
    ;;
esac
