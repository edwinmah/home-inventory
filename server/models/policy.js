import mongoose from 'mongoose';

const Policy = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  policyNumber: {
    type: String,
    required: true
  },
  coverage: {
    type: Number,
    required: true
  },
  website: {
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

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;
