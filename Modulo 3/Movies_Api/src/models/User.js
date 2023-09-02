const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    email: { type: String, required: true, min: 6, max: 255 },
    nickname: { type: String, required: true, min: 6, max: 12 },
    date_birth: { type: Date, required: true },
    password: { type: String, required: true, min: 6, max: 1024 },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema);
