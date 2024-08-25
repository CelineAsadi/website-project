// FavoritesPageLogic.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const useFavoritesPageLogic = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  
  const [notification, setNotification] = useState(''); 
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchFavorites = async () => {
      const userIdFromStorage = localStorage.getItem('userId');
      if (!userIdFromStorage) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://website-project-orpin.vercel.app/favorites/${userIdFromStorage}`);
        setFavorites(response.data.favorites || []);
      } catch (error) {
        setError('Failed to fetch favorite news');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const removeFavorite = async (newsUrl) => {
    try {
      await axios.post(`https://website-project-orpin.vercel.app/favorites/remove`, { userId, newsUrl });
      setFavorites(favorites.filter(favorite => favorite.url !== newsUrl));
      setNotification('News item removed from favorites.');
    } catch (error) {
      setError('Failed to remove favorite news');
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
    notification,
    favorites,
    loading,
    error,
    removeFavorite,
  };
};
