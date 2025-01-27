// client/src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' instead of 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
