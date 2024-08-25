// Import axios for making HTTP requests
import axios from 'axios';

// Define the API key and base URL for the news API service
const API_KEY = 'gpVtrC7Id8I4Y8fMLZLzVvfXBSRt5Qe_akVVaUlIO5s6-VVd'; // Your API key
const BASE_URL = 'https://api.currentsapi.services/v1';

/**
 * Fetch news from the API based on a search query and pagination.
 * @param {string} query - The search keyword for the news query.
 * @param {number} page - The page number for pagination.
 * @returns {Array} - An array of news articles; empty if an error occurs.
 */
export const fetchNews = async (query = '', page = 1) => {
  // Construct the URL based on whether a query is present
  const url = query
    ? `${BASE_URL}/search?keywords=${query}&apiKey=${API_KEY}&page=${page}`
    : `${BASE_URL}/latest-news?apiKey=${API_KEY}&page=${page}`;

  try {
    // Perform the HTTP GET request to the constructed URL
    const response = await axios.get(url);
    // Return the news articles from the API response
    return response.data.news;
  } catch (error) {
    // Log and return an empty array on error
    console.error('Error fetching news:', error);
    return [];
  }
};
