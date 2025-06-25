 # 🌱 ActForBD – Empowering Communities, One Event at a Time

A platform to create, join, and manage **social service events** across Bangladesh 🌍. From cleanup drives to tree plantations and donation programs — let’s build a better community together. 🇧🇩

---

## 🌐 Live Site

🔗 [https://actforbd.web.app](https://actforbd.web.app)

📁 **Client Repository**: [https://github.com/naeem-web84/a11-actforbd-EJP](https://github.com/naeem-web84/a11-actforbd-EJP)  
📁 **Server Repository**: [https://github.com/naeem-web84/a11-actforbd-server-EJP](https://github.com/naeem-web84/a11-actforbd-server-EJP)

---

## 🖼️ Project Preview

![ActForBD Preview](https://raw.githubusercontent.com/naeem-web84/a11-actforbd-server-EJP/refs/heads/main/Screenshot%202025-06-25%20142549.png)

---

## ✨ Key Features

- 🔐 **Secure Authentication** using Firebase (Email & Google)
- 🧾 **JWT-Protected Routes** to ensure secure event access
- 📅 **Create & Manage Events** with validation & real-time feedback
- 🧑‍🤝‍🧑 **Join Events** and track participation with stored data
- 📍 **Upcoming Events Page** only shows future-dated events
- 🔎 **Search & Filter by Event Type/Title** via MongoDB API
- 🎨 **Theme Toggle** (Dark/Light) to match user preference
- 📧 **Newsletter Section**, static gallery, & featured info
- 🔄 **Pagination**, animations, and loading spinners for UX

---

## 🛠️ Tech Stack

### 💻 Client

- React.js (Vite)
- Firebase Authentication
- React Router DOM
- React Hook Form
- React Datepicker
- Tailwind CSS + DaisyUI
- Framer Motion + SweetAlert2 + Toast
- Deployed on **Firebase**

### 🌐 Server

- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- dotenv & CORS
- Deployed on **Vercel**

---

## 🗂 Folder Structure

```bash
client/
├── components/
├── pages/
├── layout/
├── context/
├── routes/

server/
├── index.js
├── routes/
├── controllers/
├── middleware/
└── models/
