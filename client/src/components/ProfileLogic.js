// ProfileLogic.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchNews } from '../newsService'; // Adjust this import based on your file structure

export const useProfileLogic = () => {
  // State variables
  const [news, setNews] = useState([]); // Stores news articles
  const [loading, setLoading] = useState(true); // Loading state for news fetching
  const [error, setError] = useState(null); // Error state for news fetching
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true'); // Dark mode state
  const [selectedCategory, setSelectedCategory] = useState('All'); // Selected category for filtering news
  const [favorites, setFavorites] = useState([]); // Stores favorite news articles
  const [notification, setNotification] = useState(''); // Notification state

  const navigate = useNavigate(); // Hook for navigation
  const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage

  // Fetch news when the component mounts
  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchNews(); // Fetch news data
        setNews(newsData); // Update state with news data
      } catch (error) {
        setError('Failed to fetch news'); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    getNews();
  }, []);

  // Handle dark mode toggle and save preference to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Add dark mode class
      localStorage.setItem('darkMode', 'true'); // Save preference to localStorage
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark mode class
      localStorage.setItem('darkMode', 'false'); // Save preference to localStorage
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle dark mode state
  };

  // Navigate to Favorites page
  const handleFavoritesPage = () => {
    navigate('/FavoriteNews', { state: { userId, darkMode: isDarkMode } });
  };

  // Log out and clear localStorage
  const handleLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('favorites');
    navigate('/'); // Navigate to the home screen
  };

  // Navigate to Profile Card page
  const handleProfileCardPage = () => {
    navigate('/ProfileCard', { state: { userId, darkMode: isDarkMode } });
  };

  // Categorize news articles
  const categorizedNews = news.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Filter news based on selected category
  const filteredNews = selectedCategory === 'All' 
    ? news 
    : categorizedNews[selectedCategory] || [];

  // Handle adding or removing news from favorites
  const handleToggleFavorite = async (newsItem) => {
    const userId = localStorage.getItem('userId');
    try {
      const isFavorite = favorites.some(fav => fav.url === newsItem.url);

      if (isFavorite) {
        // Remove from favorites
        await axios.post('https://website-project-orpin.vercel.app/favorites/remove', { userId, newsUrl: newsItem.url });
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.url !== newsItem.url));
      } else {
        // Add to favorites
        await axios.post('https://website-project-orpin.vercel.app/favorites/add', { userId, newsUrl: newsItem.url, newsDescription: newsItem.description });
        setFavorites(prevFavorites => [...prevFavorites, { url: newsItem.url, description: newsItem.description }]);
        setNotification('News item added to favorites.');
      }
    } catch (error) {
      console.error('Failed to toggle favorite status', error);
      setNotification('Failed to update favorite status.');
    }
  };

  // Clear notifications after a delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
    news,
    loading,
    error,
    isDarkMode,
    selectedCategory,
    favorites,
    notification,
    handleToggleDarkMode,
    handleFavoritesPage,
    handleLogOut,
    handleProfileCardPage,
    handleToggleFavorite,
    filteredNews,
  };
};
