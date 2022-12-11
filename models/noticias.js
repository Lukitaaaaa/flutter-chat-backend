const Noticia = require('./noticia');

class Noticias{

    constructor(){
        this.noticias = [];
    }

    addNoticia ( noticia = new Noticia() ){
        this.noticias.push(noticia);
    }
    getNoticias(){ // Esto es para obtener las bandas añadidad
        return this.noticias;
    }
    //// deleteNoticias( titulo = '' ){
    //     this.noticias = this.noticias.filter( noticia => noticia.titulo != titulo );
    //     return this.noticias;
    // }
}

module.exports = Noticias; 