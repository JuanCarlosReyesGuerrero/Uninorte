const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({ error: 'Acceso Denegado' })
    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user=verificar
        next()
    } catch (error) {
        res.status(400).json({ eror: 'token no es válido' })
    }
}

module.exports = verifyToken;