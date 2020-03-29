const config = require('config');
const swaggerJSDoc = require('swagger-jsdoc');

const {server, api} = config;
const {scheme, host, port} = server;

const openAPIDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Stories API',
    description: 'An API for feeds and polling designated as stories.',
    version: '1.0.0',
    license: {
      name: 'MIT',
      url: 'https://github.com/quick-feed/raw/license/MIT.md'
    },
    contact: {
      name: 'Adedeji Stephen',
      url: 'https://adedejistephen.com',
      email: 'adedeji@dsckwasu.club'
    }
  },
  servers: [
    {
      url: `${scheme}://${host}:${port}/api/${api.version}/`
    }
  ]
};

module.exports = swaggerJSDoc({
  definition: openAPIDocument,
  apis: ['./routes/**/*.yaml']
});
