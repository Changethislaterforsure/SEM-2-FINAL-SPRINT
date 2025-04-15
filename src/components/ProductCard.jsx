import "./ProductCard.css";

function ProductCard({ product, onView, onAddToCart }) {
  return (
    <div className="product-card">
      {product.onSale && <div className="sale-tag">SALE -5%</div>}
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <div className="button-group">
        <button onClick={() => onView(product)}>VIEW</button>
        <button onClick={() => onAddToCart(product)}>ADD TO CART</button>
      </div>
    </div>
  );
}

export default ProductCard;