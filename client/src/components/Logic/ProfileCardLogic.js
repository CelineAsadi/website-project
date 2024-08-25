// Import necessary hooks and axios for HTTP requests
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Custom hook for managing the logic of a user profile card
export const useProfileCardLogic = () => {
  // State hooks for managing user data, errors, and UI states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [loading, setLoading] = useState(true);

  // Access location object to retrieve passed state parameters
  const location = useLocation();
  const { userId, darkMode } = location.state || {};
  // Manage dark mode preference locally
  const [isDarkMode, setIsDarkMode] = useState(darkMode || false);

  // Effect hook to synchronize dark mode state with local storage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode class based on the state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  // Fetch user profile data from the server based on the userId
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) {
        setErrors({ userId: 'User ID is missing' });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://website-project-orpin.vercel.app/profilecard/${userId}`);
        const { username, email, phone } = response.data;
        setUsername(username);
        setEmail(email);
        setPhone(phone);
      } catch (error) {
        setNotification('Failed to fetch profile data.');
        setNotificationType('error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Handle the submission to update user profile data
  const handleUpdate = async (e) => {
    e.preventDefault();

    const isValidEmail = email.endsWith('@gmail.com');
    if (!isValidEmail) {
      setErrors({ email: 'Email must end with @gmail.com' });
      return;
    }

    try {
      const response = await axios.put(`https://website-project-orpin.vercel.app/update-profile/${userId}`, {
        username, email, phone
      });
      setNotification(response.data.message || 'Profile updated successfully');
      setNotificationType('success');
    } catch (error) {
      if (error.response && error.response.data) {
        setNotification(error.response.data.message || 'Failed to update profile.');
        setNotificationType('error');
      } else {
        setNotification('Failed to update profile.');
        setNotificationType('error');
      }
    } finally {
      setTimeout(() => {
        setNotification('');
        setNotificationType('');
      }, 2000);
    }
  };

  // Clear errors automatically after a delay
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Return states and function handlers to be utilized by the component
  return {
    username, setUsername,
    email, setEmail,
    phone, setPhone,
    errors, notification, notificationType,
    loading, isDarkMode, setIsDarkMode,
    handleUpdate
  };
};
