// ForgotPassword.js
import React from "react";
import { useForgotPasswordLogic } from   "./Logic/ForgotPasswordLogic";
import  './Style/ForgotPassword.css';

function ForgotPassword() {
    const {
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
    } = useForgotPasswordLogic();

    return (
        <div className={`forgot-password-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="forgot-password-box">
                <h1 className="forgot-password-title">
                    <i className="fa-solid fa-lock"></i> Forgot Password
                </h1>
                <hr className="forgot-password-divider" />
                <form onSubmit={handleForgotPassword}>
                    <div className="forgot-password-input-group">
                        <label htmlFor="email" className="forgot-password-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`forgot-password-input ${errors.email ? 'forgot-password-input-error' : ''}`}
                            placeholder="Enter your email..."
                        />
                        {errors.email && <p className="forgot-password-error-message">{errors.email}</p>}
                    </div>

                    <div className="forgot-password-input-group">
                        <label htmlFor="newPassword" className="forgot-password-label">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`forgot-password-input ${errors.newPassword ? 'forgot-password-input-error' : ''}`}
                            placeholder="Enter new password..."
                        />
                        {errors.newPassword && <p className="forgot-password-error-message">{errors.newPassword}</p>}
                    </div>

                    <div className="forgot-password-input-group">
                        <label htmlFor="confirmPassword" className="forgot-password-label">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`forgot-password-input ${errors.confirmPassword ? 'forgot-password-input-error' : ''}`}
                            placeholder="Confirm new password..."
                        />
                        {errors.confirmPassword && <p className="forgot-password-error-message">{errors.confirmPassword}</p>}
                    </div>

                    {errors.form && <p className="forgot-password-error-message">{errors.form}</p>}
                    {notification && <p className="forgot-password-notification">{notification}</p>}

                    <div className="forgot-password-button-group">
                        <button type="submit" className="forgot-password-button">
                            <i className="fa-solid fa-key"></i>&nbsp;&nbsp;Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
