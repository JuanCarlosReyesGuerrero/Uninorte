const router = require('express').Router();
const Movie = require('../models/Movie');
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    create_date: Joi.date().required()    
})

// create movie
/**
 * @swagger
 * components:
 *  schemas:
 *    MovieRegister:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          description: El nombre de la pelicula
 *        create_date:
 *          type: date
 *          description: Fecha creación 
 *      required:
 *        - name
 *        - create_date 
 *      example:
 *        name: Los Vengadores        
 *        create_date: 2020-08-20 
 *          
 */

/**
 * @swagger
 * /api/movies/register:
 *  post:
 *    summay: create new movie
 *    tags: [Crear Peliculas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/MovieRegister'
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


// delete movie
/**
 * @swagger
 * components:
 *  schemas:
 *    MovieDelete:
 *      type: object
 *      properties:
 *        id: 
 *          type: string
 *          description: El id de la película
 *      required:
 *        - id
 *      example:
 *        id: 64f254f200bf5088db8b0dad
 *          
 */

/**
 * @swagger
 * /api/movies/delete:
 *  delete:
 *    summay: delete movie
 *    tags: [Eliminar Peliculas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/MovieDelete'
 *    responses: 
 *      200:
 *        description: delete movie
 * 
 */
router.delete('/', async (req, res) => {

    const id = req.body.id;

    try {
        const movieDB = await Movie.findByIdAndDelete({ _id: req.body.id })

        if (!movieDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el registro'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Registro eliminado!'
            })
        }
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