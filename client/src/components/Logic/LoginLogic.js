import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export const useLoginLogic = () => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const [notification, setNotification] = useState(''); 

    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsDarkMode(savedTheme === 'dark');
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrors({});
        setNotification('');

        try {
            const response = await axios.post('https://website-project-orpin.vercel.app/Login', { username, password });

            if (response.data.message === 'Login success') {
                const user = response.data;
                localStorage.setItem('userId', user._id);
                setNotification('Login successful');
                setTimeout(() => {
                    navigate("/Profile");
                }, 1000);
            } else {
                setErrors({ form: response.data.message });
                setNotification('');
            }
        } catch (err) {
            console.error(err);
            setErrors({ form: 'Username or password is incorrect. Please try again.' });
            setNotification('');
        }
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors, // Ensure this is returned
        isDarkMode,
        notification,
        handleLogin,
    };
};
