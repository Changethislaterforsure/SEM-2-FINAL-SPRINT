import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [dealProduct, setDealProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  const dealMap = {
    0: 7, // Sunday
    1: 1, // Monday
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6  // Saturday
  };

  useEffect(() => {
    const day = new Date().getDay();
    const saleId = dealMap[day];

    fetch(`http://localhost:3001/products/${saleId}`)
      .then((res) => res.json())
      
      .then((data) => setDealProduct({ ...data, onSale: true }));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setImages(data.map((p) => p.image)));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds
          .toString()
          .padStart(2, '0')}s`
      );
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to <span className="glow">WarForge Minis</span></h1>
        <p>Elite war gaming miniatures from across the galaxy</p>
      </section>

      {/* Carousel */}
      <section className="carousel">
        {images.length > 0 && (
          <img src={images[current]} alt="Product Preview" />
        )}
      </section>

      {/* Sale Deal Section */}
      <section className="featured-deals">
        <h2>🔥 Today's Deal</h2>
        <p className="countdown">Ends in: {countdown}</p>

        {dealProduct && (
          <>
            <p className="deal-name">
              Today’s Featured Sale: <strong>{dealProduct.name}</strong>
            </p>

            <div className="product-grid">
              <ProductCard
                key={dealProduct.id}
                product={dealProduct}
                onView={(p) => setSelectedProduct(p)}
                onAddToCart={addToCart}
              />
            </div>
          </>
        )}
      </section>

      {/* About the Shop */}
      <section className="intro">
        <h2>About Our Shop</h2>
        <p>
          WarForge Minis specializes in highly detailed sci-fi miniatures, perfect for
          tabletop battles or display. Whether you're building an elite space marine army
          or a rogue mech gang, we've got the models to elevate your game.
        </p>
      </section>

      {/* Refund Policy */}
      <section className="refund-policy">
        <h2>Refund Policy</h2>
        <p>
          Not satisfied? We offer refunds within 14 days of delivery for any
          unassembled, unopened products. Your satisfaction is our command directive.
        </p>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
            <button onClick={() => setSelectedProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;