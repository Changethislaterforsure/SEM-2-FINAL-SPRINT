import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    clearCart(); // ✅ Clear cart here

    setTimeout(() => {
      setShowModal(false);
      navigate("/");
    }, 4000);
  };

  return (
    <div className="checkout-form-page">
      <h1>Complete Your Order</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <textarea placeholder="Shipping Address" rows="4" required />
        <button type="submit">Complete Purchase</button>
      </form>

      {showModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-content">
            <div className="loader-ring" />
            <h2>Transmitting Order…</h2>
            <p>Stand by for planetary delivery clearance.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;