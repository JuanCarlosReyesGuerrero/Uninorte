const express = require("express");
const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model");

const router = express.Router();

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {

    //Validadiones
    //const { error } = schemaLogin.validate(req, req.body);
    //if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await userSchema.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: true, mensaje: 'Email no registrado' })

    //const passValida = await bcrypt.compare(req.body.password, user.password)
    //if (!passValida) return res.status(400).json({ error: true, mensaje: 'Error en contraseña' })

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.json({
        error: null,
        mensaje: 'Bienvenido',
        token: token
    })
})

module.exports = router;
