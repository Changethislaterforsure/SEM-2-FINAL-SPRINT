import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]); // State to store the list of products fetched from the mock API
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store which product is currently selected (for the VIEW modal)
  const [showConfirm, setShowConfirm] = useState(false); // State to control visibility of the "Added to Cart" confirmation

  const { addToCart } = useContext(CartContext);

  useEffect(() => { // Fetch all products from the mock API when the component mounts
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => { // Handle adding an item to the cart and trigger a temporary confirmation popup
    addToCart(product);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2500); //auto hide confirmation popup after delay
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
