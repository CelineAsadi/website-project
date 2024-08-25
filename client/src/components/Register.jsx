// Register.js
import React from "react";
import { useRegisterLogic } from "./Logic/RegisterLogic";
import   './Style/Register.css';

function Register() {
    const {
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
        setErrors, 
        notification,
        isDarkMode,
        handleSubmit,
    } = useRegisterLogic();

    return (
        <div className={`register-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="register-box">
                <h1 className="register-title">
                    <i className="fa-solid fa-user-plus"></i> Register
                </h1>
                <hr className="register-divider" />
                <form onSubmit={handleSubmit}>
                    <div className="register-input-group">
                        <label htmlFor="username" className="register-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                            }}
                            className={`register-input ${errors.username ? 'register-input-error' : ''}`}
                            placeholder="Enter Username..."
                        />
                        {errors.username && <p className="register-error-message">{errors.username}</p>}
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="email" className="register-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                            }}
                            className={`register-input ${errors.email ? 'register-input-error' : ''}`}
                            placeholder="Enter email..."
                        />
                        {errors.email && <p className="register-error-message">{errors.email}</p>}
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="phone" className="register-label">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
                            }}
                            className={`register-input ${errors.phone ? 'register-input-error' : ''}`}
                            placeholder="Enter phone..."
                        />
                        {errors.phone && <p className="register-error-message">{errors.phone}</p>}
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="password" className="register-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                            }}
                            className={`register-input ${errors.password ? 'register-input-error' : ''}`}
                            placeholder="Enter password..."
                        />
                        {errors.password && <p className="register-error-message">{errors.password}</p>}
                    </div>

                    <div className="register-input-group">
                        <label htmlFor="confirmPassword" className="register-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
                            }}
                            className={`register-input ${errors.confirmPassword ? 'register-input-error' : ''}`}
                            placeholder="Confirm password..."
                        />
                        {errors.confirmPassword && <p className="register-error-message">{errors.confirmPassword}</p>}
                    </div>

                    {errors.form && <p className="register-error-message">{errors.form}</p>}
                    {notification && <p className="register-notification">{notification}</p>}

                    <div className="register-button-group">
                        <button type="submit" className="register-button">
                            <i className="fa-solid fa-user-plus"></i>&nbsp;&nbsp;Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
