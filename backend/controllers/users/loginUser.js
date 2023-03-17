const getDB = require('../../DB/getDB');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { name, password } = req.body;

        if (!name || !password) {
            const error = new Error('Faltan campos');
            error.httpStatus = 400;
            throw error;
        }

        const [user] = await connection.query(
            `SELECT id FROM users WHERE name = ? AND password = SHA2(?, 512)`,
            [name, password]
        );

        if (user.length < 1) {
            const error = new Error('Nombre o contraseña incorrectos');
            error.httpStatus = 401;
            throw error;
        }


        const tokenInfo = {
            id: user[0].id,
            role: user[0].name,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            token,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;

