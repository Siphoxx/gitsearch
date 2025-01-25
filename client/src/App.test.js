// src/App.test.js
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders GitHub UserSearch heading", () => {
  const { getByText, asFragment } = render(
    <Router>
      <App />
    </Router>
  );

  // Functional test: Check if the heading is in the document
  const headingElement = getByText(/GitHub UserSearch/i);
  expect(headingElement).toBeInTheDocument();

  // Snapshot test: Capture and compare the rendered output
  expect(asFragment()).toMatchSnapshot();
});
