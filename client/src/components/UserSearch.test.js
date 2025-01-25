import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import UserSearch from "./UserSearch";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("UserSearch Component", () => {
  it("renders correctly", () => {
    render(
      <Router>
        <UserSearch />
      </Router>
    );

    // Verify the input and button are rendered
    expect(
      screen.getByPlaceholderText("Search for a GitHub user")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("performs user search and displays results", async () => {
    const users = [
      { id: 1, login: "octocat", html_url: "https://github.com/octocat" },
    ];

    axios.get.mockResolvedValue({ data: { items: users } });

    render(
      <Router>
        <UserSearch />
      </Router>
    );

    // Simulate user typing and clicking search
    fireEvent.change(screen.getByPlaceholderText("Search for a GitHub user"), {
      target: { value: "octocat" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Wait for the results to be displayed
    const userLink = await screen.findByText("octocat");
    expect(userLink).toBeInTheDocument();

    // Verify the link to the user's GitHub profile
    expect(screen.getByText("octocat").closest("a")).toHaveAttribute(
      "href",
      "/user/octocat"
    );
    expect(screen.getByText("GitHub Profile").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/octocat"
    );
  });

  it("displays error message on failed search", async () => {
    axios.get.mockRejectedValue(new Error("User not found"));

    render(
      <Router>
        <UserSearch />
      </Router>
    );

    // Simulate user typing and clicking search
    fireEvent.change(screen.getByPlaceholderText("Search for a GitHub user"), {
      target: { value: "unknownuser" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Wait for the error message to be displayed
    const errorMsg = await screen.findByText("User not found");
    expect(errorMsg).toBeInTheDocument();
  });
});
