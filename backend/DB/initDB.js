const getDB = require('./getDB');
require('dotenv').config();


const initDB = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS photos');
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

            // POSTS TABLE
            await connection.query(`
            CREATE TABLE posts (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                description TEXT,
                createdAt DATETIME NOT NULL
            )
        `);
              console.log('POSTS TABLE CREATED');

      //PHOTO TABLE

      await connection.query(`
      CREATE TABLE photos (
          id INT PRIMARY KEY AUTO_INCREMENT,
          idPost INT NOT NULL,
          FOREIGN KEY (idPOST) REFERENCES posts(id) ON DELETE CASCADE,
          idUser INT NOT NULL,
          FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
          namePhoto VARCHAR(50) NOT NULL,
          createdDate DATETIME NOT NULL
      )
`);

console.log('PHOTO TABLE CREATED');       

//COMMENTS TABLE

        await connection.query(`
        CREATE TABLE comments (
          idmessage INT PRIMARY KEY AUTO_INCREMENT,
          idPost  INT NOT NULL,
          FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
          idUser INT NOT NULL,
          FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
          text VARCHAR(255),
          createdDateMessage DATETIME NOT NULL
        )
        `);

        console.log('COMMENTS TABLE CREATED');

                // LIKES TABLE
                await connection.query(`
                CREATE TABLE likes (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    idPost INT NOT NULL,
                    FOREIGN KEY (idPost) REFERENCES posts(id) ON DELETE CASCADE,
                    idUser INT NOT NULL,
                    FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                    createdAt DATETIME NOT NULL
                )
            `);
    
            console.log('LIKES TABLE CREATED');

                //MESSAGES TABLE

    await connection.query(`
    CREATE TABLE chat (
      idmessage INT PRIMARY KEY AUTO_INCREMENT,
      receptor INT NOT NULL,
      FOREIGN KEY (receptor) REFERENCES users(id),
      idUser INT NOT NULL,
      FOREIGN KEY (IdUser) REFERENCES users(id),
      text VARCHAR(255),
      createdDateMessage DATETIME NOT NULL
    )
`);

console.log('CHAT TABLE CREATED');

console.log('TABLES CREATED');
    
    



  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit(0);
  }
};

initDB();