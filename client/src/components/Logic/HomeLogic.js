// Import necessary hooks and utilities from React and React Router
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../../newsService'; // Import a custom function to fetch news

// Custom hook definition for managing the Home page logic
export const useHomeLogic = () => {
  // State management for articles, search query, and pagination
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Effect hook to handle theme changes based on local storage setting
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Effect hook to fetch news articles whenever the query or page changes
  useEffect(() => {
    const getNews = async () => {
      try {
        const news = await fetchNews(query, page);
        setArticles(news);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    getNews();
  }, [query, page]);

  // Function to handle user navigation to the login page
  const handleLogin = () => {
    navigate('/Login');
  };

  // Function to handle user navigation to the registration page
  const handleSignIn = () => {
    navigate('/register');
  };

  // Function to handle search operations, with prompt for user input
  const handleSearch = () => {
    const searchQuery = prompt('Enter search term:');
    if (searchQuery) {
      setQuery(searchQuery);
      setPage(1);
    } else {
      setQuery('');
      setPage(1);
    }
  };

  // Function to toggle the theme between 'dark' and 'light' modes
  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  // Expose the state and functions to components using this hook
  return {
    articles,
    handleLogin,
    handleSignIn,
    handleSearch,
    toggleTheme,
  };
};
