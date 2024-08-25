// Import React library
import React from 'react';
// Import CSS for styling from the Home component styles
import './Style/Home.css'; // Reuse the existing CSS for styling

// Define the Footer functional component
function Footer() {
  return (
    // Root element of the footer with a class for styling
    <footer className="home-footer-section">
      // Descriptive text about the site's purpose
      <p className="home-footer-text">
        Stay informed with Trending News, your trusted source for timely and accurate news coverage. Explore breaking stories, in-depth analysis, and stay connected with the world around you.
      </p>
      // Heading for the social media links section
      <p className="home-footer-follow">Follow us for the latest updates:</p>
      // Container for social media links
      <div className="home-footer-links">
        // Link to the Facebook page
        <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" className="home-footer-link-facebook">Facebook</a>
        // Link to the Instagram page
        <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer" className="home-footer-link-instagram">Instagram</a>
      </div>
      // Copyright notice with dynamic year calculation
      <p className="home-footer-copyright">&copy; {new Date().getFullYear()} Trending News. All rights reserved.</p>
    </footer>
  );
}

// Export the Footer component for use in other parts of the application
export default Footer;
