const getDB = require('../../DB/getDB');

const createUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // check the field of request
        const { name, password } = req.body;

        // check name exists
        const [user] = await connection.query(
            `SELECT id FROM users WHERE name = ?`,
            [name]
        );

        // if exists user throw error
        if (user.length > 0) {
            const error = new Error(
                'Ya existe un usuario registrado con ese nombre'
            );
            error.httpStatus = 409;
            throw error;
        }


        // save the user in database
        await connection.query(
            `INSERT INTO users (name, password, created_user) VALUES (?, SHA2(?, 512), ?)`,
            [name, password, new Date()]
        );

        res.send({
            status: 'ok',
            message: 'Usuario registrado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createUser;
