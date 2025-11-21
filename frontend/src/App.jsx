import { useState } from "react";
import Cart from "./components/Cart.jsx";
import Home from "./pages/Home.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import "./index.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(cart.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  return (
    <>
      {}
      <header>
        <h1>Tienda de Hardware</h1>
      </header>

      <div className="app-container">
        <ThemeToggle />
        <Cart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
        <Home addToCart={addToCart} />
      </div>

      {}
      <footer>
        <p>© 2025 Tienda de Hardware. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;
