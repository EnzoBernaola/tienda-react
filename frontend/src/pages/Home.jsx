import React, { useState, useEffect } from "react";
import "./Home.css";



const productos = [
  { id: 1, nombre: "Motherboard BIOSTAR A520M", precio: 50000, imagen: "images/BIOSTARA520M.jpg", categoria: "Motherboards" },
  { id: 2, nombre: "Motherboard GIGABYTE A520M", precio: 50000, imagen: "images/GIGABYTEA520M.jpg", categoria: "Motherboards" },
  { id: 3, nombre: "Motherboard GIGABYTE A620M", precio: 50000, imagen: "images/GiGABYTEA620M.jpg", categoria: "Motherboards" },
  { id: 4, nombre: "Motherboard GIGABYTE B550", precio: 50000, imagen: "images/GIGABYTEB550.jpg", categoria: "Motherboards" },
  { id: 5, nombre: "Motherboard GIGABYTE B550M", precio: 50000, imagen: "images/GIGABYTEB550M.jpg", categoria: "Motherboards" },
  { id: 6, nombre: "Motherboard MSI A520M", precio: 50000, imagen: "images/MSIA520M.jpg", categoria: "Motherboards" },
  { id: 7, nombre: "Motherboard MSI IMPG-B650", precio: 50000, imagen: "images/MSIMPG-B650.jpg", categoria: "Motherboards" },

  { id: 8, nombre: "Placa de video RTX 3050", precio: 200000, imagen: "images/RTX3050.jpg", categoria: "Placas de video" },
  { id: 9, nombre: "Placa de video RTX 5050", precio: 200000, imagen: "images/RTX5050.jpg", categoria: "Placas de video" },
  { id: 10, nombre: "Placa de video RTX 5060 TI", precio: 200000, imagen: "images/RTX5060TI.jpg", categoria: "Placas de video" },
  { id: 11, nombre: "Placa de video RTX 5060 TI OC", precio: 200000, imagen: "images/RTX5060TIOC.jpg", categoria: "Placas de video" },
  { id: 12, nombre: "Placa de video RX 7600", precio: 200000, imagen: "images/rx7600.jpg", categoria: "Placas de video" },
  { id: 13, nombre: "Placa de video RX 9060 XT", precio: 200000, imagen: "images/RX9060XT.jpg", categoria: "Placas de video" },
  { id: 14, nombre: "Placa de video RX 9070 XT", precio: 200000, imagen: "images/RX9070XTE.jpg", categoria: "Placas de video" },

  { id: 15, nombre: "Memoria RAM DDR4 8Gb 3200 Mhz", precio: 25000, imagen: "images/ARMOR.jpg", categoria: "Memorias RAM" },
  { id: 16, nombre: "Memoria Ram DDR4 - 8Gb 3200 Mhz XPG D35G Rgb Negro", precio: 25000, imagen: "images/XPG.jpg", categoria: "Memorias RAM" },
  { id: 17, nombre: "Memoria RAM DDR4 8GB 3200 Mhz Neo Forza Rgb", precio: 25000, imagen: "images/DDR48GB.jpg", categoria: "Memorias RAM" },
  { id: 18, nombre: "Memoria Ram DDR4 16Gb 3200 Mhz Hiksemi Hiker", precio: 25000, imagen: "images/HIKER.jpg", categoria: "Memorias RAM" },
  { id: 19, nombre: "Memoria Ram DDR4 16Gb 3200 Mhz Kingston Fury Beast Rgb", precio: 25000, imagen: "images/FURY.jpg", categoria: "Memorias RAM" },
  { id: 20, nombre: "Memoria Ram DDR4 - 16Gb 3600 Mhz Kingston Fury Renegade Rgb", precio: 25000, imagen: "images/RENEGADE.jpg", categoria: "Memorias RAM" },
  { id: 21, nombre: "Memoria Ram DDR4 - 32Gb 3200 Mhz Kingston Fury Beast Rgb", precio: 25000, imagen: "images/FURYBEAST.jpg", categoria: "Memorias RAM" },

  { id: 22, nombre: "Disco Rigido 2Tb Seagate Skyhawk", precio: 15000, imagen: "images/SEAGATE.jpg", categoria: "Almacenamiento" },
  { id: 23, nombre: "Disco Rigido 4Tb Seagate Skyhawk", precio: 25000, imagen: "images/SEAGATE4TB.jpg", categoria: "Almacenamiento" },
  { id: 24, nombre: "Disco Solido Ssd 240Gb Western Digital WD Green", precio: 15000, imagen: "images/WESTERN.jpg", categoria: "Almacenamiento" },
  { id: 25, nombre: "Disco Solido Ssd 512Gb Kingston KC600", precio: 15000, imagen: "images/KINGSTON.jpg", categoria: "Almacenamiento" },
  { id: 26, nombre: "Disco Solido Ssd 2Tb Western Digital WD Green", precio: 15000, imagen: "images/WESTERN2TB.jpg", categoria: "Almacenamiento" },
  { id: 27, nombre: "Disco Rigido 6Tb Western Digital WD Red", precio: 15000, imagen: "images/WESTERN6TB.jpg", categoria: "Almacenamiento" },
  { id: 28, nombre: "Disco Externo 2Tb Seagate Expansion STGX", precio: 15000, imagen: "images/STGX.jpg", categoria: "Almacenamiento" },

  { id: 29, nombre: "Fuente Lnz ZX-650-GZ 650W", precio: 20000, imagen: "images/GZ.jpg", categoria: "Fuentes" },
  { id: 30, nombre: "Fuente Sentey MBP600-GS 600W 80 Plus Bronze", precio: 20000, imagen: "images/SENTEY.jpg", categoria: "Fuentes" },
  { id: 31, nombre: "Fuente Thermaltake Smart Rgb 500W 80 Plus White", precio: 20000, imagen: "images/THERM.jpg", categoria: "Fuentes" },
  { id: 32, nombre: "Fuente Gigabyte 750W 80 Plus Gold PG5 Modular", precio: 20000, imagen: "images/FGIGABYTE.jpg", categoria: "Fuentes" },
  { id: 33, nombre: "Fuente Aerocool Dorado 750W Rgb 80 Plus Gold", precio: 20000, imagen: "images/AEROCOOL.jpg", categoria: "Fuentes" },
  { id: 34, nombre: "Fuente Aerocool Cylon 700W Rgb 80 Plus Bronze", precio: 20000, imagen: "images/AEROCOOL7.jpg", categoria: "Fuentes" },
  { id: 35, nombre: "Fuente Gamemax GX-1050 1050W Modular Rgb Smart Pro 80 Plus Gold", precio: 20000, imagen: "images/GAMEMAX.jpg", categoria: "Fuentes" }
];
export default function Home({ addToCart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const categories = ["Todos", "Motherboards", "Placas de video", "Memorias RAM", "Almacenamiento", "Fuentes"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

 
  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) {
      setUserName(savedUser);
      setIsLogged(true);
    }
  }, []);

  const handleRegister = async () => {
    if (!email || !password || !name) return setMessage("Completa todos los campos");

    try {
      fetch("https://tienda-react-56uh.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setIsLogged(true);
        setUserName(name);

     
        localStorage.setItem("userName", name);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error en el registro");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) return setMessage("Completa los campos");

    try {
      const res = fetch("http://localhost:3001/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.success) {
        setIsLogged(true);

       
        const finalName = data.name || localStorage.getItem("userName") || "Usuario";
        setUserName(finalName);
        localStorage.setItem("userName", finalName);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error en el login");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setUserName("");
    setEmail("");
    setPassword("");
    setName("");
    setMessage("");

  
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? productos
      : productos.filter(p => p.categoria === selectedCategory);

  return (
    <div>
      {!isLogged ? (
        <div className="user-form-container">
          {showRegister ? (
            <div className="user-form">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Registrarse</button>
              <p
                onClick={() => {
                  setShowRegister(false);
                  setMessage("");
                }}
                className="toggle-form"
              >
                Ya tienes cuenta? Login
              </p>
            </div>
          ) : (
            <div className="user-form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <p
                onClick={() => {
                  setShowRegister(true);
                  setMessage("");
                }}
                className="toggle-form"
              >
                No tienes cuenta? Registrarse
              </p>
            </div>
          )}
          {message && <p className="user-message">{message}</p>}
        </div>
      ) : (
        <div className="user-logged">
          {}
          <span className="neon-username">{userName}</span>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}

      <div className="categories-container">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active-category" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map(p => (
          <div className="product-card" key={p.id}>
            <img src={p.imagen} alt={p.nombre} />
            <h4>{p.nombre}</h4>
            <p>${p.precio.toLocaleString()}</p>
            <button
              onClick={() =>
                addToCart({
                  id: p.id,
                  name: p.nombre,
                  price: p.precio,
                  image: p.imagen
                })
              }
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
