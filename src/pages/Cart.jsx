import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const dealMap = {
    0: 7,
    1: 1,
    2: 4,
    3: 5,
    4: 6,
    5: 3,
    6: 2
  };

  const day = new Date().getDay();
  const saleId = dealMap[day];

  const discountedPrice = (item) =>
    item.id === saleId ? item.price * 0.95 : item.price;

  const subtotal = cartItems.reduce((sum, item) => sum + discountedPrice(item), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>${discountedPrice(item).toFixed(2)}</p>
                  {item.id === saleId && (
                    <p className="sale-note">5% Off - Today Only!</p>
                  )}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (15%): ${tax.toFixed(2)}</p>
            <h2>Total: ${total.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;