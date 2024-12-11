import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // Calculate total amount
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total.toFixed(2));
  };

  // Handle item removal
  const handleRemoveFromCart = (bookId) => {
    const updatedCart = cart.filter((item) => item.id !== bookId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="cartContainer">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image} alt={item.title} />
              <div className="cartDetails">
                <h3>{item.title}</h3>
                <p>Author: {item.author}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  className="removeBtn"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
          <div className="cartTotal">
            <h3>Total Amount: ${totalAmount}</h3>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
