# KSA Requests

Full-stack prototype for internal request management.

A small internal request management system designed for organizations operating across multiple locations.

The application allows employees to submit requests and follow their progress, while providing a simple interface for managing their status.

## Key features

- Create requests
- View existing requests
- Filter requests by status
- Update request status
- Track priority, category and location
- Dashboard with request statistics
- Persistent PostgreSQL storage
- REST API

## Architecture

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

## Requirements

Node.js
npm
PostgreSQL database or Supabase project
Running locally

Clone the repository:

git clone https://github.com/Sofisr/Desafio_requests.git

cd Desafio_requests

The frontend and backend should be run in separate terminals.

## Backend
cd backend

npm install

Create a .env file:

DATABASE_URL="your_database_connection_string"

Run the database migrations and generate the Prisma client:

npx prisma migrate dev

npx prisma generate

Start the development server:

npm run dev

The API will be available at:

http://localhost:3000

## Frontend

In a second terminal:

cd frontend

npm install

npm run dev

The frontend will then be available at the URL provided by Vite.

## API
Method	Endpoint	Description
GET	/api/requests	List requests
GET	/api/requests?status=NEW	Filter requests by status
POST	/api/requests	Create request
PATCH	/api/requests/:id	Update request
Status

Functional prototype completed within the challenge timeframe.

The current version focuses on the core request management workflow. Production-oriented features such as authentication, automated testing and deployment are outside the scope of this prototype.