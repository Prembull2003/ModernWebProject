import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import { useUser } from './UserContext';  // Import the context to access user data

function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const { user } = useUser();  // Access user data from context

    // Fetch cart count from server
    const fetchCartCount = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/cart");
            const cart = await response.json();
            setCartCount(cart.length);
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);  // Empty dependency array means this runs once when the component mounts

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <div className="logo">
                            <h2>
                                <a href="/" className="active">Violet</a>
                            </h2>
                        </div>
                        <ul className="nav-link">
                            <li><a href="/About">About</a></li>
                            {user ? (  // Conditionally render based on user data
                                <li><span>Welcome, {user.firstName}!</span></li>  // Display user's name
                            ) : (
                                <li><a href="/LogIn">SignIn</a></li>  // Show "SignIn" if no user
                            )}
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                        <div className="cart-container">
                            {/* Link to navigate to the Cart page */}
                            <Link to="/cart">
                                <i className="fas fa-shopping-cart cart-icon"></i>
                                {cartCount > 0 && <span className="cart-bubble">{cartCount}</span>}
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;
