const router = require('express').Router();
const User = require('../models/User');

//Token
const jwt = require("jsonwebtoken");

// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    nickname: Joi.string().min(6).max(12).required(),
    date_birth: Joi.date().required(),
    password: Joi.string().min(6).max(1024).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no se encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    // create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    /*
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
    */

    res.json({
        error: null,
        data: 'Bienvenido',
        token: token
    })
})


// create user
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name: 
 *          type: string
 *          description: El nombre del usuario
 *        email:
 *          type: string
 *          description: El email del usuario
 *        nickname:
 *          type: string
 *          description: El nickname del usuario
 *        date_birth:
 *          type: date
 *          description: La fecha de nacimiento del usuario
 *        password:
 *          type: string
 *          description: La contraseña del usuario
 *      required:
 *        - name
 *        - email
 *        - nickname
 *        - date_birth
 *        - password
 *      example:
 *        name: Tom Sawyer        
 *        email: tomsawyer@gmail.com
 *        nickname: tomsawyer
 *        date_birth: 1985-05-15
 *        password: A56Ke125&%
 *        
 *          
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summay: create new user
 *    tags: [Registro de Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            $ref: '#/components/schemas/User'
 *    responses: 
 *      200:
 *        description: new user
 * 
 */
router.post('/register', async (req, res) => {

    // validate user
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({ error: 'Email ya registrado' })
    }

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        date_birth: req.body.date_birth,
        password: password
    });
    try {
        const savedUser = await user.save();
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router;

