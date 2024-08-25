// HomeLogic.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../../newsService'; // Adjust the import as needed

export const useHomeLogic = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleSignIn = () => {
    navigate('/register');
  };

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

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  };

  return {
    articles,
    handleLogin,
    handleSignIn,
    handleSearch,
    toggleTheme,
  };
};
