const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get user details
router.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

// Get user repositories
router.get("/users/:username/repos", async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Repositories not found" });
  }
});

// Get repository commits
router.get("/repos/:owner/:repo/commits", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        params: {
          per_page: 5, // Fetch only the last 5 commits
        },
      }
    );
    const commits = response.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
    }));
    res.json(commits);
  } catch (error) {
    res.status(404).json({ message: "Commits not found" });
  }
});

module.exports = router;
