import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Book from './models/Book.js'; 

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://prembulsarans:7ZSiU6385JMpsAdY@cluster0.k5cly.mongodb.net/bookstore'; 
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Global cart array
let cart = [];

// Fetch Best Sellers
app.get('/api/best-sellers', async (req, res) => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&key=YOUR_API_KEY' // Replace YOUR_API_KEY with your Google Books API Key
    );
    const data = await response.json();
    if (data.items) {
      res.json(data.items);
    } else {
      res.status(404).send('No best-sellers found');
    }
  } catch (error) {
    console.error('Error fetching best sellers:', error);
    res.status(500).send('Server error');
  }
});

// Fetch On-Sale Books
app.get('/api/on-sale-books', async (req, res) => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=onsale&filter=paid-ebooks&key=YOUR_API_KEY' // Replace YOUR_API_KEY with your Google Books API Key
    );
    const data = await response.json();
    if (data.items) {
      res.json(data.items);
    } else {
      res.status(404).send('No on-sale books found');
    }
  } catch (error) {
    console.error('Error fetching on-sale books:', error);
    res.status(500).send('Server error');
  }
});

// Search Books Route
app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (data.items) {
      res.json(data.items);
    } else {
      res.status(404).json({ message: 'No books found' });
    }
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get Cart Items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Get Cart Count
app.get('/api/cart-count', (req, res) => {
  res.json({ count: cart.length });
});

// Add Item to Cart
app.post('/api/cart', (req, res) => {
  const { id, title, price } = req.body;
  if (!id || !title || !price) {
    return res.status(400).json({ message: 'Missing required fields (id, title, price).' });
  }

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    return res.status(409).json({ message: 'Book already in cart.' });
  }

  cart.push({ id, title, price });
  res.status(201).json({ message: 'Book added to cart', cart });
});

// Remove Item from Cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Book not found in cart.' });
  }

  cart.splice(itemIndex, 1);
  res.json({ message: 'Book removed from cart', cart });
});

// Clear Cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared', cart });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
