import { render, screen } from "@testing-library/react";
import Footer from "../src/components/Footer";

test("renders footer text", () => {
  render(<Footer />);
  const message = screen.getByText(/© 2025 WarForge Minis/i);
  expect(message).toBeInTheDocument();
});