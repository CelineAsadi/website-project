// Import necessary React library and hooks
import React from "react";
// Import the custom hook for login logic
import { useLoginLogic } from "./Logic/LoginLogic";
// Import Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';
// Import CSS for styling
import './Style/Login.css';

// Define the Login functional component
function Login() {
    // Destructure variables and functions from the custom login logic hook
    const {
        username,
        setUsername,
        password,
        setPassword,
        errors,
        setErrors, 
        isDarkMode,
        notification,
        handleLogin,
    } = useLoginLogic();

    // Render the component with conditional styling based on dark mode
    return (
        <div className={`login-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="login-box">
                <h1 className="login-title">
                    <i className="fa-solid fa-user"></i> Login
                </h1>
                <hr className="login-divider" />
                {/* Form for login credentials */}
                <form onSubmit={handleLogin}>
                    {/* Input group for username */}
                    <div className="login-input-group">
                        <label htmlFor="username" className="login-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                            }}
                            className={`login-input ${errors.username ? 'login-input-error' : ''}`}
                            placeholder="Enter Username..."
                        />
                        {/* Display error message for username if any */}
                        {errors.username && <p className="login-error-message">{errors.username}</p>}
                    </div>

                    {/* Input group for password */}
                    <div className="login-input-group">
                        <label htmlFor="password" className="login-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                            }}
                            className={`login-input ${errors.password ? 'login-input-error' : ''}`}
                            placeholder="Enter password..."
                        />
                        {/* Display error message for password if any */}
                        {errors.password && <p className="login-error-message">{errors.password}</p>}
                    </div>

                    {/* Display form-wide error messages if any */}
                    {errors.form && <p className="login-error-message">{errors.form}</p>}
                    {/* Display notification if any */}
                    {notification && <p className="login-notification">{notification}</p>}

                    {/* Grouping for login button */}
                    <div className="login-button-group">
                        <button type="submit" className="login-button">
                            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login
                        </button>
                    </div>
                </form>

                {/* Link for password recovery */}
                <Link to="/ForgotPassword" className="login-forgot-password">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}
// Export the Login component for use in other parts of the application
export default Login;
