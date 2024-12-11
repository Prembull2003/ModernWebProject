import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OnSaleBooks.css";

// BookCard Component to display individual book
const BookCard = ({ book }) => {
  const bookInfo = book.volumeInfo;
  const originalPrice = book.saleInfo?.listPrice?.amount;
  const salePrice = book.saleInfo?.retailPrice?.amount;

  return (
    <Link to={`/book/${book.id}`}>
      <div className="bookCard">
        <img
          src={
            bookInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/150"
          }
          alt={bookInfo.title}
        />
        <h3>{bookInfo.title}</h3>
        <p>Author: {bookInfo.authors?.join(", ") || "Unknown"}</p>
        
        {originalPrice && salePrice ? (
          <p className="price">
            <span className="originalPrice">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="salePrice"> ${salePrice.toFixed(2)}</span>
          </p>
        ) : (
          <p className="price">Price: Not Available</p>
        )}
      </div>
    </Link>
  );
};

const OnSaleBooks = () => {
  const [onSaleBooks, setOnSaleBooks] = useState([]);

  // Fetch On-Sale Books
  const fetchOnSaleBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/on-sale-books");
      const data = await response.json();
      setOnSaleBooks(data);
    } catch (error) {
      console.error("Error fetching On-Sale books:", error);
    }
  };

  useEffect(() => {
    fetchOnSaleBooks();
  }, []);

  return (
    <div className="onSaleBooksContainer">
      <h2>On-Sale Books</h2>
      <div className="bookGrid">
        {onSaleBooks.length > 0 ? (
          onSaleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>No On-Sale Books available.</p>
        )}
      </div>
    </div>
  );
};

export default OnSaleBooks;
