// RegisterLogic.js
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const useRegisterLogic = () => {
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [notification, setNotification] = useState(''); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark'); 
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setErrors({}); 
        setNotification(''); 

        if (!username || !email || !phone || !password || !confirmPassword) {
            setErrors({ form: 'Please fill in all fields.' });
            return;
        }

        if (password !== confirmPassword) {
            setErrors({ form: 'Passwords do not match.' });
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setErrors({ form: 'Email must end with @gmail.com.' });
            return;
        }

        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            setErrors({ form: 'The phone number must be exactly 10 digits.' });
            return;
        }

        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/Register', {
                username,
                email,
                phone,
                password
            });

            if (response.data.message === 'Registration success') {
                setNotification('You have been signed up successfully.');
                setTimeout(() => {
                    navigate("/Login"); 
                }, 1000); 
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err); 
            setErrors({ form: 'An error occurred. Please try again later.' });
        }
    };

    return {
        username,
        setUsername,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        setErrors, // Ensure setErrors is returned here
        notification,
        isDarkMode,
        handleSubmit,
    };
};
