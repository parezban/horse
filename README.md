# Horse Management API

A Node.js-based API for managing horses and owners, including CRUD operations, role-based access, and filtering functionalities.

---

## Features

- **CRUD operations** for horses and owners.
- **Role-specific access** (admin and vet).
- **Filtering support** for the `/api/v1/horses` endpoint.
- **Integration with Firestore emulator** for local development.

---

## Prerequisites

1. **Docker** (for containerized development and Firestore emulator)
2. **Node.js** (version 18 or higher recommended)
3. **npm** (comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd horse
```

### 2. Install Dependencies

```bash
npm install
```

## Environment Variables
You need to configure the following environment variables in a `.env.development` file in the root directory:
```bash
FIRESTORE_EMULATOR_HOST=localhost:8080 # 0.0.0.0:8080 for local and firestore-emulator:8080 for docker
```

## Running the Application

### Using Docker

```bash
docker compose up -d
```

### Without Docker

```bash
npm run build
node dist/index.js
```

## Running Linting and Tests
- Lint the code:
```bash
npm run lint
```

- Run tests:
```bash
npm run test 
```

