import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import "./UserSearch.css"; // Corrected import statement

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${username}`
      );
      setUsers(response.data.items);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="user-search">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search for a GitHub user"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && (
        <div className="loader">
          <ClipLoader size={50} />
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <Link to={`/user/${user.login}`} className="user-link">
              {user.login}
            </Link>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              GitHub Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
