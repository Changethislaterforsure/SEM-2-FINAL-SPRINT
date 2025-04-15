import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2500);
  };

  return (
    <div className="shop-page">
      <h1>Shop Miniatures</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <div className="button-group">
              <button onClick={() => setSelectedProduct(product)}>VIEW</button>
              <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="cart-confirmation">
          ✅ Added to Cart!
        </div>
      )}
    </div>
  );
}

export default Shop;