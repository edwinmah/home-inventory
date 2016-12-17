import mongoose from 'mongoose';

const OwnerSchema = new mongoose.Schema({
  name: {
    type    : String,
    required: true,
    trim    : true
  },
  address: {
    type    : String,
    required: false,
    trim    : true
  },
  city: {
    type    : String,
    required: false,
    trim    : true
  },
  state: {
    type      : String,
    required  : false,
    uppercase : true,
    trim      : true,
    maxlength : 2
  },
  zip: {
    type      : String,
    required  : false,
    trim      : true,
    maxlength : 5
  },
  phone: {
    type    : String,
    required: false,
    trim    : true
  },
  email: {
    type    : String,
    required: false,
    trim    : true
  }
});

const Owner = mongoose.model('Owner', OwnerSchema);

module.exports = Owner;
