const express = require('express');
const router = express.Router();

//Controllers
const publicationController = require('../controllers/publication');
//Control de rutas
router.get('/', publicationController.getPublications);//obtiene las publicaciones
router.post('/publicationadd', publicationController.create)//crea una publicacion
router.delete('/publicationdelete', publicationController.delete)//borra una publicacion







module.exports = router;
