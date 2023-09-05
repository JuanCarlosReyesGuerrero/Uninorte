const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    id:{type: String},
    name: { type: String, required: true },
    create_date: { type: Date, required: true },    
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);