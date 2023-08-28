const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({    
    name: { type: String, required: true },
    create_date: { type: Date, required: true },
    qualification: { type: Number }
}, {
    timestamps: true
});

module.exports = mongoose.model('movie', movieSchema);