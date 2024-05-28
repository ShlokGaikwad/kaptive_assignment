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
  
## API Endpoints
### User Authentication
- Register a new user

  - URL: POST /register
  - Request Body:
  ```bash
  {
    "username": "string",
    "password": "string"
  }
  ```

- Login a user

  - URL: POST /login
  - Request Body:
  ```bash
    {
      "username": "string",
      "password": "string"
    }
  ```
## Categories
  - Get all categories

    - URL: GET /categories
    - Requires authentication
  - Create a new category
  
    - URL: POST /category
    - Requires authentication
   
  - add to an existing category
  
    - URL: PUT /category/:id
    - Requires authentication
  
  - Delete an existing category
  
    - URL: PUT /category/:id
    - Requires authentication
     
    - Request Body:
  ```bash
  {
    "name": "string"
  }
  ```
## Transactions
 - Get all transactions

    - URL: GET /transactions
    - Requires authentication
- Create a new transaction

  - URL: POST /transaction
  - Requires authentication
  - Request Body:
```bash
{
  "amount": "number",
  "type": "string",  // "income" or "expense"
  "categoryId": "number"
}
```
- add to an existing transaction

  - URL: PUT /transaction/:id
  - Requires authentication

- Delete an existing transaction

  - URL: PUT /transaction/:id
  - Requires authentication

## Budgets
- Get all budgets

  - URL: GET /budget
  - Requires authentication
- Create a new budget

  - URL: POST /budget
  - Requires authentication
  - Request Body:
```bash
{
  "amount": "number",
  "month": "number",
  "year": "number"
}
```
- add to an existing buget

  - URL: PUT /budget/:id
  - Requires authentication

- Delete an existing budget

  - URL: PUT /budget/:id
  - Requires authentication

## Reports
- Get category-wise transaction report
  - URL: GET /report/category-wise
  - Requires authentication
 
- Get monthly transaction report
    - URL: GET /report/monthly
    - Requires authentication
## Setup
### Prerequisites
- Node.js
- PostgreSQL
### Installation
1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
2. Install dependencies:

```bash
npm install
```
3. Set up environment variables:
Create a .env file in the root directory and add the following:

``` bash
DATABASE_URL="postgresql://user:password@localhost:5432/your-database-name"
JWT_SECRET="your-secret-key"
```
4. Set up the database:

```bash
npx prisma migrate dev
```
5. Start the server:

```bash
npm start
```
## Usage
1. Register a new user via the /register endpoint.
2. Authenticate the user via the /login endpoint to receive a JWT token.
3. Use the token to access other authenticated routes (e.g., creating transactions, budgets).
## Contributing
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.
