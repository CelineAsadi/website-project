// ProfileCardLogic.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const useProfileCardLogic = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const { userId, darkMode } = location.state || {};
  const [isDarkMode, setIsDarkMode] = useState(darkMode || false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const isValidEmail = email.endsWith('@gmail.com');

    if (!isValidEmail) {
      setErrors({
        email: !isValidEmail ? 'Email must end with @gmail.com' : ''
      });
      return;
    }

    try {
      const response = await axios.put(`https://website-project-orpin.vercel.app/update-profile/${userId}`, {
        username,
        email,
        phone
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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return {
    username,
    setUsername,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    notification,
    notificationType,
    loading,
    isDarkMode,
    setIsDarkMode,
    handleUpdate
  };
};
