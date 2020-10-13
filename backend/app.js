//Importations
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config()

//Création de l'app express
const app = express();

//Importation des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//Connexion MongoDB
mongoose.connect(process.env.DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !')) 
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Authorisations requetes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Gestion données reçues
app.use(bodyParser.json());

//Gestion images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
  
// SECURITY
// Protection contre certaines vulnérabilités Web bien connues en définissant les en-têtes HTTP de manière appropriée.
var helmet = require('helmet');
app.use(helmet());

//En-tête X-Powered-By désactivé pour empêcher la détection des applications exécutant Express
app.disable('x-powered-by');

module.exports = app;
