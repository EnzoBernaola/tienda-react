# 🛒 Tienda de Hardware – Proyecto Full Stack (React + Node.js)

Este proyecto es una **tienda online de hardware** desarrollada como aplicación **full stack**, utilizando **React (Vite) en el frontend** y **Node.js + Express en el backend**.

Incluye sistema de carrito, registro de usuarios, login, simulación de pago y guardado de órdenes de compra.

---

## 🚀 Tecnologías utilizadas

### Frontend
- React (Vite)
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- Bcrypt (para encriptar contraseñas)
- CORS
- File System (JSON como base de datos local)

### Deploy
- Frontend: **Vercel**
- Backend: **Render**
- Control de versiones: **Git & GitHub**

---

## 🌐 Proyecto publicado

- **Frontend:** https://tienda-react-git-main-enzos-projects-0b97983f.vercel.app/
- **Backend:** https://tienda-react-56uh.onrender.com/

---

## ✅ Funcionalidades

✔️ Listado de productos (hardware)  
✔️ Agregar / quitar productos del carrito  
✔️ Registro de usuarios  
✔️ Login de usuarios  
✔️ Simulación de pago  
✔️ Registro de compras en `orders.json`  
✔️ Backend funcionando con API REST  
✔️ Encriptación de contraseñas con bcrypt  

---

## 📂 Estructura del proyecto

tienda-react/
│
├── frontend/ # App React (Vite)
│
├── backend/ # Servidor Node + Express
│ ├── server.js
│ ├── users.json
│ └── orders.json
│
└── README.md


---

## ⚙️ Instalación y uso local

### 1. Clonar el repositorio

```bash
git clone https://github.com/EnzoBernaola/tienda-react.git

Backend
cd backend
npm install
node server.js
El servidor correrá en:

http://localhost:3001

Frontend
cd frontend
npm install
npm run dev

La aplicación correrá en:

http://localhost:5173

🛠️ Endpoints principales
Método	Ruta	Descripción
GET	/	Test del servidor
POST	/register	Registro de usuario
POST	/login	Login de usuario
POST	/pago	Procesa una compra
📌 Notas

El proyecto usa archivos .json como base de datos (sin base de datos externa).

Pensado para fines educativos y de portfolio.

Puede escalar fácilmente a MongoDB, MySQL o Firebase.

👨‍💻 Autor

Enzo Bernaola
Proyecto Full Stack – Tienda de Hardware

