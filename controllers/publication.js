const fs = require('fs');
const path = require('path');
const moment = require('moment');

//const md5 = require('md5');
const Publication = require('../models/publication');
const Publ = require('./publicaciones');

async function viewModel() {
    const results = await Promise.all(Publ.popular());
    viewModel.sidebar = {
        publications: results[0]
    };
    return viewModel;
}


const ctrl = {};

//lo que debe llamarse al index, obtener las publicaciones
ctrl.getPublications = async (req, res) => {
    const publications = await Publication.find();//.sort({created_at: -1});
    let viewModel = { publications: []};
    viewModel.publications = publications;
    viewModel = await viewModel;
    res.render('index', viewModel);
    /*if(!publications) return res.status(200).send({ message: 'Ha ocurrido un error. No se pudo recuperar las publicaciones' });
    await console.log("numero de publicaciones: "+publications.length);
    */
    //res.render('index', publications);
    //res.render('index');*/
    /*
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    res.render('index', viewModel);

    };

    */
}
ctrl.create = async (req, res) => {
    var params = req.body;
    if (!params.text) return res.status(200).send({ message: 'Debes enviar una publicación' })
    if (req.file) {
        const imageTempPath = req.file.path;
        const targetPath = path.resolve(`${req.file.destination}/${req.file.originalname}`)
        try {
            await fs.rename(imageTempPath, targetPath, err => {
                if (err) console.log(err);
            })
        } catch (err) {
            console.log('El error capturado es:' + err);
        }
    }
    var publication = new Publication;
    publication.text = params.text;
    publication.file = req.file.originalname;
    publication.created_at = moment().unix();
    publication.user = params.user;

    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar la publicación' });
        if (!publicationStored) return res.status(404).send({ message: 'La publicación no ha sido guardada' });
        return res.status(200).send({ publication: publicationStored });
    })
}
ctrl.delete = async (req, res) => {
    var publicationId = req.params.id;
    Publication.find({ '_id': publicationId }).remove(err => {
        if (err) return res.status(500).send({ message: 'Error al borrar publicaciones' });
        res.redirect('/');
    })
}


module.exports = ctrl;
