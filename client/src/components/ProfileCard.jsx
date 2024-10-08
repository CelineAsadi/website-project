// Import React and necessary custom hook
import React from 'react';
import { useProfileCardLogic } from './Logic/ProfileCardLogic'; // Import custom logic for profile card
import './Style/ProfileCard.css'; // Import CSS for styling

// Define the ProfileCard functional component
function ProfileCard() {
  // Destructure variables and functions from the custom hook
  const {
    username,
    setUsername,
    email,
    setEmail,
    phone,
    setPhone,
    errors,
    notification,
    notificationType,
    loading,
    isDarkMode,
    handleUpdate
  } = useProfileCardLogic();

  // Render the component with conditional rendering based on loading and dark mode status
  return (
    <div className={`profile-card-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="profile-card-box">
        {loading ? (
          // Display loading message if data is still loading
          <p className="profile-card-loading">Loading...</p>
        ) : (
          <div>
            {notification && (
              <div
                className={`profile-card-notification ${
                  notificationType === 'success' ? 'profile-card-notification-success' : 'profile-card-notification-error'
                }`}
              >
                {notification}
              </div>
            )}
            <h1 className="profile-card-title">Profile Card</h1>
            <form onSubmit={handleUpdate}>
              <div className="profile-card-input-group">
                <label htmlFor="username" className="profile-card-label">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="profile-card-input"
                />
              </div>
              <div className="profile-card-input-group">
                <label htmlFor="email" className="profile-card-label">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="profile-card-input"
                />
                {errors.email && <p className="profile-card-error-message">{errors.email}</p>}
              </div>
              <div className="profile-card-input-group">
                <label htmlFor="phone" className="profile-card-label">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="profile-card-input"
                /> 
                {errors.phone && <p className="profile-card-error-message">{errors.phone}</p>}
              </div>
              <div className="profile-card-button-group">
                <button type="submit" className="profile-card-button">Update</button>
              </div>
            </form>
            {errors.userId && <p className="profile-card-error-message">{errors.userId}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
// Export the ProfileCard component for use in other parts of the application
export default ProfileCard;
