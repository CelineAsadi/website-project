// Import React and related hooks
import React from 'react';
// Import custom logic hook for home-specific functionalities
import { useHomeLogic } from './Logic/HomeLogic';
// Import the Footer component for display at the bottom of the page
import Footer from './Footer'; 
// Import CSS for styling the component
import './Style/Home.css';
// Define the Home functional component
function Home() {
  // Destructuring necessary variables and functions from the custom logic hook
  const {
    articles,          // Articles to be displayed
    handleLogin,       // Function to handle user login
    handleSignIn,      // Function to handle user sign up
    handleSearch,      // Function to initiate a search
    toggleTheme,       // Function to toggle the site's theme
  } = useHomeLogic();

  // Component layout and functionality
  return (
    <div className="home-container">
      {/* Header section containing the site title and search button */}
      <header className="home-header">
        <h1 className="home-title">TRENDING NEWS</h1>
        <button
          className="home-search-button"
          onClick={handleSearch} // Trigger search when button is clicked
        >
          Search
        </button>
      </header>
      {/* Main content area for displaying articles */}
      <main className="home-main">
        <div className="home-articles">
          {articles.length === 0 ? (
            // Display message if no articles are found
            <p className="home-no-articles">No articles found.</p>
          ) : (
            // Map through articles array to display each article
            articles.map((article, index) => (
              <div key={index} className="home-article-item">
                <h3 className="home-article-title">{article.title}</h3>
                <p className="home-article-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="home-article-link">
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      </main>
      {/* Footer section with login, signup, and theme toggle buttons */}
      <div className="home-footer">
        <button className="home-login-button" onClick={handleLogin}>
          Log In
        </button>
        <button className="home-signup-button" onClick={handleSignIn}>
          Sign up
        </button>
        <button className="home-toggle-theme-button" onClick={toggleTheme}>
          Toggle Theme
        </button>
      </div>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}
// Export the Home component for use in other parts of the application
export default Home;
