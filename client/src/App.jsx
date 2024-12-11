import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/SearchBar";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import Cart from "./components/Cart";
import OnSaleBooks from "./components/OnSaleBooks";
import BestSellers from "./components/BestSellers";
import Footer from "./components/Footer";
import { UserProvider } from './components/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes without Navbar and Search */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Routes with Navbar and Search */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Search />
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/book/:bookId" // Correct route for book details
            element={
              <>
                <Navbar />
                <Search />
                <BookDetails />
                <Footer />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <Search />
                <Cart />
                <Footer />
              </>
            }
          />

          <Route
            path="/on-sale-books"
            element={
              <>
                <Navbar />
                <Search />
                <OnSaleBooks />
                <Footer />
              </>
            }
          />

          <Route
            path="/best-sellers"
            element={
              <>
                <Navbar />
                <Search />
                <BestSellers />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
