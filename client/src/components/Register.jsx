import React from "react";
import { useRegisterLogic } from "./Logic/RegisterLogic";
import './Style/Register.css';
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
    // Render the component with conditional styling based on dark mode
    return (
        <div className={`register-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="register-box">
                <h1 className="register-title">
                    <i className="fa-solid fa-user-plus"></i> Register
                </h1>
                <hr className="register-divider" />
                {/* Form to handle registration submission */}
                <form onSubmit={handleSubmit}>
                    {/* Input group for username */}
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
                        {/* Error message for username if any */}
                        {errors.username && <p className="register-error-message">{errors.username}</p>}
                    </div>
                    {/* Input group for email */}
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
                        {/* Error message for email if any */}
                        {errors.email && <p className="register-error-message">{errors.email}</p>}
                    </div>
                    {/* Input group for phone */}
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
                        {/* Error message for phone if any */}
                        {errors.phone && <p className="register-error-message">{errors.phone}</p>}
                    </div>
                    {/* Input group for password */}
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
                        {/* Error message for password if any */}
                        {errors.password && <p className="register-error-message">{errors.password}</p>}
                    </div>
                    {/* Input group for confirming password */}
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
                        {/* Error message for confirming password if any */}
                        {errors.confirmPassword && <p className="register-error-message">{errors.confirmPassword}</p>}
                    </div>
                    {/* Display general form errors if any */}
                    {errors.form && <p className="register-error-message">{errors.form}</p>}
                    {/* Notification message display */}
                    {notification && <p className="register-notification">{notification}</p>}
                    {/* Submit button group */}
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
