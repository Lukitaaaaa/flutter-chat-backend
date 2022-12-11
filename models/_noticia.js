// modelo de que items contendra una noticia

class Noticia{
    constructor (titulo = 'sin-titulo', descripcion = 'sin-descripcion'){

        this.titulo = titulo
        this.descripcion= descripcion
    }
}

module.exports = Noticia;