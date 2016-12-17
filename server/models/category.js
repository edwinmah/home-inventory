import mongoose from 'mongoose';

const Category = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
