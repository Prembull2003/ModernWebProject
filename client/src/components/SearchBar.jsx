import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch books from Google Books API
  const fetchBooks = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setData([]); // Clear data when input is empty
      return;
    }

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.items || []); // Store the books in `data`
      })
      .catch((err) => console.log("Error fetching books:", err));
  };

  const handleFilter = (value) => {
    setQuery(value);
    fetchBooks(value);
  };

  return (
    <div className="wrapper">
      <div className="search-top">
        <div className="search">
          <input
            type="text"
            placeholder="Search for books"
            value={query}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
        <div className="search-result">
          {query && data.length === 0 ? (
            <p>No results found</p>
          ) : (
            data.map((book) => {
              const bookInfo = book.volumeInfo;
              return (
                <Link
                  to={`/book/${book.id}`} // Correct route to navigate to BookDetails
                  key={book.id}
                  className="search-link"
                >
                  <div className="search-item">
                    <strong>{bookInfo.title || "No Title"}</strong>
                    <br />
                    by {bookInfo.authors?.join(", ") || "Unknown Author"}
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
