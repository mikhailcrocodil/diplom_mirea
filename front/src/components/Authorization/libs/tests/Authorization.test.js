import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthForm } from "../../ui/AuthForm";
import "@testing-library/jest-dom";

test("renders and can submit login yup", () => {
  render(<AuthForm />);

  const loginButton = screen.getByText(/Войти/i);
  expect(loginButton).toBeInTheDocument();

  const usernameInput = screen.getByLabelText(/Введите логин/i);
  const passwordInput = screen.getByLabelText(/Введите пароль/i);

  fireEvent.change(usernameInput, { target: { value: "test" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  fireEvent.click(loginButton);
});
