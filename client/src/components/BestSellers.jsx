import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        // Fetch from backend instead of directly from Google API
        const response = await fetch('http://localhost:8000/api/best-sellers');
        const data = await response.json();
        console.log('Fetched Best Sellers:', data); // Check the response in the console
        setBestSellers(data);  // Assuming the backend returns an array of books
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="bestSellersContainer">
      <h2>Best Sellers</h2>
      <div className="bestSellersGrid">
        {bestSellers.length > 0 ? (
          bestSellers.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id} className="bestSellerItem">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/100x150?text=No+Cover'}
                alt={book.volumeInfo.title}
                className="bestSellerImage"
              />
              <p className="bestSellerTitle">{book.volumeInfo.title}</p>
              <p className="bestSellerPrice">
                {book.saleInfo.listPrice
                  ? `$${book.saleInfo.listPrice.amount}`
                  : 'Price Unavailable'}
              </p>
            </Link>
          ))
        ) : (
          <p>No best sellers available</p>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
