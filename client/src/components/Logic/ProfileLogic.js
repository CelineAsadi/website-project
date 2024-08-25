// Import necessary hooks from React and other utilities
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchNews } from  '../../newsService'; // Adjust this import based on your file structure

// Define a custom hook for managing the profile page logic
export const useProfileLogic = () => {
  // State variables for storing news, UI states, user preferences, and user data
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState('');

  // Hook to handle navigation programmatically
  const navigate = useNavigate();
  // Retrieve the user ID from local storage
  const userId = localStorage.getItem('userId');

  // Fetch news on component mount using an asynchronous function
  useEffect(() => {
    const getNews = async () => {
      try {
        const newsData = await fetchNews();
        setNews(newsData);
      } catch (error) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  // Effect to handle dark mode changes and synchronize with local storage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Function to toggle the dark mode setting
  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Function to navigate to the Favorites page with state parameters
  const handleFavoritesPage = () => {
    navigate('/FavoriteNews', { state: { userId, darkMode: isDarkMode } });
  };

  // Function to log out the user and clear relevant data from local storage
  const handleLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('favorites');
    navigate('/');
  };

  // Function to navigate to the Profile Card page with state parameters
  const handleProfileCardPage = () => {
    navigate('/ProfileCard', { state: { userId, darkMode: isDarkMode } });
  };

  // Function to categorize news articles by their category
  const categorizedNews = news.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Function to filter news based on the selected category
  const filteredNews = selectedCategory === 'All' 
    ? news 
    : categorizedNews[selectedCategory] || [];

  // Function to toggle a news item's favorite status
  const handleToggleFavorite = async (newsItem) => {
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

  // Clear notifications automatically after a short delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Expose states and handlers for use in UI components
  return {
    news,
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
  };
};
