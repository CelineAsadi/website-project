import React from 'react';
import { useProfileLogic } from './Logic/ProfileLogic'; // Adjust the import path as needed
import Footer from './Footer'; // Import the Footer component
import './Style/Profile.css'; // Import the CSS file

const Profile = () => {
  const {
    loading,
    error,
    isDarkMode,
    selectedCategory,
    setSelectedCategory,
    favorites,
    notification,
    handleToggleDarkMode,
    handleFavoritesPage,
    handleLogOut,
    handleProfileCardPage,
    handleToggleFavorite,
    categorizedNews,
    filteredNews,
  } = useProfileLogic();

  return (
    <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
      </header>
      <main className="profile-main">
        <div className="mb-4">
          <label htmlFor="category-select" className="profile-category-label">Select Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Fix the error here
            className="profile-category-select"
          >
            <option value="All">All</option>
            {Object.keys(categorizedNews).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {notification && (
          <div className="profile-notification">
            {notification}
          </div>
        )}

        {loading && <p className="profile-loading">Loading...</p>}
        {error && <p className="profile-error">{error}</p>}
        {!loading && !error && (selectedCategory === 'Favorites' ? favorites : filteredNews).length ? (
          <ul className="profile-news-list">
            {(selectedCategory === 'Favorites' ? favorites : filteredNews).map(newsItem => (
              <li key={newsItem.id} className="profile-news-item">
                <h3 className="profile-news-title">{newsItem.title}</h3>
                <p className="profile-news-description">{newsItem.description}</p>
                <button
                  onClick={() => handleToggleFavorite(newsItem)}
                  className="profile-favorite-button"
                >
                  <i className={`fa-solid fa-star ${favorites.some(fav => fav.url === newsItem.url) ? 'text-yellow-600' : 'profile-favorite-icon'}`}></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news available in this category</p>
        )}
      </main>

      <aside className="profile-aside">
        <button
          onClick={handleProfileCardPage}
          className="profile-button profile-button-card"
        >
          Profile Card
        </button>
        <button
          onClick={handleFavoritesPage}
          className="profile-button profile-button-favorites"
        >
          Favorite News
        </button>
        <button
          onClick={handleLogOut}
          className="profile-button profile-button-logout"
        >
          Log Out
        </button>
        <button
          onClick={handleToggleDarkMode}
          className="profile-button profile-button-toggle"
        >
          Dark Mode
        </button>
      </aside>

      <Footer />
    </div>
  );
};

export default Profile;
