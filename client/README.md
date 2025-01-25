# GitHub User Search

This project is a web application that allows users to search for GitHub users and view their details and repositories. The application is built with React for the frontend and Express for the backend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for GitHub users by username
- View user details including avatar, public repositories, followers, and following count
- View a list of user repositories with details including name, description, stars, forks, language, and last commit date
- Pagination for repositories
- Loading indicators for data fetching
- Error handling for network issues and user not found

## Installation

### Prerequisites

- Node.js and npm installed on your machine

### Backend Setup

1. Clone the repository and navigate to the server directory:

bash
git clone https://github.com/Siphoxx/github-user-search.git
cd github-user-search/server

Install the server dependencies:

bash
npm install
Create a .env file in the server directory and add your GitHub token:

plaintext
GITHUB_TOKEN=your_github_token_here
Start the server using Nodemon:

bash
npm run dev
Frontend Setup
Navigate to the client directory:

bash
cd ../client
Install the client dependencies:

bash
npm install
Start the React development server:

bash
npm start
Usage
Open your browser and navigate to http://localhost:3000.
Use the search bar to search for a GitHub user by their username.
Click on a user to view their details and repositories.
Project Structure
Code
github-user-search/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── UserDetails.js
│ │ │ ├── UserSearch.js
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── UserDetails.css
│ │ ├── UserSearch.css
│ ├── package.json
├── server/
│ ├── routes/
│ │ ├── github.js
│ ├── server.js
│ ├── .env
│ ├── package.json

# Dependencies

- Backend
- express
- axios
- cors
- helmet
- dotenv
- jest (dev dependency)
- supertest (dev dependency)
- nodemon (dev dependency)
- Frontend
- react
- react-dom
- react-router-dom
- axios
- react-spinners

# Contributing

- Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

# License

- This project is licensed under the MIT License. See the LICENSE file for details.
