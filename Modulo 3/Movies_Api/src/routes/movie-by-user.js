const router = require('express').Router();
const MovieByUser = require('../models/MovieByUser');
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    id_user: Joi.string().required(),
    id_movie: Joi.string().required(),
    name_user: Joi.string().required(),
    name_movie: Joi.string().required(),
    qualification: Joi.number()
})

// create movie-by-user
/**
 * @swagger
 * components:
 *  schemas:
 *    MovieByUserRegister:
 *      type: object
 *      properties:
 *        id_user: 
 *          type: string
 *          description: Id Usuario
 *        id_pelicula: 
 *          type: string
 *          description: Id Pelicula
 *      name_user: 
 *          type: string
 *          description: El nombre del usuarios
 *      name_movie: 
 *          type: string
 *          description: El nombre de la pelicula
 *      qualification:
 *          type: number
 *          description: Calificación de la Película
 *      required:
 *        - id_user
 *        - id_movie 
 *        - name_user
 *        - name_movie 
 *        - qualification
 *      example:
 *        id_user: 64f12a0ef3a5866d32cd8e37        
 *        id_movie: 64f12a18f3a5866d32cd8e39
 *        name_user: usuario1
 *        name_movie: Los Vengadores
 *        qualification: 4
 *          
 */

/**
 * @swagger
 * /api/movies-by-user/register:
 *  post:
 *    summay: create new movie-by-user
 *    tags: [Crear Peliculas por Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/MovieByUserRegister'
 *    responses: 
 *      200:
 *        description: new movie-by-user
 * 
 */
router.post('/register', async (req, res) => {

    // validate movie
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const movieByUser = new MovieByUser({
        id_user: req.body.id_user,
        id_movie: req.body.id_movie,
        name_user: req.body.name_user,
        name_movie: req.body.name_movie,
        qualification: req.body.qualification
    });
    try {
        const savedMovie = await movieByUser.save();
        res.json({
            error: null,
            data: savedMovie
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})


// get moviebyuser
/**
 * @swagger
 * components:
 *  schemas:
 *    MovieGetIdUser:
 *      type: object
 *      properties:
 *        id: 
 *          type: string
 *          description: El id del usuario
 *      required:
 *        - id
 *      example:
 *        id: 64f254f200bf5088db8b0dad
 *          
 */

/**
 * @swagger
 * /api/movies-by-user/get id user:
 *  get:
 *    summay: get moviebyuser
 *    tags: [Buscar Peliculas por usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/MovieGetIdUser'
 *    responses: 
 *      200:
 *        description: get movie by user
 * 
 */
router.get('/', async (req, res) => {

    const id = req.body.id;

    try {
        const movieDB = await MovieByUser.find({ id_user: req.body.id })

        if (movieDB) {
            res.json({
                error: null,
                data: {
                    title: 'Peliculas por usuario',
                    movies: movieDB
                }
            })
        }
        else {
            res.json({
                error: null,
                mensaje: 'No se encontraron películas'
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