// ForgotPasswordLogic.js
import { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export const useForgotPasswordLogic = () => {
    const [email, setEmail] = useState(''); 
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [notification, setNotification] = useState(''); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark'); 
    }, []);

    const handleForgotPassword = async (event) => {
        event.preventDefault(); 
        setErrors({}); 
        setNotification(''); 

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

        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/ForgotPassword', { email, newPassword });

            if (response.data.message === 'Password reset success') {
                setNotification('Password has been successfully reset.');
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
