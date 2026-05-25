# Enterprise Resource Planning (ERP) Backend

This is a robust backend setup for an ERP system using Express, Prisma ORM, and ESM.

## Features

- **ES Modules**: Native JavaScript modules.
- **Prisma ORM**: Type-safe database access.
- **Express**: Fast, unopinionated web framework.
- **Security**: Helmet, CORS.
- **Logging**: Morgan.
- **Error Handling**: Centralized error handling.
- **Structure**: Modular architecture (Controllers, Services, Routes).

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Copy `.env.example` to `.env` and update your database credentials.
    ```bash
    cp .env.example .env
    ```

3.  **Database Setup**
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

## Folder Structure

- `src/config`: Configuration files (Prisma client, etc.)
- `src/controllers`: Request handlers
- `src/services`: Business logic
- `src/routes`: API routes definition
- `src/middlewares`: Express middlewares (Error handling, Auth)
- `src/utils`: Helper functions
