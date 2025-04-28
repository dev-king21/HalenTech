# Ticket Management System

A full-stack application for managing customer onboarding tickets, built with React (Vite), Express.js, Prisma, and SQLite.

![App Screenshot](/screenshot.png) <!-- Add your screenshot if available -->

## Features

- **Ticket Management**:
  - View all tickets with filtering by status
  - Search tickets by customer name or email
  - View ticket details
  - Update ticket status and notes
- **Responsive UI** with Tailwind CSS
- **SQLite Database** for local development
- **Type-safe API** with Prisma ORM

## Technologies

**Frontend**:
- React 18
- Vite
- Tailwind CSS
- Axios

**Backend**:
- Node.js
- Express
- Prisma
- SQLite (for development)

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Git

## Set up the backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed

## Set up the frontend
cd ../frontend
npm install

## Configuration
Create .env in backend/:
PORT=3001
DATABASE_URL="file:./dev.db"
Create .env in frontend/:
VITE_API_BASE_URL=http://localhost:3001/api

## Start the backend
bash
cd backend
npm run dev

## Start the frontend
bash
cd ../frontend
npm run dev

## Project structure
ticket-management-system/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md