const getDB = require('../../DB/getDB');

const createdPost = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //id user in token
        const idReqUser = req.userAuth.id;



        console.log(idReqUser);

        res.send({
            status: 'ok'
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createdPost;

