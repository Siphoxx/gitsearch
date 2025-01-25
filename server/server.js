const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/github", githubRoutes);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!"); // Response for the root URL
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
