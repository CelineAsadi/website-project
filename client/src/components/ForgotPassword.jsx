// Import React and necessary custom hook for logic management
import React from "react";
import { useForgotPasswordLogic } from "./Logic/ForgotPasswordLogic";
// Import CSS for styling
import './Style/ForgotPassword.css';
// Define the ForgotPassword functional component
function ForgotPassword() {
    // Destructuring variables and functions from the custom hook
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
    // Render the component with conditional styling based on dark mode
    return (
        <div className={`forgot-password-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="forgot-password-box">
                <h1 className="forgot-password-title">
                    <i className="fa-solid fa-lock"></i> Forgot Password
                </h1>
                <hr className="forgot-password-divider" />
                {/* Form for handling password reset */}
                <form onSubmit={handleForgotPassword}>
                    {/* Input group for email */}
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
                        {/* Error message for email */}
                        {errors.email && <p className="forgot-password-error-message">{errors.email}</p>}
                    </div>
                    {/* Input group for new password */}
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
                        {/* Error message for new password */}
                        {errors.newPassword && <p className="forgot-password-error-message">{errors.newPassword}</p>}
                    </div>
                    {/* Input group for confirming new password */}
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
                        {/* Error message for confirming new password */}
                        {errors.confirmPassword && <p className="forgot-password-error-message">{errors.confirmPassword}</p>}
                    </div>
                    {/* General form error messages */}
                    {errors.form && <p className="forgot-password-error-message">{errors.form}</p>}
                    {/* Notification message display */}
                    {notification && <p className="forgot-password-notification">{notification}</p>}

                    {/* Submit button for the form */}
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
// Export the ForgotPassword component for use in other parts of the application
export default ForgotPassword;
