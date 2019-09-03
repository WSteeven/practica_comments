const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const moment = require('moment');

const app = express();

//Conectando la bd
mongoose.connect('mongodb://localhost/comentarios', {useNewUrlParser: true}).then(db=> console.log('DB conectada')).catch(err=> console.log(err));

//importing routes files
const indexRoute = require('./routes/route'); 

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', './views/')
app.set('view engine', 'ejs');



//static files
app.use('/public', express.static(path.join(__dirname, '/public')));
//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(multer({dest: path.join(__dirname, '/public/img')}).single('imagen'));
//routes
app.use('/',indexRoute);
//Cuando hay routes arriba, esto ya no va
/*app.get('/', (req, res)=>{
    res.render('index');
})*/

//Server listen
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
