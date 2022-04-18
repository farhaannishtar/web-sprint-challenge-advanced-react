import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import AppFunctional from './AppFunctional';

// Write your tests here
test('sanity', () => {
expect(true).toBe(true);
})

// Renders without errors
test('renders without errors', () => {
render(<AppFunctional/>)
})

// Checks for header
test('checks for <h3> Coordinates Header', () => {
render(<AppFunctional/>)

const headerElement = screen.queryByText(/Coordinates/i);

expect(headerElement).toBeInTheDocument();
expect(headerElement).toBeTruthy();
expect(headerElement).toHaveTextContent(/Coordinates/i);
})

// Checks for buttons
test('check buttons', () => {
render(<AppFunctional/>)

const leftButton = screen.getByText("LEFT");
const upButton = screen.getByText("UP");
const rightButton = screen.getByText("RIGHT");
const downButton = screen.getByText("DOWN");
const resetButton = screen.getByText("reset");

expect(leftButton).toBeInTheDocument();
expect(upButton).toBeInTheDocument();
expect(rightButton).toBeInTheDocument();
expect(downButton).toBeInTheDocument();
expect(resetButton).toBeInTheDocument();

expect(leftButton).toBeTruthy();
expect(upButton).toBeTruthy();
expect(rightButton).toBeTruthy();
expect(downButton).toBeTruthy();
expect(resetButton).toBeTruthy();

})

// Check for typing of input field
test('renders "Ouch: email must be a valid email" if invalid email is entered', async () => {
  render(<AppFunctional/>)
  const emailInput = screen.getByPlaceholderText('type email');
  console.log("emailField", emailInput);

  userEvent.type(emailInput, "bad@email");

  const submitInput = screen.getByTestId("submit");
  console.log("submitInput", submitInput);

  userEvent.click(submitInput);

  const errorMessage = await screen.findByText(/Ouch: email must be a valid email/i);
  expect(errorMessage).toBeInTheDocument();
})