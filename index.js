const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();


const app = express();

app.use(express.json());

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require ('./sockets/socket'); 


//PATH PUBLICO
const publicPath = path.resolve(__dirname, 'public');
app.use( express.static( publicPath ));


//RUTAS
app.use('/api/noticia', require ('./routes/noticia'));


server.listen( process.env.PORT, (err) => {
    if (err) throw new Error (err)

    console.log('Servidor corriendo en el puerto',3000)
})