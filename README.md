# Personal Finance Management System

## Overview
This project is a backend system for managing personal finances. It includes features for budgeting, expense tracking, and financial reporting. The system is built with Node.js and Express, uses Prisma for database management, and implements JWT for user authentication.

## Features
- User registration and authentication
- CRUD operations for income and expenses
- Budget creation and tracking
- Monthly financial reports
- Category-wise expense tracking (e.g., groceries, rent, entertainment)

## Technologies Used
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Tokens)

## Database Schema
- Users Table: Stores user information.
- Transactions Table: Tracks income and expenses.
- Categories Table: Stores expense categories.
- Budgets Table: Stores budget information.
- 
## API Endpoints
### User Authentication
- Register a new user

  - URL: POST /auth/register
  - Request Body:
  ```bash
  {
    "username": "string",
    "password": "string"
  }
  ```

Login a user

URL: POST /auth/login
Request Body:
json
Copy code
{
  "username": "string",
  "password": "string"
}
Categories
Get all categories

URL: GET /categories
Requires authentication
Create a new category

URL: POST /category
Requires authentication
Request Body:
json
Copy code
{
  "name": "string"
}
Transactions
Get all transactions

URL: GET /transactions
Requires authentication
Create a new transaction

URL: POST /transaction
Requires authentication
Request Body:
json
Copy code
{
  "amount": "number",
  "type": "string",  // "income" or "expense"
  "categoryId": "number"
}
Budgets
Get all budgets

URL: GET /budget
Requires authentication
Create a new budget

URL: POST /budget
Requires authentication
Request Body:
json
Copy code
{
  "amount": "number",
  "month": "number",
  "year": "number"
}
Reports
Get category-wise transaction report
URL: GET /transactions/report
Requires authentication
Setup
Prerequisites
Node.js
PostgreSQL
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install dependencies:

sh
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/your-database-name"
JWT_SECRET="your-secret-key"
Set up the database:

sh
Copy code
npx prisma migrate dev
Start the server:

sh
Copy code
npm start
Usage
Register a new user via the /auth/register endpoint.
Authenticate the user via the /auth/login endpoint to receive a JWT token.
Use the token to access other authenticated routes (e.g., creating transactions, budgets).
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
