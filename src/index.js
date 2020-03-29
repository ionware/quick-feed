const http = require('http');
const config = require('config');
const app = require('./server');

const server = http.createServer(app);

server.listen(config.server.port);
