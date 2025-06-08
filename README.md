# Microservices Project

A modern microservices-based system built with Node.js, TypeScript, gRPC, and RabbitMQ. This project demonstrates scalable service communication, event-driven architecture, and API Gateway patterns.

---

## 🏗️ Architecture Overview

```
+-------------------+         gRPC         +-------------------+
|                   | <-----------------> |                   |
|   API Gateway     |                     |   User Service    |
| (REST/GraphQL)    |                     | (CRUD, gRPC)      |
+-------------------+                     +-------------------+
        |   ^                                    |
        |   |                                    |
        v   |                                    v
+-------------------+   RabbitMQ (Events)   +-----------------------+
|                   | <-------------------> | Notification Service  |
|   Client Apps     |                       | (RabbitMQ Consumer)   |
+-------------------+                       +-----------------------+
```

---

## 📦 Services

- **API Gateway** (`api-gateway/`)
  - Exposes REST & GraphQL endpoints
  - Validates requests
  - Communicates with User Service via gRPC (port **4000**)
- **User Service** (`user-service/`)
  - Handles user CRUD operations
  - Exposes gRPC API (port **50051**)
  - Publishes user events to RabbitMQ
- **Notification Service** (`notification-service/`)
  - Listens to RabbitMQ for user creation events
  - Sends notifications (extendable)
- **RabbitMQ**
  - Message broker (ports **5672**, **15672** for management UI)

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for local development)

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd micro
```

### 2. Build & Start All Services

```sh
docker-compose up --build
```

- API Gateway: http://localhost:4000
- RabbitMQ UI: http://localhost:15672 (user/pass: guest/guest)

### 3. Stopping Services

```sh
docker-compose down
```

---

## 🛠️ Development

Each service is self-contained with its own `Dockerfile` and `package.json`.

- **API Gateway**: `cd api-gateway && npm install && npm run dev`
- **User Service**: `cd user-service && npm install && npm run dev`
- **Notification Service**: `cd notification-service && npm install && npm run dev`

> For local development, ensure RabbitMQ is running (via Docker or locally).

---

## ⚡ Project Management with manage.sh

You can use the provided `manage.sh` script to quickly manage all services from the project root:

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `./manage.sh install` | Install dependencies for all services  |
| `./manage.sh build`   | Build all services                     |
| `./manage.sh start`   | Start all services in development mode |
| `./manage.sh docker`  | Build & start all services with Docker |
| `./manage.sh stop`    | Stop all Docker containers             |

**Examples:**

```sh
./manage.sh install   # Install all dependencies
./manage.sh build     # Build all services
./manage.sh start     # Start all services (dev mode)
./manage.sh docker    # Start with Docker Compose
./manage.sh stop      # Stop Docker containers
```

---

## 🧪 Testing

- Each service can be tested independently:
  - `npm test` (inside each service folder)

---

## 📚 Usage Examples

### REST Example

```sh
curl -X POST http://localhost:4000/users \
  -H 'Content-Type: application/json' \
  -d '{"name": "Alice", "email": "alice@example.com"}'
```

### GraphQL Example

```graphql
mutation {
  createUser(name: "Bob", email: "bob@example.com") {
    id
    name
    email
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions or support, open an issue or contact the maintainer.

---

<!-- Optionally, add a real architecture diagram image here -->
<!-- ![Architecture Diagram](docs/architecture.png) -->
