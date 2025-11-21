const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3001;

/* =====================
   Middlewares
===================== */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

/* =====================
   Archivos
===================== */

const usersFile = path.join(__dirname, "users.json");

/* =====================
   Helpers
===================== */

function readJSON(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* =====================
   ENDPOINTS
===================== */

// Test
app.get("/", (req, res) => {
  res.send("✅ Backend funcionando correctamente");
});

// Test para el navegador
app.get("/pago", (req, res) => {
  res.send("✅ La ruta /pago existe (usa POST desde el frontend)");
});

// Pago
app.post("/pago", (req, res) => {
  const { address, email, total, items } = req.body;

  if (!address || !email || !items || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Datos de compra incompletos"
    });
  }

  console.log("🛒 NUEVA COMPRA REALIZADA");
  console.log("Cliente:", email);
  console.log("Dirección:", address);
  console.log("Total: $", total);
  console.log("Productos:", items);

  res.json({
    success: true,
    message: "✅ Compra recibida y procesada correctamente"
  });
});

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const users = readJSON(usersFile);

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: "El correo ya está registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);
  writeJSON(usersFile, users);

  const { password: _, ...userData } = newUser;

  res.json({
    success: true,
    user: userData,
    message: "Usuario registrado correctamente"
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const users = readJSON(usersFile);
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ success: false, message: "Usuario no encontrado" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ success: false, message: "Contraseña incorrecta" });
  }

  const { password: _, ...userData } = user;

  res.json({
    success: true,
    user: userData,
    message: "Login exitoso"
  });
});



app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
