const getDB = require('./getDB');
require('dotenv').config();


const initDB = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    console.log('aqui esta el init');
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
};

initDB();