/**
* CSEL
* @Author Samuel Finocchio (InformaticageNJP)
* @License MIT
*/

// Dependencies
const express = require ('express');
const bodyParser = require ('body-parser');
const passport = require ('passport');
const mongoose = require ('mongoose');
const cors = require('cors')
const morgan = require ('morgan');

// Importing configuration file
const configuration = require ('./config/configuration');

// Configuring express
const app = express();

// CORS initialization
app.use(cors());

// bodyParser initialization
app.use(bodyParser.json());

// MongoDB initialization
mongoose.connect(configuration.db, { useMongoClient: true });
mongoose.Promise = global.Promise; // MongoDB Promise is deprecated

// Morgan for dev only
app.use(morgan('dev'));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport configurations
require('./config/passport');

// Set database routes
app.use('/db', require('./routes/database'));

app.get('/', function (req, res) {
  res.send('Application running on port ' + configuration.port);
});

app.listen(configuration.port, function() {
  console.log ('CSEL Running on port ' + configuration.port);
});
