const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String, required: true },
  date_birth: { type: Date, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);