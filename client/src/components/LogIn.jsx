import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { useUser } from './UserContext';  // Importing the context to manage user data

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useUser();  // Accessing setUser function from context to update user data
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);

    // Simulate login success
    const mockUser = {
      firstName: 'John',  // Replace with actual user data after backend integration
      email: formData.email,
    };

    setUser(mockUser);  // Update user context with logged-in user's info
    navigate('/');  // Redirect to home page
  };

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2 className="authHeader">Login</h2>
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
        <button type="submit" className="authButton">Login</button>
        <Link to="/signup" className="authLink">Don't have an account? Signup</Link>
      </form>
    </div>
  );
};

export default Login;
