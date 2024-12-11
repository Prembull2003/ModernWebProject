import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookDetails.css";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch book data from Google Books API
  const fetchBookDetails = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      const data = await response.json();

      if (data.error) {
        setError("Book not found.");
      } else {
        setBook(data);
      }
    } catch (err) {
      console.error("Error fetching book details:", err);
      setError("Failed to load book details.");
    }
  };

  // Add to Cart Function
  const handleAddToCart = () => {
    if (!book) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the book already exists in the cart
    const existingBookIndex = cart.findIndex((item) => item.id === book.id);

    if (existingBookIndex === -1) {
      // Add new book to the cart
      cart.push({
        id: book.id,
        title: book.volumeInfo?.title,
        author: book.volumeInfo?.authors?.join(", ") || "Unknown",
        price: book.saleInfo?.retailPrice?.amount || "N/A",
        image: book.volumeInfo?.imageLinks?.thumbnail,
        quantity: 1,
      });

      setSuccessMessage("Book added to cart!");
    } else {
      // Update book quantity if it already exists
      cart[existingBookIndex].quantity += 1;
      setSuccessMessage("Book quantity updated in cart!");
    }

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  return (
    <div className="bookDetailsContainer">
      {error ? (
        <p className="errorMessage">{error}</p>
      ) : book ? (
        <>
          <h2>{book.volumeInfo?.title}</h2>
          <img
            src={book.volumeInfo?.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
            alt={book.volumeInfo?.title}
          />
          <p>
            <strong>Author:</strong>{" "}
            {book.volumeInfo?.authors?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Publisher:</strong>{" "}
            {book.volumeInfo?.publisher || "Not Available"}
          </p>
          <p>
            <strong>Published Date:</strong>{" "}
            {book.volumeInfo?.publishedDate || "Not Available"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {book.volumeInfo?.description || "No description available."}
          </p>
          <p className="bookPrices">
            {book.saleInfo?.listPrice && (
              <span className="originalPrice">
                Original Price: ${book.saleInfo.listPrice.amount.toFixed(2)}
              </span>
            )}
            {book.saleInfo?.retailPrice && (
              <span className="salePrice">
                Sale Price: ${book.saleInfo.retailPrice.amount.toFixed(2)}
              </span>
            )}
          </p>

          <button className="addToCartBtn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {successMessage && (
            <p className="successMessage">{successMessage}</p>
          )}
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;
