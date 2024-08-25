// FavoritesPage.js
import React from 'react';
import { useFavoritesPageLogic } from './Logic/FavoritesPageLogic';
import './Style/FavoritesPage.css';

const FavoritesPage = () => {
  const {
    notification,
    favorites,
    loading,
    error,
    removeFavorite,
  } = useFavoritesPageLogic();

  return (
    <div className="favorites-page-container">
      <h1 className="favorites-page-title">Favorite News</h1>
      
      {notification && (
        <div className={`favorites-page-notification ${notification.includes('removed') ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification}
        </div>
      )}
      
      {loading && <p className="favorites-page-loading">Loading...</p>}
      {error && <p className="favorites-page-error">{error}</p>}
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
export default FavoritesPage;
