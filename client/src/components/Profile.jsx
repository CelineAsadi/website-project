// Import necessary React library and components
import React from 'react';
import { useProfileLogic } from './Logic/ProfileLogic'; // Import custom logic for Profile
import Footer from './Footer'; // Import the Footer component for use at the bottom of the page
import './Style/Profile.css'; // Import CSS for styling

// Define the Profile functional component
const Profile = () => {
  // Destructure necessary variables and functions from the custom hook
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
  // Render the Profile component with conditional styling based on dark mode
  return (
    <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Header section of the profile */}
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
      </header>
      {/* Main content area for profile */}
      <main className="profile-main">
        {/* Dropdown for selecting news category */}
        <div className="mb-4">
          <label htmlFor="category-select" className="profile-category-label">Select Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
        {/* Display notification if present */}
        {notification && (
          <div className="profile-notification">
            {notification}
          </div>
        )}
        {/* Display loading message or error message */}
        {loading && <p className="profile-loading">Loading...</p>}
        {error && <p className="profile-error">{error}</p>}
        {/* List news items based on the selected category */}
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
      {/* Sidebar for profile-related actions */}
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
          Toggle Theme
        </button>
      </aside>
      {/* Include the Footer component */}
      <Footer />
    </div>
  );
};
// Export the Profile component for use in other parts of the application
export default Profile;
