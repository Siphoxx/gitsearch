import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import "./UserDetails.css"; // Import CSS for styling

const UserDetails = () => {
  const { username } = useParams(); // Get the username from the URL parameters
  const [user, setUser] = useState(null); // State for user details
  const [repos, setRepos] = useState([]); // State for repositories
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5); // Number of repos per page

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details from the GitHub API
        const response = await axios.get(`/api/github/users/${username}`);
        setUser(response.data); // Set user details
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 200
          setError("User not found");
        } else if (err.request) {
          // Request was made but no response received
          setError("Network error. Please try again later.");
        } else {
          // Something else happened
          setError("An unexpected error occurred.");
        }
      }
    };

    const fetchRepos = async () => {
      try {
        // Fetch user repositories from the GitHub API
        const response = await axios.get(`/api/github/users/${username}/repos`);
        setRepos(response.data); // Set repositories
      } catch (err) {
        setError("Repositories not found"); // Handle error if repositories are not found
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserDetails(); // Call function to fetch user details
    fetchRepos(); // Call function to fetch repositories
  }, [username]); // Dependency array to re-run effect if username changes

  // Calculate the current repos to display
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(repos.length / reposPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div>
      {loading ? (
        <div className="loader">
          <ClipLoader size={150} />
        </div>
      ) : (
        <>
          {error && <p>{error}</p>} {/* Show error message */}
          {/* Display user details if available */}
          {user && (
            <div className="user-details">
              <h2>{user.login}</h2>
              <img src={user.avatar_url} alt={user.login} />
              <p>Public Repositories: {user.public_repos}</p>
              <p>Followers: {user.followers}</p>
              <p>Following: {user.following}</p>
              <p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile on GitHub
                </a>
              </p>
            </div>
          )}
          <h2>Repositories for {username}</h2>
          <ul>
            {currentRepos.map((repo) => (
              <li key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description available"}</p>
                <p>Stars: {repo.stargazers_count}</p> {/* Add stars count */}
                <p>Forks: {repo.forks_count}</p> {/* Add forks count */}
                <p>Language: {repo.language || "Not specified"}</p>{" "}
                {/* Add language */}
                <p>
                  Last committed:{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </li>
            ))}
          </ul>
          <Pagination /> {/* Include the pagination component */}
        </>
      )}
    </div>
  );
};

export default UserDetails;
