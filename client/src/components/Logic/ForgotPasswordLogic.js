// Import necessary React hooks and utilities
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

// Custom hook for managing the forgot password functionality
export const useForgotPasswordLogic = () => {
    // State variables for form fields, error handling, and user notifications
    const [email, setEmail] = useState(''); 
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [notification, setNotification] = useState(''); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const navigate = useNavigate(); 

    // Effect hook to set the theme based on local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark'); // Set dark mode if 'theme' is set to 'dark'
    }, []);

    // Function to handle forgot password form submission
    const handleForgotPassword = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setErrors({}); // Clear previous errors
        setNotification(''); // Clear previous notifications

        // Form validation checks
        if (!email || !newPassword || !confirmPassword) {
            setErrors({ form: 'Please fill in all fields.' });
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setErrors({ form: 'Email must end with @gmail.com' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrors({ form: 'Passwords do not match.' });
            return;
        }

        // Sending request to server to reset password
        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/ForgotPassword', { email, newPassword });

            // Handle response based on server's reply
            if (response.data.message === 'Password reset success') {
                setNotification('Password has been successfully reset.');
                setTimeout(() => {
                    navigate("/Login"); // Navigate to login page after reset
                }, 1000); 
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err); 
            setErrors({ form: 'An error occurred. Please try again later.' });
        }
    };

    // Return states and functions to be used by the component
    return {
        email,
        setEmail,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        notification,
        isDarkMode,
        handleForgotPassword,
    };
};
