/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('config');
const StorySeeder = require('./story.seed');
const connect = require('../connect');

// Seed objects and amount to parse into up method.
const seeds = [[StorySeeder, 50]];

connect(config.database)
  .then(async () => {
    for (let i = 0; i < seeds.length; i += 1) {
      const instance = new seeds[i][0]();
      // eslint-disable-next-line no-await-in-loop
      await instance.up(seeds[i][1]);
    }
    await mongoose.disconnect();
    console.log('Done!');
  })
  .catch(error => console.error(error));
