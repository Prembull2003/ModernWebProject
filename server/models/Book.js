import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  authors: { type: [String], default: [] },
  thumbnail: { type: String },
  price: { type: Number, default: null },
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
