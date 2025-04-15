import { render, screen } from "@testing-library/react";
import Shop from "../src/pages/Shop";
import { CartContext } from "../src/context/CartContext";

test("renders shop page heading", () => {
  render(
    <CartContext.Provider value={{ addToCart: () => {} }}>
      <Shop />
    </CartContext.Provider>
  );
  const heading = screen.getByText(/Shop Miniatures/i);
  expect(heading).toBeInTheDocument();
});