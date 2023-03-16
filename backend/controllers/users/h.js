const getDB = require('../../DB/getDB');

const h = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        console.log('hikkkkkk');
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
h();
module.exports = h;
