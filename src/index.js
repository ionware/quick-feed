const http = require('http');
const config = require('config');
const dbConnect = require('./database/connect');
const loadModels = require('./database/registerModels');

loadModels();
dbConnect(config.database).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to database');
});

// This ensure Schema has been registered for models before
// loading the server app.
const app = require('./server');

const server = http.createServer(app);
server.listen(config.server.port);
