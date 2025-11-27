# DevSprint — Developer Skill Sprint Platform

DevSprint is a web application that helps developers build, document, and showcase their skills through structured sprints. The platform allows users to track progress, visualize skill growth, and publish portfolio-ready project reports.

---

## 📌 Overview

This application provides a structured way for developers to upskill by completing **sprints**—focused skill-building sessions that produce measurable outcomes. Throughout each sprint, developers document evidence, track tasks, and generate shareable portfolio material.

---

## 🔑 Key Features

### **Landing Page**

* Displays the platform’s purpose and core benefits.

### **User Registration**

* Allows new users to sign up and provide details like:

  * Basic information
  * GitHub profile
  * Skill goals

### **Dashboard**

* Overview of active sprints
* Visual representation of user’s Skill Map

### **Skill Map**

* Shows skills acquired, in progress, and planned
* Helps users understand growth areas

### **Create Sprint**

* Build new sprints by defining:

  * Templates
  * Difficulty levels
  * Deliverables
  * Tasks
  * Optional: AI-generated starter code

### **Sprint Workspace**

* Dedicated space for managing an active sprint
* Includes task lists and evidence card creation

### **Task List**

* Displays tasks for each sprint with completion tracking

### **Evidence Cards**

* Summaries of completed work that include:

  * Code snippets
  * Media/screenshots
  * Tags, metrics, and descriptions

### **Evidence Card Details**

* Full detailed view for each evidence card

### **Public Project Report**

* Detailed view showing:

  * Overview
  * Evidence
  * Links
  * Videos
  * Tags

## 🗂️ Application Structure

* **Homepage** – Landing page content
* **Authentication Pages** – Signup, login, onboarding
* **Developer Dashboard** – Central hub for sprints and skill map
* **Sprint Management** – Create sprint, workspace, tasks, evidence cards

---

## 🚀 Tech Stack (suggested)

* **Frontend:** Next.js
* **Backend:** Node.js / Hono / Express
* **Database:** MongoDB
* **Auth:** NextAuth
* **Styling:** Tailwind CSS
* **State Management:** Zustand

---

## 📦 Installation

```bash
git clone <repo-url>
cd devsprint
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## env 
Create a `.env` file in the root directory with the following variables:
```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXTAUTH_SECRET=your_nextauth_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 📄 License

MIT License.

---