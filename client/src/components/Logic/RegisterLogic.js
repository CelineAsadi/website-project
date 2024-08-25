// Import necessary hooks from React and axios for making HTTP requests
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

// Define a custom hook for managing registration logic
export const useRegisterLogic = () => {
    // State variables to store user input and UI states
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [notification, setNotification] = useState(''); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const navigate = useNavigate(); 

    // Effect to retrieve and set the theme mode from local storage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark'); 
    }, []);

    // Handle form submission for user registration
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form behavior
        setErrors({}); // Clear previous errors
        setNotification(''); // Clear previous notifications

        // Basic validation for form fields
        if (!username || !email || !phone || !password || !confirmPassword) {
            setErrors({ form: 'Please fill in all fields.' });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrors({ form: 'Passwords do not match.' });
            return;
        }

        // Validate email suffix
        if (!email.endsWith('@gmail.com')) {
            setErrors({ form: 'Email must end with @gmail.com.' });
            return;
        }

        // Validate phone number format
        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            setErrors({ form: 'The phone number must be exactly 10 digits.' });
            return;
        }

        // Attempt to register the user via a POST request
        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/Register', {
                username, email, phone, password
            });

            // Handle response based on registration outcome
            if (response.data.message === 'Registration success') {
                setNotification('You have been signed up successfully.');
                setTimeout(() => {
                    navigate("/Login"); // Navigate to login after successful registration
                }, 1000); 
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err); 
            setErrors({ form: 'An error occurred. Please try again later.' });
        }
    };

    // Return state variables and handlers for use in UI components
    return {
        username, setUsername,
        email, setEmail,
        phone, setPhone,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors, setErrors,
        notification, isDarkMode,
        handleSubmit,
    };
};
