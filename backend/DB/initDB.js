const getDB = require('./getDB');
require('dotenv').config();


const initDB = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS photos');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS chat');
    console.log('TABLES REMOVED');

    //USER'S TABLES

    await connection.query(`
    CREATE TABLE  users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        created_user DATETIME NOT NULL
    )
    `);

    console.log('USER TABLE CREATED');

  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
};

initDB();