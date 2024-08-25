// Import React and related hooks
import React from 'react';
// Import the custom hook managing the favorites page logic
import { useFavoritesPageLogic } from './Logic/FavoritesPageLogic';
// Import specific CSS styles for this component
import './Style/FavoritesPage.css';

// Define the FavoritesPage functional component
const FavoritesPage = () => {
  // Destructure variables and functions from the custom hook
  const {
    notification,
    favorites,
    loading,
    error,
    removeFavorite,
  } = useFavoritesPageLogic();

  // Render the component
  return (
    <div className="favorites-page-container">
      <h1 className="favorites-page-title">Favorite News</h1>
      
      {/* Display notification if available, with dynamic background color based on content */}
      {notification && (
        <div className={`favorites-page-notification ${notification.includes('removed') ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification}
        </div>
      )}
      
      {/* Conditionally render loading or error messages */}
      {loading && <p className="favorites-page-loading">Loading...</p>}
      {error && <p className="favorites-page-error">{error}</p>}
      
      {/* Render list of favorites if available, otherwise display a no-items message */}
      {!loading && !error && favorites.length ? (
        <ul className="favorites-page-list">
          {favorites.map((newsItem, index) => (
            <li key={index} className="favorites-page-item">
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="favorites-page-link">
                Read more
              </a>
              <p className="favorites-page-description">{newsItem.description}</p>
              <button 
                onClick={() => removeFavorite(newsItem.url)} 
                className="favorites-page-remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="favorites-page-no-items">No favorite news items found</p>
      )}
    </div>
  );
};

// Export the FavoritesPage component for use in other parts of the application
export default FavoritesPage;
