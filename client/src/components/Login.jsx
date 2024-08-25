// Login.js
import React from "react";
import { useLoginLogic } from "./Logic/LoginLogic";
import { Link } from 'react-router-dom';
import './Style/Login.css';

function Login() {
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

    return (
        <div className={`login-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="login-box">
                <h1 className="login-title">
                    <i className="fa-solid fa-user"></i> Login
                </h1>
                <hr className="login-divider" />
                <form onSubmit={handleLogin}>
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
                        {errors.username && <p className="login-error-message">{errors.username}</p>}
                    </div>

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
                        {errors.password && <p className="login-error-message">{errors.password}</p>}
                    </div>

                    {errors.form && <p className="login-error-message">{errors.form}</p>}
                    {notification && <p className="login-notification">{notification}</p>}

                    <div className="login-button-group">
                        <button type="submit" className="login-button">
                            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login
                        </button>
                    </div>
                </form>

                <Link to="/ForgotPassword" className="login-forgot-password">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}

export default Login;
