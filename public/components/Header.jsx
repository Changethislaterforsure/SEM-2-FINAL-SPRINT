// src/components/Header.jsx

import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="nav-header">
      <div className="nav-logo">
        WarForge<span className="glow">Minis</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;