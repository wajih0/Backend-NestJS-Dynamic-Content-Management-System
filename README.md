# Dynamic Content Management System (DCMS)

This project is a **full-stack web application** built with **NestJS** (backend) and **Next.js** (frontend), featuring a **Dynamic Content Management System** with user authentication and role-based access control.

## Features

- **User Authentication & Authorization**  
  - JWT-based login and refresh tokens  
  - Role-based access (USER and ADMIN)  
  - Secure password hashing using bcrypt

- **Articles Management**  
  - Create, read, update, and delete articles (CRUD)  
  - ADMINs can manage all articles  
  - USERs can only view published articles

- **Frontend with Next.js**  
  - Login and Registration pages  
  - Home page displaying articles in a card layout  
  - Dynamic navigation based on user role  
  - Responsive and modern design using Tailwind CSS

- **API Documentation**  
  - Swagger documentation available for all backend endpoints  

## Tech Stack

- **Backend:** NestJS, TypeORM, PostgreSQL  
- **Frontend:** Next.js, Tailwind CSS, React
- **DB:** PostgeSql
- **Authentication:** JWT (Access + Refresh tokens)  
- **Others:** Swagger for API docs, Class-validator for DTO validation

## Setup

1. **Backend:**  
   - Configure `.env`  
   - Clone , Run `npm install` and `npm run start:dev`

2. **Frontend:**  
   - Run `npm install` and `npm run dev`  
   - Access the frontend at `http://localhost:3002`  

---

This project demonstrates a **robust full-stack application** with secure authentication, role-based authorization, and dynamic content management.
