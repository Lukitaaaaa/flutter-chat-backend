const Noticia = require ('../models/noticia');


const guardarNoticia = async (payload) => {
try {
    console.log(payload);
    const noticia = new Noticia(payload)
    console.log(noticia);
    
    await noticia.save();
    
    return true;
} catch (error) {
    return false;
}
}
//se
module.exports = {
    guardarNoticia
}