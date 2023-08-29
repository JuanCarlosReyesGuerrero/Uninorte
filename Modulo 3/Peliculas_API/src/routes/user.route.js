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
 *          description: the user name
 *        age:
 *          type: string
 *          description: the user age
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *        - name
 *        - age
 *        - email
 *      example:
 *        name: Alan key
 *        age: 70
 *        email: reygue28@gmail.com
 *          
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summay: create new user
 *    tags: [User]
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
