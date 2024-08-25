// Home.js
import React from 'react';
import { useHomeLogic } from './Logic/HomeLogic';
import Footer from './Footer'; // Import the Footer component
import './Style/Home.css'; // Import the CSS file

function Home() {
  const {
    articles,
    handleLogin,
    handleSignIn,
    handleSearch,
    DarkTheme,
  } = useHomeLogic();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">TRENDING NEWS</h1>
        <button
          className="home-search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </header>
      <main className="home-main">
        <div className="home-articles">
          {articles.length === 0 ? (
            <p className="home-no-articles">No articles found.</p>
          ) : (
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
      <div className="home-footer">
        <button className="home-login-button" onClick={handleLogin}>
          Log In
        </button>
        <button className="home-signup-button" onClick={handleSignIn}>
          Sign up
        </button>
        <button className="home-toggle-theme-button" onClick={toggleTheme}>
          Dark Mode
        </button>
      </div>
      <Footer /> {/* Use the Footer component */}
    </div>
  );
}

export default Home;