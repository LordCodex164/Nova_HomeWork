# Wallet Service API (NestJS)
## Overview

This project is a simple wallet service built with NestJS and TypeScript, designed to demonstrate clean backend structure, API design, and real-world wallet logic without unnecessary complexity.

The service supports:

- Wallet creation

- Funding wallets

- Transferring funds between wallets

- Fetching wallet details with transaction history

- Authentication (JWT-based)

**Persistence** is handled using SQLite, which is sufficient for this exercise and aligns with the instruction that in-memory or simple storage is acceptable.

Tech Stack

NestJS

TypeScript

SQLite (via Sequelize)

JWT Authentication

BullMQ (for async transaction processing)

bcrypt (password hashing)

Project Structure

```text
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── auth_user.entity.ts
│
├── wallet/
│   ├── dto/
│   │   ├── create-wallet.dto.ts
│   │   ├── fund-wallet.dto.ts
│   │   └── transfer-wallet.dto.ts
│   ├── wallet.service.ts
│   ├── wallet.controller.ts
│   └── wallet.entity.ts
│
├── transaction/
│   ├── transaction.service.ts
│   ├── transaction.controller.ts
│   └── transaction.entity.ts
│
├── db/
│   └── main.sqlite
│
├── utils/
│   └── handle_error.ts
│
├── types/
│   └── response.ts
│
├── app.module.ts
└── main.ts

```

# Functional Requirements Coverage
1. Create Wallet

Allows an authenticated user to create a wallet

Wallet fields:

id

currency (default: USD)

balance (default: 0)

Wallets are associated with a user (user_id).

2. Fund Wallet

Adds a positive amount to an existing wallet

Input validation enforced via DTOs

Each funding action:

Creates a Credit transaction

Is queued for async processing via BullMQ

3. Transfer Between Wallets

Transfers funds from one wallet to another

Validations include:

Sender wallet ownership

Recipient wallet existence

Sufficient balance

Prevents negative balances

Creates:

A Debit transaction for sender

A Credit transaction for recipient

Transactions are linked for traceability

4. Fetch Wallet Details

Fetches wallet information by walletId

Includes:

Wallet balance

Associated transaction history

Authentication

The API uses JWT-based authentication.

Features:

User registration

Secure password hashing using bcrypt

Login with JWT token issuance

Protected wallet and transaction endpoints

Error Handling & Validation

DTO-based validation for request payloads

Centralized error handling via handleError

Meaningful HTTP status codes and error messages

Explicit handling for:

Invalid credentials

Insufficient balance

Invalid wallet IDs

Duplicate users

API Endpoints (Summary)
Auth

POST /auth/register – Register a new user

POST /auth/login – Login and receive JWT token

Wallet

POST /wallet – Create wallet

POST /wallet/:id/fund – Fund wallet

POST /wallet/:id/transfer – Transfer funds

GET /wallet/:id – Fetch wallet details

A Postman collection is included in the repository for easy testing.

# Setup Instructions
1. Clone Repository
git clone <repository-url>
cd wallet-service

2. Install Dependencies
npm install

3. Run Database Migrations (if applicable)

SQLite database file is located at:

src/db/main.sqlite

4. Start Application
npm run start:dev


Server runs on:

http://localhost:3000

# Assumptions Made

Each wallet belongs to a single user

Currency is fixed to USD for simplicity

SQLite is sufficient for the scope of this task

Authentication is required for all wallet operations

Balance updates are driven by transaction records

# Nice-to-Have Features Implemented

Asynchronous transaction processing using BullMQ

Clear separation of concerns (Auth, Wallet, Transaction)

DTO validation and consistent error handling

Transaction linking for transfer operations

## Notes on Scaling to Production

If this system were to scale to production:

Replace SQLite with PostgreSQL

Add database transactions for strict atomicity

Introduce idempotency keys for funding and transfers

Use Redis-backed queues for high-throughput transaction processing

Add proper observability (logging, metrics, tracing)

Introduce rate limiting and enhanced security controls