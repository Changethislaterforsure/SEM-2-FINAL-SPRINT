import { render, screen } from "@testing-library/react";
import Cart from "../src/pages/Cart";
import { CartContext } from "../src/context/CartContext";
import { BrowserRouter } from "react-router-dom";

test("renders Cart page heading", () => {
  render(
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartItems: [],
          removeFromCart: () => {},
        }}
      >
        <Cart />
      </CartContext.Provider>
    </BrowserRouter>
  );

  const headings = screen.getAllByText(/Your Cart/i);
  expect(headings.length).toBeGreaterThan(0);
});