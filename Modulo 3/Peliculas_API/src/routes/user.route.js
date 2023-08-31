const express = require("express");
const userSchema = require("../models/user.model");

const router = express.Router();

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
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
