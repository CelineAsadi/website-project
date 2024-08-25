// Footer.js
import React from 'react';
import './Style/Home.css'; // Reuse the existing CSS for styling

function Footer() {
  return (
    <footer className="home-footer-section">
      <p className="home-footer-text">
        Stay informed with Trending News, your trusted source for timely and accurate news coverage. Explore breaking stories, in-depth analysis, and stay connected with the world around you.
      </p>
      <p className="home-footer-follow">Follow us for the latest updates:</p>
      <div className="home-footer-links">
        <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer" className="home-footer-link-facebook">Facebook</a>
        <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer" className="home-footer-link-instagram">Instagram</a>
      </div>
      <p className="home-footer-copyright">&copy; {new Date().getFullYear()} Trending News. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
