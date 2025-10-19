# Dynamic Content Management System (DCMS)

This project is a **full-stack web application** built with **NestJS** (backend) and **Next.js** (frontend), featuring a **Dynamic Content Management System** with user authentication and role-based access control.

 Les utilisateurs enregistrés via le frontend /register auront toujours le rôle USER.
Créer un ADMIN :
Démarrer le backend.
Ouvrir Swagger à http://localhost:3000/api.
Aller dans la section Auth/register .
Utiliser l’endpoint POST /auth/register  et modifier le rôle à ADMIN directement dans le body.

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
- **DB:** PostgeSql(DB_NAME=postgres) : CREATE DATABASE postgres;
- **Authentication:** JWT (Access + Refresh tokens)  
- **Others:** Swagger for API docs, Class-validator for DTO validation

## Setup

1. **Backend:**  
   - Configure `.env`  
   - Clone , Run `npm install` and `npm run start:dev`

2. **Frontend:**  
   - Run `npm install` and `npm run dev -- -p 3002`
   

---

This project demonstrates a **robust full-stack application** with secure authentication, role-based authorization, and dynamic content management.
