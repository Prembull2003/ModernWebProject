import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Import the context
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { setUser } = useUser(); // Access setUser from context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup form submitted:', formData);

    // Simulate signup success
    const mockUser = {
      firstName: formData.name,  // Replace with actual user data after backend integration
      email: formData.email,
    };

    setUser(mockUser);  // Update user context
    navigate('/');  // Redirect to home page
  };

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2 className="authHeader">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="authInput"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="authInput"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="authInput"
          required
        />
        <button type="submit" className="authButton">Signup</button>
        <Link to="/login" className="authLink">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Signup;
