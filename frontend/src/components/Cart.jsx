import React, { useState, useRef, useEffect } from "react";

function Cart({ cart, addToCart, removeFromCart, clearCart }) {
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thankYou, setThankYou] = useState(false);

  const intervalRef = useRef(null);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const finalPrice =
    paymentMethod === "debito"
      ? total * 0.85
      : paymentMethod === "credito"
      ? total * 1.2
      : total;

  const maxDigits =
    paymentMethod === "debito"
      ? 16
      : paymentMethod === "credito"
      ? 15
      : 0;

  const startProcessingSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    let current = 0;
    setProgress(0);

    intervalRef.current = setInterval(() => {
      if (current < 90) {
        current += 5;
      } else {
        current += 1;
      }

      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setTimeout(() => {
          setIsProcessing(false);
          setThankYou(true);
          clearCart();
          setShowForm(false);

          setTimeout(() => {
            setThankYou(false);
            setProgress(0);
          }, 2500);
        }, 500);
      }

      setProgress(Math.min(100, Math.floor(current)));
    }, 120);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (
      !address ||
      !email ||
      !paymentMethod ||
      cardNumber.length < maxDigits ||
      cvv.length < 3
    ) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setShowCart(false);
    setShowForm(true);

    startProcessingSimulation();

    try {
      const response = await fetch("http://localhost:3001/pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, email, total: finalPrice, items: cart }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Hubo un problema con el pago.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      alert("No se pudo conectar con el servidor.");
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <button className="cart-toggle" onClick={() => setShowCart(!showCart)}>
        🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>

      {showCart && (
        <div className="cart-container fade-in">
          <h3>Carrito</h3>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <div className="qty-control">
                      <button onClick={() => removeFromCart(item.id)}>➖</button>
                      <span>{item.qty}</span>
                      <button onClick={() => addToCart(item)}>➕</button>
                    </div>
                    <span className="subtotal">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <>
              <h4 className="total">Total: ${total.toFixed(2)}</h4>
              <button className="pay-btn" onClick={() => setShowForm(true)}>
                Finalizar Compra
              </button>
            </>
          )}
        </div>
      )}

      {showForm && (
        <div className="modal fade-in">
          <div className="modal-content">
            <button
              className="modal-close btn-theme"
              onClick={() => { if (!isProcessing) setShowForm(false); }}
            >
              ✖
            </button>
            <h3>Formulario de Pago</h3>

            <form onSubmit={handlePayment}>
              <input
                type="text"
                placeholder="Dirección de envío"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={isProcessing}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isProcessing}
              />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                disabled={isProcessing}
              >
                <option value="">Método de pago</option>
                <option value="debito">Débito (15% OFF)</option>
                <option value="credito">Crédito (20% Recargo)</option>
              </select>

              {paymentMethod && (
                <>
                  <input
                    type="text"
                    placeholder={`Número de tarjeta (${maxDigits} dígitos)`}
                    maxLength={maxDigits}
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value.replace(/\D/g, ""))
                    }
                    required
                    disabled={isProcessing}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    required
                    disabled={isProcessing}
                  />

                  <p className="original-price">
                    Precio original: <s>${total.toFixed(2)}</s>
                  </p>
                  <p className="final-price">Precio final: ${finalPrice.toFixed(2)}</p>
                </>
              )}

              <button type="submit" className="btn-theme" disabled={isProcessing}>
                {isProcessing ? `Procesando ${progress}%` : "Pagar"}
              </button>
            </form>

            {isProcessing && (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>
        </div>
      )}

      {thankYou && (
        <div className="thank-you-overlay fade-in">
          <div className="thank-you-message">✅ ¡Gracias por su compra!</div>
        </div>
      )}
    </>
  );
}

export default Cart;
