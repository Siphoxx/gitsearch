// client/src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import UserDetails from "./components/UserDetails";

const App = () => {
  return (
    <div>
      <h1>GitHub UserSearch</h1>
      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
