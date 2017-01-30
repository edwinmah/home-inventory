import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  ownerId: {
    type    : String,
    required: true,
    trim    : true
  },
  categoryId: {
    type    : String,
    required: true,
    trim    : true
  },
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
  serialNumber: {
    type    : String,
    required: false,
    trim    : true
  },
  notes: {
    type    : String,
    required: false,
    trim    : true
  },
  replaceValue: {
    type    : Number,
    required: true,
    get: v  => Math.round(v),
    set: v  => Math.round(v)
  },
  purchaseDate: {
    type    : String,
    required: false
  },
  placePurchased: {
    type    : String,
    required: false,
    trim    : true
  },
  receipt: {
    type    : String,
    required: false,
    trim    : true
  },
  image: {
    type    : String,
    required: false,
    trim    : true
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
