const request = require("supertest");
const express = require("express");
const githubRoutes = require("../routes/github"); // Adjust the path to your routes file

const app = express();
app.use("/api/github", githubRoutes);

describe("GET /api/github/users/:username", () => {
  it("should return user details", async () => {
    const response = await request(app).get("/api/github/users/octocat");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("login", "octocat");
  });
});

describe("GET /api/github/users/:username/repos", () => {
  it("should return user repositories", async () => {
    const response = await request(app).get("/api/github/users/octocat/repos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
