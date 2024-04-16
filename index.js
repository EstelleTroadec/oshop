require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');

// Local imports
const router = require('./app/routers');
const errorHandlers = require('./middlewares/errorHandlers');
const loadUserToLocals = require('./middlewares/loadUserToLocals');

// Body parser
app.use(express.urlencoded({ extended: true }));

// Charger les données de la sessions sur `req.session` et `res.locals`
app.use(
    session({
        saveUninitialized: true,
        resave: true,
        secret: 'Un secret pour signer les id de sessions',
    })
);
app.use(loadUserToLocals);

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Statically served files
app.use(express.static(path.join(__dirname, './assets')));

// Nos Routes
app.use(router);

// middleware 404
app.use(errorHandlers.notFound);

// middleware formatage et affichage des erreurs
app.use(errorHandlers.developmentErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
