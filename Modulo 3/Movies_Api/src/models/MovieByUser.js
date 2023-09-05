const mongoose = require("mongoose");

const movieByUserSchema = mongoose.Schema({
    id:{type: String},
    id_user: { type: String, required: true },
    id_movie: { type: String, required: true },    
    qualification: { type: Number },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MovieByUser', movieByUserSchema);