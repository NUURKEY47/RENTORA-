# Rentora — Commercial Plaza & Real Estate Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v20.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.x-000000.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v18.x-61DAFB.svg)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-v5.x-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-4169E1.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED.svg)](https://www.docker.com/)

> A production-grade, multi-tenant commercial plaza and real estate management SaaS engineered to automate M-Pesa rent collections, floor-by-floor stall tracking, tenant onboarding, and financial reconciliation in Nairobi, Kenya.

🔗 **Live Web Application**: [https://rentora.cc](https://rentora.cc)  
📚 **Interactive Swagger API Documentation**: [https://api.rentora.cc/docs](https://api.rentora.cc/docs)

---

## 🌟 Key Platform Features

- **Commercial Plaza & Stall Matrix**: Floor-by-floor visual tracking of 100+ shopping stalls with real-time status (Paid 🟢 | Overdue 🔴 | Vacant 🟡).
- **M-Pesa Automated Rent Collection**: Direct M-Pesa Daraja API integration with STK Push prompts and automated digital receipts.
-  **Role-Based Access Control (RBAC)**: Secure multi-role architecture (`ADMIN`, `LANDLORD`, `TENANT`) using Bearer JWT tokens and Bcrypt salt hashing.
-  **Anti-Enumeration & Security**: Generic authentication error handling, Zod schema input validation, and password strength regex rules.
-  **Self-Service User Profiles**: Profile details editing, password changes, and cryptographic SHA-256 password reset tokens with 1-hour expiration.
-  **1-Click Financial Analytics**: Automated revenue statements, overdue rent audits, and tenant audit ledgers.

---

## 5-Layer Backend Architecture

Rentora follows a strict **Clean 5-Layer Backend Pattern**:

- **Routes (`src/modules/*/routes.js`)**: Handles URL endpoint routing and HTTP methods.
- **Guards (`src/middlewares/*`)**: JWT authentication verification (`verifyToken`) and Zod schema validation (`validate`).
- **Controllers (`src/modules/*/controller.js`)**: Extracts parameters and packages JSON responses `{ status, message, data }`.
- **Services (`src/modules/*/service.js`)**: Contains pure business logic, Bcrypt encryption, and security constraints.
- **Repositories (`src/modules/*/repository.js`)**: Executes database queries using Prisma ORM with explicit `select` rules (excluding password hashes).

---

## 📂 Project Structure

```text
Property-Management-API/
├── backend/
│   ├── src/
│   │   ├── config/          # Prisma PostgreSQL client instance
│   │   ├── middlewares/     # JWT Auth, Zod validation, global error handler
│   │   ├── modules/
│   │   │   ├── auth/        # Login, Register, Password Reset, FirstAdmin
│   │   │   ├── user/        # User CRUD, Profile, Password edit, managedById
│   │   │   ├── property/    # Property & Plaza CRUD, Landlord assignment
│   │   │   ├── unit/        # Unit & Stall CRUD, Vacancy management
│   │   │   ├── landlord/    # Landlord portfolio & dashboard stats
│   │   │   └── tenant/      # Tenant onboarding & unit assignment
│   │   ├── utils/           # AppError, sendResponse, catchAsync
│   │   └── server.js        # Express server entry point
│   ├── docs/                # OpenAPI / Swagger specification (swagger.yml)
│   ├── prisma/
│   │   └── schema.prisma    # PostgreSQL database schema & models
│   └── Dockerfile
├── frontend/                # React (Vite) Single Page Application
├── docker-compose.yml       # Production multi-container orchestration
└── Caddyfile                # Reverse proxy & automatic SSL/HTTPS routing
