const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  wst_id: {
    type: String,
    required: true,
  },
  wst_password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);