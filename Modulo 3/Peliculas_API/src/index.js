const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user.route");
const movieRoute = require("./routes/movie.route");
const path = require("path")

//Swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
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

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", movieRoute);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
