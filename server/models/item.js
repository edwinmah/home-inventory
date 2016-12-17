import mongoose from 'mongoose';

const Item = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: false
  },
  notes: {
    type: Number,
    required: false
  },
  replacementValue: {
    type: Number,
    required: true
  },
  datePurchased: {
    type: String,
    required: false
  },
  placePurchased: {
    type: String,
    required: false
  },
  receipt: {
    type: String,
    required: false
  },
  image: [
    {
      type: String,
      required: false
    }
  ]
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
