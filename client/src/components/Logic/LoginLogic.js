// Import necessary hooks and utilities from React, axios for HTTP requests, and react-router-dom for navigation
import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Define a custom hook for managing login logic
export const useLoginLogic = () => {
    // State for handling user inputs, errors, dark mode, and notifications
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const [notification, setNotification] = useState(''); 

    // Hook to handle navigation programmatically
    const navigate = useNavigate();

    // Effect hook to set the theme based on user preference stored in local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark'); // Set dark mode if saved theme is 'dark'
    }, []);

    // Function to handle the login process
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setErrors({}); // Clear any previous errors
        setNotification(''); // Clear any previous notifications

        // Attempt to log in via a POST request to the server
        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/Login', { username, password });

            // Handle response from server
            if (response.data.message === 'Login success') {
                const user = response.data;
                localStorage.setItem('userId', user._id); // Save user ID to local storage for session management
                setNotification('Login successful'); // Set login success notification
                setTimeout(() => {
                    navigate("/Profile"); // Navigate to profile page after successful login
                }, 1000);
            } else {
                setErrors({ form: response.data.message }); // Set errors received from the server
                setNotification(''); // Clear notification if login failed
            }
        } catch (err) {
            console.error(err); // Log any errors to the console
            setErrors({ form: 'Username or password is incorrect. Please try again.' }); // Set custom error message on exception
            setNotification(''); // Clear notification on error
        }
    };

    // Return states and function handlers for use in UI components
    return {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors,
        isDarkMode,
        notification,
        handleLogin,
    };
};
