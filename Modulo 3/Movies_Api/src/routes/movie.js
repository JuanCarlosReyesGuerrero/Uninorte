const router = require('express').Router();
const Movie = require('../models/Movie');
const jwt = require("jsonwebtoken");
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    create_date: Joi.date().required(),
    qualification: Joi.number()
})

// create movie
/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          description: El nombre de la pelicula
 *        create_date:
 *          type: date
 *          description: Fecha creación
 *        qualification:
 *          type: number
 *          description: Calificación de la Película
 *      required:
 *        - name
 *        - create_date
 *        - qualification
 *      example:
 *        name: Los Vengadores        
 *        create_date: 2020-08-20
 *        qualification: 4
 *          
 */

/**
 * @swagger
 * /api/movies:
 *  post:
 *    summay: create new movie
 *    tags: [Crear Peliculas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/Movie'
 *    responses: 
 *      200:
 *        description: new movie
 * 
 */
router.post('/register', async (req, res) => {

    // validate movie
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const isNameExist = await Movie.findOne({ name: req.body.name });
    if (isNameExist) {
        return res.status(400).json({ error: 'El nombre de la película ya existe' })
    }

    const movie = new Movie({
        name: req.body.name,
        create_date: req.body.create_date,
        qualification: req.body.qualification
    });
    try {
        const savedMovie = await movie.save();
        res.json({
            error: null,
            data: savedMovie
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

module.exports = router