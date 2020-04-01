const http = require('http');
const config = require('config');
const app = require('./server');
const dbConnect = require('./database/connect');
const loadModels = require('./database/registerModels');

loadModels();
dbConnect(config.database).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to database');
});

const server = http.createServer(app);
server.listen(config.server.port);
