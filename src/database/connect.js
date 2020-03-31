const mongoose = require('mongoose');

function connect(config) {
  const {driver, host, port, db} = config;
  const URI = `${driver}://${host}:${port}`;

  return mongoose.connect(URI, {
    dbName: db,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = connect;
