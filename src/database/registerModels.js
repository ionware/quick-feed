const path = require('path');
const fs = require('fs');

/**
 * Simply requires the model name in the given model path.
 *
 * @param {string} folderPath Fully Qualified folder path where models are.
 */
function requireModel(folderPath) {
  return model => {
    const absPath = path.resolve(folderPath, model);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    require(absPath);
  };
}

/**
 * Require all models in a given path. Path reference starts from 'src' folder
 *
 * @param {string} folder
 */
async function registerModelFromPath(folder = 'models') {
  const absoluteModelsPath = path.resolve(__dirname, '../', folder);
  fs.readdir(absoluteModelsPath, (err, files) => {
    if (err) throw err;
    files.forEach(requireModel(absoluteModelsPath));
  });
}

module.exports = registerModelFromPath;
