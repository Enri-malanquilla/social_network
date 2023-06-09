//llamadas a librerías
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const expressFileUpload = require('express-fileupload');
const morgan = require('morgan');


const app = express();
const { PORT, HOST } = process.env;

app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));
/*
#######################
//MIDDLEWARES
#######################
*/

const authUser = require('./middlewares/authUser');

//ENDPOINTS

//USERS
const { createUser, loginUser } = require('./controllers/users/index');


app.post('/newuser', createUser );
app.post('/login', loginUser);

//POSTS

const{ createPost } = require('./controllers/posts/index');

app.post('/add-post', authUser, createPost)

/**********************
 * ERROR*************
 ***********************/

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
      status: 'error',
      message: error.message,
    });
  });
  
  //not found
  app.use((req, res) => {
    res.status(404).send({
      status: 'error',
      message: 'Not Found',
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening at ${HOST}${PORT}`);
  });