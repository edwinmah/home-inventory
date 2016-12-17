import mongoose from 'mongoose';

const Owner = new mongoose.Schema({
  name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    zip: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    }
});

const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner;
