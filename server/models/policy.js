import mongoose from 'mongoose';

const PolicySchema = new mongoose.Schema({
  ownerId: {
    type    : String,
    required: true,
    trim    : true
  },
  accessToken: {
    type    : String,
    required: true,
    trim    : true
  },
  company: {
    type    : String,
    required: true,
    trim    : true
  },
  policyNumber: {
    type    : String,
    required: true,
    trim    : true
  },
  coverage: {
    type    : Number,
    required: true,
    get: v  => Math.round(v),
    set: v  => Math.round(v)
  },
  website: {
    type    : String,
    required: false,
    trim    : true
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

const Policy = mongoose.model('Policy', PolicySchema);

module.exports = Policy;
