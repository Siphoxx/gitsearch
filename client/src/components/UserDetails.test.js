import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./UserDetails";

test("renders user details and matches snapshot", async () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/user/octocat"]}>
      <Routes>
        <Route path="/user/:username" element={<UserDetails />} />
      </Routes>
    </MemoryRouter>
  );

  // Snapshot test: Capture and compare the rendered output
  expect(asFragment()).toMatchSnapshot();
});
