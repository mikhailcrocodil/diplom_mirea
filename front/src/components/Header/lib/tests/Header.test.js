import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../../index";
import "@testing-library/jest-dom";

test("renders header component with title", () => {
  render(<Header />);

  const titleElement = screen.getByText(/MIREA/i);
  expect(titleElement).toBeInTheDocument();
});
