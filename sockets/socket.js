const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', async (client) => {

  console.log('Cliente conectado');

  const [valido, uid] = comprobarJWT( client.handshake.headers['x-token'] ) // extrae el token para imprimirlo en la consola 

  if ( !valido ) { return client.disconnect(); } // La persona que no este autenticada el server lo "desconectara"
  
  // Cliente verificado
  usuarioConectado( uid );

  // Ingresar al usuario a una sala en particular
  client.join( uid );

  //Escuchar del cliente el mensaje-personal
  client.on('mensaje-personal', async (payload) => {
    console.log( payload );

    await grabarMensaje( payload );
    io.to( payload.para ).emit( 'mensaje-personal', payload ); //Esta es linea es para el usuario que recibio un mensaje lo vea en su pantalla
  })

  client.on('disconnect', () => {
    usuarioDesconectado( uid );
  });


});