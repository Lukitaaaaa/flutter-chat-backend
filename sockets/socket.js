const {io} = require('../index');
//#const Noticia = require('../models/noticia');
const { guardarNoticia } = require('../controllers/socket');
const Noticias = require('../models/noticias');


const noticias = new Noticias(); 

//#noticias.addNoticia (new Noticia( 'Bienvenidos a Tecni App', 'En Esta app te encontraras con noticias generales en referencia a la escuela, ' ));

console.log(noticias);

io.on('connection', client => {  // Cuando el cliente se conecte
  console.log('Cliente conectado') // la consola imprimira que el 'Cliente conectado'

  client.emit('noticias-activas', noticias.getNoticias()); // Lista de noticias 

  client.on('guardar-noticia', async (paylaod) => {
    await guardarNoticia(payload);
  })

  client.on('disconnect', () => { // Cuando el cliente se desconecte
    console.log('Cliente desconectado') // la consola imprimira que el 'Cliente desconectado'
  });



  //Cuando un client emita una noticia(es este caso la pagina web) el server lo escucha y lo emite a los demas clientes

  client.on('emitir-noticia', (payload)=> { //el server escucha al cliente el evento "emitir noticia"
    const nuevaNoticia = new Noticia( payload.titulo, payload.descripcion );
    noticias.addNoticia( nuevaNoticia ); // se introduce el metodo de añadir noticias
    io.emit('noticias-activas', noticias.getNoticias() ); // el server emite un nuevo evento "noticias-activas" para recargar la lista de noticias activas y advertir a los otros clientes que hay una noticia nueva
    console.log(noticias)
  });
});