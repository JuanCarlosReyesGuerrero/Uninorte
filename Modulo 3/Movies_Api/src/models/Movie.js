const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    name: { type: String, required: true },
    create_date: { type: Date, required: true },
    qualification: { type: Number },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);