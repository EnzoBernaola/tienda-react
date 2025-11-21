// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Archivo donde se guardan los usuarios
const usersFile = path.join(__dirname, "users.json");

// =====================
// Helper para leer y escribir JSON
// =====================
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

// =====================
// ENDPOINTS
// =====================

// Test endpoint
app.get("/", (req, res) => {
  res.send("✅ Backend funcionando correctamente");
});

// Registro
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Datos incompletos" });

  const users = readJSON(usersFile);

  // Verificar si ya existe el email
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: "El correo ya está registrado" });
  }

  // Hashear contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), name, email, password: hashedPassword };
  users.push(newUser);
  writeJSON(usersFile, users);

  // Opcional: devolver datos sin la contraseña
  const { password: _, ...userData } = newUser;
  res.json({ success: true, user: userData, message: "Usuario registrado correctamente" });
});
// Procesar compra
app.post("/pago", (req, res) => {
  const { address, email, total, items } = req.body;

  if (!address || !email || !items || items.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Datos de compra incompletos" });
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

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Datos incompletos" });

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
  res.json({ success: true, user: userData, message: "Login exitoso" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
