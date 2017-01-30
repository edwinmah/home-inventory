import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  accessToken: {
    type    : String,
    required: true,
    trim    : true
  },
  name: {
    type    : String,
    required: true,
    trim    : true
  },
  description: {
    type    : String,
    required: false,
    trim    : true
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
