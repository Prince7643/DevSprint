# DevSprint Backend — API & Server Documentation

This README describes the **backend** of the DevSprint application—an API-driven system that powers sprints, evidence tracking, skill maps, authentication, and portfolio generation.

---

## 🚀 Overview

The DevSprint backend provides RESTful APIs (or Hono-based routes if serverless) that support:

* User registration & authentication
* Sprint creation and management
* Task management
* Evidence card creation & updates
* Skill map generation

The backend is designed to be scalable, modular, and ready for production deployment.

---

## 🔧 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express 
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT / NextAuth (via API)
* **Deployment:** Render

---

## 📁 Backend Structure (Suggested)

```
backend/
 ├─ src/
 │   ├─ config/
 │   ├─ controllers/
 │   ├─ middlewares/
 │   ├─ models/
 │   ├─ routes/
 │   └─ utils/
 ├─ package.json
 ├─ .env
 └─ README.md
```

---

## 📌 Core Features (Backend Logic)

### **1. Authentication APIs**

* User signup
* User login
* Token issuance (JWT)
* Token refresh

### **2. Sprint APIs**

* Create new sprint
* Fetch all sprints of a user
* Fetch sprint details
* Delete sprint
* Update sprint metadata

### **3. Task APIs**

* Create tasks
* Update task status (completed/pending)
* Fetch sprint tasks

### **4. Evidence Card APIs**

* Create evidence card
* Upload media (image/video)
* Attach code snippets
* Add tags and metrics
* Fetch evidence list
* Fetch detailed card view

### **5. Skill Map API**

* Generate skill graph automatically based on:

  * Completed tasks
  * Evidence card tags
  * Sprint difficulty


---

## 🔌 API Endpoints (Sample)

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login

POST   /api/v1/sprint
GET    /api/v1/sprint/:id

POST   /api/v1/sprint/:id/task
GET    /api/v1/task/:taskId

POST   /api/v1/evidence
GET    /api/v1/evidence/:id
GET    /api/v1/evidence/


```

(More detailed API docs can be added.)

---

## ⚙️ Environment Variables

Create a `.env` file:

```bash
DATABASE_URL=
JWT_SECRET=
OPENROUTER_API_KEY=
STRIPE_SECRET_KEY=
NODE_ENV=development
FRONTEND_URL=
```

(Add more based on implementation.)

---

## ▶️ Running the Backend

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## 📄 License

MIT License.

---
