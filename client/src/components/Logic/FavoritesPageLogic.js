// Import necessary hooks and libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Custom hook definition for managing the Favorites page logic
export const useFavoritesPageLogic = () => {
  // Access the current location object provided by React Router
  const location = useLocation();
  // Attempt to extract userId from the location state, if available
  const userId = location.state?.userId;
  
  // State for managing notifications, favorites list, loading state, and errors
  const [notification, setNotification] = useState(''); 
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Effect hook to fetch favorites from the server on component mount or userId change
  useEffect(() => {
    const fetchFavorites = async () => {
      // Attempt to retrieve the userId from localStorage if not provided in location state
      const userIdFromStorage = localStorage.getItem('userId');
      if (!userIdFromStorage) {
        setError('User ID is missing');
        setLoading(false);
        return;
      }

      // Fetching favorites using axios and handling response or errors
      try {
        const response = await axios.get(`https://website-project-orpin.vercel.app/favorites/${userIdFromStorage}`);
        setFavorites(response.data.favorites || []);
      } catch (error) {
        setError('Failed to fetch favorite news');
      } finally {
        setLoading(false); // Ensure loading is set to false after the operation
      }
    };

    fetchFavorites();
  }, [userId]);

  // Function to handle the removal of a favorite item
  const removeFavorite = async (newsUrl) => {
    try {
      // Send a POST request to remove the favorite item from the backend
      await axios.post(`https://website-project-orpin.vercel.app/favorites/remove`, { userId, newsUrl });
      // Update the local favorites state by filtering out the removed item
      setFavorites(favorites.filter(favorite => favorite.url !== newsUrl));
      // Set a notification for successful removal
      setNotification('News item removed from favorites.');
    } catch (error) {
      setError('Failed to remove favorite news'); // Handle errors in removing favorites
    }
  };

  // Effect hook to clear notifications after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer); // Cleanup to prevent memory leaks
    }
  }, [notification]);

  // Expose the state and functions to components using this hook
  return {
    notification,
    favorites,
    loading,
    error,
    removeFavorite,
  };
};
