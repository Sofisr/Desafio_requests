# KSA Requests

Full-stack prototype for internal request management.

A small internal request management system designed for organizations operating across multiple locations.

The application allows employees to submit requests and follow their progress, while providing a simple interface for managing their status.

## Key Features

* Create requests
* View existing requests
* Filter requests by status
* Update request status
* Track priority, category and location
* Dashboard with request statistics
* Persistent PostgreSQL storage
* REST API

## Architecture

```text
                 ┌──────────────────┐
                 │   React + Vite   │
                 │    Frontend      │
                 └────────┬─────────┘
                          │
                       REST API
                          │
                 ┌────────▼─────────┐
                 │ Node.js +        │
                 │ Express          │
                 └────────┬─────────┘
                          │
                       Prisma
                          │
                 ┌────────▼─────────┐
                 │   PostgreSQL     │
                 │    Supabase      │
                 └──────────────────┘
```

## Requirements

* Git
* Node.js
* npm
* PostgreSQL database or Supabase project

## Installation

Clone the repository:

```bash
git clone https://github.com/Sofisr/Desafio_requests.git
cd Desafio_requests
```

The frontend and backend should be run in separate terminals.

### Backend

In the first terminal:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="postgresql://username:password@host:5432/postgres"
```

Replace the example value with your actual PostgreSQL connection string.

If using Supabase:

1. Open your Supabase project.
2. Go to **Project Settings → Database**.
3. Copy the PostgreSQL connection string.
4. Add it as the value of `DATABASE_URL`.

Do not commit the `.env` file to the repository.

### Database Setup

Generate the Prisma Client and run the database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### Start the Backend

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at the URL provided by Vite, usually:

```text
http://localhost:5173
```

## API

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/requests`            | List requests             |
| GET    | `/api/requests?status=NEW` | Filter requests by status |
| POST   | `/api/requests`            | Create request            |
| PATCH  | `/api/requests/:id`        | Update request status     |

## Scope

Functional prototype completed within the challenge timeframe.

The current version focuses on the core request management workflow. Production-oriented features such as authentication, automated testing and deployment are outside the scope of this prototype.
