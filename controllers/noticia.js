const Noticias = require('../models/noticia')


const getNoticias = async(req, res = response) => {

    const last30 = await Noticias.find({}).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true,
        messages: last30
    })
}

module.exports = {
    getNoticias
}