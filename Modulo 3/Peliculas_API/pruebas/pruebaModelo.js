const mongoose = require('mongoose');
const User = require('../models/user.model');
const dotenv = require('dotenv').config();

(async () => {    
    //await mongoose.connect('mongodb://localhost:27017/peliculas_db');
    await mongoose.connect(process.env.MONGODB_URI); 

    const newUser = await User.create({
        name: 'Juan Reyes',
        email: 'reygue28@gmail.com',
        nickname: 'reygue28',
        date_birth: '1974-12-28',
        password: 'Peli123%'
    });

    console.log(newUser);

})();