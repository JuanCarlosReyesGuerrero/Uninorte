const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const path = require("path")

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Calificacion Peliculas Api",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:9000"
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const app = express();

// capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexión a Base de datos
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri = process.env.MONGODB_URI;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

//Capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const verifyToken = require('./routes/validate-token');
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/movie', verifyToken, movieRoutes);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor corriendo en: ${PORT}`)
})

console.log(verifyToken);