const express = require('express');
const path = require('path');
require('dotenv').config();

//dbConfig
require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body: para hacer peticiones
app.use(express.json() );

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require ('./sockets/socket'); 


  

// path publico

const publicPath = path.resolve(__dirname, 'public');
app.use( express.static( publicPath ));



// Mis rutas
app.use('/api/login', require('./routes/auth')); // API DEL LOGIN
app.use('/api/usuarios', require('./routes/usuarios')); // API DE LOS USUARIOS
app.use('/api/mensajes', require('./routes/mensajes')); // API DE LOS MENSAJES


server.listen( process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', 3000);

})