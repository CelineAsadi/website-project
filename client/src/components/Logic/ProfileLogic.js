import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchNews } from  '../../newsService'; // Adjust this import based on your file structure

export const useProfileLogic = () => {
  // State variables
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Fetch news on component mount
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

  // Handle dark mode toggle and save preference to localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
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
    navigate('/');
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
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
    news,
    loading,
    error,
    isDarkMode,
    selectedCategory,
    setSelectedCategory, // Ensure this is returned
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
