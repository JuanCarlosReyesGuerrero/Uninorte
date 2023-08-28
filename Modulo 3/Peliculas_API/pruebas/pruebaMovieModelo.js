const mongoose = require('mongoose');
const Movie = require('../models/movie.model');
const dotenv = require('dotenv').config();

(async () => {    
        
    await mongoose.connect(process.env.MONGODB_URI); 

    const newMovie = await Movie.create({
        name: 'Los Vengadores',
        create_date: '2000-05-05',
        qualification: '4'
    });

    console.log(newMovie);

})();