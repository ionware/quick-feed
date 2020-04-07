const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
require('./configs/auth.config');

const app = express();

/**
 * Register global middlewares
 */
app.use(helmet());
// use morgan to log request if in development mode.
if (config.env === 'development') {
  app.use(morgan('short'));
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes);

module.exports = app;
