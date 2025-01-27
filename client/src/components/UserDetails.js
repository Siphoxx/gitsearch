// client/src/components/UserDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/github/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await axios.get(`/api/github/users/${username}/repos`);
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchUser();
    fetchRepos();
  }, [username]);

  const fetchCommits = async (repoName) => {
    try {
      const response = await axios.get(
        `/api/github/repos/${username}/${repoName}/commits`
      );
      setCommits((prevCommits) => ({
        ...prevCommits,
        [repoName]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching commits:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="150" />
      <p>Username: {user.login}</p>
      <p>Bio: {user.bio}</p>
      <p>Location: {user.location}</p>
      <p>Public Repositories: {user.public_repos}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "green" }}
      >
        GitHub Profile
      </a>
      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            <button onClick={() => fetchCommits(repo.name)}>
              Show Commits
            </button>
            {commits[repo.name] && (
              <ul>
                {commits[repo.name].map((commit) => (
                  <li key={commit.sha}>
                    <p>Message: {commit.message}</p>
                    <p>Author: {commit.author}</p>
                    <p>Date: {commit.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
